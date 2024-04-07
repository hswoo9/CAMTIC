<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<body>
<div id="approveDataPop">
</div>
<script>
    let pjtSn = "${params.pjtSn}";
    const pjtInfo = customKendo.fn_customAjax("/project/getProjectStep", {pjtSn: pjtSn});
    const map = pjtInfo.rs;

    window.resizeTo(965, 900);
    approvalDataInit();
    function approvalDataInit(){
        var approvalParams = {};
        approvalParams.mod = "W";
        approvalParams.formId = "149";
        approvalParams.compSeq = "1000";
        approvalParams.empSeq = "${loginVO.uniqId}";
        approvalParams.docTitle = "[수주보고서]" + map.PJT_NM;
        approvalParams.content = $("#approveDataPop")[0].innerHTML;
        approvalParams.type = "drafting";
        approvalParams.menuCd = "unRndDelv";
        approvalParams.docType = "A";

        approvalParams.linkageProcessId = "29";
        approvalParams.linkageType = "2";
        approvalParams.linkageProcessCode = "camticUnRndDelv";
        approvalParams.approKey = "camticUnRndDelv_${params.pjtSn}";

        linkageProcessOn(approvalParams);
    }
</script>
</body>
</html>
