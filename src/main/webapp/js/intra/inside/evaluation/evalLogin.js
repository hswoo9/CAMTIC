var evalLogin = {
    global : {
        searchAjaxData : "",
        saveAjaxData : "",
    },

    init : function(){
        customKendo.fn_textBox(["userId", "userPassword"]);

        evalLogin.global.searchAjaxData = {
            recruitInfoSn : $("#recruitInfoSn").val()
        }
        var result = customKendo.fn_customAjax("/inside/getRecruit.do", evalLogin.global.searchAjaxData);
        if(result.flag){
            $("#recruitTitle").text(result.recruit.RECRUIT_TITLE);
        }
    },

    setEvalLogin : function(){
        if(!$("#userId").val()){
            alert("아이디를 입력해주세요.");
            $("#userId").focus();
            return;
        }/*else if(!$("#userPassword").val()){
            alert("비밀번호를 입력해주세요.");
            $("#userPassword").focus();
            return;
        }*/

        var userId0 = evalLogin.securityEncrypt($("#userId").val());
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

        var data = {
            userId : userId0,
            userIdSub1 : $("#userIdSub1").val(),
            userIdSub2 : $("#userIdSub2").val(),
            userPassword : securityEncUtil.securityEncrypt($("#userPassword").val(), "0"),
            recruitInfoSn : $("#recruitInfoSn").val(),
            evalType : $("#evalType").val()
        }

        var chk = customKendo.fn_customAjax("/evaluation/evalChk.do", data);
        if(chk.flag){
            if(chk.rs.code == "999"){
                alert("등록되지 않은 사용자입니다.");
                return;
            }else if(chk.rs.code == "500"){
                alert(chk.rs.message);
            }else{
                if(!chk.rs.flag){
                    alert("심사평가 종료된 사용자입니다.");
                    return;
                }else{
                    if($("#evalType").val() == "doc"){
                        location.href = "/evaluation/evalDocScreen.do?recruitInfoSn=" + $("#recruitInfoSn").val();
                    }else{
                        location.href = "/evaluation/evalInApplicationList.do?recruitInfoSn=" + $("#recruitInfoSn").val();
                    }
                }
            }
        }
    },

    securityEncrypt : function(inputStr){
        return securityEncUtil.securityEncrypt(inputStr, "0");
    }
}
