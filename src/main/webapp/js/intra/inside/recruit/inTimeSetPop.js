var inTimeSetPop = {
    global : {
        searchAjaxData : "",
        saveAjaxData : "",
    },

    init : function(){
        inTimeSetPop.gridReload();

        inTimeSetPop.global.searchAjaxData = {
            recruitInfoSn : $("#recruitInfoSn").val()
        }

        var result = customKendo.fn_customAjax("/inside/getRecruitAreaList.do", inTimeSetPop.global.searchAjaxData);
        customKendo.fn_dropDownList("recruitAreaInfoSn", result.recruitArea, "JOB","RECRUIT_AREA_INFO_SN", 2);
        $("#recruitAreaInfoSn").data("kendoDropDownList").bind("change", inTimeSetPop.gridReload);
    },

    mainGrid : function(url, params) {
        $("#mainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 489,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount : 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    title: "연번",
                    width: 50,
                    template: "#= ++record #"
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
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 1);
            }
        }).data("kendoGrid");

        $.each($("input[name='inTime']"), function(){
            var inTimeDate = new Date();

            if($(this).val()){
                inTimeDate = $(this).val()
            }

            $("#" + $(this).attr("id")).kendoDateTimePicker({
                dateInput : true,
                format: "yyyy-MM-dd HH:mm",
                value : inTimeDate,
                culture : "ko-KR"
            });

            var buttons = $("#" + $(this).attr("id")).data("kendoDateTimePicker").wrapper.find("button");
            $(buttons[1]).insertBefore(buttons[0]);
        })
    },

    gridReload : function() {
        inTimeSetPop.global.searchAjaxData = {
            recruitAreaInfoSn : $("#recruitAreaInfoSn").val(),
            searchType2 : "1"
        }

        inTimeSetPop.mainGrid("/inside/getInApplicationList.do", inTimeSetPop.global.searchAjaxData);
    },

    setInTimeSet : function(){
        if($("#mainGrid tbody tr").length == 0){
            alert("저장할 데이터가 없습니다.");
            return;
        }

        if(confirm("저장하시겠습니까?")){
            var grid = $("#mainGrid").data("kendoGrid");
            var arr = new Array();

            $.each($("#mainGrid tbody tr"), function(){
                var dataItem = grid.dataItem($(this));
                var data = {
                    recruitAreaInfoSn : dataItem.RECRUIT_AREA_INFO_SN.toString(),
                    applicationId : dataItem.APPLICATION_ID.toString(),
                    inTime : $("#inTime_" + dataItem.APPLICATION_ID).val(),
                    rmk : $("#rmk_" + dataItem.APPLICATION_ID).val(),
                    empSeq : $("#empSeq").val()
                }
                arr.push(data)
            })

            inTimeSetPop.global.saveAjaxData = {
                recruitAreaInfoSn : $("#recruitAreaInfoSn").val(),
                inTimeArr : JSON.stringify(arr)
            }

            var result = customKendo.fn_customAjax("/inside/setApplicationInTime.do", inTimeSetPop.global.saveAjaxData);
            if(result.flag){
                alert("처리되었습니다.");
            }
        }
    },

    selInEvalItemPop : function(){
        let recruitAreaInfoSn = $("#recruitAreaInfoSn").val();
        console.log("recruitAreaInfoSn",recruitAreaInfoSn);
        if(!recruitAreaInfoSn || recruitAreaInfoSn === ""){
            var url = "/inside/pop/selInEvalItemPop.do?recruitInfoSn=" + $("#recruitInfoSn").val() + "&recruitEvalSheetId=" + $("#recruitEvalSheetId").val();
        }else {
            var url = "/inside/pop/selInEvalItemPop.do?recruitInfoSn=" + $("#recruitInfoSn").val() + "&recruitEvalSheetId=" + $("#recruitEvalSheetId").val() + "&recruitAreaInfoSn=" + recruitAreaInfoSn;
        }
        var name = "selInEvalItemPop";
        var option = "width=1000, height=680, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    },
}
