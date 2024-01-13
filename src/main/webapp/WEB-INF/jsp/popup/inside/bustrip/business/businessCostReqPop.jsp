<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/inside/bustrip/bustrip.js?v=${today}"></script>
<script type="text/javascript" src="/js/intra/inside/bustrip/business/businessCostReqPop.js?v=${today}"/></script>
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
<input type="hidden" id="hrCostInfoSn" value=""/>
<body class="font-opensans" style="background-color:#fff;">
<div class="col-lg-11" style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">해외출장 여비 등록</h3>
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
                    <span class="red-star"></span>등급
                </th>
                <td>
                    <input id="nationCode" style="width: 100%;">
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>구분
                </th>
                <td>
                    <input id="exnpCode" style="width: 100%;">
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>직책
                </th>
                <td>
                    <input id="dutyCode" style="width: 100%;">
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>환율
                </th>
                <td>
                    <input id="exchangeRate" style="text-align: right; width: 30%;" value="1,400" disabled> 원
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>금액($)
                </th>
                <td>
                    <input id="costAmt" oninput="onlyNumber(this)" onkeyup="costReq.calc(this)" style="text-align: right; width: 30%;"> <b>$</b>
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>원화(원)
                </th>
                <td>
                    <input id="costWon" style="text-align: right; width: 30%;" disabled> 원
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