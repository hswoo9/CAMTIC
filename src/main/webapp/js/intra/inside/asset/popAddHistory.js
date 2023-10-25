var popAddHistory = {
    global : {
        saveAjaxData : ""
    },

    fn_defaultScript: function () {
        customKendo.fn_textBox(["otherTitle", "unitPrice", "etc", "standard"])
        customKendo.fn_datePicker("exeDate", '', "yyyy-MM-dd", new Date());
        $(".numberInput").keyup(function(){
            $(this).val(popAddHistory.comma(popAddHistory.uncomma($(this).val())));
        });
    },

    setAstManage : function(){
        popAddHistory.global.saveAjaxData = {
            astInfoOtherSn : $("#astInfoOtherSn").val(),
            astInfoSn : $("#astInfoSn").val(),
            type : $("#type").val(),
            otherTitle : $("#otherTitle").val(),
            exeDate : $("#exeDate").val(),
            unitPrice : popAddHistory.uncomma($("#unitPrice").val()),
            standard : $("#standard").val(),
            etc : $("#etc").val(),
            empSeq : $("#empSeq").val()
        }

        var result = customKendo.fn_customAjax("/asset/setAstOtherHistory.do", popAddHistory.global.saveAjaxData);
        if(result.flag){
            alert("등록되었습니다.");
            opener.parent.location.reload()
            window.close();
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


