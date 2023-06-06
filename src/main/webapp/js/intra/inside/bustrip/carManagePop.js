/**
 * 2023.06.06
 * 작성자 : 김지혜
 * 내용 : 차량/회의실관리 - 차량관리 팝업페이지
 */
var now = new Date();
var carManagePop = {
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

        $("#carType").kendoTextBox();
        $("#carNum").kendoTextBox();

        $("#dept").kendoDropDownTree({
            placeholder: "부서 선택",
            checkboxes: true,
            checkAll: true,
            autoClose: false,
            dataSource: [
                {text: "부서 선택", value: ""},
                {text: "미래전략기획본부", value: "미래전략기획본부"},
                {text: "R&BD사업본부", value: "R&BD사업본부"},
                {text: "기업성장지원본부", value: "기업성장지원본부"},
                {text: "우주항공사업부", value: "우주항공사업부"},
                {text: "드론사업부", value: "드론사업부"},
                {text: "스마트제조사업부", value: "스마트제조사업부"},
                {text: "경영지원실", value: "경영지원실"}
            ],
            index: 0
        });

        $("#significant").kendoTextBox();

    }
}

