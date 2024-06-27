var trv = {


    fn_defaultScript: function(){
        customKendo.fn_datePicker("year", 'year', "yyyy-MM", new Date());

        trv.fn_searchData();

        $("#year").change(function (){
            trv.fn_searchData();
        })
    },

    fn_searchData : function(){
        var date = new Date($("#year").val().split("-")[0], $("#year").val().split("-")[1], 0);
        var parameters = {
            baseYear : $("#year").val(),
            startDt : $("#year").val().split("-")[0] + "-01-01",
            endDt : $("#year").val() + "-" + date.getDate()
        }

        var rs = customKendo.fn_customAjax("/cam_achieve/getEmpRateValue", parameters);
        console.log(rs)
        var eRs = rs.list;
        var eLen = 0;

        var payRs = customKendo.fn_customAjax("/cam_achieve/getDeptPayrollListForTotRate", parameters);
        var payList = payRs.list;
        console.log(payList);

        // 자체경비
        var exnpRs =  customKendo.fn_customAjax("/cam_achieve/getExnpListForTotRate", parameters);
        var exnpLs = exnpRs.list;

        for(var i = 0; i < eRs.length; i++) {
            eLen += Number(eRs[i].CNT);
        }

        var aPay = 0;
        var aEmp = 0;
        var aInsPay = 0;
        var aRetirePay = 0;

        let aExnpPay = 0;
        let aExceptPay = 0;

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

                // 자체경비
                if($(this).attr("id").toString().split("_")[1] == item.TEAM_SEQ &&
                    $(this).attr("id").toString().split("_")[0] == "tExnpPay") {
                    var tExnpPay = 0;
                    var tExceptPay = 0;

                    for(var j = 0; j < exnpLs.length; j++) {
                        if(exnpLs[j].TEAM_SEQ == item.TEAM_SEQ) {
                            tExnpPay += Number(exnpLs[j].TOT_COST || 0);
                            tExceptPay += Number(exnpLs[j].EXCEPT_PAY || 0);
                        }
                    }

                    $(this).text(comma(tExnpPay));
                    $(this).next().text(comma(tExceptPay));
                    $(this).next().next().text(comma(tExnpPay + tExceptPay));
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

                // 자체경비
                if($(this).attr("id").toString().split("_")[1] == item.DEPT_SEQ &&
                    $(this).attr("id").toString().split("_")[0] == "dExnpPay") {
                    var dExnpPay = 0;
                    var dExceptPay = 0;

                    for(var j = 0; j < exnpLs.length; j++) {
                        if(exnpLs[j].TEAM_SEQ == item.DEPT_SEQ || exnpLs[j].PARENT_DEPT_SEQ == item.DEPT_SEQ) {
                            dExnpPay += Number(exnpLs[j].TOT_COST || 0);
                            dExceptPay += Number(exnpLs[j].EXCEPT_PAY || 0);
                        }
                    }

                    $(this).text(comma(dExnpPay));
                    $(this).next().text(comma(dExceptPay));
                    $(this).next().next().text(comma(dExnpPay + dExceptPay));
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

                // 자체경비
                if($(this).attr("id").toString().split("_")[1] == item.DEPT_SEQ &&
                    $(this).attr("id").toString().split("_")[0] == "dExnpPay") {
                    var dExnpPay = 0;
                    var dExceptPay = 0;

                    for(var j = 0; j < exnpLs.length; j++) {
                        if(exnpLs[j].TEAM_SEQ == item.DEPT_SEQ || exnpLs[j].PARENT_DEPT_SEQ == item.DEPT_SEQ) {
                            dExnpPay += Number(exnpLs[j].TOT_COST || 0);
                            dExceptPay += Number(exnpLs[j].EXCEPT_PAY || 0);
                        }
                    }

                    $(this).text(comma(dExnpPay));
                    $(this).next().text(comma(dExceptPay));
                    $(this).next().next().text(comma(dExnpPay + dExceptPay));
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

            if($(this).attr("id").toString().split("_")[0] == "dExnpPay") {
                aExnpPay += Number(uncomma($(this).text()));
                aExceptPay += Number(uncomma($(this).next().text()));
            }
        });

        $("#emp_all").text(aEmp.toFixed(1));
        $("#totPay_all").text(comma(aPay));
        $("#insPay_all").text(comma(aInsPay));
        $("#retirePay_all").text(comma(aRetirePay));
        $("#payTotal_all").text(comma(aPay + aInsPay + aRetirePay));
        $("#exnpPay_all").text(comma(aExnpPay));
        $("#exnpPay_all").next().text(comma(aExceptPay));
        $("#exnpPay_all").next().next().text(comma(aExnpPay + aExceptPay));

        $("#emp").text(comma(Number($("#emp_all").text()) + Number($("#dEmp_1219").text())));
        $("#totPay").text(comma(Number(uncomma($("#totPay_all").text())) + Number(uncomma($("#dTotPay_1219").text()))));
        $("#insPay").text(comma(Number(uncomma($("#insPay_all").text())) + Number(uncomma($("#dInsPay_1219").text()))));
        $("#retirePay").text(comma(Number(uncomma($("#retirePay_all").text())) + Number(uncomma($("#dRetirePay_1219").text()))));
        $("#payTotal").text(comma(Number(uncomma($("#payTotal_all").text())) + Number(uncomma($("#dPayTotal_1219").text()))));
        $("#exnpPay").text(comma(Number(uncomma($("#exnpPay_all").text())) + Number(uncomma($("#dExnpPay_1219").text()))));
        $("#exnpPay").next().text(comma(Number(uncomma($("#exnpPay_all").next().text())) + Number(uncomma($("#dExnpPay_1219").next().text()))));
        $("#exnpPay").next().next().text(comma(Number(uncomma($("#exnpPay_all").next().next().text())) + Number(uncomma($("#dExnpPay_1219").next().next().text()))));


        /** 공통비 배분율 */
        let payTotal1204 = Number(uncommaN($("#tPayTotal_1204").text()));
        let payTotal1205 = Number(uncommaN($("#tPayTotal_1205").text()));
        let allPayTotal = Number(uncommaN($("#payTotal_all").text()));

        $(".tPubRate").each(function(){
            let deptSeq = $(this).attr("id").split("_")[1];
            let teamPayTotal = Number(uncommaN($("#tPayTotal_" + deptSeq).text()));

            if(allPayTotal == 0 || teamPayTotal == 0){
                $(this).text(0 + " %");
            } else {
                $(this).text(Math.round((teamPayTotal / (allPayTotal - payTotal1204 - payTotal1205) * 100) * 10) / 10 + " %");
            }

        })


        /** 공통경비 */
        let payTotal1219 = Number(uncommaN($("#dPayTotal_1219").text()));
        let exnpPay1219 = Number(uncommaN($("#dExnpPay_1219").next().next().text()));

        $(".tCommPay").each(function(){
            let deptSeq = $(this).attr("id").split("_")[1];
            let tPubRate = Number($("#tPubRate_" + deptSeq).text().split(" %")[0]);

            $(this).text(comma(Math.round((payTotal1219 + exnpPay1219) * tPubRate)));
        })

        let commPayAll = 0;
        $(".dCommPay").each(function(){
            let deptSeq = $(this).attr("id").split("_")[1];
            let commPay = 0;

            $(".dept_" + deptSeq).each(function(){
                commPay += Number(uncommaN($(this).find(".tCommPay" ).text()));
            })

            commPayAll += commPay;
            $(this).text(comma(Math.round(commPay)));
        })
        $("#commPay_all, #commPay").text(comma(Math.round(commPayAll)));

        /** 비용합계 */
        $(".tTotalPay").each(function(){
            let deptSeq = $(this).attr("id").split("_")[1];
            let totalPay = 0;

            totalPay += Number(uncommaN($("#tPayTotal_" + deptSeq).text()));
            totalPay += Number(uncommaN($("#tCommPay_" + deptSeq).prev().text()));
            totalPay += Number(uncommaN($("#tCommPay_" + deptSeq).text()));


            $(this).text(comma(Math.round(totalPay)));
        })

        let totalPayall = 0;
        $(".dTotalPay").each(function(){
            let deptSeq = $(this).attr("id").split("_")[1];
            let totalPay = 0;

            $(".dept_" + deptSeq).each(function(){
                totalPay += Number(uncommaN($(this).find(".tTotalPay" ).text()));
            })

            totalPayall += totalPay;
            $(this).text(comma(Math.round(totalPay)));
        })
        $("#totalPay_all, #totalPay").text(comma(Math.round(totalPayall)));

    },


    fn_saveData : function(){
        if(!confirm("저장하시겠습니까?")){
            return;
        }

        var rateArr = [];
        $.each($(".rateTr"), function(i, v){
            var item = {
                baseYear : $("#year").val(),
                deptSeq : $(this).attr("name"),
                personnelInCharge : $(this).find(".tEmp").text(),
                commonRate : $(this).find(".tPubRate").text(),
                personnelExpenses : uncommaN($(this).find(".tTotPay").text()),
                fourInsurance : uncommaN($(this).find(".tInsPay").text()),
                retirementPension : uncommaN($(this).find(".tRetirePay").text()),
                personnelTotal : uncommaN($(this).find(".tRetirePay").next().text()),
                directPay : uncommaN($(this).find(".tExnpPay").text()),
                exceptPay :uncommaN( $(this).find(".tExnpPay").next().text()),
                selfPayTotal : uncommaN($(this).find(".tExnpPay").next().next().text()),
                commonExpenses : uncommaN($(this).find(".tExnpPay").next().next().next().text()),
                personnelExpensesTotal : uncommaN($(this).find(".tExnpPay").next().next().next().next().text()),
            };

            rateArr.push(item);
        });

        var data = {
            rateArr : JSON.stringify(rateArr),
        }

        $.ajax({
            url : "/cam_achieve/insDeptExpenseRateValue",
            data : data,
            type : "post",
            dataType : "json",
            async : false,
            success : function(rs){
                if(rs.code == 200){
                    alert("저장되었습니다.");
                }
            }
        });
    },

    fn_updStatus : function(){
        if(!confirm("취소하시겠습니까?")){
            return;
        }

        var data = {
            baseYear : $("#year").val(),
        }

        $.ajax({
            url : "/cam_achieve/updDeptExpenseRateStatus",
            data : data,
            type : "post",
            dataType : "json",
            async : false,
            success : function(rs){
                if(rs.code == 200){
                    alert("취소되었습니다.");
                }
            }
        });
    }

}



function comma(str) {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}

function uncomma(str) {
    str = String(str);
    return str.replace(/[^\d]+/g, '');
}