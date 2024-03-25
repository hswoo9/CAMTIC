const eduReq = {

    global: {
        radioGroupData : "",
        eduInfo : new Object(),
        attFiles : new Array(),
    },

    fn_defaultScript: function(){
        eduReq.pageSet();
    },

    pageSet: function(){
        $("#eduCategoryDetailName").kendoTextBox();
        $("#levelId").kendoTextBox();
        $("#eduName").kendoTextBox();
        $("#eduObject").kendoTextArea();
        $("#eduContent").kendoTextArea();
        $("#startDt, #endDt").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date()
        });
        $("#termDay").kendoTextBox();
        $("#termTime").kendoTextBox();
        $("#careName").kendoTextBox();
        $("#careLocation").kendoTextBox();
        $("#firstCareTelNum").kendoTextBox();
        $("#secondCareTelNum").kendoTextBox();
        $("#thirdCareTelNum").kendoTextBox();
        $("#eduMoney").kendoTextBox();
        $("#pjtNm").kendoTextBox();
        $("#eduMoneyType").kendoRadioGroup({
            items: [
                { label : "법인카드", value : "1" },
                { label : "사업비카드", value : "2" },
                { label : "계좌이체", value : "3" }
            ],
            layout : "horizontal",
            labelPosition : "after",
            value : "1"
        });
        $("#returnMoney").kendoTextBox();
        $("#returnDoc").kendoTextBox();
        $("#regDate").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : now
        });
        $("#objectForumType").kendoRadioGroup({
            items: [
                { label : "단순참가", value : "0" },
                { label : "주제발표", value : "1" }
            ],
            layout : "horizontal",
            labelPosition : "after",
            value : "0"
        });
        $("#objectForumVal").kendoTextBox();
        $("#bookWriter").kendoTextBox();
        $("#bookPage").kendoTextBox();
        $("#bookPulish").kendoTextBox();
        $("#treaOrigin").kendoTextBox();
        $("#treaUnit").kendoTextBox();
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
        $("#bookUnit").kendoTextBox();
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
        $("#eduCategoryDetailName, #levelId, #startDt, #endDt, #regDate").attr("readonly", true);

        eduReq.global.radioGroupData = [
            { label: "해당없음", value: "N" },
            { label: "R&D", value: "R" },
            { label: "비R&D", value: "S" },
            { label: "엔지니어링", value: "D" },
            { label: "용역/기타", value: "V" },
            { label: "캠아이템", value: "ETC" }
        ]
        customKendo.fn_radioGroup("purcType", eduReq.global.radioGroupData, "horizontal");

        $("input[name='purcType']").click(function(){
            if($("input[name='purcType']:checked").val() != "" && $("input[name='purcType']:checked").val() != "N" && $("input[name='purcType']:checked").val() != "ETC"){
                $("#project").css("display", "");
            } else {
                $("#project").css("display", "none");
                $("#pjtSn").val("");
                $("#pjtNm").val("");
            }
        });

        if($("#pjtSn").val() != ""){
            $("#purcType").data("kendoRadioGroup").value($("#busnClass").val());
            $("input[name='purcType']").trigger("click");
            $("#purcType").data("kendoRadioGroup").enable(false);
            $("#pjtSelBtn").prop("disabled", true);
            $("#pjtNm").prop("disabled", true);
        }

        if($("#eduInfoId").val() != ""){
            eduReq.dataSet();
        }

        eduReq.fn_btnSet();
    },

    dataSet : function(){
        const data = {
            eduInfoId : $("#eduInfoId").val()
        }
        const rs = customKendo.fn_customAjax("/campus/getEduInfoOne", data);
        const eduInfo = rs.data;
        const fileInfo = rs.fileInfo; console.log(fileInfo);
        eduReq.global.eduInfo = eduInfo;

        $("#eduCategoryDetailName").val(eduInfo.EDU_CATEGORY_DETAIL_NAME);
        $("#eduCategoryDetailId").val(eduInfo.EDU_CATEGORY_DETAIL_ID);
        $("#levelId").val(eduInfo.LEVEL_ID);
        $("#dutyClass").val(eduInfo.DUTY_CLASS);
        $("#eduName").val(eduInfo.EDU_NAME);
        $("#bookWriter").val(eduInfo.BOOK_WRITER_NAME);
        if(eduInfo.OBJECT_FORUM_TYPE == "단순참가"){
            $("#objectForumType").data("kendoRadioGroup").value('0');
        } else if(eduInfo.OBJECT_FORUM_TYPE == "주제발표"){
            $("#objectForumType").data("kendoRadioGroup").value('1');
        }
        $("#objectForumVal").val(eduInfo.OBJECT_FORUM_VAL);
        $("#bookPage").val(eduInfo.BOOK_PAGE_VAL);
        $("#bookPulish").val(eduInfo.BOOK_PULISH_NAME);
        $("#treaOrigin").val(eduInfo.TREA_ORIGIN);
        $("#treaUnit").val(eduInfo.TREA_UNIT);

        if(eduInfo.EDU_MONEY_TYPE == "법인카드"){
            $("#eduMoneyType").data("kendoRadioGroup").value('1');
        }else if(eduInfo.EDU_MONEY_TYPE == "사업비카드"){
            $("#eduMoneyType").data("kendoRadioGroup").value('2');
        }else{
            $("#eduMoneyType").data("kendoRadioGroup").value('3');
        }

        if(eduInfo.EDU_FORM_TYPE == "7"){
            $("#treaType").data("kendoRadioGroup").value(eduInfo.TREA_TYPE == "국내" ? "0" : "1");
            $("#treaUser").data("kendoRadioGroup").value(eduInfo.TREA_USER == "저자" ? "0" : "1");
        }

        if(eduInfo.EDU_FORM_TYPE == "10"){
            if(eduInfo.COMP_TYPE == "기술사"){
                $("#compType").data("kendoRadioGroup").value('1');
            }else if(eduInfo.COMP_TYPE == "기사"){
                $("#compType").data("kendoRadioGroup").value('2');
            }else if(eduInfo.COMP_TYPE == "산업기사"){
                $("#compType").data("kendoRadioGroup").value('3');
            }else{
                $("#compType").data("kendoRadioGroup").value('4');
            }
        }

        $("#bookUnit").val(eduInfo.BOOK_UNIT);
        $("#compType").val(eduInfo.COMP_TYPE);
        $("#eduObject").val(eduInfo.EDU_OBJECT);
        $("#eduContent").val(eduInfo.EDU_CONTENT);
        $("#startDt").val(eduInfo.START_DT);
        $("#endDt").val(eduInfo.END_DT);
        $("#termDay").val(eduInfo.TERM_DAY);
        $("#termTime").val(eduInfo.TERM_TIME);
        $("#careName").val(eduInfo.CARE_NAME);
        $("#careLocation").val(eduInfo.CARE_LOCATION);
        if(eduInfo.CARE_TEL_NUM != null){
            $("#firstCareTelNum").val(eduInfo.CARE_TEL_NUM.split("-")[0]);
            $("#secondCareTelNum").val(eduInfo.CARE_TEL_NUM.split("-")[1]);
            $("#thirdCareTelNum").val(eduInfo.CARE_TEL_NUM.split("-")[2]);
        }
        $("#eduMoney").val(comma(eduInfo.EDU_MONEY));
        $("#returnMoney").val(comma(eduInfo.RETURN_MONEY));
        $("#returnDoc").val(eduInfo.RETURN_DOC);
        $("#regDate").val(eduInfo.REG_DT);
        $("#purcType").data("kendoRadioGroup").value(eduInfo.PURC_TYPE);
        if(eduInfo.PURC_TYPE != null && eduInfo.PURC_TYPE != "" && eduInfo.PURC_TYPE != "N" && eduInfo.PURC_TYPE != "ETC"){
            $("#project").css("display", "");
            $("#PJT_SN").val(eduInfo.pjtSn);
            $("#pjtNm").val(eduInfo.PJT_NM);
        }

        if(fileInfo != null){
            $("#ulSetFileName").empty();

            var html = '';
            for(var i=0; i<fileInfo.length; i++){
                html += '<li>';
                html += '   <span style="cursor: pointer" onclick="fileDown(\'' + fileInfo[i].file_path + fileInfo[i].file_uuid + '\', \'' + fileInfo[i].file_org_name + '.' + fileInfo[i].file_ext + '\')">' + fileInfo[i].file_org_name + '.' + fileInfo[i].file_ext + '</span>';
                html += '   <input type="button" value="X" class="delBtn" style="margin-left: 5px; border: none; background-color: transparent; color: red; font-weight: bold;" onclick="eduReq.commonFileDel(' + fileInfo[i].file_no + ', this)">';
                html += '</li>';
            }

            $("#ulSetFileName").append(html);
        }
    },

    fn_btnSet: function(){
        console.log("eduInfo", eduReq.global.eduInfo);
        let html = makeApprBtnHtml(eduReq.global.eduInfo, 'eduReq.campusDrafting()');
        $("#campusBtnBox").html(html);

        if((eduReq.global.eduInfo.STATUS == "10" || eduReq.global.eduInfo.STATUS == "20" || eduReq.global.eduInfo.STATUS == "50" || eduReq.global.eduInfo.STATUS == "100") || $("#mode").val() == "mng"){
            $("#saveBtn").hide();
            eduReq.fn_kendoUIEnableSet();
        }

        if($("#mode").val() == "mng" && eduReq.global.eduInfo.STATUS != "100"){
            $("#campusBtnBox").hide();
        }
    },

    fn_kendoUIEnableSet : function(){
        $(":radio").attr("disabled", true);
        $(".k-textbox").addClass("k-disabled");
        $(".k-textarea").addClass("k-disabled");
        $("#targetTechBtn").attr("disabled", true);
        $("label[for='fileList']").css("display", "none");
        $(".delBtn").css("display", "none");
        $("#startDt").data("kendoDatePicker").enable(false);
        $("#endDt").data("kendoDatePicker").enable(false);
        $("#regDate").data("kendoDatePicker").enable(false);
    },

    campusDrafting: function() {
        $("#campusDraftFrm").one("submit", function() {
            var url = "/Campus/pop/campusApprovalPop.do";
            var name = "_self";
            var option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=yes, scrollbars = yes, status=no, top=50, left=50"
            var popup = window.open(url, name, option);
            this.action = "/Campus/pop/campusApprovalPop.do";
            this.method = 'POST';
            this.target = '_self';
        }).trigger("submit");
    },

    saveEduInfo: function(){
        if($("#eduInfoId").val() == "") {
            if (!confirm("교육수강 신청서를 저장하시겠습니까?")) {
                return;
            }
        }else if($("#eduInfoId").val() != ""){
            if (!confirm("교육수강 신청서를 수정하시겠습니까?")) {
                return;
            }
        }
        let deptSeq = $("#deptSeq").val();
        let empSeq = $("#empSeq").val();
        let empName = $("#empName").val();
        let deptName = $("#deptName").val();
        let eduCategoryDetailId = $("#eduCategoryDetailId").val();
        let eduCategoryDetailName = $("#eduCategoryDetailName").val();
        let levelId = $("#levelId").val();
        let dutyClass = $("#dutyClass").val();
        let eduName = $("#eduName").val();
        let eduObject = $("#eduObject").val();
        let eduContent = $("#eduContent").val();
        let startDt = $("#startDt").val();
        let endDt = $("#endDt").val();
        let termDay = $("#termDay").val() == null ? 0 : $("#termDay").val();
        let termTime = $("#termTime").val() == null ? 0 : $("#termTime").val();
        let careName = $("#careName").val();
        let careLocation = $("#careLocation").val();
        let firstCareTelNum = $("#firstCareTelNum").val();
        let secondCareTelNum = $("#secondCareTelNum").val();
        let thirdCareTelNum = $("#thirdCareTelNum").val();
        let eduMoney = $("#eduMoney").val().replace(/,/g, "");
        let eduMoneyType = "";
        let returnMoney = $("#returnMoney").val() == null ? "0" : $("#returnMoney").val().replace(/,/g, "");
        let returnDoc = $("#returnDoc").val();
        let attachDocName = "";
        let regDate = $("#regDate").val();
        let eduFormType = $("#eduFormType").val();
        let objectForumType = "";
        let objectForumText = "";
        let objectForumVal = "";
        let bookWriter = $("#bookWriter").val();
        let bookPage = $("#bookPage").val();
        let bookPulish = $("#bookPulish").val();
        let treaOrigin = "";
        let treaUnit = "";
        let treaType = "";
        let treaUser = "";
        let bookUnit = $("#bookUnit").val();
        let compType = "";
        let eduInfoId =  $("#eduInfoId").val();

        if(eduCategoryDetailName == ""){
            alert("목표기술서가 선택되지 않았습니다.");
            return;
        }
        if(eduName == ""){
            alert("과정명이 작성되지 않았습니다.");
            return;
        }
        if(eduFormType != "3"){
            if(eduObject == ""){
                alert("학습목적이 작성되지 않았습니다.");
                return;
            }
        }
        if(eduFormType != "7" && eduFormType != "8"){
            if(termDay == "" || termTime == ""){
                alert("학습시간이 작성되지 않았습니다.");
                return;
            }
        }
        if(startDt == "" || endDt == ""){
            alert("학습기간이 작성되지 않았습니다.");
            return;
        }
        if(eduMoney == ""){
            alert("교육비가 작성되지 않았습니다.");
            return;
        }
        if(eduMoney == ""){
            alert("환급예상액이 작성되지 않았습니다.");
            return;
        }
        if(eduFormType != "11"){
            eduMoneyType = $("label[for='"+$("input:radio[name=eduMoneyType]:checked").attr("id")+"']").text();
        }
        if(eduFormType == "3"){
            objectForumType = $("#objectForumType").data("kendoRadioGroup").value();
            objectForumText = $("label[for='"+$("input:radio[name=objectForumType]:checked").attr("id")+"']").text();
            objectForumVal = $("#objectForumVal").val();
            if($("#objectForumType").data("kendoRadioGroup").value() == "1" && objectForumVal == ""){
                alert("발표제목 작성되지 않았습니다.");
                return;
            }
        }else if(eduFormType == "5"){
            if(bookWriter == ""){
                alert("작가명이 작성되지 않았습니다.");
                return;
            }
            if(bookPage == ""){
                alert("페이지수가 작성되지 않았습니다.");
                return;
            }
            if(bookPulish == ""){
                alert("출판사명이 작성되지 않았습니다.");
                return;
            }
        }else if(eduFormType == "6"){
            treaOrigin = $("#treaOrigin").val();
            treaUnit = $("#treaUnit").val();
            if(treaOrigin == ""){
                alert("출처가 작성되지 않았습니다.");
                return;
            }
            if(treaUnit == ""){
                alert("편수가 작성되지 않았습니다.");
                return;
            }
        }else if(eduFormType == "7"){
            treaType = $("label[for='"+$("input:radio[name=treaType]:checked").attr("id")+"']").text();
            treaUser = $("label[for='"+$("input:radio[name=treaUser]:checked").attr("id")+"']").text();
        }else if(eduFormType == "8"){
            if(bookUnit == ""){
                alert("권수가 작성되지 않았습니다.");
                return;
            }
        }else if(eduFormType == "10"){
            compType = $("label[for='"+$("input:radio[name=compType]:checked").attr("id")+"']").text();
        }

        let data = {
            deptSeq: deptSeq,
            empSeq: empSeq,
            empName: empName,
            deptName: deptName,
            eduCategoryDetailId: eduCategoryDetailId,
            eduCategoryDetailName: eduCategoryDetailName,
            levelId: levelId,
            dutyClass: dutyClass,
            eduName: eduName,
            eduObject: eduObject,
            eduContent: eduContent,
            startDt: startDt,
            endDt: endDt,
            termDay: termDay,
            termTime: termTime,
            careName: careName,
            careLocation: careLocation,
            careTelNum: firstCareTelNum + "-" + secondCareTelNum + "-" + thirdCareTelNum,
            eduMoney: eduMoney,
            eduMoneyType: eduMoneyType,
            objectForumText: objectForumText,
            returnMoney: returnMoney,
            returnDoc: returnDoc,
            attachDocName: attachDocName,
            regDate: regDate,
            eduFormType: eduFormType,
            objectForumType: objectForumType,
            objectForumVal: objectForumVal,
            bookWriter: bookWriter,
            bookPage: bookPage,
            bookPulish: bookPulish,
            treaOrigin: treaOrigin,
            treaUnit: treaUnit,
            treaType: treaType,
            treaUser: treaUser,
            bookUnit: bookUnit,
            compType: compType,
            eduInfoId: eduInfoId
        }

        if($("input[name='purcType']:checked").val() == null || $("input[name='purcType']:checked").val() == ""){
            alert("관련사업이 선택되지 않았습니다.");
            return;
        }else{
            if($("input[name='purcType']:checked").val() != "N" && $("input[name='purcType']:checked").val() != "ETC" && $("#pjtSn").val() == ""){
                alert("프로젝트가 선택되지 않았습니다.");
                return;
            }
            data.pjtSn = $("#pjtSn").val();
        }
        data.purcType = $("input[name='purcType']:checked").val();

        var fd = new FormData();
        for (var key in data) {
            fd.append(key, data[key]);
        }

        if(eduReq.global.attFiles != null){
            for(var i = 0; i < eduReq.global.attFiles.length; i++){
                fd.append("fileList", eduReq.global.attFiles[i]);
            }
        }

        if($("#eduInfoId").val() == ""){
            eduReq.setEduInfoInsert(fd);
        }else if($("#eduInfoId").val() != ""){
            eduReq.setEduInfoModify(fd);
        }else {
            eduReq.setEduInfoUpdate(data);
        }
    },

    setEduInfoInsert: function(data){
        $.ajax({
            url: "/campus/setEduInfoInsert",
            data: data,
            type: "post",
            dataType: "json",
            contentType: false,
            processData: false,
            enctype: 'multipart/form-data',
            async: false,
            success: function(result){
                var eduInfoId = result.eduInfoId;
                alert("교육수강 신청서 저장이 완료되었습니다.");
                opener.parent.open_in_frame("/Campus/eduInfo.do");
                window.location.href = "/Campus/pop/eduReqPop.do?eduInfoId="+eduInfoId+"&eduFormType="+$("#eduFormType").val();
                // window.close();

            },
            error: function(){
                alert("데이터 저장 중 에러가 발생했습니다.");
                window.close();
            }
        });
    },

    setEduInfoModify: function (data){
        $.ajax({
            url: "/campus/setEduInfoModify",
            data: data,
            type: "post",
            dataType: "json",
            contentType: false,
            processData: false,
            enctype: 'multipart/form-data',
            async: false,
            success: function(result){
                var eduInfoId = result.eduInfoId;
                alert("교육수강 신청서 수정이 완료되었습니다.");
                window.location.href = "/Campus/pop/eduReqPop.do?eduInfoId="+eduInfoId+"&eduFormType="+$("#eduFormType").val();
            },
            error: function(){
                alert("데이터 수정 중 에러가 발생했습니다.");
                window.close();
            }
        });
    },

    setEduInfoUpdate: function(){
        $.ajax({
            url: "/campus/setEduPlanUpdate",
            data: {
                eduPlanId: $("#eduPlanId").val(),
                eduPlan: $("#eduPlan").val()
            },
            type: "post",
            dataType: "json",
            async: false,
            success: function(result){
                alert("학습계획 저장이 완료되었습니다.");
                window.location.href = "/Campus/pop/eduReqPop.do?eduInfoId="+eduInfoId+"&eduFormType="+$("#eduFormType").val();
            },
            error: function() {
                alert("데이터 저장 중 에러가 발생했습니다.");
                window.close();
            }
        });
    },

    targetEduSetPop: function(){
        let url = "/Campus/pop/targetEduSetPop.do?targetYear="+$("#regDate").val().substring(0,4);
        const name = "targetEduSetPop";
        const option = "width = 1200, height = 800, top = 100, left = 200, location = no";
        window.open(url, name, option);
    },

    fn_projectPop: function (){
        let url = "/project/pop/projectView.do?busnClass="+ $("input[name='purcType']:checked").val();
        const name = "_blank";
        const option = "width = 1100, height = 700, top = 100, left = 400, location = no"
        window.open(url, name, option);
    },

    fileChange: function(e){
        for(var i = 0; i < $("input[name='fileList']")[0].files.length; i++){
            eduReq.global.attFiles.push($("input[name='fileList']")[0].files[i]);
        }

        $("#ulFileName").empty();
        if(eduReq.global.attFiles.length > 0){
            var html = '';
            for (var i = 0; i < eduReq.global.attFiles.length; i++) {
                html += '<li>'
                html += eduReq.global.attFiles[i].name.substring(0, eduReq.global.attFiles[i].name.lastIndexOf(".")) + '.';
                html += eduReq.global.attFiles[i].name.substring(eduReq.global.attFiles[i].name.lastIndexOf(".")+1);
                html += '<input type="button" value="X" class="delBtn" style="margin-left: 5px; border: none; background-color: transparent; color: red; font-weight: bold;" onclick="eduReq.fnUploadFile(' + i + ')">';
                html += '</li>';
            }

            $("#ulSetFileName").css('margin-bottom', 0);
            $("#ulFileName").append(html);
        }
    },

    fnUploadFile : function(e) {
        const dataTransfer = new DataTransfer();
        let fileArray = Array.from(eduReq.global.attFiles);
        fileArray.splice(e, 1);
        fileArray.forEach(file => {
            dataTransfer.items.add(file);
        });

        eduReq.global.attFiles = dataTransfer.files;

        if(eduReq.global.attFiles.length > 0){
            $("#ulFileName").empty();

            var html = '';
            for (var i = 0; i < eduReq.global.attFiles.length; i++) {
                html += '<li>'
                html += eduReq.global.attFiles[i].name.substring(0, eduReq.global.attFiles[i].name.lastIndexOf(".")) + '.';
                html += eduReq.global.attFiles[i].name.substring(eduReq.global.attFiles[i].name.lastIndexOf(".")+1);
                html += '<input type="button" value="X" class="delBtn" style="margin-left: 5px; border: none; background-color: transparent; color: red; font-weight: bold;" onclick="eduReq.fnUploadFile(' + i + ')">';
                html += '</li>';
            }

            $("#ulFileName").append(html);
        } else {
            $("#ulFileName").empty();
        }

        if(eduReq.global.attFiles.length == 0){
            eduReq.global.attFiles = new Array();
        }

        eduReq.global.attFiles = Array.from(eduReq.global.attFiles);
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

    eduInfoViewPop: function(eduInfoId){
        let url = "/Campus/pop/eduInfoViewPop.do?eduInfoId="+eduInfoId;
        const name = "popup";
        const option = "width = 1170, height = 1000, top = 100, left = 200, location = no";
        window.open(url, name, option);
    }

}
