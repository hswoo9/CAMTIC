var popBomView = {
    global : {
        dropDownDataSource : "",
        searchAjaxData : "",
    },

    fn_defaultScript: function (){
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
                pageSizes: [ 5, 10, 15, 20, 100 ],
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
                }, {
                    title: "품명",
                    field: "ITEM_NAME",
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

    comma: function(str) {
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    },

    uncomma: function(str) {
        str = String(str);
        return str.replace(/[^\d]+/g, '');
    },
}