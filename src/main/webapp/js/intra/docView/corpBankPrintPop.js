const corpBankPrintPop = {
    global: {
        hwpCtrl : "",
        params : "",
        now : "",
    },

    init: function(e){
        corpBankPrintPop.global.now = e;
        corpBankPrintPop.dataSet();
    },

    dataSet: function(){
        corpBankPrintPop.loading();
        corpBankPrintPop.global.params = params;
        corpBankPrintPop.global.hwpCtrl = BuildWebHwpCtrl("hwpApproveContent", corpBankPrintPop.global.params.hwpUrl, function () {corpBankPrintPop.editorComplete();});
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
        let filePath = "http://218.158.231.184/upload/templateForm/corpBankPrintTmp.hwp";
        corpBankPrintPop.global.hwpCtrl.Open(filePath, "HWP", "", function(){
            corpBankPrintPop.openCallBack();
            corpBankPrintPop.global.hwpCtrl.EditMode = 0;
            corpBankPrintPop.global.hwpCtrl.SetToolBar(1, "TOOLBAR_MENU");
            corpBankPrintPop.global.hwpCtrl.SetToolBar(1, "TOOLBAR_STANDARD");
            corpBankPrintPop.global.hwpCtrl.ShowRibbon(false);
            corpBankPrintPop.global.hwpCtrl.ShowCaret(false);
            corpBankPrintPop.global.hwpCtrl.ShowStatusBar(false);
            corpBankPrintPop.global.hwpCtrl.SetFieldViewOption(1);
        }, {"userData" : "success"});

        corpBankPrintPop.resize();
        $.LoadingOverlay("hide", {});
    },

    openCallBack: function(){
        const rs = customKendo.fn_customAjax("/customDoc/getCorpBank", {corpBankSn : $("#corpBankSn").val()});
        const result = rs.data;
        const rs2 = customKendo.fn_customAjax("/project/getProjectData", {pjtSn: result.PJT_SN});
        const result2 = rs2.data;
        const lgCodeDs = customKendo.fn_customAjax("/project/selLgCode", {grpSn : "SUP_DEP"});
        const list = lgCodeDs.list

        if(result2.BUSN_CLASS == "D" || result2.BUSN_CLASS == "V"){
            corpBankPrintPop.global.hwpCtrl.PutFieldText("pjtNm", result2.PJT_NM);
        }else{
            corpBankPrintPop.global.hwpCtrl.PutFieldText("pjtNm", result2.BS_TITLE);
        }

        for(let i=0; i<list.length; i++){
            const map = list[i];
            if(map.LG_CD = result2.SBJ_DEP){
                corpBankPrintPop.global.hwpCtrl.PutFieldText("sbjDepNm", map.LG_CD_NM);
            }
        }
        corpBankPrintPop.global.hwpCtrl.PutFieldText("pjtDt", result2.PJT_START_DT +"~"+ result2.PJT_END_DT);
        corpBankPrintPop.global.hwpCtrl.PutFieldText("bank", result.BANK);
        corpBankPrintPop.global.hwpCtrl.PutFieldText("issDe", result.ISS_DE);
        corpBankPrintPop.global.hwpCtrl.PutFieldText("useRmk", result.USE_RMK);
        corpBankPrintPop.global.hwpCtrl.PutFieldText("corpExp", result.CORP_EXP == "0" ? "0" : comma(result.CORP_EXP));
        corpBankPrintPop.global.hwpCtrl.PutFieldText("toDate", result.REG_DATE.split("-")[0] + "년 " + result.REG_DATE.split("-")[1] + "월 " + result.REG_DATE.split("-")[2] + "일");
        corpBankPrintPop.global.hwpCtrl.PutFieldText("regEmpName", result.EMP_NAME);

        const userInfo = getUser(result.EMP_SEQ);

        const hostFlag = location.host;
        const hostProtocol = location.protocol;

        let host = "";
        if(hostFlag.indexOf("218.158.231.184") > -1 || hostFlag.indexOf("new.camtic.or.kr") > -1){
            host = hostProtocol + "//218.158.231.184/";
        }else{
            host = hostProtocol + "//218.158.231.186/";
        }

        if(userInfo.FILE_PATH != null){
            if(corpBankPrintPop.global.hwpCtrl.FieldExist('sign')){
                corpBankPrintPop.global.hwpCtrl.PutFieldText('sign', " ");
                corpBankPrintPop.global.hwpCtrl.MoveToField('sign', true, true, false);
                corpBankPrintPop.global.hwpCtrl.InsertBackgroundPicture(
                    "SelectedCell",
                    host + userInfo.FILE_PATH,
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
        corpBankPrintPop.global.hwpCtrl.PrintDocument();
    }
}