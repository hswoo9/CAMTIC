const historyPrintPop = {
    global: {
        hwpCtrl : "",
        params : "",
        now : "",
        fileTitle : ""
    },

    init: function(){
        historyPrintPop.dataSet();
    },

    dataSet: function(){
        historyPrintPop.loading();
        historyPrintPop.global.params = params;
        historyPrintPop.global.hwpCtrl = BuildWebHwpCtrl("hwpApproveContent", historyPrintPop.global.params.hwpUrl, function () {historyPrintPop.editorComplete();});
    },

    editorComplete: function(){
        let filePath = "http://218.158.231.184/upload/templateForm/historyTmp.hwp";
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
        console.log("print data",data);
        var toDate = data.REG_DT.split("-")[0]+ "년 "+data.REG_DT.split("-")[1]+ "월 "+data.REG_DT.split("-")[2]+ "일";
        historyPrintPop.global.hwpCtrl.PutFieldText("position", data.AF_POSITION_NAME);
        //historyPrintPop.global.hwpCtrl.PutFieldText("hisEmpName", data.EMP_NAME);
        let name = "";
        if(data.CHNG_NAME == ""){
            name = data.EMP_NAME;
        }else{
            name = data.CHNG_NAME;
        }
        historyPrintPop.global.hwpCtrl.PutFieldText("hisEmpName",name);
        let historyVal = "";
        if(data.AF_DEPT_NAME != "") {
            if(data.CHNG_DEPT == ""){
                historyVal += data.AF_DEPT_NAME + " ";
                if(data.AF_TEAM_NAME != "") {
                    if (data.afTeamName != "") {
                        historyVal += "\r\n" + data.AF_TEAM_NAME
                            + " ";
                    }
                }
            }else{
                historyVal += data.CHNG_DEPT + " ";
            }
        }

        // if(data.afPositionName != "") {
        //    if(data.CHNG_POSITION == "") {
        //        historyVal += data.AF_POSITION_NAME + " ";
        //    }else{
        //        historyVal += data.CHNG_POSITION + " ";
        //    }
        // }
        if(data.AF_DUTY_NAME != "" && data.AF_DUTY_NAME != '-') {
            var duty = "  (직     책) " + data.AF_DUTY_NAME;

            historyPrintPop.global.hwpCtrl.PutFieldText("duty", duty);
        }

        if(historyPrintPop.global.hwpCtrl.FieldExist("인")){
            const signInfo = getSign();
            const signUrl = "http://"+location.host+signInfo.FILE_NO;
            historyPrintPop.global.hwpCtrl.MoveToField('인', true, true, false);
            historyPrintPop.global.hwpCtrl.InsertBackgroundPicture(
                "SelectedCell",
                signUrl,
                1,
                6,
                0,
                0,
                0,
                0
            );
        }

        var result = customKendo.fn_customAjax("/inside/getImageData", {customRegEmpSeq : data.REG_EMP_SEQ});
        console.log(result)
        if(result.data.sign2Img != null){
            if(historyPrintPop.global.hwpCtrl.FieldExist("사인")){
                historyPrintPop.global.hwpCtrl.MoveToField('사인', true, true, false);
                historyPrintPop.global.hwpCtrl.InsertBackgroundPicture(
                    "SelectedCell",
                    "http://" + location.host + result.data.sign2Img.file_path + result.data.sign2Img.file_uuid,
                    1,
                    6,
                    0,
                    0,
                    0,
                    0
                );
            }
        }

        console.log(data);

        historyPrintPop.global.hwpCtrl.PutFieldText("hisVal", historyVal);
        historyPrintPop.global.hwpCtrl.PutFieldText("deptName", historyVal);
        let historyDt = data.HISTORY_DT.split("-")[0]+ "년 "+data.HISTORY_DT.split("-")[1]+ "월 "+data.HISTORY_DT.split("-")[2]+ "일";
        historyPrintPop.global.hwpCtrl.PutFieldText("toDate", historyDt);

        historyPrintPop.global.hwpCtrl.PutFieldText("historyDt", historyDt);

        let regEmpNameText = data.REG_TEAM_NAME + " " + data.REG_EMP_NAME + " " + data.REG_POSITION_NAME + " (인)";

        historyPrintPop.global.hwpCtrl.PutFieldText("regEmpName", regEmpNameText);

        let jobDetailText = data.APNT_NAME + " " + data.ETC;

        historyPrintPop.global.hwpCtrl.PutFieldText("JOB_DETAIL", jobDetailText);
    },

    saveHwp : function (){
        historyPrintPop.global.hwpCtrl.SaveAs(historyPrintPop.global.fileTitle, "hwp", "download:true");
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

    sendApnt: function () {
        var apntSn = params.apntSn;
        console.log("apntSn",apntSn);

        if(!confirm("발령장 전송을 진행하시겠습니까?")){
            return;
        }

        var data = {
            apntSn : apntSn
        }

        let url = "/inside/pop/setTmpActiveUpdate.do";
        customKendo.fn_customAjax(url, data);

        alert("발령장 전송이 완료되었습니다.")
    }
}