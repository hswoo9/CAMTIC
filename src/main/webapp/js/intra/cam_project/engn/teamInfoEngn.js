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
        console.log("teamList");
        console.log(teamList);

        /** 자가 정보 */
        let html = '';
        html += '<tr>';
        html += '    <td style="text-align: center"><input type="checkbox" id="ch_'+myMap.TM_SN+'" style="position: relative; top: 5px"/></td>';
        html += '    <td style="text-align: center"><span style="position: relative; top: 5px">자가</span></td>';
        html += '    <td style="text-align: center"><span style="position: relative; top: 5px">'+commonProject.getDept(verMap.REG_EMP_SEQ)+'</span></td>';
        html += '    <td style="text-align: center"><span style="position: relative; top: 5px">'+commonProject.getName(myMap.TM_PM_SEQ)+'</span></td>';
        html += '    <td id="nowTotalAmt'+myMap.TM_SN+'" style="text-align: center"><span style="position: relative; top: 5px">'+$("#totalAmt"+teamVersionSn).text()+'</td>';
        html += '    <td style="text-align: center"><span style="position: relative; top: 5px">'+$("#totalAmt"+teamVersionSn).text()+'</span></td>';
        html += '    <td style="text-align: right"><span style="position: relative; top: 5px">100%</span></td>';
        html += '    <td style="text-align: right"><input id="invAmt_'+myMap.TM_SN+'" style="text-align: right; width: 150px" onkeyup="teamEngn.fn_calCost(this)" oninput="onlyNumber(this)" value="0"/></td>';
        html += '    <td style="text-align: right"><input id="incomePer_'+myMap.TM_SN+'" style="text-align: right; width: 50px" value="'+Math.round(100 - Number(0 / uncomma($("#totalAmt"+teamVersionSn).text()) * 100))+'" disabled/>%</td>';
        html += '    <td style="text-align: center"><span style="position: relative; top: 5px">미승인</span></td>';
        html += '    <td style="text-align: center"><span style="position: relative; top: 5px">미승인</span></td>';
        html += '</tr>';
        $("#detailRow").append(html);

        customKendo.fn_textBox(["invAmt_"+myMap.TM_SN, "incomePer_"+myMap.TM_SN]);

        teamEngn.fn_btnSet(verMap);
        teamEngn.fn_detailBtnSet(verMap);
    },

    fn_btnSet : function(verMap){
        let buttonHtml = '';
        if(verMap != null){
            const status = verMap.STATUS;
            if(status == 0){
                buttonHtml += '<button type="button" id="saveBtn" style="float: right; margin-bottom: 5px;" class="k-button k-button-solid-info" onclick="">승인요청</button>';
            }else{
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
        buttonHtml += '<button type="button" id="saveBtn" style="float: right; margin-right: 5px;" class="k-button k-button-solid-info" onclick="">저장</button>';
        buttonHtml += '<button type="button" id="saveBtn" style="float: right; margin-right: 5px;" class="k-button k-button-solid-info" onclick="teamEngn.fn_teamReqPop()">협업등록</button>';
        $("#teamDetailBtnDiv").html(buttonHtml);
    },

    fn_calCost: function(obj){
        var index = obj.id.split("_")[1];
        if(obj.id.match("invAmt")){
            const invAmt = uncomma(obj.value);
            const nowTotalAmt = uncomma($("#nowTotalAmt"+index).text());
            const returnVal = Math.round(100 - Number(invAmt) / Number(nowTotalAmt) * 100);
            $("#incomePer_" + index).val(returnVal);
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