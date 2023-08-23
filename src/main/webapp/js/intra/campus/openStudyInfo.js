var openStudy = {

    init: function(){
        openStudy.dataSet();
        openStudy.mainGrid();
    },

    dataSet: function(){
        customKendo.fn_datePicker("eduYear", "decade", "yyyy", new Date());
    },

    mainGrid: function(){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/campus/getOpenStudyInfoList',
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="openStudy.openStudyReqPop(\'ins\');">' +
                            '	<span class="k-button-text">모임개설</span>' +
                            '</button>';
                    }
                }
            ],
            dataBound : openStudy.onDataBound,
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    field: "",
                    title: "순번",
                    width: 50
                }, {
                    field: "OPEN_STUDY_NAME",
                    title: "학습주제"
                }, {
                    field: "REG_EMP_NAME",
                    title: "지도자",
                    width: 80
                }, {
                    field: "",
                    title: "구성원",
                    width: 150
                }, {
                    title: "학습기간",
                    width: 300,
                    template: function(row){
                        return row.OPEN_STUDY_DT + " " + row.START_TIME + " ~ " + row.END_TIME
                    }
                }, {
                    field: "EDU_TIME",
                    title: "학습시간",
                    width: 80
                }, {
                    field: "",
                    title: "진행현황",
                    width: 100,
                    template: function(row){
                        if(row.STATUS == 0){
                            return "작성중";
                        }
                    }
                }
            ]
        }).data("kendoGrid")
    },

    onDataBound: function(){
        const grid = this;
        grid.tbody.find("tr").dblclick(function(){
            const dataItem = grid.dataItem($(this));
            const pk = dataItem.OPEN_STUDY_INFO_SN;
            openStudy.openStudyReqPop("upd", pk);
        });
    },

    openStudyReqPop : function(mode, pk) {
        let url = "/Campus/pop/openStudyReqPop.do?mode="+mode;
        if(mode == "upd" || mode == "mng"){
            url += "&pk="+pk;
        }
        const name = "openStudyReqPop";
        const option = "width = 700, height = 548, top = 100, left = 400, location = no";
        window.open(url, name, option);
    }
}
