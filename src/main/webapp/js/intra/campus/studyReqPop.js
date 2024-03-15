const studyReq = {

    global : {
        attFiles: [],
    },

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
            // $(".study").show();
            $(".propag").hide();
            $("#subjectCont").html('<span class="red-star">*</span>학습내용');
            /*$("#titleCol").text("학습조명");*/
            $("#titleCol").html('<span class="red-star">*</span>학습조명');
            $("#subjectLoc").html('<span class="red-star">*</span>학습장소');
            $("#subjectDe").html('<span class="red-star">*</span>학습기간');
            $("#subjectStudyMoney").html('산출내역');

            $(".subjectObj").show();
        }else if(studyClass == 2){
            $("#titleCol").html('<span class="red-star">*</span>학습주제');
            $("#subjectCont").html('<span class="red-star">*</span>학습내용');
            $("#subjectLoc").html('<span class="red-star">*</span>학습장소');
            $("#subjectDe").html('<span class="red-star">*</span>학습기간');
            $("#subjectStudyMoney").html('비용내역');

            // $(".study").hide();
            $(".propag").show();
            $(".subjectObj").show();
        }else if(studyClass == 3){
            $("#titleCol").html('<span class="red-star">*</span>지도명칭');
            $("#subjectCont").html('<span class="red-star">*</span>지도목적');

            $("#subjectLoc").html('<span class="red-star">*</span>지도장소');
            $("#subjectDe").html('<span class="red-star">*</span>지도기간');
            $("#subjectStudyMoney").html('비용내역');

            // $(".study").hide();
            $(".propag").hide();
            $(".subjectObj").hide();
            $(".ojt").show();

        }
    },

    settingTempFileDataInit: function(){
        $("#setFileName").empty();

        var result = customKendo.fn_customAjax("/common/getFileList", { contentId: "studyInfo_" + $("#pk").val(), fileCd: "studyInfo" });
        if(result.flag){
            if(result.list.length > 0){
                var html = '';
                for(var i=0; i<result.list.length; i++){
                    html += '<li>';
                    html += '   <span style="cursor: pointer" onclick="fileDown(\'' + result.list[i].file_path + result.list[i].file_uuid + '\', \'' + result.list[i].file_org_name + '.' + result.list[i].file_ext + '\')">' + result.list[i].file_org_name + '.' + result.list[i].file_ext + '</span>';
                    html += '   <input type="button" value="X" class="" style="margin-left: 5px; border: none; background-color: transparent; color: red; font-weight: bold;" onclick="studyReq.commonFileDel(' + result.list[i].file_no + ', this)">';
                    html += '</li>';
                }

                $("#ulSetFileName").append(html);
            } else {
                $("#ulSetFileName").empty();
            }
        }
    },

    fileChange : function(){
        for(var i = 0; i < $("input[name='fileList']")[0].files.length; i++){
            studyReq.global.attFiles.push($("input[name='fileList']")[0].files[i]);
        }

        $("#fileName").empty();
        if(studyReq.global.attFiles.length > 0){
            var html = '';
            for (var i = 0; i < studyReq.global.attFiles.length; i++) {
                html += '<li>'
                html += studyReq.global.attFiles[i].name.substring(0, studyReq.global.attFiles[i].name.lastIndexOf(".")) + '.';
                html += studyReq.global.attFiles[i].name.substring(studyReq.global.attFiles[i].name.lastIndexOf(".")+1);
                html += '<input type="button" value="X" class="" style="margin-left: 5px; border: none; background-color: transparent; color: red; font-weight: bold;" onclick="studyReq.fnUploadFile(' + i + ')">';
                html += '</li>';
            }

            $("#ulSetFileName").css('margin-bottom', 0);
            $("#ulFileName").append(html);
        }
    },

    fnUploadFile : function(e) {
        const dataTransfer = new DataTransfer();
        let fileArray = Array.from(studyReq.global.attFiles);
        fileArray.splice(e, 1);
        fileArray.forEach(file => {
            dataTransfer.items.add(file);
        });

        studyReq.global.attFiles = dataTransfer.files;

        if(studyReq.global.attFiles.length > 0){
            $("#ulFileName").empty();

            var html = '';
            for (var i = 0; i < studyReq.global.attFiles.length; i++) {
                html += '<li>'
                html += studyReq.global.attFiles[i].name.substring(0, studyReq.global.attFiles[i].name.lastIndexOf(".")) + '.';
                html += studyReq.global.attFiles[i].name.substring(studyReq.global.attFiles[i].name.lastIndexOf(".")+1);
                html += '<input type="button" value="X" class="" style="margin-left: 5px; border: none; background-color: transparent; color: red; font-weight: bold;" onclick="studyReq.fnUploadFile(' + i + ')">';
                html += '</li>';
            }

            $("#ulFileName").append(html);
        } else {
            $("#ulFileName").empty();
        }

        if(studyReq.global.attFiles.length == 0){
            studyReq.global.attFiles = new Array();
        }

        studyReq.global.attFiles = Array.from(studyReq.global.attFiles);
    },

    commonFileDel: function(e, v){
        if(confirm("삭제한 파일은 복구할 수 없습니다.\n그래도 삭제하시겠습니까?")){
            $.ajax({
                url: "/common/commonFileDel",
                data: {
                    fileNo: e
                },
                type: "post",
                datatype: "json",
                success: function (rs) {
                    var rs = rs.rs;
                    alert(rs.message);
                    if(rs.code == "200"){
                        $(v).closest("li").remove();
                    }
                }
            });
        }
    },

    saveBtn: function(){
        let studyInfoSn = $("#pk").val();
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
        /*if(studyUserSeq == ""){ alert("학습자가 선택되지 않았습니다."); return; }*/
        if(startDt == "" || endDt == ""){ alert("학습기간이 작성되지 않았습니다."); return; }
        if(studyLocation == ""){ alert("학습장소가 작성되지 않았습니다."); return; }

        if($("#studyClass").data("kendoDropDownList").value() != 3){
            if(studyObject == ""){ alert("학습목표가 작성되지 않았습니다."); return; }
        }

        if(studyMoney == ""){ alert("소요비용이 작성되지 않았습니다."); return; }
        if(regDate == ""){ alert("신청날짜가 작성되지 않았습니다."); return; }

        if(studyClassSn == 1){
            if(studyContent == ""){ alert("학습내용이 작성되지 않았습니다."); return; }
            if(studyMoney != 0) {
                if (studyMoneyVal == "") {alert("산출내역이 작성되지 않았습니다.");return;}
            }
        }else if(studyClassSn == 2){
            if(studyContent == ""){ alert("학습내용이 작성되지 않았습니다."); return; }
            /*if(readerUserSeq == ""){ alert("지도자가 선택되지 않았습니다."); return; }*/
            if(startTime == ""){ alert("학습시간이 작성되지 않았습니다."); return; }
            if(endTime == ""){ alert("학습시간이 작성되지 않았습니다."); return; }
            if(eduTerm == ""){ alert("총 회차가 작성되지 않았습니다."); return; }
            if(eduTime == ""){ alert("총 시간이 작성되지 않았습니다."); return; }
            if(studyMoney != 0) {
                if(studyMoneyVal == ""){ alert("비용내역이 작성되지 않았습니다."); return; }
            }
        }else if(studyClassSn == 3){
            if(readerUserSeq == ""){ alert("지도자가 선택되지 않았습니다."); return; }
            if(studyContent == ""){alert("지도목적이 작성되지 않았습니다."); return;}
            if(studyMoney != 0) {
                if (studyMoneyVal == "") {alert("비용내역이 작성되지 않았습니다.");return;}
            }
        }

        let data = {
            pk: studyInfoSn,
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
            attach: "",
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

        var formData = new FormData();
        for (var key in data) {
            formData.append(key, data[key]);
        }

        if(studyReq.global.attFiles != null){
            for(var i = 0; i < studyReq.global.attFiles.length; i++){
                formData.append("fileList", studyReq.global.attFiles[i]);
            }
        }


        if($("#pk").val() != ""){
            if(!confirm(studyClassText+" 신청서를 수정하시겠습니까?")){
                return;
            }
            let url = "/campus/setStudyInfoModify";
            const result = customKendo.fn_customFormDataAjax(url, formData);
            if(result.flag){
                alert(studyClassText+" 신청서 수정이 완료되었습니다.");
                studyViewPop(studyInfoSn, studyClassSn);
            }else {
                alert("데이터 저장 중 에러가 발생했습니다.");
            }
        }else {
            if(!confirm(studyClassText+" 신청서를 저장하시겠습니까?")){
                return;
            }
            let url = "/campus/setStudyInfoInsert";
            const result = customKendo.fn_customFormDataAjax(url, formData);
            if(result.flag){
                alert(studyClassText+" 신청서 저장이 완료되었습니다.");
                opener.gridReload();
                var pk = result.studyUserSn;
                studyViewPop(pk, studyClassSn);
            }else {
                alert("데이터 저장 중 에러가 발생했습니다.");
            }
        }
    }
}

function studyViewPop(pk, studyClassSn){
   /* let url = "/Campus/pop/studyViewPop.do?mode=upd&pk="+pk;*/
    let url;
    if(studyClassSn == 1){
        url = "/Campus/pop/studyViewPop.do?mode=upd&pk="+pk; //학습조
    }else if(studyClassSn == 2){
        url = "/Campus/pop/propagViewPop.do?mode=upd&pk="+pk; //전파학습
    }else if(studyClassSn == 3){
        url = "/Campus/pop/ojtViewPop.do?mode=upd&pk="+pk; // OJT
    }else{
        return;
    }
    const name = "studyReqPop";
    const option = "width = 920, height = 900, top = 100, left = 200, location = no";
    window.open(url, name, option);
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
