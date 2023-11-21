<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="<c:url value='/js/intra/cam_mng/bgtItemInfo.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js?${today}'/>"></script>

<style>

</style>

<input type="hidden" id="subPjtCd" value="${params.pjtCd}" />
<input type="hidden" id="regEmpSeq" value="${loginVO.uniqId}" />

<input type="hidden" id="step" value="E1" />
<input type="hidden" id="stepColumn" value="STEP2" />
<input type="hidden" id="nextStepColumn" value="STEP3" />
<input type="hidden" id="version" value="" />

<div style="padding: 10px">
    <div class="table-responsive">
        <p style="font-weight: bold; font-size: 16px; margin-bottom: 3px;">☞ ${data.PJT_NM}</p>
        <div id="mainGrid">

        </div>

        <p style="font-weight: bold; font-size: 16px; margin: 15px 0 3px 0;">☞ 수입예산</p>
        <div id="subGrid">

        </div>
    </div>
</div>

<script>
    var inParameters = JSON.parse('${paramsMap}');

    bgtItemInfo.fn_defaultScript(inParameters);
</script>
</body>
</html>