var now = new Date();

var subHolidayStat = {

    init : function(){
        subHolidayStat.dataSet();
        subHolidayStat.mainGrid();
    },

    dataSet() {
        $("#detailSearch").kendoDropDownTree({
            placeholder: "직원검색",
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

        $("#holidayYear").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date(now.setMonth(now.getMonth() - 1))
        });

        $("#dept").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "부서선택", value: "" },
                { text: "미래전략기획본부", value: "1" },
                { text: "R&BD사업본부", value: "2" },
                { text: "기업성장지원본부", value: "3" },
                { text: "우주항공사업부", value: "4" },
                { text: "드론사업부", value: "5" },
                { text: "스마트제조사업부", value: "6" },
                { text: "경영지원실", value: "7" }
            ],
            index: 0
        });

        $("#team").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "팀선택", value: "" },
                { text: "미래전략기획팀", value: "1" },
                { text: "J-밸리혁신팀", value: "2" },
                { text: "제조혁신팀", value: "3" },
                { text: "신기술융합팀", value: "4" },
                { text: "일자리창업팀", value: "5" },
                { text: "복합소재뿌리기술센터", value: "6" },
                { text: "지역산업육성팀", value: "7" },
                { text: "우주개발팀", value: "8" },
                { text: "항공개발팀", value: "9" },
                { text: "경영지원팀", value: "10" },
                { text: "사업지원팀", value: "11" }
            ],
            index: 0
        });

        $("#holidayCate").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                { text: "연가", value: "1" },
                { text: "오전반차", value: "2" },
                { text: "오후반차", value: "3" },
                { text: "병가", value: "4" },
                { text: "공가", value: "5" },
                { text: "경조휴가", value: "6" },
                { text: "출산휴가", value: "7" },
                { text: "대체휴가", value: "8" },
                { text: "근속포상휴가", value: "9" },
                { text: "휴일근로", value: "0" }
            ],
            index: 0
        });

        $("#status").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                { text: "작성중", value: "1" },
                { text: "제출", value: "2" },
                { text: "승인", value: "3" },
                { text: "반려", value: "4" }
            ],
            index: 0
        });

        $("#searchType").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "성명", value: "" },
                { text: "부서명", value: "1" },
                { text: "팀명", value: "2" },
                { text: "직급", value: "3" },
            ],
            index: 0
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="$(\'#fileAppendM\').data(\'kendoWindow\').open();">' +
                            '	<span class="k-button-text">취소</span>' +
                            '</button>';
                    }
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    field: "",
                    title: "부서"
                }, {
                    field: "",
                    title: "팀"
                }, {
                    field: "",
                    title: "직위"
                }, {
                    field: "",
                    title: "이름"
                }, {
                    title: "발생",
                    columns: [
                        {
                            field: "",
                            title: "총 연차"
                        }, {
                            field: "",
                            title: "기존"
                        }, {
                            field: "",
                            title: "보상"
                        }
                    ]
                }, {
                    title: "연가",
                    columns: [
                        {
                            field: "",
                            title: "전 전년<br>사용"
                        }, {
                            field: "",
                            title: "전년<br>사용"
                        }, {
                            field: "",
                            title: "금년<br>사용"
                        }, {
                            field: "",
                            title: "오전<br>반차"
                        }, {
                            field: "",
                            title: "오후<br>반차"
                        }, {
                            title: "잔여연차",
                            columns: [
                                {
                                    field: "",
                                    title: "총 잔여"
                                }, {
                                    field: "",
                                    title: "기존"
                                }, {
                                    field: "",
                                    title: "보상"
                                }
                            ]
                        }
                    ]
                }, {
                    field: "",
                    title: "병가"
                }, {
                    field: "",
                    title: "공가"
                }, {
                    field: "",
                    title: "경조<br>휴가"
                }, {
                    field: "",
                    title: "출산<br>휴가"
                }, {
                    field: "",
                    title: "대체<br>휴가"
                }, {
                    field: "",
                    title: "근속<br>포상<br>휴가"
                }, {
                    field: "",
                    title: "휴일<br>근로"
                }
            ]
        }).data("kendoGrid");
    }
}
