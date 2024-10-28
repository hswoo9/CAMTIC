var costCalc = {
    /** 수주금액 */
    allPjtAmt: function(e){
        /** 
         * 엔지니어링
         * 수주 : 동일 년도면 수주금액, 아니면 0원
         * 협업 : 협업은 수주X, 0원
         * 
         * 알앤디/비알앤디
         * 단년 : 당해년도 사업비
         * 다년 : 동일 년도면 총 수주금액, 아니면 0원
         * */
        let amt = 0;
        if(e.BUSN_CLASS == "D" || e.BUSN_CLASS == "V"){
            amt = Number(e.REAL_PJT_AMT);
        }else{
            if(["A", "B", "D"].includes(e.TEXT) && e.LIST_STR_DE != null && e.LIST_STR_DE.substring(0, 4) == e.YEAR){
                if(e.YEAR_CLASS == "M"){
                    amt = Number(e.ALL_PJT_AMT);
                }else{
                    amt = Number(e.PJT_AMT);
                }
            } else {
                amt = 0;
            }
        }

        if(e.TEAM_STAT == "Y"){
            amt = 0;
        }
        return amt;
    },

    /** 당해년도 사업비 */
    nowPjtAmt: function(e){
        /**
         * 엔지니어링
         * 전체 : 동일 년도면 수주금액, 아니면 0원
         *
         * 알앤디/비알앤디
         * 전체 : 당해년도 사업비
         * 
         * 공통 : 수주금액 - 전년도 매출액 - 차년도 매출액
         * */
        let amt = 0;
        amt = Number(e.REAL_PJT_AMT) + Number(e.befExpSaleAmt || 0) - Number(e.nowExpSaleAmt || 0);
        return amt;
    },

    /** 수행계획 최신 Ver 투자금액 */
    nowInvAmt: function(e){
        /**
         * 공통 : 동일 년도면 투자금액, 아니면 0원
         * */
        let amt = 0;
        if(["A", "B", "D"].includes(e.TEXT) && e.LIST_STR_DE != null && e.LIST_STR_DE.substring(0, 4) == e.YEAR){
            amt = Number(e.DEV_INV_AMT || 0);
        }
        return amt;
    },

    /** 달성 매출액 */
    resSaleAmt: function(e){
        /**
         * 엔지니어링
         * 전체 : 정산서 마감이 되고 납품 저장 금액
         *
         * 알앤디/비알앤디
         * 전체 : 달성 매출액 = 지출완료금액(과세일시 나누기 1.1)
         * */
        let amt = 0;
        let asrAmt = 0;
        if(e.BUSN_CLASS == "D" || e.BUSN_CLASS == "V"){
            if(e.COST_CLOSE_CK == "Y"){
                asrAmt = Number(e.goodsTotAmt || 0);
            }
        }else{
            if(e.TAX_GUBUN != null && e.TAX_GUBUN == "1"){
                asrAmt = Number((e.exnpCompAmt * 10 / 11).toString().split(".")[0]);
            }else{
                asrAmt = e.exnpCompAmt;
            }
        }
        amt = asrAmt + Number(e.pjtAmtSetData.AMT0 || 0);
        return amt;
    },

    /** 달성 운영수익 */
    resProfitAmt: function(e){
        /**
         * 엔지니어링
         * 0원 : 0
         * 나머지 : 달성매출액 - 비용 - 예상수익
         *
         * 알앤디/비알앤디
         * 전체 : 달성 운영수익 = 수익설정 지출완료금액 + (비용설정 지출완료금액 - 비용총합계)
         * */
        let amt = 0;
        let aopAmt = 0;
        if(e.BUSN_CLASS == "D" || e.BUSN_CLASS == "V"){
            let asrAmt = costCalc.resSaleAmt(e);
            if(asrAmt > 0){
                aopAmt = asrAmt - Number(e.realUseAmt + e.realUseAmt2 + e.realUseAmt3);
            }
            console.log("realUseAmt", e.realUseAmt);
            console.log("realUseAmt2", e.realUseAmt2);
            console.log("realUseAmt3", e.realUseAmt3);
        }else{
            /*if(e.TAX_GUBUN != null && e.TAX_GUBUN == "1"){
                let tmpAmt = Number(((e.incpCompAmt2 - e.realUseAmt - e.realUseAmt2 - e.realUseAmt3) * 10 / 11).toString().split(".")[0]);
                aopAmt = e.incpCompAmt1 + tmpAmt;
            }else{
                aopAmt = e.incpCompAmt1 + Number(e.incpCompAmt2 - e.realUseAmt - e.realUseAmt2 - e.realUseAmt3);
            }*/
            aopAmt = e.incpCompAmt1 + Math.floor(Number(e.incpCompAmt2) * costCalc.directProfitRate(e));
            /*
            console.log("incpCompAmt1", e.incpCompAmt1);
            console.log("incpCompAmt2", e.incpCompAmt2);
            console.log("realUseAmt", e.realUseAmt);
            console.log("realUseAmt2", e.realUseAmt2);
            console.log("realUseAmt3", e.realUseAmt3);
            console.log("aopAmt", aopAmt);
            console.log("pjtAmtSetData", e.pjtAmtSetData);
            */
        }
        amt = aopAmt + Number(e.pjtAmtSetData.AMT1 || 0);
        return amt;
    },

    /** 예상 매출액 */
    devSaleAmt: function(e){
        /**
         * 엔지니어링
         * 전체 : 수주금액 - 달성 매출액 - 차년도 매출액
         *
         * 알앤디/비알앤디
         * 전체 : 예상매출 = 당해년도 사업비 - 달성 매출액
         * */
        let amt = 0;
        let devAmt = 0;
        if(e.BUSN_CLASS == "D" || e.BUSN_CLASS == "V"){
            devAmt = costCalc.nowPjtAmt(e) - costCalc.resSaleAmt(e);
        }else{
            devAmt = costCalc.nowPjtAmt(e) - costCalc.resSaleAmt(e);
        }
        amt = devAmt + Number(e.pjtAmtSetData.AMT2 || 0);
        return amt;
    },

    /** 예상 운영수익 */
    devProfitAmt: function(e){
        /**
         * 엔지니어링
         * 전체 : 당해년도사업비-투자내역-달성운영수익-차년도운영수익
         *
         * 알앤디/비알앤디
         * 전체 : 예상수익 = 수익설정 예산액 - 수익설정 지출완료금액
         * */
        let amt = 0;
        let eopAmt = 0;
        if(e.BUSN_CLASS == "D" || e.BUSN_CLASS == "V"){
            eopAmt = costCalc.nowPjtAmt(e) - costCalc.nowInvAmt(e) - costCalc.resProfitAmt(e);
        }else{
            if(e.REAL_PJT_AMT != null && e.REAL_PJT_AMT != 0){
                eopAmt = e.planAmt;
            }
            eopAmt = eopAmt - e.incpCompAmt1;
            /*
            console.log("eopAmt", eopAmt);
            console.log("e.pjtAmtSetData.AMT3", e.pjtAmtSetData.AMT3);
            */
        }
        amt = eopAmt + Number(e.pjtAmtSetData.AMT3 || 0) + Number(e.befExpProfitAmt || 0) - Number(e.nowExpProfitAmt || 0);
        return amt;
    },

    /** 직접비 수익률 */
    directProfitRate: function(e){
        /** 직접비 수익율 : ( 수행계획서 상 예상비용 - 직접비 예산 ) / 직접비 예산 */
        let per = 0;
        let directAmt = Number(e.useAmt || 0);
        let invAmt = costCalc.nowInvAmt(e);
        console.log("directAmt", directAmt);
        console.log("invAmt", invAmt);
        per = (Number(invAmt) - directAmt) / directAmt;
        console.log("per", per);

        if(directAmt == 0){
            per = 0;
        }
        return per;
    }
}