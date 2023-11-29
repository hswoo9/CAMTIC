const studyReq = {
    init : function(){
        studyReq.pageSet();
        studyReq.dataSet();
    },

    pageSet : function() {
        customKendo.fn_textBox(["studyName", "readerUserName", "studyUserName", "dateVal", "studyLocation", "studyMoney", "attach", "eduTerm", "eduTime"]);
        customKendo.fn_textArea(["studyObject", "studyContent", "studyMoneyVal"]);
        customKendo.fn_datePicker("startDt", "month", "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("endDt", "month", "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("regDate", "month", "yyyy-MM-dd", new Date());
        customKendo.fn_timePicker("startTime", '10', "HH:mm", "09:00");
        customKendo.fn_timePicker("endTime", '10', "HH:mm", "18:00");
        let studyDataSource = [
            { text: "학습조", value: "1" },
            { text: "전파학습", value: "2" },
            { text: "OJT", value: "3" }
        ]
        customKendo.fn_dropDownList("studyClass", studyDataSource, "text", "value", 3);

        $("#studyClass").data("kendoDropDownList").bind("change", studyReq.dataSet);
        $("#studyUserName, #startDt, #endDt, #regDate, #startTime, #endTime").attr("readonly", true);
    },

    dataSet: function(){
        let studyClass = $("#studyClass").val();
        if(studyClass == 1){
            $(".study").show();
            $(".propag").hide();
            $("#subjectCont").text("학습내용")
            $("#titleCol").text("학습조명");
            $("#subjectLoc").text("학습장소");
            $("#subjectDe").text("학습기간");
            $("#subjectStudyMoney").text("산출내역");

            $(".subjectObj").show();
        }else if(studyClass == 2){
            $("#titleCol").text("학습주제");
            $("#subjectCont").text("학습내용")
            $("#subjectLoc").text("학습장소");
            $("#subjectDe").text("학습기간");
            $("#subjectStudyMoney").text("비용내역");

            $(".study").hide();
            $(".propag").show();
            $(".subjectObj").show();
        }else if(studyClass == 3){
            $("#titleCol").text("지도명칭");
            $("#subjectCont").text("지도목적");

            $("#subjectLoc").text("지도장소");
            $("#subjectDe").text("지도기간");
            $("#subjectStudyMoney").text("비용내역");

            $(".study").hide();
            $(".propag").hide();
            $(".subjectObj").hide();
            $(".ojt").show();

        }
    },

    saveBtn: function(){
        let studyClassSn = $("#studyClass").val();
        let studyClassText = $("#studyClass").data("kendoDropDownList").text();
        let studyName = $("#studyName").val();
        let readerUserSeq = $("#readerUserSeq").val();
        let studyUserSeq = $("#studyUserSeq").val();
        let startDt = $("#startDt").val();
        let endDt = $("#endDt").val();
        let dateVal = $("#dateVal").val();
        let studyLocation = $("#studyLocation").val();
        let studyObject = $("#studyObject").val();
        let studyContent = $("#studyContent").val();
        let studyMoney = $("#studyMoney").val().replace(/,/g, "");
        let studyMoneyVal = $("#studyMoneyVal").val();
        let attach = $("#attach").val();
        let regDate = $("#regDate").val();

        let startTime = $("#startTime").val();
        let endTime = $("#endTime").val();
        let eduTerm = $("#eduTerm").val();
        let eduTime = $("#eduTime").val();

        let empSeq = $("#regEmpSeq").val();
        let empName = $("#regEmpName").val();

        if(studyName == ""){ alert(studyClassText+"명이 작성되지 않았습니다."); return; }
        if(studyClassSn == ""){ alert("내부학습 구분이 선택되지 않았습니다."); return; }
        if(studyUserSeq == ""){ alert("학습자가 선택되지 않았습니다."); return; }
        if(startDt == "" || endDt == ""){ alert("학습기간이 작성되지 않았습니다."); return; }

        if($("#studyClass").data("kendoDropDownList").value() != 3){
            if(studyObject == ""){ alert("학습목표가 작성되지 않았습니다."); return; }
        }

        if(studyMoney == ""){ alert("소모비용이 작성되지 않았습니다."); return; }
        if(regDate == ""){ alert("신청날짜가 작성되지 않았습니다."); return; }

        if(studyClassSn == 1){
            if(studyContent == ""){ alert("학습내용이 작성되지 않았습니다."); return; }
            if(studyMoneyVal == ""){ alert("산출내역이 작성되지 않았습니다."); return; }
        }else if(studyClassSn == 2){
            if(studyContent == ""){ alert("학습내용이 작성되지 않았습니다."); return; }
            if(readerUserSeq == ""){ alert("지도자가 선택되지 않았습니다."); return; }
            if(startTime == ""){ alert("학습시간이 작성되지 않았습니다."); return; }
            if(endTime == ""){ alert("학습시간이 작성되지 않았습니다."); return; }
            if(eduTerm == ""){ alert("총 회차가 작성되지 않았습니다."); return; }
            if(eduTime == ""){ alert("총 시간이 작성되지 않았습니다."); return; }
            if(studyMoneyVal == ""){ alert("비용내역이 작성되지 않았습니다."); return; }
        }else if(studyClassSn == 3){
            if(readerUserSeq == ""){ alert("지도자가 선택되지 않았습니다."); return; }
            if(studyMoneyVal == ""){ alert("비용내역이 작성되지 않았습니다."); return; }
        }

        let data = {
            studyClassSn: studyClassSn,
            studyClassText: studyClassText,
            studyName: studyName,
            studyUserSeq: studyUserSeq,
            startDt: startDt,
            endDt: endDt,
            dateVal: dateVal,
            studyLocation: studyLocation,
            studyObject: studyObject,
            studyContent: studyContent,
            studyMoney: studyMoney,
            studyMoneyVal: studyMoneyVal,
            attach: attach,
            empSeq: empSeq,
            empName: empName,
            regDate: regDate
        }

        if(studyClassSn == 2){
            data.readerUserSeq = readerUserSeq;
            data.startTime = startTime;
            data.endTime = endTime;

            data.eduTerm = eduTerm;

            const date1 = new Date(startDt);
            const date2 = new Date(endDt);
            const diffDate = date1.getTime() - date2.getTime();
            const getDateDiff = parseInt(Math.abs(diffDate / (1000 * 60 * 60 * 24))/7)+1;

            if(getDateDiff * 2 < eduTime){
                eduTime = getDateDiff * 2
            }
            data.eduTime = eduTime;
        }

        if(studyClassSn == 3){
            data.readerUserSeq = readerUserSeq;
        }

        if(!confirm(studyClassText+" 신청서를 저장하시겠습니까?")){
            return;
        }

        let url = "/campus/setStudyInfoInsert";
        const result = customKendo.fn_customAjax(url, data);
        if(result.flag){
            alert(studyClassText+" 신청서 저장이 완료되었습니다.");
            opener.gridReload();
            window.close();
        }else {
            alert("데이터 저장 중 에러가 발생했습니다.");
        }
    },
}

function userDataSet(userArr){
    let suerSelType = $("#suerSelType").val();
    let seqId = "";
    let nameId = "";
    if(suerSelType == 1){
        seqId = "studyUserSeq";
        nameId = "studyUserName";
    }else if(suerSelType == 2){
        seqId = "readerUserSeq";
        nameId = "readerUserName";
    }
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

    $("#"+seqId).val(userSn);
    $("#"+nameId).val(userText);
}
