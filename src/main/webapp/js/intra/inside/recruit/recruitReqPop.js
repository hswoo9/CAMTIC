var recruitReq = {

    init: function(){
        recruitReq.dataSet();

        if($("#recruitInfoSn").val()){
           recruitReq.dataAdd();
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
        $("#recruitStatus").data("kendoDropDownList").select(1);

        $("#recruitDetail").kendoTextArea({ rows: 5, maxLength:2000, placeholder: "" });
        $("#eligibilityEtc").kendoTextArea({ rows: 5, maxLength:2000, placeholder: "" });
        $("#workType").kendoTextArea({ rows: 5, maxLength:200, placeholder: "" });
        $("#admission").kendoTextArea({ rows: 5, maxLength:2000, placeholder: "" });
        $("#applicationDoc").kendoTextArea({ rows: 5, maxLength:2000, placeholder: "" });
        $("#receiptDocu").kendoTextArea({ rows: 5, maxLength:2000, placeholder: "" });
        $("#remark").kendoTextArea({ rows: 5, maxLength:2000, placeholder: "" });



        let html = "";
        for(let i=0; i<1; i++){
            html = ""
            html += '<table class="addData" style="margin-top: 20px;" rowIndexNumber="'+i+'">';
            html += '<col width="32%">';
            html += '<col width="32%">';
            html += '<col width="35%">';
            html += '<tr>';
            html += '   <td><div style="display:flex; justify-content: space-between; align-items: center">';
            html += '       부서<input type="text" id="dept'+i+'" class="dept" style="width: 70%">';
            html += '   </div></td>';
            html += '   <td><div style="display:flex; justify-content: space-between; align-items: center">';
            html += '       팀<input type="text" id="team'+i+'" class="team" style="width: 70%">';
            html += '   </div></td>';
            html += '   <td><div style="display:flex; justify-content: space-between; align-items: center">';
            html += '       직무(모집분야)<input type="text" id="job'+i+'" class="job" style="width: 60%">';
            html += '   </div></td>';
            html += '</tr>';
            html += '<tr>';
            html += '   <td><div style="display:flex; justify-content: space-between; align-items: center">';
            html += '       채용인원<div style="text-align: right;width: 153px"><input type="text" id="recruitment'+i+'" class="recruitment" oninput="onlyNumber(this)" style="width: 30%">명</div>';
            html += '   </div></td>';
            html += '   <td>' +
                            '<div style="display:flex; justify-content: space-between; align-items: center">' +
                                '<input type="checkbox" id="careerType_1_'+i+'" class="careerType">' +
                                '<label for="careerType_1_'+i+'">경력</label>' +
                                '<input type="checkbox" id="careerType_2_'+i+'" class="careerType">' +
                                '<label for="careerType_2_'+i+'">신입</label>' +
                                '직급 ' +
                                '<input type="text" id="duty'+i+'" class="duty" style="width: 40%">' +
                            '</div>' +
                        '</td>';
            html += '   <td><div style="display:flex; justify-content: space-between; align-items: center">';
            html += '       필요경력<input type="text" id="career'+i+'" class="career" oninput="onlyNumber(this)" style="width: 20%"> 년 근무형태 <input type="text" id="workType'+i+'" class="workType" style="width: 20%">';
            html += '   </div></td>';
            html += '</tr>';
            html += '<tr>';
            html += '   <td colspan="3"><div style="display:flex; justify-content: space-between; align-items: center">';
            html += '       자격요건 <textarea id="qualification'+i+'" class="qualification" style="width: 80%; height: 100px;"></textarea>';
            html += '   </div></td>';
            html += '</tr>';
            html += '</table>';
            $("#areaTd").append(html);

            $("#qualification" + i).kendoTextArea({ rows: 5, maxLength: 2000, placeholder: "" });
            let data = {}
            data.deptLevel = 1;
            const ds = customKendo.fn_customAjax("/dept/getDeptAList", data);
            customKendo.fn_dropDownList("dept"+i, ds.rs, "dept_name", "dept_seq", 2);
            $("#dept0").data("kendoDropDownList").bind("change", function(e){
                let data = {}
                data.deptLevel = 2;
                data.parentDeptSeq = $("#dept0").data("kendoDropDownList").value();

                const ds = customKendo.fn_customAjax("/dept/getDeptAList", data);
                customKendo.fn_dropDownList("team"+i, ds.rs, "dept_name", "dept_seq", 2);
            });
            customKendo.fn_dropDownList("team"+i, [], "dept_name", "dept_seq", 2);

            customKendo.fn_textBox(["job"+i, "recruitment"+i, "career"+i, "duty"+i, "workType"+i]);
        }
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
        let areaArr = new Array();

        let flag = true;
        
        $.each($('.addData'), function(i, v){
            let areaInfo = {
                deptSeq    					: $(v).find('#dept'+i).val(),
                deptName   					: $(v).find('#dept'+i).data("kendoDropDownList").text(),
                teamSeq    					: $(v).find('#team'+i).val(),
                teamName   					: $(v).find('#team'+i).data("kendoDropDownList").text(),
                job         				: $(v).find('#job'+i).val(),
                recruitment   				: $(v).find('#recruitment'+i).val() == "" ? 0 : $(v).find('#recruitment'+i).val(),
                duty   		        		: $(v).find('#duty'+i).val(),
                career   		        	: $(v).find('#career'+i).val() == "" ? 0 : $(v).find('#career'+i).val(),
                workType   		        	: $(v).find('#workType'+i).val(),
                qualification   		    : $(v).find('#qualification'+i).val(),
            }

            var careerType = "";
            if($(v).find('#careerType_1_'+i).is(":checked")){
                careerType += ",1"
            }

            if($(v).find('#careerType_2_'+i).is(":checked")){
                careerType += ",2"
            }

            if($(v).find('#careerType_1_'+i).is(":checked") == false && $(v).find('#careerType_2_'+i).is(":checked") == false){
                flag = false
            }

            areaInfo.careerType = careerType.substring(1);

            areaArr.push(areaInfo);
        });

        if(!flag){
            alert("모집분야 경력여부를 체크해주세요");
            return;
        }

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
            areaArr: JSON.stringify(areaArr)
        }

        if($("#recruitStatus").val() != 1){
            if(recruitTitle == ""){ alert("공고제목이 작성되지 않았습니다."); return;}
            if(recruitDetail == ""){ alert("공고내용이 작성되지 않았습니다."); return;}
            if(startDt == ""||endDt == ""){ alert("모집일시가 작성되지 않았습니다."); return;}
        }
        
        if(!confirm("채용공고를 저장하시겠습니까?")){
            return;
        }
        recruitReq.setRecruitInsert(data);
    },

    setRecruitInsert(data){
        $.ajax({
            url : "/inside/setRecruitInsert",
            data : data,
            type : "post",
            dataType : "json",
            async : false,
            success : function(result){
                alert("채용공고가 저장되었습니다.");
                opener.gridReload();
                window.close();
            },
            error : function() {
                alert("데이터 저장 중 에러가 발생했습니다.");
                window.close();
            }
        });
    },

    fn_areaTrRemove : function(rowNumber){
        $.each($(".addData"), function(i, v){
            if($(v).attr("rowIndexNumber") == rowNumber){
                $(v).remove();
            }
        });
    },

    fn_areaTrAdd : function(){
        var rowNumber = 0;
        $.each($(".addData"), function(i, v){
            if(rowNumber = 0 || rowNumber < parseInt($(v).attr("rowIndexNumber"))){
                rowNumber = parseInt($(v).attr("rowIndexNumber"));
            }
        });
        rowNumber++;
        var html = ""
        html += '<table class="addData" style="margin-top: 20px;" rowIndexNumber="'+rowNumber+'">';
        html += '<col width="32%">';
        html += '<col width="32%">';
        html += '<col width="35%">';
        html += '<tr><td colspan="100%" style="text-align: right;">';
        html += '<input type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base mt10" value="삭제" onclick="recruitReq.fn_areaTrRemove('+ rowNumber +');" />';
        html += '</td></tr>';
        html += '<tr>';
        html += '   <td><div style="display:flex; justify-content: space-between; align-items: center">';
        html += '       부서<input type="text" id="dept'+rowNumber+'" class="dept" style="width: 70%">';
        html += '   </div></td>';
        html += '   <td><div style="display:flex; justify-content: space-between; align-items: center">';
        html += '       팀<input type="text" id="team'+rowNumber+'" class="team" style="width: 70%">';
        html += '   </div></td>';
        html += '   <td><div style="display:flex; justify-content: space-between; align-items: center">';
        html += '       직무(모집분야)<input type="text" id="job'+rowNumber+'" class="job" style="width: 60%">';
        html += '   </div></td>';
        html += '</tr>';
        html += '<tr>';
        html += '   <td><div style="display:flex; justify-content: space-between; align-items: center">';
        html += '       채용인원<div style="text-align: right;width: 153px"><input type="text" id="recruitment'+rowNumber+'" class="recruitment" oninput="onlyNumber(this)" style="width: 30%">명</div>';
        html += '   </div></td>';
        html += '   <td>' +
                        '<div style="display:flex; justify-content: space-between; align-items: center">' +
                            '<input type="checkbox" id="careerType_1_'+rowNumber+'" class="careerType"> ';
        html +=             '<label for="careerType_1_'+rowNumber+'">경력</label>' +
                            '<input type="checkbox" id="careerType_2_'+rowNumber+'" class="careerType">' +
                            '<label for="careerType_2_'+rowNumber+'">신입</label>' +
                            '직급 ' +
                            '<input type="text" id="duty'+rowNumber+'" class="duty" style="width: 40%">';
        html +=         '</div>' +
                    '</td>';
        html += '   <td><div style="display:flex; justify-content: space-between; align-items: center">';
        html += '       필요경력<input type="text" id="career'+rowNumber+'" class="career" oninput="onlyNumber(this)" style="width: 15%"> 년 근무형태 <input type="text" id="workType'+rowNumber+'" class="workType" style="width: 30%">';
        html += '   </div></td>';
        html += '</tr>';
        html += '<tr>';
        html += '   <td colspan="3"><div style="display:flex; justify-content: space-between; align-items: center">';
        html += '       자격요건 <textarea id="qualification'+rowNumber+'" class="qualification" style="width: 80%"></textarea>';
        html += '   </div></td>';
        html += '</tr>';
        html += '</table>';
        $("#areaTd").append(html);
        $("#qualification" + rowNumber).kendoTextArea({ rows: 5, maxLength:200, placeholder: "" });
        let data = {}
        data.deptLevel = 1;
        const ds = customKendo.fn_customAjax("/dept/getDeptAList", data);
        customKendo.fn_dropDownList("dept"+rowNumber, ds.rs, "dept_name", "dept_seq", 2);
        $("#dept"+rowNumber).data("kendoDropDownList").bind("change", function(e){
            let data = {}
            data.deptLevel = 2;
            data.parentDeptSeq = $("#dept"+rowNumber).data("kendoDropDownList").value();

            const ds = customKendo.fn_customAjax("/dept/getDeptAList", data);
            customKendo.fn_dropDownList("team"+rowNumber, ds.rs, "dept_name", "dept_seq", 2);
        });
        customKendo.fn_dropDownList("team"+rowNumber, [], "dept_name", "dept_seq", 2);

        customKendo.fn_textBox(["job"+rowNumber, "recruitment"+rowNumber, "career"+rowNumber, "qualification"+rowNumber, "duty"+rowNumber, "workType"+rowNumber]);
    },

    dataAdd : function(){
        var result = customKendo.fn_customAjax("/inside/getRecruit.do", {recruitInfoSn : $("#recruitInfoSn").val()})
        if(result.flag){
            var recruit = result.recruit;
            $("#recruitNum").val(recruit.RECRUIT_NUM);
            $("#recruitTitle").val(recruit.RECRUIT_TITLE);
            $("#recruitDetail").val(recruit.RECRUIT_DETAIL);
            $("#uploadDt").val(recruit.UPLOAD_DT);
            $("#uploadText").val(recruit.UPLOAD_TEXT);
            $("#startDt").val(recruit.START_DT);
            $("#startTime").val(recruit.START_TIME);
            $("#endDt").val(recruit.END_DT);
            $("#endTime").val(recruit.END_TIME);
            recruitReq.recruitAreaSet(recruit.recruitArea);
            $("#jobPositionEtc").val(recruit.JOB_POSITION_ETC);
            $("#eligibilityEtc").val(recruit.ELIGIBILITY_ETC);
            $("#workType").val(recruit.WORK_TYPE);
            $("#admission").val(recruit.ADMISSION);
            $("#applicationDoc").val(recruit.APPLICATION_DOC);
            $("#receiptDocu").val(recruit.RECEIPT_DOCU);
            $("#remark").val(recruit.REMARK);
            $("#recruitStatus").data("kendoDropDownList").value(recruit.STATUS);
        }
    },

    recruitAreaSet : function(e){
        for(var i = 0; i < e.length; i++){
            if(i > 0){
                recruitReq.fn_areaTrAdd();
            }

            $("#dept" + i).data("kendoDropDownList").value(e[i].DEPT_SEQ);
            $("#dept" + i).data("kendoDropDownList").trigger("change");
            $("#team" + i).data("kendoDropDownList").value(e[i].TEAM_SEQ);
            $("#job" + i).val(e[i].JOB);
            $("#recruitment" + i).val(e[i].RECRUITMENT);

            if(e[i].CAREER_TYPE.indexOf("1") > -1){
                $("#careerType_1_" + i).prop("checked", true)
            }

            if(e[i].CAREER_TYPE.indexOf("2") > -1){
                $("#careerType_2_" + i).prop("checked", true)
            }


            $("#duty" + i).val(e[i].DUTY);
            $("#career" + i).val(e[i].CAREER);
            $("#workType" + i).val(e[i].WORK_TYPE);
            $("#qualification" + i).val(e[i].QUALIFICATION);
        }
    }
}