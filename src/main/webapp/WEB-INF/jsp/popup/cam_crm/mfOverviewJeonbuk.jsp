<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<jsp:useBean id="today" class="java.util.Date" />

<script type="text/javascript" src="<c:url value='/js/intra/cam_crm/mfOverviewJeonbuk.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js?${today}'/>"></script>

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
    <table class="popTable table table-bordered mb-0">
        <colgroup>
            <col style="width: 15%">
            <col style="width: 35%">
            <col style="width: 15%">
            <col style="width: 35%">
        </colgroup>
        <thead>
        <tr>
            <th scope="row" class="text-center th-color">
                지역
            </th>
            <td id="area"></td>
            <th scope="row" class="text-center th-color">
                정상유무
            </th>
            <td id="active"></td>
        </tr>
        <tr>
            <th scope="row" class="text-center th-color">
                사업체명
            </th>
            <td id="mfName"></td>
            <th scope="row" class="text-center th-color">
                사업자번호
            </th>
            <td id="mfNo2"></td>
        </tr>
        <tr>
            <th scope="row" class="text-center th-color">
                대표자 성명(성별)
            </th>
            <td id="ceoName"></td>
            <th scope="row" class="text-center th-color">
                대표자 휴대폰
            </th>
            <td id="ceoTelNum"></td>
        </tr>
        <tr>
            <th scope="row" class="text-center th-color">
                주소
            </th>
            <td id="addr"></td>
            <th scope="row" class="text-center th-color">
                본사소재지
            </th>
            <td id="location"></td>
        </tr>
        <tr>
            <th scope="row" class="text-center th-color">
                설립일
            </th>
            <td id="estDate"></td>
            <th scope="row" class="text-center th-color">
                업력
            </th>
            <td id="history"></td>
        </tr>
        <tr>
            <th scope="row" class="text-center th-color">
                전화번호
            </th>
            <td id="telNum"></td>
            <th scope="row" class="text-center th-color">
                팩스번호
            </th>
            <td id="faxNum"></td>
        </tr>
        <tr>
            <th scope="row" class="text-center th-color">
                홈페이지
            </th>
            <td id="homepage"></td>
            <th scope="row" class="text-center th-color">
                E-MAIL
            </th>
            <td id="email"></td>
        </tr>
        <tr>
            <th scope="row" class="text-center th-color">
                담당자 성명
            </th>
            <td id="chargeName"></td>
            <th scope="row" class="text-center th-color">
                담당자 휴대폰
            </th>
            <td id="chargeTelNum"></td>
        </tr>
        <tr>
            <th scope="row" class="text-center th-color">
                업종코드
            </th>
            <td id="industry"></td>
            <th scope="row" class="text-center th-color">
                주생산품
            </th>
            <td id="mainProduct"></td>
        </tr>
        <tr>
            <th scope="row" class="text-center th-color">
                자동차부품
            </th>
            <td id="amPart"></td>
            <th scope="row" class="text-center th-color">
                자동차부품
            </th>
            <td id="amPartType"></td>
        </tr>
        <tr>
            <th scope="row" class="text-center th-color">
                자본금(백만원)
            </th>
            <td id="capital" colspan="3"></td>
        </tr>
        <tr>
            <th scope="row" class="text-center th-color">
                매출액
            </th>
            <td id="sales"></td>
            <th scope="row" class="text-center th-color">
                매출비율합계
            </th>
            <td id="salesAmt"></td>
        </tr>
        <tr>
            <th scope="row" class="text-center th-color">
                매출비율도내
            </th>
            <td id="salesRatioProv"></td>
            <th scope="row" class="text-center th-color">
                매출비율도외
            </th>
            <td id="salesRatioOtProv"></td>
        </tr>
        <tr>
            <th scope="row" class="text-center th-color">
                수출여부
            </th>
            <td id="exportYn"></td>
            <th scope="row" class="text-center th-color">
                종사자수
            </th>
            <td id="empCnt"></td>
        </tr>
        <tr>
            <th scope="row" class="text-center th-color">
                외국인고용
            </th>
            <td id="empForeign"></td>
            <th scope="row" class="text-center th-color">
                외국인직원수
            </th>
            <td id="foreignCnt"></td>
        </tr>
        <tr>
            <th scope="row" class="text-center th-color">
                기업부설연구소/전담부서<br>운영유무
            </th>
            <td id="laboratoryYn"></td>
            <th scope="row" class="text-center th-color">
                탄소소재활용
            </th>
            <td id="carbonYn"></td>
        </tr>
        <tr>
            <th scope="row" class="text-center th-color">
                출원/등록 지식재산권
            </th>
            <td id="rprYn"></td>
            <th scope="row" class="text-center th-color">
                지식재산권 활용<br>신규제품 개발여부
            </th>
            <td id="newProductYn"></td>
        </tr>
        <tr>
            <th scope="row" class="text-center th-color">
                생산시설 투자계획
            </th>
            <td id="facilityInvestYn" colspan="3"></td>
        </tr>
        <tr>
            <th scope="row" class="text-center th-color">
                만족도 높은 분야
            </th>
            <td id="highlySatField"></td>
            <th scope="row" class="text-center th-color">
                필요한분야
            </th>
            <td id="needField"></td>
        </tr>
        <tr>
            <th scope="row" class="text-center th-color">
                개인정보동의
            </th>
            <td id="agreeYn"></td>
            <th scope="row" class="text-center th-color">
                제3자동의
            </th>
            <td id="agree2Yn"></td>
        </tr>
        </thead>
    </table>
</div>