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
                    }
                }
            ],
        }).data("kendoGrid");
    },

    onDataBound : function(){
        var grid = this;

        grid.tbody.find("tr").dblclick(function (e) {
            var dataItem = grid.dataItem($(this));

            var url = "/subHoliday/pop/subHolidayReqPop.do?subholidayUseId=" + dataItem.SUBHOLIDAY_USE_ID + "&apprStat=" + dataItem.APPR_STAT;
            var name = "subHolidayReqPop";
            var option = "width=1030, height=850, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
            var popup = window.open(url, name, option);
        });
    },

    gridReload: function (){
        subHolidayList.global.searchAjaxData = {
            mcCode : subHolidayList.global.mcCode,
            mdCode : subHolidayList.global.mdCode,
            empSeq : $("#empSeq").val(),
            startDate : $("#startDate").val(),
            endDate : $("#endDate").val(),
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

        customKendo.fn_datePicker("startDate", '', "yyyy-MM-dd", new Date(subHolidayList.global.now.setMonth(subHolidayList.global.now.getMonth() - 1)));
        customKendo.fn_datePicker("endDate", '', "yyyy-MM-dd", new Date(subHolidayList.global.now.setMonth(subHolidayList.global.now.getMonth() + 2)));

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
        var url = "/subHoliday/pop/subHolidayReqPop.do";
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
        // html += '   <td>' + e.bef2Year + '일</td>';
        html += '   <td>' + e.befYear + '일</td>';
        html += '   <td>' + e.ann + '일</td>';
        html += '   <td>' + halfAnn + '일</td>';
        html += '   <td>' + (e.occDay - e.ann) + '일</td>';
        html += '   <td>' + e.sickLv + '일</td>';
        html += '   <td>' + e.pubHoly + '일</td>';
        html += '   <td>' + e.congHoly + '일</td>';
        html += '   <td>' + e.matHoly + '일</td>';
        html += '   <td>' + e.workHoly + '일</td>';
        html += '   <td>' + e.altHoly + '일</td>';
        html += '   <td>0일</td>';
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