<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>

<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/engn/devInfo.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js?${today}'/>"></script>

<input type="hidden" id="engnSn" value="${params.engnSn}" />
<input type="hidden" id="expAmt" value="${params.expAmt}" />
<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>

<form id="devDraftFrm" method="post">
    <input type="hidden" id="pjtSn" name="pjtSn" value="${params.pjtSn}" />
    <input type="hidden" id="devSn" name="devSn" value="">
    <input type="hidden" id="menuCd" name="menuCd" value="dev">
    <input type="hidden" id="type" name="type" value="drafting">
    <input type="hidden" id="nowUrl" name="nowUrl" />
</form>


<input type="hidden" id="step" value="E3" />
<input type="hidden" id="stepColumn" value="STEP4" />
<input type="hidden" id="nextStepColumn" value="STEP5" />
<input type="hidden" id="stepValue" value="Y" />
<input type="hidden" id="nextStepValue" value="R" />

<div style="padding: 10px">
    <div class="table-responsive">
        <div id="devBtnDiv">
            <%--<button type="button" id="saveBtn" style="float: right; margin-bottom: 5px;" class="k-button k-button-solid-info" onclick="devInfo.fn_save()">저장</button>--%>
        </div>
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
                    <input type="text" id="devPjtNm" disabled value="${hashMap.PJT_NM}" style="width: 90%; text-align: left" />
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>업체명
                </th>
                <td>
                    <input type="text" id="devCrmInfo" disabled value="${hashMap.CRM_NM}" style="width: 90%; text-align: left" />
                </td>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>PM
                </th>
                <td>
                    <input type="text" id="pm" disabled value="[${hashMap.DEPT_NAME}] ${hashMap.EMP_NAME_KR} (${hashMap.POSITION_NAME})" style="width: 90%; text-align: left" />
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>수주일자
                </th>
                <td>
                    <input type="text" id="estDe" style="width: 90%;" value="<fmt:formatDate pattern="yyyy-MM-dd" value="${hashMap.STR_DT}" />" disabled>
                </td>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>수주가격
                </th>
                <td>
                    <input type="text" id="devDelvAmt" value="${hashMap.PJT_AMT}" style="text-align: right;width: 90%;" disabled> 원
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
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>견적서
                </th>
                <td>
                    <label for="estFile" class="k-button k-button-solid-base">파일첨부</label>
                    <input type="file" id="estFile" name="estFile" onchange="devInfo.fileChange(this)" style="display: none">
                    <span id="estFileName"></span>
                </td>
                <th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>납품서
                </th>
                <td>
                    <label for="devFile" class="k-button k-button-solid-base">파일첨부</label>
                    <input type="file" id="devFile" name="devFile" onchange="devInfo.fileChange(this)" style="display: none">
                    <span id="devFileName"></span>
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
                <th><span class="red-star">*</span>구분</th>
                <th><span class="red-star">*</span>공정명</th>
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
                <td>
                    <input type="text" id="psEmpNm" disabled style="width: 100%" />
                    <input type="hidden" id="psEmpSeq" />
                </td>
                <td style="text-align: center">
                    <button type="button" class="k-button k-button-solid-base" onclick="devInfo.fn_addProcess('${hashMap.PJT_SN}')">공정저장</button>
                    <button type="button" onclick="fn_userMultiSelectPop()" class="k-button k-button-solid-base">추진담당</button>
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
                <th><span class="red-star">*</span>구분</th>
                <th><span class="red-star">*</span>건명</th>
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
                <td><input type="text" id="invCnt" class="invCnt" style="text-align: right" onkeyup="devInfo.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" /></td>
                <td><input type="text" id="invUnit" class="invUnit" /></td>
                <td><input type="text" id="estTotAmt" style="text-align: right" class="estTotAmt" onkeyup="devInfo.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" /></td>
                <td><input type="text" id="estOfc" class="estOfc" /></td>
                <td><input type="text" id="invEtc" class="invEtc" /></td>
                <td style="text-align: center;"><button type="button" id="addBtn" onclick="devInfo.fn_addInv()" class="k-button k-button-solid-base">추가</button></td>
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

<script>
    devInfo.fn_defaultScript();

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
        $("#psEmpNm").val(psEmpNm.slice(0, -1));
        $("#psEmpSeq").val(psEmpSeq.slice(0, -1));
    }
</script>
</body>
</html>