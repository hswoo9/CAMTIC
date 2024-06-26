var now = new Date();

var evaluationResultList = {
    global : {
        searchAjaxData : "",
        dropDownDataSource : ""
    },

    init: function(){
        evaluationResultList.dataSet();
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
                { text: "1차", value: "1" },
                { text: "2차", value: "2" },
                { text: "3차", value: "3" },
                { text: "4차", value: "4" },
                { text: "5차", value: "5" }
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
    },

    mainGrid: function() {
        var dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/evaluation/getEvalResultList',
                    type : "post"
                },
                parameterMap: function(data) {
                    data.searchDate = $("#searchDate").val();
                    data.evalNum = $("#evalNum").val();
                    data.dept = $("#dept").val();
                    data.team = $("#team").val();
                    data.position = $("#position").val();
                    data.duty = $("#duty").val();
                    return data;
                }
            },
            schema : {
                data: function (data) {
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
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="evaluationResultList.gridReload();">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            /*dataBound: ,*/
            columns: [
                {
                    field:"deptNm",
                    title:"부서명",
                    width:"10%"
                },
                {
                    field:"teamNm",
                    title:"팀명",
                    width:"10%"
                },
                {
                    field: "EMP_NAME_KR",
                    title: "성명",
                    width: "10%"
                }, {
                    title: "최종점수",
                    width: "10%",
                    template: function (e) {
                        var scoreF;
                        var scoreS;

                        if(e.DUTY_CODE == "2" || e.DUTY_CODE == "3" || e.DUTY_CODE == "7"){
                            scoreF = (parseFloat(e.DEPT_MANAGER_A / 100 * e.EVAL_F_SCORE)).toFixed(1);
                        }else if(e.DUTY_CODE == "4" || e.DUTY_CODE == "5"){
                            scoreF = (parseFloat(e.TEAM_MANAGER_A / 100 * e.EVAL_F_SCORE)).toFixed(1);
                        }else{
                            scoreF = (parseFloat(e.TEAM_MEMBER_A / 100 * e.EVAL_F_SCORE)).toFixed(1);
                        }

                        if(e.DUTY_CODE == "2" || e.DUTY_CODE == "3" || e.DUTY_CODE == "7"){
                            scoreS =  (parseFloat(e.DEPT_MANAGER_B / 100 * e.EVAL_S_SCORE)).toFixed(1);
                        }else if(e.DUTY_CODE == "4" || e.DUTY_CODE == "5"){
                            scoreS = (parseFloat(e.TEAM_MANAGER_B / 100 * e.EVAL_S_SCORE)).toFixed(1);
                        }else{
                            scoreS = (parseFloat(e.TEAM_MEMBER_B / 100 * e.EVAL_S_SCORE)).toFixed(1);
                        }

                        var totalScore = (parseFloat(scoreS) + parseFloat(scoreF)).toFixed(1);

                        return parseFloat(totalScore) + parseFloat(e.EVAL_SCORE_MNG);
                    }
                },{
                    title: "최종등급",
                    width: "10%",
                    template: function (e) {
                        return "S";
                    }
                }, {
                    title: "1차 평가의견",
                    width: "30%",
                    template: function (e) {
                        return e.EVAL_F_VIEW.replaceAll("\n", "<br>");
                    }
                },{
                    title: "2차 평가의견",
                    width: "30%",
                    template: function (e) {
                        return e.EVAL_S_VIEW.replaceAll("\n", "<br>");
                    }
                }]
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
        evaluationResultList.mainGrid('/Inside/employeeInterviewCard.do', evaluationResultList.global.searchAjaxData);
    }


}

