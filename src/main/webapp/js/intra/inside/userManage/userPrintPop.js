const userPrintPop = {
    global: {
        hwpCtrl : "",
        now : "",
    },

    fn_defaultScript : function(){
        userPrintPop.pageSet();
    },

    pageSet : function(){
        userPrintPop.loading();
        userPrintPop.global.hwpCtrl = BuildWebHwpCtrl("hwpApproveContent", $("#hwpUrl").val(), function () {userPrintPop.editorComplete();});
    },

    editorComplete : function(){
        let filePath = "http://218.158.231.186/upload/templateForm/userPrintTmp.hwp";
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
        const result = customKendo.fn_customAjax("/user/getUserPersonnelOne", {pk: $("#empSeq").val()});
        const userMap = result.data;
        let list = [];
        console.log(userMap);

        if(userMap == null){ alert("데이터 조회 중 오류가 발생하였습니다. 새로고침 후 진행바랍니다."); return; }

        /** 인사정보 */
        userPrintPop.global.hwpCtrl.PutFieldText("EMP_NAME", userMap.EMP_NAME_KR);

        /** 학력사항 ~ 제안제도 */
        var html = userPrintHtml.html1(list);
        userPrintPop.global.hwpCtrl.MoveToField('HTML1', true, true, false);
        userPrintPop.global.hwpCtrl.SetTextFile(html.replaceAll("\n", "<br>"), "HTML", "insertfile", {});

        var html = userPrintHtml.html2();
        userPrintPop.global.hwpCtrl.SetTextFile(html.replaceAll("\n", "<br>"), "HTML", "insertfile", {});

        var html = userPrintHtml.html3();
        userPrintPop.global.hwpCtrl.SetTextFile(html.replaceAll("\n", "<br>"), "HTML", "insertfile", {});
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
    },
}