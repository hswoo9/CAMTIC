var meu = {

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
        var url = "";

        if($("#popType").val() == "mf"){
            url = "/crm/mfExcelUpload.do";
        }else if($("#popType").val() == "projectUnRnd"){
            url = "/projectUnRnd/lecturePersonExcelUpload.do";
        }else{
            url = "/crm/crmExcelUpload.do";
        }

        formData.append("mfFile", $("#file")[0].files[0]);
        formData.append("empSeq", $("#empSeq").val());


        if(confirm("엑셀을 업로드 하시겠습니까?")){
            var result = customKendo.fn_customFormDataAjax(url, formData);
            if(result.flag){
                if($("#popType").val() == "projectUnRnd"){
                    alert(result.data.message);
                    if(result.data.code == "200"){
                        opener.parent.gridReload();
                        window.close();
                    }
                }else{
                    alert("처리되었습니다.");
                    opener.parent.gridReload();
                    window.close();
                }
            }
        }
    }
}