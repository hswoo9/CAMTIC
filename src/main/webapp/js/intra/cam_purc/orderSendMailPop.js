const orderSendMail = {

    global : {
        attFiles : [],
    },

    fn_defaultScript : function(){
        orderSendMail.fn_pageSet();
        orderSendMail.fn_dataSet();
    },

    fn_pageSet : function(){
        customKendo.fn_textBox(["receiveEml" ,"sendEml", "subject", "contents", "fileList"]);
        $("#contents").kendoTextArea({
            rows : 10,
            value : "당 법인 발주서를 첨부합니다.\n확인 후 납품 진행 부탁드립니다.\n납품완료 후 세금계산서, 거래명세서 발행해주세요."
        });
    },

    fn_dataSet : function(){
        const result = customKendo.fn_customAjax("/purc/getPurcClaimData", {
            claimSn : $("#claimSn").val()
        });
        const rs = result.data;

        $("#crmSn").val(rs.CRM_SN);
        $("#crmNm").text(rs.CRM_NM);
        $("#receiveEml").val(rs.CRM_EMAIL);

        $("#subject").val("CAMTIC 발주서 - " + rs.CRM_NM);
        $("#sendEml").val(rs.CLAIM_EMAIL_ADDR);
    },

    fn_sendMail : function(){
        if(!confirm("메일을 전송하시겠습니까?")){
            return;
        }

        var formData = new FormData();

        if($("#purcSn").val()){
            formData.append("purcSn", $("#purcSn").val());
        }
        formData.append("claimSn", $("#claimSn").val());
        formData.append("crmSn", $("#crmSn").val());
        formData.append("crmNm", $("#crmNm").text());
        formData.append("receiveEml", $("#receiveEml").val());
        formData.append("sendEml", $("#sendEml").val());
        formData.append("subject", $("#subject").val());
        formData.append("contents", $("#contents").val());
        formData.append("regEmpSeq", $("#regEmpSeq").val());

        if(orderSendMail.global.attFiles != null){
            for(var i = 0; i < orderSendMail.global.attFiles.length; i++){
                formData.append("fileList", orderSendMail.global.attFiles[i]);
            }
        }

        const result = customKendo.fn_customFormDataAjax("/purc/orderSendMail.do", formData);
        if(result.flag){
            var rs = result.rs;
            if(rs == "SUCCESS"){
                alert("전송되었습니다.");
                window.close();
            }
        }
    },

    fileChange : function(){

        for(var i = 0; i < $("input[name='fileList']")[0].files.length; i++){
            orderSendMail.global.attFiles.push($("input[name='fileList']")[0].files[i]);
        }

        $("#fileName").empty();
        if(orderSendMail.global.attFiles.length > 0){
            var html = '';
            for (var i = 0; i < orderSendMail.global.attFiles.length; i++) {
                if(i>0){
                    html += ' | ';
                }
                html += orderSendMail.global.attFiles[i].name.substring(0, orderSendMail.global.attFiles[i].name.lastIndexOf(".")) + '.';
                html += orderSendMail.global.attFiles[i].name.substring(orderSendMail.global.attFiles[i].name.lastIndexOf(".")+1);
                html += '<input type="button" value="X" class="" style="border: none; background-color: transparent; color: red; font-weight: bold;" onclick="orderSendMail.fnUploadFile(' + i + ')">';
                html += '';
            }

            $("#fileName").append(html);
        }
    },

    fnUploadFile : function(e) {
        const dataTransfer = new DataTransfer();
        let fileArray = Array.from(orderSendMail.global.attFiles);
        fileArray.splice(e, 1);
        fileArray.forEach(file => {
            dataTransfer.items.add(file);
        });

        orderSendMail.global.attFiles = dataTransfer.files;

        if(orderSendMail.global.attFiles.length > 0){
            $("#fileName").empty();

            var html = '';
            for (var i = 0; i < orderSendMail.global.attFiles.length; i++) {
                if(i>0){
                    html += ' | ';
                }
                html += orderSendMail.global.attFiles[i].name.substring(0, orderSendMail.global.attFiles[i].name.lastIndexOf(".")) + '.';
                html += orderSendMail.global.attFiles[i].name.substring(orderSendMail.global.attFiles[i].name.lastIndexOf(".")+1);
                html += '<input type="button" value="X" class="" style="border: none; background-color: transparent; color: red; font-weight: bold;" onclick="orderSendMail.fnUploadFile(' + i + ')">';
                html += '';
            }

            $("#fileName").append(html);
        } else {
            $("#fileName").empty();
        }

        if(orderSendMail.global.attFiles.length == 0){
            orderSendMail.global.attFiles = new Array();
        }

        orderSendMail.global.attFiles = Array.from(orderSendMail.global.attFiles);
    },
}