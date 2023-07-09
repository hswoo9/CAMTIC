/**
 * 2022.07.05
 * 증명서 조회 페이지
 * function / global variable / local variable setting
 */
var snackPrint = {
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
        snackPrint.global.params = params;

        $(document).ready(function() {
            snackPrint.global.hwpCtrl = BuildWebHwpCtrl("hwpApproveContent", snackPrint.global.params.hwpUrl, function () {snackPrint.editorComplete();});
            window.onresize();
        });

        window.onresize = function () {snackPrint.resize()};
    },

    getDocFormTemplate : function(){
        snackPrint.global.searchAjaxData = {
            formId : 134
        }

        var result = customKendo.fn_customAjax("/approval/getTemplateFormFile", snackPrint.global.searchAjaxData);
        snackPrint.global.flag = result.flag;
        if(result.flag){
            return result;
        }
    },

    editorComplete : function() {
        snackPrint.global.mod = "W";
        snackPrint.global.openFormat = "HWP";
        snackPrint.global.templateFormFile = snackPrint.getDocFormTemplate();
        console.log("폼파일");
        console.log(snackPrint.global.templateFormFile);
        var templateFlag = snackPrint.global.flag;

        if(!templateFlag || snackPrint.global.templateFormFile.filter(element => element.FORM_FILE_TYPE === "form").length == 0){
            alert("양식 정보가 존재하지 않습니다.\n관리자에게 문의하세요.");
            window.close();
        }

        var optFlag = snackPrint.global.flag;

        if(!optFlag){
            alert("양식 정보가 존재하지 않습니다.\n관리자에게 문의하세요.");
            window.close();
        }

        hwpDocCtrl.defaultScript(
            snackPrint.global.hwpCtrl,
            snackPrint.global.openFormat,
            snackPrint.global.templateFormFile,
            snackPrint.global.templateFormOpt,
            snackPrint.global.templateFormCustomField,
            snackPrint.global.params,
            $("#empSeq").val(),
            snackPrint.global.mod
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
        snackPrint.global.hwpCtrl.PrintDocument();
    }
}
