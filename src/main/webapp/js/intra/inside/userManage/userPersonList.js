/**
 * 2023.05.02
 * 작성자 : 김은진
 * 내용 : 인사관리 - 직원조회목록
 */
var now = new Date();

var userPersonList = {
    global : {
        searchAjaxData : "",
    },

    init : function () {
        userPersonList.dataSet();
        userPersonList.gridReload();
    },

    dataSet() {
        var data = {

        }
        data.deptLevel = 1;
        var deptDsA = customKendo.fn_customAjax("/dept/getDeptAList", data);

        customKendo.fn_dropDownList("deptComp", deptDsA.rs, "dept_name", "dept_seq");

        $("#deptComp").data("kendoDropDownList").bind("change", userPersonList.fn_chngDeptComp)
        $("#deptComp").data("kendoDropDownList").select(0);
        $("#deptComp").data("kendoDropDownList").trigger("change");

        $("#userGender").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "전체", value: "0"},
                {text: "남", value: "남"},
                {text: "여", value: "여"}
            ],
            index: 0
        });

        $("#userKind").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "성명", value: "EMP_NAME_KR"},
                {text: "직급", value: "POSITION_NAME"},
                {text: "등급", value: "등급"},
                {text: "직책", value: "직책"},
                {text: "메일주소", value: "EMAIL_ADDR"},
                {text: "전화번호", value: "OFFICE_TEL_NUM"},
                {text: "핸드폰", value: "MOBILE_TEL_NUM"}
            ],
            index: 0
        });


        $("#kindContent").kendoTextBox();

        $("#start_date").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date()
        });

        $("#workStatusCode").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "입/퇴사현황", value: "" },
                { text: "입사현황", value: "Y" },
                { text: "퇴사현황", value: "N" }
            ],
            index: 0
        });

        $("#start_date_detail").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date(now.setMonth(now.getMonth() - 1))
        });

        $("#end_date_detail").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date()
        });

        $("#detailSearch2").kendoDropDownTree({
            placeholder: "선택하세요",
            checkboxes: true,
            checkAll: true,
            autoClose: false,
            dataSource: [
                {name: "정규직원", value: "정규직원"},
                {name: "계약직원", value: "계약직원"},
                {name: "인턴사원", value: "인턴사원"},
                {name: "경비/환경", value: "경비/환경"},
                {name: "단기직원", value: "단기직원"},
                {name: "위촉직원", value: "위촉직원"},
                {name: "연수생/학생연구원", value: "연수생/학생연구원"}
            ],
            dataTextField: "name",
            dataValueField: "value"
        });

        $("#detailSearch3").kendoDropDownTree({
            placeholder: "선택하세요",
            checkboxes: true,
            checkAll: true,
            autoClose: false,
            dataSource: [
                {name: "남", value: "남"},
                {name: "여", value: "여"}
            ],
            dataTextField: "name",
            dataValueField: "value"
        });

        $("#detailSearch4").kendoDropDownTree({
            placeholder: "선택하세요",
            checkboxes: true,
            checkAll: true,
            autoClose: false,
            dataSource: [
                {name: "미래전략기획본부", value: "미래전략기획본부"},
                {name: "R&BD사업본부", value: "R&BD사업본부"},
                {name: "기업성장지원본부", value: "기업성장지원본부"},
                {name: "우주항공사업부", value: "우주항공사업부"},
                {name: "드론사업부", value: "드론사업부"},
                {name: "스마트제조사업부", value: "스마트제조사업부"},
                {name: "경영지원실", value: "경영지원실"}
            ],
            dataTextField: "name",
            dataValueField: "value"
        });

        $("#detailSearch5").kendoDropDownTree({
            placeholder: "선택하세요",
            checkboxes: true,
            checkAll: true,
            autoClose: false,
            dataSource: [
                {name: "제조혁신팀", value: "제조혁신팀"},
                {name: "신기술융합팀", value: "신기술융합팀"},
                {name: "우주개발팀", value: "우주개발팀"},
                {name: "항공개발팀", value: "항공개발팀"},
                {name: "사업지원팀", value: "사업지원팀"},
                {name: "인재개발팀", value: "인재개발팀"},
                {name: "일자리창업팀", value: "일자리창업팀"},
                {name: "복합소재뿌리기술센터", value: "복합소재뿌리기술센터"},
                {name: "지역산업육성팀", value: "지역산업육성팀"},
                {name: "경영지원팀", value: "경영지원팀"},
                {name: "미래전략기획팀", value: "미래전략기획팀"},
                {name: "J-밸리혁신팀", value: "J-밸리혁신팀"},
                {name: "전북 조선업 도약센터", value: "전북 조선업 도약센터"},
                {name: "익산고용안정일자리센터", value: "익산고용안정일자리센터"}
            ],
            dataTextField: "name",
            dataValueField: "value"
        });

        $("#detailSearch6").kendoDropDownTree({
            placeholder: "선택하세요",
            checkboxes: true,
            checkAll: true,
            autoClose: false,
            dataSource: [
                {name: "원장", value: "원장"},
                {name: "본부장", value: "본부장"},
                {name: "사업부장", value: "사업부장"},
                {name: "팀장", value: "팀장"},
                {name: "책임매니저", value: "책임매니저"},
                {name: "책임연구원", value: "책임연구원"},
                {name: "책임행정원", value: "책임행정원"},
                {name: "주임매니저", value: "주임매니저"},
                {name: "주임연구원", value: "주임연구원"},
                {name: "주임행정원", value: "주임행정원"},
                {name: "선임매니저", value: "선임매니저"},
                {name: "선임연구원", value: "선임연구원"}
            ],
            dataTextField: "name",
            dataValueField: "value"
        });

        $("#detailSearch7").kendoDropDownTree({
            placeholder: "선택하세요",
            checkboxes: true,
            checkAll: true,
            autoClose: false,
            dataSource: [
                {name: "15세~25세", value: ""},
                {name: "26세~30세", value: ""},
                {name: "31세~35세", value: ""},
                {name: "36세~40세", value: ""},
                {name: "41세~45세", value: ""},
                {name: "46세~50세", value: ""},
                {name: "51세~55세", value: ""},
                {name: "56세~60세", value: ""},
                {name: "61세~", value: ""}
            ],
            dataTextField: "name",
            dataValueField: "value"
        });

        $("#detailSearch8").kendoDropDownTree({
            placeholder: "선택하세요",
            checkboxes: true,
            checkAll: true,
            autoClose: false,
            dataSource: [
                {name: "1년 미만", value: 0},
                {name: "1년", value: 1},
                {name: "2년", value: 2},
                {name: "3년", value: 3},
                {name: "4년", value: 4},
                {name: "5년", value: 5},
                {name: "6년", value: 6},
                {name: "7년", value: 7},
                {name: "8년", value: 8},
                {name: "9년", value: 9},
                {name: "10년", value: 10},
                {name: "11년", value: 11},
                {name: "12년", value: 12},
                {name: "13년", value: 13},
                {name: "14년", value: 14},
                {name: "15년", value: 15},
                {name: "16년", value: 16},
                {name: "17년", value: 17},
                {name: "18년", value: 18},
                {name: "19년", value: 19},
                {name: "20년", value: 20},
                {name: "21년 이상", value: 21}
            ],
            dataTextField: "name",
            dataValueField: "value"
        });

        $("#detailSearch9").kendoDropDownTree({
            placeholder: "선택하세요",
            checkboxes: true,
            checkAll: true,
            autoClose: false,
            dataSource: [
                {name: "고졸", value: "고졸"},
                {name: "전문학사", value: "전문학사"},
                {name: "학사", value: "학사"},
                {name: "석사수료", value: "석사수료"},
                {name: "석사", value: "석사"},
                {name: "박사수료", value: "박사수료"},
                {name: "박사", value: "박사"}
            ],
            dataTextField: "name",
            dataValueField: "value"
        });

        $("#kindContent").on("keyup", function(key){
            if(key.keyCode == 13){
                userPersonList.gridReload();
            }
        });

        $("#dsA").click(function (){
            if(this.checked){
                if(!$("#dsB").is(":checked")){
                    $("#dsB").click();
                }
                $("#dsB").prop("checked", true);
            } else {
                if($("#dsB").is(":checked")){
                    $("#dsB").click();
                }
                $("#dsB").prop("checked", false);
            }
        });

        $("#dsB").click(function (){
            if(this.checked){
                if(!$("#dsA").is(":checked")){
                    $("#dsA").click();
                }
                $("#dsA").prop("checked", true);
                $("#subDiv").css("display", "");
                $("#subDiv > input").prop("checked", true);
            }else{
                if($("#dsA").is(":checked")){
                    $("#dsA").click();
                }
                $("#dsA").prop("checked", false);
                $("#subDiv").css("display", "none");
                $("#subDiv > input").prop("checked", false);
            }
        });

        $("input[name='subCk']").click(function (){
            var flag = true;
            $("input[name='subCk']").each(function(){
                if (!this.checked) flag = false;
            });
            if(!flag){
                $("#dsB").prop("checked", false);
            } else {
                $("#dsB").prop("checked", true);
            }
        })

        $("#dsF").click(function () {
            if(this.checked){
                $("#subDiv2").css("display", "");
                $("#subDiv2 > input").prop("checked", true);
            }else{
                $("#subDiv2").css("display", "none");
                $("#subDiv2 > input").prop("checked", false);
            }
        });

        $("input[name='subCk2']").click(function (){
            var flag = true;
            $("input[name='subCk2']").each(function(){
                if (!this.checked) flag = false;
            });
            if(!flag){
                $("#dsF").prop("checked", false);
            } else {
                $("#dsF").prop("checked", true);
            }
        })
    },

    fn_chngDeptComp : function (){
        var data = {}
        data.deptLevel = 2;
        data.parentDeptSeq = this.value();

        var ds = customKendo.fn_customAjax("/dept/getDeptAList", data);
        customKendo.fn_dropDownList("deptTeam", ds.rs, "dept_name", "dept_seq")
    },

    mainGrid : function(url,params) {
        var mainGrid = $("#mainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 393,
            pageable: {
                refresh: true,
                pageSizes: [10, 20, 30, 50, 100],
                buttonCount: 5
            },
            toolbar: [
                {
                    name: 'button',
                    template: function (e) {
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="userPersonList.userReqPop();">' +
                            '	<span class="k-button-text">직원 추가</span>' +
                            '</button>';
                    }
                }, {
                    name: 'button',
                    template: function (e) {
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="">' +
                            '	<span class="k-button-text">SMS 발송</span>' +
                            '</button>';
                    }
                }, {
                    name: 'excel',
                    text: '엑셀다운로드'
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll"  onclick="userPersonList.fn_checkAll();" style="position : relative; top : 2px;"/>',
                    template: "<input type='checkbox' id='' name='checkUser' value=''/>",
                    width: 50
                }, {
                    field: "ERP_EMP_SEQ",
                    title: "사번"
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
                    template : function (e){
                        if(e.DUTY_NAME != null && e.DUTY_NAME != ""){
                            return e.DUTY_NAME
                        } else {
                            return e.POSITION_NAME
                        }
                    }
                }, {
                    field: "OFFICE_TEL_NUM",
                    title: "전화번호"
                }, {
                    field: "MOBILE_TEL_NUM",
                    title: "핸드폰"
                }, {
                    field: "JOIN_DAY2",
                    title: "입사일"
                }
            ]
        }).data("kendoGrid");
    },
    mainGrid2 : function(url,params) {
        $("#mainGrid2").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 489,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 30, 50, 100 ],
                buttonCount : 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    field: "",
                    title: "번호"
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
                    title: "직위"
                }, {
                    field: "",
                    title: "성별"
                }, {
                    field: "",
                    title: "유형"
                }, {
                    field: "",
                    title: "나이"
                }, {
                    field: "",
                    title: "근속년수"
                }, {
                    field: "",
                    title: "재직여부"
                }, {
                    field: "JOIN_DAY2",
                    title: "입사일"
                }, {
                    field: "RESIGN_DAY2",
                    title: "퇴사일"
                }
            ]
        }).data("kendoGrid");
    },

    userReqPop : function() {
        var url = "/Inside/pop/userReqPop.do";
        var name = "recruitReqPop";
        var option = "width=1200, height=900, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    },

    gridReload : function() {
        userPersonList.global.searchAjaxData = {
            userKind : $('#userKind').val(),
            empNameKr : $("#kindContent").val(),
            startDate : $("#start_date").val(),
            kindContent : $("#kindContent").val(),
            userGender : $("#userGender").val(),
            deptComp : $("#deptComp").val(),
            deptTeam : $("#deptTeam").val()
        }
        var dtArr = "";
        var dtSubArr = "";
        $(".detailSearch:checked").each(function(){
            dtArr += this.value + ",";
        })
        $(".detailSubSearch:checked").each(function(){
            dtSubArr += this.value + ",";
        })

        userPersonList.global.searchAjaxData.dtArr = dtArr;
        userPersonList.global.searchAjaxData.dtSubArr = dtSubArr;

        console.log(userPersonList.global.searchAjaxData);
        userPersonList.mainGrid('/userManage/getEmpInfoList',userPersonList.global.searchAjaxData);
    },

    gridReloadDetail : function() {
        var testDropDownTree1 = $("#detailSearch2").data("kendoDropDownTree");
        var testDropDownTree2 = $("#detailSearch3").data("kendoDropDownTree");
        var testDropDownTree3 = $("#detailSearch4").data("kendoDropDownTree");
        var testDropDownTree4 = $("#detailSearch5").data("kendoDropDownTree");
        var testDropDownTree5 = $("#detailSearch6").data("kendoDropDownTree");
        var testDropDownTree6 = $("#detailSearch7").data("kendoDropDownTree");
        var testDropDownTree7 = $("#detailSearch8").data("kendoDropDownTree");
        var testDropDownTree8 = $("#detailSearch9").data("kendoDropDownTree");

        userPersonList.global.searchAjaxData = {
            IN_OUT_CHECK : $('#workStatusCode').val(), // 입퇴사 현황
            START_DATE : $("#start_date_detail").val(), // 조회 기간 시작일
            END_DATE : $("#end_date_detail").val(), // 조회 기간 종료일
            searchDetail1 : JSON.stringify(testDropDownTree1.value()),
            searchDetail2 : JSON.stringify(testDropDownTree2.value()),
            searchDetail3 : JSON.stringify(testDropDownTree3.value()),
            searchDetail4 : JSON.stringify(testDropDownTree4.value()),
            searchDetail5 : JSON.stringify(testDropDownTree5.value()),
            searchDetail6 : JSON.stringify(testDropDownTree6.value()),
            searchDetail7 : JSON.stringify(testDropDownTree7.value()),
            searchDetail8 : JSON.stringify(testDropDownTree8.value()),
        }


        console.log(JSON.stringify(userPersonList.global.searchAjaxData));
        userPersonList.mainGrid2('/userManage/getEmpInfoDetailList',userPersonList.global.searchAjaxData);
    },
    /*$.ajax({
        url: "<c:url value='/edu/setEduSurvey'/>",
        data: data,
        dataType : "json",
        type: "POST",
        success: function () {

        }
    })*/

    fn_checkAll: function(){
        if($("#checkAll").is(":checked")) {
            $("input[name='checkUser']").prop("checked", true);
        }else{
            $("input[name='checkUser']").prop("checked", false);
        }
    }
}
