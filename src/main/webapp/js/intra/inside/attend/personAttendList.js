/**
 * 2023.06.04
 * 작성자 : 김지혜
 * 내용 : 근태관리 - 개인근태현황
 */

var personAttendList = {
    global : {
        now: new Date()
    },

    fn_defaultScript: function () {

        customKendo.fn_datePicker("startDay", '', "yyyy-MM-dd", new Date(personAttendList.global.now.setMonth(personAttendList.global.now.getMonth() - 1)));
        customKendo.fn_datePicker("endDay", '', "yyyy-MM-dd", new Date());
        $("#startDay, #endDay").attr("readonly", true);

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
                {text: "선택 근로", value: "선택 근로"},
                {text: "출장", value: "출장"},
                {text: "대체 휴가", value: "대체 휴가"},
                {text: "휴일 근로", value: "휴일 근로"}
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
                pageSizes : [ 10, 20, 30, 50, 100 ],
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
                    title: "일자",
                    width: "10%"
                }, {
                    field: "",
                    title: "요일",
                    width: "10%"
                }, {
                    field: "",
                    title: "출근 시간",
                    width: "10%"
                }, {
                    field: "",
                    title: "출근 등록 방식",
                    width: "10%"
                }, {
                    field: "",
                    title: "퇴근 시간",
                    width: "10%"
                }, {
                    field: "",
                    title: "퇴근 등록 방식",
                    width: "10%"
                }, {
                    field: "",
                    title: "근무형태",
                    width: "10%"
                }, {
                    field: "",
                    title: "근태 항목",
                    width: "10%"
                }, {
                    field: "",
                    title: "상태",
                    width: "10%"
                }, {
                    field: "",
                    title: "신청 내역",
                    width: "10%"
                }]
        }).data("kendoGrid");
    }
}

