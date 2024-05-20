<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<script type="text/javascript" src="/js/intra/inside/asset/viewAssetPop.js?v=${today}"/></script>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">
<style>
    table { background-color: #ffffff; }
    .table > tbody > tr > th, .table > tfoot > tr > th{ background-color: #8fa1c04a;}
</style>
<input type="hidden" id="regId" value="${loginVO.id}"/>
<body class="font-opensans" style="background-color:#fff;">
<div class="col-lg-12" style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">자산정보 조회</h3>
            <div class="btn-st popButton">
                <c:if test="${astInfo eq 'Y'}">
                    <button type="button" class="k-button k-button-solid-base" onclick="printAssetCard()">자산관리카드 인쇄</button>
                </c:if>
                <button type="button" class="k-button k-button-solid-base" onclick="viewAssetPop.setBarcodePrintA()">바코드 출력(대)</button>
                <button type="button" class="k-button k-button-solid-base" onclick="viewAssetPop.setBarcodePrintB()">바코드 출력(소)</button>
                <c:if test="${astPdaInfo eq 'Y'}">
                    <button type="button" class="k-button k-button-solid-info" onclick="setAssetInspection()">저장</button>
                </c:if>
                <c:if test="${astInfo eq 'Y'}">
                    <button type="button" class="k-button k-button-solid-info" onclick="assetModPop()">편집</button>
                </c:if>
                <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close();">닫기</button>
            </div>
        </div>
        <div style="padding: 20px 30px;">
            <input type="hidden" id="astInfo" name="astInfo" value="${astInfo}">
            <input type="hidden" id="astPdaInfo" name="astPdaInfo" value="${astPdaInfo}">
            <input type="hidden" id="astPdaInfoSn" name="astPdaInfoSn" value="${data.AST_PDA_INFO_SN}">
            <input type="hidden" id="astInfoSn" name="astInfoSn" value="${data.AST_INFO_SN}">
            <input type="hidden" id="empSeq" name="empSeq" value="${loginVO.uniqId}">
            <table class="table table-bordered mb-0" style="margin-top: 10px;">
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
                    <c:choose>
                        <c:when test="${astPdaInfo eq 'Y'}">
                            <th scope="row" class="text-center th-color">
                                자산 상태
                            </th>
                            <td>
                                    ${data.INSIDE_DT_CODE_NM}
                            </td>
                        </c:when>
                        <c:otherwise>
                            <th scope="row" class="text-center th-color">생산 국가</th>
                            <td>
                                    ${data.ORG_COUNTRY}
                            </td>
                        </c:otherwise>
                    </c:choose>
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
                <c:if test="${astInfo eq 'Y'}">
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
                </c:if>
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
                <c:if test="${astInfo eq 'Y'}">
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
                </c:if>
                <tr>
                    <th scope="row" class="text-center th-color">자산 사진</th>
                    <td colspan="3" style="padding:5px;" id="assetImg">
                    </td>
                </tr>
                <c:if test="${astInfo eq 'Y'}">
                    <tr>
                        <th scope="row" class="text-center th-color">관련 청구서</th>
                        <td colspan="3" style="padding:5px;" id="purcLink">

                        </td>
                    </tr>
                </c:if>
                <tr>
                    <th scope="row" class="text-center th-color">관련 소모품</th>
                    <td colspan="3" style="padding:5px;">

                    </td>
                </tr>
                </tbody>
            </table>
        </div>

        <c:if test="${astPdaInfo eq 'Y'}">
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
                            재물조사 자산정보
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th scope="row" class="text-center th-color">
                            변경위치
                        </th>
                        <td>
                            <input type="hidden" id="originAstPlaceSn" value="${data.ORIGIN_AST_PLACE_SN}">
                            <input type="text" id="newAssetPlaceSn" <c:if test="${data.NEW_AST_PLACE_SN ne null}"> value="${data.NEW_AST_PLACE_SN}"</c:if>>
                        </td>
                        <th scope="row" class="text-center th-color">
                            재물조사
                        </th>
                        <td>
                            <input type="text" id="inspectionType" style="width: 120px;" <c:if test="${data.NEW_AST_PLACE_SN ne null}"> value="${data.INSPECTION_TYPE}" </c:if>>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" class="text-center th-color">
                            자산상태
                        </th>
                        <td colspan="4">
                            <input type="hidden" id="originAstStsCode" value="${data.ORIGIN_AST_STS_CODE}">
                            <input type="text" id="newAstStsCode" style="width: 120px;"
                                <c:choose>
                                    <c:when test="${data.NEW_AST_STS_CODE ne null}">
                                        value="${data.NEW_AST_STS_CODE}"
                                    </c:when>
                                    <c:otherwise>
                                        value="${data.ORIGIN_AST_STS_CODE}"
                                    </c:otherwise>
                                </c:choose>
                            >
                            <input type="text" id="astStsModReason" style="width: 80%;" class="k-input k-textbox k-input-solid k-input-md k-rounded-md" value="${data.AST_STS_MOD_REASON}">
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </c:if>

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
                        정보갱신 이력(${fn:length(data.history)}건)
                    </th>
                </tr>
                </thead>
            </table>
            <div id="historyData">

            </div>

            <table class="table table-bordered mb-0 mt-20">
                <colgroup>
                    <col>
                    <col>
                    <col width="15%">
                    <col width="15%">
                </colgroup>
                <thead>
                <tr>
                    <th colspan="4" style="font-size: 14px; font-weight:600;background-color: #00397f96; color: #fff;">
                        유지보수 내역(${data.MCOUNT}건)
                        <button type="button" class="k-button k-button-solid-base" style="height: 23px;font-size: 11px;float: right;" onclick="fn_popAddHistory('M')">추가</button>
                    </th>
                </tr>
                <tr>
                    <th>유지보수내역</th>
                    <th>관련</th>
                    <th>금액</th>
                    <th>날짜</th>
                </tr>
                <c:forEach var="o" items="${data.otherHistory}" varStatus="status">
                    <c:if test="${o.TYPE eq 'M'}">
                        <tr>
                            <td class="text-center">${o.OTHER_TITLE}</td>
                            <td class="text-center">${o.ETC}</td>
                            <td style="text-align: right"><fmt:formatNumber value="${o.UNIT_PRICE}" pattern="#,###" /></td>
                            <td class="text-center">${o.EXE_DATE}</td>
                        </tr>
                    </c:if>
                </c:forEach>
                </thead>
            </table>

            <table class="table table-bordered mb-0 mt-20">
                <colgroup>
                    <col>
                    <col>
                    <col>
                    <col>
                    <col width="15%">
                </colgroup>
                <thead>
                <tr>
                    <th colspan="5" style="font-size: 14px; font-weight:600;background-color: #00397f96; color: #fff;">
                        기타 내역(${data.OCOUNT}건)
                        <button type="button" class="k-button k-button-solid-base" style="height: 23px;font-size: 11px;float: right;" onclick="fn_popAddHistory('O')">추가</button>
                    </th>
                </tr>
                <tr>
                    <th>품명</th>
                    <th>모델명</th>
                    <th>규격</th>
                    <th>단가</th>
                    <th>구입일</th>
                </tr>
                <c:forEach var="o" items="${data.otherHistory}" varStatus="status">
                    <c:if test="${o.TYPE eq 'O'}">
                        <tr>
                            <td class="text-center">${o.OTHER_TITLE}</td>
                            <td class="text-center">${o.ETC}</td>
                            <td class="text-center">${o.STANDARD}</td>
                            <td style="text-align: right"><fmt:formatNumber value="${o.UNIT_PRICE}" pattern="#,###" /></td>
                            <td class="text-center">${o.EXE_DATE}</td>
                        </tr>
                    </c:if>
                </c:forEach>
                </thead>
            </table>

        </div>
    </div>
</div>
</body>
<script>
    viewAssetPop.fnDefaultScript();

    function printAssetCard() {
        let astInfoSn = $("#astInfoSn").val();
        var url = "/inside/pop/assetPrintPop.do?astInfoSn="+astInfoSn;
        var name = "goodsPrintPop";
        var option = "width=965, height=900, scrollbars=no, top=100, left=200, resizable=no, toolbars=no, menubar=no";
        var popup = window.open(url, name, option);
    }

    function assetModPop(){
        self.location.href = "/inside/addAssetPop.do?astInfoSn=" + $("#astInfoSn").val() + "&modify=Y";
    }

    function fileDown(filePath, fileName){
        kendo.saveAs({
            dataURI: "/common/fileDownload.do?filePath=" + filePath + "&fileName=" + encodeURIComponent(fileName),
        });
    }

    if($("#astPdaInfo").val() == "Y"){
        var dropDownDataSource = customKendo.fn_customAjax("/inside/getInsideCodeList.do", {insideMdCode : "03"});
        customKendo.fn_dropDownList("newAstStsCode", dropDownDataSource.rs, "INSIDE_DT_CODE_NM","INSIDE_DT_CODE", 2);
        $("#newAstStsCode").data("kendoDropDownList").bind("change", function(e){if(this.value() != "01"){$("#astStsModReason").show()}else{$("#astStsModReason").hide()}});
        $("#newAstStsCode").data("kendoDropDownList").trigger("change");

        dropDownDataSource = customKendo.fn_customAjax("/asset/getAssetPlaceList", {});
        customKendo.fn_dropDownList("newAssetPlaceSn", dropDownDataSource.rs, "AST_PLACE_NAME","AST_PLACE_SN", 2);

        dropDownDataSource = [
            {text: "실시", value: "1"},
            {text: "미실시", value: "2"},
        ]
        customKendo.fn_dropDownList("inspectionType", dropDownDataSource, "text", "value", 2);

    }

    function setAssetInspection(){
        if($("#newAstStsCode").val() != "01"){
            if(!$("#astStsModReason").val()){
                alert("사유를 적어주세요.");
                $("#astStsModReason").focus();
                return;
            }
        }

        if(confirm("신규위치, 재물조사 유무, 자산상태를 저장하시겠습니까?")){
            var data = {
                astPdaInfoSn : $("#astPdaInfoSn").val(),
                newAstStsCode : $("#newAstStsCode").val(),
                astStsModReason : $("#astStsModReason").val(),
                newAssetPlaceSn : $("#newAssetPlaceSn").val(),
                inspectionType : $("#inspectionType").val(),
                empSeq : $("#empSeq").val()
            }

            if($("#inspectionType").val()){
                data.inspectionType = $("#inspectionType").val();
                data.workType = $("#inspectionType").val();
            }

            if($("#newAssetPlaceSn").val()){
                if($("#originAstPlaceSn").val() != $("#newAssetPlaceSn").val()){
                    /** 위치 변경 */
                    data.placeModType = '1'
                }else{
                    /** 위치 미변경 */
                    data.placeModType = '2'
                }
            }

            if($("#newAstStsCode").val()){
                if($("#originAstStsCode").val() != $("#newAstStsCode").val()){
                    /** 상태 변경 */
                    data.astStsCodeModType = '1'
                }else{
                    /** 상태 미변경 */
                    data.astStsCodeModType = '2'
                }
            }

            var result = customKendo.fn_customAjax("/asset/setAstPdaOptInspection.do", data);
            if(result.flag){
                alert("저장되었습니다.");
                opener.parent.astPdaInfoList.gridReload();
                window.close();
            }
        }
    }

    function fn_popAddHistory(e){
        var url = "/asset/pop/popAddHistory.do?type=" + e + "&astInfoSn=" + $("#astInfoSn").val();
        var name = "_blank";
        var option = "width = 786, height = 280, top = 100, left = 400, location = no"
        var popup = window.open(url, name, option);
    }
</script>