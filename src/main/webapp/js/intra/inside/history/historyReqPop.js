var now = new Date();

var historyReqPop = {

    init : function(){
        historyReqPop.dataSet();
        historyReqPop.mainGrid();
    },

    dataSet() {
        customKendo.fn_textBox(["searchVal", "number", "relevant"]);
        var data = {}
        data.deptLevel = 1;
        var deptDsA = customKendo.fn_customAjax("/dept/getDeptAList", data);
        customKendo.fn_dropDownList("dept", deptDsA.rs, "dept_name", "dept_seq");
        $("#dept").data("kendoDropDownList").bind("change", historyReqPop.fn_chngDeptComp)
        $("#dept").data("kendoDropDownList").select(0);
        $("#dept").data("kendoDropDownList").trigger("change");


        $("#historyType").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
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
            index: 0
        });

        $("#historyDate").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date()
        });
    },

    fn_chngDeptComp: function (){
        var data = {}
        data.deptLevel = 2;
        data.parentDeptSeq = this.value();
        var ds = customKendo.fn_customAjax("/dept/getDeptAList", data);
        customKendo.fn_dropDownList("team", ds.rs, "dept_name", "dept_seq")
    },

    mainGrid : function() {

        var data = {
            deptSeq : $("#team").val() == "" ? ($("#dept").val() == "" ? "" : $("#dept").val()) : $("#team").val(),
            empName : $("#searchVal").val()
        }

        $("#mainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2("/user/getEmpList", data),
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 507,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 30, 50, 100 ],
                buttonCount : 5
            },
            toolbar : [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="historyReqPop.fn_selEmp()">' +
                            '	<span class="k-button-text">선택완료</span>' +
                            '</button>';
                    }
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound : historyReqPop.onDataBound,
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" onclick="historyReqPop.fn_checkAll()" style="position : relative; top : 2px;" />',
                    template : function (e){
                        return "<input type='checkbox' id='chk"+e.EMP_SEQ+"' name='checkUser' value='"+e.EMP_SEQ+"' style=\"position : relative; top : 2px;\" />"
                    },
                    width: 30,
                    attribute : {
                        style : "text-align:center",
                    }
                }, {
                    field: "DEPT_NAME",
                    title: "부서"
                }, {
                    field: "TEAM_NAME",
                    title: "팀",
                    width: 100,
                }, {
                    field: "EMP_NAME_KR",
                    title: "성명",
                    width: 60,
                }
            ]
        }).data("kendoGrid");
    },

    onDataBound : function(){
        const grid = this;
        grid.tbody.find("tr").dblclick(function (e) {
            console.log(e);
        });
    },

    gridReload: function (){
        historyReqPop.mainGrid();
    },

    historyReqPopPop : function() {
        var url = "/inside/historyReqPopPop.do";
        var name = "historyReqPopPop";
        var option = "width=800, height=750, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    },

    fn_checkAll: function(){
        if($("#checkAll").is(":checked")) {
            $("input[name='checkUser']").prop("checked", true);
        }else{
            $("input[name='checkUser']").prop("checked", false);
        }
    },

    fn_selEmp: function(){
        var empArr = [];
        $("input[name='checkUser']").each(function(){
            if(this.checked){
                empArr.push(this.value);
            }
        });

        var data = {
            empArr : empArr
        }

        var dataSource = new kendo.data.DataSource({
            serverPaging: false,
            pageSize: 100,
            transport: {
                read : {
                    url : "/user/getEmpSelList",
                    dataType : "json",
                    contentType:'application/json; charset=utf-8',
                    type : "post",
                    async : false
                },
                parameterMap: function(data, operation) {
                    return JSON.stringify({"empArr" : empArr});
                }
            },
            schema : {
                data: function (data) {
                    console.log(data);
                    return data.list;
                },
                total: function (data) {
                    return data.list.length;
                },
                error: function (data){
                    console.log(data);
                }
            },
        });


        $("#popMainGrid").kendoGrid({
            dataSource: dataSource,
            scrollable: true,
            height: 600,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 30, 50, 100 ],
                buttonCount : 5
            },
            toolbar : [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="historyReqPop.fn_saveApnt()">' +
                            '	<span class="k-button-text">저장</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="historyReqPop.fn_delApnt()">' +
                            '	<span class="k-button-text">취소<span>' +
                            '</button>';
                    }
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" onclick="historyReqPop.fn_checkAll()" style="position : relative; top : 2px;" />',
                    template : function (e){
                        return "<input type='checkbox' id='chk"+e.EMP_SEQ+"' name='checkUser' value='"+e.EMP_SEQ+"' style=\"position : relative; top : 2px;\" />"
                    },
                    width: 40,
                    attribute : {
                        style : "text-align:center",
                    }
                }, {
                    field: "EMP_NAME_KR",
                    title: "성명",
                    width: 55
                }, {
                    title: "발령기준",
                    width: 120,
                    template : function (e){
                        return "<input type='text' id='apntCd"+e.EMP_SEQ+"' class='apntCd' />";
                    }
                }, {
                    title: "발령전",
                    columns: [
                        {
                            field: "DEPT_NAME",
                            title: "부서",
                            width: 105
                        }, {
                            field: "TEAM_NAME",
                            title: "팀",
                            width: 100
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
                            width: 100
                        },
                    ]
                }, {
                    title: "발령후",
                    columns: [
                        {
                            field: "DEPT_NAME",
                            title: "부서",
                            template : function (e){
                                return '<input type="hidden" id="bfDeptSeq" name="bfDeptSeq" class="bfDeptSeq" value="' + e.DEPT_SEQ + '">' +
                                    '<input type="hidden" id="bfDeptName" name="bfDeptName" class="bfDeptName" value="' + e.DEPT_NAME + '">' +
                                    '<input type="text" id="afDept'+e.EMP_SEQ+'" name="afDept" class="afDept">';
                            },
                            width: 105
                        }, {
                            field: "DEPT_TEAM_NAME",
                            title: "팀",
                            template : function (e){
                                return '<input type="hidden" id="bfTeamSeq" name="bfTeamSeq" class="bfTeamSeq" value="' + e.TEAM_SEQ + '">' +
                                    '<input type="hidden" id="bfTeamName" name="bfTeamName" class="bfTeamName" value="' + e.TEAM_NAME + '">' +
                                    '<input type="text" id="afTeam'+e.EMP_SEQ+'" name="afTeamSeq" class="afTeam">';
                            },
                            width: 100
                        }, {
                            field: "POSITION_NAME",
                            title: "직급/등급",
                            template : function (e){
                                return '<input type="hidden" id="bfPositionSeq" name="bfPositionSeq" class="bfPositionSeq" value="' + e.POSITION_SEQ + '">' +
                                    '<input type="hidden" id="bfPositionName" name="bfPositionName" class="bfPositionName" value="' + e.POSITION_NAME + '">' +
                                    '<input type="text" id="afPosition'+e.EMP_SEQ+'" name="afPosition" class="afPosition">';
                            },
                            width: 100
                        }, {
                            field: "DUTY_NAME",
                            title: "직책",
                            template : function (e){
                                return '<input type="hidden" id="bfDutySeq" name="bfDutySeq" class="bfDutySeq" value="' + e.DUTY_SEQ + '">' +
                                    '<input type="hidden" id="bfDutyName" name="bfDutyName" class="bfDutyName" value="' + e.DUTY_NAME + '">' +
                                    '<input type="text" id="afDuty'+e.EMP_SEQ+'" name="afDuty" class="afDuty">';
                            },
                            width: 100
                        }, {
                            field: "JOB_DETAIL",
                            title: "직무",
                            template : function (e){
                                return '<input type="hidden" id="bfJobDetail" name="bfJobDetail" class="bfJobDetail" value="' + e.JOB_DETAIL + '">' +
                                    '<input type="text" id="afJobDetail'+e.EMP_SEQ+'" name="afJobDetail" class="afJobDetail">';
                            },
                            width: 100
                        },
                    ]
                }, {
                    field: "ETC",
                    title: "비고",
                    template : function(e){
                        return "<input type='text' id='afEtc"+e.EMP_SEQ+"' name='afEtc' class='afEtc'>";
                    },
                    width: 120
                }
            ]
        }).data("kendoGrid");

        historyReqPop.fn_popGridSetting();
    },

    fn_popGridSetting : function() {
        $(".afJobDetail, .afEtc").kendoTextBox();

        var data = {

        }
        data.deptLevel = 1;
        var deptDsA = customKendo.fn_customAjax("/dept/getDeptAList", data);
        deptDsA.rs.unshift({"dept_name" : "선택", "dept_seq" : ""});
        $(".afDept").kendoDropDownList({
            dataSource : deptDsA.rs,
            dataValueField : "dept_seq",
            dataTextField : "dept_name",
            index : 0
        });

        var data = {}
        data.deptLevel = 2;

        var ds = customKendo.fn_customAjax("/dept/getDeptAList", data);
        ds.rs.unshift({"dept_name" : "선택", "dept_seq" : ""});
        $(".afTeam").kendoDropDownList({
            dataSource : ds.rs,
            dataValueField : "dept_seq",
            dataTextField : "dept_name",
            index : 0
        });

        $(".apntCd").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
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
            index: 0
        });

        $(".afPosition").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "선택하세요", value: ""},
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
            ],
            index: 0
        });

        $(".afDuty").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "선택하세요", value: ""},
                {text: "원장", value: "원장"},
                {text: "본부장", value: "본부장"},
                {text: "사업부장", value: "사업부장"},
                {text: "센터장", value: "센터장"},
                {text: "팀장", value: "팀장"}
            ],
            index: 0
        });

    },

    fn_saveApnt : function(){
        let arr = new Array();
        const grid = $("#popMainGrid").data("kendoGrid");
        $.each($('#popMainGrid .k-master-row'), function(i, v){
            const dataItem = grid.dataItem($(this).closest("tr"));
            let empSeq = dataItem.EMP_SEQ;
            let data = {
                empSeq            : empSeq,
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
                afDeptName        : $(v).find('#afDept'+empSeq).data("kendoDropDownList").text(),
                afTeamSeq         : $(v).find('#afTeam'+empSeq).data("kendoDropDownList").value(),
                afTeamName        : $(v).find('#afTeam'+empSeq).data("kendoDropDownList").text(),
                afPositionCode    : $(v).find('#afPosition'+empSeq).data("kendoDropDownList").value(),
                afPositionName    : $(v).find('#afPosition'+empSeq).data("kendoDropDownList").text(),
                afDutyCode        : $(v).find('#afDuty'+empSeq).data("kendoDropDownList").value(),
                afDutyName        : $(v).find('#afDuty'+empSeq).data("kendoDropDownList").text(),
                afJobDetail       : $(v).find('#afJobDetail'+empSeq).val(),

                afEtc             : $(v).find('#afEtc'+empSeq).val()
            }
            arr.push(data);
        });

        let empSeq = $("#empSeq").val();
        let numberName = $("#numberName").val();
        let relevantName = $("#relevantName").val();
        let historyDate = $("#historyDate").val().replace(/-/g, "");

        let data = {
            historyArr: JSON.stringify(arr),
            empSeq: empSeq,
            numberName: numberName,
            relevantName: relevantName,
            historyDate: historyDate
        };
        console.log("set history DATA");
        console.log(arr);


        $.ajax({
            url : "/inside/setHistoryInsert",
            data : data,
            type : "post",
            dataType : "json",
            async : false,
            success : function(result){
                console.log(result);
                alert("인사발령 저장이 완료되었습니다.");
                opener.gridReload();
                window.close();

            },
            error : function() {
                alert("데이터 저장 중 에러가 발생했습니다.");
                //window.close();
            }
        });
    },

    fn_delApnt : function(){
        var grid = $("#popMainGrid").data("kendoGrid");
        $("#popMainGrid").find("input[name='checkUser']:checked").each(function(){
            grid.removeRow($(this).closest('tr'));
        });

        historyReqPop.fn_popGridSetting();
    }
}
