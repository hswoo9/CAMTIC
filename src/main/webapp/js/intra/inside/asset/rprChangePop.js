/**
 * 2023.06.06
 * 작성자 : 김지혜
 * 내용 : 자산관리 > 지식재산권 리스트 - 일괄 변경(지식재산권 일괄변경)
 */

var rprChangePop = {
    fn_defaultScript: function () {

        $("#status").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "선택하세요", value: "" },
                { text: "등록", value: "등록" },
                { text: "출원", value: "출원" },
                { text: "거절", value: "거절" },
                { text: "소멸", value: "소멸" }
            ],
            index: 0
        });

        $("#maintainYN").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "선택하세요", value: "" },
                { text: "유지", value: "유지" },
                { text: "소멸예정", value: "소멸예정" },
                { text: "소멸", value: "소멸" },
                { text: "유지여부 확인요망", value: "유지여부 확인요망" }
            ],
            index: 0
        });

        $("#tcnTransfer").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "선택하세요", value: "" },
                { text: "해당없음", value: "해당없음" },
                { text: "이전완료", value: "이전완료" },
                { text: "이전가능", value: "이전가능" }
            ],
            index: 0
        });

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


