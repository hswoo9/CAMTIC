var spr = {

    fn_defaultScript : function (){

        $("#pjtNm").val(opener.parent.$("#pjtNm").val());

        customKendo.fn_textBox(["empNameKr", "regNo", "trCd", "pjtNm", "supAmt", "vatAmt",
                                "incomeAmt", "locIncomeAmt", "supAllAmt", "totAmt", "gubun", "bustAmt"]);

        customKendo.fn_datePicker("appDe", "depth", "yyyy-MM-dd", new Date(opener.parent.$("#reqDe").val()));
        customKendo.fn_datePicker("reqDe", "depth", "yyyy-MM-dd", new Date(opener.parent.$("#reqDe").val()));


        $("#supAmt, #vatAmt").change(function (){
            if($("#type").val() == "9"){
                var supAmt = uncomma($("#supAmt").val());
                var vatAmt = uncomma($("#vatAmt").val());
                var bustAmt = uncomma($("#bustAmt").val());

                if(supAmt > 125000){
                    $("#incomeAmt").val(comma(Math.floor((Number(supAmt) - (Number(supAmt) * (Number(bustAmt) / 100))) * (Number(vatAmt) / 100) / 10) * 10));
                    var incomeAmt = uncomma($("#incomeAmt").val());

                    $("#locIncomeAmt").val(comma(Math.floor(Number(incomeAmt) * (10 / 100) / 10) * 10));
                    var locIncomeAmt = uncomma($("#locIncomeAmt").val());

                } else {

                    $("#incomeAmt").val(0);
                    var incomeAmt = uncomma($("#incomeAmt").val());

                    $("#locIncomeAmt").val(0);
                    var locIncomeAmt = uncomma($("#locIncomeAmt").val());
                }


                $("#supAllAmt").val(comma(Number(incomeAmt) + Number(locIncomeAmt)));
                $("#totAmt").val(comma(Number(supAmt) - Number(incomeAmt) - Number(locIncomeAmt)));
            } else {
                var supAmt = uncomma($("#supAmt").val());
                var vatAmt = uncomma($("#vatAmt").val());

                $("#incomeAmt").val(comma(Math.floor(Number(supAmt) * (Number(vatAmt) / 100))));
                var incomeAmt = uncomma($("#incomeAmt").val());

                $("#locIncomeAmt").val(comma(Math.floor(Number(incomeAmt) * (10 / 100))));
                var locIncomeAmt = uncomma($("#locIncomeAmt").val());

                $("#supAllAmt").val(comma(Number(incomeAmt) + Number(locIncomeAmt)));
                $("#totAmt").val(comma(Number(supAmt) - Number(incomeAmt) - Number(locIncomeAmt)))
            }
        });

        if($("#type").val() == "9"){
            $("#gubunTr").css("display", "");
            $("#vatAmt").val(20);
            var supAmt = uncomma($("#supAmt").val());
            var vatAmt = uncomma($("#vatAmt").val());
            var bustAmt = uncomma($("#bustAmt").val());

            if(supAmt > 125000){
                $("#incomeAmt").val(comma(Math.floor((Number(supAmt) - (Number(supAmt) * (Number(bustAmt) / 100))) * (Number(vatAmt) / 100) / 10) * 10));
                var incomeAmt = uncomma($("#incomeAmt").val());

                $("#locIncomeAmt").val(comma(Math.floor(Number(incomeAmt) * (10 / 100) / 10) * 10));
                var locIncomeAmt = uncomma($("#locIncomeAmt").val());
            } else {
                $("#incomeAmt").val(0);
                var incomeAmt = uncomma($("#incomeAmt").val());

                $("#locIncomeAmt").val(0);
                var locIncomeAmt = uncomma($("#locIncomeAmt").val());
            }


            $("#supAllAmt").val(comma(Number(incomeAmt) + Number(locIncomeAmt)));
            $("#totAmt").val(comma(Number(supAmt) - Number(incomeAmt) + Number(locIncomeAmt)));
        } else {
            var supAmt = uncomma($("#supAmt").val());
            var vatAmt = uncomma($("#vatAmt").val());

            $("#incomeAmt").val(comma(Math.floor(Number(supAmt) * (Number(vatAmt) / 100))));
            var incomeAmt = uncomma($("#incomeAmt").val());

            $("#locIncomeAmt").val(comma(Math.floor(Number(incomeAmt) * (10 / 100))));
            var locIncomeAmt = uncomma($("#locIncomeAmt").val());

            $("#supAllAmt").val(comma(Number(incomeAmt) + Number(locIncomeAmt)));
            $("#totAmt").val(comma(Number(supAmt) - Number(incomeAmt) + Number(locIncomeAmt)));

        }

    },

    fn_setData : function (){
        var sumAmt = Number(uncomma($("#supAllAmt").val())) + Number(uncomma($("#totAmt").val()));

        opener.parent.$("#supCost" + $("#index").val()).val($("#totAmt").val());
        opener.parent.$("#vatCost" + $("#index").val()).val($("#supAllAmt").val());
        opener.parent.$("#totCost" + $("#index").val()).val(comma(sumAmt));


        opener.parent.$("#expRate" + $("#index").val()).val($("#bustAmt").val());
        opener.parent.$("#taxRate" + $("#index").val()).val($("#vatAmt").val());

        opener.parent.$("#payAmt" + $("#index").val()).val($("#supAmt").val());
        opener.parent.$("#incTax" + $("#index").val()).val($("#incomeAmt").val());
        opener.parent.$("#locIncTax" + $("#index").val()).val($("#locIncomeAmt").val());
        opener.parent.$("#subAmt" + $("#index").val()).val($("#supAllAmt").val());
        opener.parent.$("#actPayAmt" + $("#index").val()).val($("#totAmt").val());

        if(opener.parent.regPay != null){
            opener.parent.regPay.fn_changeAllCost();
        }
        window.close();
    }
}