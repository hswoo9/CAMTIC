var contentWritePop = {
    init: function (){
        contentWritePop.pageSet();
        contentWritePop.dataSet();
    },

    pageSet: function(){
        customKendo.fn_textBox(["content1", "empName", "content3", "content4", "content5"]);
    },

    dataSet: function(){
        const cardNumber = $("#cardNumber").val()
        if(cardNumber == null || cardNumber == ""){ return; }

        const result = customKendo.fn_customAjax("/Inside/getInterviewDetail.do", {cardNumber: cardNumber});
        const list = result.list;
        if (list.length > 0){
            const data = list[0];
            console.log("data", data);
            $("#cardDate").val(data.CARD_INTERVIEW_DT);
            $("#sTime").val(data.stime);
            $("#eTime").val(data.etime);
            $("#empSeq").val(data.EMP_SEQ);
            $("#empName").val(data.EMP_NAME_KR);
            $("#cardInterviewer").val(data.card_interviewer);
            $("#interviewContent1").val(data.interview_content1);
            $("#interviewContent2").val(data.interview_content2);
            $("#interviewContent3").val(data.interview_content3);
            $("#interviewContent4").val(data.interview_content4);
            $("#interviewContent5").val(data.interview_content5);
        }
    }
}