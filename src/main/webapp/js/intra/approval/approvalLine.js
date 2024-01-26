/** 결재선 지정 프로세스 */

/**
 * 1. 기안자 정보 조회
 * 1-1. 기안자가 부서에 속해있는지, 팀에 속해있는지 체크
 * 1-2. 부서에 속해있으면 부서장이 있는지, 팀에 속해있으면 팀장, 부서장이 있는지 체크
 *
 * 2. 해당 문서 정보 조회
 * 2-1. 전결 구분 매칭
 * 2-1. 기안자 정보가 전결구분 직급보다 높은치 체크
 * 2-2. 대결, 부재 체크(보류)
 *
 *
 *
 *
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

        /** 결재선 배열 */
        approverArr: []
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


        /** 3. 결재선 생성 */
        if(approvalType == "1"){
            approvalLine.dutyLine();
        }else if(approvalType == "2"){
            approvalLine.payLine();
        }
    },

    /** 직급별 세팅 */
    dutyLine : function(){
        const userInfo = approvalLine.global.userInfo;
        const managerInfo = approvalLine.global.managerInfo;

        const userArr = [];

        /** 원장급 - 본인전결 */
        if(userInfo.DUTY_CODE == "1"){
            userArr.push(userInfo);

        /** 기안자가 부서장급 일때 */
        }else if(userInfo.DUTY_CODE == "2" || userInfo.DUTY_CODE == "3" || userInfo.DUTY_CODE == "4"){
            const level = approvalLine.global.headLevel;

            if(level == 0 || level == null){
                return;
            }

            /** 부서장급 - 원장전결 */
            if(level == "1"){
                userArr.push(userInfo);
                userArr.push(managerInfo.GRAND_MNG_SEQ);

            /** 부서장급 - 본인전결 */
            }else if(level == "2"){
                userArr.push(userInfo);
            }

        /** 기안자가 팀장급 일때 */
        }else if(userInfo.DUTY_CODE == "5"){
            const level = approvalLine.global.leaderLevel;

            if(level == 0 || level == null){
                return;
            }

            /** 팀장급 - 원장전결 */
            if(level == "1"){
                userArr.push(userInfo);
                if(managerInfo.DEPT_MNG_CK == "Y"){
                    userArr.push(getUser(managerInfo.DEPT_MNG_SEQ));
                }
                userArr.push(managerInfo.GRAND_MNG_SEQ);

            /** 팀장급 - 부서장전결 */
            }else if(level == "2") {
                userArr.push(userInfo);
                if(managerInfo.DEPT_MNG_CK == "Y"){
                    userArr.push(getUser(managerInfo.DEPT_MNG_SEQ));
                }

            /** 팀장급 - 자기전결 */
            }else if(level == "3"){
                userArr.push(userInfo);
            }

        /** 기안자가 팀원급 일때 */
        }else{
            const level = approvalLine.global.memberLevel;

            if(level == 0 || level == null){
                return;
            }

            /** 팀원급 - 원장전결 */
            if(level == "1"){
                userArr.push(userInfo);
                if(managerInfo.TEAM_MNG_CK == "Y"){
                    userArr.push(getUser(managerInfo.TEAM_MNG_SEQ));
                }
                if(managerInfo.DEPT_MNG_CK == "Y"){
                    userArr.push(getUser(managerInfo.DEPT_MNG_SEQ));
                }
                userArr.push(managerInfo.GRAND_MNG_SEQ);

            /** 팀원급 - 부서장전결 */
            }else if(level == "2") {
                userArr.push(userInfo);
                if(managerInfo.TEAM_MNG_CK == "Y"){
                    userArr.push(getUser(managerInfo.TEAM_MNG_SEQ));
                }
                if(managerInfo.DEPT_MNG_CK == "Y"){
                    userArr.push(getUser(managerInfo.DEPT_MNG_SEQ));
                }

            /** 팀원급 - 팀장전결 */
            }else if(level == "3"){
                userArr.push(userInfo);
                if(managerInfo.TEAM_MNG_CK == "Y"){
                    userArr.push(getUser(managerInfo.TEAM_MNG_SEQ));

                /** 팀장이 부재일시 부서장이 대신 함. */
                }else if(managerInfo.DEPT_MNG_CK == "Y"){
                    userArr.push(getUser(managerInfo.DEPT_MNG_SEQ));
                }
                console.log("userArr", userArr)
            }
        }

        if(userArr.length != 0){
            approvalLine.decision(userArr);
        }
    },

    payLine: function(){
        const userInfo = approvalLine.global.userInfo;
        const managerInfo = approvalLine.global.managerInfo;

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

        }else if(data.menuCd == "unRndDelv"){

        }

        if(payCkList.length == 0){c
            return;
        }

        for(let i=0; i<payCkList.length; i++){
            const map = payCkList[i];

            /** 시작 금액만 있으면 코드값 <= 금액인지 체크 */
            if(map.ED_PAY != "" || map.ED_PAY == null){
                if(Number(map.ST_PAY) <= requestAmt){
                    level = map.DUTY_VAL;
                    break;
                }

            /** 시작 금액, 종료 금액 다 있으면 시작값 <= 금액 < 끝값 인지 체크 */
            }else{
                if(Number(map.ST_PAY) <= requestAmt < Number(map.ED_PAY)){
                    level = map.DUTY_VAL;
                    break;
                }
            }
        }

        if(level == 0){
            return;
        }

        const userArr = [];

        /** 원장급 - 본인전결 */
        if(userInfo.DUTY_CODE == "1"){
            userArr.push(userInfo);

        /** 기안자가 부서장급 일때 */
        }else if(userInfo.DUTY_CODE == "2" || userInfo.DUTY_CODE == "3" || userInfo.DUTY_CODE == "4"){

            if(level == 0 || level == null){
                return;
            }

            /** 부서장급 - 원장전결 */
            if(level == "1"){
                userArr.push(userInfo);
                userArr.push(managerInfo.GRAND_MNG_SEQ);

                /** 부서장급 - 본인전결 */
            }else if(level == "2"){
                userArr.push(userInfo);
            }

        /** 기안자가 팀장급 일때 */
        }else if(userInfo.DUTY_CODE == "5"){

            if(level == 0 || level == null){
                return;
            }

            /** 팀장급 - 원장전결 */
            if(level == "1"){
                userArr.push(userInfo);
                if(managerInfo.DEPT_MNG_CK == "Y"){
                    userArr.push(getUser(managerInfo.DEPT_MNG_SEQ));
                }
                userArr.push(managerInfo.GRAND_MNG_SEQ);

                /** 팀장급 - 부서장전결 */
            }else if(level == "2") {
                userArr.push(userInfo);
                if(managerInfo.DEPT_MNG_CK == "Y"){
                    userArr.push(getUser(managerInfo.DEPT_MNG_SEQ));
                }

                /** 팀장급 - 자기전결 */
            }else if(level == "3"){
                userArr.push(userInfo);
            }

        /** 기안자가 팀원급 일때 */
        }else{

            if(level == 0 || level == null){
                return;
            }

            /** 팀원급 - 원장전결 */
            if(level == "1"){
                userArr.push(userInfo);
                if(managerInfo.TEAM_MNG_CK == "Y"){
                    userArr.push(getUser(managerInfo.TEAM_MNG_SEQ));
                }
                if(managerInfo.DEPT_MNG_CK == "Y"){
                    userArr.push(getUser(managerInfo.DEPT_MNG_SEQ));
                }
                userArr.push(managerInfo.GRAND_MNG_SEQ);

                /** 팀원급 - 부서장전결 */
            }else if(level == "2") {
                userArr.push(userInfo);
                if(managerInfo.TEAM_MNG_CK == "Y"){
                    userArr.push(getUser(managerInfo.TEAM_MNG_SEQ));
                }
                if(managerInfo.DEPT_MNG_CK == "Y"){
                    userArr.push(getUser(managerInfo.DEPT_MNG_SEQ));
                }

                /** 팀원급 - 팀장전결 */
            }else if(level == "3"){
                userArr.push(userInfo);
                if(managerInfo.TEAM_MNG_CK == "Y"){
                    userArr.push(getUser(managerInfo.TEAM_MNG_SEQ));

                    /** 팀장이 부재일시 부서장이 대신 함. */
                }else if(managerInfo.DEPT_MNG_CK == "Y"){
                    userArr.push(getUser(managerInfo.DEPT_MNG_SEQ));
                }
            }
        }


        if(userArr.length != 0){
            approvalLine.decision(userArr);
        }
    },

    /** 직급별 결재선 입력 */
    decision: function(userArr){
        
        /** 결재자 */
        for(let i=0; i<userArr.length; i++){
            let approveType = "0";
            if(i == userArr.length-1){
                approveType = "2";
            }
            approvalLine.rowApprovalSet(userArr[i], approveType);
        }

        /** 마지막 결재자 */
        approvalLine.lastApprovalSet(userArr[userArr.length-1]);

        /** 결재선 송신 */
        approvalLine.setApproval();
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

        console.log("추가 데이터", data)
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