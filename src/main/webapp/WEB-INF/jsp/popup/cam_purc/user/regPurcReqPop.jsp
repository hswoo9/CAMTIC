<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>

<body class="font-opensans" style="background-color:#fff;">
<script type="text/javascript" src="/js/intra/cam_crm/regCrmPop.js?v=${today}"/></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.16.9/xlsx.full.min.js"></script>
<script type="text/javascript" src="<c:url value='/js/postcode.v2.js?autoload=false'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_purc/regPurcReqPop.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_purc/purchase.js?v=${today}'/>"></script>
<input type="hidden" id="stat" value="${params.stat}" />
<input type="hidden" id="busnClass" value="${pjtData.BUSN_CLASS}" />

<input type="hidden" id="auto" value="${params.auto}">
<input type="hidden" id="apprMngStat" value="${params.vType}">
<input type="hidden" id="reqEmpSeq" value="${loginVO.uniqId}">

<style>
    #excelUpload {
        overflow-x: hidden;
    }
</style>
<form id="purcDraftFrm" method="post">
    <input type="hidden" id="purcSn" name="purcSn" value="${params.purcSn}">
    <input type="hidden" id="menuCd" name="menuCd" value="purc">
    <input type="hidden" id="type" name="type" value="drafting">
    <input type="hidden" id="nowUrl" name="nowUrl" />
</form>

<input type="hidden" id="paramPjtSn" value="${pjtData.PJT_SN}">

<div style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">
                <span style="position: relative; top: 3px;">
                    구매요청서
                    <c:if test="${params.stat != 'v'}">
                        작성
                    </c:if>
                </span>
            </h3>
            <div class="btn-st popButton">
                <span id="purcApprBtnBox">

                </span>
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
                        <div id="docNo" style="margin-top:3px;"></div>
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
                        <input type="text" id="purcReqPurpose" value="[구매요청] ${pjtData.PJT_NM}" style="width: 90%;">
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">사업구분</th>
                    <td>
                        <span id="purcType"></span>
                    </td>
                    <th scope="row" class="text-center th-color">비용지급방식</th>
                    <td>
                        <span id="paymentMethod"></span>
                    </td>
                </tr>
                <tr id="purcLinkTr" style="display: none;">
                    <th scope="row" class="text-center th-color"><span class="red-star">*</span>구매 링크</th>
                    <td colspan="3">
                        <input id="purcLink" style="width: 90%;" />
                    </td>
                </tr>
                <tr id="project" style="display: none;">
                    <th scope="row" class="text-center th-color">프로젝트</th>
                    <td colspan="3">
                        <span>
                            <input type="text" id="pjtNm" value="${pjtData.PJT_NM}"  style="width: 40%;">
                            <input type="hidden" id="pjtSn" value="${pjtData.PJT_SN}" />
                            <input type="hidden" id="pjtCd" name="pjtCd">
                            <button type="button" class="k-button k-button-solid-base" id="pjtSelBtn" onclick="prp.fn_projectPop()">검색</button>
                        </span>
                    </td>
                </tr>
                <tr>
                    <th scope="row" class="text-center th-color">
                        <span class="red-star">*</span>
                        <span id="chgTxt">견적서 파일</span>
                        <br>(구매 참고파일)
                    </th>
                    <td colspan="3">
                        <form style="padding: 0px 30px;">
                            <div class="card-header" style="padding: 5px;">
                                <h3 id="chgTxtArea" class="card-title">첨부파일 (견적서 必 첨부, 인터넷 구매등은 해당 화면 캡쳐하여 업로드)</h3>
                                <div class="card-options">
                                    <div class="filebox">
                                        <button type="button" class="fileUpload k-grid-button k-button k-button-md k-button-solid k-button-solid-base" id="fileUpload" onclick="$('#fileList').click()">
                                            <span class="k-icon k-i-track-changes-enable k-button-icon"></span>
                                            <span class="k-button-text">파일첨부</span>
                                        </button>
                                        <input type="file" id="fileList" name="fileList" onchange="prp.addFileInfoTable();" multiple style="display: none"/>
                                        <button type="button" class="k-button k-button-solid-base" onclick="prp.fn_multiDownload();" style="margin-left: 5px;">일괄 다운로드</button>
                                    </div>
                                </div>
                            </div>
                            <div class="table-responsive">
                                <table class="popTable table table-bordered mb-0">
                                    <colgroup>
                                        <col width="50%">
                                        <col width="10%">
                                        <col width="20%">
                                        <col width="10%">
                                        <col width="10%">
                                    </colgroup>
                                    <thead>
                                    <tr class="text-center th-color">
                                        <th>파일명</th>
                                        <th>확장자</th>
                                        <th>용량</th>
                                        <th>기타</th>
                                        <th>뷰어</th>
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
                <tr>
                    <%--<th scope="row" class="text-center th-color">요청서 파일</th>
                    <td>
                        <input type="hidden" id="file2Sn" name="file1Sn">
                        <label for="file2" id="file2Label" class="k-button k-button-solid-base">파일첨부</label>
                        <input type="file" id="file2" name="file2" onchange="prp.fileChange(this)" style="display: none">
                        <span id="file2Name"></span>
                    </td>--%>
                    <th scope="row" class="text-center th-color"><span class="red-star">*</span>부가세</th>
                    <td colspan="3">
                        <span id="vat"></span>
                    </td>
                </tr>
                </thead>
            </table>

            <%--<table class="popTable table table-bordered mb-0">
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
            </table>--%>

            <c:if test="${params.stat == 'v'}">
                <span id="claimGroup" style="font-size:12px;">
                    <button type="button" style="top:15px;" class="k-button k-button-solid-info" onclick="prp.fn_reqClaiming()">청구서작성</button>
                    <button type="button" style="top:15px; display:none" class="k-button k-button-solid-base" onclick="prp.fn_printEst()">견적요청서 인쇄</button>
