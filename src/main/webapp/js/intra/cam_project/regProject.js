var regPrj = {


    global : {

    },


    fn_defaultScript : function () {
        var bcDsData = {
            cmGroupCode : "BUSN_CLASS",
        }
        var bcDs = customKendo.fn_customAjax("/common/commonCodeList", bcDsData);
        customKendo.fn_dropDownList("busnClass", bcDs.rs, "CM_CODE_NM", "CM_CODE");

        var busnDDL = $("#busnClass").data("kendoDropDownList");
        busnDDL.bind("change", regPrj.fn_busnDDLChange);

        customKendo.fn_textBox(["C", "D", "E", "F", "G", "H", "I", "J",
                                "K", "L", "M", "N", "O", "P", "Q", "R",
                                "S", "T", "V", "W", "X", "Y", "Z",
                                "deptName", "empName"]);

        customKendo.fn_datePicker("B", "depth", "yyyy-MM-dd", new Date());


        $("#U").kendoTextArea({
            rows:5
        });
    },

    fn_busnDDLChange: function(e){
        var value = this.value();

        if(value == "D"){
            $("#vEngi").css("display", "");
            $("#commFileHtml").css("display", "");
        } else {
            $("#vEngi").css("display", "none");
            $("#commFileHtml").css("display", "none");
        }
    },

    fn_save:function (){
        var formData = new FormData();

        //증빙파일 첨부파일
        if(fCommon.global.attFiles != null){
            for(var i = 0; i < fCommon.global.attFiles.length; i++){
                formData.append("projectFile", fCommon.global.attFiles[i]);
            }
        }


        $.ajax({
            url : "/project/setProject",
            type : 'POST',
            data : formData,
            dataType : "json",
            contentType: false,
            processData: false,
            enctype : 'multipart/form-data',
            async : false,
            success : function(){
                if(hrBizReqId == ""){
                    alert("출장 신청이 완료되었습니다.");
                }else{
                    alert("출장 수정이 완료되었습니다.");
                }
                opener.parent.open_in_frame('/bustrip/bustripList.do');
                window.close();
            }
        });

    }


}