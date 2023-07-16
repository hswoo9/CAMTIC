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
        vacGubun : [],
        tagTarget : "",

        userVacation : 0
    },

    init: function(){
        meetingRoomReq.dataSet();
        meetingRoomReq.mainScheduler();
        meetingRoomReq.mainGrid();
    },

    dataSet: function(){

        $("#datePicker").kendoDatePicker({
            value: new Date(),
            start: "year",
            depth: "year",
            format: "yyyy-MM",
            width: "150px"
        });

        $("#meetingRoomDivision").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "전체", value: ""},
                {text: "교육1실 (본부동 3층)", value: "교육1실 (본부동 3층)"},
                {text: "교육2실 (본부동 3층)", value: "교육2실 (본부동 3층)"},
                {text: "교육4실 (본부동 지하)", value: "교육4실 (본부동 지하)"},
                {text: "세미나실1 (본부동 3층)", value: "세미나실1 (본부동 3층)"},
                {text: "세미나실2 (본부동 3층)", value: "세미나실2 (본부동 3층)"}
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
                {text: "일반회의", value: "일반회의"},
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
                {text: "등록자", value: "등록자"},
                {text: "담당자", value: "담당자"},
                {text: "특이사항", value: "특이사항"}
            ],
            index: 0
        });
        
        $("#name").kendoTextBox();
    },

    mainScheduler: function(){
        var schRsDs = [];
        var ksModel = {
            id: { from: "ROOM_REQ_SN", type: "number" },
            title: { from: "schTitle", defaultValue: "No title", validation: { required: true } },
            start: { type: "date", from: "START_DATE" },
            end: { type: "date", from: "END_DATE" }
        }

        var schDataSource = new kendo.data.SchedulerDataSource({
            transport: {
                read: {
                    url : "/inside/getRoomRequestList",
                    dataType: "json"
                },
                parameterMap: function(data) {
                    data.empSeq = $("#RegEmpSeq").val();
                    return data;
                }
            },
            schema: {
                data: function (data) {
                    console.log(data.list);
                    return data.list;
                },
                model: {
                    id: "id",
                    fields: ksModel
                }
            }
        });

        var schResources = [
            {
                field : "vacCodeId",
                dataSource : schRsDs
            }
        ]

        kendo.culture("ko-KR");

        $("#scheduler").kendoScheduler({
            date: new Date(),
            startTime: new Date(),
            height: 671,
            views: [
                "month"
            ],
            timezone: "Etc/UTC",
            dataSource: schDataSource,
            selectable: false,
            //dataBound : carList.onDataBound,
            editable : false
        });
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
                    parameterMap: function(data, operation) {
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

    meetingRoomPopup : function(){
        var url = "/Inside/pop/meetingRoomPop.do";
        var name = "popup test";
        var option = "width = 1000, height = 500, top = 100, left = 200, location = no"
        var popup = window.open(url, name, option);
    }
}

function gridReload(){
    $("#scheduler").data("kendoScheduler").dataSource.read();
}