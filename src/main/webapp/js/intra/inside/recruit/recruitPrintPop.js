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

        const map = rs.hashMap;
        const res = rs.result;
        const recruitList = res.recruitList;
        //const estSubList = res.estSubList;
        let recruitMap = "";
        //let estSubMap = [];

        /** 현재 버전 견적 데이터 추출 */
        for(let i=0; i< recruitList.length; i++){
            if( recruitList[i].RECRUIT_INFO_SN == recruitInfoSn){
                recruitMap = recruitList[i];
            }
        }

        /** 현재 버전 견적 리스트 추출
        for(let i=0; i<estSubList.length; i++){
            if(estSubList[i].EST_SN == estSn){
                estSubMap.push(estSubList[i]);
            }
        }
         */

        console.log("recruitMap");
        console.log(recruitMap);
        //console.log("estSubMap");
        //console.log(estSubMap);

        if(recruitMap == ""){
            alert("데이터 조회 중 오류가 발생하였습니다. 새로고침 후 진행바랍니다."); return;
        }

        /** 1. 견젹 표
        estPrintPop.global.hwpCtrl.PutFieldText("EST_DE", estMap.EST_DE);
        estPrintPop.global.hwpCtrl.PutFieldText("PJT_CD", map.PJT_CD);
        estPrintPop.global.hwpCtrl.PutFieldText("EST_CRM_NM", estMap.CRM_NM);
        estPrintPop.global.hwpCtrl.PutFieldText("EST_CRM_NM", estMap.CRM_NM);
        estPrintPop.global.hwpCtrl.PutFieldText("EST_NM", estMap.EST_NM);

        2. CRM 정보
        estPrintPop.global.hwpCtrl.PutFieldText("CRM_NM", crmMap.CRM_NM);
        estPrintPop.global.hwpCtrl.PutFieldText("CRM_NO", crmMap.CRM_NO);
        estPrintPop.global.hwpCtrl.PutFieldText("CRM_CEO", crmMap.CRM_CEO);
        estPrintPop.global.hwpCtrl.PutFieldText("ADDR", crmMap.ADDR);
        estPrintPop.global.hwpCtrl.PutFieldText("CRM_EVENT", crmMap.CRM_EVENT);
        estPrintPop.global.hwpCtrl.PutFieldText("CRM_PROD", crmMap.CRM_PROD);

        let crmManager = "";
        let crmMemSn = "";
        crmMemSn = map.CRM_MEM_SN;
        if(crmMemSn != null){
            crmManager = crmMap.CRM_MEM_NM + " / " + crmMap.CRM_MEM_PHN;
        }else{
            crmManager = map.CRM_MEM_TEMP_NM;
        }
        estPrintPop.global.hwpCtrl.PutFieldText("CRM_MANAGER", crmManager);
        estPrintPop.global.hwpCtrl.PutFieldText("EMAIL", crmMap.CRM_NM);

        let supAmtSum = 0;
         3. 견적 리스트
        for(let i=0; i<estSubMap.length; i++){
            estPrintPop.global.hwpCtrl.PutFieldText("PROD_NM"+i, String(estSubMap[i].PROD_NM));
            estPrintPop.global.hwpCtrl.PutFieldText("UNIT_AMT"+i, fn_numberWithCommas(estSubMap[i].UNIT_AMT));
            estPrintPop.global.hwpCtrl.PutFieldText("PROD_CNT"+i, String(estSubMap[i].PROD_CNT));
            estPrintPop.global.hwpCtrl.PutFieldText("UNIT"+i, estSubMap[i].UNIT);
            estPrintPop.global.hwpCtrl.PutFieldText("SUP_AMT"+i, fn_numberWithCommas(estSubMap[i].SUP_AMT));
            estPrintPop.global.hwpCtrl.PutFieldText("ETC"+i, estSubMap[i].ETC);
            supAmtSum += estSubMap[i].SUP_AMT;
        }

         4. 견적 합계
        const supAmtSum2 = Math.floor(supAmtSum/10);
        const supAmtSum1 = supAmtSum - supAmtSum2;
        estPrintPop.global.hwpCtrl.PutFieldText("SUP_AMT_SUM1", fn_numberWithCommas(supAmtSum1));
        estPrintPop.global.hwpCtrl.PutFieldText("SUP_AMT_SUM2", fn_numberWithCommas(supAmtSum2));
        estPrintPop.global.hwpCtrl.PutFieldText("SUP_AMT_SUM", fn_numberWithCommas(supAmtSum));
        estPrintPop.global.hwpCtrl.PutFieldText("SUP_AMT_SUM_TEXT", "총 견적금액 : "+fn_numberWithCommas(supAmtSum)+" 원");

        5. 기타사항
        estPrintPop.global.hwpCtrl.PutFieldText("EST_ISS", String(estMap.EST_ISS));
       */
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