var popOutput = {
    global : {
        dropDownDataSource : "",
        createHtmlStr : "",
        searchAjaxData : "",
        saveAjaxData : "",
    },

    fn_defaultScript: function (){
        popOutput.setMakeTable();
    },

    setMakeTable : function() {
        popOutput.global.searchAjaxData = {
            bomSn : $("#bomSn").val(),
        }

        var result = customKendo.fn_customAjax("/item/getBomDetailList.do", popOutput.global.searchAjaxData);
        if(result.flag){
            var list = result.list;

            $("#outputTb tr").remove();
            if(list.length > 0){
                for(var i = 0; i < list.length; i++){
                    popOutput.global.createHtmlStr = "";

                    popOutput.global.createHtmlStr = "" +
                        '<tr class="outputDetail" id="detail' + i + '">' +
                            '<td style="text-align: center" id="num' + i + '">' +
                                '<input type="hidden" id="masterSn' + i + '" value="' + list[i].MASTER_SN + '">' +
                                '<input type="hidden" id="reqQty' + i + '" value="' + list[i].REQ_QTY + '">' +
                                '<input type="hidden" id="safetyInven' + i + '" value="' + list[i].SAFETY_INVEN + '">' + (i+1) +
                            '</td>' +
                            '<td id="itemNoTr' + i + '">' + list[i].ITEM_NO +'</td>' +
                            '<td id="itemNameTr' + i + '">' + list[i].ITEM_NAME +'</td>' +
                            '<td id="unitPriceTr' + i + '" style="text-align: right">' + popOutput.comma(list[i].UNIT_PRICE) +'</td>' +
                            '<td id="reqQtyTr' + i + '" style="text-align: right">' + popOutput.comma(list[i].REQ_QTY) + '</td>' +
                            '<td id="safetyInvenTr' + i + '" style="text-align: right">' + popOutput.comma(list[i].SAFETY_INVEN) + '</td>' +
                            '<td id="materialWhCdTr' + i + '">' +
                                '<input type="text" id="whCd' + i + '">' +
                            '</td>' +
                            '<td id="rmk' + i + '">' + list[i].RMK +'</td>' +
                        '</tr>';

                    $("#outputTb").append(popOutput.global.createHtmlStr);

                    customKendo.fn_dropDownList("whCd" + i, list[i].whCdList, "WH_CD_NM", "WH_CD", 3);
                }
            }
        }
    },

    setOutput : function(){
        if(confirm("생산하시겠습니까?")){

            var detailArr = new Array()
            $.each($(".outputDetail"), function(i, v){
                var data = {
                    masterSn : $(this).find("#masterSn" + i).val(),
                    reqQty : $(this).find("#reqQty" + i).val(),
                    safetyInven : $(this).find("#safetyInven" + i).val(),
                    whCd : $(this).find("#whCd" + i).val(),
                    empSeq : $("#empSeq").val()
                }

                detailArr.push(data);
            })

            popOutput.global.saveAjaxData = {
                bomSn : $("#bomSn").val(),
                empSeq : $("#empSeq").val(),
                outputCnt : $("#outputCnt").val(),
                masterSn : $("#masterSn").val(),
                whCd : $("#whCd").val(),
                bomUnitPrice : $("#bomUnitPrice").val(),
                detailArr : JSON.stringify(detailArr)
            }

            var result = customKendo.fn_customAjax("/item/setOutput.do", popOutput.global.saveAjaxData);
            if(result.flag){
                alert("처리되었습니다.");
                opener.po.gridReload();
                window.close();
            }
        }
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