const assetPrint = {
    global: {
        hwpCtrl : "",
        params : "",
    },

    init: function(){
        assetPrint.dataSet();
    },

    dataSet: function(){
        assetPrint.loading();
        assetPrint.global.params = params;
        assetPrint.global.hwpCtrl = BuildWebHwpCtrl("hwpApproveContent", assetPrint.global.params.hwpUrl, function () {assetPrint.editorComplete();});
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
        let filePath = "http://218.158.231.184/upload/templateForm/assetPrintTmp.hwp";
        console.log(filePath);
        assetPrint.global.hwpCtrl.Open(filePath, "HWP", "", function(){
            assetPrint.openCallBack();
            assetPrint.global.hwpCtrl.EditMode = 0;
            assetPrint.global.hwpCtrl.SetToolBar(1, "TOOLBAR_MENU");
            assetPrint.global.hwpCtrl.SetToolBar(1, "TOOLBAR_STANDARD");
            assetPrint.global.hwpCtrl.ShowRibbon(false);
            assetPrint.global.hwpCtrl.ShowCaret(false);
            assetPrint.global.hwpCtrl.ShowStatusBar(false);
            assetPrint.global.hwpCtrl.SetFieldViewOption(1);
        }, {"userData" : "success"});

        assetPrint.resize();
        $.LoadingOverlay("hide", {});
    },

    openCallBack: function() {
        let astInfoSn = $("#astInfoSn").val();

        const data = {astInfoSn: astInfoSn};
        const astMap = customKendo.fn_customAjax("/inside/getastprint", data).map;
        console.log(astMap);

        var result = customKendo.fn_customAjax("/inside/getAssetInfo.do", {astInfoSn : astInfoSn});
        var assetMap = result.data;
        var histList = result.data2.history;
        var histItemList = result.data2.historyItem;
        console.log("assetMap", assetMap);
        console.log("histList", histList);
        console.log("histItemList", histItemList);

        assetPrint.global.hwpCtrl.PutFieldText("AST_NAME", astMap.map.AST_NAME);
        assetPrint.global.hwpCtrl.PutFieldText("AST_NO", astMap.map.AST_NO);
        assetPrint.global.hwpCtrl.PutFieldText("AST_GUBUN", astMap.map.AST_GUBUN);
        assetPrint.global.hwpCtrl.PutFieldText("PURC_DATE", astMap.map.PURC_DATE);
        assetPrint.global.hwpCtrl.PutFieldText("AST_PLACE_SN", astMap.map.AST_PLACE_NAME);
        assetPrint.global.hwpCtrl.PutFieldText("PURC_PRICE", astMap.map.PURC_PRICE);
        assetPrint.global.hwpCtrl.PutFieldText("EMP_NAME", astMap.map.EMP_NAME);
        assetPrint.global.hwpCtrl.PutFieldText("MODEL_NAME", astMap.map.MODEL_NAME);
        assetPrint.global.hwpCtrl.PutFieldText("MODEL_SIZE", astMap.map.MODEL_SIZE);
        assetPrint.global.hwpCtrl.PutFieldText("MF_COMPANY", astMap.map.MF_COMPANY);
        assetPrint.global.hwpCtrl.PutFieldText("UNIT", astMap.map.UNIT);
        assetPrint.global.hwpCtrl.PutFieldText("ORG_COUNTRY", astMap.map.ORG_COUNTRY);
        assetPrint.global.hwpCtrl.PutFieldText("QTY", astMap.map.QTY);
        assetPrint.global.hwpCtrl.PutFieldText("PURC_COMPANY_ID", astMap.map.PURC_COMPANY_NAME);
        assetPrint.global.hwpCtrl.PutFieldText("EXP_ACCOUNT", astMap.map.FUNDING_SOURCE_TXT);

        assetPrint.global.hwpCtrl.PutFieldText("MANAGE_MAIN_EMP_NAME", result.manage.MANAGE_MAIN_EMP_NAME);
        assetPrint.global.hwpCtrl.PutFieldText("MANAGE_SUB_EMP_NAME", result.manage.MANAGE_SUB_EMP_NAME);

        const astFile = assetMap.astFile;
        if(astFile != null){
            if(assetPrint.global.hwpCtrl.FieldExist('AST_FILE_NO')){
                assetPrint.global.hwpCtrl.PutFieldText('AST_FILE_NO', " ");
                assetPrint.global.hwpCtrl.MoveToField('AST_FILE_NO', true, true, false);
                assetPrint.global.hwpCtrl.InsertBackgroundPicture(
                    "SelectedCell",
                    "http://218.158.231.184/" + astFile.file_path+astFile.file_uuid,
                    1,
                    5,
                    0,
                    0,
                    0,
                    0
                );
            }
        }
    },

    resize: function() {
        if (document.getElementById("hwpctrl_frame") != null && typeof(document.getElementById("hwpctrl_frame")) != "undefined") {
            var pHeight = (window.innerHeight - 20) + "px";
            document.getElementById("hwpctrl_frame").style.width = "100%";
            document.getElementById("hwpctrl_frame").style.height = pHeight;
        }
    },

    print: function() {
        assetPrint.global.hwpCtrl.PrintDocument();
    }
}