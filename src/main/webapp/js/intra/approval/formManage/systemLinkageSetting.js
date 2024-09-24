/**
 * 2022.06.28 by. deer
 * 전체관리 > 결재관리 > 시스템연동설정
 *
 */
var systemLingSet = {
    global : {
        dropDownData : "",
        dropDownDataSource : "",
        gridParamData : "",
        flag : true,
        saveAjaxData : ""
    },

    fnDefaultScript : function () {
        customKendo.fn_textBox(['searchKeyWord', 'linkageType', 'linkageProcessCode',
            'linkageProcessName', 'tempProcessUrl', 'draftProcessUrl', 'draftCancelProcessUrl',
            'retrieveProcessUrl', 'approveProcessUrl', 'finalApprovalProcessUrl',
            'returnProcessUrl', 'deleteProcessUrl']);

        systemLingSet.gridReload();
    },

    mainGrid : function(url, params){
        var mainGrid = $("#mainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
            height: 595,
            scrollable: true,
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
            toolbar : [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" id="newFormFolderBtn" class="k-grid-button k-button k-rounded-md k-button-solid k-button-solid-base" onclick="systemLingSet.resetDataInput()">' +
                                '   <span class="k-button-text">신규</span>' +
                                '</button>';
                    }
                },{
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-solid k-button-solid-base" onclick="systemLingSet.setLinkageProcessDel()">' +
                            '   <span class="k-button-text">삭제</span>' +
                            '</button>';
                    }
                }, {
                    name : 'excel',
                    text: '엑셀다운로드'
                }
            ],
            excel : {
                fileName : "시스템연동설정 목록.xlsx",
                filterable : true,
                allPages: true
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound : systemLingSet.onDataBound,
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" class="k-checkbox checkbox"/>',
                    template : "<input type='checkbox' id='lpId#=LINKAGE_PROCESS_ID#' name='lpId' value='#=LINKAGE_PROCESS_ID#' class='k-checkbox checkbox'/>",
                    width: 40
                }, {
                    field : "LINKAGE_PROCESS_COMP_NAME",
                    title : "회사",
                    width: 180
                }, {
                    field : "LINKAGE_PROCESS_CODE",
                    title : "연동 코드",
                }, {
                    field : "LINKAGE_PROCESS_NAME",
                    title : "연동프로세스명",
                }
            ]
        }).data("kendoGrid");

        $("#checkAll").click(function(){
            if($(this).is(":checked")) $("input[name=lpId]").prop("checked", true);
            else $("input[name=lpId]").prop("checked", false);
        });
    },

    onDataBound : function () {
        var grid = this;
        grid.element.off('dbclick');

        grid.tbody.find("tr").dblclick(function (e) {
            var dataItem = grid.dataItem($(this));
            systemLingSet.modDataSetting(dataItem);
        });
    },

    gridReload : function () {
        if($("#mainGrid").data("kendoGrid") != null){
            $("#mainGrid").data("kendoGrid").destroy();
        }
        
        systemLingSet.global.gridParamData = {
            searchCompSeq : $("#searchCompSeq").val(),
            searchKeyWord : $("#searchKeyWord").val()
        }

        systemLingSet.mainGrid("/formManagement/getLinkageProcessList.do", systemLingSet.global.gridParamData);
    },

    modDataSetting : function(e){
        $("#linkageProcessId").val(e.LINKAGE_PROCESS_ID);
        $("#linkageProcessCode").val(e.LINKAGE_PROCESS_CODE);
        $("#linkageProcessCode").data("kendoTextBox").enable(false);
        $("#dbChkBtn").attr("disabled", "disabled");
        $("#linkageProcessName").val(e.LINKAGE_PROCESS_NAME);
        $("#tempProcessUrl").val(e.TEMP_PROCESS_URL);
        $("#draftProcessUrl").val(e.DRAFT_PROCESS_URL);
        $("#draftCancelProcessUrl").val(e.DRAFT_CANCEL_PROCESS_URL);
        $("#retrieveProcessUrl").val(e.RETRIEVE_PROCESS_URL);
        $("#approveProcessUrl").val(e.APPROVE_PROCESS_URL);
        $("#finalApprovalProcessUrl").val(e.FINAL_APPROVAL_PROCESS_URL);
        $("#returnProcessUrl").val(e.RETURN_PROCESS_URL);
        $("#deleteProcessUrl").val(e.DELETE_PROCESS_URL);
        $("#dbChk").val("1");
    },

    getDbChk : function(){
        if(!$("#linkageProcessCode").val()){
            alert("코드를 입력해주세요.");
            return;
        }

        systemLingSet.global.saveAjaxData = {
            linkageProcessCode : $("#linkageProcessCode").val()
        }

        var result = customKendo.fn_customAjax("/formManagement/setProcessValidationChk.do", systemLingSet.global.saveAjaxData);

        if(result.flag && result.rs == 0){
            alert("사용 가능한 코드입니다.");
            $("#dbChk").val("1");
        }else{
            alert("사용 불가능한 코드입니다.");
            $("#linkageProcessCode").val("");
            $("#dbChk").val("0");
        }
    },

    setLinkageProcess : function(){
        systemLingSet.global.flag = true;

        if($("#dbChk").val() != "1"){
            alert("코드 중복확인이 필요합니다.");
            systemLingSet.global.flag = false;
            return;
        }

        if(systemLingSet.global.flag){
            if(confirm("저장 하시겠습니까?")){

                systemLingSet.global.saveAjaxData = {
                    linkageProcessId : $("#linkageProcessId").val(),
                    linkageProcessCompSeq : $("#linkageProcessCompSeq").val(),
                    linkageProcessCompName : $("#linkageProcessCompName").val(),
                    linkageProcessCode : $("#linkageProcessCode").val(),
                    linkageProcessName : $("#linkageProcessName").val(),
                    tempProcessUrl : $("#tempProcessUrl").val(),
                    draftProcessUrl : $("#draftProcessUrl").val(),
                    draftCancelProcessUrl : $("#draftCancelProcessUrl").val(),
                    retrieveProcessUrl : $("#retrieveProcessUrl").val(),
                    approveProcessUrl : $("#approveProcessUrl").val(),
                    finalApprovalProcessUrl : $("#finalApprovalProcessUrl").val(),
                    returnProcessUrl : $("#returnProcessUrl").val(),
                    deleteProcessUrl : $("#deleteProcessUrl").val(),
                    empSeq : $("#empSeq").val()
                }

                var result = customKendo.fn_customAjax("/formManagement/setLinkageProcess.do", systemLingSet.global.saveAjaxData);

                if(result.flag){
                    alert("저장 되었습니다.");
                    systemLingSet.resetDataInput();
                    systemLingSet.gridReload();
                }else{
                    alert("저장에 실패하였습니다.");
                }
            }
        }else{
            alert("필수 값을 다시 확인해 주세요.");
        }
    },

    setLinkageProcessDel : function(){
        if($('input[name="lpId"]:checked').length == 0){
            alert("삭제할 연동프로세스를 선택해주세요.");
            return;
        }

        if(confirm("삭제한 연동프로세스는 복구할 수 없습니다.\n양식에 연동된 프로세스 정보는 모두 초기화됩니다.\n그래도 삭제하시겠습니까?")) {
            var linkageProcessId = "";
            $.each($('input[name="lpId"]:checked'), function () {
                linkageProcessId += "," + $(this).val();
            });

            var result = customKendo.fn_customAjax('/formManagement/setLinkageProcessDel.do', {
                linkageProcessId : linkageProcessId.substring(1),
                empSeq : $("#empSeq").val()
            });
            if(result.flag){
                alert("삭제가 완료되었습니다.");
                systemLingSet.resetDataInput();
                systemLingSet.gridReload();
            }
        }
    },

    resetDataInput : function(){
        $("#dbChkBtn").removeAttr("disabled");
        $("#linkageProcessId").val("");
        $("#linkageProcessCode").val("");
        $("#linkageProcessCode").data("kendoTextBox").enable(true);
        $("#linkageProcessName").val("");
        $("#tempProcessUrl").val("");
        $("#draftProcessUrl").val("");
        $("#draftCancelProcessUrl").val("");
        $("#retrieveProcessUrl").val("");
        $("#approveProcessUrl").val("");
        $("#finalApprovalProcessUrl").val("");
        $("#returnProcessUrl").val("");
        $("#deleteProcessUrl").val("");
        $("#dbChk").val("0");
    }
}