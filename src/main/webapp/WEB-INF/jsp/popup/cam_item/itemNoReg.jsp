<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<jsp:useBean id="today" class="java.util.Date" />
<fmt:formatDate value="${today}" var="nowHyphen" pattern="yyyy-MM-dd" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<script type="text/javascript" src="/js/intra/cam_item/system/itemMaster/popup/itemNoReg.js?v=${today}"/></script>
<style>
    .searchTable > thead > tr > th {
        background-color: #00397f96;
        color: white;
        text-align: center;
    }
    .dash-left .table > tbody > tr > td{
        padding-left: 5px;
        padding-right: 5px;
        text-align: center;
    }

    .percentInput {
        text-align: right;
    }
</style>
<body class="font-opensans" style="background-color:#fff;">
<div style="padding:0;">
    <div class="table-responsive">
        <input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">
        <input type="hidden" id="nowHyphen" name="nowHyphen" value="${nowHyphen}">
        <input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}">
        <input type="hidden" id="empName" name="empName" value="${loginVO.name}">
        <input type="hidden" id="masterSn" name="masterSn" value="${params.masterSn}">

        <div class="card-header pop-header">
            <h3 class="card-title title_NM"><span style="position: relative; top: 3px;" id="popTitle">품번등록</span>
            </h3>
            <div class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-info" onclick="inr.setReceivingReg()">저장</button>
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">닫기</button>
            </div>
        </div>
        <div style="padding: 20px 30px;">
            <table class="searchTable table table-bordered mb-0 mt10">
                <colgroup>
                    <col style="width: 11%">
                    <col style="width: 53%">
                    <col style="width: 11%">
                    <col style="width: 25%">
                </colgroup>
                <thead>
                    <tr>
                        <th>
                            <span class="red-star">*</span>품번
                        </th>
                        <td>
                            <input type="text" id="itemNo" name="itemNo" style="display: none;">
                            <input type="text" id="categoryA" name="categoryA" style="width: 120px">
                            <input type="text" id="categoryB" name="categoryB" style="width: 120px">
                            <input type="text" id="categoryC" name="categoryC" style="width: 120px">
                            <button type="button" class="k-button k-button-solid-base" onclick="inr.getItemNoDuplicate()">중복확인</button>
                            <span style="margin-left:10px;">품목코드 : <span id="itemNumber"></span></span>
                        </td>
                        <th>
                            <span class="red-star">*</span>품명
                        </th>
                        <td>
                            <input type="text" id="itemName" name="itemName">
                        </td>
                    </tr>
                    <tr>
                        <th>
                            <span class="red-star">*</span>단위(규격)
                        </th>
                        <td>
                            <input type="text" id="itemUnitCd" name="itemUnitCd" style="width: 120px">
                            <input type="text" id="standard" name="standard" style="width: 65%">
                        </td>
                        <th>
                            <span class="red-star">*</span>품목구분
                        </th>
                        <td>
                            <input type="text" id="itemType" name="itemType">
                        </td>
                    </tr>
                    <tr>
                        <th>
                            <span class="red-star">*</span>입고창고
                        </th>
                        <td>
                            <input type="text" id="whCd" name="whCd" style="width: 50%">
                        </td>
                        <th>
                            <span class="red-star">*</span>사용여부
                        </th>
                        <td>
                            <input type="text" id="active" name="active" style="width: 150px">
                        </td>
                    </tr>
                    <tr>
                        <th>
                            <span class="red-star">*</span>표준단가
                        </th>
                        <td>
                            <input type="text" id="unitPrice" class="numberInput" name="unitPrice" style="width: 150px; text-align: right;"> 원
                        </td>
                        <th>
                            <span class="red-star">*</span>원가
                        </th>
                        <td>
                            <input type="text" id="costPrice" class="numberInput" name="costPrice" style="width: 150px; text-align: right;"> 원
                        </td>
                    </tr>
                    <tr>
                        <th>
                            <span class="red-star">*</span>판매가(B2B1)
                        </th>
                        <td>
                            <input type="text" id="b2bPrice" class="numberInput" name="b2bPrice" style="width: 150px; text-align: right;"> 원
                            <input type="hidden" id="consumerPrice" class="numberInput" name="consumerPrice" style="width: 150px; text-align: right;" value="0">
                        </td>
                        <th>
                            <span class="red-star">*</span>비고1
                        </th>
                        <td>
                            <input type="text" id="b2bEtc" name="b2bPrice" style="width: 150px; text-align: left;">
                        </td>
                    </tr>
                    <tr>
                        <th>
                            <span class="red-star">*</span>판매가(B2B2)
                        </th>
                        <td>
                            <input type="text" id="b2bPrice2" class="numberInput" name="b2bPrice" style="width: 150px; text-align: right;"> 원
                        </td>
                        <th>
                            <span class="red-star">*</span>비고2
                        </th>
                        <td>
                            <input type="text" id="b2bEtc2" name="b2bPrice" style="width: 150px; text-align: left;">
                        </td>
                    </tr>
                    <tr>
                        <th>
                            <span class="red-star">*</span>판매가(B2B3)
                        </th>
                        <td>
                            <input type="text" id="b2bPrice3" class="numberInput" name="b2bPrice" style="width: 150px; text-align: right;"> 원
                        </td>
                        <th>
                            <span class="red-star">*</span>비고3
                        </th>
                        <td>
                            <input type="text" id="b2bEtc3" name="b2bPrice" style="width: 150px; text-align: left;">
                        </td>
                    </tr>
                    <tr>
                        <th>
                            <span class="red-star">*</span>판매가(B2B4)
                        </th>
                        <td>
                            <input type="text" id="b2bPrice4" class="numberInput" name="b2bPrice" style="width: 150px; text-align: right;"> 원
                        </td>
                        <th>
                            <span class="red-star">*</span>비고4
                        </th>
                        <td>
                            <input type="text" id="b2bEtc4" name="b2bPrice" style="width: 150px; text-align: left;">
                        </td>
                    </tr>
                    <tr>
                        <th>
                            <span class="red-star">*</span>판매가(B2B5)
                        </th>
                        <td>
                            <input type="text" id="b2bPrice5" class="numberInput" name="b2bPrice" style="width: 150px; text-align: right;"> 원
                        </td>
                        <th>
                            <span class="red-star">*</span>비고5
                        </th>
                        <td>
                            <input type="text" id="b2bEtc5" name="b2bPrice" style="width: 150px; text-align: left;">
                        </td>
                    </tr>
                </thead>
            </table>
        </div>
    </div>
</div>

<script type="text/javascript">
    inr.fn_defaultScript();
</script>
</body>
</html>