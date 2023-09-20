var fuelCostList = {

    init : function(){
        fuelCostList.dataSet();
        fuelCostList.mainGrid();
    },

    dataSet() {
    },

    mainGrid : function() {
        var dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/bustrip/getBustripFuelCostList',
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="fuelCostList.bustripExchangeMngPop();">' +
                            '	<span class="k-button-text">환율</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="fuelCostList.bustripFuelCostReqPop();">' +
                            '	<span class="k-button-text">등록</span>' +
                            '</button>';
                    }
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    title: "기준일",
                    template: function(row){
                        return row.START_DT+" ~ "+(row.END_DT == undefined ? "" : row.END_DT);
                    }
                }, {
                    title: "적용금액",
                    template: function(row){
                        return fn_numberWithCommas(row.COST_AMT)+" 원";
                    }
                }, {
                    title: "기준거리",
                    template: function(row){
                        return row.DISTANCE+" KM";
                    }
                }, {
                    title: "적용 프로젝트",
                    template: function(row){
                        return row.PROJECT_NM;
                    }
                }
            ]
        }).data("kendoGrid");
    },

    bustripFuelCostReqPop: function(){
        const url = "/bustrip/pop/bustripFuelCostReqPop.do";
        const name = "bustripCostReqPop";
        const option = "width=555, height=400, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        window.open(url, name, option);
    },

    bustripExchangeMngPop: function(){
        const url = "/bustrip/pop/bustripExchangeMngPop.do";
        const name = "bustripExchangeMngPop";
        const option = "width=555, height=160, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        window.open(url, name, option);

    }
}
