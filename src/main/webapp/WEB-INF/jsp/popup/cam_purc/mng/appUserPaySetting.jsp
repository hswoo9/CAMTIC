<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<script type="text/javascript" src="<c:url value='/js/intra/cam_purc/appUserPaySetting.js?v=${today}'/>"></script>

<input type="hidden" id="purcSn" name="purcSn" value="${params.purcSn}"/>
<input type="hidden" id="claimSn" name="claimSn" value="${params.claimSn}"/>
<input type="hidden" id="regEmpSeq" name="regEmpSeq" value="${loginVO.uniqId}"/>

<div style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM"><span style="position: relative; top: 3px;" id="pjtTitle">지출요청 <span id="etcStatus">(검수전)</span></span>
            </h3>

            <div id="payAppBtnDiv" class="btn-st popButton" style="font-size: 13px;">
                <button type="button" class="k-button k-button-solid-info" id="saveBtn" onclick="appUserPaySetting.fn_regist();">지출요청</button>
                <button type="button" class="k-button k-button-solid-error" onclick="fn_close();">닫기</button>
            </div>
        </div>
        <div style="padding: 20px 30px;">
            <table id="setTable" class="popTable table table-bordered mb-0">
                <colgroup>
                    <col width="15%">
                    <col width="35%">
                    <col width="15%">
                    <col width="35%">
                </colgroup>
                <thead>
                <tr>
                    <th><span class="red-star">*</span>사용자설정</th>
                    <td colspan="3">
                        <input type="text" id="empName" disabled style="width: 15%;">
                        <input type="hidden" id="empSeq">
                        <button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="userSearch();">
                            검색
                        </button>
                    </td>
                </tr>
                </thead>
            </table>

        </div>
        <div style="padding: 20px 30px;">
            <table id="popTable" class="popTable table table-bordered mb-0">
                <colgroup>
                    <col width="5%">
                    <col width="20%">
                    <col width="35%">
                    <col width="15%">
                    <col width="15%">
                    <col width="10%">
                </colgroup>
                <thead>
                <tr>
                    <th>연번</th>
                    <th>문서번호</th>
                    <th>업체명</th>
                    <th>대상금액</th>
                    <th>지출금액</th>
                    <th>삭제</th>
                </tr>
                </thead>
                <tbody id="payTableBody">

                </tbody>
            </table>
            <input type="hidden" id="reqAmtTotal">
        </div>
    </div>

    <%-- 첨부파일 --%>
    <div class="table-responsive">
        <div style="padding: 20px 30px;">
            <c:if test="${params.type != 'exnp'}">
                <div style="float:right; position: relative; color: red; font-size: 12px;">거래명세서 / 계좌이체동의서 / 미비첨부파일 등</div>
                <td style="text-align: center;" colspan="5">
                    <label for="payFileList" style="font-size: 13px;" class="k-button k-button-solid-base">파일첨부</label>
                    <input type="file" id="payFileList" name="payFileList" onchange="appUserPaySetting.fileChange(this)" style="display: none" multiple>
                    <span id="payFileName"></span>
                </td>
            </c:if>
            <table class="popTable table table-bordered mb-0">
                <thead>
                <tr>
                    <th>파일명</th>
                    <th>확장자</th>
                    <th>크기</th>
                    <th>뷰어</th>
                    <c:if test="${params.type != 'exnp'}">
                        <th>기타</th>
                    </c:if>
                </tr>
                </thead>
                <tbody id="fileGrid">
                <tr id="emptyTr">
                    <td colspan="5" style="text-align: center">등록된 파일이 없습니다.</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>

    <%-- 증빙유형 선택 --%>
    <div class="table-responsive">
        <div style="padding: 20px 30px;">
            <div>
                <span style="font-weight: bold;">증빙서류</span>
                <span style="float:right; position: relative; color: red; font-size: 12px;">세금계산서, 법인카드 증빙서류가 필요한 경우에만 선택해주세요 (지출요청 후 지급신청서에서 확인 가능)</span>
            </div>
            <div style="font-size: 13px; text-align: right;">
                <button type="button" id="addBtn" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="appUserPaySetting.addRow()">
                    <span class="k-button-text">추가</span>
                </button>
            </div>
            <table class="popTable table table-bordered mb-0">
                <colgroup>
                    <col style="width: 6%;">
                    <col style="width: 6%;">
                    <col style="width: 6%;">
                    <col style="width: 4%;">
                    <col style="width: 6%;">
                    <col style="width: 4%;">
                    <col style="width: 5%;">
                    <col style="width: 4%;">
                    <col style="width: 4%;">
                    <col style="width: 4%;">
                    <col style="width: 3%;">
                </colgroup>
                <thead>
                <tr>
                    <th>증빙유형</th>
                    <th>상호</th>
                    <th>사업자(주민)번호</th>
                    <th>은행명</th>
                    <th>지급계좌</th>
                    <th>예금주</th>
                    <th>거래일</th>
                    <th>총액</th>
                    <th>공급가액</th>
                    <th>세액</th>
                    <th>기타</th>
                </tr>
                </thead>
                <tbody id="payDestTb">
                <tr class="payDestInfo newArray" id="pay0" style="text-align: center;">
                    <td>
                        <input type="hidden" id="payDestSn0" name="payDestSn" class="payDestSn">
                        <input type="text" id="eviType0" class="eviType" style="width: 100%">
                        <input type="hidden" id="fileNo0" class="fileNo">
                        <input type="hidden" id="card0" class="card">
                        <input type="hidden" id="cardNo0" class="cardNo">
                        <input type="hidden" id="authNo0" class="authNo" style="width: 100%">
                        <input type="hidden" id="authHh0" class="authHh" style="width: 100%">
                        <input type="hidden" id="authDd0" class="authDd" style="width: 100%">
                        <input type="hidden" id="issNo0" class="issNo">
                        <input type="hidden" id="coCd0" class="coCd">
                        <input type="hidden" id="taxTy0" class="taxTy">
                    </td>
                    <td style="font-size: 10px">
