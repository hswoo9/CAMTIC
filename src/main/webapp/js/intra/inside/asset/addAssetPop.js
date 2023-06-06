/**
 * 2023.06.06
 * 작성자 : 김지혜
 * 내용 : 자산관리 > 자산리스트 - 자산 추가
 */
var now = new Date();
var addAssetPop = {
    fn_defaultScript: function () {

        $("#select1").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "선택", value: "" },
                { text: "CAMTIC", value: "CAMTIC" },
                { text: "드론산업", value: "드론산업" },
                { text: "벤처단지", value: "벤처단지" }
            ],
            index: 0
        });

        $("#select2").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "선택", value: "" },
                { text: "자산", value: "자산" },
                { text: "소모품", value: "소모품" },
                { text: "부대품", value: "부대품" }
            ],
            index: 0
        });

        $("#select3").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "선택", value: "" },
                { text: "대분류", value: "대분류" },
                { text: "차량운반구", value: "차량운반구" },
                { text: "장비", value: "장비" },
                { text: "비품", value: "비품" },
                { text: "공구", value: "공구" }
            ],
            index: 0
        });

        $("#select4").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "선택", value: "" },
                { text: "중분류", value: "중분류" },
                { text: "자동차", value: "자동차" },
                { text: "자전거", value: "자전거" },
                { text: "카트", value: "카트" },
                { text: "지게차", value: "지게차" }
            ],
            index: 0
        });

        $("#select5").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "선택", value: "" },
                { text: "소분류", value: "소분류" },
                { text: "자동차", value: "자동차" },
            ],
            index: 0
        });

        $("#addAssetStatus").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                { text: "활용", value: "1" },
                { text: "불용·불용", value: "2" },
                { text: "불용·요정", value: "3" },
                { text: "불용·유휴", value: "4" },
                { text: "불용·부족", value: "5" },
                { text: "처분·폐기", value: "6" }
            ],
            index: 0
        });

        $("#assetName").kendoTextBox();
        $("#staffSlect").kendoTextBox();
        $("#purchasePrice").kendoTextBox();
        $("#standard").kendoTextBox();
        $("#name").kendoTextBox();
        $("#purchaseCompany").kendoTextBox();
        $("#company").kendoTextBox();
        $("#nation").kendoTextBox();
        $("#num").kendoTextBox();

        $("#unit").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "선택", value: "" },
                { text: "EA", value: "EA" },
                { text: "Copy", value: "Copy" },
                { text: "Set", value: "Set" },
                { text: "입력", value: "입력" }
            ],
            index: 0
        });

        $("#regisType").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "선택", value: "" },
                { text: "개별등록", value: "개별등록" },
                { text: "일괄등록", value: "일괄등록" },
            ],
            index: 0
        });

        $("#barcodeType").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "선택", value: "" },
                { text: "대", value: "대" },
                { text: "소", value: "소" },
            ],
            index: 0
        });

        $("#source").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "선택하세요", value: "" },
                { text: "법인운영", value: "법인운영" },
                { text: "연구개발", value: "연구개발" },
                { text: "교육사업", value: "교육사업" },
                { text: "개발사업", value: "개발사업" },
                { text: "기능보강", value: "기능보강" },
                { text: "지원사업", value: "지원사업" },
                { text: "기타사업", value: "기타사업" }
            ],
            index: 0
        });

        $("#business").kendoTextBox();

        $("#installPlace").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "선택하세요", value: "" },
                { text: "설치장소", value: "설치장소" },
                { text: "11B-대한드론축구협회", value: "11B-대한드론축구협회" },
                { text: "1B-1F-101", value: "1B-1F-101" },
                { text: "1B-1F-102", value: "1B-1F-102" },
                { text: "1B-1F-공용", value: "1B-1F-공용" }
            ],
            index: 0
        });

        $("#user").kendoTextBox();
        $("#usage").kendoTextBox();
        $("#remark").kendoTextBox();

    },

    rdTaskPopup : function() {
        var url = "/Inside/Pop/rdTaskPop.do";
        var name = "rdTaskPop";
        var option = "width = 500, height = 200, top = 100, left = 200, location = no, _blank"
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


