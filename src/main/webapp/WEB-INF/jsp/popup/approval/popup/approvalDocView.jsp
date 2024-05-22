<%--
  Created by IntelliJ IDEA.
  User: deer
  Date: 2022-07-15
  Time: 오후 11:51
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<c:set var="now" value="<%= new java.util.Date() %>" />
<fmt:formatDate value="${now}" var="nowComSpace" pattern="yyyy. MM. dd" />
<fmt:formatDate value="${now}" var="nowCom" pattern="yyyy.MM.dd" />
<fmt:formatDate value="${now}" var="nowHyphen" pattern="yyyy-MM-dd" />
<fmt:formatDate value="${now}" var="nowSlash" pattern="yyyy/MM/dd" />
<jsp:useBean id="today" class="java.util.Date" />

<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<script type="text/javascript" src="${hwpUrl}js/hwpctrlapp/utils/util.js"></script>
<script type="text/javascript" src="${hwpUrl}js/webhwpctrl.js"></script>
<script type="text/javascript" src="<c:url value='/js/hancom/hwp_DocCtrl.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/hancom/hwpCtrlApp.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/approval/approvalDocView.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/approval/approvalLine.js?v=${now}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/approval/hwpApprovalLine.js?v=${now}'/>"></script>
<script type="text/javascript" src="/js/loadingoverlay.min.js"/></script>
<style>
    .pop_head{
        height: 40px;
        position: relative;
        background: #1385db;
    }
    .pop_head div h1 {
        font-size: 12px;
        color: #fff;
        line-height: 37px;
        padding-left: 16px;
    }
    #docControlBtnDiv{
        float: right;
        margin: 5px 5px 0 0;
    }
    .k-grid-norecords{
        justify-content: space-around;
        font-size: 12px;
        border-bottom: 1px solid #dee2e6;
        height: 26px !important
    }
    .k-grid .k-column-title{
        font-size: 12px;
    }
    .k-list-item.k-selected.k-hover, .k-list-item.k-selected:hover{
        color: black;
    }
    .k-listbox .k-list-scroller{
        border : none;
    }
    .table td, .table th{
        padding : 6px
    }

    #loadingDiv{
        position: fixed;
        top: 0; left: 0;
        width: 100%;
        height: 100%;
        background-color: white;
        z-index: 9999;
        opacity: 1;
        transition: 0.5s ease;
    }

    #loadingDiv #loadingSpinner{
        position: absolute;
        top: 50%;
        left: 42%;
        margin: -40px 0 0 -40px;
    }
    .d-flex{
        flex-direction: column;
        align-items: center;
    }
    .k-grid td {
        line-height: 1.42857143;
    }
