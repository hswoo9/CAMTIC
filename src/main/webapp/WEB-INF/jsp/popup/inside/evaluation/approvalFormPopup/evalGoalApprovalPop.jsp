<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<c:set var="now" value="<%= new java.util.Date() %>" />
<fmt:formatDate value="${now}" var="nowYear" pattern="yyyy" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<body>
<div id="approveDataPop">
    <div class="card-header" style="padding: 5px;">
        <h3 class="card-title">${nowYear}년도 ${loginVO.teamNm} 재무 성과</h3>
        <span style="font-size: 12px;width: auto;text-align: right;">(단위:원)</span>
    </div>

    <table border="3" style="border-collapse: collapse;font-family:굴림;margin: 0 auto; max-width: none; border-collapse: separate; border-spacing: 0; empty-cells: show; border-width: 0; outline: 0; text-align: left; font-size:12px; line-height: 20px; width: 100%; ">
        <colgroup>
            <col width="9%">
            <col width="9%">
            <col width="9%">
            <col width="9%">
            <col width="9%">
            <col width="9%">
            <col width="9%">
            <col width="9%">
            <col width="9%">
            <col width="9%">
            <col width="9%">
        </colgroup>
        <thead>
        <tr>
            <th style="height:30px; background-color:#e2efda; text-align:center;width: 70px" rowspan="2">부서/팀명</th>
            <th style="height:30px; background-color:#e2efda; text-align:center;width: 125px" colspan="2">수주</th>
            <th style="height:30px; background-color:#fff2cc; text-align:center;width: 125px" colspan="2">매출</th>
            <th style="height:30px; background-color:#ddebf7; text-align:center;width: 125px" colspan="2">수익</th>
            <th style="height:30px; background-color:#fce4d6; text-align:center;width: 125px" colspan="2">비용</th>
            <th style="height:30px; background-color:#ffcc99; text-align:center;width: 125px" colspan="2">사업화지수</th>
        </tr>
        <tr>
            <th style="height:30px; background-color:#e2efda; text-align:center;width: 60px">목표</th>
            <th style="height:30px; background-color:#e2efda; text-align:center;width: 60px">달성</th>
            <th style="height:30px; background-color:#fff2cc; text-align:center;width: 60px">목표</th>
            <th style="height:30px; background-color:#fff2cc; text-align:center;width: 60px">달성</th>
            <th style="height:30px; background-color:#ddebf7; text-align:center;width: 60px">목표</th>
            <th style="height:30px; background-color:#ddebf7; text-align:center;width: 60px">달성</th>
            <th style="height:30px; background-color:#fce4d6; text-align:center;width: 60px">목표</th>
            <th style="height:30px; background-color:#fce4d6; text-align:center;width: 60px">달성</th>
            <th style="height:30px; background-color:#ffcc99; text-align:center;width: 60px">목표</th>
            <th style="height:30px; background-color:#ffcc99; text-align:center;width: 60px">달성</th>
        </tr>
        <tr>
            <td style="height:30px; text-align:center;">
                <p style="font-size:12px;">${loginVO.teamNm}</p>
            </td>
            <td style="height:30px; text-align:right;"><p style="font-size:12px;" id="teamOrderGoals">0</p></td>
            <td style="height:30px; text-align:right;"></td>
            <td style="height:30px; text-align:right;"><p style="font-size:12px;" id="teamSalesGoals">0</p></td>
            <td style="height:30px; text-align:right;"></td>
            <td style="height:30px; text-align:right;"><p style="font-size:12px;" id="teamRevenueGoals">0</p></td>
            <td style="height:30px; text-align:right;"></td>
            <td style="height:30px; text-align:right;"><p style="font-size:12px;" id="teamCostGoals">0</p></td>
            <td style="height:30px; text-align:right;"></td>
            <td style="height:30px; text-align:right;"><p style="font-size:12px;" id="teamCommerIndexGoals">0</p></td>
            <td style="height:30px; text-align:right;"></td>
        </tr>
    </table>
    <br><br>
    <div class="card-header" style="padding: 5px;margin-top: 20px;">
        <h3 class="card-title" style="">
            * ${nowYear}년도 ${loginVO.teamNm} 개인별 재무 성과
        </h3>
        <span style="font-size: 12px;width: auto;text-align: right;">(단위:원)</span>
    </div>

    <table border="3" style="font-family:굴림;margin: 0 auto; max-width: none; border-collapse: separate; border-spacing: 0; empty-cells: show; border-width: 0; outline: 0; text-align: left; font-size:12px; line-height: 20px; width: 100%; ">
        <colgroup>
            <col width="9%">
            <col width="9%">
            <col width="9%">
            <col width="9%">
            <col width="9%">
            <col width="9%">
            <col width="9%">
            <col width="9%">
            <col width="9%">
            <col width="9%">
            <col width="9%">
        </colgroup>
        <thead>
        <tr>
            <th style="height:30px; background-color:#e2efda; text-align:center;width: 70px" rowspan="2">구분</th>
            <th style="height:30px; background-color:#e2efda; text-align:center;width: 125px" colspan="2">수주</th>
            <th style="height:30px; background-color:#fff2cc; text-align:center;width: 125px" colspan="2">매출</th>
            <th style="height:30px; background-color:#ddebf7; text-align:center;width: 125px" colspan="2">수익</th>
            <th style="height:30px; background-color:#fce4d6; text-align:center;width: 125px" colspan="2">비용</th>
            <th style="height:30px; background-color:#ffcc99; text-align:center;width: 125px" colspan="2">사업화지수</th>
        </tr>
        <tr>
            <th style="height:30px; background-color:#e2efda; text-align:center;width: 60px">목표</th>
            <th style="height:30px; background-color:#e2efda; text-align:center;width: 60px">달성</th>
            <th style="height:30px; background-color:#fff2cc; text-align:center;width: 60px">목표</th>
            <th style="height:30px; background-color:#fff2cc; text-align:center;width: 60px">달성</th>
            <th style="height:30px; background-color:#ddebf7; text-align:center;width: 60px">목표</th>
            <th style="height:30px; background-color:#ddebf7; text-align:center;width: 60px">달성</th>
            <th style="height:30px; background-color:#fce4d6; text-align:center;width: 60px">목표</th>
            <th style="height:30px; background-color:#fce4d6; text-align:center;width: 60px">달성</th>
            <th style="height:30px; background-color:#ffcc99; text-align:center;width: 60px">목표</th>
            <th style="height:30px; background-color:#ffcc99; text-align:center;width: 60px">달성</th>
        </tr>
        </thead>
        <tbody id="teamEmpListTb">

        </tbody>
    </table>
