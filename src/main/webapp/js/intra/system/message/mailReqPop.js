const mailReqReq = {

    global : {
        attFiles : [],
    },

    fn_defaultScript: function(){
        mailReqReq.fn_pageSet();
        mailReqReq.fn_dataSet();
    },

    fn_pageSet: function(){
        customKendo.fn_textBox(["subject", "fileList", "sendEml"]);
        customKendo.fn_textArea(["contents"]);
        customKendo.fn_datePicker("sendDate", 'month', "yyyy-MM-dd", new Date());
        $("#sendDate").attr("readonly", true);
    },

    fn_dataSet: function(){
        const mailHistSn = $("#mailHistSn").val();
        if(mailHistSn != ""){
            const result = customKendo.fn_customAjax("/message/getMailHistData", {
                mailHistSn : $("#mailHistSn").val()
            });
            const rs = result.data;
            $("#subject").val(rs.MAIL_TILE);
            $("#contents").val(rs.MAIL_CONTENT)
            $("#sendDate").val(rs.SEND_DATE);
            $("#sendEml").val(rs.SEND_EMAIL);
        }
    },

    fn_saveBtn: function(){
        const subject = $("#subject").val();
        const contents = $("#contents").val();
        const sendDate = $("#sendDate").val();
        const sendEml = $("#sendEml").val();
        const mailHistSn = $("#mailHistSn").val();

        if(subject == ""){ alert("메일제목을 작성해주세요."); return;}
        if(contents == ""){ alert("메일내용을 작성해주세요."); return;}
        if(sendDate == ""){ alert("발신일자를 입력해주세요."); return;}
        if(subject == ""){ alert("발송메일 주소를 작성해주세요."); return;}

        if(!confirm("저장하시겠습니까?")){
            return;
        }

        const formData = new FormData();
        formData.append("subject", subject);
        formData.append("contents", contents);
        formData.append("sendDate", sendDate);
        formData.append("sendEml", sendEml);
        formData.append("regEmpSeq", $("#regEmpSeq").val());

        /** 증빙파일 첨부파일 */
        if(mailReqReq.global.attFiles != null){
            for(var i = 0; i < mailReqReq.global.attFiles.length; i++){
                formData.append("fileList", mailReqReq.global.attFiles[i]);
            }
        }

        if(mailHistSn != ""){
            formData.append("mailHistSn", mailHistSn);
        }

        const saveResult = customKendo.fn_customFormDataAjax("/system/setMailHist", formData);
        const result = saveResult.result;
        if(result.code == "200"){
            alert("저장되었습니다.");
            location.href = "/system/pop/mailReqPop.do?mailHistSn=" + result.mailHistSn;
        }
    },

    fileChange : function(){

        for(var i = 0; i < $("input[name='fileList']")[0].files.length; i++){
            mailReqReq.global.attFiles.push($("input[name='fileList']")[0].files[i]);
        }

        $("#fileName").empty();
        if(mailReqReq.global.attFiles.length > 0){
            var html = '';
            for (var i = 0; i < mailReqReq.global.attFiles.length; i++) {
                if(i>0){
                    html += ' | ';
                }
                html += mailReqReq.global.attFiles[i].name.substring(0, mailReqReq.global.attFiles[i].name.lastIndexOf(".")) + '.';
                html += mailReqReq.global.attFiles[i].name.substring(mailReqReq.global.attFiles[i].name.lastIndexOf(".")+1);
                html += '<input type="button" value="X" class="" style="border: none; background-color: transparent; color: red; font-weight: bold;" onclick="mailReqReq.fnUploadFile(' + i + ')">';
                html += '';
            }

            $("#fileName").append(html);
        }
    }
}