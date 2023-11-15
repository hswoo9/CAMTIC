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
        holidayWorkApplication.mainGrid();
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
                { text: "요청진행전", value: "N" },
                { text: "승인", value: "Y" },
                { text: "진행중", value: "C" },
                { text: "반려", value: "E" }
            ],
            index: 0
        });


    },


    mainGrid: function() {
        var dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/Inside/holidayWorkApplication.do',
                    type : "post"
                },
                parameterMap: function(data) {
                    data.edtHolidayKindTop = $("#edtHolidayKindTop").val();
                    data.workDay = $("#workDay").val();
                    // data.endDate = $("#endDate").val();
                    data.status = $("#status").val();
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
            /*dataBound: ,*/
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
                    title:"기간",
                    field: "SUBHOLIDAY_WORK_DAY",
                    width:"15%"
                },
                {
                    field: "SUBHOLIDAY_USE_DAY",
                    title: "사용일수",
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
                        }
                    },
                    width: 200,
                }, {
                    title: "승인요청",
                    template : function(e){
                        //휴가 전자결재
                        if(e.SUBHOLIDAY_CODE_ID != "11") {
                            if(e.APPR_STAT == "N"){
                                return "<button type='button' class='k-button k-button-md k-button-solid k-button-solid-base approvalPopup' onclick='subHolidayList.subHolidayDrafting(\""+e.SUBHOLIDAY_USE_ID+"\");'>" +
                                    "<span class='k-icon k-i-track-changes-accept k-button-icon'></span>" +
                                    "<span class='k-button-text'>상신</span>" +
                                    "</button>";
                            } else if(e.APPR_STAT == "E"){
                                return "<button type='button' class='k-button k-button-md k-button-solid k-button-solid-base approvalPopup' onclick='tempOrReDraftingPop(\""+e.DOC_ID+"\", \""+e.DOC_MENU_CD+"\", \""+e.APPRO_KEY+"\", 2, \"reDrafting\");'>" +
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
                            //휴일근로 전자결재
                        }else {
                            if(e.APPR_STAT == "N"){
                                return "<button type='button' class='k-button k-button-md k-button-solid k-button-solid-base approvalPopup' onclick='subHolidayList.workHolidayDrafting(\""+e.SUBHOLIDAY_USE_ID+"\");'>" +
                                    "<span class='k-icon k-i-track-changes-accept k-button-icon'></span>" +
                                    "<span class='k-button-text'>상신</span>" +
                                    "</button>";
                            } else if(e.APPR_STAT == "E"){
                                return "<button type='button' class='k-button k-button-md k-button-solid k-button-solid-base approvalPopup' onclick='tempOrReDraftingPop(\""+e.DOC_ID+"\", \""+e.DOC_MENU_CD+"\", \""+e.APPRO_KEY+"\", 2, \"reDrafting\");'>" +
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
                    }
                }]
        }).data("kendoGrid");
    },

    subHolidayReqPop2 : function() {
        var url = "/subHoliday/pop/subHolidayReqPop2.do";
        var name = "subHolidayReqPop2";
        var option = "width=1030, height=850, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    },

    gridReload: function (){
        console.log('gridReload 함수 호출됨');

        holidayWorkApplication.global.searchAjaxData = {
            workDay: $('#workDay').val(),
            // endDate: $('#endDate').val(),
            edtHolidayKindTop: $('#edtHolidayKindTop').val(),
            status: $('#status').val()
        };

        var workDay = holidayWorkApplication.global.searchAjaxData.workDay;
        var endDate = holidayWorkApplication.global.searchAjaxData.endDate;
        var edtHolidayKindTop = holidayWorkApplication.global.searchAjaxData.edtHolidayKindTop;
        var status = holidayWorkApplication.global.searchAjaxData.status;

        console.log('workDay:' + workDay);
        // console.log('endDate:' + endDate);
        console.log('edtHolidayKindTop' + edtHolidayKindTop);
        console.log('status:' + status);

        holidayWorkApplication.mainGrid('/Inside/holidayWorkApplication.do', holidayWorkApplication.global.searchAjaxData);
    }


}