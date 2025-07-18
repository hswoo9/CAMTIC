<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">
    <!--<link rel="shortcut icon" href="/images/favicon.png" type="image/png">-->

    <title>CAM'S POT</title>
    <link rel="icon" href="/images/cam_favicon.png" type="image/png">
    <link rel="stylesheet" href="/lib/fontawesome/css/font-awesome.css">

    <link rel="stylesheet" href="/css/quirk.css">
    <link rel="stylesheet" href="/css/style.css">

    <script src="/lib/modernizr/modernizr.js"></script>
    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
    <script src="/lib/html5shiv/html5shiv.js"></script>
    <script src="/lib/respond/respond.src.js"></script>
    <![endif]-->

    <script type="text/javascript" src="<c:url value='/js/kendoui/jquery.min.js'/>"></script>
    <script type="text/javascript" src="/js/intra/common/common.js"></script>
    <script type="text/javascript" src="/js/intra/login/login.js?v=1"></script>
</head>

<body class="signwrapper">

<div class="sign-overlay"></div>
<div class="signpanel"></div>

<div class="signin" style="position:absolute; top:37%; left:66.5%; width:490px; background-color:transparent; text-align:left;">
    <div style="font-size:29px; color:dodgerblue;"><b><span style="text-emphasis-style: dot; ">&nbsp;함께</span> 성장하는 <span style="text-emphasis-style: dot; ">행복</span>한 일터</b></div>
    <%--    <div style="font-size:32px; color:#fff;"><b>換환 骨골 奪탈 胎태</b></div>--%>
    <p style="font-size:45px; color:#fff;">
        換<sub style="font-size: small">환</sub>&nbsp;&nbsp;
        骨<sub style="font-size: small">골</sub>&nbsp;&nbsp;
        奪<sub style="font-size: small">탈</sub>&nbsp;&nbsp;
        胎<sub style="font-size: small">태</sub>
    </p>
    <p style="font-size:12px; color:#fff;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[<span style="color: yellow;">나의 변화</span>] 내가 바뀌지 않으면 아무것도 바뀌지 않는다!</p>
    <p style="font-size:12px; color:#fff;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[<span style="color: yellow;">기술 축적</span>] 지금 하지 않으면 우리는 없다!</p>
    <p style="font-size:12px; color:#fff;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[<span style="color: yellow;">고객 성공</span>] 고객의 성공이 CAMTIC의 성장이다!</p>
</div><!-- panel -->
<div class="signin" style="position:absolute; top:82%; left:5%; width:300px; background-color:transparent;">
    <div><img src="/images/logo_han.png" alt="" style="width:200px;"/></div>
</div><!-- panel -->
<div class="panel signin">
    <div class="panel-body" style="height:255px; width: 90%; margin: 0 auto;">
        <form name="loginForm" id="loginForm" method="post" action="">
            <div class="form-group mb10">
                <div class="form-group mb10" style="font-size:18px; font-weight: 600; text-align:center;">
                    로그인
                </div>
                <div class="input-group">
                    <span class="input-group-addon"></span>
                    <input type="hidden" id="NEWCAMTICS" name="NEWCAMTICS" value="${params.NEWCAMTICS}" />
                    <input type="text" id="id" name="id" class="form-control" placeholder="아이디를 입력하세요." value="">
                </div>
            </div>
            <div class="form-group mb10">
                <div class="input-group">
                    <span class="input-group-addon"></span>
                    <input type="password" id="password" name="password" class="form-control" placeholder="비밀번호를 입력하세요." value="">
                </div>
            </div>
            <div>
                <button class="btn btn-success btn-quirk btn-block" id="mvBtn" onclick="login.actionLogin();">확인</button>
            </div>
            <div style="display:flex; justify-content: space-between;">
                <div><input type="checkbox" name="" value="" style="margin-right:5px;"><a href="" class="forgot">아이디저장</a></div>
                <div><%--<a href="" class="forgot">비밀번호찾기</a>--%></div>
                <div>
                    <a href="#" class="forgot" onclick="login.openPopup();">단기직원 정보등록</a>
                </div>
            </div>
            <input type="hidden" name="message" id="message" value="${message}" />
        </form>
<%--        <div style="text-align: right;">2023년 12월 31일 오전 10시 30분</div>--%>
        <hr class="invisible">
    </div>
</div><!-- panel -->
<script>

    var userDevice = "";
    var device = "win16|win32|win64|mac|macintel";

    if ( navigator.platform ) {
        if ( device.indexOf(navigator.platform.toLowerCase()) < 0 ) {
            location.href = "/m/login.do";
        }
    }

    login.init();
</script>
</body>
</html>
