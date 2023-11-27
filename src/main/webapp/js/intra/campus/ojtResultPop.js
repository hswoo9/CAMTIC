const ojtResult = {
    global: {
    },

    init: function(){
        ojtResult.pageSet();
    },

    pageSet: function(){
        customKendo.fn_textBox(["readerUserName", "studyUserName", "location"]);
        customKendo.fn_datePicker("ojtDt", "month", "yyyy-MM-dd", new Date());
        customKendo.fn_timePicker("startTime", '10', "HH:mm", "09:00");
        customKendo.fn_timePicker("endTime", '10', "HH:mm", "18:00");
        let saveDataSource = [
            { text: "전산등록", value: "0" },
            { text: "스캔파일 저장", value: "1" }
        ]
        customKendo.fn_dropDownList("saveType", saveDataSource, "text", "value", 2);
        $("#ojtDt, #startTime, #endTime, #readerUserName, #studyUserName").attr("readonly", true);
    },

    saveBtn: function(){
        let studyInfoSn = $("#pk").val();
        let ojtDt = $("#ojtDt").val();
        let startTime = $("#startTime").val();
        let endTime = $("#endTime").val();
        let location = $("#location").val();
        let saveType = $("#saveType").val();
        let saveTypeText = $("#saveType").data("kendoDropDownList").text();
        let regEmpSeq = $("#regEmpSeq").val();
        let regEmpName = $("#regEmpName").val();
        
        let readerUserSeq = $("#readerUserSeq").val();
        let studyUserSeq = $("#studyUserSeq").val();

        if(ojtDt == "" || startTime == "" || endTime == ""){ alert("지도 일시가 작성되지 않았습니다."); return; }
        if(readerUserSeq == ""){ alert("지도자가 선택되지 않았습니다."); return; }
        if(studyUserSeq == ""){ alert("학습자가 선택되지 않았습니다."); return; }
        if(location == ""){ alert("지도장소가 작성되지 않았습니다."); return; }
        if(saveType == ""){ alert("내용저장 방법이 선택되지 않았습니다."); return; }

        let data = {
            studyInfoSn: studyInfoSn,
            ojtDt: ojtDt,
            startTime: startTime,
            endTime: endTime,
            location: location,
            saveType: saveType,
            saveTypeText: saveTypeText,
            regEmpSeq: regEmpSeq,
            regEmpName: regEmpName,
            readerUserSeq: readerUserSeq,
            studyUserSeq: studyUserSeq
        }
        let url = "/campus/setOjtResultInsert";
        const result = customKendo.fn_customAjax(url, data);
        if(result.flag){
            opener.parent.$("#ojtResultGrid").data("kendoGrid").dataSource.read();
            window.close();
        }
    },

    updBtn: function(pk){
        let ojtResultSn = pk;
        let title = $("#title"+pk).val();
        let etc = $("#etc"+pk).val();

        if(title == ""){ alert("중점 지도항목이 작성되지 않았습니다."); return; }

        let data = {
            ojtResultSn: ojtResultSn,
            title: title,
            etc: etc
        }
        let url = "/campus/setOjtResultUpdate";
        const result = customKendo.fn_customAjax(url, data);
        if(result.flag){
            opener.gridReload();
            location.reload();
        }
    },

    fn_setSubjectMember : function (pk, type){
        var url = "/campus/pop/popSubjectMember.do?studyInfoSn=" + pk + "&ojtType=" + type;

        var name = "inEvalRegPop";
        var option = "width=800, height=600, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    }
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
