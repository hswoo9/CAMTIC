/**
 * 2023.06.05
 * 작성자 : 김지혜
 * 내용 : 근태관리 - 휴일근로현황
 */

var holidayWorkReq = {
    global : {
        now: new Date()
    },

    fn_defaultScript: function () {

        customKendo.fn_datePicker("startDay", '', "yyyy-MM-dd", new Date(holidayWorkReq.global.now.setMonth(holidayWorkReq.global.now.getMonth() - 1)));
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
                {text: "J-밸리혁신팀", value: "J-밸리혁신팀"}
            ],
            index: 0
        });

        $("#name").kendoTextBox();

        $("#status").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "전체", value: "" },
                { text: "작성 중", value: "작성 중" },
                { text: "제출", value: "제출" },
                { text: "반려", value: "반려" },
                { text: "승인", value: "승인" }
            ],
            index: 0
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
                    pageSizes : [ 10, 20, 50, "ALL" ],
                    buttonCount : 5
                },
                toolbar: [
                    {
                        name: 'excel',
                        text: '엑셀다운로드'
                    }
                ],
                noRecords: {
                    template: "데이터가 존재하지 않습니다."
                },
                columns: [
                    {
                        field: "",
                        title: "순번",
                        width: "5%",
                        template: "#= record-- #"
                    }, {
                        field: "",
                        title: "부서",
                        width: "15%"
                    }, {
                        field: "",
                        title: "팀",
                        width: "10%"
                    }, {
                        field: "",
                        title: "성명",
                        width: "10%"
                    }, {
                        field: "",
                        title: "신청구분",
                        width: "20%"
                    }, {
                        field: "",
                        title: "신청일자",
                        width: "10%"
                    }, {
                        field: "",
                        title: "신청기간",
                        width: "20%"
                    }, {
                        field: "",
                        title: "상태",
                        width: "10%"
                    }]
            }).data("kendoGrid");
        }
}

