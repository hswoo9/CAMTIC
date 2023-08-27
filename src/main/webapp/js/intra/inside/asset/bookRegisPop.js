/**
 * 2023.06.06
 * 작성자 : 김지혜
 * 내용 : 자산관리 > 도서관리 - 도서리스트 - 도서등록 팝업창
 */

var now = new Date();
var bookRegisPop = {
    fn_defaultScript: function () {
        $("#bkBuyDt").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date()
        });

        $("#bkLgCd").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "CAMTIC", value: "0"}
            ],
            index: 0,
        });

        $("#bkMdCd").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "중분류를 선택하세요", value: ""}
            ],
            index: 0
        });

        $("#bkCd").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "소분류를 선택하세요", value: ""}
            ],
            index: 0
        });

        bookRegisPop.fn_changeBkLgCd();
        customKendo.fn_textBox(["bkName", "bkWriter", "bkPubl", "bkCost", "bkCnt", "bkRepl", "bkSmry"]);

        var rsEmpList = customKendo.fn_customAjax("/user/getEmpList");
        var result = rsEmpList.list;

        result.unshift({EMP_NAME_KR: "구매자", EMP_SEQ: ""})
        $("#bkBuyer").kendoDropDownList({
            dataTextField: "EMP_NAME_KR",
            dataValueField: "EMP_SEQ",
            dataSource: result,
            index: 0
        });

        result.shift({EMP_NAME_KR: "구매자", EMP_SEQ: ""})
        result.unshift({EMP_NAME_KR: "사용자", EMP_SEQ: ""})
        $("#bkUser").kendoDropDownList({
            dataTextField: "EMP_NAME_KR",
            dataValueField: "EMP_SEQ",
            dataSource: result,
            index: 0
        });

        $("#bkDept").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "구매부서 선택", value: ""},
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

        result.shift({EMP_NAME_KR: "구매자", EMP_SEQ: ""})
        result.unshift({EMP_NAME_KR: "사용자 선택", EMP_SEQ: ""})
        $("#bkMng").kendoDropDownList({
            dataTextField: "EMP_NAME_KR",
            dataValueField: "EMP_SEQ",
            dataSource: result,
            index: 0
        });

        $("#bkMngSub").kendoDropDownList({
            dataTextField: "EMP_NAME_KR",
            dataValueField: "EMP_SEQ",
            dataSource: result,
            index: 0
        });

        $("#bkCost, #bkCnt").bind("keyup keydown", function() {
            bookRegisPop.inputNumberFormat(this)
        })
    },

    inputNumberFormat: function (obj){
        obj.value = bookRegisPop.fn_comma(obj.value);
    },

    fn_comma: function(str){
        return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",").replace(/(^0+)/, "");
    },

    fn_bkSave: function (){
        if($("#bkCdName").val() == "") {
            alert("도서분류를 선택하지 않았습니다");
            return;
        }
        if($("#bkName").val() == "") {
            alert("도서명이 작성되지 않았습니다");
            return;
        }
        if($("#bkWriter").val() == "") {
            alert("저자가 작성되지 않았습니다");
            return;
        }
        if($("#bkPubl").val() == "") {
            alert("출판사가 작성되지 않았습니다");
            return;
        }
        if($("#bkCost").val() == "") {
            alert("구매가가 작성되지 않았습니다");
            return;
        }
        if($("#bkCnt").val() == "") {
            alert("구매수량이 작성되지 않았습니다");
            return;
        }
        if($("#bkBuyer").val() == "" || $("#bkUser").val() == "") {
            alert("구매자/사용자가 선택되지 않았습니다");
            return;
        }
        if($("#bkDeptSeq").val() == "") {
            alert("구매부서가 선택되지 않았습니다");
            return;
        }
        if($("#bkRepl").val() == "") {
            alert("비치장소가 작성되지 않았습니다");
            return;
        }
        if($("#bkMngSeq").val() == "") {
            alert("관리자(정)이 선택되지 않았습니다");
            return;
        }
        if($("#bkMngSubSeq").val() == "") {
            alert("관리자(부)가 선택되지 않았습니다");
            return;
        }

        let data = {
            bkLgCd : $("#bkLgCd").val(),
            bkLgCdName : $("#bkLgCd").data("kendoDropDownList").text(),
            bkMdCd : $("#bkMdCd").val(),
            bkMdCdName : $("#bkMdCd").data("kendoDropDownList").text(),
            bkCd : $("#bkCd").val(),
            bkCdName : $("#bkCd").data("kendoDropDownList").text(),
            bkName : $("#bkName").val(),
            bkWriter : $("#bkWriter").val(),
            bkPubl : $("#bkPubl").val(),
            bkCost : $("#bkCost").val().replace(/,/g, ''),
            bkCnt : $("#bkCnt").val().replace(/,/g, ''),
            bkBuyDt : $("#bkBuyDt").val(),
            bkBuyer : $("#bkBuyer").val(),
            bkBuyerName : $("#bkBuyer").data("kendoDropDownList").text(),
            bkUser : $("#bkUser").val(),
            bkUserName : $("#bkUser").data("kendoDropDownList").text(),
            bkDeptSeq : $("#bkDept").val(),
            bkDeptName : $("#bkDept").data("kendoDropDownList").text(),
            bkRepl : $("#bkRepl").val(),
            bkMngSeq : $("#bkMng").val(),
            bkMngName : $("#bkMng").data("kendoDropDownList").text(),
            bkMngSubSeq : $("#bkMngSub").val(),
            bkMngSubName : $("#bkMngSub").data("kendoDropDownList").text(),
            bkSmry : $("#bkSmry").val()
        }

        $.ajax({
            url : "/inside/setBookInsert",
            data : data,
            type : "post",
            dataType : "json",
            async : false,
            success : function(result){
                console.log(result);
                alert("저장이 완료되었습니다.");
                opener.gridReload();
                window.close();

            },
            error : function() {
                alert("데이터 저장 중 에러가 발생했습니다.");
                //window.close();
            }
        });
        console.log(data);
    },

    fn_close : function (){
        window.close();
    },

    fn_changeBkLgCd: function (){
        var dataSource = [
            {text: "중분류를 선택하세요", value: ""},
            {text: "사전", value: "1"},
            {text: "철학", value: "2"},
            {text: "예술", value: "3"},
            {text: "종교", value: "4"},
            {text: "역사학", value: "5"},
            {text: "문학", value: "6"},
            {text: "소설", value: "7"},
            {text: "사회과학", value: "8"},
            {text: "경제/경영", value: "9"},
            {text: "순수과학", value: "10"},
            {text: "기술과학", value: "11"},
            {text: "교양", value: "12"},
            {text: "실용/취미", value: "13"},
            {text: "어학", value: "14"},
            {text: "잡지", value: "15"},
            {text: "컴퓨터", value: "16"},
            {text: "공학", value: "17"}
        ];
        var bkMdCd = $("#bkMdCd").data("kendoDropDownList");
        bkMdCd.setDataSource(dataSource);
        bkMdCd.bind("change", function(){
            var value = $("#bkMdCd").val();
            bookRegisPop.fn_changeBkMdCd(value);
        });
    },

    fn_changeBkMdCd : function (e){
        var bkCd = $("#bkCd").data("kendoDropDownList");
        var dataSource = [];
        switch(e) {
            case "1" :
                dataSource = [
                    {text: "사전", value: "1"},
                    {text: "백과/국어/한자사전", value: "2"},
                    {text: "어학사전", value: "3"},
                    {text: "전문분야사전", value: "4"}
                ];
                break;
            case "2":
                dataSource = [
                    {text: "철학", value: "1"},
                    {text: "동양철학", value: "2"},
                    {text: "서양철학", value: "3"},
                    {text: "심리학", value: "4"},
                ]
                break;
            case "3":
                dataSource = [
                    {text: "예술", value: "1"},
                    {text: "예술이론", value: "2"},
                    {text: "악보", value: "3"},
                    {text: "서예/공예", value: "4"},
                    {text: "회화/조각", value: "5"},
                    {text: "화집,도록", value: "6"},
                    {text: "패션/디자인", value: "7"},
                    {text: "사진", value: "8"},
                    {text: "건축디자인", value: "9"},
                    {text: "대중음악", value: "10"},
                    {text: "공연팜플렛", value: "11"}
                ]
                break;
            case "4":
                dataSource = [
                    {text: "종교", value: "1"},
                    {text: "기독교", value: "2"},
                    {text: "불교", value: "3"},
                    {text: "천주교", value: "4"}
                ]
                break;
            case "5":
                dataSource = [
                    {text: "역사학", value: "1"},
                    {text: "역사일반", value: "2"},
                    {text: "한국사", value: "3"},
                    {text: "동양사", value: "4"},
                    {text: "서양사", value: "5"},
                    {text: "문화인류학/민속학", value: "6"}
                ]
                break;
            case "6":
                dataSource = [
                    {text: "문학", value: "1"},
                    {text: "문학이론", value: "2"},
                    {text: "수필", value: "3"},
                    {text: "시", value: "4"},
                    {text: "희곡/시나리오", value: "5"}
                ]
                break;
            case "7":
                dataSource = [
                    {text: "소설", value: "1"},
                    {text: "한국소설", value: "2"},
                    {text: "외국소설", value: "3"},
                    {text: "동양역사소설", value: "4"},
                    {text: "SF 판타지소설", value: "5"},
                    {text: "추리소설", value: "6"},
                    {text: "무협소설", value: "7"}
                ]
                break;
            case "8":
                dataSource = [
                    {text: "사회과학", value: "1"},
                    {text: "정치/외교학", value: "2"},
                    {text: "이념서", value: "3"},
                    {text: "법학/행정학", value: "4"},
                    {text: "사회학", value: "5"},
                    {text: "여성학", value: "6"},
                    {text: "교육학", value: "7"},
                    {text: "신문/방송", value: "8"},
                    {text: "사회과학", value: "9"},
                    {text: "미래학", value: "10"}
                ]
                break;
            case "9":
                dataSource = [
                    {text: "경제/경영", value: "1"},
                    {text: "경제학", value: "2"},
                    {text: "경영/무역", value: "3"},
                    {text: "통계학", value: "4"},
                    {text: "광고", value: "5"}
                ]
                break;
            case "10":
                dataSource = [
                    {text: "순수과학", value: "1"},
                    {text: "물리/화학", value: "2"},
                    {text: "생물/지구과학/생명과학", value: "3"},
                    {text: "수학/천문학", value: "4"}
                ]
                break;
            case "11":
                dataSource = [
                    {text: "기술과학", value: "1"},
                    {text: "기술과학", value: "2"},
                    {text: "건축/토목/조경", value: "3"},
                    {text: "전기/전자공학", value: "4"},
                    {text: "환경공학", value: "5"},
                    {text: "의학/간호학", value: "6"},
                    {text: "한의학", value: "7"},
                    {text: "식품/체육/농학/가정학", value: "8"}
                ]
                break;
            case "12":
                dataSource = [
                    {text: "교양", value: "1"},
                    {text: "역사", value: "2"},
                    {text: "동양고전", value: "3"},
                    {text: "시사", value: "4"},
                    {text: "경제", value: "5"},
                    {text: "경영", value: "6"},
                    {text: "취업/유망직업", value: "7"},
                    {text: "전기/자서전", value: "8"},
                    {text: "군사", value: "9"},
                    {text: "과학", value: "10"}
                ]
                break;
            case "13":
                dataSource = [
                    {text: "실용/취미", value: "1"},
                    {text: "스포츠", value: "2"},
                    {text: "건강?", value: "3"},
                    {text: "바둑/장기", value: "4"},
                    {text: "여행정보/지도", value: "5"},
                    {text: "기행문", value: "6"},
                    {text: "유학정보", value: "7"},
                    {text: "학습법 여성", value: "8"},
                    {text: "역학", value: "9"}
                ]
                break;
            case "14":
                dataSource = [
                    {text: "어학", value: "1"},
                    {text: "영어", value: "2"},
                    {text: "일본어", value: "3"},
                    {text: "중국어", value: "4"}
                ]
                break;
            case "15":
                dataSource = [
                    {text: "잡지", value: "1"},
                    {text: "문학/예술", value: "2"},
                    {text: "인문/사회과학/종교", value: "3"},
                    {text: "자연과학", value: "4"},
                    {text: "시사종합", value: "5"},
                    {text: "건강/역학", value: "6"},
                    {text: "취미/오락", value: "7"},
                    {text: "건축/디자인", value: "8"},
                    {text: "여성종합", value: "9"},
                    {text: "패션/인테리어/요리/육아", value: "10"}
                ]
                break;
            case "16":
                dataSource = [
                    {text: "컴퓨터", value: "1"},
                    {text: "입문서", value: "2"},
                    {text: "OS", value: "3"},
                    {text: "프로그래밍언어", value: "4"},
                    {text: "통신/인터넷", value: "5"},
                    {text: "워드/엑셀", value: "6"},
                    {text: "자격수험서", value: "7"}
                ]
                break;
            case "17":
                dataSource = [
                    {text: "공학", value: "1"}
                ]
                break;
            default :
                break;
        }

        dataSource.unshift({text: "소분류를 선택하세요", value: ""})
        bkCd.setDataSource(dataSource);
    }
}



