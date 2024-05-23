var now = new Date();

var rewardReqPop = {

    init : function(){
        rewardReqPop.dataSet();
        rewardReqPop.mainGrid();
    },

    dataSet() {
        $("#text1, #text2, #text3, #text4, #text5, #text6").kendoTextBox();

        $("#drop1").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "포상 구분", value: "" },
                { text: "[내부 표창] 공로상", value: "1" },
                { text: "[내부 표창] 기타", value: "2" },
                { text: "[내부 표창] 우수사원 (개인)", value: "3" },
                { text: "[내부 표창] 우수사원 (단체)", value: "4" },
                { text: "[내부 표창] 캠틱인 (개인)", value: "5" },
                { text: "[내부 표창] 캠틱인 (단체)", value: "6" },
                { text: "[외부 표창] 기타", value: "7" },
                { text: "[외부 표창] 유관기관", value: "8" },
                { text: "[외부 표창] 중앙정부", value: "9" },
                { text: "[외부 표창] 지자체", value: "10" },
                { text: "[외부 표창] 학교", value: "11" }
            ],
            index: 0
        });

        $("#date1").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date()
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
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount : 5
            },
            toolbar : [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="">' +
                            '	<span class="k-button-text">선택완료</span>' +
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
                    template : "<input type='checkbox' id='' name='' value='' class='k-checkbox checkbox'/>"
                }, {
                    field: "",
                    title: "부서"
                }, {
                    field: "",
                    title: "팀"
                }, {
                    field: "",
                    title: "성명"
                }
            ]
        }).data("kendoGrid");
    }
}
