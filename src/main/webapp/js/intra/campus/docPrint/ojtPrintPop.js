const ojtPrintPop = {
    global: {
        hwpCtrl : "",
        params : "",

        studyInfo: null,
        propagInfo: null,
        userList2: [],
        userList3: [],
    },

    init: function(){
        ojtPrintPop.dataSet();
    },

    dataSet: function(){
        ojtPrintPop.loading();
        ojtPrintPop.global.params = params;
        ojtPrintPop.global.hwpCtrl = BuildWebHwpCtrl("hwpApproveContent", ojtPrintPop.global.params.hwpUrl, function () {ojtPrintPop.editorComplete();});
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
        let filePath = "http://218.158.231.184/upload/templateForm/ojtPrintTmp.hwp";
        ojtPrintPop.global.hwpCtrl.Open(filePath, "HWP", "", function(){
            ojtPrintPop.openCallBack();
            ojtPrintPop.global.hwpCtrl.EditMode = 0;
            ojtPrintPop.global.hwpCtrl.SetToolBar(1, "TOOLBAR_MENU");
            ojtPrintPop.global.hwpCtrl.SetToolBar(1, "TOOLBAR_STANDARD");
            ojtPrintPop.global.hwpCtrl.ShowRibbon(false);
            ojtPrintPop.global.hwpCtrl.ShowCaret(false);
            ojtPrintPop.global.hwpCtrl.ShowStatusBar(false);
            ojtPrintPop.global.hwpCtrl.SetFieldViewOption(1);
        }, {"userData" : "success"});

        ojtPrintPop.resize();
        $.LoadingOverlay("hide", {});
    },

    openCallBack: function(){
        let studyInfoSn = $("#studyInfoSn").val();
        let ojtResultSn = $("#ojtResultSn").val();

        const studyResult = customKendo.fn_customAjax("/campus/getStudyInfoOne", {pk: studyInfoSn});
        const studyInfo = studyResult.data;
        ojtPrintPop.global.studyInfo = studyInfo;

        const info = customKendo.fn_customAjax("/campus/getStudyOjtInfoOne", {ojtResultSn: ojtResultSn}).data;
        ojtPrintPop.global.propagInfo = info;

        const userResult2 = customKendo.fn_customAjax("/campus/getStudyOjtUserInfo", {ojtResultSn: ojtResultSn, ojtClassSn: 4});
        const userList2 = userResult2.list;
        ojtPrintPop.global.userList2 = userList2;

        const userResult3 = customKendo.fn_customAjax("/campus/getStudyOjtUserInfo", {ojtResultSn: ojtResultSn, ojtClassSn: 5});
        const userList3 = userResult3.list;
        ojtPrintPop.global.userList3 = userList3;

        ojtPrintPop.global.hwpCtrl.PutFieldText('STUDY_SUBJECT', studyInfo.STUDY_NAME);
        ojtPrintPop.global.hwpCtrl.PutFieldText('DT', info.OJT_DT+" "+info.START_TIME+" ~ "+info.END_TIME);
        ojtPrintPop.global.hwpCtrl.PutFieldText('LOCATION', info.LOCATION);
        const htmlStudy = ojtPrintPop.htmlCustomPropag();

        ojtPrintPop.global.hwpCtrl.MoveToField('USER_TABLE', true, true, false);
        ojtPrintPop.global.hwpCtrl.SetTextFile(htmlStudy, "HTML", "insertfile", {});
    },

    htmlCustomPropag: function(){
        const propagInfo = ojtPrintPop.global.propagInfo;
        const studyInfo = ojtPrintPop.global.studyInfo;
        const userList2 = ojtPrintPop.global.userList2;
        const userList3 = ojtPrintPop.global.userList3;
        const totalLength = userList2.length + userList3.length;

        let rowspan = 9;
        if(totalLength.length > 8){
            rowspan = totalLength.length+1;
        }

        let html = '';
        html += '<table style="font-family:굴림;margin: 0 auto; max-width: none; border-collapse: separate; border-spacing: 0; empty-cells: show; border-width: 0; outline: 0; text-align: left; font-size:12px; line-height: 20px; width: 100%; ">';
        html += '   <tr>';
        html += '       <td style="border-width: 0 0 0 0; font-weight: normal; box-sizing: border-box;">';
        html += '           <table border="3" style="border-collapse: collapse; margin: 0px;">';

        html += '               <tr>';
        html += '                   <td rowspan="'+rowspan+'" style="background-color:#FFE0E0; text-align:center; width: 90px;"><p style="font-family:굴림;font-size:14px;"><b>학습자</b></p></td>';
        html += '                   <td style="height:25px;background-color:#FFE0E0; text-align:center; width: 70px;"><p style="font-family:굴림;font-size:14px;"><b>구분</b></p></td>';
        html += '                   <td style="height:25px;background-color:#FFE0E0; text-align:center; width: 240px;"><p style="font-family:굴림;font-size:14px;"><b>부서명</b></p></td>';
        html += '                   <td style="height:25px;background-color:#FFE0E0; text-align:center; width: 128px;"><p style="font-family:굴림;font-size:14px;"><b>직위</b></p></td>';
        html += '                   <td style="height:25px;background-color:#FFE0E0; text-align:center; width: 128px;"><p style="font-family:굴림;font-size:14px;"><b>성명</b></p></td>';
        html += '               </tr>';
        for(let i=0; i<userList2.length; i++){
            const map = userList2[i];

            html += '               <tr>';
            html += '                   <td style="height:25px;background-color:#FFFFFF; text-align:center;"><p style="font-family:굴림;font-size:14px;">'+ map.OJT_CLASS_TEXT +'</p></td>';
            html += '                   <td style="height:25px;background-color:#FFFFFF; text-align:center;"><p style="font-family:굴림;font-size:14px;">'+ map.OJT_DEPT_NAME+ ' '+map.OJT_TEAM_NAME +'</p></td>';
            html += '                   <td style="height:25px;background-color:#FFFFFF; text-align:center;"><p style="font-family:굴림;font-size:14px;">'+ map.OJT_POSITION_NAME +'</p></td>';
            html += '                   <td style="height:25px;background-color:#FFFFFF; text-align:center;"><p style="font-family:굴림;font-size:14px;">'+ map.OJT_EMP_NAME +'</p></td>';
            html += '               </tr>';
        }
        for(let i=0; i<userList3.length; i++){
            const map = userList3[i];

            html += '               <tr>';
            html += '                   <td style="height:25px;background-color:#FFFFFF; text-align:center;"><p style="font-family:굴림;font-size:14px;">'+ map.OJT_CLASS_TEXT +'</p></td>';
            html += '                   <td style="height:25px;background-color:#FFFFFF; text-align:center;"><p style="font-family:굴림;font-size:14px;">'+ map.OJT_DEPT_NAME+ ' '+map.OJT_TEAM_NAME +'</p></td>';
            html += '                   <td style="height:25px;background-color:#FFFFFF; text-align:center;"><p style="font-family:굴림;font-size:14px;">'+ map.OJT_POSITION_NAME +'</p></td>';
            html += '                   <td style="height:25px;background-color:#FFFFFF; text-align:center;"><p style="font-family:굴림;font-size:14px;">'+ map.OJT_EMP_NAME +'</p></td>';
            html += '               </tr>';
        }
        if(totalLength < 8){
            for(let i=0; i<8-totalLength; i++){
                html += '               <tr>';
                html += '                   <td style="height:25px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;"></p></td>';
                html += '                   <td style="height:25px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;"></p></td>';
                html += '                   <td style="height:25px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;"></p></td>';
                html += '                   <td style="height:25px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;"></p></td>';
                html += '               </tr>';
            }
        }
        html += '           </table>';
        html += '       </td>';
        html += '   </tr>';
        html += '</table>';

        return html.replaceAll("\n", "<br>");
    },

    resize: function() {
        if (document.getElementById("hwpctrl_frame") != null && typeof(document.getElementById("hwpctrl_frame")) != "undefined") {
            var pHeight = (window.innerHeight - 20) + "px";
            document.getElementById("hwpctrl_frame").style.width = "100%";
            document.getElementById("hwpctrl_frame").style.height = pHeight;
        }
    },

    print: function() {
        ojtPrintPop.global.hwpCtrl.PrintDocument();
    }
}