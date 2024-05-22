const historyReqPrintPop = {
    global: {
        hwpCtrl : "",
        params : "",
        now : "",
        fileTitle : ""
    },

    init: function(){
        historyReqPrintPop.dataSet();
    },

    dataSet: function(){
        historyReqPrintPop.loading();
        historyReqPrintPop.global.params = params;
        historyReqPrintPop.global.hwpCtrl = BuildWebHwpCtrl("hwpApproveContent", historyReqPrintPop.global.params.hwpUrl, function () {historyReqPrintPop.editorComplete();});
    },

    editorComplete: function(){
        let filePath = "http://218.158.231.184/upload/templateForm/historyTmp.hwp";
        historyReqPrintPop.global.hwpCtrl.Open(filePath, "HWP", "", function(){
            historyReqPrintPop.openCallBack();
            historyReqPrintPop.global.hwpCtrl.EditMode = 0;
            historyReqPrintPop.global.hwpCtrl.SetToolBar(1, "TOOLBAR_MENU");
            historyReqPrintPop.global.hwpCtrl.SetToolBar(1, "TOOLBAR_STANDARD");
            historyReqPrintPop.global.hwpCtrl.ShowRibbon(false);
            historyReqPrintPop.global.hwpCtrl.ShowCaret(false);
            historyReqPrintPop.global.hwpCtrl.ShowStatusBar(false);
            historyReqPrintPop.global.hwpCtrl.SetFieldViewOption(1);
        }, {"userData" : "success"});

        historyReqPrintPop.resize();
        $.LoadingOverlay("hide", {});
    },

    openCallBack: function(){
        console.log("print data",data);
        var currentDate = new Date();
        var parsingDate = currentDate.toISOString().split('T')[0];
        var toDate = parsingDate.split("-")[0]+ "년 "+parsingDate.split("-")[1]+ "월 "+parsingDate.split("-")[2]+ "일";
        historyReqPrintPop.global.hwpCtrl.PutFieldText("toDate", toDate);
        historyReqPrintPop.global.hwpCtrl.PutFieldText("position", data.bfPositionName);
        historyReqPrintPop.global.hwpCtrl.PutFieldText("hisEmpName", data.empName);

        let historyVal = "";
        if(data.afDeptName != "") {
                historyVal += data.afDeptName + " ";
                if(data.afTeamName != "") {
                    historyVal += data.afTeamName
                        + " ";
                }
        }

        if(data.afPositionName != "") {
                historyVal += data.afPositionName + " ";
        }
        if(data.afDutyName != "") {
            historyVal += data.afDutyName;
        }
        historyReqPrintPop.global.hwpCtrl.PutFieldText("hisVal", historyVal);

        let historyDt = data.historyDate.substr(0, 4) + '년 ' + data.historyDate.substr(4, 2) + '월 ' + data.historyDate.substr(6, 2) + '일';
        historyReqPrintPop.global.hwpCtrl.PutFieldText("historyDt", historyDt);
        historyReqPrintPop.global.hwpCtrl.PutFieldText("regEmpName", data.regEmpName);

        let jobText = data.afJobDetail;

        historyReqPrintPop.global.hwpCtrl.PutFieldText("JOB_DETAIL", jobText);
    },

    saveHwp : function (){
        historyReqPrintPop.global.hwpCtrl.SaveAs(historyReqPrintPop.global.fileTitle, "hwp", "download:true");
    },

    resize: function() {
        if (document.getElementById("hwpctrl_frame") != null && typeof(document.getElementById("hwpctrl_frame")) != "undefined") {
            var pHeight = (window.innerHeight - 20) + "px";
            document.getElementById("hwpctrl_frame").style.width = "100%";
            document.getElementById("hwpctrl_frame").style.height = pHeight;
        }
    },

    fn_save : function (){
        console.log("save data",data);

        var saveData ={
            menuCd            : "history",
            docFileName       : "발령장.hwp",
            docId             : "historyHwp",

            hisEmpSeq         : data.hisEmpSeq,
            empName           : data.empName,
            apntCd			  : data.apntCd,
            apntName		  : data.apntName,

            bfDeptSeq         : data.bfDeptSeq,
            bfDeptName        : data.bfDeptName,
            bfTeamSeq         : data.bfTeamSeq,
            bfTeamName        : data.bfTeamName,
            bfPositionCode    : "",
            bfPositionName    : data.bfPositionName,
            bfDutyCode        : "",
            bfDutyName        : data.bfDutyName,
            bfJobDetail       : data.bfJobDetail,

            afDeptSeq         : data.afDeptSeq,
            afDeptName        : data.afDeptName,

            afTeamSeq         : data.afTeamSeq,
            afTeamName        : data.afTeamName,

            afPositionCode    : data.afPositionCode,
            afPositionName    : data.afPositionName,

            afDutyCode        : data.afDutyCode,
            afDutyName        : data.afDutyName,

            afGradeName       : data.afGradeName,

            afJobDetail       : data.afJobDetail,

            deptSeq           : data.deptSeq,

            position          : data.position,

            afEtc             : data.afEtc,

            empSeq: data.empSeq,
            regEmpName: data.regEmpName,
            numberName: data.numberName,
            relevantName: data.relevantName,
            historyDate: data.historyDate,

        };

        console.log("saveData",saveData);

        if(!confirm("인사발령을 진행하시겠습니까?")){
            return;
        }
        let url = "/inside/setHistoryInsert";
        customKendo.fn_customAjax(url, saveData);


        alert("인사발령이 완료됐습니다.");
        window.close();
    },

    print: function() {
        historyReqPrintPop.global.hwpCtrl.PrintDocument();
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
    }
}