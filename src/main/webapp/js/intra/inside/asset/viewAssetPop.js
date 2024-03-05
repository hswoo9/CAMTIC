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
    }
}
