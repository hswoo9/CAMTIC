var holidayWorkApplication ={
    global: {
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

    init: function(){
        holidayWorkApplication.dataSet();
        holidayWorkApplication.gridReload();
    },

    dataSet : function() {

        let data = {
            mcCode : holidayWorkApplication.global.mcCode,
            mdCode : holidayWorkApplication.global.mdCode,
            empSeq : holidayWorkApplication.global.empSeq
        }
        holidayWorkApplication.global.vacGubun = customKendo.fn_customAjax("/attend/getVacCodeList2", data);
        const ds = holidayWorkApplication.global.vacGubun;

        ds.list.unshift({"SUBHOLIDAY_DT_CODE_NM" : "전체", "SUBHOLIDAY_CODE_ID" : "" });
        $("#edtHolidayKindTop").kendoDropDownList({
            dataSource : ds.list,
            dataTextField: "SUBHOLIDAY_DT_CODE_NM",
            dataValueField: "SUBHOLIDAY_CODE_ID",
        });

        // customKendo.fn_datePicker("startDate", '', "yyyy-MM-dd", new Date(holidayWorkApplication.global.now.setMonth(holidayWorkApplication.global.now.getMonth() - 1)));
        customKendo.fn_datePicker("workDay", '', "yyyy-MM-dd", new Date());

        $("#status").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                { text: "작성중", value: "N" },
                { text: "제출", value: "C" },
                { text: "승인", value: "Y" },
                { text: "반려", value: "E" },
                { text: "회수", value: "D" }
            ],
            index: 0
        });


    },


    mainGrid: function(url, params) {
        $("#mainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
            sortable: true,
            scrollable: true,
            height: 508,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount : 5
            },
            dataBound: function(e) {
                var gridData = this.dataSource.view(); // 현재 페이지의 데이터 가져오기
                console.log("Kendo UI Grid 데이터:", gridData);
            },
            toolbar: [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="holidayWorkApplication.gridReload();">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                },
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="holidayWorkApplication.delBtn();">' +
                            '	<span class="k-button-text">삭제</span>' +
                            '</button>';
                    }
                },
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="holidayWorkApplication.subHolidayReqPop2();">' +
                            '	<span class="k-button-text">신청</span>' +
                            '</button>';
                    }
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound : holidayWorkApplication.onDataBound,
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" onclick="holidayWorkApplication.fn_checkAll();" class=""/>',
                    template : function(e){
                        if(e.APPR_STAT == "N"){
                            return "<input type='checkbox' id='hisPk#=SUBHOLIDAY_USE_ID#' name='hisPk' value=\""+e.SUBHOLIDAY_USE_ID+"\" class=''/>";
                        } else {
                            return "";
                        }
                    },
                    width: 80
                },
                {
                    field: "ROW_NUM",
                    title: "순번",
                    width: 80
                },
                {
                    field:"SUBHOLIDAY_DT_CODE_NM",
                    title:"구분",
                    width:250
                },
                {
                    title:"신청일자",
                    field: "APPLY_DAY",
                    width:"15%"
                },
                {
                    field: "SUBHOLIDAY_WORK_DAY",
                    title: "근로일자",
                    width: 200
                }, {
                    field: "APPR_STAT",
                    title: "승인상태",
                    width: "20%",
                    template : function(e){
                        if(e.APPR_STAT == "N"){
                            return "작성 중";
                        } else if(e.APPR_STAT == "Y"){
                            return "승인";
                        } else if(e.APPR_STAT =="C"){
                            return "제출";
                        } else if(e.APPR_STAT =="E"){
                            return "반려";
                        }else if(e.APPR_STAT =="D"){
                            return "회수";
                        }
                    },
                    width: 200,
                }, {
                    title: "승인요청",
                    template : function(e){
                        if(e.APPR_STAT == "N"){
                            return "<button type='button' class='k-button k-button-md k-button-solid k-button-solid-base approvalPopup' onclick='holidayWorkApplication.workHolidayDrafting(\""+e.SUBHOLIDAY_USE_ID+"\");'>" +
                                "<span class='k-icon k-i-track-changes-accept k-button-icon'></span>" +
                                "<span class='k-button-text'>상신</span>" +
                                "</button>";
                        } else if(e.APPR_STAT == "E"){
                            return "<button type='button' class='k-button k-button-md k-button-solid k-button-solid-base approvalPopup' onclick='tempOrReDraftingPop(\""+e.DOC_ID+"\", \""+e.DOC_MENU_CD+"\", \""+e.APPRO_KEY+"\", 2, \"reDrafting\", \"target\");'>" +
                                "<span class='k-icon k-i-track-changes-accept k-button-icon'></span>" +
                                "<span class='k-button-text'>재상신</span>" +
                                "</button>";
                        } else if(e.APPR_STAT == "Y"){
                            return "<button type='button' class='k-button k-button-md k-button-solid k-button-solid-base approvalPopup' onclick='approveDocView(\""+e.DOC_ID+"\", \""+e.APPRO_KEY+"\", \""+e.DOC_MENU_CD+"\");'>" +
                                "<span class='k-icon k-i-track-changes-accept k-button-icon'></span>" +
                                "<span class='k-button-text'>열람</span>" +
                                "</button>";
                        } else if(e.APPR_STAT =="C"){
                            if(e.AB_APPR_STAT != null && e.AB_APPR_STAT != ""){
                                if(e.AB_APPR_STAT == "I"){
                                    return "<button type='button' class='k-button k-button-md k-button-solid k-button-solid-base' onclick='docApprovalRetrieve(\""+e.DOC_ID+"\", \""+e.APPRO_KEY+"\", 1, \"retrieve\");'>" +
                                        "<span class='k-icon k-i-x-circle k-button-icon'></span>" +
                                        "<span class='k-button-text'>회수</span>" +
                                        "</button>";
                                }else{
                                    return "<button type='button' class='k-button k-button-md k-button-solid k-button-solid-base' onclick='docApprovalRetrieve(\""+e.DOC_ID+"\", \""+e.APPRO_KEY+"\", 1, \"retrieve\");'>" +
                                        "<span class='k-icon k-i-x-circle k-button-icon'></span>" +
                                        "<span class='k-button-text'>회수</span>" +
                                        "</button>";
                                }
                            }else{
                                return "<button type='button' class='k-button k-button-md k-button-solid k-button-solid-base' onclick='docApprovalRetrieve(\""+e.DOC_ID+"\", \""+e.APPRO_KEY+"\", 1, \"retrieve\");'>" +
                                    "<span class='k-icon k-i-x-circle k-button-icon'></span>" +
                                    "<span class='k-button-text'>회수</span>" +
                                    "</button>";
                            }
                        } else {
                            return "-";
                        }
                    }
                }]
        }).data("kendoGrid");
    },

    onDataBound : function(){
        var grid = this;

        grid.tbody.find("tr").dblclick(function (e) {
            var dataItem = grid.dataItem($(this));

            var url = "/subHoliday/pop/subHolidayReqPop2.do?subholidayUseId=" + dataItem.SUBHOLIDAY_USE_ID + "&apprStat=" + dataItem.APPR_STAT;
            var name = "subHolidayReqPop2";
            var option = "width=1030, height=850, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
            var popup = window.open(url, name, option);
        });
    },

    subHolidayReqPop2 : function() {
        var url = "/subHoliday/pop/subHolidayReqPop2.do";
        var name = "subHolidayReqPop2";
        var option = "width=1030, height=850, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    },

    workHolidayDrafting : function(subHolidayId) {
        $("#subHolidayId").val(subHolidayId);
        $("#subHolidayDraftFrm").one("submit", function() {
            var url = "/popup/subHoliday/approvalFormPopup/workHolidayUserApprovalPop.do";
            var name = "workHolidayUserApprovalPop";
            var option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=yes, scrollbars = yes, status=no, top=50, left=50";
            var popup = window.open(url, name, option);
            this.action = "/popup/subHoliday/approvalFormPopup/workHolidayUserApprovalPop.do";
            this.method = 'POST';
            this.target = 'workHolidayUserApprovalPop';
        }).trigger("submit");
    },

    fn_checkAll: function(){
        if($("#checkAll").is(":checked")) {
            $("input[name='hisPk']").prop("checked", true);
        }else{
            $("input[name='hisPk']").prop("checked", false);
        }
    },

    delBtn: function(){
        let checkedList = new Array();
        $.each($("input[name='hisPk']:checked"), function(i,v){
            checkedList.push(this.value);
        });

        if(checkedList.length == 0){
            alert('삭제 할 항목을 선택해 주세요.');
            return;
        }

        if(!confirm("삭제 하시겠습니까?")){
            return;
        }

        var result = customKendo.fn_customAjax("/Inside/setHistoryWorkApplyDel.do", {subHolidayUseId : checkedList.join()});
        if(result.flag){
            alert("휴가 작성내역이 삭제되었습니다.");
            holidayWorkApplication.gridReload();
        }
    },

    gridReload: function (){
        console.log('gridReload 함수 호출됨');

        holidayWorkApplication.global.searchAjaxData = {
            workDay: $("#workDay").val(),
            status: $("#status").val()
        };

        var workDay = holidayWorkApplication.global.searchAjaxData.workDay;
        // var endDate = holidayWorkApplication.global.searchAjaxData.endDate;
        // var edtHolidayKindTop = holidayWorkApplication.global.searchAjaxData.edtHolidayKindTop;
        var status = holidayWorkApplication.global.searchAjaxData.status;

        console.log('workDay:' + workDay);
        // console.log('endDate:' + endDate);
        // console.log('edtHolidayKindTop' + edtHolidayKindTop);
        console.log('status:' + status);

        holidayWorkApplication.mainGrid('/Inside/holidayWorkApplication.do', holidayWorkApplication.global.searchAjaxData);
    }


}