var now = new Date();

var commissionerManage = {

    init : function(){
        commissionerManage.dataSet();
        commissionerManage.mainGrid();
    },

    dataSet() {
        $("#expertise").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "전체", value: "" }
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="">' +
                            '	<span class="k-button-text">삭제</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="">' +
                            '	<span class="k-button-text">등록</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="">' +
                            '	<span class="k-button-text">등록양식 다운로드</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="">' +
                            '	<span class="k-button-text">등록양식 업로드</span>' +
                            '</button>';
                    }
                }, {
                    name: 'excel',
                    text: '전체위원 다운로드'
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

    recruitReqPop : function() {
        var url = "/Inside/recruitReqPop.do";
        var name = "recruitReqPop";
        var option = "width=1800, height=900, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    },

    recruitAdminPop : function() {
        var url = "/Inside/recruitAdminPop.do";
        var name = "recruitAdminPop";
        var option = "width=1800, height=900, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no"
        var popup = window.open(url, name, option);
    }
}
