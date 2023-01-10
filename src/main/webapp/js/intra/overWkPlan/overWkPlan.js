/**
 * 2022.06.28 by. deer
 * 마이페이지 > 복무 > 초과근무
 *
 * function / global variable / local variable setting
 */
var now = new Date();
var menuCd = $("#menuCd").val();

var nowDateWeekNumOfMonth = weekNumOfMonth(now);
$("#nowDateWeekNumOfMonth").text("[" + nowDateWeekNumOfMonth[0] + " " + nowDateWeekNumOfMonth[1] + " " + nowDateWeekNumOfMonth[3] + " 초과근무 현황]");

/** 초과근무 상신 영역 */
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

$("#status").kendoDropDownList({
    dataTextField: "text",
    dataValueField: "value",
    dataSource: [
        { text: "전체", value: "" },
        { text: "미결재", value: "0" },
        { text: "상신", value: "10" },
        { text: "결재진행중", value: "20" },
        { text: "반려", value: "30" },
        { text: "회수", value: "40" },
        { text: "재상신", value: "50" },
        { text: "종결", value: "100" },
    ],
    index: 0
});

/**
 *  초과근무 신청 저장리스트 DataSource
 *  url : /overWorkPlan/getOverWorkPlanReqList.do
 */
var dataSource = new kendo.data.DataSource({
    serverPaging: false,
    transport: {
        read : {
            url : getContextPath()+'/overWorkPlan/getOverWorkPlanReqList.do',
            dataType : "json",
            type : "post"
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
                return '<button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="selectChkDel()">' +
                    '	<span class="k-button-text">선택삭제</span>' +
                    '</button>';
            }
        }, {
            name : 'excel',
            text: '엑셀다운로드'
        }, {
            name : 'button',
            template : function (e){
                return '<button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="gridReload()">' +
                    '	<span class="k-button-text">결재완료 확인(새로고침)</span>' +
                    '</button>';
            }
        }
    ],
    excel : {
        fileName : "초과근무신청 저장 목록.xlsx",
        filterable : true
    },
    noRecords: {
        template: "데이터가 존재하지 않습니다."
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
    columns: [
        {
            headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" class="k-checkbox checkbox"/>',
            template : "<input type='checkbox' id='owpPk#=OVER_WORK_PLAN_ID#' name='owpPk' value='#=OVER_WORK_PLAN_ID#' class='k-checkbox checkbox'/>",
            width: 30
        }, {
            field: "WK_CODE_NM",
            title: "초과근무유형",
            width: 100
        }, {
            field: "APPLY_TIME",
            title: "초과근무시간",
            width: 200
        }, {
            field : "APPLY_HOUR",
            title : "시간",
            width: 80
        }, {
            field: "REG_DATE",
            title: "등록일자",
            width: 100
        }, {
            field: "APPLY_DATE",
            title: "신청일자",
            width: 100
        }, {
            field: "DRAFT_DT",
            title: "기안일자",
            width: 100,
            template : function(e){
                if(e.STATUS != "50"){
                    if(e.DRAFT_DT == null){
                        return "-";
                    }else if (e.DRAFT_DT != null){
                        return e.DRAFT_DT;
                    }
                }else if(e.STATUS == "50"){
                    if(e.REPTIT_DRFT_DT == null){
                        return "-";
                    }else if (e.REPTIT_DRFT_DT != null){
                        return e.REPTIT_DRFT_DT;
                    }
                }
            }
        }, {
            field : "STATUS",
            title : "결재상태",
            template : function(e){
                if(e.STATUS == "0"){
                    return "미결재";
                } else if (e.STATUS == "10"){
                    return "상신";
                } else if (e.STATUS == "30"){
                    return "반려";
                } else if (e.STATUS == "40"){
                    return "회수";
                } else if (e.STATUS == "50"){
                    return "재상신";
                } else if (e.STATUS == "100"){
                    return "최종결재";
                } else if (e.STATUS == "101"){
                    return "최종결재(전결)";
                } else if (e.STATUS == "111"){
                    return "임시저장"
                } else{
                    return "결재진행중"
                }
            },
            width: 80
        }, {
            title : "기안",
            template : function(e){
                if(e.STATUS == "0"){
                    return "<button type='button' class='k-button k-button-md k-rounded-md k-button-solid k-button-solid-base' onclick=\"overWorkPlanDrafting(" + e.OVER_WORK_PLAN_ID + ", 'drafting')\">" +
                        "<span class='k-icon k-i-track-changes-accept k-button-icon'></span>" +
                        "<span class='k-button-text'>상신</span>" +
                        "</button>";
                } else if(e.STATUS == "30" || e.STATUS == "40"){
                    return "<button type='button' class='k-button k-button-md k-rounded-md k-button-solid k-button-solid-base' onclick=\"overWorkPlanReDrafting("+e.DOC_ID+", "+e.OVER_WORK_PLAN_ID+", 'reDrafting')\">" +
                        "<span class='k-icon k-i-track-changes-accept k-button-icon'></span>" +
                        "<span class='k-button-text'>재상신</span>" +
                        "</button>";
                } else if(e.STATUS == "10" || e.STATUS == "20" || e.STATUS == "50"){
                    return "<button type='button' class='k-button k-button-md k-rounded-md k-button-solid k-button-solid-base' onclick=\"overWorkPlanApprovalRetrieve("+e.DOC_ID+", "+e.OVER_WORK_PLAN_ID+", 'retrieve')\">" +
                        "<span class='k-icon k-i-track-changes-reject k-button-icon'></span>" +
                        "<span class='k-button-text'>회수</span>" +
                        "</button>";
                } else if(e.STATUS == "111"){
                    return "<button type='button' class='k-button k-button-md k-rounded-md k-button-solid k-button-solid-base' onclick=\"overWorkPlanTempDrafting("+e.DOC_ID+", "+e.OVER_WORK_PLAN_ID+", 'tempDrafting')\">" +
                        "<span class='k-icon k-i-track-changes-accept k-button-icon'></span>" +
                        "<span class='k-button-text'>상신</span>" +
                        "</button>";
                } else{
                    return "-";
                }
            },
            width: 80
        }]
}).data("kendoGrid");

