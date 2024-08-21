<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>

<body class="font-opensans" style="background-color:#fff;">
<script type="text/javascript" src="/js/intra/cam_crm/regCrmPop.js?v=${today}"/></script>
<script type="text/javascript" src="<c:url value='/js/postcode.v2.js?autoload=false'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_purc/reqClaiming.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_purc/purchase.js?v=${today}'/>"></script>
<input type="hidden" id="reqEmpSeq" value="${loginVO.uniqId}">

<style>
    .k-list-horizontal .k-radio-item {
        margin-right: 7px;
    }

    /*.k-radio-list.k-list-horizontal {*/
    /*    justify-content: space-around;*/
    /*}*/
</style>

<input type="hidden" id="stat" value="${params.stat}" />

<input type="hidden" id="itemSn" value="${params.itemSn}" />


<form id="claimDraftFrm" method="post">
    <input type="hidden" id="claimSn" name="claimSn" value="${params.claimSn}">
    <input type="hidden" id="purcSn" name="purcSn" value="${params.purcSn}">
    <input type="hidden" id="menuCd" name="menuCd" value="purcClaim">
    <input type="hidden" id="type" name="type" value="drafting">
    <input type="hidden" id="nowUrl" name="nowUrl" />
</form>

<div style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">
                <span style="position: relative; top: 3px;">
                    구매정보
                </span>
            </h3>
            <div class="btn-st popButton">
                <span id="claimBtnBox">

                </span>
                <button type="button" class="k-button k-button-solid-info" id="saveBtn" onclick="reqCl.fn_save();">저장</button>
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">닫기</button>
            </div>
        </div>

        <div style="padding: 20px 30px;">
            <input type="hidden" id="loginEmpSeq" value="${loginVO.uniqId}">
            <input type="hidden" id="loginDeptSeq" value="${loginVO.orgnztId}">
            <table class="popTable table table-bordered mb-0">
                <colgroup>
                    <col width="10%">
                    <col width="35%">
                    <col width="10%">
                    <col width="35%">
                </colgroup>
                <thead>
                <tr>
                    <th scope="row" class="text-center th-color">청구부서</th>
                    <td>
                        <c:if test="${map.CLAIM_DEPT_NAME != null}">
                            <div>${map.CLAIM_DEPT_NAME}</div>
                        </c:if>
                        <c:if test="${map.CLAIM_DEPT_NAME == null}">
                            <div>${loginVO.orgnztNm}</div>
                        </c:if>
                    </td>
                    <th scope="row" class="text-center th-color">직위</th>
                    <td>
                        <c:if test="${map.CLAIM_POSITION_NAME != null}">
                            <div>${map.CLAIM_POSITION_NAME}</div>
                        </c:if>
                        <c:if test="${map.CLAIM_POSITION_NAME == null}">
                            <div>${loginVO.positionNm}</div>
                        </c:if>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">성명</th>
                    <td>
                        <c:if test="${map.CLAIM_EMP_NAME != null}">
                            <div>${map.CLAIM_EMP_NAME}</div>
                        </c:if>
                        <c:if test="${map.CLAIM_EMP_NAME == null}">
                            <div>${loginVO.name}</div>
                        </c:if>
                    </td>
                    <th scope="row" class="text-center th-color">문서번호</th>
                    <td>
                        <c:if test="${map.DOC_NO != null}">
                            <div>${map.DOC_NO}</div>
                        </c:if>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color"><span class="red-star">*</span>사업구분</th>
                    <td>
                        <span id="purcType"></span>
                    </td>
                    <th scope="row" class="text-center th-color"><span class="red-star"></span>선지급여부</th>
                    <td>
                        <input type="checkbox" id="priPay" class="k-checkbox k-checkbox-lg k-checkbox-item" />
                    </td>
                    <%--<th scope="row" class="text-center th-color"><span class="red-star">*</span>결제구분</th>
                    <td>
                        <span id="expType"></span>
                    </td>--%>
                </tr>
                <th scope="row" class="text-center th-color"><span class="red-star"></span>계약여부</th>
                <td colspan="3">
                    <input type="checkbox" id="contYn" class="k-checkbox k-checkbox-lg k-checkbox-item" />
                </td>
                <tr>
                    <th scope="row" class="text-center th-color">비용지급방식</th>
                    <td>
                        <span id="paymentMethod"></span>
                    </td>
                    <th scope="row" class="purcLinkTh text-center th-color" style="display: none;">구매 링크</th>
                    <td class="purcLinkTh" style="display: none;">
                        <input id="purcLink" style="width: 90%;" />
                    </td>
                </tr>
                <tr id="project" style="display: none;">
                    <th scope="row" class="text-center th-color"><span class="red-star">*</span>프로젝트</th>
                    <td colspan="3">
                        <span>
                            <input type="text" id="pjtNm" style="width: 40%;">
                            <input type="hidden" id="pjtSn" />
                            <input type="hidden" id="pjtCd" name="pjtCd">
                            <button type="button" class="k-button k-button-solid-base" id="pjtSelBtn" onclick="reqCl.fn_projectPop()">검색</button>
                        </span>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">청구일시</th>
                    <td>
                        <input type="text" id="claimDe" style="width: 45%">
                    </td>
                    <th scope="row" class="text-center th-color">결제예정일</th>
                    <td>
                        <input type="text" id="expDe" style="width: 45%">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">비고</th>
                    <td>
                        <input type="text" id="claimEtc" style="width: 90%;">
                    </td>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>구매요청자
                    </th>
                    <td>
                        <input type="text" id="purcDeptName" style="width: 40%" value="" disabled>
                        <input type="hidden" id="purcDeptSeq" value="" disabled>
                        <input type="text" id="purcEmpName" value="" style="width: 30%" disabled>
                        <input type="hidden" id="purcEmpSeq" value="">
                        <button type="button" id="stfs" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="userSearch('reqClaiming');">
                            검색
                        </button>
                    </td>
                </tr>


                <tr>
                    <th scope="row" class="text-center th-color"><span class="red-star">*</span>제목</th>
                    <td colspan="3">
                        <input type="text" id="claimTitle" style="width: 90%;" value="${map.CLAIM_TITLE}">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color"><span class="red-star">*</span>구매목적</th>
                    <td colspan="3">
                        <input type="text" id="purcReqPurpose" style="width: 90%;" value="${map.PURC_REQ_PURPOSE}">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color"><span class="red-star">*</span>구매업체</th>
                    <td>
                        <input type="hidden" id="crmSn" class="crmSn" value="${map.CRM_SN}">
                        <input type="hidden" id="crmMonCheck" disabled class="crmMonCheck" value="">
                        <input type="text" id="crmNm" disabled class="crmNm" value="${map.CRM_NM}" style="width: 60%">
                        <button type="button" id="crmSelBtn" class="crmSelBtn k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="reqCl.fn_popCamCrmList();">업체선택</button>
                    </td>
                    <th scope="row" class="text-center th-color"><span class="red-star">*</span>부가세</th>
                    <td>
                        <span id="vat"></span>
                    </td>
                </tr>
                <tr style="display: none">
                    <th scope="row" class="text-center th-color">처리</th>
                    <td colspan="3">
                        <input type="checkbox" style="position: relative; top: 5px;" value="N" id="checkProfit">
                        <label for="checkProfit" style="position: relative; top: 3px;">처리</label>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color"><span class="red-star">*</span>견적서 파일<br>(구매 참고파일)</th>
                    <td colspan="3">
                        <form style="padding: 0px 30px;">
                            <div class="card-header" style="padding: 5px;">
                                <h3 class="card-title">첨부파일 (견적서 必 첨부, 인터넷 구매등은 해당 화면 캡쳐하여 업로드)</h3>
                                <div class="card-options">
                                    <div class="filebox">
                                        <button type="button" class="fileUpload k-grid-button k-button k-button-md k-button-solid k-button-solid-base" id="fileUpload" onclick="$('#fileList').click()">
                                            <span class="k-icon k-i-track-changes-enable k-button-icon"></span>
                                            <span class="k-button-text">파일첨부</span>
                                        </button>
                                        <input type="file" id="fileList" name="fileList" onchange="reqCl.addFileInfoTable();" multiple style="display: none"/>
                                        <button type="button" class="k-button k-button-solid-base" onclick="reqCl.fn_multiDownload();" style="margin-left: 5px;">일괄 다운로드</button>
                                    </div>
                                </div>
                            </div>
                            <div class="table-responsive">
                                <table class="popTable table table-bordered mb-0">
                                    <colgroup>
                                        <col width="50%">
                                        <col width="10%">
                                        <col width="30%">
                                        <col width="10%">
                                        <col width="10%">
                                    </colgroup>
                                    <thead>
                                    <tr class="text-center th-color">
                                        <th>파일명</th>
                                        <th>확장자</th>
                                        <th>용량</th>
                                        <th>기타</th>
                                    </tr>
                                    </thead>
                                    <tbody id="fileGrid">
                                    <tr class="defultTr">
                                        <td colspan="4" style="text-align: center">선택된 파일이 없습니다.</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </form>
                    </td>
                </tr>
                </thead>
            </table>

            <table class="popTable table table-bordered mb-0">
                <colgroup>
                    <col width="30%">
                    <col width="30%">
                    <col width="40%">
                </colgroup>
                <thead>
                    <tr>
                        <th>견적가</th>
                        <th>세액</th>
                        <th>합계</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <input type="text" id="estAmt" disabled value="0" style="text-align: right" onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" />
                        </td>
                        <td>
                            <input type="text" id="vatAmt" disabled value="0" style="text-align: right" onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" />
                        </td>
                        <td>
                            <input type="text" id="totAmt" disabled value="0" style="text-align: right" onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" />
                        </td>
                    </tr>
                </tbody>
            </table>


            <div class="mt-20">
                <div class="text-right">
                    <button type="button" id="addBtn" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="reqCl.addRow()">
                        <span class="k-button-text">추가</span>
                    </button>
                </div>

                <div style="width: 100%; overflow-x: scroll !important; overflow-y: hidden;">
                    <table class="popTable table table-bordered mb-0 mt-20" style="table-layout: fixed">
                        <colgroup>
                            <%--                        <col style="width: 3%;">--%>
                            <col style="width: 480px;">
                            <col style="width: 220px;">
                            <col style="width: 220px;">
                            <col style="width: 80px;">
                            <col style="width: 120px;">
                            <col style="width: 80px;">
                            <col style="width: 120px;">
                            <col style="width: 120px;">
                            <%--                        <col style="width: 7%;">--%>
                            <%--                        <col style="width: 7%;">--%>
                            <col style="width: 120px;">
                            <%--                        <col style="width: 18%;">--%>
                            <col style="width: 200px;">
                            <col style="width: 80px;">
                        </colgroup>
                        <thead>
                        <tr>
                            <%--                            <th>번호</th>--%>
                            <th>구분</th>
                            <th>품명</th>
                            <th>규격</th>
                            <th>수량</th>
                            <th>단가</th>
                            <th>단위</th>
                            <th>공급가액</th>
                            <th>세액</th>
                            <th>금액</th>
                            <%--                            <th>요청금액</th>--%>
                            <%--                            <th>할인금액</th>--%>
                            <th>비고</th>
                            <%--                            <th>자산</th>--%>
                            <th>명령</th>
                        </tr>
                        </thead>
                        <tbody id="claimTbody">
                        <tr class="claimItem newArray" id="item0">
                            <%--                            <td style="text-align: center">--%>
                            <%--                                <div id="claimIndex">1</div>--%>
                            <%--                                <input type="hidden" id="claimItemSn0" />--%>
                            <%--                            </td>--%>
                            <td>
                                <input type="hidden" id="purcItemSn0" name="purcItemSn0" class="purcItemSn">
                                <input type="text" id="purcItemType0" class="purcItemType" style="width: 110px">
                                <input type="text" id="productA0" class="productA" style="width: 110px">
                                <input type="text" id="productB0" class="productB" style="width: 110px; display: none">
                                <input type="text" id="productC0" class="productC" style="width: 110px; display: none">
                            </td>
                            <td>
                                <input type="text" id="itemNm0" class="itemNm">
                            </td>
                            <td>
                                <input type="text" id="itemStd0" class="itemStd">
                            </td>
                            <td>
                                <input type="text" id="itemEa0" style="text-align: right" class="itemEa" onkeyup="reqCl.fn_calcN('0', this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                            </td>
                            <td>
                                <input type="text" id="itemUnitAmt0" style="text-align: right" class="itemUnitAmt" onkeyup="reqCl.fn_calcN('0', this)" oninput="this.value = this.value.replace(/[^-0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                            </td>
                            <td>
                                <input type="text" id="itemUnit0" class="itemUnit">
                            </td>
                            <td>
                                <input type="text" id="purcSupAmt0" class="purcSupAmt" disabled onkeyup="prp.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" style="text-align: right">
                            </td>
                            <td>
                                <input type="text" id="purcVatAmt0" class="purcVatAmt" disabled onkeyup="prp.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" style="text-align: right">
                            </td>
                            <td>
                                <input type="text" id="itemAmt0" class="itemAmt" style="text-align: right" disabled onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                            </td>
                            <%--                            <td>--%>
                            <%--                                <input type="text" id="purcItemAmt0" class="itemAmt" style="text-align: right" disabled onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">--%>
                            <%--                            </td>--%>
                            <%--                            <td>--%>
                            <%--                                <input type="text" id="difAmt0" class="difAmt" value="0" style="text-align: right" onkeyup="reqCl.fn_calcN('0', this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">--%>
                            <%--                            </td>--%>
                            <td>
                                <label for="itemEtc0"></label><input type="text" id="itemEtc0" class="itemEtc">
                            </td>
                            <%--                            <td>--%>
                            <%--                                <span id="prodCd"></span>--%>
                            <%--                            </td>--%>
                            <td style="text-align: center">
                                <button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="reqCl.fn_delete('0')">
                                    <span class="k-button-text">삭제</span>
                                </button>
                            </td>
                        </tr>
                        </tbody>
                        <%--                    <tfoot>--%>
                        <%--                    <tr>--%>
                        <%--                        <th colspan="8" style="text-align: right; font-weight: bold">--%>
                        <%--                            가격조정--%>
                        <%--                        </th>--%>
                        <%--                        <td colspan="2" style="text-align: right; font-weight: bold">--%>
                        <%--                            <input type="text" id="discountAmt" style="text-align: right;" onkeyup="reqCl.fn_calcN(0, this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" value="0" />--%>
                        <%--                        </td>--%>
                        <%--                    </tr>--%>
                        <%--                    </tfoot>--%>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript">
    reqCl.fn_defaultScript();

    function userSearch(p) {
        window.open("/common/deptListPop.do?params=" + p , "조직도", "width=750, height=650");
    }

    function selectProject(sn, nm, cd, baseYear){
        $("#pjtSn").val(sn);
        $("#pjtNm").val(nm);
        $("#pjtCd").val(cd);

        var pt = "";
        if($("#purcType").getKendoRadioGroup().value() == "R"){
            pt = "R&D";
        } else if($("#purcType").getKendoRadioGroup().value() == "S"){
            pt = "비R&D";
        } else if($("#purcType").getKendoRadioGroup().value() == "D"){
            pt = "엔지니어링";
        } else if($("#purcType").getKendoRadioGroup().value() == "V"){
            pt = "용역/기타";
        }
        $("#claimTitle").val( "["+ pt +"] "+ $("#pjtNm").val()+ " 구매청구");
    }
</script>
</body>
</html>