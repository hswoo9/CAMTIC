<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/inside/attend/personAttendStatPop.js?v=${today}"/></script>

<!DOCTYPE html>
<html>
<body>
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
<input type="hidden" id="targetEmpSeq" value="${params.empSeq}"/>
<div class="card">
    <div class="card-header" style="padding:20px 0;">
        <div class="col-lg-11" style="margin:0 auto;">
            <div class="table-responsive">
                <table class="table table-bordered mb-0">
                    <colgroup>
                        <col width="40%">
                        <col width="60%">
                    </colgroup>
                    <tbody>
                    <tr>
                        <th colspan="2">근태 조정</th>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color"><span class="red-star"></span>일자</th>
                        <td><input type="text" id="targetDate" style="width: 100%;" value="${params.date}"></td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color"><span class="red-star"></span>이름 / 부서 / 직위</th>
                        <td><input type="text" id="userInfo" style="width: 100%;"></td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color"><span class="red-star"></span>출 / 퇴근 시각</th>
                        <td>
                            <input type="radio" name="workAllChk" class="radioV" id="workAllChkY" value="N" checked >
                            <label for="workAllChkY">조정 안함</label>
                            <input type="radio" name="workAllChk" class="radioV" id="workAllChkN" value="Y">
                            <label for="workAllChkN" style="margin-right:10px;">조정</label>
                            출근<input id="workTime" type="time" style="width: 40%; margin-left: 5px;">

                            <br>
                            <input type="radio" name="leaveAllChk" class="radioV" id="leaveAllChkY" value="N" checked >
                            <label for="leaveAllChkY">조정 안함</label>
                            <input type="radio" name="leaveAllChk" class="radioV" id="leaveAllChkN" value="Y">
                            <label for="leaveAllChkN" style="margin-right:10px;">조정</label>
                            퇴근<input id="leaveTime" type="time" style="width: 40%; margin-left: 5px;">
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color">변경 사유</th>
                        <td><textarea type="text" id="UseReason" style="width: 100%;"></textarea></td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="btn-st" style="float: right;">
                <input type="button" class="k-button k-button-solid k-button-solid-info" value="저장" onclick="attendAdjustment.fn_save()"/>
                <input type="reset" style="margin-right:5px;" class="k-button k-button-solid-error" value="취소"  onclick=""/>
            </div>
        </div>
    </div>
</div>


<script>
    attendAdjustment.fn_defaultScript();
</script>
</body>
</html>