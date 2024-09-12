var reqCl = {

    global: {
        createHtmlStr : "",
        itemIndex : 0,
        cliamItemList : [],
        fileArray: [],
        attFiles: [],
        status : "",
    },

    fn_defaultScript : function(){
        window.resizeTo(1500, 840);
        customKendo.fn_textBox(["pjtNm", "purcDeptName", "purcEmpName", "claimEtc"
                                ,"claimTitle", "purcReqPurpose", "purcLink", "crmNm"
                                ,"estAmt", "vatAmt", "totAmt", "itemNm0", "itemStd0", "purcSupAmt0", "purcVatAmt0",
                                ,"itemEa0", "itemUnitAmt0", "itemUnit0", "purcItemAmt0", "itemAmt0", "itemEtc0", "difAmt0", "discountAmt"])

        var radioDataSource = [
            { label: "법인운영", value: "" },
            { label: "R&D", value: "R" },
            { label: "비R&D", value: "S" },
            { label: "엔지니어링", value: "D" },
            { label: "용역/기타", value: "V" },
        ]

        var radioExpDataSource = [
            { label: "법인운영", value: "" },
            { label: "R&D", value: "R" },
            { label: "비R&D", value: "S" },
            { label: "엔지니어링", value: "D" },
            { label: "용역/기타", value: "V" },
        ]

        var radioPaymentMethod = [
            { label: "계좌이체", value: "A" },
            { label: "인터넷구매", value: "I" },
            { label: "현장(카드) 결제", value: "C" },
        ]
        customKendo.fn_radioGroup("paymentMethod", radioPaymentMethod, "horizontal");

        var radioVatDataSource = [
            { label: "부가세 포함", value: "Y" },
            { label: "부가세 미포함", value: "N" },
            { label: "면세", value: "D" },
        ]

        let productsDataSource = customKendo.fn_customAjax("/system/commonCodeManagement/getCmCodeList", {cmGroupCodeId: "38"});
        customKendo.fn_dropDownList("purcItemType0", productsDataSource, "CM_CODE_NM", "CM_CODE", 2);

        let productADataSource = customKendo.fn_customAjax("/projectMng/getProductCodeInfo", {productGroupCodeId: 1}).list;
        customKendo.fn_dropDownList("productA0", productADataSource, "PRODUCT_DT_CODE_NM", "PRODUCT_DT_CODE", 2);

        $(".productA").each(function(){
            var productId = $(this).attr("id");

            if(productId != null){
                reqCl.fn_productCodeSetting(productId);
            }
        });

        // var radioProdDataSource = [
        //     { label: "해당없음", value: "N" },
        //     { label: "자산", value: "A" },
        //     { label: "유지보수", value: "E" },
        // ]

        customKendo.fn_radioGroup("purcType", radioDataSource, "horizontal");
        //customKendo.fn_radioGroup("expType", radioExpDataSource, "horizontal");
        customKendo.fn_radioGroup("vat", radioVatDataSource, "horizontal");
        // customKendo.fn_radioGroup("prodCd", radioProdDataSource, "horizontal");

        $("input[name='purcType']").click(function(){
            if($("input[name='purcType']:checked").val() != ""){
                $("#project").css("display", "");
                $("#claimTitle").val("");
            } else {
                $("#project").css("display", "none");
                $("#claimTitle").val("[법인운영] 구매청구");
            }
            $("#pjtSn").val("");
            $("#pjtNm").val("");
            $("#pjtCd").val("");

            reqCl.fn_goodsDtChange();
        });

        $("input[name='paymentMethod']").click(function(){
            if($("input[name='paymentMethod']:checked").val() == "I"){
                $(".purcLinkTh").css("display", "");
            } else {
                $(".purcLinkTh").css("display", "none");
                $("#purcLink").val("");
            }

            if($("input[name='paymentMethod']:checked").val() == "A"){
                const now = new Date();
                const currentMonth = now.getMonth();
                const currentYear = now.getFullYear();

                const date1 = new Date(currentYear, currentMonth, 10);
                const date2 = new Date(currentYear, currentMonth, 25);

                if (date1 < now) date1.setMonth(currentMonth + 1);
                if (date2 < now) date2.setMonth(currentMonth + 1);

                const d = new Date(date1 < date2 ? date1 : date2);
                let year = d.getFullYear();
                let month = '' + (d.getMonth() + 1);
                let day = '' + d.getDate();

                if (month.length < 2){
                    month = '0' + month;
                }
                if (day.length < 2){
                    day = '0' + day;
                }

                $("#expDe").val([year, month, day].join('-'));
            }else{
                const now = new Date();
                const currentMonth = now.getMonth();
                const currentYear = now.getFullYear();

                const d = new Date(new Date(currentYear, currentMonth + 1, 10));
                let year = d.getFullYear();
                let month = '' + (d.getMonth() + 1);
                let day = '' + d.getDate();

                if (month.length < 2){
                    month = '0' + month;
                }
                if (day.length < 2){
                    day = '0' + day;
                }

                $("#expDe").val([year, month, day].join('-'));
            }
        });

        customKendo.fn_datePicker("claimDe", "month", "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("expDe", "month", "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("goodsDt", "month", "yyyy-MM-dd", new Date());

        if($("#purcSn").val() != ""){
            var data = {
                claimSn : $("#claimSn").val(),
                purcSn : $("#purcSn").val()
            }

            if($("#itemSn").val() != ""){
                data.itemSn = $("#itemSn").val();
            }

            var rs = customKendo.fn_customAjax("/purc/getPurcReq.do", data);
            var data = rs.data;

            $("#crmMonCheck").val(data.itemList[0].MON_CHECK);

            if(data.purcFile != null){
                if($("#claimSn").val() != ""){
                    var rs2 = customKendo.fn_customAjax("/purc/getPurcClaimData", { claimSn : $("#claimSn").val() }).data;
                    reqCl.global.status = rs2.STATUS;
                }

                reqCl.settingTempFileDataInit(data.purcFile);
                reqCl.global.fileArray = data.purcFile;
            }

            $("#vat").data("kendoRadioGroup").value(data.VAT);
            $("#vat").data("kendoRadioGroup").trigger("change");
            // $("#discountAmt").val(comma(data.DISCOUNT_AMT))

            if($("#claimSn").val() == ""){
                reqCl.fn_setItem(data);
                $("#purcReqPurpose").val(data.PURC_REQ_PURPOSE);

                $("#purcDeptName").val(data.DEPT_NAME);
                $("#purcDeptSeq").val(data.DEPT_SEQ);
                $("#purcEmpName").val(data.EMP_NAME_KR);
                $("#purcEmpSeq").val(data.EMP_SEQ);

            } else {
                var data = {
                    claimSn : $("#claimSn").val(),
                    purcSn : $("#purcSn").val()
                }

                if($("#itemSn").val() != ""){
                    data.itemSn = $("#itemSn").val();
                }

                rs = customKendo.fn_customAjax("/purc/getPurcClaimData", data);
                data = rs.data;
                reqCl.global.status = data.STATUS;

                console.log(data);

                $("#crmMonCheck").val(data.MON_CHECK);
                $("#claimDe").val(data.CLAIM_DE);
                $("#expDe").val(data.EXP_DE);
                $("#goodsDt").val(data.GOODS_DT);
                $("#claimTitle").val(data.CLAIM_TITLE);
                $("#claimEtc").val(data.CLAIM_ETC);
                $("#purcReqPurpose").val(data.PURC_REQ_PURPOSE);


                $("#estAmt").val(comma(data.EST_AMT));
                $("#vatAmt").val(comma(data.VAT_AMT));
                $("#totAmt").val(comma(data.TOT_AMT));

                $("#vat").data("kendoRadioGroup").value(data.VAT);
                // $("#discountAmt").val(comma(data.DISCOUNT_AMT));

                $("#purcDeptName").val(data.DEPT_NAME);
                $("#purcDeptSeq").val(data.DEPT_SEQ);
                $("#purcEmpName").val(data.EMP_NAME_KR);
                $("#purcEmpSeq").val(data.EMP_SEQ);

                //$("#expType").data("kendoRadioGroup").value(data.EXP_TYPE);

                if(data.PRI_PAY == "Y"){
                    $("#priPay").prop("checked", true);
                }

                if(data.CONT_YN == "Y"){
                    $("#contYn").prop("checked", true);
                }

                if(data.itemList[0].CLAIM_SN == "" || data.itemList[0].CLAIM_SN == null || data.itemList[0].CLAIM_SN == undefined) {
                    reqCl.fn_setItem(data);
                } else {
                    this.fn_setClaimItem(data);
                }
                reqCl.fn_kendoUIEnableSet(data);
                reqCl.fn_ClaimBtnSet(data);
            }

            $("#purcType").data("kendoRadioGroup").value(data.PURC_TYPE);

            if($("input[name='purcType']:checked").val() != ""){
                $("#project").css("display", "");
                $("#pjtSn").val(data.PJT_SN);
                $("#pjtNm").val(data.PJT_NM);
            } else {
                $("#project").css("display", "none");
            }

            $("#paymentMethod").data("kendoRadioGroup").value(data.PAYMENT_METHOD);

            if($("input[name='paymentMethod']:checked").val() == "I"){
                $(".purcLinkTh").css("display", "");
                $("#purcLink").val(data.PURC_LINK);
            } else if($("input[name='paymentMethod']:checked").val() == "C"){
                $("#priPay").prop("checked", true).prop('disabled', true);
                $(".purcLinkTh").css("display", "none");
                $("#purcLink").val("");
            } else {
                $(".purcLinkTh").css("display", "none");
                $("#purcLink").val("");
            }

        } else if($("#claimSn").val() != "") {
            var data = {
                claimSn : $("#claimSn").val(),
                purcSn : $("#purcSn").val()
            }

            if($("#itemSn").val() != ""){
                data.itemSn = $("#itemSn").val();
            }

            rs = customKendo.fn_customAjax("/purc/getPurcClaimData", data);
            data = rs.data;
            reqCl.global.status = data.STATUS;

            if(data.purcFile != null){
                reqCl.settingTempFileDataInit(data.purcFile);
                reqCl.global.fileArray = data.purcFile;
            }

            $("#crmMonCheck").val(data.MON_CHECK);
            $("#claimDe").val(data.CLAIM_DE);
            $("#expDe").val(data.EXP_DE);
            $("#goodsDt").val(data.GOODS_DT);
            $("#claimTitle").val(data.CLAIM_TITLE);
            $("#claimEtc").val(data.CLAIM_ETC);
            $("#purcReqPurpose").val(data.PURC_REQ_PURPOSE);

            $("#purcDeptName").val(data.DEPT_NAME);
            $("#purcDeptSeq").val(data.DEPT_SEQ);
            $("#purcEmpName").val(data.EMP_NAME_KR);
            $("#purcEmpSeq").val(data.EMP_SEQ);

            $("#estAmt").val(comma(data.EST_AMT));
            $("#vatAmt").val(comma(data.VAT_AMT));
            $("#totAmt").val(comma(data.TOT_AMT));

            // $("#discountAmt").val(comma(data.DISCOUNT_AMT));
            $("#vat").data("kendoRadioGroup").value(data.VAT);

            //$("#expType").data("kendoRadioGroup").value(data.EXP_TYPE);

            $("#purcType").data("kendoRadioGroup").value(data.PURC_TYPE);

            if(data.PRI_PAY == "Y"){
                $("#priPay").prop("checked", true);
            }

            if(data.CONT_YN == "Y"){
                $("#contYn").prop("checked", true);
            }

            if(data.CHECK_PROFIT == "Y"){
                $("#checkProfit").prop("checked", true);
            }


            if($("input[name='purcType']:checked").val() != ""){
                $("#project").css("display", "");
                $("#pjtSn").val(data.PJT_SN);
                $("#pjtNm").val(data.PJT_NM);
            } else {
                $("#project").css("display", "none");
            }

            $("#paymentMethod").data("kendoRadioGroup").value(data.PAYMENT_METHOD);

            if($("input[name='paymentMethod']:checked").val() == "I"){
                $(".purcLinkTh").css("display", "");
                $("#purcLink").val(data.PURC_LINK);
            } else if($("input[name='paymentMethod']:checked").val() == "C"){
                $("#priPay").prop("checked", true).prop('disabled', true);
                $(".purcLinkTh").css("display", "none");
                $("#purcLink").val("");
            } else {
                $(".purcLinkTh").css("display", "none");
                $("#purcLink").val("");
            }

            this.fn_setClaimItem(data);
            reqCl.fn_kendoUIEnableSet(data);
            reqCl.fn_ClaimBtnSet(data);
        } else if($("#purcSn").val() == "" && $("#claimSn").val() == "") {
            // 디폴트 선택
            $("#purcItemType0").data("kendoDropDownList").select(1);
            $("#productA0").data("kendoDropDownList").select(2);
            reqCl.global.itemIndex += 1;
        }

        $("#vat").data("kendoRadioGroup").bind("change", function(e){
            reqCl.vatCalcN();
        });

        if($("#itemSn").val() != ""){
            if(data.PURC_TYPE == ""){
                $("#claimTitle").val("[법인운영] 구매청구");
            } else {
                var pt = "";
                if($("#purcType").getKendoRadioGroup().value() == "R"){
                    pt = "R&D";
                } else if($("#purcType").getKendoRadioGroup().value() == "S"){
                    pt = "비R&D";
                } else if($("#purcType").getKendoRadioGroup().value() == "D"){
                    pt = "엔지니어링";
                } else if($("#purcType").getKendoRadioGroup().value() == "V"){
                    pt = "용역/기타";
                }
                $("#claimTitle").val( "["+ pt +"] "+ $("#pjtNm").val()+ " 구매청구");
            }
        }


        if($("#claimSn").val() == ""){
            for(var i = 0 ; i < $("#claimTbody").find("tr").length ; i++){
                $("#purcSupAmt" + i).data("kendoTextBox").enable(true);
                $("#purcVatAmt" + i).data("kendoTextBox").enable(true);
                $("#itemAmt" + i).data("kendoTextBox").enable(true);
            }
        } else {
            if(data.STATUS == "10" || data.STATUS == "20" || data.STATUS == "50" || data.STATUS == "100" || data.STATUS == "101"){
                for(var i = 0 ; i < $("#claimTbody").find("tr").length ; i++){
                    $("#purcSupAmt" + i).data("kendoTextBox").enable(false);
                    $("#purcVatAmt" + i).data("kendoTextBox").enable(false);
                    $("#itemAmt" + i).data("kendoTextBox").enable(false);
                }
            } else {
                for(var i = 0 ; i < $("#claimTbody").find("tr").length ; i++){
                    $("#purcSupAmt" + i).data("kendoTextBox").enable(true);
                    $("#purcVatAmt" + i).data("kendoTextBox").enable(true);
                    $("#itemAmt" + i).data("kendoTextBox").enable(true);
                }
            }
        }

        $("#vatAmt").change(function(){
            let estAmt = 0;
            let vatAmt = 0;
            let totAmt = 0;
            $.each($(".claimItem"), function(i, v) {
                var idx = $(this).attr("id").replace(/[^0-9]/g, '');

                $("#itemAmt" + idx).val( comma(Number(uncommaN($("#purcSupAmt" + idx).val())) + Number(uncommaN($("#purcVatAmt" + idx).val()))) );

                estAmt += Number(uncommaN($("#purcSupAmt" + idx).val()));
                vatAmt += Number(uncommaN($("#purcVatAmt" + idx).val()));
                totAmt += Number(uncommaN($("#itemAmt" + idx).val()));
            });

            $("#estAmt").val(comma(estAmt));
            $("#vatAmt").val(comma(vatAmt));
            $("#totAmt").val(comma(totAmt));
        });
    },

    fn_goodsDtChange : function(){

        var trDe = $("#goodsDt").val();
        var trDeAr = trDe.split("-");
        var trDay = trDeAr[2];
        if(trDeAr[2] == 31){
            trDay = 30
        }
        var trDate = new Date(trDeAr[0], trDeAr[1] - 1, trDay);

        if($("input[name='purcType']:checked").val() != ""){
            if(trDeAr[2] < 16){             // 매월 1일 ~ 15일
                trDate.setMonth(trDate.getMonth());
                trDate.setDate(25);
                $("#expDe").val(trDate.getFullYear() + "-" + (trDate.getMonth() + 1).toString().padStart(2, "0") + "-" + trDate.getDate());
            } else {                        // 매월 16일 ~ 말일
                trDate.setMonth(trDate.getMonth() + 1);
                trDate.setDate(10);
                $("#expDe").val(trDate.getFullYear() + "-" + (trDate.getMonth() + 1).toString().padStart(2, "0") + "-" + trDate.getDate());
            }
        } else {
            if(trDeAr[2] < 16){             // 매월 1일 ~ 15일
                trDate.setMonth(trDate.getMonth() + 1);
                trDate.setDate(25);
                $("#expDe").val(trDate.getFullYear() + "-" + (trDate.getMonth() + 1).toString().padStart(2, "0") + "-" + trDate.getDate());
            } else {                        // 매월 16일 ~ 말일
                trDate.setMonth(trDate.getMonth() + 2);
                trDate.setDate(10);
                $("#expDe").val(trDate.getFullYear() + "-" + (trDate.getMonth() + 1).toString().padStart(2, "0") + "-" + trDate.getDate());
            }
        }
    },

    vatCalc : function(){
        let sum = 0;
        $.each($(".purcItemAmt"), function(){
            sum += Number(uncomma(this.value));
        });

        /** 견적가 500*/
        /** 미포함 500 50 550*/
        const sum2 = Math.round(sum/10);

        /** 포함 455 45 500*/
        const sum3 = Math.round(sum / 1.1);
        const sum4 = sum - sum3;

        if($("#vat").data("kendoRadioGroup").value() == "N"){
            $("#estAmt").val(comma(sum));
            $("#vatAmt").val(comma(sum2));
            $("#totAmt").val(comma(sum+sum2));
        }else if($("#vat").data("kendoRadioGroup").value() == "Y"){
            $("#estAmt").val(comma(sum3));
            $("#vatAmt").val(comma(sum4));
            $("#totAmt").val(comma(sum));
        }else if($("#vat").data("kendoRadioGroup").value() == "D"){
            $("#estAmt").val(comma(sum));
            $("#vatAmt").val("0");
            $("#totAmt").val(comma(sum));
        }
    },

    vatCalcN : function(){
        let sum = 0;
        let estAmt = 0;
        let vatAmt = 0;
        let totAmt = 0;
        // var disAmt = 0;

        $.each($(".itemAmt"), function(i){
            var unitPrice = Number(uncommaN($("#itemUnitAmt" + i).val()));
            var qty = Number(uncomma($("#itemEa" + i).val()));
            var amount = unitPrice * qty;

            sum += amount;
        });

        // $.each($(".difAmt"), function(){
        //     disAmt += Number(uncommaN(this.value));
        // });


        sum = Number(sum);

        /** 견적가 500*/
        /** 미포함 500 50 550*/
        const sum2 = Math.round(sum/10);

        /** 포함 455 45 500*/
        const sum3 = Math.round(sum / 1.1);
        const sum4 = Number(sum) - Number(sum3);

        // if($("#vat").data("kendoRadioGroup").value() == "N"){
        //     $("#estAmt").val(comma(sum));
        //     $("#vatAmt").val(comma(sum2));
        //     $("#totAmt").val(comma(Number(sum)+Number(sum2)));
        // }else if($("#vat").data("kendoRadioGroup").value() == "Y"){
        //     $("#estAmt").val(comma(sum3));
        //     $("#vatAmt").val(comma(sum4));
        //     $("#totAmt").val(comma(sum));
        // }else if($("#vat").data("kendoRadioGroup").value() == "D"){
        //     $("#estAmt").val(comma(sum));
        //     $("#vatAmt").val("0");
        //     $("#totAmt").val(comma(sum));
        // }

        $.each($(".claimItem"), function(i, v) {
            var idx = $(this).attr("id").replace(/[^0-9]/g, '');
            var unitPrice = Number(uncommaN($("#itemUnitAmt" + idx).val()));
            var qty = Number(uncomma($("#itemEa" + idx).val()));
            var amount = unitPrice * qty;

            /** 견적가 500*/
            /** 미포함 500 50 550*/
            const sum2 = Math.round(amount/10);

            /** 포함 455 45 500*/
            const sum3 = Math.round(amount / 1.1);
            const sum4 = amount - sum3;

            if($("#vat").data("kendoRadioGroup").value() == "N"){
                $("#purcSupAmt" + idx).val(comma(amount));
                $("#purcVatAmt" + idx).val(comma(sum2));
                // $("#purcItemAmt" + idx).val(comma(amount+sum2));
                $("#itemAmt" + idx).val(comma(amount+sum2));
            }else if($("#vat").data("kendoRadioGroup").value() == "Y"){
                $("#purcSupAmt" + idx).val(comma(sum3));
                $("#purcVatAmt" + idx).val(comma(sum4));
                // $("#purcItemAmt" + idx).val(comma(amount));
                $("#itemAmt" + idx).val(comma(amount));
            }else if($("#vat").data("kendoRadioGroup").value() == "D"){
                $("#purcSupAmt" + idx).val(comma(amount));
                $("#purcVatAmt" + idx).val("0");
                // $("#purcItemAmt" + idx).val(comma(amount));
                $("#itemAmt" + idx).val(comma(amount));
            }

            estAmt += Number(uncommaN($("#purcSupAmt" + idx).val()));
            vatAmt += Number(uncommaN($("#purcVatAmt" + idx).val()));
            totAmt += Number(uncommaN($("#itemAmt" + idx).val()));
        });

        $("#estAmt").val(comma(estAmt));
        $("#vatAmt").val(comma(vatAmt));
        $("#totAmt").val(comma(totAmt));
    },

    fn_amtCalculator : function(){
        reqCl.vatCalcN();
    },

    fn_popCamCrmList : function(){
        var url = "/crm/pop/popCrmList.do";
        var name = "_blank";
        var option = "width = 1300, height = 670, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    fn_calc : function(idx, e){
        $("#itemAmt" + idx).val(comma(uncomma($("#itemUnitAmt" + idx).val()) * uncomma($("#itemEa" + idx).val())));

        // if($("#purcItemAmt" + idx).val() != "" && $("#purcItemAmt" + idx).val() != "0"){
        //     $("#difAmt" + idx).val(comma(uncomma($("#purcItemAmt" + idx).val()) - uncomma($("#itemAmt" + idx).val())));
        // }

        reqCl.fn_amtCalculator();


        return inputNumberFormat(e);
    },

    fn_calcN : function (idx, e){
        $("#itemAmt" + idx).val(comma(uncommaN($("#itemUnitAmt" + idx).val()) * uncomma($("#itemEa" + idx).val())));

        // if($("#purcItemAmt" + idx).val() != "" && $("#purcItemAmt" + idx).val() != "0"){
        //     $("#difAmt" + idx).val(comma(uncommaN($("#purcItemAmt" + idx).val()) - uncommaN($("#itemAmt" + idx).val())));
        // }

        reqCl.vatCalcN();

        return inputNumberFormatN(e);
    },

    addRow : function(){
        reqCl.global.createHtmlStr = "";

        // reqCl.global.itemIndex++;

        reqCl.global.createHtmlStr = "" +
            '<tr class="claimItem newArray" id="item' + reqCl.global.itemIndex + '">' +
            // '   <td style="text-align: center">' +
            // '           <div id="claimIndex">' + (reqCl.global.itemIndex + 1) + '</div>' +
            // '       </td>' +
            '           <td>' +
            '               <input type="hidden" id="purcItemSn' + reqCl.global.itemIndex + '" name="purcItemSn0" class="purcItemSn">' +
            '               <input type="text" id="purcItemType' + reqCl.global.itemIndex + '" class="purcItemType" style="width: 110px">' +
            '               <input type="text" id="productA' + reqCl.global.itemIndex + '" class="productA" style="width: 110px">' +
            '               <input type="text" id="productB' + reqCl.global.itemIndex + '" class="productB" style="width: 110px; display: none">' +
            '               <input type="text" id="productC' + reqCl.global.itemIndex + '" class="productC" style="width: 110px; display: none">' +
            '       </td>' +
            '       <td>' +
            '           <input type="text" id="itemNm' + reqCl.global.itemIndex + '" class="itemNm">' +
            '       </td>' +
            '       <td>' +
            '           <input type="text" id="itemStd' + reqCl.global.itemIndex + '" class="itemStd">' +
            '       </td>' +
            '       <td>' +
            '           <input type="text" id="itemEa' + reqCl.global.itemIndex + '" style="text-align: right" class="itemEa" onkeyup="reqCl.fn_calcN(\'' + reqCl.global.itemIndex + '\', this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
            '       </td>' +
            '       <td>' +
            '           <input type="text" id="itemUnitAmt' + reqCl.global.itemIndex + '" style="text-align: right" class="itemUnitAmt" onkeyup="reqCl.fn_calcN(\'' + reqCl.global.itemIndex + '\', this)" oninput="this.value = this.value.replace(/[^-0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
            '       </td>' +
            '       <td>' +
            '           <input type="text" id="itemUnit' + reqCl.global.itemIndex + '" class="itemUnit">' +
            '       </td>' +
            '       <td>' +
            '           <input type="text" id="purcSupAmt' + reqCl.global.itemIndex + '" class="purcSupAmt" onkeyup="reqCl.fn_calc('+reqCl.global.itemIndex+')" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" style="text-align: right">' +
            '       </td>' +
            '       <td>' +
            '           <input type="text" id="purcVatAmt' + reqCl.global.itemIndex + '" class="purcVatAmt" onkeyup="reqCl.fn_vatChange('+reqCl.global.itemIndex+')" oninput="this.value = this.value.replace(/[^-0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" style="text-align: right">' +
            '       </td>' +
            '       <td>' +
            '           <input type="text" id="itemAmt' + reqCl.global.itemIndex + '" class="itemAmt" style="text-align: right" onkeyup="reqCl.fn_calc('+reqCl.global.itemIndex+')" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
            '       </td>' +
            // '       <td>' +
            // '           <input type="text" id="purcItemAmt' + reqCl.global.itemIndex + '" class="purcItemAmt" style="text-align: right" disabled onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
            // '       </td>' +
            // '       <td>' +
            // '           <input id="difAmt' + reqCl.global.itemIndex + '" class="difAmt" value="'+comma(0)+'" style="text-align: right" onkeyup="reqCl.fn_calcN(\'' + reqCl.global.itemIndex + '\', this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
            // '       </td>' +
            '       <td>' +
            '           <label for="itemEtc' + reqCl.global.itemIndex + '"></label><input type="text" id="itemEtc' + reqCl.global.itemIndex + '" class="itemEtc">' +
            '       </td>' +
            '       <td style="text-align: center" class="listDelBtn">' +
            '           <button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="reqCl.fn_delete(' + reqCl.global.itemIndex + ')">' +
            '               <span class="k-button-text">삭제</span>' +
            '           </button>' +
            '       </td>' +
            '</tr>';

        $("#claimTbody").append(reqCl.global.createHtmlStr);

        var dataSourceB = [
            { text: "구매", value: "1"},
        ]
        customKendo.fn_dropDownList("purcItemType" + reqCl.global.itemIndex, dataSourceB, "text", "value", 2);


        customKendo.fn_textBox(["itemNm" + reqCl.global.itemIndex, "itemStd" + reqCl.global.itemIndex, "difAmt" + reqCl.global.itemIndex, "purcSupAmt" + reqCl.global.itemIndex, "purcVatAmt" + reqCl.global.itemIndex,
            ,"itemEa" + reqCl.global.itemIndex, "itemUnitAmt" + reqCl.global.itemIndex, "itemUnit" + reqCl.global.itemIndex, "itemAmt" + reqCl.global.itemIndex, "purcItemAmt" + reqCl.global.itemIndex, "itemEtc" + reqCl.global.itemIndex])

        let productsDataSource = customKendo.fn_customAjax("/system/commonCodeManagement/getCmCodeList", {cmGroupCodeId: "38"});
        customKendo.fn_dropDownList("purcItemType" + reqCl.global.itemIndex, productsDataSource, "CM_CODE_NM", "CM_CODE", 2);

        let productADataSource = customKendo.fn_customAjax("/projectMng/getProductCodeInfo", {productGroupCodeId: 1}).list;
        customKendo.fn_dropDownList("productA" + reqCl.global.itemIndex, productADataSource, "PRODUCT_DT_CODE_NM", "PRODUCT_DT_CODE", 2);

        var radioProdDataSource = [
            { label: "해당없음", value: "N" },
            { label: "자산", value: "A" },
            { label: "유지보수", value: "E" },
        ]

        customKendo.fn_radioGroup("prodCd" + reqCl.global.itemIndex, radioProdDataSource, "horizontal");

        $(".productA").each(function (){

            var productId = $(this).attr("id");

            if(productId != null){
                reqCl.fn_productCodeSetting(productId);
            }
        });

        // 디폴트 선택
        $("#purcItemType" + reqCl.global.itemIndex).data("kendoDropDownList").select(1);
        $("#productA" + reqCl.global.itemIndex).data("kendoDropDownList").select(2);
        reqCl.global.itemIndex++;
    },

    fn_productCodeSetting : function(productId){
        var productId = productId;
        var regex = /[^0-9]/g;
        var i = productId.replace(regex, "");

        $("#productA" + i).bind("change", function(){
            if($("#productA" + i).data("kendoDropDownList").value() == "" || $("#productA" + i).data("kendoDropDownList").text() != "캠아이템"){
                if($("#productA" + i).data("kendoDropDownList").text() != "캠아이템"){
                    try{
                        $("#productB" + i).data("kendoDropDownList").wrapper.hide();
                        $("#productC" + i).data("kendoDropDownList").wrapper.hide();
                    }catch{

                    }
                }
                return;
            }
            $("#productB" +  i).val("");
            let data = {
                productGroupCodeId: 2,
                parentCodeId: $("#productA" + i).data("kendoDropDownList").value(),
                parentCodeName: $("#productA" + i).data("kendoDropDownList").text(),
            }
            let productBDataSource = customKendo.fn_customAjax("/projectMng/getProductCodeInfo", data).list;
            customKendo.fn_dropDownList("productB" + i, productBDataSource, "PRODUCT_DT_CODE_NM", "PRODUCT_DT_CODE", 2);
        });

        $("#productB" + i).bind("change", function(){
            if($("#productB" + i).data("kendoDropDownList").value() == ""){
                return;
            }
            $("#productC" + i).val("");
            let data = {
                productGroupCodeId: 3,
                parentCodeId: $("#productB" + i).data("kendoDropDownList").value(),
                parentCodeName: $("#productB" + i).data("kendoDropDownList").text(),
            }
            let productCDataSource = customKendo.fn_customAjax("/projectMng/getProductCodeInfo", data).list;
            customKendo.fn_dropDownList("productC" + i, productCDataSource, "PRODUCT_DT_CODE_NM", "PRODUCT_DT_CODE", 2);
        });
    },

    fn_delete : function(e){
        // var len = $("#claimTbody > tr").length
        //
        // if(len > 1){
        //     $(e).closest("tr").remove()
        // }

        if($(".claimItem").length > 1){
            $("#item" + e).remove();
        }

        reqCl.vatCalcN();
    },

    fn_save : function(){
        var parameters = {
            purcSn : $("#purcSn").val(),
            purcEmpSeq : $("#purcEmpSeq").val(),
            purcDeptSeq : $("#purcDeptSeq").val(),
            purcEmpName : $("#purcEmpName").val(),
            purcDeptName : $("#purcDeptName").val(),
            claimDe : $("#claimDe").val(),
            expDe : $("#expDe").val(),
            goodsDt : $("#goodsDt").val(),
            purcType : $("#purcType").data("kendoRadioGroup").value(),
            pjtSn : $("#pjtSn").val(),
            pjtNm : $("#pjtNm").val(),
            //expType : $("#expType").data("kendoRadioGroup").value(),
            claimEtc : $("#claimEtc").val(),
            loginEmpSeq : $("#loginEmpSeq").val(),
            claimTitle : $("#claimTitle").val(),
            purcReqPurpose : $("#purcReqPurpose").val(),
            crmSn : $("#crmSn").val(),
            crmNm : $("#crmNm").val(),
            vat : $("#vat").data("kendoRadioGroup").value(),
            // discountAmt : uncommaN($("#discountAmt").val()),
            loginEmpSeq : $("#loginEmpSeq").val(),
            estAmt : uncommaN($("#estAmt").val()),
            vatAmt : uncommaN($("#vatAmt").val()),
            totAmt : uncommaN($("#totAmt").val()),
            itemSn : $("#itemSn").val(),

            paymentMethod : $("#paymentMethod").data("kendoRadioGroup").value(),
            purcLink : $("#purcLink").val(),
        }

        if($("#priPay").is(":checked")){
            parameters.priPay = "Y";
        } else {
            parameters.priPay = "N";
        }

        if($("#contYn").is(":checked")){
            parameters.contYn = "Y";
        } else {
            parameters.contYn = "N";
        }

        if($("#checkProfit").prop("checked")){
            parameters.checkProfit = "Y";
        } else {
            parameters.checkProfit = "N";
        }

        if($("#claimSn").val() != ""){
            parameters.claimSn = $("#claimSn").val();
        }

        if(parameters.loginEmpSeq == ""){
            alert("오류가 발생하였습니다. \n관리자에게 문의하세요.");
            return;
        }

        if(parameters.purcType != ""){
            if(parameters.pjtSn == ""){
                alert("프로젝트를 선택해주세요.");
                return;
            }
        }

        //if(parameters.expType == undefined || parameters.expType == null){
        //    alert("결제구분을 선택해주세요.");
        //    return;

        //}

        if(parameters.paymentMethod == undefined || parameters.paymentMethod == null){
            alert("비용지급방식을 선택해주세요.");
            return;
        }

        if(parameters.paymentMethod == "I"){
            if($("#purcLink").val() == ""){
                alert("구매링크를 입력해주세요."); return;
            }
        } else if(parameters.paymentMethod == "C"){
            // if(uncommaN($("#totAmt").val()) >= 300000){
            //     alert("현장(카드)결제는 부가세 포함 30만원 미만만 가능합니다."); return;
            // }
        }


        if(parameters.vat == undefined || parameters.vat == null){
            alert("부가세 분류를 선택해주세요.");
            return;
        }

        if(parameters.purcEmpSeq == ""){
            alert("구매요청자를 선택해주세요.");
            return;
        }

        if(parameters.claimTitle == ""){
            alert("제목을 입력해주세요.");
            return;
        }
        if(parameters.purcReqPurpose == ""){
            alert("구매목적을 입력해주세요.");
            return;
        }
        if(parameters.crmSn == ""){
            alert("구매업체를 선택해주세요.");
            return;
        }
        if(parameters.vat == ""){
            alert("부가세 방식을 선택해주세요.");
            return;
        }

        if(reqCl.global.attFiles.length == 0 && reqCl.global.fileArray.length == 0){
            alert("견적서를 등록해주세요.");
            return;
        }

        if($("#crmMonCheck").val() == "Y"){
            if(!confirm("월마감업체입니다. 할인율을 확인하세요.")){
                return;
            }
        }

        var len = $("#claimTbody > tr").length;

        var itemArr = new Array()
        var flag = true;
        var flag2 = true;
        var flag3 = true;
        var flag4 = true;
        var flag5 = true;
        var flag6 = true;
        $.each($(".claimItem"), function(i, v){
            var index = $(this).attr("id").replace(/[^0-9]/g, '');

            var data = {
                claimItemSn : $(this).find("#claimItemSn" + index).val(),
                itemNm : $("#itemNm" + index).val(),
                itemStd : $("#itemStd" + index).val(),
                itemEa : uncomma($("#itemEa" + index).val()),
                itemUnitAmt : uncommaN($("#itemUnitAmt" + index).val()),
                itemUnit : $("#itemUnit" + index).val(),
                itemAmt : uncommaN($("#itemAmt" + index).val()),
                purcSupAmt : uncommaN($("#purcSupAmt" + index).val()),
                purcVatAmt : uncommaN($("#purcVatAmt" + index).val()),
                // purcItemAmt : $("#purcItemAmt" + index).val() ? uncommaN($("#purcItemAmt" + i).val()) : 0,
                // difAmt : uncommaN($("#difAmt" + index).val()),
                itemEtc : $("#itemEtc" + index).val(),
                purcItemType : $("#purcItemType" + index).val(),
                productA : $("#productA" + index).val(),
                productB : $("#productB" + index).val(),
                productC : $("#productC" + index).val(),
            }

            if(data.productA == ""){flag = false;}
            if(data.itemNm == ""){flag2 = false;}
            if(data.itemStd == ""){flag3 = false;}
            if(data.itemUnitAmt == ""){flag4 = false;}
            if(data.itemEa == ""){flag5 = false;}
            if(data.itemUnit == ""){flag6 = false;}

            if($("#productA" + index).val() == "3"){
                if(data.productB == ""){
                    flag = false;
                }

                if(data.productC == ""){
                    flag = false;
                }
            }
            itemArr.push(data);
        })

        if(!flag){
            alert("구분값을 선택해주세요.");
            return ;
        }
        if(!flag2){
            alert("품명을 입력해주세요.");
            return ;
        }
        if(!flag3){
            alert("규격을 입력해주세요.");
            return ;
        }
        if(!flag4){
            alert("단가를 입력해주세요.");
            return ;
        }
        if(!flag5){
            alert("수량을 입력해주세요.");
            return ;
        }
        if(!flag6){
            alert("단위를 입력해주세요.");
            return ;
        }

        parameters.itemArr = JSON.stringify(itemArr);

        var formData = new FormData();

        for(var key in parameters){
            formData.append(key, parameters[key]);
        }

        /** 증빙파일 첨부파일 */
        if(reqCl.global.attFiles != null){
            for(var i = 0; i < reqCl.global.attFiles.length; i++){
                formData.append("file1", reqCl.global.attFiles[i]);
            }
        }


        $.ajax({
            url : "/purc/setPurcClaimData",
            data : formData,
            type : "post",
            dataType : "json",
            contentType: false,
            processData: false,
            enctype : 'multipart/form-data',
            async: false,
            success : function(rs){
                if(rs.code == 200){
                    alert("저장되었습니다.");

                    var url = "/purc/pop/reqClaiming.do?claimSn=" + rs.params.claimSn;
                    if($("#purcSn").val() != ""){
                        url += "&purcSn=" + $("#purcSn").val();
                    }
                    location.href = url;

                }
            }
        });
    },
    fn_projectPop : function(){

        var url = "/project/pop/projectView.do?busnClass="+ $("input[name='purcType']:checked").val();

        var name = "_blank";
        var option = "width = 1100, height = 700, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    fn_setItem : function(e){
        console.log("fn_setItem");
        $("#crmSn").val(e.itemList[0].CRM_SN);
        $("#crmNm").val(e.itemList[0].CRM_NM);

        var len = e.itemList.length;
        // var index = 0;
        reqCl.global.createHtmlStr = '';
        $("#claimTbody").html("");

        for(var i = 0 ; i < len ; i++) {
            if (e.itemList[i].STATUS == "C") {
                reqCl.global.createHtmlStr += "" +
                    '<tr class="claimItem newArray" id="item' + reqCl.global.itemIndex + '">' +
                    // '   <td style="text-align: center">' +
                    // '           <div id="claimIndex">'+(reqCl.global.itemIndex+1)+'</div>' +
                    // '           <input type="hidden" id="claimItemSn'+reqCl.global.itemIndex+'" />' +
                    // '       </td>' +
                    '       <td>' +
                    '           <input type="hidden" id="purcItemSn' + reqCl.global.itemIndex + '" name="purcItemSn0" class="purcItemSn">' +
                    '           <input type="text" id="purcItemType' + reqCl.global.itemIndex + '" class="purcItemType" style="width: 110px">' +
                    '           <input type="text" id="productA' + reqCl.global.itemIndex + '" class="productA" style="width: 110px">' +
                    '           <input type="text" id="productB' + reqCl.global.itemIndex + '" class="productB" style="width: 110px; display: none">' +
                    '           <input type="text" id="productC' + reqCl.global.itemIndex + '" class="productC" style="width: 110px; display: none">' +
                    '       </td>' +
                    '       <td>' +
                    '           <input type="text" id="itemNm' + reqCl.global.itemIndex + '" class="itemNm" value="' + e.itemList[i].PURC_ITEM_NAME + '">' +
                    '       </td>' +
                    '       <td>' +
                    '           <input type="text" id="itemStd' + reqCl.global.itemIndex + '" class="itemStd" value="' + e.itemList[i].PURC_ITEM_STD + '">' +
                    '       </td>' +
                    '       <td>' +
                    '           <input type="text" id="itemEa' + reqCl.global.itemIndex + '" style="text-align: right" class="itemEa" value="' + comma(e.itemList[i].PURC_ITEM_QTY) + '" onkeyup="reqCl.fn_calcN(\'' + reqCl.global.itemIndex + '\', this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                    '       </td>' +
                    '       <td>' +
                    '           <input type="text" id="itemUnitAmt' + reqCl.global.itemIndex + '" style="text-align: right" class="itemUnitAmt" value="' + comma(e.itemList[i].PURC_ITEM_UNIT_PRICE) + '" onkeyup="reqCl.fn_calcN(\'' + reqCl.global.itemIndex + '\', this)" oninput="this.value = this.value.replace(/[^-0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                    '       </td>' +
                    '       <td>' +
                    '           <input type="text" id="itemUnit' + reqCl.global.itemIndex + '" class="itemUnit" value="' + e.itemList[i].PURC_ITEM_UNIT + '">' +
                    '       </td>' +
                    '       <td>' +
                    '           <input type="text" id="purcSupAmt' + reqCl.global.itemIndex + '" class="purcSupAmt" disabled onkeyup="reqCl.fn_calc('+reqCl.global.itemIndex+')" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\..*)\./g, \'$1\');" style="text-align: right">' +
                    '       </td>' +
                    '       <td>' +
                    '           <input type="text" id="purcVatAmt' + reqCl.global.itemIndex + '" class="purcVatAmt" disabled onkeyup="reqCl.fn_vatChange('+reqCl.global.itemIndex+')" oninput="this.value = this.value.replace(/[^-0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" style="text-align: right">' +
                    '       </td>' +
                    '       <td>' +
                    '           <input type="text" id="itemAmt' + reqCl.global.itemIndex + '" class="itemAmt" style="text-align: right" value="' + comma(e.itemList[i].PURC_ITEM_AMT) + '" disabled onkeyup="reqCl.fn_calc('+reqCl.global.itemIndex+')" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                    '       </td>' +
                    // '       <td>' +
                    // '           <input id="purcItemAmt' + reqCl.global.itemIndex + '" class="purcItemAmt" value="' + comma(e.itemList[i].PURC_ITEM_AMT) + '" style="text-align: right" disabled onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                    // '       </td>' +
                    // '       <td>' +
                    // '           <input id="difAmt' + reqCl.global.itemIndex + '" class="difAmt" value="' + comma(e.itemList[i].DISCOUNT_AMT) + '" style="text-align: right" onkeyup="reqCl.fn_calcN(\'' + reqCl.global.itemIndex + '\', this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                    // '       </td>' +
                    '       <td>' +
                    '           <label for="itemEtc' + reqCl.global.itemIndex + '"></label><input type="text" id="itemEtc' + reqCl.global.itemIndex + '" value="' + e.itemList[i].RMK + '" class="itemEtc">' +
                    '       </td>' +
                    // '       <td>' +
                    // '           <span id="prodCd'+index+'"></span>' +
                    // '       </td>' +
                    '       <td style="text-align: center" class="listDelBtn">' +
                    '           <button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="reqCl.fn_delete(' + reqCl.global.itemIndex + ')">' +
                    '               <span class="k-button-text">삭제</span>' +
                    '           </button>' +
                    '       </td>' +
                    '</tr>';

                reqCl.global.itemIndex++;
            }
        }

        $("#claimTbody").append(reqCl.global.createHtmlStr);

        var tLen = $("#claimTbody > tr").length;
        var radioProdDataSource = [
            { label: "해당없음", value: "N" },
            { label: "자산", value: "A" },
            { label: "유지보수", value: "E" },
        ]

        for(var i = 0 ; i < tLen ; i++){
            if(i == 0){
                customKendo.fn_textBox(["itemNm0", "itemStd0", "itemEa0", "itemUnitAmt0", "itemUnit0", "itemAmt0", "purcItemAmt0", "difAmt0", "itemEtc0", "purcSupAmt0", "purcVatAmt0"]);
                customKendo.fn_radioGroup("prodCd", radioProdDataSource, "horizontal");
            } else {
                customKendo.fn_textBox(["itemNm" + i, "itemStd" + i, "purcSupAmt" + i, "purcVatAmt" + i,
                    ,"itemEa" + i, "itemUnitAmt" + i, "itemUnit" + i, "itemAmt" + i, "purcItemAmt" + i, "difAmt" + i, "itemEtc" + i])

                customKendo.fn_radioGroup("prodCd" + i, radioProdDataSource, "horizontal");
            }
            var dataSource = [
                { text: "구매", value: "1"},
            ]
            customKendo.fn_dropDownList("purcItemType" + i, dataSource, "text", "value", 2);

            let productsDataSource = customKendo.fn_customAjax("/system/commonCodeManagement/getCmCodeList", {cmGroupCodeId: "38"});
            customKendo.fn_dropDownList("purcItemType" + i, productsDataSource, "CM_CODE_NM", "CM_CODE", 2);


            let productADataSource = customKendo.fn_customAjax("/projectMng/getProductCodeInfo", {productGroupCodeId: 1}).list;
            customKendo.fn_dropDownList("productA" + i, productADataSource, "PRODUCT_DT_CODE_NM", "PRODUCT_DT_CODE", 2);

            $("#purcItemSn" + i).val(e.itemList[i].PURC_ITEM_SN);
            $("#purcItemType"+i).data("kendoDropDownList").value(e.itemList[i].PURC_ITEM_TYPE);
            $("#productA"+i).data("kendoDropDownList").value(e.itemList[i].PRODUCT_A);

            reqCl.fn_productCodeSetting("a"+ i);
            let data = {
                productGroupCodeId: 2,
                parentCodeId: $("#productA" + i).data("kendoDropDownList").value(),
                parentCodeName: $("#productA" + i).data("kendoDropDownList").text(),
            }

            $("#productB" + i).val("");
            if(e.itemList[i].PRODUCT_A == 3){
                let productBDataSource = customKendo.fn_customAjax("/projectMng/getProductCodeInfo", data).list;
                customKendo.fn_dropDownList("productB" + i, productBDataSource, "PRODUCT_DT_CODE_NM", "PRODUCT_DT_CODE", 2);

                $("#productC" + i).val("");
                data = {
                    productGroupCodeId: 3,
                    parentCodeId: $("#productB" + i).data("kendoDropDownList").value(),
                    parentCodeName: $("#productB" + i).data("kendoDropDownList").text(),
                }
                let productCDataSource = customKendo.fn_customAjax("/projectMng/getProductCodeInfo", data).list;
                customKendo.fn_dropDownList("productC" + i, productCDataSource, "PRODUCT_DT_CODE_NM", "PRODUCT_DT_CODE", 2);
            }

            if(e.itemList[i].PRODUCT_A != null){
                $("#productA" + i).data("kendoDropDownList").value(e.itemList[i].PRODUCT_A);
                $("#productA" + i).trigger("change");
            }
            if(e.itemList[i].PRODUCT_A == 3){
                if(e.itemList[i].PRODUCT_B != null){
                    $("#productB" + i).data("kendoDropDownList").value(e.itemList[i].PRODUCT_B);
                    $("#productB" + i).trigger("change");
                }
                if(e.itemList[i].PRODUCT_C != null){
                    $("#productC" + i).data("kendoDropDownList").value(e.itemList[i].PRODUCT_C);
                }
            }


        }

        this.fn_amtCalculator();
    },

    fn_setClaimItem : function(e){
        console.log("fn_setClaimItem");
        var len = e.itemList.length;
        reqCl.global.createHtmlStr = '';
        $("#claimTbody").html("");
        for(var i = 0 ; i < len ; i++){
            reqCl.global.createHtmlStr += "" +
                '<tr class="claimItem newArray" id="item'+reqCl.global.itemIndex+'">' +
                // '   <td style="text-align: center">' +
                // '           <div id="claimIndex">'+(reqCl.global.itemIndex+1)+'</div>' +
                // '           <input type="hidden" id="claimItemSn'+reqCl.global.itemIndex+'" value="'+e.itemList[i].CLAIM_ITEM_SN+'" />' +
                // '       </td>' +
                '       <td>' +
                '           <input type="hidden" id="purcItemSn'+reqCl.global.itemIndex+'" name="purcItemSn0" class="purcItemSn">' +
                '           <input type="text" id="purcItemType'+reqCl.global.itemIndex+'" class="purcItemType" style="width: 110px">' +
                '           <input type="text" id="productA'+reqCl.global.itemIndex+'" class="productA" style="width: 110px">' +
                '           <input type="text" id="productB'+reqCl.global.itemIndex+'" class="productB" style="width: 110px; display: none">' +
                '           <input type="text" id="productC'+reqCl.global.itemIndex+'" class="productC" style="width: 110px; display: none">' +
                '       </td>' +
                '       <td>' +
                '           <input type="text" id="itemNm'+reqCl.global.itemIndex+'" class="itemNm" value="'+e.itemList[i].ITEM_NM+'">' +
                '       </td>' +
                '       <td>' +
                '           <input type="text" id="itemStd'+reqCl.global.itemIndex+'" class="itemStd" value="'+e.itemList[i].ITEM_STD+'">' +
                '       </td>' +
                '       <td>' +
                '           <input type="text" id="itemEa'+reqCl.global.itemIndex+'" style="text-align: right" class="itemEa" value="'+comma(e.itemList[i].ITEM_EA)+'" onkeyup="reqCl.fn_calcN(\''+reqCl.global.itemIndex+'\', this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                '       </td>' +
                '       <td>' +
                '           <input type="text" id="itemUnitAmt'+reqCl.global.itemIndex+'" style="text-align: right" class="itemUnitAmt" value="'+comma(e.itemList[i].ITEM_UNIT_AMT)+'" onkeyup="reqCl.fn_calcN(\''+reqCl.global.itemIndex+'\', this)" oninput="this.value = this.value.replace(/[^-0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                '       </td>' +
                '       <td>' +
                '           <input type="text" id="itemUnit'+reqCl.global.itemIndex+'" class="itemUnit" value="'+e.itemList[i].ITEM_UNIT+'">' +
                '       </td>' +
                '       <td>' +
                '           <input type="text" id="purcSupAmt' + reqCl.global.itemIndex + '" class="purcSupAmt" value="'+comma(e.itemList[i].PURC_SUP_AMT)+'" disabled onkeyup="reqCl.fn_calc('+reqCl.global.itemIndex+')" oninput="this.value = this.value.replace(/[^-0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" style="text-align: right">' +
                '       </td>' +
                '       <td>' +
                '           <input type="text" id="purcVatAmt' + reqCl.global.itemIndex + '" class="purcVatAmt" value="'+comma(e.itemList[i].PURC_VAT_AMT)+'" disabled onkeyup="reqCl.fn_vatChange('+reqCl.global.itemIndex+')" oninput="this.value = this.value.replace(/[^-0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" style="text-align: right">' +
                '       </td>' +
                '       <td>' +
                '           <input type="text" id="itemAmt'+reqCl.global.itemIndex+'" class="itemAmt" value="'+comma(e.itemList[i].ITEM_AMT)+'" style="text-align: right" disabled onkeyup="reqCl.fn_calc('+reqCl.global.itemIndex+')" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                '       </td>' +
                // '       <td>' +
                // '           <input type="text" id="purcItemAmt'+reqCl.global.itemIndex+'" class="purcItemAmt" value="'+comma(e.itemList[i].PURC_ITEM_AMT)+'" style="text-align: right" disabled onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                // '       </td>' +
                // '       <td>' +
                // '           <input type="text" id="difAmt'+reqCl.global.itemIndex+'" class="difAmt" value="'+comma(e.itemList[i].DIF_AMT)+'" style="text-align: right" onkeyup="reqCl.fn_calcN(\'' + reqCl.global.itemIndex + '\', this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                // '       </td>' +
                '       <td>' +
                '           <label for="itemEtc'+reqCl.global.itemIndex+'"></label><input type="text" id="itemEtc'+reqCl.global.itemIndex+'" value="'+e.itemList[i].ITEM_ETC+'" class="itemEtc">' +
                '       </td>' +
                '       <td style="text-align: center" class="listDelBtn">' +
                '           <button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="reqCl.fn_delete('+reqCl.global.itemIndex+')">' +
                '               <span class="k-button-text">삭제</span>' +
                '           </button>' +
                '       </td>' +
                '</tr>';


            reqCl.global.itemIndex++;
        }

        $("#claimTbody").append(reqCl.global.createHtmlStr);

        var tLen = $("#claimTbody > tr").length;
        var radioProdDataSource = [
            { label: "해당없음", value: "N" },
            { label: "자산", value: "A" },
            { label: "유지보수", value: "E" },
        ]
        var flag = true;

        for(var i = 0 ; i < tLen ; i++){
            if(i == 0){
                customKendo.fn_textBox(["itemNm0", "itemStd0", "itemEa0", "itemUnitAmt0", "itemUnit0", "purcSupAmt0", "purcVatAmt0", "itemAmt0", "purcItemAmt0", "difAmt0", "itemEtc0"]);
                customKendo.fn_radioGroup("prodCd", radioProdDataSource, "horizontal");

                // $("#prodCd").data("kendoRadioGroup").value(e.itemList[i].PROD_CD);
            } else {
                customKendo.fn_textBox(["itemNm" + i, "itemStd" + i, "difItemAmt" + i, "purcSupAmt" + i, "purcVatAmt" + i,
                    ,"itemEa" + i, "itemUnitAmt" + i, "itemUnit" + i, "itemAmt" + i, "purcItemAmt" + i, "difAmt" + i, "itemEtc" + i])

                customKendo.fn_radioGroup("prodCd" + i, radioProdDataSource, "horizontal");
                // $("#prodCd" + i).data("kendoRadioGroup").value(e.itemList[i].PROD_CD);
            }

            var dataSource = [
                { text: "구매", value: "1"},
            ]
            customKendo.fn_dropDownList("purcItemType" + i, dataSource, "text", "value", 2);

            let productsDataSource = customKendo.fn_customAjax("/system/commonCodeManagement/getCmCodeList", {cmGroupCodeId: "38"});
            customKendo.fn_dropDownList("purcItemType" + i, productsDataSource, "CM_CODE_NM", "CM_CODE", 2);


            let productADataSource = customKendo.fn_customAjax("/projectMng/getProductCodeInfo", {productGroupCodeId: 1}).list;
            customKendo.fn_dropDownList("productA" + i, productADataSource, "PRODUCT_DT_CODE_NM", "PRODUCT_DT_CODE", 2);

            $("#purcItemSn" + i).val(e.itemList[i].PURC_ITEM_SN);
            $("#purcItemType"+i).data("kendoDropDownList").value(e.itemList[i].PURC_ITEM_TYPE);
            $("#productA"+i).data("kendoDropDownList").value(e.itemList[i].PRODUCT_A);

            reqCl.fn_productCodeSetting("a"+ i);

            let data = {
                productGroupCodeId: 2,
                parentCodeId: $("#productA" + i).data("kendoDropDownList").value(),
                parentCodeName: $("#productA" + i).data("kendoDropDownList").text(),
            }

            $("#productB" + i).val("");
            if(e.itemList[i].PRODUCT_A == 3){
                let productBDataSource = customKendo.fn_customAjax("/projectMng/getProductCodeInfo", data).list;
                customKendo.fn_dropDownList("productB" + i, productBDataSource, "PRODUCT_DT_CODE_NM", "PRODUCT_DT_CODE", 2);

                $("#productC" + i).val("");
                data = {
                    productGroupCodeId: 3,
                    parentCodeId: $("#productB" + i).data("kendoDropDownList").value(),
                    parentCodeName: $("#productB" + i).data("kendoDropDownList").text(),
                }
                let productCDataSource = customKendo.fn_customAjax("/projectMng/getProductCodeInfo", data).list;
                customKendo.fn_dropDownList("productC" + i, productCDataSource, "PRODUCT_DT_CODE_NM", "PRODUCT_DT_CODE", 2);

            }



            if(e.itemList[i].PRODUCT_A != null){
                $("#productA" + i).data("kendoDropDownList").value(e.itemList[i].PRODUCT_A);
                $("#productA" + i).trigger("change");
            }
            if(e.itemList[i].PRODUCT_A == 3){
                if(e.itemList[i].PRODUCT_B != null){
                    $("#productB" + i).data("kendoDropDownList").value(e.itemList[i].PRODUCT_B);
                    $("#productB" + i).trigger("change");
                }
                if(e.itemList[i].PRODUCT_C != null){
                    $("#productC" + i).data("kendoDropDownList").value(e.itemList[i].PRODUCT_C);
                }
            }

            if(e.itemList[i].PURC_VAT_AMT != null){
                flag = false;
            }
        }


        if(flag){
            this.fn_amtCalculator();
        }

        this.fn_vatChange();
    },

    fn_kendoUIEnableSet : function(claimMap){
        if(claimMap != null){
            /** 상신, 재상신, 최종결재완료 상태일때 UI비활성화 */
            if(claimMap.STATUS == "10" || claimMap.STATUS == "50" || claimMap.STATUS == "100"){
                $(':radio').attr('disabled', true);
                $('.k-input-inner').attr('disabled', true);
                $("#pjtSelBtn").css("display", "none");
                $("#claimDe").data("kendoDatePicker").enable(false);
                $("#expDe").data("kendoDatePicker").enable(false);
                $("#stfs").css("display", "none");
                $("#crmSelBtn").css("display", "none");
                $(".listDelBtn").text("-");
                $("#addBtn").css("display", "none");
                $("#saveBtn").css("display", "none");
            }
        }
    },

    fn_ClaimBtnSet : function(claimMap){
        let html = makeApprBtnHtml(claimMap, 'reqCl.claimDrafting()');
        $("#claimBtnBox").html(html);

        if(claimMap != null && claimMap.DOC_ID != null){
            reDraftOnlyOne(claimMap.DOC_ID, $("#reqEmpSeq").val(), "reBtn");
        }
    },

    claimDrafting : function(){
        $("#claimDraftFrm").one("submit", function() {
            var url = "/popup/cam_purc/approvalFormPopup/claimingApprovalPop.do";
            var name = "_self";
            var option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=yes, scrollbars = yes, status=no, top=50, left=50"
            var popup = window.open(url, name, option);
            this.action = "/popup/cam_purc/approvalFormPopup/claimingApprovalPop.do";
            this.method = 'POST';
            this.target = '_self';
        }).trigger("submit");
    },

    addFileInfoTable : function (){
        let size = 0;
        let attFiles = reqCl.global.attFiles;

        var html = '';

        for(var i = 0; i < $("input[name='fileList']")[0].files.length; i++){
            attFiles.push($("input[name='fileList']")[0].files[i]);
        }

        if(attFiles.length > 0){
            $("#fileGrid").find(".defultTr").remove();
            $("#fileGrid").find(".addFile").remove();
            for (var i = 0; i < attFiles.length; i++) {
                size = attFiles[i].size > 0 ? fCommon.bytesToKB(attFiles[i].size) : '0 KB';
                var fileName = attFiles[i].name.substring(0, attFiles[i].name.lastIndexOf("."));
                var fileExt = attFiles[i].name.substring(attFiles[i].name.lastIndexOf(".") + 1);

                html += '<tr style="text-align: center;padding-top: 10px;" class="addFile">';
                html += '   <td>' + fileName + '</td>';
                html += '   <td>' + fileExt + '</td>';
                html += '   <td>' + size + '</td>';
                html += '   <td>';
                html += '       <input type="button" value="삭제" class="k-button k-rounded k-button-solid k-button-solid-error" onclick="reqCl.fnUploadFile(' + i + ')">'
                html += '   </td>';

                html += '</tr>';
            }
        }

        $("#fileGrid").append(html);
    },

    fnUploadFile : function(e){
        let size = 0;
        const dataTransfer = new DataTransfer();
        let fileArray2 = Array.from(reqCl.global.attFiles);
        fileArray2.splice(e, 1);
        fileArray2.forEach(file => {
            dataTransfer.items.add(file);
        });

        reqCl.global.attFiles = dataTransfer.files;

        var fileArray = [];
        fileArray = reqCl.global.attFiles;
        if(fileArray.length > 0){
            $("#fileGrid").find(".addFile").remove();

            var html = '';
            for (var i = 0; i <fileArray.length; i++) {
                var fileName = fileArray[i].name.substring(0, fileArray[i].name.lastIndexOf("."));
                var fileExt = fileArray[i].name.substring(fileArray[i].name.lastIndexOf(".") + 1);

                size = fCommon.bytesToKB(fileArray[i].size);
                html += '<tr style="text-align: center;" class="addFile">';
                html += '   <td>' + fileName + '</td>';
                html += '   <td>' + fileExt + '</td>';
                html += '   <td>' + size + '</td>';
                html += '   <td>';
                html += '       <input type="button" value="삭제" class="k-button k-rounded k-button-solid k-button-solid-error" onclick="reqCl.fnUploadFile(' + i + ')">';
                html += '   </td>';
                html += '</tr>';
            }

            $("#fileGrid").append(html);
        }else{
            $("#fileGrid").find(".addFile").remove();

            if($("#fileGrid").find("tr").length == 0){
                $("#fileGrid").html('<tr class="defultTr">' +
                    '	<td colspan="4" style="text-align: center;padding-top: 10px;">등록된 파일이 없습니다.</td>' +
                    '</tr>');
            }
        }

        if(reqCl.global.attFiles.length == 0){
            reqCl.global.attFiles = new Array();
        }

    },

    fn_vatChange : function(e){

        $("#purcVatAmt" + e).val(comma(uncommaN($("#purcVatAmt" + e).val())));

        var vatAmtVal = 0;
        $(".purcVatAmt").each(function(){
            vatAmtVal += Number(uncommaN(this.value));
        })

        if($("#vat").data("kendoRadioGroup").value() == 'Y'){
            $("#purcSupAmt" + e).val(comma(Number(uncommaN($("#itemAmt" + e).val())) - Number(uncommaN($("#purcVatAmt" + e).val()))));
        }


        $("#vatAmt").val(comma(vatAmtVal));
        $("#vatAmt").trigger("change")
    },

    /** 첨부파일 데이터 세팅 */
    settingTempFileDataInit: function(e){
        reqCl.global.fileArray = e;
        var html = '';
        if(e.length > 0){
            for(var i = 0; i < e.length; i++){
                html += '<tr style="text-align: center">';
                html += '   <td><span style="cursor: pointer" onclick="fileDown(\''+e[i].file_path+e[i].file_uuid+'\', \''+e[i].file_org_name+'.'+e[i].file_ext+'\')">'+e[i].file_org_name+'</span></td>';
                html += '   <td>'+ e[i].file_ext +'</td>';
                html += '   <td>'+ e[i].file_size +'</td>';
                html += '   <td>';
                if(e[i].CONTENT_ID.indexOf("purcClaim") == 0 && (reqCl.global.status == "0" || reqCl.global.status == "30" || reqCl.global.status == "40")){
                    html += '       <button type="button" class="k-button k-rounded k-button-solid k-button-solid-error" onclick="fCommon.commonFileDel('+ e[i].file_no +', this)">' +
                        '			    <span class="k-button-text">삭제</span>' +
                        '		    </button>';
                }
                html += '   </td>';
                html += '</tr>';
            }
            $("#fileGrid").html(html);
        }else{
            $("#fileGrid").html('<tr>' +
                '	<td colspan="5" style="text-align: center">선택된 파일이 없습니다.</td>' +
                '</tr>');
        }
    },

    fn_multiDownload : function (){
        var fileArray = reqCl.global.fileArray;

        if(fileArray.length > 0){
            for(let i=0; i<fileArray.length; i++){
                fileDown(fileArray[i].file_path+fileArray[i].file_uuid, fileArray[i].file_org_name+'.'+fileArray[i].file_ext);
            }
        }
    },
}