var now = new Date();
var docContent = "";

var check;
var subHolidayReqPop = {
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
        code: "",

        holidayData: new Object(),
    },

    fn_defaultScript: function(){
        window.resizeTo(1030, 850);
        var data = {
            mcCode : subHolidayReqPop.global.mcCode,
            mdCode : subHolidayReqPop.global.mdCode,
            empSeq : subHolidayReqPop.global.empSeq
        }

        subHolidayReqPop.global.vacGubun = customKendo.fn_customAjax("/subHoliday/getVacCodeList", data);

        subHolidayReqPop.fn_defaultScriptTopTable();
        subHolidayReqPop.dataSet();

        $("#erpEmpCd, #empName, #deptName, #dutyName").kendoTextBox({
            enable: false
        });

        $("#holiday_reason").kendoTextBox();
        $("#other_reason").kendoTextBox();
        $("#other_emp").kendoTextBox();

        if($("#vacUseHistId").val() != ""){
            subHolidayReqPop.getVacUseHistoryOne();
        }

        //캠도큐먼트 양식목록에서 기안시 처리작업
        subHolidayReqPop.global.code = $("#code").val();
        subHolidayReqPop.global.type = $("#type").val();
        if(subHolidayReqPop.global.code == "11"){
            $("#edtHolidayKindTop").data("kendoDropDownList").value(subHolidayReqPop.global.code);
            subHolidayReqPop.dataSetChange();
            $("#edtHolidayKindTop").data("kendoDropDownList").enable(false);
        }


        if($("#mode").val() != "mng"){
            subHolidayReqPop.fn_btnSet();
        }else{
            $(".request").hide();
        }
    },

    fn_btnSet: function(){
        let html = makeApprBtnHtml(subHolidayReqPop.global.holidayData, 'subHolidayReqPop.subHolidayDrafting("drafting")', "", "self");
        $("#holiApprBtnBox").html(html);
    },

    fn_vacEdtHolidaySaveModal: function(draftType){
        var flag = true;
        var startDay = $("#edtHolidayStartDateTop").val() + " " + $("#edtHolidayStartHourTop").val();
        var endDay = $("#edtHolidayEndDateTop").val() + " " + $("#edtHolidayEndHourTop").val();
        var chkVal = subHolidayReqPop.getApplyDateAttCheck(startDay, endDay);

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
        }else if (!$("#holiday_reason").val()) {
            alert("사유를 입력해주세요.");
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
                var monthStr = "00" + (subHolidayReqPop.global.now.getMonth()+1);
                var dayStr = "00" + subHolidayReqPop.global.now.getDate();
                var data = {
                    vacCodeId: $("#edtHolidayKindTop").val(),
                    applySeq: $("#empSeq").val(),
                    applyDate: subHolidayReqPop.global.now.getFullYear() + monthStr.substring(monthStr.length-2, monthStr.length) + dayStr.substring(dayStr.length-2, dayStr.length),
                    saveSeq: $("#empSeq").val(),
                    saveDate: subHolidayReqPop.global.now.getFullYear() + monthStr.substring(monthStr.length-2, monthStr.length) + dayStr.substring(dayStr.length-2, dayStr.length),
                    rmk: $("#holiday_reason").val(),
                    rmkOther : $("#other_reason").val(),
                    vacTargetSeq: $("#empSeq").val(),
                    otherEmp: $("#other_emp").val(),
                    otherEmpSeq : $("#other_emp_seq").val()
                }

                if(data.targetId == null || data.targetId == ""){
                    data.targetId = $("#targetId").val();
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

                if($("#edtHolidayKindTop").val() == 3 || $("#edtHolidayKindTop").val() == 4){
                    const dateA = new Date($("#edtHolidayStartDateTop_1").val().replace(/-/g, '/') +' '+ $("#edtHolidayStartHourTop_1").val()+':00');
                    const dateB = new Date($("#edtHolidayEndDateTop_1").val().replace(/-/g, '/') +' '+ $("#edtHolidayEndHourTop_1").val()+':00');
                    const diffMSec = dateB.getTime() - dateA.getTime();
                    const diffHour = diffMSec / (60 * 60 * 1000);
                    console.log('시간의 차이는 '+diffHour+'시간 입니다.');

                    if($("#edtHolidayKindTop").val() == 3 && diffHour > 5){
                        alert("오전반차는 5시간 초과 신청이 불가합니다."); return;
                    }

                    if($("#edtHolidayKindTop").val() == 4 && diffHour > 4){
                        alert("오후반차는 4시간 초과 신청이 불가합니다."); return;
                    }
                }

                if($("#edtHolidayKindTop").val() != 11) {
                    var result = customKendo.fn_customAjax('/subHoliday/getHolidayList', {});
                    var firstDate;
                    var secondDate;
                    var holidayCnt = 0;
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

                    while(true) {
                        var temp_date = firstDateObj;
                        if(temp_date.getTime() > secondDateObj.getTime() || $("#edtHolidayKindTop").val() == "8") {
                            break;
                        } else {
                            var tmp = temp_date.getDay();
                            var hday = result.rs.find(e => new Date(e.hday.split("-")[0], e.hday.split("-")[1]-1, e.hday.split("-")[2], "00", "00", "00").getTime() == temp_date.getTime());

                            if(tmp == 0 || tmp == 6 || hday) {
                                holidayCnt++;
                            }
                            temp_date.setDate(firstDateObj.getDate() + 1);
                        }
                    }
                    data.useDay = Math.floor(betweenTime / (1000 * 60 * 60 * 24)+1) - holidayCnt;

                    if($("#edtHolidayKindTop").val() == 3 || $("#edtHolidayKindTop").val() == 4) {
                        if(Math.floor(betweenTime / (1000 * 60 * 60 * 24)+1) - holidayCnt == 0){
                            data.useDay = 0;
                        }else{
                            data.useDay = 0.5;
                        }
                    }
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
                    /** 재상신일때 formId 체크해서 업데이트 */
                    if(subHolidayReqPop.global.holidayData != null && subHolidayReqPop.global.holidayData.DOC_ID != null){

                        let formId = "88";
                        const subHolidayCodeId = $("#edtHolidayKindTop").val();

                        /** 연차, 반가 */
                        if(subHolidayCodeId == 1 || subHolidayCodeId == 3 || subHolidayCodeId == 4) {
                            formId = "88";

                            /** 병가, 공가, 경조휴가, 대체휴가, 근속포상휴가 */
                        }else if(subHolidayCodeId == 5 || subHolidayCodeId == 6 || subHolidayCodeId == 7 || subHolidayCodeId == 9 || subHolidayCodeId == 10) {
                            formId = "189";

                            /** 출산휴가 */
                        }else if(subHolidayCodeId == 8) {
                            formId = "190";
                        }

                        customKendo.fn_customAjax("/approval/setFormIdUpd", {
                            docId : subHolidayReqPop.global.holidayData.DOC_ID,
                            formId : formId
                        });
                    }

                    alert("신청 데이터 저장이 완료되었습니다.");

                    if($("#type").val() == "request"){
                        opener.subHolidayList.gridReload();
                    }
                    location.href = "/subHoliday/pop/subHolidayReqPop.do?subholidayUseId=" + rs.vacUseHistId;
                },
                error: function () {
                    alert("신청 데이터 저장 중 에러가 발생했습니다.");
                }
            });
        }
    },

    subHolidayDrafting : function(){
        $("#subHolidayDraftFrm").one("submit", function() {
            var url = "/popup/subHoliday/approvalFormPopup/subHolidayApprovalPop.do";
            var name = "_self";
            var option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=yes, scrollbars = yes, status=no, top=50, left=50"
            var popup = window.open(url, name, option);
            this.action = "/popup/subHoliday/approvalFormPopup/subHolidayApprovalPop.do";
            this.method = 'POST';
            this.target = '_self';
        }).trigger("submit");
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

        var ds = subHolidayReqPop.global.vacGubun;
        console.log(ds);
        ds.list.unshift({"SUBHOLIDAY_DT_CODE_NM" : "선택", "SUBHOLIDAY_CODE_ID" : ""});
        $("#edtHolidayKindTop").kendoDropDownList({
            dataSource : ds.list,
            dataTextField: "SUBHOLIDAY_DT_CODE_NM",
            dataValueField: "SUBHOLIDAY_CODE_ID",
            change : function(){
                subHolidayReqPop.dataSetChange();
                /*if(this.value() != ''){
                    subHolidayReqPop.fn_getEmpWorkPlan(this.value());
                }else{
                    subHolidayReqPop.fn_topTableClear();
                }*/
            }
        });

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
                '                        <td style="text-align: center"><input type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" value="초기화" onclick="" id="resetBtn"/></td>\n' +
                '                      </tr>\n' +
                '                  </table>\n' +
                '                </td>\n' +
                '              </tr>\n' +
                '              <tr>\n' +
                '                <th scope="row" class="text-center th-color"><span class="red-star">*</span>사유</th>\n' +
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
            subHolidayReqPop.dataSet();

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

        }else if($("#edtHolidayKindTop").val() == 9) {
            var html2 = '<table class="table table-bordered mb-0" id="holidayPlanReqPopTbVal">\n' +
                '              <colgroup>\n' +
                '                <col width="15%">\n' +
                '                <col width="35%">\n' +
                '                <col width="15%">\n' +
                '                <col width="35%">\n' +
                '              </colgroup>\n' +
                '              <thead>\n' +
                '              <tr>\n' +
                '                <th>휴일 근로 일자</th>\n' +
                '                <td colspan="3">\n' +
                '                  <input id="edtHolidayWorkDay_3" style="width:20%; margin-right:5px;">\n' +
                '                  <input type="hidden" id="hisPk" name="hisPk" value="">\n' +
                '                   <button class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="subHolidayReqPop.searchHolidayPop();" type="button" id="searchBtn"><i class="fa fa-search"></i></button>\n' +
                '                </td>\n' +
                '              </tr>\n' +
                '              <tr>\n' +
                '                <th>기간</th>\n' +
                '                <td colspan="3">\n' +
                '                    <input type="text" id="edtHolidayStartDateTop_2" name="edtHolidayStartDateTop_2" data-bind="value:start" style="width: 20%;">\n' +
                '                    <input type="text" id="edtHolidayStartHourTop_2" name="edtHolidayStartHourTop_2" className="timeInput" data-bind="value:start" style="width: 10%;">\n' +
                '                    <span style="width: 9%;"> ~ </span>\n' +
                '                    <input type="text" id="edtHolidayEndDateTop_2" name="edtHolidayEndDateTop_2" data-bind="value:end" style="width: 20%;">\n' +
                '                    <input type="text" id="edtHolidayEndHourTop_2" name="edtHolidayEndHourTop_2" className="timeInput" data-bind="value:end" style="width: 10%;">\n' +
                '                   <table style="width:100%; margin-top:5px; text-align:center;">\n' +
                '                      <tr style="background-color:#d8dce36b;">\n' +
                '                        <th rowspan="2">근무시간유형</th>\n' +
                '                        <th>시차출근A</th>\n' +
                '                        <th>기본</th>\n' +
                '                        <th>시차출근B</th>\n' +
                '                        <th>시차출근C</th>\n' +
                '                      </tr>\n' +
                '                      <tr style="background-color:#d8dce36b;">\n' +
                '                        <th>08:00 ~ 17:00</th>\n' +
                '                        <th>09:00 ~ 18:00</th>\n' +
                '                        <th>10:00 ~ 19:00</th>\n' +
                '                        <th>14:00 ~ 22:30</th>\n' +
                '                      </tr>\n' +
                '                      <tr style="background-color:#fff;">\n' +
                '                        <td>오전반차</td>\n' +
                '                        <td>08:00 ~ 13:00</td>\n' +
                '                        <td>09:00 ~ 14:00</td>\n' +
                '                        <td>10:00 ~ 15:00</td>\n' +
                '                        <td>-</td>\n' +
                '                      </tr>\n' +
                '                      <tr style="background-color:#fff;">\n' +
                '                        <td>오후반차</td>\n' +
                '                        <td>13:00 ~ 17:00</td>\n' +
                '                        <td>14:00 ~ 18:00</td>\n' +
                '                        <td>15:00 ~ 19:00</td>\n' +
                '                        <td>14:00 ~ 18:00</td>\n' +
                '                      </tr>\n' +
                '                  </table>\n' +
                '                </td>\n' +
                '              </tr>\n' +
                '              <tr>\n' +
                '                <th scope="row" class="text-center th-color"><span class="red-star">*</span>사유</th>\n' +
                '                <td colspan="3">\n' +
                '                  <textarea name="holiday_reason" id="holiday_reason" rows="5" <!--style="width:100%; border: 1px solid #eee;padding-left: 10px;-->"></textarea>\n' +
                '                </td>\n' +
                '              </tr>\n' +
                '              <tr>\n' +
                '                <th scope="row" class="text-center th-color">기타사항<br>(인수인계 등)</th>\n' +
                '                <td colspan="3">\n' +
                '                  <textarea name="other_reason" id="other_reason" rows="5" style="width:100%; /*border: 1px solid #eee;padding-left: 10px;*/"></textarea>\n' +
                '                </td>\n' +
                '              </tr>\n' +
                '              <tr>\n' +
                '                <th scope="row" class="text-center th-color">업무인수자</th>\n' +
                '                <td colspan="3">\n' +
                '                  <input type="text" id="other_emp" name="other_emp" class="defaultVal" style="width: 30%;">\n' +
                '                  <input type="hidden" id="other_emp_seq" name="other_emp_seq" class="defaultVal">\n' +
                '                  <input type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" value="검색" onclick="fn_userMultiSelectPop()" id="otherEmpSearchBtn"/>\n' +
                '                  <input type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" value="선택 초기화" onclick="subHolidayReqPop.dataClear()" id="selectResetBtn"/>\n' +
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
            $("#holidayPlanReqPopTbVal").html(html2);
            subHolidayReqPop.dataSet();

            $("#holiday_reason").kendoTextBox();
            $("#other_reason").kendoTextBox();
            $("#other_emp").kendoTextBox();

            var data = "-"; // 적절한 값으로 초기화합니다.
            function sendMeData(data) {
                console.log(data);
                document.getElementById("edtHolidayWorkDay_3").innerHTML = data;
                return data; // 값을 반환합니다.
            }

            var result = sendMeData(data);
            $("#edtHolidayWorkDay_3").kendoTextBox({
                value: result,
                enable: false
            });

            $("#edtHolidayStartDateTop_2").kendoDatePicker({
                culture : "ko-KR",
                format : "yyyy-MM-dd",
                interval : 1,
                value : new Date(),
                //min : new Date(holiAnnLv.global.year, holiAnnLv.global.month, holiAnnLv.global.date),
                change : function(){
                    var startDate = new Date(this.value());
                    var endDate = new Date($("#edtHolidayEndDateTop_2").val());
                    if(startDate > endDate){
                        $("#edtHolidayEndDateTop_2").data("kendoDatePicker").value($("#edtHolidayStartDateTop_2").val());
                    }
                    /*subHolidayReqPop.fn_getEmpWorkPlan($("#edtHolidayKindTop").val());*/
                }
            });

            $("#edtHolidayStartHourTop_2").kendoTimePicker({
                culture : "ko-KR",
                format : "HH:mm",
                interval : 10,
                value : "09:00",
                change : function(e){
                    var startTime = new Date(this.value());
                    var endTime = new Date($("#edtHolidayEndHourTop_2").val());
                    if(startTime > endTime){
                        $("#edtHolidayEndHourTop_2").data("kendoTimePicker").value($("#edtHolidayStartHourTop_2").val());
                    }
                    /*subHolidayReqPop.fn_getEmpWorkPlanTimeModal($("#edtHolidayKindTop").val());*/
                }
            });

            $("#edtHolidayEndDateTop_2").kendoDatePicker({
                culture : "ko-KR",
                format : "yyyy-MM-dd",
                interval : 1,
                value : new Date(),
                //min : new Date(holiAnnLv.global.year, holiAnnLv.global.month, holiAnnLv.global.date),
                change : function(){
                    var startDate = new Date($("#edtHolidayStartDateTop_2").val());
                    var endDate = new Date(this.value());
                    if(startDate > endDate){
                        $("#edtHolidayStartDateTop_2").data("kendoDatePicker").value($("#edtHolidayEndDateTop_2").val());
                    }
                    /*subHolidayReqPop.fn_getEmpWorkPlanTimeModal($("#edtHolidayKindTop").val());*/
                }
            });
            $("#edtHolidayEndHourTop_2").kendoTimePicker({
                culture : "ko-KR",
                format : "HH:mm",
                interval : 10,
                value : "18:00",
                change : function(e){
                    var startTime = new Date($("#edtHolidayStartTimeModal_2").val());
                    var endTime = new Date(this.value());
                    if(startTime > endTime){
                        $("#edtHolidayStartHourTop_2").data("kendoTimePicker").value($("#edtHolidayEndHourTop_2").val());
                    }
                    /*subHolidayReqPop.fn_getEmpWorkPlanTimeModal($("#edtHolidayKindTop").val());*/
                }
            });
        }else {
            var html3 = '<table class="table table-bordered mb-0" id="holidayPlanReqPopTbVal">\n' +
                '              <colgroup>\n' +
                '                <col width="15%">\n' +
                '                <col width="35%">\n' +
                '                <col width="15%">\n' +
                '                <col width="35%">\n' +
                '              </colgroup>\n' +
                '              <thead>\n' +
                '              <tr>\n' +
                '                <th>기간</th>\n' +
                '                <td colspan="3">\n' +
                '                    <input type="text" id="edtHolidayStartDateTop_1" name="edtHolidayStartDateTop_1" data-bind="value:start" style="width: 20%;">\n' +
                '                    <input type="text" id="edtHolidayStartHourTop_1" name="edtHolidayStartHourTop_1" className="timeInput" data-bind="value:start" style="width: 10%;">\n' +
                '                    <span style="width: 9%;"> ~ </span>\n' +
                '                    <input type="text" id="edtHolidayEndDateTop_1" name="edtHolidayEndDateTop_1" data-bind="value:end" style="width: 20%;">\n' +
                '                    <input type="text" id="edtHolidayEndHourTop_1" name="edtHolidayEndHourTop_1" className="timeInput" data-bind="value:end" style="width: 10%;">\n' +
                '                  <table style="width:100%; margin-top:5px; text-align:center;">\n' +
                '                      <tr style="background-color:#d8dce36b;">\n' +
                '                        <th rowspan="2">근무시간유형</th>\n' +
                '                        <th>시차출근A</th>\n' +
                '                        <th>기본</th>\n' +
                '                        <th>시차출근B</th>\n' +
                '                        <th>시차출근C</th>\n' +
                '                      </tr>\n' +
                '                      <tr style="background-color:#d8dce36b;">\n' +
                '                        <th>08:00 ~ 17:00</th>\n' +
                '                        <th>09:00 ~ 18:00</th>\n' +
                '                        <th>10:00 ~ 19:00</th>\n' +
                '                        <th>14:00 ~ 22:30</th>\n' +
                '                      </tr>\n' +
                '                      <tr style="background-color:#fff;">\n' +
                '                        <td>오전반차</td>\n' +
                '                        <td>08:00 ~ 13:00</td>\n' +
                '                        <td>09:00 ~ 14:00</td>\n' +
                '                        <td>10:00 ~ 15:00</td>\n' +
                '                        <td>-</td>\n' +
                '                      </tr>\n' +
                '                      <tr style="background-color:#fff;">\n' +
                '                        <td>오후반차</td>\n' +
                '                        <td>13:00 ~ 17:00</td>\n' +
                '                        <td>14:00 ~ 18:00</td>\n' +
                '                        <td>15:00 ~ 19:00</td>\n' +
                '                        <td>14:00 ~ 18:00</td>\n' +
                '                      </tr>\n' +
                '                  </table>\n' +
                '                </td>\n' +
                '              </tr>\n' +
                '              <tr>\n' +
                '                <th scope="row" class="text-center th-color"><span class="red-star">*</span>사유</th>\n' +
                '                <td colspan="3">\n' +
                '                  <textarea name="holiday_reason" id="holiday_reason" rows="5" <!--style="width:100%; border: 1px solid #eee;padding-left: 10px;-->"></textarea>\n' +
                '                </td>\n' +
                '              </tr>\n' +
                '              <tr>\n' +
                '                <th scope="row" class="text-center th-color">기타사항<br>(인수인계 등)</th>\n' +
                '                <td colspan="3">\n' +
                '                  <textarea name="other_reason" id="other_reason" rows="5" style="width:100%; /*border: 1px solid #eee;padding-left: 10px;*/"></textarea>\n' +
                '                </td>\n' +
                '              </tr>\n' +
                '              <tr>\n' +
                '                <th scope="row" class="text-center th-color">업무인수자</th>\n' +
                '                <td colspan="3">\n' +
                '                  <input type="text" id="other_emp" name="other_emp" class="defaultVal" style="width: 20%;">\n' +
                '                  <input type="hidden" id="other_emp_seq" name="other_emp_seq" class="defaultVal">\n' +
                '                  <input type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" value="검색" onclick="fn_userMultiSelectPop()" id="otherEmpSearchBtn"/>\n' +
                '                  <input type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" value="선택 초기화" onclick="subHolidayReqPop.dataClear()" id="selectResetBtn"/>\n' +
                '                  <br>\n' +
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
            $("#holidayPlanReqPopTbVal").html(html3);
            subHolidayReqPop.dataSet();

            $("#holiday_reason").kendoTextBox();
            $("#other_reason").kendoTextBox();
            $("#other_emp").kendoTextBox();

            $("#edtHolidayStartDateTop_1").kendoDatePicker({
                culture : "ko-KR",
                format : "yyyy-MM-dd",
                interval : 1,
                value : new Date(),
                //min : new Date(holiAnnLv.global.year, holiAnnLv.global.month, holiAnnLv.global.date),
                change : function(){
                    var startDate = new Date(this.value());
                    var endDate = new Date($("#edtHolidayEndDateTop_1").val());
                    if(startDate > endDate){
                        $("#edtHolidayEndDateTop_1").data("kendoDatePicker").value($("#edtHolidayStartDateTop_1").val());
                    }
                    /*subHolidayReqPop.fn_getEmpWorkPlan($("#edtHolidayKindTop").val());*/
                }
            });

            $("#edtHolidayStartHourTop_1").kendoTimePicker({
                culture : "ko-KR",
                format : "HH:mm",
                interval : 10,
                value : "09:00",
                change : function(e){
                    var startTime = new Date(this.value());
                    var endTime = new Date($("#edtHolidayEndHourTop_1").val());
                    if(startTime > endTime){
                        $("#edtHolidayEndHourTop_1").data("kendoTimePicker").value($("#edtHolidayStartHourTop_1").val());
                    }
                    /*subHolidayReqPop.fn_getEmpWorkPlanTimeModal($("#edtHolidayKindTop").val());*/
                }
            });

            $("#edtHolidayEndDateTop_1").kendoDatePicker({
                culture : "ko-KR",
                format : "yyyy-MM-dd",
                interval : 1,
                value : new Date(),
                //min : new Date(holiAnnLv.global.year, holiAnnLv.global.month, holiAnnLv.global.date),
                change : function(){
                    var startDate = new Date($("#edtHolidayStartDateTop_1").val());
                    var endDate = new Date(this.value());
                    if(startDate > endDate){
                        $("#edtHolidayStartDateTop_1").data("kendoDatePicker").value($("#edtHolidayEndDateTop_1").val());
                    }
                    /*subHolidayReqPop.fn_getEmpWorkPlanTimeModal($("#edtHolidayKindTop").val());*/
                }
            });
            $("#edtHolidayEndHourTop_1").kendoTimePicker({
                culture : "ko-KR",
                format : "HH:mm",
                interval : 10,
                value : "18:00",
                change : function(e){
                    var startTime = new Date($("#edtHolidayStartTimeModal_1").val());
                    var endTime = new Date(this.value());
                    if(startTime > endTime){
                        $("#edtHolidayStartHourTop_1").data("kendoTimePicker").value($("#edtHolidayEndHourTop_1").val());
                    }
                    /*subHolidayReqPop.fn_getEmpWorkPlanTimeModal($("#edtHolidayKindTop").val());*/
                }
            });
        }

        if($("#edtHolidayKindTop").val() == 3){
            $("#edtHolidayStartHourTop_1").val("09:00");
            $("#edtHolidayEndHourTop_1").val("14:00");
        }else if($("#edtHolidayKindTop").val() == 4){
            $("#edtHolidayStartHourTop_1").val("14:00");
            $("#edtHolidayEndHourTop_1").val("18:00");
        }

        subHolidayReqPop.dataClear()
    },

    searchHolidayPop : function() {
        var url = "/subHoliday/searchHolidayPop.do";
        var name = "searchHolidayPop";
        var option = "width=600, height=550, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    },

    sendMeData : function(request) {
        console.log(request);
        $("#targetId").val(request.SUBHOLIDAY_USE_ID);
        $("#edtHolidayWorkDay_3").val(request.SUBHOLIDAY_WORK_DAY);
        $("#holiday_reason").val("휴일 근로 일자 [" + request.SUBHOLIDAY_WORK_DAY + "]\n")
    },

    dataClear : function () {
        $("#other_emp").val("");
        $("#other_emp_seq").val("");

        if($("#vacUseHistId").val() != ""){
            var data = {
                approKey : 'camticHoliday_' + $("#vacUseHistId").val()
            }

            customKendo.fn_customAjax("/subHoliday/setDocReaderReset", data);
        }

    },

    getVacUseHistoryOne : function(){
        var result = customKendo.fn_customAjax("/subHoliday/getVacUseHistoryOne", {subholidayUseId : $("#vacUseHistId").val()});

        subHolidayReqPop.global.holidayData = result.data;

        if(result.flag){
            $("#edtHolidayKindTop").data("kendoDropDownList").value(result.data.SUBHOLIDAY_CODE_ID);
            $("#edtHolidayKindTop").data("kendoDropDownList").trigger("change");

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
                $("#other_emp").val(result.data.OHTER_EMP);
                $("#other_emp_seq").val(result.data.OTHER_EMP_SEQ);
                $("#targetId").val(result.data.TARGET_ID);
            }else{
                $("#edtHolidayStartDateTop_1").val(result.data.SUBHOLIDAY_ST_DT);
                $("#edtHolidayStartHourTop_1").val(result.data.SUBHOLIDAY_ST_TIME);
                $("#edtHolidayEndDateTop_1").val(result.data.SUBHOLIDAY_EN_DT);
                $("#edtHolidayEndHourTop_1").val(result.data.SUBHOLIDAY_EN_TIME);
                $("#other_reason").val(result.data.RMK_OTHER);
                $("#other_emp").val(result.data.OHTER_EMP);
                $("#other_emp_seq").val(result.data.OTHER_EMP_SEQ);
            }

            $("#holiday_reason").val(result.data.RMK);
            $("#now_date").val(result.data.SAVE_DT);

            const empInfo = customKendo.fn_customAjax("/user/getUserInfo", {empSeq: result.data.APPLY_SEQ});

            console.log(empInfo);
            if(empInfo != null){
                $("#empSeq").val(empInfo.EMP_SEQ);
                $("#erpEmpCd").val(empInfo.ERP_EMP_SEQ);
                $("#empName").val(empInfo.EMP_NAME_KR);
                $("#deptName").val(empInfo.DEPT_NAME);
                let spot = ""
                if(empInfo.DUTY_NAME != null && empInfo.DUTY_NAME != ""){
                    spot = empInfo.DUTY_NAME;
                }else{
                    spot = empInfo.POSITION_NAME;
                }
                $("#dutyName").val(spot);
            }


            if(result.data.APPR_STAT != "N" && result.data.APPR_STAT != "E"){
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
                $("#other_emp").attr("disabled", "disabled");
                $("#holiday_reason").attr("disabled", "disabled");
            }
        }
    }
}

