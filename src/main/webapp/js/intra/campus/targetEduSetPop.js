var now = new Date();

var targetEduSetPop = {
    global: {
        targetCategoryMainList: [],
        targetCategorySubList: [],
        targetCategoryMainDetailList: [],
        targetCategorySubDetailList: []
    },

    init : function(){
        targetEduSetPop.dataSet();
        targetEduSetPop.tableSet();
    },

    dataSet() {
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
                targetEduSetPop.global.targetCategoryMainList = Result.list;
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
                targetEduSetPop.global.targetCategorySubList = Result.list;
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
                targetEduSetPop.global.targetCategoryMainDetailList = Result.list;
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
                targetEduSetPop.global.targetCategorySubDetailList = Result.list;
            }
        });
    },

    tableSet: function () {
        targetEduSetPop.tableDetailSet();
        const list = targetEduSetPop.global.targetCategoryMainList;
        const subList = targetEduSetPop.global.targetCategorySubList;
        const detailList = targetEduSetPop.global.targetCategoryMainDetailList;
        const subDetailList = targetEduSetPop.global.targetCategorySubDetailList;
        const planList = targetEduSetPop.global.eduPlanList;
        const subPlanList = targetEduSetPop.global.subEduPlanList;

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
                                    html += "       <b style='color: " + color + "; cursor: pointer' onclick='targetEduSetPop.setTarget(\""+detailList[l].EDU_CATEGORY_DETAIL_ID+"\", \""+detailList[l].EDU_CATEGORY_DETAIL_NAME+"\", \""+detailList[l].LEVEL_ID+"\", 1);'>" + detailList[l].EDU_CATEGORY_DETAIL_NAME + "</b>";
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
                                    html += "       <b style='color: " + color + "; cursor: pointer' onclick='targetEduSetPop.setTarget(\""+subDetailList[l].EDU_CATEGORY_DETAIL_ID+"\", \""+subDetailList[l].EDU_CATEGORY_DETAIL_NAME+"\", \""+subDetailList[l].LEVEL_ID+"\", 2);'>" + subDetailList[l].EDU_CATEGORY_DETAIL_NAME + "</b>";
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

            $(".non").hide();
        }else {
            $(".non").show();
        }
        $("#tableData").html(html);
    },

    setTarget: function(eduCategoryDetailId, eduCategoryDetailName, levelId, dutyClass) {
        opener.parent.$("#eduCategoryDetailId").val(eduCategoryDetailId);
        opener.parent.$("#eduCategoryDetailName").val(eduCategoryDetailName);
        opener.parent.$("#levelId").val(levelId);
        opener.parent.$("#dutyClass").val(dutyClass);
        window.close();
    }
}
