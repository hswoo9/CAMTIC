var now = new Date();

var subHolidayStat = {
    global : {
        activeList : [
            {
                text : "재직", value : "Y"
            }, {
                text : "퇴직", value : "N"
            }
        ],
        vacStatus : [
            { text: "확정", value: "Y" },
            { text: "사용대기", value: "N" },
            { text: "미생성", value: "NULL" }
        ],
        selectEmpData : [],
    },

    init : function(){
        subHolidayStat.dataSet();
        subHolidayStat.fn_makerGrid();
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
            start: "decade",
            depth: "decade",
            culture : "ko-KR",
            format : "yyyy",
            value : new Date()
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

    fn_makerGrid : function(e){

        var dataSource = new kendo.data.DataSource({
            serverPaging: false,
            pageSize : 10,
            transport: {
                read : {
                    url : getContextPath() + "/getUserVacListStat.do",
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data, operation) {
                    data.active = $("#active").val();
                    data.userNm = $("#userNm").val();
                    data.deptName = $("#deptName").val();
                    data.positionDutyNm = $("#positionDutyNm").val();
                    data.vacStatus = $("#vacStatus").val();
                    return data;
                }
            },
            schema : {
                data: function (data) {
                    return data.result;
                },
                total: function (data) {
                    return data.totalCount;
                },
            }
        });

        $("#mainGrid").kendoGrid({
            dataSource: dataSource,
            height: 522,
            sortable: true,
            scrollable: true,
            noRecords: {
                template: "<div style='margin: auto;'>데이터가 존재하지 않습니다.</div>"
            },
            pageable: {
                refresh: true,
                pageSize : 10,
                pageSizes: [10, 20, 50, "ALL"],
                buttonCount: 5,
                messages: {
                    display: "{0} - {1} of {2}",
                    itemsPerPage: "",
                    empty: "데이터가 없습니다.",
                }
            },
            dataBound: subHolidayStat.onDataBound,
            columns: [
                {
                    field: "dept_name",
                    title: "부서",
                    width: 80
                }, {
                    field: "dept_team_name",
                    title: "팀",
                    width: 80
                }, {
                    field: "duty_name",
                    title: "직위",
                    width: 70
                }, {
                    field: "emp_name_kr",
                    title: "이름",
                    width: 70
                }, {
                    title: "발생",
                    columns: [
                        {
                            field: "grant_day",
                            title: "총연차",
                            width: 50
                        }, {
                            field: "",
                            title: "기존",
                            width: 50
                        }, {
                            field: "",
                            title: "보상",
                            width: 50
                        }
                    ]
                }, {
                    title: "연가",
                    columns: [
                        {
                            field: "",
                            title: "전전년<br>사용",
                            width: 50
                        }, {
                            field: "",
                            title: "전년<br>사용",
                            width: 50
                        }, {
                            field: "use_day",
                            title: "금년<br>사용",
                            width: 50
                        }, {
                            field: "MORNING",
                            title: "오전<br>반차",
                            width: 50
                        }, {
                            field: "AFTERNOON",
                            title: "오후<br>반차",
                            width: 50
                        }, {
                            title: "잔여연차",
                            columns: [
                                {
                                    field: "REMAIN_VAC",
                                    title: "총잔여",
                                    width: 50
                                }, {
                                    field: "",
                                    title: "기존",
                                    width: 50
                                }, {
                                    field: "",
                                    title: "보상",
                                    width: 50
                                }
                            ]
                        }
                    ]
                }, {
                    field: "SICK",
                    title: "병가",
                    width: 50
                }, {
                    field: "PUBLICHOLI",
                    title: "공가",
                    width: 50
                }, {
                    field: "CONDOLENCES",
                    title: "경조<br>휴가",
                    width: 50
                }, {
                    field: "MATERNITY",
                    title: "출산<br>휴가",
                    width: 50
                }, {
                    field: "ALTERNATIVE",
                    title: "대체<br>휴가",
                    width: 50
                }, {
                    field: "LONGAWARD",
                    title: "근속<br>포상<br>휴가",
                    width: 50
                }, {
                    field: "HOLIDAYWORK",
                    title: "휴일<br>근로",
                    width: 50
                }
            ]
        }).data("kendoGrid");
    },

    onDataBound : function(){
        var grid = this;
        grid.element.off('dbclick');
        subHolidayStat.global.selectEmpData = [];

        grid.tbody.find("tr").click(function (e) {
            var dataItem = grid.dataItem($(this));
            subHolidayStat.global.selectEmpData = dataItem;
            $("#userVacSetting").data("kendoWindow").open();
        });
    },

    gridReload : function(){
        $("#mainGrid").data("kendoGrid").dataSource.read();
    }
}
