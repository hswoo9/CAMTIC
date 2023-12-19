<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>

<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/commonProject.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/engn/teamInfoEngn.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js?${today}'/>"></script>

<input type="hidden" id="pjtSn" value="${params.pjtSn}" />
<input type="hidden" id="regEmpSeq" value="${loginVO.uniqId}"/>
<div style="padding: 10px">
    <div id="teamBtnDiv">
        <button type="button" id="saveBtn" style="float: right; margin-bottom: 10px;" class="k-button k-button-solid-info" onclick="">버전추가</button>
    </div>
    <div class="table-responsive">
        <table class="popTable table table-bordered mb-0">
            <colgroup>
                <col width="%">
                <col width="%">
                <col width="%">
                <col width="%">
                <col width="%">
                <col width="%">
                <col width="%">
                <col width="%">
                <col width="%">
                <col width="%">
            </colgroup>
            <thead id="verRows">
            <tr>
                <th>버전</th>
                <th>프로젝트명</th>
                <th>총예산</th>
                <th>수행팀</th>
                <th>등록일</th>
                <th>협업예산</th>
                <th>배분비율</th>
                <th>예상비용</th>
                <th>예상수익</th>
                <th>협업보고서</th>
            </tr>
            </thead>
        </table>
    </div>
</div>

<script>
    teamInfo.fn_defaultScript();

    function userSearch() {
        window.open("/common/deptListPop.do", "조직도", "width=750, height=650");
    }
</script>
</body>
</html>