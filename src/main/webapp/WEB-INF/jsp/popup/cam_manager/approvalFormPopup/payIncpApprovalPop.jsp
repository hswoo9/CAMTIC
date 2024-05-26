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
                    <tr>
                        <td style="height:30px;background-color:#FFFFFF; text-align:center; width: 106px;"><p style="font-size:12px;"><b>상   호</b></p></td>
                        <td style="height:30px;background-color:#FFFFFF; text-align:center; width: 97px;"><p style="font-size:12px;"><b>사업자번호</b></p></td>
                        <td style="height:30px;background-color:#FFFFFF; text-align:center; width: 60px;"><p style="font-size:12px;"><b>대표자</b></p></td>
                        <td style="height:30px;background-color:#FFFFFF; text-align:center; width: 125px;"><p style="font-size:12px;"><b>금   액</b></p></td>
                        <td style="height:30px;background-color:#FFFFFF; text-align:center; width: 181px;"><p style="font-size:12px;"><b>품   명</b></p></td>
                        <td style="height:30px;background-color:#FFFFFF; text-align:center; width: 71px;"><p style="font-size:12px;"><b>비 고</b></p></td>
                    </tr
                    <c:set var="sum" value="0"/>
                    <c:forEach var="list" items="${payIncpItemList}" varStatus="status">
                        <tr>
                            <td style="height:30px; background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;"><c:out value="${list.CRM_NM}"/></p></td>
                            <td style="height:30px; background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">${list.REG_NO}</p></td>
                            <td style="height:30px; background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">${list.CEO_NM}</p></td>
                            <td style="height:30px; background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;"><c:out value="${list.TOT_COST_COMMA}"/></p></td>
                            <td style="height:30px; background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;"><c:out value="${list.CRM_NM}"/></p></td>
                            <td style="height:30px; background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;"><c:out value="${list.ETC}"/></p></td>
                        </tr>
                        <c:set var="sum" value="${sum + list.TOT_COST}"/>
                    </c:forEach>
                    <tr>
                        <td colspan="3" style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;"><b>합계</b></p></td>
                        <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;"><b><fmt:formatNumber value="${sum}" pattern="#,###"/></b></p></td>
                        <td></td>
                        <td></td>
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
        approvalParams.formId = "153";
        approvalParams.compSeq = "1000";
        approvalParams.empSeq = "${loginVO.uniqId}";
        approvalParams.docTitle = "[수입결의서]${loginVO.orgnztNm}-${loginVO.name}";
        approvalParams.content = $("#approveDataPop")[0].innerHTML;
        approvalParams.type = "drafting";
        approvalParams.menuCd = "payIncp";
        approvalParams.docType = "A";

        approvalParams.linkageProcessId = "32";
        approvalParams.linkageType = "2";
        approvalParams.linkageProcessCode = "camticIncp";
        approvalParams.approKey = "camticIncp_${params.payIncpSn}";

        console.log('${params}');

        if(${params.type eq 'reDrafting'}){
            approvalParams.mod = "RW";
            approvalParams.type = "${params.type}";
            approvalParams.docId = "${params.docId}";

        }

        linkageProcessOn(approvalParams);
    }

</script>
</body>
</html>
