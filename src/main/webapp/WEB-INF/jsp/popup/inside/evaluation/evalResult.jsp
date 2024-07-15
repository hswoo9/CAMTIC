<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<script type="text/javascript" src="/js/intra/inside/evaluation/evalResult.js?v=${today}"/></script>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">

<body class="font-opensans" style="background-color:#fff;">
<input type="hidden" id="evalSn" value="${params.pk}"/>
<input type="hidden" id="regEmpSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="regEmpName" value="${loginVO.name}"/>
<input type="hidden" id="regDeptSeq" value="${loginVO.deptId}"/>
<input type="hidden" id="regDeptName" value="${loginVO.deptNm}"/>
<input type="hidden" id="regTeamSeq" value="${loginVO.teamId}"/>
<input type="hidden" id="regTeamName" value="${loginVO.teamNm}"/>
<input type="hidden" id="regPositionCode" value="${loginVO.positionCode}"/>
<input type="hidden" id="regPositionName" value="${loginVO.positionNm}"/>
<input type="hidden" id="regDutyCode" value="${loginVO.dutyCode}"/>
<input type="hidden" id="regDutyName" value="${loginVO.dutyNm}"/>
<input type="hidden" id="regGradeCode" value="${loginVO.gradeCode}"/>
<input type="hidden" id="regGradeName" value="${loginVO.gradeNm}"/>
<input type="hidden" id="regJobDetailName" value="${loginVO.jobDetailNm}"/>
<input type="hidden" id="mngCk" value=""/>

