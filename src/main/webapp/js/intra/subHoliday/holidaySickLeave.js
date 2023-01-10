/**
 * 2022.06.28 by. deer
 * 마이페이지 > 복무 > 근무상황 > 병가
 *
 * function / global variable / local variable setting
 */
searchCode();
var menuCd = $("#menuCd").val();
var mcCode = "V";
var mdCode = "03";
var now = new Date();
var nowYear = now.getFullYear();
var nowMonth = now.getMonth();
var nowDay = now.getDate();
var docContent = "";

var popWin = "";
var popWin2 = "";

$("#endDay").kendoDatePicker({
    culture : "ko-KR",
    format : "yyyy-MM-dd",
    value : new Date()
});

$("#startDay").kendoDatePicker({
    culture : "ko-KR",
    format : "yyyy-MM-dd",
    value : new Date(now.setMonth(now.getMonth() - 1))
});

$("#startDay, #endDay").attr("readonly", true);

$("#docSts").kendoDropDownList({
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

searchCode();

function searchCode(){
    $.ajax({
        url : getContextPath()+"/subHoliday/getVacCommonSickOfficialLeaveCodeList.do",
        data : {
            mcCode : mcCode,
            mdCode : mdCode,
            empSeq : $("#empSeq").val()
        },
        dataType : "json",
        success : function(result){
            var itemType = result.codeList;
            var defaultType = {
                "VAC_CODE_ID" : "",
                "VAC_DT_CODE_NM" : "선택"
            }

            itemType.unshift(defaultType);
            $("#applyVacationDivision").kendoDropDownList({
                dataSource : itemType,
                dataValueField : "VAC_CODE_ID",
                dataTextField : "VAC_DT_CODE_NM",
                index : 0,
            });
        }
    });
}

/**
 *  휴가 신청 저장리스트 DataSource v_vac_use_hist
 *  url : /subHoliday/getVacUseHistoryList.do
 */
var dataSource = new kendo.data.DataSource({
    serverPaging: false,
    transport: {
        read : {
            url : getContextPath()+"/subHoliday/getVacUseHistoryList.do",
            dataType : "json",
            type : "post",
            async : false
        },
        parameterMap: function(data, operation) {
            data.empSeq = $("#empSeq").val();
            data.docSts = $("#docSts").val();
            data.startDay = $("#startDay").val();
            data.endDay = $("#endDay").val();
            data.mdCode = mdCode;
            data.applyVacationDivision = $("#applyVacationDivision").val();

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
        model: {
            id: "VAC_USE_HIST_ID"
        }
    },
    pageSize: 10,
});

var mainGrid = $("#mainGrid").kendoGrid({
    dataSource: dataSource,
    height: 522,
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
            template : function (){
                return "<button type=\"button\" class=\"k-grid-add k-button k-button-md k-rounded-md k-button-solid k-button-solid-base\" id=\"setMainGridAddRow\">" +
                    '		<span class="k-icon k-i-plus k-button-icon"></span>' +
                    '		<span class="k-button-text">신규</span>' +
                    '	</button>';
            }
        }
    ],
    excel : {
        fileName : "휴가신청 저장 목록.xlsx",
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
            template : "<input type='checkbox' id='hisPk#=VAC_USE_HIST_ID#' name='hisPk' value='#=VAC_USE_HIST_ID#' class='k-checkbox checkbox'/>",
            width: 40
        }, {
            field: "VAC_DT_CODE_NM",
            title: "휴가구분",
            width: 150,
            editor : vacEditorDropDownSetting,
        }, {
            title: "기간 또는 일시",
            columns : [
                {
                    field: "VAC_USE_ST_DT",
                    title: "부터",
                    width: 190,
                    editor : vacEditorDatePickerSSetting,
                }, {
                    field: "VAC_USE_EN_DT",
                    title: "까지",
                    width: 190,
                    editor : vacEditorDatePickerESetting,
                }, {
                    field: "VAC_USE_DAY",
                    title: "일수 · 시간",
                    width: 100,
                    editor : vacEditorCalSetting,
                }
            ]
        }, {
            field: "RMK",
            title: "사유",
            align:"center"
        }, {
            field: "DRAFT_DT",
            title: "기안일자",
            align:"center",
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
            },
            editor : vacEditorSettingCancel
        }, {
            field: "PROOF_FILE_YN",
            title: "증빙제출",
            align:"center",
            width: 120,
            template : function(e){
                if(e.STATUS != "111" && e.STATUS != "0" && e.STATUS != "40"){
                    if(e.PROOF_FILE_YN == "N"){
                        return '<button type="button" class="k-button k-rounded k-button-solid k-button-solid-error" onclick="vacProofFileModalOpen('+e.VAC_USE_HIST_ID+')">증빙 제출</button>';
                    }else if (e.PROOF_FILE_YN == "Y"){
                        return '<button type="button" class="k-button k-rounded k-button-solid k-button-solid-info" onclick="vacProofFileViewModalOpen('+e.VAC_USE_HIST_ID+')">증빙 제출 완료</button>';
                    }
                }else{
                    return "-"
                }
            },
            editor : vacEditorSettingCancel
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
            width: 100,
            editor : vacEditorSettingCancel
        }, {
            title : "기안",
            template : function(e){
                if(e.STATUS == "0"){
                    return "<button type='button' class='k-button k-button-md k-rounded-md k-button-solid k-button-solid-base' onclick=\"vacationDrafting("+e.VAC_USE_HIST_ID+", 'drafting')\">" +
                        "<span class='k-icon k-i-track-changes-accept k-button-icon'></span>" +
                        "<span class='k-button-text'>상신</span>" +
                        "</button>";
                } else if(e.STATUS == "30" || e.STATUS == "40"){
                    return "<button type='button' class='k-button k-button-md k-rounded-md k-button-solid k-button-solid-base' onclick=\"vacationReDrafting("+e.DOC_ID+", "+e.VAC_USE_HIST_ID+", 'reDrafting')\">" +
                        "<span class='k-icon k-i-track-changes-accept k-button-icon'></span>" +
                        "<span class='k-button-text'>재상신</span>" +
                        "</button>";
                } else if(e.STATUS == "10" || e.STATUS == "20" || e.STATUS == "50"){
                    return '<button type="button" class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="docApprovalRetrieve('+e.DOC_ID+',\'episHoliday_' + e.VAC_USE_HIST_ID+'\',\'retrieve\')">' +
                        "<span class='k-icon k-i-track-changes-reject k-button-icon'></span>" +
                        "<span class='k-button-text'>회수</span>" +
                        "</button>";
                } else if(e.STATUS == "100"){
                    return "-";
                } else if (e.STATUS == "101"){
                    return "-";
                } else if(e.STATUS == "111"){
                    return "<button type='button' class='k-button k-button-md k-rounded-md k-button-solid k-button-solid-base' onclick=\"vacationTempDrafting("+e.DOC_ID+", "+e.VAC_USE_HIST_ID+", 'tempDrafting')\">" +
                        "<span class='k-icon k-i-track-changes-accept k-button-icon'></span>" +
                        "<span class='k-button-text'>상신</span>" +
                        "</button>";
                } else {
                    return "<button type='button' class='k-button k-button-md k-rounded-md k-button-solid k-button-solid-base' onclick='vacationSave()'>" +
                        "<span class='k-icon k-i-track-changes-accept k-button-icon'></span>" +
                        "<span class='k-button-text'>상신</span>" +
                        "</button>";
                }
            },
            width: 100,
        }],
    editable: "inline"
}).data("kendoGrid");

