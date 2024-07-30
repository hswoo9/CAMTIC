var oor = {
    
    global : {
        oorIndex : 0,
        now : new Date(),
        saveAjaxData : "",
    },
    
    fn_defaultScript : function(){
        oor.addRow('new');
    },

    addRow : function(e){
        var html = "";

        html = "" +
            '<tr class="orInfo ' + e + 'OrInfo" id="or' + oor.global.oorIndex + '">' +
                '<td>' +
                    '<input type="hidden" id="obtainOrderSn' + oor.global.oorIndex + '" class="obtainOrderSn">' +
                    '<input type="hidden" id="masterSn' + oor.global.oorIndex + '" class="masterSn">' +
                    '<input type="hidden" id="crmSn' + oor.global.oorIndex + '" class="crmSn">' +
                    '<input type="text" id="crmNm' + oor.global.oorIndex + '" class="k-input k-textbox crmNm" readonly style="width: 83%" onclick="oor.fn_popCamCrmList(\'crmSn' + oor.global.oorIndex + '\', \'crmNm' + oor.global.oorIndex + '\',' + oor.global.oorIndex + ');"/>' +
                    '<button type="button" id="crmSelBtn' + oor.global.oorIndex + '" class="crmSelBtn k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onClick="oor.fn_popCamCrmList(\'crmSn' + oor.global.oorIndex + '\', \'crmNm' + oor.global.oorIndex + '\',' + oor.global.oorIndex + ');">선택</button>' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="itemNo' + oor.global.oorIndex + '" class="k-input k-textbox itemNo" readonly style="width: 72%" onclick="oor.fn_popItemNoList(' + oor.global.oorIndex + ');"/>' +
                    '<button type="button" id="itemSelBtn' + oor.global.oorIndex + '" class="itemSelBtn k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onClick="oor.fn_popItemNoList(' + oor.global.oorIndex + ');">선택</button>' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="itemName' + oor.global.oorIndex + '" class="itemName k-input k-textbox" onclick="oor.fn_popItemNoList(' + oor.global.oorIndex + ');" readonly>' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="standard' + oor.global.oorIndex + '" class="standard k-input k-textbox" onclick="oor.fn_popItemNoList(' + oor.global.oorIndex + ');" readonly>' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="dueDt' + oor.global.oorIndex + '" class="dueDt">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="orderVolume' + oor.global.oorIndex + '" class="numberInput orderVolume" style="text-align: right;" value="0">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="unitPrice' + oor.global.oorIndex + '" class="numberInput unitPrice" style="text-align: right;" value="0">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="amt' + oor.global.oorIndex + '" class="amt numberInput" style="text-align: right" readonly value="0">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="rmk' + oor.global.oorIndex + '" class="rmk">' +
                '</td>' +
                '<td style="text-align: center">' +
                    '<button type="button" class="k-button k-button-solid-error" orNum="' + oor.global.oorIndex + '" onclick="oor.delRow(this)">X</button>' +
                '</td>' +
            '</tr>';

        $("#listTb").append(html);

        customKendo.fn_textBox(["orderVolume" + oor.global.oorIndex, "unitPrice" + oor.global.oorIndex,
            "amt" + oor.global.oorIndex, "rmk" + oor.global.oorIndex])

        customKendo.fn_datePicker("dueDt" + oor.global.oorIndex, '', "yyyy-MM-dd", '');

        $(".numberInput").keyup(function(){
            $(this).val(oor.comma(oor.uncomma($(this).val())));
        });

        $(".orderVolume, .unitPrice").keyup(function(){
            var orderVolume = Number(oor.uncomma($(this).closest("tr").find("input.orderVolume").val()));
            var unitPrice = Number(oor.uncomma($(this).closest("tr").find("input.unitPrice").val()));
            $(this).closest("tr").find("input.amt").val(oor.comma(Number(orderVolume * unitPrice)));
        });

        oor.global.oorIndex++;
    },

    delRow : function(e){
        if(confirm("삭제하시겠습니까?\n삭제한 데이터는 복구 할 수 없습니다.")){
            $(e).closest("tr").remove();
            oor.global.oorIndex--;
            oor.rowAttrOverride();
        }
    },

    resetRow : function(){
        oor.global.oorIndex = 0;
        $("#listTb tr").remove();
        oor.addRow('new');
    },

    setReceivingReg : function(){

        if($(".orInfo").length == 0){
            alert("저장할 항목이 없습니다.");
            return;
        }

        var flag = true;
        var flagMessage = "";
        $.each($(".orInfo"), function(i, v){
            if(!$(this).find("#crmSn" + i).val()){
                flag = false;
                flagMessage = "업체를 선택해주세요.";
            }else if(!$(this).find("#masterSn" + i).val()){
                flag = false;
                flagMessage = "품번을 선택해주세요.";
            }else if(!$(this).find("#dueDt" + i).val()){
                flag = false;
                flagMessage = "납기일을 선택해주세요.";
            }else if($(this).find("#orderVolume" + i).val() == '0'){
                flag = false;
                flagMessage = "수주량을 확인해주세요.";
            }else if(!$(this).find("#unitPrice" + i).val()){
                flag = false;
                flagMessage = "단가를 확인해주세요.";
            }else if(!$(this).find("#amt" + i).val()){
                flag = false;
                flagMessage = "수주금액을 확인해주세요.";
            }

            if(!flag){
                alert(flagMessage);
                return flag;
            }
        })

        if(!flag){
            return flag;
        }

        if(confirm("저장하시겠습니까?")){
            var orArr = new Array()
            $.each($(".orInfo"), function(i, v){
                if($(this).find("#crmSn" + i).val() && $(this).find("#masterSn" + i).val()){
                    var arrData = {
                        masterSn : $(this).find("#masterSn" + i).val(),
                        crmSn : $(this).find("#crmSn" + i).val(),
                        orderVolume : oor.uncomma($(this).find("#orderVolume" + i).val()),
                        orderRemain : oor.uncomma($(this).find("#orderVolume" + i).val()),
                        orderDt : $("#orderDt").val(),
                        dueDt : $(this).find("#dueDt" + i).val(),
                        unitPrice : oor.uncomma($(this).find("#unitPrice" + i).val()),
                        amt : oor.uncomma($(this).find("#amt" + i).val()),
                        rmk : $(this).find("#rmk" + i).val(),
                        empSeq : $("#empSeq").val()
                    }

                    orArr.push(arrData);
                }
            })

            oor.global.saveAjaxData = {
                orArr : JSON.stringify(orArr)
            }

            var result = customKendo.fn_customAjax("/item/setObtainOrder.do", oor.global.saveAjaxData);
            if(result.flag){
                alert("저장되었습니다.");
                opener.oorl.gridReload();
                window.close();
            }
        }
    },

    fn_popCamCrmList : function (crmSnId, crmNmId, crmIndex){
        oor.global.crmSnId = crmSnId;
        oor.global.crmNmId = crmNmId;
        oor.global.crmIndex = crmIndex;

        var url = "/crm/pop/popCrmList.do";
        var name = "_blank";
        var option = "width = 1300, height = 670, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    crmInfoChange : function(){
        $("#" + oor.global.crmSnId).val($("#crmSn").val())
        $("#" + oor.global.crmNmId).val($("#crmNm").val())

        $("#crmSn").val("")
        $("#crmNm").val("")
        oor.getItemUnitPrice(oor.global.crmIndex);
    },

    fn_popItemNoList : function (masterSnIndex){
        oor.global.masterSnIndex = masterSnIndex;

        var url = "/item/pop/popItemNoList.do";
        var name = "_blank";
        var option = "width = 1300, height = 670, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    masterSnChange : function(){
        $("#masterSn" + oor.global.masterSnIndex).val($("#masterSn").val())
        $("#itemNo" + oor.global.masterSnIndex).val($("#itemNo").val())
        $("#itemName" + oor.global.masterSnIndex).val($("#itemName").val())
        $("#standard" + oor.global.masterSnIndex).val($("#standard").val())

        $("#masterSn").val("")
        $("#itemNo").val("")
        $("#itemName").val("")
        $("#standard").val("")

        oor.getItemUnitPrice(oor.global.masterSnIndex);
    },

    getItemUnitPrice : function(e){
        if(!$("#masterSn" + e).val()){
            return;
        }

        oor.global.searchAjaxData = {
            crmSn : $("#crmSn" + e).val(),
            masterSn : $("#masterSn" + e).val(),
            busClass : "R"
        }

        var result = customKendo.fn_customAjax("/item/getItemUnitPrice.do", oor.global.searchAjaxData);
        if(result.flag){
            if(result.rs != null){
                oor.global.unitPriceId = "unitPrice" + e;
                $("#unitPrice").val(result.rs.UNIT_PRICE);
                oor.unitPriceChange();
            }else{
                $("#unitPrice").val(0);
                oor.unitPriceChange();
            }
        }
    },

    unitPriceChange : function(){
        $("#" + oor.global.unitPriceId).val(oor.comma($("#unitPrice").val()));
        var orderVolume = Number(oor.uncomma($("#" + oor.global.unitPriceId).closest("tr").find("input.orderVolume").val()));
        var unitPrice = Number($("#unitPrice").val());
        $("#" + oor.global.unitPriceId).closest("tr").find("input.amt").val(oor.comma(Number(orderVolume * unitPrice)));

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
        $.each($(".orInfo"), function(i, v){
            $(this).attr("id", "or" + i);

            $(this).find("input.obtainOrderSn").attr("id", "obtainOrderSn" + i);
            $(this).find("input.masterSn").attr("id", "masterSn" + i);
            $(this).find("input.crmSn").attr("id", "crmSn" + i);
            $(this).find("input.crmNm").attr("id", "crmNm" + i);
            $(this).find("input.crmNm").attr("onClick", "oor.fn_popCamCrmList('crmSn" + i + "','crmNm" + i +"'," + i + ")");
            $(this).find("button.crmSelBtn").attr("id", "crmSelBtn" + i);
            $(this).find("button.crmSelBtn").attr("onClick", "oor.fn_popCamCrmList('crmSn" + i + "','crmNm" + i +"'," + i + ")");
            $(this).find("input.itemNo").attr("id", "itemNo" + i);
            $(this).find("input.itemNo").attr("onClick", "oor.fn_popItemNoList(" + i + ")");
            $(this).find("button.itemSelBtn").attr("id", "itemSelBtn" + i);
            $(this).find("button.itemSelBtn").attr("onClick", "oor.fn_popItemNoList(" + i + ")");
            $(this).find("input.itemName").attr("id", "itemName" + i);
            $(this).find("input.itemName").attr("onClick", "oor.fn_popItemNoList(" + i + ")");
            $(this).find("input.standard").attr("id", "standard" + i);
            $(this).find("input.standard").attr("onClick", "oor.fn_popItemNoList(" + i + ")");
            $(this).find("input.orderVolume").attr("id", "orderVolume" + i);
            $(this).find("input.unitPrice").attr("id", "unitPrice" + i);
            $(this).find("input.amt").attr("id", "amt" + i);
            $(this).find("input.rmk").attr("id", "rmk" + i);
        })
    },
}
