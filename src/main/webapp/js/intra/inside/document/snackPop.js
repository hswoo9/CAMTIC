/**
 * 2023.06.03
 * 작성자 : 김지혜
 * 내용 : 문서관리 - 야근/휴일 식대 대장 팝업페이지
 */
var now = new Date();
var snackPop = {
    fn_defaultScript: function () {

        $("#mealsDivision").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "야간 간식", value: "야간 간식"},
                {text: "휴일 식대", value: "휴일 식대"},
                {text: "평일 식대", value: "평일 식대"}
            ],
            index: 0
        });

        $("#payDivision").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "개인", value: "개인"},
                {text: "법인", value: "법인"},
                {text: "외상", value: "외상"}
            ],
            index: 0
        });

        $("#UseReason").kendoTextBox();

    },
    snackPopup : function(){
        var url = "/Inside/pop/docuPop.do";
        var name = "popup test";
        var option = "width = 1000, height = 360, top = 100, left = 200, location = no"
        var popup = window.open(url, name, option);
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