</style>
</head>
<body>
    <div class="pop_head">
        <div style="position: absolute;">
            <h1>결재 문서</h1>
        </div>

        <div id="loadingDiv">
            <div id="loadingSpinner" class="d-flex justify-content-center">
                <div class="spinner-border" role="status" style="color: #007bff!important">

                </div>
                <span id="loadingText">

		        </span>
            </div>
        </div>

        <div id="docControlBtnDiv">
            <button type='button' class='k-button k-button-md k-button-solid k-button-solid-base' id="approvalBtn" onclick="docView.approvalKendoSetting();" style="display: none">
                <span class='k-icon k-i-track-changes-accept k-button-icon'></span>
                <span class='k-button-text' style="font-size: 13px">결재</span>
            </button>
            <button type='button' class='k-button k-button-md k-button-solid k-button-solid-base' id="approvalCancelBtn" onclick="docView.docApproveCancel();" style="display: none">
                <span class='k-icon k-i-track-changes-accept k-button-icon'></span>
                <span class='k-button-text' style="font-size: 13px">결재취소</span>
            </button>
            <button type='button' class='k-button k-button-md k-button-solid k-button-solid-base' id="returnBtn" onclick="docView.returnKendoSetting()" style="display: none">
                <span class='k-icon k-i-track-changes-reject k-button-icon'></span>
                <span class='k-button-text' style="font-size: 13px">반려</span>
            </button>
            <button type='button' class='k-button k-button-md k-button-solid k-button-solid-base' id="modBtn" onclick="docView.contentMod()" style="display: none">
                <span class='k-icon k-i-track-changes-enable k-button-icon'></span>
                <span class='k-button-text' style="font-size: 13px">수정</span>
            </button>
            <button type='button' class='k-button k-button-md k-button-solid k-button-solid-base' id="modBtn2" onclick="docView.contentMod2()" style="display: none">
                <span class='k-icon k-i-track-changes-enable k-button-icon'></span>
                <span class='k-button-text' style="font-size: 13px">수정</span>
            </button>
            <button type='button' class='k-button k-button-md k-button-solid k-button-solid-base' id="docApprovalOpinViewBtn" onclick="docView.docApprovalOpinView()" style="display: none">
                <span class='k-icon k-i-align-justify k-button-icon'></span>
                <span class='k-button-text' style="font-size: 13px">의견보기</span>
            </button>
            </button>
            <button type='button' class='k-button k-button-md k-button-solid k-button-solid-base' id="docApprovalOpinView2Btn" onclick="docView.docApprovalOpinView2()" style="display: none">
                <span class='k-icon k-i-align-justify k-button-icon'></span>
                <span class='k-button-text' style="font-size: 13px">반려사유보기</span>
            </button>
            <button type='button' class='k-button k-button-md k-button-solid k-button-solid-base' id="docApprovalRouteHistViewBtn" onclick="docView.docApprovalRouteHistView()" style="display: none">
                <span class='k-icon k-i-list-unordered k-button-icon'></span>
                <span class='k-button-text' style="font-size: 13px">결재이력</span>
            </button>
            <button type='button' class='k-button k-button-md k-button-solid k-button-solid-base' id="docReaderHistViewBtn" onclick="docView.docReaderHistView()">
                <span class='k-icon k-i-list-unordered k-button-icon'></span>
                <span class='k-button-text' style="font-size: 13px">열람자이력</span>
            </button>
            <button type='button' class='k-button k-button-md k-button-solid k-button-solid-base' id="otherTypePdfDown" onclick="docView.docApprovalFileDown('main', 'pdf', 'single')" style="display: none">
                <span class='k-icon k-i-file-pdf k-button-icon'></span>
                <span class='k-button-text' style="font-size: 13px">외부 시행문 저장</span>
            </button>
            <button type='button' class='k-button k-button-md k-button-solid k-button-solid-base' id="docApprovalPDFDownBtn" onclick="docView.docApprovalFileDown('main', 'pdf', 'single')">
                <span class='k-icon k-i-file-pdf k-button-icon'></span>
                <span class='k-button-text' style="font-size: 13px">PDF 저장</span>
            </button>
            <button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" id="closeBtn" onclick="window.close()">
                <span class="k-button-text" style="font-size: 13px">닫기</span>
            </button>
        </div>
        <div>
            <div style="padding:60px 20px 0px 20px">
                <div style="display:flex; justify-content: space-between; margin:0 10px 10px;">
                    <div class="spanft" style="font-weight: bold;">· 문서정보</div>
                    <div class="btn-st" style="margin:0; font-size: 12px">
                        참조문서 <b id="referencesCont"></b>개
                        <span style="vertical-align: text-bottom;">|</span>
                        첨부파일 <b id="fileCont"></b>개
                    </div>
                </div>

                <table class="table table-bordered">
                    <colgroup>
                        <col width="14%">
                        <col width="auto">
                        <col width="0">
                    </colgroup>
                    <tr>
                        <th class="th-color text-right">문서제목</th>
                        <td id="docTitle">

                        </td>
                    </tr>
                    <tr style="display : none">
                        <th class="th-color text-right">공개여부</th>
                        <td id="publicTypeKr">

                        </td>
                    </tr>
                    <tr class="text-right docPublicType" style="display: none">
                        <th class="th-color" id="docPublicPartText"></th>
                        <td id="docPublicTypeReason" class="text-left">

                        </td>
                    </tr>
                    <tr style="display : none">
                        <th class="th-color text-right">긴급여부</th>
                        <td id="urgentTypeKr">

                        </td>
                    </tr>
                    <tr>
                        <th class="th-color text-right">보안여부</th>
                        <td id="securityTypeKr">

                        </td>
                    </tr>
                    <tr style="display : none">
                        <th class="th-color text-right">문서구분</th>
                        <td id="docGbnKr">

                        </td>
                    </tr>
                    <tr style="display : none">
                        <th class="th-color text-right">기록물철</th>
                        <td id="aiTitle">

                        </td>
                    </tr>
                    <tr class=" text-right">
                        <th class="th-color">참조문서</th>
                        <td style="border-right: none">
                            <input type="hidden" id="referencesId" name="referencesId">
                            <div id="exSelectiveInput" class="k-input k-textbox k-input-solid k-input-md" style="height: auto">
                                <div id="referencesListView" style="width: 100%;height: auto;min-height: 27.14px;">

                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr id="receiverNameTr" style="display: none">
                        <th class="th-color text-right">수신자</th>
                        <td id="receiverNameTd">

                        </td>
                    </tr>
                    <tr>
                        <th class="th-color text-right">열람자</th>
                        <td id="readerNameTd">

                        </td>
                    </tr>
                    <tr>
                        <th class="th-color text-right">상신의견</th>
                        <td id="draftOpinTd">

                        </td>
                    </tr>
                </table>
                <div style="display:flex; justify-content: space-between; margin:0 10px 10px;">
                    <div class="spanft" style="font-weight: bold;">· 첨부파일</div>
                    <div class="btn-st" style="margin:0">
                        <button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="docView.docAttachmentDown('zip', 'approval')">
                            <span class="k-icon k-i-download k-button-icon"></span>
                        </button>
                    </div>
                </div>
                <div id="attachmentGrid" style="border-bottom: none;">

                </div>
            </div>

            <div class="pop_sign_wrap">
                <div id="approvalDocView" class="pop_wrap_dir" style="padding:0 20px">
                    <input type="hidden" id="docId" name="docId" value="">
                    <input type="hidden" id="menuCd" name="menuCd" value="">
                    <input type="hidden" id="approveRouteId" name="approveRouteId" value="">
                    <input type="hidden" id="subApproval" name="subApproval" value="">

                    <div style="display:flex; justify-content: space-between; margin:10px 10px 10px;">
                        <div class="spanft" style="font-weight: bold;">· 본문</div>
                    </div>

                    <div id="hwpApproveContent" style="height: 100%;border: 1px solid lightgray;"></div>

                    <%--결재 모달 --%>
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
                                    <input type="hidden" id="approveOrder" name="approveOrder" value="">
                                    <input type="hidden" id="approveEmpSeq" name="approveEmpSeq" value=""/>
                                    <input type="text" id="approveEmpName" name="approveEmpName" value=""/>
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
                            <button type='button' class='k-button k-button-md k-button-solid k-button-solid-base' onclick="docView.docApprove()">
                                <span class='k-icon k-i-check k-button-icon'></span>
                                <span class='k-button-text'>확인</span>
                            </button>
                            <button type='button' class='k-button k-button-md k-button-solid k-button-solid-base' onclick="$('#approveModal').data('kendoWindow').close();">
                                <span class='k-icon k-i-cancel k-button-icon'></span>
                                <span class='k-button-text'>취소</span>
                            </button>
                        </div>
                    </div>

                    <%--반려 모달 --%>
                    <div id="returnModal" class="pop_wrap_dir">
                        <input type="hidden" id="returnCode" name="returnCodeNm">
                        <input type="hidden" id="returnCodeNm" name="returnCodeNm">
                        <table class="table table-bordered mb-0">
                            <colgroup>
                                <col width="15%">
                                <col width="35%">
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th class="text-center th-color"><span class="red-star">*</span>반려자</th>
                                    <td>
                                        <input type="hidden" id="returnEmpSeq" name="returnEmpSeq" value=""/>
                                        <input type="text" id="returnEmpName" name="returnEmpName" value=""/>
                                    </td>
                                </tr>
                                <tr>
                                    <th class="text-center th-color"><span class="red-star">*</span>반려의견</th>
                                    <td>
                                        <textarea type="text" id="returnOpin" name="returnOpin"></textarea>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="mt-15" style="text-align: right">
                            <button type='button' class='k-button k-button-md k-button-solid k-button-solid-base' onclick="docView.docReturn()">
                                <span class='k-icon k-i-check k-button-icon'></span>
                                <span class='k-button-text'>확인</span>
                            </button>
                            <button type='button' class='k-button k-button-md k-button-solid k-button-solid-base' onclick="$('#returnModal').data('kendoWindow').close();">
                                <span class='k-icon k-i-cancel k-button-icon'></span>
                                <span class='k-button-text'>취소</span>
                            </button>
                        </div>
                    </div>

                    <%--의견보기 모달 --%>
                    <div id="opinViewModal" class="pop_wrap_dir">
                        <div id="opinViewModalGrid">

                        </div>
                        <div class="mt-15" style="text-align: right">
                            <button type='button' class='k-button k-button-md k-button-solid k-button-solid-base' onclick="$('#opinViewModal').data('kendoWindow').close();">
                                <span class='k-icon k-i-check k-button-icon'></span>
                                <span class='k-button-text'>확인</span>
                            </button>
                        </div>
                    </div>

                    <%--반려사유보기 모달 --%>
                    <div id="opinViewModal2" class="pop_wrap_dir">
                        <table class="table table-bordered">
                            <colgroup>
                                <col width="12%">
                                <col width="30%">
                                <col width="12%">
                                <col width="auto">
                            </colgroup>
                            <thead>
                            <tr>
                                <th style="background-color: #f0f7ff; text-align: center">이름</th>
                                <th style="background-color: #f0f7ff; text-align: center">부서/팀</th>
                                <th style="background-color: #f0f7ff; text-align: center">직위</th>
                                <th style="background-color: #f0f7ff; text-align: center">반려사유</th>
                            </tr>
                            <tr>
                                <td style="text-align: center" id="opinName"></td>
                                <td style="text-align: center" id="opinDept"></td>
                                <td style="text-align: center" id="opinSpot"></td>
                                <td style="text-align: left" id="opinReason"></td>
                            </tr>
                            </thead>
                        </table>
                        <div class="mt-15" style="text-align: right">
                            <button type='button' class='k-button k-button-md k-button-solid k-button-solid-base' onclick="$('#opinViewModal2').data('kendoWindow').close();">
                                <span class='k-icon k-i-check k-button-icon'></span>
                                <span class='k-button-text'>닫기</span>
                            </button>
                        </div>
                    </div>

                    <%--결재이력 모달 --%>
                    <div id="approveHistModal" class="pop_wrap_dir">
                        <div id="approveHistModalGrid">

                        </div>
                        <div class="mt-15" style="text-align: right">
                            <button type='button' class='k-button k-button-md k-button-solid k-button-solid-base' onclick="$('#approveHistModal').data('kendoWindow').close();">
                                <span class='k-icon k-i-check k-button-icon'></span>
                                <span class='k-button-text'>확인</span>
                            </button>
                        </div>
                    </div>

                    <%--열람자이력 모달 --%>
                    <div id="readerHistModal" class="pop_wrap_dir">
                        <div id="readerHistModalGrid">

                        </div>
                        <div class="mt-15" style="text-align: right">
                            <button type='button' class='k-button k-button-md k-button-solid k-button-solid-base' onclick="$('#readerHistModal').data('kendoWindow').close();">
                                <span class='k-icon k-i-check k-button-icon'></span>
                                <span class='k-button-text'>확인</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>

