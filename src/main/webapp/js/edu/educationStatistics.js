var edsRes = {

    global : {

    },

    getDefaultScript : function(){

        $("#searchValue").kendoTextBox();

        $("#searchKind").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource : [
                {text : "선택", value : "all"},
                {text : "성명", value : "empName"},
                {text : "소속부서명", value : "deptName"}
            ]
        });

        var dataSource = new kendo.data.DataSource({
            serverPaging: true,
            pageSize: 10,
            transport: {
                read : {
                    url : getContextPath() + '/edu/educationStatisticsList',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data, operation) {
                    data.searchValue = $("#searchValue").val();
                    data.searchKind = $("#searchKind").data("kendoDropDownList").value();
                    data.deptSeq = $("#empDept").data("kendoDropDownList").value();

                    data.startDate = $("#strDate").val();
                    data.endDate = $("#endDate").val();
                    return data;
                }
            },
            schema : {
                data: function (data) {
                    return data.list;
                },
                total: function (data) {
                    return data.totalCount.totalCount;
                },
            }
        });

        var grid = $("#mainGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 30, 50, 100 ],
                buttonCount : 5
            },
            toolbar : [
                {
                    name : 'excel',
                    text : '통계 다운로드'
                }
            ],
            excel : {
                fileName : "교육통계.xlsx",
                filterable : true
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    field: "dept_name",
                    title: "부서",
                    width: "15%",
                }, {
                    field: "emp_name",
                    title: "성명",
                    width: "10%"
                }, {
                    field: "dutyName",
                    title: "직위",
                    width: "10%"
                }, {
                    title: "교육실적",
                    width: "30%",
                    columns: [
                        {
                            field: "commonTotalTime",
                            title: "공통교육",
                            width: "10%",
                        }, {
                            field: "leadershipTotalTime",
                            title: "리더십교육",
                            width: "10%",
                        }, {
                            field: "dutyTotalTime",
                            title: "직무교육",
                            width: "10%",
                        }
                    ]
                }, {
                    field: "TOTAL_TIME",
                    title: "목표시간",
                    width: "10%",
                    template: function(row){
                        if(row.TOTAL_TIME == null){
                            return 0;
                        }else{
                            return row.TOTAL_TIME;
                        }
                    }
                }, {
                    field: "totalTime",
                    title: "교육실적",
                    width: "10%"
                }, {
                    field: "",
                    title: "이수율",
                    width: "10%",
                    template: function(row){
                        var totalTime = row.totalTime;
                        var goalTime = row.TOTAL_TIME;
                        var returnData = 0;
                        if(Number(totalTime) > 0){
                            if(Number(goalTime) > 0){
                                returnData = (Number(totalTime) * 100) / Number(goalTime);
                            }
                        }
                        return returnData.toFixed(0) + "%";
                    }
                }
            ]
        }).data("kendoGrid");

        $("#searchBtn").click(function() {
            edsRes.gridReload();
        });

    },

    gridReload : function(){
        $("#mainGrid").data("kendoGrid").dataSource.read();
    },


}