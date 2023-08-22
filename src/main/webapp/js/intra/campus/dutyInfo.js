var dutyInfo = {
    init: function(){
        dutyInfo.dataSet();
        dutyInfo.mainGrid();
    },

    dataSet: function(){
    },

    mainGrid: function(){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/campus/getDutyInfoList',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    data.regEmpSeq = $("#regEmpSeq").val();
                    return data;
                }
            },
            schema : {
                data: function (data) {
                    return data.list;
                },
                total: function (data) {
                    return data.list.length;
                }
            },
            pageSize: 10,
        });

        $("#mainGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            height: 551,
            pageable: {
                refresh: true,
                pageSizes: [ 10, 20, 30, 50, 100 ],
                buttonCount: 5
            },
            toolbar: [
                {
                    name: 'button',
                    template: function(){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="dutyInfo.dutyInfoReqPop(\'ins\');">' +
                            '	<span class="k-button-text">직무기술서 등록</span>' +
                            '</button>';
                    }
                }
            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            dataBound : dutyInfo.onDataBound,
            columns: [
                {
                    title: "순번",
                    template: "#= ++record #",
                    width: 50
                }, {
                    field: "DUTY_MONTH",
                    title: "적용년도"
                }, {
                    field: "DUTY_NAME",
                    title: "직무명"
                }, {
                    field: "DUTY_NAME",
                    title: "상태",
                    width: 150,
                    template: function(row){
                        if(row.STATUS == 0){
                            return "작성중";
                        }else if(row.STATUS == 10){
                            return "승인요청중";
                        }else if(row.STATUS == 30){
                            return "반려";
                        }else if(row.STATUS == 100){
                            return "승인완료";
                        }else{
                            return "-";
                        }
                    }
                }
            ],
            dataBinding: function(){
                record = (this.dataSource.page() -1) * this.dataSource.pageSize();
            }
        }).data("kendoGrid");
    },

    onDataBound: function(){
        const grid = this;
        grid.tbody.find("tr").dblclick(function(){
            const dataItem = grid.dataItem($(this));
            const pk = dataItem.DUTY_INFO_SN;
            dutyInfo.dutyInfoReqPop("upd", pk);
        });
    },

    dutyInfoReqPop: function(mode, pk){
        let url = "/Campus/pop/dutyInfoReqPop.do?mode="+mode;
        if(mode == "upd"){
            url += "&pk="+pk;
        }
        const name = "dutyInfoReqPop";
        const option = "width = 1000, height = 800, top = 100, left = 200, location = no";
        window.open(url, name, option);
    }
}
