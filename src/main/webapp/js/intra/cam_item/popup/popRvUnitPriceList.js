var popRvUnitPriceList = {
    global : {
        dropDownDataSource : "",
        searchAjaxData : "",
    },

    fn_defaultScript: function (){
        popRvUnitPriceList.gridReload();
    },

    popMainGrid : function (url, params) {
        $("#popMainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 480,
            pageable: {
                refresh: true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount: 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    title: "거래처",
                    field: "CRM_NM",
                }, {
                    title: "입고일자",
                    field: "WH_DT",
                    width: 100,
                }, {
                    title: "입고량",
                    field: "WH_VOLUME",
                    width: 100,
                    template : function (e){
                        return popRvUnitPriceList.comma(e.WH_VOLUME);
                    },
                    attributes : {
                        style : "text-align : right;"
                    }
                }, {
                    title: "단가",
                    field: "UNIT_PRICE",
                    width: 100,
                    template : function (e){
                        return popRvUnitPriceList.comma(e.UNIT_PRICE);
                    },
                    attributes : {
                        style : "text-align : right;"
                    }
                }, {
                    title: "금액",
                    field: "AMT",
                    width: 100,
                    template : function (e){
                        return popRvUnitPriceList.comma(e.AMT);
                    },
                    attributes : {
                        style : "text-align : right;"
                    }
                }, {
                    title: "",
                    template: function(e){
                        return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-info" onclick="popRvUnitPriceList.fn_selItem(' + e.UNIT_PRICE + ')">단가적용</button>';
                    },
                    width: 100
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 3);
            }
        }).data("kendoGrid");
    },

    gridReload: function (){
        popRvUnitPriceList.global.searchAjaxData = {
            crmSn : $("#crmSn").val(),
            masterSn : $("#masterSn").val(),
        }

        popRvUnitPriceList.popMainGrid("/item/getItemWhInfoList.do", popRvUnitPriceList.global.searchAjaxData);
    },

    fn_selItem: function (e){
        opener.parent.$("#unitPrice").val(e);
        opener.parent.$("#unitPrice").change();
        window.close();
    },

    comma: function(str) {
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    },

    uncomma: function(str) {
        str = String(str);
        return str.replace(/[^\d]+/g, '');
    },
}