$("#checkAll").click(function(){
    if($(this).is(":checked")) $("input[name=hisPk]").prop("checked", true);
    else $("input[name=hisPk]").prop("checked", false);
});

$("#setMainGridAddRow").on("click", function(){
    $("#mainGrid").data("kendoGrid").dataSource.page(1);
    mainGrid.addRow();
})

function vacationDrafting(vacUseHistId, type){
    popWin = window.open(getContextPath()+"/subHoliday/holidayApprovalPop.do?menuCd="+ menuCd +"&type="+ type +"&vacUseHistId="+vacUseHistId, "holidayApprovalPop", "width=1030, height=930, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no");
}

function vacationReDrafting(docId, vacUseHistId, type){
    popWin = window.open(getContextPath()+"/subHoliday/holidayApprovalPop.do?menuCd="+ menuCd + "&docId=" + docId + "&type=" + type + "&vacUseHistId="+vacUseHistId, "holidayApprovalPop", "width=1030, height=930, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no");
}

function vacationTempDrafting(docId, vacUseHistId, type){
    popWin = window.open(getContextPath()+"/subHoliday/holidayApprovalPop.do?menuCd="+ menuCd + "&docId=" + docId + "&type=" + type + "&vacUseHistId="+vacUseHistId, "holidayApprovalPop", "width=1030, height=930, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no");
}

