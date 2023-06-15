var now = new Date();

var targetInfo = {
    global: {
        targetCategoryMainList: [],
        targetCategorySubList: [],
        targetCategoryMainDetailList: [],
        targetCategorySubDetailList: []
    },

    init : function(){
        targetInfo.dataSet();
        targetInfo.tableSet();
    },

    dataSet() {
        $("#targetYear").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: new Date().getFullYear() + "년", value: new Date().getFullYear()}
            ],
            index: 0
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
    },

    tableSet: function () {
        targetInfo.tableDetailSet();
        console.log(targetInfo.global.targetCategoryMainList);
        console.log(targetInfo.global.targetCategorySubList);
        console.log(targetInfo.global.targetCategoryMainDetailList);
        console.log(targetInfo.global.targetCategorySubDetailList);
        const list = targetInfo.global.targetCategoryMainList;
        const subList = targetInfo.global.targetCategorySubList;
        const detailList = targetInfo.global.targetCategoryMainDetailList;
        const subDetailList = targetInfo.global.targetCategorySubDetailList;
        let color = "#ffffff";
        let eduCategoryIdList = [];
        let eduCategorySubIdList = [];

        var html = "";
        if(list.length > 0 || subList.length) {
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
                    eduCategoryIdList[i] = list[i].EDU_CATEGORY_ID;
                }
            }
            if(subList.length > 0) {
                for(let i = 0; i < subList.length; i++) {
                    html += "   <td style='background-color: rgb(87, 183, 219); text-align: center'><b style='color: white;'>"+subList[i].EDU_CATEGORY_NAME+"</b></td>";
                    eduCategorySubIdList[i] = subList[i].EDU_CATEGORY_ID;
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
                                if (detailList[l].LEVEL_ID == j && eduCategoryIdList[k] == detailList[l].EDU_CATEGORY_ID) {
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
                                if (subDetailList[l].LEVEL_ID == j && eduCategorySubIdList[k] == subDetailList[l].EDU_CATEGORY_ID) {
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
            $(".non").hide();
        }else {
            $(".non").show();
        }
        $("#tableData").html(html);
    },

    targetAddYearPop : function() {
        var url = "/Campus/pop/targetAddYearPop.do";
        var name = "targetAddYearPop";
        var option = "width = 520, height = 300, top = 100, left = 200, location = no"
        var popup = window.open(url, name, option);
    },

    targetInfoPop : function() {
        var url = "/Campus/pop/targetInfoPop.do";
        var name = "targetInfoPop";
        var option = "width = 1200, height = 800, top = 100, left = 200, location = no"
        var popup = window.open(url, name, option);
    },

    targetMainSetPop : function() {
        var url = "/Campus/pop/targetMainSetPop.do";
        var name = "targetMainSetPop";
        var option = "width = 1200, height = 800, top = 100, left = 200, location = no"
        var popup = window.open(url, name, option);
    },

    targetSubInfoPop : function() {
        var url = "/Campus/pop/targetSubInfoPop.do";
        var name = "targetSubInfoPop";
        var option = "width = 1200, height = 800, top = 100, left = 200, location = no"
        var popup = window.open(url, name, option);
    },

    targetSubSetPop : function() {
        var url = "/Campus/pop/targetSubSetPop.do";
        var name = "targetSubSetPop";
        var option = "width = 1200, height = 800, top = 100, left = 200, location = no"
        var popup = window.open(url, name, option);
    }
}
