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
            height: 508,
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
                    field: "ROW_NUM",
                    title: "순번",
                    width: 50
                }, {
                    field: "OPEN_STUDY_NAME",
                    title: "모임명"
                }, {
                    title: "일시",
                    width: 300,
                    template: function(row){
                        return row.OPEN_STUDY_DT + " " + row.START_TIME + " ~ " + row.END_TIME
                    }
                }, {
                    field: "REG_EMP_NAME",
                    title: "주관직원",
                    width: 80
                }, {
                    field: "",
                    title: "진행현황",
                    width: 100,
                    template: function(row){
                        if(row.STEP == "A"){
                            return "작성중";
                        }else if(row.STEP == "B"){
                            return "참여자 모집";
                        }else if(row.STEP == "C"){
                            return "모임확정";
                        }else if(row.STEP == "D"){
                            return "모임완료";
                        }else if(row.STEP == "N"){
                            return "모임취소";
                        }else{
                            return "데이터오류";
                        }
                    }
                }
            ]
        }).data("kendoGrid");
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
        const option = "width = 990, height = 548, top = 100, left = 400, location = no";
        window.open(url, name, option);
    }
}
