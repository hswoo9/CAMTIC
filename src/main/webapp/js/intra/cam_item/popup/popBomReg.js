var bomReg = {

    global : {
        createHtmlStr : "",
        bomDetailIndex : 0,
        dropDownDataSource : "",
        searchAjaxData : "",
        saveAjaxData : "",
    },

    fn_defaultScript : function (){
        bomReg.global.dropDownDataSource = customKendo.fn_customAjax("/item/smCodeList", {grpSn : "WC", lgCd : "WH"});
        customKendo.fn_dropDownList("bomWhCd", bomReg.global.dropDownDataSource, "ITEM_CD_NM", "ITEM_CD", 2);

        customKendo.fn_textBox(["bomNo", "bomName", "standard", "bomCostPrice", "bomUnitPrice"]);

        if($("#bomSn").val()){
            bomReg.bomDataSet();
        }else{
            bomReg.addRow();
        }
    },

    setBomReq : function(){
        if(!$("#bomNo").val()){
            alert("품번을 입력해주세요.");
            $("#bomNo").focus()
            return;
        }else if(!$("#bomName").val()){
            alert("품명을 입력해주세요.");
            $("#bomName").focus()
            return;
        }else if(!$("#bomUnitPrice").val()){
            alert("표준단가를 입력해주세요.");
            $("#bomUnitPrice").focus()
            return;
        }

        if(confirm("등록하시겠습니까?")){
            var detailArr = new Array();
            $.each($(".bomDetail"), function(i, v){
                if($(this).find("#invenSn" + i).val()){
                    var arrData = {
                        bomDetailSn : $(this).find("#bomDetailSn" + i).val(),
                        invenSn : $(this).find("#invenSn" + i).val(),
                        reqQty : $(this).find("#reqQty" + i).val(),
                        rmk : $(this).find("#rmk" + i).val(),
                        empSeq : $("#empSeq").val()
                    }

                    detailArr.push(arrData);
                }
            })

            bomReg.global.saveAjaxData = {
                bomSn : $("#bomSn").val(),
                bomNo : $("#bomNo").val(),
                bomName : $("#bomName").val(),
                standard : $("#standard").val(),
                bomCostPrice : bomReg.uncomma($("#bomCostPrice").val()),
                bomUnitPrice : bomReg.uncomma($("#bomUnitPrice").val()),
                bomWhCd : $("#bomWhCd").val(),
                empSeq : $("#empSeq").val(),
                detailArr : JSON.stringify(detailArr)
            }

            var result = customKendo.fn_customAjax("/item/setBom.do", bomReg.global.saveAjaxData);
            if(result.flag){
                alert("저장되었습니다.");
                opener.bomRegList.gridReload();
                window.close();
            }
        }
    },

    addRow : function(){
        bomReg.global.createHtmlStr = "";

        bomReg.global.createHtmlStr = "" +
            '<tr class="bomDetail" id="detail' + bomReg.global.bomDetailIndex + '">' +
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
                    '<input type="text" id="unitPrice' + bomReg.global.bomDetailIndex + '" class="unitPrice k-input k-textbox numberInput" style="text-align: right" readonly onClick="bomReg.fn_popCamItemList(' + bomReg.global.bomDetailIndex + ');" onchange="bomReg.costPriceChange()">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="reqQty' + bomReg.global.bomDetailIndex + '" class="reqQty numberInput" style="text-align: right" onkeyup="bomReg.costPriceChange()">' +
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

        bomReg.global.bomDetailIndex++
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

        var result = customKendo.fn_customAjax("/item/getBom.do", bomReg.global.searchAjaxData);
        if(result.flag){
            var bom = result.bom;
            $("#bomNo").val(bom.BOM_NO);
            $("#bomName").val(bom.BOM_NAME);
            $("#bomWhCd").data("kendoDropDownList").value(bom.BOM_WH_CD);
            $("#standard").val(bom.STANDARD);
            $("#bomCostPrice").val(bomReg.comma(bom.BOM_COST_PRICE));
            $("#bomUnitPrice").val(bomReg.comma(bom.BOM_UNIT_PRICE));

            bomReg.setBomDetailMakeTable(result.bomDetail);
        }
    },

    setBomDetailMakeTable : function(e) {
        $("#bomDetailTb tr").remove();

        for(var i = 0; i < e.length; i++){
            bomReg.addRow();
            $("#detail" + i).find("#bomDetailSn" + i).val(e[i].BOM_DETAIL_SN)
            $("#detail" + i).find("#invenSn" + i).val(e[i].INVEN_SN)
            $("#detail" + i).find("#itemNo" + i).val(e[i].ITEM_NO)
            $("#detail" + i).find("#itemName" + i).val(e[i].ITEM_NAME)
            $("#detail" + i).find("#unitPrice" + i).val(bomReg.comma(e[i].UNIT_PRICE));
            $("#detail" + i).find("#reqQty" + i).val(e[i].REQ_QTY)
            $("#detail" + i).find("#rmk" + i).val(e[i].RMK);
        }

        bomReg.costPriceChange();

        bomReg.addRow();
    },

    itemInfoChange : function(){
        $("#invenSn" + bomReg.global.invenSnIndex).val($("#invenSn").val())
        $("#itemNo" + bomReg.global.invenSnIndex).val($("#itemNo").val())
        $("#itemName" + bomReg.global.invenSnIndex).val($("#itemName").val())
        $("#unitPrice" + bomReg.global.invenSnIndex).val(bomReg.comma($("#unitPrice").val()))
        $("#unitPrice" + bomReg.global.invenSnIndex).change()

        $("#invenSn").val("")
        $("#itemNo").val("")
        $("#itemName").val("")
        $("#whCd").val("")
        $("#whCdNm").val("")
        $("#unitPrice").val("")
    },

    costPriceChange : function(){
        var sum = 0;
        $.each($("#bomDetailTb .unitPrice"), function(){
            sum += Number(bomReg.uncomma($(this).val())) * Number(bomReg.uncomma($(this).closest("tr").find("input.reqQty").val()))
        })

        $("#bomCostPrice").val(bomReg.comma(sum));
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