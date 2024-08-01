const regReListFilePop = {

    global : {
        fileArray : [],
        attFiles : [],
    },

    fn_DefaultScript: function(){
        var parameterArray = [];

        regReListFilePop.fn_setFile();

    },

    fileChange : function (){
        $("#emptyTr").remove();
        let size = 0;
        var fileArray = [];
        for(var i = 0; i < $("input[name='payFileList']")[0].files.length; i++){
            regReListFilePop.global.attFiles.push($("input[name='payFileList']")[0].files[i]);
        }

        fileArray = regReListFilePop.global.attFiles;
        if(fileArray.length > 0){
            $("#fileGrid").find(".defultTr").remove();
            $("#fileGrid").find(".addFile").remove();

            var html = '';
            for (var i = 0; i < fileArray.length; i++) {
                size = fileArray[i].size > 0 ? fCommon.bytesToKB(fileArray[i].size) : 0;
                var fileName = "";
                var fileExt = (fileArray[i].file_ext || fileArray[i].name.split(".")[fileArray[i].name.split(".").length - 1]);
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
                //     html += '       <input type="button" value="뷰어" class="k-button k-rounded k-button-solid k-button-solid-base" onclick="regReListFilePop.fileViewer(' +  + ')">'
                // }
                html += '   </td>';
                if($("#type").val() != "exnp"){
                    html += '   <td>';
                    html += '       <input type="button" value="삭제" class="k-button k-rounded k-button-solid k-button-solid-error" onclick="regReListFilePop.fnUploadFile(' + i + ')">'
                    html += '   </td>';
                }
                html += '</tr>';
            }
            $("#fileGrid").append(html);
        }
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
            regReListFilePop.fn_bustripAddFile();
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
                //     html += '       <input type="button" value="뷰어" class="k-button k-rounded k-button-solid k-button-solid-base" onclick="regReListFilePop.fileViewer(' +  + ')">'
                // }
                html += '   </td>';
                if($("#type").val() != "exnp"){
                    html += '   <td>';
                    html += '       <input type="button" value="삭제" class="k-button k-rounded k-button-solid k-button-solid-error" onclick="regReListFilePop.fnUploadFile(' + i + ')">'
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
        console.log("regReListFilePop.fn_setFile");
        var fileArray = [];

        var data = {
            payAppSn : $("#payAppSn").val(),
            exnpSn : $("#exnpSn").val()
        }

        var fileResult = customKendo.fn_customAjax("/pay/payExnpFileList", data);
        regReListFilePop.global.fileArray = fileResult.listMap;

        // 지급/지출 양식 첨부 추가
        var result2 = customKendo.fn_customAjax("/payApp/pop/getExnpDocData", data);
        var fileList2 = result2.fileList;
        if(fileList2.length > 0 && fileList2 != null){
            for(let i=0; i<fileList2.length; i++){
                regReListFilePop.global.fileArray.push(fileList2[i]);
            }
        }

        fileArray = regReListFilePop.global.fileArray;
        let size = 0;
        if(fileArray.length > 0){
            $("#fileGrid").html("");

            var html = '';

            for (var i = 0; i < fileArray.length; i++) {
                size = fileArray[i].file_size > 0 ? fCommon.bytesToKB(fileArray[i].file_size) : 0;

                html += '<tr style="text-align: center;padding-top: 10px;">';
                html += '   <td style="text-align: left"><span style="cursor: pointer;" onclick="fileDown(\''+fileArray[i].file_path+fileArray[i].file_uuid+'\', \''+fileArray[i].file_org_name+'.'+fileArray[i].file_ext+'\')">'+fileArray[i].file_org_name +'.'+fileArray[i].file_ext+'</span></td>';
                html += '   <td>' + fileArray[i].file_ext + '</td>';
                html += '   <td>' + size + '</td>';
                html += '   <td>';
                /*if(fileArray[i].file_ext.toLowerCase() == "pdf" || fileArray[i].file_ext.toLowerCase() == "jpg" || fileArray[i].file_ext.toLowerCase() == "png" || fileArray[i].file_ext.toLowerCase() == "jpeg"){
                }*/
                html += '       <input type="button" value="뷰어" class="k-button k-rounded k-button-solid k-button-solid-base" onclick="fileViewer(\''+ fileArray[i].file_path +'\', \''+ fileArray[i].file_uuid +'\')">'
                html += '   </td>';
                if($("#type").val() != "exnp"){
                    html += '   <td>';
                    if(!fileArray[i].DOC_YN){
                        html += '       <input type="button" value="삭제" class="k-button k-rounded k-button-solid k-button-solid-error" onclick="regReListFilePop.fn_delFile(' + fileArray[i].file_no + ')">'
                    }
                    html += '   </td>';
                }
                html += '</tr>';
            }
            $("#fileGrid").append(html);
        }
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
                            html += '       <button type="button" class="k-button k-rounded k-button-solid k-button-solid-base" onclick="fileViewer(\''+ fileArray[i].file_path +'\', \''+ fileArray[i].file_uuid +'\')">' +
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
        let fileArray2 = Array.from(regReListFilePop.global.attFiles);
        fileArray2.splice(e, 1);
        fileArray2.forEach(file => {
            dataTransfer.items.add(file);
        });

        regReListFilePop.global.attFiles = dataTransfer.files;

        var fileArray = [];
        fileArray = regReListFilePop.global.attFiles;
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

                size = fileArray[i].size > 0 ? fCommon.bytesToKB(fileArray[i].size) : 0;
                html += '<tr style="text-align: center;" class="addFile">';
                html += '   <td style="text-align: left">' + fileName + '</td>';
                html += '   <td>' + fileExt + '</td>';
                html += '   <td>' + size + '</td>';
                html += '   <td>';
                // if(fileExt.toLowerCase() == "pdf" || fileExt.toLowerCase() == "jpg" || fileExt.toLowerCase() == "png" || fileExt.toLowerCase() == "jpeg"){
                //     html += '       <input type="button" value="뷰어" class="k-button k-rounded k-button-solid k-button-solid-base" onclick="regReListFilePop.fileViewer(' +  + ')">'
                // }
                html += '   </td>';
                if($("#type").val() != "exnp"){
                    html += '   <td>';
                    html += '       <input type="button" value="삭제" class="k-button k-rounded k-button-solid k-button-solid-error" onclick="regReListFilePop.fnUploadFile(' + i + ')">';
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

        if(regReListFilePop.global.attFiles.length == 0){
            regReListFilePop.global.attFiles = new Array();
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

    fn_regist: function(){
        if(!confirm("등록하시겠습니까?")){
            return;
        }

        var formData = new FormData();

        formData.append("payAppSn", $("#payAppSn").val());
        formData.append("exnpSn", $("#exnpSn").val());
        formData.append("empSeq", $("#regEmpSeq").val());

        if(regReListFilePop.global.attFiles != null){
            for(var i = 0 ; i < regReListFilePop.global.attFiles.length ; i++){
                formData.append("fileList", regReListFilePop.global.attFiles[i]);
            }
        }

        $.ajax({
            url : "/payApp/regReListFile.do",
            data : formData,
            type : "post",
            dataType : "json",
            contentType: false,
            processData: false,
            enctype : 'multipart/form-data',
            async: false,
            success : function(rs){
                if(rs.code == 200){
                    alert("저장되었습니다.");
                    opener.parent.exnpReList.gridReload();
                    window.close();
                }
            }
        });
    },

    fn_deadLine : function(){
        if(!confirm("마감하시겠습니까?")){
            return;
        }

        $.ajax({
            url : "/payApp/updExnpReFileDeadLine.do",
            data : {
                exnpSn : $("#exnpSn").val()
            },
            type : "post",
            dataType : "json",
            success : function(rs){
                if(rs.code == 200){
                    alert("마감되었습니다.");
                    opener.parent.exnpReList.gridReload();
                }
            }
        });
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
                    location.reload();
                }
            }
        })
    },

    fn_multiDownload : function (){
        var fileArray = regReListFilePop.global.fileArray;

        if(fileArray.length > 0){
            // for(let i=0; i<fileArray.length; i++){
            //     setTimeout(function(){fileDown(fileArray[i].file_path+fileArray[i].file_uuid, fileArray[i].file_org_name+'.'+fileArray[i].file_ext);}, 1500);
                // fileDown(fileArray[i].file_path+fileArray[i].file_uuid, fileArray[i].file_org_name+'.'+fileArray[i].file_ext);
            // }

            let i = 0;
            function download() {
                if (i < fileArray.length) {
                    fileDown(fileArray[i].file_path+fileArray[i].file_uuid, fileArray[i].file_org_name+'.'+fileArray[i].file_ext);
                    i++;
                    setTimeout(download, 1000);
                }
            }
            download();
        }
    }

}