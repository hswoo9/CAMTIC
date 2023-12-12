<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:include page="/WEB-INF/jsp/template/camtic/common.jsp" flush="false"/>
</head>

<script type="text/javascript" src="/js/intra/login/hpLogin.js?v=1"></script>

<style>
    .signin{
        top: -4%;
        transform: none;
        background-color: transparent;
    }
    .panel{
        border: 0;
        border-radius: 2px;
        margin-bottom: 20px;
        background-color: #fff;
        position: relative;
        -webkit-box-shadow: none;
        box-shadow: none;
        margin-top:20px;
    }
    #sub{
        background-color: #fff;
    }
    .input-group-btn:first-child > .btn-group:not(:first-child) > .btn {
        border-bottom-left-radius: 0;
        border-top-left-radius: 0;
    }
    .input-group-addon:first-child {
        border-right: 0;
    }
    .btn-quirk {
        text-transform: uppercase;
        font-weight: 700;
        font-family: 'Noto Sans KR', sans-serif;
        letter-spacing: .5px;
    }
    .btn-success {
        background: linear-gradient(to right, #007bb0 0%,#1bb1de 100%);
        color: #ffffff;
        /*background-color: #259dab;*/
        border-color: transparent;
    }
    .btn {
        padding: 10px 12px 9px;
        -webkit-transition: all 0.2s ease-out 0s;
        -o-transition: all 0.2s ease-out 0s;
        transition: all 0.2s ease-out 0s;
    }
    .input-group .form-control {
        display: table-cell;
    }

    .btn-success:hover {
        color: #ffffff;
        background-color: #208a96;
        border-color: rgba(0, 0, 0, 0);
    }
    a {
        /*color: #259dab;*/
        color: #007bb0 ;
        text-decoration: none;
    }
    .btn-block {
        display: block;
        width: 100%;
    }
    .form-control {
        display: block;
        width: 100%;
        height: 38px;
        padding: 10px 12px;
        font-size: 12px;
        line-height: 1.42857143;
        color: #262b36;
        background-color: #fcfcfd;
        background-image: none;
        border: 1px solid #bdc3d1;
        border-radius: 2px;
        -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
        box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
        -webkit-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
        -o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
        transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
    }
    .input-group-btn:last-child > .btn-group:not(:last-child) > .btn {
        border-bottom-right-radius: 0;
        border-top-right-radius: 0;
    }
    .input-group-addon:first-child {
        border-right: 0;
    }
    .input-group-btn {
        width: 1%;
        white-space: nowrap;
        vertical-align: middle;
    }
    .input-group .form-control {
        display: table-cell;
    }

    #sub #content{width:1280px; margin:0 auto;}
    @media(max-width:1024px){
        #sub #content{margin-left:0px; padding:0;}
    }
    @media(max-width:1420px){
        #sub #content{width:100%;}
    }
</style>
<body>
<div id="wrap">
    <jsp:include page="/WEB-INF/jsp/template/camtic/head.jsp" flush="false"/>
    <div id="sub">
        <div class="inner">
            <div id="content">
                <div class="__drone3 m0" style="justify-content: center; text-align: center;">
                    <div class="foot" style="margin-top: 120px;">
                        <div class="__icoBox1" style="border:1px solid #000; width:70%; height:350px; text-align: center; justify-content: space-between;" >

                                <div class="panel signin">
                                    <div class="panel-body" style="height:255px; width: 90%; margin: 0 auto;">
                                        <form name="loginForm" id="loginForm" method="post" action="#LINK">
                                            <div class="form-group mb10" style="text-align:center; margin-top:30px;">
                                                <h3 style="font-size:25px; font-weight: 600;">로그인</h3>
                                            </div>
                                            <div class="form-group mb10" style="margin-top:30px;">
                                                <div class="input-group">
                                                    <input type="text" id="id" name="id" class="form-control" placeholder="아이디를 입력하세요." value="master">
                                                </div>
                                            </div>
                                            <div class="form-group mb10">
                                                <div class="input-group" style="margin-top:20px;">
                                                    <input type="password" id="password" name="password" class="form-control" placeholder="비밀번호를 입력하세요." value="******">
                                                </div>
                                            </div>
                                            <div>
                                                <button class="btn btn-success btn-quirk btn-block" style="font-size:16px; margin-top:20px;" id="mvBtn" onclick="hpLogin.actionLogin();">확인</button>
                                            </div>
                                            <div style="display:flex; margin-top:20px; justify-content: space-between;">
                                                <div><input type="checkbox" name="" value="" style="margin-right:5px;"><a href="" class="forgot">아이디저장</a></div>
                                                <div><a href="" class="forgot">비밀번호찾기</a></div>
                                            </div>
                                            <input type="hidden" name="message" id="message" value="${message}" />
                                        </form>
                                    </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
    <jsp:include page="/WEB-INF/jsp/template/camtic/foot.jsp" flush="false"/>
</div>
<script>
    hpLogin.init();
</script>
</body>
</html>