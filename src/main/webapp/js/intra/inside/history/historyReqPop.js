const historyReq = {
    global: {
        userArr : [],
        nowUserArr: [],
        hwpCtrl: "",
        params: "",
        editDataSource: {}
    },

    init: function(){
        historyReq.mainGrid();
        historyReq.dataSet();
    },

    dataSet: function(){
        historyReq.global.params = params;
        historyReq.fn_selEmp();
        customKendo.fn_textBox(["searchVal", "numberName", "relevantName"]);
        customKendo.fn_datePicker("historyDate", "month", "yyyy-MM-dd", new Date());
        $("#historyDate").data("kendoDatePicker").enable(false);

        $("#apntCdAll").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "선택", value: "" },
                { text: "임용 (정규직)", value: "1" },
                { text: "임용 (계약직)", value: "2" },
                { text: "임용 (인턴 사원)", value: "3" },
                { text: "임용 (단기 직원)", value: "4" },
                { text: "임용 (위촉 직원)", value: "5" },
                { text: "임용 (경비 / 환경)", value: "6" },
                { text: "승진 (직급)", value: "7" },
                { text: "승진 (직위)", value: "8" },
                { text: "전보", value: "9" },
                { text: "겸직", value: "10" },
                { text: "직무 대리", value: "11" },
                { text: "파견", value: "12" },
                { text: "면직", value: "13" },
                { text: "강등", value: "14" },
                { text: "조직 개편", value: "15" },
                { text: "호칭 변경", value: "16" },
                { text: "기타", value: "17" }
            ],
            index: 0,
            change: historyReq.changeApntCdAll
        });
    },

    changeApntCdAll: function(){
        const grid = $("#popMainGrid").data("kendoGrid");
        $("#popMainGrid").find("input[name='checkUser']:checked").each(function(){
            const dataItem = grid.dataItem($(this).closest("tr"));
            let empSeq = dataItem.EMP_SEQ;
            $("#apntCd"+String(empSeq)).data("kendoDropDownList").value($("#apntCdAll").val());
        });
    },

    mainGrid: function() {
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read: {
                    url: "/user/getEmpList",
                    dataType: "json",
                    type: "post"
                },
                parameterMap: function(data){
                    data.empName = $("#searchVal").val()
                    return data;
                }
            },
            schema: {
                data: function(data){
                    return data.list;
                },
                total: function(data){
                    return data.list.length;
                },
            },
            pageSize: 10,
        });

        $("#mainGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 600,
            pageable: {
                refresh: true,
                pageSizes: [ 10, 20, 30, 50, 100 ],
                buttonCount: 5
            },
            toolbar: [
                {
                    name: 'text',
                    template: function(){
                        return '<span>이름</span>' +
                            '	<input type="text" id="searchVal" class="searchVal" style="width: 200px;" onkeypress="if(window.event.keyCode==13){historyReq.mainGrid();}">' ;
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="historyReq.mainGrid()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="historyReq.fn_selEmp()">' +
                            '	<span class="k-button-text">선택완료</span>' +
                            '</button>';
                    }
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkEmpAll" name="checkEmpAll" onclick="fn_checkAll(\'checkEmpAll\', \'checkEmp\')" style="position: relative; top : 2px"/>',
                    template: function(row){
                        return "<input type='checkbox' id='chk"+row.EMP_SEQ+"' name='checkEmp' value='"+row.EMP_SEQ+"' style='position: relative; top: 2px;' />"
                    },
                    width: 30,
                    attribute: {
                        style: "text-align: center",
                    }
                }, {
                    field: "DEPT_NAME",
                    title: "부서"
                }, {
                    field: "TEAM_NAME",
                    title: "팀",
                    width: 140,
                }, {
                    field: "EMP_NAME_KR",
                    title: "성명",
                    width: 60,
                }
            ]
        }).data("kendoGrid");

        $("#popMainGrid").kendoGrid({
            dataSource: historyReq.global.editDataSource,
            scrollable: true,
            height: 600,
            toolbar: [
                {
                    name: 'text',
                    template: function(){
                        return '<span>호수</span>' +
                            '	<input type="text" id="numberName" class="defaultVal" style="width: 150px;">';
                    }
                }, {
                    name: 'text',
                    template: function(){
                        return '<span>관련근거</span>' +
                            '	<input type="text" id="relevantName" class="defaultVal" style="width: 150px;">' ;
                    }
                }, {
                    name: 'text',
                    template: function(){
                        return '<span>발령 일자</span>' +
                            '	<input type="text" id="historyDate" class="defaultVal" style="width: 200px;">';
                    }
                }, {
                    name: 'text',
                    template: function(){
                        return '<span>발령구분 일괄변경</span>' +
                            '	<input type="text" id="apntCdAll" style="width: 150px;">';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="historyReq.fn_saveApnt()">' +
                            '	<span class="k-button-text">저장</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="historyReq.fn_delApnt()">' +
                            '	<span class="k-button-text">삭제<span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="historyReq.fn_delApntAll()">' +
                            '	<span class="k-button-text">초기화<span>' +
                            '</button>';
                    }
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" onclick="fn_checkAll(\'checkAll\', \'checkUser\')" style="position: relative; top: 2px;" />',
                    template : function (e){
                        return "<input type='checkbox' id='chk"+e.EMP_SEQ+"' name='checkUser' value='"+e.EMP_SEQ+"' style='position: relative; top: 2px;'/>"
                    },
                    width: 40,
                    attribute: {
                        style: "text-align:center",
                    }
                }, {
                    field: "ERP_EMP_SEQ",
                    title: "사번",
                    width: 80
                }, {
                    field: "EMP_NAME_KR",
                    title: "성명",
                    width: 55
                }, {
                    field: "APNT_CD",
                    title: "발령구분",
                    width: 170,
                    template: function (e){
                        if(e.APNT_CD != null){
                            return "<input type='text' id='apntCd"+e.EMP_SEQ+"' class='formData apntCd' value="+ e.APNT_CD + ">";
                        }else{
                            return "<input type='text' id='apntCd"+e.EMP_SEQ+"' class='formData apntCd' />";
                        }

                    }
                }, {
                    title: "발령전",
                    columns: [
                        {
                            field: "DEPT_NAME",
                            title: "부서",
                            width: 170
                        }, {
                            field: "TEAM_NAME",
                            title: "팀",
                            width: 170
                        }, {
                            field: "POSITION_NAME",
                            title: "직급/등급",
                            width: 100
                        }, {
                            field: "DUTY_NAME",
                            title: "직책",
                            width: 100
                        }, {
                            field: "JOB_DETAIL",
                            title: "직무",
                            width: 200
                        },
                    ]
                }, {
                    title: "발령후",
                    columns: [
                        {
                            field: "DEPT_NAME",
                            title: "부서",
                            template: function(e){
                                if(e.AF_DEPT_SEQ != null){
                                    return '<input type="hidden" id="bfDeptSeq" name="bfDeptSeq" class="bfDeptSeq" value="' + e.DEPT_SEQ + '">' +
                                        '<input type="hidden" id="bfDeptName" name="bfDeptName" class="bfDeptName" value="' + e.DEPT_NAME + '">' +
                                        '<input type="text" id="afDept'+e.EMP_SEQ+'" name="afDept" class="formData afDept" value="' + e.AF_DEPT_SEQ + '">';
                                }else{
                                    return '<input type="hidden" id="bfDeptSeq" name="bfDeptSeq" class="bfDeptSeq" value="' + e.DEPT_SEQ + '">' +
                                        '<input type="hidden" id="bfDeptName" name="bfDeptName" class="bfDeptName" value="' + e.DEPT_NAME + '">' +
                                        '<input type="text" id="afDept'+e.EMP_SEQ+'" name="afDept" class="formData afDept" value="' + e.DEPT_SEQ + '">';
                                }
                            },
                            width: 170
                        }, {
                            field: "DEPT_TEAM_NAME",
                            title: "팀",
                            template: function(e){
                                if(e.AF_TEAM_SEQ != null) {
                                    return '<input type="hidden" id="bfTeamSeq" name="bfTeamSeq" class="bfTeamSeq" value="' + e.TEAM_SEQ + '">' +
                                        '<input type="hidden" id="bfTeamName" name="bfTeamName" class="bfTeamName" value="' + e.TEAM_NAME + '">' +
                                        '<input type="text" id="afTeam' + e.EMP_SEQ + '" name="afTeamSeq" class="formData afTeam" value="' + e.AF_TEAM_SEQ + '">';
                                }else{
                                    return '<input type="hidden" id="bfTeamSeq" name="bfTeamSeq" class="bfTeamSeq" value="' + e.TEAM_SEQ + '">' +
                                        '<input type="hidden" id="bfTeamName" name="bfTeamName" class="bfTeamName" value="' + e.TEAM_NAME + '">' +
                                        '<input type="text" id="afTeam' + e.EMP_SEQ + '" name="afTeamSeq" class="formData afTeam" value="' + e.TEAM_SEQ + '">';
                                }
                            },
                            width: 170
                        }, {
                            field: "POSITION_NAME",
                            title: "직급/등급",
                            template: function (e){
                                if(e.AF_POSITION_SEQ != null) {
                                    return '<input type="hidden" id="bfPositionSeq" name="bfPositionSeq" class="bfPositionSeq" value="' + e.POSITION_CODE + '">' +
                                        '<input type="hidden" id="bfPositionName" name="bfPositionName" class="bfPositionName" value="' + e.POSITION_NAME + '">' +
                                        '<input type="text" id="afPosition'+e.EMP_SEQ+'" name="afPosition" class="formData afPosition" value="' + e.AF_POSITION_SEQ + '">';
                                }else{
                                    return '<input type="hidden" id="bfPositionSeq" name="bfPositionSeq" class="bfPositionSeq" value="' + e.POSITION_CODE + '">' +
                                        '<input type="hidden" id="bfPositionName" name="bfPositionName" class="bfPositionName" value="' + e.POSITION_NAME + '">' +
                                        '<input type="text" id="afPosition'+e.EMP_SEQ+'" name="afPosition" class="formData afPosition" value="' + e.POSITION_SEQ + '">';
                                }
                            },
                            width: 160
                        }, {
                            field: "DUTY_NAME",
                            title: "직책",
                            template: function (e){
                                if(e.AF_DUTY_SEQ != null) {
                                    return '<input type="hidden" id="bfDutySeq" name="bfDutySeq" class="bfDutySeq" value="' + e.DUTY_CODE + '">' +
                                        '<input type="hidden" id="bfDutyName" name="bfDutyName" class="bfDutyName" value="' + e.DUTY_NAME + '">' +
                                        '<input type="text" id="afDuty'+e.EMP_SEQ+'" name="afDuty" class="formData afDuty" value="' + e.AF_DUTY_SEQ + '">';
                                }else{
                                    return '<input type="hidden" id="bfDutySeq" name="bfDutySeq" class="bfDutySeq" value="' + e.DUTY_CODE + '">' +
                                        '<input type="hidden" id="bfDutyName" name="bfDutyName" class="bfDutyName" value="' + e.DUTY_NAME + '">' +
                                        '<input type="text" id="afDuty'+e.EMP_SEQ+'" name="afDuty" class="formData afDuty" value="' + e.DUTY_SEQ + '">';
                                }
                            },
                            width: 120
                        }, {
                            field: "JOB_DETAIL",
                            title: "직무",
                            template: function (e){
                                if(e.AF_JOB_DETAIL != null) {
                                    return '<input type="hidden" id="bfJobDetail" name="bfJobDetail" class="bfJobDetail" value="' + e.JOB_DETAIL + '">' +
                                        '<input type="text" id="afJobDetail'+e.EMP_SEQ+'" name="afJobDetail" class="formData afJobDetail" value="' + e.AF_JOB_DETAIL + '">';
                                }else{
                                    return '<input type="hidden" id="bfJobDetail" name="bfJobDetail" class="bfJobDetail" value="' + e.JOB_DETAIL + '">' +
                                        '<input type="text" id="afJobDetail'+e.EMP_SEQ+'" name="afJobDetail" class="formData afJobDetail" value="' + e.JOB_DETAIL + '">';
                                }
                            },
                            width: 200
                        },
                    ]
                }, {
                    field: "ETC",
                    title: "비고",
                    template: function(e){
                        if(e.AF_ETC != null) {
                            return '<input type="text" id="afEtc'+e.EMP_SEQ+'" name="afEtc" class="formData afEtc" value="' + e.AF_ETC + '">';
                        }else{
                            return '<input type="text" id="afEtc'+e.EMP_SEQ+'" name="afEtc" class="formData afEtc">';
                        }
                    },
                    width: 120
                }
            ]
        }).data("kendoGrid");

        historyReq.dataBinding();
    },

    dataBinding: function(){
        $(document).on("focusout change", ".formData", function(){
            var dataItem = $("#popMainGrid").data("kendoGrid").dataItem($(this).closest("tr"));
            var APNT_CD = $("#apntCd"+dataItem.EMP_SEQ).data("kendoDropDownList").value();
            var AF_DEPT_SEQ = $("#afDept"+dataItem.EMP_SEQ).data("kendoDropDownList").value();
            var AF_TEAM_SEQ = $("#afTeam"+dataItem.EMP_SEQ).data("kendoDropDownList").value();
            var AF_POSITION_SEQ = $("#afPosition"+dataItem.EMP_SEQ).data("kendoDropDownList").value();
            var AF_DUTY_SEQ = $("#afDuty"+dataItem.EMP_SEQ).data("kendoDropDownList").value();
            var AF_JOB_DETAIL = $("#afJobDetail"+dataItem.EMP_SEQ).val();
            var AF_ETC = $("#afEtc"+dataItem.EMP_SEQ).val();

            $.each(historyReq.global.editDataSource.data, function(i, v){
                if(v.EMP_SEQ == dataItem.EMP_SEQ){
                    v.APNT_CD = APNT_CD;
                    v.AF_DEPT_SEQ = AF_DEPT_SEQ;
                    v.AF_TEAM_SEQ = AF_TEAM_SEQ;
                    v.AF_POSITION_SEQ = AF_POSITION_SEQ;
                    v.AF_DUTY_SEQ = AF_DUTY_SEQ;
                    v.AF_JOB_DETAIL = AF_JOB_DETAIL;
                    v.AF_ETC = AF_ETC;
                }
            });
        });
    },

    fn_selEmp: function(){
        let flag = false;
        let userArr = [];
        $("input[name='checkEmp']").each(function(){
            if(this.checked){
                if(historyReq.global.userArr.indexOf(this.value) < 0){
                    userArr.push(this.value);
                    historyReq.global.userArr.push(this.value);
                    flag = true;
                }
            }
        });
        if(!flag){
            return;
        }
        historyReq.global.nowUserArr = userArr;

        let data = {
            userList: userArr.join()
        }

        const result = customKendo.fn_customAjax("/user/getEmpSelList", data);
        let grid = $("#popMainGrid").data("kendoGrid");

        for(let i=0; i<result.list.length; i++){
            historyReq.global.editDataSource.data.push(result.list[i]);
            grid.dataSource.read();
            //grid.dataSource.add(result.list[i]);
        }

        historyReq.fn_popGridSetting();
    },

    fn_popGridSetting: function() {
        $(".afJobDetail, .afEtc").kendoTextBox();

        var data = {}
        data.deptLevel = 1;
        var deptDsA = customKendo.fn_customAjax("/dept/getDeptAList", data);
        deptDsA.rs.unshift({"dept_name" : "선택", "dept_seq" : ""});
        $(".afDept").kendoDropDownList({
            dataSource : deptDsA.rs,
            dataValueField : "dept_seq",
            dataTextField : "dept_name",
            change : function(){
                var searchData = {
                    parentDeptSeq : this.value(),
                    deptLevel : 2
                }

                var ds = customKendo.fn_customAjax("/dept/getDeptAList", searchData);
                ds.rs.unshift({"dept_name" : "선택", "dept_seq" : ""});
                $(this.element).closest("td").next().find("input[class=afTeam]").data("kendoDropDownList").dataSource.data(ds.rs);
            }
        });

        var dataSource = [{
            "dept_name" : "선택",
            "dept_seq" : ""
        }];

        $(".afTeam").kendoDropDownList({
            dataSource : dataSource,
            dataValueField : "dept_seq",
            dataTextField : "dept_name"
        });

        $(".apntCd").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "선택", value: "" },
                { text: "임용 (정규직)", value: "1" },
                { text: "임용 (계약직)", value: "2" },
                { text: "임용 (인턴 사원)", value: "3" },
                { text: "임용 (단기 직원)", value: "4" },
                { text: "임용 (위촉 직원)", value: "5" },
                { text: "임용 (경비 / 환경)", value: "6" },
                { text: "승진 (직급)", value: "7" },
                { text: "승진 (직위)", value: "8" },
                { text: "전보", value: "9" },
                { text: "겸직", value: "10" },
                { text: "직무 대리", value: "11" },
                { text: "파견", value: "12" },
                { text: "면직", value: "13" },
                { text: "강등", value: "14" },
                { text: "조직 개편", value: "15" },
                { text: "호칭 변경", value: "16" },
                { text: "기타", value: "17" }
            ]
        });

        $(".afPosition").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "선택", value: ""},
                {text: "수석행정원 / 1급", value: "1"},
                {text: "수석매니저 / 1급", value: "2"},
                {text: "수석연구원 / 1급", value: "3"},
                {text: "책임행정원 / 2급", value: "4"},
                {text: "책임매니저 / 2급", value: "5"},
                {text: "책임연구원 / 2급", value: "6"},
                {text: "선임연구원 / 3급", value: "7"},
                {text: "선임매니저 / 3급", value: "8"},
                {text: "선임행정원 / 3급", value: "9"},
                {text: "주임매니저 / 4급", value: "10"},
                {text: "행정원 / 4급", value: "11"},
                {text: "주임행정원 / 4급", value: "12"},
                {text: "매니저 / 4급", value: "13"},
                {text: "주임연구원 / 4급", value: "14"},
                {text: "연구원 / 4급", value: "15"}
            ]
        });

        $(".afDuty").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "선택", value: ""},
                {text: "원장", value: "원장"},
                {text: "본부장", value: "본부장"},
                {text: "사업부장", value: "사업부장"},
                {text: "센터장", value: "센터장"},
                {text: "팀장", value: "팀장"}
            ]
        });
    },

    loading: function(){
        $.LoadingOverlay("show", {
            background       : "rgba(0, 0, 0, 0.5)",
            image            : "",
            maxSize          : 60,
            fontawesome      : "fa fa-spinner fa-pulse fa-fw",
            fontawesomeColor : "#FFFFFF",
        });
    },

    fn_saveApnt : function(){
        let arr = [];
        const grid = $("#popMainGrid").data("kendoGrid");

        let regEmpSeq = $("#regEmpSeq").val();
        let regEmpName = $("#regEmpName").val();
        let numberName = $("#numberName").val();
        let relevantName = $("#relevantName").val();
        let historyDate = $("#historyDate").val().replace(/-/g, "");
        if(numberName == "") {
            alert("호수가 작성되지 않았습니다.");
            return;
        }else if(relevantName == "") {
            alert("관련근거가 작성되지 않았습니다.");
            return;
        }

        let flag = true;
        $.each($('#popMainGrid .k-master-row'), function(i, v) {
            const dataItem = grid.dataItem($(this).closest("tr"));
            let empSeq = dataItem.EMP_SEQ;
            if ($(v).find('#apntCd' + empSeq).data("kendoDropDownList").value() == "") {
                alert("발령기준을 선택해주세요.");
                flag = false;
                return flag;
            }
        });
        if (!flag) {
            return;
        }
        if(!confirm("인사발령을 진행하시겠습니까?")){
            return;
        }

        $("#docEditor").show();
        historyReq.loading();

        $.each($('#popMainGrid .k-master-row'), function(i, v){
            const dataItem = grid.dataItem($(this).closest("tr"));
            let empSeq = dataItem.EMP_SEQ;
            let data = {
                menuCd            : "history",
                docFileName       : "발령장.hwp",
                docId             : "historyHwp",

                hisEmpSeq         : empSeq,
                empName           : dataItem.EMP_NAME_KR,
                apntCd			  : $(v).find('#apntCd'+empSeq).data("kendoDropDownList").value(),
                apntName		  : $(v).find('#apntCd'+empSeq).data("kendoDropDownList").text(),

                bfDeptSeq         : dataItem.DEPT_SEQ,
                bfDeptName        : dataItem.DEPT_NAME,
                bfTeamSeq         : dataItem.TEAM_SEQ,
                bfTeamName        : dataItem.TEAM_NAME,
                bfPositionCode    : "",
                bfPositionName    : dataItem.POSITION_NAME,
                bfDutyCode        : "",
                bfDutyName        : dataItem.DUTY_NAME,
                bfJobDetail       : dataItem.JOB_DETAIL,

                afDeptSeq         : $(v).find('#afDept'+empSeq).data("kendoDropDownList").value(),
                afDeptName        : $(v).find('#afDept'+empSeq).data("kendoDropDownList").text() == "선택" ? "" : $(v).find('#afDept'+empSeq).data("kendoDropDownList").text(),
                afTeamSeq         : $(v).find('#afTeam'+empSeq).data("kendoDropDownList").value(),
                afTeamName        : $(v).find('#afTeam'+empSeq).data("kendoDropDownList").text() == "선택" ? "" : $(v).find('#afTeam'+empSeq).data("kendoDropDownList").text(),
                afPositionCode    : $(v).find('#afPosition'+empSeq).data("kendoDropDownList").value(),
                afPositionName    : $(v).find('#afPosition'+empSeq).data("kendoDropDownList").text() == "선택" ? "" : $(v).find('#afPosition'+empSeq).data("kendoDropDownList").text(),
                afGradeName       : $(v).find('#afPosition'+empSeq).data("kendoDropDownList").text() == "선택" ? "" : $(v).find('#afPosition'+empSeq).data("kendoDropDownList").text().split("/")[1].trim(),
                afDutyCode        : $(v).find('#afDuty'+empSeq).data("kendoDropDownList").value(),
                afDutyName        : $(v).find('#afDuty'+empSeq).data("kendoDropDownList").text() == "선택" ? "" : $(v).find('#afDuty'+empSeq).data("kendoDropDownList").text(),
                afJobDetail       : $(v).find('#afJobDetail'+empSeq).val(),

                deptSeq           : $(v).find('#afTeam'+empSeq).data("kendoDropDownList").value() == "" ? $(v).find('#afDept'+empSeq).data("kendoDropDownList").value() : $(v).find('#afTeam'+empSeq).data("kendoDropDownList").value(),
                position          : $(v).find('#afPosition'+empSeq).data("kendoDropDownList").text() == "선택" ? "" : $(v).find('#afPosition'+empSeq).data("kendoDropDownList").text().split("/")[0].trim(),

                afEtc             : $(v).find('#afEtc'+empSeq).val(),

                empSeq: regEmpSeq,
                regEmpName: regEmpName,
                numberName: numberName,
                relevantName: relevantName,
                historyDate: historyDate
            }
            arr.push(data);
        });

        console.log(arr);
        historyReq.fn_SetHtml(arr);
    },

    fn_SetHtml : function(arr){
        historyReq.global.hwpCtrl = BuildWebHwpCtrl("docEditor", historyReq.global.params.hwpUrl, function () {historyReq.editorComplete(arr);});
    },

    editorComplete : function(arr){
        var filePath = historyReq.global.params.hwpTemplateFile;
        filePath += "historyTmp.hwp";
        historyReq.global.hwpCtrl.Open(filePath, "HWP", "", function(){}, {"userData" : "success"});
        historyReq.resize();

        let i=0;
        let it = setInterval(function(){
            if(i < arr.length){
                console.log("index : "+i);
                var toDate = new Date().getFullYear() + "년 " + (new Date().getMonth() + 1) + "월 " + new Date().getDate() + "일";
                historyReq.global.hwpCtrl.PutFieldText("toDate", toDate);
                historyReq.global.hwpCtrl.PutFieldText("position", arr[i].bfPositionName);
                historyReq.global.hwpCtrl.PutFieldText("hisEmpName", arr[i].empName);
                let historyVal = "";
                if(arr[i].afDeptName != "") {
                    historyVal += arr[i].afDeptName + " ";
                }
                if(arr[i].afTeamName != "") {
                    historyVal += arr[i].afTeamName + " ";
                }
                if(arr[i].afPositionName != "") {
                    historyVal += arr[i].afPositionName + " ";
                }
                if(arr[i].afDutyName != "") {
                    historyVal += arr[i].afDutyName;
                }
                historyReq.global.hwpCtrl.PutFieldText("hisVal", historyVal);
                let historyDt = $("#historyDate").val().split("-")[0]+ "년 "+$("#historyDate").val().split("-")[1]+ "월 "+$("#historyDate").val().split("-")[2]+ "일";
                historyReq.global.hwpCtrl.PutFieldText("historyDt", historyDt);
                historyReq.global.hwpCtrl.PutFieldText("regEmpName", arr[i].regEmpName);

                (function(i) {
                    setTimeout(function() {
                        historyReq.fn_fileSave(arr[i], i);
                    }, 1500);
                })(i);
                i++;
            }else {
                clearInterval(it);
                alert("인사발령이 완료됐습니다.");
                opener.gridReload();
                window.close();
            }
        }, 3000);
        //웹한글기안기의 GetTextFile는 텀을 두고 저장해야하는데 그 사이에 반복문이 돌아감으로 반복문에도 텀을 줌.
    },

    fn_fileSave : function(data, index){
        historyReq.global.hwpCtrl.GetTextFile("HWPML2X", "", function (e){
            historyReq.fn_getHwpToStr(e, data, index);
        });
    },

    fn_getHwpToStr : function(e, data, index){
        data.docFileStr = e;
        $.ajax({
            url : "/inside/setHistoryInsert",
            data : data,
            type : "post",
            dataType : "json",
            async : false,
            success : function(result){
                console.log("ajax : "+index);
            },
            error : function(e) {
                alert("데이터 저장 중 에러가 발생했습니다.");
                console.log(e);
            }
        });
    },

    resize : function() {
        if (document.getElementById("hwpctrl_frame") != null && typeof(document.getElementById("hwpctrl_frame")) != "undefined") {
            var pHeight = (window.innerHeight - 20) + "px";
            document.getElementById("hwpctrl_frame").style.width = "100%";
            document.getElementById("hwpctrl_frame").style.height = pHeight;
        }
    },

    fn_delApnt : function(){
        const grid = $("#popMainGrid").data("kendoGrid");
        let dataItem = {};
        $("#popMainGrid").find("input[name='checkUser']:checked").each(function(){
            dataItem = grid.dataItem($(this).closest("tr"));
            grid.removeRow($(this).closest('tr'));
            historyReq.global.userArr = historyReq.global.userArr.filter((value, index, arr) => {
                return value != dataItem.EMP_SEQ;
            });
        });
    },

    fn_delApntAll : function(){
        if(!confirm("선택하신 데이터가 전부 삭제됩니다. 초기화 하시겠습니까?")){
            return;
        }
        const grid = $("#popMainGrid").data("kendoGrid");
        $("#popMainGrid").find("input[name='checkUser']").each(function(){
            grid.removeRow($(this).closest('tr'));
        });
        historyReq.global.userArr = [];
    }
}
