const lecturePersonMng = {
    global: {
        dupleCk: false
    },

    fn_defaultScript: function(){
        this.fn_pageSet();
        this.fn_dataSet();
    },

    fn_pageSet: function(){
        customKendo.fn_textBox(["id", "pwd", "name", "coName", "birth", "part", "place", "telNum", "hpNum", "faxNum"]);
        let genderDataSource = [
            { label: "남", value: "M" },
            { label: "여", value: "F" }
        ]
        customKendo.fn_radioGroup("gender", genderDataSource, "horizontal");

        $("#id").data("kendoTextBox").bind("change", function(){
            lecturePersonMng.global.dupleCk = false;
        });

        if($("#personSn").val() != ""){
            $("#id").data("kendoTextBox").enable(false);
            $("#ckBtn").hide();
            lecturePersonMng.global.dupleCk = true;
        }
    },

    fn_dataSet: function(){
        const personData = customKendo.fn_customAjax("/projectUnRnd/getPersonData", {
            personSn: $("#personSn").val()
        });
        const psMap = personData.data;
        if(psMap != null){
            $("#id").val(psMap.ID);
            $("#pwd").val(psMap.PASSWORD);
            $("#name").val(psMap.NAME);
            $("#birth").val(psMap.BIRTH);
            if(psMap.GENDER != null && psMap.GENDER != ""){
                $("#gender").data("kendoRadioGroup").value(psMap.GENDER);
            }
            $("#coName").val(psMap.CO_NAME);
            $("#part").val(psMap.PART);
            $("#place").val(psMap.PLACE);
            $("#telNum").val(psMap.TEL_NUM);
            $("#hpNum").val(psMap.HP_NUM);
            $("#faxNum").val(psMap.FAX_NUM);
        }
    },

    fn_save: function(){
        if(!lecturePersonMng.global.dupleCk){
            alert("아이디 중복체크가 필요합니다.");
            return;
        }
        const data = {
            id : $("#id").val(),
            password : $("#pwd").val(),
            name : $("#name").val(),
            birth : $("#birth").val(),
            gender : $("#gender").data("kendoRadioGroup").value(),
            coName : $("#coName").val(),
            part : $("#part").val(),
            place : $("#place").val(),
            telNum : $("#telNum").val(),
            hpNum : $("#hpNum").val(),
            faxNum : $("#faxNum").val(),
            regEmpSeq : $("#regEmpSeq").val()
        }

        if($("#personSn").val() != ""){
            data.personSn = $("#personSn").val();
        }

        if($("#id").val() == "") {
            alert("아이디가 작성되지 않았습니다.");
            return;
        }

        if($("#password").val() == "") {
            alert("비밀번호가 작성되지 않았습니다.");
            return;
        }

        if($("#name").val() == "") {
            alert("이름이 작성되지 않았습니다.");
            return;
        }

        const result = customKendo.fn_customAjax("/projectUnRnd/setLecturePersonData", data);

        if(result.code != 200){
            alert("저장 중 오류가 발생하였습니다.");
        }else{
            alert("저장이 완료 되었습니다.");
            opener.gridReload();
            window.close();
        }
    },

    dupleCk: function(){
        const data = {
            id : $("#id").val()
        }

        if($("#id").val() == ""){
            alert("아이디를 입력해주세요."); return;
        }
        const result = customKendo.fn_customAjax("/projectUnRnd/getLecturePersonDupleCk", data);
        if(result.list.length > 0){
            alert("중복된 아이디가 있습니다.");
        }else{
            alert("사용가능한 아이디입니다.");
            lecturePersonMng.global.dupleCk = true;
        }
    }
}