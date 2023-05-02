/**
 * 2023.05.02
 * 작성자 : 김은진
 * 내용 : 인사관리 - 직원조회목록
 */

var appointmentUser = {
    fn_defaultScript: function () {

        $("#deptComp").kendoDropDownList({
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

        $("#deptTeam").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "제조혁신팀", value: "제조혁신팀"},
                {text: "신기술융합팀", value: "신기술융합팀"},
                {text: "우주개발팀", value: "우주개발팀"},
                {text: "항공개발팀", value: "항공개발팀"},
                {text: "사업지원팀", value: "사업지원팀"},
                {text: "인재개발팀", value: "인재개발팀"},
                {text: "일자리창업팀", value: "일자리창업팀"},
                {text: "복합소재뿌리기술센터", value: "복합소재뿌리기술센터"},
                {text: "지역산업육성팀", value: "지역산업육성팀"},
                {text: "경영지원팀", value: "경영지원팀"},
                {text: "미래전략기획팀", value: "미래전략기획팀"},
                {text: "J-밸리혁신팀", value: "J-밸리혁신팀"},
                {text: "전북조선업도약센터", value: "전북조선업도약센터"},
                {text: "익산고용안정일자리센터", value: "익산고용안정일자리센터"},
                {text: "협의회기업육성팀", value: "협의회기업육성팀"},
                {text: "협의회일자리창업팀", value: "협의회일자리창업팀"},
                {text: "협의회소공인특화지원센터", value: "협의회소공인특화지원센터"},
                {text: "협의회완주군로컬잡센터", value: "협의회완주군로컬잡센터"}
            ],
            index: 0
        });

        $("#userGender").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "남", value: "남"},
                {text: "여", value: "여"}
            ],
            index: 0
        });

        $("#userKind").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "성명", value: "성명"},
                {text: "직급", value: "직급"},
                {text: "등급", value: "등급"},
                {text: "직책", value: "직책"},
                {text: "메일주소", value: "메일주소"},
                {text: "전화번호", value: "전화번호"},
                {text: "핸드폰", value: "핸드폰"}
            ],
            index: 0
        });

        $("#detailSearch").kendoDropDownTree({
            placeholder: "세부검색",
            checkboxes: true,
            checkAll: true,
            autoClose: false,
            dataSource: [
                {text: "정규직원", expanded: true},
                {text: "계약직원", expanded: true},
                {text: "인턴사원", expanded: true},
                {text: "경비/환경", expanded: true},
                {text: "단기직원", expanded: true},
                {text: "위촉직원", expanded: true},
                {text: "연수생/학생연구원", expanded: true},
                {text: "기타", expanded: true},
                {text: "임시직원", expanded: true},
                {text: "퇴사직원", expanded: true}
            ]
        });

        $("#kindContent").kendoTextBox();

    }
}
