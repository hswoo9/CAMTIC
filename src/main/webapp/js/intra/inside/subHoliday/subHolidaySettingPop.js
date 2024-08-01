const holidayHist = {

    global: {
        searchAjaxData : ""
    },

    fn_defaultScript: function(){
        holidayHist.pageSet();
        holidayHist.gridReload();
    },

    pageSet: function(){
        customKendo.fn_datePicker("startDt", 'month', "yyyy-MM-dd", new Date(now.setMonth(now.getMonth() - 1)));
        customKendo.fn_datePicker("endDt", 'month', "yyyy-MM-dd", new Date());
        $("#startDt").on("change", function(){
            if($(this).val() > $("#endDt").val()){
                $("#endDt").val($(this).val());
            }
            holidayHist.gridReload();
        });
        $("#endDt").on("change", function(){
            if($(this).val() < $("#startDt").val()){
                $("#startDt").val($(this).val());
            }
            holidayHist.gridReload();
        });
        $("#startDt, #endDt").attr("readonly", true);
        customKendo.fn_textBox(["searchVal"]);
    },

    gridReload: function(){
        holidayHist.global.searchAjaxData = {
            startDt : $("#startDt").val(),
            endDt : $("#endDt").val(),
            searchVal: $("#searchVal").val()
        };
        holidayHist.mainGrid("/subHoliday/getModVacList", holidayHist.global.searchAjaxData);
    },

    mainGrid: function(url, params){
        $("#mainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
            sortable: true,
            selectable: "row",
            height : 525,
            pageable: {
                refresh: true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount: 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            toolbar: [
                {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="holidayHist.gridReload()">' +
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
                    title: "번호",
                    width: 50,
                    template: "#= --record #"
                }, {
                    title: "변경사항",
                    columns: [
                        {
                            field: "DEPT_NAME",
                            title: "부서",
                            width: 90
                        }, {
                            field: "TEAM_NAME",
                            title: "팀",
                            width: 90
                        }, {
                            field: "EMP_NAME_KR",
                            title: "이름",
                            width: 60
                        }, {
                            field: "SPOT",
                            title: "직급",
                            width: 90
                        },
                    ]
                }, {
                    title: "기존발생연차",
                    columns: [
                        {
                            field: "BF_GRANT_DAY",
                            title: "수정전",
                            width: 90
                        }, {
                            field: "AF_GRANT_DAY",
                            title: "수정후",
                            width: 90
                        },
                    ]
                }, {
                    title: "보상발생연차",
                    columns: [
                        {
                            field: "BF_COMP_VAC",
                            title: "수정전",
                            width: 90
                        }, {
                            field: "AF_COMP_VAC",
                            title: "수정후",
                            width: 90
                        },
                    ]
                }, {
                    field: "REASON",
                    title: "변경사유",
                    width: 120
                }, {
                    field: "MOD_DT",
                    title: "수정일자",
                    width: 60
                }, {
                    field: "REG_EMP_NAME",
                    title: "수정자",
                    width: 90
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    }
}


