var viewAssetPop = {

    fnDefaultScript : function(){
        viewAssetPop.dataSet();
    },

    dataSet : function(){
        const astInfoSn = $("#astInfoSn").val();
        var result = customKendo.fn_customAjax("/inside/getAssetInfo.do", {astInfoSn : astInfoSn});
        var assetMap = result.data;

        const astFile = assetMap.astFile;
        if(astFile != null){
            console.log(astFile);

            let imgHtml = '';
            imgHtml += '<img src="'+astFile.file_path+astFile.file_uuid+'">';
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
    }
}
