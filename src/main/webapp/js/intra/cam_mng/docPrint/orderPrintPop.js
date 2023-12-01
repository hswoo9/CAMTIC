const orderPrintPop = {
    global: {
        hwpCtrl : "",
        params : "",
    },

    init: function(){
        orderPrintPop.dataSet();
    },

    dataSet: function(){
        orderPrintPop.loading();
        orderPrintPop.global.params = params;
        orderPrintPop.global.hwpCtrl = BuildWebHwpCtrl("hwpApproveContent", orderPrintPop.global.params.hwpUrl, function () {orderPrintPop.editorComplete();});
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
        let filePath = "http://218.158.231.186/upload/templateForm/orderPrintTmp.hwp";
        orderPrintPop.global.hwpCtrl.Open(filePath, "HWP", "", function(){
            orderPrintPop.openCallBack();
            orderPrintPop.global.hwpCtrl.EditMode = 0;
            orderPrintPop.global.hwpCtrl.SetToolBar(1, "TOOLBAR_MENU");
            orderPrintPop.global.hwpCtrl.SetToolBar(1, "TOOLBAR_STANDARD");
            orderPrintPop.global.hwpCtrl.ShowRibbon(false);
            orderPrintPop.global.hwpCtrl.ShowCaret(false);
            orderPrintPop.global.hwpCtrl.ShowStatusBar(false);
            orderPrintPop.global.hwpCtrl.SetFieldViewOption(1);
        }, {"userData" : "success"});

        orderPrintPop.resize();
        $.LoadingOverlay("hide", {});
    },

    openCallBack: function(){
        const result = customKendo.fn_customAjax("/purc/getPurcClaimData", {
            claimSn: $("#claimSn").val()
        });
        const order = result.data;
        const crmResult = customKendo.fn_customAjax("/crm/getCrmData", {
            crmSn : result.CRM_SN
        });
        const crmMap = crmResult.rs;

        if(order == ""){
            alert("데이터 조회 중 오류가 발생하였습니다. 새로고침 후 진행바랍니다."); return;
        }

        /** 1. 발주 표 */
        orderPrintPop.global.hwpCtrl.PutFieldText("PJT_CD", "-");
        orderPrintPop.global.hwpCtrl.PutFieldText("ORDER_DT", order.ORDER_DT);
        orderPrintPop.global.hwpCtrl.PutFieldText("FAX",
            order.PH_NUM == "" ? order.FAX_NUM : order.PH_NUM+" / "+order.FAX_NUM
        );
        orderPrintPop.global.hwpCtrl.PutFieldText("GOODS_DT", order.GOODS_DT);

        /** 2. CRM 정보 */
        orderPrintPop.global.hwpCtrl.PutFieldText("CRM_NO", crmMap.CRM_NO);
        orderPrintPop.global.hwpCtrl.PutFieldText("CRM_CEO", crmMap.CRM_CEO);
        orderPrintPop.global.hwpCtrl.PutFieldText("ADDR", crmMap.ADDR);
        orderPrintPop.global.hwpCtrl.PutFieldText("CRM_EVENT", crmMap.CRM_EVENT);
        orderPrintPop.global.hwpCtrl.PutFieldText("CRM_PROD", crmMap.CRM_PROD);
        orderPrintPop.global.hwpCtrl.PutFieldText("CRM_MANAGER", crmMap.CRM_MEM_NM);
        orderPrintPop.global.hwpCtrl.PutFieldText("EMAIL", crmMap.CRM_NM);

        /*let supAmtSum = 0;
        /!** 3. 견적 리스트 *!/
        for(let i=0; i<estSubMap.length; i++){
            orderPrintPop.global.hwpCtrl.PutFieldText("PROD_NM"+i, String(estSubMap[i].PROD_NM));
            orderPrintPop.global.hwpCtrl.PutFieldText("UNIT_AMT"+i, fn_numberWithCommas(estSubMap[i].UNIT_AMT));
            orderPrintPop.global.hwpCtrl.PutFieldText("PROD_CNT"+i, String(estSubMap[i].PROD_CNT));
            orderPrintPop.global.hwpCtrl.PutFieldText("UNIT"+i, estSubMap[i].UNIT);
            orderPrintPop.global.hwpCtrl.PutFieldText("SUP_AMT"+i, fn_numberWithCommas(estSubMap[i].SUP_AMT));
            orderPrintPop.global.hwpCtrl.PutFieldText("ETC"+i, estSubMap[i].ETC);
            supAmtSum += estSubMap[i].SUP_AMT;
        }

        /!** 4. 견적 합계 *!/
        const supAmtSum2 = Math.floor(supAmtSum/10);
        const supAmtSum1 = supAmtSum - supAmtSum2;
        /!** 부가세 포함 500 0 500*!/
        console.log(estMap.VAT);
        if(estMap.VAT == "Y"){
            orderPrintPop.global.hwpCtrl.PutFieldText("SUP_AMT_SUM1", fn_numberWithCommas(supAmtSum));
            orderPrintPop.global.hwpCtrl.PutFieldText("SUP_AMT_SUM2", "0");
            orderPrintPop.global.hwpCtrl.PutFieldText("SUP_AMT_SUM", fn_numberWithCommas(supAmtSum));
        }else{
            orderPrintPop.global.hwpCtrl.PutFieldText("SUP_AMT_SUM1", fn_numberWithCommas(supAmtSum1));
            orderPrintPop.global.hwpCtrl.PutFieldText("SUP_AMT_SUM2", fn_numberWithCommas(supAmtSum2));
            orderPrintPop.global.hwpCtrl.PutFieldText("SUP_AMT_SUM", fn_numberWithCommas(supAmtSum));
        }
        orderPrintPop.global.hwpCtrl.PutFieldText("SUP_AMT_SUM_TEXT", "총 견적금액 : "+fn_numberWithCommas(supAmtSum)+" 원");

        /!** 5. 기타사항 *!/
        orderPrintPop.global.hwpCtrl.PutFieldText("EST_ISS", String(estMap.EST_ISS));*/
    },

    resize: function() {
        if (document.getElementById("hwpctrl_frame") != null && typeof(document.getElementById("hwpctrl_frame")) != "undefined") {
            var pHeight = (window.innerHeight - 20) + "px";
            document.getElementById("hwpctrl_frame").style.width = "100%";
            document.getElementById("hwpctrl_frame").style.height = pHeight;
        }
    },

    print: function() {
        orderPrintPop.global.hwpCtrl.PrintDocument();
    }
}