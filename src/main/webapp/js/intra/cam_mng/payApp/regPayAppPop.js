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
    },

    fn_defaultScript : function (){
        customKendo.fn_datePicker("appDe", "month", "yyyy-MM-dd", new Date());
        customKendo.fn_textBox(["pjtNm", "budgetNm", "appTitle"]);

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


        var parameters = {
            payAppType : $("#payAppType").data("kendoRadioGroup").value(),
            appDe : $("#appDe").val(),
            pjtNm : $("#pjtNm").val(),
            pjtSn : $("#pjtSn").val(),
            budgetNm : $("#budgetNm").val(),
            budgetSn : $("#budgetSn").val(),
            appTitle : $("#appTitle").val(),
            appCont : $("#appCont").val()

        }
    },

    crmInfoChange : function(){
        console.log(purcInfo.global.crmSnId, purcInfo.global.crmNmId)

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
        formData.append("status", e);
        formData.append("empSeq", $("#purcReqEmpSeq").val());

        if($("#file1")[0].files.length == 1){
            formData.append("file1", $("#file1")[0].files[0]);
        }

        if($("#file2")[0].files.length == 1){
            formData.append("file2", $("#file2")[0].files[0]);
        }

        var itemArr = new Array()
        var flag = true;
        $.each($(".purcItemInfo"), function(i, v){
            var data = {
                purcItemSn : $(this).find("#purcItemSn" + i).val(),
                purcItemType : $("#purcItemType" + i).val(),
                productA : $("#productA" + i).val(),
                productB : $("#productB" + i).val(),
                productC : $("#productC" + i).val(),
                purcItemName : $("#purcItemName" + i).val(),
                purcItemStd : $("#purcItemStd" + i).val(),
                purcItemUnitPrice : regPay.uncomma($("#purcItemUnitPrice" + i).val()),
                purcItemQty : $("#purcItemQty" + i).val(),
                purcItemUnit : $("#purcItemUnit" + i).val(),
                purcItemAmt : regPay.uncomma($("#purcItemAmt" + i).val()),
                crmSn : $("#crmSn" + i).val(),
                rmk : $("#rmk" + i).val(),
                status : e,
                empSeq : $("#purcReqEmpSeq").val(),
            }

            if(data.productA == ""){
                flag = false;
            }

            if(data.productB == ""){
                flag = false;
            }

            if(data.productC == ""){
                flag = false;
            }

            itemArr.push(data);
        })

        if(!flag){
            alert("구분값을 선택해주세요.");
            return ;
        }
        formData.append("itemArr", JSON.stringify(itemArr))

        var result = customKendo.fn_customFormDataAjax("/purc/setPurcReq.do", formData);
        if(result.flag){
            alert("저장되었습니다.");
            opener.parent.prm.gridReload();
            window.close();
        }
    },

    setPurcReqStatusUpd : function(e){
        regPay.global.saveAjaxData = {
            purcSn : $("#purcSn").val(),
            status : e
        }

        var result = customKendo.fn_customFormDataAjax("/manage/setPurcReqStatusUpd.do", regPay.global.saveAjaxData);
        if(result.flag){
            alert("처리되었습니다.");
            opener.parent.prm.gridReload();
            window.close();
        }
    },

    addRow : function(){
        regPay.global.createHtmlStr = "";

        regPay.global.itemIndex++

        regPay.global.createHtmlStr = "" +
            '<tr class="purcItemInfo newArray" id="item' + regPay.global.itemIndex + '">';
        if($("#stat").val() == "v"){
            regPay.global.createHtmlStr += '' +
                '<td>' +
                '   <input type="checkbox" id="check'+ regPay.global.itemIndex + '" class="childCheck k-checkbox" style="margin-left: 3px;" value="regPay.global.itemIndex">' +
                '</td>';
        }
        regPay.global.createHtmlStr += '' +
            '<td>' +
            '   <input type="hidden" id="purcItemSn' + regPay.global.itemIndex + '" name="purcItemSn0" class="purcItemSn">' +
            '   <input type="text" id="purcItemType' + regPay.global.itemIndex + '" class="purcItemType" style="width: 110px">' +
            '   <input type="text" id="productA' + regPay.global.itemIndex + '" class="productA" style="width: 110px">' +
            '   <input type="text" id="productB' + regPay.global.itemIndex + '" class="productB" style="width: 110px; display: none">' +
            '   <input type="text" id="productC' + regPay.global.itemIndex + '" class="productC" style="width: 110px; display: none">' +
            '</td>' +
            '<td>' +
            '<input type="text" id="purcItemName' + regPay.global.itemIndex + '" class="purcItemName">' +
            '</td>' +
            '<td>' +
            '<input type="text" id="purcItemStd' + regPay.global.itemIndex + '" class="purcItemStd">' +
            '</td>' +
            '<td>' +
            '<input type="text" id="purcItemUnitPrice' + regPay.global.itemIndex + '" class="purcItemUnitPrice" onkeyup="regPay.fn_calc('+regPay.global.itemIndex+', this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" style="text-align: right">' +
            '</td>' +
            '<td>' +
            '<input type="text" id="purcItemQty' + regPay.global.itemIndex + '" class="purcItemQty" onkeyup="regPay.fn_calc('+regPay.global.itemIndex+', this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" style="text-align: right">' +
            '</td>' +
            '<td>' +
            '<input type="text" id="purcItemUnit' + regPay.global.itemIndex + '" class="purcItemUnit">' +
            '</td>' +
            '<td>' +
            '<input type="text" id="purcItemAmt' + regPay.global.itemIndex + '" class="purcItemAmt" disabled onkeyup="regPay.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" style="text-align: right">' +
            '</td>' +
            '<td>' +
            '<input type="hidden" id="crmSn' + regPay.global.itemIndex + '" class="crmSn">' +
            '<input type="text" id="crmNm' + regPay.global.itemIndex + '" disabled class="crmNm" style="width: 60%"> ' +
            '<button type="button" id="crmSelBtn' + regPay.global.itemIndex + '" class="crmSelBtn k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="regPay.fn_popCamCrmList(\'crmSn' + regPay.global.itemIndex + '\',\'crmNm' + regPay.global.itemIndex + '\');">업체선택</button>' +
            '</td>' +
            '<td>' +
            '<input type="text" id="rmk' + regPay.global.itemIndex + '" class="rmk">' +
            '</td>';
        if($("#stat").val() == "v"){
            regPay.global.createHtmlStr += '' +
                '<td id="itemStatus' + regPay.global.itemIndex + '">' +
                '<button type="button" id="retBtn' + regPay.global.itemIndex + '" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="regPay.fn_retItem('+regPay.global.itemIndex+')">반려</button>' +
                '</td>';
        } else {
            regPay.global.createHtmlStr += '' +
                '<td>' +
                '   <button type="button" id="delRowBtn' + regPay.global.itemIndex + '" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="regPay.delRow(this)">삭제</button>' +
                '</td>'
        }
        regPay.global.createHtmlStr += '' +
            '</tr>';



        $("#purcItemTb").append(regPay.global.createHtmlStr);

        regPay.global.dropDownDataSource = [
            { text: "구매", value: "1"},
        ]
        customKendo.fn_dropDownList("purcItemType" + regPay.global.itemIndex, regPay.global.dropDownDataSource, "text", "value", 2);

        customKendo.fn_textBox(["purcItemName" + regPay.global.itemIndex, "purcItemStd" + regPay.global.itemIndex,
            "purcItemUnitPrice" + regPay.global.itemIndex, "purcItemQty" + regPay.global.itemIndex,
            "purcItemUnit" + regPay.global.itemIndex, "purcItemAmt" + regPay.global.itemIndex,
            "crmNm" + regPay.global.itemIndex, "rmk" + regPay.global.itemIndex]);

        let productsDataSource = customKendo.fn_customAjax("/system/commonCodeManagement/getCmCodeList", {cmGroupCodeId: "38"});
        customKendo.fn_dropDownList("purcItemType" + regPay.global.itemIndex, productsDataSource, "CM_CODE_NM", "CM_CODE", 2);


        let productADataSource = customKendo.fn_customAjax("/projectMng/getProductCodeInfo", {productGroupCodeId: 1}).list;
        customKendo.fn_dropDownList("productA" + regPay.global.itemIndex, productADataSource, "PRODUCT_DT_CODE_NM", "PRODUCT_DT_CODE", 2);


        $(".productA").each(function (){

            var productId = $(this).attr("id");

            if(productId != null){
                regPay.fn_productCodeSetting(productId);
            }
        });

    },

    fn_productCodeSetting : function (productId){
        var i = productId.slice(-1);

        $("#productA" + i).bind("change", function(){
            if($("#productA" + i).data("kendoDropDownList").value() == ""){
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

        return inputNumberFormat(e);
    },

    delRow : function(e){
        // if(!confirm("삭제하시겠습니까?")){
        //     return;
        // }

        console.log($(e).closest("tr").attr("class"));
        if($(".purcItemInfo").length > 1){
            $("#item" + regPay.global.itemIndex).remove();
            regPay.global.itemIndex--;
        }
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

    purcDataSet : function(){
        regPay.global.searchAjaxData = {
            purcSn : $("#purcSn").val()
        }

        var result = customKendo.fn_customAjax("/purc/getPurcReq.do", regPay.global.searchAjaxData);
        if(result.flag){
            console.log(result);
            var data = result.data;
            $("#docNo").text(data.DOC_NO);
            $("#purcReqDate").val(data.PURC_REQ_DATE);
            $("#purcReqEmpSeq").val(data.PURC_REQ_EMP_SEQ);
            $("#purcReqEmpName").text(data.EMP_NAME_KR);
            $("#purcReqDeptSeq").val(data.DEPT_SEQ);
            $("#purcReqDeptName").text(data.DEPT_NAME);
            $("#purcReqPurpose").val(data.PURC_REQ_PURPOSE);
            $("#purcType").data("kendoRadioGroup").value(data.PURC_TYPE);

            if($("input[name='purcType']:checked").val() != ""){
                $("#project").css("display", "");
                $("#pjtSn").val(data.PJT_SN);
                $("#pjtNm").val(data.PJT_NM);
            } else {
                $("#project").css("display", "none");
            }

            if(data.estFile != null){
                $("#file1Sn").val(data.estFile.file_no);
                $("#file1Name").text(data.estFile.file_org_name + "." + data.estFile.file_ext);
            }

            if(data.reqFile != null){
                $("#file2Sn").val(data.reqFile.file_no);
                $("#file2Name").text(data.reqFile.file_org_name + "." + data.reqFile.file_ext);
            }


            regPay.purcItemDataSet(data);

            regPay.purcBtnSet(data);
        }
    },

    purcItemDataSet : function(e){
        var data = e;
        var e = e.itemList;
        var totalPay = 0;
        for(var i = 0; i < e.length; i++){
            if(i != 0){
                regPay.addRow();
            }

            $("#item" + i).find("#purcItemSn" + i).val(e[i].PURC_ITEM_SN);
            $("#item" + i).find("#purcItemType" + i).data("kendoDropDownList").value(e[i].PURC_ITEM_TYPE);
            if(e[i].PRODUCT_A != null){
                $("#item" + i).find("#productA" + i).data("kendoDropDownList").value(e[i].PRODUCT_A);
                $("#productA" + i).trigger("change");
            }
            if(e[i].PRODUCT_B != null){
                $("#item" + i).find("#productB" + i).data("kendoDropDownList").value(e[i].PRODUCT_B);
                $("#productB" + i).trigger("change");
            }
            if(e[i].PRODUCT_C != null){
                $("#item" + i).find("#productC" + i).data("kendoDropDownList").value(e[i].PRODUCT_C);
            }
            $("#item" + i).find("#purcItemName" + i).val(e[i].PURC_ITEM_NAME);
            $("#item" + i).find("#purcItemStd" + i).val(e[i].PURC_ITEM_STD);
            $("#item" + i).find("#purcItemUnitPrice" + i).val(comma(e[i].PURC_ITEM_UNIT_PRICE));
            $("#item" + i).find("#purcItemQty" + i).val(e[i].PURC_ITEM_QTY);
            $("#item" + i).find("#purcItemUnit" + i).val(e[i].PURC_ITEM_UNIT);
            $("#item" + i).find("#purcItemAmt" + i).val(comma(e[i].PURC_ITEM_AMT));
            $("#item" + i).find("#crmSn" + i).val(e[i].CRM_SN);
            $("#item" + i).find("#crmNm" + i).val(e[i].CRM_NM);
            $("#item" + i).find("#rmk" + i).val(e[i].CERT_CONTENT);
            if(e[i].STATUS == "R"){
                $("#item" + i).find("#retBtn" + i).css("display", "none");
                $("#item" + i).find("#itemStatus" + i).append("<div style='margin-left:9px; color:red'>반려</div>");
                $("#item" + i).find("#check" + i).css("display", "none");
            } else {
                totalPay += Number(e[i].PURC_ITEM_AMT);
            }
            $("#item" + i).find("#retBtn" + i).val(e[i].CERT_CONTENT);
        }

        if(data.DOC_ID != "" && data.DOC_ID != null){
            $("#totalPay").css("display", "");
            $("#totalPay").text("총 금액 : " + comma(totalPay));
            $("#addBtn").css("display", "none");
        }
    },

    purcBtnSet : function(purcMap){
        let buttonHtml = "";
        if(purcMap != null){
            if(purcMap.DOC_STATUS == "0"){
                buttonHtml += '<button type="button" id="saveBtn" style="margin-right: 5px;" class="k-button k-button-solid-info" onclick="regPay.setPurcReq()">저장</button>';
                buttonHtml += '<button type="button" id="reqBtn" style="margin-right: 5px;" class="k-button k-button-solid-info" onclick="regPay.purcDrafting()">상신</button>';
            }else if(purcMap.DOC_STATUS == "10"){
                buttonHtml += '<button type="button" id="reqCancelBtn" style="margin-right: 5px;" class="k-button k-button-solid-error" onclick="docApprovalRetrieve(\''+purcMap.DOC_ID+'\', \''+purcMap.APPRO_KEY+'\', 1, \'retrieve\');">회수</button>';
            }else if(purcMap.DOC_STATUS == "30" || purcMap.DOC_STATUS == "40"){
                buttonHtml += '<button type="button" id="saveBtn" style="margin-right: 5px;" class="k-button k-button-solid-info" onclick="regPay.setPurcReq()">저장</button>';
                buttonHtml += '<button type="button" id="reReqBtn" style="margin-right: 5px;" class="k-button k-button-solid-error" onclick="tempOrReDraftingPop(\''+purcMap.DOC_ID+'\', \''+purcMap.DOC_MENU_CD+'\', \''+purcMap.APPRO_KEY+'\', 2, \'reDrafting\');">재상신</button>';
            }else if(purcMap.DOC_STATUS == "100"){
                buttonHtml += '<button type="button" id="viewBtn" style="margin-right: 5px;" class="k-button k-button-solid-base" onclick="approveDocView(\''+purcMap.DOC_ID+'\', \''+purcMap.APPRO_KEY+'\', \''+purcMap.DOC_MENU_CD+'\');">열람</button>';
            }else{
                buttonHtml += '<button type="button" id="saveBtn" style="margin-right: 5px;" class="k-button k-button-solid-info" onclick="regPay.setPurcReq()">저장</button>';
            }
        }else{
            buttonHtml += '<button type="button" id="saveBtn" style="margin-right:5px; margin-bottom: 10px;" class="k-button k-button-solid-info" onclick="regPay.setPurcReq()">저장</button>';
        }
        buttonHtml += '<button type="button" class="k-button k-button-solid-error" onclick="window.close()">닫기</button>';

        $("#purcBtnDiv").html(buttonHtml);
    },

    fileChange : function(e){
        $(e).next().text($(e)[0].files[0].name);
    },

    inputNumberFormat : function (obj){
        obj.value = regPay.comma(regPay.uncomma(obj.value));
    },

    comma: function(str) {
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    },

    uncomma: function(str) {
        str = String(str);
        return str.replace(/[^\d]+/g, '');
    },

    purcDrafting: function() {
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

        var url = "/project/pop/projectView.do";

        var name = "_blank";
        var option = "width = 1100, height = 400, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    fn_retItem: function (idx) {

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

        var url = "/purc/pop/reqClaiming.do?purcSn="+ $("#purcSn").val();

        var name = "_blank";
        var option = "width = 1500, height = 840, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);

        window.close();
    },

    fn_budgetPop: function (){
        if($("#pjtSn").val() == ""){
            alert("사업을 선택해주세요.");
            return ;
        }


        var url = "/mng/pop/budgetView.do?pjtSn=" + $("#pjtSn").val();

        var name = "_blank";
        var option = "width = 1100, height = 400, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);

    }
}