var setTeamPjt = {

    global : {
        pjtCode : "",
        supDep : "",
        supDepSub : "",
        pjtStat : "",
        pjtStatSub : ""
    },
    
    fn_defaultScript: function (){
        setTeamPjt.fn_setData();
    },

    fn_setData : function (){
        var parameters = {
            pjtSn : $("#pjtSn").val()
        }

        var pjtInfo = customKendo.fn_customAjax("/project/getProjectInfo", parameters);
        var result = customKendo.fn_customAjax("/project/engn/getDelvData", parameters);
        var rndResult = customKendo.fn_customAjax("/projectRnd/getRndDetail", parameters);
        var unRndResult = customKendo.fn_customAjax("/projectUnRnd/getUnRndDetail", parameters);
        var pjtMap = pjtInfo.map;
        var delvMap = result.delvMap;
        var rndMap = rndResult.map;
        var unRndMap = unRndResult.map;
        console.log(pjtMap);
        console.log(delvMap);

        $("#pjtCd").text(pjtMap.PJT_TMP_CD);
        $("#busnName").text(pjtMap.BUSN_NM);
        const pjtCd = pjtMap.PJT_TMP_CD;
        if(pjtCd != null){
            const pjtCode = pjtCd.substring(0, 1);
            setTeamPjt.global.pjtCode = pjtCode;
            const supDep = pjtCd.substring(1, 2);
            setTeamPjt.global.supDep = supDep;
            const supDepSub = pjtCd.substring(2, 3);
            setTeamPjt.global.supDepSub = supDepSub;
            const pjtStat = pjtCd.substring(3, 4);
            setTeamPjt.global.pjtStat = pjtStat;
            const pjtStatSub = pjtCd.substring(4, 5);
            setTeamPjt.global.pjtStatSub = pjtStatSub;
            const lgCodeDs = customKendo.fn_customAjax("/project/selLgCode", {
                grpSn : "SUP_DEP"
            }).rs;
            for(let i=0; i<lgCodeDs.length; i++){
                const map = lgCodeDs[i];
                if(map.LG_CD == supDep){
                    $("#supDepName").text(map.LG_CD_NM);
                }
            }

            const smCodeDs = customKendo.fn_customAjax("/project/selSmCode", {
                lgCd : supDep,
                grpSn : "SUP_DEP"
            }).rs;
            for(let i=0; i<smCodeDs.length; i++){
                const map = smCodeDs[i];
                if(map.PJT_CD == supDepSub){
                    $("#supDepSubName").text(map.PJT_CD_NM);
                }
            }

            const lgCodeDs2 = customKendo.fn_customAjax("/project/selLgCode", {
                grpSn : "BUS_STAT"
            }).rs;
            for(let i=0; i<lgCodeDs2.length; i++){
                const map = lgCodeDs2[i];
                if(map.LG_CD == pjtStat){
                    $("#pjtStatName").text(map.LG_CD_NM);
                }
            }

            const smCodeDs2 = customKendo.fn_customAjax("/project/selSmCode", {
                lgCd : pjtStat,
                grpSn : "BUS_STAT"
            }).rs;
            for(let i=0; i<smCodeDs2.length; i++){
                const map = smCodeDs2[i];
                if(map.PJT_CD == pjtStatSub){
                    $("#pjtStatSubName").text(map.PJT_CD_NM);
                }
            }
        }

        $("#pjtNm").text(pjtMap.PJT_NM);
        if(pjtMap.BUSN_CLASS == "D" && delvMap != null){
            $("#strDt").text(delvMap.PJT_STR_DT);
            $("#endDt").text(delvMap.PJT_END_DT);
            $("#pmNm").text(delvMap.PM_EMP_NM);
        }else if(pjtMap.BUSN_CLASS == "R"){
            $("#strDt").text(pjtMap.PJT_START_DT);
            $("#endDt").text(pjtMap.PJT_END_DT);
            $("#pmNm").text(rndMap.MNG_EMP_NAME);
        }else if(pjtMap.BUSN_CLASS == "S"){
            $("#strDt").text(pjtMap.PJT_START_DT);
            $("#endDt").text(pjtMap.PJT_END_DT);
            $("#pmNm").text(unRndMap.MNG_EMP_NAME);
        }
        $("#url").html("<a href='javascript:void(0);' style='font-weight: bold' onclick='camPrj.fn_projectPopView("+pjtMap.PJT_SN+", \"" + pjtMap.BUSN_CLASS + "\")'>" + pjtMap.PJT_NM + "</a>");

        const teamVersionSn = $("#teamVersionSn").val();
        setTeamPjt.fn_setTeamTable(teamVersionSn);
    },

    fn_setTeamTable: function(teamVersionSn){
        const data = {
            pjtSn: $("#pjtSn").val(),
            teamVersionSn: teamVersionSn
        }
        const result = customKendo.fn_customAjax("/project/engn/getDelvData", data);
        const pjtMap = result.map;
        const delvMap = result.delvMap;
        const setParameters = customKendo.fn_customAjax("/project/getProjectStep", data).rs;
        const verList = customKendo.fn_customAjax("/project/team/getTeamVersion", data).list;

        const teamList = customKendo.fn_customAjax("/project/team/getTeamList", data).list;
        const myMap = teamList[0];
        const leftResult = customKendo.fn_customAjax("/project/team/getVerLeftAmt", data);
        const leftMap = leftResult.data;

        let amtText = "";
        if(pjtMap.PJT_STEP < "E3" && delvMap != null){
            amtText = comma(delvMap.DELV_AMT);
        }else if(pjtMap.PJT_STEP >= "E3"){
            amtText = comma(pjtMap.PJT_AMT);
        }else{
            amtText = comma(setParameters.EXP_AMT);
        }

        /** 총예산 */
        const delvAmt = uncomma(amtText);

        /** 협업 예산 */
        const leftAmt = leftMap.TM_AMT_SUM;

        /** 자가 배분금액 */
        const myAmt = Number(delvAmt) - Number(leftAmt);

        /** 자가 배분비율 */
        const myPer = Math.round(Number(myAmt) / Number(delvAmt) * 100) + "%";

        /** 자가 예상수익 */
        let myIncomePer;

        if(myAmt == 0){
            myIncomePer = 0 + "%";
        }else{
            myIncomePer = Math.round(100 - Number(myMap.TM_INV_AMT / uncomma(myAmt) * 100)) + "%";
        }

        $("#myTmSn").val(myMap.TM_SN);

        /** 자가 정보 */
        let html = '';
        html += '<tr>';

        /** 구분 */
        html += '    <td style="text-align: center"><span>자가</span></td>';
        /** 팀 */
        html += '    <td style="text-align: center"><span>'+commonProject.getDept(myMap.TM_PM_SEQ)+'</span></td>';
        /** 담당자(PM) */
        html += '    <td style="text-align: center"><span>'+commonProject.getName(myMap.TM_PM_SEQ)+'</span></td>';
        /** 총예산 */
        html += '    <td id="nowTotalAmt'+myMap.TM_SN+'" style="text-align: right"><span>'+comma(delvAmt)+'</td>';
        /** 배분금액(매출) */
        html += '    <td style="text-align: right"><span>'+comma(myAmt)+'</span></td>';
        /** 배분비율 */
        html += '    <td style="text-align: right"><span>'+myPer+'</span></td>';
        /** 예상비용 */
        html += '    <td style="text-align: right"><span id="myIncomePer_'+myMap.TM_SN+'">'+comma(myMap.TM_INV_AMT)+'</span></td>';
        /** 예상수익 */
        html += '    <td style="text-align: right"><span id="myIncomePer_'+myMap.TM_SN+'">'+myIncomePer+'</span></td>';

        /** PM */
        html += '    <td style="text-align: center"><span>승인</span></td>';
        /** 팀장 */
        html += '    <td style="text-align: center"><span>'+(myMap.TEAM_CK == "Y" ? "승인" : "미승인")+'</span></td>';
        html += '</tr>';
        $("#detailRow").append(html);

        customKendo.fn_textBox(["myInvAmt_"+myMap.TM_SN]);

        /** 협업 정보 */
        for(let i=1; i<teamList.length; i++){
            const teamMap = teamList[i];
            html = '';
            html += '<tr>';
            /** 구분 */
            html += '    <td style="text-align: center"><spa>협업</span></td>';
            /** 팀 */
            html += '    <td style="text-align: center"><spa>'+commonProject.getDept(teamMap.TM_PM_SEQ)+'</span></td>';
            /** 담당자(PM) */
            html += '    <td style="text-align: center"><spa>'+commonProject.getName(teamMap.TM_PM_SEQ)+'</span></td>';
            /** 총예산 */
            html += '    <td style="text-align: right"><spa>-</td>';
            /** 배분금액(매출) */
            html += '    <td style="text-align: right"><spa>'+comma(teamMap.TM_AMT)+'</span></td>';
            const teamAmt = teamMap.TM_AMT;
            const teamPer = (100 - Math.round(100 - Number(teamAmt) / Number(delvAmt) * 100)) + "%";
            /** 배분비율 */
            html += '    <td style="text-align: right"><spa>'+teamPer+'</span></td>';
            /** 예상비용 */
            html += '    <td style="text-align: right"><spa>'+comma(teamMap.TM_INV_AMT)+'</span></td>';
            const teamInvAmt = teamMap.TM_INV_AMT;
            const teamIncomePer = Math.round(100 - Number(teamInvAmt) / Number(teamAmt) * 100) + "%";
            /** 예상수익 */
            html += '    <td style="text-align: right"><spa>'+teamIncomePer+'</span></td>';
            /** PM */
            html += '    <td style="text-align: center"><spa>'+(teamMap.PM_CK == "Y" ? "승인" : "미승인")+'</span></td>';
            /** 팀장 */
            html += '    <td style="text-align: center"><spa>'+(teamMap.TEAM_CK == "Y" ? "승인" : "미승인")+'</span></td>';
            html += '</tr>';
            $("#detailRow").append(html);
        }
    },

    fn_approve: function(stat){
        const parameters = {
            pjtSn : $("#pjtSn").val(),
            teamVersionSn : $("#teamVersionSn").val(),
            stat : stat,
            regEmpSeq: $("#regEmpSeq").val()
        }

        const result = customKendo.fn_customAjax("/project/team/updTeamVersionAppStat", parameters);

        if(result.flag){
            alert("승인이 완료되었습니다.");
            opener.gridReload();
            window.close();
        }else{
            alert("처리 중 오류가 발생하였습니다.");
        }
    }
}