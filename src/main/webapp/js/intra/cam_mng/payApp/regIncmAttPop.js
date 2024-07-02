const regIncmAtt = {

    global: {
        attFiles: [],
        fileArray: [],
    },

    fn_DefaultScript: function(){
        var parameterArray = [];

        parameterArray = opener.parent.regIncm.global.fileArray;
        regIncmAtt.global.fileArray = parameterArray;
        regIncmAtt.global.attFiles = opener.parent.regIncm.global.attFiles;

        if(parameterArray.length > 0){
            $("#emptyTr").remove();
            regIncmAtt.fn_setFile();
        } else {
            if(regIncmAtt.global.attFiles.length > 0){
                $("#emptyTr").remove();
                regIncmAtt.fn_attFiles();
            }
        }
    },

    fileChange : function (){
        // opener.parent.regIncm.global.fileArray = [];
        $("#emptyTr").remove();
        let size = 0;
        var fileArray = regIncmAtt.global.attFiles;
        for(var i = 0; i < $("input[name='payFileList']")[0].files.length; i++){
            fileArray.push($("input[name='payFileList']")[0].files[i]);
        }

        if(fileArray.length > 0){
            $("#fileGrid").find(".defultTr").remove();
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
                // opener.parent.regIncm.global.fileArray.push(fileArray[i]);

                html += '<tr style="text-align: center;padding-top: 10px;" class="addFile">';
                html += '   <td style="text-align: left">' + fileName + '</td>';
                html += '   <td>' + fileExt + '</td>';
                html += '   <td>' + size + '</td>';
                html += '   <td>';
                // if(fileExt.toLowerCase() == "pdf" || fileExt.toLowerCase() == "jpg" || fileExt.toLowerCase() == "png" || fileExt.toLowerCase() == "jpeg"){
                //     html += '       <input type="button" value="뷰어" class="k-button k-rounded k-button-solid k-button-solid-base" onclick="regIncmAtt.fileViewer(' +  + ')">'
                // }
                html += '   </td>';
                if($("#type").val() != "exnp"){
                    html += '   <td>';
                    html += '       <input type="button" value="삭제" class="k-button k-rounded k-button-solid k-button-solid-error" onclick="regIncmAtt.fnUploadFile(' + i + ')">'
                    html += '   </td>';
                }
                html += '</tr>';
            }
            $("#fileGrid").append(html);
        }

        // opener.parent.regPay.global.fileArray = fileArray;
    },

    fn_addFile : function(){
        var fileArray = [];
        if($("#type").val() != "exnp"){
            fileArray = opener.parent.regPay.global.fileArray;
        } else {
            fileArray = opener.parent.regExnp.global.fileArray
        }

        /** 출장일 경우 다른 방식으로 파일 추가함 */
        if(opener.parent.$("#reqType").val() == "bustrip" || opener.parent.$("#reqType").val() == "snack"){
            regIncmAtt.fn_bustripAddFile();
            return;
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
                //     html += '       <input type="button" value="뷰어" class="k-button k-rounded k-button-solid k-button-solid-base" onclick="regIncmAtt.fileViewer(' +  + ')">'
                // }
                html += '   </td>';
                if($("#type").val() != "exnp"){
                    html += '   <td>';
                    html += '       <input type="button" value="삭제" class="k-button k-rounded k-button-solid k-button-solid-error" onclick="regIncmAtt.fnUploadFile(' + i + ')">'
                    html += '   </td>';
                }
                html += '</tr>';
            }
            $("#fileGrid").append(html);
        }
    },

    fn_bustripAddFile : function(){
        var fileArray = [];
        fileArray = opener.parent.regPay.global.fileArray;

        let size = 0;
        if(fileArray.length > 0){
            $("#fileGrid").find(".addFile").remove();

            var html = '';

            for (var i = 0; i < fileArray.length; i++) {
                size = fCommon.bytesToKB(fileArray[i].file_size);
                var fileName = fileArray[i].file_org_name;
                var fileExt = fileArray[i].file_ext;
                html += '<tr style="text-align: center;padding-top: 10px;" class="addFile">';
                html += '   <td style="text-align: left">' + fileName + '</td>';
                html += '   <td>' + fileExt + '</td>';
                html += '   <td>' + size + '</td>';
                html += '   <td>';
                html += '   </td>';
                if($("#type").val() != "exnp"){
                    html += '   <td>';
                    html += '   </td>';
                }
                html += '</tr>';
            }
            $("#fileGrid").append(html);
        }
    },

    fn_setFile : function(){
        console.log("fn_setFile");
        var fileArray = regIncmAtt.global.fileArray;
        var attFiles = regIncmAtt.global.attFiles;
        var html1 = '';
        var html2 = '';
        let size = 0;

        if(fileArray.length > 0){
            for (var i = 0; i < fileArray.length; i++) {
                size = fileArray[i].file_size > 0 ? fCommon.bytesToKB(fileArray[i].file_size) : '0 KB';
                var fileName = fileArray[i].file_org_name;
                var fileExt = fileArray[i].file_ext;

                html1 += '<tr style="text-align: center;padding-top: 10px;">';
                html1 += '   <td style="text-align: left">' + fileName+ '</td>';
                html1 += '   <td>' + fileExt + '</td>';
                html1 += '   <td>' + size + '</td>';
                html1 += '   <td>';

                if(fileArray[i].file_ext != undefined && fileArray[i].file_ext != null && fileArray[i].file_ext != ""){
                    /*if(fileExt.toLowerCase() == "pdf" || fileExt.toLowerCase() == "jpg" || fileExt.toLowerCase() == "png" || fileExt.toLowerCase() == "jpeg"){

                    }*/
                    html1 += '       <input type="button" value="뷰어" class="k-button k-rounded k-button-solid k-button-solid-base" onclick="fileViewer(\''+ fileArray[i].file_path +'\', \''+ fileArray[i].file_uuid +'\')">'
                }

                html1 += '   </td>';
                if(fileArray[i].file_ext != undefined && fileArray[i].file_ext != null && fileArray[i].file_ext != "") {
                    if($("#type").val() != "exnp"){
                        html1 += '   <td>';
                        html1 += '       <input type="button" value="삭제" class="k-button k-rounded k-button-solid k-button-solid-error" onclick="regIncmAtt.fn_delFile(' + fileArray[i].file_no + ')">'
                        html1 += '   </td>';
                    }
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
                //         html += '       <input type="button" value="뷰어" class="k-button k-rounded k-button-solid k-button-solid-base" onclick="regIncmAtt.fileViewer(\'' + attFiles[i].file_path + attFiles[i].file_uuid +'\')">'
                //     }
                // }

                html2 += '   </td>';
                if($("#type").val() != "exnp"){
                    html2 += '   <td>';
                    html2 += '       <input type="button" value="삭제" class="k-button k-rounded k-button-solid k-button-solid-error" onclick="regIncmAtt.fnUploadFile(' + i + ')">'
                    html2 += '   </td>';
                }

                html2 += '</tr>';
            }
            // $("#fileGrid").append(html);+
        }

        $("#fileGrid").append(html1 + html2);
    },

    fn_attFiles : function(){
        console.log("fn_attFiles");
        var attFiles = regIncmAtt.global.attFiles;
        let html = '';

        if(attFiles.length > 0){
            for (var i = 0; i < attFiles.length; i++) {
                var size = attFiles[i].size > 0 ? fCommon.bytesToKB(attFiles[i].size) : '0 KB';
                var fileName = attFiles[i].name.toString().split(".")[0];
                var fileExt = attFiles[i].name.toString().split(".")[1];

                html += '<tr style="text-align: center;padding-top: 10px;">';
                html += '   <td style="text-align: left">' + fileName + '</td>';
                html += '   <td>' + fileExt + '</td>';
                html += '   <td>' + size + '</td>';
                html += '   <td>';

                // if(attFiles[i].file_ext != undefined && attFiles[i].file_ext != null && attFiles[i].file_ext != ""){
                //     if(fileExt.toLowerCase() == "pdf" || fileExt.toLowerCase() == "jpg" || fileExt.toLowerCase() == "png" || fileExt.toLowerCase() == "jpeg"){
                //         html += '       <input type="button" value="뷰어" class="k-button k-rounded k-button-solid k-button-solid-base" onclick="regIncmAtt.fileViewer(\'' + attFiles[i].file_path + attFiles[i].file_uuid +'\')">'
                //     }
                // }

                html += '   </td>';
                if($("#type").val() != "exnp"){
                    html += '   <td>';
                    html += '       <input type="button" value="삭제" class="k-button k-rounded k-button-solid k-button-solid-error" onclick="regIncmAtt.fnUploadFile(' + i + ')">'
                    html += '   </td>';
                }

                html += '</tr>';
            }
            // $("#fileGrid").append(html);
        }

        $("#fileGrid").append(html);
    },

    fn_purcInspFile : function(){
        $.ajax({
            url : "/purc/getPurcReqFileList.do",
            data : {
                purcSn : $("#purcSn").val()
            },
            type : "post",
            dataType : "json",
            async: false,
            success : function(rs){
                var e = rs.list;
                var html = '';

                if(e.length > 0){
                    for(var i = 0; i < e.length; i++){
                        html += '<tr style="text-align: center;padding-top: 10px;" class="addFile">';
                        html += '   <td style="text-align: left">'+e[i].file_org_name+'</td>';
                        html += '   <td>'+ e[i].file_ext +'</td>';
                        html += '   <td>'+ e[i].file_size +'</td>';
                        html += '   <td>';/*
                        if(e[i].file_ext.toLowerCase() == "png" || e[i].file_ext.toLowerCase() == "pdf" || e[i].file_ext.toLowerCase() == "jpg" || e[i].file_ext.toLowerCase() == "jpeg"){

                        }*/
                        html += '       <button type="button" class="k-button k-rounded k-button-solid k-button-solid-base" onclick="fileViewer(\''+ e[i].file_path +'\', \'' +e[i].file_uuid+ '\')">' +
                            '			    <span class="k-button-text">뷰어</span>' +
                            '		    </button>';
                        html += '   </td>';
                        html += '   <td></td>';
                        html += '</tr>';
                    }

                    var fileArray = [];
                    if($("#type").val() != "exnp"){
                        fileArray = opener.parent.regPay.global.fileArray;
                    } else {
                        fileArray = opener.parent.regExnp.global.fileArray;
                    }
                    if (fileArray.length > 0) {
                        $("#fileGrid").append(html);
                    } else {
                        $("#fileGrid").html(html);
                    }
                }
            }
        });
    },

    fnUploadFile : function(e) {
        let size = 0;
        const dataTransfer = new DataTransfer();
        let fileArray2 = Array.from(regIncmAtt.global.attFiles);
        fileArray2.splice(e, 1);
        fileArray2.forEach(file => {
            dataTransfer.items.add(file);
        });

        regIncmAtt.global.attFiles = dataTransfer.files;

        var fileArray = [];
        fileArray = regIncmAtt.global.attFiles;
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
                html += '   <td style="text-align: left;">' + fileName + '</td>';
                html += '   <td>' + fileExt + '</td>';
                html += '   <td>' + size + '</td>';
                html += '   <td>';
                // if(fileExt.toLowerCase() == "pdf" || fileExt.toLowerCase() == "jpg" || fileExt.toLowerCase() == "png" || fileExt.toLowerCase() == "jpeg"){
                //     html += '       <input type="button" value="뷰어" class="k-button k-rounded k-button-solid k-button-solid-base" onclick="regIncmAtt.fileViewer(' +  + ')">'
                // }
                html += '   </td>';
                if($("#type").val() != "exnp"){
                    html += '   <td>';
                    html += '       <input type="button" value="삭제" class="k-button k-rounded k-button-solid k-button-solid-error" onclick="regIncmAtt.fnUploadFile(' + i + ')">';
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

        if(regIncmAtt.global.attFiles.length == 0){
            regIncmAtt.global.attFiles = new Array();
        }

        opener.parent.regIncm.global.attFiles = regIncmAtt.global.attFiles;
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

    fn_close : function (){
        // if(opener.parent.$("#payDepoSn").val() == "" && opener.parent.$("#payIncpSn").val() == ""){
        //     opener.parent.regIncm.global.fileArray = [];
        // }
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
                        var fileArr = opener.parent.regIncm.global.fileArray;
                    } else {
                        var fileArr = opener.parent.regIncm.global.fileArray;
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