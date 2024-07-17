<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>

<body class="font-opensans" style="background-color:#fff;">
<script type="text/javascript" src="/js/intra/cam_crm/regCrmPop.js?v=${today}"/></script>
<script type="text/javascript" src="<c:url value='/js/postcode.v2.js?autoload=false'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_purc/purcInspectionPop.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_purc/purchase.js?v=${today}'/>"></script>
<input type="hidden" id="stat" value="v" />
<input type="hidden" id="purcSn" value="${params.purcSn}" />
<input type="hidden" id="mode" value="${params.mode}" />
<input type="hidden" id="busnClass" value="${pjtData.BUSN_CLASS}" />
<input type="hidden" id="claimSn" value="${params.claimSn}" />
<input type="hidden" id="inspectCk" value="N" />

<div style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">
                <span style="position: relative; top: 3px;">
                    검수처리
                </span>
            </h3>
            <div id="purcBtnDiv" class="btn-st popButton">
                <button type="button" class="k-button k-button-solid-info" id="saveBtn" onclick="pri.setPurcReq('W');">저장</button>
                <button type="button" class="k-button k-button-solid-info" id="inspectBtn" onclick="pri.setInspectApp('100');">검수</button>
                <button type="button" class="k-button k-button-solid-error" onclick="window.close()">닫기</button>
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
                        <div id="purcReqDate"></div>
                    </td>
                    <th scope="row" class="text-center th-color">문서번호</th>
                    <td>
                        <div id="docNo"></div>
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
                        <div id="purcReqPurpose">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">사업구분</th>
                    <td colspan="3">
                        <span id="purcType"></span>
                    </td>
                </tr>
                <tr id="project" style="display: none;">
                    <th scope="row" class="text-center th-color">프로젝트</th>
                    <td colspan="3">
                        <span>
                            <input type="text" id="pjtNm" value="${pjtData.PJT_NM}"  style="width: 40%;">
                            <input type="hidden" id="pjtSn" value="${pjtData.PJT_SN}" />
                            <input type="hidden" id="pjtCd" name="pjtCd">
                            <button type="button" class="k-button k-button-solid-base" id="pjtSelBtn" onclick="pri.fn_projectPop()">검색</button>
                        </span>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">검수자</th>
                    <td>
                        <div id="inspectEmpName" style="height: 27px; display: flex; align-items: center">${loginVO.name}</div>
                    </td>
                    <th scope="row" class="text-center th-color"><span class="red-star">*</span>검수날짜</th>
                    <td id="inspectDtTd">
                        <input id="inspectDt" style="width: 180px">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">검수사진</th>
                    <td colspan="3">
                        <form style="padding: 0px 30px;">
                            <div class="card-header" style="padding: 5px;">
                                <h3 class="card-title">첨부파일</h3>
                                <div class="card-options">
                                    <div class="filebox">
