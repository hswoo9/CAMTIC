<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<script type="text/javascript" src="<c:url value='/js/intra/cam_mng/payApp/regReListFilePop.js?v=${today}'/>"></script>
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

<input type="hidden" id="payAppSn" name="payAppSn" value="${params.payAppSn}"/>
<input type="hidden" id="exnpSn" name="exnpSn" value="${params.exnpSn}"/>
<input type="hidden" id="type" name="type" value="${params.type}"/>

<div style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM"><span style="position: relative; top: 3px;" id="pjtTitle">증빙서류</span>
            </h3>

            <div id="payAppBtnDiv" class="btn-st popButton" style="font-size: 13px;">
                <c:if test="${params.type != 'exnp'}">
                    <button type="button" class="k-button k-button-solid-info" onclick="regReListFilePop.fn_deadLine();">마감</button>
                    <button type="button" class="k-button k-button-solid-info" id="saveBtn" onclick="regReListFilePop.fn_regist();">등록</button>
                </c:if>
                <button type="button" class="k-button k-button-solid-error" onclick="fn_close();">닫기</button>
            </div>
        </div>
        <div style="padding: 20px 30px;">
            <c:if test="${params.type != 'exnp'}">
                <div style="float:right; position: relative; color: red; font-size: 11px;">거래명세서 / 계좌이체동의서 / 미비첨부파일 등</div>
                <td style="text-align: center;" colspan="5">
                    <label for="payFileList" style="font-size: 13px;" class="k-button k-button-solid-base">파일첨부</label>
                    <input type="file" id="payFileList" name="payFileList" onchange="regReListFilePop.fileChange();" style="display: none" multiple>
                    <span id="payFileName"></span>
                </td>
            </c:if>
            <button type="button" class="k-button k-button-solid-base" onclick="regReListFilePop.fn_multiDownload();" style="font-size: 13px;">일괄 다운로드</button>
            <table id="popTable" class="popTable table table-bordered mb-0">
                <thead>
                <tr>
                    <th>파일명</th>
                    <th>확장자</th>
                    <th>크기</th>
                    <th>뷰어</th>
                    <c:if test="${params.type != 'exnp'}">
                        <th>기타</th>
                    </c:if>
                </tr>
                </thead>
                <tbody id="fileGrid">
                <tr id="emptyTr">
                    <td colspan="5" style="text-align: center">등록된 파일이 없습니다.</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
<script>
    regReListFilePop.fn_DefaultScript();

    function fn_close() {
        window.close();
    }
</script>
</body>
</html>