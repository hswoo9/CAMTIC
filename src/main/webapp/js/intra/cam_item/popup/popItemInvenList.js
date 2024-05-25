var popItemInvenList = {
    global : {
        dropDownDataSource : "",
        searchAjaxData : "",
    },

    fn_defaultScript: function (){
        popItemInvenList.global.dropDownDataSource = customKendo.fn_customAjax("/item/smCodeList", {grpSn : "WC", lgCd : "WH"});
        customKendo.fn_dropDownList("whCd", popItemInvenList.global.dropDownDataSource, "ITEM_CD_NM", "ITEM_CD");
        $("#whCd").data("kendoDropDownList").bind("change", popItemInvenList.gridReload);

        popItemInvenList.global.dropDownDataSource = [
            { text : "품번", value : "ITEM_NO" },
            { text : "품명", value : "ITEM_NAME" }
        ]
        customKendo.fn_dropDownList("searchKeyword", popItemInvenList.global.dropDownDataSource, "text", "value");
        $("#searchKeyword").data("kendoDropDownList").bind("change", popItemInvenList.gridReload);
        customKendo.fn_textBox(["searchValue"]);

        popItemInvenList.gridReload();
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
                    field: "TOT_CNT",
                    width: 100,
                    template : function (e){
                        return popItemInvenList.comma(e.TOT_CNT);
                    },
                    attributes : {
                        style : "text-align : right;"
                    }
                }, {
                    title: "",
                    template: function(e){
                        return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-info" onclick="popItemInvenList.fn_selItem(' + e.INVEN_SN + ')">선택</button>';
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
        popItemInvenList.global.searchAjaxData = {
            whCd : $("#whCd").val(),
            searchKeyword : $("#searchKeyword").val(),
            reg : $("#reg").val(),
            searchValue : $("#searchValue").val(),
        }

        popItemInvenList.popMainGrid("/item/getItemInvenList.do", popItemInvenList.global.searchAjaxData);
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
            opener.parent.$("#masterSn").val(rs.MASTER_SN);
            opener.parent.$("#itemNo").val(rs.ITEM_NO);
            opener.parent.$("#itemName").val(rs.ITEM_NAME);
            opener.parent.$("#currentInven").val(rs.CURRENT_INVEN);
            opener.parent.$("#whCd").val(rs.WH_CD);
            opener.parent.$("#whCdNm").val(rs.WH_CD_NM);
            opener.parent.$("#unitPrice").val(rs.UNIT_PRICE);

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