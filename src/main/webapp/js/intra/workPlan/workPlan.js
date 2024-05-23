/**
 * 2022.06.28 by. deer
 * 마이페이지 > 복무 > 유연근무
 *
 * function / global variable / local variable setting
 */


var now = new Date();
var menuCd = $("#menuCd").val();
var docContent = "";

$(function(){
    $("#spclVacManageTabStrip").kendoTabStrip({
        scrollable: true,
        animation:  {
            open: {
                effects: "fadeIn"
            }
        }
    });
    $("#startDay").kendoDatePicker({
        depth: "month",
        start: "month",
        culture : "ko-KR",
        format : "yyyy-MM-dd",
        value : new Date(now.setMonth(now.getMonth() - 1))
    });

    $("#endDay").kendoDatePicker({
        depth: "month",
        start: "month",
        culture : "ko-KR",
        format : "yyyy-MM-dd",
        value : new Date()
    });

    $("#titleContent").kendoTextBox();

    $("#status").kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: [
            { text: "작성 중", value: "작성 중" },
            { text: "제출", value: "제출" },
            { text: "승인", value: "승인" },
            { text: "반려", value: "반려" }
        ],
        index: 0
    });

    $("#startDay, #endDay").attr("readonly", true);

    /**
     *  유연근무 신청 저장리스트 DataSource
     *  url : /workPlan/getWorkPlanReqSubList.do
     */
    var dataSource = new kendo.data.DataSource({
        serverPaging: false,
        transport: {
            read : {
                url : "/workPlan/getWorkPlanReqSubList.do",
                dataType : "json",
                type : "post",
                async : false
            },
            parameterMap: function(data, operation) {
                data.empSeq = $("#empSeq").val();
                data.status = $("#status").val();
                data.startDay = $("#startDay").val();
                data.endDay = $("#endDay").val();

                return data;
            }
        },
        schema : {
            data: function (data) {
                console.log(data);
                return data.data;
            },
            total: function (data) {
                return data.data.length;
            },
        },
        pageSize: 10,
    });

    $("#mainGrid").kendoGrid({
        dataSource: dataSource,
        height: 491,
        sortable: true,
        scrollable: true,
        toolbar : [
            {
                name : 'button',
                template : function (e){
                    return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="/*selectChkDel()*/">' +
                        '	<span class="k-button-text">선택삭제</span>' +
                        '</button>';
                }
            }, {
                name : 'excel',
                text: '엑셀다운로드'
            }, {
                name : 'button',
                template : function (e){
                    return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="workPlan.workPlanRegPopup()">' +
                        '	<span class="k-button-text">신청</span>' +
                        '</button>';
                }
            }, {
                name : 'button',
                template : function (e){
                    return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="workPlan.workPlanRegPopup()">' +
                        '	<span class="k-button-text">추가</span>' +
                        '</button>';
                }
            }
        ],
        excel : {
            fileName : "유연근무변경 저장 목록.xlsx",
            filterable : true
        },
        noRecords: {
            template: "데이터가 존재하지 않습니다."
        },
        pageable: {
            refresh: true,
            pageSize : 10,
            pageSizes : [ 10, 20, 50, "ALL" ],
            buttonCount: 5,
            messages: {
                display: "{0} - {1} of {2}",
                itemsPerPage: "",
                empty: "데이터가 없습니다.",
            }
        },
        columns: [
            {
                headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" class="k-checkbox checkbox"/>',
                template : "<input type='checkbox' id='wpcPk#=WORK_PLAN_CHANGE_ID#' name='wpcPk' value='#=WORK_PLAN_CHANGE_ID#' class='k-checkbox checkbox'/>",
                width: "50px"
            }, {
                field: "",
                title: "순번",
                width: "50px",
            }, {
                field: "DEPT_NAME",
                title: "부서",
                width: "150px"
            }, {
                field : "EMP_NAME_KR",
                title : "성명",
                width: "80px"
            }, {
                field : "WORK_PLAN_TYPE",
                title : "근무 유형",
                width: "80px"
            }, {
                field : "REQUEST_DATE",
                title : "신청일자",
                width: "80px"
            }, {
                field : "APPLY_DATE",
                title : "적용기간",
                width: "200px"
            },{
                field: "",
                title: "진행 상태",
                width: "70px",
                template : function(row){
                    if(row.apprStat == "N"){
                        return "대기";
                    }else if(row.apprStat == "Y"){
                        return "승인";
                    }else if(row.apprStat == "E"){
                        return "반려";
                    }else{
                        return "";
                    }
                }
            },{
                field: "",
                title: "승인 요청",
                width: "70px"
            }]
    }).data("kendoGrid");

    $("#checkAll").click(function(){
        if($(this).is(":checked")) $("input[name=wpcPk]").prop("checked", true);
        else $("input[name=wpcPk]").prop("checked", false);
    });


    workPlan.schedulerInit();
});

