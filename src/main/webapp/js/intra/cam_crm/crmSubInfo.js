var crmSi = {

    fn_defaultScript : function(){

        customKendo.fn_textBox(["telNum", "phNum", "fax", "crmEstNo", "post", "addr"
                                ,"crmOcc", "crmEvent", "homepage", "crmProd"
                                ,"crmBn", "crmBnNum", "bnDepo", "acntNm", "acntEmail"
                                ]);

        $("#crmStat").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text : "정상영업", value : "1" },
                {text : "휴업", value : "2" },
                {text : "폐업", value : "3" }
            ],
            valuePrimitive: true
        });

        $("#etc").kendoTextArea({
            rows : 5
        })
    },

    fn_save : function(){
        var formData = new FormData();
        formData.append("crmSn", $("#crmSn").val());
        formData.append("telNum", $("#telNum").val());
        formData.append("phNum", $("#phNum").val());
        formData.append("fax", $("#fax").val());
        formData.append("crmEstNo", $("#crmEstNo").val());
        formData.append("post", $("#post").val());
        formData.append("addr", $("#addr").val());
        formData.append("crmOcc", $("#crmOcc").val());
        formData.append("crmEvent", $("#crmEvent").val());
        formData.append("homepage", $("#homepage").val());
        formData.append("crmProd", $("#crmProd").val());
        formData.append("crmBn", $("#crmBn").val());
        formData.append("crmBnNum", $("#crmBnNum").val());
        formData.append("bnDepo", $("#bnDepo").val());
        formData.append("acntNm", $("#acntNm").val());
        formData.append("acntEmail", $("#acntEmail").val());
        formData.append("crmLics", $("#crmLics").val());
        formData.append("bnCp", $("#bnCp").val());
        formData.append("etc", $("#etc").val());
        formData.append("crmStat", $("#crmStat").val());
        formData.append("menuCd", "crmInfo");
        formData.append("regEmpSeq", $("#regEmpSeq").val());

        if($("#crmFile")[0].files.length == 1){
            formData.append("crmFile", $("#crmFile")[0].files[0]);
        }

        if($("#crmLics")[0].files.length == 1){
            formData.append("crmLics", $("#crmLics")[0].files[0]);
        }

        if($("#bnCp")[0].files.length == 1){
            formData.append("bnCp", $("#bnCp")[0].files[0]);
        }

        $.ajax({
            url : "/crm/setCrmInfo",
            type : 'POST',
            data : formData,
            dataType : "json",
            contentType: false,
            processData: false,
            enctype : 'multipart/form-data',
            async : false,
            success : function(){
                alert("저장되었습니다.");
            }
        });

    },

    fn_fileChange: function(e){
        var fileNm = $(e).val();

        console.log(fileNm);
        $("#" + $(e).attr("id") + "Text").text(fileNm.split("\\")[fileNm.split("\\").length - 1]);
        console.log(e);
    }

}