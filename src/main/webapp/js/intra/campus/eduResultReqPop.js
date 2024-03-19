var now = new Date();

var eduResultReqPop = {
    global : {
        eduInfoId : "",
        eduFormType : "",
        eduResInfo: [],
        attFiles: []
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
            $("#ulSetFileName").empty();

            var html = '';
            for(var i=0; i<resFileInfo.length; i++){
                html += '<li>';
                html += '   <span style="cursor: pointer" onclick="fileDown(\'' + resFileInfo[i].file_path + resFileInfo[i].file_uuid + '\', \'' + resFileInfo[i].file_org_name + '.' + resFileInfo[i].file_ext + '\')">' + resFileInfo[i].file_org_name + '.' + resFileInfo[i].file_ext + '</span>';
                html += '   <input type="button" value="X" class="delBtn" style="margin-left: 5px; border: none; background-color: transparent; color: red; font-weight: bold;" onclick="eduResultReqPop.commonFileDel(' + resFileInfo[i].file_no + ', this)">';
                html += '</li>';
            }

            $("#ulSetFileName").append(html);
        }
    },

    saveEduResult : function() {
        if(!confirm("교육 결과보고서를 저장하시겠습니까?")){
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

        if(eduResultReqPop.global.attFiles != null){
            for(var i = 0; i < eduResultReqPop.global.attFiles.length; i++){
                fd.append("fileList", eduResultReqPop.global.attFiles[i]);
            }
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
        for(var i = 0; i < $("input[name='fileList']")[0].files.length; i++){
            eduResultReqPop.global.attFiles.push($("input[name='fileList']")[0].files[i]);
        }

        $("#ulFileName").empty();
        if(eduResultReqPop.global.attFiles.length > 0){
            var html = '';
            for (var i = 0; i < eduResultReqPop.global.attFiles.length; i++) {
                html += '<li>'
                html += eduResultReqPop.global.attFiles[i].name.substring(0, eduResultReqPop.global.attFiles[i].name.lastIndexOf(".")) + '.';
                html += eduResultReqPop.global.attFiles[i].name.substring(eduResultReqPop.global.attFiles[i].name.lastIndexOf(".")+1);
                html += '<input type="button" value="X" class="delBtn" style="margin-left: 5px; border: none; background-color: transparent; color: red; font-weight: bold;" onclick="eduResultReqPop.fnUploadFile(' + i + ')">';
                html += '</li>';
            }

            $("#ulSetFileName").css('margin-bottom', 0);
            $("#ulFileName").append(html);
        }
    },

    fnUploadFile : function(e) {
        const dataTransfer = new DataTransfer();
        let fileArray = Array.from(eduResultReqPop.global.attFiles);
        fileArray.splice(e, 1);
        fileArray.forEach(file => {
            dataTransfer.items.add(file);
        });

        eduResultReqPop.global.attFiles = dataTransfer.files;

        if(eduResultReqPop.global.attFiles.length > 0){
            $("#ulFileName").empty();

            var html = '';
            for (var i = 0; i < eduResultReqPop.global.attFiles.length; i++) {
                html += '<li>'
                html += eduResultReqPop.global.attFiles[i].name.substring(0, eduResultReqPop.global.attFiles[i].name.lastIndexOf(".")) + '.';
                html += eduResultReqPop.global.attFiles[i].name.substring(eduResultReqPop.global.attFiles[i].name.lastIndexOf(".")+1);
                html += '<input type="button" value="X" class="delBtn" style="margin-left: 5px; border: none; background-color: transparent; color: red; font-weight: bold;" onclick="eduResultReqPop.fnUploadFile(' + i + ')">';
                html += '</li>';
            }

            $("#ulFileName").append(html);
        } else {
            $("#ulFileName").empty();
        }

        if(eduResultReqPop.global.attFiles.length == 0){
            eduResultReqPop.global.attFiles = new Array();
        }

        eduResultReqPop.global.attFiles = Array.from(eduResultReqPop.global.attFiles);
    },

    commonFileDel: function(e, v){
        if(confirm("삭제한 파일은 복구할 수 없습니다.\n그래도 삭제하시겠습니까?")){
            $.ajax({
                url: "/common/commonFileDel",
                data: {
                    fileNo: e
                },
                type: "post",
                datatype: "json",
                success: function (rs) {
                    var rs = rs.rs;
                    alert(rs.message);
                    if(rs.code == "200"){
                        $(v).closest("li").remove();
                    }
                }
            });
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
        $(":radio").attr("disabled", true);
        $(".k-textbox").addClass("k-disabled");
        $(".k-textarea").addClass("k-disabled");
        $("#FBList").data("kendoTextArea").enable(false);
        $("label[for='fileList']").css("display", "none");
        $(".delBtn").css("display", "none");
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
