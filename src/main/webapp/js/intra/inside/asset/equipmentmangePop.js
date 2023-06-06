/**
 * 2023.06.06
 * 작성자 : 김지혜
 * 내용 : 자산관리 > 장비관리 - 장비관리 (관리자) 팝업창
 */
var now = new Date();
var equipmentmangePop = {
    fn_defaultScript: function () {

        $("#division").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "선택하세요", value: "" },
                {text: "복합소재", value: "복합소재"},
                {text: "드론산업", value: "드론산업"},
                {text: "메이커스페이스", value: "메이커스페이스"}
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

        $("#name").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "선택하세요", value: "" },
                {text: "고속가공기(6호기)", value: "고속가공기(6호기)"},
                {text: "와이어컷방전가공기", value: "와이어컷방전가공기"},
                {text: "MCT12.5호기", value: "MCT12.5호기"},
                {text: "CNC방전가공기", value: "CNC방전가공기"},
                {text: "M슈퍼드릴", value: "슈퍼드릴"}
            ],
            index: 0
        });

        $("#companyDivision").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "선택하세요", value: "" },
                {text: "도내(단지)", value: "도내(단지)"},
                {text: "도내(단지 외)", value: "도내(단지 외)"},
                {text: "도외", value: "도외"}
            ],
            index: 0
        });

        $("#user").kendoTextBox();
        $("#document").kendoTextBox();
        $("#useTime").kendoTextBox();
        $("#usePay").kendoTextBox();
        $("#company").kendoTextBox();

        $("#write_date").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date(now.setMonth(now.getMonth()))
        });

    }
}

