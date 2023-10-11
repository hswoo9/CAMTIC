var popBomPt = {
    global : {
        dropDownDataSource : "",
        createHtmlStr : "",
        searchAjaxData : "",
    },

    fn_defultScript: function (){
        popBomPt.setMakeTable();
    },

    setMakeTable : function() {
        popBomPt.global.searchAjaxData = {
            bomSn : $("#bomSn").val(),
        }

        var result = customKendo.fn_customAjax("/item/getBomDetailList.do", popBomPt.global.searchAjaxData);
        if(result.flag){
            var list = result.list;
            console.log(list);

            $("#productionTb tr").remove();
            if(list.length > 0){
                for(var i = 0; i < list.length; i++){
                    popBomPt.global.createHtmlStr = "";

                    popBomPt.global.createHtmlStr = "" +
                        '<tr class="bomDetail" id="detail' + i + '">' +
                            '<td style="text-align: center" id="num' + i + '">' + (i+1) + '</td>' +
                            '<td id="itemNo' + i + '">' + list[i].ITEM_NO +'</td>' +
                            '<td id="itemName' + i + '">' + list[i].ITEM_NAME +'</td>' +
                            '<td id="unitPrice' + i + '" style="text-align: right">' + popBomPt.comma(list[i].UNIT_PRICE) +'</td>' +
                            '<td id="reqQty' + i + '" style="text-align: right">' + popBomPt.comma(list[i].REQ_QTY) + '</td>' +
                            '<td id="safetyInven' + i + '" style="text-align: right">' + popBomPt.comma(list[i].SAFETY_INVEN) + '</td>' +
                            '<td id="materialWhCd' + i + '">' +
                                '<input type="text" id="whCd' + i + '">' +
                            '</td>' +
                            '<td id="rmk' + i + '">' + list[i].RMK +'</td>' +
                        '</tr>';

                    $("#productionTb").append(popBomPt.global.createHtmlStr);

                    customKendo.fn_dropDownList("whCd" + i, list[i].whCdList, "WH_CD_NM", "WH_CD", 3);
                }
            }
        }
    },

    setBomProduction : function(){
        alert("뚝딱뚝딱 제작중..")
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