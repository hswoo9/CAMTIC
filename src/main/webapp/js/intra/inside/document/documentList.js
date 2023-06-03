/**
 * 2023.06.03
 * 작성자 : 김지혜
 * 내용 : 문서관리 - 등록대장
 */

var documentList = {
    fn_defaultScript: function () {

        $("#deptComp").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "미래전략기획본부", value: "미래전략기획본부"},
                {text: "R&BD사업본부", value: "R&BD사업본부"},
                {text: "기업성장지원본부", value: "기업성장지원본부"},
                {text: "우주항공사업부", value: "우주항공사업부"},
                {text: "드론사업부", value: "드론사업부"},
                {text: "스마트제조사업부", value: "스마트제조사업부"},
                {text: "경영지원실", value: "경영지원실"}
            ],
            index: 0
        });

        $("#title").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "문서번호", value: "문서번호"},
                {text: "시행일자", value: "시행일자"},
                {text: "수신처", value: "수신처"},
                {text: "발송일자", value: "발송일자"},
                {text: "담당자", value: "담당자"},
                {text: "비고", value: "비고"}
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
                        title: "순번",
                        width: "5%",
                        template: "#= record-- #"
                    }, {
                        field: "",
                        title: "문서번호",
                        width: "20%"
                    }, {
                        field: "",
                        title: "시행 일자",
                        width: "15%"
                    }, {
                        field: "",
                        title: "수신처(수신 기관)",
                        width: "15%"
                    }, {
                        field: "",
                        title: "제목",
                        width: "20%"
                    }, {
                        field: "",
                        title: "발송 일자",
                        width: "10%"
                    }, {
                        field: "",
                        title: "담당자",
                        width: "10%"
                    }, {
                        field: "",
                        title: "비고",
                        width: "5%"
                    }]
            }).data("kendoGrid");
        },

    documentPopup : function(){
        var url = "/Inside/pop/documentPop.do?";
        var name = "popup test";
        var option = "width = 1000, height = 360, top = 100, left = 200, location = no"
        var popup = window.open(url, name, option);
    }
}
