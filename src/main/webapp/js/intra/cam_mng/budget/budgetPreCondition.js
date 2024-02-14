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
        var rLs = result.rs.rList;
        var sLs = result.rs.sList;
        var mLs = result.rs.mList;
        var dLs = result.rs.dList;
        var vLs = result.rs.vList;

        /**
         * R&D
         */
        var rHtml = "";
        $("#rBody").html(rHtml);
        rHtml += '<tr>' +
            '   <td style="text-align: center; background-color: #f0f6ff;" id="rndRow" rowspan="'+rLs.length + 1+'"><b>R&D</b></td>' +
            '   <td style="text-align: center;" colspan="3"><b>총계</b></td>' +
            '   <td style="text-align: right; background-color: #FFFFFF"><b><span id="ARP">0</span></b></td>' +
            '   <td style="text-align: right; background-color: #FFFFFF"><b><span id="ARM">0</span></b></td>' +
            '   <td style="text-align: center;" colspan="3"><b>총계</b></td>' +
            '   <td style="text-align: right; background-color: #FFFFFF"><b><span id="BRP">0</span></b></td>' +
            '   <td style="text-align: right; background-color: #FFFFFF"><b><span id="BRM">0</span></b></td>' +
            '</tr>'
        $("#rBody").append(rHtml);

        var rACnt = 0;
        var rASumAmt = 0;
        var rASumExnpAmt = 0;
        var rBCnt = 0;
        var rBSumAmt = 0;
        var rBSumExnpAmt = 0;
        for(var i = 0 ; i < rLs.length ; i++){
            var item = rLs[i];

            rHtml = '<tr style="background-color: white">';
            rHtml += '  <td><span id="rJangA'+i+'"></span></td>';
            rHtml += '  <td><span id="rGwanA'+i+'"></span></td>';
            rHtml += '  <td><span id="rHangA'+i+'"></span></td>';
            rHtml += '  <td style="text-align: right"><span id="rBudgetAmtA'+i+'"></span></td>';
            rHtml += '  <td style="text-align: right"><span id="rExnpAmtA'+i+'"></span></td>';
            rHtml += '  <td><span id="rJangB'+i+'"></span></td>';
            rHtml += '  <td><span id="rGwanB'+i+'"></span></td>';
            rHtml += '  <td><span id="rHangB'+i+'"></span></td>';
            rHtml += '  <td style="text-align: right"><span id="rBudgetAmtB'+i+'"></span></td>';
            rHtml += '  <td style="text-align: right"><span id="rExnpAmtB'+i+'"></span></td>';
            rHtml += '</tr>';
            $("#rBody").append(rHtml);

            if(item.BG_VAL == 'A'){
                $("#rJangA" + rACnt).text(item.JANG_NM);
                $("#rGwanA" + rACnt).text(item.GWAN_NM);
                $("#rHangA" + rACnt).text(item.HANG_NM);
                $("#rBudgetAmtA" + rACnt).text(comma(item.BUDGET_AMT));
                $("#rExnpAmtA" + rACnt).text(comma(item.EXNP_AMT));
                rASumAmt += item.BUDGET_AMT;
                rASumExnpAmt += item.EXNP_AMT;
                rACnt++;
            }
            $("#ARP").text(comma(rASumAmt));
            $("#ARM").text(comma(rASumExnpAmt));
            if(item.BG_VAL == 'B'){
                $("#rJangB" + rBCnt).text(item.JANG_NM);
                $("#rGwanB" + rBCnt).text(item.GWAN_NM);
                $("#rHangB" + rBCnt).text(item.HANG_NM);
                $("#rBudgetAmtB" + rBCnt).text(comma(item.BUDGET_AMT));
                $("#rExnpAmtB" + rBCnt).text(comma(item.EXNP_AMT));
                rBSumAmt += item.BUDGET_AMT;
                rBSumExnpAmt += item.EXNP_AMT;
                rBCnt++;
            }
            $("#BRP").text(comma(rBSumAmt));
            $("#BRM").text(comma(rBSumExnpAmt));

        }
        var rBodyLen = 0;
        if(rACnt != 0 || rBCnt != 0){
            if(rACnt > rBCnt){
                $("#rndRow").attr("rowspan", rACnt + 1);
                rBodyLen = rACnt + 1;
            } else {
                $("#rndRow").attr("rowspan", rBCnt + 1);
                rBodyLen = rBCnt + 1;
            }
            $("#rBody tr").each(function(i){
                if(i >= rBodyLen){
                    $(this).remove();
                }
            });
        }

        /**
         * 비R&D
         */
        var sHtml = "";
        $("#sBody").html(sHtml);
        sHtml += '<tr>' +
            '   <td style="text-align: center; background-color: #f0f6ff;" id="unRndRow" rowspan="'+rLs.length + 1+'"><b>비R&D</b></td>' +
            '   <td style="text-align: center;" colspan="3"><b>총계</b></td>' +
            '   <td style="text-align: right; background-color: #FFFFFF"><b><span id="ASP">0</span></b></td>' +
            '   <td style="text-align: right; background-color: #FFFFFF"><b><span id="ASM">0</span></b></td>' +
            '   <td style="text-align: center;" colspan="3"><b>총계</b></td>' +
            '   <td style="text-align: right; background-color: #FFFFFF"><b><span id="BSP">0</span></b></td>' +
            '   <td style="text-align: right; background-color: #FFFFFF"><b><span id="BSM">0</span></b></td>' +
            '</tr>'
        $("#sBody").append(sHtml);

        var sACnt = 0;
        var sASumAmt = 0;
        var sASumExnpAmt = 0;
        var sBCnt = 0;
        var sBSumAmt = 0;
        var sBSumExnpAmt = 0;
        for(var i = 0 ; i < sLs.length ; i++){
            var item = sLs[i];

            sHtml = '<tr style="background-color: white">';
            sHtml += '  <td><span id="sJangA'+i+'"></span></td>';
            sHtml += '  <td><span id="sGwanA'+i+'"></span></td>';
            sHtml += '  <td><span id="sHangA'+i+'"></span></td>';
            sHtml += '  <td style="text-align: right"><span id="sBudgetAmtA'+i+'"></span></td>';
            sHtml += '  <td style="text-align: right"><span id="sExnpAmtA'+i+'"></span></td>';
            sHtml += '  <td><span id="sJangB'+i+'"></span></td>';
            sHtml += '  <td><span id="sGwanB'+i+'"></span></td>';
            sHtml += '  <td><span id="sHangB'+i+'"></span></td>';
            sHtml += '  <td style="text-align: right"><span id="sBudgetAmtB'+i+'"></span></td>';
            sHtml += '  <td style="text-align: right"><span id="sExnpAmtB'+i+'"></span></td>';
            sHtml += '</tr>';
            $("#sBody").append(sHtml);

            if(item.BG_VAL == 'A'){
                $("#sJangA" + sACnt).text(item.JANG_NM);
                $("#sGwanA" + sACnt).text(item.GWAN_NM);
                $("#sHangA" + sACnt).text(item.HANG_NM);
                $("#sBudgetAmtA" + sACnt).text(comma(item.BUDGET_AMT));
                $("#sExnpAmtA" + sACnt).text(comma(item.EXNP_AMT));
                sASumAmt += item.BUDGET_AMT;
                sASumExnpAmt += item.EXNP_AMT;
                sACnt++;
            }
            $("#ASP").text(comma(sASumAmt));
            $("#ASM").text(comma(sASumExnpAmt));
            if(item.BG_VAL == 'B'){
                $("#sJangB" + sBCnt).text(item.JANG_NM);
                $("#sGwanB" + sBCnt).text(item.GWAN_NM);
                $("#sHangB" + sBCnt).text(item.HANG_NM);
                $("#sBudgetAmtB" + sBCnt).text(comma(item.BUDGET_AMT));
                $("#sExnpAmtB" + sBCnt).text(comma(item.EXNP_AMT));
                sBSumAmt += item.BUDGET_AMT;
                sBSumExnpAmt += item.EXNP_AMT;
                sBCnt++;
            }
            $("#BSP").text(comma(sBSumAmt));
            $("#BSM").text(comma(sBSumExnpAmt));

        }
        var sBodyLen = 0;
        if(sACnt != 0 || sBCnt != 0){
            if(sACnt > sBCnt){
                $("#unRndRow").attr("rowspan", sACnt + 1);
                sBodyLen = sACnt + 1;
            } else {
                $("#unRndRow").attr("rowspan", sBCnt + 1);
                sBodyLen = sBCnt + 1;
            }
            $("#sBody tr").each(function(i){
                if(i >= sBodyLen){
                    $(this).remove();
                }
            });
        }

        /**
         * 법인운영
         */
        var mHtml = "";
        $("#mBody").html(mHtml);
        mHtml += '<tr>' +
            '   <td style="text-align: center; background-color: #f0f6ff;" id="mRow" rowspan="'+mLs.length + 1+'"><b>법인운영</b></td>' +
            '   <td style="text-align: center;" colspan="3"><b>총계</b></td>' +
            '   <td style="text-align: right; background-color: #FFFFFF"><b><span id="AMP">0</span></b></td>' +
            '   <td style="text-align: right; background-color: #FFFFFF"><b><span id="AMM">0</span></b></td>' +
            '   <td style="text-align: center;" colspan="3"><b>총계</b></td>' +
            '   <td style="text-align: right; background-color: #FFFFFF"><b><span id="BMP">0</span></b></td>' +
            '   <td style="text-align: right; background-color: #FFFFFF"><b><span id="BMM">0</span></b></td>' +
            '</tr>'
        $("#mBody").append(mHtml);

        var mACnt = 0;
        var mASumAmt = 0;
        var mASumExnpAmt = 0;
        var mBCnt = 0;
        var mBSumAmt = 0;
        var mBSumExnpAmt = 0;
        for(var i = 0 ; i < mLs.length ; i++){
            var item = mLs[i];

            mHtml = '<tr style="background-color: white">';
            mHtml += '  <td><span id="mJangA'+i+'"></span></td>';
            mHtml += '  <td><span id="mGwanA'+i+'"></span></td>';
            mHtml += '  <td><span id="mHangA'+i+'"></span></td>';
            mHtml += '  <td style="text-align: right"><span id="mBudgetAmtA'+i+'"></span></td>';
            mHtml += '  <td style="text-align: right"><span id="mExnpAmtA'+i+'"></span></td>';
            mHtml += '  <td><span id="mJangB'+i+'"></span></td>';
            mHtml += '  <td><span id="mGwanB'+i+'"></span></td>';
            mHtml += '  <td><span id="mHangB'+i+'"></span></td>';
            mHtml += '  <td style="text-align: right"><span id="mBudgetAmtB'+i+'"></span></td>';
            mHtml += '  <td style="text-align: right"><span id="mExnpAmtB'+i+'"></span></td>';
            mHtml += '</tr>';
            $("#mBody").append(mHtml);

            if(item.BG_VAL == 'A'){
                $("#mJangA" + mACnt).text(item.JANG_NM);
                $("#mGwanA" + mACnt).text(item.GWAN_NM);
                $("#mHangA" + mACnt).text(item.HANG_NM);
                $("#mBudgetAmtA" + mACnt).text(comma(item.BUDGET_AMT));
                $("#mExnpAmtA" + mACnt).text(comma(item.EXNP_AMT));
                mASumAmt += item.BUDGET_AMT;
                mASumExnpAmt += item.EXNP_AMT;
                mACnt++;
            }
            $("#AMP").text(comma(mASumAmt));
            $("#AMM").text(comma(mASumExnpAmt));
            if(item.BG_VAL == 'B'){
                $("#mJangB" + mBCnt).text(item.JANG_NM);
                $("#mGwanB" + mBCnt).text(item.GWAN_NM);
                $("#mHangB" + mBCnt).text(item.HANG_NM);
                $("#mBudgetAmtB" + mBCnt).text(comma(item.BUDGET_AMT));
                $("#mExnpAmtB" + mBCnt).text(comma(item.EXNP_AMT));
                mBSumAmt += item.BUDGET_AMT;
                mBSumExnpAmt += item.EXNP_AMT;
                mBCnt++;
            }
            $("#BMP").text(comma(mBSumAmt));
            $("#BMM").text(comma(mBSumExnpAmt));

        }
        var mBodyLen = 0;
        if(mACnt != 0 || mBCnt != 0){
            if(mACnt > mBCnt){
                $("#mRow").attr("rowspan", mACnt + 1);
                mBodyLen = mACnt + 1;
            } else {
                $("#mRow").attr("rowspan", mBCnt + 1);
                mBodyLen = mBCnt + 1;
            }
            $("#mBody tr").each(function(i){
                if(i >= mBodyLen){
                    $(this).remove();
                }
            });
        }

        /**
         * 엔지니어링
         */
        var dHtml = "";
        $("#dBody").html(dHtml);
        dHtml += '<tr>' +
            '   <td style="text-align: center; background-color: #f0f6ff;" id="dRow" rowspan="'+dLs.length + 1+'"><b>엔지니어링</b></td>' +
            '   <td style="text-align: center;" colspan="3"><b>총계</b></td>' +
            '   <td style="text-align: right; background-color: #FFFFFF"><b><span id="ADP">0</span></b></td>' +
            '   <td style="text-align: right; background-color: #FFFFFF"><b><span id="ADM">0</span></b></td>' +
            '   <td style="text-align: center;" colspan="3"><b>총계</b></td>' +
            '   <td style="text-align: right; background-color: #FFFFFF"><b><span id="BDP">0</span></b></td>' +
            '   <td style="text-align: right; background-color: #FFFFFF"><b><span id="BDM">0</span></b></td>' +
            '</tr>'
        $("#dBody").append(dHtml);

        var dACnt = 0;
        var dASumAmt = 0;
        var dASumExnpAmt = 0;
        var dBCnt = 0;
        var dBSumAmt = 0;
        var dBSumExnpAmt = 0;
        for(var i = 0 ; i < dLs.length ; i++){
            var item = dLs[i];

            dHtml = '<tr style="background-color: white">';
            dHtml += '  <td><span id="dJangA'+i+'"></span></td>';
            dHtml += '  <td><span id="dGwanA'+i+'"></span></td>';
            dHtml += '  <td><span id="dHangA'+i+'"></span></td>';
            dHtml += '  <td style="text-align: right"><span id="dBudgetAmtA'+i+'"></span></td>';
            dHtml += '  <td style="text-align: right"><span id="dExnpAmtA'+i+'"></span></td>';
            dHtml += '  <td><span id="dJangB'+i+'"></span></td>';
            dHtml += '  <td><span id="dGwanB'+i+'"></span></td>';
            dHtml += '  <td><span id="dHangB'+i+'"></span></td>';
            dHtml += '  <td style="text-align: right"><span id="dBudgetAmtB'+i+'"></span></td>';
            dHtml += '  <td style="text-align: right"><span id="dExnpAmtB'+i+'"></span></td>';
            dHtml += '</tr>';
            $("#dBody").append(dHtml);

            if(item.BG_VAL == 'A'){
                $("#dJangA" + dACnt).text(item.JANG_NM);
                $("#dGwanA" + dACnt).text(item.GWAN_NM);
                $("#dHangA" + dACnt).text(item.HANG_NM);
                $("#dBudgetAmtA" + dACnt).text(comma(item.BUDGET_AMT));
                $("#dExnpAmtA" + dACnt).text(comma(item.EXNP_AMT));
                dASumAmt += item.BUDGET_AMT;
                dASumExnpAmt += item.EXNP_AMT;
                dACnt++;
            }
            $("#ADP").text(comma(dASumAmt));
            $("#ADM").text(comma(dASumExnpAmt));
            if(item.BG_VAL == 'B'){
                $("#dJangB" + dBCnt).text(item.JANG_NM);
                $("#dGwanB" + dBCnt).text(item.GWAN_NM);
                $("#dHangB" + dBCnt).text(item.HANG_NM);
                $("#dBudgetAmtB" + dBCnt).text(comma(item.BUDGET_AMT));
                $("#dExnpAmtB" + dBCnt).text(comma(item.EXNP_AMT));
                dBSumAmt += item.BUDGET_AMT;
                dBSumExnpAmt += item.EXNP_AMT;
                dBCnt++;
            }
            $("#BDP").text(comma(dBSumAmt));
            $("#BDM").text(comma(dBSumExnpAmt));

        }
        var dBodyLen = 0;
        if(dACnt != 0 || dBCnt != 0){
            if(dACnt > dBCnt){
                $("#dRow").attr("rowspan", dACnt + 1);
                dBodyLen = dACnt + 1;
            } else {
                $("#dRow").attr("rowspan", dBCnt + 1);
                dBodyLen = dBCnt + 1;
            }
            $("#dBody tr").each(function(i){
                if(i >= dBodyLen){
                    $(this).remove();
                }
            });
        }

        /**
         * 용역/기타
         */
        var vHtml = "";
        $("#vBody").html(vHtml);
        vHtml += '<tr>' +
            '   <td style="text-align: center; background-color: #f0f6ff;" id="vRow" rowspan="'+vLs.length + 1+'"><b>용역/기타</b></td>' +
            '   <td style="text-align: center;" colspan="3"><b>총계</b></td>' +
            '   <td style="text-align: right; background-color: #FFFFFF"><b><span id="AVP">0</span></b></td>' +
            '   <td style="text-align: right; background-color: #FFFFFF"><b><span id="AVM">0</span></b></td>' +
            '   <td style="text-align: center;" colspan="3"><b>총계</b></td>' +
            '   <td style="text-align: right; background-color: #FFFFFF"><b><span id="BVP">0</span></b></td>' +
            '   <td style="text-align: right; background-color: #FFFFFF"><b><span id="BVM">0</span></b></td>' +
            '</tr>'
        $("#vBody").append(vHtml);

        var vACnt = 0;
        var vASumAmt = 0;
        var vASumExnpAmt = 0;
        var vBCnt = 0;
        var vBSumAmt = 0;
        var vBSumExnpAmt = 0;
        for(var i = 0 ; i < vLs.length ; i++){
            var item = vLs[i];

            vHtml = '<tr style="background-color: white">';
            vHtml += '  <td><span id="vJangA'+i+'"></span></td>';
            vHtml += '  <td><span id="vGwanA'+i+'"></span></td>';
            vHtml += '  <td><span id="vHangA'+i+'"></span></td>';
            vHtml += '  <td style="text-align: right"><span id="vBudgetAmtA'+i+'"></span></td>';
            vHtml += '  <td style="text-align: right"><span id="vExnpAmtA'+i+'"></span></td>';
            vHtml += '  <td><span id="vJangB'+i+'"></span></td>';
            vHtml += '  <td><span id="vGwanB'+i+'"></span></td>';
            vHtml += '  <td><span id="vHangB'+i+'"></span></td>';
            vHtml += '  <td style="text-align: right"><span id="vBudgetAmtB'+i+'"></span></td>';
            vHtml += '  <td style="text-align: right"><span id="vExnpAmtB'+i+'"></span></td>';
            vHtml += '</tr>';
            $("#vBody").append(vHtml);

            if(item.BG_VAL == 'A'){
                $("#vJangA" + vACnt).text(item.JANG_NM);
                $("#vGwanA" + vACnt).text(item.GWAN_NM);
                $("#vHangA" + vACnt).text(item.HANG_NM);
                $("#vBudgetAmtA" + vACnt).text(comma(item.BUDGET_AMT));
                $("#vExnpAmtA" + vACnt).text(comma(item.EXNP_AMT));
                vASumAmt += item.BUDGET_AMT;
                vASumExnpAmt += item.EXNP_AMT;
                vACnt++;
            }
            $("#AVP").text(comma(vASumAmt));
            $("#AVM").text(comma(vASumExnpAmt));
            if(item.BG_VAL == 'B'){
                $("#vJangB" + vBCnt).text(item.JANG_NM);
                $("#vGwanB" + vBCnt).text(item.GWAN_NM);
                $("#vHangB" + vBCnt).text(item.HANG_NM);
                $("#vBudgetAmtB" + vBCnt).text(comma(item.BUDGET_AMT));
                $("#vExnpAmtB" + vBCnt).text(comma(item.EXNP_AMT));
                vBSumAmt += item.BUDGET_AMT;
                vBSumExnpAmt += item.EXNP_AMT;
                vBCnt++;
            }
            $("#BVP").text(comma(vBSumAmt));
            $("#BVM").text(comma(vBSumExnpAmt));

        }
        var vBodyLen = 0;
        if(vACnt != 0 || vBCnt != 0){
            if(vACnt > vBCnt){
                $("#vRow").attr("rowspan", vACnt + 1);
                vBodyLen = vACnt + 1;
            } else {
                $("#vRow").attr("rowspan", mBCnt + 1);
                vBodyLen = vBCnt + 1;
            }

            $("#vBody tr").each(function(i){
                if(i >= vBodyLen){
                    $(this).remove();
                }
            });
        }


        

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