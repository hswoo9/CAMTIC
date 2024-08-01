var approvelService = {

    global : {
        empList : new Array(),
        selectApprovalEmpList : new Array(),
        rowCount : 0,
        parameter : {},
        searchAjaxData : "",
        approveAddBtn : function (e) {
            return '<button type="button" class="k-grid-add k-button k-button-md k-button-solid k-button-solid-base" onclick="approvelService.addTable(\'' + e.emp_seq + '\',\'userClick\')">' +
                '<span class="k-button-text">추가</span>	' +
                '</button>';
        },
        flag : true,
        approve : "",
        approve101 : "<span class='k-icon k-i-check-circle k-button-icon approve101'></span>",
        approveNo : "<span class='k-icon k-i-x-circle k-button-icon approveNo'></span>",
        approversArr : new Array(),
    },

    treeClick : function(e) {
        var item = $("#treeview").data("kendoTreeView").dataItem(e.node);
        approvelService.global.searchAjaxData.deptSeq = item.dept_seq;
        approvelService.global.searchAjaxData.deptName = item.dept_name;
        $("#userList").data("kendoGrid").dataSource.read();
    },

    getAbsentSetChk : function(e, d, n){
        var nowDate = new Date();
        var year = nowDate.getFullYear();
        var month = nowDate.getMonth()+1;
        var day = nowDate.getDate();
        var hour = nowDate.getHours();
        var minute = nowDate.getMinutes();

        approvelService.global.searchAjaxData = {
            c_uiuserkey : e,
            c_oiorgcode : d,
            c_aisday : year+'-'+month+'-'+day,
            c_aieday : year+'-'+month+'-'+day,
            c_aistime : hour+':'+minute,
            c_aietime : hour+':'+minute,
        }

        var result = customKendo.fn_customAjax("/approval/getAbsentSetChk", approvelService.global.searchAjaxData);
        if(result.flag){
            pathName = result.pathName;

            for(i = 0; i < result.dupleList.length; i ++){
                var dl = result.dupleList[i];
                var absentModal;
                absentModal = $('<div id="absentModal" class="pop_wrap_dir">' +
                    '<span style="font-weight: bold">[<span style="color: #058df5;">' + n + ']</span>님은 부재중인 사용자 입니다.</span><br><br>' +
                    '<span>- 대결자 : ' + dl.EMP_NAME + '</span><br>'+
                    '<span>- 부재기간 : ' + dl.C_AISDAY + ' ~ ' +  dl.C_AIEDAY + ' </span><br>'+
                    '<span>- 부재사유 : ' + dl.C_CIKEYNM + ' </span><br>'+
                    '<div style="text-align: right">' +
                    '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="$(absentModal).data(\'kendoWindow\').close();">' +
                    '<span class="k-icon k-i-check k-button-icon"></span>' +
                    '<span class="k-button-text">확인</span>' +
                    '</button>' +
                    '</div>' +
                    '</div>');

                absentModal.kendoWindow({
                    title: "부재정보",
                    visible: false,
                    modal: true,
                    width : 500,
                    position : {
                        top : 100,
                        left : 450
                    },
                    close: function () {
                        absentModal.remove();
                    }
                });

                absentModal.data("kendoWindow").open();

            }
        }
    },

    rowsel : function(e){
        if($(e).is(":checked")){
            $(e).prop("checked", false);
            $(e).closest("tr").removeClass("active");
        }else{
            $(e).closest("tr").addClass("active");
            $(e).prop("checked", true);
        }
    },

    approveTypeChange : function(type){
        if($("input[name='approveChk']:checked").length == 0 && type != "trMove"){
            alert("승인자를 선택해주세요.");
            return;
        }else if($("input[name='approveChk']:checked").length > 1 && type != "trMove"){
            alert("승인자를 한명만 선택해주세요.");
            return;
        }

        var approve101Index;

        var approveType = type == "approve" ? "0" : "1";
        var approveTypeText = type == "approve" ? "승인" : "협조";

        if(type == "approve" || type == "cooperation") {

            $.each($("input[name='approveChk']"), function(v, i){
                var thisApproveT = $(this).closest("tr").find("td:last span");
                var emp = $(i).closest("tr").find("#approveEmpSeq").val();
                var selectEmpList = approvelService.global.selectApprovalEmpList;
                for(var i = 0 ; i < selectEmpList.length ; i++){
                    if(selectEmpList[i].EMP_SEQ == emp){
                        if(approveType == "0"){
                            selectEmpList[i].APPROVAL_TYPE = "A";
                        }
                        if(approveType == "1"){
                            selectEmpList[i].APPROVAL_TYPE = "C";
                        }
                    }
                }
                if(this.checked){
                    if(thisApproveT.attr("approveType") == "2"){
                        $(".approve101, .approveNo").remove();
                        approve101Index = v;
                    }
                    thisApproveT.attr("approveType", approveType).text(approveTypeText);
                }else if(approve101Index < v){
                    thisApproveT.attr("approveType", "0").text("승인");
                }
            })
        }else{
            var approve101EmpSeq = $("span.approve101").closest("tr").find("#approveEmpSeq").val();
            approve101Index = $("span.approve101").closest("tr").index() == -1 ? 0 : $("span.approve101").closest("tr").index();
            approvelService.global.flag = false;

            $(".approve101, .approveNo").remove();

            $.each($("input[name='approveChk']"), function(v, i){
                var empNameTd = $(i).closest("tr").find("td:eq(2)");
                var approveTypeTd = $(i).closest("tr").find("td:eq(6) span");
                var emp = $(i).closest("tr").find("#approveEmpSeq").val();
                $("span.approve101").closest("tr").index()
                if(type == "examine"){
                    if($(i).is(":checked")){
                        var selectEmpList = approvelService.global.selectApprovalEmpList;
                        for(var i = 0 ; i < selectEmpList.length ; i++){
                            if(selectEmpList[i].EMP_SEQ == emp){
                                selectEmpList[i].APPROVAL_TYPE = "E";
                            }
                        }
                        $(approveTypeTd).attr("approveType", "2").text("검토");
                        approve101Index = v;
                        approvelService.global.flag = true;
                    }
                }else{
                    if($(i).closest("tr").find("#approveEmpSeq").val() == approve101EmpSeq){
                        empNameTd.append(approvelService.global.approve101);
                        $(approveTypeTd).attr("approveType", "2").text("전결");
                        approvelService.global.flag = true;
                    }
                }

                if(approve101Index < v && approvelService.global.flag){
                    empNameTd.append(approvelService.global.approveNo);
                    $(approveTypeTd).attr("approveType", "3").text("승인안함");
                }else if(!approvelService.global.flag){
                    empNameTd.find("span").remove();
                    if($(approveTypeTd).attr("approveType") == "3"){
                        $(approveTypeTd).attr("approveType", "0").text("승인");
                    }
                }
            })
        }
    },

    apprLineUpdate : function(mode){
        var chkCnt = $("input[name='approveChk']:checked").length;

        if(chkCnt > 1){
            alert("승인자를 한명만 선택해주세요.");
            return
        }

        $.each($("#approvalLineDataTb tbody tr"), function(i, e){
            if($(e).find("input[name='approveChk']").is(":checked")){
                if(i == 0 || (i-1 == 0 && mode == "up") || (i+1 == 1 && mode == "down")){
                    alert("기안자는 변경하실 수 없습니다.");
                }else{
                    if(mode == "up"){
                        $(e).prev().before($(e));
                    }else{
                        $(e).next().after($(e));
                    }
                }
            }
        });
        var emp = "";
        $.each($("#approvalLineDataTb tbody tr"), function(i, e){
            $(e).find("#approveOrder").text(i);
            emp = $(e).find("#approveEmpSeq").val();
        })

        approvelService.approveTypeChange("trMove", emp);
    },

    addTable : function(e, mode){
        if(mode == "userClick"){
            approvelService.global.searchAjaxData = {
                empSeq : e
            }

            var result = customKendo.fn_customAjax("/user/getUserInfo", approvelService.global.searchAjaxData);

            if(result.flag){
                approvelService.global.flag = true;
                result = result;
                var htmlStr = "";

                approvelService.getAbsentSetChk(result.EMP_SEQ, result.DEPT_SEQ, result.EMP_NAME_KR);

                /** 결재 */
                $.each($("input[name='approveEmpSeq']"), function(i, e){
                    if($(this).val() == result.EMP_SEQ){
                        approvelService.global.flag = false;
                    }
                })

                if(approvelService.global.flag){
                    if(result != null){
                        console.log(result);
                        htmlStr += "<tr onclick=\"approvelService.rowsel($(this).find('input[name=approveChk]'))\" style='cursor:pointer' class='apprLineTr'>" +
                            "		<td style='border-top: none; border-left: none;'>" +
                            "			<input type='checkbox' name='approveChk' id='approveChk"+ result.EMP_SEQ +"' class='k-checkbox checkbox' onclick='approvelService.rowsel(this)'>" +
                            "		</td>" +
                            "		<td style='border-top: none;'>" +
                            "			<input type='hidden' id='approveEmpSeq' name='approveEmpSeq' value='"+result.EMP_SEQ+"'>" +
                            "			<input type='hidden' id='approveEmpName' name='approveEmpName' value='"+result.EMP_NAME_KR+"'>" +
                            "			<input type='hidden' id='approveDeptSeq' name='approveDeptSeq' value='"+result.DEPT_SEQ+"'>" +
                            "			<input type='hidden' id='approveDeptName' name='approveDeptName' value='"+result.DEPT_NAME+"'>" +
                            "			<input type='hidden' id='approvePositionName' name='approvePositionName' value='"+result.POSITION_NAME+"'>" +
                            "			<input type='hidden' id='approveDutyName' name='approveDutyName' value='"+result.DUTY_NAME+"'>" +
                            "			<input type='hidden' id='approveTypeInput' name='approveTypeInput' value=''>" +
                            "			<span id='approveOrder'>"+$("#approvalLineDataBody tr").length+"</span>"+
                            "		</td>" +
                            "		<td style='border-top: none;'>"+result.EMP_NAME_KR+"</td>" +
                            "		<td style='border-top: none;'>"+result.DEPT_NAME+"</td>" +
                            "		<td style='border-top: none;'>"+result.POSITION_NAME+"</td>" +
                            "		<td style='border-top: none;'>"+result.DUTY_NAME+"</td>" +
                            "       <td style='border-top: none;'>" +
                            "           <span id='approveType' approveType='0'>승인</span>" +
                            "       </td>" +
                            "	</tr>";

                        var selectData = {
                            EMP_SEQ : result.EMP_SEQ,
                            APPROVAL_TYPE : "A"
                        };
                        approvelService.global.selectApprovalEmpList.push(selectData);
                        console.log(approvelService.global.selectApprovalEmpList);
                    }
                    $("#approvalLineDataBody").append(htmlStr);

                    approvelService.approveTypeChange("trMove", result.EMP_SEQ);
                }
            }
        }else{
            approvelService.global.searchAjaxData = {
                empSeq : $("#empSeq").val(),
                favRouteId : e
            }

            var result = customKendo.fn_customAjax("/approvalUser/getUserFavApproveRouteDetail", approvelService.global.searchAjaxData);
            console.log(result);
            if(result.flag){
                approvelService.global.flag = true;
                result = result.rs;

                $("#approvalLineDataTb tbody tr:not(:eq(0))").remove();

                for(var i = 0; i < result.length; i++){
                    var htmlStr = "";

                    htmlStr += "<tr onclick=\"approvelService.rowsel($(this).find('input[name=approveChk]'))\" style='cursor:pointer' class='apprLineTr'>" +
                        "		<td style='border-top: none; border-left: none;'>" +
                        "			<input type='checkbox' name='approveChk' id='approveChk"+ result[i].APPROVE_EMP_SEQ +"' class='k-checkbox checkbox' onclick='approvelService.rowsel(this)'>" +
                        "		</td>" +
                        "		<td>" +
                        "			<input type='hidden' id='approveEmpSeq' name='approveEmpSeq' value='"+result[i].APPROVE_EMP_SEQ+"'>" +
                        "			<input type='hidden' id='approveEmpName' name='approveEmpName' value='"+result[i].APPROVE_EMP_NAME+"'>" +
                        "			<input type='hidden' id='approveDeptSeq' name='approveDeptSeq' value='"+result[i].APPROVE_DEPT_SEQ+"'>" +
                        "			<input type='hidden' id='approveDeptName' name='approveDeptName' value='"+result[i].APPROVE_DEPT_NAME+"'>" +
                        "			<input type='hidden' id='approvePositionName' name='approvePositionName' value='"+result[i].APPROVE_POSITION_NAME+"'>" +
                        "			<input type='hidden' id='approveDutyName' name='approveDutyName' value='"+result[i].APPROVE_DUTY_NAME+"'>" +
                        "			<span id='approveOrder'>"+result[i].APPROVE_ORDER+"</span>"+
                        "		</td>" +
                        "		<td>"+result[i].APPROVE_EMP_NAME+"</td>" +
                        "		<td>"+result[i].APPROVE_DEPT_NAME+"</td>" +
                        "		<td>"+result[i].APPROVE_POSITION_NAME+"</td>" +
                        "		<td>"+result[i].APPROVE_DUTY_NAME+"</td>" +
                        "       <td style='border-top: none;'>" +
                        "           <span id='approveType' approveType='0'>승인</span>" +
                        "       </td>" +
                        "	</tr>";

                    $("#approvalLineDataTb tbody").append(htmlStr);
                }
            }
        }
    },

    fn_defaultScript : function(){
        approvelService.global.approversArr= new Array();
        $("#approvalLineDataBody tr").remove();
        $("#approvalLineDataBody").empty();
        $("#apprLineTabStrip, #apprLineUserInfoTabStrip").kendoTabStrip({
            animation:  {
                open: {
                    effects: "fadeIn"
                }
            }
        });

        $("#apprLineTypeTabStrip").kendoTabStrip({
            animation:  {
                open: {
                    effects: "fadeIn"
                }
            },
            show : function(e){
                $("#userList").data("kendoGrid").dataSource.read();
            }
        });

        $("#treeview").kendoTreeView({
            dataSource: datas,
            dataTextField: ['dept_name'],
            select: approvelService.treeClick,
        });

        approvelService.global.searchAjaxData = {
            deptSeq : $("#orgnztId").val()
        }

        $("#userList").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2("/common/empInformation", approvelService.global.searchAjaxData),
            height: 415,
            sortable: true,
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
            columns: [
                {
                    field: "dept_name",
                    title: "부서",
                    width: "100px",
                }, {
                    field: "duty",
                    title: "직책",
                    width: "100px",
                }, {
                    field: "emp_name",
                    title: "성명",
                    width: "100px",
                }, {
                    width: "70px",
                    template: approvelService.global.approveAddBtn,
                }],
        }).data("kendoGrid");

        approvelService.approversArrCheck();



        customKendo.fn_kendoWindow("approvalPopup", 572, 1330, "승인요청");
        customKendo.fn_kendoWindow("approvalType", 200, 200, "승인타입");
        var data = {};
        var ds = customKendo.fn_customAjax("/userManagement/getDeptAllList", data)
        customKendo.fn_dropDownList("approvalPopupDeptSeq", ds.list, "DEPT_NAME", "DEPT_SEQ")
        //customKendo.fn_textBox(["approvalPopupEmpName"]);
        //$("#approvalPopupEmpName").kendoTextBox();
        $(document).on("click",".approvalPopup", function(){
            var data = {
                key : $(this).attr("key"),
                appType : $(this).attr("appType"),
                approvalKind : $(this).attr("approvalKind"),
            };
            approvelService.global.selectApprovalEmpList = new Array();
            approvelService.fn_apprOverWkPlanReq(data);
        });

    },

    fn_apprOverWkPlanReq : function(e, params){
        approvelService.global.parameter = params;
        console.log(approvelService.global.parameter);
        approvelService.global.approversArr= new Array();
        $("#approvalLineDataBody tr").remove();
        $("#approvalLineDataBody").empty();
        approvelService.global.approversArr = [{
            approveEmpSeq : $("#uniqId").val(),
            approveEmpName : $("#name").val(),
            approveStatCodeDesc : "",
            approveStatCode : "",
            approvePositionName : $("#positionNm").val(),
            approveDutyName : $("#dutyNm").val(),
            approveDeptSeq : $("#orgnztId").val(),
            approveDeptName : $("#orgnztNm").val(),
            approveOrder : "0",
            approveType : "0"
        }];
        approvelService.approversArrCheck();
        $("#selectKey").val(e.key);
        $("#appType").val(e.appType);
        $("#approvalKind").val(e.approvalKind);
        $("#approvalPopup").data("kendoWindow").open();
    },

    fn_approvalSend : function(){
        var list = approvelService.global.selectApprovalEmpList;
        for(var i = 0 ; i < list.length ; i++){
            list[i].APPROVAL_ORDER_NUM = i;
        }
        if(confirm("승인 요청을 하시겠습니까?")){
            var data = {
                selectApprovalEmpList : JSON.stringify(approvelService.global.selectApprovalEmpList),
                appType : $("#appType").val(),
                approvalKind : $("#approvalKind").val(),
                empSeq : $("#empSeq").val(),
            };
            var ds = "";
            console.log(data);
            if($("#approvalKind").val() == "overWorkPlan"){
                data.overWorkPlanId = $("#selectKey").val();
                ds = customKendo.fn_customAjax("/overWorkPlan/setApprOverWkPlanSend", data);
            }
            if($("#approvalKind").val() == "workPlan"){
                data.workPlanChangeId = $("#selectKey").val();
                ds = customKendo.fn_customAjax("/workPlan/setApprWorkPlanSend", data);
            }
            if($("#approvalKind").val() == "bustrip"){
                data.hrBizReqId = $("#selectKey").val();
                ds = customKendo.fn_customAjax("/bustrip/setApprBustripSend", data);
            }
            if($("#approvalKind").val() == "bustripSub"){
                data.hrBizReqResultId = $("#selectKey").val();
                ds = customKendo.fn_customAjax("/bustrip/setApprBustripSubSend", data);
            }
            if($("#approvalKind").val() == "holiday"){
                data.vacUseHistId = $("#selectKey").val();
                ds = customKendo.fn_customAjax("/subHoliday/setApprHolidaySend", data);
            }
            if($("#approvalKind").val() == "holidayAlter"){
                data.vacUseHistId = $("#selectKey").val();
                ds = customKendo.fn_customAjax("/subHoliday/setApprHolidayAlterSend", data);
            }

            if($("#approvalKind").val() == "workPlanDetail"){
                data.workPlanChangeId = $("#selectKey").val();
                ds = customKendo.fn_customAjax("/workPlan/setApprWorkPlanDetailSend", data);
            }
            if($("#approvalKind").val() == "holidayFile"){
                data.fileId = $("#selectKey").val();
                ds = customKendo.fn_customAjax("/subHoliday/setApprHolidayFileSend", data);
            }

            alert(ds.message);
            gridReload();
            $("#selectKey").val("");
            $("#appType").val("");
            $("#approvalKind").val("");
            customKendo.fn_kendoWindowClose("approvalPopup");
        }
    },

    fn_approvalTypeSelect : function(type){
        var e = $("#approvalEtcEmpSeq").val();
        var empList = approvelService.global.empList;
        for(var i = 0 ; i < empList.length ; i++){
            if(e == empList[i].EMP_SEQ){
                var data = empList[i];
                data.APPROVAL_TYPE = type;
                approvelService.global.selectApprovalEmpList.push(data);
                console.log(approvelService.global.selectApprovalEmpList);
            }
        }
        $("#approvalEtcEmpSeq").val("");

        $("#approvalType").data("kendoWindow").close();
    },

    approversArrCheck : function(){
        var htmlStr = "";
        for(var i = 0; i < approvelService.global.approversArr.length; i++){
            htmlStr += "<tr onclick=\"approvelService.rowsel($(this).find('input[name=approveChk]'))\" style='cursor:pointer' class='apprLineTr'>" +
                "	<td style='border-top: none; border-left: none;'>" +
                "		<input type='checkbox' name='approveChk' id='approveChk"+ approvelService.global.approversArr[i].approveEmpSeq +"' class='k-checkbox checkbox' onclick='approvelService.rowsel(this)'>" +
                "	</td>" +
                "	<td style='border-top: none;'>" +
                "		<input type='hidden' id='approveEmpSeq' name='approveEmpSeq' value='"+approvelService.global.approversArr[i].approveEmpSeq+"'>" +
                "		<input type='hidden' id='approveEmpName' name='approveEmpName' value='"+approvelService.global.approversArr[i].approveEmpName+"'>" +
                "		<input type='hidden' id='approveDeptSeq' name='approveDeptSeq' value='"+approvelService.global.approversArr[i].approveDeptSeq+"'>" +
                "		<input type='hidden' id='approveDeptName' name='approveDeptName' value='"+approvelService.global.approversArr[i].approveDeptName+"'>" +
                "		<input type='hidden' id='approvePositionName' name='approvePositionName' value='"+approvelService.global.approversArr[i].approvePositionName+"'>" +
                "		<input type='hidden' id='approveDutyName' name='approveDutyName' value='"+approvelService.global.approversArr[i].approveDutyName+"'>" +
                "		<input type='hidden' id='approveTypeInput' name='approveTypeInput' value='"+approvelService.global.approversArr[i].approveType+"'>" +
                "		<span id='approveOrder'>"+approvelService.global.approversArr[i].approveOrder+"</span>"+
                "	</td>";
            if(approvelService.global.approversArr[i].approveType == 3){
                htmlStr += "	<td style='border-top: none;'>" + approvelService.global.approversArr[i].approveEmpName + approvelService.global.approveNo + "</td>";
            }else if(approvelService.global.approversArr[i].approveType == 2){
                htmlStr += "	<td style='border-top: none;'>" + approvelService.global.approversArr[i].approveEmpName + approvelService.global.approve101 + "</td>";
            }else {
                htmlStr += "	<td style='border-top: none;'>"+approvelService.global.approversArr[i].approveEmpName+"</td>";
            }

            htmlStr += "	<td style='border-top: none;'>"+approvelService.global.approversArr[i].approveDeptName+"</td>" +
                "	<td style='border-top: none;'>"+approvelService.global.approversArr[i].approvePositionName+"</td>" +
                "	<td style='border-top: none;'>"+approvelService.global.approversArr[i].approveDutyName+"</td>" +
                "	<td style='border-top: none;'>";
            htmlStr +=  "<span id='approveType' approveType='"+ approvelService.global.approversArr[i].approveType +"'>" +
                (approvelService.global.approversArr[i].approveType == 3 ? "승인안함" : approvelService.global.approversArr[i].approveType == 2 ? "전결" :
                    approvelService.global.approversArr[i].approveType == 1 ? "협조" : "승인") +
                "</span>";

            htmlStr +=  "   </td>" +
                "</tr>";
        }
        $("#approvalLineDataBody").append(htmlStr);
    },

    newFavApprove : function(e){
        if(confirm("선택된 결재선은 초기화됩니다. 계속하시겠습니까?")){
            $("#approvalLineDataTb tbody tr:not(:eq(0))").remove();
            approvelService.global.selectApprovalEmpList = new Array();
            approvelService.global.approversArr = [{
                approveEmpSeq : $("#uniqId").val(),
                approveEmpName : $("#name").val(),
                approveStatCodeDesc : "",
                approveStatCode : "",
                approvePositionName : $("#positionNm").val(),
                approveDutyName : $("#dutyNm").val(),
                approveDeptSeq : $("#orgnztId").val(),
                approveDeptName : $("#orgnztNm").val(),
                approveOrder : "0",
                approveType : "0"
            }];

            if($("input[name=approveChkAll]").is(":checked")){
                $("input[name=approveChkAll]").prop("checked", false);
            }
        }
    },

    rowDelClick : function(){
        var chkCnt = $("input[name='approveChk']:checked").length;

        if(chkCnt == 0){
            alert("삭제할 사용자를 선택해주세요.");
            return
        }

        approvelService.global.flag = true;

        $.each($("#approvalLineDataTb tbody tr input[name='approveChk']"), function(i, e){
            if($(e).is(":checked")){
                if($(e).closest("tr").find("#approveOrder").text() == "0"){
                    alert("기안자는 삭제하실 수 없습니다.");
                    approvelService.global.flag = false;
                    return false;
                }else{
                    $(e).closest("tr").remove();
                    console.log(i);
                    console.log(e);
                    approvelService.global.selectApprovalEmpList.splice((i-1), 1);
                    if($("input[name=approveChkAll]").is(":checked")){
                        $("input[name=approveChkAll]").prop("checked", false);
                    }
                }
            }
        })

        if(approvelService.global.flag){
            $.each($("#approvalLineDataTb tbody tr"), function(i, e){
                $(e).find("#approveOrder").text(i);
            })
            approvelService.approveTypeChange("trMove");
        }


    },

    checkProp : function(target){
        console.log(target);
        if($(target).is(":checked")){
            $("input[name='approveChk']").prop("checked", true);
        }else{
            $("input[name='approveChk']").prop("checked", false);
        }
    },
}