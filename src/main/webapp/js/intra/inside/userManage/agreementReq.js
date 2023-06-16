var agreementReq = {
    global : {
        st_signImage : "",
        epmReqHtml : "",
    },


    fn_defaultScript : function(){


    },

    fn_popCanvasSave : function(code){
        var canvas = document.getElementById('canvas');

        canvas.toDataURL("image/jpeg");

        canvas.toBlob((blob) => {
            const newImg = document.createElement('img');
            const url = URL.createObjectURL(blob);

            // newImg.onload = () => {
            //     // no longer need to read the blob so it's revoked
            //     URL.revokeObjectURL(url);
            // };

            newImg.src = url;

            opener.location.href="javascript:editorReload('html', \'"+ url +"\');";
            opener.location.href="javascript:htmlToPdf();";
        });

        setTimeout(function(){
            window.close();
        }, 2000);
    },

    fn_htmlDraw : function(){

    }
}