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
        invenTr.global.wTDataSource = customKendo.fn_customAjax("/item/smCodeList", {grpSn : "WT", lgCd : "WT"});
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
                    '<input type="hidden" id="invenSn' + invenTr.global.invenTransferIndex + '" class="invenSn">' +
                    '<input type="hidden" id="itemNo' + invenTr.global.invenTransferIndex + '" class="itemNo">' +
                    '<input type="hidden" id="itemName' + invenTr.global.invenTransferIndex + '" class="itemName">' +
                    '<input type="hidden" id="currentInven' + invenTr.global.invenTransferIndex + '" class="currentInven">' +
                    '<div id="itemNoTxt' + invenTr.global.invenTransferIndex + '" name="itemNoTxt' + invenTr.global.invenTransferIndex + '" style="float: left;margin-top: 5px;"></div>' +
                    '<button type="button" id="itemSelBtn' + invenTr.global.invenTransferIndex + '" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onClick="invenTr.fn_popCamItemList(' + invenTr.global.invenTransferIndex + ');">선택</button>' +
                '</td>' +
                '<td>' +
                    '<span id="itemNameTxt' + invenTr.global.invenTransferIndex + '" name="itemNameTxt' + invenTr.global.invenTransferIndex + '"></span>' +
                '</td>' +
                '<td style="text-align: right">' +
                    '<span id="currentInvenTxt' + invenTr.global.invenTransferIndex + '" name="currentInvenTxt' + invenTr.global.invenTransferIndex + '"></span>' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="transferQty' + invenTr.global.invenTransferIndex + '" name="transferQty' + invenTr.global.invenTransferIndex + '" class="numBerInput" style="text-align: right" value="0" oninput="invenTr.maxCurrentInvenChk(this, ' + invenTr.global.invenTransferIndex + ')">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="forwardingWhCd' + invenTr.global.invenTransferIndex + '" name="forwardingWhCd' + invenTr.global.invenTransferIndex + '">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="receivingWhCd' + invenTr.global.invenTransferIndex + '" name="receivingWhCd' + invenTr.global.invenTransferIndex + '">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="rmk' + invenTr.global.invenTransferIndex + '" name="rmk' + invenTr.global.invenTransferIndex + '">' +
                '</td>' +
                '<td>' +
                    '<button type="button" class="k-button k-button-solid-error" inventransNum="' + invenTr.global.invenTransferIndex + '" onclick="invenTr.delRow(this)">삭제</button>' +
                '</td>' +
            '</tr>';

        $("#listTb").append(html);

        customKendo.fn_textBox(["transferQty" + invenTr.global.invenTransferIndex, "rmk" + invenTr.global.invenTransferIndex])

        $(".numBerInput").keyup(function(){
            $(this).val(invenTr.comma(invenTr.uncomma($(this).val())));
        });

        customKendo.fn_dropDownList("forwardingWhCd" + invenTr.global.invenTransferIndex, invenTr.global.wCDataSource, "ITEM_CD_NM", "ITEM_CD", 3);
        customKendo.fn_dropDownList("receivingWhCd" + invenTr.global.invenTransferIndex, invenTr.global.wCDataSource, "ITEM_CD_NM", "ITEM_CD", 3);

        invenTr.global.invenTransferIndex++;
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
                        $("#it" + i).find("#crmSn" + i).val(list[i].crmSn);
                        $("#it" + i).find("#crmNm" + i).val(list[i].crmNm);
                        $("#it" + i).find("#itemNo" + i).val(list[i].itemNo);
                        $("#it" + i).find("#itemName" + i).val(list[i].itemName);
                        $("#it" + i).find("#whType" + i).data("kendoDropDownList").value(list[i].whType);
                        $("#it" + i).find("#whVolume" + i).val(invenTr.comma(list[i].whVolume));
                        $("#it" + i).find("#whWeight" + i).val(invenTr.comma(list[i].whWeight));
                        $("#it" + i).find("#unitPrice" + i).val(invenTr.comma(list[i].unitPrice));
                        $("#it" + i).find("#amt" + i).val(invenTr.comma(list[i].amt));
                        $("#it" + i).find("#whCd" + i).data("kendoDropDownList").value(list[i].whCd);
                        $("#it" + i).find("#rmk" + i).val(list[i].rmk);
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
            if(!$(this).find("#crmSn" + i).val() || !$(this).find("#itemNo" + i).val() || !$(this).find("#itemName" + i).val() || !$(this).find("#whType" + i).val()
                || !$(this).find("#whVolume" + i).val() || !$(this).find("#whWeight" + i).val() || !$(this).find("#whCd" + i).val() || !$(this).find("#unitPrice" + i).val()
                || !$(this).find("#amt" + i).val()){
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

            $.each($(".whInfo"), function(i, v){
                var arrData = {
                    crmSn : $(this).find("#crmSn" + i).val(),
                    itemWhSn : $(this).find("#itemWhSn" + i).val(),
                    itemNo : $(this).find("#itemNo" + i).val(),
                    itemName : $(this).find("#itemName" + i).val(),
                    whType : $(this).find("#whType" + i).val(),
                    whVolume : invenTr.uncomma($(this).find("#whVolume" + i).val()),
                    whWeight : invenTr.uncomma($(this).find("#whWeight" + i).val()),
                    whCd : $(this).find("#whCd" + i).val(),
                    whDt : $("#whDt").val(),
                    unitPrice : invenTr.uncomma($(this).find("#unitPrice" + i).val()),
                    amt : invenTr.uncomma($(this).find("#amt" + i).val()),
                    rmk : $(this).find("#rmk" + i).val(),
                    empSeq : $("#regEmpSeq").val()
                }

                if($(this).hasClass("newWhInfo")){
                    newRateArr.push(arrData);
                }else{
                    oldRateArr.push(arrData);
                }
            })

            invenTr.global.saveAjaxData = {
                newRateArr : JSON.stringify(newRateArr),
                oldRateArr : JSON.stringify(oldRateArr)
            }

            var result = customKendo.fn_customAjax("/item/setReceivingReg.do", invenTr.global.saveAjaxData)
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

        $("#itemNoTxt" + invenTr.global.invenSnIndex).text($("#itemNo").val())
        $("#itemNameTxt" + invenTr.global.invenSnIndex).text($("#itemName").val())
        $("#currentInvenTxt" + invenTr.global.invenSnIndex).text(invenTr.comma($("#currentInven").val()))

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
