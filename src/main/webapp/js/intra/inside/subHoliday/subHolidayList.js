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

    init: function(){
        subHolidayList.dataSet();
        subHolidayList.gridReload();
    },

    mainGrid: function(url, params){
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
            toolbar : [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="subHolidayList.gridReload();">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                },
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="subHolidayList.delBtn();">' +
                            '	<span class="k-button-text">삭제</span>' +
                            '</button>';
                    }
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound: function(e){
                var grid = this;
                grid.tbody.find("tr").each(function(){
                    var delYn = $(this).find("input[name='delYn']").val();

                    if(delYn == "Y"){
                        $(this).css('text-decoration', 'line-through');
                        $(this).css('color', 'red');
                    }
                });

            },
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" onclick="subHolidayList.fn_checkAll();" class=""/>',
                    template : function(e){
                        if(e.APPR_STAT == "N" || e.APPR_STAT == "E"){
                            return "<input type='checkbox' id='hisPk#=SUBHOLIDAY_USE_ID#' name='hisPk' value=\""+e.SUBHOLIDAY_USE_ID+"\" class=''/>";
                        } else {
                            return "";
                        }
                    },
                    width: 50
                }, {
                    field: "ROW_NUM",
                    title: "순번",
                    width: 50
                }, {
                    field: "SUBHOLIDAY_DT_CODE_NM",
                    title: "구분",
                    width: 200
                }, {
                    title: "기간",
                    template: function(dataItem) {
                        if (dataItem.SUBHOLIDAY_DT_CODE_NM === "휴일근로") {
                            return dataItem.SUBHOLIDAY_WORK_DAY;
                        }
                        else {
                            return dataItem.SUBHOLIDAY_ST_DT + " ~ " + dataItem.SUBHOLIDAY_EN_DT;
                        }
                    },
                    width: 250
                }, {
                    field: "RMK",
                    title: "내용",
                    template : function(e){

                        return '<div style="text-align: center">' +
                            '<input type="hidden" name="delYn" value="'+e.DEL_YN+'">' +
                            '<a style="cursor: pointer;" onclick="subHolidayList.fn_regPop(' + e.SUBHOLIDAY_USE_ID + ');"><b>' + e.RMK + '</b></a>' +
                            '</div>'
                    }
                }, {
                    field: "SUBHOLIDAY_USE_DAY",
                    title: "사용 일수",
                    width: 150,
                }, {
                    field : "APPROVE_STAT_CODE",
                    title : "결재상태",
                    template : function(e){
                        if(e.APPROVE_STAT_CODE == '0' || e.APPROVE_STAT_CODE == '40' || e.APPROVE_STAT_CODE == '60'){
                            return '작성중';
                        } else if(e.APPROVE_STAT_CODE == '10' || e.APPROVE_STAT_CODE == '20' || e.APPROVE_STAT_CODE == '50') {
                            return '결재중';
                        } else if(e.APPROVE_STAT_CODE == '30') {
                            return '반려';
                        } else if(e.APPROVE_STAT_CODE == '100' || e.APPROVE_STAT_CODE == '101') {
                            return '결재완료';
                        } else {
                            return '-';
                        }
                    },
                    width: 150,
                }, {
                    title : "승인요청",
                    template : function(e){
                        if(e.APPR_STAT == "N"){
                            return "<button type='button' class='k-button k-button-md k-button-solid k-button-solid-base approvalPopup' onclick='subHolidayList.subHolidayDrafting(\""+e.SUBHOLIDAY_USE_ID+"\");'>" +
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
                    },
                    width: 150,
                }
            ],
        }).data("kendoGrid");
    },

    fn_regPop: function(SUBHOLIDAY_USE_ID){
        var url = "/subHoliday/pop/subHolidayReqPop.do?subholidayUseId=" + SUBHOLIDAY_USE_ID + "&type=request";
        var name = "subHolidayReqPop";
        var option = "width=1030, height=850, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    },

    gridReload: function (){
        subHolidayList.global.searchAjaxData = {
            mcCode : subHolidayList.global.mcCode,
            mdCode : subHolidayList.global.mdCode,
            empSeq : $("#empSeq").val(),
            // startDate : $("#startDate").val(),
            // endDate : $("#endDate").val(),
            baseYear : $("#baseYear").val(),
            status : $("#status").val(),
            edtHolidayKindTop : $("#edtHolidayKindTop").val()
        }

        subHolidayList.mainGrid("/subHoliday/getVacUseHistoryList", subHolidayList.global.searchAjaxData);
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

        // customKendo.fn_datePicker("startDate", '', "yyyy-MM-dd", new Date(subHolidayList.global.now.setMonth(subHolidayList.global.now.getMonth() - 1)));
        // customKendo.fn_datePicker("endDate", '', "yyyy-MM-dd", new Date(subHolidayList.global.now.setMonth(subHolidayList.global.now.getMonth() + 2)));
        customKendo.fn_datePicker("baseYear", 'decade', 'yyyy', new Date());

        $("#status").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                { text: "작성중", value: "W" },
                { text: "결재중", value: "A" },
                { text: "반려", value: "R" },
                { text: "결재완료", value: "Y" }
            ],
            index: 0
        });

        subHolidayList.fn_makeContent();
    },

    subHolidayReqPop : function() {
        var url = "/subHoliday/pop/subHolidayReqPop.do?type=request";
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

        console.log("e:");
        console.log(e);
        var html = "";
        e = e.rs;
        html += '<tr style="text-align: center;">';
        html += '   <td>' + e.occDay + '일</td>';
        // html += '   <td>' + e.bef2Year + '일</td>';
        html += '   <td>' + e.befYear + '일</td>';
        html += '   <td>' + e.ann + '일</td>';
        html += '   <td>' + e.halfAnn + '일</td>';
        html += '   <td>' + (e.occDay - e.befYear - e.ann - e.halfAnn) + '일</td>';
        html += '   <td>' + e.sickLv + '일</td>';
        html += '   <td>' + e.pubHoly + '일</td>';
        html += '   <td>' + e.congHoly + '일</td>';
        html += '   <td>' + e.matHoly + '일</td>';
        html += '   <td>' + e.workHoly + '일</td>';
        html += '   <td>' + e.altHoly + '일</td>';
        html += '   <td>' + e.remainWorkHoly + '일</td>';
        html += '   <td>' + e.compHoly + '일</td>';
        // html += '   <td>' + e.workHoly + '일</td>';
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

        var result = customKendo.fn_customAjax("/subHoliday/setVacUseHistDel.do", {subHolidayUseId : checkedList.join()});
        if(result.flag){
            alert("휴가 작성내역이 삭제되었습니다.");
            subHolidayList.gridReload();
        }
    },
}