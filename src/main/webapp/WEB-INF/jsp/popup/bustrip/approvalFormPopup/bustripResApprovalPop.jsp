<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<body>
<div class="approval_div" id="approvePop">
<div id="approveDataPop">
    <table style="font-family:굴림;margin: 0 auto; max-width: none; border-collapse: separate; border-spacing: 0; empty-cells: show; border-width: 0; outline: 0; text-align: left; font-size:12px; line-height: 20px; width: 100%; ">
        <tr>
            <td style="border-width: 0 0 0 0; font-weight: normal; box-sizing: border-box;">
                <table border="1" style="border-collapse: collapse; margin-top: 0px;">
                    <tr>
                        <td style="height:25px;background-color:#FFE0E0; text-align:center; width: 200px"><p style="font-weight: bold;">소 속</p></td>
                        <td style="height:25px;background-color:#FFE0E0; text-align:center; width: 90px"><p style="font-weight: bold">직 위</p></td>
                        <td style="height:25px;background-color:#FFE0E0; text-align:center; width: 73px"><p style="font-weight: bold">성 명</p></td>
                        <td style="height:25px;background-color:#FFE0E0; text-align:center; width: 130px"><p style="font-weight: bold">비 고</p></td>
                        <td style="height:25px;background-color:#FFE0E0; text-align:center; width: 140px"><p style="font-weight: bold">서 명</p></td>
                    </tr>
                    <c:forEach var="list" items="${list}">
                        <tr>
                            <td style="height:25px;text-align:center;"><p>${list.deptNm} ${list.teamNm}</p></td>
                            <td style="height:25px;text-align:center;"><p>${list.positionNm}</p></td>
                            <td style="height:25px;text-align:center;"><p>${list.EMP_NAME}</p></td>
                            <td style="height:25px;text-align:center;"><p></p></td>
                            <td style="height:25px;text-align:center;"><p style="text-align: right">(서명)</p></td>
                        </tr>
                    </c:forEach>
                </table>
            </td>
        </tr>
    </table>
</div>
</div>
<script>
    approvalDataInit();

    function approvalDataInit(){
        var approvalParams = {};
        approvalParams.mod = "W";
        approvalParams.formId = "136";
        approvalParams.compSeq = "1000";
        approvalParams.empSeq = "${loginVO.uniqId}";
        approvalParams.docTitle = "[출장결과보고서]${loginVO.orgnztNm}-${loginVO.name}";
        approvalParams.content = $("#approveDataPop")[0].innerHTML;
        approvalParams.type = "drafting";
        approvalParams.menuCd = "bustripRes";
        approvalParams.docType = "A";

        approvalParams.linkageProcessId = "7";
        approvalParams.linkageType = "2";
        approvalParams.linkageProcessCode = "camticBustripRes";
        approvalParams.approKey = "camticBustripRes_${data.hrBizReqResultId}";

        linkageProcessOn(approvalParams);
    }
</script>
</body>
</html>
