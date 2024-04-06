<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>

<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/commonProject.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/engn/teamInfoEngn.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/engn/teamInfoAjax.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js?${today}'/>"></script>

<input type="hidden" id="pjtSn" value="${params.pjtSn}" />
<input type="hidden" id="regEmpSeq" value="${loginVO.uniqId}"/>

<input type="hidden" id="teamVersionSn" value=""/>
<input type="hidden" id="myTmSn" value=""/>
<div style="padding: 10px">
    <div id="teamBtnDiv"></div>
    <div class="table-responsive">
        <table class="popTable table table-bordered mb-0" style="margin-top: 0px">
            <colgroup>
                <col width="%">
                <col width="20%">
                <col width="%">
                <col width="%">
                <col width="%">
                <col width="%">
                <col width="%">
                <col width="%">
                <col width="%">
                <col width="%">
            </colgroup>
            <thead id="verRow">
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

    <div id="teamDetailBtnDiv" class="detail" style="margin-top: 20px; display: none"></div>
    <div class="table-responsive detail" style="display: none">
        <table class="teamGrid popTable table table-bordered mb-0" style="margin-top: 0px">
            <colgroup>
                <col width="5%">
                <col width="5%">
                <col width="21%">
                <col width="10%">
                <col width="10%">
                <col width="10%">
                <col width="7%">
                <col width="10%">
                <col width="7%">
                <col width="5%">
                <col width="5%">
            </colgroup>
            <thead id="detailRow">
            <tr>
                <th></th>
                <th>구분</th>
                <th>팀</th>
                <th>담당자</th>
                <th>총예산</th>
                <th>배분금액(매출)</th>
                <th>배분비율</th>
                <th>예상비용</th>
                <th>예상수익</th>
                <th>PM</th>
                <th>팀장</th>
            </tr>
            </thead>
        </table>
    </div>
</div>

<script>
    teamEngn.fn_defaultScript();

    function userSearch() {
        window.open("/common/deptListPop.do", "조직도", "width=750, height=650");
    }
</script>
</body>
</html>