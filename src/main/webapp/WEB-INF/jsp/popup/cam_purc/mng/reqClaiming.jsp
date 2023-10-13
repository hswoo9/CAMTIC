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
<input type="hidden" id="stat" value="${params.stat}" />

<form id="purcDraftFrm" method="post">
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
            <div id="purcBtnDiv" class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-info" id="reqBtn" style="display: none" onclick="prp.purcDrafting();">요청하기</button>
                <button type="button" class="k-button k-button-solid-info" id="reqCancelBtn" onclick="prp.setPurcReqStatusUpd('W');" style="display: none">요청취소</button>
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
                        <c:if test="${map.DEPT_NAME != null}">
                            <div>${map.DEPT_NAME}</div>
                        </c:if>
                        <c:if test="${map.DEPT_NAME == null}">
                            <div>${loginVO.orgnztNm}</div>
                        </c:if>
                    </td>
                    <th scope="row" class="text-center th-color">직위</th>
                    <td>
                        <c:if test="${map.POSITION_NAME != null}">
                            <div>${map.POSITION_NAME}</div>
                        </c:if>
                        <c:if test="${map.POSITION_NAME == null}">
                            <div>${loginVO.positionNm}</div>
                        </c:if>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">성명</th>
                    <td>
                        <c:if test="${map.EMP_NAME_KR != null}">
                            <div>${map.EMP_NAME_KR}</div>
                        </c:if>
                        <c:if test="${map.EMP_NAME_KR == null}">
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
                    <th scope="row" class="text-center th-color">구매구분</th>
                    <td>
                        <span id="purcType"></span>
                    </td>
                    <th scope="row" class="text-center th-color">결재구분</th>
                    <td>
                        <span id="expType"></span>
                    </td>
                </tr>
                <tr id="project" style="display: none;">
                    <th scope="row" class="text-center th-color">프로젝트</th>
                    <td colspan="3">
                        <span>
                            <input type="text" id="pjtNm" style="width: 40%;">
                            <input type="hidden" id="pjtSn" />
                            <button type="button" class="k-button k-button-solid-base" id="pjtSelBtn" onclick="prp.fn_projectPop()">검색</button>
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
                        <button type="button" id="stfs" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="userSearch('mng');">
                            검색
                        </button>
                    </td>
                </tr>


                <tr>
                    <th scope="row" class="text-center th-color">제목</th>
                    <td colspan="3">
                        <input type="text" id="claimTitle" style="width: 90%;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">구매목적</th>
                    <td colspan="3">
                        <input type="text" id="purcReqPurpose" style="width: 90%;" value="">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">구매업체</th>
                    <td>
                        <input type="hidden" id="crmSn" class="crmSn">
                        <input type="text" id="crmNm" disabled class="crmNm" style="width: 60%">
                        <button type="button" id="crmSelBtn" class="crmSelBtn k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="reqCl.fn_popCamCrmList();">업체선택</button>
                    </td>
                    <th scope="row" class="text-center th-color">부가세</th>
                    <td>
                        <span id="vat"></span>
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
                            <input type="text" id="estAmt" value="0" style="text-align: right" onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" />
                        </td>
                        <td>
                            <input type="text" id="vatAmt" value="0" style="text-align: right" onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" />
                        </td>
                        <td>
                            <input type="text" id="totAmt" value="0" style="text-align: right" onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" />
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

                <table class="popTable table table-bordered mb-0 mt-20">
                    <colgroup>
                        <col style="width: 5%;">
                        <col style="width: 10%;">
                        <col style="width: 5%;">
                        <col style="width: 5%;">
                        <col style="width: 7%;">
                        <col style="width: 5%;">
                        <col style="width: 7%;">
                        <col style="width: 7%;">
                        <col style="width: 16%;">
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
                            <th>자산</th>
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
                            <td>
                                <span id="prodCd"></span>
                            </td>
                            <td style="text-align: center">
                                <button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="reqCl.fn_delete(this)">
                                    <span class="k-button-text">삭제</span>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript">
    reqCl.fn_defaultScript();

    function userSearch(p) {
        window.open("/common/deptListPop.do?params=" + p , "조직도", "width=750, height=650");
    }
</script>
</body>
</html>