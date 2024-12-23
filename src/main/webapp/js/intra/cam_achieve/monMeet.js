var monMeet = {

    global: {
        rsList: [],
        objLs: [],
    },


    fn_DefaultScript : function(){

        customKendo.fn_datePicker("year", "decade", "yyyy", new Date());

        monMeet.fn_dataReset();

        // $("#year").change(function (){
        //     monMeet.fn_dataReset();
        // });
    },

    fn_dataReset : function() {

        $("td[name='delvObj']").text("0");
        $("td[name='delvAch']").text("0");
        $("td[name='delvExp']").text("0");
        $("td[name='delvSum']").text("0");
        $("td[name='delvPer']").text("0");

        $("td[name='saleObj']").text("0");
        $("td[name='saleAch']").text("0");
        $("td[name='saleExp']").text("0");
        $("td[name='saleSum']").text("0");
        $("td[name='salePer']").text("0");

        $("td[name='incpObj']").text("0");
        $("td[name='incpAch']").text("0");
        $("td[name='incpExp']").text("0");
        $("td[name='incpSum']").text("0");
        $("td[name='incpPer']").text("0");

        monMeet.fn_searchData();
    },

    fn_searchData(){

        let date = new Date($("#year").val().split("-")[0], $("#year").val().split("-")[1], 0);
        var parameters = {
            year : $("#year").val().split("-")[0],
            baseYear : $("#year").val().split("-")[0],
            startDt : $("#year").val().split("-")[0] + "-01-01",
            endDt : $("#year").val() + "-" + date.getDate(),
            pjtYear : $("#year").val().split("-")[0],
            deptLevel: "1",
            record : "Y"
        }

        $.ajax({
            url : "/cam_achieve/getDeptProjectCostCalcList",
            data : parameters,
            type : "post",
            dataType : "json",
            beforeSend : function(){
                $("#my-spinner").show();
            },
            success : function(rs) {
                console.log(rs.data);

                monMeet.global.rsList = rs.data;
                monMeet.global.objLs = rs.objLs;

                monMeet.fn_dataCalc();
            }
        })
    },

    fn_dataCalc : function(){

        let delvObj = 0;        // 수주목표
        let saleObj = 0;        // 달성목표
        let incpObj = 0;        // 운영수익목표

        let delvTotAmt = 0;      // 수주금액
        let saleTotAmt = 0;      // 매출액
        let incpTotAmt = 0;      // 운영수익

        let expDelvTotAmt = 0;   // 예상수주금액
        let expSaleTotAmt = 0;   // 예상매출액
        let expIncpTotAmt = 0;   // 예상운영수익


        for(let i=0; i<monMeet.global.rsList.length; i++){

            let tempDelvTotAmt = 0;      // 수주금액
            let tempSaleTotAmt = 0;      // 매출액
            let tempIncpTotAmt = 0;      // 운영수익

            let tempExpDelvTotAmt = 0;   // 예상수주금액
            let tempExpSaleTotAmt = 0;   // 예상매출액
            let tempExpIncpTotAmt = 0;   // 예상운영수익

            for(let j=0; j<monMeet.global.rsList[i].deptAch.length; j++) {

                const e = monMeet.global.rsList[i].deptAch[j];

                /** 수주 달성 */
                tempDelvTotAmt += costCalc.allPjtAmt(e);

                /** 수주 예상 */
                if(e.PJT_STEP == "R" && e.PJT_STOP == "N") {
                    tempExpDelvTotAmt += Number(e.PJT_EXP_AMT || 0);
                }

                /** 매출 달성 */
                tempSaleTotAmt += costCalc.resSaleAmt(e);

                /** 매출 예상 */
                tempExpSaleTotAmt += costCalc.devSaleAmt(e);

                /** 운영수익 달성 */
                tempIncpTotAmt += costCalc.resProfitAmt(e);

                /** 운영수익 예상 */
                tempExpIncpTotAmt += costCalc.devProfitAmt(e);
            }

            /** 수주 달성 */
            delvTotAmt += (Math.floor(tempDelvTotAmt / 1000000) || 0);
            /** 매출 달성 */
            saleTotAmt += (Math.floor(tempSaleTotAmt / 1000000) || 0);
            /** 운영수익 달성 */
            incpTotAmt += (Math.floor(tempIncpTotAmt / 1000000) || 0);

            /** 수주 예상 */
            expDelvTotAmt += (Math.floor(tempExpDelvTotAmt / 1000000) || 0);
            /** 매출 예상 */
            expSaleTotAmt += (Math.floor(tempExpSaleTotAmt / 1000000) || 0);
            /** 운영수익 예상 */
            expIncpTotAmt += (Math.floor(tempExpIncpTotAmt / 1000000) || 0);

            /** 목표 */
            delvObj += (Math.floor( monMeet.global.rsList[i].deptObj[0].DELV_OBJ / 1000000) || 0);
            saleObj += (Math.floor( monMeet.global.rsList[i].deptObj[0].SALE_OBJ / 1000000) || 0);
            incpObj += (Math.floor( monMeet.global.rsList[i].deptObj[0].INCP_OBJ / 1000000) || 0);

        }

        /** 수주 목표 */
        $("#delvObj").text(comma(delvObj));
        /** 수주 달성 */
        $("#delvAch").text(comma(delvTotAmt));
        /** 수주 예상 */
        $("#delvExp").text(comma(expDelvTotAmt));
        /** 수주 합계 */
        $("#delvSum").text(comma(Number(uncommaN($("#delvAch").text())) + Number(uncommaN($("#delvExp").text()))));

        /** 매출 목표 */
        $("#saleObj").text(comma(saleObj));
        /** 매출 달성 */
        $("#saleAch").text(comma(saleTotAmt));
        /** 매출 예상 */
        $("#saleExp").text(comma(expSaleTotAmt));
        /** 매출 합계 */
        $("#saleSum").text(comma(Number(uncommaN($("#saleAch").text())) + Number(uncommaN($("#saleExp").text()))));

        /** 운영수익 목표 */
        $("#incpObj").text(comma(incpObj));
        /** 운영수익 달성 */
        $("#incpAch").text(comma(incpTotAmt));
        /** 운영수익 예상 */
        $("#incpExp").text(comma(expIncpTotAmt));
        /** 운영수익 합계 */
        $("#incpSum").text(comma(Number(uncommaN($("#incpAch").text())) + Number(uncommaN($("#incpExp").text()))));

        monMeet.fn_calcPercent();

        $("#my-spinner").hide();
    },

    fn_calcPercent : function(){

        /** 수주  */
        var delvObj = Number(uncommaN($("#delvObj").text()));
        var delvSum = Number(uncommaN($("#delvSum").text()));

        if(delvObj == 0 || delvSum == 0){
            $("#delvPer").text("0 %");
        } else {
            $("#delvPer").text( Math.round((delvSum / delvObj * 100) * 10) / 10 + " %" );
        }

        /** 매출  */
        var saleObj = Number(uncommaN($("#saleObj").text()));
        var saleSum = Number(uncommaN($("#saleSum").text()));

        if(saleObj == 0 || saleSum == 0){
            $("#salePer").text("0 %");
        } else {
            $("#salePer").text( Math.round((saleSum / saleObj * 100) * 10) / 10 + " %" );
        }

        /** 운영수익  */
        var incpObj = Number(uncommaN($("#incpObj").text()));
        var incpSum = Number(uncommaN($("#incpSum").text()));

        if(incpObj == 0 || incpSum == 0){
            $("#incpPer").text("0 %");
        } else {
            $("#incpPer").text( Math.round((incpSum / incpObj * 100) * 10) / 10 + " %" );
        }
    },
}

function comma(str) {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}