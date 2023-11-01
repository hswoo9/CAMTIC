<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<body>
<div id="approveDataPop">
    <table style="font-family:굴림;margin: 0 auto; max-width: none; border-collapse: separate; border-spacing: 0; empty-cells: show; border-width: 0; outline: 0; text-align: left; font-size:12px; line-height: 20px; width: 100%; ">
        <tr>
            <td style="border-width: 0 0 0 0; font-weight: normal; box-sizing: border-box;">
                <table border="3" style="border-collapse: collapse; margin: 0px;">
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
                    <tr>
                        <td style="height:30px;background-color:#BFBFFF; text-align:center; width: 50px;"><p style="font-size:12px;"><b>구분</b></p></td>
                        <td style="height:30px;background-color:#BFBFFF; text-align:center; width: 120px;"><p style="font-size:12px;"><b>품 명</b></p></td>
                        <td style="height:30px;background-color:#BFBFFF; text-align:center; width: 120px;"><p style="font-size:12px;"><b>규격</b></p></td>
                        <td style="height:30px;background-color:#BFBFFF; text-align:center; width: 80px;"><p style="font-size:12px;"><b>단 가</b></p></td>
                        <td style="height:30px;background-color:#BFBFFF; text-align:center; width: 45px;"><p style="font-size:12px;"><b>수량</b></p></td>
                        <td style="height:30px;background-color:#BFBFFF; text-align:center; width: 45px;"><p style="font-size:12px;"><b>단위</b></p></td>
                        <td style="height:30px;background-color:#BFBFFF; text-align:center; width: 80px;"><p style="font-size:12px;"><b>금 액</b></p></td>
                        <td style="height:30px;background-color:#BFBFFF; text-align:center; width: 80px;"><p style="font-size:12px;"><b>업체명</b></p></td>
                        <td style="height:30px;background-color:#BFBFFF; text-align:center; width: 58px;"><p style="font-size:12px;"><b>비고</b></p></td>
                    </tr>
                    <c:forEach var="list" items="${purcItemList}" varStatus="status">
                        <tr>
                            <td style="height:30px;background-color:#FFFFFF; text-align:center; width: 50px;"><p style="font-size:12px;"><b>구매</b></p></td>
                            <td style="height:30px;background-color:#FFFFFF; text-align:left; width: 120px;"><p style="font-size:12px;"><b><c:out value="${list.PURC_ITEM_NAME}"/></b></p></td>
                            <td style="height:30px;background-color:#FFFFFF; text-align:center; width: 120px;"><p style="font-size:12px;"><b><c:out value="${list.PURC_ITEM_STD}"/></b></p></td>
                            <td style="height:30px;background-color:#FFFFFF; text-align:right; width: 80px;"><p style="font-size:12px;"><b><c:out value="${list.PURC_ITEM_UNIT_PRICE_COMMA}"/></b></p></td>
                            <td style="height:30px;background-color:#FFFFFF; text-align:right; width: 45px;"><p style="font-size:12px;"><b><c:out value="${list.PURC_ITEM_QTY}"/></b></p></td>
                            <td style="height:30px;background-color:#FFFFFF; text-align:center; width: 45px;"><p style="font-size:12px;"><b><c:out value="${list.PURC_ITEM_UNIT}"/></b></p></td>
                            <td style="height:30px;background-color:#FFFFFF; text-align:right; width: 80px;"><p style="font-size:12px;"><b><c:out value="${list.PURC_ITEM_AMT_COMMA}"/></b></p></td>
                            <td style="height:30px;background-color:#FFFFFF; text-align:left; width: 80px;"><p style="font-size:12px;"><b><c:out value="${list.CRM_NM}"/></b></p></td>
                            <td style="height:30px;background-color:#FFFFFF; text-align:center; width: 58px;"><p style="font-size:12px;"><b><c:out value="${list.RMK}"/></b></p></td>
                        </tr>
                    </c:forEach>
                    <tr>
                        <td colspan="7" style="height:30px;background-color:#BFBFFF; text-align:center;"><p style="font-size:12px;"><b>합계</b></p></td>
                        <td colspan="2" style="height:30px;background-color:#FFFFFF; text-align:right; width: 120px;"><p style="font-size:12px;"><b>&#8361; <c:out value="${TOTAL_SUM_COMMA}"/></b></p></td>
                    </tr>
                    <tr>
                        <td colspan="9" style="height:50px;background-color:#FFFFFF; text-align:center;"></td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</div>
<script>
    window.resizeTo(965, 900);
    approvalDataInit();
    function approvalDataInit(){
        var approvalParams = {};
        approvalParams.mod = "W";
        approvalParams.formId = "145";
        approvalParams.compSeq = "1000";
        approvalParams.empSeq = "${loginVO.uniqId}";
        approvalParams.docTitle = "[구매요청서]${loginVO.orgnztNm}-${loginVO.name}";
        approvalParams.content = $("#approveDataPop")[0].innerHTML;
        approvalParams.type = "drafting";
        approvalParams.menuCd = "purc";
        approvalParams.docType = "A";

        approvalParams.linkageProcessId = "15";
        approvalParams.linkageType = "2";
        approvalParams.linkageProcessCode = "camticPurc";
        approvalParams.approKey = "camticPurc_${params.purcSn}";

        linkageProcessOn(approvalParams);
    }
</script>
</body>
</html>
