<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/inside/asset/rprPop.js?v=${today}"/></script>
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
<body class="font-opensans" style="background-color:#fff;">
<div class="col-lg-11" style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">포상금지급 신청서</h3>
            <div class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">닫기</button>
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
                <th>지식재산권 선택</th>
                <td>
                    <input id="title" style="width:100%;" value="${resultMap.info.TITLE}" disabled>
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>발명자 / 저자
                </th>
                <td>
                    <input type="text" id="userText" style="width: 100%;" value="${resultMap.info.SHARE_NAME}" disabled>
                </td>
            </tr>
            <tr>
                <th>지분 입력</th>
                <td>
                    <table id="shareTd">
                        <c:forEach var="item" items="${resultMap.shareList}" varStatus="status">
                            <tr class='addData'>
                                <input type='hidden' class='shareEmpSeq' value='${item.EMP_SEQ}'/>
                                <th class='shareEmpName'>${item.EMP_NAME}</th>
                                <td><input type='text' id='share${item.EMP_SEQ}' style='width: 80%; text-align: right' class='share' value='${item.SHARE}' disabled/> %</td>
                            </tr>
                        </c:forEach>
                    </table>
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>지식재산권 종류
                </th>
                <td>
                    <input type="text" id="iprClass" style="width: 100%;" value="${resultMap.info.IPR_NAME}" disabled>
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>주요내용
                </th>
                <td>
                    <textarea type="text" id="detailCn" style="width: 100%; height: 60px" disabled></textarea>
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>등 록 번 호<br>학술지명,페이지<br>ISBN 등록번호
                </th>
                <td>
                    <textarea type="text" id="regNum" style="width: 100%; height: 60px" disabled></textarea>
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>신청일
                </th>
                <td>
                    <input type="text" id="regDate" style="width: 100%;" value="${resultMap.info.REG_DATE}" disabled>
                </td>
            </tr>
            </thead>
        </table>
        </div>
    </div>
</div>

<form id="rprResDraftFrm" method="post">
    <input type="hidden" id="menuCd" name="menuCd" value="rprRes">
    <input type="hidden" id="type" name="type" value="${type}">
    <input type="hidden" id="nowUrl" name="nowUrl" />
    <input type="hidden" id="inventionInfoSn" name="inventionInfoSn"/>
</form>

<script>
    $("#detailCn").val('${resultMap.info.DETAIL_CN}');
    $("#regNum").val('${resultMap.info.REG_NUM}');
    rpr.init();
</script>
</body>
</html>