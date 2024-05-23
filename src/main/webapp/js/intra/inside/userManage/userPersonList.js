/**
 * 2023.05.02
 * 작성자 : 김은진
 * 내용 : 인사관리 - 직원조회목록
 */

// <button type="button" className="k-button k-button-md k-button-solid k-button-solid-base" onClick="detailSearchShow($('#detailSearchDiv').css('display'))" style="float:right;bottom: 5px;">상세검색</button>

var now = new Date();

var userPersonList = {
    global : {
        searchAjaxData : "",
    },

    init : function () {
        userPersonList.dataSet();
        userPersonList.gridReload();

        $(".detailSearch").change(function(){

            if($(this).attr("division") != "9999"){
                $("#dsJ").prop("checked", false);
            }

            userPersonList.gridReload();
        })
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
                {text: "전체", value: ""},
                {text: "남", value: "M"},
                {text: "여", value: "F"}
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
            value : new Date()
        });

        $("#detailSearch2").kendoDropDownTree({
            placeholder: "선택하세요",
            checkboxes: true,
            checkAll: true,
            autoClose: false,
            dataSource: [
                {name: "정규직원", value: "0"},
                {name: "계약직원", value: "4"},
                {name: "단기직원", value: "3"},
                {name: "위촉직원", value: "1"},
                {name: "연수생/학생연구원", value: "2"},
                {name: "기타", value: "10"},
                {name: "퇴사직원", value: "9"}
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
                {name: "남", value: "M"},
                {name: "여", value: "F"}
            ],
            dataTextField: "name",
            dataValueField: "value"
        });

        var ds4Data = {
            deptLevel : 1
        }
        var ds4 = customKendo.fn_customAjax("/dept/getDeptAList", ds4Data);

        $("#detailSearch4").kendoDropDownTree({
            placeholder: "선택하세요",
            checkboxes: true,
            checkAll: true,
            autoClose: false,
            dataSource: ds4.rs,
            dataTextField: "dept_name",
            dataValueField: "dept_seq"
        });

        var ds5Data = {
            deptLevel : 2
        }
        var ds5 = customKendo.fn_customAjax("/dept/getDeptAList", ds5Data);

        console.log(ds5);

        $("#detailSearch5").kendoDropDownTree({
            placeholder: "선택하세요",
            checkboxes: true,
            checkAll: true,
            autoClose: false,
            dataSource: ds5.rs,
            dataTextField: "dept_name",
            dataValueField: "dept_seq"
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
                {name: "15세~25세", value: "15,25"},
                {name: "26세~30세", value: "26,30"},
                {name: "31세~35세", value: "31,35"},
                {name: "36세~40세", value: "36,40"},
                {name: "41세~45세", value: "41,45"},
                {name: "46세~50세", value: "46,50"},
                {name: "51세~55세", value: "51,55"},
                {name: "56세~60세", value: "56,60"},
                {name: "61세~", value: "61"}
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
            height: 508,
            pageable: {
                refresh: true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount: 5
            },
            toolbar: [
                {
                    name: 'button',
                    template: function (e) {
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="userPersonList.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                },
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="userPersonList.sendSmsPop()">' +
                            '	<span class="k-button-text">SMS 발송</span>' +
                            '</button>';
                    }
                }, {
                    name: 'excel',
                    template: function (e) {

                        return '<button type="button" class="k-grid-excel k-button k-button-md k-button-solid k-button-solid-base" disabled>' +
                            '	<span class="k-button-text">엑셀다운로드</span>' +
                            '</button>';
                        /*name: 'excel',
                        text: '엑셀다운로드'*/
                    }
                },
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll"  onclick="userPersonList.fn_checkAll();" style="position : relative; top : 2px;"/>',
                    template: "<input type='checkbox' name='checkUser' value='#=EMP_SEQ#'/>",
                    width: 50
                }, {
                    title: "번호",
                    template: "#= --record #",
                    width: 50
                }, {
                    field: "EMP_NAME_KR",
                    title: "성명",
                    template : function (e){
                        if(e.EMP_NAME_KR == null || +e.EMP_NAME_KR == ""){
                            return "";
                        }else {
                            if(e.DIVISION == '4' && e.DIVISION_SUB == '3'){ /*경비/환경*/
                                return "<a href='#' onclick='userPersonList.userViewContractPop("+e.EMP_SEQ+")' style='color: rgb(0, 51, 255);'>"+e.EMP_NAME_KR+"</a>";
                            }else if(e.DIVISION == '3' || e.DIVISION == '1' || e.DIVISION == '10'){ /*단기직원, 위촉직원, 기타*/
                                return "<a href='#' onclick='userPersonList.userViewContractPop("+e.EMP_SEQ+")' style='color: rgb(0, 51, 255);'>"+e.EMP_NAME_KR+"</a>";
                            }else if(e.DIVISION == '3' || e.DIVISION == '2'){ /*연수생/학생연구원*/
                                return "<a href='#' onclick='userPersonList.userViewTraineePop("+e.EMP_SEQ+")' style='color: rgb(0, 51, 255);'>"+e.EMP_NAME_KR+"</a>";
                            }  else{
                                return "<a href='#' onclick='userPersonList.userViewPop("+e.EMP_SEQ+")' style='color: rgb(0, 51, 255);'>"+e.EMP_NAME_KR+"</a>";
                            }
                        }
                    },
                    width : 100
                }, {
                    title: "인사기록카드",
                    template : function(e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="userPersonList.userPersonnelRecord(' + e.EMP_SEQ + ')">' +
                            '	<span class="k-button-text">인사기록카드<span>' +
                            '</button>';
                    },
                    width : 140
                }, {
                    field: "DEPT_NAME1",
                    title: "부서(실)"
                }, {
                    field: "DEPT_TEAM_NAME",
                    title: "부서(팀)"
                }, {
                    title: "직위",
                    template: function(row){
                        return fn_getSpot(row.DUTY_NAME, row.POSITION_NAME);
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
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },

    mainGridSub : function(url,params) {
        var mainGridSub = $("#mainGridSub").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 508,
            pageable: {
                refresh: true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount: 5
            },
            toolbar: [
                {
                    name: 'button',
                    template: function (e) {
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="userPersonList.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                },
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="userPersonList.sendSmsPop()">' +
                            '	<span class="k-button-text">SMS 발송</span>' +
                            '</button>';
                    }
                }, {
                    name: 'excel',
                    template: function (e) {

                        return '<button type="button" class="k-grid-excel k-button k-button-md k-button-solid k-button-solid-base" disabled>' +
                            '	<span class="k-button-text">엑셀다운로드</span>' +
                            '</button>';
                        /*name: 'excel',
                        text: '엑셀다운로드'*/
                    }
                },
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll"  onclick="userPersonList.fn_checkAll();" style="position : relative; top : 2px;"/>',
                    template: "<input type='checkbox' name='checkUser' value='#=EMP_SEQ#'/>",
                    width: 50
                }, {
                    title: "번호",
                    template: "#= --record #",
                    width: 50
                }, {
                    field: "EMP_NAME_KR",
                    title: "성명",
                    template : function (e){
                        if(e.EMP_NAME_KR == null || +e.EMP_NAME_KR == ""){
                            return "";
                        }else {
                            if(e.DIVISION == '4' && e.DIVISION_SUB == '3'){ /*경비/환경*/
                                return "<a href='#' onclick='userPersonList.userViewContractPop("+e.EMP_SEQ+")' style='color: rgb(0, 51, 255);'>"+e.EMP_NAME_KR+"</a>";
                            }else if(e.DIVISION == '3' || e.DIVISION == '1' || e.DIVISION == '10'){ /*단기직원, 위촉직원, 기타*/
                                return "<a href='#' onclick='userPersonList.userViewContractPop("+e.EMP_SEQ+")' style='color: rgb(0, 51, 255);'>"+e.EMP_NAME_KR+"</a>";
                            }else if(e.DIVISION == '3' || e.DIVISION == '2'){ /*연수생/학생연구원*/
                                return "<a href='#' onclick='userPersonList.userViewTraineePop("+e.EMP_SEQ+")' style='color: rgb(0, 51, 255);'>"+e.EMP_NAME_KR+"</a>";
                            }  else{
                                return "<a href='#' onclick='userPersonList.userViewPop("+e.EMP_SEQ+")' style='color: rgb(0, 51, 255);'>"+e.EMP_NAME_KR+"</a>";
                            }
                        }
                    },
                    width : 100
                }, {
                    title: "인사기록카드",
                    template : function(e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="userPersonList.userPersonnelRecord(' + e.EMP_SEQ + ')">' +
                            '	<span class="k-button-text">인사기록카드<span>' +
                            '</button>';
                    },
                    width: 140
                }, {
                    field: "DEPT_NAME1",
                    title: "부서(실)"
                }, {
                    field: "DEPT_TEAM_NAME",
                    title: "부서(팀)"
                }, {
                    title: "직위",
                    template: function(row){
                        return fn_getSpot(row.DUTY_NAME, row.POSITION_NAME);
                    }
                }, {
                    field: "OFFICE_TEL_NUM",
                    title: "전화번호"
                }, {
                    field: "MOBILE_TEL_NUM",
                    title: "핸드폰"
                }, {
                    title: "퇴사일",
                    field: "RESIGN_DAY",
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },

    mainGrid2 : function(url,params) {
        $("#mainGrid2").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
            sortable: true,
            scrollable: true,
            selectable: "row",
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
                    title: "번호",
                    template: "#= --record #",
                    width: 50
                }, {
                    field: "EMP_NAME_KR",
                    title: "성명",
                    width: 100
                }, {
                    field: "DEPT_NAME1",
                    title: "부서(실)",
                    width: 130
                }, {
                    field: "DEPT_TEAM_NAME",
                    title: "부서(팀)",
                    width: 160
                }, {
                    field: "DUTY_NAME",
                    title: "직위",
                    template : function(e){
                        if(e.DUTY_NAME != "" || e.DUTY_NAME != null){
                            return e.POSITION_NAME;
                        } else {
                            return e.DUTY_NAME;
                        }
                    }
                }, {
                    title: "성별",
                    template: function(e){
                        if(e.GENDER_CODE == "M"){
                            return "남";
                        } else if(e.GENDER_CODE == "F"){
                            return "여";
                        } else {
                            return "-";
                        }
                    }
                }, {
                    title: "유형",
                    template : function(e){
                        if(e.DIVISION == 0){
                            return "정규직원";
                        } else if (e.DIVISION == 4){
                            return "계약직원";
                        } else if (e.DIVISION == 3){
                            return "단기직원";
                        } else if (e.DIVISION == 1){
                            return "위촉직원";
                        } else if (e.DIVISION == 2){
                            return "연수생/학생연구원";
                        } else if (e.DIVISION == 10){
                            return "기타";
                        } else if (e.DIVISION == 9){
                            return "퇴사직원";
                        } else {
                            return "-";
                        }
                    },
                    width: 150
                }, {
                    field: "",
                    title: "나이",
                    template : function(e){
                        if(e.RES_REGIS_NUM != null && e.RES_REGIS_NUM != "") {
                            var age = userPersonList.fn_setCalcAge(e.RES_REGIS_NUM);
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
                    field: "",
                    title: "재직여부",
                    template : function(e){
                        if(e.WORK_STATUS_CODE == "Y"){
                            return "재직";
                        } else {
                            return "퇴직";
                        }
                    }
                }, {
                    field: "JOIN_DAY2",
                    title: "입사일"
                }, {
                    field: "RESIGN_DAY2",
                    title: "퇴사일"
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },

    userReqPop : function(e) {

        console.log(e);
        var url = "/Inside/pop/userReqPop.do";

        if(e != null && e != ""){
            url += "?empSeq=" + e;
        }

        var name = "recruitReqPop";
        var option = "width=1100, height=1000, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    },

    sendSmsPop : function(){
        var joinSn = "";
        $.each($("input[name='checkUser']:checked"), function(i){
            if(i != 0){
                joinSn += ",";
            }
            joinSn += $(this).val();
        });

        if($("input[name='checkUser']:checked").length == 0){
            alert("SMS 발송 할 직원을 선택해주세요."); return;
        }

        var url = "/system/pop/messageSendPop.do?userList="+joinSn+"&type=userList";
        var name = "messageSendPop";
        var option = "width=315, height=600, scrollbars=no, top=200, left=600, resizable=no, toolbars=no, menubar=no";
        var popup = window.open(url, name, option);
    },

    userViewPop : function(e) {
        var url = "/Inside/pop/userViewPop.do";

        if(e != null && e != ""){
            url += "?empSeq=" + e;
        }

        var name = "userViewPop";
        var option = "width=1100, height=1000, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    },

    /*계약직원 - 경비/환경, 단기직원, 위촉직원*/
    userViewContractPop : function(e) {
        var url = "/Inside/pop/userViewContractPop.do";

        if(e != null && e != ""){
            url += "?empSeq=" + e;
        }

        var name = "userViewContractPop";
        var option = "width=1100, height=1000, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    },

    /*연수생/학생연구원*/
    userViewTraineePop : function(e) {
        var url = "/Inside/pop/userViewTraineePop.do";

        if(e != null && e != ""){
            url += "?empSeq=" + e;
        }

        var name = "userViewTraineePop";
        var option = "width=1100, height=1000, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
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
        var arr = "";

        if($(".detailSearch:checked").length == 0){
            arr += "|999&N"
        }else{
            $(".detailSearch:checked").each(function(){
                if($(this).attr("id") != "dsI"){
                    arr += "|" + $(this).attr("division") + '&' + ($(this).attr("divisionSub") == null ? "N" : $(this).attr("divisionSub"));
                }
            })
        }

        userPersonList.global.searchAjaxData.dsI = "";

        if($("#dsI").is(":checked")){
            userPersonList.global.searchAjaxData.dsI = "Y";
        }


        userPersonList.global.searchAjaxData.arr = arr.substring(1);

        if($("#dsJ").is(":checked")){
            $("#mainGrid").css("display", "none");
            $("#mainGridSub").css("display", "");
            userPersonList.global.searchAjaxData.dsJ = "Y";
            userPersonList.mainGridSub('/userManage/getEmpInfoList',userPersonList.global.searchAjaxData);
        } else {
            $("#mainGrid").css("display", "");
            $("#mainGridSub").css("display", "none");

            userPersonList.mainGrid('/userManage/getEmpInfoList',userPersonList.global.searchAjaxData);
        }


        var dsiResult = customKendo.fn_customAjax("/userManage/getCountForDsI", userPersonList.global.searchAjaxData);
        console.log("dsiResult", dsiResult);
        if(dsiResult != null && dsiResult.data != null && dsiResult.data.dsI != null){
            $("#dsIText").text(dsiResult.data.dsI);
        }
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
            workStatusCode : $('#workStatusCode').val(), // 입퇴사 현황
            startDate : $("#start_date_detail").val(), // 조회 기간 시작일
            searchDetail1 : JSON.stringify(testDropDownTree1.value()),
            searchDetail2 : JSON.stringify(testDropDownTree2.value()),
            searchDetail3 : JSON.stringify(testDropDownTree3.value()),
            searchDetail4 : JSON.stringify(testDropDownTree4.value()),
            searchDetail5 : JSON.stringify(testDropDownTree5.value()),
            searchDetail6 : JSON.stringify(testDropDownTree6.value()),
            searchDetail7 : JSON.stringify(testDropDownTree7.value()),
            searchDetail8 : JSON.stringify(testDropDownTree8.value())
        }

        console.log(JSON.stringify(userPersonList.global.searchAjaxData));
        userPersonList.mainGrid2('/userManage/getEmpInfoDetailList',userPersonList.global.searchAjaxData);
    },

    //주민번호 앞자리 입력시 나이 출력하는 함수
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
    },

    fn_checkAll: function(){
        if($("#checkAll").is(":checked")) {
            $("input[name='checkUser']").prop("checked", true);
        }else{
            $("input[name='checkUser']").prop("checked", false);
        }
    },

    userPersonnelRecord : function(empSeq){
        open_in_frame('/Inside/userPersonnelRecord.do?empSeq='+ empSeq + '&admin=Y');
        /*open_in_frame('/Inside/userPersonnelRecord.do?empSeq='+ empSeq)*/
    },

    fn_reloadOpner: function(){
        $.ajax({
            type: "POST",
            url: "/Inside/userPersonList.do", // 요청을 처리하는 컨트롤러의 URL
            success: function(data) {
                // 서버에서 전송된 HTML을 사용하여 selectDivision을 업데이트합니다.
                console.log("division 재요청 성공")
                var specificDivInOpner = document.getElementById("selectDivision");
                specificDivInOpner.innerHTML = $(data).find("#selectDivision").html();
            },
            error: function() {
                console.log("Error occurred while reloading selectDivision.");
            }
        });
    }

}
