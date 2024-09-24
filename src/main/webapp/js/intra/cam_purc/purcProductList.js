var prdList = {

    global : {
        dropDownDataSource : "",
        searchAjaxData : "",
        saveAjaxData : "",
    },

    fn_defaultScript : function (){

        prdList.global.dropDownDataSource = [
            { text: "구매", value: "1"},
        ]

        let productsDataSource = customKendo.fn_customAjax("/system/commonCodeManagement/getCmCodeList", {cmGroupCodeId: "38"});
        customKendo.fn_dropDownList("purcItemType0", productsDataSource, "CM_CODE_NM", "CM_CODE");

        let productADataSource = customKendo.fn_customAjax("/projectMng/getProductCodeInfo", {productGroupCodeId: 1}).list;
        customKendo.fn_dropDownList("productA0", productADataSource, "PRODUCT_DT_CODE_NM", "PRODUCT_DT_CODE");


        // $(".productB, .productC").kendoDropDownList({
        //     dataSource : [
        //         {text : "전체", value : ""},
        //     ],
        //     dataTextField : "text",
        //     dataValueField : "value"
        // });
        $(".productA").each(function(){
            var productId = $(this).attr("id");

            if(productId != null){
                prdList.fn_productCodeSetting(productId);
            }
        });

        prdList.global.dropDownDataSource = [
            { text: "품명", value: "PURC_ITEM_NAME" },
            { text: "단위", value: "PURC_ITEM_UNIT" },
            { text: "규격", value: "PURC_ITEM_STD" },
            { text: "구매업체", value: "CRM_NM" },
        ]

        customKendo.fn_dropDownList("searchKeyword", prdList.global.dropDownDataSource, "text", "value");
        customKendo.fn_textBox(["searchValue"]);
        prdList.gridReload();
    },

    mainGrid: function(url, params){
        $("#mainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
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
                    name : 'excel',
                    text: '엑셀다운로드'
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="prdList.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }
            ],
            excel : {
                fileName : "구매품목 목록.xlsx",
                filterable : true
            },
            excelExport: exportGrid,
            columns: [
                {
                    title: "번호",
                    width: 50,
                    template: "#= --record #"
                }, {
                    field: "PURC_ITEM_TYPE",
                    title: "분류코드",
                    width: 100,
                    template: function (e){
                        if(e.PURC_ITEM_TYPE == "P"){
                            return "구매";
                        } else if (e.PURC_ITEM_TYPE == "O"){
                            return "외주";
                        } else if(e.PURC_ITEM_TYPE == "C"){
                            return "시설 · 공사";
                        } else if(e.PURC_ITEM_TYPE == "L"){
                            return "리스";
                        } else {
                            return "";
                        }
                    }
                }, {
                    field: "PD_A",
                    title: "구매구분(대분류)",
                    width: 100
                }, {
                    field: "PURC_ITEM_NAME",
                    title: "품명",
                    width: 150
                }, {
                    field: "CRM_NM",
                    title: "구매업체",
                    width: 100
                }, {
                    field: "PURC_ITEM_STD",
                    title: "규격",
                    width: 100,
                }, {
                    field: "PURC_ITEM_UNIT",
                    title: "단위",
                    width: 100,
                }, {
                    field: "PURC_ITEM_UNIT_PRICE",
                    title: "단가",
                    width: 100,
                    template : function(e){
                        return '<div style="text-align: right">'+comma(e.PURC_ITEM_UNIT_PRICE)+' 원</div>'
                    }
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },

    gridReload: function (){
        if($("#mainGrid").data("kendoGrid") != null){
            $("#mainGrid").data("kendoGrid").destroy();
        }

        prdList.global.searchAjaxData = {
            empSeq : $("#myEmpSeq").val(),
            purcItemType : $("#purcItemType0").val(),
            productA : $("#productA0").val(),
            // productB : $("#productB0").val(),
            // productC : $("#productC0").val(),
            searchKeyword : $("#searchKeyword").val(),
            searchValue : $("#searchValue").val()
        }

        prdList.mainGrid("/purc/getPurcProductList", prdList.global.searchAjaxData);
    },

    fn_reqRegPopup : function (key){
        var url = "/purc/pop/regPurcReqPop.do";
        if(key != null && key != ""){
            url = "/purc/pop/regPurcReqPop.do?purcSn=" + key;
        }
        var name = "blank";
        var option = "width = 1820, height = 820, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
    },


    fn_productCodeSetting : function (productId){
        // var i = productId.slice(-1);
        //
        // $("#productA" + i).bind("change", function(){
        //     if($("#productA" + i).data("kendoDropDownList").value() == ""){
        //         return;
        //     }
        //     $("#productB" +  i).val("");
        //     let data = {
        //         productGroupCodeId: 2,
        //         parentCodeId: $("#productA" + i).data("kendoDropDownList").value(),
        //         parentCodeName: $("#productA" + i).data("kendoDropDownList").text(),
        //     }
        //     let productBDataSource = customKendo.fn_customAjax("/projectMng/getProductCodeInfo", data).list;
        //     customKendo.fn_dropDownList("productB" + i, productBDataSource, "PRODUCT_DT_CODE_NM", "PRODUCT_DT_CODE");
        // });
        //
        // $("#productB" + i).bind("change", function(){
        //     if($("#productB" + i).data("kendoDropDownList").value() == ""){
        //         return;
        //     }
        //     $("#productC" + i).val("");
        //     let data = {
        //         productGroupCodeId: 3,
        //         parentCodeId: $("#productB" + i).data("kendoDropDownList").value(),
        //         parentCodeName: $("#productB" + i).data("kendoDropDownList").text(),
        //     }
        //     let productCDataSource = customKendo.fn_customAjax("/projectMng/getProductCodeInfo", data).list;
        //     customKendo.fn_dropDownList("productC" + i, productCDataSource, "PRODUCT_DT_CODE_NM", "PRODUCT_DT_CODE");
        // });
    },
}