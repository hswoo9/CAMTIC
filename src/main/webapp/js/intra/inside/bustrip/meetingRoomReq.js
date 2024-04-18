/**
 * 2023.06.05
 * 작성자 : 김지혜
 * 내용 : 차량/회의실관리 - 회의실 사용 신청
 */

$(function() {
    $("#spclVacManageTabStrip").kendoTabStrip({
        scrollable: true,
        animation: {
            open: {
                effects: "fadeIn"
            }
        }
    });
});

var meetingRoomReq = {
    global : {
        now: new Date(),
        menuCd : $("#menuCd").val(),
        empSeq : $("#empSeq").val(),
        mcCode : "V",
        startTime : new Date(),
        endTime : new Date(),
        data : new Array(),
        vacGubun : [],
        tagTarget : "",
        searchAjaxData : "",
        userVacation : 0
    },

    init: function(){
        meetingRoomReq.dataSet();
        meetingRoomReq.mainGrid();
    },

    dataSet: function(){

        // $("#datePicker").kendoDatePicker({
        //     value: new Date(),
        //     start: "year",
        //     depth: "year",
        //     format: "yyyy-MM",
        //     width: "150px"
        // });

        $("#meetingRoomDivision").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "전체", value: ""},
                {text: "교육1실 (본부동 3층)", value: "1"},
                {text: "교육2실 (본부동 3층)", value: "2"},
                {text: "교육4실 (본부동 3층)", value: "4"},
                {text: "세미나실1 (본부동 3층)", value: "5"},
                {text: "교육준비실 (본부동 3층)", value: "8"},
                {text: "2층 회의실 (본부동)", value: "9"},
                {text: "세미나실2 (본부동 3층)", value: "12"},
                {text: "5동 교육실 1 (5동 2층)", value: "14"},
                {text: "일반교육실1 (창업동 3층)", value: "15"},
                {text: "일반교육실2 (창업동 3층)", value: "16"},
                {text: "전산교육실1 (창업동 3층)", value: "17"},
                {text: "전산교육실2 (창업동 3층)", value: "18"},
                {text: "전산교육실3 (창업동 3층)", value: "19"},
                {text: "어울림스퀘어 (창업동 3층)", value: "20"},
                {text: "나래홀 (창업동 2층)", value: "21"},
                {text: "첨단누리홀(창업동 1층)", value: "22"}
            ],
            index: 0
        });

        $("#usePurpose").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "전체", value: ""},
                {text: "품질교육", value: "품질교육"},
                {text: "기술교육", value: "기술교육"},
                {text: "경영교육", value: "경영교육"},
                {text: "일반 회의", value: "일반 회의"},
                {text: "교육 훈련", value: "교육 훈련"},
                {text: "대관", value: "대관"},
                {text: "기타", value: "기타"}
            ],
            index: 0
        });

        $("#rentalFee").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "전체", value: ""},
                {text: "무료", value: "무료"},
                {text: "유료", value: "유료"}
            ],
            index: 0
        });

        $("#raceDivision").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "전체", value: ""},
                {text: "업무용", value: "업무용"},
                {text: "개인 사유", value: "개인 사유"}
            ],
            index: 0
        });

        $("#searchDivision").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "전체", value: ""},
                {text: "등록자", value: "1"},
                {text: "담당자", value: "2"},
                {text: "특이사항", value: "3"}
            ],
            index: 0
        });
        
        $("#name").kendoTextBox();
    },

    getScheduleData : function(){
        var scheduleData = new Array();

        meetingRoomReq.global.searchAjaxData = {
            empSeq : $("#RegEmpSeq").val(),
            // datePicker : $("#datePicker").val(),
            meetingRoomDivision : $("#meetingRoomDivision").val(),
            usePurpose : $("#usePurpose").val(),
            rentalFee : $("#rentalFee").val(),
            searchDivision : $("#searchDivision").val(),
            name : $("#name").val()
        }

        var ds = customKendo.fn_customAjax("/inside/getRoomRequestList", meetingRoomReq.global.searchAjaxData);
        if(ds.flag){
            meetingRoomReq.global.data = ds.list;
        }
        if(meetingRoomReq.global.data.length > 0){
            for(var i = 0 ; i < meetingRoomReq.global.data.length ; i++){
                var row = {};
                row.title = meetingRoomReq.global.data[i].schTitle + " " + meetingRoomReq.global.data[i].USE_TIME;
                row.start = new Date(meetingRoomReq.global.data[i].START_DATE);
                row.end = new Date(meetingRoomReq.global.data[i].END_DATE);
                row.roomReqSn = meetingRoomReq.global.data[i].ROOM_REQ_SN;
                scheduleData.push(row);
            }
        }
        return scheduleData;
    },

    meetingRoomPop : function(e){
        var url = "/Inside/pop/meetingRoomPop.do";
        if(!isNaN(e)) {
            url = "/Inside/pop/meetingRoomPop.do?roomReqSn=" + e;
        }
        var name = "meetingRoomPop";
        var option = "width = 1000, height = 500, top = 100, left = 200, location = no"
        window.open(url, name, option);
    },

    mainGrid: function () {
        var dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/inside/getRoomRequestList',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    // data.datePicker = $("#datePicker").val(),
                        data.meetingRoomDivision = $("#meetingRoomDivision").val(),
                    data.usePurpose = $("#usePurpose").val(),
                    data.rentalFee = $("#rentalFee").val(),
                        data.searchDivision = $("#searchDivision").val(),
                        data.name = $("#name").val()
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
            height: 472,
            pageable : {
                refresh : true,
                pageSizes: [10, 20, "ALL"],
                buttonCount : 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    field: "ROOM_CLASS_TEXT",
                    title: "회의실",
                    width: "15%"
                }, {
                    title: "사용일시",
                    width: "30%",
                    template: function(row){
                        return row.START_DT+" "+row.START_TIME+" ~ "+row.END_DT+" "+row.END_TIME;
                    }
                }, {
                    field: "USE_PURPOSE_TEXT",
                    title: "사용목적",
                    width: "20%"
                }, {
                    field: "RENTAL_FEE_TEXT",
                    title: "대관료",
                    width: "10%"
                }, {
                    field: "REG_EMP_NAME",
                    title: "등록자",
                    width: "10%"
                }, {
                    field: "MANAGER_NAME",
                    title: "담당자",
                    width: "10%"
                }]
        }).data("kendoGrid");
    },

    dateFormat : function(date) {
        let dateFormat2 = date.getFullYear() +
            '-' + ( (date.getMonth()+1) < 9 ? "0" + (date.getMonth()+1) : (date.getMonth()+1) )+
            '-' + ( (date.getDate()) < 9 ? "0" + (date.getDate()) : (date.getDate()) );
        return dateFormat2;
    },

    roomStatPop: function(){
        const url = "/Inside/pop/roomStatPop.do";
        const name = "roomStatPop";
        const option = "width = 1600, height = 570, top = 100, left = 200, location = no";
        window.open(url, name, option);
    },

    refresh: function(){
        $("#calendar").html("");
        meetingRoomReq.global.cal.$calendar.fullCalendar("destroy");
        meetingRoomReq.global.cal.init();
    }
}

function gridReload(){
    $("#mainGrid").data("kendoGrid").dataSource.read();
    meetingRoomReq.refresh();
}