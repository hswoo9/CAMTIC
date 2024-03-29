<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />


<jsp:include page="/WEB-INF/jsp/camspot_m/inc/top.jsp" flush="false"/>

<script type="text/javascript" src="/js/loadingoverlay.min.js"/></script>

<script type="text/javascript" src="${hwpUrl}js/hwpctrlapp/utils/util.js"></script>
<script type="text/javascript" src="${hwpUrl}js/webhwpctrl.js"></script>
<script type="text/javascript" src="<c:url value='/js/hancom/hwp_DocCtrl.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/hancom/hwpCtrlApp.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/approval/approvalDocView.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/approval/approvalDocView.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js?${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/approval/approvalDocView.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/approval/hwpApprovalLine.js?v=${today}'/>"></script>

<!--Kendo ui js-->
<%--<script type="text/javascript" src="<c:url value='/js/kendoui/jquery.min.js'/>"></script>--%>
<script type="text/javascript" src="<c:url value='/js/kendoui/kendo.all.min.js'/>"></script>
<link rel="stylesheet" href="/css/kendoui/kendo.default-main.min.css"/>
<link rel="stylesheet" href="/css/kendoui/kendo.common.min.css"/>
<link rel="stylesheet" href="/css/kendoui/kendo.default.min.css"/>
<link rel="stylesheet" href="/css/style.css"/>
<script type="text/javascript" src="<c:url value='/js/kendoui/cultures/kendo.culture.ko-KR.min.js'/>"></script>

    <!-- payment {-->
    <div id="payment_page" class="sub">

    	<!-- content {-->
    	<div id="content">

            <!-- 버튼모음 {-->
            <div class="btWrap disF">
            	<a href="javascript:history.back()" class="back"><img src="/images/camspot_m/ico-back.png" /></a>
                <span class="pbtBox disF">
                    <c:if test="${mDocType == 'WAIT'}">
                        <a href="#" class="txt type26" onclick="approvalKendoSetting()">결재</a>
                        <a href="#" class="txt type26" onclick="returnKendoSetting()">반려</a>
                    </c:if>
                	<a href="#" class="txt type26" onclick="docApprovalOpinView()">의견보기</a>
                </span>
            </div>
            <!--} 버튼모음 -->

            <!-- 뷰 {-->
            <div class="PviewBox mt20">
            	<font class="txt type28"><b>문서정보</b></font>
                <div class="content_output mt10">
                	<a href="#" class="file"><img src="/images/camspot_m/ico-document.png" /><span id="viewDocTitle"></span></a>
                </div>

            	<font class="txt type28 mt40"><b>첨부파일</b></font>
                <div class="content_output mt10">
                    <div id="attachmentGrid" style="border-bottom: none;">

                    </div>
<%--                	<a href="#" class="file"><img src="/images/camspot_m/ico-file.png" />영수증1.jpg</a>--%>
<%--                	<a href="#" class="file"><img src="/images/camspot_m/ico-file.png" />영수증2.jpg</a>--%>

                </div>

                <div class="pop_sign_wrap">
                    <div id="approvalDocView" class="pop_wrap_dir" style="padding:0 20px">
                        <input type="hidden" id="docId" name="docId" value="">
                        <input type="hidden" id="menuCd" name="menuCd" value="">
                        <input type="hidden" id="approveRouteId" name="approveRouteId" value="">
                        <input type="hidden" id="subApproval" name="subApproval" value="">

                        <div style="display:flex; justify-content: space-between; margin:10px 10px 10px;">
                            <font class="txt type28 mt40"><b>본문</b></font>
                        </div>

                        <div id="hwpApproveContent" style="height: 100%;border: 1px solid lightgray;"></div>

                        <%--결재 모달 --%>
                        <div id="approveModal" class="pop_wrap_dir">
                            <input type="hidden" id="approveCode" name="approveCode">
                            <input type="hidden" id="approveCodeNm" name="approveCodeNm">
                            <input type="hidden" id="docNo" name="docNo" />
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
                                <button type='button' class='k-button k-button-md k-button-solid k-button-solid-base' onclick="docApprove()">
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
                                <button type='button' class='k-button k-button-md k-button-solid k-button-solid-base' onclick="docReturn()">
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
                    </div>
                </div>

            </div>
            <!--} 뷰 -->



    	</div>
    	<!--} content -->

    </div>
    <!--} payment -->

