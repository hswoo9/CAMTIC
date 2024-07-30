var supM = {

    global : {
        dropDownDataSource : "",
        searchAjaxData : "",
        saveAjaxData : "",
    },

    fn_defaultScript : function (){
        supM.global.dropDownDataSource = [
            { text : "품번", value : "ITEM_NO" },
            { text : "품명", value : "ITEM_NAME" },
            { text : "규격", value : "STANDARD" },
            { text : "안전재고", value : "SAFETY_INVEN" },
        ]
        customKendo.fn_dropDownList("searchKeyword", supM.global.dropDownDataSource, "text", "value");
        $("#searchKeyword").data("kendoDropDownList").bind("change", supM.gridReload);

        customKendo.fn_textBox(["searchValue"]);

        supM.gridReload();
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
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="supM.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }, {
                    name : 'excel',
                    text: '엑셀다운로드'
                }
            ],
            excel : {
                fileName : "구매검수 목록.xlsx",
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
                    width: 120,
                }, {
                    title: "품명",
                    field: "ITEM_NAME",
                    width: 100
                }, {
                    title: "적용시작일자",
                    field: "START_DT",
                    width: 100
                }, {
                    title: "적용종료일자",
                    field: "END_DT",
                    width: 100
                }, {
                    title: "변경차수",
                    field: "CHANGE_NUM",
                    width: 100,
                }, {
                    title: "단가",
                    width: 100,
                    field: "UNIT_PRICE",
                    template : function (e){
                        if(e.MSU_UNIT_PRICE != null && e.MSU_UNIT_PRICE != ""){
                            return supM.comma(e.MSU_UNIT_PRICE) + "원";
                        }else{
                            return "0원";
                        }
                    },
                    attributes : {
                        style : "text-align : right;"
                    }
                }, {
                    title: "등록자",
                    width: 100,
                    field: "REG_EMP_NAME",
                }, {
                    title: "수정자",
                    width: 100,
                    field: "MOD_EMP_NAME",
                }, {
                    title: "단가관리",
                    width: 80,
                    template: function(e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="supM.fn_popStandardUnitPriceReg(' + e.MASTER_SN + ')">' +
                            '	<span class="k-button-text">단가관리</span>' +
                            '</button>';
                    }
                }

            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 3);
            }
        }).data("kendoGrid");

        $("#checkAll").click(function(){
            if($(this).is(":checked")) $("input[name=masterSn]").prop("checked", true);
            else $("input[name=masterSn]").prop("checked", false);
        });
    },

    gridReload: function (){
        supM.global.searchAjaxData = {
            masterSn : $("#masterSn").val(),
            searchKeyword : $("#searchKeyword").val(),
            searchValue : $("#searchValue").val(),
        }

        supM.mainGrid("/item/getItemStandardUnitPriceList.do", supM.global.searchAjaxData);
    },

    fn_popItemNoList : function (){
        var url = "/item/pop/popItemNoList.do";
        var name = "_blank";
        var option = "width = 1300, height = 670, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    masterSnReset : function(){
        $("#masterSn").val("");
        $("#itemNo").val("");
        $("#itemName").val("");
        supM.gridReload()
    },

    fn_popStandardUnitPriceReg : function (e){
        var url = "/item/pop/popStandardUnitPriceReg.do?masterSn=" + e;
        var name = "_blank";
        var option = "width = 785, height = 670, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
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