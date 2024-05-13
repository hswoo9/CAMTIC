/**
 * 2022.06.28 by. deer
 * 전자결재 관련 팝업 - 결재문서 상세보기
 *
 * function / global variable / local variable setting
 */
var docView = {
    global : {
        dataType : new Array(),
        params  : "",
        rs      : "",
        loginVO : "",
        mod : "",

        hwpCtrl        : "",
        docContent     : "",
        approveFlag    : true,
        isExistsAbsent : false,
        hwpFileTextData : "",
        htmlFileTextData : "",
        searchAjaxData : "",
    },

    fnDefaultScript : function(params, loginVO){
        document.querySelector('body').style.overflow = 'hidden';
        $("#loadingText").text("문서를 불러오는 중입니다.");

        var rs = customKendo.fn_customAjax("/approval/getDocViewRs", params).data;

        docView.global.params = params;
        docView.global.rs = rs;
        docView.global.loginVO = loginVO;
        docView.global.mod = params.mod;

        if(rs.docInfo.SECURITY_TYPE == "009"){
            docView.readPermissionChk(loginVO, params);
        }

        if(docView.global.loginVO == null){
            alert("장시간 미사용으로 로그인 세션이 만료되었습니다. 로그아웃 후 재시도 바랍니다.");
            return;
        }

        /** 반려시 반려사유 확인 버튼 생성 */
        if(rs.docInfo.APPROVE_STAT_CODE == "30" || rs.docInfo.APPROVE_STAT_CODE == "40" || rs.docInfo.APPROVE_STAT_CODE == "111"){
            if(rs.docInfo.APPROVE_STAT_CODE == "30"){
                $("#docApprovalOpinView2Btn").show();
            }

            const menuCd = docView.global.params.menuCd;
            /** 기안자 일 시 수정 버튼 생성 (외부시스템) */
            if((docView.global.rs.approveRoute[0].DRAFT_EMP_SEQ == docView.global.loginVO.uniqId)
                && (menuCd == "bustrip" || menuCd == "bustripRes" || menuCd == "subHoliday" || menuCd == "holidayWork" || menuCd == "purc" || menuCd == "claim" || menuCd == "campus" || menuCd == "invenDeadLine" ||
                    menuCd == "payApp" || menuCd == "payIncp" || menuCd == "exnp" || menuCd == "study" || menuCd == "propag" || menuCd == "ojt" || menuCd == "studyRes" || menuCd == "ojtRes" || menuCd == "propagRes" || menuCd == "workPlan" ||
                    menuCd == "rndDelv" || menuCd == "rndDev" || menuCd == "rndRes" || menuCd == "unRndDelv" || menuCd == "unRndDev" || menuCd == "unRndRes" || menuCd == "delv" || menuCd == "dev" || menuCd == "pjtRes" ||
                    menuCd == "pjtCost" || menuCd == "pjtRate" || menuCd == "equipment" || menuCd == "invention" || menuCd == "rprRes" || menuCd == "car" || menuCd == "certifi"))
            {
                $("#modBtn").show();
            } else {
                $("#modBtn").hide();
            }
            
            /** 기안자 일 시 수정 버튼 생성 (기안문) */
            if((docView.global.rs.docInfo.FORM_ID == "1" || docView.global.rs.docInfo.FORM_ID == "86" || docView.global.rs.docInfo.FORM_ID == "89" || docView.global.rs.docInfo.FORM_ID == "90" ||
                    docView.global.rs.docInfo.FORM_ID == "91" || docView.global.rs.docInfo.FORM_ID == "92" || docView.global.rs.docInfo.FORM_ID == "93" || docView.global.rs.docInfo.FORM_ID == "104" ||
                    docView.global.rs.docInfo.FORM_ID == "111" || docView.global.rs.docInfo.FORM_ID == "112" || docView.global.rs.docInfo.FORM_ID == "106" || docView.global.rs.docInfo.FORM_ID == "107" ||
                    docView.global.rs.docInfo.FORM_ID == "108" || docView.global.rs.docInfo.FORM_ID == "95" || docView.global.rs.docInfo.FORM_ID == "99" || docView.global.rs.docInfo.FORM_ID == "100" ||
                    docView.global.rs.docInfo.FORM_ID == "101" || docView.global.rs.docInfo.FORM_ID == "102" || docView.global.rs.docInfo.FORM_ID == "139" || docView.global.rs.docInfo.FORM_ID == "156"
                )
                && docView.global.rs.approveRoute[0].DRAFT_EMP_SEQ == docView.global.loginVO.uniqId){
                $("#modBtn2").show();
            }
        }


        $(document).ready(function() {
            docView.global.hwpCtrl = BuildWebHwpCtrl("hwpApproveContent", docView.global.params.hwpUrl, function () {docView.editorComplete();});
            window.onresize();
        });

        window.onresize = function () {docView.resize()};

        docView.setKendo();

        docView.initBtn();

        /** 전자결재 공용 */

        setTimeout(function() {
            docView.initData();
        }, 1500);

        /** 반려시 반려사유 확인 버튼 생성 */
        if(rs.docInfo.APPROVE_STAT_CODE == "30"){
            $("#approvalCancelBtn").hide();
        }
    },

    readPermissionChk : function(loginVO, params){
        docView.global.searchAjaxData = {
            empSeq : loginVO.uniqId,
            deptSeq : loginVO.orgnztId,
            compSeq : "1212",
            groupSeq : "camtic_new",
            docId : params.docId
        }

        var result = customKendo.fn_customAjax("/approval/getDocSecurityIndexOfUserChk.do", docView.global.searchAjaxData);
        if(!result.confirm && (docView.global.rs.approveNowRoute != null && docView.global.rs.approveNowRoute.SUB_APPROVAL != 'Y') && docView.global.params.vType != 'M' && loginVO.uniqId != "1"){
            alert("열람 권한이 없습니다.");
            window.close();
            return;
        }
    },

    editorComplete : function() {
        hwpDocCtrl.defaultScript(
            docView.global.hwpCtrl,
            "HWPML2X",
            docView.global.rs.templateFile,
            "",
            "",
            "",
            "",
            docView.global.mod
        );
    },

    resize : function() {
        if (document.getElementById("hwpctrl_frame") != null && typeof(document.getElementById("hwpctrl_frame")) != "undefined") {
            var pHeight = (window.innerHeight - 20) + "px";
            document.getElementById("hwpctrl_frame").style.width = "100%";
            document.getElementById("hwpctrl_frame").style.height = pHeight;
        }
    },

    setKendo : function(){
        $("#attachmentModal").kendoWindow({
            title: "첨부파일",
            visible: false,
            modal: true,
            width : 500,
            position : {
                top : 50,
                left : 255
            },
            close: function () {
                $("#attachmentModal").load(location.href + ' #attachmentModal');
            }
        });

        $("#approveModal").kendoWindow({
            title: "결재의견",
            visible: false,
            modal: true,
            width : 500,
            position : {
                top : 50,
                left : 255
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
                left : 255
            },
            close: function () {
                $("#returnModal").load(location.href + ' #returnModal');
            }
        });

        $("#opinViewModal").kendoWindow({
            title: "의견보기",
            visible: false,
            modal: true,
            width : 800,
            position : {
                top : 50,
                left : 100
            },
            close: function () {
                $("#opinViewModal").load(location.href + ' #opinViewModal');
            }
        });

        $("#opinViewModal2").kendoWindow({
            title: "반려의견보기",
            visible: false,
            modal: true,
            width : 800,
            position : {
                top : 50,
                left : 100
            },
            close: function () {
                $("#opinViewModal2").load(location.href + ' #opinViewModal2');
            }
        });

        $("#approveHistModal").kendoWindow({
            title: "결재이력",
            visible: false,
            modal: true,
            width : 960,
            position : {
                top : 50,
                left : 10
            },
            close: function () {
                $("#approveHistModal").load(location.href + ' #approveHistModal');
            }
        });

        $("#readerHistModal").kendoWindow({
            title: "열람자이력",
            visible: false,
            modal: true,
            width : 800,
            position : {
                top : 50,
                left : 100
            },
            close: function () {
                $("#readerHistModal").load(location.href + ' #readerHistModal');
            }
        });

        var referencesDataSource = new kendo.data.DataSource({
            data : docView.global.rs.referencesAll
        });

        $("#referencesListView").kendoListBox({
            dataSource : referencesDataSource,
            dataTextField: "docTitle",
            dataValueField: "docId",
            template: kendo.template($("#template").html())
        });


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

        if(docView.global.rs.docInfo.DOC_MENU_CD == "purc"){
            docView.global.searchAjaxData.purcSn = docView.global.rs.docInfo.APPRO_KEY.split("_")[docView.global.rs.docInfo.APPRO_KEY.split("_").length - 1];
            docView.global.searchAjaxData.type = "purc";
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
            docView.global.searchAjaxData.docId = docView.global.rs.docInfo.DOC_ID;
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
            dataSource : customKendo.fn_gridDataSource2("/approval/getDocAttachmentList", docView.global.searchAjaxData, 99),
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
                        let filename = e.filename.replaceAll("'", "\\'");
                        return '<span style="cursor: pointer" onClick="docView.docAttachmentDown(\'single\',\'' + e.FILE_DOWN_PATH + e.fileUUID+ '\', \'' + filename + '\')">' +
                                    fileImgTag(e.FILE_EXT) +
                                    "<span style='margin-left: 5px;cursor: pointer'>" +
                                        e.filename + "(" + formatBytes(e.FILE_SIZE, 3) + ")" +
                                    "</span>" +
                                "</span>";
                    }
                }, {
                    template : function(e){
                        let fileExt = e.FILE_EXT.toLowerCase();
                        if(fileExt == "pdf" || fileExt == "png" || fileExt == "jpg" ||fileExt == "jpeg" || fileExt == "gif"){
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

        $("#checkAll").click(function(){
            if($(this).is(":checked")) $("input[name=filePk]").prop("checked", true);
            else $("input[name=filePk]").prop("checked", false);
        });
    },

    attachmentGridFileDownOne : function(e){
        docView.docAttachmentDown("single", e.FILE_DOWN_PATH + e.fileUUID, e.filename);
    },

    fileViewer : function (path, name){
        var name = "_blank";
        var option = "width = 1300, height = 820, top = 100, left = 400, location = no"
        var popup = window.open("http://218.158.231.184" + path, name, option);
    },

    getIsExistsAbsent : function(){
        docView.global.isExistsAbsent = false;

        docView.global.searchAjaxData = {
            empSeq : docView.global.loginVO.uniqId,
            deptSeq : docView.global.loginVO.orgnztId,
        }

        var result = customKendo.fn_customAjax("/approval/getIsExistsAbsent", docView.global.searchAjaxData);
        if(result.flag){
           if(result.rs == 0){
               docView.global.isExistsAbsent = true;
           }
        }else{
            alert("시스템 오류가 발생했습니다.");
        }

        return docView.global.isExistsAbsent;
    },

    setDocApproveRouteReadDt : function(){
        docView.global.searchAjaxData = {
            docId : docView.global.rs.docInfo.DOC_ID,
            empSeq : docView.global.loginVO.uniqId,
        }

        console.log("docView.global.searchAjaxData : " + JSON.stringify(docView.global.searchAjaxData));
        var result = customKendo.fn_customAjax("/approval/setDocApproveRouteReadDt.do", docView.global.searchAjaxData);

        if(!result.flag){
            alert("시스템 오류가 발생했습니다.");
        }
    },

    setDocReaderReadUser : function(){
        docView.global.searchAjaxData = {
            docId : docView.global.rs.docInfo.DOC_ID,
            compSeq : "1212",
            groupSeq : "camtic_new",
            empSeq : docView.global.loginVO.uniqId,
            deptSeq : docView.global.loginVO.orgnztId,
        }

        var result = customKendo.fn_customAjax("/approval/setDocReaderReadUser", docView.global.searchAjaxData);

        if(!result.flag){
            alert("시스템 오류가 발생했습니다.");
        }
    },

    docApprove : function(){
        if(docView.global.loginVO == null){
            alert("장시간 미사용으로 로그인 세션이 만료되었습니다. 로그인 후 재시도 바랍니다."); return;
        }

        docView.loading();


        /** 문서번호
         *  최종결재 할때 추가
         * */
        let list = docView.global.rs.approveRoute;
        if(list[list.length - 1].APPROVE_EMP_SEQ == docView.global.loginVO.uniqId || (docView.global.rs.approveNowRoute.SUB_APPROVAL == 'Y' && (docView.global.rs.approveNowRoute.APPROVE_EMP_SEQ == docView.global.rs.approveNowRoute.LAST_APPROVE_EMP_SEQ))){
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

        docView.documentHwpDataCtrl();

        setTimeout(function(){
            hwpDocCtrl.global.HwpCtrl.GetTextFile("HWPML2X", "", function(data) {
                docView.global.hwpFileTextData = data;

                hwpDocCtrl.global.HwpCtrl.GetTextFile("HTML", "", function(data) {
                    docView.global.htmlFileTextData = data;
                    docView.docApproveAjax();
                })
            })
        }, 5000);
    },

    docApproveAjax : function(){
        docView.global.searchAjaxData = docView.makeApprovalFormData("approve");
        var result = customKendo.fn_customFormDataAjax("/approval/setDocApproveNReturn", docView.global.searchAjaxData);

        if(result.flag) {
            alert("결재되었습니다.");

            var result = docView.setAlarmEvent("approve")
            if(result.flag){
               if(result.rs!= "SUCCESS") {
                   alert(result.message);
               }
            }
            try {
                opener.parent.gridReload();
            }catch (e) {
                opener.parent.location.reload();
            }
            window.close();
        }else{
            alert("결재 중 에러가 발생했습니다.");
        }
    },

    docApproveCancel : function(){
        if(confirm("결재취소 하시겠습니까?")){
            docView.documentHwpSave();

            setTimeout(() => docView.docApproveCancelAjax(), 200);
        }
    },

    docApproveCancelAjax : function(){
        docView.global.searchAjaxData = docView.makeApprovalFormData("cancel");

        var result = customKendo.fn_customFormDataAjax("/approval/setDocApproveCancel", docView.global.searchAjaxData);

        if(result.flag) {
            alert("결재취소 되었습니다.");

            var result = docView.setAlarmEvent("cancel")
            if(result.flag){
                if(result.rs!= "SUCCESS") {
                    alert(result.message);
                }
            }

            try {
                opener.parent.gridReload();
            }catch (e) {

            }
            window.close();
        }else{
            alert("결재취소 중 에러가 발생했습니다.");
        }
    },

    docReturn : function(){

        if($("#returnOpin").val() == ""){
            alert("반려의견을 입력해주세요."); return;
        }

        if(docView.global.loginVO == null){
            alert("세션이 만료되었습니다. 로그인 후 재시도 바랍니다."); return;
        }

        docView.loading();

        docView.documentHwpSave();

        setTimeout(() => docView.docReturnAjax(), 500);
    },

    docReturnAjax : function(){

        docView.global.searchAjaxData = docView.makeApprovalFormData("return");

        var result = customKendo.fn_customFormDataAjax("/approval/setDocApproveNReturn", docView.global.searchAjaxData);

        if(result.flag) {
            alert("반려되었습니다.");

            var result = docView.setAlarmEvent("return");
            if(result.flag){
                if(result.rs!= "SUCCESS") {
                    alert(result.message);
                }
            }

            try {
                opener.parent.gridReload();
            }catch (e) {

            }
            window.close();
        }else{
            alert("반려 중 에러가 발생했습니다.");
        }
    },

    documentHwpDataCtrl : function(){
        if(docView.global.rs.docInfo.FORM_ID != "1"){
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
        }
    },

    documentHwpSave : function(){
        hwpDocCtrl.global.HwpCtrl.GetTextFile("HWPML2X", "", function(data) {
            docView.global.hwpFileTextData = data;
        })

        hwpDocCtrl.global.HwpCtrl.GetTextFile("HTML", "", function(data) {
            docView.global.htmlFileTextData = data;
        })
    },

    approvalKendoSetting : function(){
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
        }
    },

    returnKendoSetting : function(){
        docView.global.approveFlag = true;

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
        }else{
            alert("결재자 정보 조회 중 에러가 발생했습니다.");
        }

        if(!docView.global.approveFlag){
            return false;
        }else{
            $('#returnModal').data('kendoWindow').open();
        }
    },

    contentMod : function(){
        const approKey = docView.global.params.approKey;
        const pk = approKey.split('_')[1];

        const menuCd = docView.global.params.menuCd;
        if(menuCd == "bustrip"){    // 출장 신청
            let url = "/bustrip/pop/bustripReqPop.do?hrBizReqId="+pk;
            let name = "_self";
            let option = "width=1200, height=700, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no";
            window.open(url, name, option);
        }else if(menuCd == "bustripRes"){   // 출장 결과보고
            const result = customKendo.fn_customAjax("/bustrip/getBustripOne", { hrBizReqResultId: pk });
            const busInfo = result.map;

            let url = "/bustrip/pop/bustripResultPop.do?hrBizReqResultId="+pk+"&hrBizReqId="+busInfo.HR_BIZ_REQ_ID;
            let name = "_self";
            let option = "width=1200, height=700, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no";
            window.open(url, name, option);
        }else if(menuCd == "subHoliday"){   // 휴가원
            let url = "/subHoliday/pop/subHolidayReqPop.do?subholidayUseId=" + pk;
            let name = "_self";
            let option = "width=1200, height=700, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no";
            window.open(url, name, option);
        }else if(menuCd == "holidayWork"){  // 휴일근로 신청
            let url = "/subHoliday/pop/subHolidayReqPop2.do?holidayWorkMasterSn=" + pk;
            let name = "_self";
            let option = "width=1200, height=700, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no";
            window.open(url, name, option);
        }else if(menuCd == "purc") {    // 구매 요청
            let url = "/purc/pop/regPurcReqPop.do?purcSn=" + pk;
            let name = "_self";
            let option = "width=1200, height=700, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no";
            window.open(url, name, option);
        }else if(menuCd == "claim") {   // 구매 청구
            const result = customKendo.fn_customAjax("/purc/getPurcClaimData", {claimSn: pk}).data;

            let url = "/purc/pop/reqClaiming.do?claimSn=" + pk + "&purcSn=" + result.PURC_SN;
            let name = "_self";
            let option = "width=1200, height=700, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no";
            window.open(url, name, option);
        }else if(menuCd == "campus"){
            if(approKey.split('_')[0] == "camticEducation") {       // 개인학습 신청
                const result = customKendo.fn_customAjax("/campus/getEduInfoOne", { eduInfoId: pk });
                const eduInfo = result.data;

                let url = "/Campus/pop/eduReqPop.do?eduInfoId=" + pk + "&eduFormType=" + eduInfo.EDU_FORM_TYPE;
                let name = "_self";
                let option = "width=1200, height=700, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no";
                window.open(url, name, option);
            } else if(approKey.split('_')[0] == "camticEducationRes") {     // 개인학습 결과보고
                let url = "/Campus/pop/eduResultReqPop.do?eduInfoId=" + pk + "&mode=upd";
                let name = "_self";
                let option = "width=1200, height=700, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no";
                window.open(url, name, option);
            }
        }else if(menuCd == "payApp") {  // 지급신청서
            let url = "/payApp/pop/regPayAppPop.do?payAppSn=" + pk + "&status=rev&auth=user";
            let name = "_self";
            let option = "width=1200, height=700, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no";
            window.open(url, name, option);
        }else if(menuCd == "payIncp") {     // 수입결의서
            let url = "/payApp/pop/regIncmPop.do?payIncpSn=" + pk;
            let name = "_self";
            let option = "width=1200, height=700, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no";
            window.open(url, name, option);
        }else if(menuCd == "exnp") {    // 지출결의서
            const result = customKendo.fn_customAjax("/payApp/pop/getExnpData", {exnpSn: pk}).map;

            let status = "rev";
            if(result.PAY_APP_TYPE == 1){
                status = "rev";
            } else if (result.PAY_APP_TYPE == 2){
                status = "in";
            } else if (result.PAY_APP_TYPE == 3){
                status = "re";
            } else if (result.PAY_APP_TYPE == 4){
                status = "alt";
            }

            let url = "/payApp/pop/regExnpPop.do?payAppSn=" + result.PAY_APP_SN + "&exnpSn=" + pk + "&status=" + status;
            let name = "_self";
            let option = "width=1200, height=700, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no";
            window.open(url, name, option);
        }else if(menuCd == "study") {   // 학습조 신청
            let url = "/Campus/pop/studyViewPop.do?mode=upd&pk=" + pk + "&typeView=A";
            let name = "_self";
            let option = "width=1200, height=700, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no";
            window.open(url, name, option);
        }else if(menuCd == "propag") {  // 전파학습 신청
            let url = "/Campus/pop/propagViewPop.do?mode=upd&pk=" + pk + "&typeView=A";
            let name = "_self";
            let option = "width=1200, height=700, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no";
            window.open(url, name, option);
        }else if(menuCd == "ojt") {     // ojt 신청서
            let url = "/Campus/pop/ojtViewPop.do?mode=upd&pk=" + pk + "&typeView=A";
            let name = "_self";
            let option = "width=1200, height=700, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no";
            window.open(url, name, option);
        }else if(menuCd == "studyRes") {    // 학습조 결과보고
            const result = customKendo.fn_customAjax("/Campus/pop/getStudyResultOne", {pk: pk}).data;

            let url = "/campus/pop/resultDocPop.do?mode=upd&pk=" + pk + "&studyResultSn=" + result.STUDY_RESULT_SN;
            let name = "_self";
            let option = "width=1200, height=700, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no";
            window.open(url, name, option);
        }else if(menuCd == "propagRes") {   // 전파학습 결과보고
            let url = "/campus/pop/resultPropagDocPop.do?mode=upd&pk=" + pk;
            let name = "_self";
            let option = "width=1200, height=700, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no";
            window.open(url, name, option);
        }else if(menuCd == "ojtRes") {      // ojt 결과보고
            const result = customKendo.fn_customAjax("/campus/getOjtResultInfoOne", {pk: pk}).data;

            let url = "/campus/pop/resultOjtDocPop.do?mode=modify&pk=" + pk + "&ojtResultSn=" + result.OJT_RESULT_SN;
            let name = "_self";
            let option = "width=1200, height=700, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no";
            window.open(url, name, option);
        }else if(menuCd == "rndDelv") {     // R&D 수주보고
            let url = "/projectRnd/pop/regProject.do?pjtSn=" + pk + "&tab=0";
            let name = "_self";
            let option = "width=1200, height=700, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no";
            window.open(url, name, option);
        }else if(menuCd == "rndDev") {      // R&D 계획
            const result = customKendo.fn_customAjax("/project/getDevelopPlan", {devSn: pk}).rs;

            let url = "/projectRnd/pop/regProject.do?pjtSn=" + result.PJT_SN + "&tab=2";
            let name = "_self";
            let option = "width=1200, height=700, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no";
            window.open(url, name, option);
        }else if(menuCd == "rndRes") {      // R&D 결과보고
            let url = "/projectRnd/pop/regProject.do?pjtSn=" + pk + "&tab=7";
            let name = "_self";
            let option = "width=1200, height=700, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no";
            window.open(url, name, option);
        }else if(menuCd == "unRndDelv") {   // 비R&D 수주보고
            let url = "/projectUnRnd/pop/regProject.do?pjtSn=" + pk + "&tab=0";
            let name = "_self";
            let option = "width=1200, height=700, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no";
            window.open(url, name, option);
        }else if(menuCd == "unRndDev") {    // 비R&D 계획
            const result = customKendo.fn_customAjax("/project/getDevelopPlan", {devSn: pk}).rs;

            let url = "/projectUnRnd/pop/regProject.do?pjtSn=" + result.PJT_SN + "&tab=2";
            let name = "_self";
            let option = "width=1200, height=700, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no";
            window.open(url, name, option);
        }else if(menuCd == "unRndRes") {    // 비R&D 결과보고
            let url = "/projectUnRnd/pop/regProject.do?pjtSn=" + pk + "&tab=7";
            let name = "_self";
            let option = "width=1200, height=700, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no";
            window.open(url, name, option);
        }else if(menuCd == "delv") {    // 엔지니어링 수주보고
            let url = "/project/pop/viewRegProject.do?pjtSn=" + pk + "&tab=2";
            let name = "_self";
            let option = "width=1200, height=700, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no";
            window.open(url, name, option);
        }else if(menuCd == "dev") {    // 엔지니어링 계획
            const result = customKendo.fn_customAjax("/project/getPjtSnToDev", {devSn: pk}).rs;

            let url = "/project/pop/viewRegProject.do?pjtSn=" + result.PJT_SN + "&tab=3";
            let name = "_self";
            let option = "width=1200, height=700, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no";
            window.open(url, name, option);
        }else if(menuCd == "pjtRes") {    // 엔지니어링 결과보고
            let url = "/project/pop/viewRegProject.do?pjtSn=" + pk + "&tab=7";
            let name = "_self";
            let option = "width=1200, height=700, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no";
            window.open(url, name, option);
        }else if(menuCd == "pjtCost") {    // 엔지니어링 원가보고
            let url = "/project/pop/viewRegProject.do?pjtSn=" + pk + "&tab=9";
            let name = "_self";
            let option = "width=1200, height=700, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no";
            window.open(url, name, option);
        }/*else if(menuCd == "pjtChange") {    // 세세목 변경서
            const result = customKendo.fn_customAjax("/project/getProjectInfo", {pjtSn: pk}).map;

            let url = '';
            if(result.BUSN_NM == "R&D"){
                url = "/projectRnd/pop/regProject.do?pjtSn=" + pk + "&tab=11";
            } else {
                url = "/projectUnRnd/pop/regProject.do?pjtSn=" + pk + "&tab=11";
            }
            let name = "_self";
            let option = "width=1200, height=700, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no";
            window.open(url, name, option);
        }*/else if(menuCd == "pjtRate") {    // 참여율 변경 공문 신청
            const result = customKendo.fn_customAjax("/project/getPartRateVerInfo", {partRateVerSn: pk}).map;

            let url = '';
            if(result.BUSN_NM == "R&D"){
                url = "/projectRnd/pop/regProject.do?pjtSn=" + result.PJT_SN + "&tab=1";
            } else {
                url = "/projectUnRnd/pop/regProject.do?pjtSn=" + result.PJT_SN + "&tab=1";
            }
            let name = "_self";
            let option = "width=1200, height=700, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no";
            window.open(url, name, option);
        }/*else if(menuCd == "pjtRe") {    // 반납 신청
            const result = customKendo.fn_customAjax("/project/getProjectInfo", {pjtSn: pk}).map;

            let url = '';
            if(result.BUSN_NM == "R&D"){
                url = "/projectRnd/pop/regProject.do?pjtSn=" + pk + "&tab=11";
            } else {
                url = "/projectUnRnd/pop/regProject.do?pjtSn=" + pk + "&tab=11";
            }
            let name = "_self";
            let option = "width=1200, height=700, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no";
            window.open(url, name, option);
        }*/else if(menuCd == "workPlan") {    // 시차출퇴근형
            let url = "/workPlan/workPlanApprovalModPop.do?workPlanApprovalId=" + pk;
            let name = "_self";
            let option = "width=1200, height=700, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no";
            window.open(url, name, option);
        }else if(menuCd == "car") {    // 차량사용신청서
            let url = "/Inside/pop/carPop.do?mode=drafting&carReqSn=" + pk;
            let name = "_self";
            let option = "width=1200, height=700, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no";
            window.open(url, name, option);
        }else if(menuCd == "equipment") {    // 장비활용실적 보고
            let url = "/Inside/pop/equipAppPop.do?type=drafting&pk=" + pk;
            let name = "_self";
            let option = "width=1200, height=700, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no";
            window.open(url, name, option);
        }else if(menuCd == "invention") {    // 직무발명 보고
            let url = "/Inside/pop/inventionReqPop.do?type=drafting&pk=" + pk;
            let name = "_self";
            let option = "width=1200, height=700, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no";
            window.open(url, name, option);
        }else if(menuCd == "rprRes") {    // 포상금지급 신청
            let url = "/Inside/pop/rprResultPop.do?type=drafting&pk=" + pk;
            let name = "_self";
            let option = "width=1200, height=700, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no";
            window.open(url, name, option);
        }
    },

    contentMod2 : function(){
        const docInfo = docView.global.rs.docInfo;
        tempOrReDraftingPop(docInfo.DOC_ID, docInfo.DOC_MENU_CD, docInfo.APPRO_KEY, 1, "reDrafting");
    },

    docApprovalOpinView : function(){
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
                        if(e.APPROVE_TYPE == "0"){
                            return "상신의견";
                        }else if(e.APPROVE_TYPE == "1"){
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
                            return "<div style='text-align: left'>"+e.APPROVE_OPIN.replaceAll("\n", "<br/>")+"</div>";
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
    },

    docApprovalOpinView2 : function(){
        let opinText = "";
        let opinEmpSeq = "";
        let opinUser = {};
        for(let i=0; i<docView.global.rs.approveRoute.length; i++){
            const map = docView.global.rs.approveRoute[i];
            if(map.APPROVE_STAT_CODE == 30){
                opinText = map.APPROVE_OPIN;
                opinEmpSeq = map.APPROVE_EMP_SEQ;
            }
        }
        if(opinEmpSeq != "" && opinEmpSeq != null){
            opinUser = getUser(opinEmpSeq);
            $("#opinName").text(opinUser.EMP_NAME_KR);
            $("#opinDept").text(opinUser.deptNm + " " +opinUser.teamNm);
            $("#opinSpot").text(opinUser.DUTY_NAME == "" ? opinUser.POSITION_NAME : opinUser.DUTY_NAME);
        }
        $("#opinReason").html(opinText.replaceAll("\n", "<br/>"));
        $("#opinViewModal2").data("kendoWindow").open();
    },

    docApprovalRouteHistView : function(e){
        docView.global.searchAjaxData = {
            docId : docView.global.rs.docInfo.DOC_ID
        }

        $("#approveHistModalGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2("/approval/getDocApproveStatusHistList.do", docView.global.searchAjaxData, 100),
            height: 315,
            toolbar : [
                {
                    name : 'excel',
                    text: '엑셀다운로드'
                }
            ],
            excel : {
                fileName : "결재이력.xlsx",
                filterable : true
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    field : "APPROVE_STAT_CODE_DESC",
                    title: "구분",
                    width : 80,
                    template : function(e){
                        console.log("1", e.APPROVE_STAT_CODE)
                        console.log("2", e.APPROVE_TYPE)
                        if(e.APPROVE_STAT_CODE == "20" && e.APPROVE_TYPE == "1"){
                            return "협조";
                        }else{
                            return e.APPROVE_STAT_CODE_DESC
                        }
                    },
                }, {
                    field : "APPROVE_EMP_NAME",
                    title: "이름",
                    template : function(e){
                        if(e.PROXY_TYPE == "Y"){
                            return "[대결] " + e.PROXY_APPROVE_EMP_NAME;
                        }else{
                            return e.APPROVE_EMP_NAME
                        }
                    },
                    width : 80
                },{
                    field : "DEPT_FULL_NAME",
                    title: "부서/팀",
                    template : function(e){
                        if(e.APPROVE_DUTY_NAME == "원장"){
                            return "캠틱종합기술원";
                        }else{
                            return e.DEPT_FULL_NAME;
                        }
                    }
                },{
                    field : "APPROVE_DUTY_NAME",
                    title: "직위",
                    template : function(e){
                        return e.APPROVE_POSITION_NAME;
                    },
                    width : 100
                },{
                    field : "DRAFT_DOCU_DT",
                    title: "기안일자",
                    template : function(e){
                        if(e.APPROVE_DT == null){
                            return "-";
                        }else{
                            if(e.APPROVE_ORDER == "0" && docView.global.rs.docInfo.FORM_ID == 1){
                                return e.APPROVE_DT;
                            }else{
                                return "-";
                            }
                        }
                    },
                    width : 120
                },{
                    field : "DRAFT_DT",
                    title: "상신일자",
                    template : function(e){
                        if(e.APPROVE_DT == null){
                            return "-";
                        }else{
                            if(e.APPROVE_ORDER == "0" && docView.global.rs.docInfo.FORM_ID != 1){
                                return e.APPROVE_DT;
                            }else{
                                return "-";
                            }
                        }
                    },
                    width : 120
                },{
                    field : "DOC_READ_DT",
                    title: "열람일자",
                    width : 120
                },{
                    field : "APPROVE_DT",
                    title: "결재일자",
                    template : function(e){
                        if(e.APPROVE_ORDER == "0" || e.APPROVE_DT == null){
                            return "-";
                        }else{
                            return e.APPROVE_DT
                        }
                    },
                    width : 120
                }/*,{
                    field : "PROXY_TYPE",
                    title : "비고",
                    template : function(e){
                        if(e.PROXY_TYPE == "Y"){
                            return "원결재 : [" + e.APPROVE_DUTY_NAME+ "] " + e.APPROVE_EMP_NAME;
                        }else{
                            return ""
                        }
                    },
                    width : 150
                }*/
            ]
        }).data("kendoGrid");

        $("#approveHistModal").data("kendoWindow").open();
    },

    docReaderHistView : function(e){
        docView.global.searchAjaxData = {
            docId : docView.global.rs.docInfo.DOC_ID
        }

        $("#readerHistModalGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2("/approval/getDocReaderHistList", docView.global.searchAjaxData, 100),
            height: 315,
            toolbar : [
                {
                    name : 'excel',
                    text: '엑셀다운로드'
                }
            ],
            excel : {
                fileName : "열람이력.xlsx",
                filterable : true
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    field : "DEPT_NAME",
                    title: "부서/팀",
                    width : 180
                },{
                    field : "DUTY_NAME",
                    title: "직책",
                    template : function(e){
                        return fn_getSpot(e.DUTY_NAME, e.POSITION_NAME)
                    }
                },{
                    field : "EMP_NAME_KR",
                    title: "이름",
                },{
                    field : "READ_DAY",
                    title: "최초열람",
                    width : 180
                },{
                    field : "LAST_READ_DAY",
                    title: "마지막열람",
                    width : 180
                }]
        }).data("kendoGrid");

        $("#readerHistModal").data("kendoWindow").open();
    },

    docAttachmentDown : function(type, filePath, fileName){
        if(type == "single"){
            docView.docApprovalFileDown(null, null, type, null, filePath, fileName);
        }else if(type == "zip"){
            if($("#attachmentGrid").data("kendoGrid").dataSource.total() == 0){
                alert("첨부파일이 없습니다.");
                return;
            }

            docView.docApprovalFileDown('attachment', 'zip', 'approval', $("#docId").val(), null, null, docView.global.rs.docInfo.APPRO_KEY);
        }
    },

    /**
     * 결재문서 파일 다운로드
     * area [ 영역 (main = 본문, attachment = 첨부파일) ]
     * format [ area = main (파일 포맷 (hwp_DocCtrl.js 참조)), area = attachment (docId)]
     *
     * area = attachment (only zip File)
     *
     * */
    docApprovalFileDown : function(area, format, type, docId, filePath, fileName, approKey){
        if(area == "main" && type == "single"){
            if(docView.global.rs.docInfo.DOC_GBN == "001"){
                if(hwpDocCtrl.global.HwpCtrl.FieldExist("인")){
                    hwpDocCtrl.global.HwpCtrl.MoveToField('인', true, true, false);
                    hwpDocCtrl.global.HwpCtrl.InsertBackgroundPicture(
                        "SelectedCell",
                        "http://" + location.host + "/upload/journeyman/companySignature.png",
                        1,
                        6,
                        0,
                        0,
                        0,
                        0
                    );
                }

                hwpDocCtrl.saveAs(docView.global.rs.docInfo.DOC_TITLE + '.' + format.toUpperCase(), format.toUpperCase(), "download:true");
                hwpDocCtrl.global.HwpCtrl.InsertBackgroundPicture("SelectedCellDelete", 0, 0, 0, 0, 0, 0, 0);
            }else{
                hwpDocCtrl.saveAs(docView.global.rs.docInfo.DOC_TITLE + '.' + format.toUpperCase(), format.toUpperCase(), "download:true");
            }

        }else if(area == "attachment" && format == "zip"){
            kendo.saveAs({
                dataURI: "/common/multiFileDownload.do?docId=" + docId + "&type=" + type + "&approKey=" + approKey
            });
        }else if(type == "single" && filePath != null && fileName != null){
            var fileName = fileName.replaceAll("&", "%26");
            kendo.saveAs({
                dataURI: "/common/fileDownload.do?filePath=" + filePath + "&fileName=" + fileName,
            });
        }
    },

    setAlarmEvent : function (type){
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
    },

    makeApprovalFormData(type){
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
    },

    initBtn : function(){
        var approveIncludeFlag = 0;

        for(var i = 0; i < docView.global.rs.approveRoute.length; i++){
            if(docView.global.rs.approveRoute[i].APPROVE_EMP_SEQ == docView.global.loginVO.uniqId || docView.global.rs.docInfo.DRAFT_EMP_SEQ != docView.global.loginVO.uniqId){
                approveIncludeFlag ++;
            }
        }
        if(docView.global.rs.approveNowRoute != null){
            if(docView.global.rs.approveNowRoute.APPROVE_EMP_SEQ != null){
                if(docView.global.rs.approveNowRoute.APPROVE_EMP_SEQ == docView.global.loginVO.uniqId || docView.global.rs.approveNowRoute.SUB_APPROVAL == 'Y'){
                    $("#approvalBtn").show();
                    $("#returnBtn").show();
                    $("#docApprovalOpinViewBtn").show();
                    $("#docApprovalRouteHistViewBtn").show();
                }else if(docView.global.rs.approveNowRoute.APPROVE_EMP_SEQ != docView.global.loginVO.uniqId && approveIncludeFlag > 0){
                    $("#docApprovalOpinViewBtn").show();
                    $("#docApprovalRouteHistViewBtn").show();
                }
            }else if((docView.global.rs.docInfo.DRAFT_EMP_SEQ == docView.global.loginVO.uniqId || approveIncludeFlag > 0) || docView.global.rs.docInfo.APPROVE_STAT_CODE == '30'){
                $("#docApprovalOpinViewBtn").show();
                $("#docApprovalRouteHistViewBtn").show();
            }
        }else if((docView.global.rs.docInfo.DRAFT_EMP_SEQ == docView.global.loginVO.uniqId || approveIncludeFlag > 0) || docView.global.rs.docInfo.APPROVE_STAT_CODE == '30'){
            $("#docApprovalOpinViewBtn").show();
            $("#docApprovalRouteHistViewBtn").show();
        }

        if(docView.global.rs.approvePrevRoute != null){
            if(docView.global.rs.approvePrevRoute.APPROVE_EMP_SEQ != null && docView.global.rs.docInfo.APPROVE_STAT_CODE != '100' && docView.global.rs.docInfo.APPROVE_STAT_CODE != '101'){
                if(docView.global.rs.approvePrevRoute.PROXY_APPROVE_EMP_SEQ == docView.global.loginVO.uniqId){
                    /*$("#approvalCancelBtn").show();*/
                }else if(!docView.global.rs.approvePrevRoute.PROXY_APPROVE_EMP_SEQ && docView.global.rs.approvePrevRoute.APPROVE_EMP_SEQ == docView.global.loginVO.uniqId){
                    /*$("#approvalCancelBtn").show();*/
                }
            }
        }

        if(docView.global.rs.docInfo.APPROVE_STAT_CODE == "111"){
            $("#docApprovalPDFDownBtn").hide();
        }

        if(docView.global.rs.docInfo.DOC_GBN == "001" && (docView.global.rs.docInfo.APPROVE_STAT_CODE == "100" || docView.global.rs.docInfo.APPROVE_STAT_CODE == "101")){
            $("#otherTypePdfDown").show();
        }
    },

    initData : function(){
        /** 결재자 부재체크 */
        if(docView.global.rs.approveNowRoute != null){
            if(docView.global.rs.approveNowRoute.APPROVE_EMP_SEQ == docView.global.loginVO.uniqId){
                if(!docView.getIsExistsAbsent()){
                    alert("결재자가 부재중입니다. 결재를 할수 없습니다.");
                    $("#approvalBtn").hide();
                    $("#returnBtn").hide();
                }
            }
        }

        /** 열람 시간 업데이트 (결재자) */
        if(docView.global.rs.approveRoute.filter(element => element.APPROVE_EMP_SEQ == docView.global.loginVO.uniqId && element.APPROVE_ORDER != 0).length > 0){
            docView.setDocApproveRouteReadDt()
        }

        /** 열람 시간 업데이트 (열람자 체크 후 열람 시간 저장) */
        docView.setDocReaderReadUser()

        /** 문서, 첨부 개수 */
        $("#referencesCont").text(docView.global.rs.docInfo.REFERENCES_CONT);
        $("#fileCont").text(docView.global.rs.docInfo.FILE_CONT);

        /** 문서 기본 정보 */
        $("#docTitle").text(docView.global.rs.docInfo.DOC_TITLE);
        $(".docPublicType").hide();
        $("#publicTypeKr").text(docView.global.rs.docInfo.PUBLIC_TYPE_KR);
        $("#urgentTypeKr").text(docView.global.rs.docInfo.URGENT_TYPE_KR);
        $("#securityTypeKr").text(docView.global.rs.docInfo.SECURITY_TYPE_KR);

        if(docView.global.rs.approveNowRoute.LAST_APPROVE_EMP_SEQ == docView.global.rs.approveNowRoute.APPROVE_EMP_SEQ
            && docView.global.rs.docInfo.APPROVE_STAT_CODE != "100" && docView.global.rs.docInfo.APPROVE_STAT_CODE != "101"){
            $("#securityTypeKr").html('<span id="securityType"></span>');

            $("#securityType").kendoRadioGroup({
                items: docView.kendoRadioGroupDataSource(29),
                layout : "horizontal",
                labelPosition : "after",
                value : "000",
                change : function(e){
                    if(this.value() == "009"){
                        $("#readerTr").show();
                    }else{
                        docView.global.readersArr = [];
                        // $("#readerName").val("");
                        // $("#readerTr").hide();
                    }
                }
            });
            $("#securityType").data("kendoRadioGroup").value(docView.global.rs.docInfo.SECURITY_TYPE);
        }

        $("#docGbnKr").text(docView.global.rs.docInfo.DOC_GBN_KR);
        $("#aiTitle").text(docView.global.rs.docInfo.AITITLE);

        if(docView.global.rs.docInfo.DOC_GBN == '001'){
            $("#receiverNameTr").show();
            $("#receiverNameTd").text(docView.global.rs.displayReceiverName);
        }

        $("#readerNameTd").text(docView.global.rs.displayReaderName);
        $("#draftOpinTd").html(docView.global.rs.docInfo.DRAFT_OPIN.replace(/\n+/g, "<br>"));

        if(docView.global.rs.approveNowRoute.LAST_APPROVE_EMP_SEQ == docView.global.rs.approveNowRoute.APPROVE_EMP_SEQ
            && docView.global.rs.docInfo.APPROVE_STAT_CODE != "100" && docView.global.rs.docInfo.APPROVE_STAT_CODE != "101"){
            $("#readerNameTd").html('<input type="text" id="readerName" name="readerName" class="k-input k-textbox k-input-solid k-input-md" style="width: 93%; margin-right: 5px" onclick="docView.readerSelectPopup2()" readonly>' +
                '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="docView.readerSelectPopup2()" style="vertical-align: middle;">' +
                '   <span class="k-button-text">선택</span>' +
                '</button>');
            $("#readerName").val(docView.global.rs.displayReaderName);
        }

        /** 문서 hidden 값 */
        $("#docId").val(docView.global.rs.docInfo.DOC_ID);
        $("#menuCd").val(docView.global.rs.docInfo.FILE_CD);
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
    },

    kendoRadioGroupDataSource : function(cmGroupCodeId){
        docView.global.radioGroupData = {
            cmGroupCodeId : cmGroupCodeId
        }

        var radioArr = new Array();

        var result = customKendo.fn_customAjax("/system/commonCodeManagement/getCmCodeList", docView.global.radioGroupData);

        if(result.flag){
            var data = result;
            for(var i = 0; i < data.length; i++){
                if(data[i].CM_CODE_NM == "보안문서"){
                    radioArr.push({label : data[i].CM_CODE_NM + " (결재선소유자 열람)", value : data[i].CM_CODE});
                }else{
                    radioArr.push({label : data[i].CM_CODE_NM, value : data[i].CM_CODE});
                }
            }
        }

        return radioArr;
    },

    readerSelectPopup2 : function(){
        docView.global.windowPopUrl = "/approval/approvalReaderSelectPopup2.do";
        docView.global.popName = "readerSelectPopup2";
        docView.global.popStyle ="width=1170, height=612, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no";

        window.open(docView.global.windowPopUrl, docView.global.popName, docView.global.popStyle);
    },

    readerSelectPopClose : function(e, readerNameStr){
        $("#readerName").val(readerNameStr);

        docView.global.readersArr = e;
    },

    loading : function(){
        $.LoadingOverlay("show", {
            background: "rgba(0, 0, 0, 0.5)",
            image: "",
            maxSize: 60,
            fontawesome: "fa fa-spinner fa-pulse fa-fw",
            fontawesomeColor: "#FFFFFF",
        });
    },
}

function fileImgTag(ext){
    return "<img src=\'/images/ico/file_ico2/ico_file_" + ext + ".png\' width='20'>";
}

function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
