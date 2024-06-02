var messageReq = {


    global : {

    },

    fn_defaultScript : function(){
        console.log("--------------- messageReq Start --------------");
        messageReq.fn_pageSet();
        messageReq.fn_tabSet();
    },

    fn_pageSet : function(){
        customKendo.fn_textBox(["menuSearch", "groupId", "groupName", "phoneNameUser", "phoneUserNum", "phoneUserId", "userGroupId"]);
    },

    fn_tabSet : function(){
        $("#menuTabStrip").kendoTabStrip({
            animation:  {
                open: {
                    effects: "fadeIn"
                }
            }
        });

        $("#menuEditorTabStrip").kendoTabStrip({
            animation:  {
                open: {
                    effects: "fadeIn"
                }
            }
        });

        $("#menuEditorTabStripUser").kendoTabStrip({
            animation:  {
                open: {
                    effects: "fadeIn"
                }
            }
        });

        messageReq.fn_treeSet();
    },

    fn_treeSet : function(){
        var ds = customKendo.fn_customAjax("/message/makeTreeView", {});

        $("#userGroupId").kendoDropDownList({
            dataTextField: "GROUP_NAME",
            dataValueField: "GROUP_ID",
            dataSource: ds.rs,
            index: 0
        });

        $("#menuTreeView").kendoTreeView({
            dataSource: ds.rs,
            /*dataTextField: "GROUP_NAME","PHONE_USER_NAME",*/
            checkboxes: {
                checkChildren: true
            },
            template: "#= item.GROUP_NAME ##= item.PHONE_USER_NAME ? ' - ' + item.PHONE_USER_NAME : '' #",
            check: onCheck,
            select: treeClick
        });

        menuTreeSearch($("#menuSearch").val());
    },

    sendMessage : function(){
        var phoneNumLength = $("input[name='dest_phone']").length;
        console.log(phoneNumLength);
        var data = {
            messages: []
        };

        var now = new Date();
        var sdf = '';
        var sdf = now.getFullYear() +
            ("0" + (now.getMonth() + 1)).slice(-2) +
            ("0" + now.getDate()).slice(-2) +
            ("0" + now.getHours()).slice(-2) +
            ("0" + now.getMinutes()).slice(-2) +
            ("0" + now.getSeconds()).slice(-2);

        for (var i = 0; i < phoneNumLength; i++) {
            var dest_phone = $("#dest_phone"+i).val();
            var name = $("#dest_phone"+i).attr('cname');
            var msg_content = $("#tBox_Msg").val();
            var pkDate = sdf;
            data.messages.push({
                dest_phone: name+"^"+dest_phone,
                msg_content: msg_content,
                pkDate: pkDate
            });
        }

        if($("input[name='dest_phone']").val() == ""){
            alert("전화번호를 입력해주세요.");
        }else if($("#tBox_Msg").val() == ""){
            alert("내용을 입력해주세요.");
        }else{
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
    },


    setGroup : function(){
        var flag = true;

        if(!$("#groupName").val()){
            alert("그룹이름을 입력해주세요.");
            flag = false;
            return;
        }

        if(confirm("저장하시겠습니까?")){
            if(flag){
                var data = {
                    "groupId" : $("#groupId").val(),
                    "groupName" : $("#groupName").val(),
                    "loginEmpSeq" : $("#loginEmpSeq").val()
                }

                const result = customKendo.fn_customAjax("/message/setGroup", data);

                if(result.flag){
                    alert("그룹이 등록 되었습니다.");
                    $("#menuTreeView").data("kendoTreeView").destroy();
                    messageReq.fn_treeSet();
                }else{
                    alert("그룹 등록 중 에러가 발생했습니다.");
                }
            }else{
                alert("입력값을 확인해주세요.");
            }
        }
    },

    setGroupMod : function(){
        var data = {
            "groupId": $("#groupId").val(),
            "groupName": $("#groupName").val(),
            "loginEmpSeq": $("#loginEmpSeq").val()
        }

        const result = customKendo.fn_customAjax("/message/setGroupMod", data);

        if(result.flag){
            alert("그룹이 수정 되었습니다.");
            $("#menuTreeView").data("kendoTreeView").destroy();
            messageReq.fn_treeSet();
        }else{
            alert("그룹 수정 중 에러가 발생했습니다.");
        }
    },

    setGroupDel : function(){
        if(!$("#groupId").val()){
            alert("삭제 할 그룹를 선택해주세요.");
            return;
        }

        if(confirm("삭제 시 해당 메뉴와 하위 메뉴 전체를 사용할 수 없습니다.\n선택한 메뉴를 삭제 하시겠습니까?")){
            var data = {
                "groupId" : $("#groupId").val()
            }

            const result = customKendo.fn_customAjax("/message/setGroupDel", data);

            if(result.flag){
                alert("그룹이 삭제 되었습니다.");
                $("#menuTreeView").data("kendoTreeView").destroy();
                messageReq.fn_treeSet();
            }else{
                alert("그룹 삭제 중 에러가 발생했습니다.");
            }
        }
    },


    setUser : function(){
        var flag = true;

        if(!$("#phoneNameUser").val()){
            alert("사용자이름을 입력해주세요.");
            flag = false;
            return;
        }else if(!$("#phoneUserNum").val()){
            alert("사용자의 핸드폰 번호를 입력해주세요.");
            flag = false;
            return;
        }

        if(confirm("저장하시겠습니까?")){
            if(flag){
                var data = {
                    "userGroupId" : $("#userGroupId").val(),
                    "groupName" : $("#groupName").val(),
                    "phoneUserId" : $("#phoneUserId").val(),
                    "phoneNameUser" : $("#phoneNameUser").val(),
                    "phoneUserNum" : $("#phoneUserNum").val(),
                    "loginEmpSeq" : $("#loginEmpSeq").val()
                }

                const result = customKendo.fn_customAjax("/message/setUser", data);

                if(result.flag){
                    alert("사용자가 등록 되었습니다.");
                    $("#menuTreeView").data("kendoTreeView").destroy();
                    messageReq.fn_treeSet();
                }else{
                    alert("사용자 등록 중 에러가 발생했습니다.");
                }
            }else{
                alert("입력값을 확인해주세요.");
            }
        }
    },

    setUserMod : function(){
        var data = {
            "userGroupId" : $("#userGroupId").val(),
            "groupName" : $("#groupName").val(),
            "phoneUserId" : $("#phoneUserId").val(),
            "phoneNameUser" : $("#phoneNameUser").val(),
            "phoneUserNum" : $("#phoneUserNum").val(),
            "loginEmpSeq" : $("#loginEmpSeq").val()
        }

        const result = customKendo.fn_customAjax("/message/setUserMod", data);

        if(result.flag){
            alert("사용자가 수정 되었습니다.");
            $("#menuTreeView").data("kendoTreeView").destroy();
            messageReq.fn_treeSet();
        }else{
            alert("사용자 수정 중 에러가 발생했습니다.");
        }
    },

    setUserDel : function(){
        if(!$("#phoneUserId").val()){
            alert("삭제 할 사용자를 선택해주세요.");
            return;
        }

        if(confirm("삭제 하시겠습니까?")){
            var data = {
                "phoneUserId" : $("#phoneUserId").val()
            }

            const result = customKendo.fn_customAjax("/message/setUserDel", data);

            if(result.flag){
                alert("사용자가 삭제 되었습니다.");
                $("#menuTreeView").data("kendoTreeView").destroy();
                messageReq.fn_treeSet();
            }else{
                alert("사용자 삭제 중 에러가 발생했습니다.");
            }
        }
    },

    fn_faxSendPopup : function(key, status, auth){
        var url = "/system/pop/faxSendPop.do";
        var name = "faxSendPop";
        var option = "width=400, height=400, scrollbars=no, top=200, left=600, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    },
}