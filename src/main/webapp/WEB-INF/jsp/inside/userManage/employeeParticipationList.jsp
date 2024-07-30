<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="/js/intra/inside/userManage/empPartRate.js?v=${today}"/></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_mng/partRate/partRateCommon.js?v=${today}'/>"></script>

<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="parentDeptSeq" value="${loginVO.deptId}">
<input type="hidden" id="deptSeq" value="${loginVO.orgnztId}"/>
<input type="hidden" id="deptName" value="${loginVO.orgnztNm}"/>
<input type="hidden" id="dutyCode" value="${loginVO.dutyCode}">
<input type="hidden" id="engMa" value="${loginVO.engMa}">

<input type="hidden" id="tempEmpSeq" value=""/>
<input type="hidden" id="tempEmpName" value=""/>
<input type="hidden" id="tempJoinDay" value=""/>
<input type="hidden" id="tempEmpSal" value=""/>
<input type="hidden" id="tempChngSal" value=""/>
<input type="hidden" id="rateFlag" value=""/>



<div class="col-md-12 col-lg-12 dash-left">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">직원별참여현황</h4>
            <div class="title-road" style="text-align: right; margin-bottom: 5px;">캠인사이드 > 인사관리 > 참여율관리 > 직원별참여현황</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>
        <div class="panel-body">
            <div style="margin-bottom:10px;">
                <table class="searchTable table table-bordered">
                    <colgroup>
                        <col width="5%">
                        <col width="8%">
                        <col width="10%">
                        <col width="8%">
                        <col width="10%">
                        <col width="8%">
                        <col width="10%">
                        <col width="8%">
                        <col width="10%">
                        <col width="8%">
                        <col width="10%">
                    </colgroup>
                    <tr>
                        <td>
                            <input type="text" id="rowNum" style="width: 100px;">
                        </td>
                        <th class="text-center th-color">부서</th>
                        <td>
                            <input type="text" id="deptComp" style="width: 150px;">
                        </td>
                        <th class="text-center th-color">팀</th>
                        <td>
                            <input type="text" id="deptTeam" style="width: 180px;">
                        </td>
                        <th class="text-center th-color">재직여부</th>
                        <td>
                            <input type="text" id="status" style="width: 100px;">
                        </td>
                        <th class="text-center th-color">직원유형</th>
                        <td>
                            <input type="text" id="division" style="width: 150px;">
                        </td>
                        <th class="text-center th-color">연도</th>
                        <td>
                            <input type="text" id="bsYear" style="width: 100%">
                        </td>
                    </tr>
                    <tr>
                        <td>
                        </td>
                        <th class="text-center th-color">검색어</th>
                        <td colspan="9">
                            <input type="text" id="userKind" style="width: 100px;">
                            <input type="text" id="kindContent" style="width: 150px;" onkeypress="if(window.event.keyCode==13){empPartRate.fn_gridReload();}">
                        </td>
                    </tr>
                </table>

                <div id="clickTable">
                    <div id="divBtn" style="font-size: 12px; margin-top: 10px;">
                        <button type="button" class="k-button k-button-solid-base k-button-sm" style="float: right; margin: 0 5px 5px 0;" onclick="empPartRate.fn_setData('A')">참여율</button>
                        <button type="button" class="k-button k-button-solid-base k-button-sm" style="float: right; margin:0 5px 5px 0;" onclick="empPartRate.fn_setData('B')">월지급액</button>
                        <button type="button" class="k-button k-button-solid-base k-button-sm" style="float: right; margin:0 5px 5px 0;" onclick="empPartRate.closeDiv()">접기</button>
                        <div style="float: right; margin: 3px 5px 0 0;">
                            <input type="checkbox" id="payCheck" class="k-checkbox" name="gubun" value="pay" onchange="empPartRate.fn_changeCheck('C')" checked="checked"/>
                            <label for="payCheck">현금</label>
                            <input type="checkbox" id="itemCheck" class="k-checkbox" name="gubun" value="item" onchange="empPartRate.fn_changeCheck('C')"/>
                            <label for="itemCheck">현물</label>
                        </div>
                    </div>
                    <table class="popTable table table-bordered mb-0" style="padding: 0;font-size: 9px;>
                        <colgroup>
                            <col width="5%">
                            <col width="3%">
                            <col width="5%">
                            <col width="8%">
                            <col width="8%">
                            <col width="13%">
                            <col width="5%">
                            <col width="5%">
                            <col width="3%">
                            <col width="3%">
                            <col width="3%">
                            <col width="3%">
                        </colgroup>

                        <thead>
                        <tr id="userPartRateHeader">

                        </tr>
                        </thead>

                        <tbody id="userPartRateBody">
                        <tr>
                            <td colspan="17" style="text-align: center">참여율 정보가 없습니다.</td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <div id="mainGrid" style="margin:20px 0;"></div>
            </div>
        </div>

    </div>
</div><!-- col-md-9 -->

<script type="text/javascript">
    empPartRate.fn_defaultScript();
</script>