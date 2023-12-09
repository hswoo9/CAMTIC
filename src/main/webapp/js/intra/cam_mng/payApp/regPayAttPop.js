const regPayAtt = {

    fn_DefaultScript: function(){
        var parameterArray = [];
        if($("#type").val() != "exnp"){
            parameterArray = opener.parent.regPay.global.fileArray;
        } else {
            parameterArray = opener.parent.regExnp.global.fileArray
        }
        if(opener.parent.$("#payAppSn").val() != ""){
            if(parameterArray.length > 0){
                $("#emptyTr").remove();
                regPayAtt.fn_setFile();
            }
        } else {
            if(parameterArray.length > 0){
                $("#emptyTr").remove();
                regPayAtt.fn_addFile();
            }
        }

    },

    fileChange : function (){
        opener.parent.regPay.global.fileArray = [];
        $("#emptyTr").remove();
        let size = 0;
        var fileArray = [];
        for(var i = 0; i < $("input[name='payFileList']")[0].files.length; i++){
            fileArray.push($("input[name='payFileList']")[0].files[i]);
        }

        if(fileArray.length > 0){
            var html = '';
            for (var i = 0; i < fileArray.length; i++) {
                size = fCommon.bytesToKB(fileArray[i].size);
                var fileName = "";
                var fileExt = fileArray[i].name.split(".")[fileArray[i].name.split(".").length - 1];
                for(var j = 0 ; j < fileArray[i].name.split(".").length - 1 ; j++){
                    fileName += fileArray[i].name.split(".")[j];

                    if(j != fileArray[i].name.split(".").length - 2){
                        fileName += ".";
                    }
                }
                html += '<tr style="text-align: center;padding-top: 10px;" class="addFile">';
                html += '   <td style="text-align: left">' + fileName + '</td>';
                html += '   <td>' + fileExt + '</td>';
                html += '   <td>' + size + '</td>';
                html += '   <td>';
                // if(fileExt.toLowerCase() == "pdf" || fileExt.toLowerCase() == "jpg" || fileExt.toLowerCase() == "png" || fileExt.toLowerCase() == "jpeg"){
                //     html += '       <input type="button" value="뷰어" class="k-button k-rounded k-button-solid k-button-solid-base" onclick="regPayAtt.fileViewer(' +  + ')">'
                // }
                html += '   </td>';
                if($("#type").val() != "exnp"){
                    html += '   <td>';
                    html += '       <input type="button" value="삭제" class="k-button k-rounded k-button-solid k-button-solid-error" onclick="fCommon.fnUploadFile(' + i + ')">'
                    html += '   </td>';
                }
                html += '</tr>';
            }
            $("#fileGrid").append(html);
        }

        opener.parent.regPay.global.fileArray = fileArray;
    },

    fn_addFile : function(){
        var fileArray = [];
        if($("#type").val() != "exnp"){
            fileArray = opener.parent.regPay.global.fileArray;
        } else {
            fileArray = opener.parent.regExnp.global.fileArray
        }

        let size = 0;
        if(fileArray.length > 0){
            $("#fileGrid").find(".addFile").remove();

            var html = '';

            for (var i = 0; i < fileArray.length; i++) {
                size = fCommon.bytesToKB(fileArray[i].size);
                var fileName = "";
                var fileExt = fileArray[i].name.split(".")[fileArray[i].name.split(".").length - 1];
                for(var j = 0 ; j < fileArray[i].name.split(".").length - 1 ; j++){
                    fileName += fileArray[i].name.split(".")[j];

                    if(j != fileArray[i].name.split(".").length - 2){
                        fileName += ".";
                    }
                }
                html += '<tr style="text-align: center;padding-top: 10px;" class="addFile">';
                html += '   <td style="text-align: left">' + fileName + '</td>';
                html += '   <td>' + fileExt + '</td>';
                html += '   <td>' + size + '</td>';
                html += '   <td>';
                // if(fileExt.toLowerCase() == "pdf" || fileExt.toLowerCase() == "jpg" || fileExt.toLowerCase() == "png" || fileExt.toLowerCase() == "jpeg"){
                //     html += '       <input type="button" value="뷰어" class="k-button k-rounded k-button-solid k-button-solid-base" onclick="regPayAtt.fileViewer(' +  + ')">'
                // }
                html += '   </td>';
                if($("#type").val() != "exnp"){
                    html += '   <td>';
                    html += '       <input type="button" value="삭제" class="k-button k-rounded k-button-solid k-button-solid-error" onclick="regPayAtt.fnUploadFile(' + i + ')">'
                    html += '   </td>';
                }
                html += '</tr>';
            }
            $("#fileGrid").append(html);
        }
    },

    fn_setFile : function(){
        var fileArray = [];
        if($("#type").val() != "exnp"){
            fileArray = opener.parent.regPay.global.fileArray;
        } else {
            fileArray = opener.parent.regExnp.global.fileArray;
        }


        let size = 0;
        if(fileArray.length > 0){
            $("#fileGrid").find(".addFile").remove();

            var html = '';

            for (var i = 0; i < fileArray.length; i++) {
                size = fCommon.bytesToKB(fileArray[i].file_size);

                html += '<tr style="text-align: center;padding-top: 10px;" class="addFile">';
                html += '   <td style="text-align: left">' + fileArray[i].file_org_name + '</td>';
                html += '   <td>' + fileArray[i].file_ext + '</td>';
                html += '   <td>' + size + '</td>';
                html += '   <td>';
                if(fileArray[i].file_ext.toLowerCase() == "pdf" || fileArray[i].file_ext.toLowerCase() == "jpg" || fileArray[i].file_ext.toLowerCase() == "png" || fileArray[i].file_ext.toLowerCase() == "jpeg"){
                    html += '       <input type="button" value="뷰어" class="k-button k-rounded k-button-solid k-button-solid-base" onclick="regPayAtt.fileViewer(\'' + fileArray[i].file_path + fileArray[i].file_uuid +'\')">'
                }
                html += '   </td>';
                if($("#type").val() != "exnp"){
                    html += '   <td>';
                    html += '       <input type="button" value="삭제" class="k-button k-rounded k-button-solid k-button-solid-error" onclick="regPayAtt.fn_delFile(' + fileArray[i].file_no + ')">'
                    html += '   </td>';
                }
                html += '</tr>';
            }
            $("#fileGrid").append(html);
        }
    },

    fnUploadFile : function(e) {
        let size = 0;
        const dataTransfer = new DataTransfer();
        let fileArray2 = Array.from(opener.parent.regPay.global.fileArray);
        fileArray2.splice(e, 1);
        fileArray2.forEach(file => {
            dataTransfer.items.add(file);
        });

        opener.parent.regPay.global.fileArray = dataTransfer.files;

        var fileArray = [];
        fileArray = opener.parent.regPay.global.fileArray;
        if(fileArray.length > 0){
            $("#fileGrid").find(".addFile").remove();

            var html = '';
            for (var i = 0; i <fileArray.length; i++) {
                var fileName = "";
                var fileExt = fileArray[i].name.split(".")[fileArray[i].name.split(".").length - 1];
                for(var j = 0 ; j < fileArray[i].name.split(".").length - 1 ; j++){
                    fileName += fileArray[i].name.split(".")[j];

                    if(j != fileArray[i].name.split(".").length - 2){
                        fileName += ".";
                    }
                }

                size = fCommon.bytesToKB(fileArray[i].size);
                html += '<tr style="text-align: center;" class="addFile">';
                html += '   <td>' + fileName + '</td>';
                html += '   <td>' + fileExt + '</td>';
                html += '   <td>' + size + '</td>';
                html += '   <td>';
                // if(fileExt.toLowerCase() == "pdf" || fileExt.toLowerCase() == "jpg" || fileExt.toLowerCase() == "png" || fileExt.toLowerCase() == "jpeg"){
                //     html += '       <input type="button" value="뷰어" class="k-button k-rounded k-button-solid k-button-solid-base" onclick="regPayAtt.fileViewer(' +  + ')">'
                // }
                html += '   </td>';
                if($("#type").val() != "exnp"){
                    html += '   <td>';
                    html += '       <input type="button" value="삭제" class="k-button k-rounded k-button-solid k-button-solid-error" onclick="fnUploadFile.fnUploadFile(' + i + ')">';
                    html += '   </td>';
                }
                html += '</tr>';
            }

            $("#fileGrid").append(html);
        }else{
            $("#fileGrid").find(".addFile").remove();

            if($("#fileGrid").find("tr").length == 0){
                $("#fileGrid").html('<tr class="defultTr">' +
                    '	<td colspan="5" style="text-align: center;padding-top: 10px;">등록된 파일이 없습니다.</td>' +
                    '</tr>');
            }
        }

        if(fCommon.global.attFiles.length == 0){
            fCommon.global.attFiles = new Array();
        }

    },


    fileViewer : function (path, name){
        var name = "_blank";
        var option = "width = 1300, height = 820, top = 100, left = 400, location = no"
        var popup = window.open("http://218.158.231.186" + path, name, option);
    },

    fn_close : function (){
        if(opener.parent.$("#payAppSn").val() == ""){
            opener.parent.regPay.global.fileArray = [];
        }
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
    }

}