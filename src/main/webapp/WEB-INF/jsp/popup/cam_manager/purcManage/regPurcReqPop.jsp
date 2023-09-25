<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>

<body class="font-opensans" style="background-color:#fff;">
<script type="text/javascript" src="/js/intra/cam_crm/regCrmPop.js?v=${today}"/></script>
<script type="text/javascript" src="<c:url value='/js/postcode.v2.js?autoload=false'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_manager/purcManage/regPurcReqPop.js?v=${today}'/>"></script>

<div style="padding:0;">
    <div class="table-responsive">
        <input type="hidden" id="purcSn" name="purcSn" value="${params.purcSn}">

        <div class="card-header pop-header">
            <h3 class="card-title title_NM">
                <span style="position: relative; top: 3px;">
                    구매요청서 작성
                </span>
            </h3>
            <div class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-info" id="reqBtn" onclick="prp.setPurcReq('C');">요청하기</button>
                <button type="button" class="k-button k-button-solid-info" id="reqCancelBtn" onclick="prp.setPurcReqStatusUpd('W');" style="display: none">요청취소</button>
                <button type="button" class="k-button k-button-solid-info" id="saveBtn" onclick="prp.setPurcReq('W');">저장</button>
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close()">닫기</button>
            </div>
        </div>

        <div style="padding: 20px 30px;">
            <input type="hidden" id="purcReqEmpSeq" value="${loginVO.uniqId}">
            <input type="hidden" id="purcReqDeptSeq" value="${loginVO.orgnztId}">
            <table class="popTable table table-bordered mb-0">
                <colgroup>
                    <col width="10%">
                    <col width="35%">
                    <col width="10%">
                    <col width="35%">
                </colgroup>
                <thead>
                <tr>
                    <th scope="row" class="text-center th-color">요청일자</th>
                    <td>
                        <input type="text" id="purcReqDate" style="width: 22%;">
                    </td>
                    <th scope="row" class="text-center th-color">문서번호</th>
                    <td>

                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">요청자</th>
                    <td id="purcReqEmpName">
                        ${loginVO.name}
                    </td>
                    <th scope="row" class="text-center th-color">요청부서</th>
                    <td id="purcReqDeptName">
                        ${loginVO.orgnztNm}
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">요청목적</th>
                    <td colspan="3">
                        <input type="text" id="purcReqPurpose" style="width: 90%;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">구매구분</th>
                    <td colspan="3">
                        <span id="purcType"></span>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">견적서 파일</th>
                    <td colspan="3">
                        <input type="hidden" id="file1Sn" name="file1Sn">
                        <label for="file1" class="k-button k-button-solid-base">파일첨부</label>
                        <input type="file" id="file1" name="file1" onchange="prp.fileChange(this)" style="display: none">
                        <span id="file1Name"></span>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">요청서 파일</th>
                    <td colspan="3">
                        <input type="hidden" id="file2Sn" name="file1Sn">
                        <label for="file2" class="k-button k-button-solid-base">파일첨부</label>
                        <input type="file" id="file2" name="file2" onchange="prp.fileChange(this)" style="display: none">
                        <span id="file2Name"></span>
                    </td>
                </tr>
                </thead>
            </table>

            <div class="mt-20">
                <div class="text-right">
                    <button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="prp.addRow()">
                        <span class="k-button-text">추가</span>
                    </button>
                </div>

                <table class="popTable table table-bordered mb-0 mt-20">
                    <colgroup>
                        <col>
                        <col>
                        <col style="width: 10%;">
                        <col style="width: 6%;">
                        <col style="width: 6%;">
                        <col style="width: 6%;">
                        <col style="width: 8%;">
                        <col>
                        <col style="width: 10%">
                        <col>
                        <col>
                    </colgroup>
                    <thead>
                    <tr>
                        <th>구분</th>
                        <th>품명</th>
                        <th>규격</th>
                        <th>단가</th>
                        <th>수량</th>
                        <th>단위</th>
                        <th>금액</th>
                        <th>업체명</th>
                        <th>비고</th>
                        <th>진행상태</th>
                        <th>삭제</th>
                    </tr>
                    </thead>
                    <tbody id="purcItemTb">
                    <tr class="purcItemInfo newArray" id="item0">
                        <td>
                            <input type="hidden" id="purcItemSn0" name="purcItemSn0" class="purcItemSn">
                            <input type="text" id="purcItemType0" class="purcItemType">
                        </td>
                        <td>
                            <input type="text" id="purcItemName0" class="purcItemName">
                        </td>
                        <td>
                            <input type="text" id="purcItemStd0" class="purcItemStd">
                        </td>
                        <td>
                            <input type="text" id="purcItemUnitPrice0" class="purcItemUnitPrice" onkeydown="return onlyNumber(this)" onkeyup="removeChar(event);">
                        </td>
                        <td>
                            <input type="text" id="purcItemQty0" class="purcItemQty" onkeydown="return onlyNumber(this)" onkeyup="removeChar(event);">
                        </td>
                        <td>
                            <input type="text" id="purcItemUnit0" class="purcItemUnit">
                        </td>
                        <td>
                            <input type="text" id="purcItemAmt0" class="purcItemAmt" style="text-align: right" onkeyup="prp.inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                        </td>
                        <td>
                            <input type="hidden" id="crmSn0" class="crmSn">
                            <input type="text" id="crmNm0" class="crmNm" style="width: 70%">
                            <button type="button" id="crmSelBtn0" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="prp.fn_popCamCrmList('crmSn0', 'crmNm0');">업체 선택</button>
                        </td>
                        <td>
                            <input type="text" id="rmk0" class="rmk">
                        </td>
                        <td></td>
                        <td>
                            <button type="button" id="delRowBtn0" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="prp.delRow(this)">
                                삭제
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>

                <input type="hidden" id="crmSn" onchange="prp.crmInfoChange()">
                <input type="hidden" id="crmNm">
            </div>
        </div>
    </div>
</div>
<script type="text/javascript">
    prp.fn_defaultScript();
</script>
</body>
</html>