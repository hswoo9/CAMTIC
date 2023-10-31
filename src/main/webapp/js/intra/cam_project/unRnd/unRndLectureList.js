var unRndLectList = {


    fn_defaultScript : function (){

        unRndLectList.mainGrid();

    },

    gridReload: function(){
        $("#lectureMainGrid").data("kendoGrid").dataSource.read();
    },

    mainGrid: function (){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/projectUnRnd/getLectureList',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {

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

        $("#lectureMainGrid").kendoGrid({
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
                    title: "연번",
                    template: "#= --record #",
                    width: "3%"
                }, {
                    field: "",
                    title: "분야",
                    width: "5%"
                }, {
                    field: "",
                    title: "과목",
                    width: "7%"
                }, {

                    field: "",
                    title: "단위사업명",
                    width: "7%"
                }, {
                    field: "",
                    title: "교육기간",
                    width: "7%"
                }, {
                    field: "",
                    title: "정원",
                    width: "5%"
                }, {
                    field: "",
                    title: "신청",
                    width: "5%"
                }, {
                    field: "",
                    title: "대기",
                    width: "5%"
                }, {
                    field: "",
                    title: "접수",
                    width: "5%"
                }, {
                    field: "",
                    title: "취소",
                    width: "5%"
                }, {
                    field: "",
                    title: "수료",
                    width: "5%"
                }, {
                    field: "",
                    title: "현재상태",
                    width: "5%"
                }
            ],
            dataBinding: function(){
                record = fn_getRowNum(this, 2);
            }
        }).data("kendoGrid");

    },
}