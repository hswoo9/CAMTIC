var invenAdjust = {
    
    global : {
        invenTransferIndex : 0,
        invenSnIndex : "",
        now : new Date(),
        saveAjaxData : "",
        dropDownDataSource : "",
        wTDataSource : "",
        wCDataSource : "",
    },
    
    fn_defaultScript : function(){
        invenTr.global.dropDownDataSource = customKendo.fn_customAjax("/item/smCodeList", {grpSn : "TF", lgCd : "TFT"});
        invenTr.global.dropDownDataSource = invenTr.global.dropDownDataSource.filter(element => element.ITEM_CD != "R");
        invenTr.global.wCDataSource = customKendo.fn_customAjax("/item/smCodeList", {grpSn : "WC", lgCd : "WH"});

        invenTr.addRow('new');
    },

    addRow : function(e){
        var html = "";

        html = "" +
            '<tr class="itransInfo ' + e + 'ItransInfo" id="it' + invenTr.global.invenTransferIndex + '">' +
                '<td>' +
                    '<input type="text" id="transferType' + invenTr.global.invenTransferIndex + '" class="transferType" onchange="invenTr.transferTypeChange(' + invenTr.global.invenTransferIndex + ')">' +
                '</td>' +
                '<td>' +
                    '<input type="hidden" id="invenTransSn' + invenTr.global.invenTransferIndex + '" class="invenTransSn">' +
                    '<input type="hidden" id="invenSn' + invenTr.global.invenTransferIndex + '" class="invenSn">' +
                    '<input type="hidden" id="masterSn' + invenTr.global.invenTransferIndex + '" class="masterSn">' +
                    '<input type="hidden" id="forwardingWhCd' + invenTr.global.invenTransferIndex + '" class="forwardingWhCd">' +
                    '<input type="text" id="itemNo' + invenTr.global.invenTransferIndex + '" class="itemNo k-input k-textbox" readonly onClick="invenTr.fn_popCamItemList(' + invenTr.global.invenTransferIndex + ');" style="width: 80%">' +
                    '<button type="button" id="itemSelBtn' + invenTr.global.invenTransferIndex + '" class="itemSelBtn k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onClick="invenTr.fn_popCamItemList(' + invenTr.global.invenTransferIndex + ');">선택</button>' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="itemName' + invenTr.global.invenTransferIndex + '" class="itemName k-input k-textbox" readonly onClick="invenTr.fn_popCamItemList(' + invenTr.global.invenTransferIndex + ');">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="currentInven' + invenTr.global.invenTransferIndex + '" class="currentInven k-input k-textbox" readonly onClick="invenTr.fn_popCamItemList(' + invenTr.global.invenTransferIndex + ');" style="text-align: right">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="transferQty' + invenTr.global.invenTransferIndex + '" class="transferQty numberInput" style="text-align: right" value="0" oninput="invenTr.maxCurrentInvenChk(this, ' + invenTr.global.invenTransferIndex + ')">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="forwardingWhCdTxt' + invenTr.global.invenTransferIndex + '" class="forwardingWhCdTxt k-input k-textbox" readonly onClick="invenTr.fn_popCamItemList(' + invenTr.global.invenTransferIndex + ');">' +
                '</td>' +
                '<td>' +
                    '<div id="receivingDiv' + invenTr.global.invenTransferIndex + '">' +
                        '<input type="text" id="receivingWhCd' + invenTr.global.invenTransferIndex + '" class="receivingWhCd">' +
                    '</div>' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="rmk' + invenTr.global.invenTransferIndex + '" class="rmk">' +
                '</td>' +
                '<td>' +
                    '<button type="button" class="k-button k-button-solid-error inventransNum" inventransNum="' + invenTr.global.invenTransferIndex + '" onclick="invenTr.delRow(this)">X</button>' +
                '</td>' +
            '</tr>';

        $("#listTb").append(html);

        customKendo.fn_dropDownList("transferType" + invenTr.global.invenTransferIndex, invenTr.global.dropDownDataSource, "ITEM_CD_NM", "ITEM_CD", 3);
        customKendo.fn_textBox(["transferQty" + invenTr.global.invenTransferIndex, "rmk" + invenTr.global.invenTransferIndex])
        customKendo.fn_dropDownList("receivingWhCd" + invenTr.global.invenTransferIndex, invenTr.global.wCDataSource, "ITEM_CD_NM", "ITEM_CD", 3);

        $(".numberInput").keyup(function(){
            $(this).val(invenTr.comma(invenTr.uncomma($(this).val())));
        });

        invenTr.global.invenTransferIndex++;
    },

    transferTypeChange : function(e){
        if($("#transferType" + e).val() == "S"){
            $("#receivingDiv" + e).hide();
        }else{
            $("#receivingDiv" + e).show();
        }
    },

    delRow : function(e){
        if(confirm("삭제하시겠습니까?")){
            $(e).closest("tr").remove();
            invenTr.global.invenTransferIndex--;
            invenTr.rowAttrOverride();
        }
    },

    rowAttrOverride : function(){
        $.each($(".itransInfo"), function(i, v){
            $(this).attr("id", "it" + i);
            $(this).find("input.transferType").attr("id", "transferType" + i);
            $(this).find(".invenTransSn").attr("id", "invenTransSn" + i);
            $(this).find(".invenSn").attr("id", "invenSn" + i);
            $(this).find(".masterSn").attr("id", "masterSn" + i);
            $(this).find(".forwardingWhCd").attr("id", "forwardingWhCd" + i);
            $(this).find(".itemNo").attr("id", "itemNo" + i);
            $(this).find(".itemNo").attr("onClick", "invenTr.fn_popCamItemList(" + i + ")");
            $(this).find(".itemSelBtn").attr("id", "itemSelBtn" + i);
            $(this).find(".itemSelBtn").attr("onClick", "invenTr.fn_popCamItemList(" + i + ")");
            $(this).find(".itemName").attr("id", "itemName" + i);
            $(this).find(".itemName").attr("onClick", "invenTr.fn_popCamItemList(" + i + ")");

            $(this).find(".currentInven").attr("id", "currentInven" + i);
            $(this).find(".currentInven").attr("onClick", "invenTr.fn_popCamItemList(" + i + ")");
            $(this).find(".forwardingWhCdTxt").attr("id", "forwardingWhCdTxt" + i);
            $(this).find(".forwardingWhCdTxt").attr("onClick", "invenTr.forwardingWhCdTxt(" + i + ")");

            $(this).find("input.transferQty").attr("id", "transferQty" + i);
            $(this).find(".transferQty").attr("oninput", "invenTr.maxCurrentInvenChk(this," + i + ")");

            $(this).find("input.receivingWhCd").attr("id", "receivingWhCd" + i);
            $(this).find(".rmk").attr("id", "rmk" + i);
            $(this).find(".inventransNum").attr("inventransNum", i);
        })
    },

    maxCurrentInvenChk : function(i, e){
        if(!$("#currentInven" + e).val()){
            alert("이동할 품목을 선택해주세요.");
            $(i).val(0);
            return;
        }else if(Number(invenTr.uncomma($(i).val())) > Number($("#currentInven" + e).val())){
            alert("잘못된 이동수량입니다.");
            $(i).val(invenTr.comma($("#currentInven" + e).val()));
            return;
        }
    },

    setInvenTransferReg : function(){
        if($(".itransInfo").length == 0){
            alert("저장할 항목이 없습니다.");
            return;
        }

        var flag = true;
        $.each($(".itransInfo"), function(i, v){

            if(!$(this).find("#invenSn" + i).val() || !$(this).find("#masterSn" + i).val() || !$(this).find("#itemNo" + i).val() || !$(this).find("#itemName" + i).val() || !$(this).find("#currentInven" + i).val()
                || !$(this).find("#forwardingWhCd" + i).val() || !$(this).find("#transferQty" + i).val() || !$(this).find("#receivingWhCd" + i).val()){
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
            var newRateArr = new Array();
            var oldRateArr = new Array();

            $.each($(".itransInfo"), function(i, v){
                var arrData = {
                    transferType : $(this).find("#transferType" + i).val(),
                    forwardingDate : $("#forwardingDate").val(),
                    forwarder : $("#regEmpSeq").val(),
                    invenTransSn : $(this).find("#invenTransSn" + i).val(),
                    invenSn : $(this).find("#invenSn" + i).val(),
                    masterSn : $(this).find("#masterSn" + i).val(),
                    currentInven : $(this).find("#currentInven" + i).val(),
                    transferQty : invenTr.uncomma($(this).find("#transferQty" + i).val()),
                    forwardingWhCd : $(this).find("#forwardingWhCd" + i).val(),
                    receivingWhCd : $(this).find("#transferType" + i).val() == "S" ? null : $(this).find("#receivingWhCd" + i).val(),
                    rmk : $(this).find("#rmk" + i).val(),
                    empSeq : $("#regEmpSeq").val()
                }

                if($(this).hasClass("newItransInfo")){
                    newRateArr.push(arrData);
                }else{
                    oldRateArr.push(arrData);
                }
            })

            invenTr.global.saveAjaxData = {
                newRateArr : JSON.stringify(newRateArr),
                oldRateArr : JSON.stringify(oldRateArr)
            }

            var result = customKendo.fn_customAjax("/item/setInvenTransferReg.do", invenTr.global.saveAjaxData)
            if(result.flag){
                alert("저장되었습니다.");
                invenTr.global.invenTransferIndex = 0;
                $("#listTb tr").remove();
                invenTr.addRow('new');
            }
        }
    },

    fn_popCamItemList : function (invenSnIndex){
        invenTr.global.invenSnIndex = invenSnIndex;

        var url = "/item/pop/popItemInvenList.do";
        var name = "_blank";
        var option = "width = 1300, height = 670, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    itemInfoChange : function(){
        $("#invenSn" + invenTr.global.invenSnIndex).val($("#invenSn").val())
        $("#masterSn" + invenTr.global.invenSnIndex).val($("#masterSn").val())
        $("#itemNo" + invenTr.global.invenSnIndex).val($("#itemNo").val())
        $("#itemName" + invenTr.global.invenSnIndex).val($("#itemName").val())
        $("#currentInven" + invenTr.global.invenSnIndex).val($("#currentInven").val())
        $("#forwardingWhCd" + invenTr.global.invenSnIndex).val($("#whCd").val())
        $("#forwardingWhCdTxt" + invenTr.global.invenSnIndex).val($("#whCdNm").val())

        $("#invenSn").val("")
        $("#masterSn").val("")
        $("#itemNo").val("")
        $("#itemName").val("")
        $("#currentInven").val("")
        $("#whCd").val("")
        $("#whCdNm").val("")
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
