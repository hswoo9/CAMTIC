
var deptListPop = {
    global : {
        flag : true,
        approveAddBtn : function(e) {
            return '<button type="button" class="k-grid-add k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="deptListPop.gridChoose(this);">' +
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
                    template: deptListPop.global.approveAddBtn,
                }],
        }).data("kendoGrid");
    },

    treeClick : function(e) {
        var item = $("#treeview").data("kendoTreeView").dataItem(e.node);
        deptSeq = item.dept_seq;
        deptName = item.dept_name;
        deptListPop.treeViewReload(deptSeq);
        $("#userList").data("kendoGrid").dataSource.read();
    },
    gridReload : function() {
        $("#mainGrid").data("kendoGrid").dataSource.read();
    },

    gridChoose : function (e) {
        var tr = $(e).closest("tr");
        var row = $('#userList').data("kendoGrid").dataItem(tr);
        console.log(row);
        console.log(row.EMP_NAME_KR);
        console.log(row.EMP_SEQ);
        opener.parent.$("#regtrName").val(row.EMP_NAME_KR);
        opener.parent.$("#userName").val(row.EMP_NAME_KR);
        //emp_seq, dept_seq, dept_name
        opener.parent.$("#empSeq").val(row.EMP_SEQ);
        opener.parent.$("#deptSeq").val(row.DEPT_SEQ);
        opener.parent.$("#deptName").val(row.DEPT_NAME);
        window.close();
    }

}
