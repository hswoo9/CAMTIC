var now = new Date();

var openStudyInfo = {

    init : function(){
        openStudyInfo.dataSet();
        openStudyInfo.mainGrid();
    },

    dataSet() {
    },

    mainGrid : function() {
    },

    popup : function() {
        var url = "/Campus/pop/popup.do";
        var name = "popup";
        var option = "width = 340, height = 390, top = 100, left = 200, location = no";
        var popup = window.open(url, name, option);
    }
}
