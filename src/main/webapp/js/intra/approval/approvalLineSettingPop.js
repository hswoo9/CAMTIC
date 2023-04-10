/**
 * 2022.06.28 by. deer
 * 전자결재 관련 팝업 - 결재라인 선택 팝업
 *
 * function / global variable / local variable setting
 */
var lineSettingPop = {
    global : {
        flag : true,
        pathName : "",
        searchAjaxData : "",
        approversArr : opener.draft.global.approversArr != null ? opener.draft.global.approversArr : new Array(),
        approveAddBtn : function (e) {
            return '<button type="button" class="k-grid-add k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="lineSettingPop.addTable(\'' + e.emp_seq + '\',\'userClick\')">' +
                '<span class="k-button-text">추가</span>	' +
                '</button>';
        },
        approve : "",
        approve101 : "<span class='k-icon k-i-check-circle k-button-icon approve101'></span>",
        approveNo : "<span class='k-icon k-i-x-circle k-button-icon approveNo'></span>",
    },

    fnDefaultScript : function(){
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
            select: lineSettingPop.treeClick,
        });


        lineSettingPop.treeViewReload(deptSeq);

        lineSettingPop.approversArrCheck();

        $("#addApprLineGrid, #addCooperationLineGrid, #addReaderListGrid").kendoGrid({
            resizable: true,
            columns: [
                {
                    width : 18
                }, {
                    title : "순번",
                    width : 24
                }, {
                    title : "이름",
                    width : 36
                }, {
                    title : "부서",
                    width : 65
                }, {
                    title : "직급",
                    width : 57
                }, {
                    title : "직책",
                    width : 45
                }, {
                    title : "결재유형",
                    width : 35
                }
            ]
        });

        lineSettingPop.getFavApproveList();
    },

    treeViewReload : function(dept){
        lineSettingPop.global.searchAjaxData = {
            deptSeq : dept
        }

        $("#userList").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2("/common/empInformation", lineSettingPop.global.searchAjaxData),
            height: 415,
            sortable: true,
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
                    template: lineSettingPop.global.approveAddBtn,
                }],
        }).data("kendoGrid");
    },

    treeClick : function(e) {
        var item = $("#treeview").data("kendoTreeView").dataItem(e.node);
        deptSeq = item.dept_seq;
        deptName = item.dept_name;
        lineSettingPop.treeViewReload(deptSeq);
        // $("#userList").data("kendoGrid").dataSource.read();
    },

    onDataBound : function(){

    },

    gridReload : function() {
        $("#mainGrid").data("kendoGrid").dataSource.read();
    },


    approveTypeChange : function(type){
        if($("input[name='approveChk']:checked").length == 0 && type != "trMove"){
            alert("결재자를 선택해주세요.");
            return;
        }else if($("input[name='approveChk']:checked").length > 1 && type != "trMove"){
            alert("결재자를 한명만 선택해주세요.");
            return;
        }

        var approve101Index;

        var approveType = type == "approve" ? "0" : "1";
        var approveTypeText = type == "approve" ? "결재" : "협조";

        if(type == "approve" || type == "cooperation") {

            $.each($("input[name='approveChk']"), function(v, i){
                var thisApproveT = $(this).closest("tr").find("td:last span");
                if(this.checked){
                    if(thisApproveT.attr("approveType") == "2"){
                        $(".approve101, .approveNo").remove();
                        approve101Index = v;
                    }

                    if(type == "approve"){
                        if(thisApproveT.attr("approveType") == "3"){

                        }else if($(".apprLineTr").length == ($(i).closest("tr").index() + 1)){
                            thisApproveT.attr("approveType", approveType).text(approveTypeText);
                        }else{
                            thisApproveT.attr("approveType", approveType).text("검토");
                        }
                    }else{
                        thisApproveT.attr("approveType", approveType).text(approveTypeText);
                    }
                }else if(approve101Index < v){
                    thisApproveT.attr("approveType", "0").text("결재");
                }
            })
        }else{
            var approve101EmpSeq = $("span.approve101").closest("tr").find("#approveEmpSeq").val();
            approve101Index = $("span.approve101").closest("tr").index() == -1 ? 0 : $("span.approve101").closest("tr").index();
            lineSettingPop.global.flag = false;

            $(".approve101, .approveNo").remove();

            $.each($("input[name='approveChk']"), function(v, i){
                var empNameTd = $(i).closest("tr").find("td:eq(2)");
                var approveTypeTd = $(i).closest("tr").find("td:eq(6) span");

                $("span.approve101").closest("tr").index()
                if(type == "finalType1Approve"){
                    if($(i).is(":checked")){
                        empNameTd.append(lineSettingPop.global.approve101);
                        $(approveTypeTd).attr("approveType", "2").text("전결");
                        approve101Index = v;
                        lineSettingPop.global.flag = true;
                    }
                }else{
                    if($(i).closest("tr").find("#approveEmpSeq").val() == approve101EmpSeq){
                        empNameTd.append(lineSettingPop.global.approve101);
                        $(approveTypeTd).attr("approveType", "2").text("전결");
                        lineSettingPop.global.flag = true;
                    }
                }

                if(approve101Index < v && lineSettingPop.global.flag){
                    empNameTd.append(lineSettingPop.global.approveNo);
                    $(approveTypeTd).attr("approveType", "3").text("결재안함");
                }else if(!lineSettingPop.global.flag){
                    empNameTd.find("span").remove();
                    if($(approveTypeTd).attr("approveType") == "3"){
                        $(approveTypeTd).attr("approveType", "0").text("검토");
                    }else if($(approveTypeTd).attr("approveType") == "0" && $(i).closest("tr").find("#approveOrder").text() == "0"){
                        $(approveTypeTd).attr("approveType", "0").text("상신");
                    }else if($(approveTypeTd).attr("approveType") == "0" && $(".apprLineTr").length == ($(i).closest("tr").index() + 1)){
                        $(approveTypeTd).attr("approveType", "0").text("결재");
                    }else{
                        $(approveTypeTd).attr("approveType", "0").text("검토");
                    }
                }
            })
        }
    },

    newFavApprove : function(e){
        if(confirm("선택된 결재선은 초기화됩니다. 계속하시겠습니까?")){
            $("#approvalLineDataTb tbody tr:not(:eq(0))").remove();
            lineSettingPop.global.approversArr = [];
            opener.draft.global.approversArr = [];
            opener.parent.draft.drafterArrAdd();
            lineSettingPop.global.approversArr = opener.draft.global.approversArr;
        }
    },

    rowDelClick : function(){
        var chkCnt = $("input[name='approveChk']:checked").length;

        if(chkCnt == 0){
            alert("삭제할 사용자를 선택해주세요.");
            return
        }

        lineSettingPop.global.flag = true;

        $.each($("#approvalLineDataTb tbody tr input[name='approveChk']"), function(i, e){
            if($(e).is(":checked")){
                if($(e).closest("tr").find("#approveOrder").text() == "0"){
                    alert("기안자는 삭제하실 수 없습니다.");
                    lineSettingPop.global.flag = false;
                    return false;
                }else{
                    $(e).closest("tr").remove();
                }
            }
        })

        if(lineSettingPop.global.flag){
            $.each($("#approvalLineDataTb tbody tr"), function(i, e){
                $(e).find("#approveOrder").text(i);
            })
            lineSettingPop.approveTypeChange("trMove");
        }
    },

    apprLineUpdate : function(mode){
        var chkCnt = $("input[name='approveChk']:checked").length;

        if(chkCnt > 1){
            alert("결재자를 한명만 선택해주세요.");
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
        $.each($("#approvalLineDataTb tbody tr"), function(i, e){
            $(e).find("#approveOrder").text(i);
        })

        lineSettingPop.approveTypeChange("trMove");
    },



    addClass : function(treeview, items){
        for (var i = 0; i < items.length; i++) {
            if(!items[i].hasChildren){
                treeview.findByUid(items[i].uid).attr("empseq", items[i].EMP_SEQ);
                $(treeview.findByUid(items[i].uid)).attr("ondblclick", "lineSettingPop.addTable(this,'userClick')");
            }
        }
    },

    approversArrCheck : function(){
        var htmlStr = "";
        for(var i = 0; i < lineSettingPop.global.approversArr.length; i++){
            htmlStr += "<tr onclick=\"lineSettingPop.rowsel($(this).find('input[name=approveChk]'))\" style='cursor:pointer' class='apprLineTr'>" +
                "	<td style='border-top: none; border-left: none;'>" +
                "		<input type='checkbox' name='approveChk' id='approveChk"+ lineSettingPop.global.approversArr[i].approveEmpSeq +"' class='k-checkbox checkbox' onclick='lineSettingPop.rowsel(this)'>" +
                "	</td>" +
                "	<td style='border-top: none;'>" +
                "		<input type='hidden' id='approveEmpSeq' name='approveEmpSeq' value='"+lineSettingPop.global.approversArr[i].approveEmpSeq+"'>" +
                "		<input type='hidden' id='approveEmpName' name='approveEmpName' value='"+lineSettingPop.global.approversArr[i].approveEmpName+"'>" +
                "		<input type='hidden' id='approveDeptSeq' name='approveDeptSeq' value='"+lineSettingPop.global.approversArr[i].approveDeptSeq+"'>" +
                "		<input type='hidden' id='approveDeptName' name='approveDeptName' value='"+lineSettingPop.global.approversArr[i].approveDeptName+"'>" +
                "		<input type='hidden' id='approvePositionName' name='approvePositionName' value='"+lineSettingPop.global.approversArr[i].approvePositionName+"'>" +
                "		<input type='hidden' id='approveDutyName' name='approveDutyName' value='"+lineSettingPop.global.approversArr[i].approveDutyName+"'>" +
                "		<input type='hidden' id='approveTypeInput' name='approveTypeInput' value='"+lineSettingPop.global.approversArr[i].approveType+"'>" +
                "		<span id='approveOrder'>"+lineSettingPop.global.approversArr[i].approveOrder+"</span>"+
                "	</td>";
            if(lineSettingPop.global.approversArr[i].approveType == 3){
                htmlStr += "	<td style='border-top: none;'>" + lineSettingPop.global.approversArr[i].approveEmpName + lineSettingPop.global.approveNo + "</td>";
            }else if(lineSettingPop.global.approversArr[i].approveType == 2){
                htmlStr += "	<td style='border-top: none;'>" + lineSettingPop.global.approversArr[i].approveEmpName + lineSettingPop.global.approve101 + "</td>";
            }else {
                htmlStr += "	<td style='border-top: none;'>"+lineSettingPop.global.approversArr[i].approveEmpName+"</td>";
            }

            htmlStr += "	<td style='border-top: none;'>"+lineSettingPop.global.approversArr[i].approveDeptName+"</td>" +
                "	<td style='border-top: none;'>"+lineSettingPop.global.approversArr[i].approvePositionName+"</td>" +
                "	<td style='border-top: none;'>"+lineSettingPop.global.approversArr[i].approveDutyName+"</td>" +
                "	<td style='border-top: none;'>";
            htmlStr +=  "<span id='approveType' approveType='"+ lineSettingPop.global.approversArr[i].approveType +"'>" +
                (lineSettingPop.global.approversArr[i].approveType == 3 ? "결재안함" :
                    lineSettingPop.global.approversArr[i].approveType == 2 ? "전결" :
                        lineSettingPop.global.approversArr[i].approveType == 1 ? "협조" :
                            lineSettingPop.global.approversArr[i].approveType == 0 && lineSettingPop.global.approversArr[i].approveOrder == 0 ? "상신" : "결재") +
                "</span>";

            htmlStr +=  "   </td>" +
                "</tr>";
        }
        $("#approvalLineDataTb tbody").append(htmlStr);

        lineSettingPop.approveTypeChange("trMove");
    },

    getFavApproveList : function(){
        lineSettingPop.global.searchAjaxData = {
            empSeq : $("#empSeq").val()
        }

        var result = customKendo.fn_customAjax("/approvalUser/getUserFavApproveRouteList", lineSettingPop.global.searchAjaxData);
        customKendo.fn_dropDownList("favApproveList", result, "FAV_APPROVE_ROUTE_NAME", "FAV_ROUTE_ID");
        $("#favApproveList").data("kendoDropDownList").bind("change", lineSettingPop.setFavApproveList);

    },

    setFavApproveList : function(){
        lineSettingPop.addTable(this.value(), "favClick");
    },

    rowsel : function(e){
        // $(".apprLineTr").removeClass("active");
        // $(e).addClass("active");
        if($(e).is(":checked")){
            $(e).prop("checked", false);
            $(e).closest("tr").removeClass("active");
        }else{
            $(e).closest("tr").addClass("active");
            $(e).prop("checked", true);
        }
    },

    getAbsentSetChk : function(e, d, n){
        var nowDate = new Date();
        var year = nowDate.getFullYear();
        var month = nowDate.getMonth()+1;
        var day = nowDate.getDate();
        var hour = nowDate.getHours();
        var minute = nowDate.getMinutes();

        lineSettingPop.global.searchAjaxData = {
            c_uiuserkey : e,
            c_oiorgcode : d,
            c_aisday : year+'-'+month+'-'+day,
            c_aieday : year+'-'+month+'-'+day,
            c_aistime : hour+':'+minute,
            c_aietime : hour+':'+minute,
        }

        var result = customKendo.fn_customAjax("/approval/getAbsentSetChk.do", lineSettingPop.global.searchAjaxData);
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
                    '<button type="button" class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="$(absentModal).data(\'kendoWindow\').close();">' +
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

    addTable : function(e, mode){
        if(mode == "userClick"){
            lineSettingPop.global.searchAjaxData = {
                empSeq : e
            }

            var result = customKendo.fn_customAjax("/user/getUserInfo", lineSettingPop.global.searchAjaxData);

            if(result.flag){
                lineSettingPop.global.flag = true;
                result = result;
                var htmlStr = "";

                lineSettingPop.getAbsentSetChk(result.EMP_SEQ, result.DEPT_SEQ, result.EMP_NAME_KR);

                /** 결재 */
                $.each($("input[name='approveEmpSeq']"), function(i, e){
                    if($(this).val() == result.EMP_SEQ){
                        lineSettingPop.global.flag = false;
                    }
                })

                if(lineSettingPop.global.flag){
                    if(result != null){
                        htmlStr += "<tr onclick=\"lineSettingPop.rowsel($(this).find('input[name=approveChk]'))\" style='cursor:pointer' class='apprLineTr'>" +
                            "		<td style='border-top: none; border-left: none;'>" +
                            "			<input type='checkbox' name='approveChk' id='approveChk"+ result.EMP_SEQ +"' class='k-checkbox checkbox' onclick='lineSettingPop.rowsel(this)'>" +
                            "		</td>" +
                            "		<td style='border-top: none;'>" +
                            "			<input type='hidden' id='approveEmpSeq' name='approveEmpSeq' value='"+result.EMP_SEQ+"'>" +
                            "			<input type='hidden' id='approveEmpName' name='approveEmpName' value='"+result.EMP_NAME_KR+"'>" +
                            "			<input type='hidden' id='approveDeptSeq' name='approveDeptSeq' value='"+result.DEPT_SEQ+"'>" +
                            "			<input type='hidden' id='approveDeptName' name='approveDeptName' value='"+result.DEPT_NAME+"'>" +
                            "			<input type='hidden' id='approvePositionName' name='approvePositionName' value='"+result.POSITION_NAME+"'>" +
                            "			<input type='hidden' id='approveDutyName' name='approveDutyName' value='"+result.DUTY_NAME+"'>" +
                            "			<input type='hidden' id='approveTypeInput' name='approveTypeInput' value=''>" +
                            "			<span id='approveOrder'>"+$("#approvalLineDataTb tbody tr").length+"</span>"+
                            "		</td>" +
                            "		<td style='border-top: none;'>"+result.EMP_NAME_KR+"</td>" +
                            "		<td style='border-top: none;'>"+result.DEPT_NAME+"</td>" +
                            "		<td style='border-top: none;'>"+result.POSITION_NAME+"</td>" +
                            "		<td style='border-top: none;'>"+result.DUTY_NAME+"</td>" +
                            "       <td style='border-top: none;'>";
                        // if($("#approvalLineDataTb tbody tr").length > 1){
                        //     htmlStr += "           <span id='approveType' approveType='0'>검토</span>";
                        // }else{
                        htmlStr += "           <span id='approveType' approveType='0'>결재</span>";
                        // }
                        htmlStr += "       </td>" +
                            "	</tr>";
                    }
                    $("#approvalLineDataTb tbody").append(htmlStr);

                    lineSettingPop.approveTypeChange("trMove");
                }
            }
        }else{
            lineSettingPop.global.searchAjaxData = {
                empSeq : $("#empSeq").val(),
                favRouteId : e
            }

            var result = customKendo.fn_customAjax("/approvalUser/getUserFavApproveRouteDetail", lineSettingPop.global.searchAjaxData);
            if(result.flag){
                lineSettingPop.global.flag = true;
                result = result.rs;

                $("#approvalLineDataTb tbody tr:not(:eq(0))").remove();

                for(var i = 0; i < result.length; i++){
                    var htmlStr = "";

                    htmlStr += "<tr onclick=\"lineSettingPop.rowsel($(this).find('input[name=approveChk]'))\" style='cursor:pointer' class='apprLineTr'>" +
                        "		<td style='border-top: none; border-left: none;'>" +
                        "			<input type='checkbox' name='approveChk' id='approveChk"+ result[i].APPROVE_EMP_SEQ +"' class='k-checkbox checkbox' onclick='lineSettingPop.rowsel(this)'>" +
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
                        "           <span id='approveType' approveType='0'>결재</span>" +
                        "       </td>" +
                        "	</tr>";

                    $("#approvalLineDataTb tbody").append(htmlStr);

                    lineSettingPop.approveTypeChange("trMove");
                }
            }
        }
    },

    apprLineSave : function(){
        lineSettingPop.global.approversArr = [];
        opener.parent.draft.drafterArrAdd();

        /** 결재선 */
        $.each($("#approvalLineDataTb tbody tr"), function(){
            var empNameTdSpan = $(this).find("td:last span").attr("approveType");

            var data = {
                approveEmpSeq : $(this).find("#approveEmpSeq").val(),
                approveEmpName : $(this).find("#approveEmpName").val(),
                approvePositionName : $(this).find("#approvePositionName").val(),
                approveDutyName : $(this).find("#approveDutyName").val(),
                approveDeptSeq : $(this).find("#approveDeptSeq").val(),
                approveDeptName : $(this).find("#approveDeptName").val(),
                approveOrder : $(this).find("#approveOrder").text(),
                approveType : empNameTdSpan
            }
            lineSettingPop.global.approversArr.push(data);

            if(empNameTdSpan == "2"){
                opener.draft.global.lastApprover = {
                    approveEmpSeq : $(this).find("#approveEmpSeq").val(),
                    approveEmpName : $(this).find("#approveEmpName").val(),
                    approvePositionName : $(this).find("#approvePositionName").val(),
                    approveDutyName : $(this).find("#approveDutyName").val(),
                    approveType : "2"
                }
            }
        });

        if(opener.draft.global.lastApprover.approveEmpSeq == null){
            var lastTdSpan = $("#approvalLineDataTb tr:last").find("td:last span").attr("approveType");
            opener.draft.global.lastApprover = {
                approveEmpSeq : $("#approvalLineDataTb tr:last").find("#approveEmpSeq").val(),
                approveEmpName : $("#approvalLineDataTb tr:last").find("#approveEmpName").val(),
                approvePositionName : $("#approvalLineDataTb tr:last").find("#approvePositionName").val(),
                approveDutyName : $("#approvalLineDataTb tr:last").find("#approveDutyName").val(),
                approveType : lastTdSpan
            }
        }

        lineSettingPop.global.flag = $("#approvalLineDataTb tr:last").find("td:eq(6) span").attr("approveType") == 1 ? false : true;

        if(!lineSettingPop.global.flag){
            alert("마지막 결재자는 결재유형을 협조로 할수 없습니다.");

            return;
        }

        opener.draft.global.approversArr = lineSettingPop.global.approversArr;
        opener.parent.draft.setHwpApprovalLinePut();
        window.close();
    }

}
