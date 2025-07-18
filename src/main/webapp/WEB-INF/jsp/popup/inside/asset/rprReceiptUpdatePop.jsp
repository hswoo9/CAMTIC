<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/inside/asset/rprReceiptUpdatePop.js?v=${today}"/></script>
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
<input type="hidden" id="inventionInfoSn" name="inventionInfoSn" value="${pk}"/>
<body class="font-opensans" style="background-color:#fff;">
<div class="col-lg-11" style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">지식재산권 수정</h3>
            <div class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-info" onclick="rprReceiptUpdate.saveBtn();">수정</button>
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">취소</button>
            </div>
        </div>
        <div style="padding: 20px 30px;">
        <table class="popTable table table-bordered mb-0">
            <colgroup>
                <col width="30%">
                <col width="70%">
            </colgroup>
            <thead>
            <%--<tr>
                <th colspan="2">직무발명 신고</th>
            </tr>--%>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>발명자 / 저자
                </th>
                <td>
                    <input type="text" id="userText" style="width: 70%;" value="${data.info.SHARE_NAME}" />
                    <input type="hidden" id="userSn" style="width: 70%;" value="${data.info.SHARE_SN}" />
                    <button type="button" id="staffSlect" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" style="width:80px; height:27px; line-height:0;" onclick="fn_userMultiSelectPop()">
                        직원 선택
                    </button>
                </td>
            </tr>
            <tr id="shareTr">
                <th>지분 입력</th>
                <td>
                    <table id="shareTd">
                        <c:forEach var="item" items="${data.shareList}" varStatus="status">
                        <tr class='addData'>
                            <input type='hidden' class='shareEmpSeq' value='${item.EMP_SEQ}'/>
                            <th class='shareEmpName'>${item.EMP_NAME}</th>
                            <td><input type='text' id='share${item.EMP_SEQ}' style='width: 80%; text-align: right' class='share' value='${item.SHARE}' oninput='onlyNumber(this);'/> %</td>
                        </tr>
                        </c:forEach>
                    </table>
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>지식재산권 종류
                </th>
                <td>
                    <input type="text" id="iprClass" style="width: 100%;" value="${data.info.IPR_CLASS}" />
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>상태
                </th>
                <td>
                    <input type="text" id="state" style="width: 100%;" value="${data.info.STATE_SN}" />
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>유지여부
                </th>
                <td>
                    <input type="text" id="tain" style="width: 100%;" value="${data.info.TAIN_SN}" />
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>기술이전
                </th>
                <td>
                    <input type="text" id="tech" style="width: 100%;" value="${data.info.TECH_SN}" />
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>대외비
                </th>
                <td>
                    <input type="text" id="confidentiality" style="width: 100%;" value="${data.info.CONFIDENTIALITY_SN}" />
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>지식재산권 명칭
                </th>
                <td>
                    <input type="text" id="title" style="width: 100%;" value="${data.info.TITLE}" />
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>단독/공동
                </th>
                <td>
                    <input type="text" id="single" style="width: 100%;" value="${data.info.SINGLE_SN}" />
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>출원인
                </th>
                <td>
                    <input type="text" id="applicantName" style="width: 100%;" value="${data.info.APPLICANT_NAME}" />
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>주요내용
                </th>
                <td>
                    <textarea type="text" id="detailCn" style="width: 100%; height: 60px" /></textarea>
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>출원번호
                </th>
                <td>
                    <input type="text" id="applicantNum" style="width: 100%;" value="${data.info.APPLICANT_NUM}" />
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>출원일자
                </th>
                <td>
                    <input type="text" id="applicantDt" style="width: 100%; " value="${data.info.APPLICANT_DT}" />
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>출원국
                </th>
                <td>
                    <input type="text" id="applicantNation" style="width: 100%;" value="${data.info.APPLICANT_NATION}" />
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>등록번호
                </th>
                <td>
                    <input type="text" id="regNum" style="width: 100%;" value="${data.info.REG_NUM}" />
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>등록일자
                </th>
                <td>
                    <input type="text" id="regDate" style="width: 100%;" value="${data.info.REG_DATE}" />
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>존속만료일
                </th>
                <td>
                    <input type="text" id="expirationDt" style="width: 100%;" value="${data.info.EXPIRATION_DT}" />
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>증빙(출원)
                </th>
                <td colspan="3" style="padding:5px; cursor: pointer">
                    <label for="appliFile" class="k-button k-button-solid-base">파일첨부</label>
                    <input type="file" id="appliFile" name="appliFile" onchange="rprReceiptUpdate.fileChange(this)" style="display: none" multiple="multiple">
                    <span id="appliFileName"></span>
                    <c:if test="${data.appliFile ne null}">
                        <span onclick="fileDown('${data.appliFile.file_path}${data.appliFile.file_uuid}', '${data.appliFile.file_org_name}.${data.appliFile.file_ext}')">
                            ${data.appliFile.file_org_name}.${data.appliFile.file_ext}
                        </span>
                    </c:if>
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>증빙(등록)
                </th>
                <td colspan="3" style="padding:5px; cursor: pointer">
                    <label for="regFile" class="k-button k-button-solid-base">파일첨부</label>
                    <input type="file" id="regFile" name="regFile" onchange="rprReceiptUpdate.fileChange(this)" style="display: none" multiple="multiple">
                    <span id="regFileName"></span>
                    <c:if test="${data.regFile ne null}">
                        <span onclick="fileDown('${data.regFile.file_path}${data.regFile.file_uuid}', '${data.regFile.file_org_name}.${data.regFile.file_ext}')">
                            ${data.regFile.file_org_name}.${data.regFile.file_ext}
                        </span>
                    </c:if>
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>비고
                </th>
                <td>
                    <textarea type="text" id="remarkCn" style="width: 100%; height: 60px" value="${data.info.REMARK_CN}" /></textarea>
                </td>
            </tr>
            </thead>
        </table>
        </div>
    </div>
</div>

<script>
    $("#detailCn").val('${data.info.DETAIL_CN}');

    customKendo.fn_datePicker("applicantDt", "month", "yyyy-MM-dd", '${data.info.APPLICANT_DT}');
    customKendo.fn_datePicker("regDate", "month", "yyyy-MM-dd", '${data.info.REG_DATE}');
    customKendo.fn_datePicker("expirationDt", "month", "yyyy-MM-dd", '${data.info.EXPIRATION_DT}');

    $("#remarkCn").val('${data.info.REMARK_CN}');
    rprReceiptUpdate.init();
</script>
</body>
</html>