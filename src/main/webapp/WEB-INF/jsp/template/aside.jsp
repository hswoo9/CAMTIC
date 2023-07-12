<%--
  Created by IntelliJ IDEA.
  User: jsp
  Date: 2023-02-28
  Time: 오전 11:20
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<div class="headerMenu"></div>
<input type="checkbox" class="openSidebarMenu" id="openSidebarMenu">
<label for="openSidebarMenu" class="sidebarIconToggle">
    <div class="spinner diagonal part-1"></div>
    <div class="spinner horizontal"></div>
    <div class="spinner diagonal part-2"></div>
</label>
<div id="sidebarMenu">
    <ul class="sidebarMenuInner">
        <div class="row">
            <div class="col-sm-5 col-md-12 col-lg-12" style="margin-top:-10px;">
                <div class="media leftpanel-profile" style="text-align:center; background-color:#fff;">
                <div>
                    <a href="#">
                        <img src="/images/photos/loggeduser1.png" alt="" class="media-object img-circle" style="text-align: center; margin: 0 auto; margin-bottom: 10px; width:100px;">
                    </a>
                </div>
                <div class="media-body">
                    <h4 class="media-heading" style="color:#333;font-size:18px; font-weight:600;letter-spacing: -2px;">김캠틱 선임</h4>
                    <span style="color:#919191; font-size:15px;line-height:32px;letter-spacing: -2px;">마케팅1팀</span>
                </div>
                <div style="margin-top:10px;">
                    <div style="display:flex; justify-content: space-between; margin: 0px 10px;height:25px;"><span style="color:#333;font-weight:600;">결재할 문서</span><span style="color:#919191;font-weight:600;">0</span></div>
                    <div style="display:flex; justify-content: space-between; margin: 0px 10px;height:25px;"><span style="color:#333;font-weight:600;">오늘의 일정</span><span style="color:#919191;font-weight:600;">0</span></div>
                    <div style="display:flex; justify-content: space-between; margin: 0px 10px;height:25px;"><span style="color:#333;font-weight:600;">작성할 보고</span><span style="color:#919191;font-weight:600; color:#259dab;">120</span></div>
                </div>
                <%--<div class="mt10" style="display:flex;justify-content: center;">
                    <button class="btn btn-quirk infoBtn" id="goWork">출근</button>
                    <button class="btn btn-quirk infoBtn" id="offWork">퇴근</button>
                </div>--%>
            </div>
            <div class="panel" style="margin-bottom:10px;">
                <div style="margin-top: 10px; padding: 25px 0 0 25px;">
                    <h4 class="media-heading" style="color:#333;font-size:18px; font-weight:600;letter-spacing: -2px;">최근 로그인 정보</h4>
                </div>
                <div class="panel-body">
                   <table style="background-color:#fff; text-align:center;">
                       <colgroup>
                           <col width="40%">
                           <col width="40%">
                           <col width="20%">
                       </colgroup>
                       <tr style="border-bottom: 1px solid #eee;">
                           <th style="color:#333;font-weight:600; text-align:center;">일시</th>
                           <th style="color:#333;font-weight:600; text-align:center;">IP</th>
                           <th style="color:#333;font-weight:600; text-align:center;">접속기기</th>
                       </tr>
                       <tr>
                           <td style="color:#333;font-weight:600;padding:3px; text-align:center;">2023-07-11 13:43</td>
                           <td style="color:#919191;font-weight:600;padding:3px; text-align:center;">218.158.231.107</td>
                           <td style="text-align:center;padding:3px;">PC</td>
                       </tr>
                       <tr>
                           <td style="color:#333;font-weight:600;padding:3px; text-align:center;">2023-07-11 13:43</td>
                           <td style="color:#919191;font-weight:600;padding:3px; text-align:center;">218.158.231.107</td>
                           <td style="text-align:center;padding:3px;">PC</td>
                       </tr>
                       <tr>
                           <td style="color:#333;font-weight:600;padding:3px;">2023-07-11 08:39</td>
                           <td style="color:#919191;font-weight:600;padding:3px;">115.144.64.1</td>
                           <td style="text-align:center;padding:3px;">PC</td>

                       </tr>
                   </table>
                </div>
            </div>
            <div class="panel">
                <div style="padding: 25px 0 0 25px;">
                    <h4 class="media-heading" style="color:#333;font-size:18px; font-weight:600;letter-spacing: -2px;">함께보아요</h4>
                </div>
                <div class="panel-body">
                    <div style="text-align:center;"><img src="/images/sample/testImages.png" alt="testImages" style="width:270px;"></div>
                </div>
            </div>
        </div><!-- col-md-12 -->
    </div><!-- row -->

        <%--<div class="row" style="margin-top:15px;">
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
        </div>--%>
    </ul>
</div>