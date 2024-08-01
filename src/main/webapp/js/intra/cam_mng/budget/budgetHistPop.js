var budgetHist = {

    global : {

    },

    fn_defaultScript: function (){
        budgetHist.gridReload();
    },

    mainGrid : function (url, params){
        var mainGrid = $("#mainGrid").kendoGrid({
            height: 350,
            dataSource: customKendo.fn_gridDataSource2(url, params, 10),
            scrollable: true,
            pageable: {
                refresh: true,
                pageSize : 10,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount: 5,
                messages: {
                    display: "{0} - {1} of {2}",
                    itemsPerPage: "",
                    empty: "데이터가 없습니다.",
                }
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    title: "순번",
                    template: "#= --record #",
                    width: 30
                },{
                    title: "구분",
                    width: 50,
                    template: function(e){
                        if(e.BG_VAL == "A"){
                            return "세출";
                        } else if(e.BG_VAL == "B"){
                            return "세입";
                        }
                    }
                }, {
                    title : "분류",
                    width: 80,
                    template: function(e){
                        var className = "";

                        if(e.PJT_CLASS == "M"){
                            className = "법인운영";
                        } else if(e.PJT_CLASS == "S"){
                            className = "비R&D";
                        } else if(e.PJT_CLASS == "R"){
                            className = "R&D";
                        } else if(e.PJT_CLASS == "D"){
                            className = "엔지니어링";
                        } else if(e.PJT_CLASS == "V"){
                            className = "기타/용역";
                        }

                        return className;
                    }
                }, {
                    title : "예산코드",
                    width: 100,
                    template: function(e){
                        return e.JANG_CD + e.GWAN_CD + e.HANG_CD;
                    }
                }, {
                    title : "장",
                    field : "JANG_NM",
                    width: 80
                }, {
                    field: "GWAN_NM",
                    title: "관",
                    width: 100,
                }, {
                    field: "HANG_NM",
                    title: "항",
                    width: 100,
                }, {
                    title: "예산금액",
                    width: 100,
                    template: function(e){
                        return '<div style="text-align: right">'+comma(e.BUDGET_AMT)+'</div>';
                    }
                }, {
                    field: "CD_REG_DE",
                    title: "등록일",
                    width: 70,
                }
            ],

            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },

    gridReload : function (){
        var parameters = {
            pjtBudgetType : $("#pjtBudgetType").val(),
            pjtBudgetSn : $("#pjtBudgetSn").val()
        }
        budgetHist.mainGrid("/budget/getPjtBudgetHistList", parameters);
    },
}