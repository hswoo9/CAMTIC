const studyJournal = {
    global: {
        studyUserList: {},
        studyClassSn: 0
    },

    init: function(){
        studyJournal.pageSet();
    },

    pageSet: function(){
        if($("#studyJournalSn").val() == ""){
            $("#mode").val("Req");
        }else{
            $("#mode").val("Upd");
        }
        customKendo.fn_textBox(["studyLocation", "studyUserName", "studyMoney", "journalAmtEtc"]);
        customKendo.fn_textArea(["studyContent"]);
        customKendo.fn_datePicker("journalDt", "month", "yyyy-MM-dd", new Date());
        customKendo.fn_timePicker("journalStartTime", '10', "HH:mm", "09:00");
        customKendo.fn_timePicker("journalEndTime", '10', "HH:mm", "18:00");
        let journalAmtDataSource = [
            { text: "교재비", value: "1" },
            { text: "기타", value: "2" }
        ]
        customKendo.fn_dropDownList("journalAmtClass", journalAmtDataSource, "text", "value", 2);
        $("#journalAmtClass").data("kendoDropDownList").bind("change", function(){
            if($("#journalAmtClass").val() == "2"){
                $("#journalAmtEtc").parent().show();
            }else{
                $("#journalAmtEtc").parent().hide();
            }
        });
        if($("#journalAmtClass").val() == "2"){
            $("#journalAmtEtc").parent().show();
        }else{
            $("#journalAmtEtc").parent().hide();
        }
        $("#studyUserName, #journalDt, #journalStartTime, #journalEndTime").attr("readonly", true);

        let data = {
            pk: $("#pk").val()
        }
        const result = customKendo.fn_customAjax("/campus/getStudyUserList", data);
        studyJournal.global.studyUserList = result.list;

        if($("#mode").val() == "Upd"){
            studyJournal.dataSet();
        }
    },

    dataSet: function(){
        let data = {
            studyJournalSn: $("#studyJournalSn").val()
        }

        if(data.studyJournalSn != ""){
            $("#saveBtn").css("display", "none");
            /*$("#selMemBtn").css("display", "none");*/
        }

        const info = customKendo.fn_customAjax("/campus/getStudyJournalOne", data).data;
        if(info.file_no != undefined && info.file_no != null && info.file_no != ""){

            // $("#fileHeader").html("");
            var html = "";
            html += '   <span style="cursor: pointer" onclick="fileDown(\''+info.file_path + info.file_uuid+'\', \''+info.file_org_name+'.'+info.file_ext+'\')">'+info.file_org_name+'</span>';
            $("#fileHeader").append(html);
        }

        if($("#regEmpSeq").val() == info.REG_EMP_SEQ && info.CAPTAIN_APPOVAL_YN =='N' && info.ASSISTANT_APPOVAL_YN =='N'){
            $("#modifyBtn").show();
        }


        $("#studyUserName").val(info.STUDY_EMP_NAME);
        $("#studyUserSeq").val(info.STUDY_EMP_SEQ);


        $("#studyNameTd").text(info.STUDY_NAME);
        $("#journalDt").val(info.JOURNAL_DT);
        $("#journalStartTime").val(info.JOURNAL_START_TIME);
        $("#journalEndTime").val(info.JOURNAL_END_TIME);
        $("#studyLocation").val(info.JOURNAL_LOCATE);
        $("#studyContent").val(info.JOURNAL_CONTENT);
        $("#studyMoney").val(comma(info.JOURNAL_AMT));
        $("#journalAmtClass").data("kendoDropDownList").value(info.JOURNAL_AMT_CLASS);
        if($("#journalAmtClass").val() == "2"){
            $("#journalAmtEtc").parent().show();
        }else{
            $("#journalAmtEtc").parent().hide();
        }
        $("#journalAmtEtc").val(info.JOURNAL_AMT_ETC);

        let list = studyJournal.global.studyUserList;
        for(let i=0; i<list.length; i++){
            /** 조장이거나 조원이 로그인 한 사용자면 승인버튼 오픈 */
            if(list[i].STUDY_CLASS_SN == 1) {
                if($("#regEmpSeq").val() == list[i].STUDY_EMP_SEQ && info.CAPTAIN_APPOVAL_YN != 'Y'){
                    studyJournal.global.studyClassSn = list[i].STUDY_CLASS_SN;
                    $("#appBtn").show();
                }
            }

            if(list[i].STUDY_CLASS_SN == 2) {
                if($("#regEmpSeq").val() == list[i].STUDY_EMP_SEQ  && info.ASSISTANT_APPOVAL_YN != 'Y'){
                    studyJournal.global.studyClassSn = list[i].STUDY_CLASS_SN;
                    $("#appBtn").show();
                }
            }
        }


        if(opener.parent.$("#addStatus").val() != 'N'){
            $("#studyContent").data("kendoTextArea").enable(false);
            $("#studyLocation").data("kendoTextBox").enable(false);
            $("#studyUserName").data("kendoTextBox").enable(false);
            $("#studyMoney").data("kendoTextBox").enable(false);
            $("#journalAmtClass").data("kendoDropDownList").enable(false);
            $("#journalAmtEtc").data("kendoTextBox").enable(false);
            $("#journalDt").data("kendoDatePicker").enable(false);

            $("#journalStartTime").data("kendoTimePicker").enable(false);
            $("#journalEndTime").data("kendoTimePicker").enable(false);
            $("#files").attr("disabled", true);
            $("#selMemBtn").attr("disabled", true);
        }
    },

    saveBtn: function(){
        let studyInfoSn = $("#pk").val();
        let studyNameTd = $("#studyNameTd").text();
        let journalDt = $("#journalDt").val();
        let journalStartTime = $("#journalStartTime").val();
        let journalEndTime = $("#journalEndTime").val();
        let studyLocation = $("#studyLocation").val();
        let studyUserSeq = $("#studyUserSeq").val();
        let studyUserName = $("#studyUserName").val();
        let studyContent = $("#studyContent").val();
        let studyMoney = uncomma($("#studyMoney").val());
        let journalAmtClass = $("#journalAmtClass").val();
        let journalAmtClassText = $("#journalAmtClass").data("kendoDropDownList").text();
        let journalAmtEtc = $("#journalAmtEtc").val();
        let regEmpName = $("#regEmpName").val();
        let empSeq = $("#regEmpSeq").val();
        let regEmpSeq = $("#regEmpSeq").val();
        let eduTime = 0;
        let studyJournalSn = $("#studyJournalSn").val();
        let mode = $("#mode").val();

        if(studyUserSeq == ""){ alert("학습자가 선택되지 않았습니다."); return; }
        if(journalDt == "" || journalStartTime == "" || journalEndTime == ""){ alert("학습일시가 작성되지 않았습니다."); return; }
        if(studyLocation == ""){ alert("학습장소가 작성되지 않았습니다."); return; }
        if(studyUserSeq == ""){ alert("학습자가 선택되지 않았습니다."); return; }
        if(studyContent == ""){ alert("학습내용이 작성되지 않았습니다."); return; }

        if(journalAmtClass == "1" || journalAmtClass == "2") {
            if (studyMoney == "" || studyMoney == "0" ) {alert("소요비용이 작성되지 않았습니다.");return;}
        }
        /*if(studyMoney == ""){ alert("소모비용이 작성되지 않았습니다."); return; }*/
        
        if(studyMoney != '0') {
            if (journalAmtClass == "") {alert("소요비용구분이 선택되지 않았습니다.");return;}
        }
        /*if(journalAmtClass == ""){ alert("소요비용구분이 선택되지 않았습니다."); return; }*/

        /** 학습조 학습주 실제 인정시간 조회 */
        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth()+1;
        var day = now.getDate();
        var hour1 = journalStartTime.split(":")[0];
        var hour2 = journalEndTime.split(":")[0];
        var min1 = journalStartTime.split(":")[1];
        var min2 = journalEndTime.split(":")[1];
        var bfDate = new Date(year, month, day, hour1, min1);
        var afDate = new Date(year, month, day, hour2, min2);
        var diffSec = afDate.getTime() - bfDate.getTime();
        /*var diffMin = diffSec / 1000 / 60 / 60;*/

        var diffHours = Math.abs(diffSec / (1000 * 60 * 60));
        var formattedDiff = diffHours.toFixed(1);
        formattedDiff = parseFloat(formattedDiff);
        console.log(formattedDiff);

        /** 건당 최대 2시간 */
        // if(diffMin > 2){
        //     eduTime = 2
        // }else{
            /*eduTime = diffMin;*/
        eduTime = formattedDiff;

        // }

        /** 주당 최대 2시간 체크 */
        let realEduTimeYear = customKendo.fn_customAjax("/campus/getRealEduTimeStudyWeekly", {
            studyInfoSn: studyInfoSn,
            empSeq: empSeq,
            applyDt: journalDt
        }).data.REAL_EDU_TIME;

        let realEduTime = eduTime;
        // if(realEduTimeYear + realEduTime > 2){
        //     realEduTime = 2 - realEduTimeYear;
        // }

        let data = {
            studyInfoSn: studyInfoSn,
            studyName: studyNameTd,
            studyEmpSeq : studyUserSeq,
            studyEmpName : studyUserName,
            journalDt: journalDt,
            applyDt: journalDt,
            journalStartTime: journalStartTime,
            journalEndTime: journalEndTime,
            studyLocation: studyLocation,
            studyContent: studyContent,
            studyMoney: studyMoney,
            journalAmtClass: journalAmtClass,
            journalAmtClassText: journalAmtClassText,
            journalAmtEtc: journalAmtEtc,
            regEmpName: regEmpName,
            realEduTime: realEduTime,
            regEmpSeq : regEmpSeq,
            studyJournalSn : studyJournalSn,
            mode: mode
        }

        var fd = new FormData();
        for (var key in data) {
            fd.append(key, data[key]);
        }

        if($("#files")[0].files.length == 1){
            fd.append("files", $("#files")[0].files[0]);
        }

        if(mode == "Upd"){
            if(!confirm("운영일지를 수정하시겠습니까?")) {
                return;
            }
                $.ajax({
                    url: "/campus/setStudyJournalModify",
                    data: fd,
                    type: "post",
                    dataType: "json",
                    contentType: false,
                    processData: false,
                    enctype: 'multipart/form-data',
                    async: false,
                    success: function (result) {
                        alert("운영일지 수정이 완료되었습니다.");
                        opener.gridReload();
                        window.close();
                    },
                    error: function () {
                        alert("데이터 저장 중 에러가 발생했습니다.");
                    }
                });

        }else if(mode == "Req") {
            if (!confirm("운영일지를 저장하시겠습니까?")) {
                return;
            }

            $.ajax({
                url: "/campus/setStudyJournalInsert",
                data: fd,
                type: "post",
                dataType: "json",
                contentType: false,
                processData: false,
                enctype: 'multipart/form-data',
                async: false,
                success: function (result) {
                    alert("운영일지 저장이 완료되었습니다.");
                    opener.gridReload();
                    window.close();
                },
                error: function () {
                    alert("데이터 저장 중 에러가 발생했습니다.");
                }
            });
        }

    },

    appBtn: function(){
        let studyClassSn = studyJournal.global.studyClassSn;
        let data = {
            studyJournalSn: $("#studyJournalSn").val(),
            studyClassSn: studyClassSn,
            status: "Y"
        }
        if(studyClassSn != 1 && studyClassSn != 2){ alert("데이터 확인 중 에러가 발생했습니다."); return; }

        $.ajax({
            url: "/campus/setStudyJournalApp",
            data: data,
            type: "post",
            dataType: "json",
            async: false,
            success: function(result){
                alert("검토완료 되었습니다.");
                opener.gridReload();
                window.close();

            },
            error: function(){
                alert("데이터 저장 중 에러가 발생했습니다.");
            }
        });
    }
}

function userDataSet(userArr){
    let userText = "";
    let userSn = "";
    for(let i=0; i<userArr.length; i++) {
        if(userText != "") {
            userText += ",";
            userSn += ",";
        }
        userText += userArr[i].empName;
        userSn += userArr[i].empSeq;
    }

    $("#studyUserSeq").val(userSn);
    $("#studyUserName").val(userText);
}
