<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/inside/bustrip/bustrip.js?v=${toDate}"></script>
<script type="text/javascript" src="/js/intra/inside/bustrip/bustripCostReqPop.js?v=${toDate}"/></script>
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
<input type="hidden" id="hrCostInfoSn" value="${params.key}"/>
<body class="font-opensans" style="background-color:#fff;">
<div class="col-lg-11" style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">국내출장 여비 등록</h3>
            <div class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-info" onclick="costReq.saveBtn()">저장</button>
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
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>적용일자
                </th>
                <td>
                    <input name="startDt" id="startDt" style="width: 120px;">
                    ~
                    <input name="endDt" id="endDt" style="width: 120px;">
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>구분
                </th>
                <td>
                    <input id="tripCode" style="width: 100%;">
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>여비
                </th>
                <td>
                    <input id="exnpCode" style="width: 100%;">
                </td>
            </tr>
            <tr id="detailTr" style="display: none">
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>세부항목
                </th>
                <td>
                    <input id="exnpDetailCode" style="width: 100%;">
                </td>
            </tr>
            <tr id="detail2Tr" style="display: none">
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>거리
                </th>
                <td>
                    <input id="km" oninput="onlyNumber(this)" style="width: 100px; text-align: right">km 이상
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>금액
                </th>
                <td>
                    <input id="costAmt" oninput="inputNumberFormat(this)" style="width: 100%;">
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>기타사항
                </th>
                <td>
                    <textarea id="remarkCn" style="width: 100%; height: 60px"></textarea>
                </td>
            </tr>
            </thead>
        </table>
        </div>
    </div>
</div>

<script>
    costReq.init();
</script>
</body>
</html>