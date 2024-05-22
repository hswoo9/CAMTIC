const personPrintPop = {
    global: {
        hwpCtrl : "",
        params : "",
    },

    init: function(){
        personPrintPop.dataSet();
    },

    dataSet: function(){
        personPrintPop.loading();
        personPrintPop.global.params = params;
        personPrintPop.global.hwpCtrl = BuildWebHwpCtrl("hwpApproveContent", personPrintPop.global.params.hwpUrl, function () {personPrintPop.editorComplete();});
    },

    loading: function(){
        $.LoadingOverlay("show", {
            background       : "rgba(0, 0, 0, 0.5)",
            image            : "",
            maxSize          : 60,
            fontawesome      : "fa fa-spinner fa-pulse fa-fw",
            fontawesomeColor : "#FFFFFF",
        });
    },

    editorComplete: function(){
        let filePath = "http://218.158.231.184/upload/templateForm/personPrintTmp2.hwp";
        personPrintPop.global.hwpCtrl.Open(filePath, "HWP", "", function(){
            personPrintPop.openCallBack();
            personPrintPop.global.hwpCtrl.EditMode = 0;
            personPrintPop.global.hwpCtrl.SetToolBar(1, "TOOLBAR_MENU");
            personPrintPop.global.hwpCtrl.SetToolBar(1, "TOOLBAR_STANDARD");
            personPrintPop.global.hwpCtrl.ShowRibbon(false);
            personPrintPop.global.hwpCtrl.ShowCaret(false);
            personPrintPop.global.hwpCtrl.ShowStatusBar(false);
            personPrintPop.global.hwpCtrl.SetFieldViewOption(1);
        }, {"userData" : "success"});

        personPrintPop.resize();
        $.LoadingOverlay("hide", {});
    },

    openCallBack: function(){
        const data = {
            pk : $("#pk").val(),
            personReqSn : $("#personReqSn").val()
        }
        const result = customKendo.fn_customAjax("/projectUnRnd/getPersonReqData", data);
        const personMap = result.data;
        const lectureResult = customKendo.fn_customAjax("/projectUnRnd/getLectureInfo", data);
        const lecMap = lectureResult.data;

        const year = new Date(lecMap.LEC_END_DE).getFullYear();
        const desiredValue = year % 100;

        var num = personMap.REQ_STATUS_O_COUNT.toString();
        var maxNum = num.padStart(4, '0');

        console.log(personMap);
        console.log(lecMap);

        /** 1. 사업정보 */
        personPrintPop.global.hwpCtrl.PutFieldText("CO_NAME", personMap.CO_NAME);
        personPrintPop.global.hwpCtrl.PutFieldText("PLACE", personMap.PLACE);
        personPrintPop.global.hwpCtrl.PutFieldText("NAME", personMap.NAME);
        personPrintPop.global.hwpCtrl.PutFieldText("BIRTH", personMap.BIRTH);
        personPrintPop.global.hwpCtrl.PutFieldText("LEC_TITLE_BS", lecMap.LEC_TITLE_BS);
        personPrintPop.global.hwpCtrl.PutFieldText("LEC_DT", lecMap.LEC_STR_DE + " ~ " + lecMap.LEC_END_DE);
        personPrintPop.global.hwpCtrl.PutFieldText("LEC_TIME", lecMap.LEC_TIME + "시간");

        personPrintPop.global.hwpCtrl.PutFieldText("PRINT_NO", "제 CAMTIC EDU "+desiredValue+"-"+maxNum+"호");
        personPrintPop.global.hwpCtrl.PutFieldText("REG_DT", lecMap.LEC_END_DE.substring(0, 4) + "년 " + lecMap.LEC_END_DE.substring(5, 7) + "월 " + lecMap.LEC_END_DE.substring(8, 10) + "일");
    },

    resize: function() {
        if (document.getElementById("hwpctrl_frame") != null && typeof(document.getElementById("hwpctrl_frame")) != "undefined") {
            var pHeight = (window.innerHeight - 20) + "px";
            document.getElementById("hwpctrl_frame").style.width = "100%";
            document.getElementById("hwpctrl_frame").style.height = pHeight;
        }
    },

    print: function() {
        personPrintPop.global.hwpCtrl.PrintDocument();
    }
}