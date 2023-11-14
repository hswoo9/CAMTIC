var organizationHistory = {


    init : function(){

    },


    organizationHistoryPop : function(e){
        var url = "/user/pop/organizationHistoryPop.do"
        var name = "organizationHistoryPop";
        var option = "width=1100, height=750, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    }
}