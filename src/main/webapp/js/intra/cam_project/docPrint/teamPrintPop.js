const teamPrintPop = {
    global: {
        hwpCtrl : "",
        params : "",
    },

    init: function(){
        teamPrintPop.dataSet();
    },

    dataSet: function(){
        teamPrintPop.loading();
        teamPrintPop.global.params = params;
        teamPrintPop.global.hwpCtrl = BuildWebHwpCtrl("hwpApproveContent", teamPrintPop.global.params.hwpUrl, function () {teamPrintPop.editorComplete();});
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
        let filePath = "http://218.158.231.186/upload/templateForm/teamPrintTmp.hwp";
        teamPrintPop.global.hwpCtrl.Open(filePath, "HWP", "", function(){
            teamPrintPop.openCallBack();
            teamPrintPop.global.hwpCtrl.EditMode = 0;
            teamPrintPop.global.hwpCtrl.SetToolBar(1, "TOOLBAR_MENU");
            teamPrintPop.global.hwpCtrl.SetToolBar(1, "TOOLBAR_STANDARD");
            teamPrintPop.global.hwpCtrl.ShowRibbon(false);
            teamPrintPop.global.hwpCtrl.ShowCaret(false);
            teamPrintPop.global.hwpCtrl.ShowStatusBar(false);
            teamPrintPop.global.hwpCtrl.SetFieldViewOption(1);
        }, {"userData" : "success"});

        teamPrintPop.resize();
        $.LoadingOverlay("hide", {});
    },

    openCallBack: function(){
        const data = {
            pjtSn : $("#pjtSn").val()
        }
        const pjtSn = $("#pjtSn").val();
        const teamVersionSn = $("#teamVersionSn").val();

        const result = customKendo.fn_customAjax("/project/engn/getDelvData", {pjtSn: pjtSn});
        const delvMap = result.delvMap;
        const pjtMap = result.map;
        const setParameters = customKendo.fn_customAjax("/project/getProjectStep", data).rs;
        const verList = customKendo.fn_customAjax("/project/team/getTeamVersion", data).list;

        /** 1. 사업정보 */
        teamPrintPop.global.hwpCtrl.PutFieldText('PJT_NM', pjtMap.PJT_NM);
        teamPrintPop.global.hwpCtrl.PutFieldText('CRM_NM', pjtMap.CRM_NM);
        teamPrintPop.global.hwpCtrl.PutFieldText('PM_EMP_NM', delvMap.PM_EMP_NM);
        teamPrintPop.global.hwpCtrl.PutFieldText("PJT_DT", delvMap.PJT_STR_DT + " ~ " + delvMap.PJT_END_DT);

        let amtText = "";
        if(pjtMap.PJT_STEP < "E3" && delvMap != null){
            amtText = comma(delvMap.DELV_AMT);
        }else if(pjtMap.PJT_STEP >= "E3"){
            amtText = comma(pjtMap.PJT_AMT);
        }else{
            amtText = comma(setParameters.EXP_AMT);
        }
        teamPrintPop.global.hwpCtrl.PutFieldText('PJT_AMT', amtText);

        let verMap;
        for(let i=0; i<verList.length; i++){
            if(verList[i].TEAM_VERSION_SN == teamVersionSn){
                verMap = verList[i];
                teamPrintPop.global.hwpCtrl.PutFieldText('VERSION', String(i+1));
                teamPrintPop.global.hwpCtrl.PutFieldText('REG_DATE', verMap.REG_DATE);
                teamPrintPop.global.hwpCtrl.PutFieldText('TEAM_VERSION_SN', "협업번호 : 23-"+verMap.TEAM_VERSION_SN);
            }
        }

        /** 2. 사업비 배분 / 협업 내역 */
        data.teamVersionSn = teamVersionSn
        const teamList = customKendo.fn_customAjax("/project/team/getTeamList", data).list;
        const myMap = teamList[0];
        const leftResult = customKendo.fn_customAjax("/project/team/getVerLeftAmt", data);
        const leftMap = leftResult.data;

        /** 총예산 */
        const delvAmt = uncomma(amtText);
        /** 협업 예산 */
        const leftAmt = leftMap.TM_AMT_SUM;
        /** 자가 배분금액 */
        const myAmt = Number(delvAmt) - Number(leftAmt);
        /** 자가 배분비율 */
        const myPer = Math.round(Number(myAmt) / Number(delvAmt) * 100) + "%";
        /** 자가 예상수익 */
        const myIncomePer = Math.round(100 - Number(myMap.TM_INV_AMT / uncomma(delvAmt) * 100)) + "%";

        let html = '';
        html += '<table style="font-family:굴림체;margin: 0 auto; max-width: none; border-collapse: separate; border-spacing: 0; empty-cells: show; border-width: 0; outline: 0; text-align: left; font-size:12px; line-height: 20px; width: 100%; ">';
        html += '   <tr>';
        html += '       <td style="border-width: 0 0 0 0; font-weight: normal; box-sizing: border-box;">';
        html += '           <table border="1" style="border-collapse: collapse; margin: 0px;">';
        html += '               <tr>';
        html += '                   <td style="height:30px;background-color:#E5E5E5; text-align:center; width: 93px;"><p style="font-size:13px;"><b>팀 명</b></p></td>';
        html += '                   <td style="height:30px;background-color:#E5E5E5; text-align:center; width: 93px;"><p style="font-size:13px;"><b>수주 배분액</b></p></td>';
        html += '                   <td style="height:30px;background-color:#E5E5E5; text-align:center; width: 93px;"><p style="font-size:13px;"><b>협업 배분액</b></p></td>';
        html += '                   <td style="height:30px;background-color:#E5E5E5; text-align:center; width: 93px;"><p style="font-size:13px;"><b>협업 배분율</b></p></td>';
        html += '                   <td style="height:30px;background-color:#E5E5E5; text-align:center; width: 93px;"><p style="font-size:13px;"><b>예상 수익률</b></p></td>';
        html += '                   <td style="height:30px;background-color:#E5E5E5; text-align:center; width: 93px;"><p style="font-size:13px;"><b>예상운영수익</b></p></td>';
        html += '                   <td style="height:30px;background-color:#E5E5E5; text-align:center; width: 93px;"><p style="font-size:13px;"><b>수익 배분율</b></p></td>';
        html += '               </tr>';
        /** 자가 */
        html += '               <tr>';
        html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;">'+ commonProject.getDept(verMap.REG_EMP_SEQ) +'</p></td>';
        html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:right;"><p style="font-size:13px;">'+ amtText +'</p></td>';
        html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:right;"><p style="font-size:13px;">'+ comma(myAmt) +'</p></td>';
        html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:right;"><p style="font-size:13px;">'+ myPer +'</p></td>';
        html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:right;"><p style="font-size:13px;">'+ myIncomePer +'</p></td>';
        html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:right;"><p style="font-size:13px;">'+ comma(myAmt - myMap.TM_INV_AMT) +'</p></td>';
        html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:right;"><p style="font-size:13px;">'+ "100%" +'</p></td>';
        html += '               </tr>';
        for(let i=1; i<teamList.length; i++){
            const teamMap = teamList[i];
            html += '               <tr>';
            html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:13px;">'+ commonProject.getDept(teamMap.TM_PM_SEQ) +'</p></td>';
            html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:right;"><p style="font-size:13px;">0</p></td>';
            html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:right;"><p style="font-size:13px;">'+ comma(teamMap.TM_AMT) +'</p></td>';
            const teamAmt = teamMap.TM_AMT;
            const teamPer = (100 - Math.round(100 - Number(teamAmt) / Number(delvAmt) * 100)) + "%";
            html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:right;"><p style="font-size:13px;">'+ teamPer +'</p></td>';
            const teamInvAmt = teamMap.TM_INV_AMT;
            const teamIncomePer = Math.round(100 - Number(teamInvAmt) / Number(teamAmt) * 100) + "%";
            html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:right;"><p style="font-size:13px;">'+ teamIncomePer +'</p></td>';
            html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:right;"><p style="font-size:13px;">'+ comma(Number(teamMap.TM_AMT) - Number(teamMap.TM_INV_AMT)) +'</p></td>';
            html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:right;"><p style="font-size:13px;">'+ "0%" +'</p></td>';
            html += '               </tr>';
        }
        html += '           </table>';
        html += '       </td>';
        html += '   </tr>';
        html += '</table>';
        teamPrintPop.global.hwpCtrl.MoveToField('TEAM_HTML', true, true, false);
        teamPrintPop.global.hwpCtrl.SetTextFile(html, "html","insertfile");

        html = '';
        html += '<table style="font-family:굴림체;margin: 0 auto; max-width: none; border-collapse: separate; border-spacing: 0; empty-cells: show; border-width: 0; outline: 0; text-align: right; font-size:12px; line-height: 20px; width: 100%; ">';
        html += '   <tr>';
        html += '       <td style="border-width: 0 0 0 0; font-weight: normal; box-sizing: border-box;">';
        html += '           <table border="1" style="border-collapse: collapse; margin: 0px;">';
        html += '               <tr>';
        html += '                   <td rowspan="'+(teamList.length+1)+'" style="height:30px;background-color:#E5E5E5; text-align:center; width: 93px;"><p style="font-size:13px;"><b>확<br><br>인</b></p></td>';
        html += '                   <td style="height:30px;background-color:#E5E5E5; text-align:center; width: 93px;"><p style="font-size:13px;"><b>구 분</b></p></td>';
        html += '                   <td style="height:30px;background-color:#E5E5E5; text-align:center; width: 93px;"><p style="font-size:13px;"><b>담당PM</b></p></td>';
        html += '                   <td style="height:30px;background-color:#E5E5E5; text-align:center; width: 93px;"><p style="font-size:13px;"><b>팀 장</b></p></td>';
        html += '               </tr>';
        for(let i=0; i<teamList.length; i++){
            html += '               <tr>';
            let gubunText = "";
            if(i == 0){
                gubunText = "수주부서";
            }else{
                gubunText = commonProject.getDept(teamList[i].TM_PM_SEQ);
            }
            html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center; width: 93px;"><p style="font-size:13px;"><b>'+gubunText+'</b></p></td>';
            html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center; width: 93px;"><p style="font-size:13px;"><b>(서명)</b></p></td>';
            html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:center; width: 93px;"><p style="font-size:13px;"><b>(서명)</b></p></td>';
            html += '               </tr>';
        }
        html += '           </table>';
        html += '       </td>';
        html += '   </tr>';
        html += '</table>';
        setTimeout(function() {
            teamPrintPop.global.hwpCtrl.MoveToField('APP_HTML', true, true, false);
            teamPrintPop.global.hwpCtrl.SetTextFile(html, "html","insertfile");
        }, 500);
    },

    resize: function() {
        if (document.getElementById("hwpctrl_frame") != null && typeof(document.getElementById("hwpctrl_frame")) != "undefined") {
            var pHeight = (window.innerHeight - 20) + "px";
            document.getElementById("hwpctrl_frame").style.width = "100%";
            document.getElementById("hwpctrl_frame").style.height = pHeight;
        }
    },

    print: function() {
        teamPrintPop.global.hwpCtrl.PrintDocument();
    }
}