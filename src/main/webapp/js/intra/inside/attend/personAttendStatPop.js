/**
 * 2023.06.04
 * 작성자 : 김지혜
 * 내용 : 근태관리 - 근태조정 팝업페이지
 */
var now = new Date();
var personAttendStatPop = {
    fn_defaultScript: function () {

        $("#time").kendoTextBox();
        $("#user").kendoTextBox();

        $("#attendanceItems").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "전체", value: "" },
                {text: "정상 출근", value: "정상 출근"},
                {text: "지각", value: "지각"},
                {text: "연가", value: "연가"},
                {text: "오전 반차", value: "오전 반차"},
                {text: "오후 반차", value: "오후 반차"},
                {text: "병가", value: "병가"},
                {text: "공가", value: "공가"},
                {text: "경조 휴가", value: "경조 휴가"},
                {text: "선택 근로", value: "선택 근로"},
                {text: "출장", value: "출장"},
                {text: "대체 휴가", value: "대체 휴가"}
            ],
            index: 0
        });

        $("#work_time").kendoTimePicker({
            culture : "ko-KR",
            format : "HH:mm",
            interval : 10,
            value : "09:00"
        });

        $("#leave_time").kendoTimePicker({
            culture : "ko-KR",
            format : "HH:mm",
            interval : 10,
            value : "18:00"
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
