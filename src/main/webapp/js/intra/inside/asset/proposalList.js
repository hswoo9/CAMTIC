var now = new Date();

var proposalList = {

    init : function(){
        proposalList.dataSet();
        proposalList.mainGrid();
    },

    dataSet() {
        $("#searchType").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "물품명", value: "" },
                { text: "문서번호", value: "1" },
                { text: "청구서 제목", value: "2" }
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
                            '	<span class="k-button-text">미자산 처리</span>' +
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
                    width: 50
                }, {
                    field: "",
                    title: "순번"
                }, {
                    field: "",
                    title: "물품명"
                }, {
                    field: "",
                    title: "규격"
                }, {
                    field: "",
                    title: "단가"
                }, {
                    field: "",
                    title: "수량"
                }, {
                    field: "",
                    title: "금액"
                }, {
                    field: "",
                    title: "구입일"
                }, {
                    field: "",
                    title: "자산등록"
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
