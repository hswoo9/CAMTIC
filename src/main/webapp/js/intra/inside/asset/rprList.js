var now = new Date();

var rprList = {

    init : function(){
        rprList.dataSet();
        rprList.mainGrid();
    },

    dataSet() {
        $("#start_date").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date(now.setMonth(now.getMonth() - 1))
        });

        $("#end_date").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date()
        });

        $("#drop1").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "등록일자", value: "" },
                { text: "출원일자", value: "1" },
                { text: "존속만료일", value: "2" }
            ],
            index: 0
        });

        $("#drop2").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                { text: "특허", value: "1" },
                { text: "실용신안", value: "2" },
                { text: "상표권", value: "3" },
                { text: "논문", value: "4" },
                { text: "도서", value: "5" },
                { text: "디자인권", value: "6" },
                { text: "저작권", value: "7" }
            ],
            index: 0
        });

        $("#drop3").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                { text: "등록", value: "1" },
                { text: "출원", value: "2" },
                { text: "거절", value: "3" },
                { text: "소멸", value: "4" }
            ],
            index: 0
        });

        $("#drop4").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                { text: "유지", value: "1" },
                { text: "소멸예정", value: "2" },
                { text: "소멸", value: "3" },
                { text: "유지여부 확인요망", value: "4" }
            ],
            index: 0
        });

        $("#drop5").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                { text: "단독", value: "1" },
                { text: "공동", value: "2" }
            ],
            index: 0
        });

        $("#drop6").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                { text: "해당없음", value: "1" },
                { text: "이전완료", value: "2" },
                { text: "이전가능", value: "3" }
            ],
            index: 0
        });

        $("#searchType").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "명칭", value: "" },
                { text: "발명자", value: "1" },
                { text: "출원번호", value: "2" },
                { text: "등록번호", value: "3" }
            ],
            index: 0
        });

        $("#searchVal").kendoTextBox();

    },

    mainGrid : function() {
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
            selectable: "row",
            height: 489,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 30, 50, 100 ],
                buttonCount : 5
            },
            toolbar : [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="rprList.rprChangePopup();">' +
                            '	<span class="k-button-text">일괄 변경</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="">' +
                            '	<span class="k-button-text">수정</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="rprList.jobInvenReportPopup();">' +
                            '	<span class="k-button-text">등록</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="">' +
                            '	<span class="k-button-text">삭제</span>' +
                            '</button>';
                    }
                }, {
                    name: 'excel',
                    text: '엑셀다운로드'
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll"/>',
                    template : "<input type='checkbox' id='' name='' value=''/>",
                    width: 50
                }, {
                    field: "",
                    title: "순번"
                }, {
                    field: "",
                    title: "출원일자"
                }, {
                    field: "",
                    title: "등록일자"
                }, {
                    field: "",
                    title: "구분"
                }, {
                    field: "",
                    title: "상태"
                }, {
                    field: "",
                    title: "기술이전"
                }, {
                    field: "",
                    title: "유지여부"
                }, {
                    field: "",
                    title: "존속만료일"
                }, {
                    field: "",
                    title: "지식재산권 명칭",
                    width: "10%"
                }, {
                    field: "",
                    title: "발명자"
                }, {
                    field: "",
                    title: "출원번호"
                }, {
                    field: "",
                    title: "등록번호"
                }, {
                    field: "",
                    title: "신고서"
                }, {
                    field: "",
                    title: "출원증"
                }, {
                    field: "",
                    title: "등록증"
                }
            ]
        }).data("kendoGrid");
    },

    rprChangePopup : function() {
        var url = "/Inside/Pop/rprChangePop.do";
        var name = "rprChangePop";
        var option = "width = 600, height = 300, top = 100, left = 200, location = no, _blank"
        var popup = window.open(url, name, option);
    },

    jobInvenReportPopup : function() {
        var url = "/Inside/Pop/jobInvenReportPop.do";
        var name = "jobInvenReportPop";
        var option = "width = 700, height = 500, top = 100, left = 200, location = no, _blank"
        var popup = window.open(url, name, option);
    }
}
