<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>

<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/engn/costInfoAdmin.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/engn/costInfoAdminGrid.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/engn/costInfoAdminPop.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/commonProject.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/engn/purcInfo.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js?${today}'/>"></script>
<style>
    table {margin-top: 0 !important;}
</style>


<input type="hidden" id="engnSn" value="${params.engnSn}" />
<input type="hidden" id="estSn" value="${params.estSn}" />
<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<form id="costDraftFrm" method="post">
    <input type="hidden" id="pjtSn" name="pjtSn" value="${params.pjtSn}" />
    <input type="hidden" id="menuCd" name="menuCd" value="dev">
    <input type="hidden" id="type" name="type" value="drafting">
    <input type="hidden" id="nowUrl" name="nowUrl" />
</form>
<input type="hidden" id="loginEmpSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="deptSeq" value="${loginVO.orgnztId}">
<input type="hidden" id="costMgtCd" value="${hashMap.PJT_CD}" />

<input type="hidden" id="busnClassData" value="${hashMap.BUSN_CLASS}"/>
<input type="hidden" id="taxGubun" value=""/>

<input type="hidden" id="busnNm" value="" />
<input type="hidden" id="searchKeyword" />
<input type="hidden" id="searchValue" />

<input type="hidden" id="searchPjtSn" value="${params.pjtSn}"/>

<div style="padding: 10px">
    <div id="costInfoDiv" style="display: none; background-color: #eef6ff; padding: 10px; font-size: 13px;">
        <span id="costPjtClass"></span>
    </div>

    <div class="table-responsive">
        <span style="font-size: 12px;">◎ 사업정보</span>
        <table class="popTable table table-bordered mb-0">
            <colgroup>
                <col width="25%">
                <col width="25%">
                <col width="25%">
                <col width="25%">
            </colgroup>
            <thead>
            <tr>
                <th style="text-align: right">프로젝트 코드</th>
                <td colspan="3" id="PJT_CD" style="text-align: left"></td>
            </tr>
            <tr>
                <th style="text-align: right">프로젝트 명</th>
                <td colspan="3" id="PJT_NM" style="text-align: left"></td>
            </tr>
            <tr>
                <th style="text-align: right">총괄 책임자</th>
                <td id="PM" style="text-align: left"></td>
                <th style="text-align: right">사업 담당자</th>
                <td style="text-align: left"></td>
            </tr>
            <tr>
                <th style="text-align: right">프로젝트 시작</th>
                <td id="PJT_STR_DT" style="text-align: left"></td>
                <th style="text-align: right">프로젝트 종료</th>
                <td id="PJT_END_DT" style="text-align: left"></td>
            </tr>
            <tr>
                <th style="text-align: right">프로젝트 총예산</th>
                <td id="PJT_AMT" style="text-align: left"></td>
                <th style="text-align: right">사업비 분리사용</th>
                <td id="SBJ_SEP" style="text-align: left"></td>
            </tr>
            </thead>
        </table>

        <div style="margin-top:10px;"></div><span style="font-size: 12px;">◎ 재무실적 내역</span>
        <table id="pjtInfoRow" class="popTable table table-bordered mb-0">
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
            </colgroup>
            <thead >
            <tr>
                <th style="text-align: center">구분</th>
                <th style="text-align: center">프로젝트 코드</th>
                <th style="text-align: center">부서</th>
                <th style="text-align: center">팀</th>
                <th style="text-align: center">수주금액</th>
                <th style="text-align: center">달성 매출액</th>
                <th style="text-align: center">달성 운영수익</th>
                <th style="text-align: center">예상 매출액</th>
                <th style="text-align: center">예상 운영수익</th>
            </tr>
            <tr>
                <td id="PJT_TYPE" style="text-align: center"></td>
                <td id="PJT_CD2" style="text-align: center"></td>
                <td id="PM_DEPT" style="text-align: center"></td>
                <td id="PM_TEAM" style="text-align: center"></td>
                <td id="PJT_AMT2" style="text-align: right"></td>
                <td id="RES_AMT" style="text-align: right"></td>
                <td id="RES_NOT_INV_AMT" style="text-align: right"></td>
                <td id="DEV_AMT" style="text-align: right"></td>
                <td id="DEV_NOT_INV_AMT" style="text-align: right"></td>
            </tr>
            </thead>
        </table>

        <div class="multiUi" style="display: none; margin-top:10px;"></div><span class="multiUi" style="display: none; font-size: 12px">◎ 전차년도 마감 현황</span>
        <table class="multiUi popTable table table-bordered mb-0" style="display: none">
            <colgroup>
                <col width="25%">
                <col width="10%">
                <col width="10%">
                <col width="20%">
                <col width="20%">
            </colgroup>
            <thead>
            <tr>
                <th style="text-align: center">팀명</th>
                <th style="text-align: center">구분</th>
                <th style="text-align: center">년도</th>
                <th style="text-align: center">매출액</th>
                <th style="text-align: center">운영수익</th>
            </tr>
            <tr>
                <td style="text-align: center"></td>
                <td style="text-align: center"></td>
                <td style="text-align: center"></td>
                <td style="text-align: center"></td>
                <td style="text-align: center"></td>
            </tr>
            </thead>
        </table>

        <div style="margin-top:10px;"></div><span style="font-size: 12px;">◎ 총 합계</span>
        <table id="sumTable" class="popTable table table-bordered mb-0"></table>

        <div style="margin-top:10px;"></div><span style="font-size: 12px;">◎ 구매내역</span>
        <div id="grid2"></div>

        <div style="margin-top:10px;"></div><span style="font-size: 12px;">◎ 출장내역</span>
        <div id="grid3"></div>

        <div clsss="grid4" id="grid4Div" style="display: none; margin-top:10px;"></div><span clsss="grid4" id="grid4Span" style="display: none; font-size: 12px;">◎ 지출내역</span>
        <div clsss="grid4" id="grid4" style="display: none;"></div>
    </div>

    <input type="hidden" id="purcSumTemp2"/>
    <input type="hidden" id="bustSumTemp2"/>
    <input type="hidden" id="costSumTemp2"/>
</div>

<script>
    costInfo.fn_defaultScript();
</script>
</body>
</html>