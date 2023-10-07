var invenTr = {
    
    global : {
        invenTransferIndex : 0,
        invenSnIndex : "",
        now : new Date(),
        saveAjaxData : "",
        wTDataSource : "",
        wCDataSource : "",
    },
    
    fn_defaultScript : function(){
        invenTr.global.wCDataSource = customKendo.fn_customAjax("/item/smCodeList", {grpSn : "WC", lgCd : "WH"});

        // invenTr.setMakeTable();
    },

    invenTransferExcelFormDown : function(){
        kendo.saveAs({
            dataURI: "/item/invenTransferExcelFormDown.do"
        });
    },

    setMakeTable : function() {
        var result = customKendo.fn_customAjax("/item/getItemWhInfoList.do", invenTr.global.searchAjaxData);
        if(result.flag){
            var list = result.list;
            $("#listTb tr").remove();
            for(var i = 0; i < list.length; i++){
                invenTr.addRow('old');

                $("#wh" + i).find("#itemWhSn" + i).val(list[i].ITEM_WH_SN)
                $("#wh" + i).find("#itemNo" + i).val(list[i].ITEM_NO)
                $("#wh" + i).find("#itemName" + i).val(list[i].ITEM_NAME)
                $("#wh" + i).find("#whType" + i).data("kendoDropDownList").value(list[i].WH_TYPE)
                $("#wh" + i).find("#whVolume" + i).val(invenTr.comma(list[i].WH_VOLUME))
                $("#wh" + i).find("#whWeight" + i).val(invenTr.comma(list[i].WH_WEIGHT))
                $("#wh" + i).find("#unitPrice" + i).val(invenTr.comma(list[i].UNIT_PRICE))
                $("#wh" + i).find("#amt" + i).val(invenTr.comma(list[i].AMT))
                $("#wh" + i).find("#whCd" + i).data("kendoDropDownList").value(list[i].WH_CD)
                $("#wh" + i).find("#rmk" + i).val(list[i].RMK)

            }
        }
    },

    addRow : function(e){
        var html = "";

        html = "" +
            '<tr class="itransInfo ' + e + 'ItransInfo" id="it' + invenTr.global.invenTransferIndex + '">' +
                '<td style="text-align: right">' +
                    '<input type="hidden" id="invenTransSn' + invenTr.global.invenTransferIndex + '" class="invenTransSn">' +
                    '<input type="hidden" id="invenSn' + invenTr.global.invenTransferIndex + '" class="invenSn">' +
                    '<input type="hidden" id="itemNo' + invenTr.global.invenTransferIndex + '" class="itemNo">' +
                    '<input type="hidden" id="itemName' + invenTr.global.invenTransferIndex + '" class="itemName">' +
                    '<input type="hidden" id="currentInven' + invenTr.global.invenTransferIndex + '" class="currentInven">' +
                    '<input type="hidden" id="forwardingWhCd' + invenTr.global.invenTransferIndex + '" class="forwardingWhCd">' +
                    '<div id="itemNoTxt' + invenTr.global.invenTransferIndex + '" class="itemNoTxt" style="float: left;margin-top: 5px;"></div>' +
                    '<button type="button" id="itemSelBtn' + invenTr.global.invenTransferIndex + '" class="itemSelBtn k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onClick="invenTr.fn_popCamItemList(' + invenTr.global.invenTransferIndex + ');">선택</button>' +
                '</td>' +
                '<td>' +
                    '<span id="itemNameTxt' + invenTr.global.invenTransferIndex + '" class="itemNameTxt"></span>' +
                '</td>' +
                '<td style="text-align: right">' +
                    '<span id="currentInvenTxt' + invenTr.global.invenTransferIndex + '" class="currentInvenTxt"></span>' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="transferQty' + invenTr.global.invenTransferIndex + '" class="transferQty numBerInput" style="text-align: right" value="0" oninput="invenTr.maxCurrentInvenChk(this, ' + invenTr.global.invenTransferIndex + ')">' +
                '</td>' +
                '<td>' +
                    '<span id="forwardingWhCdTxt' + invenTr.global.invenTransferIndex + '" class="forwardingWhCdTxt"></span>' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="receivingWhCd' + invenTr.global.invenTransferIndex + '" class="receivingWhCd">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="rmk' + invenTr.global.invenTransferIndex + '" class="rmk">' +
                '</td>' +
                '<td>' +
                    '<button type="button" class="k-button k-button-solid-error inventransNum" inventransNum="' + invenTr.global.invenTransferIndex + '" onclick="invenTr.delRow(this)">삭제</button>' +
                '</td>' +
            '</tr>';

        $("#listTb").append(html);

        customKendo.fn_textBox(["transferQty" + invenTr.global.invenTransferIndex, "rmk" + invenTr.global.invenTransferIndex])

        $(".numBerInput").keyup(function(){
            $(this).val(invenTr.comma(invenTr.uncomma($(this).val())));
        });

        customKendo.fn_dropDownList("receivingWhCd" + invenTr.global.invenTransferIndex, invenTr.global.wCDataSource, "ITEM_CD_NM", "ITEM_CD", 3);

        invenTr.global.invenTransferIndex++;
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
            $(this).find(".invenTransSn").attr("id", "invenTransSn" + i);
            $(this).find(".invenSn").attr("id", "invenSn" + i);
            $(this).find(".itemNo").attr("id", "itemNo" + i);
            $(this).find(".itemName").attr("id", "itemName" + i);
            $(this).find(".currentInven").attr("id", "currentInven" + i);
            $(this).find(".forwardingWhCd").attr("id", "forwardingWhCd" + i);
            $(this).find(".itemNoTxt").attr("id", "itemNoTxt" + i);

            $(this).find(".itemSelBtn").attr("id", "itemSelBtn" + i);
            $(this).find(".itemNameTxt").attr("id", "itemNameTxt" + i);
            $(this).find(".currentInvenTxt").attr("id", "currentInvenTxt" + i);
            $(this).find("input.transferQty").attr("id", "transferQty" + i);
            $(this).find(".forwardingWhCdTxt").attr("id", "forwardingWhCdTxt" + i);

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
                var result = customKendo.fn_customFormDataAjax("/item/invenTransferExcelUpload.do", formData);
                if(result.flag){
                    var list = result.list;
                    for(var i = 0; i < list.length; i++){
                        invenTr.addRow('new');
                        // $("#it" + i).find("#crmSn" + i).val(list[i].crmSn);
                        // $("#it" + i).find("#crmNm" + i).val(list[i].crmNm);
                        // $("#it" + i).find("#itemNo" + i).val(list[i].itemNo);
                        // $("#it" + i).find("#itemName" + i).val(list[i].itemName);
                        // $("#it" + i).find("#whType" + i).data("kendoDropDownList").value(list[i].whType);
                        // $("#it" + i).find("#whVolume" + i).val(invenTr.comma(list[i].whVolume));
                        // $("#it" + i).find("#whWeight" + i).val(invenTr.comma(list[i].whWeight));
                        // $("#it" + i).find("#unitPrice" + i).val(invenTr.comma(list[i].unitPrice));
                        // $("#it" + i).find("#amt" + i).val(invenTr.comma(list[i].amt));
                        // $("#it" + i).find("#whCd" + i).data("kendoDropDownList").value(list[i].whCd);
                        // $("#it" + i).find("#rmk" + i).val(list[i].rmk);
                    }
                }
            }
        }
    },

    setInvenTransferReg : function(){
        if($(".itransInfo").length == 0){
            alert("저장할 항목이 없습니다.");
            return;
        }

        var flag = true;
        $.each($(".itransInfo"), function(i, v){

            if(!$(this).find("#invenSn" + i).val() || !$(this).find("#itemNo" + i).val() || !$(this).find("#itemName" + i).val() || !$(this).find("#currentInven" + i).val()
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
                    forwardingDate : $("#forwardingDate").val(),
                    invenTransSn : $(this).find("#invenTransSn" + i).val(),
                    invenSn : $(this).find("#invenSn" + i).val(),
                    itemNo : $(this).find("#itemNo" + i).val(),
                    itemName : $(this).find("#itemName" + i).val(),
                    currentInven : $(this).find("#currentInven" + i).val(),
                    transferQty : invenTr.uncomma($(this).find("#transferQty" + i).val()),
                    forwardingWhCd : $(this).find("#forwardingWhCd" + i).val(),
                    receivingWhCd : $(this).find("#receivingWhCd" + i).val(),
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
                invenTr.setMakeTable();
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
        $("#itemNo" + invenTr.global.invenSnIndex).val($("#itemNo").val())
        $("#itemName" + invenTr.global.invenSnIndex).val($("#itemName").val())
        $("#currentInven" + invenTr.global.invenSnIndex).val($("#currentInven").val())
        $("#forwardingWhCd" + invenTr.global.invenSnIndex).val($("#whCd").val())

        $("#itemNoTxt" + invenTr.global.invenSnIndex).text($("#itemNo").val())
        $("#itemNameTxt" + invenTr.global.invenSnIndex).text($("#itemName").val())
        $("#currentInvenTxt" + invenTr.global.invenSnIndex).text(invenTr.comma($("#currentInven").val()))
        $("#forwardingWhCdTxt" + invenTr.global.invenSnIndex).text($("#whCdNm").val())

        $("#invenSn").val("")
        $("#itemNo").val("")
        $("#itemName").val("")
        $("#currentInven").val("")
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
