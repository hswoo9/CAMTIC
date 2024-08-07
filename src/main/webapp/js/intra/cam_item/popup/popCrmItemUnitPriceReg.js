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
        }

        var result = customKendo.fn_customAjax("/item/getCrmItemUnitPriceList.do", ciupR.global.searchAjaxData);
        if(result.flag){
            var list = result.list;
            $("#listTb tr").remove();
            if(list.length == 0){
                ciupR.addRow('new');
            }else{
                for(var i = 0; i < list.length; i++){
                    ciupR.addRow('old');

                    $("#ciup" + i).find("#ciupSn" + i).val(list[i].CRM_ITEM_UNIT_PRICE_SN);
                    $("#ciup" + i).find("#unitPrice" + i).val(ciupR.comma(list[i].UNIT_PRICE));
                    $("#ciup" + i).find("#b2bPrice" + i).val(ciupR.comma(list[i].B2B_PRICE));
                    $("#ciup" + i).find("#startDt" + i).val(list[i].START_DT)
                    $("#ciup" + i).find("#endDt" + i).text(list[i].END_DT)
                    $("#ciup" + i).find("#rmk" + i).val(list[i].RMK);
                }

                ciupR.addRow('new');
            }
        }
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
                '<td style="text-align: right;">' +
                    '<span id="costPrice' + ciupR.global.ciupIndex + '">' + comma($("#costPrice").val()) + '</span>' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="unitPrice' + ciupR.global.ciupIndex + '" class="numberInput" style="text-align: right" value="' + ($(".oldCiupInfo").length == 0 ? comma($("#unitPrice").val()) : '') + '"/>' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="b2bPrice' + ciupR.global.ciupIndex + '" class="numberInput" style="text-align: right" value="' + ($(".oldCiupInfo").length == 0 ? comma($("#b2bPrice").val()) : '') + '"/>' +
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


        customKendo.fn_textBox(["unitPrice" + ciupR.global.ciupIndex, "b2bPrice" + ciupR.global.ciupIndex, "rmk" + ciupR.global.ciupIndex]);

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
                    b2bPrice : ciupR.uncomma($(this).find("#b2bPrice" + i).val()),
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
