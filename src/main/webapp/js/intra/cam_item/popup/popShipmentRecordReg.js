var srr = {
    
    global : {
        smrIndex : 0,
        now : new Date(),
        saveAjaxData : "",
    },
    
    fn_defaultScript : function(){
        srr.addRow('new');
    },

    addRow : function(e){
        var html = "";

        html = "" +
            '<tr class="srInfo ' + e + 'SrInfo" id="sr' + srr.global.smrIndex + '">' +
                '<td>' +
                    '<input type="hidden" id="smRecordSn' + srr.global.smrIndex + '" class="smRecordSn">' +
                    '<input type="hidden" id="masterSn' + srr.global.smrIndex + '" class="masterSn">' +
                    '<input type="hidden" id="crmSn' + srr.global.smrIndex + '" class="crmSn">' +
                    '<input type="text" id="crmNm' + srr.global.smrIndex + '" class="k-input k-textbox crmNm" readonly style="width: 83%" onclick="srr.fn_popCamCrmList(\'crmSn' + srr.global.smrIndex + '\', \'crmNm' + srr.global.smrIndex + '\');"/>' +
                    '<button type="button" id="crmSelBtn' + srr.global.smrIndex + '" class="crmSelBtn k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onClick="srr.fn_popCamCrmList(\'crmSn' + srr.global.smrIndex + '\', \'crmNm' + srr.global.smrIndex + '\');">선택</button>' +
                '</td>' +
                '<td>' +
                    '<input type="hidden" id="invenSn' + srr.global.smrIndex + '" class="invenSn">' +
                    '<input type="hidden" id="forwardingWhCd' + srr.global.smrIndex + '" class="forwardingWhCd">' +
                    '<input type="text" id="itemNo' + srr.global.smrIndex + '" class="k-input k-textbox itemNo" readonly style="width: 69%" onclick="srr.fn_popCamItemList(' + srr.global.smrIndex + ');"/>' +
                    '<button type="button" id="itemSelBtn' + srr.global.smrIndex + '" class="itemSelBtn k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onClick="srr.fn_popCamItemList(' + srr.global.smrIndex + ');">선택</button>' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="itemName' + srr.global.smrIndex + '" class="itemName k-input k-textbox" onclick="srr.fn_popCamItemList(' + srr.global.smrIndex + ');" readonly>' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="forwardingWhCdTxt' + srr.global.smrIndex + '" class="forwardingWhCdTxt k-input k-textbox" onclick="srr.fn_popCamItemList(' + srr.global.smrIndex + ');" readonly>' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="deliveryVolume' + srr.global.smrIndex + '" class="numberInput deliveryVolume" style="text-align: right;" value="0">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="unitPrice' + srr.global.smrIndex + '" class="numberInput unitPrice" style="text-align: right;width: 63%">' +
                    '<button type="button" id="priceSelBtn' + srr.global.smrIndex + '" class="priceSelBtn k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onClick="srr.fn_popSrUnitPriceList(\'unitPrice\', ' + srr.global.smrIndex + ');">선택</button>' +
                '</td>' +

                '<td>' +
                    '<input type="text" id="amt' + srr.global.smrIndex + '" class="amt numberInput" style="text-align: right" readonly>' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="rmk' + srr.global.smrIndex + '" class="rmk">' +
                '</td>' +
                '<td style="text-align: center">' +
                    '<button type="button" class="k-button k-button-solid-error" srNum="' + srr.global.smrIndex + '" onclick="srr.delRow(this)">X</button>' +
                '</td>' +
            '</tr>';

        $("#listTb").append(html);

        customKendo.fn_textBox(["deliveryVolume" + srr.global.smrIndex, "unitPrice" + srr.global.smrIndex,
            "amt" + srr.global.smrIndex, "rmk" + srr.global.smrIndex])

        $(".numberInput").keyup(function(){
            $(this).val(srr.comma(srr.uncomma($(this).val())));
        });

        $(".deliveryVolume, .unitPrice").keyup(function(){
            var deliveryVolume = Number(srr.uncomma($(this).closest("tr").find("input.deliveryVolume").val()));
            var unitPrice = Number(srr.uncomma($(this).closest("tr").find("input.unitPrice").val()));
            $(this).closest("tr").find("input.amt").val(srr.comma(Number(deliveryVolume * unitPrice)));
        });

        srr.global.smrIndex++;
    },

    delRow : function(e){
        if(confirm("삭제하시겠습니까?\n삭제한 데이터는 복구 할 수 없습니다.")){
            $(e).closest("tr").remove();
            srr.global.smrIndex--;
            srr.rowAttrOverride();
        }
    },

    resetRow : function(){
        srr.global.smrIndex = 0;
        $("#listTb tr").remove();
        srr.addRow('new');
    },

    setReceivingReg : function(){

        if($(".srInfo").length == 0){
            alert("저장할 항목이 없습니다.");
            return;
        }

        var flag = true;
        $.each($(".srInfo"), function(i, v){
            if(!$(this).find("#crmSn" + i).val() || !$(this).find("#invenSn" + i).val() || !$(this).find("#deliveryVolume" + i).val()
                || !$(this).find("#unitPrice" + i).val() || !$(this).find("#amt" + i).val()){
                flag = false;
            }

            if(!flag){
                alert("입력하지 않은 항목이 있습니다.");
                return flag;
            }
        })

        if(!flag){
            return flag;
        }

        if(confirm("저장하시겠습니까?")){
            var srArr = new Array()
            $.each($(".srInfo"), function(i, v){
                if($(this).find("#crmSn" + i).val() && $(this).find("#invenSn" + i).val()){
                    var arrData = {
                        smRecordSn : $(this).find("#smRecordSn" + i).val(),
                        crmSn : $(this).find("#crmSn" + i).val(),
                        invenSn : $(this).find("#invenSn" + i).val(),
                        deliveryVolume :  srr.uncomma($(this).find("#deliveryVolume" + i).val()),
                        deliveryDt : $("#deliveryDt").val(),
                        unitPrice : srr.uncomma($(this).find("#unitPrice" + i).val()),
                        amt : srr.uncomma($(this).find("#amt" + i).val()),
                        rmk : $(this).find("#rmk" + i).val(),
                        empSeq : $("#empSeq").val()
                    }

                    srArr.push(arrData);
                }
            })

            srr.global.saveAjaxData = {
                srArr : JSON.stringify(srArr)
            }

            var result = customKendo.fn_customAjax("/item/setShipmentRecord.do", srr.global.saveAjaxData);
            if(result.flag){
                alert("저장되었습니다.");
                opener.srl.gridReload();
                window.close();
            }
        }
    },

    fn_popCamCrmList : function (crmSnId, crmNmId){
        srr.global.crmSnId = crmSnId;
        srr.global.crmNmId = crmNmId;

        var url = "/crm/pop/popCrmList.do";
        var name = "_blank";
        var option = "width = 1300, height = 670, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    crmInfoChange : function(){
        $("#" + srr.global.crmSnId).val($("#crmSn").val())
        $("#" + srr.global.crmNmId).val($("#crmNm").val())

        $("#crmSn").val("")
        $("#crmNm").val("")
    },

    fn_popCamItemList : function (invenSnIndex){
        srr.global.invenSnIndex = invenSnIndex;

        var url = "/item/pop/popItemInvenList.do?reg=shipmentRecord";
        var name = "_blank";
        var option = "width = 1300, height = 670, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    itemInfoChange : function(){
        $("#invenSn" + srr.global.invenSnIndex).val($("#invenSn").val())
        $("#masterSn" + srr.global.invenSnIndex).val($("#masterSn").val())
        $("#itemNo" + srr.global.invenSnIndex).val($("#itemNo").val())
        $("#itemName" + srr.global.invenSnIndex).val($("#itemName").val())
        $("#currentInven" + srr.global.invenSnIndex).val($("#currentInven").val())
        $("#forwardingWhCd" + srr.global.invenSnIndex).val($("#whCd").val())
        $("#forwardingWhCdTxt" + srr.global.invenSnIndex).val($("#whCdNm").val())

        $("#invenSn").val("")
        $("#masterSn").val("")
        $("#itemNo").val("")
        $("#itemName").val("")
        $("#currentInven").val("")
        $("#whCd").val("")
        $("#whCdNm").val("")
    },

    fn_popSrUnitPriceList : function(unitPriceId, i){
        if(!$("#crmSn" + i).val()){
            alert("업체를 선택해주세요.");
            return;
        }else if(!$("#itemNo" + i).val()){
            alert("품번을 입력해주세요.");
            return;
        }

        srr.global.unitPriceId = unitPriceId + i;

        var url = "/item/pop/popSrUnitPriceList.do?crmSn=" + $("#crmSn" + i).val() + "&masterSn=" + $("#masterSn" + i).val();
        var name = "_blank";
        var option = "width = 860, height = 670, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    unitPriceChange : function(){
        $("#" + srr.global.unitPriceId).val(srr.comma($("#unitPrice").val()));
        var deliveryVolume = Number(srr.uncomma($("#" + srr.global.unitPriceId).closest("tr").find("input.deliveryVolume").val()));
        var unitPrice = Number($("#unitPrice").val());
        $("#" + srr.global.unitPriceId).closest("tr").find("input.amt").val(srr.comma(Number(deliveryVolume * unitPrice)));

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

    rowAttrOverride : function(){
        $.each($(".srInfo"), function(i, v){
            $(this).attr("id", "sr" + i);

            $(this).find("input.smRecordSn").attr("id", "smRecordSn" + i);
            $(this).find("input.masterSn").attr("id", "masterSn" + i);
            $(this).find("input.invenSn").attr("id", "invenSn" + i);
            $(this).find("input.forwardingWhCd").attr("id", "forwardingWhCd" + i);
            $(this).find("input.crmSn").attr("id", "crmSn" + i);
            $(this).find("input.crmNm").attr("id", "crmNm" + i);
            $(this).find("input.crmNm").attr("onClick", "srr.fn_popCamCrmList('crmSn" + i + "','crmNm" + i +"')");
            $(this).find("button.crmSelBtn").attr("id", "crmSelBtn" + i);
            $(this).find("button.crmSelBtn").attr("onClick", "srr.fn_popCamCrmList('crmSn" + i + "','crmNm" + i +"')");


            $(this).find("input.itemNo").attr("id", "itemNo" + i);
            $(this).find("input.itemNo").attr("onClick", "srr.fn_popCamItemList(" + i + ")");
            $(this).find("button.itemSelBtn").attr("id", "itemSelBtn" + i);
            $(this).find("button.itemSelBtn").attr("onClick", "srr.fn_popCamItemList(" + i + ")");
            $(this).find("input.itemName").attr("id", "itemName" + i);
            $(this).find("input.itemName").attr("onClick", "srr.fn_popCamItemList(" + i + ")");
            $(this).find("input.forwardingWhCdTxt").attr("id", "forwardingWhCdTxt" + i);
            $(this).find("input.forwardingWhCdTxt").attr("onClick", "srr.fn_popCamItemList(" + i + ")");

            $(this).find("input.deliveryVolume").attr("id", "deliveryVolume" + i);
            $(this).find("input.unitPrice").attr("id", "unitPrice" + i);
            $(this).find("button.priceSelBtn").attr("id", "priceSelBtn" + i);
            $(this).find("button.priceSelBtn").attr("onClick", "srr.fn_popSrUnitPriceList('unitPrice'," + i + ")");
            $(this).find("input.amt").attr("id", "amt" + i);
            $(this).find("input.rmk").attr("id", "rmk" + i);
        })
    },
}
