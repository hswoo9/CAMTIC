/**
 * 2023.06.06
 * 작성자 : 김지혜
 * 내용 : 자산관리 > 지식재산권 리스트 - 직무발명 신고
 */

var jobInvenReportPop = {
    fn_defaultScript: function () {

        $("#author").kendoTextBox();

        $("#type").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "선택하세요", value: "" },
                { text: "특허", value: "특허" },
                { text: "실용신안", value: "실용신안" },
                { text: "상표권", value: "상표권" },
                { text: "논문", value: "논문" },
                { text: "도서", value: "도서" },
                { text: "디자인권", value: "디자인권" },
                { text: "저작권", value: "저작권" }
            ],
            index: 0
        });

        $("#name").kendoTextBox();
        $("#document").kendoTextBox();
        $("#regDate").kendoTextBox();

        $("#conft").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "선택하세요", value: "" },
                { text: "공개", value: "공개" },
                { text: "대외비", value: "대외비" }
            ],
            index: 0
        });

    }
}