$("#checkAll").click(function(){
    if($(this).is(":checked")) $("input[name=owpPk]").prop("checked", true);
    else $("input[name=owpPk]").prop("checked", false);
});

/** 초과근무 신청 저장 영역 */
searchCode();

$("#applyDate").kendoDatePicker({
    culture : "ko-KR",
    format : "yyyy-MM-dd",
    value : new Date(),
    change : function (e){
        findApplyDateWorkTime();
    }
});

$("#empName, #workingTime, #applyStartHour, #applyStartTime").kendoTextBox({readonly : true});

$("#applyEndTime").kendoTimePicker({
    format: "HH:mm",
    value : "00:00",
    change : function(e){
        findTimeInterval([$("#applyStartTime").val(), $("#applyEndTime").val()]);
    },
});

$("#applyReason").kendoTextBox();

$("#dinnerTimeUse").kendoRadioGroup({
    items: [
        { label : "사용", value : "Y" },
        { label : "미사용", value : "N" }
    ],
    layout : "horizontal",
    labelPosition : "after",
    change : function (e){
        if($("#applyStartTime").val()){
            findTimeInterval([$("#applyStartTime").val(), $("#applyEndTime").val()]);
        }
    }
}).data("kendoRadioGroup");

$("#remark").kendoTextArea({
    rows:5,
    cols:20,
    resizable: "vertical",
});

findApplyDateWorkTime();

$("#startDay, #endDay, #applyDate").attr("readOnly", true);

/** 저장 데이터 삭제 */
function selectChkDel(){
    var flag = true;

    if($("input[name='owpPk']:checked").length == 0){
        alert("신청서를 선택해주세요.");
        return;
    }else if(!confirm("선택한 데이터를 삭제하시겠습니까?")){
        return;
    }

    var owpAr = new Array();
    var grid = $("#mainGrid").data("kendoGrid");
    $("input[name='owpPk']:checked").each(function(){
        var dataItem = grid.dataItem($(this).closest("tr"));
        if(dataItem.STATUS == "100" || dataItem.STATUS == "20"){
            flag = false;
        }else{
            owpAr.push(this.value);
        }
    })

    if(!flag){
        alert("결재 진행중이거나 종결된 항목은 삭제할 수 없습니다.");
        owpAr = new Array();
        return;
    }

    $.ajax({
        url : getContextPath()+'/overWorkPlan/setOverWorkPlanDel.do',
        data : {
            owpAr : owpAr
        },
        dataType : "json",
        type : "POST",
        success : function (result){
            var rs = result.result;
            alert(rs.message);
            gridReload();
        }
    })
}

/** 결재 관련 함수 */
function overWorkPlanDrafting(overWorkPlanId, type){
    popWin = window.open(getContextPath()+"/overWorkPlan/overWkPlanApprovalPop.do?menuCd=" + menuCd + "&type=" + type + "&overWorkPlanId=" + overWorkPlanId, "overWorkPlanApprovalPop", "width=1030, height=930, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no");
}

