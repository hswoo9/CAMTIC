var rrr = {
    
    global : {
        rrIndex : 0,
        now : new Date(),
        saveAjaxData : "",
        rTDataSource : "",
    },
    
    fn_defaultScript : function(){
        rrr.global.rTDataSource = customKendo.fn_customAjax("/item/smCodeList", {grpSn : "RC", lgCd : "RT"});

        rrr.addRow('new');
    },

    addRow : function(e){
        var html = "";

        html = "" +
            '<tr class="rrInfo ' + e + 'RrInfo" id="rr' + rrr.global.rrIndex + '">' +
                '<td>' +
                    '<input type="text" id="returnType' + rrr.global.rrIndex + '" class="returnType">' +
                '</td>' +
                '<td>' +
                    '<input type="hidden" id="returnRecordSn' + rrr.global.rrIndex + '" class="returnRecordSn">' +
                    '<input type="hidden" id="masterSn' + rrr.global.rrIndex + '" class="masterSn">' +
                    '<input type="hidden" id="currentInven' + rrr.global.rrIndex + '" class="currentInven">' +
                    '<input type="hidden" id="crmSn' + rrr.global.rrIndex + '" class="crmSn">' +
                    '<input type="text" id="crmNm' + rrr.global.rrIndex + '" class="k-input k-textbox crmNm" readonly style="width: 82%" onclick="rrr.fn_popCamCrmList(\'crmSn' + rrr.global.rrIndex + '\', \'crmNm' + rrr.global.rrIndex + '\');"/>' +
                    '<button type="button" id="crmSelBtn' + rrr.global.rrIndex + '" class="crmSelBtn k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onClick="rrr.fn_popCamCrmList(\'crmSn' + rrr.global.rrIndex + '\', \'crmNm' + rrr.global.rrIndex + '\');">선택</button>' +
                '</td>' +
                '<td>' +
                    '<input type="hidden" id="invenSn' + rrr.global.rrIndex + '" class="invenSn">' +
                    '<input type="hidden" id="forwardingWhCd' + rrr.global.rrIndex + '" class="forwardingWhCd">' +
                    '<input type="text" id="itemNo' + rrr.global.rrIndex + '" class="k-input k-textbox itemNo" readonly style="width: 81%" onclick="rrr.fn_popCamItemList(' + rrr.global.rrIndex + ');"/>' +
                    '<button type="button" id="itemSelBtn' + rrr.global.rrIndex + '" class="itemSelBtn k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onClick="rrr.fn_popCamItemList(' + rrr.global.rrIndex + ');">선택</button>' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="itemName' + rrr.global.rrIndex + '" class="itemName k-input k-textbox" onclick="rrr.fn_popCamItemList(' + rrr.global.rrIndex + ');" readonly>' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="forwardingWhCdTxt' + rrr.global.rrIndex + '" class="forwardingWhCdTxt k-input k-textbox" onclick="rrr.fn_popCamItemList(' + rrr.global.rrIndex + ');" readonly>' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="deliveryVolume' + rrr.global.rrIndex + '" class="numberInput deliveryVolume" style="text-align: right;" value="0">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="unitPrice' + rrr.global.rrIndex + '" class="numberInput unitPrice" style="text-align: right;width: 63%">' +
                    '<button type="button" id="priceSelBtn' + rrr.global.rrIndex + '" class="priceSelBtn k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onClick="rrr.fn_popSrUnitPriceList(\'unitPrice\', ' + rrr.global.rrIndex + ');">선택</button>' +
                '</td>' +

                '<td>' +
                    '<input type="text" id="amt' + rrr.global.rrIndex + '" class="amt numberInput" style="text-align: right" readonly>' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="rmk' + rrr.global.rrIndex + '" class="rmk">' +
                '</td>' +
                '<td style="text-align: center">' +
                    '<button type="button" class="k-button k-button-solid-error" srNum="' + rrr.global.rrIndex + '" onclick="rrr.delRow(this)">X</button>' +
                '</td>' +
            '</tr>';

        $("#listTb").append(html);

        customKendo.fn_textBox(["deliveryVolume" + rrr.global.rrIndex, "unitPrice" + rrr.global.rrIndex,
            "amt" + rrr.global.rrIndex, "rmk" + rrr.global.rrIndex])

        $(".numberInput").keyup(function(){
            $(this).val(rrr.comma(rrr.uncomma($(this).val())));
        });

        $(".deliveryVolume, .unitPrice").keyup(function(){
            var deliveryVolume = Number(rrr.uncomma($(this).closest("tr").find("input.deliveryVolume").val()));
            var unitPrice = Number(rrr.uncomma($(this).closest("tr").find("input.unitPrice").val()));
            $(this).closest("tr").find("input.amt").val(rrr.comma(Number(deliveryVolume * unitPrice)));
        });

        customKendo.fn_dropDownList("returnType" + rrr.global.rrIndex, rrr.global.rTDataSource, "ITEM_CD_NM", "ITEM_CD", 3);


        rrr.global.rrIndex++;
    },

    delRow : function(e){
        if(confirm("삭제하시겠습니까?\n삭제한 데이터는 복구 할 수 없습니다.")){
            $(e).closest("tr").remove();
            rrr.global.rrIndex--;
            rrr.rowAttrOverride();
        }
    },

    rowAttrOverride : function(){
        $.each($(".rrInfo"), function(i, v){
            $(this).attr("id", "rr" + i);

            $(this).find("input.returnType").attr("id", "returnType" + i);
            $(this).find("input.returnRecordSn").attr("id", "returnRecordSn" + i);
            $(this).find("input.masterSn").attr("id", "masterSn" + i);
            $(this).find("input.crmSn").attr("id", "crmSn" + i);
            $(this).find("input.crmNm").attr("id", "crmNm" + i);
            $(this).find("input.crmNm").attr("onClick", "rrr.fn_popCamCrmList('crmSn" + i + "','crmNm" + i +"')");
            $(this).find("button.crmSelBtn").attr("id", "crmSelBtn" + i);
            $(this).find("button.crmSelBtn").attr("onClick", "rrr.fn_popCamCrmList('crmSn" + i + "','crmNm" + i +"')");

            $(this).find("input.invenSn").attr("id", "invenSn" + i);
            $(this).find("input.forwardingWhCd").attr("id", "forwardingWhCd" + i);
            $(this).find("input.itemNo").attr("id", "itemNo" + i);
            $(this).find("input.itemNo").attr("onClick", "rrr.fn_popCamItemList(" + i + ")");
            $(this).find("button.itemSelBtn").attr("id", "itemSelBtn" + i);
            $(this).find("button.itemSelBtn").attr("onClick", "rrr.fn_popCamItemList(" + i + ")");
            $(this).find("input.itemName").attr("id", "itemName" + i);
            $(this).find("input.itemName").attr("onClick", "rrr.fn_popCamItemList(" + i + ")");

            $(this).find("input.forwardingWhCdTxt").attr("id", "forwardingWhCdTxt" + i);
            $(this).find("input.forwardingWhCdTxt").attr("onClick", "rrr.fn_popCamItemList(" + i + ")");
            $(this).find("input.deliveryVolume").attr("id", "deliveryVolume" + i);


            $(this).find("input.unitPrice").attr("id", "unitPrice" + i);
            $(this).find("button.priceSelBtn").attr("id", "priceSelBtn" + i);
            $(this).find("button.priceSelBtn").attr("onClick", "rrr.fn_popSrUnitPriceList('unitPrice'," + i + ")");
            $(this).find("input.amt").attr("id", "amt" + i);
            $(this).find("input.rmk").attr("id", "rmk" + i);
        })
    },

    resetRow : function(){
        rrr.global.rrIndex = 0;
        $("#listTb tr").remove();
        rrr.addRow('new');
    },

    setReceivingReg : function(){

        if($(".rrInfo").length == 0){
            alert("저장할 항목이 없습니다.");
            return;
        }

        var flag = true;
        $.each($(".rrInfo"), function(i, v){
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
            var rrArr = new Array()
            var transferArr = new Array()
            $.each($(".rrInfo"), function(i, v){
                if($(this).find("#crmSn" + i).val() && $(this).find("#invenSn" + i).val()){
                    var arrData = {
                        returnRecordSn : $(this).find("#returnRecordSn" + i).val(),
                        crmSn : $(this).find("#crmSn" + i).val(),
                        invenSn : $(this).find("#invenSn" + i).val(),
                        deliveryVolume :  rrr.uncomma($(this).find("#deliveryVolume" + i).val()),
                        deliveryDt : $("#deliveryDt").val(),
                        unitPrice : rrr.uncomma($(this).find("#unitPrice" + i).val()),
                        amt : rrr.uncomma($(this).find("#amt" + i).val()),
                        rmk : $(this).find("#rmk" + i).val(),
                        empSeq : $("#empSeq").val()
                    }

                    rrArr.push(arrData);

                    var transfer = {
                        transferType : "R",
                        forwardingDate : $("#deliveryDt").val(),
                        forwarder : $("#empSeq").val(),
                        invenSn : $(this).find("#invenSn" + i).val(),
                        masterSn : $(this).find("#masterSn" + i).val(),
                        currentInven : $(this).find("#currentInven" + i).val(),
                        transferQty : rrr.uncomma($(this).find("#deliveryVolume" + i).val()),
                        forwardingWhCd : $("#forwardingWhCd" + i).val(),
                        rmk : $(this).find("#rmk" + i).val(),
                        empSeq : $("#empSeq").val()
                    }

                    transferArr.push(transfer);
                }
            })

            rrr.global.saveAjaxData = {
                rrArr : JSON.stringify(rrArr),
                transferArr : JSON.stringify(transferArr),
            }

            var result = customKendo.fn_customAjax("/item/setReturnRecord.do", rrr.global.saveAjaxData);
            if(result.flag){
                alert("저장되었습니다.");
                opener.rrl.gridReload();
                window.close();
            }
        }
    },

    fn_popCamCrmList : function (crmSnId, crmNmId){
        rrr.global.crmSnId = crmSnId;
        rrr.global.crmNmId = crmNmId;

        var url = "/crm/pop/popCrmList.do";
        var name = "_blank";
        var option = "width = 1300, height = 670, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    crmInfoChange : function(){
        $("#" + rrr.global.crmSnId).val($("#crmSn").val())
        $("#" + rrr.global.crmNmId).val($("#crmNm").val())

        $("#crmSn").val("")
        $("#crmNm").val("")
    },

    fn_popCamItemList : function (invenSnIndex){
        rrr.global.invenSnIndex = invenSnIndex;

        var url = "/item/pop/popItemInvenList.do";
        var name = "_blank";
        var option = "width = 1300, height = 670, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    itemInfoChange : function(){
        $("#invenSn" + rrr.global.invenSnIndex).val($("#invenSn").val())
        $("#masterSn" + rrr.global.invenSnIndex).val($("#masterSn").val())
        $("#itemNo" + rrr.global.invenSnIndex).val($("#itemNo").val())
        $("#itemName" + rrr.global.invenSnIndex).val($("#itemName").val())
        $("#currentInven" + rrr.global.invenSnIndex).val($("#currentInven").val())
        $("#forwardingWhCd" + rrr.global.invenSnIndex).val($("#whCd").val())
        $("#forwardingWhCdTxt" + rrr.global.invenSnIndex).val($("#whCdNm").val())

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

        rrr.global.unitPriceId = unitPriceId + i;

        var url = "/item/pop/popSrUnitPriceList.do?crmSn=" + $("#crmSn" + i).val() + "&masterSn=" + $("#masterSn" + i).val();
        var name = "_blank";
        var option = "width = 860, height = 670, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    unitPriceChange : function(){
        $("#" + rrr.global.unitPriceId).val(rrr.comma($("#unitPrice").val()));
        var deliveryVolume = Number(rrr.uncomma($("#" + rrr.global.unitPriceId).closest("tr").find("input.deliveryVolume").val()));
        var unitPrice = Number($("#unitPrice").val());
        $("#" + rrr.global.unitPriceId).closest("tr").find("input.amt").val(rrr.comma(Number(deliveryVolume * unitPrice)));

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
