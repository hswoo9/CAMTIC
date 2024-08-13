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

    let result = customKendo.fn_customAjax("/inside/getInComeUpdateList", {
        documentSn : ${params.documentSn}
    });
    const rs = result.data;
    let docTitle = "[접수대장]" + rs.DOCUMENT_TITLE_NAME;

    approvalDataInit();
    function approvalDataInit(){
        var approvalParams = {};
        approvalParams.mod = "W";
        approvalParams.formId = "194";
        approvalParams.compSeq = "1000";
        approvalParams.empSeq = "${loginVO.uniqId}";
        approvalParams.docTitle = docTitle;
        approvalParams.content = $("#approveDataPop")[0].innerHTML;
        approvalParams.type = "drafting";
        approvalParams.menuCd = "inCome";
        approvalParams.docType = "A";

        approvalParams.linkageProcessId = "51";
        approvalParams.linkageType = "2";
        approvalParams.linkageProcessCode = "camticInCome";
        approvalParams.approKey = "camticInCome_${params.documentSn}";

        linkageProcessOn(approvalParams);
    }
</script>
</body>
</html>
