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
    }
}