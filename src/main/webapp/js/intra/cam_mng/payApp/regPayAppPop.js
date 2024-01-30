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
        exnpFlag : false
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
                    $("#exnpAddBtn").text("반납신청서 작성");
                } else if($("#payAppType").data("kendoRadioGroup").value() == "4"){
                    $("#cardTitle").text("대체신청서");
                    $("#exnpAddBtn").text("대체신청서 작성");
                }
            }
        })

        if($("#payAppSn").val() != ""){
            regPay.setData();

            var fileThumbText = "";
            var fileList = regPay.global.fileArray;

            fileList = ([...new Map(fileList.map((obj) => [obj["file_org_name"], obj])).values()]);

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
                bsYm : $("#bsYm").val()
            }

            $.ajax({
                url : "/payApp/getPartRatePay",
                data : data,
                type : "POST",
                dataType : "json",
                success : function (rs){
                    var rs = rs.data;
                    console.log(rs);
                    $("#pjtSn").val(rs[0].PJT_SN);
                    $("#pjtNm").val(rs[0].PJT_NM);
                    $("#appTitle").val(rs[0].PJT_NM + " 참여인력 인건비")

                    for(let i = 1; i < rs.length; i++) {
                        regPayDet.addRow()
                    }

                    for(let i = 0; i < rs.length; i++) {
                        $("#crmNm" + i).val(rs[i].EMP_NAME_KR);
                        $("#regNo" + i).val(rs[i].REG_NO);
                        $("#trCd" + i).val(rs[i].ERP_ERP_CD);
                        $("#crmBnkNm" + i).val(rs[i].BANK_NAME);
                        $("#crmAccNo" + i).val(rs[i].ACCOUNT_NUM);
                        $("#crmAccHolder" + i).val(rs[i].ACCOUNT_HOLDER);
                        $("#totCost" + i).val(regPay.comma(rs[i].MON_SAL));
                        $("#supCost" + i).val(regPay.comma(rs[i].MON_SAL));
                    }

                    selectProject(rs[0].PJT_SN, rs[0].PJT_NM, rs[0].PJT_CD)

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
                $("#crmBnkNm" + i).val(ls[i].CRM_BN);
                $("#crmAccNo" + i).val(ls[i].CRM_BN_NUM);
                $("#crmAccHolder" + i).val(ls[i].BN_DEPO);
                $("#totCost" + i).val(regPay.comma(ls[i].PURC_ITEM_AMT));
                $("#supCost" + i).val(regPay.comma(ls[i].PURC_ITEM_AMT));
            }
        }

        if($("#reqType").val() == "claimExnp") {
            var data = {
                claimExnpSn: $("#claimExnpSn").val(),
                claimSn : $("#claimSn").val()
            }

            if($("#purcSn").val() != 'undefined'){
                data.purcSn = $("#purcSn").val();
            }

            var result = customKendo.fn_customAjax("/purc/getPurcAndClaimData", data);

            var rs = result.data;
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

            if(cem.CNT > 1 ){
                $("#appTitle").val(rs.PURC_REQ_PURPOSE + " 외 " + Number(cem.CNT - 1) + "건");
            } else {
                $("#appTitle").val(rs.PURC_REQ_PURPOSE);
            }

            var ls = rs.itemList;

            for(let i = 0; i < 1; i++) {
                $("#eviType" + i).data("kendoDropDownList").value(1);
                $("#crmNm" + i).val(ls[i].CRM_NM);
                $("#crmSn" + i).val(ls[i].CRM_SN);
                $("#regNo" + i).val(ls[i].CRM_NO_TMP);
                $("#crmBnkNm" + i).val(ls[i].CRM_BN);
                $("#crmAccNo" + i).val(ls[i].CRM_BN_NUM);
                $("#crmAccHolder" + i).val(ls[i].BN_DEPO);
                $("#totCost" + i).val(regPay.comma(cem.TOT_AMT));
                $("#supCost" + i).val(regPay.comma(cem.TOT_AMT));
                $("#budgetNm" + i).val(cem.BUDGET_NM);
                $("#budgetSn" + i).val(cem.BUDGET_SN);
                $("#budgetAmt" + i).val(9999999999);

            }

            var fileResult = customKendo.fn_customAjax("/purc/purcFileList", data);
            var fileList = fileResult.listMap;
            var fileThumbText = "";


            for(let i=0; i<fileList.length; i++){
                if(fileThumbText != ""){
                    fileThumbText += " | ";
                }
                fileThumbText += fileList[i].file_org_name;
                fileThumbText += "." + fileList[i].file_ext;
            }

            $("#fileText").text(fileThumbText);
        }

        if($("#reqType").val() == "bustrip"){
            const hrBizReqResultId = $("#hrBizReqResultId").val();
            const exnpList = [];
            const cardList = [];

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

            const pjtMap = customKendo.fn_customAjax("/project/getProjectStep", {pjtSn: exnpList[0].PJT_SN}).rs;

            if (exnpList[0].PJT_SN != null) {
                var busnClass = pjtMap.BUSN_CLASS;
                $("#pjtSn").val(pjtMap.PJT_SN);
                $("#pjtNm").val(pjtMap.PJT_NM);
                if ($("#pjtSn").val() != "" && busnClass == "D" && busnClass == "V") {
                    selectProject(pjtMap.PJT_SN, pjtMap.PJT_NM, pjtMap.PJT_CD);
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
                const index = count;

                /** 개인여비 */
                $("#eviType" + index).data("kendoDropDownList").value(3);
                $("#crmNm" + index).val(exnpMap.EXNP_NAME);
                $("#etc" + index).val(exnpMap.EXNP_NAME + " 개인여비");
                $("#totCost" + index).val(regPay.comma(exnpMap.PERSON_SUM));
                $("#supCost" + index).val(regPay.comma(exnpMap.PERSON_SUM));

                const g20CardList = customKendo.fn_customAjax("/g20/getCardList", {
                    searchValue: exnpMap.EXNP_NAME
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
                console.log("parameters");
                console.log(parameters);


                const iBrenchResult = customKendo.fn_customAjax("/cam_mng/companyCard/useCardDetail", parameters);
                const data = iBrenchResult.cardInfo;
                console.log(data);

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


            var blist = "";
            var fileThumbText = "";
            var docFileThumbText = "";
            var tempExnpFile = [];

            for(let i = 0 ; i < hrBizReqResultId.toString().split(",").length; i++) {
                /** 첨부파일 */
                const exnpFile = customKendo.fn_customAjax("/bustrip/getExnpFileNum", {
                    hrBizReqResultId: hrBizReqResultId.toString().split(",")[i]
                }).list;

                for(let x = 0 ; x < exnpFile.length; x++) {
                    regPay.global.fileArray.push(exnpFile[x]);
                    tempExnpFile.push(exnpFile[x]);
                }

                for (let y = 0; y < exnpFile.length; y++) {
                    if (blist != "") {
                        blist += ",";
                    }
                    if (fileThumbText != "") {
                        fileThumbText += " | ";
                    }
                    blist += exnpFile[y].file_no;
                    fileThumbText += exnpFile[y].file_org_name;
                    fileThumbText += "." + exnpFile[y].file_ext;
                }

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

            for (let i = 0; i < cardList.length; i++) {
                if (cardList[i].FILE_NO != null) {
                    const fileData = customKendo.fn_customAjax("/common/getFileInfo", {
                        fileNo: cardList[i].FILE_NO
                    }).data;
                    regPay.global.fileArray.push(fileData);

                    if (blist != "") {
                        blist += ",";
                    }
                    if (fileThumbText != "") {
                        fileThumbText += " | ";
                    }
                    blist += fileData.file_no;
                    fileThumbText += fileData.file_org_name;
                    fileThumbText += "." + fileData.file_ext;
                }
            }


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
            const data = {
                hrBizReqId : hrBizReqId
            }
            const result = customKendo.fn_customAjax("/bustrip/getPersonalExnpData", data);
            const exnpList = result.list;

            const result2 = customKendo.fn_customAjax("/bustrip/getCorpExnpData", data);
            const exnpList2 = result2.list;

            console.log("exnpList");
            console.log(exnpList);

            const pjtMap = customKendo.fn_customAjax("/project/getProjectStep", {pjtSn: exnpList[0].PJT_SN}).rs;

            if(exnpList[0].PJT_SN != null){
                var busnClass = pjtMap.BUSN_CLASS;
                $("#pjtSn").val(pjtMap.PJT_SN);
                $("#pjtNm").val(pjtMap.PJT_NM);
                if($("#pjtSn").val() != "" && busnClass == "D" && busnClass == "V"){
                    selectProject(pjtMap.PJT_SN, pjtMap.PJT_NM, pjtMap.PJT_CD);
                }else{
                    selectProject('', '[2024년]법인운영', 'Mm1m124010');
                }
            }else {
                selectProject('', '[2024년]법인운영', 'Mm1m124010');
            }

            let totalList = exnpList.length;
            for(let i=0; i < totalList; i++) {
                regPayDet.addRow();
            }

            let count = 0;
            for(let i=0; i < exnpList.length; i++) {
                const exnpMap = exnpList[i];
                const index = count;

                /** 개인여비 */
                $("#eviType" + index).data("kendoDropDownList").value(4);
                $("#crmNm"+index).val(exnpMap.EXNP_NAME);
                $("#etc"+index).val(exnpMap.EXNP_NAME+" 개인여비");
                $("#totCost"+index).val(regPay.comma(exnpMap.PERSON_SUM));
                $("#supCost"+index).val(regPay.comma(exnpMap.PERSON_SUM));

                const g20CardList = customKendo.fn_customAjax("/g20/getCardList", {
                    searchValue: exnpMap.EXNP_NAME
                }).list
                console.log("g20CardList");
                console.log(g20CardList);

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

            console.log("exnpList2");
            console.log(exnpList2);
            for(let i=0; i < exnpList2.length; i++) {
                const exnpMap2 = exnpList2[i];
                console.log(exnpMap2);
                const index = count;

                /** 법인 */
                $("#eviType" + index).data("kendoDropDownList").value(3);
                $("#crmNm"+index).val(exnpMap2.EXNP_NAME);
                $("#etc"+index).val(exnpMap2.EXNP_NAME+" 개인여비");
                $("#totCost"+index).val(regPay.comma(exnpMap2.CORP_SUM));
                $("#supCost"+index).val(regPay.comma(exnpMap2.CORP_SUM));
                count++;
            }

            let blist = "";
            $("#fileText").text(fileThumbText);
            $("#bList").val(blist);
        }

        if($("#reqType").val() == "snack"){
            const snackInfoSn = $("#snackInfoSn").val();
            var count = 0;
            var fileThumbText = "";
            var slist = "";

            for(let i = 0 ; i < snackInfoSn.toString().split(",").length ; i++){
                const data = {
                    snackInfoSn : snackInfoSn.toString().split(",")[i]
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
                    debugger
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
                        fn_selCardInfo(cr.TR_CD, cr.TR_NM, cr.CARD_BA_NB, cr.JIRO_NM, cr.CLTTR_CD, cr.BA_NB, cr.DEPOSITOR, 0);
                        $("#eviType" + count).data("kendoDropDownList").value(3);
                        $("#etc" + count).val(snackData.RECIPIENT_EMP_NAME + "의 개인카드 식대사용");
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
                                buySts : cardMap.BUY_STS
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

                            const g20CardList = customKendo.fn_customAjax("/g20/getCardList", {
                                searchValue: data.CARD_NO
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
                $("#exnpAddBtn").text("반납신청서 작성");
            } else if($("#payAppType").data("kendoRadioGroup").value() == "4"){
                $("#cardTitle").text("대체신청서");
                $("#exnpAddBtn").text("대체신청서 작성");
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

    fn_updReason : function(){
        var dialog = $("#dialog").data("kendoWindow");
        $("#reason" + $("#reasonIdx").val()).val($("#reasonPopText").val());
        dialog.close();
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
                buttonHtml += '<button type="button" id="reReqBtn" style="margin-right: 5px;" class="k-button k-button-solid-error" onclick="tempOrReDraftingPop(\''+data.DOC_ID+'\', \'payApp\', \'camticPayApp_'+data.PAY_APP_SN+'\', 2, \'reDrafting\');">재상신</button>';
            }else if(data.DOC_STATUS == "100"){
                if($("#auth").val() != 'user'){
                    buttonHtml += '<button type="button" id="reCallBtn" style="margin-right: 5px;" class="k-button k-button-solid-primary" onclick="regPay.fn_revertModal(\''+data.DOC_ID+'\')">반려</button>';
                }
                buttonHtml += '<button type="button" id="viewBtn" style="margin-right: 5px;" class="k-button k-button-solid-base" onclick="approveDocView(\''+data.DOC_ID+'\', \'payApp'+data.PAY_APP_SN+'\', \'payApp\');">열람</button>';
                $("#addBtn").hide();
                $("#exnpAddBtn").show();
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
    },

    payAppDrafting: function(){

        regPay.fn_save("", "drafting");

        var budgetFlag = false;
        if($("#pjtCd").val().substring(0,1) == "M"){
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
                        var name = "_self";
                        var option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=yes, scrollbars = yes, status=no, top=50, left=50"
                        var popup = window.open(url, name, option);
                        this.action = "/popup/payApp/approvalFormPopup/payAppApprovalPop.do";
                        this.method = 'POST';
                        this.target = '_self';
                    }).trigger("submit");
                }
            }
        });
    },

    setData : function (){
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
        regPay.payAppBtnSet(rs);

        // if(rs.ADVANCES != 'Y'){
        //     $("#advances").prop("checked", false);
        // } else {
        //     $("#advances").prop("checked", true);
        // }

        $("#docStatus").val(rs.DOC_STATUS)
        if(rs.DOC_STATUS != 0 && rs.DOC_STATUS != 30){
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
            }

            var clIdx = regPayDet.global.itemIndex;

            regPayDet.global.createHtmlStr += "" +
                '   <td>' +
                '       <input type="text" id="budgetNm' + regPayDet.global.itemIndex + '" dir="rtl"  value="'+item.BUDGET_NM+'" onclick="regPay.fn_budgetPop('+clIdx+')" style="width: 100%; text-align: right;">' +
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
                    } else if(rs.DOC_STATUS == "0" || rs.DOC_STATUS == "30"){
                        regPayDet.global.createHtmlStr += '<button type="button" class="k-button k-button-solid-error" id="detDelBtn" onclick="regPayDet.delRow(' + regPayDet.global.itemIndex + ')">삭제</button>';
                    } else {
                        regPayDet.global.createHtmlStr += '<button type="button" class="k-button k-button-solid-error" id="detDelBtn" onclick="regPayDet.delRow(' + regPayDet.global.itemIndex + ')" disabled>삭제</button>';
                    }
                } else {
                    if(rs.DOC_STATUS == "0"){
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

        if($("#pjtCd").val().substring(0,1) != "M" && $("#pjtCd").val().substring(0,1) != ""){
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
    },

    fn_popDateSetting : function(){
        regPay.fn_save("", "drafting");
        var trDe = $("#trDe0").val();
        var trDeAr = trDe.split("-");

        var trDate = new Date(trDeAr[0], trDeAr[1] - 1, trDeAr[2]);

        var eviType = $("#eviType0").val();
        if(trDe != "" && trDe != null && trDe != undefined){
            if($("#pjtCd").val().substring(0,1) != ""){
                // 법인운영일 경우
                if($("#pjtCd").val().substring(0,1) == "M"){
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
            } else {
                $("#titleStat").text("확인");
            }
            $("#pjtSelBtn, #bgSelBtn, #appTitle, #appCont, #bnkSelBtn").prop("disabled", true);
            $("#exnpAddBtn").text("반납결의서 작성");
            $("#addBtn").css("display", "none");
            $("#exnpAddBtn").css("display", "");
        }

        if(stat == "alt"){
            if($("#auth").val() != "user"){
                $("#titleStat").text("검토");
            } else {
                $("#titleStat").text("확인");
            }
            $("#pjtSelBtn, #bgSelBtn, #appTitle, #appCont, #bnkSelBtn").prop("disabled", true);
            $("#exnpAddBtn").text("대체결의서 작성");
            $("#addBtn").css("display", "none");
            $("#exnpAddBtn").css("display", "");
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
        }

        if($("#reqType").val() == "business"){
            parameters.hrBizReqId = $("#hrBizReqId").val();
            parameters.linkKey = $("#hrBizReqResultId").val();
            parameters.linkKeyType = "사전정산";

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
            if($("#pjtCd").val().substring(0,1) != "M" && $("#pjtCd").val().substring(0,1) != ""){

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
        $.each($(".payDestInfo"), function(i, v){
            var index = $(this).find(".budgetSn").attr("id").slice(-1);

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

                        if($("#reqType").val() != "business"){
                            opener.parent.paymentList.gridReload();
                        }else{
                            opener.location.reload();
                            opener.opener.gridReload();
                        }
                    }
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
        var index = obj.id.substring(obj.id.length - 1);
        if(obj.id.match("totCost")){
            $("#vatCost" + index).val(regPay.comma(Number(regPay.uncommaN($("#totCost" + index).val())) - Math.round(Number(regPay.uncommaN($("#totCost" + index).val())) * 100 / 110)));
            $("#supCost" + index).val(regPay.comma(Number(regPay.uncommaN($("#totCost" + index).val())) - Number(regPay.uncommaN($("#vatCost" + index).val()))));
        } else if(obj.id.match("supCost")){
            $("#vatCost" + index).val(regPay.comma(Number(regPay.uncommaN($("#totCost" + index).val())) - Number(regPay.uncommaN($("#supCost" + index).val()))));
        } else if (obj.id.match("vatCost")){
            $("#supCost" + index).val(regPay.comma(Number(regPay.uncommaN($("#totCost" + index).val())) - Number(regPay.uncommaN($("#vatCost" + index).val()))));
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
                }
            }
        });
    }


}


var regPayDet = {

    global : {
        itemIndex : 0,
        createHtmlStr : "",
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
            '       <input type="text" id="budgetNm' + regPayDet.global.itemIndex + '" dir="rtl"  value="" onclick="regPay.fn_budgetPop(' + clIdx + ')" style="width: 100%; text-align: right;">' +
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

        if($("#pjtCd").val().substring(0,1) != "M" && $("#pjtCd").val().substring(0,1) != ""){
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
            var rowIdx = $(this).attr("id").charAt($(this).attr("id").length - 1);

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

    }
}

