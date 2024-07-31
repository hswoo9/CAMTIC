var oorm = {
    
    global : {
        now : new Date(),
        saveAjaxData : "",
        searchAjaxData : "",
    },
    
    fn_defaultScript : function(){
        customKendo.fn_textBox(["orderVolume", "unitPrice", "amt", "rmk"])
        customKendo.fn_datePicker("dueDt", '', "yyyy-MM-dd", '');

        $(".numberInput").keyup(function(){
            $(this).val(oorm.comma(oorm.uncomma($(this).val())));
        });

        $("#orderVolume, #unitPrice").keyup(function(){
            var whVolume = Number(oorm.uncomma($("#orderVolume").val()));
            var unitPrice = Number(oorm.uncomma($("#unitPrice").val()));
            $("#amt").val(oorm.comma(Number(whVolume * unitPrice)));
        });

        oorm.getObtainOrder();
    },

    getObtainOrder : function(){
        oorm.global.searchAjaxData = {
            obtainOrderSn : $("#obtainOrderSn").val(),
        }

        var result = customKendo.fn_customAjax("/item/getObtainOrder.do", oorm.global.searchAjaxData);
        if(result.flag){
            $("#crmSn").val(result.rs.CRM_SN);
            $("#crmNm").val(result.rs.CRM_NM);
            $("#masterSn").val(result.rs.MASTER_SN);
            $("#itemNo").val(result.rs.ITEM_NO);
            $("#itemName").val(result.rs.ITEM_NAME);
            $("#standard").val(result.rs.ITEM_NAME);
            $("#dueDt").val(result.rs.DUE_DT);
            $("#orderVolume").val(oorm.comma(result.rs.ORDER_VOLUME));
            $("#unitPrice").val(oorm.comma(result.rs.UNIT_PRICE));
            $("#amt").val(oorm.comma(result.rs.AMT));
            $("#rmk").val(result.rs.RMK);
        }
    },

    setObtainOrderUpd : function(){
        if(!$("#crmSn").val()){
            alert("업체를 선택해주세요.");
            return;
        }else if(!$("#masterSn").val()){
            alert("품번을 선택해주세요.");
            return;
        }else if(!$("#dueDt").val()){
            alert("납기일자를 선택해주세요.");
            return;
        }else if(!$("#orderVolume").val()){
            alert("수주량을 입력해주세요.");
            return;
        }else if(!$("#unitPrice").val()){
            alert("단가를 입력해주세요.");
            return;
        }


        if(oorm.getOrderDeliveryAmtChk()){
            alert("납품량은 수주량을 초과할 수 없습니다.");
            return;
        }

        if(confirm("저장하시겠습니까?")){
            oorm.global.saveAjaxData = {
                obtainOrderSn : $("#obtainOrderSn").val(),
                crmSn : $("#crmSn").val(),
                masterSn : $("#masterSn").val(),
                orderVolume : oorm.uncomma($("#orderVolume").val()),
                dueDt : $("#dueDt").val(),
                unitPrice : oorm.uncomma($("#unitPrice").val()),
                amt : oorm.uncomma($("#amt").val()),
                rmk : $("#rmk").val(),
                empSeq : $("#empSeq").val()
            }

            var result = customKendo.fn_customAjax("/item/setObtainOrderUpd.do", oorm.global.saveAjaxData)
            if(result.flag){
                alert("수정되었습니다.");
                opener.parent.oorl.gridReload();
                window.close();
            }
        }
    },

    setObtainOrderCancel : function(){
        if(confirm("수주를 취소하시겠습니까?")){
            oorm.global.saveAjaxData = {
                obtainOrderSn : $("#obtainOrderSn").val(),
                empSeq : $("#empSeq").val(),
            }

            var result = customKendo.fn_customAjax("/item/setObtainOrderCancel.do", oorm.global.saveAjaxData)
            if(result.flag){
                alert("처리되었습니다.");
                opener.parent.oorl.gridReload();
                window.close();
            }
        }
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

    comma: function(str) {
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    },

    uncomma: function(str) {
        str = String(str);
        return str.replace(/[^\d]+/g, '');
    },

    getOrderDeliveryAmtChk : function(){
        var result;

        $.ajax({
            url: "/item/getOrderDeliveryAmtChk.do",
            data: {
                obtainOrderSn : $("#obtainOrderSn").val(),
                orderVolume : oorm.uncomma($("#orderVolume").val()),
            },
            type: "post",
            dataType: "json",
            async: false,
            success: function(rs) {
                result = rs.rs;
            },
            error: function (e) {
                console.log('error : ', e);
            }
        });

        return result;
    }
}
