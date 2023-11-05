<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>

<body class="font-opensans" style="background-color:#fff;">
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/unRnd/lecture.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/unRnd/lecturePopup.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/unRnd/lecturePayReq.js?v=${today}'/>"></script>

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
<input type="hidden" id="pk" value="${params.pk}"/>
<input type="hidden" id="mode" value="${params.mode}"/>
<input type="hidden" id="type" name="type" />
<input type="hidden" id="list" value="${params.list}"/>

<div style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">
                <span style="position: relative; top: 3px;">
                    교육비 관리
                </span>
            </h3>
            <div id="purcBtnDiv" class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-info" onclick="lecturePayReq.fn_saveBtn()">저장</button>
                <button type="button" class="k-button k-button-solid-error" onclick="window.close()">닫기</button>
            </div>
        </div>

        <div class="col-md-12 col-sm-12" style="padding: 20px 30px;">
            <table class="popTable table table-bordered mb-0">
                <colgroup>
                    <col width="20%">
                    <col width="80%">
                </colgroup>
                <thead>
                <tr>
                    <th scope="row" class="text-center th-color">강좌명</th>
                    <td id="lecTitleBs"></td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">이름</th>
                    <td id="name"></td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">핸드폰</th>
                    <td>선택회원</td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">금액</th>
                    <td>
                        <input id="payAmt" oninput="onlyNumber(this)" onkeyup="fn_inputNumberFormat(this)" style="width: 140px; text-align: right" value="0">원
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">납부일자</th>
                    <td>
                        <input id="payDt" style="width: 150px">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">납부방법</th>
                    <td>
                        <input id="payType" style="width: 150px">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">계산서</th>
                    <td>
                        <input id="billType" style="width: 150px">
                    </td>
                </tr>
                </thead>
            </table>
        </div>
    </div>
</div>
<script type="text/javascript">
    lecturePayReq.fn_defaultScript();
</script>
</body>
</html>