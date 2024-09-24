var itemM = {

    global : {
        dropDownDataSource : "",
        searchAjaxData : "",
        saveAjaxData : "",
    },

    fn_defaultScript : function (){
        itemM.global.dropDownDataSource = customKendo.fn_customAjax("/item/smCodeList", {grpSn : "PT", lgCd : "IT"});
        customKendo.fn_dropDownList("itemType", itemM.global.dropDownDataSource, "ITEM_CD_NM", "ITEM_CD");
        $("#itemType").data("kendoDropDownList").bind("change", itemM.gridReload);

        itemM.global.dropDownDataSource = customKendo.fn_customAjax("/item/smCodeList", {grpSn : "WC", lgCd : "WH"});
        customKendo.fn_dropDownList("whCd", itemM.global.dropDownDataSource, "ITEM_CD_NM", "ITEM_CD");
        $("#whCd").data("kendoDropDownList").bind("change", itemM.gridReload);

        itemM.global.dropDownDataSource = customKendo.fn_customAjax("/item/smCodeList", {grpSn : "UN", lgCd : "UNIT"});
        customKendo.fn_dropDownList("itemUnitCd", itemM.global.dropDownDataSource, "ITEM_CD_NM", "ITEM_CD");
        $("#itemUnitCd").data("kendoDropDownList").bind("change", itemM.gridReload);

        itemM.global.dropDownDataSource = [
            { text : "품번", value : "ITEM_NO" },
            { text : "품명", value : "ITEM_NAME" },
            { text : "안전재고", value : "SAFETY_INVEN" },
        ]
        customKendo.fn_dropDownList("searchKeyword", itemM.global.dropDownDataSource, "text", "value");
        $("#searchKeyword").data("kendoDropDownList").bind("change", itemM.gridReload);

        customKendo.fn_textBox(["searchValue"]);

        itemM.gridReload();
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="itemM.fn_popItemNoReg()">' +
                            '	<span class="k-button-text">품번등록</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="itemM.setItemMasterDel()">' +
                            '	<span class="k-button-text">삭제</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="itemM.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }, {
                    name : 'excel',
                    text: '엑셀다운로드'
                }
            ],
            excel : {
                fileName : "품목마스터.xlsx",
                filterable : true
            },
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" style="top: 3px; position: relative" />',
                    template : "<input type='checkbox' id='imSn#=MASTER_SN#' name='imSn' value='#=MASTER_SN#' style=\"top: 3px; position: relative\" />",
                    width: 30,
                }, {
                    title: "순번",
                    template: "#= --record #",
                    width: 50
                }, {
                    title: "품번",
                    field: "ITEM_NO",
                    template : function(e){
                        return '<a class="title" onclick="itemM.fn_popItemNoReg(' + e.MASTER_SN + ')" style="cursor: pointer;">' + e.ITEM_NO + '</a>'
                    }
                }, {
                    title: "품명",
                    field: "ITEM_NAME",
                    template : function(e){
                        return '<a class="title" onclick="itemM.fn_popItemNoReg(' + e.MASTER_SN + ')" style="cursor: pointer;">' + e.ITEM_NAME + '</a>'
                    }
                }, {
                    title: "단위",
                    field: "ITEM_UNIT_NM",
                    width: 80
                }, {
                    title: "규격",
                    field: "STANDARD",
                }, {
                    title: "품목구분",
                    field: "ITEM_TYPE_NM",
                    width: 100
                }, {
                    title: "입고창고",
                    field: "WH_CD_NM",
                    width: 100
                }, {
                    title: "사용여부",
                    field: "ACTIVE",
                    width: 100,
                    template : function (e){
                        if(e.ACTIVE == "Y"){
                            return "사용"
                        }else{
                            return "미사용"
                        }
                    },
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
        if($("#mainGrid").data("kendoGrid") != null){
            $("#mainGrid").data("kendoGrid").destroy();
        }
        
        itemM.global.searchAjaxData = {
            whCd : $("#whCd").val(),
            itemUnitCd : $("#itemUnitCd").val(),
            searchItemType : $("#itemType").val(),
            searchKeyword : $("#searchKeyword").val(),
            searchValue : $("#searchValue").val(),
        }

        itemM.mainGrid("/item/getItemMasterList.do", itemM.global.searchAjaxData);
    },

    fn_popItemNoReg : function (e){
        var url = "/item/pop/itemNoReg.do";
        if(e != null){
            url += "?masterSn=" + e
        }
        var name = "_blank";
        var option = "width = 1280, height = 565, top = 200, left = 400, location = no"
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

            itemM.global.saveAjaxData = {
                masterSn : masterSn.substring(1),
            }

            var result = customKendo.fn_customAjax("/item/setItemMasterDel.do", itemM.global.saveAjaxData);
            if(result.flag){
                alert("처리되었습니다.");
                itemM.gridReload();
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