<div style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">역량평가 결과</h3>
            <div class="btn-st popButton">
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
                    <td>
                        <button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="fn_empList();">	<span class="k-button-text">조회</span></button>
                    </td>


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
        const data = {
            evalSn : $("#evalSn").val(),
            dept : $("#dept").val(),
            team : $("#team").val(),
            position : $("#position").val(),
            duty : $("#duty").val()
        }

        if($("#mngCk").val() == ""){
            data.empSeq = $("#regEmpSeq").val()
        }
        $.ajax({
            url : "/evaluation/getEvalResultEmpList",
            type : "post",
            data : data,
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

        const scoreList = customKendo.fn_customAjax("/evaluation/getEvaluation", {
            evalSn: $("#evalSn").val()
        }).scList;

        for(var i = 0 ; i < list.length ; i++) {
            const map = list[i];
            var scoreF;
            var scoreS;

            html += '<tr>';
            html += '   <td style="text-align: center;">' + (i+1) + '</td>';
            html += '   <td>' + map.deptNm + '</td>';
            html += '   <td>' + map.teamNm + '</td>';
            html += '   <td><div style="cursor: pointer">' + map.EMP_NAME_KR + '</div></td>';
            html += '   <td style="text-align: center; background-color: #EFEFEF">' + map.EVAL_SCORE + '</td>';
            html += '   <td style="text-align: center">' + map.EVAL_F_SCORE + '</td>';

            let aDeptPer = data.DEPT_MANAGER_A;
            let bDeptPer = data.DEPT_MANAGER_B;
            let aTeamPer = data.TEAM_MANAGER_A;
            let bTeamPer = data.TEAM_MANAGER_B;
            let aMemPer = data.TEAM_MEMBER_A;
            let bMemPer = data.TEAM_MEMBER_B;

            if(map.EVAL_EVAL_F_SEQ == "undefined" || map.EVAL_EVAL_F_SEQ == ""){
                aDeptPer = 0;
                bDeptPer = 100;
                aTeamPer = 0;
                bTeamPer = 100;
                aMemPer = 0;
                bMemPer = 100;
            }else if(map.EVAL_EVAL_S_SEQ == "undefined" || map.EVAL_EVAL_S_SEQ == ""){
                aDeptPer = 100;
                bDeptPer = 0;
                aTeamPer = 100;
                bTeamPer = 0;
                aMemPer = 100;
                bMemPer = 0;
            }else if(map.EVAL_EVAL_F_SEQ == map.EVAL_EVAL_S_SEQ){
                aDeptPer = 0;
                bDeptPer = 100;
                aTeamPer = 0;
                bTeamPer = 100;
                aMemPer = 0;
                bMemPer = 100;
            }

            if(map.DUTY_CODE == "2" || map.DUTY_CODE == "3" || map.DUTY_CODE == "7"){
                scoreF = (parseFloat(aDeptPer / 100 * map.EVAL_F_SCORE)).toFixed(1);
                html += '   <td style="text-align: center">'+ aDeptPer +' %</td>';
                html += '   <td style="text-align: center; background-color: #EFEFEF">' + scoreF + '</td>';
            }else if(map.DUTY_CODE == "4" || map.DUTY_CODE == "5"){
                scoreF = (parseFloat(aTeamPer / 100 * map.EVAL_F_SCORE)).toFixed(1);
                html += '   <td style="text-align: center">'+ aTeamPer +' %</td>';
                html += '   <td style="text-align: center; background-color: #EFEFEF">' + scoreF + '</td>';
            }else{
                scoreF = (parseFloat(aMemPer / 100 * map.EVAL_F_SCORE)).toFixed(1);
                html += '   <td style="text-align: center">'+ aMemPer +' %</td>';
                html += '   <td style="text-align: center; background-color: #EFEFEF">' + scoreF + '</td>';
            }


            html += '   <td style="text-align: center">' + map.EVAL_S_SCORE + '</td>';

            if(map.DUTY_CODE == "2" || map.DUTY_CODE == "3" || map.DUTY_CODE == "7"){
                scoreS =  (parseFloat(bDeptPer / 100 * map.EVAL_S_SCORE)).toFixed(1);
                html += '   <td style="text-align: center">'+ bDeptPer +' %</td>';
                html += '   <td style="text-align: center; background-color: #EFEFEF">' + scoreS + '</td>';
            }else if(map.DUTY_CODE == "4" || map.DUTY_CODE == "5"){
                scoreS = (parseFloat(bTeamPer / 100 * map.EVAL_S_SCORE)).toFixed(1);
                html += '   <td style="text-align: center">'+ bTeamPer +' %</td>';
                html += '   <td style="text-align: center; background-color: #EFEFEF">' + scoreS + '</td>';
            }else{
                scoreS = (parseFloat(bMemPer / 100 * map.EVAL_S_SCORE)).toFixed(1);
                html += '   <td style="text-align: center">'+ bMemPer +' %</td>';
                html += '   <td style="text-align: center; background-color: #EFEFEF">' + scoreS + '</td>';
            }

            html += '   <td style="text-align: center">0</td>';
            if(map.DUTY_CODE == "2" || map.DUTY_CODE == "3" || map.DUTY_CODE == "7"){
                html += '   <td style="text-align: center">'+ data.DEPT_MANAGER_C +' %</td>';
                html += '   <td style="text-align: center; background-color: #EFEFEF">0</td>';
            }else if(map.DUTY_CODE == "4" || map.DUTY_CODE == "5"){
                html += '   <td style="text-align: center">'+ data.TEAM_MANAGER_C +' %</td>';
                html += '   <td style="text-align: center; background-color: #EFEFEF">0</td>';
            }else{
                html += '   <td style="text-align: center">'+ data.TEAM_MEMBER_C +' %</td>';
                html += '   <td style="text-align: center; background-color: #EFEFEF">0</td>';
            }

            var totalScore = (parseFloat(scoreS) + parseFloat(scoreF)).toFixed(1);
            html += '   <td style="text-align: center">'+ totalScore +'</td>';

            let grade = "-";
            let resGrade = "-";
            for (let j = 0; j < scoreList.length; j++) {
                const scItem = scoreList[j];

                if(Number(scItem.EVAL_SCORE_B) >= Number(totalScore) && Number(totalScore) >= Number(scItem.EVAL_SCORE_A)){
                    grade = scItem.EVAL_GRADE;
                }
            }

            html += '   <td style="text-align: center">'+grade+'</td>';   // 평가등급
            html += '   <td style="text-align: center; background-color: #EFEFEF; padding-left:5px; padding-right:5px">'+map.EVAL_SCORE_MNG+'</td>';
            html += '   <td style="text-align: center; background-color: #EFEFEF">'+ ( parseFloat(totalScore) + parseFloat(map.EVAL_SCORE_MNG)) +'</td>';

            for (let j = 0; j < scoreList.length; j++) {
                const scItem = scoreList[j];

                if(Number(scItem.EVAL_SCORE_B) >= Number(parseFloat(totalScore) + parseFloat(map.EVAL_SCORE_MNG)) && Number(parseFloat(totalScore) + parseFloat(map.EVAL_SCORE_MNG)) >= Number(scItem.EVAL_SCORE_A)){
                    resGrade = scItem.EVAL_GRADE;
                }
            }

            html += '   <td style="text-align: center; background-color: #EFEFEF">'+resGrade+'</td>';  // 최종등급
            html += '</tr>';
        }

        $('#evalList').append(html);
    }
</script>
</body>
</html>