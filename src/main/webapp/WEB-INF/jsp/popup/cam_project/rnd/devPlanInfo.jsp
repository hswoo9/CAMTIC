<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<jsp:useBean id="today" class="java.util.Date" />

<script type="text/javascript" src="<c:url value='/js/intra/cam_project/commonProject.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_project/engn/devInfo.js?v=${today}'/>"></script>

<script type="text/javascript" src="<c:url value='/js/intra/cam_project/rnd/rndDevPlan.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js?${today}'/>"></script>

<input type="hidden" id="step" value="R1" />
<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="regEmpSeq" value="${loginVO.uniqId}"/>

<form id="rndDevDraftFrm" method="post">
    <input type="hidden" id="pjtSn" name="pjtSn" value="${params.pjtSn}" />
    <input type="hidden" id="devSn" name="devSn" value="" />
    <input type="hidden" id="menuCd" name="menuCd" value="rndDev">
    <input type="hidden" id="type" name="type" value="drafting">
    <input type="hidden" id="nowUrl" name="nowUrl" />
</form>
<div class="devInfo" style="padding: 10px">
    <div class="table-responsive">
        <div id="devBtnDiv" style="display: none">
            <button type="button" id="addVerBtn2" style="float: right; margin-bottom: 5px; margin-right: 5px;" class="k-button k-button-solid-base" onclick="rndDP.fn_addVersion()">수행계획서 추가</button>
        </div>


        <br><br>

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
                <th>수행계획서</th>
                <th>상태</th>
            </tr>
            </thead>
            <tbody id="verTable">

            </tbody>
        </table>
        <div style="margin-top: 10px"></div>
        <span class="addPSActive" style="font-size: 12px; margin-bottom: 0; display: none">◎ 공정설정</span>
        <table class="popTable table table-bordered mb-0 addPSActive" style="display: none; margin-top: 0px">
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
                    <button type="button" onclick="fn_userMultiSelectPop()" class="k-button k-button-solid-base">추진담당</button>
                    <button type="button" class="k-button k-button-solid-base" onclick="devInfo.fn_addProcess('${params.pjtSn}')">공정저장</button>
                </td>
            </tr>
            </tbody>
        </table>

        <div id="addPSActive" style="display: none;">
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
                        <span class="red-star"></span>개발목표/개발내용
                    </th>
                    <td colspan="3">
                        <textarea id="devPlanCont" style="width: 100%; text-align: left"></textarea>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>특이사항
                    </th>
                    <td colspan="3">
                        <textarea id="devPlanIss" style="width: 100%; text-align: left"></textarea>
                    </td>
                </tr>
                </thead>
            </table>

            <div style="margin-top: 10px"></div>
            <span class="addPSActive" style="font-size: 12px; margin-bottom: 0; display: none">◎ 예상비용</span>
            <table class="popTable table table-bordered mb-0" style="font-size: 12px; margin-top: 0">
                <colgroup>
                    <col width="7%">
                    <col width="15%">
                    <col width="10%">
                    <col width="10%">
                    <col width="10%">
                    <col width="15%">
                    <col width="15%">
                    <col width="14%">
                    <col width="20%">
                </colgroup>
                <thead>
                <tr>
                    <th>순번</th>
                    <th><span class="red-star">*</span>건명</th>
                    <th>수량</th>
                    <th>단위</th>
                    <th>단가</th>
                    <th>견적금액</th>
                    <th><span class="red-star">*</span>견적처</th>
                    <th>비고</th>
                    <th>명령</th>
                </tr>
                </thead>
                <tbody id="invTable">
                <tr>
                    <td style="text-align: center"><span style="position: relative; top:5px">추가</span></td>
                    <td><input type="text" id="invNm" class="invNm" /></td>
                    <td><input type="text" id="invCnt" class="invCnt" style="text-align: right" onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" /></td>
                    <td><input type="text" id="invUnit" class="invUnit" /></td>
                    <td><input type="text" id="invUnitPrice" class="invUnitPrice" style="text-align: right" onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" /></td>
                    <td><input type="text" id="estTotAmt" style="text-align: right" class="estTotAmt" disabled/></td>
                    <td>
                        <input type="text" id="estOfc" class="estOfc" style="width: 78%"/>
                        <button type="button" id="" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="rndDP.fn_popCamCrmList()">
                            조회
                        </button>
                    </td>
                    <td><input type="text" id="invEtc" class="invEtc" /></td>
                    <td style="text-align: center;"><button type="button" id="addBtn" onclick="rndDP.fn_addInv()" class="k-button k-button-solid-base">추가</button></td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>

<script>
    rndDP.fn_defaultScript();

    function fn_userMultiSelectPop(i) {
        idx = i;
        window.open("/user/pop/userMultiSelectPop.do?type=dev","조직도","width=1365, height=610, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no");
    }

    function userDataSet(arr){
        console.log(arr);
        var psEmpSeq = "";
        var psEmpNm = "";

        var prepList = $("#prepList").val();
        var psNm = $("#psNm").val();
        var psStrDe = $("#psStrDe").val();
        var psEndDe = $("#psEndDe").val();

        for(var i = 0 ; i < arr.length ; i++){
            psEmpSeq = arr[i].empSeq;
            psEmpNm  = arr[i].empName;

            $("#psEmpNm").val(psEmpNm);
            $("#psEmpSeq").val(psEmpSeq);

            if(arr.length > 1){
                devInfo.fn_addProcess('d')

                $("#prepList").data("kendoDropDownList").value(prepList);
                $("#psNm").val(psNm);
                $("#psStrDe").val(psStrDe);
                $("#psEndDe").val(psEndDe);
            }
        }

    }

    function fn_selCrmInfo(e){
        rndDP.selCrmInfo(e);
    }
</script>