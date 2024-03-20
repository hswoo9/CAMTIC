var dutyInfoLeader = {
    global: {
        subTeamYn: "N",
        allDutyList: new Array()
    },

    init: function(){
        dutyInfoLeader.pageSet();
        dutyInfoLeader.dataSet();
        dutyInfoLeader.mainGrid();
    },

    pageSet: function(){
        const data = {
            empSeq : $("#regEmpSeq").val()
        }
        const result = customKendo.fn_customAjax("/userManage/getAllDutyList", data);
        const allDutyList = result.list;

        console.log("allDutyList", allDutyList);

        if(allDutyList.length > 1){
            dutyInfoLeader.global.subTeamYn = "Y";
        }
        dutyInfoLeader.global.allDutyList = allDutyList;
    },

    dataSet: function(){
        fn_deptSetting();

        customKendo.fn_textBox(["searchValue"]);
        customKendo.fn_datePicker("requestYear", 'decade', "yyyy", new Date());
        $("#startDay, #endDay").attr("readonly", true);
        let activeDataSource = [
            { text: "미포함", value: "Y" },
            { text: "포함", value: "N" },
        ]
        customKendo.fn_dropDownList("active", activeDataSource, "text", "value", 3);
        let statusDataSource = [
            { text: "승인", value: "Y" },
            { text: "미승인", value: "N" },
        ]
        customKendo.fn_dropDownList("status", statusDataSource, "text", "value", 1);
        let statusDataSource2 = [
            { text: "승인", value: "Y" },
            { text: "미승인", value: "N" },
        ]
        customKendo.fn_dropDownList("status2", statusDataSource2, "text", "value", 1);

        var data = {
            empSeq : $("#myEmpSeq").val()
        }


        $("#dept").data("kendoDropDownList").value($("#regDeptSeq").val());
        $("#dept").data("kendoDropDownList").trigger("change");
        $("#team").data("kendoDropDownList").value($("#regTeamSeq").val());

        $("#dept").data("kendoDropDownList").enable(false);

        if(!($("#regDutyCode").val() == "2" || $("#regDutyCode").val() == "3" || $("#regDutyCode").val() == "7")){
            $("#team").data("kendoDropDownList").enable(false);
        }


        fn_searchBind();
    },

    mainGrid: function(){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read: {
                    url: '/campus/getDutyInfoMngList',
                    dataType: "json",
                    type: "post"
                },
                parameterMap: function(data) {
                    data.requestYear = $("#requestYear").val();
                    data.dept = $("#dept").data("kendoDropDownList").value();
                    data.team = $("#team").data("kendoDropDownList").value();
                    data.searchValue = $("#searchValue").val();
                    data.active = $("#active").data("kendoDropDownList").value();
                    data.status = $("#status").data("kendoDropDownList").value();
                    data.status2 = $("#status2").data("kendoDropDownList").value();
                    return data;
                }
            },
            schema: {
                data: function (data) {
                    return data.list;
                },
                total: function (data) {
                    return data.list.length;
                }
            }
        });

        $("#mainGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            toolbar: [
                {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button k-button-solid-base" onclick="gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    },
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    field: "DEPT",
                    title: "부서"
                }, {
                    field: "POSITION",
                    title: "직위",
                    width: "9%"
                }, {
                    field: "EMP_NAME",
                    title: "성명",
                    width: "9%"
                }, {
                    field: "OFFICE_TEL_NUM",
                    title: "전화",
                    width: "9%"
                }, {
                    title: "목표기술서",
                    columns: [
                        {
                            title: "상태",
                            template: function(row){
                                if(row.TARGET_STATUS == 0){
                                    return "<span class='hover' onclick='dutyInfoLeader.targetEduMngPop(\"mng\", "+row.EMP_SEQ+", \"ld\");'>작성중</span>";
                                }else if(row.TARGET_STATUS == 10){
                                    return "<span class='hover' onclick='dutyInfoLeader.targetEduMngPop(\"mng\", "+row.EMP_SEQ+", \"ld\");'>승인요청중</span>";
                                }else if(row.TARGET_STATUS == 30){
                                    return "<span class='hover' onclick='dutyInfoLeader.targetEduMngPop(\"mng\", "+row.EMP_SEQ+", \"ld\");'>반려</span>";
                                }else if(row.TARGET_STATUS == 100){
                                    return "<span style='font-weight: bold' class='hover' onclick='dutyInfoLeader.targetEduMngPop(\"mng\", "+row.EMP_SEQ+", \"ld\");'>승인 ("+row.TARGET_APPROVAL_DATE+")</span>";
                                }else{
                                    return "작성안함";
                                }
                            },
                            width: "15%",
                        } ,{
                            title : "승인",
                            template: function(e){
                                /** 승인 요청자가 팀원급 */
                                if(e.DUTY_CODE == "") {
                                    var textDuty = "팀장 승인";
                                    if(e.DUTY_CNT == 0){
                                        textDuty = "부서장 승인"
                                    }

                                    /** 팀장 단계 */
                                    if(e.LD_STATUS == 'N' && e.TARGET_STATUS == 10 &&
                                        (($("#regDutyCode").val() == "4" || $("#regDutyCode").val() == "5") ||
                                        (dutyInfoLeader.global.subTeamYn == "Y") && dutyInfoLeader.global.allDutyList.findIndex((item) => item.DEPT_SEQ == e.DEPT_SEQ) != -1)){
                                        return '<button type="button" class="k-button k-button-solid-base" onclick="dutyInfoLeader.fn_agreeLeader('+e.TARGET_CHECK+', \'ld\', '+e.EMP_SEQ+', '+e.DUTY_CNT+')">'+textDuty+'</button>' +
                                            '<button type="button" id="comBtn" class="k-button k-button-solid-error" style="margin-left: 5px;" onclick="dutyInfoLeader.fn_targetCertReq(30, '+e.EMP_SEQ+', \'ld\');">반려</button>';

                                    /** 부서장 단계 */
                                    }else if(e.MNG_STATUS == 'N' && e.LD_STATUS == 'Y' && e.TARGET_STATUS == 10 &&
                                        (($("#regDutyCode").val() == "2" || $("#regDutyCode").val() == "3" || $("#regDutyCode").val() == "7") ||
                                        (dutyInfoLeader.global.subTeamYn == "Y") && dutyInfoLeader.global.allDutyList.findIndex((item) => item.DEPT_SEQ == e.DEPT_SEQ) != -1)){
                                        return '<button type="button" class="k-button k-button-solid-base" onclick="dutyInfoLeader.fn_agreeLeader('+e.TARGET_CHECK+', \'mng\', '+e.EMP_SEQ+')">부서장 승인</button>' +
                                            '<button type="button" id="comBtn" class="k-button k-button-solid-error" style="margin-left: 5px;" onclick="dutyInfoLeader.fn_targetCertReq(30, '+e.EMP_SEQ+', \'mng\');">반려</button>';

                                    }else if(e.MNG_STATUS == 'N' && e.LD_STATUS == 'Y' && e.TARGET_STATUS == 100){
                                        return '팀장 승인';
                                    }else if(e.MNG_STATUS =='Y' && e.TARGET_STATUS == 100){
                                        return '부서장 승인';
                                    }else{
                                        return '';
                                    }

                                /** 승인 요청자가 팀장급 */
                                }else if(e.DUTY_CODE == "4" || e.DUTY_CODE == "5"){
                                    /** 부서장 단계 */
                                    if(e.LD_STATUS == 'N' && e.TARGET_STATUS == 10 &&
                                        (($("#regDutyCode").val() == "2" || $("#regDutyCode").val() == "3" || $("#regDutyCode").val() == "7") ||
                                        (dutyInfoLeader.global.subTeamYn == "Y") && dutyInfoLeader.global.allDutyList.findIndex((item) => item.DEPT_SEQ == e.DEPT_SEQ) != -1)){
                                        return '<button type="button" class="k-button k-button-solid-base" onclick="dutyInfoLeader.fn_agreeLeader('+e.TARGET_CHECK+', \'mng\', '+e.EMP_SEQ+')">부서장 승인</button>' +
                                            '<button type="button" id="comBtn" class="k-button k-button-solid-error" style="margin-left: 5px;" onclick="dutyInfoLeader.fn_targetCertReq(30, '+e.EMP_SEQ+', \'mng\');">반려</button>';

                                    }else if(e.MNG_STATUS == 'Y' && e.TARGET_STATUS == 100){
                                        return '부서장 승인';
                                    }else{
                                        return '';
                                    }

                                /** 승인 요청자가 부서장급 */
                                }else if(e.DUTY_CODE == "2" || e.DUTY_CODE == "3" || e.DUTY_CODE == "7"){
                                    /** 부서장 단계 */
                                    if(e.TARGET_STATUS == 10 &&
                                        (($("#regDutyCode").val() == "2" || $("#regDutyCode").val() == "3" || $("#regDutyCode").val() == "7") ||
                                            (dutyInfoLeader.global.subTeamYn == "Y"))){
                                        return '<button type="button" class="k-button k-button-solid-base" onclick="dutyInfoLeader.fn_agreeLeader('+e.TARGET_CHECK+', \'mng\', '+e.EMP_SEQ+')">부서장 승인</button>' +
                                            '<button type="button" id="comBtn" class="k-button k-button-solid-error" style="margin-left: 5px;" onclick="dutyInfoLeader.fn_targetCertReq(30, '+e.EMP_SEQ+', \'mng\');">반려</button>';

                                    }else if(e.MNG_STATUS == 'Y' && e.TARGET_STATUS == 100){
                                        return '부서장 승인';
                                    }else{
                                        return '';
                                    }
                                }else{
                                    return '';
                                }
                            },
                            width: "12%",
                        }
                    ]
                }, {
                    title: "직무기술서",
                    columns: [
                        {
                            title: "상태",
                            template: function(row){
                                console.log(row)
                                if(row.DUTY_STATUS == 0){
                                    return "<span class='hover' onclick='dutyInfo.dutyInfoReqPop(\"mng\", "+row.DUTY_CHECK+");'>작성중</span>";
                                }else if(row.DUTY_STATUS == 10){
                                    return "<span class='hover' onclick='dutyInfo.dutyInfoReqPop(\"mng\", "+row.DUTY_CHECK+");'>승인요청중</span>";
                                }else if(row.DUTY_STATUS == 30){
                                    return "<span class='hover' onclick='dutyInfo.dutyInfoReqPop(\"mng\", "+row.DUTY_CHECK+");'>반려</span>";
                                }else if(row.DUTY_STATUS == 100){
                                    return "<span style='font-weight: bold' class='hover' onclick='dutyInfo.dutyInfoReqPop(\"mng\", "+row.DUTY_CHECK+");'>승인 ("+row.DUTY_APPROVAL_DATE+")</span>";
                                }else{
                                    return "작성안함";
                                }
                            },
                            width: "15%",
                        }, {
                            title : "승인",
                            template: function(e){
                                var textDuty = "팀장 승인";
                                if(e.DUTY_CNT == 0){
                                    textDuty = "부서장 승인"
                                }

                                /** 승인 요청자가 팀원급 */
                                if(e.DUTY_CODE == ""){
                                    /** 팀장 단계 */
                                    if(e.DUTY_LD_STATUS == 'N' && e.DUTY_STATUS == 10 &&
                                        (($("#regDutyCode").val() == "4" || $("#regDutyCode").val() == "5") ||
                                        (dutyInfoLeader.global.subTeamYn == "Y") && dutyInfoLeader.global.allDutyList.findIndex((item) => item.DEPT_SEQ == e.DEPT_SEQ) != -1)){
                                        return '<button type="button" class="k-button k-button-solid-base" onclick="dutyInfoLeader.fn_agreeDutyLeader('+e.DUTY_CHECK+', \'ld\', '+e.EMP_SEQ+', '+e.DUTY_CNT+')">'+textDuty+'</button>' +
                                            '<button type="button" id="comBtn" class="k-button k-button-solid-error" style="margin-left: 5px;" onclick="dutyInfoLeader.fn_dutyCertReq(30, '+e.DUTY_CHECK+', \'ld\');">반려</button>';
                                        
                                    /** 부서장 단계 */
                                    }else if(e.DUTY_MNG_STATUS == 'N' && e.DUTY_LD_STATUS == 'Y' && e.DUTY_STATUS == 10 &&
                                        (($("#regDutyCode").val() == "2" || $("#regDutyCode").val() == "3" || $("#regDutyCode").val() == "7") ||
                                        (dutyInfoLeader.global.subTeamYn == "Y") && dutyInfoLeader.global.allDutyList.findIndex((item) => item.DEPT_SEQ == e.DEPT_SEQ) != -1)){
                                        return '<button type="button" class="k-button k-button-solid-base" onclick="dutyInfoLeader.fn_agreeDutyLeader('+e.DUTY_CHECK+', \'mng\')">부서장 승인</button>' +
                                            '<button type="button" id="comBtn" class="k-button k-button-solid-error" style="margin-left: 5px;" onclick="dutyInfoLeader.fn_dutyCertReq(30, '+e.DUTY_CHECK+', \'mng\');">반려</button>';

                                    }else if(e.DUTY_MNG_STATUS == 'N' && e.DUTY_LD_STATUS == 'Y' && e.DUTY_STATUS == 100){
                                        return '팀장 승인';
                                    }else if(e.DUTY_MNG_STATUS == 'Y' && e.DUTY_STATUS == 100){
                                        return '부서장 승인';
                                    }else{
                                        return '';
                                    }

                                /** 승인 요청자가 팀장급 */
                                }else if(e.DUTY_CODE == "4" || e.DUTY_CODE == "5"){
                                    /** 부서장 단계 */
                                    if(e.DUTY_STATUS == 10 &&
                                        (($("#regDutyCode").val() == "2" || $("#regDutyCode").val() == "3" || $("#regDutyCode").val() == "7") ||
                                        (dutyInfoLeader.global.subTeamYn == "Y"))){
                                        return '<button type="button" class="k-button k-button-solid-base" onclick="dutyInfoLeader.fn_agreeDutyLeader('+e.DUTY_CHECK+', \'mng\')">부서장 승인</button>' +
                                            '<button type="button" id="comBtn" class="k-button k-button-solid-error" style="margin-left: 5px;" onclick="dutyInfoLeader.fn_dutyCertReq(30, '+e.DUTY_CHECK+', \'mng\');">반려</button>';

                                    }else if(e.DUTY_MNG_STATUS == 'Y' && e.DUTY_STATUS == 100){
                                        return '부서장 승인';
                                    }else{
                                        return '';
                                    }

                                /** 승인 요청자가 부서장급 */
                                }else if(e.DUTY_CODE == "2" || e.DUTY_CODE == "3" || e.DUTY_CODE == "7"){
                                    /** 부서장 단계 */
                                    if(e.DUTY_LD_STATUS == 'N' && e.DUTY_STATUS == 10 &&
                                        (($("#regDutyCode").val() == "2" || $("#regDutyCode").val() == "3" || $("#regDutyCode").val() == "7") ||
                                        (dutyInfoLeader.global.subTeamYn == "Y") && dutyInfoLeader.global.allDutyList.findIndex((item) => item.DEPT_SEQ == e.DEPT_SEQ) != -1)){
                                        return '<button type="button" class="k-button k-button-solid-base" onclick="dutyInfoLeader.fn_agreeDutyLeader('+e.DUTY_CHECK+', \'ld\')">부서장 승인</button>' +
                                            '<button type="button" id="comBtn" class="k-button k-button-solid-error" style="margin-left: 5px;" onclick="dutyInfoLeader.fn_dutyCertReq(30, '+e.DUTY_CHECK+', \'ld\');">반려</button>';

                                    }else if(e.DUTY_MNG_STATUS =='Y' && e.DUTY_STATUS == 100){
                                        return '부서장 승인';
                                    }else{
                                        return '';
                                    }
                                }else{
                                    return '';
                                }
                            },
                            width: "12%",
                        }
                    ]
                }
            ]
        }).data("kendoGrid");
    },

    fn_agreeLeader : function(id, type, empSeq, dutyCnt){
        if(dutyCnt == undefined || dutyCnt == null){
            if(!confirm("승인하시겠습니까?")){
                return;
            }
        }

        var data = {
            eduTargetId : id,
            type : type
        }
        var rs = customKendo.fn_customAjax("/campus/agreeSubject", data)

        if(rs.code == 200){
            if(dutyCnt != undefined && dutyCnt != null && dutyCnt == 0){
                dutyInfoLeader.fn_agreeLeader(id, 'mng', empSeq)
            } else if(type == "mng"){
                dutyInfoLeader.fn_targetCertReq(100, empSeq)
            } else {
                alert("완료되었습니다.");
                gridReload();
            }
        }
    },

    fn_agreeDutyLeader: function(id, type, empSeq, dutyCnt){
        if(dutyCnt == undefined || dutyCnt == null){
            if(!confirm("승인하시겠습니까?")){
                return;
            }
        }
        var data = {
            dutyInfoSn : id,
            type : type
        }
        var rs = customKendo.fn_customAjax("/campus/agreeDutySubject", data)

        if(rs.code == 200){
            if(dutyCnt != undefined && dutyCnt != null && dutyCnt == 0){
                dutyInfoLeader.fn_agreeDutyLeader(id, 'mng', empSeq)
            } else if(type == "mng"){
                dutyInfoLeader.fn_dutyCertReq(100, id)
            } else {
                alert("완료되었습니다.");
                gridReload();
            }
        }
    },

    targetEduMngPop: function(mode, empSeq, ld){
        let url = "/Campus/pop/targetEduMngPop.do?mode="+mode+"&empSeq="+empSeq+"&targetYear="+$("#requestYear").val().substring(0, 4) + "&ld="+ld;
        const name = "targetEduMngPop";
        const option = "width = 1200, height = 800, top = 100, left = 200, location = no";
        window.open(url, name, option);
    },

    fn_targetCertReq: function(status, empSeq, type){
        let data = {
            targetYear : $("#requestYear").val(),
            empSeq : empSeq,
            regEmpSeq : $("#myEmpSeq").val(),
            regEmpName : $("#myEmpName").val(),
            status : status,
            type : type
        }

        if(status == 30){
            if(!confirm("반려하시겠습니까?")){
                return;
            }
        }

        var result = customKendo.fn_customAjax("/campus/setTargetCertReq", data);

        if(result.flag){
            if(status == 10){
                alert("승인 요청이 완료되었습니다.");
            }else if(status == 100){
                alert("승인되었습니다.");
            }else if(status == 30){
                alert("반려되었습니다.");
            }else if(status == 0){
                alert("승인 요청이 취소되었습니다.");
            }
            gridReload()
        }
    },

    fn_dutyCertReq: function(status, id, type){
        let data = {
            pk : id,
            regEmpSeq : $("#myEmpSeq").val(),
            regEmpName : $("#myEmpName").val(),
            status : status,
            type : type
        }

        if(status == 30){
            if(!confirm("반려하시겠습니까?")){
                return;
            }
        }

        var result = customKendo.fn_customAjax("/campus/setDutyCertReq", data);

        if(result.flag){
            if(status == 10){
                alert("승인 요청이 완료되었습니다.");
            }else if(status == 100){
                alert("승인되었습니다.");
            }else if(status == 30){
                alert("반려되었습니다.");
            }else if(status == 0){
                alert("승인 요청이 취소되었습니다.");
            }
            gridReload()
        }
    }
}

function gridReload(){
    dutyInfoLeader.mainGrid();
}