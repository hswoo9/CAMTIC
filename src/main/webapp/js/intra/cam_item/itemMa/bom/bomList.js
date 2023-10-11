var bomList = {

    global : {
        dropDownDataSource : "",
        searchAjaxData : "",
        saveAjaxData : "",
    },

    fn_defaultScript : function (){
        bomList.global.dropDownDataSource = customKendo.fn_customAjax("/item/smCodeList", {grpSn : "WC", lgCd : "WH"});
        customKendo.fn_dropDownList("whCd", bomList.global.dropDownDataSource, "ITEM_CD_NM", "ITEM_CD");
        $("#whCd").data("kendoDropDownList").bind("change", bomList.gridReload);

        bomList.global.dropDownDataSource = [
            { text : "품번", value : "BOM_NO" },
            { text : "품명", value : "BOM_NAME" },
            { text : "규격", value : "STANDARD" },
        ]
        customKendo.fn_dropDownList("searchKeyword", bomList.global.dropDownDataSource, "text", "value");
        $("#searchKeyword").data("kendoDropDownList").bind("change", bomList.gridReload);

        customKendo.fn_textBox(["searchValue"]);

        bomList.gridReload();
    },

    mainGrid: function(url, params){
        $("#mainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
            height : 508,
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="bomList.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="bomList.setBomDel()">' +
                            '	<span class="k-button-text">삭제</span>' +
                            '</button>';
                    }
                }, {
                    name : 'excel',
                    text: '엑셀다운로드'
                }
            ],
            excel : {
                fileName : "재고현황.xlsx",
                filterable : true
            },
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" style="top: 3px; position: relative" />',
                    template : "<input type='checkbox' id='bomSn#=BOM_SN#' name='bomSn' value='#=BOM_SN#' style=\"top: 3px; position: relative\" />",
                    width: 30,
                }, {
                    title: "순번",
                    template: "#= --record #",
                    width: 30
                }, {
                    title: "품번",
                    field: "BOM_NO",
                    width: 180,
                }, {
                    title: "품명",
                    field: "BOM_NAME",
                    width: 180,
                }, {
                    title: "규격",
                    field: "STANDARD",
                    width: 150
                }, {
                    title: "원가",
                    field: "BOM_COST_PRICE",
                    width: 100,
                    template : function (e){
                        return bomList.comma(e.BOM_COST_PRICE);
                    },
                    attributes : {
                        style : "text-align : right;"
                    }
                }, {
                    title: "단가",
                    field: "BOM_UNIT_PRICE",
                    width: 100,
                    template : function (e){
                        return bomList.comma(e.BOM_UNIT_PRICE);
                    },
                    attributes : {
                        style : "text-align : right;"
                    }
                }, {
                    title: "기본입고창고",
                    field: "WH_CD_NM",
                    width: 120
                }, {
                    title: "현재재고",
                    field: "CURRENT_INVEN",
                    width: 100,
                    template : function (e){
                        return bomList.comma(e.CURRENT_INVEN);
                    },
                    attributes : {
                        style : "text-align : right;"
                    }
                }, {
                    title: "BOM조회",
                    width: 80,
                    template: function(e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="bomList.fn_popBomView(' + e.BOM_SN + ')">' +
                            '	<span class="k-button-text">BOM조회</span>' +
                            '</button>';
                    }
                }, {
                    title: "제작",
                    width: 50,
                    template: function(e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="bomList.fn_popBomView(' + e.BOM_SN + ')">' +
                            '	<span class="k-button-text">제작</span>' +
                            '</button>';
                    }
                }

            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 3);
            }
        }).data("kendoGrid");

        $("#checkAll").click(function(){
            if($(this).is(":checked")) $("input[name=bomSn]").prop("checked", true);
            else $("input[name=bomSn]").prop("checked", false);
        });
    },

    gridReload: function (){
        bomList.global.searchAjaxData = {
            searchKeyword : $("#searchKeyword").val(),
            searchValue : $("#searchValue").val(),
        }

        bomList.mainGrid("/item/getBomList.do", bomList.global.searchAjaxData);
    },

    fn_popBomView : function (e){
        var url = "/item/pop/popBomView.do?bomSn=" + e;
        var name = "_blank";
        var option = "width = 855, height = 660, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    setBomDel : function(){
        if($("input[name='bomSn']:checked").length == 0){
            alert("삭제할 항목을 선택해주세요.");
            return;
        }

        if(confirm("삭제하시겠습니까?\n삭제한 데이터는 복구 할 수 없습니다.")){
            var bomSn = "";

            $.each($("input[name='bomSn']:checked"), function(){
                bomSn += "," + $(this).val()
            })

            ciupR.global.saveAjaxData = {
                bomSn : bomSn.substring(1),
            }

            var result = customKendo.fn_customAjax("/item/setBomDel.do", ciupR.global.saveAjaxData);
            if(result.flag){
                alert("처리되었습니다.");
                bomList.gridReload();
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