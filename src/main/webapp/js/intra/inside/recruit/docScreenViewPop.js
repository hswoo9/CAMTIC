var docScreenViewPop = {
    global : {
        searchAjaxData : "",
        saveAjaxData : "",
    },

    init : function(recruit){
        $("#recruitEvalSheetId").val(recruit.RECRUIT_EVAL_SHEET_ID);
        $("#recruitInfoSn").val(recruit.RECRUIT_INFO_SN);
        $("#recruitTitle").text(recruit.RECRUIT_TITLE);

        docScreenViewPop.gridReload();

        customKendo.fn_dropDownList("recruitAreaInfoSn", recruit.recruitArea, "AREA_TITLE","RECRUIT_AREA_INFO_SN", 2);
        $("#recruitAreaInfoSn").data("kendoDropDownList").bind("change", docScreenViewPop.gridReload);
    },

    mainGrid : function(url, params) {
        var record = 0;

        $("#mainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
            sortable: true,
            scrollable: true,
            selectable: "row",
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
                    title: "순번",
                    width: 50,
                    template : function(e){
                        return $("#mainGrid").data("kendoGrid").dataSource.total() - record++
                    }
                }, {
                    field: "USER_NAME",
                    title: "성명",
                    width : 80,
                }, {
                    field: "AGE",
                    title: "연령",
                    width : 50,
                    template : function(e){
                        return e.AGE + "세"
                    },
                }, {
                    field: "GENDER",
                    title: "성별",
                    width : 50
                }, {
                    field: "SCHOOL_NAME",
                    title: "최종학력",
                }, {
                    field: "WORK_DATE",
                    title: "경력",
                    width : 100,
                    template : function(e){
                        if(e.WORK_DATE != null){
                            return docScreenViewPop.fn_calculate(e.WORK_DATE);
                        }else{
                            return "";
                        }
                    }
                }, {
                    field: "ADDR",
                    title: "지역",
                    width : 150
                }, {
                    field: "LANG_NAME",
                    title: "외국어",
                    width : 150
                }, {
                    field: "DOC_SCREEN_AVERAGE",
                    title: "서류심사",
                    width : 80,
                    template : function(e){
                        if(e.DOC_SCREEN_AVERAGE != null){
                            return e.DOC_SCREEN_AVERAGE + "점";
                        }else{
                            return "심사전";
                        }
                    }
                }
            ]
        }).data("kendoGrid");
    },

    gridReload : function() {
        docScreenViewPop.global.searchAjaxData = {
            recruitInfoSn : $("#recruitInfoSn").val(),
            recruitAreaInfoSn : $("#recruitAreaInfoSn").val(),
            notSearchType : "S"
        }

        docScreenViewPop.mainGrid("/recruit/manage/eval/getApplicationScreenViewList.do", docScreenViewPop.global.searchAjaxData);

        docScreenViewPop.fnResizeForm();
    },

    fn_calculate : function(e) {
        var ret_month = 0;
        ret_month = docScreenViewPop.fn_chk_month(e);

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
    },

    fnResizeForm : function() {
        var strWidth = $('.pop_sign_wrap').outerWidth() + (window.outerWidth - window.innerWidth) + 18;
        var strHeight = $('.pop_sign_wrap').outerHeight() + (window.outerHeight - window.innerHeight) + 10;

        try{
            var childWindow = window.parent;
            childWindow.resizeTo((strWidth), strHeight);
        }catch(exception){
            console.log('window resizing cat not run dev mode.');
        }
    },
}
