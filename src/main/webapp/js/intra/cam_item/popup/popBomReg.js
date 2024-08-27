var bomReg = {

    global : {
        createHtmlStr : "",
        bomDetailIndex : 0,
        dropDownDataSource : "",
        searchAjaxData : "",
        saveAjaxData : "",
        chkList : [],
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
            var flag = true;

            $("#bomDetailTb").find("tr").each(function(){
                if($(this).find(".itemNo").val() == ""){
                    bomReg.delRow($(this), "save");
                }
            });

            $.each($(".bomDetail"), function(i, v){
                if($(this).find("#masterSn" + i).val()){
                    if(!$(this).find("#masterBomSn" + i).val()){
                        if($("#masterBomSn" + i).data("kendoDropDownList").dataSource.data().length != 0){
                            flag = false;
                        }
                    }

                    var arrData = {
                        bomDetailSn : $(this).find("#bomDetailSn" + i).val(),
                        masterSn : $(this).find("#masterSn" + i).val(),
                        masterBomSn : $(this).find("#masterBomSn" + i).val(),
                        reqQty : $(this).find("#reqQty" + i).val(),
                        rmk : $(this).find("#rmk" + i).val(),
                        empSeq : $("#empSeq").val()
                    }

                    detailArr.push(arrData);
                }

                if(!flag){
                    alert("입력하지 않은 항목이 있습니다.");
                    return flag;
                }
            })

            if(!flag){
                return flag;
            }

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
                    '<input type="text" id="masterBomSn' + bomReg.global.bomDetailIndex + '" class="masterBomSn k-input k-textbox" disabled>' +
                '</td>' +
                '<td>' +
                    '<input type="hidden" id="bomDetailSn' + bomReg.global.bomDetailIndex + '" class="bomDetailSn">' +
                    '<input type="hidden" id="masterSn' + bomReg.global.bomDetailIndex + '" class="masterSn">' +
                    '<input type="text" id="itemNo' + bomReg.global.bomDetailIndex + '" class="itemNo k-input k-textbox" readonly style="width: 100%">' +
                    // '<button type="button" id="itemSelBtn' + bomReg.global.bomDetailIndex + '" class="itemSelBtn k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onClick="bomReg.fn_popItemNoList(' + bomReg.global.bomDetailIndex + ');">선택</button>' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="itemName' + bomReg.global.bomDetailIndex + '" class="itemName k-input k-textbox" readonly>' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="itemCdName' + bomReg.global.bomDetailIndex + '" class="itemCdName k-input k-textbox" readonly>' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="unitPrice' + bomReg.global.bomDetailIndex + '" class="unitPrice k-input k-textbox numberInput" style="text-align: right" readonly onchange="bomReg.costPriceChange(' + bomReg.global.bomDetailIndex + ')">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="reqQty' + bomReg.global.bomDetailIndex + '" class="reqQty numberInput" style="text-align: right" onkeyup="bomReg.costPriceChange(' + bomReg.global.bomDetailIndex + ')" value="0">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="totPrice' + bomReg.global.bomDetailIndex + '" class="totPrice numberInput" readonly style="text-align: right" value="0">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="rmk' + bomReg.global.bomDetailIndex + '" class="rmk">' +
                '</td>' +
                '<td>' +
                    '<button type="button" id="delRowBtn' + bomReg.global.bomDetailIndex + '" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="bomReg.delRow(this)">X</button>' +
                '</td>' +
            '</tr>';

        $("#bomDetailTb").append(bomReg.global.createHtmlStr);

        customKendo.fn_textBox(["reqQty" + bomReg.global.bomDetailIndex, "totPrice" + bomReg.global.bomDetailIndex, "rmk" + bomReg.global.bomDetailIndex])

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

    delRow : function(e, f){
        let key = $(e).closest("tr").find(".masterSn").val();

        if($("#bomDetailTb").find("tr").length == 1){
            return;
        }
        if($("#itemNo" + $(e).closest("tr").attr("id").split("detail")[1]).val() == ""){
            return;
        }

        if(f == "save") {
            $(e).closest("tr").remove();
            bomReg.global.bomDetailIndex--;

            for(var i = 0; i < bomReg.global.chkList.length; i++){
                if (bomReg.global.chkList[i] == key) {
                    bomReg.global.chkList.splice(i, 1);
                    i--;
                }
            }
        } else {
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

                    for(var i = 0; i < bomReg.global.chkList.length; i++){
                        if (bomReg.global.chkList[i] == key) {
                            bomReg.global.chkList.splice(i, 1);
                            i--;
                        }
                    }
                }
            }else{
                $(e).closest("tr").remove();
                bomReg.global.bomDetailIndex--;

                for(var i = 0; i < bomReg.global.chkList.length; i++){
                    if (bomReg.global.chkList[i] == key) {
                        bomReg.global.chkList.splice(i, 1);
                        i--;
                    }
                }
            }

        }

        bomReg.rowAttrOverride();
        bomReg.costPriceChange();
    },

    rowAttrOverride : function(){
        $.each($(".bomDetail"), function(i, v){
            $(this).attr("id", "detail" + i);
            $(this).find("input.masterBomSn").attr("id", "masterBomSn" + i);
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
            $(this).find("input.totPrice").attr("id", "totPrice" + i);
            $(this).find("input.rmk").attr("id", "rmk" + i);
        })
    },


    bomDataSet : function(){
        bomReg.global.searchAjaxData = {
            bomSn : $("#bomSn").val()
        }

        var result = customKendo.fn_customAjax("/item/getBom.do", bomReg.global.searchAjaxData);
        console.log(result)
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
            $("#detail" + i).find("#unitPrice" + i).val(bomReg.comma(e[i].UNIT_PRICE_A));
            $("#detail" + i).find("#reqQty" + i).val(e[i].REQ_QTY)
            $("#detail" + i).find("#rmk" + i).val(e[i].RMK);
            $("#detail" + i).find("#itemCdName" + i).val(e[i].ITEM_TYPE_NM);

            bomReg.global.searchAjaxData = {
                masterSn : e[i].MASTER_SN
            }

            var result = customKendo.fn_customAjax("/item/getBomList.do", bomReg.global.searchAjaxData);
            if(result.flag){
                if(result.list.length > 1){
                    $("#masterBomSn" + i).removeAttr("disabled");
                    customKendo.fn_dropDownList("masterBomSn" + i, result.list, "BOM_TITLE", "BOM_SN", 2);
                    $("#masterBomSn" + i).data("kendoDropDownList").enable(true);
                }else{
                    customKendo.fn_dropDownList("masterBomSn" + i, result.list, "BOM_TITLE", "BOM_SN", 3);
                    $("#masterBomSn" + i).data("kendoDropDownList").enable(false);
                }
                $("#masterBomSn" + i).data("kendoDropDownList").value(e[i].MASTER_BOM_SN)
            }
        }

        bomReg.costPriceChange();

        if(i != e.length) {
            bomReg.addRow();
        }
    },

    itemInfoChange : function(){
        if(bomReg.global.masterSnIndex != "999" || $("#itemType").val() != "MA"){
            $("#masterSn" + bomReg.global.masterSnIndex).val($("#masterSn").val())
            $("#itemNo" + bomReg.global.masterSnIndex).val($("#itemNo").val())
            $("#itemName" + bomReg.global.masterSnIndex).val($("#itemName").val())
            $("#itemCdName" + bomReg.global.masterSnIndex).val($("#itemCdName").val())
            $("#whCdNm" + bomReg.global.masterSnIndex).val($("#whCdNm").val())
            $("#standard" + bomReg.global.masterSnIndex).val($("#standard").val())
            $("#itemType" + bomReg.global.masterSnIndex).val($("#itemType").val())
            $("#unitPrice" + bomReg.global.masterSnIndex).val(bomReg.comma($("#maxUnitPrice").val()))
            $("#unitPrice" + bomReg.global.masterSnIndex).change()


            if(bomReg.global.masterSnIndex != "999"){
                bomReg.global.searchAjaxData = {
                    masterSn : $("#masterSn" + bomReg.global.masterSnIndex).val()
                }

                var result = customKendo.fn_customAjax("/item/getBomList.do", bomReg.global.searchAjaxData);
                if(result.flag){
                    if(result.list.length > 1){
                        $("#masterBomSn" + bomReg.global.masterSnIndex).removeAttr("disabled");
                        customKendo.fn_dropDownList("masterBomSn" + bomReg.global.masterSnIndex, result.list, "BOM_TITLE", "BOM_SN", 2);
                        $("#masterBomSn" + bomReg.global.masterSnIndex).data("kendoDropDownList").enable(true);
                    }else{
                        customKendo.fn_dropDownList("masterBomSn" + bomReg.global.masterSnIndex, result.list, "BOM_TITLE", "BOM_SN", 3);
                        $("#masterBomSn" + bomReg.global.masterSnIndex).data("kendoDropDownList").enable(false);
                    }
                }
            }
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

    costPriceChange : function(idx){
        var sum = 0;
        var amt = 0;
        $.each($("#bomDetailTb .unitPrice"), function(){
            sum += Number(bomReg.uncomma($(this).val())) * Number(bomReg.uncomma($(this).closest("tr").find("input.reqQty").val()));
        })

        amt = Number(bomReg.uncomma($("#unitPrice" + idx).val())) * Number(bomReg.uncomma($("#reqQty" + idx).val()));

        $("#totPrice" + idx).val(bomReg.comma(amt));
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