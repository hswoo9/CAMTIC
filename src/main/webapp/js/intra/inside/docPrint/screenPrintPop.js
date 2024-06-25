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
        let filePath = "http://218.158.231.184/upload/templateForm/screenPrintPop.hwp";
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
            recruitAreaInfoSn: recruitAreaInfoSn
        }
        let careerType;

        const recruitInfo = customKendo.fn_customAjax("/inside/getRecruitAreaList.do", params).recruitArea;
        console.log("recruitInfo", recruitInfo);
        for(let i=0; i<recruitInfo.length; i++){
            const map = recruitInfo[i];
            if(map.RECRUIT_AREA_INFO_SN == recruitAreaInfoSn){
                careerType = map.CAREER_TYPE;
            }
        }
        console.log("careerType", careerType);

        const screenViewInfo = customKendo.fn_customAjax("/recruit/manage/eval/getApplicationScreenViewList.do", params);
        const screenViewList = screenViewInfo.list;
        console.log("screenViewInfo : ", screenViewInfo);
        console.log("screenViewList : ", screenViewList);

        let applicationArr = "";
        for(let i = 0; i < screenViewList.length; i++){
            applicationArr += "," + screenViewList[i].APPLICATION_ID;
        }
        params.evalScreenType = "doc";
        params.applicationArr = applicationArr.substring(1);
        const scoreBoardInfo = customKendo.fn_customAjax("/evaluation/getApplicationScoreBoard", params);
        const scoreBoardData = scoreBoardInfo.rs;
        console.log("scoreBoardInfo : ", scoreBoardInfo);
        console.log("scoreBoardData : ", scoreBoardData);
        console.log("evalScoreBoard : ", scoreBoardData.evalScoreBoard);

        if(scoreBoardInfo.flag){
            if(careerType == "1"){
                screenPrintPop.makeType1ApplicationList(screenViewList, scoreBoardData.evalCnt, recruitInfo, scoreBoardData.evalScoreBoard);
            }else{
                screenPrintPop.makeType2ApplicationList(screenViewList, scoreBoardData.evalCnt, recruitInfo, scoreBoardData.evalScoreBoard);
            }
        }
    },

    makeType1ApplicationList : function(e, cnt, recruitInfo, evalScoreBoard){
        var html = "";
        for(var x = 0 ; x < cnt.length ; x++) {
            var area = recruitInfo[0];

            var totLen = e.length;

            var aLen = Math.ceil((totLen / 16 * 100) / 100);

            if (aLen == 0) {
                aLen = 1;
            }

            var rowIdx = 0;
            var jdx = 0;

            for (var i = 0; i < aLen; i++) {
                html += '<table style="font-family:굴림체; margin: 0 auto; max-width: none; border-collapse: separate; border-spacing: 0; empty-cells: show; border-width: 0; outline: 0; text-align: left; font-size:12px; line-height: 10px; width: 100%;">';
                html += '   <tr style = "width: 100%">';
                html += '       <td style="border-width: 0 0 0 0; font-weight: normal;">';
                html += '' +
                    '<p style="text-align: center"><h2 style="margin: 0">채용 서류심사 평가표(경력)</h2></p>' +
                    '<table border="1" style="border-collapse: collapse; margin: 0px; width: 1500px; height: 500;">' +
                    '<tr>' +
                    '   <th style="height:40px;background-color:#99b7dc; text-align:center; width:100px;"><p style="font-size:13px;"><b>근무부서</b></p></th>' +
                    '   <td style="height:40px;background-color:#FFFFFF; text-align:center; width:170px;"><p style="font-size:13px;"><b>' + area.DEPT_NAME + ' <br> ' + area.TEAM_NAME + '</b></p></td>' +
                    '   <th style="height:40px;background-color:#99b7dc; text-align:center; width:105px;"><p style="font-size:13px;"><b>채용부문</b></p></th>' +
                    '   <td style="height:40px;background-color:#FFFFFF; text-align:center; width:225px;"><p style="font-size:13px;"><b>' + area.JOB + '</b></p></td>' +
                    '   <th style="height:40px;background-color:#99b7dc; text-align:center; width:85px;"><p style="font-size:13px;"><b>필요경력</b></p></th>' +
                    '   <td style="height:40px;background-color:#FFFFFF; text-align:center; width:60px;"><p style="font-size:13px;"><b>' + area.CAREER + '</b></p></td>' +
                    '   <th style="height:40px;background-color:#99b7dc; text-align:center; width:105px;"><p style="font-size:13px;"><b>채용직급</b></p></th>' +
                    '   <td style="height:40px;background-color:#FFFFFF; text-align:center; width:120px;"><p style="font-size:13px;"><b>' + area.DUTY + '</b></p></td>' +
                    '</tr>' +
                    '</table>' +

                    '<table border="1" style="border-collapse: collapse; margin: 0px; width: 1500px; height: 1500; text-align: center;">' +
                    '<tr>' +
                    '    <th style="height:50px;background-color:#99b7dc; text-align:center; width:80px;" rowSpan="2"><p style="font-size:13px;"><b>번호</b></p></th>' +
                    '    <th style="height:50px;background-color:#99b7dc; text-align:center; width:100px;" rowSpan="2"><p style="font-size:13px;"><b>성명</b></p></th>' +
                    '    <th style="height:25px;background-color:#99b7dc; text-align:center;" colSpan="3"><p style="font-size:13px;"><b>학력(20점)</b></p></th>' +
                    '    <th style="height:25px;background-color:#99b7dc; text-align:center;" colSpan="3"><p style="font-size:13px;"><b>경력(50점)</b></p></th>' +
                    '    <th style="height:25px;background-color:#99b7dc; text-align:center;" colSpan="3"><p style="font-size:13px;"><b>전문성(30점)</b></p></th>' +
                    '    <th style="height:50px;background-color:#99b7dc; text-align:center; width:105px;" rowSpan="2"><p style="font-size:13px;"><b>평가점수<br>(100점)</b></p></th>' +
                    '    <th style="height:50px;background-color:#99b7dc; text-align:center; width:105px;" rowspan="2"><p style="font-size:13px;"><b>기타의견</b></p></th>' +
                    '</tr>' +
                    '<tr>' +
                    '    <th style="height:25px;background-color:#99b7dc; text-align:center; width:65px;"><p style="font-size:13px;"><b>上(20)</b></p></th>' +
                    '    <th style="height:25px;background-color:#99b7dc; text-align:center; width:65px;"><p style="font-size:13px;"><b>中(15)</b></p></th>' +
                    '    <th style="height:25px;background-color:#99b7dc; text-align:center; width:65px;"><p style="font-size:13px;"><b>下(10)</b></p></th>' +
                    '    <th style="height:25px;background-color:#99b7dc; text-align:center; width:65px;"><p style="font-size:13px;"><b>上(50)</b></p></th>' +
                    '    <th style="height:25px;background-color:#99b7dc; text-align:center; width:65px;"><p style="font-size:13px;"><b>中(40)</b></p></th>' +
                    '    <th style="height:25px;background-color:#99b7dc; text-align:center; width:65px;"><p style="font-size:13px;"><b>下(30)</b></p></th>' +
                    '    <th style="height:25px;background-color:#99b7dc; text-align:center; width:65px;"><p style="font-size:13px;"><b>上(30)</b></p></th>' +
                    '    <th style="height:25px;background-color:#99b7dc; text-align:center; width:65px;"><p style="font-size:13px;"><b>中(25)</b></p></th>' +
                    '    <th style="height:25px;background-color:#99b7dc; text-align:center; width:65px;"><p style="font-size:13px;"><b>下(20)</b></p></th>' +
                    '</tr>' +
                    '<tbody id="applicationTb">';
                if (e != null && e.length > 0) {
                    var tCnt = 0;
                    if (totLen > 16) {
                        tCnt = 16;
                    } else {
                        tCnt = totLen;
                    }

                    for (var j = 0; j < tCnt; j++) {
                        rowIdx++;
                        html += "" +
                            '<tr style="text-align:center">' +
                            '   <td style="height:30px">' + (rowIdx) + '</td>' +
                            '   <td>' + e[jdx].USER_NAME + '</td>';
                            var sum = 0;
                            var rmk = "";
                            for(let k=0; k<evalScoreBoard.length; k++){
                                const kMap = evalScoreBoard[k];
                                if(e[jdx].APPLICATION_ID == kMap.APPLICATION_ID && cnt[x].EVAL_LOGIN_ID == kMap.EVAL_LOGIN_ID && kMap.EVAL_ITEM_ID == "doc1"){
                                    if(kMap.EVAL_ITEM_SCORE == "20"){
                                        html +=
                                            '   <td>O</td>' +
                                            '   <td></td>' +
                                            '   <td></td>';
                                    }else if(kMap.EVAL_ITEM_SCORE == "15"){
                                        html +=
                                            '   <td></td>' +
                                            '   <td>O</td>' +
                                            '   <td></td>';
                                    }else{
                                        html +=
                                            '   <td></td>' +
                                            '   <td></td>' +
                                            '   <td>O</td>';
                                    }
                                    sum += Number(kMap.EVAL_ITEM_SCORE);
                                }

                                if(e[jdx].APPLICATION_ID == kMap.APPLICATION_ID && cnt[x].EVAL_LOGIN_ID == kMap.EVAL_LOGIN_ID && kMap.EVAL_ITEM_ID == "doc2"){
                                    if(kMap.EVAL_ITEM_SCORE == "50"){
                                        html +=
                                            '   <td>O</td>' +
                                            '   <td></td>' +
                                            '   <td></td>';
                                    }else if(kMap.EVAL_ITEM_SCORE == "40"){
                                        html +=
                                            '   <td></td>' +
                                            '   <td>O</td>' +
                                            '   <td></td>';
                                    }else{
                                        html +=
                                            '   <td></td>' +
                                            '   <td></td>' +
                                            '   <td>O</td>';
                                    }
                                    sum += Number(kMap.EVAL_ITEM_SCORE);
                                }

                                if(e[jdx].APPLICATION_ID == kMap.APPLICATION_ID && cnt[x].EVAL_LOGIN_ID == kMap.EVAL_LOGIN_ID && kMap.EVAL_ITEM_ID == "doc3"){
                                    if(kMap.EVAL_ITEM_SCORE == "30"){
                                        html +=
                                            '   <td>O</td>' +
                                            '   <td></td>' +
                                            '   <td></td>';
                                    }else if(kMap.EVAL_ITEM_SCORE == "25"){
                                        html +=
                                            '   <td></td>' +
                                            '   <td>O</td>' +
                                            '   <td></td>';
                                    }else{
                                        html +=
                                            '   <td></td>' +
                                            '   <td></td>' +
                                            '   <td>O</td>';
                                    }
                                    sum += Number(kMap.EVAL_ITEM_SCORE);
                                }

                                if(e[jdx].APPLICATION_ID == kMap.APPLICATION_ID && cnt[x].EVAL_LOGIN_ID == kMap.EVAL_LOGIN_ID && kMap.EVAL_ITEM_ID == "otherRmk"){
                                    rmk += kMap.EVAL_ITEM_SCORE
                                }
                            }
                            html += '   <td>'+ sum +'</span>점</td>' +
                            '   <td> </td>' +
                            '</tr>';

                        jdx++;
                    }

                    if (totLen > 16) {
                        totLen -= 16;
                    }
                } else {
                    html += "" +
                        '<tr>' +
                        '<td colspan="13">데이터가 없습니다.</td>' +
                        '</tr>'
                }

                /** 사인 조회후 사인이 있으면 이미지 첨부 없으면 정자 */
                console.log("cnt[x]", cnt[x]);
                const result = customKendo.fn_customAjax("/user/getSign", {empSeq: cnt[x].EMP_SEQ});
                let imgHtml = '';
                if(result.data.signImg != null){
                    const imgMap = result.data.signImg;
                    imgHtml += '<span style=\"width: 180px; margin-top: 10px; float: right\">심사위원 : '+cnt[x].EMP_NAME_KR+'&nbsp;</span> <img id=\"signPhotoView\" style=\"position:relative; right: -198px; top: -6px\" width=\"50px;\" height=\"50px;\" src=\"'+imgMap.file_path+imgMap.file_uuid+'\">';
                }else{
                    imgHtml += '<span style=\"width: 180px; margin-top: 10px; float: right\">심사위원 : '+cnt[x].EMP_NAME_KR+'&nbsp;<b style=\"\">'+cnt[x].EMP_NAME_KR+'</b></span>';
                }

                html += '</tbody>' +
                    '</table>' +
                    '<p style="font-size: 13px;text-align: center" class="mt-15">' +
                    '■평점요소: △학력(20점)-응시분야 직무에 대한 학력 전공 ' +
                    '△경력(50점)-응시분야 및 관련분야 실무능력 ' +
                    '△전문성(30점)-응시분야 직무에 대한 전문지식' +
                    '</p>' +
                    '<div style="text-align: right;font-size: 12px; position: relative; top: 0px; right: 50px; margin-top: 130px;">' +
                    cnt[x].REG_DT + "<br>" +
                    imgHtml +
                    '</div>' +
                    '</div>';
                html += '       </td>';
                html += '   </tr>';
                html += '</table>';
            }
        }
        screenPrintPop.global.hwpCtrl.MoveToField("html", true, true, false);
        screenPrintPop.global.hwpCtrl.SetTextFile(html.replaceAll("\n", "<br>"), "HTML", "insertfile", {});
    },

    makeType2ApplicationList : function(e, cnt, recruitInfo, evalScoreBoard){
        var html = "";
        for(var x = 0 ; x < cnt.length ; x++) {
            var area = recruitInfo[0];

            var totLen = e.length;

            var aLen = Math.ceil((totLen / 16 * 100) / 100);

            if (aLen == 0) {
                aLen = 1;
            }

            var rowIdx = 0;
            var jdx = 0;

            for (var i = 0; i < aLen; i++) {
                html += '<table style="font-family:굴림체; margin: 0 auto; max-width: none; border-collapse: separate; border-spacing: 0; empty-cells: show; border-width: 0; outline: 0; text-align: left; font-size:12px; line-height: 10px; width: 100%;">';
                html += '   <tr style = "width: 100%">';
                html += '       <td style="border-width: 0 0 0 0; font-weight: normal;">';
                html += '' +
                    '<p style="text-align: center"><h2 style="margin: 0">채용 서류심사 평가표(신입)</h2></p>' +
                    '<table border="1" style="border-collapse: collapse; margin: 0px; width: 1500px;">' +
                    '<tr>' +
                    '   <th style="height:40px;background-color:#99b7dc; text-align:center; width:100px;"><p style="font-size:13px;"><b>근무부서</b></p></th>' +
                    '   <td style="height:40px;background-color:#FFFFFF; text-align:center; width:170px;"><p style="font-size:13px;"><b>' + area.DEPT_NAME + ' <br> ' + area.TEAM_NAME + '</b></p></td>' +
                    '   <th style="height:40px;background-color:#99b7dc; text-align:center; width:105px;"><p style="font-size:13px;"><b>채용부문</b></p></th>' +
                    '   <td style="height:40px;background-color:#FFFFFF; text-align:center; width:225px;"><p style="font-size:13px;"><b>' + area.JOB + '</b></p></td>' +
                    '   <th style="height:40px;background-color:#99b7dc; text-align:center; width:85px;"><p style="font-size:13px;"><b>필요경력</b></p></th>' +
                    '   <td style="height:40px;background-color:#FFFFFF; text-align:center; width:60px;"><p style="font-size:13px;"><b>' + area.CAREER + '</b></p></td>' +
                    '   <th style="height:40px;background-color:#99b7dc; text-align:center; width:105px;"><p style="font-size:13px;"><b>채용직급</b></p></th>' +
                    '   <td style="height:40px;background-color:#FFFFFF; text-align:center; width:120px;"><p style="font-size:13px;"><b>' + area.DUTY + '</b></p></td>' +
                    '</tr>' +
                    '</table>' +

                    '<table border="1" style="border-collapse: collapse; margin: 0px; width: 1500px; text-align: center;">' +
                    '<tr>' +
                    '    <th style="height:50px;background-color:#99b7dc; text-align:center; width:80px;" rowSpan="2"><p style="font-size:13px;"><b>번호</b></p></th>' +
                    '    <th style="height:50px;background-color:#99b7dc; text-align:center; width:100px;" rowSpan="2"><p style="font-size:13px;"><b>성명</b></p></th>' +
                    '    <th style="height:25px;background-color:#99b7dc; text-align:center;" colSpan="3"><p style="font-size:13px;"><b>학력/전공(40점)</b></p></th>' +
                    '    <th style="height:25px;background-color:#99b7dc; text-align:center;" colSpan="3"><p style="font-size:13px;"><b>서류충실도(60점)</b></p></th>' +
                    '    <th style="height:50px;background-color:#99b7dc; text-align:center; width:105px;" rowSpan="2"><p style="font-size:13px;"><b>평가점수<br>(100점)</b></p></th>' +
                    '    <th style="height:50px;background-color:#99b7dc; text-align:center; width:295px;" rowspan="2"><p style="font-size:13px;"><b>기타의견</b></p></th>' +
                    '</tr>' +
                    '<tr>' +
                    '    <th style="height:25px;background-color:#99b7dc; text-align:center; width:65px;"><p style="font-size:13px;"><b>上(40)</b></p></th>' +
                    '    <th style="height:25px;background-color:#99b7dc; text-align:center; width:65px;"><p style="font-size:13px;"><b>中(30)</b></p></th>' +
                    '    <th style="height:25px;background-color:#99b7dc; text-align:center; width:65px;"><p style="font-size:13px;"><b>下(20)</b></p></th>' +
                    '    <th style="height:25px;background-color:#99b7dc; text-align:center; width:65px;"><p style="font-size:13px;"><b>上(60)</b></p></th>' +
                    '    <th style="height:25px;background-color:#99b7dc; text-align:center; width:65px;"><p style="font-size:13px;"><b>中(50)</b></p></th>' +
                    '    <th style="height:25px;background-color:#99b7dc; text-align:center; width:65px;"><p style="font-size:13px;"><b>下(40)</b></p></th>' +
                    '</tr>' +
                    '<tbody id="applicationTb">';
                if (e != null && e.length > 0) {
                    var tCnt = 0;
                    if (totLen > 16) {
                        tCnt = 16;
                    } else {
                        tCnt = totLen;
                    }

                    for (var j = 0; j < tCnt; j++) {
                        rowIdx++;
                        html += "" +
                            '<tr style="text-align:center">' +
                            '   <td style="height:30px">' + (rowIdx) + '</td>' +
                            '   <td>' + e[jdx].USER_NAME + '</td>';
                        var sum = 0;
                        var rmk = "";
                        for(let k=0; k<evalScoreBoard.length; k++){
                            const kMap = evalScoreBoard[k];
                            if(e[jdx].APPLICATION_ID == kMap.APPLICATION_ID && cnt[x].EVAL_LOGIN_ID == kMap.EVAL_LOGIN_ID && kMap.EVAL_ITEM_ID == "doc1"){
                                if(kMap.EVAL_ITEM_SCORE == "20"){
                                    html +=
                                        '   <td>O</td>' +
                                        '   <td></td>' +
                                        '   <td></td>';
                                }else if(kMap.EVAL_ITEM_SCORE == "15"){
                                    html +=
                                        '   <td></td>' +
                                        '   <td>O</td>' +
                                        '   <td></td>';
                                }else{
                                    html +=
                                        '   <td></td>' +
                                        '   <td></td>' +
                                        '   <td>O</td>';
                                }
                                sum += Number(kMap.EVAL_ITEM_SCORE);
                            }

                            if(e[jdx].APPLICATION_ID == kMap.APPLICATION_ID && cnt[x].EVAL_LOGIN_ID == kMap.EVAL_LOGIN_ID && kMap.EVAL_ITEM_ID == "doc2"){
                                if(kMap.EVAL_ITEM_SCORE == "50"){
                                    html +=
                                        '   <td>O</td>' +
                                        '   <td></td>' +
                                        '   <td></td>';
                                }else if(kMap.EVAL_ITEM_SCORE == "40"){
                                    html +=
                                        '   <td></td>' +
                                        '   <td>O</td>' +
                                        '   <td></td>';
                                }else{
                                    html +=
                                        '   <td></td>' +
                                        '   <td></td>' +
                                        '   <td>O</td>';
                                }
                                sum += Number(kMap.EVAL_ITEM_SCORE);
                            }

                            if(e[jdx].APPLICATION_ID == kMap.APPLICATION_ID && cnt[x].EVAL_LOGIN_ID == kMap.EVAL_LOGIN_ID && kMap.EVAL_ITEM_ID == "otherRmk"){
                                rmk += kMap.EVAL_ITEM_SCORE;
                            }
                        }
                        html += '   <td>'+ sum +'</span>점</td>' +
                            '   <td></td>' +
                            '</tr>';

                        jdx++;
                    }

                    if (totLen > 16) {
                        totLen -= 16;
                    }
                } else {
                    html += "" +
                        '<tr>' +
                        '<td colspan="10">데이터가 없습니다.</td>' +
                        '</tr>'
                }

                /** 사인 조회후 사인이 있으면 이미지 첨부 없으면 정자 */
                console.log("cnt[x]", cnt[x]);
                const result = customKendo.fn_customAjax("/user/getSign", {empSeq: cnt[x].EMP_SEQ});
                let imgHtml = '';
                if(result.data.signImg != null){
                    const imgMap = result.data.signImg;
                    imgHtml += '<span style=\"width: 180px; margin-top: 10px; float: right\">심사위원 : '+cnt[x].EMP_NAME_KR+'&nbsp;</span> <img id=\"signPhotoView\" style=\"position:relative; right: -198px; top: -6px\" width=\"50px;\" height=\"50px;\" src=\"'+imgMap.file_path+imgMap.file_uuid+'\">';
                }else{
                    imgHtml += '<span style=\"width: 180px; margin-top: 10px; float: right\">심사위원 : '+cnt[x].EMP_NAME_KR+'&nbsp;<b style=\"\">'+cnt[x].EMP_NAME_KR+'</b></span>';
                }

                html += '</tbody>' +
                    '</table>' +
                    '<p style="font-size: 13px;text-align: center" class="mt-15">' +
                    '■평점요소: △학력/전공(40점)-응시분야 직무에 대한 학력 전공 ' +
                    '△서류충실도(60점)-응시분야 및 관련분야 실무능력 ' +
                    '</p>' +
                    '<div style="text-align: right;font-size: 12px; position: relative; top: 0px; right: 50px; margin-top: 130px;">' +
                    cnt[x].REG_DT + "<br>" +
                    imgHtml +
                    '</div>' +
                    '</div>';
                html += '       </td>';
                html += '   </tr>';
                html += '</table>';
            }
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