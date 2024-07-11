var costInfo = {

    global : {
        searchAjaxData2 : "",
        searchAjaxData3 : "",
        searchAjaxData4 : ""
    },

    fn_defaultScript : function (){
        const pjtSn = $("#pjtSn").val();
        commonProject.setPjtStat();
        costInfo.pageSet();
        costInfo.dataSet(pjtSn);
        costInfoGrid.gridReload(pjtSn);
    },

    pageSet(){
        if(commonProject.global.teamYn == null || commonProject.global.teamYn != "N"){
            return;
        }
        const pjtSn = $("#pjtSn").val();
        const result = customKendo.fn_customAjax("/project/getTeamPjtList", {pjtSn: pjtSn});
        const list = result.list;
        console.log(list);

        if(list.length > 1){
            const arr = [];
            for(let i=0; i<list.length; i++){
                const map = list[i];
                const data = {
                    label: map.DEPT_NAME,
                    value: map.PJT_SN
                };
                arr.push(data);
            }

            $("#costInfoDiv").show();

            customKendo.fn_radioGroup("costPjtClass", arr, "horizontal");
            $("#costPjtClass").data("kendoRadioGroup").value(pjtSn);

            $("#costPjtClass").data("kendoRadioGroup").bind("change", function(){
                costInfo.dataSet($("#costPjtClass").data("kendoRadioGroup").value());
                costInfoGrid.gridReload($("#costPjtClass").data("kendoRadioGroup").value());
            })
        }
    },

    dataSet(pjtSn){
        const result = customKendo.fn_customAjax("/project/engn/getDelvData", {pjtSn: pjtSn});
        const pjtMap = result.map;
        console.log("pjtMap", pjtMap);

        /** 사업정보 */
        costInfo.step1(pjtMap);

        /** 재무실적내역 */
        costInfo.step2(pjtMap);

        if(commonProject.global.busnClass == "R" || commonProject.global.busnClass == "S"){
            const e = customKendo.fn_customAjax("/project/getProjectStep", {pjtSn: pjtSn}).rs;
            if(e.YEAR_CLASS == "M" && e.PJT_CD != null && e.PARENT_PJT_SN == null){
                $(".multiUi").show();
            }
        }
    },

    step1(pjtMap){
        const pjtSn = $("#pjtSn").val();
        const tmYn = pjtMap.TM_YN;

        $("#busnNm").val(pjtMap.BUSN_NM);
        if(tmYn != "Y"){
            $("#PJT_TYPE").text("수주");
        }else{
            $("#PJT_TYPE").text("협업");
        }
        $("#PJT_CD").text(pjtMap.PJT_CD);
        $("#PJT_CD2").text(pjtMap.PJT_CD);
        $("#PJT_NM").text(pjtMap.PJT_NM);
        $("#PM").text(pjtMap.PM);
        $("#PJT_STR_DT").text(pjtMap.PJT_START_DT);
        $("#PJT_END_DT").text(pjtMap.PJT_EXP_END_DT);
        $("#PJT_AMT").text(fn_numberWithCommas(pjtMap.PJT_AMT));

        if(pjtMap.PM_EMP_SEQ != null){
            const pmInfo = getUser(pjtMap.PM_EMP_SEQ);
            if(pmInfo != null){
                $("#PM_DEPT").text(pmInfo.deptNm);
                $("#PM_TEAM").text(pmInfo.teamNm);
            }
        }

        let sbjText = "미사용";
        if(pjtMap.SBJ_SEP != undefined){
            if(pjtMap.SBJ_SEP == "Y"){
                sbjText = "사용 / ";
                var data = {
                    pjtSn: pjtSn
                }
                let result = customKendo.fn_customAjax("/projectRnd/getAccountInfo", data);
                $("#checkboxDiv").show();
                for(let i=0; i<result.list.length; i++){
                    sbjText += result.list[i].IS_TYPE;
                }
            }
        }
        $("#SBJ_SEP").text(sbjText);
    },

    step2(){
        const pjtSn = $("#pjtSn").val();

        /** 수행계획, 결과보고 체크해서 정산서에 뿌려줄내용 체크 */
        const result = customKendo.fn_customAjax("/project/getPjtCostData", {pjtSn: pjtSn});
        const data = result.data;
        const e = data;

        if(e.YEAR_CLASS = "M"){
            $("#PJT_AMT2").text(comma(e.ALL_PJT_AMT));
        } else {
            $("#PJT_AMT2").text(comma(e.PJT_AMT));
        }

        $("#RES_AMT").text(comma(Number(e.exnpCompAmt || 0) - Number(e.befExpSaleAmt || 0) - Number(e.aftSaleAmt || 0)));
        $("#RES_NOT_INV_AMT").text(comma(Number(e.incpCompAmt || 0) - Number(e.befExpProfitAmt || 0) - Number(e.aftProfitAmt || 0)));
        $("#DEV_AMT").text(comma(Number(Number(e.PJT_AMT || 0) - Number(e.exnpCompAmt || 0) - Number(e.befExpSaleAmt || 0) - Number(e.aftSaleAmt || 0))));
        $("#DEV_NOT_INV_AMT").text(comma(Number(e.PJT_AMT || 0) - Number(e.INV_AMT || 0) - Number(e.incpCompAmt || 0) - Number(e.befExpProfitAmt || 0) - Number(e.aftProfitAmt || 0)));

        console.log(Number(e.INV_AMT || 0));
        console.log(Number(e.incpCompAmt || 0));
        console.log(Number(e.befExpProfitAmt || 0));
        console.log(Number(e.aftProfitAmt || 0));
    },

    step2Bak(pjtMap){
        const pjtSn = $("#pjtSn").val();

        /** 수행계획, 결과보고 체크해서 정산서에 뿌려줄내용 체크 */
        const devResult = customKendo.fn_customAjax("/project/engn/getDevData", {pjtSn: pjtSn, lastCk: "Y"});
        const resResult = customKendo.fn_customAjax("/project/engn/getResultInfo", {pjtSn: pjtSn});
        let type = "";

        const devMap = devResult.rs;
        const resMap = resResult.result.map;
        if(resMap == null && devMap != null){
            type = "dev";
        }else if(resMap != null){
            type = "res";
        }else{
            type = "delv";
        }

        const pjtAmt = pjtMap.PJT_AMT;
        const tmYn = pjtMap.TM_YN;

        /** 엔지니어링/용역/기타*/
        if(pjtMap.BUSN_CLASS == "D" || pjtMap.BUSN_CLASS == "V" || pjtMap.BUSN_CLASS == "R" || pjtMap.BUSN_CLASS == "S"){

            if(type == "res"){

                /** 구매/비용내역 */
                const resPurcResult = customKendo.fn_customAjax("/purc/getPurcReqClaimList.do", {pjtSn: pjtSn});
                /** 출장/비용내역 */
                const tripResult = customKendo.fn_customAjax("/bustrip/getProjectBustList", {pjtSn: pjtSn});
                let resInvSum = 0;
                const resPurcList = resPurcResult.list;
                for(let i=0; i<resPurcList.length; i++){
                    const map = resPurcList[i];
                    if(map.CLAIM_STATUS == "CAYSY"){
                        resInvSum += Number(map.PURC_ITEM_AMT_SUM);
                    }
                }
                const bustList = tripResult.list;
                for(let i=0; i<bustList.length; i++){
                    const bustMap = bustList[i];
                    if(bustMap.RS_STATUS == "100"){
                        resInvSum  += Number(bustMap.RES_EXNP_SUM);
                    }
                }

                $("#PJT_AMT2").text(comma(pjtAmt));
                $("#RES_AMT").text(comma(pjtAmt));
                $("#RES_NOT_INV_AMT").text(comma(Number(pjtAmt)-resInvSum));
                $("#DEV_AMT").text(comma(0));
                $("#DEV_NOT_INV_AMT").text(comma(0));

            }else if(type == "dev"){

                /** 투자내역 */
                const purcResult = customKendo.fn_customAjax("/project/getInvList", {devSn: devMap.DEV_SN});
                const purcList = purcResult.list;
                let invSum = 0;
                for(let i=0; i<purcList.length; i++){
                    const map = purcList[i];
                    invSum += Number(map.EST_TOT_AMT);
                }

                $("#PJT_AMT2").text(comma(pjtAmt));
                $("#RES_AMT").text(comma(0));
                $("#RES_NOT_INV_AMT").text(comma(0));
                $("#DEV_AMT").text(comma(Number(pjtAmt)-invSum));
                $("#DEV_NOT_INV_AMT").text(comma(Number(pjtAmt)-invSum));

            }else{

                $("#PJT_AMT2").text(comma(pjtAmt));
                $("#RES_AMT").text(comma(0));
                $("#RES_NOT_INV_AMT").text(comma(0));
                $("#DEV_AMT").text(comma(0));
                $("#DEV_NOT_INV_AMT").text(comma(0));
            }
        }
    }
}