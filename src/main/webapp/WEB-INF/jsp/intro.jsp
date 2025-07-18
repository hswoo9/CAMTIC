<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">
    <!--<link rel="shortcut icon" href="/images/favicon.png" type="image/png">-->

    <title>CAM'S POT</title>

    <link rel="stylesheet" href="/lib/fontawesome/css/font-awesome.css">

    <link rel="stylesheet" href="/css/quirk.css">
    <link rel="stylesheet" href="/css/style.css">
    <script src="/lib/jquery/jquery.js"></script>
    <script src="/lib/modernizr/modernizr.js"></script>
    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
    <script src="/lib/html5shiv/html5shiv.js"></script>
    <script src="/lib/respond/respond.src.js"></script>
    <![endif]-->
</head>
<style>
    @import url("https://fonts.googleapis.com/css?family=Poppins:200,300,400,500,600,700,800,900&display=swap");

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        text-align: center;
        padding: 100px;
        background: whitesmoke;
        display: table-cell;
    }

    button {
        margin: 20px;
    }

    .w-btn {
        position: relative;
        border: none;
        display: inline-block;
        padding: 15px 15px;
        border-radius: 15px;
        font-family: "paybooc-Light", sans-serif;
        box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
        text-decoration: none;
        font-weight: 600;
        transition: 0.25s;
        width: 150px;
    }

    .w-btn-outline {
        position: relative;
        padding: 15px 30px;
        border-radius: 15px;
        font-family: "paybooc-Light", sans-serif;
        box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
        text-decoration: none;
        font-weight: 600;
        transition: 0.25s;
    }

    .w-btn-indigo {
        background-color: aliceblue;
        color: #1e6b7b;
    }

    .w-btn-indigo-outline {
        border: 3px solid aliceblue;
        color: #1e6b7b;
    }

    .w-btn-indigo-outline:hover {
        color: #1e6b7b;
        background: aliceblue;
    }
</style>
<body class="signwrapper">

<div class="sign-overlay"></div>
<div class="signpanel"></div>

<div class="signin" style="position:absolute; top:50%; left:65%; width:490px; background-color:transparent; text-align:left;">
    <div style="font-size:29px; color:dodgerblue;"><b>함께 성장하는 행복한 일터</b></div>
    <div style="font-size:32px; color:#fff;"><i>젊은 캠틱, 역동적인 클러스터!</i></div>
</div><!-- panel -->

<div class="signin" style="position:absolute; top:82%; left:5%; width:300px; background-color:transparent;">
    <div><img src="/images/logo_han.png" alt="" style="width:200px;"/></div>
</div><!-- panel -->
<div class="panel signin">
    <div class="panel-body" style="height:255px; width: 90%; margin: 0 auto;">
        <button class="w-btn w-btn-indigo" id="mvBtn2" style="font-size: 20px;" onclick="goIntra();">
            <a href="/indexB.do">캠스팟2.0</a>
        </button>
        <hr class="invisible">
    </div>
</div><!-- panel -->
<script>
    function goIntra() {
        location.href = "/indexB.do";
    }
    function goHome() {
        location.href = "http://www.camtic.or.kr/";
    }
</script>

</body>
</html>
