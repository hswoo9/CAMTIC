<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/inside/asset/addAssetPop.js?v=${today}"/></script>
<body class="font-opensans" style="background-color:#fff;">
<div class="col-lg-12" style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">자산 추가</h3>
            <div class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-info" onclick="addAssetPop.fn_saveAstInfo()">저장</button>
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close();">닫기</button>
            </div>
        </div>
        <div style="padding: 20px 30px;">
            <input type="hidden" id="menuCd" name="menuCd" value="${params.menuCd}">
            <input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}">
            <input type="hidden" id="regEmpName" name="regEmpName" value="${loginVO.name}">
            <input type="hidden" id="astInfoSn" name="astInfoSn" value="${params.astInfoSn}">
            <input type="hidden" id="mod" name="mod" value="${params.modify}">
            <table class="popTable table table-bordered mb-0">
                <colgroup>
                    <col width="18%">
                    <col width="35%">
                    <col width="12%">
                    <col width="35%">
                </colgroup>
                <thead>
                <%--<tr>
                    <th colspan="4" style="font-size: 14px; font-weight:600;background-color: #00397f96; color: #fff;">
                        자산 정보 입력
                    </th>
                </tr>--%>
                </thead>
                <thead>
                <tr>
                    <th scope="row" class="text-center th-color"><span class="red-star"></span>자산 구분</th>
                    <td colspan="3">
                        <input type="text" id="astCodeCompanyId" style="width: 18%;">
                        <input type="text" id="astTypeCode" style="width: 18%;">
                        <input type="text" id="astCodeId1" style="width: 18%;">
                        <input type="text" id="astCodeId2" style="width: 18%;">
                        <input type="text" id="astCodeId3" style="width: 18%;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">자산명</th>
                    <td colspan="3"><input type="text" id="astName" style="width: 100%;"></td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color"><span class="red-star"></span>구입 일자</th>
                    <td>
                        <input type="text" id="purcDate" style="width: 100%;">
                    </td>
                    <th scope="row" class="text-center th-color">구입 금액</th>
                    <td>
                        <input type="text" id="purcPrice" style="width: 90%; text-align: right;">원
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color"><span class="red-star"></span>규격</th>
                    <td><input type="text" id="modelSize" style="width: 100%;">
                    <th scope="row" class="text-center th-color">모델명</th>
                    <td><input type="text" id="modelName" style="width: 100%;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color"><span class="red-star"></span>구입 업체</th>
                    <td>
                        <input type="hidden" id="purcCompanyId" style="width: 70%;" value="1">
                        <input type="text" id="purcCompanyName" style="width: 70%;">
                        <button type="button" id="search" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="">
                            <span class="k-button-text">검색</span>
                        </button>
                    </td>
                    <th scope="row" class="text-center th-color">제조사</th>
                    <td>
                        <input type="text" id="mfCompany" style="width: 100%;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>자산 상태
                    </th>
                    <td><input type="text" id="astStsCode" style="width: 100%;">
                    <th scope="row" class="text-center th-color">생산 국가</th>
                    <td><input type="text" id="orgCountry" style="width: 100%;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color"><span class="red-star"></span>구입 수량 / 단위</th>
                    <td>
                        <input type="text" id="qty" style="width: 55px;"> /
                        <input type="text" id="unit" style="width: 75px;">
                        <input type="text" id="unitText" style="width: 75px;">
                        <input type="text" id="regType" style="width: 95px;">
                    </td>
                    <th scope="row" class="text-center th-color">바코드 타입</th>
                    <td>
                        <input type="text" id="barcodeType" style="width: 100%;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>자금출처 및 지출계좌
                    </th>
                    <td colspan="3">
                        <span id="fundingSource" style="gap: 0px;"></span>
                        <input type="text" id="expAccount" style="width: 50%;">
                        <button type="button" id="bizSearchBtn" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" style="display: none;" onclick="addAssetPop.rdTaskPopup();">
                            <span class="k-button-text">사업 선택</span>
                        </button>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star"></span>설치 장소
                    </th>
                    <td>
                        <input type="text" id="astPlaceSn" style="width: 100%;">
                    </td>
                    <th scope="row" class="text-center th-color">
                        사용자
                    </th>
                    <td>
                        <input type="text" id="empName" style="width: 100%;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">용도</th>
                    <td colspan="3">
                        <textarea type="text" id="purpose" style="width: 100%;"></textarea>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">비고</th>
                    <td colspan="3">
                        <textarea type="text" id="remark" style="width: 100%;"></textarea>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">관련 파일</th>
                    <td colspan="3" style="padding:5px;">
                        <label for="relatedFile" class="k-button k-button-solid-base">파일첨부</label>
                        <input type="file" id="relatedFile" name="relatedFile" onchange="addAssetPop.fileChange(this)" style="display: none">
                        <span id="relatedFileName"></span>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">자산 사진</th>
                    <td colspan="3" style="padding:5px;">
                        <label for="astFile" class="k-button k-button-solid-base">파일첨부</label>
                        <input type="file" id="astFile" name="astFile" onchange="addAssetPop.fileChange(this)" style="display: none">
                        <span id="astFileName"></span>
                    </td>
                </tr>
                </thead>
            </table>
        </div>
    </div>
</div>
<script>
    addAssetPop.fn_defaultScript();
</script>
</body>