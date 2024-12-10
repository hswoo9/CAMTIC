<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<script type="text/javascript" src="/js/intra/cam_crm/mfExcelUploadPop.js?v=${today}"/></script>

<body class="font-opensans" style="background-color:#fff;">
<input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}" />
<input type="hidden" id="popType" name="popType" value="${params.popType}" />
<div style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM"><span style="position: relative; top: 3px;" id="pjtTitle">엑셀 업로드</span></h3>
            <div class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-info" style="margin-right:5px;" onclick="meu.setExcelFileUpload()">업로드</button>
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">닫기</button>
            </div>
        </div>

        <div style="padding: 20px 30px;">
            <div style="display:flex; justify-content: space-between;">
                <table class="popTable table table-bordered mb-0">
                    <colgroup>
                        <col style="width: 20%">
                    </colgroup>
                    <thead>
                    <tr>
                        <th>파일 선택</th>
                        <td>
                            <input type="text" id="fileName" name="fileName" style="width: 77%" class="k-input k-textbox k-input-solid k-input-md k-rounded-md" readonly onclick="$('#file').click()"/>
                            <label for="file" class="k-button k-button-solid-base">파일첨부</label>
                            <input type="file" id="file" name="file" onchange="meu.fileChange(this)" style="display: none">
                        </td>
                    </tr>
                    </thead>
                </table>
            </div>
        </div>
    </div>
</div>
<script>
    meu.fn_defaultScript();
</script>
</body>
</html>