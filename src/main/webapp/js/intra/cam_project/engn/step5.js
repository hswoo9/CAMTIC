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
    },

    fn_save : function (){
        if($("#befExpAmt").val() != es1.uncomma($("#expAmt").val())){
            if(!confirm("예상견적가와 견적가가 다릅니다. 저장하시겠습니까?")){
                return false;
            }
        }

        var data = {
            estSn : $("#estSn").val(),
            pjtSn : $("#pjtSn").val(),
            delvDe : $("#delvDe").val(),
            estTotAmt : es1.uncomma($("#expAmt").val()),
            estIss : $("#etc").val(),
            pjtStep : $("#pjtStep").val(),
            pjtStepNm : $("#pjtStepNm").val(),
            step : $("#step").val()
        }

        $.ajax({
            url : "/project/updStep5",
            data : data,
            type : "post",
            dataType : "json",
            success:function (rs) {
                if(rs.code == 200){
                    $("#productTb > tr").each(function (idx){
                        if(idx != 0) {
                            var data2 = {
                                estSn: data.estSn,
                                prodNm: $("#prodNm" + idx).val(),
                                prodCnt: es1.uncomma($("#prodCnt" + idx).val()),
                                unit: $("#unit" + idx).val(),
                                unitAmt: es1.uncomma($("#unitAmt" + idx).val()),
                                supAmt: es1.uncomma($("#supAmt" + idx).val()),
                                etc: $("#procEtc" + idx).val()
                            }

                            $.ajax({
                                url: "/project/insStep1Sub",
                                data: data2,
                                type: "post",
                                async: false,
                                dataType: "json",
                                success: function (rs) {
                                    if (rs.code == 200) {
                                        opener.parent.camPrj.gridReload();
                                        window.close();
                                    }
                                }
                            })
                        }
                    });
                }
            }
        });
    }
}