var popUnitPriceList = {
    global : {
        dropDownDataSource : "",
        searchAjaxData : "",
    },

    fn_defultScript: function (){
        popUnitPriceList.gridReload();
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
                pageSizes: [ 10, 20, 30, 50, 100 ],
                buttonCount: 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    title: "순번",
                    template: "#= --record #",
                    width: 50
                }, {
                    title: "창고",
                    field: "WH_CD_NM",
                    width: 120,
                }, {
                    title: "품번",
                    field: "ITEM_NO",
                    width: 150,
                }, {
                    title: "품명",
                    field: "ITEM_NAME",
                    width: 150
                }, {
                    title: "재고",
                    field: "CURRENT_INVEN",
                    width: 100,
                    template : function (e){
                        return popUnitPriceList.comma(e.CURRENT_INVEN);
                    },
                    attributes : {
                        style : "text-align : right;"
                    }
                }, {
                    title: "",
                    template: function(e){
                        return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-info" onclick="popUnitPriceList.fn_selItem(' + e.INVEN_SN + ')">선택</button>';
                    },
                    width: 60
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 3);
            }
        }).data("kendoGrid");
    },

    gridReload: function (){
        popUnitPriceList.global.searchAjaxData = {
            whCd : $("#whCd").val(),
            searchKeyword : $("#searchKeyword").val(),
            searchValue : $("#searchValue").val(),
        }

        popUnitPriceList.popMainGrid("/item/getItemInvenList.do", popUnitPriceList.global.searchAjaxData);
    },

    fn_selItem: function (e){
        var data= {
            invenSn : e
        }

        var result = customKendo.fn_customAjax("/item/getItemInven.do", data);
        if(result.flag){
            var rs = result.rs;
            console.log(rs);
            opener.parent.$("#invenSn").val(rs.INVEN_SN);
            opener.parent.$("#itemNo").val(rs.ITEM_NO);
            opener.parent.$("#itemName").val(rs.ITEM_NAME);
            opener.parent.$("#currentInven").val(rs.CURRENT_INVEN);
            opener.parent.$("#whCd").val(rs.WH_CD);
            opener.parent.$("#whCdNm").val(rs.WH_CD_NM);

            opener.parent.$("#invenSn").change();

            window.close();
        }
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