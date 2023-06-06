/**
 * 2023.05.02
 * 작성자 : 김은진
 * 내용 : 인사관리 - 직원조회목록
 */
var now = new Date();

var userPersonList = {
    init : function () {
        userPersonList.dataSet();
        userPersonList.mainGrid();
    },

    dataSet() {
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
                {text: "전북 조선업 도약센터", value: "전북 조선업 도약센터"},
                {text: "익산고용안정일자리센터", value: "익산고용안정일자리센터"}
            ],
            index: 0
        });

        $("#userGender").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "전체", value: "0"},
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

        $("#start_date").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date(now.setMonth(now.getMonth() - 1))
        });

        $("#end_date").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date()
        });

        $("#drop1").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "입사현황", value: "" },
                { text: "퇴사현황", value: "1" },
                { text: "입/퇴사현황", value: "2" }
            ],
            index: 0
        });

        $("#start_date_detail").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date(now.setMonth(now.getMonth() - 1))
        });

        $("#end_date_detail").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date()
        });

        $("#detailSearch2").kendoDropDownTree({
            placeholder: "선택하세요",
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
                {text: "연수생/학생연구원", expanded: true}
            ]
        });

        $("#detailSearch3").kendoDropDownTree({
            placeholder: "선택하세요",
            checkboxes: true,
            checkAll: true,
            autoClose: false,
            dataSource: [
                {text: "남", expanded: true},
                {text: "여", expanded: true}
            ]
        });

        $("#detailSearch4").kendoDropDownTree({
            placeholder: "선택하세요",
            checkboxes: true,
            checkAll: true,
            autoClose: false,
            dataSource: [
                {text: "미래전략기획본부", value: "미래전략기획본부"},
                {text: "R&BD사업본부", value: "R&BD사업본부"},
                {text: "기업성장지원본부", value: "기업성장지원본부"},
                {text: "우주항공사업부", value: "우주항공사업부"},
                {text: "드론사업부", value: "드론사업부"},
                {text: "스마트제조사업부", value: "스마트제조사업부"},
                {text: "경영지원실", value: "경영지원실"}
            ]
        });

        $("#detailSearch5").kendoDropDownTree({
            placeholder: "선택하세요",
            checkboxes: true,
            checkAll: true,
            autoClose: false,
            dataSource: [
                {text: "제조혁신팀", value: "제조혁신팀", expanded: true},
                {text: "신기술융합팀", value: "신기술융합팀", expanded: true},
                {text: "우주개발팀", value: "우주개발팀", expanded: true},
                {text: "항공개발팀", value: "항공개발팀", expanded: true},
                {text: "사업지원팀", value: "사업지원팀", expanded: true},
                {text: "인재개발팀", value: "인재개발팀", expanded: true},
                {text: "일자리창업팀", value: "일자리창업팀", expanded: true},
                {text: "복합소재뿌리기술센터", value: "복합소재뿌리기술센터", expanded: true},
                {text: "지역산업육성팀", value: "지역산업육성팀", expanded: true},
                {text: "경영지원팀", value: "경영지원팀", expanded: true},
                {text: "미래전략기획팀", value: "미래전략기획팀", expanded: true},
                {text: "J-밸리혁신팀", value: "J-밸리혁신팀", expanded: true},
                {text: "전북 조선업 도약센터", value: "전북 조선업 도약센터", expanded: true},
                {text: "익산고용안정일자리센터", value: "익산고용안정일자리센터", expanded: true}
            ]
        });

        $("#detailSearch6").kendoDropDownTree({
            placeholder: "선택하세요",
            checkboxes: true,
            checkAll: true,
            autoClose: false,
            dataSource: [
                {text: "원장", expanded: true},
                {text: "본부장", expanded: true},
                {text: "사업부장", expanded: true},
                {text: "팀장", expanded: true},
                {text: "책임매니저", expanded: true},
                {text: "책임연구원", expanded: true},
                {text: "책임행정원", expanded: true},
                {text: "주임매니저", expanded: true},
                {text: "주임연구원", expanded: true},
                {text: "주임행정원", expanded: true},
                {text: "선임매니저", expanded: true},
                {text: "선임연구원", expanded: true}
            ]
        });

        $("#detailSearch7").kendoDropDownTree({
            placeholder: "선택하세요",
            checkboxes: true,
            checkAll: true,
            autoClose: false,
            dataSource: [
                {text: "15세~25세", expanded: true},
                {text: "26세~30세", expanded: true},
                {text: "31세~35세", expanded: true},
                {text: "36세~40세", expanded: true},
                {text: "41세~45세", expanded: true},
                {text: "46세~50세", expanded: true},
                {text: "51세~55세", expanded: true},
                {text: "56세~60세", expanded: true},
                {text: "61세~", expanded: true}
            ]
        });

        $("#detailSearch8").kendoDropDownTree({
            placeholder: "선택하세요",
            checkboxes: true,
            checkAll: true,
            autoClose: false,
            dataSource: [
                {text: "1년 미만", expanded: true},
                {text: "1년", expanded: true},
                {text: "2년", expanded: true},
                {text: "3년", expanded: true},
                {text: "4년", expanded: true},
                {text: "5년", expanded: true},
                {text: "6년", expanded: true},
                {text: "7년", expanded: true},
                {text: "8년", expanded: true},
                {text: "9년", expanded: true},
                {text: "10년", expanded: true},
                {text: "11년", expanded: true},
                {text: "12년", expanded: true},
                {text: "13년", expanded: true},
                {text: "14년", expanded: true},
                {text: "15년", expanded: true},
                {text: "16년", expanded: true},
                {text: "17년", expanded: true},
                {text: "18년", expanded: true},
                {text: "19년", expanded: true},
                {text: "20년", expanded: true},
                {text: "21년 이상", expanded: true}
            ]
        });

        $("#detailSearch9").kendoDropDownTree({
            placeholder: "선택하세요",
            checkboxes: true,
            checkAll: true,
            autoClose: false,
            dataSource: [
                {text: "고졸", expanded: true},
                {text: "전문학사", expanded: true},
                {text: "학사", expanded: true},
                {text: "석사수료", expanded: true},
                {text: "석사", expanded: true},
                {text: "박사수료", expanded: true},
                {text: "박사", expanded: true}
            ]
        });
    },

    mainGrid : function() {
        var dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data, operation) {
                    return data;
                }
            },
            schema : {
                data: function (data) {
                    return data;
                },
                total: function (data) {
                    return data.length;
                },
            },
            pageSize: 10,
        });

        $("#mainGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 489,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 30, 50, 100 ],
                buttonCount : 5
            },
            toolbar : [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="userPersonList.userReqPop();">' +
                            '	<span class="k-button-text">직원 추가</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="">' +
                            '	<span class="k-button-text">SMS 발송</span>' +
                            '</button>';
                    }
                }, {
                    name: 'excel',
                    text: '엑셀다운로드'
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" class="k-checkbox checkbox"/>',
                    template : "<input type='checkbox' id='' name='' value='' class='k-checkbox checkbox'/>",
                    width: 50
                }, {
                    field: "",
                    title: "번호"
                }, {
                    field: "",
                    title: "성명"
                }, {
                    field: "",
                    title: "부서(실)"
                }, {
                    field: "",
                    title: "부서(팀)"
                }, {
                    field: "",
                    title: "직위"
                }, {
                    field: "",
                    title: "전화번호"
                }, {
                    field: "",
                    title: "핸드폰"
                }, {
                    field: "",
                    title: "입사일"
                }
            ]
        }).data("kendoGrid");

        $("#mainGrid2").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 489,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 30, 50, 100 ],
                buttonCount : 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    field: "",
                    title: "번호"
                }, {
                    field: "",
                    title: "성명"
                }, {
                    field: "",
                    title: "부서(실)"
                }, {
                    field: "",
                    title: "부서(팀)"
                }, {
                    field: "",
                    title: "직위"
                }, {
                    field: "",
                    title: "성별"
                }, {
                    field: "",
                    title: "유형"
                }, {
                    field: "",
                    title: "나이"
                }, {
                    field: "",
                    title: "근속년수"
                }, {
                    field: "",
                    title: "재직여부"
                }, {
                    field: "",
                    title: "입사일"
                }, {
                    field: "",
                    title: "퇴사일"
                }
            ]
        }).data("kendoGrid");
    },

    userReqPop : function() {
        var url = "/Inside/pop/userReqPop.do";
        var name = "recruitReqPop";
        var option = "width=1200, height=900, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    }
}
