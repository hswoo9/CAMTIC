const estPrintPop = {
    global: {
        hwpCtrl : "",
        params : "",
    },

    init: function(){
        estPrintPop.dataSet();
    },

    dataSet: function(){
        estPrintPop.loading();
        estPrintPop.global.params = params;
        estPrintPop.global.hwpCtrl = BuildWebHwpCtrl("hwpApproveContent", estPrintPop.global.params.hwpUrl, function () {estPrintPop.editorComplete();});
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
        let filePath = "http://218.158.231.186/upload/templateForm/estPrintTmp.hwp";
        estPrintPop.global.hwpCtrl.Open(filePath, "HWP", "", function(){
            estPrintPop.openCallBack();
            estPrintPop.global.hwpCtrl.EditMode = 0;
            estPrintPop.global.hwpCtrl.SetToolBar(1, "TOOLBAR_MENU");
            estPrintPop.global.hwpCtrl.SetToolBar(1, "TOOLBAR_STANDARD");
            estPrintPop.global.hwpCtrl.ShowRibbon(false);
            estPrintPop.global.hwpCtrl.ShowCaret(false);
            estPrintPop.global.hwpCtrl.ShowStatusBar(false);
            estPrintPop.global.hwpCtrl.SetFieldViewOption(1);
        }, {"userData" : "success"});

        estPrintPop.resize();
        $.LoadingOverlay("hide", {});
    },

    openCallBack: function(){
        let pjtSn = $("#pjtSn").val();
        let estSn = $("#estSn").val();

        const data = { pjtSn: pjtSn, estSn : estSn };
        const rs = customKendo.fn_customAjax("/project/engn/getEstData", data);
        const rs2 = customKendo.fn_customAjax("/project/engn/getCrmInfo", data);
        const empInfo = customKendo.fn_customAjax("/user/getUserInfo", {empSeq: $("#regEmpSeq").val()});
        console.log("rs");
        console.log(rs);
        console.log("rs2");
        console.log(rs2);

        const map = rs.hashMap;
        const res = rs.result;
        const estList = res.estList;
        const estSubList = res.estSubList;
        let estMap = "";
        let estSubMap = [];
        const crmMap = rs2.rs;

        /** 현재 버전 견적 데이터 추출 */
        for(let i=0; i<estList.length; i++){
            if(estList[i].EST_SN == estSn){
                estMap = estList[i];
            }
        }
        
        /** 현재 버전 견적 리스트 추출 */
        for(let i=0; i<estSubList.length; i++){
            if(estSubList[i].EST_SN == estSn){
                estSubMap.push(estSubList[i]);
            }
        }

        console.log("estMap");
        console.log(estMap);
        console.log("estSubMap");
        console.log(estSubMap);

        if(estMap == ""){
            alert("데이터 조회 중 오류가 발생하였습니다. 새로고침 후 진행바랍니다."); return;
        }

        /** 1. 견젹 표 */
        estPrintPop.global.hwpCtrl.PutFieldText("EST_DE", estMap.EST_DE);
        estPrintPop.global.hwpCtrl.PutFieldText("PJT_CD", map.PJT_CD);

        /** 협업일시 관련번호 상위 프로젝트 코드 추출*/
        console.log(map);
        if(map.TEAM_STAT == "Y"){
            const pntRs = customKendo.fn_customAjax("/project/engn/getEstData", {
                pjtSn: map.PNT_PJT_SN
            }).hashMap;
            estPrintPop.global.hwpCtrl.PutFieldText("PJT_CD", pntRs.PJT_CD);
        }

        estPrintPop.global.hwpCtrl.PutFieldText("EST_CRM_NM", estMap.CRM_NM);
        estPrintPop.global.hwpCtrl.PutFieldText("EST_CRM_NM", estMap.CRM_NM);
        estPrintPop.global.hwpCtrl.PutFieldText("EST_NM", estMap.EST_NM);

        /** 2. CRM 정보 */
        estPrintPop.global.hwpCtrl.PutFieldText("CRM_NM", crmMap.CRM_NM);
        estPrintPop.global.hwpCtrl.PutFieldText("CRM_CEO", crmMap.CRM_CEO);

        estPrintPop.global.hwpCtrl.PutFieldText("CRM_NM2", "캠틱종합기술원");
        estPrintPop.global.hwpCtrl.PutFieldText("CRM_NO2", "402-82-13594");
        estPrintPop.global.hwpCtrl.PutFieldText("CRM_CEO2", "노   상   흡 [직인생략]");
        estPrintPop.global.hwpCtrl.PutFieldText("ADDR2", "전북특별자치도 전주시 덕진구 유상로 67 전주첨단벤처단지");
        estPrintPop.global.hwpCtrl.PutFieldText("CRM_PROD2", "자동차부품설계, 모델링, 시제품제작, 상품화컨설팅");
        estPrintPop.global.hwpCtrl.PutFieldText("CRM_EVENT2", "서비스, 제조");

        estPrintPop.global.hwpCtrl.PutFieldText("CRM_MANAGER2", empInfo.EMP_NAME_KR + (empInfo.OFFICE_TEL_NUM == undefined ? "" : ("/"+ empInfo.OFFICE_TEL_NUM)));
        estPrintPop.global.hwpCtrl.PutFieldText("EMAIL2", empInfo.EMAIL_ADDR == undefined ? "" : empInfo.EMAIL_ADDR);

        let crmManager = "";
        let crmMemSn = "";
        crmMemSn = map.CRM_MEM_SN;
        if(crmMemSn != null){
            crmManager = crmMap.CRM_MEM_NM + " / " + crmMap.CRM_MEM_PHN;
        }else{
            crmManager = map.CRM_MEM_TEMP_NM;
        }
        estPrintPop.global.hwpCtrl.PutFieldText("CRM_MANAGER", crmManager);

        let email = "";
        let crmEmail = map.CRM_MEM_TEMP_MAIL;
        if(crmEmail != null){
            email = crmMap.CRM_MEM_TEMP_MAIL;
        }else{
            email = map.CRM_MEM_EMAIL;
        }
        estPrintPop.global.hwpCtrl.PutFieldText("EMAIL", email);

        let supAmtSum = 0;
        /** 3. 견적 리스트 */
        for(let i=0; i<estSubMap.length; i++){
            estPrintPop.global.hwpCtrl.PutFieldText("PROD_NM"+i, String(estSubMap[i].PROD_NM));
            estPrintPop.global.hwpCtrl.PutFieldText("UNIT_AMT"+i, fn_numberWithCommas(estSubMap[i].UNIT_AMT));
            estPrintPop.global.hwpCtrl.PutFieldText("PROD_CNT"+i, String(estSubMap[i].PROD_CNT));
            estPrintPop.global.hwpCtrl.PutFieldText("UNIT"+i, estSubMap[i].UNIT);
            estPrintPop.global.hwpCtrl.PutFieldText("SUP_AMT"+i, fn_numberWithCommas(estSubMap[i].SUP_AMT));
            estPrintPop.global.hwpCtrl.PutFieldText("ETC"+i, estSubMap[i].ETC);
            supAmtSum += estSubMap[i].SUP_AMT;
        }

        /** 4. 견적 합계 */


        /** 견적가 500*/
            /** 미포함 500 50 550*/
            const supAmtSum2 = Math.round(supAmtSum/10);

            /** 포함 455 45 500*/
            const supAmtSum3 = Math.round(supAmtSum / 1.1);
            const supAmtSum4 = supAmtSum - supAmtSum3;

            /** 면세 500 0 500*/
            console.log(estMap.VAT);
            if(estMap.VAT == "N"){
                estPrintPop.global.hwpCtrl.PutFieldText("SUP_AMT_SUM1", fn_numberWithCommas(supAmtSum));
                estPrintPop.global.hwpCtrl.PutFieldText("SUP_AMT_SUM2", fn_numberWithCommas(supAmtSum2));
                estPrintPop.global.hwpCtrl.PutFieldText("SUP_AMT_SUM", fn_numberWithCommas(supAmtSum+supAmtSum2));
                estPrintPop.global.hwpCtrl.PutFieldText("SUP_AMT_SUM_TEXT", "총 견적금액 : "+fn_numberWithCommas(supAmtSum+supAmtSum2)+" 원");
            }else if(estMap.VAT == "Y"){
                estPrintPop.global.hwpCtrl.PutFieldText("SUP_AMT_SUM1", fn_numberWithCommas(supAmtSum3));
                estPrintPop.global.hwpCtrl.PutFieldText("SUP_AMT_SUM2", fn_numberWithCommas(supAmtSum4));
            estPrintPop.global.hwpCtrl.PutFieldText("SUP_AMT_SUM", fn_numberWithCommas(supAmtSum));
            estPrintPop.global.hwpCtrl.PutFieldText("SUP_AMT_SUM_TEXT", "총 견적금액 : "+fn_numberWithCommas(supAmtSum)+" 원");
        }else{
            estPrintPop.global.hwpCtrl.PutFieldText("SUP_AMT_SUM1", fn_numberWithCommas(supAmtSum));
            estPrintPop.global.hwpCtrl.PutFieldText("SUP_AMT_SUM2", "0");
            estPrintPop.global.hwpCtrl.PutFieldText("SUP_AMT_SUM", fn_numberWithCommas(supAmtSum));
            estPrintPop.global.hwpCtrl.PutFieldText("SUP_AMT_SUM_TEXT", "총 견적금액 : "+fn_numberWithCommas(supAmtSum)+" 원");
        }

        /** 5. 기타사항 */
        estPrintPop.global.hwpCtrl.PutFieldText("EST_ISS", String(estMap.EST_ISS));
    },

    resize: function() {
        if (document.getElementById("hwpctrl_frame") != null && typeof(document.getElementById("hwpctrl_frame")) != "undefined") {
            var pHeight = (window.innerHeight - 20) + "px";
            document.getElementById("hwpctrl_frame").style.width = "100%";
            document.getElementById("hwpctrl_frame").style.height = pHeight;
        }
    },

    print: function() {
        estPrintPop.global.hwpCtrl.PrintDocument();
    }
}