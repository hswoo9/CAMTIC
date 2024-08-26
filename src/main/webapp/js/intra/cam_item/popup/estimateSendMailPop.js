const sendMail = {

    global : {
        attFiles : [],
    },

    fn_defaultScript : function(){
        sendMail.fn_pageSet();
        sendMail.fn_dataSet();
    },

    fn_pageSet : function(){
        customKendo.fn_textBox(["receiveEml" ,"sendEml", "subject", "contents", "fileList"]);
        $("#contents").kendoTextArea({
            rows : 10,
            value : "견적서 확인 부탁드립니다."
        });
    },

    fn_dataSet : function(){
        const result = customKendo.fn_customAjax("/item/getEmpCrmData", {
            crmSn : $("#crmSn").val(),
            empSeq : $("#regEmpSeq").val()
        });
        const rs = result.data;
        const rs2 = result.data2;

        $("#crmNm").text(rs.CRM_NM);
        $("#receiveEml").val(rs.EMAIL);

        $("#subject").val("CAMTIC 견적서 - " + rs.CRM_NM);
        $("#sendEml").val(rs2.EMAIL_ADDR);
    },

    fn_sendMail : function(){
        if(!confirm("메일을 전송하시겠습니까?")){
            return;
        }

        var formData = new FormData();

        formData.append("crmSn", $("#crmSn").val());
        formData.append("crmNm", $("#crmNm").text());
        formData.append("receiveEml", $("#receiveEml").val());
        formData.append("sendEml", $("#sendEml").val());
        formData.append("subject", $("#subject").val());
        formData.append("contents", $("#contents").val());
        formData.append("regEmpSeq", $("#regEmpSeq").val());

        if(sendMail.global.attFiles != null){
            for(var i = 0; i < sendMail.global.attFiles.length; i++){
                formData.append("fileList", sendMail.global.attFiles[i]);
            }
        }

        const result = customKendo.fn_customFormDataAjax("/item/estimateSendMail.do", formData);
        if(result.flag){
            var rs = result.rs;
            if(rs == "SUCCESS"){
                if($("#ooSnArr").val() != ""){
                    const result = customKendo.fn_customAjax("/item/setEstimateMailCk", {
                        ooSnArr : $("#ooSnArr").val()
                    });
                }
                alert("전송되었습니다.");
                window.close();
            }
        }
    },

    fileChange : function(){

        for(var i = 0; i < $("input[name='fileList']")[0].files.length; i++){
            sendMail.global.attFiles.push($("input[name='fileList']")[0].files[i]);
        }

        $("#fileName").empty();
        if(sendMail.global.attFiles.length > 0){
            var html = '';
            for (var i = 0; i < sendMail.global.attFiles.length; i++) {
                if(i>0){
                    html += ' | ';
                }
                html += sendMail.global.attFiles[i].name.substring(0, sendMail.global.attFiles[i].name.lastIndexOf(".")) + '.';
                html += sendMail.global.attFiles[i].name.substring(sendMail.global.attFiles[i].name.lastIndexOf(".")+1);
                html += '<input type="button" value="X" class="" style="border: none; background-color: transparent; color: red; font-weight: bold;" onclick="sendMail.fnUploadFile(' + i + ')">';
                html += '';
            }

            $("#fileName").append(html);
        }
    },

    fnUploadFile : function(e) {
        const dataTransfer = new DataTransfer();
        let fileArray = Array.from(sendMail.global.attFiles);
        fileArray.splice(e, 1);
        fileArray.forEach(file => {
            dataTransfer.items.add(file);
        });

        sendMail.global.attFiles = dataTransfer.files;

        if(sendMail.global.attFiles.length > 0){
            $("#fileName").empty();

            var html = '';
            for (var i = 0; i < sendMail.global.attFiles.length; i++) {
                if(i>0){
                    html += ' | ';
                }
                html += sendMail.global.attFiles[i].name.substring(0, sendMail.global.attFiles[i].name.lastIndexOf(".")) + '.';
                html += sendMail.global.attFiles[i].name.substring(sendMail.global.attFiles[i].name.lastIndexOf(".")+1);
                html += '<input type="button" value="X" class="" style="border: none; background-color: transparent; color: red; font-weight: bold;" onclick="sendMail.fnUploadFile(' + i + ')">';
                html += '';
            }

            $("#fileName").append(html);
        } else {
            $("#fileName").empty();
        }

        if(sendMail.global.attFiles.length == 0){
            sendMail.global.attFiles = new Array();
        }

        sendMail.global.attFiles = Array.from(sendMail.global.attFiles);
    },
}