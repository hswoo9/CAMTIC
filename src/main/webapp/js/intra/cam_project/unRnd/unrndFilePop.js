const unrndFilePop = {

    global: {
        attFiles: [],
        fileArray: [],
    },

    fn_DefaultScript: function(){
        var parameterArray = [];
        unrndFilePop.global.attFiles = opener.parent.lectureEdu.global.attFiles;
        parameterArray = unrndFilePop.global.attFiles;
        unrndFilePop.global.fileArray = parameterArray;

        if(parameterArray.length > 0){
            $("#emptyTr").remove();
            unrndFilePop.fn_addFile();
        } else {
            if(unrndFilePop.global.attFiles.length > 0){
                $("#emptyTr").remove();
                unrndFilePop.fn_attFiles();
            }
        }
    },

    fn_addFile : function(){
        console.log("fn_addFile");
        let fileArray = unrndFilePop.global.fileArray;
        let attFiles = unrndFilePop.global.attFiles;
        let html1 = '';
        let html2 = '';

        let size = 0;
        if(fileArray.length > 0){
            for (var i = 0; i < fileArray.length; i++) {
                size = fileArray[i].file_size > 0 ? fCommon.bytesToKB(fileArray[i].file_size) : '0 KB';
                var fileName = fileArray[i].file_org_name;
                var fileExt = fileArray[i].file_ext;

                html1 += '<tr style="text-align: center;padding-top: 10px;">';
                html1 += '   <td style="cursor:pointer;" onclick="unrndFilePop.fileDown(\'' + fileArray[i].file_path + fileArray[i].file_uuid+'\', \'' + fileArray[i].file_org_name + '.' + fileArray[i].file_ext + '\')">' + fileName + '</td>';
                html1 += '   <td>' + fileExt + '</td>';
                html1 += '   <td>' + size + '</td>';
                html1 += '   <td>';
                /*if(fileExt.toLowerCase() == "pdf" || fileExt.toLowerCase() == "jpg" || fileExt.toLowerCase() == "png" || fileExt.toLowerCase() == "jpeg"){
                }*/
                html1 += '       <input type="button" value="뷰어" class="k-button k-rounded k-button-solid k-button-solid-base" onclick="fileViewer(\''+ fileArray[i].file_path +'\', \''+ fileArray[i].file_uuid +'\')">';
                html1 += '   </td>';
                html1 += '</tr>';
            }
            // $("#fileGrid").append(html);
        }

        $("#fileGrid").append(html1 + html2);
    },

    fn_attFiles : function(){
        console.log("fn_attFiles");
        var attFiles = unrndFilePop.global.attFiles;
        let html = '';

        if(attFiles.length > 0){
            for (var i = 0; i < attFiles.length; i++) {
                var size = attFiles[i].size > 0 ? fCommon.bytesToKB(attFiles[i].size) : '0 KB';
                var fileName = attFiles[i].name.substring(0, attFiles[i].name.lastIndexOf("."));
                var fileExt = attFiles[i].name.substring(attFiles[i].name.lastIndexOf(".") + 1);

                html += '<tr style="text-align: center;padding-top: 10px;" class="addFile">';
                html += '   <td style="text-align: left">' + fileName + '</td>';
                html += '   <td>' + fileExt + '</td>';
                html += '   <td>' + size + '</td>';
                html += '   <td>';

                // if(attFiles[i].file_ext != undefined && attFiles[i].file_ext != null && attFiles[i].file_ext != ""){
                //     if(fileExt.toLowerCase() == "pdf" || fileExt.toLowerCase() == "jpg" || fileExt.toLowerCase() == "png" || fileExt.toLowerCase() == "jpeg"){
                //         html += '       <input type="button" value="뷰어" class="k-button k-rounded k-button-solid k-button-solid-base" onclick="unrndFilePop.fileViewer(\'' + attFiles[i].file_path + attFiles[i].file_uuid +'\')">'
                //     }
                // }

                html += '   </td>';
                if($("#type").val() != "exnp"){
                    html += '   <td>';
                    html += '       <input type="button" value="삭제" class="k-button k-rounded k-button-solid k-button-solid-error" onclick="unrndFilePop.fnUploadFile(' + i + ')">'
                    html += '   </td>';
                }

                html += '</tr>';
            }
            // $("#fileGrid").append(html);
        }

        $("#fileGrid").append(html);
    },


    fn_setFile : function(){
        console.log("fn_setFile");
        let fileArray= unrndFilePop.global.fileArray;
        let attFiles = unrndFilePop.global.attFiles;
        let html1 = '';
        let html2 = '';
        let size = 0;

        if(fileArray.length > 0){
            for (var i = 0; i < fileArray.length; i++) {
                size = fileArray[i].file_size > 0 ? fCommon.bytesToKB(fileArray[i].file_size) : '0 KB';

                var fileName = fileArray[i].file_org_name;
                var fileExt = fileArray[i].file_ext;

                html1 += '<tr style="text-align: center;padding-top: 10px;">';
                html1 += '   <td style="text-align: left; cursor: pointer;">' + fileName + '</td>';
                html1 += '   <td>' + fileExt + '</td>';
                html1 += '   <td>' + size + '</td>';
                html1 += '   <td>';

                if(fileExt.toLowerCase() == "pdf" || fileExt.toLowerCase() == "jpg" || fileExt.toLowerCase() == "png" || fileExt.toLowerCase() == "jpeg"){
                    html1 += '       <input type="button" value="뷰어" class="k-button k-rounded k-button-solid k-button-solid-base" onclick="unrndFilePop.fileViewer(\'' + fileArray[i].file_path + fileArray[i].file_uuid +'\')">'
                }

                html1 += '   </td>';
                if($("#type").val() != "exnp"){
                    html1 += '   <td>';
                    html1 += '       <input type="button" value="삭제" class="k-button k-rounded k-button-solid k-button-solid-error" onclick="unrndFilePop.fn_delFile(' + fileArray[i].file_no + ')">'
                    html1 += '   </td>';
                }

                html1 += '</tr>';
            }
            // $("#fileGrid").append(html);
        }

        if(attFiles.length > 0){
            for (var i = 0; i < attFiles.length; i++) {
                size = fCommon.bytesToKB((attFiles[i].file_size || attFiles[i].size));

                var fileName = (attFiles[i].file_org_name || attFiles[i].name.toString().split(".")[0]);
                var fileExt = (attFiles[i].file_ext || attFiles[i].name.toString().split(".")[1]);
                html2 += '<tr style="text-align: center;padding-top: 10px;" class="addFile">';
                html2 += '   <td style="text-align: left">' + fileName + '</td>';
                html2 += '   <td>' + fileExt + '</td>';
                html2 += '   <td>' + size + '</td>';
                html2 += '   <td>';

                // if(attFiles[i].file_ext != undefined && attFiles[i].file_ext != null && attFiles[i].file_ext != ""){
                //     if(fileExt.toLowerCase() == "pdf" || fileExt.toLowerCase() == "jpg" || fileExt.toLowerCase() == "png" || fileExt.toLowerCase() == "jpeg"){
                //         html += '       <input type="button" value="뷰어" class="k-button k-rounded k-button-solid k-button-solid-base" onclick="unrndFilePop.fileViewer(\'' + attFiles[i].file_path + attFiles[i].file_uuid +'\')">'
                //     }
                // }

                html2 += '   </td>';
                if($("#type").val() != "exnp"){
                    html2 += '   <td>';
                    html2 += '       <input type="button" value="삭제" class="k-button k-rounded k-button-solid k-button-solid-error" onclick="unrndFilePop.fnUploadFile(' + i + ')">'
                    html2 += '   </td>';
                }

                html2 += '</tr>';
            }
            // $("#fileGrid").append(html);+
        }

        $("#fileGrid").append(html1 + html2);
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

    fileViewer1 : function (path, name){
        var name = "_blank";
        var option = "width = 1300, height = 820, top = 100, left = 400, location = no"
        var hostUrl = "http://218.158.231.189";

        var popup = window.open(hostUrl + path, name, option);
    },

    fn_close : function (){
        window.close();
    },

    fn_regist: function(){
        window.close();
    },

    fn_delFile: function (key){
        if(!confirm("삭제하시겠습니까?")){
            return;
        }

        var data = {
            fileNo : key
        }

        $.ajax({
            url : "/common/delFileInfo",
            data : data,
            type : "post",
            dataType : "json",
            success: function(rs){
                if(rs.code == 200){
                    alert("삭제되었습니다.");
                    if($("#type").val() != "exnp"){
                        var fileArr = opener.parent.regPay.global.fileArray;
                    } else {
                        var fileArr = opener.parent.regPay.global.fileArray;
                    }
                    for(var i = 0 ; i < fileArr.length ; i++){
                        if(fileArr[i].file_no == key){
                            fileArr.splice(i, 1);
                            break;
                        }
                    }

                    location.reload();
                }


            }
        })
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

    fileDown : function(filePath, fileName){
    kendo.saveAs({
        dataURI: "/common/fileDownload.do?filePath=" + filePath + "&fileName=" + encodeURIComponent(fileName),
    });
}

}