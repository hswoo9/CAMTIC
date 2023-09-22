var applicationForm2 = {
    global : {
        createHtmlStr : "",
        schoolIndex : 0,
        careerIndex : 0,
    },

    fn_defaultScript : function() {
        applicationForm2.fnResizeForm();

        applicationForm2.getSelectBoxSetting();
        applicationForm2.getKendoSetting();

        if($("#applicationId").val() != ""){
            applicationForm2.applicationDataSet($("#applicationId").val());
        }
    },

    addSchoolRow : function(){
        applicationForm2.global.createHtmlStr = "";

        applicationForm2.global.schoolIndex++

        applicationForm2.global.createHtmlStr = "" +
            '<tr class="schoolInfo" id="school' + applicationForm2.global.schoolIndex + '">' +
                '<td>' +
                    '<input type="hidden" id="schoolBaseId' + applicationForm2.global.schoolIndex + '" name="schoolBaseId' + applicationForm2.global.schoolIndex + '">' +
                    '<select id="schoolType">' +
                        '<option value="">선택</option>' +
                        '<option value="1">고등학교</option>' +
                        '<option value="2">전문대학</option>' +
                        '<option value="3">대학교1</option>' +
                        '<option value="4">대학교2</option>' +
                        '<option value="5">대학원(석사)</option>' +
                        '<option value="6">대학원(박사)</option>' +
                    '</select>' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="admissionDt' + applicationForm2.global.schoolIndex + '" style="width: 110px"> ~' +
                    '<input type="text" id="graduationDt' + applicationForm2.global.schoolIndex + '" style="width: 110px">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="schoolName' + applicationForm2.global.schoolIndex + '" style="width: 100px;">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="dept' + applicationForm2.global.schoolIndex + '" style="width: 100px;">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="major' + applicationForm2.global.schoolIndex + '" style="width: 110px;">' +
                '</td>' +
                '<td>' +
                    '<select id="graduateType' + applicationForm2.global.schoolIndex + '">' +
                        '<option value="">선택</option>' +
                        '<option value="1">졸업</option>' +
                        '<option value="2">졸업예정</option>' +
                        '<option value="3">수료</option>' +
                    '</select>' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="grade' + applicationForm2.global.schoolIndex + '" style="width: 50px">' +
                '</td>' +
                '<td>' +
                    '<input type="hidden" id="degreeFileNo' + applicationForm2.global.schoolIndex + '" name="degreeFileNo' + applicationForm2.global.schoolIndex + '">' +
                    '<input type="text" id="degreeFileName' + applicationForm2.global.schoolIndex + '"  style="width: 100px;">' +
                    '<label for="degreeFile' + applicationForm2.global.schoolIndex + '" class="k-button k-button-clear-info k-rounded" style="vertical-align: bottom;margin:0;">파일첨부</label>' +
                    '<input type="file" id="degreeFile' + applicationForm2.global.schoolIndex + '" name="degreeFile' + applicationForm2.global.schoolIndex + '" style="display: none" onChange="applicationForm2.getFileName(this)">' +
                '</td>' +
                '<td>' +
                    '<input type="hidden" id="sexualFileNo' + applicationForm2.global.schoolIndex + '" name="sexualFileNo' + applicationForm2.global.schoolIndex + '">' +
                    '<input type="text" id="sexualFileName' + applicationForm2.global.schoolIndex + '" style="width: 100px;">' +
                    '<label for="sexualFile' + applicationForm2.global.schoolIndex + '" class="k-button k-button-clear-info k-rounded" style="vertical-align: bottom;margin:0;">파일첨부</label>' +
                    '<input type="file" id="sexualFile' + applicationForm2.global.schoolIndex + '" name="sexualFile' + applicationForm2.global.schoolIndex + '" style="display: none" onChange="applicationForm2.getFileName(this)">' +
                '</td>' +
            '</tr>';

        $("#schoolTb").append(applicationForm2.global.createHtmlStr);

        $("#admissionDt" + applicationForm2.global.schoolIndex + ", #graduationDt" + applicationForm2.global.schoolIndex).kendoDatePicker({
            depth: "",
            start: "",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date()
        });
    },

    addCareerRow : function(){
        applicationForm2.global.createHtmlStr = "";

        applicationForm2.global.careerIndex++

        applicationForm2.global.createHtmlStr = "" +
            '<tr class="careerInfo" id="career' + applicationForm2.global.careerIndex + '">' +
                '<td>' +
                    '<input type="hidden" id="careerBaseId' + applicationForm2.global.careerIndex + '" name="careerBaseId' + applicationForm2.global.careerIndex + '">' +
                    '<input type="text" id="careerOrgName' + applicationForm2.global.careerIndex + '">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="workStDt' + applicationForm2.global.careerIndex + '" class="period" style="width: 110px"> ~ ' +
                    '<input type="text" id="workEnDt' + applicationForm2.global.careerIndex + '" class="period" style="width: 110px">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="position' + applicationForm2.global.careerIndex + '">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="chargeWork' + applicationForm2.global.careerIndex + '">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="retireSalary' + applicationForm2.global.careerIndex + '">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="retireReason' + applicationForm2.global.careerIndex + '">' +
                '</td>' +
                '<td>' +
                    '<input type="hidden" id="careerFileNo' + applicationForm2.global.careerIndex + '" name="careerFileNo' + applicationForm2.global.careerIndex + '">' +
                    '<input type="text" id="careerFileName' + applicationForm2.global.careerIndex + '" style="width: 140px">' +
                    '<label for="careerFile' + applicationForm2.global.careerIndex + '" class="k-button k-button-clear-info k-rounded" style="vertical-align: bottom;margin:0;">파일첨부</label>' +
                    '<input type="file" id="careerFile' + applicationForm2.global.careerIndex + '" name="careerFile' + applicationForm2.global.careerIndex + '" style="display: none" onChange="applicationForm2.getFileName(this)">' +
                '</td>' +
            '</tr>' +
            '<tr id="career' + applicationForm2.global.careerIndex + '_1" class="careerInfo_1">' +
                '<th>담당업무 세부사항</th>' +
                '<td colSpan="6">' +
                    '<textarea id="careerContent' + applicationForm2.global.careerIndex + '"></textarea>' +
                '</td>' +
            '</tr>';

        $("#careerTb").append(applicationForm2.global.createHtmlStr);

        $("#workStDt" + applicationForm2.global.careerIndex + ", #workEnDt" + applicationForm2.global.careerIndex).kendoDatePicker({
            depth: "",
            start: "",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date()
        });
    },

    delRow : function(c){
        if(confirm("마지막 사항이 삭제됩니다.\n삭제하시겠습니까?")){
            if($("." + c).length > 1){
                if(c == "schoolInfo"){
                    $("." + c + ":last-child").remove();
                    applicationForm2.global.schoolIndex--;
                }else if(c == "careerInfo"){
                    $("." + c + ":last").remove();
                    $("." + c + "_1:last").remove();
                    applicationForm2.global.careerIndex--;
                }
            }
        }
    },

    setApplicationTempSave : function(type){
        if(type == "prev"){
            location.href = "/application/applicationForm1.do?applicationId=" + $("#applicationId").val() ;
        }else{
            if(type == "next"){
                var flag = true;
                var highSchoolFlag = false;
                $.each($(".schoolInfo"), function(i, v){
                    if($(this).find("#schoolType").val() != "" && $(this).find("#schoolType").val() != "1"){
                        if(!$(this).find("#degreeFileNo" + i).val() && $("#degreeFile" + i)[0].files.length == 0 && type == "next") {
                            flag = false;
                        }else if(!$(this).find("#sexualFileNo" + i).val() && $("#sexualFile" + i)[0].files.length == 0 && type == "next") {
                            flag = false;
                        }

                        if(!flag){
                            alert("증빙파일은 필수사항입니다.");
                            return flag;
                        }
                    }

                    if($(this).find("#schoolType").val() == "1"){
                        highSchoolFlag = true;
                    }
                })

                if(!highSchoolFlag){
                    alert("고등학교 학력은 필수사항입니다.");
                    return highSchoolFlag;
                }

                if(!flag){
                    return;
                }


                $.each($(".careerInfo"), function(i, v){
                    if($(this).find("#careerOrgName" + i).val() != ""){
                        if(!$(this).find("#careerFileNo" + i).val() && $("#careerFile" + i)[0].files.length == 0 && type == "next") {
                            flag = false;
                        }

                        if(!flag){
                            alert("경력 증빙파일은 필수사항입니다.");
                            return flag;
                        }
                    }
                })

                if(!flag){
                    return;
                }
            }

            var confirmText = "";
            if(type == "temp"){
                confirmText = "임시저장 하시겠습니까?";
            }else{
                confirmText = "다음 단계로 이동 하시겠습니까?";
            }

            if(confirm(confirmText)){
                var formData = new FormData();
                var schoolArr = new Array();
                $.each($(".schoolInfo"), function(i, v){
                    if($(this).find("#schoolType").val() != ""){
                        var arrData = {
                            schoolBaseId : $(this).find("#schoolBaseId" + i).val(),
                            applicationId : $("#applicationId").val(),
                            schoolType : $(this).find("#schoolType").val(),
                            admissionDt : $(this).find("#admissionDt" + i).val(),
                            graduationDt : $(this).find("#graduationDt" + i).val(),
                            schoolName : $(this).find("#schoolName" + i).val(),
                            dept : $(this).find("#dept" + i).val(),
                            major : $(this).find("#major" + i).val(),
                            graduateType : $(this).find("#graduateType" + i).val(),
                            grade : $(this).find("#grade" + i).val(),
                            userEmail : $("#userEmail").val(),
                            degreeFileNo : $(this).find("#degreeFileNo" + i).val(),
                            sexualFileNo : $(this).find("#sexualFileNo" + i).val(),
                        }

                        if($(this).find("#degreeFile" + i)[0].files.length != 0){
                            formData.append("degreeFile" + i, $(this).find("#degreeFile" + i)[0].files[0]);
                        }

                        if($(this).find("#sexualFile" + i)[0].files.length != 0){
                            formData.append("sexualFile" + i, $(this).find("#sexualFile" + i)[0].files[0]);
                        }

                        schoolArr.push(arrData);
                    }
                })

                var careerArr = new Array();
                $.each($(".careerInfo"), function(i, v){
                    if($(this).find("#careerOrgName" + i).val() != ""){
                        var arrData = {
                            careerBaseId : $(this).find("#careerBaseId" + i).val(),
                            applicationId : $("#applicationId").val(),
                            careerOrgName : $(this).find("#careerOrgName" + i).val(),
                            workStDt : $(this).find("#workStDt" + i).val(),
                            workEnDt : $(this).find("#workEnDt" + i).val(),
                            position : $(this).find("#position" + i).val(),
                            chargeWork : $(this).find("#chargeWork" + i).val(),
                            retireSalary : $(this).find("#retireSalary" + i).val(),
                            retireReason : $(this).find("#retireReason" + i).val(),
                            careerContent : $("#careerContent" + i).val(),
                            userEmail : $("#userEmail").val(),
                            careerFileNo : $(this).find("#careerFileNo" + i).val(),
                        }

                        if($(this).find("#careerFile" + i)[0].files.length != 0){
                            formData.append("careerFile" + i, $(this).find("#careerFile" + i)[0].files[0]);
                        }

                        careerArr.push(arrData);
                    }
                })

                formData.append("applicationId", $("#applicationId").val());
                formData.append("schoolArr", JSON.stringify(schoolArr));
                formData.append("careerArr", JSON.stringify(careerArr));
                formData.append("userEmail", $("#userEmail").val());

                var result = customKendo.fn_customFormDataAjax("/application/setApplicationForm2.do", formData);
                if(result.flag){
                    if(type == "temp"){
                        alert("임시저장 되었습니다.");
                        location.reload();
                    }else{
                        location.href = "/application/applicationForm3.do?applicationId=" + $("#applicationId").val() + "&recruitAreaInfoSn=" + $("#recruitAreaInfoSn").val();
                    }
                }
            }
        }
    },

    applicationDataSet : function(e){
        var result = customKendo.fn_customAjax("/application/getApplicationForm2.do", {applicationId : $("#applicationId").val()});
        if(result.flag){
            if(result.data.school.length > 0){
                applicationForm2.schoolSet(result.data.school);
            }

            if(result.data.career.length > 0){
                applicationForm2.careerSet(result.data.career);
            }
        }
    },

    schoolSet : function(e){
        for(var i = 0; i < e.length; i++){
            if(i != 0){
                applicationForm2.addSchoolRow();
            }

            $("#school" + i).find("#schoolBaseId" + i).val(e[i].APPLICATION_SCHOOL_ID)
            $("#school" + i).find("#schoolType").val(e[i].SCHOOL_TYPE).prop("selected", true);
            $("#school" + i).find("#admissionDt" + i).val(e[i].ADMISSION_DT)
            $("#school" + i).find("#graduationDt" + i).val(e[i].GRADUATION_DT)
            $("#school" + i).find("#schoolName" + i).val(e[i].SCHOOL_NAME)

            $("#school" + i).find("#dept" + i).val(e[i].DEPT)
            $("#school" + i).find("#major" + i).val(e[i].MAJOR)
            $("#school" + i).find("#graduateType" + i).val(e[i].GRADUATE_TYPE).prop("selected", true);
            $("#school" + i).find("#grade" + i).val(e[i].GRADE)

            if(e[i].degreeFile != null){
                $("#school" + i).find("#degreeFileNo" + i).val(e[i].degreeFile.file_no)
                $("#school" + i).find("#degreeFileName" + i).val(e[i].degreeFile.file_org_name + "." + e[i].degreeFile.file_ext);
            }

            if(e[i].sexualFile != null){
                $("#school" + i).find("#sexualFileNo" + i).val(e[i].sexualFile.file_no)
                $("#school" + i).find("#sexualFileName" + i).val(e[i].sexualFile.file_org_name + "." + e[i].sexualFile.file_ext);
            }
        }
    },

    careerSet : function(e){
        for(var i = 0; i < e.length; i++){
            if(i != 0){
                applicationForm2.addCareerRow();
            }

            $("#career" + i).find("#careerBaseId" + i).val(e[i].APPLICATION_CAREER_ID)
            $("#career" + i).find("#careerOrgName" + i).val(e[i].CAREER_ORG_NAME)
            $("#career" + i).find("#workStDt" + i).val(e[i].WORK_ST_DT)
            $("#career" + i).find("#workEnDt" + i).val(e[i].WORK_EN_DT)
            $("#career" + i).find("#position" + i).val(e[i].POSITION)
            $("#career" + i).find("#chargeWork" + i).val(e[i].CHARGE_WORK)
            $("#career" + i).find("#retireSalary" + i).val(e[i].RETIRE_SALARY)
            $("#career" + i).find("#retireReason" + i).val(e[i].RETIRE_REASON)
            $("#career" + i + "_1").find("#careerContent" + i).val(e[i].CAREER_CONTENT)

            if(e[i].careerFile != null){
                $("#career" + i).find("#careerFileNo" + i).val(e[i].careerFile.file_no)
                $("#career" + i).find("#careerFileName" + i).val(e[i].careerFile.file_org_name + "." + e[i].careerFile.file_ext);
            }
        }
    },

    getSelectBoxSetting : function(){
        var result = customKendo.fn_customAjax("/inside/getRecruitArea.do", {recruitAreaInfoSn : $("#recruitAreaInfoSn").val()});
        if(result.flag){
            $("#recruitAreaInfoSnTxt").text(result.recruitArea.JOB)
        }
    },

    getKendoSetting : function(){
        $("#admissionDt0, #graduationDt0, #workStDt0, #workEnDt0").kendoDatePicker({
            depth: "",
            start: "",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date()
        });
    },

    fnResizeForm : function() {
        var strHeight = $('.pop_sign_wrap').outerHeight() + (window.outerHeight - window.innerHeight) + 10;

        //$('.pop_sign_wrap').css("overflow","auto");
        try{
            var childWindow = window.parent;
            childWindow.resizeTo(1500, strHeight);
        }catch(exception){
            console.log('window resizing cat not run dev mode.');
        }
    },

    getFileName : function(e){
        $(e).prev().prev().val(e.files[0].name);
    }
}