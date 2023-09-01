var applicationForm3 = {
    global : {
        createHtmlStr : "",
        certIndex : 0,
        langIndex : 0,
    },

    fn_defaultScript : function() {
        applicationForm3.fnResizeForm();

        applicationForm3.getSelectBoxSetting();
        applicationForm3.getKendoSetting();

        if($("#applicationId").val() != ""){
            applicationForm3.applicationDataSet($("#applicationId").val());
        }
    },

    checkBoxChk : function(e){
        if($(e).is(":checked")){
            $("#otherDiv").show();
        }else{
            $("#otherDiv").hide();
        }
    },

    addCertRow : function(){
        applicationForm3.global.createHtmlStr = "";

        applicationForm3.global.certIndex++

        applicationForm3.global.createHtmlStr = "" +
            '<tr class="certInfo" id="cert' + applicationForm3.global.certIndex + '">' +
                '<td>' +
                    '<input type="hidden" id="certBaseId' + applicationForm3.global.certIndex + '" name="certBaseId' + applicationForm3.global.certIndex + '">' +
                    '<input type="text" id="certName' + applicationForm3.global.certIndex + '">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="certClass' + applicationForm3.global.certIndex + '">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="certIssuer' + applicationForm3.global.certIndex + '">' +
                '</td>' +
                '<td>' +
                    '<input type="hidden" id="certFileNo' + applicationForm3.global.certIndex + '" name="certFileNo' + applicationForm3.global.certIndex + '">' +
                    '<input type="text" id="certFileName' + applicationForm3.global.certIndex + '">' +
                    '<label for="certFile' + applicationForm3.global.certIndex + '" class="k-button k-button-clear-info k-rounded" style="vertical-align: bottom;margin:0;">파일첨부</label>' +
                    '<input type="file" id="certFile' + applicationForm3.global.certIndex + '" name="certFile' + applicationForm3.global.certIndex + '" style="display: none" onChange="applicationForm3.getFileName(this)">' +
                '</td>' +
            '</tr>' +
            '<tr id="cert' + applicationForm3.global.certIndex + '_1" class="certInfo_1">' +
                '<th>활용능력</th>' +
                '<td colSpan="6">' +
                    '<textarea id="certContent' + applicationForm3.global.certIndex + '"></textarea>' +
                '</td>' +
            '</tr>';

        $("#certTb").append(applicationForm3.global.createHtmlStr);
    },

    addLangRow : function(){
        applicationForm3.global.createHtmlStr = "";

        applicationForm3.global.langIndex++

        applicationForm3.global.createHtmlStr = "" +
            '<tr class="langInfo" id="lang' + applicationForm3.global.langIndex + '">' +
                '<td>' +
                    '<input type="hidden" id="langBaseId' + applicationForm3.global.langIndex + '" name="langBaseId' + applicationForm3.global.langIndex + '">' +
                    '<input type="text" id="langName' + applicationForm3.global.langIndex + '">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="acquisitionDate' + applicationForm3.global.langIndex + '" class="period">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="acquisitionScore' + applicationForm3.global.langIndex + '">' +
                '</td>' +
                '<td>' +
                    '<input type="hidden" id="langFileNo' + applicationForm3.global.langIndex + '" name="langFileNo' + applicationForm3.global.langIndex + '">' +
                    '<input type="text" id="langFileName' + applicationForm3.global.langIndex + '" style="width: 140px">' +
                    '<label for="langFile' + applicationForm3.global.langIndex + '" class="k-button k-button-clear-info k-rounded" style="vertical-align: bottom;margin:0;">파일첨부</label>' +
                    '<input type="file" id="langFile' + applicationForm3.global.langIndex + '" name="langFile' + applicationForm3.global.langIndex + '" style="display: none" onChange="applicationForm3.getFileName(this)">' +
                '</td>' +
            '</tr>' +
            '<tr id="lang' + applicationForm3.global.langIndex + '_1" class="langInfo_1">' +
                '<th>활용능력</th>' +
                '<td colSpan="6">' +
                    '<textarea id="langContent' + applicationForm3.global.langIndex + '"></textarea>' +
                '</td>' +
            '</tr>';

        $("#langTb").append(applicationForm3.global.createHtmlStr);

        $("#acquisitionDate" + applicationForm3.global.langIndex).kendoDatePicker({
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
                $("." + c + ":last-child").remove();
                if(c == "certInfo"){
                    $("." + c + ":last").remove();
                    $("." + c + "_1:last").remove();
                    applicationForm3.global.certIndex--;
                }else if(c == "langInfo"){
                    $("." + c + ":last").remove();
                    $("." + c + "_1:last").remove();
                    applicationForm3.global.langIndex--;
                }
            }
        }
    },

    setApplicationTempSave : function(type){
        if(type == "next"){
            var flag = true;
            $.each($(".certInfo"), function(i, v){
                if($(this).find("#certName" + i).val() != ""){
                    if(!$(this).find("#certFileNo" + i).val() && $("#certFile" + i)[0].files.length == 0 && type == "next") {
                        flag = false;
                    }

                    if(!flag){
                        alert("자격/면허 증빙파일은 필수사항입니다.");
                        return flag;
                    }
                }
            })

            if(!flag){
                return;
            }

            $.each($(".langInfo"), function(i, v){
                if($(this).find("#langName" + i).val() != ""){
                    if(!$(this).find("#langFileNo" + i).val() && $("#langFile" + i)[0].files.length == 0 && type == "next") {
                        flag = false;
                    }

                    if(!flag){
                        alert("외국어 증빙파일은 필수사항입니다.");
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
            var certArr = new Array();
            $.each($(".certInfo"), function(i, v){
                if($(this).find("#certName" + i).val() != ""){
                    var arrData = {
                        certBaseId : $(this).find("#certBaseId" + i).val(),
                        applicationId : $("#applicationId").val(),
                        certName : $(this).find("#certName" + i).val(),
                        certClass : $(this).find("#certClass" + i).val(),
                        certIssuer : $(this).find("#certIssuer" + i).val(),
                        certContent : $("#certContent" + i).val(),
                        userEmail : $("#userEmail").val(),
                        certFileNo : $(this).find("#certFileNo" + i).val(),
                    }

                    if($(this).find("#certFile" + i)[0].files.length != 0){
                        formData.append("certFile" + i, $(this).find("#certFile" + i)[0].files[0]);
                    }

                    certArr.push(arrData);
                }
            })

            var langArr = new Array();
            $.each($(".langInfo"), function(i, v){
                if($(this).find("#langName" + i).val() != ""){
                    var arrData = {
                        langBaseId : $(this).find("#langBaseId" + i).val(),
                        applicationId : $("#applicationId").val(),
                        langName : $(this).find("#langName" + i).val(),
                        acquisitionDate : $(this).find("#acquisitionDate" + i).val(),
                        acquisitionScore : $(this).find("#acquisitionScore" + i).val(),
                        langContent : $("#langContent" + i).val(),
                        userEmail : $("#userEmail").val(),
                        langFileNo : $(this).find("#langFileNo" + i).val(),
                    }

                    if($(this).find("#langFile" + i)[0].files.length != 0){
                        formData.append("langFile" + i, $(this).find("#langFile" + i)[0].files[0]);
                    }

                    langArr.push(arrData);
                }
            })

            formData.append("applicationId", $("#applicationId").val());
            formData.append("certArr", JSON.stringify(certArr));
            formData.append("langArr", JSON.stringify(langArr));
            formData.append("otherYn", $("#otherYn").is(":checked") ? "Y" : "N");
            if($("#otherYn").is(":checked")){
                formData.append("otherLang", $("#otherLang").val());
            }
            formData.append("userEmail", $("#userEmail").val());

            var result = customKendo.fn_customFormDataAjax("/application/setApplicationForm3.do", formData);
            if(result.flag){
                if(type == "temp"){
                    alert("임시저장 되었습니다.");
                    $("#applicationId").val(result.params.applicationId);
                }else{
                    location.href = "/application/applicationIntroduce.do?recruitAreaInfoSn=" + $("#recruitAreaInfoSn").val();
                }
            }
        }
    },

    applicationDataSet : function(e){
        var result = customKendo.fn_customAjax("/application/getApplicationForm3.do", {applicationId : $("#applicationId").val()});
        if(result.flag){
            console.log(result.data);
            if(result.data.OTHER_YN == "Y"){
                $("#otherYn").prop("checked", true);
                applicationForm3.checkBoxChk($("#otherYn"));
                $("#otherLang").val(result.data.OTHER_LANG);
            }else{
                $("#otherYn").prop("checked", false);
            }

            if(result.data.cert.length > 0){
                applicationForm3.certSet(result.data.cert);
            }

            if(result.data.lang.length > 0){
                applicationForm3.langSet(result.data.lang);
            }
        }
    },

    certSet : function(e){
        for(var i = 0; i < e.length; i++){
            if(i != 0){
                applicationForm3.addCertRow();
            }

            $("#cert" + i).find("#certBaseId" + i).val(e[i].APPLICATION_CERT_ID)
            $("#cert" + i).find("#certName" + i).val(e[i].CERT_NAME)
            $("#cert" + i).find("#certClass" + i).val(e[i].CERT_CLASS)
            $("#cert" + i).find("#certIssuer" + i).val(e[i].CERT_ISSUER)
            $("#cert" + i + "_1").find("#certContent" + i).val(e[i].CERT_CONTENT)
            
            if(e[i].certFile != null){
                $("#cert" + i).find("#certFileNo" + i).val(e[i].certFile.file_no)
                $("#cert" + i).find("#certFileName" + i).val(e[i].certFile.file_org_name + "." + e[i].certFile.file_ext);
            }
        }
    },

    langSet : function(e){
        for(var i = 0; i < e.length; i++){
            if(i != 0){
                applicationForm3.addLangRow();
            }

            $("#lang" + i).find("#langBaseId" + i).val(e[i].APPLICATION_LANG_ID)
            $("#lang" + i).find("#langName" + i).val(e[i].LANG_NAME)
            $("#lang" + i).find("#acquisitionDate" + i).val(e[i].ACQUISITION_DATE)
            $("#lang" + i).find("#acquisitionScore" + i).val(e[i].ACQUISITION_SCORE)
            $("#lang" + i + "_1").find("#langContent" + i).val(e[i].LANG_CONTENT)

            if(e[i].langFile != null){
                $("#lang" + i).find("#langFileNo" + i).val(e[i].langFile.file_no)
                $("#lang" + i).find("#langFileName" + i).val(e[i].langFile.file_org_name + "." + e[i].langFile.file_ext);
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
        $("#acquisitionDate0").kendoDatePicker({
            depth: "",
            start: "",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date()
        });
    },

    fnResizeForm : function() {
        var strHeight = $('.pop_sign_wrap').outerHeight() + (window.outerHeight - window.innerHeight) + 30;
        try{
            var childWindow = window.parent;
            childWindow.resizeTo(930, strHeight);
        }catch(exception){
            console.log('window resizing cat not run dev mode.');
        }
    },

    getFileName : function(e){
        $(e).prev().prev().val(e.files[0].name);
    }
}