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

<link rel="stylesheet" href="/css/intra/user/org.css?${toDate}">
<script type="text/javascript" src="/js/intra/user/user.js?${toDate}"></script>

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
    </div>
</div><!-- col-md-9 -->


<script>
$(document).keydown(function(e) {
    var code = e.keyCode || e.which;
    if (code == 27) {
        $(".organization_bg").hide();
        $(".shadow").hide();
    }
});
</script>