/**
 * 2023.02.21 by. deer
 * 한글 컨트롤
 *
 * function / global variable / local variable setting
 */
var hwpDocCtrl = {
    global : {
        HwpCtrl : "",
        templateFile : "",
        templateLogoFile : "",
        templateSymbolFile : "",
        templateFormOpt : "",
        params : new Array(),
        loginEmpInfo : new Array(),
        mod : "",
        searchAjaxData : "",

        hwpFileTextData : "",
        htmlFileTextData : ""
    },

    dataSet : function() {
        const data = hwpDocCtrl.global.params;
        if(data.menuCd == "subHoliday") {
            const subHolidayId = data.approKey.split("_")[1];
            $("#reqContentId").val(subHolidayId);
            if(subHolidayId == null || subHolidayId == undefined || subHolidayId == "") {
                alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다.");
            }

            $.ajax({
                url : "/subHoliday/getVacUseHistoryOne",
                data : {
                    subholidayUseId : subHolidayId
                },
                type : "post",
                dataType : "json",
                async: false,
                success : function(result){
                    console.log(result.data);
                    const ResultData = result.data;

                    let today = new Date();
                    let year = today.getFullYear(); // 년도
                    let month = today.getMonth() + 1;  // 월
                    let date = today.getDate();  // 날짜

                    hwpDocCtrl.global.HwpCtrl.MoveToField('deptName', true, true, false);
                    hwpDocCtrl.putFieldText('deptName', ResultData.DEPT_NAME2);

                    hwpDocCtrl.global.HwpCtrl.MoveToField('empName', true, true, false);
                    hwpDocCtrl.putFieldText('empName', ResultData.EMP_NAME_KR);

                    if(ResultData.SUBHOLIDAY_CODE_ID != "11") {

                        hwpDocCtrl.putFieldText('positionName', ResultData.POSITION_NAME);

                        hwpDocCtrl.putFieldText('holidayDate', ResultData.SUBHOLIDAY_ST_DT+" "+ResultData.SUBHOLIDAY_ST_TIME+" "+ResultData.SUBHOLIDAY_EN_DT+" "+ResultData.SUBHOLIDAY_EN_TIME);

                        hwpDocCtrl.putFieldText('approvalReason', ResultData.RMK);

                        hwpDocCtrl.putFieldText('rmkOther', ResultData.RMK_OTHER);

                        let startDT;
                        let endDT;
                        let explanationDT;

                        try {
                            startDT = ResultData.SUBHOLIDAY_ST_DT.replace(/-/g, "");
                            endDT = ResultData.SUBHOLIDAY_EN_DT.replace(/-/g, "");

                            let firstDateObj = new Date(startDT.substring(0, 4), startDT.substring(4, 6) - 1, startDT.substring(6, 8));
                            let secondDateObj = new Date(endDT.substring(0, 4), endDT.substring(4, 6) - 1, endDT.substring(6, 8));
                            let betweenTime = Math.abs(secondDateObj.getTime() - firstDateObj.getTime());
                            explanationDT = Math.floor(betweenTime / (1000 * 60 * 60 * 24)) +1;
                        }catch (e) {
                            explanationDT = 0;
                        }

                        const explantion = "아래와 같은 사유로 ("+explanationDT+")일 휴가코자 합니다.";
                        hwpDocCtrl.putFieldText('explanation', explantion);

                        let regSign = "위 원 인 : "+ResultData.EMP_NAME_KR;

                        hwpDocCtrl.putFieldText('regSign', regSign);

                        let toDate = year+"년 "+month+"월 "+date+"일";
                        hwpDocCtrl.putFieldText('toDate', toDate);

                        if(ResultData.OHTER_EMP != null && ResultData.OHTER_EMP != ""){
                            let ohterSign = "업무인수자 : "+ResultData.OHTER_EMP;
                            hwpDocCtrl.putFieldText('OHTER_EMP_SIGN', ohterSign);
                        }

                        let html = '';
                        if(ResultData.SUBHOLIDAY_CODE_ID == "1"){
                            html += '■연가□오전반차□오후반차□경조휴가<br>□병가□공가□대체휴가□근속포상휴가';
                        }else if(ResultData.SUBHOLIDAY_CODE_ID == "3"){
                            html += '□연가■오전반차□오후반차□경조휴가<br>□병가□공가□대체휴가□근속포상휴가';
                        }else if(ResultData.SUBHOLIDAY_CODE_ID == "4"){
                            html += '□연가□오전반차■오후반차□경조휴가<br>□병가□공가□대체휴가□근속포상휴가';
                        }else if(ResultData.SUBHOLIDAY_CODE_ID == "5"){
                            html += '□연가□오전반차□오후반차□경조휴가<br>■병가□공가□대체휴가□근속포상휴가';
                        }else if(ResultData.SUBHOLIDAY_CODE_ID == "6"){
                            html += '□연가□오전반차□오후반차□경조휴가<br>□병가■공가□대체휴가□근속포상휴가';
                        }else if(ResultData.SUBHOLIDAY_CODE_ID == "7"){
                            html += '□연가□오전반차□오후반차■경조휴가<br>□병가□공가□대체휴가□근속포상휴가';
                        }else if(ResultData.SUBHOLIDAY_CODE_ID == "9"){
                            html += '□연가□오전반차□오후반차□경조휴가<br>□병가□공가■대체휴가□근속포상휴가';
                        }else if(ResultData.SUBHOLIDAY_CODE_ID == "10"){
                            html += '□연가□오전반차□오후반차□경조휴가<br>□병가□공가□대체휴가■근속포상휴가';
                        }
                        hwpDocCtrl.global.HwpCtrl.MoveToField('HOLI_TEXT_BOX', true, true, false);
                        hwpDocCtrl.setTextFile(html, "html","insertfile");
                    }else {
                        hwpDocCtrl.global.HwpCtrl.MoveToField('rmk', true, true, false);
                        hwpDocCtrl.putFieldText('rmk', ResultData.RMK);

                        let subHolidayWorkDay = ResultData.SUBHOLIDAY_WORK_DAY.split("-");
                        let subHolidayWorkDayText = subHolidayWorkDay[0]+"년"+subHolidayWorkDay[1]+"월"+subHolidayWorkDay[2]+"일";
                        hwpDocCtrl.global.HwpCtrl.MoveToField('subHolidayWorkDay', true, true, false);
                        hwpDocCtrl.putFieldText('subHolidayWorkDay', subHolidayWorkDayText);

                        let startTime = ResultData.SUBHOLIDAY_ST_TIME;
                        let endTime = ResultData.SUBHOLIDAY_EN_TIME;

                        hwpDocCtrl.global.HwpCtrl.MoveToField('subHolidayTime', true, true, false);
                        hwpDocCtrl.putFieldText('subHolidayTime', startTime+" ~ "+endTime);

                        let subHolidayAlternativeDay = ResultData.SUBHOLIDAY_ALTERNATIVE_DAY.split("-");
                        let subHolidayAlternativeDayText = subHolidayAlternativeDay[0]+"년"+subHolidayAlternativeDay[1]+"월"+subHolidayAlternativeDay[2]+"일";
                        hwpDocCtrl.global.HwpCtrl.MoveToField('subHolidayAlternativeDay', true, true, false);
                        hwpDocCtrl.putFieldText('subHolidayAlternativeDay', subHolidayAlternativeDayText);

                        let toDate = year+"년"+month+"월"+date+"일";
                        hwpDocCtrl.global.HwpCtrl.MoveToField('toDate', true, true, false);
                        hwpDocCtrl.putFieldText('toDate', toDate);
                    }
                },
                error: function(e) {
                    console.log(e);
                    alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다.");
                    window.close();
                }
            });
        }else if(data.menuCd == "campus") {
            const eduInfoId = data.approKey.split("_")[1];
            $("#reqContentId").val(eduInfoId);
            if(eduInfoId == null || eduInfoId == undefined || eduInfoId == "") {
                alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다.");
            }

            $.ajax({
                url : "/campus/getEduResultOne",
                data : {
                    eduInfoId : eduInfoId
                },
                type : "post",
                dataType : "json",
                async: false,
                success : function(result){
                    console.log(result.data);
                    const ResultData = result.data;

                    let today = new Date();
                    let year = today.getFullYear(); // 년도
                    let month = today.getMonth() + 1;  // 월
                    let date = today.getDate();  // 날짜
                    const eduFormType = Number(ResultData.EDU_FORM_TYPE)


                    hwpDocCtrl.global.HwpCtrl.MoveToField('deptName', true, true, false);
                    hwpDocCtrl.putFieldText('deptName', ResultData.DEPT_NAME+" "+ResultData.DEPT_TEAM_NAME);

                    hwpDocCtrl.global.HwpCtrl.MoveToField('empName', true, true, false);
                    hwpDocCtrl.putFieldText('empName', ResultData.EMP_NAME_KR);

                    hwpDocCtrl.global.HwpCtrl.MoveToField('positionName', true, true, false);
                    hwpDocCtrl.putFieldText('positionName', ResultData.POSITION_NAME);

                    hwpDocCtrl.global.HwpCtrl.MoveToField('eduName', true, true, false);
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
                    hwpDocCtrl.global.HwpCtrl.MoveToField('eduDate', true, true, false);
                    hwpDocCtrl.putFieldText('eduDate', eduDate);
                    hwpDocCtrl.global.HwpCtrl.MoveToField('eduCategoryDetailName', true, true, false);
                    hwpDocCtrl.putFieldText('eduCategoryDetailName', ResultData.EDU_CATEGORY_DETAIL_NAME);
                    hwpDocCtrl.global.HwpCtrl.MoveToField('levelId', true, true, false);
                    hwpDocCtrl.putFieldText('levelId', ResultData.LEVEL_ID+" 레벨");
                    hwpDocCtrl.global.HwpCtrl.MoveToField('eduObject', true, true, false);
                    hwpDocCtrl.putFieldText('eduObject', ResultData.EDU_OBJECT);
                    hwpDocCtrl.global.HwpCtrl.MoveToField('eduContent', true, true, false);
                    hwpDocCtrl.putFieldText('eduContent', ResultData.EDU_CONTENT);
                    hwpDocCtrl.global.HwpCtrl.MoveToField('eduMoney', true, true, false);
                    hwpDocCtrl.putFieldText('eduMoney', fn_numberWithCommas(ResultData.EDU_MONEY)+" 원");
                    hwpDocCtrl.global.HwpCtrl.MoveToField('attachDocName', true, true, false);
                    hwpDocCtrl.putFieldText('attachDocName', ResultData.ATTACH_DOC_NAME);

                    let toDate = year+"년 "+month+"월 "+date+"일";
                    hwpDocCtrl.global.HwpCtrl.MoveToField('toDate', true, true, false);
                    hwpDocCtrl.putFieldText('toDate', toDate);

                    hwpDocCtrl.global.HwpCtrl.MoveToField('compType', true, true, false);
                    hwpDocCtrl.putFieldText('compType', ResultData.COMP_TYPE);
                    hwpDocCtrl.global.HwpCtrl.MoveToField('careName', true, true, false);
                    hwpDocCtrl.putFieldText('careName', ResultData.CARE_NAME);
                    hwpDocCtrl.global.HwpCtrl.MoveToField('careLocation', true, true, false);
                    hwpDocCtrl.putFieldText('careLocation', ResultData.CARE_LOCATION);

                    let objectForum = ResultData.OBJECT_FORUM_TYPE == "주제발표" ? ResultData.OBJECT_FORUM_TYPE+" (발표주제 : "+ResultData.OBJECT_FORUM_VAL+")" : ResultData.OBJECT_FORUM_TYPE;
                    hwpDocCtrl.global.HwpCtrl.MoveToField('objectForum', true, true, false);
                    hwpDocCtrl.putFieldText('objectForum', objectForum);
                    hwpDocCtrl.global.HwpCtrl.MoveToField('returnMoney', true, true, false);
                    hwpDocCtrl.putFieldText('returnMoney', fn_numberWithCommas(ResultData.RETURN_MONEY)+" 원");
                    hwpDocCtrl.global.HwpCtrl.MoveToField('returnDoc', true, true, false);
                    hwpDocCtrl.putFieldText('returnDoc', ResultData.RETURN_DOC);
                    hwpDocCtrl.global.HwpCtrl.MoveToField('bookWriterName', true, true, false);
                    hwpDocCtrl.putFieldText('bookWriterName', ResultData.BOOK_WRITER_NAME);
                    hwpDocCtrl.global.HwpCtrl.MoveToField('bookPageVal', true, true, false);
                    hwpDocCtrl.putFieldText('bookPageVal', ResultData.BOOK_PAGE_VAL);
                    hwpDocCtrl.global.HwpCtrl.MoveToField('bookPulishName', true, true, false);
                    hwpDocCtrl.putFieldText('bookPulishName', ResultData.BOOK_PULISH_NAME);
                    hwpDocCtrl.global.HwpCtrl.MoveToField('treaOrigin', true, true, false);
                    hwpDocCtrl.putFieldText('treaOrigin', ResultData.TREA_ORIGIN);
                    hwpDocCtrl.global.HwpCtrl.MoveToField('treaUnit', true, true, false);
                    hwpDocCtrl.putFieldText('treaUnit', ResultData.TREA_UNIT+" 편");
                    hwpDocCtrl.global.HwpCtrl.MoveToField('treaType', true, true, false);
                    hwpDocCtrl.putFieldText('treaType', ResultData.TREA_TYPE+" 학술지");
                    hwpDocCtrl.global.HwpCtrl.MoveToField('treaUser', true, true, false);
                    hwpDocCtrl.putFieldText('treaUser', ResultData.TREA_USER);
                    hwpDocCtrl.global.HwpCtrl.MoveToField('bookUnit', true, true, false);
                    hwpDocCtrl.putFieldText('bookUnit', ResultData.BOOK_UNIT+" 권");

                    let regSign = "신 청 자 : "+ResultData.EMP_NAME_KR+" (서명)";
                    hwpDocCtrl.global.HwpCtrl.MoveToField('regSign', true, true, false);
                    hwpDocCtrl.putFieldText('regSign', regSign);

                    hwpDocCtrl.global.HwpCtrl.MoveToField('eduTeacherName', true, true, false);
                    hwpDocCtrl.putFieldText('eduTeacherName', ResultData.EDU_TEACHER_NAME);

                    hwpDocCtrl.global.HwpCtrl.MoveToField('eduEval'+ResultData.EDU_EVAL, true, true, false);
                    hwpDocCtrl.putFieldText('eduEval'+ResultData.EDU_EVAL, "O");

                    hwpDocCtrl.global.HwpCtrl.MoveToField('eduPoint', true, true, false);
                    hwpDocCtrl.putFieldText('eduPoint', ResultData.EDU_POINT);

                },
                error: function(e) {
                    console.log(e);
                    alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다.");
                    window.close();
                }
            });
        }else if(data.menuCd == "certifi") {
            const userProofSn = certifiPrintPop.global.params.userProofSn;

            if(userProofSn == null || userProofSn == undefined || userProofSn == "") {
                alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다.");
            }

            $.ajax({
                url : "/inside/getCertificateOne",
                data : {
                    userProofSn : userProofSn
                },
                type : "post",
                dataType : "json",
                async: false,
                success : function(result){
                    console.log(result.data);
                    const ResultData = result.data;

                    let today = new Date();
                    let year = today.getFullYear(); // 년도
                    let month = today.getMonth() + 1;  // 월
                    let date = today.getDate();  // 날짜

                    //문서제목
                    const proofName = ResultData.PROOF_TYPE == 1 ? "재직증명서" : "경력증명서";
                    hwpDocCtrl.global.HwpCtrl.MoveToField('proofName', true, true, false);
                    hwpDocCtrl.putFieldText('proofName', proofName);

                    //한글파일 제목
                    certifiPrintPop.global.params.fileTitle = ResultData.EMP_NAME_KR + " " + proofName

                    //호수
                    const number = "제"+ResultData.DOCU_YEAR_DE+"-"+ResultData.USER_PROOF_SN+"호"
                    hwpDocCtrl.global.HwpCtrl.MoveToField('number', true, true, false);
                    hwpDocCtrl.putFieldText('number', number);

                    //성명
                    hwpDocCtrl.global.HwpCtrl.MoveToField('empName', true, true, false);
                    hwpDocCtrl.putFieldText('empName', ResultData.EMP_NAME_KR);

                    //생년월일
                    let birthDay = ResultData.BDAY.split("-");
                    let birthDayText = birthDay[0]+"년 "+birthDay[1]+"월 "+birthDay[2]+"일";
                    hwpDocCtrl.global.HwpCtrl.MoveToField('birth', true, true, false);
                    hwpDocCtrl.putFieldText('birth', birthDayText);

                    //주소
                    hwpDocCtrl.global.HwpCtrl.MoveToField('address', true, true, false);
                    hwpDocCtrl.putFieldText('address', ResultData.ADDR);

                    //소속
                    hwpDocCtrl.global.HwpCtrl.MoveToField('deptName', true, true, false);
                    hwpDocCtrl.putFieldText('deptName', ResultData.DEPT_FULL_NAME);

                    //직위
                    hwpDocCtrl.global.HwpCtrl.MoveToField('positionName', true, true, false);
                    hwpDocCtrl.putFieldText('positionName', ResultData.POSITION_NAME);

                    // 직무
                    hwpDocCtrl.putFieldText('jobTitle', ResultData.JOB_DETAIL);

                    //근무기간
                    let joinDay = ResultData.JOIN_DAY.split("-");
                    let joinDayText = joinDay[0]+"년"+joinDay[1]+"월"+joinDay[2]+"일";
                    let regDe = ResultData.REG_DE.split("-");
                    let regDeText = regDe[0]+"년"+regDe[1]+"월"+regDe[2]+"일";
                    let betDay = betweenDay(ResultData.JOIN_DAY.replace("-",""), ResultData.REG_DE.replace("-",""));
                    let betYear = Math.floor(betDay / 12);
                    let betMonth = betDay % 12;
                    let tenureText = joinDayText+"부터"+regDeText+"까지("+betYear+"년"+betMonth+"개월)";
                    hwpDocCtrl.global.HwpCtrl.MoveToField('tenure', true, true, false);
                    hwpDocCtrl.putFieldText('tenure', tenureText);

                    //용도
                    hwpDocCtrl.global.HwpCtrl.MoveToField('usageName', true, true, false);
                    hwpDocCtrl.putFieldText('usageName', ResultData.USAGE_NAME);

                    //요청일
                    let toDate = year+"년 "+month+"월 "+date+"일";
                    hwpDocCtrl.global.HwpCtrl.MoveToField('toDate', true, true, false);
                    hwpDocCtrl.putFieldText('toDate', toDate);

                    let regSign = ResultData.APPROVAL_EMP_NAME+" (인)";
                    hwpDocCtrl.global.HwpCtrl.MoveToField('regSign', true, true, false);
                    hwpDocCtrl.putFieldText('regSign', regSign);

                    if(ResultData.FILE_PATH != null){
                        if(hwpDocCtrl.global.HwpCtrl.FieldExist('sign')){
                            hwpDocCtrl.global.HwpCtrl.PutFieldText('sign', " ");
                            hwpDocCtrl.global.HwpCtrl.MoveToField('sign', true, true, false);
                            hwpDocCtrl.global.HwpCtrl.InsertBackgroundPicture(
                                "SelectedCell",
                                "http://218.158.231.186/" + ResultData.FILE_PATH,
                                1,
                                5,
                                0,
                                0,
                                0,
                                0
                            );
                        }
                    }
                }
            });
        }else if(data.menuCd == "snack") {

            const snackInfoSn = snackPrint.global.params.snackInfoSn;

            if(snackInfoSn == null || snackInfoSn == undefined || snackInfoSn == "") {
                alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다.");
            }

            $.ajax({
                    url : "/inside/getSnackOne",
                    data : {
                        snackInfoSn : snackInfoSn
                    },
                    type : "post",
                    dataType : "json",
                    async: false,
                    success : function(result){
                        console.log(result.data);
                        const ResultData = result.data;

                        let today = new Date();
                        let year = today.getFullYear(); // 년도
                        let month = today.getMonth() + 1;  // 월
                        let date = today.getDate();  // 날짜

                        let useDate = ResultData.USE_DT+" "+ResultData.USE_TIME;
                        hwpDocCtrl.global.HwpCtrl.MoveToField('useDate', true, true, false);
                        hwpDocCtrl.putFieldText('useDate', useDate);

                        let typeText = "";
                        if(Number(ResultData.PAY_TYPE) == 2) {
                            typeText = ResultData.PAY_TYPE_TEXT+ "( "+ResultData.CARD_TEXT+" )";
                        }else {
                            typeText = ResultData.PAY_TYPE_TEXT;
                        }
                        hwpDocCtrl.global.HwpCtrl.MoveToField('useType', true, true, false);
                        hwpDocCtrl.putFieldText('useType', typeText);

                        hwpDocCtrl.global.HwpCtrl.MoveToField('useName', true, true, false);
                        hwpDocCtrl.putFieldText('useName', ResultData.DEPT_NAME+" "+ResultData.DEPT_TEAM_NAME+" "+ResultData.EMP_NAME_KR);

                        let useMoney = fn_numberWithCommas(ResultData.AMOUNT_SN)+" 원";
                        hwpDocCtrl.global.HwpCtrl.MoveToField('useMoney', true, true, false);
                        hwpDocCtrl.putFieldText('useMoney', useMoney);

                        let userText = ResultData.USER_TEXT;
                        let userTextArr = userText.split(',');
                        let useTarget = "";
                        if(userTextArr.length > 1) {
                            useTarget += userTextArr[0]+" 외 "+(userTextArr.length-1)+"명";
                        }else {
                            useTarget += userTextArr[0];
                        }
                        useTarget += "의 "+ResultData.SNACK_TYPE_TEXT+"이용";

                        hwpDocCtrl.global.HwpCtrl.MoveToField('useTarget', true, true, false);
                        hwpDocCtrl.putFieldText('useTarget', useTarget);
                    }
            });
        }else if(data.menuCd == "bustrip") {
            const hrBizReqId = data.approKey.split("_")[1];

            if(hrBizReqId == null || hrBizReqId == undefined || hrBizReqId == "") {
                alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다.");
            }

            const result = customKendo.fn_customAjax("/bustrip/getBustripReqInfo", {
                hrBizReqId: hrBizReqId
            });
            const busInfo = result.rs.rs;

            //요청일
            hwpDocCtrl.global.HwpCtrl.MoveToField('toDate', true, true, false);
            hwpDocCtrl.putFieldText('toDate', fn_getNowDate(1));

            let tripCode = busInfo.TRIP_CODE;
            let tripCodeText = "";
            if (tripCode == 1) {
                tripCodeText = "도내(시내)";
            }else if (tripCode == 2) {
                tripCodeText = "도내(시외)";
            }else if (tripCode == 3) {
                tripCodeText = "도외";
            }else if (tripCode == 4) {
                tripCodeText = "해외";
            }
            hwpDocCtrl.global.HwpCtrl.MoveToField('tripCode', true, true, false);
            hwpDocCtrl.putFieldText('tripCode', tripCodeText);

            let tripDate = busInfo.TRIP_DAY_FR.split("-")[0]+"년"+busInfo.TRIP_DAY_FR.split("-")[1]+"월"+busInfo.TRIP_DAY_FR.split("-")[2]+"일 "+busInfo.TRIP_TIME_FR
                +" ~ "
                +busInfo.TRIP_DAY_TO.split("-")[0]+"년"+busInfo.TRIP_DAY_TO.split("-")[1]+"월"+busInfo.TRIP_DAY_TO.split("-")[2]+"일 "+busInfo.TRIP_TIME_TO;
            hwpDocCtrl.global.HwpCtrl.MoveToField('tripDate', true, true, false);
            hwpDocCtrl.putFieldText('tripDate', tripDate);


            let visit = busInfo.VISIT_CRM + ", "+ busInfo.VISIT_LOC;
            if(busInfo.VISIT_LOC_SUB != ""){
                visit = busInfo.VISIT_CRM + ", " + busInfo.VISIT_LOC_SUB+" / "+busInfo.VISIT_LOC;
            }
            hwpDocCtrl.global.HwpCtrl.MoveToField('visit', true, true, false);
            hwpDocCtrl.putFieldText('visit', visit);



            let carText = "";
            const carList = busInfo.USE_TRSPT;
            if (carList == 1) {
                carText = "카니발";
            }else if (carList == 5) {
                carText = "아반떼";
            }else if (carList == 3) {
                carText = "트럭";
            }else if (carList == 10) {
                carText = "자가";
            }else if (carList == 0) {
                carText = "대중교통";
            }else if (carList == 12) {
                carText = "모하비";
            }else if (carList == 13) {
                carText = "솔라티";
            }else if (carList == 14) {
                carText = "드론관제차량";
            }else if (carList == 11) {
                carText = "기타";
            }
            let car = carText;
            hwpDocCtrl.global.HwpCtrl.MoveToField('car', true, true, false);
            hwpDocCtrl.putFieldText('car', car);

            hwpDocCtrl.global.HwpCtrl.MoveToField('empName', true, true, false);
            hwpDocCtrl.putFieldText('empName', busInfo.EMP_NAME);

            hwpDocCtrl.global.HwpCtrl.MoveToField('dept', true, true, false);
            hwpDocCtrl.putFieldText('dept', busInfo.DEPT_NAME+" "+busInfo.TEAM_NAME);

            hwpDocCtrl.global.HwpCtrl.MoveToField('position', true, true, false);
            hwpDocCtrl.putFieldText('position', busInfo.POSITION_NAME);

            hwpDocCtrl.global.HwpCtrl.MoveToField('title', true, true, false);
            hwpDocCtrl.putFieldText('title', busInfo.TITLE);

            let regSign = busInfo.EMP_NAME+" (인)";
            hwpDocCtrl.global.HwpCtrl.MoveToField('regSign', true, true, false);
            hwpDocCtrl.putFieldText('regSign', regSign);

        }else if(data.menuCd == "bustripRes") {
            const hrBizReqResultId = data.approKey.split("_")[1];

            if(hrBizReqResultId == null || hrBizReqResultId == undefined || hrBizReqResultId == "") {
                alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다.");
            }

            const result = customKendo.fn_customAjax("/bustrip/getBustripOne", {
                hrBizReqResultId: hrBizReqResultId
            });

            const busInfo = result.map;

            //요청일
            hwpDocCtrl.putFieldText('toDate', fn_getNowDate(1));

            let tripCode = busInfo.TRIP_CODE;
            let tripCodeText = "";
            if (tripCode == 1) {
                tripCodeText = "도내(시내)";
            }else if (tripCode == 2) {
                tripCodeText = "도내(시외)";
            }else if (tripCode == 3) {
                tripCodeText = "도외";
            }else if (tripCode == 4) {
                tripCodeText = "해외";
            }
            hwpDocCtrl.putFieldText('tripCode', tripCodeText);

            let tripDate = busInfo.TRIP_DAY_FR.split("-")[0]+"년"+busInfo.TRIP_DAY_FR.split("-")[1]+"월"+busInfo.TRIP_DAY_FR.split("-")[2]+"일 "+busInfo.TRIP_TIME_FR
                +" ~ "
                +busInfo.TRIP_DAY_TO.split("-")[0]+"년"+busInfo.TRIP_DAY_TO.split("-")[1]+"월"+busInfo.TRIP_DAY_TO.split("-")[2]+"일 "+busInfo.TRIP_TIME_TO;
            hwpDocCtrl.putFieldText('tripDate', tripDate);


            let visit = busInfo.VISIT_CRM + ", "+ busInfo.VISIT_LOC;
            if(busInfo.VISIT_LOC_SUB != ""){
                visit = busInfo.VISIT_CRM + ", " + busInfo.VISIT_LOC_SUB+" / "+busInfo.VISIT_LOC;
            }
            hwpDocCtrl.putFieldText('visit', visit);



            let carText = "";
            const carList = busInfo.USE_TRSPT;
            if (carList == 1) {
                carText = "카니발";
            }else if (carList == 5) {
                carText = "아반떼";
            }else if (carList == 3) {
                carText = "트럭";
            }else if (carList == 10) {
                carText = "자가";
            }else if (carList == 0) {
                carText = "대중교통";
            }else if (carList == 12) {
                carText = "모하비";
            }else if (carList == 13) {
                carText = "솔라티";
            }else if (carList == 14) {
                carText = "드론관제차량";
            }else if (carList == 11) {
                carText = "기타";
            }
            let car = carText;
            hwpDocCtrl.putFieldText('car', car);

            hwpDocCtrl.putFieldText('empName', busInfo.EMP_NAME);

            hwpDocCtrl.putFieldText('dept', busInfo.DEPT_NAME+" "+busInfo.TEAM_NAME);

            hwpDocCtrl.putFieldText('position', busInfo.POSITION_NAME);

            hwpDocCtrl.putFieldText('title', busInfo.TITLE);

            let regSign = busInfo.EMP_NAME+" (인)";
            hwpDocCtrl.putFieldText('regSign', regSign);





            const map = customKendo.fn_customAjax("/inside/getBustripExnpInfo", {
                hrBizReqResultId: hrBizReqResultId
            }).list;

            let oilCostTotal = 0;
            let trafCostTotal = 0;
            let trafDayTotal = 0;
            let tollCostTotal = 0;
            let dayCostTotal = 0;
            let eatCostTotal = 0;
            let parkingCostTotal = 0;
            let etcCostTotal = 0;
            let totalCostTotal = 0;

            let oilCorpCostTotal = 0;
            let trafCorpCostTotal = 0;
            let trafDayCorpotal = 0;
            let tollCorpCostTotal = 0;
            let dayCorpCostTotal = 0;
            let eatCorpCostTotal = 0;
            let parkingCorpCostTotal = 0;
            let etcCorpCostTotal = 0;
            let totalCorpCostTotal = 0;

            var html = "";
            html += '<table style="font-family:굴림;margin: 0 auto; max-width: none; border-collapse: separate; border-spacing: 0; empty-cells: show; border-width: 0; outline: 0; text-align: left; font-size:12px; line-height: 20px; width: 100%; ">';
            html += '   <tr>';
            html += '       <td style="border-width: 0 0 0 0; font-weight: normal; box-sizing: border-box;">';
            html += '           <table border="1" style="border-collapse: collapse; margin-top: 0px;">';
            html += '               <tr>';
            html += '                   <td style="height:25px;background-color:#FFE0E0; text-align:center; width: 63px"><p style="font-weight: bold;">이름</p></td>';
            html += '                   <td style="height:25px;background-color:#FFE0E0; text-align:center; width: 63px"><p style="font-weight: bold;">유류비</p></td>';
            html += '                   <td style="height:25px;background-color:#FFE0E0; text-align:center; width: 63px"><p style="font-weight: bold;">교통비</p></td>';
            html += '                   <td style="height:25px;background-color:#FFE0E0; text-align:center; width: 63px"><p style="font-weight: bold;">통행료</p></td>';
            html += '                   <td style="height:25px;background-color:#FFE0E0; text-align:center; width: 63px"><p style="font-weight: bold;">숙박비</p></td>';
            html += '                   <td style="height:25px;background-color:#FFE0E0; text-align:center; width: 63px"><p style="font-weight: bold;">일비</p></td>';
            html += '                   <td style="height:25px;background-color:#FFE0E0; text-align:center; width: 63px"><p style="font-weight: bold;">식비</p></td>';
            html += '                   <td style="height:25px;background-color:#FFE0E0; text-align:center; width: 63px"><p style="font-weight: bold;">주차비</p></td>';
            html += '                   <td style="height:25px;background-color:#FFE0E0; text-align:center; width: 63px"><p style="font-weight: bold;">기타</p></td>';
            html += '                   <td style="height:25px;background-color:#FFE0E0; text-align:center; width: 65px"><p style="font-weight: bold;">합계</p></td>';
            html += '               </tr>';

            for(let i=0; i<map.length; i++){
                let personTot = 0;

                oilCostTotal += Number(map[i].OIL_COST.replace(",", ""));
                trafCostTotal += Number(map[i].TRAF_COST.replace(",", ""));
                trafDayTotal += Number(map[i].TRAF_DAY_COST.replace(",", ""));
                tollCostTotal += Number(map[i].TOLL_COST.replace(",", ""));
                dayCostTotal += Number(map[i].DAY_COST.replace(",", ""));
                eatCostTotal += Number(map[i].EAT_COST.replace(",", ""));
                parkingCostTotal += Number(map[i].PARKING_COST.replace(",", ""));
                etcCostTotal += Number(map[i].ETC_COST.replace(",", ""));
                totalCostTotal += Number(map[i].TOT_COST.replace(",", ""));

                html += '   <tr>';
                html += '       <td style="height:25px;text-align:center;"><p>'+map[i].EMP_NAME+'</p></td>';

                if(map[i].OIL_CORP_YN != "Y"){
                    personTot += Number(map[i].OIL_COST.replace(",", ""));
                    html += '       <td style="height:25px;text-align:center;"><p>'+map[i].OIL_COST+'</p></td>';
                }else{
                    oilCorpCostTotal += Number(map[i].OIL_COST.replace(",", ""));
                    html += '       <td style="height:25px;text-align:center;"><p>0</p></td>';
                }

                if(map[i].TRAF_CORP_YN != "Y"){
                    personTot += Number(map[i].TRAF_COST.replace(",", ""));
                    html += '       <td style="height:25px;text-align:center;"><p>'+map[i].TRAF_COST+'</p></td>';
                }else{
                    trafCorpCostTotal += Number(map[i].TRAF_COST.replace(",", ""));
                    html += '       <td style="height:25px;text-align:center;">0</td>';
                }

                if(map[i].TRAF_DAY_CORP_YN != "Y"){
                    personTot += Number(map[i].TRAF_DAY_COST.replace(",", ""));
                    html += '       <td style="height:25px;text-align:center;"><p>'+map[i].TRAF_DAY_COST+'</p></td>';
                }else{
                    trafDayCorpotal += Number(map[i].TRAF_DAY_COST.replace(",", ""));
                    html += '       <td style="height:25px;text-align:center;">0</td>';
                }

                if(map[i].TOLL_CORP_YN != "Y"){
                    personTot += Number(map[i].TOLL_COST.replace(",", ""));
                    html += '       <td style="height:25px;text-align:center;"><p>'+map[i].TOLL_COST+'</p></td>';
                }else{
                    tollCorpCostTotal += Number(map[i].TOLL_COST.replace(",", ""));
                    html += '       <td style="height:25px;text-align:center;">0</td>';
                }

                html += '       <td style="height:25px;text-align:center;"><p>'+map[i].DAY_COST+'</p></td>';

                if(map[i].EAT_CORP_YN != "Y"){
                    personTot += Number(map[i].EAT_COST.replace(",", ""));
                    html += '       <td style="height:25px;text-align:center;"><p>'+map[i].EAT_COST+'</p></td>';
                }else{
                    eatCorpCostTotal += Number(map[i].EAT_COST.replace(",", ""));
                    html += '       <td style="height:25px;text-align:center;">0</td>';
                }

                if(map[i].PARKING_CORP_YN != "Y"){
                    personTot += Number(map[i].PARKING_COST.replace(",", ""));
                    html += '       <td style="height:25px;text-align:center;"><p>'+map[i].PARKING_COST+'</p></td>';
                }else{
                    parkingCorpCostTotal += Number(map[i].PARKING_COST.replace(",", ""));
                    html += '       <td style="height:25px;text-align:center;">0</td>';
                }

                if(map[i].ETC_CORP_YN != "Y"){
                    personTot += Number(map[i].ETC_COST.replace(",", ""));
                    html += '       <td style="height:25px;text-align:center;"><p>'+map[i].ETC_COST+'</p></td>';
                }else{
                    etcCorpCostTotal += Number(map[i].ETC_COST.replace(",", ""));
                    html += '       <td style="height:25px;text-align:center;"><p>'+map[i].ETC_COST+'</p></td>';
                }

                html += '       <td style="height:25px;text-align:center;"><p>'+fn_numberWithCommas(personTot)+'</p></td>';
                html += '   </tr>';
            }
            html += '                   <tr>';
            html += '                       <td style="height:25px; text-align:center; width: 63px"><p style="font-weight: bold;">법인카드</p></td>';
            html += '                       <td style="height:25px; text-align:center; width: 63px"><p style="font-weight: bold;">0</p></td>';
            html += '                       <td style="height:25px; text-align:center; width: 63px"><p style="font-weight: bold;">'+fn_comma(trafCorpCostTotal)+'</p></td>';
            html += '                       <td style="height:25px; text-align:center; width: 63px"><p style="font-weight: bold;">'+fn_comma(trafDayCorpotal)+'</p></td>';
            html += '                       <td style="height:25px; text-align:center; width: 63px"><p style="font-weight: bold;">'+fn_comma(tollCorpCostTotal)+'</p></td>';
            html += '                       <td style="height:25px; text-align:center; width: 63px"><p style="font-weight: bold;">'+fn_comma(dayCorpCostTotal)+'</p></td>';
            html += '                       <td style="height:25px; text-align:center; width: 63px"><p style="font-weight: bold;">'+fn_comma(eatCorpCostTotal)+'</p></td>';
            html += '                       <td style="height:25px; text-align:center; width: 63px"><p style="font-weight: bold;">'+fn_comma(parkingCorpCostTotal)+'</p></td>';
            html += '                       <td style="height:25px; text-align:center; width: 63px"><p style="font-weight: bold;">'+fn_comma(etcCorpCostTotal)+'</p></td>';
            html += '                       <td style="height:25px; text-align:center; width: 63px"><p style="font-weight: bold;">'+fn_comma(trafCorpCostTotal+trafDayCorpotal+tollCorpCostTotal+dayCorpCostTotal+eatCorpCostTotal+parkingCorpCostTotal+etcCorpCostTotal+etcCorpCostTotal)+'</p></td>';
            html += '                   </tr>';

            html += '                   <tr>';
            html += '                       <td style="height:25px; text-align:center; width: 63px"><p style="font-weight: bold;">법인차량</p></td>';
            html += '                       <td style="height:25px; text-align:center; width: 63px"><p style="font-weight: bold;">'+fn_comma(oilCorpCostTotal)+'</p></td>';
            html += '                       <td style="height:25px; text-align:center; width: 63px"><p style="font-weight: bold;">0</p></td>';
            html += '                       <td style="height:25px; text-align:center; width: 63px"><p style="font-weight: bold;">0</p></td>';
            html += '                       <td style="height:25px; text-align:center; width: 63px"><p style="font-weight: bold;">0</p></td>';
            html += '                       <td style="height:25px; text-align:center; width: 63px"><p style="font-weight: bold;">0</p></td>'
            html += '                       <td style="height:25px; text-align:center; width: 63px"><p style="font-weight: bold;">0</p></td>';
            html += '                       <td style="height:25px; text-align:center; width: 63px"><p style="font-weight: bold;">0</p></td>';
            html += '                       <td style="height:25px; text-align:center; width: 63px"><p style="font-weight: bold;">0</p></td>';
            html += '                       <td style="height:25px; text-align:center; width: 63px"><p style="font-weight: bold;">'+fn_comma(oilCorpCostTotal)+'</p></td>';
            html += '                   </tr>';

            html += '                   <tr>';
            html += '                       <td style="height:25px; text-align:center; width: 63px"><p style="font-weight: bold;">합계</p></td>';
            html += '                       <td style="height:25px; text-align:center; width: 63px"><p style="font-weight: bold;">'+fn_comma(oilCostTotal)+'</p></td>';
            html += '                       <td style="height:25px; text-align:center; width: 63px"><p style="font-weight: bold;">'+fn_comma(trafCostTotal)+'</p></td>';
            html += '                       <td style="height:25px; text-align:center; width: 63px"><p style="font-weight: bold;">'+fn_comma(trafDayTotal)+'</p></td>';
            html += '                       <td style="height:25px; text-align:center; width: 63px"><p style="font-weight: bold;">'+fn_comma(tollCostTotal)+'</p></td>';
            html += '                       <td style="height:25px; text-align:center; width: 63px"><p style="font-weight: bold;">'+fn_comma(dayCostTotal)+'</p></td>';
            html += '                       <td style="height:25px; text-align:center; width: 63px"><p style="font-weight: bold;">'+fn_comma(eatCostTotal)+'</p></td>';
            html += '                       <td style="height:25px; text-align:center; width: 63px"><p style="font-weight: bold;">'+fn_comma(parkingCostTotal)+'</p></td>';
            html += '                       <td style="height:25px; text-align:center; width: 63px"><p style="font-weight: bold;">'+fn_comma(etcCostTotal)+'</p></td>';
            html += '                       <td style="height:25px; text-align:center; width: 63px"><p style="font-weight: bold;">'+fn_comma(totalCostTotal)+'</p></td>';
            html += '                   </tr>';
            html += '               </table>';
            html += '           </table>';
            html += '       </td>';
            html += '   </tr>';

            hwpDocCtrl.moveToField('exnpTable', true, true, false);
            hwpDocCtrl.setTextFile(html, "html","insertfile");








        }else if(data.menuCd == "invention") {
            const inventionInfoSn = data.approKey.split("_")[1];

            if(inventionInfoSn == null || inventionInfoSn == undefined || inventionInfoSn == "") {
                alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다.");
            }

            $.ajax({
                url: "/inside/getInventionInfo",
                data: {
                    inventionInfoSn: inventionInfoSn
                },
                type: "post",
                dataType: "json",
                async: false,
                success: function (result) {
                    const invenInfo = result.rs.info;
                    const shareList = result.rs.shareList;

                    let today = new Date();
                    let year = today.getFullYear(); // 년도
                    let month = today.getMonth() + 1;  // 월
                    let date = today.getDate();  // 날짜

                    hwpDocCtrl.global.HwpCtrl.MoveToField('iprClass', true, true, false);
                    hwpDocCtrl.putFieldText('iprClass', "✓ "+invenInfo.IPR_NAME);

                    hwpDocCtrl.global.HwpCtrl.MoveToField('title', true, true, false);
                    hwpDocCtrl.putFieldText('title', invenInfo.TITLE);

                    hwpDocCtrl.global.HwpCtrl.MoveToField('detail', true, true, false);
                    hwpDocCtrl.putFieldText('detail', invenInfo.DETAIL_CN);

                    let toDate = year+"년 "+month+"월 "+date+"일";
                    hwpDocCtrl.global.HwpCtrl.MoveToField('toDate', true, true, false);
                    hwpDocCtrl.putFieldText('toDate', toDate);

                    hwpDocCtrl.global.HwpCtrl.MoveToField('regEmpName', true, true, false);
                    hwpDocCtrl.putFieldText('regEmpName', invenInfo.REG_EMP_NAME);

                    let field = "";
                    for(let i=1; i<shareList.length+1; i++){
                        field = "empName"+i;
                        hwpDocCtrl.global.HwpCtrl.MoveToField(field, true, true, false);
                        hwpDocCtrl.putFieldText(field, shareList[i-1].EMP_NAME);

                        field = "deptName"+i;
                        hwpDocCtrl.global.HwpCtrl.MoveToField(field, true, true, false);
                        hwpDocCtrl.putFieldText(field, shareList[i-1].DEPT_NAME);

                        field = "share"+i;
                        hwpDocCtrl.global.HwpCtrl.MoveToField(field, true, true, false);
                        hwpDocCtrl.putFieldText(field, String(shareList[i-1].SHARE));
                    }

                    hwpDocCtrl.global.HwpCtrl.MoveToField('manager', true, true, false);
                    hwpDocCtrl.putFieldText('manager', invenInfo.MANAGER_NAME);
                }
            });
        }else if(data.menuCd == "rprRes") {
            const inventionInfoSn = data.approKey.split("_")[1];

            if(inventionInfoSn == null || inventionInfoSn == undefined || inventionInfoSn == "") {
                alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다.");
            }

            $.ajax({
                url: "/inside/getInventionInfo",
                data: {
                    inventionInfoSn: inventionInfoSn
                },
                type: "post",
                dataType: "json",
                async: false,
                success: function (result) {
                    console.log(result);
                    const invenInfo = result.rs.info;
                    const shareList = result.rs.shareList;

                    let today = new Date();
                    let year = today.getFullYear(); // 년도
                    let month = today.getMonth() + 1;  // 월
                    let date = today.getDate();  // 날짜

                    hwpDocCtrl.global.HwpCtrl.MoveToField('iprClass', true, true, false);
                    hwpDocCtrl.putFieldText('iprClass', "✓ "+invenInfo.IPR_NAME);

                    hwpDocCtrl.global.HwpCtrl.MoveToField('title', true, true, false);
                    hwpDocCtrl.putFieldText('title', invenInfo.TITLE);

                    hwpDocCtrl.global.HwpCtrl.MoveToField('detail', true, true, false);
                    hwpDocCtrl.putFieldText('detail', invenInfo.DETAIL_CN);

                    let toDate = year+"년 "+month+"월 "+date+"일";
                    hwpDocCtrl.global.HwpCtrl.MoveToField('toDate', true, true, false);
                    hwpDocCtrl.putFieldText('toDate', toDate);

                    hwpDocCtrl.global.HwpCtrl.MoveToField('regEmpName', true, true, false);
                    hwpDocCtrl.putFieldText('regEmpName', invenInfo.REG_EMP_NAME);

                    let field = "";
                    for(let i=1; i<shareList.length+1; i++){
                        field = "empName"+i;
                        hwpDocCtrl.global.HwpCtrl.MoveToField(field, true, true, false);
                        hwpDocCtrl.putFieldText(field, shareList[i-1].EMP_NAME);

                        field = "deptName"+i;
                        hwpDocCtrl.global.HwpCtrl.MoveToField(field, true, true, false);
                        hwpDocCtrl.putFieldText(field, shareList[i-1].DEPT_NAME);

                        field = "share"+i;
                        hwpDocCtrl.global.HwpCtrl.MoveToField(field, true, true, false);
                        hwpDocCtrl.putFieldText(field, shareList[i-1].SHARE);
                    }

                    hwpDocCtrl.global.HwpCtrl.MoveToField('regNum', true, true, false);
                    hwpDocCtrl.putFieldText('regNum', invenInfo.REG_NUM);

                    hwpDocCtrl.global.HwpCtrl.MoveToField('regNum', true, true, false);
                    hwpDocCtrl.putFieldText('regDate', invenInfo.REG_DATE);

                    hwpDocCtrl.global.HwpCtrl.MoveToField('manager', true, true, false);
                    hwpDocCtrl.putFieldText('manager', invenInfo.MANAGER_NAME);
                }
            });
        }else if(data.menuCd == "equipment"){
        }else if(data.menuCd == "delv") {
            const pjtSn = data.approKey.split("_")[1];
            if (pjtSn == null || pjtSn == undefined || pjtSn == "") {alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다.");}
            engnInit.delvInit(pjtSn);

        }else if(data.menuCd == "dev") {
            const devSn = data.approKey.split("_")[1];
            if (devSn == null || devSn == undefined || devSn == "") {alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다.");}
            engnInit.devInit(devSn);

        }else if(data.menuCd == "pjtRes") {
            const pjtSn = data.approKey.split("_")[1];
            if (pjtSn == null || pjtSn == undefined || pjtSn == "") { alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다."); return; }
            engnInit.resInit(pjtSn);

        }else if(data.menuCd == "pjtCost") {
            const pjtSn = data.approKey.split("_")[1];
            if (pjtSn == null || pjtSn == undefined || pjtSn == "") { alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다."); return; }
            hwpInit.pjtCostInit(pjtSn);
        }else if(data.menuCd == "purc") {
            const purcSn = data.approKey.split("_")[1];
            if (purcSn == null || purcSn == undefined || purcSn == "") { alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다."); return; }
            hwpInit.purcInit(purcSn);
        }else if(data.menuCd == "claim") {
            const claimSn = data.approKey.split("_")[1];
            if (claimSn == null || claimSn == undefined || claimSn == "") { alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다."); return; }
            hwpInit.claimInit(claimSn);
        } else if(data.menuCd == "payApp") {
            const payAppSn = data.approKey.split("_")[1];
            if (payAppSn == null || payAppSn == undefined || payAppSn == "") { alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다."); return; }
            payInit.payAppInit(payAppSn);
        } else if(data.menuCd == "exnp") {
            const exnpSn = data.approKey.split("_")[1];
            if (exnpSn == null || exnpSn == undefined || exnpSn == "") { alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다."); return; }
            hwpInit.exnpInit(exnpSn);
        } else if(data.menuCd == "payIncp") {
            const payIncpSn = data.approKey.split("_")[1];
            if (payIncpSn == null || payIncpSn == undefined || payIncpSn == "") { alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다."); return; }
            hwpInit.payIncpInit(payIncpSn);
        } else if(data.menuCd == "rndDelv") {
            const pjtSn = data.approKey.split("_")[1];
            if (pjtSn == null || pjtSn == undefined || pjtSn == "") { alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다."); return; }
            rndInit.delvInit(pjtSn);
        } else if(data.menuCd == "rndDev") {
            const devSn = data.approKey.split("_")[1];
            if (devSn == null || devSn == undefined || devSn == "") { alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다."); return; }
            rndInit.devInit(devSn);
        } else if(data.menuCd == "unRndDelv") {
            const pjtSn = data.approKey.split("_")[1];
            if (pjtSn == null || pjtSn == undefined || pjtSn == "") { alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다."); return; }
            unRndInit.delvInit(pjtSn);
        } else if(data.menuCd == "unRndDev") {
            const devSn = data.approKey.split("_")[1];
            if (devSn == null || devSn == undefined || devSn == "") { alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다."); return; }
            unRndInit.devInit(devSn);
        } else if(data.menuCd == "pjtRate") {
            const partRateVerSn = data.approKey.split("_")[1];
            if (partRateVerSn == null || partRateVerSn == undefined || partRateVerSn == "") { alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다."); return; }
            hwpInit.pjtRateInit(partRateVerSn);
        } else if(data.menuCd == "rndRes") {
            const pjtSn = data.approKey.split("_")[1];
            if (pjtSn == null || pjtSn == undefined || pjtSn == "") { alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다."); return; }
            rndInit.resInit(pjtSn);
        } else if(data.menuCd == "unRndRes") {
            const pjtSn = data.approKey.split("_")[1];
            if (pjtSn == null || pjtSn == undefined || pjtSn == "") { alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다."); return; }
            unRndInit.resInit(pjtSn);
        } else if(data.menuCd == "car") {
            const carReqSn = data.approKey.split("_")[1];
            if (carReqSn == null || carReqSn == undefined || carReqSn == "") { alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다."); return; }
            hwpInit.carInit(carReqSn);
        } else if(data.menuCd == "pjtChange") {
            const pjtSn = data.approKey.split("_")[1];
            if (pjtSn == null || pjtSn == undefined || pjtSn == "") { alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다."); return; }
            rndInit.changeInit(pjtSn);
        }
    },

    defaultScript : function (HwpCtrl, openFormat, templateFormFile, templateFormOpt, templateCustomField, params, loginEmpSeq, mod) {
        console.log(params);
        hwpDocCtrl.global.HwpCtrl = HwpCtrl;
        hwpDocCtrl.global.mod = mod;

        if(hwpDocCtrl.global.mod == "W"){
            hwpDocCtrl.global.templateFile = templateFormFile.find(element => element.FORM_FILE_TYPE == "form");
            hwpDocCtrl.global.templateLogoFile = templateFormFile.find(element => element.FORM_FILE_TYPE == "logo");
            hwpDocCtrl.global.templateSymbolFile = templateFormFile.find(element => element.FORM_FILE_TYPE == "symbol");
            hwpDocCtrl.global.templateFormOpt = templateFormOpt;
            hwpDocCtrl.global.templateCustomField = templateCustomField;
            hwpDocCtrl.global.params = params;
            hwpDocCtrl.global.loginEmpInfo.loginEmpSeq = loginEmpSeq;
        }else if (hwpDocCtrl.global.mod == "RW"){
            hwpDocCtrl.global.templateFile = templateFormFile;
        }else if (hwpDocCtrl.global.mod == "V"){
            hwpDocCtrl.global.templateFile = templateFormFile;
        }

        hwpDocCtrl.open(
            hwpDocCtrl.global.templateFile.FILE_PATH + hwpDocCtrl.global.templateFile.FILE_UUID,
            openFormat,
            "",
            {"userData" : "success"}
        )
    },

    open : function(url, format, type, name) {
            return hwpDocCtrl.global.HwpCtrl.Open(url, format, type,
                function (res) {
                    console.log(res);
                    async function asyncCall() {

                        if(res.result){
                            if(hwpDocCtrl.global.mod == "W"){
                                hwpDocCtrl.openCallBack();
                            }else if (hwpDocCtrl.global.mod == "RW"){
                                hwpDocCtrl.modOpenCallBack();
                            }else if (hwpDocCtrl.global.mod == "V"){
                                hwpDocCtrl.viewOpenCallBack();
                            }
                        }else{
                            alert("결재문서를 찾을 수 없습니다.");
                        }

                    }

                    asyncCall().then(() => {

                        var abc = hwpDocCtrl.getFieldText();

                        var i = 1;

                        async function getDocDrawCall(){
                            i = i+1;
                            abc = hwpDocCtrl.getFieldText();
                        }

                        getDocDrawCall().then(() => {
                            (async () => {
                                getDocDrawCall();
                                await sleep(i); // 2초대기

                                if(abc != null){
                                    $("#loadingDiv").hide();
                                    document.querySelector('body').style.overflow = 'auto'
                                }

                            })();
                        });
                    });


                }, name);
        function sleep(sec) {
            return new Promise(resolve => setTimeout(resolve, sec * 1000));
        }
    },

    /**
     * @param format (DATA TYPE = STIRNG)
     * HWP = BASE64 ENCODING 형식
     * HWPML2X = 원본 문서의 모든 정보 유지(HWP 형식과 호환)
     * HTML = HTML 태그로 이루어짐 (한글 고유 서식은 손실)
     * @param option
     * 1. saveblock = 선택된 블록만 불러옴
     * 2. "" = 문서 전체
     * @returns {string}
     */
    getHwpFileData : function(format, option, e){
        hwpDocCtrl.global.HwpCtrl.GetTextFile(format, option, function(data) {
            if(format == "HTML"){
                hwpDocCtrl.global.htmlFileTextData = data;
            }else{
                hwpDocCtrl.global.hwpFileTextData = data;
            }
        })
    },

    openCallBack : function(){
        hwpDocCtrl.global.HwpCtrl.EditMode = 2;
        hwpDocCtrl.global.HwpCtrl.SetToolBar(2, "TOOLBAR_MENU");
        hwpDocCtrl.global.HwpCtrl.SetToolBar(2, "TOOLBAR_STANDARD");
        hwpDocCtrl.global.HwpCtrl.ShowRibbon(true);
        hwpDocCtrl.global.HwpCtrl.ShowCaret(true);
        hwpDocCtrl.global.HwpCtrl.ShowStatusBar(true);
        hwpDocCtrl.global.HwpCtrl.SetFieldViewOption(2);

        async function asyncCall() {
            hwpDocCtrl.dataSet();
        }
        if(hwpDocCtrl.global.HwpCtrl.FieldExist("header_campaign")){
            hwpDocCtrl.global.HwpCtrl.MoveToField('header_campaign', true, true, false);
            hwpDocCtrl.putFieldText('header_campaign', hwpDocCtrl.global.templateFormOpt.HEADER_CAMPAIGN);
        }

        if(hwpDocCtrl.global.HwpCtrl.FieldExist("img_logo")){
            hwpDocCtrl.global.HwpCtrl.MoveToField('img_logo', true, true, false);
            hwpDocCtrl.global.HwpCtrl.InsertBackgroundPicture(
                "SelectedCell",
                hwpDocCtrl.global.templateLogoFile.FILE_PATH + hwpDocCtrl.global.templateLogoFile.FILE_UUID,
                1,
                5,
                0,
                0,
                0,
                0
            );
        }

        if(hwpDocCtrl.global.HwpCtrl.FieldExist("img_symbol")){
            hwpDocCtrl.global.HwpCtrl.MoveToField('img_symbol', true, true, false);
            hwpDocCtrl.global.HwpCtrl.InsertBackgroundPicture(
                "SelectedCell",
                hwpDocCtrl.global.templateSymbolFile.FILE_PATH + hwpDocCtrl.global.templateSymbolFile.FILE_UUID,
                1,
                5,
                0,
                0,
                0,
                0
            );
        }

        if(hwpDocCtrl.global.HwpCtrl.FieldExist("agency_name")){
            hwpDocCtrl.global.HwpCtrl.MoveToField('agency_name', true, true, false);
            hwpDocCtrl.putFieldText('agency_name', hwpDocCtrl.global.templateFormOpt.FORM_COMP_NAME);
        }

        if(hwpDocCtrl.global.HwpCtrl.FieldExist("doc_receive")){
            hwpDocCtrl.putFieldText('doc_receive', "내부결재");
        }

        if(hwpDocCtrl.global.HwpCtrl.FieldExist("footer_campaign")){
            hwpDocCtrl.global.HwpCtrl.MoveToField('footer_campaign', true, true, false);
            hwpDocCtrl.putFieldText('footer_campaign', hwpDocCtrl.global.templateFormOpt.FOOTER_CAMPAIGN);
        }

        hwpDocCtrl.global.searchAjaxData = {
            empSeq : hwpDocCtrl.global.loginEmpInfo.loginEmpSeq
        }

        var result = customKendo.fn_customAjax("/user/getUserInfo", hwpDocCtrl.global.searchAjaxData);
        if(result.flag){
            hwpDocCtrl.global.loginEmpInfo = result;
            if(hwpDocCtrl.global.HwpCtrl.FieldExist("dept_name")){
                hwpDocCtrl.global.HwpCtrl.MoveToField('dept_name', true, true, false);
                hwpDocCtrl.putFieldText('dept_name', hwpDocCtrl.global.loginEmpInfo.DEPT_NAME);
            }
        }


        asyncCall().then(() => {

            var abc = hwpDocCtrl.getFieldText();

            var i = 1;

            async function getDocDrawCall(){
                i = i +1;
                abc = hwpDocCtrl.getFieldText();
            }

            getDocDrawCall().then(() => {
                (async () => {
                    getDocDrawCall();
                    await sleep(i); // 2초대기

                    if(abc != null){
                        if (hwpDocCtrl.global.HwpCtrl.FieldExist("doc_content")) {
                            hwpDocCtrl.global.HwpCtrl.MoveToField('doc_content', true, true, false);
                            hwpDocCtrl.setTextFile(draft.global.templateFormOpt.doc_contents, "HTML", "insertfile");
                        }
                    }

                })();
            });

        });

        function sleep(sec) {
            return new Promise(resolve => setTimeout(resolve, sec * 1000));
        }


        for(var i = 0; i < hwpDocCtrl.global.templateCustomField.length; i ++){
            if(hwpDocCtrl.global.HwpCtrl.FieldExist(hwpDocCtrl.global.templateCustomField[i].FIELD_NAME)){
                hwpDocCtrl.global.HwpCtrl.MoveToField(hwpDocCtrl.global.templateCustomField[i].FIELD_NAME, true, true, false);
                if(hwpDocCtrl.global.params[hwpDocCtrl.global.templateCustomField[i].FIELD_NAME] != null){
                    hwpDocCtrl.putFieldText(
                        hwpDocCtrl.global.templateCustomField[i].FIELD_NAME,
                        hwpDocCtrl.global.params[hwpDocCtrl.global.templateCustomField[i].FIELD_NAME]
                    );
                }
            }
        }
    },

    /**
     * 상신, 재상신시 사용하는 함수
     *
     * 기존 저장된 문서 열어서 수정 작업을 위함
     */
    modOpenCallBack : function(){
        hwpDocCtrl.global.HwpCtrl.EditMode = 2;
        hwpDocCtrl.global.HwpCtrl.SetToolBar(2, "TOOLBAR_MENU");
        hwpDocCtrl.global.HwpCtrl.SetToolBar(2, "TOOLBAR_STANDARD");
        hwpDocCtrl.global.HwpCtrl.ShowRibbon(true);
        hwpDocCtrl.global.HwpCtrl.ShowCaret(true);
        hwpDocCtrl.global.HwpCtrl.ShowStatusBar(true);
        hwpDocCtrl.global.HwpCtrl.SetFieldViewOption(2);

        hwpDocCtrl.global.HwpCtrl.MoveToField('doc_content', true, true, false);
    },

    /**r
     * 문서 보기 사용하는 함수
     */
    viewOpenCallBack : function(){
        hwpDocCtrl.global.HwpCtrl.EditMode = 0;
        hwpDocCtrl.global.HwpCtrl.SetToolBar(1, "TOOLBAR_MENU");
        hwpDocCtrl.global.HwpCtrl.SetToolBar(1, "TOOLBAR_STANDARD");
        hwpDocCtrl.global.HwpCtrl.ShowRibbon(false);
        hwpDocCtrl.global.HwpCtrl.ShowCaret(false);
        hwpDocCtrl.global.HwpCtrl.ShowStatusBar(false);
        hwpDocCtrl.global.HwpCtrl.SetFieldViewOption(1);
    },



    /**
     * 웹한글기안기는 ""로 데이터 클리어 안됨
     *
     * @param field = 삽입할 필드 이름 (DATA TYPE = String)
     * @param text = 삽입할 텍스트 (DATA TYPE = String)
     */
    putFieldText : function(field, text) {
        if (text == ""){
            text = "\n";
        }
        hwpDocCtrl.global.HwpCtrl.PutFieldText(field, text);
    },

    /**
     * 동일한 필드명에 숫자로 구분하는 필드들에 동일한 값 입력
     * ex) name1, name2, name3
     *
     * @param field = 필드 이름 ( String Array OR String ) ex) ["approval", "approver", "cooperate", "cooperation"]
     * @param size = 필드 개수 ex) 7 일시 0~7 검사
     * @param text = 넣을 텍스트 초기화시 "\n" 입력
     */
    putFieldsText : function(field, size, text){
        if(Array.isArray(field)){
            for(var i = 0; i < field.length; i++){
                for(var j = 0; j < size; j++){
                    if(hwpDocCtrl.global.HwpCtrl.FieldExist(field[i] + j)){
                        hwpDocCtrl.global.HwpCtrl.PutFieldText(field[i] + j, text);
                    }
                }
            }
        }else{
            for(var i = 0; i < size; i++){
                if(hwpDocCtrl.global.HwpCtrl.FieldExist(field + i)){
                    hwpDocCtrl.global.HwpCtrl.PutFieldText(field, text);
                }
            }
        }

        hwpDocCtrl.global.HwpCtrl.MoveToField('doc_content', true, true, false);
    },

    /**
     * fields - Data Type Json Array - 필드이름 리스트
     * ex) JSON.stringify([
     *          { field1 : "approval" },
     *          { field2 : "approver" }
     *     ])
     *
     * type - Data Type Array - 조건 리스트
     * ex) 아래 처럼 넣을시 이런 조건이 형성된다. > arr[0].approveType == 0
     *      trueCase는 배열에서 검사할 필드값
     *      trueValue는 Case로 꺼낸 필드 값으로 검사할 값
     * [
     *      { trueCase : "approveType" },
     *      { trueValue : "0" },
     * ]
     *
     * arrKey - Data Type Json Array - array에서 꺼내올 키 리스트
     * ex) JSON.stringify([
     *          { arrKey1 : "approveEmpName" },
     *          { arrKey2 : "approvePositionName" }
     *      ])
     * arr - DATA TYPE ARRAY - 데이터 리스트
     *
     * field1에 넣을 데이터는 배열에서 arrKey1로 꺼내온 값이여야 한다.
     *
     * @param trueFields == 참일때 넣을 필드이름 리스트
     * @param falseFields == 거짓일때 넣을 필드이름 리스트
     * @param type == 참인 조건
     * @param arrKey
     * @param arr
     */
    setArrayFieldsPut : function(trueFields, falseFields, type, arrKey, arr){
        var trueIndex = 0;
        var falseIndex = 0;
        for(var i = 0; i < trueFields.length; i++){
            for(var j = 0; j < arr.length; j++){
                if(type != ""){
                    var flag = arr[j][type.trueCase] == type.trueValue;
                    if(flag && hwpDocCtrl.global.HwpCtrl.FieldExist(trueFields[i] + "" + trueIndex)){
                        hwpDocCtrl.global.HwpCtrl.MoveToField(trueFields[i] + "" + trueIndex, true, true, false);
                        hwpDocCtrl.putFieldText(trueFields[i] + "" + trueIndex, arr[j][arrKey[i]]);
                        trueIndex++;
                    }else if(hwpDocCtrl.global.HwpCtrl.FieldExist(falseFields[i] + "" + falseIndex)){
                        hwpDocCtrl.global.HwpCtrl.MoveToField(falseFields[i] + "" + falseIndex, true, true, false);
                        hwpDocCtrl.putFieldText(falseFields[i] + "" + falseIndex, arr[j][arrKey[i]]);
                        falseIndex++;
                    }
                }else{
                    if(hwpDocCtrl.global.HwpCtrl.FieldExist(trueFields[i] + "" + j)){
                        hwpDocCtrl.global.HwpCtrl.MoveToField(trueFields[i] + "" + j, true, true, false);
                        hwpDocCtrl.putFieldText(trueFields[i] + "" + j, arr[j][arrKey[i]]);
                    }
                }
            }
            trueIndex = 0;
            falseIndex = 0;
        }

        hwpDocCtrl.global.HwpCtrl.MoveToField('doc_content', true, true, false);
    },

    /**
     * @param field = 문자열 구할 필드 이름
     * @returns {*}
     */
    getFieldText : function(field) {
        var fieldText = "";

        if(hwpDocCtrl.global.HwpCtrl.FieldExist(field)){
            fieldText = hwpDocCtrl.global.HwpCtrl.GetFieldText(field);
        }

        return fieldText;
    },

    /**
     * 백슬러시 입력 함수
     *
     * @param field = 필드 이름 ( String Array OR String ) ex) ["approval", "approver", "cooperate", "cooperation"]
     */
    setCrookedSlash : function(field){
        if(Array.isArray(field)){
            for(var i = 0; i < field.length; i++){
                if(hwpDocCtrl.global.HwpCtrl.FieldExist(field[i])){
                    hwpDocCtrl.global.HwpCtrl.MoveToField(field[i], true, true, false);

                    var vAct = hwpDocCtrl.global.HwpCtrl.CreateAction("CellBorder");
                    var vSet = vAct.CreateSet();
                    vAct.GetDefault(vSet);

                    vSet.SetItem("DiagonalType", 1);
                    vSet.SetItem("BackSlashFlag", 0x02);
                    vSet.SetItem("CrookedSlashFlag2", 2);

                    vAct.Execute(vSet);
                }
            }
        }

        hwpDocCtrl.global.HwpCtrl.MoveToField('doc_content', true, true, false);
    },

    /**
     * fileName = 저장시 파일 이름
     * format {
     *      "HWP"			한글 native format
     *      "HWP30"		    한글 3.X/96/97
     *      "HTML"			인터넷 문서
     *      "TEXT"			아스키 텍스트 문서
     *      "UNICODE"		유니코드 텍스트 문서
     *      "HWP20"		    한글 2.0
     *      "HWP21"		    한글 2.1/2.5
     *      "HWP15"		    한글 1.X
     *      "HWPML2X"		HWPML 2.X 문서 (Open / SaveAs 가능)
     *      "RTF"			서식있는 텍스트 문서
     *      "DBF"			DBASE II/III 문서
     *      "HUNMIN"		훈민정음 3.0/2000
     *      "MSWORD"		마이크로소프트 워드 문서
     *      "HANA"		    하나워드 문서
     *      "ARIRANG"		아리랑 문서
     *      "ICHITARO" 		一太郞 문서 (일본 워드프로세서)
     *      "WPS"			WPS 문서
     *      "DOCIMG"		인터넷 프레젠테이션 문서(SaveAs만 가능)
     *      “SWF"			Macromedia Flash 문서(SaveAs만 가능)
     *      “PUBDOCBODY"    공문서(xml)
     * }
     * @param fileName
     * @param format
     * @param arg
     */
    saveAs : function(fileName, format) {
        hwpDocCtrl.global.HwpCtrl.SaveAs(fileName, format, "download:true");
    },

    saveFile : function(filename, format, callback) {
        hwpDocCtrl.global.HwpCtrl.SaveDocument(filename, format, callback);
    },

    printDocument : function() {
        hwpDocCtrl.global.HwpCtrl.PrintDocument();
    },

    clear : function() {
        hwpDocCtrl.global.HwpCtrl.Clear(1);
    },

    editMode : function(option) {
        hwpDocCtrl.global.HwpCtrl.EditMode = option;
    },

    setTextFile : function(data, format, option, callback) {
        hwpDocCtrl.global.HwpCtrl.SetTextFile(data, format, option, callback);
    },

    insert : function(url, format, callback) {
        return hwpDocCtrl.global.HwpCtrl.Insert(url, format, "", callback, "");
    },

    openDocument : function(url, format, callback) {
        return hwpDocCtrl.global.HwpCtrl.OpenDocument(url, format, callback);
    },

    insertDocument : function(url, callback) {
        return hwpDocCtrl.global.HwpCtrl.InsertDocument(url, callback);
    },

    insertBackgroundPicture : function(bordertype, path, embedded, filloption, watermark, effect, brightnss, contrast) {
        return hwpDocCtrl.global.HwpCtrl.InsertBackgroundPicture(bordertype, path, embedded, filloption, watermark, effect, brightnss, contrast);
    },

    insertPicture : function(field, path, callback) {
        hwpDocCtrl.global.HwpCtrl.MoveToField(field, true, false, false);
        hwpDocCtrl.global.HwpCtrl.InsertPicture(path, true, 1, false, false, 0, 13, 7, callback);
    },

    getFieldList : function(number, option) {
        return hwpDocCtrl.global.HwpCtrl.GetFieldList(number, option).split(splitChar);
    },

    fieldExist : function(field) {
        return hwpDocCtrl.global.HwpCtrl.FieldExist(field);
    },

    appendFieldText : function(field, text) {
        var iText = hwpDocCtrl.global.HwpCtrl.GetFieldText(field) + text;
        hwpDocCtrl.global.HwpCtrl.PutFieldText(field, iText);
    },

    prependFieldText : function(field, text) {
        var iText = text + hwpDocCtrl.global.HwpCtrl.GetFieldText(field);
        hwpDocCtrl.global.HwpCtrl.PutFieldText(field, iText);
    },

    appendFieldText : function(pFieldName, pFieldText, pAppendSart, pHwpFormat, pDeleteContent, callback) {
        if (pDeleteContent)
            SetFieldText(pFieldName, "")

        if (hwpDocCtrl.global.HwpCtrl.MoveToField(pFieldName, true, pAppendSart)) {
            if (typeof (callback) == "undefined") {
                if (pHwpFormat)
                    hwpDocCtrl.global.HwpCtrl.SetTextFile(pFieldText, "HTML", "insertfile");
                else
                    hwpDocCtrl.global.HwpCtrl.SetTextFile(pFieldText, "UNICODE", "insertfile");
            }
            else {
                if (pHwpFormat)
                    hwpDocCtrl.global.HwpCtrl.SetTextFile(pFieldText, "HTML", "insertfile", function (data) { callback(data) });
                else
                    hwpDocCtrl.global.HwpCtrl.SetTextFile(pFieldText, "UNICODE", "insertfile", function (data) { callback(data) },);
            }
        }
    },

    setFieldText : function(pFieldName, pFieldText, pFontSize, pBold, pColor, pUnderline, pItalic) {
        if (pFieldText != "") {
            hwpDocCtrl.global.HwpCtrl.PutFieldText(pFieldName, pFieldText);

            if (hwpDocCtrl.global.HwpCtrl.MoveToField(pFieldName)) {
                hwpDocCtrl.global.HwpCtrl.Run("SelectAll");
                var HwpSet = hwpDocCtrl.global.HwpCtrl.CharShape;

                if (pBold)
                    HwpSet.SetItem("Bold", true);

                if (pColor != -1)
                    HwpSet.SetItem("TextColor", pColor);

                if (pFontSize != -1)
                    HwpSet.SetItem("Height", pFontSize * 100);

                if (pUnderline != -1) {
                    HwpSet.SetItem("UnderlineType", pUnderline)

                    if (pColor != -1){
                        HwpSet.SetItem("UnderlineColor", pColor);
                    }
                }

                if (pItalic) {
                    HwpSet.SetItem("Italic", true);
                }

                hwpDocCtrl.global.HwpCtrl.CharShape = HwpSet;

                hwpDocCtrl.global.HwpCtrl.MoveToField(pFieldName);
            }
        } else {
            if (hwpDocCtrl.global.HwpCtrl.MoveToField(pFieldName))
                hwpDocCtrl.global.HwpCtrl.PutFieldText(pFieldName, String.fromCharCode(2));
        }
    },

    moveToField : function(field) { //선택한 필드로 캐럿 이동
        hwpDocCtrl.global.HwpCtrl.MoveToField(field, true, true, false);
    },

    moveToFieldEx : function(field) { //선택한 필드로 캐럿, 화면 이동
        hwpDocCtrl.global.HwpCtrl.MoveToFieldEx(field, true, true, false);
    },

    scrollPosInfo : function(HorzPos, VertPos) { //스크롤바 위치
        var ScrollPosSet;
        ScrollPosSet = hwpDocCtrl.global.HwpCtrl.ScrollPosInfo;
        ScrollPosSet.SetItem("HorzPos", HorzPos);
        ScrollPosSet.SetItem("VertPos", VertPos);
        hwpDocCtrl.global.HwpCtrl.ScrollPosInfo = ScrollPosSet;
    },

    setToolBar : function(option, ToolBarID) { //툴바 설정
        hwpDocCtrl.global.HwpCtrl.SetToolBar(option, ToolBarID);
    },

    showToolBar : function(option) { //툴바 표시
        hwpDocCtrl.global.HwpCtrl.ShowToolBar(option);
    },

    showRibbon : function(option) { //리본 표시
        hwpDocCtrl.global.HwpCtrl.ShowRibbon(option);
    },

    //필드내용을 복사하기위해 내용을 TEXT로 받아온다.(필드명이 없을경우 문서전체의 내용을 받아온다)
    getCloneData : function(pFieldName, pDataType, callback) {
        var FieldInfo;
        if (pFieldName != "") {
            hwpDocCtrl.global.HwpCtrl.MoveToField(pFieldName);
            FieldInfo = GetCurrentFieldInfo(0, false);
            var array = FieldInfo.split(';')
            if (array.length > 1 && array[1] == "2") {
                hwpDocCtrl.global.HwpCtrl.MoveToField(pFieldName, true, true, true);
                hwpDocCtrl.global.HwpCtrl.GetTextFile(pDataType, "saveblock", callback);
            }else {
                var act;
                act = hwpDocCtrl.global.HwpCtrl.CreateAction("SelectAll");
                act.Run();
                hwpDocCtrl.global.HwpCtrl.GetTextFile(pDataType, "saveblock", callback);
            }
        }
    },

    getCurrentFieldInfo : function(pFieldOption, pXmlFormat) {
        var FieldName;
        var FieldType;
        var FieldAccess;
        var FieldState;

        FieldName = hwpDocCtrl.global.HwpCtrl.GetCurFieldName(pFieldOption);
        FieldState = hwpDocCtrl.global.HwpCtrl.CurFieldState;

        if (FieldState != "" && (FieldState & 16)> 0) {
            if ((FieldState & 15) == 1) {
                FieldType = "1";  //셀
            } else {
                FieldType = "2";  //누름틀
            }
            FieldAccess = hwpDocCtrl.global.HwpCtrl.ModifyFieldProperties(FieldName, 0, 0);
            FieldAccess = FieldAccess & 1;
        }

        if (pXmlFormat) {
            return "<DATA><NAME>" + MakeXMLString(FieldName) + "</NAME><TYPE>" + FieldType + "</TYPE><ACCESS>" & FieldAccess & "</ACCESS></DATA>";
        } else {
            return FieldName + ";" + FieldType + ";" + FieldAccess;
        }
    },

    getDocumentInfo : function(pXmlFormat) {
        var rtnVal;
        var HwpAct;
        var HwpSet;
        HwpAct = hwpDocCtrl.global.HwpCtrl.CreateAction("DocSummaryInfo");
        HwpSet = hwpDocCtrl.global.HwpCtrl.CreateSet("SummaryInfo");

        HwpAct.GetDefault(HwpSet);

        if (typeof (pXmlFormat) == "undefined") {
            pXmlFormat = true;
        }

        if (pXmlFormat) {
            rtnVal = "<DATA><TITLE>" + HwpSet.Item("Title") + "</TITLE>" +
                "<SUBJECT>" + HwpSet.Item("Subject") + "</SUBJECT>" +
                "<AUTHOR>" + HwpSet.Item("Author") + "</AUTHOR>" +
                "<DATE>" + HwpSet.Item("Date") + "</DATE>" +
                "<KEYWORD>" + HwpSet.Item("KeyWords")+ "</KEYWORD>" +
                "<COMMENT>" + HwpSet.Item("Comments") + "</COMMENT>" +
                "<CHARACTERS>" + HwpSet.Item("Characters") + "</CHARACTERS>" +
                "<WORDS>" + HwpSet.Item("Words") + "</WORDS>" +
                "<LINES>" + HwpSet.Item("Lines") + "</LINES>" +
                "<PARAGRAPHS>" + HwpSet.Item("Paragraphs") + "</PARAGRAPHS>" +
                "<PAGES>" + HwpSet.Item("Pages") + "</PAGES></DATA>";
        }else {
            rtnVal = HwpSet.Item("Title") + "_kaoni_seperator_" +
                HwpSet.Item("Subject") + "_kaoni_seperator_" +
                HwpSet.Item("Author") + "_kaoni_seperator_" +
                HwpSet.Item("Date") + "_kaoni_seperator_" +
                HwpSet.Item("KeyWords") + "_kaoni_seperator_" +
                HwpSet.Item("Comments") + "_kaoni_seperator_" +
                HwpSet.Item("Characters") + "_kaoni_seperator_" +
                HwpSet.Item("Words") + "_kaoni_seperator_" +
                HwpSet.Item("Lines") + "_kaoni_seperator_" +
                HwpSet.Item("Paragraphs") + "_kaoni_seperator_" +
                HwpSet.Item("Pages") + "_kaoni_seperator_";
        }
        return rtnVal;
    },

    setDocumentInfo : function(pTitle, pSubject, pAuthor, pKeyword, pComment) {
        var HwpAct;
        var HwpSet;
        HwpAct = hwpDocCtrl.global.HwpCtrl.CreateAction("DocSummaryInfo");
        HwpSet = hwpDocCtrl.global.HwpCtrl.CreateSet("SummaryInfo");

        HwpAct.GetDefault(HwpSet);

        if (pTitle != "NULL"){
            HwpSet.SetItem("Title", pTitle);
        }

        if (pSubject != "NULL"){
            HwpSet.SetItem("Subject", pSubject);
        }

        if (pAuthor != "NULL"){
            HwpSet.SetItem("Author", pAuthor);
        }

        if (pKeyword != "NULL"){
            HwpSet.SetItem("KeyWords", pKeyword);
        }

        if (pComment != "NULL"){
            HwpSet.SetItem("Comments", pComment);
        }
        HwpAct.Execute(HwpSet);

    },

    setCloneData : function(pCloneData, pFieldName, pDataType) {
        var rtnval = false;
        try {
            if (pFieldName != "") {
                hwpDocCtrl.global.HwpCtrl.MoveToField(pFieldName)
                hwpDocCtrl.global.HwpCtrl.PutFieldText(pFieldName, String.fromCharCode(2));

                if (hwpDocCtrl.global.HwpCtrl.SetTextFile(pCloneData, pDataType, "insertfile")) {
                    rtnval = true;
                }

            } else {
                if (hwpDocCtrl.global.HwpCtrl.SetTextFile(pCloneData, pDataType, "")) {
                    rtnval = true;
                }
            }
        }catch (e) {

        }

        return rtnval;
    },

    setCloneDataCallback : function(pCloneData, pFieldName, pDataType, callback) {
        try {
            if (pFieldName != "") {
                hwpDocCtrl.global.HwpCtrl.MoveToField(pFieldName)
                hwpDocCtrl.global.HwpCtrl.PutFieldText(pFieldName, String.fromCharCode(2));

                hwpDocCtrl.global.HwpCtrl.SetTextFile(pCloneData, pDataType, "insertfile", callback)

            } else {
                hwpDocCtrl.global.HwpCtrl.SetTextFile(pCloneData, pDataType, "", callback)
            }
        }
        catch (e) {

        }
    },

    //필드에 백그라운드 이미지를 넣거나 삭제하는 함수
    setFieldBackImage : function(pFieldName, pImagePath, pFillOption) {
        var rtnVal = false;

        if (typeof (pFillOption) == "undefined")
            pFillOption = 5;

        if (hwpDocCtrl.global.HwpCtrl.MoveToField(pFieldName)) {
            if (pImagePath != "")
                hwpDocCtrl.global.HwpCtrl.InsertBackgroundPicture("SelectedCell", pImagePath, true, pFillOption, false, false, false, false);
            else
                hwpDocCtrl.global.HwpCtrl.InsertBackgroundPicture("SelectedCellDelete", pImagePath, false, false, false, false, false, false);

            rtnVal = true;
        }

        return rtnVal;
    },

    //필드에 이미지를 추가하는 함수
    setFieldImage : function(pFieldName, pImagePath, pSizeType, pWidth, pHeight) {
        var embeded = true;
        var reverse = false;
        var watermark = false;
        var effect = 0; //0:실제이미지그대로, 1:그레이스케일, 2:흑백효과
        //pSizeType 0:원래크기, 1: width,height크기로, 2: width는 셀 width만큼 height는 셀height만큼, 3: 현제셀크기에 맞춰
        hwpDocCtrl.global.HwpCtrl.MoveToField("img_logo");
        if (hwpDocCtrl.global.HwpCtrl.MoveToField(pFieldName)) {
            if (pWidth == 0){
                hwpDocCtrl.global.HwpCtrl.InsertPicture(pImagePath, embeded, pSizeType, reverse, watermark, effect, 0);
            }else{
                hwpDocCtrl.global.HwpCtrl.InsertPicture(pImagePath, embeded, pSizeType, reverse, watermark, effect, pWidth, pHeight);
            }
        }
    },

    clearDocument : function() {
        hwpDocCtrl.global.HwpCtrl.Clear(1); //문서 내용을 버린다
    },

    makeXMLString : function(pOrgString) {
        if (typeof (pOrgString) == "undefined" || pOrgString == undefined) {
            return "";
        }

        return hwpDocCtrl.replaceText(hwpDocCtrl.replaceText(hwpDocCtrl.replaceText(pOrgString, "&", "&amp;"), "<", "&lt;"), ">", "&gt;");
    },

    replaceText : function(orgStr, findStr, replaceStr) {
        var re = new RegExp(findStr, "gi");
        return (orgStr.replace(re, replaceStr));
    },

    saveDocument : function(fileName, fileType, callback) {
        hwpDocCtrl.global.HwpCtrl.SaveDocument(fileName, fileType, callback);
    },

    /**
     * [View의 상태 정보]
     * 조판 부호, 화면 확대 비율과 같은 view에 관련된 정보를 나타낸다.
     * ParameterSet의 형식은 ParameterSet/ViewProperties 참조.
     * 	 - zoomType : 화면 확대 종류(0 - 사용자정의, 1 - 쪽맞춤, 2 - 폭맞춤, 3 - 여러쪽)
     * 	 - zoomRatio : 화면 확대 비율(10 ~ 500 (단위 %)) - 화면 확대 종류가 "사용자 정의"인 경우만 사용가능
     */
     setViewProperties : function(zoomType, zoomRatio) {
        var vp = hwpDocCtrl.global.HwpCtrl.CreateSet("ViewProperties");
        vp.SetItem("ZoomType", zoomType);		//	화면 확대 종류
        vp.SetItem("ZoomRatio", zoomRatio);		// 	화면 확대 비율
        hwpDocCtrl.global.HwpCtrl.ViewProperties = vp;
    }
}