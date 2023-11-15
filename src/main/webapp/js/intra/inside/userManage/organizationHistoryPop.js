var organizationHistory = {


    init : function(){

    },


    organizationHistoryPop : function(e){
        var url = "/user/pop/organizationHistoryPop.do"
        var name = "organizationHistoryPop";
        var option = "width=1100, height=500, scrollbars=yes, top=100, left=200, resizable=no, toolbars=no, menubar=no"
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