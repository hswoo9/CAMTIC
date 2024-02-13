var now = new Date();
var menuCd = $("#menuCd").val();
var docContent = "";

var searchHolidayReqPop = {
    global : {
        now : new Date(),
        empSeq : $("#empSeq").val(),
        mcCode : "V",
        mdCode : "",
        params  : "",
        data : "",
        searchAjaxData : "",
        saveAjaxData : "",
        hwpCtrl : "",
    },

    defaultScript : function(){
        searchHolidayReqPop.dataSet();
        searchHolidayReqPop.mainGrid();

        $(document).on('change', '.checkSingle', function (event) {
            if (this.checked) {
                // 체크된 것이 클릭된 경우 다른 모든 체크박스 비활성화
                $('.checkSingle').not(this).attr('disabled', true);
            } else {
                // 체크 해제 된 경우 다른 모든 체크박스 활성화
                $('.checkSingle').attr('disabled', false);
            }
        });
    },

    dataSet : function() {
        $("#baseYear").kendoDatePicker({
            depth: "decade",
            start: "decade",
            culture : "ko-KR",
            format : "yyyy",
            value : new Date()
        });

        // $("#start_time").kendoTimePicker({
        //     culture : "ko-KR",
        //     format : "HH:mm",
        //     interval : 10,
        //     value : "09:00"
        // });
        //
        // $("#end_time").kendoTimePicker({
        //     culture : "ko-KR",
        //     format : "HH:mm",
        //     interval : 10,
        //     value : "18:00"
        // });
        //
        // $("#end_date").kendoDatePicker({
        //     depth: "month",
        //     start: "month",
        //     culture : "ko-KR",
        //     format : "yyyy-MM-dd",
        //     value : new Date()
        // });
    },

    mainGrid : function() {
        var dataSource = new kendo.data.DataSource({
            serverPaging: false,
            pageSize: 10,
            transport: {
                read : {
                    url : getContextPath() + "/getVacUseHistoryWorkList",
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data, operation) {
                    data.baseYear = $("#baseYear").val();
                    data.endDate = $("#end_date").val();
                    data.empSeq = $("#empSeq").val();
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
            selectable: "row",
            height: 300,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 30, 50, 100 ],
                buttonCount : 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound : searchHolidayReqPop.onDataBound,
            columns: [
                {
                    headerTemplate: '',
                    template : function(e){
                        if(e.ADMIN_APPR_STAT == "Y"){
                            return "<input type='checkbox' id='hisPk#=SUBHOLIDAY_USE_ID#' name='hisPk' value=\""+e.SUBHOLIDAY_USE_ID+"\" class='checkbox checkSingle'/>";
                        } else {
                            return "";
                        }
                    },
                    width: 30
                }, {
                    field: "SUBHOLIDAY_DT_CODE_NM",
                    title: "구분",
                }, {
                    field: "SUBHOLIDAY_WORK_DAY",
                    title: "근로일",
                }, {
                    field: "APPR_STAT",
                    title: "승인상태",
                    template : function(e){
                        if(e.ADMIN_APPR_STAT != null){
                            if(e.APPR_STAT == "N"){
                                return "작성 중";
                            } else if(e.APPR_STAT == "Y"){
                                if(e.ADMIN_APPR_STAT == "N"){
                                    return "담당자 요청진행전";
                                } else if(e.ADMIN_APPR_STAT == "Y"){
                                    return "최종승인";
                                } else if(e.ADMIN_APPR_STAT =="C"){
                                    return "관리자 제출";
                                } else if(e.ADMIN_APPR_STAT =="E"){
                                    return "관리자 반려";
                                }else if(e.ADMIN_APPR_STAT =="D"){
                                    return "관리자 회수";
                                }
                            } else if(e.APPR_STAT =="C"){
                                return "제출";
                            } else if(e.APPR_STAT =="E"){
                                return "반려";
                            }else if(e.APPR_STAT =="D"){
                                return "회수";
                            }
                        }else{
                            if(e.APPR_STAT == "N"){
                                return "요청진행전";
                            } else if(e.APPR_STAT == "Y"){
                                return "승인";
                            } else if(e.APPR_STAT =="C"){
                                return "제출";
                            } else if(e.APPR_STAT =="E"){
                                return "반려";
                            }else if(e.APPR_STAT =="D"){
                                return "회수";
                            }
                        }

                    },
                }
            ]
        }).data("kendoGrid");
    },
    onDataBound : function(){
        var grid = this;

        grid.tbody.find("tr").dblclick(function (e) {
            var dataItem = grid.dataItem($(this));
            console.log(dataItem);
            $("#edtHolidayKindTop").data("kendoDropDownList").value(dataItem.SUBHOLIDAY_CODE_ID);
            $("#edtHolidayRmkTop").val(dataItem.RMK);

            var startDay = new Date(dataItem.VAC_USE_ST_DT);
            var startHour = startDay.getHours();
            if(startHour < 10) startHour = "0" + startHour;
            var startMinute = startDay.getMinutes();
            if(startMinute < 10) startMinute = "0" + startMinute;

            $("#edtHolidayStartDateTop").data("kendoDatePicker").value(startDay);
            $("#edtHolidayStartHourTop").data("kendoTimePicker").value(String(startHour));
            $("#edtHolidayStartMinuteTop").data("kendoDropDownList").value(String(startMinute));

            var endDay = new Date(dataItem.SUBHOLIDAY_EN_DT);
            var endHour = endDay.getHours();
            if(endHour < 10) endHour = "0" + endHour;
            var endMinute = endDay.getMinutes();
            if(endMinute < 10) endMinute = "0" + endMinute;

            $("#edtHolidayEndDateTop").data("kendoDatePicker").value(endDay);
            $("#edtHolidayEndHourTop").data("kendoTimePicker").value(String(endHour));
            $("#edtHolidayEndMinuteTop").data("kendoDropDownList").value(String(endMinute));
            $("#apprStat").val(dataItem.APPR_STAT);
            $("#vacUseHistId").val(dataItem.SUBHOLIDAY_USE_ID);

            var diff = monthDiffEdtHolidayModal();
            var vacationMin = makeDateForm($("#edtHolidayStartHourTop").val() + ":" + $("#edtHolidayStartMinuteTop").val(), $("#edtHolidayEndHourTop").val() + ":" + $("#edtHolidayEndMinuteTop").val());
            if(parseInt($("#edtHolidayStartHourTop").val()) < 13){
                if(parseInt($("#edtHolidayEndHourTop").val()) > 13){
                    vacationMin -= 60;
                }
            }
            var applyHour = ((diff * 8 * 60) + vacationMin) / 60;
            $("#edtHolidayApplyHourModal").val(timeReturnToFixed(applyHour, 2));
            $("#edtHolidayApplyPeriodModal").val(timeReturnToFixed(applyHour / 8, 3));
            $("#edtHolidayPeriodHourModal").text(timeReturnToFixed(applyHour / 8, 3) + "(" + timeReturnToFixed(applyHour, 2) + ")");
        });


    },

    gridReload : function(){
        $("#mainGrid").data("kendoGrid").dataSource.read();
    },

    fn_topTableClose : function(){
        var topWindow = window.top;
        topWindow.close();
    },

    fn_selectChkUse : function(){

        if($("input[name='hisPk']:checked").length == 0) {
            alert("사용하실 휴일근로를 선택해주세요.");
        } else if(confirm("선택하신 휴일근로를 사용하시겠습니까?")){
            var topWindow = window.top;
            topWindow.close();
        }

        var hisAr = new Array();
        $("input[name='hisPk']:checked").each(function(){
            var dataItem = $("#mainGrid").data("kendoGrid").dataItem($(this).closest("tr"));
            window.opener.subHolidayReqPop.sendMeData(dataItem);
            console.log(dataItem);
            hisAr.push(dataItem);
        });


    }
}

