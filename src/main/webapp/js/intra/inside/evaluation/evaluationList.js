var evaluationList = {


    fn_defaultScript : function (){

        evaluationList.mainGrid();
    },

    mainGrid: function(){
        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/evaluation/getEvaluationList',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {
                    data.empSeq = $("#empSeq").val();
                    data.deptSeq = $("#deptSeq").val();
                    data.deptName = $("#deptName").val();
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
                pageSizes : [ 10, 20, 50, "ALL" ],
                buttonCount : 5
            },
            toolbar : [
                {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="evaluationList.fn_popEvaluationSet()">' +
                            '	<span class="k-button-text">등록</span>' +
                            '</button>';
                    }
                }, {
                    name : 'button',
                    template : function (e){
                        return '<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="evaluationList.mainGrid()">' +
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
                    field: "ROW_NUM",
                    title: "순번",
                    width: 50
                }, {
                    field: "",
                    title: "학습주제"
                }, {
                    field: "",
                    title: "지도자",
                    width: 80
                }
            ]
        }).data("kendoGrid");
    },

    fn_popEvaluationSet : function (){
        var url = "/evaluation/pop/evaluationSet.do";

        var name = "_blank";
        var option = "width = 1500, height = 820, top = 100, left = 400, location = no";
        var popup = window.open(url, name, option);
    }
}