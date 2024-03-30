/**
 * 2022.06.28 by. deer
 * 전자결재 관련 팝업 - 상신 팝업
 *
 * function / global variable / local variable setting
 */
var draft = {
    global : {
        dataType                : new Array(),
        params                  : "",
        type                    : "",
        docInfo                 : null,
        approversArr            : new Array(),
        referencesArr           : new Array(),
        receiversArr            : new Array(),
        readersArr              : new Array(),
        originalApproversArr    : new Array(),
        lastApprover            : "",
        hwpCtrl                 : "",
        fileUploaded            : new Array(),
        fileInitData            : "",
        fileUploadFlag          : false,
        draftDocInfo            : "",
        flag                    : false,
        purcFlag                : false,
        purcParams              : "",
        windowPopUrl : "",
        popName : "",
        popStyle : "",
        uploadFlag              : false,

        /** 기안기 셋팅 옵션 (파일, editing mode)*/
        templateFormFile : "",
        templateFormOpt : "",
        templateFormCustomField : "",
        openFormat : "",
        mod : "",
        hwpFileTextData : "",
        htmlFileTextData : "",

        referencesDataSource : new kendo.data.DataSource({data:""}),

        radioGroupData : "",

        formData : new FormData(),
        searchAjaxData : "",
        saveAjaxData : "",
        kendoFiles : [],

        comCode : new Object()
    },

    fnDefaultScript : function (params) {
        window.resizeTo(965, 900);
        document.querySelector('body').style.overflow = 'hidden';
        if(draft.global.params.mod == "W"){
            $("#loadingText").text("양식을 불러오는 중입니다.");
        }else{
            $("#loadingText").text("문서를 불러오는 중입니다.");
        }

        draft.global.params = params;
        console.log("params");
        console.log(params);

        /** 문서 정보 조회하여 결재선 설정 미노출일시 hide 처리 */
        const formInfo = customKendo.fn_customAjax("/approval/getDocFormReqOpt", {formId : draft.global.params.formId});
        console.log(formInfo);
        if(formInfo != null && formInfo.formInfoReqOpt.VISIBLE_APPR == "N" ){
            $("#apprBtn").hide();
        }




        $("#menuCd").val(draft.global.params.menuCd);
        $("#type").val(draft.global.params.type);
        $("#formId").val(draft.global.params.formId);
        $("#docId").val(draft.global.params.docId);
        $("#docType").val(draft.global.params.docType);
        $("#compSeq").val(draft.global.params.compSeq);
        $("#linkageType").val(draft.global.params.linkageType);
        $("#processId").val(draft.global.params.processId);
        let docTitle = draft.global.params.docTitle;
        if(docTitle != null){
            docTitle = draft.global.params.docTitle.replaceAll("%26", "&");
        }
        $("#docTitle").val(docTitle);


        customKendo.fn_textBox(["docTitle"]);

        draft.global.type = $("#type").val();

        $("#publicType").kendoRadioGroup({
            items: draft.kendoRadioGroupDataSource(27),
            layout : "horizontal",
            labelPosition : "after",
            value : "001",
        });


        $("#urgentType").kendoRadioGroup({
            items: draft.kendoRadioGroupDataSource(28),
            layout : "horizontal",
            labelPosition : "after",
            value : "000",
        });

        $("#securityType").kendoRadioGroup({
            items: draft.kendoRadioGroupDataSource(29),
            layout : "horizontal",
            labelPosition : "after",
            value : "000",
            change : function(e){
                if(this.value() == "009"){
                    $("#readerTr").show();
                }else{
                    draft.global.readersArr = [];
                    // $("#readerName").val("");
                    // $("#readerTr").hide();
                }
            }
        });

        $("#docGbn").kendoRadioGroup({
            items: draft.kendoRadioGroupDataSource(30),
            layout : "horizontal",
            labelPosition : "after",
            value : "000",
            change : function(e){
                if(this.value() == "001"){
                    $("#receiverTr").show();
                }else{
                    draft.global.receiversArr = [];
                    $("#receiverName").val("");
                    $("#receiverTr").hide();
                }
            }
        });

        $("#referencesListView").kendoListBox({
            dataSource : draft.global.referencesDataSource,
            dataTextField: "docTitle",
            dataValueField: "docId",
            template: kendo.template($("#template").html())
        });

        $("#draftOpin").kendoTextArea({
            rows:5,
            cols:10,
            resizable: "vertical"
        });

        $(document).ready(function() {
            draft.global.hwpCtrl = BuildWebHwpCtrl("hwpApproveContent", draft.global.params.hwpUrl, function () {draft.editorComplete();});
            window.onresize();
        });

        window.onresize = function () {draft.resize()};

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

        var paramDiv = $('#paramDiv');

        if(draft.global.params.linkageType == "2"){
            paramDiv.append($("<input type='hidden' id='linkageProcessCode' name='linkageProcessCode' value='" + draft.global.params.linkageProcessCode + "'>" +
                "<input type='hidden' id='approKey' name='approKey' value='" + draft.global.params.approKey + "'>"));
        }

        var purcParamsInput = $("<input type='hidden' id='purcFormCode' name='purcFormCode' value=''>" +
            "<input type='hidden' id='purcInspFormCode' name='purcInspFormCode' value=''>" +
            "<input type='hidden' id='contentGroup' name='contentGroup' value=''>" +
            "<input type='hidden' id='contentPrevValue' name='contentPrevValue' value=''>" +
            "<input type='hidden' id='contentId' name='contentId' value=''>" +
            "<input type='hidden' id='contentValue' name='contentValue' value=''>");

        draft.setKendoUpload();

        draft.setFileForm(draft.global.params);

        $("#receiverName").on("focusout", function(){
            draft.global.receiversArr = [];
            var receiverDeptName = $(this).val().split(",");

            hwpDocCtrl.putFieldText('doc_receive', "");
            hwpDocCtrl.putFieldText('doc_receivelist', "")

            if(receiverDeptName.length > 1){
                hwpDocCtrl.putFieldText('doc_receive', "수신처 참조");
                hwpDocCtrl.putFieldText('doc_receivelist_txt', "수신처");
                $.each(receiverDeptName, function(i, v){
                    receiverDeptName[i] = receiverDeptName[i].trim();
                    draft.global.receiversArr[i] = {
                        seqType : "d",
                        receiverDeptName : receiverDeptName[i]
                    }
                })
                hwpDocCtrl.putFieldText('doc_receivelist', receiverDeptName.join().replaceAll(",", ", "));
            }else{
                hwpDocCtrl.putFieldText('doc_receive', receiverDeptName[0]);
                hwpDocCtrl.putFieldText('doc_receivelist_txt', "")
                hwpDocCtrl.putFieldText('doc_receivelist', "")
            }
        });

        $("#docTitle").on("focusout", function(){
            hwpDocCtrl.putFieldText('결재제목', $("#docTitle").val());
        });
    },

    getDocFormTemplate : function(){
        draft.global.searchAjaxData = {
            formId : $("#formId").val(),
        }

        var result = customKendo.fn_customAjax("/approval/getTemplateFormFile", draft.global.searchAjaxData);
        draft.global.flag = result.flag;
        if(result.flag){
            return result ;
        }

    },

    getDocFormReqOpt : function(){
        draft.global.searchAjaxData = {
            formId : $("#formId").val()
        }

        var returnArr = new Array();
        var result = customKendo.fn_customAjax("/approval/getDocFormReqOpt", draft.global.searchAjaxData);

        draft.global.flag = result.flag;

        if(result.flag){
            var formInfoReqOpt = result.formInfoReqOpt;
            var formRdRcCfList = result;
            var formReaderList = formRdRcCfList.readerList;
            // var formReceiver = formRdRcCfList.receiverList;

            returnArr.formInfoReqOpt = result.formInfoReqOpt;
            returnArr.formCustomFieldList =  formRdRcCfList.formCustomFieldList;

            /** 양식 정보 */
            $("#formName").val(formInfoReqOpt.FORM_NAME);

            /** 기본정보 조회 */
            $("#securityType").data("kendoRadioGroup").value(formInfoReqOpt.SECURITY_TYPE);
            $("#securityType").data("kendoRadioGroup").trigger("change");
            $("#docGbn").data("kendoRadioGroup").value(formInfoReqOpt.DOC_GBN);
            $("#docGbn").data("kendoRadioGroup").trigger("change");

            for(var i = 0; i < formReaderList.length; i++){
                var readerData = {
                    docId : $("#docId").val(),
                    seqType : formReaderList[i].SEQ_TYPE,
                    readerDeptSeq : formReaderList[i].READER_DEPT_SEQ,
                    readerDeptName : formReaderList[i].READER_DEPT_NAME,
                    readerEmpSeq : formReaderList[i].READER_EMP_SEQ,
                    readerEmpName : formReaderList[i].READER_EMP_NAME,
                    readerDutyCode : formReaderList[i].READER_DUTY_CODE,
                    readerDutyName : formReaderList[i].READER_DUTY_NAME,
                    readerDutyCode : formReaderList[i].READER_POSITION_CODE,
                    readerDutyName : formReaderList[i].READER_POSITION_NAME,
                    empSeq : $("#empSeq").val()
                }
                draft.global.readersArr.push(readerData);
            }

            // for(var i = 0; i < formReceiver.length; i++){
            //     var receiverData = {
            //         docId : $("#docId").val(),
            //         seqType : formReceiver[i].SEQ_TYPE,
            //         receiverDeptSeq : formReceiver[i].RECEIVER_DEPT_SEQ,
            //         receiverDeptName : formReceiver[i].RECEIVER_DEPT_NAME,
            //         receiverEmpSeq : formReceiver[i].RECEIVER_EMP_SEQ,
            //         receiverEmpName : formReceiver[i].RECEIVER_EMP_NAME,
            //         receiverDutyName : formReceiver[i].RECEIVER_DUTY_NAME,
            //         receiverPositionName : formReceiver[i].RECEIVER_POSITION_NAME,
            //         empSeq : $("#empSeq").val()
            //     }
            //     draft.global.receiversArr.push(receiverData);
            // }

            var readerName = "";

            if($("#readerName").val() != ""){
                readerName += $("#readerName").val();
            }
            $("#readerName").val(readerName);
            // if(formInfoReqOpt.DOC_GBN == "001"){
            //     $("#receiverName").val(result.receiverName);
            // }
        }

        return returnArr;
    },

    kendoRadioGroupDataSource : function(cmGroupCodeId){
        draft.global.radioGroupData = {
            cmGroupCodeId : cmGroupCodeId
        }

        var radioArr = new Array();

        var result = customKendo.fn_customAjax("/system/commonCodeManagement/getCmCodeList", draft.global.radioGroupData);

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

    editorComplete : function() {
        if(draft.global.type != "drafting"){
            draft.global.mod = "RW";
            draft.global.openFormat = "HWPML2X";
            draft.global.templateFormFile = draft.approvalReturnOrTempData($("#docId").val(), draft.global.type);
        }else{
            draft.global.mod = "W";
            draft.global.openFormat = "HWP";
            draft.global.templateFormFile = draft.getDocFormTemplate();
            console.log("폼파일");
            console.log(draft.global.templateFormFile);
            var templateFlag = draft.global.flag;
            if(!templateFlag || draft.global.templateFormFile.filter(element => element.FORM_FILE_TYPE === "form").length == 0){
                alert("양식 정보가 존재하지 않습니다.\n관리자에게 문의하세요.");
                window.close();
            }

            draft.global.templateFormOpt = draft.getDocFormReqOpt().formInfoReqOpt;
            draft.global.templateFormCustomField = draft.getDocFormReqOpt().formCustomFieldList;

            var optFlag = draft.global.flag;
            if(!optFlag){
                alert("양식 정보가 존재하지 않습니다.\n관리자에게 문의하세요.");
                window.close();
            }
        }

        draft.global.templateFormOpt.doc_contents = editorContent;

        hwpDocCtrl.defaultScript(
            draft.global.hwpCtrl,
            draft.global.openFormat,
            draft.global.templateFormFile,
            draft.global.templateFormOpt,
            draft.global.templateFormCustomField,
            draft.global.params,
            $("#empSeq").val(),
            draft.global.mod
        );

        draft.drafterArrAdd();

        $("#docGbn").data("kendoRadioGroup").bind("change", draft.docGbnChange);
        $("#docGbn").data("kendoRadioGroup").trigger("change");
    },

    resize : function() {
        if (document.getElementById("hwpctrl_frame") != null && typeof(document.getElementById("hwpctrl_frame")) != "undefined") {
            var pHeight = (window.innerHeight - 20) + "px";
            document.getElementById("hwpctrl_frame").style.width = "100%";
            document.getElementById("hwpctrl_frame").style.height = pHeight;
        }
    },

    approvalLinePop : function(){
        draft.global.windowPopUrl = "/approval/approvalLineSettingPop.do";
        draft.global.popName = "approvalLineSetting";
        draft.global.popStyle ="width=1550, height=610, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no";

        window.open(draft.global.windowPopUrl, draft.global.popName, draft.global.popStyle);
    },

    docGbnChange : function (){
        if(draft.global.params.formId == "1"){
            if(this.value() == "001"){
                hwpDocCtrl.putFieldText("sender_name", "사단법인 캠틱종합기술원장");
                hwpDocCtrl.putFieldText("doc_receivelist_txt", "수신자");
                hwpDocCtrl.putFieldText("doc_receivelist", "");
                hwpDocCtrl.putFieldText("doc_receive", "");
            }else {
                hwpDocCtrl.putFieldText("sender_name", "");
                hwpDocCtrl.putFieldText("doc_receive", "내부결재");
                hwpDocCtrl.putFieldText("doc_receivelist_txt", "");
                hwpDocCtrl.putFieldText("doc_receivelist", "");
            }
        }
    },

    setHwpApprovalLinePutBak : function(){
        /**
         * approver = 결재자 직급, 결재자 직책
         * approval = 결재자 이름
         * approval_st = 결재유형 결재일
         * */

        hwpDocCtrl.putFieldsText(
            ["approval", "approver", "cooperate", "cooperation"],
            7,
            "\n"
        )

        var approverMark = draft.global.templateFormOpt.APPROVER_MARK == "P" ? "approvePositionName" : "approveDutyName";
        hwpDocCtrl.setArrayFieldsPut(
            ["cooperation", "cooperate"],
            ["approval", "approver"],
            {
                trueCase : "approveType",
                trueValue : "1"
            },
            ["approveEmpName", approverMark],
            draft.global.approversArr
        );
    },

    archiveSelectPop : function(){
        draft.global.windowPopUrl = "/approval/approvalArchiveSelectPop.do";
        draft.global.popName = "approvalArchiveSelect";
        draft.global.popStyle ="width=610, height=670, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no";

        window.open(draft.global.windowPopUrl, draft.global.popName, draft.global.popStyle);
    },

    archiveSelectPopClose : function(e){
        $("#aiKeyCode").val(e.aiKeyCode);
        $("#aiTitle").val(e.name);
    },

    referencesSelectPop : function(){
        draft.global.windowPopUrl = "/approval/approvalReferencesSelectPop.do";
        draft.global.popName = "approvalReferencesSelect";
        draft.global.popStyle ="width=1350, height=590, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no";

        window.open(draft.global.windowPopUrl, draft.global.popName, draft.global.popStyle);
    },

    referencesListViewSetData : function(rs){
        if(draft.global.referencesArr.length > 0){
            if(rs.length > 0){
                for(var i = 0 ; i < rs.length ; i++){
                    draft.global.referencesArr.push(rs[i]);
                }
            }
        }else{
            draft.global.referencesArr = rs;
        }

        $("#referencesListView").data("kendoListBox").setDataSource(draft.global.referencesArr);
    },

    referencesCancel : function(e){
        var listBox = $("#referencesListView").data("kendoListBox");
        draft.global.referencesArr.splice($(e).closest("li").index(), 1);
        listBox.remove(listBox.items().get($(e).closest("li").index()));
        draft.global.referencesDataSource.remove($(e).closest("li"));
    },

    readerSelectPopup : function(){
        draft.global.windowPopUrl = "/approval/approvalReaderSelectPopup.do";
        draft.global.popName = "readerSelectPopup";
        draft.global.popStyle ="width=1170, height=612, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no";

        window.open(draft.global.windowPopUrl, draft.global.popName, draft.global.popStyle);
    },

    readerSelectPopClose : function(e, readerNameStr){
        $("#readerName").val(readerNameStr);

        draft.global.readersArr = e;
    },

    // receiverSelectPopup : function(){
    //     draft.global.windowPopUrl = "/approval/approvalReceiverSelectPopup.do";
    //     draft.global.popName = "receiverSelectPopup";
    //     draft.global.popStyle ="width=1170, height=650, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no";
    //
    //     window.open(draft.global.windowPopUrl, draft.global.popName, draft.global.popStyle);
    // },

    drafterArrAdd : function(){
        if(draft.global.approversArr.filter(element => element.approveOrder === "0").length == 0){
            draft.global.approversArr.unshift({
                approveEmpSeq : $("#empSeq").val(),
                approveEmpName : $("#empName").val(),
                approveStatCodeDesc : "",
                approveStatCode : "",
                approvePositionName : $("#empPositionNm").val(),
                approveDutyName : $("#empDutyNm").val(),
                approveDeptSeq : $("#deptSeq").val(),
                approveDeptName : $("#deptName").val(),
                approveOrder : "0",
                approveType : "0"
            });
        }
    },

    getDocFileSet : function (docFile){
        console.log("docFile", docFile);
        if(docFile.length > 0){
            for(var i = 0; i < docFile.length; i++){
                if(docFile[i] != null){
                    var data = {
                        fileNo : docFile[i].FILE_NO == null ? docFile[i].file_no : docFile[i].FILE_NO,
                        name: docFile[i].filename == null ? docFile[i].file_org_name + "." + docFile[i].file_ext : docFile[i].filename,
                        size: docFile[i].FILE_SIZE == null ? docFile[i].file_size : docFile[i].FILE_SIZE,
                        extension: docFile[i].FILE_EXT == null ? "." + docFile[i].file_ext : "." + docFile[i].FILE_EXT
                    }
                    console.log("docFile data", data);
                    draft.global.fileUploaded.push(data);
                }
            }
        }
        draft.global.fileUploaded= ([...new Map(draft.global.fileUploaded.map((obj) => [obj["name"], obj])).values()]);
    },

    setKendoUpload : function(){

        const fileArr = ([...new Map(draft.global.fileUploaded.map((obj) => [obj["name"], obj])).values()]);

        console.log("fileArr", fileArr)
        let upload = $("#files").data("kendoUpload");

        if(upload){
            upload.clearAllFiles()
            upload.destroy();
        }

        $("#files").kendoUpload({
            async : {
                saveUrl : "/approval/setApproveDraftFileInit.do",
                removeUrl : "/common/commonFileDel",
                autoUpload : false,
                // batch : true
            },
            files : fileArr,
            localization : {
                select : "파일업로드",
                dropFilesHere : ""
            },
            select: function(e) {
                const files = e.files;
                draft.global.kendoFiles = files;

                if( files.length  > 10 ) {
                    alert("최대 10개의 파일까지 업로드 가능합니다.");
                    e.preventDefault();
                    return false;
                }

                for(let i = 0; i < files.length; i++) {
                    if( files[i].size > 104857600 ) {
                        alert("파일은 최대100MB 까지 업로드 가능합니다.");
                        e.preventDefault();
                        return false;
                    }

                    let fileName = files[i].name;
                    console.log(fileName);

                    if( fileName.indexOf("&#39") != -1 ){
                        alert("파일명에 ' 문자가 있는 경우 파일을 첨부하실 수 없습니다.");
                        e.preventDefault();
                        return false;
                    }
                }
            },
            upload: this.onUpload,
            remove : this.onRemove,
            success : this.onSuccess,
            complete : this.onComplete
        }).data("kendoUpload");
    },

    onUpload(e){
        e.data = draft.global.fileInitData;
    },

    onRemove(e){
        console.log("e");
        console.log(draft.global.params.mod == "W");
        console.log(e.files == undefined)
        /** 상신/재상신 삭제 분기 */
        if(draft.global.params.mod == "W"){
            $(this).parent().parent().remove();
        }else{
            if(e.files != null){
                if(confirm("삭제한 파일은 복구할 수 없습니다.\n그래도 삭제하시겠습니까?")){
                    e.data = {
                        fileNo : e.files[0].fileNo
                    };
                    return;
                    customKendo.fn_customAjax("/common/commonFileDel", e.data);
                }else{
                    e.preventDefault();
                }
            }
        }
    },

    onSuccess : function(e){
        if(e.operation == "upload") {
            draft.global.fileUploadFlag = true;
        }else if(e.operation == "remove"){
            alert(e.XMLHttpRequest.responseJSON.rs.message);
        }

    },

    onComplete : function(e){
        if(!draft.global.fileUploadFlag){
            alert("첨부파일 등록 중 에러가 발생했습니다.");
        }else{
            if(draft.global.draftDocInfo == null || draft.global.draftDocInfo == ""){
                // window.close();
            }
            if(draft.global.uploadFlag){
                alert("처리되었습니다.");
                try {
                    opener.parent.gridReload();
                }catch{

                }
                try{
                    opener.opener.gridReload();
                }catch{

                }
                window.close();
            }
        }
    },

    approvalReturnOrTempData(docId, type){
        draft.global.searchAjaxData = {
            docId : docId,
            cmCodeNm : type
        }

        var result = customKendo.fn_customAjax("/approval/getReturnDocDataInfo", draft.global.searchAjaxData);

        if(result.flag){
            var docFile =  result.docFileList;
            draft.global.comCode = result.comCode;
            var comCode = result.comCode;
            var rs = result.rs;

            if(draft.global.type == "reDrafting"){
                $("#draftBtn").remove();
                $("#btnDiv").prepend("<input type='hidden' id='approveStatCode' name='approveStatCode' value='" + comCode.CM_CODE + "'>" +
                    "<input type='hidden' id='approveStatCodeDesc' name='approveStatCodeDesc' value='" + comCode.CM_CODE_NM + "'>" +
                    '<button type="button" id="draftBtn" name="draft" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base reDraft" onclick="draft.draftInitValidation(this)">' +
                    '	<span class="k-button-text">상신</span>' +
                    '</button>');
            }

            $("#formId").val(rs.docInfo.FORM_ID);
            $("#formName").val(rs.docInfo.FORM_NAME);
            $("#docNo").val(rs.docInfo.DOC_NO);
            $("#atFileSn").val(rs.docInfo.ATFILE_SN);
            $("#docId").val(rs.docInfo.DOC_ID);
            $("#docOpt").val(rs.docInfo.DOC_OPT_ID);
            $("#docTitle").val(rs.docInfo.DOC_TITLE);
            $("#draftOpin").val(rs.docInfo.DRAFT_OPIN);


            $("#publicType").data("kendoRadioGroup").value(rs.docInfo.PUBLIC_TYPE);
            $("#urgentType").data("kendoRadioGroup").value(rs.docInfo.URGENT_TYPE);
            $("#securityType").data("kendoRadioGroup").value(rs.docInfo.SECURITY_TYPE);
            $("#docGbn").data("kendoRadioGroup").value(rs.docInfo.DOC_GBN);
            $("#docGbn").data("kendoRadioGroup").trigger("change");

            $("#aiKeyCode").val(rs.docInfo.AIKEYCODE);
            $("#aiTitle").val(rs.docInfo.AITITLE);

            draft.getDocFileSet(docFile);

            var approveOrder = 0;
            for(var i = 0; i < rs.approveRoute.length; i++){
                if(rs.approveRoute[i].APPROVE_ORDER != 0 && approveOrder < rs.approveRoute[i].APPROVE_ORDER){
                    approveOrder = rs.approveRoute[i].APPROVE_ORDER;
                }

                var apprRoute = {
                    empSeq : $("#empSeq").val(),
                    approveEmpSeq : String(rs.approveRoute[i].APPROVE_EMP_SEQ),
                    approveEmpName : rs.approveRoute[i].APPROVE_EMP_NAME,
                    approveDeptSeq : rs.approveRoute[i].APPROVE_DEPT_SEQ,
                    approveDeptName : rs.approveRoute[i].APPROVE_DEPT_NAME,
                    approvePositionName : rs.approveRoute[i].APPROVE_POSITION_NAME,
                    approveDutyName : rs.approveRoute[i].APPROVE_DUTY_NAME,
                    approveDt : rs.approveRoute[i].APPROVE_DT,
                    approveOrder : rs.approveRoute[i].APPROVE_ORDER,
                    approveType : rs.approveRoute[i].APPROVE_TYPE
                }
                draft.global.approversArr.push(apprRoute);

            }

            draft.global.lastApprover = draft.global.approversArr.find(element => element.approveOrder === approveOrder);

            draft.global.originalApproversArr = draft.global.approversArr;

            var referencesAll = new Array();
            for(var i = 0; i < rs.referencesAll.length; i++){
                referencesAll[i] = {
                    referencesDocId : rs.referencesAll[i].REFERENCES_DOC_ID,
                    referencesDocNo : rs.referencesAll[i].REFERENCES_DOC_NO,
                    referencesDocApproKey : rs.referencesAll[i].REFERENCES_APPRO_KEY,
                    referencesDocTitle : rs.referencesAll[i].REFERENCES_DOC_TITLE,
                    REFERENCES_DOC_TITLE : rs.referencesAll[i].REFERENCES_DOC_TITLE,
                }
            }
            draft.referencesListViewSetData(referencesAll);

            $("#readerName").val(rs.displayReaderName);
            draft.global.readersArr = [];
            for(var i = 0; i < rs.readerAll.length; i++){
                var data = {
                    seqType : rs.readerAll[i].SEQ_TYPE,
                    readerEmpSeq : rs.readerAll[i].READER_EMP_SEQ,
                    readerEmpName : rs.readerAll[i].READER_EMP_NAME,
                    readerDeptSeq : rs.readerAll[i].READER_DEPT_SEQ,
                    readerDeptName : rs.readerAll[i].READER_DEPT_NAME,
                    readerDutyCode : rs.readerAll[i].READER_DUTY_CODE,
                    readerDutyName : rs.readerAll[i].READER_DUTY_NAME,
                    readerPositionCode : rs.readerAll[i].READER_POSITION_CODE,
                    readerPositionName : rs.readerAll[i].READER_POSITION_NAME,
                    empSeq : $("#empSeq").val()
                }
                draft.global.readersArr.push(data);
            }

            if(rs.docInfo.DOC_GBN == "001"){
                $("#receiverName").val(rs.displayReceiverName);
                draft.global.receiversArr = [];
                for(var i = 0; i < rs.receiverAll.length; i++){
                    var data = {
                        seqType : rs.receiverAll[i].SEQ_TYPE,
                        // receiverEmpSeq : rs.receiverAll[i].RECEIVER_EMP_SEQ,
                        // receiverEmpName : rs.receiverAll[i].RECEIVER_EMP_NAME,
                        // receiverDeptSeq : rs.receiverAll[i].RECEIVER_DEPT_SEQ,
                        receiverDeptName : rs.receiverAll[i].RECEIVER_DEPT_NAME,
                        // receiverDutyName : rs.receiverAll[i].RECEIVER_DUTY_NAME,
                        // receiverPositionName : rs.receiverAll[i].RECEIVER_POSITION_NAME,
                        empSeq : $("#empSeq").val()
                    }
                    draft.global.receiversArr.push(data);
                }
            }
        }

        return result.rs.templateFile;
    },

    redirectPurcForm : function(){
        draft.global.windowPopUrl = draft.global.purcParams.befUrl;
        draft.global.popName = $("#approKey").val();
        draft.global.popStyle ="width=1350, height=960, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no";

        window.open(draft.global.windowPopUrl, draft.global.popName, draft.global.popStyle);
        window.close();
    },

    draftInitValidation : function(e) {
        draft.global.flag = true;

        if (draft.global.approversArr.length < 2 && draft.global.approversArr[0].approveType != "2") {
            if(draft.global.approversArr[0].approveEmpSeq == "32"){
                draft.global.approversArr[0].approveType = 2;
            } else {
                alert("결재선을 지정해주세요.");
                draft.global.flag = false;
                return;
            }
        } else if (!$("#docTitle").val()) {
            alert("문서제목을 입력해주세요.");
            draft.global.flag = false;
            return
        } /*else if (!$("#aiKeyCode").val()) {
            alert("기록물철을 선택해주세요.");
            draft.global.flag = false;
            return
        } */else if ($("#files").closest('.k-upload').find('.k-file').length == 0) {
            if (!confirm("첨부된 파일이 없습니다. 계속하시겠습니까?")) {
                draft.global.flag = false;
                return;
            }
        }

        if(draft.global.flag){
            if($(e).hasClass("draft")){
                if(confirm("상신하시겠습니까?")){
                    draft.loading();
                    draft.draftHwpDataInit(e);
                }
            }else{
                if(confirm("재상신하시겠습니까?")){
                    draft.loading();
                    draft.draftHwpDataInit(e);
                }
            }
        }
    },

    docTempInit : function(e){
        hwpDocCtrl.putFieldText('doc_title', $("#docTitle").val());

        draft.draftHwpDataInit(e);
    },

    docTempSave : function(e){
        draft.global.formData = new FormData();

        draft.draftTypeDataSetting(e, "temp", draft.global.formData);

        draft.docApproveLineDataSetting("temp", draft.global.formData);

        $.ajax({
            url : "/approval/setApproveDraftInit",
            type : 'post',
            data : draft.global.formData,
            dataType : "json",
            contentType: false,
            processData: false,
            enctype : 'multipart/form-data',
            async : false,
            success : function (rs){
                $("#loadingDiv").hide();
                document.querySelector('body').style.overflow = 'auto';

                var params = rs.params;
                draft.global.fileInitData = params;

                alert("처리되었습니다.");
                if($("#files").closest('.k-upload').find('.k-file.k-toupload').length > 0){
                    $("#files").data("kendoUpload").upload();
                }else{
                    window.close();
                }
            },
            error : function (){
                alert("처리 중 오류가 발생했습니다.");
            }
        })
    },

    draftHwpDataInit : function(e){
        document.querySelector('body').style.overflow = 'hidden';
        $("#loadingDiv").show();
        $("#loadingText").text("문서를 변환 중 입니다.");

        if(!$("#docNo").val() && !$(e).hasClass("temp")){
            hwpDocCtrl.putFieldText('doc_title', $("#docTitle").val());
        }

        function sleep(sec) {
            return new Promise(resolve => setTimeout(resolve, sec * 1000));
        }

        async function asyncCall() {
            hwpDocCtrl.global.HwpCtrl.GetTextFile("HTML", "", function(data) {
                draft.global.htmlFileTextData = data;
            })

            var i = 1;
            async function getDocDrawCall() {
                i = i + 1;
                hwpDocCtrl.global.HwpCtrl.GetTextFile("HWPML2X", "", function (data) {
                    draft.global.hwpFileTextData = data;
                })
            }

            getDocDrawCall().then(() => {
                (async () => {
                    getDocDrawCall();
                    await sleep(i); // 2초대기

                    if(draft.global.hwpFileTextData == '' || draft.global.hwpFileTextData == null || draft.global.hwpFileTextData == undefined){
                        getDocDrawCall();
                    }

                })();
            });
        }

        asyncCall().then(() => {
            if($(e).hasClass("draft")){
                setTimeout(() => draft.draftInit(e), 2000);
            }else if($(e).hasClass("reDraft")){
                setTimeout(() => draft.reDraftInit(e), 2000);
            }else{
                setTimeout(() => draft.docTempSave(e), 2000);
            }
        });
    },

    draftInit : function(e){

        draft.global.formData = new FormData();

        draft.draftTypeDataSetting(e, draft.global.type, draft.global.formData);

        draft.docApproveLineDataSetting(draft.global.type, draft.global.formData);

        /** 최초 등록 시도 -> 실패 시 재등록 시도 -> 실패시 알림 후 새로고침 */
        $.ajax({
            url : "/approval/setApproveDraftInit",
            type : 'post',
            data : draft.global.formData,
            dataType : "json",
            contentType: false,
            processData: false,
            enctype : 'multipart/form-data',
            async : false,
            success : function (rs){
                if(rs.code == 500){
                    $.ajax({
                        url : "/approval/setApproveDraftInit",
                        type : 'post',
                        data : draft.global.formData,
                        dataType : "json",
                        contentType: false,
                        processData: false,
                        enctype : 'multipart/form-data',
                        async : false,
                        success : function (rs){
                            if(rs.code == 500){
                                alert("네트워크 지연으로 인해 문서 생성에 실패했습니다. 재시도 해주시기 바랍니다.");
                                window.location.reload();
                            }else{
                                var params = rs.params;
                                draft.global.fileInitData = params;

                                if(params.draftDocInfo != null){
                                    if($("#files").closest('.k-upload').find('.k-file.k-toupload').length > 0){
                                        $("#files").data("kendoUpload").upload();
                                    }else{
                                        alert("처리되었습니다.");
                                    }

                                    draft.global.draftDocInfo = params.draftDocInfo;
                                    $("#approveCode").val(draft.global.draftDocInfo.draftUserApproveCode);
                                    $("#approveCodeNm").val(draft.global.draftDocInfo.draftUserApproveCodeDesc);
                                    $("#approveRouteId").val(draft.global.draftDocInfo.draftUserApproveRouteId);

                                    draft.approveKendoSetting();
                                }else{
                                    var result = draft.setAlarmEvent();
                                    if(result.rs != "SUCCESS"){
                                        alert(result.message);return;
                                    }

                                    if($("#files").closest('.k-upload').find('.k-file.k-toupload').length > 0){
                                        draft.global.uploadFlag = true;
                                        $("#files").data("kendoUpload").upload();
                                    }else{
                                        alert("처리되었습니다.");
                                        try {
                                            opener.parent.gridReload();
                                        }catch{

                                        }
                                        try{
                                            opener.opener.gridReload();
                                        }catch{

                                        }
                                        window.close();
                                    }
                                }
                            }
                        },
                        error : function (){
                            alert("처리 중 오류가 발생했습니다.");
                        }
                    })
                }else{
                    var params = rs.params;
                    draft.global.fileInitData = params;

                    if(params.draftDocInfo != null){
                        if($("#files").closest('.k-upload').find('.k-file.k-toupload').length > 0){
                            $("#files").data("kendoUpload").upload();
                        }else{
                            alert("처리되었습니다.");
                        }

                        draft.global.draftDocInfo = params.draftDocInfo;
                        $("#approveCode").val(draft.global.draftDocInfo.draftUserApproveCode);
                        $("#approveCodeNm").val(draft.global.draftDocInfo.draftUserApproveCodeDesc);
                        $("#approveRouteId").val(draft.global.draftDocInfo.draftUserApproveRouteId);

                        draft.approveKendoSetting();
                    }else{
                        var result = draft.setAlarmEvent();
                        if(result.rs != "SUCCESS"){
                            alert(result.message);return;
                        }

                        if($("#files").closest('.k-upload').find('.k-file.k-toupload').length > 0){
                            draft.global.uploadFlag = true;
                            $("#files").data("kendoUpload").upload();
                        }else{
                            alert("처리되었습니다.");
                            try {
                                opener.parent.gridReload();
                            }catch{

                            }
                            try{
                                opener.opener.gridReload();
                            }catch{

                            }
                            window.close();
                        }
                    }
                }
            },
            error : function (){
                alert("처리 중 오류가 발생했습니다.");
            }
        })
    },

    reDraftInit : function(e){
        draft.global.formData = new FormData();

        draft.draftTypeDataSetting(e, "reDrafting", draft.global.formData);

        draft.docApproveLineDataSetting("reDrafting", draft.global.formData);

        $.ajax({
            url : '/approval/setApproveDraftInit',
            type : 'POST',
            data : draft.global.formData,
            dataType : "json",
            contentType: false,
            processData: false,
            enctype : 'multipart/form-data',
            async : false,
            success : function (rs){
                var params = rs.params;
                draft.global.fileInitData = params;

                if(params.draftDocInfo != null){
                    if($("#files").closest('.k-upload').find('.k-file.k-toupload').length > 0){
                        $("#files").data("kendoUpload").upload();
                    }

                    draft.global.draftDocInfo = params.draftDocInfo;
                    $("#approveCode").val(draft.global.draftDocInfo.draftUserApproveCode);
                    $("#approveCodeNm").val(draft.global.draftDocInfo.draftUserApproveCodeDesc);

                    draft.approveKendoSetting();
                }else{
                    var result = draft.setAlarmEvent();
                    if(result.rs != "SUCCESS"){
                        alert(result.message);
                    }

                    if($("#files").closest('.k-upload').find('.k-file.k-toupload').length > 0){
                        draft.global.uploadFlag = true;
                        $("#files").data("kendoUpload").upload();
                    }else{
                        alert("처리되었습니다.");
                        try {
                            opener.parent.gridReload();
                        }catch{

                        }
                        try{
                            opener.opener.gridReload();
                        }catch{

                        }
                        window.close();
                    }
                }
            },
            error : function (){
                alert("처리 중 오류가 발생했습니다.");
            }
        })
    },

    draftTypeDataSetting : function(e, type, formData){
        if(type == "tempDrafting" || type == "drafting"){
            formData.append("type", "draft");
        }else{
            formData.append("type", type);
        }

        formData.append("docFileName", $("#docTitle").val());

        formData.append("compSeq", $("#compSeq").val());
        formData.append("menuCd", $("#menuCd").val());
        formData.append("empSeq", $("#empSeq").val());
        formData.append("linkageType", $("#linkageType").val());
        formData.append("processId", $("#processId").val());
        formData.append("approKey", '');
        if(draft.global.params.linkageType == "2") {
            formData.append("linkageProcessCode", $("#linkageProcessCode").val());
            formData.delete("approKey");
            formData.append("approKey", $("#approKey").val());
        }

        formData.append("formId", $("#formId").val());
        formData.append("formName", $("#formName").val());
        formData.append("docType", $("#docType").val());
        formData.append("docNo", $("#docNo").val());
        formData.append("docId", $("#docId").val());
        formData.append("docTitle", $("#docTitle").val());
        formData.append("docOpt", $("#docOpt").val());
        formData.append("publicType", $("#publicType").getKendoRadioGroup().value());
        formData.append("urgentType", $("#urgentType").getKendoRadioGroup().value());
        formData.append("securityType", $("#securityType").getKendoRadioGroup().value());
        formData.append("docGbn", $("#docGbn").getKendoRadioGroup().value());

        draft.global.hwpFileTextData = draft.global.hwpFileTextData.replace(/UTF-16/g, "UTF-8");
        formData.append("docContent", draft.global.htmlFileTextData);

        formData.append("cmCodeNm", $(e).attr("name"));
        formData.append("draftUserApproveType", draft.global.approversArr.filter(element => element.approveOrder === "0")[0].approveType);
        formData.append("aiKeyCode", $("#aiKeyCode").val());
        formData.append("atFileSn", $("#atFileSn").val());

        /** 파일 STRING DATA */
        formData.append("docHWPFileData", draft.global.hwpFileTextData);


        if(type == "reDrafting"){
            formData.append("approveStatCode", $("#approveStatCode").val());
            formData.append("approveStatCodeDesc", $("#approveStatCodeDesc").val());
        }

        formData.append("draftOpin", $("#draftOpin").val());

        return formData;
    },

    docApproveLineDataSetting : function(type, formData){
        /** 재상신 임시저장시 결재선 변경 여부 확인 */
        if(type == "reDrafting" || ((type == "temp"  || type == "tempDrafting") && draft.global.originalApproversArr.length > 0)){
            const empSeqSort = function(a,b){
                if(a.approveEmpSeq < b.approveEmpSeq){
                    return -1
                }else if(a.approveEmpSeq > b.approveEmpSeq){
                    return 1;
                }else{
                    return 0;
                }
            }

            /** 결재선 변경 여부 검사 */
            const compareArray = function(a, b){
                if(JSON.stringify(a) == JSON.stringify(b)){
                    return "N";
                }else{
                    return "Y";
                }
            }

            draft.global.originalApproversArr.sort(empSeqSort);
            draft.global.approversArr.sort(empSeqSort);

            // console.log(compareArray(originalApproversArr, approversArr));
            formData.append("approversRouteChange", compareArray(draft.global.originalApproversArr, draft.global.approversArr));

            /** 재상신 임시저장시 결재선 변경 여부 확인 후 마지막 결재자 업데이트 */
            if(compareArray(draft.global.originalApproversArr, draft.global.approversArr) == "Y"){
                formData.append("lastApproveEmpSeq", draft.global.lastApprover.approveEmpSeq);
                formData.append("lastApproveType", draft.global.lastApprover.approveType);
            }
        }

        if(draft.global.formData.get("approversRouteChange") == null){
            formData.append("approversRouteChange", "N");
        }

        /** 결재라인 */
        formData.append("approversArr", JSON.stringify(draft.global.approversArr));

        /** 참조문서 */
        if(draft.global.referencesArr.length > 0){
            formData.append("referencesArr", JSON.stringify(draft.global.referencesArr));
        }

        /** 열람자 */
        if(draft.global.readersArr.length > 0) {
            formData.append("readersArr", JSON.stringify(draft.global.readersArr));
        }

        if($("#docGbn").getKendoRadioGroup().value() == "001"){
            /** 수신자 */
            if(draft.global.receiversArr.length > 0) {
                formData.append("receiversArr", JSON.stringify(draft.global.receiversArr.filter(e => e.receiverEmpName != "")));
            }
        }

        if(type == "drafting" || type == "tempDrafting" || draft.global.lastApprover != null){
            formData.append("lastApproveEmpSeq", draft.global.lastApprover.approveEmpSeq);
            formData.append("lastApproveType", draft.global.lastApprover.approveType);
        }

        return formData;
    },

    approveKendoSetting : function(){
        $.LoadingOverlay("hide", {});

        const signField = "appr2";
        if(hwpDocCtrl.fieldExist(signField)){
            if(draft.global.params.formId != "96"){
                hwpApprovalLine.setSign(signField, $("#approveEmpSeq").val(), $("#approveEmpName").val());
            }else{
                hwpApprovalLine.setTranscript(signField, $("#approveEmpSeq").val(), $("#approveEmpName").val());
            }
        }

        if($("#formId").val() == "1" && $("#docGbn").data("kendoRadioGroup").value() == "001" && hwpDocCtrl.fieldExist("인")){
            /** 외부시행문서 일경우 직인 */
            if(hwpDocCtrl.global.HwpCtrl.FieldExist("인")){
                hwpDocCtrl.global.HwpCtrl.MoveToField('인', true, true, false);
                hwpDocCtrl.global.HwpCtrl.InsertBackgroundPicture(
                    "SelectedCell",
                    "http://218.158.231.184/upload/journeyman/companySignature.png",
                    1,
                    6,
                    0,
                    0,
                    0,
                    0
                );
            }
        }

        $("#approveEmpName").kendoTextBox({
            readonly : true
        });
        $("#approveOpin").kendoTextArea({
            rows:5,
            cols:10,
            resizable: "vertical"
        });

        $('#approveModal').data('kendoWindow').open();
    },

    docApprove : function(){
        draft.loading();

        draft.global.searchAjaxData = {
            type : draft.global.type,
            docId : draft.global.draftDocInfo.DOC_ID,
            deptSeq : $("#deptSeq").val(),
            docType : $("#docType").val()
        }

        var result = customKendo.fn_customAjax("/approval/getDeptDocNum", draft.global.searchAjaxData);
        if(result.flag){
            $("#docNo").val(result.rs.docNo);

            hwpDocCtrl.putFieldText('doc_title', $("#docTitle").val());
            if(draft.global.lastApprover.approveEmpSeq == $("#empSeq").val()){
                hwpDocCtrl.putFieldText("DOC_NUM", result.rs.docNo);
            }
        }

        hwpDocCtrl.global.HwpCtrl.GetTextFile("HWPML2X", "", function(data) {
            draft.global.hwpFileTextData = data;
        })

        hwpDocCtrl.global.HwpCtrl.GetTextFile("HTML", "", function(data) {
            draft.global.htmlFileTextData = data;
        })

        setTimeout(() => draft.docApproveAjax(), 5000);
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

    docApproveAjax : function(){
        $.ajax({
            url : "/approval/setDocApproveNReturn",
            type : "POST",
            data : draft.makeApprovalFormData("approve"),
            dataType : "json",
            contentType: false,
            processData: false,
            enctype : 'multipart/form-data',
            async : false,
            success : function(){
                alert("결재되었습니다.");
                try {
                    opener.parent.gridReload();
                }catch{

                }
                try{
                    opener.opener.gridReload();
                }catch{

                }
                window.close();
            },
            error : function(){
                alert("결재 중 에러가 발생했습니다.");
            }
        })
    },

    setAlarmEvent : function (){
        var returnVal = "";
        console.log("draft.global.approversArr", draft.global.approversArr);

        for(var i = 0 ; i < draft.global.approversArr.length; i ++){
            if(draft.global.approversArr[i].approveOrder != 0 && draft.global.approversArr[i].approveOrder == 1){
                draft.global.saveAjaxData = {
                    ntTitle : "[결재도착] 기안자 : " + (draft.global.fileInitData.draftEmpName == null ? $("#empName").val() : draft.global.fileInitData.draftEmpName),
                    ntContent : draft.global.fileInitData.docTitle,
                    recEmpSeq : draft.global.approversArr[i].approveEmpSeq,
                    ntUrl : "/approval/approvalDocView.do?docId=" + draft.global.fileInitData.DOC_ID + "&mod=V&menuCd=" + draft.global.fileInitData.menuCd + "&approKey=" + draft.global.fileInitData.approKey
                }

                var result = customKendo.fn_customAjax("/common/setAlarm", draft.global.saveAjaxData);
                if(result.flag){
                    socket.send(
                        draft.global.saveAjaxData.ntTitle + "," +
                        draft.global.saveAjaxData.recEmpSeq + "," +
                        draft.global.saveAjaxData.ntContent + "," +
                        draft.global.saveAjaxData.ntUrl + "," +
                        result.alId
                    )
                }
                returnVal = result;
            }
        }

        return returnVal;
    },

    makeApprovalFormData(type){
        draft.global.formData = new FormData();
        draft.global.formData.append("type", type);
        draft.global.formData.append("formId", $("#formId").val());
        draft.global.formData.append("menuCd", $("#menuCd").val());
        draft.global.formData.append("docId", draft.global.draftDocInfo.DOC_ID);
        draft.global.formData.append("linkageProcessCode", draft.global.draftDocInfo.APPRO_KEY.split("_")[0]);
        draft.global.formData.append("approKey", draft.global.draftDocInfo.APPRO_KEY);
        draft.global.formData.append("atFileSn", draft.global.draftDocInfo.ATFILE_SN);

        /** 한글 기안기 html 데이터 */
        draft.global.hwpFileTextData = draft.global.hwpFileTextData.replace(/UTF-16/g, "UTF-8");
        draft.global.formData.append("docContent", draft.global.htmlFileTextData);

        /** 한글 기안기 HWP 데이터 */
        draft.global.formData.append("docHWPFileData", draft.global.hwpFileTextData);

        draft.global.formData.append("docFileName", $("#docTitle").val());
        draft.global.formData.append("empSeq", $("#approveEmpSeq").val());

        draft.global.formData.append("approveRouteId", $("#approveRouteId").val());
        draft.global.formData.append("approveOrder", $("#approveOrder").val());
        draft.global.formData.append("approveStatCode", $("#approveCode").val());
        draft.global.formData.append("approveStatCodeDesc", $("#approveCodeNm").val());
        draft.global.formData.append("approveEmpSeq", $("#approveEmpSeq").val());
        draft.global.formData.append("approveEmpName", $("#approveEmpName").val());
        draft.global.formData.append("approveOpin", $("#approveOpin").val());

        return draft.global.formData;
    },


    setFileForm : function (params){
        console.log("params", params);
        var data = {}

        if(params.menuCd == "bustrip"){
            data.hrBizReqId = params.APPRO_KEY.split("_")[1];
            let result = customKendo.fn_customAjax("/bustrip/getFileList", {
                hrBizReqId: data.hrBizReqId
            });
            console.log(result);
            draft.getDocFileSet(result.fileInfo);
            draft.setKendoUpload();
        }

        if(params.menuCd == "bustripRes"){
            data.hrBizReqResultId = params.APPRO_KEY.split("_")[1];
            let result = customKendo.fn_customAjax("/bustrip/getResultFileList", {
                hrBizReqResultId: data.hrBizReqResultId
            });

            const cardResult = customKendo.fn_customAjax("/bustrip/getCardList", {
                hrBizReqResultId: data.hrBizReqResultId
            });

            let tempArr = [];
            let count = 0;
            const bustripList = result.fileInfo;
            const cardList = cardResult.list;

            for(let i=0; i<bustripList.length; i++){
                tempArr[count] = bustripList[i];
                count ++;
            }

            for(let i=0; i<cardList.length; i++){
                if(cardList[i].FILE_NO != null){
                    const fileData = customKendo.fn_customAjax("/common/getFileInfo", {
                        fileNo: cardList[i].FILE_NO
                    }).data;
                    tempArr[count] = fileData;
                    count ++;
                }
            }
            draft.getDocFileSet(tempArr);
            draft.setKendoUpload();
        }

        if(params.menuCd == "delv") {
            data.pjtSn = params.APPRO_KEY.split("_")[1];
            let result = customKendo.fn_customAjax("/project/engn/getDelvData", {
                pjtSn: data.pjtSn
            });
            console.log(result);
            let tempArr = [];
            tempArr[0] = result.delvFile;
            draft.getDocFileSet(tempArr);
            draft.setKendoUpload();
        }

        if(params.menuCd == "rndDelv") {
            data.pjtSn = params.APPRO_KEY.split("_")[1];
            let result = customKendo.fn_customAjax("/projectRnd/getRndDetail", {
                pjtSn: data.pjtSn
            });
            console.log(result);
            let tempArr = [];
            tempArr[0] = result.map;
            draft.getDocFileSet(tempArr);
            draft.setKendoUpload();
        }

        if(params.menuCd == "unRndDelv") {
            data.pjtSn = params.APPRO_KEY.split("_")[1];
            let result = customKendo.fn_customAjax("/projectUnRnd/getUnRndDetail", {
                pjtSn: data.pjtSn
            });
            console.log(result);
            let tempArr = [];
            tempArr[0] = result.map;
            draft.getDocFileSet(tempArr);
            draft.setKendoUpload();
        }

        if(params.menuCd == "dev") {
            data.devSn = params.APPRO_KEY.split("_")[1];

            let pjtSn = customKendo.fn_customAjax("/project/getPjtSnToDev", {
                devSn: data.devSn
            }).rs.PJT_SN;

            let result = customKendo.fn_customAjax("/project/engn/getDelvData", {
                pjtSn: pjtSn
            });
            console.log(result);
            let tempArr = [];
            tempArr[0] = result.delvFile;
            draft.getDocFileSet(tempArr);
            draft.setKendoUpload();
        }

        if(params.menuCd == "rndDev") {
            data.devSn = params.APPRO_KEY.split("_")[1];

            let pjtSn = customKendo.fn_customAjax("/project/getPjtSnToDev", {
                devSn: data.devSn
            }).rs.PJT_SN;

            let result = customKendo.fn_customAjax("/projectRnd/getRndDetail", {
                pjtSn: pjtSn
            });
            console.log(result);
            let tempArr = [];
            tempArr[0] = result.map;
            draft.getDocFileSet(tempArr);
            draft.setKendoUpload();
        }

        if(params.menuCd == "unRndDev") {
            data.devSn = params.APPRO_KEY.split("_")[1];

            let pjtSn = customKendo.fn_customAjax("/project/getPjtSnToDev", {
                devSn: data.devSn
            }).rs.PJT_SN;

            let result = customKendo.fn_customAjax("/projectUnRnd/getUnRndDetail", {
                pjtSn: pjtSn
            });
            console.log(result);
            let tempArr = [];
            tempArr[0] = result.map;
            draft.getDocFileSet(tempArr);
            draft.setKendoUpload();
        }

        if(params.menuCd == "pjtRes") {
            data.pjtSn = params.APPRO_KEY.split("_")[1];

            /** 견적서 */
            let result = customKendo.fn_customAjax("/project/engn/getDelvData", {
                pjtSn: data.pjtSn
            });

            /** 공정 */
            let result2 = customKendo.fn_customAjax("/project/getPsList", {
                pjtSn: data.pjtSn
            });

            /** 설계이미지, 제작이미지*/
            let result4 = customKendo.fn_customAjax("/project/engn/getResultInfo", {
                pjtSn: data.pjtSn
            });

            /** 구매요청서 */
            /*let result5 = customKendo.fn_customAjax("/purc/getProjectReqFile", {
                pjtSn: data.pjtSn
            });*/

            console.log(result2);
            let tempArr = [];
            tempArr[0] = result.delvFile;

            let count = 1;
            if(result2.psFileList != null){
                var pf1 = result2.psFileList.psFile1List;
                var pf2 = result2.psFileList.psFile2List;
                var pf3 = result2.psFileList.psFile3List;
                var pf4 = result2.psFileList.psFile4List;
                var pf5 = result2.psFileList.psFile5List;
                var pf6 = result2.psFileList.psFile6List;

                for(var i = 0; i < pf1.length; i++){
                    tempArr[count] = pf1[i];
                    count ++;
                }
                for(var i = 0; i < pf2.length; i++){
                    tempArr[count] = pf2[i];
                    count ++;
                }
                for(var i = 0; i < pf3.length; i++){
                    tempArr[count] = pf3[i];
                    count ++;
                }
                for(var i = 0; i < pf4.length; i++){
                    tempArr[count] = pf4[i];
                    count ++;
                }
                for(var i = 0; i < pf5.length; i++){
                    tempArr[count] = pf5[i];
                    count ++;
                }
                for(var i = 0; i < pf6.length; i++){
                    tempArr[count] = pf6[i];
                    count ++;
                }
            }

            tempArr[count] = result4.result.designFileList;
            count ++;
            tempArr[count] = result4.result.prodFileList;
            count ++;

            /*const purcList = result5.list;
            for(let i=0; i<purcList.length; i++){
                tempArr[count] = purcList[i];
                count ++;
            }*/


            draft.getDocFileSet(tempArr);
            draft.setKendoUpload();
        }

        if(params.menuCd == "rndRes") {
            data.pjtSn = params.APPRO_KEY.split("_")[1];

            /** 견적서 */
            let result = customKendo.fn_customAjax("/projectRnd/getRndDetail", {
                pjtSn: data.pjtSn
            });

            /** 공정 */
            let result2 = customKendo.fn_customAjax("/project/getPsList", {
                pjtSn: data.pjtSn
            });

            /** 설계이미지, 제작이미지*/
            let result4 = customKendo.fn_customAjax("/project/engn/getResultInfo", {
                pjtSn: data.pjtSn
            });

            /** 구매요청서 */
            /*let result5 = customKendo.fn_customAjax("/purc/getProjectReqFile", {
                pjtSn: data.pjtSn
            });*/

            console.log(result2);
            let tempArr = [];
            tempArr[0] = result.map;

            let count = 1;
            if(result2.psFileList != null){
                var pf1 = result2.psFileList.psFile1List;
                var pf2 = result2.psFileList.psFile2List;
                var pf3 = result2.psFileList.psFile3List;
                var pf4 = result2.psFileList.psFile4List;
                var pf5 = result2.psFileList.psFile5List;
                var pf6 = result2.psFileList.psFile6List;

                for(var i = 0; i < pf1.length; i++){
                    tempArr[count] = pf1[i];
                    count ++;
                }
                for(var i = 0; i < pf2.length; i++){
                    tempArr[count] = pf2[i];
                    count ++;
                }
                for(var i = 0; i < pf3.length; i++){
                    tempArr[count] = pf3[i];
                    count ++;
                }
                for(var i = 0; i < pf4.length; i++){
                    tempArr[count] = pf4[i];
                    count ++;
                }
                for(var i = 0; i < pf5.length; i++){
                    tempArr[count] = pf5[i];
                    count ++;
                }
                for(var i = 0; i < pf6.length; i++){
                    tempArr[count] = pf6[i];
                    count ++;
                }
            }

            tempArr[count] = result4.result.designFileList;
            count ++;
            tempArr[count] = result4.result.prodFileList;
            count ++;

            /*const purcList = result5.list;
            for(let i=0; i<purcList.length; i++){
                tempArr[count] = purcList[i];
                count ++;
            }*/
            draft.getDocFileSet(tempArr);
            draft.setKendoUpload();
        }

        if(params.menuCd == "unRndRes") {
            data.pjtSn = params.APPRO_KEY.split("_")[1];

            /** 견적서 */
            let result = customKendo.fn_customAjax("/projectUnRnd/getUnRndDetail", {
                pjtSn: data.pjtSn
            });

            /** 공정 */
            let result2 = customKendo.fn_customAjax("/project/getPsList", {
                pjtSn: data.pjtSn
            });

            /** 설계이미지, 제작이미지*/
            let result4 = customKendo.fn_customAjax("/project/engn/getResultInfo", {
                pjtSn: data.pjtSn
            });

            /** 구매요청서 */
            /*let result5 = customKendo.fn_customAjax("/purc/getProjectReqFile", {
                pjtSn: data.pjtSn
            });*/

            console.log(result2);
            let tempArr = [];
            tempArr[0] = result.map;

            let count = 1;
            if(result2.psFileList != null){
                var pf1 = result2.psFileList.psFile1List;
                var pf2 = result2.psFileList.psFile2List;
                var pf3 = result2.psFileList.psFile3List;
                var pf4 = result2.psFileList.psFile4List;
                var pf5 = result2.psFileList.psFile5List;
                var pf6 = result2.psFileList.psFile6List;

                for(var i = 0; i < pf1.length; i++){
                    tempArr[count] = pf1[i];
                    count ++;
                }
                for(var i = 0; i < pf2.length; i++){
                    tempArr[count] = pf2[i];
                    count ++;
                }
                for(var i = 0; i < pf3.length; i++){
                    tempArr[count] = pf3[i];
                    count ++;
                }
                for(var i = 0; i < pf4.length; i++){
                    tempArr[count] = pf4[i];
                    count ++;
                }
                for(var i = 0; i < pf5.length; i++){
                    tempArr[count] = pf5[i];
                    count ++;
                }
                for(var i = 0; i < pf6.length; i++){
                    tempArr[count] = pf6[i];
                    count ++;
                }
            }

            tempArr[count] = result4.result.designFileList;
            count ++;
            tempArr[count] = result4.result.prodFileList;
            count ++;

            /*const purcList = result5.list;
            for(let i=0; i<purcList.length; i++){
                tempArr[count] = purcList[i];
                count ++;
            }*/
            draft.getDocFileSet(tempArr);
            draft.setKendoUpload();
        }

        if(params.menuCd == "payApp") {
            data.payAppSn = params.APPRO_KEY.split("_")[1];

            let result = customKendo.fn_customAjax("/payApp/pop/getPayAppData", {
                payAppSn: data.payAppSn
            });
            console.log("항목 리스트 조회");
            console.log(result);
            const rs = result.map;
            const ls = result.list;
            const fileList = result.fileList;

            let attCount = 0;
            let tempArr = [];
            for(let j=0; j< fileList.length; j++){
                tempArr[attCount] = fileList[j];
                attCount++;
            }
            draft.getDocFileSet(tempArr);
            draft.setKendoUpload();
        }

        if(params.menuCd == "payIncp") {
            data.payIncpSn = params.APPRO_KEY.split("_")[1];

            let result = customKendo.fn_customAjax("/payApp/pop/getPayIncpData", {
                payIncpSn: data.payIncpSn
            });
            console.log("항목 리스트 조회");
            console.log(result);
            const rs = result.map;
            const ls = result.list;
            const fileList = result.fileList;

            let attCount = 0;
            let tempArr = [];
            for(let j=0; j< fileList.length; j++){
                tempArr[attCount] = fileList[j];
                attCount++;
            }
            draft.getDocFileSet(tempArr);
            draft.setKendoUpload();
        }

        if(params.menuCd == "exnp") {
            data.exnpSn = params.APPRO_KEY.split("_")[1];

            let result = customKendo.fn_customAjax("/payApp/pop/getApprovalExnpFileData", {
                exnpSn: data.exnpSn
            });
            console.log("항목 리스트 조회");
            console.log(result);
            const rs = result.map;
            const ls = result.list;
            const fileList = result.fileList;

            let attCount = 0;
            let tempArr = [];
            for(let j=0; j< fileList.length; j++){
                tempArr[attCount] = fileList[j];
                attCount++;
            }
            draft.getDocFileSet(tempArr);
            draft.setKendoUpload();
        }



        if(params.menuCd == "purc") {
            data.purcSn = params.APPRO_KEY.split("_")[1];

            let result = customKendo.fn_customAjax("/purc/getPurcReq.do", {
                purcSn: data.purcSn
            });
            console.log("항목 리스트 조회");
            console.log(result);
            const fileList = result.data.purcFile;

            if(fileList != null){
                let attCount = 0;
                let tempArr = [];
                for(let j=0; j< fileList.length; j++){
                    tempArr[attCount] = fileList[j];
                    attCount++;
                }
                draft.getDocFileSet(tempArr);
                draft.setKendoUpload();
            }
        }

        if(params.menuCd == "claim") {
            data.claimSn = params.APPRO_KEY.split("_")[1];

            let result = customKendo.fn_customAjax("/purc/getPurcClaimData", {
                claimSn: data.claimSn
            });
            console.log("항목 리스트 조회");
            console.log(result);
            const fileList = result.data.purcFile;

            if(fileList != null){
                let attCount = 0;
                let tempArr = [];
                for(let j=0; j< fileList.length; j++){
                    tempArr[attCount] = fileList[j];
                    attCount++;
                }
                draft.getDocFileSet(tempArr);
                draft.setKendoUpload();
            }
        }

        if(params.menuCd == "campus"){
            let url = "";
            let result = "";
            data.eduInfoId = params.APPRO_KEY.split("_")[1];

            if(params.APPRO_KEY.split("_")[0] == "camticEducation"){
                result = customKendo.fn_customAjax("/campus/getEduInfoOne", {
                    eduInfoId: data.eduInfoId
                });
            } else if(params.APPRO_KEY.split("_")[0] == "camticEducationRes"){
                result = customKendo.fn_customAjax("/campus/getEduResultOne", {
                    eduInfoId: data.eduInfoId
                });
            }

            console.log("항목 리스트 조회");
            console.log(result);
            const fileList = result.fileInfo;

            if(fileList != null){
                let attCount = 0;
                let tempArr = [];
                for(let j=0; j< fileList.length; j++){
                    tempArr[attCount] = fileList[j];
                    attCount++;
                }
                draft.getDocFileSet(tempArr);
                draft.setKendoUpload();
            }
        }

        if(params.menuCd == "study" || params.menuCd == "propag" || params.menuCd == "ojt"){
            let result = customKendo.fn_customAjax("/common/getFileList", {
                contentId : "studyInfo_" + params.APPRO_KEY.split("_")[1],
                fileCd : "studyInfo"
            });
            console.log("항목 리스트 조회");
            console.log(result);
            const fileList = result.list;

            if(fileList != null){
                let attCount = 0;
                let tempArr = [];
                for(let j=0; j< fileList.length; j++){
                    tempArr[attCount] = fileList[j];
                    attCount++;
                }
                draft.getDocFileSet(tempArr);
                draft.setKendoUpload();
            }
        }

        if(params.type == "reDrafting"){
            const fileList = customKendo.fn_customAjax("/approval/getDocAttachmentList", {
                docId : params.docId
            }).list;

            if(fileList != null){
                let attCount = 0;
                let tempArr = [];
                for(let j=0; j< fileList.length; j++){
                    tempArr[attCount] = fileList[j];
                    attCount++;
                }
                draft.getDocFileSet(tempArr);
                draft.setKendoUpload();
            }
        }
    }
}