<%--
  Created by IntelliJ IDEA.
  User: user
  Date: 2023-01-10
  Time: 오후 5:11
  To change this template use File | Settings | File Templates.
--%>
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

    <title>CAM's Pot - CAMTIC</title>

    <link rel="stylesheet" href="/lib/Hover/hover.css">
    <link rel="stylesheet" href="/lib/fontawesome/css/font-awesome.css">
    <link rel="stylesheet" href="/lib/weather-icons/css/weather-icons.css">
    <link rel="stylesheet" href="/lib/ionicons/css/ionicons.css">
    <link rel="stylesheet" href="/lib/jquery-toggles/toggles-full.css">
    <link rel="stylesheet" href="/lib/morrisjs/morris.css">

    <link rel="stylesheet" href="/css/quirk.css">
    <link rel="stylesheet" href="/css/style.css">

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

    <script src="/lib/raphael/raphael.js"></script>

    <script src="/lib/flot/jquery.flot.js"></script>
    <script src="/lib/flot/jquery.flot.resize.js"></script>
    <script src="/lib/flot-spline/jquery.flot.spline.js"></script>

    <script src="/lib/jquery-knob/jquery.knob.js"></script>

    <script src="https://code.jquery.com/jquery-3.6.0.js" integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk=" crossorigin="anonymous"></script>

    <script type="text/javascript" src="<c:url value='/js/kendoui/jquery.min.js'/>"></script>
    <script type="text/javascript" src="/js/intra/common/common.js"></script>

    <style>
        .boxCss{width:190px; height:90px; color:#fff; background-color:#259dab; text-align:center;}
        .boxCss:hover{background-image: linear-gradient(to right, #259dab 0%, #2574ab 100%);}
        .panel {height: 833px;}

        /* 조직도 */
        .organizationCard{background-color:#fafafa; font-family: 'Noto Sans KR', sans-serif;}
        .organization ._header{position:relative; min-width:1500px;}
        .organization {width:1450px; margin:50px auto; transform: translateX(-7%);}
        .organization .btn {display: block; text-align: left; border: 1px solid #222; background: #fff; position: relative; margin:0 auto; padding: 0.5rem!important; border-radius:0;}
        .organization .type_1 {width: 100px; height: 100px; color: #222; background: #fff; text-align: center; border-radius: 50%; /* box-shadow: 0 2px 6px #234791; */
            font-size: 18px; font-weight: 600; border: 3px solid #091851;}
        .organization .type_2 {width: 122px; height: 50px; color: #222; background-color: #fff; text-align: center; /* box-shadow: 0 2px 6px #234791; */
            font-size: 13px; font-weight: 600;}
        .organization .type_4 {width: 50px; height: 150px; color: #222; background-color: #fff; text-align: center; /* box-shadow: 0 2px 6px #315DA9; */
            font-size: 12px; font-weight: 600;padding:0 17px!important;}
        .organization .item {position: relative;}
        .organization .item_1:before {content: ''; position: absolute; left: 50%; top: calc(100% + 1px); z-index: 0; transform: translateX(-50%); width: 1px; height: 30px; background: #222; }
        .organization .item_2 {height: 1px; width: 0; background-color: #222; position: absolute; left: 50%; top:113%; z-index: 0; transform: translateX(-50%);}
        .organization .item_3:before {content: ''; position: absolute; left: 50%; top: -22%; z-index: 0; transform: translateX(-50%); width: 1px; height: 32px; background: #222; }
        .organization .item_7 {height: 30px; width: 1px; background-color: #222; position: absolute; left: 50%; z-index: 0; transform: translateX(-50%);}
        .organization .item_8 {height: 60px; width: 1px; background-color: #222; position: absolute; left: 50%; z-index: 0; transform: translateX(-50%);}
        .organization .item_9:before {content: ''; position: absolute; left: 147%; top: calc(50% + 1px); z-index: 0; transform: translateX(-50%); width: 98px; height: 1px; background: #222; }
        .organization .item_10:before {content: ''; position: absolute; left: -43%; top: calc(50% + 1px); z-index: 0; transform: translateX(-50%); width: 90px; height: 1px; background: #222; }
        .organization .item_11:before {content: ''; position: absolute; left: 50%; top:-62%; z-index: 0; transform: translateX(-50%); width: 1px; height: 30px; background: #222; }
        .organization .item_11:after {content: ''; position: absolute; left: 50%; top:108%; z-index: 0; transform: translateX(-50%); width: 1px; height: 30px; background: #222; }
        .organization .item_12{height: 1px; width: 720px; background-color: #222; position: absolute; left: 26%; top:42%; z-index: 0; transform: translateX(-50%);}
        .organization .item_13{height: 30px; width: 1px; background-color: #222; position: absolute; left: 50%; z-index: 0; transform: translateX(-50%); top:42%;}
        .organization .item_14{height: 365px; width: 1px; background-color: #222; position: absolute; left: 2%; z-index: 0; transform: translateX(-50%); top:42%;}
        .organization .item_15{height: 1px; width: 500px; background-color: #222; position: absolute; left: 50%; top:221px; z-index: 0; transform: translateX(-50%);}
        .organization .item_16:before {content: ''; position: absolute; left: 50%; top:-261%; z-index: 0; transform: translateX(-50%); width: 1px; height: 124px; background: #222; }
        .organization .item_17{height: 1px; width: 1000px; background-color: #222; position: absolute; left: 50%; top:276px; z-index: 0; transform: translateX(-50%);}
        .organization .item_18:before {content: ''; position: absolute; left: 50%; top:-72%; z-index: 0; transform: translateX(-50%); width: 1px; height: 30px; background: #222; }
        .organization .item_18:after {content: ''; position: absolute; left: 50%; top:105%; z-index: 0; transform: translateX(-50%); width: 1px; height: 104px; background: #222; }
        .organization .item_19:before {content: ''; position: absolute; left: 50%; top:-225%; z-index: 0; transform: translateX(-50%); width: 1px; height: 107px; background: #222; }
        .organization .item_19:after {content: ''; position: absolute; left: 50%; top:104%; z-index: 0; transform: translateX(-50%); width: 1px; height: 30px; background: #222; }
        .organization .item_20:after {content: ''; position: absolute; left: 50%; top:103%; z-index: 0; transform: translateX(-50%); width: 1px; height: 104px; background: #222; }
        .organization .item_21{height: 1px; width: 500px; background-color: #222; position: absolute; left: 50%; top:108px; z-index: 0; transform: translateX(-50%);}
        .organization .item_22{height: 1px; width: 63px; background-color: #222; position: absolute; left: 16.6%; top: 554px; z-index: 0; transform: translateX(-50%);}
        .organization .item_23{height: 1px; width: 63px; background-color: #222; position: absolute; left: 27.8%; top: 554px; z-index: 0; transform: translateX(-50%);}
        .organization .item_24{height: 1px; width: 121px; background-color: #222; position: absolute; left: 38.85%; top: 554px; z-index: 0; transform: translateX(-50%);}
        .organization .item_25{height: 1px; width: 63px; background-color: #222; position: absolute; left: 50%; top: 554px; z-index: 0; transform: translateX(-50%);}
        .organization .item_26{height: 1px; width: 63px; background-color: #222; position: absolute; left: 83.2%; top: 554px; z-index: 0; transform: translateX(-50%);}
        .organization .item_27:before {content: ''; position: absolute; left: 50%; top:-21%; z-index: 0; transform: translateX(-50%); width: 1px; height: 30px; background: #222; }

        .organization ._body dl dt {display: inline-block;}
        .organization ._body dl dd {display: inline-block;}
        .directors{margin-top:30px!important;}
        .auditor{margin-top:30px!important;}
        .general{margin-top:71px!important; left:-323%;}

        .miniBoxYellow{width: 5px; height: 48px; background-color: #F6CF7F; position: absolute; top: 0; left: 0;}
        .miniSubBoxYellow{width: 48px; height: 7px; background-color: #F6CF7F; position: absolute; top: 0; left: 0;}
        .miniBoxBlue{width: 5px; height: 48px; background-color: #183479; position: absolute; top: 0; left: 0;}
        .miniSubBoxBlue{width: 48px; height: 7px; background-color: #183479; position: absolute; top: 0; left: 0;}
        .miniBoxGreen{width: 5px; height: 48px; background-color: #215F26; position: absolute; top: 0; left: 0;}
        .miniSubBoxGreen{width: 48px; height: 7px; background-color: #215F26; position: absolute; top: 0; left: 0;}
        .miniBoxRed{width: 5px; height: 48px; background-color: #B43527; position: absolute; top: 0; left: 0;}
        .miniSubBoxRed{width: 48px; height: 7px; background-color: #B43527; position: absolute; top: 0; left: 0;}
        .miniBoxBrown{width: 5px; height: 48px; background-color: #6C3308; position: absolute; top: 0; left: 0;}
        .miniSubBoxBrown{width: 48px; height: 7px; background-color: #6C3308; position: absolute; top: 0; left: 0;}
        .miniBoxSky{width: 5px; height: 48px; background-color: #83AEE5; position: absolute; top: 0; left: 0;}
        .miniSubBoxSky{width: 48px; height: 7px; background-color: #83AEE5; position: absolute; top: 0; left: 0;}
        .miniBoxPeaGreen{width: 5px; height: 48px; background-color: #acfaac; position: absolute; top: 0; left: 0;}
        .miniSubBoxPeaGreen{width: 48px; height: 7px; background-color: #acfaac; position: absolute; top: 0; left: 0;}



        /* 직원상세보기 팝업 */
        .teamSubBox{margin-top:10px; display:flex;}
        .personalBox{width:135px; height:260px; border:1px solid #eee; margin:0 5px; position:relative; background-color:#fff;}
        .photoBox{width:100px; height:120px; border:1px solid #eee; margin:10px auto; border-radius:5px; background-color:#eee;}
        .photoName{position: absolute; font-size: 13px; top: 57%; left: 50%; transform: translate(-50%, -50%); font-weight: bold;}
        .contentBox {font-size:12px;position: absolute; left: 10px; top: 170px; line-height: 8px;}
        .organization_bg {position: fixed; top: 0; left: 0; width: 100%; height: 100%;}
        .window {position: relative;width: 100%;height: 100%;}
        .organization_popup {position: absolute;top: 30%;left: 11%; background-color: #ffffff; border-radius:10px;
            box-shadow: 0 2px 7px rgba(0, 0, 0, 0.6);width:auto;height:auto; padding:10px;}
        .show .organization_popup {transform: translate(-50%, 0%); transition: all 0.5s;}
        .pop-close{background: none;font-size: 30px;position: absolute;right: 20px; z-index: 6000;border: none;top: 2px; color: #fff;}
        .detailTitle{background-color: #234791; border-radius: 10px 10px 0 0; padding: 10px; font-size: 15px; font-weight: 600; color: #fff;}

        .shadow{position: fixed; left: 0;top: 0; background: rgba(0, 0, 0, 0.52); width: 100%; height: 100%; display: none}

        .vertical{writing-mode: vertical-rl; text-orientation: upright; transform: translate(-11%, 7%); letter-spacing: 2px;}

    </style>
</head>

<body>

<header>
    <div class="headerpanel">
        <a href="/indexB.do"><div class="logopanel"></div></a>
        <div class="headerbar">

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
                            <a href="/subHoliday/org.do">
                                <button class="btn btn-notice" data-toggle="modal" data-target="#myModal" style="float:left; font-size:22px;">
                                    <i class="fa fa-sitemap"></i>
                                </button>
                            </a>
                            <!-- Modal -->
                            <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                                <div class="modal-dialog modal-lg">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                            <h4 class="modal-title" id="myModalLabel">조직도</h4>
                                        </div>
                                        <div class="modal-body">
                                            <a href="/subHoliday/org.do"></a>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-default" data-dismiss="modal">닫기</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
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

            <!-- ################## LEFT PANEL PROFILE ################## -->



            <div class="leftpanel-userinfo collapse" id="loguserinfo">
                <h5 class="sidebar-title">Address</h5>
                <address>
                    4975 Cambridge Road
                    Miami Gardens, FL 33056
                </address>
                <h5 class="sidebar-title">Contact</h5>
                <ul class="list-group">
                    <li class="list-group-item">
                        <label class="pull-left">Email</label>
                        <span class="pull-right">me@themepixels.com</span>
                    </li>
                    <li class="list-group-item">
                        <label class="pull-left">Home</label>
                        <span class="pull-right">(032) 1234 567</span>
                    </li>
                    <li class="list-group-item">
                        <label class="pull-left">Mobile</label>
                        <span class="pull-right">+63012 3456 789</span>
                    </li>
                    <li class="list-group-item">
                        <label class="pull-left">Social</label>
                        <div class="social-icons pull-right">
                            <a href="#"><i class="fa fa-facebook-official"></i></a>
                            <a href="#"><i class="fa fa-twitter"></i></a>
                            <a href="#"><i class="fa fa-pinterest"></i></a>
                        </div>
                    </li>
                </ul>
            </div><!-- leftpanel-userinfo -->



            <div class="tab-content">

                <!-- ################# MAIN MENU ################### -->

                <div class="tab-pane active" id="mainmenu">
                    <h5 class="sidebar-title">CAM'S POT</h5>
                    <ul class="nav nav-pills nav-stacked nav-quirk">
                        <li class="active"><a href="#"><i class="fa fa-home"></i> <span>공지사항</span></a></li>
                        <li><a href="#"><i class="fa fa-cube"></i> <span>업무보고</span></a></li>
                        <li><a href="#"><i class="fa fa-cube"></i> <span>제안제도</span></a></li>
                        <li><a href="#"><i class="fa fa-cube"></i> <span>오픈스터디</span></a></li>
                        <li><a href="#"><i class="fa fa-cube"></i> <span>직원일정</span></a></li>
                        <li><a href="#"><i class="fa fa-cube"></i> <span>설문조사</span></a></li>
                        <li><a href="#"><i class="fa fa-cube"></i> <span>전산보완요청</span></a></li>
                        <li><a href="#"><i class="fa fa-cube"></i> <span>홍보협조요청</span></a></li>
                    </ul>

                    <h5 class="sidebar-title">캠틱자료</h5>
                    <ul class="nav nav-pills nav-stacked nav-quirk">
                        <li class="nav-parent">
                            <a href=""><i class="fa fa-check-square"></i> <span>캠인사이드</span></a>
                            <ul class="children">
                                <li><a href="/subHoliday/subHolidayApplication.do">휴가신청</a></li>
                                <li><a href="/subHoliday/org.do">조직도</a></li>
                                <li><a href="#">휴가자동설정</a></li>
                                <li><a href="#">휴가생성기준설정</a></li>
                            </ul>
                        </li>
                        <li class="nav-parent"><a href=""><i class="fa fa-suitcase"></i> <span>캠아이템</span></a>
                            <ul class="children">
                                <li><a href="#">캠아이템</a></li>
                                <li><a href="#">캠아이템</a></li>
                                <li><a href="#">캠아이템</a></li>
                            </ul>
                        </li>
                        <li class="nav-parent"><a href=""><i class="fa fa-th-list"></i> <span>캠매니저</span></a>
                            <ul class="children">
                                <li><a href="#">캠매니저</a></li>
                                <li><a href="#">캠매니저</a></li>
                                <li><a href="#">캠매니저</a></li>
                                <li><a href="#">캠매니저</a></li>
                            </ul>
                        </li>
                        <li class="nav-parent"><a href=""><i class="fa fa-file-text"></i> <span>캠퍼스</span></a>
                            <ul class="children">
                                <li><a href="#">캠퍼스</a></li>
                                <li><a href="#">캠퍼스</a></li>
                                <li><a href="#">캠퍼스</a></li>
                                <li><a href="#">캠퍼스</a></li>
                            </ul>
                        </li>
                        <li class="nav-parent"><a href=""><i class="fa fa-file-text"></i> <span>캠어취브</span></a>
                            <ul class="children">
                                <li><a href="#">캠어취브</a></li>
                                <li><a href="#">캠어취브</a></li>
                            </ul>
                        </li>
                    </ul>
                </div><!-- tab-pane -->

                <!-- ######################## EMAIL MENU ##################### -->



            </div><!-- tab-content -->

        </div><!-- leftpanelinner -->
    </div><!-- leftpanel -->

    <div class="mainpanel">

        <!--<div class="pageheader">
          <h2><i class="fa fa-home"></i> Dashboard</h2>
        </div>-->

        <div class="contentpanel" style="width:1700px;">

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

                    <div class="panel">
                        <div class="panel-body">
                                <div class="chart __layout pt pb mop" style="width:1300px; margin:0 auto;">
                                    <div class="inner">
                                        <div class="organization">
                                            <div class="_header">
                                                <dl>
                                                    <div style="display:flex; justify-content: space-between; margin:0 auto; width:100px;">
                                                        <dt>
                                                            <span style="display:none">이사장</span>
                                                            <button type="button" class="btn type_1" onclick="fnCheck($(this).prev());">理 事 長</button>
                                                        </dt>
                                                    </div>
                                                    <dt class="item_8"></dt> <!--이사장 세로막대기1-->
                                                    <dt class="item_21"></dt> <!--이사장 아래 가로막대기-->
                                                    <dt><button type="button" class="btn type_2" style="top:82px; left:440px; position:absolute;"><span class="miniBoxRed"></span>총회/이사회</button></dt>
                                                    <dt><button type="button" class="btn type_2" style="top:82px; left:940px; position:absolute;"><span class="miniBoxRed"></span>감사</button></dt>
                                                </dl>
                                                <dl>
                                                    <div style="display:flex; justify-content: space-between; margin:0 auto; width:100px;">
                                                        <dt>
                                                            <span style="display:none">원장</span>
                                                            <button type="button" class="btn type_1" onclick="fnCheck($(this).prev());">院 長</button>
                                                        </dt>
                                                    </div>
                                                    <dt class="item_8"></dt> <!--원장 세로막대기1-->
                                                    <dt class="item_15"></dt> <!--원장 아래 가로막대기-->
                                                    <dt><button type="button" class="btn type_2" style="top:196px; left:440px; position:absolute;"><span class="miniBoxRed"></span>운영위원회</button></dt>
                                                    <dt><button type="button" class="btn type_2" style="top:196px; left:940px; position:absolute;"><span class="miniBoxRed"></span>인사위원회</button></dt>
                                                    <dt class="item_17"></dt> <!--총괄본부장 아래 가로막대기-->
                                                </dl>
                                                <dl style="margin-left:12.6%; margin-top: 184px;">
                                                    <div style="width: 1121px; display:flex; justify-content: space-between;">
                                                        <dt style="top:168px;">
                                                            <button type="button" class="btn type_2 item_16 item_20" style="position:relative;" onclick="fnCheck(this);"><span class="miniBoxYellow"></span>미래전략기획본부</button>
                                                        <dt class="item_22"></dt>
                                                        <div class="_body" style="position: absolute; display:flex; justify-content: space-between; top: 587px; left:193px; width: 112px;">
                                                            <dt><button type="button" class="btn type_4 item_3" style="position:relative;" onclick="fnCheck(this);"><span class="miniSubBoxYellow"></span><span class="vertical">미래전략기획팀&nbsp;</span></span></button></dt>
                                                            <dt><button type="button" class="btn type_4 item_3" style="position:relative;" onclick="fnCheck(this);"><span class="miniSubBoxYellow"></span><span class="vertical">J-밸리혁신팀&nbsp;</span></button></dt>
                                                        </div>
                                                        </dt>
                                                        <dt style="top:168px;">
                                                            <button type="button" class="btn type_2 item_16 item_20" style="position:relative;" onclick="fnCheck(this);"><span class="miniBoxBlue"></span>R&BD 사업본부</button>
                                                        <dt class="item_23"></dt>
                                                        <div class="_body" style="position: absolute; display:flex; justify-content: space-between; top: 587px; left:361px; width: 112px;">
                                                            <dt><button type="button" class="btn type_4 item_3" style="position:relative;" onclick="fnCheck(this);"><span class="miniSubBoxBlue"></span><span class="vertical">신기술융합팀&nbsp;</span></button></dt>
                                                            <dt><button type="button" class="btn type_4 item_3" style="position:relative;" onclick="fnCheck(this);"><span class="miniSubBoxBlue"></span><span class="vertical">제조혁신팀&nbsp;</span></button></dt>
                                                        </div>
                                                        </dt>
                                                        <dt style="top:168px;">
                                                            <button type="button" class="btn type_2 item_16 item_20" style="position:relative;" onclick="fnCheck(this);"><span class="miniBoxGreen"></span>기업성장지원본부</button>
                                                        <dt class="item_24"></dt>
                                                        <div class="_body" style="position: absolute; display:flex; justify-content: space-between; top: 587px; left:498px; width: 170px;">
                                                            <dt><button type="button" class="btn type_4 item_3" style="position:relative;" onclick="fnCheck(this);"><span class="miniSubBoxGreen"></span><span class="vertical">지역산업육성팀&nbsp;</span></button></dt>
                                                            <dt><button type="button" class="btn type_4 item_3" style="position:relative;" onclick="fnCheck(this);"><span class="miniSubBoxGreen"></span><span class="vertical">인재개발팀&nbsp;</span></button></dt>
                                                            <dt><button type="button" class="btn type_4 item_3" style="position:relative;" onclick="fnCheck(this);"><span class="miniSubBoxGreen"></span><span class="vertical">일자리창업팀&nbsp;</span></button></dt>
                                                        </div>
                                                        </dt>
                                                        <dt style="top:168px;">
                                                            <button type="button" class="btn type_2 item_16 item_20" style="position:relative;" onclick="fnCheck(this);"><span class="miniBoxRed"></span>우주항공사업부</button>
                                                        <dt class="item_25"></dt>
                                                        <div class="_body" style="position: absolute; display:flex; justify-content: space-between; top: 587px; left:694px; width: 112px;">
                                                            <dt><button type="button" class="btn type_4 item_3" style="position:relative;" onclick="fnCheck(this);"><span class="miniSubBoxBlue"></span><span class="vertical">신기술융합팀&nbsp;</span></button></dt>
                                                            <dt><button type="button" class="btn type_4 item_3" style="position:relative;" onclick="fnCheck(this);"><span class="miniSubBoxBlue"></span><span class="vertical">제조혁신팀&nbsp;</span></button></dt>
                                                        </div>
                                                        </dt>
                                                        <dt style="top:168px;"><button type="button" class="btn type_2 item_16" style="position:relative;" onclick="fnCheck(this);"><span class="miniBoxBrown"></span>드론사업부</button></dt>
                                                        <dt style="top:168px;"><button type="button" class="btn type_2 item_16" style="position:relative;" onclick="fnCheck(this);"><span class="miniBoxSky"></span>스마트제조사업부</button></dt>
                                                        <dt style="top:168px;">
                                                            <button type="button" class="btn type_2 item_16 item_20" style="position:relative;" onclick="fnCheck(this);"><span class="miniBoxPeaGreen"></span>경영지원실</button>
                                                        <dt class="item_26"></dt>
                                                        <div class="_body" style="position: absolute; display:flex; justify-content: space-between; top: 587px; left:1192px; width: 112px;">
                                                            <dt><button type="button" class="btn type_4 item_3" style="position:relative;" onclick="fnCheck(this);"><span class="miniSubBoxPeaGreen"></span><span class="vertical">사업지원팀&nbsp;</span></button></dt>
                                                            <dt><button type="button" class="btn type_4 item_3" style="position:relative;" onclick="fnCheck(this);"><span class="miniSubBoxPeaGreen"></span><span class="vertical">경영지원팀&nbsp;</span></button></dt>
                                                        </div>
                                                        </dt>
                                                    </div>
                                                </dl>
                                            </div>

                                            <!-- 직원상세보기 팝업 -->
                                            <div class="shadow"></div>
                                            <div class="organization_bg" style="display: none;">
                                                <div class="window">
                                                    <div class="organization_popup">
                                                        <div class="detailTitle">직원 상세보기</div>
                                                        <button  onclick="fnCheckClose();" class="pop-close">x</button>
                                                        <div class="teamSubBox">
                                                            <div class="personalBox">
                                                                <div class="photoBox" style="background-image:url('../images/sample/basicImage.png');">
                                                                    <p class="photoName">김정원</p>
                                                                    <div class="contentBox">
                                                                        <p>직급 : <span>과장</span></p>
                                                                        <p>생년월일 : <span>1980.08.06</span></p>
                                                                        <p>입사일 : <span>2014.04.17</span></p>
                                                                        <p>출신교 : <span>서울대학교</span></p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div><!-- panel -->

                    <div class="mainFooter" style="text-align:center; clear:both;margin-top: 30px;">
                        <p style="margin:0;">(사)캠틱종합기술원 / 전북 전주시 덕진구 유상로 67 (우)54852</p>
                        <p>Tel : 063-219-0300 / Fax : 063-219-0303 Copyright[c] 2006 CAMTIC All rights Reserved camtic@camtic.or.kr</p>
                    </div>
                </div><!-- col-md-9 -->
                <div class="col-md-3 col-lg-2 dash-right">
                    <div class="row">
                        <div class="col-sm-5 col-md-12 col-lg-12">
                            <div class="media leftpanel-profile" style="text-align:center;">
                                <div>
                                    <a href="#">
                                        <img src="/images/photos/loggeduser1.png" alt="" class="media-object img-circle" style="text-align: center; margin: 0 auto; margin-bottom: 10px; width:100px;">
                                    </a>
                                </div>
                                <div class="media-body">
                                    <h4 class="media-heading">사원 홍길동</h4>
                                    <span>(사)캠틱종합기술원 관리팀</span>
                                </div>
                                <div class="mt10" style="display:flex;justify-content: center;">
                                    <button class="btn btn-quirk infoBtn" id="goWork">출근</button>
                                    <button class="btn btn-quirk infoBtn" id="offWork">퇴근</button>
                                </div>
                            </div><!-- leftpanel-profile -->
                        </div><!-- col-md-12 -->
                    </div><!-- row -->

                    <div class="row" style="margin-top:15px;">
                        <div class="col-sm-5 col-md-12 col-lg-12">
                            <div class="tab-pane" id="emailmenu">
                                <div class="panel-group" id="accordion3">
                                    <div class="panel panel-primary">
                                        <div class="panel-heading">
                                            <h4 class="panel-title">
                                                <a data-toggle="collapse" data-parent="#accordion3" href="#collapseOne3">
                                                    결재현황
                                                </a>
                                            </h4>
                                        </div>
                                        <div id="collapseOne3" class="panel-collapse collapse in">
                                            <div class="panel-body" style="padding:0 10px;">
                                                <ul class="nav nav-quirk">
                                                    <li><p style="padding: 10px 10px 0px;">진행<span style="position:absolute; right:10px;">0건</span></p></li>
                                                    <li><p style="padding: 10px 10px 0px;">완료<span style="position:absolute; right:10px;">0건</span></p></li>
                                                    <li><p style="padding: 10px 10px 0px;">반려<span style="position:absolute; right:10px;">0건</span></p></li>
                                                    <li><p style="padding: 10px 10px 0px;">임시저장<span style="position:absolute; right:10px;">0건</span></p></li>
                                                    <li><p style="padding: 10px 10px 0px;">열람<span style="position:absolute; right:10px;">0건</span></p></li>
                                                    <li><p style="padding: 10px 10px 0px;">더보기<span style="position:absolute; right:10px;">0건</span></p></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="panel panel-primary">
                                        <div class="panel-heading">
                                            <h4 class="panel-title">
                                                <a data-toggle="collapse" class="collapsed" data-parent="#accordion3" href="#collapseTwo3">
                                                    전자결재
                                                </a>
                                            </h4>
                                        </div>
                                        <div id="collapseTwo3" class="panel-collapse collapse">
                                            <div class="panel-body">
                                                <div class="mt10" style="display:flex;">
                                                    <button class="btn btn-quirk infoBtn">목록</button>
                                                    <button class="btn btn-quirk infoBtn">보고서 추가</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="panel panel-primary">
                                        <div class="panel-heading">
                                            <h4 class="panel-title">
                                                <a data-toggle="collapse" class="collapsed" data-parent="#accordion3" href="#collapseThree3">
                                                    근태현황
                                                </a>
                                            </h4>
                                        </div>
                                        <div id="collapseThree3" class="panel-collapse collapse">
                                            <div class="panel-body">
                                                근태현황
                                            </div>
                                        </div>
                                    </div>
                                    <div class="panel panel-primary">
                                        <div class="panel-heading">
                                            <h4 class="panel-title">
                                                <a data-toggle="collapse" class="collapsed" data-parent="#accordion3" href="#collapseFour3">
                                                    일일업무보고
                                                </a>
                                            </h4>
                                        </div>
                                        <div id="collapseFour3" class="panel-collapse collapse">
                                            <div class="panel-body">
                                                일일업무보고
                                            </div>
                                        </div>
                                    </div>
                                    <div class="panel panel-primary">
                                        <div class="panel-heading">
                                            <h4 class="panel-title">
                                                <a data-toggle="collapse" class="collapsed" data-parent="#accordion3" href="#collapseFive3">
                                                    지출결의
                                                </a>
                                            </h4>
                                        </div>
                                        <div id="collapseFive3" class="panel-collapse collapse">
                                            <div class="panel-body">
                                                지출결의
                                            </div>
                                        </div>
                                    </div>
                                    <div class="panel panel-primary">
                                        <div class="panel-heading">
                                            <h4 class="panel-title">
                                                <a data-toggle="collapse" class="collapsed" data-parent="#accordion3" href="#collapseSix3">
                                                    출장보고
                                                </a>
                                            </h4>
                                        </div>
                                        <div id="collapseSix3" class="panel-collapse collapse">
                                            <div class="panel-body">
                                                출장보고
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div><!-- row -->
        </div><!-- contentpanel -->
    </div><!-- mainpanel -->
</section>
<script>
    // 직원상세보기 팝업
    function fnCheck(e){
        var data = {
            deptNm : $(e).text().trim().replace(/ /gi, "")
        }

        var flag = false;

        $.ajax({
            url: "/user/getOrgDeptList",
            data: data,
            dataType : "json",
            async: false,
            success: function(rs){
                var row = rs;
                console.log("row");
                console.log(row);
                row = $.parseJSON(JSON.stringify(row));
                console.log("row parse");
                console.log(row);
                var defaultImage = "background-image:url(\'../images/sample/basicImage.png\')";

                $(".teamSubBox").html("");
                var html = "";
                for(var i = 0 ; i < row.length ; i++){

                    var empImage = "background-image:url('"+row[i].FILE_PATH+ ''+'' +row[i].FILE_UUID+"')";

                    if(row[i].SCHOOL_NAME == null || row[i].SCHOOL_NAME == ""){
                        row[i].SCHOOL_NAME = "";
                    }
                    if(row[i].BDAY == null || row[i].BDAY == ""){
                        row[i].BDAY = "";
                    }
                    if(row[i].POSITION_NAME == null || row[i].POSITION_NAME == ""){
                        row[i].POSITION_NAME = "";
                    }
                    if(row[i].FILE_UUID == null || row[i].FILE_UUID == ""){
                        empImage = defaultImage;
                    }

                    html +='<div class=shadow"></div>';
                    html +='<div class="personalBox">'
                    html +='    <div class="photoBox" style="' +empImage+ '; background-size:100px 107px;">';
                    html +='        <p class="photoName">'+row[i].EMP_NAME_KR+'</p>';
                    html +='        <div class="contentBox">';
                    html +='            <p>직급 : <span>'+row[i].DUTY_NAME+'</span></p>';
                    html +='            <p>생년월일 : <span>'+row[i].BDAY+'</span></p>';
                    html +='            <p>입사일 : <span>'+row[i].BDAY+'</span></p>';
                    html +='           <p>출신교 : <span>'+row[i].BDAY+'</span></p>';
                    html +='        </div>';
                    html +='    </div>';
                    html +='</div>';
                }
                $(".teamSubBox").html(html);

                if(row.length != 0 ){
                    flag = true;
                }
            }
        });

        if(flag){
            $(".organization_bg").show();
            $(".shadow").show();
        }

    }
    function fnCheckClose(){
        $(".organization_bg").hide();
        $(".shadow").hide();
    }

    $(document).keydown(function(e) {
        var code = e.keyCode || e.which;
        if (code == 27) {
            $(".organization_bg").hide();
            $(".shadow").hide();
        }
    });

    $(document).ready(function() {

    })

</script>
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


