var now = new Date();

var subHolidaySetting = {
    global : {
        selectEmpData : [],
    },

    init : function(){
        $("#holidayYear").kendoDatePicker({
            format : "yyyy",
            culture : "ko-KR",
            depth: "decade",
            start: "decade",
            value : new Date()
        });

        $("#searchVal").kendoTextBox();

        $.ajax({
            url : "/userManage/getDeptCodeList2",
            type : "post",
            async: false,
            dataType : "json",
            success : function(result){
                var ds = result.list;
                ds.unshift({deptName: '선택'});

                $("#deptName").kendoDropDownList({
                    dataTextField: "deptName",
                    dataValueField: "deptSeq",
                    dataSource: ds,
                    index: 0,
                    success : function(){
                        subHolidaySetting.gridReload();
                    }
                });
            }
        });

        subHolidaySetting.fn_makerGrid();

    },

    fn_makerGrid : function(){

        var dataSource = new kendo.data.DataSource({
            serverPaging: false,
            pageSize : 10,
            transport: {
                read : {
                    url : "/subHoliday/getUserVacList.do",
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data, operation) {
                    data.holidayYear = $("#holidayYear").val();
                    data.befYear = (data.holidayYear - 1);
                    data.bef2Year = (data.holidayYear - 2);
                    data.deptSeq = $("#deptName").val();
                    data.deptTeamName = $("#deptTeamName").val();
                    data.searchVal = $("#searchVal").val();
                    return data;
                }
            },
            data : "result",
            schema : {
                data: function (data) {
                    return data.result;
                },
                total: function (data) {
                    return data.totalCount;
                },
            }
        });

        $("#mainGrid").kendoGrid({
            dataSource: dataSource,
            height: 490,
            sortable: true,
            scrollable: true,
            noRecords: {
                template: "<div style='margin: auto;'>데이터가 존재하지 않습니다.</div>"
            },
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
            editable : function (){
                return true;
            },
            toolbar: kendo.template($("#toolbarTemplate").html()),
            columns: [
                {
                    field : "DEPT_NAME",
                    title : "부서",
                    width : 90,
                    editable: function(){
                        return false;
                    },
                }, {
                    field : "DEPT_TEAM_NAME",
                    title : "팀",
                    width : 90,
                    editable: function(){
                        return false;
                    },
                }, {
                    field : "EMP_NAME_KR",
                    title : "이름",
                    width : 60,
                    editable: function(){
                        return false;
                    },
                }, {
                    field : "POSITION_NAME",
                    title : "직급",
                    width : 90,
                    editable: function(){
                        return false;
                    },
                }, {
                    title : "기존",
                    columns : [
                        {
                            field : "GRANT_DAY",
                            title : "발생연차",
                            width : 70
                        }, {
                            field : "befUseDay",
                            title : "전년사용",
                            width : 70,
                            editable: function(){
                                return false;
                            },
                        }, {
                            field : "bef2UseDay",
                            title : "전전년사용",
                            width : 70,
                            editable: function(){
                                return false;
                            },
                        }
                    ]
                }, {
                    title : "보상",
                    columns : [
                        {
                            title : "발생연차",
                            width : 70,
                            template : function(e){
                                console.log(e)
                                return e.COMP_VAC;
                            }
                        }, {
                            title : "전년사용",
                            width : 70,
                            editable: function(){
                                return false;
                            },
                            template : function(e){
                                return 0;
                            }
                        }, {
                            title : "전전년사용",
                            width : 70,
                            editable: function(){
                                return false;
                            },
                            template : function(e){
                                return 0;
                            }
                        }
                    ]
                }
            ]
        }).data("kendoGrid");
    },


    gridReload : function(){
        $("#mainGrid").data("kendoGrid").dataSource.read();
    },

    fn_saveAll: function(e){
        if(!confirm("저장하시겠습니까?")){

            return false;
        }

        var grid = $("#mainGrid").data("kendoGrid");
        var state = kendo.stringify(grid.getOptions());
        console.log(state);

        $.ajax({
            url : "/subHoliday/setUserVacList",
            data : {
                param : state
            },
            type : "post",
            success : function(rs){
                console.log(rs);
            }
        })


    }
}
