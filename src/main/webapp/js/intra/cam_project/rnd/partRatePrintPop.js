const partRatePrintPop = {
    global: {
        hwpCtrl : "",
        params : "",
        now : "",
        fileTitle : ""
    },

    init: function(){
        staticData = customKendo.fn_customAjax("/project/getProjectStep", params).rs;

        var result = customKendo.fn_customAjax("/project/getPartRateVerData", params);
        data = result.result.projectMemberInfo;

        partRatePrintPop.dataSet();
    },

    dataSet: function(){
        partRatePrintPop.loading();
        partRatePrintPop.global.params = params;
        partRatePrintPop.global.hwpCtrl = BuildWebHwpCtrl("hwpApproveContent", partRatePrintPop.global.params.hwpUrl, function () {partRatePrintPop.editorComplete();});
    },

    editorComplete: function(){
        let filePath = "http://218.158.231.184/upload/templateForm/partRateTmp.hwp";
        partRatePrintPop.global.hwpCtrl.Open(filePath, "HWP", "", function(){
            partRatePrintPop.openCallBack();
            partRatePrintPop.global.hwpCtrl.EditMode = 0;
            partRatePrintPop.global.hwpCtrl.SetToolBar(1, "TOOLBAR_MENU");
            partRatePrintPop.global.hwpCtrl.SetToolBar(1, "TOOLBAR_STANDARD");
            partRatePrintPop.global.hwpCtrl.ShowRibbon(false);
            partRatePrintPop.global.hwpCtrl.ShowCaret(false);
            partRatePrintPop.global.hwpCtrl.ShowStatusBar(false);
            partRatePrintPop.global.hwpCtrl.SetFieldViewOption(1);
        }, {"userData" : "success"});

        partRatePrintPop.resize();
        $.LoadingOverlay("hide", {});
    },

    openCallBack: function(){
        console.log("print data",data);
        console.log("static data",staticData);

        var mem = data;

        var bsTitle = staticData.BS_TITLE;
        var pjtNm = staticData.PJT_NM;
        var strDt = new Date(staticData.STR_DT);
        var endDt = new Date(staticData.END_DT);

        var sbjDate = strDt.getFullYear() + "-" + (strDt.getMonth() + 1) + "-" + strDt.getDate() + " ~ " +
            endDt.getFullYear() + "-" + (endDt.getMonth() + 1) + "-" + endDt.getDate();

        partRatePrintPop.global.hwpCtrl.PutFieldText("bsTitle", bsTitle);
        partRatePrintPop.global.hwpCtrl.PutFieldText("pjtNm", pjtNm);
        partRatePrintPop.global.hwpCtrl.PutFieldText("sbjDate", sbjDate);

        var memHtml = '';

        if(mem != null){
            memHtml += '<table style="font-family: 함초롱바탕; margin: 0 auto; max-width: none; border-collapse: separate; border-spacing: 0; empty-cells: show; border-width: 0; outline: 0; font-size: 5px; text-align: left; font-size:10px; line-height: 10px; width: 100%; ">';
            memHtml += '   <tr>';
            memHtml += '       <td style="border-width: 0 0 0 0; font-weight: normal; box-sizing: border-box;">';
            memHtml += '           <table border="1" style="border-collapse: collapse; margin-top: 0px;">';
            memHtml += '<tr>';
            memHtml += '<th rowspan="2" style="height:25px; text-align:center; width: 60px;"><span style="font-size: 10px;">구분</span></th>';
            memHtml += '<th rowspan="2" style="height:25px; text-align:center; width: 60px;"><span style="font-size: 10px;">참여인력</span></th>';
            memHtml += '<th rowspan="2" style="height:25px; text-align:center; width: 70px;"><span style="font-size: 10px;">기준급여</span></th>';
            memHtml += '<th rowspan="2" style="height:25px; text-align:center; width: 75px;"><span style="font-size: 10px;">인건비총액<br>(연간급여)</span></th>';
            memHtml += '<th rowspan="2" style="height:25px; text-align:center; width: 85px;"><span style="font-size: 10px;">참여시작</span></th>';
            memHtml += '<th rowspan="2" style="height:25px; text-align:center; width: 85px;"><span style="font-size: 10px;">참여종료</span></th>';
            memHtml += '<th rowspan="2" style="height:25px; text-align:center; width: 55px;"><span style="font-size: 10px;">참여<br>개월</span></th>';
            memHtml += '<th colspan="2" style="height:25px; text-align:center; width: 80px;"><span style="font-size: 10px;">현금</span></th>';
            memHtml += '<th colspan="2" style="height:25px; text-align:center; width: 80px;"><span style="font-size: 10px;">현물</span></th>';
            memHtml += '<th rowspan="2" style="height:25px; text-align:center; width: 55px;"><span style="font-size: 10px;">총참여율<br>(%)</span></th>';
            memHtml += '<th rowspan="2" style="height:25px; text-align:center; width: 70px;"><span style="font-size: 10px;">인건비총액<br>(원)</span></th>';
            memHtml += '<th rowspan="2" style="height:25px; text-align:center; width: 65px;"><span style="font-size: 10px;">월인건비<br>(원)</span></th>';
            memHtml += '</tr>';

            memHtml += '<tr>';
            memHtml += '<th style="height:25px; text-align:center; width: 65px;padding: 5px;"><span style="font-size: 10px;">참여율(%)</span></th>';
            memHtml += '<th style="height:25px; text-align:center; width: 65px;padding: 5px;"><span style="font-size: 10px;">인건비(원)</span></th>';
            memHtml += '<th style="height:25px; text-align:center; width: 65px;padding: 5px;"><span style="font-size: 10px;">참여율(%)</span></th>';
            memHtml += '<th style="height:25px; text-align:center; width: 65px; padding: 5px;"><span style="font-size: 10px;">인건비(원)</span></th>';
            memHtml += '</tr>';

            var allPayTotal = 0;
            var total = 0;
            var itemTotPay = 0;
            var monthTotPay = 0;
            for (var i = 0; i < mem.length; i++) {
                var e = mem[i];
                var cnt = Number(e.BASIC_SALARY) + Number(e.EXTRA_PAY) + Number(e.BONUS);

                /** 국민연금 */
                var nationalPension = cnt * (e.NATIONAL_PENSION / 100);
                if (nationalPension > Number(e.LIMIT_AMT)) {
                    nationalPension = Number(e.LIMIT_AMT);
                }
                /** 건강보험 */
                var healthInsurance = Math.floor(Math.floor(cnt * (e.HEALTH_INSURANCE / 100)) / 10) * 10
                /** 장기요양보험 */
                var longCareInsurance = Math.floor(Math.floor(healthInsurance * (e.LONG_CARE_INSURANCE / 100)) / 10) * 10
                /** 고용보험 */
                var employInsurance = Math.floor(Math.floor(cnt * (e.EMPLOY_INSURANCE / 100)) / 10) * 10;
                /** 산재보험 = (기본급 + 상여금) / 산재보험요율(%)*/
                var accidentInsurance = Math.floor(Math.floor(cnt * (e.ACCIDENT_INSURANCE / 100)) / 10) * 10;

                var sum = cnt + nationalPension + healthInsurance + longCareInsurance + employInsurance + accidentInsurance + (Math.floor((cnt / 12) / 10) * 10);

                var totAmt = (Math.floor(sum / 10) * 10).toString().toMoney();
                var bsSal = totAmt;
                if (mem[i].CHNG_SAL != undefined && mem[i].CHNG_SAL != null) {
                    bsSal = mem[i].CHNG_SAL;
                    totAmt = mem[i].CHNG_SAL;
                }
                var gubun = "";
                if (mem[i].GUBUN == undefined || mem[i].GUBUN == null || mem[i].GUBUN == "") {
                    gubun = "";
                } else {
                    gubun = mem[i].GUBUN;
                }

                memHtml += '<tr style="text-align: center" class="bodyTr">';
                memHtml += '   <td style="height: 30px; padding: 5px;"><span style="font-size: 10px;">' + gubun + '</span></td>';
                memHtml += '   <td style="font-size: 8px;"><span style="font-size: 10px;">' + mem[i].EMP_NAME + '</span></td>';
                memHtml += '   <td style="text-align: right;padding: 5px;"><span style="font-size: 10px;">' + comma(bsSal) + '</span></td>';
                memHtml += '   <td style="text-align: right;padding: 5px;"><span style="font-size: 10px;">' + comma(totAmt) + '</span></td>';
                memHtml += '   <td style="padding: 5px;"><span style="font-size: 10px;">' + mem[i].PJT_STR_DT + '</span></td>';
                memHtml += '   <td style="padding: 5px;"><span style="font-size: 10px;">' + mem[i].PJT_END_DT + '</span></td>';
                memHtml += '   <td style="padding: 5px;"><span style="font-size: 10px;">' + partRatePrintPop.fn_monDiff(mem[i].PJT_STR_DT, mem[i].PJT_END_DT) + '</span></td>';
                memHtml += '   <td style="text-align: right;padding: 5px;"><span style="font-size: 10px;">' + mem[i].PAY_RATE + '</span></td>';      // 참여율 현금(%)
                total += mem[i].TOT_PAY_BUDG;
                memHtml += '   <td style="text-align: right;padding: 5px;"><span style="font-size: 10px;">' + comma(mem[i].TOT_PAY_BUDG) + '</span></td>';      // 인건비 현금 총액
                memHtml += '   <td style="text-align: right;padding: 5px;"><span style="font-size: 10px;">' + mem[i].ITEM_RATE + '</span></td>';
                itemTotPay += mem[i].TOT_ITEM_BUDG;
                memHtml += '   <td style="text-align: right;padding: 5px;"><span style="font-size: 10px;">' + comma(mem[i].TOT_ITEM_BUDG) + '</span></td>';      // 인건비 현물 총액
                memHtml += '   <td style="text-align: right;padding: 5px;"><span style="font-size: 10px;">' + mem[i].TOT_RATE + '</span></td>';      // 총 참여율(%)
                allPayTotal += mem[i].PAY_TOTAL;
                memHtml += '   <td style="text-align: right;padding: 5px;"><span style="font-size: 10px;">' + comma(mem[i].PAY_TOTAL) + '</span></td>';
                monthTotPay += mem[i].MON_SAL;
                memHtml += '   <td style="text-align: right;padding: 5px;"><span style="font-size: 10px;">' + comma(mem[i].MON_SAL) + '</span></td>';      // 월 인건비
                memHtml += '</tr>';
            }

            memHtml += '<tr style="text-align: center">';
            memHtml += '    <td colspan="8" style="height: 30px;"><span style="font-size: 10px;">합계</td>';
            memHtml += '    <td style="text-align: right;padding: 5px;"><span style="font-size: 10px;">'+ comma(total) +'</span></td>';
            memHtml += '    <td></td>';
            memHtml += '    <td style="text-align: right;padding: 5px;"><span style="font-size: 10px;">'+ comma(itemTotPay) +'</span></td>';
            memHtml += '    <td></td>';
            memHtml += '    <td style="text-align: right;padding: 5px;"><span style="font-size: 10px;">'+ comma(allPayTotal) +'</span></td>';
            memHtml += '    <td style="text-align: right;padding: 5px;"><span style="font-size: 10px;">'+ comma(monthTotPay) +'</span></td>';
            memHtml += '</tr>';

            memHtml += '</table>';

            memHtml += '</td>';
            memHtml += '</tr>';
            memHtml += '</table>';

            memHtml.replaceAll("\n", "<br>");
            partRatePrintPop.global.hwpCtrl.PutFieldText("PARTRATE_HTML", " ");
            partRatePrintPop.global.hwpCtrl.MoveToField("PARTRATE_HTML", true, true, false);
            partRatePrintPop.global.hwpCtrl.SetTextFile(memHtml, "HTML","insertfile");
        }else{
            memHtml.replaceAll("\n", "<br>");
            partRatePrintPop.global.hwpCtrl.PutFieldText("PARTRATE_HTML", " ");
            partRatePrintPop.global.hwpCtrl.MoveToField("PARTRATE_HTML", true, true, false);
            partRatePrintPop.global.hwpCtrl.SetTextFile(memHtml, "HTML","insertfile");
        }

    },

    saveHwp : function (){
        partRatePrintPop.global.hwpCtrl.SaveAs(partRatePrintPop.global.fileTitle, "hwp", "download:true");
    },

    resize: function() {
        if (document.getElementById("hwpctrl_frame") != null && typeof(document.getElementById("hwpctrl_frame")) != "undefined") {
            var pHeight = (window.innerHeight - 20) + "px";
            document.getElementById("hwpctrl_frame").style.width = "100%";
            document.getElementById("hwpctrl_frame").style.height = pHeight;
        }
    },

    print: function() {
        partRatePrintPop.global.hwpCtrl.PrintDocument();
        opener.gridReload();
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
    fn_monDiff : function (_date1, _date2){
        var pSDate = _date1; // 참여 시작일
        var pEDate = _date2; // 참여 종료일

        var pSDateArray = pSDate.split("-");
        var pEDateArray = pEDate.split("-");

        var pSDateSet = new Date(pSDateArray[0], pSDateArray[1] - 1, pSDateArray[2]);
        var pEDateSet = new Date(pEDateArray[0], pEDateArray[1] - 1, pEDateArray[2]);

        var pSDateLastSet = new Date(pSDateArray[0], pSDateArray[1], 0).getDate();
        var pEDateLastSet = new Date(pEDateArray[0], pEDateArray[1], 0).getDate();

        var pSDateYear = pSDateSet.getFullYear();
        var pSDateMonth = pSDateSet.getMonth();
        var pSDateDay = pSDateSet.getDate();

        var pEDateYear = pEDateSet.getFullYear();
        var pEDateMonth = pEDateSet.getMonth();
        var pEDateDay = pEDateSet.getDate();

        var pMonthSet = ((pEDateYear - pSDateYear) * 12) + (pEDateMonth - pSDateMonth) - 1;

        var pSDateDaySet = pSDateLastSet - pSDateDay + 1;
        var pEDateDaySet = pEDateDay;

        var pSDateDayPerSet = pSDateDaySet / pSDateLastSet;
        var pEDateDayPerSet = pEDateDaySet / pEDateLastSet;

        var pDateMonth = pMonthSet + pSDateDayPerSet + pEDateDayPerSet;

        var finalReturn = partRatePrintPop.truncateStringToOneDecimal(pDateMonth.toString());

        if(finalReturn == 0){
            finalReturn = 0.1;
        }

        return finalReturn;
    },

    truncateStringToOneDecimal : function (str) {
        return (Math.floor(Number(str) * 10) / 10).toString();
    },
}