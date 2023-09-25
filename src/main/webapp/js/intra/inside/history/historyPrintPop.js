const historyPrintPop = {
    global: {
        hwpCtrl : "",
        params : "",
    },

    init: function(){
        historyPrintPop.dataSet();
    },

    dataSet: function(){
        historyPrintPop.loading();
        historyPrintPop.global.params = params;
        historyPrintPop.global.hwpCtrl = BuildWebHwpCtrl("hwpApproveContent", historyPrintPop.global.params.hwpUrl, function () {historyPrintPop.editorComplete();});
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
        let filePath = "http://218.158.231.186:8080/upload/templateForm/historyTmp.hwp";
        historyPrintPop.global.hwpCtrl.Open(filePath, "HWP", "", function(){
            historyPrintPop.openCallBack();
            historyPrintPop.global.hwpCtrl.EditMode = 0;
            historyPrintPop.global.hwpCtrl.SetToolBar(1, "TOOLBAR_MENU");
            historyPrintPop.global.hwpCtrl.SetToolBar(1, "TOOLBAR_STANDARD");
            historyPrintPop.global.hwpCtrl.ShowRibbon(false);
            historyPrintPop.global.hwpCtrl.ShowCaret(false);
            historyPrintPop.global.hwpCtrl.ShowStatusBar(false);
            historyPrintPop.global.hwpCtrl.SetFieldViewOption(1);
        }, {"userData" : "success"});

        historyPrintPop.resize();
        $.LoadingOverlay("hide", {});
    },

    openCallBack: function(){
        console.log(data);
        var toDate = data.REG_DT.split("-")[0]+ "년 "+data.REG_DT.split("-")[1]+ "월 "+data.REG_DT.split("-")[2]+ "일";
        historyPrintPop.global.hwpCtrl.PutFieldText("toDate", toDate);
        historyPrintPop.global.hwpCtrl.PutFieldText("position", data.BF_POSITION_NAME);
        historyPrintPop.global.hwpCtrl.PutFieldText("hisEmpName", data.EMP_NAME);
        let historyVal = "";
        if(data.afDeptName != "") {
            historyVal += data.AF_DEPT_NAME + " ";
        }
        if(data.afTeamName != "") {
            historyVal += data.AF_TEAM_NAME
                + " ";
        }
        if(data.afPositionName != "") {
            historyVal += data.AF_POSITION_NAME + " ";
        }
        if(data.afDutyName != "") {
            historyVal += data.AF_DUTY_NAME;
        }
        historyPrintPop.global.hwpCtrl.PutFieldText("hisVal", historyVal);
        let historyDt = data.HISTORY_DT.split("-")[0]+ "년 "+data.HISTORY_DT.split("-")[1]+ "월 "+data.HISTORY_DT.split("-")[2]+ "일";
        historyPrintPop.global.hwpCtrl.PutFieldText("historyDt", historyDt);
        historyPrintPop.global.hwpCtrl.PutFieldText("regEmpName", data.REG_EMP_NAME);
    },

    resize: function() {
        if (document.getElementById("hwpctrl_frame") != null && typeof(document.getElementById("hwpctrl_frame")) != "undefined") {
            var pHeight = (window.innerHeight - 20) + "px";
            document.getElementById("hwpctrl_frame").style.width = "100%";
            document.getElementById("hwpctrl_frame").style.height = pHeight;
        }
    },

    print: function() {
        historyPrintPop.global.hwpCtrl.PrintDocument();
        opener.gridReload();
    }
}