/* TODO. 2022.07.02 유연근무 신청서(기안전) 삭제 */
function selectChkDel(){
    var flag = true;

    if($("input[name='wpcPk']:checked").length == 0){
        alert("신청서를 선택해주세요.");
        return;
    }else if(!confirm("선택한 데이터를 삭제하시겠습니까?")){
        return;
    }

    var changeAr = new Array();
    var grid = $("#mainGrid").data("kendoGrid");
    $("input[name='wpcPk']:checked").each(function(){
        var dataItem = grid.dataItem($(this).closest("tr"));
        if(dataItem.STATUS == "100" || dataItem.STATUS == "20"){
            flag = false;
        }else{
            changeAr.push(this.value);
        }
    })

    if(!flag){
        alert("결재 진행중이거나 종결된 항목은 삭제할 수 없습니다.");
        changeAr = new Array();
        return;
    }

    $.ajax({
        url : "/workPlan/setWorkPlanReqChangeDel.do",
        data : {
            changeAr : changeAr
        },
        dataType : "json",
        type : "POST",
        success : function (result){
            var rs = result.result;
            alert(rs.message);
            if(rs.code == "200"){
                gridReload();
            }
        }
    })
}

function gridReload(){
    $("#mainGrid").data("kendoGrid").dataSource.read();
}

/** save util start */

var applyDt = new Date();
applyDt.setDate(applyDt.getDate() + 1);
var lastDt = new Date();
lastDt.setMonth(11, 31);
lastDt.set

$(".startTimePicker").kendoTimePicker({
    format: "HH:mm",
    value : "09:00"
});

$(".endTimePicker").kendoTimePicker({
    format: "HH:mm",
    value : "18:00"
});

$("#work_plan_type, .startTimePicker, .endTimePicker").attr("readonly", true);

$("#work_week_time").kendoRadioGroup({
    items: [
        {label : "주 40시간" , value : "40"},
        {label : "주 30시간" , value : "30"},
        {label : "주 20시간" , value : "20"},
        {label : "기타" , value : "0"},
    ],
    layout : "horizontal",
    labelPosition : "after"
}).data("kendoRadioGroup");

$("input[name='dayChk']").prop("checked", true);

readWTSetting();

function removeDayChk(e){
    if(!$(e).is(":checked")) {
        $(e).closest("tr").addClass("removeDay");
        $(e).closest("tr").find(".timePicker").val("00:00");
        singleWTSetting($(e).attr("day"));
    }else {
        var checkWpT = $("input[name=workPlanType]:checked").val() == null ? "09:00~18:00" : $("input[name=workPlanType]:checked").val();
        $(e).closest("tr").removeClass("removeDay");
        $(e).closest("tr").find(".w_start_time").val(checkWpT.split("~")[0]);
        $(e).closest("tr").find(".w_end_time").val(checkWpT.split("~")[1]);
        singleWTSetting($(e).attr("day"));
    }
}

