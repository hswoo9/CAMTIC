/**
 * 2022.06.28 by. deer
 * 마이페이지 > 복무 > 초과근무
 *
 * function / global variable / local variable setting
 */
var now = new Date();
var menuCd = $("#menuCd").val();

$("#checkAll").click(function(){
    if($(this).is(":checked")) $("input[name=owpPk]").prop("checked", true);
    else $("input[name=owpPk]").prop("checked", false);
});

/** 초과근무 신청 저장 영역 */
searchCode();

$("#empName, #workingTime, #applyStartHour, #applyStartTime").kendoTextBox({readonly : true});

$("#startDay, #endDay, #applyDate").attr("readOnly", true);

/** 저장 데이터 삭제 */
function selectChkDel(){
    var flag = true;

    if($("input[name='owpPk']:checked").length == 0){
        alert("삭제할 데이터를 선택해주세요.");
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
        url : '/overWk/setOverWorkPlanDel.do',
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
    popWin = window.open(getContextPath()+"//overWkPlanApprovalPop.do?menuCd=" + menuCd + "&type=" + type + "&overWorkPlanId=" + overWorkPlanId, "overWorkPlanApprovalPop", "width=1030, height=930, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no");
}

function overWorkPlanReDrafting(docId, overWorkPlanId, type){
    popWin = window.open(getContextPath()+"//overWkPlanApprovalPop.do?menuCd="+ menuCd + "&docId=" + docId + "&type=" + type + "&overWorkPlanId=" + overWorkPlanId, "overWorkPlanApprovalPop", "width=1030, height=930, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no");
}

function overWorkPlanTempDrafting(docId, overWorkPlanId, type){
    popWin = window.open(getContextPath()+"//overWkPlanApprovalPop.do?menuCd="+ menuCd + "&docId=" + docId + "&type=" + type + "&overWorkPlanId=" + overWorkPlanId, "overWorkPlanApprovalPop", "width=1030, height=930, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no");
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
        url:'/overWk/getWorkCodeList',
        data : "wkGroupCode=OW",
        dataType : "json",
        success : function(rs){
            var itemType = rs;
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


/** 초과 근무 시간 시간차 */
var overWorkTotalTime;

function timeReturnToFixed(workTime, pointLength){
    if(workTime > 0){
        return Number(workTime).toFixed(pointLength);
    }else{
        return 0;
    }
}

var overWk = {

    global : {
        openerParams : [],
        dataList : new Array(),
    },

    fn_defaultScript : function(){

        $("#spclVacManageTabStrip").kendoTabStrip({
            scrollable: true,
            animation:  {
                open: {
                    effects: "fadeIn"
                }
            }
        }).data("kendoTabStrip").select(0);

        overWk.schedulerInit();

        //$("#nowDateWeekNumOfMonth").text("[" + "2023년" + " " + "04월" + " " + "2째주" + " 초과근무 현황]");

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
                { text: "미승인", value: "E" },
                { text: "승인", value: "Y" },
            ],
            index: 0
        });

        /**
         *  초과근무 신청 저장리스트 DataSource
         *  url : /overWk/getOverWorkPlanReqList
         */
        var dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/overWk/getOverWorkPlanReqList',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data, operation) {
                    data.empSeq = $("#empSeq").val();
                    //data.status = 'N';
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="overWk.overWkPlanPopup()">' +
                            '	<span class="k-button-text">신청</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="selectChkDel()">' +
                            '	<span class="k-button-text">삭제</span>' +
                            '</button>';
                    }
                }
            ],
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
                    template : "<input type='checkbox' id='owpPk#=OVER_WORK_PLAN_ID#' name='owpPk' value='#=OVER_WORK_PLAN_ID#' class='k-checkbox checkbox'/>",
                    width: 40
                }, {
                    field: "",
                    title: "순번",
                    width: "50px",
                }, {
                    field: "DEPT_NAME",
                    title: "부서",
                    width: "150px"
                }, {
                    field : "EMP_NAME",
                    title : "성명",
                    width: "80px"
                }, {
                    field: "WK_CODE_NM",
                    title: "시간외근무유형",
                    width: 100
                }, {
                    field: "APPLY_TIME",
                    title: "시간외근무시간",
                    width: 200
                }, {
                    field : "APPLY_HOUR",
                    title : "신청시간",
                    width: 80
                }, {
                    field : "AGREE_HOUR",
                    title : "인정시간",
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
                    title: "요청일자",
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
                    field : "",
                    title : "진행 상태",
                    template : function(e){
                        var apprStat = e.APPR_STAT;
                        if(apprStat != null){
                            if(apprStat == "N"){
                                return "대기";
                            } else if(apprStat == "Y"){
                                return "승인";
                            } else if(apprStat == "C"){
                                return "진행중";
                            } else if(apprStat =="E"){
                                return "반려";
                            }
                        }else{
                            return "-";
                        }
                    },
                    width: 80
                },{
                    field: "",
                    title: "승인 요청",
                    width: "70px"
                }]
        }).data("kendoGrid");

    },

    fn_apprOverWkPlanCancel : function(key){
        if(confirm("승인 요청을 취소하시겠습니까?")){
            var data = {
                overWorkPlanId : key
            };
            var ds = customKendo.fn_customAjax("//setApprOverWkPlanCancel", data);
            alert(ds.message);
            gridReload();
            customKendo.fn_kendoWindowClose("approveMemberPop");
        }
    },

    overWkPlanPopup : function(){
        popWin = window.open(getContextPath()+"/overWkPop.do", "workPlanReqPop", "width=1030, height=430, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no");
    },

    schedulerInit : function(){

        var schColor = ["#F7EFE5", "#B9F3FC", "#93C6E7", "#A084DC", "#E8D2A6", "#03C988", "#FFC93C"];

        var schDataSource = new kendo.data.SchedulerDataSource({
            transport: {
                read: {
                    url : '/overWk/getOverWorkPlanReqList',
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
                    console.log(data);
                    return data.data;
                },
                model: {
                    id: "overWorkPlanId",
                    fields: {
                        overWorkPlanId : { from : "OVER_WORK_PLAN_ID" },
                        empSeq : { from : "EMP_SEQ" },
                        title: {
                            from: "WK_CODE_NM", defaultValue: "No title",
                            validation: {
                                required: true
                            }
                        },
                        start: { type: "date", from: "START_DATE" },
                        end: { type: "date", from: "END_DATE" },
                        totalDate : { from : "TOTAL_DATE" },
                        status : { from : "STATUS" },
                    }
                }
            },
            filter: {
                logic: "or",
                filters: [
                    { field: "status", operator: "eq", value: 0 },
                ]
            }
        });
        var schRsDs = [];
        for(var i = 0 ; i < overWk.global.dataList.length ; i++){
            schRsDs.push({ text: overWk.global.dataList[i].title, value: overWk.global.dataList[i].status });
        }
        var schResources = [
            {
                field : "status",
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
                overWk.global.openerParams = [];
                overWk.global.openerParams = event;
                popWin = window.open(getContextPath() +"/overWkPop.do?overWorkPlanId="+event.id, "workPlanReqPop", "width=1100, height=450, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no");
            }else{
            }
        });
    },

}

function openerParams(){
    return overWk.global.openerParams;
}

function openerParamsReset(){
    overWk.global.openerParams = [];
    console.log(overWk.global.openerParams);
}

/** save util end */