<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<script src="/js/kendoui/kendo.all.min.js"></script>
<script type="text/javascript" src="/js/intra/inside/evaluation/evalResult.js?v=${today}"/></script>
<script type="text/javascript" src="/js/intra/common/common.js?${toDate}"></script>
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">

<body class="font-opensans" style="background-color:#fff;">
<input type="hidden" id="evalSn" value="${params.pk}"/>

<div style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">역량평가 결과</h3>
            <div class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-info" onclick="saveMngScore()">평가점수 조정</button>
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">닫기</button>
            </div>
        </div>
        <div style="padding: 20px 30px;">
            <table class="searchTable table table-bordered mb-0">
                <tr>
                    <th class="text-center th-color">부서/팀</th>
                    <td>
                        <input type="text" id="dept" style="width:160px;">
                        <input type="hidden" id="dept_seq">
                        <input type="text" id="team" style="width:165px;">
                        <input type="hidden" id="team_seq">
                    </td>
                    <th class="text-center th-color">직책/직급</th>
                    <td <%--style="display: flex; justify-content: space-between;"--%>>
                        <input type="text" id="position" style="width: 160px;">
                        <input type="text" id="duty" style="width: 160px;">
                    </td>
                    <td <%--style="display: flex; justify-content: space-between;"--%>>
                        <button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="fn_empList();">	<span class="k-button-text">조회</span></button>
                    </td>
                    <%--<th class="text-center th-color">이름</th>
                    <td>
                        <input type="text" id="name" style="width: 150px;" onkeypress="if(window.event.keyCode==13){employmentManage.gridReload()}">
                    </td>--%>

                </tr>
            </table>

            <table class="popTable table table-bordered mb-0">
                <colgroup>
                    <col width="1%">
                    <col width="10%">
                    <col width="10%">
                    <col width="5%">
                    <col width="5%">
                    <col width="5%">
                    <col width="5%">
                    <col width="5%">
                    <col width="5%">
                    <col width="5%">
                    <col width="5%">
                    <col width="5%">
                    <col width="5%">
                    <col width="5%">
                    <col width="4%">
                    <col width="4%">
                    <col width="4%">
                    <col width="4%">
                    <col width="4%">
                </colgroup>
                <thead>
                <tr>
                    <th scope="row" class="text-center th-color" rowspan="2"></th>
                    <th scope="row" class="text-center th-color" rowspan="2">부서명</th>
                    <th scope="row" class="text-center th-color" rowspan="2">팀명</th>
                    <th scope="row" class="text-center th-color" rowspan="2">성명</th>
                    <th scope="row" class="text-center th-color" rowspan="2">본인</th>
                    <th scope="row" class="text-center th-color" colspan="3">1차 평가자</th>
                    <th scope="row" class="text-center th-color" colspan="3">2차 평가자</th>
                    <th scope="row" class="text-center th-color" colspan="3">3차 평가자</th>
                    <th scope="row" class="text-center th-color" rowspan="2">평가점수</th>
                    <th scope="row" class="text-center th-color" rowspan="2">평가등급</th>
                    <th scope="row" class="text-center th-color" rowspan="2">조정점수</th>
                    <th scope="row" class="text-center th-color" rowspan="2">최종점수</th>
                    <th scope="row" class="text-center th-color" rowspan="2">최종등급</th>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">점수</th>
                    <th scope="row" class="text-center th-color">가중치</th>
                    <th scope="row" class="text-center th-color">환산</th>
                    <th scope="row" class="text-center th-color">점수</th>
                    <th scope="row" class="text-center th-color">가중치</th>
                    <th scope="row" class="text-center th-color">환산</th>
                    <th scope="row" class="text-center th-color">점수</th>
                    <th scope="row" class="text-center th-color">가중치</th>
                    <th scope="row" class="text-center th-color">환산</th>
                </tr>
                </thead>
                <tbody id="evalList">
                </tbody>
            </table>
        </div>
    </div>
</div>


