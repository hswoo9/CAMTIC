/**
 * 2023.06.04
 * 작성자 : 김지혜
 * 내용 : 근태관리 - 개인연차현황
 */

var personAnnvMain = {
    mainGrid: function () {
        var dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data, operation) {
                    return data;
                }
            },
            schema : {
                data: function (data) {
                    return data;
                },
                total: function (data) {
                    return data.length;
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
                pageSizes : [ 10, 20, 30, 50, 100 ],
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
                                field: "",
                                title: "시작 일자",
                                width: "10%"
                            },
                            {
                                field: "",
                                title: "시작 시간",
                                width: "10%"
                            },
                            {
                                field: "",
                                title: "종료 일자",
                                width: "10%"
                            },
                            {
                                field: "",
                                title: "종료 시간",
                                width: "10%"
                            }
                        ]
                }, {
                    field: "",
                    title: "근태 항목",
                    width: "10%"
                }, {
                    field: "",
                    title: "사용 일수",
                    width: "10%"
                }, {
                    field: "",
                    title: "사용 구분",
                    width: "10%"
                }, {
                    field: "",
                    title: "신청 내역",
                    width: "10%"
                }]
        }).data("kendoGrid");
    }
}

