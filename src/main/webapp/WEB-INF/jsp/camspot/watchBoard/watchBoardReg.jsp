<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cams_pot/watchBoard/watchBoardReg.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/ckEditor/ckeditor.js'/>"></script>
<style>
    .k-action-buttons {
        display : none !important;
    }
</style>
<div class="mainCard">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h3 class="panel-title">함께보아요</h3>
            <div class="title-road" style="margin-top: 10px;">캠스팟 > 캠스팟 > 함께보아요</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>

        <div class="panel-body">
            <input type="hidden" id="watchBoardId" name="watchBoardId">
            <input type="hidden" id="page" name="page">
            <table class="searchTable table table-bordered mb-0" style="border: 1px solid #dedfdf;">
                <colgroup>
                    <col width="10%">
                </colgroup>
                <tbody>
                <tr>
                    <th scope="row" class="text-center th-color">제목</th>
                    <td>
                        <input type="text" id="boardArticleTitle" name="boardArticleTitle" style="width: 100%;" value="">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">내용</th>
                    <td>
                        <textarea id="boardArticleContent" name="boardArticleContent" style="width: 100%;"></textarea>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">사진</th>
                    <td>
                        <input type="hidden" id="file1Sn" name="file1Sn">
                        <label for="file1" class="k-button k-button-solid-base">파일첨부</label>
                        <input type="file" id="file1" name="file1" onchange="wbr.fileChange(this)" style="display: none">
                        <span id="file1Name"></span>
                    </td>
                </tr>
                </tbody>
            </table>
            <div class="btn-st" style="text-align: right">
                <button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="wbr.listPageMove()">
                    <span class="k-button-text">목록</span>
                </button>
                <button type="button" id="saveBtn" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="wbr.setRequestBoard()">
                    <span class="k-button-text">등록</span>
                </button>
            </div>
        </div>
    </div>
</div> <%-- col-lg-12 --%>
<script>
    wbr.fnDefaultScript(JSON.parse('${params}'));
</script>
</body>
</html>