const lectureTeacherMng = {
    fn_defaultScript: function(){
        this.fn_pageSet();
        this.fn_dataSet();
    },

    fn_pageSet: function(){
        customKendo.fn_textBox(["name", "coName", "birth", "part", "place", "telNum", "hpNum", "faxNum", "email", "bankName", "bankAccount", "bankUser"]);
        let genderDataSource = [
            { label: "남", value: "M" },
            { label: "여", value: "F" }
        ]
        customKendo.fn_radioGroup("gender", genderDataSource, "horizontal");
    },

    fn_dataSet: function(){
        const teacherData = customKendo.fn_customAjax("/projectUnRnd/getTeacherData", {
            teacherSn: $("#teacherSn").val()
        });
        const tcMap = teacherData.data;
        if(tcMap != null){
            $("#name").val(tcMap.NAME);
            $("#birth").val(tcMap.BIRTH);
            if(tcMap.GENDER != null && tcMap.GENDER != ""){
                $("#gender").data("kendoRadioGroup").value(tcMap.GENDER);
            }
            $("#coName").val(tcMap.BELONG);
            $("#part").val(tcMap.PART);
            $("#place").val(tcMap.PLACE);
            $("#telNum").val(tcMap.TEL_NUM);
            $("#hpNum").val(tcMap.HP_NUM);
            $("#faxNum").val(tcMap.FAX_NUM);
            $("#email").val(tcMap.EMAIL);
            $("#bankName").val(tcMap.BANK_NAME);
            $("#bankAccount").val(tcMap.BANK_ACCOUNT);
            $("#bankUser").val(tcMap.BANK_USER);
        }
    },

    fn_save: function(){
        const data = {
            name : $("#name").val(),
            birth : $("#birth").val(),
            gender : $("#gender").data("kendoRadioGroup").value(),
            coName : $("#coName").val(),
            part : $("#part").val(),
            place : $("#place").val(),
            telNum : $("#telNum").val(),
            hpNum : $("#hpNum").val(),
            faxNum : $("#faxNum").val(),
            email : $("#email").val(),
            bankName : $("#bankName").val(),
            bankAccount : $("#bankAccount").val(),
            bankUser : $("#bankUser").val(),
            regEmpSeq : $("#regEmpSeq").val()
        }

        if($("#teacherSn").val() != ""){
            data.teacherSn = $("#teacherSn").val();
        }

        if($("#name").val() == "") {
            alert("이름이 작성되지 않았습니다.");
            return;
        }

        const result = customKendo.fn_customAjax("/projectUnRnd/setLectureTeacherData", data);

        if(result.code != 200){
            alert("저장 중 오류가 발생하였습니다.");
        }else{
            alert("저장이 완료 되었습니다.");
            opener.gridReload();
            window.close();
        }
    }
}