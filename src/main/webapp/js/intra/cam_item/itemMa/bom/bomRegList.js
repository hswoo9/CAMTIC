var bomRegList = {

    global : {
        dropDownDataSource : "",
        searchAjaxData : "",
        saveAjaxData : "",
    },

    fn_defaultScript : function (){
        bomRegList.global.dropDownDataSource = [
            { text : "품번", value : "ITEM_NO" },
            { text : "품명", value : "ITEM_NAME" },
            { text : "단가", value : "ITEM_UNIT_PRICE" },
        ]
        customKendo.fn_dropDownList("searchKeyword", bomRegList.global.dropDownDataSource, "text", "value");
        $("#searchKeyword").data("kendoDropDownList").bind("change", bomRegList.gridReload);

        customKendo.fn_textBox(["searchValue"]);

        bomRegList.gridReload();
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="bomRegList.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="bomRegList.fn_popBomReg()">' +
                            '	<span class="k-button-text">등록</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="bomRegList.setBomDel()">' +
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
                    title: "규격",
                    field: "STANDARD",
                    width: 150
                }, {
                    title: "재고",
                    field: "CURRENT_INVEN",
                    width: 100,
                    template : function (e){
                        return bomRegList.comma(e.CURRENT_INVEN);
                    },
                    attributes : {
                        style : "text-align : right;"
                    }
                }, {
                    title: "입고",
                    field: "RECEIVING_INVEN",
                    width: 100,
                    template : function (e){
                        return bomRegList.comma(e.RECEIVING_INVEN);
                    },
                    attributes : {
                        style : "text-align : right;"
                    }
                }, {
                    title: "출고",
                    width: 100,
                    field: "FORWARDING_INVEN",
                    template : function (e){
                        return bomRegList.comma(e.FORWARDING_INVEN);
                    },
                    attributes : {
                        style : "text-align : right;"
                    }
                }, {
                    title: "재고조정",
                    width: 100,
                    field: "INVEN_AJM",
                    template : function (e){
                        return bomRegList.comma(e.INVEN_AJM);
                    },
                    attributes : {
                        style : "text-align : right;"
                    }
                }, {
                    title: "단가",
                    width: 100,
                    field: "UNIT_PRICE",
                    template: function(e){
                        return bomRegList.comma(e.UNIT_PRICE) + "원";
                    },
                    attributes : {
                        style : "text-align : right;"
                    }
                }, {
                    title: "재고금액",
                    width: 100,
                    field: "INVEN_AMT",
                    template: function(e){
                        return bomRegList.comma(e.INVEN_AMT) + "원";
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
            if($(this).is(":checked")) $("input[name=bomSn]").prop("checked", true);
            else $("input[name=bomSn]").prop("checked", false);
        });
    },

    gridReload: function (){
        bomRegList.global.searchAjaxData = {
            searchKeyword : $("#searchKeyword").val(),
            searchValue : $("#searchValue").val(),
        }

        bomRegList.mainGrid("/item/getBomList.do", bomRegList.global.searchAjaxData);
    },

    fn_popBomReg : function (){
        var url = "/item/pop/popBomReg.do";
        var name = "_blank";
        var option = "width = 855, height = 600, top = 100, left = 400, location = no"
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
                bomRegList.gridReload();
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