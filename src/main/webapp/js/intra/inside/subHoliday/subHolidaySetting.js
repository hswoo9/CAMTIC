var now = new Date();

var subHolidaySetting = {
    global : {
        selectEmpData : [],
        searchAjaxData : ""
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
                ds.unshift({deptName: '선택하세요', deptSeq: ''});

                $("#deptName").kendoDropDownList({
                    dataTextField: "deptName",
                    dataValueField: "deptSeq",
                    dataSource: ds,
                    index: 0,
                    change : function(){
                        var data = {
                            deptSeq : $("#deptName").val()
                        }

                        $.ajax({
                            url : "/userManage/getDeptCodeList",
                            type : "post",
                            async: false,
                            data : data,
                            dataType : "json",
                            success : function(result){
                                var ds = result.list;
                                ds.unshift({text: '선택하세요', value: ''});

                                $("#teamName").kendoDropDownList({
                                    dataTextField: "text",
                                    dataValueField: "value",
                                    dataSource: ds,
                                    index: 0,
                                    change : subHolidaySetting.gridReload
                                });
                            }
                        });

                        subHolidaySetting.gridReload();
                    }
                });
            }
        });

        $("#teamName").kendoDropDownList({
            dataTextField: "TEXT",
            dataValueField: "VALUE",
            dataSource: [
                {TEXT: '선택하세요', VALUE: ''}
            ],
            index: 0,
        });

        subHolidaySetting.gridReload();

    },

    fn_makerGrid : function(url, params){
        $("#mainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
            height: 538,
            sortable: true,
            scrollable: true,
            noRecords: {
                template: "<div style='margin: auto;'>데이터가 존재하지 않습니다.</div>"
            },
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
                            field: "COMP_VAC",
                            title : "발생연차",
                            width : 70
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
        subHolidaySetting.global.searchAjaxData = {
            holidayYear : $("#holidayYear").val(),
            befYear : Number($("#holidayYear").val()) - 1,
            bef2Year : Number($("#holidayYear").val()) - 2,
            deptSeq : $("#deptName").val(),
            teamSeq : $("#teamName").val(),
            searchVal : $("#searchVal").val()
        }

        subHolidaySetting.fn_makerGrid("/subHoliday/getUserVacList.do", subHolidaySetting.global.searchAjaxData);
    },

    fn_saveAll: function(e){
        if(!confirm("저장하시겠습니까?")){

            return false;
        }

        var grid = $("#mainGrid").data("kendoGrid");
        var state = kendo.stringify(grid.getOptions());

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
