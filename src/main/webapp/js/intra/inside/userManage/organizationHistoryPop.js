var organizationHistory = {
    global : {
        dropDownDataSource : "",
        searchAjaxData : "",
        saveAjaxData : "",
        subAjaxData : "",
    },

    fn_defaultScript : function (){
        organizationHistory.fn_mainGridReload();

        /*$("#mainGrid tr button[name='selectBtn']").on('click',function(){
            $("#mainGrid tr.activeRow").removeClass('activeRow'); //remove previous active row
            $(this).closest('tr').addClass('activeRow');//set current row as active
        });*/
    },

    fn_mainGridReload: function (){
        organizationHistory.global.searchAjaxData = {

        }

        organizationHistory.mainGrid("/user/getHistoryList", organizationHistory.global.searchAjaxData);
    },

    mainGrid: function(url, params){
        $("#mainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
            sortable: true,
            selectable: "row",
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },

            columns: [
                {
                    title: "순번",
                    template: "#= --record #",
                    width: 20
                }, {
                    title: "제목",
                    field: "HISTORY_TITLE",
                    width: 75,
                    template: function(e){
                        return"<a href='javascript:void(0);' style='font-weight: bold' onclick='historyInfo.fn_historyInfo("+e.HISTORY_SN+")'>" + e.HISTORY_TITLE + "</a>";
                    }
                }, {
                    title: "작성자",
                    field: "regEmpName",
                    width: 25
                }, {
                    title: "작성일",
                    field: "REG_DT",
                    width: 40
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 3);
            }
        }).data("kendoGrid");

    },


    organizationHistoryPop : function(e){
        var url = "/user/pop/organizationHistoryPop.do"
        var name = "organizationHistoryPop";
        var option = "width=780, height=500, scrollbars=yes, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    },

    fu_addInfo : function (e){
        location.href = "/user/pop/historyAddPop.do";
    },

    fn_windowClose : function(e){
        window.close();
    },

    fu_saveInfo : function(e){

    }
}