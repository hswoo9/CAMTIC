<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/engn/step1.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/engn/step3.js?v=${today}'/>"></script>
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
            <h3 class="card-title title_NM"><span style="position: relative; top: 3px;" id="pjtTitle">개발계획서</span>
                <input type="hidden" id="pjtStep" value="E3">
                <input type="hidden" id="pjtSn" value="${hashMap.PJT_SN}" />
                <input type="hidden" id="pjtStepNm" value="개발계획">
                <input type="hidden" id="step" value="4" />
            </h3>

            <div class="btn-st popButton">
                <button type="button" id="saveBtn" class="k-button k-button-solid-info" onclick="es3.fn_save()">저장</button>
                <button type="button" id="modBtn" class="k-button k-button-solid-primary" style="display: none;" onclick="es3.fn_mod()">수정</button>
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">닫기</button>
            </div>
        </div>
        <div>
            <table class="popTable table table-bordered mb-0">
                <colgroup>
                    <col width="10%">
                    <col width="10%">
                    <col width="20%">
                    <col width="20%">
                    <col width="10%">
                    <col width="10%">
                    <col width="20%">
                </colgroup>
                <thead>
                <tr>
                    <th>버전</th>
                    <th>문서번호</th>
                    <th>날짜</th>
                    <th>투자금액</th>
                    <th>등록자</th>
                    <th>예비원가서</th>
                    <th>상태</th>
                </tr>
                </thead>
                <tbody id="verTable">

                </tbody>
            </table>
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
                        <span class="red-star"></span>프로젝트 명
                    </th>
                    <td colspan="3">
                        <input type="text" id="pjtCd" disabled value="${hashMap.PJT_NM}" style="width: 90%; text-align: left" />
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>업체명
                    </th>
                    <td>
                        <input type="text" id="crmNm" disabled value="${hashMap.CRM_NM}" style="width: 90%; text-align: left" />
                    </td>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>PM
                    </th>
                    <td>
                        <input type="text" id="pm" disabled value="${pmInfo.DEPT_NAME} ${pmInfo.EMP_NAME_KR} ${pmInfo.POSITION_NAME}" style="width: 90%; text-align: left" />
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>수주일자
                    </th>
                    <td>
                        <input type="text" id="estDe" style="width: 90%;" value="${estMap.EST_DE}" disabled>
                    </td>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>수주가격
                    </th>
                    <td>
                        <input type="text" id="delvAmt" value="${hashMap.PJT_AMT}" style="text-align: right;width: 90%;" disabled> 원
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>투자금액
                    </th>
                    <td>
                        <input type="text" id="invAmt" style="width: 90%; text-align: right" value="" disabled> 원
                    </td>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>투자비율
                    </th>
                    <td>
                        <input type="text" id="invPer" style="width: 90%; text-align: right" disabled> %
                    </td>
                </tr>
                </thead>
            </table>

            <span style="position: relative; top:10px; font-size: 12px;">◎ 공정설정</span>
            <table class="popTable table table-bordered mb-0">
                <colgroup>
                    <col width="7%">
                    <col width="10%">
                    <col width="15%">
                    <col width="26%">
                    <col width="20%">
                    <col width="35%">
                </colgroup>
                <thead>
                <tr>
                    <th>순번</th>
                    <th>구분</th>
                    <th>공정명</th>
                    <th>추진일정</th>
                    <th>담당자</th>
                    <th>처리명령</th>
                </tr>
                </thead>
                <tbody id="psTable">
                <tr>
                    <td style="text-align: center"><span style="position: relative; top:5px">추가</span></td>
                    <td><input type="text" class="prepList" id="prepList" /></td>
                    <td><input type="text" class="psNm" id="psNm" /> </td>
                    <td style="text-align: center"><input type="text" class="psStrDe" id="psStrDe" style="width: 45%" />~<input type="text" class="psEndDe" style="width: 45%" id="psEndDe" /></td>
                    <td><input type="psEmpNm" disabled style="width: 100%" /></td>
                    <td style="text-align: center">
                        <button type="button" class="k-button k-button-solid-base" onclick="es3.fn_addProcess('${hashMap.PJT_SN}')">공정저장</button>
                    </td>
                </tr>
                </tbody>
            </table>

            <span style="position: relative; top:10px; font-size: 12px;">◎ 투자내역</span>
            <table class="popTable table table-bordered mb-0">
                <colgroup>
                    <col width="7%">
                    <col width="10%">
                    <col width="15%">
                    <col width="7%">
                    <col width="7%">
                    <col width="15%">
                    <col width="15%">
                    <col width="10%">
                    <col width="20%">
                </colgroup>
                <thead>
                <tr>
                    <th>순번</th>
                    <th>구분</th>
                    <th>건명</th>
                    <th>수량</th>
                    <th>단위</th>
                    <th>견적총액</th>
                    <th>견적처</th>
                    <th>비고</th>
                    <th>명령</th>
                </tr>
                </thead>
                <tbody id="invTable">
                <tr>
                    <td style="text-align: center"><span style="position: relative; top:5px">추가</span></td>
                    <td>
                        <input type="text" id="divNm" class="divNm" />
                        <span>
                            <input type="hidden" id="invSn" class="invSn" />
                        </span>
                    </td>
                    <td><input type="text" id="invNm" class="invNm" /></td>
                    <td><input type="text" id="invCnt" class="invCnt" style="text-align: right" onkeyup="es1.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" /></td>
                    <td><input type="text" id="invUnit" class="invUnit" /></td>
                    <td><input type="text" id="estTotAmt" style="text-align: right" class="estTotAmt" onkeyup="es1.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" /></td>
                    <td><input type="text" id="estOfc" class="estOfc" /></td>
                    <td><input type="text" id="invEtc" class="invEtc" /></td>
                    <td style="text-align: center;"><button type="button" id="addBtn" onclick="es3.fn_addInv()" class="k-button k-button-solid-base">추가</button></td>
                </tr>
                </tbody>
            </table>

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
                        <span class="red-star"></span>추진방향
                    </th>
                    <td colspan="3">
                        <textarea type="text" id="depObj" value="" style="width: 100%; text-align: left"></textarea>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>기타
                    </th>
                    <td colspan="3">
                        <textarea type="text" id="etc" value="" style="width: 100%; text-align: left"></textarea>
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
    es3.fn_defaultScript(inParameters);
    function fn_userMultiSelectPop(i) {
        idx = i;
        window.open("/user/pop/userMultiSelectPop.do","조직도","width=1365, height=610, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no");
    }

    function userDataSet(arr){
        console.log(arr);
        var psEmpSeq = "";
        var psEmpNm = "";
        for(var i = 0 ; i < arr.length ; i++){
            psEmpSeq += arr[i].empSeq + ",";
            psEmpNm += arr[i].empName + ",";
        }
        $("#psEmpNm" + idx).val(psEmpNm.slice(0, -1));
        $("#psEmpSeq" + idx).val(psEmpSeq.slice(0, -1));
    }


</script>
</body>
</html>