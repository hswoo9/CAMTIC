<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<script type="text/javascript" src="<c:url value='/js/kendoui/cultures/kendo.culture.ko-KR.min.js'/>"></script>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/inside/asset/equipmentmangePop.js?v=${today}"/></script>
<!DOCTYPE html>
<body class="font-opensans" style="background-color:#fff;">
<div class="col-lg-12" style="padding:0;">
    <div class="card-header pop-header">
        <h3 class="card-title title_NM">장비관리</h3>
        <div class="btn-st popButton">
            <button type="button" class="k-button k-button-solid-info" onclick="bookRegisPop.fn_bkSave();">저장</button>
            <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">취소</button>
        </div>
    </div>
    <div class="panel-body">
        <table class="searchTable table table-bordered">
            <colgroup>
                <col width="10%">
                <col width="40%">
                <col width="10%">
                <col width="40%">
            </colgroup>
            <tr>
                <th class="text-center th-color">구분</th>
                <td>
                    <input type="text" id="mainEqipmnGbnName" style="width: 200px;">
                </td>
                <th class="text-center th-color">장비명</th>
                <td>
                    <input type="text" id="mainEqipmnName" style="width: 200px;">
                    <button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="equipmentmangePop.mainGrid();">조회</button>
                </td>
            </tr>
        </table>
        <div class="col-md-6 col-lg-6 dash-left mt10" style="border: 1px solid #d5d5d5;">
            <div class="mt10"></div>
            <span style="font-weight: bold;">· 장비목록</span>
            <div id="mainGrid" style="margin:10px 0;"></div>
        </div>
        <div class="col-md-6 col-lg-6 dash-left mt-10" style="border: 1px solid #d5d5d5; height: 543px;">
            <div class="mt10"></div>
            <span style="font-weight: bold;">· 장비등록</span>
            <div style="float:right;">
                <button type="button" id="save" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="equipmentmangePop.equipSave()">
                    저장
                </button>
            </div>
            <table class="popTable table table-bordered mb-0 mt10" id="" style="margin-top: 20px;">
                <colgroup>
                    <col width="25%">
                    <col width="25%">
                    <col width="25%">
                    <col width="25%">
                </colgroup>
                <thead>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>구분</th>
                    <td colspan><input type="text" id="eqipmnGbnName" style="width: 150px;">
                    </td>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>장비명</th>
                    <td><input type="text" id="eqipmnName" style="width: 150px;"></td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>담당자</th>
                    <td colspan="3">
                        <input type="text" id="regtrName" style="width: 65%;" disabled="disabled">
                        <!-- emp_seq -->
                        <input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
                        <input type="hidden" id="deptSeq" value="${loginVO.orgnztId}"/>
                        <input type="hidden" id="deptName" value="${loginVO.orgnztNm}"/>
                        <button type="button" id="search1" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" style="width:15%; height:27px; line-height:0;" onclick="regSearch();">
                        검색
                        </button>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>등록 일자</th>
                    <td colspan>
                        <input type="date" id="regDe" style="width: 100%;">
                    </td>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>정렬순번</th>
                    <td><input type="text" id="sortSn" style="width: 150px;"></td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>시간당 <br>사용대금</th>
                    <td colspan="3">
                        <input type="text" id="hourlyUsageFee" class="numberInput" style="width: 100%;" onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                    </td>
                </tr>
                </thead>
            </table>
        </div><!-- table-responsive -->
    </div>
</div><!-- col-md-9 -->

<script>
    equipmentmangePop.fn_defaultScript();
    equipmentmangePop.mainGrid();
    equipmentmangePop.dataClear();

    function regSearch() {
        window.open("/common/deptListPop.do","조직도","width=750,height=650");
    }
</script>
</body>
</html>