var recruitAdminPop = {
    global : {
        searchAjaxData : "",
        saveAjaxData : "",
    },

    init : function(){
        recruitAdminPop.gridReload();

        $("div.circle").click(function(){
            $("div.circle").removeClass("active");
            $(this).addClass("active");
            $("#checkAll").prop("checked", false);
            $("#docPassBtnDiv").hide();
            $("#inPassBtnDiv").hide();
            $("#fPassBtnDiv").hide();

            recruitAdminPop.gridReload();

            if($(this).attr("searchType") == "S"){
                $("#docPassBtnDiv").show();
            }else if($(this).attr("searchType") == "D"){
                $("#inPassBtnDiv").show();
            }else if($(this).attr("searchType") == "I"){
                $("#fPassBtnDiv").show();
            }
        })
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
                pageSizes : [ 10, 20, 30, 50, 100 ],
                buttonCount : 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll"/>',
                    template : "<input type='checkbox' id='aplChk_#=APPLICATION_ID#' name='aplChk' value='#=APPLICATION_ID#'/>",
                    width: 50
                }, {
                    title: "순번",
                    width: 50,
                    template : function(e){
                        return $("#mainGrid").data("kendoGrid").dataSource.total() - record++
                    }
                }, {
                    field: "USER_NAME",
                    title: "성명",
                    width : 80,
                    template : function(e){
                        return '<a  style="cursor: pointer;" onclick="recruitAdminPop.applicationInfo(' + e.APPLICATION_ID + ')">' + e.USER_NAME + '</a>'
                    }
                }, {
                    field: "AGE",
                    title: "연령",
                    template : function(e){
                        return e.AGE + "세"
                    },
                    width : 50
                }, {
                    field: "GENDER",
                    title: "성별",
                    width : 50
                }, {
                    field: "SCHOOL_NAME",
                    title: "최종학력"
                }, {
                    field: "WORK_DATE",
                    title: "경력",
                    width : 120,
                    template : function(e){
                        if(e.WORK_DATE != null){
                            return recruitAdminPop.fn_calculate(e.WORK_DATE);
                        }else{
                            return "";
                        }
                    }
                }, {
                    field: "ADDR",
                    title: "지역",
                    width : 120
                }, {
                    field: "LANG_NAME",
                    title: "외국어"
                }, {
                    field: "JOB",
                    title: "채용분야",
                    width : 120
                }, {
                    field: "SAVE_DATE",
                    title: "지원일시",
                    width : 150
                }, {
                    field: "DUPLICATION_CNT",
                    title: "중복지원",
                    template : function(e){
                        if(e.DUPLICATION_CNT == "0"){
                            return e.DUPLICATION_CNT + "건"
                        }else{
                            return '<a onclick="recruitAdminPop.duplicationCntPop(this)" style="cursor: pointer;">' + e.DUPLICATION_CNT + "건</a>"
                        }
                    },
                    width : 80
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
                }, {
                    field: "IN_SCREEN_AVERAGE",
                    title: "면접심사",
                    width : 80,
                    hidden : true,
                    template : function(e){
                        if(e.IN_SCREEN_AVERAGE != null){
                            return e.IN_SCREEN_AVERAGE + "점";
                        }else{
                            return "심사전";
                        }
                    }
                }, {
                    field: "IN_AVOID",
                    title: "면접불참",
                    width : 80,
                    hidden : true,
                }, {
                    field: "PRELIMINARY_PASS",
                    title: "예비합격",
                    width : 80,
                    hidden : true,
                    template : function(e){
                        var chk = "";
                        if(e.PRELIMINARY_PASS == "Y"){
                            chk = "checked";
                        }

                        return "<input type='checkbox' id='preliminaryPass_" + e.APPLICATION_ID + "' name='preliminaryPass' value='" + e.APPLICATION_ID + "' " + chk + " onclick='recruitAdminPop.setPrePassAppl(this)'/>"
                    }
                }
            ],
        }).data("kendoGrid");

        if($("div.circle.active").attr("searchType") == "D"){
            $("#mainGrid").data("kendoGrid").showColumn(12);
            $("#mainGrid").data("kendoGrid").showColumn(13);
            $("#mainGrid").data("kendoGrid").showColumn(14);
        }else if($("div.circle.active").attr("searchType") == "I"){
            $("#mainGrid").data("kendoGrid").showColumn(13);
            $("#mainGrid").data("kendoGrid").hideColumn(14);
            $("#mainGrid").data("kendoGrid").showColumn(15);
        }

        $("#checkAll").click(function(){
            if($(this).is(":checked")) $("input[name=aplChk]").prop("checked", true);
            else $("input[name=aplChk]").prop("checked", false);
        });
    },

    gridReload : function() {
        recruitAdminPop.global.searchAjaxData = {
            recruitInfoSn : $("#recruitInfoSn").val(),
            searchType : $("div.circle.active").attr("searchType")
        }

        recruitAdminPop.mainGrid("/inside/getApplicationList", recruitAdminPop.global.searchAjaxData);
    },

    getEvalUrlSet : function(e){
        if(e == "doc"){
            var url = "/evaluation/evalLogin.do?recruitInfoSn=" + $("#recruitInfoSn").val() + "&type=" + e;
            var name = "evalLogin";
            var option = "width=500, height=275, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
            var popup = window.open(url, name, option);
        }else{
            if(location.host.indexOf("127.0.0.1") > -1 || location.host.indexOf("localhost") > -1){
                alert("http://localhost:8090/evaluation/evalLogin.do?recruitInfoSn=" + $("#recruitInfoSn").val() + "&type=" + e)
            }else if(location.host.indexOf("218.158.231.186") > -1){
                alert("http://218.158.231.186:8080/evaluation/evalLogin.do?recruitInfoSn=" + $("#recruitInfoSn").val() + "&type=" + e)
            }
        }
    },

    setApplicationUpd : function(sts, type){
        if($("input[name='aplChk']:checked").length == 0){
            alert("지원자를 선택해주세요.");
            return;
        }

        var applicationId = "";
        var confirmTxt = "";
        $.each($("input[name='aplChk']:checked"), function(i, e){
            applicationId += "," + $(this).val()
        })

        if(type == "pass"){
            confirmTxt = "합격 처리 하시겠습니까?";
        }else{
            confirmTxt = "합격 취소처리 하시겠습니까?";
        }

        if(confirm(confirmTxt)){
            var data = {
                applicationStat : sts,
                empSeq : $("#empSeq").val(),
                applicationId : applicationId.substring(1),

            }
            var result = customKendo.fn_customAjax("/inside/setApplicationUpd.do", data);
            if(result.flag){
                alert("처리되었습니다.");
                recruitAdminPop.gridReload();
            }
        }
    },

    setInAvoidUpd : function(){
        if($("input[name='aplChk']:checked").length == 0){
            alert("면접 불참자를 선택해주세요.");
            return;
        }

        var applicationId = "";
        $.each($("input[name='aplChk']:checked"), function(i, e){
            applicationId += "," + $(this).val()
        })

        if(confirm("선택한 응시자를 면접 불참처리 하시겠습니까?")){
            var data = {
                empSeq : $("#empSeq").val(),
                applicationId : applicationId.substring(1),
            }
            var result = customKendo.fn_customAjax("/inside/setInAvoidUpd.do", data);
            if(result.flag){
                alert("처리되었습니다.");
                recruitAdminPop.gridReload();
            }
        }
    },

    setPrePassAppl : function(e){
        var preliminaryPass = "";
        if($(e).is(":checked")){
            preliminaryPass = "Y";
        }else{
            preliminaryPass = "N";
        }

        recruitAdminPop.global.saveAjaxData = {
            preliminaryPass : preliminaryPass,
            applicationId : $(e).closest("tr").find("input[name='aplChk']").val(),
            empSeq : $("#empSeq").val()
        }

        var result = customKendo.fn_customAjax("/inside/setPrePassAppl.do", recruitAdminPop.global.saveAjaxData);
        if(result.flag){
            alert("처리되었습니다.");
            recruitAdminPop.gridReload();
        }
    },

    screenViewPop : function(e){
        var url = "/inside/pop/screenViewPop.do?recruitInfoSn=" + $("#recruitInfoSn").val() + "&type=" + e;
        var name = "screenViewPop";
        var option = "width=1000, height=470, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    },

    inTimeSetPop : function(){
        var url = "/inside/pop/inTimeSetPop.do?recruitInfoSn=" + $("#recruitInfoSn").val();
        var name = "inTimeSetPop";
        var option = "width=1250, height=690, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    },

    applicationInfo : function(e){
        var url = "";
        var name = "recruitReqPop";
        var option = "width=1000, height=1200, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        //var popup = window.open(url, name, option);
    },

    setRecruitStatusUpd : function(t, e){
        recruitAdminPop.global.saveAjaxData = {
            recruitInfoSn : $("#recruitInfoSn").val(),
            recruitStatusSn : e,
            recruitStatusText : t
        }

        var result = customKendo.fn_customAjax("/inside/setRecruitStatusUpd.do", recruitAdminPop.global.saveAjaxData);
        if(result.flag){
            alert("처리되었습니다.");
            recruitAdminPop.gridReload();
        }
    },

    duplicationCntPop : function(e){
        var dataItem = $("#mainGrid").data("kendoGrid").dataItem($(e).closest("tr"));

        var url = "/inside/pop/duplicationPop.do?userName=" + dataItem.USER_NAME + "&userEmail=" + dataItem.USER_EMAIL + "&notRecruitInfoSn=" + dataItem.RECRUIT_INFO_SN;
        var name = "duplicationCntPop";
        var option = "width=1000, height=470, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    },

    fn_calculate : function(e) {
        var ret_month = 0;
        ret_month = recruitAdminPop.fn_chk_month(e);

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
