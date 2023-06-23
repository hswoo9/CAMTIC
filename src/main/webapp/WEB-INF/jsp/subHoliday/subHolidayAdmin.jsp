<%--
  Created by IntelliJ IDEA.
  User: user
  Date: 2023-03-13
  Time: 오후 2:10
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common.jsp" flush="false"/>
<script type="text/javascript" src="/js/intra/inside/subHoliday/subHolidayAdmin.js?v=${toDate}"/></script>

<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">
<input type="hidden" id="positionCode" name="positionCode" value="${loginVO.positionCode}">
<input type="hidden" id="deptSeq" name="deptSeq" value="${loginVO.orgnztId}">
<input type="hidden" id="dutyCode" name="dutyCode" value="${loginVO.dutyCode}">
<input type="hidden" id="apprStat" value="N">
<input type="hidden" id="vacUseHistId" value="">

<div class="col-md-10 col-lg-10 dash-left">
    <div class="panel">
        <div class="panel-heading">
            <h4 class="panel-title">휴가신청관리</h4>
            <div class="title-road">휴가관리 &gt; 휴가신청관리</div>
        </div>

        <div class="panel-body">
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>

            <div>
                <table class="table table-bordered mb-0" style="border: 0; margin-top : 5px; border: 1px solid #dedfdf;">
                    <tr>
                        <td style="border-bottom:0; background-color: white">
                            <div style="display:flex;justify-content: space-between;">
                                <div style="display:flex;">
                                <%--<div class="mr20">
                                    <span>조회기간</span>
                                    <input id="startDay" style="width:150px; margin-right:5px;">
                                    ~
                                    <input id="endDay" style="width:150px; margin-right:5px;">
                                </div>--%>
                                <div class="mr20">
                                    <span>휴가구분</span>
                                    <input type="text" id="edtHolidayKindTop" name="edtHolidayKindTop" required="required" style="width:150px;">
                                </div>

                                <div class="mr20">
                                    <span>상태</span>
                                    <input type="text" id="status" style="width: 150px;">
                                </div>

                                <div>
                                    <span>이름</span>
                                    <input type="text" id="searchVal" onkeypress="if(window.event.keyCode==13){subHolidayAdmin.gridReload()}" style="width: 150px;">
                                </div>
                                <div style="margin-left:10px;">
                                    <button class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="subHolidayAdmin.gridReload();">검색</button>
                                </div>
                                </div>
                                <div>
                                <div>
                                    <button class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="subHolidayAdmin.subHolidayReqBatchPop();">연가일괄등록</button>
                                </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                </table>
                <div id="mainGrid" style="margin:20px 0;"></div>
            </div>
        </div>
    </div>
</div><!-- col-md-9 -->

<jsp:include page="/WEB-INF/jsp/template/footer.jsp" flush="false"/>
<script type="text/javascript">
    subHolidayAdmin.init();
</script>