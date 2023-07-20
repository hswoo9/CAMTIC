<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/inside/userManage/userResignRegPop.js?v=1"></script>
<body class="font-opensans" style="background-color:#fff;">
<div class="col-lg-12" style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">직원 퇴사처리</h3>
            <div class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-info" onclick="userResignRegPop.setUserResignReg()">퇴사처리</button>
                <button type="button" class="k-button k-button-solid-error" onclick="window.close();">닫기</button>
            </div>
        </div>
        <input type="hidden" id="regEmpSeq" name="regEmpSeq" value="${loginVO.uniqId}">
        <table class="popTable table table-bordered mb-0" id="userReqPopImageTable">
            <colgroup>
                <col width="20%">
            </colgroup>
            <thead>
            <tr>
                <th>직원명</th>
                <td>
                    <input type="hidden" id="empSeq" name="empSeq" value="${empInfo.EMP_SEQ}">
                    ${empInfo.EMP_NAME_KR} ${empInfo.POSITION_NAME}
                </td>
            </tr>
            <tr>
                <th>퇴사일자</th>
                <td>
                    <input type="text" id="resignDay" name="resignDay">
                </td>
            </tr>
            <tr>
                <th>퇴사사유</th>
                <td>
                    <textarea id="resignReason"></textarea>
                </td>
            </tr>
            </thead>
        </table>
    </div>
</div>
<script>
    userResignRegPop.defaultScript();
</script>
</body>
