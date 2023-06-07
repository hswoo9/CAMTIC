var now = new Date();

var pdaPeristalsisList = {

    init : function(){
        pdaPeristalsisList.dataSet();
        pdaPeristalsisList.mainGrid();
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
                { text: "CAMTIC", value: "1" },
                { text: "드론산업", value: "2" },
                { text: "벤처단지", value: "3" }
            ],
            index: 0
        });

        $("#drop2").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                { text: "자산", value: "1" },
                { text: "소모품", value: "2" },
                { text: "부대품", value: "3" }
            ],
            index: 0
        });

        $("#drop3").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                { text: "2022 정기 재물조사", value: "1" },
                { text: "미지정", value: "2" }
            ],
            index: 0
        });

        $("#drop4").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                { text: "활용", value: "1" },
                { text: "불용·불용", value: "2" },
                { text: "불용·요정", value: "3" },
                { text: "불용·유휴", value: "4" },
                { text: "불용·부족", value: "5" },
                { text: "처분·폐기", value: "6" }
            ],
            index: 0
        });

        $("#drop5").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                { text: "실시", value: "1" },
                { text: "미실시", value: "2" }
            ],
            index: 0
        });

        $("#drop6").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                { text: "변경", value: "1" },
                { text: "미변경", value: "2" }
            ],
            index: 0
        });


        $("#drop7").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                { text: "변경", value: "1" },
                { text: "미변경", value: "2" }
            ],
            index: 0
        });

        $("#drop8").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                { text: "20개", value: "1" },
                { text: "50개", value: "2" },
                { text: "100개", value: "3" }
            ],
            index: 0
        });

        $("#searchType").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "자산명", value: "1" },
                { text: "자산호", value: "2" },
                { text: "모델", value: "3" }
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="">' +
                            '	<span class="k-button-text">위치이동</span>' +
                            '</button>';
                    }
                }, {
                    name: 'excel',
                    text: '엑셀다운로드'
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
                    title: "자산 번호"
                }, {
                    field: "",
                    title: "구입 일자"
                }, {
                    field: "",
                    title: "자산명"
                }, {
                    field: "",
                    title: "기존위치"
                }, {
                    field: "",
                    title: "신규위치"
                }, {
                    field: "",
                    title: "자산상태"
                }, {
                    field: "",
                    title: "적용일"
                }, {
                    field: "",
                    title: "재물조사"
                }, {
                    field: "",
                    title: "바코드"
                }
            ]
        }).data("kendoGrid");
    }
}
