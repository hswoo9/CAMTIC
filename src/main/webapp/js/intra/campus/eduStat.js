var now = new Date();

var eduStat = {

    init : function(){
        eduStat.dataSet();
        eduStat.mainGrid();
    },

    dataSet: function() {
        $("#eduYear").kendoDatePicker({
            start: "decade",
            depth: "decade",
            culture : "ko-KR",
            format : "yyyy",
            value : new Date()
        });

        $("#largeCategory, #eduCategory, #level, #eduCategoryDetail").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "선택하세요", value: ""}
            ],
            index : 0,
            enable : true
        });
    },

    mainGrid : function() {
        var dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/campus/getEduStat',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    data.empSeq = $("#empSeq").val();
                    data.eduYear = $("#eduYear").val();
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
            selectable: "row",
            height: 489,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 30, 50, 100 ],
                buttonCount : 5
            },
            toolbar : [
                {
                    name : 'excel',
                    text: '엑셀다운로드'
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    field: "TEAM",
                    title: "부서(팀)",
                    width: 150
                }, {
                    field: "DUTY_NAME",
                    title: "직급",
                    width: 100
                }, {
                    field: "EMP_NAME",
                    title: "성명",
                    width: 80
                }, {
                    field: "DUTY_CLASS",
                    title: "업무",
                    width: 80
                }, {
                    field: "LARGE_CATEGORY_NAME",
                    title: "직무",
                    width: 150
                }, {
                    field: "EDU_CATEGORY_NAME",
                    title: "구분"
                }, {
                    field: "LEVEL",
                    title: "레벨",
                    width: 80
                }, {
                    field: "EDU_CATEGORY_DETAIL_NAME",
                    title: "학습목표",
                    width: 150
                }, {
                    title: "인정시간",
                    width: 150,
                    template : function (row){
                        return row.SUM_TIME+'.0 시간 / '+row.COUNT_BY+'건';
                    }
                }, {
                    field: "",
                    title: "합계",
                    width: 150
                }
            ]
        }).data("kendoGrid")
    }
}
