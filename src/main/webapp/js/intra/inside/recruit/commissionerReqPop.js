var now = new Date();
var docContent = "";

var commissionerReqPop = {

    defaultScript : function(){
        commissionerReqPop.dataSet();
    },

    dataSet : function() {
        $("#text1, #text2, #text3, #text4, #text5, #text6, #text7, #text8, #text9").kendoTextBox();
    }
}

