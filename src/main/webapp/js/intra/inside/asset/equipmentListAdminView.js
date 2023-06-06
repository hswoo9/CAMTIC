var now = new Date();

var equipmentListAdminView = {

    init : function(){
        equipmentListAdminView.dataSet();
        equipmentListAdminView.mainGrid();
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

        $("#drop1").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                { text: "복합소재", value: "1" },
                { text: "드론산업", value: "2" },
                { text: "메이커스페이스", value: "3" }
            ],
            index: 0
        });

        $("#drop2").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                { text: "도내(단지)", value: "1" },
                { text: "도내(단지 외)", value: "2" },
                { text: "도외", value: "3" }
            ],
            index: 0
        });

        $("#searchType").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                { text: "사용자", value: "1" },
                { text: "작업내용", value: "2" },
                { text: "의뢰업체", value: "3" }
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
                    name: '',
                    text: '결재'
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
                    title: "장비명"
                }, {
                    field: "",
                    title: "사용기간"
                }, {
                    field: "",
                    title: "사용자"
                }, {
                    field: "",
                    title: "작업내용"
                }, {
                    field: "",
                    title: "총 사용시간"
                }, {
                    field: "",
                    title: "사용대금"
                }, {
                    field: "",
                    title: "의뢰업체"
                }, {
                    field: "",
                    title: "업체구분"
                }
            ]
        }).data("kendoGrid");
    },

    equipmentmangePopup : function(){
        var url = "/Inside/Pop/equipmentmangePop.do";
        var name = "equipmentmangePop";
        var option = "width = 1000, height = 450, top = 100, left = 200, location = no"
        var popup = window.open(url, name, option);
    }
}
