<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/inside/asset/rprReceiptReqPop.js?v=${today}"/></script>
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
<input type="hidden" id="inventionInfoSn" name="inventionInfoSn" value="${data.inventionInfoSn}"/>
<input type="hidden" id="relatedFileNo" name="relatedFileNo" value="${data.relatedFileNo}"/>
<input type="hidden" id="relatedAfileNo" name="relatedAfileNo" value="${data.relatedAfileNo}"/>
<input type="hidden" id="quoFileNo" name="quoFileNo" value="${data.quoFileNo}"/>
<body class="font-opensans" style="background-color:#fff;">
<div class="col-lg-11" style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">지식재산권 등록</h3>
            <div class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-info" onclick="rprReceiptReq.saveBtn()">등록</button>
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">취소</button>
            </div>
        </div>
        <div style="padding: 20px 30px;">
        <table class="popTable table table-bordered mb-0">
            <colgroup>
                <col width="30%">
                <col width="70%">
            </colgroup>
            <thead>
            <%--<tr>
                <th colspan="2">직무발명 신고</th>
            </tr>--%>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>발명자 / 저자
                </th>
                <td>
                    <input type="text" id="userText" style="width: 70%;">
                    <input type="hidden" id="userSn" style="width: 70%;">
                    <button type="button" id="staffSlect" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" style="width:80px; height:27px; line-height:0;" onclick="fn_userMultiSelectPop()">
                        직원 선택
                    </button>
                </td>
            </tr>
            <tr style="display:none;" id="shareTr">
                <th>지분 입력</th>
                <td id="shareTd">

                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>지식재산권 종류
                </th>
                <td>
                    <input type="text" id="iprClass" style="width: 100%;">
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>상태
                </th>
                <td>
                    <input type="text" id="state" style="width: 100%;">
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>유지여부
                </th>
                <td>
                    <input type="text" id="tain" style="width: 100%;">
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>기술이전
                </th>
                <td>
                    <input type="text" id="tech" style="width: 100%;">
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>대외비
                </th>
                <td>
                    <input type="text" id="confidentiality" style="width: 100%;">
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>지식재산권 명칭
                </th>
                <td>
                    <input type="text" id="title" style="width: 100%;">
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>단독/공동
                </th>
                <td>
                    <input type="text" id="single" style="width: 100%;">
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>출원인
                </th>
                <td>
                    <input type="text" id="applicantName" style="width: 100%;">
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>주요내용
                </th>
                <td>
                    <textarea type="text" id="detailCn" style="width: 100%; height: 60px"></textarea>
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>출원번호
                </th>
                <td>
                    <input type="text" id="applicantNum" style="width: 100%;">
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>출원일자
                </th>
                <td>
                    <input type="text" id="applicantDt" style="width: 100%;">
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>출원국
                </th>
                <td>
                    <input type="text" id="applicantNation" style="width: 100%;">
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>등록번호
                </th>
                <td>
                    <input type="text" id="regNum" style="width: 100%;">
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>등록일자
                </th>
                <td>
                    <input type="text" id="regDate" style="width: 100%;">
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>존속만료일
                </th>
                <td>
                    <input type="text" id="expirationDt" style="width: 100%;">
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>증빙(출원)
                </th>
                <td colspan="3" style="padding:5px;">
                    <label for="appliFile" class="k-button k-button-solid-base">파일첨부</label>
                    <input type="file" id="appliFile" name="appliFile" onchange="rprReceiptReq.fileChange(this)" style="display: none" multiple="multiple">
                    <span id="appliFileName"></span>
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>증빙(등록)
                </th>
                <td colspan="3" style="padding:5px;">
                    <label for="regFile" class="k-button k-button-solid-base">파일첨부</label>
                    <input type="file" id="regFile" name="regFile" onchange="rprReceiptReq.fileChange(this)" style="display: none" multiple="multiple">
                    <span id="regFileName"></span>
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>비고
                </th>
                <td>
                    <textarea type="text" id="remarkCn" style="width: 100%; height: 60px"></textarea>
                </td>
            </tr>
            </thead>
        </table>
        </div>
    </div>
</div>

<script>
    rprReceiptReq.init();
</script>
</body>
</html>