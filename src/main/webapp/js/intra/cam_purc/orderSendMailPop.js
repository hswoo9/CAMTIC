const orderSendMail = {

    global : {

    },

    fn_defaultScript : function(){
        orderSendMail.fn_pageSet();
        // reqOr.fn_dataSet();
    },

    fn_pageSet : function(){
        customKendo.fn_textBox(["receiveEml" ,"sendEml", "subject", "contents"]);
        customKendo.fn_textArea(["significant"]);
    },

    fn_dataSet : function(){
        const result = customKendo.fn_customAjax("/purc/getPurcClaimData", {
            claimSn : $("#claimSn").val(),
            purcSn : $("#purcSn").val()
        });
        const orderMap = result.data;

        $("#purcDeptName").text(orderMap.DEPT_NAME);
        $("#purcEmpName").text(orderMap.EMP_NAME_KR);

        $("#estAmt").val(comma(orderMap.EST_AMT));
        $("#vatAmt").val(comma(orderMap.VAT_AMT));
        $("#totAmt").val(comma(orderMap.TOT_AMT));

        $("#vat").data("kendoRadioGroup").value(orderMap.VAT);

        $("#expType").data("kendoRadioGroup").value(orderMap.EXP_TYPE);

        $("#purcType").data("kendoRadioGroup").value(orderMap.PURC_TYPE);
        if($("input[name='purcType']:checked").val() != ""){
            $("#project").css("display", "");
            $("#pjtNm").text(orderMap.PJT_NM);
        } else {
            $("#project").css("display", "none");
        }

        this.fn_setClaimItem(orderMap);
        reqOr.fn_OrderBtnSet(orderMap);

        if(orderMap.ORDER_CK == "Y"){
            $("#orderDt").val(orderMap.ORDER_DT);
            $("#goodsDt").val(orderMap.GOODS_DT);
            $("#PHNum").val(orderMap.PH_NUM);
            $("#FaxNum").val(orderMap.FAX_NUM);
            $("#significant").val(orderMap.SIGNIFICANT);
        }
    },

    fn_sendMail : function(){
        var data = {
            purcSn : $("#purcSn").val(),
            claimSn : $("#claimSn").val(),
            receiveEml : $("#receiveEml").val(),
            sendEml : $("#sendEml").val(),
            subject : $("#subject").val(),
            contents : $("#contents").val()
        }

        const result = customKendo.fn_customAjax("/common/sendMail", data);
        if(result.flag){
            var rs = result.rs;
            if(rs == "SUCCESS"){
                alert("전송되었습니다.");
                window.close();
            }
        }

    },
}