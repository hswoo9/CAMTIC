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
<script type="text/javascript" src="/js/intra/inside/asset/equipmentUseUpdatePop.js?v=${today}"/></script>

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
                <input type="hidden" id="eqipmnUseSn" name="eqipmnUseSn" value="${pk}">
                <table class="table table-bordered mb-0">
                    <colgroup>
                        <col width="20%">
                        <col width="30%">
                        <col width="20%">
                        <col width="30%">
                    </colgroup>
                    <tbody>
                    <tr>
                        <th colspan="4">장비사용 등록 수정</th>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color"><span class="red-star"></span>장비명</th>
                        <td colspan="3"><input type="text" id="eqipmnGbnName" style="width: 30%;">
                            <input type="text" id="eqipmnName" style="width: 60%;">
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color"><span class="red-star"></span>사용기간</th>
                        <td colspan="3">
                            <input id="usePdStrDe" type="date" style="width: 34.4%;"> ~
                            <input id="usePdEndDe" type="date" style="width: 34.4%;">
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color"><span class="red-star"></span>사용자</th>
                        <td colspan="3">
                            <input type="text" id="userName" style="width: 30%;" disabled="disabled">
                            <button type="button" id="search" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" style="width:10%; height:27px; line-height:0;" onclick="userSearch();">
                                검색
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color"><span class="red-star"></span>작업내용</th>
                        <td colspan="3"><input type="text" id="operCn" style="width: 100%;">
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color"><span class="red-star"></span>사용시간</th>
                        <td colspan><input type="text" id="useTime" style="width: 65%;"> 시간
                        </td>
                        <th scope="row" class="text-center th-color"><span class="red-star"></span>사용대금</th>
                        <td><input type="text" id="useAmt" style="width: 90%; text-align: right;">원</td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color"><span class="red-star"></span>의뢰업체</th>
                        <td colspan="3"><input type="text" id="clientPrtpcoName" style="width: 30%;">
                            <button type="button" id="search1" class="k-grid-button k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" style="width:10%; height:27px; line-height:0;" onclick="">
                                검색
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color">업체구분</th>
                        <td colspan="3"><input type="text" id="prtpcoGbnName" style="width: 34.4%;">
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color"><span class="red-star"></span>작성 일자</th>
                        <td><input id="regDe" type="date" style="width: 100%;"></td>
                        <th scope="row" class="text-center th-color"><span class="red-star"></span>정렬순번</th>
                        <td><input type="text" id="sortSn" style="width: 100%;"></td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="btn-st" style="text-align:center; margin-top: 5px;">
                <input type="button" id="save" class="k-button k-rounded k-button-solid k-button-solid-info" value="수정" onclick="equipmentUseUpdatePop.equipUpdate()"/>
                <input type="reset" style="margin-right:5px;" class="k-button k-button-solid-error k-rounded" value="취소"  onclick="window.close()"/>
            </div>
        </div>
    </div>
</div>


<script>
    equipmentUseUpdatePop.fn_defaultScript();

    function userSearch() {
        window.open("/common/deptListPop.do","조직도","width=750,height=650");
    }

</script>
</body>
</html>