var now = new Date();

var eduResultReqPop = {
    global : {
        eduInfoId : "",
        eduFormType : ""
    },

    init : function(){
        eduResultReqPop.dataSet();
    },

    dataSet : function() {
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
    },

    saveEduResult : function() {
        if(!confirm("교육수강 신청서를 저장하시겠습니까?")){
            return;
        }

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

        eduResultReqPop.setEduResultInsert(data);
    },

    setEduResultInsert: function(data) {
        $.ajax({
            url : "/campus/setEduResultInsert",
            data : data,
            type : "post",
            dataType : "json",
            async : false,
            success : function(result){
                alert("교육 결과보고서 저장이 완료되었습니다.");
                opener.parent.$("#mainGrid").data("kendoGrid").dataSource.read();
                window.close();

            },
            error : function() {
                alert("데이터 저장 중 에러가 발생했습니다.");
            }
        });
    }
}
