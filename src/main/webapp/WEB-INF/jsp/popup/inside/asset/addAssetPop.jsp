<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<script type="text/javascript" src="/js/intra/inside/asset/addAssetPop.js?v=${today}"/></script>
<style>
    tj {background-color: #8fa1c04a}
    td {background-color: white}
</style>
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
            <input type="hidden" id="regEmpSeq" name="regEmpSeq" value="${loginVO.uniqId}">
            <input type="hidden" id="regEmpName" name="regEmpName" value="${loginVO.name}">
            <input type="hidden" id="astInfoSn" name="astInfoSn" value="${params.astInfoSn}">
            <input type="hidden" id="mod" name="mod" value="${params.modify}">
            <input type="hidden" id="itemSn" value="${params.itemSn}"/>
            <input type="hidden" id="purcSn" value=""/>
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
                    <th scope="row" class="text-center th-color"><span class="red-star">*</span>자산 구분</th>
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
                    <th scope="row" class="text-center th-color"><span class="red-star">*</span>구입 일자</th>
                    <td>
                        <input type="text" id="purcDate" style="width: 100%;">
                    </td>
                    <th scope="row" class="text-center th-color">구입 금액</th>
                    <td>
                        <input id="purcPrice" oninput="onlyNumber(this)" onkeyup="fn_inputNumberFormat(this)" style="width: 90%; text-align: right;">원
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color"><span class="red-star">*</span>규격</th>
                    <td><input type="text" id="modelSize" style="width: 100%;">
                    <th scope="row" class="text-center th-color"><span class="red-star">*</span>모델명</th>
                    <td><input type="text" id="modelName" style="width: 100%;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color"><span class="red-star">*</span>구입 업체</th>
                    <td>
                        <input type="hidden" id="purcCompanyId" style="width: 70%;" value="">
                        <input type="text" id="purcCompanyName" style="width: 70%;" readonly>
                        <button type="button" id="search" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="fn_popCamCrmList('asset')">
                            <span class="k-button-text">검색</span>
                        </button>
                    </td>
                    <th scope="row" class="text-center th-color"><span class="red-star">*</span>제조사</th>
                    <td>
                        <input type="text" id="mfCompany" style="width: 100%;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>자산 상태
                    </th>
                    <td><input type="text" id="astStsCode" style="width: 100%;">
                    <th scope="row" class="text-center th-color"><span class="red-star">*</span>생산 국가</th>
                    <td><input type="text" id="orgCountry" style="width: 100%;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color"><span class="red-star">*</span>구입 수량 / 단위</th>
                    <td>
                        <input type="text" id="qty" style="width: 55px;" maxlength="5"> /
                        <input type="text" id="unit" style="width: 75px;">
                        <input type="text" id="unitText" style="width: 75px;" class="k-input k-textbox k-input-solid k-input-md k-rounded-md" disabled>
                        <input type="text" id="regType" style="width: 95px;">
                    </td>
                    <%--<th scope="row" class="text-center th-color">바코드 타입</th>
                    <td>
                        <input type="text" id="barcodeType" style="width: 100%;">
                    </td>--%>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>자금출처 및 지출계좌
                    </th>
                    <td colspan="3">
                        <span id="fundingSource" style="gap: 0px;"></span>
                        <input type="hidden" id="expAccount" style="display: none;" readonly>
                        <input type="text" id="pjtNm" value="${pjtData.PJT_NM}" style="width: 50%;" readonly >
                        <button type="button" id="bizSearchBtn" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" style="display: none;" onclick="addAssetPop.rdTaskPopup();">
                            <span class="k-button-text">사업 선택</span>
                        </button>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>설치 장소
                    </th>
                    <td>
                        <input type="text" id="astPlaceSn" style="width: 100%;">
                    </td>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>사용자
                    </th>
                    <td>
                        <input type="hidden" id="empSeq" name="popEmpSeq">
                        <input type="hidden" id="deptSeq" name="popDeptSeq">
                        <input type="text" id="empName" name="empName" class="k-input k-textbox k-input-solid k-input-md k-rounded-md" style="width: 73%;" onclick="userSearch()" readonly>
                        <button type="button" class="k-button k-button-solid-base" id="addMemberBtn" onclick="userSearch();">사용자 선택</button>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color"><span class="red-star">*</span>용도</th>
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
                    <th scope="row" class="text-center th-color">자산사진</th>
                    <td colspan="3">
                        <form style="padding: 0px 30px;">
                            <div class="card-header" style="padding: 5px;">
                                <h3 class="card-title">첨부파일</h3>
                                <div class="card-options">
                                    <div class="filebox">
                                        <button type="button" class="fileUpload k-grid-button k-button k-button-md k-button-solid k-button-solid-base" id="fileUpload" onclick="$('#fileList').click()">
                                            <span class="k-icon k-i-track-changes-enable k-button-icon"></span>
                                            <span class="k-button-text">파일첨부</span>
                                        </button>
                                        <input type="file" id="fileList" name="fileList" onchange="addAssetPop.addFileInfoTable();" multiple style="display: none"/>
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
        </div>
    </div>
</div>
<script>
    addAssetPop.fn_defaultScript();

    function userSearch() {
        window.open("/common/deptListPop.do","조직도","width=750,height=650");
    }

    function selectProject(sn, nm, cd, baseYear){
        $("#pjtSn").val(sn);
        $("#pjtNm").val(nm);
        $("#pjtCd").val(cd);
    }

    function fn_popCamCrmList(v){
        var url = "/crm/pop/popCrmList.do?status=" + v;
        var name = "_blank";
        var option = "width = 1300, height = 670, top = 200, left = 400, location = no"
        var popup = window.open(url, name, option);
    }
</script>
</body>