<%--                    <button type="button" style="top:15px;" class="k-button k-button-solid-base" onclick="prp.fn_popCamCrmList('crmSn0', 'crmNm0');">업체수정</button>--%>
                </span>
            </c:if>
            <div class="mt-20">
                <div class="text-right" style="display: flex; justify-content: space-between">
                    <div>
                        <button type="button" id="allModViewBtn" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="prp.allModViewBtn()" style="font-size: 12px">
                            <span class="k-button-text">일괄변경</span>
                        </button>
                        <input type="text" id="purcItemTypeAll" class="purcItemType allMod" style="width: 110px; display: none">
                        <input type="text" id="productAAll" class="productA allMod" style="width: 110px; display: none">
                        <input type="text" id="productBAll" class="productB allModItem" style="width: 110px; display: none">
                        <input type="text" id="productCAll" class="productC allModItem" style="width: 110px; display: none">
                        <input type="text" id="allCrmNm" disabled class="allCrmNm allMod" style="width: 110px; display: none">
                        <input type="hidden" id="allCrmSn" class="allCrmSn allMod" style="width: 110px; display: none">

                        <button type="button" id="allCrmSelBtn" style="font-size: 12px; display: none" class="allMod allCrmSelBtn k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="prp.fn_popCamCrmList();">업체선택</button>
                        <button type="button" id="allModBtn"  class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info allMod" onclick="prp.allModBtn()" style="font-size: 12px; display: none">
                            <span class="k-button-text">변경</span>
                        </button>
                        <button type="button" id="allCanBtn" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error allMod" onclick="" style="font-size: 12px; display: none">
                            <span class="k-button-text">취소</span>
                        </button>
                    </div>
                    <div>
                        <div style="float:left;width: 150px;margin-top: 4px; margin-right: 5px; text-align: left;font-weight: bold;" id="totalDiv">합계 : <span id="sum" style="float: right;"></span></div>
                        <div style="float:left;margin-top: 4px; margin-right: 5px; text-align: left;font-weight: bold;"><span id="totalPay" style="float: right; display: none; ">합계 : </span></div>
                        <button type="button" id="excelUploadBtn" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="fn_excelUploadModal()" style="font-size: 12px;">
                            <span class="k-button-text">엑셀업로드</span>
                        </button>
                        <button type="button" id="addBtn" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="prp.addRow()" style="font-size: 12px;">
                            <span class="k-button-text">추가</span>
                        </button>
                    </div>
                </div>

                <table class="popTable table table-bordered mb-0 mt-20">
                    <colgroup>
                        <col style="width: 2%;">
                        <col style="width: 480px;">
                        <col style="width: 8%;">
                        <col style="width: 5%;">
                        <col style="width: 8%;">
                        <col style="width: 5%;">
                        <col style="width: 4%;">
                        <col style="width: 7%;">
                        <col style="width: 7%;">
                        <col style="width: 7%;">
                        <c:if test="${params.stat == 'v'}">
                            <col style="width: 10%;">
                        </c:if>
                        <c:if test="${params.stat != 'v'}">
                            <col style="width: 10%;">
                        </c:if>
