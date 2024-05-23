var workPlanUser = {
    global : {

    },

    init : function(){

        $("#searchYear").kendoDatePicker({
            start: "decade",
            depth: "decade",
            culture : "ko-KR",
            format : "yyyy",
            value : new Date()
        });

        workPlanUser.makerGrid();

        $("#checkAll").click(function(){
            if($(this).is(":checked")) $("input[name=workPlanCheck]").prop("checked", true);
            else $("input[name=workPlanCheck]").prop("checked", false);
        });

    },

    makerGrid : function(){

        var dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/workPlan/getWorkPlanList',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    data.searchYear = $("#searchYear").val();
                    data.erpEmpCd = $("#erpEmpCd").val();
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
            selectable: "row",
            height: 508,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount : 5
            },
            toolbar : [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="workPlanUser.workPlanApprovalPop();">' +
                            '	<span class="k-button-text">신청</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="workPlanUser.fn_gridReload();">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="workPlanUser.deleteWorkPlanData()">' +
                            '	<span class="k-button-text">삭제</span>' +
                            '</button>';
                    }
                }
            ],
            noRecords: {
                template: "<div style='margin: auto;'>데이터가 존재하지 않습니다.</div>"
            },
            dataBinding: function(){
                record = fn_getRowNum(this, 3);
            },
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll"/>',
                    template : function(e){
                        if(e.APPR_STAT == "N"){
                            return "<input type='checkbox' name='workPlanCheck' value='"+ e.WORK_PLAN_APPROVAL_ID +"'/>";
                        }else{
                            return "";
                        }
                    },
                    width: "50px"
                }, {
                    field: "",
                    title: "순번",
                    width: "50px",
                    template: "#= --record #"
                }, {
                    field: "WORK_TIME_CODE_NAME",
                    title: "신청구분",
                    width: "150px"
                }, {
                    field: "APPLY_DATE",
                    title: "신청일자",
                    width: "100px"
                }, {
                    field: "APPLY_WORK_DATE",
                    title: "신청기간",
                    width: "200px"
                }, {
                    field: "",
                    title: "상태",
                    width: "100px",
                    template : function(e){
                        if(e.ADMIN_APPR_STAT != null){
                            if(e.APPR_STAT == "N"){
                                return "작성 중";
                            } else if(e.APPR_STAT == "Y"){
                                if(e.ADMIN_APPR_STAT == "N"){
                                    return "관리자 대기중";
                                } else if(e.ADMIN_APPR_STAT == "Y"){
                                    return "최종승인";
                                } else if(e.ADMIN_APPR_STAT =="C"){
                                    return "관리자 제출";
                                } else if(e.ADMIN_APPR_STAT =="E"){
                                    return "관리자 반려";
                                }else if(e.ADMIN_APPR_STAT =="D"){
                                    return "관리자 회수";
                                }
                            } else if(e.APPR_STAT =="C"){
                                return "제출";
                            } else if(e.APPR_STAT =="E"){
                                return "반려";
                            }else if(e.APPR_STAT =="D"){
                                return "회수";
                            }
                        }else{
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
                        }
                    }
                }, {
                    title: "승인요청",
                    width: "100px",
                    template : function(e){
                        if(e.APPR_STAT == "N"){
                            return "<button type='button' class='k-button k-button-md k-button-solid k-button-solid-base approvalPopup' onclick='workPlanUser.workPlanDrafting(\""+e.WORK_PLAN_APPROVAL_ID+"\");'>" +
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
                }, {
                    title: "담당자",
                    width: "100px",
                    template : function(e){
                        if(e.ADMIN_APPR_STAT == "Y"){
                            return "<button type='button' class='k-button k-button-md k-button-solid k-button-solid-base approvalPopup' onclick='approveDocView(\""+e.ADMIN_DOC_ID+"\", \""+e.ADMIN_APPRO_KEY+"\", \""+e.ADMIN_DOC_MENU_CD+"\");'>" +
                                "<span class='k-icon k-i-track-changes-accept k-button-icon'></span>" +
                                "<span class='k-button-text'>열람</span>" +
                                "</button>";
                        } else {
                            return "-";
                        }
                    }
                }
            ],
        dataBound : workPlanUser.onDataBound,
        }).data("kendoGrid");
    },

    onDataBound : function(){
        var grid = this;

        grid.tbody.find("tr").dblclick(function (e) {
            var dataItem = grid.dataItem($(this));

            var url = '/workPlan/workPlanApprovalModPop.do?workPlanApprovalId=' + dataItem.WORK_PLAN_APPROVAL_ID;
            var pop = "" ;
            var popupName = "유연근무신청";
            var width = "1000";
            var height = "460";
            windowX = Math.ceil( (window.screen.width  - width) / 2 );
            windowY = Math.ceil( (window.screen.height - height) / 2 );
            pop = window.open(url, popupName, "width=" + width + ", height=" + height + ", top="+ windowY +", left="+ windowX +", scrollbars=YES, resizable=YES");
            if(pop != null){
                if(pop.focus){
                    pop.focus();
                }else{
                    alert('팝업 차단 설정을 확인 하세요.');
                }
            }
        });
    },

    workPlanApprovalPop : function(){
        var url = '/workPlan/workPlanApprovalPop.do';
        var pop = "" ;
        var popupName = "유연근무신청";
        var width = "1000";
        var height = "460";
        windowX = Math.ceil( (window.screen.width  - width) / 2 );
        windowY = Math.ceil( (window.screen.height - height) / 2 );
        pop = window.open(url, popupName, "width=" + width + ", height=" + height + ", top="+ windowY +", left="+ windowX +", scrollbars=YES, resizable=YES");
        if(pop != null){
            if(pop.focus){
                pop.focus();
            }else{
                alert('팝업 차단 설정을 확인 하세요.');
            }
        }
    },

    fn_gridReload : function(){
        $("#checkAll").prop("checked", false);
        $("#mainGrid").data("kendoGrid").dataSource.read();
    },

    workPlanDrafting : function(key){
        var approvalParams = {};
        approvalParams.mod = "W";
        approvalParams.formId = "166";
        approvalParams.compSeq = "1000";
        approvalParams.empSeq = $("#empSeq").val();
        approvalParams.docTitle = "[시차출퇴근형 근로 신청서]" + $("#deptName").val() + "-" + $("#empName").val();
        approvalParams.content = "";
        approvalParams.type = "drafting";
        approvalParams.menuCd = "workPlan";
        approvalParams.docType = "A";

        approvalParams.linkageProcessId = "2";
        approvalParams.linkageType = "2";
        approvalParams.linkageProcessCode = "camticUserWorkPlan";
        approvalParams.approKey = "camticUserWorkPlan_" + key;

        linkageProcessOn(approvalParams, "target");
    },

    deleteWorkPlanData : function(){
        var checkGroup = $("input[name='workPlanCheck']:checked");
        if(checkGroup.length > 0){
            var checkedList = new Array();
            $.each(checkGroup, function(i,v){
                checkedList.push(this.value);
            });
            console.log(checkedList);
            var saveData = {
                checkedList : checkedList.join(),
                empSeq : $("#empSeq").val()
            }
            var ds = customKendo.fn_customAjax("/workPlan/deleteWorkPlanData", saveData);
            if(ds.flag){
                alert("처리되었습니다.");
                workPlanUser.fn_gridReload();
            }
        }else{
            alert("삭제 할 항목을 선택해 주세요.");
        }
    }
}