/**
 * 2023.06.06
 * 작성자 : 김지혜
 * 내용 : 자산관리 > 장비관리 - 장비관리 (관리자) 팝업창
 */
var now = new Date();
var equipmentmangePop = {
    fn_defaultScript: function () {

        $("#division").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "선택하세요", value: "" },
                {text: "복합소재", value: "복합소재"},
                {text: "드론산업", value: "드론산업"},
                {text: "메이커스페이스", value: "메이커스페이스"}
            ],
            index: 0
        });

        $("#use_date").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date(now.setMonth(now.getMonth()))
        });

        $("#name").kendoTextBox();

        $("#companyDivision").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "선택하세요", value: "" },
                {text: "도내(단지)", value: "도내(단지)"},
                {text: "도내(단지 외)", value: "도내(단지 외)"},
                {text: "도외", value: "도외"}
            ],
            index: 0
        });

        $("#division1").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "선택하세요", value: "" },
                {text: "복합소재", value: "복합소재"},
                {text: "드론산업", value: "드론산업"},
                {text: "메이커스페이스", value: "메이커스페이스"}
            ],
            index: 0
        });

        $("#name1").kendoTextBox();
        $("#value").kendoTextBox();

        $("#write_date").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date(now.setMonth(now.getMonth()))
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
                    name: '',
                    text: '삭제'
                }, {
                    name: '',
                    text: '신규'
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
                    title: "구분"
                }, {
                    field: "",
                    title: "장비명"
                },{
                    field: "",
                    title: "등록자"
                }, {
                    field: "",
                    title: "등록 일자"
                }
            ]
        }).data("kendoGrid");
    }
}

