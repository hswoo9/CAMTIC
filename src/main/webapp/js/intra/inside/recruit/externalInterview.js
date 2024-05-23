var now = new Date();

var externalInterview = {

    init : function(){
        externalInterview.dataSet();
        externalInterview.mainGrid();
    },

    dataSet() {
        $("#recruitment").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" }
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
            height: 508,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount : 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll"/>',
                    template : "<input type='checkbox' id='' name='' value=''/>",
                    width: 50
                }, {
                    field: "",
                    title: "순번"
                }, {
                    field: "",
                    title: "성명"
                }, {
                    field: "",
                    title: "연령"
                }, {
                    field: "",
                    title: "성별"
                }, {
                    field: "",
                    title: "최종학력"
                }, {
                    field: "",
                    title: "경력"
                }, {
                    field: "",
                    title: "지역"
                }, {
                    field: "",
                    title: "외국어"
                }, {
                    field: "",
                    title: "직무(모집분야)"
                }, {
                    field: "",
                    title: "지원일시"
                }
            ]
        }).data("kendoGrid");
    },

    externalInterview : function() {
        var url = "/Inside/recruitReqPop.do";
        var name = "recruitReqPop";
        var option = "width=1800, height=900, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    }
}
