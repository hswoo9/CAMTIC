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
    }
}