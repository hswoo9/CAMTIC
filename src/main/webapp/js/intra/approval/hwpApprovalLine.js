var hwpApprovalLine = {

    setHwpApprovalLinePut : function(){
        const formId = $("#formId").val();
        console.log("----- 양식 결재선 세팅 -----");

        if(formId == "1"){

            /** 기안문서 결재선 지정시 공문 하단 결재선 입력 */
            hwpDocCtrl.putFieldText('docApprNm0', "기안자");

            let list = draft.global.approversArr;
            console.log("approversArr", draft.global.approversArr)
            let count = 0;
            for(let i=1; i<list.length; i++){
                const map = list[i];
                if(map.approveType == "0" || map.approveType == "2"){
                    count += 1;

                    if(map.approveDutyName == "팀장"){
                        hwpDocCtrl.putFieldText('docApprNm1', "팀 장");
                    }
                    if((map.approveDutyName == "본부장") || map.approveDutyName == "사업부장" || map.approveDutyName == "센터장"){
                        hwpDocCtrl.putFieldText('docApprNm2', "부서장");
                    }
                    if(map.approveDutyName == "원장"){
                        hwpDocCtrl.putFieldText('docApprNm3', "원 장");
                    }
                }else{
                    hwpDocCtrl.putFieldText('docDApprNm', "협조자");
                }
            }
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
                /**부서장 전결*/
                if(empData.approveDutyName == "본부장" || empData.approveDutyName == "사업부장" || empData.approveDutyName == "센터장" || empData.approveDutyName == "실장"){
                    appArr = ["", "전결", ""];

                /**팀장 전결*/
                }else if(empData.approveDutyName == "팀장" || empData.approveDutyName == "팀장 직무대리"){
                    appArr = ["전결", "공란", ""];
                }
            }

            hwpDocCtrl.putFieldText('appr0', appArr[0]);
            hwpDocCtrl.putFieldText('appr1', appArr[1]);
            hwpDocCtrl.putFieldText('appr2', appArr[2]);

            if(copperData != null){
                hwpDocCtrl.putFieldText('cApprText0', copperData.approveDeptName+"장");
            }
        }
        console.log("----- 양식 결재선 세팅 끝 -----");
    },

    setHwpApprovalSignPut : function(formId){
        console.log("----- 양식 사인 세팅 -----");

        if(formId == "1"){
            let list = docView.global.rs.approveRoute;

            let DText = "";
            for (let i = 0; i < list.length; i++) {
                const map = list[i];

                if(map.APPROVE_STAT_CODE == null){
                    continue;
                }

                /** 반려일때 초기화 */
                if(map.APPROVE_STAT_CODE == 30){
                    let field = "docAppr1";
                    hwpDocCtrl.putFieldText(field, " ");
                    field = "docAppr2";
                    hwpDocCtrl.putFieldText(field, " ");
                    field = "docAppr3";
                    hwpDocCtrl.putFieldText(field, " ");
                    break;
                }

                if(map.APPROVE_STAT_CODE == 10 || (String(map.DRAFT_EMP_SEQ) == String(map.LAST_APPROVE_EMP_SEQ))){
                    let field = "docAppr0";
                    hwpDocCtrl.putFieldText(field, map.APPROVE_EMP_NAME);

                }else if(map.APPROVE_TYPE == "0" || map.APPROVE_TYPE == "2"){

                    if(map.APPROVE_DUTY_NAME == "팀장" || map.APPROVE_DUTY_NAME == "팀장 직무대리"){
                        let field = "docAppr1";
                        let field2 = "docAppr1011";
                        hwpDocCtrl.putFieldText(field, map.APPROVE_EMP_NAME);
                        if(map.APPROVE_STAT_CODE == 101){
                            hwpDocCtrl.putFieldText(field2, "전결");
                        }
                    }else if(map.APPROVE_DUTY_NAME == "본부장" || map.APPROVE_DUTY_NAME == "사업부장" || map.APPROVE_DUTY_NAME == "센터장" || map.APPROVE_DUTY_NAME == "실장"){
                        let field = "docAppr2";
                        let field2 = "docAppr1012";
                        hwpDocCtrl.putFieldText(field, map.APPROVE_EMP_NAME);
                        if(map.APPROVE_STAT_CODE == 101){
                            hwpDocCtrl.putFieldText(field2, "전결");
                        }
                    }else if(map.APPROVE_DUTY_NAME == "원장"){
                        let field = "docAppr3";
                        hwpDocCtrl.putFieldText(field, map.APPROVE_EMP_NAME);
                    }

                }else{
                    let field = "docDAppr";
                    if(DText != ""){
                        DText += ", ";
                    }
                    DText += map.APPROVE_EMP_NAME;
                    hwpDocCtrl.putFieldText(field, DText);

                }

                if(map.APPROVE_STAT_CODE == 100 || map.APPROVE_STAT_CODE == 101){
                    const docInfo =docView.global.rs.docInfo;

                    /** 외부시행문서 일경우 직인 */
                    if(docInfo.DOC_GBN == "001"){
                        if(hwpDocCtrl.global.HwpCtrl.FieldExist("인")){
                            hwpDocCtrl.global.HwpCtrl.MoveToField('인', true, true, false);
                            hwpDocCtrl.global.HwpCtrl.InsertBackgroundPicture(
                                "SelectedCell",
                                "http://" + location.host + "/upload/journeyman/companySignature.png",
                                1,
                                6,
                                0,
                                0,
                                0,
                                0
                            );
                        }
                    }
                }
            }

            const docInfo =docView.global.rs.docInfo;
            console.log(docInfo);

            hwpDocCtrl.putFieldText('DOC_NO', docInfo.DOC_NO);
            hwpDocCtrl.putFieldText('SECURITY_TYPE', docInfo.SECURITY_TYPE == "000" ? "공개" : "비공개");

        }else{
            let list = docView.global.rs.approveRoute;
            console.log("------------------------------- appr ---------------------------------");
            console.log(list);

            let ip = "";
            if(serverName == "218.158.231.184" || serverName == "new.camtic.or.kr"){
                ip = "http://218.158.231.184"
            }else{
                ip = "http://218.158.231.186"
            }

            let empData;
            let copperData;
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
            }

            /** 기안자 사인 */
            if ((list.length > 1 && docView.global.rs.approveNowRoute.APPROVE_EMP_SEQ == list[1].APPROVE_EMP_SEQ && list[0].APPROVE_STAT_CODE == 10)
                || list.length == 1) {
                const result = customKendo.fn_customAjax("/user/getSign", {empSeq: list[0].APPROVE_EMP_SEQ});
                if(result.data.signImg != null){
                    const imgMap = result.data.signImg;

                    hwpDocCtrl.moveToField("apprZ0", true, true, false);
                    hwpDocCtrl.global.HwpCtrl.InsertPicture(
                        ip + imgMap.file_path + imgMap.file_uuid,
                        true, 3, false, false, 0, 0, function(ctrl){
                            if(ctrl){
                                console.log('성공');
                            }else{
                                console.log('실패');
                            }
                        });
                }else{
                    hwpDocCtrl.putFieldText('apprZ0', list[0].APPROVE_EMP_NAME);
                }
            }


            let appArr = [];
            /** 부서장 전결 */
            if(empData.APPROVE_DUTY_NAME == "본부장" || empData.APPROVE_DUTY_NAME == "사업부장" || empData.APPROVE_DUTY_NAME == "센터장" || empData.APPROVE_DUTY_NAME == "실장"){
                appArr = ["sigh1", "전결", "sigh2"];
                let teamCk = "N";
                for (let i = 0; i < list.length; i++) {
                    if ((list[i].APPROVE_DUTY_NAME == "팀장" || list[i].APPROVE_DUTY_NAME == "팀장 직무대리") && list[i].APPROVE_TYPE != "1" && docView.global.rs.approvePrevRoute.APPROVE_EMP_SEQ == list[i].APPROVE_EMP_SEQ) {
                        teamCk = "Y";
                        if(list[i].APPROVE_STAT_CODE == 20){
                            const result = customKendo.fn_customAjax("/user/getSign", {empSeq: list[i].APPROVE_EMP_SEQ});
                            if(result.data.signImg != null){
                                const imgMap = result.data.signImg;

                                hwpDocCtrl.moveToField("appr0", true, true, false);
                                hwpDocCtrl.global.HwpCtrl.InsertPicture(
                                    ip + imgMap.file_path + imgMap.file_uuid,
                                    true, 3, false, false, 0, 0, function(ctrl){
                                        if(ctrl){
                                            console.log('성공');
                                        }else{
                                            console.log('실패');
                                        }
                                    });
                            }else{
                                hwpDocCtrl.putFieldText('appr0', list[i].APPROVE_EMP_NAME);
                            }
                        }
                    }
                }

                for(let i=0; i<list.length; i++){
                    if((list[i].APPROVE_DUTY_NAME == "본부장"
                    || list[i].APPROVE_DUTY_NAME == "센터장"
                    || list[i].APPROVE_DUTY_NAME == "사업부장"
                        || list[i].APPROVE_DUTY_NAME == "실장") && (list[i].APPROVE_STAT_CODE == 100 || list[i].APPROVE_STAT_CODE == 101)){
                        const result = customKendo.fn_customAjax("/user/getSign", {empSeq: list[i].APPROVE_EMP_SEQ});
                        if(result.data.signImg != null){
                            const imgMap = result.data.signImg;
                            hwpDocCtrl.moveToField("appr2", true, true, false);
                            hwpDocCtrl.global.HwpCtrl.InsertPicture(
                                ip + imgMap.file_path + imgMap.file_uuid,
                                true, 3, false, false, 0, 0, function(ctrl){
                                    if(ctrl){
                                        console.log('성공');
                                    }else{
                                        console.log('실패');
                                    }
                                });
                        }else{
                            hwpDocCtrl.putFieldText('appr2', list[i].APPROVE_EMP_NAME);
                        }
                    }
                }
                
                if(teamCk == "N"){
                    hwpDocCtrl.putFieldText('appr0', "공란");
                }

                for(let i=0; i<list.length; i++){
                    /** 협조 */
                    if (list[i].APPROVE_TYPE == "1") {
                        if(list[i].APPROVE_STAT_CODE == 20 && docView.global.rs.approvePrevRoute.APPROVE_EMP_SEQ == list[i].APPROVE_EMP_SEQ){
                            const result = customKendo.fn_customAjax("/user/getSign", {empSeq: list[i].APPROVE_EMP_SEQ});
                            if(result.data.signImg != null){
                                const imgMap = result.data.signImg;

                                hwpDocCtrl.moveToField("cAppr0", true, true, false);
                                hwpDocCtrl.global.HwpCtrl.InsertPicture(
                                    ip + imgMap.file_path + imgMap.file_uuid,
                                    true, 3, false, false, 0, 0, function(ctrl){
                                        if(ctrl){
                                            console.log('성공');
                                        }else{
                                            console.log('실패');
                                        }
                                    });
                            }else{
                                hwpDocCtrl.putFieldText('cAppr0', list[i].APPROVE_EMP_NAME);
                            }
                        }
                    }
                }

            /** 팀장 전결 */
            }else if(empData.APPROVE_DUTY_NAME == "팀장" || empData.APPROVE_DUTY_NAME == "팀장 직무대리"){
                appArr = ["전결", "공란", "sigh1"];
                for(let i=0; i<list.length; i++){
                    if(list[i].APPROVE_STAT_CODE == 100 || list[i].APPROVE_STAT_CODE == 101){
                        const result = customKendo.fn_customAjax("/user/getSign", {empSeq: list[i].APPROVE_EMP_SEQ});
                        if(result.data.signImg != null){
                            const imgMap = result.data.signImg;

                            hwpDocCtrl.moveToField("appr2", true, true, false);
                            hwpDocCtrl.global.HwpCtrl.InsertPicture(
                                ip + imgMap.file_path + imgMap.file_uuid,
                                true, 3, false, false, 0, 0, function(ctrl){
                                    if(ctrl){
                                        console.log('성공');
                                    }else{
                                        console.log('실패');
                                    }
                                });
                        }else{
                            hwpDocCtrl.putFieldText('appr2', list[i].APPROVE_EMP_NAME);
                        }
                    }
                }

                for(let i=0; i<list.length; i++){
                    /** 협조 */
                    if (list[i].APPROVE_TYPE == "1") {
                        if(list[i].APPROVE_STAT_CODE == 20 && docView.global.rs.approvePrevRoute.APPROVE_EMP_SEQ == list[i].APPROVE_EMP_SEQ){
                            const result = customKendo.fn_customAjax("/user/getSign", {empSeq: list[i].APPROVE_EMP_SEQ});
                            if(result.data.signImg != null){
                                const imgMap = result.data.signImg;

                                hwpDocCtrl.moveToField("cAppr0", true, true, false);
                                hwpDocCtrl.global.HwpCtrl.InsertPicture(
                                    ip + imgMap.file_path + imgMap.file_uuid,
                                    true, 3, false, false, 0, 0, function(ctrl){
                                        if(ctrl){
                                            console.log('성공');
                                        }else{
                                            console.log('실패');
                                        }
                                    });
                            }else{
                                hwpDocCtrl.putFieldText('cAppr0', list[i].APPROVE_EMP_NAME);
                            }
                        }
                    }
                }
            }else{
                appArr = ["sigh1", "sigh2", "sigh3"];
                let teamCk = "N";
                let deptCk = "N";
                for (let i = 0; i < list.length; i++) {
                    if ((list[i].APPROVE_DUTY_NAME == "팀장" || list[i].APPROVE_DUTY_NAME == "팀장 직무대리") && list[i].APPROVE_TYPE != "1" && docView.global.rs.approvePrevRoute.APPROVE_EMP_SEQ == list[i].APPROVE_EMP_SEQ) {
                        teamCk = "Y";
                        if(list[i].APPROVE_STAT_CODE == 20){
                            const result = customKendo.fn_customAjax("/user/getSign", {empSeq: list[i].APPROVE_EMP_SEQ});
                            if(result.data.signImg != null){
                                const imgMap = result.data.signImg;

                                hwpDocCtrl.moveToField("appr0", true, true, false);
                                hwpDocCtrl.global.HwpCtrl.InsertPicture(
                                    ip + imgMap.file_path + imgMap.file_uuid,
                                    true, 3, false, false, 0, 0, function(ctrl){
                                        if(ctrl){
                                            console.log('성공');
                                        }else{
                                            console.log('실패');
                                        }
                                    });
                            }else{
                                hwpDocCtrl.putFieldText('appr0', list[i].APPROVE_EMP_NAME);
                            }
                        }
                    }
                }

                for(let i=0; i<list.length; i++){
                    if((list[i].APPROVE_DUTY_NAME == "본부장"
                        || list[i].APPROVE_DUTY_NAME == "센터장"
                        || list[i].APPROVE_DUTY_NAME == "사업부장"
                        || list[i].APPROVE_DUTY_NAME == "실장") && list[i].APPROVE_TYPE != "1" && docView.global.rs.approvePrevRoute.APPROVE_EMP_SEQ == list[i].APPROVE_EMP_SEQ){
                        deptCk = "Y";
                        if(list[i].APPROVE_STAT_CODE == 20){
                            const result = customKendo.fn_customAjax("/user/getSign", {empSeq: list[i].APPROVE_EMP_SEQ});
                            if(result.data.signImg != null){
                                const imgMap = result.data.signImg;

                                hwpDocCtrl.moveToField("appr1", true, true, false);
                                hwpDocCtrl.global.HwpCtrl.InsertPicture(
                                    ip + imgMap.file_path + imgMap.file_uuid,
                                    true, 3, false, false, 0, 0, function(ctrl){
                                        if(ctrl){
                                            console.log('성공');
                                        }else{
                                            console.log('실패');
                                        }
                                    });
                            }else{
                                hwpDocCtrl.putFieldText('appr1', list[i].APPROVE_EMP_NAME);
                            }
                        }
                    }
                }

                if(teamCk == "N"){
                    hwpDocCtrl.putFieldText('appr0', "공란");
                }
                if(deptCk == "N"){
                    hwpDocCtrl.putFieldText('appr1', "공란");
                }

                for(let i=0; i<list.length; i++){
                    if(list[i].APPROVE_STAT_CODE == 100 || list[i].APPROVE_STAT_CODE == 101){
                        const result = customKendo.fn_customAjax("/user/getSign", {empSeq: list[i].APPROVE_EMP_SEQ});
                        if(result.data.signImg != null){
                            const imgMap = result.data.signImg;

                            hwpDocCtrl.moveToField("appr2", true, true, false);
                            hwpDocCtrl.global.HwpCtrl.InsertPicture(
                                ip + imgMap.file_path + imgMap.file_uuid,
                                true, 3, false, false, 0, 0, function(ctrl){
                                    if(ctrl){
                                        console.log('성공');
                                    }else{
                                        console.log('실패');
                                    }
                                });
                        }else{
                            hwpDocCtrl.putFieldText('appr2', list[i].APPROVE_EMP_NAME);
                        }
                    }
                }

                for(let i=0; i<list.length; i++){
                    /** 협조 */
                    if (list[i].APPROVE_TYPE == "1") {
                        if(list[i].APPROVE_STAT_CODE == 20 && docView.global.rs.approvePrevRoute.APPROVE_EMP_SEQ == list[i].APPROVE_EMP_SEQ){
                            const result = customKendo.fn_customAjax("/user/getSign", {empSeq: list[i].APPROVE_EMP_SEQ});
                            if(result.data.signImg != null){
                                const imgMap = result.data.signImg;

                                hwpDocCtrl.moveToField("cAppr0", true, true, false);
                                hwpDocCtrl.global.HwpCtrl.InsertPicture(
                                    ip + imgMap.file_path + imgMap.file_uuid,
                                    true, 3, false, false, 0, 0, function(ctrl){
                                        if(ctrl){
                                            console.log('성공');
                                        }else{
                                            console.log('실패');
                                        }
                                    });
                            }else{
                                hwpDocCtrl.putFieldText('cAppr0', list[i].APPROVE_EMP_NAME);
                            }
                        }
                    }
                }
            }
        }
        console.log("----- 양식 사인 세팅 끝 -----");
    }
}