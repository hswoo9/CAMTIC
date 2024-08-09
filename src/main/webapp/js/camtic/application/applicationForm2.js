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
                    '<input type="hidden" id="schoolBaseId' + applicationForm2.global.schoolIndex + '" name="schoolBaseId' + applicationForm2.global.schoolIndex + '" class="schoolBaseId">' +
                    '<select id="schoolType" class="__inp" style="width:100px; height:40px; border: 1px solid #ddd; text-align:center; display: inline-block;" onchange="applicationForm2.schoolTypeChange(this)">>' +
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
                    '<input type="text" id="admissionDt' + applicationForm2.global.schoolIndex + '" class="admissionDt" name="admissionDt" style="width: 45%"> ~ ' +
                    '<input type="text" id="graduationDt' + applicationForm2.global.schoolIndex + '" class="graduationDt" name="graduationDt" style="width: 45%">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="schoolName' + applicationForm2.global.schoolIndex + '" class="__inp schoolName" style="width: 100px; height:40px; border: 1px solid #ddd; text-align:center; display: inline-block;">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="dept' + applicationForm2.global.schoolIndex + '" class="__inp dept"  style="width: 100px; height:40px; border: 1px solid #ddd; text-align:center; display: inline-block;">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="major' + applicationForm2.global.schoolIndex + '" class="__inp major" style="width: 100px; height:40px; border: 1px solid #ddd; text-align:center; display: inline-block;">' +
                '</td>' +
                '<td>' +
                    '<select id="graduateType' + applicationForm2.global.schoolIndex + '" class="__inp graduateType" style="width:70px; height:40px; border: 1px solid #ddd; text-align:center; display: inline-block;">' +
                        '<option value="">선택</option>' +
                        '<option value="1">졸업</option>' +
                        '<option value="2">졸업예정</option>' +
                        '<option value="3">수료</option>' +
                    '</select>' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="grade' + applicationForm2.global.schoolIndex + '" class="__inp graduateType" style="width:50px; height:40px; border: 1px solid #ddd; text-align:center; display: inline-block; ">' +
                '</td>' +
                '<td class="tac" style="line-height: 0.1;">' +
                    '<input type="hidden" id="degreeFileNo' + applicationForm2.global.schoolIndex + '" class="degreeFileNo" name="degreeFileNo' + applicationForm2.global.schoolIndex + '">' +
                    '<input type="hidden" id="degreeFileUpdCk' + applicationForm2.global.schoolIndex + '" name="degreeFileUpdCk' + applicationForm2.global.schoolIndex + '" class="degreeFileUpdCk">' +
                    '<input type="text" id="degreeFileName' + applicationForm2.global.schoolIndex + '" class="degreeFileName" style="width: 100px; color:#337ab7;" disabled>' +
                    '<label for="degreeFile' + applicationForm2.global.schoolIndex + '" class="degreeFileLabel k-button k-button-clear-info k-rounded" style="vertical-align: bottom;margin:0;">파일첨부</label>' +
                    '<input type="file" id="degreeFile' + applicationForm2.global.schoolIndex + '" class="degreeFile" name="degreeFile' + applicationForm2.global.schoolIndex + '" style="display: none" onChange="applicationForm2.getFileName(this)">' +
                '</td>' +
                '<td class="tac" style="line-height: 0.1;">' +
                    '<input type="hidden" id="sexualFileNo' + applicationForm2.global.schoolIndex + '" class="sexualFileNo" name="sexualFileNo' + applicationForm2.global.schoolIndex + '">' +
                    '<input type="hidden" id="sexualFileUpdCk' + applicationForm2.global.schoolIndex + '" name="sexualFileUpdCk' + applicationForm2.global.schoolIndex + '" class="sexualFileUpdCk">' +
                    '<input type="text" id="sexualFileName' + applicationForm2.global.schoolIndex + '" class="sexualFileName" style="width: 100px; color:#337ab7;" disabled>' +
                    '<label for="sexualFile' + applicationForm2.global.schoolIndex + '" class="sexualFileLabel k-button k-button-clear-info k-rounded" style="vertical-align: bottom;margin:0;">파일첨부</label>' +
                    '<input type="file" id="sexualFile' + applicationForm2.global.schoolIndex + '" class="sexualFile" name="sexualFile' + applicationForm2.global.schoolIndex + '" style="display: none" onChange="applicationForm2.getFileName(this)">' +
                '</td>' +
                '<td>' +
                    '<button type="button" class="k-button k-button-solid-error" onClick="applicationForm2.delRow(\'schoolInfo\', this)"><span>삭제</span></button>' +
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

    schoolTypeChange : function(e){
        if($(e).val() == "1"){
            $(e).closest("tr").find(".dept").hide()
            $(e).closest("tr").find(".major").hide()
            $(e).closest("tr").find(".grade").hide()
            $(e).closest("tr").find(".degreeFileNo").hide()
            $(e).closest("tr").find(".degreeFileLabel").hide()
            $(e).closest("tr").find(".degreeFileName").hide()
            $(e).closest("tr").find(".sexualFileNo").hide()
            $(e).closest("tr").find(".sexualFileLabel").hide()
            $(e).closest("tr").find(".sexualFileName").hide()
        }else{
            $(e).closest("tr").find(".dept").show()
            $(e).closest("tr").find(".major").show()
            $(e).closest("tr").find(".grade").show()
            $(e).closest("tr").find(".degreeFileNo").show()
            $(e).closest("tr").find(".degreeFileLabel").show()
            $(e).closest("tr").find(".degreeFileName").show()
            $(e).closest("tr").find(".sexualFileNo").show()
            $(e).closest("tr").find(".sexualFileLabel").show()
            $(e).closest("tr").find(".sexualFileName").show()
        }
    },

    addCareerRow : function(){
        applicationForm2.global.createHtmlStr = "";

        applicationForm2.global.careerIndex++

        applicationForm2.global.createHtmlStr = "" +
            '<tr class="careerInfo" id="career' + applicationForm2.global.careerIndex + '">' +
                '<td>' +
                    '<input type="hidden" id="careerBaseId' + applicationForm2.global.careerIndex + '" name="careerBaseId' + applicationForm2.global.careerIndex + '" class="careerBaseId">' +
                    '<input type="text" id="careerOrgName' + applicationForm2.global.careerIndex + '" class="__inp careerOrgName" style="width: 100px; height:40px; border: 1px solid #ddd; text-align:center; display: inline-block;">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="workStDt' + applicationForm2.global.careerIndex + '" class="workStDt period" name="workStDt" style="width: 45%"> ~ ' +
                    '<input type="text" id="workEnDt' + applicationForm2.global.careerIndex + '" class="workEnDt period" name="workEnDt" style="width: 45%">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="position' + applicationForm2.global.careerIndex + '" class="__inp position" style="width: 100px; height:40px; border: 1px solid #ddd; text-align:center; display: inline-block;">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="chargeWork' + applicationForm2.global.careerIndex + '" class="__inp chargeWork" style="width: 100px; height:40px; border: 1px solid #ddd; text-align:center; display: inline-block;">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="retireSalary' + applicationForm2.global.careerIndex + '" class="__inp retireSalary" style="width: 100px; height:40px; border: 1px solid #ddd; text-align:center; display: inline-block;">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="retireReason' + applicationForm2.global.careerIndex + '" class="__inp retireReason" style="width: 150px; height:40px; border: 1px solid #ddd; text-align:center; display: inline-block; ">' +
                '</td>' +
                '<td class="tac" style="line-height: 0.1;">' +
                    '<input type="hidden" id="careerFileNo' + applicationForm2.global.careerIndex + '" name="careerFileNo' + applicationForm2.global.careerIndex + '" class="careerFileNo">' +
                    '<input type="hidden" id="careerFileUpdCk' + applicationForm2.global.careerIndex + '" name="careerFileUpdCk' + applicationForm2.global.careerIndex + '" class="careerFileUpdCk">' +
                    '<input type="text" id="careerFileName' + applicationForm2.global.careerIndex + '" class="careerFileName" style="width: 100px; color:#337ab7;">' +
                    '<label for="careerFile' + applicationForm2.global.careerIndex + '" class="careerFileLabel k-button k-button-clear-info k-rounded" style="vertical-align: bottom;margin:0;">파일첨부</label>' +
                    '<input type="file" id="careerFile' + applicationForm2.global.careerIndex + '" class="careerFile" name="careerFile' + applicationForm2.global.careerIndex + '" style="display: none" onChange="applicationForm2.getFileName(this)">' +
                '</td>' +
                '<td>' +
                    '<button type="button" class="k-button k-button-solid-error" onclick="applicationForm2.delRow(\'careerInfo\', this)"><span>삭제</span></button>' +
                '</td>' +
            '</tr>' +
            '<tr id="career' + applicationForm2.global.careerIndex + '_1" class="careerInfo_1">' +
                '<th>담당업무 세부사항</th>' +
                '<td colSpan="7">' +
                    '<textarea id="careerContent' + applicationForm2.global.careerIndex + '" class="careerContent" style="width: 100%; height: 100%; box-sizing: border-box; border:1px solid #ddd; margin: 0; padding: 5px;"></textarea>' +
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

    delRow : function(c, t){
        if(confirm("삭제하시겠습니까?")){
            if(c == "schoolInfo"){
                $(t).closest("tr").remove();
                applicationForm2.global.schoolIndex--;
                applicationForm2.rowAttrOverride(c);
            }else if(c == "careerInfo"){
                $(t).closest("tr").remove();
                $("#" + $(t).closest("tr").attr("id") + "_1").remove();
                applicationForm2.global.careerIndex--;
                applicationForm2.rowAttrOverride(c);
            }
        }
    },

    rowAttrOverride : function(e){
        $.each($("." + e), function(i, v){
            if(e == "schoolInfo"){
                $(this).attr("id", "school" + i);
                $(this).find(".schoolBaseId").attr("id", "schoolBaseId" + i);
                $(this).find(".schoolBaseId").attr("name", "schoolBaseId" + i);

                $(this).find("input[name='admissionDt']").attr("id", "admissionDt" + i);
                $(this).find("input[name='graduationDt']").attr("id", "graduationDt" + i);
                $(this).find(".schoolName").attr("id", "schoolName" + i);
                $(this).find(".dept").attr("id", "dept" + i);
                $(this).find(".major").attr("id", "major" + i);
                $(this).find(".graduateType").attr("id", "graduateType" + i);
                $(this).find(".grade").attr("id", "grade" + i);

                $(this).find(".degreeFileNo").attr("id", "degreeFileNo" + i);
                $(this).find(".degreeFileNo").attr("name", "degreeFileNo" + i);
                $(this).find(".degreeFileName").attr("id", "degreeFileName" + i);
                $(this).find(".degreeFileLabel").attr("for", "degreeFile" + i);
                $(this).find(".degreeFile").attr("id", "degreeFile" + i);
                $(this).find(".degreeFile").attr("name", "degreeFile" + i);

                $(this).find(".sexualFileNo").attr("id", "sexualFileNo" + i);
                $(this).find(".sexualFileNo").attr("name", "sexualFileNo" + i);
                $(this).find(".sexualFileName").attr("id", "sexualFileName" + i);
                $(this).find(".sexualFileLabel").attr("for", "sexualFile" + i);
                $(this).find(".sexualFile").attr("id", "sexualFile" + i);
                $(this).find(".sexualFile").attr("name", "sexualFile" + i);
            }else{
                $("#" + $(this).attr("id") + "_1").find(".careerContent").attr("id", "careerContent" + i);
                $("#" + $(this).attr("id") + "_1").attr("id", "career" + i + "_1")
                $(this).attr("id", "career" + i);
                $(this).find(".careerBaseId").attr("id", "careerBaseId" + i);
                $(this).find(".careerBaseId").attr("name", "careerBaseId" + i);
                $(this).find(".careerOrgName").attr("id", "careerOrgName" + i);
                $(this).find("input[name='workStDt']").attr("id", "workStDt" + i);
                $(this).find("input[name='workEnDt']").attr("id", "workEnDt" + i);

                $(this).find(".position").attr("id", "position" + i);
                $(this).find(".chargeWork").attr("id", "chargeWork" + i);
                $(this).find(".retireSalary").attr("id", "retireSalary" + i);
                $(this).find(".retireReason").attr("id", "retireReason" + i);

                $(this).find(".careerFileNo").attr("id", "careerFileNo" + i);
                $(this).find(".careerFileNo").attr("name", "careerFileNo" + i);
                $(this).find(".careerFileName").attr("id", "careerFileName" + i);
                $(this).find(".careerFileLabel").attr("for", "careerFile" + i);
                $(this).find(".careerFile").attr("id", "careerFile" + i);
                $(this).find(".careerFile").attr("name", "careerFile" + i);
            }
        })
    },


    setApplicationTempSave : function(type){
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

        var confirmText = "";
        confirmText = "수정 하시겠습니까?";

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
                        degreeFileUpdCk : $(this).find("#degreeFileUpdCk" + i).val(),
                        sexualFileUpdCk : $(this).find("#sexualFileUpdCk" + i).val(),

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
                        careerFileUpdCk : $(this).find("#careerFileUpdCk" + i).val(),
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
                alert("수정되었습니다.");
                location.reload();
            }
        }
    },

    setApplicationPrev : function(){
        location.href = "/application/applicationForm1.do?applicationId=" + $("#applicationId").val() ;
    },

    setApplicationNext : function(){
        location.href = "/application/applicationForm3.do?applicationId=" + $("#applicationId").val() + "&recruitAreaInfoSn=" + $("#recruitAreaInfoSn").val();
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

            $("#school" + i).find("#degreeFileUpdCk" + i).val(e[i].DEGREE_FILE_UPD_CK)
            $("#school" + i).find("#sexualFileUpdCk" + i).val(e[i].SEXUAL_FILE_UPD_CK)

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
            $("#career" + i).find("#careerFileUpdCk" + i).val(e[i].CAREER_FILE_UPD_CK)

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
        //var strWidth = $('.pop_sign_wrap').outerWidth() + (window.outerWidth - window.innerWidth);
        var strHeight = $('.pop_sign_wrap').outerHeight() + (window.outerHeight - window.innerHeight) + 10;

        //$('.pop_sign_wrap').css("overflow","auto");
        try{
            var childWindow = window.parent;
            childWindow.resizeTo(1600, strHeight);
        }catch(exception){
            console.log('window resizing cat not run dev mode.');
        }
    },

    getFileName : function(e){
        $(e).prev().prev().val(e.files[0].name);
    }
}