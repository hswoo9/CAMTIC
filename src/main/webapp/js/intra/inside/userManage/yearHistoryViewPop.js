var yearHistoryViewPop = {
    globqal : {
        params         : "",
        searchAjaxData : ""
    },

    fn_defaultScript : function (){
        var hisYear = $("#hisYear").val();
        var apntName = $("#apntName").val();
        var encodedArr = $("#encodedArr").val();
        var arr = decodeURIComponent(encodedArr);

        console.log("Js.His Year: " + hisYear);
        console.log("js.apntName: " + apntName);
        console.log("Js.arr: ",arr);


        var data = {};


            data.hisYear = hisYear;
            data.apntName = apntName;
            data.arr = arr;

            console.log("data :",data);

        yearHistoryViewPop.mainGrid("/Inside/getApntListByYear.do",data);



    },

    mainGrid : function(url,params) {
        var mainGrid = $("#mainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
            sortable: true,
            scrollable: true,
            selectable: "row",
            pageable: {
                refresh: true,
                pageSizes : [ 10, 20, 50, "ALL" ],
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
                    template: "<span></span>",
                    width: 60
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
                },
                {
                    field: "GENDER_CODE",
                    title: "성별",
                    template: function (e){
                    if (e.GENDER_CODE == 'M'){
                        return '남자';
                    }else{
                        return '여자';
                    }
                  }
                },
                {
                    field: "",
                    title: "유형",
                    template: function (e){
                        if(e.DIVISION == 0){
                            return '정규직원';
                        }else if(e.DIVISION == 4 && e.DIVISION_SUB == 1){
                            return '계약직원';
                        }else if(e.DIVISION == 4 && e.DIVISION_SUB == 2){
                            return '인턴사원';
                        }else if(e.DIVISION == 4 && e.DIVISION_SUB == 3){
                            return '시설/환경';
                        }else if(e.DIVISION == 3){
                            return '단기직원';
                        }else if(e.DIVISION == 1 && e.DIVISION_SUB == 6){
                            return '위촉직원';
                        }else if(e.DIVISION ==2){
                            return '연수생/학생연구원';
                        }else{
                            return "-";
                        }
                    }
                },
                {
                    field: "",
                    title: "나이",
                    template : function(e){
                        if(e.RES_REGIS_NUM != null && e.RES_REGIS_NUM != "") {
                            var age = yearHistoryViewPop.fn_setCalcAge(e.RES_REGIS_NUM);
                            return age;
                        } else {
                            return "-";
                        }
                    }
                }, {
                    field: "",
                    title: "근속년수",
                    template :function(e){
                        if(e.hire != null && e.hire != ""){
                            return e.hire + "년 " + e.hire_mon + "개월";
                        } else {
                            return "-";
                        }

                    }
                }, {
                    field: "JOIN_DAY2",
                    title: "입사일",
                }, {
                    field: "RESIGN_DAY",
                    title: "퇴사일"
                }
            ]
        }).data("kendoGrid");
    },

    fn_setCalcAge: function(jumin){
        // 전달받은 주민번호 데이터에 '-' 확인 후 있으면 제거
        if(jumin.includes('-')){
            jumin = jumin.replace('-','');
        }

        let today = new Date();	// 현재 날짜 및 시간

        let juminFront = jumin.substr(0,6); // 주민번호앞자리
        let juminBackFirstVal = jumin.substr(6,1); //주민번호뒷자리 첫 문자열(2000년도 이전생인지 확인)

        let age = 0;
        let birthDate = null;
        let juminYear = null;
        let juminMonth = jumin.substr(2,2);//10
        let juminDate = jumin.substr(4,2);//03

        let monthCheck = 0;

        if(juminBackFirstVal == 1 || juminBackFirstVal == 2){
            // 2000년생 이전일 경우
            juminYear = "19" + jumin.substr(0,2);//93~~

            // 문법상 Month(월)은 0부터 시작하기 때문에 -1 처리해야 됨.
            birthDate = new Date(juminYear*1, juminMonth-1, juminDate*1);

            // 현재 연도에서 - 태어난 연도
            age = today.getFullYear() - birthDate.getFullYear();

            // 현재 월에서 - 태어난 월
            monthCheck = today.getMonth() - birthDate.getMonth();

            // 생일 월이 현재 월을 지나지 않았을 경우 만 나이기 때문에 -1
            if(monthCheck < 0 || (monthCheck === 0 && today.getDate() < birthDate.getDate())){
                age--;
            }
        }else{
            // 2000년생 이후
            juminYear = "20" + jumin.substr(0,2);//01~~

            birthDate = new Date(juminYear*1, juminMonth-1, juminDate*1);

            age = today.getFullYear() - birthDate.getFullYear();

            monthCheck = today.getMonth() - birthDate.getMonth();

            if(monthCheck < 0 || (monthCheck === 0 && today.getDate() < birthDate.getDate())){
                age--;
            }
        }

        return age;
    }


}