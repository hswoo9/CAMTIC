var trv = {


    fn_defaultScript: function(){
        customKendo.fn_datePicker("year", 'decade', "yyyy", new Date());

        var parameters = {
            baseYear : $("#year").val()
        }

        var rs = customKendo.fn_customAjax("/cam_achieve/getEmpRateValue", parameters);
        console.log(rs)
        var eRs = rs.list;
        var eLen = 0;

        var payRs = customKendo.fn_customAjax("/cam_achieve/getDeptPayrollList", parameters);
        var payList = payRs.list;
        console.log(payList)

        for(var i = 0; i < eRs.length; i++) {
            eLen += Number(eRs[i].CNT);
        }

        var aPay = 0;
        var aEmp = 0;
        var aInsPay = 0;
        var aRetirePay = 0;

        // 전담인력 계산식
        for(var i = 0; i < eRs.length; i++) {
            var item = eRs[i];

            $("td[name='team']").each(function() {

                if($(this).attr("id").toString().split("_")[1] == item.TEAM_SEQ &&
                    $(this).attr("id").toString().split("_")[0] == "tEmp") {
                    $(this).text(((item.CNT / eLen) * 100).toFixed(1));
                }

                if($(this).attr("id").toString().split("_")[1] == item.TEAM_SEQ &&
                    $(this).attr("id").toString().split("_")[0] == "tTotPay") {
                    var tPay = 0;
                    var tInsPay = 0;
                    var tRetirePay = 0;

                    for(var j = 0; j < payList.length; j++) {
                        if(payList[j].DEPT_SEQ == item.TEAM_SEQ) {
                            tPay += Number(payList[j].TOT_PAY || 0);
                            tInsPay += Number(payList[j].INS_TOT_PAY || 0);
                            tRetirePay += Number(payList[j].RETIRE_PAY || 0);
                        }
                    }

                    $(this).text(comma(tPay));
                    $(this).next().text(comma(tInsPay));
                    $(this).next().next().text(comma(tRetirePay));
                    $(this).next().next().next().text(comma(tPay + tInsPay + tRetirePay));
                }

            });

            $("td[name='dept']").each(function() {
                var dLen = 0;

                if($(this).attr("id").toString().split("_")[1] == item.DEPT_SEQ &&
                    $(this).attr("id").toString().split("_")[0] == "dEmp") {
                    for(var j = 0; j < eRs.length; j++) {
                        if(eRs[j].DEPT_SEQ == item.DEPT_SEQ) {
                            dLen += Number(eRs[j].CNT);
                        }
                    }
                    $(this).text(((dLen / eLen) * 100).toFixed(1));
                }

                if($(this).attr("id").toString().split("_")[1] == item.DEPT_SEQ &&
                    $(this).attr("id").toString().split("_")[0] == "dTotPay") {
                    var dPay = 0;
                    var dInsPay = 0;
                    var dRetirePay = 0;
                    for(var j = 0; j < payList.length; j++) {
                        if(payList[j].DEPT_SEQ == item.DEPT_SEQ
                            || payList[j].PRAENT_DEPT_SEQ == item.DEPT_SEQ) {
                            dPay += Number(payList[j].TOT_PAY || 0);
                            dInsPay += Number(payList[j].INS_TOT_PAY || 0);
                            dRetirePay += Number(payList[j].RETIRE_PAY || 0);
                        }
                    }
                    $(this).text(comma(dPay));
                    $(this).next().text(comma(dInsPay));
                    $(this).next().next().text(comma(dRetirePay));
                    $(this).next().next().next().text(comma(dPay + dInsPay + dRetirePay));

                    aPay += dPay;
                    aInsPay += dInsPay;
                    aRetirePay += dRetirePay;
                }
            });

            $("td[name='dept2']").each(function() {
                var dLen = 0;

                if($(this).attr("id").toString().split("_")[1] == item.DEPT_SEQ &&
                    $(this).attr("id").toString().split("_")[0] == "dEmp") {
                    for(var j = 0; j < eRs.length; j++) {
                        if(eRs[j].DEPT_SEQ == item.DEPT_SEQ) {
                            dLen += Number(eRs[j].CNT);
                        }
                    }
                    $(this).text(((dLen / eLen) * 100).toFixed(1));
                }

                if($(this).attr("id").toString().split("_")[1] == item.DEPT_SEQ &&
                    $(this).attr("id").toString().split("_")[0] == "dTotPay") {
                    var dPay = 0;
                    var dInsPay = 0;
                    var dRetirePay = 0;
                    for(var j = 0; j < payList.length; j++) {
                        if(payList[j].DEPT_SEQ == item.DEPT_SEQ
                            || payList[j].PRAENT_DEPT_SEQ == item.DEPT_SEQ) {
                            dPay += Number(payList[j].TOT_PAY || 0);
                            dInsPay += Number(payList[j].INS_TOT_PAY || 0);
                            dRetirePay += Number(payList[j].RETIRE_PAY || 0);
                        }
                    }
                    $(this).text(comma(dPay));
                    $(this).next().text(comma(dInsPay));
                    $(this).next().next().text(comma(dRetirePay));
                    $(this).next().next().next().text(comma(dPay + dInsPay + dRetirePay));

                    aPay += dPay;
                    aInsPay += dInsPay;
                    aRetirePay += dRetirePay;
                }
            });
        }

        $("td[name='dept']").each(function(){
            if($(this).attr("id").toString().split("_")[0] == "dEmp") {
                aEmp += Number($(this).text());
            }

            if($(this).attr("id").toString().split("_")[0] == "dPay") {
                aPay += Number($(this).text());
            }
        });

        $("#emp_all").text(aEmp.toFixed(1));
        $("#totPay_all").text(comma(aPay));
        $("#insPay_all").text(comma(aInsPay));
        $("#retirePay_all").text(comma(aRetirePay));
        $("#payTotal_all").text(comma(aPay + aInsPay + aRetirePay));

        $("#emp").text(comma(Number($("#emp_all").text()) + Number($("#dEmp_1219").text())));
        $("#totPay").text(comma(Number(uncomma($("#totPay_all").text())) + Number(uncomma($("#dTotPay_1219").text()))));
        $("#insPay").text(comma(Number(uncomma($("#insPay_all").text())) + Number(uncomma($("#dInsPay_1219").text()))));
        $("#retirePay").text(comma(Number(uncomma($("#retirePay_all").text())) + Number(uncomma($("#dRetirePay_1219").text()))));
        $("#payTotal").text(comma(Number(uncomma($("#payTotal_all").text())) + Number(uncomma($("#dPayTotal_1219").text()))));
    },


}



function comma(str) {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}

function uncomma(str) {
    str = String(str);
    return str.replace(/[^\d]+/g, '');
}