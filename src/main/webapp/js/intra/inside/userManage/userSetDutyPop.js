var userSetDuty = {

    init : function(){
        userSetDuty.dataSet();
    },

    dataSet() {
        customKendo.fn_textBox(["num", "duty", "num1", "duty1"]);
    },

    userSetDutyPop : function(e){
        var url = "/user/pop/userSetDutyPop.do"
        var name = "userSetDutyPop";
        var option = "width=660, height=500, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    }


}