/** kendo row add Event start */
function vacEditorDropDownSetting(container) {
    $.ajax({
        url : getContextPath()+"/subHoliday/getVacCommonSickOfficialLeaveCodeList.do",
        data : {
            mcCode : "V",
            mcCode : mcCode,
            mdCode : mdCode,
            empSeq : $("#empSeq").val()
        },
        dataType : "json",
        success : function(result){
            var itemType2 = result.codeList;
            var defaultType = {
                "VAC_CODE_ID" : "",
                "VAC_DT_CODE_NM" : "선택"
            }
            itemType2.unshift(defaultType);

            $('<input id="vacationDivision" data-text-field="text" data-value-field="value"/>').appendTo(container).kendoDropDownList({
                dataSource : itemType2,
                dataValueField : "VAC_CODE_ID",
                dataTextField : "VAC_DT_CODE_NM",
                index : 0
            });
        }
    });
}

function vacEditorDatePickerSSetting(container) {
    $('<input id="vacationStartDt" data-text-field="text" data-value-field="value"/>').appendTo(container).kendoDateTimePicker({
        culture : "ko-KR",
        format : "yyyy-MM-dd HH:mm",
        interval : 1,
        value : new Date(nowYear, nowMonth, nowDay, '09', '00'),
        min : new Date(nowYear, nowMonth, nowDay, '09', '00'),
        change : function(e){
            dateValidationCheck('vacationStartDt', this.value)
        }
    });
}

function vacEditorDatePickerESetting(container) {
    $('<input id="vacationEndDt" data-text-field="text" data-value-field="value"/>').appendTo(container).kendoDateTimePicker({
        culture : "ko-KR",
        format : "yyyy-MM-dd HH:mm",
        interval : 1,
        value : new Date(nowYear, nowMonth, nowDay, '18', '00'),
        min : new Date(nowYear, nowMonth, nowDay, '09', '00'),
        change : function(e){
            dateValidationCheck('vacationEndDt', this.value)
        }
    });
}

function vacEditorCalSetting(container){
    $('<input id="applyPeriod" type="hidden" readonly/>').appendTo(container);
    $('<input id="applyHour" type="hidden" readonly/>').appendTo(container)
    $('<span id="applyPeriodHourStr">0(0)</span>').appendTo(container);
}

function vacEditorSettingCancel(container){
    $('').appendTo(container);
}

/** kendo row add Event end */

function gridReload(){
    $("#mainGrid").data("kendoGrid").dataSource.read();
}


