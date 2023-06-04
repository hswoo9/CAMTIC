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
                {text: "제작", value: "제작"},
                {text: "가공", value: "가공"},
                {text: "사업", value: "사업"},
                {text: "기타", value: "기타"}
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


        $("#remark").kendoTextBox();

    },
    docOrderPopup : function(){
        var url = "/Inside/pop/docOrderPop.do";
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
