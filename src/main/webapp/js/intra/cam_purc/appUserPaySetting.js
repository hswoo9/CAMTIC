const appUserPaySetting = {

    global : {
        attFiles : [],
    },

    fn_DefaultScript: function() {
        var parameterArray = [];

        var array = opener.parent.purcMngAppList.global.clmList;

        customKendo.fn_textBox(["empName"]);
        appUserPaySetting.fn_setData(array);

    },

    fn_setData : function (array){
        console.log(array);
        var data = {}

        data.itemArray = "";
        array.forEach(function(item){
            data.itemArray += item + ",";
        });

        data.itemArray = data.itemArray.substring(0, data.itemArray.length - 1);

        $.ajax({
            url : "/purc/getClaimMngList",
            data: data,
            type : "post",
            dataType : "json",
            success : function(rs){
                console.log(rs.list);
                var html = "";
                $("#payTableBody").html(html);
                var ls = rs.list;

                for (var i = 0; i < ls.length; i++) {
                    html += '<tr id="tr'+ls[i].claimSn+'" value="'+i+'">';
                    html += '   <td style="text-align: center">';
                    html += '       <input type="hidden" id="claminSn'+i+'" name="clm" value="' + ls[i].CLAIM_SN + '">';
                    html += '       ' + (i + 1);
                    html += '   </td>';
                    html += '   <td>';
                    html += '       ' + ls[i].DOC_NO;
                    html += '   </td>';
                    html += '   <td>';
                    html += '       ' + ls[i].CRM_NM;
                    html += '   </td>';
                    html += '   <td>';
                    html += '       <div style="text-align: right;">' + comma(ls[i].TOT_AMT - ls[i].REQ_AMT) + '</div>';
                    html += '       <input type="hidden" id="totAmt'+i+'" name="totAmt" value="' + (Number(ls[i].TOT_AMT) - Number(ls[i].REQ_AMT)) + '">';
                    html += '   </td>';
                    html += '   <td>';
                    html += '       <input type="text" style="text-align: right" index="'+i+'" class="k-input k-textbox k-input-solid k-input-md k-rounded-md" id="reqAmt'+i+'" name="reqAmt" onkeyup="appUserPaySetting.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, \'\').replace(/(\\..*)\\./g, \'$1\');" value="0">';
                    html += '   </td>';
                    html += '   <td style="text-align: center">';
                    html += '       <button type="button" class="k-button k-button-solid-error" onclick="appUserPaySetting.fn_delRow('+ls[i].CLAIM_SN+')">삭제</button>';
                    html += '   </td>';
                    html += '</tr>';
                }

                $("#payTableBody").html(html);
            }
        })
    },

    fn_delRow : function(idx){
        $("#tr"+idx).remove();
    },

    inputNumberFormat : function (obj){
        obj.value = appUserPaySetting.comma(appUserPaySetting.uncomma(obj.value));
    },

    comma: function(str) {
        str = String(str);
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    },

    uncomma: function(str) {
        str = String(str);
        return str.replace(/[^\d]+/g, '');
    },

    fn_regist : function (){

        if($("#empSeq").val() == ""){
            alert("지급신청자를 선택해주세요.");
            return;
        }

        if(!confirm("지출요청 하시겠습니까?")){
            return;
        }

        var flag = true;
        var payFlag = true;
        var itemArr = new Array();
        $('input[name="reqAmt"]').each(function(){
            if(this.value == 0 || this.value == ""){
                flag = false;
            } else {
                var itemParameters = {
                    claimSn : $("#claminSn" + $(this).attr("index")).val(),
                    reqAmt : appUserPaySetting.uncomma(this.value),
                    empSeq : $("#empSeq").val()
                }

                if(Number(appUserPaySetting.uncomma(this.value)) > Number($("#totAmt" + $(this).attr("index")).val())){
                    payFlag = false;
                }

                itemArr.push(itemParameters);
            }
        });

        if(!flag) {
            alert("지출금액이 입력되지 않았습니다.");
            return;
        }

        if(!payFlag) {
            alert("요청금액이 대상금액보다 큽니다.");
            return;
        }

        // var data = {
        //     itemArray : JSON.stringify(itemArr)
        // }

        var formData = new FormData();
        formData.append("regEmpSeq", $("#regEmpSeq").val());
        formData.append("itemArray", JSON.stringify(itemArr));

        if(appUserPaySetting.global.attFiles != null){
            for(var i = 0; i < appUserPaySetting.global.attFiles.length; i++){
                formData.append("fileList", appUserPaySetting.global.attFiles[i]);
            }
        }

        $.ajax({
            url : "/purc/setPayAppPurcReq",
            data : formData,
            dataType : "json",
            type : "post",
            contentType: false,
            processData: false,
            enctype : 'multipart/form-data',
            async: false,
            success : function(rs){
                if(rs.code == 200){
                    alert("요청되었습니다.");

                    opener.parent.$("#mainGrid").data("kendoGrid").dataSource.read();
                    window.close();
                }
            }
        });
    },

    fileChange : function (){
        $("#emptyTr").remove();
        let size = 0;
        var fileArray = [];
        for(var i = 0; i < $("input[name='payFileList']")[0].files.length; i++){
            appUserPaySetting.global.attFiles.push($("input[name='payFileList']")[0].files[i]);
        }

        fileArray = appUserPaySetting.global.attFiles;
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
                //     html += '       <input type="button" value="뷰어" class="k-button k-rounded k-button-solid k-button-solid-base" onclick="appUserPaySetting.fileViewer(' +  + ')">'
                // }
                html += '   </td>';
                if($("#type").val() != "exnp"){
                    html += '   <td>';
                    html += '       <input type="button" value="삭제1" class="k-button k-rounded k-button-solid k-button-solid-error" onclick="appUserPaySetting.fnUploadFile(' + i + ')">'
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
        let fileArray2 = Array.from(appUserPaySetting.global.attFiles);
        fileArray2.splice(e, 1);
        fileArray2.forEach(file => {
            dataTransfer.items.add(file);
        });

        appUserPaySetting.global.attFiles = dataTransfer.files;

        var fileArray = [];
        fileArray = appUserPaySetting.global.attFiles;
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
                //     html += '       <input type="button" value="뷰어" class="k-button k-rounded k-button-solid k-button-solid-base" onclick="appUserPaySetting.fileViewer(' +  + ')">'
                // }
                html += '   </td>';
                if($("#type").val() != "exnp"){
                    html += '   <td>';
                    html += '       <input type="button" value="삭제2" class="k-button k-rounded k-button-solid k-button-solid-error" onclick="appUserPaySetting.fnUploadFile(' + i + ')">';
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

        if(appUserPaySetting.global.attFiles.length == 0){
            appUserPaySetting.global.attFiles = new Array();
        }

    },
}