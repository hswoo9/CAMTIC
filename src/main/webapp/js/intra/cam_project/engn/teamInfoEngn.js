var teamEngn = {
    global : {

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
                amtText = comma(pjtMap.PJT_EXP_AMT);
            }
            html += '    <td style="text-align: right">'+amtText+'</td>';
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
        const lastVersion = verList[verList.length - 1];
        teamEngn.fn_versionSet(lastVersion);
    },

    fn_versionSet : function(verMap){
        let versionHtml = '';
        teamEngn.fn_btnSet(verMap);
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
    }
}