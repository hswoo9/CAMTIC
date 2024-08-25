var sdupR = {

    global : {
        sdUpIndex : 0,
        saveAjaxData : {},
        dropDownDataSource : "",
    },

    fn_defaultScript : function(){
        sdupR.setMakeTable();

        $("#checkAll").click(function(){
            if($(this).is(":checked")) $("input[name=masterSdUpSn]").prop("checked", true);
            else $("input[name=masterSdUpSn]").prop("checked", false);
        });
    },

    setMakeTable : function() {
        sdupR.global.searchAjaxData = {
            masterSn : $("#masterSn").val(),
        }

        var result = customKendo.fn_customAjax("/item/getSdunitPriceList.do", sdupR.global.searchAjaxData);
        if(result.flag){
            var list = result.list;
            $("#listTb tr").remove();
            if(list.length == 0){
                sdupR.addRow('new');
            }else{
                for(var i = 0; i < list.length; i++){
                    sdupR.addRow('old');

                    $("#sdup" + i).find("#masterSdUpSn" + i).val(list[i].MASTER_SD_UP_SN);
                    $("#sdup" + i).find("#num" + i).text(i + 1);
                    $("#sdup" + i).find("#unitPrice" + i).val(sdupR.comma(list[i].UNIT_PRICE));
                    $("#sdup" + i).find("#b2bPrice1" + i).val(sdupR.comma(list[i].B2B_PRICE));
                    $("#sdup" + i).find("#b2bPrice2" + i).val(sdupR.comma(list[i].B2B_PRICE2));
                    $("#sdup" + i).find("#b2bPrice3" + i).val(sdupR.comma(list[i].B2B_PRICE3));
                    $("#sdup" + i).find("#b2bPrice4" + i).val(sdupR.comma(list[i].B2B_PRICE4));
                    $("#sdup" + i).find("#b2bPrice5" + i).val(sdupR.comma(list[i].B2B_PRICE5));
                    $("#sdup" + i).find("#startDt" + i).val(list[i].START_DT)
                    $("#sdup" + i).find("#endDt" + i).text(list[i].END_DT)
                    $("#sdup" + i).find("#rmk" + i).val(list[i].RMK);
                }

                sdupR.addRow('new');
            }
        }
    },

    addRow : function(e){
        var html = "";

        html = "" +
            '<tr class="sdupInfo ' + e + 'SdupInfo" id="sdup' + sdupR.global.sdUpIndex + '">' +
                '<td>';
        if(e == "old"){
            html += '<input type="checkbox" id="masterSdUpSn' + sdupR.global.sdUpIndex + '" class="masterSdUpSn" name="masterSdUpSn">';
        }

        html += '</td>' +
                '<td style="text-align: center">';
        if(e == "old"){
            html += '<span id="num' + sdupR.global.sdUpIndex + '"></span>';
        }

        html += '</td>' +
                '<td style="text-align: right;">' +
                    '<span id="costPrice' + sdupR.global.sdUpIndex + '">' + comma($("#costPrice").val()) + '</span>' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="unitPrice' + sdupR.global.sdUpIndex + '" class="numberInput unitPrice" style="text-align: right" value="' + ($(".oldSdupInfo").length == 0 ? comma($("#unitPrice").val()) : '') + '"/>' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="b2bPrice1' + sdupR.global.sdUpIndex + '" class="numberInput b2bPrice1" style="text-align: right" value="' + ($(".oldSdupInfo").length == 0 ? comma($("#b2bPrice1").val()) : '') + '"/>' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="b2bPrice2' + sdupR.global.sdUpIndex + '" class="numberInput b2bPrice2" style="text-align: right" value="' + ($(".oldSdupInfo").length == 0 ? comma($("#b2bPrice2").val()) : '') + '"/>' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="b2bPrice3' + sdupR.global.sdUpIndex + '" class="numberInput b2bPrice3" style="text-align: right" value="' + ($(".oldSdupInfo").length == 0 ? comma($("#b2bPrice3").val()) : '') + '"/>' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="b2bPrice4' + sdupR.global.sdUpIndex + '" class="numberInput b2bPrice4" style="text-align: right" value="' + ($(".oldSdupInfo").length == 0 ? comma($("#b2bPrice4").val()) : '') + '"/>' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="b2bPrice5' + sdupR.global.sdUpIndex + '" class="numberInput b2bPrice5" style="text-align: right" value="' + ($(".oldSdupInfo").length == 0 ? comma($("#b2bPrice5").val()) : '') + '"/>' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="startDt' + sdupR.global.sdUpIndex + '" name="startDt' + sdupR.global.sdUpIndex + '">' +
                '</td>' +
                '<td style="text-align: center">';
        if(e == "old"){
            html += '<span id="endDt' + sdupR.global.sdUpIndex + '" name="endDt' + sdupR.global.sdUpIndex + '"></span>';
        }
        html += '</td>' +
                '<td>' +
                    '<input type="text" id="rmk' + sdupR.global.sdUpIndex + '" name="rmk' + sdupR.global.sdUpIndex + '">' +
                '</td>' +
            '</tr>';

        $("#listTb").append(html);


        customKendo.fn_textBox(["unitPrice" + sdupR.global.sdUpIndex, "b2bPrice1" + sdupR.global.sdUpIndex, "b2bPrice2" + sdupR.global.sdUpIndex
            , "b2bPrice3" + sdupR.global.sdUpIndex, "b2bPrice4" + sdupR.global.sdUpIndex, "b2bPrice5" + sdupR.global.sdUpIndex, "rmk" + sdupR.global.sdUpIndex]);

        $(".numberInput").keyup(function(){
            $(this).val(sdupR.comma(sdupR.uncomma($(this).val())));
        });

        customKendo.fn_datePicker("startDt" + sdupR.global.sdUpIndex, '', "yyyy-MM-dd", new Date());

        sdupR.global.sdUpIndex++;
    },

    delRow : function(e){
        if($("input[name='masterSdUpSn']:checked").length == 0){
            alert("삭제할 항목을 선택해주세요.");
            return;
        }

        if(confirm("삭제하시겠습니까?\n삭제한 데이터는 복구 할 수 없습니다.")){
            var masterSdUpSn = "";

            $.each($("input[name='masterSdUpSn']:checked"), function(){
                masterSdUpSn += "," + $(this).val()
            })

            sdupR.global.saveAjaxData = {
                masterSdUpSn : masterSdUpSn.substring(1),
            }

            var result = customKendo.fn_customAjax("/item/setSdUnitPriceDel.do", sdupR.global.saveAjaxData);
            if(result.flag){
                alert("처리되었습니다.");
                sdupR.global.sdUpIndex = 0;
                sdupR.setMakeTable();
            }
        }
    },

    setSdUnitPriceReg : function(){
        if($(".sdupInfo").length == 0){
            alert("저장할 항목이 없습니다.");
            return;
        }

        if(confirm("저장하시겠습니까?")){
            var oldArr = new Array();

            $.each($(".sdupInfo"), function(i, v){
                var arrData = {
                    masterSdUpSn : $(this).find("#masterSdUpSn" + i).val(),
                    masterSn : $("#masterSn").val(),
                    unitPrice : sdupR.uncomma($(this).find("#unitPrice" + i).val()),
                    b2bPrice : sdupR.uncomma($(this).find("#b2bPrice1" + i).val()),
                    b2bPrice2 : sdupR.uncomma($(this).find("#b2bPrice2" + i).val()),
                    b2bPrice3 : sdupR.uncomma($(this).find("#b2bPrice3" + i).val()),
                    b2bPrice4 : sdupR.uncomma($(this).find("#b2bPrice4" + i).val()),
                    b2bPrice5 : sdupR.uncomma($(this).find("#b2bPrice5" + i).val()),
                    startDt : $(this).find("#startDt" + i).val(),
                    rmk : $(this).find("#rmk" + i).val(),
                    empSeq : $("#empSeq").val(),
                    empName : $("#empName").val(),
                }

                if($(this).hasClass("newSdupInfo")){
                    if($(this).find("#unitPrice" + i).val()){
                        arrData.newData = "Y"
                        sdupR.global.saveAjaxData = arrData;
                    }
                }else{
                    oldArr.push(arrData);
                }
            })

            $.each($("input.unitPrice"), function(){
                if($(this).val() != ""){
                    sdupR.global.saveAjaxData.lastUnitPrice = uncomma($(this).val())
                }
            })

            $.each($("input.b2bPrice"), function(){
                if($(this).val() != ""){
                    sdupR.global.saveAjaxData.lastB2bPrice = uncomma($(this).val())
                }
            })


            sdupR.global.saveAjaxData.oldArr = JSON.stringify(oldArr)
            sdupR.global.saveAjaxData.empSeq = $("#empSeq").val();
            sdupR.global.saveAjaxData.masterSn = $("#masterSn").val();

            var result = customKendo.fn_customAjax("/item/setSdUnitPriceReg.do", sdupR.global.saveAjaxData)
            if(result.flag){
                alert("저장되었습니다.");
                // sdupR.global.sdUpIndex = 0;
                // sdupR.setMakeTable();
                location.reload();
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
