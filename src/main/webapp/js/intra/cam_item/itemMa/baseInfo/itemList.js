var itemL = {

    global : {
        dropDownDataSource : "",
        searchAjaxData : "",
        saveAjaxData : "",
    },

    fn_defaultScript : function (){
        itemL.global.dropDownDataSource = customKendo.fn_customAjax("/item/smCodeList", {grpSn : "PT", lgCd : "IT"});
        customKendo.fn_dropDownList("itemType", itemL.global.dropDownDataSource, "ITEM_CD_NM", "ITEM_CD");
        $("#itemType").data("kendoDropDownList").bind("change", itemL.gridReload);

        itemL.global.dropDownDataSource = customKendo.fn_customAjax("/item/smCodeList", {grpSn : "WC", lgCd : "WH"});
        customKendo.fn_dropDownList("whCd", itemL.global.dropDownDataSource, "ITEM_CD_NM", "ITEM_CD");
        $("#whCd").data("kendoDropDownList").bind("change", itemL.gridReload);

        itemL.global.dropDownDataSource = customKendo.fn_customAjax("/item/smCodeList", {grpSn : "UN", lgCd : "UNIT"});
        customKendo.fn_dropDownList("itemUnitCd", itemL.global.dropDownDataSource, "ITEM_CD_NM", "ITEM_CD");
        $("#itemUnitCd").data("kendoDropDownList").bind("change", itemL.gridReload);

        itemL.global.dropDownDataSource = [
            { text : "품번", value : "ITEM_NO" },
            { text : "품명", value : "ITEM_NAME" },
            { text : "안전재고", value : "SAFETY_INVEN" },
        ]
        customKendo.fn_dropDownList("searchKeyword", itemL.global.dropDownDataSource, "text", "value");
        $("#searchKeyword").data("kendoDropDownList").bind("change", itemL.gridReload);

        customKendo.fn_textBox(["searchValue"]);

        itemL.gridReload();
    },

    mainGrid: function(url, params){
        $("#mainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
            height: 508,
            sortable: true,
            selectable: "row",
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="itemL.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }, {
                    name : 'excel',
                    text: '엑셀다운로드'
                }
            ],
            excel : {
                fileName : "품목정보.xlsx",
                filterable : true
            },
            columns: [
                {
                    title: "순번",
                    template: "#= --record #",
                    width: 50
                }, {
                    title: "품번",
                    field: "ITEM_NO",
                }, {
                    title: "품명",
                    field: "ITEM_NAME",
                }, {
                    title: "단위",
                    field: "ITEM_UNIT_NM",
                    width: 120
                }, {
                    title: "규격",
                    field: "STANDARD",
                }, {
                    title: "창고",
                    field: "WH_CD_NM",
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 3);
            }
        }).data("kendoGrid");

        $("#checkAll").click(function(){
            if($(this).is(":checked")) $("input[name=imSn]").prop("checked", true);
            else $("input[name=imSn]").prop("checked", false);
        });
    },

    gridReload: function (){
        itemL.global.searchAjaxData = {
            whCd : $("#whCd").val(),
            itemUnitCd : $("#itemUnitCd").val(),
            searchItemType : $("#itemType").val(),
            searchKeyword : $("#searchKeyword").val(),
            searchValue : $("#searchValue").val(),
            active : "Y"
        }

        itemL.mainGrid("/item/getItemMasterList.do", itemL.global.searchAjaxData);
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