<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<style>
    .removeDay{
        text-decoration:line-through;
        font-weight:700;
        color:red
    }
    .k-grid-toolbar{
        justify-content: flex-end !important;
    }
    .k-grid-norecords{
        justify-content: space-around;
    }
    .k-grid tbody tr{
        height: 38px;
    }
    #wptDiv{
        margin: 0 auto;
        width: 100px;
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: space-around;
    }
    #wptDiv > label {
        margin : 0
    }
    #timeDiff{
        height: 255px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
<script type="text/javascript" src="/js/intra/inside/attend/personAttendStatPop.js?v=${today}"/></script>

<!DOCTYPE html>
<html>
<body>
<div class="card">
    <div class="card-header" style="padding:20px 0;">
        <div class="col-lg-11" style="margin:0 auto;">
            <div class="table-responsive">
                <input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">
                <input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}">
                <input type="hidden" id="positionCode" name="positionCode" value="${loginVO.positionCode}">
                <input type="hidden" id="deptSeq" name="deptSeq" value="${loginVO.orgnztId}">
                <input type="hidden" id="deptName" name="deptName" value="${loginVO.orgnztNm}">
                <input type="hidden" id="dutyCode" name="dutyCode" value="${loginVO.dutyCode}">
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
                        <td><input type="text" id="time" style="width: 100%;" value="2023-02-02"></td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color"><span class="red-star"></span>이름 / 부서 / 직위</th>
                        <td><input type="text" id="user" style="width: 100%;" value="김영희 / 경영지원실 / 주임행정원"></td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color"><span class="red-star"></span>근태 항목</th>
                        <td><input type="radio" name="attendAllChk" class="radioV" id="attendAllChkY" value="Y" checked >
                            <label for="attendAllChkY">조정 안함</label>
                            <input type="radio" name="attendAllChk" class="radioV" id="attendAllChkN" value="N">
                            <label for="attendAllChkN" style="margin-right:10px;">조정</label>
                            <input type="text" id="attendanceItems" style="width: 40%;">
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color"><span class="red-star"></span>출 / 퇴근 시각</th>
                        <td>
                            <input type="radio" name="workAllChk" class="radioV" id="workAllChkY" value="Y" checked >
                            <label for="workAllChkY">조정 안함</label>
                            <input type="radio" name="workAllChk" class="radioV" id="workAllChkN" value="N">
                            <label for="workAllChkN" style="margin-right:10px;">조정</label>
                            출근<input id="work_time" type="time" style="width: 40%; margin-left: 5px;">

                            <br>
                            <input type="radio" name="leaveAllChk" class="radioV" id="leaveAllChkY" value="Y" checked >
                            <label for="leaveAllChkY">조정 안함</label>
                            <input type="radio" name="leaveAllChk" class="radioV" id="leaveAllChkN" value="N">
                            <label for="leaveAllChkN" style="margin-right:10px;">조정</label>
                            퇴근<input id="leave_time" type="time" style="width: 40%; margin-left: 5px;">
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color">변경 사유</th>
                        <td><textarea type="text" id="UseReason" style="width: 100%;"></textarea></td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="btn-st">
                <input type="button" class="k-button k-button-solid k-button-solid-info" value="저장" onclick=""/>
                <input type="reset" style="margin-right:5px;" class="k-button k-button-solid-error" value="취소"  onclick=""/>
            </div>
        </div>
    </div>
</div>


<script>
    personAttendStatPop.fn_defaultScript();
    overWk.fn_defaultScript();
</script>
</body>
</html>