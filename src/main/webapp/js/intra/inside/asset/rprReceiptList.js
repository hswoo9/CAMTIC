var now = new Date();

var rprReceiptList = {

    init : function(){
        rprReceiptList.dataSet();
        rprReceiptList.mainGrid();
    },

    dataSet() {
        $("#drop1").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                { text: "직무발명 신고서", value: "1" },
                { text: "포상급지급 신청서", value: "2" }
            ],
            index: 0
        });

        $("#drop2").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                { text: "특허", value: "1" },
                { text: "실용신안", value: "2" },
                { text: "상표권", value: "3" },
                { text: "논문", value: "4" },
                { text: "도서", value: "5" },
                { text: "디자인권", value: "6" },
                { text: "저작권", value: "7" }
            ],
            index: 0
        });

        $("#searchType").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "명칭", value: "" },
                { text: "신청자", value: "1" },
                { text: "발명자", value: "2" }
            ],
            index: 0
        });

        $("#searchVal").kendoTextBox();
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
            height: 508,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 30, 50, 100 ],
                buttonCount : 5
            },
            toolbar : [
                {
                    name: 'button',
                    template: function (e) {
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="">' +
                            '	<span class="k-button-text">조회</span>' +
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
                    title: "순번"
                }, {
                    field: "",
                    title: "구분"
                }, {
                    field: "",
                    title: "종류"
                }, {
                    field: "",
                    title: "지식재산 명칭"
                }, {
                    field: "",
                    title: "신고자"
                }, {
                    field: "",
                    title: "발명자"
                }, {
                    field: "",
                    title: "상태"
                }, {
                    field: "",
                    title: "지식재산"
                }, {
                    field: "",
                    title: "지급신청서"
                }
            ]
        }).data("kendoGrid");
    },

    recruitReqPop : function() {
        var url = "/Inside/recruitReqPop.do";
        var name = "recruitReqPop";
        var option = "width=1800, height=900, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    },

    recruitAdminPop : function() {
        var url = "/Inside/recruitAdminPop.do";
        var name = "recruitAdminPop";
        var option = "width=1800, height=900, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    }
}
