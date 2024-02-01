<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<body class="font-opensans" style="background-color:#fff;">
<script type="text/javascript" src="/js/intra/cam_crm/regCrmPop.js?v=${today}"/></script>
<script type="text/javascript" src="<c:url value='/js/postcode.v2.js?autoload=false'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_purc/orderSendMailPop.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_purc/purchase.js?v=${today}'/>"></script>
<input type="hidden" id="claimSn" name="claimSn" value="${map.CLAIM_SN}">
<input type="hidden" id="purcSn" name="purcSn" value="${params.purcSn}">
<div style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">
                <span style="position: relative; top: 3px;">
                    메일 전송
                </span>
            </h3>
            <div id="reqPurcBtnDiv" class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-info" id="sendBtn" onclick="orderSendMail.fn_sendMail();">전송</button>
            </div>
        </div>

        <div style="padding: 20px 30px;">
            <input type="hidden" id="loginEmpSeq" value="${loginVO.uniqId}">
            <input type="hidden" id="loginDeptSeq" value="${loginVO.orgnztId}">
            <table class="popTable table table-bordered mb-0">
                <colgroup>
                    <col width="20%">
                    <col width="80%">
                </colgroup>
                <thead id="order">
                <tr>
                    <th scope="row" class="text-center th-color">수신자</th>
                    <td>
                        <input type="text" id="receiveEml" class="receiveEml" value="${map.CRM_NM}" style="width: 100%">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">발신자</th>
                    <td>
                        <input type="text" id="sendEml" class="sendEml" value="${map.CRM_NM}" style="width: 100%">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">제목</th>
                    <td>
                        <input type="text" id="subject" class="subject" value="" style="width: 100%">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">내용</th>
                    <td>
                        <input type="text" id="contents" class="contents" value="" style="width: 100%">
                    </td>
                </tr>
                </thead>
            </table>
        </div>
    </div>
</div>
<script type="text/javascript">
    orderSendMail.fn_defaultScript();
</script>
</body>
</html>