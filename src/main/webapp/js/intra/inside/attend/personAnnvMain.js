var personAnnvMain = {
    global: {
        now: new Date()
    },

    init: function(){
        personAnnvMain.mainGrid();
    },

    mainGrid: function () {
        var dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url: "/inside/personAnnvMainList",
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    data.empSeq = $("#regEmpSeq").val();
                    return data;
                }
            },
            schema : {
                data: function (data) {
                    return data.list;
                },
                total: function (data) {
                    $("#totalCount").text(data.list.length);
                    return data.list.length;
                },
            },
            pageSize: 10,
        });

        $("#mainGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            height: 489,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount : 5
            },
            toolbar: [
                {
                    name: 'excel',
                    text: '엑셀다운로드'
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    field: "",
                    title: "사용 기간",
                    width: "10%",
                        columns:[
                            {
                                field: "SUBHOLIDAY_ST_DT",
                                title: "시작 일자",
                                width: "10%"
                            },
                            {
                                field: "SUBHOLIDAY_ST_TIME",
                                title: "시작 시간",
                                width: "10%"
                            },
                            {
                                field: "SUBHOLIDAY_EN_DT",
                                title: "종료 일자",
                                width: "10%"
                            },
                            {
                                field: "SUBHOLIDAY_EN_TIME",
                                title: "종료 시간",
                                width: "10%"
                            }
                        ]
                }, {
                    field: "SUBHOLIDAY_DT_CODE_NM",
                    title: "근태 항목",
                    width: "10%"
                }, {
                    field: "SUBHOLIDAY_USE_DAY",
                    title: "사용 일수",
                    width: "10%"
                }, /*{
                    field: "SUBHOLIDAY_DT_CODE_NM",
                    title: "사용 구분",
                    width: "10%"
                },*/ {
                    field: "RMK",
                    title: "신청 내역",
                    width: "10%"
                }]
        }).data("kendoGrid");
    }
}

