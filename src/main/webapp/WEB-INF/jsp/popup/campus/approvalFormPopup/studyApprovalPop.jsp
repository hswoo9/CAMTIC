<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<body>
<div id="approveDataPop">
</div>
<script>
    approvalDataInit();

    function approvalDataInit(){
        var studyType = "${data.studyType}";


        let formId = "183";
        let menuCd = "study";
        let docTitle = "[학습조 신청서]";
        if(studyType == "propag"){
            menuCd = studyType;
            docTitle = "[전파학습 신청서]";
        }else if(studyType == "ojt"){
            menuCd = studyType;
            docTitle = "[OJT 신청서]";
        }

        var approvalParams = {};
        approvalParams.mod = "W";
        approvalParams.formId = formId;
        approvalParams.compSeq = "1000";
        approvalParams.empSeq = "${loginVO.uniqId}";
        approvalParams.content = $("#approveDataPop")[0].innerHTML;
        approvalParams.type = "drafting";
        approvalParams.menuCd = menuCd;
        approvalParams.docType = "A";
        approvalParams.docTitle = docTitle+"${loginVO.orgnztNm}-${loginVO.name}";

        approvalParams.linkageProcessId = "45";
        approvalParams.linkageType = "2";
        approvalParams.linkageProcessCode = "camticStudy";
        approvalParams.approKey = "camticStudy_${data.studyInfoSn}";

        linkageProcessOn(approvalParams);
    }
</script>
</body>
</html>
