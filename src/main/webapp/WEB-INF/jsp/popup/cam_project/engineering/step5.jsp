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
                        <span class="red-star"></span>상담코드
                    </th>
                    <td>
                        <input type="text" id="pjtCd" disabled value="${hashMap.PJT_CD}" style="width: 90%; text-align: left" />
                    </td>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>납품일자
                    </th>
                    <td>
                        <input type="text" id="delvDe" style="width: 90%;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>수신
                    </th>
                    <td>
                        <input type="text" id="crmNm" disabled value="${hashMap.CRM_NM}" style="width: 90%; text-align: left" />
                    </td>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>참고
                    </th>
                    <td>
                        <input type="text" id="crmMem" disabled value="${hashMap.PM}" style="width: 100%;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>품명
                    </th>
                    <td colspan="3">
                        <input type="text" id="pjtNm" disabled value="${hashMap.PJT_NM}" style="width: 100%;" />
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>특이사항
                    </th>
                    <td colspan="3">
                        <textarea type="text" id="estIss" style="width: 100%;">${estMap.EST_ISS}</textarea>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>납품가 합계
                    </th>
                    <td colspan="3">
                        <input type="text" id="expAmt" onkeyup="es1.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" style="width: 40%; text-align: right"> 원
                    </td>
                </tr>
                </thead>
            </table>

            <span style="float: right; margin-top:10px;font-size: 12px; font-weight: bold"> * 품목이 1개인 경우에도 반드시 추가 버튼을 이용하여 저장하시기 바랍니다.</span>
            <table class="popTable table table-bordered mb-0">
                <colgroup>
                    <col width="7%">
                    <col width="20%">
                    <col width="10%">
                    <col width="10%">
                    <col width="15%">
                    <col width="15%">
                    <col width="10%">
                    <col width="8%">
                </colgroup>
                <thead>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>번호
                    </th>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>품명 및 규격
                    </th>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>수량
                    </th>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>단위
                    </th>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>단가
                    </th>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>공급가액
                    </th>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>비고
                    </th>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>
                    </th>
                </tr>
                </thead>
                <tbody id="productTb">
                <tr>
                    <td style="text-align: center"><span style="position: relative; top:5px">추가</span></td>
                    <td><input type="text" class="prodNm" alias="prodNm" id="prodNm" /></td>
                    <td><input type="text" class="prodCnt" alias="prodCnt" id="prodCnt" style="text-align: right;" onkeyup="es1.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" /></td>
                    <td><input type="text" class="unit" alias="unit" id="unit" /></td>
                    <td><input type="text" class="unitAmt" alias="unitAmt" id="unitAmt" style="text-align: right;" onkeyup="es1.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" /></td>
                    <td><input type="text" class="supAmt" alias="supAmt" id="supAmt" disabled style="text-align: right;" /></td>
                    <td><input type="text" class="prodEtc" alias="prodEtc" id="prodEtc" /></td>
                    <td style="text-align: center"><button type="button" id="addBtn" class="k-button k-button-solid-base">추가</button> </td>
                </tr>
                </tbody>
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
    es1.fn_setData();

</script>
</body>
</html>