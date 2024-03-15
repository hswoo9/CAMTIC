var mouReg = {

    global : {
        attFiles : new Array()
    },

    fn_defaultScript : function (){
        customKendo.fn_textBox(["mouPurpose", "mouContent", "crmNo", "mouManager","mouDoc"]);

        customKendo.fn_datePicker("mouStdt", '', "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("mouEndt", '', "yyyy-MM-dd", new Date());

        if($("#mouArgSn").val() != null && $("#mouArgSn").val() != ""){
            mouReg.fn_setData()
        }
    },

    dateValidationCheck : function(id, val){
        var sDt = new Date($("#mouStdt").val());
        var nDt = new Date($("#mouEndt").val());

        if(id == "mouStdt"){
            if(sDt > nDt){
                $("#mouEndt").val(val);
            }
        }else{
            if(sDt > nDt){
                $("#mouStdt").val(val);
            }
        }
    },

    fn_setData: function (){
        var data = {
            mouArgSn : $("#mouArgSn").val()
        }

        $.ajax({
            url : "/crm/getMouArgInfo",
            data : data,
            type : "post",
            dataType : "json",
            success : function (rs){
                var fileInfo = rs.fileInfo;
                var rs = rs.data;

                $("#mouStdt").val(rs.MOU_AGR_ST_DT);
                $("#mouEndt").val(rs.MOU_AGR_EN_DT);
                $("#mouPurpose").val(rs.MOU_AGR_PURPOSE);
                $("#mouContent").val(rs.MOU_AGR_CONTENT);
                $("#mouManager").val(rs.MOU_AGR_MANAGER);

                if(fileInfo.length > 0){
                    var html = '';

                    for(var i = 0; i < fileInfo.length; i++){
                        html += '<li>';
                        html += '   <span style="cursor: pointer" onclick="fileDown(\''+fileInfo[i].file_path+fileInfo[i].file_uuid+'\', \''+fileInfo[i].file_org_name+'.'+fileInfo[i].file_ext+'\')">'+fileInfo[i].file_org_name+'.'+fileInfo[i].file_ext+'</span>';
                        html += '   <input type="button" value="X" class="" style="margin-left: 5px; border: none; background-color: transparent; color: red; font-weight: bold;" onclick="mouReg.commonFileDel(' + fileInfo[i].file_no + ', this)">';
                        html += '</li>';
                    }
                    $("#ulSetFileName").append(html);
                } else {
                    $("#ulSetFileName").empty();
                }
            }
        });
    },

    fn_save : function (){
        if(!$("#mouPurpose").val()){
            alert("체결목적을 입력해주세요.");
            return false;
        }

        var parameters = {
            mouStdt : $("#mouStdt").val(),
            // mouEndt : $("#mouEndt").val(),
            mouPurpose : $("#mouPurpose").val(),
            // mouContent : $("#mouContent").val(),
            // mouManager : $("#mouManager").val(),
            regEmpSeq : $("#empSeq").val(),
            menuCd : $("#menuCd").val()
        }

        var formData = new FormData();
        if($("#mouArgSn").val() != null && $("#mouArgSn").val() != ""){
            formData.append("MOU_AGR_SN", $("#mouArgSn").val());
        }
        formData.append("mouStdt", parameters.mouStdt);
        // formData.append("mouEndt", parameters.mouEndt);
        formData.append("mouPurpose", parameters.mouPurpose);
        // formData.append("mouContent", parameters.mouContent);
        // formData.append("mouManager", parameters.mouManager);
        formData.append("regEmpSeq", parameters.regEmpSeq);
        formData.append("menuCd", parameters.menuCd);

        if(mouReg.global.attFiles != null){
            for(var i = 0; i < mouReg.global.attFiles.length; i++){
                formData.append("mouFiles", mouReg.global.attFiles[i]);
            }
        }

        $.ajax({
            url : "/crm/setMouAgrInfo",
            data : formData,
            type : "post",
            dataType : "json",
            contentType: false,
            processData: false,
            enctype : 'multipart/form-data',
            async : false,
            success : function(rs){
                var rs = rs.params;
                alert("저장되었습니다.");
                opener.gridReload();
                window.close();
            }
        });
    },

    fileChange : function(){

        for(var i = 0; i < $("input[name='fileList']")[0].files.length; i++){
            mouReg.global.attFiles.push($("input[name='fileList']")[0].files[i]);
        }

        $("#ulFileName").empty();
        if(mouReg.global.attFiles.length > 0){
            var html = '';
            for (var i = 0; i < mouReg.global.attFiles.length; i++) {
                html += '<li>'
                html += mouReg.global.attFiles[i].name.substring(0, mouReg.global.attFiles[i].name.lastIndexOf(".")) + '.';
                html += mouReg.global.attFiles[i].name.substring(mouReg.global.attFiles[i].name.lastIndexOf(".")+1);
                html += '<input type="button" value="X" class="" style="margin-left: 5px; border: none; background-color: transparent; color: red; font-weight: bold;" onclick="mouReg.fnUploadFile(' + i + ')">';
                html += '</li>';
            }

            $("#ulSetFileName").css('margin-bottom', 0);
            $("#ulFileName").append(html);
        }
    },

    fnUploadFile : function(e) {
        const dataTransfer = new DataTransfer();
        let fileArray = Array.from(mouReg.global.attFiles);
        fileArray.splice(e, 1);
        fileArray.forEach(file => {
            dataTransfer.items.add(file);
        });

        mouReg.global.attFiles = dataTransfer.files;

        if(mouReg.global.attFiles.length > 0){
            $("#ulFileName").empty();

            var html = '';
            for (var i = 0; i < mouReg.global.attFiles.length; i++) {
                html += '<li>'
                html += mouReg.global.attFiles[i].name.substring(0, mouReg.global.attFiles[i].name.lastIndexOf(".")) + '.';
                html += mouReg.global.attFiles[i].name.substring(mouReg.global.attFiles[i].name.lastIndexOf(".")+1);
                html += '<input type="button" value="X" class="" style="margin-left: 5px; border: none; background-color: transparent; color: red; font-weight: bold;" onclick="mouReg.fnUploadFile(' + i + ')">';
                html += '</li>';
            }

            $("#ulFileName").append(html);
        } else {
            $("#ulFileName").empty();
        }

        if(mouReg.global.attFiles.length == 0){
            mouReg.global.attFiles = new Array();
        }

        mouReg.global.attFiles = Array.from(mouReg.global.attFiles);
    },

    commonFileDel: function(e, v){
        if(confirm("삭제한 파일은 복구할 수 없습니다.\n그래도 삭제하시겠습니까?")){
            $.ajax({
                url: "/common/commonFileDel",
                data: {
                    fileNo: e
                },
                type: "post",
                datatype: "json",
                success: function (rs) {
                    var rs = rs.rs;
                    alert(rs.message);
                    if(rs.code == "200"){
                        $(v).closest("li").remove();
                    }
                }
            });
        }
    },
}