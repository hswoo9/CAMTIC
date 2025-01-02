var now = new Date();

var allEvalApprovePop = {
    global : {
        searchAjaxData : "",
        dropDownDataSource : "",
        gradingTable : new Array(),
        evalAchieveSet : "",
        evalReting : {
            S : { min: 90, max: Infinity },
            A : { min: 80, max: 89 },
            B : { min: 70, max: 79 },
            C : { min: 60, max: 69 },
        },
        evalAchieveRating : [
            { BASE_SCORE: "0", CONVERSION_SCORE: "60", RATING: "-" },
            { BASE_SCORE: "80", CONVERSION_SCORE: "60", RATING: "D" },
            { BASE_SCORE: "90", CONVERSION_SCORE: "70", RATING: "C" },
            { BASE_SCORE: "100", CONVERSION_SCORE: "80", RATING: "B" },
            { BASE_SCORE: "110", CONVERSION_SCORE: "90", RATING: "A" },
            { BASE_SCORE: "120", CONVERSION_SCORE: "100", RATING: "S" },
            { BASE_SCORE: "150", CONVERSION_SCORE: "120", RATING: "SS" }
        ],
        evalFinalRating : [
            { BASE_SCORE: 110, RATING: "SS" },
            { BASE_SCORE: 100, RATING: "S" },
            { BASE_SCORE: 90, RATING: "A" },
            { BASE_SCORE: 80, RATING: "B" },
            { BASE_SCORE: 0, RATING: "C" }
        ]
    },

    init: function(){
        allEvalApprovePop.dataSet();
    },

    dataSet: function (){
        allEvalApprovePop.getEvalAchieveSet();
        allEvalApprovePop.getAllEvalList();

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
        allEvalApprovePop.getAllEvalList();
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
            },
            error : function(e) {
                console.log(e);
            }
        });
    },

    getAllEvalList : function(){
        $.ajax({
            url : "/evaluation/getAllEvalList.do",
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
                allEvalApprovePop.addTbody(result.rs);
                allEvalApprovePop.hiddenGrid();

                $("#my-spinner").hide();
            },
            error : function(e) {
                console.log(e);
                $("#my-spinner").hide();
            }
        });
    },

    addTbody : function(rs){
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

            for(var j = 0; j < empEvalResult.length; j++){
                if(empEvalResult[j].EVAL_NUM == "1"){
                    firstHalfScore = allEvalApprovePop.getEvalScore(empEvalResult[j], 'finalScore');
                }else{
                    secondHalfScore = allEvalApprovePop.getEvalScore(empEvalResult[j], 'finalScore');
                }
            }

            scoreAverage = (firstHalfScore + secondHalfScore) / 2

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
                '<tr rowType="' + rowType + '" deptSeq="' + evalAchieveList[i].DEPT_SEQ + '" empSeq="' + evalAchieveList[i].EMP_SEQ + '">' +
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
                    '<td class="text-center"><span name="resGrade">' + allEvalApprovePop.getEvalGrade(scoreAverage) + '</span></td>' +
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
                        '<input type="text" class="scoreInput" id="adjustedScore' + i + '" value="0" name="adjustedScore" oninput="allEvalApprovePop.onlyNumber(this)"  onkeyup="allEvalApprovePop.calScore(this)">' +
                    '</td>' +
                    '<td class="text-center"><span name="beforeScore"></span></td>' +
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

        allEvalApprovePop.calScore();
    },

    calScore : function(e){
        if(e != null){
            var tr = $(e).closest("tr");
            allEvalApprovePop.calScoreInput(tr);
        }else{
            $.each($("#evalList tr"), function(i, v){
                allEvalApprovePop.calScoreInput(v);
            })
        }

        // console.log("상반기 점수:", firstHalfScore);
        // console.log("하반기 점수:", secondHalfScore);
        // console.log("역량평가 가중치:", evalWeights);
        // console.log("역량평가 최종 점수:", scoreAverage);
        // console.log("역량평가 등급:", scoreRating);
        // console.log("업적평가 점수:", achieveScore);
        // console.log("업적평가 등급:", achieveRating);
        // console.log("업적평가 가중치:", evalAchieveWeights);
        // console.log("최종점수:", finalScore);
        // console.log("최종등급:", finalRating);
    },

    calScoreInput : function(tr){
        /** 역량평가 점수 */
        /** 상반기 */
        var firstHalfScore = Number($(tr).find("input[name='firstHalfScore']").val())
        /** 하반기 */
        var secondHalfScore = Number($(tr).find("input[name='secondHalfScore']").val())
        /** 가중치 */
        var evalWeights = Number($(tr).find("input[name='evalWeights']").val())
        /** 최종점수 */
        var scoreAverage = (firstHalfScore + secondHalfScore) / 2
        /** 최종등급 */
        var scoreRating = allEvalApprovePop.getEvalGrade(scoreAverage)


        /** 업적평가 점수 */
        /** 최종점수 */
        var achieveScore = Number($(tr).find("input[name='achieveScore']").val())
        /** 최종등급  */
        var achieveRating = allEvalApprovePop.getEvalRating(achieveScore, 'rating');
        /** 가중치 */
        var evalAchieveWeights = Number($(tr).find("input[name='evalAchieveWeights']").val())

        /** 조정점수 */
        var adjustedScore = Number($(tr).find("input[name='adjustedScore']").val())
        /** 최종점수 */
        /** (역량평가 최종점수 * (역량평가 가중치 / 100)) + (업적평가 최종점수 * (업적평가 가중치 / 100))  */
        var finalScore = ((scoreAverage * (evalWeights / 100)) +  (achieveScore * (evalAchieveWeights / 100)));
        /** 최종등급 */
        var finalRating = allEvalApprovePop.getFinalRating(finalScore + adjustedScore);

        $(tr).find("span[name='scoreAverage']").text(scoreAverage);
        $(tr).find("span[name='resGrade']").text(scoreRating)
        $(tr).find("span[name='achieveRating']").text(achieveRating)
        $(tr).find("span[name='beforeScore']").text(Math.round((finalScore) * 100) / 100)
        $(tr).find("span[name='finalScore']").text(Math.round((finalScore + adjustedScore) * 100) / 100)
        $(tr).find("span[name='finalRating']").text(finalRating)
    },

    getEvalScore : function(e, type){
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

    getEvalGrade : function(score) {
        /** 역량평가 등급 반환 */

        for (const grade in allEvalApprovePop.global.evalReting) {
            const { min, max } = allEvalApprovePop.global.evalReting[grade];
            if (score >= min && score <= max) {
                return grade;
            }
        }
        return '-'; // 60 미만 점수 처리
    },

    getEvalRating : function(e, type){
        /** 업적평가 등급 반환 */
        var result = "";
        if(type == "con"){
            // 범위 밖 점수 처리: 점수가 150 이상이면 최대 환산점수 120 반환
            if (e > Number(allEvalApprovePop.global.evalAchieveRating[allEvalApprovePop.global.evalAchieveRating.length - 1].BASE_SCORE)) {
                return Number(allEvalApprovePop.global.evalAchieveRating[allEvalApprovePop.global.evalAchieveRating.length - 1].CONVERSION_SCORE); // 범위 밖 점수일 경우 최대 환산점수
            }

            // 근사치 사용: 기준점수에 가장 가까운 환산점수를 찾아 반환
            for (let i = allEvalApprovePop.global.evalAchieveRating.length - 1; i >= 0; i--) {
                if (e >= Number(allEvalApprovePop.global.evalAchieveRating[i].BASE_SCORE)) {
                    return Number(allEvalApprovePop.global.evalAchieveRating[i].CONVERSION_SCORE); // 해당하는 환산점수 반환
                }
            }
        }else{
            // 범위 밖 점수 처리: 점수가 150 이상이면 "SS" 등급 반환
            if (e > Number(allEvalApprovePop.global.evalAchieveRating[allEvalApprovePop.global.evalAchieveRating.length - 1].BASE_SCORE)) {
                return allEvalApprovePop.global.evalAchieveRating[allEvalApprovePop.global.evalAchieveRating.length - 1].RATING; // 범위 밖 점수일 경우 최대 등급
            }

            // 근사치 사용: 기준점수에 가장 가까운 평가 등급을 찾아 반환
            for (let i = allEvalApprovePop.global.evalAchieveRating.length - 1; i >= 0; i--) {
                if (e >= Number(allEvalApprovePop.global.evalAchieveRating[i].BASE_SCORE)) {
                    return allEvalApprovePop.global.evalAchieveRating[i].RATING; // 해당하는 평가 등급 반환
                }
            }
        }

        return result;
    },

    getFinalRating : function(score) {
        /** 최종등급 반환 */
        for (let i = 0; i < allEvalApprovePop.global.evalFinalRating.length; i++) {
            // 점수가 해당 BASE_SCORE 이상이면 해당 RATING 반환
            if (score >= allEvalApprovePop.global.evalFinalRating[i].BASE_SCORE) {
                return allEvalApprovePop.global.evalFinalRating[i].RATING;
            }
        }
        return "C"; 
    },

    onlyNumber : function(e){
        // 입력 값에서 숫자와 첫 번째 소수점만 허용
        e.value = e.value
            .replace(/[^0-9.-]/g, '') // 숫자, 소수점, 마이너스만 남기기
            .replace(/(\..*)\./g, '$1') // 소수점이 두 번 이상 나오지 않도록 처리
            .replace(/(^-?)(\d*\.?\d*).*$/, '$1$2'); // 마이너스 기호가 첫 번째에만 오도록 처리
    },

    uncomma: function(str) {
        str = String(str);
        return Number(str.replace(/[^\d.]+/g, ''));
    },

    hiddenGrid : function() {
        var arr = []
        $("#evalList tr").each(function(i, v){
            var td = $(v).find("td");
            var data = {
                DEPT_NAME : $(td[0]).text(),
                TEAM_NAME : $(td[1]).text(),
                EMP_NAME_KR : $(td[2]).text(),
                FIRST_HALF_SCORE : $(td[3]).find("input[name='firstHalfScore']").val(),
                SECOND_HALF_SCORE : $(td[4]).find("input[name='secondHalfScore']").val(),
                SCORE_AVERAGE : $(td[5]).find("span").text(),
                RES_GRADE : $(td[6]).find("span").text(),
                EVAL_WEIGHTS : $(td[7]).find("input[name='evalWeights']").val() + "%",
                ACHIEVE_SCORE : $(td[8]).find("input[name='achieveScore']").val(),
                ACHIEVE_RATING : $(td[9]).find("span").text(),
                EVAL_ACHIEVE_WEIGHTS : $(td[10]).find("input[name='evalAchieveWeights']").val() + "%",
                ADJUSTED_SCORE : $(td[11]).find("input[name='adjustedScore']").val(),
                BEFORE_SCORE : $(td[12]).find("span").text(),
                FINAL_SCORE : $(td[13]).find("span").text(),
                FINAL_RATING : $(td[14]).find("span").text(),
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
                    title: "역량평가 상반기 점수",
                    width: 80,
                    field: "FIRST_HALF_SCORE"
                }, {
                    title: "역량평가 하반기 점수",
                    width: 80,
                    field: "SECOND_HALF_SCORE"
                }, {
                    title: "역량평가 최종점수",
                    width: 80,
                    field: "SCORE_AVERAGE"
                }, {
                    title: "역량평가 최종등급",
                    width: 80,
                    field: "RES_GRADE"
                }, {
                    title: "역량평가 가중치",
                    width: 80,
                    field: "EVAL_WEIGHTS"
                }, {
                    title: "업적평가 최종점수",
                    width: 80,
                    field: "ACHIEVE_SCORE"
                }, {
                    title: "업적평가 최종등급",
                    width: 80,
                    field: "ACHIEVE_RATING"
                }, {
                    title: "업적평가 가중치",
                    width: 80,
                    field: "EVAL_ACHIEVE_WEIGHTS"
                }, {
                    title: "조정점수",
                    width: 80,
                    field: "ADJUSTED_SCORE"
                }, {
                    title: "조정전점수",
                    width: 80,
                    field: "BEFORE_SCORE"
                }, {
                    title: "최종점수",
                    width: 80,
                    field: "FINAL_SCORE"
                }, {
                    title: "최종등급",
                    width: 80,
                    field: "FINAL_RATING"
                }
            ],
        }).data("kendoGrid");
    },

    fn_excelDownload : function(){
        var grid = $("#hiddenGrid").data("kendoGrid");
        grid.bind("excelExport", function(e) {
            e.workbook.fileName = "역량&업적평가결과.xlsx";
        });
        grid.saveAsExcel();
    },

    setAllEvalApprove : function(){
        var empAllEvalArr = new Array();
        $("#evalList tr").each(function(i, v){
            var data = {
                baseYear : $("#baseYear").val(),
                empSeq : $(this).attr("empSeq"),
                firstHalfScore : $(this).find("input[name='firstHalfScore']").val(),
                secondHalfScore : $(this).find("input[name='secondHalfScore']").val(),
                scoreAverage : $(this).find("span[name='scoreAverage']").text(),
                resGrade : $(this).find("span[name='resGrade']").text(),
                evalWeights : $(this).find("input[name='evalWeights']").val(),
                achieveScore : $(this).find("input[name='achieveScore']").val(),
                achieveRating :  $(this).find("span[name='achieveRating']").text(),
                evalAchieveWeights : $(this).find("input[name='evalAchieveWeights']").val(),
                adjustedScore : $(this).find("input[name='adjustedScore']").val(),
                beforeScore : $(this).find("span[name='beforeScore']").text(),
                finalScore : $(this).find("span[name='finalScore']").text(),
                finalRating : $(this).find("span[name='finalRating']").text(),
                regEmpSeq : $("#regEmpSeq").val(),
            }

            empAllEvalArr.push(data);
        })

        $.ajax({
            url : "/evaluation/setAllEvalApprove",
            data : {
                empAllEvalArr : JSON.stringify(empAllEvalArr)
            },
            dataType : "json",
            type : "post",
            success: function (rs) {
                $("#allEvalDraftFrm #baseYear").val($("#baseYear").val())
                $("#allEvalApproveGroup").val(rs.params.allEvalApproveGroup)
                allEvalApprovePop.allEvalDrafting()
                window.close()
            },
            error: function () {
                alert("신청 데이터 저장 중 에러가 발생했습니다.");
            }
        });
    },

    allEvalDrafting : function(){
        $("#allEvalDraftFrm").one("submit", function() {
            var url = "/popup/evaluation/approvalFormPopup/allEvalApprovalPop.do";
            var name = "allEvalApprovalPop";
            var option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=yes, scrollbars = yes, status=no, top=50, left=50"
            var popup = window.open(url, name, option);

            this.action = url;
            this.method = 'POST';
            this.target = 'allEvalApprovalPop';
        }).trigger("submit");
    },
}

