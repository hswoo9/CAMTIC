/**
 * 2022.06.28 by. deer
 * 마이페이지 > 결재 > 부재설정(팝업)
 *
 * function / global variable / local variable setting
 */
var absentSetPop = {
    global : {
        code : "",
        params : "",
        _g_compSeq : "",
        _g_deptSeq : $("#dept_seq").val(),
        isModify : false,
        absenceType : "",
        selectComp : "",

        searchAjaxData : "",
        saveAjaxData : "",
    },

    fnDefaultScript : function(params){
        absentSetPop.global.params = params;
        absentSetPop.global._g_compSeq = params.compSeq;
        absentSetPop.global.absenceType = params.absenceType;
        absentSetPop.global.selectComp = params.comp_seq || "";

        var now = new Date();
        var nowYear = now.getFullYear();
        var nowMonth = now.getMonth();
        var nowDay = now.getDate();

        absentSetPop.global.searchAjaxData = {
            langCode : absentSetPop.global.params.langCode,
            group_seq : absentSetPop.global.params.group_seq,
        }

        customKendo.fn_textBox(['absenceMemo']);

        $("#aisday").kendoDatePicker({
            size : "small",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            min : new Date(nowYear, nowMonth, nowDay),
            value : now,
        });

        $("#aistime").kendoTimePicker({
            format: "HH:mm",
            interval : 10,
            value: "09:00"
        });

        $("#aieday").kendoDatePicker({
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            min : new Date(nowYear, nowMonth, nowDay),
            value : now,
        });

        $("#aietime").kendoTimePicker({
            format: "HH:mm",
            interval : 10,
            value : "18:00"
        });

        $("#aisday, #aistime, #aieday, #aietime").attr("readonly", true);

        absentSetPop.global.searchAjaxData = {
            cmGroupCodeId : "23"
        }

        var result = customKendo.fn_customAjax("/system/commonCodeManagement/getCmCodeList", absentSetPop.global.searchAjaxData);

        if(result.flag){
            customKendo.fn_dropDownList("absenceCode", result, "CM_CODE_NM", "CM_CODE", 2);
        }

        $('#manual').kendoCheckBox({
            checked: false,
            label: "수동해제 사용시 체크",
            change : this.manualCheckedAlert
        });

        $("#rdo_01").kendoRadioGroup({
            items: [
                { label : "사용", value : "1" },
                { label : "미사용", value : "0" }
            ],
            layout : "horizontal",
            labelPosition : "after",
            value : "1",
        }).data("kendoRadioGroup");

        absentSetPop.initBtn();
        absentSetPop.initData();

        if(absentSetPop.global.absenceType == 'USER'){
            $("#absenceBtn").hide();
            if(!$("#absentSeq").val()){
                absentSetPop.global.isModify = false;
            }
        }
    },

    setComSearText : function(){
        //부재자
        $("#absenceTxt").val('');
        $("#absenceSeq").val('');
        $("#deptSeq").val('');
        //대결자
        $("#absentTxt").val('');
        $("#absentSeq").val('');
        $("#viDeptSeq").val('');

        absentSetPop.global.selectComp = this.value();
    },

    initData : function(){
        if(absentSetPop.global.params.c_aistatus == '1'){  // 부재중
            $('#manual').prop("disabled", false);
            $("#btnDel").hide();  // 삭제 버튼 미노출
        }
        if(absentSetPop.global.params.c_viuserkey){
            absentSetPop.global.isModify = true;
            $("#com_sear_td").html(absentSetPop.global.params.compName);
            $("#absenceTxt_td").html(absentSetPop.global.params.emp_name);
            $("#absenceTxt").hide();
            $("#absenceBtn").hide();
            $("#absenceSeq").val(absentSetPop.global.params.emp_seq);
            $("#oriAbsenceSeq").val(absentSetPop.global.params.emp_seq);
            $("#deptSeq").val(absentSetPop.global.params.dept_seq);
            $("#oriDeptSeq").val(absentSetPop.global.params.dept_seq);
            $("#c_aiseqnum").val(absentSetPop.global.params.c_aiseqnum);
            $("#absenceCode").data("kendoDropDownList").value(absentSetPop.global.params.c_cikeycode);
            $("#absentTxt").val(absentSetPop.global.params.c_viusername);
            $("#absentSeq").val(absentSetPop.global.params.c_viuserkey);
            $("#viDeptSeq").val(absentSetPop.global.params.c_viorgcode);
            $("#absenceMemo").val(absentSetPop.global.params.c_aimemo);
            $("#aisday").val(absentSetPop.global.params.c_aisday);
            $("#aistime").val(absentSetPop.global.params.c_aistime);
            $("#aieday").val(absentSetPop.global.params.c_aieday);
            $("#aietime").val(absentSetPop.global.params.c_aietime);
            // var aisday = absentSetPop.global.params.c_aisday;
            // var aistime = absentSetPop.global.params.c_aistime;
            // var aieday = absentSetPop.global.params.c_aieday;
            // var aietime = absentSetPop.global.params.c_aietime;
            // $("#aisday").val(aisday);
            // $("#aieday").val(aieday);


            $("#rdo_01").getKendoRadioGroup().value(absentSetPop.global.params.c_aialim);
            $("#mainTxt").html("부재수정");
            // if(aistime){
            //     if(aistime.split(':').length > 0){
            //         $("#aistime").val(aistime.split(':')[0]);
            //     }
            // }
            // if(aietime){
            //     if(aietime.split(':').length > 0){
            //         $("#aietime").val(aietime.split(':')[0]);
            //     }
            // }

            if(!absentSetPop.global.params.c_aistatus){ // 부재 종류
                $("#btnSave").hide();   // 저장버튼 미노출
                $("#manual").prop("disabled", true); // 수동해제 불가
            }

            if(absentSetPop.global.params.c_aistatus == '1'){	//부재중일때는 시작시간은 disabled
                $("#aisday").prop("disabled", true);	//시작일시는 disabled
                $("#aistime").prop("disabled", true);
            }
            if(absentSetPop.global.params.c_aistatus == '2'){
                $("#btnDel").show();  // 부재예약 삭제 가능
            }

            if(!absentSetPop.global.params.c_aistatus && (absentSetPop.global.params.c_aiflag == '0' || absentSetPop.global.params.c_aiflag == '1')){	//view시
                $("#mainTxt").html("부재보기");
                var absence_text =  $("#absenceCode").data("kendoDropDownList").text();
                $("#absenceCode_td").html(absence_text);
                $("#aisday_td").html(absentSetPop.global.params.c_aisday + " " +absentSetPop.global.params.c_aistime +
                    " ~ " + absentSetPop.global.params.c_aieday + " " + absentSetPop.global.params.c_aietime);
                $("#absentTxt_td").html(absentSetPop.global.params.c_viusername);
                if(absentSetPop.global.params.c_aiflag == '1'){
                    $("#manual_td").html("수동해제 " + "(" + absentSetPop.global.params.c_mday + " " + absentSetPop.global.params.c_mtime + ")");
                }else{
                    $("#manual_td").html("자동해제");
                }

                //알림사용 text로 변경
                var alim = $("label[for='" +$("input[name='rdo_01']:checked").attr("id")+"']").text();
                $("#c_aialim_td").html(alim + '<span style="font-size: 12px;color: #058df5;float: right;margin-top: 9px;">' +
                    ' 사용 시 대결 시작일시에 대결자에게 알림 제공</span>');
                $("#absenceMemo").closest("td").text("비고입력란");
                $("#btnDel").hide();
                $("#btnCancel").hide();
                $("#btnClose").show();
            }
        }else{	//신규등록시
            //알람 기본 사용
            $("#rdo_01").data("kendoRadioGroup").value(1);

            if(absentSetPop.global.absenceType == 'USER'){
                $("#com_sear_td").html(absentSetPop.global.params.compName);
                $("#absenceTxt").val(absentSetPop.global.params.emp_name);
                $("#absenceTxt_td").html(absentSetPop.global.params.emp_name);
                $("#absenceTxt").hide();
                $("#absenceBtn").hide();
                $("#absenceSeq").val(absentSetPop.global.params.emp_seq);
                $("#oriAbsenceSeq").val(absentSetPop.global.params.emp_seq);
                $("#deptSeq").val(absentSetPop.global.params.dept_seq);
                $("#oriDeptSeq").val(absentSetPop.global.params.dept_seq);
                $("#c_aiseqnum").val(absentSetPop.global.params.c_aiseqnum);
            }

            $("#aistime").val("09:00");
            $("#aietime").val("18:00");
        }

        return;
    },

    initBtn : function(){
        $("#btnSave").click(function () {
            absentSetPop.startAbsence('EDIT_ABSENT');
        });

        $("#btnCancel").click(function () {
            if(confirm("취소 하시겠습니까?")){
                opener.parent.absentSet.gridReload();
                window.close();
            }
        });

        $("#btnClose").click(function () {
            window.close();
        });
        $("#btnClose").hide();

        $("#btnDel").click(function () {
            absentSetPop.setAbsenceDel();
        });

        var eday = absentSetPop.global.params.c_aieday;
        var etime = absentSetPop.global.params.c_aietime;
        if(eday){
            var d = new Date();
            var month = Number(eday.split('-')[1]) - 1;
            var day = Number(eday.split('-')[2]);
            var time = Number(etime.split(':')[0]);
            var ed = new Date(eday.split('-')[0], month, day, time);
            if(ed < d){
                $("#btnSave").hide();
                $("#manual").prop("disabled", true); // 수동해제 불가
            }
        }
        return;
    },

    setAbsenceDel : function(){
        absentSetPop.global.saveAjaxData = {
            c_aistatus : 'd',
            c_uiuserkey : $("#absenceSeq").val(),
            c_oiorgcode : $("#deptSeq").val(),
            c_aiseqnum : $("#c_aiseqnum").val(),
            oriAbsenceSeq : $("#absenceSeq").val(),
            oriDeptSeq : $("#deptSeq").val()
        }

        if(confirm("선택한 부재 설정 항목을 삭제 하시겠습니까?")){
            var result = customKendo.fn_customAjax("/absentSet/setAbsentInfoUpd.do", absentSetPop.global.saveAjaxData);

            if(result.flag){
                alert("삭제 되었습니다");
                opener.parent.absentSet.gridReload();
                window.close();
            }
        }
    },

    dateValidationCheck : function(sId, nId, changeId) {
        var sDt = new Date($("#" + sId).val());
        var nDt = new Date($("#" + nId).val());

        if (sDt > nDt) {
            if(sId == changeId){
                $("#" + sId).val($("#" + nId).val());
                $("#aistime").val("09:00");
                $("#aietime").val("18:00");
            }else{
                $("#" + nId).val($("#" + sId).val());
                $("#aistime").val("09:00");
                $("#aietime").val("18:00");
            }
        }
    },

    timeValidationCheck : function(st, nt, changeId) {
        var aisday = $("#aisday").val();
        var aieday = $("#aieday").val();
        var sday = new Date(aisday.split('-')[0],Number(aisday.split('-')[1])-1,aisday.split('-')[2]);
        var eday = new Date(aieday.split('-')[0],Number(aieday.split('-')[1])-1,aieday.split('-')[2]);

        var stime = Number($("#"+st).val().replace(":", ""));
        var etime = Number($("#"+nt).val().replace(":", ""));
        if(sday.getTime() == eday.getTime()){
            if(st == changeId){
                if(stime > etime){
                    $("#"+st).val(($("#"+nt).val().substr(0, 2) + ":" + $("#"+nt).val().substr(3)))
                }
            }else{
                if(stime > etime){
                    $("#"+nt).val(($("#"+st).val().substr(0, 2) + ":" + $("#"+st).val().substr(3)))
                }
            }
        }
    },

    isValid : function(arg){
        switch(arg){
            case 'EDIT_ABSENT':
                if(''==''){
                    if(!absentSetPop.global.params.c_viuserkey){
                        if (!$("#absenceSeq").val()){
                            alert("부재자를 선택 해주세요.");
                            return;
                        }
                        if (!$("#absentSeq").val()){
                            alert("대결자를 선택 해주세요.");
                            return;
                        }
                        if (!$("#absenceCode").val()){
                            alert("부재사유를 선택 해주세요.");
                            return;
                        }
                    }
                    if($("#absenceSeq").val() == $("#absentSeq").val()){
                        alert("부재자와 대결자가 같을수 없습니다.");
                        return;
                    }

                    var aisday = $("#aisday").val();
                    var aistime = $("#aistime").val();
                    var aieday = $("#aieday").val();
                    var aietime = $("#aietime").val();
                    var sday = new Date(aisday.split('-')[0],Number(aisday.split('-')[1])-1,aisday.split('-')[2]);
                    var eday = new Date(aieday.split('-')[0],Number(aieday.split('-')[1])-1,aieday.split('-')[2]);
                    if(sday > eday){
                        alert("시작일이 종료일보다 큽니다.\n날짜를 다시 확인 해 주세요.");
                        return false;
                    }
                    if(aisday == aieday && aistime > aietime){
                        alert("동일한 일자의 종료시간이 더 빠를수 없습니다.");
                        return false;
                    }

                }
                break;
        }
        return true;
    },

    setStatus : function(){
        var today = new Date();
        var aisday = $("#aisday").val();
        var smonth = Number(aisday.split('-')[1])-1;
        var aistme = $("#aistime").val();
        var startDay = new Date(aisday.split('-')[0], smonth, aisday.split('-')[2], aistme.split(':')[0], aistme.split(':')[1]);
        if(startDay > today){
            return '2';
        }else if(startDay <= today){
            return '1';
        }
    },

    startAbsence : function(arg){
        switch(arg){
            case 'EDIT_ABSENT' : //부재자 설정 변경
                if(!absentSetPop.isValid("EDIT_ABSENT")){
                    return;
                }

                var url = "/absentSet/setAbsentInfo.do";
                if(absentSetPop.global.isModify){
                    url = "/absentSet/setAbsentInfoUpd.do";
                }

                var c_aistatus = absentSetPop.setStatus();

                absentSetPop.global.searchAjaxData = {
                    compSeq : absentSetPop.global.selectComp,
                    c_uiuserkey : $("#absenceSeq").val(),
                    oriAbsenceSeq : $("#oriAbsenceSeq").val(),
                    c_oiorgcode : $("#deptSeq").val(),
                    oriDeptSeq : $("#oriDeptSeq").val(),
                    c_cikeycode : $("#absenceCode").val(),
                    c_aisday : $("#aisday").val(),
                    c_aistime : $("#aistime").val(),
                    c_aieday : $("#aieday").val(),
                    c_aietime : $("#aietime").val(), //분이 없어서 임시 00 처리
                    c_aimemo : $("#absenceMemo").val(),
                    c_aiseqnum : $("#c_aiseqnum").val(),
                    c_aistatus : c_aistatus,
                    //자동 부재 여부 0:자동 1:수동
                    manual : $("input[name=manual]").prop("checked"),
                    c_aialim : $("#rdo_01").data("kendoRadioGroup").value(),
                    c_viseqnum : '0000000001',   //현재 결재권한만 있어서 1로만 등록 테스트후 추후 적용시 max값으로 변경해야함
                    c_viorgcode : $("#viDeptSeq").val(),
                    c_viuserkey : $("#absentSeq").val(),
                    ori_c_viorgcode : $("#viorgCode").val(),
                    ori_c_viuserkey : $("#viuserKey").val(),
                    c_viauthority : 'apprv'   //추후 권한에 따라 변경해야함 현재 결재권한만 apprv로 정의
                }

                if($("input[name=manual]").prop("checked")){
                    absentSetPop.global.searchAjaxData.c_aiflag = '1';
                    absentSetPop.global.searchAjaxData.manual = $("#manual").prop("checked");
                    absentSetPop.global.searchAjaxData.c_aistatus = '';
                }else{
                    absentSetPop.global.searchAjaxData.c_aiflag = '0';
                }

                var result = customKendo.fn_customAjax(url, absentSetPop.global.searchAjaxData);

                if(result.flag){
                    if(result.MSG){
                        var viStr = "부재자의 부재기간이 중복되었습니다.";
                        var contentStr;
                        for(var i = 0; i < result.dupleList.length; i++){
                            var dl = result.dupleList[i];
                            contentStr += '부재자의 부재기간이 중복되었습니다.\n' +
                                '대결자 : ' + dl.EMP_NAME + '\n' +
                                '부재기간 : ' + dl.C_AISDAY + ' ~ ' + dl.C_AIEDAY;
                        }

                        alert(viStr);
                        return;
                    }

                    if($("#rdo_01").data("kendoRadioGroup").value() == '1' && !$("#manual").is(":checked")){	//알림 사용시
                        var today = new Date();
                        var dd = today.getDate();
                        var mm = today.getMonth() + 1; //January is 0!
                        var yyyy = today.getFullYear();
                        if(dd < 10) {
                            dd = '0' + dd
                        }
                        if(mm < 10) {
                            mm = '0' + mm
                        }
                        today = yyyy + '-' + mm + '-' + dd;

                        if(today <= $("#aisday").val()){
                            alert("저장 되었습니다.");
                            if(confirm("등록된 대결자에게 알림을 발송하시겠습니까?")){
                                absentSetPop.setAlarmEvent();
                            }
                            opener.parent.absentSet.gridReload();
                            window.close();
                        }else{
                            alert("저장 되었습니다.");
                            opener.parent.absentSet.gridReload();
                            window.close();
                        }
                    }else{
                        alert("저장 되었습니다.");
                        opener.parent.absentSet.gridReload();
                        window.close();
                    }
                }
                break;
        }
        return;
    },

    setAlarmEvent : function(){
        var adminFlag = JSON.parse($("#isAdmin").val());
        var absenceName = adminFlag == true ? $("#absenceTxt").val() : $("#absenceTxt_td").text();
        absentSetPop.global.saveAjaxData = {
            ntTitle : "[대결지정] 부재자 : " + absenceName,
            ntContent : "대결기간 : " + $("#aisday").val() + " " + $("#aistime").val() + ' ~ ' +
                $("#aieday").val() + " " + $("#aietime").val() ,
            recEmpSeq : $("#absentSeq").val(),
            ntUrl : "/approvalUser/absentSet.do"
        }

        var result = customKendo.fn_customAjax("/common/setAlarm", absentSetPop.global.saveAjaxData);

        if(result.flag){
            socket.send(absentSetPop.global.saveAjaxData.ntTitle + "," + absentSetPop.global.saveAjaxData.recEmpSeq + "," + absentSetPop.global.saveAjaxData.ntContent + "," + absentSetPop.global.saveAjaxData.ntUrl + "," + result.alId);
            opener.parent.absentSet.gridReload();
            window.close();
        }
    },

    manualCheckedAlert : function(e){
        if(e.checked){
            alert("진행중인 부재기간이 수동해제되며, 저장 시 반영됩니다.");
        }
    },

    userSearchPopup : function (code){
        absentSetPop.global.code = code;
        window.open("/common/deptListPop.do?type=absent", "조직도", "width=750, height=650");
    },

    setAbsenceSeqEmpInfo : function (row){
        $("#absenceTxt").val(row.EMP_NAME_KR);
        $("#absenceSeq").val(row.EMP_SEQ);
        $("#deptSeq").val(row.DEPT_SEQ);
        $("#oriAbsenceSeq").val(row.EMP_SEQ);
        $("#oriAbsenceSeq").val(row.DEPT_SEQ);
    },

    setAbsentEmpInfo : function (row){
        $("#absentTxt").val(row.EMP_NAME_KR);
        $("#absentSeq").val(row.EMP_SEQ);
        $("#viDeptSeq").val(row.DEPT_SEQ);
    },
}