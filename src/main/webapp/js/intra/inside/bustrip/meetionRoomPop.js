/**
 * 2023.06.05
 * 작성자 : 김지혜
 * 내용 : 차량/회의실관리 - 회의실사용신청 팝업페이지
 */
var now = new Date();
var meetingRoomPop = {
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

        $("#start_date").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date(now.setMonth(now.getMonth()))
        });

        $("#start_time").kendoTimePicker({
            culture : "ko-KR",
            format : "HH:mm",
            interval : 10,
            value : "09:00"
        });

        $("#end_date").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date(now.setMonth(now.getMonth()))
        });

        $("#end_time").kendoTimePicker({
            culture : "ko-KR",
            format : "HH:mm",
            interval : 10,
            value : "09:00"
        });

        $("#timeReq").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "기간 등록", value: "기간 등록"},
                {text: "일별 등록", value: "일별 등록"}
            ],
            index: 0
        });

        $("#exSpecificDay").kendoDropDownTree({
            placeholder: "해당없음",
            checkboxes: true,
            checkAll: true,
            autoClose: false,
            dataSource: [
                {text: "토요일 제외", expanded: true},
                {text: "일요일 제외", expanded: true}
            ]
        });

        $("#useMeeting").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "교육1실 (본부동 3층, 30명)", value: "교육1실 (본부동 3층, 30명)"},
                {text: "교육2실 (본부동 3층, 16명)", value: "교육2실 (본부동 3층, 16명)"},
                {text: "교육4실 (본부동 3층, 25명)", value: "교육4실 (본부동 3층, 25명)"},
                {text: "세미나실1 (본부동 3층, 30명)", value: "세미나실1 (본부동 3층, 30명)"},
                {text: "세미나실2 (본부동 3층, 20명)", value: "세미나실2 (본부동 3층, 20명)"}
            ],
            index: 0
        });


        $("#usePurpose").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "기타", value: "기타"},
                {text: "교육 훈련", value: "교육 훈련"},
                {text: "일반 회의", value: "일반 회의"},
                {text: "대관", value: "대관"}
            ],
            index: 0
        });

        $("#etc").kendoTextBox();

        $("#rentalFee").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "유료", value: "유료"},
                {text: "무료", value: "무료"}
            ],
            index: 0
        });

        $("#pay").kendoTextBox();
        $("#registrant").kendoTextBox();
        $("#useManager").kendoTextBox();
        $("#UseReason").kendoTextBox();

    },

    exSpecificDayPopup : function(){
        var url = "/Inside/Pop/exSpecificDayPop.do";
        var name = "특정일 제외 팝업";
        var option = "width = 500, height = 200, top = 100, left = 200, location = no, _blank"
        var popup = window.open(url, name, option);
    }
}

