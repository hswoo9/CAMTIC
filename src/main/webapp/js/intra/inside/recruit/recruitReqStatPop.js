var rcReqStatPop = {

    init: function(){
        rcReqStatPop.dataSet();

        if($("#recruitInfoSn").val()){
            rcReqStatPop.dataAdd();
        }
    },

    dataSet: function(){
        customKendo.fn_textBox(["recruitNum", "recruitTitle", "uploadText", "jobPositionEtc"]);
        customKendo.fn_datePicker("uploadDt", '', "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("startDt", '', "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("endDt", '', "yyyy-MM-dd", new Date());
        $("#startTime").kendoTimePicker({culture : "ko-KR", format : "HH:mm", value : "09:00"});
        $("#endTime").kendoTimePicker({culture : "ko-KR", format : "HH:mm", value : "18:00"});
        $("#uploadDt, #startDt, #endDt, #startTime, #endTime").attr("readonly", true);
        let recruitStatusArr = [
            {text: "작성중", value: "1"},
            {text: "접수중", value: "2"},
            {text: "심사중", value: "3"},
            {text: "채용완료", value: "4"}
        ]
        customKendo.fn_dropDownList("recruitStatus", recruitStatusArr, "text", "value", 2);
        //$("#recruitStatus").data("kendoDropDownList").select(2);

        $("#recruitDetail").kendoTextArea({ rows: 5, maxLength:2000, placeholder: "" });
        $("#eligibilityEtc").kendoTextArea({ rows: 5, maxLength:2000, placeholder: "" });
        $("#workType").kendoTextArea({ rows: 5, maxLength:2000, placeholder: "" });
        $("#admission").kendoTextArea({ rows: 5, maxLength:2000, placeholder: "" });
        $("#applicationDoc").kendoTextArea({ rows: 5, maxLength:2000, placeholder: "" });
        $("#receiptDocu").kendoTextArea({ rows: 5, maxLength:2000, placeholder: "" });
        $("#remark").kendoTextArea({ rows: 5, maxLength:2000, placeholder: "" });


    },

    saveBtn: function(){
        let recruitInfoSn = $("#recruitInfoSn").val();
        let recruitNum = $("#recruitNum").val();
        let recruitTitle = $("#recruitTitle").val();
        let recruitDetail = $("#recruitDetail").val();
        let uploadDt = $("#uploadDt").val();
        let uploadText = "캠틱종합기술원장";
        let startDt = $("#startDt").val();
        let endDt = $("#endDt").val();
        let jobPositionEtc = $("#jobPositionEtc").val();
        let eligibilityEtc = $("#eligibilityEtc").val();
        let workType = $("#workType").val();
        let admission = $("#admission").val();
        let applicationDoc = $("#applicationDoc").val();
        let receiptDocu = $("#receiptDocu").val();
        let remark = $("#remark").val();
        let recruitStatusSn = $("#recruitStatus").val();
        let recruitStatusText = $("#recruitStatus").data("kendoDropDownList").text();
        let regEmpSeq = $("#regEmpSeq").val();
        let regEmpName = $("#regEmpName").val();


        let data = {
            recruitInfoSn : recruitInfoSn,
            recruitNum: recruitNum,
            recruitTitle: recruitTitle,
            recruitDetail: recruitDetail,
            uploadDt: uploadDt,
            uploadText: uploadText,
            startDt: startDt,
            endDt: endDt,
            jobPositionEtc: jobPositionEtc,
            eligibilityEtc: eligibilityEtc,
            workType: workType,
            admission: admission,
            applicationDoc : applicationDoc,
            receiptDocu: receiptDocu,
            remark: remark,
            recruitStatusSn: recruitStatusSn,
            recruitStatusText: recruitStatusText,
            regEmpSeq: regEmpSeq,
            regEmpName: regEmpName,
        }

        if($("#recruitStatus").val() != 1){
            if(recruitTitle == ""){ alert("공고제목이 작성되지 않았습니다."); return;}
            if(recruitDetail == ""){ alert("공고내용이 작성되지 않았습니다."); return;}
            if(startDt == ""||endDt == ""){ alert("모집일시가 작성되지 않았습니다."); return;}
        }

        if(!confirm("채용공고를 저장하시겠습니까?")){
            return;
        }
        rcReqStatPop.setRecruitInsert(data);
    },

    setRecruitInsert(data){
        $.ajax({
            url : "/inside/setRecruitUpd.do",
            data : data,
            type : "post",
            dataType : "json",
            async : false,
            success : function(result){
                alert("채용공고가 수정되었습니다.");
                opener.rcDetailPop.recruitDataSet();
                window.close();
            },
            error : function() {
                alert("데이터 저장 중 에러가 발생했습니다.");
                window.close();
            }
        });
    },

    dataAdd : function(){
        var result = customKendo.fn_customAjax("/inside/getRecruit.do", {recruitInfoSn : $("#recruitInfoSn").val()})
        if(result.flag){
            var recruit = result.recruit;
            console.log("result",result);
            console.log("recruit",recruit);
            console.log("applicationCount",recruit.applicationCount);
            $("#recruitNum").val(recruit.RECRUIT_NUM);
            $("#recruitTitle").val(recruit.RECRUIT_TITLE);
            $("#recruitDetail").val(recruit.RECRUIT_DETAIL);
            $("#uploadDt").val(recruit.UPLOAD_DT);
            $("#uploadText").val(recruit.UPLOAD_TEXT);
            $("#startDt").val(recruit.START_DT);
            $("#startTime").val(recruit.START_TIME);
            $("#endDt").val(recruit.END_DT);
            $("#endTime").val(recruit.END_TIME);
            rcReqStatPop.recruitAreaSet(recruit.recruitArea);
            $("#jobPositionEtc").val(recruit.JOB_POSITION_ETC);
            $("#eligibilityEtc").val(recruit.ELIGIBILITY_ETC);
            $("#workType").val(recruit.WORK_TYPE);
            $("#admission").val(recruit.ADMISSION);
            $("#applicationDoc").val(recruit.APPLICATION_DOC);
            $("#receiptDocu").val(recruit.RECEIPT_DOCU);
            $("#remark").val(recruit.REMARK);

            let recruitStatusArr = [
                {text: "작성중", value: "1"},
                {text: "접수중", value: "2"},
                {text: "심사중", value: "3"},
                {text: "채용완료", value: "4"}
            ]
            if (recruit.applicationCount >= 1) {
                recruitStatusArr = recruitStatusArr.filter(item => item.value !== "1");
                customKendo.fn_dropDownList("recruitStatus", recruitStatusArr, "text", "value", 2);
                $("#recruitStatus").data("kendoDropDownList").value(recruit.RECRUIT_STATUS_SN);
            }else{
                $("#recruitStatus").data("kendoDropDownList").value(recruit.RECRUIT_STATUS_SN);
            }
        }
    },

    recruitAreaSet : function(e){
        for(var i = 0; i < e.length; i++){
            var html = ""
            html += '<table class="addData" style="margin-top: 20px;">' +
                '<col width="25%">' +
                '<col width="35%">' +
                '<col width="40%">' +
                '<tr>'+
                '<td>' +
                '<div style="display:flex; justify-content: space-between; align-items: center">'+
                '부서 : ' + e[i].DEPT_NAME +
                '</div>' +
                '</td>'+
                '<td>' +
                '<div style="display:flex; justify-content: space-between; align-items: center">'+
                '팀 : ' + e[i].TEAM_NAME +
                '</div>' +
                '</td>'+
                '<td>' +
                '<div style="display:flex; justify-content: space-between; align-items: center">'+
                '직무(모집분야) : ' + e[i].JOB +
                '</div>' +
                '</td>'+
                '</tr>'+
                '<tr>'+
                '<td>' +
                '<div style="display:flex; justify-content: space-between; align-items: center">'+
                '채용인원 : ' + e[i].RECRUITMENT + '명' +
                '</div>' +
                '</td>'+
                '<td>' +
                '<div style="display:flex; justify-content: space-between; align-items: center">' +
                '경력 : ';

            if(e[i].CAREER_TYPE == "1,2"){
                html += '신입,경력'
            }else if(e[i].CAREER_TYPE == "1"){
                html += '경력'
            }else if(e[i].CAREER_TYPE == "2"){
                html += '신입'
            }
            html += ' 직급 : ' + e[i].DUTY +
                '</div>' +
                '</td>'+
                '<td>' +
                '<div style="display:flex; justify-content: space-between; align-items: center">'+
                '필요경력 : ' + e[i].CAREER + '년' +
                '근무형태 : '+ e[i].WORK_TYPE +
                '</div>' +
                '</td>'+
                '</tr>'+
                '<tr>'+
                '<td colspan="3">' +
                '<div style="display:flex; justify-content: space-between; align-items: center">'+
                '자격요건 : ' + e[i].QUALIFICATION +
                '</div>' +
                '</td>'+
                '</tr>'+
                '</table>';
            $("#areaTd").append(html);
        }
    }
}