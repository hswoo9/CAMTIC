var userViewPop2 = {

    global : {
        saveAjaxData : "",
        dropDownDataSource : ""
    },

    defaultScript : function () {
        userViewPop2.dataSet();

    },
    dataSet : function() {
        var data = {

        }
        data.deptLevel = 1;
        var deptDsA = customKendo.fn_customAjax("/dept/getDeptAList", data);

        customKendo.fn_dropDownList("deptComp", deptDsA.rs, "dept_name", "dept_seq", "6");

        $("#deptComp").data("kendoDropDownList").bind("change", userViewPop2.fn_chngDeptComp)
        $("#deptComp").data("kendoDropDownList").select(0);
        $("#deptComp").data("kendoDropDownList").trigger("change");

        userViewPop2.global.dropDownDataSource = customKendo.fn_customAjax("/system/commonCodeManagement/getCmCodeList", {cmGroupCodeId : "3"});
        customKendo.fn_dropDownList("duty", userViewPop2.global.dropDownDataSource, "CM_CODE_NM", "CM_CODE", "4");
    },

    fn_chngDeptComp : function (){
        var data = {}
        data.deptLevel = 2;
        data.parentDeptSeq = this.value();

        var ds = customKendo.fn_customAjax("/dept/getDeptAList", data);
        customKendo.fn_dropDownList("deptTeam", ds.rs, "dept_name", "dept_seq","5")
    },

    userAccountPop : function(e) {
        var url = "/Inside/pop/userAccountPop.do?empSeq=" + e;
        var name = "userAccountPop";
        var option = "width=550, height=350, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    },
}