
var subHolidayListPop = {
    global : {
        flag : true,
        pathName : "",
        searchAjaxData : "",
        approveAddBtn : function(e) {
            return '<button type="button" class="k-grid-add k-button k-button-md k-button-solid k-button-solid-base" onclick="subHolidayListPop.addTable(\'' + e.EMP_SEQ + '\',\'userClick\')">' +
                '<span class="k-button-text">선택</span>	' +
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
            select: subHolidayListPop.treeClick,
        });


        subHolidayListPop.treeViewReload(deptSeq);

        $("#addSubHLineGrid, #addCooperationLineGrid, #addReaderListGrid").kendoGrid({
            resizable: true,
            columns: [
                {
                    /*headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" class="k-checkbox checkbox"/>',
                    width : 15
                }, {*/
                    title : "순번",
                    width : "10%"
                }, {
                    title : "이름",
                    width : "15%"
                }, {
                    title : "부서",
                    width : "35%"
                }, {
                    title : "직급",
                    width : "15%"
                }, {
                    title : "직책",
                    width : "20%"
                }
            ]
        });
    },

    treeViewReload : function(dept){
        subHolidayListPop.global.searchAjaxData = {
            deptSeq : dept
        }

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
                    data.DEPT_SEQ = dept;
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

        $("#userList").kendoGrid({
            dataSource: deptUserDataSource,
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
                    field: "DEPT_NAME",
                    title: "부서",
                    width: "100px",
                }, {
                    field: "DUTY_NAME",
                    title: "직책",
                    width: "100px",
                }, {
                    field: "EMP_NAME_KR",
                    title: "이름",
                    width: "100px",
                }, {
                    width: "70px",
                    template: subHolidayListPop.global.approveAddBtn,
                }],
        }).data("kendoGrid");
    },

    treeClick : function(e) {
        var item = $("#treeview").data("kendoTreeView").dataItem(e.node);
        deptSeq = item.dept_seq;
        deptName = item.dept_name;
        subHolidayListPop.treeViewReload(deptSeq);
        $("#userList").data("kendoGrid").dataSource.read();
    },

    gridReload : function() {
        $("#mainGrid").data("kendoGrid").dataSource.read();
    },

    newFavApprove : function(e){
        if(confirm("선택된 업무인수자는 초기화됩니다. 계속하시겠습니까?")){
            $("#approvalLineDataTb tbody tr").remove();
            subHolidayListPop.global.approversArr = [];
            opener.draft.global.approversArr = [];
            opener.parent.draft.drafterArrAdd();
            subHolidayListPop.global.approversArr = opener.draft.global.approversArr;
        }
    },

    rowDelClick : function(){
        var chkCnt = $("input[name='approveChk']:checked").length;

        if(chkCnt == 0){
            alert("삭제할 업무인수자를 선택해주세요.");
            return
        }

        subHolidayListPop.global.flag = true;

        if(subHolidayListPop.global.flag){
            $.each($("#approvalLineDataTb tbody tr"), function(i, e){
                $(e).find("#approveOrder").text(i);
            })
            subHolidayListPop.approveTypeChange("trMove");
        }
    },

    gridChoose : function () {

        $.each($("#approvalLineDataTb tbody tr"), function(){

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

        });

        var tr = $(e).closest("tr");
        var row = $('#userList').data("kendoGrid").dataItem(tr);
        console.log(row);
        console.log(row.EMP_NAME_KR);
        console.log(row.EMP_SEQ);
        opener.parent.$("#other_emp").val(row.EMP_NAME_KR);
        opener.parent.$("#userName").val(row.EMP_NAME_KR);
        //emp_seq, dept_seq, dept_name
        opener.parent.$("#empSeq").val(row.EMP_SEQ);
        opener.parent.$("#deptSeq").val(row.DEPT_SEQ);
        opener.parent.$("#deptName").val(row.DEPT_NAME);
        window.close();
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

                    $.each($("input[name='approveEmpSeq']"), function(i, e){
                        if($(this).val() == result.EMP_SEQ){
                            flag = false;
                        }
                    })

                    if(flag){
                        if(result != null){
                            htmlStr += "<tr ondblclick='appUser.rowDblClick(this)' onclick='appUser.rowsel(this)' style='cursor:pointer' class='apprLineTr newApprLine'>" +
                                "		<td>" +
                                "			<input type='hidden' id='approveEmpSeq' name='approveEmpSeq' value='"+result.EMP_SEQ+"'>" +
                                "			<input type='hidden' id='approveEmpName' name='approveEmpName' value='"+result.EMP_NAME_KR+"'>" +
                                "			<input type='hidden' id='approveDeptName' name='approveDeptName' value='"+result.DEPT_NAME+"'>" +
                                "			<input type='hidden' id='approvePositionName' name='approvePositionName' value='"+result.POSITION_NAME+"'>" +
                                "			<input type='hidden' id='approveDutyName' name='approveDutyName' value='"+result.DUTY_NAME+"'>" +
                                "			<span id='approveOrder'>"+($("#approvalLineDataTb tbody tr").length+1)+"</span>"+
                                "		</td>" +
                                "		<td>"+result.EMP_NAME_KR+"</td>" +
                                "		<td>"+result.DEPT_NAME+"</td>" +
                                "		<td>"+result.POSITION_NAME+"</td>" +
                                "		<td>"+result.DUTY_NAME+"</td>" +
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
                            "	</tr>";

                        $("#approvalLineDataTb tbody").append(htmlStr);
                    }
                }
            })
        }
    },

}
