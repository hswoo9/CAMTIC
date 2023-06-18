var now = new Date();

var eduResultViewPop = {
    global : {
        eduInfoId : "",
        eduFormType : ""
    },

    init : function(){
        eduResultViewPop.dataSet();
    },

    dataSet : function() {
        eduResultViewPop.global.eduInfoId = $("#eduInfoId").val();
        let eduInfoId = eduResultViewPop.global.eduInfoId;

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

                eduResultViewPop.global.eduFormType = data.EDU_FORM_TYPE;
                $("#eduNameTd").text(data.EDU_NAME);
                $("#eduDtTd").text(data.START_DT+"~"+data.END_DT);
                $("#eduTeacherNameTd").text(data.EDU_TEACHER_NAME);
                $("#careNameTd").text(data.CARE_NAME);
                $("#careLocationTd").text(data.CARE_LOCATION);
                $("#eduObjectTd").text(data.EDU_OBJECT.replace(/\n+/g, "<br>"));
                $("#eduContentTd").text(data.EDU_CONTENT.replace(/\n+/g, "<br>"));
                $("#eduEvalTd").text(data.EDU_EVAL);
                $("#eduPointTd").text(data.EDU_POINT.replace(/\n+/g, "<br>"));
                $("#FBListTd").text(data.FBLIST.replace(/\n+/g, "<br>"));

            },
            error: function(e) {
                console.log(e);
                alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다.");
                window.close();
            }
        });
    },

    updateApprStat: function(status) {
        $.ajax({
            url: "/campus/updateEduInfoApprStat",
            data: {
                eduInfoId : eduResultViewPop.global.eduInfoId,
                status : status
            },
            type: "post",
            dataType: "json",
            async: false,
            success: function (Result) {
                if(status == "40") {
                    alert("승인요청이 완료되었습니다.");
                    opener.parent.$("#mainGrid").data("kendoGrid").dataSource.read();
                }else {
                    alert("승인이 완료되었습니다.");
                    opener.parent.$("#mainGrid").data("kendoGrid").dataSource.read();
                }
                targetInfo.global.targetCategoryMainList = Result.list;
            }
        });
    }
}
