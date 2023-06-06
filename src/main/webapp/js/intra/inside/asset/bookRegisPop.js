/**
 * 2023.06.06
 * 작성자 : 김지혜
 * 내용 : 자산관리 > 도서관리 - 도서리스트 - 도서등록 팝업창
 */

var now = new Date();
var bookRegisPop = {
    fn_defaultScript: function () {
        $("#use_date").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date(now.setMonth(now.getMonth()))
        });

        $("#division1").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "대분류를 선택하세요.", value: ""},
                {text: "CAMTIC", value: "CAMTIC"}
            ],
            index: 0
        });

        $("#division2").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "중분류를 선택하세요", value: ""},
                {text: "가정/생활", value: "가정/생활"},
                {text: "경제/경영", value: "경제/경영"},
                {text: "공학", value: "공학"},
                {text: "교양", value: "교양"},
                {text: "기술공학", value: "기술공학"}
            ],
            index: 0
        });

        $("#division3").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "소분류를 선택하세요", value: ""}
            ],
            index: 0
        });

        $("#author").kendoTextBox();
        $("#publisher").kendoTextBox();
        $("#pay").kendoTextBox();
        $("#num").kendoTextBox();

        $("#user1").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "사용자 선택", value: ""},
                {text: "관리자", value: "1"},
                {text: "국민", value: "2"}
            ],
            index: 0
        });

        $("#user2").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "사용자 선택", value: ""},
                {text: "관리자", value: "1"},
                {text: "국민", value: "2"}
            ],
            index: 0
        });

        $("#dept").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "구매부서 선택", value: ""},
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

        $("#space").kendoTextBox();

        $("#manager1").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "사용자 선택", value: ""},
                {text: "관리자", value: "1"},
                {text: "국민", value: "2"}
            ],
            index: 0
        });

        $("#manager2").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "사용자 선택", value: ""},
                {text: "관리자", value: "1"},
                {text: "국민", value: "2"}
            ],
            index: 0
        });

        $("#name").kendoTextBox();
        $("#UseReason").kendoTextBox();

    }
}



