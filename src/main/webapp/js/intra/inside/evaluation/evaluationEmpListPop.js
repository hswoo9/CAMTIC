var evaluationEmpListPop = {


    fn_defaultScript : function (){
        evaluationEmpListPop.mainGrid();
        evaluationEmpListPop.evalContent();
    },

    gridReload : function (){
        evaluationEmpListPop.mainGrid();
    },

    evalContent: function(){
        $.ajax({
            url: "/evaluation/getEvaluationPerOne",
            type: "post",
            data: {evalSn: $("#evalSn").val()},
            dataType: "json",
            async: false,
            success: function (result) {
                var html = "";
                html += result.data.EVAL_PER_CONTENT ;
                $('#evalContent').append(html);
            },
            error: function (e) {
                console.log(e);
            }
        });
    },

    statCk: function(list){
        let ck = true;
        for(let i=0; i<list.length; i++){
            const map = list[i];
            if(($("#key").val() == "1" && map.EVAL_F == "Y") || ($("#key").val() == "2" && map.EVAL_S == "Y")){
                ck = false;
            }
        }

        if(!ck){
            document.getElementById("btnActive2").disabled = true;
        }
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
                    data.bsYMD = $("#bsYear").val()+"-12-31";
                    data.empSeq = $("#evalEmpSeq").val();
                    data.key = $("#key").val();
                    return data;
                }
            },
            schema : {
                data: function (data) {
                    evaluationEmpListPop.statCk(data.list);
                    return data.list;
                },
                total: function (data) {
                    return data.list.length;
                },
            },
            pageSize: 50
        });

        $("#mainGrid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            scrollable: true,
            selectable: "row",
            pageable : {
                refresh : true,
                pageSizes : [ 100, "ALL" ],
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
                        return "<button class='k-button k-button-solid-base' onclick='evaluationEmpListPop.fn_open_eval(" + e.EMP_SEQ + ")'>역량평가하기</button>";
                    }

                }, {
                    title: "제출상태",
                    width: 100,
                    template: function (e){
                        console.log(e);
                        if($("#key").val() == "1"){ // 1차평가
                            if(e.EVAL_F == "Y"){
                                return "<span style='color: blue'>제출완료 ("+e.EVAL_F_SCORE+"점)</span>";
                            }else if(e.EVAL_F == "W"){
                                return "<span style='color: black'>작성완료 ("+e.EVAL_F_SCORE+"점)</span>";
                            }else{
                                return "<span style='color: red'>미제출</span>";
                            }

                        }else if($("#key").val() == "2"){ // 2차평가

                            if(e.EVAL_S == "Y"){
                                return "<span style='color: blue'>제출완료 ("+e.EVAL_S_SCORE+"점)</span>";
                            }else if(e.EVAL_S == "W"){
                                return "<span style='color: black'>작성완료 ("+e.EVAL_S_SCORE+"점)</span>";
                            }else{
                                return "<span style='color: red'>미제출</span>";
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

    fn_open_eval: function(empSeq){
        $("#empSeq").val(empSeq);
        let url = "/evaluation/pop/evaluationPop.do";
        const option = "width=1400, height=820, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no";
        window.open("", "evalForm2", option);

        const myForm = document.evalForm2;
        myForm.action = url;
        myForm.target = "evalForm2";
        myForm.method = "post";
        myForm.submit();
    },

    saveDataAll : function (stat){
        let flag = true;
        const data = new Object();
        data.evalSn = $("#evalSn").val();
        data.bsYMD = $("#bsYear").val()+"-12-31";
        data.empSeq = $("#evalEmpSeq").val();
        data.key = $("#key").val();
        const ckList = customKendo.fn_customAjax("/evaluation/getEvaluationEmpList", data).list;

        console.log("ckList", ckList);

        for(let i=0; i < ckList.length; i++){
            const map = ckList[i];
            if(($("#key").val() == "1" && map.EVAL_F == "N") || $("#key").val() == "2" && map.EVAL_S == "N"){
                flag = false;
            }
        }

        if(!flag){
            alert("일괄제출은 모든 평가가 끝난 이후에 가능합니다.");
            return;
        }

        if(!confirm("제출 후 수정이 불가능 합니다. 일괄제출하시겠습니까?")){
            return;
        }

        var parameters = {
            evalSn : $("#evalSn").val(),
            empSeq : $("#evalEmpSeq").val(),
            evalResultType : $("#key").val() == "1" ? "evalF" : "evalS",
            evalCk : "Y"
        }

        $.ajax({
            url : "/evaluation/setEvalScoreTemSaveAll",
            data : parameters,
            dataType : "json",
            success : function (rs){
                alert("저장 되었습니다.");
                evaluationEmpListPop.gridReload();
            }
        });
    }
}