var crmSi = {

    fn_defaultScript : function(){
        var data = {
            cmGroupCode : "CRM_ATTRACT_CD",
        }
        var crmAttCd = customKendo.fn_customAjax("/common/commonCodeList", data);
        crmAttCd = crmAttCd.rs;

        customKendo.fn_dropDownList("crmAtt", crmAttCd, "CM_CODE_NM", "CM_CODE", 2);


        var dataSource = [
            {text : "기업", value : "1" },
            {text : "기관", value : "2" },
            {text : "기타", value : "3" }
        ];
        $("#crmClass").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: dataSource,
            valuePrimitive: true,
            change : function (e){
                if(this.value() == "기타"){
                    $("#boxA").css("display", "none");
                    $("#boxB").css("display", "");
                } else {
                    $("#boxA").css("display", "");
                    $("#boxB").css("display", "none");
                }

                if(this.value() == "기관"){
                    var dataSource2 = [
                        {text : "중앙부처", value : "3" },
                        {text : "지자체", value : "4" },
                        {text : "기술지원 및 진흥기관", value : "5" },
                        {text : "교육기관", value : "6" },
                        {text : "금융지원기관", value : "7" },
                        {text : "경제진흥기관", value : "8" },
                        {text : "협회", value : "9" },
                        {text : "대학", value : "10" },
                        {text : "연구소(원)", value : "11" },
                        {text : "기타", value : "12" }
                    ]

                    $("#crmSubClass").data("kendoDropDownList").setDataSource(dataSource2);
                    $("#crmSubClass").data("kendoDropDownList").select(0);
                } else if(this.value() == "기업"){

                    var dataSource2= [
                        {text : "고객사", value : "1" },
                        {text : "협력사", value : "2" }
                    ]
                    $("#crmSubClass").data("kendoDropDownList").setDataSource(dataSource2);
                    $("#crmSubClass").data("kendoDropDownList").select(0);
                }
            }
        });

        $("#crmSubClass").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text : "고객사", value : "1" },
                {text : "협력사", value : "2" }
            ],
            valuePrimitive: true
        });





        customKendo.fn_textBox([ "homepage", "crmProd", "crmBn", "crmBnNum",
                                "bnDepo", "acntNm", "acntEmail", "crmSubClassText"]);

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
        if($("#crmAtt").val() == null || $("#crmAtt").val() == ""){
            alert("고객 유치경로를 선택해주세요.");
            return false;
        }

        var miCl = "N";
        var buyCl = "N";
        if($("#miCl").is(":checked")){
            miCl = "Y";
        }

        if($("#buyCl").is(":checked")){
            buyCl = "Y";
        }
        var formData = new FormData();

        formData.append("crmAtt", $("#crmAtt").val());
        formData.append("crmAttNm", $("#crmAtt").data("kendoDropDownList").text());
        formData.append("crmClass", $("#crmClass").val());
        formData.append("crmClassNm", $("#crmClass").data("kendoDropDownList").text());
        formData.append("crmSubClass", $("#crmSubClass").val());
        formData.append("crmSubClassText", $("#crmSubClassText").val());
        formData.append("miCl", miCl);
        formData.append("buyCl", buyCl);

        formData.append("crmSn", $("#crmSn").val());
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
                location.reload();
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