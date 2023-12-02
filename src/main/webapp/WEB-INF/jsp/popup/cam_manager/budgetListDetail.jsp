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
<script type="text/javascript" src="<c:url value='/js/intra/cam_mng/budgetListDetail.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_mng/camMng.js?v=${today}'/>"></script>

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

<div style="padding:0;">
    <div class="table-responsive">
        <input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM"><span style="position: relative; top: 3px;" id="title">예산 현황</span>

            </h3>

            <div class="btn-st popButton" style="font-size: 13px;">

            </div>
        </div>

        <div>
            <table class="popTable table table-bordered mb-0">
                <colgroup>
                    <col width="15%">
                    <col width="35%">
                    <col width="15%">
                    <col width="35%">
                </colgroup>
                <thead>
                <tr>
                    <th colspan="4" style="font-weight: bold">프로젝트정보</th>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        프로젝트 코드
                    </th>
                    <td>
                        ${projectInfo.PJT_CD}
                    </td>
                    <th scope="row" class="text-center th-color">
                        프로젝트 명
                    </th>
                    <td>
                        ${projectInfo.PJT_NM}
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        프로젝트 시작일
                    </th>
                    <td>
                        ${projectInfo.PJT_START_DT}
                    </td>
                    <th scope="row" class="text-center th-color">
                        프로젝트 종료일
                    </th>
                    <td>
                        ${projectInfo.PJT_END_DT}
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        관리예금계좌
                    </th>
                    <td>
                        ${projectInfo.POSITION_NAME}
                    </td>
                    <th scope="row" class="text-center th-color">
                        관리예금계좌번호
                    </th>
                    <td>
                        ${projectInfo.JOIN_DAY}
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        이월잔액
                    </th>
                    <td>
                        ${projectInfo.PJT_START_DT}
                    </td>
                    <th scope="row" class="text-center th-color">
                        시재현황
                    </th>
                    <td>
                        ${projectInfo.PJT_END_DT}
                    </td>
                </tr>
                </thead>
            </table>
        </div>


        <div>
            <table class="popTable table table-bordered mb-0">
                <colgroup>
                    <col width="10%">
                    <col width="15%">
                    <col width="15%">
                    <col width="15%">
                    <col width="15%">
                    <col width="15%">
                    <col width="15%">
                    <col width="15%">
                </colgroup>
                <thead>
                <tr>
                    <th colspan="8" style="font-weight: bold">수입예산</th>
                </tr>
                <tr id="A">

                </tr>
                </thead>
                <tbody id="Ab">
                <tr>
                    <td colspan="8" style="text-align: center">데이터가 없습니다.</td>
                </tr>
                </tbody>
            </table>
        </div>

        <div>
            <table class="popTable table table-bordered mb-0">
                <colgroup>
                    <col width="10%">
                    <col width="15%">
                    <col width="15%">
                    <col width="15%">
                    <col width="15%">
                    <col width="15%">
                    <col width="15%">
                    <col width="15%">
                </colgroup>
                <thead>
                <tr>
                    <th colspan="8" style="font-weight: bold">지출예산</th>
                </tr>
                </thead>
            </table>
            <div id="budgetMainGrid"></div>
        </div>
    </div>
</div>

<script>
    bld.fn_defaultScript();
</script>
</body>
</html>