function overWorkPlanReDrafting(docId, overWorkPlanId, type){
    popWin = window.open(getContextPath()+"/overWorkPlan/overWkPlanApprovalPop.do?menuCd="+ menuCd + "&docId=" + docId + "&type=" + type + "&overWorkPlanId=" + overWorkPlanId, "overWorkPlanApprovalPop", "width=1030, height=930, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no");
}

function overWorkPlanTempDrafting(docId, overWorkPlanId, type){
    popWin = window.open(getContextPath()+"/overWorkPlan/overWkPlanApprovalPop.do?menuCd="+ menuCd + "&docId=" + docId + "&type=" + type + "&overWorkPlanId=" + overWorkPlanId, "overWorkPlanApprovalPop", "width=1030, height=930, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no");
}

function overWorkPlanApprovalRetrieve(docId, overWorkPlanId, type){
    if(confirm("문서를 회수하시겠습니까?")){
        $.ajax({
            url : getContextPath() + '/approval/setApproveRetrieve.do',
            data : {
                empSeq : $("#empSeq").val(),
                docId : docId,
                overWorkPlanId : overWorkPlanId,
                approveEmpSeq : $("#empSeq").val(),
                cmCodeNm : type
            },
            type : 'POST',
            dataType : "json",
            async : false,
            success : function (){
                alert("문서가 회수되었습니다.");
                gridReload();
            },
            error : function(){
                alert("문서가 회수 중 에러가 발생했습니다.");
            }
        })
    }
}

/** 신청 저장 grid reload */
function gridReload(){
    $("#mainGrid").data("kendoGrid").dataSource.read();
}

