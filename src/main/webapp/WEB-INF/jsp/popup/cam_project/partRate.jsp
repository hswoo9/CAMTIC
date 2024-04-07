<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>

<style>
    .table-responsive {
        overflow-x: hidden !important;
    }
</style>
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/partRate.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/inside/document/docuPop.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/commonProject.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_mng/partRate/partRateCommon.js?v=${today}'/>"></script>

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

<input type="hidden" id="partRateVerSn" value="${params.partRateVerSn}" />
<input type="hidden" id="pjtSn" value="${map.PJT_SN}" />
<input type="hidden" id="busnClass" value="${map.BUSN_CLASS}"/>

<input type="hidden" id="joinMember" value=""/>
<input type="hidden" id="joinMemberSn" value=""/>
<div style="padding:0;">
    <div class="table-responsive">
        <input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM"><span style="position: relative; top: 3px;" id="pjtTitle">참여율관리</span>

            </h3>

            <div class="btn-st popButton" style="font-size: 13px;">
                <c:if test='${data.MNG_STAT != "S" and data.MNG_STAT != "C"}'>
                    <button type="button" id="confirmBtn" class="k-button k-button-solid-info" onclick="partRate.fn_confirm()">설정완료</button>
                    <button type="button" id="saveBtn" class="k-button k-button-solid-info" onclick="partRate.fn_save()">저장</button>
                </c:if>
                <button type="button" class="k-button k-button-solid-error" onclick="window.close()">닫기</button>
            </div>
        </div>
        <div>
            <table class="popTable table table-bordered mb-0">
                <colgroup>
                    <col width="15%">
                    <col width="35%">
                    <col width="15%">
                    <col width="35%">
                </colgroup>
                <thead>
                <tr>
                    <th scope="row" class="text-center th-color">
                        프로젝트 코드
                    </th>
                    <td colspan="3">
                        ${map.PJT_CD}
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        프로젝트 명
                    </th>
                    <td colspan="3">
                        ${data.PJT_NM}
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        지원부처
                    </th>
                    <td>
                        ${data.SBJ_DEP_NM}
                    </td>
                    <th scope="row" class="text-center th-color">
                        전담기관
                    </th>
                    <td>
                        ${data.SBJ_DEP_SUB_NM}
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        주관기관
                    </th>
                    <td colspan="3">
                        ${map.CRM_NM}
                    </td>
                    <%--                    <th scope="row" class="text-center th-color">--%>
                    <%--                        사업명--%>
                    <%--                    </th>--%>
                    <%--                    <td>--%>
                    <%--                        ${data.SBJ_CHAR_NM}--%>
                    <%--                    </td>--%>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        프로젝트 시작
                    </th>
                    <td>
                        <c:if test="${data.YEAR_CLASS == 'M'}">
                            <c:if test="${map.BUSN_NM == 'R&D'}">
                                ${data.NOW_STR_DE_RND}
                            </c:if>
                            <c:if test="${map.BUSN_NM != 'R&D'}">
                                ${data.NOW_STR_DE_UNRND}
                            </c:if>
                        </c:if>
                        <c:if test="${data.YEAR_CLASS != 'M'}">
                            ${data.STR_DT}
                        </c:if>
                    </td>
                    <th scope="row" class="text-center th-color">
                        프로젝트 종료
                    </th>
                    <td>
                        <c:if test="${data.YEAR_CLASS == 'M'}">
                            <c:if test="${map.BUSN_NM == 'R&D'}">
                                ${data.NOW_END_DE_RND}
                            </c:if>
                            <c:if test="${map.BUSN_NM != 'R&D'}">
                                ${data.NOW_END_DE_UNRND}
                            </c:if>
                        </c:if>
                        <c:if test="${data.YEAR_CLASS != 'M'}">
                            ${data.END_DT}
                        </c:if>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        인건비 예산
                    </th>
                    <td>
                        <span id="budget"></span>
                        <input type="hidden" id="itemAmt" value="0"/>
                        <input type="hidden" id="payAmt" value="0"/>
                        <input type="hidden" id="budgetAmt" value=""/>
                    </td>
                    <th scope="row" class="text-center th-color">
                        관리 시스템
                    </th>
                    <td>
                        ${map.BUSN_NM}
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        요청자
                    </th>
                    <td>
                        ${data.REQ_EMP_NM}
                    </td>
                    <th scope="row" class="text-center th-color">
                        요청일
                    </th>
                    <td>
                        ${data.REQ_DT}
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        신규/수정
                    </th>
                    <td>
                        ${data.REQ_SORT}
                    </td>
                    <th scope="row" class="text-center th-color">
                        5공3책 적용
                    </th>
                    <td>
                        <c:if test='${map.SBJ_STAT_YN == "Y"}'>적용</c:if>
                        <c:if test="${map.SBJ_STAT_YN == 'N' || map.SBJ_STAT_YN == null || map.SBJ_STAT_YN == ''}">미적용</c:if>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        참여 연구원
                    </th>
                    <td colspan="3">
                        ${data.JOIN_MEM_NM}
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        월급여액 산출기준
                    </th>
                    <td colspan="3">
                        ${data.MON_PAY_CRT}
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        참여율
                    </th>
                    <td colspan="3">
                        최소 참여율 : ${data.MIN_PART_RATE}%, 최대 참여율 : ${data.MAX_PART_RATE}%
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        기타 요청 내용
                    </th>
                    <td colspan="3">
                        ${data.PART_ETC}
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        담당자 코멘트
                    </th>
                    <td colspan="3">
                        <textarea id="mngComment" style="width: 100%; text-align: left">${data.MNG_COMM}</textarea>
                    </td>
                </tr>
                </thead>
            </table>
        </div>
        <div class="table-responsive">
            <div id="commFileHtml" style="margin-top:10px;">
                <form>
                    <div class="card-header" style="padding: 5px;">
                        <h3 class="card-title">첨부파일</h3>
                        <div class="card-options">
                            <div class="filebox">
                                <input type="file" id="fileList" name="fileList" onchange="addFileInfoTable();" multiple style="display: none"/>
                            </div>
                        </div>
                    </div>
                    <div class="table-responsive">
                        <table class="popTable table table-bordered mb-0">
                            <colgroup>
                                <col width="50%">
                                <col width="15%">
                                <col width="15%">
                            </colgroup>
                            <thead>
                            <tr class="text-center th-color">
                                <th>파일명</th>
                                <th>확장자</th>
                                <th>용량</th>
                            </tr>
                            </thead>
                            <tbody id="fileGrid">
                            <tr class="defultTr">
                                <td colspan="3" style="text-align: center">첨부된 파일이 없습니다.</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </form>
            </div>
        </div>


        <c:if test='${data.MNG_STAT != "S" and data.MNG_STAT != "C"}'>
            <button type="button" style="float: right; margin-top: 10px; font-size: 14px; margin-right: 5px;" onclick="fn_userMultiSelectPop('partRate');" class="k-button k-button-solid-base">추가</button>
        </c:if>
        <div class="table-responsive" style="margin-bottom: 25px;">
            <table class="popTable table table-bordered mb-0">
                <thead>
                <tr>
                    <th style="width: 5%">구분</th>
                    <th style="width: 5%">성명</th>
                    <th style="width: 5%">기준급여</th>
                    <th style="width: 7%">기준급여<br>변경</th>
                    <th style="width: 8%">참여시작</th>
                    <th style="width: 8%">참여종료</th>
                    <th style="width: 5%">참여개월</th>
                    <th style="width: 4%">참여율<br>현금(%)</th>
                    <th style="width: 7%">인건비<br>현금 총액</th>
                    <th style="width: 4%">참여율<br>현물(%)</th>
                    <th style="width: 7%">인건비<br>현물 총액</th>
                    <th style="width: 5%">총 참여율(%)</th>
                    <th style="width: 7%">인건비총액</th>
                    <th style="width: 7%">월 인건비</th>
                    <th style="width: 5%">참여율<br>조회</th>
                    <th style="width: 5%">삭제</th>
                </tr>
                </thead>
                <tbody id="partRateMember">

                </tbody>
            </table>
        </div>
    </div>
</div>

<script>
    partRate.fn_defaultScript();

    function userDataSet(arr){
        var empSeq = "";
        var empNm = "";
        for(var i = 0 ; i < arr.length ; i++){
            empSeq += arr[i].empSeq + ",";
            empNm += arr[i].empName + ",";
        }
        $("#joinMember").val(empNm.slice(0, -1));
        $("#joinMemberSn").val(empSeq.slice(0, -1));


        var data = {
            joinMemSn: $("#joinMemberSn").val(),
            joinMem: $("#joinMember").val(),
            partRateVerSn : $("#partRateVerSn").val()
        }
        var rs = customKendo.fn_customAjax("/project/updJoinMember", data);

        if(rs.flag){
            location.reload();
        }
    }
</script>
</body>
</html>