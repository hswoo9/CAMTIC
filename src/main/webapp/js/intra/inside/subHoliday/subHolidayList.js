var subHolidayList = {
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

    init: function(params){
        subHolidayList.dataSet();
        subHolidayList.mainGrid();
    },

    mainGrid: function(e){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            pageSize: 10,
            transport: {
                read : {
                    url : "/subHoliday/getVacUseHistoryList",
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data, operation) {
                    data.mcCode = subHolidayList.global.mcCode;
                    data.mdCode = subHolidayList.global.mdCode;
                    data.empSeq = $("#empSeq").val();
                    data.startDay = $("#startDay").val();
                    data.endDay = $("#endDay").val();
                    data.status = $("#status").val();
                    data.edtHolidayKindTop = $("#edtHolidayKindTop").val();
                    return data;
                }
            },
            schema : {
                data: function (data) {
                    return data.list;
                },
                total: function (data) {
                    return data.list.totalCount;
                },
            }
        });

        $("#mainGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 508,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 30, 50, 100 ],
                buttonCount : 5
            },
            toolbar : [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="certificateReq.delBtn();">' +
                            '	<span class="k-button-text">삭제</span>' +
                            '</button>';
                    }
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound : subHolidayList.onDataBound,
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" onclick="subHolidayList.fn_checkAll();" class=""/>',
                    template : function(e){
                        if(e.APPR_STAT == "N"){
                            return "<input type='checkbox' id='hisPk#=SUBHOLIDAY_USE_ID#' name='hisPk' value=\""+e.SUBHOLIDAY_USE_ID+"\" class=''/>";
                        } else {
                            return "";
                        }
                    },
                    width: 80
                }, {
                    field: "ROW_NUM",
                    title: "순번",
                    width: 80
                }, {
                    field: "SUBHOLIDAY_DT_CODE_NM",
                    title: "구분",
                    width: 250,
                }, {
                    title: "기간",
                    template: function(dataItem) {
                        if (dataItem.SUBHOLIDAY_DT_CODE_NM === "휴일근로") {
                            return dataItem.SUBHOLIDAY_WORK_DAY;
                        }
                        else {
                            return dataItem.SUBHOLIDAY_ST_DT + " ~ " + dataItem.SUBHOLIDAY_EN_DT;
                        }
                    }
                }, {
                    field: "SUBHOLIDAY_USE_DAY",
                    title: "사용 일수",
                    width: 200,
                }, {
                    field : "APPR_STAT",
                    title : "승인상태",
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
                    title : "승인요청",
                    template : function(e){
                        //휴가 전자결재
                        if(e.SUBHOLIDAY_CODE_ID != "11") {
                            if(e.APPR_STAT == "N"){
                                return "<button type='button' class='k-button k-button-md k-button-solid k-button-solid-base approvalPopup' onclick='subHolidayList.subHolidayDrafting(\""+e.SUBHOLIDAY_USE_ID+"\");'>" +
                                    "<span class='k-icon k-i-track-changes-accept k-button-icon'></span>" +
                                    "<span class='k-button-text'>승인요청</span>" +
                                    "</button>";
                            } else if(e.APPR_STAT == "E"){
                                return "<button type='button' class='k-button k-button-md k-button-solid k-button-solid-base approvalPopup' onclick='tempOrReDraftingPop(\""+e.DOC_ID+"\", \""+e.DOC_MENU_CD+"\", \""+e.APPRO_KEY+"\", 2, \"reDrafting\");'>" +
                                    "<span class='k-icon k-i-track-changes-accept k-button-icon'></span>" +
                                    "<span class='k-button-text'>재요청</span>" +
                                    "</button>";
                            } else if(e.APPR_STAT == "Y"){
                                return "<button type='button' class='k-button k-button-md k-button-solid k-button-solid-base approvalPopup' onclick='approveDocView(\""+e.DOC_ID+"\", \""+e.APPRO_KEY+"\", \""+e.DOC_MENU_CD+"\");'>" +
                                    "<span class='k-icon k-i-track-changes-accept k-button-icon'></span>" +
                                    "<span class='k-button-text'>결재</span>" +
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
                                    "<span class='k-button-text'>승인요청</span>" +
                                    "</button>";
                            } else if(e.APPR_STAT == "E"){
                                return "<button type='button' class='k-button k-button-md k-button-solid k-button-solid-base approvalPopup' onclick='tempOrReDraftingPop(\""+e.DOC_ID+"\", \""+e.DOC_MENU_CD+"\", \""+e.APPRO_KEY+"\", 2, \"reDrafting\");'>" +
                                    "<span class='k-icon k-i-track-changes-accept k-button-icon'></span>" +
                                    "<span class='k-button-text'>재요청</span>" +
                                    "</button>";
                            } else if(e.APPR_STAT == "Y"){
                                return "<button type='button' class='k-button k-button-md k-button-solid k-button-solid-base approvalPopup' onclick='approveDocView(\""+e.DOC_ID+"\", \""+e.APPRO_KEY+"\", \""+e.DOC_MENU_CD+"\");'>" +
                                    "<span class='k-icon k-i-track-changes-accept k-button-icon'></span>" +
                                    "<span class='k-button-text'>결재</span>" +
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
                }
            ],
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
            //여기야
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

    dataSet : function() {
        $("#datePicker").kendoDatePicker({
            value: new Date(),
            start: "decade",
            depth: "decade",
            format: "yyyy",
            width: "150px",
            change : function(){
                subHolidayList.fn_makeContent();
            }
        });

        let data = {
            mcCode : subHolidayList.global.mcCode,
            mdCode : subHolidayList.global.mdCode,
            empSeq : subHolidayList.global.empSeq
        }
        subHolidayList.global.vacGubun = customKendo.fn_customAjax("/subHoliday/getVacCodeList", data);
        const ds = subHolidayList.global.vacGubun;
        ds.list.unshift({"SUBHOLIDAY_DT_CODE_NM" : "전체", "SUBHOLIDAY_CODE_ID" : "" });
        $("#edtHolidayKindTop").kendoDropDownList({
            dataSource : ds.list,
            dataTextField: "SUBHOLIDAY_DT_CODE_NM",
            dataValueField: "SUBHOLIDAY_CODE_ID",
        });

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


        subHolidayList.fn_makeContent();

    },

    subHolidayReqPop : function() {
        var url = "/subHoliday/subHolidayReqPop.do";
        var name = "subHolidayReqPop";
        var option = "width=1030, height=850, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    },

    subHolidayDrafting : function(subHolidayId) {
        $("#subHolidayId").val(subHolidayId);
        $("#subHolidayDraftFrm").one("submit", function() {
            var url = "/popup/subHoliday/approvalFormPopup/subHolidayApprovalPop.do";
            var name = "subHolidayApprovalPop";
            var option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=yes, scrollbars = yes, status=no, top=50, left=50"
            var popup = window.open(url, name, option);
            this.action = "/popup/subHoliday/approvalFormPopup/subHolidayApprovalPop.do";
            this.method = 'POST';
            this.target = 'subHolidayApprovalPop';
        }).trigger("submit");
    },

    workHolidayDrafting : function(subHolidayId) {
        $("#subHolidayId").val(subHolidayId);
        $("#subHolidayDraftFrm").one("submit", function() {
            var url = "/popup/subHoliday/approvalFormPopup/workHolidayApprovalPop.do";
            var name = "workHolidayApprovalPop";
            var option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=yes, scrollbars = yes, status=no, top=50, left=50"
            var popup = window.open(url, name, option);
            this.action = "/popup/subHoliday/approvalFormPopup/workHolidayApprovalPop.do";
            this.method = 'POST';
            this.target = 'workHolidayApprovalPop';
        }).trigger("submit");
    },

    fn_makeContent : function (){
        var rqHolyData = {year : $("#datePicker").val(), empSeq : $("#empSeq").val()}
        var e = customKendo.fn_customAjax("/subHoliday/getUserHolyData", rqHolyData);

        console.log(e);
        var html = "";
        e = e.rs;
        var halfAnn = 0;
        if(e.halfAnn != 0){
            halfAnn = (halfAnn / 2);
        }
        html += '<tr style="text-align: center;">';
        html += '   <td>' + e.occDay + '일</td>';
        html += '   <td>' + e.bef2Year + '일</td>';
        html += '   <td>' + e.befYear + '일</td>';
        html += '   <td>' + e.ann + '일</td>';
        html += '   <td>' + halfAnn + '일</td>';
        html += '   <td>' + e.remainDay + '일</td>';
        html += '   <td>' + e.sickLv + '일</td>';
        html += '   <td>' + e.pubHoly + '일</td>';
        html += '   <td>' + e.congHoly + '일</td>';
        html += '   <td>' + e.matHoly + '일</td>';
        html += '   <td>0일</td>';
        html += '   <td>' + e.altHoly + '일</td>';
        html += '   <td>0일</td>';
        html += '   <td>' + e.compHoly + '일</td>';
        html += '   <td>' + e.workHoly + '일</td>';
        html += '</tr>';

        $("#holyBody").html("");
        $("#holyBody").append(html);
    },

    fn_checkAll: function(){
        if($("#checkAll").is(":checked")) {
            $("input[name='hisPk']").prop("checked", true);
        }else{
            $("input[name='hisPk']").prop("checked", false);
        }
    }
}