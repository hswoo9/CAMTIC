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
        customKendo.fn_datePicker("searchDate", 'decade', "yyyy", new Date());

    },

    getEvaluationList: function(){
        $.ajax({
            url : "/evaluation/getEvaluationList",
            type : "post",
            data : { year : $("#searchDate").val()},
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
                    html += '<tr>';
                    html += "     <td>테스트부서</td>";
                    html += "     <td>테스트팀</td>";
                    html += "     <td>테스트</td>";
                    /*html += "     <td>" +
                            "       <input type='text' id='' name='' value='12,345,678,900'>" +
                            "     </td>";*/
                    html += "     <td>12,345,678,900</td>";
                    html += "     <td>12,345,678,900</td>";
                    html += "     <td>100</td>";
                    html += "     <td>12,345,678,900</td>";    
                    html += "     <td>12,345,678,900</td>";
                    html += "     <td>100</td>";
                    html += "     <td>12,345,678,900</td>";
                    html += "     <td>12,345,678,900</td>";
                    html += "     <td>100</td>";
                    html += "     <td>12,345,678,900</td>";
                    html += "     <td>12,345,678,900</td>";
                    html += "     <td>100</td>";
                    html += "     <td>12,345,678,900</td>";
                    html += "     <td>12,345,678,900</td>";
                    html += "     <td>100</td>";
                    html += '</tr>';
                }
        }else{
            html += '<tr style="text-align: center;">';
            html += "     <td colspan='18'>데이터가 없습니다.</td>";
            html += '</tr>';
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
        var url = "/Inside/pop/evalScorePop.do";
        var name = "contentWritePop";
        var option = "width = 1810, height = 800, top = 100, left = 200, location = no";
        var popup = window.open(url, name, option);
    }




}

