var now = new Date();

var eduReq = {

    init : function(){
        eduReq.dataSet();
        eduReq.mainGrid();
    },

    dataSet() {
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

    mainGrid : function() {
    },

    eduReqPop : function() {
        const eduFromType = $("#eduFormType").data("kendoRadioGroup").value();
        if(eduFromType == "") {
            alert("학습종류를 선택하기시 바랍니다.");
            return;
        }

        var url = "/Campus/pop/eduReqPop.do?eduFormType="+eduFromType;
        var name = "eduReqPop";
        var option = "width = 1170, height = 1000, top = 100, left = 200, location = no";
        var popup = window.open(url, name, option);
    }
}
