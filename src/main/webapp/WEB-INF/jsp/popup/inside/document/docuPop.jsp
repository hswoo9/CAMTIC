<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<link rel="stylesheet" href="/css/icons.css">
<script type="text/javascript" src="/js/intra/inside/document/docuPop.js?v=${today}"/></script>
<script type="text/javascript" src="/js/loadingoverlay.min.js"/></script>
<script type="text/javascript" src="<c:url value='/js/postcode.v2.js?autoload=false'/>"></script>
<body class="font-opensans" style="background-color:#fff;">
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
<input type="hidden" id="documentSn" value="${data.documentContractSn}"/>
<div style="padding:0;">
    <div class="table-responsive">
        <input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">
        <input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}">
        <input type="hidden" id="positionCode" name="positionCode" value="${loginVO.positionCode}">
        <input type="hidden" id="deptSeq" name="deptSeq" value="${loginVO.orgnztId}">
        <input type="hidden" id="deptName" name="deptName" value="${loginVO.orgnztNm}">
        <input type="hidden" id="dutyCode" name="dutyCode" value="${loginVO.dutyCode}">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">계약대장</h3>
            <div class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-info" onclick="docuContractReq.saveBtn()">저장</button>
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">닫기</button>
            </div>
        </div>
        <div style="padding: 20px 30px;">
            <table class="popTable table table-bordered mb-0">
                <colgroup>
                    <col width="20%">
                    <col width="30%">
                    <col width="20%">
                    <col width="30%">
                </colgroup>
                <thead>
                <%--<tr>
                    <th colspan="4">계약대장</th>
                </tr>--%>
                <tr style="display: none;">
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>계약 기관
                    </th>
                    <td colspan="3">
                        <input type="text" id="mainClass" style="width: 150px; margin-right:10px;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>구분
                    </th>
                    <td>
                        <input type="text" id="class" style="width: 150px; margin-right:10px;">
                    </td>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>계약 일시
                    </th>
                    <td>
                        <input type="text" id="docuDe" style="width: 100%;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>계약 건명
                    </th>
                    <td colspan="3">
                        <input type="text" id="projectName" style="width: 100%;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>계약 금액
                    </th>
                    <td>
                        <input type="text" id="contractAmount" style="width: 90%; text-align: right;"  onkeyup="docuContractReq.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"> 원
                    </td>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>계약 기간
                    </th>
                    <td>
                        <input type="text" id="startDe" style="width: 45%;">
                        ~
                        <input type="text" id="endDe" style="width: 45%;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>계약 번호
                    </th>
                    <td>
                        <input type="text" id="projectNumber" style="width: 90%; text-align: right;">
                    </td>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>계약 업체(자)
                    </th>
                    <td>
                        <input type="text" id="coName" style="width: 50%;" value=""><input type="hidden" id="coSn" style="width: 37%;" value="1">
                        <button type="button" id="search" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" style="width:80px; height:27px; line-height:0;" disabled>
                            검색
                        </button>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>대 표 자
                    </th>
                    <td>
                        <input type="text" id="representative" style="width: 100%;">
                    </td>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>사업자번호
                    </th>
                    <td>
                        <input type="text" id="businessNumber" style="width: 100%;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>계약상대자 주소
                    </th>
                    <td colspan="3">
                        <input type="text" id="zipCode" name="zipCode" style="width: 20%" placeholder="우편번호">
                        <button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" style="width:50px; height:27px; line-height:0;"  onclick="docuContractReq.addrSearch()">
                            검색
                        </button>
                        <input type="text" id="addr" name="addr" style="width: 30%;" placeholder="도로명주소">
                        <input type="text" id="addrDetail" name="oldAddr" style="width: 30%;" placeholder="상세주소">
                        <input type="hidden" id="oldAddr" name="oldAddr" style="width: 30%;" placeholder="지번주소">
                        <span id="guide" style="color:#999;display:none"></span>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>비고
                    </th>
                    <td colspan="3">
                        <textarea type="text" id="remarkCn" style="width: 100%;"></textarea>
                    </td>
                </tr>
                </thead>
            </table>
            <%--<div style="margin-top: 20px; text-align: right;">
                <button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" style="width:50px; height:27px; line-height:0;" onclick="docuContractReq.fn_areaTrAdd();">
                    추가
                </button>
            </div>--%>
            <table class="popTable table table-bordered mb-0" id="productTable">
                <thead>
                    <tr>
                        <th scope="row" class="text-center th-color">
                            <span class="red-star"></span>품명
                        </th>
                        <th scope="row" class="text-center th-color">
                            <span class="red-star"></span>수량
                        </th>
                        <th scope="row" class="text-center th-color">
                            <span class="red-star"></span>단가
                        </th>
                        <th scope="row" class="text-center th-color">
                            <span class="red-star"></span>금액
                        </th>
                        <th scope="row" class="text-center th-color">
                            <span class="red-star"></span>비고
                        </th>
                    </tr>
                </thead>
                <tbody id="product">
                </tbody>
            </table>
        </div>
    </div>
</div>
<div id="docEditor" style="width: 960px;display: none; margin-top: 300px;"></div>
<script type="text/javascript" src="${hwpUrl}js/hwpctrlapp/utils/util.js"></script>
<script type="text/javascript" src="${hwpUrl}js/webhwpctrl.js"></script>
<script type="text/javascript" src="<c:url value='/js/hancom/hwp_DocCtrl.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/hancom/hwpCtrlApp.js'/>"></script>
<script>
    docuContractReq.init(JSON.parse('${params}'));



</script>
</body>
</html>