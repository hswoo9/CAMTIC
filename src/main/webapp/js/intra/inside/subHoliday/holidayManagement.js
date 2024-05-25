var now = new Date();

var holidayManagement = {
    global : {

    },

    init : function(params){
        holidayManagement.dataSet();


        holidayManagement.gridReload();
    },

    dataSet : function() {
        $("#").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "", value: "" },
                { text: "", value: "Y" },
                { text: "", value: "C" },
                { text: "", value: "E" }
            ],
            index: 0
        });

        $("#searchVal").kendoTextBox();
    },

    mainGrid : function(url, params){
        $("#mainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
            height: 538,
            sortable: true,
            scrollable: true,
            noRecords: {
                template: "<div style='margin: auto;'>데이터가 존재하지 않습니다.</div>"
            },
            pageable: {
                refresh: true,
                pageSize : 10,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount: 5,
                messages: {
                    display: "{0} - {1} of {2}",
                    itemsPerPage: "",
                    empty: "데이터가 없습니다.",
                }
            },
            toolbar : [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="holidayManagement.gridReload();">' +
                            '	<span class="k-button-text">저장</span>' +
                            '</button>';
                    }
                },
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" disabled onclick="holidayManagement.subHolidayReqBatchPop();">' +
                            '	<span class="k-button-text">삭제</span>' +
                            '</button>';
                    }
                }
            ],
            dataBound : holidayManagement.onDataBound,
            columns: [
                {
                    field: "EMP_NAME_KR",
                    title: "일자",
                    width: 150,
                },{
                    field: "SUBHOLIDAY_DT_CODE_NM",
                    title: "공휴일명",
                    width: 150,
                }, {
                    field: "SUBHOLIDAY_DT_CODE_NM",
                    title: "공휴일명",
                    width: 150,
                }, {
                    field: "SUBHOLIDAY_DT_CODE_NM",
                    title: "적용범위",
                    width: 150,
                }, {
                    field: "SUBHOLIDAY_DT_CODE_NM",
                    title: "사용여부",
                    width: 150,
                }],
        }).data("kendoGrid");

    },
    onDataBound : function(){
        var grid = this;

        grid.tbody.find("tr").dblclick(function (e) {
            var dataItem = grid.dataItem($(this));

            var url = "/subHoliday/pop/subHolidayReqPop.do?subholidayUseId=" + dataItem.SUBHOLIDAY_USE_ID + "&apprStat=" + dataItem.APPR_STAT;;
            var name = "subHolidayReqPop";
            var option = "width=1030, height=850, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
            var popup = window.open(url, name, option);
        });
    },

    gridReload : function(){
        var params = {
            mcCode : holidayManagement.global.mcCode,
            mdCode : holidayManagement.global.mdCode,
            empSeq : holidayManagement.global.empSeq
        }

        params.startDate = $("#startDate").val();
        params.endDate = $("#endDate").val();
        params.status = $("#status").val();
        params.edtHolidayKindTop = $("#edtHolidayKindTop").val();
        params.searchVal = $("#searchVal").val();

        holidayManagement.mainGrid("/subHoliday/getVacUseHistoryListAdmin", params);
    },

    subHolidayReqBatchPop : function() {
        var url = "/subHoliday/subHolidayReqBatchPop.do";
        var name = "subHolidayReqBatchPop";
        var option = "width=1030, height=450, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    },
}