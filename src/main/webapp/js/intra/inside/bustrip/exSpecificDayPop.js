/**
 * 2023.06.05
 * 작성자 : 김지혜
 * 내용 : 차량/회의실관리 - 회의실 사용 신청 팝업 > 회의실 사용 특정일 제외 팝업페이지
 */
var now = new Date();
var exSpecificDayPop = {
    fn_defaultScript: function () {
        $("#saveRoute").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "달력 화면", value: "달력 화면"},
                {text: "등록 화면", value: "등록 화면"}
            ],
            index: 0
        });

        $("#use_date").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date(now.setMonth(now.getMonth()))
        });

    }
}

