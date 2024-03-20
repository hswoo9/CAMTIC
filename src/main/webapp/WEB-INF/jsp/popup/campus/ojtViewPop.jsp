<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/campus/ojtViewPop.js?v=${toDate}"/></script>
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
<input type="hidden" id="ojtOjtResultSn" value="${params.ojtOjtResultSn}" />
<input type="hidden" id="addStatus" value="${data.ADD_STATUS}"/>
<input type="hidden" id="typeView" value="${params.typeView}" />
<input type="hidden" id="status"/>
<body class="font-opensans" style="background-color:#fff;">

<form id="studyDraftFrm" method="post">
    <input type="hidden" id="studyInfoSn" name="studyInfoSn" value="${params.pk}" />
    <input type="hidden" id="menuCd" name="menuCd" value="study">
    <input type="hidden" id="studyType" name="studyType" value="ojt">
    <input type="hidden" id="type" name="type" value="drafting">
    <input type="hidden" id="nowUrl" name="nowUrl" />
</form>

<div class="col-lg-12" style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header barFixed">
            <h3 class="card-title title_NM">OJT 신청서 조회</h3>
            <div id="studyBtn" class="btn-st popButton"></div>
        </div>
        <div class="card-header" style="padding-top:60px;">
            <div class="col-lg-12" style="margin:0 auto;">
                <div class="table-responsive">
                    <div class="table-responsive" style="margin-bottom: 5px;">
                        <div class="card-header pop-header">
                            <h3 class="card-title title_NM">신청인</h3>
                        </div>
                    </div>
                    <form id="table-responsive">
                        <table class="popTable table table-bordered mb-0">
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
                            <tr>
                                <th scope="row" class="text-center th-color">
                                    담당직무
                                </th>
                                <td colspan="5" id="jobDetailNmTd"></td>
                            </tr>
                            </thead>
                        </table>
                    </form>
                </div>
            </div>
        </div>

        <div class="card-header" style="padding-top:15px;">
            <div class="col-lg-6" style="margin:0 auto;">
                <div class="table-responsive" style="margin-bottom: 5px;">
                    <div class="card-header pop-header">
                        <h3 class="card-title title_NM">지도자</h3>
                    </div>
                </div>
                <div id="mainGrid"></div>
            </div>
            <div class="col-lg-6" style="margin:0 auto;">
                <div class="table-responsive" style="margin-bottom: 5px;">
                    <div class="card-header pop-header">
                        <h3 class="card-title title_NM">학습자</h3>
                    </div>
                </div>
                <div id="subGrid"></div>
            </div>
        </div>

        <div class="card-header" style="padding-top:15px;">
            <div class="col-lg-12" style="margin:0 auto;">
                <div class="table-responsive">
                    <div class="table-responsive" style="margin-bottom: 5px;">
                        <div class="card-header pop-header">
                            <h3 class="card-title title_NM">지도계획</h3>
                        </div>
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
                        <th>지도명칭</th>
                        <td id="ojtNameTd"></td>
                    </tr>
                    <tr>
                        <th>지도기간</th>
                        <td id="ojtDtTd"></td>
                    </tr>
                    <tr>
                        <th>지도장소</th>
                        <td id="ojtLocationTd"></td>
                    </tr>
                    <tr style="display: none;">
                        <th>학습목표</th>
                        <td id="ojtObjectTd">a</td>
                    </tr>
                    <tr>
                        <th>지도목적</th>
                        <td id="ojtContentTd"></td>
                    </tr>
                    <tr>
                        <th>소요비용</th>
                        <td id="ojtAmtTd"></td>
                    </tr>
                    <tr>
                        <th>첨부서류</th>
                        <td id="attachTr">

                        </td>
                    </tr>
                    <tr>
                        <th>비용내역</th>
                        <td id="ojtAmtTextTd"></td>
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
        </div>
<c:if test="${data.STATUS eq '100' || data.STATUS eq '101'}">
    <c:if test="${params.typeView ne 'A'}">
        <div class="card-header" style="padding-top:45px;">
            <div class="col-lg-12" style="margin:0 auto;">
                <div class="table-responsive">
                    <div class="table-responsive" style="margin-bottom: 5px;">
                        <div class="card-header pop-header">
                            <h3 class="card-title title_NM">지도내용</h3>
                        </div>
                    </div>
                    <div id="ojtPlanGrid"></div>
                </div>
            </div>
        </div>

        <div class="ojtResult card-header" style="padding-top:45px; display: none">
            <div class="col-lg-12" style="margin:0 auto;">
                <div class="table-responsive">
                    <div class="table-responsive" style="margin-bottom: 5px;">
                        <div class="card-header pop-header">
                            <h3 class="card-title title_NM">학습일지</h3>
                        </div>
                    </div>
                    <div id="ojtResultGrid"></div>
                </div>
            </div>
        </div>
    </c:if>
</c:if>
    </div>
</div>

<script>
    ojtView.init();
</script>
</body>
</html>