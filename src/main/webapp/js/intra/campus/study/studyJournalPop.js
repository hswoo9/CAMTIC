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
            let list = studyJournal.global.studyUserList;
            for(let i=0; i<list.length; i++){
                /** 조장이거나 조원이 로그인 한 사용자면 승인버튼 오픈 */
                if(list[i].STUDY_CLASS_SN == 1 || list[i].STUDY_CLASS_SN == 2) {
                    if($("#regEmpSeq").val() == list[i].STUDY_EMP_SEQ){
                        studyJournal.global.studyClassSn = list[i].STUDY_CLASS_SN;
                        $("#appBtn").show();
                    }
                }
            }
            studyJournal.dataSet();
        }
    },

    dataSet: function(){
        let data = {
            studyJournalSn: $("#studyJournalSn").val()
        }
        const info = customKendo.fn_customAjax("/campus/getStudyJournalOne", data).data;
        $("#journalDt").val(info.JOURNAL_DT);
        $("#journalStartTime").val(info.JOURNAL_START_TIME);
        $("#journalEndTime").val(info.JOURNAL_END_TIME);
        $("#studyLocation").val(info.JOURNAL_LOCATE);
        $("#studyContent").val(info.JOURNAL_CONTENT);
        $("#studyMoney").val(info.JOURNAL_AMT);
        $("#journalAmtClass").data("kendoDropDownList").value(info.JOURNAL_AMT_CLASS);
        if($("#journalAmtClass").val() == "2"){
            $("#journalAmtEtc").parent().show();
        }else{
            $("#journalAmtEtc").parent().hide();
        }
        $("#journalAmtEtc").val(info.JOURNAL_AMT_ETC);
    },

    saveBtn: function(){
        let studyInfoSn = $("#studyInfoSn").val();
        let studyNameTd = $("#studyNameTd").text();
        let journalDt = $("#journalDt").val();
        let journalStartTime = $("#journalStartTime").val();
        let journalEndTime = $("#journalEndTime").val();
        let studyLocation = $("#studyLocation").val();
        let studyUserSeq = $("#studyUserSeq").val();
        let studyContent = $("#studyContent").val();
        let studyMoney = $("#studyMoney").val();
        let journalAmtClass = $("#journalAmtClass").val();
        let journalAmtClassText = $("#journalAmtClass").data("kendoDropDownList").text();
        let journalAmtEtc = $("#journalAmtEtc").val();
        let regEmpName = $("#regEmpName").val();

        if(studyUserSeq == ""){ alert("학습자가 선택되지 않았습니다."); return; }
        if(journalDt == "" || journalStartTime == "" || journalEndTime == ""){ alert("학습일시가 작성되지 않았습니다."); return; }
        if(studyLocation == ""){ alert("학습장소가 작성되지 않았습니다."); return; }
        if(studyUserSeq == ""){ alert("학습자가 선택되지 않았습니다."); return; }
        if(studyContent == ""){ alert("학습내용이 작성되지 않았습니다."); return; }
        if(studyMoney == ""){ alert("소모비용이 작성되지 않았습니다."); return; }
        if(journalAmtClass == ""){ alert("소요비용구분이 선택되지 않았습니다."); return; }

        let data = {
            studyInfoSn: studyInfoSn,
            studyName: studyNameTd,
            journalDt: journalDt,
            journalStartTime: journalStartTime,
            journalEndTime: journalEndTime,
            studyLocation: studyLocation,
            studyContent: studyContent,
            studyMoney: studyMoney,
            journalAmtClass: journalAmtClass,
            journalAmtClassText: journalAmtClassText,
            journalAmtEtc: journalAmtEtc,
            regEmpName: regEmpName
        }

        if(!confirm("운영일지를 저장하시겠습니까?")){
            return;
        }
        studyJournal.setStudyJournalInsert(data);
    },

    setStudyJournalInsert: function(data){
        $.ajax({
            url: "/campus/setStudyJournalInsert",
            data: data,
            type: "post",
            dataType: "json",
            async: false,
            success: function(result){
                console.log(result);
                alert("운영일지 저장이 완료되었습니다.");
                opener.gridReload();
                window.close();

            },
            error: function() {
                alert("데이터 저장 중 에러가 발생했습니다.");
            }
        });
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
                console.log(result);
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
