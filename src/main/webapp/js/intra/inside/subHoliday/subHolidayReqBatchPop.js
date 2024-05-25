var now = new Date();
var docContent = "";

var subHolidayReqBatchPop = {
    global : {
        searchAjaxData : "",
    },


    init: function () {
        subHolidayReqBatchPop.dataSet();
        subHolidayReqBatchPop.gridReload();

        $(".detailSearch").change(function(){
            subHolidayReqBatchPop.gridReload();
        })
    },

    dataSet: function () {

        $("#startDate").kendoDatePicker({
            depth: "month",
            start: "month",
            culture: "ko-KR",
            format: "yyyy-MM-dd",
            value: new Date()
        });

        $("#endDate").kendoDatePicker({
            depth: "month",
            start: "month",
            culture: "ko-KR",
            format: "yyyy-MM-dd",
            value: new Date()
        });

        fn_deptSetting(2);

        $("#searchType").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "전체", value: ""},
                {text: "직급", value: "1"},
                {text: "성명", value: "2"}

            ],
            index: 0
        });

        $("#searchVal").kendoTextBox();

    },

    mainGrid: function (url, params) {
        $("#mainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
            sortable: true,
            scrollable: true,
            height: 508,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount : 5
            },
            dataBound: function(e) {
                var gridData = this.dataSource.view(); // 현재 페이지의 데이터 가져오기
                console.log("Kendo UI Grid 데이터:", gridData);
            },
            toolbar: [
                {
                    name: 'button',
                    template: function (e) {
                        return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="subHolidayReqBatchPop.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll"  onclick="subHolidayReqBatchPop.fn_checkAll();" style="position : relative; top : 2px;"/>',
                    template: function(e) {
                        return "<div data-emp-seq='" + e.EMP_SEQ + "'><input type='checkbox' id='empSeq' name='checkUser' value='" + e.EMP_SEQ + "'/></div>";
                    },
                    width: 50
                }, {
                    field: "DEPT_NAME1",
                    title: "부서(실)",
                    template:function(e){
                        return '<input type="hidden" id="' + e.EMP_SEQ + '_dept_seq">' + e.DEPT_NAME1;
                    }
                }, {
                    field: "DEPT_TEAM_NAME",
                    title: "부서(팀)"
                }, {
                    title: "직위",
                    template: function (row) {
                        return fn_getSpot(row.DUTY_NAME, row.POSITION_NAME);
                    }
                },
                {
                    field: "EMP_NAME_KR",
                    title: "성명",
                    width: 100
                }

            ]
        }).data("kendoGrid");
    },

    gridReload : function() {
        console.log('gridReload 함수 호출됨');
        subHolidayReqBatchPop.global.searchAjaxData = {
            dept : $("#dept").val(),
            searchVal: $("#searchVal").val(),
            searchText: $("#searchText").val(),
            team : $("#team").val()
        };

        // var dept = subHolidayReqBatchPop.global.searchAjaxData.dept;
        // var team = subHolidayReqBatchPop.global.searchAjaxData.team;
        // var searchVal = subHolidayReqBatchPop.global.searchAjaxData.searchVal;
        // var searchType = subHolidayReqBatchPop.global.searchAjaxData.searchType;
        //
        // console.log('Dept: ' + dept);
        // console.log('Team:' + team);
        // console.log('searchType:' + searchType);
        // console.log('searchVal:' + searchVal);

        var arr = "";
        if($(".detailSearch:checked").length == 0){
            arr += "|999&N"
        }else{
            $(".detailSearch:checked").each(function(){
                if($(this).attr("id") == "dsA"){
                    arr += "|0&N|4&1,2"
                }else{
                    arr += "|" + $(this).attr("division") + '&' + ($(this).attr("divisionSub") == null ? "N" : $(this).attr("divisionSub"));
                }

            })
        }


        subHolidayReqBatchPop.global.searchAjaxData.arr = arr.substring(1);

        subHolidayReqBatchPop.mainGrid('/subHoliday/getUserInfoList',subHolidayReqBatchPop.global.searchAjaxData);
    },



    fn_checkAll: function(){
        if($("#checkAll").is(":checked")) {
            $("input[name='checkUser']").prop("checked", true);
        }else{
            $("input[name='checkUser']").prop("checked", false);
        }
    },
}


