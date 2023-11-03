var personList = {
    fn_defaultScript: function(){
        this.fn_pageSet();
        this.fn_mainGrid();
    },

    fn_pageSet: function(){

    },

    fn_mainGrid: function(){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : "/projectUnRnd/getPersonList",
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data){
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

        $("#personGrid").kendoGrid({
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
            toolbar: [
                {
                    name: 'button',
                    template: function (e) {
                        return '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="unRndLectList.gridReload()">' +
                            '	<span class="k-button-text">조회</span>' +
                            '</button>';
                    }
                }

            ],
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    title: "번호",
                    template: "#= --record #",
                    width: "3%"
                }, {
                    field: "NAME",
                    title: "이름",
                    width: "10%"
                }, {
                    field: "TEL_NUM",
                    title: "전화번호",
                    width: "10%"
                }, {
                    field: "TEL_NUM",
                    title: "핸드폰",
                    width: "10%"
                }, {
                    field: "BELONG",
                    title: "소속",
                    width: "10%"
                }, {
                    field: "PART",
                    title: "부서",
                    width: "10%"
                }, {
                    field: "PLACE",
                    title: "직위",
                    width: "10%"
                }, {
                    title: "처리명령",
                    width: "3%",
                    template: function(e){
                        return "-";
                    }
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");
    },

    gridReload: function(){
        $("#personGrid").data("kendoGrid").dataSource.read();
    }
}