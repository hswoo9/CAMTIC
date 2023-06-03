/**
 * 2023.06.03
 * 작성자 : 김지혜
 * 내용 : 문서관리 - 문서 등록대장 팝업페이지
 */
var now = new Date();
var inComePop = {
    fn_defaultScript: function () {

        $("#deptPart").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "전직원", value: "전직원"},
                {text: "경영지원실", value: "경영지원실"},
                {text: "R&BD사업본부", value: "R&BD사업본부"},
                {text: "기업성장지원본부", value: "기업성장지원본부"},
                {text: "사업부", value: "사업부"},
                {text: "협의회", value: "협의회"}
            ],
            index: 0
        });

        $("#title").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "문서번호", value: "문서번호"},
                {text: "시행일자", value: "시행일자"},
                {text: "수신처", value: "수신처"},
                {text: "발송일자", value: "발송일자"},
                {text: "담당자", value: "담당자"},
                {text: "비고", value: "비고"}
            ],
            index: 0
        });


        $("#kindContent").kendoTextBox();

    },
    inComePopup : function(){
        var url = "/Inside/pop/inComePop.do?";
        var name = "popup test";
        var option = "width = 1000, height = 380, top = 100, left = 200, location = no"
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
