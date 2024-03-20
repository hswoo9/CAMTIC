<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="<c:url value='/js/kendoui/cultures/kendo.culture.ko-KR.min.js'/>"></script>
<script type="text/javascript" src="/js/intra/inside/asset/equipAppPop.js?v=${today}"/></script>
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
<body>
<div class="card">
    <div class="card-header" style="padding:20px 0;">
        <div class="col-lg-11" style="margin:0 auto;">
            <div class="table-responsive">
                <table class="table table-bordered mb-0">
                    <colgroup>
                        <col width="30%">
                        <col width="70%">
                    </colgroup>
                    <tbody>
                    <tr>
                        <th colspan="2">장비사용현황</th>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color"><span class="red-star"></span>조회년월</th>
                        <td>
                            <form id="equipDraftFrm" method="post">
                                <input type="hidden" id="eqipnmApprovalSn" name="eqipnmApprovalSn" value="${params.pk}">
                                <input type="hidden" id="menuCd" name="menuCd" value="equipment">
                                <input type="hidden" id="type" name="type" value="drafting">
                                <input type="hidden" id="nowUrl" name="nowUrl" />
                                <input type="text" id="searchDe" name="searchDe" style="width: 100%; margin-right:10px;">
                                <input type="hidden" id="searchBefDe" name="searchBefDe" />
                            </form>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div id="" style="margin:20px 0;">
                <h5 id="title"></h5>
                <table class="searchTable table table-bordered" style="width: 200px; height: 40px;">
                    <colgroup>
                        <col width="" >
                        <col width="" >
                    </colgroup>
                    <tr>
                        <th>진행상황</th>
                        <td id="statusText"></td>
                    </tr>
                </table>
            </div>
            <div class="btn-st" style="text-align:center; margin-top: 5px;">
                <input type="button" id="approvalBtn" style="" class="k-button k-button-solid k-button-solid-info" value="결재" onclick="equipApp.saveBtn()"/>
                <input type="button" id="approvalViewBtn" style="" class="k-button k-button-solid k-button-solid-info" value="결재문서" onclick="equipApp.viewBtn()"/>
            </div>
        </div>
    </div>
</div>




<script>
    equipApp.init();
</script>
</body>
</html>
