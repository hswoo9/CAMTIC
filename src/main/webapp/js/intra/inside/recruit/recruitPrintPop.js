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

        const data = { recruitInfoSn : recruitInfoSn };
        const rs = customKendo.fn_customAjax("/inside/getRecruitList", data);

        console.log("rs");
        console.log(rs);

        //const map = rs.hashMap;
        //const res = rs.result;
        //const recruitList = res.recruitList;
        let recruitMap = "";

        /**
        for(let i=0; i< recruitList.length; i++){
            if( recruitList[i].RECRUIT_INFO_SN == recruitInfoSn){
                recruitMap = recruitList[i];
            }
        }*/

        //console.log("recruitMap");
        //console.log(recruitMap);

        //if(recruitMap == ""){
        //    alert("데이터 조회 중 오류가 발생하였습니다. 새로고침 후 진행바랍니다."); return;
        //}

        /** 채용부문 */
        recruitPrintPop.global.hwpCtrl.PutFieldText("AREA_INFO", "1");

        /** 마감일 */
        recruitPrintPop.global.hwpCtrl.PutFieldText("DEADLINE_DT", "2");

        /** 작성일 */
        recruitPrintPop.global.hwpCtrl.PutFieldText("REG_DT", "3");

        /** 작성자 */
        recruitPrintPop.global.hwpCtrl.PutFieldText("EMP_NAME_SIGN", "4");

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
        html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center; width: 75px;"><p style="font-size:12px;"><b>성병</b></p></td>';
        html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center; width: 150px;"><p style="font-size:12px;"><b>학력</b></p></td>';
        html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center; width: 75px;"><p style="font-size:12px;"><b>경력</b></p></td>';
        html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center; width: 195px;"><p style="font-size:12px;"><b>직무관련\n자격/면혀증</b></p></td>';
        html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center; width: 195px;"><p style="font-size:12px;"><b>외국어\n점수</b></p></td>';
        html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center; width: 95px;"><p style="font-size:12px;"><b>비고</b></p></td>';
        html += '               </tr>';
        for(let i=0; i<2; i++){
            html += '               <tr>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">1</p></td>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">2</p></td>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">3</p></td>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">4</p></td>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">5</p></td>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">6</p></td>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">7</p></td>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">8</p></td>';
            html += '                   <td style="height:40px;background-color:#FFFFFF; text-align:center;"><p style="font-size:12px;">9</p></td>';
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