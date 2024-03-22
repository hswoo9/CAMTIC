/** 결재선 지정 프로세스 */

/**
 * made : 2024.1.24
 *
 * 1. 기안자 정보 조회
 * 1-1. 기안자가 부서에 속해있는지, 팀에 속해있는지 체크
 * 1-2. 부서에 속해있으면 부서장이 있는지, 팀에 속해있으면 팀장, 부서장이 있는지 체크
 *
 * 2. 해당 문서 정보 조회
 * 2-1. 전결 구분 매칭
 * 2-1. 직무대리 포함(직무대리는 추가 프로세스가 아닌 "팀장 직무대리"라는 직책을 만들기로 함 (2024.1.30)
 * 2-1-1. 전결 구분에 빈자리가 있을 시 겸직 체크해서 있을시 2-1에 추가 (2024.2.4)
 * 2-1-2. 기안자 정보가 전결구분 직급보다 높은치 체크
 * 2-1-3. 부재 체크 (2024.2.6)
 * 2-2. 협조있는지 체크 (2024.1.28)
 * 2-3. 협조자가 본인 부서인지 체크, 맞으면 협조 추가 안함 (2024.1.28)
 *
 * 3. 최종 결재선 생성
 * */

var approvalLine = {
    global: {
        /** 기안자 정보 */
        userInfo: {},

        /** deptLevel이 1이면 부서, 2면 팀에 속해있음 */
        deptLevel: true,

        /** 부서장, 팀장 정보 */
        managerInfo: {},

        /** 직급별 결재선 일때 전결 정보 */
        headLevel: 0,
        leaderLevel: 0,
        memberLevel: 0,

        /** 금액별 코드설정 정보 */
        payCkList: [],

        /** 협조 정보 */
        approvalMngData: {},

        /** 협조자 정보 */
        copperUserInfo1: null,
        copperUserInfo2: null,

        /** 현재 결재선 배열 */
        approverArr: [],

        /** 일반 결재선(협조 x) 배열 */
        normalArr: [],

        /** 지급신청서 PM 정보 formId = 147일때 생김 */
        pmUserInfo: null,
        pmUserCk: "N"
    },

    linkStart : function(){
        const params = draft.global.params;

        /** 1. 기안자 정보 조회 */
        const empSeq = params.empSeq;
        approvalLine.global.userInfo = getUser(empSeq);
        const userInfo = approvalLine.global.userInfo;
        console.log("userInfo", userInfo);

        /** 1-1. 기안자가 부서에 속해있는지, 팀에 속해있는지 체크 */
        approvalLine.global.deptLevel = userInfo.DEPT_LEVEL;
        const deptLevel = approvalLine.global.deptLevel;

        /** 1-2. 부서에 속해있으면 부서장이 있는지, 팀에 속해있으면 팀장, 부서장이 있는지 체크 */
        approvalLine.global.managerInfo = getManager(empSeq, deptLevel);
        const managerInfo = approvalLine.global.managerInfo;
        console.log("managerInfo", managerInfo);

        /** 2. 해당 문서 정보 조회 */
        const formId = params.formId;
        const approvalMngResult = customKendo.fn_customAjax("/formManagement/getApprovalMng.do", {formId: formId});

        const approvalMngData = approvalMngResult.data;
        const approvalMngList = approvalMngResult.list;
        approvalLine.global.approvalMngData = approvalMngData;

        /** 2-1. 전결 구분 매칭 */
        if(approvalMngData == null){
            console.log("위임전결 설정 없음...");
            return;
        }

        const approvalType = approvalMngData.APPROVAL_TYPE;
        let headLevel = 0;
        let leaderLevel = 0;
        let memberLevel = 0;

        if(approvalType == "1"){
            for(let i=0; i<approvalMngList.length; i++){
                const map = approvalMngList[i];
                if(map.DUTY_TYPE == "1"){
                    headLevel = map.DUTY_VAL;
                    approvalLine.global.headLevel = map.DUTY_VAL;
                }else if(map.DUTY_TYPE == "2"){
                    leaderLevel = map.DUTY_VAL;
                    approvalLine.global.leaderLevel = map.DUTY_VAL;
                }else if(map.DUTY_TYPE == "3"){
                    memberLevel = map.DUTY_VAL;
                    approvalLine.global.memberLevel = map.DUTY_VAL;
                }
            }
        }else if(approvalType == "2"){
            approvalLine.global.payCkList = approvalMngList;
        }

        /** 2-2. 협조 있는지 체크해서 있으면 global 변수 세팅 */
        if(approvalMngData.COPPER_EMP_SEQ1 != null){
            console.log("협조자1 있음...");
            approvalLine.global.copperUserInfo1 = getUser(approvalMngData.COPPER_EMP_SEQ1);
            const copperUserInfo1 = approvalLine.global.copperUserInfo1;
            console.log("협조자1 은... " + copperUserInfo1.EMP_NAME_KR);
        }

        if(approvalMngData.COPPER_EMP_SEQ2 != null){
            console.log("협조자2 있음...");
            approvalLine.global.copperUserInfo2 = getUser(approvalMngData.COPPER_EMP_SEQ2);
            const copperUserInfo2 = approvalLine.global.copperUserInfo2;
            console.log("협조자2 는... " + copperUserInfo2.EMP_NAME_KR);
        }

        if(approvalMngData.COPPER_DECISON_YN == "Y"){
            console.log("협조자1 전결 문서...");
        }

        if(approvalMngData.COPPER_EMP_SEQ1 == null){
            console.log("협조자 없음...") ;
        }


        /** 3. 결재선 생성 */

        let level = 0;

        /** 결재구분 직급별 */
        if(approvalType == "1"){
            level = this.getDutyLevel();
            
        /** 결재구분 금액별 */
        }else if(approvalType == "2"){
            level = this.getPayLevel();
        }

        approvalLine.setLineArr(level);
    },

    getDutyLevel : function(){
        const userInfo = approvalLine.global.userInfo;
        let level = 0;
        if(userInfo.DUTY_CODE == "1"){

        }else if(userInfo.DUTY_CODE == "2" || userInfo.DUTY_CODE == "3" || userInfo.DUTY_CODE == "7"){
            level = approvalLine.global.headLevel;
        }else if(userInfo.DUTY_CODE == "4" || userInfo.DUTY_CODE == "5" || userInfo.DUTY_CODE == "6"){
            level = approvalLine.global.leaderLevel;
        }else{
            level = approvalLine.global.memberLevel;
        }
        return level;
    },

    getPayLevel : function(){
        const payCkList = approvalLine.global.payCkList;
        const data = draft.global.params;
        let requestAmt = 0;
        let level = 0;
        
        if(data.menuCd == "delv") {
            const pjtSn = data.approKey.split("_")[1];

            if (pjtSn == null || pjtSn == undefined || pjtSn == "") {
                alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다."); return;
            }

            const result = customKendo.fn_customAjax("/project/engn/getDelvData", {pjtSn: pjtSn});
            const delvMap = result.delvMap;

            requestAmt = Number(delvMap.DELV_AMT);

        }else if(data.menuCd == "rndDelv"){
            const pjtSn = data.approKey.split("_")[1];

            if (pjtSn == null || pjtSn == undefined || pjtSn == "") {
                alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다."); return;
            }
            const rndInfo = customKendo.fn_customAjax("/projectRnd/getRndDetail", {pjtSn: pjtSn});
            const delvMap = rndInfo.map;

            requestAmt = Number(delvMap.TOT_RES_COST);

        }else if(data.menuCd == "unRndDelv"){
            const pjtSn = data.approKey.split("_")[1];

            if (pjtSn == null || pjtSn == undefined || pjtSn == "") {
                alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다."); return;
            }
            const unRndInfo = customKendo.fn_customAjax("/projectUnRnd/getUnRndDetail", {pjtSn: pjtSn});
            const delvMap = unRndInfo.map;

            requestAmt = Number(delvMap.TOT_RES_COST);

        }else if(data.menuCd == "dev"){
            const devSn = data.approKey.split("_")[1];
            if (devSn == null || devSn == undefined || devSn == "") {
                alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다."); return;
            }
            const pjtSn = customKendo.fn_customAjax("/project/getPjtSnToDev", {devSn: devSn}).rs.PJT_SN;
            const result = customKendo.fn_customAjax("/project/engn/getDelvData", {pjtSn: pjtSn});
            const map = result.map;

            requestAmt = Number(map.PJT_AMT);

        }else if(data.menuCd == "rndDev"){
            const devSn = data.approKey.split("_")[1];
            if (devSn == null || devSn == undefined || devSn == "") {
                alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다."); return;
            }
            const pjtSn = customKendo.fn_customAjax("/project/getPjtSnToDev", {devSn: devSn}).rs.PJT_SN;
            const rndInfo = customKendo.fn_customAjax("/projectRnd/getRndDetail", {pjtSn: pjtSn});
            const delvMap = rndInfo.map;

            requestAmt = Number(delvMap.TOT_RES_COST);

        }else if(data.menuCd == "unRndDev"){
            const devSn = data.approKey.split("_")[1];
            if (devSn == null || devSn == undefined || devSn == "") {
                alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다."); return;
            }
            const pjtSn = customKendo.fn_customAjax("/project/getPjtSnToDev", {devSn: devSn}).rs.PJT_SN;
            const unRndInfo = customKendo.fn_customAjax("/projectUnRnd/getUnRndDetail", {pjtSn: pjtSn});
            const delvMap = unRndInfo.map;

            requestAmt = Number(delvMap.TOT_RES_COST);

        }else if(data.menuCd == "pjtRes"){
            const pjtSn = data.approKey.split("_")[1];
            if (pjtSn == null || pjtSn == undefined || pjtSn == "") {
                alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다."); return;
            }
            const result = customKendo.fn_customAjax("/project/engn/getDelvData", {pjtSn: pjtSn});
            const delvMap = result.delvMap;

            requestAmt = Number(delvMap.PJT_AMT);

        }else if(data.menuCd == "rndRes"){
            const pjtSn = data.approKey.split("_")[1];
            if (pjtSn == null || pjtSn == undefined || pjtSn == "") {
                alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다."); return;
            }
            const rndInfo = customKendo.fn_customAjax("/projectRnd/getRndDetail", {pjtSn: pjtSn});
            const delvMap = rndInfo.map;

            requestAmt = Number(delvMap.TOT_RES_COST);

        }else if(data.menuCd == "unRndRes"){
            const pjtSn = data.approKey.split("_")[1];
            if (pjtSn == null || pjtSn == undefined || pjtSn == "") {
                alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다."); return;
            }
            const unRndInfo = customKendo.fn_customAjax("/projectUnRnd/getUnRndDetail", {pjtSn: pjtSn});
            const delvMap = unRndInfo.map;

            requestAmt = Number(delvMap.TOT_RES_COST);

        }else if(data.menuCd == "campus"){
            const eduInfoId = data.approKey.split("_")[1];

            if (eduInfoId == null || eduInfoId == undefined || eduInfoId == "") {
                alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다."); return;
            }

            const result = customKendo.fn_customAjax("/campus/getEduResultOne", {eduInfoId: eduInfoId});
            const ResultData = result.data;

            let amt = 0;
            if(ResultData.EDU_MONEY != null || ResultData.EDU_MONEY != ""){
                amt = ResultData.EDU_MONEY;
            }
            requestAmt = Number(amt);
            if(amt == null){
                requestAmt = 0;
            }

        }else if(data.menuCd == "purc"){
            const purcSn = data.approKey.split("_")[1];

            if (purcSn == null || purcSn == undefined || purcSn == "") {
                alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다."); return;
            }

            const result = customKendo.fn_customAjax("/purc/getPurcReq.do", {purcSn: purcSn});
            const ResultData = result.data;
            console.log("ResultData PURC ", ResultData);

            let amt = 0;
            if(ResultData.PURC_ITEM_AMT_SUM != null || ResultData.PURC_ITEM_AMT_SUM != ""){
                amt = ResultData.PURC_ITEM_AMT_SUM;
            }

            requestAmt = Number(amt);

            if(amt == null){
                requestAmt = 0;
            }

        }else if(data.menuCd == "claim"){
            const claimSn = data.approKey.split("_")[1];

            if (claimSn == null || claimSn == undefined || claimSn == "") {
                alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다."); return;
            }

            const result = customKendo.fn_customAjax("/purc/getPurcClaimData", {claimSn: claimSn});
            const ResultData = result.data;

            let amt = 0;
            if(ResultData.TOT_AMT != null || ResultData.TOT_AMT != ""){
                amt = ResultData.TOT_AMT;
            }
            requestAmt = Number(amt);
            if(amt == null){
                requestAmt = 0;
            }

        }else if(data.menuCd == "payApp"){
            const payAppSn = data.approKey.split("_")[1];

            if (payAppSn == null || payAppSn == undefined || payAppSn == "") {
                alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다."); return;
            }

            const result = customKendo.fn_customAjax("/payApp/pop/getPayAppData", {
                payAppSn: payAppSn
            });
            const ResultData = result.list;

            let amt = 0;

            for(let i=0; i<ResultData.length; i++){
                amt += ResultData[i].TOT_COST;
            }
            requestAmt = Number(amt);

            if(amt == null){
                requestAmt = 0;
            }
        }else if(data.menuCd == "exnp"){
            const exnpSn = data.approKey.split("_")[1];

            if (exnpSn == null || exnpSn == undefined || exnpSn == "") {
                alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다."); return;
            }

            const result = customKendo.fn_customAjax("/payApp/pop/getExnpData", {exnpSn: exnpSn});
            const ResultData = result.map;

            let amt = 0;
            if(ResultData.TOT_COST != null || ResultData.TOT_COST != ""){
                amt = ResultData.TOT_COST;
            }
            requestAmt = Number(amt);
            if(amt == null){
                requestAmt = 0;
            }
        }else if(data.menuCd == "study" || data.menuCd == "propag" || data.menuCd == "ojt"){
            const pk = data.approKey.split("_")[1];

            if (pk == null || pk == undefined || pk == "") {
                alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다."); return;
            }

            const info = customKendo.fn_customAjax("/campus/getStudyInfoOne", {pk: pk});
            const data2 = info.data;
            console.log("study", data2);

            let amt = 0;
            if(data2.STUDY_MONEY != null || data2.STUDY_MONEY != ""){
                amt = data2.STUDY_MONEY;
            }
            requestAmt = Number(amt);
            if(amt == null){
                requestAmt = 0;
            }
        }

        if(payCkList.length == 0){
            return;
        }

        for(let i=0; i<payCkList.length; i++){
            const map = payCkList[i];

            /** 시작 금액만 있으면 (코드값 <= 금액) 인지 체크 */
            if(map.ED_PAY == "" || map.ED_PAY == null){
                if(Number(map.ST_PAY) <= requestAmt){
                    level = map.DUTY_VAL;
                    break;
                }

            /** 시작 금액, 종료 금액 다 있으면 (시작값 <= 금액 < 끝값) 인지 체크 */
            }else{
                if(Number(map.ST_PAY) <= requestAmt && requestAmt < Number(map.ED_PAY)){
                    level = map.DUTY_VAL;
                    break;
                }
            }
        }
        
        return level;
    },

    /** 직급별 세팅 */
    setLineArr : function(level){
        const userInfo = approvalLine.global.userInfo;
        const managerInfo = approvalLine.global.managerInfo;

        const userArr = [];


        if(level == 0 || level == null){
            return;
        }
        
        /** 원장급 - 본인전결 */
        if(userInfo.DUTY_CODE == "1") {
            userArr.push(userInfo);

        /** 기안자가 부서장급 일때 */
        }else if(userInfo.DUTY_CODE == "2" || userInfo.DUTY_CODE == "3" || userInfo.DUTY_CODE == "7"){
            
            /** 부서장급 - 원장전결 */
            if(level == "1"){
                userArr.push(userInfo);
                userArr.push(getUser(managerInfo.GRAND_MNG_SEQ));

            /** 부서장급 - 본인전결, 팀장전결(팀장전결이면 본인 전결) */
            }else if(level == "2" || level == "3"){
                userArr.push(userInfo);
            }

        /** 기안자가 팀장급 일때 */
        }else if(userInfo.DUTY_CODE == "4" || userInfo.DUTY_CODE == "5" || userInfo.DUTY_CODE == "6"){
            
            /** 팀장급 - 원장전결 */
            if(level == "1"){
                userArr.push(userInfo);
                if(managerInfo.DEPT_MNG_CK == "Y"){
                    userArr.push(getUser(managerInfo.DEPT_MNG_SEQ));
                }
                userArr.push(getUser(managerInfo.GRAND_MNG_SEQ));

            /** 팀장급 - 부서장전결 */
            }else if(level == "2") {
                userArr.push(userInfo);
                if(managerInfo.DEPT_MNG_CK == "Y"){
                    userArr.push(getUser(managerInfo.DEPT_MNG_SEQ));
                /** 부서장이 부재일시 원장이 대신 함. */
                }else{
                }

            /** 팀장급 - 자기전결 */
            }else if(level == "3"){
                userArr.push(userInfo);
            }

        /** 기안자가 팀원급 일때 */
        }else{

            /** 팀원급 - 원장전결 */
            if(level == "1"){
                userArr.push(userInfo);
                if(managerInfo.TEAM_MNG_CK == "Y"){
                    userArr.push(getUser(managerInfo.TEAM_MNG_SEQ));
                }
                if(managerInfo.DEPT_MNG_CK == "Y"){
                    userArr.push(getUser(managerInfo.DEPT_MNG_SEQ));
                }
                userArr.push(getUser(managerInfo.GRAND_MNG_SEQ));

            /** 팀원급 - 부서장전결 */
            }else if(level == "2") {
                userArr.push(userInfo);
                if(managerInfo.TEAM_MNG_CK == "Y"){
                    userArr.push(getUser(managerInfo.TEAM_MNG_SEQ));

                /** 팀장이 부재일시 겸직확인 함. */
                }else if(managerInfo.TEAM_TMP_MNG_CK == "Y"){
                    userArr.push(getUser(managerInfo.TEAM_TMP_MNG_SEQ));
                }

                /** 겸직이 있을때 겸직과 부서장이 같은 사람이면 패스 */
                if(managerInfo.TEAM_TMP_MNG_CK == "Y" && (managerInfo.TEAM_TMP_MNG_SEQ == managerInfo.DEPT_MNG_SEQ)){

                /** 아니면 부서장 결재선 추가 */
                }else{
                    if(managerInfo.DEPT_MNG_CK == "Y"){
                        userArr.push(getUser(managerInfo.DEPT_MNG_SEQ));
                    }
                }
                
            /** 팀원급 - 팀장전결 */
            }else if(level == "3"){
                userArr.push(userInfo);
                if(managerInfo.TEAM_MNG_CK == "Y"){
                    userArr.push(getUser(managerInfo.TEAM_MNG_SEQ));

                /** 팀장이 부재일시 겸직확인 함. */
                }else if(managerInfo.TEAM_TMP_MNG_CK == "Y"){
                    userArr.push(getUser(managerInfo.TEAM_TMP_MNG_SEQ));

                /** 팀장이 부재일시 부서장이 대신 함. */
                }else if(managerInfo.DEPT_MNG_CK == "Y"){
                    userArr.push(getUser(managerInfo.DEPT_MNG_SEQ));
                }
            }
        }

        if(userArr.length != 0){
            approvalLine.setLineData(userArr);
        }
    },

    /** 직급별 결재선 입력 */
    setLineData: function(userArr){
        const params = draft.global.params;
        
        /** 결재자 */
        for(let i=0; i<userArr.length; i++){
            let approveType = "0";

            /** 지급신청서일때 사업담당자 추가 */
            if(i == 1 && params.formId == "147" && userArr.length != 1){
                approvalLine.setPayLineData();
            }

            /** 
             * 1. 본인 전결이 아니고
             * 2. 협조자가 있고
             * 3. 같은부서가 아니면
             * 
             * return 상신자 직후에 협조자 결재선 추가 */
            if(i == 1 && userArr.length != 1){
                approvalLine.setCopperLineData();
            }
            
            if(i == userArr.length-1){
                approveType = "2";
            }
            approvalLine.rowApprovalSet(userArr[i], approveType);
            approvalLine.global.userArr = userArr;

            console.log("userArr", userArr);
            console.log("userArr[i]", userArr[i]);
        }

        /** 마지막 결재자 */
        approvalLine.lastApprovalSet(userArr[userArr.length-1]);

        /** 결재선 송신 */
        approvalLine.setApproval();
    },

    copperLineCk: function(){
        const approvalMngData = approvalLine.global.approvalMngData;
        const cUserInfo1 = approvalLine.global.copperUserInfo1;
        const cUserInfo2 = approvalLine.global.copperUserInfo2;

        /** 협조 결재선 체크 */

        /** 협조 타입
         * A: 협조1 전결
         * B: 협조1 -> 협조2
         * C: 협조 없음
         * */
        let copperType = "C";

        /** 1. 협조1 전결인지 체크 */
        try {
            if(cUserInfo1 != null && approvalMngData.COPPER_DECISON_YN == "Y"){
                copperType = "A";
            }else if(cUserInfo1 != null && cUserInfo2 != null){
                copperType = "B";
            }
        }catch{
            copperType = "C";
        }
        console.log("협조 타입 :", copperType);
        approvalLine.global.copperType = copperType;
    },

    setPayLineData: function(){
        const payAppSn = draft.global.params.approKey.split("_")[1];
        const result = customKendo.fn_customAjax("/payApp/pop/getPayAppData", { payAppSn: payAppSn });
        const rs = result.map;
        const pjtResult = customKendo.fn_customAjax("/project/getProjectByPjtCd", { pjtCd: rs.PJT_CD });
        const pjtMap = pjtResult.map;
        console.log("payApp Map", pjtMap);
        if(pjtMap == null){ return; }

        /**PM 데이터 */
        const userInfo = getUser(pjtMap.PM_EMP_SEQ);
        if(userInfo == null){ return; }

        approvalLine.global.pmUserInfo = userInfo;
        approvalLine.global.pmUserCk = "Y";

        const userArr = approvalLine.global.userArr;

        let ck = true;
        for(let i=0; i<userArr.length; i++){
            const map = userArr[i];
            /** PM 결재선에 포함되있으면 추가 X */
            if(map.EMP_SEQ == userInfo.EMP_SEQ){
                ck = false;
            }
        }
        if(ck){
            approvalLine.rowApprovalSet(userInfo, "147");
        }
    },

    setCopperLineData: function(){
        const userArr = approvalLine.global.userArr;
        approvalLine.copperLineCk();

        const userInfo = approvalLine.global.userInfo;
        const userDept = userInfo.DEPT_SEQ;
        const userParentDept = userInfo.deptId;

        const approvalMngData = approvalLine.global.approvalMngData;
        const cUserInfo1 = approvalLine.global.copperUserInfo1;
        const cUserInfo2 = approvalLine.global.copperUserInfo2;

        let cUserTempDept1 = null;
        let cUserTempDept2 = null;

        const copperType = approvalLine.global.copperType;

        /** 2. 겸직 데이터 체크 */
        if(approvalMngData.teamId1 != null){
            cUserTempDept1 = approvalMngData.teamId1;
        }
        if(approvalMngData.deptId2 != null){
            cUserTempDept2 = approvalMngData.deptId2;
        }

        /** 3. 협조 결재선 세팅 */
        const approveType = "1";
        if(copperType == "A"){
            let ck = true;
            for(let i=0; i<userArr.length; i++){
                const map = userArr[i];
                /** 협조자가 결재선에 포함되있으면 추가 X */
                console.log("map.approveEmpSeq", map.approveEmpSeq);
                console.log("approvalLine.global.copperUserInfo1.EMP_SEQ", approvalLine.global.copperUserInfo1.EMP_SEQ);
                if(map.EMP_SEQ == approvalLine.global.copperUserInfo1.EMP_SEQ){
                    ck = false;
                }
            }
            if(ck){
                approvalLine.rowApprovalSet(approvalLine.global.copperUserInfo1, approveType);
            }
        }else if(copperType == "B"){
            let ck1 = true;
            let ck2 = true;
            for(let i=0; i<userArr.length; i++){
                const map = userArr[i];
                /** 협조자가 결재선에 포함되있으면 추가 X */
                if(map.EMP_SEQ == approvalLine.global.copperUserInfo1.EMP_SEQ){
                    ck1 = false;
                }
                if(map.EMP_SEQ == approvalLine.global.copperUserInfo2.EMP_SEQ){
                    ck2 = false;
                }
            }

            /** 협조1과 2가 같은 사람이면 한번만 추가 */
            if(ck1 && cUserInfo1.EMP_SEQ != cUserInfo2.EMP_SEQ){
                approvalLine.rowApprovalSet(approvalLine.global.copperUserInfo1, approveType);
            }
            if(ck2){
                approvalLine.rowApprovalSet(approvalLine.global.copperUserInfo2, approveType);
            }
        }
    },

    /** 결재선 1줄 세팅 */
    rowApprovalSet: function(userInfo, approveType){
        if(userInfo == null){
            return;
        }

        var data = {
            approveEmpSeq : userInfo.EMP_SEQ,
            approveEmpName : userInfo.EMP_NAME_KR,
            approvePositionName : userInfo.POSITION_NAME,
            approveDutyName : userInfo.DUTY_NAME,
            approveDeptSeq : userInfo.DEPT_SEQ,
            approveDeptName : userInfo.DEPT_NAME,
            approveOrder : String(approvalLine.global.approverArr.length),
            approveType : approveType
        }

        console.log("추가 데이터", data);
        approvalLine.global.approverArr.push(data);
    },

    /** 마지막 유저 세팅 */
    lastApprovalSet: function(userInfo){
        draft.global.lastApprover = {
            approveEmpSeq : userInfo.EMP_SEQ,
            approveEmpName : userInfo.EMP_NAME_KR,
            approvePositionName : userInfo.POSITION_NAME,
            approveDutyName : userInfo.DUTY_NAME,
            approveType : "2"
        }
    },

    /** 결재선 정보 송신 */
    setApproval: function(){
        draft.drafterArrAdd();
        draft.global.approversArr = approvalLine.global.approverArr;
        hwpApprovalLine.setHwpApprovalLinePut();
    }
}