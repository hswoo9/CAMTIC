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
            /** 수주년도/차년도 구분 */
            if(e.LIST_NOW_STR_DE != null && e.LIST_NOW_END_DE != null && e.LIST_NOW_STR_DE.substring(0, 4) == e.LIST_NOW_END_DE.substring(0, 4)){
                amt = Number(e.PJT_AMT);
            }else if(e.LIST_NOW_END_DE != null && e.LIST_NOW_END_DE.substring(0, 4) == e.YEAR){
                amt = 0;
            }else{
                if(e.CNT == 0){
                    amt = Number(e.PJT_AMT);
                } else {
                    amt = 0;
                }
            }
        }else{
            if(["A", "B", "C"].includes(e.TEXT) && e.LIST_STR_DE != null && e.LIST_STR_DE.substring(0, 4) == e.YEAR){
                if(e.YEAR_CLASS == "M"){
                    amt = Number(e.ALL_PJT_AMT);
                }else{
                    amt = Number(e.PJT_AMT);
                }
            }/*else if(["C"].includes(e.TEXT)){
                if(e.YEAR_CLASS == "M"){
                    amt = Number(e.ALL_PJT_AMT);
                }else{
                    amt = Number(e.PJT_AMT);
                }
            }*/else{
                amt = 0;
            }
        }

        /** 협업일 때 수주금액 0원 */
        if(e.TEAM_STAT == "Y"){
            amt = 0;
        }
        return amt;
    },

    /** 당해년도 사업비 */
    nowPjtAmt: function(e){
        /**
         * 엔지니어링
         * 마감 전 : 수주금액 (협업: 배분금액)
         * 마감 후 수주년도 : 수주금액 (협업: 배분금액) - 차년도 매출액
         * 마감 후 차년도 : 당해년도 수주금액 (협업: 배분금액) + 전년도에 설정한 차년도 매출액
         * 사업종료 후 차년도 : 당해년도 수주금액 (협업: 배분금액) + 전년도에 설정한 차년도 매출액
         *
         * 알앤디/비알앤디
         * 마감 전 : 수주금액
         * 마감 후 수주년도 : 수주금액 - 차년도 매출액
         * 마감 후 차년도 : 수주금액 + 전년도에 설정한 차년도 매출액
         * 사업종료 후 차년도 : 수주금액 + 전년도에 설정한 차년도 매출액
         * */
        let amt = 0;

        if(e.BUSN_CLASS == "D" || e.BUSN_CLASS == "V"){
            /** 수주년도/차년도 구분 */
            if(e.LIST_NOW_STR_DE != null && e.LIST_NOW_END_DE != null && e.LIST_NOW_STR_DE.substring(0, 4) == e.LIST_NOW_END_DE.substring(0, 4)){
                amt = Number(e.REAL_PJT_AMT);
            }else if(e.LIST_NOW_END_DE != null && e.LIST_NOW_END_DE.substring(0, 4) == e.YEAR){
                /** 사업종료 유무 */
                if(e.COST_CLOSE_CK != null && e.COST_CLOSE_CK == "Y"){
                    amt = costCalc.allPjtAmt(e) + Number(e.befExpSaleAmt || 0);
                }else if(e.BEF_DEADLINE_YN == "Y"){
                    amt = costCalc.allPjtAmt(e) + Number(e.befExpSaleAmt || 0);
                }else{
                    amt = 0;
                }
            }else{
                /** 회계 마감 유무 */
                if(e.DEADLINE_YN != null && e.DEADLINE_YN == "Y"){
                    amt = amt = Number(e.REAL_PJT_AMT) - Number(e.nowExpSaleAmt || 0);
                }else{
                    amt = Number(e.REAL_PJT_AMT);
                }
            }

        }else if(e.BUSN_CLASS == "R" || e.BUSN_CLASS == "S"){
            /** 수주년도/차년도 구분 */
            if(e.LIST_NOW_STR_DE != null && e.LIST_NOW_END_DE != null && e.LIST_NOW_STR_DE.substring(0, 4) == e.LIST_NOW_END_DE.substring(0, 4)){
                if(e.COST_CLOSE_CK != null && e.COST_CLOSE_CK == "Y"){
                    amt = Number(e.REAL_PJT_AMT) + Number(e.befExpSaleAmt || 0);
                } else {
                    amt = Number(e.REAL_PJT_AMT);
                }
            } else if(e.LIST_NOW_STR_DE != null && e.LIST_NOW_STR_DE.substring(0, 4) == e.YEAR){
                /** 회계 마감 유무 */
                if(e.DEADLINE_YN != null && e.DEADLINE_YN == "Y"){
                    amt = Number(e.REAL_PJT_AMT) - Number(e.nowExpSaleAmt || 0);
                }else{
                    amt = Number(e.REAL_PJT_AMT);
                }
            }else{
                /** 전년도 회계 마감 여부 */
                if(e.BEF_DEADLINE_YN != null && e.BEF_DEADLINE_YN == "Y"){
                    amt = costCalc.allPjtAmt(e) + Number(e.befExpSaleAmt || 0);
                } else {
                    amt = 0;
                }
            }
        }else{
            amt = 0;
        }

        // if(e.TEAM_STAT == "Y"){
        //     amt = 0;
        // }

        return amt;
    },

    /** 수행계획 최신 Ver 투자금액 */
    nowInvAmt: function(e){
        /**
         * 마감 전 수주년도 : 투자금액 (수행계획금액)
         * 마감 후 수주년도 : 당해년도 비용
         * 마감 후 차년도 : 총 수행계획금액 - 전년도 비용
         * 사업 종료 후 차년도 : 당해년도 비용
         * */
        let amt = 0;

        /** 수주년도/차년도 구분 */
        if(e.LIST_NOW_STR_DE != null && e.LIST_NOW_END_DE != null && e.LIST_NOW_STR_DE.substring(0, 4) == e.LIST_NOW_END_DE.substring(0, 4)){
            /** 사업종료 유무 */
            if(e.COST_CLOSE_CK != null && e.COST_CLOSE_CK == "Y"){
                amt = Number(e.realUseAmt + e.realUseAmt2 + e.realUseAmt3);
            }else{
                amt = Number(e.DEV_INV_AMT || 0) - Number(e.befRealUseAmt + e.befRealUseAmt2 + e.befRealUseAmt3);
            }
        }else if(e.LIST_NOW_END_DE != null && e.LIST_NOW_END_DE.substring(0, 4) == e.YEAR){
            /** 사업종료 유무 */
            if(e.COST_CLOSE_CK != null && e.COST_CLOSE_CK == "Y"){
                amt = Number(e.realUseAmt + e.realUseAmt2 + e.realUseAmt3);
            }else if(e.BEF_DEADLINE_YN != null && e.BEF_DEADLINE_YN == "Y"){
                /** costInfoAdmin.global.invSumCost => 전년도 비용 합계 */
                amt = Number(e.DEV_INV_AMT || 0) - costInfoAdmin.global.invSumCost;
            }else{
                amt = 0;
            }
        }else{
            /** 사업종료 유무 */
            if(e.COST_CLOSE_CK != null && e.COST_CLOSE_CK == "Y"){
                amt = Number(e.realUseAmt + e.realUseAmt2 + e.realUseAmt3);
            }else {
                /** 전년도 회계마감 여부 */
                if(e.BEF_DEADLINE_YN != null && e.BEF_DEADLINE_YN == "Y"){
                    /** 프로젝트 시작년도 일치여부 확인 (CNT == 0; 시작년도) */
                    if(e.CNT != 0){
                        /** 회계 마감 여부 */
                        if(e.DEADLINE_YN != null && e.DEADLINE_YN == "Y"){
                            amt = Number(e.realUseAmt + e.realUseAmt2 + e.realUseAmt3);
                        } else {
                            amt = Number(e.DEV_INV_AMT) - Number(e.befRealUseAmt + e.befRealUseAmt2 + e.befRealUseAmt3);
                        }
                    } else {
                        amt = Number(e.realUseAmt + e.realUseAmt2 + e.realUseAmt3);
                    }
                }else{
                    /** 프로젝트 시작년도 일치여부 확인 (CNT == 0; 시작년도) */
                    if(e.CNT == 0){
                        /** 회계 마감 여부 */
                        if(e.DEADLINE_YN != null){
                            amt = Number(e.realUseAmt + e.realUseAmt2 + e.realUseAmt3);
                        } else {
                            amt = Number(e.DEV_INV_AMT);
                        }
                    } else {
                        amt = 0;
                        // amt = Number(e.DEV_INV_AMT)
                    }
                }
            }
        }

        /** 전년도 비용 합계 (마지막년도 제외) */
        if(e.CNT != e.LEN){
            costInfoAdmin.global.invSumCost += amt;
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
         * 마감 전 수주년도 : 총 지출완료금액 (과세; 나누기 1.1)
         * 마감 후 수주년도 : 당해년도 지출완료 합계 (과세; 나누기 1.1)
         * 마감 후 차년도 : 총 지출완료금액 - 전년도 달성 매출액
         * 사업 종료 후 차년도 : 총 지출완료금액 - 전년도 달성 매출액
         * 
         * 공통 : 매출수익설정의 달성매출액 금액 추가
         * */
        let amt = 0;
        let asrAmt = 0;
        if(e.BUSN_CLASS == "D" || e.BUSN_CLASS == "V"){
            /** 사업종료 유무 */
            if(e.LIST_NOW_END_DE != null && e.LIST_NOW_END_DE.substring(0, 4) == e.YEAR && e.COST_CLOSE_CK == "Y"){
                asrAmt = e.goodsTotAmt;
            }
        }else{
            /** 수주년도/차년도 구분 */
            if(e.LIST_NOW_STR_DE != null && e.LIST_NOW_END_DE != null && e.LIST_NOW_STR_DE.substring(0, 4) == e.LIST_NOW_END_DE.substring(0, 4)){
                /** 사업종료 유무 */
                if(e.COST_CLOSE_CK != null && e.COST_CLOSE_CK == "Y"){
                    if(e.TAX_GUBUN != null && e.TAX_GUBUN == "1"){
                        asrAmt = Number((e.exnpCompAmtAll * 10 / 11).toString().split(".")[0]) - Number(e.nowBefExpSaleAmt || 0);
                    }else{
                        asrAmt = e.exnpCompAmtAll - Number(e.nowBefExpSaleAmt || 0);
                    }
                }else{
                    asrAmt = e.exnpCompAmt;
                }
            } else if(e.LIST_NOW_STR_DE != null && e.LIST_NOW_STR_DE.substring(0, 4) == e.YEAR){
                /** 회계 마감 유무 */
                if(e.DEADLINE_YN != null && e.DEADLINE_YN == "Y"){
                    if(e.TAX_GUBUN != null && e.TAX_GUBUN == "1"){
                        asrAmt = Number((e.exnpCompAmt * 10 / 11).toString().split(".")[0]);
                    }else{
                        asrAmt = e.exnpCompAmt;
                    }
                }else{
                    if(e.TAX_GUBUN != null && e.TAX_GUBUN == "1"){
                        asrAmt = Number((e.exnpCompAmtAll * 10 / 11).toString().split(".")[0]);
                    }else{
                        asrAmt = e.exnpCompAmtAll;
                    }
                }
            }else{
                /** 전년도 회계 마감 유무 */
                if(e.BEF_DEADLINE_YN != null && e.BEF_DEADLINE_YN == "Y"){
                    if(e.TAX_GUBUN != null && e.TAX_GUBUN == "1"){
                        asrAmt = Number((e.exnpCompAmtAll * 10 / 11).toString().split(".")[0]) - Number(e.nowBefExpSaleAmt || 0);
                    }else{
                        asrAmt = e.exnpCompAmtAll - Number(e.nowBefExpSaleAmt || 0);
                    }
                } else {
                    asrAmt = 0;
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
         * 마감 전 수주년도 : (전체 수익설정 지출완료금액) + (전체 비용설정 지출완료금액 * 직접비수익율)
         * 마감 후 수주년도 : (전체 수익설정 지출완료금액) + 직접비수익액(달성매출액 - 전체 수익설정 지출완료금액 - 당해년도 비용)
         * 마감 후 차년도 : (전체 수익설정 지출완료금액) + (전체 비용설정 지출완료금액 * 직접비수익율) - 전년도 운영수익
         * 사업종료 후 차년도 : 총 지출완료금액 - 전체년도 비용합계 - 전년도 운영수익
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
            if(e.LIST_NOW_STR_DE != null && e.LIST_NOW_END_DE != null && e.LIST_NOW_STR_DE.substring(0, 4) == e.LIST_NOW_END_DE.substring(0, 4)){
                /** 사업종료 유무 */
                if(e.COST_CLOSE_CK != null && e.COST_CLOSE_CK == "Y"){
                    let allAsrAmt = 0;
                    if(e.TAX_GUBUN != null && e.TAX_GUBUN == "1"){
                        allAsrAmt = Number((e.exnpCompAmtAll * 10 / 11).toString().split(".")[0]);
                    }else{
                        allAsrAmt = e.exnpCompAmtAll;
                    }
                    aopAmt = allAsrAmt
                        - (
                            Number(e.allRealUseAmt) + Number(e.allRealUseAmt2) + Number(e.allRealUseAmt3)
                            + Number(e.realUseAmt) + Number(e.realUseAmt2) + Number(e.realUseAmt3)
                        )
                        - Number(e.nowBefExpProfitAmt || 0)
                    ;
                }else{
                    aopAmt = e.incpCompAmt1 + Math.floor(Number(e.incpCompAmt2) * costCalc.directProfitRate(e) / 100) - Number(e.nowBefExpProfitAmt || 0);
                }
            }else if(e.LIST_NOW_STR_DE != null && e.LIST_NOW_STR_DE.substring(0, 4) == e.YEAR){
                /** 회계 마감 유무 */
                if(e.DEADLINE_YN != null && e.DEADLINE_YN == "Y"){
                    aopAmt = costCalc.resSaleAmt(e) - (Number(e.realUseAmt) + Number(e.realUseAmt2) + Number(e.realUseAmt3));
                }else{
                    aopAmt = e.incpCompAmt1 + Math.floor(Number(e.incpCompAmt2) * costCalc.directProfitRate(e) / 100);
                }
            }else{
                /** 사업종료 유무 */
                if(e.COST_CLOSE_CK != null && e.COST_CLOSE_CK == "Y"){
                    let allAsrAmt = 0;
                    if(e.TAX_GUBUN != null && e.TAX_GUBUN == "1"){
                        allAsrAmt = Number((e.exnpCompAmtAll * 10 / 11).toString().split(".")[0]);
                    }else{
                        allAsrAmt = e.exnpCompAmtAll;
                    }
                    aopAmt = allAsrAmt
                        - (
                            Number(e.allRealUseAmt) + Number(e.allRealUseAmt2) + Number(e.allRealUseAmt3)
                            + Number(e.realUseAmt) + Number(e.realUseAmt2) + Number(e.realUseAmt3)
                        )
                        - Number(e.nowBefExpProfitAmt || 0)
                    ;
                }else{
                    /** 전년도 회계 마감 유무 */
                    if(e.BEF_DEADLINE_YN != null && e.BEF_DEADLINE_YN == "Y"){
                        aopAmt = e.incpCompAmt1 + Math.floor(Number(e.incpCompAmt2) * costCalc.directProfitRate(e) / 100) - Number(e.nowBefExpProfitAmt || 0);
                    } else {
                        aopAmt = 0;
                    }
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
         * 마감 전 수주년도 : 수주금액(협업: 배분금액) - 차년도 매출액
         * 마감 후 수주년도 : 0원
         * 마감 후 차년도 : 전년도에 설정한 차년도 매출액
         * 사업 종료 후 차년도 : 0원
         *
         * 알앤디/비알앤디
         * 마감 전 수주년도 : 당해년도 사업비 - 차년도매출액 - 달성 매출액
         * 마감 후 수주년도 : 당해년도 사업비 - 달성 매출액
         * 마감 후 차년도 : 당해년도 사업비 - 달성 매출액
         * 사업 종료 후 차년도 : 0원
         *
         * 공통 : 매출수익설정의 예상 매출액 금액 추가
         * */
        let amt = 0;
        let devAmt = 0;
        if(e.BUSN_CLASS == "D" || e.BUSN_CLASS == "V"){
            /** 수주년도/차년도 구분 */
            if(e.LIST_NOW_STR_DE != null && e.LIST_NOW_END_DE != null && e.LIST_NOW_STR_DE.substring(0, 4) == e.LIST_NOW_END_DE.substring(0, 4)){
                /** 사업종료 유무 */
                if(e.COST_CLOSE_CK != null && e.COST_CLOSE_CK == "Y"){
                    devAmt = 0;
                }else{
                    devAmt = Number(e.REAL_PJT_AMT) - Number(e.befExpSaleAmt || 0);
                }
            }else if(e.LIST_NOW_END_DE != null && e.LIST_NOW_END_DE.substring(0, 4) == e.YEAR){
                /** 사업종료 유무 */
                if(e.COST_CLOSE_CK != null && e.COST_CLOSE_CK == "Y"){
                    devAmt = 0;
                }else{
                    devAmt = Number(e.befExpSaleAmt || 0);
                }
            }else{
                /** 회계 마감 유무 */
                if(e.DEADLINE_YN != null && e.DEADLINE_YN == "Y"){
                    devAmt = 0;
                }else{
                    /** TEAM_CK == Y ; 수주부서 */
                    if(e.TEAM_CK == "Y") {
                        devAmt = costCalc.nowPjtAmt(e) - Number(e.nowExpSaleAmt || 0);
                    } else {
                        /** TEAM_STAT == Y ; 협업 */
                        if(e.TEAM_STAT == "Y") {
                            devAmt = costCalc.nowPjtAmt(e) - Number(e.nowExpSaleAmt || 0);
                        } else {
                            devAmt = costCalc.allPjtAmt(e) - Number(e.nowExpSaleAmt || 0);
                        }
                    }
                }
            }
        }else{
            /** 수주년도/차년도 구분 */
            if(e.LIST_NOW_STR_DE != null && e.LIST_NOW_END_DE != null && e.LIST_NOW_STR_DE.substring(0, 4) == e.LIST_NOW_END_DE.substring(0, 4)){
                /** 사업종료 유무 */
                if(e.COST_CLOSE_CK != null && e.COST_CLOSE_CK == "Y"){
                    devAmt = 0;
                }else{
                    devAmt = costCalc.nowPjtAmt(e) - costCalc.resSaleAmt(e) - Number(e.nowExpSaleAmt || 0);
                }
            } else if(e.LIST_NOW_STR_DE != null && e.LIST_NOW_STR_DE.substring(0, 4) == e.YEAR){
                /** 회계 마감 유무 */
                if(e.DEADLINE_YN != null && e.DEADLINE_YN == "Y"){
                    devAmt = costCalc.nowPjtAmt(e) - costCalc.resSaleAmt(e);
                }else{
                    devAmt = costCalc.nowPjtAmt(e) - Number(e.nowExpSaleAmt || 0) - costCalc.resSaleAmt(e);
                }
            }else{
                /** 사업종료 유무 */
                if(e.COST_CLOSE_CK != null && e.COST_CLOSE_CK == "Y"){
                    devAmt = 0;
                }else{
                    /** 전년도 회계 마감 유무 */
                    if(e.BEF_DEADLINE_YN != null && e.BEF_DEADLINE_YN == "Y"){
                        devAmt = costCalc.nowPjtAmt(e) - costCalc.resSaleAmt(e);
                    } else {
                        devAmt = Number(e.befExpSaleAmt || 0);
                    }
                }
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
         * 마감 전 수주년도 : 당해년도 사업비 - 차년도 운영수익 - 총 수행계획금액 - 달성운영수익
         * 마감 후 수주년도 : 0원
         * 마감 후 차년도 : 당해년도 사업비 - 당해년도 수행계획금액 - 당해년도 달성운영수익
         * 사업 종료 후 차년도 : 0원
         *
         * 공통 : 매출수익설정의 예상 운영수익 금액 추가
         * */
        let amt = 0;
        let eopAmt = 0;
        if(e.BUSN_CLASS == "D" || e.BUSN_CLASS == "V"){
            /** 수주년도/차년도 구분 */
            if(e.LIST_NOW_STR_DE != null && e.LIST_NOW_END_DE != null && e.LIST_NOW_STR_DE.substring(0, 4) == e.LIST_NOW_END_DE.substring(0, 4)){
                /** 사업종료 유무 */
                if(e.COST_CLOSE_CK != null && e.COST_CLOSE_CK == "Y"){
                    eopAmt = 0;
                }else{
                    eopAmt = Number(e.REAL_PJT_AMT) - Number(e.DEV_INV_AMT || 0) -  Number(e.befExpProfitAmt || 0);
                }
            }else if(e.LIST_NOW_END_DE != null && e.LIST_NOW_END_DE.substring(0, 4) == e.YEAR){
                /** 사업종료 유무 */
                if(e.COST_CLOSE_CK != null && e.COST_CLOSE_CK == "Y"){
                    eopAmt = 0;
                }else{
                    eopAmt = Number(e.befExpProfitAmt || 0);
                }
            }else{
                /** 회계 마감 유무 */
                if(e.DEADLINE_YN != null && e.DEADLINE_YN == "Y"){
                    eopAmt = 0;
                }else{
                    /** TEAM_CK == Y ; 수주부서 */
                    if(e.TEAM_CK == "Y") {
                        eopAmt = costCalc.nowPjtAmt(e) - costCalc.nowInvAmt(e) - Number(e.nowExpProfitAmt || 0);
                    } else {
                        /** TEAM_STAT == Y ; 협업 */
                        if(e.TEAM_STAT == "Y") {
                            eopAmt = costCalc.nowPjtAmt(e) - costCalc.nowInvAmt(e) - Number(e.nowExpProfitAmt || 0);
                        } else {
                            /** 전년도 회계 마감 여부 */
                            if(e.BEF_DEADLINE_YN != null && e.BEF_DEADLINE_YN == "Y") {
                                eopAmt = 0;
                            } else {
                                eopAmt = costCalc.allPjtAmt(e) - costCalc.nowInvAmt(e) - Number(e.nowExpProfitAmt || 0);
                            }
                        }
                    }
                }
            }
        }else{
            /** 수주년도/차년도 구분 */
            if(e.LIST_NOW_STR_DE != null && e.LIST_NOW_END_DE != null && e.LIST_NOW_STR_DE.substring(0, 4) == e.LIST_NOW_END_DE.substring(0, 4)){
                /** 사업종료 유무 */
                if(e.COST_CLOSE_CK != null && e.COST_CLOSE_CK == "Y"){
                    eopAmt = 0;
                }else{
                    let amt0 = costCalc.nowPjtAmt(e);               // 당해년도 사업비
                    let amt1 = Number(e.DEV_INV_AMT || 0);          // 수행계획금액
                    let amt2 = costCalc.resProfitAmt(e);            // 달성 운영수익
                    eopAmt = amt0 - amt1 - amt2 - Number(e.nowExpProfitAmt || 0);
                }

            } else if(e.LIST_NOW_STR_DE != null && e.LIST_NOW_STR_DE.substring(0, 4) == e.YEAR){
                /** 회계 마감 유무 */
                if(e.DEADLINE_YN != null && e.DEADLINE_YN == "Y"){
                    eopAmt = 0;
                }else{
                    let amt0 = costCalc.nowPjtAmt(e);
                    let amt1 = Number(e.DEV_INV_AMT || 0);
                    let amt2 = costCalc.resProfitAmt(e);
                    // 당해년도사업비 - 수행계획금액 - 달성운영수익 - 차년도 운영수익
                    eopAmt = amt0 - amt1 - amt2 - Number(e.nowExpProfitAmt || 0);
                }
            }else{
                /** 사업종료 유무 */
                if(e.COST_CLOSE_CK != null && e.COST_CLOSE_CK == "Y"){
                    eopAmt = 0;
                }else{
                    /** 사업종료 유무 */
                    if(e.COST_CLOSE_CK != null && e.COST_CLOSE_CK == "Y"){
                        eopAmt = 0;
                    }else{
                        /** 전년도 회계 마감 여부 */
                        if(e.BEF_DEADLINE_YN != null && e.BEF_DEADLINE_YN == "Y"){
                            let amt0 = costCalc.nowPjtAmt(e);
                            let amt1 = costCalc.nowInvAmt(e);
                            let amt2 = costCalc.resProfitAmt(e);
                            eopAmt = amt0 - amt1 - amt2;
                        } else {
                            eopAmt = Number(e.befExpProfitAmt || 0);
                        }
                    }
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
            per = Math.floor((expAmt / directAmt * 100) * 100000) / 100000;
        }
        console.log("직접비 수익율 : ", per);

        return per;
    }
}