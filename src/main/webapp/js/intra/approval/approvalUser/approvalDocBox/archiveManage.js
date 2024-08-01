/**
 * 2022.06.28 by. deer
 * 전자문서 > 전자결재 > 문서함 > 기록물철관리
 *
 * function / global variable / local variable setting
 */
var archiveManage = {
    global : {
        dropDownDataSource : "",
        searchAjaxData  : "",
        saveAjaxData    : "",

        windowPopUrl    : "",
        popName         : "",
        popStyle        : "",
    },

    fnDefaultScript : function(workCodeList, aiMadeYearListJson, aiStopYearListJson){
        workCodeList.unshift({
            "C_WINAME" : "전체",
            "C_WIKEY" : "",
        })
        $("#wiKeyCode").kendoDropDownList({
            dataSource : workCodeList,
            dataTextField: "C_WINAME",
            dataValueField: "C_WIKEY"
        });

        aiMadeYearListJson.unshift({
            "C_AIMADEYEAR_TEXT" : "전체",
            "C_AIMADEYEAR" : "",
        })
        $("#c_aimadeyear").kendoDropDownList({
            dataSource : aiMadeYearListJson,
            dataTextField: "C_AIMADEYEAR_TEXT",
            dataValueField: "C_AIMADEYEAR"
        });

        aiStopYearListJson.unshift({
            "C_AISTOPYEAR_TEXT" : "전체",
            "C_AISTOPYEAR" : "",
        })
        $("#c_aistopyear").kendoDropDownList({
            dataSource : aiStopYearListJson,
            dataTextField: "C_AISTOPYEAR_TEXT",
            dataValueField: "C_AISTOPYEAR"
        });

        archiveManage.global.dropDownDataSource = NeosCodeUtil.getCodeList("COM078");
        archiveManage.global.dropDownDataSource.unshift({
            "CODE_NM" : "전체",
            "CODE" : "",
        });

        $("#c_aiokflag").kendoDropDownList({
            dataSource : archiveManage.global.dropDownDataSource,
            dataTextField: "CODE_NM",
            dataValueField: "CODE"
        });

        archiveManage.global.dropDownDataSource = [
            {text : "전체", value : ""},
            {text : "미삭제", value : "1"},
            {text : "삭제", value : "2"},
        ]
        $("#aiDeleteOpt").kendoDropDownList({
            dataSource : archiveManage.global.dropDownDataSource,
            dataTextField: "text",
            dataValueField: "value"
        });

        customKendo.fn_textBox(["deptName", "userName", "wiName"])
        archiveManage.gridReload();
    },

    gridReload : function() {
        archiveManage.global.searchAjaxData = {
            SearchType        : "USER",
            deptSeq           : $("#deptSeq").val(),
            wiName            : $("#wiName").val(),
            c_wikey           : $("#wiKeyCode").val(),
            c_aiokflag        : $("#c_aiokflag").val(),
            aiDeleteOpt       : $("#aiDeleteOpt").val(),
            userName          : $("#userName").val(),
            aiMadeYear        : $("#c_aimadeyear").val(),
            aiStopYear        : $("#c_aistopyear").val(),
        }

        archiveManage.mainGrid("/approvalManagement/getArchiveInfoList.do", archiveManage.global.searchAjaxData);
    },

    mainGrid :  function(url, params){
        var mainGrid = $("#mainGrid").kendoGrid({
            height: 489,
            dataSource: customKendo.fn_gridDataSource2(url, params),
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="archiveManage.archiveNewPopup()">' +
                            '	<span class="k-icon k-i-plus k-button-icon"></span>' +
                            '	<span class="k-button-text">신규</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="archiveManage.archiveCopyPopup()">' +
                            '	<span class="k-icon k-i-copy k-button-icon"></span>' +
                            '	<span class="k-button-text">복사</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="archiveManage.setArchiveStopYearExtend()">' +
                            '	<span class="k-icon k-i-clock k-button-icon"></span>' +
                            '	<span class="k-button-text">종료년도 연장</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="archiveManage.setArchiveOkFlag(\'0\')">' +
                            '	<span class="k-icon k-i-pin k-button-icon"></span>' +
                            '	<span class="k-button-text">편철확정</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="archiveManage.setArchiveOkFlag(\'1\')">' +
                            '	<span class="k-icon k-i-unpin k-button-icon"></span>' +
                            '	<span class="k-button-text">편철미확정</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="archiveManage.setArchivePerfectionDel()">' +
                            '	<span class="k-icon k-i-trash k-button-icon"></span>' +
                            '	<span class="k-button-text">완전삭제</span>' +
                            '</button>';
                    }
                }, {
                    name : 'excel',
                    text: '엑셀다운로드'
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="">' +
                            '	<span class="k-icon k-i-print k-button-icon"></span>' +
                            '	<span class="k-button-text">표지인쇄</span>' +
                            '</button>';
                    }
                }
            ],
            excel : {
                fileName : "기록물철 목록.xlsx",
                filterable : true,
                allPages: true
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound : archiveManage.onDataBound,
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" class="k-checkbox checkbox"/>',
                    template: "<input type='checkbox' id='aiPk#=C_AIKEYCODE#' name='aiPk' value='#=C_AIKEYCODE#' class='k-checkbox checkbox'/>",
                    width: 40
                }, {
                    field : "COMP_NAME",
                    title : "회사",
                    width: 180
                }, {
                    field : "DEPT_NAME",
                    title : "부서",
                    width: 120
                }, {
                    field : "C_WINAME",
                    title : "단위업무",
                    template: function (e) {
                        var title = "";
                        var css = "";
                        if ("g" == e.C_WIGUBUN) {
                            title = "[그룹]" + e.C_WINAME;
                            css = "text_green";
                        } else if ("c" == e.C_WIGUBUN) {
                            title = "[회사]" + e.C_WINAME;
                            css = "text_blue";
                        } else {
                            title = "[부서]" + e.C_WINAME;
                        }
                        return "<span title='" + title + "' class='" + css + "'>" + e.C_WINAME + "</span>";
                    },
                    width: 100
                }, {
                    field : "C_AITITLE",
                    title : "기록물철"
                }, {
                    field : "USERNAME",
                    title : "담당자",
                    width: 80
                }, {
                    field : "C_AIMADEYEAR",
                    title : "생산년도",
                    width: 80
                }, {
                    field : "C_AISTOPYEAR",
                    title : "종료년도",
                    width: 80
                }, {
                    field : "",
                    title : "종료년도 복구",
                    template : function(e) {
                        var html = "-";
                        if(e.C_AIMADEYEAR < e.C_AISTOPYEAR){
                            html = '<button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="archiveManage.setArchiveStopYearRollBack(\'' + e.C_AIKEYCODE + '\',\'' + e.C_AISTOPYEAR  + '\')">' +
                                '	<span class="k-button-text">복구</span>' +
                                '</button>';
                        }
                        return html;
                    },
                    width: 100
                }, {
                    field : "C_AIOKFLAG_TXT",
                    title : "편철구분",
                    width: 80
                }, {
                    title : "삭제/복원",
                    template : function(e) {
                        if(e.C_AIDELETEOPT == "d"){
                            return '<button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="archiveManage.setArchiveOptDorBlankChk(\'' + e.C_AIKEYCODE + '\',\'' + e.C_AIDELETEOPT + '\')">' +
                                '	<span class="k-button-text">복원</span>' +
                                '</button>';
                        }else{
                            return '<button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="archiveManage.setArchiveOptDorBlankChk(\'' + e.C_AIKEYCODE + '\',\'' + e.C_AIDELETEOPT + '\')">' +
                                '	<span class="k-button-text">삭제</span>' +
                                '</button>';
                        }
                    },
                    width: 80
                }, {
                    title : "상세정보",
                    template : function(e) {
                        var html = '<button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="archiveManage.archiveDetailPopup(\'' + e.C_AIKEYCODE + '\')">' +
                            '<span class="k-icon k-i-window-restore k-button-icon"></span>' +
                            '</button>';
                        return html;
                    },
                    width: 80
                }
            ]
        }).data("kendoGrid");

        $("#checkAll").click(function(){
        if($(this).is(":checked")) $("input[name=aiPk]").prop("checked", true);
        	else $("input[name=aiPk]").prop("checked", false);
        });
    },

    onDataBound : function(){
        var grid = this;
        grid.element.off('dbclick');

        /** dbl 클릭시 상세정보 수정 창 진행중 */
        grid.tbody.find("tr").dblclick(function (e) {
            var dataItem = grid.dataItem($(this));

            windowPopUrl = "/approvalManagement/archiveEditPop.do?aiKeyCode="+dataItem.C_AIKEYCODE;
            popName = "archiveInfo";
            popStyle = "scrollbars=yes, resizeble=yes, menubar=no, toolbar=no, location=no, directories=yes, status=yes, width=895, height=495";

            window.open(windowPopUrl, popName, popStyle);
        });
    },

    archiveDetailPopup : function(e){
        windowPopUrl = "/approvalManagement/archiveDetailPop.do?aiKeyCode="+e;
        popName = "archiveDetail";
        popStyle = "scrollbars=yes, resizeble=yes, menubar=no, toolbar=no, location=no, directories=yes, status=yes, width=875, height=630";

        window.open(windowPopUrl, popName, popStyle);
    },

    setArchiveOptDorBlankChk : function(aiKeyCode, aiDeleteOpt){
        if(!aiKeyCode){
            if(aiDeleteOpt == 'd'){
                alert("복원할 수 없는 기록물철입니다.");
            }else{
                alert("삭제할 수 없는 기록물철입니다.");
            }
            return;
        }

        archiveManage.global.saveAjaxData = {
            aiKeyCode : aiKeyCode,
            aiDeleteOpt : aiDeleteOpt
        };

        var result = customKendo.fn_customAjax("/approvalManagement/setArchiveOptDorBlankChk.do", archiveManage.global.saveAjaxData);
        if(result.flag){
            if(result.result > 0){
                archiveManage.archiveExistsDocPop(aiKeyCode);
            }else if(result.result < 0){
                alert("삭제 처리중 오류가 발생하였습니다.");
            }else{
                if(aiDeleteOpt == 'd'){
                    if(confirm("복원 하시겠습니까?")){
                        archiveManage.setArchiveOptDorBlankUpd(archiveManage.global.saveAjaxData);
                    }
                }else{
                    if(confirm("삭제 하시겠습니까?")){
                        archiveManage.setArchiveOptDorBlankUpd(archiveManage.global.saveAjaxData);
                    }
                }
            }
        }else{
            alert("삭제 처리중 오류가 발생하였습니다.");
        }
    },

    setArchiveOptDorBlankUpd : function(data){
        if(!data.aiKeyCode){
            if(data.aiDeleteOpt == 'd'){
                alert("복원할 수 없는 기록물철입니다.");
            }else{
                alert("삭제할 수 없는 기록물철입니다.");
            }
            return;
        }

        var result = customKendo.fn_customAjax("/approvalManagement/setArchiveOptDorBlankUpd.do", data);
        if(result.flag){
            alert("처리 되었습니다.");
            archiveManage.gridReload();
        }else{
            alert("반영 중 오류가 발생했습니다");
        }
    },

    archiveExistsDocPop : function(aiKeyCode) {
        windowPopUrl = "/approvalManagement/archiveExistsDocPop.do?aiKeyCode="+aiKeyCode;
        popName = "archiveExistsDoc";
        popStyle = "scrollbars=yes, resizeble=yes, menubar=no, toolbar=no, location=no, directories=yes, status=yes, width=1020, height=635";

        window.open(windowPopUrl, popName, popStyle);
    },

    archiveNewPopup : function(){
        windowPopUrl = "/approvalManagement/archiveNewPop.do";
        popName = "archiveNew";
        popStyle = "scrollbars=yes, resizeble=yes, menubar=no, toolbar=no, location=no, directories=yes, status=yes, width=875, height=590";

        window.open(windowPopUrl, popName, popStyle);
    },

    archiveCopyPopup(){
        if($("input[name='aiPk']:checked").length == 0){
            alert("기록물철을 선택해 주세요.");
            return;
        }

        var aiKeyCodeArr = new Array();
        var grid = $("#mainGrid").data("kendoGrid");
        $("input[name='aiPk']:checked").each(function(){
            var dataItem = grid.dataItem($(this).closest("tr"));
            aiKeyCodeArr.push(dataItem.C_AIKEYCODE);
        });

        windowPopUrl = "/approvalManagement/archiveCopyPop.do";
        popName = "archiveCopy";
        popStyle = "scrollbars=yes, resizeble=yes, menubar=no, toolbar=no, location=no, directories=yes, status=yes, width=875, height=490";

        var frm = document.frmPop2;
        var pop = window.open(windowPopUrl, popName, popStyle);

        frm.aiKeyCodeArr.value = JSON.stringify(aiKeyCodeArr);
        frm.method = "post";
        frm.target = "archiveCopy";
        frm.action = windowPopUrl;
        frm.submit();

        pop.focus();
    },

    setArchiveStopYearExtend : function(){
        if($("input[name='aiPk']:checked").length == 0){
            alert("기록물철을 선택해 주세요.");
            return;
        }else if(!confirm("종료년도가 현재년도와 동일한 경우 제공되지 않으며,\n이전 년도인 경우 현재년도까지 1년 단위로 연장이 가능합니다.\n진행 하시겠습니까?")){
            return;
        }

        var aiArr = new Array();
        var grid = $("#mainGrid").data("kendoGrid");
        $("input[name='aiPk']:checked").each(function(){
            var dataItem = grid.dataItem($(this).closest("tr"));
            aiArr.push(dataItem.C_AIKEYCODE);
        })

        archiveManage.global.saveAjaxData = {
            aiArr : JSON.stringify(aiArr)
        }

        var result = customKendo.fn_customAjax("/approvalManagement/setArchiveStopYearUpd.do", archiveManage.global.saveAjaxData);
        if(result.flag){
            if(result.result > 0){
                alert("처리 되었습니다.");
                archiveManage.gridReload();
            }else if(result.result == 0){
                alert("종료년도 연장 대상이 아닙니다.");
            }else{
                alert("반영 중 오류가 발생했습니다.");
            }
        }
    },

    setArchiveStopYearRollBack : function(aiKeyCode, aiStopYear){
        if(aiStopYear == null || aiStopYear == ""){
            alert("종료년도 복구 대상이 아닙니다.");
            return
        }

        var rollBackYear = aiStopYear-1;
        archiveManage.global.saveAjaxData = {
            aiKeyCode : aiKeyCode,
            aiStopYear : aiStopYear,
            rollBackYear : rollBackYear
        }

        var result = customKendo.fn_customAjax("/approvalManagement/getArchiveStopYearRollBackChk.do", archiveManage.global.saveAjaxData);
        if(result.flag){
            if(result.result > 0){
                alert("현 종료년도의 문서가 존재합니다.");
            }else if(result.result < 0){
                alert("반영 중 오류가 발생했습니다.");
            }else{
                var confirmMsg = rollBackYear + '년으로 복구하시겠습니까?';
                if(confirm(confirmMsg)){
                    var result2 = customKendo.fn_customAjax("/approvalManagement/setArchiveStopYearRollBack.do", archiveManage.global.saveAjaxData);
                    if(result2.flag){
                        alert("처리 되었습니다.");
                        archiveManage.gridReload();
                    }
                }
            }
        }else{
            alert("반영 중 오류가 발생했습니다.");
        }
    },

    setArchiveOkFlag : function(okFlag){
        if($("input[name='aiPk']:checked").length == 0){
            alert("기록물철을 선택해 주세요.");
            return;
        }else if(okFlag == "0"){
            if(!confirm("편철 미확정인 기록물철만 확정 처리 됩니다.\n진행 하시겠습니까?")){
                return;
            }
        }else{
            if(!confirm("편철 확정인 기록물철만 미확정 처리 됩니다.\n진행 하시겠습니까?")){
                return;
            }
        }

        var aiArr = new Array();
        var grid = $("#mainGrid").data("kendoGrid");
        $("input[name='aiPk']:checked").each(function(){
            var dataItem = grid.dataItem($(this).closest("tr"));
            aiArr.push(dataItem.C_AIKEYCODE);
        })

        archiveManage.global.saveAjaxData = {
            selectedList : JSON.stringify(aiArr),
            okFlag : okFlag
        }

        var result = customKendo.fn_customAjax("/approvalManagement/setArchiveOkFlag.do", archiveManage.global.saveAjaxData);
        if(result.flag){
            if(okFlag == "0"){
                alert("확정 처리가 완료되었습니다.");
            }else{
                alert("미확정 처리가 완료되었습니다.");
            }
            archiveManage.gridReload();
        }else{
            if(okFlag == "0"){
                alert("확정 처리 중 오류가 발생했습니다.");
            }else{
                alert("미확정 처리 중 오류가 발생했습니다.");
            }
        }
    },

    setArchivePerfectionDel : function(){
        var flag = true;

        if($("input[name='aiPk']:checked").length == 0){
            alert("기록물철을 선택해 주세요.");
            return;
        }

        var aiArr = new Array();
        var grid = $("#mainGrid").data("kendoGrid");
        $("input[name='aiPk']:checked").each(function(){
            var dataItem = grid.dataItem($(this).closest("tr"));
            if(dataItem.C_AIDELETEOPT != 'd'){
                flag = false;
                return;
            }else{
                aiArr.push(dataItem.C_AIKEYCODE);
            }
        })

        if(!flag){
            alert("삭제된 기록물철만 완전삭제 가능합니다.");
            return;
        }

        if(!confirm("삭제된 기록물철만 완전삭제 처리 됩니다.\n완전삭제 처리된 기록물철은 복원 할 수 없습니다.\n삭제하시겠습니까?")){
            return;
        }

        archiveManage.global.saveAjaxData = {
            selectedList : JSON.stringify(aiArr)
        }

        var result = customKendo.fn_customAjax("/approvalManagement/setArchivePerfectionDel.do", archiveManage.global.saveAjaxData);
        if(result.flag){
            alert("처리 되었습니다.");
            archiveManage.gridReload();
        }else{
            alert("반영 중 오류가 발생했습니다.");
        }
    }
}