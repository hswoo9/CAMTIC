let calcAmSum = 0;
var bgtItemInfo = {

    global : {
        params : "",
        searchAjaxData : "",
    },

    fn_defaultScript : function (setParameters){
        bgtItemInfo.global.params = setParameters;

        var date = new Date();
        var baseDate = date.getFullYear().toString() + (date.getMonth() + 1).toString().padStart(2, '0') + date.getDate().toString().padStart(2, '0');

        bgtItemInfo.global.searchAjaxData = {
            pjtSn : bgtItemInfo.global.params.pjtCd,
            mgtSeq : bgtItemInfo.global.params.pjtCd,
            baseDate : baseDate
        }

        bgtItemInfo.fn_mainGridReload();
        bgtItemInfo.fn_subGridReload();
    },

    fn_mainGridReload: function (){
        bgtItemInfo.global.searchAjaxData.temp = "2";

        bgtItemInfo.mainGrid("/g20/getBudgetListDuplDel", bgtItemInfo.global.searchAjaxData);
    },

    mainGrid: function(url, params){
        $("#mainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
            sortable: true,
            selectable: "row",
            height: 308,
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
                    name : 'excel',
                    text: '엑셀다운로드'
                }
            ],
            excel : {
                fileName : "예산비목.xlsx",
                filterable : true
            },
            columns: [
                {
                    title: "순번",
                    template: "#= ++record #",
                    width: 30
                }, {
                    title: "장",
                    width: 150,
                    field : "BGT1_NM"
                }, {
                    title: "관",
                    width: 150,
                    field : "BGT2_NM"
                }, {
                    title: "항",
                    width: 150,
                    template: function (e){
                        if(e.DIV_FG_NM == "항"){
                            return e.BGT_NM;
                        } else {
                            return "";
                        }
                    },
                    footerTemplate: "합계"
                }, {
                    title: "예산액",
                    width: 150,
                    template: function(e){
                        calcAmSum  += Number(e.CALC_AM);
                        return "<div style='text-align: right'>"+comma(e.CALC_AM)+"</div>";
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(calcAmSum)+"</div>";
                    }
                }
            ],
            dataBinding: function() {
                record = (this.dataSource.page() -1) * this.dataSource.pageSize();
            }
        }).data("kendoGrid");
    },

    fn_subGridReload: function (){
        bgtItemInfo.global.searchAjaxData.temp = "1";

        bgtItemInfo.subGrid("/g20/getBudgetListDuplDel", bgtItemInfo.global.searchAjaxData);
    },

    subGrid: function(url, params){
        $("#subGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
            sortable: true,
            selectable: "row",
            height: 258,
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
                    name : 'excel',
                    text: '엑셀다운로드'
                }
            ],
            excel : {
                fileName : "수입예산.xlsx",
                filterable : true
            },
            columns: [
                {
                    title: "순번",
                    template: "#= ++record #",
                    width: 30
                }, {
                    title: "장",
                    width: 150,
                    field : "BGT1_NM"
                }, {
                    title: "관",
                    width: 150,
                    field : "BGT2_NM"
                }, {
                    title: "항",
                    width: 150,
                    template: function (e){
                        if(e.DIV_FG_NM == "항"){
                            return e.BGT_NM;
                        } else {
                            return "";
                        }
                    },
                    footerTemplate: "합계"
                }, {
                    title: "예산액",
                    width: 150,
                    template: function(e){
                        calcAmSum  += Number(e.CALC_AM);
                        return "<div style='text-align: right'>"+comma(e.CALC_AM)+"</div>";
                    },
                    footerTemplate: function(){
                        return "<div style='text-align: right'>"+comma(calcAmSum)+"</div>";
                    }
                }
            ],
            dataBinding: function() {
                record = (this.dataSource.page() -1) * this.dataSource.pageSize();
            }
        }).data("kendoGrid");
    },
}