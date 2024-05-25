/**
 * 2023.06.04
 * 작성자 : 김지혜
 * 내용 : 유연근무 - 유연근무 현황
 */

var workPlanAdminView = {
    global : {
        now: new Date()
    },

    fn_defaultScript: function () {
        $("#apply_month").kendoDatePicker({
            value: new Date(),
            start: "year",
            depth: "year",
            format: "yyyy-MM",
            width: "150px"
        });

        $("#dept").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "미래전략기획본부", value: "미래전략기획본부"},
                {text: "R&BD사업본부", value: "R&BD사업본부"},
                {text: "기업성장지원본부", value: "기업성장지원본부"},
                {text: "우주항공사업부", value: "우주항공사업부"},
                {text: "드론사업부", value: "드론사업부"},
                {text: "스마트제조사업부", value: "스마트제조사업부"},
                {text: "경영지원실", value: "경영지원실"}
            ],
            index: 0
        });

        $("#team").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "제조혁신팀", value: "제조혁신팀"},
                {text: "신기술융합팀", value: "신기술융합팀"},
                {text: "우주개발팀", value: "우주개발팀"},
                {text: "항공개발팀", value: "항공개발팀"},
                {text: "사업지원팀", value: "사업지원팀"},
                {text: "인재개발팀", value: "인재개발팀"},
                {text: "일자리창업팀", value: "일자리창업팀"},
                {text: "복합소재뿌리기술센터", value: "복합소재뿌리기술센터"},
                {text: "지역산업육성팀", value: "지역산업육성팀"},
                {text: "경영지원팀", value: "경영지원팀"},
                {text: "미래전략기획팀", value: "미래전략기획팀"},
                {text: "J-밸리혁신팀", value: "J-밸리혁신팀"}
            ],
            index: 0
        });

        $("#name").kendoTextBox();

        $("#status").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "작성 중", value: "작성 중" },
                { text: "제출", value: "제출" },
                { text: "승인", value: "승인" },
                { text: "반려", value: "반려" }
            ],
            index: 0
        });

    },

    mainGrid: function () {
        var dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/workPlan/getWorkPlanUserList.do',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    data.apply_month = $("#apply_month").val().replace("-","");
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
            pageSize: 10,
        });

        $("#mainGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            height: 250,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount : 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound: workPlanAdminView.onDataBound,
            columns: [
                {
                    field: "",
                    title: "부서",
                    width: "25%",
                    field: "DEPT_NAME"

                }, {
                    field: "",
                    title: "팀",
                    width: "25%",
                    field: "DEPT_NAME"
                }, {
                    field: "",
                    title: "신청자",
                    width: "25%",
                    field: "EMP_NAME"
                }, {
                    field: "",
                    title: "직급",
                    width: "25%",
                    field: "DUTY_NAME"
                }]
        }).data("kendoGrid");
    },

    mainGrid2: function () {
        var dataSource2 = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/workPlan/getWorkPlanReqSubList.do',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    data.empSeq = $("#searchEmpSeq").val();
                    return data;
                }
            },
            schema : {
                data: function (data) {
                    return data.data;
                },
                total: function (data) {
                    return data.data.length;
                },
            },
            pageSize: 10,
        });

        $("#mainGrid2").kendoGrid({
            dataSource: dataSource2,
            sortable: true,
            scrollable: true,
            height: 250,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount : 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    field: "WORK_PLAN_TYPE",
                    title: "근무 유형",
                    width: "25%"
                }, {
                    field: "REQUEST_DATE",
                    title: "신청일자",
                    width: "25%"
                }, {
                    field: "APPLY_DATE",
                    title: "적용기간",
                    width: "25%"
                }, {
                    field: "",
                    title: "진행 상태",
                    width: "25%",
                    template : function(row){
                        if(row.apprStat == "N"){
                            return "대기";
                        }else if(row.apprStat == "Y"){
                            return "승인";
                        }else if(row.apprStat == "E"){
                            return "반려";
                        }else{
                            return "";
                        }
                    }
                }]
        }).data("kendoGrid");
    },

    onDataBound : function(){
        var grid = this;

        grid.tbody.find("tr").dblclick(function (e) {
            var dataItem = grid.dataItem($(this));
            console.log(dataItem);
            $("#searchEmpSeq").val(dataItem.EMP_SEQ);
            workPlanAdminView.mainGrid2();
        });
    }
}

