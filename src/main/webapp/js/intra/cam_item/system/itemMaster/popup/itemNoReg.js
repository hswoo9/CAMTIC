var inr = {
    
    global : {
        duplicateFlag : "N",
        saveAjaxData : "",
        dropDownDataSource : "",
        searchAjaxData : ""
    },
    
    fn_defaultScript : function(){
        inr.global.dropDownDataSource = customKendo.fn_customAjax("/item/smCodeList", {grpSn : "WC", lgCd : "WH"});
        customKendo.fn_dropDownList("whCd", inr.global.dropDownDataSource, "ITEM_CD_NM", "ITEM_CD", 2);

        inr.global.dropDownDataSource = customKendo.fn_customAjax("/item/smCodeList", {grpSn : "UN", lgCd : "UNIT"});
        customKendo.fn_dropDownList("itemUnitCd", inr.global.dropDownDataSource, "ITEM_CD_NM", "ITEM_CD", 2);

        inr.global.dropDownDataSource = [
            {text : "사용", value : "Y"},
            {text : "미사용", value : "N"}
        ]
        customKendo.fn_dropDownList("active", inr.global.dropDownDataSource, "text", "value", 2);

        $("#safetyInven").keyup(function(){
            $(this).val(inr.comma(inr.uncomma($(this).val())));
        });

        customKendo.fn_textBox(["itemNo", "itemName", "safetyInven", "standard"])

        if($("#masterSn").val()){
            inr.getItemMaster();
        }
    },

    getItemNoDuplicate : function(){
        if(!$("#itemNo").val()){
            alert("품번을 입력해주세요.");
            return;
        }

        inr.global.saveAjaxData = {
            itemNo : $("#itemNo").val()
        }
        var result = customKendo.fn_customAjax("/item/getItemNoDuplicate.do", inr.global.saveAjaxData)
        if(result.flag){
            inr.global.duplicateFlag = result.rs;
            if(result.rs){
                alert("이미 등록된 품번입니다.");
            }else {
                alert("등록 가능한 품번입니다.");
            }
        }
    },

    setReceivingReg : function(){
        if(inr.global.duplicateFlag == "N"){
            alert("품번 중복확인을 체크해주세요.");
            return;
        }else if(inr.global.duplicateFlag){
            alert("이미 등록된 품번입니다.");
            return;
        }else if(!$("#itemName").val()){
            alert("품명을 입력해주세요.");
            return;
        }else if(!$("#itemUnitCd").val()){
            alert("단위를 선택해주세요.");
            return;
        }/*else if(!$("#standard").val()){
            alert("규격을 입력해주세요.");
            return;
        }*/else if(!$("#active").val()){
            alert("사용여부를 선택해주세요.");
            return;
        }

        if(confirm("저장하시겠습니까?")){
            inr.global.saveAjaxData = {
                masterSn : $("#masterSn").val(),
                itemNo : $("#itemNo").val(),
                itemName : $("#itemName").val(),
                itemUnitCd : $("#itemUnitCd").val(),
                standard : $("#standard").val(),
                active : $("#active").val(),
                empSeq : $("#empSeq").val()
            }

            if($("#whCd").val()){
                inr.global.saveAjaxData.whCd = $("#whCd").val()
            }

            if($("#safetyInven").val()){
                inr.global.saveAjaxData.safetyInven = $("#safetyInven").val()
            }

            var result = customKendo.fn_customAjax("/item/setItemMasterReg.do", inr.global.saveAjaxData)
            if(result.flag){
                alert("등록되었습니다.");
                opener.itemM.gridReload();
                window.close();
            }
        }
    },

    getItemMaster : function(){
        inr.global.searchAjaxData = {
            masterSn : $("#masterSn").val()
        }
        var result = customKendo.fn_customAjax("/item/getItemMaster.do", inr.global.searchAjaxData);
        if(result.flag){
            inr.global.duplicateFlag = false;
            $("#itemNo").val(result.rs.ITEM_NO);
            $("#itemName").val(result.rs.ITEM_NAME);
            $("#itemUnitCd").data("kendoDropDownList").value(result.rs.ITEM_UNIT_CD);
            $("#standard").val(result.rs.STANDARD)
            $("#safetyInven").val(result.rs.SAFETY_INVEN)
            $("#whCd").data("kendoDropDownList").value(result.rs.WH_CD)
            $("#active").data("kendoDropDownList").value(result.rs.ACTIVE)
        }
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
