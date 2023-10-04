var rcDetailPop = {
    global : {

    },

    fn_DefaultScript : function (){
        rcDetailPop.recruitDataSet();
    },

    recruitDataSet : function(){
        var result = customKendo.fn_customAjax("/inside/getRecruit.do", {recruitInfoSn : $("#recruitInfoSn").val()})
        if(result.flag){
            var recruit = result.recruit;
            $("#recruitNum").text(recruit.RECRUIT_NUM);
            $("#recruitTitle").text(recruit.RECRUIT_TITLE);
            $("#recruitDetail").text(recruit.RECRUIT_DETAIL);
            $("#uploadDt").text(recruit.UPLOAD_DT);
            $("#uploadText").text(recruit.UPLOAD_TEXT);
            $("#startDt").text(recruit.START_DT);
            $("#startTime").text(recruit.START_TIME);
            $("#endDt").text(recruit.END_DT);
            $("#endTime").text(recruit.END_TIME);

            $("#jobPositionEtc").text(recruit.JOB_POSITION_ETC);
            $("#eligibilityEtc").text(recruit.ELIGIBILITY_ETC);

            $("#workType").text(recruit.WORK_TYPE);
            $("#admission").text(recruit.ADMISSION);
            $("#applicationDoc").text(recruit.APPLICATION_DOC);
            $("#receiptDocu").text(recruit.RECEIPT_DOCU);
            $("#remark").text(recruit.REMARK);
            $("#recruitStatus").text(recruit.RECRUIT_STATUS_TEXT);
            rcDetailPop.recruitAreaSet(recruit.recruitArea);
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
    },

    moveToModPage : function(){
        location.href = "/Inside/pop/recruitReqPop.do?recruitInfoSn=" + $("#recruitInfoSn").val()
    },

    moveToLoginPage : function(){
        window.open("/application/applicationLogin.do?recruitInfoSn=" + $("#recruitInfoSn").val(),"applicationLogin","width=750,height=320")
    }
}