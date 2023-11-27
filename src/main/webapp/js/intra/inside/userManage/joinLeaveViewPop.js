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

        var data = {};

        if (sectionTitle === "employees_joined" || sectionTitle === "employees_resigned") {
            data.joinYear = joinYear;
            data.sectionTitle = sectionTitle;

            console.log("data :",data);

            joinLeaveViewPop.mainGrid("/Inside/getJoinResignEmpList.do",data);

        }

    },

    mainGrid : function(url,params) {
        var mainGrid = $("#mainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
            sortable: true,
            scrollable: true,
            selectable: "row",
            pageable: {
                refresh: true,
                pageSizes: [10, 20, "ALL"],
                buttonCount: 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound: function(e) {
                var grid = e.sender;

                grid.tbody.children("tr").each(function(index) {
                    var row = $(this);
                    var dataItem = grid.dataItem(row);
                    row.find("td:first").text(index + 1);
                });
            },
            columns: [
                {
                    title: "순번",
                    template: "<span></span>"
                },{
                    field: "EMP_NAME_KR",
                    title: "성명",
                }, {
                    field: "DEPT_NAME1",
                    title: "부서(실)"
                }, {
                    field: "DEPT_TEAM_NAME",
                    title: "부서(팀)"
                }, {
                    field: "DUTY_NAME",
                    title: "직위",
                },{
                    field: "POSITION_NAME",
                    title: "직급",
                }, {
                    field: "OFFICE_TEL_NUM",
                    title: "전화번호"
                }, {
                    field: "MOBILE_TEL_NUM",
                    title: "핸드폰"
                }, {
                    field: "JOIN_DAY",
                    title: "입사일"
                }, {
                    field: "RESIGN_DAY",
                    title: "퇴사일"
                }
            ]
        }).data("kendoGrid");
    }


}