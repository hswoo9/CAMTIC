var setDelvPjt = {

    global : {
        pjtCode : "",
        supDep : "",
        supDepSub : "",
        pjtStat : "",
        pjtStatSub : ""
    },
    
    fn_defaultScript: function (){
        setDelvPjt.fn_setData();
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
        const pjtCode = pjtCd.substring(0, 1);
        setDelvPjt.global.pjtCode = pjtCode;
        const supDep = pjtCd.substring(1, 2);
        setDelvPjt.global.supDep = supDep;
        const supDepSub = pjtCd.substring(2, 3);
        setDelvPjt.global.supDepSub = supDepSub;
        const pjtStat = pjtCd.substring(3, 4);
        setDelvPjt.global.pjtStat = pjtStat;
        const pjtStatSub = pjtCd.substring(4, 5);
        setDelvPjt.global.pjtStatSub = pjtStatSub;

        console.log("pjtCode : "+pjtCode);
        console.log("supDep : "+supDep);
        console.log("supDepSub : "+supDepSub);
        console.log("pjtStat : "+pjtStat);
        console.log("pjtStatSub : "+pjtStatSub);

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

        $("#pjtNm").text(pjtMap.PJT_NM);
        if(pjtMap.BUSN_CLASS == "D" || pjtMap.BUSN_CLASS == "V"){
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
        $("#regNm").text(pjtMap.DELV_APPROVE_EMP_NAME);
        $("#url").html("<a href='javascript:void(0);' style='font-weight: bold' onclick='camPrj.fn_projectPopView("+pjtMap.PJT_SN+", \"" + pjtMap.BUSN_CLASS + "\")'>" + pjtMap.PJT_NM + "</a>");
    },

    fn_change: function(stat){
        var pjCode = $("#pjCode").val();
        var supDep = $("#supDep2").val();
        var supDepSub = $("#supDepSub2").val();
        var pjtStat = $("#pjtStat").val();
        var pjtStatSub = $("#pjtStatSub").val();

        var date = new Date();
        var year = date.getFullYear().toString().substring(2,4);

        if(pjCode == ""){
            alert("프로젝트 구분을 선택해주세요.");
            return;
        }
        
        if(supDep == ""){
            alert("지원부처를 선택해주세요.");
            return;
        }
        if(supDepSub == ""){
            alert("전담기관을 선택해주세요.");
            return;
        }
        if(pjtStat == ""){
            alert("사업성격을 선택해주세요.");
            return;
        }
        if(pjtStatSub == ""){
            alert("사업성격1을 선택해주세요.");
            return;
        }

        const result = customKendo.fn_customAjax("/project/setDelvApprove", {
            pjtTmpCd : pjCode + supDep + supDepSub + pjtStat + pjtStatSub + year,
            pjtSn : $("#pjtSn").val(),
            stat : stat,
            ck : 1
        });

        commonProject.loading();

        if(result.flag){
            alert("코드변경 및 수주 승인이 완료되었습니다.");
            opener.gridReload();
            window.close();
        }else{
            alert("처리 중 오류가 발생하였습니다.");
        }

    },

    fn_approve: function(stat){

        const result = customKendo.fn_customAjax("/project/updDelvApproveStat", {
            pjtSn : $("#pjtSn").val(),
            stat : stat,
            ck : 1
        });

        commonProject.loading();

        if(result.flag){
            alert("승인이 완료되었습니다.");
            opener.gridReload();
            window.close();
        }else{
            alert("처리 중 오류가 발생하였습니다.");
        }

    },

    fn_btnSet: function(pjtMap){
        if(pjtMap != null){
            const status = pjtMap.STATUS;

            if($("#mode").val() != "mng"){
                if(status == "0"){
                    $("#saveBtn").hide();
                    $("#modBtn").show();
                    $("#reqBtn").show();
                }else{
                    $("#saveBtn").hide();
                }
            }else{
                if(status == "10"){
                    $("#saveBtn").hide();
                    $("#appBtn").show();
                }else{
                    $("#saveBtn").hide();
                    $("#appBtn").hide();
                }
            }
        }
    }
}