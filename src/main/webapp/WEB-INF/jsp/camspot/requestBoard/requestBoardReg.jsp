<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cams_pot/requestBoard/requestBoardReg.js?v=${today}'/>"></script>
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
            <h3 class="panel-title"></h3>
            <div class="title-road" style="margin-top: 10px;"></div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>

        <div class="panel-body">
            <input type="hidden" id="requestBoardId" name="requestBoardId">
            <input type="hidden" id="requestType" name="requestType">
            <input type="hidden" id="page" name="page">
            <input type="hidden" id="searchStatus" name="searchStatus" >
            <input type="hidden" id="startDt" name="startDt">
            <input type="hidden" id="endDt" name="endDt">
            <input type="hidden" id="searchEmpName" name="searchEmpName">
            <input type="hidden" id="searchColumn" name="searchColumn">
            <input type="hidden" id="searchContent" name="searchContent">

            <table class="searchTable table table-bordered mb-0" style="border: 1px solid #dedfdf;">
                <colgroup>
                    <col width="10%">
                </colgroup>
                <tbody>
                <tr>
                    <th scope="row" class="text-center th-color">제목</th>
                    <td>
                        <input type="text" id="requestTitle" name="requestTitle" style="width: 100%;" value="">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">접수자</th>
                    <td>
                        <input type="hidden" id="empName" value="${loginVO.name}">
                        ${loginVO.name}
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">내선번호</th>
                    <td>
                        <input type="hidden" id="officeTelNum" value="${uprinfList.OFFICE_TEL_NUM}">
                        ${uprinfList.OFFICE_TEL_NUM}
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">분류</th>
                    <td>
                        <input id="largeMenu" style="width: 200px;">
                        <input id="middleMenu" style="width: 200px;">
                        <input id="smallMenu" style="width: 200px;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">내용</th>
                    <td>
                        <textarea id="requestContent" name="requestContent" style="width: 100%;"></textarea>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color" id="deadlineDateTh"></th>
                    <td>
                        <input type="text" id="deadlineDate" name="deadlineDate" style="width: 10%;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">첨부파일</th>
                    <td>
                        <form style="padding: 0px 30px;">
                            <div class="card-header" style="padding: 5px;">
                                <div class="card-options">
                                    <div class="filebox" style="text-align: right">
                                        <button type="button" class="fileUpload k-grid-button k-button k-button-md k-button-solid k-button-solid-base" id="fileUpload" onclick="$('#fileList').click()">
                                            <span class="k-icon k-i-track-changes-enable k-button-icon"></span>
                                            <span class="k-button-text">파일첨부</span>
                                        </button>
                                        <input type="file" id="fileList" name="fileList" onchange="fCommon.addFileInfoTable();" multiple style="display: none"/>
                                    </div>
                                </div>
                            </div>
                            <div class="table-responsive">
                                <table class="popTable table table-bordered mb-0">
                                    <colgroup>
                                        <col width="50%">
                                        <col width="10%">
                                        <col width="30%">
                                        <col width="10%">
                                    </colgroup>
                                    <thead>
                                    <tr class="text-center th-color">
                                        <th>파일명</th>
                                        <th>확장자</th>
                                        <th>용량</th>
                                        <th>기타</th>
                                    </tr>
                                    </thead>
                                    <tbody id="fileGrid">
                                    <tr class="defultTr">
                                        <td colspan="4" style="text-align: center">선택된 파일이 없습니다.</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </form>
                    </td>
                </tr>
                </tbody>
            </table>
            <div class="btn-st" style="text-align: right">
                <button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="rbr.listPageMove()">
                    <span class="k-button-text">목록</span>
                </button>
                <button type="button" id="saveBtn" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="rbr.setRequestBoard()">
                    <span class="k-button-text">등록</span>
                </button>
            </div>
        </div>
    </div>
</div> <%-- col-lg-12 --%>
<script>
    rbr.fnDefaultScript(JSON.parse('${params}'));
</script>
</body>
</html>