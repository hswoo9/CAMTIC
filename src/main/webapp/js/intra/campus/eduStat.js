var eduStat = {
    init: function(){
        eduStat.dataSet();
        eduStat.mainGrid();
    },

    dataSet: function(){
        $("#eduYear").kendoDatePicker({
            start: "decade",
            depth: "decade",
            culture : "ko-KR",
            format : "yyyy",
            value : new Date()
        });

        $("#empName").kendoTextBox();

        $("#empName").keyup(function(){
            if(event.keyCode == 13){
                eduStat.mainGrid();
            }
        })


        // $("#largeCategory, #eduCategory, #level, #eduCategoryDetail").kendoDropDownList({
        //     dataTextField: "text",
        //     dataValueField: "value",
        //     dataSource: [
        //         {text: "선택하세요", value: ""}
        //     ],
        //     index : 0,
        //     enable : true
        // });
    },

    mainGrid: function(){
        var dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/campus/getEduStat',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    data.empSeq = $("#regEmpSeq").val();
                    data.empName = $("#empName").val();
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
            height: 508,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 50, "ALL" ],
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
            excel : {
                fileName : "개인학습통계 목록.xlsx",
                filterable : true
            },
            excelExport: exportGrid,
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
                    field: "SUM_TIME",
                    title: "인정시간",
                    width: 150,
                    template : function (row){
                        return row.SUM_TIME+'시간 / '+row.COUNT_BY+'건';
                    }
                }
            ]
        }).data("kendoGrid");
    }
}
