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
            console.log("rs", rs);
            $("#subject").val(rs.MAIL_TILE);
            $("#contents").val(rs.MAIL_CONTENT)
            $("#sendDate").val(rs.SEND_DATE);
            $("#sendEml").val(rs.SEND_EMAIL);

            const fileList = rs.fileList;
            if (fileList != null) {
                var html = "";
                for (let i = 0; i < fileList.length; i++) {
                    const file = fileList[i];
                    const filePath = file.file_path;
                    const fileName = file.file_org_name + '.' + file.file_ext;

                    html += `<div style="margin-top:5px;">
                                <a href="javascript:" style="color:#343a40;" onclick="fileDown('${filePath}', '${encodeURIComponent(fileName)}')">${fileName}</a>
                                <span onclick="mailReqReq.deleteFile(`+file.file_no+`, this)" style="color:red;cursor:pointer; font-weight: bold;">&nbsp;X</span>
                            </div>`;
                }
                $("#fileName").html(html);
                $("#fileName").css("cursor", "pointer");
            }
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
        formData.append("menuCd", "mailHist");

        formData.append("subject", subject);
        formData.append("contents", contents);
        formData.append("sendDate", sendDate);
        formData.append("sendEml", sendEml);
        formData.append("regEmpSeq", $("#regEmpSeq").val());

        /** 증빙파일 첨부파일 */
        if(fCommon.global.attFiles != null){
            for(var i = 0; i < fCommon.global.attFiles.length; i++){
                formData.append("file", fCommon.global.attFiles[i]);
            }
        }

        if(mailHistSn != ""){
            formData.append("mailHistSn", mailHistSn);
        }

        $.ajax({
            url : "/system/setMailHist",
            type : 'POST',
            data : formData,
            dataType : "json",
            contentType: false,
            processData: false,
            enctype : 'multipart/form-data',
            async : false,
            success : function(rs){
                const result = rs.result;
                if(result.code == "200"){
                    alert("저장되었습니다.");
                    location.href = "/system/pop/mailReqPop.do?mailHistSn=" + result.mailHistSn;

                    let url = "/system/pop/mailDetPop.do?mailHistSn="+result.mailHistSn;
                    const name = "_self";
                    const option = "width = 1080, height = 588, top = 100, left = 300, location = no";
                    window.open(url, name, option);
                }else{
                    alert("저장중 오류가 발생하였습니다.");
                }
            }
        });
    },

    fileChange : function(){

        for(var i = 0; i < $("input[name='fileList']")[0].files.length; i++){
            fCommon.global.attFiles.push($("input[name='fileList']")[0].files[i]);
        }

        $("#fileName").empty();
        if(fCommon.global.attFiles.length > 0){
            var html = '';
            for (var i = 0; i < fCommon.global.attFiles.length; i++) {
                if(i>0){
                    html += ' | ';
                }
                html += fCommon.global.attFiles[i].name.substring(0, fCommon.global.attFiles[i].name.lastIndexOf(".")) + '.';
                html += fCommon.global.attFiles[i].name.substring(fCommon.global.attFiles[i].name.lastIndexOf(".")+1);
                html += '<input type="button" value="X" class="" style="border: none; background-color: transparent; color: red; font-weight: bold;" onclick="">';
                html += '';
            }

            $("#fileName").append(html);
        }
    },

    deleteFile : function(key, e) {
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
                    if(rs.code == "200"){
                        alert("파일이 삭제되었습니다.");
                        $(e).closest('div').remove();
                    }
                }
            });
        }
    }
}