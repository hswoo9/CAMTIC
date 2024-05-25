var historyView = {

    init: function(){
        historyView.pageSet();

        var url = '/inside/getHistoryList';
        if(isAdmin){
            url = '/inside/getHistoryListAdmin';
        }

        historyView.mainGrid(url);
    },

    pageSet: function(){
        customKendo.fn_datePicker("applyDt", "year", "yyyy-MM", new Date());
    },

    mainGrid: function(url){
        var dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : url,
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    data.empSeq = $("#regEmpSeq").val();
                    data.applyDt = $("#applyDt").val();
                    return data;
                }
            },
            schema : {
                data: function(data){
                    return data.list;
                },
                total: function(data){
                    return data.list.length;
                },
            },
            pageSize: 10,
        });

        $("#historyViewGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 508,
            pageable: {
                refresh: true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount : 5
            },
            toolbar: [
                {
                    name: 'button',
                    template: function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound: historyView.onDataBound,
            columns: [
                {
                    field: "ROW_NUM",
                    title: "순번",
                    width: 40
                }, {
                    field: "EMP_NAME",
                    title: "성명",
                    width: 100
                }, {
                    field: "APNT_NAME",
                    title: "발령 구분",
                    width: 150
                }, {
                    field: "HISTORY_DT",
                    title: "발령 일자",
                    width: 150
                }, {
                    field: "NUMBER_NAME",
                    title: "호수",
                    width: 100
                }, {
                    title: "발령 사항",
                    template: function (row){
                        let historyVal = "";
                        if(!row.AF_DEPT_NAME == "") {
                            historyVal += row.AF_DEPT_NAME + " ";
                        }
                        if(!row.AF_TEAM_NAME == "") {
                            historyVal += row.AF_TEAM_NAME + " ";
                        }
                        if(!row.AF_POSITION_NAME == "") {
                            historyVal += row.AF_POSITION_NAME + " ";
                        }
                        if(!row.AF_DUTY_NAME == "") {
                            historyVal += row.AF_DUTY_NAME;
                        }
                        return historyVal;
                    }
                }, {
                    field: "ETC",
                    title: "비고",
                    width: 100
                }, {
                    title: "발령장",
                    width: 100,
                    template : function(row){
                        return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-info" onclick="historyView.historyPrintPop('+row.APNT_SN+');">' +
                            '	<span class="k-button-text">발급</span>' +
                            '</button>';
                    }
                }
            ]
        }).data("kendoGrid");
    },

    onDataBound: function(){
        const grid = this;
        grid.tbody.find("tr").dblclick(function(){
            const dataItem = grid.dataItem($(this));
            const apntSn = dataItem.APNT_SN;
            historyView.historyViewPop(apntSn);
        });
    },

    historyViewPop: function(apntSn){
        var url = "/Inside/pop/historyViewPop.do?apntSn="+apntSn;
        var name = "historyViewPop";
        var option = "width=965, height=600, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    },

    historyPrintPop: function(userProofSn){
        var url = "/Inside/pop/historyPrintPop.do?apntSn="+userProofSn+"&type=Y";
        var name = "historyPrintPop";
        var option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    }
}

function gridReload(){
    $("#historyViewGrid").data("kendoGrid").dataSource.read();
}