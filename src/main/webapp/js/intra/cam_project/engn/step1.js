var es1 = {


    global : {

    },

    fn_defaultScript: function (){

        customKendo.fn_textBox(["contCd", "crmCompNm", "crmMem", "expAmt", "pjtNm"]);

        customKendo.fn_datePicker("estDt", "depth", "yyyy-MM-dd", new Date());

        $("#etc").kendoTextArea({
            rows : 5,
        });
    },

    fn_save : function() {
        alert("개발중")
    },

    fn_mod : function() {
        alert("개발중")
    }
}