const screenPrintPop = {
    global: {
        hwpCtrl : "",
        params : "",
        now : "",
        fileTitle : ""
    },

    init: function(){
        screenPrintPop.dataSet();
    },

    dataSet: function(){
        screenPrintPop.loading();
        screenPrintPop.global.params = params;
        screenPrintPop.global.hwpCtrl = BuildWebHwpCtrl("hwpApproveContent",screenPrintPop.global.params.hwpUrl, function () {screenPrintPop.editorComplete();});
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
        let filePath = "http://218.158.231.184/upload/templateForm/screenPrintPop2.hwp";
        screenPrintPop.global.hwpCtrl.Open(filePath, "HWP", "", function(){
            screenPrintPop.openCallBack();
            screenPrintPop.global.hwpCtrl.EditMode = 0;
            screenPrintPop.global.hwpCtrl.SetToolBar(1, "TOOLBAR_MENU");
            screenPrintPop.global.hwpCtrl.SetToolBar(1, "TOOLBAR_STANDARD");
            screenPrintPop.global.hwpCtrl.ShowRibbon(false);
            screenPrintPop.global.hwpCtrl.ShowCaret(false);
            screenPrintPop.global.hwpCtrl.ShowStatusBar(false);
            screenPrintPop.global.hwpCtrl.SetFieldViewOption(1);
        }, {"userData" : "success"});

        screenPrintPop.resize();
        $.LoadingOverlay("hide", {});
    },

    openCallBack: function(){
        const recruitInfoSn = $("#recruitInfoSn").val();
        const recruitAreaInfoSn = $("#recruitAreaInfoSn").val();
        const params = {
            recruitInfoSn: recruitInfoSn,
            recruitAreaInfoSn: recruitAreaInfoSn,
            searchTypeArr : "'D','I','IF'"
        }
        const recruitInfo = customKendo.fn_customAjax("/inside/getRecruitAreaList.do", params).recruitArea;
        console.log("recruitInfo", recruitInfo);

        const interViewInfo = customKendo.fn_customAjax("/recruit/manage/eval/getApplicationInterViewList.do", params);
        const interViewList = interViewInfo.list;
        const countH = interViewInfo.countH;
        console.log("interViewInfo", interViewInfo);
        console.log("interViewList", interViewList);
        console.log("countH", countH);

        if(!interViewInfo.flag){
            return;
        }
        let html = "";
        var area = recruitInfo[0];
        var sum = 0;
        var evalCnt = 0;
        var application = [];
        var index = 0;
        var paramArr = [];
        var userArr = [];
        html += '<table style="font-family:굴림체; margin: 0 auto; max-width: none; border-collapse: separate; border-spacing: 0; empty-cells: show; border-width: 0; outline: 0; text-align: left; font-size:12px; line-height: 10px; width: 100%;">';
        html += '   <tr style = "width: 100%">';
        html += '       <td style="border-width: 0 0 0 0; font-weight: normal;">';
        html += '' +
            '<p style="text-align: center"><h2 style="margin: 0">면접위원 평가점수 및 의견</h2></p>' +
            '<table border="1" style="border-collapse: collapse; margin: 0px;">' +
            '<tr>' +
            '   <th style="height:40px;background-color:#99b7dc; text-align:center; width:75px;"><p style="font-size:13px;"><b>지원자</b></p></th>' +
            '   <th style="height:40px;background-color:#99b7dc; text-align:center; width:75px;"><p style="font-size:13px;"><b>면접위원</b></p></th>' +
            '   <th style="height:40px;background-color:#99b7dc; text-align:center; width:75px;"><p style="font-size:13px;"><b>점수</b></p></th>' +
            '   <th style="height:40px;background-color:#99b7dc; text-align:center; width:370px;"><p style="font-size:13px;"><b>평가의견</b></p></th>' +
            '   <th style="height:40px;background-color:#99b7dc; text-align:center; width:80px;"><p style="font-size:13px;"><b>비고</b></p></th>' +
            '</tr>' +
            '<tbody id="applicationTb">';

        let yetName = "";
        for (var i = 0; i < interViewList.length; i++) {
            const map = interViewList[i];
            if(map.SUM_SCORE != null){
                sum += Number(map.SUM_SCORE);
            }
            evalCnt ++;
            index = i;
            
            if(i < interViewList.length -1){
                index++;
            }

            if(map.EMP_NAME_KR != undefined && map.EMP_NAME_KR != null){
                let rowspan = 1;
                for(let j=0; j<countH.length; j++){
                    const jMap = countH[j];
                    if(jMap.APPLICATION_ID = map.APPLICATION_ID){
                        rowspan = jMap.COUNT;
                    }
                }
                html += '' +
                    '<tr style="height: 30px; text-align:center">';
                if(yetName != map.USER_NAME){
                    html += '' +
                        '<td rowspan="'+rowspan+'" class="applicationId_' + map.APPLICATION_ID + '">' + map.USER_NAME + '</td>';
                }
                yetName = map.USER_NAME;

                html += '' +
                    '<td>' + map.EMP_NAME_KR + '</td>' +
                    '<td>' + map.SUM_SCORE + '</td>' +
                    '<td>' + map.OPINION + '</td>' +
                    '<td></td>' +
                    '</tr>';
            }else{
                html += '' +
                    '<tr style="height: 30px; text-align:center">';
                if(yetName != map.USER_NAME){
                    html += '' +
                        '<td rowspan="2" class="applicationId_' + map.APPLICATION_ID + '">' + map.USER_NAME + '</td>';
                }
                yetName = map.USER_NAME;

                html += '' +
                    '<td>-</td>' +
                    '<td>-</td>' +
                    '<td>-</td>' +
                    '<td></td>' +
                    '</tr>';
            }

            if(map.APPLICATION_ID != interViewList[index].APPLICATION_ID || interViewList.length == (i+1)){
                html += '' +
                    '<tr style="height: 30px; text-align:center">' +
                    '<td>평균점수</td>' +
                    '<td>' + Number((sum/evalCnt)).toFixed(1) + '</td>' +
                    '<td></td>' +
                    '<td></td>' +
                    '</tr>';

                sum = 0;
                evalCnt = 0;
                application.push(map.APPLICATION_ID);
            }

            if(map.EVAL_LOGIN_ID != undefined && map.EVAL_LOGIN_ID != null) {
                var data = {
                    evalItemMainId: map.EVAL_ITEM_MAIN_ID,
                    evalLoginId: map.EVAL_LOGIN_ID,
                    evalScreenType: "in",
                    applicationId: map.APPLICATION_ID,
                    userName: map.USER_NAME,
                    empName: map.EMP_NAME_KR,
                    empSeq : map.EMP_SEQ
                };
                paramArr.push(data);
            }
            userArr.push(map.USER_NAME);
        }
        html += '' +
            '</tbody>' +
            '</table>';
        html += '       </td>';
        html += '   </tr>';
        html += '</table>';

        for(var x = 0; x < paramArr.length; x++) {
            html += '<table style="font-family:굴림체; margin: 0 auto; max-width: none; border-collapse: separate; border-spacing: 0; empty-cells: show; border-width: 0; outline: 0; text-align: left; font-size:12px; line-height: 10px; width: 100%;">';
            html += '   <tr style = "width: 100%">';
            html += '       <td style="border-width: 0 0 0 0; font-weight: normal;">';
            html += '' +
                '<p style="text-align: center"><h2 style="margin: 0">면접평가표</h2></p>' +
                '<table border="1" style="border-collapse: collapse; margin: 0px;">' +
                '<tr>' +
                '   <th style="height:40px;background-color:#99b7dc; text-align:center; width:90px;"><p style="font-size:13px;"><b>지원분야</b></p></th>' +
                '   <td style="height:40px;background-color:#FFFFFF; text-align:center; width:375px;"><p style="font-size:13px;"><b>' + area.JOB + '</b></p></td>' +
                '   <th style="height:40px;background-color:#99b7dc; text-align:center; width:90px;"><p style="font-size:13px;"><b>지원자이름</b></p></th>' +
                '   <td style="height:40px;background-color:#FFFFFF; text-align:center; width:120px;"><p style="font-size:13px;"><b>' + paramArr[x].userName + '</b></p></td>' +
                '</tr>' +
                '</table>' +

                '<table border="1" style="border-collapse: collapse; margin: 0px; width: 1500px;">' +
                '<tr>' +
                '    <th style="height:50px;background-color:#99b7dc; text-align:center; width:80px;"><p style="font-size:13px;"><b>연번</b></p></th>' +
                '    <th style="height:50px;background-color:#99b7dc; text-align:center; width:100px;"><p style="font-size:13px;"><b>평가구분</b></p></th>' +
                '    <th style="height:50px;background-color:#99b7dc; text-align:center; width:335px;"><p style="font-size:13px;"><b>질문 및 평가에 대한 착안점</b></p></th>' +
                '    <th style="height:50px;background-color:#99b7dc; text-align:center; width:80px;"><p style="font-size:13px;"><b>평가</b></p></th>' +
                '    <th style="height:50px;background-color:#99b7dc; text-align:center; width:80px;"><p style="font-size:13px;"><b>점수</b></p></th>' +
                '</tr>' +
                '<tbody id="applicationTb">';

            const scoreBoardInfo = customKendo.fn_customAjax("/evaluation/getApplicationScoreBoard", paramArr[x]);
            const scoreBoardData = scoreBoardInfo.rs;

            if (scoreBoardInfo.flag) {
                var total = 0;
                var itemList = scoreBoardData.itemList;
                var evalScoreBoard = scoreBoardData.evalScoreBoard;
                var opinion = "";

                for(var i = 0; i < evalScoreBoard.length; i++) {
                    if(evalScoreBoard[i].EVAL_ITEM_ID == 'opinion'){
                        opinion = evalScoreBoard[i].EVAL_ITEM_SCORE;
                    }
                    //평가일자
                    paramArr[x].REG_DT = evalScoreBoard[0].EVALUATION_DT;
                }

                for(var i = 0; i < itemList.length; i++) {
                    html += "" +
                        '<tr style="height: 50px;">' +
                        '<td style="text-align: center">' + (i + 1) + '</td>' +
                        '<td style="text-align: left;">' + itemList[i].EVAL_ITEM_TYPE + '</td>' +
                        '<td style="text-align: left">' + itemList[i].EVAL_ITEM_TITLE.replaceAll("\n", "<br>") + '</td>' +
                        '<td style="text-align: center">' + itemList[i].EVAL_ITEM_VAL + '</td>' +
                        '<td style="text-align: center">' + evalScoreBoard[i].EVAL_ITEM_SCORE + '</td>' +
                        '</tr>';

                    total += Number(evalScoreBoard[i].EVAL_ITEM_SCORE);
                }
                html += "" +
                    '<tr style="height: 50px;">' +
                    '<th colSpan="3" style="text-align: center">총&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;점</th>' +
                    '<td style="text-align: center">100</td>' +
                    '<td style="text-align: center">' + total + '</td>' +
                    '</tr>';

                html += "" +
                    '</table>'+
                    '</div>';

                html += "" +
                    '<caption>※ 채점기준점수 : ▲80점이상 : 합격 ▲80점미만~70점이상 : 후보 ▲70점미만 : 불합격</caption>';

                html += "" +
                '<table border="1" style="border-collapse: collapse; margin: 0px;">' +
                '<tr>' +
                '   <th style="height:40px;background-color:#99b7dc; text-align:center; width:675px;"><p style="font-size:13px;"><b>의&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;견</b></p></th>' +
                '</tr>' +
                '<tr>' +
                '   <td style="height:40px;background-color:#ffffff; text-align:left; width:675px;"><p style="font-size:13px;">' + opinion + '</p></td>' +
                '</tr>' +
                '</table>';

                /** 사인 조회후 사인이 있으면 이미지 첨부 없으면 정자 */
                const result2 = customKendo.fn_customAjax("/user/getSign", {empSeq: paramArr[x].empSeq});
                console.log("userSign : ");
                console.log(result2);

                var imgHtml = '';
                if(result2.data.signImg != null){
                    const imgMap = result2.data.signImg;
                    imgHtml += '심사위원 : '+paramArr[x].empName+'&nbsp;(인)</div> <img id=\"signPhotoView\" style=\"position:relative; right: -92%; top: -33px\" width=\"50px;\" height=\"50px;\" src=\"'+imgMap.file_path+imgMap.file_uuid+'\">';
                }else{
                    imgHtml += '심사위원 : '+paramArr[x].empName+'&nbsp;<b style=\"\">'+paramArr[x].empName+'</b>';
                }

                html += "" +
                    '<div style="text-align: right;font-size: 12px;margin-right: 40px;" class="mt-20">' +
                    paramArr[x].REG_DT +
                    '<br>' +
                    imgHtml +
                    '</div>';
            }
            html += '       </td>';
            html += '   </tr>';
            html += '</table>';
        }

        screenPrintPop.global.hwpCtrl.MoveToField("html", true, true, false);
        screenPrintPop.global.hwpCtrl.SetTextFile(html.replaceAll("\n", "<br>"), "HTML", "insertfile", {});
    },

    saveHwp : function (){
        screenPrintPop.global.hwpCtrl.SaveAs(screenPrintPop.global.fileTitle, "hwp", "download:true");
    },

    resize: function() {
        if (document.getElementById("hwpctrl_frame") != null && typeof(document.getElementById("hwpctrl_frame")) != "undefined") {
            var pHeight = (window.innerHeight - 20) + "px";
            document.getElementById("hwpctrl_frame").style.width = "100%";
            document.getElementById("hwpctrl_frame").style.height = pHeight;
        }
    },

    print: function() {
        screenPrintPop.global.hwpCtrl.PrintDocument();
    }
}