<%--                        <col style="width: 7%;">--%>
                        <col style="width: 5%;">
                        <c:if test="${params.stat == 'v'}">
                            <col style="width: 3%">
                        </c:if>
                        <c:if test="${params.stat != 'v'}">
                            <col style="width: 3%">
                        </c:if>
                    </colgroup>
                    <thead>
                    <tr>
                        <th>
                            <input type="checkbox" id="checkAll" class="k-checkbox" />
                        </th>
                        <th><span class="red-star">*</span>구분</th>
                        <th><span class="red-star">*</span>품명</th>
                        <th><span class="red-star">*</span>규격</th>
                        <th><span class="red-star">*</span>단가</th>
                        <th><span class="red-star">*</span>수량</th>
                        <th><span class="red-star">*</span>단위</th>
                        <th>공급가액</th>
                        <th>세액</th>
                        <th>금액</th>
                        <th><span class="red-star">*</span>업체명</th>
<%--                        <th><span class="red-star">*</span>할인금액</th>--%>
                        <th>비고</th>
                        <c:if test="${params.stat == 'v'}">
                            <th>상태</th>
                        </c:if>
                        <c:if test="${params.stat != 'v'}">
                            <th>삭제</th>
                        </c:if>
                    </tr>
                    </thead>
                    <tbody id="purcItemTb">
                    <tr class="purcItemInfo newArray" id="item0">
                        <td>
                            <input type="checkbox" id="check0" class="childCheck k-checkbox" style="margin-left: 4px;" value="0" />
                        </td>
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
                            <input type="text" id="purcItemUnitPrice0" style="text-align: right" class="purcItemUnitPrice" onkeyup="prp.fn_calcN(0, this)" oninput="this.value = this.value.replace(/[^-0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                        </td>
                        <td>
                            <input type="text" id="purcItemQty0" style="text-align: right" class="purcItemQty" onkeyup="prp.fn_calcN(0, this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                        </td>
                        <td>
                            <input type="text" id="purcItemUnit0" class="purcItemUnit">
                        </td>
                        <td>
                            <input type="text" id="purcSupAmt0" class="purcSupAmt" style="text-align: right" disabled onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                        </td>
                        <td>
                            <input type="text" id="purcVatAmt0" class="purcVatAmt" style="text-align: right" disabled onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                        </td>
                        <td>
                            <input type="text" id="purcItemAmt0" class="purcItemAmt" style="text-align: right" disabled onkeyup="inputNumberFormat(this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                        </td>
                        <td>
                            <input type="hidden" id="crmSn0" class="crmSn">
                            <input type="text" id="crmNm0" disabled class="crmNm" style="width: 60%">
                            <button type="button" id="crmSelBtn0" class="crmSelBtn k-grid-button k-button k-button-md k-button-solid k-button-solid-base" onclick="prp.fn_popCamCrmList('crmSn0', 'crmNm0');">검색</button>
                        </td>
