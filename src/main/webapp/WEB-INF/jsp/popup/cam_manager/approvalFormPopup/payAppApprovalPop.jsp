<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<body>
<div id="approveDataPop">
    <table style="font-family:휴먼명조;margin: 0 auto; max-width: none; border-collapse: separate; border-spacing: 0; empty-cells: show; border-width: 0; outline: 0; text-align: left; font-size:12px; line-height: 20px; width: 100%; ">
        <tr>
            <td style="border-width: 0 0 0 0; font-weight: normal; box-sizing: border-box;">
                <table border="5.5" style="border-collapse: collapse; margin: 0px;">
                    <colgroup>
                        <col width="10%">
                        <col width="10%">
                        <col width="35%">
                        <col width="35%">
                        <col width="10%">
                        <col width="10%">
                    </colgroup>
                    <tr>
                        <td style="height:30px;background-color:#FFFFFF; text-align:center; width: 100px;"><p style="font-size:12px;"><b>상호</b></p></td>
                        <td style="height:30px;background-color:#FFFFFF; text-align:center; width: 80px;"><p style="font-size:12px;"><b>요청액</b></p></td>
                        <td style="height:30px;background-color:#FFFFFF; text-align:center; width: 132px;"><p style="font-size:12px;"><b>은행명</b></p></td>
                        <td style="height:30px;background-color:#FFFFFF; text-align:center; width: 152px;"><p style="font-size:12px;"><b>지급계좌</b></p></td>
                        <td style="height:30px;background-color:#FFFFFF; text-align:center; width: 90px;"><p style="font-size:12px;"><b>예금주</b></p></td>
                        <td style="height:30px;background-color:#FFFFFF; text-align:center; width: 82px;"><p style="font-size:12px;"><b>비고</b></p></td>
                    </tr
                    <c:set var="sum" value="0"/>
                    <c:forEach var="list" items="${payAppItemList}" varStatus="status">
                        <tr>
                            <td style="height:30px; background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;"><c:out value="${list.CRM_NM}"/></p></td>
                            <td style="height:30px; background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;"><c:out value="${list.TOT_COST_COMMA}"/></p></td>
                            <td style="height:30px; background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;"><c:out value="${list.CRM_BNK_NM}"/></p></td>
                            <td style="height:30px; background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;"><c:out value="${list.CRM_ACC_NO}"/></p></td>
                            <td style="height:30px; background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;"><c:out value="${list.CRM_ACC_HOLDER}"/></p></td>
                            <td style="height:30px; background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;"><c:out value="${list.ETC}"/></p></td>
                        </tr>
                        <c:set var="sum" value="${sum + list.TOT_COST}"/>
                    </c:forEach>
                    <tr>
                        <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;"><b>합계</b></p></td>
                        <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;"><b><fmt:formatNumber value="${sum}" pattern="#,###"/></b></p></td>
                        <td colspan="4"></td>
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
        approvalParams.formId = "97";
        approvalParams.compSeq = "1000";
        approvalParams.empSeq = "${loginVO.uniqId}";
        approvalParams.docTitle = "[지급신청서]${loginVO.orgnztNm}-${loginVO.name}";
        approvalParams.content = $("#approveDataPop")[0].innerHTML;
        approvalParams.type = "drafting";
        approvalParams.menuCd = "payApp";
        approvalParams.docType = "A";

        approvalParams.linkageProcessId = "15";
        approvalParams.linkageType = "2";
        approvalParams.linkageProcessCode = "camticPayApp";
        approvalParams.approKey = "camticPayApp_${params.payAppSn}";

        linkageProcessOn(approvalParams);
    }
</script>
</body>
</html>
