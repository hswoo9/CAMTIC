var invenSt = {

    global : {
        dropDownDataSource : "",
        searchAjaxData : "",
        saveAjaxData : "",
    },

    fn_defaultScript : function (){
        invenSt.global.dropDownDataSource = customKendo.fn_customAjax("/item/smCodeList", {grpSn : "WC", lgCd : "WH"});
        customKendo.fn_dropDownList("whCd", invenSt.global.dropDownDataSource, "ITEM_CD_NM", "ITEM_CD");
        $("#whCd").data("kendoDropDownList").bind("change", invenSt.mainGrid);

        invenSt.global.dropDownDataSource = [
            { text : "품번", value : "ITEM_NO" },
            { text : "품명", value : "ITEM_NAME" }
        ]
        customKendo.fn_dropDownList("searchKeyword", invenSt.global.dropDownDataSource, "text", "value");
        $("#searchKeyword").data("kendoDropDownList").bind("change", invenSt.mainGrid);

        customKendo.fn_textBox(["searchValue"]);

        invenSt.mainGrid();
    },

    mainGrid: function(){
        const dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/item/getItemInvenList.do',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    data.whCd = $("#whCd").val();
                    data.searchKeyword = $("#searchKeyword").val();
                    data.searchValue = $("#searchValue").val();
                    data.inspection = "Y";

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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="invenSt.mainGrid()">' +
                            '	<span class="k-button-text">조회</span>' +
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
                    field: "TOT_CNT",
                    width: 100,
                    template : function (e){
                        if(e.TOT_CNT < 0){
                            return "<span style='color: red'>" + invenSt.comma(e.TOT_CNT) + "</span>";
                        }else{
                            return invenSt.comma(e.TOT_CNT);
                        }
                    },
                    attributes : {
                        style : "text-align : right;"
                    }
                }, {
                    title: "안전재고",
                    filed: "SAFE_CNT",
                    width: 100,
                    template : function (e){
                        if(e.SAFE_CNT < 0){
                            return "<span style='color: red'>" + invenSt.comma(e.SAFE_CNT) + "</span>";
                        }else{
                            return invenSt.comma(e.SAFE_CNT);
                        }
                    },
                    attributes : {
                        style : "text-align : right;"
                    }
                }, {
                    title: "입고",
                    field: "IN_CNT",
                    width: 100,
                    template : function (e){
                        return invenSt.comma(e.IN_CNT);
                    },
                    attributes : {
                        style : "text-align : right;"
                    }
                }, {
                    title: "출고",
                    width: 100,
                    field: "OUT_CNT",
                    template : function (e){
                        return invenSt.comma(e.OUT_CNT);
                    },
                    attributes : {
                        style : "text-align : right;"
                    }
                }, {
                    title: "단가",
                    width: 100,
                    field: "UNIT_AMT",
                    template: function(e){
                        return invenSt.comma(e.UNIT_AMT) + "원";
                    },
                    attributes : {
                        style : "text-align : right;"
                    }
                }, {
                    title: "재고금액",
                    width: 100,
                    field: "AMT",
                    template: function(e){
                        if(e.AMT < 0){
                            return "<span style='color: red'>" + invenSt.comma(e.AMT) + "원</span>";
                        }else{
                            return invenSt.comma(e.AMT) + "원";
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
    },

    /*gridReload: function (){
        if($("#mainGrid").data("kendoGrid") != null){
            $("#mainGrid").data("kendoGrid").destroy();
        }
        
        invenSt.global.searchAjaxData = {
            whCd : $("#whCd").val(),
            searchKeyword : $("#searchKeyword").val(),
            searchValue : $("#searchValue").val(),
            inspection : "Y"
        }

        invenSt.mainGrid("/item/getItemInvenList.do", invenSt.global.searchAjaxData);
    },*/

    comma: function(str) {
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    },

    uncomma: function(str) {
        str = String(str);
        return str.replace(/[^\d]+/g, '');
    },
}