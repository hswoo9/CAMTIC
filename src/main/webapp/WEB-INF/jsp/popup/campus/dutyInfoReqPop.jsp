<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/campus/dutyInfoReqPop.js?v=${toDate}"/></script>
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
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">직무기술서 등록</h3>
            <div class="btn-st popButton">
                <button type="button" id="recBtn" style="display: none" class="k-button k-button-solid-info" onclick="dutyInfoReq.fn_dutyCertReq(100);">승인</button>
                <button type="button" id="comBtn" style="display: none" class="k-button k-button-solid-error" onclick="dutyInfoReq.fn_dutyCertReq(30);">반려</button>
                <button type="button" id="canBtn" style="display: none" class="k-button k-button-solid-error" onclick="dutyInfoReq.fn_dutyCertReq(0);">승인요청취소</button>
                <button type="button" id="appBtn" style="display: none" class="k-button k-button-solid-info" onclick="dutyInfoReq.fn_dutyCertReq(10);">승인요청</button>
                <button type="button" id="saveBtn" class="k-button k-button-solid-info" onclick="dutyInfoReq.saveBtn();">저장</button>
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close();">닫기</button>
            </div>
        </div>
        <form id="table-responsive" style="padding: 20px 30px;">
            <table class="popTable table table-bordered mb-0">
                <colgroup>
                    <col width="20%">
                    <col width="80%">
                </colgroup>
                <thead>
                <tr class="mngTr" style="display: none">
                    <td colspan="2" scope="row" class="text-center th-color">
                        <b id="userInfo" style="color: #0c9587"></b> 님의 <input id="applyMonth" style="width: 120px"/> 직무기술서 입니다.
                    </td>
                </tr>
                <tr class="insTr" style="display: none">
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>적용년도
                    </th>
                    <td>
                        <input id="dutyMonth" type="text" style="width: 200px;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>직무명
                    </th>
                    <td>
                        <input type="text" id="dutyName" style="width: 709px;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>직무개요
                    </th>
                    <td>
                        <textarea id="outlineName" style="width: 709px; height: 50px;"></textarea>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>직무내용
                    </th>
                    <td>
                        <textarea id="outlineDetail" style="width: 709px; height: 100px;"></textarea>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>고객 및 기대사항
                    </th>
                    <td>
                        <table>
                            <colgroup>
                                <col width="20%">
                                <col width="80%">
                            </colgroup>
                            <thead>
                                <tr>
                                    <td style="text-align: center">내 부 고 객</td>
                                    <td><textarea id="internal" style="width: 550px; height: 50px;"></textarea></td>
                                </tr>
                                <tr>
                                    <td style="text-align: center">외 부 고 객</td>
                                    <td><textarea id="external" style="width: 550px; height: 50px;"></textarea></td>
                                </tr>
                            </thead>
                        </table>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>보고체계
                    </th>
                    <td>
                        <input type="text" id="appLine" style="width: 709px;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>필요역량
                    </th>
                    <td>
                        <table>
                            <colgroup>
                                <col width="20%">
                                <col width="80%">
                            </colgroup>
                            <thead>
                            <tr>
                                <td style="text-align: center">학력 및 경력</td>
                                <td><textarea id="abilityA" style="width: 550px; height: 50px;"></textarea></td>
                            </tr>
                            <tr>
                                <td style="text-align: center">전 문 지 식</td>
                                <td><textarea id="abilityB" style="width: 550px; height: 50px;"></textarea></td>
                            </tr>
                            <tr>
                                <td style="text-align: center">필 수 자 질</td>
                                <td><textarea id="abilityC" style="width: 550px; height: 50px;"></textarea></td>
                            </tr>
                            <tr>
                                <td style="text-align: center">자격 및 면허</td>
                                <td><textarea id="abilityD" style="width: 550px; height: 50px;"></textarea></td>
                            </tr>
                            <tr>
                                <td style="text-align: center">기타 참고사항</td>
                                <td><textarea id="abilityE" style="width: 550px; height: 50px;"></textarea></td>
                            </tr>
                            </thead>
                        </table>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>주요책무
                    </th>
                    <td>
                        <textarea id="responsibility" style="width: 709px; height: 300px;"></textarea>
                    </td>
                </tr>
                </thead>
            </table>
        </form>
    </div>
</div>

<script>
    dutyInfoReq.init();
</script>
</body>
</html>