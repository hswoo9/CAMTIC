<%--
  Created by IntelliJ IDEA.
  User: user
  Date: 2023-01-10
  Time: 오후 5:11
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">
    <!--<link rel="shortcut icon" href="/images/favicon.png" type="image/png">-->

    <title>CAM's Pot - CAMTIC</title>

    <link rel="stylesheet" href="/lib/Hover/hover.css">
    <link rel="stylesheet" href="/lib/fontawesome/css/font-awesome.css">
    <link rel="stylesheet" href="/lib/weather-icons/css/weather-icons.css">
    <link rel="stylesheet" href="/lib/ionicons/css/ionicons.css">
    <link rel="stylesheet" href="/lib/jquery-toggles/toggles-full.css">
    <link rel="stylesheet" href="/lib/morrisjs/morris.css">

    <link rel="stylesheet" href="/css/style.css">
    <link rel="stylesheet" href="/css/quirk.css">

    <script src="/lib/modernizr/modernizr.js"></script>

    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
    <script src="/lib/html5shiv/html5shiv.js"></script>
    <script src="/lib/respond/respond.src.js"></script>
    <![endif]-->

    <script src="/lib/jquery/jquery.js"></script>
    <script src="/lib/jquery-ui/jquery-ui.js"></script>
    <script src="/lib/bootstrap/js/bootstrap.js"></script>
    <script src="/lib/jquery-toggles/toggles.js"></script>

    <script src="/lib/morrisjs/morris.js"></script>
    <script src="/lib/raphael/raphael.js"></script>

    <script src="/lib/flot/jquery.flot.js"></script>
    <script src="/lib/flot/jquery.flot.resize.js"></script>
    <script src="/lib/flot-spline/jquery.flot.spline.js"></script>

    <script src="/lib/jquery-knob/jquery.knob.js"></script>

    <script src="/js/quirk.js"></script>
    <script src="/js/dashboard.js"></script>



    <script src="https://code.jquery.com/jquery-3.6.0.js" integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk=" crossorigin="anonymous"></script>
    <style>
        .boxCss{width:190px; height:90px; color:#fff; background-color:#259dab; text-align:center;}
        .boxCss:hover{background-image: linear-gradient(to right, #259dab 0%, #2574ab 100%);}
        .popupTable th{padding:5px!important; vertical-align: middle!important; text-align: center; background-color: #bdc3d1ad;}
    </style>
</head>

<body>

<header>
    <div class="headerpanel">
        <a href="/indexB.do"><div class="logopanel"></div></a>

        <div class="headerbar" style="width:1460px;">
            <a id="menuToggle" class="menutoggle"><i class="fa fa-bars"></i></a>
            <div class="searchpanel">
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="검색하세요">
                    <span class="input-group-btn">
            <button class="btn btn-default" type="button"><i class="fa fa-search"></i></button>
          </span>
                </div><!-- input-group -->
            </div>

            <div class="header-right">
                <ul class="headermenu">
                    <li>
                        <div id="noticePanel" class="btn-group">
                            <a href="/user/organizationChart.do">
                                <button class="btn btn-notice" data-toggle="modal" data-target="#myModal" style="float:left; font-size:22px;">
                                    <i class="fa fa-sitemap"></i>
                                </button>
                            </a>
                            <!-- Modal -->
                            <%--<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                                <div class="modal-dialog modal-lg">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                            <h4 class="modal-title" id="myModalLabel">조직도</h4>
                                        </div>
                                        <div class="modal-body">
                                            <img src="/images/photos/221102_organization_chart.png" alt="organization chart" style="width:872px;">
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-default" data-dismiss="modal">닫기</button>
                                        </div>
                                    </div>
                                </div>
                            </div>--%>
                            <button class="btn btn-notice alert-notice" data-toggle="dropdown" style="border-left:0;">
                                <i class="fa fa-bell-o"></i>
                            </button>
                            <div id="noticeDropdown" class="dropdown-menu dm-notice pull-right">
                                <div role="tabpanel">
                                    <!-- Nav tabs -->
                                    <ul class="nav nav-tabs nav-justified" role="tablist">
                                        <li class="active"><a data-target="#notification" data-toggle="tab">알림1</a></li>
                                        <li><a data-target="#reminders" data-toggle="tab">알림2</a></li>
                                    </ul>

                                    <!-- Tab panes -->
                                    <div class="tab-content">
                                        <div role="tabpanel" class="tab-pane active" id="notification">
                                            <ul class="list-group notice-list">
                                                <li class="list-group-item unread">
                                                    <div class="row">
                                                        <div class="col-xs-2">
                                                            <i class="fa fa-envelope"></i>
                                                        </div>
                                                        <div class="col-xs-10">
                                                            <h5><a href="">인사발령</a></h5>
                                                            <small>2022.01.05</small>
                                                            <span>인사발령에관하여 알려드립니다</span>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="list-group-item unread">
                                                    <div class="row">
                                                        <div class="col-xs-2">
                                                            <i class="fa fa-user"></i>
                                                        </div>
                                                        <div class="col-xs-10">
                                                            <h5><a href="">인사발령</a></h5>
                                                            <small>2022.01.05</small>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="list-group-item">
                                                    <div class="row">
                                                        <div class="col-xs-2">
                                                            <i class="fa fa-user"></i>
                                                        </div>
                                                        <div class="col-xs-10">
                                                            <h5><a href="">인사발령</a></h5>
                                                            <small>2022.01.05</small>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="list-group-item">
                                                    <div class="row">
                                                        <div class="col-xs-2">
                                                            <i class="fa fa-thumbs-up"></i>
                                                        </div>
                                                        <div class="col-xs-10">
                                                            <h5><a href="">인사발령</a></h5>
                                                            <small>2022.01.05</small>
                                                            <span>인사발령에관하여 알려드립니다</span>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="list-group-item">
                                                    <div class="row">
                                                        <div class="col-xs-2">
                                                            <i class="fa fa-comment"></i>
                                                        </div>
                                                        <div class="col-xs-10">
                                                            <h5><a href="">인사발령</a></h5>
                                                            <small>2022.01.05</small>
                                                            <span>인사발령에관하여 알려드립니다</span>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                            <a class="btn-more" href="">더보기 <i class="fa fa-long-arrow-right"></i></a>
                                        </div><!-- tab-pane -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="btn-group">
                            <button type="button" class="btn btn-logged" data-toggle="dropdown">
                                김캠틱님 환영합니다!
                                <!--<span class="caret"></span>-->
                            </button>
                            <!--<ul class="dropdown-menu pull-right">
                              <li><a href="#"><i class="glyphicon glyphicon-user"></i>마이페이지</a></li>
                              <li><a href="#"><i class="glyphicon glyphicon-log-out"></i>로그아웃</a></li>
                            </ul>-->
                        </div>
                    </li>
                    <li class="tooltips" data-toggle="tooltip" title="Log Out" style="margin-top:13px; font-size:25px;"><a href="/login.do"><i class="fa fa-sign-out"></i></a></li>
                </ul>
            </div><!-- header-right -->
        </div><!-- headerbar -->
    </div><!-- header-->
</header>

<section>

    <div class="leftpanel">
        <div class="leftpanelinner">

            <jsp:include page="/WEB-INF/jsp/template/nav.jsp" flush="false"/>

        </div><!-- leftpanelinner -->
    </div><!-- leftpanel -->

    <div class="mainpanel">

        <!--<div class="pageheader">
          <h2><i class="fa fa-home"></i> Dashboard</h2>
        </div>-->

        <div class="contentpanel">

            <div class="row">
                <div class="col-md-10 col-lg-10 dash-left">
                    <div class="row panel-quick-page">
                        <div style="display:flex; justify-content: space-between;">
                            <div class="boxCss">
                                <i class="fa fa-shopping-cart" style="font-size:40px;padding:11px;"></i><br>캠프로젝트 매니저
                            </div>
                            <div class="boxCss">
                                <i class="fa fa-lightbulb-o" style="font-size:40px;padding:11px;"></i><br>캠아이템
                            </div>
                            <div class="boxCss">
                                <i class="fa fa-calendar-o" style="font-size:40px;padding:11px;"></i><br>캠매니저2.0
                            </div>
                            <div class="boxCss">
                                <i class="fa fa-users" style="font-size:40px;padding:11px;"></i><br>캠CRM2.0
                            </div>
                            <a href="/subHoliday/subHolidayApplication.do">
                                <div class="boxCss">
                                   <i class="fa fa-location-arrow" style="font-size:40px;padding:11px;"></i><br>캠인사이드2.0
                                </div>
                            </a>
                            <div class="boxCss">
                                <i class="fa fa-pencil" style="font-size:40px;padding:11px;"></i><br>캠퍼스2.0
                            </div>
                            <div class="boxCss">
                                <i class="fa fa-cloud-upload" style="font-size:40px;padding:11px;"></i><br>캠어취브2.0
                            </div>
                        </div>
                    </div>
                    <%--<div class="row panel-quick-page">
                        <div style="display:flex; justify-content: space-evenly;">
                            <img src="/images/GoCategory1_1.jpg">
                            <img src="/images/GoCategory1_2.jpg">
                            <img src="/images/GoCategory1_3.jpg">
                            <img src="/images/GoCategory1_4.jpg">
                            <img src="/images/GoCategory2_1.jpg">
                            <img src="/images/GoCategory2_2.jpg">
                            <img src="/images/GoCategory2_3.jpg">
                            <img src="/images/GoCategory3_1.jpg">
                            <img src="/images/GoCategory3_2.jpg">
                            <img src="/images/GoCategory3_3.jpg">
                            <img src="/images/GoCategory3_4.jpg">
                        </div>
                    </div>--%>

                    <%--<div class="card">
                        <div class="panel panel-announcement">
                            <img src="/images/test.png">
                        </div><!-- panel -->
                    </div>--%>

                    <div class="card">
                        <!-- Nav tabs -->
                        <ul class="nav nav-tabs nav-justified">
                            <li class="active"><a href="#tab1" data-toggle="tab"><strong>공지사항</strong></a></li>
                            <li><a href="#tab2" data-toggle="tab"><strong>업무보고</strong></a></li>
                            <li><a href="#tab3" data-toggle="tab"><strong>업무매뉴얼</strong></a></li>
                            <li><a href="#tab4" data-toggle="tab"><strong>홍보자료</strong></a></li>
                        </ul>

                        <!-- Tab panes -->
                        <div class="tab-content mb20">
                            <div class="tab-pane active" id="tab1">
                                <div class="panel-body" style="padding:0 10px;">
                                    <ul class="nav nav-quirk" style="margin:0;">
                                        <li style="border-top:0;"><p style="padding: 10px 10px 0px;">2022년 연차휴가 사용 촉진 안내(2차)<span style="position:absolute; right:10px;">2022/11/10</span></p></li>
                                        <li><p style="padding: 10px 10px 0px;">2022년 캠틱클러스터 워크숍 세부일정 안내(11.3~4)<span style="position:absolute; right:10px;">2022/10/31</span></p></li>
                                        <li><p style="padding: 10px 10px 0px;">인사발령 공고(2022-23호)<span style="position:absolute; right:10px;">2022/10/28</span></p></li>
                                        <li style="border-bottom:0;"><p style="padding: 10px 10px 0px;">전주혁신창업허브 승강기 정기점검 실시(10.31.(월) 법정의무)<span style="position:absolute; right:10px;">2022/10/26</span></p></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="tab-pane" id="tab2">
                                <div class="panel-body" style="padding:0 10px;">
                                    <ul class="nav nav-quirk" style="margin:0;">
                                        <li style="border-top:0;"><p style="padding: 10px 10px 0px;">	캠틱 주간업무 보고(22.11.07. ~ 22.11.11.)<span style="position:absolute; right:10px;">2022/11/10</span></p></li>
                                        <li><p style="padding: 10px 10px 0px;">	2022년 11월 정기월례회의 자료<span style="position:absolute; right:10px;">2022/10/31</span></p></li>
                                        <li><p style="padding: 10px 10px 0px;">	2022년 10월 4Re's Leader 소통회의<span style="position:absolute; right:10px;">2022/10/28</span></p></li>
                                        <li style="border-bottom:0;"><p style="padding: 10px 10px 0px;">	캠틱 주간업무 보고(22.10.24. ~ 22.10.28.)<span style="position:absolute; right:10px;">2022/10/26</span></p></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="tab-pane" id="tab3">
                                <div class="panel-body" style="padding:0 10px;">
                                    <ul class="nav nav-quirk" style="margin:0;">
                                        <li style="border-top:0;"><p style="padding: 10px 10px 0px;">	캠틱종합기술원 규정집(2022.11.01. 기준)<span style="position:absolute; right:10px;">2022/11/10</span></p></li>
                                        <li><p style="padding: 10px 10px 0px;">예산변경매뉴얼(개정)<span style="position:absolute; right:10px;">2022/10/31</span></p></li>
                                        <li><p style="padding: 10px 10px 0px;">사업비 반납매뉴얼<span style="position:absolute; right:10px;">2022/10/28</span></p></li>
                                        <li style="border-bottom:0;"><p style="padding: 10px 10px 0px;">장비사용일지(2022.04.11. 개정)<span style="position:absolute; right:10px;">2022/10/26</span></p></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="tab-pane" id="tab4">
                                <div class="panel-body" style="padding:0 10px;">
                                    <ul class="nav nav-quirk" style="margin:0;">
                                        <li style="border-top:0;"><p style="padding: 10px 10px 0px;">캠틱종합기술원 소개자료(PPT)(2022.11.09.)<span style="position:absolute; right:10px;">2022/11/10</span></p></li>
                                        <li><p style="padding: 10px 10px 0px;">	캠틱종합기술원 소개자료(PPT)(2022.10.18.)<span style="position:absolute; right:10px;">2022/10/31</span></p></li>
                                        <li><p style="padding: 10px 10px 0px;">	캠틱종합기술원 소개자료(PPT)(2022.09.07.)<span style="position:absolute; right:10px;">2022/10/28</span></p></li>
                                        <li style="border-bottom:0;"><p style="padding: 10px 10px 0px;">	캠틱종합기술원 소개자료(PPT)(2022.06.16.)<span style="position:absolute; right:10px;">2022/10/26</span></p></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card">
                        <div class="col-sm-8 col-md-8" style="padding-left:0!important;">
                            <div class="card">
                                <div class="panel panel-inverse">
                                    <div class="panel-heading">
                                        <h3 class="panel-title">오픈스터디</h3>
                                    </div>
                                    <div class="panel-body" style="padding:0 10px;">
                                        <ul class="nav nav-quirk" style="margin:0;">
                                            <li style="border-top:0;"><p style="padding: 10px 10px 0px;">법인 경영지표 산출 Guide<span style="position:absolute; right:10px;">2022/07/22 10:00~11:00</span></p></li>
                                            <li><p style="padding: 10px 10px 0px;">[숨은 고수의 쉽고, 빠른 노하우 전수 2탄]-데이터 통계/분석(엑셀 활용)<span style="position:absolute; right:10px;">2022/06/21 13:30~15:30</span></p></li>
                                            <li style="border-bottom:0;"><p style="padding: 10px 10px 0px;">사업비사용시스템 기본설정 메뉴얼 설명회<span style="position:absolute; right:10px;">2022/05/20 14:00~15:00</span></p></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-2 col-sm-2" style="padding-right:0;">
                            <div class="panel">
                                <div class="panel-heading" style="background-color: #505b72; padding:25px;">
                                    <h3 class="panel-title" style="color:#fff; text-align:center; font-weight:600;"><a href="#">법인일정</a></h3>
                                </div>
                            </div><!-- panel -->
                        </div>
                        <div class="col-md-2 col-sm-2" style="padding-right:0;">
                            <div class="panel">
                                <div class="panel-heading" style="background-color: #505b72; padding:25px;">
                                    <h3 class="panel-title" style="color:#fff; text-align:center; font-weight:600;"><a href="#">직원일정</a></h3>
                                </div>
                            </div><!-- panel -->
                        </div>
                        <div class="col-md-2 col-sm-2" style="padding-right:0;">
                            <div class="panel">
                                <div class="panel-heading" style="background-color: #505b72; padding:25px;">
                                    <h3 class="panel-title" style="color:#fff; text-align:center; font-weight:600;"><a href="#">법인일정</a></h3>
                                </div>
                            </div><!-- panel -->
                        </div>
                        <div class="col-md-2 col-sm-2" style="padding-right:0;">
                            <div class="panel">
                                <div class="panel-heading" style="background-color: #505b72; padding:25px; margin-bottom:35px;">
                                    <h3 class="panel-title" style="color:#fff; text-align:center; font-weight:600;"><a href="#">직원일정</a></h3>
                                </div>
                            </div><!-- panel -->
                        </div>
                    </div>

                    <div class="col-md-12 col-lg-12" style="display:flex; justify-content: space-around; padding:0;">

                        <div style="width:110px;">
                            <div class="panel panel-primary">
                                <div class="panel-heading" style="padding:15px 0;">
                                    <h3 class="panel-title" style="text-align:center;">근무시간</h3>
                                </div>
                                <div class="panel-body timeBox">
                                    <p><strong>362:43</strong></p>
                                </div>
                            </div><!-- panel -->
                        </div>
                        <div style="width:110px;">
                            <div class="panel panel-primary">
                                <div class="panel-heading" style="padding:15px 0;">
                                    <h3 class="panel-title" style="text-align:center;">연가</h3>
                                </div>
                                <div class="panel-body timeBox">
                                    <p><strong>0명</strong></p>
                                </div>
                            </div><!-- panel -->
                        </div>
                        <div style="width:110px;">
                            <div class="panel panel-primary">
                                <div class="panel-heading" style="padding:15px 0;">
                                    <h3 class="panel-title" style="text-align:center;">오전반차</h3>
                                </div>
                                <div class="panel-body timeBox">
                                    <p><strong>0명</strong></p>
                                </div>
                            </div><!-- panel -->
                        </div>
                        <div style="width:110px;">
                            <div class="panel panel-primary">
                                <div class="panel-heading" style="padding:15px 0;">
                                    <h3 class="panel-title" style="text-align:center;">오후반차</h3>
                                </div>
                                <div class="panel-body timeBox">
                                    <p><strong>0명</strong></p>
                                </div>
                            </div><!-- panel -->
                        </div>
                        <div style="width:110px;">
                            <div class="panel panel-primary">
                                <div class="panel-heading" style="padding:15px 0;">
                                    <h3 class="panel-title" style="text-align:center;">경조휴가</h3>
                                </div>
                                <div class="panel-body timeBox">
                                    <p><strong>0명</strong></p>
                                </div>
                            </div><!-- panel -->
                        </div>
                        <div style="width:110px;">
                            <div class="panel panel-primary">
                                <div class="panel-heading" style="padding:15px 0;">
                                    <h3 class="panel-title" style="text-align:center;">병가</h3>
                                </div>
                                <div class="panel-body timeBox">
                                    <p><strong>0명</strong></p>
                                </div>
                            </div><!-- panel -->
                        </div>
                        <div style="width:110px;">
                            <div class="panel panel-primary">
                                <div class="panel-heading" style="padding:15px 0;">
                                    <h3 class="panel-title" style="text-align:center;">공가</h3>
                                </div>
                                <div class="panel-body timeBox">
                                    <p><strong>0명</strong></p>
                                </div>
                            </div><!-- panel -->
                        </div>
                        <div style="width:110px;">
                            <div class="panel panel-primary">
                                <div class="panel-heading" style="padding:15px 0;">
                                    <h3 class="panel-title" style="text-align:center;">출산휴가</h3>
                                </div>
                                <div class="panel-body timeBox">
                                    <p><strong>0명</strong></p>
                                </div>
                            </div><!-- panel -->
                        </div>
                        <div style="width:110px;">
                            <div class="panel panel-primary">
                                <div class="panel-heading" style="padding:15px 0;">
                                    <h3 class="panel-title" style="text-align:center;">선택근무</h3>
                                </div>
                                <div class="panel-body timeBox">
                                    <p><strong>0명</strong></p>
                                </div>
                            </div><!-- panel -->
                        </div>
                        <div style="width:110px;">
                            <div class="panel panel-primary">
                                <div class="panel-heading" style="padding:15px 0;">
                                    <h3 class="panel-title" style="text-align:center;">츨장</h3>
                                </div>
                                <div class="panel-body timeBox">
                                    <p><strong>0명</strong></p>
                                </div>
                            </div><!-- panel -->
                        </div>
                        <div style="width:110px;">
                            <div class="panel panel-primary">
                                <div class="panel-heading" style="padding:15px 0;">
                                    <h3 class="panel-title" style="text-align:center;">대체휴가</h3>
                                </div>
                                <div class="panel-body timeBox">
                                    <p><strong>0명</strong></p>
                                </div>
                            </div><!-- panel -->
                        </div>
                    </div>

                    <div class="mainFooter" style="text-align:center; clear:both;margin-top: 456px;">
                        <p style="margin:0;">(사)캠틱종합기술원 / 전북 전주시 덕진구 유상로 67 (우)54852</p>
                        <p>Tel : 063-219-0300 / Fax : 063-219-0303 Copyright[c] 2006 CAMTIC All rights Reserved camtic@camtic.or.kr</p>
                    </div>
                </div><!-- col-md-9 -->
                <div class="col-md-3 col-lg-2 dash-right" style="position:relative;">
                    <jsp:include page="/WEB-INF/jsp/template/aside.jsp" flush="false"/>
                </div>
            </div><!-- row -->
        </div><!-- contentpanel -->
    </div><!-- mainpanel -->
</section>
<script type="text/javascript">
    var today = new Date();
    var hours = today.getHours();
    var minutes = today.getMinutes();
    var seconds = today.getSeconds();
    var todayTime = hours + ' : ' + minutes + ' : ' + seconds;
    console.log(todayTime);
    //function goWork(){
        $('#goWork').click(function() {
            if( $(this).html() == '출근' ) {
                $(this).html(todayTime);
                $(this).css("background-color", "#5bc0de");
                $(this).css("color", "#FFF");
                $('#offWork').html('퇴근');
                $('#offWork').css("background-color", "#F0F0F0");
                $('#offWork').css("color", "#696C74");
            }
            else {
                $(this).html('출근');
            }
        });
    //}

        $('#offWork').click(function() {
            if( $(this).html() == '퇴근' ) {
                $(this).html(todayTime);
                $(this).css("background-color", "#5bc0de");
                $(this).css("color", "#FFF");
                $('#goWork').html('출근');
                $('#goWork').css("background-color", "#F0F0F0");
                $('#goWork').css("color", "#696C74");
            }
            else {
                $(this).html('퇴근');
            }
        });

</script>
</body>



</html>


