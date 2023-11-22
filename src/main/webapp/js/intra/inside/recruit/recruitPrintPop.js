const recruitPrintPop = {
    global: {
        hwpCtrl : "",
        params : "",
    },

    init: function(){
        recruitPrintPop.dataSet();
    },

    dataSet: function(){
        recruitPrintPop.loading();
        recruitPrintPop.global.params = params;
        recruitPrintPop.global.hwpCtrl = BuildWebHwpCtrl("hwpApproveContent",recruitPrintPop.global.params.hwpUrl, function () {recruitPrintPop.editorComplete();});
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
        let filePath = "http://218.158.231.186/upload/templateForm/recruitPrintPop.hwp";
        recruitPrintPop.global.hwpCtrl.Open(filePath, "HWP", "", function(){
            recruitPrintPop.openCallBack();
            recruitPrintPop.global.hwpCtrl.EditMode = 0;
            recruitPrintPop.global.hwpCtrl.SetToolBar(1, "TOOLBAR_MENU");
            recruitPrintPop.global.hwpCtrl.SetToolBar(1, "TOOLBAR_STANDARD");
            recruitPrintPop.global.hwpCtrl.ShowRibbon(false);
            recruitPrintPop.global.hwpCtrl.ShowCaret(false);
            recruitPrintPop.global.hwpCtrl.ShowStatusBar(false);
            recruitPrintPop.global.hwpCtrl.SetFieldViewOption(1);
        }, {"userData" : "success"});

        recruitPrintPop.resize();
        $.LoadingOverlay("hide", {});
    },

    openCallBack: function(){
        let recruitInfoSn = $("#recruitInfoSn").val();
        let recruitAreaInfoSn = $("#recruitAreaInfoSn").val();
        console.log("Before recruitAreaInfoSn log");
        console.log("recruitInfoSn : ",recruitInfoSn);
        console.log("recruitAreaInfoSn : ",recruitAreaInfoSn);
        console.log("Is recruitAreaInfoSn an empty string?", recruitAreaInfoSn === "");
        console.log("Is recruitAreaInfoSn undefined?", recruitAreaInfoSn === undefined);

        const data = {
            recruitInfoSn: recruitInfoSn,
            recruitAreaInfoSn: recruitAreaInfoSn
        };
        const data1 = {
            recruitInfoSn: recruitInfoSn,
        };
        const rsTitle = customKendo.fn_customAjax("/inside/getRecruitPrintTitle", data1);
        const rs = customKendo.fn_customAjax("/inside/getRecruitPrint", data);

        console.log("rsTitle",rsTitle);

        console.log("rs");
        console.log(rs);
        console.log("rs object:", rs);


        const recruitArray = rs.list;

        let areaInfoValue, deadLineValue, startDayValue, empNameValue;
        let recruitPrintTitle = rsTitle.recruitPrintTitle;
        console.log(recruitPrintTitle);

        if (!recruitAreaInfoSn || recruitAreaInfoSn === "") {
            /*
            areaInfoValue = "기본값";
            deadLineValue = "기본값";
            startDayValue = "기본값";
            empNameValue = "기본값";
             */
            areaInfoValue = recruitPrintTitle.RECRUIT_TITLE || "기본값";
            deadLineValue = recruitPrintTitle.END_DT || "기본값";
            startDayValue = recruitPrintTitle.START_DT || "기본값";
            empNameValue = recruitPrintTitle.REG_EMP_NAME || "기본값";
        } else {
            const recruitArray1 = rs.list;

            areaInfoValue = recruitArray1[0].AREA_TITLE;
            deadLineValue = recruitArray1[0].END_DT;
            startDayValue = recruitArray1[0].START_DT;
            empNameValue = recruitArray1[0].REG_EMP_NAME;
        };


        /** 채용부문 */
        recruitPrintPop.global.hwpCtrl.PutFieldText("AREA_INFO", areaInfoValue);

        /** 마감일 */
        recruitPrintPop.global.hwpCtrl.PutFieldText("DEADLINE_DT", deadLineValue);

        /** 작성일 */
        recruitPrintPop.global.hwpCtrl.PutFieldText("REG_DT", startDayValue);

        /** 작성자 */
        recruitPrintPop.global.hwpCtrl.PutFieldText("EMP_NAME_SIGN", empNameValue);


        /** 지원자 리스트 */
        let html = "";
        html += '<table style="font-family:바탕체;margin: 0 auto; max-width: none; border-collapse: separate; border-spacing: 0; empty-cells: show; border-width: 0; outline: 0; text-align: left; font-size:12px; line-height: 20px; width: 100%; ">';
        html += '   <tr>';
        html += '       <td style="border-width: 0 0 0 0; font-weight: normal; box-sizing: border-box;">';
        html += '           <table border="5.5" style="border-collapse: collapse; margin: 0px;">';
        html += '               <tr>';
        html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center; width: 55px;"><p style="font-size:12px;"><b>번호</b></p></td>';
        html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center; width: 95px;"><p style="font-size:12px;"><b>성명</b></p></td>';
        html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center; width: 75px;"><p style="font-size:12px;"><b>연령</b></p></td>';
        html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center; width: 75px;"><p style="font-size:12px;"><b>성별</b></p></td>';
        html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center; width: 150px;"><p style="font-size:12px;"><b>학력</b></p></td>';
        html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center; width: 75px;"><p style="font-size:12px;"><b>경력</b></p></td>';
        html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center; width: 195px;"><p style="font-size:12px;"><b>직무관련\n자격/면혀증</b></p></td>';
        html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center; width: 195px;"><p style="font-size:12px;"><b>외국어\n점수</b></p></td>';
        html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center; width: 95px;"><p style="font-size:12px;"><b>비고</b></p></td>';
        html += '               </tr>';
        for(let i=0;  i < recruitArray.length; i++){
            const map =recruitArray[i];
            console.log("map", map);
            html += '               <tr>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">'+ (map.APPLICATION_ID || '') +'</p></td>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">'+ (map.USER_NAME || '') +'</p></td>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">'+(map.AGE || '')+'</p></td>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">'+(map.GENDER || '')+'</p></td>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">'+(map.SCHOOL_NAME || '')+'</p></td>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">'+(map.WORK_DATE || '')+'</p></td>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">'+(map.CERT_AREA|| '')+'</p></td>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">'+(map.LANG_NAME || '')+'</p></td>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;"></p></td>';
            html += '               </tr>';
        }
        html += '           </table>';
        html += '       </td>';
        html += '   </tr>';
        html += '</table>';
        recruitPrintPop.global.hwpCtrl.MoveToField('RECRUIT_HTML', true, true, false);
        recruitPrintPop.global.hwpCtrl.SetTextFile(html.replaceAll("\n", "<br>"), "HTML", "insertfile", {});
    },

    resize: function() {
        if (document.getElementById("hwpctrl_frame") != null && typeof(document.getElementById("hwpctrl_frame")) != "undefined") {
            var pHeight = (window.innerHeight - 20) + "px";
            document.getElementById("hwpctrl_frame").style.width = "100%";
            document.getElementById("hwpctrl_frame").style.height = pHeight;
        }
    },

    print: function() {
        recruitPrintPop.global.hwpCtrl.PrintDocument();
    }
}