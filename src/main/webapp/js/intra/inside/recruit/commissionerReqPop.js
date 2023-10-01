var commissionerReq = {

    global : {
        saveAjaxData : "",
    },

    init : function(){
        commissionerReq.dataSet();
    },

    dataSet : function(){
        customKendo.fn_textBox(["id", "pwd", "name", "firstRrnName", "secondRrnName", "telNum", "email", "belong", "dutyPosition", "rmk"]);

        $("#gender").kendoRadioGroup({
            items: [
                { label : "남", value : "M" },
                { label : "여", value : "F" }
            ],
            layout : "horizontal",
            labelPosition : "after",
            value : "M",
        }).data("kendoRadioGroup");
    },

    saveBtn : function(){
        if($("#id").val() == ""){
            alert("임시아이디가 작성되지 않았습니다.");
            $("#id").focus();
            return;
        }else if($("#pwd").val() == ""){
            alert("임시비밀번호가 작성되지 않았습니다.");
            $("#pwd").focus();
            return;
        }else if($("#name").val() == ""){
            alert("성명 작성되지 않았습니다.");
            $("#name").focus();
            return;
        }else if($("#firstRrnName").val() == "") {
            alert("주민등록번호 앞자리가 작성되지 않았습니다.");
            $("#firstRrnName").focus();
            return;
        }else if($("#secondRrnName").val() == "") {
            alert("주민등록번호 뒷자리가 작성되지 않았습니다.");
            $("#secondRrnName").focus();
            return;
        }else if($("#gender").data("kendoRadioGroup").value() == "") {
            alert("직급(직책)이 작성되지 않았습니다.");
            return;
        }

        var userId0 = commissionerReq.securityEncrypt($("#id").val());
        var userId1 = "";
        var userId2 = "";

        if(userId0.length > 50){
            userId1 = userId0.substr(50);
            userId0 = userId0.substr(0,50);

            if(userId1.length > 50){
                userId2 = userId1.substr(50);
                userId1 = userId1.substr(0,50);
            }
        }

        $("#userIdSub1").val(userId1);
        $("#userIdSub2").val(userId2);

        commissionerReq.global.saveAjaxData = {
            authorityGroupId : "14",
            LOGIN_ID: userId0,
            userIdSub1 : $("#userIdSub1").val(),
            userIdSub2 : $("#userIdSub2").val(),
            LOGIN_PASSWD : securityEncUtil.securityEncrypt($("#pwd").val(), "0"),
            EMP_NAME_KR : $("#name").val(),
            empName : $("#name").val(),
            RES_REGIS_NUM: $("#firstRrnName").val() + "-" + $("#secondRrnName").val(),
            MOBILE_TEL_NUM: $("#telNum").val(),
            EMAIL_ADDR: $("#email").val(),
            DEPT_NAME: $("#belong").val(),
            deptName: $("#belong").val(),
            genderCode : $("#gender").data("kendoRadioGroup").value(),
            POSITION_NAME : $("#dutyPosition").val(),
            dutyName : "",
            positionName : "",
            SIGNIFICANT : $("#rmk").val(),
            TEMP_DIVISION : "E",
            ACTIVE : "Y",
            active : "Y",
            regEmpSeq: $("#regEmpSeq").val(),
            regEmpName: $("#regEmpName").val(),
        }

        if(confirm("평가위원을 저장하시겠습니까?")){
            var result = customKendo.fn_customAjax("/inside/setCommissionerEmpInfo", commissionerReq.global.saveAjaxData);
            if(result.flag){
                alert("등록되었습니다.");
                opener.parent.commissionerManage.gridReload();
                window.close();
            }
        }
    },

    securityEncrypt : function(inputStr){
        return securityEncUtil.securityEncrypt(inputStr, "0");
    }
}

