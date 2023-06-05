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
<script type="text/javascript" src="/js/intra/inside/bustrip/carPop.js?v=${today}"/></script>

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
                        <col width="30%">
                        <col width="70%">
                    </colgroup>
                    <tbody>
                    <tr>
                        <th colspan="4">차량 사용 신청</th>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color"><span class="red-star"></span>운행 일시</th>
                        <td><input id="use_date" type="date" style="width: 20%;"><input id="use_time" type="time" style="width: 20%;">
                        ~<input id="use_date2" type="date" style="width: 20%;"><input id="use_time2" type="time" style="width: 20%;"></td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color"><span class="red-star"></span>사용 부서</th>
                        <td><input type="text" id="useDept" style="width: 40%;"></td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color"><span class="red-star"></span>사용 차량</th>
                        <td><input type="text" id="useCar" style="width: 40%;"></td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color">운행 구분</th>
                        <td><input type="text" id="raceDivision" style="width: 40%;"></input></td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color">운행 목적</th>
                        <td><input type="text" id="racePurpose" style="width: 100%;"></input></td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color">목적지</th>
                        <td><input type="text" id="destination" style="width: 100%;"></input></td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color">경유지</th>
                        <td><input type="text" id="waypoint" style="width: 100%;"></input></td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color">운행자</th>
                        <td><input type="text" id="driver" style="width: 20%;" value="홍길동">
                            <button type="button" id="staffSlect" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" style="width:15%; height:27px; line-height:0;" onclick="">
                                직원 선택
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color">긴급 연락처</th>
                        <td>성명 : <input type="text" id="name" style="width: 20%;"></input>
                            연락처 : <input type="text" id="tel" style="width: 30%;"></input>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color">신청 일자</th>
                        <td><input id="apply_date" type="date" style="width: 20%;"></input></td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="btn-st">
                <input type="button" style="margin-right:5px;" class="k-button k-rounded k-button-solid k-button-solid-info" value="결재 신청" onclick=""/>
                <input type="reset" style="margin-right:5px;" class="k-button k-button-solid-error k-rounded" value="삭제"  onclick=""/>
                <input type="reset" style="margin-right:5px;" class="k-button k-button-solid-error k-rounded" value="취소"  onclick=""/>
            </div>
        </div>
    </div>
</div>


<script>
    carPop.fn_defaultScript();
    overWk.fn_defaultScript();
</script>
</body>
</html>