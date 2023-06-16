var now = new Date();

var eduPlanReqPop = {
    global : {
    },

    init : function(){
        eduPlanReqPop.dataSet();
    },

    dataSet : function() {
        $.ajax({
            url : "/campus/getCategoryOne",
            data : {
                eduCategoryId : $("#eduCategoryId").val()
            },
            type : "post",
            dataType : "json",
            async: false,
            success : function(result){
                console.log(result.EDU_CATEGORY_NAME);
                try {
                    let dutyClass = $("#dutyClass").val() == 2 ? "연계업무" : "주업무";
                    $("#categoryRange").text(dutyClass+" > "+result.EDU_CATEGORY_NAME);
                }catch (e) {
                    console.log(e);
                    $("#categoryRange").text("데이터 조회중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다.");
                }

            }
        });

        let flag = false;
        $.ajax({
            url : "/campus/getEduPlanOne",
            data : {
                eduCategoryId : $("#eduCategoryId").val(),
                targetYear : $("#targetYear").val(),
                dutyClass : $("#dutyClass").val(),
                empSeq : $("#empSeq").val()
            },
            type : "post",
            dataType : "json",
            async: false,
            success : function(result){
                flag = result.flag;
                if(flag) {
                    let data = result.list[0];
                    $("#eduPlanId").val(data.EDU_PLAN_ID);
                    $("#eduPlan").val(data.EDU_PLAN);
                }
            }
        });
    },

    savePlan : function() {
        if(!confirm("학습계획을 저장하시겠습니까?")){
            return;
        }

        if($("#eduPlan").val() == "") {
            alert("학습계획이 작성되지 않았습니다.");
            return;
        }

        if($("#eduPlanId").val() == "") {
            eduPlanReqPop.setEduPlanInsert();
        }else {
            eduPlanReqPop.setEduPlanUpdate();
        }
    },

    setEduPlanInsert: function() {
        $.ajax({
            url : "/campus/setEduPlanInsert",
            data : {
                eduCategoryId : $("#eduCategoryId").val(),
                targetYear : $("#targetYear").val(),
                dutyClass : $("#dutyClass").val(),
                eduPlan : $("#eduPlan").val(),
                empSeq : $("#empSeq").val()
            },
            type : "post",
            dataType : "json",
            async : false,
            success : function(result){
                console.log(result);
                alert("학습계획 저장이 완료되었습니다.");
                window.close();
                opener.targetInfo.tableSet();
            },
            error : function() {
                alert("데이터 저장 중 에러가 발생했습니다.");
                window.close();
            }
        });
    },

    setEduPlanUpdate: function() {
        $.ajax({
            url : "/campus/setEduPlanUpdate",
            data : {
                eduPlanId : $("#eduPlanId").val(),
                eduPlan : $("#eduPlan").val()
            },
            type : "post",
            dataType : "json",
            async : false,
            success : function(result){
                console.log(result);
                alert("학습계획 저장이 완료되었습니다.");
                window.close();
                opener.targetInfo.tableSet();
            },
            error : function() {
                alert("데이터 저장 중 에러가 발생했습니다.");
                window.close();
            }
        });
    }
}
