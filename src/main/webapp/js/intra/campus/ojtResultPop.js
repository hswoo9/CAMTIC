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

        $("#startTime").focusout(function (){
            var time = this.value.substring(0, 2) + ":" + this.value.substring(2, 4);

            if(!this.value.includes(":")){
                $("#startTime").val(time)
            }
        });

        $("#endTime").change(function (){
            var time = this.value.substring(0, 2) + ":" + this.value.substring(2, 4);

            if(!this.value.includes(":")){
                $("#endTime").val(time)
            }
        });

        let codeDataSource = [
            { label: "전산등록", value: "0" },
            { label: "스캔파일 저장", value: "1" }
        ]
        customKendo.fn_radioGroup("studySaveType", codeDataSource, "horizontal");

        $("#studySaveType").data("kendoRadioGroup").bind("change", function(){
            if($("#studySaveType").data("kendoRadioGroup").value() == 0){
                $("#hideCol, #hideColB").show();
                $("#hideColC").hide();
            } else {
                $("#hideCol, #hideColB").hide();
                $("#hideColC").show();
            }
        })

        customKendo.fn_textArea(["studyContent", "studyContent2"]);

        $("#ojtDt, #readerUserName, #studyUserName").attr("readonly", true);
    },

    saveBtn: function(){
        let mode = $("#mode").val();
        let ojtResultSn = $("#ojtResultSn").val();
        let studyInfoSn = $("#pk").val();
        let ojtDt = $("#ojtDt").val();
        let startTime = $("#startTime").val();
        let endTime = $("#endTime").val();
        let location = $("#location").val();
        let saveType = $("#studySaveType").data("kendoRadioGroup").value();
        let saveTypeText = "";

        if($("#studySaveType").data("kendoRadioGroup").value() == 0){
            saveTypeText = "전산등록";
        } else {
            saveTypeText = "스캔파일 저장";
        }
        let studyContA = $("#studyContent").val();
        let studyContB = $("#studyContent2").val();
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
            mode: mode,
            ojtResultSn: ojtResultSn,
            studyInfoSn: studyInfoSn,
            ojtDt: ojtDt,
            applyDt: ojtDt,
            studyContA : studyContA,
            studyContB : studyContB,
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

        var fd = new FormData();
        for (var key in data) {
            fd.append(key, data[key]);
        }

        if($("#files")[0].files.length == 1){
            fd.append("files", $("#files")[0].files[0]);
        }

        if(mode == "upd"){
            if(!confirm("OJT 학습일지를 수정하시겠습니까?")){
                return;
            }

            $.ajax({
                url: "/campus/setOjtResultModify",
                data : fd,
                type : "post",
                dataType : "json",
                contentType: false,
                processData: false,
                enctype : 'multipart/form-data',
                async: false,
                success: function(result){
                    alert("OJT 학습일지 수정이 완료되었습니다.");
                    opener.$("#ojtResultGrid").data("kendoGrid").dataSource.read();
                    window.close();
                    try {
                        opener.opener.gridReload();
                    }catch{

                    }
                },
                error: function() {
                    alert("데이터 수정 중 에러가 발생했습니다.");
                }
            });
        }else{
            if(!confirm("OJT 학습일지를 저장하시겠습니까?")){
                return;
            }

            $.ajax({
                url: "/campus/setOjtResultInsert",
                data : fd,
                type : "post",
                dataType : "json",
                contentType: false,
                processData: false,
                enctype : 'multipart/form-data',
                async: false,
                success: function(result){
                    alert("OJT 학습일지 저장이 완료되었습니다.");
                    opener.$("#ojtResultGrid").data("kendoGrid").dataSource.read();
                    window.close();
                    try {
                        opener.opener.gridReload();
                    }catch{

                    }
                },
                error: function() {
                    alert("데이터 저장 중 에러가 발생했습니다.");
                }
            });
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

        var name = "popSubjectMember";
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
