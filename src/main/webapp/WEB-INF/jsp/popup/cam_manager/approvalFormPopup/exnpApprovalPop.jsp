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
    const result = customKendo.fn_customAjax("/payApp/pop/getExnpData", {
        exnpSn: ${params.exnpSn}
    });
    const rs = result.map;
    let formId = "97";
    let docTitle = "";
    if(rs.PAY_APP_TYPE == 1){
        docTitle = "[지출결의서]${loginVO.orgnztNm}-${loginVO.name}";
    }else if(rs.PAY_APP_TYPE == 2){
        docTitle = "[여입결의서]${loginVO.orgnztNm}-${loginVO.name}";
    }else if(rs.PAY_APP_TYPE == 3){
        docTitle = "[반납결의서]${loginVO.orgnztNm}-${loginVO.name}";
    }else if(rs.PAY_APP_TYPE == 4){
        docTitle = "[대체결의서]${loginVO.orgnztNm}-${loginVO.name}";
    }

    approvalDataInit();
    function approvalDataInit(){
        var approvalParams = {};
        approvalParams.mod = "W";
        approvalParams.formId = "96";
        approvalParams.compSeq = "1000";
        approvalParams.empSeq = "${loginVO.uniqId}";
        approvalParams.docTitle = docTitle;
        approvalParams.content = $("#approveDataPop")[0].innerHTML;
        approvalParams.type = "drafting";
        approvalParams.menuCd = "exnp";
        approvalParams.docType = "A";

        approvalParams.linkageProcessId = "25";
        approvalParams.linkageType = "2";
        approvalParams.linkageProcessCode = "camticExnp";
        approvalParams.approKey = "camticExnp_${params.exnpSn}";

        linkageProcessOn(approvalParams);
    }
</script>
</body>
</html>
