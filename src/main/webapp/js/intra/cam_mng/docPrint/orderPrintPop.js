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
            crmSn : order.CRM_SN
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
        orderPrintPop.global.hwpCtrl.PutFieldText("CRM_NM", crmMap.CRM_NM);
        orderPrintPop.global.hwpCtrl.PutFieldText("CRM_NO", crmMap.CRM_NO);
        orderPrintPop.global.hwpCtrl.PutFieldText("CRM_CEO", crmMap.CRM_CEO);
        orderPrintPop.global.hwpCtrl.PutFieldText("ADDR", crmMap.ADDR);
        orderPrintPop.global.hwpCtrl.PutFieldText("CRM_EVENT", crmMap.CRM_EVENT);
        orderPrintPop.global.hwpCtrl.PutFieldText("CRM_PROD", crmMap.CRM_PROD);
        orderPrintPop.global.hwpCtrl.PutFieldText("CRM_MANAGER", crmMap.CRM_MEM_NM);
        orderPrintPop.global.hwpCtrl.PutFieldText("EMAIL", crmMap.CRM_NM);

        let supAmtSum = 0;
        console.log(order);
        /** 3. 견적 리스트 */
        const list = order.itemList;
        for(let i=0; i<list.length; i++){
            orderPrintPop.global.hwpCtrl.PutFieldText("PROD_NM"+i, String(list[i].ITEM_NM));
            orderPrintPop.global.hwpCtrl.PutFieldText("PROD_STD"+i, String(list[i].ITEM_STD));
            orderPrintPop.global.hwpCtrl.PutFieldText("UNIT_AMT"+i, String(fn_numberWithCommas(list[i].ITEM_UNIT_AMT)));
            orderPrintPop.global.hwpCtrl.PutFieldText("PROD_EA"+i, String(list[i].ITEM_EA));
            orderPrintPop.global.hwpCtrl.PutFieldText("UNIT"+i, String(list[i].ITEM_UNIT));
            orderPrintPop.global.hwpCtrl.PutFieldText("SUP_AMT"+i, String(fn_numberWithCommas(list[i].PURC_ITEM_AMT)));
            orderPrintPop.global.hwpCtrl.PutFieldText("ETC"+i, list[i].ITEM_ETC);
            supAmtSum += list[i].PURC_ITEM_AMT;
        }

        /** 4. 견적 합계 */
        const supAmtSum2 = Math.floor(supAmtSum/10);
        const supAmtSum1 = supAmtSum - supAmtSum2;

        if(order.VAT == "Y"){
            orderPrintPop.global.hwpCtrl.PutFieldText("SUP_AMT_SUM1", "\\ "+fn_numberWithCommas(supAmtSum));
            orderPrintPop.global.hwpCtrl.PutFieldText("SUP_AMT_SUM2", "\\ "+"0");
            orderPrintPop.global.hwpCtrl.PutFieldText("SUP_AMT_SUM", "\\ "+fn_numberWithCommas(supAmtSum));
        }else{
            orderPrintPop.global.hwpCtrl.PutFieldText("SUP_AMT_SUM1", "\\ "+fn_numberWithCommas(supAmtSum1));
            orderPrintPop.global.hwpCtrl.PutFieldText("SUP_AMT_SUM2", "\\ "+fn_numberWithCommas(supAmtSum2));
            orderPrintPop.global.hwpCtrl.PutFieldText("SUP_AMT_SUM", "\\ "+fn_numberWithCommas(supAmtSum));
        }
        orderPrintPop.global.hwpCtrl.PutFieldText("ISS", String(order.SIGNIFICANT));
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