var evalScorePop = {


    fn_defaultScript : function (){
        evalScorePop.evalContent();
    },

    evalContent: function(){
        $.ajax({
            url: "/evaluation/getEvalEmpList",
            type: "post",
            data: {
                deptSeq: $("#regTeamSeq").val()
            },
            dataType: "json",
            async: false,
            success: function (rs) {
                evalScorePop.evalScoreTableMake(rs.list);
            },
            error: function (e) {
                console.log(e);
            }
        });
    },

    evalScoreTableMake: function (list) {
        var col = list.length + 1;

        var html = "";
        html += '<table class="searchTable table table-bordered mb-0">';
        html += '   <tr>';
        html += '       <th colSpan="3" class="text-center th-color">구분</th>';
        html += '       <th colSpan="3" class="text-center th-color">팀 실적 (단위 : 원)</th>';
        html += '       <th colSpan="'+col+'" class="text-center th-color green">수주(기준: 수주금액)</th>';
        html += '       <th colSpan="'+col+'" class="text-center th-color yellow">매출(기준: 매출금액)</th>';
        html += '       <th colSpan="'+col+'" class="text-center th-color blue">운영수익(기준: 수익금액)</th>';
        html += '       <th colSpan="'+col+'" class="text-center th-color">합계</th>';
        html += '   </tr>';
        html += '   <tr>';
        html += '       <td>프로젝트명</td>';
        html += '       <td>업체</td>';
        html += '       <td>구분</td>';
        html += '       <td>수추</td>';
        html += '       <td>매출</td>';
        html += '       <td>수익</td>';

        for (var i = 0; i < list.length; i++) {
        html += '       <td class="green">'+ list[i].EMP_NAME_KR +'</td>';
        }
        html += '       <td class="green">소계</td>';

        for (var i = 0; i < list.length; i++) {
        html += '       <td class="yellow">'+ list[i].EMP_NAME_KR +'</td>';
        }
        html += '       <td class="yellow">소계</td>';

        for (var i = 0; i < list.length; i++) {
        html += '       <td class="blue">'+ list[i].EMP_NAME_KR +'</td>';
        }
        html += '       <td class="blue">소계</td>';

        for (var i = 0; i < list.length; i++) {
        html += '       <td>'+ list[i].EMP_NAME_KR +'</td>';
        }
        html += '       <td>소계</td>';

        html += '   </tr>';
        html += '   <tbody id="evalList">';
        html += '   </tbody>';
        html += '</table>';

        $('#evalListDiv').append(html);
        evalScorePop.evalScoreTBodyMake(list);
    },

    evalScoreTBodyMake :function (list){
        var html = "";

        for (var j = 0; j < list.length; j++) {
            html += '   <tr>';
            html += '       <td>펌프시험기 프로그램 개발</td>';
            html += '       <td>유한회사 엘로시스템</td>';
            html += '       <td>개발일반</td>';
            html += '       <td>8,900,000</td>';
            html += '       <td>8,900,000</td>';
            html += '       <td>8,662,200</td>';
            for (var i = 0; i < list.length; i++) {
            html += '       <td class="green">100%</td>';
            }
            html += '       <td class="green">소계</td>';

            for (var i = 0; i < list.length; i++) {
            html += '       <td class="yellow">100%</td>';
            }
            html += '       <td class="yellow">100%</td>';

            for (var i = 0; i < list.length; i++) {
            html += '       <td class="blue">100%</td>';
            }
            html += '       <td class="blue">100%</td>';

            for (var i = 0; i < list.length; i++) {
            html += '       <td>100%</td>';
            }
            html += '       <td>100%</td>';
            html += '   </tr>';
        }

        $('#evalList').append(html);
    }

}