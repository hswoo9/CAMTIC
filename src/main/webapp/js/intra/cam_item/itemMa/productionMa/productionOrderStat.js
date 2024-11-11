var pos = {

    global : {
        dropDownDataSource : "",
        searchAjaxData : "",
        saveAjaxData : "",
    },

    fn_defaultScript : function (){
        pos.global.dropDownDataSource = customKendo.fn_customAjax("/item/smCodeList", {grpSn : "PT", lgCd : "IT"});
        pos.global.dropDownDataSource = pos.global.dropDownDataSource.filter(element => element.ITEM_CD != "MA");
        customKendo.fn_dropDownList("itemType", pos.global.dropDownDataSource, "ITEM_CD_NM", "ITEM_CD");
        $("#itemType").data("kendoDropDownList").bind("change", pos.gridReload);

        pos.global.dropDownDataSource = customKendo.fn_customAjax("/item/smCodeList", {grpSn : "WC", lgCd : "WH"});
        customKendo.fn_dropDownList("whCd", pos.global.dropDownDataSource, "ITEM_CD_NM", "ITEM_CD");
        $("#whCd").data("kendoDropDownList").bind("change", pos.gridReload);

        pos.global.dropDownDataSource = [
            { text : "품번", value : "ITEM_NO" },
            { text : "품명", value : "ITEM_NAME" },
            { text : "규격", value : "STANDARD" },
        ]
        customKendo.fn_dropDownList("searchKeyword", pos.global.dropDownDataSource, "text", "value");
        $("#searchKeyword").data("kendoDropDownList").bind("change", pos.gridReload);

        customKendo.fn_textBox(["searchValue"]);

        pos.gridReload();
    },

    mainGrid: function(){
        const dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : "/item/getBomOutputHistory.do",
                    dataType : "json",
                    type : "post",
                    async : false
                },
                parameterMap: function(data){
                    data.whCd = $("#whCd").val();
                    data.itemType = $("#itemType").val();
                    data.searchKeyword = $("#searchKeyword").val();
                    data.searchValue = $("#searchValue").val();
                    
                    return data;
                }
            },
            schema : {
                data: function (data) {
                    return data.list;
                },
                total: function (data) {
                    return data.list.length;
                },
            },
            page: 1,
            pageSizes: "ALL",
        });

        $("#mainGrid").kendoGrid({
            dataSource: dataSource,
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="pos.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }, {
                    name : 'excel',
                    text: '엑셀다운로드'
                }
            ],
            excel : {
                fileName : "생산이력.xlsx",
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
                    width: 120,
                }, {
                    title: "품목구분",
                    field: "ITEM_TYPE_NM",
                    width: 120
                }, {
                    title: "생산량",
                    field: "OUTPUT_CNT",
                    template : function (e){
                        if(e.OUTPUT_CNT != null && e.OUTPUT_CNT != ""){
                            return pos.comma(e.OUTPUT_CNT) + "";
                        }else{
                            return "0";
                        }
                    },
                    attributes : {
                        style : "text-align : right;"
                    },
                    width: 150
                }, {
                    title: "입고창고",
                    field: "WH_CD_NM",
                    width: 150
                }, {
                    title: "생산자",
                    field: "EMP_NAME_KR",
                    width: 120
                }, {
                    title: "생산일",
                    field: "REG_DT",
                    width: 100
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

        pos.mainGrid();
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