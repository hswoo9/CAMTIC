var snackReceipt = {
    global: {
        fileArray : new Array(),
    },

    init: function() {
        snackReceipt.fn_setFile();
    },

    fn_setFile : function(){
        var fileArray = [];
        var fileNoArr = [];
        var result = "";

        if($("#fileNo").val() != '' && $("#fileNo").val() != null) {
            fileNoArr = $("#fileNo").val().split(',');

            for(var i=0; i<fileNoArr.length; i++) {
                result += "," + fileNoArr[i];
            }
        } else {
            result += ",0";
        }

        var data = {
            snackInfoSn : $("#snackInfoSn").val(),
            fileNo: result.substring(1),
            reqTypeZ : "snack",
        }

        var fileResult = customKendo.fn_customAjax("/snack/getFileList", data)
        fileArray = fileResult.fileList;
        console.log(fileArray);

        let size = 0;
        if(fileArray.length > 0){
            $("#fileGrid").html("");

            var html = '';

            for (var i = 0; i < fileArray.length; i++) {
                size = fileArray[i].file_size > 0 ? fCommon.bytesToKB(fileArray[i].file_size) : 0;

                html += '<tr style="text-align: center;padding-top: 10px;">';
                html += '   <td style="text-align: left">' + fileArray[i].file_org_name + '</td>';
                html += '   <td>' + fileArray[i].file_ext + '</td>';
                html += '   <td>' + size + '</td>';
                html += '   <td>';
                if(fileArray[i].file_ext.toLowerCase() == "pdf" || fileArray[i].file_ext.toLowerCase() == "jpg" || fileArray[i].file_ext.toLowerCase() == "png" || fileArray[i].file_ext.toLowerCase() == "jpeg"){
                    html += '       <input type="button" value="뷰어" class="k-button k-rounded k-button-solid k-button-solid-base" onclick="snackReceipt.fileViewer(\'' + fileArray[i].file_path + fileArray[i].file_uuid +'\')">'
                }
                html += '   </td>';
                html += '</tr>';
            }
            $("#fileGrid").append(html);
        }
    },

    fileViewer : function (path, name){
        var name = "_blank";
        var option = "width = 1300, height = 820, top = 100, left = 400, location = no"
        var hostUrl = "";
        if($(location).attr("host").split(":")[0].indexOf("218.158.231.184") > -1 || $(location).attr("host").split(":")[0].indexOf("new.camtic.or.kr") > -1){
            hostUrl = "http://218.158.231.184";
        } else {
            hostUrl = "http://218.158.231.186";
        }
        var popup = window.open(hostUrl + path, name, option);
    },

    fn_close : function(){
        window.close();
    }
}
