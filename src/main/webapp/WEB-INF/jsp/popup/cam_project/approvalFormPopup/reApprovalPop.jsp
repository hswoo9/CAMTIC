<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<body>
<div id="approveDataPop">
</div>
<script>
    window.resizeTo(965, 900);
    approvalDataInit();
    function approvalDataInit(){
        var approvalParams = {};
        approvalParams.mod = "W";
        approvalParams.formId = "156";
        approvalParams.compSeq = "1000";
        approvalParams.empSeq = "${loginVO.uniqId}";
        approvalParams.docTitle = "[반납신청서]${loginVO.orgnztNm}-${loginVO.name}";
        approvalParams.content = $("#approveDataPop")[0].innerHTML;
        approvalParams.type = "drafting";
        approvalParams.menuCd = "pjtRe";
        approvalParams.docType = "A";

        approvalParams.linkageProcessId = "33";
        approvalParams.linkageType = "2";
        approvalParams.linkageProcessCode = "camticPjtChange";
        approvalParams.approKey = "camticPjtChange_${params.pjtSn}";

        linkageProcessOn(approvalParams);
    }
</script>
</body>
</html>
