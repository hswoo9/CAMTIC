var orgChart = {


    global : {

    },

    treeClick : function(e) {
        var item = $("#deptTree").data("kendoTreeView").dataItem(e.node);
        orgChart.global.deptSeq = item.dept_seq;
        $("#deptSeq").val(item.dept_seq);
        $("#deptUserGrid").data("kendoGrid").dataSource.read();
    },

    fn_defaultScript : function (){
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

        $("#deptTree").kendoTreeView({
            dataSource: datas,
            dataTextField:['dept_name'],
            select: orgChart.treeClick,
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
            pageSize: 15,
        });

        $("#deptUserGrid").kendoGrid({
            dataSource: deptUserDataSource,
            height: 685,
            scrollable: true,
            persistSelection: true,
            pageable: {
                refresh: true,
                pageSize : 15,
                pageSizes: [15, 20, 50, "ALL"],
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
                    title : "이름",
                    template : function (e){
                        return "<a href='#' onclick='userPersonList.userReqPop();'>"+e.EMP_NAME_KR+"</a>";
                    }
                }, {
                    field : 'DEPT_NAME',
                    title : "부서"
                }, {
                    field : 'POSITION_CODE',
                    title : "직급"
                }, {
                    field : 'DUTY_NAME',
                    title : "직책"
                }
            ],
        }).data("kendoGrid");

    },
}