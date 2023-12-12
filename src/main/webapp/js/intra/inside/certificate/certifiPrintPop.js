/**
 * 2022.07.05
 * 증명서 조회 페이지
 * function / global variable / local variable setting
 */
var certifiPrintPop = {
    global : {
        params                  : "",
        type                    : "",
        hwpCtrl                 : "",
        flag                    : false,

        /** 기안기 셋팅 옵션 (파일, editing mode)*/
        templateFormFile : "",
        templateFormOpt : "",
        templateFormCustomField : "",
        openFormat : "",
        mod : "",

        formData : new FormData(),
        searchAjaxData : "",
    },

    init : function(params){
        document.querySelector('body').style.overflow = 'hidden';
        $("#loadingText").text("문서를 불러오는 중입니다.");
        certifiPrintPop.global.params = params;

        $(document).ready(function() {
            certifiPrintPop.global.hwpCtrl = BuildWebHwpCtrl("hwpApproveContent", certifiPrintPop.global.params.hwpUrl, function () {certifiPrintPop.editorComplete();});
            window.onresize();
        });

        window.onresize = function () {certifiPrintPop.resize()};
    },

    getDocFormTemplate : function(){
        certifiPrintPop.global.searchAjaxData = {
            formId : 133
        }

        var result = customKendo.fn_customAjax("/approval/getTemplateFormFile", certifiPrintPop.global.searchAjaxData);
        certifiPrintPop.global.flag = result.flag;
        if(result.flag){
            return result;
        }
    },

    editorComplete : function() {
        certifiPrintPop.global.mod = "W";
        certifiPrintPop.global.openFormat = "HWP";
        certifiPrintPop.global.templateFormFile = certifiPrintPop.getDocFormTemplate();
        console.log("폼파일");
        console.log("확인용",certifiPrintPop.global.templateFormFile);
        var templateFlag = certifiPrintPop.global.flag;

        if(!templateFlag || certifiPrintPop.global.templateFormFile.filter(element => element.FORM_FILE_TYPE === "form").length == 0){
            alert("양식 정보가 존재하지 않습니다.\n관리자에게 문의하세요.");
            window.close();
        }

        var optFlag = certifiPrintPop.global.flag;

        if(!optFlag){
            alert("양식 정보가 존재하지 않습니다.\n관리자에게 문의하세요.");
            window.close();
        }

        hwpDocCtrl.defaultScript(
            certifiPrintPop.global.hwpCtrl,
            certifiPrintPop.global.openFormat,
            certifiPrintPop.global.templateFormFile,
            certifiPrintPop.global.templateFormOpt,
            certifiPrintPop.global.templateFormCustomField,
            certifiPrintPop.global.params,
            $("#empSeq").val(),
            certifiPrintPop.global.mod
        );
    },

    resize : function() {
        if (document.getElementById("hwpctrl_frame") != null && typeof(document.getElementById("hwpctrl_frame")) != "undefined") {
            var pHeight = (window.innerHeight - 20) + "px";
            document.getElementById("hwpctrl_frame").style.width = "100%";
            document.getElementById("hwpctrl_frame").style.height = pHeight;
        }
    },

    print: function() {
        var data = {
            userProofSn : $("#userProofSn").val(),
            empSeq : $("#empSeq").val(),
            status : 110
        }

        var result = customKendo.fn_customAjax("/inside/setReqCert", data);

        if(result.flag){
            certifiPrintPop.global.hwpCtrl.PrintDocument();
            opener.gridReload();
        }
    }
}
