/**
 * 2023.06.05
 * 작성자 : 김지혜
 * 내용 : 차량/회의실관리 - 회의실 정보 팝업페이지
 */
var now = new Date();
var meetingRoomManagePop = {
    fn_defaultScript: function () {

        $("#useYN").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "선택하세요", value: ""},
                {text: "사용", value: "사용"},
                {text: "미사용", value: "미사용"}
            ],
            index: 0
        });

        $("#meetingRoomName").kendoTextBox();
        $("#space").kendoTextBox();
        $("#Num").kendoTextBox();

        $("#coronationYN").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "해당없음", value: ""},
                {text: "가능", value: "가능"},
                {text: "불가능", value: "불가능"}
            ],
            index: 0
        });

        $("#rentalFee").kendoTextBox();

        $("#significant").kendoTextBox();

    }
}


