<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>

<jsp:useBean id="today" class="java.util.Date" />
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/engn/teamInfo.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js?${today}'/>"></script>

<input type="hidden" id="pjtSn" value="${params.pjtSn}" />

<input type="hidden" id="engnSn" value="${params.engnSn}" />
<input type="hidden" id="estSn" value="${params.estSn}" />
<input type="hidden" id="loginEmpSeq" value="${loginVO.uniqId}"/>

<div style="padding: 10px">
    <div id="btnDiv">
        <button type="button" id="saveBtn" style="float: right; margin-bottom: 10px;" class="k-button k-button-solid-info" onclick="teamInfo.fn_save()">협업요청</button>
    </div>
    <div id="btnDiv2" style="display: none">
        <button type="button" id="resetBtn" style="float: right; margin-bottom: 10px;" class="k-button k-button-solid-base" onclick="teamInfo.fn_reset()">초기화</button>
    </div>
    <div class="table-responsive">
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
                    <span class="red-star"></span>배분 프로젝트 명
                </th>
                <td colspan="3">
                    <input type="text" id="teamPjtNm" disabled value="${hashMap.PJT_NM}" style="width: 90%; text-align: left" />
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>협업부서
                </th>
                <td>
                    <input type="text" id="teamDept" style="width: 90%;">
                </td>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>협업팀
                </th>
                <td>
                    <input type="text" id="team" style="width: 90%;" />
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>담당자(PM)
                </th>
                <td>
                    <input type="text" id="teamPMNm" style="width: 80%;" disabled />
                    <input type="hidden" id="teamPMSeq" />
                    <button type="button" id="teamPMBtn" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="userSearch()">
                        조회
                    </button>
                </td>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>협업시스템
                </th>
                <td>
                    <input type="text" id="teamPjt" disabled value="${hashMap.BUSN_NM}" style="width: 90%;" />
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>업체선택
                </th>
                <td colspan="3">
                    <input type="text" id="teamCrmNm" style="width: 40%;" disabled />
                    <input type="hidden" id="teamCrmSn" />
                    <button type="button" id="" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="teamInfo.fn_popCamCrmList()">
                        조회
                    </button>
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>배분금액
                </th>
                <td colspan="3">
                    <input type="text" id="teamAmt" value="0" onkeyup="teamInfo.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" style="width: 40%; text-align: right" /> 원
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>수주부서 예상잔액
                </th>
                <td>
                    <input type="text" id="exptBalance" disabled onkeyup="teamInfo.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" style="width: 90%; text-align: right" /> 원
                </td>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>수주부서 예상수익
                </th>
                <td>
                    <input type="text" id="exptProfit" value="0" disabled onkeyup="teamInfo.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" style="width: 90%; text-align: right" /> 원
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>수주부서 예상수익률
                </th>
                <td>
                    <input type="text" id="exptProfitPer" value="0" onkeyup="teamInfo.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" style="width: 90%; text-align: right"> %
                </td>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>수주부서 예상비용
                </th>
                <td>
                    <input type="text" id="exptCost" disabled onkeyup="teamInfo.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" style="width: 90%; text-align: right"> 원
                </td>
            </tr>
            </thead>
        </table>

        <div id="teamMainGrid" style="margin-top: 20px"></div>
    </div>
</div>

<script>
    teamInfo.fn_defaultScript();

    function userSearch() {
        window.open("/common/deptListPop.do", "조직도", "width=750, height=650");
    }
</script>
</body>
</html>