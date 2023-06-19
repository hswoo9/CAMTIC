var now = new Date();

var subHolidaySetting = {
    global : {
        activeList : [
            {
                text : "재직", value : "Y"
            }, {
                text : "퇴직", value : "N"
            }
        ],
        vacStatus : [
            { text: "확정", value: "Y" },
            { text: "사용대기", value: "N" },
            { text: "미생성", value: "NULL" }
        ],
        selectEmpData : [],
    },

    init : function(){
        customKendo.fn_dropDownList("active", subHolidaySetting.global.activeList, "text", "value");
        customKendo.fn_dropDownList("vacStatus", subHolidaySetting.global.vacStatus, "text", "value");

        subHolidaySetting.fn_makerGrid();

        $("#userVacSetting").kendoWindow({
            title: "연가 설정",
            width: "500px",
            visible: false,
            modal: true,
            position : {
                top : "30%",
                left : "40%"
            },
            open : function(data){
                console.log("-----");
                console.log(subHolidaySetting.global.selectEmpData);
                console.log("-----");
                $("#userVacSetting").empty();
                var htmlStr = "";
                htmlStr += "<input type='hidden' id='targetEmpSeq' value='"+ subHolidaySetting.global.selectEmpData.EMP_SEQ +"'>";
                if(subHolidaySetting.global.selectEmpData.VAC_ID != null){
                    htmlStr += "<input type='hidden' id='targetVacId' value='"+ subHolidaySetting.global.selectEmpData.VAC_ID +"'>";
                }else{
                    htmlStr += "<input type='hidden' id='targetVacId' value=''>";
                }

                htmlStr += "<table class='table table-bordered' style='border: 1px solid #dedfdf;'>";
                htmlStr += "<colgroup>";
                htmlStr += "<col width='5%'>";
                htmlStr += "<col width='15%'>";
                htmlStr += "<col width='30%'>";
                htmlStr += "<col width='20%'>";
                htmlStr += "<col width='30%'>";
                htmlStr += "</colgroup>";
                htmlStr += "<tr>";
                htmlStr += "<th colspan='2' class='text-center th-color'>부서</th>";
                htmlStr += "<td>";
                htmlStr += "<span id='targetDeptName'>"+ subHolidaySetting.global.selectEmpData.DEPT_NAME +"</span>";
                htmlStr += "</td>";
                htmlStr += "<th class='text-center th-color'>직급</th>";
                htmlStr += "<td>";
                htmlStr += "<span id='targetPositionName'>"+ subHolidaySetting.global.selectEmpData.POSITION_NAME +"</span>";
                htmlStr += "</td>";
                htmlStr += "</tr>";
                htmlStr += "<tr>";
                htmlStr += "<th colspan='2' class='text-center th-color'>직책</th>";
                htmlStr += "<td>";
                htmlStr += "<span id='targetDutyName'>"+ subHolidaySetting.global.selectEmpData.DUTY_NAME +"</span>";
                htmlStr += "</td>";
                htmlStr += "<th class='text-center th-color'>이름</th>";
                htmlStr += "<td>";
                htmlStr += "<span id='targetEmpName'>"+ subHolidaySetting.global.selectEmpData.EMP_NAME_KR +"</span>";
                htmlStr += "</td>";
                htmlStr += "</tr>";
                htmlStr += "<tr>";
                htmlStr += "<th rowspan='2' class='text-center th-color'>부여</th>";
                htmlStr += "<th class='text-center th-color'>기본</th>";
                htmlStr += "<td>";
                htmlStr += "<input type='text' id='targetGrantDay' style='width:90%;' value='"+ subHolidaySetting.changeMinuteToHour(subHolidaySetting.global.selectEmpData.GRANT_DAY) +"'>";
                htmlStr += "</td>";
                htmlStr += "<th class='text-center th-color'>기본조정</th>";
                htmlStr += "<td>";
                htmlStr += "<input type='text' id='targetMdtnDay' style='width:90%;' onkeyup='subHolidaySetting.keyPressNumberCheck(this)' value='"+ subHolidaySetting.changeMinuteToHour(subHolidaySetting.global.selectEmpData.MDTN_DAY) +"'>";
                htmlStr += "</td>";
                htmlStr += "</tr>";
                htmlStr += "<tr>";
                htmlStr += "<th class='text-center th-color'>가산일수</th>";
                htmlStr += "<td>";
                htmlStr += "<input type='text' id='' style='width:90%;'>";
                htmlStr += "</td>";
                htmlStr += "<th class='text-center th-color'>이월</th>";
                htmlStr += "<td>";
                htmlStr += "<input type='text' id='' style='width:90%;'>";
                htmlStr += "</td>";
                htmlStr += "</tr>";
                htmlStr += "<tr>";
                htmlStr += "<th class='text-center th-color'>소진</th>";
                htmlStr += "<th class='text-center th-color'>사용</th>";
                htmlStr += "<td>";
                htmlStr += "<input type='text' id='' style='width:90%;'>";
                htmlStr += "</td>";
                htmlStr += "<th class='text-center th-color'>사용조정</th>";
                htmlStr += "<td>";
                htmlStr += "<input type='text' id='' style='width:50%;'>";
                htmlStr += "</td>";
                htmlStr += "</tr>";
                htmlStr += "</table>";
                htmlStr += "<button type='button' class='k-button k-button-md k-rounded-md k-button-solid k-button-solid-base' onclick=\"subHolidaySetting.saveUserVac()\">" +
                    "<span class='k-icon k-i-track-changes-accept k-button-icon'></span>" +
                    "<span class='k-button-text'>저장</span>" +
                    "</button>";


                $("#userVacSetting").html(htmlStr);
                customKendo.fn_datePicker("targetApplyYear", "", "yyyy", new Date());
                if(subHolidaySetting.global.selectEmpData.APPLY_YEAR != null){
                    $("#targetApplyYear").val(subHolidaySetting.global.selectEmpData.APPLY_YEAR);
                }
                customKendo.fn_datePicker("targetStApplyDate", "", "yyyy-MM-dd", new Date());
                customKendo.fn_datePicker("targetEnApplyDate", "", "yyyy-MM-dd", new Date());
                customKendo.fn_textBox(['targetGrantDay', 'targetMdtnDay']);
            }
        });


    },

    vacMinuteToHour : function(grantDay){
        console.log("--------------------------------------------------------");
        //1일기준 480분 = 8시간 (기본근무시간)
        //1시간 60분

        //1. 부여일(분)/480 = 일(몫)
        //2. (부여일(분)%480)/60 = 일 수 구한 나머지를 시간으로 변환 - 시간(1의 나머지/60))
        //3. (부여일(분)%480)%60 = 시간 수 구한 나머지는 분으로 표기 - 분(2의 나머지)
        //표기법 일/시간/분
        var hour = String(Number(grantDay/60));
        console.log(hour);
        var day = Number(hour/8);
        console.log("--------------------------------------------------------");

        return day;
    },

    fn_makerGrid : function(){

        var dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : getContextPath() + "/getUserVacList.do",
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data, operation) {
                    data.active = $("#active").val();
                    data.userNm = $("#userNm").val();
                    data.deptName = $("#deptName").val();
                    data.positionDutyNm = $("#positionDutyNm").val();
                    data.vacStatus = $("#vacStatus").val();
                    return data;
                }
            },
            schema : {
                data: function (data) {
                    return data.result;
                },
                total: function (data) {
                    return data.result.length;
                },
            }
        });

        $("#mainGrid").kendoGrid({
            dataSource: dataSource,
            height: 700,
            sortable: false,
            scrollable: true,
            toolbar : [
                {
                    name : 'excel', text: '엑셀다운로드'
                }, {
                    template: "<span>휴가/연차 표기 방식 - 일/시간/분</span>"
                }
            ],
            excel : {
                fileName : "사용자 연차 현황.xlsx",
                filterable : true
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound: subHolidaySetting.onDataBound,
            columns: [
                {
                    field : "EMP_NAME_KR",
                    title : "이름",
                    width : 60
                }, {
                    field : "POSITION_NAME",
                    title : "직급",
                    width : 90
                }, {
                    field : "DUTY_NAME",
                    title : "직책",
                    width : 90
                },{
                    field : "DEPT_NAME",
                    title : "부서",
                    width : 90
                }, {
                    title : "재직구분",
                    template : function (e){
                        if(e.ACTIVE == "Y"){
                            return "재직";
                        }else{
                            return "퇴직";
                        }
                    },
                    width : 70,
                }, {
                    field : "JOIN_DAY",
                    title : "입사일",
                    width : 100
                }, {
                    title : "적용기간",
                    columns : [
                        {
                            field : "ST_APPLY_DATE",
                            title : "시작일자",
                            width : 100,
                            template : function(e){
                                if(e.ST_APPLY_DATE == null){
                                    return "-";
                                }else{
                                    return e.ST_APPLY_DATE;
                                }
                            }
                        }, {
                            field : "EN_APPLY_DATE",
                            title : "종료일자",
                            width : 100,
                            template : function(e){
                                if(e.EN_APPLY_DATE == null){
                                    return "-";
                                }else{
                                    return e.EN_APPLY_DATE;
                                }
                            }
                        }
                    ]
                }, {
                    title : "부여(A)",
                    columns : [
                        {
                            field : "GRANT_DAY",
                            title : "기본",
                            width : 70,
                            template : function(e){
                                if(e.GRANT_DAY == null){
                                    return "-";
                                }else{
                                    return e.GRANT_DAY;
                                }
                            }
                        }, {
                            field : "MDTN_DAY",
                            title : "기본조정",
                            width : 70,
                            template : function(e){
                                if(e.MDTN_DAY == null){
                                    return "-";
                                }else{
                                    return e.MDTN_DAY;
                                }
                            }
                        },{
                            field : "EXTRA_DAY",
                            title : "가산일수",
                            width : 70,
                            template : function(e){
                                if(e.EXTRA_DAY == null){
                                    return "-";
                                }else{
                                    return e.EXTRA_DAY;
                                }
                            }
                        }, {
                            field : "SAV_GRANT_DAY",
                            title : "이월",
                            width : 70,
                            template : function(e){
                                if(e.SAV_GRANT_DAY == null){
                                    return "-";
                                }else{
                                    return e.SAV_GRANT_DAY;
                                }
                            }
                        }
                    ]
                }, {
                    title : "소진(B)",
                    columns : [
                        {
                            field : "USE_DAY",
                            title : "사용",
                            width : 70,
                            template : function(e){
                                if(e.USE_DAY == null){
                                    return "-";
                                }else{
                                    return e.USE_DAY;
                                }
                            }
                        }, {
                            title : "사용조정",
                            template : function (e){
                                return "-";
                            },
                            width : 70
                        }
                    ]
                }, {
                    field : "REMAIN_VAC",
                    title : "잔여연차<br>(A-B)",
                    width : 70,
                    template : function(e){
                        if(e.REMAIN_VAC == null){
                            return "-";
                        }else{
                            return e.REMAIN_VAC;
                        }
                    }
                }, {
                    field : "ACTIVE",
                    title : "상태",
                    width : 70,
                    template : function(e){
                        if(e.ACTIVE == null){
                            return "미생성";
                        }else if(e.ACTIVE == "Y") {
                            return "확정";
                        }else{
                            return "사용대기";
                        }
                    }
                }
            ]
        }).data("kendoGrid");
    },

    gridReload : function(){
        $("#mainGrid").data("kendoGrid").dataSource.read();
    },

    onDataBound : function(){
        var grid = this;
        grid.element.off('dbclick');
        subHolidaySetting.global.selectEmpData = [];

        grid.tbody.find("tr").click(function (e) {
            var dataItem = grid.dataItem($(this));
            subHolidaySetting.global.selectEmpData = dataItem;
            $("#userVacSetting").data("kendoWindow").open();
        });
    },

    saveUserVac : function() {

        if(confirm("저장하시겠습니까?")){
            var aguAr = new Array();

            var saveData = {};
            saveData.targetEmpSeq = $("#targetEmpSeq").val();
            saveData.empSeq = $("#empSeq").val();
            saveData.vacCodeId = "1";
            saveData.applyYear = $("#targetApplyYear").val();
            saveData.grantDay = subHolidaySetting.changeHourToMinute($("#targetGrantDay").val());
            saveData.mdtnDay = subHolidaySetting.changeHourToMinute($("#targetMdtnDay").val());
            saveData.remainDay = parseInt(saveData.grantDay) + parseInt(saveData.mdtnDay);
            if($("#targetVacId").val() != null){
                saveData.vacId = $("#targetVacId").val();
            }

            $.ajax({
                url : getContextPath() + '/subHoliday/setUserVac',
                data :  saveData,
                dataType : "json",
                type : "POST",
                async : false,
                success : function (){
                    alert("저장되었습니다.");
                    $("#userVacSetting").data("kendoWindow").close();
                    subHolidaySetting.gridReload();
                },
                error : function (){
                    alert("에러가 발생했습니다.");
                }
            })
        }
        console.log(saveData);

    },

    keyPressNumberCheck : function(target){
        var regexp = /^[0-9]*$/;
        if(!regexp.test(target.value)){
            alert("숫자만 입력가능합니다.");
            target.value = "";
            return;
        }
    },

    changeHourToMinute : function(data){
        if(data != null){
            return parseInt(data*480);
        }else{
            return 0;
        }

    },

    changeMinuteToHour : function(data){
        if(data != null){
            return parseInt(data/480);
        }else{
            return 0;
        }

    },



    dataSet() {
        $("#holidayYear").kendoDatePicker({
            start: "decade",
            depth: "decade",
            culture : "ko-KR",
            format : "yyyy",
            value : new Date()
        });

        $("#dept").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "부서선택", value: "" },
                { text: "미래전략기획본부", value: "1" },
                { text: "R&BD사업본부", value: "2" },
                { text: "기업성장지원본부", value: "3" },
                { text: "우주항공사업부", value: "4" },
                { text: "드론사업부", value: "5" },
                { text: "스마트제조사업부", value: "6" },
                { text: "경영지원실", value: "7" }
            ],
            index: 0
        });

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

        $("#status").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                { text: "작성중", value: "1" },
                { text: "제출", value: "2" },
                { text: "승인", value: "3" },
                { text: "반려", value: "4" }
            ],
            index: 0
        });

        $("#searchType").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "성명", value: "" },
                { text: "부서명", value: "1" },
                { text: "팀명", value: "2" },
                { text: "직급", value: "3" },
            ],
            index: 0
        });
    }
}