<script type="text/x-kendo-template" id="template">
    <span onclick="javascript:approveDocView('#:REFERENCES_DOC_ID#','#:REFERENCES_APPRO_KEY#');" class="k-button-text" style="cursor:pointer">#:REFERENCES_DOC_TITLE#</span>
</script>

<script>
    function approveDocView(docId, approKey, menuCd, deleteFlag){
        if(deleteFlag != null && deleteFlag == "Y"){
            alert("삭제된 문서는 열 수 없습니다.");
            return
        }

        var mod = "V";
        var pop = "" ;
        var url = '/approval/approvalDocView.do?docId='+docId+'&menuCd=' + menuCd + '&mod=' + mod + '&approKey='+approKey;
        url += '&vType=M';

        var width = "1000";
        var height = "950";
        windowX = Math.ceil( (window.screen.width  - width) / 2 );
        windowY = Math.ceil( (window.screen.height - height) / 2 );
        pop = window.open(url, "_blank", "width=" + width + ", height=" + height + ", top="+ windowY +", left="+ windowX +", resizable=NO, scrollbars=NO");
        //pop.focus();
    }

    var today = "${toDate}";
    const serverName = '${pageContext.request.serverName}';

    docView.global.dataType = {
        nowComSpace : "${nowComSpace}",
        nowCom : "${nowCom}",
        nowHyphen : "${nowHyphen}",
        nowSlash : "${nowSlash}"
    }

    docView.fnDefaultScript(JSON.parse('${params}'), JSON.parse('${loginVO}'));
</script>
</html>