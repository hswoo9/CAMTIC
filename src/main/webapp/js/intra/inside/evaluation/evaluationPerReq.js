var now = new Date();

var evaluationPerReq = {
    global : {
        searchAjaxData : "",
        dropDownDataSource : "",
        evalData : null,
        scoreList : new Array(),
        gradingTable : new Array()
    },

    init: function(){
        evaluationPerReq.dataSet();
        evaluationPerReq.getEvalAchieveSet();
        evaluationPerReq.setApproveBtn();
        evaluationPerReq.getEvaluationList();
    },

    dataSet: function (){
        customKendo.fn_datePicker("searchYear", 'decade', "yyyy", new Date());
    },

    getEvalAchieveSet : function(){
        $.ajax({
            url : "/evaluation/getEvalAchieveSet",
            type : "post",
            data : {
                baseYear : $("#searchYear").val(),
            },
            dataType : "json",
            async : false,
            success : function(rs){
                evaluationPerReq.global.gradingTable = rs.rs.ratingList;
            },
            error : function(e) {
                console.log(e);
            }
        });
    },

    getTeamAchieveApprove: function(){
        var rs;
        $.ajax({
            url : "/evaluation/getTeamAchieveApprove",
            type : "post",
            data : {
                baseYear : $("#searchYear").val(),
                teamSeq : $("#regTeamSeq").val(),
            },
            dataType : "json",
            async : false,
            success : function(result){
                rs = result.rs;
            },
            error : function(e) {
            }
        });
        return rs;
    },

    setApproveBtn : function (){
        var result = evaluationPerReq.getTeamAchieveApprove();
        var html = ""
        if(result.teamAchieveApprove != null){
            html += '' +
                '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-base approvalPopup" onclick="approveDocView(' + result.teamAchieveApprove.DOC_ID + ',\'camticEvalAchieve_' + result.teamAchieveApprove.EVAL_ACHIEVE_APPROVE_GROUP + '\',\'evalAchieve\')">' +
                    '<span class=\'k-icon k-i-track-changes-accept k-button-icon\'></span>' +
                    '<span class="k-button-text">' +
                        (result.teamAchieveApprove.APPROVE_STAT_CODE == "100" ? '결재완료' : '결재중')  +
                    '</span>' +
                '</button>'
        }else{
            var evalAchieveSet = result.evalAchieveSet;
            var now = new Date();
            var evalStrDt = new Date(evalAchieveSet.EVAL_STR_DT)
            var evalEndDt = new Date(evalAchieveSet.EVAL_END_DT + "T23:59:59")
            if(result.teamGoalApprove != null && now >= evalStrDt && now <= evalEndDt){
                html += '' +
                    '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-base approvalPopup" onclick="evaluationPerReq.setEvalAchieveApprove()">' +
                        '<span class="k-icon k-i-track-changes-accept k-button-icon"></span>' +
                        '<span class="k-button-text">상신</span>' +
                    '</button>'
            }
        }
        $("#approveDiv").html(html)
    },

    getEvaluationList: function(){
        evaluationPerReq.setApproveBtn();

        $.ajax({
            url : "/evaluation/getEvalGoalList",
            type : "post",
            data : {
                year : $("#searchYear").val(),
                deptSeq : $("#regDeptSeq").val(),
                teamSeq : $("#regTeamSeq").val(),
                dutyCode : $("#regDutyCode").val(),
                empSeq : $("#regEmpSeq").val(),

                startDt : $("#searchYear").val().split("-")[0] + "-01-01",
                endDt : $("#searchYear").val() + "-12-31",
                pjtYear : $("#searchYear").val(),
                record : "Y",
            },
            beforeSend : function(){
                $("#my-spinner").show();
            },
            dataType : "json",
            success : function(result){
                var goalList = result.rs.goalList;
                var achieveList = result.rs.achieveList;
                var pjtList = result.rs.pjtList;
                evaluationPerReq.fn_addEvalList(goalList, achieveList, pjtList);
                $("#my-spinner").hide();
            },
            error : function(e) {
                console.log(e);
                $("#my-spinner").hide();
            }
        });
    },

    fn_addEvalList: function(goalList, achieveList, pjtList){
        $('#evalList').empty();
        var html = "";
        if(goalList.length > 0){
            var previousTeamName = null;  // 이전 부서 DEPT_SEQ를 저장하는 변수

            var deptOrderGoals = 0;
            var deptOrderAchieve = 0;
            var deptOrderScore = 0;
            var deptSalesGoals = 0;
            var deptSalesAchieve = 0;
            var deptSalesScore = 0;
            var deptRevenueGoals = 0;
            var deptRevenueAchieve = 0;
            var deptRevenueScore = 0;
            var deptCostGoals = 0;
            var deptCostAchieve = 0;
            // var deptCostScore = 0;
            var deptCommerIndexGoals = 0;
            var deptCommerIndexAchieve = 0;
            // var deptCommerIndexScore = 0;

            var allDeptOrderGoals = 0;
            var allDeptOrderAchieve = 0;
            var allDeptOrderScore = 0;
            var allDeptSalesGoals = 0;
            var allDeptSalesAchieve = 0;
            var allDeptSalesScore = 0;
            var allDeptRevenueGoals = 0;
            var allDeptRevenueAchieve = 0;
            var allDeptRevenueScore = 0;
            var allDeptCostGoals = 0;
            var allDeptCostAchieve = 0;
            // var allDeptCostScore = 0;
            var allDeptCommerIndexGoals = 0;
            var allDeptCommerIndexAchieve = 0;
            // var allDeptCommerIndexScore = 0;

            var teamCnt = {};

            if(goalList.filter(l => !['1', '2', '3', '4', '5', '7'].includes(l.DUTY_CODE)  && l.DEPT_NAME != '' && l.TEAM_NAME != '').length > 0){
                for(var i = 0; i < goalList.length; i++){
                    var currentTeamName = goalList[i].TEAM_NAME.trim();  // 현재 부서의 DEPT_SEQ

                    if(!['1', '2', '3', '4', '5', '7'].includes(goalList[i].DUTY_CODE) && goalList[i].DEPT_NAME != '' && goalList[i].TEAM_NAME != ''){
                        var empEchieve = achieveList.find(e => e.EMP_SEQ == goalList[i].EMP_SEQ);
                        var orderAchieve = 0;
                        var salesAchieve = 0;
                        var revenueAchieve = 0;
                        var costAchieve = 0;
                        var commerIndexAchieve = 0;

                        if (teamCnt[currentTeamName]) {
                            teamCnt[currentTeamName]++;
                        } else {
                            teamCnt[currentTeamName] = 1;
                        }

                        if(empEchieve != null){
                            var achieve = empEchieve.ACHIEVE.split('|');
                            for(var j = 0; j < achieve.length; j++){
                                /** 데이터 형태 = EMP_SEQ_PJT_SN_ORDER_ACHIEVE_SALES_ACHIEVE_REVENUE_ACHIEVE */
                                var achieveInfo = achieve[j].split("_");
                                var pjtSn = achieveInfo[1];
                                var pjt = pjtList.find(o => o.PJT_SN == pjtSn);
                                var pjtOrder = Number(costCalc.allPjtAmt(pjt) || 0);
                                var pjtSales = Number(costCalc.resSaleAmt(pjt) || 0);
                                var pjtRevenue = Number(costCalc.resProfitAmt(pjt) || 0);

                                var pjtOrderAchieve = achieveInfo[2];
                                var pjtSalesAchieve = achieveInfo[3];
                                var pjtRevenueAchieve = achieveInfo[4];

                                orderAchieve += (pjtOrder * pjtOrderAchieve)/100 || 0;
                                salesAchieve += (pjtSales * pjtSalesAchieve)/100 || 0;
                                revenueAchieve += (pjtRevenue * pjtRevenueAchieve)/100 || 0;
                            }
                        }

                        var orderScore = 0;
                        var salesScore = 0;
                        var revenueScore = 0;
                        // var costScore = 0;
                        // var commerIndexGoalsScore = 0;
                        if(goalList[i].ORDER_GOALS != 0 && orderAchieve != 0){
                            orderScore = Math.round(orderAchieve/goalList[i].ORDER_GOALS * 100);
                        }

                        if(goalList[i].SALES_GOALS != 0 && salesAchieve != 0){
                            salesScore = Math.round(salesAchieve/goalList[i].SALES_GOALS * 100);
                        }

                        if(goalList[i].REVENUE_GOALS != 0 && revenueAchieve != 0){
                            revenueScore = Math.round(revenueAchieve/goalList[i].REVENUE_GOALS * 100);
                        }

                        // if(goalList[i].COST_GOALS != 0 && costAchieve != 0){
                        //     costScore = Math.round(costAchieve/goalList[i].COST_GOALS * 100);
                        // }

                        if(revenueAchieve != 0 && costAchieve != 0){
                            let result = (revenueAchieve / costAchieve) * 100 || 0;
                            commerIndexAchieve = Math.round(result * 10) / 10;
                        }

                        // if(goalList[i].COMMER_INDEX_GOALS != 0 && commerIndexAchieve != 0){
                        //     commerIndexGoalsScore = Math.round(commerIndexAchieve/goalList[i].COMMER_INDEX_GOALS * 100);
                        // }

                        html += '' +
                            '<tr name="achieveEmpSeq" empSeq="' + goalList[i].EMP_SEQ + '">' +
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
                                    '<span id="orderScore">' + orderScore + '</span>' +
                                '</td>' +
                                '<td>' +
                                    '<span id="orderConScore">' + evaluationPerReq.getEvalRating(orderScore, 'con') + '</span>' +
                                '</td>' +
                                // '<td>' +
                                //     '<span id="orderRating">' + evaluationPerReq.getEvalRating(orderScore, 'rating') + '</span>' +
                                // '</td>' +
                                '<td>' +
                                    '<span id="salesGoals">' + comma(goalList[i].SALES_GOALS) + '</span>' +
                                '</td>' +
                                '<td>' +
                                    '<span id="salesAchieve">' + comma(salesAchieve) + '</span>' +
                                '</td>' +
                                '<td>' +
                                    '<span id="salesScore">' + salesScore + '</span>' +
                                '</td>' +
                                '<td>' +
                                    '<span id="salesConScore">' + evaluationPerReq.getEvalRating(salesScore, 'con') + '</span>' +
                                '</td>' +
                                // '<td>' +
                                //     '<span id="salesRating">' + evaluationPerReq.getEvalRating(salesScore, 'rating') + '</span>' +
                                // '</td>' +
                                '<td>' +
                                    '<span id="revenueGoals">' + comma(goalList[i].REVENUE_GOALS) + '</span>' +
                                '</td>' +
                                '<td>' +
                                    '<span id="revenueAchieve">' + comma(revenueAchieve) + '</span>' +
                                '</td>' +
                                '<td>' +
                                    '<span id="revenueScore">' + revenueScore + '</span>' +
                                '</td>' +
                                '<td>' +
                                    '<span id="revenueConScore">' + evaluationPerReq.getEvalRating(revenueScore, 'con') + '</span>' +
                                '</td>' +
                                // '<td>' +
                                //     '<span id="revenueRating">' + evaluationPerReq.getEvalRating(revenueScore, 'rating') + '</span>' +
                                // '</td>' +
                                '<td>' +
                                    '<span id="costGoals">' + comma(goalList[i].COST_GOALS) + '</span>' +
                                '</td>' +
                                '<td>' +
                                    '<span id="costAchieve">' + comma(costAchieve) + '</span>' +
                                '</td>' +
                                // '<td>' +
                                //     '<span id="costScore">' + costScore + '</span>' +
                                // '</td>' +
                                // '<td>' +
                                //     '<span id="costConScore">' + evaluationPerReq.getEvalRating(costScore, 'con') + '</span>' +
                                // '</td>' +
                                // '<td>' +
                                //     '<span id="costRating">' + evaluationPerReq.getEvalRating(costScore, 'rating') + '</span>' +
                                // '</td>' +
                                '<td>' +
                                    '<span id="commerIndexGoals">' + goalList[i].COMMER_INDEX_GOALS + '</span>' +
                                '</td>' +
                                '<td>' +
                                    '<span id="commerIndexAchieve">' + commerIndexAchieve + '</span>' +
                                '</td>' +
                                // '<td>' +
                                //     '<span id="commerIndexScore">' + commerIndexGoalsScore + '</span>' +
                                // '</td>' +
                                // '<td>' +
                                //     '<span id="commerIndexConScore">' + evaluationPerReq.getEvalRating(commerIndexGoalsScore, 'con') + '</span>' +
                                // '</td>' +
                                // '<td>' +
                                //     '<span id="commerIndexRating">' + evaluationPerReq.getEvalRating(commerIndexGoalsScore, 'rating') + '</span>' +
                                // '</td>' +
                            '</tr>';

                        previousTeamName = currentTeamName;

                        deptOrderGoals += Number(goalList[i].ORDER_GOALS);
                        deptOrderAchieve += Number(orderAchieve);
                        deptSalesGoals += Number(goalList[i].SALES_GOALS);
                        deptSalesAchieve += Number(salesAchieve);
                        deptRevenueGoals += Number(goalList[i].REVENUE_GOALS);
                        deptRevenueAchieve += Number(revenueAchieve);
                        deptCostGoals += Number(goalList[i].COST_GOALS);
                        deptCostAchieve += Number(costAchieve);
                    }

                    if ((previousTeamName != ""  && currentTeamName != "" && previousTeamName != null && previousTeamName != currentTeamName) || (i === goalList.length - 1)) {

                        /** 부서 수주 반영 점수 */
                        if(deptOrderGoals != 0 && deptOrderAchieve != 0){
                            deptOrderScore = Math.round(deptOrderAchieve/deptOrderGoals * 100);
                        }

                        /** 부서 매출 반영 점수 */
                        if(deptSalesGoals != 0 && deptSalesAchieve != 0){
                            deptSalesScore = Math.round(deptSalesAchieve/deptSalesGoals * 100);
                        }

                        /** 부서 수익 반영 점수 */
                        if(deptRevenueGoals != 0 && deptRevenueAchieve != 0){
                            deptRevenueScore = Math.round(deptRevenueAchieve/deptRevenueGoals * 100);
                        }

                        /** 부서 비용 반영 점수 */
                        // if(deptCostGoals != 0 && deptCostAchieve != 0){
                        //     deptCostScore = Math.round(deptCostAchieve/deptCostGoals * 100);
                        // }

                        /** 부서 사업화지수 목표 */
                        if(deptRevenueGoals != 0 && deptCostGoals != 0){
                            let result = (deptRevenueGoals / deptCostGoals) * 100 || 0;
                            deptCommerIndexGoals = Math.round(result * 10) / 10;
                        }

                        /** 부서 사업화지수 달성 */
                        if(deptRevenueAchieve != 0 && deptCostAchieve != 0){
                            let result = (deptRevenueAchieve / deptCostAchieve) * 100 || 0;
                            deptCommerIndexAchieve = Math.round(result * 10) / 10;
                        }

                        /** 부서 사업화지수 반영점수 */
                        // if(deptCommerIndexGoals != 0 && deptCommerIndexAchieve != 0){
                        //     deptCommerIndexScore = Math.round(deptCommerIndexAchieve/deptCommerIndexGoals * 100);
                        // }

                        html += '' +
                            '<tr>' +
                                '<th colspan="3">' + previousTeamName + ' 합계</th>' +

                                '<th>' + comma(deptOrderGoals) + '</th>' +
                                '<th>' + comma(deptOrderAchieve) + '</th>' +
                                '<th>' + deptOrderScore + '</th>' +
                                '<th>' + evaluationPerReq.getEvalRating(deptOrderScore, 'con') + '</th>' +
                                // '<th>' + evaluationPerReq.getEvalRating(deptOrderScore, 'rating') + '</th>' +

                                '<th>' + comma(deptSalesGoals) + '</th>' +
                                '<th>' + comma(deptSalesAchieve) + '</th>' +
                                '<th>' + deptSalesScore + '</th>' +
                                '<th>' + evaluationPerReq.getEvalRating(deptSalesScore, 'con') + '</th>' +
                                // '<th>' + evaluationPerReq.getEvalRating(deptSalesScore, 'rating') + '</th>' +

                                '<th>' + comma(deptRevenueGoals) + '</th>' +
                                '<th>' + comma(deptRevenueAchieve) + '</th>' +
                                '<th>' + deptRevenueScore + '</th>' +
                                '<th>' + evaluationPerReq.getEvalRating(deptRevenueScore, 'con') + '</th>' +
                                // '<th>' + evaluationPerReq.getEvalRating(deptRevenueScore, 'rating') + '</th>' +

                                '<th>' + comma(deptCostGoals) + '</th>' +
                                '<th>' + comma(deptCostAchieve) + '</th>' +
                                // '<th>' + deptCostScore + '</th>' +
                                // '<th>' + evaluationPerReq.getEvalRating(deptCostScore, 'con') + '</th>' +
                                // '<th>' + evaluationPerReq.getEvalRating(deptCostScore, 'rating') + '</th>' +

                                '<th>' + comma(deptCommerIndexGoals) + '</th>' +
                                '<th>' + comma(deptCommerIndexAchieve) + '</th>' +
                                // '<th>' + deptCommerIndexScore + '</th>' +
                                // '<th>' + evaluationPerReq.getEvalRating(deptCommerIndexScore, 'con') + '</th>' +
                                // '<th>' + evaluationPerReq.getEvalRating(deptCommerIndexScore, 'rating') + '</th>' +
                            '</tr>';

                        allDeptOrderGoals += deptOrderGoals;
                        allDeptOrderAchieve += deptOrderAchieve;
                        allDeptSalesGoals += deptSalesGoals;
                        allDeptSalesAchieve += deptSalesAchieve;
                        allDeptRevenueGoals += deptRevenueGoals;
                        allDeptRevenueAchieve += deptRevenueAchieve;
                        allDeptCostGoals += deptCostGoals;
                        allDeptCostAchieve += deptCostAchieve;

                        deptOrderGoals = 0;
                        deptOrderAchieve = 0;
                        deptOrderScore = 0;
                        deptSalesGoals = 0;
                        deptSalesAchieve = 0;
                        deptSalesScore = 0;
                        deptRevenueGoals = 0;
                        deptRevenueAchieve = 0;
                        deptRevenueScore = 0;
                        deptCostGoals = 0;
                        deptCostAchieve = 0;
                        // deptCostScore = 0;
                        deptCommerIndexGoals = 0;
                        deptCommerIndexAchieve = 0;
                        // deptCommerIndexScore = 0;


                        if(i === goalList.length - 1 && Object.keys(teamCnt).length > 1){

                            /** 전체부서 수주 반영 점수 */
                            if(allDeptOrderGoals != 0 && allDeptOrderAchieve != 0){
                                allDeptOrderScore = Math.round(allDeptOrderAchieve/allDeptOrderGoals * 100);
                            }

                            /** 전체부서 매출 반영 점수 */
                            if(allDeptSalesGoals != 0 && allDeptSalesAchieve != 0){
                                allDeptSalesScore = Math.round(allDeptSalesAchieve/allDeptSalesGoals * 100);
                            }

                            /** 전체부서 수익 반영 점수 */
                            if(allDeptRevenueGoals != 0 && allDeptRevenueAchieve != 0){
                                allDeptRevenueScore = Math.round(allDeptRevenueAchieve/allDeptRevenueGoals * 100);
                            }

                            /** 전체부서 비용 반영 점수 */
                            // if(allDeptCostGoals != 0 && allDeptCostAchieve != 0){
                            //     allDeptCostScore = Math.round(allDeptCostAchieve/allDeptCostGoals * 100);
                            // }

                            /** 전체부서 사업화지수 목표 */
                            if(allDeptRevenueGoals != 0 && allDeptCostGoals != 0){
                                let result = (allDeptRevenueGoals / allDeptCostGoals) * 100 || 0;
                                allDeptCommerIndexGoals = Math.round(result * 10) / 10;
                            }

                            /** 전체부서 사업화지수 달성 */
                            if(allDeptRevenueAchieve != 0 && allDeptCostAchieve != 0){
                                let result = (allDeptRevenueAchieve / allDeptCostAchieve) * 100 || 0;
                                allDeptCommerIndexAchieve = Math.round(result * 10) / 10;
                            }


                            /** 전체부서 사업화지수 점수 */
                            // if(allDeptCommerIndexGoals != 0 && allDeptCommerIndexAchieve != 0){
                            //     allDeptCommerIndexScore = Math.round(allDeptCommerIndexAchieve/allDeptCommerIndexGoals * 100);
                            // }

                            html += '' +
                                '<tr>' +
                                    '<th colspan="3">합계</th>' +
                                    '<th>' + comma(allDeptOrderGoals) + '</th>' +
                                    '<th>' + comma(allDeptOrderAchieve) + '</th>' +
                                    '<th>' + allDeptOrderScore + '</th>' +
                                    '<th>' + evaluationPerReq.getEvalRating(allDeptOrderScore, 'con') + '</th>' +
                                    // '<th>' + evaluationPerReq.getEvalRating(allDeptOrderScore, 'rating') + '</th>' +

                                    '<th>' + comma(allDeptSalesGoals) + '</th>' +
                                    '<th>' + comma(allDeptSalesAchieve) + '</th>' +
                                    '<th>' + allDeptSalesScore + '</th>' +
                                    '<th>' + evaluationPerReq.getEvalRating(allDeptSalesScore, 'con') + '</th>' +
                                    // '<th>' + evaluationPerReq.getEvalRating(allDeptSalesScore, 'rating') + '</th>' +

                                    '<th>' + comma(allDeptRevenueGoals) + '</th>' +
                                    '<th>' + comma(allDeptRevenueAchieve) + '</th>' +
                                    '<th>' + allDeptRevenueScore + '</th>' +
                                    '<th>' + evaluationPerReq.getEvalRating(allDeptRevenueScore, 'con') + '</th>' +
                                    // '<th>' + evaluationPerReq.getEvalRating(allDeptRevenueScore, 'rating') + '</th>' +

                                    '<th>' + comma(allDeptCostGoals) + '</th>' +
                                    '<th>' + comma(allDeptCostAchieve) + '</th>' +
                                    // '<th>' + allDeptCostScore + '</th>' +
                                    // '<th>' + evaluationPerReq.getEvalRating(allDeptCostScore, 'con') + '</th>' +
                                    // '<th>' + evaluationPerReq.getEvalRating(allDeptCostScore, 'rating') + '</th>' +

                                    '<th>' + comma(allDeptCommerIndexGoals) + '</th>' +
                                    '<th>' + comma(allDeptCommerIndexAchieve) + '</th>' +
                                    // '<th>' + allDeptCommerIndexScore + '</th>' +
                                    // '<th>' + evaluationPerReq.getEvalRating(allDeptCommerIndexScore, 'con') + '</th>' +
                                    // '<th>' + evaluationPerReq.getEvalRating(allDeptCommerIndexScore, 'rating') + '</th>' +
                                '</tr>';
                        }
                    }
                }
            }else{
                html += '' +
                    '<tr style="text-align: center;">' +
                    '<td colspan="19">데이터가 없습니다.</td>' +
                    '</tr>';
            }
        }else{
            html += '' +
                '<tr style="text-align: center;">' +
                    '<td colspan="19">데이터가 없습니다.</td>' +
                '</tr>';
        }

        $('#evalList').append(html);
    },

    evalScorePop: function(){
        var url = "/Inside/pop/evalScorePop.do?searchYear=" + $("#searchYear").val();
        var name = "contentWritePop";
        var option = "width = 1810, height = 800, top = 100, left = 200, location = no";
        var popup = window.open(url, name, option);
    },

    getEvalRating : function(e, type){
        if(type == "con"){
            // 범위 밖 점수 처리: 점수가 150 이상이면 최대 환산점수 120 반환
            if (e > Number(evaluationPerReq.global.gradingTable[evaluationPerReq.global.gradingTable.length - 1].BASE_SCORE)) {
                return Number(evaluationPerReq.global.gradingTable[evaluationPerReq.global.gradingTable.length - 1].CONVERSION_SCORE); // 범위 밖 점수일 경우 최대 환산점수
            }

            // 근사치 사용: 기준점수에 가장 가까운 환산점수를 찾아 반환
            for (let i = evaluationPerReq.global.gradingTable.length - 1; i >= 0; i--) {
                if (e >= Number(evaluationPerReq.global.gradingTable[i].BASE_SCORE)) {
                    return Number(evaluationPerReq.global.gradingTable[i].CONVERSION_SCORE); // 해당하는 환산점수 반환
                }
            }

            return null;
        }else{
            // 범위 밖 점수 처리: 점수가 150 이상이면 "SS" 등급 반환
            if (e > Number(evaluationPerReq.global.gradingTable[evaluationPerReq.global.gradingTable.length - 1].BASE_SCORE)) {
                return Number(evaluationPerReq.global.gradingTable[evaluationPerReq.global.gradingTable.length - 1].RATING); // 범위 밖 점수일 경우 최대 등급
            }

            // 근사치 사용: 기준점수에 가장 가까운 평가 등급을 찾아 반환
            for (let i = evaluationPerReq.global.gradingTable.length - 1; i >= 0; i--) {
                if (e >= Number(evaluationPerReq.global.gradingTable[i].BASE_SCORE)) {
                    return evaluationPerReq.global.gradingTable[i].RATING; // 해당하는 평가 등급 반환
                }
            }

            return null;
        }
    },

    setEvalAchieveApprove : function(){
        var rs = evaluationPerReq.getTeamAchieveApprove();
        if(rs.teamAchieveApprove != null){
            alert("개인별 업적평가가 결재진행중입니다.");
            return;
        }

        if($("#evalList tr[name='achieveEmpSeq']").length == 0){
            alert("저장할 개인별 업적평가 데이터가 없습니다.");
            return;
        }


        var empEvalAchieveArr = new Array();
        $("#evalList tr[name='achieveEmpSeq']").each(function(i, v){
            var data = {
                baseYear : $("#searchYear").val(),
                teamSeq : $("#regTeamSeq").val(),
                empSeq : $(this).attr("empSeq"),
                orderGoals : uncomma($(this).find("span#orderGoals").text()),
                orderAchieve : uncomma($(this).find("span#orderAchieve").text()),
                salesGoals : uncomma($(this).find("span#salesGoals").text()),
                salesAchieve : uncomma($(this).find("span#salesAchieve").text()),
                revenueGoals : uncomma($(this).find("span#revenueGoals").text()),
                revenueAchieve : uncomma($(this).find("span#revenueAchieve").text()),
                costGoals : uncomma($(this).find("span#costGoals").text()),
                costAchieve : uncomma($(this).find("span#costAchieve").text()),
                commerIndexGoals : $(this).find("span#commerIndexGoals").text(),
                commerIndexAchieve : $(this).find("span#commerIndexAchieve").text(),
                regEmpSeq : $("#regEmpSeq").val(),
            }

            empEvalAchieveArr.push(data);
        })

        $.ajax({
            url : "/evaluation/setEvalAchieveApprove",
            data : {
                empEvalAchieveArr : JSON.stringify(empEvalAchieveArr)
            },
            dataType : "json",
            type : "post",
            success: function (rs) {
                $("#approveTeamSeq").val($("#regTeamSeq").val())
                $("#evalAchieveApproveGroup").val(rs.params.evalAchieveApproveGroup)
                evaluationPerReq.evalAchieveDrafting()
            },
            error: function () {
                alert("신청 데이터 저장 중 에러가 발생했습니다.");
            }
        });
    },

    evalAchieveDrafting : function(){
        $("#evalAchieveDraftFrm").one("submit", function() {
            var url = "/popup/evaluation/approvalFormPopup/evalAchieveApprovalPop.do";
            var name = "evalAchieveApprovalPop";
            var option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=yes, scrollbars = yes, status=no, top=50, left=50"
            var popup = window.open(url, name, option);

            this.action = url;
            this.method = 'POST';
            this.target = 'evalAchieveApprovalPop';
        }).trigger("submit");
    },
}

