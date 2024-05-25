var recruitListTl = {

    global : {
        searchAjaxData : "",
        saveAjaxData : ""
    },

    init : function(){
        recruitListTl.dataSet();
        recruitListTl.gridReload();
    },

    dataSet : function() {
        $("#recruitYear").kendoDatePicker({
            start: "decade",
            depth: "decade",
            culture : "ko-KR",
            format : "yyyy",
            value : new Date()
        });

        $("#searchType").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                { text: "모집분야", value: "1" },
                { text: "공고명", value: "2" },
                { text: "공고번호", value: "3" },
                { text: "지원자", value: "4" }
            ],
            index: 0
        });

        $("#searchVal").kendoTextBox();

    },

    mainGrid : function(url, params) {
        $("#mainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 508,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount : 5
            },
            toolbar : [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="recruitListTl.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="">' +
                            '	<span class="k-button-text">채용통계 조회</span>' +
                            '</button>';
                    }
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            detailTemplate : kendo.template($("#template").html()),
            detailInit: recruitListTl.detailInit,
            columns: [
                {
                    template: "#= --record #",
                    title: "순번",
                    width : 50
                }, {
                    field: "RECRUIT_NUM",
                    title: "공고번호",
                    width : 100
                }, {
                    field: "RECRUIT_TITLE",
                    title: "공고명",
                    template : function (e){
                        return '<a href="javascript:void(0);" onclick="recruitListTl.recruitAdminPop(\''+e.RECRUIT_INFO_SN+'\');">'+e.RECRUIT_TITLE+'</a>';
                    }
                }, {
                    title: "모집기간",
                    template: function(row) {
                        return row.START_DT+" ~ "+row.END_DT;
                    },
                    width: 240
                }, {
                    field: "careerType",
                    title: "경력",
                    width : 120
                }, {
                    field : "RECRUITMENT",
                    title: "채용인원",
                    width : 70
                }, {
                    field : "APPLICATION_CNT",
                    title: "접수인원",
                    width : 70
                }, {
                    field: "",
                    title: "서류심사",
                    template: function(e) {
                        if(e.RECRUIT_STATUS_SN == "3"){
                            return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="recruitListTl.getDocEvalPop(' + e.RECRUIT_INFO_SN + ')">' +
                                '	<span class="k-button-text">서류심사</span>' +
                                '</button>';
                        }else if(e.RECRUIT_STATUS_SN > 3){
                            return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="recruitListTl.screenViewPop(' + e.RECRUIT_INFO_SN + ', \'doc\')">' +
                                '	<span class="k-button-text">심사결과</span>' +
                                '</button>';
                        }else{
                            return "";
                        }
                    },
                    width : 90
                }/*, {
                    field: "",
                    title: "면접설정",
                    template: function(e) {
                        if(e.RECRUIT_STATUS_SN == "4"){
                            return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="recruitListTl.inTimeSetPop(' + e.RECRUIT_INFO_SN + ')">' +
                                '	<span class="k-button-text">면접설정</span>' +
                                '</button>';
                        }else{
                            return "";
                        }
                    },
                    width : 90
                }*/, {
                    field: "",
                    title: "면접심사",
                    template: function(e) {
                        if(e.RECRUIT_STATUS_SN == "4"){
                            return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="recruitListTl.getInEvalPop(' + e.RECRUIT_INFO_SN + ')">' +
                                '	<span class="k-button-text">면접심사</span>' +
                                '</button>';
                        }else if(e.RECRUIT_STATUS_SN > 4){
                            return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="recruitListTl.screenViewPop(' + e.RECRUIT_INFO_SN + ', \'in\')">' +
                                '	<span class="k-button-text">심사결과</span>' +
                                '</button>';
                        }else{
                            return "";
                        }
                    },
                    width : 90
                }, {
                    field: "RECRUIT_STATUS_SN",
                    title: "상태",
                    width : 90,
                    template : function(e){
                        if(e.RECRUIT_STATUS_SN == "1"){
                            return "작성중";
                        }else if(e.RECRUIT_STATUS_SN == "2"){
                            return "접수중";
                        }else if(e.RECRUIT_STATUS_SN == "3"){
                            return "서류심사중";
                        }else if(e.RECRUIT_STATUS_SN == "4"){
                            return "면접심사중";
                        }else if(e.RECRUIT_STATUS_SN == "5"){
                            return "면접심사완료";
                        }else if(e.RECRUIT_STATUS_SN == "E"){
                            if(e.IN_SCREEN_CNT > 0){
                                return "채용완료";
                            }else{
                                return "미채용완료";
                            }
                        }
                    }
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },

    gridReload : function(){
        console.log('채용관리(팀장) gridReload 함수 호출됨');

        var recruitYear = $("#recruitYear").val();

// 입력에서 날짜를 구문 분석하고 "yyyy-MM-dd" 형식으로 포맷합니다.
        if (recruitYear) {
            var dateObj = new Date(recruitYear);
            recruitYear = dateObj.toISOString().substr(0, 10);
        }

        recruitListTl.global.searchAjaxData = {
            recruitYear: $('#recruitYear').val(),
            searchType: $('#searchType').val(),
            searchVal: $('#searchVal').val(),
            deptSeq : $("#deptSeq").val(),
            empSeq : $("#empSeq").val(),
            page : "tl"
        };
        var recruitYear = recruitListTl.global.searchAjaxData.recruitYear;
        var searchType = recruitListTl.global.searchAjaxData.searchType;
        var searchVal = recruitListTl.global.searchAjaxData.searchVal;

        console.log('recruitYear: ' + recruitYear);
        console.log('searchType: ' + searchType);
        console.log('searchVal: ' + searchVal);

        recruitListTl.mainGrid("inside/getRecruitList", recruitListTl.global.searchAjaxData)
    },

    detailInit : function(e){
        var detailRow = e.detailRow;

        var dataSource = new kendo.data.DataSource({
            serverPaging: false,
            serverSorting: false,
            serverFiltering: false,
            pageSize: 10,
            filter: { field: "RECRUIT_INFO_SN", operator: "eq", value: e.data.RECRUIT_INFO_SN },
            schema : {
                data: function (data) {
                    return e.data.recruitAreaList;
                },
                total: function (data) {
                    return de.data.recruitAreaList.length;
                },
            }
        });

        detailRow.find(".subGrid").kendoGrid({
            dataSource: e.data.recruitAreaList,
            scrollable: false,
            sortable: true,
            pageable: false,
            columns: [
                {
                    field: "JOB",
                    title: "모집분야",
                }, {
                    field: "DUTY",
                    title: "경력",
                }, {
                    field: "RECRUITMENT",
                    title: "채용인원",
                }, {
                    field: "APPLICATION_CNT",
                    title: "접수인원",
                }, {
                    field: "DOC_SCREEN_CNT",
                    title: "서류심사",
                }, {
                    field: "IN_SCREEN_CNT",
                    title: "면접심사",
                }
            ]
        });
    },

    recruitDetailPop : function (e) {
        var url = "/inside/pop/recruitDetailPop.do?recruitInfoSn="+e;
        var name = "recruitDetailPop";
        var option = "width=1000, height=720, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    },

    screenViewPop : function(sn, e){
        var url = "/inside/pop/screenViewPop.do?recruitInfoSn=" + sn + "&type=" + e+"&stat=view";
        var name = "screenViewPop";
        var option = "width=1000, height=300, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    },

    getDocEvalPop : function(r){
        recruitListTl.global.searchAjaxData = {
            recruitInfoSn : r,
            evalEmpSeq : $("#empSeq").val(),
            group : "Y",
            evalType : "doc"
        }

        var chk = customKendo.fn_customAjax("/evaluation/evalChk.do", recruitListTl.global.searchAjaxData);
        if(chk.flag){
            if(chk.eval == null){
                alert("서류심사 대상 평가위원이 아닙니다.");
                return;
            }else if(chk.eval.EVAL_STATUS == "E"){
                alert("심사가 종료된 평가위원입니다.");
                return;
            }else{
                var url = "/evaluation/evalDocScreen.do?recruitInfoSn=" + r+"&stat=view";
                var name = "evalLogin";
                var option = "width=1100, height=680, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
                var popup = window.open(url, name, option);
            }
        }
    },

    // inTimeSetPop : function(e){
    //     recruitListTl.global.searchAjaxData = {
    //         recruitInfoSn : e,
    //         evalEmpSeq : $("#empSeq").val(),
    //         group : "Y",
    //         evalType : "in"
    //     }
    //
    //     var chk = customKendo.fn_customAjax("/evaluation/evalChk.do", recruitListTl.global.searchAjaxData);
    //     if(chk.flag){
    //         if(chk.eval == null){
    //             alert("면접 대상 평가위원이 아닙니다.");
    //             return;
    //         }else{
    //             var url = "/inside/pop/inTimeSetPop.do?recruitInfoSn=" + e;
    //             var name = "inTimeSetPop";
    //             var option = "width=1250, height=690, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
    //             var popup = window.open(url, name, option);
    //         }
    //     }
    // },

    getInEvalPop : function(r){
        recruitListTl.global.searchAjaxData = {
            recruitInfoSn : r,
            evalEmpSeq : $("#empSeq").val(),
            group : "Y",
            evalType : "in"
        }

        var chk = customKendo.fn_customAjax("/evaluation/evalChk.do", recruitListTl.global.searchAjaxData);
        if(chk.flag){
            if(chk.eval == null){
                alert("면접 대상 평가위원이 아닙니다.");
                return;
            }else if(chk.eval.EVAL_STATUS == "E"){
                alert("심사가 종료된 평가위원입니다.");
                return;
            }else{
                var url = "/evaluation/evalInApplicationList.do?recruitInfoSn=" + r + "&type=in"+"&stat=view";
                var name = "evalInApplicationList";
                var option = "width=1100, height=680, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
                var popup = window.open(url, name, option);
            }
        }
    },

    recruitAdminPop : function(e) {
        var url = "/inside/pop/recruitAdminPop.do?recruitInfoSn=" + e +"&stat=view";
        var name = "recruitAdminPop";
        var option = "width=1750, height=750, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    },
}
