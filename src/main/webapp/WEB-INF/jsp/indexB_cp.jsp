<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>


<style>
    .boxCss{width:190px; height:90px; color:#fff; background-color:#259dab; text-align:center;}
    .boxCss:hover{background-image: linear-gradient(to right, #259dab 0%, #2574ab 100%);}
    .popupTable th{padding:5px!important; vertical-align: middle!important; text-align: center; background-color: #bdc3d1ad;}
    .timeBoxSt{text-align: center; font-size: 20px;}
    .timeBox{padding: 10px;}
    .col-lg-2{
        width: 20%!important;
    }
    .col-lg-7{
        width: 55%!important;
    }
</style>

<div id="mainContent">
    <div class="col-md-2 col-lg-2" style="margin-top:-10px;">
        <div class="media leftpanel-profile" style="text-align:center; background-color:#fff;">
            <div>
                <a href="#">
                    <img src="/images/photos/loggeduser3.png" alt="" class="media-object img-circle" style="text-align: center; margin: 0 auto; margin-bottom: 10px; width:100px;">
                </a>
            </div>
            <div class="media-body">
                <h4 class="media-heading" style="color:#333;font-size:18px; font-weight:600;letter-spacing: -2px;">관리자</h4>
                <span style="color:#919191; font-size:15px;line-height:32px;letter-spacing: -2px;">경영지원실</span>
            </div>
            <div style="margin-top:10px;">
                <div style="display:flex; justify-content: space-between; margin: 0px 10px;height:25px;"><span style="color:#333;font-weight:600;">결재할 문서</span><span style="color:#919191;font-weight:600;cursor:pointer;" onclick="open_in_frame('/approvalUser/approveWaitDocList.do')">0</span></div>
                <div style="display:flex; justify-content: space-between; margin: 0px 10px;height:25px;"><span style="color:#333;font-weight:600;">오늘의 일정</span><span style="color:#919191;font-weight:600;">0</span></div>
                <div style="display:flex; justify-content: space-between; margin: 0px 10px;height:25px;"><span style="color:#333;font-weight:600;">작성할 보고</span><span style="color:#919191;font-weight:600; color:#259dab;">120</span></div>
            </div>
        </div>
        <div class="panel" style="margin-top:10px;margin-bottom:10px;">
            <div style="padding: 25px 0 0 25px;">
                <h4 class="media-heading" style="color:#333;font-size:18px; font-weight:600;letter-spacing: -2px;">임직원 생일</h4>
            </div>
            <div class="panel-body" style="padding:5px;">
                <div style="display:flex;justify-content: space-between; margin: 0 23px 10px 23px;">
                    <div style="font-weight:600; font-size:15px;">2023.10</div>
                    <div style="font-weight:600; font-size:15px;"><span style="margin-right:10px;">&lt;</span><span>&gt;</span></div>
                </div>
                <div style="padding: 10px 25px; display:flex; justify-content: space-between;border-top: 1px solid #eee;">
                    <div style="display:flex;">
                        <div style="font-weight:600; font-size:13px; margin-right:10px; width:50px;">10/23</div>
                        <div>주수빈 주임</div>
                    </div>
                </div>
                <div style="padding: 10px 25px; display:flex; justify-content: space-between;border-top: 1px solid #eee;">
                    <div style="display:flex;">
                        <div style="font-weight:600; font-size:13px; margin-right:10px; width:50px;">10/24</div>
                        <div>국민 선임</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="panel" style="margin-bottom:10px;">
            <div style="padding: 25px 0 0 25px; height: 53px;">
                <h4 class="media-heading" style="color:#333;font-size:18px; font-weight:600;letter-spacing: -2px;">일정</h4>
            </div>
            <div class="panel-body" style="padding:5px;">
                <div class="demo-section" style="text-align: center; width:300ps; height: 343px;">
                    <div id="calendar"></div>
                </div>
                <script>
                    $(document).ready(function() {
                        // create Calendar from div HTML element
                        $("#calendar").kendoCalendar();
                    });
                </script>
            </div>
        </div>
    </div>
</div>
<div class="col-md-7 col-lg-7" style="margin-top:-10px;">
    <div class="panel" style="margin-bottom:10px; height: 465px;">
        <div style="padding: 25px 0 0 25px;">
            <h4 class="media-heading" style="color:#333;font-size:18px; font-weight:600;letter-spacing: -2px;">게시판 최근글</h4>
        </div>
        <div class="panel-body">
            <div class="card">
                <!-- Nav tabs -->
                <ul class="nav nav-tabs nav-justified">
                    <li class="active"><a href="#tab1" data-toggle="tab"><strong style="font-size:14px;">전체</strong></a></li>
                    <li><a href="#tab2" data-toggle="tab"><strong style="font-size:14px;">공지사항</strong></a></li>
                    <li><a href="#tab3" data-toggle="tab"><strong style="font-size:14px;">업무보고</strong></a></li>
                    <li><a href="#tab3" data-toggle="tab"><strong style="font-size:14px;">업무메뉴얼</strong></a></li> <!--규정/지침/절차/양식-->
                    <li><a href="#tab3" data-toggle="tab"><strong style="font-size:14px;">홍보자료</strong></a></li>
                </ul>

                <!-- Tab panes -->
                <div class="tab-content">
                    <div class="tab-pane active" id="tab1" style="padding:20px 0; border-top: 1px solid #eee;border-bottom: 1px solid #eee;">
                        <div class="panel-body" style="padding:0 10px;">
                            <ul class="nav nav-quirk" style="margin:0;">
                                <li style="border-top:0; border-bottom:0; ">
                                    <div style="padding: 10px 10px 0px;">
                                        <span style="font-weight:600; font-size:15px;">외부전문가 및 강사 등에 지급하는 소득에 대한 소득신고(원천징수)관련 협조사항 안내</span><span>[1]</span>
                                    </div>
                                    <div style="padding: 5px 10px;">
                                        <span style="margin-right:10px;">2023-07-11 12:20</span><span style="margin-right:10px;">박정아</span><span style="margin-right:10px;">|</span><span>공지</span>
                                    </div>
                                </li>
                                <li style="border-top:0;">
                                    <div style="padding: 10px 10px 0px;">
                                        <span style="font-weight:600; font-size:15px;">캠틱 주간업무 보고(23.07.17. ~ 23.07.21.)</span><span>[1]</span>
                                    </div>
                                    <div style="padding: 5px 10px;">
                                        <span style="margin-right:10px;">2023-07-11 10:22</span><span style="margin-right:10px;">유수영</span><span style="margin-right:10px;">|</span><span>업무보고</span>
                                    </div>
                                </li>
                                <li style="border-top:0;">
                                    <div style="padding: 10px 10px 0px;">
                                        <span style="font-weight:600; font-size:15px;">[35회차] 2023년 7월 캠-퍼스 공통학습(캠.화.지) 일정 안내(7.18)</span><span>[1]</span>
                                    </div>
                                    <div style="padding: 5px 10px;">
                                        <span style="margin-right:10px;">2023-07-05 17:22</span><span style="margin-right:10px;">송은화</span><span style="margin-right:10px;">|</span><span>공지</span>
                                    </div>
                                </li>
                                <li style="border-top:0; border-bottom:0;">
                                    <div style="padding: 10px 10px 0px;">
                                        <span style="font-weight:600; font-size:15px;">국가연구개발사업 연구활동비-회의비 사용 서식에 대한 건의</span><span></span>
                                    </div>
                                    <div style="padding: 5px 10px;">
                                        <span style="margin-right:10px;">2023-07-03 11:22</span><span style="margin-right:10px;">김광석</span><span style="margin-right:10px;">|</span><span>제안제도</span>
                                    </div>
                                </li>
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
                </div>
            </div>
        </div>
    </div>

    <div class="panel" style="height: 407px;">
        <div style="padding: 25px 0 0 25px;">
            <h4 class="media-heading" style="color:#333;font-size:18px; font-weight:600;letter-spacing: -2px;">주요일정</h4>
        </div>
        <div class="panel-body">
            <div class="card">
                <!-- 메일함 -->
                <ul class="nav nav-tabs nav-justified">
                    <li class="active"><a href="#tab4" data-toggle="tab"><strong style="font-size:14px;">오픈스터디</strong></a></li>
                    <li><a href="#tab5" data-toggle="tab"><strong style="font-size:14px;">법인일정</strong></a></li>
                    <li><a href="#tab6" data-toggle="tab"><strong style="font-size:14px;">직원일정</strong></a></li>
                </ul>

                <!-- Tab panes -->
                <div class="tab-content">
                    <div class="tab-pane active" id="tab4" style="padding:20px 0; border-top: 1px solid #eee;border-bottom: 1px solid #eee;">
                        <div class="panel-body" style="padding:0 10px;">
                            <ul class="nav nav-quirk" style="margin:0;">
                                <li style="border-top:0; border-bottom:0;">
                                    <div style="padding: 10px 10px 0px; display:flex; justify-content: space-between;">
                                        <div style="display:flex;">
                                            <div style="font-weight:600; font-size:13px; margin-right:10px; width:100px;">오픈스터디</div>
                                            <div>정부사업 인건비 참여율(계상률) 관리 기준 안내</div>
                                        </div>
                                        <div>23/08/21 ~ 23/08/21</div>
                                    </div>
                                </li>
                                <li style="border-top:0; border-bottom:0;">
                                    <div style="padding: 10px 10px 0px; display:flex; justify-content: space-between;">
                                        <div style="display:flex;">
                                            <div style="font-weight:600; font-size:13px; margin-right:10px; width:100px;">오픈스터디</div>
                                            <div>2023년 정부사업 수행 내 유의 및 이슈사항 안내(기성본부)</div>
                                        </div>
                                        <div> 23/03/22 ~ 23/03/22</div>
                                    </div>
                                </li>
                                <li style="border-top:0; border-bottom:0;">
                                    <div style="padding: 10px 10px 0px; display:flex; justify-content: space-between;">
                                        <div style="display:flex;">
                                            <div style="font-weight:600; font-size:13px; margin-right:10px; width:100px;">오픈스터디</div>
                                            <div>2023년 정부사업 수행 내 유의 및 이슈사항 안내(R&BD, 3사업부)</div>
                                        </div>
                                        <div>23/03/20 ~ 23/03/20</div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="tab-pane" id="tab5" style="padding:20px 0; border-top: 1px solid #eee;border-bottom: 1px solid #eee;">
                        <div class="panel-body" style="padding:0 10px;">
                            <ul class="nav nav-quirk" style="margin:0;">
                                <li style="border-top:0; border-bottom:0;">
                                    <div style="padding: 10px 10px 0px; display:flex; justify-content: space-between;">
                                        <div style="display:flex;">
                                            <div style="font-weight:600; font-size:13px; margin-right:10px; width:100px;">법인일정</div>
                                            <div>메세수 동호회 활동일</div>
                                        </div>
                                        <div>23/09/20 17:00 ~ 18:00</div>
                                    </div>
                                </li>
                                <li style="border-top:0; border-bottom:0;">
                                    <div style="padding: 10px 10px 0px; display:flex; justify-content: space-between;">
                                        <div style="display:flex;">
                                            <div style="font-weight:600; font-size:13px; margin-right:10px; width:100px;">법인일정</div>
                                            <div>2023년도 캠틱클러스터 워크숍 </div>
                                        </div>
                                        <div>23/10/12 ~ 23/10/13</div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="tab-pane" id="tab6" style="padding:20px 0; border-top: 1px solid #eee;border-bottom: 1px solid #eee;">
                        <div class="panel-body" style="padding:0 10px;">
                            <ul class="nav nav-quirk" style="margin:0;">
                                <li style="border-top:0; border-bottom:0;">
                                    <div style="padding: 10px 10px 0px; display:flex; justify-content: space-between;">
                                        <div style="display:flex;">
                                            <div style="font-weight:600; font-size:13px; margin-right:10px; width:100px;">직원일정</div>
                                            <div>출장</div>
                                            <div style="margin-left: 20px;">심형준</div>
                                        </div>
                                        <div>23/09/13 09:00 ~ 18:00</div>
                                    </div>
                                </li>
                                <li style="border-top:0; border-bottom:0;">
                                    <div style="padding: 10px 10px 0px; display:flex; justify-content: space-between;">
                                        <div style="display:flex;">
                                            <div style="font-weight:600; font-size:13px; margin-right:10px; width:100px;">직원일정</div>
                                            <div>연차</div>
                                            <div style="margin-left: 20px;">국민</div>
                                        </div>
                                        <div>23/09/13 09:00 ~ 18:00</div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="col-md-3 col-sm-3" style="margin-top:-10px; padding-left:0;">
    <div class="col-md-6 col-sm-6" style="padding-right:0;">
        <div class="panel" style="margin-bottom:10px;">
            <div class="panel-heading" style="background-color: #fff; padding:5px;">
                <h3 class="panel-title" style="color:#505b72; text-align:center; font-weight:600;"><a href="#" style="margin-right: 50px;" onclick="open_in_frame('/purc/purcReqList.do')"><i class="fa fa-shopping-cart" style="font-size:20px;padding:11px 11px 11px 0;"></i><span style="font-size:13px;">구매</span></a></h3>
            </div>
        </div><!-- panel -->
    </div>
    <div class="col-md-6 col-sm-6" style="padding-right:0;">
        <div class="panel" style="margin-bottom:10px;">
            <div class="panel-heading" style="background-color: #fff; padding:5px;">
                <h3 class="panel-title" style="color:#505b72; text-align:center; font-weight:600;"><a href="#" style="margin-right: 30px;" onclick="open_in_frame('/bustrip/bustripList.do')"><i class="fa fa-tasks" style="font-size:20px;padding:11px 11px 11px 0;"></i><span style="font-size:13px;">출장신청</span></a></h3>
            </div>
        </div><!-- panel -->
    </div>
    <div class="col-md-6 col-sm-6" style="padding-right:0;">
        <div class="panel" style="margin-bottom:10px;">
            <div class="panel-heading" style="background-color: #fff; padding:5px;">
                <h3 class="panel-title" style="color:#505b72; text-align:center; font-weight:600;"><a href="#" onclick="open_in_frame('/Inside/carReq.do')"><i class="fa fa-car" style="font-size:20px;padding:11px 11px 11px 0;"></i><span style="font-size:13px;">차량사용신청</span></a></h3>
            </div>
        </div><!-- panel -->
    </div>
    <div class="col-md-6 col-sm-6" style="padding-right:0;">
        <div class="panel" style="margin-bottom:10px;">
            <div class="panel-heading" style="background-color: #fff; padding:5px;">
                <h3 class="panel-title" style="color:#505b72; text-align:center; font-weight:600;"><a href="#" onclick="open_in_frame('/Inside/meetingRoomReq.do')"><i class="fa fa-building" style="font-size:20px;padding:11px 11px 11px 0;"></i><span style="font-size:13px;">회의실사용신청</span></a></h3>
            </div>
        </div><!-- panel -->
    </div>
    <div class="col-md-6 col-sm-6" style="padding-right:0;">
        <div class="panel" style="margin-bottom:10px;">
            <div class="panel-heading" style="background-color: #fff; padding:5px;">
                <h3 class="panel-title" style="color:#505b72; text-align:center; font-weight:600;"><a href="#" style="margin-right: 20px;" onclick="open_in_frame('/Inside/equipmentList.do')"><i class="fa fa-calendar-o" style="font-size:20px;padding:11px 11px 11px 0;"></i><span style="font-size:13px;">장비사용</span></a></h3>
            </div>
        </div><!-- panel -->
    </div>
    <div class="col-md-6 col-sm-6" style="padding-right:0;">
        <div class="panel" style="margin-bottom:10px;">
            <div class="panel-heading" style="background-color: #fff; padding:5px;">
                <h3 class="panel-title" style="color:#505b72; text-align:center; font-weight:600;"><a href="#" style="margin-right: 40px;" onclick="open_in_frame('/board/getBoardArticleList.do?')"><i class="fa fa-desktop" style="font-size:20px;padding:11px 11px 11px 0;"></i><span style="font-size:13px;">전산보완</span></a></h3>
            </div>
        </div><!-- panel -->
    </div>
    <div class="col-md-12 col-sm-12" style="padding-right:0;">
        <div class="panel" style="margin-bottom:10px;">
            <div style="padding: 25px 0 0 25px;">
                <h4 class="media-heading" style="color:#333;font-size:18px; font-weight:600;letter-spacing: -2px;">캠스팟 즐겨찾기</h4>
            </div>
            <div class="panel-body" style="padding:5px;">
                <div style="border:1px solid #eee; border-radius:10px; width:300px; height:195px; margin:10px auto; position:relative;">
                    <div style="padding: 20px 0px 40px 20px;">
                        <div style="line-height:20px;"><span style="font-weight: 600; font-size: 14px;">· 휴가관리</span></div>
                        <div style="line-height:20px;"><span style="font-weight: 600; font-size: 14px;">· [캠인사이드] 인사관리</span></div>
                        <div style="line-height:20px;"><span style="font-weight: 600; font-size: 14px;">· [캠인사이드] 자산관리</span></div>
                        <div style="line-height:20px;"><span style="font-weight: 600; font-size: 14px;">· [캠인사이드] 출장관리</span></div>
                    </div>
                    <div style="border-top:1px solid #eee; text-align:center;">
                        <span style="font-size: 15px; line-height: 45px; font-weight: 600;">즐겨찾기 설정</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-12 col-sm-12" style="padding-right:0;">
        <div class="panel" style="margin-bottom:10px; height:345px;">
            <div style="padding: 25px 0 0 25px;">
                <h4 class="media-heading" style="color:#333;font-size:18px; font-weight:600;letter-spacing: -2px;">함께보아요</h4>
            </div>
            <div class="panel-body">
                <div style="text-align:center;"><img src="/images/sample/testImages.png" alt="testImages" style="width:220px;"></div>
            </div>
        </div>
    </div>
    <div class="col-md-12 col-sm-12" style="padding-right:0;">
        <div class="panel" style="margin-bottom:10px;">
            <div class="panel-heading" style="background-color: #505b72; padding:5px;">
                <h3 class="panel-title" style="color:#fff; text-align:center; font-weight:600;"><a href="https://www.microsoft.com/ko-kr/microsoft-teams/download-app" target='_blank'><i class="fa fa-download" style="font-size:20px;padding:11px 11px 11px 0;"></i>팀즈</a></h3>
            </div>
        </div><!-- panel -->
    </div>
</div>
</div>

<script>
    $(function (){
        var menuNm = '${menuNm}';

        if(menuNm != '' && menuNm != null && menuNm != undefined && menuNm != '/indexBMain.do'){
            open_in_frame(menuNm);
        }
    });
</script>

