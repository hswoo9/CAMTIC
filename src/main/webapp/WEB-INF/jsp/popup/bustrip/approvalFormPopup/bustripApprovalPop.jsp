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
    let formId = "135";
    let hrBizReqId = '${data.hrBizReqId}';

    const result = customKendo.fn_customAjax("/bustrip/getBustripReqInfo", {
        hrBizReqId: hrBizReqId
    });
    const busInfo = result.rs.rs;

    let tripCode = result.rs.rs.TRIP_CODE;
    let tripCodeText = "";

    /** 도내 */
    if(tripCode == 1 || tripCode == 2) {
        formId = "135"

    /** 도외 */
    }else if(tripCode == 3) {
        formId = "168"
    /** 해외 */
    }else if(tripCode == 4) {
        formId = "169"
    }


    approvalDataInit();

    function approvalDataInit(){
        var approvalParams = {};
        approvalParams.mod = "W";
        approvalParams.formId = formId;
        approvalParams.compSeq = "1000";
        approvalParams.empSeq = "${loginVO.uniqId}";
        approvalParams.content = $("#approveDataPop")[0].innerHTML;
        approvalParams.type = "drafting";
        approvalParams.menuCd = "bustrip";
        approvalParams.docType = "A";
        approvalParams.docTitle = "[출장신청서]["+busInfo.TRIP_DAY_FR+"]${loginVO.orgnztNm}-${loginVO.name}";

        approvalParams.linkageProcessId = "6";
        approvalParams.linkageType = "2";
        approvalParams.linkageProcessCode = "camticBustrip";
        approvalParams.approKey = "camticBustrip_${data.hrBizReqId}";

        linkageProcessOn(approvalParams);
    }
</script>
</body>
</html>
