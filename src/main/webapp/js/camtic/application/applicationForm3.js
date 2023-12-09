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
            '<tr class="cert" id="cert' + applicationForm3.global.certIndex + '">' +
                '<td>' +
                    '<input type="hidden" id="certBaseId' + applicationForm3.global.certIndex + '" name="certBaseId' + applicationForm3.global.certIndex + '" class="certBaseId">' +
                    '<input type="text" id="certName' + applicationForm3.global.certIndex + '" class="certName" style="width: 100px; height:40px; border: 1px solid #ddd; text-align:center; display: inline-block;"">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="certClass' + applicationForm3.global.certIndex + '" class="certClass" style="width: 100px; height:40px; border: 1px solid #ddd; text-align:center; display: inline-block;">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="certIssuer' + applicationForm3.global.certIndex + '" class="certIssuer" style="width: 100px; height:40px; border: 1px solid #ddd; text-align:center; display: inline-block;">' +
                '</td>' +
                '<td>' +
                    '<input type="hidden" id="certFileNo' + applicationForm3.global.certIndex + '" name="certFileNo' + applicationForm3.global.certIndex + '" class="certFileNo">' +
                    '<input type="text" id="certFileName' + applicationForm3.global.certIndex + '" class="certFileName" style="width: 147px ;font-size:15px; color:#337ab7;">' +
                    '<label for="certFile' + applicationForm3.global.certIndex + '" class="certFileLabel k-button k-button-clear-info k-rounded" style="vertical-align: bottom;margin:0;">파일첨부</label>' +
                    '<input type="file" id="certFile' + applicationForm3.global.certIndex + '" class="certFile" name="certFile' + applicationForm3.global.certIndex + '" style="display: none" onChange="applicationForm3.getFileName(this)">' +
                '</td>' +
                '<td>' +
                    '<button type="button" class="k-button k-button-solid-error" onclick="applicationForm3.delRow(\'cert\', this)"><span>삭제</span></button>' +
                '</td>' +
            '</tr>' +
            '<tr id="cert' + applicationForm3.global.certIndex + '_1" class="cert_1">' +
                '<th style="text-align: center;">활용능력</th>' +
                '<td colSpan="6">' +
                    '<textarea id="certContent' + applicationForm3.global.certIndex + '" class="certContent" style="width: 100%; height: 100%; box-sizing: border-box; border:1px solid #ddd; margin: 0; padding: 5px;"></textarea>' +
                '</td>' +
            '</tr>';

        $("#certTb").append(applicationForm3.global.createHtmlStr);
    },

    addLangRow : function(){
        applicationForm3.global.createHtmlStr = "";

        applicationForm3.global.langIndex++

        applicationForm3.global.createHtmlStr = "" +
            '<tr class="lang" id="lang' + applicationForm3.global.langIndex + '">' +
                '<td>' +
                    '<input type="hidden" id="langBaseId' + applicationForm3.global.langIndex + '" name="langBaseId' + applicationForm3.global.langIndex + '" class="langBaseId">' +
                    '<input type="text" id="langName' + applicationForm3.global.langIndex + '" class="langName" style="width: 100px; height:40px; border: 1px solid #ddd; text-align:center; display: inline-block;">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="acquisitionDate' + applicationForm3.global.langIndex + '" class="acquisitionDate period" style="width: 100px; height:40px; border: 1px solid #ddd; text-align:center; display: inline-block;">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="acquisitionScore' + applicationForm3.global.langIndex + '" class="acquisitionScore" style="width: 100px; height:40px; border: 1px solid #ddd; text-align:center; display: inline-block;">' +
                '</td>' +
                '<td>' +
                    '<input type="hidden" id="langFileNo' + applicationForm3.global.langIndex + '" name="langFileNo' + applicationForm3.global.langIndex + '" class="langFileNo">' +
                    '<input type="text" id="langFileName' + applicationForm3.global.langIndex + '" class="langFileName" style="width: 147px ;font-size:15px; color:#337ab7;">' +
                    '<label for="langFile' + applicationForm3.global.langIndex + '" class="langFileLabel k-button k-button-clear-info k-rounded" style="vertical-align: bottom;margin:0;">파일첨부</label>' +
                    '<input type="file" id="langFile' + applicationForm3.global.langIndex + '" class="langFile" name="langFile' + applicationForm3.global.langIndex + '" style="display: none" onChange="applicationForm3.getFileName(this)">' +
                '</td>' +
                '<td>' +
                    '<button type="button" class="k-button k-button-solid-error" onclick="applicationForm3.delRow(\'lang\', this)"><span>삭제</span></button>' +
                '</td>' +
            '</tr>' +
            '<tr id="lang' + applicationForm3.global.langIndex + '_1" class="lang_1">' +
                '<th style="text-align: center;">활용능력</th>' +
                '<td colSpan="6">' +
                    '<textarea id="langContent' + applicationForm3.global.langIndex + '" class="langContent" style="width: 100%; height: 100%; box-sizing: border-box; border:1px solid #ddd; margin: 0; padding: 5px;"></textarea>' +
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

    delRow : function(c, t){
        if(confirm("삭제하시겠습니까?")){
            $("#" + $(t).closest("tr").attr("id") + "_1").remove();
            $(t).closest("tr").remove();
            if(c == "cert"){
                applicationForm3.global.certIndex--;
                applicationForm3.rowAttrOverride(c);
            }else if(c == "lang"){
                applicationForm3.global.langIndex--;
                applicationForm3.rowAttrOverride(c);
            }
        }
    },

    rowAttrOverride : function(e){
        $.each($("." + e), function(i, v){
            if(e == "cert"){
                $("#" + $(this).attr("id") + "_1").find(".certContent").attr("id", "certContent" + i);
                $("#" + $(this).attr("id") + "_1").attr("id", e + i + "_1");
                $(this).attr("id", "cert" + i);
                $(this).find(".certBaseId").attr("id", "certBaseId" + i);
                $(this).find(".certBaseId").attr("name", "certBaseId" + i);
                $(this).find(".certName").attr("id", "certName" + i);
                $(this).find(".certClass").attr("id", "certClass" + i);
                $(this).find(".certIssuer").attr("id", "certIssuer" + i);

                $(this).find(".certFileNo").attr("id", "certFileNo" + i);
                $(this).find(".certFileNo").attr("name", "certFileNo" + i);
                $(this).find(".certFileName").attr("id", "certFileName" + i);

                $(this).find(".certFileLabel").attr("for", "certFile" + i);
                $(this).find(".certFile").attr("id", "certFile" + i);
                $(this).find(".certFile").attr("name", "certFile" + i);

            }else{
                $("#" + $(this).attr("id") + "_1").find(".langContent").attr("id", "langContent" + i);
                $("#" + $(this).attr("id") + "_1").attr("id", e + i + "_1");
                $(this).attr("id", "lang" + i);
                $(this).find(".langBaseId").attr("id", "langBaseId" + i);
                $(this).find(".langBaseId").attr("name", "langBaseId" + i);
                $(this).find(".langName").attr("id", "langName" + i);
                $(this).find(".acquisitionDate").attr("id", "acquisitionDate" + i);
                $(this).find(".acquisitionScore").attr("id", "acquisitionScore" + i);

                $(this).find(".langFileNo").attr("id", "langFileNo" + i);
                $(this).find(".langFileNo").attr("name", "langFileNo" + i);
                $(this).find(".langFileName").attr("id", "langFileName" + i);
                $(this).find(".langFileLabel").attr("for", "langFile" + i);
                $(this).find(".langFile").attr("id", "langFile" + i);
                $(this).find(".langFile").attr("name", "langFile" + i);

            }
        })
    },

    setApplicationTempSave : function(type){
        if(type == "prev"){
            location.href = "/application/applicationForm2.do?applicationId=" + $("#applicationId").val() + "&recruitAreaInfoSn=" + $("#recruitAreaInfoSn").val();
        }else{
            if(type == "next"){
                var flag = true;
                $.each($(".cert"), function(i, v){
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

                $.each($(".lang"), function(i, v){
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
                $.each($(".cert"), function(i, v){
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
                $.each($(".lang"), function(i, v){
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
                        location.reload();
                    }else{
                        location.href = "/application/applicationIntroduce.do?applicationId=" + $("#applicationId").val() + "&recruitAreaInfoSn=" + $("#recruitAreaInfoSn").val();
                    }
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
        var strWidth = $('.pop_sign_wrap').outerWidth() + (window.outerWidth - window.innerWidth);
        var strHeight = $('.pop_sign_wrap').outerHeight() + (window.outerHeight - window.innerHeight) + 30;
        try{
            var childWindow = window.parent;
            childWindow.resizeTo((strWidth), strHeight);
        }catch(exception){
            console.log('window resizing cat not run dev mode.');
        }
    },

    getFileName : function(e){
        $(e).prev().val(e.files[0].name);
    }
}