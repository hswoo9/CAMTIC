
var deptListPop = {
    global : {
        flag : true,
        approveAddBtn : function(e) {
            return '<button type="button" class="k-grid-add k-button k-button-md k-button-solid k-button-solid-base" onclick="deptListPop.gridChoose(this);">' +
                '<span class="k-button-text">선택</span>	' +
                '</button>';
        }
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
            select: deptListPop.treeClick,
        });


        deptListPop.treeViewReload(deptSeq);

    },

    treeViewReload : function(dept){
        deptListPop.global.searchAjaxData = {
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
                    data.fullTime2 = "1";
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
            toolbar : [
                {
                    name: '',
                    text: '조회',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="deptListPop.treeViewReload();">' +
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
                    field: "직위",
                    width: "100px",
                    template: function(row){
                        return fn_getSpot(row.DUTY_NAME, row.POSITION_NAME);
                    }
                }, {
                    field: "EMP_NAME_KR",
                    title: "이름",
                    width: "100px",
                }, {
                    width: "70px",
                    template: deptListPop.global.approveAddBtn,
                }],
        }).data("kendoGrid");
    },

    treeClick : function(e) {
        var item = $("#treeview").data("kendoTreeView").dataItem(e.node);
        deptSeq = item.dept_seq;
        deptName = item.dept_name;
        // deptListPop.treeViewReload(deptSeq);
        $("#deptSeq").val(item.dept_seq);
        $("#sEmpName").val('');
        $("#userList").data("kendoGrid").dataSource.read();
    },
    gridReload : function() {
        $("#mainGrid").data("kendoGrid").dataSource.read();
    },

    gridChoose : function (e) {
        if(e != null) {
            if ($("#type").val() == "dev"){
                var tr = $(e).closest("tr");
                var row = $('#userList').data("kendoGrid").dataItem(tr);
                opener.parent.userPopClose(row.EMP_SEQ, row.EMP_NAME_KR, $("#idx").val());

                window.close();
            }else if($("#type").val() == "rndResearcher"){
                deptListPop.fn_selRsch(e);
            }else if($("#type").val() == "testType"){

            } else if($("#type").val() == "absent"){
                var tr = $(e).closest("tr");
                var row = $('#userList').data("kendoGrid").dataItem(tr);
                opener.parent.userPopupClose(row);
                window.close();
            }else if($("#type").val() == "cardMng"){
                var tr = $(e).closest("tr");
                var row = $('#userList').data("kendoGrid").dataItem(tr);
                try {
                    opener.parent.userPayMngPop(row.EMP_SEQ, row.EMP_NAME_KR, row.DEPT_SEQ, row.DEPT_NAME);
                    window.close();
                }catch{

                }
            }else if($("#type").val() == "cardHolder"){
                var tr = $(e).closest("tr");
                var row = $('#userList').data("kendoGrid").dataItem(tr);
                try {
                    opener.parent.userPayHolderPop(row.EMP_SEQ, row.EMP_NAME_KR, row.DEPT_SEQ, row.DEPT_NAME);
                    window.close();
                }catch{

                }
            }else if($("#type").val() == "copper"){
                var tr = $(e).closest("tr");
                var row = $('#userList').data("kendoGrid").dataItem(tr);
                try {
                    opener.parent.userDataSet(row);
                    window.close();
                }catch{

                }
            }else if($("#type").val() == "cardAuthUser"){
                var tr = $(e).closest("tr");
                var row = $('#userList').data("kendoGrid").dataItem(tr);

                $.ajax({
                    url: "/card/getCardAuthUserList",
                    data: {
                        empSeq: row.EMP_SEQ
                    },
                    dataType: "json",
                    type: "POST",
                    success: function(rs){
                        if(rs.list.length > 0){
                            alert("이미 등록된 직원입니다.");
                            return;
                        } else {
                            opener.parent.cardAuthMng.fn_cardAuthUser(row.EMP_SEQ, row.EMP_NAME_KR);
                            window.close();
                        }
                    }
                });
            }else {
                var tr = $(e).closest("tr");
                var row = $('#userList').data("kendoGrid").dataItem(tr);

                if($("#status").val() == "mng"){
                    opener.parent.$("#mngDeptName").val(row.DEPT_NAME);
                    opener.parent.$("#mngDeptSeq").val(row.DEPT_SEQ);
                    opener.parent.$("#mngEmpName").val(row.EMP_NAME_KR);
                    opener.parent.$("#mngEmpSeq").val(row.EMP_SEQ);
                    opener.parent.$("#purcDeptName").val(row.DEPT_NAME);
                    opener.parent.$("#purcDeptSeq").val(row.DEPT_SEQ);
                    opener.parent.$("#purcEmpName").val(row.EMP_NAME_KR);
                    opener.parent.$("#purcEmpSeq").val(row.EMP_SEQ);
                } else if($("#status").val() == "reqClaiming"){
                    opener.parent.$("#purcDeptName").val(row.PARENT_DEPT_NAME + " " + row.DEPT_NAME);
                    opener.parent.$("#purcDeptSeq").val(row.DEPT_SEQ);
                    opener.parent.$("#purcEmpName").val(row.EMP_NAME_KR);
                    opener.parent.$("#purcEmpSeq").val(row.EMP_SEQ);
                } else {
                    opener.parent.$("#regtrName").val(row.EMP_NAME_KR);
                    opener.parent.$("#userName").val(row.EMP_NAME_KR);
                    try{
                        opener.parent.call(row.EMP_NAME_KR);
                    }catch{
                    }
                    opener.parent.$("#empName").val(row.EMP_NAME_KR);
                    opener.parent.$("#pmName").val(row.EMP_NAME_KR);
                    //emp_seq, dept_seq, dept_name
                    opener.parent.$("#empSeq").val(row.EMP_SEQ);
                    opener.parent.$("#pmSeq").val(row.EMP_SEQ);

                    opener.parent.$("#team").val(row.DEPT_NAME);
                    opener.parent.$("#teamSeq").val(row.DEPT_SEQ);
                    opener.parent.$("#teamPMNm").val(row.EMP_NAME_KR);
                    opener.parent.$("#teamPMSeq").val(row.EMP_SEQ);

                    opener.parent.$("#deptSeq").val(row.DEPT_SEQ);
                    opener.parent.$("#deptName").val(row.DEPT_NAME);
                    opener.parent.$("#jobDetail").val(row.JOB_DETAIL);
                    opener.parent.$("#positionName").val(row.POSITION_NAME);
                }

                window.close();
            }
        }
    },

    fn_selRsch: function (e){
        var tr = $(e).closest("tr");
        var row = $('#userList').data("kendoGrid").dataItem(tr);

        var data = {
            empSeq : row.EMP_SEQ,
            rschSn : row.EMP_SEQ,
            pjtSn : $("#pk").val(),
            regEmpSeq : $("#empSeq").val()
        }
        var rs = customKendo.fn_customAjax("/projectRnd/getRschInfo", data);
        var rs = rs.list.length;

        if(rs > 0){
            alert("이미 해당 연구원이 추가되어있습니다.");
            return;
        } else {
            customKendo.fn_customAjax("/projectRnd/setRschData", data);
            opener.parent.rndRPR.fn_setData();
            opener.parent.rndRschInfo.gridReload();
            window.close();
        }
    }
}
