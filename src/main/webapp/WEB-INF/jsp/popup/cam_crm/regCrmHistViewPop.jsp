<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>

<body class="font-opensans" style="background-color:#fff;">
<input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}" />
<div style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM"><span style="position: relative; top: 3px;" id="pjtTitle">고객관계이력</span></h3>
            <div class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">닫기</button>
            </div>
        </div>

        <div style="padding: 20px 30px;">
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
                        <span class="red-star">*</span>업체명
                    </th>
                    <td>
                        ${rs.CRM_NM}
                    </td>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>대표자
                    </th>
                    <td>
                        ${rs.CRM_CEO}
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>사업자 번호
                    </th>
                    <td>
                        ${rs.CRM_NO}
                    </td>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>설립일
                    </th>
                    <td>
                        ${rs.CRM_EST_NO}
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>[우편번호] 주소
                    </th>
                    <td colspan="3">
                        <c:choose>
                            <c:when test="${rs.POST eq '' or rs.POST eq null}">
                                ${rs.ADDR}
                            </c:when>
                            <c:otherwise>
                                [${rs.POST}] ${rs.ADDR}
                            </c:otherwise>
                        </c:choose>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>전화번호
                    </th>
                    <td>
                        ${rs.TEL_NUM}
                    </td>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>팩스번호
                    </th>
                    <td>
                        ${rs.FAX}
                    </td>
                </tr>

                </thead>
            </table>

            <table class="popTable table table-bordered mb-0 mt20">
                <colgroup>
                    <col width="15%">
                    <col width="35%">
                    <col width="15%">
                    <col width="35%">
                </colgroup>
                <thead>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>관계유형
                    </th>
                    <td colspan="3">
                        ${rs.CRM_REL_TP}
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>일시
                    </th>
                    <td colspan="3">
                        ${rs.CRM_REL_STR_DT} ~  ${rs.CRM_REL_END_DT}
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        컨텍포인트
                    </th>
                    <td>
                        ${rs.CRM_MEM_NM}
                    </td>
                    <th scope="row" class="text-center th-color">
                        담당자 연락처
                    </th>
                    <td>
                        ${rs.CRM_MEM_PHN}
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        관심분야
                    </th>
                    <td colspan="3">

                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        관계사업
                    </th>
                    <td colspan="3">
                        ${rs.CRM_REL_PJT_NM}
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        관계내용
                    </th>
                    <td colspan="3">
                        ${rs.CRM_REL_CONT}
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        관계내용 공유
                    </th>
                    <td colspan="3">
                        ${rs.EMP_NAME_KR}
                        <span style="position: relative; top: 3px;">
                            <input type="checkbox" id="smsChk" <c:if test="${rs.SMS_CHK eq 'Y'}">checked</c:if> disabled>
                            <label for="smsChk" style="margin-right: 15px;">SMS발송</label>
                            <input type="checkbox" id="mailChk" <c:if test="${rs.MAIL_CHK eq 'Y'}">checked</c:if> disabled>
                            <label for="mailChk">메일발송</label>
                        </span>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        보안글
                    </th>
                    <td colspan="3">
                        <span style="position: relative; top: 3px;">
                            <input type="checkbox" id="secChk" <c:if test="${rs.SEC_CHK eq 'Y'}">checked</c:if> disabled>
                            <label for="secChk">보안글</label>
                            <span class="red-start" style="font-size: 12px;"> ※ 체크시 해당 팀장 이상에서만 조회 가능합니다. </span>
                        </span>
                    </td>
                </tr>
                </thead>
            </table>
        </div>
    </div>
</div>
</body>
</html>