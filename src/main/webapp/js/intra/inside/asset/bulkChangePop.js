/**
 * 2023.06.06
 * 작성자 : 김지혜
 * 내용 : 자산관리 > 자산리스트 - 일괄 변경(자산목록 일괄변경)
 */

var bulkChangePop = {
    fn_defaultScript: function () {

        $("#assetName").kendoTextBox();
        $("#user").kendoTextBox();
        $("#purchasePrice").kendoTextBox();

        $("#status").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "선택하세요", value: "" },
                { text: "활용", value: "1" },
                { text: "불용·불용", value: "2" },
                { text: "불용·요정", value: "3" },
                { text: "불용·유휴", value: "4" },
                { text: "불용·부족", value: "5" },
                { text: "처분·폐기", value: "6" }
            ],
            index: 0
        });

        $("#reason").kendoTextBox();

    }
}


