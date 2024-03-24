var now = new Date();

var targetMainSetPop = {
    global: {
        targetCategoryList: [],
        targetCategoryDetailList: []
    },

    init: function () {
        targetMainSetPop.dataSet();
        targetMainSetPop.tableSet();
    },

    dataSet: function () {
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
                targetMainSetPop.global.targetCategoryList = Result.list;
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
                targetMainSetPop.global.targetCategoryDetailList = Result.list;
            }
        });
    },

    tableSet: function () {
        targetMainSetPop.tableDetailSet();
        const list = targetMainSetPop.global.targetCategoryList;
        const detailList = targetMainSetPop.global.targetCategoryDetailList;
        let color = "#ffffff";
        let eduCategoryIdList = [];

        var html = "";
        if(list.length > 0) {
            html += "<tr style='background-color: #d2749c; color: white; font-weight: bold;'>";
            html += "   <td rowspan='2' style='text-align: center'>구분</td>";
            html += "   <td colspan='"+list.length+"' style='text-align: center'>주업무</td>";
            html += "</tr>";

            html += "<tr style='background-color: #d2749c; color: white; font-weight: bold;'>";
            for(var i = 0; i < list.length; i++) {
                html += "   <td>"+list[i].EDU_CATEGORY_NAME+"</td>";
                eduCategoryIdList[i] = list[i].EDU_CATEGORY_ID;
            }
            html += "</tr>";

            for(var j = 3; j >= 0; j--) {
                html += "<tr>";
                html += "   <td style='background-color: #d2749c; color: white; font-weight: bold;'>Level "+j+"</td>";
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
            alert("업무 구분이 선택되지 않았습니다.");
            return;
        }

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
                targetMainSetPop.tableSet();
                opener.targetInfo.tableSet();
            }
        });
    },

    prevStep: function(){
        window.location.href = "targetInfoPop.do?targetYear="+ $("#targetYear").val();
    },

    nextStep: function(){

        var flag = false;
        for(var i = 0 ; i < targetMainSetPop.global.targetCategoryDetailList.length ; i++){
            if(targetMainSetPop.global.targetCategoryDetailList[i].TARGET_CLASS == "2"){
                flag = true;
            }
        }
        if(flag){
            window.location.href = "targetSubInfoPop.do?targetYear="+ $("#targetYear").val();
        } else {
            alert("목표가 설정되지 않았습니다.");
            return;
        }
    }
}
