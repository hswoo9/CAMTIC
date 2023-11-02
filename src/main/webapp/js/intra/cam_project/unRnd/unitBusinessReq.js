const ubr = {
    fn_defaultScript: function(){
        this.fn_pageSet();
        this.fn_btnSet();
        this.fn_dataSet();
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

    fn_btnSet: function(){

    },

    fn_dataSet: function(){

    },

    fn_saveBtn: function(){
        const data = {
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
            materials: $("#materials").val()
        }
    }
}