var inTimeSetPop = {
    global : {
        searchAjaxData : "",
    },

    init : function(recruit){
        inTimeSetPop.gridReload();

        $("#recruitTitle").text(recruit.RECRUIT_TITLE);
            console.log(recruit.recruitArea)
        customKendo.fn_dropDownList("recruitAreaInfoSn", recruit.recruitArea, "JOB","RECRUIT_AREA_INFO_SN", 2);
        $("#recruitAreaInfoSn").data("kendoDropDownList").bind("change", inTimeSetPop.gridReload);
    },

    mainGrid : function(url, params) {
        var record = 0;

        $("#mainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 489,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 30, 50, 100 ],
                buttonCount : 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    title: "연번",
                    width: 50,
                    template : function(e){
                        return $("#mainGrid").data("kendoGrid").dataSource.total() - record++
                    }
                }, {
                    field: "JOB",
                    title: "분야",
                    width : 180,
                }, {
                    field: "IN_TIME",
                    title: "면접시각",
                    width : 180,
                    template : function (e){
                        if(e.IN_TIME != null){
                            return "<input type='text' id='inTime_" + e.APPLICATION_ID + "' name='inTime' value='" + e.IN_TIME + "'>";
                        }else{
                            return "<input type='text' id='inTime_" + e.APPLICATION_ID + "' name='inTime'>";
                        }
                    }
                }, {
                    field: "USER_NAME",
                    title: "성명",
                    width : 80
                }, {
                    field: "AGE_GENDER",
                    title: "나이(성별)",
                    width : 80
                }, {
                    field: "SCHOOL_NAME",
                    title: "최종학력 및 전공",
                    width : 300
                }, {
                    field: "ADDR",
                    title: "현재 거주지",
                    width : 150
                }, {
                    field: "RMK",
                    title: "비고",
                    template : function (e){
                        if(e.RMK != null){
                            return "<input type='text' id='rmk_" + e.APPLICATION_ID + "' class='k-input k-textbox k-input-solid k-input-md k-rounded-md' value='" + e.RMK + "'>";
                        }else{
                            return "<input type='text' id='rmk_" + e.APPLICATION_ID + "' class='k-input k-textbox k-input-solid k-input-md k-rounded-md'>";
                        }
                    }
                }
            ]
        }).data("kendoGrid");

        $.each($("input[name='inTime']"), function(){
            var inTimeDate = new Date();

            if($(this).val()){
                inTimeDate = $(this).val()
            }

            $("#" + $(this).attr("id")).kendoDateTimePicker({
                dateInput : true,
                format: "yyyy-MM-dd hh:mm",
                value : inTimeDate,
                culture : "ko-KR"
            });
        })
    },

    gridReload : function() {
        inTimeSetPop.global.searchAjaxData = {
            recruitAreaInfoSn : $("#recruitAreaInfoSn").val()
        }

        inTimeSetPop.mainGrid("/inside/getInApplicationList.do", inTimeSetPop.global.searchAjaxData);
    },

    setInTimeSet : function(){
        if(confirm("저장하시겠습니까?")){
            var data = {
                applicationStat : sts,
                empSeq : $("#empSeq").val(),
                applicationId : applicationId.substring(1),
            }
            var result = customKendo.fn_customAjax("/inside/setApplicationUpd.do", data);
            if(result.flag){
                alert("처리되었습니다.");
                inTimeSetPop.gridReload();
            }
        }
    },

    inTimeSetPop : function(){
        var url = "/inside/pop/inTimeSetPop.do?recruitInfoSn=" + $("#recruitInfoSn").val();
        var name = "inTimeSetPop";
        var option = "width=1000, height=1200, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    },

    applicationInfo : function(e){
        var url = "";
        var name = "recruitReqPop";
        var option = "width=1000, height=1200, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    },
}
