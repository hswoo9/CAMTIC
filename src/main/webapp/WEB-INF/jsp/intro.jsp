<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!doctype html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
<meta name="description" content="Crush it Able The most popular Admin Dashboard template and ui kit">
<meta name="author" content="PuffinTheme the theme designer">

<link rel="icon" href="../assets/images/logo2.png" type="image/x-icon"/>

<title>농림수산식품교육문화정보원</title>

<!-- Bootstrap Core and vandor -->
<link rel="stylesheet" href="../assets/plugins/bootstrap/css/bootstrap.min.css" />

<!-- Core css -->
<link rel="stylesheet" href="../assets/css/intro.css"/>
<link rel="stylesheet" href="../assets/css/main.css"/>
<link rel="stylesheet" href="../assets/css/theme4.css" id="stylesheet"/>

<style>
body{z-index:-2; background-color:#798b6b;}


</style>

</head>
<body>
<div id="particles-js"></div>
<div class="intro-line">
    <div class="intro-bg">
        <div class="intro_top">
            <img src="../assets/images/intro-logo.png">
        </div>
        <div class="intro">
            <div class="intro_box box1" style="margin-right:1%;">
                <a href="main.jsp" target="_blank">
                    <span class="intro-copy">농정-ONE 그룹웨어</span>
                    <span class="intro-visit">Visit SITE +</span>
                </a>
            </div>
            <div class="intro_box box2" style="margin-right:1%;">
                <a href="<c:url value='/intra/mainContent.do'/>" target="_blank">
                    <span class="intro-copy">인트라넷</span>
                    <span class="intro-visit">Visit SITE +</span>
                </a>
            </div>
            <div class="intro_box box3">
                <a href="main.jsp" target="_blank">
                    <span class="intro-copy">재무/회계 시스템</span>
                    <span class="intro-visit">Visit SITE +</span>
                </a>
            </div>
        </div>
        <p class="footer-copy">주소 : 30148 세종특별자치시 국책연구원5로 19  / 대표번호 : 044-861-8888  / E-mail : admin@epis.or.kr</p>
    </div>
</div>

<!-- jQuery and bootstrtap js -->
<script src="../assets/bundles/lib.vendor.bundle.js"></script>

<!-- start plugin js file  -->
<!-- Start core js and page js -->
<script src="../assets/js/core.js"></script>
<script src='https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js'></script>
<script src="../assets/js/intro.js"></script>
</body>
</html>