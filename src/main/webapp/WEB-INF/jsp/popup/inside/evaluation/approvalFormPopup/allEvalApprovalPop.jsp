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
        <h3 class="card-title">${data.baseYear}년도 부서별 역량/업적 평가결과</h3>
    </div>

    <table border="3" cellspacing="0" style="font-family:돋움체; table-layout: fixed;word-break: break-all; text-align: center;width:677px;font-size: 10pt;border-collapse:collapse;border:2px solid #000; margin-top:15px;">
        <tr>
            <th style="height:30px; background-color:#dee4ed; text-align:center;width: 100px;" rowspan="2">부서명</th>
            <th style="height:30px; background-color:#dee4ed; text-align:center;width: 128px;" rowspan="2">팀명</th>
            <th style="height:30px; background-color:#dee4ed; text-align:center;width: 30px;" rowspan="2">인원</th>
            <th style="height:30px; background-color:#dee4ed; text-align:center;width: 30px;" colspan="2">SS</th>
            <th style="height:30px; background-color:#dee4ed; text-align:center;width: 30px;" colspan="2">S</th>
            <th style="height:30px; background-color:#dee4ed; text-align:center;width: 30px;" colspan="2">A</th>
            <th style="height:30px; background-color:#dee4ed; text-align:center;width: 30px;" colspan="2">B</th>
            <th style="height:30px; background-color:#dee4ed; text-align:center;width: 30px;" colspan="2">C</th>
        </tr>
        <tr>
            <th style="height:30px; background-color:#dee4ed; text-align:center;width: 43px">인원</th>
            <th style="height:30px; background-color:#dee4ed; text-align:center;width: 43px">비율</th>
            <th style="height:30px; background-color:#dee4ed; text-align:center;width: 43px" >인원</th>
            <th style="height:30px; background-color:#dee4ed; text-align:center;width: 43px" >비율</th>
            <th style="height:30px; background-color:#dee4ed; text-align:center;width: 43px" >인원</th>
            <th style="height:30px; background-color:#dee4ed; text-align:center;width: 43px" >비율</th>
            <th style="height:30px; background-color:#dee4ed; text-align:center;width: 43px" >인원</th>
            <th style="height:30px; background-color:#dee4ed; text-align:center;width: 43px">비율</th>
            <th style="height:30px; background-color:#dee4ed; text-align:center;width: 43px">인원</th>
            <th style="height:30px; background-color:#dee4ed; text-align:center;width: 43px">비율</th>
        </tr>
        <tr>
            <td style="height:30px; background-color:#fbe2d5; text-align:center;width: 120px" class="totalCnt" colspan="2">
                ${params.baseYear}년 평가(역량&업적) 결과
            </td>
            <td style="height:30px; background-color:#fbe2d5; text-align:center;width: 43px;" class="totalCnt" id="totalEmpCnt"></td>
            <td style="height:30px; background-color:#fbe2d5; text-align:center;width: 43px;" class="totalCnt" id="totalSSCnt"></td>
            <td style="height:30px; background-color:#fbe2d5; text-align:center;width: 43px;" class="totalCnt" id="totalSSAvg"></td>
            <td style="height:30px; background-color:#fbe2d5; text-align:center;width: 43px;" class="totalCnt" id="totalSCnt"></td>
            <td style="height:30px; background-color:#fbe2d5; text-align:center;width: 43px;" class="totalCnt" id="totalSAvg"></td>
            <td style="height:30px; background-color:#fbe2d5; text-align:center;width: 43px;" class="totalCnt" id="totalACnt"></td>
            <td style="height:30px; background-color:#fbe2d5; text-align:center;width: 43px;" class="totalCnt" id="totalAAvg"></td>
            <td style="height:30px; background-color:#fbe2d5; text-align:center;width: 43px;" class="totalCnt" id="totalBCnt"></td>
            <td style="height:30px; background-color:#fbe2d5; text-align:center;width: 43px;" class="totalCnt" id="totalBAvg"></td>
            <td style="height:30px; background-color:#fbe2d5; text-align:center;width: 43px;" class="totalCnt" id="totalCCnt"></td>
            <td style="height:30px; background-color:#fbe2d5; text-align:center;width: 43px;" class="totalCnt" id="totalCAvg"></td>
        </tr>
        <tbody id="statusTbody">

        </tbody>
    </table>
    <br><br>
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

        var deptList = [];
        if(result.rs != null){
            var rs = result.rs;
            if(rs.length > 0){
                for(var i = 0; i < rs.length; i++){
                    if (deptList.find(l => l.deptSeq == rs[i].DEPT_SEQ) == null) {
                        var data = {
                            deptSeq : rs[i].DEPT_SEQ,
                            deptName : rs[i].DEPT_NAME,
                            teamList : [],
                        }
                        deptList.push(data);
                    }else{
                        var teamList = deptList.find(l => l.deptSeq == rs[i].DEPT_SEQ).teamList;
                        var team = teamList.find(l => l.teamSeq == rs[i].TEAM_SEQ);
                        if (team == null) {
                            var team = {
                                teamSeq : rs[i].TEAM_SEQ,
                                teamName : rs[i].TEAM_NAME,
                                SS : 0,
                                S : 0,
                                A : 0,
                                B : 0,
                                C : 0
                            }

                            team[rs[i].FINAL_RATING]++

                            teamList.push(team)
                        }else{
                            team[rs[i].FINAL_RATING]++
                        }
                    }

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

                $("#statusTbody").empty()
                var html2 = "";
                if(deptList.length > 0) {
                    var totalSSEmpCnt = 0;
                    var totalSEmpCnt = 0;
                    var totalAEmpCnt = 0;
                    var totalBEmpCnt = 0;
                    var totalCEmpCnt = 0;

                    var totalSSAvg = 0;
                    var totalSAvg = 0;
                    var totalAAvg = 0;
                    var totalBAvg = 0;
                    var totalCAvg = 0;

                    for (var i = 0; i < deptList.length; i++) {

                        totalSSEmpCnt += deptList[i].teamList[0].SS;
                        totalSEmpCnt += deptList[i].teamList[0].S;
                        totalAEmpCnt += deptList[i].teamList[0].A;
                        totalBEmpCnt += deptList[i].teamList[0].B;
                        totalCEmpCnt += deptList[i].teamList[0].C;

                        var sum = deptList[i].teamList[0].SS + deptList[i].teamList[0].S +
                            deptList[i].teamList[0].A + deptList[i].teamList[0].B +
                            deptList[i].teamList[0].C

                        var SSAvg = 0
                        var SAvg = 0
                        var AAvg = 0
                        var BAvg = 0
                        var CAvg = 0

                        if (deptList[i].teamList[0].SS != 0) {
                            SSAvg = Math.round(deptList[i].teamList[0].SS / sum * 100);
                        }

                        if (deptList[i].teamList[0].S != 0) {
                            SAvg = Math.round(deptList[i].teamList[0].S / sum * 100);
                        }

                        if (deptList[i].teamList[0].A != 0) {
                            AAvg = Math.round(deptList[i].teamList[0].A / sum * 100);
                        }

                        if (deptList[i].teamList[0].B != 0) {
                            BAvg = Math.round(eptList[i].teamList[0].B / sum * 100);
                        }

                        if (deptList[i].teamList[0].C != 0) {
                            CAvg = Math.round(deptList[i].teamList[0].C / sum * 100);
                        }

                        html2 += '' +
                            '<tr>' +
                                '<td style="text-align:center;height:30px;" rowspan="' + deptList[i].teamList.length + '">' +
                                    '<p style="font-size:12px;">' + deptList[i].deptName + '</p>' +
                                '</td>' +
                                '<td style="text-align:center;height:30px;">' +
                                    '<p style="font-size:12px;">' + deptList[i].teamList[0].teamName + '</p>' +
                                '</td>' +
                                '<td style="text-align:center;height:30px;">' +
                                    '<p style="font-size:12px;">' + sum + '</p>' +
                                 '</td>' +
                                '<td style="text-align:center;height:30px;">' +
                                    '<p style="font-size:12px;">' + deptList[i].teamList[0].SS + '</p>' +
                                '</td>' +
                                '<td style="text-align:center;height:30px;">' +
                                    '<p style="font-size:12px;">' + SSAvg + '%</p>' +
                                '</td>' +
                                '<td style="text-align:center;height:30px;">' +
                                    '<p style="font-size:12px;">' + deptList[i].teamList[0].S + '</p>' +
                                '</td>' +
                                '<td style="text-align:center;height:30px;">' +
                                    '<p style="font-size:12px;">' + SAvg + '%</p>' +
                                '</td>' +
                                '<td style="text-align:center;height:30px;">' +
                                    '<p style="font-size:12px;">' + deptList[i].teamList[0].A + '</p>' +
                                '</td>' +
                                '<td style="text-align:center;height:30px;">' +
                                    '<p style="font-size:12px;">' + AAvg + '%</p>' +
                                '</td>' +
                                '<td style="text-align:center;height:30px;">' +
                                    '<p style="font-size:12px;">' + deptList[i].teamList[0].B + '</p>' +
                                '</td>' +
                                '<td style="text-align:center;height:30px;">' +
                                    '<p style="font-size:12px;">' + BAvg + '%</p>' +
                                '</td>' +
                                '<td style="text-align:center;height:30px;">' +
                                    '<p style="font-size:12px;">' + deptList[i].teamList[0].C + '</p>' +
                                '</td>' +
                                '<td style="text-align:center;height:30px;">' +
                                    '<p style="font-size:12px;">' + CAvg + '%</p>' +
                                '</td>' +
                            '</tr>';

                        for (var j = 1; j < deptList[i].teamList.length; j++) {
                            totalSSEmpCnt += deptList[i].teamList[j].SS;
                            totalSEmpCnt += deptList[i].teamList[j].S;
                            totalAEmpCnt += deptList[i].teamList[j].A;
                            totalBEmpCnt += deptList[i].teamList[j].B;
                            totalCEmpCnt += deptList[i].teamList[j].C;

                            var sum = deptList[i].teamList[j].SS + deptList[i].teamList[j].S +
                                deptList[i].teamList[j].A + deptList[i].teamList[j].B +
                                deptList[i].teamList[j].C;

                            var SSAvg = 0
                            var SAvg = 0
                            var AAvg = 0
                            var BAvg = 0
                            var CAvg = 0

                            if (deptList[i].teamList[j].SS != 0) {
                                SSAvg = Math.round(deptList[i].teamList[j].SS / sum * 100);
                            }

                            if (deptList[i].teamList[j].S != 0) {
                                SAvg = Math.round(deptList[i].teamList[j].S / sum * 100);
                            }

                            if (deptList[i].teamList[j].A != 0) {
                                AAvg = Math.round(deptList[i].teamList[j].A / sum * 100);
                            }

                            if (deptList[i].teamList[j].B != 0) {
                                BAvg = Math.round(eptList[i].teamList[j].B / sum * 100);
                            }

                            if (deptList[i].teamList[j].C != 0) {
                                CAvg = Math.round(deptList[i].teamList[j].C / sum * 100);
                            }

                            html2 += '' +
                                '<tr>' +
                                    '<td style="text-align:center;height:30px;">' +
                                        '<p style="font-size:12px;">' + deptList[i].teamList[j].teamName + '</p>' +
                                    '</td>' +
                                    '<td style="text-align:center;height:30px;">' +
                                        '<p style="font-size:12px;">' + sum + '</p>' +
                                    '</td>' +
                                    '<td style="text-align:center;height:30px;">' +
                                        '<p style="font-size:12px;">' + deptList[i].teamList[j].SS + '</p>' +
                                    '</td>' +
                                    '<td style="text-align:center;height:30px;">' +
                                        '<p style="font-size:12px;">' + SSAvg + '%</p>' +
                                    '</td>' +
                                    '<td style="text-align:center;height:30px;">' +
                                        '<p style="font-size:12px;">' + deptList[i].teamList[j].S + '</p>' +
                                    '</td>' +
                                    '<td style="text-align:center;height:30px;">' +
                                        '<p style="font-size:12px;">' + SAvg + '%</p>' +
                                    '</td>' +
                                    '<td style="text-align:center;height:30px;">' +
                                        '<p style="font-size:12px;">' + deptList[i].teamList[j].A + '</p>' +
                                    '</td>' +
                                    '<td style="text-align:center;height:30px;">' +
                                        '<p style="font-size:12px;">' + AAvg + '%</p>' +
                                    '</td>' +
                                    '<td style="text-align:center;height:30px;">' +
                                        '<p style="font-size:12px;">' + deptList[i].teamList[j].B + '</p>' +
                                    '</td>' +
                                    '<td style="text-align:center;height:30px;">' +
                                        '<p style="font-size:12px;">' + BAvg + '%</p>' +
                                    '</td>' +
                                    '<td style="text-align:center;height:30px;">' +
                                        '<p style="font-size:12px;">' + deptList[i].teamList[j].C + '</p>' +
                                    '</td>' +
                                    '<td style="text-align:center;height:30px;">' +
                                        '<p style="font-size:12px;">' + CAvg + '%</p>' +
                                    '</td>' +
                                '</tr>';
                        }
                    }

                    var totalSum = totalSSEmpCnt + totalSEmpCnt + totalAEmpCnt + totalBEmpCnt + totalCEmpCnt;
                    if (totalSSEmpCnt != 0) {
                        totalSSAvg = Math.round(totalSSEmpCnt / totalSum * 100);
                    }

                    if (totalSEmpCnt != 0) {
                        totalSAvg = Math.round(totalSEmpCnt / totalSum * 100);
                    }

                    if (totalAEmpCnt != 0) {
                        totalAAvg = Math.round(totalAEmpCnt / totalSum * 100);
                    }

                    if (totalBEmpCnt != 0) {
                        totalBAvg = Math.round(totalBEmpCnt / totalSum * 100);
                    }

                    if (totalCEmpCnt != 0) {
                        totalCAvg = Math.round(totalCEmpCnt / totalSum * 100);
                    }

                    $("#totalEmpCnt").html(totalSum);
                    $("#totalSSCnt").text(totalSSEmpCnt)
                    $("#totalSSAvg").text(totalSSAvg + "%")
                    $("#totalSCnt").text(totalSEmpCnt)
                    $("#totalSAvg").text(totalSAvg + "%")
                    $("#totalACnt").text(totalAEmpCnt)
                    $("#totalAAvg").text(totalAAvg + "%")
                    $("#totalBCnt").text(totalBEmpCnt)
                    $("#totalBAvg").text(totalBAvg + "%")
                    $("#totalCCnt").text(totalCEmpCnt)
                    $("#totalCAvg").text(totalCAvg + "%")

                    $("#statusTbody").html(html2)
                }
            }
        }

        $("#allEvalTb").append(html)
    }
</script>
</body>
</html>
