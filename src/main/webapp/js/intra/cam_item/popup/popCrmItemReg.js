var cir = {

    global : {
        itemNoIndex : 0,
        saveAjaxData : "",
        dropDownDataSource : "",
    },

    fn_defaultScript : function(){
        cir.setMakeTable();

        $("#checkAll").click(function(){
            if($(this).is(":checked")) $("input[name=crmItemSn]").prop("checked", true);
            else $("input[name=crmItemSn]").prop("checked", false);
        });
    },

    crmItemExcelFormDown : function(){
        kendo.saveAs({
            dataURI: "/item/receivingExcelFormDown.do"
        });
    },

    setMakeTable : function() {
        cir.global.searchAjaxData = {
            crmSn : $("#crmSn").val(),
        }

        var result = customKendo.fn_customAjax("/item/getCrmItemManageList.do", cir.global.searchAjaxData);
        if(result.flag){
            var list = result.list;
            $("#listTb tr").remove();
            if(list.length == 0){
                cir.addRow('new');
            }else{
                for(var i = 0; i < list.length; i++){
                    cir.addRow('old');
                    $("#cir" + i).find("#crmItemSn" + i).val(list[i].CRM_ITEM_SN)
                    $("#cir" + i).find("#masterSn" + i).val(list[i].MASTER_SN)
                    $("#cir" + i).find("#itemNo" + i).val(list[i].ITEM_NO)
                    $("#cir" + i).find("#itemName" + i).val(list[i].ITEM_NAME)
                    $("#cir" + i).find("#crmItemNo" + i).val(list[i].CRM_ITEM_NO)
                    $("#cir" + i).find("#crmItemName" + i).val(list[i].CRM_ITEM_NAME)
                    $("#cir" + i).find("#busClass" + i).val(list[i].BUS_CLASS);
                    $("#cir" + i).find("#active" + i).val(list[i].ACTIVE);
                }

                cir.addRow('new');
            }
        }
    },

    addRow : function(e){
        var html = "";

        html = "" +
            '<tr class="cirInfo ' + e + 'CirInfo" id="cir' + cir.global.itemNoIndex + '">' +
                '<td>';
        if(e == "old"){
            html += '<input type="checkbox" id="crmItemSn' + cir.global.itemNoIndex + '" class="crmItemSn" name="crmItemSn">';
        }

        html += '</td>' +
                '<td>' +
                    '<input type="hidden" id="masterSn' + cir.global.itemNoIndex + '" class="masterSn">' +
                    '<input type="text" id="itemNo' + cir.global.itemNoIndex + '" class="k-input k-textbox itemNo" readonly style="width: 78%" onclick="cir.fn_popItemNoList(' + cir.global.itemNoIndex + ');"/>' +
                    '<button type="button" id="crmSelBtn' + cir.global.itemNoIndex + '" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onClick="cir.fn_popItemNoList(' + cir.global.itemNoIndex + ');">선택</button>' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="itemName' + cir.global.itemNoIndex + '" class="k-input k-textbox" onclick="cir.fn_popItemNoList(' + cir.global.itemNoIndex + ');" readonly name="itemName' + cir.global.itemNoIndex + '">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="crmItemNo' + cir.global.itemNoIndex + '" class="k-input k-textbox crmItemNo" name="crmItemNo' + cir.global.itemNoIndex + '">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="crmItemName' + cir.global.itemNoIndex + '" class="k-input k-textbox crmItemName" name="crmItemName' + cir.global.itemNoIndex + '">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="busClass' + cir.global.itemNoIndex + '" class="busClass" name="busClass' + cir.global.itemNoIndex + '">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="active' + cir.global.itemNoIndex + '" class="active" name="active' + cir.global.itemNoIndex + '">' +
                '</td>' +
            '</tr>';

        $("#listTb").append(html);

        cir.global.dropDownDataSource = [
            {text : "입고", value : "W"},
            {text : "출고", value : "R"},
        ]
        customKendo.fn_dropDownList("busClass" + cir.global.itemNoIndex, cir.global.dropDownDataSource, "text", "value", 3);

        cir.global.dropDownDataSource = [
            {text : "사용", value : "Y"},
            {text : "미사용", value : "N"},
        ]
        customKendo.fn_dropDownList("active" + cir.global.itemNoIndex, cir.global.dropDownDataSource, "text", "value", 3);

        cir.global.itemNoIndex++;
    },

    delRow : function(e){
        if($("input[name='crmItemSn']:checked").length == 0){
            alert("삭제할 항목을 선택해주세요.");
            return;
        }

        if(confirm("삭제하시겠습니까?\n삭제한 데이터는 복구 할 수 없습니다.")){
            var crmItemSn = "";

            $.each($("input[name='crmItemSn']:checked"), function(){
                crmItemSn += "," + $(this).val()
            })

            cir.global.saveAjaxData = {
                crmItemSn : crmItemSn.substring(1),
            }

            var result = customKendo.fn_customAjax("/item/setCrmItemManageDel.do", cir.global.saveAjaxData);
            if(result.flag){
                alert("처리되었습니다.");
                cir.global.itemNoIndex = 0;
                cir.setMakeTable();
            }
        }
    },

    fileChange : function(e){
        var file = $(e)[0].files[0];
        var fileExt = file.name.split(".")[file.name.split(".").length - 1];

        if($.inArray(fileExt, ['xls', 'xlsx']) == -1){
            alert("xls, xlsx 확장자만 업로드할 수 있습니다.");
            $(e).val("");
            return;
        }else{
            var formData = new FormData();
            formData.append("file", $("#file")[0].files[0]);
            formData.append("empSeq", $("#regEmpSeq").val());

            if(confirm("엑셀을 업로드 하시겠습니까?")){
                var result = customKendo.fn_customFormDataAjax("/item/receivingExcelUpload.do", formData);
                if(result.flag){
                    var list = result.list;
                    for(var i = 0; i < list.length; i++){
                        if(i > 0){
                            cir.addRow('new');
                        }

                        $("#wh" + i).find("#crmSn" + i).val(list[i].crmSn);
                        $("#wh" + i).find("#crmNm" + i).val(list[i].crmNm);
                        $("#wh" + i).find("#masterSn" + i).val(list[i].masterSn);
                        $("#wh" + i).find("#itemNo" + i).val(list[i].itemNo);
                        $("#wh" + i).find("#itemName" + i).val(list[i].itemName);
                        $("#wh" + i).find("#whType" + i).data("kendoDropDownList").value(list[i].whType);
                        $("#wh" + i).find("#whVolume" + i).val(cir.comma(list[i].whVolume));
                        $("#wh" + i).find("#whWeight" + i).val(cir.comma(list[i].whWeight));
                        $("#wh" + i).find("#unitPrice" + i).val(cir.comma(list[i].unitPrice));
                        $("#wh" + i).find("#amt" + i).val(cir.comma(list[i].amt));
                        $("#wh" + i).find("#whCd" + i).data("kendoDropDownList").value(list[i].whCd);
                        $("#wh" + i).find("#rmk" + i).val(list[i].rmk);
                    }
                }
            }
        }
    },

    setReceivingReg : function(){
        if($(".cirInfo").length == 0){
            alert("저장할 항목이 없습니다.");
            return;
        }

        var flag = true;
        $.each($(".cirInfo"), function(i, v){
            if($(this).hasClass("newCirInfo")){
                if($(this).find("#masterSn" + i).val() && (!$(this).find("#crmItemNo" + i).val() || !$(this).find("#crmItemName" + i).val()
                    || !$(this).find("#busClass" + i).val() || !$(this).find("#active" + i).val())){
                    flag = false;
                }
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
            var newArr = new Array();
            var oldArr = new Array();

            $.each($(".cirInfo"), function(i, v){
                if($(this).find("#masterSn" + i).val()){
                    var arrData = {
                        crmItemSn : $(this).find("#crmItemSn" + i).val(),
                        masterSn : $(this).find("#masterSn" + i).val(),
                        crmItemNo : $(this).find("#crmItemNo" + i).val(),
                        crmItemName : $(this).find("#crmItemName" + i).val(),
                        busClass : $(this).find("#busClass" + i).val(),
                        active : $(this).find("#active" + i).val(),
                        crmSn : $("#crmSn").val(),
                        empSeq : $("#empSeq").val()
                    }

                    if($(this).hasClass("newCirInfo")){
                        newArr.push(arrData);
                    }else{
                        oldArr.push(arrData);
                    }
                }
            })

            cir.global.saveAjaxData = {
                newArr : JSON.stringify(newArr),
                oldArr : JSON.stringify(oldArr)
            }

            var result = customKendo.fn_customAjax("/item/setCrmItemManage.do", cir.global.saveAjaxData)
            if(result.flag){
                alert("저장되었습니다.");
                cir.global.itemNoIndex = 0;
                cir.setMakeTable();
            }
        }
    },

    fn_popItemNoList : function (masterSnIndex){
        cir.global.masterSnIndex = masterSnIndex;

        var url = "/item/pop/popItemNoList.do?target=crmItem&crmSn=" + $("#crmSn").val();
        var name = "_blank";
        var option = "width = 1300, height = 670, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    masterSnChange : function(){
        $("#masterSn" + cir.global.masterSnIndex).val($("#masterSn").val())
        $("#itemNo" + cir.global.masterSnIndex).val($("#itemNo").val())
        $("#itemName" + cir.global.masterSnIndex).val($("#itemName").val())

        $("#masterSn").val("")
        $("#itemNo").val("")
        $("#itemName").val("")
    },
}
