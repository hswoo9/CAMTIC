<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<jsp:useBean id="today" class="java.util.Date" />

<script type="text/javascript" src="<c:url value='/js/intra/cam_crm/mfOverviewJeonbuk.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js?${today}'/>"></script>
<style>
    #jeonbukTb thead th, #jeonbukTb thead td{
        display: none;
    }
    .chk {
        margin-right: 5px;
    }
</style>
<%
    String crmMfSn = request.getParameter("crmMfSn");
    String mfNo = request.getParameter("mfNo");
    if(crmMfSn == null){
        return ;
    }

    if(mfNo == null){
        return ;
    }

%>
<input type="hidden" id="mfNo" value="<%=mfNo%>" />
<div style="padding: 10px">
    <div style="text-align: right">
        <input type="text" id="searchYear" style="width: 80px">
        <button type="button" id="saveBtn" style="margin-bottom: 5px;" class="k-button k-button-solid-info" onclick="movJb.mfOverViewDataSet();">조회</button>
    </div>
    <div>
        <input type="text" id="detailSearch">
<%--        <input type="checkbox" id="areaChk" name="jeonbukChk" value="area" class="chk"><label for="areaChk">지역</label>--%>
<%--        <input type="checkbox" id="activeChk" name="jeonbukChk" value="active" class="chk"><label for="activeChk">정상유무</label>--%>
<%--        <input type="checkbox" id="mfNameChk" name="jeonbukChk" value="mfName" class="chk"><label for="mfNameChk">사업체명</label>--%>
<%--        <input type="checkbox" id="mfNo2Chk" name="jeonbukChk" value="mfNo2" class="chk"><label for="mfNo2Chk">사업자 번호</label>--%>
<%--        <input type="checkbox" id="ceoNameChk" name="jeonbukChk" value="ceoName" class="chk"><label for="ceoNameChk">대표자 성명(성별)</label>--%>
<%--        <input type="checkbox" id="ceoTelNumChk" name="jeonbukChk" value="ceoTelNum" class="chk"><label for="ceoTelNumChk">대표자 휴대폰</label>--%>
<%--        <input type="checkbox" id="addrChk" name="jeonbukChk" value="addr" class="chk"><label for="addrChk">주소</label>--%>
<%--        <input type="checkbox" id="locationChk" name="jeonbukChk" value="location" class="chk"><label for="locationChk">본사소재지</label>--%>
<%--        <input type="checkbox" id="estDateChk" name="jeonbukChk" value="estDate" class="chk"><label for="estDateChk">설립일</label>--%>
<%--        <input type="checkbox" id="historyChk" name="jeonbukChk" value="history" class="chk"><label for="historyChk">업력</label>--%>
<%--        <input type="checkbox" id="telNumChk" name="jeonbukChk" value="telNum" class="chk"><label for="telNumChk">전화번호</label>--%>
<%--        <input type="checkbox" id="faxNumChk" name="jeonbukChk" value="faxNum" class="chk"><label for="faxNumChk">팩스번호</label>--%>
<%--        <input type="checkbox" id="homepageChk" name="jeonbukChk" value="homepage" class="chk"><label for="homepageChk">홈페이지</label>--%>
<%--        <input type="checkbox" id="emailChk" name="jeonbukChk" value="email" class="chk"><label for="emailChk">E-MAIL</label><br>--%>
<%--        <input type="checkbox" id="chargeNameChk" name="jeonbukChk" value="chargeName" class="chk"><label for="chargeNameChk">담당자 성명</label>--%>
<%--        <input type="checkbox" id="chargeTelNumChk" name="jeonbukChk" value="chargeTelNum" class="chk"><label for="chargeTelNumChk">담당자 휴대폰</label>--%>
<%--        <input type="checkbox" id="industryChk" name="jeonbukChk" value="industry" class="chk"><label for="industryChk">업종코드</label>--%>
<%--        <input type="checkbox" id="mainProductChk" name="jeonbukChk" value="mainProduct" class="chk"><label for="mainProductChk">주생산품</label>--%>
<%--        <input type="checkbox" id="amPartChk" name="jeonbukChk" value="amPart" class="chk"><label for="amPartChk">자동차부품 여부</label>--%>
<%--        <input type="checkbox" id="amPartTypeChk" name="jeonbukChk" value="amPartType" class="chk"><label for="amPartTypeChk">자동차부품</label>--%>
<%--        <input type="checkbox" id="capitalChk" name="jeonbukChk" value="capital" class="chk"><label for="capitalChk">자본금(백만원)</label>--%>
<%--        <input type="checkbox" id="salesChk" name="jeonbukChk" value="sales" class="chk"><label for="salesChk">매출액</label>--%>
<%--        <input type="checkbox" id="salesAmtChk" name="jeonbukChk" value="salesAmt" class="chk"><label for="salesAmtChk">매출비율합계</label>--%>
<%--        <input type="checkbox" id="salesRatioProvChk" name="jeonbukChk" value="salesRatioProv" class="chk"><label for="salesRatioProvChk">매출비율도내</label>--%>
<%--        <input type="checkbox" id="salesRatioOtProvChk" name="jeonbukChk" value="salesRatioOtProv" class="chk"><label for="salesRatioOtProvChk">매출비율도외</label>--%>
<%--        <input type="checkbox" id="exportYnChk" name="jeonbukChk" value="exportYn" class="chk"><label for="exportYnChk">수출여부</label><br>--%>
<%--        <input type="checkbox" id="empCntChk" name="jeonbukChk" value="empCnt" class="chk"><label for="empCntChk">종사자수</label>--%>
<%--        <input type="checkbox" id="empForeignChk" name="jeonbukChk" value="empForeign" class="chk"><label for="empForeignChk">외국인고용</label>--%>
<%--        <input type="checkbox" id="foreignCntChk" name="jeonbukChk" value="foreignCnt" class="chk"><label for="foreignCntChk">외국인직원수</label>--%>
<%--        <input type="checkbox" id="laboratoryYnChk" name="jeonbukChk" value="laboratoryYn" class="chk"><label for="laboratoryYnChk">기업부설연구소/전담부서 운영유무</label>--%>
<%--        <input type="checkbox" id="carbonYnChk" name="jeonbukChk" value="carbonYn" class="chk"><label for="carbonYnChk">탄소소재활용</label>--%>
<%--        <input type="checkbox" id="rprYnChk" name="jeonbukChk" value="rprYn" class="chk"><label for="rprYnChk">출원/등록 지식재산권</label>--%>
<%--        <input type="checkbox" id="newProductYnChk" name="jeonbukChk" value="newProductYn" class="chk"><label for="newProductYnChk">지식재산권 활용 신규제품 개발여부</label>--%>
<%--        <input type="checkbox" id="facilityInvestYnChk" name="jeonbukChk" value="facilityInvestYn" class="chk"><label for="facilityInvestYnChk">생산시설 투자계획</label><br>--%>
<%--        <input type="checkbox" id="highlySatFieldChk" name="jeonbukChk" value="highlySatField" class="chk"><label for="highlySatFieldChk">만족도 높은 분야</label>--%>
<%--        <input type="checkbox" id="needFieldChk" name="jeonbukChk" value="needField" class="chk"><label for="needFieldChk">필요한분야</label>--%>
<%--        <input type="checkbox" id="agreeYnChk" name="jeonbukChk" value="agreeYn" class="chk"><label for="agreeYnChk">개인정보동의</label>--%>
<%--        <input type="checkbox" id="agree2YnChk" name="jeonbukChk" value="agree2Yn" class="chk"><label for="agree2YnChk">제3자동의</label>--%>

    </div>
    <table class="popTable table table-bordered mb-0" id="jeonbukTb">
        <colgroup>
            <col style="width: 15%">
            <col>
        </colgroup>
        <thead>
        <tr>
            <th scope="row" class="area text-center th-color">
                지역
            </th>
            <td id="area" class="area textTd"></td>
        </tr>
        <tr>
            <th scope="row" class="active text-center th-color">
                정상유무
            </th>
            <td id="active" class="active textTd"></td>
        </tr>
        <tr>
            <th scope="row" class="mfName text-center th-color">
                사업체명
            </th>
            <td id="mfName" class="mfName textTd"></td>
        </tr>
        <tr>
            <th scope="row" class="mfNo2 text-center th-color">
                사업자번호
            </th>
            <td id="mfNo2" class="mfNo2 textTd"></td>
        </tr>
        <tr>
            <th scope="row" class="ceoName text-center th-color">
                대표자 성명(성별)
            </th>
            <td id="ceoName" class="ceoName textTd"></td>
        </tr>
        <tr>
            <th scope="row" class="ceoTelNum text-center th-color">
                대표자 휴대폰
            </th>
            <td id="ceoTelNum" class="ceoTelNum textTd"></td>
        </tr>
        <tr>
            <th scope="row" class="addr text-center th-color">
                주소
            </th>
            <td id="addr" class="addr textTd"></td>
        </tr>
        <tr>
            <th scope="row" class="location text-center th-color">
                본사소재지
            </th>
            <td id="location" class="location textTd"></td>
        </tr>
        <tr>
            <th scope="row" class="estDate text-center th-color">
                설립일
            </th>
            <td id="estDate" class="estDate textTd"></td>
        </tr>
        <tr>
            <th scope="row" class="history text-center th-color">
                업력
            </th>
            <td id="history" class="history textTd"></td>
        </tr>
        <tr>
            <th scope="row" class="telNum text-center th-color">
                전화번호
            </th>
            <td id="telNum" class="telNum textTd"></td>
        </tr>
        <tr>
            <th scope="row" class="faxNum text-center th-color">
                팩스번호
            </th>
            <td id="faxNum" class="faxNum textTd"></td>
        </tr>
        <tr>
            <th scope="row" class="homepage text-center th-color">
                홈페이지
            </th>
            <td id="homepage" class="homepage textTd"></td>
        </tr>
        <tr>
            <th scope="row" class="email text-center th-color">
                E-MAIL
            </th>
            <td id="email" class="email textTd"></td>
        </tr>
        <tr>
            <th scope="row" class="chargeName text-center th-color">
                담당자 성명
            </th>
            <td id="chargeName" class="chargeName textTd"></td>
        </tr>
        <tr>
            <th scope="row" class="chargeTelNum text-center th-color">
                담당자 휴대폰
            </th>
            <td id="chargeTelNum" class="chargeTelNum textTd"></td>
        </tr>
        <tr>
            <th scope="row" class="industry text-center th-color">
                업종코드
            </th>
            <td id="industry" class="industry textTd"></td>
        </tr>
        <tr>
            <th scope="row" class="mainProduct text-center th-color">
                주생산품
            </th>
            <td id="mainProduct" class="mainProduct textTd"></td>
        </tr>
        <tr>
            <th scope="row" class="amPart text-center th-color">
                자동차부품 여부
            </th>
            <td id="amPart" class="amPart textTd"></td>
        </tr>
        <tr>
            <th scope="row" class="amPartType text-center th-color">
                자동차부품
            </th>
            <td id="amPartType" class="amPartType textTd"></td>
        </tr>
        <tr>
            <th scope="row" class="capital text-center th-color">
                자본금(백만원)
            </th>
            <td id="capital" class="capital textTd"></td>
        </tr>
        <tr>
            <th scope="row" class="sales text-center th-color">
                매출액
            </th>
            <td id="sales" class="sales textTd"></td>
        </tr>
        <tr>
            <th scope="row" class="salesAmt text-center th-color">
                매출비율합계
            </th>
            <td id="salesAmt" class="salesAmt textTd"></td>
        </tr>
        <tr>
            <th scope="row" class="salesRatioProv text-center th-color">
                매출비율도내
            </th>
            <td id="salesRatioProv" class="salesRatioProv textTd"></td>
        </tr>
        <tr>
            <th scope="row" class="salesRatioOtProv text-center th-color">
                매출비율도외
            </th>
            <td id="salesRatioOtProv" class="salesRatioOtProv textTd"></td>
        </tr>
        <tr>
            <th scope="row" class="exportYn text-center th-color">
                수출여부
            </th>
            <td id="exportYn" class="exportYn textTd"></td>
        </tr>
        <tr>
            <th scope="row" class="empCnt text-center th-color">
                종사자수
            </th>
            <td id="empCnt" class="empCnt textTd"></td>
        </tr>
        <tr>
            <th scope="row" class="empForeign text-center th-color">
                외국인고용
            </th>
            <td id="empForeign" class="empForeign textTd"></td>
        </tr>
        <tr>
            <th scope="row" class="foreignCnt text-center th-color">
                외국인직원수
            </th>
            <td id="foreignCnt" class="foreignCnt textTd"></td>
        </tr>
        <tr>
            <th scope="row" class="laboratoryYn text-center th-color">
                기업부설연구소/전담부서<br>운영유무
            </th>
            <td id="laboratoryYn" class="laboratoryYn textTd"></td>
        </tr>
        <tr>
            <th scope="row" class="carbonYn text-center th-color">
                탄소소재활용
            </th>
            <td id="carbonYn" class="carbonYn textTd"></td>
        </tr>
        <tr>
            <th scope="row" class="rprYn text-center th-color">
                출원/등록 지식재산권
            </th>
            <td id="rprYn" class="rprYn textTd"></td>
        </tr>
        <tr>
            <th scope="row" class="newProductYn text-center th-color">
                지식재산권 활용<br>신규제품 개발여부
            </th>
            <td id="newProductYn" class="newProductYn textTd"></td>
        </tr>
        <tr>
            <th scope="row" class="facilityInvestYn text-center th-color">
                생산시설 투자계획
            </th>
            <td id="facilityInvestYn" class="facilityInvestYn textTd"></td>
        </tr>
        <tr>
            <th scope="row" class="highlySatField text-center th-color">
                만족도 높은 분야
            </th>
            <td id="highlySatField" class="highlySatField textTd"></td>
        </tr>
        <tr>
            <th scope="row" class="needField text-center th-color">
                필요한분야
            </th>
            <td id="needField" class="needField textTd"></td>
        </tr>
        <tr>
            <th scope="row" class="agreeYn text-center th-color">
                개인정보동의
            </th>
            <td id="agreeYn" class="agreeYn textTd"></td>
        </tr>
        <tr>
            <th scope="row" class="agree2Yn text-center th-color">
                제3자동의
            </th>
            <td id="agree2Yn" class="agree2Yn textTd"></td>
        </tr>
        </thead>
    </table>
</div>