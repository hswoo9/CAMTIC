<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<script type="text/javascript" src="/js/intra/campus/myEduStatus.js?v=${toDate}"/></script>
<div class="mainCard">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left: 20px; padding-right: 20px;">
            <h4 class="panel-title">나의학습현황</h4>
            <div class="title-road">캠퍼스 > 학습관리 > 학습관리 &gt; 나의학습현황</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div id="btnDiv" style="text-align: right">
                <button type="button" id="btn1" style="margin-bottom: 5px;" class="k-button k-button-solid-base" onclick="myEdu.campusGuide1Pop()">캠-퍼스 개요</button>
                <button type="button" id="btn2" style="margin-bottom: 5px;" class="k-button k-button-solid-base" onclick="myEdu.campusGuide2Pop()">역량/학습체계</button>
                <button type="button" id="btn3" style="margin-bottom: 5px;" class="k-button k-button-solid-base" onclick="myEdu.campusGuide3Pop()">직무 학습체계도</button>
            </div>
            <div style="margin-bottom:10px;">
                <table class="searchTable table table-bordered" style="border: 0; margin: 5px 0 25px 0; border: 1px solid #dedfdf;">
                    <colgroup>
                        <col width="20%">
                        <col width="80%">
                    </colgroup>
                    <tr>
                        <td colspan="2" class="text-center th-color">
                            <text style="color: #b94a48"><b id="userName" style="color: #000000"></b> 님의 <input id="applyYear" style="width: 8%"/> <b id="totalTime">총 교육시간은 41시간</b> 입니다.</text>
                        </td>
                    </tr>
                </table>
                <div style="display: flex; justify-content: space-between"><div><span style="margin: 0">☞ 개인 직무학습</span></div><div>인정시간 계 : <span id="personalTime">51시간</span></div></div>
                <div id="mainGrid" style="margin: 5px 0 25px 0;"></div>

                <div style="display: flex; justify-content: space-between"><div><span style="margin: 0">☞ 학습조</span></div><div>인정시간 계 : <span id="studyTime">51시간</span></div></div>
                <div id="mainGrid2" style="margin: 5px 0 25px 0;"></div>

                <div style="display: flex; justify-content: space-between"><div><span style="margin: 0">☞ 전파학습</span></div><div>인정시간 계 : <span id="propagTime">51시간</span></div></div>
                <div id="mainGrid3" style="margin: 5px 0 25px 0;"></div>

                <div style="display: flex; justify-content: space-between"><div><span style="margin: 0">☞ OJT</span></div><div>인정시간 계 : <span id="ojtTime">51시간</span></div></div>
                <div id="mainGrid4" style="margin: 5px 0 25px 0;"></div>

                <div style="display: flex; justify-content: space-between"><div><span style="margin: 0">☞ 오픈스터디</span></div><div>인정시간 계 : <span id="openStudyTime">51시간</span></div></div>
                <div id="mainGrid5" style="margin: 5px 0 25px 0;"></div>

                <div style="display: flex; justify-content: space-between"><div><span style="margin: 0">☞ 공통학습</span></div><div>인정시간 계 : <span id="commonEduTime">51시간</span></div></div>
                <div id="mainGrid6" style="margin: 5px 0 25px 0;"></div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<script type="text/javascript">
    myEdu.init();
</script>