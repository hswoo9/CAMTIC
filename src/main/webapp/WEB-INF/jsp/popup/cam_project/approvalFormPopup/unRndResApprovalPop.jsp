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
    let result = customKendo.fn_customAjax("/project/engn/getDelvData", {pjtSn: pjtSn});
    const map = result.map;

    let formId = "151";
    /** 협업일때 */
    if(map.TM_YN == "Y"){
        formId = "158";
    }

    window.resizeTo(965, 900);
    approvalDataInit();
    function approvalDataInit(){
        var approvalParams = {};
        approvalParams.mod = "W";
        approvalParams.formId = formId;
        approvalParams.compSeq = "1000";
        approvalParams.empSeq = "${loginVO.uniqId}";
        approvalParams.docTitle = "[결과보고서]"+map.PJT_NM;
        approvalParams.content = $("#approveDataPop")[0].innerHTML;
        approvalParams.type = "drafting";
        approvalParams.menuCd = "unRndRes";
        approvalParams.docType = "A";

        approvalParams.linkageProcessId = "31";
        approvalParams.linkageType = "2";
        approvalParams.linkageProcessCode = "camticUnRndRes";
        approvalParams.approKey = "camticUnRndRes_${params.pjtSn}";

        linkageProcessOn(approvalParams);
    }
</script>
</body>
</html>
