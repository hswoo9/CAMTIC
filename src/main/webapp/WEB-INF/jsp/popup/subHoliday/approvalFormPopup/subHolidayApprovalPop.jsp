<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<body>
<div id="approveDataPop">
</div>
<script>
    let formId = "88";
    const subHolidayId = "${data.subHolidayId}";
    const result = customKendo.fn_customAjax("/subHoliday/getVacUseHistoryOne", {
        subholidayUseId : subHolidayId
    });
    const ResultData = result.data;
    const subHolidayCodeId = ResultData.SUBHOLIDAY_CODE_ID;

    /** 연차, 반가 */
    if(subHolidayCodeId == 1 || subHolidayCodeId == 3 || subHolidayCodeId == 4) {
        formId = "88";

    /** 병가, 공가, 경조휴가, 대체휴가, 근속포상휴가 */
    }else if(subHolidayCodeId == 5 || subHolidayCodeId == 6 || subHolidayCodeId == 7 || subHolidayCodeId == 9 || subHolidayCodeId == 10) {
        formId = "189";

    /** 출산휴가 */
    }else if(subHolidayCodeId == 8) {
        formId = "190";
    }

    approvalDataInit();

    function approvalDataInit(){
        var approvalParams = {};
        approvalParams.mod = "W";
        approvalParams.formId = formId;
        approvalParams.compSeq = "1000";
        approvalParams.empSeq = "${loginVO.uniqId}";
        approvalParams.docTitle = "[휴가원]${loginVO.orgnztNm}-${loginVO.name}";
        approvalParams.content = $("#approveDataPop")[0].innerHTML;
        approvalParams.type = "drafting";
        approvalParams.menuCd = "subHoliday";
        approvalParams.docType = "A";

        approvalParams.linkageProcessId = "1";
        approvalParams.linkageType = "2";
        approvalParams.linkageProcessCode = "camticHoliday";
        approvalParams.approKey = "camticHoliday_${data.subHolidayId}";

        linkageProcessOn(approvalParams);
    }
</script>
</body>
</html>
