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

    let formId = "145";
    let purcSn = ${params.purcSn};
    let data = {
        purcSn: purcSn
    }
    const result = customKendo.fn_customAjax("/purc/getPurcReq.do", data).data;

    if(result.BUSN_CLASS == "R" || result.BUSN_CLASS == "D"){
        formId = "187";
    }else if(result.BUSN_CLASS == "S"){
        formId = "188";
    }

    approvalDataInit();
    function approvalDataInit(){
        var approvalParams = {};
        approvalParams.mod = "W";
        approvalParams.formId = formId;
        approvalParams.compSeq = "1000";
        approvalParams.empSeq = "${loginVO.uniqId}";
        approvalParams.docTitle = "[구매요청서]${loginVO.orgnztNm}-${loginVO.name}";
        approvalParams.content = $("#approveDataPop")[0].innerHTML;
        approvalParams.type = "drafting";
        approvalParams.menuCd = "purc";
        approvalParams.docType = "A";

        approvalParams.linkageProcessId = "15";
        approvalParams.linkageType = "2";
        approvalParams.linkageProcessCode = "camticPurc";
        approvalParams.approKey = "camticPurc_${params.purcSn}";

        linkageProcessOn(approvalParams);
    }
</script>
</body>
</html>
