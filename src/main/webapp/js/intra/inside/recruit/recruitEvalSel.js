var res = {

    global : {
        saveAjaxData : ""
    },

    init : function(){
        res.dataSet();
        res.gridReload();
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="res.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            detailTemplate : kendo.template($("#template").html()),
            detailInit: res.detailInit,
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
                    width: 350,
                    template : function (e){
                        return '<a href="javascript:void(0);" onclick="res.recruitDetailPop(\''+e.RECRUIT_INFO_SN+'\');">'+e.RECRUIT_TITLE+'</a>';
                    }
                }, {
                    title: "모집기간",
                    template: function(row) {
                        return row.START_DT+" ~ "+row.END_DT;
                    },
                    width: 240
                }, {
                    field: "JOB_POSITION_ETC",
                    title: "모집분야",
                    width: 200
                }, {
                    field: "careerType",
                    title: "경력",
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
                    title: "설정",
                    template: function(e) {
                        if(e.RECRUIT_STATUS_SN != "1" && e.RECRUIT_STATUS_SN != "5"){
                            return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="res.getEvalSetPop(' + e.RECRUIT_INFO_SN + ',\'in\')">' +
                                '	<span class="k-button-text">심사위원 설정</span>' +
                                '</button>';
                        }else{
                            return '';
                        }
                    },
                    width : 150
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

        $("#checkAll").click(function(){
            if($(this).is(":checked")) $("input[name=recChk]").prop("checked", true);
            else $("input[name=recChk]").prop("checked", false);
        });
    },

    gridReload : function(){
        console.log('서류/면접직원(위원) gridReload 함수 호출됨');

        var recruitYear = $("#recruitYear").val();

// 입력에서 날짜를 구문 분석하고 "yyyy-MM-dd" 형식으로 포맷합니다.
        if (recruitYear) {
            var dateObj = new Date(recruitYear);
            recruitYear = dateObj.toISOString().substr(0, 10);
        }
        res.global.searchAjaxData = {
            recruitYear: $('#recruitYear').val(),
            searchType: $("#searchType").val(),
            searchVal: $("#searchVal").val()
        };

        var recruitYear = res.global.searchAjaxData.recruitYear;
        var searchType = res.global.searchAjaxData.searchType;
        var searchVal = res.global.searchAjaxData.searchVal;

        console.log('recruitYear: ' + recruitYear);
        console.log('SearchType: ' + searchType);
        console.log('Search Val: ' + searchVal);

        res.mainGrid("inside/getRecruitList", res.global.searchAjaxData);
    },

    recruitReqPop : function() {
        var url = "/Inside/pop/recruitReqPop.do";
        var name = "recruitReqPop";
        var option = "width=1000, height=1200, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
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

    getEvalSetPop : function(e){
        var url = "/inside/pop/selEvalPop.do?recruitInfoSn=" + e;
        var name = "selInEvalItemPop";
        var option = "width=1000, height=870, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    },
}
