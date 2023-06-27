<%--
  Created by IntelliJ IDEA.
  User: jsy
  Date: 2023-06-19
  Time: 오전 10:19
  To change this template use File | Settings | File Templates.
--%>
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
        let formId = 113;
        switch(eduFormType) {
            case 1:
                formId = 113
                break;
            case 2:
                formId = 114
                break;
            case 3:
                formId = 115
                break;
            case 4:
                formId = 116
                break;
            case 5:
                formId = 117
                break;
            case 6:
                formId = 118
                break;
            case 7:
                formId = 119
                break;
            case 8:
                formId = 120
                break;
            case 9:
                formId = 121
                break;
            case 10:
                formId = 122
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
        approvalParams.linkageProcessCode = "camticEducation_";
        approvalParams.approKey = "camticEducation_${data.eduInfoId}";

        linkageProcessOn(approvalParams);
    }
</script>
</body>
</html>
