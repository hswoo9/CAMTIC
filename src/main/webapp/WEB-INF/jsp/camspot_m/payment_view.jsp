<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />

    
<jsp:include page="/WEB-INF/jsp/camspot_m/inc/top.jsp" flush="false"/>


<script type="text/javascript" src="${hwpUrl}js/hwpctrlapp/utils/util.js"></script>
<script type="text/javascript" src="${hwpUrl}js/webhwpctrl.js"></script>
<script type="text/javascript" src="<c:url value='/js/hancom/hwp_DocCtrl.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/hancom/hwpCtrlApp.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/approval/approvalDocView.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/approval/approvalDocView.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js?${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/approval/approvalDocView.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/approval/hwpApprovalLine.js?v=${today}'/>"></script>
<script type="text/javascript" src="/js/loadingoverlay.min.js"/></script>

<!--Kendo ui js-->
<script type="text/javascript" src="<c:url value='/js/kendoui/jquery.min.js'/>"></script>
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
                	<a href="#" class="txt type26">결재</a>
                	<a href="#" class="txt type26" onclick="returnKendoSetting()">반려</a>
                	<a href="#" class="txt type26">의견보기</a>
                </span>
            </div>
            <!--} 버튼모음 -->
            
            <!-- 뷰 {-->
            <div class="PviewBox mt20">
            	<font class="txt type28"><b>문서정보</b></font>
                <div class="content_output mt10">
                	<a href="#" class="file"><img src="/images/camspot_m/ico-document.png" />[휴일근로신청서] 경영지원팀24-국민</a>
                </div>
                
            	<font class="txt type28 mt40"><b>첨부파일</b></font>
                <div class="content_output mt10">
                	<a href="#" class="file"><img src="/images/camspot_m/ico-file.png" />영수증1.jpg</a>
                	<a href="#" class="file"><img src="/images/camspot_m/ico-file.png" />영수증2.jpg</a>
                	
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
    var socket =  new WebSocket("ws://${pageContext.request.serverName}:${pageContext.request.serverPort}${pageContext.request.contextPath}/websocket.do");;

    var approveFlag = true
    $(document).ready(function() {
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

        var parameters = JSON.parse('${params}');
        docView.global.params = parameters;

        var hwpCtrl = BuildWebHwpCtrl("hwpApproveContent", parameters.hwpUrl, function () {editorComplete();});

        var rs = customKendo.fn_customAjax("/approval/getDocViewRs", parameters).data;
        docView.global.rs = rs;
        docView.global.loginVO = JSON.parse('${mLoginVO}');

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
        hwpDocCtrl.global.HwpCtrl.GetTextFile("HWPML2X", "", function(data) {
            docView.global.hwpFileTextData = data;
        })

        hwpDocCtrl.global.HwpCtrl.GetTextFile("HTML", "", function(data) {
            docView.global.htmlFileTextData = data;
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
            if(docView.global.rs.approveNowRoute.LAST_APPROVE_EMP_SEQ == docView.global.rs.approveNowRoute.APPROVE_EMP_SEQ
                && docView.global.rs.docInfo.APPROVE_STAT_CODE != "100" && docView.global.rs.docInfo.APPROVE_STAT_CODE != "101"){
                formData.append("securityTypeUpd", $("#securityType").getKendoRadioGroup().value());
            }

            /** 최종결재자가 열람자 설정시 */
            if(docView.global.rs.approveNowRoute.LAST_APPROVE_EMP_SEQ == docView.global.rs.approveNowRoute.APPROVE_EMP_SEQ
                && docView.global.rs.docInfo.APPROVE_STAT_CODE != "100" && docView.global.rs.docInfo.APPROVE_STAT_CODE != "101"
                && docView.global.readersArr != null && docView.global.readersArr.length > 0) {
                formData.append("readersArrUpd", JSON.stringify(docView.global.readersArr));
            }
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
</script>

<jsp:include page="/WEB-INF/jsp/camspot_m/inc/bottom.jsp" flush="false"/>
