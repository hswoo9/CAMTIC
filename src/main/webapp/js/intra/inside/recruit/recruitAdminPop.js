var recruitAdminPop = {
    global : {
        searchAjaxData : "",
    },

    init : function(){
        recruitAdminPop.gridReload();

        $("div.circle").click(function(){
            $("div.circle").removeClass("active");
            $(this).addClass("active");

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
                        return '<a onclick="recruitAdminPop.applicationInfo(' + e.APPLICATION_ID + ')">' + e.USER_NAME + '</a>'
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
                    field: "",
                    title: "경력",
                    width : 120
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
                        return e.DUPLICATION_CNT + "건"
                    },
                    width : 80
                }
            ]
        }).data("kendoGrid");
    },

    gridReload : function() {
        recruitAdminPop.global.searchAjaxData = {
            recruitInfoSn : $("#recruitInfoSn").val(),
            searchType : $("div.circle.active").attr("searchType")
        }

        recruitAdminPop.mainGrid("/inside/getApplicationList", recruitAdminPop.global.searchAjaxData);
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
        var popup = window.open(url, name, option);
    },
}
