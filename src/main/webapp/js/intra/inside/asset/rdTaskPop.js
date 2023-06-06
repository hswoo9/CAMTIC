/**
 * 2023.06.06
 * 작성자 : 김지혜
 * 내용 : 자산관리 > 자산리스트 - 사업 선택 - 연구개발과제 선택 팝업
 */
var rdTaskPop = {
    fn_defaultScript: function () {

        $("#businessName").kendoTextBox();

        $("#taskName").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "사업선택", value: "" },
                { text: "CAMTIC", value: "CAMTIC" },
                { text: "드론산업", value: "드론산업" },
                { text: "벤처단지", value: "벤처단지" }
            ],
            index: 0
        });

        $("#assetName").kendoTextBox();

    }
    
}



