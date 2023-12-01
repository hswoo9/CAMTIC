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
        event : ""
    },

    fn_defaultScript : function (){
        customKendo.fn_datePicker("purcReqDate", "month", "yyyy-MM-dd", new Date());
        customKendo.fn_textBox(["purcReqPurpose", "purcItemName0", "purcItemStd0", "purcItemUnitPrice0",
            "purcItemQty0", "purcItemUnit0", "purcItemAmt0", "crmNm0", "rmk0", "pjtNm", "allCrmNm"]);

        prp.global.radioGroupData = [
            { label: "법인운영", value: "" },
            { label: "R&D", value: "R" },
            { label: "비R&D", value: "S" },
            { label: "엔지니어링", value: "D" },
            { label: "용역/기타", value: "V" },
        ]
        customKendo.fn_radioGroup("purcType", prp.global.radioGroupData, "horizontal");

        $("input[name='purcType']").click(function(){
            if($("input[name='purcType']:checked").val() != ""){
                $("#project").css("display", "");
            } else {
                $("#project").css("display", "none");
                $("#pjtSn").val("");
                $("#pjtNm").val("");
            }
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
            prp.purcDataSet();
            $("#excelUploadBtn").css("display", "none");
        }

        $("#checkAll").click(function(){
            if($("#checkAll").is(":checked")){
                $(".childCheck").prop("checked", true);
            } else {
                $(".childCheck").prop("checked", false);
            }
        });
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
        formData.append("status", e);
        formData.append("empSeq", $("#purcReqEmpSeq").val());

        if($("#checkProfit").prop("checked")){
            formData.append("checkProfit", "Y");
        } else {
            formData.append("checkProfit", "N");
        }

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
                purcItemUnitPrice : prp.uncomma($("#purcItemUnitPrice" + i).val()),
                purcItemQty : $("#purcItemQty" + i).val(),
                purcItemUnit : $("#purcItemUnit" + i).val(),
                purcItemAmt : prp.uncomma($("#purcItemAmt" + i).val()),
                crmSn : $("#crmSn" + i).val(),
                rmk : $("#rmk" + i).val(),
                status : e,
                empSeq : $("#purcReqEmpSeq").val(),
            }

            if(data.productA == ""){
                flag = false;
            }

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

        prp.global.itemIndex++

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
                    '<input type="text" id="purcItemUnitPrice' + prp.global.itemIndex + '" class="purcItemUnitPrice" onkeyup="prp.fn_calc('+prp.global.itemIndex+', this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" style="text-align: right">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="purcItemQty' + prp.global.itemIndex + '" class="purcItemQty" onkeyup="prp.fn_calc('+prp.global.itemIndex+', this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" style="text-align: right">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="purcItemUnit' + prp.global.itemIndex + '" class="purcItemUnit">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="purcItemAmt' + prp.global.itemIndex + '" class="purcItemAmt" disabled onkeyup="prp.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" style="text-align: right">' +
                '</td>' +
                '<td>' +
                    '<input type="hidden" id="crmSn' + prp.global.itemIndex + '" class="crmSn">' +
                    '<input type="text" id="crmNm' + prp.global.itemIndex + '" disabled class="crmNm" style="width: 60%"> ' +
                    '<button type="button" id="crmSelBtn' + prp.global.itemIndex + '" class="crmSelBtn k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="prp.fn_popCamCrmList(\'crmSn' + prp.global.itemIndex + '\',\'crmNm' + prp.global.itemIndex + '\');">업체선택</button>' +
                '</td>' +
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
                '   <button type="button" id="delRowBtn' + prp.global.itemIndex + '" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="prp.delRow(this)">삭제</button>' +
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
                                "purcItemUnitPrice" + prp.global.itemIndex, "purcItemQty" + prp.global.itemIndex,
                                "purcItemUnit" + prp.global.itemIndex, "purcItemAmt" + prp.global.itemIndex,
                                "crmNm" + prp.global.itemIndex, "rmk" + prp.global.itemIndex]);

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

    fn_calc : function (idx, e){
        $("#purcItemAmt" + idx).val(comma(Number(uncomma($("#purcItemUnitPrice" + idx).val())) * Number(uncomma($("#purcItemQty" + idx).val()))));

        return inputNumberFormat(e);
    },

    delRow : function(e){
        // if(!confirm("삭제하시겠습니까?")){
        //     return;
        // }

        if($(".purcItemInfo").length > 1){
            $("#item" + prp.global.itemIndex).remove();
            prp.global.itemIndex--;
        }
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

            if(data.estFile != null){
                $("#file1Sn").val(data.estFile.file_no);
                $("#file1Name").text(data.estFile.file_org_name + "." + data.estFile.file_ext);
            }

            if(data.reqFile != null){
                $("#file2Sn").val(data.reqFile.file_no);
                $("#file2Name").text(data.reqFile.file_org_name + "." + data.reqFile.file_ext);
            }


            prp.purcItemDataSet(data);

            prp.purcBtnSet(data);
        }
    },

    purcItemDataSet : function(e){
        var data = e;
        var e = e.itemList;
        console.log(e);
        var totalPay = 0;
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
            $("#allModViewBtn").css("display", "none");
            $("#addBtn").css("display", "none");
        }
    },

    purcBtnSet : function(purcMap){
        let buttonHtml = "";
        if(purcMap != null){
            if(purcMap.DOC_STATUS == "0"){
                buttonHtml += '<button type="button" id="saveBtn" style="margin-right: 5px;" class="k-button k-button-solid-info" onclick="prp.setPurcReq()">저장</button>';
                buttonHtml += '<button type="button" id="reqBtn" style="margin-right: 5px;" class="k-button k-button-solid-info" onclick="prp.purcDrafting()">상신</button>';
            }else if(purcMap.DOC_STATUS == "10"){
                buttonHtml += '<button type="button" id="reqCancelBtn" style="margin-right: 5px;" class="k-button k-button-solid-error" onclick="docApprovalRetrieve(\''+purcMap.DOC_ID+'\', \''+purcMap.APPRO_KEY+'\', 1, \'retrieve\');">회수</button>';
            }else if(purcMap.DOC_STATUS == "30" || purcMap.DOC_STATUS == "40"){
                buttonHtml += '<button type="button" id="saveBtn" style="margin-right: 5px;" class="k-button k-button-solid-info" onclick="prp.setPurcReq()">저장</button>';
                buttonHtml += '<button type="button" id="reReqBtn" style="margin-right: 5px;" class="k-button k-button-solid-error" onclick="tempOrReDraftingPop(\''+purcMap.DOC_ID+'\', \''+purcMap.DOC_MENU_CD+'\', \''+purcMap.APPRO_KEY+'\', 2, \'reDrafting\');">재상신</button>';
            }else if(purcMap.DOC_STATUS == "100"){
                if(purcMap.PAY_YN == "N" && purcMap.INSPECT_STATUS == "100"){
                    buttonHtml += '<button type="button" id="payBtn" style="margin-right: 5px;" class="k-button k-button-solid-info" onclick="prp.fn_reqRegPopup(\''+purcMap.CLAIM_SN+'\')">지급신청서 작성</button>';
                }
                buttonHtml += '<button type="button" id="viewBtn" style="margin-right: 5px;" class="k-button k-button-solid-base" onclick="approveDocView(\''+purcMap.DOC_ID+'\', \''+purcMap.APPRO_KEY+'\', \''+purcMap.DOC_MENU_CD+'\');">열람</button>';
            }else{
                buttonHtml += '<button type="button" id="saveBtn" style="margin-right: 5px;" class="k-button k-button-solid-info" onclick="prp.setPurcReq()">저장</button>';
            }
        }else{
            buttonHtml += '<button type="button" id="saveBtn" style="margin-right:5px; margin-bottom: 10px;" class="k-button k-button-solid-info" onclick="prp.setPurcReq()">저장</button>';
        }
        buttonHtml += '<button type="button" class="k-button k-button-solid-error" onclick="window.close()">닫기</button>';

        $("#purcBtnDiv").html(buttonHtml);
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

    purcDrafting: function(){
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
        var option = "width = 1100, height = 400, top = 100, left = 400, location = no"
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
        $("#purcItemTb").find("input:checkbox").each(function(){
            if($(this).is(":checked")){
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
        var url = "/purc/pop/reqClaiming.do?purcSn="+ $("#purcSn").val();

        if(itemSn != ""){
            itemSn = itemSn.substring(0, itemSn.length - 1);
            url += "&itemSn=" + itemSn;
        }

        var name = "_blank";
        var option = "width = 1500, height = 840, top = 100, left = 400, location = no"
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

    fn_reqRegPopup : function(key){

        var data = {
            claimSn : key
        }

        var result = customKendo.fn_customAjax("/purc/getPurcClaimData", data);
        var rs = result.data;

        if(rs.PAY_APP_SN != "" && rs.PAY_APP_SN != null && rs.PAY_APP_SN != undefined){
            var url = "/payApp/pop/regPayAppPop.do?payAppSn=" + rs.PAY_APP_SN + "&status=rev&auth=user";
            var name = "blank";
            var option = "width = 1700, height = 820, top = 100, left = 400, location = no"
            var popup = window.open(url, name, option);

        } else {
            var url = "/payApp/pop/regPayAppPop.do";
            if(key != null && key != ""){
                url = "/payApp/pop/regPayAppPop.do?claimSn=" + key + "&reqType=purc";
            }
            var name = "blank";
            var option = "width = 1700, height = 820, top = 100, left = 400, location = no"
            var popup = window.open(url, name, option);
        }
    },

    fn_excelUpload : function(){
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


                for(var i = 0 ; i < rowdata.length ; i++){
                    $("#purcItemType" + index).data("kendoDropDownList").text(rowdata[index]['구분']);
                    $("#productA" + index).data("kendoDropDownList").text(rowdata[index]['대분류']);
                    $("#productA" + index).trigger("change");

                    if(rowdata[index]['중분류'] != undefined && rowdata[index]['중분류'] != null && rowdata[index]['중분류'] != ""){
                        $("#productB" + index).data("kendoDropDownList").text(rowdata[index]['중분류']);
                        $("#productB" + index).trigger("change");

                        $("#productC" + index).data("kendoDropDownList").text(rowdata[index]['소분류']);
                    }

                    $("#purcItemName" + index).val(rowdata[index]['품명']);
                    $("#purcItemStd" + index).val(rowdata[index]['규격']);
                    $("#purcItemUnitPrice" + index).val(comma(rowdata[index]['단가']));
                    $("#purcItemQty" + index).val(rowdata[index]['수량']);
                    $("#purcItemUnit" + index).val(rowdata[index]['단위']);
                    $("#purcItemAmt" + index).val(comma(rowdata[index]['금액']));
                    $("#rmk" + index).val(rowdata[index]['비고']);

                    var data = {
                        excelCrmNm : rowdata[index]['업체명'],
                        excelCrmNo : rowdata[index]['사업자번호'].replace(/-/g, '')
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

            });
            $("#delRowBtn" + index).click();

        };
        reader.readAsBinaryString(input.files[0]);

        $('#excelUpload').data('kendoWindow').close();
    }
}