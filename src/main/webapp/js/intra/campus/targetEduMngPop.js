const targetEduMng = {
    global: {
        targetInfo: {},
        targetCategoryMainList: [],
        targetCategorySubList: [],
        targetCategoryMainDetailList: [],
        targetCategorySubDetailList: [],
        eduPlanList: [],
        subEduPlanList: []
    },

    init: function(){
        targetEduMng.dataSet();
        targetEduMng.buttonSet();
        targetEduMng.tableSet();
    },

    dataSet: function(){
        let mode = $("#mode").val();
        if(mode == "upd" || mode == "mng"){
            let targetInfo = customKendo.fn_customAjax("/campus/getTargetOne", {
                targetYear : $("#targetYear").val(),
                empSeq : $("#empSeq").val()
            }).list[0];
            targetEduMng.global.targetInfo = targetInfo;
        }

        let status = targetEduMng.global.targetInfo.STATUS;
    },

    buttonSet: function(){
        let mode = $("#mode").val();
        let status = targetEduMng.global.targetInfo.STATUS;
        if(mode == "upd"){
            if(status == 0 || status == 30) {
                $("#appBtn").show();
            }else if(status == 10){
                $("#canBtn").show();
            }else if(status == 100){
                $("#saveBtn").hide();
            }
        }
        if(mode == "mng"){
            $("#saveBtn").hide();
            if(status == 10 && targetEduMng.global.targetInfo.MNG_STAT == "Y"){
                if($("#ld").val() == ""){
                    $("#recBtn").show();
                    $("#comBtn").show();
                }
            }
        }
    },

    tableDetailSet: function () {
        $.ajax({
            url: "/campus/getTargetCategoryList",
            data: {
                targetYear : $("#targetYear").val(),
                empSeq : $("#empSeq").val(),
                dutyClass : 1
            },
            type: "post",
            dataType: "json",
            async: false,
            success: function (Result) {
                targetEduMng.global.targetCategoryMainList = Result.list;
            }
        });

        $.ajax({
            url: "/campus/getTargetCategoryList",
            data: {
                targetYear : $("#targetYear").val(),
                empSeq : $("#empSeq").val(),
                dutyClass : 2
            },
            type: "post",
            dataType: "json",
            async: false,
            success: function (Result) {
                targetEduMng.global.targetCategorySubList = Result.list;
            }
        });

        $.ajax({
            url: "/campus/getTargetCategoryDetailList",
            data: {
                targetYear : $("#targetYear").val(),
                empSeq : $("#empSeq").val(),
                dutyClass : 1
            },
            type: "post",
            dataType: "json",
            async: false,
            success: function (Result) {
                targetEduMng.global.targetCategoryMainDetailList = Result.list;
            }
        });

        $.ajax({
            url: "/campus/getTargetCategoryDetailList",
            data: {
                targetYear : $("#targetYear").val(),
                empSeq : $("#empSeq").val(),
                dutyClass : 2
            },
            type: "post",
            dataType: "json",
            async: false,
            success: function (Result) {
                targetEduMng.global.targetCategorySubDetailList = Result.list;
            }
        });

        $.ajax({
            url: "/campus/getEduPlanList",
            data: {
                targetYear : $("#targetYear").val(),
                empSeq : $("#empSeq").val(),
                dutyClass : 1
            },
            type: "post",
            dataType: "json",
            async: false,
            success: function (Result) {
                targetEduMng.global.eduPlanList = Result.list;
            }
        });

        $.ajax({
            url: "/campus/getEduPlanList",
            data: {
                targetYear : $("#targetYear").val(),
                empSeq : $("#empSeq").val(),
                dutyClass : 2
            },
            type: "post",
            dataType: "json",
            async: false,
            success: function (Result) {
                targetEduMng.global.subEduPlanList = Result.list;
            }
        });
    },

    tableSet: function () {
        targetEduMng.tableDetailSet();

        const list = targetEduMng.global.targetCategoryMainList;
        const subList = targetEduMng.global.targetCategorySubList;
        const detailList = targetEduMng.global.targetCategoryMainDetailList;
        const subDetailList = targetEduMng.global.targetCategorySubDetailList;
        const planList = targetEduMng.global.eduPlanList;
        const subPlanList = targetEduMng.global.subEduPlanList;

        let color = "#ffffff";
        let eduCategoryIdArr = [];
        let eduCategorySubIdArr = [];

        var html = "";
        if(list.length > 0 || subList.length > 0) {
            html += "<tr>";
            html += "   <td rowspan='2' style='background-color: rgb(255, 239, 221); text-align: center'>구분</td>";
            if(list.length > 0) {
                html += "   <td colspan='" + list.length + "' style='background-color: rgb(210, 116, 156); text-align: center'><b style='color: white'>주업무</b></td>";
            }
            if(subList.length > 0) {
                html += "   <td colspan='" + subList.length + "' style='background-color: rgb(87, 183, 219); text-align: center'><b style='color: white'>연계업무</b></td>";
            }
            html += "</tr>";

            html += "<tr>";
            if(list.length > 0) {
                for(let i = 0; i < list.length; i++) {
                    html += "   <td style='background-color: rgb(210, 116, 156); text-align: center'><b style='color: white;'>"+list[i].EDU_CATEGORY_NAME+"</b></td>";
                    eduCategoryIdArr[i] = list[i].EDU_CATEGORY_ID;
                }
            }
            if(subList.length > 0) {
                for(let i = 0; i < subList.length; i++) {
                    html += "   <td style='background-color: rgb(87, 183, 219); text-align: center'><b style='color: white;'>"+subList[i].EDU_CATEGORY_NAME+"</b></td>";
                    eduCategorySubIdArr[i] = subList[i].EDU_CATEGORY_ID;
                }
            }
            html += "</tr>";

            for(let j = 3; j >= 0; j--) {
                html += "<tr>";
                html += "   <td style='background-color: rgb(255, 239, 221)'>Level "+j+"</td>";
                if(list.length > 0) {
                    for (let k = 0; k < list.length; k++) {
                        if (detailList.length > 0) {
                            html += "   <td>";
                            for (let l = 0; l < detailList.length; l++) {
                                if (detailList[l].TARGET_CLASS == "1") {
                                    color = "#c72d6f"
                                } else {
                                    color = "#418bd7"
                                }
                                if (detailList[l].LEVEL_ID == j && eduCategoryIdArr[k] == detailList[l].EDU_CATEGORY_ID) {
                                    html += "   <div style='display: flex'>";
                                    html += "       ·&nbsp;";
                                    html += "       <b style='color: " + color + "'>" + detailList[l].EDU_CATEGORY_DETAIL_NAME + "</b>";
                                    html += "   </div>";
                                }
                            }
                            html += "</td>";
                        }else {
                            html += "   <td>&nbsp;</td>";
                        }
                    }
                }
                if(subList.length > 0) {
                    for (let k = 0; k < subList.length; k++) {
                        if (subDetailList.length > 0) {
                            html += "   <td>";
                            for (let l = 0; l < subDetailList.length; l++) {
                                if (subDetailList[l].TARGET_CLASS == "1") {
                                    color = "#c72d6f"
                                } else {
                                    color = "#418bd7"
                                }
                                if (subDetailList[l].LEVEL_ID == j && eduCategorySubIdArr[k] == subDetailList[l].EDU_CATEGORY_ID) {
                                    html += "   <div style='display: flex'>";
                                    html += "       ·&nbsp;";
                                    html += "       <b style='color: " + color + "'>" + subDetailList[l].EDU_CATEGORY_DETAIL_NAME + "</b>";
                                    html += "   </div>";
                                }
                            }
                            html += "</td>";
                        }else {
                            html += "   <td>&nbsp;</td>";
                        }
                    }
                }
                html += "</tr>";
            }

            if(list.length > 0 || subList.length > 0) {
                html += "<tr>";
                html += "   <td style='background-color: rgb(255, 239, 221)'>학습계획</td>";
                if(list.length > 0) {
                    for(let i = 0; i < list.length; i++) {
                        html += "   <td style='text-align: left'>";

                        for(let j = 0; j < planList.length; j++) {
                            if(planList[j].EDU_CATEGORY_ID == eduCategoryIdArr[i]) {
                                let text = planList[j].EDU_PLAN;
                                const brText = text.replace(/\n+/g, "<br>");
                                html += brText+"<br><br>";
                            }
                        }
                        html += "   </td>";
                    }
                }
                if(subList.length > 0) {
                    for (let i = 0; i < subList.length; i++) {
                        html += "   <td style='text-align: left'>";

                        for(let j = 0; j < subPlanList.length; j++) {
                            if(subPlanList[j].EDU_CATEGORY_ID == eduCategorySubIdArr[i]) {
                                let text = subPlanList[j].EDU_PLAN;
                                const brText = text.replace(/\n+/g, "<br>");
                                html += brText+"<br><br>";
                            }
                        }
                        html += "   </td>";
                    }
                }
                html += "</tr>";
            }

            $(".non").hide();
        }else {
            $(".non").show();
        }
        $("#tableData").html(html);
    },

    fn_targetCertReq: function(status){
        let data = {
            targetYear : $("#targetYear").val(),
            empSeq : $("#empSeq").val(),
            regEmpSeq : $("#regEmpSeq").val(),
            regEmpName : $("#regEmpName").val(),
            status : status
        }

        var result = customKendo.fn_customAjax("/campus/setTargetCertReq", data);

        if(result.flag){
            if(status == 10){
                alert("승인 요청이 완료되었습니다.");
            }else if(status == 100){
                alert("승인되었습니다.");
            }else if(status == 30){
                alert("반려되었습니다.");
            }else if(status == 0){
                alert("승인 요청이 취소되었습니다.");
            }
            opener.gridReload();
            window.close();
        }
    }
}
