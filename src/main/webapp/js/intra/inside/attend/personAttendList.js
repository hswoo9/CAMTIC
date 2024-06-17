var personAttend = {
    global: {
        now: new Date(),
        searchAjaxData: {},
        gridData: new Array()
    },

    fn_defaultScript(){
        personAttend.pageSet();
        personAttend.gridReload();
    },

    pageSet(){
        customKendo.fn_datePicker("startDt", '', "yyyy-MM-dd", new Date(personAttend.global.now.setMonth(personAttend.global.now.getMonth() - 1)));
        customKendo.fn_datePicker("endDt", '', "yyyy-MM-dd", new Date());
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

    dataSet(list){
        /** 정상출근 */
        let count01 = 0;
        /** 지각 */
        let count02 = 0;
        /** 연가 */
        let count03 = 0;
        /** 오전반차 */
        let count04 = 0;
        /** 오후반차 */
        let count05 = 0;
        /** 병가 */
        let count06 = 0;
        /** 공가 */
        let count07 = 0;
        /** 경조휴가 */
        let count08 = 0;
        /** 출산휴가 */
        let count09 = 0;
        /** 출장 */
        let count10 = 0;
        /** 대체휴가 */
        let count11 = 0;
        /** 근속포상휴가 */
        let count12 = 0;
        /** 휴일근로 */
        let count13 = 0;

        console.log("list", list);
        
        for(let i=0; i<list.length; i++){
            const map = list[i];

            /** 정상출근 구하기 */
            if(map.WEEK != "토" && map.WEEK != "일"){
                if(!(map.ATTEND_ADJUSTMENT_START != "" && map.ATTEND_ADJUSTMENT_START >= "09:00:00" && map.ATTEND_ADJUSTMENT_START < "15:00:00")){
                    count01 ++;
                }
            }

            if(map.ATTEND_ADJUSTMENT_START != "" && map.ATTEND_ADJUSTMENT_START >= "09:00:00" && map.ATTEND_ADJUSTMENT_START < "15:00:00"){
                count02 ++;
            }

            if(map.HOLIDAY != null){
                switch(map.HOLIDAY) {
                    case '연가':
                        count03++;
                        break;
                    case '오전반차':
                        count04++;
                        break;
                    case '오후반차':
                        count05++;
                        break;
                    case '병가':
                        count06++;
                        break;
                    case '공가':
                        count07++;
                        break;
                    case '경조휴가':
                        count08++;
                        break;
                    case '출산휴가':
                        count09++;
                        break;
                    case '대체휴가':
                        count11++;
                        break;
                    case '근속포상휴가':
                        count12++;
                        break;
                }
            }

            if(map.BUSTRIP != null){
                count10++;
            }
        }

        $("#normal").text(count01+"일");
        $("#late").text(count02+"일");

        $("#annual").text(count03+"일");
        $("#morning").text(count04+"일");
        $("#afternoon").text(count05+"일");
        $("#sick").text(count06+"일");
        $("#publicholi").text(count07+"일");
        $("#condolences").text(count08+"일");
        $("#maternity").text(count09+"일");
        $("#alternative").text(count11+"일");
        $("#longaward").text(count12+"일");

        $("#hr").text(count10+"일");

        $("#holidaywork").text("0일");

        $.LoadingOverlay("hide", {});
    },

    gridReload(){
        personAttend.loading();

        personAttend.global.searchAjaxData = {
            startDt: $("#startDt").val(),
            endDt: $("#endDt").val(),
            empSeq: $("#regEmpSeq").val()
        }
        personAttend.mainGrid("/inside/getPersonAttendList", personAttend.global.searchAjaxData);
    },

    mainGrid(url, params){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read: {
                    url: url,
                    dataType: "json",
                    type: "post"
                },
                parameterMap: function(data){
                    for(var key in params){
                        data[key] = params[key];
                    }
                    return data;
                }
            },
            schema: {
                data: function (data){
                    personAttend.dataSet(data.list);
                    return data.list;
                },
                total: function (data){
                    return data.list.length;
                },
            },
            pageSize: 10
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
                    field: "START_DATE",
                    title: "일자",
                }, {
                    field: "WEEK",
                    title: "요일",
                }, {
                    field: "ATTEND_ADJUSTMENT_START",
                    title: "출근 시간",
                    template: function(row){
                        if((row.WEEK == "토" || row.WEEK == "일") && row.ATTEND_ADJUSTMENT_START == ""){
                            return "휴일";
                        }else if(row.HOLIDAY2 != null) {
                            return "공휴일";
                        }else{
                            return row.ATTEND_ADJUSTMENT_START;
                        }
                    }
                }, {
                    field: "ATTEND_ADJUSTMENT_END",
                    title: "퇴근 시간",
                    template: function(row){
                        if((row.WEEK == "토" || row.WEEK == "일") && row.ATTEND_ADJUSTMENT_END == ""){
                            return "휴일";
                        }else if(row.HOLIDAY2 != null) {
                            return "공휴일";
                        }else{
                            return row.ATTEND_ADJUSTMENT_END;
                        }
                    }
                }, {
                    field: "ATTEND_TEXT",
                    title: "근태 항목"
                }
            ]
        }).data("kendoGrid");
    },

    loading(){
        $.LoadingOverlay("show", {
            background       : "rgba(0, 0, 0, 0.5)",
            image            : "",
            maxSize          : 60,
            fontawesome      : "fa fa-spinner fa-pulse fa-fw",
            fontawesomeColor : "#FFFFFF",
        });
    }
}

