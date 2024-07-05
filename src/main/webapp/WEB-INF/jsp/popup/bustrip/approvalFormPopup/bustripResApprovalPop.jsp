<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<body>
<div class="approval_div" id="approvePop">
<div id="approveDataPop">
</div>
</div>
<script>
    window.resizeTo(965, 900);

    let formId = "136";
    let hrBizReqResultId = '${data.hrBizReqResultId}';

    const result = customKendo.fn_customAjax("/bustrip/getBustripOne", { hrBizReqResultId: hrBizReqResultId });
    const busInfo = result.map;
    let tripCode = busInfo.TRIP_CODE;

    /** 도내 */
    if(tripCode == 1 || tripCode == 2) {
        formId = "136"

    /** 도외 */
    }else if(tripCode == 3) {
        formId = "170"

    /** 해외 */
    }else if(tripCode == 4) {
        formId = "171"
    }



    approvalDataInit();

    function approvalDataInit(){
        var approvalParams = {};
        approvalParams.mod = "W";
        approvalParams.formId = formId;
        approvalParams.compSeq = "1000";
        approvalParams.empSeq = "${loginVO.uniqId}";
        approvalParams.docTitle = "[출장결과보고서]["+busInfo.TRIP_DAY_FR+"]${loginVO.orgnztNm}-${loginVO.name}";
        approvalParams.content = $("#approveDataPop")[0].innerHTML;
        approvalParams.type = "drafting";
        approvalParams.menuCd = "bustripRes";
        approvalParams.docType = "A";

        approvalParams.linkageProcessId = "7";
        approvalParams.linkageType = "2";
        approvalParams.linkageProcessCode = "camticBustripRes";
        approvalParams.approKey = "camticBustripRes_${data.hrBizReqResultId}";

        linkageProcessOn(approvalParams);
    }
</script>
</body>
</html>
