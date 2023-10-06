var regRv = {
    
    global : {
        itemWhIndex : 0,
        now : new Date(),
        saveAjaxData : "",
        wTDataSource : "",
        wCDataSource : "",
    },
    
    fn_defaultScript : function(){
        regRv.global.wTDataSource = customKendo.fn_customAjax("/item/smCodeList", {grpSn : "WT", lgCd : "WT"});
        regRv.global.wCDataSource = customKendo.fn_customAjax("/item/smCodeList", {grpSn : "WC", lgCd : "WH"});

        // regRv.setMakeTable();
    },

    receivingExcelFormDown : function(){
        kendo.saveAs({
            dataURI: "/item/receivingExcelFormDown.do"
        });
    },

    setMakeTable : function() {
        var result = customKendo.fn_customAjax("/item/getItemWhInfoList.do", regRv.global.searchAjaxData);
        if(result.flag){
            var list = result.list;
            $("#listTb tr").remove();
            for(var i = 0; i < list.length; i++){
                regRv.addRow('old');

                $("#wh" + i).find("#itemWhSn" + i).val(list[i].ITEM_WH_SN)
                $("#wh" + i).find("#itemNo" + i).val(list[i].ITEM_NO)
                $("#wh" + i).find("#itemName" + i).val(list[i].ITEM_NAME)
                $("#wh" + i).find("#whType" + i).data("kendoDropDownList").value(list[i].WH_TYPE)
                $("#wh" + i).find("#whVolume" + i).val(regRv.comma(list[i].WH_VOLUME))
                $("#wh" + i).find("#whWeight" + i).val(regRv.comma(list[i].WH_WEIGHT))
                $("#wh" + i).find("#unitPrice" + i).val(regRv.comma(list[i].UNIT_PRICE))
                $("#wh" + i).find("#amt" + i).val(regRv.comma(list[i].AMT))
                $("#wh" + i).find("#whCd" + i).data("kendoDropDownList").value(list[i].WH_CD)
                $("#wh" + i).find("#rmk" + i).val(list[i].RMK)

            }
        }
    },

    addRow : function(e){
        var html = "";

        html = "" +
            '<tr class="whInfo ' + e + 'WhInfo" id="wh' + regRv.global.itemWhIndex + '">' +
                '<td>' +
                    '<input type="hidden" id="crmSn' + regRv.global.itemWhIndex + '" class="crmSn">' +
                    '<input type="text" id="crmNm' + regRv.global.itemWhIndex + '" class="crmNm" style="width: 75%">' +
                    '<button type="button" id="crmSelBtn' + regRv.global.itemWhIndex + '" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onClick="regRv.fn_popCamCrmList(\'crmSn' + regRv.global.itemWhIndex + '\', \'crmNm' + regRv.global.itemWhIndex + '\');">선택</button>' +
                '</td>' +
                '<td>' +
                    '<input type="hidden" id="itemWhSn' + regRv.global.itemWhIndex + '" name="itemWhSn' + regRv.global.itemWhIndex + '">' +
                    '<input type="text" id="itemNo' + regRv.global.itemWhIndex + '" name="itemNo' + regRv.global.itemWhIndex + '">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="itemName' + regRv.global.itemWhIndex + '" name="itemName' + regRv.global.itemWhIndex + '">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="whType' + regRv.global.itemWhIndex + '" name="whType' + regRv.global.itemWhIndex + '">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="whVolume' + regRv.global.itemWhIndex + '" name="whVolume' + regRv.global.itemWhIndex + '" class="numBerInput" style="text-align: right">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="whWeight' + regRv.global.itemWhIndex + '" name="whWeight' + regRv.global.itemWhIndex + '" class="numBerInput" style="text-align: right">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="unitPrice' + regRv.global.itemWhIndex + '" name="unitPrice' + regRv.global.itemWhIndex + '" class="numBerInput" style="text-align: right">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="amt' + regRv.global.itemWhIndex + '" name="amt' + regRv.global.itemWhIndex + '" class="numBerInput" style="text-align: right">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="whCd' + regRv.global.itemWhIndex + '" name="whCd' + regRv.global.itemWhIndex + '">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="rmk' + regRv.global.itemWhIndex + '" name="rmk' + regRv.global.itemWhIndex + '">' +
                '</td>' +
                '<td>' +
                    '<button type="button" class="k-button k-button-solid-error" whNum="' + regRv.global.itemWhIndex + '" onclick="regRv.delRow(this)">삭제</button>' +
                '</td>' +
            '</tr>';

        $("#listTb").append(html);

        customKendo.fn_textBox(["itemNo" + regRv.global.itemWhIndex, "itemName" + regRv.global.itemWhIndex,
            "whVolume" + regRv.global.itemWhIndex, "whWeight" + regRv.global.itemWhIndex,
            "unitPrice" + regRv.global.itemWhIndex, "amt" + regRv.global.itemWhIndex, "rmk" + regRv.global.itemWhIndex])

        $(".numBerInput").keyup(function(){
            $(this).val(regRv.comma(regRv.uncomma($(this).val())));
        });

        customKendo.fn_dropDownList("whType" + regRv.global.itemWhIndex, regRv.global.wTDataSource, "ITEM_CD_NM", "ITEM_CD", 3);
        customKendo.fn_dropDownList("whCd" + regRv.global.itemWhIndex, regRv.global.wCDataSource, "ITEM_CD_NM", "ITEM_CD", 3);

        regRv.global.itemWhIndex++;
    },

    delRow : function(e){
        if(confirm("삭제하시겠습니까?\n삭제한 데이터는 복구 할 수 없습니다.")){
            regRv.global.saveAjaxData = {
                itemWhSn : $(e).closest("tr").find("#itemWhSn" + $(e).attr("whNum")).val(),
                empSeq : $("#empSeq").val()
            }

            var result = customKendo.fn_customAjax("/item/setReceivingRegDel.do", regRv.global.saveAjaxData);
            if(result.flag){
                alert("삭제되었습니다.");
                $(e).closest("tr").remove();
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
                    console.log(list);
                    for(var i = 0; i < list.length; i++){
                        regRv.addRow('new');
                        $("#wh" + i).find("#crmSn" + i).val(list[i].crmSn);
                        $("#wh" + i).find("#crmNm" + i).val(list[i].crmNm);
                        $("#wh" + i).find("#itemNo" + i).val(list[i].itemNo);
                        $("#wh" + i).find("#itemName" + i).val(list[i].itemName);
                        $("#wh" + i).find("#whType" + i).data("kendoDropDownList").value(list[i].whType);
                        $("#wh" + i).find("#whVolume" + i).val(regRv.comma(list[i].whVolume));
                        $("#wh" + i).find("#whWeight" + i).val(regRv.comma(list[i].whWeight));
                        $("#wh" + i).find("#unitPrice" + i).val(regRv.comma(list[i].unitPrice));
                        $("#wh" + i).find("#amt" + i).val(regRv.comma(list[i].amt));
                        $("#wh" + i).find("#whCd" + i).data("kendoDropDownList").value(list[i].whCd);
                        $("#wh" + i).find("#rmk" + i).val(list[i].rmk);
                    }
                }
            }
        }
    },

    setReceivingReg : function(){

        if($(".whInfo").length == 0){
            alert("저장할 항목이 없습니다.");
            return;
        }

        var flag = true;
        $.each($(".whInfo"), function(i, v){
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
                    whVolume : regRv.uncomma($(this).find("#whVolume" + i).val()),
                    whWeight : regRv.uncomma($(this).find("#whWeight" + i).val()),
                    whCd : $(this).find("#whCd" + i).val(),
                    whDt : $("#whDt").val(),
                    unitPrice : regRv.uncomma($(this).find("#unitPrice" + i).val()),
                    amt : regRv.uncomma($(this).find("#amt" + i).val()),
                    rmk : $(this).find("#rmk" + i).val(),
                    empSeq : $("#regEmpSeq").val()
                }

                if($(this).hasClass("newWhInfo")){
                    newRateArr.push(arrData);
                }else{
                    oldRateArr.push(arrData);
                }
            })

            regRv.global.saveAjaxData = {
                newRateArr : JSON.stringify(newRateArr),
                oldRateArr : JSON.stringify(oldRateArr)
            }

            var result = customKendo.fn_customAjax("/item/setReceivingReg.do", regRv.global.saveAjaxData)
            if(result.flag){
                alert("저장되었습니다.");
                regRv.global.itemWhIndex = 0;
                regRv.setMakeTable();
            }
        }
    },

    fn_popCamCrmList : function (crmSnId, crmNmId){
        regRv.global.crmSnId = crmSnId;
        regRv.global.crmNmId = crmNmId;

        var url = "/crm/pop/popCrmList.do";
        var name = "_blank";
        var option = "width = 1300, height = 670, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    crmInfoChange : function(){
        $("#" + regRv.global.crmSnId).val($("#crmSn").val())
        $("#" + regRv.global.crmNmId).val($("#crmNm").val())

        $("#crmSn").val("")
        $("#crmNm").val("")
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
