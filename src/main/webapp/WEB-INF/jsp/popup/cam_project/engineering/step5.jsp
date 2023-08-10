<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/engn/step1.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/engn/step5.js?v=${today}'/>"></script>
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
<input type="hidden" id="documentSn" value="${data.documentContractSn}"/>
<input type="hidden" id="deptName" style="width: 40%" value="${loginVO.orgnztNm}" disabled>
<input type="hidden" id="deptSeq" value="${loginVO.orgnztId}" disabled>
<input type="hidden" id="befExpAmt" value="${hashMap.EXP_AMT}" />
<div style="padding:0;">
    <div class="table-responsive">
        <input type="hidden" id="menuCd" name="menuCd" value="${menuCd}">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM"><span style="position: relative; top: 3px;" id="pjtTitle">납품</span>
                <input type="hidden" id="pjtStep" value="E5">
                <input type="hidden" id="pjtSn" value="${hashMap.PJT_SN}" />
                <input type="hidden" id="pjtStepNm" value="납품">
                <input type="hidden" id="step" value="6" />
            </h3>

            <div class="btn-st popButton">
                <button type="button" id="saveBtn" class="k-button k-button-solid-info" onclick="es5.fn_save()">저장</button>
                <button type="button" id="modBtn" class="k-button k-button-solid-primary" style="display: none;" onclick="es5.fn_mod()">수정</button>
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">닫기</button>
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
                        <span class="red-star"></span>프로젝트코드
                    </th>
                    <td colspan="3">
                        <input type="text" id="pjtCd" disabled value="${hashMap.PJT_CD}" style="width: 90%; text-align: left" />
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>견적명
                    </th>
                    <td colspan="3">
                        <input type="text" id="pjtNm" disabled value="${hashMap.PJT_NM}" style="width: 90%; text-align: left" />
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>의뢰일자
                    </th>
                    <td>
                        <input type="text" id="estDe" style="width: 90%;" disabled>
                        <input type="hidden" id="befEstDe" value="${estMap.EST_DE}" />
                    </td>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>납기일
                    </th>
                    <td>
                        <input type="text" id="delvDe" style="width: 90%;">
                    </td>
                </tr>
                <tr style="display: none;">
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>개요
                    </th>
                    <td colspan="3">
                        <textarea type="text" id="sumry" style="width: 100%;"></textarea>
                    </td>
                </tr>
                <tr style="display: none;">
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>사양
                    </th>
                    <td colspan="3">
                        <textarea type="text" id="specf" style="width: 100%;"></textarea>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>납품품목
                    </th>
                    <td>
                        <input type="text" id="delvItem" style="width: 90%;">
                    </td>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>납품수량
                    </th>
                    <td>
                        <input type="text" id="delvCnt" style="width: 90%;" onkeyup="es1.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>납품단위
                    </th>
                    <td>
                        <input type="text" id="delvUnit" style="width: 90%;">
                    </td>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>납품장소
                    </th>
                    <td>
                        <input type="text" id="delvLoc" style="width: 90%;">
                    </td>
                </tr>
                <tr style="display: none;">
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>납품수단
                    </th>
                    <td colspan="3">
                        <span style="position: relative; top: 5px;">
                            <input type="radio" id="vatN" name="delvMeans" value="고객수령" checked>
                            <label for="vatN">고객수령</label>
                            <input type="radio" id="vatY" name="delvMeans" value="법인차량" style="margin-left:10px;">
                            <label for="vatY">법인차량</label>
                            <input type="radio" id="vatC" name="delvMeans" value="외부업체" style="margin-left:10px;">
                            <label for="vatC">외부업체</label>
                        </span>
                    </td>
                </tr>
                <tr style="display: none;">
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>품질보증
                    </th>
                    <td colspan="3">
                        <textarea type="text" id="delvAssu" style="width: 100%;"></textarea>
                    </td>
                </tr>
                <tr style="display: none;">
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>검수
                    </th>
                    <td colspan="3">
                        <textarea type="text" id="delvTest" style="width: 100%;"></textarea>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>특이사항
                    </th>
                    <td colspan="3">
                        <textarea type="text" id="delvIssu" style="width: 100%;"></textarea>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>수주금액
                    </th>
                    <td colspan="3">
                        <input type="text" id="delvAmt" style="text-align: right; width: 40%;" onkeyup="es1.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" /> 원
                        <input type="hidden" id="expAmt" value="${hashMap.EXP_AMT}" />
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>참여부서
                    </th>
                    <td colspan="3">
                        <span style="position: relative; top: 5px;">
                            <input type="radio" id="A" name="delvDept" value="0">
                            <label for="A">부서내 진행</label>
                            <input type="radio" id="B" name="delvDept" value="1" style="margin-left:10px;">
                            <label for="B">부서간 협업</label>
                        </span>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>PM
                    </th>
                    <td colspan="3">
                        <input type="text" id="empName" style="width: 25%;" disabled />
                        <input type="hidden" id="empSeq" style="width: 25%;" />
                        <button type="button" id="za" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="userSearch()">
                            조회
                        </button>
                    </td>
                </tr>
                </thead>
            </table>
        </div>

    </div>
</div>

<div id="dialog"></div>
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/regProject.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/inside/document/docuPop.js?v=${today}'/>"></script>

<script>
    var inParameters = ''//JSON.parse('${map}');

    var idx = 0;
    es5.fn_defaultScript(inParameters);
    function fn_userMultiSelectPop(i) {
        idx = i;
        window.open("/user/pop/userMultiSelectPop.do","조직도","width=1365, height=610, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no");
    }

</script>
</body>
</html>