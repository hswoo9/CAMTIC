var regRvM = {
    
    global : {
        now : new Date(),
        saveAjaxData : "",
        wTDataSource : "",
        wCDataSource : "",
        searchAjaxData : "",
    },
    
    fn_defaultScript : function(){
        regRvM.global.wTDataSource = customKendo.fn_customAjax("/item/smCodeList", {grpSn : "WT", lgCd : "WT"});
        customKendo.fn_dropDownList("whType", regRvM.global.wTDataSource, "ITEM_CD_NM", "ITEM_CD", 3);
        regRvM.global.wCDataSource = customKendo.fn_customAjax("/item/smCodeList", {grpSn : "WC", lgCd : "WH"});
        customKendo.fn_dropDownList("whCd", regRvM.global.wCDataSource, "ITEM_CD_NM", "ITEM_CD", 3);

        customKendo.fn_textBox(["whVolume", "whWeight", "unitPrice", "amt", "rmk"])

        $(".numberInput").keyup(function(){
            $(this).val(regRvM.comma(regRvM.uncomma($(this).val())));
        });

        $("#whVolume, #unitPrice").keyup(function(){
            var whVolume = Number(regRvM.uncomma($("#whVolume").val()));
            var unitPrice = Number(regRvM.uncomma($("#unitPrice").val()));
            $("#amt").val(regRvM.comma(Number(whVolume * unitPrice)));
        });

        regRvM.getItemWhInfo();
    },

    getItemWhInfo : function(){
        regRvM.global.searchAjaxData = {
            itemWhSn : $("#itemWhSn").val(),
        }

        var result = customKendo.fn_customAjax("/item/getItemWhInfo.do", regRvM.global.searchAjaxData);
        if(result.flag){
            $("#crmSn").val(result.rs.CRM_SN);
            $("#crmNm").val(result.rs.CRM_NM);
            $("#masterSn").val(result.rs.MASTER_SN);
            $("#itemNo").val(result.rs.ITEM_NO);
            $("#itemName").val(result.rs.ITEM_NAME);
            $("#whType").data("kendoDropDownList").value(result.rs.WH_TYPE);
            $("#whCd").data("kendoDropDownList").value(result.rs.WH_CD);
            $("#whVolume").val(regRvM.comma(result.rs.WH_VOLUME));
            $("#whWeight").val(result.rs.WH_WEIGHT);
            $("#unitPrice").val(regRvM.comma(result.rs.UNIT_PRICE));
            $("#amt").val(regRvM.comma(result.rs.AMT));
            $("#rmk").val(result.rs.RMK);
        }
    },

    setReceivingRegUpd : function(){
        if(!$("#crmSn").val()){
            alert("업체를 선택해주세요.");
            return;
        }else if(!$("#masterSn").val()){
            alert("품번을 선택해주세요.");
            return;
        }else if(!$("#whVolume").val()){
            alert("입고량을 입력해주세요.");
            return;
        }else if(!$("#unitPrice").val()){
            alert("단가를 입력해주세요.");
            return;
        }

        if(confirm("저장하시겠습니까?")){
            regRvM.global.saveAjaxData = {
                itemWhSn : $("#itemWhSn").val(),
                crmSn : $("#crmSn").val(),
                masterSn : $("#masterSn").val(),
                whType : $("#whType").val(),
                whVolume : $("#whVolume").val(),
                whWeight : $("#whWeight").val(),
                whCd : $("#whCd").val(),
                itemName : $("#itemName").val(),

                unitPrice : regRvM.uncomma($("#unitPrice").val()),
                amt : regRvM.uncomma($("#amt").val()),
                rmk : $("#rmk").val(),
                empSeq : $("#empSeq").val()
            }

            var result = customKendo.fn_customAjax("/item/setReceivingRegUpd.do", regRvM.global.saveAjaxData)
            if(result.flag){
                alert("수정되었습니다.");
                opener.parent.recL.gridReload();
                window.close();
            }
        }
    },

    setReceivingCancel : function(){
        if(confirm("입고를 취소하시겠습니까?")){
            regRvM.global.saveAjaxData = {
                itemWhSn : $("#itemWhSn").val(),
                empSeq : $("#empSeq").val(),
            }

            var result = customKendo.fn_customAjax("/item/setReceivingCancel.do", regRvM.global.saveAjaxData)
            if(result.flag){
                alert("처리되었습니다.");
                opener.parent.recL.gridReload();
                window.close();
            }
        }
    },

    comma : function(str){
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    },

    uncomma : function(str){
        str = String(str);
        return str.replace(/[^\d]+/g, '');
    },

    fn_popCamCrmList : function (){
        var url = "/crm/pop/popCrmList.do";
        var name = "_blank";
        var option = "width = 1300, height = 670, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    fn_popItemNoList : function (){
        var url = "/item/pop/popItemNoList.do";
        var name = "_blank";
        var option = "width = 1300, height = 670, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    itemInfoChange : function(){
        $("#whCd").data("kendoDropDownList").value($("#baseWhCd").val());
        $("#baseWhCd").val("")
    },

    fn_popUnitPriceList : function(unitPriceId, i){
        if(!$("#crmSn").val()){
            alert("업체를 선택해주세요.");
            return;
        }else if(!$("#itemNo").val()){
            alert("품번을 입력해주세요.");
            return;
        }

        var url = "/item/pop/popRvUnitPriceList.do?crmSn=" + $("#crmSn" + i).val() + "&masterSn=" + $("#masterSn" + i).val();
        var name = "_blank";
        var option = "width = 860, height = 670, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    unitPriceChange : function(){
        $("#unitPrice").val(regRvM.comma($("#unitPrice").val()));

        var whVolume = Number(regRvM.uncomma($("#whVolume").val()));
        var unitPrice = Number(regRvM.uncomma($("#unitPrice").val()));
        $("#amt").val(regRvM.comma(Number(whVolume * unitPrice)));
    },

    comma: function(str) {
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    },

    uncomma: function(str) {
        str = String(str);
        return str.replace(/[^\d]+/g, '');
    },
}
