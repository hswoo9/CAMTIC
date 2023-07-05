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

        $("#team").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "팀선택", value: "" },
                { text: "미래전략기획팀", value: "1" },
                { text: "J-밸리혁신팀", value: "2" },
                { text: "제조혁신팀", value: "3" },
                { text: "신기술융합팀", value: "4" },
                { text: "일자리창업팀", value: "5" },
                { text: "복합소재뿌리기술센터", value: "6" },
                { text: "지역산업육성팀", value: "7" },
                { text: "우주개발팀", value: "8" },
                { text: "항공개발팀", value: "9" },
                { text: "경영지원팀", value: "10" },
                { text: "사업지원팀", value: "11" }
            ],
            index: 0
        });

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
            empName : $("#searchVal").val()
        }


        var rs = customKendo.fn_customAjax("/user/getEmpList", data);

        $("#mainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2("/user/getEmpList", data),
            sortable: true,
            scrollable: true,
            selectable: "row",
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="">' +
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
    }
}
