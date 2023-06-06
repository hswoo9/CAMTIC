/**
 * 2023.06.06
 * 작성자 : 김지혜
 * 내용 : 자산관리 > 도서관리 - 도서리스트 - 도서 분류관리 팝업 창
 */

var bookManagePop = {
    fn_defaultScript: function () {

        $("#division1").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "선택하세요", value: "" },
                { text: "대분류", value: "대분류" },
                { text: "발전협의회", value: "발전협의회" },
                { text: "CAMTIC", value: "CAMTIC" }
            ],
            index: 0
        });

        $("#division2").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "선택하세요", value: "" },
                { text: "중분류", value: "중분류" }
            ],
            index: 0
        });

        $("#division3").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "선택하세요", value: "" },
                { text: "소분류", value: "소분류" }
            ],
            index: 0
        });

        $("#addDivision").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "선택하세요", value: "" },
                { text: "대분류", value: "대분류" },
                { text: "중분류", value: "중분류" },
                { text: "소분류", value: "소분류" }
            ],
            index: 0
        });

        $("#addDivisionVal").kendoTextBox();

    }
}


