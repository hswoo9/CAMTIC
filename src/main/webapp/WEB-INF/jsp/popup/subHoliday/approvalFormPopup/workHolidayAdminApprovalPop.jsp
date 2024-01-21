<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<body>
<div id="approveDataPop">
    ...
</div>
<script>
    approvalDataInit();

    function approvalDataInit(){
        var approvalParams = {};
        approvalParams.mod = "W";
        approvalParams.formId = "178";
        approvalParams.compSeq = "1000";
        approvalParams.empSeq = "${loginVO.uniqId}";
        approvalParams.docTitle = "[휴일근로신청서]${loginVO.orgnztNm}-${loginVO.name}";
        approvalParams.content = $("#approveDataPop")[0].innerHTML;
        approvalParams.type = "drafting";
        approvalParams.menuCd = "subHoliday";
        approvalParams.docType = "A";

        approvalParams.linkageProcessId = "2";
        approvalParams.linkageType = "2";
        approvalParams.linkageProcessCode = "camticAdminWorkHoliday";
        approvalParams.approKey = "camticAdminWorkHoliday_${data.subHolidayId}";

        linkageProcessOn(approvalParams);
    }
</script>
</body>
</html>
