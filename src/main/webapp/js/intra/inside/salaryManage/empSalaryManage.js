var esm = {
    
    global : {
        rateIndex : 0,
        now : new Date(),
        saveAjaxData : "",
    },
    
    fn_defaultScript : function(){
        $("#workStatusCode").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "재직여부", value: "" },
                { text: "재직", value: "Y" },
                { text: "퇴직", value: "N" }
            ],
            index: 0
        });

        $("#searchDateType").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "입사일", value: "j" },
                { text: "퇴사일", value: "q" },
                { text: "기준급여 적용일", value: "a" }
            ],
            index: 0
        });

        customKendo.fn_datePicker("startDt", '', "yyyy-MM-dd", esm.global.now);
        customKendo.fn_datePicker("endDt", '', "yyyy-MM-dd", esm.global.now);

        $("#division").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "직원유형", value: "" },
                { text: "정규직원", value: "j" },
                { text: "계약직원", value: "q" },
                { text: "인턴사원", value: "a" }
            ],
            index: 0
        });

        $("#searchKeyWord").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "성명", value: "userName" },
                { text: "부서명", value: "deptName" },
                { text: "팀명", value: "teamName" },
                { text: "사업참여", value: "projectCnt" }
            ],
            index: 0
        });

        customKendo.fn_textBox(["searchText"]);

        esm.gridReload();
    },

    mainGrid : function(url, params){
        var record = 0;

        var mainGrid = $("#mainGrid").kendoGrid({
            height: 489,
            dataSource: customKendo.fn_gridDataSource2(url, params, 10),
            scrollable: true,
            pageable: {
                refresh: true,
                pageSize : 10,
                pageSizes: [10, 20, 50, "ALL"],
                buttonCount: 5,
                messages: {
                    display: "{0} - {1} of {2}",
                    itemsPerPage: "",
                    empty: "데이터가 없습니다.",
                }
            },
            toolbar : [
                {
                    name: 'button',
                    template: function (e) {
                        return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="esm.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }, {
                    name : 'excel',
                    text: '엑셀다운로드'
                }
            ],
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
                    field : "",
                    title : "이름",
                    width: 80,
                }, {
                    field : "",
                    title : "주민등록번호",
                    width: 150,
                }, {
                    field : "",
                    title : "입사일",
                    width: 120,
                }, {
                    field : "",
                    title : "직원유형",
                    width: 120,
                }, {
                    field : "",
                    title : "부서/팀",
                    width: 250,
                }, {
                    title : "기본급여 적용기간",
                    columns : [
                        {
                            field: "",
                            title: "시작일",
                            width: 120,
                        }, {
                            field: "",
                            title: "종료일",
                            width: 120,
                        }
                    ]
                }, {
                    title : "기본급여",
                    columns : [
                        {
                            field: "",
                            title: "기본급",
                            width: 150,
                        }, {
                            field: "",
                            title: "수당",
                            width: 150,
                        }, {
                            field: "",
                            title: "상여",
                            width: 150,
                        }
                    ]
                }, {
                    field : "",
                    title : "국민연금",
                    width: 150,
                }, {
                    field : "",
                    title : "건강보험",
                    width: 150,
                }, {
                    field : "",
                    title : "장기요양보험",
                    width: 150,
                }, {
                    field : "",
                    title : "고용보험",
                    width: 150,
                }, {
                    field : "",
                    title : "산재보험",
                    width: 150,
                }, {
                    field : "",
                    title : "사대보험<br>사업자부담분",
                    width: 150,
                }, {
                    field : "",
                    title : "퇴직금 추계액",
                    width: 150,
                }, {
                    field : "",
                    title : "기준급여",
                    width: 150,
                }]
        }).data("kendoGrid");

        $("#checkAll").click(function(){
            if($(this).is(":checked")) $("input[name=docId]").prop("checked", true);
            else $("input[name=docId]").prop("checked", false);
        });
    },

    gridReload : function() {
        esm.global.searchAjaxData = {
            workStatusCode : $("#workStatusCode").val(),
            searchDateType : $("#searchDateType").val(),
            startDt : $("#startDt").val(),
            endDt : $("#endDt").val(),
            division : $("#division").val(),
            searchKeyWord : $("#searchKeyWord").val(),
            searchText : $("#searchText").val(),
        }

        esm.mainGrid("", esm.global.searchAjaxData);
    },
}