<%--                        <i class="k-i-plus k-icon" style="cursor: pointer" id="plusIcon0"  onclick="regPayDet.fn_popRegDet(1, 0)"></i>--%>
                        <input type="text" style="width: 100%" id="crmNm0" class="crmNm" disabled>
                        <input type="hidden" id="buySts0" value="" />
                        <input type="hidden" id="trCd0" class="trCd">
                    </td>
                    <td>
                        <input id="regNo0" class="regNo0" style="width: 100%" disabled>
                    </td>
                    <td>
                        <input type="text" id="crmBnkNm0" class="crmBnkNm" disabled>
                    </td>
                    <td>
                        <input type="text" id="crmAccNo0" class="crmAccNo" disabled>
                    </td>
                    <td>
                        <input type="text" id="crmAccHolder0" class="crmAccHolder" disabled>
                    </td>
                    <td>
                        <input type="text" id="trDe0" class="trDe" disabled>
                    </td>
                    <td>
                        <input type="text" id="totCost0" class="totCost" value="0" style="text-align: right" disabled>
                    </td>
                    <td>
                        <input type="text" id="supCost0" class="supCost" value="0" style="text-align: right" disabled>
                    </td>
                    <td>
                        <input type="text" id="vatCost0" class="vatCost" value="0" style="text-align: right" disabled>
                    </td>
                    <td>
                        <div style="text-align: center">
                            <button type="button" class="k-button k-button-solid-error" id="detDelBtn" onclick="regPayDet.delRow(0)">삭제</button>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>


    <div class="table-responsive" id="histGridDiv">
        <div style="padding: 20px 30px;">
            <div>
                <span style="font-weight: bold;">지출요청이력</span>
            </div>

            <div id="appUserSettingHistGrid"></div>
        </div>
    </div>

</div>
<script>
    appUserPaySetting.fn_DefaultScript();

    function fn_close() {
        window.close();
    }
</script>
</body>
</html>