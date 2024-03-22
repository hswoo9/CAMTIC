<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/campus/openStudyResPop.js?v=${toDate}"/></script>
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
<body class="font-opensans" style="background-color:#fff;">
<div class="col-lg-12" style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header barFixed">
            <h3 class="card-title title_NM">오픈스터디 결과보고서</h3>
            <div class="btn-st popButton">
                <button type="button" id="recBtn" style="display: none" class="k-button k-button-solid-info" onclick="openStudyRes.fn_openStudyCertReq(100);">승인</button>
                <button type="button" id="comBtn" style="display: none" class="k-button k-button-solid-error" onclick="openStudyRes.fn_openStudyCertReq(30);">반려</button>
                <button type="button" id="modBtn" style="display: none" class="k-button k-button-solid-info" onclick="openStudyRes.fn_openStudyModify();">수정</button>
                <button type="button" id="appBtn" style="display: none" class="k-button k-button-solid-info" onclick="openStudyRes.fn_openStudyCertReq(10);">승인요청</button>
                <button type="button" id="canBtn" style="display: none" class="k-button k-button-solid-info" onclick="openStudyRes.fn_openStudyCertReq(0);">승인요청취소</button>
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close();">닫기</button>
            </div>
        </div>
        <div class="card-header" style="padding-top:25px;">
            <div class="col-lg-12" style="margin:0 auto;">
                <div class="table-responsive">
                    <div class="popupTitleSt">신청인</div>
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
                            </thead>
                        </table>
                    </form>
                </div>
            </div>
        </div>
        <div class="card-header" style="padding-top:15px;">
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

        <div class="card-header" style="padding-top:15px;">
            <div class="col-lg-12" style="margin:0 auto;">
                <div class="table-responsive">
                    <div class="popupTitleSt">모임개요</div>
                </div>
                <form id="" style="";>
                <table class="popTable table table-bordered mb-0">
                    <colgroup>
                        <col width="10%">
                        <col width="40%">
                        <col width="10%">
                        <col width="40%">
                    </colgroup>
                    <thead>
                    <tr>
                        <th scope="row" class="text-center th-color">
                            모임주제
                        </th>
                        <td id="openStudyNameTd" colspan="3"></td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color">
                            모임기간
                        </th>
                        <td id="openStudyDtTd" colspan="3"></td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color">
                            모임장소
                        </th>
                        <td id="openStudyLocationTd" colspan="3"></td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color">
                            모임내용
                        </th>
                        <td id="openStudyDetailTd" colspan="3"></td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color">
                            학습결과
                        </th>
                        <td id="openStudyResultTd" colspan="3"></td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color">
                            소요비용
                        </th>
                        <td id="openStudyAmtTd"></td>
                        <th scope="row" class="text-center th-color">
                            비고내역
                        </th>
                        <td id="openStudyAmtTextTd"></td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color">
                            작성일
                        </th>
                        <td id="regDateTd" colspan="3"></td>
                    </tr>
                    </thead>
                </table>
                </form>
            </div>
        </div>
    </div>
</div>

<script>
    openStudyRes.init();
</script>
</body>
</html>