var now = new Date();

var evalAchieveResult = {
    global : {
        searchAjaxData : "",
        dropDownDataSource : "",
        gradingTable : new Array()
    },

    init: function(){
        evalAchieveResult.dataSet();
    },

    dataSet: function (){
        evalAchieveResult.getEvalAchieveSet();
        evalAchieveResult.getEvalAchieveResultList();

        let data = {}
        data.deptLevel = 1;
        const deptDsA = customKendo.fn_customAjax("/dept/getDeptAList", data);

        customKendo.fn_dropDownList("dept", deptDsA.rs, "dept_name", "dept_seq");

        $("#dept").data("kendoDropDownList").bind("change", evalAchieveResult.changeDeptComp)
        $("#dept").data("kendoDropDownList").select(0);
        $("#dept").data("kendoDropDownList").trigger("change");

        evalAchieveResult.global.dropDownDataSource = customKendo.fn_customAjax("/system/commonCodeManagement/getCmCodeList", {cmGroupCodeId : "4"});
        customKendo.fn_dropDownList("position", evalAchieveResult.global.dropDownDataSource, "CM_CODE_NM", "CM_CODE", 2);
        evalAchieveResult.global.dropDownDataSource = customKendo.fn_customAjax("/system/commonCodeManagement/getCmCodeList", {cmGroupCodeId : "3"});
        customKendo.fn_dropDownList("duty", evalAchieveResult.global.dropDownDataSource, "CM_CODE_NM", "CM_CODE", 2);
    },

    changeDeptComp : function(){
        let data = {}
        data.deptLevel = 2;
        data.parentDeptSeq = this.value();

        const ds = customKendo.fn_customAjax("/dept/getDeptAList", data);
        customKendo.fn_dropDownList("team", ds.rs, "dept_name", "dept_seq")
        evalAchieveResult.getEvalAchieveResultList();
    },

    getEvalAchieveSet : function(){
        $.ajax({
            url : "/evaluation/getEvalAchieveSet",
            type : "post",
            data : {
                year : $("#baseYear").val(),
                baseYear : $("#baseYear").val(),
            },
            dataType : "json",
            async : false,
            success : function(rs){
                evalAchieveResult.global.evalAchieveSet = rs.rs;
                evalAchieveResult.global.gradingTable = rs.rs.ratingList;
            },
            error : function(e) {
                console.log(e);
            }
        });
    },

    getEvalAchieveResultList : function(){
        $.ajax({
            url : "/evaluation/getEvalAchieveResultList",
            type : "post",
            data : {
                baseYear : $("#baseYear").val(),
                dept : $("#dept").val(),
                team : $("#team").val(),
                position : $("#position").val(),
                duty : $("#duty").val()
            },
            dataType : "json",
            async : false,
            success : function(result){
                evalAchieveResult.fn_addTbody(result.rs);
                evalAchieveResult.hiddenGrid();
            },
            error : function(e) {
                console.log(e);
            }
        });
    },

    fn_addTbody : function(rs){
        $("#evalList").empty();

        var html = "";

        if(rs.length > 0){
            var nextTeamName = null;  // 다음 팀 DEPT_SEQ를 저장하는 변수
            var nextDeptName = null;  // 다음 부서 DEPT_SEQ를 저장하는 변수

            var teamOrderGoals = 0;
            var teamOrderAchieve = 0;
            var teamOrderScore = 0;
            var teamSalesGoals = 0;
            var teamSalesAchieve = 0;
            var teamSalesScore = 0;
            var teamRevenueGoals = 0;
            var teamRevenueAchieve = 0;
            var teamRevenueScore = 0;
            var teamCostGoals = 0;
            var teamCostAchieve = 0;
            var teamCostScore = 0;
            var teamCommerIndexGoals = 0;
            var teamCommerIndexAchieve = 0;
            var teamCommerIndexScore = 0;

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
            var deptCostScore = 0;
            var deptCommerIndexGoals = 0;
            var deptCommerIndexAchieve = 0;
            var deptCommerIndexScore = 0;

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
            var allDeptCostScore = 0;
            var allDeptCommerIndexGoals = 0;
            var allDeptCommerIndexAchieve = 0;
            var allDeptCommerIndexScore = 0;

            var deptCnt = {};
            var teamCnt = {};

            var orderWeights = Number(evalAchieveResult.global.evalAchieveSet.ORDER_WEIGHTS)
            var salesWeights = Number(evalAchieveResult.global.evalAchieveSet.SALES_WEIGHTS)
            var revenueWeights = Number(evalAchieveResult.global.evalAchieveSet.REVENUE_WEIGHTS)

            rs = rs.filter(l => !['1', '2', '3', '4', '5', '7'].includes(l.DUTY_CODE) && l.DEPT_NAME != '' && l.TEAM_NAME != '');
            for(var i = 0 ; i < rs.length ; i++) {
                var currentTeamName = rs[i].TEAM_NAME.trim();  // 현재 팀의 DEPT_SEQ
                var currentDeptName = rs[i].DEPT_NAME.trim();  // 현재 부서의 DEPT_SEQ

                /** 사용자 */
                var orderScore = 0;
                var salesScore = 0;
                var revenueScore = 0;
                var costScore = 0;
                var commerIndexGoalsScore = 0;

                if (deptCnt[currentDeptName]) {
                    deptCnt[currentDeptName]++;
                } else {
                    deptCnt[currentDeptName] = 1;
                }

                if (teamCnt[currentTeamName]) {
                    teamCnt[currentTeamName]++;
                } else {
                    teamCnt[currentTeamName] = 1;
                }

                if(rs[i].ORDER_GOALS != 0 && rs[i].ORDER_ACHIEVE != 0){
                    orderScore = Math.round(rs[i].ORDER_ACHIEVE/rs[i].ORDER_GOALS * 100);
                }

                if(rs[i].SALES_GOALS != 0 && rs[i].SALES_ACHIEVE != 0){
                    salesScore = Math.round(rs[i].SALES_ACHIEVE/rs[i].SALES_GOALS * 100);
                }

                if(rs[i].REVENUE_GOALS != 0 && rs[i].REVENUE_ACHIEVE != 0){
                    revenueScore = Math.round(rs[i].REVENUE_ACHIEVE/rs[i].REVENUE_GOALS * 100);
                }

                if(rs[i].COST_GOALS != 0 && rs[i].COST_ACHIEVE != 0){
                    costScore = Math.round(rs[i].COST_ACHIEVE/rs[i].COST_GOALS * 100);
                }

                if(rs[i].COMMER_INDEX_GOALS != 0 && rs[i].COMMER_INDEX_ACHIEVE != 0){
                    commerIndexGoalsScore = Math.round(rs[i].COMMER_INDEX_ACHIEVE/rs[i].COMMER_INDEX_GOALS * 100);
                }


                var orderScoreCon = evalAchieveResult.getEvalRating(orderScore, 'con');
                var salesScoreCon = evalAchieveResult.getEvalRating(salesScore, 'con');
                var revenueScoreCon = evalAchieveResult.getEvalRating(revenueScore, 'con');

                var scoreSum =
                    (orderScoreCon * (orderWeights / 100)) +
                    (salesScoreCon * (salesWeights / 100)) +
                    (revenueScoreCon * (revenueWeights / 100));

                var profitOrLoss = 0;

                html += '' +
                    '<tr>' +
                        '<td>' + rs[i].DEPT_NAME + '</td>' +
                        '<td>' + rs[i].TEAM_NAME + '</td>' +
                        '<td>' + rs[i].EMP_NAME + '</td>' +
                        '<td style="text-align: center">' + orderScore + '</td>' +
                        '<td style="text-align: center">' + orderScoreCon + '</td>' +
                        // '<td style="text-align: center">' + evalAchieveResult.getEvalRating(orderScore, 'rating')+ '</td>' +

                        '<td style="text-align: center">' + salesScore + '</td>' +
                        '<td style="text-align: center">' + salesScoreCon + '</td>' +
                        // '<td style="text-align: center">' + evalAchieveResult.getEvalRating(salesScore, 'rating')+ '</td>' +

                        '<td style="text-align: center">' + revenueScore + '</td>' +
                        '<td style="text-align: center">' + revenueScoreCon + '</td>' +
                        // '<td style="text-align: center">' + evalAchieveResult.getEvalRating(revenueScore, 'rating')+ '</td>' +

                        '<td style="text-align: center">' + scoreSum + '</td>' +
                        '<td style="text-align: center">' + evalAchieveResult.getEvalRating(scoreSum, 'rating') + '</td>' +

                        '<td style="text-align: center">' + costScore + '</td>' +
                        '<td style="text-align: center">' + evalAchieveResult.getEvalRating(costScore, 'con') + '</td>' +
                        // '<td style="text-align: center">' + evalAchieveResult.getEvalRating(costScore, 'rating')+ '</td>' +

                        '<td style="text-align: center">' + (Number(rs[i].REVENUE_ACHIEVE) - Number(rs[i].COST_ACHIEVE)) + '</td>' +

                        '<td style="text-align: center">' + commerIndexGoalsScore + '</td>' +
                        '<td style="text-align: center">' + evalAchieveResult.getEvalRating(commerIndexGoalsScore, 'con')+ '</td>' +
                        // '<td style="text-align: center">' + evalAchieveResult.getEvalRating(commerIndexGoalsScore, 'rating')+ '</td>' +
                    '</tr>';

                if(i+1 < rs.length){
                    nextTeamName = rs[i+1].TEAM_NAME.trim();
                    nextDeptName = rs[i+1].DEPT_NAME.trim();
                }


                teamOrderGoals += Number(rs[i].ORDER_GOALS);
                teamOrderAchieve += Number(rs[i].ORDER_ACHIEVE);
                teamSalesGoals += Number(rs[i].SALES_GOALS);
                teamSalesAchieve += Number(rs[i].SALES_ACHIEVE);
                teamRevenueGoals += Number(rs[i].REVENUE_GOALS);
                teamRevenueAchieve += Number(rs[i].REVENUE_ACHIEVE);
                teamCostGoals += Number(rs[i].COST_GOALS);
                teamCostAchieve += Number(rs[i].COST_ACHIEVE);

                /** 팀 */
                if ((nextTeamName != "" && currentTeamName != "" && nextTeamName != null && nextTeamName != currentTeamName) || (i === rs.length - 1)) {

                    /** 팀 수주 반영 점수 */
                    if(teamOrderGoals != 0 && teamOrderAchieve != 0){
                        teamOrderScore = Math.round(teamOrderAchieve/teamOrderGoals * 100);
                    }

                    /** 팀 매출 반영 점수 */
                    if(teamSalesGoals != 0 && teamSalesAchieve != 0){
                        teamSalesScore = Math.round(teamSalesAchieve/teamSalesGoals * 100);
                    }

                    /** 팀 수익 반영 점수 */
                    if(teamRevenueGoals != 0 && teamRevenueAchieve != 0){
                        teamRevenueScore = Math.round(teamRevenueAchieve/teamRevenueGoals * 100);
                    }

                    /** 팀 비용 반영 점수 */
                    if(teamCostGoals != 0 && teamCostAchieve != 0){
                        teamCostScore = Math.round(teamCostAchieve/teamCostGoals * 100);
                    }

                    /** 팀 사업화지수 목표 */
                    if(teamRevenueGoals != 0 && teamCostGoals != 0){
                        let result = (teamRevenueGoals / teamCostGoals) * 100 || 0;
                        teamCommerIndexGoals = Math.round(result * 10) / 10;
                    }

                    /** 팀 사업화지수 달성 */
                    if(teamRevenueAchieve != 0 && teamCostAchieve != 0){
                        let result = (teamRevenueAchieve / teamCostAchieve) * 100 || 0;
                        teamCommerIndexAchieve = Math.round(result * 10) / 10;
                    }

                    /** 팀 사업화지수 반영점수 */
                    if(teamCommerIndexGoals != 0 && teamCommerIndexAchieve != 0){
                        teamCommerIndexScore = Math.round(teamCommerIndexAchieve/teamCommerIndexGoals * 100);
                    }

                    var teamOrderScoreCon = evalAchieveResult.getEvalRating(teamOrderScore, 'con');
                    var teamSalesScoreCon = evalAchieveResult.getEvalRating(teamSalesScore, 'con');
                    var teamRevenueScoreCon = evalAchieveResult.getEvalRating(teamRevenueScore, 'con');
                    var teamScoreSum =
                        (teamOrderScoreCon * (orderWeights / 100)) +
                        (teamSalesScoreCon * (salesWeights / 100)) +
                        (teamRevenueScoreCon * (revenueWeights / 100));

                    html += '' +
                        '<tr class="sumTr">' +
                            '<th class="text-center th-color"  style="background-color: #8fa1c04a" colspan="3">' + currentTeamName + ' 합계</th>' +
                            '<th class="text-center th-color" style="background-color: #8fa1c04a">' + teamOrderScore + '</th>' +
                            '<th class="text-center th-color" style="background-color: #8fa1c04a">' + teamOrderScoreCon + '</th>' +
                            // '<th class="text-center th-color" style="background-color: #8fa1c04a">' + evalAchieveResult.getEvalRating(teamOrderScore, 'rating') + '</th>' +

                            '<th class="text-center th-color" style="background-color: #8fa1c04a">' + teamSalesScore + '</th>' +
                            '<th class="text-center th-color" style="background-color: #8fa1c04a">' + teamSalesScoreCon + '</th>' +
                            // '<th class="text-center th-color" style="background-color: #8fa1c04a">' + evalAchieveResult.getEvalRating(teamSalesScore, 'rating') + '</th>' +

                            '<th class="text-center th-color" style="background-color: #8fa1c04a">' + teamRevenueScore + '</th>' +
                            '<th class="text-center th-color" style="background-color: #8fa1c04a">' + teamRevenueScoreCon + '</th>' +
                            // '<th class="text-center th-color" style="background-color: #8fa1c04a">' + evalAchieveResult.getEvalRating(teamRevenueScore, 'rating') + '</th>' +

                            '<th class="text-center th-color" style="background-color: #8fa1c04a">' + teamScoreSum + '</th>' +
                            '<th class="text-center th-color" style="background-color: #8fa1c04a">' + evalAchieveResult.getEvalRating(teamScoreSum, 'rating') + '</th>' +

                            '<th class="text-center th-color" style="background-color: #8fa1c04a">' + teamCostScore + '</th>' +
                            '<th class="text-center th-color" style="background-color: #8fa1c04a">' + evalAchieveResult.getEvalRating(teamCostScore, 'con') + '</th>' +
                            // '<th class="text-center th-color" style="background-color: #8fa1c04a">' + evalAchieveResult.getEvalRating(teamCostScore, 'rating') + '</th>' +

                            '<th class="text-center th-color" style="background-color: #8fa1c04a">' + (teamRevenueAchieve - teamCostAchieve) + '</th>' +

                            '<th class="text-center th-color" style="background-color: #8fa1c04a">' + teamCommerIndexScore + '</th>' +
                            '<th class="text-center th-color" style="background-color: #8fa1c04a">' + evalAchieveResult.getEvalRating(teamCommerIndexScore, 'con') + '</th>' +
                            // '<th class="text-center th-color" style="background-color: #8fa1c04a">' + evalAchieveResult.getEvalRating(teamCommerIndexScore, 'rating') + '</th>' +
                        '</tr>';

                    deptOrderGoals += teamOrderGoals;
                    deptOrderAchieve += teamOrderAchieve;
                    deptSalesGoals += teamSalesGoals;
                    deptSalesAchieve += teamSalesAchieve;
                    deptRevenueGoals += teamRevenueGoals;
                    deptRevenueAchieve += teamRevenueAchieve;
                    deptCostGoals += teamCostGoals;
                    deptCostAchieve += teamCostAchieve;

                    teamOrderGoals = 0;
                    teamOrderAchieve = 0;
                    teamOrderScore = 0;
                    teamSalesGoals = 0;
                    teamSalesAchieve = 0;
                    teamSalesScore = 0;
                    teamRevenueGoals = 0;
                    teamRevenueAchieve = 0;
                    teamRevenueScore = 0;
                    teamCostGoals = 0;
                    teamCostAchieve = 0;
                    teamCostScore = 0;
                    teamCommerIndexGoals = 0;
                    teamCommerIndexAchieve = 0;
                    teamCommerIndexScore = 0;
                }

                /** 부서 */
                if ((nextDeptName != "" && currentDeptName != "" && nextDeptName != null && nextDeptName != currentDeptName) || (i === rs.length - 1 && Object.keys(teamCnt).length > 1)) {

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
                    if(deptCostGoals != 0 && deptCostAchieve != 0){
                        deptCostScore = Math.round(deptCostAchieve/deptCostGoals * 100);
                    }

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
                    if(deptCommerIndexGoals != 0 && deptCommerIndexAchieve != 0){
                        deptCommerIndexScore = Math.round(deptCommerIndexAchieve/deptCommerIndexGoals * 100);
                    }

                    var deptOrderScoreCon = evalAchieveResult.getEvalRating(deptOrderScore, 'con');
                    var deptSalesScoreCon = evalAchieveResult.getEvalRating(deptSalesScore, 'con');
                    var deptRevenueScoreCon = evalAchieveResult.getEvalRating(deptRevenueScore, 'con');
                    var deptScoreSum =
                        (deptOrderScoreCon * (orderWeights / 100)) +
                        (deptSalesScoreCon * (salesWeights / 100)) +
                        (deptRevenueScoreCon * (revenueWeights / 100));

                    html += '' +
                        '<tr class="sumTr">' +
                            '<th class="text-center th-color" style="background-color: #8fa1c04a" colspan="3">' + currentDeptName + ' 합계</th>' +
                            '<th class="text-center th-color" style="background-color: #8fa1c04a">' + deptOrderScore + '</th>' +
                            '<th class="text-center th-color" style="background-color: #8fa1c04a">' + deptOrderScoreCon + '</th>' +
                            // '<th class="text-center th-color" style="background-color: #8fa1c04a">' + evalAchieveResult.getEvalRating(deptOrderScore, 'rating') + '</th>' +

                            '<th class="text-center th-color" style="background-color: #8fa1c04a">' + deptSalesScore + '</th>' +
                            '<th class="text-center th-color" style="background-color: #8fa1c04a">' + deptSalesScoreCon + '</th>' +
                            // '<th class="text-center th-color" style="background-color: #8fa1c04a">' + evalAchieveResult.getEvalRating(deptSalesScore, 'rating') + '</th>' +

                            '<th class="text-center th-color" style="background-color: #8fa1c04a">' + deptRevenueScore + '</th>' +
                            '<th class="text-center th-color" style="background-color: #8fa1c04a">' + deptRevenueScoreCon + '</th>' +
                            // '<th class="text-center th-color" style="background-color: #8fa1c04a">' + evalAchieveResult.getEvalRating(deptRevenueScore, 'rating') + '</th>' +

                            '<th class="text-center th-color" style="background-color: #8fa1c04a">' + deptScoreSum + '</th>' +
                            '<th class="text-center th-color" style="background-color: #8fa1c04a">' + evalAchieveResult.getEvalRating(deptCostScore, 'rating') + '</th>' +

                            '<th class="text-center th-color" style="background-color: #8fa1c04a">' + deptCostScore + '</th>' +
                            '<th class="text-center th-color" style="background-color: #8fa1c04a">' + evalAchieveResult.getEvalRating(deptCostScore, 'con') + '</th>' +
                            // '<th class="text-center th-color" style="background-color: #8fa1c04a">' + evalAchieveResult.getEvalRating(deptCostScore, 'rating') + '</th>' +

                            '<th class="text-center th-color" style="background-color: #8fa1c04a">' + (deptRevenueAchieve - deptCostAchieve) + '</th>' +

                            '<th class="text-center th-color" style="background-color: #8fa1c04a">' + deptCommerIndexScore + '</th>' +
                            '<th class="text-center th-color" style="background-color: #8fa1c04a">' + evalAchieveResult.getEvalRating(deptCommerIndexScore, 'con') + '</th>' +
                            // '<th class="text-center th-color" style="background-color: #8fa1c04a">' + evalAchieveResult.getEvalRating(deptCommerIndexScore, 'rating') + '</th>' +
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
                    deptCostScore = 0;
                    deptCommerIndexGoals = 0;
                    deptCommerIndexAchieve = 0;
                    deptCommerIndexScore = 0;

                    if(i === rs.length - 1 && Object.keys(deptCnt).length > 1){
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
                        if(allDeptCostGoals != 0 && allDeptCostAchieve != 0){
                            allDeptCostScore = Math.round(allDeptCostAchieve/allDeptCostGoals * 100);
                        }

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

                        if(allDeptCommerIndexGoals != 0 && allDeptCommerIndexAchieve != 0){
                            allDeptCommerIndexScore = Math.round(allDeptCommerIndexAchieve/allDeptCommerIndexGoals * 100);
                        }

                        var allDeptOrderScoreCon = evalAchieveResult.getEvalRating(allDeptOrderScore, 'con');
                        var allDeptSalesScoreCon = evalAchieveResult.getEvalRating(allDeptSalesScore, 'con');
                        var allDeptRevenueScoreCon = evalAchieveResult.getEvalRating(allDeptRevenueScore, 'con');
                        var allDeptScoreSum =
                            (allDeptOrderScoreCon * (orderWeights / 100)) +
                            (allDeptSalesScoreCon * (salesWeights / 100)) +
                            (allDeptRevenueScoreCon * (revenueWeights / 100));

                        html += '' +
                            '<tr class="sumTr">' +
                                '<th class="text-center th-color" style="background-color: #8fa1c04a" colspan="3">합계</th>' +
                                '<th class="text-center th-color" style="background-color: #8fa1c04a">' + allDeptOrderScore + '</th>' +
                                '<th class="text-center th-color" style="background-color: #8fa1c04a">' + allDeptOrderScoreCon + '</th>' +
                                // '<th class="text-center th-color" style="background-color: #8fa1c04a">' + evalAchieveResult.getEvalRating(allDeptOrderScore, 'rating') + '</th>' +

                                '<th class="text-center th-color" style="background-color: #8fa1c04a">' + allDeptSalesScore + '</th>' +
                                '<th class="text-center th-color" style="background-color: #8fa1c04a">' + allDeptSalesScoreCon + '</th>' +
                                // '<th class="text-center th-color" style="background-color: #8fa1c04a">' + evalAchieveResult.getEvalRating(allDeptSalesScore, 'rating') + '</th>' +

                                '<th class="text-center th-color" style="background-color: #8fa1c04a">' + allDeptRevenueScore + '</th>' +
                                '<th class="text-center th-color" style="background-color: #8fa1c04a">' + allDeptRevenueScoreCon + '</th>' +
                                // '<th class="text-center th-color" style="background-color: #8fa1c04a">' + evalAchieveResult.getEvalRating(allDeptRevenueScore, 'rating') + '</th>' +

                                '<th class="text-center th-color" style="background-color: #8fa1c04a">' + allDeptScoreSum + '</th>' +
                                '<th class="text-center th-color" style="background-color: #8fa1c04a">' + evalAchieveResult.getEvalRating(allDeptScoreSum, 'rating') + '</th>' +

                                '<th class="text-center th-color" style="background-color: #8fa1c04a">' + allDeptCostScore + '</th>' +
                                '<th class="text-center th-color" style="background-color: #8fa1c04a">' + evalAchieveResult.getEvalRating(allDeptCostScore, 'con') + '</th>' +
                                // '<th class="text-center th-color" style="background-color: #8fa1c04a">' + evalAchieveResult.getEvalRating(allDeptCostScore, 'rating') + '</th>' +

                                '<th class="text-center th-color" style="background-color: #8fa1c04a">' + (allDeptRevenueAchieve - allDeptCostAchieve) + '</th>' +

                                '<th class="text-center th-color" style="background-color: #8fa1c04a">' + allDeptCommerIndexScore + '</th>' +
                                '<th class="text-center th-color" style="background-color: #8fa1c04a">' + evalAchieveResult.getEvalRating(allDeptCommerIndexScore, 'con') + '</th>' +
                                // '<th class="text-center th-color" style="background-color: #8fa1c04a">' + evalAchieveResult.getEvalRating(allDeptCommerIndexScore, 'rating') + '</th>' +
                            '</tr>';
                    }
                }
            }
        }

        $('#evalList').append(html);
    },

    getEvalRating : function(e, type){
        var result = "";
        if(type == "con"){
            // 범위 밖 점수 처리: 점수가 150 이상이면 최대 환산점수 120 반환
            if (e > Number(evalAchieveResult.global.gradingTable[evalAchieveResult.global.gradingTable.length - 1].BASE_SCORE)) {
                return Number(evalAchieveResult.global.gradingTable[evalAchieveResult.global.gradingTable.length - 1].CONVERSION_SCORE); // 범위 밖 점수일 경우 최대 환산점수
            }

            // 근사치 사용: 기준점수에 가장 가까운 환산점수를 찾아 반환
            for (let i = evalAchieveResult.global.gradingTable.length - 1; i >= 0; i--) {
                if (e >= Number(evalAchieveResult.global.gradingTable[i].BASE_SCORE)) {
                    return Number(evalAchieveResult.global.gradingTable[i].CONVERSION_SCORE); // 해당하는 환산점수 반환
                }
            }
        }else{
            // 범위 밖 점수 처리: 점수가 150 이상이면 "SS" 등급 반환
            if (e > Number(evalAchieveResult.global.gradingTable[evalAchieveResult.global.gradingTable.length - 1].BASE_SCORE)) {
                return Number(evalAchieveResult.global.gradingTable[evalAchieveResult.global.gradingTable.length - 1].RATING); // 범위 밖 점수일 경우 최대 등급
            }

            // 근사치 사용: 기준점수에 가장 가까운 평가 등급을 찾아 반환
            for (let i = evalAchieveResult.global.gradingTable.length - 1; i >= 0; i--) {
                if (e >= Number(evalAchieveResult.global.gradingTable[i].BASE_SCORE)) {
                    return evalAchieveResult.global.gradingTable[i].RATING; // 해당하는 평가 등급 반환
                }
            }
        }

        return result;
    },

    // evalResUserPop : function(key) {
    //     var url = "/evaluation/pop/evalResUserPop.do?pk="+$("#evalSn").val()+"&evalMemSn="+key;
    //     var name = "evalResUserPop";
    //     var option = "width = 1400, height = 820, top = 100, left = 300, location = no";
    //     var popup = window.open(url, name, option);
    // },

    hiddenGrid : function() {
        var arr = []
        $("#evalList tr").each(function(i, v){

            if($(this).hasClass("sumTr")){
                var th = $(v).find("th");
                var data = {
                    DEPT_NAME : $(th[0]).text(),
                    TEAM_NAME : '',
                    EMP_NAME_KR : '',

                    ORDER_SCORE : $(th[1]).text(),
                    ORDER_CONVERSION : $(th[2]).text(),
                    // ORDER_RATING : $(th[3]).text(),

                    SALES_SCORE : $(th[3]).text(),
                    SALES_CONVERSION : $(th[4]).text(),
                    // SALES_RATING : $(th[6]).text(),

                    REVENUE_SCORE : $(th[5]).text(),
                    REVENUE_CONVERSION : $(th[6]).text(),
                    // REVENUE_RATING : $(th[9]).text(),

                    SCORE_SUM : $(th[7]).text(),
                    SCORE_RATING : $(th[8]).text(),

                    COST_SCORE : $(th[9]).text(),
                    COST_CONVERSION : $(th[10]).text(),
                    // COST_RATING : $(th[12]).text(),

                    PROFITORLOSS : $(th[11]).text(),

                    COMMER_INDEX_SCORE : $(th[12]).text(),
                    COMMER_INDEX_CONVERSION : $(th[13]).text(),
                    // COMMER_INDEX_RATING : $(th[15]).text(),

                }
            }else{
                var td = $(v).find("td");
                var data = {
                    DEPT_NAME : $(td[0]).text(),
                    TEAM_NAME : $(td[1]).text(),
                    EMP_NAME_KR : $(td[2]).text(),

                    ORDER_SCORE : $(td[3]).text(),
                    ORDER_CONVERSION : $(td[4]).text(),
                    // ORDER_RATING : $(td[3]).text(),

                    SALES_SCORE : $(td[5]).text(),
                    SALES_CONVERSION : $(td[6]).text(),
                    // SALES_RATING : $(td[6]).text(),

                    REVENUE_SCORE : $(td[7]).text(),
                    REVENUE_CONVERSION : $(td[8]).text(),
                    // REVENUE_RATING : $(td[9]).text(),

                    SCORE_SUM : $(td[9]).text(),
                    SCORE_RATING : $(td[10]).text(),

                    COST_SCORE : $(td[11]).text(),
                    COST_CONVERSION : $(td[12]).text(),
                    // COST_RATING : $(td[12]).text(),

                    PROFITORLOSS : $(td[13]).text(),

                    COMMER_INDEX_SCORE : $(td[14]).text(),
                    COMMER_INDEX_CONVERSION : $(td[15]).text(),
                    // COMMER_INDEX_RATING : $(td[15]).text(),
                }
            }

            arr.push(data);
        })

        var dataSource= new kendo.data.DataSource({
            data : arr
        });

        $("#hiddenGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            selectable: "row",
            height: 525,
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    title: "부서명",
                    width: 120,
                    field: "DEPT_NAME"
                }, {
                    title: "팀명",
                    width: 120,
                    field: "TEAM_NAME"
                }, {
                    title: "성명",
                    width: 80,
                    field: "EMP_NAME_KR"
                }, {
                    title: "수주_점수",
                    width: 80,
                    field: "ORDER_SCORE"
                }, {
                    title: "수주_환산",
                    width: 80,
                    field: "ORDER_CONVERSION"
                }/*, {
                    title: "수주_등급",
                    width: 80,
                    field: "ORDER_RATING"
                }*/, {
                    title: "매출_점수",
                    width: 80,
                    field: "SALES_SCORE"
                }, {
                    title: "매출_환산",
                    width: 80,
                    field: "SALES_CONVERSION"
                }/*, {
                    title: "매출_등급",
                    width: 80,
                    field: "SALES_RATING"
                }*/, {
                    title: "수익_점수",
                    width: 80,
                    field: "REVENUE_SCORE"
                }, {
                    title: "수익_환산",
                    width: 80,
                    field: "REVENUE_CONVERSION"
                }/*, {
                    title: "수익_등급",
                    width: 80,
                    field: "REVENUE_RATING"
                }*/, {
                    title: "합계",
                    width: 80,
                    field: "SCORE_SUM"
                }, {
                    title: "등급",
                    width: 80,
                    field: "SCORE_RATING"
                }, {
                    title: "비용_점수",
                    width: 80,
                    field: "COST_SCORE"
                }, {
                    title: "비용_환산",
                    width: 80,
                    field: "COST_CONVERSION"
                }/*, {
                    title: "비용_등급",
                    width: 80,
                    field: "COST_RATING"
                }*/, {
                    title: "손익",
                    width: 80,
                    field: "PROFITORLOSS"
                }, {
                    title: "사업화지수_점수",
                    width: 80,
                    field: "COMMER_INDEX_SCORE"
                }, {
                    title: "사업화지수_환산",
                    width: 80,
                    field: "COMMER_INDEX_CONVERSION"
                }/*, {
                    title: "사업화지수_등급",
                    width: 120,
                    field: "COMMER_INDEX_RATING"
                },*/
            ],
        }).data("kendoGrid");
    },

    fn_excelDownload : function(){
        var grid = $("#hiddenGrid").data("kendoGrid");
        grid.bind("excelExport", function(e) {
            e.workbook.fileName = "업적평가결과.xlsx";
        });
        grid.saveAsExcel();
    },
}

