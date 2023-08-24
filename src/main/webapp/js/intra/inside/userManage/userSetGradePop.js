var userSetGrade = {

    init : function(){
        userSetGrade.dataSet();
    },

    dataSet() {
        customKendo.fn_textBox(["grade", "rank", "grade1", "rank1"]);
    },

    userSetGradePop : function(e){
        var url = "/user/pop/userSetGradePop.do"
        var name = "userSetGradePop";
        var option = "width=660, height=900, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    }


}