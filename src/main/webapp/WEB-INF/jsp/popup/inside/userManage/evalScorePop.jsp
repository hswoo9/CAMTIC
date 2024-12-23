<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"       uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/inside/evaluation/evalScorePop.js?v=${today}"/></script>
<style>
    .yellow{background-color: #fff2cc;font-weight: bold;text-align: center;}
    .green{background-color: #e2efda;font-weight: bold;text-align: center;}
    .blue{background-color: #ddebf7;font-weight: bold;text-align: center;}
    .normal{font-weight: bold;text-align: center;}

    .table > tbody + tbody {border-top: 1px solid rgba(0,0,0,.08)}
    #evalList input{width: 100%;}
    #evalListDiv {width: 100%;overflow-x: auto;overflow-y:hidden;white-space: nowrap;}
</style>
<body class="font-opensans" style="background-color:#fff;">
<input type="hidden" id="regEmpSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="regEmpName" value="${loginVO.name}"/>
<input type="hidden" id="regDeptSeq" value="${loginVO.deptId}"/>
<input type="hidden" id="regDeptName" value="${loginVO.deptNm}"/>
<input type="hidden" id="regTeamSeq" value="${loginVO.teamId}"/>
<input type="hidden" id="regTeamName" value="${loginVO.teamNm}"/>
<input type="hidden" id="regDutyCode" value="${loginVO.dutyCode}"/>
<input type="hidden" id="regDutyName" value="${loginVO.dutyNm}"/>
<input type="hidden" id="searchYear" value="${params.searchYear}"/>
<div style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">개인 업적평가 점수산출</h3>
            <div class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-info" onclick="evalScorePop.saveData()">저장</button>
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">닫기</button>
            </div>
        </div>
        <div style="padding: 20px 30px;">
            <div style="display: flex;justify-content: flex-end;gap: 10px;">
                <div style="display: flex;align-items: center;gap: 10px">
                    프로젝트 미참여 : <div style="width: 15px;height: 15px;background-color: #ffbebe; display: block"></div>
                </div>
                <div style="display: flex;align-items: center;gap: 10px">
                    수정여부 : <div style="width: 15px;height: 15px;background-color: rgb(198 159 239); display: block"></div>
                </div>
            </div>
            <div id="evalListDiv">

            </div>
        </div>
    </div>
</div>


<script>
    evalScorePop.fn_defaultScript();
</script>
</body>
</html>