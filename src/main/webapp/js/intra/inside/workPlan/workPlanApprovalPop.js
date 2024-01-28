var workPlanApprovalPop = {

    global : {
        workTimeList : new Array(),

    },

    init : function(){
        $("#startDate, #applyDate").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date()
        });

        $("#endDate").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date()
        });

        var ds = customKendo.fn_customAjax("/workPlan/getWorkTimeCode", { workTimeType : "W" });
        if(ds.flag){
            workPlanApprovalPop.global.workTimeList = ds.list;
        }

        $("#workTimeType").kendoRadioGroup({
            items: workPlanApprovalPop.global.workTimeList,
            layout : "horizontal",
            labelPosition : "after",
            value : 1,
        }).data("kendoRadioGroup");

        $("#workReason").kendoTextArea({ rows: 5, maxLength:2000, placeholder: "" });

        $(".defaultVal").attr("disabled", "disabled");
    },

    fn_save : function(){

        var saveData = {
            applySeq : $("#empSeq").val(),
            workTimeCodeId : $("#workTimeType").data("kendoRadioGroup").value(),
            applyDate : $("#applyDate").val(),
            startDate : $("#startDate").val(),
            endDate : $("#endDate").val(),
            apprStat : "N",
            regEmpSeq : $("#empSeq").val(),
            workReason : $("#workReason").val()
        }

        var ds = customKendo.fn_customAjax("/workPlan/setWorkPlan", saveData);
        if(ds.flag){
            if(ds.ds != null){
                alert(ds.ds.message);
                if(ds.ds.code == "success"){
                    if(window.opener.fn_gridReload){
                        window.opener.fn_gridReload();
                    }
                    window.close();
                }else{

                }
            }
        }
    }
}

