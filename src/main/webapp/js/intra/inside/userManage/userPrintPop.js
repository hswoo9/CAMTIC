const userPrintPop = {
    global: {
        hwpCtrl : "",
        now : "",
        fileTitle : "",
    },

    fn_defaultScript : function(){
        userPrintPop.pageSet();
    },

    pageSet : function(){
        userPrintPop.loading();
        userPrintPop.global.hwpCtrl = BuildWebHwpCtrl("hwpApproveContent", $("#hwpUrl").val(), function () {userPrintPop.editorComplete();});
    },

    editorComplete : function(){
        let filePath = "http://218.158.231.184/upload/templateForm/userPrintTmp.hwp";
        userPrintPop.global.hwpCtrl.Open(filePath, "HWP", "", function(){
            userPrintPop.openCallBack();
            userPrintPop.global.hwpCtrl.EditMode = 0;
            userPrintPop.global.hwpCtrl.SetToolBar(1, "TOOLBAR_MENU");
            userPrintPop.global.hwpCtrl.SetToolBar(1, "TOOLBAR_STANDARD");
            userPrintPop.global.hwpCtrl.ShowRibbon(false);
            userPrintPop.global.hwpCtrl.ShowCaret(false);
            userPrintPop.global.hwpCtrl.ShowStatusBar(false);
            userPrintPop.global.hwpCtrl.SetFieldViewOption(1);
        }, {"userData" : "success"});

        userPrintPop.resize();
        $.LoadingOverlay("hide", {});
    },

    openCallBack : function(){
        const result1 = customKendo.fn_customAjax("/user/getUserPersonnelOne", {pk: $("#empSeq").val()});
        const userMap1 = result1.data;

        const result2 = customKendo.fn_customAjax("/user/getEducationalList", {empSeq: $("#empSeq").val()});
        const userMap2 = result2.list;

        const result3 = customKendo.fn_customAjax("/user/getCareerInfoList", {empSeq: $("#empSeq").val()});
        const userMap3 = result3.list;

        const result4 = customKendo.fn_customAjax("/user/getMilitarySvcInfo", {empSeq: $("#empSeq").val()});
        const userMap4 = result4.data;

        const result5 = customKendo.fn_customAjax("/user/getFamilyInfoList", {empSeq: $("#empSeq").val()});
        const userMap5 = result5.list;

        const result6 = customKendo.fn_customAjax("/user/getLicenceInfoList", {empSeq: $("#empSeq").val()});
        const userMap6 = result6.list;

        const result7 = customKendo.fn_customAjax("/user/getDutyInfoList", {empSeq: $("#empSeq").val()});
        const userMap7 = result7.list;

        const result8 = customKendo.fn_customAjax("/user/getAppointInfoList", {empSeq: $("#empSeq").val()});
        const userMap8 = result8.list;

        const result9 = customKendo.fn_customAjax("/user/getRewardInfoList", {empSeq: $("#empSeq").val()});
        const userMap9 = result9.list;

        /*const result10 = customKendo.fn_customAjax("", {empSeq: $("#empSeq").val()});
        const userMap10 = result10.list;

        const result11 = customKendo.fn_customAjax("", {empSeq: $("#empSeq").val()});
        const userMap11 = result11.list;*/

        const result12 = customKendo.fn_customAjax("/user/getProposalInfoList", {empSeq: $("#empSeq").val()});
        const userMap12 = result12.list;


        if(userMap1 == null){ alert("데이터 조회 중 오류가 발생하였습니다. 새로고침 후 진행바랍니다."); return; }

        /** 인사정보 */
        userPrintPop.global.fileTitle = userMap1.EMP_NAME_KR + " 인사기록카드.hwp";
        userPrintPop.global.hwpCtrl.PutFieldText("DEPT_NAME", userMap1.DEPT_NAME);
        userPrintPop.global.hwpCtrl.PutFieldText("POSITION_NAME", fn_getSpot(userMap1.DUTY_NAME, userMap1.POSITION_NAME));
        userPrintPop.global.hwpCtrl.PutFieldText("DEPT_SEQ", userMap1.ERP_EMP_SEQ);
        userPrintPop.global.hwpCtrl.PutFieldText("REG_DATE", userMap1.JOIN_DAY_F);
        userPrintPop.global.hwpCtrl.PutFieldText("RESIGN_DAY", userMap1.RESIGN_DAY_F); 
        userPrintPop.global.hwpCtrl.PutFieldText("EMP_NAME", userMap1.EMP_NAME_KR);
        userPrintPop.global.hwpCtrl.PutFieldText("EMP_NAME_CN", userMap1.EMP_NAME_CN);
        userPrintPop.global.hwpCtrl.PutFieldText("RES_REGIS_NUM", userMap1.RES_REGIS_NUM);
        userPrintPop.global.hwpCtrl.PutFieldText("LEGAL_DOMICILE", userMap1.LEGAL_DOMICILE);
        userPrintPop.global.hwpCtrl.PutFieldText("ADDR_DETAIL", userMap1.ADDR);
        userPrintPop.global.hwpCtrl.PutFieldText("BDAY", userMap1.BDAY);
        userPrintPop.global.hwpCtrl.PutFieldText("EMAIL_ADDR", userMap1.EMAIL_ADDR);
        userPrintPop.global.hwpCtrl.PutFieldText("MOBILE_TEL_NUM", userMap1.MOBILE_TEL_NUM);
        userPrintPop.global.hwpCtrl.PutFieldText("HOME_TEL_NUM", userMap1.HOME_TEL_NUM);
        userPrintPop.global.hwpCtrl.PutFieldText("GENDER_CODE", userMap1.GENDER_CODE == "F" ? "여자" : userMap1.GENDER_CODE == "M" ? "남자" : " ");
        userPrintPop.global.hwpCtrl.PutFieldText("CAR_NUM", userMap1.CAR_NUM);
        userPrintPop.global.hwpCtrl.PutFieldText("WEDDING_ACTIVE", userMap1.WEDDING_ACTIVE == "Y" ? "기혼" : userMap1.GENDER_CODE == "N" ? "미혼" : " ");
        userPrintPop.global.hwpCtrl.PutFieldText("HEIGHT", userMap1.HEIGHT);
        userPrintPop.global.hwpCtrl.PutFieldText("WEIGHT", userMap1.WEIGHT);
       userPrintPop.global.hwpCtrl.PutFieldText("VISION", "좌"+userMap1.VISIONL+" 우"+userMap1.VISIONR);

        userPrintPop.global.hwpCtrl.PutFieldText("BLOOD_TYPE", userMap1.BLOOD_TYPE);
        userPrintPop.global.hwpCtrl.PutFieldText("SPECIALITY", userMap1.SPECIALITY);
        userPrintPop.global.hwpCtrl.PutFieldText("HOBBY", userMap1.HOBBY);
        userPrintPop.global.hwpCtrl.PutFieldText("RELIGION", userMap1.RELIGION);

        if(userMap1.picFilePath != null){
            if(userPrintPop.global.hwpCtrl.FieldExist('idImg')){
                userPrintPop.global.hwpCtrl.PutFieldText('idImg', " ");
                userPrintPop.global.hwpCtrl.MoveToField('idImg', true, true, false);
                userPrintPop.global.hwpCtrl.InsertBackgroundPicture(
                    "SelectedCell",
                    "https://new.camtic.or.kr" + userMap1.picFilePath,
                    1,
                    5,
                    0,
                    0,
                    0,
                    0
                );
            }
        }

        /** 학력사항 */
        var html = userPrintHtml.html1(userMap2);
        html += userPrintHtml.html2(userMap3);
        html += userPrintHtml.html3(userMap4);
        html += userPrintHtml.html4(userMap5);
        html += userPrintHtml.html5(userMap6);
        html += userPrintHtml.html6(userMap7);
        html += userPrintHtml.html7(userMap8);
        html += userPrintHtml.html8(userMap9);
        html += userPrintHtml.html9();
        html += userPrintHtml.html10();
        html += userPrintHtml.html11(userMap12);

        userPrintPop.global.hwpCtrl.MoveToField('HTML1', true, true, false);
        userPrintPop.global.hwpCtrl.SetTextFile(html.replaceAll("\n", "<br>"), "HTML", "insertfile", {});

        // /** 경력사항 */
        // html += userPrintHtml.html2(userMap3);
        // userPrintPop.global.hwpCtrl.MoveToField('HTML2', true, true, false);
        // userPrintPop.global.hwpCtrl.SetTextFile(html.replaceAll("\n", "<br>"), "HTML", "insertfile", {});
        //
        // /** 병역사항 */
        // var html = userPrintHtml.html3(userMap4);
        // userPrintPop.global.hwpCtrl.MoveToField('HTML3', true, true, false);
        // userPrintPop.global.hwpCtrl.SetTextFile(html.replaceAll("\n", "<br>"), "HTML", "insertfile", {});
        //
        // /** 가족사항 */
        // var html = userPrintHtml.html4(userMap5);
        // userPrintPop.global.hwpCtrl.MoveToField('HTML4', true, true, false);
        // userPrintPop.global.hwpCtrl.SetTextFile(html.replaceAll("\n", "<br>"), "HTML", "insertfile", {});
        //
        // /** 자격증 및 면허, 어학능력*/
        // var html = userPrintHtml.html5(userMap6);
        // userPrintPop.global.hwpCtrl.MoveToField('HTML5', true, true, false);
        // userPrintPop.global.hwpCtrl.SetTextFile(html.replaceAll("\n", "<br>"), "HTML", "insertfile", {});
        //
        // /** 직무사항 */
        // var html = userPrintHtml.html6(userMap7);
        // userPrintPop.global.hwpCtrl.MoveToField('HTML6', true, true, false);
        // userPrintPop.global.hwpCtrl.SetTextFile(html.replaceAll("\n", "<br>"), "HTML", "insertfile", {});
        //
        // /** 발령사항 */
        // var html = userPrintHtml.html7(userMap8);
        // userPrintPop.global.hwpCtrl.MoveToField('HTML7', true, true, false);
        // userPrintPop.global.hwpCtrl.SetTextFile(html.replaceAll("\n", "<br>"), "HTML", "insertfile", {});
        //
        // /** 상벌사항 */
        // var html = userPrintHtml.html8(userMap9);
        // userPrintPop.global.hwpCtrl.MoveToField('HTML8', true, true, false);
        // userPrintPop.global.hwpCtrl.SetTextFile(html.replaceAll("\n", "<br>"), "HTML", "insertfile", {});
        //
        // /** 평생학습 */
        // var html = userPrintHtml.html9();
        // userPrintPop.global.hwpCtrl.MoveToField('HTML9', true, true, false);
        // userPrintPop.global.hwpCtrl.SetTextFile(html.replaceAll("\n", "<br>"), "HTML", "insertfile", {});
        //
        // /** 근무평가 */
        // var html = userPrintHtml.html10();
        // userPrintPop.global.hwpCtrl.MoveToField('HTML10', true, true, false);
        // userPrintPop.global.hwpCtrl.SetTextFile(html.replaceAll("\n", "<br>"), "HTML", "insertfile", {});
        //
        // /** 제안제도 */
        // var html = userPrintHtml.html11(userMap12);
        // userPrintPop.global.hwpCtrl.MoveToField('HTML11', true, true, false);
        // userPrintPop.global.hwpCtrl.SetTextFile(html.replaceAll("\n", "<br>"), "HTML", "insertfile", {});

    },

    saveHwp : function (){
        userPrintPop.global.hwpCtrl.SaveAs(userPrintPop.global.fileTitle, "hwp", "download:true");
    },

    print : function(){
        userPrintPop.global.hwpCtrl.PrintDocument();
    },

    resize : function(){
        if (document.getElementById("hwpctrl_frame") != null && typeof(document.getElementById("hwpctrl_frame")) != "undefined") {
            var pHeight = (window.innerHeight - 20) + "px";
            document.getElementById("hwpctrl_frame").style.width = "100%";
            document.getElementById("hwpctrl_frame").style.height = pHeight;
        }
    },

    loading : function(){
        $.LoadingOverlay("show", {
            background       : "rgba(0, 0, 0, 0.5)",
            image            : "",
            maxSize          : 60,
            fontawesome      : "fa fa-spinner fa-pulse fa-fw",
            fontawesomeColor : "#FFFFFF",
        });
    }
};