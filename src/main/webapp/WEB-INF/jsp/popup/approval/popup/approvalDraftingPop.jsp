<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<jsp:useBean id="today" class="java.util.Date" />

<c:set var="now" value="<%= new java.util.Date() %>" />
<fmt:formatDate value="${now}" var="nowComSpace" pattern="yyyy. MM. dd" />
<fmt:formatDate value="${now}" var="nowCom" pattern="yyyy.MM.dd" />
<fmt:formatDate value="${now}" var="nowHyphen" pattern="yyyy-MM-dd" />
<fmt:formatDate value="${now}" var="nowSlash" pattern="yyyy/MM/dd" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="false"/>
<script type="text/javascript" src="${hwpUrl}js/hwpctrlapp/utils/util.js"></script>
<script type="text/javascript" src="${hwpUrl}js/webhwpctrl.js"></script>
<script type="text/javascript" src="<c:url value='/js/hancom/hwp_DocCtrl.js?v=${now}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/hancom/hwpInit.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/hancom/hwpCtrlApp.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/approval/approvalDrafting.js?v=${now}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/approval/approvalLine.js?v=${now}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/approval/hwpApprovalLine.js?v=${now}'/>"></script>

<script type="text/javascript" src="<c:url value='/js/hancom/process/hwpBustripInit.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/hancom/process/hwpCampusInit.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/hancom/process/hwpEngnInit.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/hancom/process/hwpHolidayInit.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/hancom/process/hwpMeetingInit.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/hancom/process/hwpPayInit.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/hancom/process/hwpPurcInit.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/hancom/process/hwpRndInit.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/hancom/process/hwpUnRndInit.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/hancom/process/hwpItemInit.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/hancom/process/hwpInsideInit.js?v=${today}'/>"></script>
<script type="text/javascript" src="/js/loadingoverlay.min.js"/></script>

