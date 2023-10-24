var now = new Date();

var subHolidayAdmin = {
    global : {
        now : new Date(),
        empSeq : $("#empSeq").val(),
        mcCode : "V",
        mdCode : "",
        params  : "",
        data : "",
        searchAjaxData : "",
        saveAjaxData : "",
        hwpCtrl : "",
    },

    init : function(params){
        subHolidayAdmin.dataSet();

        customKendo.fn_datePicker("startDate", '', "yyyy-MM-dd", new Date(subHolidayAdmin.global.now.setMonth(subHolidayAdmin.global.now.getMonth() - 1)));
        customKendo.fn_datePicker("endDate", '', "yyyy-MM-dd", new Date());

        var data = {
            mcCode : subHolidayAdmin.global.mcCode,
            mdCode : subHolidayAdmin.global.mdCode,
            empSeq : subHolidayAdmin.global.empSeq
        }

        subHolidayAdmin.global.vacGubun = customKendo.fn_customAjax("/subHoliday/getVacCodeList", data);
        var ds = subHolidayAdmin.global.vacGubun;
        console.log(ds);
        ds.list.unshift({"SUBHOLIDAY_DT_CODE_NM" : "선택", "SUBHOLIDAY_CODE_ID" : ""});
        $("#edtHolidayKindTop").kendoDropDownList({
            dataSource : ds.list,
            dataTextField: "SUBHOLIDAY_DT_CODE_NM",
            dataValueField: "SUBHOLIDAY_CODE_ID",
        });

        subHolidayAdmin.gridReload();
    },

    dataSet : function() {
        $("#status").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                { text: "승인", value: "Y" },
                { text: "진행중", value: "C" },
                { text: "반려", value: "E" }
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
                pageSizes: [10, 20, "ALL"],
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="subHolidayAdmin.gridReload();">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                },
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" disabled onclick="subHolidayAdmin.subHolidayReqBatchPop();">' +
                            '	<span class="k-button-text">연가일괄등록</span>' +
                            '</button>';
                    }
                }
            ],
            dataBound : subHolidayAdmin.onDataBound,
            columns: [
                {
                    field: "EMP_NAME_KR",
                    title: "이름",
                    width: 150,
                },{
                    field: "SUBHOLIDAY_DT_CODE_NM",
                    title: "휴가구분",
                    width: 150,
                }, {
                    title: "기간 또는 일시",
                    columns : [
                        {
                            field: "SUBHOLIDAY_ST_DT",
                            title: "부터",
                            width: 190,
                            template: function(dataItem) {
                                if (dataItem.SUBHOLIDAY_DT_CODE_NM === "휴일근로") {
                                    return dataItem.SUBHOLIDAY_WORK_DAY;
                                }
                                else {
                                    return dataItem.SUBHOLIDAY_ST_DT;
                                }
                            }
                        }, {
                            field: "SUBHOLIDAY_EN_DT",
                            title: "까지",
                            width: 190,
                            template: function(dataItem) {
                                if (dataItem.SUBHOLIDAY_DT_CODE_NM === "휴일근로") {
                                    return dataItem.SUBHOLIDAY_WORK_DAY;
                                }
                                else {
                                    return dataItem.SUBHOLIDAY_EN_DT;
                                }
                            }
                        }, {
                            field: "SUBHOLIDAY_USE_DAY",
                            title: "일수(시간)",
                            width: 100,
                        }
                    ]
                }, {
                    field: "RMK",
                    title: "내용",
                    align:"center"
                }, {
                    field: "APPROVAL_SEND_DATE",
                    title: "요청일자",
                    align:"center",
                    width: 100,
                }, {
                    field : "APPR_STAT",
                    title : "승인상태",
                    template : function(e){
                        if(e.APPR_STAT == "N"){
                            return "요청진행전";
                        } else if(e.APPR_STAT == "Y"){
                            return "승인";
                        } else if(e.APPR_STAT =="C"){
                            return "진행중";
                        } else if(e.APPR_STAT =="E"){
                            return "반려";
                        }
                    },
                    width: 100,
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
            mcCode : subHolidayAdmin.global.mcCode,
            mdCode : subHolidayAdmin.global.mdCode,
            empSeq : subHolidayAdmin.global.empSeq
        }

        params.startDate = $("#startDate").val();
        params.endDate = $("#endDate").val();
        params.status = $("#status").val();
        params.edtHolidayKindTop = $("#edtHolidayKindTop").val();
        params.searchVal = $("#searchVal").val();

        subHolidayAdmin.mainGrid("/subHoliday/getVacUseHistoryListAdmin", params);
    },

    subHolidayReqBatchPop : function() {
        var url = "/subHoliday/subHolidayReqBatchPop.do";
        var name = "subHolidayReqBatchPop";
        var option = "width=1030, height=450, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    },
}