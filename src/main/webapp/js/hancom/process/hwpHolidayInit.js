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

            hwpDocCtrl.putFieldText("approvalReason", ResultData.RMK);

            hwpDocCtrl.putFieldText("rmkOther", ResultData.RMK_OTHER);

            const explanationDT = ResultData.SUBHOLIDAY_USE_DAY;
            const explantion = "아래와 같은 사유로 ("+explanationDT+")일 휴가코자 합니다.";
            hwpDocCtrl.putFieldText("explanation", explantion);

            const regSign = "위 원 인 : "+ResultData.EMP_NAME_KR;
            hwpDocCtrl.putFieldText("regSign", regSign);


            if(ResultData.OHTER_EMP != null && ResultData.OHTER_EMP != ""){
                let ohterSign = "업무인수자 : "+ResultData.OHTER_EMP;
                hwpDocCtrl.putFieldText("OHTER_EMP_SIGN", ohterSign);
            }

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
            } else if (ResultData.SUBHOLIDAY_CODE_ID == "9") {
                holiTextBox = "□연가□오전반차□오후반차□경조휴가";
                holiTextBox2 = "□병가□공가■대체휴가□근속포상휴가";
            } else if (ResultData.SUBHOLIDAY_CODE_ID == "10") {
                holiTextBox = "□연가□오전반차□오후반차□경조휴가";
                holiTextBox2 = "□병가□공가□대체휴가■근속포상휴가";
            }
            hwpDocCtrl.putFieldText("HOLI_TEXT_BOX", holiTextBox);
            hwpDocCtrl.putFieldText("HOLI_TEXT_BOX2", holiTextBox2);
        }else {
            hwpDocCtrl.putFieldText("rmk", ResultData.RMK);

            const subHolidayWorkDay = ResultData.SUBHOLIDAY_WORK_DAY.split("-");
            const subHolidayWorkDayText = subHolidayWorkDay[0]+"년"+subHolidayWorkDay[1]+"월"+subHolidayWorkDay[2]+"일";
            hwpDocCtrl.putFieldText("subHolidayWorkDay", subHolidayWorkDayText);

            const startTime = ResultData.SUBHOLIDAY_ST_TIME;
            const endTime = ResultData.SUBHOLIDAY_EN_TIME;
            hwpDocCtrl.putFieldText("subHolidayTime", startTime+" ~ "+endTime);

            const subHolidayAlternativeDay = ResultData.SUBHOLIDAY_ALTERNATIVE_DAY.split("-");
            const subHolidayAlternativeDayText = subHolidayAlternativeDay[0]+"년"+subHolidayAlternativeDay[1]+"월"+subHolidayAlternativeDay[2]+"일";
            hwpDocCtrl.putFieldText("subHolidayAlternativeDay", subHolidayAlternativeDayText);
        }
    }
}