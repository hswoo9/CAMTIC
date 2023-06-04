var now = new Date();

var subHolidaySetting = {

    init : function(){
        subHolidaySetting.dataSet();
        subHolidaySetting.mainGrid();
    },

    dataSet() {
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
                    title: "기존",
                    columns: [
                        {
                            field: "",
                            title: "발생 연차"
                        }, {
                            field: "",
                            title: "전년 사용"
                        }, {
                            field: "",
                            title: "전 전년 사용"
                        }
                    ]
                }, {
                    title: "보상",
                    columns: [
                        {
                            field: "",
                            title: "발생 연차"
                        }, {
                            field: "",
                            title: "전년 사용"
                        }, {
                            field: "",
                            title: "전 전년 사용"
                        }
                    ]
                }
            ]
        }).data("kendoGrid");
    }
}
