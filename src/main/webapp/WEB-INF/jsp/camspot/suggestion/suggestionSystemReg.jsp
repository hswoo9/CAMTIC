<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cams_pot/suggestion/suggestionSystemReg.js?v=${today}'/>"></script>
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
            <h3 class="panel-title">제안제도</h3>
            <div class="title-road" style="margin-top: 10px;">캠스팟 > 캠스팟 > 제안제도</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>

        <div class="panel-body">
            <input type="hidden" id="suggestionBoardId" name="suggestionBoardId">
            <table class="searchTable table table-bordered mb-0" style="border: 1px solid #dedfdf;">
                <colgroup>
                    <col width="8%">
                </colgroup>
                <tbody>
                <tr>
                    <th scope="row" class="text-center th-color">제안부문</th>
                    <td>
                        <input type="text" id="suggestionType" name="suggestionType" style="width: 100%;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">제안제목</th>
                    <td>
                        <input type="text" id="suggestionTitle" name="suggestionTitle" style="width: 100%;" value="">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">현상 및 문제점</th>
                    <td>
                        <textarea id="suggestionContent1" name="suggestionContent1" style="width: 100%;"></textarea>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">개선방향</th>
                    <td>
                        <textarea id="suggestionContent2" name="suggestionContent2" style="width: 100%;"></textarea>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">효 과</th>
                    <td>
                        <textarea id="suggestionContent3" name="suggestionContent3" style="width: 100%;"></textarea>
                    </td>
                </tr>
                <tr id="fileTr">
                    <th scope="row" class="text-center th-color">첨부파일</th>
                    <td>
                        <div style="max-width: 100% !important;">
                            <div style="width:100%;" >
                                <input name="files" id="files" type="file" aria-label="files" />
                            </div>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
            <div class="btn-st" style="text-align: right">
                <button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="ssr.listPageMove()">
                    <span class="k-button-text">목록</span>
                </button>
                <button type="button" id="saveBtn" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="ssr.setSuggestionSystem()">
                    <span class="k-button-text">등록</span>
                </button>
            </div>
        </div>
    </div>
</div> <%-- col-lg-12 --%>
<script>
    ssr.fnDefaultScript(JSON.parse('${params}'));
</script>
</body>
</html>