<script>
    evalResult.init();

    $(function (){
        fn_empList();
    });
    function fn_empList(){
        $.ajax({
            url : "/evaluation/getEvalResultEmpList",
            type : "post",
            data : {
                evalSn : $("#evalSn").val(),
                dept : $("#dept").val(),
                team : $("#team").val(),
                position : $("#position").val(),
                duty : $("#duty").val()
                /*searchText : $("#searchText").val(),
                searchDate : $("#searchDate").val()*/
            },
            dataType : "json",
            async : false,
            success : function(result){
                fn_addTbody(result);
            },
            error : function(e) {
                console.log(e);
            }
        });
    }

    function fn_addTbody(result){
        var list = result.list
        var data = result.data
        $("#evalList").empty();
        var html = "";

        for(var i = 0 ; i < list.length ; i++) {
            var scoreF;
            var scoreS;

            html += '<tr>';
            html += '   <td><input type="checkbox" id="check' + i + '" value="'+ list[i].EVAL_MEM_SN+'" onchange="scoreMng('+i+')" /></td>';
            html += '   <td>' + list[i].DEPT_NAME + '</td>';
            html += '   <td>' + list[i].DEPT_TEAM_NAME + '</td>';
            html += '   <td>' + list[i].EMP_NAME_KR + '</td>';
            html += '   <td>' + list[i].EVAL_SCORE + '</td>';
            html += '   <td>' + list[i].EVAL_F_SCORE + '</td>';

            if(list[i].DUTY_CODE == "2" || list[i].DUTY_CODE == "3" || list[i].DUTY_CODE == "7"){
                scoreF = (parseFloat(data.DEPT_MANAGER_A / 100 * list[i].EVAL_F_SCORE)).toFixed(2)
                html += '   <td>'+ data.DEPT_MANAGER_A +'</td>';
                html += '   <td>' + scoreF + '</td>';
            }else if(list[i].DUTY_CODE == "4" || list[i].DUTY_CODE == "5"){
                scoreF = (parseFloat(data.TEAM_MANAGER_A / 100 * list[i].EVAL_F_SCORE)).toFixed(2)
                html += '   <td>'+ data.TEAM_MANAGER_A +'</td>';
                html += '   <td>' + scoreF + '</td>';
            }else{
                scoreF = (parseFloat(data.TEAM_MEMBER_A / 100 * list[i].EVAL_F_SCORE)).toFixed(2)
                html += '   <td>'+ data.TEAM_MEMBER_A +'</td>';
                html += '   <td>' + scoreF + '</td>';
            }


            html += '   <td>' + list[i].EVAL_S_SCORE + '</td>';

            if(list[i].DUTY_CODE == "2" || list[i].DUTY_CODE == "3" || list[i].DUTY_CODE == "7"){
                scoreS =  (parseFloat(data.DEPT_MANAGER_B / 100 * list[i].EVAL_S_SCORE)).toFixed(2)
                html += '   <td>'+ data.DEPT_MANAGER_B +'</td>';
                html += '   <td>' + scoreS + '</td>';
            }else if(list[i].DUTY_CODE == "4" || list[i].DUTY_CODE == "5"){
                scoreS = (parseFloat(data.TEAM_MANAGER_B / 100 * list[i].EVAL_S_SCORE)).toFixed(2)
                html += '   <td>'+ data.TEAM_MANAGER_B +'</td>';
                html += '   <td>' + scoreS + '</td>';
            }else{
                scoreS = (parseFloat(data.TEAM_MEMBER_B / 100 * list[i].EVAL_S_SCORE)).toFixed(2)
                html += '   <td>'+ data.TEAM_MEMBER_B +'</td>';
                html += '   <td>' + scoreS + '</td>';
            }

            html += '   <td>0</td>';
            if(list[i].DUTY_CODE == "2" || list[i].DUTY_CODE == "3" || list[i].DUTY_CODE == "7"){
                html += '   <td>'+ data.DEPT_MANAGER_C +'</td>';
                html += '   <td>0</td>';
            }else if(list[i].DUTY_CODE == "4" || list[i].DUTY_CODE == "5"){
                html += '   <td>'+ data.TEAM_MANAGER_C +'</td>';
                html += '   <td>0</td>';
            }else{
                html += '   <td>'+ data.TEAM_MEMBER_C +'</td>';
                html += '   <td>0</td>';
            }

            var totalScore = (parseFloat(scoreS) + parseFloat(scoreF)).toFixed(2);
            html += '   <td>'+ totalScore +'</td>';

            html += '   <td>S</td>';   // 평가등급
            html += '   <td><input type="text" id="scoreMng'+i+'" value="'+ list[i].EVAL_SCORE_MNG +'" style="width: 35px;" disabled></td>';
            html += '   <td>'+ ( parseFloat(totalScore) + parseFloat(list[i].EVAL_SCORE_MNG)) +'</td>';
            html += '   <td>S</td>';  // 최종등급
            html += '</tr>';
        }

        $('#evalList').append(html);
    }

    function scoreMng(i){
        var checkbox = document.getElementById('check' + i);
        var scoreInput = document.getElementById('scoreMng' + i);

        if (checkbox.checked) {
            scoreInput.disabled = false;
        } else {
            scoreInput.disabled = true;
        }
    }

    function saveMngScore() {
        var evalScoreMngArr = [];
        $("#evalList").find("tr").each(function(index, row) {
            var evalMemSn = $(row).find("input[type='checkbox']");
            var scoreMng = $(row).find("input[type='text']");

            if (evalMemSn.is(":checked")) {
                evalScoreMngArr.push({
                    evalMemSn: evalMemSn.val(),
                    scoreMng: scoreMng.val()
                });
            }
        });

        var parameters = {
            evalScoreMngArr: JSON.stringify(evalScoreMngArr)
        };

        $.ajax({
            url: "/evaluation/setSaveMngScore",
            data: parameters,
            dataType: "json",
            success: function(rs) {
                console.log(rs);
            }
        });
    }



</script>
</body>
</html>