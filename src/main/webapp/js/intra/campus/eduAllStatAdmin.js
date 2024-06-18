let sum=0;
var eduAllStatAdmin = {

    global : {
        now : new Date()
    },

    init: function() {
        eduAllStatAdmin.dataSet();
        eduAllStatAdmin.mainGrid();
        eduAllStatAdmin.hiddenGrid();
    },

    dataSet: function(){
        fn_deptSetting();
        customKendo.fn_datePicker("startDt", '', "yyyy-MM-dd", new Date(eduAllStatAdmin.global.now.getFullYear() + '-01-01'));
        customKendo.fn_datePicker("endDt", '', "yyyy-MM-dd", new Date(eduAllStatAdmin.global.now.getFullYear() + '-12-31'));
        $("#startDay, #endDay").attr("readonly", true);
        let activeDataSource = [
            { text: "미포함", value: "Y" },
            { text: "포함", value: "N" }
        ]
        customKendo.fn_dropDownList("active", activeDataSource, "text", "value", 3);
        customKendo.fn_textBox(["sEmpName"]);
        fn_searchBind();
    },

    dutyNameCompare : function (a,b){
        if (a && !b) {
            return -1; // a를 b보다 앞으로 위치시키기
        } else if (!a && b) {
            return 1; // b를 a보다 앞으로 위치시키기
        } else {
            return 0; // 그 외에는 변경 없음
        }
    },

    mainGrid: function() {
        var dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/campus/getEduAllStatList',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    data.startDt = $("#startDt").val();
                    data.endDt = $("#endDt").val();
                    data.active = $("#active").val();
                    data.sEmpName = $("#sEmpName").val();
                    data.dept = $("#dept").data("kendoDropDownList").value();
                    data.team = $("#team").data("kendoDropDownList").value();
                    return data;
                }
            },
            schema : {
                data: function (data) {
                    return data.list;
                },
                total: function (data) {
                    return data.list.length;
                }
            },
            pageSize: 10,
            sort: [
                { field: "DEPT", dir: "asc" },
                { field: "DUTY_NAME", dir: "desc", compare: eduAllStatAdmin.dutyNameCompare() },
                { field: "EMP_NAME", dir: "asc" }
            ]
        });

        $("#allEduAdminGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            height: 508,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 30, 50, 100, "ALL"],
                buttonCount : 5
            },
            toolbar: [
                {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="eduAllStatAdmin.fn_excelDownload()">' +
                            '	<span class="k-icon k-i-file-excel k-button-icon"></span>' +
                            '	<span class="k-button-text">엑셀다운로드</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button k-button-solid-base" onclick="eduAllStatAdmin.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    },
                }
            ],
            excel : {
                fileName : "전체학습통계.xlsx",
                filterable : true
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    field: "DEPT",
                    title: "부서",
                    width: 455
                }, {
                    title: "직위",
                    width: 125,
                    template: function(row){
                        return fn_getSpot(row.DUTY_NAME, row.POSITION_NAME);
                    }
                }, {
                    field: "EMP_NAME",
                    title: "성명",
                    width: 100
                }, {
                    field: "PERSONAL_TIME",
                    title: "개인학습",
                    width: 125,
                    template: function(row){
                        return row.PERSONAL_TIME+"시간 / "+row.PERSONAL_COUNT+"건";
                    }
                }, {
                    field: "COMMON_EDU_TIME",
                    title: "공통학습",
                    /*width: "8%",*/
                    width: 125,
                    template: function(row){
                        return row.COMMON_EDU_TIME+"시간 / "+row.COMMON_EDU_COUNT+"건";
                    }
                },{
                    field: "STUDY_TIME",
                    title: "학습조",
                    width: 125,
                    template: function(row){
                        return row.STUDY_TIME+"시간 / "+row.STUDY_COUNT+"건";
                    }
                }, {
                    field: "PROPAG_TIME",
                    title: "전파학습",
                    width: 125,
                    template: function(row){
                        return row.PROPAG_TIME+"시간 / "+row.PROPAG_COUNT+"건";
                    }
                }, {
                    field: "OJT_TIME",
                    title: "OJT",
                    width: 125,
                    template: function(row){
                        return row.OJT_TIME+"시간 / "+row.OJT_COUNT+"건";
                    }
                }, {
                    field: "OPEN_STUDY_TIME",
                    title: "오픈스터디",
                    width: 125,
                    template: function(row){
                        return row.OPEN_STUDY_TIME+"시간 / "+row.OPEN_STUDY_COUNT+"건";
                    }
                },  {
                    field: "TOTAL_STAT",
                    title: "합계",
                    width: 125,
                    template: function(row){
                        var totNum = Number(row.PERSONAL_TIME) + Number(row.STUDY_TIME) + Number(row.PROPAG_TIME) + Number(row.OJT_TIME) + Number(row.OPEN_STUDY_TIME) + Number(row.COMMON_EDU_TIME);
                        var totCount = Number(row.PERSONAL_COUNT) + Number(row.STUDY_COUNT) + Number(row.PROPAG_COUNT) + Number(row.OJT_COUNT) + Number(row.OPEN_STUDY_COUNT) + Number(row.COMMON_EDU_COUNT);
                        return totNum+"시간 / "+totCount+"건";
                    }
                }
            ]
        }).data("kendoGrid");
    },

    hiddenGrid: function() {
        var dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/campus/getEduAllStatList',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    data.startDt = $("#startDt").val();
                    data.endDt = $("#endDt").val();
                    data.active = $("#active").val();
                    data.sEmpName = $("#sEmpName").val();
                    data.dept = $("#dept").data("kendoDropDownList").value();
                    data.team = $("#team").data("kendoDropDownList").value();

                    return data;
                }
            },
            schema : {
                data: function (data) {
                    return data.list;
                },
                total: function (data) {
                    return data.list.length;
                }
            },
            pageSize: 99999,
            sort: [
                { field: "DEPT", dir: "asc" },
                { field: "DUTY_NAME", dir: "desc", compare: eduAllStatAdmin.dutyNameCompare() },
                { field: "EMP_NAME", dir: "asc" }
            ]
        });

        $("#allEduAdminHiddenGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            selectable: "row",
            height: 508,
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    field: "DEPT",
                    title: "부서",
                    width: 455
                }, {
                    field: "SPOT",
                    title: "직위",
                    width: 125
                }, {
                    field: "EMP_NAME",
                    title: "성명",
                    width: 100
                }, {
                    field: "PERSONAL_TIME",
                    title: "개인학습 시간",
                    width: 125
                }, {
                    field: "PERSONAL_COUNT",
                    title: "개인학습 건",
                    width: 125
                }, {
                    field: "COMMON_EDU_TIME",
                    title: "공통학습 시간",
                    width: 125
                }, {
                    field: "COMMON_EDU_COUNT",
                    title: "공통학습 건",
                    width: 125
                }, {
                    field: "STUDY_TIME",
                    title: "학습조 시간",
                    width: 125
                }, {
                    field: "STUDY_COUNT",
                    title: "학습조 건",
                    width: 125
                }, {
                    field: "PROPAG_TIME",
                    title: "전파학습 시간",
                    width: 125
                }, {
                    field: "PROPAG_COUNT",
                    title: "전파학습 건",
                    width: 125
                }, {
                    field: "OJT_TIME",
                    title: "OJT 시간",
                    width: 125
                }, {
                    field: "OJT_COUNT",
                    title: "OJT 건",
                    width: 125
                }, {
                    field: "OPEN_STUDY_TIME",
                    title: "오픈스터디 시간",
                    width: 125
                }, {
                    field: "OPEN_STUDY_COUNT",
                    title: "오픈스터디 건",
                    width: 125
                }, {
                    field: "TOT_TIME",
                    title: "합계 시간",
                    width: 125
                }, {
                    field: "TOT_COUNT",
                    title: "합계 건",
                    width: 125
                }
            ]
        }).data("kendoGrid");
    },

    gridReload : function() {
        sum = 0;
        $("#allEduAdminGrid").data("kendoGrid").dataSource.read();
        $("#allEduAdminHiddenGrid").data("kendoGrid").dataSource.read();
    },

    fn_excelDownload: function(){
        var grid = $("#allEduAdminHiddenGrid").data("kendoGrid");
        grid.bind("excelExport", function(e) {
            e.workbook.fileName = "전체학습통계 목록.xlsx";
        });
        grid.saveAsExcel();
    }
}