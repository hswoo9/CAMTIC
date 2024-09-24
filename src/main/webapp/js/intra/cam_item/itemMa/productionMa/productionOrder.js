var po = {

    global : {
        dropDownDataSource : "",
        searchAjaxData : "",
        saveAjaxData : "",
    },

    fn_defaultScript : function (){
        po.global.dropDownDataSource = customKendo.fn_customAjax("/item/smCodeList", {grpSn : "PT", lgCd : "IT"});
        po.global.dropDownDataSource = po.global.dropDownDataSource.filter(element => element.ITEM_CD != "MA");
        customKendo.fn_dropDownList("itemType", po.global.dropDownDataSource, "ITEM_CD_NM", "ITEM_CD");
        $("#itemType").data("kendoDropDownList").bind("change", po.gridReload);

        po.global.dropDownDataSource = customKendo.fn_customAjax("/item/smCodeList", {grpSn : "WC", lgCd : "WH"});
        customKendo.fn_dropDownList("whCd", po.global.dropDownDataSource, "ITEM_CD_NM", "ITEM_CD");
        $("#whCd").data("kendoDropDownList").bind("change", po.gridReload);

        po.global.dropDownDataSource = [
            { text : "품번", value : "ITEM_NO" },
            { text : "품명", value : "ITEM_NAME" },
            { text : "규격", value : "STANDARD" },
        ]
        customKendo.fn_dropDownList("searchKeyword", po.global.dropDownDataSource, "text", "value");
        $("#searchKeyword").data("kendoDropDownList").bind("change", po.gridReload);

        customKendo.fn_textBox(["searchValue"]);

        po.gridReload();
    },

    mainGrid: function(url, params){
        $("#mainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
            height : 508,
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="po.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }, {
                    name : 'excel',
                    text: '엑셀다운로드'
                }
            ],
            excel : {
                fileName : "BOM.xlsx",
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
                    width: 120,
                }, {
                    title: "규격",
                    field: "STANDARD",
                    width: 120
                }, {
                    title: "원가",
                    field: "BOM_COST_PRICE",
                    width: 100,
                    template : function (e){
                        return po.comma(e.BOM_COST_PRICE);
                    },
                    attributes : {
                        style : "text-align : right;"
                    }
                }, {
                    title: "단가",
                    field: "BOM_UNIT_PRICE",
                    width: 100,
                    template : function (e){
                        return po.comma(e.BOM_UNIT_PRICE);
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
                        return po.comma(e.CURRENT_INVEN);
                    },
                    attributes : {
                        style : "text-align : right;"
                    }
                },{
                    title: "BOM조회",
                    width: 80,
                    template: function(e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="po.fn_popBomView(' + e.BOM_SN + ')">' +
                            '	<span class="k-button-text">BOM조회</span>' +
                            '</button>';
                    }
                }, {
                    width: 50,
                    template: function(e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="po.fn_popOutputByBom(this)">' +
                            '	<span class="k-button-text">생산</span>' +
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
        if($("#mainGrid").data("kendoGrid") != null){
            $("#mainGrid").data("kendoGrid").destroy();
        }
        
        po.global.searchAjaxData = {
            whCd : $("#whCd").val(),
            itemType : $("#itemType").val(),
            searchKeyword : $("#searchKeyword").val(),
            searchValue : $("#searchValue").val(),
        }

        po.mainGrid("/item/getBomList.do", po.global.searchAjaxData);
    },

    fn_popBomView : function (e){
        var url = "/item/pop/popBomView.do?bomSn=" + e;
        var name = "_blank";
        var option = "width = 1200, height = 705, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    fn_popOutputByBom : function (e){
        var dataItem = $("#mainGrid").data("kendoGrid").dataItem($(e).closest("tr"));
        var result = po.getInvenChk(dataItem.BOM_SN);
        if(result.message != null && result.message != ""){
            alert("생산 불가능한 품목입니다.\n\n" + result.message);
            if(result.whCd != null && result.error == null){
                var url = "/item/pop/popOutputByBom.do?bomSn=" + dataItem.BOM_SN + "&outputCnt=1";
                var name = "_blank";
                var option = "width = 1055, height = 600, top = 100, left = 400, location = no"
                var popup = window.open(url, name, option);
            }
        }else if(result.success == "200"){
            if(confirm("헤딩 품목을 생산하시겠습니까?")){
                po.global.saveAjaxData = {
                    bomSn : dataItem.BOM_SN,
                    masterSn : dataItem.MASTER_SN,
                    whCd : dataItem.WH_CD,
                    bomUnitPrice : dataItem.BOM_UNIT_PRICE,
                    empSeq : $("#regEmpSeq").val(),
                    outputCnt : "1",
                }

                var result = customKendo.fn_customAjax("/item/setOutput.do", po.global.saveAjaxData);
                if(result.flag){
                    alert("처리되었습니다.");
                    po.gridReload();
                }
            }
        }
    },

    getInvenChk : function(e){
        var result = "";
        po.global.searchAjaxData = {
            bomSn : e
        }

        var rs = customKendo.fn_customAjax("/item/getInvenChk.do", po.global.searchAjaxData);
        if(rs.flag){
            result = rs.rs;
        }

        return result;
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
                po.gridReload();
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

    fn_popBomView : function (e){
        var url = "/item/pop/popBomView.do?bomSn=" + e;
        var name = "_blank";
        var option = "width = 1200, height = 705, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
    },
}