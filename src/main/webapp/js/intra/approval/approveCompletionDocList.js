var approveCompletion = {
    global : {
        now : new Date(),
        searchAjaxData : "",
    },

    init : function(params){
        customKendo.fn_textBox(["docTitle", "empName"]);

        customKendo.fn_datePicker("startDay", '', "yyyy-MM-dd", new Date(approveCompletion.global.now.setMonth(approveCompletion.global.now.getMonth() - 1)));
        customKendo.fn_datePicker("endDay", '', "yyyy-MM-dd", new Date());
        $("#startDay, #endDay").attr("readonly", true);

        $("#empName").keyup(function(){
            if(event.keyCode == 13){
                approveCompletion.gridReload();
            }
        });

        approveCompletion.gridReload();
    },

    mainGrid : function(url, params){
        var mainGrid = $("#mainGrid").kendoGrid({
            height: 489,
            dataSource: customKendo.fn_gridDataSource2(url, params),
            scrollable: true,
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
            toolbar : [
                {
                    name: 'button',
                    template: function (e) {
                        return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="approveCompletion.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }, {
                    name : 'excel',
                    text: '엑셀다운로드'
                }
            ],
            excel : {
                fileName : "전체문서 목록.xlsx",
                filterable : true
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    field : "FORM_NAME",
                    title : "문서종류",
                    width : 180
                }, {
                    field : "DOC_NO",
                    title : "문서번호",
                    template : function(e){
                        if(e.DOC_NO == null || e.DOC_NO == ""){
                            return "-"
                        }else{
                            return e.DOC_NO
                        }
                    },
                    width : 200
                }, {
                    title : "문서제목",
                    template : function (e){
                        var subApproval = '<span class="k-icon k-i-user" style="margin:-3px 5px 0 0;"></span>';
                        var securityIcon = '<img src="/images/ico/ico_security.png" style="vertical-align: text-top;" title="보안문서">';
                        var html = "";

                        if(e.SUB_APPROVAL == "Y"){
                            html += subApproval
                        }

                        if(e.SECURITY_TYPE == "009"){
                            html += securityIcon
                        }

                        if(e.DOC_TITLE == null || e.DOC_TITLE == ""){
                            html += '<a href="javascript:approveDocView(' + e.DOC_ID + ',\'' + e.APPRO_KEY + '\',\'' + e.DOC_MENU_CD + '\');" style="color: rgb(0, 51, 255);">제목 없음</a>';
                        }else{
                            html += '<a href="javascript:approveDocView(' + e.DOC_ID + ',\'' + e.APPRO_KEY + '\',\'' + e.DOC_MENU_CD + '\');" style="color: rgb(0, 51, 255); display:inline-block;"><xmp style="margin: 0">'+e.DOC_TITLE+'</xmp></a>';
                        }

                        return html;
                    },
                    attributes : {
                        style : "text-align : left;"
                    }
                }, {
                    field : "DRAFT_EMP_NAME",
                    title : "기안자",
                    width : "80px"
                }, {
                    field : "DRAFT_DT",
                    title : "기안일",
                    width : "100px",
                    template : function(e){
                        if(e.REPTIT_DRFT_YN == "N"){
                            if(e.DRAFT_DT != null){
                                return e.DRAFT_DT;
                            }else{
                                return "-";
                            }
                        }else if(e.REPTIT_DRFT_YN == "Y"){
                            return e.REPTIT_DRFT_DT;
                        }
                    },
                }, {
                    field : "LAST_APPROVE_DT",
                    title : "완료일",
                    width : "100px",
                    template : function(e){
                        if(e.LAST_APPROVE_DT == null || e.LAST_APPROVE_DT == ""){
                            return "-"
                        }else{
                            return e.LAST_APPROVE_DT
                        }
                    }
                }, {
                    field : "APPROVE_STAT_CODE_DESC",
                    title : "결재상태",
                    width : "100px",
                    template : function(e){
                        if(e.APPROVE_STAT_CODE_DESC == "결재"){
                            return "결재중";
                        }else{
                            return e.APPROVE_STAT_CODE_DESC;
                        }
                    }
                }, {
                    title : "결재선",
                    width : 80,
                    template : function(e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="docApproveLineView('+e.DOC_ID+');">' +
                            '<span class="k-icon k-i-hyperlink-open-sm k-button-icon"></span>' +
                            '</button>'
                    }
                }
            ]
        }).data("kendoGrid");
    },

    gridReload : function() {
        approveCompletion.global.searchAjaxData = {
            empSeq : $("#empSeq").val(),
            deptSeq : $("#deptSeq").val(),
            sEmpSeq : $("#sEmpSeq").val(),
            sDeptSeq : $("#sDeptSeq").val(),
            docTitle : $("#docTitle").val(),
            startDay : $("#startDay").val(),
            endDay : $("#endDay").val(),
            empName : $("#empName").val(),
            approveType : "completion",
            resType : "Y",
        }

        approveCompletion.mainGrid("/approvalUser/getApproveDocBoxList", approveCompletion.global.searchAjaxData);
    }
}

function gridReload() {
    $("#mainGrid").data("kendoGrid").dataSource.read();
}