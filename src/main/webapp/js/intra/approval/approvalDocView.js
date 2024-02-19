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

    fnDefaultScript : function(params, rs, loginVO){
        document.querySelector('body').style.overflow = 'hidden';
        $("#loadingText").text("문서를 불러오는 중입니다.");

        docView.global.params = params;
        docView.global.rs = rs;
        docView.global.loginVO = loginVO;
        docView.global.mod = params.mod;

        if(rs.docInfo.SECURITY_TYPE == "009"){
            docView.readPermissionChk(loginVO, params);
        }

        /** 반려시 반려사유 확인 버튼 생성 */
        if(rs.docInfo.APPROVE_STAT_CODE == "30"){
            $("#docApprovalOpinView2Btn").show();
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
        if(!result.confirm && (docView.global.rs.approveNowRoute != null && docView.global.rs.approveNowRoute.SUB_APPROVAL != 'Y')){
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
            width : 600,
            position : {
                top : 50,
                left : 200
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
                                "</span>";;
                    }
                }, {
                    template : function(e){
                        if(e.FILE_EXT == "pdf" || e.FILE_EXT == "png" || e.FILE_EXT == "PNG" || e.FILE_EXT == "jpg" || e.FILE_EXT == "JPEG" || e.FILE_EXT == "gif"){
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
        docView.loading();

        docView.documentHwpDataCtrl();

        setTimeout(() => docView.documentHwpSave(), 1000);

        setTimeout(() => docView.docApproveAjax(), 1500);
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
        docView.documentHwpSave();

        setTimeout(() => docView.docReturnAjax(), 500);
    },

    docReturnAjax : function(){
        if($("#returnOpin").val() == ""){
            alert("반려의견을 입력해주세요."); return;
        }

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
        /** TODO. 문서번호 임시
         * 문서번호 관련 최종적으로 어떻게 할지 정의 필요
         * */
        hwpDocCtrl.putFieldText("DOC_NUM", docView.global.rs.docInfo.DOC_NO);

        if(docView.global.rs.docInfo.FORM_ID != "1"){
            /** 결재 사인 */
            if(docView.global.rs.approveNowRoute.APPROVE_TYPE != 1){
                hwpApprovalLine.setHwpApprovalSignPut();

            /** 협조 사인 */
            }else{
                for(var i = 0; i < 2; i ++){
                    const signField = "cAppr" + i;
                    if(hwpDocCtrl.fieldExist(signField)){
                        if(hwpDocCtrl.getFieldText(signField) == ""){
                            hwpApprovalLine.setSign(signField, docView.global.rs.approveNowRoute.APPROVE_EMP_SEQ, docView.global.rs.approveNowRoute.APPROVE_EMP_NAME, "view");
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
                        if(e.APPROVE_STAT_CODE == "20"){
                            return "결재의견";
                        }else if(e.APPROVE_STAT_CODE == "30"){
                            return "반려의견";
                        }else if(e.APPROVE_STAT_CODE == "100"){
                            return "최종결재의견";
                        }else if(e.APPROVE_STAT_CODE == "101"){
                            return "최종결재(전결)의견";
                        }
                    }
                }, {
                    field : "APPROVE_EMP_NAME",
                    title: "작성자",
                    template : function(e){
                        if(e.PROXY_TYPE == "Y"){
                            return "[대결] " + e.PROXY_APPROVE_EMP_NAME;
                        }else{
                            return e.APPROVE_EMP_NAME
                        }
                    }
                },{
                    field : "APPROVE_OPIN",
                    title: "의견",
                    template : function(e){
                        if(e.APPROVE_STAT_CODE == 10){
                            return "-";
                        }else{
                            return e.APPROVE_OPIN;
                        }
                    }
                },{
                    field : "APPROVE_DT",
                    title: "작성일",
                },{
                    field : "PROXY_TYPE",
                    title: "비고",
                    template : function(e){
                        if(e.PROXY_TYPE == "Y"){
                            return "원결재 : [" + e.APPROVE_DUTY_NAME+ "] " + e.APPROVE_EMP_NAME;
                        }else{
                            return ""
                        }
                    },
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
        $("#opinReason").text(opinText);
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
                    width : 80
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
                    title: "부서",
                    template : function(e){
                        return e.DEPT_FULL_NAME
                    }
                },{
                    field : "APPROVE_DUTY_NAME",
                    title: "직위",
                    template : function(e){
                        if(e.PROXY_TYPE == "Y"){
                            return e.PROXY_APPROVE_DUTY_NAME;
                        }else{
                            return e.APPROVE_POSITION_NAME
                        }
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
                        if(e.APPROVE_DT == null){
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
                    title: "부서",
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
                formData.append("approveEmpSeq", $("#approveEmpSeq").val());
            }
        }else if(type == "cancel"){
            formData.append("approveOrder", docView.global.rs.approvePrevRoute.APPROVE_ORDER);
            formData.append("approveEmpSeq", docView.global.loginVO.uniqId);
        }
        formData.append("atFileSn", docView.global.rs.docInfo.ATFILE_SN);

        /** 파일 STRING DATA */
        formData.append("docFileName", docView.global.rs.docInfo.DOC_TITLE);
        formData.append("empSeq", $("#approveEmpSeq").val());

        formData.append("docHWPFileData", docView.global.hwpFileTextData);

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
                    $("#approvalCancelBtn").show();
                }else if(!docView.global.rs.approvePrevRoute.PROXY_APPROVE_EMP_SEQ && docView.global.rs.approvePrevRoute.APPROVE_EMP_SEQ == docView.global.loginVO.uniqId){
                    $("#approvalCancelBtn").show();
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
        $("#docGbnKr").text(docView.global.rs.docInfo.DOC_GBN_KR);
        $("#aiTitle").text(docView.global.rs.docInfo.AITITLE);

        if(docView.global.rs.docInfo.DOC_GBN == '001'){
            $("#receiverNameTr").show();
            $("#receiverNameTd").text(docView.global.rs.displayReceiverName);
        }

        $("#readerNameTd").text(docView.global.rs.displayReaderName);

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
