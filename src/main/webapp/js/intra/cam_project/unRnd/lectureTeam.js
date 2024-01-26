const lectureTeam = {
    fn_defaultScript: function(){
        this.fn_pageSet();
        if($("#pk").val() != ""){
            this.fn_dataSet();
        }else{
            //this.fn_testData();
        }
    },

    fn_pageSet: function(){
        customKendo.fn_textBox(["lectureName"]);
        customKendo.fn_textArea(["goal"]);

        /** 사업구분 drop box */
        ub.fn_projectTypeSet();

        /** 교육기간 date picker */
        ub.fn_eduDtSet();
    },

    fn_dataSet: function(){
        const data = {
            pk: $("#pk").val()
        }
        const result = customKendo.fn_customAjax("/projectUnRnd/getLectureInfo", data);
        const lecMap = result.data;

        $("#projectType").data("kendoDropDownList").value(lecMap.LEC_BUSN_CLASS);

        $("#lectureName").val(lecMap.LEC_TITLE_BS);

        $("#eduStartDt").val(lecMap.LEC_STR_DE);
        $("#eduEndDt").val(lecMap.LEC_END_DE);

        $("#goal").val(lecMap.LEC_OBJ);

        this.fn_btnSet(lecMap);
    },

    fn_btnSet: function(lecMap){
        if(lecMap != null){
            $("#saveBtn").hide();
            $("#modBtn").show();
        }
    },

    fn_saveBtn: function(){
        const data = {
            pjtSn: $("#pjtSn").val(),

            projectType: $("#projectType").data("kendoDropDownList").value(),

            lectureName: $("#lectureName").val(),

            eduStartDt: $("#eduStartDt").val(),
            eduEndDt: $("#eduEndDt").val(),

            goal: $("#goal").val(),

            regEmpSeq: $("#regEmpSeq").val()
        }

        /** 유효성 검사 */
        if(data.projectType == ""){ alert("사업구분이 선택되지 않았습니다."); return; }
        if(data.lectureName == ""){ alert("사업명이 작성되지 않았습니다."); return; }

        let url = "/projectUnRnd/insLectureInfo";
        if($("#pk").val() != ""){
            data.pk = $("#pk").val();
            url = "/projectUnRnd/updLectureInfo";
        }

        const formData = new FormData();
        for (let key in data) {
            formData.append(key, data[key]);
        }

        const result = customKendo.fn_customFormDataAjax(url, formData);

        if(result.code != 200){
            alert("저장 중 오류가 발생하였습니다.");
            window.close();
        }else{
            alert("단위사업이 등록되었습니다.");
            opener.unRndLectList.mainGrid();
            window.close();
        }
    }
}