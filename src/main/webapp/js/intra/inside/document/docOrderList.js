/**
 * 2023.06.03
 * 작성자 : 김지혜
 * 내용 : 문서관리 - 개발사업 수주대장
 */

var docOrderList = {
    fn_defaultScript: function () {

        $("#division").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "전체", value: "" },
                {text: "제작", value: "제작"},
                {text: "가공", value: "가공"},
                {text: "사업", value: "사업"},
                {text: "기타", value: "기타"}
            ],
            index: 0
        });

        $("#title").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "전체", value: "" },
                {text: "문서번호", value: "문서번호"},
                {text: "문서제목(건명)", value: "문서제목(건명)"},
                {text: "발주업체", value: "발주업체"}
            ],
            index: 0
        });

        $("#titleContent").kendoTextBox();
    },
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
                        title: "연번",
                        width: "5%",
                        template: "#= record-- #"
                    }, {
                        field: "",
                        title: "구분",
                        width: "5%"
                    }, {
                        field: "",
                        title: "계약 번호",
                        width: "10%"
                    }, {
                        field: "",
                        title: "상품화 코드",
                        width: "10%"
                    }, {
                        field: "",
                        title: "계약 일시",
                        width: "10%"
                    }, {
                        field: "",
                        title: "계약명",
                        width: "15%"
                    }, {
                        field: "",
                        title: "계약 금액",
                        width: "10%"
                    }, {
                        field: "",
                        title: "계약 기간",
                        width: "15%"
                    }, {
                        field: "",
                        title: "계약 업체",
                        width: "10%"
                    }, {
                        field: "",
                        title: "계약서",
                        width: "5%"
                    }, {
                        field: "",
                        title: "납품서",
                        width: "5%"
                    }]
            }).data("kendoGrid");
        },

    docOrderPopup : function(){
        var url = "/Inside/pop/docOrderPop.do";
        var name = "popup test";
        var option = "width = 1100, height = 680, top = 100, left = 200, location = no"
        var popup = window.open(url, name, option);
    }
}
