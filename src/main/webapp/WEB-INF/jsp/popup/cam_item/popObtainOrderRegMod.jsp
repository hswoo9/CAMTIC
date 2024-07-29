<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<jsp:useBean id="today" class="java.util.Date" />
<fmt:formatDate value="${today}" var="nowHyphen" pattern="yyyy-MM-dd" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<script type="text/javascript" src="/js/intra/cam_item/popup/popObtainOrderRegMod.js?v=${today}"/></script>
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
        <input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}">
        <input type="hidden" id="obtainOrderSn" name="obtainOrderSn" value="${params.obtainOrderSn}">

        <div class="card-header pop-header">
            <h3 class="card-title title_NM"><span style="position: relative; top: 3px;" id="popTitle">수주수정</span>
            </h3>
            <div class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-info" onclick="oorm.setObtainOrderUpd()">저장</button>
                <button type="button" class="k-button k-button-solid-base" onclick="oorm.setObtainOrderCancel()">수주취소</button>
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">닫기</button>
            </div>
        </div>
        <div>
            <table class="searchTable table table-bordered mb-0 mt-10">
                <colgroup>
                    <col style="width: 13%">
                    <col>
                    <col style="width: 13%">
                    <col>
                </colgroup>
                <thead>
                <tr>
                    <th>업체</th>
                    <td colspan="3">
                        <input type="hidden" id="crmSn" class="crmSn">
                        <input type="text" id="crmNm" class="k-input k-textbox crmNm" disabled style="width: 90%" onclick="oorm.fn_popCamCrmList()" />
<%--                        <button type="button" id="crmSelBtn" class="crmSelBtn k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onClick="oorm.fn_popCamCrmList()">선택</button>--%>
                    </td>
                </tr>
                <tr>
                    <th>품번</th>
                    <td>
                        <input type="hidden" id="masterSn" class="masterSn">
                        <input type="text" id="itemNo" class="k-input k-textbox itemNo" disabled style="width: 78%" onclick="oorm.fn_popItemNoList();"/>
<%--                        <button type="button" id="itemSelBtn" class="itemSelBtn k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onClick="oorm.fn_popItemNoList();">선택</button>--%>
                    </td>
                    <th>품명</th>
                    <td>
                        <input type="text" id="itemName" class="itemName k-input k-textbox" disabled onclick="oorm.fn_popItemNoList();" name="itemName">
                    </td>
                </tr>
                <tr>
                    <th>규격</th>
                    <td>
                        <input type="text" id="standard" class="standard k-input k-textbox" onclick="oorm.fn_popItemNoList();" disabled>
                    </td>
                    <th>납기일자</th>
                    <td>
                        <input type="text" id="dueDt" name="dueDt" class="dueDt">
                    </td>
                </tr>
                <tr>
                    <th>수주량</th>
                    <td>
                        <input type="text" id="orderVolume" name="orderVolume" class="numberInput orderVolume" style="text-align: right">
                    </td>
                    <th>단가</th>
                    <td>
                        <input type="text" id="unitPrice" class="numberInput unitPrice" style="text-align: right;" value="0" disabled>
                    </td>
                </tr>
                <tr>
                    <th>금액</th>
                    <td colspan="3">
                        <input type="text" id="amt" name="amt" class="amt numberInput" style="text-align: right" disabled>
                    </td>
                <tr>
                    <th>비고</th>
                    <td colspan="3">
                        <input type="text" id="rmk" name="rmk" class="rmk">
                    </td>
                </tr>
                </thead>
            </table>
        </div>
    </div>
</div>

<script type="text/javascript">
    oorm.fn_defaultScript();
</script>
</body>
</html>