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

        /** 겸직 데이터 조회 */
        tmpDuty.tmpDutySet();
    },

    fn_chngDeptComp : function (){
        var data = {}
        data.deptLevel = 2;
        data.parentDeptSeq = this.value();

        var ds = customKendo.fn_customAjax("/dept/getDeptAList", data);

        if(this.value() != ""){
            customKendo.fn_dropDownList("deptTeam", ds.rs, "dept_name", "dept_seq","5");
        }else{
            customKendo.fn_dropDownList("deptTeam", [], "dept_name", "dept_seq","5");
        }
    },

    /** 관리자 버튼*/
    userImageReqPop : function (e) {
        var url = "/Inside/pop/userReqPopImage.do?empSeq=" + e;
        var name = "recruitReqPopImage";
        var option = "width=1100, height=650, scrollbars=no, top=200, left=300, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    },

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

    fn_setCalcAge: function(jumin){
        // 전달받은 주민번호 데이터에 '-' 확인 후 있으면 제거
        if(jumin.includes('-')){
            jumin = jumin.replace('-','');
        }

        let today = new Date(); // 현재 날짜 및 시간

        let juminFront = jumin.substr(0,6); // 주민번호앞자리
        let juminBackFirstVal = jumin.substr(6,1); //주민번호뒷자리 첫 문자열(2000년도 이전생인지 확인)

        let age = 0;
        let birthDate = null;
        let juminYear = null;
        let juminMonth = jumin.substr(2,2);//10
        let juminDate = jumin.substr(4,2);//03

        let monthCheck = 0;

        if(juminBackFirstVal == 1 || juminBackFirstVal == 2){
            // 2000년생 이전일 경우
            juminYear = "19" + jumin.substr(0,2);//93~~

            // 문법상 Month(월)은 0부터 시작하기 때문에 -1 처리해야 됨.
            birthDate = new Date(juminYear*1, juminMonth-1, juminDate*1);

            // 현재 연도에서 - 태어난 연도 -> 만나이 계산에서 현재 나이로 변경
            age = today.getFullYear() - birthDate.getFullYear() + 1;

            // 현재 월에서 - 태어난 월
            //monthCheck = today.getMonth() - birthDate.getMonth();

            // 생일 월이 현재 월을 지나지 않았을 경우 만 나이기 때문에 -1
            //if(monthCheck < 0 || (monthCheck === 0 && today.getDate() < birthDate.getDate())){
            //    age--;
            //}
        }else{
            // 2000년생 이후
            juminYear = "20" + jumin.substr(0,2);//01~~

            birthDate = new Date(juminYear*1, juminMonth-1, juminDate*1);

            age = today.getFullYear() - birthDate.getFullYear() + 1;

            //monthCheck = today.getMonth() - birthDate.getMonth();

            //if(monthCheck < 0 || (monthCheck === 0 && today.getDate() < birthDate.getDate())){
            //    age--;
            //}
        }

        return age;
    },

    fn_sethire : function(prevHire, prevHireMon, hire, hireMon){
        prevHire = prevHire || 0;
        prevHireMon = prevHireMon || 0;

        var totalHire = parseInt(prevHire) + parseInt(hire);
        var totalHireMon = parseInt(prevHireMon) + parseInt(hireMon);

        if(totalHireMon > 12){
            totalHire = parseInt(totalHire) + parseInt(String(totalHireMon/12).split(".")[0]);
            totalHireMon = totalHireMon%12;
        }

        return totalHire + "년 " + totalHireMon + "개월 (전직경력 : " + prevHire + "년 " + prevHireMon + "개월 + 현직경력 : " + hire + "년 " + hireMon + "개월)" ;
    }
}