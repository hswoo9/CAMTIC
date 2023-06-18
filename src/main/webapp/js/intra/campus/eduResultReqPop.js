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
        let eduInfoId = eduResultReqPop.global.eduInfoId;

        $.ajax({
            url : "/campus/getEduInfoOne",
            data : {
                eduInfoId : eduInfoId
            },
            type : "post",
            dataType : "json",
            async: false,
            success : function(result){
                console.log(result.data);
                const data = result.data;

                eduResultReqPop.global.eduFormType = data.EDU_FORM_TYPE;
                $("#eduNameTd").text(data.EDU_NAME);
                $("#eduDt").text(data.START_DT+"~"+data.END_DT);
                $("#termDay").val(data.TERM_DAY);
                $("#termTime").val(data.TERM_TIME);
                $("#careNameTd").text(data.CARE_NAME);
                $("#careLocationTd").text(data.CARE_LOCATION);
                $("#eduObjectTd").text(data.EDU_OBJECT.replace(/\n+/g, "<br>"));
                $("#eduContent").val(data.EDU_CONTENT);
            },
            error: function(e) {
                console.log(e);
                alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다.");
                window.close();
            }
        });

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
        let termDay = $("#termDay").val();
        let termTime = $("#termTime").val();
        let eduTeacherName = $("#eduTeacherName").val();
        let eduContent = $("#eduContent").val();
        let eduEval = $("#eduEval").data("kendoRadioGroup").value();
        let eduPoint = $("#eduPoint").val();
        let FBList = $("#FBList").val();
        let eduInfoId = eduResultReqPop.global.eduInfoId;

        if(termDay == "" || termTime == "") {
            alert("학습기간이 작성되지 않았습니다.");
            return;
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
        if(FBList == "") {
            alert("FEEDBACK LIST가 작성되지 않았습니다.");
            return;
        }

        let data = {
            empSeq : empSeq,
            termDay : termDay,
            termTime : termTime,
            eduTeacherName : eduTeacherName,
            eduContent : eduContent,
            eduEval : eduEval,
            eduPoint : eduPoint,
            FBList : FBList,
            eduInfoId : eduInfoId
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
                console.log(result);
                alert("교육 결과보고서 저장이 완료되었습니다.");
                opener.parent.$("#mainGrid").data("kendoGrid").dataSource.read();

            },
            error : function() {
                alert("데이터 저장 중 에러가 발생했습니다.");
            }
        });
    }
}
