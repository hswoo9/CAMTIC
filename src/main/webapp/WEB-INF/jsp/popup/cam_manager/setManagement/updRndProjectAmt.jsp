<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>

<script type="text/javascript" src="<c:url value='/js/intra/cam_mng/setManagement/updRndProjectAmt.js?v=${today}'/>"></script>
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

<input type="hidden" id="pjtSn" value="${params.pjtSn}"/>
<input type="hidden" id="govtPjtSn" value="${params.govtPjtSn}" />

<div style="padding:0;">
    <div class="table-responsive">
        <input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM"><span style="position: relative; top: 3px;" id="pjtTitle">전/차년도 매출, 수익 설정</span></h3>
            <div class="btn-st popButton" style="font-size: 13px">
                <button type="button" id="saveBtn" class="k-button k-button-solid-info" onclick="updRndAmt.fn_save()">저장</button>
                <button type="button" id="canBtn"  class="k-button k-button-solid-error" onclick="window.close()">닫기</button>
            </div>
        </div>
        <div style="padding : 10px">
            <table class="popTable table table-bordered mb-0" id="mainTable">
                <colgroup>
                    <col width="15%">
                    <col width="35%">
                    <col width="15%">
                    <col width="35%">
                </colgroup>
                <thead>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>프로젝트 코드
                    </th>
                    <td colspan="3" id="pjtCd">${data.PJT_CD}</td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>프로젝트 명
                    </th>
                    <td colspan="3" id="pjtNm">${data.PJT_NM}</td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>전년도 매출액
                    </th>
                    <td>
                        <input type="text" id="prevSaleAmt" style="text-align: right;" onkeyup="fn_inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" value="0">
                    </td>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>전년도 운영수익
                    </th>
                    <td>
                        <input type="text" id="prevIncpAmt" style="text-align: right;" onkeyup="fn_inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" value="0">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>차년도 매출액
                    </th>
                    <td>
                        <input type="text" id="nextSaleAmt" style="text-align: right;" onkeyup="fn_inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" value="0">
                    </td>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>차년도 운영수익
                    </th>
                    <td>
                        <input type="text" id="nextIncpAmt" style="text-align: right;" onkeyup="fn_inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" value="0">
                    </td>
                </tr>
                </thead>
            </table>
        </div>
    </div>
</div>
<div id="dialog"></div>

<script>
    updRndAmt.fn_defaultScript();
</script>
</body>
</html>