var bomReg = {

    global : {
        createHtmlStr : "",
        bomDetailIndex : 0,
        dropDownDataSource : "",
        searchAjaxData : "",
        saveAjaxData : "",
    },

    fn_defaultScript : function (){
        customKendo.fn_textBox(["bomTitle", "bomCostPrice", "bomUnitPrice"]);

        if($("#bomSn").val()){
            bomReg.bomDataSet();
        }else{
            bomReg.addRow();
        }
    },

    setBomReq : function(){
        if(!$("#bomTitle").val()){
            alert("BOM명을 입력해주세요.");
            $("#bomTitle").focus()
            return;
        }else if(!$("#masterSn999").val()){
            alert("품번을 선택해주세요.");
            return;
        }else if(!$("#bomUnitPrice").val()){
            alert("표준단가를 입력해주세요.");
            $("#bomUnitPrice").focus()
            return;
        }

        if(confirm("등록하시겠습니까?")){
            var detailArr = new Array();
            $.each($(".bomDetail"), function(i, v){
                if($(this).find("#masterSn" + i).val()){
                    var arrData = {
                        bomDetailSn : $(this).find("#bomDetailSn" + i).val(),
                        masterSn : $(this).find("#masterSn" + i).val(),
                        reqQty : $(this).find("#reqQty" + i).val(),
                        rmk : $(this).find("#rmk" + i).val(),
                        empSeq : $("#empSeq").val()
                    }

                    detailArr.push(arrData);
                }
            })

            bomReg.global.saveAjaxData = {
                bomSn : $("#bomSn").val(),
                bomTitle : $("#bomTitle").val(),
                masterSn : $("#masterSn999").val(),
                bomCostPrice : bomReg.uncomma($("#bomCostPrice").val()),
                bomUnitPrice : bomReg.uncomma($("#bomUnitPrice").val()),
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
                    '<input type="hidden" id="masterSn' + bomReg.global.bomDetailIndex + '" class="masterSn">' +
                    '<input type="text" id="itemNo' + bomReg.global.bomDetailIndex + '" class="itemNo k-input k-textbox" readonly onClick="bomReg.fn_popItemNoList(' + bomReg.global.bomDetailIndex + ');" style="width: 75%">' +
                    '<button type="button" id="itemSelBtn' + bomReg.global.bomDetailIndex + '" class="itemSelBtn k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onClick="bomReg.fn_popItemNoList(' + bomReg.global.bomDetailIndex + ');">선택</button>' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="itemName' + bomReg.global.bomDetailIndex + '" class="itemName k-input k-textbox" readonly onClick="bomReg.fn_popItemNoList(' + bomReg.global.bomDetailIndex + ');">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="unitPrice' + bomReg.global.bomDetailIndex + '" class="unitPrice k-input k-textbox numberInput" style="text-align: right" readonly onClick="bomReg.fn_popItemNoList(' + bomReg.global.bomDetailIndex + ');" onchange="bomReg.costPriceChange()">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="reqQty' + bomReg.global.bomDetailIndex + '" class="reqQty numberInput" style="text-align: right" onkeyup="bomReg.costPriceChange()" value="0">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="rmk' + bomReg.global.bomDetailIndex + '" class="rmk">' +
                '</td>' +
                '<td>' +
                    '<button type="button" id="delRowBtn' + bomReg.global.bomDetailIndex + '" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="bomReg.delRow(this)">X</button>' +
                '</td>' +
            '</tr>';

        $("#bomDetailTb").append(bomReg.global.createHtmlStr);

        customKendo.fn_textBox(["reqQty" + bomReg.global.bomDetailIndex, "rmk" + bomReg.global.bomDetailIndex])

        $(".numberInput").keyup(function(){
            $(this).val(bomReg.comma(bomReg.uncomma($(this).val())));
        });

        bomReg.global.bomDetailIndex++
    },

    fn_popItemNoList : function (masterSnIndex){
        bomReg.global.masterSnIndex = masterSnIndex;

        if(masterSnIndex != 999 && !$("#itemType999").val()){
            alert("BOM 품목을 선택해주세요.");
            return
        }

        var url = "/item/pop/popItemNoList.do";
        /*if(masterSnIndex != 999){
            url += "?itemType=" + $("#itemType999").val()
        }*/
        var name = "_blank";
        var option = "width = 1300, height = 670, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    delRow : function(e){
        if($(e).closest("tr").find("input.bomDetailSn").val()){
            if(confirm("삭제하시겠습니까?\n삭제한 데이터는 복구 할 수 없습니다.")){
                bomReg.global.saveAjaxData = {
                    bomDetailSn : $(e).closest("tr").find("input.bomDetailSn").val()
                }

                var result = customKendo.fn_customAjax("/item/setBomDetailDel.do", bomReg.global.saveAjaxData);
                if(result.flag){
                    $(e).closest("tr").remove();
                    bomReg.global.bomDetailIndex--;
                }
            }
        }else{
            $(e).closest("tr").remove();
            bomReg.global.bomDetailIndex--;
        }

        bomReg.rowAttrOverride();
        bomReg.costPriceChange();
    },

    rowAttrOverride : function(){
        $.each($(".bomDetail"), function(i, v){
            $(this).attr("id", "detail" + i);
            $(this).find("input.bomDetailSn").attr("id", "bomDetailSn" + i);
            $(this).find("input.masterSn").attr("id", "masterSn" + i);
            $(this).find("input.itemNo").attr("id", "itemNo" + i);
            $(this).find("input.itemNo").attr("onClick", "bomReg.fn_popItemNoList(" + i + ")");
            $(this).find(".itemSelBtn").attr("id", "itemSelBtn" + i);
            $(this).find(".itemSelBtn").attr("onClick", "bomReg.fn_popItemNoList(" + i + ")");
            $(this).find("input.itemName").attr("id", "itemName" + i);
            $(this).find("input.itemName").attr("onClick", "bomReg.fn_popItemNoList(" + i + ")");
            $(this).find("input.unitPrice").attr("id", "unitPrice" + i);
            $(this).find("input.unitPrice").attr("onClick", "bomReg.fn_popItemNoList(" + i + ")");
            $(this).find("input.reqQty").attr("id", "reqQty" + i);
            $(this).find("input.rmk").attr("id", "rmk" + i);
        })
    },


    bomDataSet : function(){
        bomReg.global.searchAjaxData = {
            bomSn : $("#bomSn").val()
        }

        var result = customKendo.fn_customAjax("/item/getBom.do", bomReg.global.searchAjaxData);
        if(result.flag){
            var bom = result.bom;
            $("#bomTitle").val(bom.BOM_TITLE);
            $("#masterSn999").val(bom.MASTER_SN);
            $("#itemNo999").val(bom.ITEM_NO);
            $("#itemName999").val(bom.ITEM_NAME);
            $("#whCdNm999").val(bom.WH_CD_NM);
            $("#standard999").val(bom.STANDARD);
            $("#itemType999").val(bom.ITEM_TYPE);
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
            $("#detail" + i).find("#masterSn" + i).val(e[i].MASTER_SN)
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
        if(bomReg.global.masterSnIndex != "999" || $("#itemType").val() != "MA"){
            $("#masterSn" + bomReg.global.masterSnIndex).val($("#masterSn").val())
            $("#itemNo" + bomReg.global.masterSnIndex).val($("#itemNo").val())
            $("#itemName" + bomReg.global.masterSnIndex).val($("#itemName").val())
            $("#whCdNm" + bomReg.global.masterSnIndex).val($("#whCdNm").val())
            $("#standard" + bomReg.global.masterSnIndex).val($("#standard").val())
            $("#itemType" + bomReg.global.masterSnIndex).val($("#itemType").val())
            $("#unitPrice" + bomReg.global.masterSnIndex).val(bomReg.comma($("#maxUnitPrice").val()))
            $("#unitPrice" + bomReg.global.masterSnIndex).change()
        }else{
            alert("원자재는 BOM을 등록하실 수 없습니다.");
        }

        $("#masterSn").val("")
        $("#itemNo").val("")
        $("#itemName").val("")
        $("#maxUnitPrice").val("")
        $("#whCdNm").val("")
        $("#standard").val("")
        $("#itemType").val("")
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