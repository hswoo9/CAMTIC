/**
 * 2023.06.06
 * 작성자 : 김지혜
 * 내용 : 자산관리 > 도서관리 - 도서리스트 - 도서등록 팝업창
 */

var now = new Date();
var bookCdPop = {
    fn_defaultScript: function () {
        $("#bkLgCd").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "대분류를 선택하세요.", value: ""},
                {text: "CAMTIC", value: "0"}
            ],
            index: 0,
            select: function (){
                if($("#bkLgCd").val() == 0){
                    bookCdPop.fn_changeBkLgCd();
                }
            }
        });

        $("#bkLgCd").data("kendoDropDownList").bind("change", function(){
            if($("#bkLgCd").val() == ""){
                $("#bkMdCd").kendoDropDownList({
                    dataTextField: "text",
                    dataValueField: "value",
                    dataSource: [
                        {text: "중분류를 선택하세요", value: ""}
                    ],
                    index: 0
                });
            }
        })

        $("#bkMdCd").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "중분류를 선택하세요", value: ""}
            ],
            index: 0
        });

        $("#cdValue").kendoTextBox();
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
    },
}



