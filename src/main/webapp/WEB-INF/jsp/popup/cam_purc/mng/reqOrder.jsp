<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>

<body class="font-opensans" style="background-color:#fff;">
<script type="text/javascript" src="<c:url value='/js/intra/cam_purc/reqOrder.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_purc/purchase.js?v=${today}'/>"></script>

<input type="hidden" id="claimSn" name="claimSn" value="${map.CLAIM_SN}">
<input type="hidden" id="purcSn" name="purcSn" value="${params.purcSn}">

<div style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">
                <span style="position: relative; top: 3px;">
                    발주처리
                </span>
            </h3>
            <div id="reqPurcBtnDiv" class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-info" id="saveBtn" onclick="reqCl.fn_save();">저장</button>
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
                <thead id="order">
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
                    <th scope="row" class="text-center th-color">사업구분</th>
                    <td>
                        <span id="purcType"></span>
                    </td>
<%--                    <th scope="row" class="text-center th-color">결재구분</th>--%>
<%--                    <td>--%>
<%--                        <span id="expType"></span>--%>
<%--                    </td>--%>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        구매요청자
                    </th>
                    <td>
                        <span id="purcDeptName"></span>
                        <span id="purcEmpName"></span>
                    </td>
                    <th scope="row" class="text-center th-color">청구일시</th>
                    <td>
                        <span id="claimDe">${map.CLAIM_DE}</span>
                    </td>
                </tr>
                <tr id="project" style="display: none;">
                    <th scope="row" class="text-center th-color">
                        프로젝트
                    </th>
                    <td colspan="3">
                        <span>
                            <span id="pjtNm"></span>
                        </span>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">제목</th>
                    <td colspan="3">
                        ${map.CLAIM_TITLE}
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">구매목적</th>
                    <td colspan="3">
                        <span id="purcReqPurpose">${map.PURC_REQ_PURPOSE}</span>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">비고</th>
                    <td>
                        <span id="claimEtc"></span>
                    </td>
                </tr>

                <tr>
                    <th scope="row" class="text-center th-color">구매업체</th>
                    <td>
                        <input type="hidden" id="crmSn" class="crmSn" value="${map.CRM_SN}">
                        <input type="text" id="crmNm" disabled class="crmNm" value="${map.CRM_NM}" style="width: 60%">
                        <button type="button" id="crmSelBtn" class="crmSelBtn k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="reqCl.fn_popCamCrmList();">업체선택</button>
                    </td>
                    <th scope="row" class="text-center th-color">부가세</th>
                    <td>
                        <span id="vat"></span>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">발주일</th>
                    <td>
                        <input id="orderDt" style="width: 180px"/>
                    </td>
                    <th scope="row" class="text-center th-color">납품 요청일</th>
                    <td>
                        <input id="goodsDt" style="width: 180px"/>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">전화번호</th>
                    <td>
                        <input id="PHNum" style="width: 300px"/>
                    </td>
                    <th scope="row" class="text-center th-color">팩스번호</th>
                    <td>
                        <input id="FaxNum" style="width: 300px"/>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">특이사항</th>
                    <td colspan="3">
                        <textarea id="significant" style="width: 1080px; height: 100px"></textarea>
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

                <table class="popTable table table-bordered mb-0 mt-20">
                    <colgroup>
                        <col style="width: 5%;">
                        <col style="width: 15%;">
                        <col style="width: 5%;">
                        <col style="width: 5%;">
                        <col style="width: 7%;">
                        <col style="width: 5%;">
                        <col style="width: 10%;">
                        <col style="width: 7%;">
<%--                        <col style="width: 10%;">--%>
                        <col style="width: 5%;">
                    </colgroup>
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>품명</th>
                            <th>규격</th>
                            <th>수량</th>
                            <th>단가</th>
                            <th>단위</th>
                            <th>금액</th>
                            <th>비고</th>
<%--                            <th>가격조정</th>--%>
                            <th>명령</th>
                        </tr>
                    </thead>
                    <tbody id="claimTbody">
                        <tr class="claimItem newArray" id="item">
                            <td style="text-align: center">
                                <div id="claimIndex">1</div>
                                <input type="hidden" id="claimItemSn" />
                            </td>
                            <td>
                                <input type="text" id="itemNm" class="itemNm">
                            </td>
                            <td>
                                <input type="text" id="itemStd" class="itemStd">
                            </td>
                            <td>
                                <input type="text" id="itemEa" style="text-align: right" class="itemEa" onkeyup="reqCl.fn_calc('', this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                            </td>
                            <td>
                                <input type="text" id="itemUnitAmt" style="text-align: right" class="itemUnitAmt" onkeyup="reqCl.fn_calc('', this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                            </td>
                            <td>
                                <input type="text" id="itemUnit" class="itemUnit">
                            </td>
                            <td>
                                <input type="text" id="itemAmt" class="itemAmt" style="text-align: right" disabled onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                            </td>
                            <td>
                                <label for="itemEtc"></label><input type="text" id="itemEtc" class="itemEtc">
                            </td>
<%--                            <td>--%>
<%--                                <input type="text" id="discountAmt" style="text-align: right;" onkeyup="reqCl.fn_calcN(0, this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" value="0" />--%>
<%--                            </td>--%>
                            <td style="text-align: center">
                                <button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="reqCl.fn_delete(this)">
                                    <span class="k-button-text">삭제</span>
                                </button>
                            </td>
                        </tr>
                    </tbody>
<%--                    <tfoot>--%>
<%--                    <tr>--%>
<%--                        <th colspan="7" style="text-align: right; font-weight: bold">--%>
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
<script type="text/javascript">
    reqOr.fn_defaultScript();
</script>
</body>
</html>