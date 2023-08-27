<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/inside/userManage/userSetRankPop.js?v=${today}"/></script>

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
<input type="hidden" id="documentSn" value="${data.documentSn}"/>
<div style="padding:0;">
    <div class="table-responsive">
            <div class="card-header pop-header">
                <h3 class="card-title title_NM">직책/직급 서열관리</h3>
                <div class="btn-st popButton">
                    <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">닫기</button>
                </div>
            </div>
            <div style="padding: 20px 30px;">
                <table class="popTable table table-bordered mb-0">
                    <colgroup>
                        <col width="15%">
                        <col width="30%">
                        <col width="55%">
                    </colgroup>
                    <thead>
                    <tr>
                        <th class="text-center th-color">
                            서열
                        </th>
                        <th class="text-center th-color">
                            직책/직급명
                        </th>
                        <th class="text-center th-color">
                            기능
                        </th>
                    </tr>
                    <tr>
                        <td class="text-center th-color"><input id="num" type="text" style="width:100%;"></td>
                        <td class="text-center th-color"><input id="duty" type="text" style="width:100%;"></td>
                        <td class="text-center th-color">
                            <button type="button" class="k-button k-button-solid-base" style="margin-right:5px;" onclick="">▲</button>
                            <button type="button" class="k-button k-button-solid-base" style="margin-right:5px;" onclick="">▼</button>
                            <button type="button" class="k-button k-button-solid-info" style="margin-right:5px;" onclick="">저장</button>
                            <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="">삭제</button>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-center th-color"><input id="num1" type="text" style="width:100%;"></td>
                        <td class="text-center th-color"><input id="duty1" type="text" style="width:100%;"></td>
                        <td class="text-center th-color">
                            <button type="button" class="k-button k-button-solid-info" style="margin-right:5px;" onclick="">추가</button>
                        </td>
                    </tr>
                    </thead>
                </table>
            </div>
        </div>
</div>

<script>
    userSetRank.init();
</script>
</body>
</html>