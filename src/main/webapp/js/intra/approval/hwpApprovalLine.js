var hwpApprovalLine = {
    global : {
        checkSign : "N",
        connectType : null
    },

    setHwpApprovalLinePut : function(){
        const formId = $("#formId").val();
        console.log("----- 양식 결재선 세팅 -----");

        if(formId == "1" || formId == "157"){
            this.documentLinePut();
        }else{
            const list = draft.global.approversArr;

            let empData;
            let copperData;
            for(let i=0; i<list.length; i++){
                if(list[i].approveType == "2"){
                    empData = list[i];
                    console.log("전결자는...", empData);
                }else if(list[i].approveType == "1"){
                    copperData = list[i];
                    console.log("협조자는...", copperData);
                }else{
                }
            }

            let appArr = [];
            if(empData != null){
                /**원장 전결*/
                if(empData.approveDutyName == "원장") {
                    const approveDutyName = draft.global.approversArr[0].approveDutyName;
                    if (approveDutyName == "원장"){
                        appArr = ["공란", "공란", ""];
                    }else if (approveDutyName == "본부장" || approveDutyName == "사업부장" || approveDutyName == "실장") {
                        appArr = ["공란", "공란", ""];
                    }else if(approveDutyName == "센터장" || approveDutyName == "팀장"){
                        appArr = ["공란", "", ""];
                    }

                /**부서장 전결*/
                }else if(empData.approveDutyName == "본부장" || empData.approveDutyName == "사업부장" || empData.approveDutyName == "실장"){
                    const approveDutyName = draft.global.approversArr[0].approveDutyName;
                    if(approveDutyName == "본부장" || approveDutyName == "사업부장" || approveDutyName == "실장"){
                        /** 본인이 본부장이면서 결재선에 팀장, 본부장이 있을경우 공란 문구 삭제 */
                        const arr = draft.global.approversArr.slice(1);
                        const teamCkArr = ["센터장", "팀장"];
                        const teamCk = arr.find(
                            obj => teamCkArr.includes(obj.approveDutyName) && obj.approveType == "0"
                        ) ? true : false;
                        const dutyCkArr = ["본부장", "사업부장", "실장"];
                        const dutyCk = arr.find(
                            obj => dutyCkArr.includes(obj.approveDutyName) && obj.approveType == "0"
                        ) ? true : false;

                        if(!teamCk && !dutyCk){
                            appArr = ["공란", "전결", ""];
                        }else{
                            appArr = ["", "전결", ""];
                        }

                    }else if(approveDutyName == "센터장" || approveDutyName == "팀장"){
                        /** 본인이 팀장이면서 결재선에 팀장이 있을경우 공란 문구 삭제 */
                        const arr = draft.global.approversArr.slice(1);
                        const teamCkArr = ["센터장", "팀장"];
                        const teamCk = arr.find(
                            obj => teamCkArr.includes(obj.approveDutyName) && obj.approveType == "0"
                        ) ? true : false;
                        if(!teamCk){
                            appArr = ["공란", "전결", ""];
                        }else{
                            appArr = ["", "전결", ""];
                        }
                    }else{
                        appArr = ["", "전결", ""];
                    }

                /**팀장 전결*/
                }else if(empData.approveDutyName == "센터장" || empData.approveDutyName == "팀장" || empData.approveDutyName == "팀장 직무대리"){
                    appArr = ["전결", "공란", ""];
                }
            }

            hwpDocCtrl.putFieldText('appr0', appArr[0]);
            hwpDocCtrl.putFieldText('appr1', appArr[1]);
            hwpDocCtrl.putFieldText('appr2', appArr[2]);

            if(copperData != null){
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

                /** 3. 협조 결재선 세팅
                 * 24-09-30. 접수대장과 같이 협조를 직접 설정할 때의 분기 추가
                 * */
                if(draft.global.params.formId != null && (draft.global.params.formId == "194" || draft.global.params.formId == "139" || draft.global.params.formId == "199" || draft.global.params.formId == "200" || draft.global.params.formId == "201")){
                    let copperCnt = 0;
                    for(let i=0; i<list.length; i++){
                        if(list[i].approveType == "1"){
                            hwpDocCtrl.putFieldText('cApprText'+copperCnt, list[i].approveDeptName+"장");
                            copperCnt ++;
                        }
                    }
                }else{
                    const approveType = "1";
                    if(copperType == "A"){
                        if(userDept != cUserTempDept1){
                            hwpDocCtrl.putFieldText('cApprText0', approvalMngData.teamNm1+"장");
                            hwpDocCtrl.putFieldText('cAppr0', "전결");
                            hwpDocCtrl.putFieldText('cApprText1', approvalMngData.deptNm1+"장");
                        }else{
                            const userArr = approvalLine.global.userArr;
                            let ck = true;
                            for(let i=0; i<userArr.length; i++){
                                const map = userArr[i];
                                /** 협조자가 결재선에 포함되있으면 추가 X */
                                if(map.EMP_SEQ == approvalLine.global.copperUserInfo1.EMP_SEQ){
                                    ck = false;
                                }
                            }
                            if(ck){
                                hwpDocCtrl.putFieldText('cApprText0', approvalMngData.teamNm1+"장");
                                hwpDocCtrl.putFieldText('cApprText1', approvalMngData.deptNm1+"장");
                                hwpDocCtrl.putFieldText('cAppr1', "공란");
                            }
                        }
                    }else if(copperType == "B"){

                        if(userParentDept != cUserTempDept2){

                            hwpDocCtrl.putFieldText('cApprText0', approvalMngData.teamNm1+"장");

                            if(cUserInfo1.EMP_SEQ == cUserInfo2.EMP_SEQ){
                                hwpDocCtrl.putFieldText('cAppr0', "공란");
                            }

                            hwpDocCtrl.putFieldText('cApprText1', approvalMngData.deptNm1+"장");
                        }else{
                            const userArr = approvalLine.global.userArr;
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
                            hwpDocCtrl.putFieldText('cApprText0', approvalMngData.teamNm1+"장");
                            if(ck1 && cUserInfo1.EMP_SEQ != cUserInfo2.EMP_SEQ){
                            }else{
                                hwpDocCtrl.putFieldText('cAppr0', "공란");
                            }

                            hwpDocCtrl.putFieldText('cApprText1', approvalMngData.deptNm1+"장");
                            if(ck2){
                            }else{
                                hwpDocCtrl.putFieldText('cAppr1', "공란");
                            }
                        }
                    }else{
                        hwpDocCtrl.putFieldText('cApprText0', approvalMngData.teamNm1+"장");
                    }
                }
            }


            const field = "apprZ0";
            if(hwpDocCtrl.fieldExist(field)){
                setTimeout(function() {
                    /** 기안자 사인 */
                    const empSeq = $("#empSeq").val();
                    const empName = $("#empName").val();
                    if(draft.global.params.formId != "1" && draft.global.params.formId != "157" && $("#mySignCk").val() == "N"){
                        if(draft.global.params.formId != "96" && draft.global.params.formId != "153"){
                            hwpApprovalLine.setSign(field, empSeq, empName);
                        }else{
                            hwpApprovalLine.setTranscript(field, $("#approveEmpSeq").val(), $("#approveEmpName").val());
                        }
                        $("#mySignCk").val("Y");
                    }
                }, 2500);
            }
        }
        console.log("----- 양식 결재선 세팅 끝 -----");

        $("#nowApprTr").show();

        const list = draft.global.approversArr;
        let nowApprText = "";

        for(let i=0; i<list.length; i++){
            const map = list[i];

            if(i != 0){
                nowApprText += " ";
            }

            const approveType = map.approveType;
            let approveTypeText =
                approveType == 3 ? "결재안함" :
                    approveType == 2 ? "전결" :
                        approveType == 1 ? "협조" :
                            approveType == 0 && map.approveOrder == 0 ? "상신" : "결재";
            nowApprText += map.approveOrder+". "+map.approveDeptName+" "+map.approveEmpName+" "+approveTypeText;
        }
        $("#nowApprSpan").text(nowApprText);
    },

    setHwpApprovalSignPut : function(){
        console.log("----- 양식 사인 세팅 -----");

        let list = docView.global.rs.approveRoute;
        console.log("------------------------------- appr ---------------------------------");
        console.log(list);

        let ip = "";
        if(serverName == "218.158.231.184" || serverName == "new.camtic.or.kr"){
            ip = "https://new.camtic.or.kr"
        }else{
            ip = "http://218.158.231.186"
        }

        let empData;
        let copperData;
        let pmData;

        for(let i=0; i<list.length; i++){
            if(list[i].APPROVE_TYPE == "2"){
                empData = list[i];
                console.log("----- 전결자는... -----");
                console.log(empData);
            }
            else if(list[i].APPROVE_TYPE == "1"){
                copperData = list[i];
                console.log("----- 협조자는... -----");
                console.log(copperData);
            }
            else if(list[i].APPROVE_TYPE == "147"){
                pmData = list[i];
                console.log("----- 사업책임자는... -----");
                console.log(pmData);
            }
        }
        if(list[list.length - 1].APPROVE_TYPE == "0" && list[list.length - 1].APPROVE_DUTY_NAME == "원장"){
            empData = list[list.length - 1];
            console.log("----- 최종결재자는... -----");
            console.log(empData);
        }

        let appArr = [];
        /** 부서장 전결 */
        if(empData.APPROVE_DUTY_NAME == "본부장" || empData.APPROVE_DUTY_NAME == "사업부장" || empData.APPROVE_DUTY_NAME == "실장"){
            /** appArr = ["sigh1", "전결", "sigh2"] */
            let teamCk = "N";

            for (let i = 0; i < list.length; i++) {
                if ((list[i].APPROVE_DUTY_NAME == "센터장" || list[i].APPROVE_DUTY_NAME == "팀장" || list[i].APPROVE_DUTY_NAME == "팀장 직무대리")
                    && docView.global.rs.approveNowRoute.APPROVE_EMP_SEQ == list[i].APPROVE_EMP_SEQ && docView.global.rs.approveNowRoute.APPROVE_TYPE != "147") {

                    teamCk = "Y";

                    const signField = "appr0";
                    if(docView.global.rs.docInfo.FORM_ID != "96" && docView.global.rs.docInfo.FORM_ID != "153"){
                        hwpApprovalLine.setSign(signField, docView.global.rs.approveNowRoute.APPROVE_EMP_SEQ, docView.global.rs.approveNowRoute.APPROVE_EMP_NAME, "view");
                    }else{
                        hwpApprovalLine.setTranscript(signField, docView.global.rs.approveNowRoute.APPROVE_EMP_SEQ, docView.global.rs.approveNowRoute.APPROVE_EMP_NAME, "view");
                    }
                }
            }

            if(list[0].LAST_APPROVE_EMP_SEQ == docView.global.rs.approveNowRoute.APPROVE_EMP_SEQ
                && docView.global.rs.approveNowRoute.APPROVE_TYPE != "147"){

                /** 팀장 공석 체크해서 없으면 공란 처리 */
                for (let i = 0; i < list.length; i++) {
                    if ((list[i].APPROVE_DUTY_NAME == "센터장" || list[i].APPROVE_DUTY_NAME == "팀장" || list[i].APPROVE_DUTY_NAME == "팀장 직무대리") && list[i].APPROVE_TYPE != "1"
                        && list[i].APPROVE_TYPE != "147") {
                        teamCk = "Y";
                    }
                }
                if(teamCk == "N"){
                    hwpDocCtrl.putFieldText('appr0', "공란");
                }

                const signField = "appr2";

                if(docView.global.rs.docInfo.FORM_ID != "96" && docView.global.rs.docInfo.FORM_ID != "153"){
                    hwpApprovalLine.setSign(signField, docView.global.rs.approveNowRoute.APPROVE_EMP_SEQ, docView.global.rs.approveNowRoute.APPROVE_EMP_NAME, "view");
                }else{
                    hwpApprovalLine.setTranscript(signField, docView.global.rs.approveNowRoute.APPROVE_EMP_SEQ, docView.global.rs.approveNowRoute.APPROVE_EMP_NAME, "view");
                }
            }

            /** 팀장 전결 */
        }else if(empData.APPROVE_DUTY_NAME == "센터장" || empData.APPROVE_DUTY_NAME == "팀장" || empData.APPROVE_DUTY_NAME == "팀장 직무대리"){
            /** appArr = ["전결", "공란", "sigh1"] */
            if(list[0].LAST_APPROVE_EMP_SEQ == docView.global.rs.approveNowRoute.APPROVE_EMP_SEQ
                && docView.global.rs.approveNowRoute.APPROVE_TYPE != "147"){
                const signField = "appr2";


                if(docView.global.rs.docInfo.FORM_ID != "96" && docView.global.rs.docInfo.FORM_ID != "153"){
                    hwpApprovalLine.setSign(signField, docView.global.rs.approveNowRoute.APPROVE_EMP_SEQ, docView.global.rs.approveNowRoute.APPROVE_EMP_NAME, "view");
                }else{
                    hwpApprovalLine.setTranscript(signField, docView.global.rs.approveNowRoute.APPROVE_EMP_SEQ, docView.global.rs.approveNowRoute.APPROVE_EMP_NAME, "view");
                }
            }

        }else{
            /** appArr = ["sigh1", "sigh2", "sigh3"] */
            let teamCk = "N";
            let deptCk = "N";
            for (let i = 0; i < list.length; i++) {
                if ((list[i].APPROVE_DUTY_NAME == "센터장" || list[i].APPROVE_DUTY_NAME == "팀장" || list[i].APPROVE_DUTY_NAME == "팀장 직무대리")
                    && docView.global.rs.approveNowRoute.APPROVE_EMP_SEQ == list[i].APPROVE_EMP_SEQ
                    && docView.global.rs.approveNowRoute.APPROVE_TYPE != "147") {

                    const signField = "appr0";

                    if(docView.global.rs.docInfo.FORM_ID != "96" && docView.global.rs.docInfo.FORM_ID != "153"){
                        hwpApprovalLine.setSign(signField, docView.global.rs.approveNowRoute.APPROVE_EMP_SEQ, docView.global.rs.approveNowRoute.APPROVE_EMP_NAME, "view");
                    }else{
                        hwpApprovalLine.setTranscript(signField, docView.global.rs.approveNowRoute.APPROVE_EMP_SEQ, docView.global.rs.approveNowRoute.APPROVE_EMP_NAME, "view");
                    }
                }
            }

            for(let i=0; i<list.length; i++){
                if ((list[i].APPROVE_DUTY_NAME == "본부장" || list[i].APPROVE_DUTY_NAME == "사업부장" || list[i].APPROVE_DUTY_NAME == "실장")
                    && docView.global.rs.approveNowRoute.APPROVE_EMP_SEQ == list[i].APPROVE_EMP_SEQ
                    && docView.global.rs.approveNowRoute.APPROVE_TYPE != "147") {

                    /** 팀장 공석 체크해서 없으면 공란 처리 */
                    for (let i = 0; i < list.length; i++) {
                        if ((list[i].APPROVE_DUTY_NAME == "센터장" || list[i].APPROVE_DUTY_NAME == "팀장" || list[i].APPROVE_DUTY_NAME == "팀장 직무대리") && list[i].APPROVE_TYPE != "1" && list[i].APPROVE_TYPE != "147") {
                            teamCk = "Y";
                        }
                    }
                    if(teamCk == "N"){
                        hwpDocCtrl.putFieldText('appr0', "공란");
                    }

                    const signField = "appr1";
                    if(docView.global.rs.docInfo.FORM_ID != "96" && docView.global.rs.docInfo.FORM_ID != "153"){
                        hwpApprovalLine.setSign(signField, docView.global.rs.approveNowRoute.APPROVE_EMP_SEQ, docView.global.rs.approveNowRoute.APPROVE_EMP_NAME, "view");
                    }else{
                        hwpApprovalLine.setTranscript(signField, docView.global.rs.approveNowRoute.APPROVE_EMP_SEQ, docView.global.rs.approveNowRoute.APPROVE_EMP_NAME, "view");
                    }
                }
            }

            if(list[0].LAST_APPROVE_EMP_SEQ == docView.global.rs.approveNowRoute.APPROVE_EMP_SEQ
                && docView.global.rs.approveNowRoute.APPROVE_TYPE != "147"){

                /** 부서장 공석 체크해서 없으면 공란 처리 */
                for (let i = 0; i < list.length; i++) {
                    if ((list[i].APPROVE_DUTY_NAME == "본부장" || list[i].APPROVE_DUTY_NAME == "사업부장" || list[i].APPROVE_DUTY_NAME == "실장")
                        && list[i].APPROVE_TYPE != "1" && list[i].APPROVE_TYPE != "147") {
                        deptCk = "Y";
                    }
                }
                if(deptCk == "N"){
                    hwpDocCtrl.putFieldText('appr1', "공란");
                }

                const signField = "appr2";
                if(docView.global.rs.docInfo.FORM_ID != "96" && docView.global.rs.docInfo.FORM_ID != "153"){
                    hwpApprovalLine.setSign(signField, docView.global.rs.approveNowRoute.APPROVE_EMP_SEQ, docView.global.rs.approveNowRoute.APPROVE_EMP_NAME, "view");
                }else{
                    hwpApprovalLine.setTranscript(signField, docView.global.rs.approveNowRoute.APPROVE_EMP_SEQ, docView.global.rs.approveNowRoute.APPROVE_EMP_NAME, "view");
                }
            }
        }

        if(pmData != null){
            hwpApprovalLine.setPjtPayApp();
        }

        console.log("----- 양식 사인 세팅 끝 -----");
    },

    setHwpApprovalDocuSignPut : function(formId){
        if(formId == "1" || formId == "157") {
            let list = docView.global.rs.approveRoute;

            let DText = "";

            for (let i = 1; i < list.length; i++) {
                const map = list[i];

                if(map.APPROVE_STAT_CODE == null){
                    continue;
                }

                if(map.APPROVE_TYPE == "0" || map.APPROVE_TYPE == "2"){

                    if(map.APPROVE_DUTY_NAME == "센터장" || map.APPROVE_DUTY_NAME == "팀장" || map.APPROVE_DUTY_NAME == "팀장 직무대리"){
                        let field = "docAppr1";
                        let field2 = "docAppr1011";
                        if(map.APPROVE_STAT_CODE == 101){
                            hwpDocCtrl.putFieldText(field2, "전결");
                        }
                        hwpApprovalLine.setName(field, map.APPROVE_EMP_NAME, map.PROXY_APPROVE_EMP_SEQ, field2);
                    }else if(map.APPROVE_DUTY_NAME == "본부장" || map.APPROVE_DUTY_NAME == "사업부장" || map.APPROVE_DUTY_NAME == "실장"){
                        let field = "docAppr2";
                        let field2 = "docAppr1012";
                        if(map.APPROVE_STAT_CODE == 101){
                            hwpDocCtrl.putFieldText(field2, "전결");
                        }
                        hwpApprovalLine.setName(field, map.APPROVE_EMP_NAME, map.PROXY_APPROVE_EMP_SEQ, field2);
                    }else if(map.APPROVE_DUTY_NAME == "원장"){
                        let field = "docAppr3";
                        hwpApprovalLine.setName(field, map.APPROVE_EMP_NAME, map.PROXY_APPROVE_EMP_SEQ);
                    }

                /** 협조 사인 */
                }else{
                    let dApprInfo = getUser(map.APPROVE_EMP_SEQ);

                    let empName = dApprInfo.EMP_NAME_KR;
                    let deptName = dApprInfo.DEPT_NAME;
                    if(dApprInfo.DEPT_LEVEL != null && dApprInfo.DEPT_LEVEL == "2"){
                        deptName = dApprInfo.teamNm;
                    }

                    /** 부재설정이 되어있으면 대결자의 정자가 들어감 */
                    if(map.PROXY_APPROVE_EMP_SEQ != null){
                        empName = getUser(map.PROXY_APPROVE_EMP_SEQ).EMP_NAME_KR;
                        deptName = getUser(map.PROXY_APPROVE_EMP_SEQ).DEPT_NAME;
                    }

                    if(DText != ""){
                        DText += ", ";
                    }

                    if(map.APPROVE_STAT_CODE == "20"){
                        if(map.APPROVE_DUTY_NAME != ""){
                            DText += deptName+"장 "+empName;
                        }else{
                            DText += deptName+" "+empName;
                        }
                    }
                }

                if(map.APPROVE_STAT_CODE == 100 || map.APPROVE_STAT_CODE == 101){
                    const docInfo =docView.global.rs.docInfo;

                    /** 외부시행문서 일경우 직인 */
                    if(docInfo.DOC_GBN == "001"){
                        if(hwpDocCtrl.global.HwpCtrl.FieldExist("인")){
                            const signInfo = getSign();
                            const signUrl = "https://new.camtic.or.kr"+signInfo.FILE_NO;
                            hwpDocCtrl.global.HwpCtrl.MoveToField('인', true, true, false);
                            hwpDocCtrl.global.HwpCtrl.InsertBackgroundPicture(
                                "SelectedCell",
                                signUrl,
                                1,
                                6,
                                0,
                                0,
                                0,
                                0
                            );
                        }
                    }

                    /** 종결날짜 */
                    if(docInfo != null && docInfo.LAST_APPROVE_DT != null){
                        hwpDocCtrl.putFieldText('DOC_DT', "(" + docInfo.LAST_APPROVE_DT+")");
                    }
                }
            }

            if(DText != ""){
                const field = "docDAppr";
                hwpDocCtrl.putFieldText(field, DText);
            }

            const docInfo =docView.global.rs.docInfo;
            console.log(docInfo);

            hwpDocCtrl.putFieldText('DOC_NO', docInfo.DOC_NO);
            hwpDocCtrl.putFieldText('SECURITY_TYPE', docInfo.SECURITY_TYPE == "000" ? "공개" : "비공개");

        }
    },

    setName : function(fieldName, APPROVE_EMP_NAME, PROXY_APPROVE_EMP_SEQ, field2){
        /** 부재설정이 되어있으면 대결자의 정자가 들어감 */
        let empName = APPROVE_EMP_NAME;
        if(PROXY_APPROVE_EMP_SEQ != null && PROXY_APPROVE_EMP_SEQ != undefined){
            empName = getUser(PROXY_APPROVE_EMP_SEQ).EMP_NAME_KR;
            hwpDocCtrl.putFieldText(field2, "대결");
        }
        hwpDocCtrl.putFieldText(fieldName, empName);
    },

    setSign : function(fieldName, empSeq, empName, type){

        let ip = "";
        if(serverName == "218.158.231.184" || serverName == "new.camtic.or.kr"){
            ip = "https://new.camtic.or.kr";
        }else{
            ip = "http://218.158.231.186";
        }

        /** 부재설정이 되어있으면 대결자의 정보가 들어감 */
        if(type == "view"){
            if(docView.global.rs.approveNowRoute.SUB_APPROVAL == 'Y'){
                empSeq = $("#approveEmpSeq").val();
                empName = "대결 "+$("#approveEmpName").val();
            }
        }

        /** 사인 조회 후 있으면 이미지, 없으면 정자 기입 */
        const result = customKendo.fn_customAjax("/user/getSign", {empSeq: empSeq});
        if(result.data.signImg != null){
            const imgMap = result.data.signImg;

            if(type == "view"){
                if(docView.global.rs.approveNowRoute.SUB_APPROVAL == 'Y'){
                    hwpDocCtrl.putFieldText(fieldName, "대결");
                }
            }
            hwpDocCtrl.moveToField(fieldName, true, true, false);

            hwpDocCtrl.global.HwpCtrl.InsertPicture(
                ip + imgMap.file_path + imgMap.file_uuid,
                true, 3, false, false, 0, 0, 0, function(ctrl){
                    if(ctrl){
                        console.log('성공');
                        hwpApprovalLine.global.checkSign = "Y";

                        if($("#mySignLoadingCk").val() == "N"){
                            setTimeout(function() {
                                $("#loadingDiv").hide();
                            }, 2000);
                        }
                        hwpApprovalLine.setPjtPayApp();
                    }else{
                        console.log('실패');
                    }
                }
            );
        }else{
            hwpDocCtrl.putFieldText(fieldName, empName);

            if($("#mySignLoadingCk").val() == "N"){
                setTimeout(function() {
                    $("#loadingDiv").hide();
                }, 2000);
            }

            hwpApprovalLine.setPjtPayApp();
        }
    },

    setPjtPayApp : function(){
        if($("#type").val() != "drafting" && docView.global.rs.docInfo.FORM_ID == "147"){
            const payAppSn = docView.global.params.approKey.split("_")[1];
            const result = customKendo.fn_customAjax("/payApp/pop/getPayAppData", { payAppSn: payAppSn });
            const rs = result.map;
            const pjtResult = customKendo.fn_customAjax("/project/getProjectByPjtCd2", { pjtCd: rs.PJT_CD });
            const pjtMap = pjtResult.map;
            if(pjtMap != null){
                /**PM 데이터 */
                const userInfo = getUser(pjtMap.PM_EMP_SEQ);

                if(docView.global.rs.approveNowRoute.APPROVE_EMP_SEQ == pjtMap.PM_EMP_SEQ){
                    const signField = "paySign";
                    hwpApprovalLine.setTranscript(signField, pjtMap.PM_EMP_SEQ, userInfo.EMP_NAME_KR);

                }else if(hwpApprovalLine.global.connectType == "mobile"){
                    documentHwpSave()
                }

            }else if(hwpApprovalLine.global.connectType == "mobile"){
                documentHwpSave()
            }

        }else if(hwpApprovalLine.global.connectType == "mobile"){
            documentHwpSave()
        }
    },

    setTranscript : function(fieldName, empSeq, empName, type){
        let ip = "";
        if(serverName == "218.158.231.184" || serverName == "new.camtic.or.kr"){
            ip = "https://new.camtic.or.kr";
        }else{
            ip = "http://218.158.231.186";
        }

        /** 부재설정이 되어있으면 대결자의 정보가 들어감 */
        if(type == "view"){
            if(docView.global.rs.approveNowRoute.SUB_APPROVAL == 'Y'){
                empSeq = $("#approveEmpSeq").val();
                empName = "대결 "+$("#approveEmpName").val();
            }
        }

        const result = customKendo.fn_customAjax("/user/getSign", {empSeq: empSeq});
        if(result.data.sign2Img != null){
            const imgMap = result.data.sign2Img;

            if(type == "view"){
                if(docView.global.rs.approveNowRoute.SUB_APPROVAL == 'Y'){
                    hwpDocCtrl.putFieldText(fieldName+"sub", "대결");
                }
            }
            hwpDocCtrl.moveToField(fieldName, true, true, false);

            hwpDocCtrl.global.HwpCtrl.InsertPicture(
                ip + imgMap.file_path + imgMap.file_uuid,
                true, 3, false, false, 0, 0, 0, function(ctrl){
                    if(ctrl){
                        console.log('성공');

                        hwpApprovalLine.global.checkSign = "Y";

                        if(hwpApprovalLine.global.connectType == "mobile"){
                            documentHwpSave()
                        }
                    }else{
                        console.log('실패');
                    }
                }
            );
        }else{
            hwpDocCtrl.putFieldText(fieldName, empName);

            if(hwpApprovalLine.global.connectType == "mobile"){
                documentHwpSave()
            }
        }
    },

    documentLinePut : function(){
        /** 기안문서 결재선 지정시 공문 하단 결재선 입력 */
        hwpDocCtrl.putFieldText("docAppr1", " ");
        hwpDocCtrl.putFieldText("docAppr2", " ");
        hwpDocCtrl.putFieldText("docAppr3", " ");
        hwpDocCtrl.putFieldText("docDApprNm", " ");
        hwpDocCtrl.putFieldText("docDAppr", " ");
        hwpDocCtrl.putFieldText("docAppr1011", " ");
        hwpDocCtrl.putFieldText("docAppr1012", " ");
        hwpDocCtrl.putFieldText("docApprNm1", " ");
        hwpDocCtrl.putFieldText("docApprNm2", " ");
        hwpDocCtrl.putFieldText("docApprNm3", " ");

        hwpDocCtrl.putFieldText('docApprNm0', "기안자");
        let field = "docAppr0";
        hwpDocCtrl.putFieldText(field, $("#empName").val());

        let list = draft.global.approversArr;
        console.log("approversArr", draft.global.approversArr)
        let count = 0;
        for(let i=1; i<list.length; i++){
            const map = list[i];
            if(map.approveType == "0" || map.approveType == "2"){
                count += 1;

                if(map.approveDutyName == "센터장" || map.approveDutyName == "팀장"){
                    hwpDocCtrl.putFieldText('docApprNm1', "팀 장");
                }
                if((map.approveDutyName == "본부장") || map.approveDutyName == "사업부장" || map.approveDutyName == "실장"){
                    hwpDocCtrl.putFieldText('docApprNm2', "부서장");
                }
                if(map.approveDutyName == "원장"){
                    hwpDocCtrl.putFieldText('docApprNm3', "원 장");
                }
            }else{
                hwpDocCtrl.putFieldText('docDApprNm', "협조자");
            }
        }
    }


}