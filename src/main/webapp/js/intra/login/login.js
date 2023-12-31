var login = {
    global : {

    },

    init: function() {
        if ($("#message").val() != "") {
            alert($("#message").val());
        }
    },

    actionLogin: function() {
        if ($("#id").val() =="") {
            alert("아이디를 입력하세요");
            return;
        }else if ($("#password").val() ==""){
            alert("비밀번호를 입력하세요.");
            return;
        }else{
            var loginUrl = "/loginAccess";
            document.loginForm.action= loginUrl;
            document.loginForm.submit();
        }
    },

    actionLoginBack: function() {
        if ($("#id").val() == "") {
            alert("아이디를 입력하세요");
            return false;
        }else if ($("#password").val() == "") {
            alert("비밀번호를 입력하세요");
            return false;
        }else {
            var loginForm = document.createElement("loginForm");
            loginForm.setAttribute("charset", "UTF-8");
            loginForm.setAttribute("method", "Post");
            loginForm.setAttribute("id", "loginForm");
            loginForm.setAttribute("action", "#LINK");

            var id = document.createElement("input");
            id.setAttribute("type", "hidden");
            id.setAttribute("name", "id");
            id.setAttribute("value", $("#id").val());
            loginForm.appendChild(id);

            var password = document.createElement("input");
            password.setAttribute("type", "hidden");
            password.setAttribute("name", "password");
            password.setAttribute("value", $("#password").val());
            loginForm.appendChild(password);

            var loginUrl = getContextPath() + "/loginAccess.do";
            loginForm.action = loginUrl;
            document.body.appendChild(loginForm);
            loginForm.submit();
        }
    }
}