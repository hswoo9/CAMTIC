var holidayInit = {

    subHolidayInit: function(subHolidayId, type){
        $("#reqContentId").val(subHolidayId);

        const result = customKendo.fn_customAjax("/subHoliday/getVacUseHistoryOne", {
            subholidayUseId : subHolidayId
        });
        const ResultData = result.data;

        hwpDocCtrl.putFieldText("deptName", ResultData.DEPT_NAME2);

        hwpDocCtrl.putFieldText("empName", ResultData.EMP_NAME_KR);

        hwpDocCtrl.putFieldText("toDate", fn_getNowDate(1));

        if(ResultData.SUBHOLIDAY_CODE_ID != "11") {

            hwpDocCtrl.putFieldText("positionName", ResultData.DUTY_NAME == "" ? ResultData.POSITION_NAME : ResultData.DUTY_NAME);

            hwpDocCtrl.putFieldText("holidayDate", ResultData.SUBHOLIDAY_ST_DT+" "+ResultData.SUBHOLIDAY_ST_TIME+" "+ResultData.SUBHOLIDAY_EN_DT+" "+ResultData.SUBHOLIDAY_EN_TIME);

            hwpDocCtrl.putFieldText("approvalReason", ResultData.RMK.replaceAll("\n", "\r\n"));

            hwpDocCtrl.putFieldText("rmkOther", ResultData.RMK_OTHER.replaceAll("\n", "\r\n"));

            const explanationDT = ResultData.SUBHOLIDAY_USE_DAY;
            const explantion = "아래와 같은 사유로 ("+explanationDT+")일 휴가코자 합니다.";
            hwpDocCtrl.putFieldText("explanation", explantion);

            const regSign = "위 원 인 : "+ResultData.EMP_NAME_KR;
            hwpDocCtrl.putFieldText("regSign", regSign);


            console.log("ResultData", ResultData);
            let otherEmp = " ";
            let ohterSign = "";
            if(ResultData.OHTER_EMP != null && ResultData.OHTER_EMP != ""){
                otherEmp = ResultData.OHTER_EMP;
                ohterSign = "업무인수자 : "+otherEmp;
            }
            hwpDocCtrl.putFieldText("OHTER_EMP_SIGN", ohterSign);

            let holiTextBox = '';
            let holiTextBox2 = '';

            if (ResultData.SUBHOLIDAY_CODE_ID == "1") {
                holiTextBox = "■연가□오전반차□오후반차□경조휴가";
                holiTextBox2 = "□병가□공가□대체휴가□근속포상휴가";
            } else if (ResultData.SUBHOLIDAY_CODE_ID == "3") {
                holiTextBox = "□연가■오전반차□오후반차□경조휴가";
                holiTextBox2 = "□병가□공가□대체휴가□근속포상휴가";
            } else if (ResultData.SUBHOLIDAY_CODE_ID == "4") {
                holiTextBox = "□연가□오전반차■오후반차□경조휴가";
                holiTextBox2 = "□병가□공가□대체휴가□근속포상휴가";
            } else if (ResultData.SUBHOLIDAY_CODE_ID == "5") {
                holiTextBox = "□연가□오전반차□오후반차□경조휴가";
                holiTextBox2 = "■병가□공가□대체휴가□근속포상휴가";
            } else if (ResultData.SUBHOLIDAY_CODE_ID == "6") {
                holiTextBox = "□연가□오전반차□오후반차□경조휴가";
                holiTextBox2 = "□병가■공가□대체휴가□근속포상휴가";
            } else if (ResultData.SUBHOLIDAY_CODE_ID == "7") {
                holiTextBox = "□연가□오전반차□오후반차■경조휴가";
                holiTextBox2 = "□병가□공가□대체휴가□근속포상휴가";
            } else if (ResultData.SUBHOLIDAY_CODE_ID == "8") {
                holiTextBox = "□연가□오전반차□오후반차■출산휴가";
                holiTextBox2 = "□병가□공가□대체휴가□근속포상휴가";
            } else if (ResultData.SUBHOLIDAY_CODE_ID == "9") {
                holiTextBox = "□연가□오전반차□오후반차□경조휴가";
                holiTextBox2 = "□병가□공가■대체휴가□근속포상휴가";
            } else if (ResultData.SUBHOLIDAY_CODE_ID == "10") {
                holiTextBox = "□연가□오전반차□오후반차□경조휴가";
                holiTextBox2 = "□병가□공가□대체휴가■근속포상휴가";
            }
            hwpDocCtrl.putFieldText("HOLI_TEXT_BOX", holiTextBox);
            hwpDocCtrl.putFieldText("HOLI_TEXT_BOX2", holiTextBox2);
        }

        if(ResultData.SUBHOLIDAY_CODE_ID != "11") {
            /** 2. 업무인수자 열람자 세팅 */
            draft.global.readersArr = [];
            $("#readerName").val();

            var readerEmpNameStr = "";

            const otherMap = ResultData;
            console.log("otherMap", otherMap);

            var len = otherMap.OTHER_EMP_SEQ.toString().split(",").length;

            if(otherMap.OTHER_EMP_SEQ == "" || otherMap.OTHER_EMP_SEQ == null){
                return;
            }

            for(var i = 0 ; i < len ; i++){
                var empSeq = otherMap.OTHER_EMP_SEQ.toString().split(",")[i];

                if(empSeq == $("#empSeq").val()){
                    continue;
                }

                const userResult = getUser(empSeq);
                if(userResult != null){
                    var tmpData = {
                        empSeq : $("#empSeq").val(),
                        seqType: "u",
                        readerEmpSeq: userResult.EMP_SEQ.toString(),
                        readerEmpName: userResult.EMP_NAME_KR,
                        readerDeptSeq: userResult.DEPT_SEQ,
                        readerDeptName: userResult.DEPT_NAME,
                        readerDutyCode: userResult.DUTY_CODE,
                        readerDutyName: userResult.DUTY_NAME,
                        readerPositionCode: userResult.POSITION_CODE,
                        readerPositionName: userResult.POSITION_NAME,
                        docId : ""
                    };
                    readerEmpNameStr += "," + tmpData.readerEmpName + "(" + fn_getSpot(tmpData.readerDutyName, tmpData.readerPositionName) + ")";
                    draft.global.readersArr.push(tmpData);
                }
            }

            $("#readerName").val(readerEmpNameStr.substring(1));
        }
    },

    holidayWorkInit : function(subHolidayId){
        var result = customKendo.fn_customAjax("/subHoliday/getHolidayWorkHistOne", {holidayWorkMasterSn : subHolidayId});
        const ResultData = result.list[0];
        const list = result.list;

        hwpDocCtrl.putFieldText("deptName", ResultData.DEPT_NAME2);

        hwpDocCtrl.putFieldText("empName", ResultData.EMP_NAME_KR);

        hwpDocCtrl.putFieldText("toDate", fn_getNowDate(1));

        hwpDocCtrl.putFieldText("rmk", ResultData.RMK.replaceAll("\n", "\r\n"));

        /** 초기화 */
        for(let i=0; i<list.length; i++){
            hwpDocCtrl.putFieldText("subHolidayWorkDay"+i, " ");
            hwpDocCtrl.putFieldText("subHolidayTime"+i, " ");
            hwpDocCtrl.putFieldText("subHolidayAlternativeDay"+i, " ");
        }

        for(let i=0; i<list.length; i++){
            const map = list[i];

            const subHolidayWorkDay = map.SUBHOLIDAY_WORK_DAY.split("-");
            const subHolidayWorkDayText = subHolidayWorkDay[0]+"년"+subHolidayWorkDay[1]+"월"+subHolidayWorkDay[2]+"일";
            hwpDocCtrl.putFieldText("subHolidayWorkDay"+i, subHolidayWorkDayText);

            const startTime = map.SUBHOLIDAY_ST_TIME;
            const endTime = map.SUBHOLIDAY_EN_TIME;
            hwpDocCtrl.putFieldText("subHolidayTime"+i, startTime+" ~ "+endTime);

            const subHolidayAlternativeDay = map.SUBHOLIDAY_ALTERNATIVE_DAY.split("-");
            const subHolidayAlternativeDayText = subHolidayAlternativeDay[0]+"년"+subHolidayAlternativeDay[1]+"월"+subHolidayAlternativeDay[2]+"일";
            hwpDocCtrl.putFieldText("subHolidayAlternativeDay"+i, subHolidayAlternativeDayText);
        }
    }
}