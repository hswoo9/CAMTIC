<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/inside/asset/equipmentUsePop.js?v=${today}"/></script>
<html>
<body class="font-opensans" style="background-color:#fff;">
    <div style="padding:0;">
        <div class="table-responsive">
            <div class="card-header pop-header">
                <h3 class="card-title title_NM">장비사용 등록</h3>
                <div class="btn-st popButton">
                    <button type="button" class="k-button k-button-solid-info" onclick="equipmentUsePop.equipUseSave()">등록</button>
                    <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">취소</button>
                </div>
            </div>
            <form id="table-responsive" style="padding: 20px 30px;">
                <input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">
                <input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}">
                <input type="hidden" id="positionCode" name="positionCode" value="${loginVO.positionCode}">
                <input type="hidden" id="deptSeq" name="deptSeq" value="${loginVO.orgnztId}">
                <input type="hidden" id="deptName" name="deptName" value="${loginVO.orgnztNm}">
                <input type="hidden" id="dutyCode" name="dutyCode" value="${loginVO.dutyCode}">
                <table class="popTable table table-bordered mb-0" style="margin-top: 10px;">
                    <colgroup>
                        <col width="20%">
                        <col width="30%">
                        <col width="20%">
                        <col width="30%">
                    </colgroup>
                    <thead>
                    <%--<tr>
                        <th colspan="4" style="font-size: 14px; font-weight:600;background-color: #00397f96; color: #fff;">장비사용 등록</th>
                    </tr>--%>
                    <tr>
                        <th scope="row" class="text-center th-color">
                            <span class="red-star">*</span>장비명
                        </th>
                        <td colspan="3"><input type="text" id="eqipmnGbnName" style="width: 30%;">
                            <input type="text" id="eqipmnName" style="width: 60%;">
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color">
                            <span class="red-star">*</span>사용기간
                        </th>
                        <td colspan="3">
                            <input id="usePdStrDe" type="date" style="width: 34.4%;"> ~
                            <input id="usePdEndDe" type="date" style="width: 34.4%;">
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color">
                            <span class="red-star">*</span>사용자
                        </th>
                        <td colspan="3">
                            <input type="text" id="userName" style="width: 30%;" disabled="disabled">
                            <button type="button" id="search" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" style="width:10%; height:27px; line-height:0;" onclick="userSearch();">
                                검색
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color">
                            <span class="red-star">*</span>작업내용
                        </th>
                        <td colspan="3"><input type="text" id="operCn" style="width: 100%;">
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color">
                            <span class="red-star">*</span>사용시간
                        </th>
                        <td colspan><input type="text" id="useTime" maxlength="3" oninput="onlyNumber(this);" style="width: 65%;"> 시간
                        </td>
                        <th scope="row" class="text-center th-color">
                            <span class="red-star">*</span>사용대금
                        </th>
                        <td><input type="text" id="useAmt" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" style="width: 90%; text-align: right;">원</td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color"><span class="red-star"></span>의뢰업체</th>
                        <td colspan="3"><input type="text" id="clientPrtpcoName" disabled style="width: 30%;">
                            <button type="button" id="search1" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" disabled style="width:10%; height:27px; line-height:0;" onclick="">
                                검색
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color">
                            <span class="red-star">*</span>업체구분
                        </th>
                        <td colspan="3"><input type="text" id="prtpcoGbnName" style="width: 34.4%;">
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color">
                            <span class="red-star">*</span>작성 일자
                        </th>
                        <td><input id="regDe" type="date" style="width: 100%;"></td>
                        <th scope="row" class="text-center th-color">
                            <span class="red-star">*</span>정렬순번
                        </th>
                        <td><input type="text" id="sortSn" style="width: 100%;"></td>
                    </tr>
                    </thead>
                </table>
            </form>
        </div>
    </div>
</div>


<script>
    equipmentUsePop.fn_defaultScript();

    function userSearch() {
        window.open("/common/deptListPop.do","조직도","width=750,height=650");
    }

</script>
</body>
</html>