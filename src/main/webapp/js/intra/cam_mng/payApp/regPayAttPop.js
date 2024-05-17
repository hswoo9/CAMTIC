const regPayAtt = {

    global: {
        attFiles: [],
        fileArray: [],
    },

    fn_DefaultScript: function(){
        var parameterArray = [];
        regPayAtt.global.attFiles = opener.parent.regPay.global.attFiles;

        if($("#type").val() != "exnp"){
            console.log(opener.parent.regPay.global.fileArray);
            parameterArray = opener.parent.regPay.global.fileArray;
            regPayAtt.global.fileArray = parameterArray;

            if(opener.parent.regPay.global.result.DOC_STATUS == "10" || opener.parent.regPay.global.result.DOC_STATUS == "50" || opener.parent.regPay.global.result.DOC_STATUS == "100") {
                $("#saveBtn").hide();
                $("label[for='payFileList']").hide();
            }
        } else {
            regPayAtt.global.attFiles = opener.parent.regExnp.global.attFiles;
            parameterArray = opener.parent.regExnp.global.fileArray;
            regPayAtt.global.fileArray = parameterArray;

            if(opener.parent.regExnp.global.result.DOC_STATUS == "10" || opener.parent.regExnp.global.result.DOC_STATUS == "50" || opener.parent.regExnp.global.result.DOC_STATUS == "100") {
                $("#saveBtn").hide();
                $("label[for='payFileList']").hide();
            }
        }
        if(opener.parent.$("#payAppSn").val() != ""){
            if(parameterArray.length > 0){
                $("#emptyTr").remove();
                regPayAtt.fn_setFile();
            } else {
                if(regPayAtt.global.attFiles.length > 0){
                    $("#emptyTr").remove();
                    regPayAtt.fn_attFiles();
                }
            }
        } else {
            if(parameterArray.length > 0){
                $("#emptyTr").remove();
                regPayAtt.fn_addFile();
            } else {
                if(regPayAtt.global.attFiles.length > 0){
                    $("#emptyTr").remove();
                    regPayAtt.fn_attFiles();
                }
            }
        }

        if($("#reqType").val() == "claimExnp"){
            $("#emptyTr").remove();
            // regPayAtt.fn_claimExnpFile();
        } else {
            if($("#purcSn").val() != ""){
                $("#emptyTr").remove();
                regPayAtt.fn_purcInspFile();
            }
        }

    },

    fn_claimExnpFile : function (){
        console.log("fn_claimExnpFile");
        var fileArray = regPayAtt.global.fileArray;
        var attFiles = regPayAtt.global.attFiles;
        var html1 = '';
        var html2 = '';

        // var data = {
        //     purcSn : $("#purcSn").val(),
        //     claimSn : $("#claimSn").val(),
        //     claimExnpSn : $("#claimExnpSn").val()
        // }

        $("#fileGrid").find(".defultTr").remove();
        $("#fileGrid").find(".addFile").remove();

        // var fileResult = customKendo.fn_customAjax("/purc/purcFileList", data)
        //
        // fileArray = fileResult.listMap;

        let size = 0;
        if(fileArray.length > 0) {
            for (var i = 0; i < fileArray.length; i++) {
                size = fileArray[i].file_size > 0 ? fCommon.bytesToKB(fileArray[i].file_size) : '0 KB';

                html1 += '<tr style="text-align: center;padding-top: 10px;">';
                html1 += '   <td style="text-align: left">' + fileArray[i].file_org_name + '</td>';
                html1 += '   <td>' + fileArray[i].file_ext + '</td>';
                html1 += '   <td>' + size + '</td>';
                html1 += '   <td>';
                if (fileArray[i].file_ext.toLowerCase() == "pdf" || fileArray[i].file_ext.toLowerCase() == "jpg" || fileArray[i].file_ext.toLowerCase() == "png" || fileArray[i].file_ext.toLowerCase() == "jpeg") {
                    html1 += '       <input type="button" value="뷰어" class="k-button k-rounded k-button-solid k-button-solid-base" onclick="regPayAtt.fileViewer(\'' + fileArray[i].file_path + fileArray[i].file_uuid + '\')">'
                }
                html1 += '   </td>';
                if ($("#type").val() != "exnp") {
                    html1 += '   <td>';
                    html1 += '       <input type="button" value="삭제" class="k-button k-rounded k-button-solid k-button-solid-error" onclick="regPayAtt.fn_delFile(' + fileArray[i].file_no + ')">'
                    html1 += '   </td>';
                }
                html1 += '</tr>';
            }
            // $("#fileGrid").append(html);
        }

        if(attFiles.length > 0){
            for (var i = 0; i < attFiles.length; i++) {
                size = attFiles[i].size > 0 ? fCommon.bytesToKB(attFiles[i].size) : '0 KB';

                var fileName = attFiles[i].name.toString().split(".")[0];
                var fileExt = attFiles[i].name.toString().split(".")[1];
                html2 += '<tr style="text-align: center;padding-top: 10px;" class="addFile">';
                html2 += '   <td style="text-align: left">' + fileName + '</td>';
                html2 += '   <td>' + fileExt + '</td>';
                html2 += '   <td>' + size + '</td>';
                html2 += '   <td>';

                // if(attFiles[i].file_ext != undefined && attFiles[i].file_ext != null && attFiles[i].file_ext != ""){
                //     if(fileExt.toLowerCase() == "pdf" || fileExt.toLowerCase() == "jpg" || fileExt.toLowerCase() == "png" || fileExt.toLowerCase() == "jpeg"){
                //         html += '       <input type="button" value="뷰어" class="k-button k-rounded k-button-solid k-button-solid-base" onclick="regPayAtt.fileViewer(\'' + attFiles[i].file_path + attFiles[i].file_uuid +'\')">'
                //     }
                // }

                html2 += '   </td>';
                if($("#type").val() != "exnp"){
                    html2 += '   <td>';
                    html2 += '       <input type="button" value="삭제" class="k-button k-rounded k-button-solid k-button-solid-error" onclick="regPayAtt.fnUploadFile(' + i + ')">'
                    html2 += '   </td>';
                }

                html2 += '</tr>';
            }
            // $("#fileGrid").append(html);
        }

        $("#fileGrid").append(html1 + html2);
    },

    fileChange : function (){
        // opener.parent.regPay.global.fileArray = [];
        $("#emptyTr").remove();
        let size = 0;
        let fileArray = regPayAtt.global.attFiles;
        for(var i = 0; i < $("input[name='payFileList']")[0].files.length; i++){
            fileArray.push($("input[name='payFileList']")[0].files[i]);
        }

        if(fileArray.length > 0){
            $("#fileGrid").find(".defultTr").remove();
            $("#fileGrid").find(".addFile").remove();
            var html = '';
            for (var i = 0; i < fileArray.length; i++) {
                size = fCommon.bytesToKB(fileArray[i].size);
                var fileName = fileArray[i].name.substring(0, fileArray[i].name.lastIndexOf("."));
                var fileExt = fileArray[i].name.substring(fileArray[i].name.lastIndexOf(".")+1);

                // opener.parent.regPay.global.fileArray.push(fileArray[i]);

                html += '<tr style="text-align: center;padding-top: 10px;" class="addFile">';
                html += '   <td style="text-align: left">' + fileName + '</td>';
                html += '   <td>' + fileExt + '</td>';
                html += '   <td>' + size + '</td>';
                html += '   <td>';
                // if(fileExt.toLowerCase() == "pdf" || fileExt.toLowerCase() == "jpg" || fileExt.toLowerCase() == "png" || fileExt.toLowerCase() == "jpeg"){
                //     html += '       <input type="button" value="뷰어" class="k-button k-rounded k-button-solid k-button-solid-base" onclick="regPayAtt.fileViewer(' +  + ')">'
                // }
                html += '   </td>';
                // if($("#type").val() != "exnp"){
                    html += '   <td>';
                    html += '       <input type="button" value="삭제" class="k-button k-rounded k-button-solid k-button-solid-error" onclick="regPayAtt.fnUploadFile(' + i + ')">'
                    html += '   </td>';
                // }
                html += '</tr>';
            }
            $("#fileGrid").append(html);
        }

    },

    fn_addFile : function(){
        console.log("fn_addFile");
        let fileArray = regPayAtt.global.fileArray;
        let attFiles = regPayAtt.global.attFiles;
        let html1 = '';
        let html2 = '';

        /** 출장일 경우 다른 방식으로 파일 추가함 */
        if(opener.parent.$("#reqType").val() == "bustrip" || opener.parent.$("#reqType").val() == "snack"){
            regPayAtt.fn_bustripAddFile();
            return;
        }

        let size = 0;
        if(fileArray.length > 0){
            for (var i = 0; i < fileArray.length; i++) {
                size = fileArray[i].file_size > 0 ? fCommon.bytesToKB(fileArray[i].file_size) : '0 KB';
                var fileName = fileArray[i].file_org_name;
                var fileExt = fileArray[i].file_ext;

                html1 += '<tr style="text-align: center;padding-top: 10px;">';
                html1 += '   <td style="text-align: left">' + fileName + '</td>';
                html1 += '   <td>' + fileExt + '</td>';
                html1 += '   <td>' + size + '</td>';
                html1 += '   <td>';
                if(fileExt.toLowerCase() == "pdf" || fileExt.toLowerCase() == "jpg" || fileExt.toLowerCase() == "png" || fileExt.toLowerCase() == "jpeg"){
                    html1 += '       <input type="button" value="뷰어" class="k-button k-rounded k-button-solid k-button-solid-base" onclick="regPayAtt.fileViewer(\'' + fileArray[i].file_path + fileArray[i].file_uuid +'\')">'
                }
                html1 += '   </td>';
                html1 += '   <td>';
                if($("#type").val() != "exnp"){
                    html1 += '       <input type="button" value="삭제" class="k-button k-rounded k-button-solid k-button-solid-error" onclick="regPayAtt.fn_delFile(' + fileArray[i].file_no + ')">';
                }
                html1 += '   </td>';
                html1 += '</tr>';
            }
            // $("#fileGrid").append(html);
        }

        if(attFiles.length > 0){
            for (var i = 0; i < attFiles.length; i++) {
                size = attFiles[i].size > 0 ? fCommon.bytesToKB(attFiles[i].size) : '0 KB';
                var fileName = attFiles[i].name.substring(0, attFiles[i].name.lastIndexOf("."));
                var fileExt = attFiles[i].name.substring(attFiles[i].name.lastIndexOf(".") + 1);

                html2 += '<tr style="text-align: center;padding-top: 10px;" class="addFile">';
                html2 += '   <td style="text-align: left">' + fileName + '</td>';
                html2 += '   <td>' + fileExt + '</td>';
                html2 += '   <td>' + size + '</td>';
                html2 += '   <td>';

                // if(attFiles[i].file_ext != undefined && attFiles[i].file_ext != null && attFiles[i].file_ext != ""){
                //     if(fileExt.toLowerCase() == "pdf" || fileExt.toLowerCase() == "jpg" || fileExt.toLowerCase() == "png" || fileExt.toLowerCase() == "jpeg"){
                //         html += '       <input type="button" value="뷰어" class="k-button k-rounded k-button-solid k-button-solid-base" onclick="regPayAtt.fileViewer(\'' + attFiles[i].file_path + attFiles[i].file_uuid +'\')">'
                //     }
                // }

                html2 += '   </td>';
                if($("#type").val() != "exnp"){
                    html2 += '   <td>';
                    html2 += '       <input type="button" value="삭제" class="k-button k-rounded k-button-solid k-button-solid-error" onclick="regPayAtt.fnUploadFile(' + i + ')">'
                    html2 += '   </td>';
                }

                html2 += '</tr>';
            }
            // $("#fileGrid").append(html);
        }

        $("#fileGrid").append(html1 + html2);
    },

    fn_attFiles : function(){
        console.log("fn_attFiles");
        var attFiles = regPayAtt.global.attFiles;
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
                //         html += '       <input type="button" value="뷰어" class="k-button k-rounded k-button-solid k-button-solid-base" onclick="regPayAtt.fileViewer(\'' + attFiles[i].file_path + attFiles[i].file_uuid +'\')">'
                //     }
                // }

                html += '   </td>';
                if($("#type").val() != "exnp"){
                    html += '   <td>';
                    html += '       <input type="button" value="삭제" class="k-button k-rounded k-button-solid k-button-solid-error" onclick="regPayAtt.fnUploadFile(' + i + ')">'
                    html += '   </td>';
                }

                html += '</tr>';
            }
            // $("#fileGrid").append(html);
        }

        $("#fileGrid").append(html);
    },

    fn_bustripAddFile : function(){
        console.log("fn_bustripAddFile");

        var fileArray = regPayAtt.global.fileArray;
        var attFiles = regPayAtt.global.attFiles;
        var html1 = '';
        var html2 = '';

        let size = 0;
        if(fileArray.length > 0){
            for (var i = 0; i < fileArray.length; i++) {
                size = fileArray[i].file_size > 0 ? fCommon.bytesToKB(fileArray[i].file_size) : '0 KB';
                var fileName = fileArray[i].file_org_name;
                var fileExt = fileArray[i].file_ext;
                html1 += '<tr style="text-align: center;padding-top: 10px;">';
                html1 += '   <td style="text-align: left">' + fileName + '</td>';
                html1 += '   <td>' + fileExt + '</td>';
                html1 += '   <td>' + size + '</td>';
                html1 += '   <td>';

                if(fileExt.toLowerCase() == "pdf" || fileExt.toLowerCase() == "jpg" || fileExt.toLowerCase() == "png" || fileExt.toLowerCase() == "jpeg"){
                    html1 += '       <input type="button" value="뷰어" class="k-button k-rounded k-button-solid k-button-solid-base" onclick="regPayAtt.fileViewer(\'' + fileArray[i].file_path + fileArray[i].file_uuid +'\')">'
                }
                
                html1 += '   </td>';
                if($("#type").val() != "exnp"){
                    html1 += '   <td>';
                    html1 += '   </td>';
                }
                html1 += '</tr>';
            }
            // $("#fileGrid").append(html);
        }

        if(attFiles.length > 0){
            for (var i = 0; i < attFiles.length; i++) {
                size = attFiles[i].size > 0 ? fCommon.bytesToKB(attFiles[i].size) : '0 KB';
                var fileName = attFiles[i].name.toString().split(".")[0];
                var fileExt = attFiles[i].name.toString().split(".")[1];

                html2 += '<tr style="text-align: center;padding-top: 10px;" class="addFile">';
                html2 += '   <td style="text-align: left">' + fileName + '</td>';
                html2 += '   <td>' + fileExt + '</td>';
                html2 += '   <td>' + size + '</td>';
                html2 += '   <td>';

                // if(attFiles[i].file_ext != undefined && attFiles[i].file_ext != null && attFiles[i].file_ext != ""){
                //     if(fileExt.toLowerCase() == "pdf" || fileExt.toLowerCase() == "jpg" || fileExt.toLowerCase() == "png" || fileExt.toLowerCase() == "jpeg"){
                //         html += '       <input type="button" value="뷰어" class="k-button k-rounded k-button-solid k-button-solid-base" onclick="regPayAtt.fileViewer(\'' + attFiles[i].file_path + attFiles[i].file_uuid +'\')">'
                //     }
                // }

                html2 += '   </td>';
                if($("#type").val() != "exnp"){
                    html2 += '   <td>';
                    html2 += '       <input type="button" value="삭제" class="k-button k-rounded k-button-solid k-button-solid-error" onclick="regPayAtt.fnUploadFile(' + i + ')">'
                    html2 += '   </td>';
                }

                html2 += '</tr>';
            }
            // $("#fileGrid").append(html);
        }

        $("#fileGrid").append(html1 + html2);
    },

    fn_setFile : function(){
        console.log("fn_setFile");
        let fileArray= regPayAtt.global.fileArray;
        let attFiles = regPayAtt.global.attFiles;
        let html1 = '';
        let html2 = '';
        let size = 0;

        if(fileArray.length > 0){
            for (var i = 0; i < fileArray.length; i++) {
                size = fileArray[i].file_size > 0 ? fCommon.bytesToKB(fileArray[i].file_size) : '0 KB';

                var fileName = fileArray[i].file_org_name;
                var fileExt = fileArray[i].file_ext;
                html1 += '<tr style="text-align: center;padding-top: 10px;">';
                html1 += '   <td style="text-align: left"><span style="cursor: pointer;" onclick="fileDown(\''+fileArray[i].file_path+fileArray[i].file_uuid+'\', \''+fileArray[i].file_org_name+'.'+fileArray[i].file_ext+'\')">' + fileName + '</span></td>';
                html1 += '   <td>' + fileExt + '</td>';
                html1 += '   <td>' + size + '</td>';
                html1 += '   <td>';

                if(fileExt.toLowerCase() == "pdf" || fileExt.toLowerCase() == "jpg" || fileExt.toLowerCase() == "png" || fileExt.toLowerCase() == "jpeg"){
                    html1 += '       <input type="button" value="뷰어" class="k-button k-rounded k-button-solid k-button-solid-base" onclick="regPayAtt.fileViewer(\'' + fileArray[i].file_path + fileArray[i].file_uuid +'\')">'
                }

                html1 += '   </td>';
                // if($("#type").val() != "exnp"){
                html1 += '   <td>';
                if($("#type").val() == "exnp"){
                    if(opener.parent.regExnp.global.result.DOC_STATUS != "100" && opener.parent.regExnp.global.result.DOC_STATUS != "10" && opener.parent.regExnp.global.result.DOC_STATUS != "50"){
                        html1 += '       <input type="button" value="삭제" class="k-button k-rounded k-button-solid k-button-solid-error" onclick="regPayAtt.fn_delFile(' + fileArray[i].file_no + ')">'
                    }
                } else {
                    if(opener.parent.regPay.global.result.DOC_STATUS != "100" && opener.parent.regPay.global.result.DOC_STATUS != "10" && opener.parent.regPay.global.result.DOC_STATUS != "50"){
                        html1 += '       <input type="button" value="삭제" class="k-button k-rounded k-button-solid k-button-solid-error" onclick="regPayAtt.fn_delFile(' + fileArray[i].file_no + ')">'
                    }
                }
                html1 += '   </td>';
                // }

                html1 += '</tr>';
            }
            // $("#fileGrid").append(html);
        }

        if(attFiles.length > 0){
            for (var i = 0; i < attFiles.length; i++) {
                size = fCommon.bytesToKB((attFiles[i].file_size || attFiles[i].size));

                var fileName = (attFiles[i].file_org_name || attFiles[i].name.toString().substring(0, attFiles[i].name.toString().lastIndexOf(".")));
                var fileExt = (attFiles[i].file_ext || attFiles[i].name.toString().substring(attFiles[i].name.toString().lastIndexOf(".")+1));
                html2 += '<tr style="text-align: center;padding-top: 10px;" class="addFile">';
                html2 += '   <td style="text-align: left">' + fileName + '</td>';
                html2 += '   <td>' + fileExt + '</td>';
                html2 += '   <td>' + size + '</td>';
                html2 += '   <td>';

                // if(attFiles[i].file_ext != undefined && attFiles[i].file_ext != null && attFiles[i].file_ext != ""){
                //     if(fileExt.toLowerCase() == "pdf" || fileExt.toLowerCase() == "jpg" || fileExt.toLowerCase() == "png" || fileExt.toLowerCase() == "jpeg"){
                //         html += '       <input type="button" value="뷰어" class="k-button k-rounded k-button-solid k-button-solid-base" onclick="regPayAtt.fileViewer(\'' + attFiles[i].file_path + attFiles[i].file_uuid +'\')">'
                //     }
                // }

                html2 += '   </td>';
                // if($("#type").val() != "exnp"){
                    html2 += '   <td>';
                    html2 += '       <input type="button" value="삭제" class="k-button k-rounded k-button-solid k-button-solid-error" onclick="regPayAtt.fnUploadFile(' + i + ')">'
                    html2 += '   </td>';
                // }

                html2 += '</tr>';
            }
            // $("#fileGrid").append(html);+
        }

        $("#fileGrid").append(html1 + html2);
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
                        html += '   <td>';
                        if(e[i].file_ext.toLowerCase() == "png" || e[i].file_ext.toLowerCase() == "pdf" || e[i].file_ext.toLowerCase() == "jpg" || e[i].file_ext.toLowerCase() == "jpeg"){
                            html += '       <button type="button" class="k-button k-rounded k-button-solid k-button-solid-base" onclick="regPayAtt.fileViewer(\''+e[i].file_path+e[i].file_uuid+'\', \''+e[i].file_org_name+'.'+e[i].file_ext+'\')">' +
                                '			    <span class="k-button-text">뷰어</span>' +
                                '		    </button>';
                        }
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
        let fileArray2 = Array.from(regPayAtt.global.attFiles);
        fileArray2.splice(e, 1);
        fileArray2.forEach(file => {
            dataTransfer.items.add(file);
        });

        regPayAtt.global.attFiles = dataTransfer.files;

        var fileArray = [];
        fileArray = regPayAtt.global.attFiles;
        if(fileArray.length > 0){
            $("#fileGrid").find(".addFile").remove();

            var html = '';
            for (var i = 0; i <fileArray.length; i++) {
                var fileName = fileArray[i].name.substring(0, fileArray[i].name.lastIndexOf("."));
                var fileExt = fileArray[i].name.substring(fileArray[i].name.lastIndexOf(".") + 1);

                size = fCommon.bytesToKB(fileArray[i].size);
                html += '<tr style="text-align: center;" class="addFile">';
                html += '   <td style="text-align: left;">' + fileName + '</td>';
                html += '   <td>' + fileExt + '</td>';
                html += '   <td>' + size + '</td>';
                html += '   <td>';
                // if(fileExt.toLowerCase() == "pdf" || fileExt.toLowerCase() == "jpg" || fileExt.toLowerCase() == "png" || fileExt.toLowerCase() == "jpeg"){
                //     html += '       <input type="button" value="뷰어" class="k-button k-rounded k-button-solid k-button-solid-base" onclick="regPayAtt.fileViewer(' +  + ')">'
                // }
                html += '   </td>';
                // if($("#type").val() != "exnp"){
                    html += '   <td>';
                    html += '       <input type="button" value="삭제" class="k-button k-rounded k-button-solid k-button-solid-error" onclick="regPayAtt.fnUploadFile(' + i + ')">';
                    html += '   </td>';
                // }
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

        if(regPayAtt.global.attFiles.length == 0){
            regPayAtt.global.attFiles = new Array();
        }

        if($("#type").val() != "exnp"){
            opener.parent.regPay.global.attFiles = regPayAtt.global.attFiles;
        } else {
            opener.parent.regExnp.global.attFiles = regPayAtt.global.attFiles;
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

    fn_close : function (){
        window.close();
    },

    fn_regist: function(){
        if($("#type").val() != "exnp"){

            if(opener.parent.$("#payAppSn").val() != "" && opener.parent.$("#auth").val() == "mng"){
                var parameters = {
                    payAppSn : opener.parent.$("#payAppSn").val(),
                    empSeq : opener.parent.$("#empSeq").val(),
                    menuCd : "payApp"
                }

                if(opener.parent.$("#exnpSn").val() != ""){
                    delete parameters.payAppSn;

                    parameters.exnpSn = opener.parent.$("#exnpSn").val();
                    parameters.menuCd = "exnp";
                }

                var fd = new FormData();

                for(var key in parameters){
                    fd.append(key, parameters[key]);
                }

                if(opener.parent.regPay.global.attFiles != null){
                    for(var i = 0; i < opener.parent.regPay.global.attFiles.length; i++){
                        fd.append("fileList", opener.parent.regPay.global.attFiles[i]);
                    }
                }

                $.ajax({
                    url : "/payApp/payAppMngFileSet",
                    data : fd,
                    type : "post",
                    dataType : "json",
                    contentType: false,
                    processData: false,
                    enctype : 'multipart/form-data',
                    async: false,
                    success : function(rs){
                        if(rs.code == 200){
                            window.close();
                            opener.window.location.reload();
                        }
                    }
                });
            } else {
                window.close();
            }
        } else {

            var parameters = {
                payAppSn : opener.parent.$("#payAppSn").val(),
                empSeq : opener.parent.$("#empSeq").val(),
                menuCd : "exnp"
            }
            var fd = new FormData();

            for(var key in parameters){
                fd.append(key, parameters[key]);
            }

            if(opener.parent.regExnp.global.attFiles != null){
                for(var i = 0; i < opener.parent.regExnp.global.attFiles.length; i++){
                    fd.append("fileList", opener.parent.regExnp.global.attFiles[i]);
                }
            }

            window.close();

            // $.ajax({
            //     url : "/payApp/payAppMngFileSet",
            //     data : fd,
            //     type : "post",
            //     dataType : "json",
            //     contentType: false,
            //     processData: false,
            //     enctype : 'multipart/form-data',
            //     async: false,
            //     success : function(rs){
            //         if(rs.code == 200){
            //             window.close();
            //             opener.window.location.reload();
            //         }
            //     }
            // });
        }
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
                        var fileArr = opener.parent.regExnp.global.fileArray;
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

    fn_multiDownload : function (){
        var fileArray = regPayAtt.global.fileArray;

        if(fileArray.length > 0){
            for(let i=0; i<fileArray.length; i++){
                fileDown(fileArray[i].file_path+fileArray[i].file_uuid, fileArray[i].file_org_name+'.'+fileArray[i].file_ext);
            }
        }
    }
}