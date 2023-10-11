var bomReg = {

    global : {
        createHtmlStr : "",
        bomDetailIndex : 0,
        dropDownDataSource : "",
        searchAjaxData : "",
        saveAjaxData : "",
    },

    fn_defaultScript : function (){
        customKendo.fn_textBox(["bomNo", "bomName", "bomUnitPrice"]);

        if($("#bomSn").val()){
            bomReg.bomDataSet();
        }else{
            bomReg.addRow("new");
        }
    },

    setBomReq : function(e){
        var formData = new FormData()
        formData.append("bomSn", $("#bomSn").val());
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
        $.each($(".bomDetail"), function(i, v){
            var data = {
                purcItemSn : $(this).find("#purcItemSn" + i).val(),
                purcItemType : $("#purcItemType" + i).val(),
                purcItemName : $("#purcItemName" + i).val(),
                purcItemStd : $("#purcItemStd" + i).val(),
                purcItemUnitPrice : $("#purcItemUnitPrice" + i).val(),
                purcItemQty : $("#purcItemQty" + i).val(),
                purcItemUnit : $("#purcItemUnit" + i).val(),
                purcItemAmt : bomReg.uncomma($("#purcItemAmt" + i).val()),
                crmSn : $("#crmSn" + i).val(),
                rmk : $("#rmk" + i).val(),
                status : e,
                empSeq : $("#purcReqEmpSeq").val(),
            }

            itemArr.push(data);
        })

        formData.append("itemArr", JSON.stringify(itemArr))

        var result = customKendo.fn_customFormDataAjax("/manage/setPurcReq.do", formData);
        if(result.flag){
            alert("저장되었습니다.");
            opener.parent.prm.gridReload();
            window.close();
        }
    },

    addRow : function(e){
        bomReg.global.createHtmlStr = "";

        bomReg.global.bomDetailIndex++

        bomReg.global.createHtmlStr = "" +
            '<tr class="bomDetail ' + e + 'BomDetail" id="detail' + bomReg.global.bomDetailIndex + '">' +
                '<td>' +
                    '<input type="hidden" id="bomDetailSn' + bomReg.global.bomDetailIndex + '" class="bomDetailSn">' +
                    '<input type="hidden" id="invenSn' + bomReg.global.bomDetailIndex + '" class="invenSn">' +
                    '<input type="text" id="itemNo' + bomReg.global.bomDetailIndex + '" class="itemNo k-input k-textbox" readonly onClick="bomReg.fn_popCamItemList(' + bomReg.global.bomDetailIndex + ');" style="width: 75%">' +
                    '<button type="button" id="itemSelBtn' + bomReg.global.bomDetailIndex + '" class="itemSelBtn k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onClick="bomReg.fn_popCamItemList(' + bomReg.global.bomDetailIndex + ');">선택</button>' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="itemName' + bomReg.global.bomDetailIndex + '" class="itemName k-input k-textbox" readonly onClick="bomReg.fn_popCamItemList(' + bomReg.global.bomDetailIndex + ');">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="unitPrice' + bomReg.global.bomDetailIndex + '" class="unitPrice k-input k-textbox numberInput" style="text-align: right" readonly onClick="bomReg.fn_popCamItemList(' + bomReg.global.bomDetailIndex + ');">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="reqQty' + bomReg.global.bomDetailIndex + '" class="reqQty numberInput" style="text-align: right">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="rmk' + bomReg.global.bomDetailIndex + '" class="rmk">' +
                '</td>' +
                '<td>' +
                    '<button type="button" id="delRowBtn' + bomReg.global.bomDetailIndex + '" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="bomReg.delRow(this)">삭제</button>' +
                '</td>' +
            '</tr>';

        $("#bomDetailTb").append(bomReg.global.createHtmlStr);

        customKendo.fn_textBox(["reqQty" + bomReg.global.bomDetailIndex, "rmk" + bomReg.global.bomDetailIndex])

        $(".numberInput").keyup(function(){
            $(this).val(bomReg.comma(bomReg.uncomma($(this).val())));
        });
    },

    fn_popCamItemList : function (invenSnIndex){
        bomReg.global.invenSnIndex = invenSnIndex;

        var url = "/item/pop/popItemInvenList.do";
        var name = "_blank";
        var option = "width = 1300, height = 670, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
    },


    delRow : function(e){
        if(confirm("삭제하시겠습니까?")){
            if($("." + $(e).closest("tr").attr("class")).length > 1){
                $(e).closest("tr").remove();
                bomReg.global.bomDetailIndex--;
            }
        }
    },

    bomDataSet : function(){
        bomReg.global.searchAjaxData = {
            bomSn : $("#bomSn").val()
        }

        var result = customKendo.fn_customAjax("/item/getBomReq.do", bomReg.global.searchAjaxData);
        if(result.flag){
            var data = result.data;
            $("#purcReqDate").val(data.PURC_REQ_DATE);
            $("#purcReqEmpSeq").val(data.PURC_REQ_EMP_SEQ);
            $("#purcReqEmpName").text(data.EMP_NAME_KR);

            bomReg.setBomDetailMakeTable(data.bomDetailList);
        }
    },

    setBomDetailMakeTable : function(e) {
        $("#bomDetailTb tr").remove();

        if(e.length == 0){
            bomReg.addRow('new');
        }else{
            for(var i = 0; i < e.length; i++){
                bomReg.addRow('old');
                $("#cir" + i).find("#crmItemSn" + i).val(e[i].CRM_ITEM_SN)
                $("#cir" + i).find("#masterSn" + i).val(e[i].MASTER_SN)
                $("#cir" + i).find("#itemNo" + i).val(e[i].ITEM_NO)
                $("#cir" + i).find("#itemName" + i).val(e[i].ITEM_NAME)
                $("#cir" + i).find("#crmItemNo" + i).val(e[i].CRM_ITEM_NO)
                $("#cir" + i).find("#crmItemName" + i).val(e[i].CRM_ITEM_NAME)
                $("#cir" + i).find("#busClass" + i).val(e[i].BUS_CLASS);
                $("#cir" + i).find("#active" + i).val(e[i].ACTIVE);
            }

            bomReg.addRow('new');
        }
    },

    itemInfoChange : function(){
        $("#invenSn" + bomReg.global.invenSnIndex).val($("#invenSn").val())
        $("#itemNo" + bomReg.global.invenSnIndex).val($("#itemNo").val())
        $("#itemName" + bomReg.global.invenSnIndex).val($("#itemName").val())
        $("#unitPrice" + bomReg.global.invenSnIndex).val($("#unitPrice").val())

        $("#invenSn").val("")
        $("#itemNo").val("")
        $("#itemName").val("")
        $("#whCd").val("")
        $("#whCdNm").val("")
        $("#unitPrice").val("")
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