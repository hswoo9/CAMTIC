var contentPop = {
    init: function (){
        contentPop.dataSet();
    },

    dataSet: function(){
        customKendo.fn_textBox(["orderGoals", "salesGoals", "revenueGoals", "costGoals", "commerIndexGoals"]);

        $(".numberInput").keyup(function(){
            $(this).val(contentPop.comma(contentPop.uncomma($(this).val())));
        });
    },

    saveData: function(){
        $.ajax({
            type: "POST",
            url: "/evaluation/setEvalGoal",
            data: {
                evalGoalSn : $("#evalGoalSn").val(),
                empSeq : $("#regEmpSeq").val(),
                orderGoals: contentPop.uncomma($("#orderGoals").val()),
                salesGoals: contentPop.uncomma($("#salesGoals").val()),
                revenueGoals: contentPop.uncomma($("#revenueGoals").val()),
                costGoals: contentPop.uncomma($("#costGoals").val()),
                commerIndexGoals: contentPop.uncomma($("#commerIndexGoals").val())
            },
            success: function(response) {
                alert("설정이 완료되었습니다.");
                opener.parent

                if(opener.parent.evaluationPerReq != null) {
                    opener.parent.evaluationPerReq.getEvaluationList()
                }

                window.close();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert("Error occurred while saving data:", textStatus);
            }
        });
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