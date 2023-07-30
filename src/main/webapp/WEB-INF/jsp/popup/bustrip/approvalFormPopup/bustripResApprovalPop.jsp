<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<body>
<div id="approveDataPop">
    <table style="font-family:굴림;margin: 0 auto; max-width: none; border-collapse: separate; border-spacing: 0; empty-cells: show; border-width: 0; outline: 0; text-align: left; font-size:12px; line-height: 20px; width: 100%; ">
        <tr>
            <td style="border-width: 0 0 0 0; font-weight: normal; box-sizing: border-box;">
                <table border="1" style="border-collapse: collapse; margin-top: 0px;">
                    <tr>
                        <td style="height:25px;background-color:#FFE0E0; text-align:center; width: 200px"><p style="font-weight: bold;">소 속</p></td>
                        <td style="height:25px;background-color:#FFE0E0; text-align:center; width: 90px"><p style="font-weight: bold">직 위</p></td>
                        <td style="height:25px;background-color:#FFE0E0; text-align:center; width: 73px"><p style="font-weight: bold">성 명</p></td>
                        <td style="height:25px;background-color:#FFE0E0; text-align:center; width: 130px"><p style="font-weight: bold">비 고</p></td>
                        <td style="height:25px;background-color:#FFE0E0; text-align:center; width: 140px"><p style="font-weight: bold">서 명</p></td>
                    </tr>
                    <c:forEach var="list" items="${list}">
                        <tr>
                            <td style="height:25px;text-align:center;"><p>${list.deptNm} ${list.teamNm}</p></td>
                            <td style="height:25px;text-align:center;"><p>${list.positionNm}</p></td>
                            <td style="height:25px;text-align:center;"><p>${list.EMP_NAME}</p></td>
                            <td style="height:25px;text-align:center;"><p></p></td>
                            <td style="height:25px;text-align:center;"><p style="text-align: right">(서명)</p></td>
                        </tr>
                    </c:forEach>
                </table>
            </td>
        </tr>
    </table>
    <br>
    <table style="font-family:굴림;margin: 0 auto; max-width: none; border-collapse: separate; border-spacing: 0; empty-cells: show; border-width: 0; outline: 0; text-align: left; font-size:12px; line-height: 20px; width: 100%; ">
        <tr>
            <td style="border-width: 0 0 0 0; font-weight: normal; box-sizing: border-box;">
                <table border="1" style="border-collapse: collapse; margin-top: 0px;"><!-- 633 -->
                    <tr>
                        <td style="height:30px; background-color:#FFE0E0; text-align:center; width: 102px"><p style="font-weight: bold;">출장기간</p></td>
                        <td style="height:30px; width: 531px"><p>
                            ${rs.rs.TRIP_DAY_FR} ~ ${rs.rs.TRIP_DAY_TO}
                        </p></td>
                    </tr>
                    <tr>
                        <td style="height:30px; background-color:#FFE0E0; text-align:center; width: 102px"><p style="font-weight: bold;">출 장 지</p></td>
                        <td style="height:30px; width: 531px"><p>
                            ${rs.rs.VISIT_CRM} ${rs.rs.VISIT_LOC_SUB}
                        </p></td>
                    </tr>
                    <tr>
                        <td style="height:30px; background-color:#FFE0E0; text-align:center; width: 102px"><p style="font-weight: bold;">출장차량</p></td>
                        <td style="height:30px; width: 531px"><p>
                            <c:choose>
                                <c:when test="${rs.rs.USE_TRSPT == 1}">
                                    카니발
                                </c:when>
                                <c:when test="${rs.rs.USE_TRSPT == 5}">
                                    아반떼
                                </c:when>
                                <c:when test="${rs.rs.USE_TRSPT == 3}">
                                    트럭
                                </c:when>
                                <c:when test="${rs.rs.USE_TRSPT == 10}">
                                    자가
                                </c:when>
                                <c:when test="${rs.rs.USE_TRSPT == 0}">
                                    대중교통
                                </c:when>
                                <c:when test="${rs.rs.USE_TRSPT == 12}">
                                    모하비
                                </c:when>
                                <c:when test="${rs.rs.USE_TRSPT == 13}">
                                    솔라티
                                </c:when>
                                <c:when test="${rs.rs.USE_TRSPT == 14}">
                                    드론관제차량
                                </c:when>
                                <c:when test="${rs.rs.USE_TRSPT == 11}">
                                    기타
                                </c:when>
                            </c:choose>
                        </p></td>
                    </tr>
                    <tr>
                        <td style="height:120px; background-color:#FFE0E0; text-align:center; width: 102px"><p style="font-weight: bold;">출장결과</p></td>
                        <td style="height:120px; width: 531px"><p>
                            ${rs.rsRes.RESULT}
                        </p></td>
                    </tr>
                    <tr>
                        <td style="height:30px; background-color:#FFE0E0; text-align:center; width: 102px"><p style="font-weight: bold;">관련사업</p></td>
                        <td style="height:30px; width: 531px"><p>

                        </p></td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    <br>
    <table style="font-family:굴림;margin: 0 auto; max-width: none; border-collapse: separate; border-spacing: 0; empty-cells: show; border-width: 0; outline: 0; text-align: left; font-size:12px; line-height: 20px; width: 100%; ">
        <tr>
            <td style="border-width: 0 0 0 0; font-weight: normal; box-sizing: border-box;">
                <table border="1" style="border-collapse: collapse; margin-top: 0px;">
                    <tr>
                        <td style="height:25px;background-color:#FFE0E0; text-align:center; width: 65px"><p style="font-weight: bold;">이름</p></td>
                        <td style="height:25px;background-color:#FFE0E0; text-align:center; width: 63px"><p style="font-weight: bold">유류비</p></td>
                        <td style="height:25px;background-color:#FFE0E0; text-align:center; width: 63px"><p style="font-weight: bold">교통비</p></td>
                        <td style="height:25px;background-color:#FFE0E0; text-align:center; width: 63px"><p style="font-weight: bold">통행료</p></td>
                        <td style="height:25px;background-color:#FFE0E0; text-align:center; width: 63px"><p style="font-weight: bold">일비</p></td>
                        <td style="height:25px;background-color:#FFE0E0; text-align:center; width: 63px"><p style="font-weight: bold;">숙박비</p></td>
                        <td style="height:25px;background-color:#FFE0E0; text-align:center; width: 63px"><p style="font-weight: bold">식비</p></td>
                        <td style="height:25px;background-color:#FFE0E0; text-align:center; width: 63px"><p style="font-weight: bold">주차비</p></td>
                        <td style="height:25px;background-color:#FFE0E0; text-align:center; width: 63px"><p style="font-weight: bold">기타</p></td>
                        <td style="height:25px;background-color:#FFE0E0; text-align:center; width: 63px"><p style="font-weight: bold">합계</p></td>
                    </tr>
                    <c:set var = "oilTotal" value = "0" />
                    <c:set var = "trafTotal" value = "0" />
                    <c:set var = "trafDayTotal" value = "0" />
                    <c:set var = "tollTotal" value = "0" />
                    <c:set var = "dayTotal" value = "0" />
                    <c:set var = "eatTotal" value = "0" />
                    <c:set var = "parkingTotal" value = "0" />
                    <c:set var = "etcTotal" value = "0" />
                    <c:forEach var="exnpList" items="${exnpList}">
                        <tr>
                            <td style="height:25px;text-align:center;"><p>${exnpList.EMP_NAME}</p></td>
                            <td style="height:25px;text-align:center;"><p>${exnpList.OIL_COST}</p></td>
                            <td style="height:25px;text-align:center;"><p>${exnpList.TRAF_COST}</p></td>
                            <td style="height:25px;text-align:center;"><p>${exnpList.TRAF_DAY_COST}</p></td>
                            <td style="height:25px;text-align:center;"><p>${exnpList.TOLL_COST}</p></td>
                            <td style="height:25px;text-align:center;"><p>${exnpList.DAY_COST}</p></td>
                            <td style="height:25px;text-align:center;"><p>${exnpList.EAT_COST}</p></td>
                            <td style="height:25px;text-align:center;"><p>${exnpList.PARKING_COST}</p></td>
                            <td style="height:25px;text-align:center;"><p>${exnpList.ETC_COST}</p></td>
                            <td style="height:25px;text-align:center;"><p>${exnpList.TOT_COST}</p></td>
                        </tr>
                    </c:forEach>
                </table>
            </td>
        </tr>
    </table>
</div>
<script>
    approvalDataInit();

    function approvalDataInit(){
        var approvalParams = {};
        approvalParams.mod = "W";
        approvalParams.formId = "136";
        approvalParams.compSeq = "1000";
        approvalParams.empSeq = "${loginVO.uniqId}";
        approvalParams.content = $("#approveDataPop")[0].innerHTML;
        approvalParams.type = "drafting";
        approvalParams.menuCd = "bustripRes";
        approvalParams.docType = "A";

        approvalParams.linkageProcessId = "7";
        approvalParams.linkageType = "2";
        approvalParams.linkageProcessCode = "camticBustripRes";
        approvalParams.approKey = "camticBustripRes_${data.hrBizReqId}";

        linkageProcessOn(approvalParams);
    }
</script>
</body>
</html>
