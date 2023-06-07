/**
 * 2023.06.03
 * 작성자 : 김지혜
 * 내용 : 문서관리 - 계약대장
 */

var docuList = {
    fn_defaultScript: function () {

        $("#division").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "전체", value: "" },
                {text: "제작", value: "제작"},
                {text: "가공", value: "가공"},
                {text: "구매", value: "구매"},
                {text: "공사", value: "공사"},
                {text: "전담인력", value: "전담인력"},
                {text: "시간제", value: "시간제"},
                {text: "위촉연구원", value: "위촉연구원"},
                {text: "현장연수생", value: "현장연수생"},
                {text: "입주", value: "입주"},
                {text: "장비사용", value: "장비사용"},
                {text: "기타", value: "기타"}
            ],
            index: 0
        });

        $("#title").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "검색구분", value: "" },
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
                        title: "계약 일시",
                        width: "10%"
                    }, {
                        field: "",
                        title: "계약건명",
                        width: "25%"
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
                        title: "계약 업체(자)",
                        width: "15%"
                    }, {
                        field: "",
                        title: "비고",
                        width: "5%"
                    }]
            }).data("kendoGrid");
        },

    docuPopup : function(){
        var url = "/Inside/Pop/docuPop.do";
        var name = "popup test";
        var option = "width = 1000, height = 500, top = 100, left = 200, location = no"
        var popup = window.open(url, name, option);
    }
}
