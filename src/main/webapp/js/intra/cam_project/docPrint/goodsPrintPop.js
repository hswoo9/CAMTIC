const goodsPrint = {
    global: {
        hwpCtrl : "",
        params : "",
    },

    init: function(){
        goodsPrint.dataSet();
    },

    dataSet: function(){
        goodsPrint.loading();
        goodsPrint.global.params = params;
        goodsPrint.global.hwpCtrl = BuildWebHwpCtrl("hwpApproveContent", goodsPrint.global.params.hwpUrl, function () {goodsPrint.editorComplete();});
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
        let filePath = "http://218.158.231.186/upload/templateForm/goodsPrintTmp.hwp";
        goodsPrint.global.hwpCtrl.Open(filePath, "HWP", "", function(){
            goodsPrint.openCallBack();
            goodsPrint.global.hwpCtrl.EditMode = 0;
            goodsPrint.global.hwpCtrl.SetToolBar(1, "TOOLBAR_MENU");
            goodsPrint.global.hwpCtrl.SetToolBar(1, "TOOLBAR_STANDARD");
            goodsPrint.global.hwpCtrl.ShowRibbon(false);
            goodsPrint.global.hwpCtrl.ShowCaret(false);
            goodsPrint.global.hwpCtrl.ShowStatusBar(false);
            goodsPrint.global.hwpCtrl.SetFieldViewOption(1);
        }, {"userData" : "success"});

        goodsPrint.resize();
        $.LoadingOverlay("hide", {});
    },

    openCallBack: function(){
        let pjtSn = $("#pjtSn").val();

        const data = { pjtSn: pjtSn };
        const pjtMap = customKendo.fn_customAjax("/project/engn/getDelvData", data).map;
        const rs = customKendo.fn_customAjax("/project/engn/getEstData", data);
        const rs2 = customKendo.fn_customAjax("/project/engn/getCrmInfo", data);

        const ests = customKendo.fn_customAjax("/project/getStep1Data", data);
        var estSubList = ests.result.estSubList;

        const map = rs.hashMap;
        const crmMap = rs2.rs;

        console.log(pjtMap);

        /** 1. 납품 표 */
        goodsPrint.global.hwpCtrl.PutFieldText("END_EXP_DT", pjtMap.END_EXP_DT_FORMAT);
        goodsPrint.global.hwpCtrl.PutFieldText("PJT_CD", pjtMap.PJT_CD);
        goodsPrint.global.hwpCtrl.PutFieldText("CRM_NM", pjtMap.CRM_NM);

        /** 참고에 적을 사람이 없을때 의뢰인 입력*/
        let crm_mem_text = "";
        if(pjtMap.CRM_MEM_NM != null && pjtMap.CRM_MEM_NM != ""){
            crm_mem_text = pjtMap.CRM_MEM_NM;
        }else if(pjtMap.CRM_MEM_TEMP_NM != null && pjtMap.CRM_MEM_TEMP_NM != ""){
            crm_mem_text = pjtMap.CRM_MEM_TEMP_NM;
        }else{
            crm_mem_text = pjtMap.CRM_CEO;
        }
        goodsPrint.global.hwpCtrl.PutFieldText("CRM_MEM_NM", crm_mem_text);
        goodsPrint.global.hwpCtrl.PutFieldText("FAX", pjtMap.FAX);
        goodsPrint.global.hwpCtrl.PutFieldText("PJT_NM", pjtMap.PJT_NM);

        /** 2. CRM 정보 */
        goodsPrint.global.hwpCtrl.PutFieldText("CRM_NM", crmMap.CRM_NM);
        goodsPrint.global.hwpCtrl.PutFieldText("CRM_NO", crmMap.CRM_NO);
        goodsPrint.global.hwpCtrl.PutFieldText("CRM_CEO", crmMap.CRM_CEO);
        goodsPrint.global.hwpCtrl.PutFieldText("ADDR", crmMap.ADDR);
        goodsPrint.global.hwpCtrl.PutFieldText("CRM_EVENT", crmMap.CRM_EVENT);
        goodsPrint.global.hwpCtrl.PutFieldText("CRM_PROD", crmMap.CRM_PROD);
        let crmManager = "";
        let crmMemSn = "";
        crmMemSn = map.CRM_MEM_SN;
        if(crmMemSn != null){
            crmManager = crmMap.CRM_MEM_NM + " / " + crmMap.CRM_MEM_PHN;
        }else{
            crmManager = map.CRM_MEM_TEMP_NM;
        }
        goodsPrint.global.hwpCtrl.PutFieldText("CRM_MANAGER", crmManager);
        goodsPrint.global.hwpCtrl.PutFieldText("EMAIL", crmMap.CRM_NM);

        /** 3. 납품 리스트 */
        let supAmtSum = 0;
        for(let i=0; i<estSubList.length; i++){
            goodsPrint.global.hwpCtrl.PutFieldText("PROD_NM"+i, String(estSubList[i].PROD_NM));
            goodsPrint.global.hwpCtrl.PutFieldText("UNIT_AMT"+i, fn_numberWithCommas(estSubList[i].UNIT_AMT));
            goodsPrint.global.hwpCtrl.PutFieldText("PROD_CNT"+i, String(estSubList[i].PROD_CNT));
            goodsPrint.global.hwpCtrl.PutFieldText("UNIT"+i, estSubList[i].UNIT);
            goodsPrint.global.hwpCtrl.PutFieldText("SUP_AMT"+i, fn_numberWithCommas(estSubList[i].SUP_AMT));
            goodsPrint.global.hwpCtrl.PutFieldText("ETC"+i, estSubList[i].ETC);
            supAmtSum += estSubList[i].SUP_AMT;
        }

        /** 4. 견적 합계 */
        const supAmtSum2 = Math.floor(supAmtSum/10);
        const supAmtSum1 = supAmtSum - supAmtSum2;
        goodsPrint.global.hwpCtrl.PutFieldText("SUP_AMT_SUM1", fn_numberWithCommas(supAmtSum1));
        goodsPrint.global.hwpCtrl.PutFieldText("SUP_AMT_SUM2", fn_numberWithCommas(supAmtSum2));
        goodsPrint.global.hwpCtrl.PutFieldText("SUP_AMT_SUM", fn_numberWithCommas(supAmtSum));
        goodsPrint.global.hwpCtrl.PutFieldText("SUP_AMT_SUM_TEXT", "총 납품금액 : "+fn_numberWithCommas(supAmtSum)+" 원");

        /** 5. 기타사항 */
        goodsPrint.global.hwpCtrl.PutFieldText("ETC", String(pjtMap.GOODS_ISS));
    },

    resize: function() {
        if (document.getElementById("hwpctrl_frame") != null && typeof(document.getElementById("hwpctrl_frame")) != "undefined") {
            var pHeight = (window.innerHeight - 20) + "px";
            document.getElementById("hwpctrl_frame").style.width = "100%";
            document.getElementById("hwpctrl_frame").style.height = pHeight;
        }
    },

    print: function() {
        goodsPrint.global.hwpCtrl.PrintDocument();
    }
}