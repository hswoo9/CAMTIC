const studyPropag = {
    global: {
        studyUserList: {},
        studyClassSn: 0
    },

    init: function(){
        studyPropag.pageSet();
    },

    pageSet: function(){
        if($("#studyPropagSn").val() == ""){
            $("#mode").val("Req");
        }else{
            $("#mode").val("Upd");
        }
        customKendo.fn_textBox(["studyLocation", "readerUserName", "studyUserName", "studyMoney", "journalAmtEtc"]);
        customKendo.fn_textArea(["studyContent"]);
        customKendo.fn_datePicker("journalDt", "month", "yyyy-MM-dd", new Date());
        customKendo.fn_timePicker("journalStartTime", '10', "HH:mm", "09:00");
        customKendo.fn_timePicker("journalEndTime", '10', "HH:mm", "18:00");
        let journalAmtDataSource = [
            { text: "교재비", value: "1" },
            { text: "기타", value: "2" }
        ]


        $("#journalStartTime").focusout(function (){
            var time = this.value.substring(0, 2) + ":" + this.value.substring(2, 4);

            if(!this.value.includes(":")){
                $("#journalStartTime").val(time)
            }
        });

        $("#journalEndTime").change(function (){
            var time = this.value.substring(0, 2) + ":" + this.value.substring(2, 4);

            if(!this.value.includes(":")){
                $("#journalEndTime").val(time)
            }
        });

        $("#studyUserName, #journalDt").attr("readonly", true);

        let codeDataSource = [
            { label: "전산등록", value: "1" },
            { label: "스캔파일 저장", value: "2" }
        ]
        customKendo.fn_radioGroup("studySaveType", codeDataSource, "horizontal");
        $("#studySaveType").data("kendoRadioGroup").bind("change", function(){
            if($("#studySaveType").data("kendoRadioGroup").value() == 1){
                $("#hideCol").show();
            } else {
                $("#hideCol").hide();
            }
        })

        let data = {
            pk: $("#pk").val()
        }
        const result = customKendo.fn_customAjax("/campus/getStudyUserList", data);
        studyPropag.global.studyUserList = result.list;

        if($("#mode").val() == "Upd"){
            let list = studyPropag.global.studyUserList;
            for(let i=0; i<list.length; i++){
                /** 조장이거나 조원이 로그인 한 사용자면 승인버튼 오픈 */
                if(list[i].STUDY_CLASS_SN == 1 || list[i].STUDY_CLASS_SN == 2) {
                    if($("#regEmpSeq").val() == list[i].STUDY_EMP_SEQ){
                        studyPropag.global.studyClassSn = list[i].STUDY_CLASS_SN;
                        $("#appBtn").show();
                    }
                }
            }
            studyPropag.dataSet();
        }
    },

    dataSet: function(){
        let data = {
            studyPropagSn: $("#studyPropagSn").val()
        }

        if(data.studyPropagSn != ""){
            $("#saveBtn").css("display", "none");
            $("#selMemBtn").css("display", "none");

        }

        if(data.studyPropagSn != "" /*&& 학습완료전*/){
            $("#modifyBtn").css("display", "");

        }

        if($("#studyPropagSn").val() != "" || $("#studyPropagSn").val() != null) {

            $.ajax({
                url: "/campus/getStudyPropagInfoOne",
                data: {
                    studyPropagSn: $("#studyPropagSn").val()
                },
                type: "post",
                dataType: "json",
                async: false,
                success: function (result) {
                    if(result.data.SAVE_TYPE == '1'){
                        $("#hideCol").css("display", "");
                    }
                    $("#journalDt").val(result.data.PROPAG_DT);
                    $("#journalStartTime").val(result.data.START_TIME);
                    $("#journalEndTime").val(result.data.END_TIME);
                    $("#studyLocation").val(result.data.LOCATION);
                    $("input[name='studySaveType'][value='" + result.data.SAVE_TYPE + "']").prop("checked", true);
                    /*$("#studySaveType").val(result.data.SAVE_TYPE);*/
                    $("#studySaveType").data("kendoRadioGroup").value(result.data.SAVE_TYPE);
                    $("#studyContent").val(result.data.PROPAG_CONTENT);

                    $.ajax({
                        url: "/campus/getStudyPropagUserInfo",
                        data: {
                            studyPropagSn: $("#studyPropagSn").val(),
                            propagClassSn: '4'
                        },
                        type: "post",
                        dataType: "json",
                        async: false,
                        success: function (result) {
                            var propagEmpName = result.list.map(function (item) {
                                return item.PROPAG_EMP_NAME;
                            }).join(',');

                            var propagEmpSeq = result.list.map(function (item) {
                                return item.PROPAG_EMP_SEQ;
                            }).join(',');
                            $("#readerUserName").val(propagEmpName);
                            $("#readerUserSeq").val(propagEmpSeq);
                        }
                    });

                    $.ajax({
                        url: "/campus/getStudyPropagUserInfo",
                        data: {
                            studyPropagSn: $("#studyPropagSn").val(),
                            propagClassSn: '5'
                        },
                        type: "post",
                        dataType: "json",
                        async: false,
                        success: function (result) {

                            var propagEmpName = result.list.map(function (item) {
                                return item.PROPAG_EMP_NAME;
                            }).join(',');

                            var propagEmpSeq = result.list.map(function (item) {
                                return item.PROPAG_EMP_SEQ;
                            }).join(',');

                           $("#studyUserName").val(propagEmpName);
                           $("#studyUserSeq").val(propagEmpSeq);
                        }
                    });
                }
            });
        }

        const info = customKendo.fn_customAjax("/campus/getstudyPropagOne", data).data;
        console.log(info);
        if(info.file_no != undefined && info.file_no != null && info.file_no != ""){

            $("#fileHeader").html("");
            var html = "";
            html += '   <span style="cursor: pointer" onclick="fileDown(\''+info.file_path + info.file_uuid+'\', \''+info.file_org_name+'.'+info.file_ext+'\')">'+info.file_org_name+'</span>';
            $("#fileHeader").html(html);
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
        $("#journalAmtEtc").val(info.JOURNAL_AMT_ETC);
    },

    saveBtn: function(){
        let mode = $("#mode").val();
        let studyPropagSn =  $("#studyPropagSn").val();
        let studyInfoSn = $("#pk").val();
        let journalDt = $("#journalDt").val();
        let journalStartTime = $("#journalStartTime").val();
        let journalEndTime = $("#journalEndTime").val();
        let studyLocation = $("#studyLocation").val();
        let readerUserSeq = $("#readerUserSeq").val();
        let studyUserSeq = $("#studyUserSeq").val();
        let studyContent = $("#studyContent").val();
        let regEmpName = $("#regEmpName").val();
        let regEmpSeq = $("#regEmpSeq").val();
        let studySaveType = $("#studySaveType").data("kendoRadioGroup").value();

        if(journalDt == "" || journalStartTime == "" || journalEndTime == ""){ alert("학습일시가 작성되지 않았습니다."); return; }
        if(studyLocation == ""){ alert("학습장소가 작성되지 않았습니다."); return; }
        if(readerUserSeq == ""){ alert("지도자가 선택되지 않았습니다."); return; }
        if(studyUserSeq == ""){ alert("학습자가 선택되지 않았습니다."); return; }
        if(studySaveType == "1" && studyContent == ""){ alert("학습내용이 작성되지 않았습니다."); return; }
        if(studySaveType == ""){ alert("내용저장 방법이 선택되지 않았습니다."); return; }

        /** 학습조 학습주 실제 인정시간 조회
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
        var diffMin = diffSec / 1000 / 60 / 60;*/

        /** 건당 최대 2시간
        // if(diffMin > 2){
        //     eduTime = 2
        // }else{
            eduTime = diffMin;
        // } */

        /** 주당 최대 2시간 체크
        let realEduTimeYear = customKendo.fn_customAjax("/campus/getRealEduTimeStudyWeekly", {
            studyInfoSn: studyInfoSn,
            empSeq: empSeq,
            applyDt: journalDt,
        }).data.REAL_EDU_TIME;

        let realEduTime = eduTime;
        // if(realEduTimeYear + realEduTime > 2){
        //     realEduTime = 2 - realEduTimeYear;
        // } */


        let data = {
            mode: mode,
            studyPropagSn: studyPropagSn,
            studyInfoSn: studyInfoSn,
            propagDt: journalDt,
            applyDt: journalDt,
            startTime: journalStartTime,
            endTime: journalEndTime,
            location: studyLocation,
            saveType: studySaveType,
            propagContent: studyContent,
            regEmpSeq : regEmpSeq,
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

        if(mode == 'Upd') {
            if(!confirm("학습일지를 수정하시겠습니까?")){
                return;
            }

            $.ajax({
                url: "/campus/setStudyPropagModify",
                data : fd,
                type : "post",
                dataType : "json",
                contentType: false,
                processData: false,
                enctype : 'multipart/form-data',
                async: false,
                success: function(result){
                    console.log(result);
                    alert("학습일지 수정이 완료되었습니다.");
                    opener.gridReload();
                    window.close();
                },
                error: function() {
                    alert("데이터 수정 중 에러가 발생했습니다.");
                }
            });

        }else if (mode == 'Req'){
            if(!confirm("학습일지를 저장하시겠습니까?")){
                return;
            }

            $.ajax({
                url: "/campus/setStudyPropagInsert",
                data : fd,
                type : "post",
                dataType : "json",
                contentType: false,
                processData: false,
                enctype : 'multipart/form-data',
                async: false,
                success: function(result){
                    console.log(result);
                    alert("학습일지 저장이 완료되었습니다.");
                    opener.gridReload();
                    window.close();
                },
                error: function() {
                    alert("데이터 저장 중 에러가 발생했습니다.");
                }
            });
        }

    },

    appBtn: function(){
        let studyClassSn = studyPropag.global.studyClassSn;
        let data = {
            studyPropagSn: $("#studyPropagSn").val(),
            studyClassSn: studyClassSn,
            status: "Y"
        }
        if(studyClassSn != 1 && studyClassSn != 2){ alert("데이터 확인 중 에러가 발생했습니다."); return; }

        $.ajax({
            url: "/campus/setStudyPropagApp",
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
