var teamReq = {

    fn_defaultScript : function(){
        commonProject.setPjtStat();
        teamReq.fn_pageSet();
        teamReq.fn_dataSet();
    },

    fn_pageSet : function(){
        const data = {
            pjtSn: $("#pjtSn").val()
        }
        const result = customKendo.fn_customAjax("/project/engn/getDelvData", data);
        const pjtMap = result.map;
        const delvMap = result.delvMap;
        const setParameters = customKendo.fn_customAjax("/project/getProjectStep", data).rs;
        console.log(pjtMap);
        $("#pjtNm").text(pjtMap.PJT_NM);

        customKendo.fn_textBox(["team", "teamPMNm", "teamAmt", "teamPer", "teamInvAmt", "teamIncomePer",
            "delvAmtTmp", "leftAmtTmp"]);

        /** 총 예산 */
        let amtText = "";
        if(pjtMap.PJT_STEP < "E3" && delvMap != null){
            amtText = delvMap.DELV_AMT;
        }else if(pjtMap.PJT_STEP >= "E3"){
            amtText = pjtMap.PJT_AMT;
        }else{
            amtText = setParameters.EXP_AMT;
        }
        $("#delvAmt").val(amtText);
        $("#delvAmtTmp").val(comma(amtText));

        /** 수주부서 남은 잔액 조회 */
        data.teamVersionSn = $("#teamVersionSn").val()
        const leftResult = customKendo.fn_customAjax("/project/team/getVerLeftAmt", data);
        console.log(leftResult);
        const leftMap = leftResult.data;
        let leftAmt = leftMap.TM_AMT_SUM;
        $("#leftAmt").val(Number(amtText)-Number(leftAmt));
        $("#leftAmtTmp").val(comma(Number(amtText)-Number(leftAmt)));

        if(commonProject.global.busnClass != "D" && commonProject.global.busnClass != "V"){
            $(".rnd").show();
            teamReq.fn_g20TableSet();

            data.tmSn = $("#tmSn").val()
            const result = customKendo.fn_customAjax("/project/team/getTeamBudgetList", data);
            const teamBgtList = result.list;

            for(let i=0; i<teamBgtList.length; i++){
                const teamBgtData = teamBgtList[i];
                $("#bgtTeamAmt"+teamBgtData.BGT_CD).val(comma(teamBgtData.BGT_TEAM_AMT));
            }
        }
    },

    fn_dataSet: function(){
        const tmSn = $("#tmSn").val();
        const result = customKendo.fn_customAjax("/project/team/getTeamData", {
            tmSn: tmSn
        });
        const tmMap = result.data;
        if(tmMap != null){
            $("#teamSeq").val(tmMap.TM_TEAM_SEQ);
            $("#teamPMSeq").val(tmMap.TM_PM_SEQ);
            $("#teamPMNm").val(commonProject.getName(tmMap.TM_PM_SEQ));
            $("#team").val(commonProject.getDept(tmMap.TM_PM_SEQ));
            $("#teamAmt").val(comma(tmMap.TM_AMT));
            $("#teamInvAmt").val(comma(tmMap.TM_INV_AMT));
            $("#teamAmt").trigger("keyup");
            $("#saveBtn").hide();
            $("#modBtn").show();
            $("#teamPMBtn").hide();
        }
    },

    fn_calCost: function(obj){
        if(obj.id.match("teamAmt") || obj.id.match("teamInvAmt")){
            /** 배분비율 */
            const teamAmt = uncommaN($("#teamAmt").val());
            const leftAmt = uncommaN($("#leftAmt").val());
            const teamPer = 100 - Math.round(100 - Number(teamAmt) / Number(leftAmt) * 100);
            $("#teamPer").val(teamPer);

            /** 수익비율 */
            const teamInvAmt = uncommaN($("#teamInvAmt").val());
            let teamIncomePer = 0;
            if(teamAmt == "0"){
                teamIncomePer = 0;
            }else{
                teamIncomePer = Math.round(100 - Number(teamInvAmt) / Number(teamAmt) * 100);
            }
            $("#teamIncomePer").val(teamIncomePer);
        }

        inputNumberFormat(obj);
    },

    fn_calCost2: function(obj){

        let sum = 0;
        $.each($(".bgtAmt"), function(i, v){
            let bgtAmt = 0;
            if(v.value == null || v.value == undefined || v.value == ""){
                sum += 0;
            }else{
                sum += Number(uncomma(v.value));
            }
        })
        $("#teamAmt").val(comma(sum));

        const teamAmt = uncomma($("#teamAmt").val());
        const leftAmt = uncomma($("#leftAmt").val());
        const teamPer = 100 - Math.round(100 - Number(teamAmt) / Number(leftAmt) * 100);
        $("#teamPer").val(teamPer);

        /** 수익비율 */
        const teamInvAmt = uncomma($("#teamInvAmt").val());
        const teamIncomePer = Math.round(100 - Number(teamInvAmt) / Number(teamAmt) * 100);
        $("#teamIncomePer").val(teamIncomePer);

        inputNumberFormat(obj);
    },

    fn_save: function(){
        var parameters = {
            pjtSn : $("#pjtSn").val(),
            teamVersionSn : $("#teamVersionSn").val(),

            tmType : 1,

            tmTeamSeq : $("#teamSeq").val(),
            tmPMSeq : $("#teamPMSeq").val(),
            teamAmt : uncomma($("#teamAmt").val()),
            tmInvAmt : uncomma($("#teamInvAmt").val()),

            regEmpSeq : $("#regEmpSeq").val()
        }

        let confirmText = "협업등록을 하시겠습니까?";
        if($("#tmSn").val() != "" && $("#tmSn").val() != undefined && $("#tmSn").val() != null){
            parameters.tmSn = $("#tmSn").val();
            confirmText = "등록된 협업을 수정 하시겠습니까?";
        }

        if(parameters.tmPMSeq == ""){
            alert("담당자를 선택해주세요."); return;
        }

        if(parameters.teamAmt == "" || parameters.teamAmt == 0 || parameters.teamAmt == null){
            alert("배분금액 입력되지 않았습니다."); return;
        }

        if(parameters.tmInvAmt == "" || parameters.tmInvAmt == null){
            alert("예상비용이 입력되지 않았습니다."); return;
        }

        if(!confirm(confirmText)){
            return;
        }

        if(commonProject.global.busnClass != "D"){
            let bgtArr = [];
            $.each($(".addData"), function(i, v){
                const budgetData = {};
                const bgtCd = $(v).find('.bgtCd').val();
                const bgtTeamAmt = uncomma($("#bgtTeamAmt"+bgtCd).val());

                budgetData.bgtCd = bgtCd;
                budgetData.bgtTeamAmt = bgtTeamAmt;

                bgtArr.push(budgetData);
            });

            console.log(bgtArr);

            if(bgtArr.length != 0){
                parameters.bgtArr = JSON.stringify(bgtArr);
            }
        }

        if(parameters.pjtSn == "" || parameters.teamVersionSn == ""){
            alert("데이터 조회 중 오류가 발생하였습니다. 창을 닫고 재시도 바랍니다."); return;
        }

        const result = customKendo.fn_customAjax("/project/team/setTeam", parameters);
        if(result.code == "200"){
            alert("저장이 완료되었습니다.");
            const busnClass = commonProject.global.busnClass;
            if(busnClass == "D"){
                opener.window.location.href="/project/pop/viewRegProject.do?pjtSn=" + $("#pjtSn").val() + "&tab=5";
            }else if(busnClass == "R"){
                opener.window.location.href="/projectRnd/pop/regProject.do?pjtSn=" + $("#pjtSn").val() + "&tab=5";
            }else if(busnClass == "S"){
                opener.window.location.href="/projectUnRnd/pop/regProject.do?pjtSn=" + $("#pjtSn").val() + "&tab=5";
            }else{
                opener.window.location.reload();
            }
            window.close();
        }else{
            alert("데이터 저장 중 오류가 발생하였습니다.");
        }
    },

    fn_g20TableSet: function(){
        const pjtSn = $("#pjtSn").val();
        const pjtInfo = customKendo.fn_customAjax("/project/getProjectStep", {pjtSn: pjtSn});
        const map = pjtInfo.rs;

        const date = new Date();
        const year = date.getFullYear().toString().substring(2,4);
        const g20 = customKendo.fn_customAjax("/g20/getSubjectList", {
            stat: "project",
            gisu: year,
            fromDate: date.getFullYear().toString() + "0101",
            toDate: date.getFullYear().toString() + "1231",
            mgtSeq: map.PJT_CD,
            opt01: "3",
            opt02: "1",
            opt03: "2",
            baseDate: date.getFullYear().toString() + (date.getMonth() + 1).toString().padStart(2, '0') + date.getDate().toString().padStart(2, '0'),
            pjtSn: pjtSn
        });

        console.log("g20");
        console.log(g20);

        let html = '';
        html += '<tr>';
        html += '    <th style="text-align:center;"><b>장</b></th>';
        html += '    <th style="text-align:center;"><b>관</b></th>';
        html += '    <th style="text-align:center;"><b>항</b></th>';
        html += '    <th style="text-align:center;"><b>예산액(원)</b></th>';
        html += '    <th style="text-align:center;"><b>배분금액</b></th>';
        html += '</tr>';
        $("#g20Row").html(html);

        let sum = 0;
        let largeText = "";
        let mediumText = "";

        for(let i=0; i<g20.list.length; i++){
            html = '';
            const map = g20.list[i];
            if(map.DIV_FG_NM == "장"){
                largeText = map.BGT_NM;
            }
            if(map.DIV_FG_NM == "관"){
                mediumText = map.BGT_NM;
            }
            if(map.DIV_FG_NM == "항"){
                html += '<tr class="addData">';
                html += '<input type="hidden" class="bgtCd" name="bgtCd" value="'+map.BGT_CD+'" />';
                html += '    <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px; position: relative; top: 3px">'+ largeText +'</p></td>';
                html += '    <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px; position: relative; top: 3px">'+ mediumText +'</p></td>';
                html += '    <td style="height:30px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px; position: relative; top: 3px">'+ map.BGT_NM +'</p></td>';
                html += '    <td style="height:30px;background-color:#FFFFFF; text-align:right;"><p style="font-size:12px; position: relative; top: 3px">'+ fn_numberWithCommas(map.SUB_AM) +'</p></td>';
                html += '    <td style="height:30px;background-color:#FFFFFF; text-align:right;"><p style="font-size:12px; position: relative; top: 3px"><input id="bgtTeamAmt'+map.BGT_CD+'" class="bgtAmt"' +
                    'style="text-align: right" value="0" onkeyup="teamReq.fn_calCost2(this)" oninput="onlyNumber(this)"/></p></td>';
                html += '</tr>';
            }
            sum += map.SUB_AM;
            $("#g20Row").append(html);

            customKendo.fn_textBox(["bgtTeamAmt"+map.BGT_CD]);
        }

        if(g20.list == 0){
            html += '<tr>';
            html += '    <td colspan="5" style="text-align:center;">등록된 예산이 없습니다.</td>';
            html += '</tr>';
            $("#g20Row").html(html);
        }else{
            $("#teamAmt").data("kendoTextBox").enable(false);
        }
    }
}