var evaluationSet = {
    global : {

    },

    fn_defaultScript : function (){
        $(".baseScore, .conversionScore").kendoTextBox()
        customKendo.fn_textBox(["orderWeights", "salesWeights", "revenueWeights"]);
        customKendo.fn_datePicker("evalStrDt", '', "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("evalEndDt", '', "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("baseYear", 'decade', "yyyy", new Date());

        if($("#evalAchieveSetSn").val()){
            $('#updBtn').css("display", "");
            $('#delBtn').css("display", "");
            evaluationSet.getEvalAchieveSet();
        }else{
            $('#saveBtn').css("display", "");
        }
    },

    fn_save_chk : function(){
        $.ajax({
            url : "/evaluation/setEvalAchieveSetChk",
            type : "post",
            data : {
                baseYear : $("#baseYear").val(), // 년도
            },
            dataType : "json",
            async : false,
            success : function(result){
                if(!result.rs){
                    evaluationSet.fn_save();
                }else{
                    alert($("#baseYear").val() + "년도는 이미 등록되어있습니다.");
                }
            },
            error : function(e) {
                console.log(e);
            }
        });
    },

    fn_save : function(){
        var formData = new FormData();

        formData.append("evalAchieveSetSn" , $("#evalAchieveSetSn").val());
        formData.append("baseYear" , $("#baseYear").val());
        formData.append("evalStrDt" , $("#evalStrDt").val());
        formData.append("evalEndDt" , $("#evalEndDt").val());
        formData.append("orderWeights" , $("#orderWeights").val());
        formData.append("salesWeights" , $("#salesWeights").val());
        formData.append("revenueWeights" , $("#revenueWeights").val());
        formData.append("regEmpSeq", $("#empSeq").val());

        var ratingArr = new Array()
        $("#ratingTb tbody tr").each(function(i, v){
            var data = {
                rating : $(this).find(".rating").text(),
                baseScore : $(this).find("input.baseScore").val(),
                conversionScore : $(this).find("input.conversionScore").val(),
                regEmpSeq : $("#empSeq").val(),
            }

            ratingArr.push(data);
        })

        formData.append("ratingArr", JSON.stringify(ratingArr))

        $.ajax({
            url : "/evaluation/setEvalAchieveSetting",
            data : formData,
            processData: false,
            contentType: false,
            type : "post",
            dataType : "json",
            async : false,
            dataType : "json",
            success : function (rs){
                if($("#evalAchieveSetSn").val()){
                    alert("수정이 완료 되었습니다.");
                    window.opener.parent.getEvaluationList();
                    window.close();
                }else{
                    alert("등록이 완료 되었습니다.");
                    window.opener.parent.getEvaluationList();
                    window.close();
                }
            }
        });
    },

    fn_del : function(){
        if(!confirm("삭제하시겠습니까?")){
            return;
        }
        $.ajax({
            url : "/evaluation/setEvalAchieveSetDel",
            type : "post",
            data : {
                evalAchieveSetSn : $("#evalAchieveSetSn").val()
            },
            dataType : "json",
            async : false,
            success : function(result){
                alert("삭제되었습니다.");
                window.opener.parent.getEvaluationList();
                window.close();
            },
            error : function(e) {
                console.log(e);
            }
        });
    },

    getEvalAchieveSet : function(){
        $.ajax({
            url : "/evaluation/getEvalAchieveSet",
            type : "post",
            data : {
                evalAchieveSetSn : $("#evalAchieveSetSn").val(),
            },
            dataType : "json",
            async : false,
            success : function(rs){
                $("#baseYear").val(rs.rs.BASE_YEAR)
                $("#evalStrDt").val(rs.rs.EVAL_STR_DT)
                $("#evalEndDt").val(rs.rs.EVAL_END_DT)
                $("#orderWeights").val(rs.rs.ORDER_WEIGHTS)
                $("#salesWeights").val(rs.rs.SALES_WEIGHTS)
                $("#revenueWeights").val(rs.rs.REVENUE_WEIGHTS)

                $.each(rs.rs.ratingList, function(i, v){
                    var ratingTh = $("#ratingTb .rating[rating='" + rs.rs.ratingList[i].RATING + "']")
                    $(ratingTh).closest("tr").find(".baseScore").val(rs.rs.ratingList[i].BASE_SCORE)
                    $(ratingTh).closest("tr").find(".conversionScore").val(rs.rs.ratingList[i].CONVERSION_SCORE)
                })
            },
            error : function(e) {
                console.log(e);
            }
        });
    }
}