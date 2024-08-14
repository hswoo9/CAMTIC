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

        regRv.addRow('new');
    },

    receivingExcelFormDown : function(){
        kendo.saveAs({
            dataURI: "/item/receivingExcelFormDown.do"
        });
    },

    addRow : function(e){
        var html = "";

        html = "" +
            '<tr class="whInfo ' + e + 'WhInfo" id="wh' + regRv.global.itemWhIndex + '">' +
                '<td>' +
                    '<input type="hidden" id="crmSn' + regRv.global.itemWhIndex + '" class="crmSn">' +
                    '<input type="text" id="crmNm' + regRv.global.itemWhIndex + '" class="k-input k-textbox crmNm" readonly style="width: 83%" onclick="regRv.fn_popCamCrmList(\'crmSn\', \'crmNm\',' + regRv.global.itemWhIndex + ');"/>' +
                    '<button type="button" id="crmSelBtn' + regRv.global.itemWhIndex + '" class="crmSelBtn k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onClick="regRv.fn_popCamCrmList(\'crmSn\', \'crmNm\',' + regRv.global.itemWhIndex + ');">선택</button>' +
                '</td>' +
                '<td>' +
                    '<input type="hidden" id="masterSn' + regRv.global.itemWhIndex + '" class="masterSn">' +
                    '<input type="hidden" id="baseWhCd' + regRv.global.itemWhIndex + '" class="baseWhCd">' +
                    '<input type="text" id="itemNo' + regRv.global.itemWhIndex + '" class="k-input k-textbox itemNo" readonly style="width: 69%" onclick="regRv.fn_popItemNoList(' + regRv.global.itemWhIndex + ');"/>' +
                    '<button type="button" id="itemSelBtn' + regRv.global.itemWhIndex + '" class="itemSelBtn k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onClick="regRv.fn_popItemNoList(' + regRv.global.itemWhIndex + ');">선택</button>' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="itemName' + regRv.global.itemWhIndex + '" class="itemName k-input k-textbox" onclick="regRv.fn_popItemNoList(' + regRv.global.itemWhIndex + ');" readonly name="itemName' + regRv.global.itemWhIndex + '">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="whType' + regRv.global.itemWhIndex + '" name="whType' + regRv.global.itemWhIndex + '" class="whType" onchange="regRv.whTypeChange(' + regRv.global.itemWhIndex + ')">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="whVolume' + regRv.global.itemWhIndex + '" name="whVolume' + regRv.global.itemWhIndex + '" class="numberInput whVolume" style="text-align: right">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="unitPrice' + regRv.global.itemWhIndex + '" name="unitPrice' + regRv.global.itemWhIndex + '" class="numberInput unitPrice" style="text-align: right;width: 63%">' +
                    '<button type="button" id="priceSelBtn' + regRv.global.itemWhIndex + '" class="priceSelBtn k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onClick="regRv.fn_popUnitPriceList(\'unitPrice\', ' + regRv.global.itemWhIndex + ');">선택</button>' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="amt' + regRv.global.itemWhIndex + '" name="amt' + regRv.global.itemWhIndex + '" class="amt numberInput" style="text-align: right" readonly>' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="whCd' + regRv.global.itemWhIndex + '" name="whCd' + regRv.global.itemWhIndex + '" class="whCd">' +
                '</td>' +
                '<td>' +
                    '<input type="text" id="rmk' + regRv.global.itemWhIndex + '" name="rmk' + regRv.global.itemWhIndex + '" class="rmk">' +
                '</td>' +
                '<td>' +
                    '<button type="button" class="k-button k-button-solid-error" whNum="' + regRv.global.itemWhIndex + '" onclick="regRv.delRow(this)">X</button>' +
                '</td>' +
            '</tr>';

        $("#listTb").append(html);

        customKendo.fn_textBox(["whVolume" + regRv.global.itemWhIndex, "whWeight" + regRv.global.itemWhIndex,
            "unitPrice" + regRv.global.itemWhIndex, "amt" + regRv.global.itemWhIndex, "rmk" + regRv.global.itemWhIndex])

        $(".numberInput").keyup(function(){
            $(this).val(regRv.comma(regRv.uncomma($(this).val())));
        });

        $(".whVolume, .unitPrice").keyup(function(){
            var whVolume = Number(regRv.uncomma($(this).closest("tr").find("input.whVolume").val()));
            var unitPrice = Number(regRv.uncomma($(this).closest("tr").find("input.unitPrice").val()));
            $(this).closest("tr").find("input.amt").val(regRv.comma(Number(whVolume * unitPrice)));
        });


        customKendo.fn_dropDownList("whType" + regRv.global.itemWhIndex, regRv.global.wTDataSource, "ITEM_CD_NM", "ITEM_CD", 3);
        customKendo.fn_dropDownList("whCd" + regRv.global.itemWhIndex, regRv.global.wCDataSource, "ITEM_CD_NM", "ITEM_CD", 3);

        regRv.global.itemWhIndex++;
    },

    delRow : function(e){
        if(confirm("삭제하시겠습니까?\n삭제한 데이터는 복구 할 수 없습니다.")){
            $(e).closest("tr").remove();
            regRv.global.itemWhIndex--;
            regRv.rowAttrOverride();
        }
    },

    resetRow : function(){
        regRv.global.itemWhIndex = 0;
        $("#listTb tr").remove();
        regRv.addRow('new');
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
                            regRv.addRow('new');
                        }

                        $("#wh" + i).find("#crmSn" + i).val(list[i].crmSn);
                        $("#wh" + i).find("#crmNm" + i).val(list[i].crmNm);
                        $("#wh" + i).find("#masterSn" + i).val(list[i].masterSn);
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
                || !$(this).find("#whVolume" + i).val() ||  !$(this).find("#whCd" + i).val() || !$(this).find("#unitPrice" + i).val()
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

            $.each($(".whInfo"), function(i, v){
                var arrData = {
                    crmSn : $(this).find("#crmSn" + i).val(),
                    masterSn : $(this).find("#masterSn" + i).val(),
                    itemWhSn : $(this).find("#itemWhSn" + i).val(),
                    whType : $(this).find("#whType" + i).val(),
                    whVolume : regRv.uncomma($(this).find("#whVolume" + i).val()),
                    whWeight : regRv.uncomma($(this).find("#whWeight" + i).val()),
                    whCd : $(this).find("#whCd" + i).val(),
                    whDt : $("#whDt").val(),
                    unitPrice : regRv.uncomma($(this).find("#unitPrice" + i).val()),
                    amt : regRv.uncomma($(this).find("#amt" + i).val()),
                    rmk : $(this).find("#rmk" + i).val(),
                    empSeq : $("#empSeq").val()
                }

                newRateArr.push(arrData);
            })

            regRv.global.saveAjaxData = {
                newRateArr : JSON.stringify(newRateArr),
            }

            var result = customKendo.fn_customAjax("/item/setReceivingReg.do", regRv.global.saveAjaxData)
            if(result.flag){
                alert("저장되었습니다.");
                opener.parent.recL.gridReload();
                window.close();
            }
        }
    },

    fn_popCamCrmList : function (crmSnId, crmNmId, e){
        regRv.global.crmSnId = crmSnId + e;
        regRv.global.crmNmId = crmNmId + e;
        regRv.global.crmIndex = e;

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

        regRv.getItemUnitPrice(regRv.global.crmIndex);
    },

    fn_popItemNoList : function (masterSnIndex){
        regRv.global.masterSnIndex = masterSnIndex;

        var url = "/item/pop/popItemNoList.do";
        var name = "_blank";
        var option = "width = 1300, height = 670, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    masterSnChange : function(){
        $("#masterSn" + regRv.global.masterSnIndex).val($("#masterSn").val())
        $("#itemNo" + regRv.global.masterSnIndex).val($("#itemNo").val())
        $("#itemName" + regRv.global.masterSnIndex).val($("#itemName").val())
        $("#baseWhCd" + regRv.global.masterSnIndex).val($("#baseWhCd").val())
        $("#whCd" + regRv.global.masterSnIndex).data("kendoDropDownList").value($("#baseWhCd").val())

        regRv.whTypeChange(regRv.global.masterSnIndex);

        $("#masterSn").val("")
        $("#itemNo").val("")
        $("#itemName").val("")
        $("#baseWhCd").val("")

        regRv.getItemUnitPrice(regRv.global.masterSnIndex);
    },

    fn_popUnitPriceList : function(unitPriceId, i){
        if(!$("#crmSn" + i).val()){
            alert("업체를 선택해주세요.");
            return;
        }else if(!$("#itemNo" + i).val()){
            alert("품번을 입력해주세요.");
            return;
        }

        regRv.global.unitPriceId = unitPriceId + i;

        var url = "/item/pop/popRvUnitPriceList.do?crmSn=" + $("#crmSn" + i).val() + "&masterSn=" + $("#masterSn" + i).val();
        var name = "_blank";
        var option = "width = 860, height = 670, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
    },

    getItemUnitPrice : function(e){
        if(!$("#masterSn" + e).val()){
            return;
        }

        regRv.global.searchAjaxData = {
            crmSn : $("#crmSn" + e).val(),
            masterSn : $("#masterSn" + e).val(),
            busClass : "W"
        }

        var result = customKendo.fn_customAjax("/item/getItemUnitPrice.do", regRv.global.searchAjaxData);
        if(result.flag){
            if(result.rs != null){
                regRv.global.unitPriceId = "unitPrice" + e;
                $("#unitPrice").val(result.rs.UNIT_PRICE);
                regRv.unitPriceChange();
            }
        }
    },

    unitPriceChange : function(){
        $("#" + regRv.global.unitPriceId).val(regRv.comma($("#unitPrice").val()));
        var whVolume = Number(regRv.uncomma($("#" + regRv.global.unitPriceId).closest("tr").find("input.whVolume").val()));
        var unitPrice = Number($("#unitPrice").val());
        $("#" + regRv.global.unitPriceId).closest("tr").find("input.amt").val(regRv.comma(Number(whVolume * unitPrice)));

        $("#unitPrice").val("")
    },

    whTypeChange : function(e){
        if($("#whType" + e).val() == "102"){
            $("#whCd" + e).data("kendoDropDownList").value("RT");
            $("#whCd" + e).data("kendoDropDownList").enable(false);
        }else{
            if($("#baseWhCd" + e).val() == null || $("#baseWhCd" + e).val() == ""){
                $("#whCd" + e).data("kendoDropDownList").select(0);
            }else{
                $("#whCd" + e).data("kendoDropDownList").value($("#baseWhCd" + e).val());
            }
            $("#whCd" + e).data("kendoDropDownList").enable(true);
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

    rowAttrOverride : function(){
        $.each($(".whInfo"), function(i, v){
            $(this).attr("id", "wh" + i);

            $(this).find("input.crmSn").attr("id", "crmSn" + i);
            $(this).find("input.crmNm").attr("id", "crmNm" + i);
            $(this).find("input.crmNm").attr("onClick", "regRv.fn_popCamCrmList('crmSn','crmNm', " + i + ")");
            $(this).find("button.crmSelBtn").attr("id", "crmSelBtn" + i);
            $(this).find("button.crmSelBtn").attr("onClick", "regRv.fn_popCamCrmList('crmSn','crmNm', " + i + ")");

            $(this).find("input.masterSn").attr("id", "masterSn" + i);
            $(this).find("input.baseWhCd").attr("id", "baseWhCd" + i);
            $(this).find("input.itemNo").attr("id", "itemNo" + i);
            $(this).find("input.itemNo").attr("onClick", "regRv.fn_popItemNoList(" + i + ")");
            $(this).find("button.itemSelBtn").attr("id", "itemSelBtn" + i);
            $(this).find("button.itemSelBtn").attr("onClick", "regRv.fn_popItemNoList(" + i + ")");
            $(this).find("input.itemName").attr("id", "itemName" + i);
            $(this).find("input.itemName").attr("name", "itemName" + i);
            $(this).find("input.itemName").attr("onClick", "regRv.fn_popItemNoList(" + i + ")");

            $(this).find("input.whType").attr("id", "whType" + i);
            $(this).find("input.whType").attr("name", "whType" + i);
            $(this).find("input.whVolume").attr("id", "whVolume" + i);
            $(this).find("input.whVolume").attr("name", "whVolume" + i);
            $(this).find("input.whWeight").attr("id", "whWeight" + i);
            $(this).find("input.whWeight").attr("name", "whWeight" + i);
            $(this).find("input.unitPrice").attr("id", "unitPrice" + i);
            $(this).find("input.unitPrice").attr("name", "unitPrice" + i);
            $(this).find("button.priceSelBtn").attr("id", "priceSelBtn" + i);
            $(this).find("button.priceSelBtn").attr("onClick", "regRv.fn_popUnitPriceList('unitPrice'," + i + ")");
            $(this).find("input.amt").attr("id", "amt" + i);
            $(this).find("input.amt").attr("name", "amt" + i);
            $(this).find("input.whCd").attr("id", "whCd" + i);
            $(this).find("input.whCd").attr("name", "whCd" + i);
            $(this).find("input.rmk").attr("id", "rmk" + i);
            $(this).find("input.rmk").attr("name", "rmk" + i);
        })
    },
}
