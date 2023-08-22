var orgChart = {


    global : {

    },

    treeClick : function(e) {
        var item = $("#deptTree").data("kendoTreeView").dataItem(e.node);
        orgChart.global.deptSeq = item.dept_seq;
        $("#deptSeq").val(item.dept_seq);
        $("#sEmpName").val('');
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

        orgChart.mainGrid();
    },

    mainGrid : function(){
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
                    data.notDivision = "2";
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
            height: 685,
            scrollable: true,
            persistSelection: true,
            pageable: {
                refresh: true,
                pageSize : 10,
                pageSizes: [10, 20, "ALL"],
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="orgChart.mainGrid();">' +
                            '   <span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                },
            ],
            columns: [
                {
                    title : "이름",
                    template : function (e){
                        return "<a href='#' onclick='userPersonList2.userViewPop("+e.EMP_SEQ+");'>"+e.EMP_NAME_KR+"</a>";
                    }
                }, {
                    field : 'DEPT_NAME',
                    title : "부서"
                }, {
                    field : 'POSITION_NAME',
                    title : "직급"
                }, {
                    field : 'DUTY_NAME',
                    title : "직책"
                }
            ],
        }).data("kendoGrid");
    }
}