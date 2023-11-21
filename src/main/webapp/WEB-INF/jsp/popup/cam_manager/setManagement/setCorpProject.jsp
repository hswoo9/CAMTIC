<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>

<script type="text/javascript" src="<c:url value='/js/intra/cam_mng/setManagement/setCorpProject.js?v=${today}'/>"></script>
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

<input type="hidden" id="corpPjtSn" value="${params.corpPjtSn}"/>

<div style="padding:0;">
    <div class="table-responsive">
        <input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM"><span style="position: relative; top: 3px;" id="pjtTitle">법인 프로젝트 등록</span>

            </h3>

            <div class="btn-st popButton" style="font-size: 13px">
                <button type="button" id="approveBtn" class="k-button k-button-solid-info" style="display: none;" onclick="setCorpPjt.fn_approve()">승인요청</button>
                <button type="button" id="saveBtn" class="k-button k-button-solid-info" onclick="setCorpPjt.fn_save()">저장</button>
                <button type="button" id="modBtn" class="k-button k-button-solid-primary" style="display: none;" onclick="setCorpPjt.fn_save()">수정</button>
                <button type="button" class="k-button k-button-solid-error" onclick="window.close()">닫기</button>
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
                    <td>
                        <input type="text" disabled id="pjtCd" style="width: 90%;">
                    </td>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>책임자
                    </th>
                    <td>
                        <input type="text" id="deptName" style="width: 40%" disabled>
                        <input type="hidden" id="deptSeq" disabled>
                        <input type="text" id="empName" style="width: 30%" disabled>
                        <input type="hidden" id="empSeq">
                        <button type="button" id="staffSelect" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="userSearch();">
                            검색
                        </button>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>관련사업
                    </th>
                    <td colspan="3">
                        <input type="text" id="linkPjt" style="width: 90%;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>프로젝트 명
                    </th>
                    <td colspan="3">
                        <input type="text" id="pjtNm" style="width: 90%;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>프로젝트 약칭
                    </th>
                    <td colspan="3">
                        <input type="text" id="pjtSubNm" style="width: 90%;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>프로젝트 시작일
                    </th>
                    <td>
                        <input type="text" id="strDt" style="width: 90%;">
                    </td>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>프로젝트 종료일
                    </th>
                    <td>
                        <input type="text" id="endDt" style="width: 90%;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>사업비 분리사용 유무
                    </th>
                    <td colspan="3">
                        <span>
                            <div style="float: left">
                                <input type="radio" id="sbjSepN" name="sbjSepYn" value="N" style="position: relative; top: 3px;">
                                <label for="sbjSepN">없음</label>
                                <input type="radio" id="sbjSepY" name="sbjSepYn" value="Y" style="position: relative; top: 3px;">
                                <label for="sbjSepY">있음</label>
                            </div>
                            <div style="float: left; padding-left: 10px;">
                                <div id="checkboxDiv" style="display: none"> |&nbsp&nbsp
                                    <label for="at1"><input type='checkbox' style="position: relative; top: 3px;" id='at1' name='accountType' class='accountType' value='1'/> 국비&nbsp&nbsp</label>
                                    <label for="at2"><input type='checkbox' style="position: relative; top: 3px;" id='at2' name='accountType' class='accountType' value='2'/> 도비&nbsp&nbsp</label>
                                    <label for="at3"><input type='checkbox' style="position: relative; top: 3px;" id='at3' name='accountType' class='accountType' value='3'/> 시비&nbsp&nbsp</label>
                                    <label for="at4"><input type='checkbox' style="position: relative; top: 3px;" id='at4' name='accountType' class='accountType' value='4'/> 자부담&nbsp&nbsp</label>
                                    <label for="at5"><input type='checkbox' style="position: relative; top: 3px;" id='at5' name='accountType' class='accountType' value='5'/> 업체부담&nbsp&nbsp</label>
                                    <label for="at9"><input type='checkbox' style="position: relative; top: 3px;" id='at9' name='accountType' class='accountType' value='9'/> 기타</label>
                                </div>
                            </div>
                        </span>
                    </td>
                </tr>
                </thead>
            </table>
        </div>
    </div>
</div>

<script>

    setCorpPjt.fn_defaultScript();

    function userSearch(type, pk) {
        window.open("/common/deptListPop.do?type="+type+"&pk="+pk, "조직도", "width=750, height=650");
    }

</script>
</body>
</html>