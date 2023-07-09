<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/inside/bustrip/inBustripReqPop.js?v=${today}"></script>
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
<body class="font-opensans" style="background-color:#fff;">
<div class="col-lg-12" style="padding:0;">
    <div class="card-header" style="padding-top:45px;">
        <div class="col-lg-11" style="margin:0 auto;">
            <div class="table-responsive">
                <div class="popupTitleSt">관내출장 신청</div>
                <form id="inBustripReqPop">
                    <input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">
                    <input type="hidden" id="positionCode" name="positionCode" value="${loginVO.positionCode}">
                    <input type="hidden" id="deptSeq" name="deptSeq" value="${loginVO.orgnztId}">
                    <input type="hidden" id="dutyCode" name="dutyCode" value="${loginVO.dutyCode}">
                    <table class="table table-bordered mb-0" id="inBustripReqPopTb">
                        <colgroup>
                            <col width="10%">
                            <col width="30%">
                            <col width="20%">
                            <col width="30%">
                        </colgroup>
                        <thead>
                        <tr>
                            <th>사번</th>
                            <td>
                                <input type="text" id="empSeq" name="empNumber" class="defaultVal" value="${loginVO.uniqId}" style="width: 80%;">
                            </td>
                            <th>성명</th>
                            <td>
                                <input type="text" id="empName" name="empName" class="defaultVal" value="${loginVO.name}" style="width: 80%;">
                            </td>
                        </tr>
                        <tr>
                            <th>부서명</th>
                            <td>
                                <input type="text" id="deptName" name="deptName" class="defaultVal" value="${loginVO.orgnztNm}" style="width: 80%;">
                            </td>
                            <th>직급</th>
                            <td>
                                <input type="text" id="dutyName" name="dutyName" class="defaultVal" value="${loginVO.positionNm}" style="width: 80%;">
                            </td>
                        </tr>
                        <tr>
                            <th>구분</th>
                            <td>
                                <input type="text" id="tripCode" style="width: 80%;">
                            </td>
                            <th>관련사업</th>
                            <td>
                                <input type="text" id="project" style="width: 80%;">
                            </td>
                        </tr>
                        <tr>
                            <th>출장자</th>
                            <td colspan="3">
                                <input type="text" id="bustripAdd" readonly style="width: 80%;">
                                <button type="button" class="k-button k-button-solid-info" onclick="">출장자 추가</button>
                            </td>
                        </tr>
                        <tr>
                            <th>방문지</th>
                            <td>
                                <input type="text" id="visitLoc" style="width: 60%;">
                            </td>
                            <th>경유지</th>
                            <td>
                                <input type="text" id="visitLocSub" style="width: 60%;">
                            </td>
                        </tr>
                        <tr>
                            <th>출장일</th>
                            <td colspan="3">
                                <input type="text" id="date1" style="width: 40%"> <input type="text" id="time1" style="width: 25%"> ~ <input type="text" id="time2" style="width: 25%">
                            </td>
                        </tr>
                        <tr>
                            <th>업무차량</th>
                            <td>
                                <input type="radio" name="useCar" id="car1" value="N">
                                <label for="car1">미사용</label>
                                <input type="radio" name="useCar" id="car2" value="Y">
                                <label for="car2">사용</label>
                            </td>
                            <th>차량</th>
                            <td>
                                <input type="text" id="carList" style="width: 40%;">
                                <input type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" value="운행확인" onclick=""/><br>
                                <div class="mt5"></div>
                                이동거리
                                <input type="text" id="moveDst" style="width: 30%;"> Km
                            </td>
                        </tr>
                        <tr>
                            <th>출장목적</th>
                            <td colspan="3">
                                <input type="text" id="bustObj" style="width: 100%;">
                            </td>
                        </tr>
                        </thead>
                    </table>
                </form>
            </div>
            <div class="btn-st" style="margin-top:10px; text-align:center;">
                <input type="button" class="k-button k-button-solid-info" value="저장" onclick=""/>
                <input type="button" class="k-button k-button-solid-info" value="결재" onclick=""/>
                <input type="reset" style="margin-right:5px;" class="k-button k-button-solid-error" value="취소" onclick=""/>
            </div>
        </div>
    </div>
</div>
<script>
    inBustripReqPop.init();
</script>
</body>
