var now = new Date();

var systemManagement = {
    global : {
        codeDropDown : [],
        level0List : [],
        level1List : [],
        level2List : [],
        level3List : [],
        pageName : $("#pageName").val(),
    },

    init : function(){
        systemManagement.dataSet();
        systemManagement.tableDetailSet();
        systemManagement.tableSet();
    },

    dataSet() {
        $.ajax({
            url : "/campus/getCodeList",
            type : "post",
            dataType : "json",
            async: false,
            success : function(result){
                systemManagement.global.codeDropDown = result.list;
            }
        });

        $("#detailSearch").kendoDropDownTree({
            placeholder: "세부검색",
            checkboxes: true,
            checkAll: true,
            autoClose: false,
            dataTextField: "CAMPUS_DT_CODE_NM",
            dataValueField: "CAMPUS_DT_CODE",
            dataSource : systemManagement.campusDataSource("P01"),
            change: function(e) {
                systemManagement.tableSet();
            },
            value: ["0", "1", "2", "3"]
        });
    },

    campusDataSource : function(code) {
        var data = [];
        for(var i = 0 ; i < systemManagement.global.codeDropDown.length ; i++){
            if(systemManagement.global.codeDropDown[i].CAMPUS_MC_CODE + systemManagement.global.codeDropDown[i].CAMPUS_MD_CODE == code){
                data.push(systemManagement.global.codeDropDown[i]);
            }
        }
        return data;
    },

    tableDetailSet : function() {
        $.ajax({
            url : "/campus/getEduCategoryDetailList",
            data : {
                levelId : "0"
            },
            type : "post",
            dataType : "json",
            async: false,
            success : function(detailResult){
                systemManagement.global.level0List = detailResult.list;
            }
        });

        $.ajax({
            url : "/campus/getEduCategoryDetailList",
            data : {
                levelId : "1"
            },
            type : "post",
            dataType : "json",
            async: false,
            success : function(detailResult){
                systemManagement.global.level1List = detailResult.list;
            }
        });

        $.ajax({
            url : "/campus/getEduCategoryDetailList",
            data : {
                levelId : "2"
            },
            type : "post",
            dataType : "json",
            async: false,
            success : function(detailResult){
                systemManagement.global.level2List = detailResult.list;
            }
        });

        $.ajax({
            url : "/campus/getEduCategoryDetailList",
            data : {
                levelId : "3"
            },
            type : "post",
            dataType : "json",
            async: false,
            success : function(detailResult){
                systemManagement.global.level3List = detailResult.list;
            }
        });
    },

    tableSet : function() {
        $.ajax({
            url : "/campus/getEduCategoryList",
            data : {
                largeCategoryId : $("#detailSearch").data("kendoDropDownTree").value().toString(),
                manageYn : 'N'
            },
            type : "post",
            dataType : "json",
            async: false,
            success : function(result){
                var list = result.list;
                var mColor = "#ffffff";
                var html = "";

                for(var i = 0; i < list.length; i++) {
                    if(list[i].LARGE_CATEGORY_ID == 0) {
                        mColor = "#e1ecff";
                    }else if(list[i].LARGE_CATEGORY_ID == 1) {
                        mColor = "#ffddd8";
                    }else if(list[i].LARGE_CATEGORY_ID == 2) {
                        mColor = "#fff6d8";
                    }else if(list[i].LARGE_CATEGORY_ID == 3) {
                        mColor = "#ebfaeb";
                    }
                    html += "<tr>";
                    html += "   <td style='text-align: center; background-color: "+mColor+"'>"+list[i].EDU_CATEGORY_NAME+"</td>";
                    html += "   <td style='text-align: left; background-color: "+mColor+"'>";

                    var detailList0 = systemManagement.global.level0List;
                    for(var j = 0; j < detailList0.length; j++) {
                        if(detailList0[j].EDU_CATEGORY_ID == list[i].EDU_CATEGORY_ID) {
                            html += detailList0[j].EDU_CATEGORY_DETAIL_NAME+"<br>";
                        }
                    }

                    html += "   </td>";
                    html += "   <td style='text-align: left; background-color: "+mColor+"'>";

                    var detailList1 = systemManagement.global.level1List;
                    for(var j = 0; j < detailList1.length; j++) {
                        if(detailList1[j].EDU_CATEGORY_ID == list[i].EDU_CATEGORY_ID) {
                            html += detailList1[j].EDU_CATEGORY_DETAIL_NAME+"<br>";
                        }
                    }

                    html += "   </td>";
                    html += "   <td style='text-align: left; background-color: "+mColor+"'>";

                    var detailList2 = systemManagement.global.level2List;
                    for(var j = 0; j < detailList2.length; j++) {
                        if(detailList2[j].EDU_CATEGORY_ID == list[i].EDU_CATEGORY_ID) {
                            html += detailList2[j].EDU_CATEGORY_DETAIL_NAME+"<br>";
                        }
                    }

                    html += "   </td>";
                    html += "   <td style='text-align: left; background-color: "+mColor+"'>";

                    var detailList3 = systemManagement.global.level3List;
                    for(var j = 0; j < detailList3.length; j++) {
                        if(detailList3[j].EDU_CATEGORY_ID == list[i].EDU_CATEGORY_ID) {
                            html += detailList3[j].EDU_CATEGORY_DETAIL_NAME+"<br>";
                        }
                    }

                    html += "   </td>";
                    html += "</tr>";
                }
                $("#tableData").html(html);
            }
        });
    },

    systemAdminPop: function(){
        let url = "/Campus/pop/systemAdminPop.do";
        const name = "systemAdminPop";
        const option = "width = 1680, height = 675, top = 100, left = 200, location = no";
        window.open(url, name, option);
    }
}
