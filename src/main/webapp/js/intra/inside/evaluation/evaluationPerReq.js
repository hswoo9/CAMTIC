var now = new Date();

var evaluationPerReq = {
    global : {
        searchAjaxData : "",
        dropDownDataSource : "",
        evalData : null,
        scoreList : new Array()
    },

    init: function(){
        evaluationPerReq.dataSet();
        evaluationPerReq.getEvaluationList();
    },

    dataSet: function (){
        customKendo.fn_datePicker("searchYear", 'decade', "yyyy", new Date());
    },

    getEvaluationList: function(){
        $.ajax({
            url : "/evaluation/getEvalGoalList",
            type : "post",
            data : {
                year : $("#searchYear").val(),
                deptSeq : $("#regDeptSeq").val(),
                teamSeq : $("#regTeamSeq").val(),
                dutyCode : $("#regDutyCode").val(),
                empSeq : $("#regEmpSeq").val()
            },
            dataType : "json",
            async : false,
            success : function(result){
                evaluationPerReq.fn_addEvalList(result.list);
            },
            error : function(e) {
                console.log(e);
            }
        });
    },

    fn_addEvalList: function(list){
        $('#evalList').empty();

        var html = "";

        if(list.length > 0){
            for(var i = 0; i < list.length; i++){
                    html += '' +
                        '<tr>' +
                            '<td>' + list[i].DEPT_NAME + '</td>' +
                            '<td>' + list[i].TEAM_NAME + '</td>' +
                            '<td>' + list[i].EMP_NAME + '</td>' +
                            '<td>' +
                                '<span id="orderGoals">' + comma(list[i].ORDER_GOALS) + '</span>' +
                            '</td>' +
                            '<td>' +
                                '<span id="orderAchieve">' + comma(0) + '</span>' +
                            '</td>' +
                            '<td>' +
                                '<span id="orderScore">0</span>' +
                            '</td>' +
                            '<td>' +
                                '<span id="salesGoals">' + comma(list[i].SALES_GOALS) + '</span>' +
                            '</td>' +
                            '<td>' +
                                '<span id="salesAchieve">' + comma(0) + '</span>' +
                            '</td>' +
                            '<td>' +
                                '<span id="salesScore">0</span>' +
                            '</td>' +
                            '<td>' +
                                '<span id="revenueGoals">' + comma(list[i].REVENUE_GOALS) + '</span>' +
                            '</td>' +
                            '<td>' +
                                '<span id="revenueAchieve">' + comma(0) + '</span>' +
                            '</td>' +
                            '<td>' +
                                '<span id="revenueScore">0</span>' +
                            '</td>' +
                            '<td>' +
                                '<span id="costGoals">' + comma(list[i].COST_GOALS) + '</span>' +
                            '</td>' +
                            '<td>' +
                                '<span id="costAchieve">' + comma(0) + '</span>' +
                            '</td>' +
                            '<td>' +
                                '<span id="costScore">0</span>' +
                            '</td>' +
                            '<td>' +
                                '<span id="commerIndexGoals">' + comma(list[i].COMMER_INDEX_GOALS) + '</span>' +
                            '</td>' +
                            '<td>' +
                                '<span id="commerIndexAchieve">' + comma(0) + '</span>' +
                            '</td>' +
                            '<td>' +
                                '<span id="commerIndexScore">0</span>' +
                            '</td>' +
                        '</tr>';
                }
        }else{
            html += '' +
                '<tr style="text-align: center;">' +
                    '<td colspan="18">데이터가 없습니다.</td>' +
                '</tr>';
        }

        $('#evalList').append(html);
    },

    evalReqPop: function(){
        var url = "/Inside/pop/evalReqPop.do";
        var name = "contentPop";
        var option = "width = 850, height = 360, top = 100, left = 200, location = no";
        var popup = window.open(url, name, option);
    },

    evalScorePop: function(){
        var url = "/Inside/pop/evalScorePop.do?searchYear=" + $("#searchYear").val();
        var name = "contentWritePop";
        var option = "width = 1810, height = 800, top = 100, left = 200, location = no";
        var popup = window.open(url, name, option);
    }
}

