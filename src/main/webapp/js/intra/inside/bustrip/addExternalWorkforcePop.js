const externalReq = {
    init: function(){
        bustrip.fn_setPageName();
        externalReq.pageSet();
        externalReq.dataSet();
    },

    pageSet: function(){
        /** Kendo 위젯 세팅 */
        customKendo.fn_textBox(["belong", "spot", "name", "etc"]);
    },

    dataSet: function(){

    },

    fn_saveBtn: function(){

    }
}