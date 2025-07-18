var now = new Date();

var evaluationResultList = {
    global : {
        searchAjaxData : "",
        dropDownDataSource : "",
        evalData : null,
        scoreList : new Array()
    },

    init: function(){
        evaluationResultList.dataSet();
        evaluationResultList.getAllEvalApproveList();
        evaluationResultList.mainGrid();
        evaluationResultList.gridReload();
    },

    dataSet: function (){
        customKendo.fn_textBox(["searchText"]);
        let searchArr = [
            {text: "이름", value: "1"}
        ]

        customKendo.fn_dropDownList("searchType", searchArr, "text", "value", 3);
        customKendo.fn_datePicker("searchDate", 'decade', "yyyy", new Date());
        fn_deptSetting(2);


        evaluationResultList.global.dropDownDataSource = customKendo.fn_customAjax("/system/commonCodeManagement/getCmCodeList", {cmGroupCodeId : "4"});
        customKendo.fn_dropDownList("position", evaluationResultList.global.dropDownDataSource, "CM_CODE_NM", "CM_CODE", 2);

        evaluationResultList.global.dropDownDataSource = customKendo.fn_customAjax("/system/commonCodeManagement/getCmCodeList", {cmGroupCodeId : "3"});
        customKendo.fn_dropDownList("duty", evaluationResultList.global.dropDownDataSource, "CM_CODE_NM", "CM_CODE", 2);


        $("#evalNum").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "상반기", value: "1" },
                { text: "하반기", value: "2" },
            ],
            index: 0
        });

        $("#dept").data("kendoDropDownList").value($("#regDeptSeq").val())
        $("#dept").data("kendoDropDownList").trigger("change");
        $("#dept").data("kendoDropDownList").enable(false);
        $("#team").data("kendoDropDownList").value($("#regTeamSeq").val());
        if(!($("#regDutyCode").val() == "2" || $("#regDutyCode").val() == "3" || $("#regDutyCode").val() == "7")){
            $("#team").data("kendoDropDownList").enable(false);
        }

        const authorList = customKendo.fn_customAjax("/system/getAuthorityGroupUserList.do", {authorityGroupId : "19"}).rs;
        for(let i=0; i<authorList.length; i++){
            const map = authorList[i];
            if(map.EMP_SEQ == $("#regEmpSeq").val()){
                $("#dept").data("kendoDropDownList").enable(true);
                $("#team").data("kendoDropDownList").enable(true);
            }
        }

        if($("#regEmpSeq").val() == "1"){
            $("#dept").data("kendoDropDownList").enable(true);
            $("#team").data("kendoDropDownList").enable(true);
            $("#dept").data("kendoDropDownList").value("");
            $("#dept").data("kendoDropDownList").trigger("change");
            $("#team").data("kendoDropDownList").value("");
        }

        if($("#regDutyName") == ""){
            $("#adminInput").hide();
        }
    },

    getAllEvalApproveList : function(){
        $.ajax({
            url : "/evaluation/getAllEvalApproveList",
            type : "post",
            data : {
                baseYear : $("#searchDate").val(),
                dept : $("#dept").val(),
                team : $("#team").val(),
                position : $("#position").val(),
                duty : $("#duty").val(),
                regDutyCode : $("#regDutyCode").val(),
                empSeq : $("#empSeq").val(),
            },
            dataType : "json",
            async : false,
            success : function(result){
                $("#allEvalResultTb").empty();
                var rs = result.rs;
                var html = "";
                if(rs.length > 0){
                    for(var i = 0; i < rs.length; i++){
                        html += '' +
                            '<tr>' +
                                '<td class="text-center">' + (i+1) + '</td>' +
                                '<td class="text-center">' + rs[i].DEPT_NAME + '</td>' +
                                '<td class="text-center">' + rs[i].TEAM_NAME + '</td>' +
                                '<td class="text-center">' + rs[i].EMP_NAME_KR + '</td>' +
                                '<td class="text-center">' + rs[i].FIRST_HALF_SCORE + '</td>' +
                                '<td class="text-center">' + rs[i].SECOND_HALF_SCORE + '</td>' +
                                '<td class="text-center">' + rs[i].SCORE_AVERAGE + '</td>' +
                                '<td class="text-center" style="display: none;">' + rs[i].RES_GRADE + '</td>' +
                                '<td class="text-center">' + rs[i].EVAL_WEIGHTS + '%</td>' +
                                '<td class="text-center">' + rs[i].ACHIEVE_SCORE + '</td>' +
                                '<td class="text-center" style="display: none;">' + rs[i].ACHIEVE_RATING + '</td>' +
                                '<td class="text-center">' + rs[i].EVAL_ACHIEVE_WEIGHTS + '%</td>' +
                                '<td class="text-center" style="display: none;">' + rs[i].FINAL_SCORE + '</td>' +
                                '<td class="text-center">' + rs[i].FINAL_RATING + '</td>' +
                            '</tr>'
                    }
                }else{
                    html += '' +
                        '<tr>' +
                            '<td colspan="14" class="text-center">데이터가 없습니다.</td>' +
                        '</tr>'
                }
                $("#allEvalResultTb").html(html);

            },
            error : function(e) {
            }
        });
    },

    mainGrid: function() {
        var dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : "/evaluation/getEvalResultEmpList",
                    type : "post"
                },
                parameterMap: function(data) {
                    data.searchDate = $("#searchDate").val();
                    data.evalNum = $("#evalNum").val();
                    data.dept = $("#dept").val();
                    data.team = $("#team").val();
                    data.position = $("#position").val();
                    data.duty = $("#duty").val();
                    if($("#regDutyName").val() == "" && $("#regEmpSeq").val() != "1"){
                        data.empSeq = $("#empSeq").val();
                    }
                    data.listCk = "Y";
                    return data;
                }
            },
            schema : {
                data: function (data) {
                    if(data.list.length > 0){
                        evaluationResultList.global.evalData = data.data;
                        evaluationResultList.global.scoreList = customKendo.fn_customAjax("/evaluation/getEvaluation", {
                            evalSn: data.list[0].EVAL_SN
                        }).scList;
                    }

                    return data.list;
                },
                total: function (data) {
                    return data.list.length;
                },
            },
            pageSize: 10,
        });

        $("#mainGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            height: 508,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount : 5
            },
            dataBound: function(e) {
                var gridData = this.dataSource.view(); // 현재 페이지의 데이터 가져오기
                console.log("Kendo UI Grid 데이터:", gridData);
            },
            toolbar: [
                {
                    name : 'excel',
                    text: '엑셀다운로드'
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="evaluationResultList.gridReload();">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }
            ],
            excel : {
                fileName : "역량평가결과 목록.xlsx",
                filterable : true
            },
            excelExport: exportGrid,
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            /*dataBound: ,*/
            columns: [
                {
                    field: "deptNm",
                    title: "부서명",
                    width: 150
                }, {
                    field: "teamNm",
                    title: "팀명",
                    width: 150
                }, {
                    field: "EMP_NAME_KR",
                    title: "성명",
                    width: 80
                }, /*{
                    field: "EVAL_SCORE",
                    title: "본인점수",
                    width: 80,
                    template: function(e){
                        if(e.EVAL == "Y"){
                            return e.EVAL_SCORE;
                        }else{
                            return "-";
                        }
                    }
                }, {
                    field: "FINAL_SCORE",
                    title: "최종점수",
                    width: 80,
                    template: function (e) {
                        let aDeptPer = Number(e.DEPT_MANAGER_A);
                        let bDeptPer = Number(e.DEPT_MANAGER_B);
                        let aTeamPer = Number(e.TEAM_MANAGER_A);
                        let bTeamPer = Number(e.TEAM_MANAGER_B);
                        let aMemPer = Number(e.TEAM_MEMBER_A);
                        let bMemPer = Number(e.TEAM_MEMBER_B);

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

                        let scoreTot = 0;

                        if(e.DUTY_CODE == "2" || e.DUTY_CODE == "3" || e.DUTY_CODE == "7"){
                            scoreTot = calculateFinalScore(aDeptPer, e.EVAL_F_SCORE, bDeptPer, e.EVAL_S_SCORE);
                        }else if(e.DUTY_CODE == "4" || e.DUTY_CODE == "5"){
                            scoreTot = calculateFinalScore(aTeamPer, e.EVAL_F_SCORE, bTeamPer, e.EVAL_S_SCORE);
                        }else{
                            scoreTot = calculateFinalScore(aMemPer, e.EVAL_F_SCORE, bMemPer, e.EVAL_S_SCORE);
                        }
                        return scoreTot;
                    }
                },*/ {
                    field: "FINAL_RATING",
                    title: "최종등급",
                    width: 80,
                    /*template: function (e) {
                        let aDeptPer = Number(e.DEPT_MANAGER_A);
                        let bDeptPer = Number(e.DEPT_MANAGER_B);
                        let aTeamPer = Number(e.TEAM_MANAGER_A);
                        let bTeamPer = Number(e.TEAM_MANAGER_B);
                        let aMemPer = Number(e.TEAM_MEMBER_A);
                        let bMemPer = Number(e.TEAM_MEMBER_B);

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

                        let scoreTot = 0;

                        if(e.DUTY_CODE == "2" || e.DUTY_CODE == "3" || e.DUTY_CODE == "7"){
                            scoreTot = calculateFinalScore(aDeptPer, e.EVAL_F_SCORE, bDeptPer, e.EVAL_S_SCORE);
                        }else if(e.DUTY_CODE == "4" || e.DUTY_CODE == "5"){
                            scoreTot = calculateFinalScore(aTeamPer, e.EVAL_F_SCORE, bTeamPer, e.EVAL_S_SCORE);
                        }else{
                            scoreTot = calculateFinalScore(aMemPer, e.EVAL_F_SCORE, bMemPer, e.EVAL_S_SCORE);
                        }

                        let resGrade = "-";
                        for (let j = 0; j < evaluationResultList.global.scoreList.length; j++) {
                            const scItem = evaluationResultList.global.scoreList[j];
                            if(Number(scItem.EVAL_SCORE_B) >= Number(scoreTot) && Number(scoreTot) >= Number(scItem.EVAL_SCORE_A)){
                                resGrade = scItem.EVAL_GRADE;
                            }
                        }
                        return resGrade;
                    }*/
                }, {
                    field: "EVAL_F_VIEW",
                    title: "1차 평가의견",
                    template: function(e){
                        return e.EVAL_F_VIEW.replaceAll("\n", "<br>");
                    }
                }, {
                    field: "EVAL_S_VIEW",
                    title: "2차 평가의견",
                    template: function(e){
                        return e.EVAL_S_VIEW.replaceAll("\n", "<br>");
                    }
                }
            ]
        }).data("kendoGrid");
    },



    contentPop: function(){
        var url = "/Inside/pop/contentPop.do";
        var name = "contentPop";
        var option = "width = 850, height = 360, top = 100, left = 200, location = no"
        var popup = window.open(url, name, option);
    },

    contentWritePop: function(){
        var url = "/Inside/pop/contentWritePop.do";
        var name = "contentWritePop";
        var option = "width = 850, height = 800, top = 100, left = 200, location = no"
        var popup = window.open(url, name, option);
    },

    contentDetailPop: function (cardNumber){
        var url = "/Inside/pop/contentDetailPop.do?cardNumber=" + cardNumber; // card_number 값을 URL에 추가
        var name = "contentDetailPop";
        var option = "width=850,height=800,top=100,left=200,location=no";
        var popup = window.open(url, name, option);
    },

    gridReload: function () {
        console.log('gridReload 함수 호출됨');

        var searchDate = $("#searchDate").val();

// 입력에서 날짜를 구문 분석하고 "yyyy-MM-dd" 형식으로 포맷합니다.
        if (searchDate) {
            var dateObj = new Date(searchDate);
            searchDate = dateObj.toISOString().substr(0, 10);
        }
        evaluationResultList.global.searchAjaxData = {
            searchDate: $('#searchDate').val(),
            dept: $("#dept").val(),
            team: $("#team").val(),
            searchText: $("#searchText").val()
        };

        // 위에서 변수로 저장한 값을 객체에서 가져오도록 수정
        var searchDate = evaluationResultList.global.searchAjaxData.searchDate;
        var dept = evaluationResultList.global.searchAjaxData.dept;
        var team = evaluationResultList.global.searchAjaxData.team;
        var searchText = evaluationResultList.global.searchAjaxData.searchText;

        // 콘솔 로그 추가
        console.log('Search Date: ' + searchDate);
        console.log('Dept: ' + dept);
        console.log('Team: ' + team);
        console.log('Search Text: ' + searchText);


        // if (searchDate) {
        //     var dateObj = new Date(searchDate);
        //     var formattedSearchDate =
        //         dateObj.getFullYear() +
        //         "-" +
        //         ("0" + (dateObj.getMonth() + 1)).slice(-2) +
        //         "-" +
        //         ("0" + dateObj.getDate()).slice(-2);
        //     searchDate = formattedSearchDate;
        // }

        // 데이터가 잘 설정되었는지 확인하기 위해 mainGrid 함수 호출
        evaluationResultList.mainGrid('/Inside/getInterviewCardList', evaluationResultList.global.searchAjaxData);
        evaluationResultList.getAllEvalApproveList();
    }


}

