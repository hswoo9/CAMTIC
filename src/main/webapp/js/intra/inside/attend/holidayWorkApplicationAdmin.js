var holidayWorkApplicationAdmin ={
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
        holidayWorkApplicationAdmin.dataSet();
        holidayWorkApplicationAdmin.gridReload();
    },

    dataSet : function() {

        let data = {
            mcCode : holidayWorkApplicationAdmin.global.mcCode,
            mdCode : holidayWorkApplicationAdmin.global.mdCode,
            empSeq : holidayWorkApplicationAdmin.global.empSeq
        }
        holidayWorkApplicationAdmin.global.vacGubun = customKendo.fn_customAjax("/attend/getVacCodeList2", data);
        const ds = holidayWorkApplicationAdmin.global.vacGubun;

        ds.list.unshift({"SUBHOLIDAY_DT_CODE_NM" : "전체", "SUBHOLIDAY_CODE_ID" : "" });
        $("#edtHolidayKindTop").kendoDropDownList({
            dataSource : ds.list,
            dataTextField: "SUBHOLIDAY_DT_CODE_NM",
            dataValueField: "SUBHOLIDAY_CODE_ID",
        });

        // customKendo.fn_datePicker("startDate", '', "yyyy-MM-dd", new Date(holidayWorkApplicationAdmin.global.now.setMonth(holidayWorkApplicationAdmin.global.now.getMonth() - 1)));
        customKendo.fn_datePicker("strDt", '', "yyyy-MM-dd", new Date().getFullYear()+"-01-01");
        customKendo.fn_datePicker("endDt", '', "yyyy-MM-dd", new Date());

        customKendo.fn_textBox(["searchValue"]);
        $("#docStatus").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                // { text: "상신전", value: "A" },
                { text: "결재중", value: "B" },
                { text: "결재완료", value: "C" },
            ],
            index: 0
        })

        $("#searchKeyword").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                { text: "이름", value: "EMP_NAME_KR" },
                { text: "부서명", value: "DEPT_NAME" },
                { text: "팀명", value: "DEPT_TEAM_NAME" },
                { text: "직위", value: "POSITION_NAME" },
            ],
            index: 0
        })

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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="holidayWorkApplicationAdmin.gridReload();">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                },
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="holidayWorkApplicationAdmin.delBtn();">' +
                            '	<span class="k-button-text">삭제</span>' +
                            '</button>';
                    }
                },
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="holidayWorkApplicationAdmin.subHolidayReqPop2();">' +
                            '	<span class="k-button-text">신청</span>' +
                            '</button>';
                    }
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound : holidayWorkApplicationAdmin.onDataBound,
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" onclick="holidayWorkApplicationAdmin.fn_checkAll();" class=""/>',
                    template : function(e){
                        if(e.DOC_STATUS == 100 || e.DOC_STATUS == 101 && e.DEL_YN =="N"){
                        /*if(e.APPR_STAT == "N"){*/
                            return "<input type='checkbox' id='hisPk#=SUBHOLIDAY_USE_ID#' name='hisPk' value=\""+e.SUBHOLIDAY_USE_ID+"\" class=''/>";
                        } else {
                            return "";
                        }
                    },
                    width: 50
                },
                {
                    title: "순번",
                    template: "#= --record #",
                    width: 50
                },
                {
                    field:"DEPT_NAME2",
                    title:"부서/팀",
                    width: 250
                },
                {
                    field:"EMP_NAME_KR",
                    title:"이름",
                    width: 80
                },
                {
                    field:"SUBHOLIDAY_DT_CODE_NM",
                    title:"구분",
                    width: 100
                },
                {
                    title:"신청일자",
                    field: "APPLY_DAY",
                    width: 100
                },
                {
                    field: "SUBHOLIDAY_WORK_DAY",
                    title: "근로일자",
                    width: 100
                }, {
                    field: "APPR_STAT",
                    title: "승인상태",
                    width: 100,
                    template : function(e){
                        if(e.DOC_STATUS == 100 || e.DOC_STATUS == 101){
                            return '결재완료'
                        }else if(e.DOC_STATUS == 10 || e.DOC_STATUS == 20 || e.DOC_STATUS == 50){
                            return '결재중';
                        }else if(e.DOC_STATUS == 30){
                            return '반려';
                        }else {
                            return '작성중';
                        }
                    },
                    width: 100,
                }, {
                    title: "결재",
                    template : function(e){
                        if(e.MBF_YN != "Y"){
                            if(e.DOC_STATUS == 100 || e.DOC_STATUS == 101){
                                return "<button type='button' class='k-button k-button-md k-button-solid k-button-solid-base approvalPopup' onclick='approveDocView(\""+e.DOC_ID+"\", \""+e.APPRO_KEY+"\", \""+e.DOC_MENU_CD+"\");'>" +
                                    "<span class='k-icon k-i-track-changes-accept k-button-icon'></span>" +
                                    "<span class='k-button-text'>열람</span>" +
                                    '   <input type="hidden" name="delYn" value="' + e.DEL_YN + '">' +
                                    "</button>";
                            }else if(e.DOC_STATUS == 10 || e.DOC_STATUS == 20 || e.DOC_STATUS == 50){
                                return "<button type='button' class='k-button k-button-md k-button-solid k-button-solid-base approvalPopup' onclick='approveDocView(\""+e.DOC_ID+"\", \""+e.APPRO_KEY+"\", \""+e.DOC_MENU_CD+"\");'>" +
                                    "<span class='k-icon k-i-track-changes-accept k-button-icon'></span>" +
                                    "<span class='k-button-text'>결재중</span>" +
                                    '   <input type="hidden" name="delYn" value="' + e.DEL_YN + '">' +
                                    "</button>";
                            }else if(e.DOC_STATUS == 30){
                                return '' +
                                    '   <input type="hidden" name="delYn" value="' + e.DEL_YN + '">' ;
                            }else {
                                return '' +
                                    '   <input type="hidden" name="delYn" value="' + e.DEL_YN + '">' ;
                            }
                        }else{
                            return '' +
                                '   <input type="hidden" name="delYn" value="' + e.DEL_YN + '">' ;
                        }
                    },
                    width: 100,
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },

    onDataBound : function(){
        var grid = this;
        grid.tbody.find("tr").each(function(){
            var delYn = $(this).find("input[name='delYn']").val();

            if(delYn == "Y"){
                $(this).css('text-decoration', 'line-through');
                $(this).css('color', 'red');
            }
        });

        // grid.tbody.find("tr").dblclick(function (e) {
        //     var dataItem = grid.dataItem($(this));
        //
        //     var url = "/subHoliday/pop/subHolidayReqPop2.do?subholidayUseId=" + dataItem.SUBHOLIDAY_USE_ID + "&apprStat=" + dataItem.APPR_STAT;
        //     var name = "subHolidayReqPop2";
        //     var option = "width=1030, height=850, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        //     var popup = window.open(url, name, option);
        // });
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
            var url = "/popup/subHoliday/approvalFormPopup/workHolidayAdminApprovalPop.do";
            var name = "workHolidayApprovalPop";
            var option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=yes, scrollbars = yes, status=no, top=50, left=50";
            var popup = window.open(url, name, option);
            this.action = "/popup/subHoliday/approvalFormPopup/workHolidayAdminApprovalPop.do";
            this.method = 'POST';
            this.target = 'workHolidayApprovalPop';
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

        var result = customKendo.fn_customAjax("/Inside/setHistoryWorkApplyAdminDel.do", {subHolidayUseId : checkedList.join()});
        if(result.flag){
            alert("휴가 작성내역이 삭제되었습니다.");
            holidayWorkApplicationAdmin.gridReload();
        }
    },

    gridReload: function (){
        holidayWorkApplicationAdmin.global.searchAjaxData = {
            strDt : $("#strDt").val(),
            endDt : $("#endDt").val(),
            docStatus : $("#docStatus").data("kendoDropDownList").value(),
            searchKeyword : $("#searchKeyword").data("kendoDropDownList").value(),
            searchValue : $("#searchValue").val(),
            adminMenu : "true"
        };

        var workDay = holidayWorkApplicationAdmin.global.searchAjaxData.workDay;
        var status = holidayWorkApplicationAdmin.global.searchAjaxData.status;

        holidayWorkApplicationAdmin.mainGrid('/Inside/holidayWorkApplicationList.do', holidayWorkApplicationAdmin.global.searchAjaxData);
    }


}