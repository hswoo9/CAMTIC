var commonEdu = {

    global: {
        searchAjaxData : "",
    },

    init: function(){
        commonEdu.pageSet();
        commonEdu.gridReload();
    },

    pageSet: function(){
        customKendo.fn_datePicker("eduYear", 'decade', "yyyy", new Date());
        $("#eduYear").attr("readonly", true);
        $("#eduYear").on("change", function(){
            commonEdu.gridReload();
        });
    },

    gridReload: function(){
        commonEdu.global.searchAjaxData = {
            empSeq: $("#regEmpSeq").val(),
            eduYear: $("#eduYear").val()
        }
        commonEdu.mainGrid("/campus/getCommonEduList", commonEdu.global.searchAjaxData);
    },

    mainGrid: function(url, params){
        $("#mainGrid").kendoGrid({
            dataSource: customKendo.fn_gridDataSource2(url, params),
            sortable: true,
            scrollable: true,
            selectable: "row",
            height: 489,
            pageable: {
                refresh: true,
                pageSizes: [ 10, 20, 30, 50, 100 ],
                buttonCount: 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            toolbar: [
                {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="commonEdu.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }
            ],
            dataBound: commonEdu.onDataBound,
            columns: [
                {
                    title: "번호",
                    width: 50,
                    template: "#= --record #"
                }, {
                    field: "COMMON_CLASS_TEXT",
                    title: "구분",
                    width: 50
                }, {
                    field: "EDU_NAME",
                    title: "학습명",
                    width: 200
                }, {
                    title: "학습기간",
                    width: 150,
                    template: function(row){
                        return row.START_DT+" ~ "+row.END_DT;
                    }
                }, {
                    field: "EDU_TIME_A",
                    title: "교육시간",
                    width: 50
                }, {
                    field: "REAR_EDU_TIME",
                    title: "인정시간",
                    width: 50
                }, {
                    field: "EDU_LOCATION",
                    title: "장소",
                    width: 100
                }, {
                    title: "수료/미수료",
                    width: 50,
                    template: function(row){
                        return row.PART_COUNT+"/"+row.NO_PART_COUNT;
                    }
                }, {
                    title: "진행상태",
                    width: 50,
                    template: function(row){
                        if(row.STATUS == 0){
                            return "계획";
                        }else{
                            return "종료";
                        }
                    }
                }, {
                    title: "이수상태",
                    width: 50,
                    template: function(row){
                        if(row.PART_YN == "Y"){
                            return "수료";
                        }else{
                            return "미수료";
                        }
                    }
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },

    onDataBound: function(){
        const grid = this;
        grid.tbody.find("tr").dblclick(function(){
            const dataItem = grid.dataItem($(this));
            const pk = dataItem.COMMON_EDU_SN;
            commonEdu.commonEduReqPop("view", pk);
        });
    },

    commonEduReqPop: function(mode, pk){
        let url = "/Campus/pop/commonEduReqPop.do?mode="+mode;
        if(mode == "view"){
            url += "&pk="+pk;
        }
        const name = "commonEduReqPop";
        const option = "width = 1000, height = 489, top = 100, left = 200, location = no";
        window.open(url, name, option);
    }
}

function gridReload(){
    commonEdu.mainGrid();
}