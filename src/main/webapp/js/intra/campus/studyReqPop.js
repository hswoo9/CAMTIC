var now = new Date();

var studyReqPop = {
    global : {
    },

    init : function(){
        studyReqPop.dataSet();
    },

    dataSet : function() {
        $("#studyName").kendoTextBox();
        $("#studyUser").kendoTextBox();
        $("#startDt, #endDt, #regDate").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd"
        });
        $("#dateVal").kendoTextBox();
        $("#studyLocation").kendoTextBox();
        $("#studyObject").kendoTextArea();
        $("#studyContent").kendoTextArea();
        $("#studyMoney").kendoTextBox();
        $("#studyMoneyVal").kendoTextArea();
        $("#attach").kendoTextBox();
        $("#studyUser, #startDt, #endDt, #regDate").attr("readonly", true);
    },

    saveStudyInfo : function() {
        if(!confirm("학습조 신청서를 저장하시겠습니까?")){
            return;
        }

        let empSeq = $("#empSeq").val();
        let studyName = $("#studyName").val();
        let studyUser = $("#studyUser").val();
        let startDt = $("#startDt").val();
        let endDt = $("#endDt").val();
        let dateVal = $("#dateVal").val();
        let studyLocation = $("#studyLocation").val();
        let studyObject = $("#studyObject").val();
        let studyContent = $("#studyContent").val();
        let studyMoney = $("#studyMoney").val();
        let studyMoneyVal = $("#studyMoneyVal").val();
        let attach = $("#attach").val();
        let regDate = $("#regDate").val();

        if(studyName == "") {
            alert("학습조명이 작성되지 않았습니다.");
            return;
        }
        if(studyUser == "") {
            alert("학습자가 선택되지 않았습니다.");
            //return;
        }
        if(startDt == "" || endDt == "") {
            alert("학습기간이 작성되지 않았습니다.");
            return;
        }
        if(studyObject == "") {
            alert("학습목표가 작성되지 않았습니다.");
            return;
        }
        if(studyContent == "") {
            alert("학습내용이 작성되지 않았습니다.");
            return;
        }
        if(studyMoney == "") {
            alert("소모비용이 작성되지 않았습니다.");
            return;
        }
        if(studyMoneyVal == "") {
            alert("학습내용이 작성되지 않았습니다.");
            return;
        }
        if(regDate == "") {
            alert("신청날짜가 작성되지 않았습니다.");
            return;
        }

        let data = {
            empSeq : empSeq,
            studyName : studyName,
            studyUser : studyUser,
            startDt : startDt,
            endDt : endDt,
            dateVal : dateVal,
            studyLocation : studyLocation,
            studyObject : studyObject,
            studyContent : studyContent,
            studyMoney : studyMoney,
            studyMoneyVal : studyMoneyVal,
            attach : attach,
            regDate : regDate
        }

        studyReqPop.setStudyInfoInsert(data);
    },

    setStudyInfoInsert: function(data) {
        $.ajax({
            url : "/campus/setStudyInfoInsert",
            data : data,
            type : "post",
            dataType : "json",
            async : false,
            success : function(result){
                console.log(result);
                alert("학습조 신청서 저장이 완료되었습니다.");
                opener.parent.$("#mainGrid").data("kendoGrid").dataSource.read();
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
    }
}
