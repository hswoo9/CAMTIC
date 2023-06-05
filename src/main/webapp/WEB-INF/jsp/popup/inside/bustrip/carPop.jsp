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
                        <col width="20%">
                        <col width="30%">
                        <col width="20%">
                        <col width="30%">
                    </colgroup>
                    <tbody>
                    <tr>
                        <th colspan="4">차량 사용 신청(아직)</th>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color"><span class="red-star"></span>이용 일시</th>
                        <td><input id="use_date" type="date" style="width: 50%;"><input id="use_time" type="time" style="width: 50%;"></td>
                        <%--<td><input type="text" id="startDay" onchange="dateValidationCheck('startDay', this.value)" style="width: 100%;"></td>--%>
                        <th scope="row" class="text-center th-color"><span class="red-star"></span>식대 구분</th>
                        <td colspan><input type="text" id="mealsDivision" style="width: 100%; margin-right:10px;"></td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color"><span class="red-star"></span>이용자</th>
                        <td><input type="text" id="user" style="width: 65%;">
                            <button type="button" id="staffSlect" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" style="width:30%; height:27px; line-height:0;" onclick="">
                                직원 선택
                            </button>
                        </td>
                        <th scope="row" class="text-center th-color"><span class="red-star"></span>결제 구분</th>
                        <td colspan><input type="text" id="payDivision" style="width: 100%; margin-right:10px;"></td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color"><span class="red-star"></span>거래확인 서류 수령자</th>
                        <td><input type="text" id="recipient" style="width: 100%;" value="홍길동"></td>
                        <th scope="row" class="text-center th-color"><span class="red-star"></span>법인카드</th>
                        <td><input type="text" id="corporCard" style="width: 75%; text-align: right;">
                        <button type="button" id="CardSearch" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" style="width:20%; height:27px; line-height:0;" onclick="">
                            검색
                        </button>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color"><span class="red-star"></span>주문처</th>
                        <td colspan><input type="text" id="restaurant" style="width: 65%;">
                            <button type="button" id="restaurantSearch" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" style="width:30%; height:27px; line-height:0;" onclick="">
                                음식점 선택
                            </button>
                        </td>
                        <th scope="row" class="text-center th-color"><span class="red-star"></span>이용 금액</th>
                        <td><input type="text" id="usAmount" style="width: 100%; text-align: right;" value="원"></td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color">이용 사유</th>
                        <td colspan="3"><textarea type="text" id="UseReason" style="width: 100%;"></textarea></td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color">첨부</th>
                        <td colspan="3" style="padding:5px;"><input type="file"></td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="btn-st">
                <input type="button" class="k-button k-rounded k-button-solid k-button-solid-info" value="저장" onclick=""/>
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