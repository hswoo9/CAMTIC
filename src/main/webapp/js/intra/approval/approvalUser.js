var appUser = {
    global : {
        flag : true,
        deptSeq : $("#deptSeq").val(),
        deptName : $("#deptName").val(),
        approvalsArr : new Array(),
        approve : "",
        approve101 : "<span class='k-icon k-i-check-circle k-button-icon approve101'></span>",
        approveNo : "<span class='k-icon k-i-x-circle k-button-icon approveNo'></span>",
    },

    treeClick : function(e) {
        var item = $("#deptTree").data("kendoTreeView").dataItem(e.node);
        appUser.global.deptSeq = item.dept_seq;
        $("#deptSeq").val(item.dept_seq);
        $("#deptUserGrid").data("kendoGrid").dataSource.read();
    },

    dateSet : function() {
        $("#apprLineTabStrip").kendoTabStrip({
            animation:  {
                open: {
                    effects: "fadeIn"
                }
            }
        });

        $("#deptUserInfoTabStrip").kendoTabStrip({
            animation:  {
                open: {
                    effects: "fadeIn"
                }
            }
        });
    },

    fnDefaultScript : function(datas){

        appUser.dateSet();

        $("#deptTree").kendoTreeView({
            dataSource: datas,
            dataTextField:['dept_name'],
            select: appUser.treeClick,
        });

        var deptUserDataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : "/approvalUser/getUserList",
                    async : false,
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data, operation) {
                    data.fullTime2 = "1";
                    data.DEPT_SEQ = $("#deptSeq").val();
                    return data;
                }
            },
            schema : {
                data: function (data) {
                    return data;
                },
                total: function (data) {
                    return data.length;
                },
            },
            pageSize: 10,
        });

        $("#deptUserGrid").kendoGrid({
            dataSource: deptUserDataSource,
            height: 348,
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
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    field : 'EMP_NAME_KR',
                    title : "이름"
                }, {
                    field : 'DEPT_NAME',
                    title : "부서"
                }, {
                    field : 'POSITION_NAME',
                    title : "직급"
                }, {
                    field : 'DUTY_NAME',
                    title : "직책"
                }, {
                    title : "선택",
                    template : function (row){
                        return "<button type=\"button\" class=\"k-button k-button-md k-button-solid k-button-solid-base\" onclick=\"appUser.addTable("+row.EMP_SEQ+",'userClick')\">" +
                            '	<span class="k-icon k-i-check k-button-icon"></span>' +
                            '	<span class="k-button-text">선택</span>' +
                            '</button>';
                    }
                }
            ]
        }).data("kendoGrid");

        var favApproveDataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : "/approvalUser/getUserFavApproveRouteList",
                    async : false,
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    data.empSeq = $("#empSeq").val();
                    return data;
                }
            },
            schema : {
                data: function (data) {
                    return data;
                },
                total: function (data) {
                    return data.length;
                },
            }
        });

        $("#favApproveGrid").kendoGrid({
            dataSource: favApproveDataSource,
            height: 389,
            scrollable: true,
            toolbar : [
                {
                    name : 'button',
                    template : function (e){
                        return "<div>" +
                            "<button type=\"button\" class=\"k-button k-button-md k-button-solid k-button-solid-base\" onclick=\"appUser.setFavApprRoutedel()\">" +
                            '	<span class="k-icon k-i-trash k-button-icon"></span>' +
                            '	<span class="k-button-text">삭제</span>' +
                            '</button>';
                    }
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" class="k-checkbox checkbox"/>',
                    template : "<input type='checkbox' id='favPk#=FAV_ROUTE_ID#' name='favPk' value='#=FAV_ROUTE_ID#' class='k-checkbox checkbox'/>",
                    width: 40
                }, {
                    field : 'FAV_APPROVE_ROUTE_NAME',
                    title : "결재선 이름"
                }, {
                    title : "조회",
                    template : function (e){
                        return "<button type=\"button\" class=\"k-button k-button-md k-button-solid k-button-solid-base\" onclick=\"appUser.addTable("+e.FAV_ROUTE_ID+",'favClick')\">" +
                            '	<span class="k-icon k-i-search k-button-icon"></span>' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    },
                    width: 80
                }
            ]
        }).data("kendoGrid");

        $("#addApprLineGrid").kendoGrid({
            toolbar : [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" id="approve" onclick="appUser.approveTypeChange(\'approve\')">' +
                                    '<span class="k-button-text">검토</span>' +
                                '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" id="cooperation" onclick="appUser.approveTypeChange(\'cooperation\')">' +
                                    '<span class="k-button-text">협조</span>' +
                                '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" id="approve101Btn" onclick="appUser.approveTypeChange(\'finalType1Approve\')">' +
                            '<span class="k-button-text">전결</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="appUser.newFavApprove()">' +
                            '<span class="k-icon k-i-plus k-button-icon"></span>' +
                            '<span class="k-button-text">초기화</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return "<button type=\"button\" class=\"k-button k-button-md k-button-solid k-button-solid-base\" onclick=\"appUser.apprLineUpdate('up')\">" +
                            '	<span class="k-icon k-i-caret-double-alt-up k-button-icon"></span>' +
                            '	<span class="k-button-text">위로</span>' +
                            '</button>';
                    }
                }, {
                    template : function (e){
                        return "<button type=\"button\" class=\"k-button k-button-md k-button-solid k-button-solid-base\" onclick=\"appUser.apprLineUpdate('down')\">" +
                            '	<span class="k-icon k-i-caret-double-alt-down k-button-icon"></span>' +
                            '	<span class="k-button-text">아래로</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return "<input type='text' id='favApproveRouteName' name='favApproveRouteName' placeholder='결재선 이름'>" +
                            "<button type=\"button\" class=\"k-grid-save-changes k-button k-button-md k-button-solid k-button-solid-base\" onclick='appUser.setFavApproveSave()'>" +
                            '	<span class="k-icon k-i-check k-button-icon"></span>' +
                            '	<span class="k-button-text">저장</span>' +
                            '</button>';
                    }
                }, {
                    template : function (e){
                        return "	<button type=\"button\" class=\"k-grid-add k-button k-button-md k-button-solid k-button-solid-base\" onclick='appUser.newFavApprove()'>" +
                            '		<span class="k-icon k-i-plus k-button-icon"></span>' +
                            '		<span class="k-button-text">신규</span>' +
                            '	</button>';
                    }
                }
            ],
            columns: [
                {
                    title : "순번",
                    width : 47
                }, {
                    title : "이름",
                    width : 77
                }, {
                    title : "부서",
                    width: 207
                }, {
                    title : "직급",
                    width : 93
                }, {
                    title : "직책",
                    width : 94
                }, {
                    title : "결재유형",
                    width : 47
                }
            ]
        });
    },

    /**
     * 즐겨찾기 결재선 종료
     */
    addClass : function(treeview, items) {
        for (var i = 0; i < items.length; i++) {
            if(!items[i].hasChildren){
                treeview.findByUid(items[i].uid).attr("empseq", items[i].EMP_SEQ);
                $(treeview.findByUid(items[i].uid)).attr("ondblclick", "addTable(this,'userClick')");
            }
        }
    },

    setFavApprRoutedel : function() {
        if($("input[name='favPk']:checked").length == 0){
            alert("결재선을 선택해주세요.");
            return;
        }else if(!confirm("선택한 결재선을 삭제하시겠습니까?")){
            return;
        }

        var favArr = new Array();
        $("input[name='favPk']").each(function(){
            if(this.checked){
                favArr.push(this.value);
            }
        })

        $.ajax({
            url : "/approvalUser/setUserFavApproveRouteActiveN",
            data : {
                favArr : favArr,
                activeN : "activeN"
            },
            dataType : "json",
            type : "POST",
            success : function (result){
                var rs = result;
                alert(rs.message);
                if(rs.code == "200"){
                    $("#favApproveGrid").data("kendoGrid").dataSource.read();
                    $("#approvalLineDataTb tbody").empty();
                }
            }
        })
    },

    addTable : function(e, mode) {
        if(mode == "userClick"){
            $.ajax({
                url: "/user/getUserInfo",
                data : {
                    empSeq : e
                },
                dataType: "json",
                type : "post",
                success : function(rs){
                    var result = rs;
                    var flag = true;
                    var htmlStr = "";

                    if($("#regEmpSeq").val() == result.EMP_SEQ){
                        flag = false;
                    }

                    $.each($("#approvalLineDataTb tbody tr"), function(){
                        if($(this).find("#approveEmpSeq").val() == result.EMP_SEQ){
                            flag = false;
                        }
                    });

                    if(flag){
                        if(result != null){
                            htmlStr += "<tr ondblclick='appUser.rowDblClick(this)' onclick='appUser.rowsel(this)' style='cursor:pointer' class='apprLineTr newApprLine'>" +
                                "		<td>" +
                                "			<input type='hidden' id='approveEmpSeq' name='approveEmpSeq' value='"+result.EMP_SEQ+"'>" +
                                "			<input type='hidden' id='approveEmpName' name='approveEmpName' value='"+result.EMP_NAME_KR+"'>" +
                                "			<input type='hidden' id='approveDeptName' name='approveDeptName' value='"+result.DEPT_NAME+"'>" +
                                "			<input type='hidden' id='approveDeptSeq' name='approveDeptName' value='"+result.DEPT_SEQ+"'>" +
                                "			<input type='hidden' id='approvePositionName' name='approvePositionName' value='"+result.POSITION_NAME+"'>" +
                                "			<input type='hidden' id='approveDutyName' name='approveDutyName' value='"+result.DUTY_NAME+"'>" +
                                "			<span id='approveOrder'>"+($("#approvalLineDataTb tbody tr").length+1)+"</span>"+
                                "		</td>" +
                                "		<td>"+result.EMP_NAME_KR+"</td>" +
                                "		<td>"+result.DEPT_NAME+"</td>" +
                                "		<td>"+result.POSITION_NAME+"</td>" +
                                "		<td>"+result.DUTY_NAME+"</td>" +
                                "       <td style='border-top: none;'>" +
                                "           <span id='approveType' approveType='0'>결재</span>" +
                                "       </td>" +
                                "	</tr>";
                        }
                        $("#approvalLineDataTb tbody").append(htmlStr);
                    }
                }
            })
        }else{

            $("#favRouteId").val(e);
            $.ajax({
                url: "/approvalUser/getUserFavApproveRouteDetail",
                data : {
                    empSeq : $("#empSeq").val(),
                    favRouteId : e
                },
                dataType: "json",
                type : "post",
                success : function(rs){
                    var result = rs;

                    $("#approvalLineDataTb tbody").empty();

                    for(var i = 0; i < result.length; i++){
                        var htmlStr = "";

                        htmlStr += "<tr ondblclick='appUser.rowDblClick(this)' onclick='appUser.rowsel(this)' style='cursor:pointer' class='apprLineTr modApprLine'>" +
                            "		<td>" +
                            "			<input type='hidden' id='approveEmpSeq' name='approveEmpSeq' value='"+result[i].APPROVE_EMP_SEQ+"'>" +
                            "			<input type='hidden' id='approveEmpName' name='approveEmpName' value='"+result[i].APPROVE_EMP_NAME+"'>" +
                            "			<input type='hidden' id='approveDeptName' name='approveDeptName' value='"+result[i].APPROVE_DEPT_NAME+"'>" +
                            "			<input type='hidden' id='approvePositionName' name='approvePositionName' value='"+result[i].APPROVE_POSITION_NAME+"'>" +
                            "			<input type='hidden' id='approveDutyName' name='approveDutyName' value='"+result[i].APPROVE_DUTY_NAME+"'>" +
                            "			<span id='approveOrder'>"+result[i].APPROVE_ORDER+"</span>"+
                            "		</td>" +
                            "		<td>"+result[i].APPROVE_EMP_NAME+"</td>" +
                            "		<td>"+result[i].APPROVE_DEPT_NAME+"</td>" +
                            "		<td>"+result[i].APPROVE_POSITION_NAME+"</td>" +
                            "		<td>"+result[i].APPROVE_DUTY_NAME+"</td>" +
                            "	    <td style='border-top: none;'>" +
                            "           <span id='approveType' approvetype='"+ result[i].APPROVE_TYPE +"'>" +
                                        (result[i].APPROVE_TYPE == 3 ? "결재안함" : result[i].APPROVE_TYPE == 2 ? "전결" : result[i].APPROVE_TYPE == 1 ? "협조" : result[i].APPROVE_TYPE == 0 && result[i].APPROVE_ORDER == 0 ? "상신" : "결재") +
                            "           </span>" +
                            "       </td>" +
                            "	</tr>";

                        $("#approvalLineDataTb tbody").append(htmlStr);
                    }
                }
            })
        }
    },

    rowsel : function(e){
        $(".apprLineTr").removeClass("active");
        $(e).addClass("active");
    },

    rowDblClick : function(e){
        $(e).remove();

        $.each($("#approvalLineDataTb tbody tr"), function(i, e){
            $(e).find("#approveOrder").text(i+1);
        })
    },

    apprLineUpdate : function(mode){
        $.each($("#approvalLineDataTb tbody tr"), function(i, e){
            if($(e).hasClass("active")){
                if(mode == "up"){
                    $(e).prev().before($(e));
                }else{
                    $(e).next().after($(e));
                }
            }
        });
        $.each($("#approvalLineDataTb tbody tr"), function(i, e){
            $(e).find("#approveOrder").text(i+1);
        })
    },

    onClick : function(e) {
        if ($(e.target).hasClass("k-checkbox")) {
            return;
        }
        var row = $(e.target).closest("tr");
        var checkbox = $(row).find(".k-checkbox");
        checkbox.click();
    },

    setFavApproveSave : function() {
        var flag = true;
        if($("#approvalLineDataTb tbody tr").length == 0){
            alert("결재선을 추가해주세요.");
            flag = false;
            return;
        }else if(!$("#favRouteId").val() && !$("#favApproveRouteName").val()){
            alert("저장할 결재선 이름을 입력해주세요.");
            flag = false;
            return;
        }

        approversArr = [];

        $.each($("#approvalLineDataTb tbody tr"), function(){
            var data = {
                empSeq : $("#empSeq").val(),
                favRouteId : $("#favRouteId").val(),
                approveEmpSeq : $(this).find("#approveEmpSeq").val(),
                approveEmpName : $(this).find("#approveEmpName").val(),
                approveStatCodeDesc : "",
                approveStatCode : "",
                approveType : $(this).find("#approveType").attr("approvetype"),
                approvePositionName : $(this).find("#approvePositionName").val(),
                approveDutyName : $(this).find("#approveDutyName").val(),
                approveDeptName : $(this).find("#approveDeptName").val(),
                approveDeptSeq : $(this).find("#approveDeptSeq").val(),
                approveOrder : $(this).find("#approveOrder").text()
            }
            approversArr.push(data);
        });

        var lineFlag = true;
        for(var i = 0 ; i < approversArr.length ; i++){
            if(approversArr[i].approveType == "0"){
                lineFlag = false;
            }

            if(approversArr[i].approveType == "1"){
                if(!lineFlag){
                    alert("협조자는 상신자 다음으로만 설정이 가능합니다.");
                    return;
                }
            }
        }

        if(confirm("결재선을 저장하시겠습니까?")){
            if(flag){
                $.ajax({
                    url : "/approvalUser/setUserFavApproveRoute",
                    data : {
                        empSeq : $("#empSeq").val(),
                        favRouteId : $("#favRouteId").val(),
                        favApproveRouteName : $("#favApproveRouteName").val(),
                        favApproveRoute : JSON.stringify(approversArr)
                    },
                    dataType : "json",
                    async : false,
                    success : function (result){
                        var result = result;
                        alert(result.message);
                        $("#favApproveGrid").data("kendoGrid").dataSource.read();
                    }
                })
            }
        }
    },

    newFavApprove : function(){
        if(confirm("저장하지 않은 결재선은 삭제됩니다. 계속하시겠습니까?")){
            $("#favRouteId").val("");
            $("#favApproveRouteName").val("");
            $("#approvalLineDataTb tbody").empty();
        }
    },

    approveTypeChange : function(type){
        var approve101Index;
        var approveType = type == "approve" ? "0" : "1";
        var approveTypeText = type == "approve" ? "결재" : "협조";

        if(type == "approve" || type == "cooperation") {
            $.each($("#approvalLineDataTb tbody tr"), function(i, e){
                if($(e).hasClass("active")){
                    var thisApproveT = $(this).closest("tr").find("td:last span");

                    if(thisApproveT.attr("approveType") == "2"){
                        $(".approve101, .approveNo").remove();
                        approve101Index = i;
                    }

                    if(type == "approve"){
                        if(thisApproveT.attr("approveType") == "3"){

                        }else if($(".apprLineTr").length == ($(e).closest("tr").index() + 1)){
                            thisApproveT.attr("approveType", approveType).text(approveTypeText);
                        }else{
                            thisApproveT.attr("approveType", approveType).text("검토");
                        }
                    }else{
                        thisApproveT.attr("approveType", approveType).text(approveTypeText);
                    }
                }
            });
        } else {
            var approve101EmpSeq = $("span.approve101").closest("tr").find("#approveEmpSeq").val();
            approve101Index = $("span.approve101").closest("tr").index() == -1 ? 0 : $("span.approve101").closest("tr").index();
            appUser.global.flag = false;

            $(".approve101, .approveNo").remove();

            $.each($("#approvalLineDataTb tbody tr"), function(i, e){
                var empNameTd = $(e).closest("tr").find("td:eq(1)");
                var approveTypeTd = $(e).closest("tr").find("td:eq(5) span");

                $("span.approve101").closest("tr").index()
                if(type == "finalType1Approve"){
                    if($(e).hasClass("active")){
                        // empNameTd.append(appUser.global.approve101);
                        $(approveTypeTd).attr("approveType", "2").text("전결");
                        approve101Index = i;
                        appUser.global.flag = true;
                    }
                }else{
                    if($(e).closest("tr").find("#approveEmpSeq").val() == approve101EmpSeq){
                        // empNameTd.append(appUser.global.approve101);
                        $(approveTypeTd).attr("approveType", "2").text("전결");
                        appUser.global.flag = true;
                    }
                }

                if(approve101Index < i && appUser.global.flag){
                    empNameTd.append(appUser.global.approveNo);
                    $(approveTypeTd).attr("approveType", "3").text("결재안함");
                }else if(!appUser.global.flag){
                    empNameTd.find("span").remove();
                    if($(approveTypeTd).attr("approveType") == "3"){
                        $(approveTypeTd).attr("approveType", "0").text("검토");
                    }else if($(approveTypeTd).attr("approveType") == "0" && $(e).closest("tr").find("#approveOrder").text() == "0"){
                        $(approveTypeTd).attr("approveType", "0").text("상신");
                    }else if($(approveTypeTd).attr("approveType") == "0" && $(".apprLineTr").length == ($(e).closest("tr").index() + 1)){
                        $(approveTypeTd).attr("approveType", "0").text("결재");
                    }else if($(approveTypeTd).attr("approveType") == "1"){
                        $(approveTypeTd).attr("approveType", "1").text("협조");
                    }else{
                        $(approveTypeTd).attr("approveType", "0").text("검토");
                    }
                }
            })
        }
    },
}