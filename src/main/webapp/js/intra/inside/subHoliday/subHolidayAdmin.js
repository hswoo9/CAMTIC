var now = new Date();

var subHolidayAdmin = {
    global : {
        now : new Date(),
        params  : "",
        data : "",
        searchAjaxData : "",
        saveAjaxData : "",
        hwpCtrl : "",
    },

    init : function(params){
        subHolidayAdmin.dataSet();
        subHolidayAdmin.mainGrid();
    },

    dataSet : function() {
        $("#start_date").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date(now.setMonth(now.getMonth() - 1))
        });

        $("#end_date").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date()
        });

        $("#holidayCate").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                { text: "연가", value: "1" },
                { text: "오전반차", value: "2" },
                { text: "오후반차", value: "3" },
                { text: "병가", value: "4" },
                { text: "공가", value: "5" },
                { text: "경조휴가", value: "6" },
                { text: "출산휴가", value: "7" },
                { text: "대체휴가", value: "8" },
                { text: "근속포상휴가", value: "9" },
                { text: "휴일근로", value: "0" }
            ],
            index: 0
        });

        $("#status").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                { text: "작성중", value: "1" },
                { text: "제출", value: "2" },
                { text: "승인", value: "3" },
                { text: "반려", value: "4" }
            ],
            index: 0
        });

        $("#searchType").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "성명", value: "" },
                { text: "부서명", value: "1" },
                { text: "팀명", value: "2" },
                { text: "직급", value: "3" },
            ],
            index: 0
        });
    },

    mainGrid : function() {
        var dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data, operation) {
                    return data;
                }
            },
            schema : {
                data: function (data) {
                    return data;
                },
                total: function (data) {
                    return data.length;
                },
            },
            pageSize: 10,
        });

        $("#mainGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 489,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 30, 50, 100 ],
                buttonCount : 5
            },
            toolbar : [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="$(\'#fileAppendM\').data(\'kendoWindow\').open();">' +
                            '	<span class="k-button-text">취소</span>' +
                            '</button>';
                    }
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" class="k-checkbox checkbox"/>',
                    template : "<input type='checkbox' id='' name='' value='' class='k-checkbox checkbox'/>",
                    width: "8%"
                }, {
                    field: "",
                    title: "순번",
                    width: "12%"
                }, {
                    field: "",
                    title: "신청자",
                    width: "12%"
                }, {
                    field: "",
                    title: "구분"
                }, {
                    field: "",
                    title: "기간",
                    width: "12%"
                }, {
                    field: "",
                    title: "사용 일수",
                    width: "12%"
                }, {
                    field: "",
                    title: "상태",
                    width: "12%"
                }
            ]
        }).data("kendoGrid");
    },

    subHolidayReqBatchPop : function() {
        var url = "/subHoliday/subHolidayReqBatchPop.do";
        var name = "subHolidayReqBatchPop";
        var option = "width=1030, height=450, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    }
}