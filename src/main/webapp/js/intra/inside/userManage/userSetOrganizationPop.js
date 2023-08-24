var userSetOrganization = {

    init : function(){
        userSetOrganization.dataSet();
    },

    dataSet() {
        customKendo.fn_textBox(["dept", "team", "sortSn"]);
    },

    dataClear : function() {
        $("#dept").val("");
        $("#team").val("");
        $("#sortSn").val("");
    },

    userSetOrganizationPop : function(e){
        var url = "/user/pop/userSetOrganizationPop.do"
        var name = "userSetOrganizationPop";
        var option = "width=1100, height=750, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    }


}