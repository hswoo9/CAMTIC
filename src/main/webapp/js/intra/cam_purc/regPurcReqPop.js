var prp = {

    global : {
        radioGroupData : "",
        createHtmlStr : "",
        itemIndex : 0,
        dropDownDataSource : "",
        searchAjaxData : "",
        crmSnId : "",
        crmNmId : "",
        saveAjaxData : "",
        event : "",
        fileArray: [],
    },

    fn_defaultScript : function (){
        window.resizeTo(1690, 820);
        customKendo.fn_datePicker("purcReqDate", "month", "yyyy-MM-dd", new Date());
        customKendo.fn_textBox(["purcReqPurpose", "purcLink", "purcItemName0", "purcItemStd0", "purcItemUnitPrice0", "purcSupAmt0", "purcVatAmt0",
            "purcItemQty0", "purcItemUnit0", "purcItemAmt0", "crmNm0", "rmk0", "pjtNm", "allCrmNm", "estAmt", "vatAmt", "totAmt", "discountAmt0", "disRate"]);

        prp.global.radioGroupData = [
            { label: "법인운영", value: "" },
            { label: "R&D", value: "R" },
            { label: "비R&D", value: "S" },
            { label: "엔지니어링", value: "D" },
            { label: "용역/기타", value: "V" },
        ]
        customKendo.fn_radioGroup("purcType", prp.global.radioGroupData, "horizontal");

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
        customKendo.fn_radioGroup("vat", radioVatDataSource, "horizontal");

        $("#vat").data("kendoRadioGroup").value('Y')
        /** 부가세 Change function */
        $("#vat").data("kendoRadioGroup").bind("change", function(){
            prp.vatCalcN();
        });

        $("input[name='paymentMethod']").click(function(){
            if($("input[name='paymentMethod']:checked").val() == "I"){
                $("#chgTxt").text('견적서 파일');
                $("#chgTxtArea").css("display", "");
                $("#purcLinkTr").css("display", "");
            } else if($("input[name='paymentMethod']:checked").val() == "C"){
                $("#chgTxt").text('검수 파일');
                $("#chgTxtArea").css("display", "none");
                $("#purcLinkTr").css("display", "none");
                $("#purcLink").val("");
            } else {
                $("#chgTxt").text('견적서 파일');
                $("#chgTxtArea").css("display", "");
                $("#purcLinkTr").css("display", "none");
                $("#purcLink").val("");
            }
        });

        $("input[name='purcType']").click(function(){
            if($("input[name='purcType']:checked").val() != ""){
                $("#project").css("display", "");
            } else {
                $("#project").css("display", "none");
            }

            $("#pjtSn").val("");
            $("#pjtNm").val("");
        });

        prp.global.dropDownDataSource = [
            { text: "구매", value: "1"},
        ]

        let productsDataSource = customKendo.fn_customAjax("/system/commonCodeManagement/getCmCodeList", {cmGroupCodeId: "38"});
        customKendo.fn_dropDownList("purcItemType0", productsDataSource, "CM_CODE_NM", "CM_CODE", 2);

        let productADataSource = customKendo.fn_customAjax("/projectMng/getProductCodeInfo", {productGroupCodeId: 1}).list;
        customKendo.fn_dropDownList("productA0", productADataSource, "PRODUCT_DT_CODE_NM", "PRODUCT_DT_CODE", 2);


        $(".productA").each(function(){
            var productId = $(this).attr("id");

            if(productId != null){
                prp.fn_productCodeSetting(productId);
            }
        });


        $("#purcCrmSn, #purcCrmNm").change(function(){
            prp.crmInfoChange();
        });

        if($("#pjtSn").val() != ""){
            $("#purcType").data("kendoRadioGroup").value($("#busnClass").val());
            $("#project").css("display", "");
            $("#purcType").data("kendoRadioGroup").enable(false);
            $("#pjtSelBtn").prop("disabled", true);
            $("#pjtNm").prop("disabled", true);

        }


        if($("#purcSn").val()){
            $("#totalDiv").hide()
            prp.purcDataSet();
            $("#excelUploadBtn").css("display", "none");
        } else {
            //구매요청서 작성시 디폴트 선택
            $("#purcItemType0").data("kendoDropDownList").select(1);
            $("#productA0").data("kendoDropDownList").select(2);
        }

        $("#checkAll").click(function(){
            if($("#checkAll").is(":checked")){
                $(".childCheck").prop("checked", true);
            } else {
                $(".childCheck").prop("checked", false);
            }
        });

        var sum = 0;
        var disAmt = 0;
        $.each($(".purcItemAmt"), function(){
            sum += Number(uncommaN(this.value));
        });

        // $.each($(".discountAmt"), function(){
        //     disAmt += Number(uncommaN(this.value));
        // })
        // sum = Number(sum) - Number(disAmt);

        if($("#purcSn").val()){
            $("#totalPay").css("display", "");
            $("#totalPay").text("합계 : " + comma(sum));
        }else{
            $("#sum").text(comma(sum) + "원")
        }


        if($("#auto").val() == "Y"){
            $("#checkAll").click();

            prp.fn_reqClaiming();
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

        $.each($(".purcItemInfo"), function(i, v) {
            var idx = $(this).attr("id").replace(/[^0-9]/g, '');
            var unitPrice = Number(uncommaN($("#purcItemUnitPrice" + idx).val()));
            var qty = Number(uncomma($("#purcItemQty" + idx).val()));
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
                $("#purcItemAmt" + idx).val(comma(amount+sum2));
            }else if($("#vat").data("kendoRadioGroup").value() == "Y"){
                $("#purcSupAmt" + idx).val(comma(sum3));
                $("#purcVatAmt" + idx).val(comma(sum4));
                $("#purcItemAmt" + idx).val(comma(amount));
            }else if($("#vat").data("kendoRadioGroup").value() == "D"){
                $("#purcSupAmt" + idx).val(comma(amount));
                $("#purcVatAmt" + idx).val("0");
                $("#purcItemAmt" + idx).val(comma(amount));
            }
        });

        let sum = 0;
        $.each($(".purcItemAmt"), function(){
            sum += Number(uncommaN(this.value));
        });

        $("#sum").text(comma(sum) + "원")
    },

    crmInfoChange : function(){

        $("#" + purcInfo.global.crmSnId).val($("#purcCrmSn").val())
        $("#" + purcInfo.global.crmNmId).val($("#purcCrmNm").val())

        $("#purcCrmSn").val("")
        $("#purcCrmNm").val("")


    },

    setPurcReq : function(e){
        var formData = new FormData()
        formData.append("purcSn", $("#purcSn").val());
        formData.append("menuCd", "manage");
        formData.append("pjtSn", $("#pjtSn").val());
        formData.append("pjtNm", $("#pjtNm").val());
        formData.append("purcReqDate", $("#purcReqDate").val());
        formData.append("purcReqEmpSeq", $("#purcReqEmpSeq").val());
        formData.append("purcReqDeptSeq", $("#purcReqDeptSeq").val());
        formData.append("purcReqPurpose", $("#purcReqPurpose").val());
        formData.append("purcType", $("#purcType").data("kendoRadioGroup").value());
        formData.append("paymentMethod", $("#paymentMethod").data("kendoRadioGroup").value());
        formData.append("purcLink", $("#purcLink").val());
        formData.append("status", e);
        formData.append("empSeq", $("#purcReqEmpSeq").val());
        formData.append("vat", $("#vat").data("kendoRadioGroup").value());
        // formData.append("discountAmt", uncommaN($("#discountAmt").val()) ? uncommaN($("#discountAmt").val()) : 0);

        /** 증빙파일 첨부파일 */
        if(fCommon.global.attFiles != null){
            for(var i = 0; i < fCommon.global.attFiles.length; i++){
                formData.append("file1", fCommon.global.attFiles[i]);
            }
        }

        if($("#purcType").data("kendoRadioGroup").value() != "" && $("#pjtSn").val() == "" && $("#pjtNm").val() == ""){
            alert("프로젝트를 선택해주세요."); return;
        }

        if($("#paymentMethod").data("kendoRadioGroup").value() == "" || $("#paymentMethod").data("kendoRadioGroup").value() == undefined){
            alert("비용지급방식을 선택해주세요."); return;
        }

        if($("#paymentMethod").data("kendoRadioGroup").value() == "I"){
            if($("#purcLink").val() == ""){
                alert("구매링크를 입력해주세요."); return;
            }
        } else if($("#paymentMethod").data("kendoRadioGroup").value() == "C"){
            // if(uncommaN($("#totAmt").val()) >= 300000){
            //     alert("현장(카드)결제는 부가세 포함 30만원 미만만 가능합니다."); return;
            // }
        }

        if($("#purcSn").val() == ""){
            if(fCommon.global.attFiles.length == 0){
                if($("#paymentMethod").data("kendoRadioGroup").value() == "C"){
                    alert("검수 파일을 등록해주세요."); return;
                } else {
                    alert("견적서 파일을 등록해주세요."); return;
                }
            }
        }else{
            if($(".addFile").length == 0){
                alert("견적서를 등록해주세요."); return;
            }
        }

        if($("#vat").data("kendoRadioGroup").value() == "" || $("#vat").data("kendoRadioGroup").value() == undefined){
            alert("부가세를 선택해주세요."); return;
        }


        /*if($("#file2")[0].files.length == 1){
            formData.append("file2", $("#file2")[0].files[0]);
        }*/

        var itemArr = new Array()
        var flag = true;
        var flag2 = true;
        var flag3 = true;
        var flag4 = true;
        var flag5 = true;
        var flag6 = true;
        var flag7 = true;
        var flag8 = true;
        var itemSum = 0;
        var crmSn = "";
        $.each($(".purcItemInfo"), function(i, v){
            var index = $(this).attr("id").replace(/[^0-9]/g, '');

            var data = {
                purcItemSn : $(this).find("#purcItemSn" + index).val(),
                purcItemType : $("#purcItemType" + index).val(),
                productA : $("#productA" + index).val(),
                productB : $("#productB" + index).val(),
                productC : $("#productC" + index).val(),
                purcItemName : $("#purcItemName" + index).val(),
                purcItemStd : $("#purcItemStd" + index).val(),
                purcItemUnitPrice : prp.uncommaN($("#purcItemUnitPrice" + index).val()),
                purcItemQty : $("#purcItemQty" + index).val(),
                purcItemUnit : $("#purcItemUnit" + index).val(),
                purcItemAmt : prp.uncommaN($("#purcItemAmt" + index).val()),
                crmSn : $("#crmSn" + index).val(),
                // discountAmt : uncommaN($("#discountAmt" + index).val()) ? uncommaN($("#discountAmt" + index).val()) : 0,
                rmk : $("#rmk" + index).val(),
                status : e,
                empSeq : $("#purcReqEmpSeq").val(),
            }
            itemSum += Number(prp.uncommaN($("#purcItemAmt" + index).val()));

            if(crmSn != ""){
                if(crmSn != $("#crmSn" + index).val()) {
                    flag8 = false;
                }
            }
            crmSn = $("#crmSn" + index).val();

            if(data.productA == ""){flag = false;}
            if(data.purcItemName == ""){flag2 = false;}
            if(data.purcItemStd == ""){flag3 = false;}
            if(data.purcItemUnitPrice == ""){flag4 = false;}
            if(data.purcItemQty == ""){flag5 = false;}
            if(data.purcItemUnit == ""){flag6 = false;}
            if(data.crmSn == ""){flag7 = false;}

            if($("#productA" + i).val() == "3"){
                if(data.productB == ""){
                    flag = false;
                }

                if(data.productC == ""){
                    flag = false;
                }
            }
            itemArr.push(data);
        })

        /* 요청서 작성 -> 상신시점으로 변경 */
        // if($("#pjtSn").val() != ""){
        //     const pjtInfo = customKendo.fn_customAjax("/project/getProjectInfo", {pjtSn: $("#pjtSn").val()});
        //     const pjtMap = pjtInfo.map;
        //
        //     const list = customKendo.fn_customAjax("/project/getTeamInvList", {pjtSn: $("#pjtSn").val()}).list;
        //     let invSum = 0;
        //     for(let i=0; i<list.length; i++){
        //         invSum += Number(list[i].EST_TOT_AMT);
        //     }
        //
        //     const leftList = customKendo.fn_customAjax("/purc/getProjectPurcReqList", {pjtSn: $("#pjtSn").val()}).list;
        //     let purcSum = 0;
        //     let leftSum = 0;
        //     for(let i=0; i<leftList.length; i++){
        //         purcSum += Number(leftList[i].PURC_ITEM_AMT);
        //     }
        //     leftSum = invSum - purcSum;
        //     /**
        //      * itemSum = 현재 요청 금액
        //      * invSum  = 프로젝트 최신버전 계획서 투자금액
        //      * purcSum = 프로젝트 전체 요청금액
        //      * leftSum = invSum - purcSum
        //      */
        //
        //     console.log("itemSum : "+Number(itemSum));
        //     console.log("invSum : "+Number(invSum));
        //     console.log("purcSum : "+Number(purcSum));
        //     console.log("leftSum : "+Number(leftSum));
        //     if(Number(leftSum) < Number(itemSum)){
        //         alert("프로젝트 투자금액을 초과하여 구매요청을 작성하지 못합니다."); return;
        //     }
        // }

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
        if(!flag7){
            alert("업체를 선택해주세요.");
            return ;
        }
        if(!flag8){
            if($("#paymentMethod").data("kendoRadioGroup").value() == "C"){
                alert("현장(카드)결제는 같은 업체만 저장 가능합니다.");
                return ;
            }
        }
        formData.append("itemArr", JSON.stringify(itemArr))

        var result = customKendo.fn_customFormDataAjax("/purc/setPurcReq.do", formData);
        console.log(result)
        if(result.flag){
            alert("저장되었습니다.");
            if($("#paramPjtSn").val() == ""){
                opener.parent.prm.gridReload();
                location.href="/purc/pop/regPurcReqPop.do?purcSn=" + result.params.purcSn;
            } else {
                const busnClass = opener.commonProject.global.busnClass;
                if(opener.commonProject.global.teamStat == "Y"){
                    if(busnClass == "D"){
                        opener.window.location.href="/project/pop/viewRegProject.do?pjtSn=" + $("#pjtSn").val() + "&tab=6";
                    }else if(busnClass == "R"){
                        opener.window.location.href="/projectRnd/pop/regProject.do?pjtSn=" + $("#pjtSn").val() + "&tab=4";
                    }else if(busnClass == "S"){
                        opener.window.location.href="/projectUnRnd/pop/regProject.do?pjtSn=" + $("#pjtSn").val() + "&tab=4";
                    }else{
                        opener.window.location.reload();
                    }
                    /** 협업이 아닐때 */
                }else{
                    if(busnClass == "D"){
                        opener.window.location.href="/project/pop/viewRegProject.do?pjtSn=" + $("#pjtSn").val() + "&tab=10";
                    }else if(busnClass == "R"){
                        opener.window.location.href="/projectRnd/pop/regProject.do?pjtSn=" + $("#pjtSn").val() + "&tab=10";
                    }else if(busnClass == "S"){
                        opener.window.location.href="/projectUnRnd/pop/regProject.do?pjtSn=" + $("#pjtSn").val() + "&tab=10";
                    }else{
                        opener.window.location.reload();
                    }
                }

                location.href="/purc/pop/regPurcReqPop.do?pjtSn=" + $("#pjtSn").val() + "&purcSn=" + result.params.purcSn;
            }

        }
    },

    setPurcReqStatusUpd : function(e){
        prp.global.saveAjaxData = {
            purcSn : $("#purcSn").val(),
            status : e
        }

        var result = customKendo.fn_customFormDataAjax("/manage/setPurcReqStatusUpd.do", prp.global.saveAjaxData);
        if(result.flag){
            alert("처리되었습니다.");
            opener.parent.prm.gridReload();
            window.close();
        }
    },

    addRow : function(){
        prp.global.createHtmlStr = "";

        prp.global.itemIndex++;

        prp.global.createHtmlStr = "" +
            '<tr class="purcItemInfo newArray" id="item' + prp.global.itemIndex + '">' +
                '<td>' +
                '   <input type="checkbox" id="check'+ prp.global.itemIndex + '" class="childCheck k-checkbox" style="margin-left: 4px;" value="'+ prp.global.itemIndex + '">' +
                '</td>' +
                '<td>' +
                '   <input type="hidden" id="purcItemSn' + prp.global.itemIndex + '" name="purcItemSn0" class="purcItemSn">' +
                '   <input type="text" id="purcItemType' + prp.global.itemIndex + '" class="purcItemType" style="width: 110px">' +
                '   <input type="text" id="productA' + prp.global.itemIndex + '" class="productA" style="width: 110px">' +
                '   <input type="text" id="productB' + prp.global.itemIndex + '" class="productB" style="width: 110px; display: none">' +
                '   <input type="text" id="productC' + prp.global.itemIndex + '" class="productC" style="width: 110px; display: none">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="purcItemName' + prp.global.itemIndex + '" class="purcItemName">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="purcItemStd' + prp.global.itemIndex + '" class="purcItemStd">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="purcItemUnitPrice' + prp.global.itemIndex + '" class="purcItemUnitPrice" onkeyup="prp.fn_calcN('+prp.global.itemIndex+', this)" oninput="this.value = this.value.replace(/[^-0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" style="text-align: right">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="purcItemQty' + prp.global.itemIndex + '" class="purcItemQty" onkeyup="prp.fn_calcN('+prp.global.itemIndex+', this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" style="text-align: right">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="purcItemUnit' + prp.global.itemIndex + '" class="purcItemUnit">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="purcSupAmt' + prp.global.itemIndex + '" class="purcSupAmt" disabled onkeyup="prp.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\..*)\./g, \'$1\');" style="text-align: right">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="purcVatAmt' + prp.global.itemIndex + '" class="purcVatAmt" disabled onkeyup="prp.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\..*)\./g, \'$1\');" style="text-align: right">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="purcItemAmt' + prp.global.itemIndex + '" class="purcItemAmt" disabled onkeyup="prp.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" style="text-align: right">' +
                '</td>' +
                '<td>' +
                    '<input type="hidden" id="crmSn' + prp.global.itemIndex + '" class="crmSn">' +
                    '<input type="text" id="crmNm' + prp.global.itemIndex + '" disabled class="crmNm" style="width: 60%"> ' +
                    '<button type="button" id="crmSelBtn' + prp.global.itemIndex + '" class="crmSelBtn k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="prp.fn_popCamCrmList(\'crmSn' + prp.global.itemIndex + '\',\'crmNm' + prp.global.itemIndex + '\');">검색</button>' +
                '</td>' +
                // '<td>' +
                // '    <input type="text" id="discountAmt' + prp.global.itemIndex + '" class="discountAmt" style="text-align: right" onkeyup="prp.fn_calcN(0, this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" value="0">' +
                // '</td>' +
                '<td>' +
                    '<input type="text" id="rmk' + prp.global.itemIndex + '" class="rmk">' +
                '</td>';
        if($("#stat").val() == "v"){
            prp.global.createHtmlStr += '' +
                '<td id="itemStatus' + prp.global.itemIndex + '">' +
                    '<button type="button" id="retBtn' + prp.global.itemIndex + '" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="prp.fn_retItem('+prp.global.itemIndex+')">반려</button>' +
                '</td>';
        } else {
            prp.global.createHtmlStr += '' +
                '<td>' +
                '   <button type="button" id="delRowBtn' + prp.global.itemIndex + '" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="prp.delRow(' + prp.global.itemIndex + ')">삭제</button>' +
                '</td>'
        }
        prp.global.createHtmlStr += '' +
            '</tr>';



        $("#purcItemTb").append(prp.global.createHtmlStr);

        prp.global.dropDownDataSource = [
            { text: "구매", value: "1"},
        ]
        customKendo.fn_dropDownList("purcItemType" + prp.global.itemIndex, prp.global.dropDownDataSource, "text", "value", 2);

        customKendo.fn_textBox(["purcItemName" + prp.global.itemIndex, "purcItemStd" + prp.global.itemIndex,
                                "purcItemUnitPrice" + prp.global.itemIndex, "purcItemQty" + prp.global.itemIndex, "purcSupAmt" + prp.global.itemIndex, "purcVatAmt" + prp.global.itemIndex,
                                "purcItemUnit" + prp.global.itemIndex, "purcItemAmt" + prp.global.itemIndex,
                                "crmNm" + prp.global.itemIndex, "rmk" + prp.global.itemIndex, "discountAmt" + prp.global.itemIndex]);

        let productsDataSource = customKendo.fn_customAjax("/system/commonCodeManagement/getCmCodeList", {cmGroupCodeId: "38"});
        customKendo.fn_dropDownList("purcItemType" + prp.global.itemIndex, productsDataSource, "CM_CODE_NM", "CM_CODE", 2);


        let productADataSource = customKendo.fn_customAjax("/projectMng/getProductCodeInfo", {productGroupCodeId: 1}).list;
        customKendo.fn_dropDownList("productA" + prp.global.itemIndex, productADataSource, "PRODUCT_DT_CODE_NM", "PRODUCT_DT_CODE", 2);


        $(".productA").each(function (){

            var productId = $(this).attr("id");

            if(productId != null){
                prp.fn_productCodeSetting(productId);
            }
        });

        //구매요청서 작성시 디폴트 선택
        $("#purcItemType" + prp.global.itemIndex).data("kendoDropDownList").select(1);
        $("#productA" + prp.global.itemIndex).data("kendoDropDownList").select(2);
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

    fn_calc : function (idx, e){
        $("#purcItemAmt" + idx).val(comma(Number(uncomma($("#purcItemUnitPrice" + idx).val())) * Number(uncomma($("#purcItemQty" + idx).val()))));

        var sum = 0;
        $.each($(".purcItemAmt"), function(){
            sum += Number(uncomma(this.value));
        })
        if($("#purcSn").val()){
            $("#totalPay").css("display", "");
            $("#totalPay").text("합계 : " + comma(sum));
        }else{
            $("#sum").text(comma(sum) + "원")
        }

        this.vatCalc();


        return inputNumberFormat(e);
    },

    fn_calcN : function (idx, e){
        var unitPrice = Number(uncommaN($("#purcItemUnitPrice" + idx).val()));
        var qty = Number(uncomma($("#purcItemQty" + idx).val()));
        var amount = unitPrice * qty;
        var disAmt = 0;

        // for(var i = 0 ; i < $("#purcItemTb").find("tr").length ; i++){
        //     disAmt += Number(uncommaN($("#discountAmt" + i).val()) ? uncommaN($("#discountAmt" + i).val()) : 0)
        // }

        $("#purcItemAmt" + idx).val(comma(amount));

        var sum = 0;
        $.each($(".purcItemAmt"), function () {
            sum += Number(uncommaN(this.value));
        });

        sum = Number(sum) - Number(disAmt);

        if ($("#purcSn").val()) {
            $("#totalPay").css("display", "");
            $("#totalPay").text("합계 : " + comma(sum));
        } else {
            $("#sum").text(comma(sum) + "원");
        }

        this.vatCalcN();

        return inputNumberFormatN(e);
    },

    delRow : function(e){
        // if(!confirm("삭제하시겠습니까?")){
        //     return;
        // }

        if($(".purcItemInfo").length > 1){
            $("#item" + e).remove();
            // prp.global.itemIndex--;
        }

        this.fn_calcN();
    },

    fn_popCamCrmList : function(crmSnId, crmNmId){
        prp.global.crmSnId = crmSnId;
        prp.global.crmNmId = crmNmId;

        var url = "/crm/pop/popCrmList.do";
        var name = "_blank";
        var option = "width = 1300, height = 670, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    crmInfoChange : function(){
        $("#" + prp.global.crmSnId).val($("#crmSn").val())
        $("#" + prp.global.crmNmId).val($("#crmNm").val())

        $("#crmSn").val("")
        $("#crmNm").val("")
    },

    purcDataSet : function(){
        console.log("purcDataSet");
        prp.global.searchAjaxData = {
            purcSn : $("#purcSn").val()
        }

        var result = customKendo.fn_customAjax("/purc/getPurcReq.do", prp.global.searchAjaxData);
        if(result.flag){
            var data = result.data;
            $("#docNo").text(data.DOC_NO);
            $("#purcReqDate").val(data.PURC_REQ_DATE);
            $("#purcReqEmpSeq").val(data.PURC_REQ_EMP_SEQ);
            $("#purcReqEmpName").text(data.EMP_NAME_KR);
            $("#purcReqDeptSeq").val(data.DEPT_SEQ);
            $("#purcReqDeptName").text(data.DEPT_NAME);
            $("#purcReqPurpose").val(data.PURC_REQ_PURPOSE);
            $("#purcType").data("kendoRadioGroup").value(data.PURC_TYPE);
            $("#paymentMethod").data("kendoRadioGroup").value(data.PAYMENT_METHOD);

            if(result.data.DOC_STATUS == "100" || result.data.DOC_STATUS == "101"){
                $("#saveBtn").css("display", "none");
            }
            if($("input[name='purcType']:checked").val() != ""){
                $("#project").css("display", "");
                $("#pjtSn").val(data.PJT_SN);
                $("#pjtNm").val(data.PJT_NM);
            } else {
                $("#project").css("display", "none");
            }

            if($("input[name='paymentMethod']:checked").val() == "I"){
                $("#chgTxt").text('견적서 파일');
                $("#chgTxtArea").css("display", "");
                $("#purcLinkTr").css("display", "");
                $("#purcLink").val(data.PURC_LINK);
            } else if($("input[name='paymentMethod']:checked").val() == "C"){
                $("#chgTxt").text('검수 파일');
                $("#chgTxtArea").css("display", "none");
                $("#purcLinkTr").css("display", "none");
                $("#purcLink").val("");
            } else {
                $("#chgTxt").text('견적서 파일');
                $("#chgTxtArea").css("display", "");
                $("#purcLinkTr").css("display", "none");
                $("#purcLink").val("");
            }

            if(data.purcFile != null){
                prp.settingTempFileDataInit(data.purcFile);
                prp.global.fileArray = data.purcFile;
            }

            /*if(data.reqFile != null){
                $("#file2Sn").val(data.reqFile.file_no);
                $("#file2Name").text(data.reqFile.file_org_name + "." + data.reqFile.file_ext);
            }*/
            $("#vat").data("kendoRadioGroup").value(data.VAT);
            // $("#discountAmt").val(comma(data.DISCOUNT_AMT));

            prp.purcItemDataSet(data);

            $("#vat").data("kendoRadioGroup").trigger("change");
            prp.purcBtnSet(data);
        }

    },

    purcItemDataSet : function(e){
        console.log("purcItemDataSet");
        var data = e;
        var e = e.itemList;
        console.log(e);
        var totalPay = 0;
        var dcPay = 0;
        for(var i = 0; i < e.length; i++){
            if(i != 0){
                prp.addRow();
            }
            if(e[i].CLAIM_STAT == 'Y'){
                $("#check" + i).remove();
            }

            $("#item" + i).find("#purcItemSn" + i).val(e[i].PURC_ITEM_SN);
            $("#item" + i).find("#purcItemType" + i).data("kendoDropDownList").value(e[i].PURC_ITEM_TYPE);
            if(e[i].PRODUCT_A != null){
                $("#item" + i).find("#productA" + i).data("kendoDropDownList").value(e[i].PRODUCT_A);
                $("#productA" + i).trigger("change");
            }
            if(e[i].PRODUCT_A == 3){
                if(e[i].PRODUCT_B != null){
                    $("#item" + i).find("#productB" + i).data("kendoDropDownList").value(e[i].PRODUCT_B);
                    $("#productB" + i).trigger("change");
                }
                if(e[i].PRODUCT_C != null){
                    $("#item" + i).find("#productC" + i).data("kendoDropDownList").value(e[i].PRODUCT_C);
                }
            }
            $("#item" + i).find("#purcItemName" + i).val(e[i].PURC_ITEM_NAME);
            $("#item" + i).find("#purcItemStd" + i).val(e[i].PURC_ITEM_STD);
            $("#item" + i).find("#purcItemUnitPrice" + i).val(comma(e[i].PURC_ITEM_UNIT_PRICE));
            $("#item" + i).find("#purcItemQty" + i).val(e[i].PURC_ITEM_QTY);
            $("#item" + i).find("#purcItemUnit" + i).val(e[i].PURC_ITEM_UNIT);
            $("#item" + i).find("#purcItemAmt" + i).val(comma(e[i].PURC_ITEM_AMT));
            $("#item" + i).find("#crmSn" + i).val(e[i].CRM_SN);
            $("#item" + i).find("#crmNm" + i).val(e[i].CRM_NM);
            // $("#item" + i).find("#discountAmt" + i).val(comma(e[i].DISCOUNT_AMT));
            $("#item" + i).find("#rmk" + i).val(e[i].RMK);
            if(e[i].STATUS == "R"){
                $("#item" + i).find("#retBtn" + i).css("display", "none");
                $("#item" + i).find("#itemStatus" + i).append("<div style='margin-left:9px; color:red'>반려</div>");
                $("#item" + i).find("#check" + i).css("display", "none");
            } else {
                totalPay += Number(e[i].PURC_ITEM_AMT);
            }
            $("#item" + i).find("#retBtn" + i).val(e[i].CERT_CONTENT);

            dcPay += Number(e[i].DISCOUNT_AMT);
        }

        if(data.DOC_ID != "" && data.DOC_ID != null && !(data.DOC_STATUS == "30" || data.DOC_STATUS == "40")){
            $("#totalPay").css("display", "");
            $("#totalPay").text("합계 : " + comma(totalPay - dcPay));
            $("#allModViewBtn").css("display", "none");
            $("#addBtn").css("display", "none");
        }


    },

    purcBtnSet : function(purcMap){
        let html = makeApprBtnHtml(purcMap, 'prp.purcDrafting()', 2);
        $("#purcApprBtnBox").html(html);

        if(purcMap != null && purcMap.DOC_ID != null){
            reDraftOnlyOne(purcMap.DOC_ID, $("#reqEmpSeq").val(), "reBtn");
        }
    },

    fileChange : function(e){
        $(e).next().text($(e)[0].files[0].name);
    },

    inputNumberFormat : function (obj){
        obj.value = prp.comma(prp.uncomma(obj.value));
    },

    comma : function(str){
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    },

    uncomma : function(str){
        str = String(str);
        return str.replace(/[^\d]+/g, '');
    },

    uncommaN : function(str){
        str = String(str);
        return str.replace(/[^\d-]|(?<=\d)-/g, '');
    },

    purcDrafting: function(){
        var itemSum = 0;
        $.each($(".purcItemInfo"), function(i, v){
            var index = $(this).attr("id").replace(/[^0-9]/g, '');

            itemSum += Number(prp.uncommaN($("#purcItemAmt" + index).val()));
        })

        if($("#pjtSn").val() != ""){
            const pjtInfo = customKendo.fn_customAjax("/project/getProjectInfo", {pjtSn: $("#pjtSn").val()});
            const pjtMap = pjtInfo.map;
            console.log("pjtMap : ", pjtMap);

            const params = {pjtSn: $("#pjtSn").val()}
            if(pjtMap.TM_YN == "N"){
                params.ck = "1";
            }else if(pjtMap.TM_YN == "Y"){
                params.ck = "2";
            }
            const list = customKendo.fn_customAjax("/project/getTeamInvList", params).list;
            let invSum = 0;
            for(let i=0; i<list.length; i++){
                invSum += Number(list[i].EST_TOT_AMT);
            }

            if(pjtMap.BUSN_CLASS == "D" || pjtMap.BUSN_CLASS == "V"){
                const rs = customKendo.fn_customAjax("/project/engn/getEstData", {pjtSn: $("#pjtSn").val()});
                const res = rs.result;
                const estList = res.estList;
                let estMap = new Object();

                /** 현재 버전 견적 데이터 추출 */
                estMap = estList[(estList.length - 1)];
                console.log("estMap.VAT", estMap.VAT);

                if(estMap.VAT == "N"){
                    invSum = Number(Math.floor(invSum * 1.1));
                }
            }

            const leftList = customKendo.fn_customAjax("/purc/getProjectPurcReqList", {pjtSn: $("#pjtSn").val()}).list;
            let purcSum = 0;
            let leftSum = 0;
            for(let i=0; i<leftList.length; i++){
                purcSum += Number(leftList[i].PURC_ITEM_AMT);
            }
            leftSum = invSum - purcSum;
            /**
             * itemSum = 현재 요청 금액
             * invSum  = 프로젝트 최신버전 계획서 투자금액
             * purcSum = 프로젝트 전체 요청금액
             * leftSum = invSum - purcSum
             */
            const sum2 = Math.round(sum/10);

            console.log("itemSum : "+Number(itemSum));
            console.log("invSum : "+Number(invSum));
            console.log("purcSum : "+Number(purcSum));
            console.log("leftSum : "+Number(leftSum));

            if(Number(leftSum) < Number(itemSum)){
                alert("프로젝트 투자금액을 초과하여 구매요청을 작성하지 못합니다."); return;
            }
        }

        $("#purcDraftFrm").one("submit", function() {
            var url = "/popup/cam_purc/approvalFormPopup/purcApprovalPop.do";
            var name = "_self";
            var option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=yes, scrollbars = yes, status=no, top=50, left=50"
            var popup = window.open(url, name, option);
            this.action = "/popup/cam_purc/approvalFormPopup/purcApprovalPop.do";
            this.method = 'POST';
            this.target = '_self';
        }).trigger("submit");
    },

    fn_projectPop : function (){

        var url = "/project/pop/projectView.do?busnClass="+ $("input[name='purcType']:checked").val();

        var name = "_blank";
        var option = "width = 1100, height = 700, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    fn_retItem : function (idx){

        if(!confirm("해당 구매물품을 반려하시겠습니까?")){
            return ;
        }

        var parameters = {
            purcItemSn: $("#purcItemSn" + idx).val()
        }

        $.ajax({
            url : "/purc/setPurcItemStat",
            type : "POST",
            data : parameters,
            dataType : "json",
            success : function (rs){
                if(rs.code == 200){
                    alert("해당 구매물품이 반려되었습니다.");
                    location.reload();
                }
            }
        });
    },

    fn_reqClaiming : function (){
        var crmSn = "";
        var itemSn = "";
        var flag = true;
        var selFlag = true;
        $("#purcItemTb").find("input:checkbox").each(function(){
            if($(this).is(":checked")){
                selFlag = false;
                var item = $(this).val();

                if(crmSn != ""){
                    if(crmSn != $("#crmSn" + item).val()) {
                        alert("선택하신 항목 중 업체명이 다른항목이 존재합니다.");
                        flag = false;

                        return false;
                    }
                }
                crmSn = $("#crmSn" + item).val()
                itemSn += $("#purcItemSn" + item).val() + ",";
            }
        });

        if(!flag){
            return;
        }

        if(selFlag){
            alert("청구 작성할 항목을 선택해주세요.")
            return;
        }
        var url = "/purc/pop/reqClaiming.do?purcSn="+ $("#purcSn").val();

        if(itemSn != ""){
            itemSn = itemSn.substring(0, itemSn.length - 1);
            url += "&itemSn=" + itemSn;
        }

        var name = "_blank";
        var option = "width = 1690, height = 840, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);

        window.close();
    },

    fn_printEst : function (){

    },

    allModViewBtn: function (){
        $(".allMod").show();

        let productsDataSource = customKendo.fn_customAjax("/system/commonCodeManagement/getCmCodeList", {cmGroupCodeId: "38"});
        customKendo.fn_dropDownList("purcItemTypeAll", productsDataSource, "CM_CODE_NM", "CM_CODE", 2);

        let productADataSource = customKendo.fn_customAjax("/projectMng/getProductCodeInfo", {productGroupCodeId: 1}).list;
        customKendo.fn_dropDownList("productAAll", productADataSource, "PRODUCT_DT_CODE_NM", "PRODUCT_DT_CODE", 2);

        $("#productAAll").bind("change", function(){
            if($("#productAAll").data("kendoDropDownList").value() == "" || $("#productAAll").data("kendoDropDownList").text() != "캠아이템"){
                if($("#productAAll").data("kendoDropDownList").text() != "캠아이템"){
                    try{
                        $("#productBAll").data("kendoDropDownList").wrapper.hide();
                        $("#productCAll").data("kendoDropDownList").wrapper.hide();
                    }catch{

                    }
                }
                return;
            }
            $("#productBAll").val("");
            let data = {
                productGroupCodeId: 2,
                parentCodeId: $("#productAAll").data("kendoDropDownList").value(),
                parentCodeName: $("#productAAll").data("kendoDropDownList").text(),
            }
            let productBDataSource = customKendo.fn_customAjax("/projectMng/getProductCodeInfo", data).list;
            customKendo.fn_dropDownList("productBAll", productBDataSource, "PRODUCT_DT_CODE_NM", "PRODUCT_DT_CODE", 2);
        });

        $("#productBAll").bind("change", function(){
            if($("#productBAll").data("kendoDropDownList").value() == ""){
                return;
            }
            $("#productCAll").val("");
            let data = {
                productGroupCodeId: 3,
                parentCodeId: $("#productBAll").data("kendoDropDownList").value(),
                parentCodeName: $("#productBAll").data("kendoDropDownList").text(),
            }
            let productCDataSource = customKendo.fn_customAjax("/projectMng/getProductCodeInfo", data).list;
            customKendo.fn_dropDownList("productCAll", productCDataSource, "PRODUCT_DT_CODE_NM", "PRODUCT_DT_CODE", 2);
        });
    },

    allModBtn : function(){
        if($(".childCheck:checked").length == 0){
            alert("변경하실 품명을 선택해주세요.");
        }
        $.each($(".childCheck:checked"), function(index, item){
            let i = $(this).val();
            $("#item" + i).find("#purcItemType" + i).data("kendoDropDownList").value($("#purcItemTypeAll").data("kendoDropDownList").value());
            $("#item" + i).find("#productA" + i).data("kendoDropDownList").value($("#productAAll").data("kendoDropDownList").value());

            if($("#productAAll").data("kendoDropDownList").value() == "3"){
                $("#productA" + i).trigger("change");
                $("#item" + i).find("#productB" + i).data("kendoDropDownList").value($("#productBAll").data("kendoDropDownList").value());
                $("#productB" + i).trigger("change");
                if($("#productBAll").val() != ""){
                    $("#item" + i).find("#productC" + i).data("kendoDropDownList").value($("#productCAll").data("kendoDropDownList").value());
                }
            }else{
                if($("#productAAll").data("kendoDropDownList").text() != "캠아이템"){
                    try{
                        $("#item" + i).find("#productB" + i).data("kendoDropDownList").wrapper.hide();
                        $("#item" + i).find("#productC" + i).data("kendoDropDownList").wrapper.hide();
                    }catch{

                    }
                }
            }

            $("#item" + i).find("#crmSn" + i).val($("#allCrmSn").val());
            $("#item" + i).find("#crmNm" + i).val($("#allCrmNm").val());
        });
    },

    fn_reqRegPopup : function(){
        var url = "/payApp/pop/regPayAppPop.do?purcSn=" + $("#purcSn").val() + "&reqType=purc";
        var name = "blank";
        var option = "width = 1700, height = 820, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    fn_excelUpload : function(){
        $(".purcItemInfo").remove();
        prp.global.itemIndex = 0;
        var html = "" +
            '<tr class="purcItemInfo newArray" id="item0">' +
                '<td>' +
                    '<input type="checkbox" id="check0" class="childCheck k-checkbox" style="margin-left: 4px;" value="0" />' +
                '</td>' +
                '<td>' +
                    '<input type="hidden" id="purcItemSn0" name="purcItemSn0" class="purcItemSn"> ' +
                    '<input type="text" id="purcItemType0" class="purcItemType" style="width: 110px"> ' +
                    '<input type="text" id="productA0" class="productA" style="width: 110px"> ' +
                    '<input type="text" id="productB0" class="productB" style="width: 110px; display: none"> ' +
                    '<input type="text" id="productC0" class="productC" style="width: 110px; display: none"> ' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="purcItemName0" class="purcItemName">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="purcItemStd0" class="purcItemStd">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="purcItemUnitPrice0" style="text-align: right" class="purcItemUnitPrice" onKeyUp="prp.fn_calcN(0, this)" onInput="this.value = this.value.replace(/[^-0-9.]/g, \'\').replace(/(\..*)\./g, \'$1\');">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="purcItemQty0" style="text-align: right" class="purcItemQty" onKeyUp="prp.fn_calcN(0, this)" onInput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\..*)\./g, \'$1\');">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="purcItemUnit0" class="purcItemUnit">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="purcSupAmt0" class="purcSupAmt" style="text-align: right" disabled onKeyUp="inputNumberFormat(this)" onInput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\..*)\./g, \'$1\');">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="purcVatAmt0" class="purcVatAmt" style="text-align: right" disabled onKeyUp="inputNumberFormat(this)" onInput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\..*)\./g, \'$1\');">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="purcItemAmt0" class="purcItemAmt" style="text-align: right" disabled onKeyUp="inputNumberFormat(this)" onInput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\..*)\./g, \'$1\');">' +
                '</td>' +
                '<td>' +
                    '<input type="hidden" id="crmSn0" class="crmSn">' +
                    '<input type="text" id="crmNm0" disabled class="crmNm" style="width: 60%">' +
                    '<button type="button" id="crmSelBtn0" class="crmSelBtn k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onClick="prp.fn_popCamCrmList(\'crmSn0\', \'crmNm0\');">검색</button>' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="rmk0" class="rmk">' +
                '</td>' +
                '<td>' +
                    '<button type="button" id="delRowBtn0" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onClick="prp.delRow(0)">' +
                        '삭제' +
                    '</button>' +
                '</td>' +
            '</tr>';

        $("#purcItemTb").html(html);

        let productsDataSource = customKendo.fn_customAjax("/system/commonCodeManagement/getCmCodeList", {cmGroupCodeId: "38"});
        customKendo.fn_dropDownList("purcItemType0", productsDataSource, "CM_CODE_NM", "CM_CODE", 2);

        let productADataSource = customKendo.fn_customAjax("/projectMng/getProductCodeInfo", {productGroupCodeId: 1}).list;

        customKendo.fn_dropDownList("productA0", productADataSource, "PRODUCT_DT_CODE_NM", "PRODUCT_DT_CODE", 2);
        customKendo.fn_textBox(["purcReqPurpose", "purcLink", "purcItemName0", "purcItemStd0", "purcItemUnitPrice0", "purcSupAmt0", "purcVatAmt0",
            "purcItemQty0", "purcItemUnit0", "purcItemAmt0", "crmNm0", "rmk0", "pjtNm", "allCrmNm", "estAmt", "vatAmt", "totAmt", "discountAmt0", "disRate"]);

        $("#purcItemType0").data("kendoDropDownList").select(1);
        $("#productA0").data("kendoDropDownList").select(2);

        var excelArr = [];
        var event = prp.global.event;
        var input = event.target;
        var reader = new FileReader();
        reader.onload = function(){
            var fdata = reader.result;
            var read_buffer = XLSX.read(fdata, {type : 'binary'});
            var index = 0;
            read_buffer.SheetNames.forEach(function(sheetName){
                var rowdata =XLSX.utils.sheet_to_json(read_buffer.Sheets[sheetName]);
                console.log(rowdata);

                for(var i = 0 ; i < rowdata.length ; i++){
                    if(rowdata[index]['구분'] != undefined && rowdata[index]['구분'] != null && rowdata[index]['구분'] != ""){
                        $("#purcItemType" + index).data("kendoDropDownList").text(rowdata[index]['구분']);
                    }

                    if(rowdata[index]['대분류'] != undefined && rowdata[index]['대분류'] != null && rowdata[index]['대분류'] != ""){
                        $("#productA" + index).data("kendoDropDownList").text(rowdata[index]['대분류']);
                        $("#productA" + index).trigger("change");
                    }

                    if(rowdata[index]['중분류'] != undefined && rowdata[index]['중분류'] != null && rowdata[index]['중분류'] != ""){
                        $("#productB" + index).data("kendoDropDownList").text(rowdata[index]['중분류']);
                        $("#productB" + index).trigger("change");

                        $("#productC" + index).data("kendoDropDownList").text(rowdata[index]['소분류']);
                    }

                    $("#purcItemName" + index).val(rowdata[index]['* 품명']);
                    $("#purcItemStd" + index).val(rowdata[index]['* 규격']);
                    $("#purcItemUnitPrice" + index).val(comma(rowdata[index]['* 단가']));
                    $("#purcItemQty" + index).val(rowdata[index]['* 수량']);
                    $("#purcItemUnit" + index).val(rowdata[index]['* 단위']);
                    $("#purcSupAmt" + index).val((comma(rowdata[index]['공급가액'] || 0)));
                    $("#purcVatAmt" + index).val((comma(rowdata[index]['세액'] || 0)));
                    $("#purcItemAmt" + index).val((comma(rowdata[index]['금액'] || 0)));
                    $("#rmk" + index).val(rowdata[index]['비고']);

                    var data = {
                        excelCrmNm : rowdata[index]['* 업체명'],
                        excelCrmNo : rowdata[index]['* 사업자번호'].replace(/-/g, '')
                    }

                    $.ajax({
                        url : "/purc/getCrmInfo",
                        data : data,
                        async : false,
                        type : "post",
                        dataType : "json",
                        success :function (rs){
                            $("#crmSn" + index).val(rs.data.CRM_SN);
                            $("#crmNm" + index).val(rs.data.CRM_NM);

                            prp.addRow();
                            index++;

                        }, error : function (){
                            alert("에러가 발생하였습니다.");
                        }
                    });
                }

                prp.vatCalcN();

            });
            $("#delRowBtn" + index).click();
        };
        reader.readAsBinaryString(input.files[0]);
        $('#excelUpload').data('kendoWindow').close();
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
                fileName = fCommon.global.attFiles[i].name ? fCommon.global.attFiles[i].name.substring(0, fCommon.global.attFiles[i].name.lastIndexOf(".")) : fCommon.global.attFiles[i].file_org_name;
                fileExt = fCommon.global.attFiles[i].name ? fCommon.global.attFiles[i].name.substring(fCommon.global.attFiles[i].name.lastIndexOf(".")+1) : fCommon.global.attFiles[i].file_ext;

                html += '<tr style="text-align: center;padding-top: 10px;" class="addFile">';
                html += '   <td>' + fileName + '</td>';
                html += '   <td>' + fileExt + '</td>';
                html += '   <td>' + size + '</td>';
                html += '   <td>';
                html += '       <input type="button" value="삭제" class="k-button k-rounded k-button-solid k-button-solid-error" onclick="fCommon.fnUploadFile(' + i + ')">'
                html += '   </td>';
                html += '   <td>';
                /*if(fileExt.toLowerCase() == "pdf" || fileExt.toLowerCase() == "jpg" || fileExt.toLowerCase() == "png" || fileExt.toLowerCase() == "jpeg"){
                }*/
                html += '       <input type="button" value="뷰어" class="k-button k-rounded k-button-solid k-button-solid-base" onclick="fileViewer(\''+ fCommon.global.attFiles[i].file_path +'\', \''+ fCommon.global.attFiles[i].file_uuid +'\')">'
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
                html += '   <td>';
                /*if(e[i].file_ext.toLowerCase() == "pdf" || e[i].file_ext.toLowerCase() == "jpg" || e[i].file_ext.toLowerCase() == "png" || e[i].file_ext.toLowerCase() == "jpeg"){
                }*/
                html += '       <input type="button" value="뷰어" class="k-button k-rounded k-button-solid k-button-solid-base" onclick="fileViewer(\''+ e[i].file_path +'\', \''+ e[i].file_uuid +'\')">'
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

    fileViewer : function (path, name){
        var name = "_blank";
        var option = "width = 1300, height = 820, top = 100, left = 400, location = no"
        var hostUrl = "";
        if($(location).attr("host").split(":")[0].indexOf("218.158.231.184") > -1 || $(location).attr("host").split(":")[0].indexOf("new.camtic.or.kr") > -1){
            hostUrl = "http://218.158.231.184";
        } else {
            hostUrl = "http://218.158.231.186";
        }
        var popup = window.open(hostUrl + path, name, option);
    },

    fn_multiDownload : function (){
        var fileArray = prp.global.fileArray;

        if(fileArray.length > 0){
            for(let i=0; i<fileArray.length; i++){
                fileDown(fileArray[i].file_path+fileArray[i].file_uuid, fileArray[i].file_org_name+'.'+fileArray[i].file_ext);
            }
        }
    },
}