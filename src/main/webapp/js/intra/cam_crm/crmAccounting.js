var crmA = {

    global : {
        radioDataSource : "",
        dropDownDataSource : "",
        searchAjaxData : "",
        saveAjaxData : "",
    },
    
    fn_defaultScript : function (){
        customKendo.fn_textBox(["bankName", "accountNum", "accountHolder", "accountChargeNm", "accountChargeEmail"])
        crmA.certDataSet();
    },

    fn_save : function (){
        var formData = new FormData()
        formData.append("crmAccountingSn", $("#crmAccountingSn").val());
        formData.append("menuCd", "crmInfo");
        formData.append("crmSn", $("#crmSn").val());
        formData.append("bankName", $("#bankName").val());
        formData.append("accountNum", $("#accountNum").val());
        formData.append("accountHolder", $("#accountHolder").val());
        formData.append("accountChargeNm", $("#accountChargeNm").val());
        formData.append("accountChargeEmail", $("#accountChargeEmail").val());
        formData.append("regEmpSeq", $("#regEmpSeq").val());
        formData.append("empSeq", $("#regEmpSeq").val());

        if($("#file1")[0].files.length == 1){
            formData.append("file1", $("#file1")[0].files[0]);
        }

        if($("#file2")[0].files.length == 1){
            formData.append("file2", $("#file2")[0].files[0]);
        }

        var result = customKendo.fn_customFormDataAjax("/crm/setCrmAccounting.do", formData);
        if(result.flag){
            alert("저장되었습니다.");
            location.reload();
        }
    },

    fileChange : function(e){
        $(e).next().text($(e)[0].files[0].name);
    },

    certDataSet : function(){
        crmA.global.saveAjaxData = {
            crmSn : $("#crmSn").val()
        }

        var result = customKendo.fn_customAjax("/crm/getCrmAccounting.do", crmA.global.saveAjaxData);
        if(result.flag){
            if(result.data != null){
                $("#crmAccountingSn").val(result.data.CRM_ACCOUNTING_SN);
                $("#bankName").val(result.data.BANK_NAME);
                $("#accountNum").val(result.data.ACCOUNTING_NUM);
                $("#accountHolder").val(result.data.ACCOUNTING_HOLDER);
                $("#accountChargeNm").val(result.data.ACCOUNTING_CHARGE_NM);
                $("#accountChargeEmail").val(result.data.ACCOUNTING_CHARGE_EMAIL);

                $("#file1Sn").val(result.data.FILE1_NO);
                $("#file1Name").text(result.data.FILE1_NAME);

                if(result.data.FILE1_NO != null){
                    $("#file1ViewDiv").show();
                    $("#file1Img").attr("onclick", "crmA.fileViewPop('" + result.data.FILE1_PATH + "')");
                }

                $("#file2Sn").val(result.data.FILE2_NO)
                $("#file2Name").text(result.data.FILE2_NAME)
                if(result.data.FILE2_NO != null){
                    $("#file2ViewDiv").show();
                    $("#file2Img").attr("onclick", "crmA.fileViewPop('" + result.data.FILE2_PATH + "')");
                }
            }
        }
    },

    fileViewPop : function(e){
        var name = "userPersonnelRecordEduAddPop";
        var option = "width=600, height=750, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(e, name, option);
    },

    fileDel : function(e, snId){
        if(confirm("삭제한 파일은 복구할 수 없습니다.\n그래도 삭제하시겠습니까?")){
            crmA.global.saveAjaxData = {
                fileNo : e
            }
            var result = customKendo.fn_customAjax("/common/commonFileDel", crmA.global.saveAjaxData);
            if(result.flag){
                alert(result.rs.message);
                if(result.rs.code == "200"){
                    $("#" + snId).val("");
                    if(snId == "file1Sn"){
                        $("#file1Name").text("");
                        $("#file1ViewDiv").hide();
                        $("#file1Img").removeAttr("onclick");
                    }else{
                        $("#file2Name").text("");
                        $("#file2ViewDiv").hide();
                        $("#file2Img").removeAttr("onclick");
                    }
                }
            }
        }
    }
}