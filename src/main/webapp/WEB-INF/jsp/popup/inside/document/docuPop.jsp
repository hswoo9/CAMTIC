<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/inside/document/docuPop.js?v=${today}"/></script>
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
                <button type="button" class="k-button k-button-solid-info" onclick="">저장</button>
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
                <tr>
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
                        <span class="red-star"></span>계약건명
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
                        <input type="text" id="contractAmount" style="width: 90%; text-align: right;"> 원
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
                        <span class="red-star"></span>계약 업체(자)
                    </th>
                    <td colspan="3">
                        <input type="text" id="coName" style="width: 37%;" value=""><input type="hidden" id="coSn" style="width: 37%;" value="1">
                        <button type="button" id="search" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" style="width:100px; height:27px; line-height:0;" disabled>
                            검색
                        </button>
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
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>첨부
                    </th>
                    <td colspan="3" style="padding:5px;">
                        <input type="file">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>관련
                    </th>
                    <td colspan="3" style="padding:5px;">
                    </td>
                </tr>
                </thead>
            </table>
        </div>
    </div>
</div>


<script>
    docuContractReq.init();
</script>
</body>
</html>