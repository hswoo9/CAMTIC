<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<body>
<div id="approveDataPop">
    ...
</div>
<script>
    approvalDataInit();

    function approvalDataInit(){
        var approvalParams = {};
        const eduFormType = ${data.eduFormType};
        let formId = 123;
        switch(eduFormType) {
            case 1:
                formId = 123
                break;
            case 2:
                formId = 124
                break;
            case 3:
                formId = 125
                break;
            case 4:
                formId = 126
                break;
            case 5:
                formId = 127
                break;
            case 6:
                formId = 128
                break;
            case 7:
                formId = 129
                break;
            case 8:
                formId = 130
                break;
            case 9:
                formId = 131
                break;
            case 10:
                formId = 132
                break;
        }
        approvalParams.mod = "W";
        approvalParams.formId = formId;
        approvalParams.compSeq = "1000";
        approvalParams.empSeq = "${loginVO.uniqId}";
        approvalParams.content = $("#approveDataPop")[0].innerHTML;
        approvalParams.type = "drafting";
        approvalParams.menuCd = "campus";
        approvalParams.docType = "A";

        approvalParams.linkageProcessId = "1";
        approvalParams.linkageType = "2";
        approvalParams.linkageProcessCode = "camticEducationRes";
        approvalParams.approKey = "camticEducationRes_${data.eduInfoId}";

        linkageProcessOn(approvalParams);
    }
</script>
</body>
</html>
