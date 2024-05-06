var personAttendStat = {
    global : {
        now: new Date(),
        searchAjaxData : ""
    },

    fn_defaultScript: function () {
        /* customKendo.fn_datePicker("startDt", '', "yyyy-MM-dd", new Date(personAttend.global.now.setMonth(personAttend.global.now.getMonth() - 1))); */
        customKendo.fn_datePicker("startDt", '', "yyyy-MM-dd", new Date(personAttendStat.global.now.setMonth(personAttendStat.global.now.getMonth() - 1)));
        customKendo.fn_datePicker("endDt", '', "yyyy-MM-dd", new Date());
        $("#startDt, #endDt").attr("readonly", true);

        $.ajax({
            url : "/userManage/getDeptCodeList2",
            type : "post",
            async: false,
            dataType : "json",
            success : function(result){
                var ds = result.list;
                ds.unshift({deptName: '선택하세요', deptSeq: ''});

                $("#dept").kendoDropDownList({
                    dataTextField: "deptName",
                    dataValueField: "deptSeq",
                    dataSource: ds,
                    index: 0,
                    change : function(){
                        var data = {
                            deptSeq : $("#dept").val()
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

                                $("#team").kendoDropDownList({
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

        $("#team").kendoDropDownList({
            dataTextField: "TEXT",
            dataValueField: "VALUE",
            dataSource: [
                {TEXT: '선택하세요', VALUE: ''}
            ],
            index: 0,
        });

        $("#dept").data("kendoDropDownList").value($("#regDeptSeq").val())
        $("#dept").data("kendoDropDownList").trigger("change");
        $("#team").data("kendoDropDownList").value($("#regTeamSeq").val())

        $("#attendanceItems").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "전체", value: "" },
                {text: "정상 출근", value: "attendA"},
                {text: "지각", value: "attendB"},
                {text: "연가", value: "연차"},//
                {text: "오전 반차", value: "오전반차"},//
                {text: "오후 반차", value: "오후반차"},//
                {text: "병가", value: "병가"},//
                {text: "공가", value: "공가"},//
                {text: "경조 휴가", value: "경조휴가"},//
                {text: "출산 휴가", value: "출산휴가"},//
                {text: "선택 근로", value: "workPlan"},
                {text: "출장", value: "busTrip"},
                {text: "대체 휴가", value: "대체휴가"},//
                {text: "휴일 근로", value: "휴일근로"}//
            ],
            index: 0
        });

        $("#name").kendoTextBox();

        $("#staffDivision").kendoDropDownTree({
            placeholder: "세부검색",
            checkboxes: true,
            checkAll: true,
            autoClose: false,
            dataSource: [
                {text: "전담직원", expanded: true, value : "0&N|4&1|4&2|"},
                {text: "단기직원", expanded: true, value : "3&N|"},
                {text: "위촉직원", expanded: true, value : "1&6|"},
                {text: "연수생/학생연구원", expanded: true, value : "2&N|"},
                {text: "시설/환경", expanded: true, value : "4&3|"}
            ]
        });

        personAttendStat.gridReload();
    },

    mainGrid: function (url, params) {
        $("#mainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
            sortable: true,
            scrollable: true,
            height: 489,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 30, 50, 100 ],
                buttonCount : 5
            },
            toolbar: [
                {
                    name : 'button',
                    template : function (e) {
                        return "<button type=\"button\" class=\"k-grid-save-changes k-button k-button-md k-button-solid k-button-solid-base\" onclick='personAttendStat.personAttendStatPopup()'>" +
                            '	<span>근태조정</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e) {
                        return '<button class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onClick="personAttendStat.gridReload()">' +
                                    '<span>조회</span>' +
                                '</button>';
                    }
                }, {
                    name: 'excel',
                    text: '엑셀다운로드'
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" class="k-checkbox checkbox"/>',
                    template : "<input type='checkbox' id='ehiPk#=START_DATE#' name='ehiPk' value='#=START_DATE#' class='k-checkbox checkbox'/>",
                    width: 50
                }, {
                    field: "START_DATE",
                    title: "일자",
                    width: "7.5%"
                }, {
                    field: "WEEK",
                    title: "요일",
                    width: "7.5%"
                }, {
                    field: "REG_DEPT_NAME",
                    title: "부서"
                }, {
                    field: "REG_TEAM_NAME",
                    title: "팀",
                    width: "7.5%"
                }, {
                    title: "직위",
                    width: "7.5%",
                    template: function(row){
                        return row.REG_DUTY_NAME == "" ? row.REG_POSITION_NAME : row.REG_DUTY_NAME;
                    }
                }, {
                    field: "REG_EMP_NAME",
                    title: "성명",
                    width: "7.5%"
                }, {
                    field: "START_TIME",
                    title: "출근 시간",
                }, {
                    field: "END_TIME",
                    title: "퇴근 시간",
                }, {
                    title: "근태 항목",
                    template: function(row){
                        let text = "";
                        if(row.HOLIDAY != ""){
                            text += row.HOLIDAY
                        }
                        if(row.BUSTRIP != ""){
                            if(text != ""){
                                text += ", ";
                            }
                            if (row.BUSTRIP == "1") {
                                text += "도내(시내)";
                            }else if (row.BUSTRIP == "2") {
                                text += "도내(시외)";
                            }else if (row.BUSTRIP == "3") {
                                text += "도외";
                            }else if (row.BUSTRIP == "4") {
                                text += "해외";
                            }
                        }
                        return text;
                    }
                }
            ]
        }).data("kendoGrid");
    },

    gridReload: function (){
        personAttendStat.global.searchAjaxData = {
            startDt : $("#startDt").val(),
            endDt : $("#endDt").val(),
            dept : $("#dept").val(),
            team : $("#team").val(),
            name : $("#name").val(),
            attendanceItems : $("#attendanceItems").val(),
            staffDivision : $("#staffDivision").data("kendoDropDownTree").value().join().replaceAll(",", "")
        }

        personAttendStat.mainGrid("/inside/getPersonAttendStat", personAttendStat.global.searchAjaxData);
    },

    personAttendStatPopup : function(){
        var url = "/Inside/Pop/personAttendStatPop.do";
        var name = "popup test";
        var option = "width = 550, height = 360, top = 100, left = 200, location = no"
        var popup = window.open(url, name, option);
    }
}

