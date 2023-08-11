var es5 = {
    global : {

    },

    fn_defaultScript : function (){

        customKendo.fn_datePicker("delvDe", "depth", "yyyy-MM-dd", new Date());

        customKendo.fn_textBox(["pjtCd", "crmNm", "crmMem", "pjtNm", "expAmt"]);

        $("#estIss").kendoTextArea({
            rows: 5
        });

        $(".prodNm, .prodCnt, .unit, .unitAmt, .supAmt, .prodEtc").kendoTextBox();

        $("#prodCnt, #unitAmt").on("keyup", function(){
            $("#supAmt").val(es1.comma(es1.uncomma($("#unitAmt").val()) * es1.uncomma($("#prodCnt").val())))
        });
    }
}