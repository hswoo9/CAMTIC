var popItemNoList = {
    global : {
        dropDownDataSource : "",
        searchAjaxData : "",
    },

    fn_defaultScript: function (){
        popItemNoList.global.dropDownDataSource = customKendo.fn_customAjax("/item/smCodeList", {grpSn : "WC", lgCd : "WH"});
        customKendo.fn_dropDownList("whCd", popItemNoList.global.dropDownDataSource, "ITEM_CD_NM", "ITEM_CD");
        $("#whCd").data("kendoDropDownList").bind("change", popItemNoList.gridReload);

        if($("#itemType").val()){
            if($("#itemType").val() == "PR"){
                $("#whCd").data("kendoDropDownList").value("SM");
                $("#whCd").data("kendoDropDownList").enable(false);
            }else if($("#itemType").val() == "SM"){
                popItemNoList.global.dropDownDataSource = popItemNoList.global.dropDownDataSource.filter(element => element.ITEM_CD != "SM" && element.ITEM_CD != "PR" && element.ITEM_CD != "")
                customKendo.fn_dropDownList("whCd", popItemNoList.global.dropDownDataSource, "ITEM_CD_NM", "ITEM_CD");
                $("#whCd").data("kendoDropDownList").bind("change", popItemNoList.gridReload);
            }
        }

        //popItemNoList.global.dropDownDataSource = customKendo.fn_customAjax("/item/smCodeList", {grpSn : "UN", lgCd : "UNIT"});
        // customKendo.fn_dropDownList("itemUnitCd", popItemNoList.global.dropDownDataSource, "ITEM_CD_NM", "ITEM_CD");
        // $("#itemUnitCd").data("kendoDropDownList").bind("change", popItemNoList.gridReload);

        popItemNoList.global.dropDownDataSource = [
            { text : "품번", value : "ITEM_NO" },
            { text : "품명", value : "ITEM_NAME" },
        ]
        customKendo.fn_dropDownList("searchKeyword", popItemNoList.global.dropDownDataSource, "text", "value");
        $("#searchKeyword").data("kendoDropDownList").bind("change", popItemNoList.gridReload);

        customKendo.fn_textBox(["searchValue"]);

        popItemNoList.gridReload();
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
            toolbar : [
                {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="popItemNoList.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }
            ],
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAllC" name="checkAllC" onclick="fn_checkAll(\'checkAllC\', \'masterSnPk\');"/>',
                    template : "<input type='checkbox' name='masterSnPk' class='masterSnPk' value='#=MASTER_SN#'/>",
                    width: 50
                }, {
                    title: "순번",
                    template: "#= --record #",
                    width: 50
                }, {
                    title: "품번",
                    field: "ITEM_NO",
                    width: 150
                }, {
                    title: "품명",
                    field: "ITEM_NAME",
                    width: 150
                }, {
                    title: "품목구분",
                    field: "ITEM_TYPE_NM",
                    width: 150
                }, {
                    title: "규격",
                    field: "STANDARD",
                    width: 80
                }, {
                    title: "단위",
                    field: "ITEM_UNIT_NM",
                    width: 80
                }, {
                    title: "창고",
                    field: "WH_CD_NM",
                    width: 100
                },{
                    title: "현재재고",
                    field: "OVERALL_INVEN",
                    width: 100,
                    template : function (e){
                        if(e.OVERALL_INVEN != null && e.OVERALL_INVEN != ""){
                            return popItemNoList.comma(e.OVERALL_INVEN);
                        }else{
                            return "0";
                        }
                    },
                    attributes : {
                        style : "text-align : right;"
                    }
                }, {
                    title: "안전재고",
                    field: "SAFETY_INVEN",
                    width: 100,
                    template : function (e){
                        if(e.SAFETY_INVEN != null && e.SAFETY_INVEN != ""){
                            return popItemNoList.comma(e.SAFETY_INVEN) + "";
                        }else{
                            return "0";
                        }
                    },
                    attributes : {
                        style : "text-align : right;"
                    }
                }
                // , {
                //     title: "",
                //     template: function(e){
                //         return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-info" onclick="popItemNoList.fn_selItem(' + e.MASTER_SN + ')">선택</button>';
                //     },
                //     width: 60
                // }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 3);
            }
        }).data("kendoGrid");
    },

    gridReload: function (){
        popItemNoList.global.searchAjaxData = {
            whCd : $("#whCd").val(),
            itemType : $("#itemType").val(),
            searchKeyword : $("#searchKeyword").val(),
            searchValue : $("#searchValue").val(),
            active : "Y",
            target : $("#target").val(),
            crmSn : $("#crmSn").val(),
        }

        popItemNoList.popMainGrid("/item/getItemMasterList.do", popItemNoList.global.searchAjaxData);
    },

    fn_selItem: function (e){

        $(".masterSnPk").each(function(){
            var data= {
                masterSn : this.value
            }

            var result = customKendo.fn_customAjax("/item/getItemMaster.do", data);
            if(result.flag){
                var rs = result.rs;
                console.log(rs);
                if(rs != null){
                    opener.parent.$("#masterSn").val(rs.MASTER_SN);
                    opener.parent.$("#itemNo").val(rs.ITEM_NO);
                    opener.parent.$("#itemName").val(rs.ITEM_NAME);
                    opener.parent.$("#itemCdName").val(rs.ITEM_TYPE_NM);
                    opener.parent.$("#baseWhCd").val(rs.WH_CD);
                    opener.parent.$("#whCdNm").val(rs.WH_CD_NM);
                    opener.parent.$("#standard").val(rs.STANDARD);
                    opener.parent.$("#itemType").val(rs.ITEM_TYPE);
                    opener.parent.$("#maxUnitPrice").val(rs.MAX_UNIT_PRICE);

                    opener.parent.oor.global.masterSnIndex = opener.parent.$("#listTb").find("tr").length - 1;
                    opener.parent.$("#masterSn").change();

                    opener.parent.oor.addRow('new');
                }

                // window.close();

            }
        });


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