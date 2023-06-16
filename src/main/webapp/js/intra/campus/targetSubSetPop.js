var now = new Date();

var targetSubSetPop = {
    global: {
        targetCategoryList: [],
        targetCategoryDetailList: []
    },

    init: function () {
        targetSubSetPop.dataSet();
        targetSubSetPop.tableSet();
    },

    dataSet: function () {
    },

    tableDetailSet: function () {
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
                targetSubSetPop.global.targetCategoryList = Result.list;
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
                targetSubSetPop.global.targetCategoryDetailList = Result.list;
            }
        });
    },

    tableSet: function () {
        targetSubSetPop.tableDetailSet();
        console.log(targetSubSetPop.global.targetCategoryList);
        console.log(targetSubSetPop.global.targetCategoryDetailList);
        const list = targetSubSetPop.global.targetCategoryList;
        const detailList = targetSubSetPop.global.targetCategoryDetailList;
        let color = "#ffffff";
        let eduCategoryIdList = [];

        var html = "";
        if(list.length > 0) {
            html += "<tr style='background-color: #fee3ef'>";
            html += "   <td rowspan='2' style='text-align: center'>구분</td>";
            html += "   <td colspan='"+list.length+"' style='text-align: center'>연계업무</td>";
            html += "</tr>";

            html += "<tr style='background-color: #fee3ef'>";
            for(var i = 0; i < list.length; i++) {
                html += "   <td>"+list[i].EDU_CATEGORY_NAME+"</td>";
                eduCategoryIdList[i] = list[i].EDU_CATEGORY_ID;
            }
            html += "</tr>";

            for(var j = 3; j >= 0; j--) {
                html += "<tr>";
                html += "   <td style='background-color: #fee3ef'>Level "+j+"</td>";
                    for(var k = 0; k < list.length; k++) {
                        if(detailList.length > 0) {
                            html += "   <td>";
                            for(var l = 0; l < detailList.length; l++) {
                                if(detailList[l].TARGET_CLASS == "1") {
                                    color = "#c72d6f"
                                }else {
                                    color = "#418bd7"
                                }
                                if(detailList[l].LEVEL_ID == j && eduCategoryIdList[k] == detailList[l].EDU_CATEGORY_ID) {
                                    html += "   <div style='display: flex'>";
                                    html += "       <input type='checkbox' name='eduTargetDetailId' id='eduTargetDetailId"+detailList[l].EDU_TARGET_DETAIL_ID+"' value='"+detailList[l].EDU_TARGET_DETAIL_ID+"'>&nbsp;";
                                    html += "       <b style='color: "+color+"'>"+detailList[l].EDU_CATEGORY_DETAIL_NAME+"</b>";
                                    html += "   </div>";
                                }
                            }
                            html += "</td>";
                        }else {
                            html += "   <td>&nbsp;</td>";
                        }
                    }
                html += "</tr>";
            }
        }
        $("#tableData").html(html);
    },

    setEduTargetDetailUpdate: function(item, classNum) {
        const checkBox = 'input[name="eduTargetDetailId"]:checked';
        const selectedElements = document.querySelectorAll(checkBox);

        let eduTargetDetailIdArr = new Array();
        selectedElements.forEach((el) => {
            let eduTargetDetailId = {
                eduTargetDetailId : el.value,
            }
            eduTargetDetailIdArr.push(eduTargetDetailId);
        });

        if(eduTargetDetailIdArr.length == 0) {
            alert("직무분야가 선택되지 않았습니다.");
            return;
        }
        console.log(eduTargetDetailIdArr);

        $.ajax({
            url: "/campus/setEduTargetDetailUpdate",
            data: {
                item : item,
                classNum : classNum,
                eduTargetDetailIdList : JSON.stringify(eduTargetDetailIdArr),
                empSeq : $("#empSeq").val()
            },
            type: "post",
            dataType: "json",
            async: false,
            success: function (Result) {
                targetSubSetPop.tableSet();
                opener.targetInfo.tableSet();
            }
        });
    }
}
