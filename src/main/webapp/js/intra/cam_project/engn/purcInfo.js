var purcInfo = {

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

    fn_defaultScript : function(){
        customKendo.fn_datePicker("purcReqDate", "month", "yyyy-MM-dd", new Date());
        customKendo.fn_textBox(["purcReqPurpose", "purcItemName0", "purcItemStd0", "purcItemUnitPrice0",
            "purcItemQty0", "purcItemUnit0", "purcItemAmt0", "crmNm0", "rmk0"]);

        purcInfo.global.radioGroupData = [
            { label: "R&D", value: "R" },
            { label: "비R&D", value: "S" },
            { label: "엔지니어링", value: "D" },
            { label: "용역/기타", value: "V" },
        ]
        customKendo.fn_radioGroup("purcType", purcInfo.global.radioGroupData, "horizontal");

        purcInfo.global.dropDownDataSource = [
            { text: "구매", value: "1"},
        ]


        let productsDataSource = customKendo.fn_customAjax("/system/commonCodeManagement/getCmCodeList", {cmGroupCodeId: "38"});
        customKendo.fn_dropDownList("purcItemType0", productsDataSource, "CM_CODE_NM", "CM_CODE", 2);

        let productADataSource = customKendo.fn_customAjax("/projectMng/getProductCodeInfo", {productGroupCodeId: 1}).list;
        customKendo.fn_dropDownList("productA0", productADataSource, "PRODUCT_DT_CODE_NM", "PRODUCT_DT_CODE", 2);

        $("#productA0").bind("change", function(){
            if($("#productA0").data("kendoDropDownList").value() == ""){
                return;
            }
            $("#productB0").val("");
            let data = {
                productGroupCodeId: 2,
                parentCodeId: $("#productA0").data("kendoDropDownList").value(),
                parentCodeName: $("#productA0").data("kendoDropDownList").text(),
            }
            let productBDataSource = customKendo.fn_customAjax("/projectMng/getProductCodeInfo", data).list;
            customKendo.fn_dropDownList("productB0", productBDataSource, "PRODUCT_DT_CODE_NM", "PRODUCT_DT_CODE", 2);
        });

        $("#productB0").bind("change", function(){
            if($("#productB0").data("kendoDropDownList").value() == ""){
                return;
            }
            $("#productC0").val("");
            let data = {
                productGroupCodeId: 3,
                parentCodeId: $("#productB0").data("kendoDropDownList").value(),
                parentCodeName: $("#productB0").data("kendoDropDownList").text(),
            }
            let productCDataSource = customKendo.fn_customAjax("/projectMng/getProductCodeInfo", data).list;
            customKendo.fn_dropDownList("productC0", productCDataSource, "PRODUCT_DT_CODE_NM", "PRODUCT_DT_CODE", 2);
        });

        $("#purcCrmSn, #purcCrmNm").change(function(){
            purcInfo.crmInfoChange();
        });
        // if($("#purcSn").val()){
        //     purcInfo.purcDataSet();
        // }
    },

    setPurcReq : function(e){
        var formData = new FormData()
        formData.append("purcSn", $("#purcSn").val());
        formData.append("menuCd", "manage");
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

        let flag = true;
        $.each($(".purcItemInfo"), function(i, v){
            /** 구매구분 값 제대로 입력 했는지 체크 */
            try{
                if($("#purcItemType" + i).data("kendoDropDownList").value == ""
                    || $("#purcItemType" + i).data("kendoDropDownList").value == null
                    || $("#productA" + i).data("kendoDropDownList").value == ""
                    || $("#productA" + i).data("kendoDropDownList").value == null
                    || $("#productB" + i).data("kendoDropDownList").value == ""
                    || $("#productB" + i).data("kendoDropDownList").value == null
                    || $("#productC" + i).data("kendoDropDownList").value == ""
                    || $("#productC" + i).data("kendoDropDownList").value == null){

                    alert("구매구분이 올바르게 선택되지 않았습니다."); flag = false;
                }
            }catch{
                alert("구매구분이 올바르게 선택되지 않았습니다."); flag = false;
            }
        });
        if(flag){
            return;
        }

        $.each($(".purcItemInfo"), function(i, v){
            var data = {
                purcItemSn : $(this).find("#purcItemSn" + i).val(),
                purcItemType : $("#purcItemType" + i).data("kendoDropDownList").value(),
                purcItemTypeName : $("#purcItemType" + i).data("kendoDropDownList").text(),
                productA : $("#productA" + i).data("kendoDropDownList").value(),
                productAName : $("#productA" + i).data("kendoDropDownList").text(),
                productB : $("#productB" + i).data("kendoDropDownList").value(),
                productBName : $("#productB" + i).data("kendoDropDownList").text(),
                productC : $("#productC" + i).data("kendoDropDownList").value(),
                productCName : $("#productC" + i).data("kendoDropDownList").text(),
                purcItemName : $("#purcItemName" + i).val(),
                purcItemStd : $("#purcItemStd" + i).val(),
                purcItemUnitPrice : $("#purcItemUnitPrice" + i).val(),
                purcItemQty : $("#purcItemQty" + i).val(),
                purcItemUnit : $("#purcItemUnit" + i).val(),
                purcItemAmt : prp.uncomma($("#purcItemAmt" + i).val()),
                crmSn : $("#crmSn" + i).val(),
                rmk : $("#rmk" + i).val(),
                status : e,
                empSeq : $("#empSeq").val(),
            }

            itemArr.push(data);
        })

        formData.append("itemArr", JSON.stringify(itemArr))

        var result = customKendo.fn_customFormDataAjax("/manage/setPurcReq.do", formData);
        if(result.flag){
            alert("저장되었습니다.");

        }
    },


    addRow : function(){
        purcInfo.global.createHtmlStr = "";

        purcInfo.global.itemIndex++

        purcInfo.global.createHtmlStr = "" +
            '<tr class="purcItemInfo newArray" id="item' + purcInfo.global.itemIndex + '">' +
            '   <td>' +
            '       <input type="hidden" id="purcItemSn' + purcInfo.global.itemIndex + '" class="purcItemSn">' +
            '       <input type="text" id="purcItemType' + purcInfo.global.itemIndex + '" class="purcItemType" style="width: 24%">' +
            '       <input type="text" id="productA' + purcInfo.global.itemIndex + '" class="productA" style="width: 24%">' +
            '       <input type="text" id="productB' + purcInfo.global.itemIndex + '" class="productB" style="width: 24%; display: none">' +
            '       <input type="text" id="productC' + purcInfo.global.itemIndex + '" class="productC" style="width: 24%; display: none">' +
            '   </td>' +
            '   <td>' +
            '       <input type="text" id="purcItemName' + purcInfo.global.itemIndex + '" class="purcItemName">' +
            '   </td>' +
            '   <td>' +
            '       <input type="text" id="purcItemStd' + purcInfo.global.itemIndex + '" class="purcItemStd">' +
            '   </td>' +
            '   <td>' +
            '       <input type="text" id="purcItemUnitPrice' + purcInfo.global.itemIndex + '" class="purcItemUnitPrice" onkeydown="return onlyNumber(this)" onkeyup="removeChar(this);">' +
            '   </td>' +
            '   <td>' +
            '       <input type="text" id="purcItemQty' + purcInfo.global.itemIndex + '" class="purcItemQty" onkeydown="return onlyNumber(this)" onkeyup="removeChar(this);">' +
            '   </td>' +
            '   <td>' +
            '       <input type="text" id="purcItemUnit' + purcInfo.global.itemIndex + '" class="purcItemUnit">' +
            '   </td>' +
            '   <td>' +
            '       <input type="text" id="purcItemAmt' + purcInfo.global.itemIndex + '" class="purcItemAmt"  onkeyup="purcInfo.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" style="text-align: right">' +
            '   </td>' +
            '   <td>' +
            '       <input type="hidden" id="crmSn' + purcInfo.global.itemIndex + '" class="crmSn">' +
            '       <input type="text" id="crmNm' + purcInfo.global.itemIndex + '" class="crmNm" style="width: 60%">' +
            '       <button type="button" id="crmSelBtn' + purcInfo.global.itemIndex + '" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" class="crmSelBtn" onclick="purcInfo.fn_popCamCrmList(\'crmSn' + purcInfo.global.itemIndex + '\',\'crmNm' + purcInfo.global.itemIndex + '\');">업체 선택</button>' +
            '   </td>' +
            '   <td>' +
            '       <input type="text" id="rmk' + purcInfo.global.itemIndex + '" class="rmk">' +
            '   </td>' +
            '   <td></td>' +
            '   <td>' +
            '       <button type="button" id="delRowBtn' + purcInfo.global.itemIndex + '" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="purcInfo.delRow(this)">삭제</button>' +
            '   </td>' +
            '</tr>';

        $("#purcItemTb").append(purcInfo.global.createHtmlStr);


        let productsDataSource = customKendo.fn_customAjax("/system/commonCodeManagement/getCmCodeList", {cmGroupCodeId : "38"});
        customKendo.fn_dropDownList("purcItemType" + purcInfo.global.itemIndex, productsDataSource, "CM_CODE_NM", "CM_CODE", 2);

        let productADataSource = customKendo.fn_customAjax("/projectMng/getProductCodeInfo", {productGroupCodeId: 1}).list;
        customKendo.fn_dropDownList("productA" + purcInfo.global.itemIndex, productADataSource, "PRODUCT_DT_CODE_NM", "PRODUCT_DT_CODE", 2);

        $("#productA" + purcInfo.global.itemIndex).bind("change", function(){
            if($("#productA" + purcInfo.global.itemIndex).data("kendoDropDownList").value() == ""){
                return;
            }
            $("#productB" + purcInfo.global.itemIndex).val("");
            let data = {
                productGroupCodeId: 2,
                parentCodeId: $("#productA" + purcInfo.global.itemIndex).data("kendoDropDownList").value(),
                parentCodeName: $("#productA" + purcInfo.global.itemIndex).data("kendoDropDownList").text(),
            }
            let productBDataSource = customKendo.fn_customAjax("/projectMng/getProductCodeInfo", data).list;
            customKendo.fn_dropDownList("productB" + purcInfo.global.itemIndex, productBDataSource, "PRODUCT_DT_CODE_NM", "PRODUCT_DT_CODE", 2);
        });

        $("#productB" + purcInfo.global.itemIndex).bind("change", function(){
            if($("#productB" + purcInfo.global.itemIndex).data("kendoDropDownList").value() == ""){
                return;
            }
            $("#productC" + purcInfo.global.itemIndex).val("");
            let data = {
                productGroupCodeId: 3,
                parentCodeId: $("#productB" + purcInfo.global.itemIndex).data("kendoDropDownList").value(),
                parentCodeName: $("#productB" + purcInfo.global.itemIndex).data("kendoDropDownList").text(),
            }
            let productCDataSource = customKendo.fn_customAjax("/projectMng/getProductCodeInfo", data).list;
            customKendo.fn_dropDownList("productC" + purcInfo.global.itemIndex, productCDataSource, "PRODUCT_DT_CODE_NM", "PRODUCT_DT_CODE", 2);
        });

        customKendo.fn_textBox(["purcItemName" + purcInfo.global.itemIndex, "purcItemStd" + purcInfo.global.itemIndex,
            "purcItemUnitPrice" + purcInfo.global.itemIndex, "purcItemQty" + purcInfo.global.itemIndex,
            "purcItemUnit" + purcInfo.global.itemIndex, "purcItemAmt" + purcInfo.global.itemIndex,
            "crmNm" + purcInfo.global.itemIndex, "rmk" + purcInfo.global.itemIndex])

    },

    delRow : function(e){
        console.log($("." + $(e).closest("tr").attr("class")));
        if(confirm("삭제하시겠습니까?")){
            if($(".purcItemInfo").length > 1){
                console.log($(e).closest("tr"));

                $(e).closest("tr").remove();
                purcInfo.global.itemIndex--;
            }
        }
    },

    fn_popCamCrmList : function (crmSnId, crmNmId){
        purcInfo.global.crmSnId = crmSnId;
        purcInfo.global.crmNmId = crmNmId;


        var url = "/crm/pop/popCrmList.do";
        var name = "_blank";
        var option = "width = 1300, height = 670, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    crmInfoChange : function(){
        console.log(purcInfo.global.crmSnId, purcInfo.global.crmNmId)

        $("#" + purcInfo.global.crmSnId).val($("#purcCrmSn").val())
        $("#" + purcInfo.global.crmNmId).val($("#purcCrmNm").val())

        $("#purcCrmSn").val("")
        $("#purcCrmNm").val("")


    },

    fileChange : function(e){
        $(e).next().text($(e)[0].files[0].name);
    },

    inputNumberFormat : function (obj){
        obj.value = purcInfo.comma(purcInfo.uncomma(obj.value));
    },

    comma: function(str) {
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    },

    uncomma: function(str) {
        str = String(str);
        return str.replace(/[^\d]+/g, '');
    },
}