<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />

<script type="text/javascript" src="/js/intra/inside/evaluation/evaluationList.js?v=${today}"/></script>

<style>
    .pink{background-color: #fce4d6;font-weight: bold;text-align: center;}
    .yellow{background-color: #fff2cc;font-weight: bold;text-align: center;}
</style>

<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="deptSeq" value="${loginVO.orgnztId}"/>
<input type="hidden" id="deptName" value="${loginVO.orgnztNm}"/>

<div class="col-md-12 col-lg-12 dash-left">
    <div class="panel">
        <div class="panel-heading">
        </div>
        <div style="padding-left : 20px; padding-right: 20px;">
            <h4 class="panel-title">평가관리(관리자)</h4>
            <div class="title-road" style="text-align: right; margin-bottom: 5px;">캠인사이드 > 성과관리 > 인사평가 > 평가관리(관리자)</div>
            <div id="startView" style="padding: 10px 0 0 0; border-top: 2px solid #dfdfdf;"></div>
        </div>

       <%--<div class="panel-body">

            <div id="mainGrid" />
        </div>--%>


        <div class="panel-body">
            <div style="float: right; margin: 10px 5px;text-align: right;">
                <input type="text" id="searchYear" style="width: 24%" onchange="getEvaluationList()">
                <button type="button" class="k-button k-button-md k-button-solid k-button-solid-base approvalPopup" onclick="evaluationList.fn_popAllEvalApprovePop()">
                    <span class="k-icon k-i-track-changes-accept k-button-icon"></span>
                    <span class="k-button-text">상신</span>
                </button>

                <button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="evaluationList.fn_popEvaluationSet()">
                    <span class="k-button-text">평가등록</span>
                </button>
            </div>
            <div>
                <table class="searchTable table table-bordered mb-0">
                    <colgroup>
                        <col width="5%">
                        <col width="4%">
                        <col width="5%">
                        <col width="7%">
                        <col width="7%">
                        <col width="15%">
                        <col width="4%">
                        <col width="4%">
                        <col width="4%">
                        <col width="4%">
                        <col width="7%">
                        <col width="15%">
                        <col width="4%">
                        <col width="4%">
                        <col width="4%">
                        <col width="4%">
                        <col width="4%">
                        <col width="4%">
                        <col width="4%">
                    </colgroup>
                    <tr>
                        <th rowspan="3" class="text-center th-color">순번</th>
                        <th rowspan="3" class="text-center th-color">년도</th>
                        <th rowspan="3" class="text-center th-color">차수</th>
                        <th rowspan="3" class="text-center th-color">평가 인원</th>
                        <th colspan="15" class="text-center th-color">평가 결과</th>
                    </tr>
                    <tr>
                        <td colspan="6" class="pink">역량 평가</td>
                        <td colspan="9" class="yellow">업적 평가</td>
                    </tr>
                    <tr>
                        <td class="pink">평가 설정</td>
                        <td class="pink">역량 평가</td>
                        <td class="pink">S</td>
                        <td class="pink">A</td>
                        <td class="pink">B</td>
                        <td class="pink">C</td>
                        <td class="yellow">평가 설정</td>
                        <td class="yellow">업적 평가</td>
                        <td class="yellow">SS</td>
                        <td class="yellow">S</td>
                        <td class="yellow">A</td>
                        <td class="yellow">B</td>
                        <td class="yellow">C</td>
                        <td class="yellow">D</td>
                        <td class="yellow">-</td>
                    </tr>
                    <tbody id="evalList">
                    </tbody>
                </table>
            </div>
        </div>

    </div>
</div><!-- col-md-9 -->

<script type="text/javascript">
    evaluationList.fn_defaultScript();

    getEvaluationList();

    function  getEvaluationList(){
        $.ajax({
            url : "/evaluation/getEvaluationList",
            type : "post",
            data : { year : $("#searchYear").val()},
            dataType : "json",
            async : false,
            success : function(result){
                fn_addEvalList(result.rs);
            },
            error : function(e) {
                console.log(e);
            }
        });
    }

    function fn_addEvalList(rs){
        var list = rs.evaluationList;
        var achieveList = rs.evalAchieveSetList;

        evaluationList.global.evalList = list
        evaluationList.global.evalAchieveList = achieveList

        $('#evalList').empty();
        var html = "";
        if(list.length > 0){
            const yearCount = {};
            for (var i = 0; i < list.length; i++) {
                if (yearCount[list[i].BS_YEAR]) {
                    yearCount[list[i].BS_YEAR]++;
                } else {
                    yearCount[list[i].BS_YEAR] = 1;
                }
            }

            let currentYear = null;
            for(var i = 0; i < list.length; i++){
                const bsYear = list[i].BS_YEAR;
                const evalSn = list[i].EVAL_SN;
                const detailInfo = customKendo.fn_customAjax("/evaluation/getEvalResultEmpList", {evalSn: evalSn});
                const detailList = detailInfo.list;
                const detailData = detailInfo.data;
                const scoreList = customKendo.fn_customAjax("/evaluation/getEvaluation", {evalSn: evalSn}).scList;

                html += "<tr style='text-align: center;'>";
                html += "     <td>" + (i+1) + "</td>";
                html += "     <td onclick='evalReqModify("+ list[i].EVAL_SN +")' style='cursor: pointer; text-decoration: underline; font-weight: bold'>" + list[i].BS_YEAR + "</td>";
                html += "     <td>" + list[i].EVAL_NUM + " 차</td>";
                html += "     <td>" + list[i].EVAL_MEM + " 명</td>";
                html += "     <td style='padding: 0px;'>";
                html += "         <button type='button' class='k-button k-button-solid-base' onclick='evalComModify("+ list[i].EVAL_SN +")' style='font-size: 11px;'>역량평가설정</button>";
                html += "     </td>";
                if(list[i].EVAL_STR_DT != null){
                    html += "     <td onclick='empList("+ list[i].EVAL_SN +")' style='cursor: pointer; text-decoration: underline; font-weight: bold'>" + list[i].EVAL_STR_DT + " ~ " + list[i].EVAL_END_DT + "</td>";
                }else{
                    html += "     <td onclick='empList("+ list[i].EVAL_SN +")' style='cursor: pointer;'>-</td>";
                }
                let sCount = 0;
                let aCount = 0;
                let bCount = 0;
                let cCount = 0;

                for(var j = 0 ; j < detailList.length ; j++) {
                    const map = detailList[j];
                    var scoreF;
                    var scoreS;

                    let aDeptPer = detailData.DEPT_MANAGER_A;
                    let bDeptPer = detailData.DEPT_MANAGER_B;
                    let aTeamPer = detailData.TEAM_MANAGER_A;
                    let bTeamPer = detailData.TEAM_MANAGER_B;
                    let aMemPer = detailData.TEAM_MEMBER_A;
                    let bMemPer = detailData.TEAM_MEMBER_B;

                    if(map.EVAL_EVAL_F_SEQ == "undefined" || map.EVAL_EVAL_F_SEQ == ""){
                        // console.log(map.EMP_NAME_KR+"님은 1차평가자가 없습니다.");
                        aDeptPer = 0;
                        bDeptPer = 100;
                        aTeamPer = 0;
                        bTeamPer = 100;
                        aMemPer = 0;
                        bMemPer = 100;
                    }else if(map.EVAL_EVAL_S_SEQ == "undefined" || map.EVAL_EVAL_S_SEQ == ""){
                        // console.log(map.EMP_NAME_KR+"님은 2차평가자가 없습니다.");
                        aDeptPer = 100;
                        bDeptPer = 0;
                        aTeamPer = 100;
                        bTeamPer = 0;
                        aMemPer = 100;
                        bMemPer = 0;
                    }else if(map.EVAL_EVAL_F_SEQ == map.EVAL_EVAL_S_SEQ){
                        // console.log(map.EMP_NAME_KR+"님은 1차평가자와 2차평가자가 같습니다.");
                        aDeptPer = 0;
                        bDeptPer = 100;
                        aTeamPer = 0;
                        bTeamPer = 100;
                        aMemPer = 0;
                        bMemPer = 100;
                    }

                    if(map.DUTY_CODE == "2" || map.DUTY_CODE == "3" || map.DUTY_CODE == "7"){
                        scoreF = (parseFloat(aDeptPer / 100 * map.EVAL_F_SCORE)).toFixed(1);
                    }else if(map.DUTY_CODE == "4" || map.DUTY_CODE == "5"){
                        scoreF = (parseFloat(aTeamPer / 100 * map.EVAL_F_SCORE)).toFixed(1);
                    }else{
                        scoreF = (parseFloat(aMemPer / 100 * map.EVAL_F_SCORE)).toFixed(1);
                    }

                    if(map.DUTY_CODE == "2" || map.DUTY_CODE == "3" || map.DUTY_CODE == "7"){
                        scoreS =  (parseFloat(bDeptPer / 100 * map.EVAL_S_SCORE)).toFixed(1);
                    }else if(map.DUTY_CODE == "4" || map.DUTY_CODE == "5"){
                        scoreS = (parseFloat(bTeamPer / 100 * map.EVAL_S_SCORE)).toFixed(1);
                    }else{
                        scoreS = (parseFloat(bMemPer / 100 * map.EVAL_S_SCORE)).toFixed(1);
                    }

                    var totalScore = (parseFloat(scoreS) + parseFloat(scoreF)).toFixed(1);

                    let resGrade = "-";
                    for (let k = 0; k < scoreList.length; k++) {
                        const scItem = scoreList[k];
                        // console.log("scItem", scItem);

                        if(scItem.EVAL_SCORE_B >= (parseFloat(totalScore) + parseFloat(map.EVAL_SCORE_MNG)) && (parseFloat(totalScore) + parseFloat(map.EVAL_SCORE_MNG)) >= scItem.EVAL_SCORE_A){
                            resGrade = scItem.EVAL_GRADE;
                        }
                    }

                    if(resGrade == "S"){
                        sCount ++;
                    }else if(resGrade == "A"){
                        aCount ++;
                    }else if(resGrade == "B"){
                        bCount ++;
                    }else if(resGrade == "C"){
                        cCount ++;
                    }
                }
                html += "     <td>"+sCount+"</td>";
                html += "     <td>"+aCount+"</td>";
                html += "     <td>"+bCount+"</td>";
                html += "     <td>"+cCount+"</td>";



                // 업적평가설정 버튼, rowspan 처리
                if (currentYear !== bsYear) {
                    var achieve = achieveList.find(l => l.BASE_YEAR == bsYear);
                    let ssCnt = 0;
                    let sCnt = 0;
                    let aCnt = 0;
                    let bCnt = 0;
                    let cCnt = 0;
                    let dCnt = 0;
                    let fCnt = 0;
                    if(achieve != null){
                        const evalAchieveEmpList = customKendo.fn_customAjax("/evaluation/getEvalAchieveResultList", {baseYear : bsYear}).rs;
                        for(var l = 0; l < evalAchieveEmpList.length; l++){
                            var orderScore = 0;
                            var salesScore = 0;
                            var revenueScore = 0;

                            if(evalAchieveEmpList[l].ORDER_GOALS != 0 && evalAchieveEmpList[l].ORDER_ACHIEVE != 0){
                                orderScore = Math.round(evalAchieveEmpList[l].ORDER_ACHIEVE/evalAchieveEmpList[l].ORDER_GOALS * 100);
                            }

                            if(evalAchieveEmpList[l].SALES_GOALS != 0 && evalAchieveEmpList[l].SALES_ACHIEVE != 0){
                                salesScore = Math.round(evalAchieveEmpList[l].SALES_ACHIEVE/evalAchieveEmpList[l].SALES_GOALS * 100);
                            }

                            if(evalAchieveEmpList[l].REVENUE_GOALS != 0 && evalAchieveEmpList[l].REVENUE_ACHIEVE != 0){
                                revenueScore = Math.round(evalAchieveEmpList[l].REVENUE_ACHIEVE/evalAchieveEmpList[l].REVENUE_GOALS * 100);
                            }

                            var orderScoreCon = evaluationList.getEvalRating(orderScore, 'con');
                            var salesScoreCon = evaluationList.getEvalRating(salesScore, 'con');
                            var revenueScoreCon = evaluationList.getEvalRating(revenueScore, 'con');
                            var scoreSum =
                                (orderScoreCon * (Number(achieve.ORDER_WEIGHTS) / 100)) +
                                (salesScoreCon * (Number(achieve.SALES_WEIGHTS) / 100)) +
                                (revenueScoreCon * (Number(achieve.REVENUE_WEIGHTS) / 100));

                            var scoreRating = evaluationList.getEvalRating(scoreSum, 'rating')

                            if(scoreRating == "SS"){
                                ssCnt++;
                            }else if(scoreRating == "S"){
                                sCnt++;
                            }else if(scoreRating == "A"){
                                aCnt++;
                            }else if(scoreRating == "B"){
                                bCnt++;
                            }else if(scoreRating == "C"){
                                cCnt++;
                            }else if(scoreRating == "D"){
                                dCnt++;
                            }else{
                                fCnt++;
                            }
                        }
                    }


                    currentYear = bsYear;  // 새로운 년도로 변경

                    html += "     <td style='padding: 0px;' rowspan='" + yearCount[bsYear] + "'>";
                    html += "         <button type='button' class='k-button k-button-solid-base' onclick='evalModify(" + (achieve != null ? achieve.EVAL_ACHIEVE_SET_SN : '') + ")' style='font-size: 11px;'>업적평가설정</button>";
                    html += "     </td>";
                    if(achieve != null){
                        html += "     <td onclick='evalAchieveResult("+ bsYear +")' style='cursor: pointer; text-decoration: underline; font-weight: bold' rowspan='" + yearCount[bsYear] + "'>" + achieve.EVAL_STR_DT + " ~ " + achieve.EVAL_END_DT + "</td>";
                    }else{
                        html += "     <td rowspan='" + yearCount[bsYear] + "'>-</td>";
                    }

                    html += "     <td rowspan='" + yearCount[bsYear] + "'>" + ssCnt +"</td>";
                    html += "     <td rowspan='" + yearCount[bsYear] + "'>" + sCnt +"</td>";
                    html += "     <td rowspan='" + yearCount[bsYear] + "'>" + aCnt +"</td>";
                    html += "     <td rowspan='" + yearCount[bsYear] + "'>" + bCnt +"</td>";
                    html += "     <td rowspan='" + yearCount[bsYear] + "'>" + cCnt +"</td>";
                    html += "     <td rowspan='" + yearCount[bsYear] + "'>" + dCnt +"</td>";
                    html += "     <td rowspan='" + yearCount[bsYear] + "'>" + fCnt +"</td>";
                }
                html += '</tr>';
            }
        }else{
            html += '<tr style="text-align: center;">';
            html += "     <td colspan='14'>데이터가 없습니다.</td>";
            html += '</tr>';
        }

        $('#evalList').append(html);
    }
    function evalModify(e){
        var url = "/evaluation/pop/evaluationSet.do";
        if(e){
            url += "?pk=" + e
        }

        var name = "_blank";
        var option = "width = 1500, height = 820, top = 100, left = 400, location = no";
        var popup = window.open(url, name, option);
    }

    function evalReqModify(pk){
        var url = "/evaluation/pop/evaluationReq.do?pk="+pk;

        var name = "_blank";
        var option = "width = 1400, height = 800, top = 100, left = 400, location = no";
        var popup = window.open(url, name, option);
    }
    function evalComModify(pk){
        var url = "/evaluation/pop/evaluationCom.do?pk="+pk;

        var name = "_blank";
        var option = "width = 1400, height = 800, top = 100, left = 400, location = no";
        var popup = window.open(url, name, option);
    }

    function empList(pk) {
        var url = "/evaluation/pop/evalResultMng.do?pk="+pk;
        var name = "_blank";
        var option = "width = 1500, height = 820, top = 100, left = 400, location = no";
        var popup = window.open(url, name, option);
    }

    function evalAchieveResult(baseYear) {
        var url = "/evaluation/pop/evalAchieveResult.do?baseYear="+baseYear;
        var name = "_blank";
        var option = "width = 1500, height = 820, top = 100, left = 400, location = no";
        var popup = window.open(url, name, option);
    }

    /*evaluationList.fn_defaultScript();*/

</script>
