var eduReq = {
    init: function(){
        eduReq.dataSet();
    },

    dataSet: function(){
        $("#eduFormType").kendoRadioGroup({
            items: [
                { label : "교육기관 참가교육", value : "1" },
                { label : "온라인 학습", value : "2" },
                { label : "세미나/포럼/학술대회", value : "3" },
                { label : "박람회/기술대전 참관", value : "4" },
                { label : "도서학습", value : "5" },
                { label : "논문/학술지 독서", value : "6" },
                { label : "국내/외 논문 저술", value : "7" },
                { label : "직무관련 저술", value : "8" },
                { label : "국내외 현장견학", value : "9" },
                { label : "자격증 취득", value : "10" },
                { label : "금요토론", value : "11" }
            ],
            layout : "horizontal",
            labelPosition : "after",
            value : "1"
        });
    },

    eduReqPop: function(){
        let year = $("#toDate").val().substring(0, 4);
        let empSeq = $("#regEmpSeq").val();
        let data = {
            targetYear : year,
            empSeq : empSeq
        }
        /** 목표기술서 주업무 등록 체크 */
        let checkMainUrl = "/campus/getTargetCategoryList";
        data.dutyClass = 1;
        const mainResult = customKendo.fn_customAjax(checkMainUrl, data).list;

        /** 목표기술서 연계업무 등록 체크 */
        let checkSubUrl = "/campus/getTargetCategoryList";
        data.dutyClass = 2;
        const subResult = customKendo.fn_customAjax(checkSubUrl, data).list;

        if(mainResult.length == 0 && subResult.length == 0){
            alert("목표기술서 작성 후 학습신청이 가능합니다.");
            return;
        }


        const eduFromType = $("#eduFormType").data("kendoRadioGroup").value();
        if(eduFromType == "") {
            alert("학습종류를 선택하기시 바랍니다.");
            return;
        }

        let url = "/Campus/pop/eduReqPop.do?eduFormType="+eduFromType;
        const name = "eduReqPop";
        const option = "width = 1170, height = 1000, top = 100, left = 200, location = no";
        window.open(url, name, option);
    }
}
