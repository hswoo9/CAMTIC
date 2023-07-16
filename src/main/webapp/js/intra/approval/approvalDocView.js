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

        $(document).ready(function() {
            docView.global.hwpCtrl = BuildWebHwpCtrl("hwpApproveContent", docView.global.params.hwpUrl, function () {docView.editorComplete();});
            window.onresize();
        });

        window.onresize = function () {docView.resize()};

        docView.setKendo();

        docView.initBtn();
        docView.initData();
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

        $("#approveHistModal").kendoWindow({
            title: "결재이력",
            visible: false,
            modal: true,
            width : 800,
            position : {
                top : 50,
                left : 100
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
                    attributes: { style: "text-align: left;cursor: pointer;"},
                    template : function(e){
                        return fileImgTag(e.FILE_EXT) + " <spen style='vertical-align: bottom;'>" + e.filename + "(" + formatBytes(e.FILE_SIZE, 3) + ")</spen>";
                    }
                }]
        }).data("kendoGrid");

        $("#checkAll").click(function(){
            if($(this).is(":checked")) $("input[name=filePk]").prop("checked", true);
            else $("input[name=filePk]").prop("checked", false);
        });
    },

    onDataBound : function(){
        var grid = this;

        grid.tbody.find("tr").click(function (e) {
            var dataItem = grid.dataItem($(this));
            docView.docAttachmentDown("single", dataItem.FILE_DOWN_PATH + dataItem.fileUUID, dataItem.filename);
        });
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

        var result = customKendo.fn_customAjax("/approval/setDocApproveRouteReadDt", docView.global.searchAjaxData);

        if(!result.flag){
            alert("시스템 오류가 발생했습니다.");
        }
    },

    setDocReaderReadUser : function(){
        docView.global.searchAjaxData = {
            docId : docView.global.rs.docInfo.DOC_ID,
            groupSeq : docView.global.loginVO.groupSeq,
            compSeq : docView.global.loginVO.organId,
            empSeq : docView.global.loginVO.uniqId,
            deptSeq : docView.global.loginVO.orgnztId,
        }

        var result = customKendo.fn_customAjax("/approval/setDocReaderReadUser", docView.global.searchAjaxData);

        if(!result.flag){
            alert("시스템 오류가 발생했습니다.");
        }
    },

    docApprove : function(){
        docView.documentHwpDataCtrl($("#approveCode").val(), docView.global.rs.approveNowRoute.APPROVE_ORDER, docView.global.dataType.nowCom + "(" + $("#approveCodeNm").val() + ")");

        setTimeout(() => docView.docApproveAjax(), 200);
    },

    docApproveAjax : function(){
        docView.global.searchAjaxData = docView.makeApprovalFormData("approve");
        var result = customKendo.fn_customFormDataAjax("/approval/setDocApproveNReturn", docView.global.searchAjaxData);

        if(result.flag) {
            alert("결재되었습니다.");

            //var result = docView.setAlarmEvent("approve")
            //if(result.flag){
            //    if(result.rs!= "SUCCESS") {
            //        alert(result.message);
            //    }
            //}
            try {
                opener.parent.gridReload();
            }catch (e) {

            }
            window.close();
        }else{
            alert("결재 중 에러가 발생했습니다.");
        }
    },

    docApproveCancel : function(){
        if(confirm("결재취소 하시겠습니까?")){
            docView.documentHwpDataCtrl("cancel", docView.global.rs.approvePrevRoute.APPROVE_ORDER, "\n");

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
        docView.documentHwpDataCtrl($("#approveCode").val() , docView.global.rs.approveNowRoute.APPROVE_ORDER, docView.global.dataType.nowCom + "(반려)");

        setTimeout(() => docView.docReturnAjax(), 200);
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

    documentHwpDataCtrl : function(code, order, text){
        if(docView.global.rs.approveNowRoute.APPROVE_TYPE == 1){
            var flag = false;

            for(var i = 0; i < docView.global.rs.approveRoute.length; i ++){
                if(hwpDocCtrl.fieldExist("cooperation" + i)){
                    if(hwpDocCtrl.getFieldText("cooperation" + i) == docView.global.rs.approveNowRoute.APPROVE_EMP_NAME){
                        hwpDocCtrl.putFieldText('cooperation_st' + i, text);
                        flag = true;
                    }
                }

                if(flag){
                    return;
                }
            }
        }else{
            hwpDocCtrl.putFieldText('approval_st' + order, text);
        }


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

    docApprovalRouteHistView : function(e){
        docView.global.searchAjaxData = {
            docId : docView.global.rs.docInfo.DOC_ID
        }

        $("#approveHistModalGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2("/approval/getDocApproveStatusHistList", docView.global.searchAjaxData, 100),
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
                }, {
                    field : "APPROVE_EMP_NAME",
                    title: "이름",
                    template : function(e){
                        if(e.PROXY_TYPE == "Y"){
                            return "[대결] " + e.PROXY_APPROVE_EMP_NAME;
                        }else{
                            return e.APPROVE_EMP_NAME
                        }
                    }
                },{
                    field : "APPROVE_DEPT_NAME",
                    title: "부서",
                    template : function(e){
                        if(e.PROXY_TYPE == "Y"){
                            return e.PROXY_APPROVE_DEPT_NAME;
                        }else{
                            return e.APPROVE_DEPT_NAME
                        }
                    }
                },{
                    field : "APPROVE_DUTY_NAME",
                    title: "직책(직위)",
                    template : function(e){
                        if(e.PROXY_TYPE == "Y"){
                            return e.PROXY_APPROVE_DUTY_NAME;
                        }else{
                            return e.APPROVE_DUTY_NAME
                        }
                    }
                },{
                    field : "DOC_READ_DT",
                    title: "열람일시",
                },{
                    field : "APPROVE_DT",
                    title: "결재일시",
                },{
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
                }]
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
                    field : "COMP_NAME",
                    title: "회사",
                    width : 180
                }, {
                    field : "DEPT_NAME",
                    title: "부서",
                },{
                    field : "DUTY_NAME",
                    title: "직책",
                },{
                    field : "EMP_NAME",
                    title: "이름",
                },{
                    field : "READ_DAY",
                    title: "최초열람",
                },{
                    field : "LAST_READ_DAY",
                    title: "마지막열람",
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
            hwpDocCtrl.saveAs(docView.global.rs.docInfo.DOC_TITLE + '.' + format.toUpperCase(), format.toUpperCase(), "download:true");
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
            result = customKendo.fn_customAjax("/common/sndAlermCt", {
                ntTitle : ntTitle,
                ntContent : ntContent,
                recEmpSeq : docView.global.rs.docInfo.DRAFT_EMP_SEQ,
                ntUrl : ntUrl
            });
        }

        if(type == "approve"){
            if($("#approveCode").val() != '100' && $("#approveCode").val() != "101"){
                /** 일반 결재 */
                result = customKendo.fn_customAjax("/common/sndAlermCt", {
                    ntTitle : "[결재도착] 기안자 : " + docView.global.rs.approveRoute.find(element => Number(element.APPROVE_ORDER) === 0).APPROVE_EMP_NAME,
                    ntContent : ntContent,
                    recEmpSeq : docView.global.rs.approveRoute.find(element => Number(element.APPROVE_ORDER) === (Number(docView.global.rs.approveNowRoute.APPROVE_ORDER) + 1)).APPROVE_EMP_SEQ,
                    ntUrl : ntUrl
                });
            }else if(($("#approveCode").val() == '100' || $("#approveCode").val() == "101")){
                /** 최종결재 결재 */
                for(var i = 0; i < docView.global.rs.approveRoute.length; i ++){
                    if(Number(docView.global.rs.approveRoute[i].APPROVE_ORDER) == 0){
                        result = customKendo.fn_customAjax("/common/sndAlermCt", {
                            ntTitle : "[결재종결] 결재자 : " + docView.global.rs.approveNowRoute.APPROVE_EMP_NAME,
                            ntContent : ntContent,
                            recEmpSeq : docView.global.rs.docInfo.DRAFT_EMP_SEQ,
                            ntUrl : ntUrl
                        });
                    }else if(Number(docView.global.rs.approveRoute[i].APPROVE_ORDER) != Number(docView.global.rs.approveNowRoute.APPROVE_ORDER)){
                        result = customKendo.fn_customAjax("/common/sndAlermCt", {
                            ntTitle : "[결재종결] 기안자 : " + docView.global.rs.approveRoute.find(element => Number(element.APPROVE_ORDER) === 0).APPROVE_EMP_NAME,
                            ntContent : ntContent,
                            recEmpSeq : docView.global.rs.approveRoute[i].APPROVE_EMP_SEQ,
                            ntUrl : ntUrl
                        });
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
}
