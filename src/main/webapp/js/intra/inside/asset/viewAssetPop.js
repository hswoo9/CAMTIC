var viewAssetPop = {

    fnDefaultScript : function(){
        viewAssetPop.dataSet();
    },

    dataSet : function(){
        const astInfoSn = $("#astInfoSn").val();
        var result = customKendo.fn_customAjax("/inside/getAssetInfo.do", {astInfoSn : astInfoSn});
        var assetMap = result.data;
        var histList = result.data2.history;
        var histItemList = result.data2.historyItem;
        console.log("histList", histList);
        console.log("histItemList", histItemList);

        const astFile = assetMap.astFile;
        const oldAstFile = assetMap.oldAstFile;
        console.log("astFile", astFile);
        console.log("oldAstFile", oldAstFile);

        let imgHtml = '';

        for(let i=0; i<oldAstFile.length; i++){
            if(i != 0){
                imgHtml += '<br>';
            }
            imgHtml += '<img src="'+oldAstFile.file_path+oldAstFile.file_uuid+'">';
        }

        for(let i=0; i<astFile.length; i++){
            if(i != 0){
                imgHtml += '<br>';
            }
            imgHtml += '<img src="'+astFile.file_path+astFile.file_uuid+'">';
        }

        if(oldAstFile.length > 0 || astFile.length > 0){
            $("#assetImg").html(imgHtml);
        }

        /** 이관 데이터 일때 청구서있으면 링크 연결 */
        const bfPk = assetMap.BF_PK;
        const orderType = assetMap.ORDER_TYPE;
        if(bfPk != null && orderType != null){
            let linkHtml = '';
            const id = $("#regId").val();
            if(orderType == "1"){
                linkHtml += "<a href='http://pre.camtic.or.kr/CAMsPot/Login.aspx?NEWCAMTICS="+id+"&LOCATION="+"Biz/Purchase/PriceView.aspx?ID="+assetMap.J_DOC_NO+"' target='_blank' style='font-weight: bold'>[물품청구서] " + assetMap.J_PRICE_NO + "</a>";
            }else if(orderType == "2"){
                linkHtml += "<a href='http://pre.camtic.or.kr/CAMsPot/Login.aspx?NEWCAMTICS="+id+"&LOCATION="+"Biz/OutSide/PriceView.aspx?ID="+assetMap.J_DOC_NO+"' target='_blank' style='font-weight: bold'>[외주청구서] " + assetMap.J_PRICE_NO + "</a>";
            }
            $("#purcLink").html(linkHtml);
        }

        /** 정보갱신 이력 */
        let html = '';
        for(let i=0; i<histList.length; i++){
            const map = histList[i]
            html += '<table class="table table-bordered mb-0">';
            html += '   <colgroup>';
            html += '       <col width="10%">';
            html += '   </colgroup>';
            html += '   <tbody>';
            html += '       <tr>';
            html += '           <th class="text-center th-color">정보변경</th>';
            html += '           <td style="padding:5px;">';
            html +=                 map.REG_DATE + ' / ' + map.REG_EMP_NAME + ' / ' + map.REG_EMP_IP;
            html += '           </td>';
            html += '       </tr>';
            html += '       <tr>';
            html += '           <td colspan="2">';
                for(let j=0; j<histItemList.length; j++){
                    const jMap = histItemList[j];
                    if(map.AST_INFO_MOD_SN == jMap.AST_INFO_MOD_SN){
                        /** BF_YN가 Y면 이관데이터 */
                        if(jMap.BF_YN == "N"){
                            html += '['+jMap.MOD_ITEM_NAME+']'+jMap.MOD_OLD_ITEM_INFO+' → '+jMap.MOD_NEW_ITEM_INFO+'<br>';
                        }else{
                            html += jMap.MOD_NEW_ITEM_INFO+'<br>';
                        }
                    }
                }
            html += '       ';
            html += '       ';
            html += '           </td>';
            html += '       </tr>';
            html += '   </tbody>';
            html += '</table>';
        }
        if(html != ''){
            $("#historyData").html(html);
        }
    }
}
