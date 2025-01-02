var evaluationList = {

    global : {
        evalList : new Array(),
        evalAchieveList : new Array(),
        evalAchieveSet : "",
        gradingTable : new Array()
    },

    fn_defaultScript : function (){
        customKendo.fn_datePicker("searchYear", 'decade', "yyyy", new Date());

        evaluationList.getEvalAchieveSet();
        // evaluationList.mainGrid();
    },

    getAllEvalApprove: function(){
        var rs;
        $.ajax({
            url : "/evaluation/getAllEvalApprove",
            type : "post",
            data : {
                baseYear : $("#searchYear").val(),
            },
            dataType : "json",
            async : false,
            success : function(result){
                rs = result.rs;
            },
            error : function(e) {
            }
        });
        return rs;
    },

    setApproveBtn : function (){
        var result = evaluationList.getAllEvalApprove();
        var html = ""
        if(result != null){
            html += '' +
                '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-base approvalPopup" onclick="approveDocView(' + result.DOC_ID + ',\'camticAlleval_' + result.ALL_EVAL_APPROVE_GROUP + '\',\'allEval\')">' +
                '<span class=\'k-icon k-i-track-changes-accept k-button-icon\'></span>' +
                '<span class="k-button-text">' +
                    (result.APPROVE_STAT_CODE == "100" ? '결재완료' : '결재중')  +
                '</span>' +
                '</button>'
        }else{
            html += '' +
                '<button type="button" class="k-button k-button-md k-button-solid k-button-solid-base approvalPopup" onclick="evaluationList.fn_popAllEvalApprovePop()">' +
                    '<span class="k-icon k-i-track-changes-accept k-button-icon"></span>' +
                    '<span class="k-button-text">상신</span>' +
                '</button>'
        }
        $("#approveDiv").html(html)
    },

    getEvalAchieveSet : function(){
        $.ajax({
            url : "/evaluation/getEvalAchieveSet",
            type : "post",
            data : {
                year : $("#searchYear").val(),
                baseYear : $("#searchYear").val(),
            },
            dataType : "json",
            async : false,
            success : function(rs){
                if(rs.rs != null){
                    evaluationList.global.evalAchieveSet = rs.rs;
                    evaluationList.global.gradingTable = rs.rs.ratingList;
                }
            },
            error : function(e) {
                console.log(e);
            }
        });
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
        /*var url = "/evaluation/pop/evaluationSet.do";

        var name = "_blank";
        var option = "width = 1500, height = 820, top = 100, left = 400, location = no";
        var popup = window.open(url, name, option);*/
        var url = "/evaluation/pop/evaluationReq.do";

        var name = "_blank";
        var option = "width = 1000, height = 800, top = 100, left = 400, location = no";
        var popup = window.open(url, name, option);
    },

    fn_popAllEvalApprovePop : function(){
        var evalList = evaluationList.global.evalList.filter(l => l.BS_YEAR == $("#searchYear").val() && ['1', '2'].includes(l.EVAL_NUM))
        if(evalList.length < 2){
           if(!evalList.some(l => l.EVAL_NUM === '1')){
               alert("상반기 역량평가 데이터가 없습니다.");
               return;
           }else if(!evalList.some(l => l.EVAL_NUM === '2')){
               alert("하반기 역량평가 데이터가 없습니다.");
               return;
           }
        }

        var evalAchieveList = evaluationList.global.evalAchieveList.filter(l => l.BASE_YEAR == $("#searchYear").val())
        if(evalAchieveList.length == 0){
            alert("업적평가 데이터가 없습니다.");
            return;
        }

        var result = evaluationList.getAllEvalApprove();
        if(result != null){
            alert("역량&업적 평가결과 결재진행중입니다.");
            return;
        }

        var url = "/evaluation/pop/allEvalApprovePop.do?baseYear=" + $("#searchYear").val();
        var name = "_blank";
        var option = "width = 1500, height = 820, top = 100, left = 400, location = no";
        var popup = window.open(url, name, option);
    },

    getEvalRating : function(e, type){
        if(evaluationList.global.gradingTable.length > 0){

            if(type == "con"){
                // 범위 밖 점수 처리: 점수가 150 이상이면 최대 환산점수 120 반환
                if (e > Number(evaluationList.global.gradingTable[evaluationList.global.gradingTable.length - 1].BASE_SCORE)) {
                    return Number(evaluationList.global.gradingTable[evaluationList.global.gradingTable.length - 1].CONVERSION_SCORE); // 범위 밖 점수일 경우 최대 환산점수
                }

                // 근사치 사용: 기준점수에 가장 가까운 환산점수를 찾아 반환
                for (let i = evaluationList.global.gradingTable.length - 1; i >= 0; i--) {
                    if (e >= Number(evaluationList.global.gradingTable[i].BASE_SCORE)) {
                        return Number(evaluationList.global.gradingTable[i].CONVERSION_SCORE); // 해당하는 환산점수 반환
                    }
                }

                return null;
            }else{
                // 범위 밖 점수 처리: 점수가 150 이상이면 "SS" 등급 반환
                if (e > Number(evaluationList.global.gradingTable[evaluationList.global.gradingTable.length - 1].BASE_SCORE)) {
                    return Number(evaluationList.global.gradingTable[evaluationList.global.gradingTable.length - 1].RATING); // 범위 밖 점수일 경우 최대 등급
                }

                // 근사치 사용: 기준점수에 가장 가까운 평가 등급을 찾아 반환
                for (let i = evaluationList.global.gradingTable.length - 1; i >= 0; i--) {
                    if (e >= Number(evaluationList.global.gradingTable[i].BASE_SCORE)) {
                        return evaluationList.global.gradingTable[i].RATING; // 해당하는 평가 등급 반환
                    }
                }

                return null;
            }
        }else{
            return '-'
        }
    },
}