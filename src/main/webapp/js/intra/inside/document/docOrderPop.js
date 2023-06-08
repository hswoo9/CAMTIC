/**
 * 2023.06.03
 * 작성자 : 김지혜
 * 내용 : 문서관리 - 문서 등록대장 팝업페이지
 */
var now = new Date();
var docOrderPop = {
    fn_defaultScript: function () {

        $("#division").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "선택하세요", value: ""},
                {text: "제작", value: "제작"},
                {text: "가공", value: "가공"},
                {text: "사업", value: "사업"},
                {text: "기타", value: "기타"}
            ],
            index: 0
        });

        $("#contratNum").kendoTextBox();
        $("#contratName").kendoTextBox();
        $("#contractor").kendoTextBox();
        $("#contractAmount").kendoTextBox();
        $("#deliveryAmount").kendoTextBox();
        $("#payment").kendoTextBox();

        $("#remark").kendoTextBox();

    }
}

var overWk = {
    fn_defaultScript : function(){

        $("#startDay").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date(now.setMonth(now.getMonth() - 1))
        });

        $("#startDay2").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date(now.setMonth(now.getMonth()))
        });

        $("#endDay").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date()
        });

    }
}
