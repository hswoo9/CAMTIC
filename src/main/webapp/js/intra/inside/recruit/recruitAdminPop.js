var recruitAdminPop = {
    global : {
        searchAjaxData : "",
        saveAjaxData : "",
        dropDownDataSource : "",
        applicationCount : 0
    },

    init : function(){

        recruitAdminPop.kendoSetting();

        recruitAdminPop.gridReload();

        recruitAdminPop.recruitStatusBtnSet();

        // $("div.circle").click(function(){
        //     $("div.circle").removeClass("active");
        //     $(this).addClass("active");
        //     $("#checkAll").prop("checked", false);
        //     $("#docPassBtnDiv").hide();
        //     $("#inPassBtnDiv").hide();
        //     $("#fPassBtnDiv").hide();
        //
        //     recruitAdminPop.gridReload();
        //
        //     if($(this).attr("searchType") == "S"){
        //         $("#docPassBtnDiv").show();
        //     }else if($(this).attr("searchType") == "D"){
        //         $("#inPassBtnDiv").show();
        //     }else if($(this).attr("searchType") == "I"){
        //         $("#fPassBtnDiv").show();
        //     }
        // })

        recruitAdminPop.viewMod();
    },

    mainGrid : function(url, params) {
        //var record = 0;
        var datasource = customKendo.fn_gridDataSource2(url, params);
        console.log(datasource);
        $("#mainGrid").kendoGrid({

            dataSource: datasource,
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
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll"/>',
                    template : "<input type='checkbox' id='aplChk_#=APPLICATION_ID#' name='aplChk' value='#=APPLICATION_ID#'/>",
                    width: 50
                }, {
                    title: "순번",
                    width: 50,
                    template: "#= ++record #"
                    /*template : function(e){
                        return $("#mainGrid").data("kendoGrid").dataSource.total() - record++
                    }*/
                }, {
                    field: "USER_NAME",
                    title: "성명",
                    width : 80,
                    template : function(e){
                        return '<a style="cursor: pointer;" onclick="recruitAdminPop.applicationInfo(' + e.APPLICATION_ID + ')">' + e.USER_NAME + '</a>'
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
                    title: "외국어",
                    width : 120
                }, {
                    field: "JOB",
                    title: "채용분야"
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
                    width : 100,
                    template : function(e){
                        var str = "";
                        var avg = e.DOC_SCREEN_AVERAGE == null ? 0 :  Math.round(e.DOC_SCREEN_AVERAGE * 10) / 10;

                        if(e.APPLICATION_STAT == "D" || e.APPLICATION_STAT == "I" || e.APPLICATION_STAT == "IF"){
                            str = '합격 (' + avg + "점)";
                        }else if(e.APPLICATION_STAT == "DF"){
                            str = '불합격 (' + avg + "점)";
                        }else{
                            str = avg + '점';
                        }

                        return str;
                    },
                }, {
                    field: "IN_SCREEN_AVERAGE",
                    title: "면접심사",
                    width : 100,
                    template : function(e){
                        console.log(e);
                        if(e.IN_AVOID != "Y"){
                            var avg = e.IN_SCREEN_AVERAGE == null ? 0 : Math.round(e.IN_SCREEN_AVERAGE * 10) / 10;
                            var str = "";


                            if(e.APPLICATION_STAT == "I"){
                                str = '합격 (' + avg + "점)";
                            }else if(e.APPLICATION_STAT == "IF"){
                                str = '불합격 (' + avg + "점)";
                            }else if(e.APPLICATION_STAT == "D"){
                                str = avg + '점';
                            }else{
                                str = "";
                            }

                            return str;
                        }else{
                            return e.IN_AVOID_TXT
                        }
                    }
                }, {
                    field: "PRELIMINARY_PASS",
                    title: "후보처리",
                    width : 80,
                    template : function(e){
                        var html = "";

                        var chk = "";
                        if(e.PRELIMINARY_PASS == "Y"){
                            chk = "checked";
                        }

                        if(e.APPLICATION_STAT == "I"){
                            html = "<input type='checkbox' id='preliminaryPass_" + e.APPLICATION_ID + "' name='preliminaryPass' value='" + e.APPLICATION_ID + "' " + chk + " onclick='recruitAdminPop.setPrePassAppl(this)'/>"
                        }

                        return html;
                    }
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 1);
            }
        }).data("kendoGrid");

        $("#checkAll").click(function(){
            if($(this).is(":checked")) $("input[name=aplChk]").prop("checked", true);
            else $("input[name=aplChk]").prop("checked", false);
        });
    },

    gridReload : function() {
        recruitAdminPop.global.searchAjaxData = {
            recruitInfoSn : $("#recruitInfoSn").val(),
            recruitAreaInfoSn : $("#recruitAreaInfoSn").val(),
            docScreenType : $("#docScreenType").val(),
            interViewType : $("#interViewType").val(),
        }

        recruitAdminPop.mainGrid("/inside/getApplicationList", recruitAdminPop.global.searchAjaxData);
    },

    recruitStatusBtnSet : function(){
        $("#recruitStatusDiv button").remove();

        var result = customKendo.fn_customAjax("/inside/getRecruit.do", {recruitInfoSn : $("#recruitInfoSn").val()})
        if(result.flag) {
            var recruit = result.recruit;
            console.log("result", result);
            console.log("recruit", recruit);
            console.log("applicationCount", recruit.applicationCount);
            recruitAdminPop.global.applicationCount = recruit.applicationCount;

            var html = "";
            if ($("#recruitStatusSn").val() == "1") {
                html = '<button type="button" class="k-button k-button-solid-info mngBtn" onClick="recruitAdminPop.setRecruitStatusUpd(\'접수중\', \'2\')">작성완료</button>';
            } else if ($("#recruitStatusSn").val() == "2") {
                html = '<button type="button" class="k-button k-button-solid-base mngBtn" style="margin-right: 5px;" onclick="recruitAdminPop.setRecruitStatusUpd(\'작성중\', \'1\')"';
                    if (recruit.applicationCount >= 1) {
                        html += ' disabled';
                    }
                html += '>작성중</button>' +
                    '<button type="button" class="k-button k-button-solid-info mngBtn" onclick="recruitAdminPop.setRecruitStatusUpd(\'심사중(서류심사)\', \'3\')">접수완료</button>';
            } else if ($("#recruitStatusSn").val() == "3") {
                html = '<button type="button" class="k-button k-button-solid-base mngBtn" style="margin-right: 5px;" onclick="recruitAdminPop.setRecruitStatusUpd(\'접수중\', \'2\')">접수중</button>' +
                    '<button type="button" class="k-button k-button-solid-info mngBtn" onclick="recruitAdminPop.setRecruitStatusUpd(\'심사중(면접심사)\', \'4\')">서류심사 완료</button>';
            } else if ($("#recruitStatusSn").val() == "4") {
                html = '<button type="button" class="k-button k-button-solid-base mngBtn" style="margin-right: 5px;" onclick="recruitAdminPop.setRecruitStatusUpd(\'심사중(서류심사)\', \'3\')">심사중(서류심사)</button>' +
                    '<button type="button" class="k-button k-button-solid-info mngBtn" onclick="recruitAdminPop.setRecruitStatusUpd(\'면접심사완료\', \'5\')">면접심사완료</button>';
            } else if ($("#recruitStatusSn").val() == "5") {
                html = '<button type="button" class="k-button k-button-solid-base mngBtn" style="margin-right: 5px;" onclick="recruitAdminPop.setRecruitStatusUpd(\'심사중(면접심사)\', \'4\')">심사중(면접심사)</button>' +
                    '<button type="button" class="k-button k-button-solid-info mngBtn" onclick="recruitAdminPop.setRecruitStatusUpd(\'채용완료\', \'E\')">채용완료</button>'
            }

            $("#recruitStatusDiv").append(html);
        }
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
                alert("http://218.158.231.186/evaluation/evalLogin.do?recruitInfoSn=" + $("#recruitInfoSn").val() + "&type=" + e)
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
            applicationId += "," + $(this).val();
        })

        if(type == "pass"){
            confirmTxt = "합격 처리 하시겠습니까?";
        }else{
            confirmTxt = "합격 불합격처리 하시겠습니까?";
        }

        if(confirm(confirmTxt)){
            var data = {
                applicationStat : sts,
                empSeq : $("#empSeq").val(),
                recruitInfoSn : $("#recruitInfoSn").val(),
                applicationId : applicationId.substring(1),
            }
            var result = customKendo.fn_customAjax("/inside/setApplicationUpd.do", data);
            if(result.flag){
                alert("처리되었습니다.");
                if(sts == "I" || sts == "IF"){
                    recruitAdminPop.gridReload();
                }else{
                    recruitAdminPop.gridReload();
                }
            }
        }
    },

    setInAvoidUpd : function(){
        if($("input[name='aplChk']:checked").length == 0){
            alert("응시자를 선택해주세요.");
            return;
        }

        var appArr = new Array();
        $.each($("input[name='aplChk']:checked"), function(i, e){
            var dataItem = $("#mainGrid").data("kendoGrid").dataItem($(e).closest("tr"));
            var data = {
                applicationId : dataItem.APPLICATION_ID,
                empSeq : $("#empSeq").val()
            }
            if(dataItem.IN_AVOID == "Y"){
                data.inAvoid = "N"
            }else{
                data.inAvoid = "Y"
            }
            appArr.push(data)

        })

        if(confirm("선택한 응시자를 면접 불참처리 하시겠습니까?\n")){
            var data = {
                appArr : JSON.stringify(appArr),
                recruitInfoSn : $("#recruitInfoSn").val(),
            }
            var result = customKendo.fn_customAjax("/inside/setInAvoidUpd.do", data);
            if(result.flag){
                alert("처리되었습니다.");
                window.reload();
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
        var option = "width=1000, height=300, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    },

    screenPrintPop: function(){
        const recruitInfoSn = $("#recruitInfoSn").val();
        const recruitAreaInfoSn = $("#recruitAreaInfoSn").val();
        var url = "/inside/pop/screenPrintPop.do?recruitInfoSn="+recruitInfoSn+"&recruitAreaInfoSn="+recruitAreaInfoSn;
        var name = "screenPrintPop";
        var option = "width=1250, height=900, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no";
        var popup = window.open(url, name, option);
    },

    screenPrintPop2: function(){
        const recruitInfoSn = $("#recruitInfoSn").val();
        const recruitAreaInfoSn = $("#recruitAreaInfoSn").val();
        var url = "/inside/pop/screenPrintPop2.do?recruitInfoSn="+recruitInfoSn+"&recruitAreaInfoSn="+recruitAreaInfoSn;
        var name = "screenPrintPop2";
        var option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no";
        var popup = window.open(url, name, option);
    },

    inTimeSetPop : function(){
        var url = "/inside/pop/inTimeSetPop.do?recruitInfoSn=" + $("#recruitInfoSn").val();
        var name = "inTimeSetPop";
        var option = "width=1250, height=690, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    },

    applicationInfo : function(e){
        var url = "/inside/pop/applicationView.do?applicationId=" + e;
        if($("#stat").val() == "view"){
            url += "&stat=view";
        }
        url += "&recruitInfoSn="+$("#recruitInfoSn").val();
        var name = "recruitReqPop";
        var option = "width=1000, height=1200, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    },

    setRecruitStatusUpd : function(t, e){
        $("#recruitStatusSn").val(e);

        if(confirm("공고 상태를 변경하시겠습니까?")){
            recruitAdminPop.global.saveAjaxData = {
                recruitInfoSn : $("#recruitInfoSn").val(),
                recruitStatusSn : e,
                recruitStatusText : t
            }

            if(e == "3" && recruitAdminPop.global.applicationCount == 0){
                $("#recruitStatusSn").val('E');
                recruitAdminPop.global.saveAjaxData.recruitStatusSn = 'E';
                recruitAdminPop.global.saveAjaxData.recruitStatusText = '채용완료';
            }

            var result = customKendo.fn_customAjax("/inside/setRecruitStatusUpd.do", recruitAdminPop.global.saveAjaxData);
            if(result.flag){
                alert("처리되었습니다.");
                recruitAdminPop.recruitStatusBtnSet();
                opener.parent.recruitList.gridReload();
            }
        }
    },

    duplicationCntPop : function(e){
        var dataItem = $("#mainGrid").data("kendoGrid").dataItem($(e).closest("tr"));

        var url = "/inside/pop/duplicationPop.do?userName=" + dataItem.USER_NAME + "&userEmail=" + dataItem.USER_EMAIL + "&notRecruitInfoSn=" + dataItem.RECRUIT_INFO_SN;
        var name = "duplicationCntPop";
        var option = "width=1000, height=470, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    },

    recruitDetailPop : function () {
        var url = "/inside/pop/recruitDetailPop.do?recruitInfoSn=" + $("#recruitInfoSn").val() + "&recruitStat=" +$("#recruitStatusSn").val();
        if($("#stat").val() == "view"){
            url += "&stat=view";
        }
        var name = "recruitDetailPop";
        var option = "width=1000, height=720, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
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
    },

    kendoSetting : function(){
        recruitAdminPop.global.searchAjaxData = {
            recruitInfoSn : $("#recruitInfoSn").val()
        }

        var result = customKendo.fn_customAjax("/inside/getRecruitAreaList.do", recruitAdminPop.global.searchAjaxData);
        customKendo.fn_dropDownList("recruitAreaInfoSn", result.recruitArea, "JOB","RECRUIT_AREA_INFO_SN", 10);

        $("#recruitAreaInfoSn").data("kendoDropDownList").bind("change", recruitAdminPop.gridReload);
        $("#recruitAreaInfoSn").data("kendoDropDownList").select(1)
        recruitAdminPop.global.dropDownDataSource = [
            { text: "전체", value: "" },
            { text: "서류심사 합격", value: "D" },
            { text: "서류심사 불합격", value: "DF" }
        ]

        $("#docScreenType").kendoDropDownList({
            dataSource : recruitAdminPop.global.dropDownDataSource,
            dataTextField: "text",
            dataValueField: "value",
            change : recruitAdminPop.gridReload
        });

        recruitAdminPop.global.dropDownDataSource = [
            { text: "전체", value: "" },
            { text: "면접심사 합격", value: "I" },
            { text: "면접심사 불합격", value: "if" },
            { text: "후보", value: "preliminaryPass" },
            { text: "불참", value: "avoid" }
        ]

        $("#interViewType").kendoDropDownList({
            dataSource : recruitAdminPop.global.dropDownDataSource,
            dataTextField: "text",
            dataValueField: "value",
            change : recruitAdminPop.gridReload
        });
        // recruitAreaInfoSn
    },
    recruitPrintPop : function() {
        let recruitInfoSn = $("#recruitInfoSn").val();
        let recruitAreaInfoSn = $("#recruitAreaInfoSn").val();
        console.log("Recruit Info Sn: " + recruitInfoSn);
        console.log("Recruit Area Info Sn : "+recruitAreaInfoSn);

        var url = "/Inside/pop/recruitPrintPop.do?recruitInfoSn="+recruitInfoSn+"&recruitAreaInfoSn="+recruitAreaInfoSn;
        var name = "recruitPrintPop";
        var option = "width=1250, height=900, scrollbars=no, top=100, left=300, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    },

    getEvalSetPop : function(e){
        let recruitInfoSn = $("#recruitInfoSn").val();
        let recruitAreaInfoSn = $("#recruitAreaInfoSn").val();
        console.log("Recruit Info Sn: " + recruitInfoSn);
        console.log("Recruit Area Info Sn : "+recruitAreaInfoSn);
        var url = "/inside/pop/selEvalPop.do?recruitInfoSn=" + recruitInfoSn;
        var name = "selInEvalItemPop";
        var option = "width=1000, height=870, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    },

    viewMod : function(){
        /** view 모드일때 조회 이외에 버튼 전부 사라짐 */
        if($("#stat").val() == "view"){
            $(".mngBtn").hide();
            $("input[type=checkbox]").attr("disabled", true);
        }
    },

    sendSmsPop : function(){
        var joinSn = "";
        $.each($("input[name='aplChk']:checked"), function(i){
            if(i != 0){
                joinSn += ",";
            }
            joinSn += $(this).val();
        });

        if($("input[name='aplChk']:checked").length == 0){
            alert("SMS 발송 할 지원자를 선택해주세요."); return;
        }

        var url = "/system/pop/messageSendPop.do?userList="+joinSn+"&type=recruit";
        var name = "messageSendPop";
        var option = "width=315, height=718, scrollbars=no, top=200, left=600, resizable=no, toolbars=no, menubar=no";
        var popup = window.open(url, name, option);
    },

}
