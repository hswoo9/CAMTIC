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
    let result = customKendo.fn_customAjax("/payApp/pop/getPayAppData", {
        payAppSn: ${params.payAppSn}
    });
    const rs = result.map;

    let formId = "147";

    const pjtResult = customKendo.fn_customAjax("/project/getProjectByPjtCd2", {
        pjtCd: rs.PJT_CD
    });
    const pjtMap = pjtResult.map;

    /** pjtMap가 null이면서 (법인프로젝트) 앞자리가 M또는 Z일때 */
    if(pjtMap == null && (rs.PJT_CD.substring(0,1) == "M" || rs.PJT_CD.substring(0,1) == "Z")){
        formId = "154";
    }

    let docTitle = "";
    let html = "";
    if(rs.PAY_APP_TYPE == 1){
        docTitle = "[지급신청서] "+rs.APP_TITLE;
    }else if(rs.PAY_APP_TYPE == 2){
        docTitle = "[여입신청서] "+rs.APP_TITLE;
    }else if(rs.PAY_APP_TYPE == 3){
        docTitle = "[반납신청서] "+rs.APP_TITLE;
    }else if(rs.PAY_APP_TYPE == 4){
        docTitle = "[대체신청서] "+rs.APP_TITLE;
    }

    approvalDataInit();
    function approvalDataInit(){
        var approvalParams = {};
        approvalParams.mod = "W";
        approvalParams.formId = formId;
        approvalParams.compSeq = "1000";
        approvalParams.empSeq = "${loginVO.uniqId}";
        approvalParams.docTitle = docTitle;
        approvalParams.content = $("#approveDataPop")[0].innerHTML;
        approvalParams.type = "drafting";
        approvalParams.menuCd = "payApp";
        approvalParams.docType = "A";

        approvalParams.linkageProcessId = "15";
        approvalParams.linkageType = "2";
        approvalParams.linkageProcessCode = "camticPayApp";
        approvalParams.approKey = "camticPayApp_${params.payAppSn}";

        linkageProcessOn(approvalParams);
    }
</script>
</body>
</html>
