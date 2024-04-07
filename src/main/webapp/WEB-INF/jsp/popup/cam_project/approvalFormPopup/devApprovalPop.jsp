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

    let formId = "142";
    /** 협업일때 */
    if(map.TM_YN == "Y"){
        formId = "162";
    }

    window.resizeTo(965, 900);
    approvalDataInit();
    function approvalDataInit(){
        var approvalParams = {};
        approvalParams.mod = "W";
        approvalParams.formId = formId;
        approvalParams.compSeq = "1000";
        approvalParams.empSeq = "${loginVO.uniqId}";
        approvalParams.docTitle = "[수행계획서]"+map.PJT_NM;
        approvalParams.content = $("#approveDataPop")[0].innerHTML;
        approvalParams.type = "drafting";
        approvalParams.menuCd = "dev";
        approvalParams.docType = "A";

        approvalParams.linkageProcessId = "12";
        approvalParams.linkageType = "2";
        approvalParams.linkageProcessCode = "camticDev";
        approvalParams.approKey = "camticDev_${params.devSn}";

        linkageProcessOn(approvalParams);
    }
</script>
</body>
</html>
