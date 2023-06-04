var now = new Date();

var certificateReqPop = {

    init : function(){
        certificateReqPop.dataSet();
        certificateReqPop.mainGrid();
    },

    dataSet() {
        $("#empSeq, #empName, #deptName, #dutyName").kendoTextBox({
            enable: false
        });

        $("#requestDate, #subDate").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date()
        });

        $("#certifiType").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "재직증명서", value: "1" },
                { text: "경력증명서", value: "2" }
            ],
            index: 0
        });

        $("#number").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "1", value: "1" },
                { text: "2", value: "2" },
                { text: "3", value: "3" },
                { text: "4", value: "4" },
                { text: "5", value: "5" },
                { text: "6", value: "6" },
                { text: "7", value: "7" },
                { text: "8", value: "8" },
                { text: "9", value: "9" }
            ],
            index: 0
        });

        $("#usage").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "금융기관 제출용", value: "1" },
                { text: "교육기관 제출용", value: "2" },
                { text: "관공서 제출용", value: "3" },
                { text: "타사 제출용", value: "4" },
                { text: "개인증빙용", value: "5" },
                { text: "기타사유", value: "6" }
            ],
            index: 0
        });
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="certificateReqPop.certificateReqPopPop();">' +
                            '	<span class="k-button-text">신청</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="">' +
                            '	<span class="k-button-text">취소</span>' +
                            '</button>';
                    }
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    headerTemplate: '<input type="checkbox" id="checkAll" name="checkAll" class="k-checkbox checkbox"/>',
                    template : "<input type='checkbox' id='' name='' value='' class='k-checkbox checkbox'/>",
                    width: 50
                }, {
                    field: "",
                    title: "발급 번호"
                }, {
                    field: "",
                    title: "요청일"
                }, {
                    field: "",
                    title: "발급 구분"
                }, {
                    field: "",
                    title: "부수"
                }, {
                    field: "",
                    title: "성명"
                }, {
                    field: "",
                    title: "제출예정일"
                }, {
                    field: "",
                    title: "용도"
                }, {
                    field: "",
                    title: "처리 상태"
                }, {
                    field: "",
                    title: "처리일"
                }, {
                    field: "",
                    title: "처리자"
                }
            ]
        }).data("kendoGrid");
    },

    certificateReqPopPop : function() {
        var url = "/inside/certificateReqPopPop.do";
        var name = "certificateReqPopPop";
        var option = "width=800, height=750, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    }
}
