var std = {

    global : {
        dropDownDataSource : "",
        searchAjaxData : "",
        saveAjaxData : "",
        now : new Date()
    },

    fn_defaultScript : function (){
        std.setMakeTable();
    },

    setMakeTable : function(){
        std.global.searchAjaxData = {

        }

        var result = customKendo.fn_customAjax("/item/getShipmentTrendList.do", std.global.searchAjaxData);
        if(result.flag){
            
        }
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