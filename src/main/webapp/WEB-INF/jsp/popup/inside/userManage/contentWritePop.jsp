<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">

<script type="text/javascript" src="/js/intra/inside/userManage/contentWritePop.js?v=${today}"/></script>
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
                <h3 class="card-title title_NM">직원 면담 카드 작성</h3>
                <div class="btn-st popButton">
                    <button type="button" class="k-button k-button-solid-info" onclick="">저장</button>
                    <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">닫기</button>
                </div>
            </div>
            <div style="padding: 20px 30px;">
                <table class="popTable table table-bordered mb-0">
                    <colgroup>
                        <col width="20%">
                        <col width="30%">
                        <col width="20%">
                        <col width="30%">
                    </colgroup>
                    <thead>
                    <%--<tr>
                        <th colspan="4">문서 등록 대장</th>
                    </tr>--%>
                    <tr>
                        <th scope="row" class="text-center th-color">
                            <span class="red-star"></span>면담일시
                        </th>
                        <td colspan="3">
                            <input type="text" id="content1" style="width: 100%;">
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color">
                            <span class="red-star"></span>피면담자
                        </th>
                        <td colspan="3">
                            <input type="text" id="empName" style="width: 90%;" value="">
                            <input type="hidden" id="empSeq" style="width: 50%;" value="">
                            <button type="button" id="staffSelect" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="userSearch();">
                                검색
                            </button>
                        </td>
                    </tr>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color">
                            <span class="red-star"></span>면담자
                        </th>
                        <td colspan="3">
                            <input type="text" id="content3" style="width: 100%;">
                        </td>
                    </thead>
                </table>
                <table class="popTable table table-bordered mb-0" style="border-left: none;">
                    <colgroup>
                        <col width="13%">
                        <col width="37%">
                        <col width="13%">
                        <col width="37%">
                    </colgroup>
                    <thead>
                    <tr>
                        <th colspan="4" style="font-size: 14px; font-weight:600;background-color: #00397f96; color: #fff;"></th>
                    </tr>
                    <tr>
                        <td colspan="4">
                            <span class="k-input k-textarea k-input-solid k-input-md k-rounded-md" style="width: 95%; height: 100px;"><textarea type="text" id="contract" style="width: 100%; height: 100px; resize: none;" data-role="textarea" aria-disabled="false" rows="5" class="!k-overflow-y-auto k-input-inner" autocomplete="off"></textarea></span>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="4" style="font-size: 14px; font-weight:600;background-color: #00397f96; color: #fff;"></th>
                    </tr>
                    <tr>
                        <td colspan="4">
                            <span class="k-input k-textarea k-input-solid k-input-md k-rounded-md" style="width: 95%; height: 100px;"><textarea type="text" id="qualification" style="width: 100%; height: 100px; resize: none;" data-role="textarea" aria-disabled="false" rows="5" class="!k-overflow-y-auto k-input-inner" autocomplete="off"></textarea></span>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="4" style="font-size: 14px; font-weight:600;background-color: #00397f96; color: #fff;"></th>
                    </tr>
                    <tr>
                        <td colspan="4">
                            <span class="k-input k-textarea k-input-solid k-input-md k-rounded-md" style="width: 95%; height: 100px;"><textarea type="text" id="degreeT" style="width: 100%; height: 100px; resize: none;" data-role="textarea" aria-disabled="false" rows="5" class="!k-overflow-y-auto k-input-inner" autocomplete="off"></textarea></span>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="4" style="font-size: 14px; font-weight:600;background-color: #00397f96; color: #fff;"></th>
                    </tr>
                    <tr>
                        <td colspan="4">
                            <span class="k-input k-textarea k-input-solid k-input-md k-rounded-md" style="width: 95%; height: 100px;"><textarea type="text" id="career" style="width: 100%; height: 100px; resize: none;" data-role="textarea" aria-disabled="false" rows="5" class="!k-overflow-y-auto k-input-inner" autocomplete="off"></textarea></span>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="4" style="font-size: 14px; font-weight:600;background-color: #00397f96; color: #fff;"></th>
                    </tr>
                    <tr>
                        <td colspan="4">
                            <span class="k-input k-textarea k-input-solid k-input-md k-rounded-md" style="width: 95%; height: 100px;"><textarea type="text" id="military" style="width: 100%; height: 100px; resize: none;" data-role="textarea" aria-disabled="false" rows="5" class="!k-overflow-y-auto k-input-inner" autocomplete="off"></textarea></span>
                        </td>
                    </tr>
                    </thead>
                </table>
            </div>
        </div>
</div>


<script>
    contentWritePop.init();
</script>
</body>
</html>