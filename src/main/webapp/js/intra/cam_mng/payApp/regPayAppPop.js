/**
 * rev : 지급신청서
 * in  : 여입신청서
 * out : 반납신청서
 * alt : 대체신청서
 * @type {{payAppDrafting: regPay.payAppDrafting, setData: regPay.setData, fn_viewStat: regPay.fn_viewStat, uncomma: (function(*): string), global: {searchAjaxData: string, saveAjaxData: string, radioGroupData: string, itemIndex: number, createHtmlStr: string, crmSnId: string, dropDownDataSource: string, crmNmId: string}, comma: (function(*): string), fn_projectPop: regPay.fn_projectPop, fn_budgetPop: regPay.fn_budgetPop, payAppBtnSet: regPay.payAppBtnSet, fn_save: regPay.fn_save, fn_popCamCrmList: regPay.fn_popCamCrmList, inputNumberFormat: regPay.inputNumberFormat, fn_defaultScript: regPay.fn_defaultScript, crmInfoChange: regPay.crmInfoChange, fn_bankPop: regPay.fn_bankPop, fn_calCost: regPay.fn_calCost}}
 */

var regPay = {

    global : {
        radioGroupData : "",
        createHtmlStr : "",
        itemIndex : 0,
        dropDownDataSource : "",
        searchAjaxData : "",
        crmSnId : "",
        crmNmId : "",
        saveAjaxData : "",
        fileArray : [],
        attFiles : [],
        exnpFlag : false,
        result : "",
        bgtArr : new Array()
    },

    fn_defaultScript : function (){
        customKendo.fn_datePicker("appDe", "month", "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("reqDe", "month", "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("payExnpDe", "month", "yyyy-MM-dd", new Date());
        customKendo.fn_textBox(["pjtNm", "appTitle", "accNm", "accNo", "bnkNm"]);

        $("#appCont").kendoTextArea({
            rows: 5,
        });

        regPay.global.radioGroupData = [
            { label: "지급신청서", value: "1" },
            { label: "여입신청서", value: "2" },
            { label: "반납신청서", value: "3" },
            { label: "대체신청서", value: "4" }
        ]
        customKendo.fn_radioGroup("payAppType", regPay.global.radioGroupData, "horizontal");

        regPay.global.radioGroupData = [
            { label: "없음", value: "N" },
            { label: "의무경비", value: "A" },
            { label: "고정경비", value: "B" },
            { label: "업무추진비", value: "C" }
        ]
        customKendo.fn_radioGroup("payAppStat", regPay.global.radioGroupData, "horizontal");

        $("#payAppType").data("kendoRadioGroup").value(1);
        $("#payAppStat").data("kendoRadioGroup").value("N")

        $("#payAppType").data("kendoRadioGroup").bind("change", function (e){
            if($("#payAppType").data("kendoRadioGroup").value() == "2"){
                $("#trBank").text("입금계좌");
            } else {
                $("#trBank").text("출금계좌");
            }

            if($("#auth").val() == "mng"){
                if($("#payAppType").data("kendoRadioGroup").value() == "1"){
                    $("#cardTitle").text("지급신청서");
                    $("#exnpAddBtn").text("지출결의서 작성");
                } else if($("#payAppType").data("kendoRadioGroup").value() == "2"){
                    $("#cardTitle").text("여입신청서");
                    $("#exnpAddBtn").text("여입결의서 작성");
                } else if($("#payAppType").data("kendoRadioGroup").value() == "3"){
                    $("#cardTitle").text("반납신청서");
                    $("#exnpAddBtn").text("반납결의서 작성");
                } else if($("#payAppType").data("kendoRadioGroup").value() == "4"){
                    $("#cardTitle").text("대체신청서");
                    $("#exnpAddBtn").text("대체결의서 작성");
                }
            }

            if($("#payAppType").data("kendoRadioGroup").value() != "1"){
                for(var i = 0 ; i < $("#payDestTb").find("tr").length ; i++){
                    $("#eviType" + i).data("kendoDropDownList").select(7);
                }
            }
        })

        if($("#payAppSn").val() != ""){
            regPay.setData();

            var fileThumbText = "";
            var fileList = regPay.global.fileArray;

            fileList = ([...new Map(fileList.map((obj) => [obj["file_uuid"], obj])).values()]);

            for(let i=0; i<fileList.length; i++){
                if(fileThumbText != ""){
                    fileThumbText += " | ";
                }
                fileThumbText += fileList[i].file_org_name;
                fileThumbText += "." + fileList[i].file_ext;
            }

            $("#fileText").text(fileThumbText);

            console.log(regPay.global.fileArray);

            regPay.fn_viewStat();
        }else{
            regPayDet.global.itemIndex += 1;
        }

        $("#checkAll").click(function(){
            if($(this).is(":checked")){
                $(".check").prop("checked", true);
            }else{
                $(".check").prop("checked", false);
            }
        });


        if($("#reqType").val() == "partRate"){
            const data = {
                pjtSn : $("#partRatePjtSn").val(),
                bsYm : $("#bsYm").val(),
                accountToSn : $("#accountToSn").val(),
                payRollYm : $("#payRollYm").val()
            }

            var accountInfo = customKendo.fn_customAjax("/mng/getAccountInfoOne", data);
            var aiRs = accountInfo.rs;

            $.ajax({
                url : "/payApp/getPartRatePay",
                data : data,
                type : "POST",
                dataType : "json",
                success : function (rs){
                    var rs = rs.data;
                    console.log(rs);

                    var bsYmText = "";

                    if($("#bsYm").val() != "" && $("#bsYm").val() != null){
                        bsYmText = $("#bsYm").val().replace(".","-");
                    }

                    $("#pjtSn").val(rs[0].PJT_SN);
                    $("#firstPjtSn").val(rs[0].PJT_SN);
                    $("#pjtNm").val(rs[0].PJT_NM);
                    $("#appTitle").val(bsYmText + "월 인건비 지급 건");

                    for(let i = 1; i < rs.length; i++) {
                        regPayDet.addRow();
                        regPay.fn_updReason(i);
                    }

                    for(let i = 0; i < rs.length; i++) {
                        $("#eviType" + i).data("kendoDropDownList").select(4)
                        $("#crmNm" + i).val(rs[i].EMP_NAME_KR);
                        $("#regNo" + i).val(rs[i].RES_REGIS_NUM);
                        $("#trCd" + i).val(rs[i].ERP_EMP_SEQ);
                        $("#crmBnkNm" + i).val(aiRs.BANK_NAME);
                        $("#crmAccNo" + i).val(aiRs.PAY_ACCOUNT);
                        $("#crmAccHolder" + i).val(aiRs.DEPOSITOR);
                        $("#totCost" + i).val(regPay.comma(rs[i].MON_SAL_RE));
                        $("#supCost" + i).val(regPay.comma(rs[i].MON_SAL_RE));
                    }

                    selectProject(rs[0].PJT_SN, rs[0].PJT_NM, $("#partRatePjtCd").val() == "" ? rs[0].PJT_CD : $("#partRatePjtCd").val());

                }
            });

            $.ajax({
                url: "/inside/getPayRollFileList",
                data: data,
                type: "POST",
                dataType: "json",
                success: function (rs) {
                    var fileList = rs.fileList;
                    var fileThumbText = "";
                    var slist = "";

                    for(let i=0; i<fileList.length; i++){
                        if(slist != ""){
                            slist += ",";
                        }
                        if(fileThumbText != ""){
                            fileThumbText += " | ";
                        }
                        slist += fileList[i].file_no;
                        fileThumbText += fileList[i].file_org_name;
                        fileThumbText += "." + fileList[i].file_ext;
                    }

                    $("#fileText").text(fileThumbText);
                    $("#sList").val(slist);

                    regPay.global.fileArray = regPay.global.fileArray.concat(fileList);
                }
            });
        }

        if($("#reqType").val() == "purc"){
            const data = {
                purcSn : $("#purcSn").val()
            }

            var result = customKendo.fn_customAjax("/purc/getPurcAndClaimData", data);

            var rs = result.data;
            const pjtMap = customKendo.fn_customAjax("/project/getProjectStep", {pjtSn: rs.PJT_SN}).rs;

            if($("#pjtSn").val != ""){
                $("#pjtSn").val(rs.PJT_SN);
            }
            if($("#pjtSn").val() != ""){
                $("#pjtSn").val(pjtMap.PJT_SN);
                selectProject(rs.PJT_SN, pjtMap.PJT_NM, pjtMap.PJT_CD)
            }
            $("#appTitle").val(rs.PURC_REQ_PURPOSE);

            var ls = rs.itemList;
            for(let i = 1; i < ls.length; i++) {
                regPayDet.addRow();
            }
            for(let i = 0; i < ls.length; i++) {
                $("#eviType" + i).data("kendoDropDownList").value(1);
                $("#crmNm" + i).val(ls[i].CRM_NM);
                $("#crmSn" + i).val(ls[i].CRM_SN);
                $("#regNo" + i).val(ls[i].CRM_NO_TMP);
                $("#crmBnkNm" + i).val(ls[i].CRM_BN == "undefined" ? "" : ls[i].CRM_BN);
                $("#crmAccNo" + i).val(ls[i].CRM_BN_NUM == "undefined" ? "" : ls[i].CRM_BN_NUM);
                $("#crmAccHolder" + i).val(ls[i].BN_DEPO == "undefined" ? "" : ls[i].BN_DEPO);
                $("#totCost" + i).val(regPay.comma(ls[i].PURC_ITEM_AMT));
                $("#supCost" + i).val(regPay.comma(ls[i].PURC_ITEM_AMT));
            }
        }

        if($("#reqType").val() == "claim"){
            var idx = 0;

            var fileResult = new Array();
            var fileResultTmp = new Array();

            for(var x = 0 ; x < $("#claimSn").val().toString().split(",").length ; x++){
                var data = {
                    claimSn : $("#claimSn").val().toString().split(",")[x],
                    claimExnpSn : $("#claimExnpSn").val().toString().split(",")[x]
                }

                var map = customKendo.fn_customAjax("/purc/getPurcClaimData", data);
                if(map != null){
                    data.purcSn = map.data.PURC_SN
                }

                var result = customKendo.fn_customAjax("/purc/getPurcAndClaimData", data);

                var rs = result.data;

                console.log("rs", rs);
                const pjtMap = customKendo.fn_customAjax("/project/getProjectStep", {pjtSn: rs.PJT_SN}).rs;

                var claimExnpData = customKendo.fn_customAjax("/purc/getClaimExnpData", data);
                var cem = claimExnpData.map;

                if($("#pjtSn").val != ""){
                    $("#pjtSn").val(rs.PJT_SN);
                }
                if($("#pjtSn").val() != ""){
                    $("#pjtSn").val(pjtMap.PJT_SN);
                    selectProject(rs.PJT_SN, pjtMap.PJT_NM, pjtMap.PJT_CD)
                } else {
                    selectProject('', '[2024년]법인운영', 'Mm1m124010');
                }

                // $("#appTitle").val(rs.PURC_REQ_PURPOSE);



                if(cem == null){
                    if(x != 0){
                        for(let i = 0; i < rs.itemList.length; i++) {
                            regPayDet.addRow();
                        }
                    }

                    var ls = rs.itemList;

                    for (let i = 0; i < ls.length; i++) {
                        $("#eviType" + idx).data("kendoDropDownList").value(0);
                        $("#crmNm" + idx).val(ls[i].CRM_NM);
                        $("#crmSn" + idx).val(ls[i].CRM_SN);
                        $("#regNo" + idx).val(ls[i].CRM_NO_TMP);
                        $("#crmBnkNm" + idx).val(ls[i].CRM_BN == "undefined" ? "" : ls[i].CRM_BN);
                        $("#crmAccNo" + idx).val(ls[i].CRM_BN_NUM == "undefined" ? "" : ls[i].CRM_BN_NUM);
                        $("#crmAccHolder" + idx).val(ls[i].BN_DEPO == "undefined" ? "" : ls[i].BN_DEPO);
                        // $("#totCost" + i).val(regPay.comma(cem.TOT_AMT));
                        // $("#supCost" + i).val(regPay.comma(cem.TOT_AMT));
                        $("#budgetNm" + idx).val();
                        $("#budgetSn" + idx).val();
                        $("#budgetAmt" + idx).val(9999999999);

                        var totalAmt = ls[i].PURC_ITEM_AMT;
                        // if (rs.VAT == "N") {
                        //     $("#totCost" + i).val(regPay.comma(Number(totalAmt) + Math.floor(Number(totalAmt / 10))));
                        //     $("#supCost" + i).val(regPay.comma(totalAmt));
                        //     $("#vatCost" + i).val(regPay.comma(Math.floor(Number(totalAmt / 10))));
                        // } else if (rs.VAT == "Y") {
                        //     $("#totCost" + i).val(regPay.comma(totalAmt));
                        //     $("#supCost" + i).val(regPay.comma(Math.ceil(Number(totalAmt / 1.1))));
                        //     $("#vatCost" + i).val(regPay.comma(Number(totalAmt - Math.ceil(Number(totalAmt / 1.1)))));
                        // } else if (rs.VAT == "D") {
                        //     $("#totCost" + i).val(regPay.comma(totalAmt));
                        //     $("#supCost" + i).val(regPay.comma(totalAmt));
                        //     $("#vatCost" + i).val(0);
                        // }

                        $("#totCost" + idx).val(regPay.comma(totalAmt));
                        $("#supCost" + idx).val(regPay.comma(totalAmt));
                        $("#vatCost" + idx).val(0);

                        idx++;

                        // regPayDet.addRow();
                    }

                }else if(cem.EVID_TYPE == 3){
                    var ls = claimExnpData.result.list;

                    for(let i = 0; i < ls.length; i++) {
                        if(idx > 0){
                            regPayDet.addRow();
                        }

                        $("#eviType" + idx).data("kendoDropDownList").value(cem.EVID_TYPE);
                        $("#crmNm" + idx).val(ls[i].CRM_NM || ls[i].MER_NM);
                        $("#crmSn" + idx).val(ls[i].CRM_SN || "");
                        $("#regNo" + idx).val(ls[i].MER_BIZNO || "");
                        $("#crmBnkNm" + idx).val(ls[i].JIRO_NM || "");
                        $("#crmAccNo" + idx).val(ls[i].BA_NB || "");
                        $("#crmAccHolder" + idx).val(ls[i].DEPOSITOR || "");
                        $("#trDe" + idx).val(ls[i].AUTH_DD.toString().substring(0, 4) + "-" + ls[i].AUTH_DD.toString().substring(4, 6) + "-" + ls[i].AUTH_DD.toString().substring(6, 8));
                        // $("#totCost" + i).val(regPay.comma(cem.TOT_AMT));
                        // $("#supCost" + i).val(regPay.comma(cem.TOT_AMT));
                        $("#budgetNm" + idx).val(cem.BUDGET_NM);
                        $("#budgetSn" + idx).val(cem.BUDGET_SN);
                        $("#budgetAmt" + idx).val(9999999999);

                        $("#fileNo" + idx).val(ls[i].FILE_NO || "");
                        $("#authDd" + idx).val(ls[i].AUTH_DD || "");
                        $("#authHh" + idx).val(ls[i].AUTH_HH || "");
                        $("#authNo" + idx).val(ls[i].AUTH_NO || "");
                        $("#buySts" + idx).val(ls[i].BUY_STS || "");
                        $("#trCd" + idx).val(ls[i].TR_CD || "");

                        $("#card" + idx).val(ls[i].TR_NM);
                        $("#cardNo" + idx).val(ls[i].CARD_BA_NB);

                        $("#totCost" + idx).val(regPay.comma(ls[i].AUTH_AMT.toString().split(".")[0]));
                        $("#supCost" + idx).val(regPay.comma(ls[i].SUPP_PRICE.toString().split(".")[0]));
                        $("#vatCost" + idx).val(regPay.comma(ls[i].SURTAX.toString().split(".")[0]));

                        // var totalAmt = ls[i].AUTH_AMT;
                        // if(rs.VAT == "N"){
                        //     $("#totCost" + i).val(regPay.comma(Number(totalAmt) + Math.floor(Number(totalAmt / 10))));
                        //     $("#supCost" + i).val(regPay.comma(totalAmt));
                        //     $("#vatCost" + i).val(regPay.comma(Math.floor(Number(totalAmt / 10))));
                        // } else if(rs.VAT == "Y"){
                        //     $("#totCost" + i).val(regPay.comma(totalAmt));
                        //     $("#supCost" + i).val(regPay.comma(Math.ceil(Number(totalAmt / 1.1))));
                        //     $("#vatCost" + i).val(regPay.comma(Number(totalAmt - Math.ceil(Number(totalAmt / 1.1)))));
                        // } else if(rs.VAT == "D") {
                        //     $("#totCost" + i).val(regPay.comma(totalAmt));
                        //     $("#supCost" + i).val(regPay.comma(totalAmt));
                        //     $("#vatCost" + i).val(0);
                        // }
                        idx++;
                    }
                } else if (cem.EVID_TYPE == 1){
                    var ls = claimExnpData.result.rsList;

                    for(let i = 0; i <ls.length; i++) {
                        if(idx > 0){
                            regPayDet.addRow();
                        }

                        $("#eviType" + idx).data("kendoDropDownList").value(cem.EVID_TYPE);
                        $("#crmNm" + idx).val(ls[i].TR_NM || ls[i].TR_NMK);
                        $("#crmSn" + idx).val(ls[i].CRM_SN || "");
                        $("#regNo" + idx).val(ls[i].REG_NB || "");
                        $("#crmBnkNm" + idx).val(ls[i].BANK_NM || "");
                        $("#crmAccNo" + idx).val(ls[i].BA_NB || "");
                        $("#crmAccHolder" + idx).val(ls[i].DEPOSITOR || "");
                        $("#trDe" + idx).val(ls[i].ISS_DT.toString().substring(0, 4) + "-" + ls[i].ISS_DT.toString().substring(4, 6) + "-" + ls[i].ISS_DT.toString().substring(6, 8));
                        // $("#totCost" + i).val(regPay.comma(cem.TOT_AMT));
                        // $("#supCost" + i).val(regPay.comma(cem.TOT_AMT));
                        $("#budgetNm" + idx).val(cem.BUDGET_NM);
                        $("#budgetSn" + idx).val(cem.BUDGET_SN);
                        $("#budgetAmt" + idx).val(9999999999);

                        $("#fileNo" + idx).val(ls[i].FILE_NO || "");
                        $("#issNo" + idx).val(ls[i].ISS_NO || "");
                        $("#coCd" + idx).val(ls[i].CO_CD || "");
                        $("#taxTy" + idx).val(ls[i].TAX_TY || "");
                        $("#trCd" + idx).val(ls[i].TR_CD || "");

                        $("#expRate" + idx).val(ls[i].EXP_RATE || "");
                        $("#taxRate" + idx).val(ls[i].TAX_RATE || "");
                        $("#payAmt" + idx).val(ls[i].PAY_AMT || "");
                        $("#incTax" + idx).val(ls[i].INC_TAX || "");
                        $("#locIncTax" + idx).val(ls[i].LOC_INC_TAX || "");
                        $("#subAmt" + idx).val(ls[i].SUB_AMT || "");
                        $("#actPayAmt" + idx).val(ls[i].ACT_PAY_AMT || "");

                        $("#totCost" + idx).val(regPay.comma(ls[i].SUM_AM.toString().split(".")[0]));
                        $("#supCost" + idx).val(regPay.comma(ls[i].SUP_AM.toString().split(".")[0]));
                        $("#vatCost" + idx).val(regPay.comma(ls[i].VAT_AM.toString().split(".")[0]));

                        /*var totalAmt = ls[i].SUM_AM.toString().split(".")[0];
                        if(rs.VAT == "N"){
                            $("#totCost" + i).val(regPay.comma(Number(totalAmt) + Math.floor(Number(totalAmt / 10))));
                            $("#supCost" + i).val(regPay.comma(totalAmt));
                            $("#vatCost" + i).val(regPay.comma(Math.floor(Number(totalAmt / 10))));
                        } else if(rs.VAT == "Y"){
                            $("#totCost" + i).val(regPay.comma(totalAmt));
                            $("#supCost" + i).val(regPay.comma(Math.ceil(Number(totalAmt / 1.1))));
                            $("#vatCost" + i).val(regPay.comma(Number(totalAmt - Math.ceil(Number(totalAmt / 1.1)))));
                        } else if(rs.VAT == "D") {
                            $("#totCost" + i).val(regPay.comma(totalAmt));
                            $("#supCost" + i).val(regPay.comma(totalAmt));
                            $("#vatCost" + i).val(0);
                        }*/
                        idx++;
                    }
                } else {
                    var ls = rs.itemList;

                    // for(let i = 0; i <ls.length; i++) {
                        if(idx > 0){
                            regPayDet.addRow();
                        }

                        if(cem.MNG_REQ_STAT == "Y") {
                            $("#crmNm" + idx).val(ls[idx].CRM_NM);
                            $("#crmSn" + idx).val(ls[idx].CRM_SN);
                            $("#regNo" + idx).val(ls[idx].CRM_NO_TMP);
                            $("#crmBnkNm" + idx).val(ls[idx].CRM_BN == "undefined" ? "" : ls[idx].CRM_BN);
                            $("#crmAccNo" + idx).val(ls[idx].CRM_BN_NUM == "undefined" ? "" : ls[idx].CRM_BN_NUM);
                            $("#crmAccHolder" + idx).val(ls[idx].BN_DEPO == "undefined" ? "" : ls[idx].BN_DEPO);
                            $("#trCd" + idx).val(ls[idx].TR_CD);
                        }

                        // $("#totCost" + i).val(regPay.comma(cem.TOT_AMT));
                        // $("#supCost" + i).val(regPay.comma(cem.TOT_AMT));
                        $("#budgetNm" + idx).val(cem.BUDGET_NM);
                        $("#budgetSn" + idx).val(cem.BUDGET_SN);
                        $("#budgetAmt" + idx).val(9999999999);

                        var totalAmt = cem.TOT_AMT || cem.REQ_AMT;
                        // if (rs.VAT == "N") {
                        //     $("#totCost" + i).val(regPay.comma(Number(totalAmt) + Math.floor(Number(totalAmt / 10))));
                        //     $("#supCost" + i).val(regPay.comma(totalAmt));
                        //     $("#vatCost" + i).val(regPay.comma(Math.floor(Number(totalAmt / 10))));
                        // } else if (rs.VAT == "Y") {
                        //     $("#totCost" + i).val(regPay.comma(totalAmt));
                        //     $("#supCost" + i).val(regPay.comma(Math.ceil(Number(totalAmt / 1.1))));
                        //     $("#vatCost" + i).val(regPay.comma(Number(totalAmt - Math.ceil(Number(totalAmt / 1.1)))));
                        // } else if (rs.VAT == "D") {
                        //     $("#totCost" + i).val(regPay.comma(totalAmt));
                        //     $("#supCost" + i).val(regPay.comma(totalAmt));
                        //     $("#vatCost" + i).val(0);
                        // }

                        $("#totCost" + idx).val(regPay.comma(totalAmt));
                        $("#supCost" + idx).val(regPay.comma(totalAmt));
                        $("#vatCost" + idx).val(0);

                        idx++;
                    // }
                }

                data.fileCtrl = "Y";
                fileResultTmp.push(customKendo.fn_customAjax("/purc/purcFileList", data).listMap);

                for(var z = 0 ; z < fileResultTmp[x].length ; z++){
                    fileResult.push(fileResultTmp[x][z]);
                }
            }

            var fileList = fileResult;
            var fileThumbText = "";

            for(let k=0; k < fileList.length ; k++){
                if(fileThumbText != ""){
                    fileThumbText += " | ";
                }
                fileThumbText += fileList[k].file_org_name;
                fileThumbText += "." + fileList[k].file_ext;
            }

            $("#fileText").text(fileThumbText);

            $(".totCost").trigger("change")

            regPay.global.fileArray = fileList;
        }

        if($("#reqType").val() == "claimExnp") {
            var data = {
                claimExnpSn: $("#claimExnpSn").val(),
                claimSn : $("#claimSn").val()
            }

            // if($("#purcSn").val() != 'undefined'){
            //     data.purcSn = $("#purcSn").val();
            // }

            var result = customKendo.fn_customAjax("/purc/getPurcAndClaimData", data);

            var rs = result.data;
            const pjtMap = customKendo.fn_customAjax("/project/getProjectStep", {pjtSn: rs.PJT_SN}).rs;

            var claimExnpData = customKendo.fn_customAjax("/purc/getClaimExnpData", data);
            var cem = claimExnpData.map;

            console.log("claimExnpData", claimExnpData)
            // if($("#pjtSn").val != ""){
            //     $("#pjtSn").val(rs.PJT_SN);
            // }
            if(cem != null && cem.PJT_CD != "" && cem.PJT_CD != null && cem.PJT_CD != undefined){
                if(cem.CLAIM_SET_SN == null){
                    $("#pjtSn").val("");
                    selectProject("", cem.PJT_NM, cem.PJT_CD)
                }else{
                    $("#pjtSn").val("");
                    selectProject("", cem.PJT_NM2, cem.PJT_CD2)
                }
            } else {
                selectProject('', '[2024년]법인운영', 'Mm1m124010');
            }

            // if(cem.CNT > 1 ){
            //     $("#appTitle").val(rs.PURC_REQ_PURPOSE + " 외 " + Number(cem.CNT - 1) + "건");
            // } else {
            //     $("#appTitle").val(rs.PURC_REQ_PURPOSE);
            // }

            if(cem.EVID_TYPE == 3){
                var ls = claimExnpData.result.list;

                for(let i = 0; i < ls.length; i++) {
                    if(i > 0){
                        regPayDet.addRow();
                    }

                    $("#eviType" + i).data("kendoDropDownList").value(cem.EVID_TYPE);
                    $("#crmNm" + i).val(ls[i].CRM_NM || ls[i].MER_NM);
                    $("#crmSn" + i).val(ls[i].CRM_SN || "");
                    $("#regNo" + i).val(ls[i].MER_BIZNO || "");
                    $("#crmBnkNm" + i).val(ls[i].JIRO_NM || "");
                    $("#crmAccNo" + i).val(ls[i].BA_NB || "");
                    $("#crmAccHolder" + i).val(ls[i].DEPOSITOR || "");
                    $("#trDe" + i).val(ls[i].AUTH_DD.toString().substring(0, 4) + "-" + ls[i].AUTH_DD.toString().substring(4, 6) + "-" + ls[i].AUTH_DD.toString().substring(6, 8));
                    // $("#totCost" + i).val(regPay.comma(cem.TOT_AMT));
                    // $("#supCost" + i).val(regPay.comma(cem.TOT_AMT));
                    $("#budgetNm" + i).val(cem.BUDGET_NM);
                    $("#budgetSn" + i).val(cem.BUDGET_SN);
                    $("#budgetAmt" + i).val(9999999999);

                    $("#fileNo" + i).val(ls[i].FILE_NO || "");
                    $("#authDd" + i).val(ls[i].AUTH_DD || "");
                    $("#authHh" + i).val(ls[i].AUTH_HH || "");
                    $("#authNo" + i).val(ls[i].AUTH_NO || "");
                    $("#buySts" + i).val(ls[i].BUY_STS || "");
                    $("#trCd" + i).val(ls[i].TR_CD || "");

                    $("#card" + i).val(ls[i].TR_NM);
                    $("#cardNo" + i).val(ls[i].CARD_BA_NB);

                    $("#totCost" + i).val(regPay.comma(ls[i].AUTH_AMT.toString().split(".")[0]));
                    $("#supCost" + i).val(regPay.comma(ls[i].SUPP_PRICE.toString().split(".")[0]));
                    $("#vatCost" + i).val(regPay.comma(ls[i].SURTAX.toString().split(".")[0]));

                    // var totalAmt = ls[i].AUTH_AMT;
                    // if(rs.VAT == "N"){
                    //     $("#totCost" + i).val(regPay.comma(Number(totalAmt) + Math.floor(Number(totalAmt / 10))));
                    //     $("#supCost" + i).val(regPay.comma(totalAmt));
                    //     $("#vatCost" + i).val(regPay.comma(Math.floor(Number(totalAmt / 10))));
                    // } else if(rs.VAT == "Y"){
                    //     $("#totCost" + i).val(regPay.comma(totalAmt));
                    //     $("#supCost" + i).val(regPay.comma(Math.ceil(Number(totalAmt / 1.1))));
                    //     $("#vatCost" + i).val(regPay.comma(Number(totalAmt - Math.ceil(Number(totalAmt / 1.1)))));
                    // } else if(rs.VAT == "D") {
                    //     $("#totCost" + i).val(regPay.comma(totalAmt));
                    //     $("#supCost" + i).val(regPay.comma(totalAmt));
                    //     $("#vatCost" + i).val(0);
                    // }
                }
            } else if (cem.EVID_TYPE == 1){
                var ls = claimExnpData.result.rsList;

                for(let i = 0; i < ls.length; i++) {
                    if(i > 0){
                        regPayDet.addRow();
                    }

                    $("#eviType" + i).data("kendoDropDownList").value(cem.EVID_TYPE);
                    $("#crmNm" + i).val(ls[i].TR_NM || ls[i].TR_NMK);
                    $("#crmSn" + i).val(ls[i].CRM_SN || "");
                    $("#regNo" + i).val(ls[i].REG_NB || "");
                    $("#crmBnkNm" + i).val(ls[i].BANK_NM || "");
                    $("#crmAccNo" + i).val(ls[i].BA_NB || "");
                    $("#crmAccHolder" + i).val(ls[i].DEPOSITOR || "");
                    $("#trDe" + i).val(ls[i].ISS_DT.toString().substring(0, 4) + "-" + ls[i].ISS_DT.toString().substring(4, 6) + "-" + ls[i].ISS_DT.toString().substring(6, 8));
                    // $("#totCost" + i).val(regPay.comma(cem.TOT_AMT));
                    // $("#supCost" + i).val(regPay.comma(cem.TOT_AMT));
                    $("#budgetNm" + i).val(cem.BUDGET_NM);
                    $("#budgetSn" + i).val(cem.BUDGET_SN);
                    $("#budgetAmt" + i).val(9999999999);

                    $("#fileNo" + i).val(ls[i].FILE_NO || "");
                    $("#issNo" + i).val(ls[i].ISS_NO || "");
                    $("#coCd" + i).val(ls[i].CO_CD || "");
                    $("#taxTy" + i).val(ls[i].TAX_TY || "");
                    $("#trCd" + i).val(ls[i].TR_CD || "");

                    $("#expRate" + idx).val(ls[i].EXP_RATE || "");
                    $("#taxRate" + idx).val(ls[i].TAX_RATE || "");
                    $("#payAmt" + idx).val(ls[i].PAY_AMT || "");
                    $("#incTax" + idx).val(ls[i].INC_TAX || "");
                    $("#locIncTax" + idx).val(ls[i].LOC_INC_TAX || "");
                    $("#subAmt" + idx).val(ls[i].SUB_AMT || "");
                    $("#actPayAmt" + idx).val(ls[i].ACT_PAY_AMT || "");

                    $("#totCost" + i).val(regPay.comma(ls[i].SUM_AM.toString().split(".")[0]));
                    $("#supCost" + i).val(regPay.comma(ls[i].SUP_AM.toString().split(".")[0]));
                    $("#vatCost" + i).val(regPay.comma(ls[i].VAT_AM.toString().split(".")[0]));

                    /*var totalAmt = ls[i].SUM_AM.toString().split(".")[0];
                    if(rs.VAT == "N"){
                        $("#totCost" + i).val(regPay.comma(Number(totalAmt) + Math.floor(Number(totalAmt / 10))));
                        $("#supCost" + i).val(regPay.comma(totalAmt));
                        $("#vatCost" + i).val(regPay.comma(Math.floor(Number(totalAmt / 10))));
                    } else if(rs.VAT == "Y"){
                        $("#totCost" + i).val(regPay.comma(totalAmt));
                        $("#supCost" + i).val(regPay.comma(Math.ceil(Number(totalAmt / 1.1))));
                        $("#vatCost" + i).val(regPay.comma(Number(totalAmt - Math.ceil(Number(totalAmt / 1.1)))));
                    } else if(rs.VAT == "D") {
                        $("#totCost" + i).val(regPay.comma(totalAmt));
                        $("#supCost" + i).val(regPay.comma(totalAmt));
                        $("#vatCost" + i).val(0);
                    }*/
                }
            } else {
                var ls = rs.itemList;

                for(let i = 0; i < 1; i++) {
                    if(cem.MNG_REQ_STAT == "Y") {
                        $("#crmNm" + i).val(ls[i].CRM_NM);
                        $("#crmSn" + i).val(ls[i].CRM_SN);
                        $("#regNo" + i).val(ls[i].CRM_NO_TMP);
                        $("#crmBnkNm" + i).val(ls[i].CRM_BN == "undefined" ? "" : ls[i].CRM_BN);
                        $("#crmAccNo" + i).val(ls[i].CRM_BN_NUM == "undefined" ? "" : ls[i].CRM_BN_NUM);
                        $("#crmAccHolder" + i).val(ls[i].BN_DEPO == "undefined" ? "" : ls[i].BN_DEPO);
                        $("#trCd" + i).val(ls[i].TR_CD);
                    }

                    // $("#totCost" + i).val(regPay.comma(cem.TOT_AMT));
                    // $("#supCost" + i).val(regPay.comma(cem.TOT_AMT));
                    $("#budgetNm" + i).val(cem.BUDGET_NM);
                    $("#budgetSn" + i).val(cem.BUDGET_SN);
                    $("#budgetAmt" + i).val(9999999999);

                    var totalAmt = cem.TOT_AMT || cem.REQ_AMT;
                    console.log(rs.VAT)
                    // if(rs.VAT == "N"){
                    //     $("#totCost" + i).val(regPay.comma(Number(totalAmt) + Math.floor(Number(totalAmt / 10))));
                    //     $("#supCost" + i).val(regPay.comma(totalAmt));
                    //     $("#vatCost" + i).val(regPay.comma(Math.floor(Number(totalAmt / 10))));
                    // } else if(rs.VAT == "Y"){
                    //     $("#totCost" + i).val(regPay.comma(totalAmt));
                    //     $("#supCost" + i).val(regPay.comma(Math.ceil(Number(totalAmt / 1.1))));
                    //     $("#vatCost" + i).val(regPay.comma(Number(totalAmt - Math.ceil(Number(totalAmt / 1.1)))));
                    // } else if(rs.VAT == "D") {
                    //     $("#totCost" + i).val(regPay.comma(totalAmt));
                    //     $("#supCost" + i).val(regPay.comma(totalAmt));
                    //     $("#vatCost" + i).val(0);
                    // }

                    $("#totCost" + i).val(regPay.comma(totalAmt));
                    $("#supCost" + i).val(regPay.comma(totalAmt));
                    $("#vatCost" + i).val(0);
                }
            }


            var data = {
                claimExnpSn: $("#claimExnpSn").val(),
                claimSn : $("#claimSn").val()
            }

            if($("#purcSn").val() != 'undefined'){
                data.purcSn = $("#purcSn").val();
            }

            var fileResult = new Array();
            var fileResultTmp = new Array();

            for(let i = 0; i < data.claimExnpSn.toString().split(",").length; i++) {
                data.claimExnpSn = data.claimExnpSn.toString().split(",")[i];
                data.claimSn = data.claimSn.toString().split(",")[i];
                data.fileCtrl = "Y";

                fileResultTmp.push(customKendo.fn_customAjax("/purc/purcFileList", data).listMap);
            }


            fileResult = fileResultTmp[0];

            var fileList = fileResult;
            var fileThumbText = "";

            for(let i=0; i<fileList.length; i++){
                if(fileThumbText != ""){
                    fileThumbText += " | ";
                }
                fileThumbText += fileList[i].file_org_name;
                fileThumbText += "." + fileList[i].file_ext;
            }

            $("#fileText").text(fileThumbText);

            regPay.global.fileArray = fileList;
        }

        if($("#reqType").val() == "bustrip"){
            const hrBizReqResultId = $("#hrBizReqResultId").val();
            const exnpList = [];
            const cardList = [];
            const busResResult = customKendo.fn_customAjax("/bustrip/getBustripOne", { hrBizReqResultId: hrBizReqResultId });
            const busInfo = busResResult.map;

            const corpCar = customKendo.fn_customAjax("/bustrip/getCorpCarExnpData", {hrBizReqResultId : hrBizReqResultId});
            console.log("corpCar", corpCar);
            const corpCarData = corpCar.map;
            console.log("corpCarData", corpCarData);

            for(let i = 0 ; i < hrBizReqResultId.toString().split(",").length ; i++) {
                let tempList = [];
                let tempList2 = [];
                const data = {
                    hrBizReqResultId: hrBizReqResultId.toString().split(",")[i]
                };

                const result = customKendo.fn_customAjax("/bustrip/getPersonalExnpData", data);
                tempList = result.list;
                for(let x=0; x<tempList.length; x++){
                    exnpList.push(tempList[x]);
                }

                const cardResult = customKendo.fn_customAjax("/bustrip/getCardList", data);
                tempList2 = cardResult.list;
                for(let y=0; y<tempList2.length; y++){
                    cardList.push(tempList2[y]);
                }
            }

            if(exnpList.length > 0 && exnpList[0].PJT_SN != null){
                const pjtMap = customKendo.fn_customAjax("/project/getProjectStep", {pjtSn: exnpList[0].PJT_SN}).rs;
                if (pjtMap != null) {
                    var busnClass = pjtMap.BUSN_CLASS;
                    $("#pjtSn").val(pjtMap.PJT_SN);
                    $("#pjtNm").val(pjtMap.PJT_NM);
                    if ($("#pjtSn").val() != "" && busnClass != "D" && busnClass != "V") {
                        selectProject(pjtMap.PJT_SN, pjtMap.PJT_NM, pjtMap.PJT_CD);
                    } else {
                        selectProject('', '[2024년]법인운영', 'Mm1m124010');
                    }
                } else {
                    selectProject('', '[2024년]법인운영', 'Mm1m124010');
                }
            } else {
                selectProject('', '[2024년]법인운영', 'Mm1m124010');
            }

            let totalList = exnpList.length + cardList.length - 1;
            for (let i = 0; i < totalList; i++) {
                regPayDet.addRow();
            }

            let count = 0;
            for (let i = 0; i < exnpList.length; i++) {
                const exnpMap = exnpList[i];
                console.log(exnpMap)
                const index = count;

                /** 개인여비 */
                $("#crmNm" + index).val(exnpMap.EXNP_NAME);
                if(exnpMap.DIVISION == 1){
                    $("#eviType" + index).data("kendoDropDownList").value(3);
                    $("#etc" + index).val(exnpMap.EXNP_NAME + " 개인여비");
                    $("#trDe" + index).val(busInfo.TRIP_DAY_FR);
                } else if (exnpMap.DIVISION == 5){
                    $("#eviType" + index).data("kendoDropDownList").value(6);
                    $("#etc" + index).val(exnpMap.EXNP_NAME);
                }
                $("#totCost" + index).val(regPay.comma(exnpMap.PERSON_SUM));
                $("#supCost" + index).val(regPay.comma(exnpMap.PERSON_SUM));

                const g20CardList = customKendo.fn_customAjax("/g20/getCardList", {
                    searchValue: exnpMap.EXNP_NAME,
                    cardVal : ""
                }).list

                if (g20CardList.length > 0) {
                    const f = g20CardList[0];
                    var trCd = f.TR_CD;
                    var trNm = f.TR_NM;
                    var cardBaNb = f.CARD_BA_NB;
                    var jiro = f.JIRO_NM;
                    var baNb = f.BA_NB;
                    var depositor = f.DEPOSITOR;

                    if (trNm == null || trNm == "" || trNm == "undefined") {
                        trNm = "";
                    }
                    if (cardBaNb == null || cardBaNb == "" || cardBaNb == "undefined") {
                        cardBaNb = "";
                    }
                    if (baNb == null || baNb == "" || baNb == "undefined") {
                        baNb = "";
                    }
                    if (jiro == null || jiro == "" || jiro == "undefined") {
                        jiro = "";
                    }
                    if (depositor == null || depositor == "" || depositor == "undefined") {
                        depositor = "";
                    }
                    if (trCd == null || trCd == "" || trCd == "undefined") {
                        trCd = "";
                    }

                    $("#card" + index).val(trNm);
                    $("#cardNo" + index).val(cardBaNb);
                    $("#trCd" + index).val(trCd);
                    $("#crmBnkNm" + index).val(jiro);
                    $("#crmAccNo" + index).val(baNb);
                    $("#crmAccHolder" + index).val(depositor);
                }
                count++;
            }

            for (let i = 0; i < cardList.length; i++) {
                const cardMap = cardList[i];
                const index = count;

                const parameters = {
                    cardNo: cardMap.CARD_NO,
                    authDate: cardMap.AUTH_DD,
                    authNo: cardMap.AUTH_NO,
                    authTime: cardMap.AUTH_HH,
                    buySts: cardMap.BUY_STS
                }

                const iBrenchResult = customKendo.fn_customAjax("/cam_mng/companyCard/useCardDetail", parameters);
                const data = iBrenchResult.cardInfo;

                $("#eviType" + index).data("kendoDropDownList").value(3);
                $("#crmNm" + index).val(data.MER_NM);
                $("#trDe" + index).val(data.AUTH_DD.substring(0, 4) + "-" + data.AUTH_DD.substring(4, 6) + "-" + data.AUTH_DD.substring(6, 8));
                $("#trCd" + index).val(data.TR_CD);
                $("#totCost" + index).val(comma(data.AUTH_AMT));
                $("#supCost" + index).val(comma(data.SUPP_PRICE));
                $("#vatCost" + index).val(comma(data.SURTAX));
                $("#cardNo" + index).val(data.CARD_NO.substring(0, 4) + "-" + data.CARD_NO.substring(4, 8) + "-" + data.CARD_NO.substring(8, 12) + "-" + data.CARD_NO.substring(12, 16));
                $("#card" + index).val(data.TR_NM);
                $("#buySts" + index).val(data.BUY_STS);
                $("#crmAccHolder" + index).val(data.DEPOSITOR);
                $("#crmAccNo" + index).val(data.BA_NB);
                $("#crmBnkNm" + index).val(data.JIRO_NM);
                $("#regNo" + index).val(data.MER_BIZNO);
                $("#authNo" + index).val(data.AUTH_NO);
                $("#authDd" + index).val(data.AUTH_DD);
                $("#authHh" + index).val(data.AUTH_HH);

                const g20CardList = customKendo.fn_customAjax("/g20/getCardList", {
                    searchValue: cardMap.CARD_NO.slice(-4)
                }).list
                console.log("g20CardList");
                console.log(g20CardList);

                if (g20CardList.length > 0) {
                    const f = g20CardList[0];
                    var trCd = f.TR_CD;
                    var trNm = f.TR_NM;
                    var cardBaNb = f.CARD_BA_NB;
                    var jiro = f.JIRO_NM;
                    var baNb = f.BA_NB;
                    var depositor = f.DEPOSITOR;

                    if (trNm == null || trNm == "" || trNm == "undefined") {
                        trNm = "";
                    }
                    if (cardBaNb == null || cardBaNb == "" || cardBaNb == "undefined") {
                        cardBaNb = "";
                    }
                    if (baNb == null || baNb == "" || baNb == "undefined") {
                        baNb = "";
                    }
                    if (jiro == null || jiro == "" || jiro == "undefined") {
                        jiro = "";
                    }
                    if (depositor == null || depositor == "" || depositor == "undefined") {
                        depositor = "";
                    }
                    if (trCd == null || trCd == "" || trCd == "undefined") {
                        trCd = "";
                    }

                    $("#card" + index).val(trNm);
                    $("#cardNo" + index).val(cardBaNb);
                    $("#trCd" + index).val(trCd);
                    $("#crmBnkNm" + index).val(jiro);
                    $("#crmAccNo" + index).val(baNb);
                    $("#crmAccHolder" + index).val(depositor);
                }

                count++;
            }

            if (exnpList.length > 0 && exnpList[0].PJT_SN != null) {
                const pjtMap = customKendo.fn_customAjax("/project/getProjectStep", {pjtSn: exnpList[0].PJT_SN}).rs;
                var busnClass = pjtMap.BUSN_CLASS; console.log("busnClass", busnClass);
                $("#pjtSn").val(pjtMap.PJT_SN);
                $("#pjtNm").val(pjtMap.PJT_NM);
                if ($("#pjtSn").val() != "" && busnClass != "D" && busnClass != "V") {
                    selectProject(pjtMap.PJT_SN, pjtMap.PJT_NM, pjtMap.PJT_CD);
                    if (corpCarData != null && (corpCarData.TOT_COST != null || corpCarData.TOT_COST != "0")) {
                        const g20CardList = customKendo.fn_customAjax("/g20/getCardList", {
                            searchValue: '법인차량',
                            cardVal: 'P'
                        }).list

                        let index = count;

                        console.log("g20CardList", g20CardList);

                        regPayDet.addRow();

                        const f = g20CardList[0];
                        var trCd = f.TR_CD;
                        var trNm = f.TR_NM;
                        var cardBaNb = f.CARD_BA_NB;
                        var jiro = f.JIRO_NM;
                        var baNb = f.BA_NB;
                        var depositor = f.DEPOSITOR;

                        if (trNm == null || trNm == "" || trNm == "undefined") {
                            trNm = "";
                        }
                        if (cardBaNb == null || cardBaNb == "" || cardBaNb == "undefined") {
                            cardBaNb = "";
                        }
                        if (baNb == null || baNb == "" || baNb == "undefined") {
                            baNb = "";
                        }
                        if (jiro == null || jiro == "" || jiro == "undefined") {
                            jiro = "";
                        }
                        if (depositor == null || depositor == "" || depositor == "undefined") {
                            depositor = "";
                        }
                        if (trCd == null || trCd == "" || trCd == "undefined") {
                            trCd = "";
                        }

                        $("#eviType" + index).data("kendoDropDownList").value(3);
                        $("#crmNm" + index).val(depositor)
                        $("#card" + index).val(trNm);
                        $("#cardNo" + index).val(cardBaNb);
                        $("#trCd" + index).val(trCd);
                        $("#crmBnkNm" + index).val(jiro);
                        $("#crmAccNo" + index).val(baNb);
                        $("#crmAccHolder" + index).val(depositor);

                        if (corpCarData != null) {
                            $("#totCost" + index).val(comma(corpCarData.TOT_COST));
                            $("#supCost" + index).val(comma(corpCarData.TOT_COST));
                        }

                        count++;
                    }
                } else {
                    selectProject('', '[2024년]법인운영', 'Mm1m124010');
                }
            } else {
                selectProject('', '[2024년]법인운영', 'Mm1m124010');
            }

            /*if (exnpList[0].PJT_SN != null) {
                if(pjtMap != null){
                    var busnClass = pjtMap.BUSN_CLASS;
                    $("#pjtSn").val(pjtMap.PJT_SN);
                    $("#pjtNm").val(pjtMap.PJT_NM);
                    if (!($("#pjtSn").val() != "" && busnClass == "D" && busnClass == "V")) {
                        if (corpCar != null) {
                            const g20CardList = customKendo.fn_customAjax("/g20/getCardList", {
                                searchValue: '법인차량',
                                cardVal: 'P'
                            }).list

                            let index = count;

                            regPayDet.addRow();

                            const f = g20CardList[0];
                            var trCd = f.TR_CD;
                            var trNm = f.TR_NM;
                            var cardBaNb = f.CARD_BA_NB;
                            var jiro = f.JIRO_NM;
                            var baNb = f.BA_NB;
                            var depositor = f.DEPOSITOR;

                            if (trNm == null || trNm == "" || trNm == "undefined") {
                                trNm = "";
                            }
                            if (cardBaNb == null || cardBaNb == "" || cardBaNb == "undefined") {
                                cardBaNb = "";
                            }
                            if (baNb == null || baNb == "" || baNb == "undefined") {
                                baNb = "";
                            }
                            if (jiro == null || jiro == "" || jiro == "undefined") {
                                jiro = "";
                            }
                            if (depositor == null || depositor == "" || depositor == "undefined") {
                                depositor = "";
                            }
                            if (trCd == null || trCd == "" || trCd == "undefined") {
                                trCd = "";
                            }

                            $("#eviType" + index).data("kendoDropDownList").value(3);
                            $("#crmNm" + index).val(depositor)
                            $("#card" + index).val(trNm);
                            $("#cardNo" + index).val(cardBaNb);
                            $("#trCd" + index).val(trCd);
                            $("#crmBnkNm" + index).val(jiro);
                            $("#crmAccNo" + index).val(baNb);
                            $("#crmAccHolder" + index).val(depositor);

                            if (corpCar.map != null) {
                                $("#totCost" + index).val(comma(corpCar.map.TOT_COST));
                                $("#supCost" + index).val(comma(corpCar.map.TOT_COST));
                            }

                            count++;
                        }
                    }
                }
            }else{
                if (corpCar != null) {
                    const g20CardList = customKendo.fn_customAjax("/g20/getCardList", {
                        searchValue: '법인차량',
                        cardVal: 'P'
                    }).list

                    let index = count;

                    regPayDet.addRow();

                    const f = g20CardList[0];
                    var trCd = f.TR_CD;
                    var trNm = f.TR_NM;
                    var cardBaNb = f.CARD_BA_NB;
                    var jiro = f.JIRO_NM;
                    var baNb = f.BA_NB;
                    var depositor = f.DEPOSITOR;

                    if (trNm == null || trNm == "" || trNm == "undefined") {
                        trNm = "";
                    }
                    if (cardBaNb == null || cardBaNb == "" || cardBaNb == "undefined") {
                        cardBaNb = "";
                    }
                    if (baNb == null || baNb == "" || baNb == "undefined") {
                        baNb = "";
                    }
                    if (jiro == null || jiro == "" || jiro == "undefined") {
                        jiro = "";
                    }
                    if (depositor == null || depositor == "" || depositor == "undefined") {
                        depositor = "";
                    }
                    if (trCd == null || trCd == "" || trCd == "undefined") {
                        trCd = "";
                    }

                    $("#eviType" + index).data("kendoDropDownList").value(3);
                    $("#crmNm" + index).val(depositor)
                    $("#card" + index).val(trNm);
                    $("#cardNo" + index).val(cardBaNb);
                    $("#trCd" + index).val(trCd);
                    $("#crmBnkNm" + index).val(jiro);
                    $("#crmAccNo" + index).val(baNb);
                    $("#crmAccHolder" + index).val(depositor);

                    if (corpCar.map != null) {
                        $("#totCost" + index).val(comma(corpCar.map.TOT_COST));
                        $("#supCost" + index).val(comma(corpCar.map.TOT_COST));
                    }

                    count++;
                }
            }*/

            var blist = "";
            var fileThumbText = "";
            var docFileThumbText = "";
            var tempExnpFile = [];

            for(let i = 0 ; i < hrBizReqResultId.toString().split(",").length; i++) {
                /** 첨부파일 */
                // const exnpFile = customKendo.fn_customAjax("/bustrip/getExnpFileNum", {
                //     hrBizReqResultId: hrBizReqResultId.toString().split(",")[i]
                // }).list;
                //
                // for(let x = 0 ; x < exnpFile.length; x++) {
                //     regPay.global.fileArray.push(exnpFile[x]);
                //     tempExnpFile.push(exnpFile[x]);
                // }
                //
                // for (let y = 0; y < exnpFile.length; y++) {
                //     if (blist != "") {
                //         blist += ",";
                //     }
                //     if (fileThumbText != "") {
                //         fileThumbText += " | ";
                //     }
                //     blist += exnpFile[y].file_no;
                //     fileThumbText += exnpFile[y].file_org_name;
                //     fileThumbText += "." + exnpFile[y].file_ext;
                // }

                //출장신청서,출장결과보고 전자결재 file_no 추가
                const bustripDocFiles = customKendo.fn_customAjax("/bustrip/getBustripDocFile", {
                    hrBizReqResultId: hrBizReqResultId.toString().split(",")[i]
                }).list;

                for (let z = 0; z < bustripDocFiles.length; z++) {
                    regPay.global.fileArray.push(bustripDocFiles[z]);

                    if (blist != "") {
                        blist += ",";
                    }
                    if (docFileThumbText != "") {
                        docFileThumbText += " | ";
                    }
                    blist += bustripDocFiles[z].file_no;
                    docFileThumbText += bustripDocFiles[z].file_org_name;
                    docFileThumbText += "." + bustripDocFiles[z].file_ext;
                }
            }

            // for (let i = 0; i < cardList.length; i++) {
            //     if (cardList[i].FILE_NO != null) {
            //         const fileData = customKendo.fn_customAjax("/common/getFileInfo", {
            //             fileNo: cardList[i].FILE_NO
            //         }).data;
            //         regPay.global.fileArray.push(fileData);
            //
            //         if (blist != "") {
            //             blist += ",";
            //         }
            //         if (fileThumbText != "") {
            //             fileThumbText += " | ";
            //         }
            //         blist += fileData.file_no;
            //         fileThumbText += fileData.file_org_name;
            //         fileThumbText += "." + fileData.file_ext;
            //     }
            // }


            var fileNameArray = fileThumbText.split(' | ');
            var setValues = Array.from(new Set(fileNameArray));
            var resultFileName = setValues.join(' | ');

            var blistArray = blist.split(',');
            var setValues2 = Array.from(new Set(blistArray));
            var resultBlist = setValues2.join(',');


            $("#fileText").text(resultFileName + ' | ' + docFileThumbText);
            $("#bList").val(resultBlist);
        }

        if($("#reqType").val() == "business"){
            const hrBizReqId = $("#hrBizReqId").val();
            const hrBizReqResultId = $("#hrBizReqResultId").val();
            const data = {
                hrBizReqId : hrBizReqId,
                hrBizReqResultId : hrBizReqResultId
            }

            const result = customKendo.fn_customAjax("/bustrip/getBusinessOverExnpData", data);
            const exnpList = result.list;

            const result2 = customKendo.fn_customAjax("/bustrip/getBusinessCorpOverExnpData", data);
            const exnpList2 = result2.list;

            if(exnpList.length > 0 && exnpList[0].PJT_SN != null){
                const pjtMap = customKendo.fn_customAjax("/project/getProjectStep", {pjtSn: exnpList[0].PJT_SN}).rs;
                if (pjtMap != null) {
                    var busnClass = pjtMap.BUSN_CLASS; console.log(busnClass);
                    $("#pjtSn").val(pjtMap.PJT_SN);
                    $("#pjtNm").val(pjtMap.PJT_NM);
                    if($("#pjtSn").val() != "" && busnClass != "D" && busnClass != "V"){
                        selectProject(pjtMap.PJT_SN, pjtMap.PJT_NM, pjtMap.PJT_CD);
                    }else{
                        selectProject('', '[2024년]법인운영', 'Mm1m124010');
                    }
                }else {
                    selectProject('', '[2024년]법인운영', 'Mm1m124010');
                }
            }else {
                selectProject('', '[2024년]법인운영', 'Mm1m124010');
            }

            let totalList = (exnpList.length + exnpList2.length) - 1;
            console.log(exnpList)
            for(let i=0; i < totalList - 1; i++) {
                regPayDet.addRow();
            }

            let count = 0;
            for(let i=0; i < exnpList.length - 1; i++) {
                if(exnpList[i].DIVISION != "3"){
                    const exnpMap = exnpList[i];
                    const index = count;

                    /** 개인여비 */
                    if(exnpMap.DIVISION == "1"){
                        $("#eviType" + index).data("kendoDropDownList").value(3);
                        $("#crmNm"+index).val(exnpMap.EXNP_NAME);
                        $("#etc"+index).val(exnpMap.EXNP_NAME+" 개인여비");
                        $("#totCost"+index).val(regPay.comma(exnpMap.PERSON_SUM));
                        $("#supCost"+index).val(regPay.comma(exnpMap.PERSON_SUM));

                        let cData = {
                            searchValue : exnpMap.CARD_NO,
                            cardVal : "userCard",
                        }

                        var cResult = customKendo.fn_customAjax("/g20/getCardList", cData);

                        if (cResult != null && cResult.list.length > 0) {
                            const f = cResult.list[0];
                            var trCd = f.TR_CD;
                            var trNm = f.TR_NM;
                            var cardBaNb = f.CARD_BA_NB;
                            var jiro = f.JIRO_NM;
                            var baNb = f.BA_NB;
                            var depositor = f.DEPOSITOR;

                            if(trNm == null || trNm == "" || trNm == "undefined"){
                                trNm = "";
                            }
                            if (cardBaNb == null || cardBaNb == "" || cardBaNb == "undefined") {
                                cardBaNb = "";
                            }
                            if (baNb == null || baNb == "" || baNb == "undefined") {
                                baNb = "";
                            }
                            if (jiro == null || jiro == "" || jiro == "undefined") {
                                jiro = "";
                            }
                            if (depositor == null || depositor == "" || depositor == "undefined") {
                                depositor = "";
                            }
                            if (trCd == null || trCd == "" || trCd == "undefined") {
                                trCd = "";
                            }

                            $("#card" + index).val(trNm);
                            $("#cardNo" + index).val(cardBaNb);
                            $("#trCd" + index).val(trCd);
                            $("#crmBnkNm" + index).val(jiro);
                            $("#crmAccNo" + index).val(baNb);
                            $("#crmAccHolder" + index).val(depositor);
                        }

                    } else {
                        $("#eviType" + index).data("kendoDropDownList").value(6);
                        console.log(exnpMap)
                        if(exnpMap.DIVISION == "5"){
                            $("#etc"+index).val(exnpMap.EXNP_NAME);
                        } else if(exnpMap.DIVISION == "4"){
                            $("#etc"+index).val("업체지급");
                        } else {
                            $("#etc"+index).val("법인차량");
                        }
                        $("#totCost"+index).val(regPay.comma(exnpMap.PERSON_SUM));
                        $("#supCost"+index).val(regPay.comma(exnpMap.PERSON_SUM));
                    }

                    if(exnpMap.DIVISION == "4" && exnpMap.PERSON_SUM == 0){
                        regPayDet.delRow(count);
                    }

                    count++;
                }
            }

            for (let i = 0; i < exnpList2.length; i++) {
                const cardMap = exnpList2[i];
                const index = count;

                const parameters = {
                    cardNo: cardMap.CARD_NO,
                    authDate: cardMap.AUTH_DD,
                    authNo: cardMap.AUTH_NO,
                    authTime: cardMap.AUTH_HH,
                    buySts: cardMap.BUY_STS
                }

                const iBrenchResult = customKendo.fn_customAjax("/cam_mng/companyCard/useCardDetail", parameters);
                const data = iBrenchResult.cardInfo;

                $("#eviType" + index).data("kendoDropDownList").value(3);
                $("#crmNm" + index).val(data.MER_NM);
                $("#trDe" + index).val(data.AUTH_DD.substring(0, 4) + "-" + data.AUTH_DD.substring(4, 6) + "-" + data.AUTH_DD.substring(6, 8));
                $("#trCd" + index).val(data.TR_CD);
                $("#totCost" + index).val(comma(data.AUTH_AMT));
                $("#supCost" + index).val(comma(data.SUPP_PRICE));
                $("#vatCost" + index).val(comma(data.SURTAX));
                $("#cardNo" + index).val(data.CARD_NO.substring(0, 4) + "-" + data.CARD_NO.substring(4, 8) + "-" + data.CARD_NO.substring(8, 12) + "-" + data.CARD_NO.substring(12, 16));
                $("#card" + index).val(data.TR_NM);
                $("#buySts" + index).val(data.BUY_STS);
                $("#crmAccHolder" + index).val(data.DEPOSITOR);
                $("#crmAccNo" + index).val(data.BA_NB);
                $("#crmBnkNm" + index).val(data.JIRO_NM);
                $("#regNo" + index).val(data.MER_BIZNO);
                $("#authNo" + index).val(data.AUTH_NO);
                $("#authDd" + index).val(data.AUTH_DD);
                $("#authHh" + index).val(data.AUTH_HH);

                const g20CardList = customKendo.fn_customAjax("/g20/getCardList", {
                    searchValue: cardMap.CARD_NO.slice(-4)
                }).list

                if (g20CardList.length > 0) {
                    const f = g20CardList[0];
                    var trCd = f.TR_CD;
                    var trNm = f.TR_NM;
                    var cardBaNb = f.CARD_BA_NB;
                    var jiro = f.JIRO_NM;
                    var baNb = f.BA_NB;
                    var depositor = f.DEPOSITOR;

                    if (trNm == null || trNm == "" || trNm == "undefined") {
                        trNm = "";
                    }
                    if (cardBaNb == null || cardBaNb == "" || cardBaNb == "undefined") {
                        cardBaNb = "";
                    }
                    if (baNb == null || baNb == "" || baNb == "undefined") {
                        baNb = "";
                    }
                    if (jiro == null || jiro == "" || jiro == "undefined") {
                        jiro = "";
                    }
                    if (depositor == null || depositor == "" || depositor == "undefined") {
                        depositor = "";
                    }
                    if (trCd == null || trCd == "" || trCd == "undefined") {
                        trCd = "";
                    }

                    $("#card" + index).val(trNm);
                    $("#cardNo" + index).val(cardBaNb);
                    $("#trCd" + index).val(trCd);
                    $("#crmBnkNm" + index).val(jiro);
                    $("#crmAccNo" + index).val(baNb);
                    $("#crmAccHolder" + index).val(depositor);
                }

                count++;
            }

            var blist = "";
            var fileThumbText = "";
            var docFileThumbText = "";

            /** 첨부파일 */
            let exnpUrl = "";
            let exnpData = [];
            if($("#hrBizReqId").val() != null && $("#hrBizReqId").val() != "" && $("#hrBizReqId").val() != "undefined"){
                exnpUrl = "/bustrip/getBustripReqInfo";
                exnpData = {
                    hrBizReqId: $("#hrBizReqId").val()
                };
            } else if ($("#hrBizReqResultId").val() != null && $("#hrBizReqResultId").val() != "" && $("#hrBizReqResultId").val() != "undefined") {
                exnpUrl = "/bustrip/getBustripResReqInfo";
                exnpData = {
                    hrBizReqResultId: $("#hrBizReqResultId").val()
                };
            }
            const exnpFile = customKendo.fn_customAjax(exnpUrl, exnpData);
            const fileInfo = exnpFile.rs.fileInfo;
            const fileInfo2 = exnpFile.rs.fileInfo2;
            const fileInfo3 = exnpFile.rs.fileInfo3;
            let tempExnpFile = [];

            //출장신청서,출장결과보고 전자결재 file_no 추가
            let bizReqUrl = "";
            let bizReqData = [];
            if($("#hrBizReqId").val() != null && $("#hrBizReqId").val() != "" && $("#hrBizReqId").val() != "undefined"){
                bizReqUrl = "/bustrip/getBustripReqDocFile";
                bizReqData = {
                    hrBizReqId: $("#hrBizReqId").val()
                };
            } else if ($("#hrBizReqResultId").val() != null && $("#hrBizReqResultId").val() != "" && $("#hrBizReqResultId").val() != "undefined") {
                bizReqUrl = "/bustrip/getBustripDocFile";
                bizReqData = {
                    hrBizReqResultId: $("#hrBizReqResultId").val(),
                    reqType: $("#reqType").val()
                };
            }

            const bustripDocFiles = customKendo.fn_customAjax(bizReqUrl, bizReqData).list;

            for (let y = 0; y < bustripDocFiles.length; y++) {
                if (blist != "") {
                    blist += ",";
                }
                if (fileThumbText != "") {
                    fileThumbText += " | ";
                }
                blist += bustripDocFiles[y].file_no;
                fileThumbText += bustripDocFiles[y].file_org_name;
                fileThumbText += "." + bustripDocFiles[y].file_ext;
                regPay.global.fileArray.push(bustripDocFiles[y]);
            }

            /** 첨부파일 - 카드사용내역 */
            const cardResult = customKendo.fn_customAjax("/bustrip/getCardList", {
                hrBizReqId: $("#hrBizReqId").val(),
                hrBizReqResultId: $("#hrBizReqResultId").val()
            });
            const cardList = cardResult.list;

            for (let y = 0; y < fileInfo.length; y++) {
                if (blist != "") {
                    blist += ",";
                }
                if (fileThumbText != "") {
                    fileThumbText += " | ";
                }
                blist += fileInfo[y].file_no;
                fileThumbText += fileInfo[y].file_org_name;
                fileThumbText += "." + fileInfo[y].file_ext;
                regPay.global.fileArray.push(fileInfo[y]);
            }

            for (let y = 0; y < fileInfo2.length; y++) {
                if (blist != "") {
                    blist += ",";
                }
                if (fileThumbText != "") {
                    fileThumbText += " | ";
                }
                blist += fileInfo2[y].file_no;
                fileThumbText += fileInfo2[y].file_org_name;
                fileThumbText += "." + fileInfo2[y].file_ext;
                regPay.global.fileArray.push(fileInfo2[y]);
            }

            // for (let y = 0; y < fileInfo3.length; y++) {
            //     if (blist != "") {
            //         blist += ",";
            //     }
            //     if (fileThumbText != "") {
            //         fileThumbText += " | ";
            //     }
            //     blist += fileInfo3[y].file_no;
            //     fileThumbText += fileInfo3[y].file_org_name;
            //     fileThumbText += "." + fileInfo3[y].file_ext;
            //     regPay.global.fileArray.push(fileInfo3[y]);
            // }

            for(let i=0; i<cardList.length; i++){
                if(cardList[i].FILE_NO != null){
                    const fileData = customKendo.fn_customAjax("/common/getFileInfo", {
                        fileNo: cardList[i].FILE_NO
                    }).data;
                    tempExnpFile.push(fileData);
                    regPay.global.fileArray.push(fileData);
                }
            }

            for(let y=0; y<tempExnpFile.length; y++){
                if (blist != "") {
                    blist += ",";
                }
                if (fileThumbText != "") {
                    fileThumbText += " | ";
                }
                blist += tempExnpFile[y].file_no;
                fileThumbText += tempExnpFile[y].file_org_name;
                fileThumbText += "." + tempExnpFile[y].file_ext;
            }

            var fileNameArray = fileThumbText.split(' | ');
            var setValues = Array.from(new Set(fileNameArray));
            var resultFileName = setValues.join(' | ');

            var blistArray = blist.split(',');
            var setValues2 = Array.from(new Set(blistArray));
            var resultBlist = setValues2.join(',');

            $("#fileText").text(fileThumbText);
            $("#bList").val(resultBlist);
        }

        if($("#reqType").val() == "snack"){
            const snackInfoSn = $("#snackInfoSn").val();
            var count = 0;
            var fileThumbText = "";
            var slist = "";

            for(let i = 0 ; i < snackInfoSn.toString().split(",").length ; i++){
                let temp = snackInfoSn.toString().split(",")[i];
                const data = {
                    snackInfoSn : snackInfoSn.toString().split(",")[i],
                    fileNo : 0
                }

                const result = customKendo.fn_customAjax("/inside/getSnackOne", data);
                const snackData = result.data;

                const cardResult = customKendo.fn_customAjax("/snack/getCardList", data);
                const cardList = cardResult.list;

                var pData = {
                    pjtNm : "법인운영",
                    baseYear : snackData.USE_DT.toString().substring(0, 4)
                }
                const projectResult = customKendo.fn_customAjax("/project/getG20ProjectList", pData);
                selectProject(projectResult.list[0].PJT_SN, projectResult.list[0].PJT_NM, projectResult.list[0].PJT_CD);

                var fileResult = customKendo.fn_customAjax("/snack/getFileList", data);
                var fileList = fileResult.fileList;

                for(let i=0; i<fileList.length; i++){
                    if(slist != ""){
                        slist += ",";
                    }
                    if(fileThumbText != ""){
                        fileThumbText += " | ";
                    }
                    slist += fileList[i].file_no;
                    fileThumbText += fileList[i].file_org_name;
                    fileThumbText += "." + fileList[i].file_ext;
                }

                $("#fileText").text(fileThumbText);
                $("#sList").val(slist);

                regPay.global.fileArray = regPay.global.fileArray.concat(fileList);

                /** 개인여비 */
                if(snackData.PAY_TYPE != null){
                    if(count != 0){
                        regPayDet.addRow();
                    }
                    if(snackData.PAY_TYPE != "2"){
                        const cData = {
                            searchValue : snackData.CARD_SN,
                            cardVal : "userCard",
                        }

                        var cResult = customKendo.fn_customAjax("/g20/getCardList", cData);
                        var cr = cResult.list[0];
                        fn_selCardInfo(cr.TR_CD, cr.TR_NM, cr.CARD_BA_NB, cr.JIRO_NM, cr.CLTTR_CD, cr.BA_NB, cr.DEPOSITOR, count);
                        $("#eviType" + count).data("kendoDropDownList").value(3);
                        // $("#etc" + count).val(snackData.RECIPIENT_EMP_NAME + "의 개인카드 식대사용");
                        $("#totCost" + count).val(regPay.comma(snackData.AMOUNT_SN));
                        $("#supCost" + count).val(regPay.comma(snackData.AMOUNT_SN));
                        $("#crmNm" + count).val(snackData.AREA_NAME);
                        count++;
                    }else {
                        /** 법인카드 사용내역 */
                        if(count == 0){
                            for(let i=(1 + count); i < (cardList.length+count); i++) {
                                regPayDet.addRow();
                            }
                        }else{
                            for(let i=(1 + count); i < (cardList.length+count); i++) {
                                regPayDet.addRow();
                            }
                        }

                        for(let i= 0; i<cardList.length; i++){
                            const cardMap = cardList[i];
                            const index = count;

                            const parameters = {
                                cardNo : cardMap.CARD_NO,
                                authDate : cardMap.AUTH_DD,
                                authNo : cardMap.AUTH_NO,
                                authTime : cardMap.AUTH_HH,
                                buySts : cardMap.BUY_STS,

                                reqTypeZ : "snack",
                                snackInfoSn : temp,
                                fileNo : 0
                            }

                            const iBrenchResult = customKendo.fn_customAjax("/cam_mng/companyCard/useCardDetail", parameters);
                            const data = iBrenchResult.cardInfo;

                            $("#eviType" + index).data("kendoDropDownList").value(3);
                            $("#crmNm" + index).val(data.MER_NM);
                            $("#trDe" + index).val(data.AUTH_DD.substring(0,4) + "-" + data.AUTH_DD.substring(4,6) + "-" + data.AUTH_DD.substring(6,8));
                            $("#trCd" + index).val(data.TR_CD);
                            $("#totCost" + index).val(comma(data.AUTH_AMT));
                            $("#supCost" + index).val(comma(data.SUPP_PRICE));
                            $("#vatCost" + index).val(comma(data.SURTAX));
                            $("#cardNo" + index).val(data.CARD_NO.substring(0,4) + "-" + data.CARD_NO.substring(4,8) + "-" + data.CARD_NO.substring(8,12) + "-" + data.CARD_NO.substring(12,16));
                            $("#card" + index).val(data.TR_NM);
                            $("#buySts" + index).val(data.BUY_STS);
                            $("#crmAccHolder" + index).val(data.DEPOSITOR);
                            $("#crmAccNo" + index).val(data.BA_NB);
                            $("#crmBnkNm" + index).val(data.JIRO_NM);
                            $("#regNo" + index).val(data.MER_BIZNO);
                            $("#authNo" + index).val(data.AUTH_NO);
                            $("#authDd" + index).val(data.AUTH_DD);
                            $("#authHh" + index).val(data.AUTH_HH);
                            $("#fileNo" + index).val(data.FILE_NO);

                            const g20CardList = customKendo.fn_customAjax("/g20/getCardList", {
                                searchValue: data.CARD_NO.slice(-4)
                            }).list

                            if(g20CardList.length > 0){
                                const f = g20CardList[0];
                                var trCd = f.TR_CD;
                                var trNm = f.TR_NM;
                                var cardBaNb = f.CARD_BA_NB;
                                var jiro = f.JIRO_NM;
                                var baNb = f.BA_NB;
                                var depositor = f.DEPOSITOR;

                                if(trNm == null || trNm == "" || trNm == "undefined"){
                                    trNm = "";
                                }
                                if(cardBaNb == null || cardBaNb == "" || cardBaNb == "undefined"){
                                    cardBaNb = "";
                                }
                                if(baNb == null || baNb == "" || baNb == "undefined"){
                                    baNb = "";
                                }
                                if(jiro == null || jiro == "" || jiro == "undefined"){
                                    jiro = "";
                                }
                                if(depositor == null || depositor == "" || depositor == "undefined"){
                                    depositor = "";
                                }
                                if(trCd == null || trCd == "" || trCd == "undefined"){
                                    trCd = "";
                                }

                                $("#card" + index).val(trNm);
                                $("#cardNo" + index).val(cardBaNb);
                                $("#trCd" + index).val(trCd);
                                $("#crmBnkNm" + index).val(jiro);
                                $("#crmAccNo" + index).val(baNb);
                                $("#crmAccHolder" + index).val(depositor);
                            }

                            count++;
                        }
                    }
                }
            }
        }

        if($("#reqType").val() == "camproject"){
            const pjtCd = $("#cardPjtCd").val();
            const pjtMap = customKendo.fn_customAjax("/project/getProjectStep", {pjtSn: $("#cardPjtSn").val()}).rs;

            if (pjtMap != null) {
                $("#pjtSn").val(pjtMap.PJT_SN);
                $("#pjtNm").val(pjtMap.PJT_NM);
                if ($("#pjtSn").val() != "") {
                    selectProject(pjtMap.PJT_SN, pjtMap.PJT_NM, pjtCd);
                }
            }
        }

        if($("#reqType").val() != "camproject" && $("#payDestTb").find("tr").length != 1){
            for(var i = 0 ; i < $("#payDestTb").find("tr").length ; i++){
                if($("#totCost" + i).val() == 0){
                    regPayDet.delRow(i)
                }
            }
        }


        $(".payDestInfo td input").css("font-size", "10px");
        $(".payDestInfo td").css("padding", "0.35rem");
        $(".payDestInfo td span").css("font-size", "10px");

        $("#reasonPopText, #reCallReason").kendoTextBox();

        var dataSource = customKendo.fn_customAjax("/setManagement/getExnpDeChangeRs");

        customKendo.fn_dropDownList("exnpIss", dataSource.list, "TITLE", "CHNG_RS_SN", 2);

        var totAllCost = 0;
        $(".totCost").each(function(){
            totAllCost += Number(regPay.uncommaN($(this).val()));
        });
        $("#totalAllCost").text(regPay.comma(totAllCost));

        if($("#auth").val() == "mng"){
            if($("#payAppType").data("kendoRadioGroup").value() == "1"){
                $("#exnpAddBtn").text("지출결의서 작성");
                $("#cardTitle").text("지급신청서");
            } else if($("#payAppType").data("kendoRadioGroup").value() == "2"){
                $("#cardTitle").text("여입신청서");
                $("#exnpAddBtn").text("여입결의서 작성");
            } else if($("#payAppType").data("kendoRadioGroup").value() == "3"){
                $("#cardTitle").text("반납신청서");
                $("#exnpAddBtn").text("반납결의서 작성");
            } else if($("#payAppType").data("kendoRadioGroup").value() == "4"){
                $("#cardTitle").text("대체신청서");
                $("#exnpAddBtn").text("대체결의서 작성");
            }
        }

        if($("#cardToSn").val() != ""){
            if($("#cardPjtCd").val() != ""){
                selectProject('', $("#cardPjtNm").val(), $("#cardPjtCd").val());
            } else {
                selectProject('', '[2024년]법인운영', 'Mm1m124010');
            }
        }




    },

    fn_reasonClickModal : function(e){
        $("#reasonIdx").val(e);
        if($("#reason" + e).val() == null || $("#reason" + e).val() == "" || $("#reason" + e).val() == "undefined"){
            $("#reason" + e).val($("#appTitle").val())
        }
        $("#reasonPopText").val($("#reason" + e).val());


        var dialog = $("#dialog").data("kendoWindow");
        dialog.center();
        dialog.open();
    },

    fn_updReason : function(index, type){
        if(index >= 0 && type != "dataSet"){
            $("#reason" + index).val($("#appTitle").val());
        }else if(index >= 0 && type == "dataSet"){
            $("#reason" + $("#reasonIdx").val()).val($("#reasonPopText").val());
        }else{
            var dialog = $("#dialog").data("kendoWindow");
            $("#reason" + $("#reasonIdx").val()).val($("#reasonPopText").val());
            dialog.close();
        }
    },

    payAppBtnSet: function (data){
        let buttonHtml = "";

        if(data != null){
            if(data.DOC_STATUS == "0"){
                buttonHtml += '<button type="button" id="saveBtn" style="margin-right: 5px;" class="k-button k-button-solid-info" onclick="regPay.fn_save(\'user\')">저장</button>';
                buttonHtml += '<button type="button" id="reqBtn" style="margin-right: 5px;" class="k-button k-button-solid-info" onclick="regPay.fn_popDateSetting()">상신</button>';
            }else if(data.DOC_STATUS == "10" || data.DOC_STATUS == "50"){
                buttonHtml += '<button type="button" id="reqCancelBtn" style="margin-right: 5px;" class="k-button k-button-solid-error" onclick="docApprovalRetrieve(\''+data.DOC_ID+'\', \'camticPayApp_'+data.PAY_APP_SN+'\', 1, \'retrieve\');">회수</button>';
            }else if(data.DOC_STATUS == "30" || data.DOC_STATUS == "40"){
                buttonHtml += '<button type="button" id="saveBtn" style="margin-right: 5px;" class="k-button k-button-solid-info" onclick="regPay.fn_save(\'user\')">저장</button>';
                buttonHtml += '<button type="button" id="reReqBtn" style="margin-right: 5px;" class="k-button k-button-solid-error" onclick="regPay.fn_popDateSetting();">재상신</button>';
            }else if(data.DOC_STATUS == "100"){
                if($("#apprMngStat").val() == 'M'){
                    buttonHtml += '<button type="button" id="reCallBtn" style="margin-right: 5px;" class="k-button k-button-solid-primary" onclick="regPay.fn_revertModal(\''+data.DOC_ID+'\')">반려</button>';
                }
                buttonHtml += '<button type="button" id="viewBtn" style="margin-right: 5px;" class="k-button k-button-solid-base" onclick="approveDocView(\''+data.DOC_ID+'\', \'payApp'+data.PAY_APP_SN+'\', \'payApp\');">열람</button>';
                $("#addBtn").hide();
                $("#exnpAddBtn").show();
            }else if(data.DOC_STATUS == "111"){
                buttonHtml += "<button type=\"button\" id=\"tempBtn\" style=\"margin-right: 5px;\" class=\"k-button k-button-solid-base\" onclick=\"tempOrReDraftingPop('"+data.DOC_ID+"', 'payApp', 'camticPayApp_"+data.PAY_APP_SN+"', 2, 'tempDrafting');\">전자결재 임시저장 중</button>";
            }else{
                buttonHtml += '<button type="button" id="saveBtn" style="margin-right: 5px;" class="k-button k-button-solid-info" onclick="regPay.fn_save(\'user\')">저장</button>';
            }
        }else{
            buttonHtml += '<button type="button" id="saveBtn" style="margin-right:5px; margin-bottom: 10px;" class="k-button k-button-solid-info" onclick="regPay.fn_save(\'user\')">저장</button>';
        }

        // if($("#status").val() != "in"){
        //     if(data != null){
        //         if(data.DOC_STATUS == "0"){
        //             buttonHtml += '<button type="button" id="saveBtn" style="margin-right: 5px;" class="k-button k-button-solid-info" onclick="regPay.fn_save()">저장</button>';
        //             buttonHtml += '<button type="button" id="reqBtn" style="margin-right: 5px;" class="k-button k-button-solid-info" onclick="regPay.payAppDrafting()">상신</button>';
        //         }else if(data.DOC_STATUS == "10"){
        //             buttonHtml += '<button type="button" id="reqCancelBtn" style="margin-right: 5px;" class="k-button k-button-solid-error" onclick="docApprovalRetrieve(\''+data.DOC_ID+'\', \''+data.APPRO_KEY+'\', 1, \'retrieve\');">회수</button>';
        //         }else if(data.DOC_STATUS == "30" || data.DOC_STATUS == "40"){
        //             buttonHtml += '<button type="button" id="saveBtn" style="margin-right: 5px;" class="k-button k-button-solid-info" onclick="regPay.fn_save()">저장</button>';
        //             buttonHtml += '<button type="button" id="reReqBtn" style="margin-right: 5px;" class="k-button k-button-solid-error" onclick="tempOrReDraftingPop(\''+data.DOC_ID+'\', \''+data.DOC_MENU_CD+'\', \''+data.APPRO_KEY+'\', 2, \'reDrafting\');">재상신</button>';
        //         }else if(data.DOC_STATUS == "100"){
        //             buttonHtml += '<button type="button" id="viewBtn" style="margin-right: 5px;" class="k-button k-button-solid-base" onclick="approveDocView(\''+data.DOC_ID+'\', \''+data.APPRO_KEY+'\', \''+data.DOC_MENU_CD+'\');">열람</button>';
        //             $("#addBtn").hide();
        //         }else{
        //             buttonHtml += '<button type="button" id="saveBtn" style="margin-right: 5px;" class="k-button k-button-solid-info" onclick="regPay.fn_save()">저장</button>';
        //         }
        //     }else{
        //         buttonHtml += '<button type="button" id="saveBtn" style="margin-right:5px; margin-bottom: 10px;" class="k-button k-button-solid-info" onclick="regPay.fn_save()">저장</button>';
        //     }
        // }

        buttonHtml += '<button type="button" class="k-button k-button-solid-error" onclick="window.close()">닫기</button>';

        $("#payAppBtnDiv").html(buttonHtml);

        if(data != null && data.DOC_ID != null){
            reDraftOnlyOne(data.DOC_ID, $("#loginEmpSeq").val(), "reReqBtn");
        }
    },

    payAppDrafting: function(){

        regPay.fn_save("", "drafting");

        var budgetFlag = false;
        if(($("#pjtCd").val().substring(0,1) == "M" || $("#pjtCd").val().substring(0,1) == "Z") && !($("#pjtCd").val() == "Za9g923011" || $("#pjtCd").val() == "Za9g923012")){
            var tmpBudgetSnAr = [];
            $(".budgetSn").each(function(){
                tmpBudgetSnAr.push($(this).val());
            });

            const setCollection = new Set(tmpBudgetSnAr);
            budgetFlag = setCollection.size !== 1;
        } else {

        }

        if(budgetFlag){
            alert("예산비목이 다릅니다. 예산비목을 확인해주세요.");
            return;
        }

        var data = {
            payAppSn : $("#payAppSn").val(),
            pjtCd : $("#pjtCd").val()
        }

        $.ajax({
            url : "/payApp/getCheckBudget",
            data : data,
            type : "post",
            dataType : "json",
            success : function (rs){
                var list = rs.list;
                var flag = true;
                for(var i = 0 ; i  < list.length ; i++){
                    if(list[i].TOT_COST > list[i].BUDGET_AMT) {
                        alert("예산잔액을 초과했습니다.");
                        flag = false;
                        return;
                    }
                }

                if(flag){
                    $("#payAppDraftFrm").one("submit", function() {
                        var url = "/popup/payApp/approvalFormPopup/payAppApprovalPop.do";
                        var name = "payAppApprovalPop";
                        var option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=yes, scrollbars = yes, status=no, top=50, left=50"
                        var popup = window.open(url, name, option);
                        this.action = "/popup/payApp/approvalFormPopup/payAppApprovalPop.do";
                        this.method = 'POST';
                        this.target = 'payAppApprovalPop';
                    }).trigger("submit");
                }
            }
        });
    },

    setData : function (){
        console.log("setData");
        var data = {
            payAppSn : $("#payAppSn").val()
        }
        if($("#item").val() != "" && $("#item").val() != null){
            data.payAppDetSn = $("#item").val();
        }

        var result = customKendo.fn_customAjax("/payApp/pop/getPayAppData", data);
        var rs = result.map;
        var ls = result.list;
        var fileList = result.fileList;

        regPay.global.fileArray = fileList;
        regPay.global.result = rs;
        regPay.payAppBtnSet(rs);

        console.log("rs", rs);

        // if(rs.ADVANCES != 'Y'){
        //     $("#advances").prop("checked", false);
        // } else {
        //     $("#advances").prop("checked", true);
        // }

        $("#docStatus").val(rs.DOC_STATUS)
        if(rs.DOC_STATUS != 0 && rs.DOC_STATUS != 30 && rs.DOC_STATUS != 40){
            $("#pjtSelBtn, #bgSelBtn, #appTitle, #appCont, #bnkSelBtn").prop("disabled", true);
        }

        $("#payAppType").data("kendoRadioGroup").value(rs.PAY_APP_TYPE)

        if(rs.PAY_APP_TYPE == "2"){
            $("#trBank").text("입금계좌");
        } else {
            $("#trBank").text("출금계좌");
        }
        $("#appDe").val(rs.APP_DE)
        $("#reqDe").val(rs.REQ_DE)
        $("#pjtNm").val(rs.PJT_NM)
        $("#pjtSn").val(rs.PJT_SN)
        $("#pjtCd").val(rs.PJT_CD)
        $("#firstPjtCd").val(rs.PJT_CD)
        // $("#budgetNm").val(rs.BUDGET_NM)
        // $("#budgetSn").val(rs.BUDGET_SN)
        $("#appTitle").val(rs.APP_TITLE)
        $("#appCont").val(rs.APP_CONT)

        $("#bnkSn").val(rs.BNK_SN)
        $("#bnkNm").val(rs.BNK_NM)
        $("#accNm").val(rs.ACC_NM)
        $("#accNo").val(rs.ACC_NO)
        $("#payAppStat").data("kendoRadioGroup").value(rs.PAY_APP_STAT)

        if(ls.length > 0){
            $("#payDestTb").html("");
        }

        for(var i= 0; i < ls.length; i++) {
            var item = ls[i];

            console.log(item)

            regPayDet.global.createHtmlStr = "";

            regPayDet.global.createHtmlStr += "" +
                '<tr class="payDestInfo newArray" id="pay' + regPayDet.global.itemIndex + '" style="text-align: center;">';
            if($("#auth").val() != "user"){
                if($("#status").val() == "rev" || $("#status").val() == "in" || $("#status").val() == "re" || $("#status").val() == "alt"){
                    if(item.DET_STAT != "N" && item.EXNP_SAVE == 'N'){
                        regPayDet.global.createHtmlStr += "" +
                            '   <td><input type="checkbox" id="check' + regPayDet.global.itemIndex + '" value='+item.PAY_APP_DET_SN+' style="position: relative; top: 5px;" class="check" /></td>';
                    } else {
                        regPayDet.global.createHtmlStr += "" +
                            '   <td></td>';

                        $("#reCallBtn").css("display", "none");
                    }
                }
            } else {
                if(item.DET_STAT != "N" && item.EXNP_SAVE == 'N'){
                } else {
                    $("#reCallBtn").css("display", "none");
                }
            }

            var clIdx = regPayDet.global.itemIndex;

            regPayDet.global.createHtmlStr += "" +
                '   <td>' +
                '       <input type="text" id="budgetNm' + regPayDet.global.itemIndex + '" dir="rtl"  value="'+item.BUDGET_NM+'" onclick="regPay.fn_budgetPop('+clIdx+')" style="width: 100%; text-align: right;" class="budgetNm">' +
                '       <input type="hidden" id="budgetSn' + regPayDet.global.itemIndex + '" value="'+item.BUDGET_SN+'" class="budgetSn"/>' +
                '       <input type="hidden" id="budgetAmt' + regPayDet.global.itemIndex + '" value="'+item.BUDGET_AMT+'" class="budgetAmt"/>' +
                '   </td>' +
                '   <td class="reasonTr" style="display: none;">' +
                '       <button type="button" id="reasonBtn' + regPayDet.global.itemIndex + '" value="'+regPayDet.global.itemIndex+'" onclick="regPay.fn_reasonClickModal('+regPayDet.global.itemIndex+')" class="k-button k-button-solid-base reasonBtn">내용</button>' +
                '       <input type="hidden" id="reason' + regPayDet.global.itemIndex + '" value="'+item.REASON+'" style="width: 100%;">' +
                '   </td>' +
                '   <td style="display:none;">' +
                '       <input type="text" id="appTeam' + regPayDet.global.itemIndex + '" class="appTeam" style="width: 100%">' +
                '   </td>' +
                '   <td>' +
                '       <input type="hidden" id="payDestSn' + regPayDet.global.itemIndex + '" value="'+item.PAY_APP_DET_SN+'" name="payDestSn" class="payDestSn">' +
                '       <input type="text" id="eviType' + regPayDet.global.itemIndex + '" class="eviType" style="width: 100%">' +
                '       <input type="hidden" id="fileNo' + regPayDet.global.itemIndex + '" value="'+(item.FILE_NO || null)+'" class="fileNo" style="width: 100%">' +
                '       <input type="hidden" id="authNo' + regPayDet.global.itemIndex + '" value="'+item.AUTH_NO+'" class="authNo" style="width: 100%">' +
                '       <input type="hidden" id="authHh' + regPayDet.global.itemIndex + '" value="'+item.AUTH_HH+'" class="authHh" style="width: 100%">' +
                '       <input type="hidden" id="authDd' + regPayDet.global.itemIndex + '" value="'+item.AUTH_DD+'" class="authDd" style="width: 100%">' +
                '       <input type="hidden" id="issNo' + regPayDet.global.itemIndex + '" value="'+item.ISS_NO+'" class="issNo" style="width: 100%">' +
                '       <input type="hidden" id="coCd' + regPayDet.global.itemIndex + '" value="'+item.CO_CD+'" class="coCd" style="width: 100%">' +
                '       <input type="hidden" id="taxTy' + regPayDet.global.itemIndex + '" value="'+item.TAX_TY+'" class="taxTy" style="width: 100%">' +
                '       <input type="hidden" id="expRate' + regPayDet.global.itemIndex + '" value="'+item.TAX_TY+'" class="expRate" style="width: 100%">' +
                '       <input type="hidden" id="taxRate' + regPayDet.global.itemIndex + '" value="'+item.TAX_TY+'" class="taxRate" style="width: 100%">' +
                '       <input type="hidden" id="payAmt' + regPayDet.global.itemIndex + '" value="'+item.PAY_AMT+'" class="payAmt" style="width: 100%">' +
                '       <input type="hidden" id="incTax' + regPayDet.global.itemIndex + '" value="'+item.TAX_TY+'" class="incTax" style="width: 100%">' +
                '       <input type="hidden" id="locIncTax' + regPayDet.global.itemIndex + '" value="'+item.TAX_TY+'" class="locIncTax" style="width: 100%">' +
                '       <input type="hidden" id="subAmt' + regPayDet.global.itemIndex + '" value="'+item.TAX_TY+'" class="subAmt" style="width: 100%">' +
                '       <input type="hidden" id="actPayAmt' + regPayDet.global.itemIndex + '" value="'+item.TAX_TY+'" class="actPayAmt" style="width: 100%">' +
                '   </td>' +
                '   <td>' +
                '       <i class="k-i-plus k-icon" style="cursor: pointer"  onclick="regPayDet.fn_popRegDet(1, '+regPayDet.global.itemIndex+')"></i>' +
                '       <input type="text" style="width: 70%" id="crmNm' + regPayDet.global.itemIndex + '" value="'+item.CRM_NM+'" class="crmNm">' +
                '       <input type="hidden" id="buySts' + regPayDet.global.itemIndex + '" value="'+item.BUY_STS+'" class="buySts">' +
                '       <input type="hidden" id="trCd' + regPayDet.global.itemIndex + '" value="'+item.TR_CD+'" class="trCd">' +
                '   </td>' +
                '   <td>' +
                '       <input type="text" id="regNo' + regPayDet.global.itemIndex + '" class="regNo" value="'+item.REG_NO+'" style="width: 100%">' +
                '   </td>' +
                '   <td>' +
                '       <input type="text" id="crmBnkNm' + regPayDet.global.itemIndex + '" value="'+item.CRM_BNK_NM+'" class="crmBnkNm">' +
                '   </td>' +
                '   <td>' +
                '       <input type="text" id="crmAccNo' + regPayDet.global.itemIndex + '" value="'+item.CRM_ACC_NO+'" class="crmAccNo">' +
                '   </td>' +
                '   <td>' +
                '       <input type="text" id="crmAccHolder' + regPayDet.global.itemIndex + '" value="'+item.CRM_ACC_HOLDER+'" class="crmAccHolder">' +
                '   </td>' +
                '   <td>' +
                '       <input type="text" id="trDe' + regPayDet.global.itemIndex + '" value="'+item.TR_DE+'" class="trDe">' +
                '   </td>' +
                '   <td>' +
                '       <input type="text" id="totCost' + regPayDet.global.itemIndex + '" value="'+regPay.comma(item.TOT_COST)+'" class="totCost" onchange="regPay.fn_changeAllCost()" style="text-align: right" onkeyup="regPay.fn_calCost(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                '   </td>' +
                '   <td>' +
                '       <input type="text" id="supCost' + regPayDet.global.itemIndex + '" value="'+regPay.comma(item.SUP_COST)+'" class="supCost" style="text-align: right" onkeyup="regPay.fn_calCost(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                '   </td>' +
                '   <td>' +
                '       <input type="text" id="vatCost' + regPayDet.global.itemIndex + '" value="'+regPay.comma(item.VAT_COST)+'" class="vatCost" style="text-align: right" onkeyup="regPay.fn_calCost(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
                '   </td>' +
                '   <td>' +
                '       <i class="k-i-plus k-icon" style="cursor: pointer"  onclick="regPayDet.fn_popRegDet(3, '+regPayDet.global.itemIndex+')"></i>' +
                '       <input type="text" style="width: 70%;" disabled id="card' + regPayDet.global.itemIndex + '" value="'+item.CARD+'" class="card">' +
                '       <input type="hidden" id="cardNo' + regPayDet.global.itemIndex + '" value="'+item.CARD_NO+'" class="cardNo">' +
                '   </td>' +
                '   <td>' +
                '       <input type="text" id="etc' + regPayDet.global.itemIndex + '" value="'+item.ETC+'" class="etc">' +
                '   </td>';

            regPayDet.global.createHtmlStr += "" +
                '   <td>' +
                '       <div style="text-align: center">';

                if($("#status").val() == "rev" || $("#status").val() == "in" || $("#status").val() == "re" || $("#status").val() == "alt"){
                    if($("#auth").val() != "user"){
                        if(item.EXNP_SAVE == "Y"){
                            // regPayDet.global.createHtmlStr += '<button type="button" class="k-button k-button-solid-error" disabled id="revertBtn' + regPayDet.global.itemIndex + '" value="'+item.PAY_APP_DET_SN+'" onclick="regPayDet.fn_revertDet(this)">반려</button>';
                        } else {
                            // regPayDet.global.createHtmlStr += '<button type="button" class="k-button k-button-solid-error" id="revertBtn' + regPayDet.global.itemIndex + '" value="'+item.PAY_APP_DET_SN+'" onclick="regPayDet.fn_revertDet(this)">반려</button>';
                        }
                    } else if(rs.DOC_STATUS == "0" || rs.DOC_STATUS == "30" || rs.DOC_STATUS == "40"){
                        regPayDet.global.createHtmlStr += '<button type="button" class="k-button k-button-solid-error" id="detDelBtn" onclick="regPayDet.delRow(' + regPayDet.global.itemIndex + ')">삭제</button>';
                    } else {
                        regPayDet.global.createHtmlStr += '<button type="button" class="k-button k-button-solid-error" id="detDelBtn" onclick="regPayDet.delRow(' + regPayDet.global.itemIndex + ')" disabled>삭제</button>';
                    }
                } else {
                    if(rs.DOC_STATUS == "0" || rs.DOC_STATUS == "30" || rs.DOC_STATUS == "40"){
                        regPayDet.global.createHtmlStr += '<button type="button" class="k-button k-button-solid-error" id="detDelBtn" onclick="regPayDet.delRow(' + regPayDet.global.itemIndex + ')">삭제</button>';
                    } else {
                        regPayDet.global.createHtmlStr += '<button type="button" class="k-button k-button-solid-error" id="detDelBtn" onclick="regPayDet.delRow(' + regPayDet.global.itemIndex + ')" disabled>삭제</button>';
                    }
                }
                regPayDet.global.createHtmlStr += '</div>' +
                    '   </td>'+
                '</tr>';

            $("#payDestTb").append(regPayDet.global.createHtmlStr);

            if(item.DET_STAT == "N"){
                $("#revertBtn"+ regPayDet.global.itemIndex).css("display", "none");
                $("#pay"+ regPayDet.global.itemIndex).css("background-color", "#afafaf");
            }

            var itemIndex = 0 ;
            itemIndex = regPayDet.global.itemIndex;

            $("#eviType" + itemIndex).kendoDropDownList({
                dataTextField: "text",
                dataValueField: "value",
                dataSource: [
                    { text: "선택", value: "" },
                    { text: "세금계산서", value: "1" },
                    { text: "계산서", value: "2" },
                    { text: "신용카드", value: "3" },
                    { text: "직원지급", value: "4" },
                    { text: "사업소득자", value: "5" },
                    { text: "기타소득자", value: "9" },
                    { text: "기타", value: "6" },
                ],
                index: 0,
                change : function (e){

                    var value = this.value();

                    regPayDet.fn_eviTypeReset(e.sender.element[0].id.replace("eviType", ""));

                    if(value != ""){
                        if(value == "6"){
                            alert("정규증빙이 없는 지출(지로, 오버헤드, 공공요금여입, 현금출금)\n등의 경우 선택합니다.")
                        } else if(value == "1" || value == "2"){
                            regPayDet.fn_paymentEtaxHistory(value, e.sender.element[0].id.replace("eviType", ""));
                        } else if(value == "3"){
                            regPayDet.fn_paymentCardHistory(value, e.sender.element[0].id.replace("eviType", ""));
                        } else {
                            regPayDet.fn_popRegDet(value, e.sender.element[0].id.replace("eviType", ""));
                        }
                    }
                }
            });

            customKendo.fn_textBox(["crmNm" + regPayDet.global.itemIndex, "crmBnkNm"  + regPayDet.global.itemIndex
                , "crmAccHolder" + regPayDet.global.itemIndex, "regNo" + regPayDet.global.itemIndex
                , "crmAccNo" + regPayDet.global.itemIndex, "totCost" + regPayDet.global.itemIndex
                , "supCost" + regPayDet.global.itemIndex, "vatCost" + regPayDet.global.itemIndex
                ,"card" + regPayDet.global.itemIndex, "etc" + regPayDet.global.itemIndex, "budgetNm" + regPayDet.global.itemIndex]);

            customKendo.fn_datePicker("trDe" + regPayDet.global.itemIndex, "month", "yyyy-MM-dd", new Date());
            $("#trDe" + regPayDet.global.itemIndex).data("kendoDatePicker").value(item.TR_DE);

            var ds = customKendo.fn_customAjax("/dept/getDeptAList", {
                deptLevel : 2
            });
            customKendo.fn_dropDownList("appTeam" + regPayDet.global.itemIndex, ds.rs, "dept_name", "dept_seq","5");


            $("#appTeam" + itemIndex).data("kendoDropDownList").value(item.TEAM_SEQ);
            $("#eviType" + itemIndex).data("kendoDropDownList").value(item.EVID_TYPE);

            regPay.fn_updReason(regPayDet.global.itemIndex, "dataSet"); //페이지 로드 시 모든 내용 hidden값 부여
            regPayDet.global.itemIndex++;
        }

        if(ls.length > 0){
            //regPayDet.global.itemIndex--;
        }

        $("#apprBtn").css("display", "");


        if(rs.DOC_STATUS == 100 || rs.DOC_STATUS == 10){
            var item = 0;
            $("#payDestTb tr").each(function(){
                $(this).find("#budgetNm" + item).data("kendoTextBox").enable(false);
                $(this).find("#eviType" + item).data("kendoDropDownList").enable(false);

                item++;
            })
        }

        if($("#pjtCd").val().substring(0,1) != "M" && ($("#pjtCd").val().substring(0,1) != "Z" || $("#pjtCd").val() == "Za9g923011" || $("#pjtCd").val() == "Za9g923012") && $("#pjtCd").val().substring(0,1) != ""){
            $(".reasonTr").css("display", "");
            $("#reasonCol").css("display", "");
            $("#reasonTh").css("display", "");
            $("#reasonContTr").css("display", "none");
            $("#footerLine").attr("colspan", "9");
        } else {
            $("#footerLine").attr("colspan", "8");
        }

        var totAllCost = 0;
        $(".totCost").each(function(){
            totAllCost += Number(regPay.uncommaN($(this).val()));
        });

        $("#totalAllCost").text(regPay.comma(totAllCost));
        regPay.fn_g20ClientCheck();
    },

    fn_popDateSetting : function(){
        var eviFlag = true;
        for (var i = 0 ; i < $("#payDestTb").find("tr").length ; i++){
            if($("#eviType" + i).val() == ""){
                eviFlag = false;
            }
        }
        if(!eviFlag){
            alert("증빙유형을 선택해주세요.");
            return;
        }
        try{
            regPay.fn_save("", "drafting");
        } catch(e){return;}

        /** 사업소득자, 기타소득자일 경우 payAmt 값 있는지 체크 **/
        var data = {
            payAppSn : $("#payAppSn").val()
        }
        if($("#item").val() != "" && $("#item").val() != null){
            data.payAppDetSn = $("#item").val();
        }
        var result = customKendo.fn_customAjax("/payApp/pop/getPayAppData", data);
        var rs = result.map;
        var ls = result.list;
        var payFlag = true;
        for(let i=0; i<ls.length; i++){
            const item = ls[i];
            if((item.EVID_TYPE == "5" || item.EVID_TYPE == "9") && item.PAY_AMT == 0){
                payFlag = false;
                break;
            }
        }

        if(!payFlag){
            alert("증빙유형이 사업소득자 및 기타소득자 일 경우\n입력팝업창에서 정상적으로 소득금액을 입력해야 진행가능합니다.");
            return;
        }


        var trDe = $("#trDe0").val();
        var trDeAr = trDe.split("-");
        var trDay = trDeAr[2];
        if(trDeAr[2] == 31){
            trDay = 30
        }
        var trDate = new Date(trDeAr[0], trDeAr[1] - 1, trDay);


        var eviType = $("#eviType0").val();
        if(trDe != "" && trDe != null && trDe != undefined){
            if($("#pjtCd").val().substring(0,1) != ""){
                // 법인운영일 경우
                if(($("#pjtCd").val().substring(0,1) == "M" || $("#pjtCd").val().substring(0,1) == "Z") && !($("#pjtCd").val() == "Za9g923011" || $("#pjtCd").val() == "Za9g923012")){
                    if(eviType == "3"){             // 신용카드
                        trDate.setMonth(trDate.getMonth() + 1);
                        trDate.setDate(10);
                        $("#payExnpDe").val(trDate.getFullYear() + "-" + (trDate.getMonth() + 1).toString().padStart(2, "0") + "-" + trDate.getDate());
                    } else if(eviType == "4"){      // 급여
                        trDate.setMonth(trDate.getMonth());
                        trDate.setDate(25);
                        $("#payExnpDe").val(trDate.getFullYear() + "-" + (trDate.getMonth() + 1).toString().padStart(2, "0") + "-" + trDate.getDate());
                    } else {                        // 세금계산서,계산서,소득신고자,증빙없음
                        if(trDeAr[2] < 16){             // 매월 1일 ~ 15일
                            trDate.setMonth(trDate.getMonth() + 1);
                            trDate.setDate(25);
                            $("#payExnpDe").val(trDate.getFullYear() + "-" + (trDate.getMonth() + 1).toString().padStart(2, "0") + "-" + trDate.getDate());
                        } else {                        // 매월 16일 ~ 말일
                            trDate.setMonth(trDate.getMonth() + 2);
                            trDate.setDate(10);
                            $("#payExnpDe").val(trDate.getFullYear() + "-" + (trDate.getMonth() + 1).toString().padStart(2, "0") + "-" + trDate.getDate());
                        }
                    }
                } else {
                    if(eviType == "3"){             // 신용카드
                        trDate.setMonth(trDate.getMonth() + 1);
                        trDate.setDate(10);
                        $("#payExnpDe").val(trDate.getFullYear() + "-" + (trDate.getMonth() + 1).toString().padStart(2, "0") + "-" + trDate.getDate());
                    } else if(eviType == "4"){      // 급여
                        trDate.setMonth(trDate.getMonth());
                        trDate.setDate(25);
                        $("#payExnpDe").val(trDate.getFullYear() + "-" + (trDate.getMonth() + 1).toString().padStart(2, "0") + "-" + trDate.getDate());
                    } else {                        // 세금계산서,계산서,소득신고자,증빙없음
                        if(trDeAr[2] < 16){             // 매월 1일 ~ 15일
                            trDate.setMonth(trDate.getMonth());
                            trDate.setDate(25);
                            $("#payExnpDe").val(trDate.getFullYear() + "-" + (trDate.getMonth() + 1).toString().padStart(2, "0") + "-" + trDate.getDate());
                        } else {                        // 매월 16일 ~ 말일
                            trDate.setMonth(trDate.getMonth() + 1);
                            trDate.setDate(10);
                            $("#payExnpDe").val(trDate.getFullYear() + "-" + (trDate.getMonth() + 1).toString().padStart(2, "0") + "-" + trDate.getDate());
                        }
                    }
                }
            }
        }

        if(regPay.global.result.LINK_KEY_TYPE == "구매"){
            $("#payExnpDe").val(regPay.global.result.EXP_DE);
        }

        if(regPay.global.result.LINK_KEY_TYPE == "출장"){
            $("#payExnpDe").val($("#trDe0").val());
        }

        var dialog = $("#dialogDraft").data("kendoWindow");

        $("#payExnpDeText").text($("#payExnpDe").val());
        $("#reqDe").val($("#payExnpDe").val());
        dialog.center();
        dialog.open();
    },

    fn_viewStat: function (){
        var stat = $("#status").val();

        if(stat == "rev"){
            if($("#auth").val() != "user"){
                $("#titleStat").text("검토");
            } else {
                $("#titleStat").text("확인");
            }
            // $("#addBtn").css("display", "none");
            // $("#exnpAddBtn").css("display", "");
        }

        if(stat == "in"){
            if($("#auth").val() != "user"){
                $("#titleStat").text("검토");
                $("#pjtSelBtn, #bgSelBtn, #appTitle, #appCont, #bnkSelBtn").prop("disabled", true);
                $("#exnpAddBtn").text("여입결의서 작성");
                $("#addBtn").css("display", "none");
                $("#exnpAddBtn").css("display", "");
            } else {
                $("#titleStat").text("확인");
            }

        }

        if(stat == "re"){
            if($("#auth").val() != "user"){
                $("#titleStat").text("검토");
                $("#pjtSelBtn, #bgSelBtn, #appTitle, #appCont, #bnkSelBtn").prop("disabled", true);
                $("#exnpAddBtn").text("반납결의서 작성");
                $("#addBtn").css("display", "none");
                $("#exnpAddBtn").css("display", "");
            } else {
                $("#titleStat").text("확인");
            }
        }

        if(stat == "alt"){
            if($("#auth").val() != "user"){
                $("#titleStat").text("검토");
                $("#pjtSelBtn, #bgSelBtn, #appTitle, #appCont, #bnkSelBtn").prop("disabled", true);
                $("#exnpAddBtn").text("대체결의서 작성");
                $("#addBtn").css("display", "none");
                $("#exnpAddBtn").css("display", "");
            } else {
                $("#titleStat").text("확인");
            }
        }
    },

    fn_save : function (auth, type){
        var parameters = {
            payAppType : $("#payAppType").data("kendoRadioGroup").value(),
            appDe : $("#appDe").val(),
            pjtNm : $("#pjtNm").val(),
            pjtSn : $("#pjtSn").val(),
            pjtCd : $("#pjtCd").val(),
            reqDe : $("#reqDe").val(),
            payExnpDe : $("#payExnpDe").val(),
            // budgetNm : $("#budgetNm").val(),
            // budgetSn : $("#budgetSn").val(),
            appTitle : $("#appTitle").val(),
            appCont : $("#appCont").val(),
            bnkSn : $("#bnkSn").val(),
            bnkNm : $("#bnkNm").val(),
            accNm : $("#accNm").val(),
            accNo : $("#accNo").val(),
            payAppStat : $("#payAppStat").data("kendoRadioGroup").value(),
            exnpIss : $("#exnpIss").data("kendoDropDownList").text(),

            regEmpSeq : $("#regEmpSeq").val(),
            empSeq : $("#regEmpSeq").val(),
            type : type
        }

        if($("#bsYm").val() != ""){
            if(parameters.pjtSn != $("#firstPjtSn").val()){
                parameters.pjtSn = $("#firstPjtSn").val();
            }
            if(parameters.pjtSn == ""){
                parameters.pjtSn = 0;
            }

            parameters.bsYm = $("#bsYm").val();

            if($("#sList").val() != ""){
                parameters.sList = $("#sList").val();
            }
        }

        if($("#cardToSn").val() != ""){
            parameters.cardToSn = $("#cardToSn").val()
        }

        // if($("#advances").is(":checked")){
        //     parameters.advances = 'Y';
        // } else {
        //     parameters.advances = 'N';
        // }
        if($("#reqType").val() == "purc"){
            parameters.linkKey = $("#purcSn").val();
            parameters.linkKeyType = "구매";
        }

        if($("#reqType").val() == "bustrip"){
            parameters.hrBizReqResultId = $("#hrBizReqResultId").val();
            parameters.linkKey = $("#hrBizReqResultId").val().split(",")[0];
            parameters.linkKeyType = "출장";

            if($("#bList").val() != ""){
                parameters.bList = $("#bList").val();
            }

            // 출장정산목록 pdf 생성
            var htmlContents = payAppDoc.fn_makeBustripExnpPdf();
            parameters.busExnpHtml = htmlContents;
        }

        if($("#reqType").val() == "business"){
            if($("#hrBizReqId").val() != ""){
                parameters.hrBizReqId = $("#hrBizReqId").val();
                parameters.linkKey = $("#hrBizReqId").val();
                parameters.linkKeyType = "사전정산";
            } else if($("#hrBizReqResultId").val() != ""){
                parameters.hrBizReqResultId = $("#hrBizReqResultId").val();
                parameters.linkKey = $("#hrBizReqResultId").val();
                parameters.linkKeyType = "사후정산";
            }

            if($("#bList").val() != ""){
                parameters.bList = $("#bList").val();
            }
        }

        if($("#reqType").val() == "snack"){
            parameters.snackInfoSn = $("#snackInfoSn").val();
            parameters.linkKey = $("#snackInfoSn").val().split(",")[0];
            parameters.linkKeyType = "식대";

            if($("#sList").val() != ""){
                parameters.sList = $("#sList").val();
            }
        }

        if($("#claimSn").val() != ""){
            parameters.claimSn = $("#claimSn").val();
        }

        if($("#claimExnpSn").val() != ""){
            parameters.claimExnpSn = $("#claimExnpSn").val();
            parameters.purcSn = $("#purcSn").val();
            parameters.linkKey = $("#claimExnpSn").val().split(",")[0];
            parameters.linkKeyType = "구매";
        }


        if($("#payAppSn").val() != ""){
            parameters.payAppSn = $("#payAppSn").val();
        }

        if(parameters.pjtCd == ""){
            alert("사업을 선택해주세요.");
            return;
        }

        if(parameters.appTitle == ""){
            alert("신청건명을 입력해주세요.");
            return;
        }

        if(parameters.bnkSn == ""){
            alert("출금계좌를 선택해주세요.");
            return;
        }

        var itemArr = new Array()
        var flag = true;

        var budgetFlag = false;
        if(type != "drafting"){
            if($("#pjtCd").val().substring(0,1) != "M" && ($("#pjtCd").val().substring(0,1) != "Z" || $("#pjtCd").val() == "Za9g923011" || $("#pjtCd").val() == "Za9g923012") && $("#pjtCd").val().substring(0,1) != ""){

            } else {
                var tmpBudgetSnAr = [];
                $(".budgetSn").each(function(){
                    tmpBudgetSnAr.push($(this).val());
                });

                const setCollection = new Set(tmpBudgetSnAr);
                budgetFlag = setCollection.size !== 1;
            }

            if(budgetFlag){
                alert("예산비목이 다릅니다. 예산비목을 확인해주세요.");
                return;
            }
        }

        var befAdvances = "";
        var budgetNmFlag = true;
        var trCdFlag = true;
        var tdFlag = true;
        $.each($(".payDestInfo"), function(i, v){
            var index = $(this).attr("id").replace(/[^0-9]/g, '');

            if(!$("#budgetNm" + index).val()) {
                budgetNmFlag = false;
            }



            var data = {
                budgetNm : $("#budgetNm" + index).val(),
                budgetSn : $("#budgetSn" + index).val(),
                budgetAmt : $("#budgetAmt" + index).val(),
                teamSeq : $("#appTeam" + index).val(),
                teamName : $("#appTeam" + index).data("kendoDropDownList").text(),
                evidType : $("#eviType" + index).val(),
                reason : $("#reason" + index).val(),
                authNo : $("#authNo" + index).val(),
                authDd : $("#authDd" + index).val(),
                authHh : $("#authHh" + index).val(),
                issNo : $("#issNo" + index).val(),
                coCd : $("#coCd" + index).val(),
                taxTy : $("#taxTy" + index).val(),
                expRate : ($("#expRate" + index).val() || 0),
                taxRate : ($("#taxRate" + index).val() || 0),
                payAmt : (regPay.uncommaN($("#payAmt" + index).val()) || 0),
                incTax : (regPay.uncommaN($("#incTax" + index).val()) || 0),
                locIncTax : (regPay.uncommaN($("#locIncTax" + index).val()) || 0),
                subAmt : (regPay.uncommaN($("#subAmt" + index).val()) || 0),
                actPayAmt : (regPay.uncommaN($("#actPayAmt" + index).val()) || 0),
                crmNm : $("#crmNm" + index).val(),
                regNo : $("#regNo" + index).val(),
                trCd : $("#trCd" + index).val(),
                crmBnkNm : $("#crmBnkNm" + index).val(),
                crmAccNo : $("#crmAccNo" + index).val(),
                crmAccHolder : $("#crmAccHolder" + index).val(),
                trDe : $("#trDe" + index).val(),
                totCost : regPay.uncommaN($("#totCost" + index).val()),
                supCost : regPay.uncommaN($("#supCost" + index).val()),
                vatCost : regPay.uncommaN($("#vatCost" + index).val()),
                buySts : $("#buySts" + index).val(),
                card : $("#card" + index).val(),
                cardNo : $("#cardNo" + index).val(),
                etc : $("#etc" + index).val(),
            }

            if(data.buySts == undefined || data.buySts == null || data.buySts == "" || data.buySts == "undefined"){
                data.buySts = "";
            }

            if($("#fileNo" + index).val() != undefined && $("#fileNo" + index).val() != null && $("#fileNo" + index).val() != "null" && $("#fileNo" + index).val() != "undefined" && $("#fileNo" + index).val() != ""){
                data.fileNo = $("#fileNo" + index).val();
            }

            if(regPay.global.bgtArr.length != 0){
                for(let j=0; j<regPay.global.bgtArr.length; j++){
                    const jMap = regPay.global.bgtArr[j];

                    /** 수익/비용 설정이 있고 선택한 비목이 수익이면 비용처리 유무 N */
                    if(data.budgetSn == jMap.BGT_CD && jMap.BGT_AT == "1"){
                        data.costStat = "N";
                    }
                }
            }

            if(type == "drafting"){
                if((data.evidType == "1" || data.evidType == "2" || data.evidType == "3") && !data.trCd && $("#eviType" + index).val() != "6") {
                    tdFlag = false;
                }

                /** 사업소득자 또는 기타소득자일경우 trCd 필수값 */
                if((data.evidType == "5" || data.evidType == "9") && (data.trCd == undefined || data.trCd == null || data.trCd == "" || data.trCd == "undefined")){
                    trCdFlag = false;
                }
            }


            // befAdvances = $("#advances" + index).is(':checked') ? "Y" : "N";

            if(data.eviType == ""){
                flag = false;
            }
            
            itemArr.push(data);
        });

        if(!flag){
            alert("구분값을 선택해주세요.");
            return ;
        }

        if(!budgetNmFlag){
            alert("예산비목을 선택해주세요.");
            return;
        }

        if(!tdFlag) {
            alert("G20 거래처가 등록되지 않았습니다.\n담당자에게 문의해주세요.")
            throw 'exit';
            return;
        }

        if(!trCdFlag){
            alert("증빙유형이 사업소득자 및 기타소득자 일 경우\n선택팝업창에서 정상적으로 선택을 해야 진행가능합니다.");
            throw 'exit';
            return;
        }

        parameters.itemArr = JSON.stringify(itemArr);

        var fd = new FormData();

        for(var key in parameters){
            fd.append(key, parameters[key]);
        }

        regPay.global.fileArray = regPay.global.fileArray.concat(regPay.global.attFiles);
        if(regPay.global.fileArray != null){
            for(var i = 0; i < regPay.global.fileArray.length; i++){
                fd.append("fileList", regPay.global.fileArray[i]);
            }
        }

        // 법인카드 증빙자료 생성
        var htmlContents = payAppDoc.fn_makeHtmlToPdf();
        fd.append("htmlContents", htmlContents);

        $.ajax({
            url : "/payApp/payAppSetData",
            data : fd,
            type : "post",
            dataType : "json",
            contentType: false,
            processData: false,
            enctype : 'multipart/form-data',
            async: false,
            success : function(rs){
                if(rs.code == 200){
                    if(type != 'x' && type != 'drafting'){
                        alert("저장되었습니다.");
                    }

                    if(type != "drafting"){
                        if($("#reqType").val() != "business" && $("#reqType").val() != "bustrip") {
                            if($("#reqType").val() == "claim") {
                                console.log("d")
                                opener.parent.purcUserAppList.gridReload();
                            }else if($("#apprMngStat").val() == "M"){
                                opener.parent.paymentMngList.gridReload();
                            }else if($("#reqType").val() == "snack"){
                               opener.parent.snackList.mainGrid();
                            }else if($("#reqType").val() == "partRate" || $("#reqType").val() == "claimExnp"){
                            }else if($("#reqType").val() == "camproject"){
                                if(opener.$("#budgetMainGrid3").data("kendoGrid")) {
                                    opener.$("#budgetMainGrid3").data("kendoGrid").dataSource.read();
                                }
                            }else{
                                opener.parent.paymentList.gridReload();
                            }
                        }else{
                            opener.location.reload();
                            opener.parent.gridReload();
                        }

                        let status = "";
                        if($("#payAppType").data("kendoRadioGroup").value() == 1){
                            status = "rev";
                        }else if($("#payAppType").data("kendoRadioGroup").value() == 2){
                            status = "in";
                        }else if($("#payAppType").data("kendoRadioGroup").value() == 3){
                            status = "re";
                        }else{
                            status = "alt";
                        }

                        var url = "/payApp/pop/regPayAppPop.do?payAppSn=" + rs.params.payAppSn + "&status=" + status;
                        if(auth != "" && auth != null && auth != undefined){
                            url += "&auth=" + auth;
                        }
                        location.href = url;
                    }
                } else if(rs.code == 404){
                    location.href = '/error/page?code=' + rs.code;
                }
            }
        });
    },

    fn_popCamCrmList : function (crmSnId, crmNmId){
        regPay.global.crmSnId = crmSnId;
        regPay.global.crmNmId = crmNmId;

        var url = "/crm/pop/popCrmList.do";
        var name = "_blank";
        var option = "width = 1300, height = 670, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    crmInfoChange : function(){
        $("#" + regPay.global.crmSnId).val($("#crmSn").val())
        $("#" + regPay.global.crmNmId).val($("#crmNm").val())

        $("#crmSn").val("")
        $("#crmNm").val("")
    },

    fn_exnpDeChange:function (){
        $("#row3").css("display", "");
        $("#row2").css("display", "");
        $("#row1").css("display", "none");
        $("#changeBtn").css("display", "none");
        $("#modalSaveBtn").css("display", "");
    },

    fn_calCost: function(obj){
        var index = obj.id.replace(/[^0-9]/g, '');

        if($("#eviType" + index).val() == '4' || $("#eviType" + index).val() == '6'){
            if(obj.id.match("totCost")){
                $("#supCost" + index).val(regPay.comma(Number(regPay.uncommaN($("#totCost" + index).val()))));
                $("#vatCost" + index).val(0);
            } else if(obj.id.match("supCost")){
                $("#totCost" + index).val(regPay.comma(Number(regPay.uncommaN($("#supCost" + index).val()))));
                $("#vatCost" + index).val(0);
            } else if (obj.id.match("vatCost")){
                $("#supCost" + index).val(regPay.comma(Number(regPay.uncommaN($("#totCost" + index).val())) - Number(regPay.uncommaN($("#vatCost" + index).val()))));
            }
        } else if($("#eviType" + index).val() == '3'){

            if(($("#pjtCd").val().substring(0,1) == "M" || $("#pjtCd").val().substring(0,1) == "Z") && !($("#pjtCd").val() == "Za9g923011" || $("#pjtCd").val() == "Za9g923012")){
                if($("#card" + index).val().includes("개인카드")){
                    if(obj.id.match("totCost")){
                        $("#supCost" + index).val(regPay.comma(Number(regPay.uncommaN($("#totCost" + index).val()))));
                        $("#vatCost" + index).val(0);
                    } else if(obj.id.match("supCost")){
                        $("#totCost" + index).val(regPay.comma(Number(regPay.uncommaN($("#supCost" + index).val()))));
                        $("#vatCost" + index).val(0);
                    } else if (obj.id.match("vatCost")){
                        $("#supCost" + index).val(regPay.comma(Number(regPay.uncommaN($("#totCost" + index).val())) - Number(regPay.uncommaN($("#vatCost" + index).val()))));
                    }
                } else{
                    if(obj.id.match("totCost")){
                        $("#vatCost" + index).val(regPay.comma(Number(regPay.uncommaN($("#totCost" + index).val())) - Math.round(Number(regPay.uncommaN($("#totCost" + index).val())) * 100 / 110)));
                        $("#supCost" + index).val(regPay.comma(Number(regPay.uncommaN($("#totCost" + index).val())) - Number(regPay.uncommaN($("#vatCost" + index).val()))));
                    } else if(obj.id.match("supCost")){
                        $("#vatCost" + index).val(regPay.comma(Number(regPay.uncommaN($("#totCost" + index).val())) - Number(regPay.uncommaN($("#supCost" + index).val()))));
                    } else if (obj.id.match("vatCost")){
                        $("#supCost" + index).val(regPay.comma(Number(regPay.uncommaN($("#totCost" + index).val())) - Number(regPay.uncommaN($("#vatCost" + index).val()))));
                    }
                }
            } else {
                if(obj.id.match("totCost")){
                    $("#supCost" + index).val(regPay.comma(Number(regPay.uncommaN($("#totCost" + index).val()))));
                    $("#vatCost" + index).val(0);
                } else if(obj.id.match("supCost")){
                    $("#totCost" + index).val(regPay.comma(Number(regPay.uncommaN($("#supCost" + index).val()))));
                    $("#vatCost" + index).val(0);
                } else if (obj.id.match("vatCost")){
                    $("#supCost" + index).val(regPay.comma(Number(regPay.uncommaN($("#totCost" + index).val())) - Number(regPay.uncommaN($("#vatCost" + index).val()))));
                }
            }
        } else {
            if(obj.id.match("totCost")){
                $("#vatCost" + index).val(regPay.comma(Number(regPay.uncommaN($("#totCost" + index).val())) - Math.round(Number(regPay.uncommaN($("#totCost" + index).val())) * 100 / 110)));
                $("#supCost" + index).val(regPay.comma(Number(regPay.uncommaN($("#totCost" + index).val())) - Number(regPay.uncommaN($("#vatCost" + index).val()))));
            } else if(obj.id.match("supCost")){
                $("#vatCost" + index).val(regPay.comma(Number(regPay.uncommaN($("#totCost" + index).val())) - Number(regPay.uncommaN($("#supCost" + index).val()))));
            } else if (obj.id.match("vatCost")){
                $("#supCost" + index).val(regPay.comma(Number(regPay.uncommaN($("#totCost" + index).val())) - Number(regPay.uncommaN($("#vatCost" + index).val()))));
            }
        }

        regPay.inputNumberFormat(obj);

        var totAllCost = 0;
        $(".totCost").each(function(){
            totAllCost += Number(regPay.uncommaN($(this).val()));
        });

        $("#totalAllCost").text(regPay.comma(totAllCost));
    },

    fn_changeAllCost : function (){
        var totAllCost = 0;
        $(".totCost").each(function(){
            totAllCost += Number(regPay.uncommaN($(this).val()));
        });

        $("#totalAllCost").text(regPay.comma(totAllCost));
    },

    inputNumberFormat : function (obj){
        obj.value = regPay.comma(regPay.uncommaN(obj.value));
    },

    comma: function(str) {
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    },

    uncomma: function(str) {
        str = String(str);
        return str.replace(/[^\d]+/g, '');
    },

    uncommaN: function(str) {
        str = String(str);
        return str.replace(/[^\d-]|(?<=\d)-/g, '');
    },

    fn_projectPop : function (type){
        var url = "/project/pop/g20ProjectView.do?type=" + type;

        var name = "_blank";
        var option = "width = 1100, height = 450, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    fn_budgetPop: function (idx){
        if($("#pjtCd").val() == ""){
            alert("사업을 선택해주세요.");
            return ;
        }



        var url = "/mng/pop/budgetView.do?pjtCd=" + $("#pjtCd").val() + "&idx=" + idx + "&payAppType=" + $("#payAppType").data("kendoRadioGroup").value();

        var name = "_blank";
        var option = "width = 1100, height = 650, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);

    },

    fn_bankPop : function (){
        var url = "/mng/pop/bankView.do";

        var name = "_blank";
        var option = "width = 1100, height = 650, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
    },


    fn_revertModal : function(docId){
        if(!confirm("반려하시겠습니까?")){
            return;
        }

        var dialog = $("#dialogRecall").data("kendoWindow");
        $("#reCallReason").val("");
        $("#reCallDocId").val(docId);
        dialog.center();
        dialog.open();
    },

    fn_revertDet : function (){
        var data = {
            revertIss : $("#reCallReason").val(),
            payAppSn : $("#payAppSn").val(),
            docId : $("#reCallDocId").val(),
            regEmpSeq : $("#regEmpSeq").val()
        }

        $.ajax({
            url : "/pay/payAppRevert",
            data : data,
            type : "post",
            dataType : "json",
            success : function(rs){
                console.log(rs);
                if(rs.code == 200){
                    alert("반려되었습니다.");

                    $("#dialogRecall").data("kendoWindow").close();
                    window.location.reload();
                    if($("#auth").val() == "user") {
                        opener.parent.paymentMngList.gridReload();
                    } else {
                        opener.parent.paymentRevList.gridReload();
                    }
                }
            }
        });
    },

    fn_g20ClientCheck : function(){
        console.log("fn_g20ClientCheck");
        $.each($(".payDestInfo"), function(i, v){
            var index = $(this).attr("id").replace(/[^0-9]/g, '');
            var regNo = $("#regNo" + index).val();
            var eviType = $("#eviType" + index).val();
            var trCd = $("#trCd" + index).val();

            // 지급신청서 검토 - 사업자등록번호 등록여부 체크
            if((eviType == "1" || eviType == "2" ||eviType == "3") && regNo != null && regNo != "" || !trCd) {
                if(trCd || regNo){
                    var data = {
                        REG_NO : regNo
                    }

                    $.ajax({
                        url : "/g20/getClientInfoOne",
                        data :data,
                        type : "post",
                        dataType : "json",
                        async : false,
                        success : function (rs){
                            var result = rs.data;
                            if(result == null){
                                $("#crmNm" + index).css("border", "1px solid red");
                                $("#regNo" + index).css("border", "1px solid red");
                            } else {
                                $("#crmNm" + index).css("border", "#bbb");
                                $("#regNo" + index).css("border", "#bbb");
                            }
                        }
                    });
                } else {
                    $("#crmNm" + index).css("border", "1px solid red");
                    $("#regNo" + index).css("border", "1px solid red");
                }
            }
        });
    }


}


var regPayDet = {

    global : {
        itemIndex : 0,
        createHtmlStr : "",
        budgetAllData : {},
    },

    fn_defaultScript : function (){
        $("#eviType0").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "선택", value: "" },
                { text: "세금계산서", value: "1" },
                { text: "계산서", value: "2" },
                { text: "신용카드", value: "3" },
                { text: "직원지급", value: "4" },
                { text: "사업소득자", value: "5" },
                { text: "기타소득자", value: "9" },
                { text: "기타", value: "6" }
            ],
            index: 0,
            change : function (e){
                var value = $("#eviType0").val();
                var itemIndex = 0;

                regPayDet.fn_eviTypeReset(itemIndex);

                if(value != ""){
                    if(value == "6"){
                        alert("정규증빙이 없는 지출(지로, 오버헤드, 공공요금여입, 현금출금)\n등의 경우 선택합니다.")
                    } else if(value == "1" || value == "2"){
                        regPayDet.fn_paymentEtaxHistory(value, itemIndex);
                    } else if(value == "3"){
                        regPayDet.fn_paymentCardHistory(value, itemIndex);
                    } else{
                        regPayDet.fn_popRegDet(value, itemIndex);
                    }
                }
            }
        });

        customKendo.fn_textBox(["crmNm0", "regNo0", "crmBnkNm0", "crmAccHolder0", "crmAccNo0", "totCost0", "supCost0", "vatCost0"
        ,"card0", "etc0", "budgetNm0"]);

        var ds = customKendo.fn_customAjax("/dept/getDeptAList", {
            deptLevel : 2
        });
        customKendo.fn_dropDownList("appTeam0", ds.rs, "dept_name", "dept_seq","5")

        $("#appTeam0").data("kendoDropDownList").value($("#loginDeptSeq").val());
        customKendo.fn_datePicker("trDe0", "month", "yyyy-MM-dd", new Date());

        $(".payDestInfo td input").css("font-size", "10px");
        $(".payDestInfo td").css("padding", "0.35rem");
        $(".payDestInfo td span").css("font-size", "10px");

    },

    fn_popRegDet : function (v, i, cardVal){
        //개인&법인 구분없이 조회하기 위한 parameter 추가
        if(cardVal == undefined){
            cardVal = "";
        }

        if($("#eviType" + i).val() == 5 || $("#eviType" + i).val() == 9){
            v = $("#eviType" + i).val();
        }

        var url = "/mng/pop/paymentDetView.do?type=" + v + "&index=" + i + "&cardVal=" + cardVal;

        var name = "_blank";
        var option = "width = 1100, height = 650, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    fn_paymentCardHistory : function (v, i){
        var url = "/mng/pop/paymentCardHistory.do?type=" + v + "&index=" + i;

        var name = "_blank";
        var option = "width = 1500, height = 700, top = 100, left = 300, location = no"
        var popup = window.open(url, name, option);
    },

    fn_paymentEtaxHistory : function (v, i){
        var url = "/mng/pop/paymentEtaxHistory.do?type=" + v + "&index=" + i;

        var name = "_blank";
        var option = "width = 1500, height = 700, top = 100, left = 300, location = no"
        var popup = window.open(url, name, option);
    },


    addRow : function () {
        regPayDet.global.createHtmlStr = "";
        var clIdx = regPayDet.global.itemIndex;

        regPayDet.global.createHtmlStr = "" +
            '<tr class="payDestInfo newArray" id="pay' + regPayDet.global.itemIndex + '" style="text-align: center;">' +
            '   <td>' +
            '       <input type="text" id="budgetNm' + regPayDet.global.itemIndex + '" dir="rtl"  value="" onclick="regPay.fn_budgetPop(' + clIdx + ')" style="width: 100%; text-align: right;" class="budgetNm">' +
            '       <input type="hidden" id="budgetSn' + regPayDet.global.itemIndex + '" value="" class="budgetSn"/>' +
            '       <input type="hidden" id="budgetAmt' + regPayDet.global.itemIndex + '" value="" class="budgetAmt"/>' +
            '   </td>' +
            '   <td class="reasonTr" style="display: none;">' +
            '       <button type="button" id="reasonBtn' + regPayDet.global.itemIndex + '" value="'+regPayDet.global.itemIndex+'" onclick="regPay.fn_reasonClickModal('+regPayDet.global.itemIndex+')" class="k-button k-button-solid-base reasonBtn">내용</button>' +
            '       <input type="hidden" id="reason' + regPayDet.global.itemIndex + '" value="" style="width: 100%;">' +
            '   </td>' +
            '   <td style="display:none;">' +
            '       <input style="width: 100%" id="appTeam' + regPayDet.global.itemIndex + '" name="appTeam" class="appTeam">' +
            '   </td>' +
            '   <td>' +
            '       <input type="hidden" style="width: 70%" id="payDestSn' + regPayDet.global.itemIndex + '" name="payDestSn" class="payDestSn">' +
            '       <input type="text" id="eviType' + regPayDet.global.itemIndex + '" class="eviType" style="width: 100%">' +
            '       <input type="hidden" id="fileNo' + regPayDet.global.itemIndex + '" class="fileNo" style="width: 100%">' +
            '       <input type="hidden" id="authNo' + regPayDet.global.itemIndex + '" class="authNo" style="width: 100%">' +
            '       <input type="hidden" id="authHh' + regPayDet.global.itemIndex + '" class="authHh" style="width: 100%">' +
            '       <input type="hidden" id="authDd' + regPayDet.global.itemIndex + '" class="authDd" style="width: 100%">' +
            '       <input type="hidden" id="issNo' + regPayDet.global.itemIndex + '" class="issNo" style="width: 100%">' +
            '       <input type="hidden" id="coCd' + regPayDet.global.itemIndex + '" class="coCd" style="width: 100%">' +
            '       <input type="hidden" id="taxTy' + regPayDet.global.itemIndex + '" class="taxTy" style="width: 100%">' +
            '       <input type="hidden" id="expRate' + regPayDet.global.itemIndex + '" class="expRate" style="width: 100%">' +
            '       <input type="hidden" id="taxRate' + regPayDet.global.itemIndex + '" class="taxRate" style="width: 100%">' +
            '       <input type="hidden" id="payAmt' + regPayDet.global.itemIndex + '" class="payAmt" style="width: 100%">' +
            '       <input type="hidden" id="incTax' + regPayDet.global.itemIndex + '" class="incTax" style="width: 100%">' +
            '       <input type="hidden" id="locIncTax' + regPayDet.global.itemIndex + '" class="locIncTax" style="width: 100%">' +
            '       <input type="hidden" id="subAmt' + regPayDet.global.itemIndex + '" class="subAmt" style="width: 100%">' +
            '       <input type="hidden" id="actPayAmt' + regPayDet.global.itemIndex + '" class="actPayAmt" style="width: 100%">' +
            '   </td>' +
            '   <td>' +
            '       <i class="k-i-plus k-icon" style="cursor: pointer"  onclick="regPayDet.fn_popRegDet(1, '+regPayDet.global.itemIndex+')"></i>' +
            '       <input type="text" style="width: 70%" id="crmNm' + regPayDet.global.itemIndex + '" class="crmNm">' +
            '       <input type="hidden" id="buySts' + regPayDet.global.itemIndex + '" class="buySts">' +
            '       <input type="hidden" id="trCd' + regPayDet.global.itemIndex + '" class="trCd">' +
            '   </td>' +
            '   <td>' +
            '       <input type="text" id="regNo' + regPayDet.global.itemIndex + '" class="regNo" style="width: 100%">' +
            '   </td>' +
            '   <td>' +
            '       <input type="text" id="crmBnkNm' + regPayDet.global.itemIndex + '" class="crmBnkNm">' +
            '   </td>' +
            '   <td>' +
            '       <input type="text" id="crmAccNo' + regPayDet.global.itemIndex + '" class="crmAccNo">' +
            '   </td>' +
            '   <td>' +
            '       <input type="text" id="crmAccHolder' + regPayDet.global.itemIndex + '" class="crmAccHolder">' +
            '   </td>' +
            '   <td>' +
            '       <input type="text" id="trDe' + regPayDet.global.itemIndex + '" class="trDe">' +
            '   </td>' +
            '   <td>' +
            '       <input type="text" id="totCost' + regPayDet.global.itemIndex + '" value="0" class="totCost" onchange="regPay.fn_changeAllCost()" style="text-align: right" onkeyup="regPay.fn_calCost(this)" oninput="this.value = this.value.replace(/[^-0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
            '   </td>' +
            '   <td>' +
            '       <input type="text" id="supCost' + regPayDet.global.itemIndex + '" value="0" class="supCost" style="text-align: right" onkeyup="regPay.fn_calCost(this)" oninput="this.value = this.value.replace(/[^-0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
            '   </td>' +
            '   <td>' +
            '       <input type="text" id="vatCost' + regPayDet.global.itemIndex + '" value="0" class="vatCost" style="text-align: right" onkeyup="regPay.fn_calCost(this)" oninput="this.value = this.value.replace(/[^-0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');">' +
            '   </td>' +
            '   <td>' +
            '       <i class="k-i-plus k-icon" style="cursor: pointer"  onclick="regPayDet.fn_popRegDet(3, '+regPayDet.global.itemIndex+')"></i>' +
            '       <input type="text" style="width: 70%" disabled id="card' + regPayDet.global.itemIndex + '" class="card">' +
            '       <input type="hidden" id="cardNo' + regPayDet.global.itemIndex + '" class="cardNo">' +
            '   </td>' +
            '   <td>' +
            '       <input type="text" id="etc' + regPayDet.global.itemIndex + '" class="etc">' +
            '   </td>';
        regPayDet.global.createHtmlStr += "" +
            '   <td>' +
            '       <div style="text-align: center">' +
            '           <button type="button" class="k-button k-button-solid-error" id="detDelBtn" onclick="regPayDet.delRow(' + regPayDet.global.itemIndex + ')">삭제</button>' +
            '       </div>' +
            '   </td>' +
            '</tr>';

        $("#payDestTb").append(regPayDet.global.createHtmlStr);

        if(clIdx > 0){
            $("#budgetNm" + clIdx).val($("#budgetNm" + (clIdx-1)).val());
            $("#budgetSn" + clIdx).val($("#budgetSn" + (clIdx-1)).val());
            $("#budgetAmt" + clIdx).val($("#budgetAmt" + (clIdx-1)).val());
        }

        var itemIndex = regPayDet.global.itemIndex;
        $("#eviType" + itemIndex).kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "선택", value: "" },
                { text: "세금계산서", value: "1" },
                { text: "계산서", value: "2" },
                { text: "신용카드", value: "3" },
                { text: "직원지급", value: "4" },
                { text: "사업소득자", value: "5" },
                { text: "기타소득자", value: "9" },
                { text: "기타", value: "6" },
            ],
            index: 0,
            change : function (e){
                var value = $("#eviType" + itemIndex).val();

                regPayDet.fn_eviTypeReset(itemIndex);

                if(value != ""){
                    if(value == "6"){
                        alert("정규증빙이 없는 지출(지로, 오버헤드, 공공요금여입, 현금출금)\n등의 경우 선택합니다.")
                    } else if(value == "1" || value == "2"){
                        regPayDet.fn_paymentEtaxHistory(value, itemIndex);
                    } else if(value == "3"){
                        regPayDet.fn_paymentCardHistory(value, itemIndex);
                    } else {
                        regPayDet.fn_popRegDet(value, itemIndex);
                    }
                }
            }
        });

        customKendo.fn_textBox(["crmNm" + regPayDet.global.itemIndex, "crmBnkNm"  + regPayDet.global.itemIndex
                                , "crmAccHolder" + regPayDet.global.itemIndex, "regNo" + regPayDet.global.itemIndex
                                , "crmAccNo" + regPayDet.global.itemIndex, "totCost" + regPayDet.global.itemIndex
                                , "supCost" + regPayDet.global.itemIndex, "vatCost" + regPayDet.global.itemIndex
                                ,"card" + regPayDet.global.itemIndex, "etc" + regPayDet.global.itemIndex, "budgetNm" + regPayDet.global.itemIndex]);

        customKendo.fn_datePicker("trDe" + regPayDet.global.itemIndex, "month", "yyyy-MM-dd", new Date());

        var ds = customKendo.fn_customAjax("/dept/getDeptAList", {
            deptLevel : 2
        });
        customKendo.fn_dropDownList("appTeam" + regPayDet.global.itemIndex, ds.rs, "dept_name", "dept_seq","5");

        $("#appTeam" + regPayDet.global.itemIndex).data("kendoDropDownList").value($("#loginDeptSeq").val());

        regPayDet.global.itemIndex++;

        $(".payDestInfo td input").css("font-size", "10px");
        $(".payDestInfo td").css("padding", "0.35rem");
        $(".payDestInfo td span").css("font-size", "10px");

        if($("#pjtCd").val().substring(0,1) != "M" && ($("#pjtCd").val().substring(0,1) != "Z" || $("#pjtCd").val() == "Za9g923011" || $("#pjtCd").val() == "Za9g923012") && $("#pjtCd").val().substring(0,1) != ""){
            $(".reasonTr").css("display", "");
            $("#footerLine").attr("colspan", "9");
            $("#reasonContTr").css("display", "none");
        } else {
            $("#footerLine").attr("colspan", "8");
        }
    },

    delRow : function (row){
        if($(".payDestInfo").length > 1){
            $("#pay" + row).remove();
            /*regPayDet.global.itemIndex--;*/
        } else if($(".payDestInfo").length == 1){
            $("#pay" + row).remove();
            regPayDet.global.itemIndex = 0;
            regPayDet.addRow();
            $("#totalAllCost").text(0);
        }
    },


    fn_exnpAdd : function (){

        var subject = "";
        if($("#status").val() == "rev"){
            subject = "지출결의";
            if(!confirm("지출결의를 작성하시겠습니까?")) {
                return;
            }
        } else if($("#status").val() == "in"){
            subject = "여입결의";
            if(!confirm("여입결의를 작성하시겠습니까?")) {
                return;
            }
        } else if($("#status").val() == "re"){
            subject = "여입결의";
            if(!confirm("반납결의를 작성하시겠습니까?")) {
                return;
            }
        } else if($("#status").val() == "alt"){
            subject = "여입결의";
            if(!confirm("대체결의를 작성하시겠습니까?")) {
                return;
            }
        }


        if($(".check:checked").length == 0){
            alert("선택된 값이 없습니다.");
            return ;
        }

        var keyArr = "";
        var flag = true;
        var budgetArr = [];
        var eviTypeArr = [];
        $(".check:checked").each(function(){
            keyArr += $(this).val() + ",";
            var rowIdx = $(this).attr("id").replace(/[^0-9]/g, '');

            budgetArr.push($("#budgetSn" + rowIdx).val());
            eviTypeArr.push($("#eviType" + rowIdx).val());
        });

        keyArr = keyArr.substring(0, keyArr.length - 1);

        const setBudgetArr = new Set(budgetArr);
        const setEviTypeArr = new Set(eviTypeArr);

        if(setBudgetArr.size > 1) {
            alert("예산비목이 다릅니다. 확인해주세요.");
            return;
        }

        if(setEviTypeArr.size > 1) {
            alert("증빙유형이 다릅니다. 확인해주세요.");
            return;
        }
        var data= {
            arr : keyArr,
            payAppSn : $("#payAppSn").val()
        }
        var result = customKendo.fn_customAjax("/mng/checkExnpDetData", data);
        var exnpSaveFlag = false;
        for(var i = 0; i < result.list.length; i++){
            if(result.list[i].EXNP_SAVE == "Y"){
                exnpSaveFlag = true;
                break;
            }
        }

        if(exnpSaveFlag){
            alert("현재 해당건으로 작성된 "+subject+"서가 있습니다.");
            return ;
        }

        var payAppSn = $("#payAppSn").val();

        if($("#payAppSn").val() == ""){
            alert("시스템 오류가 발생하였습니다.");
            return;
        }
        regPayDet.fn_regExnpPop(keyArr, payAppSn);
        window.close();
    },

    fn_regExnpPop : function (keyArr, key){

        var url = "/payApp/pop/regExnpPop.do?item=" + keyArr + "&payAppSn=" + key;

        if($("#status").val() == "rev"){
            url += "&status=" + $("#status").val();
        } else if($("#status").val() == "in"){
            url += "&status=" + $("#status").val();
        } else if($("#status").val() == "re"){
            url += "&status=" + $("#status").val();
        } else if($("#status").val() == "alt"){
            url += "&status=" + $("#status").val();
        }
        var name = "_blank";
        var option = "width = 1700, height = 820, top = 100, left = 400, location = no";
        var popup = window.open(url, name, option);
    },

    fn_regPayAttPop : function (){
        var url = "/payApp/pop/regPayAttPop.do?payAppSn=" + $("#payAppSn").val() + "&reqType=" + $("#reqType").val();
        if($("#reqType").val() == "purc"){
            url += "&purcSn=" + $("#purcSn").val();
        }

        if($("#reqType").val() == "claimExnp"){
            url += "&purcSn=" + $("#purcSn").val() + "&claimSn=" + $("#claimSn").val() + "&claimExnpSn=" + $("#claimExnpSn").val();
        }

        if($("#reqType").val() == "snack"){
            url += "&snackInfoSn=" + $("#snackInfoSn").val();
        }

        var name = "_blank";
        var option = "width = 850, height = 400, top = 200, left = 350, location = no";
        var popup = window.open(url, name, option);
    },

    fn_eviTypeReset: function(idx) {
        $("#fileNo" + idx).val("");
        $("#authNo" + idx).val("");
        $("#authHh" + idx).val("");
        $("#authDd" + idx).val("");
        $("#issNo" + idx).val("");
        $("#coCd" + idx).val("");
        $("#taxTy" + idx).val("");
        $("#expRate" + idx).val("");
        $("#taxRate" + idx).val("");
        $("#payAmt" + idx).val("");
        $("#incTax" + idx).val("");
        $("#locIncTax" + idx).val("");
        $("#subAmt" + idx).val("");
        $("#actPayAmt" + idx).val("");
        $("#crmNm" + idx).val("");
        $("#buySts" + idx).val("");
        $("#trCd" + idx).val("");
        $("#regNo" + idx).val("");
        $("#crmBnkNm" + idx).val("");
        $("#crmAccNo" + idx).val("");
        $("#crmAccHolder" + idx).val("");
        $("#trDe" + idx).data("kendoDatePicker").value(new Date());
        $("#totCost" + idx).val("");
        $("#supCost" + idx).val("");
        $("#vatCost" + idx).val("");
        $("#card" + idx).val("");
        $("#cardNo" + idx).val("");
        $("#etc" + idx).val("");

    },



    fn_budgetAll : function (){
        regPay.fn_budgetPop("all");
    },

    fn_budgetChange : function(p){
        console.log(p);

        var bgtCd = p.bgtCd;
        var bgtNm = p.bgtNm;
        var subAm = p.subAm;

        $(".budgetSn").val(bgtCd);
        $(".budgetNm").val(bgtNm);
        $(".budgetAmt").val(subAm);
    }
}

