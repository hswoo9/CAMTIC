var now = new Date();

var subHolidaySetting = {
    global : {
        selectEmpData : [],
        vacStatus: null
    },

    init : function(){

        subHolidaySetting.dataSet();
        subHolidaySetting.fn_makerGrid();
    },

    fn_makerGrid : function(){

        var dataSource = new kendo.data.DataSource({
            serverPaging: false,
            pageSize : 10,
            transport: {
                read: {
                    url : "/subHoliday/getUserVacList.do",
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data, type) {
                    if(type == "read"){
                        data.holidayYear = $("#holidayYear").val();
                        data.befYear = (data.holidayYear - 1);
                        data.bef2Year = (data.holidayYear - 2);
                        data.dept = $("#dept").val();
                        data.team = $("#team").val();
                        data.searchVal = $("#searchVal").val();

                        if (subHolidaySetting.global.vacStatus !== null) {
                            data.vacStatus = subHolidaySetting.global.vacStatus;
                        }
                        return data;
                    }else{
                        console.log(data);
                    }
                }
            },
            error: function (e) {
                console.log("데이터 소스 오류: " + e.status, e.errorThrown);
            },
            data : "result",
            schema : {
                data: function (data) {
                    return data.list;
                },
                total: function (data) {
                    return data.list.length;
                },
                model: {
                    id: "GRANT_DAY",
                    id: "HOLIDAY_ID",
                    id: "COMP_VAC"
                }
            }
        });

        $("#mainGrid").kendoGrid({
            dataSource: dataSource,
            height: 538,
            sortable: true,
            scrollable: true,
            noRecords: {
                template: "<div style='margin: auto;'>데이터가 존재하지 않습니다.</div>"
            },
            pageable: {
                refresh: true,
                pageSize : 10,
                pageSizes : [ 10, 20, 50, "ALL" ],
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
            toolbar: [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="subHolidaySetting.subHolidayReqBatchPop();">' +
                            '	<span class="k-button-text">연가일괄등록</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function (e) {
                        return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="subHolidaySettingPop()">이력관리</button>';
                    }
                }, {
                    name: 'button',
                    template: function (e) {
                        return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="subHolidaySetting.gridReload();">조회</button>';
                    }
                }, {
                    name: 'update',
                    template: function (e) {
                        return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-info" onclick="openModal()">저장</button>';
                    }
                },

            ],
            columns: [
                {
                    field : "DEPT_NAME",
                    title : "부서",
                    editable: function(){
                        return false;
                    },
                }, {
                    field : "TEAM_NAME",
                    title : "팀",
                    editable: function(){
                        return false;
                    },
                }, {
                    field : "SPOT",
                    title : "직위",
                    editable: function(){
                        return false;
                    },
                }, {
                    field : "EMP_NAME_KR",
                    title : "이름",
                    editable: function(){
                        return false;
                    },
                }, {
                    title : "기존",
                    columns : [
                        {
                            field : "GRANT_DAY",
                            title : "발생연차",
                        }, {
                            field : "befUseDay",
                            title : "전년사용",
                            editable: function(){
                                return false;
                            },
                        }/*, {
                            field : "bef2UseDay",
                            title : "전전년사용",
                            width : 70,
                            editable: function(){
                                return false;
                            },
                        }*/
                    ]
                }
            ]
        }).data("kendoGrid");
    },

    dataSet:function (){
        $("#holidayYear").kendoDatePicker({
            format : "yyyy",
            culture : "ko-KR",
            depth: "decade",
            start: "decade",
            value : new Date()
        });

        $("#searchVal").kendoTextBox();

        var dynamicVacStatusValue; // 동적으로 결정되는 값
        subHolidaySetting.global.vacStatus = dynamicVacStatusValue;

        console.log('Dynamic vacStatus Value:', dynamicVacStatusValue);

        fn_deptSetting();
    },


    gridReload : function(){

        subHolidaySetting.global.selectEmpData = {
            holidayYear : $('#holidayYear').val(),
            dept: $("#dept").val(),
            team: $("#team").val(),
            searchVal : $('#searchVal').val()
        };

        var holidayYear = subHolidaySetting.global.selectEmpData.holidayYear;
        var dept = subHolidaySetting.global.selectEmpData.dept;
        var team = subHolidaySetting.global.selectEmpData.team;
        var searchVal = subHolidaySetting.global.selectEmpData.searchVal;

        // 콘솔 로그 추가
        console.log('Search Date: ' + holidayYear);
        console.log('Dept: ' + dept);
        console.log('Team: ' + team);
        console.log('Search Text: ' + searchVal);

        $("#mainGrid").data("kendoGrid").dataSource.read();
    },

    fn_saveAll: function(e){
        if(!confirm("저장하시겠습니까?")){
            return false;
        }
        if($("#modReason").val() == ""){
            alert("수정사유를 입력하십시오."); return;
        }

        var grid = $("#mainGrid").data("kendoGrid");
        var state = kendo.stringify(grid.getOptions());
        console.log(state);

        var result = customKendo.fn_customAjax("/subHoliday/setUserVacList2", {
            param: state,
            reason: $("#modReason").val()
        });
        if(!result.flag){
            alert("시스템 오류가 발생했습니다.");
        }
        subHolidaySetting.gridReload();
        $("#modal").data("kendoWindow").close();
    },

    subHolidayReqBatchPop : function() {
        var url = "/subHoliday/subHolidayReqBatchPop.do";
        var name = "subHolidayReqBatchPop";
        var option = "width=1030, height=1000, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    }
}