function timeDiff(type){
    $("#timeDiff").empty();
    var htmlStr = "";
    if(type == 101){
        $("#work_week_time input[type='radio']").prop("checked", false);
        $("#workPlanApplyTb input[type='text']").not(".defaultVal").val("");

        var wptList = allApplyRadioGroupMake(1);

        htmlStr += "<table class='table table-bordered mb-0' style='height: 100%;'>" +
            "		<tr>" +
            "			<td>" +
            "				<div id='wptDiv'>";
        for(var i = 0; i < wptList.length; i++){
            htmlStr +=	"				<label for='"+wptList[i].WK_CODE_ID+"'>" +
                "						<input type='radio' class='k-radio k-radio-md' id='"+wptList[i].WK_CODE+"' name='workPlanType' value='"+wptList[i].WK_CODE_NM+"' onchange='allWprkTimeApply(this)' style='vertical-align: -webkit-baseline-middle;margin: 0 5px 10px 0'>"+wptList[i].WK_CODE_NM +
                "					</label>";
        }
        htmlStr +=	"			</div>" +
            "			</td>" +
            "		</tr>" +
            "		<tr>" +
            "			<th>" +
            "				일 근무시간" +
            "				<input type='text' id='dayWorkTimeHour' name='dayWorkTimeHour' style='width: 50px; border-width:0;text-align: right' readonly>" +
            "			</th>" +
            "		</tr>" +
            "		<tr>" +
            "			<th>" +
            "				일 근무시간(분)" +
            "				<input type='text' id='dayWorkTimeMin' name='dayWorkTimeMin' style='width: 30px; border-width:0;text-align: right' readonly>" +
            "			</th>" +
            "		</tr>" +
            "	</table>";
    }else{
        $("#workPlanApplyTb input[type='text']").not(".defaultVal").val("");
        $("#work_week_time input[type='radio']").prop("checked", false);
        htmlStr += "근무유형 중<br>[시차출퇴근제] 선택시<br>표기됩니다.";
    }

    $.each($(".timePicker"), function(){
        if(this.tagName != "SPAN"){
            var timepicker = $(this).data("kendoTimePicker");
            if(type == 1){
                $(".startTimePicker").val("00:00");
                $(".endTimePicker").val("00:00");
                readWTSetting();
                timepicker.readonly();
            }else{
                $(".startTimePicker").val("09:00");
                $(".endTimePicker").val("18:00");
                readWTSetting();
                timepicker.readonly(false);
                $(this).attr("readonly", true);
            }
        }
    })

    $("#timeDiff").append(htmlStr);
}

function allApplyRadioGroupMake(type){
    var radioList = new Array();
    $.ajax({
        url : "/workPlan/getWkCommonCodeWpT.do",
        data : {
            wkGroupCodeId : type
        },
        dataType : "json",
        type : "POST",
        async : false,
        success : function(result){
            radioList = result.codeList;
        }
    })
    return radioList;
}

function allWprkTimeApply(e){
    var workTime = $(e).val().split("~");
    $("#workingTime, .w_start_time").val(workTime[0]);
    $("#workTime, .w_end_time").val(workTime[1]);

    var dayWHour = timeReturnToFixed(makeDateForm(workTime) / 60, "2");
    var dayWMin = makeDateForm(workTime);
    var endWorkTime = workTime[1].split(":")[0];
    if(endWorkTime > 13){
        dayWHour -= 1;
        dayWMin -= 60;
    }
    //$("#work_week_time").getKendoRadioGroup().value(dayWHour * 5);
    $("#work_month_time").val(timeReturnToFixed((dayWHour * 5) * 4, "1"));
    $("#dayWorkTimeHour, .day_w_hour").val(timeReturnToFixed(dayWHour, "2"));
    $("#dayWorkTimeMin, .day_w_min").val(dayWMin);
    $("#w_time_sum_hour").val(timeReturnToFixed(dayWHour * 5, "2"));
    $("#w_time_sum_min").val(dayWMin * 5);
}

//날짜 체크
function dateValidationCheck(id, val){
    var sDt;
    var nDt;

    if(id == "start_date" || id == "end_date"){
        sDt = new Date($("#start_date").val());
        nDt = new Date($("#end_date").val());

        if(getDate(sDt) == "토" || getDate(sDt) == "일"){
            alert("휴일엔 근무를 변경할 수 없습니다.");
            $("#start_date").val("");
            return;
        }else if(getDate(nDt) == "토" || getDate(nDt) == "일"){
            alert("휴일엔 근무를 변경할 수 없습니다.");
            $("#end_date").val("");
            return;
        }else if(id == "start_date"){
            if(sDt > nDt){
                $("#end_date").val(val);
            }
        }else{
            if(sDt > nDt){
                $("#start_date").val(val);
            }
        }
    }else{
        sDt = new Date($("#startDay").val());
        nDt = new Date($("#endDay").val());

        if(id == "startDay"){
            if(sDt > nDt){
                $("#endDay").val(val);
            }
        }else{
            if(sDt > nDt){
                $("#startDay").val(val);
            }
        }
    }

}

