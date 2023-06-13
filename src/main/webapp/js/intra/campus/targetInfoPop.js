var now = new Date();

var targetInfoPop = {
    global : {
        codeDropDown : [],
        level0List : [],
        level1List : [],
        level2List : [],
        level3List : [],
        pageName : $("#pageName").val(),
    },

    init : function(){
        targetInfoPop.dataSet();
        targetInfoPop.tableDetailSet();
        targetInfoPop.tableSet();
        targetInfoPop.tableDataSet();
    },

    dataSet : function() {
        $.ajax({
            url : "/campus/getCodeList",
            type : "post",
            dataType : "json",
            async: false,
            success : function(result){
                console.log(result.list);
                targetInfoPop.global.codeDropDown = result.list;
            }
        });

        $("#detailSearch").kendoDropDownTree({
            placeholder: "세부검색",
            checkboxes: true,
            checkAll: true,
            autoClose: false,
            dataTextField: "CAMPUS_DT_CODE_NM",
            dataValueField: "CAMPUS_DT_CODE",
            dataSource : targetInfoPop.campusDataSource("P01"),
            change: function(e) {
                targetInfoPop.tableSet();
            },
            value: ["0", "1", "2", "3"]
        });

        $("#targetYear").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: new Date().getFullYear()+"년", value: new Date().getFullYear() },
                { text: new Date().getFullYear()+1+"년", value: new Date().getFullYear()+1 },
            ],
            index: 0
        });
    },

    campusDataSource : function(code) {
        var data = [];
        for(var i = 0 ; i < targetInfoPop.global.codeDropDown.length ; i++){
            if(targetInfoPop.global.codeDropDown[i].CAMPUS_MC_CODE + targetInfoPop.global.codeDropDown[i].CAMPUS_MD_CODE == code){
                data.push(targetInfoPop.global.codeDropDown[i]);
            }
        }
        return data;
    },

    tableDetailSet : function() {
        $.ajax({
            url : "/campus/getEduCategoryDetailList",
            data : {
                LEVEL_ID : "0"
            },
            type : "post",
            dataType : "json",
            async: false,
            success : function(detailResult){
                targetInfoPop.global.level0List = detailResult.list;
            }
        });

        $.ajax({
            url : "/campus/getEduCategoryDetailList",
            data : {
                LEVEL_ID : "1"
            },
            type : "post",
            dataType : "json",
            async: false,
            success : function(detailResult){
                targetInfoPop.global.level1List = detailResult.list;
            }
        });

        $.ajax({
            url : "/campus/getEduCategoryDetailList",
            data : {
                LEVEL_ID : "2"
            },
            type : "post",
            dataType : "json",
            async: false,
            success : function(detailResult){
                targetInfoPop.global.level2List = detailResult.list;
            }
        });

        $.ajax({
            url : "/campus/getEduCategoryDetailList",
            data : {
                LEVEL_ID : "3"
            },
            type : "post",
            dataType : "json",
            async: false,
            success : function(detailResult){
                targetInfoPop.global.level3List = detailResult.list;
            }
        });
    },

    tableSet : function() {
        $.ajax({
            url : "/campus/getEduCategoryList",
            data : {
                LARGE_CATEGORY_ID : $("#detailSearch").data("kendoDropDownTree").value().toString()
            },
            type : "post",
            dataType : "json",
            async: false,
            success : function(result){
                console.log(result.list);

                var list = result.list;
                var html = "";

                for (var i = 0; i < list.length; i++) {
                    html += "<tr>";
                    html += "   <td style='text-align: center;'>"+list[i].EDU_CATEGORY_NAME+"</td>";
                    html += "   <td style='text-align: left;'>";

                    var detailList0 = targetInfoPop.global.level0List;
                    for (var j = 0; j < detailList0.length; j++) {
                        if(detailList0[j].EDU_CATEGORY_ID === list[i].EDU_CATEGORY_ID) {
                            html += "   <div style='display: flex'>";
                            html += "       <input type='checkbox' name='MenuSeqNo' id='MenuSeqNo"+detailList0[j].EDU_CATEGORY_DETAIL_ID+"' value='"+detailList0[j].EDU_CATEGORY_DETAIL_ID+"'>&nbsp;";
                            html +=         detailList0[j].EDU_CATEGORY_DETAIL_NAME;
                            html += "   </div>";
                        }
                    }

                    html += "   </td>";
                    html += "   <td style='text-align: left;'>";

                    var detailList1 = targetInfoPop.global.level1List;
                    for (var j = 0; j < detailList1.length; j++) {
                        if(detailList1[j].EDU_CATEGORY_ID === list[i].EDU_CATEGORY_ID) {
                            html += "   <div style='display: flex'>";
                            html += "       <input type='checkbox' name='MenuSeqNo' id='MenuSeqNo"+detailList1[j].EDU_CATEGORY_DETAIL_ID+"' value='"+detailList1[j].EDU_CATEGORY_DETAIL_ID+"'>&nbsp;";
                            html +=         detailList1[j].EDU_CATEGORY_DETAIL_NAME;
                            html += "   </div>";
                        }
                    }

                    html += "   </td>";
                    html += "   <td style='text-align: left;'>";

                    var detailList2 = targetInfoPop.global.level2List;
                    for (var j = 2; j < detailList2.length; j++) {
                        if(detailList2[j].EDU_CATEGORY_ID === list[i].EDU_CATEGORY_ID) {
                            html += "   <div style='display: flex'>";
                            html += "       <input type='checkbox' name='MenuSeqNo' id='MenuSeqNo"+detailList2[j].EDU_CATEGORY_DETAIL_ID+"' value='"+detailList2[j].EDU_CATEGORY_DETAIL_ID+"'>&nbsp;";
                            html +=         detailList2[j].EDU_CATEGORY_DETAIL_NAME;
                            html += "   </div>";
                        }
                    }

                    html += "   </td>";
                    html += "   <td style='text-align: left;'>";

                    var detailList3 = targetInfoPop.global.level3List;
                    for (var j = 0; j < detailList3.length; j++) {
                        if(detailList3[j].EDU_CATEGORY_ID === list[i].EDU_CATEGORY_ID) {
                            html += "   <div style='display: flex'>";
                            html += "       <input type='checkbox' name='MenuSeqNo' id='MenuSeqNo"+detailList3[j].EDU_CATEGORY_DETAIL_ID+"' value='"+detailList3[j].EDU_CATEGORY_DETAIL_ID+"'>&nbsp;";
                            html +=         detailList3[j].EDU_CATEGORY_DETAIL_NAME;
                            html += "   </div>";
                        }
                    }

                    html += "   </td>";
                    html += "</tr>";
                }
                $("#tableData").html(html);
            }
        });
    },

    tableDataSet : function() {
        $.ajax({
            url : "/campus/getTargetList",
            data : {
                TARGET_YEAR : $("#targetYear").val(),
                REG_EMP_SEQ : $("#empSeq").val()
            },
            type : "post",
            dataType : "json",
            async : false,
            success : function(result){
                if(result.flag) {
                    var list = result.list;
                    for (var i = 0; i < list.length; i++) {
                        $('#MenuSeqNo'+list[i].EDU_CATEGORY_DETAIL_ID).prop('checked',true);
                    }
                }
            }
        });
    },

    saveTarget : function() {
        if(!confirm("직무분야를 저장하시겠습니까?")){
            return;
        }

        const checkBox = 'input[name="MenuSeqNo"]:checked';
        const selectedElements = document.querySelectorAll(checkBox);

        let menuSeqNoArr = new Array();
        selectedElements.forEach((el) => {
            let menuSeqNo = {
                EDU_CATEGORY_DETAIL_ID : el.value,
            }
            menuSeqNoArr.push(menuSeqNo);
        });

        if(menuSeqNoArr.length == 0) {
            alert("직무분야가 선택되지 않았습니다.");
            return;
        }
        console.log(menuSeqNoArr);


        $.ajax({
            url : "/campus/setTargetDetailInsert",
            data : {
                TARGET_YEAR : $("#targetYear").val(),
                TARGET_CODE : $("#loginId").val()+$("#targetYear").val(),
                LOGIN_ID : $("#loginId").val(),
                REG_EMP_SEQ : $("#empSeq").val(),
                EDU_CATEGORY_DETAIL_ID : JSON.stringify(menuSeqNoArr)
            },
            type : "post",
            dataType : "json",
            async : false,
            success : function(result){
                console.log(result);
                alert("직무분야 저장이 완료되었습니다.");
                window.close();
            },
            error : function() {
                alert("데이터 저장 중 에러가 발생했습니다.");
                window.close();
            }
        });
    }
}
