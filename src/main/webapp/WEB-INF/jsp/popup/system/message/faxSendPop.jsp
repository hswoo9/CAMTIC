<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/system/message/faxSendPop.js?v=${today}"></script>
<body class="font-opensans" style="background-color:#fff;">

<div class="col-lg-12" style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">팩스전송</h3>
            <div>
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;margin-top: 8px;" onclick="window.close();">닫기</button>
            </div>
        </div>

        <div style="padding: 20px 5px;">
            <table class="popTable table table-bordered mb-0">
                <colgroup>
                    <col width="30%">
                    <col width="70%">
                </colgroup>
                <thead>
                <tr>
                    <th scope="row" class="text-center th-color"><span class="red-star">*</span>팩스번호1</th>
                    <td>
                        <input id="faxNum1" style="width: 100%;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">팩스번호2</th>
                    <td>
                        <input id="faxNum2" style="width: 100%;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color"><span class="red-star">*</span>담당자</th>
                    <td>
                        <input id="mngNm" style="width: 100%;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color"><span class="red-star">*</span>회신번호</th>
                    <td>
                        <input id="requestNum" style="width: 100%;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color"><span class="red-star">*</span>첨부파일</th>
                    <td>
                        <input type="hidden" id="fileSn" name="fileSn">
                        <label for="file" id="fileLabel" class="k-button k-button-solid-base">파일첨부</label>
                        <input type="file" id="file" name="file" onchange="paxSendPop.fileChange(this)" style="display: none">
                        <span id="fileName"></span>
                    </td>
                </tr>
                </thead>
            </table>
        </div>
    </div>
</div>
<script>
</script>
</body>
