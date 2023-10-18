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
                pageSizes: [ 10, 20, 30, 50, 100 ],
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
                    // template : function(e){
                    //     return '<a class="title" onclick="itemL.fn_popItemNoReg(' + e.MASTER_SN + ')" style="cursor: pointer;">' + e.ITEM_NO + '</a>'
                    // }
                }, {
                    title: "품명",
                    field: "ITEM_NAME",
                    // template : function(e){
                    //     return '<a class="title" onclick="itemL.fn_popItemNoReg(' + e.MASTER_SN + ')" style="cursor: pointer;">' + e.ITEM_NAME + '</a>'
                    // }
                }, {
                    title: "규격",
                    field: "STANDARD",
                }, {
                    title: "단위",
                    field: "ITEM_UNIT_NM",
                    width: 80
                }, {
                    title: "창고",
                    field: "WH_CD_NM",
                    width: 100
                }, {
                    title: "안전재고",
                    field: "SAFETY_INVEN",
                    width: 100,
                    template : function (e){
                        if(e.SAFETY_INVEN != null && e.SAFETY_INVEN != ""){
                            return itemL.comma(e.SAFETY_INVEN) + "";
                        }else{
                            return "0";
                        }
                    },
                    attributes : {
                        style : "text-align : right;"
                    }
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

    fn_popItemNoReg : function (e){
        var url = "/item/pop/itemNoReg.do";
        if(e != null){
            url += "?masterSn=" + e
        }
        var name = "_blank";
        var option = "width = 920, height = 310, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    setItemMasterDel : function(){
        if($("input[name='imSn']:checked").length == 0){
            alert("삭제할 항목을 선택해주세요.");
            return;
        }

        if(confirm("삭제하시겠습니까?\n삭제한 데이터는 복구 할 수 없습니다.")){
            var masterSn = "";

            $.each($("input[name='imSn']:checked"), function(){
                masterSn += "," + $(this).val()
            })

            itemL.global.saveAjaxData = {
                masterSn : masterSn.substring(1),
            }

            var result = customKendo.fn_customAjax("/item/setItemMasterDel.do", itemL.global.saveAjaxData);
            if(result.flag){
                alert("처리되었습니다.");
                itemL.gridReload();
            }
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