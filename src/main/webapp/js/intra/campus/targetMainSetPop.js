var now = new Date();

var targetMainSetPop = {
    global: {
        targetCategoryList: [],
        targetCategoryDetailList: []
    },

    init: function () {
        targetMainSetPop.dataSet();
        targetMainSetPop.tableDetailSet();
        targetMainSetPop.tableSet();
    },

    dataSet: function () {
        $("#targetYear").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: new Date().getFullYear() + "년", value: new Date().getFullYear()},
                {text: new Date().getFullYear() + 1 + "년", value: new Date().getFullYear() + 1},
            ],
            index: 0
        });
    },

    tableDetailSet: function () {
        $.ajax({
            url: "/campus/getTargetCategoryList",
            data: {
                TARGET_YEAR : $("#targetYear").val(),
                REG_EMP_SEQ : $("#empSeq").val()
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
                TARGET_YEAR : $("#targetYear").val(),
                REG_EMP_SEQ : $("#empSeq").val()
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
        console.log(targetMainSetPop.global.targetCategoryList);
        console.log(targetMainSetPop.global.targetCategoryDetailList);
        const list = targetMainSetPop.global.targetCategoryList;
        const detailList = targetMainSetPop.global.targetCategoryList;

        var html = "";
        if(list.length > 0) {
            html += "<tr style='background-color: #fee3ef'>";
            html += "   <td rowspan='2' style='text-align: center'>구분</td>";
            html += "   <td colspan='"+list.length+"' style='text-align: center'>주업무</td>";
            html += "</tr>";

            html += "<tr style='background-color: #fee3ef'>";
            for (var i = 0; i < list.length; i++) {
                html += "   <td>"+list[i].EDU_CATEGORY_NAME+"</td>";
            }
            html += "</tr>";

            for (var j = 3; j >= 0; j--) {
                html += "<tr>";
                html += "   <td rowspan='2' style='background-color: #fee3ef'>Level "+j+"</td>";
                    for (var k = 0; k < detailList.length; k++) {

                    }
                html += "</tr>";
            }
        }
        $("#tableData").html(html);
    }
}
