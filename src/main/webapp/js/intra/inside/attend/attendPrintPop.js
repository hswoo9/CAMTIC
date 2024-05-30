const attendPrintPop = {
    global: {
        hwpCtrl : "",
        params : "",
        now : "",
        fileTitle : ""
    },

    init: function(){
        attendPrintPop.dataSet();
    },

    dataSet: function(){
        attendPrintPop.loading();
        attendPrintPop.global.params = params;
        attendPrintPop.global.hwpCtrl = BuildWebHwpCtrl("hwpApproveContent", attendPrintPop.global.params.hwpUrl, function () {attendPrintPop.editorComplete();});
    },

    loading: function(){
        $.LoadingOverlay("show", {
            background       : "rgba(0, 0, 0, 0.5)",
            image            : "",
            maxSize          : 60,
            fontawesome      : "fa fa-spinner fa-pulse fa-fw",
            fontawesomeColor : "#FFFFFF",
        });
    },

    editorComplete: function(){
        let filePath = "http://218.158.231.184/upload/templateForm/attendPrintTmp.hwp";
        attendPrintPop.global.hwpCtrl.Open(filePath, "HWP", "", function(){
            attendPrintPop.openCallBack();
            attendPrintPop.global.hwpCtrl.EditMode = 0;
            attendPrintPop.global.hwpCtrl.SetToolBar(1, "TOOLBAR_MENU");
            attendPrintPop.global.hwpCtrl.SetToolBar(1, "TOOLBAR_STANDARD");
            attendPrintPop.global.hwpCtrl.ShowRibbon(false);
            attendPrintPop.global.hwpCtrl.ShowCaret(false);
            attendPrintPop.global.hwpCtrl.ShowStatusBar(false);
            attendPrintPop.global.hwpCtrl.SetFieldViewOption(1);
        }, {"userData" : "success"});

        attendPrintPop.resize();
        $.LoadingOverlay("hide", {});
    },

    openCallBack: function(){
        const applyMonth = $("#applyMonth").val();

        const params = { applyMonth: applyMonth };
        const allCountMonthly = customKendo.fn_customAjax("/inside/getAttendAllCountMonthly", params).data;
        const deptCountMonthly = customKendo.fn_customAjax("/inside/getAttendDeptCountMonthly", params).list;
        const personalCountMonthly = customKendo.fn_customAjax("/inside/getAttendPersonalCountMonthly", params).list;

        attendPrintPop.global.hwpCtrl.PutFieldText("DOC_TITLE", applyMonth.split("-")[0]+"년 "+applyMonth.split("-")[1]+"월 직원 근태현황");


        setTimeout(function() {
            let htmlDataA = '';
            htmlDataA = attendPrintPop.htmlA(allCountMonthly);
            attendPrintPop.global.hwpCtrl.MoveToField("allTable", true, true, false);
            attendPrintPop.global.hwpCtrl.SetTextFile(htmlDataA, "html","insertfile");
        }, 100);

        setTimeout(function() {
            let htmlDataB = '';
            htmlDataB = attendPrintPop.htmlB(deptCountMonthly);
            attendPrintPop.global.hwpCtrl.MoveToField("deptTable", true, true, false);
            attendPrintPop.global.hwpCtrl.SetTextFile(htmlDataB, "html","insertfile");
        }, 1100);

        setTimeout(function() {
            let htmlDataC = '';
            htmlDataC = attendPrintPop.htmlC(personalCountMonthly);
            attendPrintPop.global.hwpCtrl.MoveToField("personTable", true, true, false);
            attendPrintPop.global.hwpCtrl.SetTextFile(htmlDataC, "html","insertfile");
        }, 2100);
    },

    htmlA : function(map) {
        let html = '';
        html += '<table style="font-family:굴림;margin: 0 auto; max-width: none; border-collapse: separate; border-spacing: 0; empty-cells: show; border-width: 0; outline: 0; text-align: left; font-size:12px; line-height: 10px; width: 100%; ">';
        html += '   <tr>';
        html += '       <td style="border-width: 0 0 0 0; font-weight: normal; box-sizing: border-box;">';
        html += '           <table border="1" style="border-collapse: collapse; margin-top: 0px;">';
        html += '               <tr>';
        html += '                   <td rowspan="2" style="height:20px;background-color:#FFE0E0; text-align:center; width: 75px;"><p style="font-size:12px;"><b>인 원</b></p></td>';
        html += '                   <td rowspan="2" style="height:20px;background-color:#FFE0E0; text-align:center; width: 80px;"><p style="font-size:12px;"><b>평균<br>근무시간</b></p></td>';
        html += '                   <td colspan="2" style="height:20px;background-color:#FFE0E0; text-align:center;"><p style="font-size:12px;"><b>휴가</b></p></td>';
        html += '                   <td colspan="2" style="height:20px;background-color:#FFE0E0; text-align:center;"><p style="font-size:12px;"><b>지참</b></p></td>';
        html += '                   <td colspan="2" style="height:20px;background-color:#FFE0E0; text-align:center;"><p style="font-size:12px;"><b>조퇴</b></p></td>';
        html += '                   <td colspan="2" style="height:20px;background-color:#FFE0E0; text-align:center;"><p style="font-size:12px;"><b>지각</b></p></td>';
        html += '               </tr>';
        html += '               <tr>';
        html += '                   <td style="height:20px;background-color:#FFE0E0; text-align:center; width: 65px;"><p style="font-size:12px;"><b>명</b></p></td>';
        html += '                   <td style="height:20px;background-color:#FFE0E0; text-align:center; width: 65px;"><p style="font-size:12px;"><b>건</b></p></td>';
        html += '                   <td style="height:20px;background-color:#FFE0E0; text-align:center; width: 65px;"><p style="font-size:12px;"><b>명</b></p></td>';
        html += '                   <td style="height:20px;background-color:#FFE0E0; text-align:center; width: 65px;"><p style="font-size:12px;"><b>건</b></p></td>';
        html += '                   <td style="height:20px;background-color:#FFE0E0; text-align:center; width: 65px;"><p style="font-size:12px;"><b>명</b></p></td>';
        html += '                   <td style="height:20px;background-color:#FFE0E0; text-align:center; width: 65px;"><p style="font-size:12px;"><b>건</b></p></td>';
        html += '                   <td style="height:20px;background-color:#FFE0E0; text-align:center; width: 65px;"><p style="font-size:12px;"><b>명</b></p></td>';
        html += '                   <td style="height:20px;background-color:#FFE0E0; text-align:center; width: 65px;"><p style="font-size:12px;"><b>건</b></p></td>';
        html += '               </tr>';

        html += '               <tr>';
        html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center;"><p style="font-size:10px;"><b>'+map.HUMAN_COUNT+'</b></p></td>';
        html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center;"><p style="font-size:10px;"><b>'+map.AVG_OFFICE_HOUR+'</b></p></td>';
        html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center;"><p style="font-size:10px;"><b>'+map.HOLIDAY_HUMAN_COUNT+'</b></p></td>';
        html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center;"><p style="font-size:10px;"><b>'+map.HOLIDAY_COUNT+'</b></p></td>';
        html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center;"><p style="font-size:10px;"><b>0</b></p></td>';
        html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center;"><p style="font-size:10px;"><b>0</b></p></td>';
        html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center;"><p style="font-size:10px;"><b>0</b></p></td>';
        html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center;"><p style="font-size:10px;"><b>0</b></p></td>';
        html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center;"><p style="font-size:10px;"><b>'+map.LATE_COUNT+'</b></p></td>';
        html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center;"><p style="font-size:10px;"><b>'+map.LATE+'</b></p></td>';
        html += '               </tr>';

        html += '   </tr>';

        html += '           </table>';
        html += '       </td>';
        html += '   </tr>';
        html += '</table>';
        return html.replaceAll("\n", "<br>");
    },

    htmlB : function(list) {
        let html = '';
        html += '<table style="font-family:굴림;margin: 0 auto; max-width: none; border-collapse: separate; border-spacing: 0; empty-cells: show; border-width: 0; outline: 0; text-align: left; font-size:12px; line-height: 10px; width: 100%; ">';
        html += '   <tr>';
        html += '       <td style="border-width: 0 0 0 0; font-weight: normal; box-sizing: border-box;">';
        html += '           <table border="1" style="border-collapse: collapse; margin-top: 0px;">';
        html += '               <tr>';
        html += '                   <td rowspan="2" style="height:20px;background-color:#FFE0E0; text-align:center; width: 130px;"><p style="font-size:12px;"><b>팀명</b></p></td>';
        html += '                   <td rowspan="2" style="height:20px;background-color:#FFE0E0; text-align:center; width: 35px;"><p style="font-size:12px;"><b>인원</b></p></td>';
        html += '                   <td rowspan="2" style="height:20px;background-color:#FFE0E0; text-align:center; width: 70px;"><p style="font-size:12px;"><b>평균<br>근무시간</b></p></td>';
        html += '                   <td colspan="2" style="height:20px;background-color:#FFE0E0; text-align:center;"><p style="font-size:12px;"><b>휴가</b></p></td>';
        html += '                   <td colspan="2" style="height:20px;background-color:#FFE0E0; text-align:center;"><p style="font-size:12px;"><b>지참</b></p></td>';
        html += '                   <td colspan="2" style="height:20px;background-color:#FFE0E0; text-align:center;"><p style="font-size:12px;"><b>조퇴</b></p></td>';
        html += '                   <td colspan="2" style="height:20px;background-color:#FFE0E0; text-align:center;"><p style="font-size:12px;"><b>지각</b></p></td>';
        html += '               </tr>';
        html += '               <tr>';
        html += '                   <td style="height:20px;background-color:#FFE0E0; text-align:center; width: 55px;"><p style="font-size:12px;"><b>명</b></p></td>';
        html += '                   <td style="height:20px;background-color:#FFE0E0; text-align:center; width: 55px;"><p style="font-size:12px;"><b>건</b></p></td>';
        html += '                   <td style="height:20px;background-color:#FFE0E0; text-align:center; width: 55px;"><p style="font-size:12px;"><b>명</b></p></td>';
        html += '                   <td style="height:20px;background-color:#FFE0E0; text-align:center; width: 55px;"><p style="font-size:12px;"><b>건</b></p></td>';
        html += '                   <td style="height:20px;background-color:#FFE0E0; text-align:center; width: 55px;"><p style="font-size:12px;"><b>명</b></p></td>';
        html += '                   <td style="height:20px;background-color:#FFE0E0; text-align:center; width: 55px;"><p style="font-size:12px;"><b>건</b></p></td>';
        html += '                   <td style="height:20px;background-color:#FFE0E0; text-align:center; width: 55px;"><p style="font-size:12px;"><b>명</b></p></td>';
        html += '                   <td style="height:20px;background-color:#FFE0E0; text-align:center; width: 55px;"><p style="font-size:12px;"><b>건</b></p></td>';
        html += '               </tr>';

        for(let i=0; i<list.length; i++){
            const map = list[i];
            html += '               <tr>';
            html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center;"><p style="font-size:10px;"><b>'+map.DEPT_NAME+'</b></p></td>';
            html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center;"><p style="font-size:10px;"><b>'+map.HUMAN_COUNT+'</b></p></td>';
            html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center;"><p style="font-size:10px;"><b>'+map.AVG_OFFICE_HOUR+'</b></p></td>';
            html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center;"><p style="font-size:10px;"><b>'+map.HOLIDAY_HUMAN_COUNT+'</b></p></td>';
            html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center;"><p style="font-size:10px;"><b>'+map.HOLIDAY_COUNT+'</b></p></td>';
            html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center;"><p style="font-size:10px;"><b>0</b></p></td>';
            html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center;"><p style="font-size:10px;"><b>0</b></p></td>';
            html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center;"><p style="font-size:10px;"><b>0</b></p></td>';
            html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center;"><p style="font-size:10px;"><b>0</b></p></td>';
            html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center;"><p style="font-size:10px;"><b>'+map.LATE_COUNT+'</b></p></td>';
            html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center;"><p style="font-size:10px;"><b>'+map.LATE+'</b></p></td>';
            html += '               </tr>';
        }

        html += '   </tr>';

        html += '           </table>';
        html += '       </td>';
        html += '   </tr>';
        html += '</table>';
        return html.replaceAll("\n", "<br>");
    },

    htmlC : function(list) {
        let html = '';
        html += '<table style="font-family:굴림;margin: 0 auto; max-width: none; border-collapse: separate; border-spacing: 0; empty-cells: show; border-width: 0; outline: 0; text-align: left; font-size:12px; line-height: 10px; width: 100%; ">';
        html += '   <tr>';
        html += '       <td style="border-width: 0 0 0 0; font-weight: normal; box-sizing: border-box;">';
        html += '           <table border="1" style="border-collapse: collapse; margin-top: 0px;">';
        html += '               <tr>';
        html += '                   <td style="height:20px;background-color:#FFE0E0; text-align:center; width: 130px;"><p style="font-size:12px;"><b>부서명</b></p></td>';
        html += '                   <td style="height:20px;background-color:#FFE0E0; text-align:center; width: 130px;"><p style="font-size:12px;"><b>팀명</b></p></td>';
        html += '                   <td style="height:20px;background-color:#FFE0E0; text-align:center; width: 75px;"><p style="font-size:12px;"><b>인 원</b></p></td>';
        html += '                   <td style="height:20px;background-color:#FFE0E0; text-align:center; width: 80px;"><p style="font-size:12px;"><b>평균<br>근무시간</b></p></td>';
        html += '                   <td style="height:20px;background-color:#FFE0E0; text-align:center; width: 65px;"><p style="font-size:12px;"><b>휴가</b></p></td>';
        html += '                   <td style="height:20px;background-color:#FFE0E0; text-align:center; width: 65px;"><p style="font-size:12px;"><b>지참</b></p></td>';
        html += '                   <td style="height:20px;background-color:#FFE0E0; text-align:center; width: 65px;"><p style="font-size:12px;"><b>조퇴</b></p></td>';
        html += '                   <td style="height:20px;background-color:#FFE0E0; text-align:center; width: 65px;"><p style="font-size:12px;"><b>지각</b></p></td>';
        html += '               </tr>';

        for(let i=0; i<list.length; i++){
            const map = list[i];
            html += '               <tr>';
            html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center;"><p style="font-size:10px;"><b>'+map.deptNm+'</b></p></td>';
            html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center;"><p style="font-size:10px;"><b>'+map.teamNm+'</b></p></td>';
            html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center;"><p style="font-size:10px;"><b>'+map.EMP_NAME+'</b></p></td>';
            html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center;"><p style="font-size:10px;"><b>'+map.AVG_OFFICE_HOUR+'</b></p></td>';
            html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center;"><p style="font-size:10px;"><b>'+map.HOLIDAY_COUNT+'</b></p></td>';
            html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center;"><p style="font-size:10px;"><b>0</b></p></td>';
            html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center;"><p style="font-size:10px;"><b>0</b></p></td>';
            html += '                   <td style="height:20px;background-color:#FFFFFF; text-align:center;"><p style="font-size:10px;"><b>'+map.LATE+'</b></p></td>';
            html += '               </tr>';
        }

        html += '   </tr>';

        html += '           </table>';
        html += '       </td>';
        html += '   </tr>';
        html += '</table>';
        return html.replaceAll("\n", "<br>");
    },

    saveHwp : function (){
        attendPrintPop.global.hwpCtrl.SaveAs(attendPrintPop.global.fileTitle, "hwp", "download:true");
    },

    resize: function() {
        if (document.getElementById("hwpctrl_frame") != null && typeof(document.getElementById("hwpctrl_frame")) != "undefined") {
            var pHeight = (window.innerHeight - 20) + "px";
            document.getElementById("hwpctrl_frame").style.width = "100%";
            document.getElementById("hwpctrl_frame").style.height = pHeight;
        }
    },

    print: function() {
        attendPrintPop.global.hwpCtrl.PrintDocument();
    }
}