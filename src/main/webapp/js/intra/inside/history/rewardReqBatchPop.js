var now = new Date();

var rewardReqBatchPop = {

    init : function(){
        rewardReqBatchPop.dataSet();
        rewardReqBatchPop.mainGrid();
    },

    dataSet() {

        var data = {

        }
        data.deptLevel = 1;
        var deptDsA = customKendo.fn_customAjax("/dept/getDeptAList", data);

        customKendo.fn_dropDownList("dept", deptDsA.rs, "dept_name", "dept_seq");

        $("#dept").data("kendoDropDownList").bind("change", rewardReqBatchPop.fn_chngDeptComp)
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="rewardReqBatchPop.fn_selEmp()">' +
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
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" onclick="rewardReqBatchPop.fn_checkAll()" style="position : relative; top : 2px;" />',
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="rewardReqBatchPop.fn_saveApnt()">' +
                            '	<span class="k-button-text">저장</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="rewardReqBatchPop.fn_delApnt()">' +
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
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" onclick="rewardReqBatchPop.fn_checkAll()" style="position : relative; top : 2px;" />',
                    template : function (e){
                        return "<input type='checkbox' id='chk"+e.EMP_SEQ+"' name='checkUser' value='"+e.EMP_SEQ+"' style=\"position : relative; top : 2px;\" />"
                    },
                    width: 50,
                    attribute : {
                        style : "text-align:center",
                    }
                }, {
                    field: "ERP_EMP_SEQ",
                    title: "사번",
                    width: 70
                }, {
                    field: "EMP_NAME_KR",
                    title: "이름",
                    width: 70
                }, {
                    title: "포상구분",
                    width: 120,
                    template : function (e){
                        return "<input type='text' id='rewardTp' class='rewardTp' />";
                    }
                }, {
                    title: "포상일자",
                    template : function(){
                        return "<input type='text' id='rewardDay' name='rewardDay' class='rewardDay'>";
                    },
                    width: 120
                }, {
                    title: "공적사항",
                    template : function(){
                        return "<input type='text' id='rwdOfm' name='rwdOfm' class='rwdOfm'>";
                    },
                    width: 120
                }, {
                    title: "시행처",
                    template : function(){
                        return "<input type='text' id='rwdStComp' name='rwdStComp' class='rwdStComp'>";
                    },
                    width: 120
                }, {
                    title: "포상번호",
                    template : function(){
                        return "<input type='text' id='rwdSn' name='rwdSn' class='rwdSn'>";
                    },
                    width: 120
                }, {
                    title: "스캔파일",
                    template : function(){
                        return "<input type='file' id='rwdFile' name='rwdFile' class='rwdFile'>";
                    },
                    width: 120
                }, {
                    title: "비고",
                    template : function(){
                        return "<input type='text' id='rwdEtc' name='rwdEtc' class='rwdEtc'>";
                    },
                    width: 120
                }
            ]
        }).data("kendoGrid");

        rewardReqBatchPop.fn_popGridSetting();
    },

    fn_popGridSetting : function() {
        $(".rwdEtc, .rwdSn, .rwdStComp, .rwdOfm").kendoTextBox();

        $(".rewardTp").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "포상구분", value: ""},
                {text: "[내부표창] 공로상", value: "9"},
                {text: "[내부표창] 기타", value: "10"},
                {text: "[내부표창] 우수사원(개인)", value: "4"},
                {text: "[내부표창] 우수사원(단체)", value: "3"},
                {text: "[내부표창] 캠틱인(개인)", value: "2"},
                {text: "[내부표창] 캠틱인(단체)", value: "1"},
                {text: "[외부표창] 기타", value: "8"},
                {text: "[외부표창] 유관기관", value: "7"},
                {text: "[외부표창] 중앙정부", value: "5"},
                {text: "[외부표창] 지자체", value: "6"},
                {text: "[외부표창] 학교", value: "11"},
            ],
            index:0
        });

        $(".rewardDay").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date()
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

        rewardReqBatchPop.fn_popGridSetting();
    }
}
