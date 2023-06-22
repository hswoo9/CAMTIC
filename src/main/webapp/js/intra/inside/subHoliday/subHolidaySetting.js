var now = new Date();

var subHolidaySetting = {
    global : {
        selectEmpData : [],
    },

    init : function(){
        subHolidaySetting.fn_makerGrid();

        $("#holidayYear").kendoDatePicker({
            format : "yyyy",
            culture : "ko-KR",
            depth: "decade",
            start: "decade",
            value : new Date()
        });

        $("#searchVal").kendoTextBox();

        $.ajax({
            url : "/userManage/getDeptCodeList2",
            type : "post",
            async: false,
            dataType : "json",
            success : function(result){
                var ds = result.list;
                ds.unshift({deptName: ''});

                $("#deptName").kendoDropDownList({
                    dataTextField: "deptName",
                    dataValueField: "deptName",
                    dataSource: ds,
                    index: 0,
                    success : function(){
                        subHolidaySetting.gridReload();
                    }
                });
            }
        });

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
                htmlStr += "<input type='text' id='targetGrantDay' style='width:90%;' value='"+ subHolidaySetting.global.selectEmpData.GRANT_DAY +"'>";
                htmlStr += "</td>";
                htmlStr += "<th class='text-center th-color'>기본조정</th>";
                htmlStr += "<td>";
                htmlStr += "<input type='text' id='targetMdtnDay' style='width:90%;' value='"+ subHolidaySetting.global.selectEmpData.MDTN_DAY +"'>";
                htmlStr += "</td>";
                htmlStr += "</tr>";
                htmlStr += "<tr>";
                htmlStr += "<th class='text-center th-color'>가산일수</th>";
                htmlStr += "<td>";
                htmlStr += "<input type='text' id='targetExtraDay' style='width:90%;' value='"+ subHolidaySetting.global.selectEmpData.EXTRA_DAY +"'>";
                htmlStr += "</td>";
                htmlStr += "<th class='text-center th-color'>이월</th>";
                htmlStr += "<td>";
                htmlStr += "<input type='text' id='targetCarryoverDay' style='width:90%;' value='"+ subHolidaySetting.global.selectEmpData.CARRYOVER_DAY +"'>";
                htmlStr += "</td>";
                htmlStr += "</tr>";
                htmlStr += "<tr>";
                htmlStr += "<th class='text-center th-color'>소진</th>";
                htmlStr += "<th class='text-center th-color'>사용</th>";
                htmlStr += "<td>";
                htmlStr += "<input type='text' id='targetUseDay' style='width:90%;' value='"+ subHolidaySetting.global.selectEmpData.USE_DAY +"'>";
                htmlStr += "</td>";
                htmlStr += "<th class='text-center th-color'>사용조정</th>";
                htmlStr += "<td>";
                htmlStr += "<input type='text' id='targetAdjustmentUseDay' style='width:90%;' value='"+ subHolidaySetting.global.selectEmpData.ADJUSTMENT_USE_DAY +"'>";
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
                customKendo.fn_textBox(['targetGrantDay', 'targetMdtnDay','targetExtraDay','targetCarryoverDay','targetUseDay','targetAdjustmentUseDay']);
            }
        });


    },

    fn_makerGrid : function(){

        var dataSource = new kendo.data.DataSource({
            serverPaging: false,
            pageSize : 10,
            transport: {
                read : {
                    url : getContextPath() + "/getUserVacList.do",
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data, operation) {
                    data.holidayYear = $("#holidayYear").val();
                    data.deptName = $("#deptName").val();
                    data.deptTeamName = $("#deptTeamName").val();
                    data.searchVal = $("#searchVal").val();
                    return data;
                    console.log(data);
                }

            },
            schema : {
                data: function (data) {
                    return data.result;
                },
                total: function (data) {
                    return data.totalCount;
                },
            }
        });

        $("#mainGrid").kendoGrid({
            dataSource: dataSource,
            height: 490,
            sortable: true,
            scrollable: true,
            noRecords: {
                template: "<div style='margin: auto;'>데이터가 존재하지 않습니다.</div>"
            },
            pageable: {
                refresh: true,
                pageSize : 10,
                pageSizes: [10, 20, 50, "ALL"],
                buttonCount: 5,
                messages: {
                    display: "{0} - {1} of {2}",
                    itemsPerPage: "",
                    empty: "데이터가 없습니다.",
                }
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
                    title : "직위",
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
                            field : "CARRYOVER_DAY",
                            title : "이월",
                            width : 70,
                            template : function(e){
                                if(e.CARRYOVER_DAY == null){
                                    return "-";
                                }else{
                                    return e.CARRYOVER_DAY;
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
                            field : "ADJUSTMENT_USE_DAY",
                            title : "사용조정",
                            width : 70,
                            template : function(e){
                                if(e.ADJUSTMENT_USE_DAY == null){
                                    return "-";
                                }else{
                                    return e.ADJUSTMENT_USE_DAY;
                                }
                            }
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
            saveData.vacCodeId = "1";
            saveData.grantDay = $("#targetGrantDay").val();
            saveData.mdtnDay = $("#targetMdtnDay").val();
            saveData.extraDay = $("#targetExtraDay").val();
            saveData.carryoverDay = $("#targetCarryoverDay").val();
            saveData.useDay = $("#targetUseDay").val();
            saveData.adjustmentUseDay = $("#targetAdjustmentUseDay").val();
            saveData.vacId = $("#targetVacId").val();

            $.ajax({
                url : getContextPath() + '/setUserVac',
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

    gridReload : function(){
        $("#mainGrid").data("kendoGrid").dataSource.read();
    }
}
