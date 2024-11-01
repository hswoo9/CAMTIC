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
        if((e.BUSN_CLASS == "D" || e.BUSN_CLASS == "V") && e.LIST_STR_DE != null && e.LIST_STR_DE.substring(0, 4) == e.YEAR){
            amt = Number(e.PJT_AMT);
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

        if((e.BUSN_CLASS == "D" || e.BUSN_CLASS == "V") && e.LIST_STR_DE != null && e.LIST_STR_DE.substring(0, 4) == e.YEAR){
            amt = Number(e.REAL_PJT_AMT);
        }else if(e.BUSN_CLASS == "R" || e.BUSN_CLASS == "S"){
            /** 마감 됐는지 체크 */
            if(e.DEADLINE_YN != NULL && e.DEADLINE_YN == "Y"){
                amt = Number(e.REAL_PJT_AMT) + Number(e.befExpSaleAmt || 0) - Number(e.nowExpSaleAmt || 0);
            }else{
                amt = Number(e.REAL_PJT_AMT);
            }
        }else{
            amt = 0;
        }

        if(e.TEAM_STAT == "Y"){
            amt = 0;
        }

        return amt;
    },

    /** 수행계획 최신 Ver 투자금액 */
    nowInvAmt: function(e){
        /**
         * 공통 : 수주년도면 비용, 차년도면 수행계획 - 비용
         * 사업 종료 : 종료시에는 해당 년도 비용
         * */
        let amt = 0;
        if(["C"].includes(e.TEXT)){
            amt = Number(e.DEV_INV_AMT || 0);
        }else if(["A", "B", "D"].includes(e.TEXT) && e.LIST_NOW_STR_DE != null && e.LIST_NOW_STR_DE.substring(0, 4) == e.YEAR){
            amt = Number(e.realUseAmt + e.realUseAmt2 + e.realUseAmt3);
        }else if(["A", "B", "D"].includes(e.TEXT) && e.LIST_NOW_STR_DE != null && e.LIST_NOW_STR_DE.substring(0, 4) != e.YEAR){
            amt = Number(e.DEV_INV_AMT || 0) - Number(e.befRealUseAmt + e.befRealUseAmt2 + e.befRealUseAmt3);
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
                asrAmt = e.goodsTotAmt;
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
        }else{
            aopAmt = e.incpCompAmt1 + Math.floor(Number(e.incpCompAmt2) * costCalc.directProfitRate(e));
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
            devAmt = costCalc.nowPjtAmt(e) - costCalc.resSaleAmt(e) - Number(e.nowExpSaleAmt || 0) + Number(e.befExpSaleAmt || 0);
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
         * 수주년도 : 당해년도사업비 - 투자내역 - 달성운영수익 - 차년도운영수익
         * 차년도 : 전년도에 설정한 차년도 운영수익
         *
         * 알앤디/비알앤디
         * 전체 : 예상수익 = 수익설정 예산액 - 수익설정 지출완료금액
         * */
        let amt = 0;
        let eopAmt = 0;
        if(e.BUSN_CLASS == "D" || e.BUSN_CLASS == "V"){
            let amt0 = Number(e.PJT_AMT || 0);
            let amt1 = Number(e.DEV_INV_AMT || 0);
            let amt2 = costCalc.resProfitAmt(e);
            eopAmt = amt0 - amt1 - amt2;

            console.log("당해년도 사업비 : ", amt0);
            console.log("투자내역 : ", amt1);
            console.log("달성운영수익 : ", amt2);

            if(e.LIST_NOW_STR_DE != null && e.LIST_NOW_STR_DE.substring(0, 4) != e.YEAR){
                eopAmt = amt2;
            }
        }else{
            if(e.REAL_PJT_AMT != null && e.REAL_PJT_AMT != 0){
                eopAmt = e.planAmt;
            }
            eopAmt = eopAmt - e.incpCompAmt1;
        }
        amt = eopAmt + Number(e.pjtAmtSetData.AMT3 || 0) + Number(e.befExpProfitAmt || 0) - Number(e.nowExpProfitAmt || 0)
        console.log("차년도운영수익 : ", e.nowExpProfitAmt || 0);
        console.log("전년도운영수익 : ", e.befExpProfitAmt || 0);

        console.log("예상 운영수익 계산 함수 devProfitAmt() 끝...");
        return amt;
    },

    /** 직접비 수익률 */
    directProfitRate: function(e){
        /** 직접비 수익율 : ( 수행계획서 상 예상비용 - 직접비 예산 ) / 직접비 예산 */
        let per = 0;
        let directAmt = Number(e.useAmt || 0);
        let invAmt = Number(e.DEV_INV_AMT || 0);
        per = (Number(invAmt) - directAmt) / directAmt;

        if(directAmt == 0){
            per = 0;
        }
        console.log("직접비 수익률 : ", per);

        return per;
    }
}