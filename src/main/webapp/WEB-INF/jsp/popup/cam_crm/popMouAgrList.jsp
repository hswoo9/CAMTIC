<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>

<style>

</style>
<body class="font-opensans" style="background-color:#fff;">
<script type="text/javascript" src="/js/intra/cam_crm/popMouAgrList.js?v=${today}"/></script>
<script type="text/javascript" src="<c:url value='/js/postcode.v2.js?autoload=false'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/inside/userManage/userReqPop.js?v=${today}'/>"></script>

<input type="hidden" id="mouAgrSn" value="${params.mouAgrSn}" />
<div style="padding:0;">
    <div class="table-responsive">
        <input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">
        <input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">
                <span style="position: relative; top: 3px;" id="pjtTitle">
                    체결기관 등록
                </span>
            </h3>
            <div class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-info" onclick="mouAgrListReg.fn_save();">저장</button>
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">닫기</button>
            </div>
        </div>

        <div style="padding: 20px 30px;">
            <table class="popTable table table-bordered mb-0">
                <colgroup>
                    <col width="20%">
                    <col width="30%">
                    <col width="20%">
                    <col width="30%">
                </colgroup>
                <thead>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>체결기관
                    </th>
                    <td colspan="3" id="crmTd">
                        <input type="text" id="crmNm" name="crmNm" style="width: 100%;">
                    </td>
                </tr>
                </thead>
            </table>
        </div>
    </div>
</div>
<script type="text/javascript">
    mouAgrListReg.fn_defaultScript();
</script>
</body>
</html>