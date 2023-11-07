const lectureReq = {
    fn_defaultScript: function(){
        this.fn_pageSet();
        if($("#pk").val() != ""){
            this.fn_dataSet();
        }else{
            //this.fn_testData();
        }
    },

    fn_pageSet: function(){
        customKendo.fn_textBox(["lectureName", "lectureNameEx", "title", "recruitNum", "eduTime", "eduTimeEx", "area", "textbookFee", "textbookFeeEx"]);
        customKendo.fn_textArea(["content1", "content2", "goal", "intro", "targetUser", "scheduleHtml", "prospectus", "materials"]);

        /** 사업구분 drop box */
        ub.fn_projectTypeSet();

        /** 교육분야 drop box */
        ub.fn_fieldTypeSet();

        /** 과목명 drop box */
        ub.fn_curriculumTypeSet();

        /** 과정명 drop box*/
        ub.fn_courseTypeSet();

        /** 진행상태 drop box */
        ub.fn_statusSet();

        /** 메인게시여부 drop box */
        ub.fn_mainTypeSet();

        /** 교육기간 date picker */
        ub.fn_eduDtSet();

        /** 모집기간 date picker */
        ub.fn_recruitDtSet();

        /** 운영방법 radio button */
        ub.fn_methodTypeSet();

        /** 인증서 radio button */
        ub.fn_certTypeSet();
    },

    fn_dataSet: function(){
        const data = {
            pk: $("#pk").val()
        }
        const result = customKendo.fn_customAjax("/projectUnRnd/getLectureInfo", data);
        const lecMap = result.data;

        $("#projectType").data("kendoDropDownList").value(lecMap.LEC_BUSN_CLASS);
        $("#fieldType").data("kendoDropDownList").value(lecMap.LEC_FIELD);
        $("#curriculumType").data("kendoDropDownList").value(lecMap.LEC_SBJ_CD);
        $("#courseType").data("kendoDropDownList").value(lecMap.LEC_PS_CD);

        $("#lectureName").val(lecMap.LEC_TITLE_BS);
        $("#lectureNameEx").val(lecMap.LEC_TITLE_PR);
        $("#title").val(lecMap.LEC_TOPIC);
        $("#content1").val(lecMap.LEC_PS_GUIDE_A);
        $("#content2").val(lecMap.LEC_PS_GUIDE_B);

        $("#eduStartDt").val(lecMap.LEC_STR_DE);
        $("#eduEndDt").val(lecMap.LEC_END_DE);
        $("#recruitStartDt").val(lecMap.RECR_STR_DE);
        $("#recruitEndDt").val(lecMap.RECR_END_DE);

        $("#recruitNum").val(lecMap.RECR_MEM_CNT);
        $("#eduTime").val(lecMap.LEC_TIME);
        $("#eduTimeEx").val(lecMap.LEC_TIME_RNG);

        $("#area").val(lecMap.LEC_ADDR);
        $("#status").data("kendoDropDownList").value(lecMap.LEC_STATUS);

        $("#goal").val(lecMap.LEC_OBJ);
        $("#intro").val(lecMap.LEC_SUMR);
        $("#targetUser").val(lecMap.LEC_TARG);
        $("#scheduleHtml").val(lecMap.LEC_SCH);
        $("#prospectus").val(lecMap.LEC_INQ);
        $("#materials").val(lecMap.LEC_MAT);

        $("#textbookFee").val(lecMap.LEC_COST);
        $("#textbookFeeEx").val(lecMap.LEC_COST_EX);
        $("#methodType").data("kendoRadioGroup").value(lecMap.LEC_OPER);

        $("#certType").data("kendoRadioGroup").value(lecMap.LEC_CERT);

        $("#mainType").data("kendoDropDownList").value(lecMap.LEC_OPEN_BD);

        this.fn_btnSet(lecMap);
    },

    fn_btnSet: function(lecMap){
        if(lecMap != null){
            $("#saveBtn").hide();
            $("#modBtn").show();
            $("#teacherBtn").show();
            $("#personBtn").show();
            $("#eduBtn").show();
            $("#payBtn").show();
        }
    },

    fn_saveBtn: function(){
        const data = {
            pjtSn: $("#pjtSn").val(),

            projectType: $("#projectType").data("kendoDropDownList").value(),
            projectTypeName: $("#projectType").data("kendoDropDownList").text(),
            fieldType: $("#fieldType").data("kendoDropDownList").value(),
            fieldTypeName: $("#fieldType").data("kendoDropDownList").text(),

            curriculumType: $("#curriculumType").data("kendoDropDownList").value(),
            curriculumTypeName: $("#curriculumType").data("kendoDropDownList").text(),
            courseType: $("#courseType").data("kendoDropDownList").value(),
            courseTypeName: $("#courseType").data("kendoDropDownList").text(),

            lectureName: $("#lectureName").val(),
            lectureNameEx: $("#lectureNameEx").val(),
            title: $("#title").val(),
            content1: $("#content1").val(),
            content2: $("#content2").val(),

            eduStartDt: $("#eduStartDt").val(),
            eduEndDt: $("#eduEndDt").val(),
            recruitStartDt: $("#recruitStartDt").val(),
            recruitEndDt: $("#recruitEndDt").val(),

            recruitNum: $("#recruitNum").val(),
            eduTime: $("#eduTime").val(),
            eduTimeEx: $("#eduTimeEx").val(),

            area: $("#area").val(),
            status: $("#status").data("kendoDropDownList").value(),
            statusName: $("#status").data("kendoDropDownList").text(),

            goal: $("#goal").val(),
            intro: $("#intro").val(),
            targetUser: $("#targetUser").val(),
            scheduleHtml: $("#scheduleHtml").val(),
            prospectus: $("#prospectus").val(),
            materials: $("#materials").val(),

            textbookFee: $("#textbookFee").val(),
            textbookFeeEx: $("#textbookFeeEx").val(),
            methodType: $("#methodType").data("kendoRadioGroup").value(),

            certType: $("#certType").data("kendoRadioGroup").value(),

            mainType: $("#mainType").data("kendoDropDownList").value(),
            mainTypeName: $("#mainType").data("kendoDropDownList").text(),

            regEmpSeq: $("#regEmpSeq").val()
        }

        /** 유효성 검사 */
        this.fn_validationCheck(data);

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
    },

    fn_validationCheck: function(data){
        if(data.projectType == ""){ alert("사업구분이 선택되지 않았습니다."); return; }
        if(data.fieldType == ""){ alert("교육분야가 선택되지 않았습니다."); return; }
        if(data.curriculumType == ""){ alert("과목명이 선택되지 않았습니다."); return; }
        if(data.courseType == ""){ alert("과정명이 선택되지 않았습니다."); return; }
        if(data.lectureName == ""){ alert("강좌명(사업명)이 작성되지 않았습니다."); return; }
        if(data.lectureNameEx == ""){ alert("강좌명(홍보용)이 작성되지 않았습니다."); return; }
        if(data.title == ""){ alert("주제(CEO)가 작성되지 않았습니다."); return; }
        if(data.recruitNum == ""){ alert("모집인원이 작성되지 않았습니다."); return; }
        if(data.eduTime == "" || data.eduTimeEx == ""){ alert("교육시간이 작성되지 않았습니다."); return; }
        if(data.area == ""){ alert("교육장소가 작성되지 않았습니다."); return; }
        if(data.textbookFee == "" || data.textbookFeeEx == ""){ alert("교육비가 작성되지 않았습니다."); return; }
        if(data.courseType == ""){ alert("메인게시여부가 선택되지 않았습니다."); return; }
    },

    fn_testData: function(){
        $("#projectType").data("kendoDropDownList").select(1);
        $("#fieldType").data("kendoDropDownList").select(1);
        $("#curriculumType").data("kendoDropDownList").select(1);
        $("#courseType").data("kendoDropDownList").select(1);

        $("#lectureName").val("test");
        $("#lectureNameEx").val("test");
        $("#title").val("test");
        $("#content1").val("test");
        $("#content2").val("test");

        $("#eduStartDt").val("2023-12-01");
        $("#eduEndDt").val("2023-12-31");
        $("#recruitStartDt").val("2023-11-01");
        $("#recruitEndDt").val("2023-11-10");

        $("#recruitNum").val("10");
        $("#eduTime").val("20");
        $("#eduTimeEx").val("매주월요일 18:00~22:00");

        $("#area").val("test");
        $("#status").data("kendoDropDownList").select(1);

        $("#goal").val("test");
        $("#intro").val("test");
        $("#targetUser").val("test");
        $("#scheduleHtml").val("test");
        $("#prospectus").val("test");
        $("#materials").val("test");

        $("#textbookFee").val("10000");
        $("#textbookFeeEx").val("교재비 제목 : 123");
        $("#methodType").data("kendoRadioGroup").value(1);

        $("#mainType").data("kendoDropDownList").select(1);
    }
}