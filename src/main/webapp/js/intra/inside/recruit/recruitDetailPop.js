var rcDetailPop = {
    global : {

    },

    fn_DefaultScript : function (){
        rcDetailPop.recruitDataSet();
        rcDetailPop.viewMod();
    },

    recruitDataSet : function(){
        var result = customKendo.fn_customAjax("/inside/getRecruit.do", {recruitInfoSn : $("#recruitInfoSn").val()})
        if(result.flag){
            var recruit = result.recruit;
            $("#recruitNum").text(recruit.RECRUIT_NUM);
            $("#recruitTitle").text(recruit.RECRUIT_TITLE);
            $("#recruitDetail").html(recruit.RECRUIT_DETAIL.replaceAll("\n", "<br>"));
            $("#uploadDt").text(recruit.UPLOAD_DT);
            $("#uploadText").text(recruit.UPLOAD_TEXT);
            $("#startDt").text(recruit.START_DT);
            $("#endDt").text(recruit.END_DT);

            $("#jobPositionEtc").html(recruit.JOB_POSITION_ETC.replaceAll("\n", "<br>"));
            $("#eligibilityEtc").html(recruit.ELIGIBILITY_ETC.replaceAll("\n", "<br>"));

            $("#workType").html(recruit.WORK_TYPE.replaceAll("\n", "<br>"));
            $("#admission").html(recruit.ADMISSION.replaceAll("\n", "<br>"));
            $("#applicationDoc").html(recruit.APPLICATION_DOC).replaceAll("\n", "<br>");
            $("#receiptDocu").html(recruit.RECEIPT_DOCU.replaceAll("\n", "<br>"));
            $("#remark").html(recruit.REMARK.replaceAll("\n", "<br>"));
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
                                    '자격요건 : ' + e[i].QUALIFICATION.replaceAll("\n", "<br>") +
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

    moveToStatPage : function (){
        var url = "/inside/pop/recruitReqStatPop.do?recruitInfoSn=" + $("#recruitInfoSn").val();
        var name = "recruitReqStatPop";
        var option = "width=1000, height=720, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    },

    moveToLoginPage : function(){
        window.open("/application/applicationLogin.do?recruitInfoSn=" + $("#recruitInfoSn").val(),"applicationLogin","width=750,height=320")
    },

    viewMod : function(){
        /** view 모드일때 조회 이외에 버튼 전부 사라짐 */
        if($("#stat").val() == "view"){
            $(".mngBtn").hide();
        }
    }
}