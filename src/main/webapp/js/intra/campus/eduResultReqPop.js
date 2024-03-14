var now = new Date();

var eduResultReqPop = {
    global : {
        eduInfoId : "",
        eduFormType : "",
        eduResInfo: [],
    },

    init : function(){
        eduResultReqPop.pageSet();
    },

    pageSet: function(){
        eduResultReqPop.global.eduInfoId = $("#eduInfoId").val();
        eduResultReqPop.global.eduFormType = $("#eduFormType").val();

        $("#termDay, #termTime, #eduTeacherName").kendoTextBox();
        $("#eduContent, #eduPoint, #FBList").kendoTextArea();
        $("#eduEval").kendoRadioGroup({
            items: [
                { label : "매우도움", value : "1" },
                { label : "도움", value : "2" },
                { label : "참고정도", value : "3" },
                { label : "기대이하", value : "3" }
            ],
            layout : "horizontal",
            labelPosition : "after",
            value : "1"
        });
        $("#attachDocName").kendoTextBox();

        eduResultReqPop.dataSet();
        eduResultReqPop.fn_btnSet();
    },

    dataSet : function() {
        const data = {
            eduInfoId : $("#eduInfoId").val()
        }
        const rs = customKendo.fn_customAjax("/campus/getEduResultOne", data);
        const eduResInfo = rs.data;
        const resFileInfo = rs.fileInfo;
        eduResultReqPop.global.eduResInfo = eduResInfo;

        $("#dutyClass").text(eduResInfo.DUTY_CLASS == 1 ? "주 업무" : "연계 업무");
        $("#categoryName").text(eduResInfo.EDU_CATEGORY_NAME + " > LEVEL " + eduResInfo.LEVEL_ID + " " + eduResInfo.EDU_CATEGORY_DETAIL_NAME);
        $("#eduPlan").text(eduResInfo.EDU_PLAN);
        $("#eduFormName").text(eduResInfo.EDU_FORM_NAME);
        $("#eduName").text(eduResInfo.EDU_NAME);
        $("#bookPageVal").text(eduResInfo.BOOK_PAGE_VAL);
        $("#bookPulishName").text(eduResInfo.BOOK_PULISH_NAME);
        $("#treaOrigin").text(eduResInfo.TREA_ORIGIN);
        $("#treaUnit").text(eduResInfo.TREA_UNIT);
        $("#treaType").text(eduResInfo.TREA_TYPE);
        $("#treaUser").text(eduResInfo.TREA_USER);
        $(".startDt").text(eduResInfo.START_DT);
        $(".endDt").text(eduResInfo.END_DT);
        $("#termDay").val(eduResInfo.TERM_DAY);
        $(".termDay").text(eduResInfo.TERM_DAY);
        $("#termTime").val(eduResInfo.TERM_TIME);
        $(".termTime").text(eduResInfo.TERM_TIME);
        $("#compType").text(eduResInfo.COMP_TYPE);
        $("#eduTeacherName").val(eduResInfo.EDU_TEACHER_NAME);
        $("#objectForumType").text(eduResInfo.OBJECT_FORUM_TYPE);
        if(eduResInfo.OBJECT_FORUM_TYPE == "주제발표"){
            $("#forumValWrap").show();
        }
        $("#objectForumVal").text(eduResInfo.OBJECT_FORUM_VAL);
        $(".careName").text(eduResInfo.CARE_NAME);
        $("#careLocation").text(eduResInfo.CARE_LOCATION);
        $("#bookUnit").text(eduResInfo.BOOK_UNIT);
        $("#eduObject").text(eduResInfo.EDU_OBJECT);
        $("#eduContent").val(eduResInfo.EDU_CONTENT);
        $("#eduPoint").val(eduResInfo.EDU_POINT);
        $("#FBList").val(eduResInfo.FBLIST);

        if(resFileInfo) {
            if($("#reqFileText").text() == ""){
                $("#resFileText").text(resFileInfo.file_org_name + "." + resFileInfo.file_ext);
            } else {
                $("#resFileText").text(", " + resFileInfo.file_org_name + "." + resFileInfo.file_ext);
            }
        }
    },

    saveEduResult : function() {
        if(!confirm("교육수강 신청서를 저장하시겠습니까?")){
            return;
        }
        let mode = $("#mode").val();
        let empSeq = $("#empSeq").val();
        let termDay = "";
        let termTime = "";
        let eduTeacherName = $("#eduTeacherName").val();
        let eduContent = $("#eduContent").val();
        let eduEval = "";
        let eduPoint = $("#eduPoint").val();
        let FBList = $("#FBList").val();
        let attachDocName = $("#attachDocName").val();
        let eduInfoId = eduResultReqPop.global.eduInfoId;
        let eduFormType = eduResultReqPop.global.eduFormType;

        if(eduFormType == 1) {
            termDay = $("#termDay").val();
            termTime = $("#termTime").val();
            if(termDay == "" || termTime == "") {
                alert("학습기간이 작성되지 않았습니다.");
                return;
            }
            eduEval = $("#eduEval").data("kendoRadioGroup").value();
        }else if(eduFormType == 2) {
            eduEval = $("#eduEval").data("kendoRadioGroup").value();
        }

        if(eduTeacherName == "") {
            alert("강사명이 작성되지 않았습니다.");
            return;
        }
        if(eduContent == "") {
            alert("학습내용이 작성되지 않았습니다.");
            return;
        }
        if(eduPoint == "") {
            alert("직무연계 포인트가 작성되지 않았습니다.");
            return;
        }
        /*if(FBList == "") {
            alert("FEEDBACK LIST가 작성되지 않았습니다.");
            return;
        }*/

        let data = {
            empSeq : empSeq,
            termDay : termDay,
            termTime : termTime,
            eduTeacherName : eduTeacherName,
            eduContent : eduContent,
            eduEval : eduEval,
            eduPoint : eduPoint,
            FBList : FBList,
            attachDocName : attachDocName,
            eduInfoId : eduInfoId,
            eduFormType : eduFormType
        }

        var fd = new FormData();
        for (var key in data) {
            fd.append(key, data[key]);
        }

        if($("#eduFile")[0].files.length == 1){
            fd.append("eduFile", $("#eduFile")[0].files[0]);
        }


        if(mode == "upd"){
            eduResultReqPop.setEduResultModify(fd);
        }else{
            eduResultReqPop.setEduResultInsert(fd);
        }
    },

    setEduResultInsert: function(data) {
        $.ajax({
            url : "/campus/setEduResultInsert",
            data: data,
            type: "post",
            dataType: "json",
            contentType: false,
            processData: false,
            enctype: 'multipart/form-data',
            async: false,
            success : function(result){
                alert("교육 결과보고서 저장이 완료되었습니다.");
                opener.parent.$("#mainGrid").data("kendoGrid").dataSource.read();
                window.location.href = "/Campus/pop/eduResultReqPop.do?eduInfoId="+eduResultReqPop.global.eduInfoId+"&mode=upd";
            },
            error : function() {
                alert("데이터 저장 중 에러가 발생했습니다.");
            }
        });
    },

    setEduResultModify: function(data) {
        $.ajax({
            url : "/campus/setEduResultModify",
            data: data,
            type: "post",
            dataType: "json",
            contentType: false,
            processData: false,
            enctype: 'multipart/form-data',
            async: false,
            success : function(result){
                alert("교육 결과보고서 수정이 완료되었습니다.");
                opener.parent.$("#mainGrid").data("kendoGrid").dataSource.read();
                window.location.href = "/Campus/pop/eduResultReqPop.do?eduInfoId="+eduResultReqPop.global.eduInfoId+"&mode=upd";
            },
            error : function() {
                alert("데이터 수정 중 에러가 발생했습니다.");
            }
        });

    },

    fileChange: function(e){
        if($("#reqFileText").text() == ""){
            $("#resFileText").text($(e)[0].files[0].name);
        } else {
            $("#resFileText").text(", " + $(e)[0].files[0].name);
        }
    },

    fn_btnSet: function(){
        console.log(eduResultReqPop.global.eduResInfo);
        let resDocInfo = {
            STATUS: eduResultReqPop.global.eduResInfo.RES_STATUS,
            DOC_ID: eduResultReqPop.global.eduResInfo.RES_DOC_ID,
            APPRO_KEY: eduResultReqPop.global.eduResInfo.RES_APPRO_KEY,
            MENU_DOC_ID: eduResultReqPop.global.eduResInfo.RES_MENU_DOC_ID,
        }
        let html = makeApprBtnHtml(resDocInfo, 'eduResultReqPop.campusResDrafting()');
        $("#campusBtnBox").html(html);

        if(eduResultReqPop.global.eduResInfo.RES_STATUS == "10" || eduResultReqPop.global.eduResInfo.RES_STATUS == "20" || eduResultReqPop.global.eduResInfo.RES_STATUS == "50" || eduResultReqPop.global.eduResInfo.RES_STATUS == "100"){
            $("#saveBtn").hide();
            eduResultReqPop.fn_kendoUIEnableSet();
        }

        if($("#mode").val() == "mng" && eduReq.global.eduInfo.RES_STATUS != "100"){
            $("#campusBtnBox").hide();
        }
    },

    fn_kendoUIEnableSet : function(){
        $(':radio').attr('disabled', true);
        $('.k-input-inner').data("kendoTextArea").enable(false);
        $("#eduContent").data("kendoTextArea").enable(false);
        $("#eduPoint").data("kendoTextArea").enable(false);
        $("#FBList").data("kendoTextArea").enable(false);
        $("label[for='eduFile']").css("display", "none");
    },

    campusResDrafting: function() {
        $("#campusResDraftFrm").one("submit", function() {
            var url = "/Campus/pop/campusResApprovalPop.do";
            var name = "_self";
            var option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=yes, scrollbars = yes, status=no, top=50, left=50"
            var popup = window.open(url, name, option);
            this.action = "/Campus/pop/campusResApprovalPop.do";
            this.method = 'POST';
            this.target = '_self';
        }).trigger("submit");
    },
}
