/**
 * 2023.02.21 by. deer
 * 한글 컨트롤
 *
 * function / global variable / local variable setting
 */
var hwpDocCtrl = {
    global : {
        HwpCtrl : "",
        templateFile : "",
        templateLogoFile : "",
        templateSymbolFile : "",
        templateFormOpt : "",
        params : new Array(),
        loginEmpInfo : new Array(),
        mod : "",
        searchAjaxData : "",

        hwpFileTextData : "",
        htmlFileTextData : ""
    },

    dataSet : function() {
        const data = hwpDocCtrl.global.params;

        if(data.menuCd == "subHoliday") {

            const subHolidayId = data.approKey.split("_")[1];
            if(subHolidayId == null || subHolidayId == undefined || subHolidayId == "") { alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다."); return; }
            holidayInit.subHolidayInit(subHolidayId);

        }else if(data.menuCd == "holidayWork") {

            const subHolidayId = data.approKey.split("_")[1];
            if(subHolidayId == null || subHolidayId == undefined || subHolidayId == "") { alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다."); return; }
            holidayInit.holidayWorkInit(subHolidayId);

        }else if(data.menuCd == "campus") {

            const eduInfoId = data.approKey.split("_")[1];
            if(eduInfoId == null || eduInfoId == undefined || eduInfoId == "") { alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다."); return; }
            campusInit.campusInit(eduInfoId);

        }else if(data.menuCd == "certifi") {
            const userProofSn = certifiPrintPop.global.params.userProofSn;

            if(userProofSn == null || userProofSn == undefined || userProofSn == "") {
                alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다.");
            }

            $.ajax({
                url : "/inside/getCertificateOne",
                data : {
                    userProofSn : userProofSn
                },
                type : "post",
                dataType : "json",
                async: false,
                success : function(result){
                    const ResultData = result.data;

                    let today = new Date();
                    let year = today.getFullYear(); // 년도
                    let month = today.getMonth() + 1;  // 월
                    let date = today.getDate();  // 날짜

                    //문서제목
                    const proofName = ResultData.PROOF_TYPE == 1 ? "재직증명서" : "경력증명서";
                    hwpDocCtrl.global.HwpCtrl.MoveToField('proofName', true, true, false);
                    hwpDocCtrl.putFieldText('proofName', proofName);

                    //한글파일 제목
                    certifiPrintPop.global.params.fileTitle = ResultData.EMP_NAME_KR + " " + proofName

                    //호수
                    const number = "제"+ResultData.DOCU_YEAR_DE+"-"+ResultData.NUMBER+"호"
                    hwpDocCtrl.global.HwpCtrl.MoveToField('number', true, true, false);
                    hwpDocCtrl.putFieldText('number', number);

                    //성명
                    hwpDocCtrl.global.HwpCtrl.MoveToField('empName', true, true, false);
                    hwpDocCtrl.putFieldText('empName', ResultData.EMP_NAME_KR);

                    //생년월일
                    let birthDay = ResultData.BDAY.split("-");
                    let birthDayText = "";
                    if(birthDay.length < 2){
                        birthDayText = "- 년 "+"- 월 "+" - 일";
                    }else{
                        birthDayText = birthDay[0]+"년 "+birthDay[1]+"월 "+birthDay[2]+"일";
                    }
                    
                    hwpDocCtrl.global.HwpCtrl.MoveToField('birth', true, true, false);
                    hwpDocCtrl.putFieldText('birth', birthDayText);

                    //주소
                    hwpDocCtrl.global.HwpCtrl.MoveToField('address', true, true, false);
                    hwpDocCtrl.putFieldText('address', ResultData.ADDR);

                    //소속
                    hwpDocCtrl.global.HwpCtrl.MoveToField('deptName', true, true, false);
                    hwpDocCtrl.putFieldText('deptName', ResultData.DEPT_NAME);

                    //직위
                    hwpDocCtrl.global.HwpCtrl.MoveToField('positionName', true, true, false);
                    hwpDocCtrl.putFieldText('positionName', ResultData.POSITION_NAME);

                    const userInfo = getUser(ResultData.EMP_SEQ);
                    console.log(userInfo);
                    if(userInfo.DIVISION == "1" && userInfo.DIVISION_SUB == "6"){
                        hwpDocCtrl.putFieldText('positionName', "위촉직원");
                    }else if(userInfo.DIVISION == "2"){
                        hwpDocCtrl.putFieldText('positionName', "연수생");
                    }

                    // 직무
                    hwpDocCtrl.putFieldText('jobTitle', ResultData.JOB_DETAIL);

                    //근무기간
                    let joinDay = ResultData.JOIN_DAY.split("-");
                    let joinDayText = joinDay[0] + "년" + joinDay[1] + "월" + joinDay[2] + "일";

                    let endDate = ResultData.REG_DE;
                    if (ResultData.WORK_STATUS_CODE === 'N') {
                        endDate = ResultData.RESIGN_DAY;
                    }

                    let regDe = endDate.split("-");
                    let regDeText = regDe[0] + "년" + regDe[1] + "월" + regDe[2] + "일";

                    let betDay = betweenDay(ResultData.JOIN_DAY.replace("-", ""), endDate.replace("-", ""));
                    let betYear = Math.floor(betDay / 12);
                    let betMonth = betDay % 12;
                    let tenureText = joinDayText + "부터" + regDeText + "까지(" + betYear + "년" + betMonth + "개월)";

                    hwpDocCtrl.global.HwpCtrl.MoveToField('tenure', true, true, false);
                    hwpDocCtrl.putFieldText('tenure', tenureText);

                    //용도
                    hwpDocCtrl.global.HwpCtrl.MoveToField('usageName', true, true, false);
                    hwpDocCtrl.putFieldText('usageName', ResultData.USAGE_NAME);

                    //신청문구
                    const proofContent = ResultData.PROOF_TYPE == 1 ? "상기자는 위와 같이 재직중임을 증명합니다." : "위와 같이 근무경력을 증명합니다.";
                    hwpDocCtrl.global.HwpCtrl.MoveToField('proofContent', true, true, false);
                    hwpDocCtrl.putFieldText('proofContent', proofContent);

                    //요청일
                    // let toDate = year+"년 "+month+"월 "+date+"일";
                    let regDeFinal = ResultData.REG_DE.split("-"); // 재직자/퇴사자 구분없이 제출예정일
                    let toDate = regDeFinal[0] + "년 " + regDeFinal[1] + "월 " + regDeFinal[2] + "일";
                    hwpDocCtrl.global.HwpCtrl.MoveToField('toDate', true, true, false);
                    hwpDocCtrl.putFieldText('toDate', toDate);

                    let regSign = ResultData.APPROVAL_EMP_NAME+" (인)";
                    hwpDocCtrl.global.HwpCtrl.MoveToField('regSign', true, true, false);
                    hwpDocCtrl.putFieldText('regSign', regSign);

                    var hostFlag = location.host;
                    var hostProtocol = location.protocol;

                    var host = "";
                    if(hostFlag == "218.158.231.186" || hostFlag == "localhost"){
                        host = hostProtocol + "//218.158.231.186/";
                    }else{
                        host = hostProtocol + "//new.camtic.or.kr/";
                    }

                    if(ResultData.FILE_PATH != null){
                        if(hwpDocCtrl.global.HwpCtrl.FieldExist('sign')){
                            hwpDocCtrl.global.HwpCtrl.PutFieldText('sign', " ");
                            hwpDocCtrl.global.HwpCtrl.MoveToField('sign', true, true, false);
                            hwpDocCtrl.global.HwpCtrl.InsertBackgroundPicture(
                                "SelectedCell",
                                host + ResultData.FILE_PATH,
                                1,
                                5,
                                0,
                                0,
                                0,
                                0
                            );
                        }
                    }
                }
            });
        }else if(data.menuCd == "snack") {

            const snackInfoSn = snackPrint.global.params.snackInfoSn;

            if(snackInfoSn == null || snackInfoSn == undefined || snackInfoSn == "") {
                alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다.");
            }

            $.ajax({
                    url : "/inside/getSnackOne",
                    data : {
                        snackInfoSn : snackInfoSn
                    },
                    type : "post",
                    dataType : "json",
                    async: false,
                    success : function(result){
                        console.log(result);
                        const ResultData = result.data;

                        var fileNoArr = [];
                        var result = "";

                        if(ResultData.FR_FILE_NO != '' && ResultData.FR_FILE_NO != null) {
                            fileNoArr = ResultData.FR_FILE_NO.split(',');

                            for(var i=0; i<fileNoArr.length; i++) {
                                result += "," + fileNoArr[i];
                            }
                        } else {
                            result += ",0";
                        }

                        var snackSubmitData = {
                            snackInfoSn: data.snackInfoSn,
                            fileNo: result.substring(1)
                        };

                        var returnData = customKendo.fn_customAjax("/snack/getFileList", snackSubmitData);
                        var returnFileArr = returnData.fileList;

                        for(var i=0; i < returnFileArr.length; i++){
                            let ip = "http://218.158.231.184";
                            if($(location).attr("host").split(":")[0].indexOf("218.158.231.184") > -1 || $(location).attr("host").split(":")[0].indexOf("new.camtic.or.kr") > -1){
                                ip = "http://218.158.231.184";
                            } else {
                                ip = "http://218.158.231.186";
                            }

                            /** 사인 조회 후 있으면 이미지, 없으면 정자 기입 */
                            if(returnFileArr != null) {
                                if (returnFileArr[i].file_ext == "JPG") {
                                    console.log(returnFileArr[i]);
                                    hwpDocCtrl.global.HwpCtrl.MoveToField("snackImg", true, true, false);

                                    hwpDocCtrl.global.HwpCtrl.InsertPicture(
                                        ip + returnFileArr[i].file_path + returnFileArr[i].file_uuid,
                                        true, 3, false, false, 0, 0, function (ctrl) {
                                            if (ctrl) {
                                                console.log('성공');
                                            } else {
                                                console.log('실패');
                                            }
                                        }
                                    );
                                }


                            }
                        }

                        let today = new Date();
                        let year = today.getFullYear(); // 년도
                        let month = today.getMonth() + 1;  // 월
                        let date = today.getDate();  // 날짜

                        let useDate = ResultData.USE_DT+" "+(ResultData.USE_TIME || "");
                        console.log(ResultData.USE_DT+" "+(ResultData.USE_TIME || ""));
                        hwpDocCtrl.global.HwpCtrl.MoveToField('useDate', true, true, false);
                        hwpDocCtrl.putFieldText('useDate', useDate);

                        let typeText = "";
                        if(Number(ResultData.PAY_TYPE) == 2) {
                            typeText = ResultData.PAY_TYPE_TEXT+ "( "+ResultData.CARD_TEXT+" )";
                        }else {
                            typeText = ResultData.PAY_TYPE_TEXT;
                        }
                        hwpDocCtrl.global.HwpCtrl.MoveToField('useType', true, true, false);
                        hwpDocCtrl.putFieldText('useType', typeText);

                        hwpDocCtrl.global.HwpCtrl.MoveToField('useName', true, true, false);
                        hwpDocCtrl.putFieldText('useName', ResultData.DEPT_NAME+" "+ResultData.DEPT_TEAM_NAME+" "+ResultData.EMP_NAME_KR);

                        let useMoney = fn_numberWithCommas(ResultData.AMOUNT_SN)+" 원";
                        hwpDocCtrl.global.HwpCtrl.MoveToField('useMoney', true, true, false);
                        hwpDocCtrl.putFieldText('useMoney', useMoney);

                        let userText = ResultData.USER_TEXT;
                        let userTextArr = userText.split(',');
                        let useTarget = "";
                        if(userTextArr.length > 1) {
                            useTarget += userTextArr[0]+" 외 "+(userTextArr.length-1)+"명";
                        }else {
                            useTarget += userTextArr[0];
                        }
                        useTarget += "의 "+ResultData.SNACK_TYPE_TEXT+"이용";

                        hwpDocCtrl.global.HwpCtrl.MoveToField('useTarget', true, true, false);
                        hwpDocCtrl.putFieldText('useTarget', useTarget);
                    }
            });
        }else if(data.menuCd == "bustrip") {

            const hrBizReqId = data.approKey.split("_")[1];
            if (hrBizReqId == null || hrBizReqId == undefined || hrBizReqId == "") { alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다."); return; }
            busInit.bustripInit(hrBizReqId);

        }else if(data.menuCd == "bustripRes") {

            const hrBizReqResultId = data.approKey.split("_")[1];
            if(hrBizReqResultId == null || hrBizReqResultId == undefined || hrBizReqResultId == "") { alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다."); }
            busInit.bustripResInit(hrBizReqResultId, "draft");

        }else if(data.menuCd == "workPlan") {
            const workPlanApprovalId = data.approKey.split("_")[1];
            if(workPlanApprovalId == null || workPlanApprovalId == undefined || workPlanApprovalId == "") { alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다."); }
            var ds = customKendo.fn_customAjax("/workPlan/getWorkPlanData.do", { workPlanApprovalId : workPlanApprovalId});
            if(ds.flag){
                ds.data;
                hwpDocCtrl.global.HwpCtrl.MoveToField('applyEmpInfo', true, true, false);
                hwpDocCtrl.putFieldText('applyEmpInfo', ds.data.DEPT_NAME2 + " " + ds.data.EMP_NAME_KR);

                hwpDocCtrl.global.HwpCtrl.MoveToField('workReason', true, true, false);
                hwpDocCtrl.putFieldText('workReason', ds.data.WORK_REASON);

                if(ds.data.workTimeList != null){
                    for(var i = 0 ; i < ds.data.workTimeList.length ; i++){
                        if(ds.data.WORK_TIME_CODE_ID == ds.data.workTimeList[i].WORK_TIME_CODE_ID){
                            hwpDocCtrl.global.HwpCtrl.MoveToField('workTimeType' + i, true, true, false);
                            hwpDocCtrl.putFieldText('workTimeType' + i, "✓ " + ds.data.workTimeList[i].label);
                        }else{
                            hwpDocCtrl.global.HwpCtrl.MoveToField('workTimeType' + i, true, true, false);
                            hwpDocCtrl.putFieldText('workTimeType' + i, "▢ " + ds.data.workTimeList[i].label);
                        }
                    }
                }else{
                    hwpDocCtrl.global.HwpCtrl.MoveToField('workTimeType0', true, true, false);
                    hwpDocCtrl.putFieldText('workTimeType0', "▢ 시차출퇴근A (08:00~17:00)");
                    hwpDocCtrl.global.HwpCtrl.MoveToField('workTimeType1', true, true, false);
                    hwpDocCtrl.putFieldText('workTimeType1', "▢ 시차출퇴근B (10:00~19:00)");
                    hwpDocCtrl.global.HwpCtrl.MoveToField('workTimeType2', true, true, false);
                    hwpDocCtrl.putFieldText('workTimeType2', "▢ 시차출퇴근C (14:00~22:30)");
                }


                hwpDocCtrl.global.HwpCtrl.MoveToField('workDate', true, true, false);
                hwpDocCtrl.putFieldText('workDate', ds.data.APPLY_WORK_DATE);

                hwpDocCtrl.global.HwpCtrl.MoveToField('applyDate', true, true, false);
                hwpDocCtrl.putFieldText('applyDate', ds.data.APPLY_DATE_KR);

                hwpDocCtrl.global.HwpCtrl.MoveToField('applyEmpName', true, true, false);
                hwpDocCtrl.putFieldText('applyEmpName', ds.data.LOGIN_EMP_NAME_KR);
            }
        }else if(data.menuCd == "invention") {
            const inventionInfoSn = data.approKey.split("_")[1];

            if(inventionInfoSn == null || inventionInfoSn == undefined || inventionInfoSn == "") {
                alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다.");
            }

            $.ajax({
                url: "/inside/getInventionInfo",
                data: {
                    inventionInfoSn: inventionInfoSn
                },
                type: "post",
                dataType: "json",
                async: false,
                success: function (result) {
                    const invenInfo = result.rs.info;
                    const shareList = result.rs.shareList;

                    let today = new Date();
                    let year = today.getFullYear(); // 년도
                    let month = today.getMonth() + 1;  // 월
                    let date = today.getDate();  // 날짜

                    hwpDocCtrl.global.HwpCtrl.MoveToField('iprClass', true, true, false);
                    hwpDocCtrl.putFieldText('iprClass', "✓ "+invenInfo.IPR_NAME);

                    hwpDocCtrl.global.HwpCtrl.MoveToField('title', true, true, false);
                    hwpDocCtrl.putFieldText('title', invenInfo.TITLE);

                    hwpDocCtrl.global.HwpCtrl.MoveToField('detail', true, true, false);
                    hwpDocCtrl.putFieldText('detail', invenInfo.DETAIL_CN);

                    let toDate = year+"년 "+month+"월 "+date+"일";
                    hwpDocCtrl.global.HwpCtrl.MoveToField('toDate', true, true, false);
                    hwpDocCtrl.putFieldText('toDate', toDate);

                    hwpDocCtrl.global.HwpCtrl.MoveToField('regEmpName', true, true, false);
                    hwpDocCtrl.putFieldText('regEmpName', invenInfo.REG_EMP_NAME);

                    let field = "";
                    for(let i=1; i<shareList.length+1; i++){
                        field = "empName"+i;
                        hwpDocCtrl.global.HwpCtrl.MoveToField(field, true, true, false);
                        hwpDocCtrl.putFieldText(field, shareList[i-1].EMP_NAME);

                        field = "deptName"+i;
                        hwpDocCtrl.global.HwpCtrl.MoveToField(field, true, true, false);
                        hwpDocCtrl.putFieldText(field, shareList[i-1].DEPT_NAME);

                        field = "share"+i;
                        hwpDocCtrl.global.HwpCtrl.MoveToField(field, true, true, false);
                        hwpDocCtrl.putFieldText(field, String(shareList[i-1].SHARE));
                    }

                    hwpDocCtrl.global.HwpCtrl.MoveToField('manager', true, true, false);
                    hwpDocCtrl.putFieldText('manager', invenInfo.MANAGER_NAME);
                }
            });
        }else if(data.menuCd == "rprRes") {
            const inventionInfoSn = data.approKey.split("_")[1];

            if(inventionInfoSn == null || inventionInfoSn == undefined || inventionInfoSn == "") {
                alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다.");
            }

            $.ajax({
                url: "/inside/getInventionInfo",
                data: {
                    inventionInfoSn: inventionInfoSn
                },
                type: "post",
                dataType: "json",
                async: false,
                success: function (result) {
                    console.log(result);
                    const invenInfo = result.rs.info;
                    const shareList = result.rs.shareList;

                    let today = new Date();
                    let year = today.getFullYear(); // 년도
                    let month = today.getMonth() + 1;  // 월
                    let date = today.getDate();  // 날짜

                    hwpDocCtrl.global.HwpCtrl.MoveToField('iprClass', true, true, false);
                    hwpDocCtrl.putFieldText('iprClass', "✓ "+invenInfo.IPR_NAME);

                    hwpDocCtrl.global.HwpCtrl.MoveToField('title', true, true, false);
                    hwpDocCtrl.putFieldText('title', invenInfo.TITLE);

                    hwpDocCtrl.global.HwpCtrl.MoveToField('detail', true, true, false);
                    hwpDocCtrl.putFieldText('detail', invenInfo.DETAIL_CN);

                    let toDate = year+"년 "+month+"월 "+date+"일";
                    hwpDocCtrl.global.HwpCtrl.MoveToField('toDate', true, true, false);
                    hwpDocCtrl.putFieldText('toDate', toDate);

                    hwpDocCtrl.global.HwpCtrl.MoveToField('regEmpName', true, true, false);
                    hwpDocCtrl.putFieldText('regEmpName', invenInfo.REG_EMP_NAME);

                    let field = "";
                    for(let i=1; i<shareList.length+1; i++){
                        field = "empName"+i;
                        hwpDocCtrl.global.HwpCtrl.MoveToField(field, true, true, false);
                        hwpDocCtrl.putFieldText(field, shareList[i-1].EMP_NAME);

                        field = "deptName"+i;
                        hwpDocCtrl.global.HwpCtrl.MoveToField(field, true, true, false);
                        hwpDocCtrl.putFieldText(field, shareList[i-1].DEPT_NAME);

                        field = "share"+i;
                        hwpDocCtrl.global.HwpCtrl.MoveToField(field, true, true, false);
                        hwpDocCtrl.putFieldText(field, shareList[i-1].SHARE);
                    }

                    hwpDocCtrl.global.HwpCtrl.MoveToField('regNum', true, true, false);
                    hwpDocCtrl.putFieldText('regNum', invenInfo.REG_NUM);

                    hwpDocCtrl.global.HwpCtrl.MoveToField('regNum', true, true, false);
                    hwpDocCtrl.putFieldText('regDate', invenInfo.REG_DATE);

                    hwpDocCtrl.global.HwpCtrl.MoveToField('manager', true, true, false);
                    hwpDocCtrl.putFieldText('manager', invenInfo.MANAGER_NAME);
                }
            });
        }else if(data.menuCd == "equipment"){
        }else if(data.menuCd == "delv") {
            const pjtSn = data.approKey.split("_")[1];
            if (pjtSn == null || pjtSn == undefined || pjtSn == "") {alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다.");}
            engnInit.delvInit(pjtSn);

        }else if(data.menuCd == "dev") {
            const devSn = data.approKey.split("_")[1];
            if (devSn == null || devSn == undefined || devSn == "") {alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다.");}
            engnInit.devInit(devSn);

        }else if(data.menuCd == "pjtRes") {
            const pjtSn = data.approKey.split("_")[1];
            if (pjtSn == null || pjtSn == undefined || pjtSn == "") { alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다."); return; }
            engnInit.resInit(pjtSn);

        }else if(data.menuCd == "pjtCost") {
            const pjtSn = data.approKey.split("_")[1];
            if (pjtSn == null || pjtSn == undefined || pjtSn == "") { alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다."); return; }
            hwpInit.pjtCostInit(pjtSn);
        }else if(data.menuCd == "purc") {

            const purcSn = data.approKey.split("_")[1];
            if (purcSn == null || purcSn == undefined || purcSn == "") { alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다."); return; }
            purcInit.purcInit(purcSn);

        }else if(data.menuCd == "claim") {

            const claimSn = data.approKey.split("_")[1];
            if (claimSn == null || claimSn == undefined || claimSn == "") { alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다."); return; }
            purcInit.claimInit(claimSn);

        } else if(data.menuCd == "payApp") {
            const payAppSn = data.approKey.split("_")[1];
            if (payAppSn == null || payAppSn == undefined || payAppSn == "") { alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다."); return; }
            payInit.payAppInit(payAppSn, "draft");
        } else if(data.menuCd == "exnp") {
            const exnpSn = data.approKey.split("_")[1];
            if (exnpSn == null || exnpSn == undefined || exnpSn == "") { alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다."); return; }
            hwpInit.exnpInit(exnpSn);
        } else if(data.menuCd == "payIncp") {
            const payIncpSn = data.approKey.split("_")[1];
            if (payIncpSn == null || payIncpSn == undefined || payIncpSn == "") { alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다."); return; }
            hwpInit.payIncpInit(payIncpSn);
        } else if(data.menuCd == "rndDelv") {
            const pjtSn = data.approKey.split("_")[1];
            if (pjtSn == null || pjtSn == undefined || pjtSn == "") { alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다."); return; }
            rndInit.delvInit(pjtSn);
        } else if(data.menuCd == "rndDev") {
            const devSn = data.approKey.split("_")[1];
            if (devSn == null || devSn == undefined || devSn == "") { alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다."); return; }
            rndInit.devInit(devSn);
        } else if(data.menuCd == "unRndDelv") {
            const pjtSn = data.approKey.split("_")[1];
            if (pjtSn == null || pjtSn == undefined || pjtSn == "") { alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다."); return; }
            unRndInit.delvInit(pjtSn);
        } else if(data.menuCd == "unRndDev") {
            const devSn = data.approKey.split("_")[1];
            if (devSn == null || devSn == undefined || devSn == "") { alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다."); return; }
            unRndInit.devInit(devSn);
        } else if(data.menuCd == "pjtRate") {
            const partRateVerSn = data.approKey.split("_")[1];
            if (partRateVerSn == null || partRateVerSn == undefined || partRateVerSn == "") { alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다."); return; }
            hwpInit.pjtRateInit(partRateVerSn);
        } else if(data.menuCd == "rndRes") {
            const pjtSn = data.approKey.split("_")[1];
            if (pjtSn == null || pjtSn == undefined || pjtSn == "") { alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다."); return; }
            rndInit.resInit(pjtSn);
        } else if(data.menuCd == "unRndRes") {
            const pjtSn = data.approKey.split("_")[1];
            if (pjtSn == null || pjtSn == undefined || pjtSn == "") { alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다."); return; }
            unRndInit.resInit(pjtSn);
        } else if(data.menuCd == "car") {
            const carReqSn = data.approKey.split("_")[1];
            if (carReqSn == null || carReqSn == undefined || carReqSn == "") { alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다."); return; }
            hwpInit.carInit(carReqSn);
        } else if(data.menuCd == "pjtChange") {
            const pjtSn = data.approKey.split("_")[1];
            if (pjtSn == null || pjtSn == undefined || pjtSn == "") { alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다."); return; }
            rndInit.changeInit(pjtSn);
        } else if(data.menuCd == "study") {
            const studyInfoSn = data.approKey.split("_")[1];
            if (studyInfoSn == null || studyInfoSn == undefined || studyInfoSn == "") { alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다."); return; }
            campusInit.studyInit(studyInfoSn, "study");
        } else if(data.menuCd == "propag") {
            const studyInfoSn = data.approKey.split("_")[1];
            if (studyInfoSn == null || studyInfoSn == undefined || studyInfoSn == "") { alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다."); return; }
            campusInit.studyInit(studyInfoSn, "propag");
        } else if(data.menuCd == "ojt") {
            const studyInfoSn = data.approKey.split("_")[1];
            if (studyInfoSn == null || studyInfoSn == undefined || studyInfoSn == "") { alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다."); return; }
            campusInit.studyInit(studyInfoSn, "ojt");
        }else if(data.menuCd == "studyRes") {
            const studyResultSn = data.approKey.split("_")[1];
            if (studyResultSn == null || studyResultSn == undefined || studyResultSn == "") { alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다."); return; }
            campusInit.studyResInit(studyResultSn);
        }else if(data.menuCd == "propagRes") {
            const studyResultSn = data.approKey.split("_")[1];
            if (studyResultSn == null || studyResultSn == undefined || studyResultSn == "") { alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다."); return; }
            campusInit.propagResInit(studyResultSn);
        }else if(data.menuCd == "ojtRes") {
            const studyResultSn = data.approKey.split("_")[1];
            if (studyResultSn == null || studyResultSn == undefined || studyResultSn == "") { alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다."); return; }
            campusInit.ojtResInit(studyResultSn, "ojtRes");
        }else if(data.menuCd == "meeting") {
            const metSn = data.approKey.split("_")[1];
            if (metSn == null || metSn == undefined || metSn == "") { alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다."); return; }
            meetingInit.meetingInit(metSn);
        }else if(data.menuCd == "item") {
            const ran = data.approKey.split("_")[1];
            if (ran == null || ran == undefined || ran == "") { alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다."); return; }
            itemInit.itemInit(ran);
        }else if(data.menuCd == "inCome") {
            const documentSn = data.approKey.split("_")[1];
            if (documentSn == null || documentSn == undefined || documentSn == "") { alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다."); return; }
            insideInit.inComeInit(documentSn);
        }else if(data.menuCd == "inCome") {
            const documentSn = data.approKey.split("_")[1];
            if (documentSn == null || documentSn == undefined || documentSn == "") { alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다."); return; }
            insideInit.inComeInit(documentSn);
        }else if(data.menuCd == "cardLoss") {
            const tpClSn = data.approKey.split("_")[1];
            if (tpClSn == null || tpClSn == undefined || tpClSn == "") { alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다."); return; }
            docViewInit.cardLossInit(tpClSn);
        }else if(data.menuCd == "accCert") {
            const accCertSn = data.approKey.split("_")[1];
            if (accCertSn == null || accCertSn == undefined || accCertSn == "") { alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다."); return; }
            docViewInit.accCertInit(accCertSn);
        }else if(data.menuCd == "signetTo") {
            const signSn = data.approKey.split("_")[1];
            if (signSn == null || signSn == undefined || signSn == "") { alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다."); return; }
            docViewInit.signetToInit(signSn);
        }else if(data.menuCd == "disAsset") {
            const disAssetSn = data.approKey.split("_")[1];
            if (disAssetSn == null || disAssetSn == undefined || disAssetSn == "") { alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다."); return; }
            docViewInit.disAssetInit(disAssetSn);
        }else if(data.menuCd == "resign") {
            const key = data.approKey.split("_")[1];
            if (key == null || key == undefined || key == "") { alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다."); return; }
            docViewInit.resignInit(key);
        }else if(data.menuCd == "details") {
            const key = data.approKey.split("_")[1];
            if (key == null || key == undefined || key == "") { alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다."); return; }
            docViewInit.detailsInit(key);
        }else if(data.menuCd == "cond") {
            const key = data.approKey.split("_")[1];
            if (key == null || key == undefined || key == "") { alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다."); return; }
            docViewInit.condInit(key);
        }else if(data.menuCd == "leave") {
            const key = data.approKey.split("_")[1];
            if (key == null || key == undefined || key == "") { alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다."); return; }
            docViewInit.leaveInit(key);
        }else if(data.menuCd == "reinstat") {
            const key = data.approKey.split("_")[1];
            if (key == null || key == undefined || key == "") { alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다."); return; }
            docViewInit.reinstatInit(key);
        }

        /** 문서제목 양식 최초 입력 */
        if($("#docTitle").val() != null && $("#docTitle").val() != ""){
            hwpDocCtrl.putFieldText('결재제목', $("#docTitle").val());
        }

        if($("#formId").val() == "1" || $("#formId").val() == "157" || $("#formId").val() == ""){
            const draftEmpSeq = $("#empSeq").val();
            const empInfo = customKendo.fn_customAjax("/user/getUserInfo", {empSeq: draftEmpSeq});
            hwpDocCtrl.putFieldText('EMP_EMAIL', empInfo.EMAIL_ADDR == undefined ? "" : empInfo.EMAIL_ADDR);
            hwpDocCtrl.putFieldText('EMP_TEL', empInfo.OFFICE_TEL_NUM == undefined ? "" : empInfo.OFFICE_TEL_NUM);
            hwpDocCtrl.putFieldText('EMP_FAX', empInfo.HOME_TEL_NUM == undefined ? "" : (empInfo.HOME_TEL_NUM));
            hwpDocCtrl.putFieldText('DOC_DT', "(" + fn_getNowDate(3) + ")");
        }else{
            /** 결재선 자동 입력 프로세스 */
            hwpDocCtrl.putFieldText("cAppr0", " ");
            hwpDocCtrl.putFieldText("cAppr1", " ");
            approvalLine.linkStart();
        }
    },

    modDataSet : function() {
        const data = hwpDocCtrl.global.params;
        const menuCd = data.menuCd;
        let pk = "";
        if(data.approKey != null){
            pk = data.approKey.split("_")[1];
        }
        const errorText = "";

        if(menuCd == "bustrip"){

            const hrBizReqId = pk;
            if (hrBizReqId == null || hrBizReqId == undefined || hrBizReqId == "") { alert(errorText); return; }
            busInit.bustripInit(hrBizReqId, "reDraft");

        }else if(menuCd == "bustripRes"){

            const hrBizReqResultId = pk;
            if(hrBizReqResultId == null || hrBizReqResultId == undefined || hrBizReqResultId == "") { alert(errorText); return; }
            busInit.bustripResInit(hrBizReqResultId, "reDraft");

        }else if(menuCd == "subHoliday"){

            const subHolidayId = pk;
            if (subHolidayId == null || subHolidayId == undefined || subHolidayId == "") { alert(errorText); return; }
            holidayInit.subHolidayInit(subHolidayId, "reDraft");

        }else if(menuCd == "holidayWork"){

            const subHolidayId = pk;
            if (subHolidayId == null || subHolidayId == undefined || subHolidayId == "") { alert(errorText); return; }
            holidayInit.holidayWorkInit(subHolidayId, "reDraft");

        }else if(menuCd == "purc") {

            const purcSn = pk;
            if (purcSn == null || purcSn == undefined || purcSn == "") { alert(errorText); return; }
            purcInit.purcInit(purcSn, "reDraft");

        } else if(menuCd == "exnp") {

            const exnpSn = pk;
            if (exnpSn == null || exnpSn == undefined || exnpSn == "") { alert(errorText); return; }
            hwpInit.exnpInit(exnpSn, "reDraft");

        } else if(menuCd == "claim") {

            const claimSn = pk;
            if (claimSn == null || claimSn == undefined || claimSn == "") { alert(errorText); return; }
            purcInit.claimInit(claimSn, "reDraft");

        }else if(data.menuCd == "campus"){

            const eduInfoId = pk;
            if(eduInfoId == null || eduInfoId == undefined || eduInfoId == "") { alert(errorText); return; }
            campusInit.campusInit(eduInfoId, "reDraft");

        }else if(data.menuCd == "study") {

            const studyInfoSn = pk;
            if (studyInfoSn == null || studyInfoSn == undefined || studyInfoSn == "") { alert(errorText); return; }
            campusInit.studyInit(studyInfoSn);

        }else if(data.menuCd == "propag") {

            const studyInfoSn = pk;
            if (studyInfoSn == null || studyInfoSn == undefined || studyInfoSn == "") { alert(errorText); return; }
            campusInit.studyInit(studyInfoSn);

        }else if(data.menuCd == "ojt") {

            const studyInfoSn = pk;
            if (studyInfoSn == null || studyInfoSn == undefined || studyInfoSn == "") { alert(errorText); return; }
            campusInit.studyInit(studyInfoSn);

        }else if(data.menuCd == "studyRes") {

            const studyResultSn = pk;
            if (studyResultSn == null || studyResultSn == undefined || studyResultSn == "") { alert(errorText); return; }
            campusInit.studyResInit(studyResultSn);

        }else if(data.menuCd == "propagRes") {

            const studyResultSn = pk;
            if (studyResultSn == null || studyResultSn == undefined || studyResultSn == "") { alert(errorText); return; }
            campusInit.propagResInit(studyResultSn);

        }else if(data.menuCd == "ojtRes") {

            const studyResultSn = pk;
            if (studyResultSn == null || studyResultSn == undefined || studyResultSn == "") { alert(errorText); return; }
            campusInit.ojtResInit(studyResultSn);

        }else if(data.menuCd == "meeting") {

            const metSn = pk;
            if (metSn == null || metSn == undefined || metSn == "") { alert(errorText); return; }
            meetingInit.meetingInit(metSn);

        } else if(data.menuCd == "delv") {

            const pjtSn = pk;
            if (pjtSn == null || pjtSn == undefined || pjtSn == "") {alert(errorText); return; }
            engnInit.delvInit(pjtSn);

        } else if(data.menuCd == "rndDelv") {

            const pjtSn = pk;
            if (pjtSn == null || pjtSn == undefined || pjtSn == "") { alert(errorText); return; }
            rndInit.delvInit(pjtSn);

        } else if(data.menuCd == "unRndDelv") {

            const pjtSn = pk;
            if (pjtSn == null || pjtSn == undefined || pjtSn == "") { alert(errorText); return; }
            unRndInit.delvInit(pjtSn);

        } else if(data.menuCd == "dev") {

            const devSn = pk;
            if (devSn == null || devSn == undefined || devSn == "") {alert(errorText); return; }
            engnInit.devInit(devSn);

        } else if(data.menuCd == "rndDev") {

            const devSn = pk;
            if (devSn == null || devSn == undefined || devSn == "") { alert(errorText); return; }
            rndInit.devInit(devSn);

        } else if(data.menuCd == "unRndDev") {

            const devSn = pk;
            if (devSn == null || devSn == undefined || devSn == "") { alert(errorText); return; }
            unRndInit.devInit(devSn);

        } else if(data.menuCd == "pjtRes") {

            const pjtSn = pk;
            if (pjtSn == null || pjtSn == undefined || pjtSn == "") { alert(errorText); return; }
            engnInit.resInit(pjtSn);

        } else if(data.menuCd == "rndRes") {

            const pjtSn = pk;
            if (pjtSn == null || pjtSn == undefined || pjtSn == "") { alert(errorText); return; }
            rndInit.resInit(pjtSn);

        } else if(data.menuCd == "unRndRes") {

            const pjtSn = pk;
            if (pjtSn == null || pjtSn == undefined || pjtSn == "") { alert(errorText); return; }
            unRndInit.resInit(pjtSn);

        } else if(data.menuCd == "car") {

            const carReqSn = pk;
            if (carReqSn == null || carReqSn == undefined || carReqSn == "") { alert(errorText); return; }
            hwpInit.carInit(carReqSn);

        } else if(data.menuCd == "payApp") {

            const payAppSn = pk;
            if (payAppSn == null || payAppSn == undefined || payAppSn == "") { alert(errorText); return; }
            payInit.payAppInit(payAppSn, "reDraft");

        } else if(data.menuCd == "payIncp") {
            const payIncpSn = pk;
            if (payIncpSn == null || payIncpSn == undefined || payIncpSn == "") { alert(errorText); return; }
            hwpInit.payIncpInit(payIncpSn, "reDraft");

        } else if(data.menuCd == "workPlan") {
            const workPlanApprovalId = data.approKey.split("_")[1];
            if(workPlanApprovalId == null || workPlanApprovalId == undefined || workPlanApprovalId == "") { alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다."); }
            var ds = customKendo.fn_customAjax("/workPlan/getWorkPlanData.do", { workPlanApprovalId : workPlanApprovalId});
            if(ds.flag){
                ds.data;
                hwpDocCtrl.global.HwpCtrl.MoveToField('applyEmpInfo', true, true, false);
                hwpDocCtrl.putFieldText('applyEmpInfo', ds.data.DEPT_NAME2 + " " + ds.data.EMP_NAME_KR);

                hwpDocCtrl.global.HwpCtrl.MoveToField('workReason', true, true, false);
                hwpDocCtrl.putFieldText('workReason', ds.data.WORK_REASON);

                if(ds.data.workTimeList != null){
                    for(var i = 0 ; i < ds.data.workTimeList.length ; i++){
                        if(ds.data.WORK_TIME_CODE_ID == ds.data.workTimeList[i].WORK_TIME_CODE_ID){
                            hwpDocCtrl.global.HwpCtrl.MoveToField('workTimeType' + i, true, true, false);
                            hwpDocCtrl.putFieldText('workTimeType' + i, "✓ " + ds.data.workTimeList[i].label);
                        }else{
                            hwpDocCtrl.global.HwpCtrl.MoveToField('workTimeType' + i, true, true, false);
                            hwpDocCtrl.putFieldText('workTimeType' + i, "▢ " + ds.data.workTimeList[i].label);
                        }
                    }
                }else{
                    hwpDocCtrl.global.HwpCtrl.MoveToField('workTimeType0', true, true, false);
                    hwpDocCtrl.putFieldText('workTimeType0', "▢ 시차출퇴근A (08:00~17:00)");
                    hwpDocCtrl.global.HwpCtrl.MoveToField('workTimeType1', true, true, false);
                    hwpDocCtrl.putFieldText('workTimeType1', "▢ 시차출퇴근B (10:00~19:00)");
                    hwpDocCtrl.global.HwpCtrl.MoveToField('workTimeType2', true, true, false);
                    hwpDocCtrl.putFieldText('workTimeType2', "▢ 시차출퇴근C (14:00~22:30)");
                }


                hwpDocCtrl.global.HwpCtrl.MoveToField('workDate', true, true, false);
                hwpDocCtrl.putFieldText('workDate', ds.data.APPLY_WORK_DATE);

                hwpDocCtrl.global.HwpCtrl.MoveToField('applyDate', true, true, false);
                hwpDocCtrl.putFieldText('applyDate', ds.data.APPLY_DATE_KR);

                hwpDocCtrl.global.HwpCtrl.MoveToField('applyEmpName', true, true, false);
                hwpDocCtrl.putFieldText('applyEmpName', ds.data.LOGIN_EMP_NAME_KR);
            }
        } else if(data.menuCd == "item") {

            const ran = pk;
            if (ran == null || ran == undefined || ran == "") { alert(errorText); return; }
            itemInit.itemInit(ran);

        }else if(data.menuCd == "cardLoss") {

            const tpClSn = pk;
            if (tpClSn == null || tpClSn == undefined || tpClSn == "") { alert(errorText); return; }
            docViewInit.cardLossInit(tpClSn);

        }else if(data.menuCd == "accCert") {

            const accCertSn = pk;
            if (accCertSn == null || accCertSn == undefined || accCertSn == "") { alert(errorText); return; }
            docViewInit.accCertInit(accCertSn);

        }else if(data.menuCd == "signetTo") {

            const signSn = pk;
            if (signSn == null || signSn == undefined || signSn == "") { alert(errorText); return; }
            docViewInit.signetToInit(signSn);

        }else if(data.menuCd == "disAsset") {

            const disAssetSn = pk;
            if (disAssetSn == null || disAssetSn == undefined || disAssetSn == "") { alert(errorText); return; }
            docViewInit.disAssetInit(disAssetSn);

        }else if(data.menuCd == "resign") {

            const key = pk;
            if (key == null || key == undefined || key == "") { alert(errorText); return; }
            docViewInit.resignInit(key);

        }else if(data.menuCd == "details") {

            const key = pk;
            if (key == null || key == undefined || key == "") { alert(errorText); return; }
            docViewInit.detailsInit(key);

        }else if(data.menuCd == "cond") {

            const key = pk;
            if (key == null || key == undefined || key == "") { alert(errorText); return; }
            docViewInit.condInit(key);

        }else if(data.menuCd == "leave") {

            const key = pk;
            if (key == null || key == undefined || key == "") { alert(errorText); return; }
            docViewInit.leaveInit(key);

        }else if(data.menuCd == "reinstat") {

            const key = pk;
            if (key == null || key == undefined || key == "") { alert(errorText); return; }
            docViewInit.reinstatInit(key);

        }

        /** 재상신이면 사인 초기화 */
        if($("#formId").val() == "1" || $("#formId").val() == "157"){

            hwpDocCtrl.putFieldText("docAppr1", " ");
            hwpDocCtrl.putFieldText("docAppr2", " ");
            hwpDocCtrl.putFieldText("docAppr3", " ");
            hwpDocCtrl.putFieldText("docDAppr", " ");
            hwpDocCtrl.putFieldText("docAppr1011", " ");
            hwpDocCtrl.putFieldText("docAppr1012", " ");

        }else{

            $("#mySignCk").val("Y");
            hwpDocCtrl.putFieldText("appr0", " ");
            hwpDocCtrl.putFieldText("appr1", " ");
            hwpDocCtrl.putFieldText("appr2", " ");
            hwpDocCtrl.putFieldText("cApprText0", " ");
            hwpDocCtrl.putFieldText("cApprText1", " ");
            hwpDocCtrl.putFieldText("cAppr0", " ");
            hwpDocCtrl.putFieldText("cAppr1", " ");
            if($("#formId").val() == "147"){
                hwpDocCtrl.putFieldText("paySign", " ");
            }
            approvalLine.linkStart();

        }
    },

    viewDataSet : function() {
        const formId = docView.global.rs.docInfo.FORM_ID;
        if(formId == "141" || formId == "149"){
            /** 수주 보고일경우 DOC_ID 역추적 해서 프로젝트코드 덮어 씌움 **/

            var rndResult = customKendo.fn_customAjax("/project/getProjectByDocId", {docId: docView.global.rs.docInfo.DOC_ID});
            if(rndResult.map != null){
                if(rndResult.map.PJT_CD != null){
                    setTimeout(function() {
                        hwpDocCtrl.putFieldText('PJT_CD', rndResult.map.PJT_CD.toString().substring(0, 9));
                    }, 1500);
                }
            }

        }

        if(formId == "1" || formId == "157"){
            if(docView.global.rs.docInfo.APPROVE_STAT_CODE == "30" || docView.global.rs.docInfo.APPROVE_STAT_CODE == "40"){
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
            }else{
                hwpApprovalLine.setHwpApprovalDocuSignPut(formId);
            }
        }
    },

    defaultScript : function (HwpCtrl, openFormat, templateFormFile, templateFormOpt, templateCustomField, params, loginEmpSeq, mod) {
        console.log(params);
        hwpDocCtrl.global.HwpCtrl = HwpCtrl;
        hwpDocCtrl.global.mod = mod;

        if(hwpDocCtrl.global.mod == "W"){
            hwpDocCtrl.global.templateFile = templateFormFile.find(element => element.FORM_FILE_TYPE == "form");
            hwpDocCtrl.global.templateLogoFile = templateFormFile.find(element => element.FORM_FILE_TYPE == "logo");
            hwpDocCtrl.global.templateSymbolFile = templateFormFile.find(element => element.FORM_FILE_TYPE == "symbol");
            hwpDocCtrl.global.templateFormOpt = templateFormOpt;
            hwpDocCtrl.global.templateCustomField = templateCustomField;
            hwpDocCtrl.global.params = params;
            hwpDocCtrl.global.loginEmpInfo.loginEmpSeq = loginEmpSeq;
        }else if (hwpDocCtrl.global.mod == "RW"){
            hwpDocCtrl.global.params = params;
            hwpDocCtrl.global.templateFile = templateFormFile;
        }else if (hwpDocCtrl.global.mod == "V"){
            hwpDocCtrl.global.templateFile = templateFormFile;
        }

        hwpDocCtrl.open(
            hwpDocCtrl.global.templateFile.FILE_PATH + hwpDocCtrl.global.templateFile.FILE_UUID,
            openFormat,
            "",
            {"userData" : "success"}
        )
    },

    open : function(url, format, type, name) {
            return hwpDocCtrl.global.HwpCtrl.Open(url, "", type,
                function (res) {
                    console.log(res);
                    async function asyncCall() {

                        if(res.result){
                            if(hwpDocCtrl.global.mod == "W"){
                                hwpDocCtrl.openCallBack();
                            }else if (hwpDocCtrl.global.mod == "RW"){
                                hwpDocCtrl.modOpenCallBack();
                            }else if (hwpDocCtrl.global.mod == "V"){
                                hwpDocCtrl.viewOpenCallBack();
                            }
                        }else{
                            alert("결재문서를 찾을 수 없습니다.");
                        }

                    }

                    asyncCall().then(() => {

                        var abc = hwpDocCtrl.getFieldText();

                        var i = 1;

                        async function getDocDrawCall(){
                            i = i+1;
                            abc = hwpDocCtrl.getFieldText();
                        }

                        getDocDrawCall().then(() => {
                            (async () => {
                                getDocDrawCall();
                                await sleep(i); // 2초대기

                                if(abc != null){
                                    $("#loadingDiv").hide();
                                    document.querySelector('body').style.overflow = 'auto'
                                }

                            })();
                        });
                    });


                }, name);
        function sleep(sec) {
            return new Promise(resolve => setTimeout(resolve, sec * 1000));
        }
    },

    /**
     * @param format (DATA TYPE = STIRNG)
     * HWP = BASE64 ENCODING 형식
     * HWPML2X = 원본 문서의 모든 정보 유지(HWP 형식과 호환)
     * HTML = HTML 태그로 이루어짐 (한글 고유 서식은 손실)
     * @param option
     * 1. saveblock = 선택된 블록만 불러옴
     * 2. "" = 문서 전체
     * @returns {string}
     */
    getHwpFileData : function(format, option, e){
        hwpDocCtrl.global.HwpCtrl.GetTextFile(format, option, function(data) {
            if(format == "HTML"){
                hwpDocCtrl.global.htmlFileTextData = data;
            }else{
                hwpDocCtrl.global.hwpFileTextData = data;
            }
        })
    },

    openCallBack : function(){
        hwpDocCtrl.global.HwpCtrl.EditMode = 2;
        hwpDocCtrl.global.HwpCtrl.SetToolBar(2, "TOOLBAR_MENU");
        hwpDocCtrl.global.HwpCtrl.SetToolBar(2, "TOOLBAR_STANDARD");
        hwpDocCtrl.global.HwpCtrl.ShowRibbon(true);
        hwpDocCtrl.global.HwpCtrl.ShowCaret(true);
        hwpDocCtrl.global.HwpCtrl.ShowStatusBar(true);
        hwpDocCtrl.global.HwpCtrl.SetFieldViewOption(2);

        async function asyncCall() {
            hwpDocCtrl.dataSet();
        }
        if(hwpDocCtrl.global.HwpCtrl.FieldExist("header_campaign")){
            hwpDocCtrl.global.HwpCtrl.MoveToField('header_campaign', true, true, false);
            hwpDocCtrl.putFieldText('header_campaign', hwpDocCtrl.global.templateFormOpt.HEADER_CAMPAIGN);
        }

        if(hwpDocCtrl.global.HwpCtrl.FieldExist("img_logo")){
            hwpDocCtrl.global.HwpCtrl.MoveToField('img_logo', true, true, false);
            hwpDocCtrl.global.HwpCtrl.InsertBackgroundPicture(
                "SelectedCell",
                hwpDocCtrl.global.templateLogoFile.FILE_PATH + hwpDocCtrl.global.templateLogoFile.FILE_UUID,
                1,
                5,
                0,
                0,
                0,
                0
            );
        }

        if(hwpDocCtrl.global.HwpCtrl.FieldExist("img_symbol")){
            hwpDocCtrl.global.HwpCtrl.MoveToField('img_symbol', true, true, false);
            hwpDocCtrl.global.HwpCtrl.InsertBackgroundPicture(
                "SelectedCell",
                hwpDocCtrl.global.templateSymbolFile.FILE_PATH + hwpDocCtrl.global.templateSymbolFile.FILE_UUID,
                1,
                5,
                0,
                0,
                0,
                0
            );
        }

        if(hwpDocCtrl.global.HwpCtrl.FieldExist("agency_name")){
            hwpDocCtrl.global.HwpCtrl.MoveToField('agency_name', true, true, false);
            hwpDocCtrl.putFieldText('agency_name', hwpDocCtrl.global.templateFormOpt.FORM_COMP_NAME);
        }

        if(hwpDocCtrl.global.HwpCtrl.FieldExist("doc_receive")){
            hwpDocCtrl.putFieldText('doc_receive', "내부결재");
        }

        if(hwpDocCtrl.global.HwpCtrl.FieldExist("footer_campaign")){
            hwpDocCtrl.global.HwpCtrl.MoveToField('footer_campaign', true, true, false);
            hwpDocCtrl.putFieldText('footer_campaign', hwpDocCtrl.global.templateFormOpt.FOOTER_CAMPAIGN);
        }

        hwpDocCtrl.global.searchAjaxData = {
            empSeq : hwpDocCtrl.global.loginEmpInfo.loginEmpSeq
        }

        var result = customKendo.fn_customAjax("/user/getUserInfo", hwpDocCtrl.global.searchAjaxData);
        if(result.flag){
            hwpDocCtrl.global.loginEmpInfo = result;
            if(hwpDocCtrl.global.HwpCtrl.FieldExist("dept_name")){
                hwpDocCtrl.global.HwpCtrl.MoveToField('dept_name', true, true, false);
                hwpDocCtrl.putFieldText('dept_name', hwpDocCtrl.global.loginEmpInfo.DEPT_NAME);
            }
        }


        asyncCall().then(() => {

            var abc = hwpDocCtrl.getFieldText();

            var i = 1;

            async function getDocDrawCall(){
                i = i +1;
                abc = hwpDocCtrl.getFieldText();
            }

            getDocDrawCall().then(() => {
                (async () => {
                    getDocDrawCall();
                    await sleep(i); // 2초대기

                    if(abc != null){
                        if (hwpDocCtrl.global.HwpCtrl.FieldExist("doc_content")) {
                            hwpDocCtrl.global.HwpCtrl.MoveToField('doc_content', true, true, false);
                            hwpDocCtrl.setTextFile(draft.global.templateFormOpt.doc_contents, "HTML", "insertfile");
                        }
                    }

                })();
            });

        });

        function sleep(sec) {
            return new Promise(resolve => setTimeout(resolve, sec * 1000));
        }


        for(var i = 0; i < hwpDocCtrl.global.templateCustomField.length; i ++){
            if(hwpDocCtrl.global.HwpCtrl.FieldExist(hwpDocCtrl.global.templateCustomField[i].FIELD_NAME)){
                hwpDocCtrl.global.HwpCtrl.MoveToField(hwpDocCtrl.global.templateCustomField[i].FIELD_NAME, true, true, false);
                if(hwpDocCtrl.global.params[hwpDocCtrl.global.templateCustomField[i].FIELD_NAME] != null){
                    hwpDocCtrl.putFieldText(
                        hwpDocCtrl.global.templateCustomField[i].FIELD_NAME,
                        hwpDocCtrl.global.params[hwpDocCtrl.global.templateCustomField[i].FIELD_NAME]
                    );
                }
            }
        }
    },

    /**
     * 상신, 재상신시 사용하는 함수
     *
     * 기존 저장된 문서 열어서 수정 작업을 위함
     */
    modOpenCallBack : function(){
        hwpDocCtrl.global.HwpCtrl.EditMode = 2;
        hwpDocCtrl.global.HwpCtrl.SetToolBar(2, "TOOLBAR_MENU");
        hwpDocCtrl.global.HwpCtrl.SetToolBar(2, "TOOLBAR_STANDARD");
        hwpDocCtrl.global.HwpCtrl.ShowRibbon(true);
        hwpDocCtrl.global.HwpCtrl.ShowCaret(true);
        hwpDocCtrl.global.HwpCtrl.ShowStatusBar(true);
        hwpDocCtrl.global.HwpCtrl.SetFieldViewOption(2);

        hwpDocCtrl.modDataSet();

        hwpDocCtrl.global.HwpCtrl.MoveToField('doc_content', true, true, false);
    },

    /**r
     * 문서 보기 사용하는 함수
     */
    viewOpenCallBack : function(){
        hwpDocCtrl.global.HwpCtrl.EditMode = 0;
        hwpDocCtrl.global.HwpCtrl.SetToolBar(1, "TOOLBAR_MENU");
        hwpDocCtrl.global.HwpCtrl.SetToolBar(1, "TOOLBAR_STANDARD");
        hwpDocCtrl.global.HwpCtrl.ShowRibbon(false);
        hwpDocCtrl.global.HwpCtrl.ShowCaret(false);
        hwpDocCtrl.global.HwpCtrl.ShowStatusBar(false);
        hwpDocCtrl.global.HwpCtrl.SetFieldViewOption(1);

        hwpDocCtrl.viewDataSet();
    },



    /**
     * 웹한글기안기는 ""로 데이터 클리어 안됨
     *
     * @param field = 삽입할 필드 이름 (DATA TYPE = String)
     * @param text = 삽입할 텍스트 (DATA TYPE = String)
     */
    putFieldText : function(field, text) {
        if (text == ""){
            text = "\n";
        }
        hwpDocCtrl.global.HwpCtrl.PutFieldText(field, text);
    },

    /**
     * 동일한 필드명에 숫자로 구분하는 필드들에 동일한 값 입력
     * ex) name1, name2, name3
     *
     * @param field = 필드 이름 ( String Array OR String ) ex) ["approval", "approver", "cooperate", "cooperation"]
     * @param size = 필드 개수 ex) 7 일시 0~7 검사
     * @param text = 넣을 텍스트 초기화시 "\n" 입력
     */
    putFieldsText : function(field, size, text){
        if(Array.isArray(field)){
            for(var i = 0; i < field.length; i++){
                for(var j = 0; j < size; j++){
                    if(hwpDocCtrl.global.HwpCtrl.FieldExist(field[i] + j)){
                        hwpDocCtrl.global.HwpCtrl.PutFieldText(field[i] + j, text);
                    }
                }
            }
        }else{
            for(var i = 0; i < size; i++){
                if(hwpDocCtrl.global.HwpCtrl.FieldExist(field + i)){
                    hwpDocCtrl.global.HwpCtrl.PutFieldText(field, text);
                }
            }
        }

        hwpDocCtrl.global.HwpCtrl.MoveToField('doc_content', true, true, false);
    },

    /**
     * fields - Data Type Json Array - 필드이름 리스트
     * ex) JSON.stringify([
     *          { field1 : "approval" },
     *          { field2 : "approver" }
     *     ])
     *
     * type - Data Type Array - 조건 리스트
     * ex) 아래 처럼 넣을시 이런 조건이 형성된다. > arr[0].approveType == 0
     *      trueCase는 배열에서 검사할 필드값
     *      trueValue는 Case로 꺼낸 필드 값으로 검사할 값
     * [
     *      { trueCase : "approveType" },
     *      { trueValue : "0" },
     * ]
     *
     * arrKey - Data Type Json Array - array에서 꺼내올 키 리스트
     * ex) JSON.stringify([
     *          { arrKey1 : "approveEmpName" },
     *          { arrKey2 : "approvePositionName" }
     *      ])
     * arr - DATA TYPE ARRAY - 데이터 리스트
     *
     * field1에 넣을 데이터는 배열에서 arrKey1로 꺼내온 값이여야 한다.
     *
     * @param trueFields == 참일때 넣을 필드이름 리스트
     * @param falseFields == 거짓일때 넣을 필드이름 리스트
     * @param type == 참인 조건
     * @param arrKey
     * @param arr
     */
    setArrayFieldsPut : function(trueFields, falseFields, type, arrKey, arr){
        var trueIndex = 0;
        var falseIndex = 0;
        for(var i = 0; i < trueFields.length; i++){
            for(var j = 0; j < arr.length; j++){
                if(type != ""){
                    var flag = arr[j][type.trueCase] == type.trueValue;
                    if(flag && hwpDocCtrl.global.HwpCtrl.FieldExist(trueFields[i] + "" + trueIndex)){
                        hwpDocCtrl.global.HwpCtrl.MoveToField(trueFields[i] + "" + trueIndex, true, true, false);
                        hwpDocCtrl.putFieldText(trueFields[i] + "" + trueIndex, arr[j][arrKey[i]]);
                        trueIndex++;
                    }else if(hwpDocCtrl.global.HwpCtrl.FieldExist(falseFields[i] + "" + falseIndex)){
                        hwpDocCtrl.global.HwpCtrl.MoveToField(falseFields[i] + "" + falseIndex, true, true, false);
                        hwpDocCtrl.putFieldText(falseFields[i] + "" + falseIndex, arr[j][arrKey[i]]);
                        falseIndex++;
                    }
                }else{
                    if(hwpDocCtrl.global.HwpCtrl.FieldExist(trueFields[i] + "" + j)){
                        hwpDocCtrl.global.HwpCtrl.MoveToField(trueFields[i] + "" + j, true, true, false);
                        hwpDocCtrl.putFieldText(trueFields[i] + "" + j, arr[j][arrKey[i]]);
                    }
                }
            }
            trueIndex = 0;
            falseIndex = 0;
        }

        hwpDocCtrl.global.HwpCtrl.MoveToField('doc_content', true, true, false);
    },

    /**
     * @param field = 문자열 구할 필드 이름
     * @returns {*}
     */
    getFieldText : function(field) {
        var fieldText = "";

        if(hwpDocCtrl.global.HwpCtrl.FieldExist(field)){
            fieldText = hwpDocCtrl.global.HwpCtrl.GetFieldText(field);
        }

        return fieldText;
    },

    /**
     * 백슬러시 입력 함수
     *
     * @param field = 필드 이름 ( String Array OR String ) ex) ["approval", "approver", "cooperate", "cooperation"]
     */
    setCrookedSlash : function(field){
        if(Array.isArray(field)){
            for(var i = 0; i < field.length; i++){
                if(hwpDocCtrl.global.HwpCtrl.FieldExist(field[i])){
                    hwpDocCtrl.global.HwpCtrl.MoveToField(field[i], true, true, false);

                    var vAct = hwpDocCtrl.global.HwpCtrl.CreateAction("CellBorder");
                    var vSet = vAct.CreateSet();
                    vAct.GetDefault(vSet);

                    vSet.SetItem("DiagonalType", 1);
                    vSet.SetItem("BackSlashFlag", 0x02);
                    vSet.SetItem("CrookedSlashFlag2", 2);

                    vAct.Execute(vSet);
                }
            }
        }

        hwpDocCtrl.global.HwpCtrl.MoveToField('doc_content', true, true, false);
    },

    /**
     * fileName = 저장시 파일 이름
     * format {
     *      "HWP"			한글 native format
     *      "HWP30"		    한글 3.X/96/97
     *      "HTML"			인터넷 문서
     *      "TEXT"			아스키 텍스트 문서
     *      "UNICODE"		유니코드 텍스트 문서
     *      "HWP20"		    한글 2.0
     *      "HWP21"		    한글 2.1/2.5
     *      "HWP15"		    한글 1.X
     *      "HWPML2X"		HWPML 2.X 문서 (Open / SaveAs 가능)
     *      "RTF"			서식있는 텍스트 문서
     *      "DBF"			DBASE II/III 문서
     *      "HUNMIN"		훈민정음 3.0/2000
     *      "MSWORD"		마이크로소프트 워드 문서
     *      "HANA"		    하나워드 문서
     *      "ARIRANG"		아리랑 문서
     *      "ICHITARO" 		一太郞 문서 (일본 워드프로세서)
     *      "WPS"			WPS 문서
     *      "DOCIMG"		인터넷 프레젠테이션 문서(SaveAs만 가능)
     *      “SWF"			Macromedia Flash 문서(SaveAs만 가능)
     *      “PUBDOCBODY"    공문서(xml)
     * }
     * @param fileName
     * @param format
     * @param arg
     */
    saveAs : function(fileName, format) {
        hwpDocCtrl.global.HwpCtrl.SaveAs(fileName, format, "download:true");
    },

    saveFile : function(filename, format, callback) {
        hwpDocCtrl.global.HwpCtrl.SaveDocument(filename, format, callback);
    },

    printDocument : function() {
        hwpDocCtrl.global.HwpCtrl.PrintDocument();
    },

    clear : function() {
        hwpDocCtrl.global.HwpCtrl.Clear(1);
    },

    editMode : function(option) {
        hwpDocCtrl.global.HwpCtrl.EditMode = option;
    },

    setTextFile : function(data, format, option, callback) {
        hwpDocCtrl.global.HwpCtrl.SetTextFile(data, format, option, callback);
    },

    insert : function(url, format, callback) {
        return hwpDocCtrl.global.HwpCtrl.Insert(url, format, "", callback, "");
    },

    openDocument : function(url, format, callback) {
        return hwpDocCtrl.global.HwpCtrl.OpenDocument(url, format, callback);
    },

    insertDocument : function(url, callback) {
        return hwpDocCtrl.global.HwpCtrl.InsertDocument(url, callback);
    },

    insertBackgroundPicture : function(bordertype, path, embedded, filloption, watermark, effect, brightnss, contrast) {
        return hwpDocCtrl.global.HwpCtrl.InsertBackgroundPicture(bordertype, path, embedded, filloption, watermark, effect, brightnss, contrast);
    },

    insertPicture : function(field, path, callback) {
        hwpDocCtrl.global.HwpCtrl.MoveToField(field, true, false, false);
        hwpDocCtrl.global.HwpCtrl.InsertPicture(path, true, 1, false, false, 0, 13, 7, callback);
    },

    getFieldList : function(number, option) {
        return hwpDocCtrl.global.HwpCtrl.GetFieldList(number, option).split(splitChar);
    },

    fieldExist : function(field) {
        return hwpDocCtrl.global.HwpCtrl.FieldExist(field);
    },

    appendFieldText : function(field, text) {
        var iText = hwpDocCtrl.global.HwpCtrl.GetFieldText(field) + text;
        hwpDocCtrl.global.HwpCtrl.PutFieldText(field, iText);
    },

    prependFieldText : function(field, text) {
        var iText = text + hwpDocCtrl.global.HwpCtrl.GetFieldText(field);
        hwpDocCtrl.global.HwpCtrl.PutFieldText(field, iText);
    },

    appendFieldText : function(pFieldName, pFieldText, pAppendSart, pHwpFormat, pDeleteContent, callback) {
        if (pDeleteContent)
            SetFieldText(pFieldName, "")

        if (hwpDocCtrl.global.HwpCtrl.MoveToField(pFieldName, true, pAppendSart)) {
            if (typeof (callback) == "undefined") {
                if (pHwpFormat)
                    hwpDocCtrl.global.HwpCtrl.SetTextFile(pFieldText, "HTML", "insertfile");
                else
                    hwpDocCtrl.global.HwpCtrl.SetTextFile(pFieldText, "UNICODE", "insertfile");
            }
            else {
                if (pHwpFormat)
                    hwpDocCtrl.global.HwpCtrl.SetTextFile(pFieldText, "HTML", "insertfile", function (data) { callback(data) });
                else
                    hwpDocCtrl.global.HwpCtrl.SetTextFile(pFieldText, "UNICODE", "insertfile", function (data) { callback(data) },);
            }
        }
    },

    setFieldText : function(pFieldName, pFieldText, pFontSize, pBold, pColor, pUnderline, pItalic) {
        if (pFieldText != "") {
            hwpDocCtrl.global.HwpCtrl.PutFieldText(pFieldName, pFieldText);

            if (hwpDocCtrl.global.HwpCtrl.MoveToField(pFieldName)) {
                hwpDocCtrl.global.HwpCtrl.Run("SelectAll");
                var HwpSet = hwpDocCtrl.global.HwpCtrl.CharShape;

                if (pBold)
                    HwpSet.SetItem("Bold", true);

                if (pColor != -1)
                    HwpSet.SetItem("TextColor", pColor);

                if (pFontSize != -1)
                    HwpSet.SetItem("Height", pFontSize * 100);

                if (pUnderline != -1) {
                    HwpSet.SetItem("UnderlineType", pUnderline)

                    if (pColor != -1){
                        HwpSet.SetItem("UnderlineColor", pColor);
                    }
                }

                if (pItalic) {
                    HwpSet.SetItem("Italic", true);
                }

                hwpDocCtrl.global.HwpCtrl.CharShape = HwpSet;

                hwpDocCtrl.global.HwpCtrl.MoveToField(pFieldName);
            }
        } else {
            if (hwpDocCtrl.global.HwpCtrl.MoveToField(pFieldName))
                hwpDocCtrl.global.HwpCtrl.PutFieldText(pFieldName, String.fromCharCode(2));
        }
    },

    moveToField : function(field) { //선택한 필드로 캐럿 이동
        hwpDocCtrl.global.HwpCtrl.MoveToField(field, true, true, false);
    },

    moveToFieldEx : function(field) { //선택한 필드로 캐럿, 화면 이동
        hwpDocCtrl.global.HwpCtrl.MoveToFieldEx(field, true, true, false);
    },

    scrollPosInfo : function(HorzPos, VertPos) { //스크롤바 위치
        var ScrollPosSet;
        ScrollPosSet = hwpDocCtrl.global.HwpCtrl.ScrollPosInfo;
        ScrollPosSet.SetItem("HorzPos", HorzPos);
        ScrollPosSet.SetItem("VertPos", VertPos);
        hwpDocCtrl.global.HwpCtrl.ScrollPosInfo = ScrollPosSet;
    },

    setToolBar : function(option, ToolBarID) { //툴바 설정
        hwpDocCtrl.global.HwpCtrl.SetToolBar(option, ToolBarID);
    },

    showToolBar : function(option) { //툴바 표시
        hwpDocCtrl.global.HwpCtrl.ShowToolBar(option);
    },

    showRibbon : function(option) { //리본 표시
        hwpDocCtrl.global.HwpCtrl.ShowRibbon(option);
    },

    //필드내용을 복사하기위해 내용을 TEXT로 받아온다.(필드명이 없을경우 문서전체의 내용을 받아온다)
    getCloneData : function(pFieldName, pDataType, callback) {
        var FieldInfo;
        if (pFieldName != "") {
            hwpDocCtrl.global.HwpCtrl.MoveToField(pFieldName);
            FieldInfo = GetCurrentFieldInfo(0, false);
            var array = FieldInfo.split(';')
            if (array.length > 1 && array[1] == "2") {
                hwpDocCtrl.global.HwpCtrl.MoveToField(pFieldName, true, true, true);
                hwpDocCtrl.global.HwpCtrl.GetTextFile(pDataType, "saveblock", callback);
            }else {
                var act;
                act = hwpDocCtrl.global.HwpCtrl.CreateAction("SelectAll");
                act.Run();
                hwpDocCtrl.global.HwpCtrl.GetTextFile(pDataType, "saveblock", callback);
            }
        }
    },

    getCurrentFieldInfo : function(pFieldOption, pXmlFormat) {
        var FieldName;
        var FieldType;
        var FieldAccess;
        var FieldState;

        FieldName = hwpDocCtrl.global.HwpCtrl.GetCurFieldName(pFieldOption);
        FieldState = hwpDocCtrl.global.HwpCtrl.CurFieldState;

        if (FieldState != "" && (FieldState & 16)> 0) {
            if ((FieldState & 15) == 1) {
                FieldType = "1";  //셀
            } else {
                FieldType = "2";  //누름틀
            }
            FieldAccess = hwpDocCtrl.global.HwpCtrl.ModifyFieldProperties(FieldName, 0, 0);
            FieldAccess = FieldAccess & 1;
        }

        if (pXmlFormat) {
            return "<DATA><NAME>" + MakeXMLString(FieldName) + "</NAME><TYPE>" + FieldType + "</TYPE><ACCESS>" & FieldAccess & "</ACCESS></DATA>";
        } else {
            return FieldName + ";" + FieldType + ";" + FieldAccess;
        }
    },

    getDocumentInfo : function(pXmlFormat) {
        var rtnVal;
        var HwpAct;
        var HwpSet;
        HwpAct = hwpDocCtrl.global.HwpCtrl.CreateAction("DocSummaryInfo");
        HwpSet = hwpDocCtrl.global.HwpCtrl.CreateSet("SummaryInfo");

        HwpAct.GetDefault(HwpSet);

        if (typeof (pXmlFormat) == "undefined") {
            pXmlFormat = true;
        }

        if (pXmlFormat) {
            rtnVal = "<DATA><TITLE>" + HwpSet.Item("Title") + "</TITLE>" +
                "<SUBJECT>" + HwpSet.Item("Subject") + "</SUBJECT>" +
                "<AUTHOR>" + HwpSet.Item("Author") + "</AUTHOR>" +
                "<DATE>" + HwpSet.Item("Date") + "</DATE>" +
                "<KEYWORD>" + HwpSet.Item("KeyWords")+ "</KEYWORD>" +
                "<COMMENT>" + HwpSet.Item("Comments") + "</COMMENT>" +
                "<CHARACTERS>" + HwpSet.Item("Characters") + "</CHARACTERS>" +
                "<WORDS>" + HwpSet.Item("Words") + "</WORDS>" +
                "<LINES>" + HwpSet.Item("Lines") + "</LINES>" +
                "<PARAGRAPHS>" + HwpSet.Item("Paragraphs") + "</PARAGRAPHS>" +
                "<PAGES>" + HwpSet.Item("Pages") + "</PAGES></DATA>";
        }else {
            rtnVal = HwpSet.Item("Title") + "_kaoni_seperator_" +
                HwpSet.Item("Subject") + "_kaoni_seperator_" +
                HwpSet.Item("Author") + "_kaoni_seperator_" +
                HwpSet.Item("Date") + "_kaoni_seperator_" +
                HwpSet.Item("KeyWords") + "_kaoni_seperator_" +
                HwpSet.Item("Comments") + "_kaoni_seperator_" +
                HwpSet.Item("Characters") + "_kaoni_seperator_" +
                HwpSet.Item("Words") + "_kaoni_seperator_" +
                HwpSet.Item("Lines") + "_kaoni_seperator_" +
                HwpSet.Item("Paragraphs") + "_kaoni_seperator_" +
                HwpSet.Item("Pages") + "_kaoni_seperator_";
        }
        return rtnVal;
    },

    setDocumentInfo : function(pTitle, pSubject, pAuthor, pKeyword, pComment) {
        var HwpAct;
        var HwpSet;
        HwpAct = hwpDocCtrl.global.HwpCtrl.CreateAction("DocSummaryInfo");
        HwpSet = hwpDocCtrl.global.HwpCtrl.CreateSet("SummaryInfo");

        HwpAct.GetDefault(HwpSet);

        if (pTitle != "NULL"){
            HwpSet.SetItem("Title", pTitle);
        }

        if (pSubject != "NULL"){
            HwpSet.SetItem("Subject", pSubject);
        }

        if (pAuthor != "NULL"){
            HwpSet.SetItem("Author", pAuthor);
        }

        if (pKeyword != "NULL"){
            HwpSet.SetItem("KeyWords", pKeyword);
        }

        if (pComment != "NULL"){
            HwpSet.SetItem("Comments", pComment);
        }
        HwpAct.Execute(HwpSet);

    },

    setCloneData : function(pCloneData, pFieldName, pDataType) {
        var rtnval = false;
        try {
            if (pFieldName != "") {
                hwpDocCtrl.global.HwpCtrl.MoveToField(pFieldName)
                hwpDocCtrl.global.HwpCtrl.PutFieldText(pFieldName, String.fromCharCode(2));

                if (hwpDocCtrl.global.HwpCtrl.SetTextFile(pCloneData, pDataType, "insertfile")) {
                    rtnval = true;
                }

            } else {
                if (hwpDocCtrl.global.HwpCtrl.SetTextFile(pCloneData, pDataType, "")) {
                    rtnval = true;
                }
            }
        }catch (e) {

        }

        return rtnval;
    },

    setCloneDataCallback : function(pCloneData, pFieldName, pDataType, callback) {
        try {
            if (pFieldName != "") {
                hwpDocCtrl.global.HwpCtrl.MoveToField(pFieldName)
                hwpDocCtrl.global.HwpCtrl.PutFieldText(pFieldName, String.fromCharCode(2));

                hwpDocCtrl.global.HwpCtrl.SetTextFile(pCloneData, pDataType, "insertfile", callback)

            } else {
                hwpDocCtrl.global.HwpCtrl.SetTextFile(pCloneData, pDataType, "", callback)
            }
        }
        catch (e) {

        }
    },

    //필드에 백그라운드 이미지를 넣거나 삭제하는 함수
    setFieldBackImage : function(pFieldName, pImagePath, pFillOption) {
        var rtnVal = false;

        if (typeof (pFillOption) == "undefined")
            pFillOption = 5;

        if (hwpDocCtrl.global.HwpCtrl.MoveToField(pFieldName)) {
            if (pImagePath != "")
                hwpDocCtrl.global.HwpCtrl.InsertBackgroundPicture("SelectedCell", pImagePath, true, pFillOption, false, false, false, false);
            else
                hwpDocCtrl.global.HwpCtrl.InsertBackgroundPicture("SelectedCellDelete", pImagePath, false, false, false, false, false, false);

            rtnVal = true;
        }

        return rtnVal;
    },

    //필드에 이미지를 추가하는 함수
    setFieldImage : function(pFieldName, pImagePath, pSizeType, pWidth, pHeight) {
        var embeded = true;
        var reverse = false;
        var watermark = false;
        var effect = 0; //0:실제이미지그대로, 1:그레이스케일, 2:흑백효과
        //pSizeType 0:원래크기, 1: width,height크기로, 2: width는 셀 width만큼 height는 셀height만큼, 3: 현제셀크기에 맞춰
        hwpDocCtrl.global.HwpCtrl.MoveToField("img_logo");
        if (hwpDocCtrl.global.HwpCtrl.MoveToField(pFieldName)) {
            if (pWidth == 0){
                hwpDocCtrl.global.HwpCtrl.InsertPicture(pImagePath, embeded, pSizeType, reverse, watermark, effect, 0);
            }else{
                hwpDocCtrl.global.HwpCtrl.InsertPicture(pImagePath, embeded, pSizeType, reverse, watermark, effect, pWidth, pHeight);
            }
        }
    },

    clearDocument : function() {
        hwpDocCtrl.global.HwpCtrl.Clear(1); //문서 내용을 버린다
    },

    makeXMLString : function(pOrgString) {
        if (typeof (pOrgString) == "undefined" || pOrgString == undefined) {
            return "";
        }

        return hwpDocCtrl.replaceText(hwpDocCtrl.replaceText(hwpDocCtrl.replaceText(pOrgString, "&", "&amp;"), "<", "&lt;"), ">", "&gt;");
    },

    replaceText : function(orgStr, findStr, replaceStr) {
        var re = new RegExp(findStr, "gi");
        return (orgStr.replace(re, replaceStr));
    },

    saveDocument : function(fileName, fileType, callback) {
        hwpDocCtrl.global.HwpCtrl.SaveDocument(fileName, fileType, callback);
    },

    /**
     * [View의 상태 정보]
     * 조판 부호, 화면 확대 비율과 같은 view에 관련된 정보를 나타낸다.
     * ParameterSet의 형식은 ParameterSet/ViewProperties 참조.
     * 	 - zoomType : 화면 확대 종류(0 - 사용자정의, 1 - 쪽맞춤, 2 - 폭맞춤, 3 - 여러쪽)
     * 	 - zoomRatio : 화면 확대 비율(10 ~ 500 (단위 %)) - 화면 확대 종류가 "사용자 정의"인 경우만 사용가능
     */
     setViewProperties : function(zoomType, zoomRatio) {
        var vp = hwpDocCtrl.global.HwpCtrl.CreateSet("ViewProperties");
        vp.SetItem("ZoomType", zoomType);		//	화면 확대 종류
        vp.SetItem("ZoomRatio", zoomRatio);		// 	화면 확대 비율
        hwpDocCtrl.global.HwpCtrl.ViewProperties = vp;
    }
}