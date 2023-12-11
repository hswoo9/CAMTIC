const lecturePersonMng = {
    fn_defaultScript: function(){
        this.fn_pageSet();
    },

    fn_pageSet: function(){
        customKendo.fn_textBox(["id", "pwd", "name", "coName", "birth", "part", "place", "telNum", "hpNum", "faxNum"]);
        let genderDataSource = [
            { label: "남", value: "M" },
            { label: "여", value: "F" }
        ]
        customKendo.fn_radioGroup("gender", genderDataSource, "horizontal");
    },

    fn_save: function(){
        const data = {
            name : $("#id").val(),
            password : $("#pwd").val(),
            name : $("#name").val(),
            gender : $("#gender").data("kendoRadioGroup").value(),
            name : $("#name").val(),
            name : $("#name").val(),
            name : $("#name").val(),
            name : $("#name").val(),
            name : $("#name").val(),
            name : $("#name").val(),
            name : $("#name").val(),
        }

        if($("#personSn").val() != ""){
            data.personSn = $("#personSn").val();
        }

        /*if(arr.length == 0) {
            alert("수강자가 선택되지 않았습니다.");
            return;
        }

        const result = customKendo.fn_customAjax("/projectUnRnd/setLecturePersonData", data);

        if(result.code != 200){
            alert("저장 중 오류가 발생하였습니다.");
        }else{
            opener.gridReload();
            window.close();
        }*/
    }
}