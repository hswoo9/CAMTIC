var now = new Date();

var subHolidayStat = {
    global : {
        now : new Date(),
        empSeq : $("#empSeq").val(),
        mcCode : "V",
        mdCode : "",
        params  : "",
        data : "",
        searchAjaxData : "",
        saveAjaxData : "",
        hwpCtrl : "",
        selectEmpData : [],
    },

    init : function(params){
        subHolidayStat.dataSet();
        subHolidayStat.fn_makerGrid();
        subHolidayStat.gridReload();

        $(".detailSearch").change(function(){
            subHolidayStat.gridReload();
        })

        var data = {
            mcCode : subHolidayStat.global.mcCode,
            mdCode : subHolidayStat.global.mdCode,
            empSeq : subHolidayStat.global.empSeq
        }

        subHolidayStat.global.vacGubun = customKendo.fn_customAjax("/subHoliday/getVacCodeList", data);
        var ds = subHolidayStat.global.vacGubun;
        console.log(ds);
        ds.list.unshift({"SUBHOLIDAY_DT_CODE_NM" : "전체", "SUBHOLIDAY_CODE_ID" : "" });

        $("#edtHolidayKindTop").kendoDropDownList({
            dataSource : ds.list,
            dataTextField: "SUBHOLIDAY_DT_CODE_NM",
            dataValueField: "SUBHOLIDAY_CODE_ID",
        });
    },

    dataSet : function() {

        $("#holidayYear").kendoDatePicker({
            start: "decade",
            depth: "decade",
            culture : "ko-KR",
            format : "yyyy",
            value : new Date()
        });

        $("#searchType").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: ""},
                { text: "이름", value: "1" },
                { text: "직위", value: "2" },
                { text: "등급", value: "3" },
                { text: "메일주소", value: "4" }
            ],
            index: 0
        });

        $.ajax({
            url : "/userManage/getDeptCodeList2",
            type : "post",
            async: false,
            dataType : "json",
            success : function(result){
                var ds = result.list;
                ds.unshift({deptName: '전체', deptSeq: ''});

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
                                ds.unshift({text: '전체', value: ''});

                                $("#deptTeamName").kendoDropDownList({
                                    dataTextField: "text",
                                    dataValueField: "value",
                                    dataSource: ds,
                                    index: 0,
                                });
                            }
                        });
                    }
                });
            }
        });

        $("#deptTeamName").kendoDropDownList({
            dataTextField: "TEXT",
            dataValueField: "VALUE",
            dataSource: [
                {TEXT: '선택하세요', VALUE: ''}
            ],
            index: 0,
        });

        $("#searchVal").kendoTextBox();
    },

    fn_makerGrid : function(url, params){

        $("#mainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
            height: 568,
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
            toolbar : [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="subHolidayStat.gridReload();">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                },
                {
                    name: 'excel',
                    text: '엑셀다운로드'
                }
            ],
            dataBound: subHolidayStat.onDataBound,
            columns: [
                {
                    field: "dept_name",
                    title: "부서",
                    width: 80
                }, {
                    field: "dept_team_name",
                    title: "팀",
                    width: 80
                }, {
                    field: "duty_name",
                    title: "직위",
                    width: 70
                }, {
                    field: "emp_name_kr",
                    title: "이름",
                    width: 70
                }, {
                    title: "발생",
                    columns: [
                        {
                            field: "total_vacation",
                            title: "총연차",
                            width: 50
                        }, {
                            field: "grant_day",
                            title: "기존",
                            width: 50
                        }, {
                            field: "comp_vac",
                            title: "보상",
                            width: 50
                        }
                    ]
                }, {
                    title: "연가",
                    columns: [
                        {
                            field: "bef2UseDay",
                            title: "전전년<br>사용",
                            width: 50
                        }, {
                            field: "befUseDay",
                            title: "전년<br>사용",
                            width: 50
                        }, {
                            field: "ANNUAL",
                            title: "금년<br>사용",
                            width: 50
                        }, {
                            field: "MORNING",
                            title: "오전<br>반차",
                            width: 50
                        }, {
                            field: "AFTERNOON",
                            title: "오후<br>반차",
                            width: 50
                        }, {
                            title: "잔여연차",
                            columns: [
                                {
                                    field: "REMAIN_VAC",
                                    title: "총잔여",
                                    width: 50
                                }, {
                                    field: "REMAIN_VAC",
                                    title: "기존",
                                    width: 50
                                }, {
                                    field: "",
                                    title: "보상",
                                    width: 50
                                }
                            ]
                        }
                    ]
                }, {
                    field: "SICK",
                    title: "병가",
                    width: 50
                }, {
                    field: "PUBLICHOLI",
                    title: "공가",
                    width: 50
                }, {
                    field: "CONDOLENCES",
                    title: "경조<br>휴가",
                    width: 50
                }, {
                    field: "MATERNITY",
                    title: "출산<br>휴가",
                    width: 50
                }, {
                    field: "ALTERNATIVE",
                    title: "대체<br>휴가",
                    width: 50
                }, {
                    field: "LONGAWARD",
                    title: "근속<br>포상<br>휴가",
                    width: 50
                }, {
                    field: "HOLIDAYWORK",
                    title: "휴일<br>근로",
                    width: 50
                }
            ]
        }).data("kendoGrid");
    },

    onDataBound : function(){
        var grid = this;
        grid.element.off('dbclick');
        subHolidayStat.global.selectEmpData = [];

        grid.tbody.find("tr").click(function (e) {
            var dataItem = grid.dataItem($(this));
            subHolidayStat.global.selectEmpData = dataItem;
            $("#userVacSetting").data("kendoWindow").open();
        });
    },

    gridReload : function(){
        subHolidayStat.global.searchAjaxData = {
            holidayYear : $('#holidayYear').val(),
            deptName : $("#deptName").val(),
            deptTeamName : $("#deptTeamName").val(),
            edtHolidayKindTop : $("#edtHolidayKindTop").val(),
            searchVal : $("#searchVal").val()
        }

        var arr = "";
        console.log('arr: ', arr);
        if($(".detailSearch:checked").length == 0){
            arr += "|999&N"
        }else{
            $(".detailSearch:checked").each(function(){
                if($(this).attr("id") == "dsA"){
                    arr += "|0&N|4&1,2"
                }else{
                    arr += "|" + $(this).attr("division") + '&' + ($(this).attr("divisionSub") == null ? "N" : $(this).attr("divisionSub"));
                }

            })
        }

        subHolidayStat.global.searchAjaxData.arr = arr.substring(1);

        subHolidayStat.fn_makerGrid('/subHoliday/getUserVacListStat.do',subHolidayStat.global.searchAjaxData);

        // $("#mainGrid").data("kendoGrid").dataSource.read();
    }
}
