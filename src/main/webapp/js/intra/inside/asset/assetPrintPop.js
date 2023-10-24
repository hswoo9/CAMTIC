const estPrintPop = {
    global: {
        hwpCtrl : "",
        params : "",
    },

    init: function(){
        estPrintPop.dataSet();
    },

    dataSet: function(){
        estPrintPop.loading();
        estPrintPop.global.params = params;
        estPrintPop.global.hwpCtrl = BuildWebHwpCtrl("hwpApproveContent", estPrintPop.global.params.hwpUrl, function () {estPrintPop.editorComplete();});
    },

    loading: function(){
        $.LoadingOverlay("show", {
            background       : "rgba(0, 0, 0, 0.5)",
            image            : "",
            maxSize          : 60,
            /*fontawesome      : "fa fa-spinner fa-pulse fa-fw",
            fontawesomeColor : "#FFFFFF",*/
        });
    },

    editorComplete: function(){
        let filePath = "http://localhost:8080/downloadFile/test.hwp";
        console.log(filePath);
        estPrintPop.global.hwpCtrl.Open(filePath, "HWP", "", function(){
            estPrintPop.openCallBack();
            estPrintPop.global.hwpCtrl.EditMode = 0;
            estPrintPop.global.hwpCtrl.SetToolBar(1, "TOOLBAR_MENU");
            estPrintPop.global.hwpCtrl.SetToolBar(1, "TOOLBAR_STANDARD");
            estPrintPop.global.hwpCtrl.ShowRibbon(false);
            estPrintPop.global.hwpCtrl.ShowCaret(false);
            estPrintPop.global.hwpCtrl.ShowStatusBar(false);
            estPrintPop.global.hwpCtrl.SetFieldViewOption(1);
        }, {"userData" : "success"});

        estPrintPop.resize();
        $.LoadingOverlay("hide", {});
    },

    openCallBack: function() {
        let astInfoSn = $("#astInfoSn").val();

        const data = {astInfoSn: astInfoSn};
        const astMap = customKendo.fn_customAjax("/inside/getastprint", data).map;
        const rs = customKendo.fn_customAjax("/inside/getastData", data);

        const map = rs.hashMap;

        estPrintPop.global.hwpCtrl.PutFieldText("AST_NAME", astMap.AST_NAME);

        estPrintPop.global.hwpCtrl.PutFieldText("CRM_MANAGER", crmManager);
        estPrintPop.global.hwpCtrl.PutFieldText("EMAIL", crmMap.CRM_NM);
    },

    resize: function() {
        if (document.getElementById("hwpctrl_frame") != null && typeof(document.getElementById("hwpctrl_frame")) != "undefined") {
            var pHeight = (window.innerHeight - 20) + "px";
            document.getElementById("hwpctrl_frame").style.width = "100%";
            document.getElementById("hwpctrl_frame").style.height = pHeight;
        }
    },

    print: function() {
        estPrintPop.global.hwpCtrl.PrintDocument();
    }
}