//단일 적용 근무 시간 분
function singleWTSetting(day){
    var wDayWorkTime;
    var wDayWorkHour;
    var wDayWorkMin;
    var startWorkTime;
    var endWorkTime;

    if(day != null){
        wDayWorkTime = ($("#w_s_time_"+day).val()+"~"+$("#w_e_time_"+day).val()).split("~");
        wDayWorkHour = timeReturnToFixed(makeDateForm(wDayWorkTime) / 60, "2");
        wDayWorkMin = makeDateForm(wDayWorkTime);

        startWorkTime = Number(wDayWorkTime[0].split(":")[0]) + Number(wDayWorkTime[0].split(":")[1]/60);
        endWorkTime = Number(wDayWorkTime[1].split(":")[0]) + Number(wDayWorkTime[1].split(":")[1]/60);

        if(endWorkTime > 13){
            if(startWorkTime >= endWorkTime){
                wDayWorkHour = 0;
                wDayWorkMin = 0;
            }else{
                wDayWorkHour -= 1;
                wDayWorkMin -= 60;
            }
        }

        $("#w_time_"+day+"_hour").val(timeReturnToFixed(wDayWorkHour, "2"));
        $("#w_time_"+day+"_min").val(wDayWorkMin);

        var wTimeSumHour = 0;
        $.each($(".day_w_hour"), function(){
            wTimeSumHour += Number(this.value);
        })

        $("#w_time_sum_hour").val(timeReturnToFixed(wTimeSumHour, "2"));
        $("#w_time_sum_min").val(wTimeSumHour * 60);
        $("#work_month_time").val(timeReturnToFixed(wTimeSumHour * 4, "1"))
    }else{
        wDayWorkTime = ($("#workingTime").val() + "~" + $("#workTime").val()).split("~");
        wDayWorkHour = timeReturnToFixed(makeDateForm(wDayWorkTime) / 60, "2");
        wDayWorkMin = makeDateForm(wDayWorkTime);

        var startWorkTime = Number(wDayWorkTime[0].split(":")[0]) + Number(wDayWorkTime[0].split(":")[1]/60);
        var endWorkTime = Number(wDayWorkTime[1].split(":")[0]) + Number(wDayWorkTime[1].split(":")[1]/60);

        if(endWorkTime > 13){
            if(startWorkTime >= endWorkTime){
                wDayWorkHour = 0;
                wDayWorkMin = 0;
            }else{
                wDayWorkHour -= 1;
                wDayWorkMin -= 60;
            }
        }

        $("#dayWorkTimeHour").val(timeReturnToFixed(wDayWorkHour, "2"));
        $("#dayWorkTimeMin").val(wDayWorkMin);
    }
}

function readWTSetting(){
    $.each($("input[name='dayChk']"), function(){
        singleWTSetting($(this).attr("day"));
    })
}

//일괄 적용 근무 시간 분 변환
function makeDateForm(workTime) {
    var startWorkTime;
    var endWorkTime;

    startWorkTime = (workTime[0].split(":")[0] * 60) + Number(workTime[0].split(":")[1]);
    endWorkTime = (workTime[1].split(":")[0] * 60) + Number(workTime[1].split(":")[1]);
    if(startWorkTime >= endWorkTime){
        return 0;
    }else{
        return endWorkTime - startWorkTime;
    }
}

//근무시간 0체크
function timeReturnToFixed(workTime, pointLength){
    if(workTime > 0){
        return Number(workTime).toFixed(pointLength);
    }else{
        return 0;
    }
}

function workTimeValidationChk(){
    var flag = true;
    $.each($(".timePicker"), function(){
        if(!$(this).closest("tr").hasClass("removeDay") && this.value == "00:00"){
            flag = false;
            return flag;
        }
    });

    return flag;
}

/** work Plan Data Save start */

