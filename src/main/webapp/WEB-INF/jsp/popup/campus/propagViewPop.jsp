<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/campus/propagViewPop.js?v=${toDate}"/></script>
<style>
    .barFixed {
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 1000;
    }
</style>
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
<input type="hidden" id="mode" value="${params.mode}"/>
<input type="hidden" id="pk" value="${params.pk}"/>
<input type="hidden" id="studyResultSn" value="${resultData.STUDY_RESULT_SN}" />
<input type="hidden" id="addStatus" value="${data.ADD_STATUS}"/>
<input type="hidden" id="typeView" value="${params.typeView}" />
<body class="font-opensans" style="background-color:#fff;">

<form id="studyDraftFrm" method="post">
    <input type="hidden" id="studyInfoSn" name="studyInfoSn" value="${params.pk}" />
    <input type="hidden" id="menuCd" name="menuCd" value="study">
    <input type="hidden" id="studyType" name="studyType" value="propag">
    <input type="hidden" id="type" name="type" value="drafting">
    <input type="hidden" id="nowUrl" name="nowUrl" />
</form>


    <div class="card-header pop-header barFixed">
        <h3 class="card-title title_NM">
                <span id="studyTitle">
                    전파학습 신청서 조회
                </span>
        </h3>
        <div id="studyBtn" class="btn-st popButton">
        </div>
    </div>
    <div class="table-responsive mt60">
    <table class="popTable table table-bordered mb-0" style="margin-top: 60px">
        <colgroup>
            <col width="15%">
            <col width="18%">
            <col width="15%">
            <col width="18%">
            <col width="15%">
            <col width="19%">
        </colgroup>
        <thead>
        <tr>
            <th scope="row" class="text-center th-color">
                소속
            </th>
            <td id="regDeptTd"></td>
            <th scope="row" class="text-center th-color">
                직위
            </th>
            <td id="regPositionTd"></td>
            <th scope="row" class="text-center th-color">
                성명
            </th>
            <td id="regEmpNameTd"></td>
        </tr>
        </thead>
    </table>
</div>

<div>
<div id="propagGrid3" class="table-responsive" style="margin-top: 15px;">
    <div class="card-header pop-header" style="margin-bottom: 15px;">
        <h3 class="card-title title_NM">
                <span style="">
                    지도자/학습자
                </span>
        </h3>
        <div class="btn-st popButton">

        </div>
    </div>
</div>
<div style="display: flex">
    <div class="col-lg-6" style="margin:0 auto;">
        <div class="table-responsive">
            <div class="popupTitleSt">지도자</div>
        </div>
        <div id="mainGrid"></div>
    </div>
    <div class="col-lg-6" style="margin:0 auto;">
        <div class="table-responsive">
            <div class="popupTitleSt">학습자</div>
        </div>
        <div id="subGrid"></div>
    </div>
</div>
</div>

<div id="123123" class="table-responsive" style="margin-top: 15px;">
    <div class="card-header pop-header" style="margin-bottom: 15px;">
        <h3 class="card-title title_NM">
                <span style="">
                    학습계획
                </span>
        </h3>
        <div class="btn-st popButton">

        </div>
    </div>
    <form id="" style="";>
        <table class="popTable table table-bordered mb-0">
            <colgroup>
                <col width="20%">
                <col width="80%">
            </colgroup>
            <thead>
            <tr>
                <th>학습주제</th>
                <td id="propagNameTd"></td>
            </tr>
            <tr>
                <th>학습기간</th>
                <td id="propagDtTd"></td>
            </tr>
            <tr>
                <th>학습장소</th>
                <td id="propagLocationTd"></td>
            </tr>
            <tr>
                <th>학습목표</th>
                <td id="propagObjectTd"></td>
            </tr>
            <tr>
                <th>학습내용</th>
                <td id="propagContentTd"></td>
            </tr>
            <tr>
                <th>소요비용</th>
                <td id="propagAmtTd"></td>
            </tr>
            <tr>
                <th>첨부서류</th>
                <td id="attachTr">

                </td>
            </tr>
            <tr>
                <th>비용내역</th>
                <td id="propagAmtTextTd"></td>
            </tr>
            <tr>
                <th>신청날짜</th>
                <td id="regDateTd"></td>
            </tr>
            <tr>
                <th>상태</th>
                <td id="statusTd"></td>
            </tr>
            </thead>
        </table>
    </form>
</div>

<c:if test="${data.STATUS eq '100' || data.STATUS eq '101'}">
    <c:if test="${params.typeView ne 'A'}">
        <div id="propagGrid" class="table-responsive" style="margin-top: 15px; display: none">
            <div class="card-header pop-header" style="margin-bottom: 15px;">
                <h3 class="card-title title_NM">
                        <span style="">
                            학습일지
                        </span>
                </h3>
                <div class="btn-st popButton">

                </div>
            </div>
            <div id="mainGrid3" style=""></div>
        </div>
    </c:if>
</c:if>


<script>
    propagView.init();
</script>
</body>
</html>