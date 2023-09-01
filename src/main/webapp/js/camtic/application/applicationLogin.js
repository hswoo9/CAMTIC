var applicationLogin = {
    global : {
        strongPassword : new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
    },

    setApplicationLogin : function(){
        /** 이메일 정규식 체크 */


        if(!$("#userEmail").val()){
            alert("이메일을 입력해주세요.");
            $("#userEmail").focus();
            return false;
        }else if(applicationLogin.validEmailCheck(document.getElementById("userEmail")) == false){
            alert('이메일 형식을 올바르게 입력해주세요. ex) xxx@000.000');
            $("#userEmail").focus();
            return;
        }else if(!$("#userPassword").val()){
            alert("비밀번호를 입력해주세요.");
            $("#userPassword").focus();
            return false;
        }else if(!applicationLogin.global.strongPassword.test($("#userPassword").val())){
            alert("비밀번호 형식이 올바르지 않습니다.\n[8자리 이상, 숫자, 특수문자, 하나이상 대소문자 혼합]");
            $("#userPassword").focus();
            return
        }else if(!$("#userPassword2").val()){
            alert("비밀번호 확인을 입력해주세요.");
            $("#userPassword2").focus();
            return;
        }else if($("#userPassword").val() !== $("#userPassword2").val()){
            alert("비밀번호가 일치하지 않습니다.\n다시 입력해주세요.");
            $("#userPassword2").focus();
            return;
        }

        if(confirm("입사지원 하시겠습니까?")){
            var userEmail0 = applicationLogin.securityEncrypt($("#userEmail").val());
            var userEmail1 = "";
            var userEmail2 = "";

            if(userEmail0.length > 50){
                userEmail1 = userEmail0.substr(50);
                userEmail0 = userEmail0.substr(0,50);

                if(userEmail1.length > 50){
                    userEmail2 = userEmail1.substr(50);
                    userEmail1 = userEmail1.substr(0,50);
                }
            }

            $("#userEmailSub1").val(userEmail1);
            $("#userEmailSub2").val(userEmail2);

            var data = {
                userEmail : userEmail0,
                userEmailSub1 : $("#userEmailSub1").val(),
                userEmailSub2 : $("#userEmailSub2").val(),
                userPassword : securityEncUtil.securityEncrypt($("#userPassword").val(), "0"),
                recruitInfoSn : $("#recruitInfoSn").val()
            }

            var chk = customKendo.fn_customAjax("/join/userChk.do", data);
            if(chk.flag){
                if(chk.rs.code == "999"){
                    var result = customKendo.fn_customAjax("/join/setJoinAccess.do", data);
                    if(result.flag){
                        /** 신규 사용자 */
                        location.href = "/application/userAgree.do";
                    }
                }else{
                    if(chk.rs.code == "500"){
                        /** 비밀번호 오류 */
                        alert(chk.rs.message);
                    }else if(chk.rs.code == "200"){
                        /** 이미 있는 사용자 */
                        if(chk.rs.chk){
                            location.href = "/application/applicationForm1.do";
                        }else{
                            location.href = "/application/userAgree.do";
                        }
                    }
                }
            }


        }

    },

    validEmailCheck(obj) {
        var pattern = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        return (obj.value.match(pattern) != null)
    },

    securityEncrypt : function(inputStr){
        return securityEncUtil.securityEncrypt(inputStr, "0");
    }
}