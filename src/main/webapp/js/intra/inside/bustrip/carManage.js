/**
 * 2023.06.05
 * 작성자 : 김지혜
 * 내용 : 차량/회의실관리 - 차량관리
 */
var now = new Date();
var carManage = {
    fn_defaultScript: function () {
        $("#use_date").kendoDatePicker({
            depth: "month",
            start: "month",
            culture : "ko-KR",
            format : "yyyy-MM-dd",
            value : new Date(now.setMonth(now.getMonth()))
        });

        $("#useYN").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "전체", value: ""},
                {text: "사용", value: "사용"},
                {text: "미사용", value: "미사용"}
            ],
            index: 0
        });

        $("#dept").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "전체", value: ""},
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

        $("#carStyle").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "전체", value: ""},
                {text: "차량 종류", value: "차량 종류"},
                {text: "차량 번호", value: "차량 번호"}
            ],
            index: 0
        });

        $("#titleContent").kendoTextBox();

        $("#RuseYN").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "선택하세요", value: ""},
                {text: "사용", value: "사용"},
                {text: "미사용", value: "미사용"}
            ],
            index: 0
        });

        $("#carType").kendoTextBox();
        $("#carNum").kendoTextBox();

        $("#Rdept").kendoDropDownTree({
            placeholder: "선택하세요",
            checkboxes: true,
            checkAll: true,
            autoClose: false,
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

        $("#registrant").kendoTextBox();
        $("#significant").kendoTextBox();
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
                        title: "순번",
                        width: "10%",
                        template: "#= record-- #"
                    }, {
                        field: "",
                        title: "차량 종류",
                        width: "15%"
                    }, {
                        field: "",
                        title: "차량 번호",
                        width: "15%"
                    }, {
                        field: "",
                        title: "사용 부서",
                        width: "15%"
                    }, {
                        field: "",
                        title: "등록자",
                        width: "15%"
                    }, {
                        field: "",
                        title: "등록일자",
                        width: "15%"
                    }, {
                        field: "",
                        title: "사용 여부",
                        width: "15%"
                    }]
            }).data("kendoGrid");
        },

    carManagePopup : function(){
        var url = "/Inside/Pop/carManagePop.do";
        var name = "popup test";
        var option = "width = 500, height = 400, top = 100, left = 200, location = no"
        var popup = window.open(url, name, option);
    }
}
