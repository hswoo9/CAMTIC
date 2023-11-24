var now = new Date();
var docContent = "";

var subHolidaySettingPop = {
    global : {
        searchAjaxData : "",
    },


    init: function () {
        subHolidaySettingPop.dataSet();
        subHolidaySettingPop.gridReload();


    },

    dataSet: function () {

        $("#modDate").kendoDatePicker({
            depth: "month",
            start: "month",
            culture: "ko-KR",
            format: "yyyy-MM-dd",
            value: new Date(now.setMonth(now.getMonth() - 1))
        });


        $("#searchType").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "전체", value: ""},
                {text: "직급", value: "1"},
                {text: "성명", value: "2"}

            ],
            index: 0
        });

        $("#searchVal").kendoTextBox();

    },

    mainGrid: function () {
        var dataSource = new kendo.data.DataSource({
            serverPaging: false,
            pageSize : 10,
            transport: {
                read : {
                    url : "/subHoliday/getModVacList.do",
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data, operation) {
                    data.searchVal = $("#searchVal").val();
                    data.modDate = $("#modDate").val();

                    return data;
                }
            },
            schema : {
                data: function (data) {
                    return data.list;
                },
                total: function (data) {
                    return data.list.length;
                },
            }
        });

        $("#mainGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            height: 508,
            pageable : {
                refresh : true,
                pageSizes: [10, 20, "ALL"],
                buttonCount : 5
            },
            dataBound: function(e) {
                var gridData = this.dataSource.view(); // 현재 페이지의 데이터 가져오기
                console.log("Kendo UI Grid 데이터:", gridData);
            },
            toolbar: [
                {
                    name: 'button',
                    template: function (e) {
                        return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="subHolidaySettingPop.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    field : "HOLIDAY_ID",
                    title : "순번",
                    width : 90,
                    editable: function(){
                        return '<input type="hidden" id="holidayId" value="' + params.data.HOLIDAY_ID + '" />' + params.data.HOLIDAY_ID;
                    },
                },{
                    title : "변경사항",
                    columns : [
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
                            }
                        },
                        ]
                },
                        {
                            title : "발생연차",
                            columns : [
                                {
                                    field : "PREVIOUS_GRANT_DAY",
                                    title : "수정전",
                                    width : 90,
                                    editable: function(){
                                        return false;
                                    },
                                }, {
                                    field : "GRANT_DAY",
                                    title : "수정후",
                                    width : 90,
                                    editable: function(){
                                        return false;
                                    },
                                },
                    ]
                }, {
                    field : "MOD_DATE",
                    title : "수정일자",
                    width : 60,
                    editable: function(){
                        return false;
                    },
                }, {
                    field : "EMP_NAME_KR",
                    title : "수정자",
                    width : 90,
                    editable: function(){
                        return false;
                    },
                }

            ]
        }).data("kendoGrid");
    },

    gridReload : function() {
        console.log('gridReload 함수 호출됨');
        subHolidaySettingPop.global.searchAjaxData = {
            modDate : $("#modDate").val(),
            searchVal: $("#searchVal").val(),
            searchType: $("#searchType").val(),
        };



        subHolidaySettingPop.mainGrid('/subHoliday/getModVacList.do',subHolidaySettingPop.global.searchAjaxData);
    },




}


