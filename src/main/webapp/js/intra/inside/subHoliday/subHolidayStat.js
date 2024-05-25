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

                $("#sDeptSeq").kendoDropDownList({
                    dataTextField: "deptName",
                    dataValueField: "deptSeq",
                    dataSource: ds,
                    index: 0,
                    change : function(){
                        var data = {
                            deptSeq : $("#sDeptSeq").val()
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

                                $("#sDeptTeamSeq").kendoDropDownList({
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

        $("#sDeptTeamSeq").kendoDropDownList({
            dataTextField: "TEXT",
            dataValueField: "VALUE",
            dataSource: [
                {TEXT: '선택하세요', VALUE: ''}
            ],
            index: 0,
        });

        $("#searchVal").kendoTextBox();
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

    fn_makerGrid : function(url, params){
        var dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : url,
                    async : false,
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    for(var key in params){
                        data[key] = params[key];
                    }
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
            },
            pageSize: 15
        });

        $("#mainGrid").kendoGrid({
            dataSource: dataSource,
            height: 568,
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
            excel: {
                allPages: true,
            },
            dataBound: subHolidayStat.onDataBound,
            columns: [
                {
                    field: "DEPT_NAME",
                    title: "부서",
                    width: 90
                }, {
                    field: "TEAM_NAME",
                    title: "팀",
                    width: 90
                }, {
                    field: "POSDUT",
                    title: "직위",
                    width: 70
                }, {
                    field: "EMP_NAME_KR",
                    title: "이름",
                    width: 50
                }, {
                    field: "grant_day",
                    title: "발생연차",
                    width: 40,

                }, {
                    title: "연가",
                    columns: [
                        /*{
                            field: "bef2UseDay",
                            title: "전전년<br>사용",
                            width: 50
                        }, */{
                            field: "befUseDay",
                            title: "전년사용",
                            width: 45
                        }, {
                            title: "금년사용",
                            width: 45,
                            template: function(row){
                                return '<span class="highlight" onclick="subHolidayStat.searchGrid(1, \''+row.EMP_NAME_KR+'\');">'+row.ANNUAL+'</span>';
                            }
                        }, {
                            title: "오전반차",
                            width: 45,
                            template: function(row){
                                return '<span class="highlight" onclick="subHolidayStat.searchGrid(3, \''+row.EMP_NAME_KR+'\');">'+row.MORNING+'</span>';
                            }
                        }, {
                            title: "오후반차",
                            width: 45,
                            template: function(row){
                                return '<span class="highlight" onclick="subHolidayStat.searchGrid(4, \''+row.EMP_NAME_KR+'\');">'+row.AFTERNOON+'</span>';
                            }
                        }, {
                            field: "REMAIN_VAC",
                            title: "잔여연차",
                            width: 45
                        }
                    ]
                }, {
                    title: "병가",
                    width: 35,
                    template: function(row){
                        return '<span class="highlight" onclick="subHolidayStat.searchGrid(5, \''+row.EMP_NAME_KR+'\');">'+row.SICK+'</span>';
                    }
                }, {
                    title: "공가",
                    width: 35,
                    template: function(row){
                        return '<span class="highlight" onclick="subHolidayStat.searchGrid(6, \''+row.EMP_NAME_KR+'\');">'+row.PUBLICHOLI+'</span>';
                    }
                }, {
                    title: "경조휴가",
                    width: 45,
                    template: function(row){
                        return '<span class="highlight" onclick="subHolidayStat.searchGrid(7, \''+row.EMP_NAME_KR+'\');">'+row.CONDOLENCES+'</span>';
                    }
                }, {
                    title: "출산휴가",
                    width: 45,
                    template: function(row){
                        return '<span class="highlight" onclick="subHolidayStat.searchGrid(8, \''+row.EMP_NAME_KR+'\');">'+row.MATERNITY+'</span>';
                    }
                }, {
                    title: "대체휴가",
                    columns: [
                        {
                            field: "HOLIDAYWORK",
                            title: "발생일수",
                            width: 45
                        }, {
                            title: "사용일수",
                            width: 45,
                            template: function(row){
                                return '<span class="highlight" onclick="subHolidayStat.searchGrid(9, \''+row.EMP_NAME_KR+'\');">'+row.ALTERNATIVE+'</span>';
                            }
                        }
                    ]
                }, {
                    title: "근속포상휴가",
                    width: 65,
                    template: function(row){
                        return '<span class="highlight" onclick="subHolidayStat.searchGrid(10, \''+row.EMP_NAME_KR+'\');">'+row.LONGAWARD+'</span>';
                    }
                }
            ]
        }).data("kendoGrid");
    },

    onDataBound : function(){
        var grid = this;
        grid.element.off('dbclick');
        subHolidayStat.global.selectEmpData = [];

        /*grid.tbody.find("tr").click(function (e) {
            var dataItem = grid.dataItem($(this));
            subHolidayStat.global.selectEmpData = dataItem;
            $("#userVacSetting").data("kendoWindow").open();
        });*/
    },

    gridReload : function(){
        subHolidayStat.global.searchAjaxData = {
            holidayYear : $('#holidayYear').val(),
            deptSeq : $("#sDeptSeq").val(),
            deptTeamSeq : $("#sDeptTeamSeq").val(),
            edtHolidayKindTop : $("#edtHolidayKindTop").val(),
            searchType : $("#searchType").val(),
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
    },

    searchGrid : function(holidayCode, empName){
        const params = new Object;
        params.holidayYear = $('#holidayYear').val();
        params.holidayCode = holidayCode;
        params.empName = empName;
        params.orderType = "asc";

        subHolidayStat.subGrid("/subHoliday/getVacUseStatDetailList", params);
    },

    subGrid : function(url, params){
        $("#detailGrid").kendoGrid({
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
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount: 5,
                messages: {
                    display: "{0} - {1} of {2}",
                    itemsPerPage: "",
                    empty: "데이터가 없습니다.",
                }
            },
            dataBound: function(e){
                var grid = this;
                grid.tbody.find("tr").each(function(){
                    var delYn = $(this).find("input[name='delYn']").val();

                    if(delYn == "Y"){
                        $(this).css('text-decoration', 'line-through');
                        $(this).css('color', 'red');
                    }
                });

            },
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll"/>',
                    template : function(e){
                        if(e.APPROVE_STAT_CODE == '100' || e.APPROVE_STAT_CODE == '101') {
                            if(e.DEL_YN == 'N'){
                                return '<input type="checkbox" id="check" name="check" value="' + e.SUBHOLIDAY_USE_ID + '"/>';
                            } else {
                                return '';
                            }
                        } else {
                            return '';
                        }
                    },
                    width: 50
                }, {
                    title: "순번",
                    template: "#= ++record #",
                    width: 50
                },{
                    field: "EMP_NAME_KR",
                    title: "이름",
                    width: 150,
                },{
                    field: "SUBHOLIDAY_DT_CODE_NM",
                    title: "휴가구분",
                    width: 150,
                }, {
                    title: "기간",
                    columns : [
                        {
                            field: "SUBHOLIDAY_ST_DT",
                            title: "부터",
                            width: 190,
                            template: function(dataItem) {
                                if (dataItem.SUBHOLIDAY_DT_CODE_NM === "휴일근로") {
                                    return dataItem.SUBHOLIDAY_WORK_DAY;
                                }
                                else {
                                    return dataItem.SUBHOLIDAY_ST_DT;
                                }
                            }
                        }, {
                            field: "SUBHOLIDAY_EN_DT",
                            title: "까지",
                            width: 190,
                            template: function(dataItem) {
                                if (dataItem.SUBHOLIDAY_DT_CODE_NM === "휴일근로") {
                                    return dataItem.SUBHOLIDAY_WORK_DAY;
                                }
                                else {
                                    return dataItem.SUBHOLIDAY_EN_DT;
                                }
                            }
                        }, {
                            field: "SUBHOLIDAY_USE_DAY",
                            title: "일수",
                            width: 100,
                        }
                    ]
                }, {
                    field: "RMK",
                    title: "내용",
                    align:"center",
                    template : function(e){
                        if(e.BF_YN != "Y"){
                            return '' +
                                '<div style="text-align: center">' +
                                '   <a style="cursor: pointer;" onclick="subHolidayStat.fn_regPop(\'' + e.APPROVE_STAT_CODE + '\', \'' + e.SUBHOLIDAY_USE_ID + '\', \'' + e.APPR_STAT + '\', \'' + e.DOC_ID + '\', \'' + e.APPRO_KEY + '\', \'' + e.DOC_MENU_CD + '\');"><b>' + e.RMK + '</b></a>' +
                                '   <input type="hidden" name="delYn" value="' + e.DEL_YN + '">' +
                                '</div>';
                        }else{
                            return e.RMK;
                        }
                    }
                }, {
                    field: "REG_DT",
                    title: "신청일자",
                    align:"center",
                    width: 100,
                }, {
                    field : "APPROVE_STAT_CODE",
                    title : "결재상태",
                    template : function(e){
                        if(e.BF_YN != "Y"){
                            if(e.APPROVE_STAT_CODE == '0' || e.APPROVE_STAT_CODE == '40' || e.APPROVE_STAT_CODE == '60'){
                                return '작성중';
                            } else if(e.APPROVE_STAT_CODE == '10' || e.APPROVE_STAT_CODE == '20' || e.APPROVE_STAT_CODE == '50') {
                                return '결재중';
                            } else if(e.APPROVE_STAT_CODE == '30') {
                                return '반려';
                            } else if(e.APPROVE_STAT_CODE == '100' || e.APPROVE_STAT_CODE == '101') {
                                return '결재완료';
                            } else {
                                return '-';
                            }
                        }else{
                            return '결재완료(이관)';
                        }
                    },
                    width: 100,
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 1);
            },
        }).data("kendoGrid");


        $("#checkAll").click(function(){
            if($(this).is(":checked")){
                $("input[name='check']").prop("checked", true);
            }else{
                $("input[name='check']").prop("checked", false);
            }
        });
    },

    fn_regPop: function(APPROVE_STAT_CODE, SUBHOLIDAY_USE_ID, APPR_STAT, DOC_ID, APPRO_KEY, DOC_MENU_CD){
        if(APPROVE_STAT_CODE == '0' || APPROVE_STAT_CODE == '40' || APPROVE_STAT_CODE == '60'){
            var url = "/subHoliday/pop/subHolidayReqPop.do?subholidayUseId=" + SUBHOLIDAY_USE_ID + "&apprStat=" + APPR_STAT + "&mode=mng";
            var name = "subHolidayReqPop";
            var option = "width=1030, height=850, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
            var popup = window.open(url, name, option);
        }else{
            approveDocView(DOC_ID, APPRO_KEY, DOC_MENU_CD);
        }
    },
}