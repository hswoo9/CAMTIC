var now = new Date();

var subHolidayAdmin = {
    global : {
        now : new Date(),
        empSeq : $("#empSeq").val(),
        mcCode : "V",
        mdCode : "",
        params  : "",
        data : "",
        searchAjaxData : "",
        saveAjaxData : "",
        hwpCtrl : "",
    },

    init : function(params){
        subHolidayAdmin.dataSet();

        customKendo.fn_datePicker("startDate", '', "yyyy-MM-dd", new Date(subHolidayAdmin.global.now.setMonth(subHolidayAdmin.global.now.getMonth() - 1)));
        customKendo.fn_datePicker("endDate", '', "yyyy-MM-dd", new Date(subHolidayAdmin.global.now.setMonth(subHolidayAdmin.global.now.getMonth() + 2)));

        var data = {
            mcCode : subHolidayAdmin.global.mcCode,
            mdCode : subHolidayAdmin.global.mdCode,
            empSeq : subHolidayAdmin.global.empSeq
        }

        subHolidayAdmin.global.vacGubun = customKendo.fn_customAjax("/subHoliday/getVacCodeList", data);
        var ds = subHolidayAdmin.global.vacGubun;
        ds.list.unshift({"SUBHOLIDAY_DT_CODE_NM" : "선택", "SUBHOLIDAY_CODE_ID" : ""});
        $("#edtHolidayKindTop").kendoDropDownList({
            dataSource : ds.list,
            dataTextField: "SUBHOLIDAY_DT_CODE_NM",
            dataValueField: "SUBHOLIDAY_CODE_ID",
        });

        subHolidayAdmin.gridReload();
    },

    dataSet : function() {
        $("#status").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                { text: "작성중", value: "W" },
                { text: "결재중", value: "A" },
                { text: "반려", value: "R" },
                { text: "결재완료", value: "Y" }
            ],
            index: 0
        });

        $("#searchType").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: ""},
                { text: "이름", value: "1" },
                { text: "부서명", value: "2" },
                { text: "팀명", value: "3" },
                { text: "직위", value: "4" }
            ],
            index: 0
        });

        $("#searchVal").kendoTextBox();
    },

    mainGrid : function(url, params){
        $("#mainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
            height: 538,
            sortable: true,
            scrollable: true,
            noRecords: {
                template: "<div style='margin: auto;'>데이터가 존재하지 않습니다.</div>"
            },
            pageable: {
                refresh: true,
                pageSize : 10,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount: 5,
                messages: {
                    display: "{0} - {1} of {2}",
                    itemsPerPage: "",
                    empty: "데이터가 없습니다.",
                }
            },
            toolbar : [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="subHolidayAdmin.gridReload();">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="subHolidayAdmin.fn_delYn();">' +
                            '	<span class="k-button-text">삭제</span>' +
                            '</button>';
                    }
                },
            ],
            dataBound: function(e){
                var grid = this;
                grid.tbody.find("tr").each(function(){
                    var delYn = $(this).find("input[name='delYn']").val();

                    if(delYn == "Y"){
                        $(this).css('text-decoration', 'line-through');
                        $(this).css('color', 'red');
                    }
                });

            },
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll"/>',
                    template : function(e){
                        if(e.APPROVE_STAT_CODE == '100' || e.APPROVE_STAT_CODE == '101') {
                            if(e.DEL_YN == 'N'){
                                return '<input type="checkbox" id="check" name="check" value="' + e.SUBHOLIDAY_USE_ID + '"/>';
                            } else {
                                return '';
                            }
                        } else {
                            return '';
                        }
                    },
                    width: 50
                }, {
                    title: "순번",
                    template: "#= --record #",
                    width: 50
                },{
                    field: "EMP_NAME_KR",
                    title: "이름",
                    width: 150,
                },{
                    field: "SUBHOLIDAY_DT_CODE_NM",
                    title: "휴가구분",
                    width: 150,
                }, {
                    title: "기간",
                    columns : [
                        {
                            field: "SUBHOLIDAY_ST_DT",
                            title: "부터",
                            width: 190,
                            template: function(dataItem) {
                                if (dataItem.SUBHOLIDAY_DT_CODE_NM === "휴일근로") {
                                    return dataItem.SUBHOLIDAY_WORK_DAY;
                                }
                                else {
                                    return dataItem.SUBHOLIDAY_ST_DT;
                                }
                            }
                        }, {
                            field: "SUBHOLIDAY_EN_DT",
                            title: "까지",
                            width: 190,
                            template: function(dataItem) {
                                if (dataItem.SUBHOLIDAY_DT_CODE_NM === "휴일근로") {
                                    return dataItem.SUBHOLIDAY_WORK_DAY;
                                }
                                else {
                                    return dataItem.SUBHOLIDAY_EN_DT;
                                }
                            }
                        }, {
                            field: "SUBHOLIDAY_USE_DAY",
                            title: "일수",
                            width: 100,
                        }
                    ]
                }, {
                    field: "RMK",
                    title: "내용",
                    align:"center",
                    template : function(e){
                        if(e.BF_YN != "Y"){
                            return '' +
                                '<div style="text-align: center">' +
                                '   <a style="cursor: pointer;" onclick="subHolidayAdmin.fn_regPop(\'' + e.APPROVE_STAT_CODE + '\', \'' + e.SUBHOLIDAY_USE_ID + '\', \'' + e.APPR_STAT + '\', \'' + e.DOC_ID + '\', \'' + e.APPRO_KEY + '\', \'' + e.DOC_MENU_CD + '\');"><b>' + e.RMK + '</b></a>' +
                                '   <input type="hidden" name="delYn" value="' + e.DEL_YN + '">' +
                                '</div>';
                        }else{
                            return e.RMK;
                        }
                    }
                }, {
                    field: "REG_DT",
                    title: "신청일자",
                    align:"center",
                    width: 100,
                }, {
                    field : "APPROVE_STAT_CODE",
                    title : "결재상태",
                    template : function(e){
                        if(e.BF_YN != "Y"){
                            if(e.APPROVE_STAT_CODE == '0' || e.APPROVE_STAT_CODE == '40' || e.APPROVE_STAT_CODE == '60'){
                                return '작성중';
                            } else if(e.APPROVE_STAT_CODE == '10' || e.APPROVE_STAT_CODE == '20' || e.APPROVE_STAT_CODE == '50') {
                                return '결재중';
                            } else if(e.APPROVE_STAT_CODE == '30') {
                                return '반려';
                            } else if(e.APPROVE_STAT_CODE == '100' || e.APPROVE_STAT_CODE == '101') {
                                return '결재완료';
                            } else {
                                return '-';
                            }
                        }else{
                            return '결재완료(이관)';
                        }
                    },
                    width: 100,
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            },
        }).data("kendoGrid");


        $("#checkAll").click(function(){
            if($(this).is(":checked")){
                $("input[name='check']").prop("checked", true);
            }else{
                $("input[name='check']").prop("checked", false);
            }
        });
    },

    fn_regPop: function(APPROVE_STAT_CODE, SUBHOLIDAY_USE_ID, APPR_STAT, DOC_ID, APPRO_KEY, DOC_MENU_CD){
        if(APPROVE_STAT_CODE == '0' || APPROVE_STAT_CODE == '40' || APPROVE_STAT_CODE == '60'){
            var url = "/subHoliday/pop/subHolidayReqPop.do?subholidayUseId=" + SUBHOLIDAY_USE_ID + "&apprStat=" + APPR_STAT + "&mode=mng";
            var name = "subHolidayReqPop";
            var option = "width=1030, height=850, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
            var popup = window.open(url, name, option);
        }else{
            approveDocView(DOC_ID, APPRO_KEY, DOC_MENU_CD);
        }
    },

    gridReload : function(){
        var params = {
            mcCode : subHolidayAdmin.global.mcCode,
            mdCode : subHolidayAdmin.global.mdCode,
            empSeq : subHolidayAdmin.global.empSeq
        }

        params.startDate = $("#startDate").val();
        params.endDate = $("#endDate").val();
        params.status = $("#status").val();
        params.edtHolidayKindTop = $("#edtHolidayKindTop").val();
        params.searchType = $("#searchType").val();
        params.searchVal = $("#searchVal").val();

        subHolidayAdmin.mainGrid("/subHoliday/getVacUseHistoryListAdmin", params);
    },

    fn_delYn : function (){
        var keyArr = [];
        $("input[name='check']").each(function(){
            if($(this).is(":checked")){
                keyArr.push($(this).val());
            }
        });


        if(keyArr.length == 0){
            alert("선택해주세요.");
            return;
        }

        if(!confirm("삭제하시겠습니까?")){
            return;
        }

        $.ajax({
            url : "/subHoliday/delYn",
            type : "POST",
            data : {
                keyArr : JSON.stringify(keyArr)
            },
            success : function(data){
                alert("삭제되었습니다.");
                subHolidayAdmin.gridReload();
            }
        })
    }
}