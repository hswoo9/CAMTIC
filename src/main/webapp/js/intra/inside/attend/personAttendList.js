var personAttend = {
    global: {
        now: new Date()
    },

    init: function(){
        personAttend.pageSet();
        personAttend.dataSet();
        personAttend.mainGrid();
    },

    pageSet: function(){
        /* customKendo.fn_datePicker("startDt", '', "yyyy-MM-dd", new Date(personAttend.global.now.setMonth(personAttend.global.now.getMonth() - 1))); */
        /** 임시로 8월 한달치 데이터만 나오게 */
        customKendo.fn_datePicker("startDt", '', "yyyy-MM-dd", new Date("2023-08-01"));
        customKendo.fn_datePicker("endDt", '', "yyyy-MM-dd", new Date("2023-08-31"));
        $("#startDt, #endDt").attr("readonly", true);

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

    dataSet: function(){
        let url = "/inside/getPersonStatus";
        const data = {
            startDt: $("#startDt").val(),
            endDt: $("#endDt").val(),
            empSeq: $("#regEmpSeq").val()
        };
        let holidayData = customKendo.fn_customAjax(url, data).holidayData;
        let hrData = customKendo.fn_customAjax(url, data).hrData;
        console.log("hrData");
        console.log(hrData);
        console.log("holidayData");
        console.log(holidayData);

        $("#normal").text("0일");
        $("#late").text("0일");

        $("#annual").text(holidayData.ANNUAL+"일");
        $("#morning").text(holidayData.MORNING+"일");
        $("#afternoon").text(holidayData.AFTERNOON+"일");
        $("#sick").text(holidayData.SICK+"일");
        $("#publicholi").text(holidayData.PUBLICHOLI+"일");
        $("#condolences").text(holidayData.CONDOLENCES+"일");
        $("#maternity").text(holidayData.MATERNITY+"일");

        $("#hr").text(hrData.HR+"일");

        $("#alternative").text(holidayData.ALTERNATIVE+"일");
        $("#longaward").text(holidayData.LONGAWARD+"일");
        $("#holidaywork").text(holidayData.HOLIDAYWORK+"일");
    },

    mainGrid: function(){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read: {
                    url: "/inside/getPersonAttendList",
                    dataType: "json",
                    type: "post"
                },
                parameterMap: function(data){
                    data.startDt = $("#startDt").val();
                    data.endDt = $("#endDt").val();
                    data.empSeq = $("#regEmpSeq").val();
                    return data;
                }
            },
            schema : {
                data: function (data) {
                    return data.list;
                },
                total: function (data) {
                    return data.list.length;
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
                    field: "START_DATE",
                    title: "일자",
                }, {
                    field: "WEEK",
                    title: "요일",
                }, {
                    field: "START_TIME",
                    title: "출근 시간",
                }, {
                    field: "END_TIME",
                    title: "퇴근 시간",
                }, {
                    title: "근태 항목",
                    template: function(row){
                        console.log(row);
                        let text = "";
                        if(row.HOLIDAY != ""){
                            text += row.HOLIDAY
                        }
                        if(row.BUSTRIP != ""){
                            if(text != ""){
                                text += ", ";
                            }
                            if (row.BUSTRIP == "1") {
                                text += "도내(시내)";
                            }else if (row.BUSTRIP == "2") {
                                text += "도내(시외)";
                            }else if (row.BUSTRIP == "3") {
                                text += "도외";
                            }else if (row.BUSTRIP == "4") {
                                text += "해외";
                            }
                        }
                        return text;
                    }
                }
            ]
        }).data("kendoGrid");
    }
}

