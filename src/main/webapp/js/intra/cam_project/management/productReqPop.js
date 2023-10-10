const productReq = {
    fn_defaultScript: function(){
        productReq.fn_dataSet();
    },

    fn_dataSet: function(){
        customKendo.fn_textBox(["reqText"]);
    },

    fn_saveBtn: function(){
        let reqText = $("#reqText").val();
        let regEmpSeq = $("#regEmpSeq").val();
        let regEmpName = $("#regEmpName").val();
        let parentCodeId = $("#parentCodeId").val();
        let parentCodeName = $("#parentCodeName").val();

        if(reqText == ""){ alert("분류명이 작성되지 않았습니다."); return; }

        let data = {
            reqText: reqText,
            regEmpSeq: regEmpSeq,
            regEmpName: regEmpName
        }

        if($("#type").val() == "A"){
            data.groupCode = 1;
            data.midleCode = "01";
            data.midleCodeName = "자산연계-거래_대분류";
        }
        if($("#type").val() == "B"){
            data.groupCode = 2;
            data.midleCode = "02";
            data.midleCodeName = "자산연계-거래_중분류";
            data.parentCodeId = parentCodeId;
            data.parentCodeName = parentCodeName;
        }
        if($("#type").val() == "C"){
            data.groupCode = 3;
            data.midleCode = "03";
            data.midleCodeName = "자산연계-거래_소분류";
            data.parentCodeId = parentCodeId;
            data.parentCodeName = parentCodeName;
        }

        if(!confirm("자산연계-거래 코드를 저장하시겠습니까?")){
            return;
        }
        if($("#mode").val() == "req"){
            productReq.setProductInfo(data);
        }else if($("#mode").val() == "upd"){
            data.pk = $("#pk").val();
            productReq.setProductUpd(data);
        }
    },

    setProductInfo: function(data){
        $.ajax({
            url: "/projectMng/setProductInfo",
            data: data,
            type: "post",
            dataType: "json",
            async: false,
            success: function(result){
                console.log(result);
                alert("자산연계-거래 코드 저장이 완료되었습니다.");
                try {
                    opener.gridReload("categoryGrid"+$("#type").val());
                }catch{

                }
                window.close();

            },
            error: function() {
                alert("데이터 저장 중 에러가 발생했습니다.");
            }
        });
    },

    setProductUpd: function(data){
        $.ajax({
            url: "/projectMng/setProductUpd",
            data: data,
            type: "post",
            dataType: "json",
            async: false,
            success: function(result){
                console.log(result);
                alert("자산연계-거래 코드 저장이 완료되었습니다.");
                try {
                    opener.gridReload("categoryGrid"+$("#type").val());
                }catch{

                }
                window.close();

            },
            error: function() {
                alert("데이터 저장 중 에러가 발생했습니다.");
            }
        });
    }
}