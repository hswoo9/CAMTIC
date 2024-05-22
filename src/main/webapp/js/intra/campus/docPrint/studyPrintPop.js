const studyPrintPop = {
    global: {
        hwpCtrl : "",
        params : "",

        studyInfo: null,
        journalInfo: null,
        userList: [],
    },

    init: function(){
        studyPrintPop.dataSet();
    },

    dataSet: function(){
        studyPrintPop.loading();
        studyPrintPop.global.params = params;
        studyPrintPop.global.hwpCtrl = BuildWebHwpCtrl("hwpApproveContent", studyPrintPop.global.params.hwpUrl, function () {studyPrintPop.editorComplete();});
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
        let filePath = "http://218.158.231.184/upload/templateForm/studyPrintTmp.hwp";
        studyPrintPop.global.hwpCtrl.Open(filePath, "HWP", "", function(){
            studyPrintPop.openCallBack();
            studyPrintPop.global.hwpCtrl.EditMode = 0;
            studyPrintPop.global.hwpCtrl.SetToolBar(1, "TOOLBAR_MENU");
            studyPrintPop.global.hwpCtrl.SetToolBar(1, "TOOLBAR_STANDARD");
            studyPrintPop.global.hwpCtrl.ShowRibbon(false);
            studyPrintPop.global.hwpCtrl.ShowCaret(false);
            studyPrintPop.global.hwpCtrl.ShowStatusBar(false);
            studyPrintPop.global.hwpCtrl.SetFieldViewOption(1);
        }, {"userData" : "success"});

        studyPrintPop.resize();
        $.LoadingOverlay("hide", {});
    },

    openCallBack: function(){
        let studyInfoSn = $("#studyInfoSn").val();
        let studyJournalSn = $("#studyJournalSn").val();

        const studyResult = customKendo.fn_customAjax("/campus/getStudyInfoOne", {pk: studyInfoSn});
        const studyInfo = studyResult.data;
        studyPrintPop.global.studyInfo = studyInfo;

        const info = customKendo.fn_customAjax("/campus/getStudyJournalOne", {studyJournalSn: studyJournalSn}).data;
        studyPrintPop.global.journalInfo = info;

        const userResult = customKendo.fn_customAjax("/campus/getStudyUserList", {pk: studyInfoSn});
        const userList = userResult.list;
        studyPrintPop.global.userList = userList;

        studyPrintPop.global.hwpCtrl.PutFieldText('STUDY_SUBJECT', studyInfo.STUDY_NAME);
        const htmlStudy = studyPrintPop.htmlCustomStudy();

        studyPrintPop.global.hwpCtrl.MoveToField('USER_TABLE', true, true, false);
        studyPrintPop.global.hwpCtrl.SetTextFile(htmlStudy, "HTML", "insertfile", {});

        if(info.CAPTAIN_APPOVAL_YN == "Y"){
            setTimeout(function() {
                let empSeq = "";
                let empName = "";
                for(let i=0; i<userList.length; i++){
                    if(userList[i].STUDY_CLASS_SN == "1"){
                        empSeq = userList[i].STUDY_EMP_SEQ;
                        empName = userList[i].STUDY_EMP_NAME;
                    }
                }

                if(empSeq != null){
                    studyPrintPop.setSign("SIGN1", empSeq, empName);
                }
            }, 1500);
        }

        if(info.ASSISTANT_APPOVAL_YN == "Y"){
            setTimeout(function() {
                let empSeq = "";
                let empName = "";
                for(let i=0; i<userList.length; i++){
                    if(userList[i].STUDY_CLASS_SN == "2"){
                        empSeq = userList[i].STUDY_EMP_SEQ;
                        empName = userList[i].STUDY_EMP_NAME;
                    }
                }

                if(empSeq != null){
                    studyPrintPop.setSign("SIGN2", empSeq, empName);
                }
            }, 3000);
        }
    },

    setSign: function(fieldName, empSeq, empName){
        let ip = "";
        if(serverName == "218.158.231.184" || serverName == "new.camtic.or.kr"){
            ip = "http://218.158.231.184";
        }else{
            ip = "http://218.158.231.186";
        }

        /** 사인 조회 후 있으면 이미지, 없으면 정자 기입 */
        const result = customKendo.fn_customAjax("/user/getSign", {empSeq: empSeq});
        if(result.data.signImg != null){
            const imgMap = result.data.signImg;

            studyPrintPop.global.hwpCtrl.MoveToField(fieldName, true, true, false);

            studyPrintPop.global.hwpCtrl.InsertPicture(
                ip + imgMap.file_path + imgMap.file_uuid,
                true, 3, false, false, 0, 0, function(ctrl){
                    if(ctrl){
                        console.log('성공');
                    }else{
                        console.log('실패');
                    }
                }
            );
        }else{
            studyPrintPop.global.hwpCtrl.PutFieldText(fieldName, empName);
        }
    },

    htmlCustomStudy: function(){
        const studyInfo = studyPrintPop.global.studyInfo;
        const journalInfo = studyPrintPop.global.journalInfo;
        const userList = studyPrintPop.global.userList;

        const realList = journalInfo.STUDY_EMP_SEQ.split(",");

        let rowspan = 9;
        if(userList.length > 8){
            rowspan = userList.length+1;
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
        let count = 0;
        for(let i=0; i<userList.length; i++){
            const map = userList[i];
            for(let j=0; j<realList.length; j++){
                if(map.STUDY_EMP_SEQ == realList[j]){
                    html += '               <tr>';
                    html += '                   <td style="height:25px;background-color:#FFFFFF; text-align:center;"><p style="font-family:굴림;font-size:14px;">'+ map.STUDY_CLASS_TEXT +'</p></td>';
                    html += '                   <td style="height:25px;background-color:#FFFFFF; text-align:center;"><p style="font-family:굴림;font-size:14px;">'+ map.STUDY_DEPT_NAME+ ' '+map.STUDY_TEAM_NAME +'</p></td>';
                    html += '                   <td style="height:25px;background-color:#FFFFFF; text-align:center;"><p style="font-family:굴림;font-size:14px;">'+ map.STUDY_POSITION_NAME +'</p></td>';
                    html += '                   <td style="height:25px;background-color:#FFFFFF; text-align:center;"><p style="font-family:굴림;font-size:14px;">'+ map.STUDY_EMP_NAME +'</p></td>';
                    html += '               </tr>';
                    count ++
                }
            }
        }
        if(count < 8){
            for(let i=0; i<8-count; i++){
                html += '               <tr>';
                html += '                   <td style="height:25px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;"></p></td>';
                html += '                   <td style="height:25px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;"></p></td>';
                html += '                   <td style="height:25px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;"></p></td>';
                html += '                   <td style="height:25px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;"></p></td>';
                html += '               </tr>';
            }
        }

        html += '               <tr>';
        html += '                   <td style="background-color:#FFE0E0; text-align:center; width: 90px;"><p style="font-family:굴림;font-size:14px;"><b>학습기간</b></p></td>';
        html += '                   <td colspan="4" style="height:30px;background-color:#FFFFFF; text-align:left;"><p style="font-family:굴림;font-size:14px;">'+ journalInfo.JOURNAL_DT + " " + journalInfo.JOURNAL_START_TIME+' ~ '+journalInfo.JOURNAL_END_TIME +'</p></td>';
        html += '               </tr>';
        html += '               <tr>';
        html += '                   <td style="background-color:#FFE0E0; text-align:center; width: 90px;"><p style="font-family:굴림;font-size:14px;"><b>학습장소</b></p></td>';
        html += '                   <td colspan="4" style="height:30px;background-color:#FFFFFF; text-align:left;"><p style="font-family:굴림;font-size:14px;">'+ journalInfo.JOURNAL_LOCATE+'</p></td>';
        html += '               </tr>';
        html += '               <tr>';
        html += '                   <td style="background-color:#FFE0E0; text-align:center; width: 90px;"><p style="font-family:굴림;font-size:14px;"><b>학습내용</b></p></td>';
        html += '                   <td colspan="4" style="height:80px;background-color:#FFFFFF; text-align:left;"><p style="font-family:굴림;font-size:14px;">'+ journalInfo.JOURNAL_CONTENT+'</p></td>';
        html += '               </tr>';
        html += '               <tr>';
        html += '                   <td style="background-color:#FFE0E0; text-align:center; width: 90px;"><p style="font-family:굴림;font-size:14px;"><b>소요비용</b></p></td>';
        html += '                   <td colspan="4" style="height:30px;background-color:#FFFFFF; text-align:left;"><p style="font-family:굴림;font-size:14px;">'+ comma(journalInfo.JOURNAL_AMT)+'</p></td>';
        html += '               </tr>';
        html += '               <tr>';
        html += '                   <td style="background-color:#FFE0E0; text-align:center; width: 90px;"><p style="font-family:굴림;font-size:14px;"><b>첨부서류</b></p></td>';
        html += '                   <td colspan="4" style="height:30px;background-color:#FFFFFF; text-align:left;"><p style="font-family:굴림;font-size:14px;"></p></td>';
        html += '               </tr>';
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
        studyPrintPop.global.hwpCtrl.PrintDocument();
    }
}