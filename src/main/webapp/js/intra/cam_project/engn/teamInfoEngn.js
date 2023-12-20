var teamEngn = {
    global : {
        verList: []
    },

    fn_defaultScript : function(){
        teamEngn.fn_pageSet();
    },

    fn_pageSet : function(){
        const data = {
            pjtSn : $("#pjtSn").val()
        }

        const result = customKendo.fn_customAjax("/project/engn/getDelvData", data);
        console.log(result);
        const pjtMap = result.map;
        const delvMap = result.delvMap;
        const setParameters = customKendo.fn_customAjax("/project/getProjectStep", data).rs;

        const verList = customKendo.fn_customAjax("/project/team/getTeamVersion", data).list;

        let html = '';
        for(let i=0; i<verList.length; i++){
            const verMap = verList[i];
            html += '<tr>';
            html += '    <td style="text-align: center"><span style="font-weight: bold; cursor: pointer" onclick="">Ver.'+(i+1)+'</span></td>';
            html += '    <td>'+pjtMap.PJT_NM+'</td>';
            let amtText = "";
            if(pjtMap.PJT_STEP < "E3" && delvMap != null){
                amtText = comma(delvMap.DELV_AMT);
            }else if(pjtMap.PJT_STEP >= "E3"){
                amtText = comma(pjtMap.PJT_AMT);
            }else{
                amtText = comma(setParameters.EXP_AMT);
            }
            html += '    <td id="totalAmt'+verMap.TEAM_VERSION_SN+'" style="text-align: right">'+amtText+'</td>';
            html += '    <td style="text-align: center">'+commonProject.getDept(verMap.REG_EMP_SEQ)+'</td>';
            html += '    <td style="text-align: center">'+verMap.REG_DATE+'</td>';
            html += '    <td style="text-align: center">-</td>';
            html += '    <td style="text-align: center">-</td>';
            html += '    <td style="text-align: center">-</td>';
            html += '    <td style="text-align: center">-</td>';
            html += '    <td style="text-align: center">-</td>';
            html += '</tr>';
        }
        $("#verRow").append(html);

        /** 마지막 버전 세팅 */
        if(verList.length > 0){
            $(".detail").show();
            teamEngn.global.verList = verList;
            const lastVersion = verList[verList.length - 1];
            teamEngn.fn_versionSet(lastVersion.TEAM_VERSION_SN);
        }else{
            teamEngn.fn_versionSet();
        }
    },

    fn_versionSet : function(teamVersionSn){
        if(teamVersionSn == null){
            teamEngn.fn_btnSet();
            return;
        }
        $("#teamVersionSn").val(teamVersionSn);

        /** 선택한 버전 map 세팅(최초 페이지 로드 시 마지막 버전) */
        const verList = teamEngn.global.verList;
        let verMap;
        for(let i=0; i<verList.length; i++){
            if(verList[i].TEAM_VERSION_SN == teamVersionSn){
                verMap = verList[i];
            }
        }

        /** 선택한 버전 협업리스트 */
        const data = {
            pjtSn: $("#pjtSn").val(),
            teamVersionSn: teamVersionSn
        }
        const teamList = customKendo.fn_customAjax("/project/team/getTeamList", data).list;
        const myMap = teamList[0];
        const leftResult = customKendo.fn_customAjax("/project/team/getVerLeftAmt", data);
        const leftMap = leftResult.data;

        /** 총예산 */
        const delvAmt = uncomma($("#totalAmt"+teamVersionSn).text());

        /** 협업 예산 */
        const leftAmt = leftMap.TM_AMT_SUM;

        /** 자가 배분금액 */
        const myAmt = Number(delvAmt) - Number(leftAmt);

        /** 자가 배분비율 */
        const myPer = Math.round(Number(myAmt) / Number(delvAmt) * 100) + "%";

        /** 자가 예상수익 */
        const myIncomePer = Math.round(100 - Number(myMap.TM_INV_AMT / uncomma(delvAmt) * 100)) + "%";

        $("#myTmSn").val(myMap.TM_SN);

        /** 자가 정보 */
        let html = '';
        html += '<tr>';
        
        /** 체크박스 */
        html += '    <td style="text-align: center"></td>';
        /** 구분 */
        html += '    <td style="text-align: center"><span style="position: relative; top: 5px">자가</span></td>';
        /** 팀 */
        html += '    <td style="text-align: center"><span style="position: relative; top: 5px">'+commonProject.getDept(verMap.REG_EMP_SEQ)+'</span></td>';
        /** 담당자(PM) */
        html += '    <td style="text-align: center"><span style="position: relative; top: 5px">'+commonProject.getName(myMap.TM_PM_SEQ)+'</span></td>';
        /** 총예산 */
        html += '    <td id="nowTotalAmt'+myMap.TM_SN+'" style="text-align: right"><span style="position: relative; top: 5px">'+comma(delvAmt)+'</td>';
        /** 배분금액(매출) */
        html += '    <td style="text-align: right"><span style="position: relative; top: 5px">'+comma(myAmt)+'</span></td>';
        /** 배분비율 */
        html += '    <td style="text-align: right"><span style="position: relative; top: 5px">'+myPer+'</span></td>';
        /** 예상비용 */
        html += '    <td style="text-align: right"><input id="myInvAmt_'+myMap.TM_SN+'" class="myInvAmt" style="text-align: right; width: 150px" onkeyup="teamEngn.fn_calCost(this)" oninput="onlyNumber(this)" value="'+comma(myMap.TM_INV_AMT)+'"/></td>';
        /** 예상수익 */
        html += '    <td style="text-align: right"><span id="myIncomePer_'+myMap.TM_SN+'" style="position: relative; top: 5px">'+myIncomePer+'</span></td>';
        /** PM */
        html += '    <td style="text-align: center"><span style="position: relative; top: 5px">-</span></td>';
        /** 팀장 */
        html += '    <td style="text-align: center"><span style="position: relative; top: 5px">미승인</span></td>';
        html += '</tr>';
        $("#detailRow").append(html);

        customKendo.fn_textBox(["myInvAmt_"+myMap.TM_SN]);

        /** 협업 정보 */
        for(let i=1; i<teamList.length; i++){
            const teamMap = teamList[i];
            html = '';
            html += '<tr>';

            /** 체크박스 */
            html += '    <td style="text-align: center"><input type="checkbox" id="ch_'+teamMap.TM_SN+'" style="position: relative; top: 2px"/></td>';
            /** 구분 */
            html += '    <td style="text-align: center"><spa>협업</span></td>';
            /** 팀 */
            html += '    <td style="text-align: center"><spa>'+commonProject.getDept(teamMap.TM_PM_SEQ)+'</span></td>';
            /** 담당자(PM) */
            html += '    <td style="text-align: center"><spa>'+commonProject.getName(teamMap.TM_PM_SEQ)+'</span></td>';
            /** 총예산 */
            html += '    <td style="text-align: right"><spa>'+$("#totalAmt"+teamVersionSn).text()+'</td>';
            /** 배분금액(매출) */
            html += '    <td style="text-align: right"><spa>'+comma(teamMap.TM_AMT)+'</span></td>';
            const delvAmt = uncomma($("#totalAmt"+teamVersionSn).text());
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
            html += '    <td style="text-align: center"><spa>미승인</span></td>';
            /** 팀장 */
            html += '    <td style="text-align: center"><spa>미승인</span></td>';
            html += '</tr>';
            $("#detailRow").append(html);
        }

        teamEngn.fn_btnSet(verMap);
        teamEngn.fn_detailBtnSet(verMap);
    },

    fn_btnSet : function(verMap){
        let buttonHtml = '';
        if(verMap != null){
            const status = verMap.STATUS;
            if(status == 0){
                buttonHtml += '<button type="button" id="saveBtn" style="float: right; margin-bottom: 5px;" class="k-button k-button-solid-info" onclick="teamAjax.fn_approve(10)">승인요청</button>';
            }else if(status == 10){
                buttonHtml += '<button type="button" id="saveBtn" style="float: right; margin-bottom: 5px;" class="k-button k-button-solid-error" onclick="teamAjax.fn_approve(0)">승인요청 취소</button>';
            }else if(status == 100){
                buttonHtml += '<button type="button" id="saveBtn" style="float: right; margin-bottom: 5px;" class="k-button k-button-solid-info" onclick="teamAjax.fn_addVersion()">버전추가</button>';
            }
        }else{
            buttonHtml += '<button type="button" id="saveBtn" style="float: right; margin-bottom: 5px;" class="k-button k-button-solid-info" onclick="teamAjax.fn_addVersion()">버전추가</button>';
        }
        $("#teamBtnDiv").html(buttonHtml);
    },

    fn_detailBtnSet : function(){
        let buttonHtml = '';
        buttonHtml += '<button type="button" id="saveBtn" style="float: right; margin-bottom: 5px;" class="k-button k-button-solid-error" onclick="">삭제</button>';
        buttonHtml += '<button type="button" id="saveBtn" style="float: right; margin-right: 5px;" class="k-button k-button-solid-info" onclick="teamAjax.fn_save()">저장</button>';
        buttonHtml += '<button type="button" id="saveBtn" style="float: right; margin-right: 5px;" class="k-button k-button-solid-info" onclick="teamEngn.fn_teamReqPop()">협업등록</button>';
        $("#teamDetailBtnDiv").html(buttonHtml);
    },

    fn_calCost: function(obj){
        var index = obj.id.split("_")[1];
        if(obj.id.match("myInvAmt")){
            const invAmt = uncomma(obj.value);
            const nowTotalAmt = uncomma($("#nowTotalAmt"+index).text());
            const returnVal = Math.round(100 - Number(invAmt) / Number(nowTotalAmt) * 100);
            $("#myIncomePer_"+index).text(returnVal+"%");
        }

        inputNumberFormat(obj);
    },

    fn_teamReqPop: function(){
        let url = "/intra/cam_project/teamReqPop.do?pjtSn="+$("#pjtSn").val()+"&teamVersionSn="+$("#teamVersionSn").val();
        let name = "studyReqPop";
        let option = "width = 900, height = 330, top = 300, left = 400, location = no";
        window.open(url, name, option);
    }
}