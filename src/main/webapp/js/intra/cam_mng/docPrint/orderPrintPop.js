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
        const empInfo = customKendo.fn_customAjax("/user/getUserInfo", {empSeq: $("#regEmpSeq").val()});

        if(order == ""){
            alert("데이터 조회 중 오류가 발생하였습니다. 새로고침 후 진행바랍니다."); return;
        }

        /** 1. 발주 표 */
        orderPrintPop.global.hwpCtrl.PutFieldText("PJT_CD", "PO" + order.DOC_NO);
        orderPrintPop.global.hwpCtrl.PutFieldText("ORDER_DT", order.ORDER_DT);
        orderPrintPop.global.hwpCtrl.PutFieldText("FAX",
            order.PH_NUM == "" ? order.FAX_NUM : order.PH_NUM+" / "+order.FAX_NUM
        );
        orderPrintPop.global.hwpCtrl.PutFieldText("GOODS_DT", order.GOODS_DT);
        orderPrintPop.global.hwpCtrl.PutFieldText("PURC_EMP_NAME", order.CLAIM_EMP_NAME);
        orderPrintPop.global.hwpCtrl.PutFieldText("PURC_TEL", order.CLAIM_OFFICE_TEL_NUM);
        orderPrintPop.global.hwpCtrl.PutFieldText("PURC_EMAIL", order.CLAIM_EMAIL_ADDR);

        /** 2. CRM 정보 */
        orderPrintPop.global.hwpCtrl.PutFieldText("CRM_NM", crmMap.CRM_NM);
        orderPrintPop.global.hwpCtrl.PutFieldText("CRM_NO", crmMap.CRM_NO);
        orderPrintPop.global.hwpCtrl.PutFieldText("CRM_CEO", crmMap.CRM_CEO);
        orderPrintPop.global.hwpCtrl.PutFieldText("ADDR", crmMap.ADDR);
        orderPrintPop.global.hwpCtrl.PutFieldText("CRM_EVENT", crmMap.CRM_EVENT);
        orderPrintPop.global.hwpCtrl.PutFieldText("CRM_PROD", crmMap.CRM_PROD);
        orderPrintPop.global.hwpCtrl.PutFieldText("CRM_MANAGER", crmMap.CRM_MEM_NM);
        orderPrintPop.global.hwpCtrl.PutFieldText("EMAIL", crmMap.CRM_NM);

        orderPrintPop.global.hwpCtrl.PutFieldText("CRM_NM2", "캠틱종합기술원");
        orderPrintPop.global.hwpCtrl.PutFieldText("CRM_NO2", "402-82-13594");
        orderPrintPop.global.hwpCtrl.PutFieldText("CRM_CEO2", "노   상   흡 [직인생략]");
        orderPrintPop.global.hwpCtrl.PutFieldText("ADDR2", "전북특별자치도 전주시 덕진구 유상로 67 전주첨단벤처단지");
        orderPrintPop.global.hwpCtrl.PutFieldText("CRM_PROD2", "자동차부품설계, 모델링, 시제품제작, 상품화컨설팅");
        orderPrintPop.global.hwpCtrl.PutFieldText("CRM_EVENT2", "서비스, 제조");

        // orderPrintPop.global.hwpCtrl.PutFieldText("CRM_MANAGER2", empInfo.EMP_NAME_KR + (empInfo.OFFICE_TEL_NUM == undefined ? "" : ("/"+ empInfo.OFFICE_TEL_NUM)));
        orderPrintPop.global.hwpCtrl.PutFieldText("CRM_MANAGER2", "063-219-0300 / 063-219-0303");
        // orderPrintPop.global.hwpCtrl.PutFieldText("EMAIL2", empInfo.EMAIL_ADDR == undefined ? "" : empInfo.EMAIL_ADDR);
        orderPrintPop.global.hwpCtrl.PutFieldText("EMAIL2", "http://camtic.or.kr/");

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
            orderPrintPop.global.hwpCtrl.PutFieldText("SUP_AMT"+i, String(fn_numberWithCommas(list[i].ITEM_AMT)));
            orderPrintPop.global.hwpCtrl.PutFieldText("ETC"+i, list[i].ITEM_ETC);
            supAmtSum += list[i].ITEM_AMT;
        }

        /** 4. 견적 합계 */

        /** 할인금액 */
        // orderPrintPop.global.hwpCtrl.PutFieldText("DISCOUNT_AMT", fn_numberWithCommas(order.DISCOUNT_AMT));
        // supAmtSum -= order.DISCOUNT_AMT;

        /** 견적가 500*/
        /** 미포함 500 50 550*/
        const supAmtSum2 = Math.floor(supAmtSum/10);

        /** 포함 455 45 500*/
        const supAmtSum3 = Math.ceil(supAmtSum / 1.1);
        const supAmtSum4 = supAmtSum - supAmtSum3;

        /** 면세 500 0 500*/
        if(order.VAT == "N"){
            orderPrintPop.global.hwpCtrl.PutFieldText("SUP_AMT_SUM1", fn_numberWithCommas(supAmtSum));
            orderPrintPop.global.hwpCtrl.PutFieldText("SUP_AMT_SUM2", fn_numberWithCommas(supAmtSum2));
            orderPrintPop.global.hwpCtrl.PutFieldText("SUP_AMT_SUM", fn_numberWithCommas(supAmtSum+supAmtSum2));
        }else if(order.VAT == "Y"){
            orderPrintPop.global.hwpCtrl.PutFieldText("SUP_AMT_SUM1", fn_numberWithCommas(supAmtSum3));
            orderPrintPop.global.hwpCtrl.PutFieldText("SUP_AMT_SUM2", fn_numberWithCommas(supAmtSum4));
            orderPrintPop.global.hwpCtrl.PutFieldText("SUP_AMT_SUM", fn_numberWithCommas(supAmtSum));
        }else{
            orderPrintPop.global.hwpCtrl.PutFieldText("SUP_AMT_SUM1", fn_numberWithCommas(supAmtSum));
            orderPrintPop.global.hwpCtrl.PutFieldText("SUP_AMT_SUM2", "0");
            orderPrintPop.global.hwpCtrl.PutFieldText("SUP_AMT_SUM", fn_numberWithCommas(supAmtSum));
        }
        orderPrintPop.global.hwpCtrl.PutFieldText("ISS", order.SIGNIFICANT == "" || order.SIGNIFICANT == null ? "" : order.SIGNIFICANT.replaceAll("\n", "\r"));

        /** 담당자 서명 */
        let regSign = order.CLAIM_EMP_NAME;
        orderPrintPop.global.hwpCtrl.MoveToField('EMP_SIGN', true, true, false);
        orderPrintPop.global.hwpCtrl.PutFieldText('EMP_SIGN', regSign);

        var hostFlag = location.host;
        var hostProtocol = location.protocol;

        var host = "";
        if(hostFlag.indexOf("218.158.231.184") > -1 || hostFlag.indexOf("new.camtic.or.kr") > -1){
            host = hostProtocol + "//218.158.231.184/";
        }else{
            host = hostProtocol + "//218.158.231.186/";
        }

        if(empInfo.FILE_PATH != null){
            console.log(empInfo)
            if(orderPrintPop.global.hwpCtrl.FieldExist('EMP_SIGN')){
                orderPrintPop.global.hwpCtrl.PutFieldText('EMP_SIGN', " ");
                orderPrintPop.global.hwpCtrl.MoveToField('EMP_SIGN', true, true, false);
                orderPrintPop.global.hwpCtrl.InsertBackgroundPicture(
                    "SelectedCell",
                    host + empInfo.FILE_PATH,
                    1,
                    5,
                    0,
                    0,
                    0,
                    0
                );
            }
        }
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