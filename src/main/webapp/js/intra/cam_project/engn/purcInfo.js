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
            { label: "법인운영", value: "1" },
            { label: "교육사업", value: "2" },
            { label: "일자리사업", value: "3" },
            { label: "기능보간", value: "4" },
            { label: "지원사업", value: "5" },
            { label: "협의회", value: "6" },
        ]
        customKendo.fn_radioGroup("purcType", purcInfo.global.radioGroupData, "horizontal");

        purcInfo.global.dropDownDataSource = [
            { text: "구매", value: "1"},
        ]

        customKendo.fn_dropDownList("purcItemType0", purcInfo.global.dropDownDataSource, "text", "value", 2);

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
        $.each($(".purcItemInfo"), function(i, v){
            var data = {
                purcItemSn : $(this).find("#purcItemSn" + i).val(),
                purcItemType : $("#purcItemType" + i).val(),
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
            '       <input type="text" id="purcItemType' + purcInfo.global.itemIndex + '" class="purcItemType">' +
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
            '       <input type="text" id="crmNm' + purcInfo.global.itemIndex + '" class="crmNm" style="width: 70%">' +
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

        purcInfo.global.dropDownDataSource = [
            { text: "구매", value: "1"},
        ]
        customKendo.fn_dropDownList("purcItemType" + purcInfo.global.itemIndex, purcInfo.global.dropDownDataSource, "text", "value", 2);

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