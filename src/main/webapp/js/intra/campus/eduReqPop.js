const eduReq = {

    global: {
        radioGroupData : "",
    },

    init: function(){
        eduReq.dataSet();
    },

    saveEduInfo: function(){
        if(!confirm("교육수강 신청서를 저장하시겠습니까?")){
            return;
        }

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
        let termDay = $("#termDay").val();
        let termTime = $("#termTime").val();
        let careName = $("#careName").val();
        let careLocation = $("#careLocation").val();
        let firstCareTelNum = $("#firstCareTelNum").val();
        let secondCareTelNum = $("#secondCareTelNum").val();
        let thirdCareTelNum = $("#thirdCareTelNum").val();
        let eduMoney = $("#eduMoney").val().replace(/,/g, "");
        let eduMoneyType = "";
        let returnMoney = $("#returnMoney").val().replace(/,/g, "");;
        let returnDoc = $("#returnDoc").val();
        let attachDocName = $("#attachDocName").val();
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
        if(startDt == "" || endDt == ""){
            alert("학습기간이 작성되지 않았습니다.");
            return;
        }
        if(termDay == "" || termTime == ""){
            alert("학습시간이 작성되지 않았습니다.");
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
            objectForumType = $("label[for='"+$("input:radio[name=objectForumType]:checked").attr("id")+"']").text();
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
            careTelNum: firstCareTelNum + secondCareTelNum + thirdCareTelNum,
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
            compType: compType
        }

        var fd = new FormData();
        for (var key in data) {
            fd.append(key, data[key]);
        }

        if($("#eduFile")[0].files.length == 1){
            fd.append("eduFile", $("#eduFile")[0].files[0]);
        }

        if($("#eduInfoId").val() == ""){
            eduReq.setEduInfoInsert(fd);
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
                console.log(result);
                alert("교육수강 신청서 저장이 완료되었습니다.");
                opener.parent.open_in_frame("/Campus/eduInfo.do");
                window.close();

            },
            error: function(){
                alert("데이터 저장 중 에러가 발생했습니다.");
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
                console.log(result);
                alert("학습계획 저장이 완료되었습니다.");
                window.close();
                opener.targetInfo.tableSet();
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

    dataSet: function(){
        $("#eduCategoryDetailName").kendoTextBox();
        $("#levelId").kendoTextBox();
        $("#eduName").kendoTextBox();
        $("#eduObject").kendoTextArea();
        $("#eduContent").kendoTextArea();
        $("#startDt, #endDt").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd"
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
        $("#attachDocName").kendoTextBox();
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
            { label: "법인운영", value: "" },
            { label: "R&D", value: "R" },
            { label: "비R&D", value: "S" },
            { label: "엔지니어링", value: "D" },
            { label: "용역/기타", value: "V" },
        ]
        customKendo.fn_radioGroup("purcType", eduReq.global.radioGroupData, "horizontal");

        $("input[name='purcType']").click(function(){
            if($("input[name='purcType']:checked").val() != ""){
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

        if($("#purcSn").val()){
            eduReq.purcDataSet();
        }
    },

    fn_projectPop: function (){
        let url = "/project/pop/projectView.do?busnClass="+ $("input[name='purcType']:checked").val();
        const name = "_blank";
        const option = "width = 1100, height = 400, top = 100, left = 400, location = no"
        window.open(url, name, option);
    },

    fileChange: function(e){
        $(e).next().text($(e)[0].files[0].name);
    },
}
