var docViewInit = {

    cardLossInit: function(tpClSn){
        const cardLossInfo = customKendo.fn_customAjax("/customDoc/getCardLossData", {tpClSn: tpClSn});
        const map = cardLossInfo.data;
        console.log("map : ", map);

        hwpDocCtrl.putFieldText("CARD_NO", map.CARD_NO);
        hwpDocCtrl.putFieldText("DEPT_NAME", map.DEPT_NAME);
        hwpDocCtrl.putFieldText("CARD_MST", map.CARD_MST);
        hwpDocCtrl.putFieldText("CL_DE", map.CL_DE);
        hwpDocCtrl.putFieldText("CL_LOC", map.CL_LOC);

        hwpDocCtrl.putFieldText('TO_DATE', fn_getNowDate(1));

        /** 특이사항 */
        setTimeout(function() {
            hwpDocCtrl.putFieldText("CL_ISS", "");
            hwpDocCtrl.moveToField("CL_ISS", true, true, false);
            hwpDocCtrl.setTextFile(map.CL_ISS.replaceAll("\n", "<br>"), "html","insertfile");
        }, 1000);
    },

    accCertInit: function(accCertSn){
        const accCertInfo = customKendo.fn_customAjax("/customDoc/getAccCertData", {accCertSn: accCertSn});
        const map = accCertInfo.data;
        console.log("map : ", map);

        let accText = "";
        if(map.ACC_CERT_TYPE == "A"){
            accText = "은행용인증서■ 범용인증서□";
        }else{
            accText = "은행용인증서□ 범용인증서■";
        }
        hwpDocCtrl.putFieldText("ACC_CERT_TYPE", accText);
        hwpDocCtrl.putFieldText("DEPT_NAME", map.DEPT_NAME);
        hwpDocCtrl.putFieldText("USE_DE", map.STR_DE +"~"+ map.END_DE);

        hwpDocCtrl.putFieldText('TO_DATE', fn_getNowDate(1));

        /** 사용용도 */
        setTimeout(function() {
            hwpDocCtrl.putFieldText("ACC_CERT_USE", "");
            hwpDocCtrl.moveToField("ACC_CERT_USE", true, true, false);
            hwpDocCtrl.setTextFile(map.ACC_CERT_USE.replaceAll("\n", "<br>"), "html","insertfile");
        }, 1000);
    },

    signetToInit: function(signSn){
        const signetToInfo = customKendo.fn_customAjax("/customDoc/getSignetToData", {signSn : signSn});
        const map = signetToInfo.data;
        console.log("map : ", map);

        let signText = "";
        let signText1 = "";
        let signText2 = "";
        let subSignText1 = "";
        let subSignText2 = "";
        let subSignText3 = "";
        if(map.SIGN_TYPE == "A"){
            signText = "법인인감";
            signText1 = "■법인인감";
            signText2 = "□사용인감";
            subSignText1 = "□이사장인";
            subSignText2 = "□원 장 인(大)";
            subSignText3 = "□원 장 인(小)";
        }else{
            signText = "사용인감";
            signText1 = "■법인인감";
            signText2 = "□사용인감";
            if(map.SUB_TYPE == "z"){
                subSignText1 = "■이사장인";
                subSignText2 = "□원 장 인(大)";
                subSignText3 = "□원 장 인(小)";
            }else if(map.SUB_TYPE == "x"){
                subSignText1 = "□이사장인";
                subSignText2 = "■원 장 인(大)";
                subSignText3 = "□원 장 인(小)";
            }else{
                subSignText1 = "□이사장인";
                subSignText2 = "□원 장 인(大)";
                subSignText3 = "■원 장 인(小)";
            }
        }
        hwpDocCtrl.putFieldText("signText", signText);
        hwpDocCtrl.putFieldText("sign1", signText1);
        hwpDocCtrl.putFieldText("sign2", signText2);
        hwpDocCtrl.putFieldText("subSign1", subSignText1);
        hwpDocCtrl.putFieldText("subSign2", subSignText2);
        hwpDocCtrl.putFieldText("subSign3", subSignText3);

        hwpDocCtrl.putFieldText("DEPT_NAME", map.DEPT_NAME);
        hwpDocCtrl.putFieldText("REG_EMP_NAME", map.EMP_NAME);
        hwpDocCtrl.putFieldText("POSITION", map.POSITION);
        hwpDocCtrl.putFieldText("DT", map.STR_DE +"~"+ map.END_DE);

        hwpDocCtrl.putFieldText('TO_DATE', fn_getNowDate(1));

        /** 사용용도 */
        setTimeout(function() {
            hwpDocCtrl.putFieldText("USE_ISS", "");
            hwpDocCtrl.moveToField("USE_ISS", true, true, false);
            hwpDocCtrl.setTextFile(map.USE_ISS.replaceAll("\n", "<br>"), "html","insertfile");
        }, 1000);
    },

    disAssetInit: function(disAssetSn){
        const disAssetInfo = customKendo.fn_customAjax("/customDoc/getDisAssetData", {disAssetSn : disAssetSn});
        const map = disAssetInfo.data;
        console.log("map : ", map);

        hwpDocCtrl.putFieldText("ASSET_NM", map.ASSET_NM);
        hwpDocCtrl.putFieldText("ASSET_NO", map.ASSET_NO);
        hwpDocCtrl.putFieldText("MODEL", map.MODEL);
        hwpDocCtrl.putFieldText("INS_DE", map.INS_DE);
        hwpDocCtrl.putFieldText("INS_AMT", map.INS_AMT == "0" ? "0" : comma(map.INS_AMT));
        hwpDocCtrl.putFieldText("PURC_LOC", map.PURC_LOC);
        hwpDocCtrl.putFieldText("EMP_NAME", map.EMP_NAME);
        hwpDocCtrl.putFieldText("DIS_ASSET_DE", map.DIS_ASSET_DE);

        hwpDocCtrl.putFieldText('TO_DATE', fn_getNowDate(1));

        /** 사용용도 */
        setTimeout(function() {
            hwpDocCtrl.putFieldText("DIS_ISS", "");
            hwpDocCtrl.moveToField("DIS_ISS", true, true, false);
            hwpDocCtrl.setTextFile(map.DIS_ISS.replaceAll("\n", "<br>"), "html","insertfile");
        }, 1000);

        /** 사용용도 */
        setTimeout(function() {
            hwpDocCtrl.putFieldText("DIS_ASSET_PB", "");
            hwpDocCtrl.moveToField("DIS_ASSET_PB", true, true, false);
            hwpDocCtrl.setTextFile(map.DIS_ASSET_PB.replaceAll("\n", "<br>"), "html","insertfile");
        }, 1500);
    },

    resignInit: function(resignSn){
        const resignInfo = customKendo.fn_customAjax("/customDoc/getResignData", {resignSn : resignSn});
        const map = resignInfo.data;

        hwpDocCtrl.putFieldText("DEPT_NAME", map.DEPT_NAME);
        hwpDocCtrl.putFieldText("POSITION", map.POSITION);
        hwpDocCtrl.putFieldText("EMP_NAME", map.EMP_NAME);
        hwpDocCtrl.putFieldText("JOIN_DAY", map.JOIN_DAY);
        hwpDocCtrl.putFieldText("RESIGN_DAY", map.RESIGN_DAY);
        hwpDocCtrl.putFieldText("REGIST_NO", map.REGIST_NO);
        hwpDocCtrl.putFieldText("JOB_DETAIL", map.JOB_DETAIL);

        let resignText1 = "□ 전   직";
        let resignText2 = "□ 개인신병";
        let resignText3 = "□ 진   학";
        let resignText4 = "□ 결   혼";
        let resignText5 = "□ 가   사";
        let resignText6 = "□ 기   타";

        if(map.RESIGN_TYPE == "A"){
            resignText1 = "■ 전   직";
        }else if(map.RESIGN_TYPE == "B"){
            resignText2 = "■ 개인신병";
        }else if(map.RESIGN_TYPE == "C"){
            resignText3 = "■ 진   학";
        }else if(map.RESIGN_TYPE == "D"){
            resignText4 = "■ 결   혼";
        }else if(map.RESIGN_TYPE == "E"){
            resignText5 = "■ 가   사";
        }else if(map.RESIGN_TYPE == "F"){
            resignText6 = "■ 기   타("+map.RESIGN_ISS+")";
        }
        hwpDocCtrl.putFieldText("RESIGN_TYPE1", resignText1);
        hwpDocCtrl.putFieldText("RESIGN_TYPE2", resignText2);
        hwpDocCtrl.putFieldText("RESIGN_TYPE3", resignText3);
        hwpDocCtrl.putFieldText("RESIGN_TYPE4", resignText4);
        hwpDocCtrl.putFieldText("RESIGN_TYPE5", resignText5);
        hwpDocCtrl.putFieldText("RESIGN_TYPE6", resignText6);

        hwpDocCtrl.putFieldText('TO_DATE', fn_getNowDate(1));
    },

    detailsInit: function(detSn){
        const detailsInfo = customKendo.fn_customAjax("/customDoc/getDetailsData", {detSn : detSn});
        const map = detailsInfo.data;

        const userInfo = getUser(map.EMP_SEQ);

        hwpDocCtrl.putFieldText("EMP_NAME", userInfo.EMP_NAME_KR);
        hwpDocCtrl.putFieldText("BDAY", userInfo.BDAY);
        hwpDocCtrl.putFieldText("DEPT_NAME", userInfo.DEPT_NAME);
        hwpDocCtrl.putFieldText("POSITION", fn_getSpot(userInfo.DUTY_NAME, userInfo.POSITION_NAME));

        hwpDocCtrl.putFieldText("DET_TITLE", map.DET_TITLE);
        hwpDocCtrl.putFieldText("DET_DE", map.DET_DE);
        hwpDocCtrl.putFieldText("DET_LOC", map.DET_LOC);
        hwpDocCtrl.putFieldText("DET_ETC", map.DET_ETC);

        hwpDocCtrl.putFieldText('TO_DATE', fn_getNowDate(1));

        /** 내용 */
        setTimeout(function() {
            hwpDocCtrl.putFieldText("DET_CONT", "");
            hwpDocCtrl.moveToField("DET_CONT", true, true, false);
            hwpDocCtrl.setTextFile(map.DET_CONT.replaceAll("\n", "<br>"), "html","insertfile");
        }, 1000);
    },

    condInit: function(condSn){
        const condInfo = customKendo.fn_customAjax("/customDoc/getCondData", {condSn : condSn});
        const map = condInfo.data;

        const userInfo = getUser(map.EMP_SEQ);
        hwpDocCtrl.putFieldText("DEPT_NAME", userInfo.DEPT_NAME);
        hwpDocCtrl.putFieldText("POSITION", fn_getSpot(userInfo.DUTY_NAME, userInfo.POSITION_NAME));
        hwpDocCtrl.putFieldText("EMP_NAME", userInfo.EMP_NAME_KR);

        hwpDocCtrl.putFieldText("COND_CONT", map.COND_CONT);
        hwpDocCtrl.putFieldText("COND_TARGET_NAME", map.COND_TARGET_NAME);
        hwpDocCtrl.putFieldText("COND_RET", map.COND_RET);
        hwpDocCtrl.putFieldText("COND_DE", map.COND_DE);

        hwpDocCtrl.putFieldText("COND_AMT", map.COND_AMT == "0" ? "0" : comma(map.COND_AMT));
        hwpDocCtrl.putFieldText("COND_AMT_TEXT", fn_koreanNumber(map.COND_AMT));

        hwpDocCtrl.putFieldText('TO_DATE', fn_getNowDate(1));

        /** 비고 */
        setTimeout(function() {
            hwpDocCtrl.putFieldText("ETC", "");
            hwpDocCtrl.moveToField("ETC", true, true, false);
            hwpDocCtrl.setTextFile(map.ETC.replaceAll("\n", "<br>"), "html","insertfile");
        }, 1000);
    }
}