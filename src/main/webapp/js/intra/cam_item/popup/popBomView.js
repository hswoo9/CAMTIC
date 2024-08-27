var popBomView = {
    global : {
        dropDownDataSource : "",
        searchAjaxData : "",
        treeUidChk : []
    },

    fn_defaultScript: function (){
        popBomView.histGrid();
        popBomView.makeTreeView();
        popBomView.bomGrid();
    },

    makeTreeView : function(){
        popBomView.global.searchAjaxData = {
            bomSn : $("#bomSn").val()
        }

        var result = customKendo.fn_customAjax("/item/makeTreeView.do", popBomView.global.searchAjaxData);
        if(result.flag){
            var rs = result.rs;
            $("#treeView").kendoTreeView({
                dataSource: JSON.parse(rs),
                dataTextField:['TREE_NAME'],
                select: popBomView.treeClick,
            });
        }
    },

    treeClick : function(e){
        var item = $("#treeView").data("kendoTreeView").dataItem(e.node);
        if(item.base != "Y") {
            if (popBomView.global.treeUidChk.find(element => element === item.uid) == null && item.ITEM_TYPE != "MA") {
                var result = customKendo.fn_customAjax("/item/getBomDetailList.do", {bomSn : item.MASTER_BOM_SN});
                if (result.flag) {
                    if (result.list.length > 0) {
                        $("#treeView").data("kendoTreeView").append(result.list, $("#treeView").data("kendoTreeView").findByUid(item.uid));
                        popBomView.global.treeUidChk.push(item.uid)
                    }
                }
            }
        }
    },

    histGrid : function(){
        popBomView.global.searchAjaxData = {
            bomSn : $("#bomSn").val()
        }

        $("#mainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2("/item/getBomOutputHistory.do", popBomView.global.searchAjaxData),
            sortable: true,
            selectable: "row",
            height : 305,
            pageable: {
                refresh: true,
                pageSize : 5,
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
                }
            ],
            excel : {
                fileName : "BOM 생산이력.xlsx",
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
                    width: 200
                }, {
                    title: "품명",
                    field: "ITEM_NAME",
                    width: 150
                }, {
                    title: "규격",
                    field: "STANDARD",
                    width: 150
                }, {
                    title: "생산량",
                    field: "OUTPUT_CNT",
                    width: 100,
                    template : function (e){
                        if(e.OUTPUT_CNT != null && e.OUTPUT_CNT != ""){
                            return popBomView.comma(e.OUTPUT_CNT) + "";
                        }else{
                            return "0";
                        }
                    },
                    attributes : {
                        style : "text-align : right;"
                    }
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
    },

    bomGrid : function(){
        popBomView.global.searchAjaxData = {
            bomSn : $("#bomSn").val()
        }

        $("#bomGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2("/item/getBomDetailList.do", popBomView.global.searchAjaxData),
            sortable: true,
            selectable: "row",
            height : 450,
            pageable: {
                refresh: true,
                pageSize : 5,
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
                    width: 180
                }, {
                    title: "품명",
                    field: "ITEM_NAME",
                    width: 150
                }, {
                    title: "품목구분",
                    field: "ITEM_TYPE_NM",
                    width: 80
                }, {
                    title: "사용갯수",
                    field: "REQ_QTY",
                    width: 80,
                    template: function(e) {
                        return '<div style="text-align: right;">' + popBomView.comma(e.REQ_QTY) + '</div>';
                    }
                }, {
                    title: "단위",
                    field: "ITEM_UNIT_NM",
                    width: 80
                }, {
                    title: "규격",
                    field: "STANDARD",
                    width: 100
                }, {
                    title: "창고",
                    field: "WH_NM",
                    width: 100
                }, {
                    title: "현재고",
                    field: "CURRENT_INVEN",
                    width: 80,
                    template: function(e) {
                        return '<div style="text-align: right;">' + popBomView.comma(e.CURRENT_INVEN) + '</div>';
                    }
                }, {
                    title: "매입단가",
                    field: "UNIT_PRICE",
                    width: 100,
                    template: function(e) {
                        return '<div style="text-align: right;">' + popBomView.comma(e.UNIT_PRICE) + '</div>';
                    }
                }, {
                    title: "원가",
                    field: "COST_PRICE",
                    width: 100,
                    template: function(e) {
                        return '<div style="text-align: right;">' + popBomView.comma(e.COST_PRICE) + '</div>';
                    }
                },
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 3);
            }
        }).data("kendoGrid");
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