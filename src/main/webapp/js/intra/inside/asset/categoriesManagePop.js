/**
 * 2023.06.06
 * 작성자 : 김지혜
 * 내용 : 자산관리 > 분류관리 > 카테고리관리 - 카테고리 관리 추가 팝업페이지
 */
var now = new Date();
var categoriesManagePop = {
    fn_defaultScript: function () {
        $("#ctg1").kendoTextBox();
        $("#ctg2").kendoTextBox();
        $("#ctg3").kendoTextBox();

        $("#belongCode1").kendoTextBox();
        $("#belongCode2").kendoTextBox();
        $("#belongCode3").kendoTextBox();

        $("#rate").kendoTextBox();

        $("#amortization").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "선택", value: ""},
                {text: "정액법", value: "정액법"},
                {text: "정률법", value: "정률법"},
                {text: "연부금", value: "연부금"}
            ],
            index: 0
        });

        $("#year").kendoTextBox();

    }
}