/** 휴가 신청서(기안전) 삭제 */
function selectChkDel(){
    var flag = true;

    if($("input[name='hisPk']:checked").length == 0){
        alert("신청서를 선택해주세요.");
        return;
    }else if(!confirm("선택한 데이터를 삭제하시겠습니까?")){
        return;
    }

    var hisAr = new Array();
    var grid = $("#mainGrid").data("kendoGrid");
    $("input[name='hisPk']:checked").each(function(){
        var dataItem = grid.dataItem($(this).closest("tr"));
        if(dataItem.STATUS == "100" || dataItem.STATUS == "20"){
            flag = false;
        }else{
            hisAr.push(this.value);
        }
    })

    if(!flag){
        alert("결재 진행중이거나 종결된 항목은 삭제할 수 없습니다.");
        hisAr = new Array();
        return;
    }

    $.ajax({
        url : getContextPath()+"/subHoliday/setVacUseHistoryDel.do",
        data : {
            hisAr : hisAr
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

/** 휴가 현황 캘린더 */
var empAttendListData = new kendo.data.SchedulerDataSource({
    transport: {
        read: {
            url : getContextPath()+"/subHoliday/getVacUseHistorySchedulerList.do",
            dataType: "json"
        },
        parameterMap: function(data) {
            data.empSeq = $("#empSeq").val();
            return data;
        }
    },
    schema: {
        data: function (data) {
            return data.rs;
        },
        model: {
            id: "VAC_USE_HIST_ID",
            fields: {
                id: { from: "VAC_USE_HIST_ID", type: "number" },
                title: { from: "DOC_TITLE", defaultValue: "No title", validation: { required: true } },
                start: { type: "date", from: "START_DATE" },
                end: { type: "date", from: "END_DATE" },
                docId: { from: "DOC_ID", type: "number" },
                vacDtCodeNm: { from: "VAC_DT_CODE_NM" },
                empSeq: { from: "DRAFT_EMP_SEQ" },
                empName: { from: "DRAFT_EMP_NAME" },
                vacUseDay: { from: "VAC_USE_DAY" },
                vacUseHour: { from: "VAC_USE_HOUR" },
                approveStatCode: { from: "APPROVE_STAT_CODE" },
                status: { from: "STATUS"}
            }
        }
    }
});

kendoSchedulerSetting(empAttendListData);

/** save util start */

/** 휴가 기간 체크 */
function dateValidationCheck(id, val){
    var sDt = new Date($("#vacationStartDt").val());
    var nDt = new Date($("#vacationEndDt").val());

    if(id == "vacationStartDt"){
        if(sDt > nDt){
            $("#vacationEndDt").val($("#vacationStartDt").val());
        }
    }else if(id == "vacationEndDt"){
        if(sDt > nDt){
            $("#vacationStartDt").val($("#vacationEndDt").val());
        }
    }

    sDt = new Date($("#vacationStartDt").val());
    nDt = new Date($("#vacationEndDt").val());

    if(getDate(sDt) == "토" || getDate(sDt) == "일"){
        alert("휴일엔 휴가를 신청 할 수 없습니다.");
        $("#vacationStartDt").val("");
        return;
    }else if(getDate(nDt) == "토" || getDate(nDt) == "일"){
        alert("휴일엔 휴가를 신청 할 수 없습니다.");
        $("#vacationEndDt").val("");
        return;
    }

    var chkVal = getApplyDateAttCheck($("#vacationStartDt").val(), $("#vacationEndDt").val());
    if(chkVal != null){
        if(chkVal.result == "VAC_FAIL"){
            alert("해당 일자에 중복되는 휴가 목록이 존재합니다");
        }else if(chkVal.result == "TRIP_FAIL"){
            alert("해당 일자에 출장 예정 목록이 존재합니다");
        }
    }
    vacationCal();
}

/** 휴가기간 중 휴가, 출장 체크 */
function getApplyDateAttCheck(vacationStartDt, vacationEndDt){
    var result;

    $.ajax({
        url : getContextPath()+"/common/getApplyDateAttCheck.do",
        data : {
            empSeq : $("#empSeq").val(),
            startDt : vacationStartDt.split(" ")[0],
            startTime : vacationStartDt.split(" ")[1],
            endDt : vacationEndDt.split(" ")[0],
            endTime : vacationEndDt.split(" ")[1]
        },
        dataType : "json",
        type : "post",
        async : false,
        success : function (rs){
            result = rs.rs;
        }
    });

    return result;
}

/** 휴가일 계산 */
function vacationCal(){
    var diff = monthDiff();

    for(var j = 0; j < monthDiff()+1; j++){
        var sameCheckDate = new Date($("#vacationStartDt").val());
        sameCheckDate.setDate(sameCheckDate.getDate() + j);
        if((getDate(sameCheckDate) == "토" || getDate(sameCheckDate) == "일")){
            diff -= 1;
        }
        sameCheckDate.setDate(sameCheckDate.getDate() - j);
    }

    var vacationTime = $("#vacationStartDt").val().split(" ")[1] + "~" +$("#vacationEndDt").val().split(" ")[1];
    var vacationMin = makeDateForm(vacationTime.split("~")[0], vacationTime.split("~")[1]);
    if(vacationTime.split("~")[1].split(":")[0] > 13){
        vacationMin -= 60;
    }

    var applyHour = ((diff * 8 * 60) + vacationMin) / 60;

    $("#applyHour").val(timeReturnToFixed(applyHour, 2));
    $("#applyPeriod").val(timeReturnToFixed(applyHour / 8, 3));
    $("#applyPeriodHourStr").text(timeReturnToFixed(applyHour / 8, 3) + "(" + timeReturnToFixed(applyHour, 2) + ")");
}

/** 날짜 요일 */
function getDate(changeDate){
    var week = ['일', '월', '화', '수', '목', '금', '토'];
    var dayOfWeek = week[changeDate.getDay()];

    return dayOfWeek;
}

/** 적용년월의 시작일 종료일의 일 수 차이 */
function monthDiff(){
    var vacationStartDt = new Date($("#vacationStartDt").val());
    var vacationEndDt = new Date($("#vacationEndDt").val());
    var diffDate = vacationEndDt.getTime() - vacationStartDt.getTime();

    return Math.round(diffDate / (1000 * 60 * 60 * 24)); // 밀리세컨 * 초 * 분 * 시 = 일;
}

/** 일 수 차이가 0일때 */
function makeDateForm(vcatnStartTime, vcatnEndTime) {
    var startVcatnTime;
    var endVcatnTime;

    startVcatnTime = (vcatnStartTime.split(":")[0] * 60) + Number(vcatnStartTime.split(":")[1]);
    endVcatnTime = (vcatnEndTime.split(":")[0] * 60) + Number(vcatnEndTime.split(":")[1]);
    if(startVcatnTime >= endVcatnTime){
        return 0;
    }else{
        return endVcatnTime - startVcatnTime;
    }
}

function timeReturnToFixed(workTime, pointLength){
    if(workTime > 0){
        return Number(workTime).toFixed(pointLength);
    }else{
        return 0;
    }
}

/** 저장 */
function vacationSave() {
    var flag = true;
    var chkVal = getApplyDateAttCheck($("#vacationStartDt").val(), $("#vacationEndDt").val());

    if(chkVal != null) {
        if (chkVal.result == "VAC_FAIL") {
            alert("해당 일자에 중복되는 휴가 목록이 존재합니다");
            flag = false;
            return;
        } else if (chkVal.result == "TRIP_FAIL") {
            alert("해당 일자에 출장 예정 목록이 존재합니다");
            flag = false;
            return;
        }
        if(!flag){
            return;
        }
    }else if (!$("#vacationDivision").val()) {
        alert("휴가구분을 선택해주세요.");
        flag = false;
        return;
    }else if (!$("#vacationStartDt").val()){
        alert("휴가 시작일을 선택해주세요.");
        flag = false;
        return;
    }else if(!$("#vacationEndDt").val()){
        alert("휴가 종료일을 선택해주세요.");
        flag = false;
        return;
    }

    if (confirm("저장하시겠습니까?")) {
        if (flag) {
            var monthStr = "00" + (nowMonth+1);
            var dayStr = "00" + nowDay;
            var data = {
                vacCodeId: $("#vacationDivision").val(),
                applySeq: $("#empSeq").val(),
                applyDate: nowYear + monthStr.substring(monthStr.length-2, monthStr.length) + dayStr.substring(dayStr.length-2, dayStr.length),
                saveSeq: $("#empSeq").val(),
                vacUseStDt: $("#vacationStartDt").val().split(" ")[0],
                vacUseStTime: $("#vacationStartDt").val().split(" ")[1],
                vacUseEndt: $("#vacationEndDt").val().split(" ")[0],
                vacUseEnTime: $("#vacationEndDt").val().split(" ")[1],
                vacUseDay: $("#applyPeriod").val(),
                vacUseHour: $("#applyHour").val(),
                vacUseTime: Number($("#applyHour").val()) * 60,
                rmk: $("#RMK").val(),
                vacTargetSeq: $("#empSeq").val(),
            }
        }

        $.ajax({
            url : getContextPath()+"/subHoliday/setVacUseHist.do",
            data : data,
            dataType : "json",
            type : "post",
            success: function (rs) {
                alert("신청 데이터 저장이 완료되었습니다.");
                gridReload();
                if(confirm("상신 페이지로 이동하시겠습니까?")){
                    vacationDrafting(rs.vacUseHistId, "drafting");
                }
            },
            error: function () {
                alert("신청 데이터 저장 중 에러가 발생했습니다.");
            }
        });
    }
}

function vacProofFileModalOpen(e){
    targetId = e;
    $('#vacProofFileModal').data('kendoWindow').open();
}

/** save util end */