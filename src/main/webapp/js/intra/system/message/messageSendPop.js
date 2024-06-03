var messageSendPop = {

    fn_defaultScript : function(){
        messageSendPop.fn_pageSet();
    },

    fn_pageSet : function(){
        if($("#userList").val() != ""){
            let html = '';
            const userList = $("#userList").val().split(",");
            for (let i=0; i<userList.length; i++) {
                if(i == 10){
                    break;
                }
                if(i != 0){
                    html += ", ";
                }

                const type = $("#type").val();
                if(type == "userList"){
                    const empSeq = userList[i];
                    const empInfo = customKendo.fn_customAjax("/user/getUserInfo", {empSeq: empSeq});

                    if(empInfo != null){
                        const name = empInfo.EMP_NAME_KR;
                        html += name;
                    }
                }else if(type == "lecture"){
                    const empSeq = userList[i];
                    const empInfo = customKendo.fn_customAjax("/projectUnRnd/getPersonData", {personSn: empSeq}).data;

                    if(empInfo != null){
                        const name = empInfo.NAME;
                        html += name;
                    }
                }else if(type == "recruit"){
                    const applicationId = userList[i];
                    const empInfo = customKendo.fn_customAjax("/application/getApplicationForm1.do", {applicationId: applicationId}).data;

                    if(empInfo != null){
                        const name = empInfo.USER_NAME;
                        html += name;
                    }
                }
            }

            if(userList.length > 10){
                html += "외 " + (userList.length - 10) + "명"
            }
            console.log("html", html);
            $("#userListText").text(html);
        }
    },

    sendMessage : function(){
        if($("#userList").val() == ""){
            alert("데이터 조회 중 오류가 발생하였습니다. 로그아웃 후 재시도 바랍니다."); return;
        }

        if($("#tBox_Msg").val() == ""){
            alert("내용을 입력해주세요."); return;
        }

        var userList = $("#userList").val().split(",");
        var data = {
            messages: []
        };

        var now = new Date();
        var sdf = now.getFullYear() +
            ("0" + (now.getMonth() + 1)).slice(-2) +
            ("0" + now.getDate()).slice(-2) +
            ("0" + now.getHours()).slice(-2) +
            ("0" + now.getMinutes()).slice(-2) +
            ("0" + now.getSeconds()).slice(-2);

        for (let i=0; i<userList.length; i++) {
            const type = $("#type").val();
            if(type == "userList"){
                const empSeq = userList[i];
                const empInfo = customKendo.fn_customAjax("/user/getUserInfo", {empSeq: empSeq});

                if(empInfo != null){
                    const dest_phone = empInfo.MOBILE_TEL_NUM;
                    const name = empInfo.EMP_NAME_KR;
                    const msg_content = $("#tBox_Msg").val();
                    const pkDate = sdf;
                    const callBack = $("#callBack").val();
                    data.messages.push({
                        dest_phone: name+"^"+dest_phone,
                        msg_content: msg_content,
                        pkDate: pkDate,
                        callBack: callBack
                    });
                }
            }else if(type == "lecture"){
                const empSeq = userList[i];
                const empInfo = customKendo.fn_customAjax("/projectUnRnd/getPersonData", {personSn: empSeq}).data;

                if(empInfo != null){
                    const dest_phone = empInfo.HP_NUM;
                    const name = empInfo.NAME;
                    const msg_content = $("#tBox_Msg").val();
                    const pkDate = sdf;
                    const callBack = $("#callBack").val();
                    data.messages.push({
                        dest_phone: name+"^"+dest_phone,
                        msg_content: msg_content,
                        pkDate: pkDate,
                        callBack: callBack
                    });
                }
            }else if(type == "recruit"){
                const applicationId = userList[i];
                const empInfo = customKendo.fn_customAjax("/application/getApplicationForm1.do", {applicationId: applicationId}).data;

                if(empInfo != null){
                    const dest_phone = empInfo.MOBILE_TEL_NUM;
                    const name = empInfo.USER_NAME;
                    const msg_content = $("#tBox_Msg").val();
                    const pkDate = sdf;
                    const callBack = $("#callBack").val();
                    data.messages.push({
                        dest_phone: name+"^"+dest_phone,
                        msg_content: msg_content,
                        pkDate: pkDate,
                        callBack: callBack
                    });
                }
            }
        }

        console.log("----------------- MSG SEND!!! -------------------");
        console.log(data);
        $.ajax({
            url:"/message/sendMsg",
            data:JSON.stringify(data),
            dataType : 'json',
            async : false,
            type : 'POST',
            contentType:'application/json',
            success:function(result){
                if(result.code == "200"){
                    alert(result.message);
                    window.close();
                }else{
                    alert(result.message);
                }
            }
        });
    }
}