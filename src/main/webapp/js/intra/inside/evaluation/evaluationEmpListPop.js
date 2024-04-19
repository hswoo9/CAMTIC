var evaluationEmpListPop = {


    fn_defaultScript : function (){
        if($("#duty").val() == "4" || $("#duty").val() == "5"){
            var evalPositionType = "teamLeader";
        }else if($("#duty").val() == "2" || $("#duty").val() == "3" || $("#duty").val() == "7"){
            var evalPositionType = "deptHeader";
        }else{
            var evalPositionType = "team";
        }

        if($("#occupation").val() == "P&M"){
            var evalType = "PM";
        }else if($("#occupation").val() == "A&C"){
            var evalType = "AC";
        }else if($("#occupation").val() == " R&D"){
            var evalType = "RD";
        }

        if($("#step").val() == "0"){  // 본인평가
            var evalResultType = "eval";
        }else if($("#step").val() == "1"){ // 1차평가
            var evalResultType = "evalF";
        }else if($("#step").val() == "2"){ // 2차평가
            var evalResultType = "evalS";
        }

        evaluationEmpListPop.mainGrid();
    },

    mainGrid: function(){


        let dataSource = new kendo.data.DataSource({
            serverPaging: false,
            transport: {
                read : {
                    url : '/evaluation/getEvaluationEmpList',
                    dataType : "json",
                    type : "post"
                },
                parameterMap: function(data) {

                    if($("#step").val() == "1"){ // 1차평가

                        if($("#duty").val() == "4" || $("#duty").val() == "5"){  // 팀장 -> 팀원
                            data.teamLeader = "N";
                            data.deptHeader = "N";
                            data.deptSeq = $("#deptSeq").val();

                        }else if($("#duty").val() == "2" || $("#duty").val() == "3" || $("#duty").val() == "7"){ //부장,실장 -> 팀장
                            data.deptHeader = "N";
                            data.empSeq = $("#empSeq").val();
                            data.parent_dept_seq = $("#pDeptSeq").val();
                            data.teamLeader = "Y";
                        }else{  //원장 -> 실장,부장
                            data.deptHeader = "Y";
                        }

                    }else if($("#step").val() == "2"){ // 2차평가

                        if($("#duty").val() == "2" || $("#duty").val() == "3" || $("#duty").val() == "7"){ //부장,실장 -> 팀원
                            data.teamLeader = "N";
                            data.deptHeader = "N";
                            data.empSeq = $("#empSeq").val();
                            data.parent_dept_seq = $("#pDeptSeq").val();

                        }else{  // 원장 -> 팀장
                            data.teamLeader = "Y";
                        }

                    }

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
            height: 200,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 30, 50, 100 ],
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
                    width: 30
                }, {
                    field: "",
                    title: "부서",
                    width: 200
                }, {
                    field: "",
                    title: "직위",
                    width: 100
                }, {
                    field: "",
                    title: "성명",
                    width: 100
                }, {
                    field: "",
                    title: "평가하기",
                    width: 100
                }, {
                    field: "",
                    title: "제출상태",
                    width: 100
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