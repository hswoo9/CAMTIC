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
            var previousTeamName = null;  // 이전 부서 DEPT_SEQ를 저장하는 변수

            var deptOrderGoalsTotal = 0;
            var deptOrderAchieveTotal = 0;
            var deptOrderScoreTotal = 0;
            var deptSalesGoalsTotal = 0;
            var deptSalesAchieveTotal = 0;
            var deptSalesScoreTotal = 0;
            var deptRevenueGoalsTotal = 0;
            var deptRevenueAchieveTotal = 0;
            var deptRevenueScoreTotal = 0;
            var deptCostGoalsTotal = 0;
            var deptCostAchieveTotal = 0;
            var deptCostScoreTotal = 0;
            var deptCommerIndexGoalsTotal = 0;
            var deptCommerIndexAchieveTotal = 0;
            var deptCommerIndexScoreTotal = 0;

            var allDeptOrderGoalsTotal = 0;
            var allDeptOrderAchieveTotal = 0;
            var allDeptOrderScoreTotal = 0;
            var allDeptSalesGoalsTotal = 0;
            var allDeptSalesAchieveTotal = 0;
            var allDeptSalesScoreTotal = 0;
            var allDeptRevenueGoalsTotal = 0;
            var allDeptRevenueAchieveTotal = 0;
            var allDeptRevenueScoreTotal = 0;
            var allDeptCostGoalsTotal = 0;
            var allDeptCostAchieveTotal = 0;
            var allDeptCostScoreTotal = 0;
            var allDeptCommerIndexGoalsTotal = 0;
            var allDeptCommerIndexAchieveTotal = 0;
            var allDeptCommerIndexScoreTotal = 0;

            for(var i = 0; i < goalList.length; i++){
                var currentTeamName = goalList[i].TEAM_NAME.trim();  // 현재 부서의 DEPT_SEQ

                if(!['1', '2', '3', '4', '5', '7'].includes(goalList[i].DUTY_CODE)){
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

                    previousTeamName = currentTeamName;


                    deptOrderGoalsTotal += Number(goalList[i].ORDER_GOALS);
                    deptOrderAchieveTotal += Number(orderAchieve);
                    deptOrderScoreTotal += Number(orderScore);
                    deptSalesGoalsTotal += Number(goalList[i].SALES_GOALS);
                    deptSalesAchieveTotal += Number(salesAchieve);
                    deptSalesScoreTotal += Number(salesScore);
                    deptRevenueGoalsTotal += Number(goalList[i].REVENUE_GOALS);
                    deptRevenueAchieveTotal += Number(revenueAchieve);
                    deptRevenueScoreTotal += Number(revenueScore);
                    deptCostGoalsTotal += Number(goalList[i].COST_GOALS);
                    deptCostAchieveTotal += 0;
                    deptCostScoreTotal += 0;
                    deptCommerIndexGoalsTotal += Number(goalList[i].COMMER_INDEX_GOALS);
                    deptCommerIndexAchieveTotal += 0;
                    deptCommerIndexScoreTotal += 0;
                }


                if ((previousTeamName !== null && previousTeamName !== currentTeamName) || (i === goalList.length - 1)) {
                    html += '' +
                        '<tr>' +
                        '<th colspan="3">' + previousTeamName + ' 합계</th>' +
                        '<th>' + comma(deptOrderGoalsTotal) + '</th>' +
                        '<th>' + comma(deptOrderAchieveTotal) + '</th>' +
                        '<th>' + comma(deptOrderScoreTotal) + '</th>' +
                        '<th>' + comma(deptSalesGoalsTotal) + '</th>' +
                        '<th>' + comma(deptSalesAchieveTotal) + '</th>' +
                        '<th>' + comma(deptSalesScoreTotal) + '</th>' +
                        '<th>' + comma(deptRevenueGoalsTotal) + '</th>' +
                        '<th>' + comma(deptRevenueAchieveTotal) + '</th>' +
                        '<th>' + comma(deptRevenueScoreTotal) + '</th>' +
                        '<th>' + comma(deptCostGoalsTotal) + '</th>' +
                        '<th>' + comma(deptCostAchieveTotal) + '</th>' +
                        '<th>' + comma(deptCostScoreTotal) + '</th>' +
                        '<th>' + comma(deptCommerIndexGoalsTotal) + '</th>' +
                        '<th>' + comma(deptCommerIndexAchieveTotal) + '</th>' +
                        '<th>' + comma(deptCommerIndexScoreTotal) + '</th>' +
                        '</tr>';

                    allDeptOrderGoalsTotal += deptOrderGoalsTotal;
                    allDeptOrderAchieveTotal += deptOrderAchieveTotal;
                    allDeptOrderScoreTotal += deptOrderScoreTotal;
                    allDeptSalesGoalsTotal += deptSalesGoalsTotal;
                    allDeptSalesAchieveTotal += deptSalesAchieveTotal;
                    allDeptSalesScoreTotal += deptSalesScoreTotal;
                    allDeptRevenueGoalsTotal += deptRevenueGoalsTotal;
                    allDeptRevenueAchieveTotal += deptRevenueAchieveTotal;
                    allDeptRevenueScoreTotal += deptRevenueScoreTotal;
                    allDeptCostGoalsTotal += deptCostGoalsTotal;
                    allDeptCostAchieveTotal += deptCostAchieveTotal;
                    allDeptCostScoreTotal += deptCostScoreTotal;
                    allDeptCommerIndexGoalsTotal += deptCommerIndexGoalsTotal;
                    allDeptCommerIndexAchieveTotal += deptCommerIndexAchieveTotal;
                    allDeptCommerIndexScoreTotal += deptCommerIndexScoreTotal;

                    deptOrderGoalsTotal = 0;
                    deptOrderAchieveTotal = 0;
                    deptOrderScoreTotal = 0;
                    deptSalesGoalsTotal = 0;
                    deptSalesAchieveTotal = 0;
                    deptSalesScoreTotal = 0;
                    deptRevenueGoalsTotal = 0;
                    deptRevenueAchieveTotal = 0;
                    deptRevenueScoreTotal = 0;
                    deptCostGoalsTotal = 0;
                    deptCostAchieveTotal = 0;
                    deptCostScoreTotal = 0;
                    deptCommerIndexGoalsTotal = 0;
                    deptCommerIndexAchieveTotal = 0;
                    deptCommerIndexScoreTotal = 0;

                    if(i === goalList.length - 1){
                        html += '' +
                            '<tr>' +
                                '<th colspan="3">합계</th>' +
                                '<th>' + comma(allDeptOrderGoalsTotal) + '</th>' +
                                '<th>' + comma(allDeptOrderAchieveTotal) + '</th>' +
                                '<th>' + comma(allDeptOrderScoreTotal) + '</th>' +
                                '<th>' + comma(allDeptSalesGoalsTotal) + '</th>' +
                                '<th>' + comma(allDeptSalesAchieveTotal) + '</th>' +
                                '<th>' + comma(allDeptSalesScoreTotal) + '</th>' +
                                '<th>' + comma(allDeptRevenueGoalsTotal) + '</th>' +
                                '<th>' + comma(allDeptRevenueAchieveTotal) + '</th>' +
                                '<th>' + comma(allDeptRevenueScoreTotal) + '</th>' +
                                '<th>' + comma(allDeptCostGoalsTotal) + '</th>' +
                                '<th>' + comma(allDeptCostAchieveTotal) + '</th>' +
                                '<th>' + comma(allDeptCostScoreTotal) + '</th>' +
                                '<th>' + comma(allDeptCommerIndexGoalsTotal) + '</th>' +
                                '<th>' + comma(allDeptCommerIndexAchieveTotal) + '</th>' +
                                '<th>' + comma(allDeptCommerIndexScoreTotal) + '</th>' +
                            '</tr>';
                    }
                }
            }
        }else{
            html += '' +
                '<tr style="text-align: center;">' +
                    '<td colspan="18">데이터가 없습니다.</td>' +
                '</tr>';
        }

        $('#evalList').append(html);


        // if($("#evalList tr").length > 1){
        //     $(".chkTb").show()
        // }else{
        //     $(".chkTb").hide()
        // }
    },

    // evalReqPop: function(){
    //     var goalEmpSeq = "";
    //     if($("#evalList tr").length > 1){
    //         if($("input[name='gaolChk']:checked").length == 0){
    //             alert("수주/매출/수익 설정할 대상을 선택 해주세요.");
    //             return;
    //         }
    //
    //         if($("input[name='gaolChk']:checked").length > 1){
    //             alert("수주/매출/수익 설정은 개인별로 설정할 수 있습니다.");
    //             return;
    //         }
    //
    //         goalEmpSeq = $("input[name='gaolChk']:checked").val()
    //     }else{
    //         goalEmpSeq = $("#empSeq").val()
    //     }
    //
    //     var url = "/Inside/pop/evalReqPop.do?goalEmpSeq=" + goalEmpSeq;
    //     var name = "contentPop";
    //     var option = "width = 850, height = 360, top = 100, left = 200, location = no";
    //     var popup = window.open(url, name, option);
    // },

    evalScorePop: function(){
        var url = "/Inside/pop/evalScorePop.do?searchYear=" + $("#searchYear").val();
        var name = "contentWritePop";
        var option = "width = 1810, height = 800, top = 100, left = 200, location = no";
        var popup = window.open(url, name, option);
    }
}

