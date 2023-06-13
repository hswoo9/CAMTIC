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

<jsp:include page="/WEB-INF/jsp/template/common.jsp" flush="false"/>

<style>
    .boxCss{width:190px; height:90px; color:#fff; background-color:#259dab; text-align:center;}
    .boxCss:hover{background-image: linear-gradient(to right, #259dab 0%, #2574ab 100%);}
    .popupTable th{padding:5px!important; vertical-align: middle!important; text-align: center; background-color: #bdc3d1ad;}
    .timeBoxSt{text-align: center; font-size: 20px;}
    .timeBox{padding: 10px;}
</style>

<div class="col-md-10 col-lg-10 dash-left">
    <div class="row panel-quick-page">
        <div style="display:flex; justify-content: space-between;">
            <div class="boxCss">
                <i class="fa fa-shopping-cart" style="font-size:40px;padding:11px;"></i><br>캠프로젝트
            </div>
            <div class="boxCss">
                <i class="fa fa-lightbulb-o" style="font-size:40px;padding:11px;"></i><br>캠아이템
            </div>
            <div class="boxCss">
                <i class="fa fa-calendar-o" style="font-size:40px;padding:11px;"></i><br>캠매니저
            </div>
            <div class="boxCss">
                <i class="fa fa-users" style="font-size:40px;padding:11px;"></i><br>캠CRM
            </div>
            <a href="/Inside/userPersonList.do">
                <div class="boxCss">
                   <i class="fa fa-location-arrow" style="font-size:40px;padding:11px;"></i><br>캠인사이드
                </div>
            </a>
            <div class="boxCss">
                <i class="fa fa-pencil" style="font-size:40px;padding:11px;"></i><br>캠퍼스
            </div>
            <div class="boxCss">
                <i class="fa fa-cloud-upload" style="font-size:40px;padding:11px;"></i><br>캠어취브
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
                    <h3 class="panel-title" style="color:#fff; text-align:center; font-weight:600;"><a href="#">일정관리</a></h3>
                </div>
            </div><!-- panel -->
        </div>
        <div class="col-md-2 col-sm-2" style="padding-right:0;">
            <div class="panel">
                <div class="panel-heading" style="background-color: #505b72; padding:25px;">
                    <h3 class="panel-title" style="color:#fff; text-align:center; font-weight:600;"><a href="#">전산보완요청</a></h3>
                </div>
            </div><!-- panel -->
        </div>
        <div class="col-md-2 col-sm-2" style="padding-right:0;">
            <div class="panel">
                <div class="panel-heading" style="background-color: #505b72; padding:25px;">
                    <h3 class="panel-title" style="color:#fff; text-align:center; font-weight:600;"><a href="#">홍보협조요청</a></h3>
                </div>
            </div><!-- panel -->
        </div>
        <div class="col-md-2 col-sm-2" style="padding-right:0;">
            <div class="panel">
                <div class="panel-heading logopanel" style="background-color: #505b72; padding:25px; margin-bottom:35px;height: 69px;">
                    <h3 class="panel-title" style="color:#fff; text-align:center; font-weight:600;"><a href="#"></a></h3>
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
                <div class="timeBox">
                    <p class="timeBoxSt"><strong>362:43</strong></p>
                </div>
            </div><!-- panel -->
        </div>
        <div style="width:110px;">
            <div class="panel panel-primary">
                <div class="panel-heading" style="padding:15px 0;">
                    <h3 class="panel-title" style="text-align:center;">연가</h3>
                </div>
                <div class="timeBox">
                    <p class="timeBoxSt"><strong>0명</strong></p>
                </div>
            </div><!-- panel -->
        </div>
        <div style="width:110px;">
            <div class="panel panel-primary">
                <div class="panel-heading" style="padding:15px 0;">
                    <h3 class="panel-title" style="text-align:center;">오전반차</h3>
                </div>
                <div class="timeBox">
                    <p class="timeBoxSt"><strong>0명</strong></p>
                </div>
            </div><!-- panel -->
        </div>
        <div style="width:110px;">
            <div class="panel panel-primary">
                <div class="panel-heading" style="padding:15px 0;">
                    <h3 class="panel-title" style="text-align:center;">오후반차</h3>
                </div>
                <div class="timeBox">
                    <p class="timeBoxSt"><strong>0명</strong></p>
                </div>
            </div><!-- panel -->
        </div>
        <div style="width:110px;">
            <div class="panel panel-primary">
                <div class="panel-heading" style="padding:15px 0;">
                    <h3 class="panel-title" style="text-align:center;">경조휴가</h3>
                </div>
                <div class="timeBox">
                    <p class="timeBoxSt"><strong>0명</strong></p>
                </div>
            </div><!-- panel -->
        </div>
        <div style="width:110px;">
            <div class="panel panel-primary">
                <div class="panel-heading" style="padding:15px 0;">
                    <h3 class="panel-title" style="text-align:center;">병가</h3>
                </div>
                <div class="timeBox">
                    <p class="timeBoxSt"><strong>0명</strong></p>
                </div>
            </div><!-- panel -->
        </div>
        <div style="width:110px;">
            <div class="panel panel-primary">
                <div class="panel-heading" style="padding:15px 0;">
                    <h3 class="panel-title" style="text-align:center;">공가</h3>
                </div>
                <div class="timeBox">
                    <p class="timeBoxSt"><strong>0명</strong></p>
                </div>
            </div><!-- panel -->
        </div>
        <div style="width:110px;">
            <div class="panel panel-primary">
                <div class="panel-heading" style="padding:15px 0;">
                    <h3 class="panel-title" style="text-align:center;">출산휴가</h3>
                </div>
                <div class="timeBox">
                    <p class="timeBoxSt"><strong>0명</strong></p>
                </div>
            </div><!-- panel -->
        </div>
        <div style="width:110px;">
            <div class="panel panel-primary">
                <div class="panel-heading" style="padding:15px 0;">
                    <h3 class="panel-title" style="text-align:center;">선택근무</h3>
                </div>
                <div class="timeBox">
                    <p class="timeBoxSt"><strong>0명</strong></p>
                </div>
            </div><!-- panel -->
        </div>
        <div style="width:110px;">
            <div class="panel panel-primary">
                <div class="panel-heading" style="padding:15px 0;">
                    <h3 class="panel-title" style="text-align:center;">츨장</h3>
                </div>
                <div class="timeBox">
                    <p class="timeBoxSt"><strong>0명</strong></p>
                </div>
            </div><!-- panel -->
        </div>
        <div style="width:110px;">
            <div class="panel panel-primary">
                <div class="panel-heading" style="padding:15px 0;">
                    <h3 class="panel-title" style="text-align:center;">대체휴가</h3>
                </div>
                <div class="timeBox">
                    <p class="timeBoxSt"><strong>0명</strong></p>
                </div>
            </div><!-- panel -->
        </div>
    </div>

    <div class="mainFooter" style="text-align:center; clear:both;margin-top: 456px;">
        <p style="margin:0;">(사)캠틱종합기술원 / 전북 전주시 덕진구 유상로 67 (우)54852</p>
        <p>Tel : 063-219-0300 / Fax : 063-219-0303 Copyright[c] 2006 CAMTIC All rights Reserved camtic@camtic.or.kr</p>
    </div>
</div><!-- col-md-9 -->

<jsp:include page="/WEB-INF/jsp/template/footer.jsp" flush="false"/>