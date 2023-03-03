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

    <script src="/js/quirk.js"></script>
    <script src="/js/dashboard.js"></script>

    <script src="https://code.jquery.com/jquery-3.6.0.js" integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk=" crossorigin="anonymous"></script>

    <script type="text/javascript" src="<c:url value='/js/kendoui/jquery.min.js'/>"></script>
    <script type="text/javascript" src="/js/intra/common/common.js?${toDate}"></script>
    <script type="text/javascript" src="/js/intra/user/user.js?${toDate}"></script>

    <link rel="stylesheet" href="/css/intra/user/org.css?${toDate}">
</head>

<body>

<header>
    <div class="headerpanel">
        <a href="/indexB.do"><div class="logopanel"></div></a>
        <div class="headerbar">
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
            <jsp:include page="/WEB-INF/jsp/template/nav.jsp" flush="false"/>
        </div><!-- leftpanelinner -->
    </div><!-- leftpanel -->

    <div class="mainpanel">

        <!--<div class="pageheader">
          <h2><i class="fa fa-home"></i> Dashboard</h2>
        </div>-->

        <div class="contentpanel" style="width:1700px;">

            <div class="row">
                <div class="col-md-10 col-lg-10 dash-left">
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
                                                            <button type="button" class="btn type_1" onclick="org.fnCheck($(this).prev());">理 事 長</button>
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
                                                            <button type="button" class="btn type_1" onclick="org.fnCheck($(this).prev());">院 長</button>
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
                                                            <button type="button" class="btn type_2 item_16 item_20" style="position:relative;" onclick="org.fnCheck(this);"><span class="miniBoxYellow"></span>미래전략기획본부</button>
                                                        <dt class="item_22"></dt>
                                                        <div class="_body" style="position: absolute; display:flex; justify-content: space-between; top: 587px; left:193px; width: 112px;">
                                                            <dt><button type="button" class="btn type_4 item_3" style="position:relative;" onclick="org.fnCheck(this);"><span class="miniSubBoxYellow"></span><span class="vertical">미래전략기획팀&nbsp;</span></span></button></dt>
                                                            <dt><button type="button" class="btn type_4 item_3" style="position:relative;" onclick="org.fnCheck(this);"><span class="miniSubBoxYellow"></span><span class="vertical">J-밸리혁신팀&nbsp;</span></button></dt>
                                                        </div>
                                                        </dt>
                                                        <dt style="top:168px;">
                                                            <button type="button" class="btn type_2 item_16 item_20" style="position:relative;" onclick="org.fnCheck(this);"><span class="miniBoxBlue"></span>R&BD 사업본부</button>
                                                        <dt class="item_23"></dt>
                                                        <div class="_body" style="position: absolute; display:flex; justify-content: space-between; top: 587px; left:361px; width: 112px;">
                                                            <dt><button type="button" class="btn type_4 item_3" style="position:relative;" onclick="org.fnCheck(this);"><span class="miniSubBoxBlue"></span><span class="vertical">신기술융합팀&nbsp;</span></button></dt>
                                                            <dt><button type="button" class="btn type_4 item_3" style="position:relative;" onclick="org.fnCheck(this);"><span class="miniSubBoxBlue"></span><span class="vertical">제조혁신팀&nbsp;</span></button></dt>
                                                        </div>
                                                        </dt>
                                                        <dt style="top:168px;">
                                                            <button type="button" class="btn type_2 item_16 item_20" style="position:relative;" onclick="org.fnCheck(this);"><span class="miniBoxGreen"></span>기업성장지원본부</button>
                                                        <dt class="item_24"></dt>
                                                        <div class="_body" style="position: absolute; display:flex; justify-content: space-between; top: 587px; left:498px; width: 170px;">
                                                            <dt><button type="button" class="btn type_4 item_3" style="position:relative;" onclick="org.fnCheck(this);"><span class="miniSubBoxGreen"></span><span class="vertical">지역산업육성팀&nbsp;</span></button></dt>
                                                            <dt><button type="button" class="btn type_4 item_3" style="position:relative;" onclick="org.fnCheck(this);"><span class="miniSubBoxGreen"></span><span class="vertical">인재개발팀&nbsp;</span></button></dt>
                                                            <dt><button type="button" class="btn type_4 item_3" style="position:relative;" onclick="org.fnCheck(this);"><span class="miniSubBoxGreen"></span><span class="vertical">일자리창업팀&nbsp;</span></button></dt>
                                                        </div>
                                                        </dt>
                                                        <dt style="top:168px;">
                                                            <button type="button" class="btn type_2 item_16 item_20" style="position:relative;" onclick="org.fnCheck(this);"><span class="miniBoxRed"></span>우주항공사업부</button>
                                                        <dt class="item_25"></dt>
                                                        <div class="_body" style="position: absolute; display:flex; justify-content: space-between; top: 587px; left:694px; width: 112px;">
                                                            <dt><button type="button" class="btn type_4 item_3" style="position:relative;" onclick="org.fnCheck(this);"><span class="miniSubBoxRed"></span><span class="vertical">우주개발팀&nbsp;</span></button></dt>
                                                            <dt><button type="button" class="btn type_4 item_3" style="position:relative;" onclick="org.fnCheck(this);"><span class="miniSubBoxRed"></span><span class="vertical">항공개발팀&nbsp;</span></button></dt>
                                                        </div>
                                                        </dt>
                                                        <dt style="top:168px;"><button type="button" class="btn type_2 item_16" style="position:relative;" onclick="org.fnCheck(this);"><span class="miniBoxBrown"></span>드론사업부</button></dt>
                                                        <dt style="top:168px;"><button type="button" class="btn type_2 item_16" style="position:relative;" onclick="org.fnCheck(this);"><span class="miniBoxSky"></span>스마트제조사업부</button></dt>
                                                        <dt style="top:168px;">
                                                            <button type="button" class="btn type_2 item_16 item_20" style="position:relative;" onclick="org.fnCheck(this);"><span class="miniBoxPeaGreen"></span>경영지원실</button>
                                                        <dt class="item_26"></dt>
                                                        <div class="_body" style="position: absolute; display:flex; justify-content: space-between; top: 587px; left:1192px; width: 112px;">
                                                            <dt><button type="button" class="btn type_4 item_3" style="position:relative;" onclick="org.fnCheck(this);"><span class="miniSubBoxPeaGreen"></span><span class="vertical">사업지원팀&nbsp;</span></button></dt>
                                                            <dt><button type="button" class="btn type_4 item_3" style="position:relative;" onclick="org.fnCheck(this);"><span class="miniSubBoxPeaGreen"></span><span class="vertical">경영지원팀&nbsp;</span></button></dt>
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
                                                        <button  onclick="org.fnCheckClose();" class="pop-close">x</button>
                                                        <div class="teamBox">
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
                            </div>
                    </div><!-- panel -->

                    <div class="mainFooter" style="text-align:center; clear:both;margin-top: 30px;">
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
<script>
    $(document).keydown(function(e) {
        var code = e.keyCode || e.which;
        if (code == 27) {
            $(".organization_bg").hide();
            $(".shadow").hide();
        }
    });

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


