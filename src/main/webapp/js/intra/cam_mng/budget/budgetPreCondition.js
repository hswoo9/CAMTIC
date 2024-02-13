var bdgPreCon = {

    global : {

    },

    fn_defaultScript: function (){

        customKendo.fn_datePicker("baseYear", "decade", "yyyy", new Date());

        $("#baseYear").change(function (){
            bdgPreCon.fn_calcBudgetPreCondition();
            bdgPreCon.fn_calcBudgetDetail();
        });

        bdgPreCon.fn_calcBudgetPreCondition();
        bdgPreCon.fn_calcBudgetDetail();
    },

    fn_calcBudgetPreCondition : function (){
        var data = {
            baseYear : $("#baseYear").val()
        }

        var result = customKendo.fn_customAjax("/budget/getPreCondition", data);
        var lsA = result.listA;
        var lsB = result.listB

        var sumA1 = 0;
        var sumA2 = 0;
        var sumA3 = 0;
        var sumB1 = 0;
        var sumB2 = 0;
        var sumB3 = 0;

        if(lsA.length == 0) {
            bdgPreCon.fn_resetA();
        }

        if(lsB.length == 0) {
            bdgPreCon.fn_resetB();
        }
        for(var i = 0; i < lsA.length; i++) {
            var item = lsA[i];
            item.SUM_BUDGET_AMT = item.SUM_BUDGET_AMT ? item.SUM_BUDGET_AMT : 0;
            item.SUM_EXNP_AMT = item.SUM_EXNP_AMT ? item.SUM_EXNP_AMT : 0;
            item.BUDGET_AMT = item.BUDGET_AMT ? item.BUDGET_AMT : 0;

            sumA1 += item.SUM_BUDGET_AMT;
            sumA2 += item.SUM_EXNP_AMT;
            sumA3 += item.BUDGET_AMT;

            if(item.PJT_CLASS == "M"){
                $("#MA1").text(comma(item.SUM_BUDGET_AMT));
                $("#MA2").text(comma(item.SUM_EXNP_AMT));
                $("#MA3").text(comma(item.BUDGET_AMT));
            } else if (item.PJT_CLASS == "R") {
                $("#RA1").text(comma(item.SUM_BUDGET_AMT));
                $("#RA2").text(comma(item.SUM_EXNP_AMT));
                $("#RA3").text(comma(item.BUDGET_AMT));
            } else if (item.PJT_CLASS == "S") {
                $("#SA1").text(comma(item.SUM_BUDGET_AMT));
                $("#SA2").text(comma(item.SUM_EXNP_AMT));
                $("#SA3").text(comma(item.BUDGET_AMT));
            } else if (item.PJT_CLASS == "V") {
                $("#VA1").text(comma(item.SUM_BUDGET_AMT));
                $("#VA2").text(comma(item.SUM_EXNP_AMT));
                $("#VA3").text(comma(item.BUDGET_AMT));
            } else if (item.PJT_CLASS == "D") {
                $("#DA1").text(comma(item.SUM_BUDGET_AMT));
                $("#DA2").text(comma(item.SUM_EXNP_AMT));
                $("#DA3").text(comma(item.BUDGET_AMT));
            }
        }

        for(var i = 0; i < lsB.length; i++) {
            var item = lsB[i];
            item.SUM_BUDGET_AMT = item.SUM_BUDGET_AMT ? item.SUM_BUDGET_AMT : 0;
            item.SUM_EXNP_AMT = item.SUM_EXNP_AMT ? item.SUM_EXNP_AMT : 0;
            item.BUDGET_AMT = item.BUDGET_AMT ? item.BUDGET_AMT : 0;

            sumB1 += item.SUM_BUDGET_AMT;
            sumB2 += item.SUM_EXNP_AMT;
            sumB3 += item.BUDGET_AMT;

            if(item.PJT_CLASS == "M"){
                $("#MB1").text(comma(item.SUM_BUDGET_AMT));
                $("#MB2").text(comma(item.SUM_EXNP_AMT));
                $("#MB3").text(comma(item.BUDGET_AMT));
            } else if (item.PJT_CLASS == "R") {
                $("#RB1").text(comma(item.SUM_BUDGET_AMT));
                $("#RB2").text(comma(item.SUM_EXNP_AMT));
                $("#RB3").text(comma(item.BUDGET_AMT));
            } else if (item.PJT_CLASS == "S") {
                $("#SB1").text(comma(item.SUM_BUDGET_AMT));
                $("#SB2").text(comma(item.SUM_EXNP_AMT));
                $("#SB3").text(comma(item.BUDGET_AMT));
            } else if (item.PJT_CLASS == "V") {
                $("#VB1").text(comma(item.SUM_BUDGET_AMT));
                $("#VB2").text(comma(item.SUM_EXNP_AMT));
                $("#VB3").text(comma(item.BUDGET_AMT));
            } else if (item.PJT_CLASS == "D") {
                $("#DB1").text(comma(item.SUM_BUDGET_AMT));
                $("#DB2").text(comma(item.SUM_EXNP_AMT));
                $("#DB3").text(comma(item.BUDGET_AMT));
            }
        }

        $("#sumA1").text(comma(sumA1));
        $("#sumA2").text(comma(sumA2));
        $("#sumA3").text(comma(sumA3));
        $("#sumB1").text(comma(sumB1));
        $("#sumB2").text(comma(sumB2));
        $("#sumB3").text(comma(sumB3));
    },

    fn_calcBudgetDetail : function(){
        var data = {
            baseYear : $("#baseYear").val()
        }

        var result = customKendo.fn_customAjax("/budget/getBudgetDetail", data);

        console.log(result);
    },



    fn_resetA : function(){
        $("#MA1").text(0);
        $("#MA2").text(0);
        $("#MA3").text(0);
        $("#RA1").text(0);
        $("#RA2").text(0);
        $("#RA3").text(0);
        $("#SA1").text(0);
        $("#SA2").text(0);
        $("#SA3").text(0);
        $("#VA1").text(0);
        $("#VA2").text(0);
        $("#VA3").text(0);
        $("#DA1").text(0);
        $("#DA2").text(0);
        $("#DA3").text(0);
    },

    fn_resetB : function (){
        $("#MB1").text(0);
        $("#MB2").text(0);
        $("#MB3").text(0);
        $("#RB1").text(0);
        $("#RB2").text(0);
        $("#RB3").text(0);
        $("#SB1").text(0);
        $("#SB2").text(0);
        $("#SB3").text(0);
        $("#VB1").text(0);
        $("#VB2").text(0);
        $("#VB3").text(0);
        $("#DB1").text(0);
        $("#DB2").text(0);
        $("#DB3").text(0);
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