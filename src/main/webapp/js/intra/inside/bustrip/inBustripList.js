var now = new Date();

var inBustripList = {

    init : function(){
        inBustripList.dataSet();
        inBustripList.mainGrid();
    },

    dataSet() {
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

        $("#searchType").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "출장자", value: "" },
                { text: "기안자", value: "1" }
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="inBustripList.inBustripReqPop()">' +
                            '	<span class="k-button-text">신청</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="">' +
                            '	<span class="k-button-text">신청취소</span>' +
                            '</button>';
                    }
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    field: "",
                    title: "단계"
                }, {
                    field: "",
                    title: "이름"
                }, {
                    field: "",
                    title: "입금계좌"
                }, {
                    field: "",
                    title: "일자"
                }, {
                    field: "",
                    title: "시간"
                }, {
                    field: "",
                    title: "출장용무"
                }, {
                    field: "",
                    title: "출장지"
                }, {
                    field: "",
                    title: "업무차량<br>사용여부"
                }, {
                    field: "",
                    title: "지급액"
                }, {
                    field: "",
                    title: "출장신청"
                }, {
                    field: "",
                    title: "출장결과"
                }
            ]
        }).data("kendoGrid");
    },

    inBustripReqPop : function() {
        var url = "/Inside/pop/inBustripReqPop.do";
        var name = "inBustripReqPop";
        var option = "width=1200, height=470, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    }
}
