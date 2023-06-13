var now = new Date();

var targetInfo = {

    init : function(){
        targetInfo.dataSet();
        targetInfo.mainGrid();
    },

    dataSet() {
    },

    mainGrid : function() {
    },

    targetAddYearPop : function() {
        var url = "/Campus/pop/targetAddYearPop.do";
        var name = "targetAddYearPop";
        var option = "width = 520, height = 300, top = 100, left = 200, location = no"
        var popup = window.open(url, name, option);
    },

    targetInfoPop : function() {
        var url = "/Campus/pop/targetInfoPop.do";
        var name = "targetInfoPop";
        var option = "width = 1200, height = 800, top = 100, left = 200, location = no"
        var popup = window.open(url, name, option);
    },

    targetMainSetPop : function() {
        var url = "/Campus/pop/targetMainSetPop.do";
        var name = "targetMainSetPop";
        var option = "width = 1200, height = 800, top = 100, left = 200, location = no"
        var popup = window.open(url, name, option);
    }
}
