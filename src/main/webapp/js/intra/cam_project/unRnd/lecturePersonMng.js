const lecturePersonMng = {
    global: {
        dupleCk: false
    },

    fn_defaultScript: function(){
        this.fn_pageSet();
        this.fn_dataSet();
    },

    fn_pageSet: function(){
        customKendo.fn_textBox(["id", "pwd", "name", "coName", "birth", "part", "place", "telNum", "hpNum", "faxNum", "zipCode", "address", "addDetail", "pwdCheck", "crmName", "schoolName", "schoolMajor", "email", "crmDept", "crmPosition"]);
        let genderDataSource = [
            { label: "남", value: "M" },
            { label: "여", value: "F" }
        ]
        customKendo.fn_radioGroup("gender", genderDataSource, "horizontal");

        let joinTypeDataSource = [
            { label: "일반", value: "N" },
            { label: "학생", value: "S" },
            { label: "재직자", value: "C" },
            { label: "구직자", value: "H" }
        ]
        customKendo.fn_radioGroup("joinType", joinTypeDataSource, "horizontal");

        $("#name").data("kendoTextBox").bind("change", function(){
            lecturePersonMng.global.dupleCk = false;
        });

        if($("#personSn").val() != ""){
            $("#name").data("kendoTextBox").enable(false);
            $("#ckBtn").hide();
            lecturePersonMng.global.dupleCk = true;
        }
    },

    fn_dataSet: function(){
        const personData = customKendo.fn_customAjax("/projectUnRnd/getPersonData", {
            personSn: $("#personSn").val()
        });
        const psMap = personData.data;
        if(psMap != null){

            $("#name").val(psMap.NAME);
            $("#hpNum").val(psMap.HP_NUM);
            $("#birth").val(psMap.BIRTH);
            if(psMap.GENDER != null && psMap.GENDER != ""){
                $("#gender").data("kendoRadioGroup").value(psMap.GENDER);
            }
            $("#zipCode").val(psMap.ZIP_CODE);
            $("#address").val(psMap.ADDRESS);
            $("#addDetail").val(psMap.ADDRESS_DETAIL);
            $("#telNum").val(psMap.TEL_NUM);
            $("#email").val(psMap.EMAIL);
            if(psMap.USER_TYPE != null && psMap.USER_TYPE != ""){
                $("#joinType").data("kendoRadioGroup").value(psMap.USER_TYPE);
            }

            if (psMap.USER_TYPE === "S") {
                $('#schoolTable').css("display" , "");
                $('#crmTable').css("display" , "none");
            } else if(psMap.USER_TYPE === "C") {
                $('#schoolTable').css("display" , "none");
                $('#crmTable').css("display" , "");
            } else {
                $('#schoolTable').css("display" , "none");
                $('#crmTable').css("display" , "none");
            }
            $("#crmSn").val(psMap.CRM_SN);

            if(psMap.SCHOOL_MAJOR != "" && psMap.SCHOOL_MAJOR != null && psMap.SCHOOL_MAJOR != undefined){
                $("#schoolName").val(psMap.CRM_NM);
            }else{
                $("#crmName").val(psMap.CRM_NM);
            }
            $("#crmSn").val(psMap.CRM_SN);

            $("#schoolMajor").val(psMap.SCHOOL_MAJOR);

            $("#crmDept").val(psMap.PART);
            $("#crmPosition").val(psMap.PLACE);
        }
    },

    fn_save: function(){
        if(!lecturePersonMng.global.dupleCk){
            alert("휴대폰 번호 중복체크가 필요합니다.");
            return;
        }
        const data = {
            name : $("#name").val(),
            hpNum : $("#hpNum").val(),
            pwd : $("#pwd").val(),
            birth : $("#birth").val(),
            gender: $("input[name='gender']:checked").val(),
            zipCode : $("#zipCode").val(),
            address : $("#address").val(),
            addressDetail : $("#addDetail").val(),
            telNum : $("#telNum").val(),
            email : $("#email").val(),
            joinType: $("input[name='joinType']:checked").val(),
            schoolMajor: $("#schoolMajor").val(),
            crmDept: $("#crmDept").val(),
            crmPosition: $("#crmPosition").val(),
            crmSn: $("#crmSn").val()
        }

        if($("#personSn").val() != ""){
            data.personSn = $("#personSn").val();
        }

        if($("#name").val()==="") {
            alert("이름을 입력하세요.");
            $("#name").focus();

            return;
        }else if($("#hpNum").val()==="") {
            alert("휴대전화를 입력하세요.");
            $("#hpNum").focus();

            return;
        }else if($("#pwd").val()==="") {
            alert("비밀번호를 입력하세요.");
            $("#pwd").focus();

            return;
        }else if($("#pwdCheck").val()==="") {
            alert("비밀번호를 입력하세요.");
            $("#pwdCheck").focus();

            return;
        }else if($("#pwd").val() !== $("#pwdCheck").val()){
            alert("비밀번호가 일치하지 않습니다.");
            $("#pswdCheck").val("");
            $("#pswdCheck").focus();

            return;
        }
        else if($("#birth").val()==="") {
            alert("생년월일을 입력해주세요.");
            $("#birth").focus();

            return;
        }else if(!$("input[name='gender']:checked").val()) {
            alert("성별을 선택해주세요.");
            $("#gender").focus();

            return;
        }/*else if($("#address").val()==="") {
            alert("주소를 입력하세요.");
            $("#address").focus();

            return;
        }else if($("#addDetail").val()==="") {
            alert("상세주소를 입력하세요.");
            $("#addDetail").focus();

            return;
        }else if($("#email").val()==="") {
            alert("이메일을 입력하세요.");
            $("#email").focus();

            return;
        }*/else if ($("#email").val() != "" && !$("#email").val().match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i)) {
            alert("올바른 이메일 형식이 아닙니다.");
            $("#email").focus();
            return;
        }else if(!$("input[name='joinType']:checked").val()) {
            alert("구분을 선택해주세요.");
            $("#joinType").focus();

            return;
        }

       /* if($("#schoolChk").is(':checked')){
            if($("#crmSn").val() ===""){
                alert("학교를 선택하세요.");
            }
            if($("#schoolMajor").val()===""){
                alert("학과명을 입력하세요.");
                $("#schoolMajor").focus();

                return;
            }
        }

        if($("#comChk").is(':checked')){
            if($("#crmSn").val() ===""){
                alert("회사를 선택하세요.");
            }
        }*/

        const result = customKendo.fn_customAjax("/projectUnRnd/setLecturePersonData", data);

        if(result.code != 200){
            alert("저장 중 오류가 발생하였습니다.");
        }else{
            alert("저장이 완료 되었습니다.");
            opener.gridReload();
            window.close();
        }
    },

    dupleCk: function(){
        var data = {
            name: $("#name").val(),
            hpNum: $("#hpNum").val()
        }

        if ($("#name").val() === "") {
            alert("이름을 입력하세요.");
            $("#name").focus();
            return;
        }
        if ($("#hpNum").val() === "") {
            alert("휴대전화를 입력하세요.");
            $("#hpNum").focus();
            return;
        }

        const result = customKendo.fn_customAjax("/projectUnRnd/getMemberIdCheck", data);
        if(result.data == null || result.data == "" || result.data == undefined){
            alert("사용가능한 휴대번호입니다.");
            lecturePersonMng.global.dupleCk = true;
        }else{
            alert("중복된 회원이 있습니다.");
        }
    },

    pnChk: function(){
    var inputValue = $("#hpNum").val();
    var pnVal = /^(\d{3})(\d{4})(\d{4})$/;

    if (inputValue.length > 13) {
        alert("11자리 숫자로 입력하세요. ex)010-1234-1234");
        document.getElementById('pNember').value = inputValue.substring(0, 13);
    }

    if (pnVal.test(inputValue)) {
        var pnValue = inputValue.replace(pnVal, '$1-$2-$3');
        $("#hpNum").val(pnValue) ;
    } else {
        if (/[^0-9-]/.test(inputValue)) {
            $("#hpNum").val("") ;
        }
    }
    }
}