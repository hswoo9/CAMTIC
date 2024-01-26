var applicationForm = {
    global : {
        createHtmlStr : "",
        eduRowIndex : 0,
        certIndex : 0,
        careerIndex : 0,
        careerFileList : "",
    },

    fn_defaultScript : function() {
        applicationForm.fnResizeForm();

        applicationForm.getSelectBoxSetting();
        applicationForm.getKendoSetting();
        applicationForm.careerType();

        if($("#applicationId").val() != ""){
            applicationForm.applicationDataSet($("#applicationId").val());
        }

        applicationForm.getFile();
    },

    careerType : function(){
        var html = "";
        if($("#recruitAreaInfoSn option:selected").attr("career") == "1,2"){
            html += '' +
                '<input type="hidden" id="careerType2" name="careerType" value="2">';
        }else if($("#recruitAreaInfoSn option:selected").attr("career") == "1"){
            html += '' +
                '<input type="hidden" id="careerType1" name="careerType" value="1">';
        }else {
            html += '' +
                '<input type="hidden" id="careerType2" name="careerType" value="2">';
        }
        $("#careerType .careerType").remove()
        $("#careerType").append(html);
    },

    addrSearch : function(){
        daum.postcode.load(function(){
            new daum.Postcode({
                oncomplete: function(data){

                    var roadAddr = data.roadAddress; // 도로명 주소 변수
                    var extraRoadAddr = ''; // 참고 항목 변수

                    // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                    // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                    if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                        extraRoadAddr += data.bname;
                    }
                    // 건물명이 있고, 공동주택일 경우 추가한다.
                    if(data.buildingName !== '' && data.apartment === 'Y'){
                        extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                    }
                    // 표시할 참고항목이 있을 경우
                    if(extraRoadAddr !== ''){
                        extraRoadAddr = ' (' + extraRoadAddr + ')';
                    }

                    $("#zipCode").val(data.zonecode);
                    $("#addr").val(roadAddr);

                    $("#addrDetail").focus();
                }
            }).open();
        });
    },

    checkBoxChk : function(e){
        if($(e).is(":checked")){
            $("#armiDiv").hide();
        }else{
            $("#armiDiv").show();
        }
    },

    setApplicationMod : function(type){
        if(type == "next"){
            if(!$("#userName").val()){
                alert("이름(한글)을 입력해주세요.");
                $("#userName").focus();
                return;
            }else if(!$("#userNameEn").val()){
                alert("이름(영문)을 입력해주세요.");
                $("#userNameEn").focus();
                return;
            }else if(!$("#userNameCn").val()){
                alert("이름(한자)을 입력해주세요.");
                $("#userNameCn").focus();
                return;
            }else if(!$("#gender").data("kendoRadioGroup").value()){
                alert("성별을 선택해주세요.");
                return;
            }else if(!$("#telNum").val()){
                alert("연락처를 입력해주세요.");
                $("#telNum").focus();
                return;
            }else if(!$("#mobileTelNum").val()){
                alert("휴대폰을 입력해주세요.");
                $("#mobileTelNum").focus();
                return;
            }else if(!$("#zipCode").val()){
                alert("우편번호를 입력해주세요.");
                $("#zipCode").click();
                return;
            }else if(!$("#addr").val()){
                alert("주소를 입력해주세요.");
                $("#addr").click();
                return;
            }else if(!$("#userEmail2").val()){
                alert("이메일을 입력해주세요.");
                $("#userEmail2").focus();
                return;
            }else if(!$("#hobby").val()){
                alert("취미를 입력해주세요.");
                $("#hobby").focus();
                return;
            }else if(!$("#specialty").val()) {
                alert("특기를 입력해주세요.");
                $("#specialty").focus();
                return;
            }else if(!$("#gender").data("kendoRadioGroup").value()) {
                alert("보훈대상여부를 선택해주세요.");
                return;
            }
            if(!$("#photoFileNo").val() && $("#photoFile")[0].files.length == 0){
                alert("증명사진을 선택해주세요.");
                return;
            }
            if($("#gender").data("kendoRadioGroup").value() == "Y"){
                if(!$("#veteransNum").val()){
                    alert("보훈번호를 입력해주세요");
                    $("#veteransNum").focus();
                    return;
                }
            }
            if(!$("#armiYn").is(":checked")){
                if(!$("#clsftCode").val()){
                    alert("군별을 선택해주세요");
                    return;
                }
                if($("#clsftCode").val() != "2" && $("#clsftCode").val() !== "1"){
                    if(!$("#militarySvcType").val()){
                        alert("병역구분을 선택해주세요");
                        return;
                    }else if(!$("#rank").val()){
                        alert("계급을 입력해주세요");
                        $("#rank").focus();
                        return;
                    }else if(!$("#etc").val()){
                        alert("병과를 입력해주세요");
                        $("#etc").focus();
                        return;
                    }
                }else if($("#clsftCode").val() == "2"){
                    if(!$("#mUnfulReason").val()){
                        alert("면제사유를 입력해주세요.");
                        $("#mUnfulReason").focus();
                        return;
                    }
                }
                if((!$("#armiFileNo").val() && $("#armiFile")[0].files.length == 0)&& $("#clsftCode").val() !== "1"){
                    alert("증빙파일을 선택해주세요.");
                    return;
                }
            }
            if (!$("#telNum").val() || $("#telNum").val().replace(/\D/g, '').length < 9) {
                alert("연락처의 양식이 잘못되었습니다.");
                $("#telNum").focus();
                return;
            }
            if (!$("#mobileTelNum").val() || $("#mobileTelNum").val().replace(/\D/g, '').length < 10) {
                alert("휴대폰 번호의 양식이 잘못되었습니다.");
                $("#mobileTelNum").focus();
                return;
            }
        }

        var confirmText = "";
        confirmText = "수정 하시겠습니까?";

        if(confirm(confirmText)){
            var formData = new FormData();
            var genderValue = $("#gender").data("kendoRadioGroup").value();
            var veteransValue = $("#veterans").data("kendoRadioGroup").value();

            formData.append("applicationId", $("#applicationId").val());
            formData.append("recruitInfoSn", $("#recruitInfoSn").val());
            formData.append("recruitAreaInfoSn", $("#recruitAreaInfoSn").val());
            formData.append("careerType", $("input[name='careerType']").val());
            formData.append("userEmail", $("#userEmail2").val());

            formData.append("userName", $("#userName").val());
            formData.append("userNameEn", $("#userNameEn").val());
            formData.append("userNameCn", $("#userNameCn").val());
            formData.append("bDay", $("#bDay").val());
            formData.append("lunarYn", $("#lunarYn").is(":checked") ? "Y" : "N");
            formData.append("gender", genderValue !== undefined ? genderValue : "");
            formData.append("photoFile", $("#photoFile")[0].files[0]);
            formData.append("telNum", $("#telNum").val());
            formData.append("mobileTelNum", $("#mobileTelNum").val());
            formData.append("zipCode", $("#zipCode").val());
            formData.append("addr", $("#addr").val());
            formData.append("addrDetail", $("#addrDetail").val());
            formData.append("hobby", $("#hobby").val());
            formData.append("specialty", $("#specialty").val());
            formData.append("veterans", veteransValue !== undefined ? veteransValue : "");
            formData.append("veteransNum", $("#veteransNum").val());

            formData.append("armiYn", !$("#armiYn").is(":checked") ? "Y" : "N");
            if(!$("#armiYn").is(":checked")){
                formData.append("clsftCode", $("#clsftCode").val());
                if($("#clsftCode").val() != "2"){
                    formData.append("militarySvcType", $("#militarySvcType").val());
                    formData.append("mEnlistDay", $("#mEnlistDay").val());
                    formData.append("mDishargeDay", $("#mDishargeDay").val());
                    formData.append("rank", $("#rank").val());
                    formData.append("etc", $("#etc").val());
                }else if($("#clsftCode").val() == "2"){
                    formData.append("mUnfulReason", $("#mUnfulReason").val());
                }

                formData.append("armiFile", $("#armiFile")[0].files[0]);
            }
            console.log("userName : "+formData.get("userName"));
            console.log("gender : "+formData.get("gender"));
            var result = customKendo.fn_customFormDataAjax("/application/setApplicationForm1.do", formData);
            if(result.flag){
                alert("수정되었습니다.");

                applicationForm.fileSave();

                location.reload();
            }
        }
    },

    setApplicationNext : function(){
        location.href = "/application/applicationForm2.do?applicationId=" + $("#applicationId").val() + "&recruitAreaInfoSn=" + $("#recruitAreaInfoSn").val();
    },

    applicationDataSet : function(e){
        var result = customKendo.fn_customAjax("/application/getApplicationForm1.do", {applicationId : $("#applicationId").val()});
        if(result.flag){
            console.log(result);
            var e = result.data;
            $("#recruitInfoSn").val(e.RECRUIT_INFO_SN);
            $("#applicationId").val(e.APPLICATION_ID);
            $("#recruitAreaInfoSn").val(e.RECRUIT_AREA_INFO_SN).prop("selected", true);
            $("#userName").val(e.USER_NAME);
            $("#userNameEn").val(e.USER_NAME_EN);
            $("#userNameCn").val(e.USER_NAME_CN);
            $("#bDay").val(e.BDAY);
            if(e.LUNAR_YN == "Y"){
                $("#lunarYn").prop("checked", true);
            }else{
                $("#lunarYn").prop("checked", false);
            }
            $("#gender").data("kendoRadioGroup").value(e.GENDER);
            $("#telNum").val(e.TEL_NUM)
            $("#mobileTelNum").val(e.MOBILE_TEL_NUM)
            $("#zipCode").val(e.ZIP_CODE)
            $("#addr").val(e.ADDR)
            $("#addrDetail").val(e.ADDR_DETAIL)
            $("#userEmail2").val(e.USER_EMAIL);
            $("#hobby").val(e.HOBBY)
            $("#specialty").val(e.SPECIALTY)
            $("#veterans").data("kendoRadioGroup").value(e.VETERANS)
            $("#veteransNum").val(e.VETERANS_NUM)

            if (e.CAREER_TYPE === '1') {
                $("#careerType1").prop("checked", true);
                $("#careerType2").prop("checked", false);
            } else if (e.CAREER_TYPE === '2') {
                $("#careerType1").prop("checked", false);
                $("#careerType2").prop("checked", true);
            }

            if(e.photoFile != null){
                $("#photoFileNo").val(e.photoFile.file_no);
                $("#photoView").attr("src", e.photoFile.file_path + e.photoFile.file_uuid);
            }

            if(e.ARMI_YN == "Y"){
                $("#armiYn").prop("checked", false);
                applicationForm.checkBoxChk($("#armiYn"));
            }else{
                $("#armiYn").prop("checked", true);
            }

            $("#clsftCode").val(e.CLSFT_CODE).prop("selected", true);
            $("#militarySvcType").val(e.MILITARY_SVC_TYPE).prop("selected", true);
            $("#mEnlistDay").val(e.M_ENLIST_DAY);
            $("#mDishargeDay").val(e.M_DISHARGE_DAY);
            $("#rank").val(e.RANK)
            $("#etc").val(e.ETC)
            $("#mUnfulReason").val(e.M_UNFUL_REASON);

            if(e.armiFile != null){
                $("#armiFileNo").val(e.armiFile.file_no);
                $("#armiFileName").text(e.armiFile.file_org_name + "." + e.armiFile.file_ext);
            }
        }
    },

    moveToRecruitView : function(){
        if($("#pageName").val() == "myApplication"){
            var comSubmit = new ComSubmit();
            comSubmit.setUrl("/application/myApplicationList.do");
            comSubmit.addParam("queryParams", new URLSearchParams($("#queryParams").val()).toString());
            comSubmit.submit();
        }else{
            var comSubmit = new ComSubmit();
            comSubmit.setUrl("/recruit/view.do");
            comSubmit.addParam("recruitBoardId", $("#recruitBoardId").val());
            comSubmit.submit();
        }
    },

    fnResizeForm : function() {
        var strWidth = $('.pop_sign_wrap').outerWidth() + (window.outerWidth - window.innerWidth);
        //var strWidth = $('.pop_sign_wrap').outerWidth();
        var strHeight = $('.pop_sign_wrap').outerHeight() + (window.outerHeight - window.innerHeight) + 10;

        //$('.pop_sign_wrap').css("overflow","auto");
        try{
            var childWindow = window.parent;
            childWindow.resizeTo((strWidth), strHeight);
        }catch(exception){
            console.log('window resizing cat not run dev mode.');
        }
    },

    getSelectBoxSetting : function(){
        var result = customKendo.fn_customAjax("/inside/getRecruit.do", {recruitInfoSn : $("#recruitInfoSn").val()});
        if(result.flag){
            applicationForm.setChildrenCode(result.recruit.recruitArea);
        }
    },

    setChildrenCode : function(e){
        if(e.length > 0){
            var html = "";
            for(var j = 0; j < e.length; j++){
                html += "<option value='" + e[j].RECRUIT_AREA_INFO_SN + "' career='" + e[j].CAREER_TYPE + "'>" + e[j].JOB + "</option>"
            }
            $("#recruitAreaInfoSn").append(html);
        }
    },

    getKendoSetting : function(){
        $("#bDay").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date()
        });

        $("#gender").kendoRadioGroup({
            items: [
                { label : "남", value : "M" },
                { label : "여", value : "F" }
            ],
            layout : "horizontal",
            labelPosition : "after",
        }).data("kendoRadioGroup");

        $("#veterans").kendoRadioGroup({
            items: [
                { label : "대상", value : "Y" },
                { label : "비대상", value : "N" }
            ],
            layout : "horizontal",
            labelPosition : "after",
        }).data("kendoRadioGroup");

        $("#mEnlistDay").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date()
        });

        $("#mDishargeDay").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date()
        });
    },

    viewPhoto : function(input){
        if(input.files[0].size > 10000000){
            alert("파일 용량이 너무 큽니다. 10MB 이하로 업로드해주세요.");
            return;
        }

        if(input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#photoView').attr('src', e.target.result);
                $('#photoView').css('display', 'block');
                $('#photoViewText').css('display', 'none');
            }
            reader.readAsDataURL(input.files[0]);
        }
    },

    getFileName : function(e){
        $(e).prev().prev().text(e.files[0].name);
    },

    getFileName123 : function(e){
        $(e).prev().prev().text(e.files[0].name);
        $("#fileChange").val("Y");
    },

    fileSave : function(){
        if($("#fileChange").val() != "Y" && $("#fileName").text() == ""){
            alert("파일 첨부 후 저장 가능합니다."); return;
        }

        var formData = new FormData();
        formData.append("applicationId", $("#applicationId").val());
        formData.append("file", $("#file")[0].files[0]);
        formData.append("empSeq", $("#regEmpSeq").val());

        var result = customKendo.fn_customFormDataAjax("/application/setApplicationFile.do", formData);
        /*if(result.flag){
            alert("수정되었습니다.");
            location.reload();
        }*/
    },

    getFile : function(){
        /** 인적성 파일 */
        const result = customKendo.fn_customAjax("/inside/applicationViewRegrid", {applicationId : $("#applicationId").val()});
        const data = result.data;

        if(data.file != null){
            let html = '<img src="/images/ico/file.gif" onclick="fileDown(\'' + data.file.file_path + data.file.file_uuid + '\', \'' + data.file.file_org_name + '.' + data.file.file_ext + '\')">';
            $("#fileName").html(html);
        }else{
            let html = '<span>미첨부</span>';
            $("#fileName").html(html);
        }
    },
}