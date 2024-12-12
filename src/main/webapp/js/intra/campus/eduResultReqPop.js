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

        $("#eduName, #bookPageVal, #bookPulishName, #treaOrigin, #treaUnit, #eduTeacherName, #objectForumVal, #careLocation, #bookUnit, #eduObject").kendoTextBox();
        $("#careName, #careName9, #careName10, #termDay, #termTime").kendoTextBox();

        $("#eduContent, #eduPoint, #FBList").kendoTextArea();
        $("#objectForumType").kendoRadioGroup({
            items: [
                { label : "단순참가", value : "0" },
                { label : "주제발표", value : "1" }
            ],
            layout : "horizontal",
            labelPosition : "after",
            value : "0"
        });
        $("#treaType").kendoRadioGroup({
            items: [
                { label : "국내", value : "0" },
                { label : "국외", value : "1" }
            ],
            layout : "horizontal",
            labelPosition : "after",
            value : "0"
        });
        $("#treaUser").kendoRadioGroup({
            items: [
                { label : "저자", value : "0" },
                { label : "교신저자", value : "1" }
            ],
            layout : "horizontal",
            labelPosition : "after",
            value : "0"
        });
        $("#compType").kendoRadioGroup({
            items: [
                { label : "기술사", value : "1" },
                { label : "기사", value : "2" },
                { label : "산업기사", value : "3" },
                { label : "기타", value : "4" }
            ],
            layout : "horizontal",
            labelPosition : "after",
            value : "1"
        });
        $("#eduEval").kendoRadioGroup({
            items: [
                { label : "매우도움", value : "1" },
                { label : "도움", value : "2" },
                { label : "참고정도", value : "3" },
                { label : "기대이하", value : "4" }
            ],
            layout : "horizontal",
            labelPosition : "after",
            value : "1"
        });

        $("#startDt").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
        });
        $("#endDt").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
        });

        customKendo.fn_datePicker("resRegDt", "month", "yyyy-MM-dd", new Date());


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
        $("#eduName").val(eduResInfo.EDU_NAME);
        $("#bookPageVal").val(eduResInfo.BOOK_PAGE_VAL);
        $("#bookPulishName").val(eduResInfo.BOOK_PULISH_NAME);
        $("#treaOrigin").val(eduResInfo.TREA_ORIGIN);
        $("#treaUnit").val(eduResInfo.TREA_UNIT);
        $("#startDt").val(eduResInfo.START_DT);
        $("#endDt").val(eduResInfo.END_DT);

        if(eduResInfo.RES_REG_DT != null) {
            $("#resRegDt").val(eduResInfo.RES_REG_DT);
        }

        $("#termDay").val(eduResInfo.TERM_DAY);
        $("#termTime").val(eduResInfo.TERM_TIME);
        $("#compType").val(eduResInfo.COMP_TYPE);
        $("#eduTeacherName").val(eduResInfo.EDU_TEACHER_NAME);
        if(eduResInfo.OBJECT_FORUM_TYPE == "단순참가"){
            $("#objectForumType").data("kendoRadioGroup").value('0');
        } else if(eduResInfo.OBJECT_FORUM_TYPE == "주제발표"){
            $("#objectForumType").data("kendoRadioGroup").value('1');
        }
        $("#objectForumVal").val(eduResInfo.OBJECT_FORUM_VAL);

        if($("#eduFormType").val() == 9){
            $("#careName9").val(eduResInfo.CARE_NAME);
        } else if($("#eduFormType").val() == 10){
            $("#careName10").val(eduResInfo.CARE_NAME);

            if(eduResInfo.COMP_TYPE == "기술사"){
                $("#compType").data("kendoRadioGroup").value('1');
            }else if(eduResInfo.COMP_TYPE == "기사"){
                $("#compType").data("kendoRadioGroup").value('2');
            }else if(eduResInfo.COMP_TYPE == "산업기사"){
                $("#compType").data("kendoRadioGroup").value('3');
            }else{
                $("#compType").data("kendoRadioGroup").value('4');
            }
        } else {
            $("#careName").val(eduResInfo.CARE_NAME);
        }


        $("#careLocation").val(eduResInfo.CARE_LOCATION);
        $("#bookUnit").val(eduResInfo.BOOK_UNIT);
        $("#eduObject").val(eduResInfo.EDU_OBJECT);
        $("#eduContent").val(eduResInfo.EDU_CONTENT);
        $("#eduPoint").val(eduResInfo.EDU_POINT);
        $("#FBList").val(eduResInfo.FBLIST);

        if($("#eduFormType").val() == 1 || $("#eduFormType").val() == 2){
            $("#eduEval").data("kendoRadioGroup").value(eduResInfo.EDU_EVAL);
        }
        if($("#eduFormType").val() == 7){
            $("#treaType").data("kendoRadioGroup").value(eduResInfo.TREA_TYPE == "국내" ? "0" : "1");
            $("#treaUser").data("kendoRadioGroup").value(eduResInfo.TREA_USER == "저자" ? "0" : "1");
        }

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
        let eduName = $("#eduName").val();
        let bookPageVal = $("#bookPageVal").val();
        let bookPulishName = $("#bookPulishName").val();
        let treaOrigin = $("#treaOrigin").val();
        let treaUnit = $("#treaUnit").val();
        let treaType = "";
        let treaUser = "";
        let compType = "";
        let careName = "";
        let startDt = $("#startDt").val();
        let endDt = $("#endDt").val();
        let resRegDt = $("#resRegDt").val();
        let termDay = $("#termDay").val() == null ? 0 : $("#termDay").val();
        let termTime = $("#termTime").val() == null ? 0 : $("#termTime").val();
        let eduTeacherName = $("#eduTeacherName").val();
        let objectForumType = $("#objectForumType").val();
        let objectForumText = $("label[for='"+$("input:radio[name=objectForumType]:checked").attr("id")+"']").text();
        let objectForumVal = $("#objectForumVal").val();
        let careLocation = $("#careLocation").val();
        let bookUnit = $("#bookUnit").val();
        let eduObject = $("#eduObject").val();
        let eduContent = $("#eduContent").val();
        let eduEval = "";
        let eduPoint = $("#eduPoint").val();
        let FBList = $("#FBList").val();
        let attachDocName = $("#attachDocName").val();
        let eduInfoId = eduResultReqPop.global.eduInfoId;
        let eduFormType = eduResultReqPop.global.eduFormType;

        if(eduFormType == 9){
            careName = $("#careName9").val();
        } else if(eduFormType == 10){
            careName = $("#careName10").val();
            compType = $("label[for='"+$("input:radio[name=compType]:checked").attr("id")+"']").text();
        } else {
            careName = $("#careName").val();
        }

        if(eduFormType == 1 || eduFormType == 2){
            eduEval = $("#eduEval").data("kendoRadioGroup").value();
        }
        if(eduFormType == 7){
            treaType = $("label[for='"+$("input:radio[name=treaType]:checked").attr("id")+"']").text();
            treaUser = $("label[for='"+$("input:radio[name=treaUser]:checked").attr("id")+"']").text();
        }

        if(eduFormType != 7 && eduFormType != 8){
            if(startDt == "" || endDt == "" || termDay == "" || termTime == "") {
                alert("학습기간이 작성되지 않았습니다.");
                return;
            }
        }

        if(eduFormType == 5) {
            if(bookPageVal == "") {
                alert("페이지수가 작성되지 않았습니다.");
                return;
            } else if(bookPulishName == ""){
                alert("출판사명이 작성되지 않았습니다.");
                return;
            }
        }else if(eduFormType == 6) {
            if(treaOrigin == "") {
                alert("출처가 작성되지 않았습니다.");
                return;
            } else if(treaUnit == ""){
                alert("편수가 작성되지 않았습니다.");
                return;
            }
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
            eduName : eduName,
            bookPageVal : bookPageVal,
            bookPulishName : bookPulishName,
            treaOrigin : treaOrigin,
            treaUnit : treaUnit,
            treaType : treaType,
            treaUser : treaUser,
            compType : compType,
            careName : careName,
            startDt : startDt,
            endDt : endDt,
            resRegDt : resRegDt,
            termDay : termDay,
            termTime : termTime,
            eduTeacherName : eduTeacherName,
            objectForumType : objectForumType,
            objectForumText : objectForumText,
            objectForumVal : objectForumVal,
            careLocation : careLocation,
            bookUnit : bookUnit,
            eduObject : eduObject,
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
            DOC_MENU_CD: eduResultReqPop.global.eduResInfo.RES_DOC_MENU_CD,
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
        $("#startDt").data("kendoDatePicker").enable(false);
        $("#endDt").data("kendoDatePicker").enable(false);
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
