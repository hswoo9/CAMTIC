var now = new Date();

var studyInfo = {

    init : function(){
        studyInfo.dataSet();
        studyInfo.mainGrid();
    },

    dataSet() {
        $("#eduYear").kendoDatePicker({
            start: "decade",
            depth: "decade",
            culture : "ko-KR",
            format : "yyyy",
            value : new Date()
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
                parameterMap: function(data) {
                    data.empSeq = $("#empSeq").val();
                    data.eduYear = $("#eduYear").val();
                    return data;
                }
            },
            schema : {
                data: function (data) {
                    return data.list;
                },
                total: function (data) {
                    return data.list.length;
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="studyInfo.studyReqPop();">' +
                            '	<span class="k-button-text">학습신청</span>' +
                            '</button>';
                    }
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    field: "",
                    title: "순번",
                    width: 50
                }, {
                    field: "",
                    title: "구분",
                    width: 50
                }, {
                    field: "",
                    title: "학습명"
                }, {
                    field: "",
                    title: "학습기간",
                    width: 200
                }, {
                    field: "",
                    title: "교육시간",
                    width: 100
                }, {
                    field: "",
                    title: "장소",
                    width: 250
                }, {
                    field: "",
                    title: "진행현황",
                    width: 80
                }
            ]
        }).data("kendoGrid")
    },

     studyReqPop : function() {
        var url = "/Campus/pop/studyReqPop.do";
        var name = "studyReqPop";
        var option = "width = 1170, height = 800, top = 100, left = 200, location = no";
        var popup = window.open(url, name, option);
    }
}
