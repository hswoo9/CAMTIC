var faxSendPop = {

    sendFax : function(){
        const faxNum1 = $("#faxNum1").val();
        const faxNum2 = $("#faxNum2").val();
        const mngNm = $("#mngNm").val();
        const requestNum = $("#requestNum").val();
        const now = new Date();
        const sdf = now.getFullYear() +
            ("0" + (now.getMonth() + 1)).slice(-2) +
            ("0" + now.getDate()).slice(-2) +
            ("0" + now.getHours()).slice(-2) +
            ("0" + now.getMinutes()).slice(-2) +
            ("0" + now.getSeconds()).slice(-2);

        if(faxNum1 == ""){ alert("팩스번호1을 작성해주세요."); return;}
        if(mngNm == ""){ alert("담당자를 작성해주세요."); return;}
        if(requestNum == ""){ alert("회신번호를 작성해주세요."); return;}
        if(fCommon.global.attFiles.length != 1){ alert("첨부파일이 없습니다"); return;}

        if(!confirm("전송하시겠습니까?")){
            return;
        }

        const formData = new FormData();
        formData.append("menuCd", "mailHist");

        formData.append("faxNum1", faxNum1);
        if(faxNum2 != ""){
            formData.append("faxNum2", faxNum2)
            formData.append("dest_phone2", mngNm+"^"+faxNum2);
        };
        formData.append("mngNm", mngNm);
        formData.append("requestNum", requestNum);
        formData.append("regEmpSeq", $("#regEmpSeq").val());
        formData.append("dest_phone", mngNm+"^"+faxNum1);
        formData.append("pkDate", sdf);

        /** 증빙파일 첨부파일 */
        if(fCommon.global.attFiles != null){
            for(var i = 0; i < fCommon.global.attFiles.length; i++){
                formData.append("file", fCommon.global.attFiles[i]);
            }
        }

        $.ajax({
            url : "/message/sendFms",
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
                    alert("전송되었습니다.");
                    location.href = "/system/pop/mailReqPop.do?mailHistSn=" + result.mailHistSn;
                    window.close();
                }else{
                    alert("전송중 오류가 발생하였습니다.");
                }
            }
        });
    },

    fileChange: function(e){
        fCommon.global.attFiles.push($("input[name='file']")[0].files[0]);
        $(e).next().text($(e)[0].files[0].name);
    }
}