<%--                        <td>--%>
<%--                            <input type="text" id="discountAmt0" style="text-align: right" class="discountAmt" onkeyup="prp.fn_calcN(0, this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" value="0">--%>
<%--                        </td>--%>
                        <td>
                            <input type="text" id="rmk0" class="rmk">
                        </td>
                        <c:if test="${params.stat == 'v'}">
                            <td id="itemStatus0">
                                <button type="button" id="retBtn0" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="prp.fn_retItem(0)">
                                    반려
                                </button>
                            </td>
                        </c:if>
                        <c:if test="${params.stat != 'v'}">
                            <td>
                                <button type="button" id="delRowBtn0" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="prp.delRow(0)">
                                    삭제
                                </button>
                            </td>
                        </c:if>
                    </tr>
                    </tbody>
<%--                    <tfoot>--%>
<%--                    <tr>--%>
<%--                        <th colspan="9" style="text-align: right; font-weight: bold">--%>
<%--                            가격조정--%>
<%--                        </th>--%>
<%--                        <td style="text-align: right; font-weight: bold">--%>
<%--                            <input type="text" id="discountAmt" style="text-align: right;" onkeyup="prp.fn_calcN(0, this)" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" value="0" />--%>
<%--                        </td>--%>
<%--                        <th colspan="2" style="text-align: right; font-weight: bold">--%>

<%--                        </th>--%>
<%--                    </tr>--%>
<%--                    </tfoot>--%>
                </table>

                <input type="hidden" id="crmSn" onchange="prp.crmInfoChange()">
                <input type="hidden" id="crmNm">
            </div>
        </div>
    </div>
</div>

<div id="excelUpload"></div>
<script type="text/javascript">
    prp.fn_defaultScript();

    if($("#stat").val() == "v"){
        $("input[type='text'], input[type='radio']").prop("disabled", true);

        $("#delRowBtn0, #addBtn, #pjtSelBtn, #file1Label, #file2Label, .crmSelBtn").css("display", "none");
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

    $("#excelUpload").kendoWindow({
        title : "엑셀업로드",
        width: "700px",
        visible: false,
        modal: true,
        position : {
            top : 200,
            left : 400
        },
        open : function (){
            var htmlStr =
                '<div class="mb-10" style="text-align: right;">' +
                '	<button type="button" id="download" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="fileDown2()">양식다운로드</button>' +
                '	<button type="button" id="upload" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-info" onclick="prp.fn_excelUpload()">업로드</button>' +
                '	<button type="button" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-error" onclick="$(\'#excelUpload \').data(\'kendoWindow\').close()">닫기</button>' +
                '</div>' +
                '<table class="table table-bordered mb-0" style="margin-top: 10px">' +
                '	<colgroup>' +
                '		<col width="20%">' +
                '		<col width="80%">' +
                '	</colgroup>' +
                '	<tbody>' +
                '		<tr>' +
                '			<th scope="row" class="text-center th-color"><span style="position:relative; top: 9px;">엑셀업로드</span></th>' +
                '			<td>' +
                '               <div>' +
                '	                <input type="file" id="excelUploadFile" onchange="fileSv(event)" /> ' +
                '               </div>' +
                '			</td>' +
                '		</tr>' +
                '	</tbody>' +
                '</table>';


            $("#excelUpload").html(htmlStr);

            // modalKendoSetCmCodeCM();
            $("#excelUploadFile").kendoTextBox();
        },
        close: function () {
            $("#excelUpload").empty();
        }
    });

    function userSearch() {
        window.open("/common/deptListPop.do", "조직도", "width=750, height=650");
    }

    function selectProject(sn, nm, cd, baseYear){
        $("#pjtSn").val(sn);
        $("#pjtNm").val(nm);
        $("#pjtCd").val(cd);
    }

    function fn_excelUploadModal(){
        $("#excelUpload").data("kendoWindow").open();
    }

    function fileSv(event){
        prp.global.event = event;
    }

    function fileDown2(filePath, fileName){
        filePath = "/upload/excelForm"
        fileName = "구매요청업로드양식.xlsx";
        kendo.saveAs({
            dataURI: "/common/fileDownload.do?filePath=" + filePath + "/purcReqExcelUpload.xlsx&fileName=" + encodeURIComponent(fileName),
        });
    }

</script>
</body>
</html>