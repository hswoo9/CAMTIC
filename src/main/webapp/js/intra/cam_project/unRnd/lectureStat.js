var lectureStat = {

    global : {
        searchAjaxData : ""
    },

    fn_defaultScript: function(){
        this.fn_pageSet();
        this.mainGrid();
    },

    fn_pageSet: function(){
        const now = new Date();
        customKendo.fn_datePicker("strDt", "depth", "yyyy-MM-dd", new Date(now.getFullYear() + '-01-01'));
        customKendo.fn_datePicker("endDt", "depth", "yyyy-MM-dd", new Date(now.getFullYear() + '-12-31'));

        $("#searchField").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "선택", value: "" },
                { text: "경영", value: "경영" },
                { text: "기술", value: "기술" },
                { text: "창업", value: "창업" },
                { text: "품질", value: "품질" },
                { text: "현장교육", value: "현장교육" },
                { text: "CEO", value: "CEO" }
            ],
            index: 0
        });

        $("#searchKeyword").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                { text: "업체명", value: "1" },
                { text: "직위", value: "2" },
                { text: "부서", value: "3" },
                { text: "지역", value: "4" },
                { text: "이름", value: "5" },
                { text: "강좌명", value: "6" },
                { text: "사업명", value: "7" }
            ],
            index: 0
        });
        customKendo.fn_textBox(["searchValue"]);
    },

    mainGrid : function() {
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url: "/projectUnRnd/getLectureStat",
                    dataType: "json",
                    type: "post",
                    async: false
                },
                parameterMap: function(data) {
                    data.strDt = $("#strDt").val();
                    data.endDt = $("#endDt").val();
                    data.searchField = $("#searchField").val();
                    data.searchKeyword = $("#searchKeyword").val();
                    data.searchValue = $("#searchValue").val();
                    return data;
                }
            },
            schema : {
                data: function (data) {
                    return data.list;
                },
                total: function (data) {
                    return data.list.length;
                },
            },
            pageSize: 10,
        });

        $("#lectureStatGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 508,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount : 5
            },
            excel : {
                fileName : "예산현황 목록.xlsx",
                filterable : true
            },
            excelExport: exportGrid,
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            toolbar: [
                {
                    name : "excel",
                    text: "엑셀다운로드"
                }, {
                    name: "button",
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="lectureStat.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }
            ],
            excel : {
                fileName : "교육 참여인원 목록.xlsx",
                filterable : true
            },
            excelExport: exportGrid,
            columns: [
                {
                    title: "순번",
                    template: "#= --record #",
                    width: 50
                }, {
                    field : "NAME",
                    title : "이름",
                    width: 200
                }, {
                    field: "BIRTH",
                    title: "생년월일",
                    width: 80
                }, {
                    field: "HP_NUM",
                    title: "휴대폰",
                    width: 160
                }, {
                    field: "EMAIL",
                    title: "이메일",
                    width: 200
                }, {
                    field: "CO_NAME",
                    title: "업체명",
                    width: 250
                }, {
                    field: "PART",
                    title: "부서",
                    width: 120
                }, {
                    field: "PLACE",
                    title: "직위",
                    width: 120
                }, {
                    field: "ADDRESS",
                    title: "지역",
                    width: 300
                }, {
                    field: "LEC_FIELD_NAME",
                    title: "분야",
                    width: 80
                }, {
                    field: "BS_TITLE",
                    title: "사업명",
                    width: 600
                }, {
                    field: "LEC_TITLE_BS",
                    title: "강좌명",
                    width: 600
                }, {
                    field: "LEC_STR_DE",
                    title: "시작일",
                    width: 160
                }, {
                    field: "LEC_END_DE",
                    title: "종료일",
                    width: 160
                }, {
                    field: "LEC_TIME",
                    title: "시간",
                    width: 80
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },

    gridReload : function (){
        $("#lectureStatGrid").data("kendoGrid").dataSource.read();
    }
}