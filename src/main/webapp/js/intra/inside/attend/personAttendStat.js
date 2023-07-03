/**
 * 2023.06.04
 * 작성자 : 김지혜
 * 내용 : 근태관리 - 직원근태내역
 */

var personAttendStat = {
    global : {
        now: new Date()
    },

    fn_defaultScript: function () {

        customKendo.fn_datePicker("startDay", '', "yyyy-MM-dd", new Date(personAttendStat.global.now.setMonth(personAttendStat.global.now.getMonth() - 1)));
        customKendo.fn_datePicker("endDay", '', "yyyy-MM-dd", new Date());
        $("#startDay, #endDay").attr("readonly", true);

        $("#dept").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "전체", value: "" },
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

        $("#team").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "전체", value: "" },
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

        $("#situation").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "전체", value: "" },
                {text: "승인 전", value: "승인 전"},
                {text: "결재 종결", value: "결재 종결"},
                {text: "결재 상신", value: "결재 상신"},
                {text: "승인", value: "승인"}
            ],
            index: 0
        });

        $("#attendanceItems").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "전체", value: "" },
                {text: "정상 출근", value: "정상 출근"},
                {text: "지각", value: "지각"},
                {text: "연가", value: "연가"},
                {text: "오전 반차", value: "오전 반차"},
                {text: "오후 반차", value: "오후 반차"},
                {text: "병가", value: "병가"},
                {text: "공가", value: "공가"},
                {text: "경조 휴가", value: "경조 휴가"},
                {text: "출산 휴가", value: "출산 휴가"},
                {text: "선택 근로", value: "선택 근로"},
                {text: "출장", value: "출장"},
                {text: "대체 휴가", value: "대체 휴가"},
                {text: "휴일 근로", value: "휴일 근로"}
            ],
            index: 0
        });

        $("#name").kendoTextBox();

        $("#staffDivision").kendoDropDownTree({
            placeholder: "세부검색",
            checkboxes: true,
            checkAll: true,
            autoClose: false,
            dataSource: [
                {text: "전담직원", expanded: true},
                {text: "단기직원", expanded: true},
                {text: "위촉직원", expanded: true},
                {text: "연수생/학생연구원", expanded: true},
                {text: "경비/환경", expanded: true}
            ]
        });
    },
    mainGrid: function () {
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
            height: 489,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 30, 50, 100 ],
                buttonCount : 5
            },
            toolbar: [
                {
                    name : 'button',
                    template : function (e) {
                        return "<button type=\"button\" class=\"k-grid-save-changes k-button k-button-md k-button-solid k-button-solid-base\" onclick='personAttendStat.personAttendStatPopup()'>" +
                            '	<span>근태조정</span>' +
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
                    template : "<input type='checkbox' id='ehiPk#=DOCUMENT_ID#' name='ehiPk' value='#=DOCUMENT_ID#' class='k-checkbox checkbox'/>",
                    width: 50
                }, {
                    field: "",
                    title: "일자",
                    width: "7.5%"
                }, {
                    field: "",
                    title: "부서",
                    width: "7.5%"
                }, {
                    field: "",
                    title: "팀",
                    width: "7.5%"
                }, {
                    field: "",
                    title: "직위",
                    width: "7.5%"
                }, {
                    field: "",
                    title: "성명",
                    width: "7.5%"
                }, {
                    field: "",
                    title: "출근 시간",
                    width: "7.5%"
                }, {
                    field: "",
                    title: "출근 등록 방식",
                    width: "7.5%"
                }, {
                    field: "",
                    title: "퇴근 시간",
                    width: "7.5%"
                }, {
                    field: "",
                    title: "퇴근 등록 방식",
                    width: "7.5%"
                }, {
                    field: "",
                    title: "근태 항목",
                    width: "7.5%"
                }, {
                    field: "",
                    title: "상태",
                    width: "7.5%"
                }, {
                    field: "",
                    title: "신청 내역",
                    width: "7.5%"
                }, {
                    field: "",
                    title: "변경 사유",
                    width: "10%"
                }]
        }).data("kendoGrid");
    },

    personAttendStatPopup : function(){
        var url = "/Inside/Pop/personAttendStatPop.do";
        var name = "popup test";
        var option = "width = 550, height = 360, top = 100, left = 200, location = no"
        var popup = window.open(url, name, option);
    }
}

