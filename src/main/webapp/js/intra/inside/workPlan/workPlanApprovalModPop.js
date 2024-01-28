var workPlanApprovalModPop = {

    global : {
        workTimeList : new Array(),
        workPlanApprovalData : "",
    },

    init : function(workPlanApprovalId){

        if(workPlanApprovalId != ""){
            var ds = customKendo.fn_customAjax("/workPlan/getWorkPlanData.do", { workPlanApprovalId : workPlanApprovalId});
            if(ds.flag){
                workPlanApprovalModPop.global.workPlanApprovalData = ds.data;
            }
        }

        $("#startDate").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : workPlanApprovalModPop.global.workPlanApprovalData.START_DATE
        });

        $("#applyDate").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : workPlanApprovalModPop.global.workPlanApprovalData.APPLY_DATE
        });

        $("#endDate").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : workPlanApprovalModPop.global.workPlanApprovalData.END_DATE
        });

        var ds = customKendo.fn_customAjax("/workPlan/getWorkTimeCode", { workTimeType : "W" });
        if(ds.flag){
            workPlanApprovalModPop.global.workTimeList = ds.list;
        }
        
        $("#workTimeType").kendoRadioGroup({
            items: workPlanApprovalModPop.global.workTimeList,
            layout : "horizontal",
            labelPosition : "after",
            value : workPlanApprovalModPop.global.workPlanApprovalData.WORK_TIME_CODE_ID,
        }).data("kendoRadioGroup");

        $("#workReason").kendoTextArea({ rows: 5, maxLength:2000, placeholder: "" });
        $("#workReason").val(workPlanApprovalModPop.global.workPlanApprovalData.WORK_REASON);
        
        $(".defaultVal").attr("disabled", "disabled");

        if(workPlanApprovalModPop.global.workPlanApprovalData.APPR_STAT != "N"){
            $("#startDate").data("kendoDatePicker").enable(false);
            $("#endDate").data("kendoDatePicker").enable(false);
            $("#applyDate").data("kendoDatePicker").enable(false);
            $("#workTimeType").data("kendoRadioGroup").enable(false);
            $("#workReason").data("kendoTextArea").enable(false);
            $(".tipSpan").hide();
            $("#modifyBtn").hide();
        }
    },

    fn_modify : function(){

        var saveData = {
            modEmpSeq : $("#empSeq").val(),
            workTimeCodeId : $("#workTimeType").data("kendoRadioGroup").value(),
            applyDate : $("#applyDate").val(),
            startDate : $("#startDate").val(),
            endDate : $("#endDate").val(),
            apprStat : "N",
            workReason : $("#workReason").val(),
            workPlanApprovalId : workPlanApprovalModPop.global.workPlanApprovalData.WORK_PLAN_APPROVAL_ID
        }

        var ds = customKendo.fn_customAjax("/workPlan/updateWorkPlan", saveData);
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