function workPlanChangeSubSave(){
    var flag = true;

    var wkGroupCode = $("#work_plan_type").data("kendoDropDownList");
    var wkGroupCodeData = wkGroupCode.dataSource.view()[wkGroupCode.selectedIndex];
    var workPlanType = wkGroupCodeData.WK_CODE == 101 ? $("input[name='workPlanType']:checked").attr("id") : wkGroupCodeData.WK_CODE;

    if(!$("#work_plan_type").val()){
        alert("근무 유형을 선택해주세요.");
        flag = false;
        return;
    }else if(getDate(new Date($("#start_date").val())) == "토" || getDate(new Date($("#start_date").val())) == "일"){
        alert("휴일엔 근무를 변경할 수 없습니다.");
        $("#start_date").val("");
        flag = false;
        return;
    }else if(getDate(new Date($("#end_date").val())) == "토" || getDate(new Date($("#end_date").val())) == "일"){
        alert("휴일엔 근무를 변경할 수 없습니다.");
        $("#end_date").val("");
        flag = false;
        return;
    }else if($("input[name='work_week_time']:checked").length == 0){
        alert("주 근무시간을 선택해주세요.");
        flag = false;
        return;
    }else if(!workTimeValidationChk()){
        alert("출퇴근 시간을 올바르게 선택해주세요.");
        flag = false;
        return;
    }

    var timeFlag = true;
    if($("#work_plan_type").val() != "101"){
        var wptList = allApplyRadioGroupMake(1);
        for(var i = 0; i < wptList.length; i++){
            var attendTime = wptList[i].WK_CODE_NM.split("~")[0];
            var leaveTime = wptList[i].WK_CODE_NM.split("~")[1];

            var timeFlagChk = 0;
            for(var j = 0; j < $("input[name='w_s_time']").length; j++){
                if(attendTime == $($("input[name='w_s_time']")[j]).val()){
                    timeFlagChk++;
                }

                if(leaveTime == $($("input[name='w_e_time']")[j]).val()){
                    timeFlagChk++;
                }
            }

            if(timeFlagChk == 10){
                timeFlag = false;
                break;
            }
        }
    }

    if(!timeFlag){
        alert("시차출퇴근제의 근무시간을 선택하셨습니다.");
        return;
    }

    if(confirm("저장하시겠습니까?")){
        if(flag){
            var changeSMonth = new Date($("#start_date").val());
            var changeEMonth = new Date($("#end_date").val());

            var SYear = changeSMonth.getFullYear();
            var SMonth = changeSMonth.getMonth()+1;
            var EYear = changeEMonth.getFullYear();
            var EMonth = changeEMonth.getMonth()+1;
            var intervalMonth = (Number(EYear+""+("00"+(EMonth+1)).slice(-2)) - Number(SYear+""+("00"+(SMonth+1)).slice(-2))) + 1;

            var workPlanChangeArr = new Array();
            for(var i = 0; i < intervalMonth; i++){
                var workPlanChangeDetailArr = new Array();
                var ChangeData = {
                    request_emp_seq : $("#empSeq").val(),
                    request_date : $("#apply_month").val().replaceAll("-", ""),
                    apply_month : SYear+""+("00"+(SMonth+i)).slice(-2),
                    work_plan_type : $("#work_plan_type").val(),
                    work_week_time : "W" + $("#work_week_time").getKendoRadioGroup().value(),
                    work_month_time : $("#work_month_time").val(),
                    start_date : $("#start_date").val().replaceAll("-", ""),
                    end_date : $("#end_date").val().replaceAll("-", ""),
                    request_position : $("#positionCode").val(),
                    request_dept_seq : $("#deptSeq").val(),
                    request_dept_name : $("#deptName").val(),
                    request_duty : $("#dutyCode").val(),
                    apply_reason : $("#apply_reason").val(),
                    appr_stat : "N",
                }

                for(var j = 0; j < monthDiff(); j++){
                    var sameCheckDate = new Date($("#start_date").val());
                    sameCheckDate.setDate(sameCheckDate.getDate() + j);

                    var detailYearMonth = sameCheckDate.getFullYear() + "" + ("00" + (sameCheckDate.getMonth() + 1)).slice(-2);
                    if((getDate(sameCheckDate) != "토요일" || getDate(sameCheckDate) != "일요일") && detailYearMonth == ChangeData.apply_month){
                        $.each($("#byDayWeekWTime tr"), function(){
                            if($(this).find("td:eq(1)").text() == getDate(sameCheckDate) && !$(this).hasClass("removeDay")) {
                                var ChangeDetailData = {
                                    emp_seq : $("#empSeq").val(),
                                    common_code_id : workPlanType,
                                    work_date : detailYearMonth + "" + ("00" + sameCheckDate.getDate()).slice(-2),
                                    weekday : getDate(sameCheckDate),
                                    attend_time : $(this).find("input[name=w_s_time]").val(),
                                    leave_time : $(this).find("input[name=w_e_time]").val(),
                                    changer_dept_name : $("#deptName").val(),
                                    changer_position : $("#positionCode").val(),
                                    changer_duty : $("#dutyCode").val()
                                }
                                workPlanChangeDetailArr.push(ChangeDetailData);
                            }
                        })
                    }
                    sameCheckDate.setDate(sameCheckDate.getDate() - j);
                }
                ChangeData.detailData = workPlanChangeDetailArr;
                workPlanChangeArr.push(ChangeData);
            }

            $.ajax({
                url : "/workPlan/setWorkPlanChangeOrDetail.do",
                data : {
                    workPlanChange : JSON.stringify(workPlanChangeArr)
                },
                dataType : "json",
                type : "POST",
                success : function(rs){
                    var rs = rs.result;
                    alert(rs.message);
                    if(rs.code == "200"){
                        gridReload();
                    }
                }
            })
        }else{
            alert("입력값을 다시 확인해주세요.");
            return
        }
    }
}

