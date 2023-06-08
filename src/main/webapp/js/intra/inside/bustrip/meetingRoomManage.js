/**
 * 2023.06.05
 * 작성자 : 김지혜
 * 내용 : 차량/회의실관리 - 회의실 관리
 */
var now = new Date();
var meetingRoomManage = {
    fn_defaultScript: function () {
        $("#registrant_date").kendoDatePicker({
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

        $("#space").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "전체", value: ""},
                {text: "회의실 명", value: "회의실 명"},
                {text: "장소", value: "장소"}
            ],
            index: 0
        });

        $("#titleContent").kendoTextBox();

        $("#useYN1").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "선택하세요", value: ""},
                {text: "사용", value: "사용"},
                {text: "미사용", value: "미사용"}
            ],
            index: 0
        });

        $("#meetingRoomName").kendoTextBox();
        $("#space1").kendoTextBox();
        $("#Num").kendoTextBox();

        $("#coronationYN").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "해당없음", value: ""},
                {text: "가능", value: "가능"},
                {text: "불가능", value: "불가능"}
            ],
            index: 0
        });

        $("#rentalFee").kendoTextBox();
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
                        title: "회의실 명",
                        width: "15%"
                    }, {
                        field: "",
                        title: "장소",
                        width: "15%"
                    }, {
                        field: "",
                        title: "수용 인원",
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

    meetingRoomManagePopup : function(){
        var url = "/Inside/Pop/meetingRoomManagePop.do";
        var name = "popup test";
        var option = "width = 500, height = 400, top = 100, left = 200, location = no"
        var popup = window.open(url, name, option);
    }
}
