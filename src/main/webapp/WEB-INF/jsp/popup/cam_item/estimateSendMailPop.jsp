<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<body class="font-opensans" style="background-color:#fff;">
<script type="text/javascript" src="/js/intra/cam_crm/regCrmPop.js?v=${today}"/></script>
<script type="text/javascript" src="<c:url value='/js/postcode.v2.js?autoload=false'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_item/popup/estimateSendMailPop.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_purc/purchase.js?v=${today}'/>"></script>
<div style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">
                <span style="position: relative; top: 3px;">
                    견적서 메일 전송
                </span>
            </h3>
            <div id="reqPurcBtnDiv" class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-info" id="sendBtn" style="font-size: 12px;" onclick="sendMail.fn_sendMail();">전송</button>
                <button type="button" class="k-button k-button-solid-error" style="font-size: 12px;" onclick="window.close()">닫기</button>
            </div>
        </div>

        <div style="padding: 20px 30px;">
            <input type="hidden" id="regEmpSeq" value="${loginVO.uniqId}">
            <input type="hidden" id="loginDeptSeq" value="${loginVO.orgnztId}">
            <input type="hidden" id="ooSnArr" value="${params.ooSnArr}">
            <table class="popTable table table-bordered mb-0">
                <colgroup>
                    <col width="20%">
                    <col width="80%">
                </colgroup>
                <thead id="order">
                <tr>
                    <th scope="row" class="text-center th-color">업체명</th>
                    <td>
                        <span id="crmNm" class="crmNm"></span>
                        <input type="hidden" id="crmSn" class="crmSn" value="${params.crmSn}"/>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">받는메일 주소</th>
                    <td>
                        <input type="text" id="receiveEml" class="receiveEml" value="" style="width: 100%">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">메일제목</th>
                    <td>
                        <input type="text" id="subject" class="subject" value="CAMTIC 견적서 - " style="width: 100%">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">메일내용</th>
                    <td>
                        <textarea id="contents" class="contents" style="line-height: 180%;"></textarea>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">첨부파일</th>
                    <td>
                        <label for="fileList" class="k-button k-button-solid-base">파일첨부</label>
                        <input type="file" id="fileList" name="fileList" onchange="sendMail.fileChange()" style="display: none" multiple />
                        <span id="fileName" name="fileName"></span>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">발송메일 주소</th>
                    <td>
                        <input type="text" id="sendEml" class="sendEml" value="" style="width: 100%">
                    </td>
                </tr>
                </thead>
            </table>
        </div>
    </div>
</div>
<script type="text/javascript">
    sendMail.fn_defaultScript();
</script>
</body>
</html>