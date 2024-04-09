var pri = {
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
    },

    fn_defaultScript: function(){
        this.fn_pageSet();
        this.purcDataSet();
    },

    fn_pageSet: function(){
        customKendo.fn_textBox(["purcItemName0", "purcItemStd0", "purcItemUnitPrice0",
            "purcItemQty0", "purcItemUnit0", "purcItemAmt0", "crmNm0", "rmk0", "pjtNm"]);

        pri.global.radioGroupData = [
            { label: "법인운영", value: "" },
            { label: "R&D", value: "R" },
            { label: "비R&D", value: "S" },
            { label: "엔지니어링", value: "D" },
            { label: "용역/기타", value: "V" },
        ]
        customKendo.fn_radioGroup("purcType", pri.global.radioGroupData, "horizontal");

        $("input[name='purcType']").click(function(){
            if($("input[name='purcType']:checked").val() != ""){
                $("#project").css("display", "");
            } else {
                $("#project").css("display", "none");
                $("#pjtSn").val("");
                $("#pjtNm").val("");
            }
        });

        pri.global.dropDownDataSource = [
            { text: "구매", value: "1"},
        ]

        let productsDataSource = customKendo.fn_customAjax("/system/commonCodeManagement/getCmCodeList", {cmGroupCodeId: "38"});
        customKendo.fn_dropDownList("purcItemType0", productsDataSource, "CM_CODE_NM", "CM_CODE", 2);

        let productADataSource = customKendo.fn_customAjax("/projectMng/getProductCodeInfo", {productGroupCodeId: 1}).list;
        customKendo.fn_dropDownList("productA0", productADataSource, "PRODUCT_DT_CODE_NM", "PRODUCT_DT_CODE", 2);


        $(".productA").each(function(){
            var productId = $(this).attr("id");

            if(productId != null){
                pri.fn_productCodeSetting(productId);
            }
        });

        $("#purcCrmSn, #purcCrmNm").change(function(){
            pri.crmInfoChange();
        });

        if($("#pjtSn").val() != ""){
            $("#purcType").data("kendoRadioGroup").value($("#busnClass").val());
            $("input[name='purcType']").trigger("click");
            $("#purcType").data("kendoRadioGroup").enable(false);
            $("#pjtSelBtn").prop("disabled", true);
            $("#pjtNm").prop("disabled", true);
        }

        customKendo.fn_datePicker("inspectDt", 'month', "yyyy-MM-dd", new Date());
        $("#inspectDt").attr("readonly", true);

        if($("#mode").val() == "mng"){
        }else{
            // $("#inspectBtn").hide();
        }
    },
    
    purcDataSet : function(){
        if($("#purcSn").val() == ""){ return; }

        pri.global.searchAjaxData = {
            purcSn : $("#purcSn").val()
        }

        var result = customKendo.fn_customAjax("/purc/getPurcReq.do", pri.global.searchAjaxData);
        if(result.flag){
            console.log(result);
            var data = result.data;
            $("#docNo").text(data.DOC_NO);
            $("#purcReqDate").text(data.PURC_REQ_DATE);
            $("#purcReqEmpSeq").val(data.PURC_REQ_EMP_SEQ);
            $("#purcReqEmpName").text(data.EMP_NAME_KR);
            $("#purcReqDeptSeq").val(data.DEPT_SEQ);
            $("#purcReqDeptName").text(data.DEPT_NAME);
            $("#purcReqPurpose").text(data.PURC_REQ_PURPOSE);
            $("#purcType").data("kendoRadioGroup").value(data.PURC_TYPE);
            $("#inspectEmpName").text(data.INSPECT_EMP_NAME);

            if($("#mode").val() == "mng"){
                $("#inspectDtTd").html("<div id='INSPECT_DT_MNG' style='margin-top: 3px'>"+data.INSPECT_DT+"</div>");
                $("#file1Label").hide();
            }else{
                if(data.INSPECT_DT != null){
                    $("#inspectDt").val(data.INSPECT_DT);
                }
            }

            if($("input[name='purcType']:checked").val() != ""){
                $("#project").css("display", "");
                $("#pjtSn").val(data.PJT_SN);
                $("#pjtNm").val(data.PJT_NM);
            } else {
                $("#project").css("display", "none");
            }

            console.log(data.inspectFile);
            if(data.PAYMENT_METHOD == "C"){
                if(data.purcFile != null){
                    console.log(data.purcFile)

                    for(var i = 0; i < data.purcFile.length; i++){
                        pri.global.fileArray.push(data.purcFile[i]);
                    }
                    pri.settingTempFileDataInit(data.purcFile);
                }
            } else {
                if(data.inspectFile.length != 0){
                    for(var i = 0; i < data.inspectFile.length; i++){
                        pri.global.fileArray.push(data.inspectFile[i]);
                    }
                    pri.settingTempFileDataInit(data.inspectFile);
                }
            }


            if(data.INSPECT_STATUS == "100"){
                // $("#saveBtn").hide();
                $("#inspectBtn").hide();
            }

            pri.purcItemDataSet(data);
        }
    },

    purcItemDataSet: function(e){
        var data = e;
        var e = e.itemList;
        var totalPay = 0;
        for(var i = 0; i < e.length; i++){
            if(i != 0){
                pri.addRow();
            }

            console.log(e[i]);
            $("#item" + i).find("#purcItemSn" + i).val(e[i].PURC_ITEM_SN);
            $("#item" + i).find("#purcItemType" + i).data("kendoDropDownList").value(e[i].PURC_ITEM_TYPE);
            if(e[i].PRODUCT_A != null){
                $("#item" + i).find("#productA" + i).data("kendoDropDownList").value(e[i].PRODUCT_A);

                if(e[i].PRODUCT_A == "3"){
                    $("#productA" + i).trigger("change");
                    if(e[i].PRODUCT_B != null){
                        $("#item" + i).find("#productB" + i).data("kendoDropDownList").value(e[i].PRODUCT_B);
                        $("#productB" + i).trigger("change");
                    }
                    if(e[i].PRODUCT_C != null){
                        $("#item" + i).find("#productC" + i).data("kendoDropDownList").value(e[i].PRODUCT_C);
                    }
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

            if(e[i].STATUS == 'R'){
                $("#item" + i).remove();
            }
        }

        if(data.DOC_ID != "" && data.DOC_ID != null){
            $("#totalPay").css("display", "");
            $("#totalPay").text("총 금액 : " + comma(totalPay));
            $("#addBtn").css("display", "none");
        }
    },

    fileChange : function(e){
        $(e).next().text($(e)[0].files[0].name);
    },

    inputNumberFormat : function (obj){
        obj.value = pri.comma(pri.uncomma(obj.value));
    },

    comma: function(str) {
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    },

    uncomma: function(str) {
        str = String(str);
        return str.replace(/[^\d]+/g, '');
    },

    addRow : function(){
        pri.global.createHtmlStr = "";

        pri.global.itemIndex++

        pri.global.createHtmlStr = "" +
            '<tr class="purcItemInfo newArray" id="item' + pri.global.itemIndex + '">';
        pri.global.createHtmlStr += '' +
            '<td>' +
            '   <input type="hidden" id="purcItemSn' + pri.global.itemIndex + '" name="purcItemSn0" class="purcItemSn">' +
            '   <input type="text" id="purcItemType' + pri.global.itemIndex + '" class="purcItemType" style="width: 110px">' +
            '   <input type="text" id="productA' + pri.global.itemIndex + '" class="productA" style="width: 110px">' +
            '   <input type="text" id="productB' + pri.global.itemIndex + '" class="productB" style="width: 110px; display: none">' +
            '   <input type="text" id="productC' + pri.global.itemIndex + '" class="productC" style="width: 110px; display: none">' +
            '</td>' +
            '<td>' +
            '<input type="text" id="purcItemName' + pri.global.itemIndex + '" class="purcItemName">' +
            '</td>' +
            '<td>' +
            '<input type="text" id="purcItemStd' + pri.global.itemIndex + '" class="purcItemStd">' +
            '</td>' +
            '<td>' +
            '<input type="text" id="purcItemUnitPrice' + pri.global.itemIndex + '" class="purcItemUnitPrice" onkeyup="pri.fn_calc('+pri.global.itemIndex+', this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" style="text-align: right">' +
            '</td>' +
            '<td>' +
            '<input type="text" id="purcItemQty' + pri.global.itemIndex + '" class="purcItemQty" onkeyup="pri.fn_calc('+pri.global.itemIndex+', this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" style="text-align: right">' +
            '</td>' +
            '<td>' +
            '<input type="text" id="purcItemUnit' + pri.global.itemIndex + '" class="purcItemUnit">' +
            '</td>' +
            '<td>' +
            '<input type="text" id="purcItemAmt' + pri.global.itemIndex + '" class="purcItemAmt" disabled onkeyup="pri.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" style="text-align: right">' +
            '</td>' +
            '<td>' +
            '<input type="hidden" id="crmSn' + pri.global.itemIndex + '" class="crmSn">' +
            '<input type="text" id="crmNm' + pri.global.itemIndex + '" disabled class="crmNm" style="width: 60%"> ' +
            '<button type="button" id="crmSelBtn' + pri.global.itemIndex + '" class="crmSelBtn k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="pri.fn_popCamCrmList(\'crmSn' + pri.global.itemIndex + '\',\'crmNm' + pri.global.itemIndex + '\');">업체선택</button>' +
            '</td>' +
            '<td>' +
            '<input type="text" id="rmk' + pri.global.itemIndex + '" class="rmk">' +
            '</td>';
        pri.global.createHtmlStr += '' +
            '</tr>';



        $("#purcItemTb").append(pri.global.createHtmlStr);

        pri.global.dropDownDataSource = [
            { text: "구매", value: "1"},
        ]
        customKendo.fn_dropDownList("purcItemType" + pri.global.itemIndex, pri.global.dropDownDataSource, "text", "value", 2);

        customKendo.fn_textBox(["purcItemName" + pri.global.itemIndex, "purcItemStd" + pri.global.itemIndex,
            "purcItemUnitPrice" + pri.global.itemIndex, "purcItemQty" + pri.global.itemIndex,
            "purcItemUnit" + pri.global.itemIndex, "purcItemAmt" + pri.global.itemIndex,
            "crmNm" + pri.global.itemIndex, "rmk" + pri.global.itemIndex]);

        let productsDataSource = customKendo.fn_customAjax("/system/commonCodeManagement/getCmCodeList", {cmGroupCodeId: "38"});
        customKendo.fn_dropDownList("purcItemType" + pri.global.itemIndex, productsDataSource, "CM_CODE_NM", "CM_CODE", 2);


        let productADataSource = customKendo.fn_customAjax("/projectMng/getProductCodeInfo", {productGroupCodeId: 1}).list;
        customKendo.fn_dropDownList("productA" + pri.global.itemIndex, productADataSource, "PRODUCT_DT_CODE_NM", "PRODUCT_DT_CODE", 2);


        $(".productA").each(function (){

            var productId = $(this).attr("id");

            if(productId != null){
                pri.fn_productCodeSetting(productId);
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

    fn_popCamCrmList : function (crmSnId, crmNmId){
        prp.global.crmSnId = crmSnId;
        prp.global.crmNmId = crmNmId;

        var url = "/crm/pop/popCrmList.do";
        var name = "_blank";
        var option = "width = 1300, height = 670, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    crmInfoChange : function(){
        $("#" + prp.global.crmSnId).val($("#crmSn").val());
        $("#" + prp.global.crmNmId).val($("#crmNm").val());

        $("#crmSn").val("");
        $("#crmNm").val("");
    },

    setPurcReq : function(e){
        var formData = new FormData()
        formData.append("purcSn", $("#purcSn").val());
        formData.append("inspectEmpName", $("#purcReqEmpName").text());
        formData.append("inspectDt", $("#inspectDt").val() == undefined ? $("#INSPECT_DT_MNG").text() : $("#inspectDt").val());
        formData.append("menuCd", "inspect");
        formData.append("empSeq", $("#purcReqEmpName").text());

        /** 증빙파일 첨부파일 */
        if(fCommon.global.attFiles != null){
            for(var i = 0; i < fCommon.global.attFiles.length; i++){
                formData.append("file1", fCommon.global.attFiles[i]);
            }
        }

        if($("#inspectDt").val() == ""){ alert("검수날짜가 작성되지 않았습니다"); return; }

        var result = customKendo.fn_customFormDataAjax("/purc/updPurcInspect.do", formData);
        if(result.flag){
            if(fCommon.global.attFiles.length != 0){
                pri.setInspectApp('100');
            } else {
                alert("저장되었습니다.");
            }
            try {
                opener.parent.prm.gridReload();
            }catch{

            }
            location.reload();
        }
    },

    setInspectApp : function(status){
        var formData = new FormData()
        formData.append("purcSn", $("#purcSn").val())
        formData.append("status", "100");

        var result = customKendo.fn_customFormDataAjax("/purc/updPurcInspectStat.do", formData);
        if(result.flag){
            alert("검수처리가 완료되었습니다.");
            opener.parent.purcClaim.gridReload();
            window.close();
        }
    },

    /** 첨부파일 데이터 세팅 */
    settingTempFileDataInit: function(e){
        var html = '';
        if(e.length > 0){
            for(var i = 0; i < e.length; i++){
                html += '<tr style="text-align: center">';
                html += '   <td><span style="cursor: pointer" onclick="fileDown(\''+e[i].file_path+e[i].file_uuid+'\', \''+e[i].file_org_name+'.'+e[i].file_ext+'\')">'+e[i].file_org_name+'</span></td>';
                html += '   <td>'+ e[i].file_ext +'</td>';
                html += '   <td>'+ fCommon.bytesToKB(e[i].file_size) +'</td>';
                html += '   <td>';
                if(e[i].file_ext.toLowerCase() == "png" || e[i].file_ext.toLowerCase() == "pdf" || e[i].file_ext.toLowerCase() == "jpg" || e[i].file_ext.toLowerCase() == "jpeg"){
                    html += '       <button type="button" class="k-button k-rounded k-button-solid k-button-solid-base" onclick="pri.fileViewer(\''+e[i].file_path+e[i].file_uuid+'\', \''+e[i].file_org_name+'.'+e[i].file_ext+'\')">' +
                        '			    <span class="k-button-text">뷰어</span>' +
                        '		    </button>';
                }
                html += '   </td>';
                html += '   <td>';
                html += '       <button type="button" class="k-button k-rounded k-button-solid k-button-solid-error" onclick="fCommon.commonFileDel('+ e[i].file_no +', this)">' +
                    '			    <span class="k-button-text">삭제</span>' +
                    '		    </button>';
                html += '   </td>';
                html += '</tr>';
            }
            $("#fileGrid").html(html);
        }else{
            $("#fileGrid").html('<tr class="defultTr">' +
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

    addFileInfoTable : function (){
        let size = 0;
        // if($("input[name='fileList']")[0].files.length == 1){
        //     $("#fileGrid").html("");
        // }
        for(var i = 0; i < $("input[name='fileList']")[0].files.length; i++){
            fCommon.global.attFiles.push($("input[name='fileList']")[0].files[i]);
        }

        if(fCommon.global.attFiles.length > 0){
            $("#fileGrid").find(".defultTr").remove();
            $("#fileGrid").find(".addFile").remove();

            var html = '';
            for (var i = 0; i < fCommon.global.attFiles.length; i++) {
                size = fCommon.bytesToKB(fCommon.global.attFiles[i].size);
                html += '<tr style="text-align: center;padding-top: 10px;" class="addFile">';
                html += '   <td>' + fCommon.global.attFiles[i].name.substring(0, fCommon.global.attFiles[i].name.lastIndexOf(".")) + '</td>';
                html += '   <td>' + fCommon.global.attFiles[i].name.substring(fCommon.global.attFiles[i].name.lastIndexOf(".")+1) + '</td>';
                html += '   <td>' + size + '</td>';
                html += '   <td>';
                html += '   </td>';
                html += '   <td>';
                html += '       <input type="button" value="삭제" class="k-button k-rounded k-button-solid k-button-solid-error" onclick="pri.fnUploadFile(' + i + ')">'
                html += '   </td>';
                html += '</tr>';
            }

            $("#fileGrid").append(html);
        }
    },

    fnUploadFile : function(e) {
        let size = 0;
        const dataTransfer = new DataTransfer();
        let fileArray = Array.from(fCommon.global.attFiles);
        fileArray.splice(e, 1);
        fileArray.forEach(file => {
            dataTransfer.items.add(file);
        });

        fCommon.global.attFiles = dataTransfer.files;

        if(fCommon.global.attFiles.length > 0){
            $("#fileGrid").find(".addFile").remove();

            var html = '';
            for (var i = 0; i <fCommon.global.attFiles.length; i++) {
                size = fCommon.bytesToKB(fCommon.global.attFiles[i].size);
                html += '<tr style="text-align: center;" class="addFile">';
                html += '   <td>' + fCommon.global.attFiles[i].name.split(".")[0] + '</td>';
                html += '   <td>' + fCommon.global.attFiles[i].name.split(".")[1] + '</td>';
                html += '   <td>' + size + '</td>';
                html += '   <td>';
                html += '   </td>';
                html += '   <td>';
                html += '       <input type="button" value="삭제" class="k-button k-rounded k-button-solid k-button-solid-error" onclick="pri.fnUploadFile(' + i + ')">';
                html += '   </td>';
                html += '</tr>';
            }

            $("#fileGrid").append(html);
        }else{
            $("#fileGrid").find(".addFile").remove();

            if($("#fileGrid").find("tr").length == 0){
                $("#fileGrid").html('<tr class="defultTr">' +
                    '	<td colspan="5" style="text-align: center;padding-top: 10px;">선택된 파일이 없습니다.</td>' +
                    '</tr>');
            }
        }

        if(fCommon.global.attFiles.length == 0){
            fCommon.global.attFiles = new Array();
        }

    },
}