<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/inside/document/snackPop.js?v=${today}"/></script>

<body class="font-opensans" style="background-color:#fff;">
<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="empName" value="${loginVO.name}"/>
<input type="hidden" id="deptName" value="${loginVO.orgnztNm}"/>
<input type="hidden" id="dutyName" value="${loginVO.dutyNm}"/>
<input type="hidden" id="snackInfoSn" value="${data.SNACK_INFO_SN}"/>

<div class="card">
    <div class="card-header" style="padding:20px 0;">
        <div class="col-lg-11" style="margin:0 auto;">
            <div class="table-responsive">
                <table class="table table-bordered mb-0">
                    <colgroup>
                        <col width="20%">
                        <col width="30%">
                        <col width="20%">
                        <col width="30%">
                    </colgroup>
                    <tbody>
                    <tr>
                        <th colspan="4">식대 사용 등록</th>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color"><span class="red-star"></span>이용 일시</th>
                        <td><input id="useDt" type="date" style="width: 50%;"> <input id="useHour" type="text" style="width: 40px;" maxlength="2" oninput="onlyNumber(this);">시 <input id="useMin" type="text" style="width: 40px;" maxlength="2" oninput="onlyNumber(this);">분</td>
                        <th scope="row" class="text-center th-color"><span class="red-star"></span>식대 구분</th>
                        <td colspan><input type="text" id="snackType" style="width: 100%; margin-right:10px;"></td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color"><span class="red-star"></span>이용자</th>
                        <td><input type="text" id="userText" style="width: 65%;">
                            <input type="hidden" id="userSn" style="width: 65%;">
                            <button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" style="width:30%; height:27px; line-height:0;" onclick="fn_userMultiSelectPop();">
                                직원선택
                            </button>
                        </td>
                        <th scope="row" class="text-center th-color"><span class="red-star"></span>결제 구분</th>
                        <td colspan><input type="text" id="payType" style="width: 100%; margin-right:10px;"></td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color"><span class="red-star"></span>거래확인 서류 수령자</th>
                        <td><input type="text" id="chargeUser" style="width: 100%;"></td>
                        <th scope="row" class="text-center th-color"><span class="red-star"></span>법인카드</th>
                        <td><input type="text" id="corporCard" style="width: 75%; text-align: right;">
                        <button type="button" id="CardSearch" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" style="width:20%; height:27px; line-height:0;" onclick="">
                            검색
                        </button>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color"><span class="red-star"></span>주문처</th>
                        <td colspan><input type="text" id="areaName" style="width: 65%;">
                            <button type="button" id="restaurantSearch" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" style="width:30%; height:27px; line-height:0;" onclick="">
                                음식점 선택
                            </button>
                        </td>
                        <th scope="row" class="text-center th-color"><span class="red-star"></span>이용 금액</th>
                        <td><input type="text" id="usAmount" style="width: 90%; text-align: right;" value=""> 원</td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color">이용 사유</th>
                        <td colspan="3"><textarea type="text" id="useReason" style="width: 100%;"></textarea></td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color">영수증</th>
                        <td colspan="3" style="padding:5px;"><input type="file"></td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="btn-st">
                <input type="button" class="k-button k-button-solid k-button-solid-info" value="저장" onclick="snackReq.saveBtn();"/>
                <input type="reset" style="margin-right:5px;" class="k-button k-button-solid-error" value="취소"  onclick=""/>
            </div>
        </div>
    </div>
</div>


<script>
    snackReq.init();
</script>
</body>
</html>