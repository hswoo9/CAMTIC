var mouReg = {

    global : {
        attFiles : new Array()
    },

    fn_defaultScript : function (){
        customKendo.fn_textBox(["mouPurpose", "mouContent", "crmNo", "mouManager","mouDoc"]);

        customKendo.fn_datePicker("mouStdt", '', "yyyy-MM-dd", new Date());
        customKendo.fn_datePicker("mouEndt", '', "yyyy-MM-dd", new Date());
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

    fn_save : function (){
        if(!$("#mouPurpose").val()){
            alert("체결목적을 입력해주세요.");
            return false;
        }
        if(!$("#mouContent").val()){
            alert("협력내용을 입력해주세요.");
            return false;
        }
        if(!$("#mouManager").val()){
            alert("담당자를 입력해주세요.");
            return false;
        }

        var parameters = {
            mouStdt : $("#mouStdt").val(),
            mouEndt : $("#mouEndt").val(),
            mouPurpose : $("#mouPurpose").val(),
            mouContent : $("#mouContent").val(),
            mouManager : $("#mouManager").val(),
            regEmpSeq : $("#empSeq").val(),
            menuCd : $("#menuCd").val()
        }

        var formData = new FormData();
        formData.append("mouStdt", parameters.mouStdt);
        formData.append("mouEndt", parameters.mouEndt);
        formData.append("mouPurpose", parameters.mouPurpose);
        formData.append("mouContent", parameters.mouContent);
        formData.append("mouManager", parameters.mouManager);
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

    fileChange : function(e){

        for(var i = 0; i < $("input[name='fileList']")[0].files.length; i++){
            mouReg.global.attFiles.push($("input[name='fileList']")[0].files[i]);
        }

        $("#ulFileName").empty();
        if(mouReg.global.attFiles.length > 0){
            var html = '';
            for (var i = 0; i < mouReg.global.attFiles.length; i++) {
                html += '<li>'
                html += mouReg.global.attFiles[i].name.substring(0, mouReg.global.attFiles[i].name.lastIndexOf("."));
                html += mouReg.global.attFiles[i].name.substring(mouReg.global.attFiles[i].name.lastIndexOf("."));
                html += '<input type="button" value="삭제" class="k-button k-rounded k-button-solid k-button-solid-error" style="margin-left: 5px;" onclick="mouReg.fnUploadFile(' + i + ')">';
                html += '</li>';
            }

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
            for (var i = 0; i <mouReg.global.attFiles.length; i++) {
                html += '<li>'
                html += mouReg.global.attFiles[i].name.substring(0, mouReg.global.attFiles[i].name.lastIndexOf("."));
                html += mouReg.global.attFiles[i].name.substring(mouReg.global.attFiles[i].name.lastIndexOf("."));
                html += '<input type="button" value="삭제" class="k-button k-rounded k-button-solid k-button-solid-error" style="margin-left: 5px;" onclick="mouReg.fnUploadFile(' + i + ')">';
                html += '</li>';
            }

            $("#ulFileName").append(html);
        } else {
            $("#ulFileName").empty();
        }

        if(mouReg.global.attFiles.length == 0){
            mouReg.global.attFiles = new Array();
        }
    },
}