<script type="text/javascript">
	$('.m2', $('#menu')).addClass('active');
    var socket =  new WebSocket("ws://${pageContext.request.serverName}:${pageContext.request.serverPort}${pageContext.request.contextPath}/websocket.do");

    const serverName = '${pageContext.request.serverName}';

    var approveFlag = true
    $(document).ready(function() {

        $("#approveModal").kendoWindow({
            title: "결재의견",
            visible: false,
            modal: true,
            width : 500,
            position : {
                top : 50,
                left : 50
            },
            close: function () {
                $("#approveModal").load(location.href + ' #approveModal');
            }
        });

        $("#returnModal").kendoWindow({
            title: "반려의견",
            visible: false,
            modal: true,
            width : 500,
            position : {
                top : 50,
                left : 50
            },
            close: function () {
                $("#returnModal").load(location.href + ' #returnModal');
            }
        });

        $("#opinViewModal").kendoWindow({
            title: "의견보기",
            visible: false,
            modal: true,
            width : 500,
            position : {
                top : 50
            },
            close: function () {
                $("#opinViewModal").load(location.href + ' #opinViewModal');
            }
        });

        var parameters = JSON.parse('${params}');
        docView.global.params = parameters;

        $("#menuCd").val(parameters.menuCd);
        $("#docId").val(parameters.docId);
        var hwpCtrl = BuildWebHwpCtrl("hwpApproveContent", parameters.hwpUrl, function () {editorComplete();});

        var rs = customKendo.fn_customAjax("/approval/getDocViewRs", parameters).data;
        docView.global.rs = rs;

        $("#viewDocTitle").text(rs.docInfo.DOC_TITLE);
        docView.global.loginVO = JSON.parse('${mLoginVO}');


        docView.global.searchAjaxData = {
            docId : docView.global.rs.docInfo.DOC_ID,
            approKey : docView.global.rs.docInfo.APPRO_KEY,
        }

        if(docView.global.rs.docInfo.DOC_MENU_CD == "bustrip"){
            docView.global.searchAjaxData.bustripSn = docView.global.rs.docInfo.APPRO_KEY.split("_")[docView.global.rs.docInfo.APPRO_KEY.split("_").length - 1];
            docView.global.searchAjaxData.type = "bustrip";
        }

        if(docView.global.rs.docInfo.DOC_MENU_CD == "bustripRes"){
            docView.global.searchAjaxData.bustripResSn = docView.global.rs.docInfo.APPRO_KEY.split("_")[docView.global.rs.docInfo.APPRO_KEY.split("_").length - 1];
            docView.global.searchAjaxData.type = "bustripRes";
        }

        if(docView.global.rs.docInfo.DOC_MENU_CD == "claim"){
            docView.global.searchAjaxData.claimSn = docView.global.rs.docInfo.APPRO_KEY.split("_")[docView.global.rs.docInfo.APPRO_KEY.split("_").length - 1];
            docView.global.searchAjaxData.type = "claim";
        }

        if(docView.global.rs.docInfo.DOC_MENU_CD == "payApp"){
            docView.global.searchAjaxData.payAppSn = docView.global.rs.docInfo.APPRO_KEY.split("_")[docView.global.rs.docInfo.APPRO_KEY.split("_").length - 1];
            docView.global.searchAjaxData.type = "payApp";
        }

        if(docView.global.rs.docInfo.DOC_MENU_CD == "payIncp"){
            docView.global.searchAjaxData.payIncpSn = docView.global.rs.docInfo.APPRO_KEY.split("_")[docView.global.rs.docInfo.APPRO_KEY.split("_").length - 1];
            docView.global.searchAjaxData.type = "payIncp";
        }

        if(docView.global.rs.docInfo.DOC_MENU_CD == "exnp"){
            docView.global.searchAjaxData.exnpSn = docView.global.rs.docInfo.APPRO_KEY.split("_")[docView.global.rs.docInfo.APPRO_KEY.split("_").length - 1];
            docView.global.searchAjaxData.type = "exnp";
        }

        if(docView.global.rs.docInfo.DOC_MENU_CD == "campus"){
            docView.global.searchAjaxData.eduInfoId = docView.global.rs.docInfo.APPRO_KEY.split("_")[docView.global.rs.docInfo.APPRO_KEY.split("_").length - 1];
            docView.global.searchAjaxData.type = "campus";
            if(docView.global.rs.docInfo.APPRO_KEY.split("_")[docView.global.rs.docInfo.APPRO_KEY.split("_").length - 2] == "camticEducation"){
                docView.global.searchAjaxData.linkType = "camticEducation";
            }else if(docView.global.rs.docInfo.APPRO_KEY.split("_")[docView.global.rs.docInfo.APPRO_KEY.split("_").length - 2] == "camticEducationRes"){
                docView.global.searchAjaxData.linkType = "camticEducationRes";
            }
        }

        var attachmentGrid = $("#attachmentGrid").kendoGrid({
            dataSource : customKendo.fn_gridDataSource2("/approval/getDocAttachmentList", docView.global.searchAjaxData),
            sortable: true,
            scrollable: true,
            noRecords: {
                template: "첨부파일이 존재하지 않습니다."
            },
            dataBound : docView.onDataBound,
            columns: [
                {
                    field : "filename",
                    title: "첨부파일명",
                    attributes: { style: "text-align: left;"},
                    template : function(e){
                        return '<span style="cursor: pointer" onClick="docView.docAttachmentDown(\'single\',\'' + e.FILE_DOWN_PATH + e.fileUUID+ '\', \'' + e.filename + '\')">' +
                            fileImgTag(e.FILE_EXT) +
                            "<span style='margin-left: 5px;cursor: pointer'>" +
                            e.filename + "(" + formatBytes(e.FILE_SIZE, 3) + ")" +
                            "</span>" +
                            "</span>";
                    }
                }, {
                    template : function(e){
                        if(e.FILE_EXT == "pdf" || e.FILE_EXT == "png" || e.FILE_EXT == "PNG" || e.FILE_EXT == "jpg" || e.FILE_EXT == "JPG" || e.FILE_EXT == "JPEG" || e.FILE_EXT == "gif"){
                            return '<button type="button" class="k-button k-rounded k-button-solid k-button-solid-base" onClick="docView.fileViewer(\'' + e.FILE_DOWN_PATH + e.fileUUID + '\', \'' + e.filename + '\')">' +
                                '<span class="k-button-text">보기</span>' +
                                '</button>'
                        }else{
                            return '';
                        }
                    },
                    width : 60
                }]
        }).data("kendoGrid");

        function editorComplete() {
            hwpDocCtrl.defaultScript(
                hwpCtrl,
                "HWPML2X",
                rs.templateFile,
                "",
                "",
                "",
                "",
                parameters.mod
            );
        }


        $("#hwpApproveContent").find("iframe").css("height", "1000px");

        /** 열람 시간 업데이트 (결재자) */
        if(docView.global.rs.approveRoute.filter(element => element.APPROVE_EMP_SEQ == docView.global.loginVO.uniqId && element.APPROVE_ORDER != 0).length > 0){
            docView.setDocApproveRouteReadDt()
        }

        /** 열람 시간 업데이트 (열람자 체크 후 열람 시간 저장) */
        docView.setDocReaderReadUser()

        if(docView.global.rs.approveNowRoute != null){
            $("#approveRouteId").val(docView.global.rs.approveNowRoute.APPROVE_ROUTE_ID);
            $("#subApproval").val(docView.global.rs.approveNowRoute.SUB_APPROVAL);

            /** 결재모달 hidden 값 */
            $("#approveOrder").val(docView.global.rs.approveNowRoute.APPROVE_ORDER);
            $("#approveEmpSeq").val(docView.global.loginVO.uniqId);
            $("#approveEmpName").val(docView.global.loginVO.name);

            /** 반려모달 hidden 값 */
            $("#returnEmpSeq").val(docView.global.loginVO.uniqId);
            $("#returnEmpName").val(docView.global.loginVO.name);
        }
    });

    function returnKendoSetting(){
        approveFlag = true;

        $("#returnEmpName").kendoTextBox({
            readonly : true
        });
        $("#returnOpin").kendoTextArea({
            rows:5,
            cols:10,
            resizable: "vertical"
        });

        docView.global.searchAjaxData = {
            lastApproveEmpSeq : docView.global.rs.docInfo.LAST_APPROVE_EMP_SEQ,
            nowApproveEmpSeq : docView.global.rs.approveNowRoute.APPROVE_EMP_SEQ,
            nowApproveType : docView.global.rs.approveNowRoute.APPROVE_TYPE,
            absentEmpSeq : docView.global.rs.approveNowRoute.ABSENT_EMP_SEQ,
            subApproval : docView.global.rs.approveNowRoute.SUB_APPROVAL,
            loginEmpSeq : docView.global.loginVO.uniqId,
            cmCodeNm : "return",
        }

        var result = customKendo.fn_customAjax("/approval/getCmCodeInfo", docView.global.searchAjaxData);

        if(result.flag) {
            $("#returnEmpSeq").val(docView.global.loginVO.uniqId);
            $("#returnEmpName").val(docView.global.loginVO.name);
            $("#returnCode").val(result.rs.CM_CODE);
            $("#returnCodeNm").val(result.rs.CM_CODE_NM);

            $("#returnEmpName").css("font-size", "12px");
        }else{
            alert("결재자 정보 조회 중 에러가 발생했습니다.");
        }

        if(!docView.global.approveFlag){
            return false;
        }else{
            $('#returnModal').data('kendoWindow').open();
        }
    }

    function docReturn(){

        if($("#returnOpin").val() == ""){
            alert("반려의견을 입력해주세요."); return;
        }

        if(docView.global.loginVO == null){
            alert("세션이 만료되었습니다. 로그인 후 재시도 바랍니다."); return;
        }

        setTimeout(() => docReturnAjax(), 500);
    }

    function loading(){
        $.LoadingOverlay("show", {
            background: "rgba(0, 0, 0, 0.5)",
            image: "",
            maxSize: 60,
            fontawesome: "fa fa-spinner fa-pulse fa-fw",
            fontawesomeColor: "#FFFFFF",
        });
    }

    function documentHwpSave(){

        hwpDocCtrl.global.HwpCtrl.GetTextFile("HTML", "", function(data) {
            docView.global.htmlFileTextData = data;
        })

        hwpDocCtrl.global.HwpCtrl.GetTextFile("HWPML2X", "", function(data) {
            docView.global.hwpFileTextData = data;
            docApproveAjax();
        })
    }


    function docReturnAjax(){

        docView.global.searchAjaxData = makeApprovalFormData("return");

        var result = customKendo.fn_customFormDataAjax("/approval/setDocApproveNReturn", docView.global.searchAjaxData);

        if(result.flag) {
            alert("반려되었습니다.");

            var result = setAlarmEvent("return");
            if(result.flag){
                if(result.rs!= "SUCCESS") {
                    alert(result.message);
                }
            }

            location.href='/m/payment.do';

        }else{
            alert("반려 중 에러가 발생했습니다.");
        }
    }

    function makeApprovalFormData(type){
        var formData = new FormData();
        formData.append("type", type);
        formData.append("menuCd", $("#menuCd").val());
        formData.append("formId", docView.global.rs.docInfo.FORM_ID);
        formData.append("docId", docView.global.rs.docInfo.DOC_ID);
        formData.append("linkageProcessCode", docView.global.params.approKey.split("_")[0]);
        formData.append("approKey", docView.global.params.approKey);

        /** 한글 기안기 html 데이터 */
        docView.global.hwpFileTextData = docView.global.hwpFileTextData.replace(/UTF-16/g, "UTF-8");
        formData.append("docContent", docView.global.htmlFileTextData);

        if(type == "cancel"){
            formData.append("approveRouteId", docView.global.rs.approvePrevRoute.APPROVE_ROUTE_ID);
        }else{
            formData.append("approveRouteId", $("#approveRouteId").val());
        }
        formData.append("subApproval", $("#subApproval").val());
        if(type == "approve"){
            formData.append("approveOrder", $("#approveOrder").val());
            formData.append("approveStatCode", $("#approveCode").val());
            formData.append("approveStatCodeDesc", $("#approveCodeNm").val());
            formData.append("approveEmpName", $("#approveEmpName").val());
            formData.append("approveOpin", $("#approveOpin").val());
        }else if(type == "return"){
            formData.append("approveStatCode", $("#returnCode").val());
            formData.append("approveStatCodeDesc", $("#returnCodeNm").val());
            formData.append("approveEmpName", $("#returnEmpName").val());
            formData.append("approveOpin", $("#returnOpin").val());
        }

        if(type == "approve" || type == "return"){
            if($("#subApproval").val() == "Y"){
                formData.append("proxyApproveDeptSeq", docView.global.loginVO.orgnztId);
                formData.append("proxyApproveEmpSeq", docView.global.loginVO.uniqId);
            }else{
                formData.append("approveEmpSeq", docView.global.loginVO.uniqId);
            }
        }else if(type == "cancel"){
            formData.append("approveOrder", docView.global.rs.approvePrevRoute.APPROVE_ORDER);
            formData.append("approveEmpSeq", docView.global.loginVO.uniqId);
        }
        formData.append("atFileSn", docView.global.rs.docInfo.ATFILE_SN);

        /** 파일 STRING DATA */
        formData.append("docFileName", docView.global.rs.docInfo.DOC_TITLE);
        formData.append("empSeq", docView.global.loginVO.uniqId);

        formData.append("docHWPFileData", docView.global.hwpFileTextData);

        if(type == "approve"){
            /** 최종결재자가 보안여부 설정시 */
            // if(docView.global.rs.approveNowRoute.LAST_APPROVE_EMP_SEQ == docView.global.rs.approveNowRoute.APPROVE_EMP_SEQ
            //     && docView.global.rs.docInfo.APPROVE_STAT_CODE != "100" && docView.global.rs.docInfo.APPROVE_STAT_CODE != "101"){
            //     formData.append("securityTypeUpd", $("#securityType").getKendoRadioGroup().value());
            // }

            // /** 최종결재자가 열람자 설정시 */
            // if(docView.global.rs.approveNowRoute.LAST_APPROVE_EMP_SEQ == docView.global.rs.approveNowRoute.APPROVE_EMP_SEQ
            //     && docView.global.rs.docInfo.APPROVE_STAT_CODE != "100" && docView.global.rs.docInfo.APPROVE_STAT_CODE != "101"
            //     && docView.global.readersArr != null && docView.global.readersArr.length > 0) {
            //     formData.append("readersArrUpd", JSON.stringify(docView.global.readersArr));
            // }
        }

        return formData;
    }

    function setAlarmEvent (type){
        var ntTitle = "";
        var ntContent = "[" + docView.global.rs.docInfo.DOC_NO + "] " + docView.global.rs.docInfo.DOC_TITLE;
        var ntUrl = "/approval/approvalDocView.do?docId=" + docView.global.rs.docInfo.DOC_ID + "&mod=V&menuCd=" + docView.global.rs.docInfo.DOC_MENU_CD + "&approKey=" + docView.global.rs.docInfo.APPRO_KEY;
        if(type == "approve" && $("#approveCode").val() != '100' && $("#approveCode").val() != "101"){
            ntTitle = "[결재승인] 결재자 : " + docView.global.rs.approveNowRoute.APPROVE_EMP_NAME;
        }else if(type == "return"){
            ntTitle = "[결재반려] 결재자 : " + docView.global.rs.approveNowRoute.APPROVE_EMP_NAME;
        }else if(type == "cancel"){
            ntTitle = "[결재취소] 결재자 : " + docView.global.rs.approvePrevRoute.APPROVE_EMP_NAME;
        }

        var result = "";
        if($("#approveCode").val() != '100' && $("#approveCode").val() != "101"){
            result = customKendo.fn_customAjax("/common/setAlarm", {
                ntTitle : ntTitle,
                ntContent : ntContent,
                recEmpSeq : docView.global.rs.docInfo.DRAFT_EMP_SEQ,
                ntUrl : ntUrl
            });

            if(result.flag){
                socket.send(ntTitle + "," + docView.global.rs.docInfo.DRAFT_EMP_SEQ + "," + ntContent + "," + ntUrl + "," + result.alId);
            }
        }

        if(type == "approve"){
            var sendData = "";
            if($("#approveCode").val() != '100' && $("#approveCode").val() != "101"){
                /** 일반 결재 */
                sendData = {
                    ntTitle : "[결재도착] 기안자 : " + docView.global.rs.approveRoute.find(element => Number(element.APPROVE_ORDER) === 0).APPROVE_EMP_NAME,
                    ntContent : ntContent,
                    recEmpSeq : docView.global.rs.approveRoute.find(element => Number(element.APPROVE_ORDER) === (Number(docView.global.rs.approveNowRoute.APPROVE_ORDER) + 1)).APPROVE_EMP_SEQ,
                    ntUrl : ntUrl
                }

                result = customKendo.fn_customAjax("/common/setAlarm", sendData);
                if(result.flag){
                    socket.send(sendData.ntTitle + "," + sendData.recEmpSeq + "," + sendData.ntContent + "," + sendData.ntUrl + "," + result.alId);
                }
            }else if(($("#approveCode").val() == '100' || $("#approveCode").val() == "101")){
                /** 최종결재 결재 */
                for(var i = 0; i < docView.global.rs.approveRoute.length; i ++){
                    if(Number(docView.global.rs.approveRoute[i].APPROVE_ORDER) == 0){
                        sendData = {
                            ntTitle : "[결재종결] 결재자 : " + docView.global.rs.approveNowRoute.APPROVE_EMP_NAME,
                            ntContent : ntContent,
                            recEmpSeq : docView.global.rs.docInfo.DRAFT_EMP_SEQ,
                            ntUrl : ntUrl
                        }

                        result = customKendo.fn_customAjax("/common/setAlarm", sendData);
                        if(result.flag){
                            socket.send(sendData.ntTitle + "," + sendData.recEmpSeq + "," + sendData.ntContent + "," + sendData.ntUrl + "," + result.alId);
                        }
                    }else if(Number(docView.global.rs.approveRoute[i].APPROVE_ORDER) != Number(docView.global.rs.approveNowRoute.APPROVE_ORDER)){
                        sendData = {
                            ntTitle : "[결재종결] 기안자 : " + docView.global.rs.approveRoute.find(element => Number(element.APPROVE_ORDER) === 0).APPROVE_EMP_NAME,
                            ntContent : ntContent,
                            recEmpSeq : docView.global.rs.approveRoute[i].APPROVE_EMP_SEQ,
                            ntUrl : ntUrl
                        }

                        result = customKendo.fn_customAjax("/common/setAlarm", sendData);
                        if(result.flag){
                            socket.send(sendData.ntTitle + "," + sendData.recEmpSeq + "," + sendData.ntContent + "," + sendData.ntUrl + "," + result.alId);
                        }
                    }
                }

                if(docView.global.rs.readerAll != null){
                    for(var i = 0 ; i < docView.global.rs.readerAll.length ; i++){
                        sendData = {
                            ntTitle : "[결재열람] 기안자 : " + docView.global.rs.approveRoute.find(element => Number(element.APPROVE_ORDER) === 0).APPROVE_EMP_NAME,
                            ntContent : ntContent,
                            recEmpSeq : docView.global.rs.readerAll[i].READER_EMP_SEQ,
                            ntUrl : ntUrl
                        }

                        result = customKendo.fn_customAjax("/common/setAlarm", sendData);
                        if(result.flag){
                            socket.send(sendData.ntTitle + "," + sendData.recEmpSeq + "," + sendData.ntContent + "," + sendData.ntUrl + "," + result.alId);
                        }
                    }
                }
            }
        }

        return result;
    }

    function approvalKendoSetting(){
        docView.global.approveFlag = true;

        $("#approveEmpName").kendoTextBox({
            readonly : true
        });
        $("#approveOpin").kendoTextArea({
            rows:5,
            cols:10,
            resizable: "vertical"
        });

        docView.global.searchAjaxData = {
            lastApproveEmpSeq : docView.global.rs.docInfo.LAST_APPROVE_EMP_SEQ,
            nowApproveEmpSeq : docView.global.rs.approveNowRoute.APPROVE_EMP_SEQ,
            nowApproveType : docView.global.rs.approveNowRoute.APPROVE_TYPE,
            absentEmpSeq : docView.global.rs.approveNowRoute.ABSENT_EMP_SEQ,
            subApproval : docView.global.rs.approveNowRoute.SUB_APPROVAL,
            loginEmpSeq : docView.global.loginVO.uniqId,
        }

        var result = customKendo.fn_customAjax("/approval/getCmCodeInfo", docView.global.searchAjaxData);

        if(result.flag) {
            $("#approveOrder").val(docView.global.rs.approveNowRoute.APPROVE_ORDER);
            $("#approveEmpSeq").val(docView.global.loginVO.uniqId);
            $("#approveEmpName").val(docView.global.loginVO.name);
            $("#approveCode").val(result.rs.CM_CODE);
            $("#approveCodeNm").val(result.rs.CM_CODE_NM);
        }else{
            alert("결재자 정보 조회 중 에러가 발생했습니다.");
        }

        if(!docView.global.approveFlag){
            return false;
        }else{
            $('#approveModal').data('kendoWindow').open();

            $("#approveEmpName").css("font-size", "12px");
        }
    }

    function docApprove(){
        if(docView.global.loginVO == null){
            alert("장시간 미사용으로 로그인 세션이 만료되었습니다. 로그인 후 재시도 바랍니다."); return;
        }

        loading();


        /** 문서번호
         *  최종결재 할때 추가
         * */
        let list = docView.global.rs.approveRoute;
        if(list[list.length - 1].APPROVE_EMP_SEQ == docView.global.loginVO.uniqId){
            const draftDeptSeq = docView.global.rs.approveRoute[0].APPROVE_DEPT_SEQ;
            const searchAjaxData = {
                type : "approve",
                docId : $("#docId").val(),
                deptSeq : draftDeptSeq,
                docType : "A"
            }

            var result = customKendo.fn_customAjax("/approval/getDeptDocNum", searchAjaxData);
            if(result.flag){
                $("#docNo").val(result.rs.docNo);

                hwpDocCtrl.putFieldText("DOC_NUM", result.rs.docNo);
            }



            if(!result.flag || result.rs.docNo == null){
                alert("문서번호 생성 중 오류가 발생하였습니다. 새로고침 후 재시도 바랍니다."); return;
            }
        }

        documentHwpDataCtrl()
    }

    function documentHwpDataCtrl(){
        if(docView.global.rs.docInfo.FORM_ID != "1"){
            hwpApprovalLine.global.connectType = "mobile";

            /** 결재 사인 */
            if(docView.global.rs.approveNowRoute.APPROVE_TYPE != 1){
                hwpApprovalLine.setHwpApprovalSignPut();

            /** 협조 사인 */
            }else{
                const approveRoute = docView.global.rs.approveRoute;
                const cRoute = approveRoute.filter(tempArr => tempArr.APPROVE_TYPE == 1);

                if(cRoute.length == 1){
                    for(var i = 0; i < 2; i ++){
                        const signField = "cAppr" + i;
                        if(hwpDocCtrl.fieldExist(signField)){
                            if(hwpDocCtrl.getFieldText(signField) == "" || hwpDocCtrl.getFieldText(signField) == " "){
                                hwpApprovalLine.setSign(signField, docView.global.rs.approveNowRoute.APPROVE_EMP_SEQ, docView.global.rs.approveNowRoute.APPROVE_EMP_NAME, "view");
                                break;
                            }
                        }
                    }
                }else if(cRoute.length == 2){
                    for(var i = 0; i < cRoute.length; i ++){
                        const cRouteMap = cRoute[i];
                        if(cRouteMap.APPROVE_EMP_SEQ == docView.global.rs.approveNowRoute.APPROVE_EMP_SEQ){
                            const signField = "cAppr" + i;
                            hwpApprovalLine.setSign(signField, docView.global.rs.approveNowRoute.APPROVE_EMP_SEQ, docView.global.rs.approveNowRoute.APPROVE_EMP_NAME, "view");
                            break;
                        }
                    }
                }
            }
        }else{
            documentHwpSave()
        }
    }

    function docApproveAjax(){
        docView.global.searchAjaxData = makeApprovalFormData("approve");

        var result = customKendo.fn_customFormDataAjax("/approval/setDocApproveNReturn", docView.global.searchAjaxData);

        if(result.flag) {
            alert("결재되었습니다.");

            var result = setAlarmEvent("approve")
            if(result.flag){
                if(result.rs!= "SUCCESS") {
                    alert(result.message);

                }
            }

            let ip = "http://new.camtic.or.kr";
            if(serverName == "218.158.231.184" || serverName == "new.camtic.or.kr"){
                ip = "http://new.camtic.or.kr";
            }else{
                ip = "http://218.158.231.186";
            }
            location.href=ip+'/m/payment.do';

        }else{
            alert("결재 중 에러가 발생했습니다.");
        }
    }

    function docApprovalOpinView(){
        docView.global.searchAjaxData = {
            docId : docView.global.rs.docInfo.DOC_ID
        }

        $("#opinViewModalGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2("/approval/getDocApproveHistOpinList", docView.global.searchAjaxData, 100),
            height: 315,
            toolbar : [
                {
                    name : 'excel',
                    text: '엑셀다운로드'
                }
            ],
            excel : {
                fileName : "결재의견 목록.xlsx",
                filterable : true
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    field : "APPROVE_STAT_CODE",
                    title: "구분",
                    template : function (e){
                        if(e.APPROVE_TYPE == "1"){
                            return "협조의견";
                        }else if(e.APPROVE_STAT_CODE == "20" || e.APPROVE_STAT_CODE == "30"){
                            return "결재의견";
                        }else if(e.APPROVE_STAT_CODE == "100"){
                            return "최종결재의견";
                        }else if(e.APPROVE_STAT_CODE == "101"){
                            if(e.APPROVE_EMP_SEQ == "32"){
                                return "최종결재의견";
                            }else{
                                return "최종결재(전결)의견";
                            }
                        } else {
                            return "상신의견";
                        }
                    },
                    width: "17%"
                }, {
                    field : "APPROVE_EMP_NAME",
                    title: "작성자",
                    template : function(e){
                        if(e.PROXY_TYPE == "Y"){
                            return "[대결] " + e.PROXY_APPROVE_EMP_NAME;
                        }else{
                            return e.APPROVE_EMP_NAME
                        }
                    },
                    width: "10%"
                },{
                    field : "APPROVE_OPIN",
                    title: "의견",
                    template : function(e){
                        if(e.APPROVE_STAT_CODE == 10){
                            return "-";
                        }else{
                            return "<div style='text-align: left'>"+e.APPROVE_OPIN.replaceAll("\n", "<br/>")+"</div>";
                        }
                    }
                },{
                    field : "APPROVE_DT",
                    title: "작성일",
                    width: "15%"
                },{
                    field : "PROXY_TYPE",
                    title: "비고",
                    template : function(e){
                        if(e.PROXY_TYPE == "Y"){
                            return "원결재 : [" + e.APPROVE_DUTY_NAME+ "] " + e.APPROVE_EMP_NAME;
                        }else{
                            return "";
                        }
                    },
                    width: "15%"
                }]
        }).data("kendoGrid");

        $("#opinViewModal").data("kendoWindow").open();
    }
</script>

<jsp:include page="/WEB-INF/jsp/camspot_m/inc/bottom.jsp" flush="false"/>
