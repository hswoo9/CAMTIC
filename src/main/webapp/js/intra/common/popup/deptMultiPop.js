
var deptMultiPop = {
    global : {
        flag : true,
        approveAddBtn : function(e) {
            return '<button type="button" class="k-grid-add k-button k-button-md k-button-solid k-button-solid-base" onclick="deptMultiPop.gridChoose(this);">' +
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
            select: deptMultiPop.treeClick,
        });


        deptMultiPop.treeViewReload(deptSeq);

    },

    treeViewReload : function(dept){
        deptMultiPop.global.searchAjaxData = {
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
                    template: deptMultiPop.global.approveAddBtn,
                }],
        }).data("kendoGrid");
    },

    treeClick : function(e) {
        var item = $("#treeview").data("kendoTreeView").dataItem(e.node);
        deptSeq = item.dept_seq;
        deptName = item.dept_name;
        deptMultiPop.treeViewReload(deptSeq);
        $("#userList").data("kendoGrid").dataSource.read();
    },
    gridReload : function() {
        $("#mainGrid").data("kendoGrid").dataSource.read();
    },

    gridChoose : function (e) {
        var tr = $(e).closest("tr");
        var row = $('#userList').data("kendoGrid").dataItem(tr);
        var empSeq = row.EMP_SEQ;
        var empName = row.EMP_NAME_KR;
        var deptSeq = row.DEPT_SEQ;
        var deptName = row.DEPT_NAME;
        var openerEmpName = opener.parent.$("#popEmpName").val();
        var openerEmpSeq = opener.parent.$("#popEmpSeq").val();
        var openerDeptSeq = opener.parent.$("#popDeptSeq").val();
        var openerDeptName = opener.parent.$("#popDeptName").val();

        if(openerEmpName != null && openerEmpName != "") {
            openerEmpName += ",";
        }
        if(openerEmpSeq != null && openerEmpSeq != "") {
            openerEmpSeq += ",";
        }
        if(openerDeptSeq != null && openerDeptSeq != "") {
            openerDeptSeq += ",";
        }
        if(openerDeptName != null && openerDeptName != "") {
            openerDeptName += ",";
        }
        opener.parent.$("#popEmpName").val(openerEmpName +  empName);
        opener.parent.$("#popEmpSeq").val(openerEmpSeq + empSeq);
        opener.parent.$("#popDeptSeq").val(openerDeptSeq + deptSeq);
        opener.parent.$("#popDeptName").val(openerDeptName + deptName);

        //emp_seq, dept_seq, dept_name
        window.close();
    }

}
