/**
 * 총괄표 출력 페이지
 * function / global variable / local variable setting
 */
var recruitPrintPop = {
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
        recruitPrintPop.global.params = params;

        $(document).ready(function() {
            recruitPrintPop.global.hwpCtrl = BuildWebHwpCtrl("hwpApproveContent", recruitPrintPop.global.params.hwpUrl, function () {recruitPrintPop.editorComplete();});
            window.onresize();
        });

        window.onresize = function () {recruitPrintPop.resize()};
    },

    getDocFormTemplate : function(){
        recruitPrintPop.global.searchAjaxData = {
            formId : 133
        }

        var result = customKendo.fn_customAjax("/approval/getTemplateFormFile", recruitPrintPop.global.searchAjaxData);
        recruitPrintPop.global.flag = result.flag;
        if(result.flag){
            return result;
        }
    },

    editorComplete : function() {
        recruitPrintPop.global.mod = "W";
        recruitPrintPop.global.openFormat = "HWP";
        recruitPrintPop.global.templateFormFile = recruitPrintPop.getDocFormTemplate();
        console.log("폼파일");
        console.log(recruitPrintPop.global.templateFormFile);
        var templateFlag = recruitPrintPop.global.flag;

        if(!templateFlag || recruitPrintPop.global.templateFormFile.filter(element => element.FORM_FILE_TYPE === "form").length == 0){
            alert("양식 정보가 존재하지 않습니다.\n관리자에게 문의하세요.");
            window.close();
        }

        var optFlag = recruitPrintPop.global.flag;

        if(!optFlag){
            alert("양식 정보가 존재하지 않습니다.\n관리자에게 문의하세요.");
            window.close();
        }

        hwpDocCtrl.defaultScript(
            recruitPrintPop.global.hwpCtrl,
            recruitPrintPop.global.openFormat,
            recruitPrintPop.global.templateFormFile,
            recruitPrintPop.global.templateFormOpt,
            recruitPrintPop.global.templateFormCustomField,
            recruitPrintPop.global.params,
            $("#empSeq").val(),
            recruitPrintPop.global.mod
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
            recruitInfoSn : $("#recruitInfoSn").val(),
            empSeq : $("#empSeq").val(),
            status : 110
        }

        var result = customKendo.fn_customAjax("/inside/setReqCert", data);

        if(result.flag){
            recruitPrintPop.global.hwpCtrl.PrintDocument();
            opener.gridReload();
        }
    }
}
