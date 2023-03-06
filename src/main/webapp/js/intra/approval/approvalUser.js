var appUser = {
    global : {
        deptSeq : $("#deptSeq").val(),
        deptName : $("#deptName").val()
    },

    treeClick : function (e) {
        var item = $("#deptTree").data("kendoTreeView").dataItem(e.node);
        appUser.global.deptSeq = item.dept_seq;
        $("#deptUserGrid").data("kendoGrid").dataSource.read();
    },

    getDefaultScript : function(datas){
        $("#deptTree").kendoTreeView({
            dataSource: datas,
            dataTextField:['dept_name'],
            select: appUser.treeClick,
        });

        var deptUserDataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : "/approvalUser/getUserList.do",
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data, operation) {
                    data.DEPT_SEQ = appUser.global.deptSeq;
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
            height: 332,
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
                    field : 'POSITION_CODE',
                    title : "직급"
                }, {
                    field : 'DUTY_NAME',
                    title : "직책"
                }, {
                    title : "선택",
                    template : function (row){
                        return "<button type=\"button\" class=\"k-button k-button-md k-rounded-md k-button-solid k-button-solid-base\" onclick=\"addTable("+row.EMP_SEQ+",'userClick')\">" +
                            '	<span class="k-icon k-i-check k-button-icon"></span>' +
                            '	<span class="k-button-text">선택</span>' +
                            '</button>';
                    }
                }
            ]
        }).data("kendoGrid");
    }
}