var joinLeaveViewPop = {
    globqal : {
        params         : "",
        searchAjaxData : "",
    },

    fn_defaultScript : function (){
        var joinYear = $("#joinYear").val();
        var sectionTitle = $("#sectionTitle").val();

        console.log("Js.Join Year: " + joinYear);
        console.log("Js.Section Title: " + sectionTitle);

        var data = {}; // 수정된 부분

        if (sectionTitle === "employees_joined" || sectionTitle === "employees_resigned") {
            data.joinYear = joinYear; // 수정된 부분
            data.sectionTitle = sectionTitle; // 수정된 부분


            joinLeaveViewPop.mainGrid("/Inside/getJoinResignEmpList.do", data);
        }

    },


    mainGrid : function (url,params) {
    var mainGrid = $("#mainGrid").kendoGrid({
        datasource: customKendo.fn_gridDataSource2(url, params),
        sortable: true,
        scorollable: true,
        selectable: "row",
        pageable: {
            refresh: true,
            pageSizes: [10, 20, "ALL"],
            buttonCount: 5
        },
        noRecords: {
            template: "데이터가 존재하지 않습니다."
        },
        column: [
            {
                field: "",
                title: "순번"
            }, {
                field: "EMP_NAME_KR",
                title: "성명"
            }, {
                field: "DEPT_NAME",
                title: "부서(실)"
            }, {
                field: "DEPT_TEAM_NAME",
                title: "부서(팀)"
            }, {
                field: "DUTY_NAME",
                title: "직위",
                template: function (e) {
                    if (e.DUTY_NAME != "" || e.DUTY_NAME != null) {
                        return e.POSITION_NAME;
                    } else {
                        return e.DUTY_NAME;
                    }
                }
            }, {
                field: "POSITION_NAME",
                title: "직급"
            }, {
                title: "성별",
                template: function (e) {
                    if (e.GENDER_CODE == "M") {
                        return "남";
                    } else if (e.GENDER_CODE == "F") {
                        return "여";
                    } else {
                        return "-";
                    }
                }
            }, {
                title: "유형",
                template: function (e) {
                    if (e.DIVISION == 0) {
                        return "정규직원";
                    } else if (e.DIVISION == 4) {
                        return "계약직원";
                    } else if (e.DIVISION == 3) {
                        return "단기직원";
                    } else if (e.DIVISION == 1) {
                        return "위촉직원";
                    } else if (e.DIVISION == 2) {
                        return "연수생/학생연구원";
                    } else if (e.DIVISION == 10) {
                        return "기타";
                    } else if (e.DIVISION == 9) {
                        return "퇴사직원";
                    } else {
                        return "-";
                    }
                }
            }, {
                field: "",
                title: "나이",
                template: function (e) {
                    if (e.RES_REGIS_NUM != null && e.RES_REGIS_NUM != "") {
                        var age = userPersonList2.fn_setCalcAge(e.RES_REGIS_NUM);
                        return age;
                    } else {
                        return "-";
                    }
                }
            }, {
                field: "",
                title: "근속년수",
                template: function (e) {
                    if (e.hire != null && e.hire != "") {
                        return e.hire + "년 " + e.hire_mon + "개월";
                    } else {
                        return "-";
                    }

                }
            }, {
                field: "JOIN_DAY2",
                title: "입사일"
            }, {
                field: "RESIGN_DAY2",
                title: "퇴사일"
            }
        ]
    }).data("kendoGrid");

    }
}