var meetingInit = {

    global: {

    },

    meetingInit: function(cardToSn){
        const meetingResult = customKendo.fn_customAjax("/card/getMeetingData", {metSn : cardToSn});
        const meetingInfo = meetingResult.data;
        const pjtInfo = meetingResult.pjtInfo;
        const extData = meetingResult.extData;

        if(pjtInfo != null){
            hwpDocCtrl.putFieldText("BS_TITLE", pjtInfo.BS_TITLE);
            hwpDocCtrl.putFieldText("PJT_NM", pjtInfo.PJT_NM);
            hwpDocCtrl.putFieldText("PJT_DT", pjtInfo.PJT_START_DT+" ~ "+pjtInfo.PJT_END_DT);
        }

        hwpDocCtrl.putFieldText("MET_DE", meetingInfo.MET_DE+" "+meetingInfo.MET_STR_TIME+"~"+meetingInfo.MET_END_TIME);
        hwpDocCtrl.putFieldText("MET_LOC", meetingInfo.MET_LOC);
        hwpDocCtrl.putFieldText("MET_OBJ", meetingInfo.MET_OBJ);
        hwpDocCtrl.putFieldText("MET_CONT", meetingInfo.MET_CONT);

        let metEmpCount = 0;
        if(meetingInfo.MET_EMP_SEQ != null && meetingInfo.MET_EMP_SEQ != ""){
            const metEmpSeq = meetingInfo.MET_EMP_SEQ;
            const metEmpSeqArr = metEmpSeq.split(",");
            metEmpCount = metEmpCount + metEmpSeqArr.length;
        }
        metEmpCount = metEmpCount + extData.length;

        hwpDocCtrl.putFieldText("MET_EMP_COUNT", metEmpCount+"명");

        hwpDocCtrl.putFieldText("TO_DATE", fn_getNowDate(3));
        hwpDocCtrl.putFieldText("PM", "연구책임자 : "+pjtInfo.PM);

        const pmImgInfo = customKendo.fn_customAjax("/user/getUserImageList", {empSeq : pjtInfo.PM_EMP_SEQ});
        const pmSignImg = pmImgInfo.data.signImg;

        let ip = "http://218.158.231.184";
        if($(location).attr("host").split(":")[0].indexOf("218.158.231.184") > -1 || $(location).attr("host").split(":")[0].indexOf("new.camtic.or.kr") > -1){
            ip = "http://218.158.231.184";
        } else {
            ip = "http://218.158.231.186";
        }

        if(pmSignImg != null) {
            if (pmSignImg.file_ext == "JPG") {
                hwpDocCtrl.global.HwpCtrl.MoveToField("PM_SIGN_IMG", true, true, false);
                hwpDocCtrl.global.HwpCtrl.InsertPicture(
                    ip + pmSignImg.file_path + pmSignImg.file_uuid,
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
}