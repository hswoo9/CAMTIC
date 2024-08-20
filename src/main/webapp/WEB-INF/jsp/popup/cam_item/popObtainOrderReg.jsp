<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<jsp:useBean id="today" class="java.util.Date" />
<fmt:formatDate value="${today}" var="nowHyphen" pattern="yyyy-MM-dd" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<script type="text/javascript" src="/js/intra/cam_item/popup/popObtainOrderReg.js?v=${today}"/></script>
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

    .searchTable > tbody > tr > th{vertical-align: middle;}
</style>
<body class="font-opensans" style="background-color:#fff;">
<div style="padding:0;">
    <div class="table-responsive">
        <input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">
        <input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}">

        <div class="card-header pop-header">
            <h3 class="card-title title_NM">
                <span style="position: relative; top: 3px;" id="popTitle">수주등록</span>
            </h3>
            <div class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-info" onclick="oor.setReceivingReg()">저장</button>
                <button type="button" class="k-button k-button-solid-base" onclick="oor.resetRow()">초기화</button>
                <button type="button" class="k-button k-button-solid-base" onclick="oor.addRow('new')">품목추가</button>
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">닫기</button>
            </div>
        </div>
        <div>
            <div>
                <input type="hidden" id="orderDt" name="orderDt" value="${nowHyphen}">
                <input type="file" id="file" name="file" onchange="oor.fileChange(this)" style="display: none">
            </div>

            <div style="margin: 10px 0 0 10px">
                <table class="searchTable table table-bordered mb-0" style="width: 43%;">
                    <colgroup>
                        <col width="10%">
                        <col width="30%">
                        <col width="10%">
                        <col width="18%">
                        <col width="10%">
                    </colgroup>
                    <tr>
                        <th>업체선택</th>
                        <td>
                            <input type="hidden" id="allModCrmSn">
                            <input type="text" id="allModCrmNm" class="k-input k-textbox crmNm" readonly onclick="oor.fn_popCamCrmList('allModCrmSn', 'allModCrmNm');"/>
                        </td>
                        <th>납기일자</th>
                        <td>
                            <input type="text" id="dueDate">
                        </td>
                        <td>
                            <button type="button" id="allModBtn"  class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info allMod" onclick="oor.modCrmSn()" style="font-size: 12px;">
                                <span class="k-button-text">변경</span>
                            </button>
                        </td>
                    </tr>
                </table>
                <%--<button type="button" id="allModViewBtn" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="oor.allModCrmSn()" style="font-size: 12px">
                    <span class="k-button-text">일괄변경</span>
                </button>--%>
            </div>
            <table class="searchTable table table-bordered mb-0 mt-10">
                <colgroup>
                    <col style="width: 14%;">
                    <col style="width: 10%;">
                    <col style="width: 8%;">
                    <col style="width: 7%;">
                    <col style="width: 5%;">
                    <col style="width: 17%;">
                    <col style="width: 7%;">
                    <col style="width: 7%;">
                    <col style="width: 3%;">
                </colgroup>
                <thead>
                <tr>
                    <th>품번</th>
                    <th>품명</th>
                    <th>규격</th>
                    <th>납기일자</th>
                    <th>수주량</th>
                    <th>단가</th>
                    <th>수주금액</th>
                    <th>비고</th>
                    <th></th>
                </tr>
                </thead>
                <tbody id="listTb">

                </tbody>
                <tfoot>
                <tr>
                    <td colspan="6" style="text-align: right;">
                        <strong>합계:</strong>
                    </td>
                    <td id="totalAmt" style="text-align: right;"></td>
                    <td colspan="2"></td>
                </tr>
                </tfoot>
            </table>

            <input type="hidden" id="crmSn" onchange="oor.crmInfoChange()">
            <input type="hidden" id="crmNm">
            <input type="hidden" id="unitPrice" onchange="oor.unitPriceChange()">
            <input type="hidden" id="masterSn" onchange="oor.masterSnChange()">
            <input type="hidden" id="itemNo">
            <input type="hidden" id="itemName">
            <input type="hidden" id="standard">
        </div>
    </div>
</div>

<script type="text/javascript">
    oor.fn_defaultScript();
</script>
</body>
</html>