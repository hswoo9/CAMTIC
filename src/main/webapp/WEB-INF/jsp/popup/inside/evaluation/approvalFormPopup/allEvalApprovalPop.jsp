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
        <h3 class="card-title">${data.baseYear}년도 역량/업적 평가결과</h3>
    </div>

    <table border="3" cellspacing="0" style="font-family:돋움체; table-layout: fixed;word-break: break-all; text-align: center;width:677px;font-size: 10pt;border-collapse:collapse;border:2px solid #000; margin-top:15px;">
        <thead>
        <tr>
            <th style="height:30px; background-color:#dee4ed; text-align:center;width: 100px" rowspan="2">부서명</th>
            <th style="height:30px; background-color:#dee4ed; text-align:center;width: 100px" rowspan="2">팀명</th>
            <th style="height:30px; background-color:#dee4ed; text-align:center;width: 60px" rowspan="2">성명</th>
            <th style="height:30px; background-color:#e2efda; text-align:center;width: 55px" colspan="4">역량평가</th>
            <th style="height:30px; background-color:#f2ceef; text-align:center;width: 55px" colspan="2">업적평가</th>
            <th style="height:30px; background-color:#c0e6f5; text-align:center;width: 55px" rowspan="2">최종점수</th>
            <th style="height:30px; background-color:#c0e6f5; text-align:center;width: 55px" rowspan="2">최종등급</th>
        </tr>
        <tr>
            <th style="height:30px; background-color:#e2efda; text-align:center;width: 55px">상반기</th>
            <th style="height:30px; background-color:#e2efda; text-align:center;width: 55px">하반기</th>
            <th style="height:30px; background-color:#e2efda; text-align:center;width: 55px">최종점수</th>
            <th style="height:30px; background-color:#e2efda; text-align:center;width: 55px">최종등급</th>
            <th style="height:30px; background-color:#f2ceef; text-align:center;width: 55px">최종점수</th>
            <th style="height:30px; background-color:#f2ceef; text-align:center;width: 55px">최종등급</th>
        </tr>
        </thead>
        <tbody id="allEvalTb">

        </tbody>
    </table>
</div>
<script>
    let formId = "201";
    dataSet();
    approvalDataInit();

    function approvalDataInit(){
        var now = new Date();

        var approvalParams = {};
        approvalParams.mod = "W";
        approvalParams.formId = formId;
        approvalParams.compSeq = "1000";
        approvalParams.empSeq = "${loginVO.uniqId}";
        approvalParams.docTitle = "[역량&업적 평가결과] ${data.baseYear}년 역량&업적 평가결과";
        approvalParams.content = $("#approveDataPop")[0].innerHTML;
        approvalParams.type = "drafting";
        approvalParams.menuCd = "allEval";
        approvalParams.docType = "A";
        approvalParams.customField = {
            documentTitle : "${data.baseYear}년 역량/업적 평가결과",
            criteria : '${data.baseYear}년'
        }
        approvalParams.linkageProcessId = "64";
        approvalParams.linkageType = "2";
        approvalParams.linkageProcessCode = "camticAllEval";
        approvalParams.approKey = "camticAllEval_${data.allEvalApproveGroup}";

        linkageProcessOn(approvalParams);
    }

    function dataSet (){
        var result = customKendo.fn_customAjax("/evaluation/getAllEvalApproveList", {
            allEvalApproveGroup : '${data.allEvalApproveGroup}'
        })
        var html = "";
        if(result.rs != null){
            var rs = result.rs;
            if(rs.length > 0){
                for(var i = 0; i < rs.length; i++){

                    html += '' +
                        '<tr>' +
                            '<td style="height:30px; text-align:center;">' +
                                '<p style="font-size:10px;">' + rs[i].DEPT_NAME + '</p>' +
                            '</td>' +
                            '<td style="height:30px; text-align:center;">' +
                                '<p style="font-size:10px;">' + rs[i].TEAM_NAME + '</p>' +
                            '</td>' +
                            '<td style="height:30px; text-align:center;">' +
                                '<p style="font-size:10px;">' + rs[i].EMP_NAME_KR + '</p>' +
                            '</td>' +

                            '<td style="height:30px; text-align:center;">' +
                                '<p style="font-size:10px;">' + rs[i].FIRST_HALF_SCORE + '</p>' +
                            '</td>' +
                            '<td style="height:30px; text-align:center;">' +
                                '<p style="font-size:10px;">' + rs[i].SECOND_HALF_SCORE + '</p>' +
                            '</td>' +
                            '<td style="height:30px; text-align:center;">' +
                                '<p style="font-size:10px;">' + rs[i].SCORE_AVERAGE + '</p>' +
                            '</td>' +
                            '<td style="height:30px; text-align:center;">' +
                                '<p style="font-size:10px;">' + rs[i].RES_GRADE + '</p>' +
                            '</td>' +
                            '<td style="height:30px; text-align:center;">' +
                                '<p style="font-size:10px;">' + rs[i].ACHIEVE_SCORE + '</p>' +
                            '</td>' +
                            '<td style="height:30px; text-align:center;">' +
                                '<p style="font-size:10px;">' + rs[i].ACHIEVE_RATING + '</p>' +
                            '</td>' +
                            '<td style="height:30px; text-align:center;">' +
                                '<p style="font-size:10px;">' + rs[i].FINAL_SCORE + '</p>' +
                            '</td>' +
                            '<td style="height:30px; text-align:center;">' +
                                '<p style="font-size:10px;">' + rs[i].FINAL_RATING + '</p>' +
                            '</td>' +
                        '</tr>';
                }
            }
        }

        $("#allEvalTb").append(html)
    }
</script>
</body>
</html>
