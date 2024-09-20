<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>

<style>
    .table-responsive {
        overflow-x: hidden !important;
    }
</style>
<script type="text/javascript" src="<c:url value='/js/intra/cam_mng/budgetDetailView.js?v=${today}'/>"></script>

<input type="hidden" id="regEmpSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="regEmpName" value="${loginVO.name}"/>
<input type="hidden" id="regDeptSeq" value="${loginVO.deptId}"/>
<input type="hidden" id="regDeptName" value="${loginVO.deptNm}"/>
<input type="hidden" id="regTeamSeq" value="${loginVO.teamId}"/>
<input type="hidden" id="regTeamName" value="${loginVO.teamNm}"/>
<input type="hidden" id="regPositionCode" value="${loginVO.positionCode}"/>
<input type="hidden" id="regPositionName" value="${loginVO.positionNm}"/>
<input type="hidden" id="regDutyCode" value="${loginVO.dutyCode}"/>
<input type="hidden" id="regDutyName" value="${loginVO.dutyNm}"/>
<input type="hidden" id="regGradeCode" value="${loginVO.gradeCode}"/>
<input type="hidden" id="regGradeName" value="${loginVO.gradeNm}"/>

<input type="hidden" id="pjtCd" value="${params.pjtCd}"/>
<input type="hidden" id="bgtCd" value="${params.bgtCd}"/>
<input type="hidden" id="temp" value="${params.temp}"/>
<input type="hidden" id="strDt" value="${params.strDt}"/>
<input type="hidden" id="endDt" value="${params.endDt}"/>
<input type="hidden" id="stat" value="${params.stat}"/>

<div style="padding:0;">
    <div class="table-responsive">
        <input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">
                <span style="position: relative; top: 3px;" id="title">
                    <c:if test="${params.temp eq 'A'}">지출 내역</c:if>
                    <c:if test="${params.temp eq 'B'}">수입 내역</c:if>
                </span>
            </h3>

            <div class="btn-st popButton" style="font-size: 13px;">

            </div>
        </div>

        <div>
            <table class="popTable table table-bordered mb-0">
                <colgroup>
                    <col width="10%">
                    <col width="23%">
                    <col width="10%">
                    <col width="23%">
                    <col width="10%">
                    <col width="23%">
                </colgroup>
                <thead>
                <tr>
                    <th scope="row" class="text-center th-color">예산비목(장)</th>
                    <td style="text-align: center;">${bgtCode.JANG_NM}</td>
                    <th scope="row" class="text-center th-color">예산비목(관)</th>
                    <td style="text-align: center;">${bgtCode.GWAN_NM}</td>
                    <th scope="row" class="text-center th-color">예산비목(항)</th>
                    <td style="text-align: center;">${bgtCode.HANG_NM}</td>
                </tr>
<%--                <tr>--%>
<%--                    <th scope="row" class="text-center th-color">지출금액</th>--%>
<%--                    <td></td>--%>
<%--                    <th scope="row" class="text-center th-color">여입금액</th>--%>
<%--                    <td></td>--%>
<%--                    <th scope="row" class="text-center th-color">지출대기 금액</th>--%>
<%--                    <td></td>--%>
<%--                    <th scope="row" class="text-center th-color">승인금액</th>--%>
<%--                    <td></td>--%>
<%--                </tr>--%>
                </thead>
            </table>
        </div>

        <div style="margin-top: 20px;">
            <div id="mainGrid"></div>
        </div>

    </div>
</div>

<script>
    bdv.fn_defaultScript();
</script>
</body>
</html>