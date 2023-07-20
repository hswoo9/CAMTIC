var userViewPop = {

    global : {
        saveAjaxData : "",
        dropDownDataSource : ""
    },

    defaultScript : function () {
        userViewPop.dataSet();

    },
    dataSet : function() {
        var data = {

        }
        data.deptLevel = 1;
        var deptDsA = customKendo.fn_customAjax("/dept/getDeptAList", data);

        customKendo.fn_dropDownList("deptComp", deptDsA.rs, "dept_name", "dept_seq", "6");

        $("#deptComp").data("kendoDropDownList").bind("change", userViewPop.fn_chngDeptComp)
        $("#deptComp").data("kendoDropDownList").select(0);
        $("#deptComp").data("kendoDropDownList").trigger("change");

        userViewPop.global.dropDownDataSource = customKendo.fn_customAjax("/system/commonCodeManagement/getCmCodeList", {cmGroupCodeId : "3"});
        customKendo.fn_dropDownList("duty", userViewPop.global.dropDownDataSource, "CM_CODE_NM", "CM_CODE", "4");
    },

    fn_chngDeptComp : function (){
        var data = {}
        data.deptLevel = 2;
        data.parentDeptSeq = this.value();

        var ds = customKendo.fn_customAjax("/dept/getDeptAList", data);
        customKendo.fn_dropDownList("deptTeam", ds.rs, "dept_name", "dept_seq","5")
    },

    /** 관리자 버튼*/
    certificateReqPop : function(e) {
        var url = "/inside/pop/certificateReqAdminPop.do?empSeq=" + e;
        var name = "certificateReqPop";
        var option = "width=965, height=380, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    },

    moveToUserReqPop : function(e){
        location.href = "/Inside/pop/userReqPop.do?empSeq=" + e;
    },

    userResignation : function(e){
        var url = "/inside/pop/userResignRegPop.do?empSeq=" + e;
        var name = "userResignRegPop";
        var option = "width=660, height=310, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    },

    setUserDel : function(e){
        if(confirm("삭제된 직원은 복구가 불가능합니다.\n직원을 삭제처리하시겠습니까?")){
            userViewPop.global.saveAjaxData = {
                empSeq : e,
                regEmpSeq : $("#regEmpSeq").val()
            }

            var result = customKendo.fn_customAjax("/userManage/setUserDel.do", userViewPop.global.saveAjaxData);
            if(result.flag){
                alert("처리되었습니다.");
                opener.userPersonList.gridReload();
                window.close();
            }else{
                alert("삭제 처리 중 오류가 발생하였습니다.");
            }
        }
    },

    userAccountPop : function(e) {
        var url = "/Inside/pop/userAccountPop.do?empSeq=" + e;
        var name = "userAccountPop";
        var option = "width=550, height=350, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    },
}