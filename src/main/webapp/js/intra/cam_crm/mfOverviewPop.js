var movP = {

    global : {
        searchAjaxData : "",
    },

    fn_defaultScript : function (){
        $("#tabstrip").kendoTabStrip({
            animation:  {
                open: {
                    effects: "fadeIn"
                }
            }
        });

        var tabStrip = $("#tabstrip").data("kendoTabStrip");
        tabStrip.disable(tabStrip.tabGroup.children());

        if($("#crmMfSn").val() != null && $("#crmMfSn").val() != ""){
            tabStrip.enable(tabStrip.tabGroup.children().eq(0));
            tabStrip.enable(tabStrip.tabGroup.children().eq(2));
            tabStrip.select(0);
        }

        movJb.fn_defaultScript();
        movJbStat.fn_defaultScript();
    },
}