</div>
<script>
    let formId = "199";
    dataSet();
    approvalDataInit();

    function approvalDataInit(){
        var now = new Date();

        var approvalParams = {};
        approvalParams.mod = "W";
        approvalParams.formId = formId;
        approvalParams.compSeq = "1000";
        approvalParams.empSeq = "${loginVO.uniqId}";
        approvalParams.docTitle = "[개인별 목표 설정]" + now.getFullYear() + "년 ${loginVO.orgnztNm} (개인목표)";
        approvalParams.content = $("#approveDataPop")[0].innerHTML;
        approvalParams.type = "drafting";
        approvalParams.menuCd = "evalGoal";
        approvalParams.docType = "A";
        approvalParams.customField = {
            documentTitle : now.getFullYear() + "년 ${loginVO.orgnztNm} (개인목표)",
            criteria : '${nowYear}년'
        }
        approvalParams.linkageProcessId = "62";
        approvalParams.linkageType = "2";
        approvalParams.linkageProcessCode = "camticEvalGoal";
        approvalParams.approKey = "camticEvalGoal_${data.evalGoalTempGroup}";

        linkageProcessOn(approvalParams);
    }

    function dataSet (){
        var result = customKendo.fn_customAjax("/evaluation/getEvalGoalTempList", {evalGoalTempGroup : '${data.evalGoalTempGroup}'})
        var html = "";
        var teamOrderGoals = 0;
        var teamSalesGoals = 0;
        var teamRevenueGoals = 0;
        var teamCostGoals = 0;

        if(result.rs != null){
            var rs = result.rs.filter(e => e.DUTY_CODE != "5");
            if(rs.length > 0){
                for(var i = 0; i < rs.length; i++){
                    teamOrderGoals += Number(rs[i].ORDER_GOALS);
                    teamSalesGoals += Number(rs[i].SALES_GOALS);
                    teamRevenueGoals += Number(rs[i].REVENUE_GOALS);
                    teamCostGoals += Number(rs[i].COST_GOALS);

                    html += '' +
                        '<tr>' +
                            '<td style="height:30px; text-align:center;">' +
                                '<p style="font-size:12px;">' + rs[i].EMP_NAME_KR + '</p>' +
                            '</td>' +
                            '<td style="height:30px; text-align:right;" class="empOrderGoals">' +
                                '<p style="font-size:12px;">' + comma(rs[i].ORDER_GOALS) + '</p>' +
                            '</td>' +
                            '<td style="height:30px; text-align:right;"></td>' +

                            '<td style="height:30px; text-align:right;" class="empSalesGoals">' +
                                '<p style="font-size:12px;">' + comma(rs[i].SALES_GOALS) + '</p>' +
                            '</td>' +
                            '<td style="height:30px; text-align:right;"></td>' +

                            '<td style="height:30px; text-align:right;" class="empRevenueGoals">' +
                                '<p style="font-size:12px;">' + comma(rs[i].REVENUE_GOALS) + '</p>' +
                            '</td>' +
                            '<td style="height:30px; text-align:right;"></td>' +

                            '<td style="height:30px; text-align:right;" class="empCostGoals">' +
                                '<p style="font-size:12px;">' + comma(rs[i].COST_GOALS) + '</p>' +
                            '</td>' +
                            '<td style="height:30px; text-align:right;"></td>' +

                            '<td style="height:30px; text-align:right;" class="empCommerIndexGoals">' +
                                '<p style="font-size:12px;">' + rs[i].COMMER_INDEX_GOALS + '</p>' +
                            '</td>' +
                            '<td style="height:30px; text-align:right;"></td>' +
                        '</tr>';
                }

                $("#teamOrderGoals").text(comma(teamOrderGoals));
                $("#teamSalesGoals").text(comma(teamSalesGoals));
                $("#teamRevenueGoals").text(comma(teamRevenueGoals));
                $("#teamCostGoals").text(comma(teamCostGoals));

                var teamCommerIndexGoals = 0;
                if(teamRevenueGoals != 0 && teamCostGoals != 0){
                    let result = (teamRevenueGoals / teamCostGoals) * 100 || 0;
                    teamCommerIndexGoals = Math.round(result * 10) / 10;
                }

                $("#teamCommerIndexGoals").text(teamCommerIndexGoals);
            }
        }

        $("#teamEmpListTb").append(html)
    }
</script>
</body>
</html>
