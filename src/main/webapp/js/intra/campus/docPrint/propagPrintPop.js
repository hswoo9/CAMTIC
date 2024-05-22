const propagPrintPop = {
    global: {
        hwpCtrl : "",
        params : "",

        studyInfo: null,
        propagInfo: null,
        userList2: [],
        userList3: [],
    },

    init: function(){
        propagPrintPop.dataSet();
    },

    dataSet: function(){
        propagPrintPop.loading();
        propagPrintPop.global.params = params;
        propagPrintPop.global.hwpCtrl = BuildWebHwpCtrl("hwpApproveContent", propagPrintPop.global.params.hwpUrl, function () {propagPrintPop.editorComplete();});
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
        let filePath = "http://218.158.231.184/upload/templateForm/propagPrintTmp.hwp";
        propagPrintPop.global.hwpCtrl.Open(filePath, "HWP", "", function(){
            propagPrintPop.openCallBack();
            propagPrintPop.global.hwpCtrl.EditMode = 0;
            propagPrintPop.global.hwpCtrl.SetToolBar(1, "TOOLBAR_MENU");
            propagPrintPop.global.hwpCtrl.SetToolBar(1, "TOOLBAR_STANDARD");
            propagPrintPop.global.hwpCtrl.ShowRibbon(false);
            propagPrintPop.global.hwpCtrl.ShowCaret(false);
            propagPrintPop.global.hwpCtrl.ShowStatusBar(false);
            propagPrintPop.global.hwpCtrl.SetFieldViewOption(1);
        }, {"userData" : "success"});

        propagPrintPop.resize();
        $.LoadingOverlay("hide", {});
    },

    openCallBack: function(){
        let studyInfoSn = $("#studyInfoSn").val();
        let studyPropagSn = $("#studyPropagSn").val();

        const studyResult = customKendo.fn_customAjax("/campus/getStudyInfoOne", {pk: studyInfoSn});
        const studyInfo = studyResult.data;
        propagPrintPop.global.studyInfo = studyInfo;

        const info = customKendo.fn_customAjax("/campus/getStudyPropagInfoOne", {studyPropagSn: studyPropagSn}).data;
        propagPrintPop.global.propagInfo = info;

        const userResult2 = customKendo.fn_customAjax("/campus/getStudyPropagUserInfo", {studyPropagSn: studyPropagSn, propagClassSn: 4});
        const userList2 = userResult2.list;
        propagPrintPop.global.userList2 = userList2;

        const userResult3 = customKendo.fn_customAjax("/campus/getStudyPropagUserInfo", {studyPropagSn: studyPropagSn, propagClassSn: 5});
        const userList3 = userResult3.list;
        propagPrintPop.global.userList2 = userList3;

        propagPrintPop.global.hwpCtrl.PutFieldText('STUDY_SUBJECT', studyInfo.STUDY_NAME);
        propagPrintPop.global.hwpCtrl.PutFieldText('DT', info.PROPAG_DT+" "+info.START_TIME+" ~ "+info.END_TIME);
        propagPrintPop.global.hwpCtrl.PutFieldText('LOCATION', info.LOCATION);
        const htmlStudy = propagPrintPop.htmlCustomPropag();

        propagPrintPop.global.hwpCtrl.MoveToField('USER_TABLE', true, true, false);
        propagPrintPop.global.hwpCtrl.SetTextFile(htmlStudy, "HTML", "insertfile", {});
    },

    htmlCustomPropag: function(){
        const propagInfo = propagPrintPop.global.propagInfo;
        const studyInfo = propagPrintPop.global.studyInfo;
        const userList2 = propagPrintPop.global.userList2;
        const userList3 = propagPrintPop.global.userList3;
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
            html += '                   <td style="height:25px;background-color:#FFFFFF; text-align:center;"><p style="font-family:굴림;font-size:14px;">'+ map.PROPAG_CLASS_TEXT +'</p></td>';
            html += '                   <td style="height:25px;background-color:#FFFFFF; text-align:center;"><p style="font-family:굴림;font-size:14px;">'+ map.PROPAG_DEPT_NAME+ ' '+map.PROPAG_TEAM_NAME +'</p></td>';
            html += '                   <td style="height:25px;background-color:#FFFFFF; text-align:center;"><p style="font-family:굴림;font-size:14px;">'+ map.PROPAG_POSITION_NAME +'</p></td>';
            html += '                   <td style="height:25px;background-color:#FFFFFF; text-align:center;"><p style="font-family:굴림;font-size:14px;">'+ map.PROPAG_EMP_NAME +'</p></td>';
            html += '               </tr>';
        }
        for(let i=0; i<userList3.length; i++){
            const map = userList3[i];

            html += '               <tr>';
            html += '                   <td style="height:25px;background-color:#FFFFFF; text-align:center;"><p style="font-family:굴림;font-size:14px;">'+ map.PROPAG_CLASS_TEXT +'</p></td>';
            html += '                   <td style="height:25px;background-color:#FFFFFF; text-align:center;"><p style="font-family:굴림;font-size:14px;">'+ map.PROPAG_DEPT_NAME+ ' '+map.PROPAG_TEAM_NAME +'</p></td>';
            html += '                   <td style="height:25px;background-color:#FFFFFF; text-align:center;"><p style="font-family:굴림;font-size:14px;">'+ map.PROPAG_POSITION_NAME +'</p></td>';
            html += '                   <td style="height:25px;background-color:#FFFFFF; text-align:center;"><p style="font-family:굴림;font-size:14px;">'+ map.PROPAG_EMP_NAME +'</p></td>';
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
        propagPrintPop.global.hwpCtrl.PrintDocument();
    }
}