/** 날짜 체크 */
function dateValidationCheck(id, val){
    var sDt = new Date($("#startDay").val());
    var nDt = new Date($("#endDay").val());

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

/** save util start */

/** 초과근무 신청 근무코드 */
function searchCode(){
    $.ajax({
        url:getContextPath()+'/overWorkPlan/getWorkCodeList.do',
        data : "wkGroupCode=OW",
        dataType : "json",
        success : function(rs){
            var itemType = rs.rs;
            var defaultType = {
                "WK_CODE" : "",
                "WK_CODE_NM" : "선택"
            }
            itemType.unshift(defaultType);
            $("#applyOverWorkType").kendoDropDownList({
                dataSource : itemType,
                dataValueField : "WK_CODE",
                dataTextField : "WK_CODE_NM",
                index : 0,
            });
        }
    });
}

/** 신청일 근무 시간 */
function findApplyDateWorkTime(){
    $.ajax({
        url : getContextPath()+'/overWorkPlan/getApplyDateWorkTime.do',
        data : {
            empSeq : $("#empSeq").val(),
            applyDate : $("#applyDate").val()
        },
        dataType : "json",
        type : "POST",
        success : function (result){
            var rs = result.rs;
            if(rs == null){
                alert("근무시간이 없습니다.");
                overWorkTotalTime = 0;
                $("#applyEndTime").data("kendoTimePicker").enable(false);
                $("#workingTime").val("");
                $("#applyStartTime").val("");
                $("#applyEndTime").val("00:00");
                $("#overWorkTotalHour").text("0");
                $("#overWorkTotalMin").text("00");
                return;
            }else if(rs.LEAVE_TIME == null || rs.LEAVE_TIME == "") {
                alert("근무시간이 없습니다.");
                overWorkTotalTime = 0;
                $("#applyEndTime").data("kendoTimePicker").enable(false);
                $("#workingTime").val("");
                $("#applyStartTime").val("");
                $("#applyEndTime").val("00:00");
                $("#overWorkTotalHour").text("0");
                $("#overWorkTotalMin").text("00");
                return;
            }
            $("#workingTime").val(rs.WORKING_TIME);

            var applyStartHour = rs.LEAVE_TIME.split(":")[0];
            var applyStartMin = rs.LEAVE_TIME.split(":")[1];
            var applyStartTime = Number(applyStartHour) + 1 + ":" + applyStartMin;
            $("#applyStartTime").val(applyStartTime);
            $("#applyEndTime").data("kendoTimePicker").value(applyStartTime);
            $("#applyEndTime").data("kendoTimePicker").min(applyStartTime);
            $("#applyEndTime").data("kendoTimePicker").enable(true);
            $("#applyEndTime").attr("readOnly", true);
            $("#overWorkTotalHour").text("0");
            $("#overWorkTotalMin").text("00");

        }
    })
}

/** 초과 근무 시간 시간차 */
var overWorkTotalTime;
function findTimeInterval(workTime) {
    var startWorkTime;
    var endWorkTime;
    var chkVal = getApplyDateOwpCheck();

    if(chkVal != null){
        //해당 일자로 근무시간, 신청시간 초기화
        if(chkVal.result == "20"){
            alert("해당 일자에 결재 진행중인 초과근무 목록이 존재합니다.");
            findApplyDateWorkTime();
            return;
        }else if(chkVal.result == "100"){
            alert("해당 일자에 중복되는 초과근무 목록이 존재합니다.");
            findApplyDateWorkTime();
            return;
        }
    }

    startWorkTime = (workTime[0].split(":")[0] * 60) + Number(workTime[0].split(":")[1]);
    endWorkTime = (workTime[1].split(":")[0] * 60) + Number(workTime[1].split(":")[1]);

    overWorkTotalTime = endWorkTime - startWorkTime;
    // if(overWorkTotalTime > 180){
    // 	alert("초과근무는 일 3시간을 초과할 수 없습니다.");
    // 	overWorkTotalTime = 180;
    // 	$("#applyEndTime").data("kendoTimePicker").value((startWorkTime + overWorkTotalTime)/60 + ":" + ("00"+(startWorkTime + overWorkTotalTime)%60).slice(-2));
    // }

    if($("#dinnerTimeUse").getKendoRadioGroup().value() == "Y"){
        overWorkTotalTime = overWorkTotalTime - 60 < 0 ? 0 : overWorkTotalTime - 60;
    }

    $("#overWorkTotalHour").text(parseInt(overWorkTotalTime/60));
    $("#overWorkTotalMin").text(("00"+overWorkTotalTime%60).slice(-2));
}

function timeReturnToFixed(workTime, pointLength){
    if(workTime > 0){
        return Number(workTime).toFixed(pointLength);
    }else{
        return 0;
    }
}

/** 저장 */
function getApplyDateOwpCheck(){
    var result;

    $.ajax({
        url : getContextPath()+'/common/getApplyDateOwpCheck.do',
        data : {
            empSeq : $("#empSeq").val(),
            applyDate : $("#applyDate").val(),
            startTime : $("#applyStartTime").val(),
            endTime : $("#applyEndTime").val(),
        },
        dataType : "json",
        type : "POST",
        async : false,
        success : function (rs){
            result = rs.rs;
        }
    })

    return result;
}

function overWorkApplySave(){
    var flag = true;
    var chkVal = getApplyDateOwpCheck();

    if(chkVal != null){
        if(chkVal.result == "20"){
            alert("해당 일자에 결재 진행중인 초과근무 목록이 존재합니다.");
            flag = false;
            return;
        }else if(chkVal.result == "100"){
            alert("해당 일자에 중복되는 초과근무 목록이 존재합니다.");
            flag = false;
            return;
        }
    }

    if(!$("#empSeq").val()){
        alert("신청자가 선택되지 않았습니다.");
        flag = false;
        return;
    }else if(!$("#workingTime").val()){
        alert("신청일에 근무시간이 없습니다.");
        flag = false;
        return;
    }else if(!$("#applyStartTime").val()){
        alert("신청시작 시간이 없습니다.");
        flag = false;
        return;
    }else if(!$("#applyEndTime").val()){
        alert("신청종료 시간이 없습니다.");
        flag = false;
        return;
    }else if(!$("#applyReason").val()){
        alert("업무내용을 입력해주세요.");
        flag = false;
        return;
    }

    if(confirm("신청내용을 저장하시겠습니까?")){
        if(flag){
            $.ajax({
                url : getContextPath()+'/overWorkPlan/setOverWorkPlan.do',
                data : {
                    request_emp_seq : $("#empSeq").val(),
                    request_position : $("#positionCode").val(),
                    request_dept_seq : $("#deptSeq").val(),
                    request_dept_name : $("#deptName").val(),
                    request_duty : $("#dutyCode").val(),
                    apply_over_workType : $("#applyOverWorkType").val(),
                    apply_date : $("#applyDate").val(),
                    apply_start_hour : $("#applyStartTime").val().split(":")[0],
                    apply_start_min : $("#applyStartTime").val().split(":")[1],
                    apply_end_hour : $("#applyEndTime").val().split(":")[0],
                    apply_end_min : $("#applyEndTime").val().split(":")[1],
                    apply_hour : overWorkTotalTime,
                    apply_reason : $("#applyReason").val(),
                    dinner_time_use : $("#dinnerTimeUse").getKendoRadioGroup().value(),
                    remark : $("#remark").val()
                },
                dataType : "json",
                type : "POST",
                success : function (rs){
                    var rs = rs.result;
                    alert(rs.message);
                    if(rs.code == "200"){
                        gridReload();
                    }
                }
            })
        }else{
            alert("입력값을 확인해주세요.");
        }
    }
}
/** save util end */