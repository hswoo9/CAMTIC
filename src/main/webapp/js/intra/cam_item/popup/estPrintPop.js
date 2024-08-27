const estPrintPop = {
    global: {
        hwpCtrl : "",
        params : "",
        now : "",
    },

    init: function(e){
        estPrintPop.global.now = e;
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
        let filePath = "http://218.158.231.184/upload/templateForm/itemEstPrintTmp.hwp";
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
        const data = { estPrintSn: $("#estPrintSn").val(), obtainOrderSn: $("#obtainOrderSn").val() };
        const rs = customKendo.fn_customAjax("/item/getEstPrintSn.do", data);
        console.log(rs);

        if(rs.rs.obtainOrderList.length == 0){
            alert("데이터 조회 중 오류가 발생하였습니다. 새로고침 후 진행바랍니다."); return;
        }

        var obtainOrderList = rs.rs.obtainOrderList;
        var itemNameAll = "";
        if(obtainOrderList.length == 1){
            itemNameAll = obtainOrderList[0].ITEM_NAME;
        }else if(obtainOrderList.length > 1){
            itemNameAll = obtainOrderList[0].ITEM_NAME + " 외 " + (obtainOrderList.length - 1) + "개";
        }

        estPrintPop.global.hwpCtrl.PutFieldText("EST_DE", estPrintPop.global.now);
        estPrintPop.global.hwpCtrl.PutFieldText("CRM_NM", rs.rs.CRM_NM);
        estPrintPop.global.hwpCtrl.PutFieldText("CRM_NO", rs.rs.CRM_NO);
        estPrintPop.global.hwpCtrl.PutFieldText("CRM_CEO", rs.rs.CRM_CEO);
        if(rs.rs.TEL_NUM != null){
            estPrintPop.global.hwpCtrl.PutFieldText("TEL_NUM", rs.rs.TEL_NUM);
        }
        if(rs.rs.FAX != null){
            estPrintPop.global.hwpCtrl.PutFieldText("FAX_NUM", rs.rs.FAX);
        }
        estPrintPop.global.hwpCtrl.PutFieldText("ITEM_NAME_ALL", itemNameAll);

        let itemAmtSum = 0;
        /** 3. 견적 리스트 */
        for(var i = 0; i < obtainOrderList.length; i++){
            estPrintPop.global.hwpCtrl.PutFieldText("ITEM_NAME"+i, String(obtainOrderList[i].ITEM_NAME));
            estPrintPop.global.hwpCtrl.PutFieldText("UNIT_PRICE"+i, fn_numberWithCommas(obtainOrderList[i].UNIT_PRICE));
            estPrintPop.global.hwpCtrl.PutFieldText("ORDER_VOLUME"+i, String(Number(obtainOrderList[i].ORDER_VOLUME)));
            estPrintPop.global.hwpCtrl.PutFieldText("UNIT"+i, obtainOrderList[i].UNIT);
            estPrintPop.global.hwpCtrl.PutFieldText("AMT"+i, fn_numberWithCommas(obtainOrderList[i].AMT));
            estPrintPop.global.hwpCtrl.PutFieldText("ETC"+i, obtainOrderList[i].RMK);
            itemAmtSum += Number(obtainOrderList[i].AMT);
        }

        /** 4. 견적 합계 */
        const supAmtSum2 = Math.floor(itemAmtSum/10);
        const supAmtSum1 = itemAmtSum - supAmtSum2;
        estPrintPop.global.hwpCtrl.PutFieldText("SUP_AMT_SUM1", fn_numberWithCommas(supAmtSum1));
        estPrintPop.global.hwpCtrl.PutFieldText("SUP_AMT_SUM2", fn_numberWithCommas(supAmtSum2));
        estPrintPop.global.hwpCtrl.PutFieldText("SUP_AMT_SUM", fn_numberWithCommas(itemAmtSum));
        estPrintPop.global.hwpCtrl.PutFieldText("SUP_AMT_SUM_TEXT", "총 견적금액 : "+fn_numberWithCommas(itemAmtSum)+" 원");

        /** 5. 기타사항 */
        estPrintPop.global.hwpCtrl.MoveToField('EST_CONTENT', true, true, false);
        estPrintPop.global.hwpCtrl.SetTextFile(rs.rs.RMK.replaceAll("\n", "<br>"), "html","insertfile");
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