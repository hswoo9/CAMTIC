<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<jsp:useBean id="today" class="java.util.Date" />
<c:set var="now" value="<%=new java.util.Date()%>" />
<c:set var="toDay"><fmt:formatDate value="${now}" pattern="yyyy" /></c:set>
<script type="text/javascript" src="<c:url value='/js/intra/cam_crm/mfOverviewJeonbukStat.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js?${today}'/>"></script>
<style>
    #jeonbukTb thead th, #jeonbukTb thead td{
        display: none;
    }
    .chk2 {
        margin-right: 5px;
    }
</style>
<%
    String crmMfSn = request.getParameter("crmMfSn");
    String mfNo = request.getParameter("mfNo");
    String searchYear = request.getParameter("searchYear");
    if(crmMfSn == null){
        return ;
    }

    if(mfNo == null){
        return ;
    }

    if(searchYear == null){
        return ;
    }
%>
<c:set var="searchYear" value="<%=searchYear%>"/>
<input type="hidden" id="mfNo" value="<%=mfNo%>" />
<div style="padding: 10px">
    <div style="text-align: right">
        <input type="text" id="searchYear2" class="searchYear" style="width: 80px" value="<%=searchYear%>" onchange="movJbStat.mfOverViewDataSet()">
        <button type="button" id="saveBtn" style="margin-bottom: 5px;" class="k-button k-button-solid-info" onclick="movJbStat.mfOverViewDataSet();">조회</button>
    </div>
    <div>
        <input type="text" id="detailSearch2">
