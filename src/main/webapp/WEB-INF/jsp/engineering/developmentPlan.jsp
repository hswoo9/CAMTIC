<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="ko">
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
    <link rel="stylesheet" href="../lib/timepicker/jquery.timepicker.css">

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

    <script src="/lib/morrisjs/morris.js"></script>
    <script src="/lib/raphael/raphael.js"></script>

    <script src="/lib/flot/jquery.flot.js"></script>
    <script src="/lib/flot/jquery.flot.resize.js"></script>
    <script src="/lib/flot-spline/jquery.flot.spline.js"></script>

    <script src="/lib/jquery-knob/jquery.knob.js"></script>

    <script src="/js/quirk.js"></script>
    <script src="/js/dashboard.js"></script>

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

                    <h5 class="sidebar-title">업무</h5>
                    <ul class="nav nav-pills nav-stacked nav-quirk">
                        <li class="nav-parent">
                            <a href=""><i class="fa fa-check-square"></i> <span>캠알앤디</span></a>
                            <ul class="children">
                                <li><a href="/subHoliday/subHolidayApplication.do">휴가신청</a></li>
                                <li><a href="/subHoliday/org.do">조직도</a></li>
                                <li><a href="#">휴가자동설정</a></li>
                                <li><a href="#">휴가생성기준설정</a></li>
                            </ul>
                        </li>
                        <li class="nav-parent"><a href=""><i class="fa fa-suitcase"></i> <span>비알앤디(지원사업)</span></a>
                            <ul class="children">
                                <li><a href="#">비알앤디</a></li>
                                <li><a href="#">비알앤디</a></li>
                                <li><a href="#">비알앤디</a></li>
                            </ul>
                        </li>
                        <li class="nav-parent nav-active"><a href=""><i class="fa fa-th-list"></i> <span>엔지니어링</span></a>
                            <ul class="children">
                                <h5 class="sidebar-title"><a href="/engineering/customerConsultation.do">프로젝트 등록 및 목록</a></h5>
                                <li><a href="/engineering/estimate.do">개발상담서</a></li>
                                <li><a href="/engineering/orderManagement.do">수주보고</a></li>
                                <li class="active"><a href="/engineering/developmentPlan.do">개발계획서 등록(협업)</a></li>
                                <li><a href="/engineering/outsourcingPurchase.do">구매/외주</a></li>
                                <li><a href="/engineering/deliveryManagement.do">납품관리</a></li>
                                <li><a href="/engineering/resultReport.do">완료보고서</a></li>
                                <li><a href="#">원가보고서</a></li>
                                <h5 class="sidebar-title"><a href="#">협업목록보기</a></h5>
                                <h5 class="sidebar-title"><a href="#">사내가공 요청현황</a></h5>
                                <h5 class="sidebar-title"><a href="#">사내가공일정</a></h5>
                                <h5 class="sidebar-title"><a href="#">프로젝트 진행현황</a></h5>
                            </ul>
                        </li>
                        <li class="nav-parent"><a href=""><i class="fa fa-file-text"></i> <span>용역 및 기타</span></a>
                            <ul class="children">
                                <li><a href="#">캠퍼스</a></li>
                                <li><a href="#">캠퍼스</a></li>
                                <li><a href="#">캠퍼스</a></li>
                                <li><a href="#">캠퍼스</a></li>
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
                            <div class="boxCss">
                                <i class="fa fa-location-arrow" style="font-size:40px;padding:11px;"></i><br>캠인사이드2.0
                            </div>
                            <div class="boxCss">
                                <i class="fa fa-pencil" style="font-size:40px;padding:11px;"></i><br>캠퍼스2.0
                            </div>
                            <div class="boxCss">
                                <i class="fa fa-cloud-upload" style="font-size:40px;padding:11px;"></i><br>캠어취브2.0
                            </div>
                        </div>
                    </div>

                    <div class="panel">
                        <div class="panel-heading">
                            <h4 class="panel-title">개발계획서 등록(협업)</h4>
                        </div>
                        <div class="panel-body">
                        <div class="table-responsive">
                            <table class="table table-bordered">
                                <thead>
                                <tr>
                                    <th class="tableThSt">버전</th>
                                    <th class="tableThSt">문서번호</th>
                                    <th class="tableThSt">날짜</th>
                                    <th class="tableThSt">투자금액</th>
                                    <th class="tableThSt">등록자</th>
                                    <th class="tableThSt">예비원가서</th>
                                    <th class="tableThSt">상태</th>
                                </tr>
                                </thead>
                                <tr style="text-align:center;">
                                    <td>ver.1</td>
                                    <td>R&BD사업본부23-46</td>
                                    <td>2023년01년05일</td>
                                    <td>3,000,000</td>
                                    <td>장수영</td>
                                    <td></td>
                                    <td>개발계획검토중<br>(나세영 팀장 결재중)</td>
                                </tr>

                            </table>
                            <table class="table popupTable">
                                <thead>
                                <tr>
                                    <th>프로젝트명</th>
                                    <td colspan="3" style="padding:5px;"><input type="text" class="textInput" value="조영산업-FEMS구축사업" style="width:80%;" disabled></td>
                                </tr>
                                <tr>
                                    <th>업체명</th>
                                    <td style="padding:5px;"><input type="text" class="textInput" value="주시회사 모디" style="width:50%;" disabled></td>
                                    <th>PM</th>
                                    <td style="padding:5px;"><input type="text" class="textInput" value="제조혁신팀 장수영 책임연구원" style="width:50%;" disabled></td>
                                </tr>
                                <tr>
                                    <th>수주일자</th>
                                    <td style="padding:5px;"><input type="text" class="textInput" value="2023년01년05일" style="width:50%;" disabled></td>
                                    <th>수주가격</th>
                                    <td style="padding:5px;"><input type="text" class="textInput" value="17,280,000원" style="width:50%; text-align:right;" disabled></td>
                                </tr>
                                <tr>
                                    <th>투자금액</th>
                                    <td style="padding:5px;"><input type="text" class="textInput" value="3,000,000" style="width:50%; text-align:right;" disabled></td>
                                    <th>투자비율</th>
                                    <td style="padding:5px;"><input type="text" class="textInput" value="17.4%" style="width:50%; text-align:right;" disabled></td>
                                </tr>
                                </thead>
                            </table>
                            <table class="table table-bordered">
                                <thead>
                                <h4>공정설정</h4>
                                <tr>
                                    <th class="tableThSt">순번</th>
                                    <th class="tableThSt">구분</th>
                                    <th class="tableThSt">공정명</th>
                                    <th class="tableThSt">추진일정</th>
                                    <th class="tableThSt">담당자</th>
                                    <th class="tableThSt">처리명령</th>
                                </tr>
                                </thead>
                                <tr style="text-align:center;">
                                    <td>1</td>
                                    <td>
                                        <select id="select1" class="form-control" style="width: 100px; background-color:#fff;">
                                            <option value="설계">설계</option>
                                            <option value="설계">설계</option>
                                            <option value="설계">설계</option>
                                        </select>
                                    </td>
                                    <td><input type="text" class="textInput" value="시스템 설계"></td>
                                    <td><input type="text" class="textInput" value="2023-01-09" style="width:30%;"> ~ <input type="text" class="textInput" value="2023-01-27" style="width:30%;"></td>
                                    <td>장수영</td>
                                    <td>
                                        <div style="display:flex;justify-content: center;">
                                            <button class="btn btn-primary" style="width:72px; margin:0 5px;height:27px; line-height:0;">공정저장</button>
                                            <button class="btn btn-primary" style="width:72px; margin:0 5px;height:27px; line-height:0;">추진담당</button>
                                            <button class="btn btn-primary" style="width:50px; margin:0 5px;height:27px; line-height:0;">삭제</button>
                                        </div>
                                    </td>
                                </tr>
                            </table>

                            <div class="mt10" style="display:flex;justify-content: center;">
                                <button class="btn btn-quirk infoBtn" style="width:140px;">공정일정 설정완료</button>
                            </div>
                            <table class="table table-bordered">
                                <thead>
                                <div style="display:flex;justify-content: space-between;">
                                    <h4>투자내역</h4>
                                    <span style="padding-top:5px;">합계: 3,000,000원</span>
                                </div>
                                <tr>
                                    <th class="tableThSt">순번</th>
                                    <th class="tableThSt">구분</th>
                                    <th class="tableThSt">건명</th>
                                    <th class="tableThSt">수량</th>
                                    <th class="tableThSt">단위</th>
                                    <th class="tableThSt">견적총액</th>
                                    <th class="tableThSt">견적서</th>
                                    <th class="tableThSt">비고</th>
                                    <th class="tableThSt">명령</th>
                                </tr>
                                </thead>
                                <tr style="text-align:center;">
                                    <td>1</td>
                                    <td>
                                        <select id="select2" class="form-control" style="width: 100px; background-color:#fff;">
                                            <option value="구매">구매</option>
                                            <option value="구매">구매</option>
                                            <option value="구매">구매</option>
                                        </select>
                                    </td>
                                    <td><input type="text" class="textInput" value="연신기 제어함"></td>
                                    <td><input type="text" class="textInput" value="1" style="text-align:right;"></td>
                                    <td><input type="text" class="textInput" value="Set"></td>
                                    <td><input type="text" class="textInput" value="1,500,000" style="text-align:right;"></td>
                                    <td><input type="text" class="textInput" value="세한FA"></td>
                                    <td><input type="text" class="textInput" value=""></td>
                                    <td></td>
                                </tr>
                            </table>
                            <table class="table table-bordered">
                                <tr>
                                    <th>추진방향</th>
                                </tr>
                                <tr>
                                    <td colspan="3" style="padding:5px;"><textarea class="form-control" rows="2" placeholder=""></textarea></td>
                                </tr>
                            </table>
                            <table class="table table-bordered">
                                <tr>
                                    <th>기타</th>
                                </tr>
                                <tr>
                                    <td colspan="3" style="padding:5px;"><textarea class="form-control" rows="2" placeholder=""></textarea></td>
                                </tr>
                            </table>
                            <table class="table table-bordered">
                                <tr>
                                    <th>파일저장</th>
                                </tr>
                                <tr>
                                    <td colspan="3" style="padding:5px;"><input type="file"></td>
                                </tr>
                            </table>
                            <div class="mt10" style="display:flex;justify-content: center;">
                                <button class="btn btn-quirk infoBtn" style="width:140px;">저장</button>
                                <button class="btn btn-quirk infoBtn" style="width:140px;">결제요청 취소</button>
                                <button class="btn btn-quirk infoBtn" style="width:140px;">예비원가 추가</button>
                                <button class="btn btn-quirk infoBtn" style="width:140px;">인쇄</button>
                                <button class="btn btn-quirk infoBtn" style="width:140px;">닫기</button>
                            </div>
                        </div><!-- table-responsive -->
                    </div>
                    </div><!-- panel -->



                    <div class="mainFooter" style="text-align:center; clear:both;margin-top: 456px;">
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
<script type="text/javascript">
    $(function() {
        $('#datepicker1').datepicker();
        $('#datepicker2').datepicker();

    });
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


