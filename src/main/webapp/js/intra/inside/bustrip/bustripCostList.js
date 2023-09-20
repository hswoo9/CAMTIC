var costList = {

    init : function(){
        costList.dataSet();
        costList.mainGrid();
    },

    dataSet() {
    },

    mainGrid : function() {
        var dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/bustrip/getBustripCostList',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
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
                pageSizes: [10, 20, "ALL"],
                buttonCount : 5
            },
            toolbar : [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="costList.bustripCostReqPop();">' +
                            '	<span class="k-button-text">등록</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="">' +
                            '	<span class="k-button-text">삭제</span>' +
                            '</button>';
                    }
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    title: "적용기간",
                    template: function(row){
                        return row.START_DT+" ~ "+row.END_DT;
                    }
                }, {
                    field: "TRIP_TEXT",
                    title: "출장구분",
                    template: function(row){
                        return bustrip.fn_getTripCodeText(row);
                    }
                }, {
                    field: "EXNP_TEXT",
                    title: "여비 종류"
                }, {
                    title: "여비지급 금액",
                    template: function(row){
                        return fn_numberWithCommas(row.COST_AMT);
                    }
                }, {
                    field: "REMARK_CN",
                    title: "비고"
                }
            ]
        }).data("kendoGrid");
    },

    bustripCostReqPop : function() {
        const url = "/bustrip/pop/bustripCostReqPop.do";
        const name = "bustripCostReqPop";
        const option = "width=865, height=475, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        window.open(url, name, option);
    }
}
