<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/inside/document/snackPop.js?v=${today}"/></script>
<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="empName" value="${loginVO.name}"/>
<input type="hidden" id="deptName" value="${loginVO.orgnztNm}"/>
<input type="hidden" id="dutyName" value="${loginVO.dutyNm}"/>
<body class="font-opensans" style="background-color:#fff;">
<div class="col-lg-12" style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">식대 통계</h3>
            <div class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-info" onclick="snackStat.saveBtn();">저장</button>
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close();">취소</button>
            </div>
        </div>
        <form id="table-responsive" style="padding: 20px 30px;">
            <table class="searchTable table table-bordered mb-0" style="border: 0; margin-left: 20px;  margin-top : 5px; border: 1px solid #dedfdf; width: 1400px">
                <colgroup>
                    <col width="10%">
                    <col width="23%">
                    <col width="10%">
                    <col width="23%">
                    <col width="10%">
                    <col width="23%">
                </colgroup>
                <tr>
                    <th class="text-center th-color">부서</th>
                    <td>
                        <input type="text" id="dept" style="width: 200px;">
                    </td>
                    <th class="text-center th-color">팀</th>
                    <td>
                        <input type="text" id="team" style="width: 200px;">
                    </td>
                    <th class="text-center th-color">성명</th>
                    <td>
                        <input type="text" id="searchVal" style="width: 200px;">
                        <button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="historyReqPop.gridReload()">조회</button>
                    </td>
                </tr>
            </table>
        <table class="popTable table table-bordered mb-0">
            <colgroup>
                <col width="20%">
                <col width="30%">
                <col width="20%">
                <col width="30%">
            </colgroup>
            <thead>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>이용 일시
                </th>
                <td>
                    <input id="useDt" type="date" style="width: 50%;"> <input id="useHour" type="text" style="width: 40px;" maxlength="2" oninput="onlyNumber(this);">시 <input id="useMin" type="text" style="width: 40px;" maxlength="2" oninput="onlyNumber(this);">분
                </td>
                <th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>식대 구분
                </th>
                <td colspan>
                    <input type="text" id="snackType" style="width: 100%; margin-right:10px;">
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>이용자
                </th>
                <td>
                    <input type="text" id="userText" style="width: 65%;">
                    <input type="hidden" id="userSn" style="width: 65%;">
                    <button type="button" id="userMultiSelect" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" style="width:30%; height:27px; line-height:0;" onclick="fn_userMultiSelectPop();">
                        직원선택
                    </button>
                </td>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>결제 구분
                </th>
                <td colspan>
                    <input type="text" id="payType" style="width: 100%; margin-right:10px;">
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>거래확인 서류 수령자
                </th>
                <td>
                    <input type="text" id="chargeUser" style="width: 100%;">
                </td>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>법인카드
                </th>
                <td>
                    <input type="text" id="corporCard" style="width: 75%; text-align: right;">
                    <button type="button" id="cardSearch" disabled class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" style="width:20%; height:27px; line-height:0;" onclick="">
                        검색
                    </button>
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>주문처
                </th>
                <td colspan>
                    <input type="text" id="areaName" style="width: 65%;">
                    <button type="button" id="restaurantSearch" disabled class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" style="width:30%; height:27px; line-height:0;" onclick="">
                        음식점 선택
                    </button>
                </td>
                <th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>이용 금액
                </th>
                <td>
                    <input type="text" id="usAmount" style="width: 90%; text-align: right;" value=""> 원
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>이용 사유
                </th>
                <td colspan="3">
                    <textarea type="text" id="useReason" style="width: 100%;"></textarea>
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>영수증
                </th>
                <td colspan="3" style="padding:5px;">
                    <input type="file" id="file">
                </td>
            </tr>
            </thead>
        </table>
        </form>
    </div>
</div>

<script>
    snackStat.init();
</script>
</body>
</html>