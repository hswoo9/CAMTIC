var ciupR = {

    global : {
        ciupIndex : 0,
        saveAjaxData : {},
        dropDownDataSource : "",
        costPrice: "",
    },

    fn_defaultScript : function(){
        ciupR.setMakeTable();

        $("#checkAll").click(function(){
            if($(this).is(":checked")) $("input[name=ciupSn]").prop("checked", true);
            else $("input[name=ciupSn]").prop("checked", false);
        });
    },

    setMakeTable : function() {
        ciupR.global.searchAjaxData = {
            crmItemSn : $("#crmItemSn").val(),
            masterSn : $("#masterSn").val()
        }

        var firstRowUrl = "/item/getSdunitPriceList.do";
        var otherRowsUrl = "/item/getCrmItemUnitPriceList.do";

        var firstRowResult = customKendo.fn_customAjax(firstRowUrl, ciupR.global.searchAjaxData);

        var otherRowsResult = null;
        if ($("#crmItemSn").val() !== "") {
            otherRowsResult = customKendo.fn_customAjax(otherRowsUrl, ciupR.global.searchAjaxData);
        }

        $("#listTb tr").remove();

        if (firstRowResult.flag && firstRowResult.list.length > 0) {
            ciupR.addRow('old');
            console.log("firstRowResult", firstRowResult);
            var firstRowData = firstRowResult.list[firstRowResult.list.length - 1];
            console.log("firstRowData", firstRowData);
            $("#ciup0").find("#ciupSn0").val(firstRowData.CRM_ITEM_UNIT_PRICE_SN);
            $("#ciup0").find("#num0").text(1);
            $("#ciup0").find("#unitPrice0").val(ciupR.comma(firstRowData.UNIT_PRICE));
            $("#ciup0").find("#b2bPrice10").val(ciupR.comma(firstRowData.B2B_PRICE));
            $("#ciup0").find("#b2bPrice20").val(ciupR.comma(firstRowData.B2B_PRICE2));
            $("#ciup0").find("#b2bPrice30").val(ciupR.comma(firstRowData.B2B_PRICE3));
            $("#ciup0").find("#b2bPrice40").val(ciupR.comma(firstRowData.B2B_PRICE4));
            $("#ciup0").find("#b2bPrice50").val(ciupR.comma(firstRowData.B2B_PRICE5));
            $("#ciup0").find("#startDt0").val(firstRowData.START_DT);
            $("#ciup0").find("#endDt0").text(firstRowData.END_DT);
            $("#ciup0").find("#rmk0").val(firstRowData.RMK);
        } else {
            ciupR.addRow('new');
        }

        if (otherRowsResult && otherRowsResult.flag) {
            var list = otherRowsResult.list;
            for (var i = 0; i < list.length; i++) {
                ciupR.addRow('old');
                var index = i + 1;
                $("#ciup" + index).find("#ciupSn" + index).val(list[i].CRM_ITEM_UNIT_PRICE_SN);
                $("#ciup" + index).find("#num" + index).text(index + 1);
                $("#ciup" + index).find("#unitPrice" + index).val(ciupR.comma(list[i].UNIT_PRICE));
                $("#ciup" + index).find("#b2bPrice1" + index).val(ciupR.comma(list[i].B2B_PRICE));
                $("#ciup" + index).find("#b2bPrice2" + index).val(ciupR.comma(list[i].B2B_PRICE2));
                $("#ciup" + index).find("#b2bPrice3" + index).val(ciupR.comma(list[i].B2B_PRICE3));
                $("#ciup" + index).find("#b2bPrice4" + index).val(ciupR.comma(list[i].B2B_PRICE4));
                $("#ciup" + index).find("#b2bPrice5" + index).val(ciupR.comma(list[i].B2B_PRICE5));
                $("#ciup" + index).find("#startDt" + index).val(list[i].START_DT);
                $("#ciup" + index).find("#endDt" + index).text(list[i].END_DT);
                $("#ciup" + index).find("#rmk" + index).val(list[i].RMK);
            }
        }

        ciupR.addRow('new');
    },

    addRow : function(e){
        var html = "";

        html = "" +
            '<tr class="ciupInfo ' + e + 'CiupInfo" id="ciup' + ciupR.global.ciupIndex + '">' +
                '<td>';
        if(e == "old"){
            html += '<input type="checkbox" id="ciupSn' + ciupR.global.ciupIndex + '" class="ciupSn" name="ciupSn">';
        }

        html += '</td>' +
            '<td style="text-align: center">';
        if(e == "old"){
            html += '<span id="num' + ciupR.global.ciupIndex + '"></span>';
        }

        html += '</td>' +
                '<td style="text-align: right;">' +
                    '<span id="costPrice' + ciupR.global.ciupIndex + '">' + comma($("#unitPrice").val()) + '</span>' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="unitPrice' + ciupR.global.ciupIndex + '" class="numberInput" style="text-align: right" value="' + ($(".oldCiupInfo").length == 0 ? comma($("#unitPrice").val()) : '') + '"/>' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="b2bPrice1' + ciupR.global.ciupIndex + '" class="numberInput" style="text-align: right" value="' + ($(".oldCiupInfo").length == 0 ? comma($("#b2bPrice1").val()) : '') + '"/>' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="b2bPrice2' + ciupR.global.ciupIndex + '" class="numberInput" style="text-align: right" value="' + ($(".oldCiupInfo").length == 0 ? comma($("#b2bPrice2").val()) : '') + '"/>' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="b2bPrice3' + ciupR.global.ciupIndex + '" class="numberInput" style="text-align: right" value="' + ($(".oldCiupInfo").length == 0 ? comma($("#b2bPrice3").val()) : '') + '"/>' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="b2bPrice4' + ciupR.global.ciupIndex + '" class="numberInput" style="text-align: right" value="' + ($(".oldCiupInfo").length == 0 ? comma($("#b2bPrice4").val()) : '') + '"/>' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="b2bPrice5' + ciupR.global.ciupIndex + '" class="numberInput" style="text-align: right" value="' + ($(".oldCiupInfo").length == 0 ? comma($("#b2bPrice5").val()) : '') + '"/>' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="startDt' + ciupR.global.ciupIndex + '" name="startDt' + ciupR.global.ciupIndex + '">' +
                '</td>' +
                '<td style="text-align: center">';
        if(e == "old"){
            html += '<span id="endDt' + ciupR.global.ciupIndex + '" name="endDt' + ciupR.global.ciupIndex + '"></span>';
        }
        html += '</td>' +
                '<td>' +
                    '<input type="text" id="rmk' + ciupR.global.ciupIndex + '" name="rmk' + ciupR.global.ciupIndex + '">' +
                '</td>' +
            '</tr>';

        $("#listTb").append(html);


        customKendo.fn_textBox(["unitPrice" + ciupR.global.ciupIndex, "b2bPrice1" + ciupR.global.ciupIndex, "b2bPrice2" + ciupR.global.ciupIndex,
            "b2bPrice3" + ciupR.global.ciupIndex, "b2bPrice4" + ciupR.global.ciupIndex, "b2bPrice5" + ciupR.global.ciupIndex, "rmk" + ciupR.global.ciupIndex]);

        $(".numberInput").keyup(function(){
            $(this).val(ciupR.comma(ciupR.uncomma($(this).val())));
        });

        customKendo.fn_datePicker("startDt" + ciupR.global.ciupIndex, '', "yyyy-MM-dd", new Date());

        ciupR.global.ciupIndex++;
    },

    delRow : function(e){
        if($("input[name='ciupSn']:checked").length == 0){
            alert("삭제할 항목을 선택해주세요.");
            return;
        }

        if(confirm("삭제하시겠습니까?\n삭제한 데이터는 복구 할 수 없습니다.")){
            var ciupSn = "";

            $.each($("input[name='ciupSn']:checked"), function(){
                ciupSn += "," + $(this).val()
            })

            ciupR.global.saveAjaxData = {
                ciupSn : ciupSn.substring(1),
            }

            var result = customKendo.fn_customAjax("/item/setCrmItemUnitPriceDel.do", ciupR.global.saveAjaxData);
            if(result.flag){
                alert("처리되었습니다.");
                ciupR.global.ciupIndex = 0;
                ciupR.setMakeTable();
            }
        }
    },

    setCiUnitPriceReg : function(){
        if($(".ciupInfo").length == 0){
            alert("저장할 항목이 없습니다.");
            return;
        }

        if(confirm("저장하시겠습니까?")){
            var oldArr = new Array();

            $.each($(".ciupInfo"), function(i, v){
                var arrData = {
                    ciupSn : $(this).find("#ciupSn" + i).val(),
                    crmItemSn : $("#crmItemSn").val(),
                    unitPrice : ciupR.uncomma($(this).find("#unitPrice" + i).val()),
                    b2bPrice : ciupR.uncomma($(this).find("#b2bPrice1" + i).val()),
                    b2bPrice2 : ciupR.uncomma($(this).find("#b2bPrice2" + i).val()),
                    b2bPrice3 : ciupR.uncomma($(this).find("#b2bPrice3" + i).val()),
                    b2bPrice4 : ciupR.uncomma($(this).find("#b2bPrice4" + i).val()),
                    b2bPrice5 : ciupR.uncomma($(this).find("#b2bPrice5" + i).val()),
                    startDt : $(this).find("#startDt" + i).val(),
                    rmk : $(this).find("#rmk" + i).val(),
                    empSeq : $("#empSeq").val(),
                    empName : $("#empName").val(),
                }

                if($(this).hasClass("newCiupInfo")){
                    if($(this).find("#unitPrice" + i).val()){
                        arrData.newData = "Y"
                        ciupR.global.saveAjaxData = arrData;
                    }
                }else{
                    oldArr.push(arrData);
                }
            })
            ciupR.global.saveAjaxData.empSeq = $("#empSeq").val();
            ciupR.global.saveAjaxData.crmSn = $("#crmSn").val();
            ciupR.global.saveAjaxData.masterSn = $("#masterSn").val();
            ciupR.global.saveAjaxData.busClass = $("#busClass").val();
            ciupR.global.saveAjaxData.crmItemSn = $("#crmItemSn").val();
            ciupR.global.saveAjaxData.oldArr = JSON.stringify(oldArr)


            var result = customKendo.fn_customAjax("/item/setCrmItemUnitPriceReg.do", ciupR.global.saveAjaxData)
            if(result.flag){
                alert("저장되었습니다.");
                // ciupR.global.ciupIndex = 0;
                // ciupR.setMakeTable();
                location.href = "/item/pop/popCrmItemUnitPriceReg.do?crmSn=" + $("#crmSn").val() + "&crmItemSn=" + result.params.crmItemSn + "&masterSn=" + $("#masterSn").val() + "&busClass=" + $("#busClass").val()
                opener.parent.gridReload();

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
