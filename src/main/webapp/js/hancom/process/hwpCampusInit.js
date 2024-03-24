var campusInit = {

    global: {
        userInfo: null,

        studyInfo: null,
        propagInfo: null,

        userList: [],
        userList2: [],
        userList3: [],

        ojtSubList: []
    },

    campusInit: function(eduInfoId){
        $("#reqContentId").val(eduInfoId);
        $.ajax({
            url : "/campus/getEduResultOne",
            data : {
                eduInfoId : eduInfoId
            },
            type : "post",
            dataType : "json",
            async: false,
            success : function(result){
                const ResultData = result.data;

                let today = new Date();
                let year = today.getFullYear(); // 년도
                let month = today.getMonth() + 1;  // 월
                let date = today.getDate();  // 날짜
                const eduFormType = Number(ResultData.EDU_FORM_TYPE);


                hwpDocCtrl.putFieldText('deptName', ResultData.DEPT_NAME+" "+ResultData.DEPT_TEAM_NAME);

                hwpDocCtrl.putFieldText('empName', ResultData.EMP_NAME_KR);

                hwpDocCtrl.putFieldText('positionName', ResultData.POSITION_NAME);

                hwpDocCtrl.putFieldText('jobDetail', ResultData.JOB_DETAIL);

                hwpDocCtrl.putFieldText('eduName', ResultData.EDU_NAME);

                let eduDate = ResultData.START_DT.split("-")[0]+"년"+ResultData.START_DT.split("-")[1]+"월"+ResultData.START_DT.split("-")[2]+"일"
                    +" ~ "
                    +ResultData.END_DT.split("-")[0]+"년"+ResultData.END_DT.split("-")[1]+"월"+ResultData.END_DT.split("-")[2]+"일";

                if(eduFormType != 7 && eduFormType != 8 && eduFormType != 10) {
                    eduDate += "(총"+ResultData.TERM_DAY+"일";
                    eduDate += ","+ResultData.TERM_TIME+"시간)";
                }
                if(eduFormType == 6) {
                    eduDate += "/2편당1시간";
                }
                if(eduFormType == 8) {
                    eduDate += "/권당30시간(년최대50시간)";
                }
                if(eduFormType == 9) {
                    eduDate += "/1일당최대4시간";
                }
                hwpDocCtrl.putFieldText('eduDate', eduDate);
                hwpDocCtrl.putFieldText('eduCategoryDetailName', ResultData.EDU_CATEGORY_DETAIL_NAME);
                hwpDocCtrl.putFieldText('levelId', ResultData.LEVEL_ID+" 레벨");
                hwpDocCtrl.putFieldText('eduObject', ResultData.EDU_OBJECT);
                hwpDocCtrl.putFieldText('eduContent', ResultData.EDU_CONTENT);
                hwpDocCtrl.putFieldText('eduMoney', fn_numberWithCommas(ResultData.EDU_MONEY)+" 원")
                hwpDocCtrl.putFieldText('attachDocName', ResultData.ATTACH_DOC_NAME);

                let toDate = year+"년 "+month+"월 "+date+"일";
                hwpDocCtrl.putFieldText('toDate', toDate);

                let recTime = "";
                if(ResultData.COMP_TYPE == "기술사") {
                    recTime = " (30시간)";
                } else if(ResultData.COMP_TYPE == "기사") {
                    recTime = " (20시간)";
                } else {
                    recTime = " (15시간)";
                }
                hwpDocCtrl.putFieldText('compType', ResultData.COMP_TYPE + recTime);
                hwpDocCtrl.putFieldText('careName', ResultData.CARE_NAME);
                hwpDocCtrl.putFieldText('careLocation', "(" + ResultData.CARE_LOCATION + ")");

                let objectForum = ResultData.OBJECT_FORUM_TYPE == "주제발표" ? ResultData.OBJECT_FORUM_TYPE+" (발표주제 : "+ResultData.OBJECT_FORUM_VAL+")" : ResultData.OBJECT_FORUM_TYPE;
                hwpDocCtrl.putFieldText('objectForum', objectForum);
                hwpDocCtrl.putFieldText('returnMoney', fn_numberWithCommas(ResultData.RETURN_MONEY)+" 원");
                hwpDocCtrl.putFieldText('returnDoc', ResultData.RETURN_DOC);
                hwpDocCtrl.putFieldText('bookWriterName', ResultData.BOOK_WRITER_NAME);
                hwpDocCtrl.putFieldText('bookPageVal', ResultData.BOOK_PAGE_VAL);
                hwpDocCtrl.putFieldText('bookPulishName', ResultData.BOOK_PULISH_NAME);
                hwpDocCtrl.putFieldText('treaOrigin', ResultData.TREA_ORIGIN);
                hwpDocCtrl.putFieldText('treaUnit', ResultData.TREA_UNIT+" 편");
                hwpDocCtrl.putFieldText('treaType', ResultData.TREA_TYPE+" 학술지");
                hwpDocCtrl.putFieldText('treaUser', ResultData.TREA_USER);
                hwpDocCtrl.putFieldText('bookUnit', ResultData.BOOK_UNIT+" 권");
                hwpDocCtrl.putFieldText('eduTeacherName', ResultData.EDU_TEACHER_NAME);
                hwpDocCtrl.putFieldText('eduEval'+ResultData.EDU_EVAL, "O");
                hwpDocCtrl.putFieldText('eduPoint', ResultData.EDU_POINT);

                let purcText = "";

                if(ResultData.PURC_TYPE == null || ResultData.PURC_TYPE == "N" || ResultData.PURC_TYPE == ""){
                    purcText = "해당없음";
                }else if(ResultData.PURC_TYPE == "R"){
                    purcText = "R&D";
                }else if(ResultData.PURC_TYPE == "S"){
                    purcText = "비R&D";
                }else if(ResultData.PURC_TYPE == "D"){
                    purcText = "엔지니어링";
                }else if(ResultData.PURC_TYPE == "V"){
                    purcText = "용역/기타";
                }else if(ResultData.PURC_TYPE == "ETC"){
                    purcText = "캠아이템";
                }
                hwpDocCtrl.putFieldText("PURC_TYPE", purcText);

                if(ResultData.PURC_TYPE == null || ResultData.PURC_TYPE == "N" || ResultData.PURC_TYPE == ""){
                }else if(ResultData.PJT_NM != null){
                    hwpDocCtrl.putFieldText("PJT_NM", ResultData.PJT_NM);
                }

            },
            error: function(e) {
                console.log(e);
                alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다.");
                window.close();
            }
        });
    },

    studyInit: function(studyInfoSn, studyType){
        campusInit.global.userInfo = getUser($("#empSeq").val());

        const studyResult = customKendo.fn_customAjax("/campus/getStudyInfoOne", {pk: studyInfoSn});
        const studyInfo = studyResult.data;
        campusInit.global.studyInfo = studyInfo;

        if(studyType == "propag") {
            const userResult2 = customKendo.fn_customAjax("/campus/getStudyUserList", {pk: studyInfoSn, studyClassSn: 4});
            const userList2 = userResult2.list;
            campusInit.global.userList2 = userList2;

            const userResult3 = customKendo.fn_customAjax("/campus/getStudyUserList", {pk: studyInfoSn, studyClassSn: 5});
            const userList3 = userResult3.list;
            campusInit.global.userList3 = userList3;
        }else if(studyType == "ojt" || studyType == "ojtRes"){
            const userResult2 = customKendo.fn_customAjax("/campus/getStudyUserList", {pk: studyInfoSn, studyClassSn: 4});
            const userList2 = userResult2.list;
            campusInit.global.userList2 = userList2;

            const userResult3 = customKendo.fn_customAjax("/campus/getStudyUserList", {pk: studyInfoSn, studyClassSn: 5});
            const userList3 = userResult3.list;
            campusInit.global.userList3 = userList3;

            const ojtSubResult = customKendo.fn_customAjax("/campus/getOjtPlanList", {pk: studyInfoSn});
            const ojtSubList = ojtSubResult.list;
            campusInit.global.ojtSubList = ojtSubList;
        }else{
            const userResult = customKendo.fn_customAjax("/campus/getStudyUserList", {pk: studyInfoSn});
            const userList = userResult.list;
            campusInit.global.userList = userList;
        }

        if(studyType == "propag"){
            hwpDocCtrl.putFieldText("STUDY_TITLE", "전파학습 신청서");
        }else if(studyType == "ojt"){
            hwpDocCtrl.putFieldText("STUDY_TITLE", "OJT 계획서");
        }else if(studyType == "ojtRes"){
            hwpDocCtrl.putFieldText("STUDY_TITLE", "OJT 결과보고서");
        }else{
            hwpDocCtrl.putFieldText("STUDY_TITLE", "학습조 신청서");
        }
        hwpDocCtrl.putFieldText('STUDY_SUBJECT', studyInfo.STUDY_NAME);

        let htmlStudy = "";
        if(studyType == "propag"){
            htmlStudy = campusInit.htmlCustomPropag();
        }else if(studyType == "ojt" || studyType == "ojtRes"){
            htmlStudy = campusInit.htmlCustomOjt(studyType);
        }else{
            htmlStudy = campusInit.htmlCustomStudy();
        }
        hwpDocCtrl.moveToField('USER_TABLE', true, true, false);
        hwpDocCtrl.setTextFile(htmlStudy, "HTML", "insertfile", {});
    },

    htmlCustomStudy: function(){
        const studyInfo = campusInit.global.studyInfo;
        const userList = campusInit.global.userList;

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
        html += '                   <td rowspan="'+rowspan+'" style="background-color:#FFE0E0; text-align:center; width: 90px;"><p style="font-family:굴림;font-size:14px;"><b>참석자</b></p></td>';
        html += '                   <td style="height:25px;background-color:#FFE0E0; text-align:center; width: 70px;"><p style="font-family:굴림;font-size:14px;"><b>구분</b></p></td>';
        html += '                   <td style="height:25px;background-color:#FFE0E0; text-align:center; width: 295px;"><p style="font-family:굴림;font-size:14px;"><b>부서명</b></p></td>';
        html += '                   <td style="height:25px;background-color:#FFE0E0; text-align:center; width: 103px;"><p style="font-family:굴림;font-size:14px;"><b>직위</b></p></td>';
        html += '                   <td style="height:25px;background-color:#FFE0E0; text-align:center; width: 98px;"><p style="font-family:굴림;font-size:14px;"><b>성명</b></p></td>';
        html += '               </tr>';
        for(let i=0; i<userList.length; i++){
            const map = userList[i];

            html += '               <tr>';
            html += '                   <td style="height:25px;background-color:#FFFFFF; text-align:center;"><p style="font-family:굴림;font-size:14px;">'+ map.STUDY_CLASS_TEXT +'</p></td>';
            html += '                   <td style="height:25px;background-color:#FFFFFF; text-align:center;"><p style="font-family:굴림;font-size:14px;">'+ map.STUDY_DEPT_NAME+ ' '+map.STUDY_TEAM_NAME +'</p></td>';
            html += '                   <td style="height:25px;background-color:#FFFFFF; text-align:center;"><p style="font-family:굴림;font-size:14px;">'+ (map.STUDY_DUTY_NAME == "" ? map.STUDY_POSITION_NAME : map.STUDY_DUTY_NAME) +'</p></td>';
            html += '                   <td style="height:25px;background-color:#FFFFFF; text-align:center;"><p style="font-family:굴림;font-size:14px;">'+ map.STUDY_EMP_NAME +'</p></td>';
            html += '               </tr>';
        }
        if(userList.length < 8){
            for(let i=0; i<8-userList.length; i++){
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
        html += '                   <td colspan="4" style="height:30px;background-color:#FFFFFF; text-align:left;"><p style="font-family:굴림;font-size:14px;">'+ studyInfo.START_DT+' ~ '+studyInfo.END_DT +'</p></td>';
        html += '               </tr>';
        html += '               <tr>';
        html += '                   <td style="background-color:#FFE0E0; text-align:center; width: 90px;"><p style="font-family:굴림;font-size:14px;"><b>학습장소</b></p></td>';
        html += '                   <td colspan="4" style="height:30px;background-color:#FFFFFF; text-align:left;"><p style="font-family:굴림;font-size:14px;">'+ studyInfo.STUDY_LOCATION+'</p></td>';
        html += '               </tr>';
        html += '               <tr>';
        html += '                   <td style="background-color:#FFE0E0; text-align:center; width: 90px;"><p style="font-family:굴림;font-size:14px;"><b>학습목표</b></p></td>';
        html += '                   <td colspan="4" style="height:80px;background-color:#FFFFFF; text-align:left;"><p style="font-family:굴림;font-size:14px;">'+ studyInfo.STUDY_OBJECT+'</p></td>';
        html += '               </tr>';
        html += '               <tr>';
        html += '                   <td style="background-color:#FFE0E0; text-align:center; width: 90px;"><p style="font-family:굴림;font-size:14px;"><b>학습내용</b></p></td>';
        html += '                   <td colspan="4" style="height:110px;background-color:#FFFFFF; text-align:left;"><p style="font-family:굴림;font-size:14px;">'+ studyInfo.STUDY_CONTENT+'</p></td>';
        html += '               </tr>';
        html += '               <tr>';
        html += '                   <td style="background-color:#FFE0E0; text-align:center; width: 90px;"><p style="font-family:굴림;font-size:14px;"><b>소요비용</b></p></td>';
        html += '                   <td colspan="4" style="height:30px;background-color:#FFFFFF; text-align:left;"><p style="font-family:굴림;font-size:14px;">'+ comma(studyInfo.STUDY_MONEY)+'</p></td>';
        html += '               </tr>';
        html += '               <tr>';
        html += '                   <td style="background-color:#FFE0E0; text-align:center; width: 90px;"><p style="font-family:굴림;font-size:14px;"><b>산출내역</b></p></td>';
        html += '                   <td colspan="4" style="height:60px;background-color:#FFFFFF; text-align:left;"><p style="font-family:굴림;font-size:14px;">'+ studyInfo.STUDY_MONEY_VAL +'</p></td>';
        html += '               </tr>';
        
        html += '               <tr>';
        html += '                   <td colspan="5" style="height:150px;background-color:#FFFFFF; text-align:center;">' +
            '<p style="font-family:굴림;font-size:14px;margin-bottom: 3px">위와 같이 학습조 신청서를 제출하오니 승인하여 주시기 바랍니다.<br><br>' +
            '<p style="font-family:굴림;font-size:14px;margin-bottom: 5px">'+fn_getNowDate(1)+'</p>' +
            '</td>';
        html += '               </tr>';
        html += '           </table>';
        html += '       </td>';
        html += '   </tr>';
        html += '</table>';

        return html.replaceAll("\n", "<br>");
    },

    htmlCustomPropag: function(){
        const studyInfo = campusInit.global.studyInfo;
        const userList2 = campusInit.global.userList2;
        const userList3 = campusInit.global.userList3;
        const totalLength = userList2.length + userList3.length;

        let rowspan = 9;
        if(totalLength > 8){
            rowspan = totalLength + 1;
        }

        let html = '';
        html += '<table style="font-family:굴림;margin: 0 auto; max-width: none; border-collapse: separate; border-spacing: 0; empty-cells: show; border-width: 0; outline: 0; text-align: left; font-size:12px; line-height: 20px; width: 100%; ">';
        html += '   <tr>';
        html += '       <td style="border-width: 0 0 0 0; font-weight: normal; box-sizing: border-box;">';
        html += '           <table border="3" style="border-collapse: collapse; margin: 0px;">';

        html += '               <tr>';
        html += '                   <td rowspan="'+rowspan+'" style="background-color:#FFE0E0; text-align:center; width: 90px;"><p style="font-family:굴림;font-size:14px;"><b>참석자</b></p></td>';
        html += '                   <td style="height:25px;background-color:#FFE0E0; text-align:center; width: 70px;"><p style="font-family:굴림;font-size:14px;"><b>구분</b></p></td>';
        html += '                   <td style="height:25px;background-color:#FFE0E0; text-align:center; width: 295px;"><p style="font-family:굴림;font-size:14px;"><b>부서명</b></p></td>';
        html += '                   <td style="height:25px;background-color:#FFE0E0; text-align:center; width: 103px;"><p style="font-family:굴림;fonst-size:14px;"><b>직위</b></p></td>';
        html += '                   <td style="height:25px;background-color:#FFE0E0; text-align:center; width: 98px;"><p style="font-family:굴림;font-size:14px;"><b>성명</b></p></td>';
        html += '               </tr>';
        for(let i=0; i<userList2.length; i++){
            const map = userList2[i];

            html += '               <tr>';
            html += '                   <td style="height:25px;background-color:#FFFFFF; text-align:center;"><p style="font-family:굴림;font-size:14px;">'+ map.STUDY_CLASS_TEXT +'</p></td>';
            html += '                   <td style="height:25px;background-color:#FFFFFF; text-align:center;"><p style="font-family:굴림;font-size:14px;">'+ map.STUDY_DEPT_NAME+ ' '+map.STUDY_TEAM_NAME +'</p></td>';
            html += '                   <td style="height:25px;background-color:#FFFFFF; text-align:center;"><p style="font-family:굴림;font-size:14px;">'+ (map.STUDY_DUTY_NAME == "" ? map.STUDY_POSITION_NAME : map.STUDY_DUTY_NAME) +'</p></td>';
            html += '                   <td style="height:25px;background-color:#FFFFFF; text-align:center;"><p style="font-family:굴림;font-size:14px;">'+ map.STUDY_EMP_NAME +'</p></td>';
            html += '               </tr>';
        }
        for(let i=0; i<userList3.length; i++){
            const map = userList3[i];

            html += '               <tr>';
            html += '                   <td style="height:25px;background-color:#FFFFFF; text-align:center;"><p style="font-family:굴림;font-size:14px;">'+ map.STUDY_CLASS_TEXT +'</p></td>';
            html += '                   <td style="height:25px;background-color:#FFFFFF; text-align:center;"><p style="font-family:굴림;font-size:14px;">'+ map.STUDY_DEPT_NAME+ ' '+map.STUDY_TEAM_NAME +'</p></td>';
            html += '                   <td style="height:25px;background-color:#FFFFFF; text-align:center;"><p style="font-family:굴림;font-size:14px;">'+ (map.STUDY_DUTY_NAME == "" ? map.STUDY_POSITION_NAME : map.STUDY_DUTY_NAME) +'</p></td>';
            html += '                   <td style="height:25px;background-color:#FFFFFF; text-align:center;"><p style="font-family:굴림;font-size:14px;">'+ map.STUDY_EMP_NAME +'</p></td>';
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
        html += '               <tr>';
        html += '                   <td style="background-color:#FFE0E0; text-align:center; width: 90px;"><p style="font-family:굴림;font-size:14px;"><b>학습기간</b></p></td>';
        html += '                   <td colspan="4" style="height:30px;background-color:#FFFFFF; text-align:left;"><p style="font-family:굴림;font-size:14px;">'+ studyInfo.START_DT+' ~ '+studyInfo.END_DT +'</p></td>';
        html += '               </tr>';
        html += '               <tr>';
        html += '                   <td style="background-color:#FFE0E0; text-align:center; width: 90px;"><p style="font-family:굴림;font-size:14px;"><b>학습장소</b></p></td>';
        html += '                   <td colspan="4" style="height:30px;background-color:#FFFFFF; text-align:left;"><p style="font-family:굴림;font-size:14px;">'+ studyInfo.STUDY_LOCATION+'</p></td>';
        html += '               </tr>';
        html += '               <tr>';
        html += '                   <td style="background-color:#FFE0E0; text-align:center; width: 90px;"><p style="font-family:굴림;font-size:14px;"><b>학습목표</b></p></td>';
        html += '                   <td colspan="4" style="height:80px;background-color:#FFFFFF; text-align:left;"><p style="font-family:굴림;font-size:14px;">'+ studyInfo.STUDY_OBJECT+'</p></td>';
        html += '               </tr>';
        html += '               <tr>';
        html += '                   <td style="background-color:#FFE0E0; text-align:center; width: 90px;"><p style="font-family:굴림;font-size:14px;"><b>학습내용</b></p></td>';
        html += '                   <td colspan="4" style="height:110px;background-color:#FFFFFF; text-align:left;"><p style="font-family:굴림;font-size:14px;">'+ studyInfo.STUDY_CONTENT+'</p></td>';
        html += '               </tr>';
        html += '               <tr>';
        html += '                   <td style="background-color:#FFE0E0; text-align:center; width: 90px;"><p style="font-family:굴림;font-size:14px;"><b>소요비용</b></p></td>';
        html += '                   <td colspan="4" style="height:30px;background-color:#FFFFFF; text-align:left;"><p style="font-family:굴림;font-size:14px;">'+ comma(studyInfo.STUDY_MONEY)+'</p></td>';
        html += '               </tr>';
        html += '               <tr>';
        html += '                   <td style="background-color:#FFE0E0; text-align:center; width: 90px;"><p style="font-family:굴림;font-size:14px;"><b>산출내역</b></p></td>';
        html += '                   <td colspan="4" style="height:60px;background-color:#FFFFFF; text-align:left;"><p style="font-family:굴림;font-size:14px;">'+ studyInfo.STUDY_MONEY_VAL +'</p></td>';
        html += '               </tr>';
        html += '               <tr>';
        html += '                   <td colspan="5" style="height:150px;background-color:#FFFFFF; text-align:center;">' +
            '<p style="font-family:굴림;font-size:14px;margin-bottom: 3px">위와 같이 전파학습 신청서를 제출하오니 승인하여 주시기 바랍니다.<br><br>' +
            '<p style="font-family:굴림;font-size:14px;margin-bottom: 5px">'+fn_getNowDate(1)+'</p>' +
            '</td>';
        html += '               </tr>';
        html += '           </table>';
        html += '       </td>';
        html += '   </tr>';
        html += '</table>';

        return html.replaceAll("\n", "<br>");
    },

    htmlCustomOjt: function(studyType){
        const userInfo = campusInit.global.userInfo;

        const studyInfo = campusInit.global.studyInfo;
        const userList2 = campusInit.global.userList2;
        const userList3 = campusInit.global.userList3;

        const ojtSubList = campusInit.global.ojtSubList;

        let rowspan = userList2.length + userList3.length + 1;


        let html = '';
        html += '<table style="font-family:굴림;margin: 0 auto; max-width: none; border-collapse: separate; border-spacing: 0; empty-cells: show; border-width: 0; outline: 0; text-align: left; font-size:12px; line-height: 20px; width: 100%; ">';
        html += '   <tr>';
        html += '       <td style="border-width: 0 0 0 0; font-weight: normal; box-sizing: border-box;">';
        html += '           <table border="3" style="border-collapse: collapse; margin: 0px;">';

        /** 신청인 */
        html += '               <tr>';
        html += '                   <td rowspan="3" style="background-color:#FFE0E0; text-align:center; width: 90px;"><p style="font-family:굴림;font-size:14px;"><b>신청인</b></p></td>';
        html += '                   <td style="height:25px;background-color:#FFFFFF; text-align:center; width: 70px;"><p style="font-family:굴림;font-size:14px;"><b>소속</b></p></td>';
        html += '                   <td colspan="3" style="height:25px;background-color:#FFFFFF; text-align:center;"><p style="font-family:굴림;font-size:14px;">'+userInfo.deptNm+' '+userInfo.teamNm+'</p></td>';
        html += '               </tr>';
        html += '               <tr>';
        html += '                   <td style="height:25px;background-color:#FFFFFF; text-align:center; width: 70px;"><p style="font-family:굴림;font-size:14px;"><b>직위</b></p></td>';
        html += '                   <td style="height:25px;background-color:#FFFFFF; text-align:center; width: 200px;"><p style="font-family:굴림;font-size:14px;">'+(userInfo.DUTY_NAME == "" ? userInfo.POSITION_NAME : userInfo.DUTY_NAME)+'</p></td>';
        html += '                   <td style="height:25px;background-color:#FFFFFF; text-align:center; width: 168px;"><p style="font-family:굴림;font-size:14px;"><b>성명</b></p></td>';
        html += '                   <td style="height:25px;background-color:#FFFFFF; text-align:center; width: 128px;"><p style="font-family:굴림;font-size:14px;">'+userInfo.EMP_NAME_KR+'</p></td>';
        html += '               </tr>';
        html += '               <tr>';
        html += '                   <td style="height:25px;background-color:#FFFFFF; text-align:center; width: 70px;"><p style="font-family:굴림;font-size:14px;"><b>담당직무</b></p></td>';
        html += '                   <td colspan="3" style="height:25px;background-color:#FFFFFF; text-align:center;"><p style="font-family:굴림;font-size:14px;">'+ (userInfo.JOB_DETAIL == undefined ? "" : userInfo.JOB_DETAIL) +'</p></td>';
        html += '               </tr>';
        
        html += '               <tr>';
        html += '                   <td rowspan="'+rowspan+'" style="background-color:#FFE0E0; text-align:center; width: 90px;"><p style="font-family:굴림;font-size:14px;"><b>참석자</b></p></td>';
        html += '                   <td style="height:25px;background-color:#FFE0E0; text-align:center; width: 70px;"><p style="font-family:굴림;font-size:14px;"><b>구분</b></p></td>';
        html += '                   <td style="height:25px;background-color:#FFE0E0; text-align:center; width: 200px;"><p style="font-family:굴림;font-size:14px;"><b>부서명</b></p></td>';
        html += '                   <td style="height:25px;background-color:#FFE0E0; text-align:center; width: 168px;"><p style="font-family:굴림;font-size:14px;"><b>직위</b></p></td>';
        html += '                   <td style="height:25px;background-color:#FFE0E0; text-align:center; width: 128px;"><p style="font-family:굴림;font-size:14px;"><b>성명</b></p></td>';
        html += '               </tr>';
        for(let i=0; i<userList2.length; i++){
            const map = userList2[i];

            html += '               <tr>';
            html += '                   <td style="height:25px;background-color:#FFFFFF; text-align:center;"><p style="font-family:굴림;font-size:14px;">'+ map.STUDY_CLASS_TEXT +'</p></td>';
            html += '                   <td style="height:25px;background-color:#FFFFFF; text-align:center;"><p style="font-family:굴림;font-size:14px;">'+ map.STUDY_DEPT_NAME+ ' '+map.STUDY_TEAM_NAME +'</p></td>';
            html += '                   <td style="height:25px;background-color:#FFFFFF; text-align:center;"><p style="font-family:굴림;font-size:14px;">'+ (map.STUDY_DUTY_NAME == "" ? map.STUDY_POSITION_NAME : map.STUDY_DUTY_NAME) +'</p></td>';
            html += '                   <td style="height:25px;background-color:#FFFFFF; text-align:center;"><p style="font-family:굴림;font-size:14px;">'+ map.STUDY_EMP_NAME +'</p></td>';
            html += '               </tr>';
        }
        for(let i=0; i<userList3.length; i++){
            const map = userList3[i];

            html += '               <tr>';
            html += '                   <td style="height:25px;background-color:#FFFFFF; text-align:center;"><p style="font-family:굴림;font-size:14px;">'+ map.STUDY_CLASS_TEXT +'</p></td>';
            html += '                   <td style="height:25px;background-color:#FFFFFF; text-align:center;"><p style="font-family:굴림;font-size:14px;">'+ map.STUDY_DEPT_NAME+ ' '+map.STUDY_TEAM_NAME +'</p></td>';
            html += '                   <td style="height:25px;background-color:#FFFFFF; text-align:center;"><p style="font-family:굴림;font-size:14px;">'+ (map.STUDY_DUTY_NAME == "" ? map.STUDY_POSITION_NAME : map.STUDY_DUTY_NAME) +'</p></td>';
            html += '                   <td style="height:25px;background-color:#FFFFFF; text-align:center;"><p style="font-family:굴림;font-size:14px;">'+ map.STUDY_EMP_NAME +'</p></td>';
            html += '               </tr>';
        }

        html += '               <tr>';
        html += '                   <td rowspan="5" style="background-color:#FFE0E0; text-align:center; width: 90px;"><p style="font-family:굴림;font-size:14px;"><b>지도계획</b></p></td>';
        html += '                   <td style="height:25px;background-color:#FFFFFF; text-align:center; width: 70px;"><p style="font-family:굴림;font-size:14px;"><b>지도명칭</b></p></td>';
        html += '                   <td colspan="3" style="height:25px;background-color:#FFFFFF; text-align:center;"><p style="font-family:굴림;font-size:14px;">'+studyInfo.STUDY_NAME+'</p></td>';
        html += '               </tr>';
        
        html += '               <tr>';
        html += '                   <td style="background-color:#FFFFFF; text-align:center; width: 70px;"><p style="font-family:굴림;font-size:14px;"><b>지도기간</b></p></td>';
        html += '                   <td colspan="3" style="height:30px;background-color:#FFFFFF; text-align:left;"><p style="font-family:굴림;font-size:14px;">'+ studyInfo.START_DT+' ~ '+studyInfo.END_DT +'</p></td>';
        html += '               </tr>';
        html += '               <tr>';
        html += '                   <td style="background-color:#FFFFFF; text-align:center; width: 70px;"><p style="font-family:굴림;font-size:14px;"><b>지도장소</b></p></td>';
        html += '                   <td colspan="3" style="height:30px;background-color:#FFFFFF; text-align:left;"><p style="font-family:굴림;font-size:14px;">'+ studyInfo.STUDY_LOCATION+'</p></td>';
        html += '               </tr>';
        html += '               <tr>';
        html += '                   <td style="background-color:#FFFFFF; text-align:center; width: 70px;"><p style="font-family:굴림;font-size:14px;"><b>지도목적</b></p></td>';
        html += '                   <td colspan="3" style="height:80px;background-color:#FFFFFF; text-align:left;"><p style="font-family:굴림;font-size:14px;">'+ studyInfo.STUDY_CONTENT+'</p></td>';
        html += '               </tr>';
        html += '               <tr>';
        html += '                   <td style="background-color:#FFFFFF; text-align:center; width: 70px;"><p style="font-family:굴림;font-size:14px;"><b>소요비용</b></p></td>';
        html += '                   <td style="height:30px;background-color:#FFFFFF; text-align:left;"><p style="font-family:굴림;font-size:14px;">'+ comma(studyInfo.STUDY_MONEY)+'</p></td>';
        html += '                   <td style="background-color:#FFFFFF; text-align:center; width: 70px;"><p style="font-family:굴림;font-size:14px;"><b>산출내역</b></p></td>';
        html += '                   <td style="height:60px;background-color:#FFFFFF; text-align:left;"><p style="font-family:굴림;font-size:14px;">'+ studyInfo.STUDY_MONEY_VAL +'</p></td>';
        html += '               </tr>';

        html += '               <tr>';
        html += '                   <td rowspan="'+rowspan+'" style="background-color:#FFE0E0; text-align:center; width: 90px;"><p style="font-family:굴림;font-size:14px;"><b>지도내용</b></p></td>';
        html += '                   <td style="height:25px;background-color:#FFE0E0; text-align:center; width: 70px;"><p style="font-family:굴림;font-size:14px;"><b>회차</b></p></td>';
        html += '                   <td style="height:25px;background-color:#FFE0E0; text-align:center; width: 200px;"><p style="font-family:굴림;font-size:14px;"><b>기간</b></p></td>';
        html += '                   <td style="height:25px;background-color:#FFE0E0; text-align:center; width: 168px;"><p style="font-family:굴림;font-size:14px;"><b>중점 지도항목</b></p></td>';
        html += '                   <td style="height:25px;background-color:#FFE0E0; text-align:center; width: 128px;"><p style="font-family:굴림;font-size:14px;"><b>비고</b></p></td>';
        html += '               </tr>';
        for(let i=0; i<ojtSubList.length; i++){
            const map = ojtSubList[i];

            html += '               <tr>';
            html += '                   <td style="height:25px;background-color:#FFFFFF; text-align:center;"><p style="font-family:굴림;font-size:14px;">'+ (i+1) +'차</p></td>';
            html += '                   <td style="height:25px;background-color:#FFFFFF; text-align:center;"><p style="font-family:굴림;font-size:14px;">'+ map.START_DT+ ' ~ '+map.END_DT +'</p></td>';
            html += '                   <td style="height:25px;background-color:#FFFFFF; text-align:center;"><p style="font-family:굴림;font-size:14px;">'+ map.TITLE +'</p></td>';
            html += '                   <td style="height:25px;background-color:#FFFFFF; text-align:center;"><p style="font-family:굴림;font-size:14px;">'+ map.ETC +'</p></td>';
            html += '               </tr>';
        }

        html += '               <tr>';
        let text = "OJT계획서 신청서";
        if(studyType == "ojtRes"){
            text = "OJT결과보고서";
        }
        html += '                   <td colspan="5" style="height:150px;background-color:#FFFFFF; text-align:center;">' +
            '<p style="font-family:굴림;font-size:14px;margin-bottom: 3px">위와 같이 '+text+'를 제출하오니 승인하여 주시기 바랍니다.<br><br>' +
            '<p style="font-family:굴림;font-size:14px;margin-bottom: 5px">'+fn_getNowDate(1)+'</p>' +
            '</td>';
        html += '               </tr>';
        html += '           </table>';
        html += '       </td>';
        html += '   </tr>';
        html += '</table>';

        return html.replaceAll("\n", "<br>");
    },

    studyResInit: function(studyResultSn){
        campusInit.global.userInfo = getUser($("#empSeq").val());

        const studyResult = customKendo.fn_customAjax("/campus/getStudyResultData", {studyResultSn: studyResultSn});
        const studyInfo = studyResult.data;
        campusInit.global.studyInfo = studyInfo;

        const userResult = customKendo.fn_customAjax("/campus/getStudyResultList", {pk: studyInfo.STUDY_INFO_SN});
        const userList = userResult.list;
        campusInit.global.userList = userList;

        hwpDocCtrl.putFieldText("STUDY_TITLE", "학습조 결과보고서");
        
        hwpDocCtrl.putFieldText('STUDY_SUBJECT', studyInfo.STUDY_NAME);

        let htmlStudy = "";
        htmlStudy = campusInit.htmlCustomStudyRes();

        hwpDocCtrl.moveToField('USER_TABLE', true, true, false);
        hwpDocCtrl.setTextFile(htmlStudy, "HTML", "insertfile", {});
    },

    htmlCustomStudyRes: function(){
        const studyInfo = campusInit.global.studyInfo;
        const userList = campusInit.global.userList;

        let rowspan = 10;
        if(userList.length > 8){
            rowspan = userList.length+2;
        }

        let html = '';
        html += '<table style="font-family:굴림;margin: 0 auto; max-width: none; border-collapse: separate; border-spacing: 0; empty-cells: show; border-width: 0; outline: 0; text-align: left; font-size:12px; line-height: 20px; width: 100%; ">';
        html += '   <tr>';
        html += '       <td style="border-width: 0 0 0 0; font-weight: normal; box-sizing: border-box;">';
        html += '           <table border="3" style="border-collapse: collapse; margin: 0px;">';

        html += '               <tr>';
        html += '                   <td rowspan="'+rowspan+'" style="background-color:#FFE0E0; text-align:center; width: 90px;"><p style="font-family:굴림;font-size:14px;"><b>참석자</b></p></td>';
        html += '                   <td rowspan="2" style="height:23px;background-color:#FFE0E0; text-align:center; width: 70px;"><p style="font-family:굴림;font-size:14px;"><b>구분</b></p></td>';
        html += '                   <td rowspan="2" style="height:23px;background-color:#FFE0E0; text-align:center; width: 170px;"><p style="font-family:굴림;font-size:14px;"><b>부서명</b></p></td>';
        html += '                   <td rowspan="2" style="height:23px;background-color:#FFE0E0; text-align:center; width: 93px;"><p style="font-family:굴림;font-size:14px;"><b>직위</b></p></td>';
        html += '                   <td rowspan="2" style="height:23px;background-color:#FFE0E0; text-align:center; width: 93px;"><p style="font-family:굴림;font-size:14px;"><b>성명</b></p></td>';
        html += '                   <td colspan="2" style="height:23px;background-color:#FFE0E0; text-align:center; width: 140px;"><p style="font-family:굴림;font-size:14px;"><b>이수시간</b></p></td>';
        html += '               </tr>';
        html += '               <tr>'
        html += '                   <td style="height:23px;background-color:#FFE0E0; text-align:center; width: 70px;"><p style="font-family:굴림;font-size:14px;"><b>회</b></p></td>';
        html += '                   <td style="height:23px;background-color:#FFE0E0; text-align:center; width: 70px;"><p style="font-family:굴림;font-size:14px;"><b>시간</b></p></td>';
        html += '               </tr>';
        for(let i=0; i<userList.length; i++){
            const map = userList[i];

            html += '               <tr>';
            html += '                   <td style="height:23px;background-color:#FFFFFF; text-align:center;"><p style="font-family:굴림;font-size:14px;">'+ map.STUDY_CLASS_TEXT +'</p></td>';
            html += '                   <td style="height:23px;background-color:#FFFFFF; text-align:center;"><p style="font-family:굴림;font-size:14px;">'+ map.STUDY_DEPT_NAME+ ' '+map.STUDY_TEAM_NAME +'</p></td>';
            html += '                   <td style="height:23px;background-color:#FFFFFF; text-align:center;"><p style="font-family:굴림;font-size:14px;">'+ (map.STUDY_DUTY_NAME == "" ? map.STUDY_POSITION_NAME : map.STUDY_DUTY_NAME) +'</p></td>';
            html += '                   <td style="height:23px;background-color:#FFFFFF; text-align:center;"><p style="font-family:굴림;font-size:14px;">'+ map.STUDY_EMP_NAME +'</p></td>';
            html += '                   <td style="height:23px;background-color:#FFFFFF; text-align:center;"><p style="font-family:굴림;font-size:14px;">'+ map.STUDY_EMP_CNT +'</p></td>';
            html += '                   <td style="height:23px;background-color:#FFFFFF; text-align:center;"><p style="font-family:굴림;font-size:14px;">'+ map.STUDY_TIME +'</p></td>';
            html += '               </tr>';
        }
        if(userList.length < 8){
            for(let i=0; i<8-userList.length; i++){
                html += '               <tr>';
                html += '                   <td style="height:23px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;"></p></td>';
                html += '                   <td style="height:23px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;"></p></td>';
                html += '                   <td style="height:23px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;"></p></td>';
                html += '                   <td style="height:23px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;"></p></td>';
                html += '                   <td style="height:23px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;"></p></td>';
                html += '                   <td style="height:23px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;"></p></td>';
                html += '               </tr>';
            }
        }
        html += '               <tr>';
        html += '                   <td style="background-color:#FFE0E0; text-align:center; width: 90px;"><p style="font-family:굴림;font-size:14px;"><b>학습기간</b></p></td>';
        html += '                   <td colspan="6" style="height:30px;background-color:#FFFFFF; text-align:left;"><p style="font-family:굴림;font-size:14px;">'+ studyInfo.STUDY_RESULT_DT+' '+studyInfo.STUDY_RESULT_START_TIME+' ~ '+studyInfo.STUDY_RESULT_END_TIME +'</p></td>';
        html += '               </tr>';
        html += '               <tr>';
        html += '                   <td style="background-color:#FFE0E0; text-align:center; width: 90px;"><p style="font-family:굴림;font-size:14px;"><b>학습장소</b></p></td>';
        html += '                   <td colspan="6" style="height:30px;background-color:#FFFFFF; text-align:left;"><p style="font-family:굴림;font-size:14px;">'+ studyInfo.STUDY_RESULT_LOCATE+'</p></td>';
        html += '               </tr>';
        html += '               <tr>';
        html += '                   <td style="background-color:#FFE0E0; text-align:center; width: 90px;"><p style="font-family:굴림;font-size:14px;"><b>학습내용</b></p></td>';
        html += '                   <td colspan="6" style="height:110px;background-color:#FFFFFF; text-align:left;"><p style="font-family:굴림;font-size:14px;">'+ studyInfo.STUDY_RESULT_CONTENT+'</p></td>';
        html += '               </tr>';
        html += '               <tr>';
        html += '                   <td style="background-color:#FFE0E0; text-align:center; width: 90px;"><p style="font-family:굴림;font-size:14px;"><b>소요비용</b></p></td>';
        html += '                   <td colspan="6" style="height:30px;background-color:#FFFFFF; text-align:left;"><p style="font-family:굴림;font-size:14px;">'+ comma(studyInfo.STUDY_RESULT_AMT)+'</p></td>';
        html += '               </tr>';
        html += '               <tr>';
        html += '                   <td style="background-color:#FFE0E0; text-align:center; width: 90px;"><p style="font-family:굴림;font-size:14px;"><b>산출내역</b></p></td>';
        html += '                   <td colspan="6" style="height:60px;background-color:#FFFFFF; text-align:left;"><p style="font-family:굴림;font-size:14px;"></p></td>';
        html += '               </tr>';

        html += '               <tr>';
        html += '                   <td colspan="7" style="height:150px;background-color:#FFFFFF; text-align:center;">' +
            '<p style="font-family:굴림;font-size:14px;margin-bottom: 3px">위와 같이 학습조 결과보고서를 제출하오니 승인하여 주시기 바랍니다.<br><br>' +
            '<p style="font-family:굴림;font-size:14px;margin-bottom: 5px">'+fn_getNowDate(1)+'</p>' +
            '</td>';
        html += '               </tr>';
        html += '           </table>';
        html += '       </td>';
        html += '   </tr>';
        html += '</table>';

        return html.replaceAll("\n", "<br>");
    },

    propagResInit: function(studyResultSn){
        campusInit.global.userInfo = getUser($("#empSeq").val());

        const studyResult = customKendo.fn_customAjax("/campus/getStudyInfoOne", {pk: studyResultSn});
        const studyInfo = studyResult.data;
        campusInit.global.propagInfo = studyInfo;

        const userResult = customKendo.fn_customAjax("/campus/getStudyPropagUserInfo2", {studyInfoSn: studyResultSn});
        const userList = userResult.list;
        campusInit.global.userList = userList;

        hwpDocCtrl.putFieldText("STUDY_TITLE", "전파학습 결과보고서");

        hwpDocCtrl.putFieldText('STUDY_SUBJECT', studyInfo.STUDY_NAME);

        let htmlStudy = "";
        htmlStudy = campusInit.htmlCustomPropagRes();

        hwpDocCtrl.moveToField('USER_TABLE', true, true, false);
        hwpDocCtrl.setTextFile(htmlStudy, "HTML", "insertfile", {});
    },

    htmlCustomPropagRes: function(){
        const studyInfo = campusInit.global.propagInfo;
        const userList = campusInit.global.userList;
        console.log("userList", userList);

        let rowspan = 10;
        if(userList.length > 8){
            rowspan = userList.length+2;
        }

        let html = '';
        html += '<table style="font-family:굴림;margin: 0 auto; max-width: none; border-collapse: separate; border-spacing: 0; empty-cells: show; border-width: 0; outline: 0; text-align: left; font-size:12px; line-height: 20px; width: 100%; ">';
        html += '   <tr>';
        html += '       <td style="border-width: 0 0 0 0; font-weight: normal; box-sizing: border-box;">';
        html += '           <table border="3" style="border-collapse: collapse; margin: 0px;">';

        html += '               <tr>';
        html += '                   <td rowspan="'+rowspan+'" style="background-color:#FFE0E0; text-align:center; width: 90px;"><p style="font-family:굴림;font-size:14px;"><b>참석자</b></p></td>';
        html += '                   <td rowspan="2" style="height:23px;background-color:#FFE0E0; text-align:center; width: 70px;"><p style="font-family:굴림;font-size:14px;"><b>구분</b></p></td>';
        html += '                   <td rowspan="2" style="height:23px;background-color:#FFE0E0; text-align:center; width: 170px;"><p style="font-family:굴림;font-size:14px;"><b>부서명</b></p></td>';
        html += '                   <td rowspan="2" style="height:23px;background-color:#FFE0E0; text-align:center; width: 93px;"><p style="font-family:굴림;font-size:14px;"><b>직위</b></p></td>';
        html += '                   <td rowspan="2" style="height:23px;background-color:#FFE0E0; text-align:center; width: 93px;"><p style="font-family:굴림;font-size:14px;"><b>성명</b></p></td>';
        html += '                   <td colspan="2" style="height:23px;background-color:#FFE0E0; text-align:center; width: 140px;"><p style="font-family:굴림;font-size:14px;"><b>이수시간</b></p></td>';
        html += '               </tr>';
        html += '               <tr>'
        html += '                   <td style="height:23px;background-color:#FFE0E0; text-align:center; width: 70px;"><p style="font-family:굴림;font-size:14px;"><b>회</b></p></td>';
        html += '                   <td style="height:23px;background-color:#FFE0E0; text-align:center; width: 70px;"><p style="font-family:굴림;font-size:14px;"><b>시간</b></p></td>';
        html += '               </tr>';
        for(let i=0; i<userList.length; i++){
            const map = userList[i];

            html += '               <tr>';
            html += '                   <td style="height:23px;background-color:#FFFFFF; text-align:center;"><p style="font-family:굴림;font-size:14px;">'+ map.PROPAG_CLASS_TEXT +'</p></td>';
            html += '                   <td style="height:23px;background-color:#FFFFFF; text-align:center;"><p style="font-family:굴림;font-size:14px;">'+ map.PROPAG_DEPT_NAME+ ' '+map.PROPAG_TEAM_NAME +'</p></td>';
            html += '                   <td style="height:23px;background-color:#FFFFFF; text-align:center;"><p style="font-family:굴림;font-size:14px;">'+ (map.PROPAG_DUTY_NAME == "" ? map.PROPAG_POSITION_NAME : map.PROPAG_DUTY_NAME) + '</p></td>';
            html += '                   <td style="height:23px;background-color:#FFFFFF; text-align:center;"><p style="font-family:굴림;font-size:14px;">'+ map.PROPAG_EMP_NAME +'</p></td>';
            html += '                   <td style="height:23px;background-color:#FFFFFF; text-align:center;"><p style="font-family:굴림;font-size:14px;">'+ map.EDU_COUNT +'</p></td>';
            html += '                   <td style="height:23px;background-color:#FFFFFF; text-align:center;"><p style="font-family:굴림;font-size:14px;">'+ map.REAL_EDU_TIME +'</p></td>';
            html += '               </tr>';
        }
        if(userList.length < 8){
            for(let i=0; i<8-userList.length; i++){
                html += '               <tr>';
                html += '                   <td style="height:23px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;"></p></td>';
                html += '                   <td style="height:23px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;"></p></td>';
                html += '                   <td style="height:23px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;"></p></td>';
                html += '                   <td style="height:23px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;"></p></td>';
                html += '                   <td style="height:23px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;"></p></td>';
                html += '                   <td style="height:23px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;"></p></td>';
                html += '               </tr>';
            }
        }
        html += '               <tr>';
        html += '                   <td style="background-color:#FFE0E0; text-align:center; width: 90px;"><p style="font-family:굴림;font-size:14px;"><b>학습기간</b></p></td>';
        html += '                   <td colspan="6" style="height:30px;background-color:#FFFFFF; text-align:left;"><p style="font-family:굴림;font-size:14px;">'+ studyInfo.START_DT+" ~ "+studyInfo.END_DT+" / 매회"+studyInfo.START_TIME+" ~ "+studyInfo.END_TIME+" (총 "+studyInfo.EDU_TERM+"회 "+studyInfo.EDU_TIME+"시간)" +'</p></td>';
        html += '               </tr>';
        html += '               <tr>';
        html += '                   <td style="background-color:#FFE0E0; text-align:center; width: 90px;"><p style="font-family:굴림;font-size:14px;"><b>학습장소</b></p></td>';
        html += '                   <td colspan="6" style="height:30px;background-color:#FFFFFF; text-align:left;"><p style="font-family:굴림;font-size:14px;">'+ studyInfo.STUDY_LOCATION+'</p></td>';
        html += '               </tr>';
        html += '               <tr>';
        html += '                   <td style="background-color:#FFE0E0; text-align:center; width: 90px;"><p style="font-family:굴림;font-size:14px;"><b>학습내용</b></p></td>';
        html += '                   <td colspan="6" style="height:110px;background-color:#FFFFFF; text-align:left;"><p style="font-family:굴림;font-size:14px;">'+ studyInfo.STUDY_CONTENT+'</p></td>';
        html += '               </tr>';
        html += '               <tr>';
        html += '                   <td style="background-color:#FFE0E0; text-align:center; width: 90px;"><p style="font-family:굴림;font-size:14px;"><b>소요비용</b></p></td>';
        html += '                   <td colspan="6" style="height:30px;background-color:#FFFFFF; text-align:left;"><p style="font-family:굴림;font-size:14px;">'+ comma(studyInfo.STUDY_MONEY)+'</p></td>';
        html += '               </tr>';
        html += '               <tr>';
        html += '                   <td style="background-color:#FFE0E0; text-align:center; width: 90px;"><p style="font-family:굴림;font-size:14px;"><b>산출내역</b></p></td>';
        html += '                   <td colspan="6" style="height:60px;background-color:#FFFFFF; text-align:left;"><p style="font-family:굴림;font-size:14px;">'+ studyInfo.STUDY_MONEY_VAL+'</p></td>';
        html += '               </tr>';

        html += '               <tr>';
        html += '                   <td colspan="7" style="height:150px;background-color:#FFFFFF; text-align:center;">' +
            '<p style="font-family:굴림;font-size:14px;margin-bottom: 3px">위와 같이 전파학습 결과보고서를 제출하오니 승인하여 주시기 바랍니다.<br><br>' +
            '<p style="font-family:굴림;font-size:14px;margin-bottom: 5px">'+fn_getNowDate(1)+'</p>' +
            '</td>';
        html += '               </tr>';
        html += '           </table>';
        html += '       </td>';
        html += '   </tr>';
        html += '</table>';

        return html.replaceAll("\n", "<br>");
    }
}