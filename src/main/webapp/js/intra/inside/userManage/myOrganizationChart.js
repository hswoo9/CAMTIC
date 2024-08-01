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
                    data.fullTime2 = "1";
                    data.tempType = 'N';
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
            sort: [
                { field: "DUTY_NAME", dir: "desc", compare: orgChart.dutyNameCompare() },
                { field: "EMP_NAME_KR", dir: "asc" }
            ]
        });

        $("#deptUserGrid").kendoGrid({
            dataSource: deptUserDataSource,
            height: 685,
            scrollable: true,
            persistSelection: true,
            pageable: {
                refresh: true,
                pageSize : 15,
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
                        return "<a href='#' onclick='orgChart.myPop("+e.EMP_SEQ+");'>"+e.EMP_NAME_KR+"</a>";
                    }
                }, {
                    field : 'DEPT_NAME',
                    title : "부서",
                    width : 140
                }, {
                    title : "직위",
                    template: function(row){
                        return fn_getSpot(row.DUTY_NAME, row.POSITION_NAME);
                    }
                }, {
                    field : 'OFFICE_TEL_NUM',
                    title : "내선번호"
                }, {
                    field : 'MOBILE_TEL_NUM',
                    title : "핸드폰번호"
                }
            ],
        }).data("kendoGrid");
    },

    dutyNameCompare : function (a,b){
        if (a && !b) {
            return -1; // a를 b보다 앞으로 위치시키기
        } else if (!a && b) {
            return 1; // b를 a보다 앞으로 위치시키기
        } else {
            return 0; // 그 외에는 변경 없음
        }
    },

    myPop: function(data){
        console.log(data);
        var url = "/user/pop/myPop.do?pk="+data;
        var name = "myPop";
        var option = "width = 900, height = 480, top = 100, left = 200, location = no"
        var popup = window.open(url, name, option);
    }

}
