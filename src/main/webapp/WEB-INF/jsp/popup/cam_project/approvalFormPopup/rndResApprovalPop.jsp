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
                        <col width="10%">
                        <col width="10%">
                        <col width="35%">
                        <col width="35%">
                        <col width="10%">
                    </colgroup>
                    <tr>
                        <td colspan="5" style="height:30px;background-color:#FFFFFF; text-align:left; width: 60px; border-top: none; border-right: none; border-left: none"><p style="font-size:17px;"><b>3. 공정일정</b></p></td>
                    </tr>
                    <tr>
                        <td style="height:30px;background-color:#E5E5E5; text-align:center; width: 60px;"><p style="font-size:12px;"><b>순번</b></p></td>
                        <td style="height:30px;background-color:#E5E5E5; text-align:center; width: 80px;"><p style="font-size:12px;"><b>구분</b></p></td>
                        <td style="height:30px;background-color:#E5E5E5; text-align:center; width: 212px;"><p style="font-size:12px;"><b>공정명</b></p></td>
                        <td style="height:30px;background-color:#E5E5E5; text-align:center; width: 212px;"><p style="font-size:12px;"><b>추진일정</b></p></td>
                        <td style="height:30px;background-color:#E5E5E5; text-align:center; width: 70px;"><p style="font-size:12px;"><b>담당자</b></p></td>
                    </tr>
                    <c:forEach var="list" items="${processList}" varStatus="status">
                        <tr>
                            <td style="height:30px; background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;"><c:out value="${status.index +1}"/></p></td>
                            <td style="height:30px; background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;"><c:out value="${list.PS_PREP_NM}"/></p></td>
                            <td style="height:30px; background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;"><c:out value="${list.PS_NM}"/></p></td>
                            <td style="height:30px; background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;"><c:out value="${list.PS_STR_DE}"/> ~ <c:out value="${list.PS_END_DE}"/></p></td>
                            <td style="height:30px; background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;"><c:out value="${list.PS_EMP_NM}"/></p></td>
                        </tr>
                    </c:forEach>
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
        approvalParams.formId = "143";
        approvalParams.compSeq = "1000";
        approvalParams.empSeq = "${loginVO.uniqId}";
        approvalParams.docTitle = "[결과보고서]${loginVO.orgnztNm}-${loginVO.name}";
        approvalParams.content = $("#approveDataPop")[0].innerHTML;
        approvalParams.type = "drafting";
        approvalParams.menuCd = "rndRes";
        approvalParams.docType = "A";

        approvalParams.linkageProcessId = "28";
        approvalParams.linkageType = "2";
        approvalParams.linkageProcessCode = "camticRndRes";
        approvalParams.approKey = "camticRndRes_${params.pjtSn}";

        linkageProcessOn(approvalParams);
    }
</script>
</body>
</html>
