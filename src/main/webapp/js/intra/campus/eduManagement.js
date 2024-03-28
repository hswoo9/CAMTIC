var now = new Date();

var eduManagement = {

    init : function(){
        eduManagement.dataSet();
        eduManagement.mainGrid();
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
                    url : '/campus/getCommonEduMngList',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    /*data.empSeq = $("#empSeq").val();*/
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
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="eduManagement.commonEduReqPop(\'ins\');">' +
                            '	<span class="k-button-text">공통학습 추가</span>' +
                            '</button>';
                    }
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound : eduManagement.onDataBound,
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
                    width: 200,
                    template: function(e){
                        return '<div style="font-weight: bold; cursor: pointer" onclick="eduManagement.commonEduReqPop(\'upd\', '+e.COMMON_EDU_SN+');">'+e.EDU_NAME+'</div>';
                    }
                }, {
                    title: "학습기간",
                    width: 150,
                    template: function(row){
                        return row.START_DT+" ~ "+row.END_DT;
                    }
                }, {
                    field: "EDU_TIME",
                    title: "교육시간",
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
                    title: "진행현황",
                    width: 50,
                    template: function(row){
                        if(row.STATUS == 0){
                            return "계획";
                        }else{
                            return "수료";
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
            eduManagement.commonEduReqPop("upd", pk);
        });
    },

    commonEduReqPop: function(mode, pk){
        let url = "/Campus/pop/commonEduReqPop.do?mode="+mode;
        if(mode == "upd"){
            url += "&pk="+pk;
        }
        const name = "commonEduReqPop";
        const option = "width = 1000, height = 489, top = 100, left = 200, location = no";
        window.open(url, name, option);
    }
}

function gridReload(){
    eduManagement.mainGrid();
}