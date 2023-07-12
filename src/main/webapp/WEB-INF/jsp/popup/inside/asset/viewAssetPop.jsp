<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<style>
    .card-header {padding: 0px 0px 0px 0px;}
    table { background-color: #00000008; }
    .table > tbody > tr > th, .table > tfoot > tr > th{ background-color: #8fa1c04a;}
</style>
<body class="font-opensans" style="background-color:#fff;">
<div class="col-lg-12" style="padding:0;">
    <div class="card-header">
        <div class="table-responsive">
            <div style="background-color: #00397f;">
                <div class="card-header" style="display:flex; justify-content: space-between; padding: 0px 0px 10px 0px; padding-right: 15px; padding-left: 15px; height: 50px;">
                    <h3 class="card-title title_NM" style="font-size:18px; color: #f1faff;">자산정보조회</h3>
                    <div style="margin-top:10px;">
                        <button type="button" class="k-button k-button-solid-base" onclick="">자산관리카드 인쇄</button>
                        <button type="button" class="k-button k-button-solid-base" onclick="">바코드 출력(대)</button>
                        <button type="button" class="k-button k-button-solid-base" onclick="">바코드 출력(소)</button>
                        <button type="button" class="k-button k-button-solid-info" onclick="assetModPop()">편집</button>
                        <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close();">닫기</button>
                    </div>
                </div>
            </div>

            <div style="padding: 20px 30px;">
                <input type="hidden" id="astInfoSn" name="astInfoSn" value="${data.AST_INFO_SN}">
                <input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}">
                <table class="table table-bordered mb-0">
                    <colgroup>
                        <col width="18%">
                        <col width="35%">
                        <col width="18%">
                        <col width="35%">
                    </colgroup>
                    <thead>
                    <tr>
                        <th colspan="4" style="font-size: 14px; font-weight:600;background-color: #00397f96; color: #fff;">
                            자산정보
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th scope="row" class="text-center th-color">자산구분</th>
                        <td colspan="3">
                            ${data.AST_GUBUN}
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color">자산코드</th>
                        <td>
                            ${data.AST_NO}
                        </td>
                        <th scope="row" class="text-center th-color">바코드</th>
                        <td>
                            ${data.AST_NO}
                            <c:choose>
                                <c:when test="${data.BARCODE_TYPE eq '1'}">(大)</c:when>
                                <c:otherwise>(小)</c:otherwise>
                            </c:choose>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color">자산명</th>
                        <td colspan="3">
                            ${data.AST_NAME}
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color">구입 일자</th>
                        <td>
                            ${data.PURC_DATE}
                        </td>
                        <th scope="row" class="text-center th-color">구입 금액</th>
                        <td>
                            <fmt:formatNumber value="${data.PURC_PRICE}" pattern="#,###"/>원
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color">
                            규격
                        </th>
                        <td>
                            ${data.MODEL_SIZE}
                        </td>
                        <th scope="row" class="text-center th-color">모델명</th>
                        <td>
                            ${data.MODEL_NAME}
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color">
                            구입 업체
                        </th>
                        <td>
                            ${data.PURC_COMPANY_NAME}
                        </td>
                        <th scope="row" class="text-center th-color">제조사</th>
                        <td>
                            ${data.MF_COMPANY}
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color">
                            구입 수량
                        </th>
                        <td>
                            ${data.QTY}
                        </td>
                        <th scope="row" class="text-center th-color">생산 국가</th>
                        <td>
                            ${data.ORG_COUNTRY}
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color">
                            자금출처 및 지출계좌
                        </th>
                        <td colspan="3">
                            ${data.FUNDING_SOURCE_TXT}
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color">
                            설치 장소
                        </th>
                        <td>
                            ${data.AST_PLACE_NAME}
                        </td>
                        <th scope="row" class="text-center th-color">
                            사용자
                        </th>
                        <td>
                            ${data.EMP_NAME}
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color">
                            물품관리관(정)
                        </th>
                        <td>
                            ${astManage.MANAGE_MAIN_EMP_NAME}
                        </td>
                        <th scope="row" class="text-center th-color">
                            물품관리관(부)
                        </th>
                        <td>
                            ${astManage.MANAGE_SUB_EMP_NAME}
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color">용도</th>
                        <td colspan="3">
                            ${data.PURPOSE}
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color">비고</th>
                        <td colspan="3">
                            ${data.REMARK}
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color">
                            자산 상태
                        </th>
                        <td>
                            ${data.INSIDE_DT_CODE_NM}
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color">관련 파일</th>
                        <td colspan="3" style="padding:5px;">
                            <c:if test="${data.relatedFile ne null}">
                                <span onclick="fileDown('${data.relatedFile.file_path}${data.relatedFile.file_uuid}', '${data.relatedFile.file_org_name}.${data.relatedFile.file_ext}')">
                                    ${data.relatedFile.file_org_name}.${data.relatedFile.file_ext}
                                </span>
                            </c:if>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color">자산 사진</th>
                        <td colspan="3" style="padding:5px;">
                            <c:if test="${data.astFile ne null}">
                                <img src="${data.astFile.file_path}${data.astFile.file_uuid}">
                            </c:if>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color">관련 청구서</th>
                        <td colspan="3" style="padding:5px;">

                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color">관련 소모품</th>
                        <td colspan="3" style="padding:5px;">

                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <div style="padding: 20px 30px;">
                <table class="table table-bordered mb-0">
                    <colgroup>
                        <col width="18%">
                        <col width="35%">
                        <col width="18%">
                        <col width="35%">
                    </colgroup>
                    <thead>
                    <tr>
                        <th colspan="4" style="font-size: 14px; font-weight:600;background-color: #00397f96; color: #fff;">
                            정보갱신 이력(${fn:length(data.history)})
                        </th>
                    </tr>
                    </thead>
                </table>
                <c:forEach var="h" items="${data.history}" varStatus="status">
                    <table class="table table-bordered mb-0">
                        <colgroup>
                            <col width="10%">
                        </colgroup>
                        <tbody>
                        <tr>
                            <th class="text-center th-color">정보변경</th>
                            <td style="padding:5px;">
                                    ${h.REG_DATE} / ${h.REG_EMP_NAME} / ${h.REG_EMP_IP}
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <c:forEach var="hi" items="${data.historyItem}" varStatus="status">
                                    <c:if test="${h.AST_INFO_MOD_SN eq hi.AST_INFO_MOD_SN}">
                                        [${hi.MOD_ITEM_NAME}] ${hi.MOD_OLD_ITEM_INFO} → ${hi.MOD_NEW_ITEM_INFO} <br>
                                    </c:if>
                                </c:forEach>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </c:forEach>
            </div>
        </div>
    </div>
</div>
</body>
<script>
    function assetModPop(){
        self.location.href = "/inside/addAssetPop.do?astInfoSn=" + $("#astInfoSn").val() + "&modify=Y";
    }

    function fileDown(filePath, fileName){
        kendo.saveAs({
            dataURI: "/common/fileDownload.do?filePath=" + filePath + "&fileName=" + encodeURIComponent(fileName),
        });
    }

</script>