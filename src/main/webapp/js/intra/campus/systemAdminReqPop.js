const systemAdminReq = {
    init: function(){
        systemAdminReq.dataSet();
        systemAdminReq.mainGrid();
    },

    dataSet: function(){
        customKendo.fn_textBox(["reqText"])
        let levelDataSource = [
            {text: "LEVEL 0", value: "0"},
            {text: "LEVEL 1", value: "1"},
            {text: "LEVEL 2", value: "2"},
            {text: "LEVEL 3", value: "3"}
        ]
        customKendo.fn_dropDownList("level", levelDataSource, "text", "value", 2);

        if($("#largeCategoryName").val() == "R"){
            $("#largeCategoryName").val("R&D/엔지니어링");
        }
    },

    saveBtn: function(){
        let level = $("#level").val();
        let levelName = "";
        let reqText = $("#reqText").val();
        let regEmpSeq = $("#regEmpSeq").val();
        let regEmpName = $("#regEmpName").val();

        if($("#type").val() == "C" && level == ""){ alert("레벨이 선택되지 않았습니다."); return; }
        if(reqText == ""){ alert("분류명이 작성되지 않았습니다."); return; }

        let data = {
            reqText: reqText,
            regEmpSeq: regEmpSeq,
            regEmpName: regEmpName
        }

        if($("#type").val() == "A"){
            data.groupCode = 1;
            data.midleCode = "01";
            data.midleCodeName = "학습체계도_대분류";
        }
        if($("#type").val() == "B"){
            data.largeCategoryId = $("#largeCategoryId").val();
            data.largeCategoryName = $("#largeCategoryName").val();
        }
        if($("#type").val() == "C"){
            levelName = $("#level").data("kendoDropDownList").text();
            data.eduCategoryId = $("#eduCategoryId").val();
            data.eduCategoryName = $("#eduCategoryName").val();
            data.level = level;
            data.levelName = levelName;
        }

        if(!confirm("학습체계도를 저장하시겠습니까?")){
            return;
        }
        if($("#mode").val() == "req"){
            if($("#type").val() == "A"){
                systemAdminReq.setEduCode(data);
            }else if($("#type").val() == "B"){
                systemAdminReq.setEduCategory(data);
            }else if($("#type").val() == "C"){
                systemAdminReq.setEduCategoryDetail(data);
            }
        }else if($("#mode").val() == "upd"){
            data.pk = $("#pk").val();
            if($("#type").val() == "A"){
                systemAdminReq.setEduCodeUpd(data);
            }else if($("#type").val() == "B"){
                systemAdminReq.setEduCategoryUpd(data);
            }else if($("#type").val() == "C"){
                systemAdminReq.setEduCategoryDetailUpd(data);
            }
        }
    },

    setEduCode: function(data){
        $.ajax({
            url: "/campus/setEduCode",
            data: data,
            type: "post",
            dataType: "json",
            async: false,
            success: function(result){
                console.log(result);
                alert("학습체계도 저장이 완료되었습니다.");
                opener.gridReload("categoryGridA");
                window.close();

            },
            error: function() {
                alert("데이터 저장 중 에러가 발생했습니다.");
            }
        });
    },

    setEduCodeUpd: function(data){
        $.ajax({
            url: "/campus/setEduCodeUpd",
            data: data,
            type: "post",
            dataType: "json",
            async: false,
            success: function(result){
                console.log(result);
                alert("학습체계도 저장이 완료되었습니다.");
                opener.gridReload("categoryGridA");
                window.close();

            },
            error: function() {
                alert("데이터 저장 중 에러가 발생했습니다.");
            }
        });
    },

    setEduCategory: function(data){
        $.ajax({
            url: "/campus/setEduCategory",
            data: data,
            type: "post",
            dataType: "json",
            async: false,
            success: function(result){
                console.log(result);
                alert("학습체계도 저장이 완료되었습니다.");
                opener.gridReload("categoryGridB");
                window.close();

            },
            error: function() {
                alert("데이터 저장 중 에러가 발생했습니다.");
            }
        });
    },

    setEduCategoryUpd: function(data){
        $.ajax({
            url: "/campus/setEduCategoryUpd",
            data: data,
            type: "post",
            dataType: "json",
            async: false,
            success: function(result){
                console.log(result);
                alert("학습체계도 저장이 완료되었습니다.");
                opener.gridReload("categoryGridB");
                window.close();

            },
            error: function() {
                alert("데이터 저장 중 에러가 발생했습니다.");
            }
        });
    },

    setEduCategoryDetail: function(data){
        $.ajax({
            url: "/campus/setEduCategoryDetail",
            data: data,
            type: "post",
            dataType: "json",
            async: false,
            success: function(result){
                console.log(result);
                alert("학습체계도 저장이 완료되었습니다.");
                opener.gridReload("categoryGridC");
                window.close();

            },
            error: function() {
                alert("데이터 저장 중 에러가 발생했습니다.");
            }
        });
    },

    setEduCategoryDetailUpd: function(data){
        $.ajax({
            url: "/campus/setEduCategoryDetailUpd",
            data: data,
            type: "post",
            dataType: "json",
            async: false,
            success: function(result){
                console.log(result);
                alert("학습체계도 저장이 완료되었습니다.");
                opener.gridReload("categoryGridC");
                window.close();

            },
            error: function() {
                alert("데이터 저장 중 에러가 발생했습니다.");
            }
        });
    }
}