var holidayWorkApplicationUser ={
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
        holidayWorkApplicationUser.dataSet();
        holidayWorkApplicationUser.gridReload();
    },

    dataSet : function() {

        let data = {
            mcCode : holidayWorkApplicationUser.global.mcCode,
            mdCode : holidayWorkApplicationUser.global.mdCode,
            empSeq : holidayWorkApplicationUser.global.empSeq
        }
        holidayWorkApplicationUser.global.vacGubun = customKendo.fn_customAjax("/attend/getVacCodeList2", data);
        const ds = holidayWorkApplicationUser.global.vacGubun;

        ds.list.unshift({"SUBHOLIDAY_DT_CODE_NM" : "전체", "SUBHOLIDAY_CODE_ID" : "" });
        $("#edtHolidayKindTop").kendoDropDownList({
            dataSource : ds.list,
            dataTextField: "SUBHOLIDAY_DT_CODE_NM",
            dataValueField: "SUBHOLIDAY_CODE_ID",
        });

        // customKendo.fn_datePicker("startDate", '', "yyyy-MM-dd", new Date(holidayWorkApplicationUser.global.now.setMonth(holidayWorkApplicationUser.global.now.getMonth() - 1)));
        // customKendo.fn_datePicker("workDay", '', "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("baseYear", 'decade', 'yyyy', new Date());

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
                pageSizes: [10, 20, "ALL"],
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="holidayWorkApplicationUser.gridReload();">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                },
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="holidayWorkApplicationUser.delBtn();">' +
                            '	<span class="k-button-text">삭제</span>' +
                            '</button>';
                    }
                },
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="holidayWorkApplicationUser.subHolidayReqPop2();">' +
                            '	<span class="k-button-text">신청</span>' +
                            '</button>';
                    }
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound : holidayWorkApplicationUser.onDataBound,
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" onclick="holidayWorkApplicationUser.fn_checkAll();" class=""/>',
                    template : function(e){
                        console.log(e)
                        if(e.DOC_STATUS == "0" || e.DOC_STATUS == "30" || e.DOC_STATUS == "40"){
                            return "<input type='checkbox' id='hisPk#=SUBHOLIDAY_USE_ID#' name='hisPk' value=\""+e.SUBHOLIDAY_USE_ID+"\" class=''/>";
                        } else {
                            return "";
                        }
                    },
                    width: 80
                }, {
                    template: "#= --record #",
                    title: "순번",
                    width : 50
                }, {
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
                    title: "신청기간",
                    width: 200,
                    template: function (e){
                        return e.END_DT + " ~ " + e.STR_DT
                    }
                }, {
                    field: "APPR_STAT",
                    title: "승인상태",
                    width: "20%",
                    template : function(e){
                        if(e.DOC_STATUS == 100 || e.DOC_STATUS == 101){
                            return '결재완료';
                        }else if(e.DOC_STATUS == 10 || e.DOC_STATUS == 20 || e.DOC_STATUS == 50){
                            return '결재중';
                        }else if(e.DOC_STATUS == 30){
                            return '반려';
                        }else {
                            return '작성중';
                        }
                    },
                    width: 200,
                }, {
                    title: "사유",
                    template : function(e){
                        console.log(e.RMK)
                        return '<div style="cursor: pointer; font-weight: bold" onclick="holidayWorkApplicationUser.subHolidayReqPop('+e.HOLIDAY_WORK_MASTER_SN+');">'+e.RMK+'</div>';
                    }
                }, {
                    title: "승인요청",
                    template : function(e){
                        let html = makeApprBtnHtml(e, "holidayWorkApplicationUser.workHolidayDrafting("+e.HOLIDAY_WORK_MASTER_SN+");");
                        return html;
                    }
                }],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },

    // onDataBound : function(){
    //     var grid = this;
    //
    //     grid.tbody.find("tr").dblclick(function (e) {
    //         var dataItem = grid.dataItem($(this));
    //
    //         var url = "/subHoliday/pop/subHolidayReqPop2.do?holidayWorkMasterSn=" + dataItem.HOLIDAY_WORK_MASTER_SN;
    //         var name = "subHolidayReqPop2";
    //         var option = "width=1030, height=850, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
    //         var popup = window.open(url, name, option);
    //     });
    // },

    subHolidayReqPop : function(e) {
        var url = "/subHoliday/pop/subHolidayReqPop2.do?holidayWorkMasterSn=" + e;
        var name = "subHolidayReqPop2";
        var option = "width=1030, height=850, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    },

    subHolidayReqPop2 : function() {
        var url = "/subHoliday/pop/subHolidayReqPop2.do";
        var name = "subHolidayReqPop2";
        var option = "width=1030, height=850, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    },

    workHolidayDrafting : function(subHolidayId) {
        $("#holidayWorkMasterSn").val(subHolidayId);
        $("#subHolidayDraftFrm").one("submit", function() {
            var url = "/popup/subHoliday/approvalFormPopup/workHolidayUserApprovalPop.do";
            var name = "workHolidayApprovalPop";
            var option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=yes, scrollbars = yes, status=no, top=50, left=50";
            var popup = window.open(url, name, option);
            this.action = "/popup/subHoliday/approvalFormPopup/workHolidayUserApprovalPop.do";
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

        var result = customKendo.fn_customAjax("/Inside/setHistoryWorkApplyDel.do", {subHolidayUseId : checkedList.join()});
        if(result.flag){
            alert("휴가 작성내역이 삭제되었습니다.");
            holidayWorkApplicationUser.gridReload();
        }
    },

    gridReload: function (){
        holidayWorkApplicationUser.global.searchAjaxData = {
            // workDay: $("#workDay").val(),
            baseYear : $("#baseYear").val(),
            status: $("#status").val(),
            empSeq : $("#empSeq").val(),
        };

        var workDay = holidayWorkApplicationUser.global.searchAjaxData.workDay;
        var status = holidayWorkApplicationUser.global.searchAjaxData.status;

        holidayWorkApplicationUser.mainGrid('/Inside/holidayWorkApplicationList.do', holidayWorkApplicationUser.global.searchAjaxData);
    }


}