/** work Plan Data Save end */

//적용년월의 시작일 종료일의 개월수 차이
function monthDiff(){
    var sDt = new Date($("#start_date").val());
    var eDt = new Date($("#end_date").val());
    var dif = eDt - sDt;
    var cDay = 24 * 60 * 60 * 1000;// 시 * 분 * 초 * 밀리세컨
    var cMonth = cDay * 30;// 월 만듬
    return parseInt(dif/cDay)+1;
}

//날짜 요일
function getDate(changeDate){
    var week = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
    var dayOfWeek = week[changeDate.getDay()];

    return dayOfWeek;
}

/** save util end */


var workPlan = {

    global : {
        now : new Date(),
        statArr : [
            {text : "진행", value : "C"},
            {text : "승인", value : "Y"},
            {text : "반려", value : "E"},
        ],
        dataList : new Array(),
        openerParams : [],
    },

    fn_apprWorkPlanCancel : function(e){
        if(confirm("승인 요청을 취소하시겠습니까?")){
            var data = {
                workPlanChangeId : e
            };
            var ds = customKendo.fn_customAjax("/setApprWorkPlanCancel", data);
            alert(ds.message);
            gridReload();
        }
    },

    schedulerInit : function(){
        var schDataSource = new kendo.data.SchedulerDataSource({
            transport: {
                read: {
                    url : "/workPlan/getWorkPlanDefaultList.do",
                    dataType: "json",
                    async : false,
                },
                parameterMap: function(data) {
                    data.empSeq = $("#empSeq").val();
                    data.status = 'Y';
                    return data;
                }
            },
            schema: {
                data: function (data) {
                    workPlan.global.dataList = data.list;
                    console.log(data.list);
                    return data.list;
                },
                model: {
                    id: "workPlanChangeId",
                    fields: {
                        workPlanChangeId : { from : "WORK_PLAN_CHANGE_ID" },
                        title: {
                            from: "TITLE", defaultValue: "No title",
                            validation: {
                                required: true
                            }
                        },
                        start: { type: "date", from: "START_DATE" },
                        end: { type: "date", from: "END_DATE" },
                        commonCodeId: { from: "COMMON_CODE_ID" },
                    }
                }
            },
            filter: {
                logic: "or",
                filters: [
                    { field: "commonCodeId", operator: "eq", value: 105 },
                ]
            }
        });
        var schRsDs = [];
        for(var i = 0 ; i < workPlan.global.dataList.length ; i++){
            schRsDs.push({ text: workPlan.global.dataList[i].title, value: workPlan.global.dataList[i].commonCodeId });
        }
        var schResources = [
            {
                field : "commonCodeId",
                dataSource : schRsDs
            }
        ];
        kendo.culture("ko-KR");
        $("#scheduler").kendoScheduler({
            date: new Date(),
            startTime: new Date(),
            height: 671,
            views: [
                "month"
            ],
            timezone: "Etc/UTC",
            selectable: false,
            editable : false,
            dataSource: schDataSource,
            resources: schResources,
            /*
            editable : {
                template : $("#customEditorWorkPlanTemplate").html(),
                destroy : false
            },
            */

        });

        $("#scheduler").on("dblclick", ".k-event", function(e){
            var scheduler = $("#scheduler").getKendoScheduler();
            var event = scheduler.occurrenceByUid($(this).data("uid"));
            if(scheduler.viewName() == "month"){
                console.log(event);
                workPlan.global.openerParams = [];
                workPlan.global.openerParams = event;
                popWin = window.open(getContextPath()+"/workPlanReqPop.do", "workPlanReqPop", "width=1030, height=930, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no");
            }else{
            }
        });
    },

    workPlanRegPopup : function(){
        popWin = window.open(getContextPath()+"/workPlanReqPop.do", "workPlanReqPop", "width=1030, height=850, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no");
    },

    gridReload : function(){
        $("#mainGrid").data("kendoGrid").dataSource.read();
    }
}

function openerParams(){
    return workPlan.global.openerParams;
}

function openerParamsReset(){
    workPlan.global.openerParams = [];
    console.log(workPlan.global.openerParams);
}