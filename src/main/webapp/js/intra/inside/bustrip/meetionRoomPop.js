/**
 * 2023.06.05
 * 작성자 : 김지혜
 * 내용 : 차량/회의실관리 - 회의실사용신청 팝업페이지
 */
var now = new Date();
var meetingRoomPop = {
    fn_defaultScript: function () {
        $("#use_date").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date(now.setMonth(now.getMonth()))
        });

        $("#use_time").kendoTimePicker({
            culture : "ko-KR",
            format : "HH:mm",
            interval : 10,
            value : "09:00"
        });

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
