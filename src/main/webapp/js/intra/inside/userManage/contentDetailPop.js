var contentDetailPop = {
    init: function (){
        contentDetailPop.dataSet();
    },

    dataSet: function(){
        customKendo.fn_textBox(["card_number", "dept_name", "dept_team_name", "emp_name_kr", "card_interview_date", "card_interviewer", "card_superior_person", "card_superior_person2", "card_status"]);
    },


}