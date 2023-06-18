var now = new Date();

var eduInfoViewPop = {
    global : {
        eduInfoId : "",
        eduFormType : ""
    },

    init : function(){
        eduInfoViewPop.dataSet();
    },

    dataSet : function() {
        eduInfoViewPop.global.eduInfoId = $("#eduInfoId").val();
        let eduInfoId = eduInfoViewPop.global.eduInfoId;

        $.ajax({
            url : "/campus/getEduResultOne",
            data : {
                eduInfoId : eduInfoId
            },
            type : "post",
            dataType : "json",
            async: false,
            success : function(result){
                console.log(result.data);
                const data = result.data;

                eduInfoViewPop.global.eduFormType = data.EDU_FORM_TYPE;
                $("#eduCategoryDetailNameTd").text(data.EDU_CATEGORY_DETAIL_NAME);
                $("#levelIdTd").text(data.LEVEL_ID+" 레벨");
                $("#eduNameTd").text(data.EDU_NAME);
                $("#eduObjectTd").text(data.EDU_OBJECT.replace(/\n+/g, "<br>"));
                $("#eduContentTd").text(data.EDU_CONTENT.replace(/\n+/g, "<br>"));
                $("#dtTd").text(data.START_DT+"~"+data.END_DT+" (총 "+data.TERM_DAY+"일 "+data.TERM_TIME+"시간)");
                $("#careTd").html("기관명 : "+data.CARE_NAME+"<br>소재지 : "+data.CARE_LOCATION+" (전화 : "+data.CARE_TEL_NUM+")");
                $("#eduMoneyTd").text(data.EDU_MONEY+" 원");
                $("#eduMoneyTypeTd").text(data.EDU_MONEY_TYPE);
                $("#travelMoneyTypeTd").text(data.TRAVEL_MONEY_TYPE);
                $("#returnMoneyTd").text(data.RETURN_MONEY+" 원");
                $("#returnDocTd").text(data.RETURN_DOC);
                $("#attachDocNameTd").text(data.RETURN_DOC);
                $("#regDateTd").text(data.REG_DT);

            },
            error: function(e) {
                console.log(e);
                alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다.");
                window.close();
            }
        });

        const eduFormType = eduInfoViewPop.global.eduFormType;

        if(eduFormType == "2") {
            $("#careNameVar").text("사이트명");
            $("#careLocationVar").text("URL");
            $("#careTelNumVar").hide();
        }else if(eduFormType == "3") {
            $("#eduNameVar").text("행사명");
            $("#objectForumTr").show();
            $("#eduObjectTr").hide();
            $("#eduContentVar").text("행사내용");
            $("#dtTh").text("행사기간");
            $("#careTh").text("행사주관");
            $("#careNameVar").text("주관명");
            $("#careLocationVar").text("행사장소");
            $("#careTelNumVar").hide();
        }else if(eduFormType == "4") {
            $("#eduNameVar").text("행사명");
            $("#eduContentVar").text("행사내용");
            $("#dtTh").text("행사기간");
            $("#careTh").text("행사주관");
            $("#careNameVar").text("주관명");
            $("#careLocationVar").text("행사장소");
            $("#careTelNumVar").hide();
        }else if(eduFormType == "5") {
            $("#eduNameVar").text("도서명");
            $("#eduContentVar").text("도서내용");
            $("#dtTh").text("학습기간");
            $("#careTh").text("행사주관");
            $("#careNameVar").text("주관명");
            $("#careLocationVar").text("행사장소");
            $("#careTr").hide();
            $("#eduMoneyTh").text("도서비용");
            let html = "";
            html += '<th id="eduNameVar">과정명</th>';
            html += '<td>';
            html += '   <input type="text" id="eduName" style="width: 300px">';
            html += '</td>';
            html += '<th id="eduNameVar">작가명</th>';
            html += '<td>';
            html += '   <input type="text" id="bookWriter" style="width: 300px">';
            html += '</td>';
            $("#bookTr").show()
            $("#eduNameTr").html(html);
        }

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
        $("#travelMoneyType").kendoRadioGroup({
            items: [
                { label : "신청", value : "Y" },
                { label : "신청안함", value : "N" }
            ],
            layout : "horizontal",
            labelPosition : "after",
            value : "N"
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
        $("#eduCategoryDetailName, #levelId").attr("readonly", true);
    },

    saveEduInfo : function() {
        if(!confirm("교육수강 신청서를 저장하시겠습니까?")){
            return;
        }

        let empSeq = $("#empSeq").val();
        let empName = $("#empName").val();
        let deptName = $("#deptName").val();
        let eduCategoryDetailId = $("#eduCategoryDetailId").val();
        let eduCategoryDetailName = $("#eduCategoryDetailName").val();
        let levelId = $("#levelId").val();
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
        let eduMoney = $("#eduMoney").val();
        let eduMoneyType = $("#eduMoneyType").data("kendoRadioGroup").value();
        let travelMoneyType = $("#travelMoneyType").data("kendoRadioGroup").value();
        let returnMoney = $("#returnMoney").val();
        let returnDoc = $("#returnDoc").val();
        let attachDocName = $("#attachDocName").val();
        let regDate = $("#regDate").val();
        let eduFormType = $("#eduFormType").val();
        let objectForumType = $("#objectForumType").data("kendoRadioGroup").value();
        let objectForumVal = $("#objectForumVal").val();
        let bookWriter = $("#bookWriter").val();
        let bookPage = $("#bookPage").val();
        let bookPulish = $("#bookPulish").val();

        if(eduCategoryDetailName == "") {
            alert("목표기술서가 선택되지 않았습니다.");
            return;
        }
        if(eduName == "") {
            alert("과정명이 작성되지 않았습니다.");
            return;
        }
        if(!eduFormType == "3") {
            if(eduObject == "") {
                alert("학습목적이 작성되지 않았습니다.");
                return;
            }
        }else if(eduFormType == "5") {
            if(bookWriter == "") {
                alert("작가명이 작성되지 않았습니다.");
                return;
            }
            if(bookPage == "") {
                alert("페이지수가 작성되지 않았습니다.");
                return;
            }
            if(bookPulish == "") {
                alert("출판사명이 작성되지 않았습니다.");
                return;
            }
        }else {
            if(objectForumType == "1" && objectForumVal == "") {
                alert("발표제목 작성되지 않았습니다.");
                return;
            }
        }
        if(startDt == "" || endDt == "") {
            alert("학습기간이 작성되지 않았습니다.");
            return;
        }
        if(termDay == "" || termTime == "") {
            alert("학습시간이 작성되지 않았습니다.");
            return;
        }
        if(eduMoney == "") {
            alert("교육비가 작성되지 않았습니다.");
            return;
        }
        if(eduMoney == "") {
            alert("환급예상액이 작성되지 않았습니다.");
            return;
        }

        let data = {
            empSeq : empSeq,
            empName : empName,
            deptName : deptName,
            eduCategoryDetailId : eduCategoryDetailId,
            eduCategoryDetailName : eduCategoryDetailName,
            levelId : levelId,
            eduName : eduName,
            eduObject : eduObject,
            eduContent : eduContent,
            startDt : startDt,
            endDt : endDt,
            termDay : termDay,
            termTime : termTime,
            careName : careName,
            careLocation : careLocation,
            careTelNum : firstCareTelNum + secondCareTelNum + thirdCareTelNum,
            eduMoney : eduMoney,
            eduMoneyType : eduMoneyType,
            travelMoneyType : travelMoneyType,
            returnMoney : returnMoney,
            returnDoc : returnDoc,
            attachDocName : attachDocName,
            regDate : regDate,
            eduFormType : eduFormType,
            objectForumType : objectForumType,
            objectForumVal : objectForumVal,
            bookWriter : bookWriter,
            bookPage : bookPage,
            bookPulish : bookPulish
        }

        if($("#eduInfoId").val() == "") {
            eduInfoViewPop.setEduInfoInsert(data);
        }else {
            eduInfoViewPop.setEduInfoUpdate(data);
        }
    },

    setEduInfoInsert: function(data) {
        $.ajax({
            url : "/campus/setEduInfoInsert",
            data : data,
            type : "post",
            dataType : "json",
            async : false,
            success : function(result){
                console.log(result);
                alert("교육수강 신청서 저장이 완료되었습니다.");
                //opener.parent.location.href('/Campus/eduInfo.do?menu=d_a');
                window.close();

            },
            error : function() {
                alert("데이터 저장 중 에러가 발생했습니다.");
                window.close();
            }
        });
    },

    setEduInfoUpdate: function() {
        $.ajax({
            url : "/campus/setEduPlanUpdate",
            data : {
                eduPlanId : $("#eduPlanId").val(),
                eduPlan : $("#eduPlan").val()
            },
            type : "post",
            dataType : "json",
            async : false,
            success : function(result){
                console.log(result);
                alert("학습계획 저장이 완료되었습니다.");
                window.close();
                opener.targetInfo.tableSet();
            },
            error : function() {
                alert("데이터 저장 중 에러가 발생했습니다.");
                window.close();
            }
        });
    },

    targetEduSetPop: function() {
        var url = "/Campus/pop/targetEduSetPop.do?targetYear="+$("#regDate").val().substring(0,4);
        var name = "targetEduSetPop";
        var option = "width = 1200, height = 800, top = 100, left = 200, location = no";
        var popup = window.open(url, name, option);
    },

    updateApprStat: function(status) {
        $.ajax({
            url: "/campus/updateEduInfoApprStat",
            data: {
                eduInfoId : eduInfoViewPop.global.eduInfoId,
                status : status
            },
            type: "post",
            dataType: "json",
            async: false,
            success: function (Result) {
                if(status == "10") {
                    alert("승인요청이 완료되었습니다.");
                    opener.parent.$("#mainGrid").data("kendoGrid").dataSource.read();
                }else {
                    alert("승인이 완료되었습니다.");
                    opener.parent.$("#mainGrid").data("kendoGrid").dataSource.read();
                }
                targetInfo.global.targetCategoryMainList = Result.list;
            }
        });
    },

    eduResultReqPop: function() {
        var url = "/Campus/pop/eduResultReqPop.do?eduInfoId="+eduInfoViewPop.global.eduInfoId;
        var name = "_self";
        var option = "width = 1200, height = 800, top = 100, left = 200, location = no";
        var popup = window.open(url, name, option);
    },

    eduResultViewPop: function() {
        var url = "/Campus/pop/eduResultViewPop.do?eduInfoId="+eduInfoViewPop.global.eduInfoId;
        var name = "_self";
        var option = "width = 1200, height = 800, top = 100, left = 200, location = no";
        var popup = window.open(url, name, option);
    }
}
