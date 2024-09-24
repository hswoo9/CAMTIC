<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js?v=4'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cams_pot/normalBoardWrite.js?v=6'/>"></script>
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
            <h3 class="panel-title" style="font-size:18px;"></h3>
            <div class="title-road"></div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>

        <div class="panel-body">
            <input type="hidden" id="boardArticleId" name="boardArticleId">
            <input type="hidden" id="page" name="page" value="">
            <input type="hidden" id="searchCategory" name="searchCategory" value="">
            <input type="hidden" id="searchColumn" name="searchColumn" value="">
            <input type="hidden" id="searchContent" name="searchContent" value="">
            <%--<table class="table table-bordered mb-0" style="border: 1px solid #dedfdf;" style="width: 600px;">--%>
            <table class="searchTable table table-bordered mb-0" style="border: 1px solid #dedfdf;">
                <colgroup>
                    <col width="8%">
                </colgroup>
                <tbody>
                <tr id="categoryTr" style="display: none">
                    <th scope="row" class="text-center th-color">카테고리</th>
                    <td>
                        <input type="text" id="boardCategoryId" name="boardCategoryId" style="width: 100%;" value="">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">제목</th>
                    <td>
                        <input type="text" id="boardArticleTitle" name="boardArticleTitle" style="width: 100%;" value="">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">작성자</th>
                    <td>
                        <input type="hidden" id="empSeq" name="empSeq" style="width: 100%;" value="${loginVO.uniqId}">
                        <input type="text" id="empName" name="empName" style="width: 100%;" value="${loginVO.name}" disabled>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">내용</th>
                    <td colspan="5">
                        <input type="text" id="boardArticleContent" name="boardArticleContent" style="width: 100%;">
                    </td>
                </tr>
                <tr class="publicYn">
                    <th scope="row" class="text-center th-color">공개여부</th>
                    <td>
                        <span id="publicYn" name="publicYn"></span>
                    </td>
                </tr>
                <tr id="privatePassWordTr" style="display: none">
                    <th scope="row" class="text-center th-color">비공개 비밀번호</th>
                    <td>
                        <input type="password" id="privatePassWord" name="privatePassWord"/>
                    </td>
                </tr>
                <tr style="display: none" id="fileTr">
                    <th scope="row" class="text-center th-color">첨부파일</th>
                    <td>
                        <div id="infoTxtDiv" style="color: red; font-weight: bold; margin-bottom: 3px; display: none;">
                            ※ 관련 기안문서(공고 등에 대한 근거)도 첨부 바람
                        </div>
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
                <button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="normalArticleWrite.listPageMove()">
                    <span class="k-button-text">목록</span>
                </button>
                <button type="button" id="saveBtn" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="normalArticleWrite.setBoardArticle()">
                    <span class="k-button-text">등록</span>
                </button>
            </div>
        </div>
    </div>
</div> <%-- col-lg-12 --%>
<script>
    normalArticleWrite.fnDefaultScript(JSON.parse('${params}'));
    $(".publicYn").hide();
</script>
</body>
</html>