<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<c:set var="ran"><%= java.lang.Math.round(java.lang.Math.random() * 12345) %></c:set>
<body>
<div id="approveDataPop">
    ...
</div>
<script>
    approvalDataInit();

    function approvalDataInit(){
        var approvalParams = {};
        approvalParams.mod = "W";
        approvalParams.formId = "182";
        approvalParams.compSeq = "1000";
        approvalParams.empSeq = "${loginVO.uniqId}";
        approvalParams.docTitle = "[재고마감]${loginVO.orgnztNm}-${loginVO.name}";
        approvalParams.content = $("#approveDataPop")[0].innerHTML;
        approvalParams.type = "drafting";
        approvalParams.menuCd = "invenDeadLine";
        approvalParams.docType = "A";

        approvalParams.linkageProcessId = "7";
        approvalParams.linkageType = "2";
        approvalParams.linkageProcessCode = "camticInvenDeadLine";
        approvalParams.approKey = "camticInvenDeadLine_${ran}";

        linkageProcessOn(approvalParams);
    }
</script>
</body>
</html>
