var employeeList = {

    init: function(){
        employeeList.dataSet();
        employeeList.mainGrid();
    },

    dataSet: function (){
        customKendo.fn_textBox(["searchText"]);
        customKendo.fn_datePicker("searchDate", 'decade', "yyyy", new Date());
        fn_deptSetting(2);
    },

    mainGrid: function() {
        var dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/Inside/employeeInterviewCard.do',
                    // dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    data.searchText = $("#searchText").val();
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
                pageSizes: [10, 20, "ALL"],
                buttonCount : 5
            },
            toolbar: [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="gridReload();">' +
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
                    field: "card_number",
                    title: "순번",
                    width: "5%"
                }, {
                    field: "dept_name",
                    title: "부서명",
                    width: "15%"
                }, {
                    field: "dept_team_name",
                    title: "팀명",
                    width: "15%"
                }, {
                    field: "emp_name_kr",
                    title: "피면담자",
                    template: function (e) {
                        return "<a href='#' onclick='employeeList.contentDetailPop(" + e.EMP_SEQ + ");' style='color: blue; cursor: pointer;'>" + e.emp_name_kr + "</a>";
                    },
                    width: "10%"
                }, {
                    field: "card_interview_date",
                    title: "면담일시",
                    width: "20%",
                    template: function (dataItem) {
                        var unixTime = dataItem.card_interview_date; // Unix 시간 데이터
                        var date = new Date(unixTime);

                        var formattedDate = date.getFullYear() + '-' +
                            ('0' + (date.getMonth() + 1)).slice(-2) + '-' +
                            ('0' + date.getDate()).slice(-2);

                        return formattedDate;
                    }
                }, {
                    field: "card_interviewer",
                    title: "면담자",
                    width: "10%"
                }, {
                    field: "card_superior_person",
                    title: "차상급자",
                    width: "10%"
                }, {
                    field: "card_superior_person2",
                    title: "차차상급자",
                    width: "10%"
                }, {
                    field: "card_status",
                    title: "상태",
                    width: "5%"
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

    contentDetailPop: function (empSeq){
        var url = "/Inside/pop/contentDetailPop.do?empSeq=" + empSeq; // EMP_SEQ 값을 URL에 추가
        var name = "contentDetailPop";
        var option = "width=850,height=800,top=100,left=200,location=no";
        var popup = window.open(url, name, option);
    }


}