<style>
    .pop_head {height: 32px; position: relative; background: #1385db;}
    .pop_head h1 {font-size: 12px; color: #fff; line-height: 32px; padding-left: 16px; margin: 0;}
    .th-color {background-color: #d2e2f3;}
    .k-list-item span.k-list-item-text {width: 100%;}
    .k-list-item.k-selected.k-hover, .k-list-item.k-selected:hover {color : black;}
    .k-list-item {padding: 2px 8px !important;}
    .k-column-resize-handle-wrapper, .k-row-resize-handle-wrapper, .k-element-resize-handle-wrapper {display: none !important; }
    div.k-list-scroller.k-selectable {border: none;}
    #approveDocContent {font-family: 'Arial_Unicode_MS_Font' !important;}
    .k-dropzone {width: 98px; margin-left: auto;}
    .k-action-buttons {display : none !important;}
    .k-radio-list-horizontal, .k-radio-list.k-list-horizontal {gap: 0;}
    #loadingDiv {position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: white; z-index: 9999; opacity: 1; transition: 0.5s ease;}
    #loadingDiv #loadingSpinner{position: absolute; top: 50%; left: 42%; margin: -40px 0 0 -40px;}
    .d-flex{flex-direction: column; align-items: center;}
    .table-bordered {border: 1px solid #dee2e6 !important;}
    .red-star {color: red; margin-right: 5px;}
    .k-upload-files {font-size: 12px; !important;}
    .reDraft {font-size: 13px}
    .table td, .table th{
        vertical-align: middle;
    }
</style>
<%
    pageContext.setAttribute("CR", "\r");
    pageContext.setAttribute("LF", "\n");
%>
<body>
    <div class="pop_head">
        <h1>문서 상신</h1>
        <a href="#n" class="clo"><img src="<c:url value='/images/btn/btn_pop_clo01.png'/>" alt=""></a>
    </div>

    <div id="loadingDiv">
        <div id="loadingSpinner" class="d-flex justify-content-center">
            <div class="spinner-border" role="status" style="color: #007bff!important">

            </div>
            <span id="loadingText">

            </span>
        </div>
    </div>

    <div style="padding: 20px;" id="test">
        <div id="paramDiv">
            <input type="hidden" id="menuCd" name="menuCd" value="">
            <input type="hidden" id="type" name="type" value="">
            <input type="hidden" id="formId" name="formId" value="">
            <input type="hidden" id="formName" name="formName" value="">
            <input type="hidden" id="docNo" name="docNo" value="">
            <input type="hidden" id="docId" name="docId" value="">
            <input type="hidden" id="docType" name="docType" value="">
            <input type="hidden" id="docOpt" name="docOpt" value="">
            <input type="hidden" id="atFileSn" name="atFileSn">
            <input type="hidden" id="compSeq" name="compSeq" value="">
            <input type="hidden" id="linkageType" name="linkageType" value="">
            <input type="hidden" id="processId" name="processId" value="">

            <input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}">
            <input type="hidden" id="empName" name="empName" value="${loginVO.name}">
            <input type="hidden" id="empPositionNm" name="empPositionNm" value="${loginVO.positionNm}">
            <input type="hidden" id="empDutyNm" name="empDutyNm" value="${loginVO.dutyNm}">
            <input type="hidden" id="deptSeq" name="deptSeq" value="${loginVO.orgnztId}">
            <input type="hidden" id="deptName" name="deptName" value="${loginVO.orgnztNm}">

            <input type="hidden" id="reqContentId" name="reqContentId">

            <input type="hidden" id="mySignCk" name="mySignCk" value="N">
        </div>
        <div class="mb-10" id="btnDiv" style="text-align: right;">
            <button type="button" name="temp" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base temp" onclick="draft.docTempInit(this)">
                <span class="k-button-text" style="font-size: 13px">임시저장</span>
            </button>

            <button id="apprBtn" type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="draft.approvalLinePop()">
                <span class="k-button-text" style="font-size: 13px">결재선 지정</span>
            </button>

            <button type="button" id="draftBtn" name="draft" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base draft" onclick="draft.draftInitValidation(this)">
                <span class="k-button-text" style="font-size: 13px">상신</span>
            </button>

            <button type="button" id="backBtn" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="draft.redirectPurcForm()" style="display: none">
                <span class="k-button-text" style="font-size: 13px">뒤로가기</span>
            </button>

            <button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="window.close()">
                <span class="k-button-text" style="font-size: 13px">닫기</span>
            </button>
        </div>

        <table class="table table-bordered mb-30">
            <colgroup>
                <col width="10%">
                <col width="auto">
                <col width="0">
            </colgroup>
            <tr class="text-right">
                <th class="th-color"><span class="red-star">*</span>문서제목</th>
                <td colspan="2">
                    <input type="text" id="docTitle" name="docTitle" value="">
                </td>
            </tr>
            <tr class="text-right" style="display : none">
                <th class="th-color">공개여부</th>
                <td colspan="2">
                    <span id="publicType"></span>
                </td>
            </tr>
            <tr class="text-right" style="display : none">
                <th class="th-color">긴급여부</th>
                <td colspan="2">
                    <span id="urgentType"></span>
                </td>
            </tr>
            <tr class="text-right">
                <th class="th-color">보안여부</th>
                <td colspan="2">
                    <span id="securityType"></span>
                </td>
            </tr>
            <tr class="text-right">
                <th class="th-color">문서구분</th>
                <td colspan="2">
                    <span id="docGbn"></span>
                </td>
            </tr>
            <tr class="text-right" style="display : none">
                <th class="th-color"><span class="red-star">*</span>기록물철</th>
                <td style="border-right: none">
                    <input type="hidden" id="aiKeyCode" name="aiKeyCode">
                    <input type="text" id="aiTitle" name="aiTitle" class="k-input k-textbox k-input-solid k-input-md" onclick="draft.archiveSelectPop()" readonly>
                </td>
                <td style="border-left: none">
                    <button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="draft.archiveSelectPop()" style="vertical-align: middle;">
                        <span class="k-button-text">선택</span>
                    </button>
                </td>
            </tr>
            <tr id="nowApprTr" style="display: none">
                <th class="th-color" style="text-align: right">결재선</th>
                <td colspan="2">
                    <span id="nowApprSpan" style="text-align: left"></span>
                </td>
            </tr>
            <tr class="text-right">
                <th class="th-color">참조문서</th>
                <td style="border-right: none">
                    <input type="hidden" id="referencesId" name="referencesId">
                    <div id="exSelectiveInput" class="k-input k-textbox k-input-solid k-input-md" style="height: auto">
                        <div id="referencesListView" style="width: 100%;height: auto;min-height: 25.14px;">

                        </div>
                    </div>
                </td>
                <td style="border-left: none">
                    <button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="draft.referencesSelectPop()" style="vertical-align: middle;">
                        <span class="k-button-text">선택</span>
                    </button>
                </td>
            </tr>
            <tr id="receiverTr" style="display: none;">
                <th class="text-right th-color">수신자
                </th>
                <td style="border-right: none" colspan="2">
                    <input type="text" id="receiverName" name="receiverName" class="k-input k-textbox k-input-solid k-input-md">
                </td>
            </tr>
            <tr class="text-right" id="readerTr">
                <th class="th-color">열람자</th>
                <td style="border-right: none">
                    <input type="text" id="readerName" name="readerName" class="k-input k-textbox k-input-solid k-input-md" onclick="draft.readerSelectPopup()" readonly>
                </td>
                <td style="border-left: none">
                    <button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="draft.readerSelectPopup()" style="vertical-align: middle;">
                        <span class="k-button-text">선택</span>
                    </button>
                </td>
            </tr>
            <tr>
                <th class="text-center th-color">상신의견</th>
                <td colspan="2">
                    <textarea type="text" id="draftOpin" name="draftOpin"></textarea>
                </td>
            </tr>
        </table>
        <div style="padding:20px 0;">
            <h3 class="card-title">첨부파일</h3>
            <div style="max-width: 100% !important;">
                <div style="width:100%;" >
                    <input name="files" id="files" type="file" aria-label="files" />
                </div>
            </div>
        </div>
        <div id="hwpApproveContent" style="height: 100%;border: 1px solid lightgray;"></div>
    </div>

    <%--결재 모달 (자기전결)--%>
    <div id="approveModal" class="pop_wrap_dir">
        <input type="hidden" id="approveCode" name="approveCode">
        <input type="hidden" id="approveCodeNm" name="approveCodeNm">
        <table class="table table-bordered mb-0">
            <colgroup>
                <col width="15%">
                <col width="35%">
            </colgroup>
            <tbody>
            <tr>
                <th class="text-center th-color"><span class="red-star">*</span>결재자</th>
                <td>
                    <input type="hidden" id="approveRouteId" name="approveRouteId" value="">
                    <input type="hidden" id="approveOrder" name="approveOrder" value="0">
                    <input type="hidden" id="approveEmpSeq" name="approveEmpSeq" value="${loginVO.uniqId}"/>
                    <input type="text" id="approveEmpName" name="approveEmpName" value="${loginVO.name}"/>
                </td>

            </tr>
            <tr>
                <th class="text-center th-color">결재의견</th>
                <td>
                    <textarea type="text" id="approveOpin" name="approveOpin"></textarea>
                </td>
            </tr>
            </tbody>
        </table>
        <div class="mt-15" style="text-align: right">
            <button type='button' class='k-button k-button-md k-button-solid k-button-solid-base' onclick="draft.docApprove()">
                <span class='k-icon k-i-check k-button-icon'></span>
                <span class='k-button-text'>확인</span>
            </button>
            <button type='button' class='k-button k-button-md k-button-solid k-button-solid-base' onclick="$('#approveModal').data('kendoWindow').close();">
                <span class='k-icon k-i-cancel k-button-icon'></span>
                <span class='k-button-text'>취소</span>
            </button>
        </div>
    </div>


<script type="text/x-kendo-template" id="template">
    <span class="k-button-text">#:REFERENCES_DOC_TITLE#</span>
    <span class="k-icon k-i-x k-button-icon" onclick="draft.referencesCancel(this)" style="float: right;cursor: pointer"></span>
</script>

<script>
    var editorContent = '${fn:trim(fn:replace(fn:replace(docContents, LF, ""), CR, ""))}';
    const serverName = '${pageContext.request.serverName}';

    draft.global.dataType = {
        nowComSpace : "${nowComSpace}",
        nowCom : "${nowCom}",
        nowHyphen : "${nowHyphen}",
        nowSlash : "${nowSlash}"
    }

    draft.fnDefaultScript(JSON.parse('${params}'));
</script>
</body>
</html>