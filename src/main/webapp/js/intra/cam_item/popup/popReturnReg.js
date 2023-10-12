var rr = {
    
    global : {
        smrIndex : 0,
        now : new Date(),
        saveAjaxData : "",
    },
    
    fn_defaultScript : function(){
        rr.addRow('new');
    },

    addRow : function(e){
        var html = "";

        html = "" +
            '<tr class="srInfo ' + e + 'SrInfo" id="sr' + rr.global.rrIndex + '">' +
                '<td>' +
                    '<input type="hidden" id="smRecordSn' + rr.global.rrIndex + '" class="smRecordSn">' +
                    '<input type="hidden" id="masterSn' + rr.global.rrIndex + '" class="masterSn">' +
                    '<input type="hidden" id="crmSn' + rr.global.rrIndex + '" class="crmSn">' +
                    '<input type="text" id="crmNm' + rr.global.rrIndex + '" class="k-input k-textbox crmNm" readonly style="width: 83%" onclick="rr.fn_popCamCrmList(\'crmSn' + rr.global.rrIndex + '\', \'crmNm' + rr.global.rrIndex + '\');"/>' +
                    '<button type="button" id="crmSelBtn' + rr.global.rrIndex + '" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onClick="rr.fn_popCamCrmList(\'crmSn' + rr.global.rrIndex + '\', \'crmNm' + rr.global.rrIndex + '\');">선택</button>' +
                '</td>' +
                '<td>' +
                    '<input type="hidden" id="invenSn' + rr.global.rrIndex + '" class="invenSn">' +
                    '<input type="hidden" id="forwardingWhCd' + rr.global.rrIndex + '" class="forwardingWhCd">' +
                    '<input type="text" id="itemNo' + rr.global.rrIndex + '" class="k-input k-textbox itemNo" readonly style="width: 69%" onclick="rr.fn_popCamItemList(' + rr.global.rrIndex + ');"/>' +
                    '<button type="button" id="crmSelBtn' + rr.global.rrIndex + '" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onClick="rr.fn_popCamItemList(' + rr.global.rrIndex + ');">선택</button>' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="itemName' + rr.global.rrIndex + '" class="k-input k-textbox" onclick="rr.fn_popCamItemList(' + rr.global.rrIndex + ');" readonly name="itemName' + rr.global.rrIndex + '">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="forwardingWhCdTxt' + rr.global.rrIndex + '" name="forwardingWhCdTxt' + rr.global.rrIndex + '" class="k-input k-textbox" onclick="rr.fn_popCamItemList(' + rr.global.rrIndex + ');" readonly name="forwardingWhCdTxt' + rr.global.rrIndex + '">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="deliveryVolume' + rr.global.rrIndex + '" name="deliveryVolume' + rr.global.rrIndex + '" class="numberInput deliveryVolume" style="text-align: right;" value="0">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="unitPrice' + rr.global.rrIndex + '" name="unitPrice' + rr.global.rrIndex + '" class="numberInput unitPrice" style="text-align: right;width: 63%">' +
                    '<button type="button" id="crmSelBtn' + rr.global.rrIndex + '" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onClick="rr.fn_popSrUnitPriceList(\'unitPrice\', ' + rr.global.rrIndex + ');">선택</button>' +
                '</td>' +

                '<td>' +
                    '<input type="text" id="amt' + rr.global.rrIndex + '" name="amt' + rr.global.rrIndex + '" class="amt numberInput" style="text-align: right" readonly>' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="rmk' + rr.global.rrIndex + '" name="rmk' + rr.global.rrIndex + '">' +
                '</td>' +
                '<td style="text-align: center">' +
                    '<button type="button" class="k-button k-button-solid-error" srNum="' + rr.global.rrIndex + '" onclick="rr.delRow(this)">X</button>' +
                '</td>' +
            '</tr>';

        $("#listTb").append(html);

        customKendo.fn_textBox(["deliveryVolume" + rr.global.rrIndex, "unitPrice" + rr.global.rrIndex,
            "amt" + rr.global.rrIndex, "rmk" + rr.global.rrIndex])

        $(".numberInput").keyup(function(){
            $(this).val(rr.comma(rr.uncomma($(this).val())));
        });

        $(".deliveryVolume, .unitPrice").keyup(function(){
            var deliveryVolume = Number(rr.uncomma($(this).closest("tr").find("input.deliveryVolume").val()));
            var unitPrice = Number(rr.uncomma($(this).closest("tr").find("input.unitPrice").val()));
            $(this).closest("tr").find("input.amt").val(rr.comma(Number(deliveryVolume * unitPrice)));
        });

        rr.global.rrIndex++;
    },

    delRow : function(e){
        if(confirm("삭제하시겠습니까?\n삭제한 데이터는 복구 할 수 없습니다.")){
            $(e).closest("tr").remove();
        }
    },

    resetRow : function(){
        rr.global.rrIndex = 0;
        $("#listTb tr").remove();
        rr.addRow('new');
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
                        deliveryVolume :  rr.uncomma($(this).find("#deliveryVolume" + i).val()),
                        deliveryDt : $("#deliveryDt").val(),
                        unitPrice : rr.uncomma($(this).find("#unitPrice" + i).val()),
                        amt : rr.uncomma($(this).find("#amt" + i).val()),
                        rmk : $(this).find("#rmk" + i).val(),
                        empSeq : $("#empSeq").val()
                    }

                    srArr.push(arrData);
                }
            })

            rr.global.saveAjaxData = {
                srArr : JSON.stringify(srArr)
            }

            var result = customKendo.fn_customAjax("/item/setShipmentRecord.do", rr.global.saveAjaxData);
            if(result.flag){
                alert("저장되었습니다.");
                opener.srl.gridReload();
                window.close();
            }
        }
    },

    fn_popCamCrmList : function (crmSnId, crmNmId){
        rr.global.crmSnId = crmSnId;
        rr.global.crmNmId = crmNmId;

        var url = "/crm/pop/popCrmList.do";
        var name = "_blank";
        var option = "width = 1300, height = 670, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    crmInfoChange : function(){
        $("#" + rr.global.crmSnId).val($("#crmSn").val())
        $("#" + rr.global.crmNmId).val($("#crmNm").val())

        $("#crmSn").val("")
        $("#crmNm").val("")
    },

    fn_popCamItemList : function (invenSnIndex){
        rr.global.invenSnIndex = invenSnIndex;

        var url = "/item/pop/popItemInvenList.do";
        var name = "_blank";
        var option = "width = 1300, height = 670, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    itemInfoChange : function(){
        $("#invenSn" + rr.global.invenSnIndex).val($("#invenSn").val())
        $("#masterSn" + rr.global.invenSnIndex).val($("#masterSn").val())
        $("#itemNo" + rr.global.invenSnIndex).val($("#itemNo").val())
        $("#itemName" + rr.global.invenSnIndex).val($("#itemName").val())
        $("#currentInven" + rr.global.invenSnIndex).val($("#currentInven").val())
        $("#forwardingWhCd" + rr.global.invenSnIndex).val($("#whCd").val())
        $("#forwardingWhCdTxt" + rr.global.invenSnIndex).val($("#whCdNm").val())

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

        rr.global.unitPriceId = unitPriceId + i;

        var url = "/item/pop/popSrUnitPriceList.do?crmSn=" + $("#crmSn" + i).val() + "&masterSn=" + $("#masterSn" + i).val();
        var name = "_blank";
        var option = "width = 860, height = 670, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    unitPriceChange : function(){
        $("#" + rr.global.unitPriceId).val(rr.comma($("#unitPrice").val()));
        var deliveryVolume = Number(rr.uncomma($("#" + rr.global.unitPriceId).closest("tr").find("input.deliveryVolume").val()));
        var unitPrice = Number($("#unitPrice").val());
        $("#" + rr.global.unitPriceId).closest("tr").find("input.amt").val(rr.comma(Number(deliveryVolume * unitPrice)));

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
