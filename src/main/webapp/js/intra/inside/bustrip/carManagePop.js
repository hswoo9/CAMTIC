/**
 * 2023.06.03
 * 작성자 : 김지혜
 * 내용 : 문서관리 - 문서 등록대장 팝업페이지
 */
var now = new Date();
var documentPop = {
    fn_defaultScript: function () {

        $("#division").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
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

        $("#remark").kendoTextBox();

    },
    documentPopup : function(){
        var url = "/Inside/pop/documentPop.do";
        var name = "popup test";
        var option = "width = 1000, height = 360, top = 100, left = 200, location = no"
        var popup = window.open(url, name, option);
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

        $("#endDay").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date()
        });

    }
}
