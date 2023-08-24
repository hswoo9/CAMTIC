<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/inside/userManage/userSetOrganizationPop.js?v=${today}"/></script>

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
<style>
    input[type="checkbox"]{height: 10px;}
</style>
<div style="padding:0;">
    <div class="table-responsive">
            <div class="card-header pop-header">
                <h3 class="card-title title_NM">조직도 직제 관리</h3>
                <div class="btn-st popButton">
                    <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">닫기</button>
                </div>
            </div>
            <div style="padding: 20px 30px;">
                <div class="col-md-6 col-lg-6 dash-left mt-10" style="border: 1px solid #d5d5d5; height: 610px;">
                    <div class="mt10"></div>
                    <span style="font-weight: bold;">* 직제 목록</span>
                    <div style="float:right;">
                        <button type="button" class="k-button k-button-md k-button-solid k-button-solid-info" onclick="">삭제</button>
                        <button type="button" class="k-button k-button-md k-button-solid k-button-solid-base" onclick="userSetOrganization.dataClear();">신규</button>
                    </div>
                    <table class="popTable table table-bordered mb-0" style="margin-top: 20px;">
                        <colgroup>
                            <col width="10%">
                            <col width="45%">
                            <col width="45%">
                        </colgroup>
                        <thead>
                        <tr>
                            <th class="text-center th-color">
                                No
                            </th>
                            <th colspan="2" style="text-align: left;">
                                캠틱종합기술원
                            </th>
                        </tr>
                        <tr>
                            <td class="text-center th-color">
                                1
                            </td>
                            <td>
                                <input type='checkbox'>
                                <div style="float:right;">경영지원실</div>
                            </td>
                            <td>
                                <input type='checkbox'>
                                <div style="float:right;">사업지원팀</div>
                            </td>
                        </tr>
                        <tr>
                            <td class="text-center th-color">
                                2
                            </td>
                            <td ></td>
                            <td>
                                <input type='checkbox'>
                                <div style="float:right;">경영지원팀</div>
                            </td>
                        </tr>
                        <tr>
                            <td class="text-center th-color">
                                3
                            </td>
                            <td>
                                <input type='checkbox'>
                                <div style="float:right;">미래전략기획본부</div>
                            </td>
                            <td>
                                <input type='checkbox'>
                                <div style="float:right;">미래전략기획팀</div>
                            </td>
                        </tr>
                        <tr>
                            <td class="text-center th-color">
                                4
                            </td>
                            <td ></td>
                            <td>
                                <input type='checkbox'>
                                <div style="float:right;">J-밸리혁신팀</div>
                            </td>
                        </tr>
                        <tr>
                            <td class="text-center th-color">
                                5
                            </td>
                            <td>
                                <input type='checkbox'>
                                <div style="float:right;">R&BD사업본부</div>
                            </td>
                            <td>
                                <input type='checkbox'>
                                <div style="float:right;">복합뿌리기술센터</div>
                            </td>
                        </tr>
                        <tr>
                            <td class="text-center th-color">
                                6
                            </td>
                            <td></td>
                            <td>
                                <input type='checkbox'>
                                <div style="float:right;">신기술융합팀</div>
                            </td>
                        </tr>
                        <tr>
                            <td class="text-center th-color">
                                7
                            </td>
                            <td ></td>
                            <td>
                                <input type='checkbox'>
                                <div style="float:right;">제조혁신팀</div>
                            </td>
                        </tr>
                        <tr>
                            <td class="text-center th-color">
                                8
                            </td>
                            <td>
                                <input type='checkbox'>
                                <div style="float:right;">기업성장지원본부</div>
                            </td>
                            <td>
                                <input type='checkbox'>
                                <div style="float:right;">창업/기업성장지원팀</div>
                            </td>
                        </tr>
                        <tr>
                            <td class="text-center th-color">
                                9
                            </td>
                            <td></td>
                            <td>
                                <input type='checkbox'>
                                <div style="float:right;">인재개발팀</div>
                            </td>
                        </tr>
                        <tr>
                            <td class="text-center th-color">
                                10
                            </td>
                            <td>
                                <input type='checkbox'>
                                <div style="float:right;">일자리혁신지원센터</div>
                            </td>
                            <td>
                                <input type='checkbox'>
                                <div style="float:right;">일자리사업팀</div>
                            </td>
                        </tr>
                        <tr>
                            <td class="text-center th-color">
                                11
                            </td>
                            <td></td>
                            <td>
                                <input type='checkbox'>
                                <div style="float:right;">전북조선업도약팀</div>
                            </td>
                        </tr>
                        <tr>
                            <td class="text-center th-color">
                                12
                            </td>
                            <td></td>
                            <td>
                                <input type='checkbox'>
                                <div style="float:right;">익산고용안정팀</div>
                            </td>
                        </tr>
                        <tr>
                            <td class="text-center th-color">
                                13
                            </td>
                            <td>
                                <input type='checkbox'>
                                <div style="float:right;">우주항공사업부</div>
                            </td>
                            <td>
                                <input type='checkbox'>
                                <div style="float:right;">우주개발팀</div>
                            </td>
                        </tr>
                        <tr>
                            <td class="text-center th-color">
                                14
                            </td>
                            <td></td>
                            <td>
                                <input type='checkbox'>
                                <div style="float:right;">항공개발팀</div>
                            </td>
                        </tr>
                        <tr>
                            <td class="text-center th-color">
                                15
                            </td>
                            <td>
                                <input type='checkbox'>
                                <div style="float:right;">드론사업부</div>
                            </td>
                            <td>
                                <input type='checkbox'>
                                <div style="float:right;">드론기술개발지원센터</div>
                            </td>
                        </tr>
                        <tr>
                            <td class="text-center th-color">
                                16
                            </td>
                            <td>
                                <input type='checkbox'>
                                <div style="float:right;">스마트제조사업부</div>
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <td class="text-center th-color">
                                17
                            </td>
                            <td>
                                <input type='checkbox'>
                                <div style="float:right;">시설관리환경미화</div>
                            </td>
                            <td></td>
                        </tr>
                        </thead>
                    </table>
                </div>
                <div class="col-md-6 col-lg-6 dash-left mt-10" style="border: 1px solid #d5d5d5; height: 610px;">
                    <div class="mt10"></div>
                    <span style="font-weight: bold;">* 직제 등록</span>
                    <div style="float:right;">
                        <button type="button" id="save" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="">
                            저장
                        </button>
                    </div>
                    <table class="popTable table table-bordered mb-0 mt10" style="margin-top: 20px;">
                        <colgroup>
                            <col width="25%">
                            <col width="75%">
                        </colgroup>
                        <thead>
                        <tr>
                            <th scope="row" class="text-center th-color">
                                <span class="red-star"></span>부서
                            </th>
                            <td>
                                <input type="text" id="dept" style="width: 100%;">
                            </td>
                        </tr>
                        <tr>
                            <th scope="row" class="text-center th-color">
                                <span class="red-star"></span>팀</th>
                            <td>
                                <input type="text" id="team" style="width: 100%;">
                            </td>
                        </tr>
                        <tr>
                            <th scope="row" class="text-center th-color">
                                <span class="red-star"></span>정렬순번</th>
                            <td>
                                <input type="text" id="sortSn" style="width: 100%;">
                            </td>
                        </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
</div>

<script>
    userSetOrganization.init();
</script>
</body>
</html>