<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>

<body class="font-opensans" style="background-color:#fff;">
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/commonProject.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/teamReqPop.js?v=${today}'/>"></script>
<input type="hidden" id="pjtSn" value="${params.pjtSn}" />
<input type="hidden" id="teamVersionSn" value="${params.teamVersionSn}" />
<input type="hidden" id="regEmpSeq" value="${loginVO.uniqId}" />

<input type="hidden" id="delvAmt" value="" />
<input type="hidden" id="leftAmt" value="" />

<input type="hidden" id="tmSn" value="${params.tmSn}" />

<div style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM"><span style="position: relative; top: 3px;" id="pjtTitle">협업 등록</span>
            </h3>
            <button type="button" id="saveBtn" style="float: right; top:5px" class="k-button k-button-solid-info" onclick="teamReq.fn_save()">저장</button>
            <button type="button" id="modBtn" style="display: none; float: right; top:5px" class="k-button k-button-solid-primary" onclick="teamReq.fn_save()">수정</button>
        </div>
        <table class="popTable table table-bordered mb-0">
            <colgroup>
                <col width="15%">
                <col width="35%">
                <col width="15%">
                <col width="35%">
            </colgroup>
            <thead>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>배분프로젝트명
                </th>
                <td colspan="3" id="pjtNm"></td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    총 예산
                </th>
                <td>
                    <input id="delvAmtTmp" style="width: 90%; text-align: right" disabled /> 원
                </td>
                <th scope="row" class="text-center th-color">
                    수주부서 남은 예산
                </th>
                <td>
                    <input id="leftAmtTmp" style="width: 90%; text-align: right" disabled /> 원
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    협업팀
                </th>
                <td>
                    <input id="team" style="width: 90%;" disabled>
                    <input type="hidden" id="teamSeq" />
                </td>
                <th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>담당자
                </th>
                <td>
                    <input id="teamPMNm" style="width: 80%;" disabled />
                    <input type="hidden" id="teamPMSeq" />
                    <button type="button" id="teamPMBtn" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="userSearch()">
                        조회
                    </button>
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>배분금액(매출)
                </th>
                <td>
                    <input id="teamAmt" value="0" onkeyup="teamReq.fn_calCost(this)" oninput="onlyNumber(this)" style="width: 90%; text-align: right" /> 원
                </td>
                <th scope="row" class="text-center th-color">
                    배분비율
                </th>
                <td>
                    <input id="teamPer" value="0" style="width: 90%; text-align: right" disabled/> %
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>예상비용
                </th>
                <td>
                    <input id="teamInvAmt" onkeyup="teamReq.fn_calCost(this)" oninput="onlyNumber(this)" value="0" style="width: 90%; text-align: right"/> 원
                </td>
                <th scope="row" class="text-center th-color">
                    예상수익
                </th>
                <td>
                    <input id="teamIncomePer" value="0" style="width: 90%; text-align: right" disabled/> %
                </td>
            </tr>
            </thead>
        </table>
    </div>
</div>
<script type="text/javascript">
    teamReq.fn_defaultScript();

    function userSearch() {
        window.open("/common/deptListPop.do", "조직도", "width=750, height=650");
    }
</script>
</body>
</html>