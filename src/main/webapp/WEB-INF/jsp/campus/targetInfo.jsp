<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<script type="text/javascript" src="/js/intra/campus/campus.js?v=${toDate}"/></script>
<script type="text/javascript" src="/js/intra/campus/targetInfo.js?v=${toDate}"/></script>
<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<div class="mainCard">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left: 20px; padding-right: 20px;">
            <h4 class="panel-title">목표기술서 작성</h4>
            <div class="title-road">캠퍼스 > 학습관리 > 직무관리 &gt; 목표기술서작성</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div>
                <input type="button" class="stepBtn stepBtn2 k-grid-button k-button k-button-md k-button-solid k-button-solid-info" value="목표기술서 신규등록" onclick="targetInfo.targetAddYearPop();"/>

                <table class="searchTable table table-bordered" style="border: 0; margin-top : 20px; border: 1px solid #dedfdf;">
                    <colgroup>
                        <col width="10%">
                        <col width="40%">
                        <col width="10%">
                        <col width="40%">
                    </colgroup>
                    <tr>
                        <th class="text-center th-color">적용년도</th>
                        <td colspan="3">
                            <input type="text" id="targetYear" style="width: 140px;">
                        </td>
                    </tr>
                </table>
                <table class="table table-bordered">
                    <colgroup>
                        <col width="20%" >
                        <col width="80%" >
                    </colgroup>
                    <thead>
                        <tr>
                            <th>승인상태</th>
                            <td id="stat">작성 중</td>
                        </tr>
                    </thead>
                </table>
                <input type="button" class="stepBtn k-grid-button k-button k-button-md k-button-solid k-button-solid-base" value="STEP1-1 : 주업무 선택" onclick="targetInfo.targetInfoPop();"/>
                <input type="button" class="stepBtn k-grid-button k-button k-button-md k-button-solid k-button-solid-base" value="STEP1-2 : 주업무 현황 및 목표 설정" onclick="targetInfo.targetMainSetPop();"/>
                <input type="button" class="stepBtn k-grid-button k-button k-button-md k-button-solid k-button-solid-base" value="STEP2-1 : 연계업무 선택" onclick="targetInfo.targetSubInfoPop();"/>
                <input type="button" class="stepBtn k-grid-button k-button k-button-md k-button-solid k-button-solid-base" value="STEP2-2 : 연계업무 현황 및 목표 설정" onclick="targetInfo.targetSubSetPop();"/>

                <div class="non" style="text-align: center; margin: auto; margin-top: 10px">등록된 목표기술서가 없습니다<br>목표기술서를 등록해주세요</div>

                <div class="mt20">
                    <b>color : <font color="#9a4167">현황</font>, <font color="#418bd7">목표</font></b>
                    <div class="table-responsive">
                        <table class="table table-bordered">
                            <tbody id="tableData">
                            </tbody>
                        </table>
                    </div><!-- table-responsive -->
                </div>
                <input type="button" class="appBtn k-grid-button k-button k-button-md k-button-solid k-button-solid-base" value="승인요청" onclick="targetInfo.updateApprStat('10');"/>
                <input type="button" class="canBtn k-grid-button k-button k-button-md k-button-solid k-button-solid-base" value="승인요청 취소" onclick="targetInfo.updateApprStat('0');"/>
            </div>
        </div>

    </div>
</div><!-- col-md-9 -->

<script type="text/javascript">
    targetInfo.init();
</script>