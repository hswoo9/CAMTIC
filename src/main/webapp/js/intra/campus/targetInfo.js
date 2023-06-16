var now = new Date();

var targetInfo = {
    global: {
        targetCategoryMainList: [],
        targetCategorySubList: [],
        targetCategoryMainDetailList: [],
        targetCategorySubDetailList: [],
        eduPlanList: [],
        subEduPlanList: [],
        yearDropDown: []
    },

    init : function(){
        targetInfo.dataSet();
        targetInfo.tableSet();
        targetInfo.StatSet();
    },

    dataSet() {
        $.ajax({
            url : "/campus/getTargetYearList",
            data : {
                empSeq : $("#empSeq").val()
            },
            type : "post",
            dataType : "json",
            async: false,
            success : function(result){
                console.log(result.list);
                targetInfo.global.yearDropDown = result.list;
            }
        });

        $("#targetYear").kendoDropDownList({
            dataTextField: "TEXT",
            dataValueField: "VALUE",
            dataSource: targetInfo.global.yearDropDown,
            index: 0,
            change: function(e) {
                targetInfo.tableSet();
            }
        });
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
                targetInfo.global.targetCategoryMainList = Result.list;
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
                targetInfo.global.targetCategorySubList = Result.list;
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
                targetInfo.global.targetCategoryMainDetailList = Result.list;
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
                targetInfo.global.targetCategorySubDetailList = Result.list;
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
                targetInfo.global.eduPlanList = Result.list;
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
                targetInfo.global.subEduPlanList = Result.list;
            }
        });
    },

    tableSet: function () {
        targetInfo.tableDetailSet();
        console.log("데이터 확인");
        console.log(targetInfo.global.targetCategoryMainList);
        console.log(targetInfo.global.targetCategorySubList);
        console.log(targetInfo.global.targetCategoryMainDetailList);
        console.log(targetInfo.global.targetCategorySubDetailList);
        console.log(targetInfo.global.eduPlanList);
        console.log(targetInfo.global.subEduPlanList);
        console.log("끝");

        const list = targetInfo.global.targetCategoryMainList;
        const subList = targetInfo.global.targetCategorySubList;
        const detailList = targetInfo.global.targetCategoryMainDetailList;
        const subDetailList = targetInfo.global.targetCategorySubDetailList;
        const planList = targetInfo.global.eduPlanList;
        const subPlanList = targetInfo.global.subEduPlanList;

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

                        html += "       <input type='button' class='k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base' value='학습계획' onclick='targetInfo.eduPlanReqPop("+list[i].EDU_CATEGORY_ID+", 1);'/>";
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

                        html += "       <input type='button' class='k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base' value='학습계획' onclick='targetInfo.eduPlanReqPop("+subList[i].EDU_CATEGORY_ID+", 2);'/>";
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

    targetAddYearPop: function() {
        var url = "/Campus/pop/targetAddYearPop.do";
        var name = "targetAddYearPop";
        var option = "width = 520, height = 300, top = 100, left = 200, location = no"
        var popup = window.open(url, name, option);
    },

    targetInfoPop: function() {
        if($("#targetYear").val() == "") {
            alert("목표기술서를 등록해주세요.");
            return;
        }
        var url = "/Campus/pop/targetInfoPop.do?targetYear="+$("#targetYear").val();
        var name = "targetInfoPop";
        var option = "width = 1200, height = 800, top = 100, left = 200, location = no"
        var popup = window.open(url, name, option);
    },

    targetMainSetPop: function() {
        if($("#targetYear").val() == "") {
            alert("목표기술서를 등록해주세요.");
            return;
        }
        var url = "/Campus/pop/targetMainSetPop.do?targetYear="+$("#targetYear").val();
        var name = "targetMainSetPop";
        var option = "width = 1200, height = 800, top = 100, left = 200, location = no"
        var popup = window.open(url, name, option);
    },

    targetSubInfoPop: function() {
        if($("#targetYear").val() == "") {
            alert("목표기술서를 등록해주세요.");
            return;
        }
        var url = "/Campus/pop/targetSubInfoPop.do?targetYear="+$("#targetYear").val();
        var name = "targetSubInfoPop";
        var option = "width = 1200, height = 800, top = 100, left = 200, location = no"
        var popup = window.open(url, name, option);
    },

    targetSubSetPop: function() {
        if($("#targetYear").val() == "") {
            alert("목표기술서를 등록해주세요.");
            return;
        }
        var url = "/Campus/pop/targetSubSetPop.do?targetYear="+$("#targetYear").val();
        var name = "targetSubSetPop";
        var option = "width = 1200, height = 800, top = 100, left = 200, location = no"
        var popup = window.open(url, name, option);
    },

    eduPlanReqPop: function(eduCategoryId, dutyClass) {
        var url = "/Campus/pop/eduPlanReqPop.do?targetYear="+$("#targetYear").val()+"&eduCategoryId="+eduCategoryId+"&dutyClass="+dutyClass;
        var name = "eduPlanReqPop";
        var option = "width = 860, height = 500, top = 100, left = 200, location = no"
        var popup = window.open(url, name, option);
    },

    updateApprStat: function(status) {
        if($("#targetYear").val() == "") {
            alert("목표기술서를 등록해주세요.");
            return;
        }

        $.ajax({
            url: "/campus/updateApprStat",
            data: {
                status : status,
                targetYear : $("#targetYear").val(),
                empSeq : $("#empSeq").val()
            },
            type: "post",
            dataType: "json",
            async: false,
            success: function (Result) {
                if(status == "10") {
                    alert("승인요청이 완료되었습니다.");
                    $("#stat").text("승인요청 중");
                }else {
                    alert("승인이 완료되었습니다.");
                    $("#stat").text("승인완료");
                }
                targetInfo.global.targetCategoryMainList = Result.list;
            }
        });
    },

    StatSet: function() {
        const detailList = targetInfo.global.targetCategoryMainDetailList;
    }
}
