var now = new Date();

var allEvalApprovePop = {
    global : {
        searchAjaxData : "",
        dropDownDataSource : "",
        gradingTable : new Array(),
        evalAchieveSet : ""
    },

    init: function(){
        allEvalApprovePop.dataSet();
    },

    dataSet: function (){
        allEvalApprovePop.getEvalAchieveSet();
        allEvalApprovePop.getAllEvalApproveList();

        let data = {}
        data.deptLevel = 1;
        const deptDsA = customKendo.fn_customAjax("/dept/getDeptAList", data);

        customKendo.fn_dropDownList("dept", deptDsA.rs, "dept_name", "dept_seq");

        $("#dept").data("kendoDropDownList").bind("change", allEvalApprovePop.changeDeptComp)
        $("#dept").data("kendoDropDownList").select(0);
        $("#dept").data("kendoDropDownList").trigger("change");

        allEvalApprovePop.global.dropDownDataSource = customKendo.fn_customAjax("/system/commonCodeManagement/getCmCodeList", {cmGroupCodeId : "4"});
        customKendo.fn_dropDownList("position", allEvalApprovePop.global.dropDownDataSource, "CM_CODE_NM", "CM_CODE", 2);
        allEvalApprovePop.global.dropDownDataSource = customKendo.fn_customAjax("/system/commonCodeManagement/getCmCodeList", {cmGroupCodeId : "3"});
        customKendo.fn_dropDownList("duty", allEvalApprovePop.global.dropDownDataSource, "CM_CODE_NM", "CM_CODE", 2);
    },

    changeDeptComp : function(){
        let data = {}
        data.deptLevel = 2;
        data.parentDeptSeq = this.value();

        const ds = customKendo.fn_customAjax("/dept/getDeptAList", data);
        customKendo.fn_dropDownList("team", ds.rs, "dept_name", "dept_seq")
        allEvalApprovePop.getAllEvalApproveList();
    },

    getEvalAchieveSet : function(){
        $.ajax({
            url : "/evaluation/getEvalAchieveSet",
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
            success : function(rs){
                allEvalApprovePop.global.evalAchieveSet = rs.rs;
                allEvalApprovePop.global.gradingTable = rs.rs.ratingList;
            },
            error : function(e) {
                console.log(e);
            }
        });
    },

    getAllEvalApproveList : function(){
        $.ajax({
            url : "/evaluation/getAllEvalApproveList.do",
            type : "post",
            data : {
                baseYear : $("#baseYear").val(),
                dept : $("#dept").val(),
                team : $("#team").val(),
                position : $("#position").val(),
                duty : $("#duty").val()
            },
            dataType : "json",
            beforeSend : function(){
                $("#my-spinner").show();
            },
            success : function(result){
                allEvalApprovePop.fn_addTbody(result.rs);
                // allEvalApprovePop.hiddenGrid();
                $("#my-spinner").hide();
            },
            error : function(e) {
                console.log(e);
                $("#my-spinner").hide();
            }
        });
    },

    fn_addTbody : function(rs){
        var evaluationYearMax = rs.evaluationYearMax;
        var evalResultEmpList = rs.evalResultEmpList;
        var evalAchieveList = rs.evalAchieveList;

        $("#evalList").empty();

        var html = '';
        var scoreList = customKendo.fn_customAjax("/evaluation/getEvaluation", {
            evalSn : evaluationYearMax.EVAL_SN
        }).scList;

        evalAchieveList = evalAchieveList.filter(l => l.DUTY_CODE != "1" && l.DEPT_NAME != '');
        var deptScore = [];
        for(var i = 0; i < evalAchieveList.length; i++){
            /** 역량평가 시작 */
            var empEvalResult = evalResultEmpList.filter(l => l.EVAL_EMP_SEQ == evalAchieveList[i].EMP_SEQ)
            var firstHalfScore = 0;
            var secondHalfScore = 0;
            var scoreAverage = 0;
            var resGrade = "-";
            var totalScore = 0

            for(var j = 0; j < empEvalResult.length; j++){
                if(empEvalResult[j].EVAL_NUM == "1"){
                    firstHalfScore = allEvalApprovePop.getFinalScore(empEvalResult[j], 'finalScore');
                }else{
                    secondHalfScore = allEvalApprovePop.getFinalScore(empEvalResult[j], 'finalScore');
                    totalScore = secondHalfScore - empEvalResult[j].EVAL_SCORE_MNG
                }
            }

            // scoreAverage = (firstHalfScore + secondHalfScore) / 2

            // for (let j = 0; j < scoreList.length; j++) {
            //     const scItem = scoreList[j];
            //     if(
            //         Number(scItem.EVAL_SCORE_B) >= Number(parseFloat(totalScore) + parseFloat(scoreAverage)) &&
            //         Number(parseFloat(totalScore) + parseFloat(scoreAverage)) >= Number(scItem.EVAL_SCORE_A)){
            //         resGrade = scItem.EVAL_GRADE;
            //     }
            // }
            /** 역량평가 종료 */

            /**
             * 팀장급 4 5
             * 실장급 2 7 3
             * */

            var rowType = "";
            if(evalAchieveList[i].DUTY_CODE == "4" || evalAchieveList[i].DUTY_CODE == "5"){
                rowType = "teamLeder"
            }else if(evalAchieveList[i].DUTY_CODE == "2" || evalAchieveList[i].DUTY_CODE == "7" || evalAchieveList[i].DUTY_CODE == "3"){
                rowType = "deptLeder"
            }else{
                rowType = "normal"
            }

            // rowType이 "normal"일 때 deptScore 배열에 score 합산
            if (rowType === "normal") {
                // deptSeq와 parentDeptSeq를 기준으로 해당 항목을 찾거나 추가
                var existingDept = deptScore.find(item => item.deptSeq === evalAchieveList[i].DEPT_SEQ);

                if (existingDept) {
                    existingDept.orderGoals += Number(evalAchieveList[i].ORDER_GOALS)
                    existingDept.orderAchieve += Number(evalAchieveList[i].ORDER_ACHIEVE)
                    existingDept.salesGoals += Number(evalAchieveList[i].SALES_GOALS)
                    existingDept.salesAchieve += Number(evalAchieveList[i].SALES_ACHIEVE)
                    existingDept.revenueGoals += Number(evalAchieveList[i].REVENUE_GOALS)
                    existingDept.revenueAchieve += Number(evalAchieveList[i].REVENUE_ACHIEVE)
                } else {
                    deptScore.push({
                        deptSeq: evalAchieveList[i].DEPT_SEQ,
                        parentDeptSeq: evalAchieveList[i].PARENT_DEPT_SEQ,
                        orderGoals : Number(evalAchieveList[i].ORDER_GOALS),
                        orderAchieve : Number(evalAchieveList[i].ORDER_ACHIEVE),
                        salesGoals : Number(evalAchieveList[i].SALES_GOALS),
                        salesAchieve : Number(evalAchieveList[i].SALES_ACHIEVE),
                        revenueGoals : Number(evalAchieveList[i].REVENUE_GOALS),
                        revenueAchieve : Number(evalAchieveList[i].REVENUE_ACHIEVE)
                    });
                }
            }

            html += '' +
                '<tr rowType="' + rowType + '" deptSeq="' + evalAchieveList[i].DEPT_SEQ + '">' +
                    '<td>' + evalAchieveList[i].DEPT_NAME + '</td>' +
                    '<td>' + evalAchieveList[i].TEAM_NAME + '</td>' +
                    '<td class="text-center">' + evalAchieveList[i].EMP_NAME + '</td>' +
                    '<td>' +
                        '<input type="text" class="scoreInput" id="firstHalfScore' + i + '" value="' + firstHalfScore + '" name="firstHalfScore" oninput="allEvalApprovePop.onlyNumber(this)" onkeyup="allEvalApprovePop.calScore(this)">' +
                    '</td>' +
                    '<td>' +
                        '<input type="text" class="scoreInput" id="secondHalfScore' + i + '" value="' + secondHalfScore + '" name="secondHalfScore" oninput="allEvalApprovePop.onlyNumber(this)" onkeyup="allEvalApprovePop.calScore(this)">' +
                    '</td>' +
                    '<td class="text-center"><span name="scoreAverage">' + scoreAverage + '</span></td>' +
                    '<td class="text-center"><span name="resGrade">' + resGrade + '</span></td>' +
                    '<td>' +
                        '<input type="text" class="scoreInput" id="evalWeights' + i + '" value="20" name="evalWeights" style="width: 75%;" oninput="allEvalApprovePop.onlyNumber(this)" onkeyup="allEvalApprovePop.calScore(this)"> %' +
                    '</td>' +
                    '<td>' +
                        '<input type="text" class="scoreInput" name="achieveScore" id="scoreSum' + i + '" value="' + evalAchieveList[i].SCORE_SUM + '" oninput="allEvalApprovePop.onlyNumber(this)" onkeyup="allEvalApprovePop.calScore(this)">' +
                    '</td>' +
                    '<td class="text-center"><span name="achieveRating">' + evalAchieveList[i].SCORE_RATING + '</span></td>' +
                    '<td>' +
                        '<input type="text" class="scoreInput" id="evalAchieveWeights' + i + '" name="evalAchieveWeights" value="80" style="width: 75%;" oninput="allEvalApprovePop.onlyNumber(this)" onkeyup="allEvalApprovePop.calScore(this)"> %' +
                    '</td>' +
                    '<td>' +
                        '<input type="text" class="scoreInput" id="adjustedScore' + i + '" name="adjustedScore" oninput="allEvalApprovePop.onlyNumber(this)">' +
                    '</td>' +
                    '<td class="text-center"><span name="finalScore"></span></td>' +
                    '<td class="text-center"><span name="finalRating"></span></td>' +
                '</tr>'
        }

        $('#evalList').append(html);
        $(".scoreInput").kendoTextBox()


        var orderWeights = Number(allEvalApprovePop.global.evalAchieveSet.ORDER_WEIGHTS)
        var salesWeights = Number(allEvalApprovePop.global.evalAchieveSet.SALES_WEIGHTS)
        var revenueWeights = Number(allEvalApprovePop.global.evalAchieveSet.REVENUE_WEIGHTS)

        var calculatedDeptLeaders = {};
        $.each(deptScore, function(ii, v){
            var teamOrderScore = 0;
            var teamSalesScore = 0;
            var teamRevenueScore = 0;

            var deptOrderGoals = 0;
            var deptOrderAchieve = 0;
            var deptSalesGoals = 0;
            var deptSalesAchieve = 0;
            var deptRevenueGoals = 0;
            var deptRevenueAchieve = 0;

            deptOrderGoals += v.orderGoals
            deptOrderAchieve += v.orderAchieve
            deptSalesGoals += v.salesGoals
            deptSalesAchieve += v.salesAchieve
            deptRevenueGoals += v.revenueGoals
            deptRevenueAchieve += v.revenueAchieve

            if(v.orderGoals != 0 && v.orderAchieve != 0){
                teamOrderScore = Math.round(v.orderAchieve/v.orderGoals * 100);
            }

            if(v.salesGoals != 0 && v.salesAchieve != 0){
                teamSalesScore = Math.round(v.salesAchieve/v.salesGoals * 100);
            }

            if(v.revenueGoals != 0 && v.revenueAchieve != 0){
                teamRevenueScore = Math.round(v.revenueAchieve/v.revenueGoals * 100);
            }
            
            var teamOrderScoreCon = allEvalApprovePop.getEvalRating(teamOrderScore, 'con');
            var teamSalesScoreCon = allEvalApprovePop.getEvalRating(teamSalesScore, 'con');
            var teamRevenueScoreCon = allEvalApprovePop.getEvalRating(teamRevenueScore, 'con');
            var teamScoreSum =
                (teamOrderScoreCon * (orderWeights / 100)) +
                (teamSalesScoreCon * (salesWeights / 100)) +
                (teamRevenueScoreCon * (revenueWeights / 100));

            $("#evalList tr[rowType='teamLeder'][deptSeq='" + v.deptSeq + "'] input[name='achieveScore']").val(teamScoreSum)
            $("#evalList tr[rowType='teamLeder'][deptSeq='" + v.deptSeq + "'] span[name='achieveRating']").text(allEvalApprovePop.getEvalRating(teamScoreSum, 'rating'))

            if (!calculatedDeptLeaders[v.parentDeptSeq]) {
                var deptOrderScore = 0;
                var deptSalesScore = 0;
                var deptRevenueScore = 0;
                $.each(deptScore, function(jj, vv) {
                    if(v.parentDeptSeq === vv.parentDeptSeq && v.deptSeq !== vv.deptSeq) {
                        deptOrderGoals += vv.orderGoals
                        deptOrderAchieve += vv.orderAchieve
                        deptSalesGoals += vv.salesGoals
                        deptSalesAchieve += vv.salesAchieve
                        deptRevenueGoals += vv.revenueGoals
                        deptRevenueAchieve += vv.revenueAchieve
                    }
                });

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

                var deptOrderScoreCon = allEvalApprovePop.getEvalRating(deptOrderScore, 'con');
                var deptSalesScoreCon = allEvalApprovePop.getEvalRating(deptSalesScore, 'con');
                var deptRevenueScoreCon = allEvalApprovePop.getEvalRating(deptRevenueScore, 'con');
                var deptScoreSum =
                    (deptOrderScoreCon * (orderWeights / 100)) +
                    (deptSalesScoreCon * (salesWeights / 100)) +
                    (deptRevenueScoreCon * (revenueWeights / 100));

                $("#evalList tr[rowType='deptLeder'][deptSeq='" + v.parentDeptSeq + "'] input[name='achieveScore']").val(deptScoreSum);
                $("#evalList tr[rowType='deptLeder'][deptSeq='" + v.parentDeptSeq + "'] span[name='achieveRating']").text(allEvalApprovePop.getEvalRating(deptScoreSum, 'rating'));
                calculatedDeptLeaders[v.parentDeptSeq] = true;
            }
        })
    },

    getFinalScore : function(e, type){
        let aDeptPer = e.DEPT_MANAGER_A;
        let bDeptPer = e.DEPT_MANAGER_B;
        let aTeamPer = e.TEAM_MANAGER_A;
        let bTeamPer = e.TEAM_MANAGER_B;
        let aMemPer = e.TEAM_MEMBER_A;
        let bMemPer = e.TEAM_MEMBER_B;

        if(e.EVAL_EVAL_F_SEQ == "undefined" || e.EVAL_EVAL_F_SEQ == ""){
            aDeptPer = 0;
            bDeptPer = 100;
            aTeamPer = 0;
            bTeamPer = 100;
            aMemPer = 0;
            bMemPer = 100;
        }else if(e.EVAL_EVAL_S_SEQ == "undefined" || e.EVAL_EVAL_S_SEQ == ""){
            aDeptPer = 100;
            bDeptPer = 0;
            aTeamPer = 100;
            bTeamPer = 0;
            aMemPer = 100;
            bMemPer = 0;
        }else if(e.EVAL_EVAL_F_SEQ == e.EVAL_EVAL_S_SEQ){
            aDeptPer = 0;
            bDeptPer = 100;
            aTeamPer = 0;
            bTeamPer = 100;
            aMemPer = 0;
            bMemPer = 100;
        }

        var totalScore = 0;
        if(e.DUTY_CODE == "2" || e.DUTY_CODE == "3" || e.DUTY_CODE == "7"){
            totalScore = calculateFinalScore(aDeptPer, e.EVAL_F_SCORE, bDeptPer, e.EVAL_S_SCORE);
        }else if(e.DUTY_CODE == "4" || e.DUTY_CODE == "5"){
            totalScore = calculateFinalScore(aTeamPer, e.EVAL_F_SCORE, bTeamPer, e.EVAL_S_SCORE);
        }else{
            totalScore = calculateFinalScore(aMemPer, e.EVAL_F_SCORE, bMemPer, e.EVAL_S_SCORE);
        }

        if(type == "finalScore"){
            return parseFloat(totalScore) + parseFloat(e.EVAL_SCORE_MNG)
        }else{
            return parseFloat(totalScore)
        }
    },

    getEvalRating : function(e, type){
        var result = "";
        if(type == "con"){
            // 범위 밖 점수 처리: 점수가 150 이상이면 최대 환산점수 120 반환
            if (e > Number(allEvalApprovePop.global.gradingTable[allEvalApprovePop.global.gradingTable.length - 1].BASE_SCORE)) {
                return Number(allEvalApprovePop.global.gradingTable[allEvalApprovePop.global.gradingTable.length - 1].CONVERSION_SCORE); // 범위 밖 점수일 경우 최대 환산점수
            }

            // 근사치 사용: 기준점수에 가장 가까운 환산점수를 찾아 반환
            for (let i = allEvalApprovePop.global.gradingTable.length - 1; i >= 0; i--) {
                if (e >= Number(allEvalApprovePop.global.gradingTable[i].BASE_SCORE)) {
                    return Number(allEvalApprovePop.global.gradingTable[i].CONVERSION_SCORE); // 해당하는 환산점수 반환
                }
            }
        }else{
            // 범위 밖 점수 처리: 점수가 150 이상이면 "SS" 등급 반환
            if (e > Number(allEvalApprovePop.global.gradingTable[allEvalApprovePop.global.gradingTable.length - 1].BASE_SCORE)) {
                return Number(allEvalApprovePop.global.gradingTable[allEvalApprovePop.global.gradingTable.length - 1].RATING); // 범위 밖 점수일 경우 최대 등급
            }

            // 근사치 사용: 기준점수에 가장 가까운 평가 등급을 찾아 반환
            for (let i = allEvalApprovePop.global.gradingTable.length - 1; i >= 0; i--) {
                if (e >= Number(allEvalApprovePop.global.gradingTable[i].BASE_SCORE)) {
                    return allEvalApprovePop.global.gradingTable[i].RATING; // 해당하는 평가 등급 반환
                }
            }
        }

        return result;
    },

    calScore : function(e){
        var tr = $(e).closest("tr");
        /** 역량평가 점수 */
        /** 상반기 */
        var firstHalfScore = Number($(tr).find("input[name='firstHalfScore']").val())
        /** 하반기 */
        var secondHalfScore = Number($(tr).find("input[name='secondHalfScore']").val())
        /** 가중치 */
        var evalWeights = Number($(tr).find("input[name='evalWeights']").val())

        /** 역량평가 최종점수,등급 삽입 */
        //

        /** 업적평가 점수 */
        /** 최종점수 */
        var achieveScore = Number($(tr).find("input[name='achieveScore']").val())
        /** 가중치 */
        var evalAchieveWeights = Number($(tr).find("input[name='evalAchieveWeights']").val())
        /** 업적평가 최종등급 삽입 */
        //

        /** 최종점수 삽입 */
        /** (역량평가 최종점수 * (역량평가 가중치 / 100)) + (업적평가 최종점수 * (업적평가 가중치 / 100))  */

        /** 최종점수에 따른 등급 삽입 */
        //
    },

    onlyNumber : function(e){
        // 입력 값에서 숫자와 첫 번째 소수점만 허용
        e.value = e.value.replace(/[^0-9.]/g, '') // 숫자와 소수점만 남기기
            .replace(/(\..*)\./g, '$1'); // 소수점이 두 번 이상 나오지 않도록 처리
    },

    uncomma: function(str) {
        str = String(str);
        return Number(str.replace(/[^\d.]+/g, ''));
    },

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

