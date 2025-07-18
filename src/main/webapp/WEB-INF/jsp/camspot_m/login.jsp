<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

    
<jsp:include page="/WEB-INF/jsp/camspot_m/inc/top.jsp" flush="false"/>

<style>
#manu,
#notBar,
#footer{display:none !important;}
#header .logo{left:20px;}
#wrap{padding:0 !important;}
</style>


    <!-- login {-->
    <div id="login">
    
    	<!-- content {-->
    	<div id="content">
        
        	<div class="titBox">
                <font class="txt type32 fcol_sky together"><b>함</b><b>께</b> 성장하는 <b>행</b><b>복</b>한 일터</font>
                
                <h2 class="mt30 fP900">젊은 캠틱,<br>역동적인 클러스터!</h2>
                <p style="font-size:45px; color:#000000;">
                    換<sub style="font-size: small">환</sub>&nbsp;
                    骨<sub style="font-size: small">골</sub>&nbsp;
                    奪<sub style="font-size: small">탈</sub>&nbsp;
                    胎<sub style="font-size: small">태</sub>
                </p>

                <ul class="list type1 mt40">
                    <li>[나의 변화] 내가 바뀌지 않으면 아무것도 바뀌지 않는다!</li>
                    <li>[기술 축적] 지금 하지 않으면 우리는 없다!</li>
                    <li>[고객 성공] 고객의 성공이 CAMTIC의 성장이다!</li>
                </ul>
            </div>
            
            <div class="loginBox">
            
            	<h3 class="TtU TC fcol_white">LOGIN</h3>
                <form name="loginForm" id="loginForm" method="post" action="">
                    <input type="hidden" id="deviceType" name="deviceType" value="m" />
                    <div class="loginInput mt20">
                        <span class="idpw id">
                            <font class="txt type24 fP800">아이디</font>
                            <input type="text" id="id" name="id" />
                        </span>
                        <span class="idpw pw">
                            <font class="txt type24 fP800">비밀번호</font>
                            <input type="password" id="password" name="password" />
                        </span>
                        
                        <span class="save">
                            <input type="checkbox" id="idsave" />
                            <label for="idsave" class="txt type18 fcol_white">아이디저장</label>
                        </span>
                    </div>
                    <input type="submit" value="LOGIN" placeholder="LOGIN" onclick="actionLogin();" class="bt mt20" style="width: 100%" />
                    <font class="txt type24 fP600 TC mt20 fcol_white"><a href="#">Forgot password?</a></font>
                </form>
            	
            </div>
            
            
    	</div>   
    	<!--} content -->
             
    </div>
    <!--} login -->
    


<script>
    var userDevice = "";
    var device = "win16|win32|win64|mac|macintel";

    if ( navigator.platform ) {
        if ( device.indexOf(navigator.platform.toLowerCase()) < 0 ) {
        } else {
            location.href = "/login.do";
        }
    }

    function actionLogin() {
        if ($("#id").val() == "") {
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
    }
</script>