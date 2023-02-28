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
    </ul>
</div>