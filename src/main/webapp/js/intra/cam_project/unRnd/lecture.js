var ub = {
    fn_projectTypeSet: function(){
        let projectDataSource =customKendo.fn_customAjax("/project/getProjectList", {
            busnClass: "S"
        }).list
        customKendo.fn_dropDownList("projectType", projectDataSource, "BS_TITLE", "PJT_SN", 2);
        $("#projectType").data("kendoDropDownList").value($("#pjtSn").val());
    },

    fn_fieldTypeSet: function(){
        let fieldDataSource = [
            {text: "경영", value: "104"},
            {text: "품질", value: "106"},
            {text: "CEO", value: "107"},
            {text: "기술", value: "193"},
            {text: "현장교육", value: "195"},
            {text: "창업", value: "289"}
        ];
        customKendo.fn_dropDownList("fieldType", fieldDataSource, "text", "value", 2);
    },

    fn_curriculumTypeSet: function(){
        let curriculumDataSource = [
            {text: "부품설계", value: "105"},
            {text: "경영혁신", value: "115"},
            {text: "구조해석", value: "116"},
            {text: "리더십/코칭", value: "117"},
            {text: "유동해석", value: "119"},
            {text: "자동화제어", value: "120"},
            {text: "제조공정혁신", value: "121"},
            {text: "직급", value: "122"},
            {text: "직무", value: "123"},
            {text: "직무향상/코칭", value: "124"},
            {text: "품질혁신", value: "125"},
            {text: "현장개선", value: "126"},
            {text: "기타", value: "208"},
            {text: "금형설계", value: "211"},
            {text: "공차해석", value: "215"},
            {text: "안전품질", value: "217"},
            {text: "알앤디", value: "267"},
            {text: "기술지도", value: "269"},
            {text: "(예비)창업자육성", value: "290"},
            {text: "경영", value: "104"},
            {text: "품질", value: "106"},
            {text: "CEO", value: "107"},
            {text: "기술", value: "193"},
            {text: "현장교육", value: "195"},
            {text: "창업", value: "289"}
        ];
        customKendo.fn_dropDownList("curriculumType", curriculumDataSource, "text", "value", 2);
    },

    fn_courseTypeSet: function(){
        let courseDataSource = [
            {text: "AutoCAD 고급", value: "134"},
            {text: "AutoCAD 중급", value: "135"},
            {text: "AutoCAD 초급", value: "136"},
            {text: "AutoCAD 초급&amp;중급", value: "137"},
            {text: "CATIA 고급", value: "138"},
            {text: "CATIA 중급", value: "139"},
            {text: "CATIA 중급&amp;예제", value: "140"},
            {text: "CATIA 초급", value: "142"},
            {text: "CATIA 초급&amp;예제", value: "143"},
            {text: "Inventor 초급", value: "144"},
            {text: "UG 중급", value: "145"},
            {text: "UG 초급", value: "146"},
            {text: "UG 초급과정", value: "147"},
            {text: "Solidworks", value: "178"},
            {text: "CATIA 초급&amp;중급", value: "179"},
            {text: "Inventor 중급", value: "189"},
            {text: "Solidworks", value: "192"},
            {text: "HyperWorks", value: "194"}
        ];
        customKendo.fn_dropDownList("courseType", courseDataSource, "text", "value", 2);
    },

    fn_statusSet: function(){
        let statusDataSource = [
            {text: "강의개설 중", value: "0"},
            {text: "수강신청 진행중", value: "1"},
            {text: "교육/실습 중", value: "2"},
            {text: "교육/실습 완료", value: "3"}
        ];
        customKendo.fn_dropDownList("status", statusDataSource, "text", "value", 3);
    },

    fn_statusSet: function(){
        let statusDataSource = [
            {text: "강의개설중", value: "0"},
            {text: "수강신청 진행중", value: "1"},
            {text: "교육/실습 중", value: "2"},
            {text: "교육/실습 완료", value: "3"}
        ];
        customKendo.fn_dropDownList("status", statusDataSource, "text", "value", 3);
    },

    fn_mainTypeSet: function(){
        let mainTypeDataSource = [
            {text: "게시", value: "0"},
            {text: "미게시", value: "1"}
        ];
        customKendo.fn_dropDownList("mainType", mainTypeDataSource, "text", "value", 2);
    },

    fn_paySet: function(){
        let statusDataSource = [
            {text: "무통장입금", value: "0"},
            {text: "신용카드", value: "1"}
        ];
        customKendo.fn_dropDownList("payType", statusDataSource, "text", "value", 3);
    },

    fn_billSet: function(){
        let statusDataSource = [
            {text: "요청안함", value: "N"},
            {text: "영수발행", value: "Y"}
        ];
        customKendo.fn_dropDownList("billType", statusDataSource, "text", "value", 3);
    },

    fn_eduDtSet: function(){
        customKendo.fn_datePicker("eduStartDt", 'month', "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("eduEndDt", 'month', "yyyy-MM-dd", new Date());
        $("#eduStartDt").on("change", function(){
            if($(this).val() > $("#eduEndDt").val()){
                $("#eduEndDt").val($(this).val());
            }
        });
        $("#eduEndDt").on("change", function(){
            if($(this).val() < $("#eduStartDt").val()){
                $("#eduStartDt").val($(this).val());
            }
        });
        $("#eduStartDt, #eduEndDt").attr("readonly", true);
    },

    fn_recruitDtSet: function(){
        customKendo.fn_datePicker("recruitStartDt", 'month', "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("recruitEndDt", 'month', "yyyy-MM-dd", new Date());
        $("#recruitStartDt").on("change", function(){
            if($(this).val() > $("#recruitEndDt").val()){
                $("#recruitEndDt").val($(this).val());
            }
        });
        $("#recruitEndDt").on("change", function(){
            if($(this).val() < $("#recruitStartDt").val()){
                $("#recruitStartDt").val($(this).val());
            }
        });
        $("#recruitStartDt, #recruitEndDt").attr("readonly", true);
    },

    fn_methodTypeSet: function(){
        let methodTypeDataSource = [
            { label: "재직자", value: "1" },
            { label: "미취업자", value: "2" },
            { label: "연수생", value: "3" }
        ];
        customKendo.fn_radioGroup("methodType", methodTypeDataSource, "horizontal");
        $("#methodType").data("kendoRadioGroup").value(1);
    },

    fn_certTypeSet: function(){
        let certTypeDataSource = [
            { label: "해당없음", value: "N" },
            { label: "그린벨트", value: "1" },
            { label: "블랙벨트", value: "2" }
        ];
        customKendo.fn_radioGroup("certType", certTypeDataSource, "horizontal");
        $("#certType").data("kendoRadioGroup").value("N");
    },
}