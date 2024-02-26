var now = new Date();
var docContent = "";

var check;
var subHolidayReqPop2 = {
    global : {
        menuCd : $("#menuCd").val(),
        empSeq : $("#empSeq").val(),
        mcCode : "V",
        mdCode : "",
        now : new Date(),
        addMonth : new Date(),
        vacGubun : [],

        year : "",
        month : "",
        date : "",

        modalTemplate : "",
        minuteList : new Array(),

        type: "",
        code: ""
    },

    fn_defaultScript: function(){
        var data = {
            mcCode : subHolidayReqPop2.global.mcCode,
            mdCode : subHolidayReqPop2.global.mdCode,
            empSeq : subHolidayReqPop2.global.empSeq
        }

        subHolidayReqPop2.global.vacGubun = customKendo.fn_customAjax("/attend/getVacCodeList2", data);

        subHolidayReqPop2.fn_defaultScriptTopTable();
        subHolidayReqPop2.dataSet();

        $("#erpEmpCd, #empName, #deptName, #dutyName").kendoTextBox({
            enable: false
        });

        $("#holiday_reason").kendoTextBox();
        $("#other_reason").kendoTextBox();
        $("#other_emp").kendoTextBox();

        if($("#vacUseHistId").val() != ""){
            subHolidayReqPop2.getVacUseHistoryOne();
        }

        //캠도큐먼트 양식목록에서 기안시 처리작업
        subHolidayReqPop2.global.code = $("#code").val();
        subHolidayReqPop2.global.type = $("#type").val();
        if(subHolidayReqPop2.global.code == "11"){
            $("#edtHolidayKindTop").data("kendoDropDownList").value(subHolidayReqPop2.global.code);
            subHolidayReqPop2.dataSetChange();
            $("#edtHolidayKindTop").data("kendoDropDownList").enable(false);
        }
        if(subHolidayReqPop2.global.type == "drafting"){
            $(".request").hide();
            $(".drafting").show();
        }else {
            $(".request").show();
            $(".drafting").hide();
        }
    },

    fn_vacEdtHolidaySaveModal: function(){
        var flag = true;
        var startDay = $("#edtHolidayStartDateTop").val() + " " + $("#edtHolidayStartHourTop").val();
        var endDay = $("#edtHolidayEndDateTop").val() + " " + $("#edtHolidayEndHourTop").val();
        var chkVal = subHolidayReqPop2.getApplyDateAttCheck(startDay, endDay);

        /*if($("#apprStat").val() != "" && $("#apprStat").val() != null) {
            if ($("#apprStat").val() != "N") {
                alert("승인된 휴가는 수정할 수 없습니다.");
                flag = false;
                return;
            }
        }*/

        if(chkVal != null) {
            if (chkVal.result == "VAC_FAIL") {
                alert("해당 일자에 중복되는 휴가 목록이 존재합니다");
                flag = false;
                return;
            } else if (chkVal.result == "TRIP_FAIL") {
                alert("해당 일자에 출장 예정 목록이 존재합니다");
                flag = false;
                return;
            }

            if(!flag){
                return;
            }
        }else if (!$("#edtHolidayKindTop").val()) {
            alert("휴가구분을 선택해주세요.");
            flag = false;
            return;
        }/*else if (!$("#edtHolidayStartDateTop_1").val()){
            alert("휴가 시작일을 선택해주세요.");
            flag = false;
            return;
        }else if(!$("#edtHolidayEndDateTop_1").val()){
            alert("휴가 종료일을 선택해주세요.");
            flag = false;
            return;
        }*/

        if (confirm("저장하시겠습니까?")) {
            if (flag) {
                var monthStr = "00" + (subHolidayReqPop2.global.now.getMonth()+1);
                var dayStr = "00" + subHolidayReqPop2.global.now.getDate();
                var data = {
                    vacCodeId: $("#edtHolidayKindTop").val(),
                    applySeq: $("#empSeq").val(),
                    applyDate: subHolidayReqPop2.global.now.getFullYear() + monthStr.substring(monthStr.length-2, monthStr.length) + dayStr.substring(dayStr.length-2, dayStr.length),
                    saveSeq: $("#empSeq").val(),
                    saveDate: subHolidayReqPop2.global.now.getFullYear() + monthStr.substring(monthStr.length-2, monthStr.length) + dayStr.substring(dayStr.length-2, dayStr.length),
                    rmk: $("#holiday_reason").val(),
                    rmkOther : $("#other_reason").val(),
                    vacTargetSeq: $("#empSeq").val(),
                }

                if($("#vacUseHistId").val() != null && $("#vacUseHistId").val() != ""){
                    data.vacUseHistId = $("#vacUseHistId").val();
                }
                if($("#edtHolidayKindTop").val() == 11){
                    data.vacUseStDt = $("#edtHolidayStartDateTop_3").val();
                    data.vacUseStTime = $("#edtHolidayStartHourTop_3").val();
                    data.vacUseEnDt = $("#edtHolidayEndDateTop_3").val();
                    data.vacUseEnTime = $("#edtHolidayEndHourTop_3").val();
                    data.vacUseAlDt = $("#edtHolidayAlternativeDate_3").val();
                    data.vacWorkDt = $("#edtHolidayWorkDay_3").val();
                }else if($("#edtHolidayKindTop").val() == 9){
                    data.vacUseStDt = $("#edtHolidayStartDateTop_2").val();
                    data.vacUseStTime = $("#edtHolidayStartHourTop_2").val();
                    data.vacUseEnDt = $("#edtHolidayEndDateTop_2").val();
                    data.vacUseEnTime = $("#edtHolidayEndHourTop_2").val();
                    data.vacWorkDt = $("#edtHolidayWorkDay_3").val();
                    data.checkUseYn = 'Y';
                }else{
                    data.vacUseStDt = $("#edtHolidayStartDateTop_1").val();
                    data.vacUseStTime = $("#edtHolidayStartHourTop_1").val();
                    data.vacUseEnDt = $("#edtHolidayEndDateTop_1").val();
                    data.vacUseEnTime = $("#edtHolidayEndHourTop_1").val();
                }

                if($("#edtHolidayKindTop").val() == 2 || $("#edtHolidayKindTop").val() == 3) {
                    data.useDay = 0.5;
                }else if($("#edtHolidayKindTop").val() != 11) {
                    var firstDate;
                    var secondDate;
                    if($("#edtHolidayKindTop").val() == 9){
                        //사용일수 계산
                        firstDate = $("#edtHolidayStartDateTop_2").val().replace(/-/g, '');
                        secondDate = $("#edtHolidayEndDateTop_2").val().replace(/-/g, '');
                    }else{
                        //사용일수 계산
                        firstDate = $("#edtHolidayStartDateTop_1").val().replace(/-/g, '');
                        secondDate = $("#edtHolidayEndDateTop_1").val().replace(/-/g, '');
                    }
                    var firstDateObj = new Date(firstDate.substring(0, 4), firstDate.substring(4, 6) - 1, firstDate.substring(6, 8));
                    var secondDateObj = new Date(secondDate.substring(0, 4), secondDate.substring(4, 6) - 1, secondDate.substring(6, 8));
                    var betweenTime = Math.abs(secondDateObj.getTime() - firstDateObj.getTime());
                    data.useDay = Math.floor(betweenTime / (1000 * 60 * 60 * 24)+1);
                }else {
                    data.useDay = 0;
                }
            }

            $.ajax({
                url : getContextPath()+"/setVacUseHist.do",
                data : data,
                dataType : "json",
                type : "post",
                success: function (rs) {
                    alert("신청 데이터 저장이 완료되었습니다.");
                    //subHolidayReqPop.fn_topTableClear();
                    /* $("#scheduler").data("kendoScheduler").dataSource.read();*/
                    if(subHolidayReqPop2.global.type == "drafting") {
                        $("#subHolidayId").val(rs.vacUseHistId);
                        $("#subHolidayDraftFrm").one("submit", function() {
                            var url = "/popup/subHoliday/approvalFormPopup/workHolidayUserApprovalPop.do";
                            var name = "_self";
                            var option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=yes, scrollbars = yes, status=no, top=50, left=50"
                            var popup = window.open(url, name, option);
                            this.action = "/popup/subHoliday/approvalFormPopup/workHolidayUserApprovalPop.do";
                            this.method = 'POST';
                            this.target = '_self';
                        }).trigger("submit");
                    }else {
                        opener.gridReload();
                        window.close();
                    }
                },
                error: function () {
                    alert("신청 데이터 저장 중 에러가 발생했습니다.");
                }
            });
        }
    },

    getApplyDateAttCheck : function(strDt, endDt){
        var result;

        $.ajax({
            url : getContextPath()+"/common/getApplyDateAttCheck.do",
            data : {
                empSeq : $("#empSeq").val(),
                startDt : strDt.split(" ")[0],
                startTime : strDt.split(" ")[1],
                endDt : endDt.split(" ")[0],
                endTime : endDt.split(" ")[1]
            },
            dataType : "json",
            type : "post",
            async : false,
            success : function (rs){
                result = rs.rs;
            }
        });

        return result;


    },


    fn_defaultScriptTopTable : function(){

        var ds = subHolidayReqPop2.global.vacGubun;
        console.log(ds);

        $("#edtHolidayKindTop").kendoDropDownList({
            dataSource : ds.list,
            dataTextField: "SUBHOLIDAY_DT_CODE_NM",
            dataValueField: "SUBHOLIDAY_CODE_ID",
            index: 0, // 첫 번째 항목을 기본값으로 설정
            change : function(){
                subHolidayReqPop2.dataSetChange();
                /*if(this.value() != ''){
                    subHolidayReqPop.fn_getEmpWorkPlan(this.value());
                }else{
                    subHolidayReqPop.fn_topTableClear();
                }*/
            }
        }).data("kendoDropDownList").trigger("change"); // DropDownList 생성 후 change 이벤트를 직접 발생시킵니다.

        $("#edtHolidayStartDateTop").kendoDatePicker({
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            interval : 1,
            value : new Date(),
            //min : new Date(holiAnnLv.global.year, holiAnnLv.global.month, holiAnnLv.global.date),
            change : function(){
                var startDate = new Date(this.value());
                var endDate = new Date($("#edtHolidayEndDateTop").val());
                if(startDate > endDate){
                    $("#edtHolidayEndDateTop").data("kendoDatePicker").value($("#edtHolidayStartDateTop").val());
                }
                /*subHolidayReqPop.fn_getEmpWorkPlan($("#edtHolidayKindTop").val());*/
            }
        });

        $("#edtHolidayStartHourTop").kendoTimePicker({
            culture : "ko-KR",
            format : "HH:mm",
            interval : 10,
            value : "09:00",
            change : function(e){
                var startTime = new Date(this.value());
                var endTime = new Date($("#edtHolidayEndHourTop").val());
                if(startTime > endTime){
                    $("#edtHolidayEndHourTop").data("kendoTimePicker").value($("#edtHolidayStartHourTop").val());
                }
                /*subHolidayReqPop.fn_getEmpWorkPlanTimeModal($("#edtHolidayKindTop").val());*/
            }
        });


        $("#edtHolidayStartDateTop").val($("#edtHolidayStartDateTop").val());

        $("#edtHolidayEndDateTop").kendoDatePicker({
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            interval : 1,
            value : new Date(),
            //min : new Date(holiAnnLv.global.year, holiAnnLv.global.month, holiAnnLv.global.date),
            change : function(){
                var startDate = new Date($("#edtHolidayStartDateTop").val());
                var endDate = new Date(this.value());
                if(startDate > endDate){
                    $("#edtHolidayStartDateTop").data("kendoDatePicker").value($("#edtHolidayEndDateTop").val());
                }
                /*subHolidayReqPop.fn_getEmpWorkPlanTimeModal($("#edtHolidayKindTop").val());*/
            }
        });
        $("#edtHolidayEndHourTop").kendoTimePicker({
            culture : "ko-KR",
            format : "HH:mm",
            interval : 10,
            value : "18:00",
            change : function(e){
                var startTime = new Date($("#edtHolidayStartTimeModal").val());
                var endTime = new Date(this.value());
                if(startTime > endTime){
                    $("#edtHolidayStartHourTop").data("kendoTimePicker").value($("#edtHolidayEndHourTop").val());
                }
                /*subHolidayReqPop.fn_getEmpWorkPlanTimeModal($("#edtHolidayKindTop").val());*/
            }
        });
        $("#edtHolidayEndDateTop").val($("#edtHolidayEndDateTop").val());

    },

    fn_topTableClose : function(){
        var topWindow = window.top;
        topWindow.close();
    },

    fn_topTableClear : function(){
        $("#edtHolidayKindTop").data("kendoDropDownList").select(0);
        $("#edtHolidayStartDateTop").data("kendoDatePicker").value(new Date());
        $("#edtHolidayStartHourTop").data("kendoTimePicker").value("00");
        $("#edtHolidayStartMinuteTop").data("kendoDropDownList").value("00");


        $("#edtHolidayEndDateTop").data("kendoDatePicker").value(new Date());
        $("#edtHolidayEndHourTop").data("kendoTimePicker").value("00");
        $("#edtHolidayEndMinuteTop").data("kendoDropDownList").value("00");

        $("#edtHolidayRmkTop").val("");
        $("#edtHolidayApplyHourModal").val("");
        $("#edtHolidayApplyPeriodModal").val("");
        $("#edtHolidayPeriodHourModal").text("");

        $("#apprStat").val("");
        $("#vacUseHistId").val("");
    },

    dataSet : function() {
        $("#now_date").kendoTextBox({
            enable: false
        });


        document.getElementById('now_date').valueAsDate = new Date();
    },


    dataSetChange : function() {
        if($("#edtHolidayKindTop").val() != '' && $("#edtHolidayKindTop").val() == 11) {
            var html = '<table class="table table-bordered mb-0" id="holidayPlanReqPopTbVal">\n' +
                '              <colgroup>\n' +
                '                <col width="15%">\n' +
                '                <col width="35%">\n' +
                '                <col width="15%">\n' +
                '                <col width="35%">\n' +
                '              </colgroup>\n' +
                '              <thead>\n' +
                '              <tr>\n' +
                '                <th>대체휴가일자</th>\n' +
                '                <td colspan="3">\n' +
                '                  <input id="edtHolidayAlternativeDate_3" style="width:20%; margin-right:5px;">\n' +
                '                </td>\n' +
                '              </tr>\n' +
                '              <tr>\n' +
                '                <th scope="row" class="text-center th-color">안내사항</th>\n' +
                '                <td colspan="3">\n' +
                '                  * 휴일근로는 공휴일, 토요일, 일요일 등 휴무일에 근로가 필요한 경우 신청합니다.\n' +
                '                <br>\n' +
                '                  * 휴일근로는 대체휴가(1:1)로 처리하오니 대체휴가일을 선택해서 신청합니다.(필수)\n' +
                '                <br>\n' +
                '                  * 근로일자가 지정된 신청내용만 저장됩니다.\n' +
                '                </td>\n' +
                '              </tr>\n' +
                '              <tr>\n' +
                '                <th scope="row" class="text-center th-color">근로일자</th>\n' +
                '                <td colspan="3">\n' +
                '                  <table style="width:100%; margin-top:5px;">\n' +
                '                      <tr style="background-color:#d8dce36b;">\n' +
                '                        <th>근로일자</th>\n' +
                '                        <th>근로시간</th>\n' +
                '                        <th>비고</th>\n' +
                '                      </tr>\n' +
                '                      <tr style="background-color:#fff; text-align:center;">\n' +
                '                       <td>\n' +
                '                        <input type="text" id="edtHolidayWorkDay_3" name="edtHolidayWorkDay_3" data-bind="value:start" style="width: 80%;">\n' +
                '                       </td>\n' +
                '                       <td>\n' +
                '                        <input type="text" id="edtHolidayStartHourTop_3" name="edtHolidayStartHourTop_3" className="timeInput" data-bind="value:start" style="width: 20%;">\n' +
                '                        <span style="width: 9%;"> ~ </span>\n' +
                '                        <input type="text" id="edtHolidayEndHourTop_3" name="edtHolidayEndHourTop_3" className="timeInput" data-bind="value:end" style="width: 20%;">\n' +
                '                       </td>\n' +
                '                        <td style="text-align: center"><input type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" value="초기화" onclick="subHolidayReqPop2.dataClear()" id="resetBtn"/></td>\n' +
                '                      </tr>\n' +
                '                  </table>\n' +
                '                </td>\n' +
                '              </tr>\n' +
                '              <tr>\n' +
                '                <th scope="row" class="text-center th-color">사유</th>\n' +
                '                <td colspan="3">\n' +
                '                  <textarea name="holiday_reason" id="holiday_reason" rows="5" style="width:100%; /*border: 1px solid #eee;padding-left: 10px;*/"></textarea>\n' +
                '                </td>\n' +
                '              </tr>\n' +
                '              <tr>\n' +
                '                <th scope="row" class="text-center th-color">신청일</th>\n' +
                '                <td colspan="3">\n' +
                '                  <input type="date" id="now_date" style="width: 20%;">\n' +
                '                </td>\n' +
                '              </tr>\n' +
                '              </thead>\n' +
                '            </table>';
            $("#holidayPlanReqPopTbVal").html(html);
            subHolidayReqPop2.dataSet();

            $("#holiday_reason").kendoTextBox();

            $("#edtHolidayAlternativeDate_3").kendoDatePicker({
                culture : "ko-KR",
                format : "yyyy-MM-dd",
                interval : 1,
                value : new Date(),
                //min : new Date(holiAnnLv.global.year, holiAnnLv.global.month, holiAnnLv.global.date),
                change : function(){
                    var startDate = new Date(this.value());
                    var endDate = new Date($("#edtHolidayAlternativeDate_3").val());
                    if(startDate > endDate){
                        $("#edtHolidayAlternativeDate_3").data("kendoDatePicker").value($("#edtHolidayAlternativeDate_3").val());
                    }
                    /*subHolidayReqPop.fn_getEmpWorkPlan($("#edtHolidayKindTop").val());*/
                }
            });

            $("#edtHolidayWorkDay_3").kendoDatePicker({
                culture : "ko-KR",
                format : "yyyy-MM-dd",
                interval : 1,
                value : new Date(),
                //min : new Date(holiAnnLv.global.year, holiAnnLv.global.month, holiAnnLv.global.date),
                change : function(){
                    var startDate = new Date(this.value());
                    var endDate = new Date($("#edtHolidayEndDateTop_3").val());
                    if(startDate > endDate){
                        $("#edtHolidayEndDateTop_3").data("kendoDatePicker").value($("#edtHolidayStartDateTop_3").val());
                    }
                    /*subHolidayReqPop.fn_getEmpWorkPlan($("#edtHolidayKindTop").val());*/
                }
            });

            $("#edtHolidayStartHourTop_3").kendoTimePicker({
                culture : "ko-KR",
                format : "HH:mm",
                interval : 10,
                value : "09:00",
                change : function(e){
                    var startTime = new Date(this.value());
                    var endTime = new Date($("#edtHolidayEndHourTop_3").val());
                    if(startTime > endTime){
                        $("#edtHolidayEndHourTop_3").data("kendoTimePicker").value($("#edtHolidayStartHourTop_3").val());
                    }
                    /*subHolidayReqPop.fn_getEmpWorkPlanTimeModal($("#edtHolidayKindTop").val());*/
                }
            });

            $("#edtHolidayEndDateTop_3").kendoDatePicker({
                culture : "ko-KR",
                format : "yyyy-MM-dd",
                interval : 1,
                value : new Date(),
                //min : new Date(holiAnnLv.global.year, holiAnnLv.global.month, holiAnnLv.global.date),
                change : function(){
                    var startDate = new Date($("#edtHolidayStartDateTop_3").val());
                    var endDate = new Date(this.value());
                    if(startDate > endDate){
                        $("#edtHolidayStartDateTop_3").data("kendoDatePicker").value($("#edtHolidayEndDateTop_3").val());
                    }
                    /*subHolidayReqPop.fn_getEmpWorkPlanTimeModal($("#edtHolidayKindTop").val());*/
                }
            });
            $("#edtHolidayEndHourTop_3").kendoTimePicker({
                culture : "ko-KR",
                format : "HH:mm",
                interval : 10,
                value : "18:00",
                change : function(e){
                    var startTime = new Date($("#edtHolidayStartTimeModal_3").val());
                    var endTime = new Date(this.value());
                    if(startTime > endTime){
                        $("#edtHolidayStartHourTop_3").data("kendoTimePicker").value($("#edtHolidayEndHourTop_3").val());
                    }
                    /*subHolidayReqPop.fn_getEmpWorkPlanTimeModal($("#edtHolidayKindTop").val());*/
                }
            });

        }
    },

    searchHolidayPop : function() {
        var url = "/subHoliday/searchHolidayPop.do";
        var name = "searchHolidayPop";
        var option = "width=600, height=550, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    },

    sendMeData : function(request) {
        console.log(request);
        $("#edtHolidayWorkDay_3").val(request.SUBHOLIDAY_WORK_DAY);
    },

    dataClear : function () {
        var initialStartDate = "09:00";
        var initialEndDate = "18:00";
        var initialDate = new Date();
        $("#edtHolidayStartHourTop_3").data("kendoTimePicker").value(initialStartDate);
        $("#edtHolidayEndHourTop_3").data("kendoTimePicker").value(initialEndDate);
        $("#edtHolidayWorkDay_3").data("kendoDatePicker").value(initialDate);
    },

    getVacUseHistoryOne : function(){
        var result = customKendo.fn_customAjax("/subHoliday/getVacUseHistoryOne", {subholidayUseId : $("#vacUseHistId").val()})
        console.log(result);
        if(result.flag){
            $("#edtHolidayKindTop").data("kendoDropDownList").value(result.data.SUBHOLIDAY_CODE_ID);
            $("#edtHolidayKindTop").data("kendoDropDownList").trigger("change");

            if(result.data.DUTY_NAME != ""){
                $("#dutyName").val(result.data.DUTY_NAME);
            } else {
                $("#dutyName").val(result.data.POSITION_NAME);
            }

            console.log(result.data);
            $("#empSeq").val(result.data.APPLY_SEQ);
            $("#empName").val(result.data.EMP_NAME_KR);
            $("#deptName").val(result.data.DEPT_NAME2);

            if(result.data.SUBHOLIDAY_CODE_ID == "11"){
                $("#edtHolidayAlternativeDate_3").val(result.data.SUBHOLIDAY_ALTERNATIVE_DAY);
                $("#edtHolidayWorkDay_3").val(result.data.SUBHOLIDAY_WORK_DAY);
                $("#edtHolidayStartHourTop_3").val(result.data.SUBHOLIDAY_ST_TIME);
                $("#edtHolidayEndHourTop_3").val(result.data.SUBHOLIDAY_EN_TIME);
            }else if(result.data.SUBHOLIDAY_CODE_ID == "9"){
                $("#edtHolidayWorkDay_3").val(result.data.SUBHOLIDAY_WORK_DAY);

                $("#edtHolidayStartDateTop_2").val(result.data.SUBHOLIDAY_ST_DT);
                $("#edtHolidayStartHourTop_2").val(result.data.SUBHOLIDAY_ST_TIME);
                $("#edtHolidayEndDateTop_2").val(result.data.SUBHOLIDAY_EN_DT);
                $("#edtHolidayEndHourTop_2").val(result.data.SUBHOLIDAY_EN_TIME);
                $("#other_reason").val(result.data.RMK_OTHER);
            }else{
                $("#edtHolidayStartDateTop_1").val(result.data.SUBHOLIDAY_ST_DT);
                $("#edtHolidayStartHourTop_1").val(result.data.SUBHOLIDAY_ST_TIME);
                $("#edtHolidayEndDateTop_1").val(result.data.SUBHOLIDAY_EN_DT);
                $("#edtHolidayEndHourTop_1").val(result.data.SUBHOLIDAY_EN_TIME);
                $("#other_reason").val(result.data.RMK_OTHER);
            }

            $("#holiday_reason").val(result.data.RMK);
            $("#now_date").val(result.data.SAVE_DT);

            if(result.data.APPR_STAT === "Y" || result.data.APPR_STAT === "C"){
                $("#saveBtn").hide();

                $("#edtHolidayKindTop").data("kendoDropDownList").enable(false);

                if(result.data.SUBHOLIDAY_CODE_ID == "11"){
                    $("#edtHolidayAlternativeDate_3").data("kendoDatePicker").enable(false);
                    $("#edtHolidayWorkDay_3").data("kendoDatePicker").enable(false);
                    $("#edtHolidayStartHourTop_3").data("kendoTimePicker").enable(false);
                    $("#edtHolidayEndHourTop_3").data("kendoTimePicker").enable(false);
                    $("#resetBtn").hide()
                }else if(result.data.SUBHOLIDAY_CODE_ID == "9") {
                    $("#searchBtn").hide();
                    $("#otherEmpSearchBtn").hide();
                    $("#selectResetBtn").hide();

                    $("#edtHolidayStartDateTop_2").data("kendoDatePicker").enable(false);
                    $("#edtHolidayStartHourTop_2").data("kendoTimePicker").enable(false);
                    $("#edtHolidayEndDateTop_2").data("kendoDatePicker").enable(false);
                    $("#edtHolidayEndHourTop_2").data("kendoTimePicker").enable(false);
                    $("#other_emp").attr("disabled", "disabled");
                }else{
                    $("#otherEmpSearchBtn").hide();
                    $("#selectResetBtn").hide();

                    $("#edtHolidayStartDateTop_1").data("kendoDatePicker").enable(false);
                    $("#edtHolidayStartHourTop_1").data("kendoTimePicker").enable(false);
                    $("#edtHolidayEndDateTop_1").data("kendoDatePicker").enable(false);
                    $("#edtHolidayEndHourTop_1").data("kendoTimePicker").enable(false);

                    $("#other_emp").attr("disabled", "disabled");
                }

                $("#other_reason").attr("disabled", "disabled");
                $("#holiday_reason").attr("disabled", "disabled");
            }
        }
    }
}

