var weekMeet = {


    fn_DefaultScript : function(){

        customKendo.fn_datePicker("year", "year", "yyyy-MM", new Date());

        weekMeet.fn_dataReset();

        $("#year").change(function (){
            weekMeet.fn_dataReset();
        });
    },

    fn_dataReset : function() {

        $("td[name='delvObj']").text("0");
        $("td[name='delvAch']").text("0");
        $("td[name='delvAchPer']").text("0");
        $("td[name='delvExp']").text("0");
        $("td[name='delvExpPer']").text("0");
        $("td[name='delvSum']").text("0");
        $("td[name='delvSumPer']").text("0");
        $("td[name='saleObj']").text("0");
        $("td[name='saleAch']").text("0");
        $("td[name='saleAchPer']").text("0");
        $("td[name='saleExp']").text("0");
        $("td[name='saleExpPer']").text("0");
        $("td[name='saleSum']").text("0");
        $("td[name='saleSumPer']").text("0");
        $("td[name='incpObj']").text("0");
        $("td[name='incpAch']").text("0");
        $("td[name='incpAchPer']").text("0");
        $("td[name='incpExp']").text("0");
        $("td[name='incpExpPer']").text("0");
        $("td[name='incpSum']").text("0");
        $("td[name='incpSumPer']").text("0");

        weekMeet.fn_searchData();
    },

    fn_searchData : function(){
        var date = new Date($("#year").val().split("-")[0], $("#year").val().split("-")[1], 0);
        var parameters = {
            year : $("#year").val().split("-")[0],
            startDt : $("#year").val().split("-")[0] + "-01-01",
            endDt : $("#year").val() + "-" + date.getDate(),
            // deptLevel: 1
        }

        var rs = customKendo.fn_customAjax("/cam_achieve/getEngnDeptData", parameters);

        console.log(rs);
        var ls = rs.ls;
        var engnSaleList = rs.saleLs.engnSaleList;      // 민간사업 매출
        var rndSaleList = rs.saleLs.rndSaleList;        // 정부사업 매출
        var objList = rs.objLs;                         // 목표

        var engnEstList = rs.incpLs.engnEstList;            // 민간사업 투자금액
        var engnPurcList = rs.incpLs.engnPurcList;          // 민간사업 구매
        var engnBustripList = rs.incpLs.engnBustripList;    // 민간사업 출장
        var rndIncpList = rs.incpLs.rndIncpList;            // 정부사업 수익

        var delvObjTotal = 0;       // 수주목표 총계
        var delvAchTotal = 0;       // 수주달성 총계
        var delvExpTotal = 0;       // 수주예상 총계
        var delvSumTotal = 0;       // 수주합계 총계

        var saleObjTotal = 0;       // 매출목표 총계
        var saleAchTotal = 0;       // 매출달성 총계
        var saleExpTotal = 0;       // 매출예상 총계
        var saleSumTotal = 0;       // 매출합계 총계

        var incpObjTotal = 0;       // 운영수익목표 총계
        var incpAchTotal = 0;       // 운영수익달성 총계
        var incpExpTotal = 0;       // 운영수익예상 총계
        var incpSumTotal = 0;       // 운영수익합계 총계

        for(var i = 0 ; i < ls.length ; i++){

            /** 수주 목표 */
            $("td[name='delvObj']").each(function() {
                if ($(this).attr("id").split("_")[1] == ls[i].DEPT_SEQ) {
                    for (var j = 0; j < objList.length; j++) {
                        if ($(this).attr("id").split("_")[1] == objList[j].dept_seq) {
                            $(this).text(comma(Math.floor(objList[j].DELV_OBJ / 1000000) || 0));
                            delvObjTotal += Math.floor(objList[j].DELV_OBJ / 1000000) || 0;
                        }
                    }
                }
            });

            /** 수주 달성 */
            $("td[name='delvAch']").each(function(){
                if($(this).attr("id").split("_")[1] == ls[i].DEPT_SEQ){
                    $(this).text(comma((Math.floor(ls[i].PJT_AMT / 1000000) || 0)));
                    delvAchTotal += Math.floor(ls[i].PJT_AMT / 1000000) || 0;
                }
            });

            /** 수주 예상 */
            $("td[name='delvExp']").each(function(){
                if($(this).attr("id").split("_")[1] == ls[i].DEPT_SEQ){
                    $(this).text(comma((Math.floor((ls[i].EXP_AMT + ls[i].EXP_AMT2) / 1000000) || 0)));
                    delvExpTotal += Math.floor((ls[i].EXP_AMT + ls[i].EXP_AMT2) / 1000000) || 0;
                }
            });

            /** 수주 합계 */
            $("td[name='delvSum']").each(function(){
                if($(this).attr("id").split("_")[1] == ls[i].DEPT_SEQ){
                    $(this).text(comma((Math.floor((ls[i].PJT_AMT + (ls[i].EXP_AMT + ls[i].EXP_AMT2)) / 1000000) || 0)));
                    delvSumTotal += Math.floor((ls[i].PJT_AMT + (ls[i].EXP_AMT + ls[i].EXP_AMT2)) / 1000000) || 0;
                }
            });


            /** 매출 목표 */
            $("td[name='saleObj']").each(function() {
                if ($(this).attr("id").split("_")[1] == ls[i].DEPT_SEQ) {
                    for (var j = 0; j < objList.length; j++) {
                        if ($(this).attr("id").split("_")[1] == objList[j].dept_seq) {
                            $(this).text(comma(Math.floor(objList[j].SALE_OBJ / 1000000) || 0));
                            saleObjTotal += Math.floor(objList[j].SALE_OBJ / 1000000) || 0;
                        }
                    }
                }
            });

            /** 매출 달성 */
            $("td[name='saleAch']").each(function(){
                if($(this).attr("id").split("_")[1] == ls[i].DEPT_SEQ){
                    var saleEngnAchSum = 0;
                    var saleRndAchSum = 0;

                    for(var j = 0 ; j < engnSaleList.length ; j++){
                        if($(this).attr("id").split("_")[1] == engnSaleList[j].DEPT_SEQ){
                            saleEngnAchSum += engnSaleList[j].PJT_AMT;
                        }
                    }

                    for(var j = 0 ; j < rndSaleList.length ; j++){
                        if($(this).attr("id").split("_")[1] == rndSaleList[j].DEPT_SEQ){
                            saleRndAchSum += rndSaleList[j].PJT_AMT;
                        }
                    }

                    $(this).text(comma((Math.floor((ls[i].PJT_AMT + (saleEngnAchSum || 0) + (saleRndAchSum || 0)) / 1000000)) || 0));
                    saleAchTotal += Math.floor((ls[i].PJT_AMT + (saleEngnAchSum || 0) + (saleRndAchSum || 0)) / 1000000) || 0;

                    /** 매출 합계 */
                    $("#saleSum_" + ls[i].DEPT_SEQ).text(comma((Math.floor((Number(uncomma($("#saleSum_" + ls[i].DEPT_SEQ).text()))) + (ls[i].PJT_AMT + (saleEngnAchSum || 0) + (saleRndAchSum || 0)) / 1000000)) || 0));
                    saleSumTotal += Math.floor((Number(uncomma($("#saleSum_" + ls[i].DEPT_SEQ).text()))) + (ls[i].PJT_AMT + (saleEngnAchSum || 0) + (saleRndAchSum || 0)) / 1000000) || 0;
                }
            });

            /** 매출 예상 */
            $("td[name='saleExp']").each(function() {
                if ($(this).attr("id").split("_")[1] == ls[i].DEPT_SEQ) {
                    var saleEngnExpSum = 0;
                    var saleRndExpSum = 0;

                    for (var j = 0; j < engnSaleList.length; j++) {
                        if ($(this).attr("id").split("_")[1] == engnSaleList[j].DEPT_SEQ) {
                            saleEngnExpSum += engnSaleList[j].PJT_AMT;
                        }
                    }

                    for (var j = 0; j < rndSaleList.length; j++) {
                        if ($(this).attr("id").split("_")[1] == rndSaleList[j].DEPT_SEQ) {
                            saleRndExpSum += rndSaleList[j].PJT_AMT;
                        }
                    }

                    $(this).text(comma((Math.floor((ls[i].PJT_AMT + (saleEngnExpSum || 0) + (ls[i].PJT_AMT - (saleRndExpSum || 0))) / 1000000)) || 0));
                    saleExpTotal += Math.floor((ls[i].PJT_AMT + (saleEngnExpSum || 0) + (ls[i].PJT_AMT - (saleRndExpSum || 0))) / 1000000) || 0;

                    /** 매출 합계 */
                    $("#saleSum_" + ls[i].DEPT_SEQ).text(comma((Math.floor((Number(uncomma($("#saleSum_" + ls[i].DEPT_SEQ).text()))) + (ls[i].PJT_AMT + (saleEngnExpSum || 0) + (ls[i].PJT_AMT - (saleRndExpSum || 0))) / 1000000)) || 0));
                    saleSumTotal += Math.floor((Number(uncomma($("#saleSum_" + ls[i].DEPT_SEQ).text()))) + (ls[i].PJT_AMT + (saleEngnExpSum || 0) + (ls[i].PJT_AMT - (saleRndExpSum || 0))) / 1000000) || 0;
                }
            });


            /** 운영수익 목표 */
            $("td[name='incpObj']").each(function() {
                if ($(this).attr("id").split("_")[1] == ls[i].DEPT_SEQ) {
                    for (var j = 0; j < objList.length; j++) {
                        if ($(this).attr("id").split("_")[1] == objList[j].dept_seq) {
                            $(this).text(comma(Math.floor(objList[j].INCP_OBJ / 1000000) || 0));
                            incpObjTotal += Math.floor(objList[j].INCP_OBJ / 1000000) || 0;
                        }
                    }
                }
            });

            /** 운영수익 달성 */
            $("td[name='incpAch']").each(function() {
                if ($(this).attr("id").split("_")[1] == ls[i].DEPT_SEQ) {
                    var purcEngnSum = 0;
                    var bustripEngnSum = 0;
                    var incpRndAchSum = 0;

                    var saleEngnAchSum = 0;

                    for(var j = 0 ; j < engnSaleList.length ; j++){
                        if($(this).attr("id").split("_")[1] == engnSaleList[j].DEPT_SEQ){
                            saleEngnAchSum += engnSaleList[j].PJT_AMT;
                        }
                    }

                    for(var j = 0 ; j < engnPurcList.length ; j++){
                        if($(this).attr("id").split("_")[1] == engnPurcList[j].DEPT_SEQ){
                            purcEngnSum += engnPurcList[j].PURC_EXNP_AMT;
                        }
                    }

                    for(var j = 0 ; j < engnBustripList.length ; j++){
                        if($(this).attr("id").split("_")[1] == engnBustripList[j].DEPT_SEQ){
                            bustripEngnSum += engnBustripList[j].BUSTRIP_EXNP_AMT;
                        }
                    }

                    for(var j = 0 ; j < rndIncpList.length ; j++){
                        if($(this).attr("id").split("_")[1] == rndIncpList[j].DEPT_SEQ){
                            incpRndAchSum += rndIncpList[j].TOT_COST;
                        }
                    }

                    var engnSaleSum = (ls[i].PJT_AMT + (saleEngnAchSum || 0));
                    var engnIncpSum = (purcEngnSum || 0) + (bustripEngnSum || 0);
                    var rndIncpSum = (incpRndAchSum || 0);

                    $(this).text(comma((Math.floor((engnSaleSum - engnIncpSum + rndIncpSum) / 1000000)) || 0));
                    incpAchTotal += Math.floor((engnSaleSum - engnIncpSum + rndIncpSum) / 1000000) || 0;

                    /** 운영수익 합계 */
                    $("#incpSum_" + ls[i].DEPT_SEQ).text(comma((Math.floor((Number(uncomma($("#incpSum_" + ls[i].DEPT_SEQ).text()))) + (engnSaleSum - engnIncpSum + rndIncpSum) / 1000000)) || 0));
                    incpSumTotal += Math.floor((Number(uncomma($("#incpSum_" + ls[i].DEPT_SEQ).text()))) + (engnSaleSum - engnIncpSum + rndIncpSum) / 1000000) || 0;
                }
            });

            /** 운영수익 예상 */
            $("td[name='incpExp']").each(function() {
                if ($(this).attr("id").split("_")[1] == ls[i].DEPT_SEQ) {
                    var estEngnSum = 0;
                    var incpRndAchSum = 0;

                    var saleEngnAchSum = 0;

                    for(var j = 0 ; j < engnSaleList.length ; j++){
                        if($(this).attr("id").split("_")[1] == engnSaleList[j].DEPT_SEQ){
                            saleEngnAchSum += engnSaleList[j].PJT_AMT;
                        }
                    }

                    for(var j = 0 ; j < engnEstList.length ; j++){
                        if($(this).attr("id").split("_")[1] == engnEstList[j].DEPT_SEQ){
                            estEngnSum += engnEstList[j].EST_TOT_AMT;
                        }
                    }

                    for(var j = 0 ; j < rndIncpList.length ; j++){
                        if($(this).attr("id").split("_")[1] == rndIncpList[j].DEPT_SEQ){
                            incpRndAchSum += rndIncpList[j].TOT_COST;
                        }
                    }

                    var engnSaleSum = (ls[i].PJT_AMT + (saleEngnAchSum || 0));
                    var engnIncpSum = (estEngnSum || 0);
                    var rndIncpSum = (incpRndAchSum || 0);

                    $(this).text(comma((Math.floor((engnSaleSum - engnIncpSum + rndIncpSum) / 1000000)) || 0));
                    incpExpTotal += Math.floor((engnSaleSum - engnIncpSum + rndIncpSum) / 1000000) || 0;

                    /** 매출 합계 */
                    $("#incpSum_" + ls[i].DEPT_SEQ).text(comma((Math.floor((Number(uncomma($("#incpSum_" + ls[i].DEPT_SEQ).text()))) + (engnSaleSum - engnIncpSum + rndIncpSum) / 1000000)) || 0));
                    incpSumTotal += Math.floor((Number(uncomma($("#incpSum_" + ls[i].DEPT_SEQ).text()))) + (engnSaleSum - engnIncpSum + rndIncpSum) / 1000000) || 0;
                }
            });
        }

        $("#delvObjTotal").text(comma(delvObjTotal));
        $("#delvAchTotal").text(comma(delvAchTotal));
        $("#delvExpTotal").text(comma(delvExpTotal));
        $("#delvSumTotal").text(comma(delvSumTotal));

        $("#saleObjTotal").text(comma(saleObjTotal));
        $("#saleAchTotal").text(comma(saleAchTotal));
        $("#saleExpTotal").text(comma(saleExpTotal));
        $("#saleSumTotal").text(comma(saleSumTotal));

        $("#incpObjTotal").text(comma(incpObjTotal));
        $("#incpAchTotal").text(comma(incpAchTotal));
        $("#incpExpTotal").text(comma(incpExpTotal));
        $("#incpSumTotal").text(comma(incpSumTotal));

        weekMeet.fn_calcPercent();
    },

    fn_calcPercent : function(){

        /** 수주 달성 비율 */
        $("td[name='delvAchPer']").each(function(){
            var deptSeq = $(this).attr("id").split("_")[1];
            var objAmt = Number(uncommaN($("#delvObj_" + deptSeq).text()));
            var achAmt = Number(uncommaN($("#delvAch_" + deptSeq).text()));

            if(objAmt == 0 || achAmt == 0){
                $(this).text("0 %");
            } else {
                var num = Math.round((achAmt / objAmt * 100) * 10) / 10;
                $(this).text( num.toFixed(1) + " %" );
            }
        });

        /** 수주 예상 비율 */
        $("td[name='delvExpPer']").each(function(){
            var deptSeq = $(this).attr("id").split("_")[1];
            var objAmt = Number(uncommaN($("#delvObj_" + deptSeq).text()));
            var expAmt = Number(uncommaN($("#delvExp_" + deptSeq).text()));

            if(objAmt == 0 || expAmt == 0){
                $(this).text("0 %");
            } else {
                var num = Math.round((expAmt / objAmt * 100) * 10) / 10
                $(this).text( num.toFixed(1) + " %" );
            }
        });

        /** 수주 합계 비율 */
        $("td[name='delvSumPer']").each(function(){
            var deptSeq = $(this).attr("id").split("_")[1];
            var objAmt = Number(uncommaN($("#delvObj_" + deptSeq).text()));
            var sumAmt = Number(uncommaN($("#delvSum_" + deptSeq).text()));

            if(objAmt == 0 || sumAmt == 0){
                $(this).text("0 %");
            } else {
                var num = Math.round((sumAmt / objAmt * 100) * 10) / 10;
                $(this).text( num.toFixed(1) + " %" );
            }
        });

        /** 매출 달성 비율 */
        $("td[name='saleAchPer']").each(function(){
            var deptSeq = $(this).attr("id").split("_")[1];
            var objAmt = Number(uncommaN($("#saleObj_" + deptSeq).text()));
            var achAmt = Number(uncommaN($("#saleAch_" + deptSeq).text()));

            if(objAmt == 0 || achAmt == 0){
                $(this).text("0 %");
            } else {
                var num = Math.round((achAmt / objAmt * 100) * 10) / 10
                $(this).text( num.toFixed(1) + " %" );
            }
        });

        /** 매출 예상 비율 */
        $("td[name='saleExpPer']").each(function(){
            var deptSeq = $(this).attr("id").split("_")[1];
            var objAmt = Number(uncommaN($("#saleObj_" + deptSeq).text()));
            var expAmt = Number(uncommaN($("#saleExp_" + deptSeq).text()));

            if(objAmt == 0 || expAmt == 0){
                $(this).text("0 %");
            } else {
                var num = Math.round((expAmt / objAmt * 100) * 10) / 10;
                $(this).text( num.toFixed(1) + " %" );
            }
        });

        /** 매출 합계 비율 */
        $("td[name='saleSumPer']").each(function(){
            var deptSeq = $(this).attr("id").split("_")[1];
            var objAmt = Number(uncommaN($("#saleObj_" + deptSeq).text()));
            var sumAmt = Number(uncommaN($("#saleSum_" + deptSeq).text()));

            if(objAmt == 0 || sumAmt == 0){
                $(this).text("0 %");
            } else {
                var num = Math.round((sumAmt / objAmt * 100) * 10) / 10
                $(this).text( num.toFixed(1) + " %" );
            }
        });

        /** 운영수익 달성 비율 */
        $("td[name='incpAchPer']").each(function(){
            var deptSeq = $(this).attr("id").split("_")[1];
            var objAmt = Number(uncommaN($("#incpObj_" + deptSeq).text()));
            var achAmt = Number(uncommaN($("#incpAch_" + deptSeq).text()));

            if(objAmt == 0 || achAmt == 0){
                $(this).text("0 %");
            } else {
                var num = Math.round((achAmt / objAmt * 100) * 10) / 10;
                $(this).text( num.toFixed(1) + " %" );
            }
        });

        /** 운영수익 예상 비율 */
        $("td[name='incpExpPer']").each(function(){
            var deptSeq = $(this).attr("id").split("_")[1];
            var objAmt = Number(uncommaN($("#incpObj_" + deptSeq).text()));
            var expAmt = Number(uncommaN($("#incpExp_" + deptSeq).text()));

            if(objAmt == 0 || expAmt == 0){
                $(this).text("0 %");
            } else {
                var num = Math.round((expAmt / objAmt * 100) * 10) / 10;

                $(this).text( num.toFixed(1) + " %" );
            }
        });

        /** 운영수익 합계 비율 */
        $("td[name='incpSumPer']").each(function(){
            var deptSeq = $(this).attr("id").split("_")[1];
            var objAmt = Number(uncommaN($("#incpObj_" + deptSeq).text()));
            var sumAmt = Number(uncommaN($("#incpSum_" + deptSeq).text()));

            if(objAmt == 0 || sumAmt == 0){
                $(this).text("0 %");
            } else {
                var num = Math.round((sumAmt / objAmt * 100) * 10) / 10;
                $(this).text( num.toFixed(1) + " %" );
            }
        });

        /** 수주 총계 비율 */
        let objAmt = Number(uncommaN($("#delvObjTotal").text()));
        let achAmt = Number(uncommaN($("#delvAchTotal").text()));
        let expAmt = Number(uncommaN($("#delvExpTotal").text()));
        let sumAmt = Number(uncommaN($("#delvSumTotal").text()));

        if(objAmt == 0 || achAmt == 0){
            $("#delvAchPerTotal").text("0 %");
        } else {
            var num = Math.round((achAmt / objAmt * 100) * 10) / 10;
            $("#delvAchPerTotal").text( num.toFixed(1) + " %" );
        }
        if(objAmt == 0 || expAmt == 0){
            $("#delvExpPerTotal").text("0 %");
        } else {
            var num = Math.round((expAmt / objAmt * 100) * 10) / 10;

            $("#delvExpPerTotal").text( num.toFixed(1) + " %" );
        }
        if(objAmt == 0 || sumAmt == 0){
            $("#delvSumPerTotal").text("0 %");
        } else {
            var num = Math.round((sumAmt / objAmt * 100) * 10);

            $("#delvSumPerTotal").text( num.toFixed(1) + " %" );
        }

        /** 매출 총계 비율 */
        objAmt = Number(uncommaN($("#saleObjTotal").text()));
        achAmt = Number(uncommaN($("#saleAchTotal").text()));
        expAmt = Number(uncommaN($("#saleExpTotal").text()));
        sumAmt = Number(uncommaN($("#saleSumTotal").text()));

        if(objAmt == 0 || achAmt == 0){
            $("#saleAchPerTotal").text("0 %");
        } else {
            $("#saleAchPerTotal").text( Math.round((achAmt / objAmt * 100) * 10) / 10 + " %" );
        }
        if(objAmt == 0 || expAmt == 0){
            $("#saleExpPerTotal").text("0 %");
        } else {
            $("#saleExpPerTotal").text( Math.round((expAmt / objAmt * 100) * 10) / 10 + " %" );
        }
        if(objAmt == 0 || sumAmt == 0){
            $("#saleSumPerTotal").text("0 %");
        } else {
            $("#saleSumPerTotal").text( Math.round((sumAmt / objAmt * 100) * 10) / 10 + " %" );
        }

        /** 운영수익 총계 비율 */
        objAmt = Number(uncommaN($("#incpObjTotal").text()));
        achAmt = Number(uncommaN($("#incpAchTotal").text()));
        expAmt = Number(uncommaN($("#incpExpTotal").text()));
        sumAmt = Number(uncommaN($("#incpSumTotal").text()));

        if(objAmt == 0 || achAmt == 0){
            $("#incpAchPerTotal").text("0 %");
        } else {
            $("#incpAchPerTotal").text( Math.round((achAmt / objAmt * 100) * 10) / 10 + " %" );
        }
        if(objAmt == 0 || expAmt == 0){
            $("#incpExpPerTotal").text("0 %");
        } else {
            $("#incpExpPerTotal").text( Math.round((expAmt / objAmt * 100) * 10) / 10 + " %" );
        }
        if(objAmt == 0 || sumAmt == 0){
            $("#incpSumPerTotal").text("0 %");
        } else {
            $("#incpSumPerTotal").text( Math.round((sumAmt / objAmt * 100) * 10) / 10 + " %" );
        }

    },

    fn_objSetting : function(){
        var url = "/cam_achieve/popObjSetting.do?year=" + $("#year").val() + "&deptLevel=1";
        var name = "_blank";
        var option = "width = 680, height = 500, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
    }

}

function comma(str) {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}