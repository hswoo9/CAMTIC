const historyPrintPop = {
    global : {
        hwpCtrl : "",
        params : "",
    },

    init : function(params){
    },

    print: function() {
        historyPrintPop.global.hwpCtrl.PrintDocument();
        opener.gridReload();
    }
}
