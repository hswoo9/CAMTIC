var evalInApplicationList = {
    global : {
        searchAjaxData : "",
        saveAjaxData : "",
    },

    fn_defaultScript : function(){
        evalInApplicationList.getRecruitInfo();
        evalInApplicationList.gridReload();
    },
    
    getRecruitInfo : function(){
        evalInApplicationList.global.saveAjaxData = {
            recruitInfoSn : $("#recruitInfoSn").val(),
            evalEmpSeq : $("#evalEmpSeq").val(),
        }

        var result = customKendo.fn_customAjax("/inside/getRecruit.do", evalInApplicationList.global.saveAjaxData);
        if(result.flag){
            $("#recruitTitle").text(result.recruit.RECRUIT_TITLE);
            customKendo.fn_dropDownList("recruitAreaInfoSn", result.recruit.recruitArea, "JOB", "RECRUIT_AREA_INFO_SN", "2")
            $("#recruitAreaInfoSn").data("kendoDropDownList").bind("change", evalInApplicationList.gridReload);
        }
    },
    
    mainGrid : function(url, params) {
        var record = 0;

        $("#mainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
            sortable: true,
            scrollable: true,
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
                    template : function(e){
                        return $("#mainGrid").data("kendoGrid").dataSource.total() - record++
                    }
                }, {
                    field: "IN_TIME",
                    title: "면접시각",
                    width : 150,
                    template : function(e){
                        if(e.IN_TIME != null){
                            return e.IN_TIME;
                        }else{
                            return "미설정";
                        }
                    }
                }, {
                    field: "USER_NAME",
                    title: "성명",
                    width : 80,
                    template : function(e){
                        return '<a style="cursor: pointer;" onclick="evalInApplicationList.applicationInfo(' + e.APPLICATION_ID + ')">' + e.USER_NAME + '</a>';
                    }
                }, {
                    title: "입사정보",
                    width : 80,
                    template : function(e){
                        return '<button type="button" class="k-button k-button-solid-info" onclick="evalInApplicationList.applicationInfo(' + e.APPLICATION_ID + ')">조회</button>';
                    }
                },{
                    field: "AGE_GENDER",
                    title: "나이(성별)",
                    width : 80
                }, {
                    field: "SCHOOL_NAME",
                    title: "최종학력"
                }, {
                    field: "WORK_DATE",
                    title: "경력",
                    width : 120,
                    template : function(e){
                        if(e.WORK_DATE != null){
                            return evalInApplicationList.fn_calculate(e.WORK_DATE);
                        }else{
                            return "";
                        }
                    }
                }, {
                    field: "ADDR",
                    title: "현재 거주지",
                    width : 120
                }, {
                    title: "평가",
                    width : 100,
                    template : function(e){
                        return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="evalInApplicationList.evalInScreenPop(this)">' +
                            '	<span class="k-button-text">면접심사</span>' +
                            '</button>';

                    }
                }
            ],
        }).data("kendoGrid");
    },
    
    gridReload : function() {
        evalInApplicationList.global.searchAjaxData = {
            recruitAreaInfoSn : $("#recruitAreaInfoSn").val(),
            searchType : "D",
            evalType : "in",
            evalEmpSeq : $("#evalEmpSeq").val(),
            searchType2 : "1"
        }

        evalInApplicationList.mainGrid("/inside/getInApplicationList.do", evalInApplicationList.global.searchAjaxData);
    },

    applicationInfo : function(e){
        var url = "/inside/pop/applicationView.do?applicationId=" + e;
        if($("#stat").val() == "view"){
            url += "&stat=view";
        }
        var name = "recruitReqPop";
        var option = "width=1000, height=1200, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    },

    evalInScreenPop : function(e){
        var dataItem = $("#mainGrid").data("kendoGrid").dataItem($(e).closest("tr"));
        if(dataItem.IN_TIME == null){
            alert("면접시간이 설정되지 않았습니다.");
            return;
        }

        var url = "/evaluation/evalInScreen.do?applicationId=" + dataItem.APPLICATION_ID + "&recruitInfoSn=" + $("#recruitInfoSn").val();
        var name = "duplicationCntPop";
        var option = "width=1000, height=850, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    },

    setEvalEnd : function(){
        if(confirm("면접심사평가에 참여해 주셔서 진심으로 감사드립니다.\n면접심사평가를 종료합니다.")){
            evalInApplicationList.global.saveAjaxData = {
                evalEmpSeq : $("#evalEmpSeq").val(),
                recruitInfoSn : $("#recruitInfoSn").val(),
                applicationStat : "D",
                evalScreenType : "in"
            }
            var result = customKendo.fn_customAjax("/evaluation/setEvalEnd.do", evalInApplicationList.global.saveAjaxData)
            if(result.flag){
                if(result.rs.chk){
                    alert("평가가 종료되었습니다.");
                    window.close();
                }else{
                    alert("평가내용이 저장되지 않은 응시원서가 있습니다.");
                }
            }
        }
    },

    fn_calculate : function(e) {
        var ret_month = 0;
        ret_month = e;

        return Math.floor(ret_month / 12) + "년" + parseInt(ret_month % 12) + "개월"
    },

    fn_chk_month : function(e) {
        var workDate = e.split("|");

        var ret_month = 0;
        var st_year, st_month, ed_year, ed_month, bf_year, bf_month;
        var bool = true;


        for(var i = 0; i < workDate.length; i++){
            var stDt = workDate[i].split("~")[0];
            var enDt = workDate[i].split("~")[1];
            /** 시작 */
            st_year = parseInt(stDt.split("-")[0]);
            st_month = parseInt(stDt.split("-")[1]);
            /** 종료 */
            ed_year = parseInt(enDt.split("-")[0]);
            ed_month = parseInt(enDt.split("-")[1]);

            ret_month += ((ed_year - st_year) * 12 + (ed_month - st_month));

            if (ret_month < 0) {
                alert('기간선택이 잘못되었습니다.');
                bool = false;
                return false;
            }

            bf_year = ed_year;
            bf_month = ed_month;
        }

        return ret_month;
    }
}
