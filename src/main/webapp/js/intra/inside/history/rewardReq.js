var now = new Date();

var rewardReq = {

    init : function(){
        rewardReq.dataSet();
        rewardReq.mainGrid();
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

        $("#rewardType").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" },
                { text: "내부표창", value: "1" },
                { text: "외부표창", value: "2" }
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="rewardReq.rewardReqPop();">' +
                            '	<span class="k-button-text">포상 등록</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="rewardReq.rewardReqBatchPop();">' +
                            '	<span class="k-button-text">포상 일괄등록</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="rewardReq.rewardGubunPop();">' +
                            '	<span class="k-button-text">포상 구분 관리</span>' +
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
                    title: "순번"
                }, {
                    field: "",
                    title: "성명"
                }, {
                    field: "",
                    title: "내/외부"
                }, {
                    field: "",
                    title: "포상구분"
                }, {
                    field: "",
                    title: "포상일자"
                }, {
                    field: "",
                    title: "공적사항"
                }, {
                    field: "",
                    title: "시행처"
                }, {
                    field: "",
                    title: "관련파일"
                }, {
                    field: "",
                    title: "비고"
                }, {
                    field: "",
                    title: "기록인"
                }
            ]
        }).data("kendoGrid");
    },

    rewardReqPop : function() {
        var url = "/Inside/pop/rewardReqPop.do";
        var name = "rewardReqPop";
        var option = "width=1300, height=505, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    },

    rewardReqBatchPop : function() {
        var url = "/Inside/pop/rewardReqBatchPop.do";
        var name = "rewardReqBatchPop";
        var option = "width=1800, height=900, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    },

    rewardGubunPop : function() {
        var url = "/Inside/pop/rewardGubunPop.do";
        var name = "rewardGubunPop";
        var option = "width=550, height=450, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    }
}
