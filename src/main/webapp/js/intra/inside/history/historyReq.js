var now = new Date();

var historyReq = {

    init : function(){
        historyReq.dataSet();
        historyReq.mainGrid();
    },

    dataSet() {
        $("#historyType").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                { text: "임용 (정규직)", value: "1" },
                { text: "임용 (계약직)", value: "2" },
                { text: "임용 (인턴 사원)", value: "3" },
                { text: "임용 (단기 직원)", value: "4" },
                { text: "임용 (위촉 직원)", value: "5" },
                { text: "임용 (경비 / 환경)", value: "6" },
                { text: "승진 (직급)", value: "7" },
                { text: "승진 (직위)", value: "8" },
                { text: "전보", value: "9" },
                { text: "겸직", value: "10" },
                { text: "직무 대리", value: "11" },
                { text: "파견", value: "12" },
                { text: "면직", value: "13" },
                { text: "강등", value: "14" },
                { text: "조직 개편", value: "15" },
                { text: "호칭 변경", value: "16" },
                { text: "기타", value: "17" }
            ],
            index: 0
        });

        $("#dept").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "부서선택", value: "" },
                { text: "미래전략기획본부", value: "1" },
                { text: "R&BD사업본부", value: "2" },
                { text: "기업성장지원본부", value: "3" },
                { text: "우주항공사업부", value: "4" },
                { text: "드론사업부", value: "5" },
                { text: "스마트제조사업부", value: "6" },
                { text: "경영지원실", value: "7" }
            ],
            index: 0
        });

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

        $("#appointmentType").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                { text: "발령전", value: "1" },
                { text: "발령후", value: "2" }
            ],
            index: 0
        });

        $("#searchType").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "성명", value: "" },
                { text: "직급", value: "1" },
                { text: "등급", value: "2" },
                { text: "직책", value: "3" },
                { text: "직무", value: "4" },
                { text: "호수", value: "5" },
                { text: "비고", value: "6" }
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="historyReq.historyReqPop();">' +
                            '	<span class="k-button-text">인사발령등록</span>' +
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
                    title: "부서"
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

    historyReqPop : function() {
        var url = "/Inside/historyReqPop.do";
        var name = "historyReqPop";
        var option = "width=1800, height=900, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    }
}
