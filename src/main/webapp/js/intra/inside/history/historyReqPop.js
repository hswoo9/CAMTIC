const historyReq = {
    global: {
        userArr : [],
        nowUserArr: [],
        hwpCtrl: "",
        params: "",
        editDataSource: {},
        delArr: [],
        test: [],
        index : 0,
    },

    init: function(){
        historyReq.mainGrid();
        historyReq.editGrid();
        historyReq.dataSet();
    },

    dataSet: function(){
        historyReq.global.params = params;
        historyReq.fn_selEmp();
        customKendo.fn_textBox(["searchVal", "numberName", "relevantName"]);
        customKendo.fn_datePicker("historyDate", "month", "yyyy-MM-dd", new Date());
        $("#historyDate").data("kendoDatePicker").enable(true);

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

        if($("#mode").val() == "upd"){
            let data = {
                pk: $("#pk").val()
            }
            const result = customKendo.fn_customAjax("/inside/getUpdHistoryList", data);
            let grid = $("#popMainGrid").data("kendoGrid");
            let userArr = result.list;

            for(let i=0; i<userArr.length; i++){
                userArr[i].INDEX = i + historyReq.global.index;
                historyReq.global.index++;
                historyReq.global.userArr.push(userArr[i].EMP_SEQ);
                historyReq.global.editDataSource.data.push(userArr[i]);
                grid.dataSource.read();
            }
            historyReq.global.nowUserArr = historyReq.global.userArr;


            $("#numberName").val(userArr[0].NUMBER_NAME);
            $("#relevantName").val(userArr[0].RELEVANT_NAME);
            $("#historyDate").val(userArr[0].HISTORY_DATE);
            historyReq.fn_popGridSetting();
        }

        var printButton = $("#popMainGrid").find('[id^="printButton_"]');
        printButton.prop('disabled', false);
    },

    changeApntCdAll: function(){
        const grid = $("#popMainGrid").data("kendoGrid");
        $("#popMainGrid").find("input[name='checkUser']:checked").each(function(){
            const dataItem = grid.dataItem($(this).closest("tr"));
            let empSeq = dataItem.EMP_SEQ;
            let index = dataItem.INDEX;
            //$("#apntCd"+String(empSeq)).data("kendoDropDownList").value($("#apntCdAll").val());
            $("#apntCd"+empSeq +"_" +index).data("kendoDropDownList").value($("#apntCdAll").val());


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
                    data.workStatusCode = 'Y';

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
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount: 5
            },
            toolbar: [
                {
                    name: 'text',
                    template: function(){
                        return '<span>이름</span>' +
                            '	<input type="text" id="searchVal" class="searchVal" style="width: 200px;" onkeypress="if(window.event.keyCode==13){gridReload();}">' ;
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
    },

    editGrid: function(){

        var tmpGrid = $("#popMainGrid").data("kendoGrid");

        if(tmpGrid != null){
            tmpGrid.destroy();
        }

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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="historyReq.fn_sendApnt();">' +
                            '	<span class="k-button-text">발령장 전송</span>' +
                            '</button>';
                    }
                },{
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="historyReq.fn_saveApnt();">' +
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
                    template: function (e){
                        if(e.APNT_SN != null){
                            return "<input type='hidden' id='apntSn"+e.EMP_SEQ + "_" + e.INDEX +"' name='apntSn' value='"+e.APNT_SN+"'/>" +
                                "<input type='checkbox' id='chk"+e.EMP_SEQ + "_" + e.INDEX + "' name='checkUser' value='"+e.EMP_SEQ+ "_" + e.INDEX + "' style='position: relative; top: 2px;'/>";
                        }else{
                            return "<input type='hidden' id='apntSn"+e.EMP_SEQ+ "_" + e.INDEX + "' name='apntSn' value=''/>" +
                                "<input type='checkbox' id='chk"+e.EMP_SEQ+ "_" + e.INDEX + "' name='checkUser' value='"+e.EMP_SEQ+ "_" + e.INDEX + "' style='position: relative; top: 2px;'/>";
                        }
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
                            return "<input type='text' id='apntCd"+e.EMP_SEQ+ "_" + e.INDEX + "' class='formData apntCd' value="+ e.APNT_CD + ">";
                        }else{
                            return "<input type='text' id='apntCd"+e.EMP_SEQ+ "_" + e.INDEX + "' class='formData apntCd' />";
                        }

                    }
                },
                {
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
                            width: 120,
                            template: function(row){
                                if(row.GRADE_NAME != null && row.GRADE_NAME != ""){
                                    return row.POSITION_NAME + " / " + row.GRADE_NAME;
                                }else{
                                    return row.POSITION_NAME;
                                }
                            }
                        }, {
                            field: "DUTY_NAME",
                            title: "직책",
                            width: 100
                        }, {
                            field: "JOB_DETAIL",
                            title: "직무",
                            width: 200,
                            template: function(row){
                                if(row.JOB_DETAIL != null && row.JOB_DETAIL != "" && row.JOB_DETAIL != "undefined"){
                                    return row.JOB_DETAIL;
                                }else{
                                    return "";
                                }
                            }
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
                                        '<input type="text" id="afDept'+e.EMP_SEQ+ "_" + e.INDEX + '" name="afDept" class="formData afDept" value="' + e.AF_DEPT_SEQ + '">';
                                }else{
                                    return '<input type="hidden" id="bfDeptSeq" name="bfDeptSeq" class="bfDeptSeq" value="' + e.DEPT_SEQ + '">' +
                                        '<input type="hidden" id="bfDeptName" name="bfDeptName" class="bfDeptName" value="' + e.DEPT_NAME + '">' +
                                        '<input type="text" id="afDept'+e.EMP_SEQ+ "_" + e.INDEX + '" name="afDept" class="formData afDept" value="' + e.DEPT_SEQ + '">';
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
                                        '<input type="text" id="afTeam' + e.EMP_SEQ + "_" + e.INDEX +  '" name="afTeamSeq" class="formData afTeam" value="' + e.AF_TEAM_SEQ + '">';
                                }else{
                                    return '<input type="hidden" id="bfTeamSeq" name="bfTeamSeq" class="bfTeamSeq" value="' + e.TEAM_SEQ + '">' +
                                        '<input type="hidden" id="bfTeamName" name="bfTeamName" class="bfTeamName" value="' + e.TEAM_NAME + '">' +
                                        '<input type="text" id="afTeam' + e.EMP_SEQ + "_" + e.INDEX +  '" name="afTeamSeq" class="formData afTeam" value="' + e.TEAM_SEQ + '">';
                                }
                            },
                            width: 170
                        }, {
                            field: "POSITION_NAME",
                            title: "직급/등급",
                            template: function (e){
                                if(e.AF_POSITION_CODE != null) {
                                    return '<input type="hidden" id="bfPositionSeq" name="bfPositionSeq" class="bfPositionSeq" value="' + e.POSITION_CODE + '">' +
                                        '<input type="hidden" id="bfPositionName" name="bfPositionName" class="bfPositionName" value="' + e.POSITION_NAME + '">' +
                                        '<input type="text" id="afPosition'+e.EMP_SEQ+ "_" + e.INDEX + '" name="afPosition" class="formData afPosition" value="' + e.AF_POSITION_CODE + '">';
                                }else{
                                    return '<input type="hidden" id="bfPositionSeq" name="bfPositionSeq" class="bfPositionSeq" value="' + e.POSITION_CODE + '">' +
                                        '<input type="hidden" id="bfPositionName" name="bfPositionName" class="bfPositionName" value="' + e.POSITION_NAME + '">' +
                                        '<input type="text" id="afPosition'+e.EMP_SEQ+ "_" + e.INDEX + '" name="afPosition" class="formData afPosition" value="' + e.POSITION_CODE + '">';
                                }
                            },
                            width: 160
                        }, {
                            field: "DUTY_NAME",
                            title: "직책",
                            template: function (e){
                                if(e.AF_DUTY_CODE != null) {
                                    return '<input type="hidden" id="bfDutySeq" name="bfDutySeq" class="bfDutySeq" value="' + e.DUTY_CODE + '">' +
                                        '<input type="hidden" id="bfDutyName" name="bfDutyName" class="bfDutyName" value="' + e.DUTY_NAME + '">' +
                                        '<input type="text" id="afDuty'+e.EMP_SEQ+ "_" + e.INDEX + '" name="afDuty" class="formData afDuty" value="' + e.AF_DUTY_CODE + '">';
                                }else{
                                    return '<input type="hidden" id="bfDutySeq" name="bfDutySeq" class="bfDutySeq" value="' + e.DUTY_CODE + '">' +
                                        '<input type="hidden" id="bfDutyName" name="bfDutyName" class="bfDutyName" value="' + e.DUTY_NAME + '">' +
                                        '<input type="text" id="afDuty'+e.EMP_SEQ+ "_" + e.INDEX + '" name="afDuty" class="formData afDuty" value="' + e.DUTY_CODE + '">';
                                }
                            },
                            width: 120
                        }, {
                            field: "JOB_DETAIL",
                            title: "직무",
                            template: function (e){
                                if(e.AF_JOB_DETAIL != null) {
                                    if(e.AF_JOB_DETAIL == "undefined" || e.AF_JOB_DETAIL == null) {
                                        e.AF_JOB_DETAIL = "";
                                    }
                                    return '<input type="hidden" id="bfJobDetail" name="bfJobDetail" class="bfJobDetail" value="' + e.JOB_DETAIL + '">' +
                                        '<input type="text" id="afJobDetail'+e.EMP_SEQ+ "_" + e.INDEX + '" name="afJobDetail" class="formData afJobDetail" value="' + e.AF_JOB_DETAIL + '">';
                                }else{
                                    if(e.JOB_DETAIL == "undefined" || e.JOB_DETAIL == null) {
                                        e.JOB_DETAIL = "";
                                    }
                                    return '<input type="hidden" id="bfJobDetail" name="bfJobDetail" class="bfJobDetail" value="' + e.JOB_DETAIL + '">' +
                                        '<input type="text" id="afJobDetail'+e.EMP_SEQ+ "_" + e.INDEX + '" name="afJobDetail" class="formData afJobDetail" value="' + e.JOB_DETAIL + '">';
                                }
                            },
                            width: 200
                        },
                    ]
                }, {
                    field: "ETC",
                    title: "비고",
                    template: function(e){
                        if(e.ETC != null) {
                            return '<input type="text" id="afEtc'+e.EMP_SEQ+ "_" + e.INDEX + '" name="afEtc" class="formData afEtc" value="' + e.ETC + '">';
                        }else{
                            return '<input type="text" id="afEtc'+e.EMP_SEQ+ "_" + e.INDEX + '" name="afEtc" class="formData afEtc">';
                        }
                    },
                    width: 120
                }, {
                    title : "발령장",
                    width: 100,
                    template : function (e){
                        return '<button type="button" id="printButton_' + e.INDEX + '" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="historyReq.openPrintPop(\'' + e.EMP_SEQ + '\', \'' + e.INDEX + '\')" disabled>' +
                            '	<span class="k-button-text">보기</span>' +
                            '</button>';

                    }
                }
            ],

        }).data("kendoGrid");

        historyReq.dataBinding();
    },


    dataBinding: function(){
        $(document).on("focusout change", ".formData", function(){
            var dataItem = $("#popMainGrid").data("kendoGrid").dataItem($(this).closest("tr"));

            $.each(historyReq.global.editDataSource.data, function(i, v){
                var APNT_CD = $("#apntCd"+dataItem.EMP_SEQ+"_"+dataItem.INDEX).data("kendoDropDownList").value();
                var AF_DEPT_SEQ = $("#afDept"+dataItem.EMP_SEQ+"_"+dataItem.INDEX).data("kendoDropDownList").value();
                var AF_TEAM_SEQ = $("#afTeam"+dataItem.EMP_SEQ+"_"+dataItem.INDEX).data("kendoDropDownList").value();
                var AF_POSITION_CODE = $("#afPosition"+dataItem.EMP_SEQ+"_"+dataItem.INDEX).data("kendoDropDownList").value();
                var AF_DUTY_CODE = $("#afDuty"+dataItem.EMP_SEQ+"_"+dataItem.INDEX).data("kendoDropDownList").value();
                var AF_JOB_DETAIL = $("#afJobDetail"+dataItem.EMP_SEQ+"_"+dataItem.INDEX).val();
                var ETC = $("#afEtc"+dataItem.EMP_SEQ+"_"+dataItem.INDEX).val();

                if(v.EMP_SEQ == dataItem.EMP_SEQ){
                    v.APNT_CD = APNT_CD;
                    v.AF_DEPT_SEQ = AF_DEPT_SEQ;
                    v.AF_TEAM_SEQ = AF_TEAM_SEQ;
                    v.AF_POSITION_CODE = AF_POSITION_CODE;
                    v.AF_DUTY_CODE = AF_DUTY_CODE;
                    v.AF_JOB_DETAIL = AF_JOB_DETAIL;
                    v.ETC = ETC;
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
            result.list[i].INDEX = historyReq.global.index;
            historyReq.global.index++;
            historyReq.global.userArr.push(userArr[i].EMP_SEQ);
            historyReq.global.editDataSource.data.push(result.list[i]);
            //grid.dataSource._data = historyReq.global.editDataSource.data;
            historyReq.editGrid();
            //grid.dataSource.add(result.list[i]);
        }

        historyReq.fn_popGridSetting();
    },

    fn_popGridSetting: function(type) {
        $(".afJobDetail, .afEtc").kendoTextBox();

        var data = {}
        data.deptLevel = 1;
        var deptDsA = customKendo.fn_customAjax("/dept/getDeptAList", data);
        // deptDsA.rs.unshift({"dept_name" : "해당없음", "dept_seq" : ""});
        //deptDsA.rs.unshift({"dept_name" : "선택", "dept_seq" : ""});
        $(".afDept").kendoDropDownList({
            dataSource : deptDsA.rs,
            dataValueField : "dept_seq",
            dataTextField : "dept_name",
            change : function(){
                historyReq.global.test = $(this);
                let empSeq = historyReq.global.test[0].element[0].id.replace("afDept", "");
                var searchData = {
                    parentDeptSeq : this.value(),
                    deptLevel : 2
                }

                var ds = customKendo.fn_customAjax("/dept/getDeptAList", searchData);
                ds.rs.unshift({"dept_name" : "해당없음", "dept_seq" : ""});
                $("#afTeam"+empSeq).data("kendoDropDownList").dataSource.data(ds.rs);
                $("#afTeam"+empSeq).data("kendoDropDownList").value("");
            }
        });

        var dataSource = [{
            "dept_name" : "해당없음",
            "dept_seq" : ""
        }];

        $(".afTeam").kendoDropDownList({
            dataSource : dataSource,
            dataValueField : "dept_seq",
            dataTextField : "dept_name"
        });

        $(document).ready(function() {
            // debugger
            if(type != "del"){
                $.each(historyReq.global.editDataSource.data, function (i, v) {
                    let searchData = {
                        parentDeptSeq: v.AF_DEPT_SEQ == undefined ? v.DEPT_SEQ : v.AF_DEPT_SEQ,
                        deptLevel: 2
                    }

                    if($("#afTeam" + v.EMP_SEQ + "_" + i).data("kendoDropDownList") != undefined){
                        let ds = customKendo.fn_customAjax("/dept/getDeptAList", searchData);
                        ds.rs.unshift({"dept_name": "해당없음", "dept_seq": ""});

                        $("#afTeam" + v.EMP_SEQ + "_" + i).data("kendoDropDownList").dataSource.data(ds.rs);
                        $("#afTeam" + v.EMP_SEQ + "_" + i).data("kendoDropDownList").value(v.AF_TEAM_SEQ == undefined ? v.TEAM_SEQ : v.AF_TEAM_SEQ);
                    }
                });
            }
        });


        $(".apntCd").each(function () {
            $(this).kendoDropDownList({
                dataTextField: "text",
                dataValueField: "value",
                dataSource: [
                    {text: "선택", value: ""},
                    {text: "임용 (정규직)", value: "1"},
                    {text: "임용 (계약직)", value: "2"},
                    {text: "임용 (인턴 사원)", value: "3"},
                    {text: "임용 (단기 직원)", value: "4"},
                    {text: "임용 (위촉 직원)", value: "5"},
                    {text: "임용 (경비 / 환경)", value: "6"},
                    {text: "승진 (직급)", value: "7"},
                    {text: "승진 (직위)", value: "8"},
                    {text: "전보", value: "9"},
                    {text: "겸직", value: "10"},
                    {text: "직무 대리", value: "11"},
                    {text: "파견", value: "12"},
                    {text: "면직", value: "13"},
                    {text: "강등", value: "14"},
                    {text: "조직 개편", value: "15"},
                    {text: "호칭 변경", value: "16"},
                    {text: "기타", value: "17"}
                ],
                value: $(this).val(), // 초기값 설정
                change: function() {
                    console.log("Dropdown initialized for apntCd");
                }

            });
        });

        var dropDownDataSource = customKendo.fn_customAjax("/system/commonCodeManagement/getCmCodeList", {cmGroupCodeId : "4"});
        // dropDownDataSource.unshift({"CM_CODE_NM": "해당없음", "CM_CODE": ""});

        $(".afPosition").kendoDropDownList({
                dataTextField: "CM_CODE_NM",
                dataValueField: "CM_CODE",
                dataSource: dropDownDataSource
        });

        /*
        $(".afPosition").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "해당없음", value: ""},
                {text: "수석연구원 / 1급", value: "16"},
                {text: "수석매니저 / 1급", value: "2"},
                {text: "수석행정원 / 1급", value: "1"},
                {text: "책임매니저 / 2급", value: "3"},
                {text: "책임행정원 / 2급", value: "4"},
                {text: "책임연구원 / 2급", value: "5"},
                {text: "선임매니저 / 3급", value: "6"},
                {text: "선임연구원 / 3급", value: "7"},
                {text: "선임행정원 / 3급", value: "8"},
                {text: "주임매니저 / 4급", value: "9"},
                {text: "주임연구원 / 4급", value: "10"},
                {text: "주임행정원 / 4급", value: "11"},
                {text: "매니저 / 4급", value: "12"},
                {text: "연구원 / 4급", value: "13"},
                {text: "행정원 / 4급", value: "14"},
            ]
        });
         */

        var dropDownDataSource2 = customKendo.fn_customAjax("/system/commonCodeManagement/getCmCodeList", {cmGroupCodeId : "3"});
        dropDownDataSource2.unshift({"CM_CODE_NM" : "해당없음", "CM_CODE" : ""});

        $(".afDuty").kendoDropDownList({
            dataTextField: "CM_CODE_NM",
            dataValueField: "CM_CODE",
            dataSource: dropDownDataSource2
        });

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
        var dataSource = grid.dataSource;
        var data = dataSource.data();

        let regEmpSeq = $("#regEmpSeq").val();
        let regEmpName = $("#regEmpName").val();
        let numberName = $("#numberName").val();
        let relevantName = $("#relevantName").val();
        let historyDate = $("#historyDate").val().replace(/-/g, "");
        console.log(arr)
        if(numberName == "") {
            alert("호수가 작성되지 않았습니다.");
            return;
        }else if(relevantName == "") {
            alert("관련근거가 작성되지 않았습니다.");
            return;
        }

        if (data.length === 0) {
            alert("선택된 인원이 없습니다.");
            return;
        }


        let flag = true;
        $.each($('#popMainGrid .k-master-row'), function(i, v) {
            const dataItem = grid.dataItem($(this).closest("tr"));
            let empSeq = dataItem.EMP_SEQ;
            if ($(v).find('#apntCd' + empSeq + "_" + dataItem.INDEX).data("kendoDropDownList").value() == "") {
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

        //$("#docEditor").show();
        //historyReq.loading();

        $.each($('#popMainGrid .k-master-row'), function(i, v){
            const dataItem = grid.dataItem($(this).closest("tr"));
            let empSeq = dataItem.EMP_SEQ;
            var teamDropdown = $(v).find('#afTeam'+empSeq+'_'+dataItem.INDEX).data("kendoDropDownList");
            var deptDropdown = $(v).find('#afDept'+empSeq+'_'+dataItem.INDEX).data("kendoDropDownList");
            let data = {
                menuCd            : "history",
                docFileName       : "발령장.hwp",
                docId             : "historyHwp",

                hisEmpSeq         : empSeq,
                empName           : dataItem.EMP_NAME_KR,
                apntCd			  : $(v).find('#apntCd'+empSeq+'_'+dataItem.INDEX).data("kendoDropDownList").value(),
                apntName		  : $(v).find('#apntCd'+empSeq+'_'+dataItem.INDEX).data("kendoDropDownList").text(),

                bfDeptSeq         : dataItem.DEPT_SEQ,
                bfDeptName        : dataItem.DEPT_NAME,
                bfTeamSeq         : dataItem.TEAM_SEQ,
                bfTeamName        : dataItem.TEAM_NAME,
                bfPositionCode    : "",
                bfPositionName    : dataItem.POSITION_NAME,
                bfDutyCode        : "",
                bfDutyName        : dataItem.DUTY_NAME,
                bfJobDetail       : dataItem.JOB_DETAIL,

                afDeptSeq         : $(v).find('#afDept'+empSeq+'_'+dataItem.INDEX).data("kendoDropDownList").value(),
                afDeptName        : $(v).find('#afDept'+empSeq+'_'+dataItem.INDEX).data("kendoDropDownList").value() == "" ? "" : $(v).find('#afDept'+empSeq+'_'+dataItem.INDEX).data("kendoDropDownList").text(),

                afTeamSeq         : $(v).find('#afTeam'+empSeq+'_'+dataItem.INDEX).data("kendoDropDownList").value(),
                afTeamName        : $(v).find('#afTeam'+empSeq+'_'+dataItem.INDEX).data("kendoDropDownList").value() == "" ? "" : $(v).find('#afTeam'+empSeq+'_'+dataItem.INDEX).data("kendoDropDownList").text(),

                afPositionCode    : $(v).find('#afPosition'+empSeq+'_'+dataItem.INDEX).data("kendoDropDownList").value(),
                afPositionName    : $(v).find('#afPosition'+empSeq+'_'+dataItem.INDEX).data("kendoDropDownList").value() == "" ? "" : $(v).find('#afPosition'+empSeq+'_'+dataItem.INDEX).data("kendoDropDownList").text(),

                afDutyCode        : $(v).find('#afDuty'+empSeq+'_'+dataItem.INDEX).data("kendoDropDownList").value(),
                afDutyName        : $(v).find('#afDuty'+empSeq+'_'+dataItem.INDEX).data("kendoDropDownList").value() == "" ? "" : $(v).find('#afDuty'+empSeq+'_'+dataItem.INDEX).data("kendoDropDownList").text(),

                afGradeName       : $(v).find('#afPosition'+empSeq+'_'+dataItem.INDEX).data("kendoDropDownList").value() == "" ? "" : $(v).find('#afPosition'+empSeq+'_'+dataItem.INDEX).data("kendoDropDownList").text().split("/")[1].trim(),

                afJobDetail       : $(v).find('#afJobDetail'+empSeq+'_'+dataItem.INDEX).val(),

                deptSeq: teamDropdown ? teamDropdown.value() == "" ? deptDropdown ? deptDropdown.value() : "" : teamDropdown.value() : "",
                //deptSeq           : $(v).find('#afTeam'+empSeq+'_'+i).data("kendoDropDownList").value() == "" ? $(v).find('#afDept'+empSeq+'_'+i).data("kendoDropDownList").value() : $(v).find('#afTeam'+empSeq).data("kendoDropDownList").value(),
                position          : $(v).find('#afPosition'+empSeq+'_'+dataItem.INDEX).data("kendoDropDownList").value() == "" ? "" : $(v).find('#afPosition'+empSeq+'_'+dataItem.INDEX).data("kendoDropDownList").text().split("/")[0].trim(),

                afEtc             : $('#afEtc'+empSeq+'_'+dataItem.INDEX).val(),

                empSeq: regEmpSeq,
                regEmpName: regEmpName,
                numberName: numberName,
                relevantName: relevantName,
                historyDate: historyDate,

                apntSn: $('#apntSn'+empSeq+'_'+dataItem.INDEX).val()
            }
            arr.push(data);

            if(data.apntSn == ""){
                let url = "/inside/setHistoryInsert";
                var apntSn = customKendo.fn_customAjax(url, data);
                $(v).find('#apntSn' + empSeq + '_' + dataItem.INDEX).val(apntSn.apntSn);

                $('#printButton_' + dataItem.INDEX).prop('disabled', false);
            }else{
                let url = "/inside/setHistoryUpdate";
                customKendo.fn_customAjax(url, data);
            }
        });

        if(historyReq.global.delArr.length > 0){
            var apntArr = "";
            for(var i=0; i<historyReq.global.delArr.length; i++){
                apntArr += "," + historyReq.global.delArr[i];
            }

            $.ajax({
                url : "/inside/setHistoryDelete",
                type : "POST",
                data : {
                    "apntArr" : apntArr.substring(1)
                },
                success : function(){
                    console.log("success");
                }
            })
        }


        alert("인사발령이 완료됐습니다.");
        opener.historyList.gridReload();
        // historyReq.editGrid();
        // historyReq.fn_popGridSetting();

        // var printButton = $("#popMainGrid").find('[id^="printButton_"]');
        // printButton.prop('disabled', false);
        window.close();
    },

    fn_sendApnt : function(){
        const grid = $("#popMainGrid").data("kendoGrid");

        let flag = true;
        let flag2 = true;

        if($("input[name=checkUser]:checked").length == 0){
            flag2 = false;
        }

        if (!flag2) {
            alert("선택된 인원이 없습니다.");
            return;
        }

        $.each($('#popMainGrid .k-master-row'), function(i, v) {
            const dataItem = grid.dataItem($(this).closest("tr"));
            let empSeq = dataItem.EMP_SEQ;

            if ($(v).find('#apntSn' + empSeq + '_' + i).val() == "") {
                alert("발령장 저장 후 전송 가능합니다.");
                flag = false;
                return flag;
            }
        });

        if (!flag) {
            return;
        }
        if(!confirm("발령장 전송을 진행하시겠습니까?")){
            return;
        }
        
        $.each($('#popMainGrid .k-master-row'), function(i, v){
            const dataItem = grid.dataItem($(this).closest("tr"));
            let empSeq = dataItem.EMP_SEQ;
            let chk = $('#popMainGrid .k-master-row').find('#chk' + empSeq + '_' + dataItem.INDEX).is(':checked');

            if(chk){
                var apntSn = $(v).find('#apntSn' + empSeq + '_' + dataItem.INDEX).val();
                customKendo.fn_customAjax("/inside/pop/setTmpActiveUpdate.do", { apntSn : apntSn });
            }
        });

        alert("발령장 전송이 완료되었습니다.");
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
        var grid = $("#popMainGrid").data("kendoGrid");
        var dataItemAr = [];
        var dataItem = {};

        $("#popMainGrid").find("input[name='checkUser']:checked").each(function(){
            dataItemAr.push(grid.dataItem($(this).closest("tr")));
            if(grid.dataItem($(this).closest("tr")).APNT_SN){
                historyReq.global.delArr.push(grid.dataItem($(this).closest("tr")).APNT_SN);
            }
        });

        for(let i = 0; i < dataItemAr.length; i++){
            dataItem = dataItemAr[i];
            grid.removeRow(dataItem);
            historyReq.global.userArr = historyReq.global.userArr.filter((value, index, arr) => {
                //return String(value) != String($(this).val());
                return value != dataItem.EMP_SEQ;
            });
            //historyReq.global.editDataSource.data = historyReq.global.editDataSource.data.filter(param => String(param.EMP_SEQ) != String($(this).val()));
            historyReq.global.editDataSource.data = historyReq.global.editDataSource.data.filter(param => String(param.EMP_SEQ) != String(dataItem.EMP_SEQ));
        }

        historyReq.editGrid();
        historyReq.fn_popGridSetting("del");

    },


    fn_delApntAll : function() {
        if (!confirm("선택하신 데이터가 전부 삭제됩니다. 초기화 하시겠습니까?")) {
            return;
        }
        const grid = $("#popMainGrid").data("kendoGrid");
        $("#popMainGrid").find("input[name='checkUser']").each(function () {
            grid.removeRow($(this).closest('tr'));
        });
        historyReq.global.userArr = [];
        historyReq.global.editDataSource.data = [];
        historyReq.editGrid();

    },

    openPrintPop : function (empSeq, index){
        var apntSn = $('#apntSn' + empSeq + '_' + index).val();
        var url = "/Inside/pop/historyPrintPop.do?apntSn="+apntSn+"&type=S";
        var name = "historyPrintPop";
        var option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    }

}
