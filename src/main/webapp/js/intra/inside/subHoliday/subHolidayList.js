var subHolidayList = {
    global : {
        now : new Date(),
        params  : "",
        data : "",
        searchAjaxData : "",
        saveAjaxData : "",
        hwpCtrl : "",
    },

    init : function(params){
        subHolidayList.dataSet();
        subHolidayList.mainGrid();
    },

    dataSet : function() {
        $("#datePicker").kendoDatePicker({
            value: new Date(),
            start: "decade",
            depth: "decade",
            format: "yyyy",
            width: "150px"
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
                    width: "10%"
                }, {
                    field: "",
                    title: "순번",
                    width: "15%"
                }, {
                    field: "",
                    title: "구분"
                }, {
                    field: "",
                    title: "기간",
                    width: "15%"
                }, {
                    field: "",
                    title: "사용 일수",
                    width: "15%"
                }, {
                    field: "",
                    title: "상태",
                    width: "15%"
                }
            ]
        }).data("kendoGrid");
    },

    subHolidayReqPop : function() {
        var url = "/subHoliday/subHolidayReqPop.do";
        var name = "subHolidayReqPop";
        var option = "width=1030, height=850, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    }
}