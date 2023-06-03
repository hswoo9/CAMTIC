/**
 * 2023.06.03
 * 작성자 : 김지혜
 * 내용 : 문서관리 - 접수대장
 */

var inComeList = {
    fn_defaultScript: function () {

        $("#deptComp").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "캠틱종합기술원", value: "캠틱종합기술원"},
                {text: "발전협의회", value: "R&발전협의회"}
            ],
            index: 0
        });

        $("#dept").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "전직원", value: "전직원"},
                {text: "경영지원실", value: "경영지원실"},
                {text: "R&BD사업본부", value: "R&BD사업본부"},
                {text: "기업성장지원본부", value: "기업성장지원본부"},
                {text: "사업부", value: "사업부"}
            ],
            index: 0
        });

        $("#title").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "접수번호", value: "접수번호"},
                {text: "시행일자", value: "시행일자"},
                {text: "발신기관", value: "발신기관"},
                {text: "접수일자", value: "접수일자"},
                {text: "접수자", value: "접수자"},
                {text: "비고", value: "비고"},
                {text: "참조자", value: "참조자"}
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
                        title: "접수 일자",
                        width: "10%"
                    }, {
                        field: "",
                        title: "발신 기관",
                        width: "10%"
                    }, {
                        field: "",
                        title: "시행 일자",
                        width: "10%"
                    }, {
                        field: "",
                        title: "접수 번호",
                        width: "10%"
                    }, {
                        field: "",
                        title: "제목",
                        width: "20%"
                    }, {
                        field: "",
                        title: "접수자",
                        width: "10%"
                    }, {
                        field: "",
                        title: "담당부서",
                        width: "10%"
                    }, {
                        field: "",
                        title: "비고",
                        width: "10%"
                    }, {
                        field: "",
                        title: "다운",
                        width: "5%"
                    }]
            }).data("kendoGrid");
        },

    inComePopup : function(){
        var url = "/Inside/pop/inComePop.do?";
        var name = "popup test";
        var option = "width = 1000, height = 360, top = 100, left = 200, location = no"
        var popup = window.open(url, name, option);
    }
}
