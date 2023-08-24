var userSetRank = {

    init : function(){
        userSetRank.dataSet();
    },

    dataSet() {
        customKendo.fn_textBox(["num", "duty", "num1", "duty1"]);
    },

    userSetRankPop : function(e){
        var url = "/user/pop/userSetRankPop.do"
        var name = "userSetRankPop";
        var option = "width=660, height=900, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    }


}