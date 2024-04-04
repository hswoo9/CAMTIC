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

        var empList;
        var htmlData;

        htmlData += '<div>테스트입니다.</div>';
        if(mem != null && mem == null){
            var memHtml = '';

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

                empList += mem[i].EMP_SEQ + ",";
                memHtml += '<tr style="text-align: center" class="bodyTr">';
                memHtml += '   <td style="font-size: 18px;">' + gubun + '</td>';
                memHtml += '   <td style="font-size: 18px;">' + mem[i].EMP_NAME + '</td>';
                memHtml += '   <td style="text-align: right;font-size: 18px;">' + comma(bsSal) + '</td>';
                memHtml += '   <td style="text-align: right;font-size: 18px;">' + comma(totAmt) + '</td>';
                memHtml += '   <td style="font-size: 18px;">' + mem[i].PJT_STR_DT + '</td>';
                memHtml += '   <td style="font-size: 18px;">' + mem[i].PJT_END_DT + '</td>';
                memHtml += '   <td style="font-size: 18px;">' + rndPR.fn_monDiff(mem[i].PJT_STR_DT, mem[i].PJT_END_DT) + '</td>';
                memHtml += '   <td style="text-align: right;font-size: 18px;">' + mem[i].PAY_RATE + '</td>';      // 참여율 현금(%)
                memHtml += '   <td style="text-align: right;font-size: 18px;">' + comma(mem[i].TOT_PAY_BUDG) + '</td>';      // 인건비 현금 총액
                memHtml += '   <td style="text-align: right;font-size: 18px;">' + mem[i].ITEM_RATE + '</td>';
                memHtml += '   <td style="text-align: right;font-size: 18px;">' + comma(mem[i].TOT_ITEM_BUDG) + '</td>';      // 인건비 현물 총액
                memHtml += '   <td style="text-align: right;font-size: 18px;">' + mem[i].TOT_RATE + '</td>';      // 총 참여율(%)
                memHtml += '   <td style="text-align: right;font-size: 18px;">' + comma(mem[i].PAY_TOTAL) + '</td>';
                memHtml += '   <td style="text-align: right;font-size: 18px;">' + comma(mem[i].MON_SAL) + '</td>';      // 월 인건비
                memHtml += '</tr>';
            }


            var allPayTotal = $("input[name='payTotal']").get().reduce(function (acc, element) {
                return acc + Number(uncomma(element.value));
            }, 0);
            var total = $("input[name='totPayBudget']").get().reduce(function (acc, element) {
                return acc + Number(uncomma(element.value)); // 현금-인건비(원)
            }, 0);
            var itemTotPay = $("input[name='totItemBudget']").get().reduce(function (acc, element) {
                return acc + Number(uncomma(element.value)); // 현물-인건비(원)
            }, 0);
            var monthTotPay = $("input[name='monSal']").get().reduce(function (acc, element) {
                return acc + Number(uncomma(element.value)); // 월인건비(원)
            }, 0);
        }else{
            htmlData.replaceAll("\n", "<br>");
            partRatePrintPop.global.hwpCtrl.PutFieldText("PARTRATE_HTML", " ");
            partRatePrintPop.global.hwpCtrl.MoveToField("PARTRATE_HTML", true, true, false);
            partRatePrintPop.global.hwpCtrl.SetTextFile(htmlData, "HTML","insertfile");
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
    }
}