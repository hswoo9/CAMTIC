var cupm = {

    global : {
        dropDownDataSource : "",
        searchAjaxData : "",
        saveAjaxData : "",
    },

    fn_defaultScript : function (){
        cupm.global.dropDownDataSource = [
            { text : "품번", value : "ITEM_NO" },
            { text : "품명", value : "ITEM_NAME" },
            { text : "규격", value : "STANDARD" },
            { text : "안전재고", value : "SAFETY_INVEN" },
        ]
        customKendo.fn_dropDownList("searchKeyword", cupm.global.dropDownDataSource, "text", "value");
        $("#searchKeyword").data("kendoDropDownList").bind("change", cupm.gridReload);

        customKendo.fn_textBox(["searchValue"]);

        cupm.gridReload("load");
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="cupm.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }, {
                    name : 'excel',
                    text: '엑셀다운로드'
                }
            ],
            excel : {
                fileName : "자재단가관리.xlsx",
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
                    width: 180,
                }, {
                    title: "품명",
                    field: "ITEM_NAME",
                    width: 180
                }, {
                    title: "규격",
                    field: "STANDARD",
                    width: 180
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
                    template : function(e){
                        if(e.CHANGE_NUM != null){
                            return e.CHANGE_NUM;
                        }else{
                            return '1';
                        }
                    }
                }, {
                    title: "단가",
                    field: "UNIT_PRICE",
                    width: 100,
                    template : function (e){
                        if(e.CIU_UNIT_PRICE != null && e.CIU_UNIT_PRICE != ""){
                            return cupm.comma(e.CIU_UNIT_PRICE);
                        }else{
                            if(e.MSU_UNIT_PRICE != null && e.MSU_UNIT_PRICE != ""){
                                return cupm.comma(e.MSU_UNIT_PRICE);
                            }else{
                                return "";
                            }
                        }

                    },
                    attributes : {
                        style : "text-align : right;"
                    }
                }, {
                    title: "B2B단가",
                    field: "B2B_PRICE",
                    width: 100,
                    template : function (e){
                        if(e.CIU_B2B_PRICE != null && e.CIU_B2B_PRICE != ""){
                            return cupm.comma(e.CIU_B2B_PRICE);
                        }else{
                            if(e.MSU_B2B_PRICE != null && e.MSU_B2B_PRICE != ""){
                                return cupm.comma(e.MSU_B2B_PRICE);
                            }else{
                                return "";
                            }
                        }

                    },
                    attributes : {
                        style : "text-align : right;"
                    }
                }, {
                    title: "비고",
                    field: "RMK",
                    width : 300
                }, {
                    title: "단가관리",
                    width: 100,
                    template: function(e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="cupm.fn_popCrmItemUnitPriceReg(this)">' +
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
            if($(this).is(":checked")) $("input[name=crmSn]").prop("checked", true);
            else $("input[name=crmSn]").prop("checked", false);
        });
    },

    gridReload: function (e){
        var url = "";
        if(!$("#crmSn").val() && e != "load"){
            alert("업체를 선택해주세요");
            return;
        }else if($("#crmSn").val()){
            url = "/item/getMaterialUnitPriceList.do";
        }

        cupm.global.searchAjaxData = {
            crmSn : $("#crmSn").val(),
            busClass : "R",
            searchKeyword : $("#searchKeyword").val(),
            searchValue : $("#searchValue").val(),
        }

        cupm.mainGrid(url, cupm.global.searchAjaxData);
    },

    comma: function(str) {
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    },

    uncomma: function(str) {
        str = String(str);
        return str.replace(/[^\d]+/g, '');
    },

    fn_popCamCrmList : function (){
        var url = "/crm/pop/popCrmList.do";
        var name = "_blank";
        var option = "width = 1300, height = 670, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    crmSnReset : function(){
        $("#crmSn").val("");
        $("#crmNm").val("");
        cupm.gridReload()
    },

    fn_popCrmItemUnitPriceReg : function (e){
        var dataItem = $("#mainGrid").data("kendoGrid").dataItem($(e).closest("tr"));
        var url = "/item/pop/popCrmItemUnitPriceReg.do?crmSn=" + $("#crmSn").val() + "&crmItemSn=" + (dataItem.CRM_ITEM_SN == null ? "" : dataItem.CRM_ITEM_SN) + "&masterSn=" + dataItem.MASTER_SN + "&busClass=R";
        var name = "_blank";
        var option = "width = 785, height = 670, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
    },
}

function gridReload(){
    cupm.gridReload();
}