var reqCl = {



    fn_defaultScript : function(){

        customKendo.fn_textBox(["pjtNm", "purcDeptName", "purcEmpName", "claimEtc"
                                ,"claimTitle", "purcReqPurpose", "crmNm"
                                ,"estAmt", "vatAmt", "totAmt", "itemNm", "itemStd"
                                ,"itemEa", "itemUnitAmt", "itemUnit", "purcItemAmt", "itemAmt", "itemEtc", "difAmt"])

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
            } else {
                $("#project").css("display", "none");
                $("#pjtSn").val("");
                $("#pjtNm").val("");
            }
        });

        customKendo.fn_datePicker("claimDe", "month", "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("expDe", "month", "yyyy-MM-dd", new Date());

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

            if(data.purcFile != null){
                reqCl.settingTempFileDataInit(data.purcFile);
            }

            $("#vat").data("kendoRadioGroup").value(data.VAT);
            $("#vat").data("kendoRadioGroup").trigger("change");

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

                $("#claimDe").val(data.CLAIM_DE);
                $("#expDe").val(data.EXP_DE);
                $("#claimTitle").val(data.CLAIM_TITLE);
                $("#claimEtc").val(data.CLAIM_ETC);
                $("#purcReqPurpose").val(data.PURC_REQ_PURPOSE);


                $("#estAmt").val(comma(data.EST_AMT));
                $("#vatAmt").val(comma(data.VAT_AMT));
                $("#totAmt").val(comma(data.TOT_AMT));

                $("#vat").data("kendoRadioGroup").value(data.VAT);

                $("#purcDeptName").val(data.DEPT_NAME);
                $("#purcDeptSeq").val(data.DEPT_SEQ);
                $("#purcEmpName").val(data.EMP_NAME_KR);
                $("#purcEmpSeq").val(data.EMP_SEQ);

                //$("#expType").data("kendoRadioGroup").value(data.EXP_TYPE);

                if(data.PRI_PAY == "Y"){
                    $("#priPay").prop("checked", true);
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

            if(data.purcFile != null){
                reqCl.settingTempFileDataInit(data.purcFile);
            }

            $("#claimDe").val(data.CLAIM_DE);
            $("#expDe").val(data.EXP_DE);
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

            $("#vat").data("kendoRadioGroup").value(data.VAT);

            //$("#expType").data("kendoRadioGroup").value(data.EXP_TYPE);

            $("#purcType").data("kendoRadioGroup").value(data.PURC_TYPE);

            if(data.PRI_PAY == "Y"){
                $("#priPay").prop("checked", true);
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

            this.fn_setClaimItem(data);
            reqCl.fn_kendoUIEnableSet(data);
            reqCl.fn_ClaimBtnSet(data);
        } else if($("#purcSn").val() == "" && $("#claimSn").val() == "") {
            // 디폴트 선택
            $("#purcItemType0").data("kendoDropDownList").select(1);
            $("#productA0").data("kendoDropDownList").select(2);
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
    },

    vatCalc : function(){
        let sum = 0;
        $.each($(".purcItemAmt"), function(){
            sum += Number(uncomma(this.value));
        });

        /** 견적가 500*/
        /** 미포함 500 50 550*/
        const sum2 = Math.floor(sum/10);

        /** 포함 455 45 500*/
        const sum3 = Math.ceil(sum / 1.1);
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
        $.each($(".itemAmt"), function(){
            sum += Number(uncommaN(this.value));
        });

        /** 견적가 500*/
        /** 미포함 500 50 550*/
        const sum2 = Math.floor(sum/10);

        /** 포함 455 45 500*/
        const sum3 = Math.ceil(sum / 1.1);
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

        if($("#purcItemAmt" + idx).val() != "" && $("#purcItemAmt" + idx).val() != "0"){
            $("#difAmt" + idx).val(comma(uncomma($("#purcItemAmt" + idx).val()) - uncomma($("#itemAmt" + idx).val())));
        }

        reqCl.fn_amtCalculator();


        return inputNumberFormat(e);
    },

    fn_calcN : function (idx, e){
        $("#itemAmt" + idx).val(comma(uncommaN($("#itemUnitAmt" + idx).val()) * uncomma($("#itemEa" + idx).val())));

        if($("#purcItemAmt" + idx).val() != "" && $("#purcItemAmt" + idx).val() != "0"){
            $("#difAmt" + idx).val(comma(uncommaN($("#purcItemAmt" + idx).val()) - uncommaN($("#itemAmt" + idx).val())));
        }

        reqCl.vatCalcN();

        return inputNumberFormatN(e);
    },

    addRow : function(){
        var len = $("#claimTbody > tr").length;
        var html = '';

        html += '<tr class="claimItem newArray" id="item'+len+'">';
        html += '   <td style="text-align: center">' +
            '           <div id="claimIndex">'+(len + 1)+'</div>' +
            '       </td>' +
            '           <td>' +
            '               <input type="hidden" id="purcItemSn' + len + '" name="purcItemSn0" class="purcItemSn">' +
            '               <input type="text" id="purcItemType' + len + '" class="purcItemType" style="width: 110px">' +
            '               <input type="text" id="productA' + len + '" class="productA" style="width: 110px">' +
            '               <input type="text" id="productB' + len + '" class="productB" style="width: 110px; display: none">' +
            '               <input type="text" id="productC' + len + '" class="productC" style="width: 110px; display: none">' +
            '       </td>' +
            '       <td>' +
            '           <input type="text" id="itemNm'+len+'" class="itemNm">' +
            '       </td>' +
            '       <td>' +
            '           <input type="text" id="itemStd'+len+'" class="itemStd">' +
            '       </td>' +
            '       <td>' +
            '           <input type="text" id="itemEa'+len+'" style="text-align: right" class="itemEa" onkeyup="reqCl.fn_calcN(\''+len+'\', this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
            '       </td>' +
            '       <td>' +
            '           <input type="text" id="itemUnitAmt'+len+'" style="text-align: right" class="itemUnitAmt" onkeyup="reqCl.fn_calcN(\''+len+'\', this)" oninput="this.value = this.value.replace(/[^-0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
            '       </td>' +
            '       <td>' +
            '           <input type="text" id="itemUnit'+len+'" class="itemUnit">' +
            '       </td>' +
            '       <td>' +
            '           <input type="text" id="itemAmt'+len+'" class="itemAmt" style="text-align: right" disabled onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
            '       </td>' +
            '       <td>' +
            '           <input type="text" id="purcItemAmt'+len+'" class="purcItemAmt" style="text-align: right" disabled onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
            '       </td>' +
            '       <td>' +
            '           <input id="difAmt'+len+'" class="difAmt" value="'+comma(0)+'" style="text-align: right" disabled onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
            '       </td>' +
            '       <td>' +
            '           <label for="itemEtc'+len+'"></label><input type="text" id="itemEtc'+len+'" class="itemEtc">' +
            '       </td>' +
            // '       <td>' +
            // '           <span id="prodCd'+len+'"></span>' +
            // '       </td>' +
            '       <td style="text-align: center" class="listDelBtn">' +
            '           <button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="reqCl.fn_delete(this)">' +
            '               <span class="k-button-text">삭제</span>' +
            '           </button>' +
            '       </td>';
        html += '</tr>';

        $("#claimTbody").append(html);

        var dataSourceB = [
            { text: "구매", value: "1"},
        ]
        customKendo.fn_dropDownList("purcItemType" + len, dataSourceB, "text", "value", 2);


        customKendo.fn_textBox(["itemNm" + len, "itemStd" + len, "difAmt" + len
            ,"itemEa" + len, "itemUnitAmt" + len, "itemUnit" + len, "itemAmt" + len, "purcItemAmt" + len, "itemEtc" + len])

        let productsDataSource = customKendo.fn_customAjax("/system/commonCodeManagement/getCmCodeList", {cmGroupCodeId: "38"});
        customKendo.fn_dropDownList("purcItemType" + len, productsDataSource, "CM_CODE_NM", "CM_CODE", 2);

        let productADataSource = customKendo.fn_customAjax("/projectMng/getProductCodeInfo", {productGroupCodeId: 1}).list;
        customKendo.fn_dropDownList("productA" + len, productADataSource, "PRODUCT_DT_CODE_NM", "PRODUCT_DT_CODE", 2);

        var radioProdDataSource = [
            { label: "해당없음", value: "N" },
            { label: "자산", value: "A" },
            { label: "유지보수", value: "E" },
        ]

        customKendo.fn_radioGroup("prodCd" + len, radioProdDataSource, "horizontal");

        $(".productA").each(function (){

            var productId = $(this).attr("id");

            if(productId != null){
                reqCl.fn_productCodeSetting(productId);
            }
        });

        // 디폴트 선택
        $("#purcItemType" + len).data("kendoDropDownList").select(1);
        $("#productA" + len).data("kendoDropDownList").select(2);
    },

    fn_productCodeSetting : function(productId){
        var i = productId.slice(-1);

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
        var len = $("#claimTbody > tr").length

        if(len > 1){
            $(e).closest("tr").remove()
        }
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
            loginEmpSeq : $("#loginEmpSeq").val(),
            estAmt : uncommaN($("#estAmt").val()),
            vatAmt : uncommaN($("#vatAmt").val()),
            totAmt : uncommaN($("#totAmt").val()),
            itemSn : $("#itemSn").val(),
        }

        if($("#priPay").is(":checked")){
            parameters.priPay = "Y";
        } else {
            parameters.priPay = "N";
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

        if(fCommon.global.attFiles.length == 0){
            alert("견적서를 등록해주세요.");
            return;
        }

        var len = $("#claimTbody > tr").length;

        var flag = true;
        var itemArr = new Array()
        for(var i = 0 ; i < len ; i++){
            var itemParameters = {};
            if(i == 0){
                if($("#claimItemSn").val() != ""){
                    itemParameters.claimItemSn = $("#claimItemSn").val();
                }
                itemParameters.itemNm = $("#itemNm").val();
                itemParameters.itemStd = $("#itemStd").val();
                itemParameters.itemEa = uncomma($("#itemEa").val());
                itemParameters.itemUnitAmt = uncommaN($("#itemUnitAmt").val());
                itemParameters.itemUnit = $("#itemUnit").val();
                itemParameters.itemAmt = uncommaN($("#itemAmt").val());
                itemParameters.purcItemAmt = $("#purcItemAmt").val() ? uncommaN($("#purcItemAmt").val()) : 0;
                itemParameters.difAmt = $("#difAmt").val().replace(/,/g, '');
                itemParameters.itemEtc = $("#itemEtc").val();
                // itemParameters.prodCd = $("#prodCd").data("kendoRadioGroup").value();
            } else {
                if($("#claimItemSn").val() != ""){
                    itemParameters.claimItemSn = $("#claimItemSn" + i).val();
                }
                itemParameters.itemNm = $("#itemNm" + i).val();
                itemParameters.itemStd = $("#itemStd" + i).val();
                itemParameters.itemEa = uncomma($("#itemEa" + i).val());
                itemParameters.itemUnitAmt = uncommaN($("#itemUnitAmt" + i).val());
                itemParameters.itemUnit = $("#itemUnit" + i).val();
                itemParameters.itemAmt = uncommaN($("#itemAmt" + i).val());
                itemParameters.purcItemAmt = $("#purcItemAmt").val() ? uncommaN($("#purcItemAmt").val()) : 0;
                itemParameters.difAmt = $("#difAmt" + i).val().replace(/,/g, '');
                itemParameters.itemEtc = $("#itemEtc" + i).val();
                // itemParameters.prodCd = $("#prodCd" + i).data("kendoRadioGroup").value();
            }

            itemParameters.purcItemType = $("#purcItemType" + i).val();
            itemParameters.productA = $("#productA" + i).val();
            itemParameters.productB = $("#productB" + i).val();
            itemParameters.productC = $("#productC" + i).val();

            if(itemParameters.itemNm != ""){
                itemArr.push(itemParameters);
            }

            if(itemParameters.productA == ""){
                flag = false;
            }

            if($("#productA" + i).val() == "3"){
                if(itemParameters.productB == ""){
                    flag = false;
                }

                if(itemParameters.productC == ""){
                    flag = false;
                }
            }
        }

        if(!flag){
            alert("구분값을 선택해주세요.");
            return ;
        }

        parameters.itemArr = JSON.stringify(itemArr);

        var formData = new FormData();

        for(var key in parameters){
            formData.append(key, parameters[key]);
        }

        /** 증빙파일 첨부파일 */
        if(fCommon.global.attFiles != null){
            for(var i = 0; i < fCommon.global.attFiles.length; i++){
                formData.append("file1", fCommon.global.attFiles[i]);
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

        $("#crmSn").val(e.itemList[0].CRM_SN);
        $("#crmNm").val(e.itemList[0].CRM_NM);

        var len = e.itemList.length;
        var index = 0;
        var html = '';
        $("#claimTbody").html("");

        for(var i = 0 ; i < len ; i++){
            if(e.itemList[i].STATUS == "C"){

                if(index == 0){
                    html += '<tr class="claimItem newArray" id="item">';
                    html += '   <td style="text-align: center">' +
                        '           <div id="claimIndex">'+(index+1)+'</div>' +
                        '           <input type="hidden" id="claimItemSn" />' +
                        '       </td>' +
                        '       <td>' +
                        '           <input type="hidden" id="purcItemSn0" name="purcItemSn0" class="purcItemSn">' +
                        '           <input type="text" id="purcItemType0" class="purcItemType" style="width: 110px">' +
                        '           <input type="text" id="productA0" class="productA" style="width: 110px">' +
                        '           <input type="text" id="productB0" class="productB" style="width: 110px; display: none">' +
                        '           <input type="text" id="productC0" class="productC" style="width: 110px; display: none">' +
                        '       </td>' +
                        '       <td>' +
                        '           <input type="text" id="itemNm" class="itemNm" value="'+e.itemList[i].PURC_ITEM_NAME+'">' +
                        '       </td>' +
                        '       <td>' +
                        '           <input type="text" id="itemStd" class="itemStd" value="'+e.itemList[i].PURC_ITEM_STD+'">' +
                        '       </td>' +
                        '       <td>' +
                        '           <input type="text" id="itemEa" style="text-align: right" value="'+comma(e.itemList[i].PURC_ITEM_QTY)+'" class="itemEa" onkeyup="reqCl.fn_calcN(\'\', this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                        '       </td>' +
                        '       <td>' +
                        '           <input type="text" id="itemUnitAmt" style="text-align: right" value="'+comma(e.itemList[i].PURC_ITEM_UNIT_PRICE)+'" class="itemUnitAmt" onkeyup="reqCl.fn_calcN(\'\', this)" oninput="this.value = this.value.replace(/[^-0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                        '       </td>' +
                        '       <td>' +
                        '           <input type="text" id="itemUnit" class="itemUnit" value="'+e.itemList[i].PURC_ITEM_UNIT+'">' +
                        '       </td>' +
                        '       <td>' +
                        '           <input type="text" id="itemAmt" class="itemAmt" value="'+comma(e.itemList[i].PURC_ITEM_AMT)+'" style="text-align: right" disabled onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                        '       </td>' +
                        '       <td>' +
                        '           <input id="purcItemAmt" class="purcItemAmt" value="'+comma(e.itemList[i].PURC_ITEM_AMT)+'" style="text-align: right" disabled onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                        '       </td>' +
                        '       <td>' +
                        '           <input id="difAmt" class="difAmt" value="'+comma(0)+'" style="text-align: right" disabled onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                        '       </td>' +
                        '       <td>' +
                        '           <label for="itemEtc"></label><input type="text" id="itemEtc" value="'+e.itemList[i].RMK+'" class="itemEtc">' +
                        '       </td>' +
                        // '       <td>' +
                        // '           <span id="prodCd"></span>' +
                        // '       </td>' +
                        '       <td style="text-align: center" class="listDelBtn">' +
                        '           <button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="reqCl.fn_delete(this)">' +
                        '               <span class="k-button-text">삭제</span>' +
                        '           </button>' +
                        '       </td>';
                    html += '</tr>';
                } else {
                    html += '<tr class="claimItem newArray" id="item'+len+'">';
                    html += '   <td style="text-align: center">' +
                        '           <div id="claimIndex">'+(index+1)+'</div>' +
                        '           <input type="hidden" id="claimItemSn'+index+'" />' +
                        '       </td>' +
                        '       <td>' +
                        '           <input type="hidden" id="purcItemSn'+index+'" name="purcItemSn0" class="purcItemSn">' +
                        '           <input type="text" id="purcItemType'+index+'" class="purcItemType" style="width: 110px">' +
                        '           <input type="text" id="productA'+index+'" class="productA" style="width: 110px">' +
                        '           <input type="text" id="productB'+index+'" class="productB" style="width: 110px; display: none">' +
                        '           <input type="text" id="productC'+index+'" class="productC" style="width: 110px; display: none">' +
                        '       </td>' +
                        '       <td>' +
                        '           <input type="text" id="itemNm'+index+'" class="itemNm" value="'+e.itemList[i].PURC_ITEM_NAME+'">' +
                        '       </td>' +
                        '       <td>' +
                        '           <input type="text" id="itemStd'+index+'" class="itemStd" value="'+e.itemList[i].PURC_ITEM_STD+'">' +
                        '       </td>' +
                        '       <td>' +
                        '           <input type="text" id="itemEa'+index+'" style="text-align: right" class="itemEa" value="'+comma(e.itemList[i].PURC_ITEM_QTY)+'" onkeyup="reqCl.fn_calcN(\''+index+'\', this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                        '       </td>' +
                        '       <td>' +
                        '           <input type="text" id="itemUnitAmt'+index+'" style="text-align: right" class="itemUnitAmt" value="'+comma(e.itemList[i].PURC_ITEM_UNIT_PRICE)+'" onkeyup="reqCl.fn_calcN(\''+index+'\', this)" oninput="this.value = this.value.replace(/[^-0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                        '       </td>' +
                        '       <td>' +
                        '           <input type="text" id="itemUnit'+index+'" class="itemUnit" value="'+e.itemList[i].PURC_ITEM_UNIT+'">' +
                        '       </td>' +
                        '       <td>' +
                        '           <input type="text" id="itemAmt'+index+'" class="itemAmt" style="text-align: right" value="'+comma(e.itemList[i].PURC_ITEM_AMT)+'" disabled onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                        '       </td>' +
                        '       <td>' +
                        '           <input id="purcItemAmt'+index+'" class="purcItemAmt" value="'+comma(e.itemList[i].PURC_ITEM_AMT)+'" style="text-align: right" disabled onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                        '       </td>' +
                        '       <td>' +
                        '           <input id="difAmt'+index+'" class="difAmt" value="'+comma(0)+'" style="text-align: right" disabled onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                        '       </td>' +
                        '       <td>' +
                        '           <label for="itemEtc'+index+'"></label><input type="text" id="itemEtc'+index+'" value="'+e.itemList[i].RMK+'" class="itemEtc">' +
                        '       </td>' +
                        // '       <td>' +
                        // '           <span id="prodCd'+index+'"></span>' +
                        // '       </td>' +
                        '       <td style="text-align: center" class="listDelBtn">' +
                        '           <button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="reqCl.fn_delete(this)">' +
                        '               <span class="k-button-text">삭제</span>' +
                        '           </button>' +
                        '       </td>';
                    html += '</tr>';
                }

                index++;
            }
        }


        $("#claimTbody").append(html);


        var tLen = $("#claimTbody > tr").length;
        var radioProdDataSource = [
            { label: "해당없음", value: "N" },
            { label: "자산", value: "A" },
            { label: "유지보수", value: "E" },
        ]

        for(var i = 0 ; i < tLen ; i++){
            if(i == 0){
                customKendo.fn_textBox(["itemNm", "itemStd", "itemEa", "itemUnitAmt", "itemUnit", "itemAmt", "purcItemAmt", "difAmt", "itemEtc"]);
                customKendo.fn_radioGroup("prodCd", radioProdDataSource, "horizontal");
            } else {
                customKendo.fn_textBox(["itemNm" + i, "itemStd" + i
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
        var len = e.itemList.length;
        var index = 0;
        var html = '';
        $("#claimTbody").html("");
        for(var i = 0 ; i < len ; i++){
            if(index == 0){
                html += '<tr class="claimItem newArray" id="item">';
                html += '   <td style="text-align: center">' +
                    '           <div id="claimIndex">'+(index+1)+'</div>' +
                    '           <input type="hidden" id="claimItemSn" value="'+e.itemList[i].CLAIM_ITEM_SN+'" />' +
                    '       </td>' +
                    '       <td>' +
                    '           <input type="hidden" id="purcItemSn0" name="purcItemSn0" class="purcItemSn">' +
                    '           <input type="text" id="purcItemType0" class="purcItemType" style="width: 110px">' +
                    '           <input type="text" id="productA0" class="productA" style="width: 110px">' +
                    '           <input type="text" id="productB0" class="productB" style="width: 110px; display: none">' +
                    '           <input type="text" id="productC0" class="productC" style="width: 110px; display: none">' +
                    '       </td>' +
                    '       <td>' +
                    '           <input type="text" id="itemNm" class="itemNm" value="'+e.itemList[i].ITEM_NM+'">' +
                    '       </td>' +
                    '       <td>' +
                    '           <input type="text" id="itemStd" class="itemStd" value="'+e.itemList[i].ITEM_STD+'">' +
                    '       </td>' +
                    '       <td>' +
                    '           <input type="text" id="itemEa" style="text-align: right" value="'+comma(e.itemList[i].ITEM_EA)+'" class="itemEa" onkeyup="reqCl.fn_calcN(\'\', this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                    '       </td>' +
                    '       <td>' +
                    '           <input type="text" id="itemUnitAmt" style="text-align: right" value="'+comma(e.itemList[i].ITEM_UNIT_AMT)+'" class="itemUnitAmt" onkeyup="reqCl.fn_calcN(\'\', this)" oninput="this.value = this.value.replace(/[^-0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                    '       </td>' +
                    '       <td>' +
                    '           <input type="text" id="itemUnit" class="itemUnit" value="'+e.itemList[i].ITEM_UNIT+'">' +
                    '       </td>' +
                    '       <td>' +
                    '           <input type="text" id="itemAmt" class="itemAmt" value="'+comma(e.itemList[i].ITEM_AMT)+'" style="text-align: right" disabled onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                    '       </td>' +
                    '       <td>' +
                    '           <input type="text" id="purcItemAmt" class="purcItemAmt" value="'+comma(e.itemList[i].PURC_ITEM_AMT)+'" style="text-align: right" disabled onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                    '       </td>' +
                    '       <td>' +
                    '           <input type="text" id="difAmt" class="purcItemAmt" value="'+comma(e.itemList[i].DIF_AMT)+'" style="text-align: right" disabled onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                    '       </td>' +
                    '       <td>' +
                    '           <label for="itemEtc"></label><input type="text" id="itemEtc" value="'+e.itemList[i].ITEM_ETC+'" class="itemEtc">' +
                    '       </td>' +
                    // '       <td>' +
                    // '           <span id="prodCd"></span>' +
                    // '       </td>' +
                    '       <td style="text-align: center" class="listDelBtn">' +
                    '           <button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="reqCl.fn_delete(this)">' +
                    '               <span class="k-button-text">삭제</span>' +
                    '           </button>' +
                    '       </td>';
                html += '</tr>';
            } else {
                html += '<tr class="claimItem newArray" id="item'+len+'">';
                html += '   <td style="text-align: center">' +
                    '           <div id="claimIndex">'+(index+1)+'</div>' +
                    '           <input type="hidden" id="claimItemSn'+index+'" value="'+e.itemList[i].CLAIM_ITEM_SN+'" />' +
                    '       </td>' +
                    '       <td>' +
                    '           <input type="hidden" id="purcItemSn'+index+'" name="purcItemSn0" class="purcItemSn">' +
                    '           <input type="text" id="purcItemType'+index+'" class="purcItemType" style="width: 110px">' +
                    '           <input type="text" id="productA'+index+'" class="productA" style="width: 110px">' +
                    '           <input type="text" id="productB'+index+'" class="productB" style="width: 110px; display: none">' +
                    '           <input type="text" id="productC'+index+'" class="productC" style="width: 110px; display: none">' +
                    '       </td>' +
                    '       <td>' +
                    '           <input type="text" id="itemNm'+index+'" class="itemNm" value="'+e.itemList[i].ITEM_NM+'">' +
                    '       </td>' +
                    '       <td>' +
                    '           <input type="text" id="itemStd'+index+'" class="itemStd" value="'+e.itemList[i].ITEM_STD+'">' +
                    '       </td>' +
                    '       <td>' +
                    '           <input type="text" id="itemEa'+index+'" style="text-align: right" class="itemEa" value="'+comma(e.itemList[i].ITEM_EA)+'" onkeyup="reqCl.fn_calcN(\''+index+'\', this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                    '       </td>' +
                    '       <td>' +
                    '           <input type="text" id="itemUnitAmt'+index+'" style="text-align: right" class="itemUnitAmt" value="'+comma(e.itemList[i].ITEM_UNIT_AMT)+'" onkeyup="reqCl.fn_calcN(\''+index+'\', this)" oninput="this.value = this.value.replace(/[^-0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                    '       </td>' +
                    '       <td>' +
                    '           <input type="text" id="itemUnit'+index+'" class="itemUnit" value="'+e.itemList[i].ITEM_UNIT+'">' +
                    '       </td>' +
                    '       <td>' +
                    '           <input type="text" id="itemAmt'+index+'" class="itemAmt" value="'+comma(e.itemList[i].ITEM_AMT)+'" style="text-align: right" disabled onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                    '       </td>' +
                    '       <td>' +
                    '           <input type="text" id="purcItemAmt'+index+'" class="purcItemAmt" value="'+comma(e.itemList[i].PURC_ITEM_AMT)+'" style="text-align: right" disabled onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                    '       </td>' +
                    '       <td>' +
                    '           <input type="text" id="difAmt'+index+'" class="difAmt" value="'+comma(e.itemList[i].DIF_AMT)+'" style="text-align: right" disabled onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                    '       </td>' +
                    '       <td>' +
                    '           <label for="itemEtc'+index+'"></label><input type="text" id="itemEtc'+index+'" value="'+e.itemList[i].ITEM_ETC+'" class="itemEtc">' +
                    '       </td>' +
                    // '       <td>' +
                    // '           <span id="prodCd'+index+'"></span>' +
                    // '       </td>' +
                    '       <td style="text-align: center" class="listDelBtn">' +
                    '           <button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="reqCl.fn_delete(this)">' +
                    '               <span class="k-button-text">삭제</span>' +
                    '           </button>' +
                    '       </td>';
                html += '</tr>';
            }

            index++;
        }


        $("#claimTbody").append(html);


        var tLen = $("#claimTbody > tr").length;
        var radioProdDataSource = [
            { label: "해당없음", value: "N" },
            { label: "자산", value: "A" },
            { label: "유지보수", value: "E" },
        ]
        for(var i = 0 ; i < tLen ; i++){
            if(i == 0){
                customKendo.fn_textBox(["itemNm", "itemStd", "itemEa", "itemUnitAmt", "itemUnit", "itemAmt", "purcItemAmt", "difAmt", "itemEtc"]);
                customKendo.fn_radioGroup("prodCd", radioProdDataSource, "horizontal");

                // $("#prodCd").data("kendoRadioGroup").value(e.itemList[i].PROD_CD);
            } else {
                customKendo.fn_textBox(["itemNm" + i, "itemStd" + i, "difItemAmt" + i
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


        }

        this.fn_amtCalculator();
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
            }
        }
    },

    fn_ClaimBtnSet : function(claimMap){

        let claimSn = $("#claimSn").val();
        let buttonHtml = "";
        if(claimMap != null){
            if(claimMap.STATUS == "0"){
                buttonHtml += '<button type="button" id="saveBtn" style="margin-right: 5px;" class="k-button k-button-solid-info" onclick="reqCl.fn_save()">저장</button>';
                buttonHtml += '<button type="button" id="reqBtn" style="margin-right: 5px;" class="k-button k-button-solid-info" onclick="reqCl.claimDrafting()">상신</button>';
            }else if(claimMap.STATUS == "10"){
                buttonHtml += '<button type="button" id="reqCancelBtn" style="margin-right: 5px;" class="k-button k-button-solid-error" onclick="docApprovalRetrieve(\''+claimMap.DOC_ID+'\', \''+claimMap.APPRO_KEY+'\', 1, \'retrieve\');">회수</button>';
            }else if(claimMap.STATUS == "30" || claimMap.STATUS == "40"){
                buttonHtml += '<button type="button" id="saveBtn" style="margin-right: 5px;" class="k-button k-button-solid-info" onclick="reqCl.fn_save()">저장</button>';
                buttonHtml += '<button type="button" id="reReqBtn" style="margin-right: 5px;" class="k-button k-button-solid-error" onclick="tempOrReDraftingPop(\''+claimMap.DOC_ID+'\', \''+claimMap.DOC_MENU_CD+'\', \''+claimMap.APPRO_KEY+'\', 2, \'reDrafting\');">재상신</button>';
            }else if(claimMap.STATUS == "100"){
                buttonHtml += '<button type="button" id="viewBtn" style="margin-right: 5px;" class="k-button k-button-solid-base" onclick="approveDocView(\''+claimMap.DOC_ID+'\', \''+claimMap.APPRO_KEY+'\', \''+claimMap.DOC_MENU_CD+'\');">열람</button>';
            }else{
                buttonHtml += '<button type="button" id="saveBtn" style="margin-right: 5px;" class="k-button k-button-solid-info" onclick="reqCl.fn_save()">저장</button>';
            }
        }else{
            buttonHtml += '<button type="button" id="saveBtn" style="margin-right:5px; margin-bottom: 10px;" class="k-button k-button-solid-info" onclick="reqCl.fn_save()">저장</button>';
        }
        buttonHtml += '<button type="button" class="k-button k-button-solid-error" onclick="window.close()">닫기</button>';

        $("#reqPurcBtnDiv").html(buttonHtml);
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
        let fileName = "";
        let fileExt = "";
        if($("input[name='fileList']")[0].files.length == 1){
            $("#fileGrid").html("");
        }
        for(var i = 0; i < $("input[name='fileList']")[0].files.length; i++){
            fCommon.global.attFiles.push($("input[name='fileList']")[0].files[i]);
        }

        if(fCommon.global.attFiles.length > 0){
            $("#fileGrid").find(".defultTr").remove();
            $("#fileGrid").find(".addFile").remove();

            var html = '';
            for (var i = 0; i < fCommon.global.attFiles.length; i++) {
                size = fCommon.bytesToKB((fCommon.global.attFiles[i].file_size || fCommon.global.attFiles[i].size));
                fileName = fCommon.global.attFiles[i].name ? fCommon.global.attFiles[i].name.split(".")[0] : fCommon.global.attFiles[i].file_org_name;
                fileExt = fCommon.global.attFiles[i].name ? fCommon.global.attFiles[i].name.split(".")[1] : fCommon.global.attFiles[i].file_ext;

                html += '<tr style="text-align: center;padding-top: 10px;" class="addFile">';
                html += '   <td>' + fileName + '</td>';
                html += '   <td>' + fileExt + '</td>';
                html += '   <td>' + size + '</td>';
                html += '   <td>';
                html += '       <input type="button" value="삭제" class="k-button k-rounded k-button-solid k-button-solid-error" onclick="fCommon.fnUploadFile(' + i + ')">'
                html += '   </td>';
                html += '</tr>';
            }

            $("#fileGrid").append(html);
        }
    },

    /** 첨부파일 데이터 세팅 */
    settingTempFileDataInit: function(e){
        fCommon.global.attFiles = fCommon.global.attFiles.concat(e);
        var html = '';
        if(e.length > 0){
            for(var i = 0; i < e.length; i++){
                html += '<tr style="text-align: center" class="addFile">';
                html += '   <td><span style="cursor: pointer" onclick="fileDown(\''+e[i].file_path+e[i].file_uuid+'\', \''+e[i].file_org_name+'.'+e[i].file_ext+'\')">'+e[i].file_org_name+'</span></td>';
                html += '   <td>'+ e[i].file_ext +'</td>';
                html += '   <td>'+ e[i].file_size +'</td>';
                html += '   <td>';
                html += '       <button type="button" class="k-button k-rounded k-button-solid k-button-solid-error" onclick="fCommon.commonFileDel('+ e[i].file_no +', this)">' +
                    '			    <span class="k-button-text">삭제</span>' +
                    '		    </button>';
                html += '   </td>';
                html += '</tr>';
            }
            $("#fileGrid").html(html);
        }else{
            $("#fileGrid").html('<tr>' +
                '	<td colspan="5" style="text-align: center">선택된 파일이 없습니다.</td>' +
                '</tr>');
        }
    }
}