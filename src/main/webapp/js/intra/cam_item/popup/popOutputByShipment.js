var popOutputShipment = {
    global : {
        dropDownDataSource : "",
        createHtmlStr : "",
        searchAjaxData : "",
        saveAjaxData : "",
        smRecordSnArr : new Array(),
    },

    fn_defaultScript: function (){
        popOutputShipment.setMakeTable();
    },

    setMakeTable : function() {
        popOutputShipment.global.searchAjaxData = {
            itemSnList : $("#itemSnList").val(),
        }

        var result = customKendo.fn_customAjax("/item/getFwWhCdDesignList.do", popOutputShipment.global.searchAjaxData);
        if(result.flag){
            var list = result.list;
            var qtyList = new Array();

            $.each($("#qtyList").val().split("|"), function(){
                var data = {
                    masterSn : this.split(",")[0].split("_")[1],
                    reqQty : this.split(",")[1].split("_")[1]
                }
                qtyList.push(data)
            })

            $("#outputTb tr").remove();
            if(list.length > 0){
                for(var i = 0; i < list.length; i++){
                    popOutputShipment.global.createHtmlStr = "";

                    popOutputShipment.global.createHtmlStr = "" +
                        '<tr class="outputDetail" id="detail' + i + '">' +
                            '<td style="text-align: center" id="num' + i + '">' +
                                '<input type="hidden" id="masterSn' + i + '" value="' + list[i].MASTER_SN + '">' +
                                '<input type="hidden" id="reqQty' + i + '" value="' + qtyList.find(element => element.masterSn == list[i].MASTER_SN).reqQty + '">' +
                                '<input type="hidden" id="safetyInven' + i + '" value="' + list[i].SAFETY_INVEN + '">' + (i+1) +
                            '</td>' +
                            '<td id="itemNoTr' + i + '">' + list[i].ITEM_NO +'</td>' +
                            '<td id="itemNameTr' + i + '">' + list[i].ITEM_NAME +'</td>' +
                            '<td id="reqQtyTr' + i + '" style="text-align: right">' + popOutputShipment.comma(qtyList.find(element => element.masterSn == list[i].MASTER_SN).reqQty) + '</td>' +
                            '<td id="safetyInvenTr' + i + '" style="text-align: right">' + popOutputShipment.comma(list[i].SAFETY_INVEN) + '</td>' +
                            '<td id="materialWhCdTr' + i + '">' +
                                '<input type="text" id="whCd' + i + '">' +
                            '</td>' +
                        '</tr>';

                    $("#outputTb").append(popOutputShipment.global.createHtmlStr);

                    customKendo.fn_dropDownList("whCd" + i, list[i].whCdList, "WH_CD_NM", "WH_CD", 3);
                }
            }
        }
    },

    setOutput : function(){
        if(confirm("저장하시겠습니까?")){

            var transferArr = new Array()
            $.each($(".outputDetail"), function(i, v){
                var transfer = {
                    transferType : "S",
                    forwardingDate : $("#deliveryDt").val(),
                    forwarder : $("#empSeq").val(),
                    masterSn : $(this).find("#masterSn" + i).val(),
                    transferQty : popOutputShipment.uncomma($(this).find("#reqQty" + i).val()),
                    forwardingWhCd : $(this).find("#whCd" + i).val(),
                    empSeq : $("#empSeq").val()
                }

                transferArr.push(transfer);
            })

            $.each($("#smRecordSnArr").val().split("|"), function(){
                var data = {
                    smRecordSn : this.split(",")[0].split("_")[1],
                    deliveryAmt : this.split(",")[1].split("_")[1],
                    empSeq : $("#empSeq").val(),
                }
                popOutputShipment.global.smRecordSnArr.push(data)
            })

            popOutputShipment.global.saveAjaxData = {
                smRecordSnArr : JSON.stringify(popOutputShipment.global.smRecordSnArr),
                empSeq : $("#empSeq").val(),
                transferArr : JSON.stringify(transferArr)
            }

            var result = customKendo.fn_customAjax("/item/getFwWhCdDesign.do", popOutputShipment.global.saveAjaxData);
            if(result.flag){
                alert("처리되었습니다.");
                opener.srrl.gridReload();
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