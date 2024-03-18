<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<body>
<div id="approveDataPop">
</div>
<script>
    approvalDataInit();

    function approvalDataInit(){
        let formId = "185";
        let menuCd = "propagRes";
        let docTitle = "[전파학습 결과보고서]";

        var approvalParams = {};
        approvalParams.mod = "W";
        approvalParams.formId = formId;
        approvalParams.compSeq = "1000";
        approvalParams.empSeq = "${loginVO.uniqId}";
        approvalParams.content = $("#approveDataPop")[0].innerHTML;
        approvalParams.type = "drafting";
        approvalParams.menuCd = menuCd;
        approvalParams.docType = "A";
        approvalParams.docTitle = docTitle+"${loginVO.orgnztNm}-${loginVO.name}";

        approvalParams.linkageProcessId = "47";
        approvalParams.linkageType = "2";
        approvalParams.linkageProcessCode = "camticPropagRes";
        approvalParams.approKey = "camticPropagRes_${data.pk}";

        linkageProcessOn(approvalParams);
    }
</script>
</body>
</html>
