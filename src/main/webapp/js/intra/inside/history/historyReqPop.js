var now = new Date();

var historyReqPop = {

    init : function(){
        historyReqPop.dataSet();
        historyReqPop.mainGrid();
    },

    dataSet() {


        var data = {

        }
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
            deptSeq : $("#dept").val(),
            deptTeamSeq : $("#team").val(),
            deptTeamName : $("#team").data("kendoDropDownList").text(),
            empName : $("#searchVal").val()
        }


        var rs = customKendo.fn_customAjax("/user/getEmpList", data);

        $("#mainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2("/user/getEmpList", data),
            scrollable: true,
            height: 481,
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
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" onclick="historyReqPop.fn_checkAll()" style="position : relative; top : 2px;" />',
                    template : function (e){
                        return "<input type='checkbox' id='chk"+e.EMP_SEQ+"' name='checkUser' value='"+e.EMP_SEQ+"' style=\"position : relative; top : 2px;\" />"
                    },
                    width: 50,
                    attribute : {
                        style : "text-align:center",
                    }
                }, {
                    field: "DEPT_NAME",
                    title: "부서"
                }, {
                    field: "DEPT_SEQ",
                    title: "팀",
                    width: 70,
                }, {
                    field: "EMP_NAME_KR",
                    title: "성명",
                    width: 70,
                }
            ]
        }).data("kendoGrid");
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
                    width: 50,
                    attribute : {
                        style : "text-align:center",
                    }
                }, {
                    field: "EMP_NAME_KR",
                    title: "성명",
                    width: 70
                }, {
                    title: "발령기준",
                    width: 120,
                    template : function (e){
                        return "<input type='text' id='apntCd' class='apntCd' />";
                    }
                }, {
                    title: "발령전",
                    columns: [
                        {
                            field: "DEPT_NAME",
                            title: "부서",
                            width: 120
                        }, {
                            field: "DEPT_TEAM_NAME",
                            title: "팀",
                            width: 120
                        }, {
                            field: "POSITION_NAME",
                            title: "직급/등급",
                            width: 120
                        }, {
                            field: "DUTY_NAME",
                            title: "직책",
                            width: 120
                        }, {
                            field: "JOB_DETAIL",
                            title: "직무",
                            width: 120
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
                                    '<input type="text" id="afDept" name="afDept" class="afDept">';
                            },
                            width: 120
                        }, {
                            field: "DEPT_TEAM_NAME",
                            title: "팀",
                            template : function (e){
                                return '<input type="hidden" id="bfTeamSeq" name="bfTeamSeq" class="bfTeamSeq" value="' + e.TEAM_SEQ + '">' +
                                    '<input type="hidden" id="bfTeamName" name="bfTeamName" class="bfTeamName" value="' + e.TEAM_NAME + '">' +
                                    '<input type="text" id="afTeam" name="afTeamSeq" class="afTeam">';
                            },
                            width: 120
                        }, {
                            field: "POSITION_NAME",
                            title: "직급/등급",
                            template : function (e){
                                return '<input type="hidden" id="bfPositionSeq" name="bfPositionSeq" class="bfPositionSeq" value="' + e.POSITION_SEQ + '">' +
                                    '<input type="hidden" id="bfPositionName" name="bfPositionName" class="bfPositionName" value="' + e.POSITION_NAME + '">' +
                                    '<input type="text" id="afPosition" name="afPosition" class="afPosition">';
                            },
                            width: 120
                        }, {
                            field: "DUTY_NAME",
                            title: "직책",
                            template : function (e){
                                return '<input type="hidden" id="bfDutySeq" name="bfDutySeq" class="bfDutySeq" value="' + e.DUTY_SEQ + '">' +
                                    '<input type="hidden" id="bfDutyName" name="bfDutyName" class="bfDutyName" value="' + e.DUTY_NAME + '">' +
                                    '<input type="text" id="afDuty" name="afDuty" class="afDuty">';
                            },
                            width: 120
                        }, {
                            field: "JOB_DETAIL",
                            title: "직무",
                            template : function (e){
                                return '<input type="hidden" id="bfJobDetail" name="bfJobDetail" class="bfJobDetail" value="' + e.JOB_DETAIL + '">' +
                                    '<input type="text" id="afJobDetail" name="afJobDetail" class="afJobDetail">';
                            },
                            width: 120
                        },
                    ]
                }, {
                    field: "ETC",
                    title: "비고",
                    template : function(){
                        return "<input type='text' id='afEtc' name='afEtc' class='afEtc'>";
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
        alert("저장");
    },

    fn_delApnt : function(){
        var grid = $("#popMainGrid").data("kendoGrid");
        $("#popMainGrid").find("input[name='checkUser']:checked").each(function(){
            grid.removeRow($(this).closest('tr'));
        });

        historyReqPop.fn_popGridSetting();
    }
}
