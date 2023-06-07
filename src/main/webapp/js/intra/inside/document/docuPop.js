/**
 * 2023.06.03
 * 작성자 : 김지혜
 * 내용 : 문서관리 - 계약대장 팝업페이지
 */
var now = new Date();
var docuPop = {
    fn_defaultScript: function () {

        $("#contAgency").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "선택하세요", value: "" },
                {text: "CAMTIC", value: "CAMTIC"},
                {text: "JVADA", value: "JVADA"}
            ],
            index: 0
        });

        $("#division").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "선택하세요", value: "" },
                {text: "제작", value: "제작"},
                {text: "가공", value: "가공"},
                {text: "구매", value: "구매"},
                {text: "공사", value: "공사"},
                {text: "전담인력", value: "전담인력"},
                {text: "시간제", value: "시간제"},
                {text: "위촉연구원", value: "위촉연구원"},
                {text: "현장연수생", value: "현장연수생"},
                {text: "입주", value: "입주"},
                {text: "장비사용", value: "장비사용"},
                {text: "용역", value: "용역"},
                {text: "기타", value: "기타"}
            ],
            index: 0
        });

        $("#contractTitle").kendoTextBox();
        $("#contractAmount").kendoTextBox();
        $("#contractor").kendoTextBox();

        $("#remark").kendoTextBox();

    }
}

var overWk = {
    fn_defaultScript : function(){

        $("#startDay").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date(now.setMonth(now.getMonth() - 1))
        });

        $("#startDay2").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date(now.setMonth(now.getMonth()))
        });

        $("#endDay").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date()
        });

    }
}
