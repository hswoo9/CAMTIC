var evalExUp = {

    global : {
        saveAjaxData : "",
    },

    fn_defaultScript : function (){

    },

    fileChange : function(e){
        var file = $(e)[0].files[0];
        var fileExt = file.name.split(".")[file.name.split(".").length - 1];

        if($.inArray(fileExt, ['xls', 'xlsx']) == -1){
            alert("xls, xlsx 확장자만 업로드할 수 있습니다.");
            $(e).val("");
            return;
        }

        $("#fileName").val($(e)[0].files[0].name);
    },

    setExcelFileUpload : function(){
        var formData = new FormData();
        formData.append("evalFile", $("#evalFile")[0].files[0]);
        formData.append("empSeq", $("#empSeq").val());
        formData.append("tempDivision", "E");

        if(confirm("엑셀을 업로드 하시겠습니까?")){
            var result = customKendo.fn_customFormDataAjax("/inside/evalExcelUploadData.do", formData);
            if(result.flag){
                var empArr = new Array();
                var list = result.list;
                for(var i = 0; i < list.length; i++){
                    var userId0 = evalExUp.securityEncrypt(list[i].loginId);
                    var userId1 = "";
                    var userId2 = "";

                    if(userId0.length > 50){
                        userId1 = userId0.substr(50);
                        userId0 = userId0.substr(0,50);

                        if(userId1.length > 50){
                            userId2 = userId1.substr(50);
                            userId1 = userId1.substr(0,50);
                        }
                    }

                    var data = {
                        authorityGroupId : "14",
                        LOGIN_ID: userId0,
                        userIdSub1 : userId1,
                        userIdSub2 : userId2,
                        LOGIN_PASSWD : securityEncUtil.securityEncrypt(list[i].loginPassWd, "0"),
                        EMP_NAME_KR : list[i].empNameKr,
                        empName : list[i].empNameKr,
                        RES_REGIS_NUM: list[i].resRegisNum,
                        MOBILE_TEL_NUM: list[i].mobileTelNum,
                        EMAIL_ADDR: list[i].emailAddr,
                        DEPT_NAME: list[i].deptName,
                        deptName: list[i].deptName,
                        genderCode : list[i].genderCode,
                        POSITION_NAME : list[i].positionName,
                        dutyName : "",
                        positionName : "",
                        SIGNIFICANT : list[i].significant,
                        TEMP_DIVISION : "E",
                        ACTIVE : "Y",
                        active : "Y",
                        regEmpSeq: $("#empSeq").val(),
                        regEmpName: $("#empName").val(),
                    }

                    empArr.push(data);
                }

                evalExUp.global.saveAjaxData = {
                    empArr : JSON.stringify(empArr)
                }

                var result2 = customKendo.fn_customAjax("/inside/setEvalExcelUploadData.do", evalExUp.global.saveAjaxData);
                if(result2.flag){
                    alert("처리되었습니다.");
                    opener.parent.commissionerManage.gridReload();
                    window.close();
                }
            }
        }
    },

    securityEncrypt : function(inputStr){
        return securityEncUtil.securityEncrypt(inputStr, "0");
    }
}