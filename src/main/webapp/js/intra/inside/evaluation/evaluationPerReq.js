var now = new Date();

var evaluationPerReq = {
    global : {
        searchAjaxData : "",
        dropDownDataSource : "",
        evalData : null,
        scoreList : new Array()
    },

    init: function(){
        evaluationPerReq.dataSet();
        evaluationPerReq.getEvaluationList();
    },

    dataSet: function (){
        customKendo.fn_datePicker("searchYear", 'decade', "yyyy", new Date());
    },

    getEvaluationList: function(){
        $.ajax({
            url : "/evaluation/getEvalGoalList",
            type : "post",
            data : {
                year : $("#searchYear").val(),
                deptSeq : $("#regDeptSeq").val(),
                teamSeq : $("#regTeamSeq").val(),
                dutyCode : $("#regDutyCode").val(),
                empSeq : $("#regEmpSeq").val()
            },
            dataType : "json",
            async : false,
            success : function(result){
                var goalList = result.rs.goalList;
                var achieveList = result.rs.achieveList;
                evaluationPerReq.fn_addEvalList(goalList, achieveList);
            },
            error : function(e) {
                console.log(e);
            }
        });
    },

    fn_addEvalList: function(goalList, achieveList){
        $('#evalList').empty();
        var html = "";

        if(goalList.length > 0){
            for(var i = 0; i < goalList.length; i++){
                var empEchieve = achieveList.find(e => e.EMP_SEQ == goalList[i].EMP_SEQ);
                var orderAchieve = 0;
                var salesAchieve = 0;
                var revenueAchieve = 0;
                if(empEchieve != null){
                    var achieve = empEchieve.ACHIEVE.split('|');
                    for(var j = 0; j < achieve.length; j++){
                        /** 데이터 형태 = EMP_SEQ_PJT_AMT_REVENUE_SUM_ORDER_ACHIEVE_SALES_ACHIEVE_REVENUE_ACHIEVE */
                        var achieveInfo = achieve[j].split("_");
                        var pjtAmt = achieveInfo[1];
                        var pjtRevenueSum = achieveInfo[2];
                        var pjtOrderAchieve = achieveInfo[3];
                        var pjtSalesAchieve = achieveInfo[4];
                        var pjtRevenueAchieve = achieveInfo[5];

                        orderAchieve += (pjtAmt * pjtOrderAchieve)/100 || 0;
                        salesAchieve += (pjtAmt * pjtSalesAchieve)/100 || 0;
                        revenueAchieve += ((pjtAmt - pjtRevenueSum) * pjtRevenueAchieve)/100 || 0;
                    }
                }

                var orderScore = 0;
                var salesScore = 0;
                var revenueScore = 0;
                if(goalList[i].ORDER_GOALS != 0 && orderAchieve != 0){
                    orderScore = Math.round(orderAchieve/goalList[i].ORDER_GOALS * 100);
                }

                if(goalList[i].SALES_GOALS != 0 && salesAchieve != 0){
                    salesScore = Math.round(salesAchieve/goalList[i].SALES_GOALS * 100);
                }

                if(goalList[i].REVENUE_GOALS != 0 && revenueAchieve != 0){
                    revenueScore = Math.round(revenueAchieve/goalList[i].REVENUE_GOALS * 100);
                }

                if(goalList[i].DUTY_CODE != '1'){
                    html += '' +
                        '<tr>' +
                            '<td>' + (goalList[i].DEPT_NAME || '') + '</td>' +
                            '<td>' + (goalList[i].TEAM_NAME || '') + '</td>' +
                            '<td>' + (goalList[i].EMP_NAME || '') + '</td>' +
                            '<td>' +
                                '<span id="orderGoals">' + comma(goalList[i].ORDER_GOALS) + '</span>' +
                            '</td>' +
                            '<td>' +
                                '<span id="orderAchieve">' + comma(orderAchieve) + '</span>' +
                            '</td>' +
                            '<td>' +
                                '<span id="orderScore">' + comma(orderScore) + '</span>' +
                            '</td>' +
                            '<td>' +
                                '<span id="salesGoals">' + comma(goalList[i].SALES_GOALS) + '</span>' +
                            '</td>' +
                            '<td>' +
                                '<span id="salesAchieve">' + comma(salesAchieve) + '</span>' +
                            '</td>' +
                            '<td>' +
                                '<span id="salesScore">' + comma(salesScore) + '</span>' +
                            '</td>' +
                            '<td>' +
                                '<span id="revenueGoals">' + comma(goalList[i].REVENUE_GOALS) + '</span>' +
                            '</td>' +
                            '<td>' +
                                '<span id="revenueAchieve">' + comma(revenueAchieve) + '</span>' +
                            '</td>' +
                            '<td>' +
                                '<span id="revenueScore">' + comma(revenueScore) + '</span>' +
                            '</td>' +
                            '<td>' +
                                '<span id="costGoals">' + comma(goalList[i].COST_GOALS) + '</span>' +
                            '</td>' +
                            '<td>' +
                                '<span id="costAchieve">' + comma(0) + '</span>' +
                            '</td>' +
                            '<td>' +
                                '<span id="costScore">0</span>' +
                            '</td>' +
                            '<td>' +
                                '<span id="commerIndexGoals">' + comma(goalList[i].COMMER_INDEX_GOALS) + '</span>' +
                            '</td>' +
                            '<td>' +
                                '<span id="commerIndexAchieve">' + comma(0) + '</span>' +
                            '</td>' +
                            '<td>' +
                                '<span id="commerIndexScore">0</span>' +
                            '</td>' +
                        '</tr>';
                    }
                }
        }else{
            html += '' +
                '<tr style="text-align: center;">' +
                    '<td colspan="18">데이터가 없습니다.</td>' +
                '</tr>';
        }

        $('#evalList').append(html);
    },

    evalReqPop: function(){
        var url = "/Inside/pop/evalReqPop.do";
        var name = "contentPop";
        var option = "width = 850, height = 360, top = 100, left = 200, location = no";
        var popup = window.open(url, name, option);
    },

    evalScorePop: function(){
        var url = "/Inside/pop/evalScorePop.do?searchYear=" + $("#searchYear").val();
        var name = "contentWritePop";
        var option = "width = 1810, height = 800, top = 100, left = 200, location = no";
        var popup = window.open(url, name, option);
    }
}

