var personAttendStat = {
    global : {
        now: new Date(),
        searchAjaxData : "",
        gridData: new Array()
    },

    fn_defaultScript(){
        personAttendStat.pageSet();

        personAttendStat.loading();
        personAttendStat.mainGrid("/inside/getPersonAttendStat");
    },

    pageSet(){
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
                ds.unshift({deptName: '전체', deptSeq: ''});

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
                                ds.unshift({text: '전체', value: ''});

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
                {TEXT: '전체', VALUE: ''}
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
    },

    dataSet(list){
        $(".addRow").html("");

        /** 정상출근 합계 */
        let sum01 = 0;
        /** 지각 합계 */
        let sum02 = 0;
        /** 연가 합계 */
        let sum03 = 0;
        /** 오전반차 합계 */
        let sum04 = 0;
        /** 오후반차 합계 */
        let sum05 = 0;
        /** 병가 합계 */
        let sum06 = 0;
        /** 공가 합계 */
        let sum07 = 0;
        /** 경조휴가 합계 */
        let sum08 = 0;
        /** 출산휴가 합계 */
        let sum09 = 0;
        /** 출장 합계 */
        let sum10 = 0;
        /** 대체휴가 합계 */
        let sum11 = 0;
        /** 근속포상휴가 합계 */
        let sum12 = 0;
        /** 휴일근로 합계 */
        let sum13 = 0;

        console.log("list", list);

        const list2 = list.filter(
            (map, idx) => {
                return (
                    list.findIndex((map2) => {
                        return map.REG_DEPT_NAME === map2.REG_DEPT_NAME
                    }) === idx
                )
            }
        )

        console.log("list2", list2);


        for(let i=0; i<list2.length; i++){
            /** 정상출근 */
            let count01 = 0;
            /** 지각 */
            let count02 = 0;
            /** 연가 */
            let count03 = 0;
            /** 오전반차 */
            let count04 = 0;
            /** 오후반차 */
            let count05 = 0;
            /** 병가 */
            let count06 = 0;
            /** 공가 */
            let count07 = 0;
            /** 경조휴가 */
            let count08 = 0;
            /** 출산휴가 */
            let count09 = 0;
            /** 출장 */
            let count10 = 0;
            /** 대체휴가 */
            let count11 = 0;
            /** 근속포상휴가 */
            let count12 = 0;
            /** 휴일근로 */
            let count13 = 0;

            const map = list2[i];
            const deptName = map.REG_DEPT_NAME;

            for(let j=0; j<list.length; j++){
                const jMap = list[j];
                const jDeptName = jMap.REG_DEPT_NAME;

                if(deptName == jDeptName){
                    /** 정상출근 구하기 */
                    if(jMap.WEEK != "토" && jMap.WEEK != "일"){
                        if(!(jMap.ATTEND_ADJUSTMENT_START != "" && jMap.ATTEND_ADJUSTMENT_START >= "09:00:00" && jMap.ATTEND_ADJUSTMENT_START < "15:00:00")){
                            count01 ++;
                            sum01 ++;
                        }
                    }

                    if(jMap.ATTEND_ADJUSTMENT_START != "" && jMap.ATTEND_ADJUSTMENT_START >= "09:00:00" && jMap.ATTEND_ADJUSTMENT_START < "15:00:00"){
                        count02 ++;
                        sum02 ++;
                    }

                    if(jMap.HOLIDAY != null){
                        switch(jMap.HOLIDAY) {
                            case '연가':
                                count03++;
                                sum03++;
                                break;
                            case '오전반차':
                                count04++;
                                sum04++;
                                break;
                            case '오후반차':
                                count05++;
                                sum05++;
                                break;
                            case '병가':
                                count06++;
                                sum06++;
                                break;
                            case '공가':
                                count07++;
                                sum07++;
                                break;
                            case '경조휴가':
                                count08++;
                                sum08++;
                                break;
                            case '출산휴가':
                                count09++;
                                sum09++;
                                break;
                            case '대체휴가':
                                count11++;
                                sum11++;
                                break;
                            case '근속포상휴가':
                                count12++;
                                sum12++;
                                break;
                        }
                    }

                    if(jMap.BUSTRIP != null){
                        count10++;
                        sum10++;
                    }
                }
            }
            let rowHtml = '';
            rowHtml += '<tr>';
            rowHtml += '    <td style="text-align: center;">'+deptName+'</td>';
            rowHtml += '    <td style="text-align: center;">'+count01+'일</td>';
            rowHtml += '    <td style="text-align: center;">'+count02+'일</td>';
            rowHtml += '    <td style="text-align: center;">'+count03+'일</td>';
            rowHtml += '    <td style="text-align: center;">'+count04+'일</td>';
            rowHtml += '    <td style="text-align: center;">'+count05+'일</td>';
            rowHtml += '    <td style="text-align: center;">'+count06+'일</td>';
            rowHtml += '    <td style="text-align: center;">'+count07+'일</td>';
            rowHtml += '    <td style="text-align: center;">'+count08+'일</td>';
            rowHtml += '    <td style="text-align: center;">'+count09+'일</td>';
            rowHtml += '    <td style="text-align: center;">'+count10+'일</td>';
            rowHtml += '    <td style="text-align: center;">'+count11+'일</td>';
            rowHtml += '    <td style="text-align: center;">'+count12+'일</td>';
            rowHtml += '    <td style="text-align: center;">'+count13+'일</td>';
            rowHtml += '</tr>';
            $(".addRow").append(rowHtml);
        }

        if(list2.length > 1){
            let sumHtml = '';
            sumHtml += '<tr>';
            sumHtml += '    <th style="text-align: center;">합계</th>';
            sumHtml += '    <th style="text-align: center;">'+sum01+'일</th>';
            sumHtml += '    <th style="text-align: center;">'+sum02+'일</th>';
            sumHtml += '    <th style="text-align: center;">'+sum03+'일</th>';
            sumHtml += '    <th style="text-align: center;">'+sum04+'일</th>';
            sumHtml += '    <th style="text-align: center;">'+sum05+'일</th>';
            sumHtml += '    <th style="text-align: center;">'+sum06+'일</th>';
            sumHtml += '    <th style="text-align: center;">'+sum07+'일</th>';
            sumHtml += '    <th style="text-align: center;">'+sum08+'일</th>';
            sumHtml += '    <th style="text-align: center;">'+sum09+'일</th>';
            sumHtml += '    <th style="text-align: center;">'+sum10+'일</th>';
            sumHtml += '    <th style="text-align: center;">'+sum11+'일</th>';
            sumHtml += '    <th style="text-align: center;">'+sum12+'일</th>';
            sumHtml += '    <th style="text-align: center;">'+sum13+'일</th>';
            sumHtml += '</tr>';
            $(".addRow").append(sumHtml);
        }
        $.LoadingOverlay("hide", {});
    },

    gridReload(){
        personAttendStat.loading();
        $("#mainGrid").data("kendoGrid").dataSource.read();
    },

    mainGrid(url){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read: {
                    url: url,
                    dataType: "json",
                    type: "post"
                },
                parameterMap: function(data){
                    data.startDt = $("#startDt").val();
                    data.endDt = $("#endDt").val();
                    data.dept = $("#dept").val();
                    data.team = $("#team").val();
                    data.name = $("#name").val();
                    data.attendanceItems = $("#attendanceItems").val();
                    data.staffDivision = $("#staffDivision").data("kendoDropDownTree").value().join().replaceAll(",", "");
                    return data;
                }
            },
            schema: {
                data: function (data){
                    personAttendStat.dataSet(data.list);
                    return data.list;
                },
                total: function (data){
                    return data.list.length;
                },
            },
            pageSize: 10
        });

        $("#mainGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            height: 489,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 50, "ALL" ],
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
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" onclick="fn_checkAll(\'checkAll\', \'empSeq\');" class="k-checkbox checkbox"/>',
                    template : "<input type='checkbox' id='empSeq#=EMP_SEQ#' name='empSeq' value='#=EMP_SEQ#' class='k-checkbox checkbox'/>",
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
                    field: "SPOT",
                    title: "직위",
                    width: "7.5%"
                }, {
                    field: "REG_EMP_NAME",
                    title: "성명",
                    width: "7.5%"
                }, {
                    field: "ATTEND_ADJUSTMENT_START",
                    title: "출근 시간",
                    template: function(row){
                        if((row.WEEK == "토" || row.WEEK == "일") && row.ATTEND_ADJUSTMENT_START == ""){
                            return "휴일";
                        }else if(row.HOLIDAY2 != null) {
                            return "공휴일";
                        }else{
                            return row.ATTEND_ADJUSTMENT_START;
                        }
                    }
                }, {
                    field: "ATTEND_ADJUSTMENT_END",
                    title: "퇴근 시간",
                    template: function(row){
                        if((row.WEEK == "토" || row.WEEK == "일") && row.ATTEND_ADJUSTMENT_END == ""){
                            return "휴일";
                        }else if(row.HOLIDAY2 != null) {
                            return "공휴일";
                        }else{
                            return row.ATTEND_ADJUSTMENT_END;
                        }
                    }
                }, {
                    field: "ATTEND_TEXT",
                    title: "근태 항목"
                }
            ]
        }).data("kendoGrid");
    },

    personAttendStatPopup(){
        if($("input[name='empSeq']:checked").length == 0){
            alert("근태조정할 인원을 선택해주세요.");
            return;
        }else if($("input[name='empSeq']:checked").length > 1){
            alert("근태조정은 한명만 가능합니다.");
            return;
        }

        const dataItem = $("#mainGrid").data("kendoGrid").dataItem($("input[name='empSeq']:checked").closest("tr"));
        const empSeq = $("input[name='empSeq']:checked").val();
        const date = dataItem.START_DATE;

        var url = "/Inside/Pop/personAttendStatPop.do?empSeq="+empSeq+"&date="+date;
        var name = "popup test";
        var option = "width = 550, height = 360, top = 100, left = 200, location = no";
        window.open(url, name, option);
    },

    loading(){
        $.LoadingOverlay("show", {
            background       : "rgba(0, 0, 0, 0.5)",
            image            : "",
            maxSize          : 60,
            fontawesome      : "fa fa-spinner fa-pulse fa-fw",
            fontawesomeColor : "#FFFFFF",
        });
    }
}

