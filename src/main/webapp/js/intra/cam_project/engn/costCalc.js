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
            if(["A", "B"].includes(e.TEXT) && e.LIST_STR_DE != null && e.LIST_STR_DE.substring(0, 4) == e.YEAR){
                if(e.YEAR_CLASS == "M"){
                    amt = Number(e.ALL_PJT_AMT);
                }else{
                    amt = Number(e.PJT_AMT);
                }
            }else if(["C"].includes(e.TEXT)){
                if(e.YEAR_CLASS == "M"){
                    amt = Number(e.ALL_PJT_AMT);
                }else{
                    amt = Number(e.PJT_AMT);
                }
            }else{
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
         * 엔지니어링 : 사용중지
         *
         * 알앤디/비알앤디
         * 수주년도 : 당해년도 사업비 - 차년도 매출액
         * 차년도 : 수주금액 + 전년도에 설정한 차년도 매출액
         * */
        let amt = 0;

        if((e.BUSN_CLASS == "D" || e.BUSN_CLASS == "V") && e.LIST_STR_DE != null && e.LIST_STR_DE.substring(0, 4) == e.YEAR){
            amt = Number(e.REAL_PJT_AMT);
        }else if(e.BUSN_CLASS == "R" || e.BUSN_CLASS == "S"){
            /** 수주년도/차년도 구분 */
            if(e.LIST_NOW_STR_DE != null && e.LIST_NOW_STR_DE.substring(0, 4) == e.YEAR){
                amt = Number(e.PJT_AMT) - Number(e.nowExpSaleAmt || 0);
            }else{
                amt = costCalc.allPjtAmt(e) + Number(e.befExpSaleAmt || 0);
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
         * 마감전 수주년도 : 투자금액
         * 수주년도 : 당해년도 비용
         * 차년도 : 총 수행계획금액 - 전년도 비용
         * 사업 종료 후 차년도 : 당해년도 비용
         * */
        let amt = 0;

        /** 수주년도/차년도 구분 */
        if(e.LIST_NOW_STR_DE != null && e.LIST_NOW_STR_DE.substring(0, 4) != e.YEAR){
            /** 종료유무 */
            if(e.COST_CLOSE_CK != null && e.COST_CLOSE_CK == "Y"){
                amt = Number(e.realUseAmt + e.realUseAmt2 + e.realUseAmt3);
            }else{
                amt = Number(e.DEV_INV_AMT || 0) - Number(e.befRealUseAmt + e.befRealUseAmt2 + e.befRealUseAmt3);
            }
        }else{
            /** 마감유무 */
            if(e.DEADLINE_YN != null && e.DEADLINE_YN == "Y"){
                amt = Number(e.realUseAmt + e.realUseAmt2 + e.realUseAmt3);
            }else{
                amt = Number(e.DEV_INV_AMT || 0);
            }
        }

        return amt;
    },

    /** 달성 매출액 */
    resSaleAmt: function(e){
        /**
         * 엔지니어링
         * 수주년도 : 0원
         * 차년도 : 정산서 마감이 되고 납품 저장 금액
         *
         * 알앤디/비알앤디
         * 수주년도 : 달성 매출액 = 지출완료금액(과세일시 나누기 1.1)
         * 차년도 : 전체 달성 매출액 - 전년도 달성 매출액
         * 
         * 공통 : 매출수익설정의 달성매출액 금액 추가
         * */
        let amt = 0;
        let asrAmt = 0;
        if(e.BUSN_CLASS == "D" || e.BUSN_CLASS == "V"){
            /** 종료유무 */
            if(e.LIST_NOW_END_DE != null && e.LIST_NOW_END_DE.substring(0, 4) == e.YEAR && e.COST_CLOSE_CK == "Y"){
                asrAmt = e.goodsTotAmt;
            }
        }else{
            /** 수주년도/차년도 구분 */
            if(e.LIST_NOW_STR_DE != null && e.LIST_NOW_STR_DE.substring(0, 4) == e.YEAR){
                if(e.TAX_GUBUN != null && e.TAX_GUBUN == "1"){
                    asrAmt = Number((e.exnpCompAmt * 10 / 11).toString().split(".")[0]);
                }else{
                    asrAmt = e.exnpCompAmt;
                }
            }else{
                if(e.TAX_GUBUN != null && e.TAX_GUBUN == "1"){
                    asrAmt = Number((e.exnpCompAmtAll * 10 / 11).toString().split(".")[0]) - Number(e.befExpSaleAmt || 0);
                }else{
                    asrAmt = e.exnpCompAmt;
                }
            }
        }
        amt = asrAmt + Number(e.pjtAmtSetData.AMT0 || 0);
        
        return amt;
    },

    /** 달성 운영수익 */
    resProfitAmt: function(e){
        /**
         * 엔지니어링
         * 사업종료 전 : 0원
         * 사업종료 후 : 달성매출액 - 비용
         *
         * 알앤디/비알앤디
         * 수주년도 : 수익설정 지출완료금액 + (비용설정 지출완료금액 * 직접비 수익율)
         * 차년도 : 수익설정 지출완료금액 + (비용설정 지출완료금액 * 직접비 수익율) - 전년도 운영수익
         * 사업종료 : 지출완료 합계 - 비용합계 - 전년도 운영수익
         * 
         * 공통 : 매출수익설정의 달성운영수익 금액 추가
         * */
        let amt = 0;
        let aopAmt = 0;
        if(e.BUSN_CLASS == "D" || e.BUSN_CLASS == "V"){
            let asrAmt = costCalc.resSaleAmt(e);
            if(asrAmt > 0){
                aopAmt = asrAmt - (Number(e.realUseAmt) + Number(e.realUseAmt2) + Number(e.realUseAmt3));
            }
        }else{
            /** 수주년도/차년도 구분 */
            if(e.LIST_NOW_STR_DE != null && e.LIST_NOW_STR_DE.substring(0, 4) == e.YEAR){
                /** 마감유무 */
                if(e.DEADLINE_YN != null && e.DEADLINE_YN == "Y"){
                    let allAsrAmt = 0;
                    if(e.TAX_GUBUN != null && e.TAX_GUBUN == "1"){
                        allAsrAmt = Number((e.exnpCompAmtAll * 10 / 11).toString().split(".")[0]);
                    }else{
                        allAsrAmt = e.exnpCompAmt;
                    }
                    aopAmt = costCalc.resSaleAmt(e) - (Number(e.realUseAmt) + Number(e.realUseAmt2) + Number(e.realUseAmt3));
                }else{
                    aopAmt = e.incpCompAmt1 + Math.floor(Number(e.incpCompAmt2) * costCalc.directProfitRate(e) / 100);
                }
            }else{
                /** 종료유무 */
                if(e.COST_CLOSE_CK != null && e.COST_CLOSE_CK == "Y"){
                    let allAsrAmt = 0;
                    if(e.TAX_GUBUN != null && e.TAX_GUBUN == "1"){
                        allAsrAmt = Number((e.exnpCompAmtAll * 10 / 11).toString().split(".")[0]);
                    }else{
                        allAsrAmt = e.exnpCompAmt;
                    }
                    aopAmt = allAsrAmt - (Number(e.allRealUseAmt) + Number(e.allRealUseAmt2) + Number(e.allRealUseAmt3)) - Number(e.befExpProfitAmt || 0);
                }else{
                    aopAmt = e.incpCompAmt1 + Math.floor(Number(e.incpCompAmt2) * costCalc.directProfitRate(e) / 100) - Number(e.nowBefExpProfitAmt || 0);
                }
            }
        }
        amt = aopAmt + Number(e.pjtAmtSetData.AMT1 || 0);
        
        return amt;
    },

    /** 예상 매출액 */
    devSaleAmt: function(e){
        /**
         * 엔지니어링
         * 마감전 수주년도 : 수주금액 - 차년도 매출액
         * 수주년도 : 0원
         * 차년도 : 전년도에 설정한 차년도 매출액
         * 사업 종료 후 차년도 : 0원
         *
         * 알앤디/비알앤디
         * 전체 : 예상매출 = 당해년도 사업비 - 달성 매출액
         * 사업 종료 : 0원
         *
         * 공통 : 매출수익설정의 예상 매출액 금액 추가
         * */
        let amt = 0;
        let devAmt = 0;
        if(e.BUSN_CLASS == "D" || e.BUSN_CLASS == "V"){
            /** 수주년도/차년도 구분 */
            if(e.LIST_NOW_END_DE != null && e.LIST_NOW_END_DE.substring(0, 4) == e.YEAR){
                /** 종료유무 */
                if(e.COST_CLOSE_CK != null && e.COST_CLOSE_CK == "Y"){
                    devAmt = 0;
                }else{
                    devAmt = Number(e.befExpSaleAmt || 0);
                }
            }else{
                /** 마감유무 */
                if(e.DEADLINE_YN != null && e.DEADLINE_YN == "Y"){
                    devAmt = 0;
                }else{
                    devAmt = costCalc.allPjtAmt(e) - Number(e.nowExpSaleAmt || 0);
                }
            }
        }else{
            /** 종료유무 */
            if(e.COST_CLOSE_CK != null && e.COST_CLOSE_CK == "Y"){
                devAmt = 0;
            }else{
                devAmt = costCalc.nowPjtAmt(e) - costCalc.resSaleAmt(e);
            }
        }
        amt = devAmt + Number(e.pjtAmtSetData.AMT2 || 0);

        return amt;
    },

    /** 예상 운영수익 */
    devProfitAmt: function(e){
        /**
         * 엔지니어링
         * 마감전 수주년도 : 총 수행계획금액 - 차년도 운영수익
         * 수주년도 : 0원
         * 차년도 : 전년도에 설정한 차년도 운영수익
         * 사업 종료 후 차년도 : 0원
         *
         * 알앤디/비알앤디
         * 마감전 수주년도 : 당해년도사업비 - 투자내역 - 달성운영수익 - 차년도운영수익
         * 수주년도 : 0원
         * 차년도 : 당해년도사업비 - 투자내역 - 달성운영수익 - 차년도운영수익
         * 사업 종료 후 차년도 : 0원
         *
         * 공통 : 매출수익설정의 예상 운영수익 금액 추가
         * */
        let amt = 0;
        let eopAmt = 0;
        if(e.BUSN_CLASS == "D" || e.BUSN_CLASS == "V"){
            /** 수주년도/차년도 구분 */
            if(e.LIST_NOW_END_DE != null && e.LIST_NOW_END_DE.substring(0, 4) == e.YEAR){
                /** 종료유무 */
                if(e.COST_CLOSE_CK != null && e.COST_CLOSE_CK == "Y"){
                    eopAmt = 0;
                }else{
                    eopAmt = Number(e.befExpProfitAmt || 0);
                }
            }else{
                /** 마감유무 */
                if(e.DEADLINE_YN != null && e.DEADLINE_YN == "Y"){
                    eopAmt = 0;
                }else{
                    eopAmt = costCalc.allPjtAmt(e) - Number(e.nowExpProfitAmt || 0);
                }
            }
        }else{
            /** 수주년도/차년도 구분 */
            if(e.LIST_NOW_STR_DE != null && e.LIST_NOW_STR_DE.substring(0, 4) == e.YEAR){
                /** 마감유무 */
                if(e.DEADLINE_YN != null && e.DEADLINE_YN == "Y"){
                    eopAmt = 0;
                }else{
                    let amt0 = costCalc.nowPjtAmt(e);
                    let amt1 = Number(e.DEV_INV_AMT || 0);
                    let amt2 = costCalc.resProfitAmt(e);
                    eopAmt = amt0 - amt1 - amt2 - Number(e.nowExpProfitAmt || 0);
                }
            }else{
                /** 종료유무 */
                if(e.COST_CLOSE_CK != null && e.COST_CLOSE_CK == "Y"){
                    eopAmt = 0;
                }else{
                    let amt0 = costCalc.nowPjtAmt(e);
                    let amt1 = Number(e.DEV_INV_AMT || 0);
                    let amt2 = costCalc.resProfitAmt(e);
                    eopAmt = amt0 - amt1 - amt2 + Number(e.befExpProfitAmt || 0);
                }
            }
        }
        amt = eopAmt + Number(e.pjtAmtSetData.AMT3 || 0);

        return amt;
    },

    /** 직접비 수익율 */
    directProfitRate: function(e){
        /** 
         * 예상 직접비 수익 : 수익/비용설정 시 비용 총계 - 수행계획 투자금액
         * 직접비 수익율 : 예상 직접비 수익 / 수익/비용설정 시 비용 총계 */
        let per = 0;
        const directAmt = Number(e.useAmt || 0);
        const invAmt = Number(e.DEV_INV_AMT || 0);
        const expAmt = directAmt - invAmt;

        if(directAmt == 0){
            per = 100;
        }else{
            per = (Number(expAmt / directAmt * 100).toFixed(1));
        }
        console.log("직접비 수익율 : ", per);

        return per;
    }
}