<%--                                        <button type="button" class="fileUpload k-grid-button k-button k-button-md k-button-solid k-button-solid-info" id="fileDownload" onclick="docDown();">--%>
<%--                                            <span class="k-icon k-i-track-changes-accept k-button-icon"></span>--%>
<%--                                            <span class="k-button-text">양식다운로드</span>--%>
<%--                                        </button>--%>
                                        <button type="button" class="fileUpload k-grid-button k-button k-button-md k-button-solid k-button-solid-base" id="fileUpload" onclick="$('#fileList').click()">
                                            <span class="k-icon k-i-track-changes-enable k-button-icon"></span>
                                            <span class="k-button-text">파일첨부</span>
                                        </button>
                                        <input type="file" id="fileList" name="fileList" onchange="pri.addFileInfoTable();" multiple style="display: none"/>
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
                                        <th>보기</th>
                                        <th>기타</th>
                                    </tr>
                                    </thead>
                                    <tbody id="fileGrid">
                                    <tr class="defultTr">
                                        <td colspan="5" style="text-align: center">선택된 파일이 없습니다.</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </form>
                    </td>
                </tr>
                </thead>
            </table>


            <span id="totalPay" style="float: right; font-size: 16px; font-weight: bold; display: none; height: 35px;margin-top: 10px;">총 금액 : </span>
            <div class="mt-20">
                <div class="text-right">
                    <button type="button" id="addBtn" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="pri.addRow()">
                        <span class="k-button-text">추가</span>
                    </button>
                </div>

                <table class="popTable table table-bordered mb-0 mt-20">
                    <thead>
                    <tr>
                        <th style="width:  480px">구분</th>
                        <th>품명</th>
                        <th>규격</th>
                        <th>단가</th>
                        <th>수량</th>
                        <th>단위</th>
                        <th>금액</th>
                        <th>업체명</th>
                        <th>비고</th>
                    </tr>
                    </thead>
                    <tbody id="purcItemTb">
                    <tr class="purcItemInfo newArray" id="item0">
                        <td>
                            <input type="hidden" id="purcItemSn0" name="purcItemSn0" class="purcItemSn">
                            <input type="text" id="purcItemType0" class="purcItemType" style="width: 110px">
                            <input type="text" id="productA0" class="productA" style="width: 110px">
                            <input type="text" id="productB0" class="productB" style="width: 110px; display: none">
                            <input type="text" id="productC0" class="productC" style="width: 110px; display: none">
                        </td>
                        <td>
                            <input type="text" id="purcItemName0" class="purcItemName">
                        </td>
                        <td>
                            <input type="text" id="purcItemStd0" class="purcItemStd">
                        </td>
                        <td>
                            <input type="text" id="purcItemUnitPrice0" style="text-align: right" class="purcItemUnitPrice" onkeyup="pri.fn_calc(0, this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                        </td>
                        <td>
                            <input type="text" id="purcItemQty0" style="text-align: right" class="purcItemQty" onkeyup="pri.fn_calc(0, this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                        </td>
                        <td>
                            <input type="text" id="purcItemUnit0" class="purcItemUnit">
                        </td>
                        <td>
                            <input type="text" id="purcItemAmt0" class="purcItemAmt" style="text-align: right" disabled onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                        </td>
                        <td>
                            <input type="hidden" id="crmSn0" class="crmSn">
                            <input type="text" id="crmNm0" disabled class="crmNm" style="width: 60%">
                            <button type="button" id="crmSelBtn0" class="crmSelBtn k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="pri.fn_popCamCrmList('crmSn0', 'crmNm0');">업체선택</button>
                        </td>
                        <td>
                            <input type="text" id="rmk0" class="rmk">
                        </td>
                    </tr>
                    </tbody>
                </table>

                <input type="hidden" id="crmSn" onchange="pri.crmInfoChange()">
                <input type="hidden" id="crmNm">
            </div>
        </div>
    </div>
</div>
<script type="text/javascript">
    pri.fn_defaultScript();

    if($("#stat").val() == "v"){
        $("input[type='text'], input[type='radio']").prop("disabled", true);

        $("#delRowBtn0, #addBtn, #pjtSelBtn, #file2Label, .crmSelBtn").css("display", "none");
        $(".crmNm").css("width", "100%");
        var len = $("#purcItemTb > tr").length;

        for(var i = 0 ; i < len ; i++){
            $("#purcItemType" + i).data("kendoDropDownList").enable(false);
            $("#productA" + i).data("kendoDropDownList").enable(false);
            if($("#productA" + i).data("kendoDropDownList").value == "3"){
                $("#productB" + i).data("kendoDropDownList").enable(false);
                $("#productC" + i).data("kendoDropDownList").enable(false);
            }
        }
    }

    function docDown(filePath, fileName){
        filePath = "/upload/docForm"
        fileName = "검사검수조서.hwp";
        kendo.saveAs({
            dataURI: "/common/fileDownload.do?filePath=" + filePath + "/formA.hwp&fileName=" + encodeURIComponent(fileName),
        });
    }


</script>
</body>
</html>