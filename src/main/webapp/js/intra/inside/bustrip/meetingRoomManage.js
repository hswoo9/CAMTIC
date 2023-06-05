/**
 * 2023.06.05
 * 작성자 : 김지혜
 * 내용 : 차량/회의실관리 - 회의실 관리
 */

var meetingRoomManage = {
    fn_defaultScript: function () {

        $("#useYN").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "사용", value: "사용"},
                {text: "미사용", value: "미사용"}
            ],
            index: 0
        });

        $("#space").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "회의실 명", value: "회의실 명"},
                {text: "장소", value: "장소"}
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
                    }, {
                        name: '',
                        text: '수정'
                    }, {
                        name: '',
                        text: '삭제'
                    }
                ],
                noRecords: {
                    template: "데이터가 존재하지 않습니다."
                },
                columns: [
                    {
                        field: "",
                        title: "순번",
                        width: "10%",
                        template: "#= record-- #"
                    }, {
                        field: "",
                        title: "회의실 명",
                        width: "22.5%"
                    }, {
                        field: "",
                        title: "장소",
                        width: "22.5%"
                    }, {
                        field: "",
                        title: "수용 인원",
                        width: "22.5%"
                    }, {
                        field: "",
                        title: "사용 여부",
                        width: "22.5%"
                    }]
            }).data("kendoGrid");
        },

    meetingRoomManagePopup : function(){
        var url = "/Inside/Pop/meetingRoomManagePop.do";
        var name = "popup test";
        var option = "width = 1000, height = 360, top = 100, left = 200, location = no"
        var popup = window.open(url, name, option);
    }
}
