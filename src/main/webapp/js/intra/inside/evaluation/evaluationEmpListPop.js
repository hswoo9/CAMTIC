var evaluationEmpListPop = {


    fn_defaultScript : function (){
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
                    data.evalSn = $("#evalSn").val();
                    if($("#key").val() == "1"){ // 1차평가
                        if($("#duty").val() == "4" || $("#duty").val() == "5"){// 팀장 -> 팀원
                            data.bsYMD = $("#bsYear").val()+"-12-31";
                            data.teamLeader = "N";
                            data.deptHeader = "N";
                            data.deptSeq = $("#deptSeq").val();
                        }else if($("#duty").val() == "2" || $("#duty").val() == "3" || $("#duty").val() == "7"){ //부장,실장 -> 팀장
                            data.bsYMD = $("#bsYear").val()+"-12-31";
                            data.teamLeader = "Y";
                            data.deptHeader = "N";
                            data.pDeptSeq = $("#deptSeq").val();
                        }else if($("#duty").val() == "1"){  //원장 -> 실장,부장
                            data.bsYMD = $("#bsYear").val()+"-12-31";
                            data.teamLeader = "N";
                            data.deptHeader = "Y";
                            data.pDeptSeq = $("#deptSeq").val();
                            data.duty = "1";
                        }
                        else{

                        }
                    }else if($("#key").val() == "2"){ // 2차평가
                        if($("#duty").val() == "2" || $("#duty").val() == "3" || $("#duty").val() == "7"){ //부장,실장 -> 팀원
                            data.bsYMD = $("#bsYear").val()+"-12-31";
                            data.teamLeader = "N";
                            data.deptHeader = "N";
                            data.empSeq = $("#empSeq").val();
                            data.pDeptSeq = $("#deptSeq").val();

                        }else if($("#duty").val() == "1"){  // 원장 -> 팀장
                            data.bsYMD = $("#bsYear").val()+"-12-31";
                            data.teamLeader = "Y";
                            data.deptHeader = "N";
                            data.duty = "1";
                        }
                        else{

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
            height: 450,
            pageable : {
                refresh : true,
                pageSizes : [ 10, 20, 30, 50, 100 ],
                buttonCount : 5
            },
            noRecords: {
                template: "데이터가 존재하지 않습니다."
            },
            columns: [
                {
                    field: "ROW_NUM",
                    title: "순번",
                    width: 30
                }, {
                    field: "DEPT_NAME_OD",
                    title: "부서",
                    width: 100
                },{
                    field: "TEAM_NAME",
                    title: "팀",
                    width: 100
                }, {
                    field: "DUTY_POSITION_NAME",
                    title: "직위",
                    width: 100
                }, {
                    field: "EMP_NAME_KR",
                    title: "성명",
                    width: 100
                }, {
                    field: "",
                    title: "평가하기",
                    width: 100,
                    template: function (e){
                        return "<button class='k-button' style='background-color: #dcdcdc; border: none;' onclick='evaluationEmpListPop.fn_open_eval(" + e.EMP_SEQ + ")'>역량평가하기</button>";
                    }

                }, {
                    title: "제출상태",
                    width: 100,
                    template: function (e){
                        if($("#key").val() == "1"){ // 1차평가
                            if(e.EVAL_F == "Y"){
                                return "제출완료";
                            }else{
                                return "미제출";
                            }

                        }else if($("#key").val() == "2"){ // 2차평가

                            if(e.EVAL_S == "Y"){
                                return "제출완료";
                            }else{
                                return "미제출";
                            }

                        }else{
                            if(e.EVAL == "Y"){
                                return "제출완료";
                            }else{
                                return "미제출";
                            }
                        }
                    }
                }
            ]
        }).data("kendoGrid");
    },

    fn_open_eval : function (empSeq){
        var url = "/evaluation/pop/evaluationPop.do?pk="+$("#evalSn").val()+"&bsYear="+$("#bsYear").val()+"&empSeq="+empSeq+"&key="+$("#key").val();
        var name = "_blank";
        var option = "width = 1700, height = 820, top = 200, left = 600, location = no";
        var popup = window.open(url, name, option);
    }
}