<%--        <input type="checkbox" id="areaChk2" name="jeonbukChk2" value="MF_AREA" class="chk2"><label for="areaChk2">지역</label>--%>
<%--        <input type="checkbox" id="activeChk2" name="jeonbukChk2" value="ACTIVE" class="chk2"><label for="activeChk2">정상유무</label>--%>
<%--        <input type="checkbox" id="mfNameChk2" name="jeonbukChk2" value="MF_NAME" class="chk2"><label for="mfNameChk2">사업체명</label>--%>
<%--        <input type="checkbox" id="mfNo2Chk2" name="jeonbukChk2" value="MF_NO" class="chk2"><label for="mfNo2Chk2">사업자 번호</label>--%>
<%--        <input type="checkbox" id="ceoNameChk2" name="jeonbukChk2" value="CEO_NAME" class="chk2"><label for="ceoNameChk2">대표자 성명(성별)</label>--%>
<%--        <input type="checkbox" id="ceoTelNumChk2" name="jeonbukChk2" value="CEO_TEL_NUM" class="chk2"><label for="ceoTelNumChk2">대표자 휴대폰</label>--%>
<%--        <input type="checkbox" id="addrChk2" name="jeonbukChk2" value="ADDR" class="chk2"><label for="addrChk2">주소</label>--%>
<%--        <input type="checkbox" id="locationChk2" name="jeonbukChk2" value="LOCATION" class="chk2"><label for="locationChk2">본사소재지</label>--%>
<%--        <input type="checkbox" id="estDateChk2" name="jeonbukChk2" value="EST_DATE" class="chk2"><label for="estDateChk2">설립일</label>--%>
<%--        <input type="checkbox" id="historyChk2" name="jeonbukChk2" value="HISTORY" class="chk2"><label for="historyChk2">업력</label>--%>
<%--        <input type="checkbox" id="telNumChk2" name="jeonbukChk2" value="TEL_NUM" class="chk2"><label for="telNumChk2">전화번호</label>--%>
<%--        <input type="checkbox" id="faxNumChk2" name="jeonbukChk2" value="FAX_NUM" class="chk2"><label for="faxNumChk2">팩스번호</label>--%>
<%--        <input type="checkbox" id="homepageChk2" name="jeonbukChk2" value="HOME_PAGE" class="chk2"><label for="homepageChk2">홈페이지</label>--%>
<%--        <input type="checkbox" id="emailChk2" name="jeonbukChk2" value="EMAIL" class="chk2"><label for="emailChk2">E-MAIL</label><br>--%>
<%--        <input type="checkbox" id="chargeNameChk2" name="jeonbukChk2" value="CHARGE_NAME" class="chk2"><label for="chargeNameChk2">담당자 성명</label>--%>
<%--        <input type="checkbox" id="chargeTelNumChk2" name="jeonbukChk2" value="CHARGE_TEL_NUM" class="chk2"><label for="chargeTelNumChk2">담당자 휴대폰</label>--%>
<%--        <input type="checkbox" id="industryChk2" name="jeonbukChk2" value="INDUSTRY" class="chk2"><label for="industryChk2">업종코드</label>--%>
<%--        <input type="checkbox" id="mainProductChk2" name="jeonbukChk2" value="MAIN_PRODUCT" class="chk2"><label for="mainProductChk2">주생산품</label>--%>
<%--        <input type="checkbox" id="amPartChk2" name="jeonbukChk2" value="AM_PART" class="chk2"><label for="amPartChk2">자동차부품 여부</label>--%>
<%--        <input type="checkbox" id="amPartTypeChk2" name="jeonbukChk2" value="AM_PART_TYPE" class="chk2"><label for="amPartTypeChk2">자동차부품</label>--%>
<%--        <input type="checkbox" id="capitalChk2" name="jeonbukChk2" value="CAPITAL" class="chk2"><label for="capitalChk2">자본금(백만원)</label>--%>
<%--        <input type="checkbox" id="salesChk2" name="jeonbukChk2" value="SALES" class="chk2"><label for="salesChk2">매출액</label>--%>
<%--        <input type="checkbox" id="salesAmtChk2" name="jeonbukChk2" value="SALES_AMT" class="chk2"><label for="salesAmtChk2">매출비율합계</label>--%>
<%--        <input type="checkbox" id="salesRatioProvChk2" name="jeonbukChk2" value="SALES_RATIO_PROV" class="chk2"><label for="salesRatioProvChk2">매출비율도내</label>--%>
<%--        <input type="checkbox" id="salesRatioOtProvChk2" name="jeonbukChk2" value="SALES_RATIO_OT_PROV" class="chk2"><label for="salesRatioOtProvChk2">매출비율도외</label>--%>
<%--        <input type="checkbox" id="exportYnChk2" name="jeonbukChk2" value="EXPORT_YN" class="chk2"><label for="exportYnChk2">수출여부</label><br>--%>
<%--        <input type="checkbox" id="empCntChk2" name="jeonbukChk2" value="EMP_CNT" class="chk2"><label for="empCntChk2">종사자수</label>--%>
<%--        <input type="checkbox" id="empForeignChk2" name="jeonbukChk2" value="EMP_FOREIGN" class="chk2"><label for="empForeignChk2">외국인고용</label>--%>
<%--        <input type="checkbox" id="foreignCntChk2" name="jeonbukChk2" value="FOREIGN_CNT" class="chk2"><label for="foreignCntChk2">외국인직원수</label>--%>
<%--        <input type="checkbox" id="laboratoryYnChk2" name="jeonbukChk2" value="LABORATORY_YN" class="chk2"><label for="laboratoryYnChk2">기업부설연구소/전담부서 운영유무</label>--%>
<%--        <input type="checkbox" id="carbonYnChk2" name="jeonbukChk2" value="CARBON_YN" class="chk2"><label for="carbonYnChk2">탄소소재활용</label>--%>
<%--        <input type="checkbox" id="rprYnChk2" name="jeonbukChk2" value="RPR_YN" class="chk2"><label for="rprYnChk2">출원/등록 지식재산권</label>--%>
<%--        <input type="checkbox" id="newProductYnChk2" name="jeonbukChk2" value="NEW_PRODUCT_YN" class="chk2"><label for="newProductYnChk2">지식재산권 활용 신규제품 개발여부</label>--%>
<%--        <input type="checkbox" id="facilityInvestYnChk2" name="jeonbukChk2" value="FACILITY_INVEST_YN" class="chk2"><label for="facilityInvestYnChk2">생산시설 투자계획</label><br>--%>
<%--        <input type="checkbox" id="highlySatFieldChk2" name="jeonbukChk2" value="HIGHLY_SAT_FIELD" class="chk2"><label for="highlySatFieldChk2">만족도 높은 분야</label>--%>
<%--        <input type="checkbox" id="needFieldChk2" name="jeonbukChk2" value="NEED_FIELD" class="chk2"><label for="needFieldChk2">필요한분야</label>--%>
<%--        <input type="checkbox" id="agreeYnChk2" name="jeonbukChk2" value="AGREE_YN" class="chk2"><label for="agreeYnChk2">개인정보동의</label>--%>
<%--        <input type="checkbox" id="agree2YnChk2" name="jeonbukChk2" value="AGREE2_YN" class="chk2"><label for="agree2YnChk2">제3자동의</label>--%>
    </div>
    <table class="popTable table table-bordered mb-0">
        <colgroup>
            <col style="width: 20%">
            <col style="width: 15%">
            <col style="width: 15%">
            <col style="width: 15%">
            <col style="width: 15%">
            <col style="width: 15%">
        </colgroup>
        <thead id="statThead">
            <tr>
                <th>구분</th>
                <c:forEach begin="0" end="4" step="1" varStatus="st">
                    <th id="${searchYear - st.index}">${searchYear - st.index}</th>
                </c:forEach>
            </tr>
        </thead>
        <tbody id="statTbody" style="text-align: center">

        </tbody>
    </table>
</div>