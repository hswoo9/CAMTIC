
var userMultiSel = {
    global : {
        flag : true,
        pathName : "",
        searchAjaxData : "",
        approveAddBtn : function(e) {
            return '<button type="button" class="k-grid-add k-button k-button-md k-button-solid k-button-solid-base" onclick="userMultiSel.addTable(\'' + e.EMP_SEQ + '\',\'userClick\')">' +
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
            select: userMultiSel.treeClick,
        });

        $("#addSubHLineGrid, #addCooperationLineGrid, #addReaderListGrid").kendoGrid({
            resizable: true,
            columns: [
                {
                    title : "순번",
                    width : "41px"
                }, {
                    title : "이름",
                    width : "106px"
                }, {
                    title : "부서",
                    width : "190px"
                }, {
                    title : "직급",
                    width : "106px"
                }, {
                    title : "직책",
                    width : "106px"
                }
            ]
        });
    },

    treeViewReload : function(dept){
        userMultiSel.global.searchAjaxData = {
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
                    if($("#sEmpName").val() == '' || $("#sEmpName").val() == null){
                        data.DEPT_SEQ = $("#deptSeq").val();
                    } else {
                        data.sEmpName = $("#sEmpName").val();
                    }

                    if($("#type").val() != "partRate" && $("#type").val() != "temp"){
                        data.fullTime2 = "1";
                    }

                    if($("#type").val() == "partRate"){
                        data.reqType = "partRate";
                    }

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
            height: 395,
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
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            toolbar : [
                {
                    name: '',
                    text: '조회',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="userMultiSel.treeViewReload();">' +
                            '   <span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                },
            ],
            columns: [
                {
                    field: "DEPT_NAME",
                    title: "부서",
                    width: "100px",
                }, {
                    title: "직위",
                    width: "100px",
                    template: function(row){
                        if(row.DUTY_NAME != undefined && row.DUTY_NAME != "") {
                            return row.DUTY_NAME;
                        }else {
                            return row.POSITION_NAME;
                        }
                    }
                }, {
                    field: "EMP_NAME_KR",
                    title: "이름",
                    width: "100px",
                }, {
                    width: "70px",
                    template: userMultiSel.global.approveAddBtn,
                }],
        }).data("kendoGrid");
    },

    treeClick : function(e) {
        var item = $("#treeview").data("kendoTreeView").dataItem(e.node);
        deptSeq = item.dept_seq;
        deptName = item.dept_name;
        // userMultiSel.treeViewReload(deptSeq);
        $("#deptSeq").val(item.dept_seq);
        $("#sEmpName").val('');
        $("#userList").data("kendoGrid").dataSource.read();
    },

    gridReload : function() {
        $("#mainGrid").data("kendoGrid").dataSource.read();
    },

    gridChoose : function (e) {
        var tr = $(e).closest("tr");
        var row = $('#userList').data("kendoGrid").dataItem(tr);

        opener.parent.$("#regtrName").val(row.EMP_NAME_KR);
        opener.parent.$("#userName").val(row.EMP_NAME_KR);
        //emp_seq, dept_seq, dept_name
        opener.parent.$("#empSeq").val(row.EMP_SEQ);
        opener.parent.$("#deptSeq").val(row.DEPT_SEQ);
        opener.parent.$("#deptName").val(row.DEPT_NAME);

        window.close();
    },

    newFavApprove : function(e){
        $("#approvalLineDataTb tbody tr").remove();
    },

    rowDblClick : function(e){
        $.each($("input[name='readerPk']:checked"), function(i, e){
            $(this).closest("tr").remove();
        })
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

    addTable : function(e, mode) {
        if($("#type").val() == "bustrip"){
            if(e == $("#empSeq").val()){
                return;
            }
        }
        if($("#type").val() == "bustripT"){
            if(e == $("#empSeq").val()){
                return;
            }
            if($("#approvalLineDataDiv").find("tr").length > 0){
                alert("출장자는 1명만 선택가능합니다.");
                return;
            }
        }
        if($("#type").val() == "dev2"){
            if($("#approvalLineDataDiv").find("tr").length > 0){
                alert("담당자는 1명만 선택가능합니다.");
                return;
            }
        }

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
                            htmlStr += "<tr ondblclick='userMultiSel.rowDblClick(this)' style='cursor:pointer' class='apprLineTr newApprLine'>" +
                                "		<td>" +
                                "			<input type='hidden' id='approveEmpSeq' name='approveEmpSeq' value='"+result.EMP_SEQ+"'>" +
                                "			<input type='hidden' id='approveEmpName' name='approveEmpName' value='"+result.EMP_NAME_KR+"'>" +
                                "			<input type='hidden' id='approveDeptSeq' name='approveDeptSeq' value='"+result.DEPT_SEQ+"'>" +
                                "			<input type='hidden' id='approveDeptName' name='approveDeptName' value='"+result.DEPT_NAME+"'>" +
                                "			<input type='hidden' id='approvePositionCode' name='approvePositionCode' value='"+result.POSITION_CODE+"'>" +
                                "			<input type='hidden' id='approvePositionName' name='approvePositionName' value='"+result.POSITION_NAME+"'>" +
                                "			<input type='hidden' id='approveDutyCode' name='approveDutyCode' value='"+result.DUTY_CODE+"'>" +
                                "			<input type='hidden' id='approveDutyName' name='approveDutyName' value='"+result.DUTY_NAME+"'>" +
                                "			<input type='hidden' id='loginId' name='loginId' value='"+result.LOGIN_ID+"'>" +
                                "<input type='checkbox' id='approveOrder"+$("#approvalLineDataTb tbody tr").length+1+"' name='readerPk' value='"+$("#approvalLineDataTb tbody tr").length+1+"' class='k-checkbox checkbox'/" +
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

    apprLineSave : function(){
        let userArr = [];

        let empNameArr = "";
        let empSeqArr = "";

        let flag = true;

        /** 결재선 */
        $.each($("#approvalLineDataTb tbody tr"), function(){
            let data = {
                empSeq : $(this).find("#approveEmpSeq").val(),
                empName : $(this).find("#approveEmpName").val(),
                positionName : $(this).find("#approvePositionName").val(),
                dutyName : $(this).find("#approveDutyName").val(),
                deptSeq : $(this).find("#approveDeptSeq").val(),
                deptName : $(this).find("#approveDeptName").val(),
                regTeamSeq : $(this).find("#approveTeamId").val(),
                loginId : $(this).find("#loginId").val()
            }

            if($("#type").val() == "openStudy"){
                data.regEmpSeq = $(this).find("#approveEmpSeq").val();
                data.pk = opener.parent.$("#pk").val();

                $.ajax({
                    url: "/campus/getOpenStudyUserDoubleChk",
                    data: data,
                    type: "post",
                    dataType: "json",
                    async: false,
                    success: function(rs) {
                        if(rs.rs == "1"){
                            flag = false;
                        }
                    },
                    error: function (e) {
                        console.log('error : ', e);
                    }
                });
            }

            empNameArr += data.empName + ",";
            empSeqArr += data.empSeq + ",";

            userArr.push(data);
        });

        if($("#type").val() == "openStudy" && !flag){
            alert("중복된 참여는 불가능합니다.");
            return false;
        }

        opener.parent.userDataSet(userArr, empNameArr, empSeqArr, $("#type").val());

        window.close();
    }

}
