var oor = {
    
    global : {
        oorIndex : 0,
        now : new Date(),
        saveAjaxData : "",
        chkList : [],
    },
    
    fn_defaultScript : function(){
        oor.addRow('new2');

        $("#checkAll").click(function(){
            if($("#checkAll").is(":checked")){
                $(".childCheck").prop("checked", true);
            } else {
                $(".childCheck").prop("checked", false);
            }
        });
        customKendo.fn_datePicker("dueDate", "month", "yyyy-MM-dd", new Date());
    },

    addRow : function(e){
        var html = "";

        html = "" +
            '<tr class="orInfo ' + e + 'OrInfo" id="or' + oor.global.oorIndex + '">' +
            '   <td>' +
            '       <input type="hidden" id="obtainOrderSn' + oor.global.oorIndex + '" class="obtainOrderSn">' +
            '       <input type="hidden" id="masterSn' + oor.global.oorIndex + '" class="masterSn">' +
            '       <input type="text" id="itemNo' + oor.global.oorIndex + '" class="k-input k-textbox itemNo" readonly style="width: 100%" onclick="oor.fn_popItemNoList(' + oor.global.oorIndex + ')"/>' +
            // '       <button type="button" id="itemSelBtn' + oor.global.oorIndex + '" class="itemSelBtn k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="oor.fn_popItemNoList(' + oor.global.oorIndex + ');">선택</button>' +
            '   </td>' +
            '   <td>' +
            '       <input type="text" id="itemName' + oor.global.oorIndex + '" class="itemName k-input k-textbox" readonly>' +
            '   </td>' +
            '   <td>' +
            '       <input type="text" id="standard' + oor.global.oorIndex + '" class="standard k-input k-textbox" readonly>' +
            '   </td>' +
            '   <td>' +
            '       <input type="text" id="dueDt' + oor.global.oorIndex + '" class="dueDt">' +
            '   </td>' +
            '   <td>' +
            '       <input type="text" id="orderVolume' + oor.global.oorIndex + '" class="numberInput orderVolume" style="text-align: right;" value="0">' +
            '   </td>' +
            '   <td>' +
            '       <input type="text" id="priceSel' + oor.global.oorIndex + '" class="numberInput priceSel" style="width: 45%" onchange="oor.priceChange(' + oor.global.oorIndex + ')">' +
            '       <input type="text" id="unitPrice' + oor.global.oorIndex + '" class="numberInput unitPrice" style="text-align: right;width: 45%;margin-left: 10px" value="0">' +
            '   </td>' +
            '   <td>' +
            '       <input type="text" id="amt' + oor.global.oorIndex + '" class="amt numberInput" style="text-align: right" readonly value="0">' +
            '   </td>' +
            '   <td>' +
            '       <input type="text" id="foreGb' + oor.global.oorIndex + '" class="foreGb">' +
            '   </td>' +
            '   <td>' +
            '       <input type="text" id="rmk' + oor.global.oorIndex + '" class="rmk">' +
            '   </td>' +
            '   <td style="text-align: center">' +
            '       <button type="button" class="delBtn k-button k-button-solid-error" orNum="' + oor.global.oorIndex + '" onclick="oor.delRow(this)">X</button>' +
            '   </td>' +
            '</tr>';

        $("#listTb").append(html);

        customKendo.fn_textBox(["orderVolume" + oor.global.oorIndex, "unitPrice" + oor.global.oorIndex,
            "amt" + oor.global.oorIndex, "rmk" + oor.global.oorIndex])

        customKendo.fn_datePicker("dueDt" + oor.global.oorIndex, '', "yyyy-MM-dd", '');

        $("#priceSel"+ oor.global.oorIndex).kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "기본단가", value: "0"},
                {text: "b2b단가1", value: "1"},
                {text: "b2b단가2", value: "2"},
                {text: "b2b단가3", value: "3"},
                {text: "b2b단가4", value: "4"},
                {text: "b2b단가5", value: "5"}
            ],
            index: 0,
        });

        $("#foreGb"+ oor.global.oorIndex).kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "국내", value: "D"},
                {text: "국외", value: "F"},
            ],
            index: 0,
        });

        $(".numberInput").keyup(function(){
            $(this).val(oor.comma(oor.uncomma($(this).val())));
        });

        $(".orderVolume, .unitPrice").keyup(function(){
            var orderVolume = Number(oor.uncomma($(this).closest("tr").find("input.orderVolume").val()));
            var unitPrice = Number(oor.uncomma($(this).closest("tr").find("input.unitPrice").val()));
            $(this).closest("tr").find("input.amt").val(oor.comma(Number(orderVolume * unitPrice)));

            oor.calculateTotal();
        });

        oor.global.oorIndex++;
    },

    delRow : function(e, f){
        if($("#listTb").find("tr").length == 1){
            return;
        }
        if($("#itemNo" + $(e).attr("orNum")).val() == ""){
            return;
        }

        if(f == "save"){
            let key = $(e).closest("tr").find(".masterSn").val();
            $(e).closest("tr").remove();
            oor.global.oorIndex--;
            oor.rowAttrOverride();
            oor.calculateTotal();

            for(var i = 0; i < oor.global.chkList.length; i++){
                if (oor.global.chkList[i] == key) {
                    oor.global.chkList.splice(i, 1);
                    i--;
                }
            }
        } else {
            if(confirm("삭제하시겠습니까?\n삭제한 데이터는 복구 할 수 없습니다.")){
                let key = $(e).closest("tr").find(".masterSn").val();
                $(e).closest("tr").remove();
                oor.global.oorIndex--;
                oor.rowAttrOverride();
                oor.calculateTotal();

                for(var i = 0; i < oor.global.chkList.length; i++){
                    if (oor.global.chkList[i] == key) {
                        oor.global.chkList.splice(i, 1);
                        i--;
                    }
                }
            }
        }



    },

    resetRow : function(){
        oor.global.oorIndex = 0;
        $("#listTb tr").remove();
        oor.addRow('new');
        oor.calculateTotal();
        oor.global.chkList = [];
    },

    setReceivingReg : function(){

        $("#listTb").find("tr").each(function(){
            console.log()

            if($(this).find(".itemNo").val() == ""){
                oor.delRow($(this), "save");
            }
        });

        if($(".orInfo").length == 0){
            alert("저장할 항목이 없습니다.");
            return;
        }

        var flag = true;
        var flagMessage = "";
        $.each($(".orInfo"), function(i, v){
            if(!$("#allModCrmSn").val()){
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
                if($(this).find("#masterSn" + i).val()){
                    var arrData = {
                        masterSn : $(this).find("#masterSn" + i).val(),
                        crmSn : $("#allModCrmSn").val(),
                        orderVolume : oor.uncomma($(this).find("#orderVolume" + i).val()),
                        orderRemain : oor.uncomma($(this).find("#orderVolume" + i).val()),
                        orderDt : $("#orderDt").val(),
                        dueDt : $(this).find("#dueDt" + i).val(),
                        unitPrice : oor.uncomma($(this).find("#unitPrice" + i).val()),
                        amt : oor.uncomma($(this).find("#amt" + i).val()),
                        rmk : $(this).find("#rmk" + i).val(),
                        empSeq : $("#empSeq").val(),
                        foreGb : $(this).find("#foreGb" + i).data("kendoDropDownList").value(),
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

        if(oor.global.crmSnId != "allModCrmSn"){
            oor.getItemUnitPrice(oor.global.crmIndex);
        }
    },

    /*allModCrmSn : function(){
        $.each($(".orInfo"), function(i, v){
            $(this).find("#crmSn" + i).val($("#allModCrmSn").val());
            $(this).find("#crmNm" + i).val($("#allModCrmNm").val());
            oor.getItemUnitPrice(i);
        })
    },*/

    modCrmSn : function(){
        $.each($(".orInfo"), function(i, v){
            $(this).find("#crmSn" + i).val($("#allModCrmSn").val());
            $(this).find("#crmNm" + i).val($("#allModCrmNm").val());
            $(this).find("#dueDt" + i).val($("#dueDate").val());
            oor.getItemUnitPrice(i);
        });
    },

    fn_popItemNoList : function (masterSnIndex){
        oor.global.masterSnIndex = masterSnIndex;

        var url = "/item/pop/popItemNoList.do";
        var name = "_blank";
        var option = "width = 1300, height = 670, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    masterSnChange : function(){

        var result = customKendo.fn_customAjax("/item/getItemMaster.do", {
            masterSn : $("#masterSn").val()
        });
        console.log("result", result);
        const map = result.rs;

        let text1 = "기본단가";
        let text2 = "b2b단가1";
        let text3 = "b2b단가2";
        let text4 = "b2b단가3";
        let text5 = "b2b단가4";
        let text6 = "b2b단가5";
        if(result.rs != null){
            text2 = "b2b1단가(" + map.B2B_ETC + ")";
            text3 = "b2b2단가(" + map.B2B_ETC2 + ")";
            text4 = "b2b3단가(" + map.B2B_ETC3 + ")";
            text5 = "b2b4단가(" + map.B2B_ETC4 + ")";
            text6 = "b2b5단가(" + map.B2B_ETC5 + ")";
        }

        $("#priceSel"+ oor.global.masterSnIndex).kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: text1, value: "0"},
                {text: text2, value: "1"},
                {text: text3, value: "2"},
                {text: text4, value: "3"},
                {text: text5, value: "4"},
                {text: text6, value: "5"}
            ],
            index: 0,
        });

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

    priceChange : function(e){
        oor.getItemUnitPrice(e);
    },

    getItemUnitPrice : function(e){
        if(!$("#masterSn" + e).val()){
            return;
        }

        oor.global.searchAjaxData = {
            crmSn : $("#allModCrmSn").val(),
            crmSn2 : $("#allModCrmSn").val(),
            masterSn : $("#masterSn" + e).val(),
            busClass : "R"
        }

        var result = customKendo.fn_customAjax("/item/getItemUnitPrice.do", oor.global.searchAjaxData);
        var crmResult = customKendo.fn_customAjax("/item/getCrmItemUnitPriceListByCrmSn.do", oor.global.searchAjaxData);

        if(crmResult.list.length > 0){
            const crmRMap = crmResult.list[crmResult.list.length - 1]
            oor.global.unitPriceId = "unitPrice" + e;
            if($("#priceSel" + e).val() == "0"){
                $("#unitPrice").val(crmRMap.UNIT_PRICE);
            }else if($("#priceSel" + e).val() == "1"){
                $("#unitPrice").val(crmRMap.B2B_PRICE);
            }else if($("#priceSel" + e).val() == "2"){
                $("#unitPrice").val(crmRMap.B2B_PRICE2);
            }else if($("#priceSel" + e).val() == "3"){
                $("#unitPrice").val(crmRMap.B2B_PRICE3);
            }else if($("#priceSel" + e).val() == "4"){
                $("#unitPrice").val(crmRMap.B2B_PRICE4);
            }else if($("#priceSel" + e).val() == "5"){
                $("#unitPrice").val(crmRMap.B2B_PRICE5);
            }
            oor.unitPriceChange();
        }else{
            if(result.flag){
                if(result.rs != null){
                    oor.global.unitPriceId = "unitPrice" + e;
                    if($("#priceSel" + e).val() == "0"){
                        $("#unitPrice").val(result.rs.UNIT_PRICE);
                    }else if($("#priceSel" + e).val() == "1"){
                        $("#unitPrice").val(result.rs.B2B_PRICE);
                    }else if($("#priceSel" + e).val() == "2"){
                        $("#unitPrice").val(result.rs.B2B_PRICE2);
                    }else if($("#priceSel" + e).val() == "3"){
                        $("#unitPrice").val(result.rs.B2B_PRICE3);
                    }else if($("#priceSel" + e).val() == "4"){
                        $("#unitPrice").val(result.rs.B2B_PRICE4);
                    }else if($("#priceSel" + e).val() == "5"){
                        $("#unitPrice").val(result.rs.B2B_PRICE5);
                    }
                    oor.unitPriceChange();
                }else{
                    $("#unitPrice").val(0);
                    oor.unitPriceChange();
                }
            }
        }
    },

    unitPriceChange : function(){
        $("#" + oor.global.unitPriceId).val(oor.comma($("#unitPrice").val()));
        var orderVolume = Number(oor.uncomma($("#" + oor.global.unitPriceId).closest("tr").find("input.orderVolume").val()));
        var unitPrice = Number($("#unitPrice").val());
        $("#" + oor.global.unitPriceId).closest("tr").find("input.amt").val(oor.comma(Number(orderVolume * unitPrice)));

        $("#unitPrice").val("")
        oor.calculateTotal();
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
            $(this).find("input.dueDt").attr("id", "dueDt" + i);
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
            $(this).find("input.priceSel").attr("id", "priceSel" + i);
            $(this).find("input.unitPrice").attr("id", "unitPrice" + i);
            $(this).find("input.amt").attr("id", "amt" + i);
            $(this).find("input.rmk").attr("id", "rmk" + i);
            $(this).find("button.delBtn").attr("ornum", i);
        })
    },

    calculateTotal: function() {
        var total = 0;
        $(".amt").each(function() {
            total += Number(oor.uncomma($(this).val()));
        });
        $("#totalAmt").text(oor.comma(total));
    },
}
