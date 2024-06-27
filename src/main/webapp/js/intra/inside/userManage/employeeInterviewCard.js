var now = new Date();

var employeeList = {
    global : {
        searchAjaxData : "",
    },

    init: function(){
        employeeList.dataSet();
        employeeList.mainGrid();
        employeeList.gridReload();
    },

    dataSet: function (){
        customKendo.fn_textBox(["searchText"]);
        let searchArr = [
            {text: "이름", value: "1"}
        ]

        customKendo.fn_dropDownList("searchType", searchArr, "text", "value", 3);
        customKendo.fn_datePicker("searchDate", 'decade', "yyyy", new Date());
        fn_deptSetting(2);

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
                    url : '/Inside/employeeInterviewCard.do',
                    type : "post"
                },
                parameterMap: function(data) {
                    data.searchText = $("#searchText").val();
                    data.dept = $("#dept").val();
                    data.team = $("#team").val();
                    data.searchDate = $("#searchDate").val();
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="employeeList.gridReload();">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                },
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="employeeList.contentPop();">' +
                            '	<span class="k-button-text">면담내용 설정</span>' +
                            '</button>';
                    }
                },
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="employeeList.contentWritePop();">' +
                            '	<span class="k-button-text">면담카드 등록</span>' +
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
                    field: "row_num",
                    title: "순번",
                    width: "5%"
                },
                {
                    field:"dept_name",
                    title:"부서명",
                    width:"15%",
                    template:function(e){
                        return '<input type="hidden" id="' + e.EMP_SEQ + '_dept_seq">' + e.dept_name;
                    }
                    },
                {
                    field:"dept_team_name",
                    title:"팀명",
                    width:"15%",
                    template:function(e){
                        return '<input type="hidden" id="' + e.EMP_SEQ + '_team_seq">' + e.dept_team_name;
                    }
                    },
                {
                    field: "emp_name_kr",
                    title: "피면담자",
                    template: function (e) {
                        return "<a href='#' onclick='employeeList.contentDetailPop(" + e.card_number + ");' style='color: blue; cursor: pointer;'>" + e.emp_name_kr + "</a>";
                    },
                    width: "10%"
                }, {
                    field: "card_interview_date",
                    title: "면담일자",
                    width: "20%",
                    template: function (dataItem) {
                        var unixTime = dataItem.card_interview_date; // Unix 시간 데이터
                        var date = new Date(unixTime);

                        var formattedDate = date.getFullYear() + '-' +
                            ('0' + (date.getMonth() + 1)).slice(-2) + '-' +
                            ('0' + date.getDate()).slice(-2);

                        return formattedDate;
                    }
                },{
                    field: "sTime",
                    title: "시작시간",
                    width: "10%"
                }, {
                    field: "eTime",
                    title: "종료시간",
                    width: "10%"
                },{
                    field: "card_interviewer",
                    title: "면담자",
                    width: "10%"
                }, /*{
                    field: "card_status",
                    title: "상태",
                    width: "5%"
                }*/]
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
        employeeList.global.searchAjaxData = {
            searchDate: $('#searchDate').val(),
            dept: $("#dept").val(),
            team: $("#team").val(),
            searchText: $("#searchText").val()
        };

        // 위에서 변수로 저장한 값을 객체에서 가져오도록 수정
        var searchDate = employeeList.global.searchAjaxData.searchDate;
        var dept = employeeList.global.searchAjaxData.dept;
        var team = employeeList.global.searchAjaxData.team;
        var searchText = employeeList.global.searchAjaxData.searchText;

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
        employeeList.mainGrid('/Inside/employeeInterviewCard.do', employeeList.global.searchAjaxData);
    }


}

