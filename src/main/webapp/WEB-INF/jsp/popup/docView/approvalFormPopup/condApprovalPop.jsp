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
        approvalParams.formId = "92";
        approvalParams.compSeq = "1000";
        approvalParams.empSeq = "${loginVO.uniqId}";
        approvalParams.docTitle = "[경조비지급신청서]${loginVO.orgnztNm}-${loginVO.name}";
        approvalParams.content = $("#approveDataPop")[0].innerHTML;
        approvalParams.type = "drafting";
        approvalParams.menuCd = "cond";
        approvalParams.docType = "A";

        approvalParams.linkageProcessId = "58";
        approvalParams.linkageType = "2";
        approvalParams.linkageProcessCode = "camticCond";
        approvalParams.approKey = "camticCond_${params.condSn}";

        linkageProcessOn(approvalParams);
    }
</script>
</body>
</html>
