<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>

<script type="text/javascript" src="<c:url value='/js/intra/cam_project/commonProject.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_mng/paymentEtaxHistory.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/common/kendoSettings.js?v=${today}'/>"></script>
<script type="text/javascript" src="<c:url value='/js/intra/cam_mng/paymentDetView.js?v=${today}'/>"></script>

<link rel="stylesheet" type="text/css" href='/css/pop/contents.css'>
<link rel="stylesheet" type="text/css" href='/css/pop/common.css'>


<!-- 공통팝업 호출 -->

<script type="text/javascript" src ="<c:url value='/js/html2canvas.min.js' />"></script>
<script type="text/javascript" src ="<c:url value='/js/es6-promise.auto.js' />"></script>
<script type="text/javascript" src ="<c:url value='/js/jspdf.min.js' />"></script>

<style>
    .k-footer-template td:nth-child(4) {
        overflow: visible;
        white-space: nowrap;
        text-align: right;
    }

    .k-footer-template td:nth-child(1),
    .k-footer-template td:nth-child(2),
    .k-footer-template td:nth-child(3),
    .k-footer-template td:nth-child(4) {
        border-width: 0;
    }

    input[type="text"] {
        border : 0px !important;
    }
</style>

<input type="hidden" id="empSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="type" value="${params.type}" />
<input type="hidden" id="index" value="${params.index}" />
<input type="hidden" id="paySetting" value="${params.paySetting}" />

<div>
    <div class="card-header pop-header">
        <h3 class="card-title title_NM">
                <span style="position: relative; top: 3px;">
                    <c:if test="${params.type == '1'}">
                        전자세금계산서
                    </c:if>
                    <c:if test="${params.type == '2'}">
                        전자계산서
                    </c:if>
                </span>
        </h3>
        <div id="purcBtnDiv" class="btn-st popButton" style="font-size: 13px;">
<%--            <button type="button" class="k-button k-button-solid-info" onclick="payEtaxHist.fn_selectCard()">반영</button>--%>
            <button type="button" class="k-button k-button-solid-error" onclick="window.close()">닫기</button>
        </div>
    </div>

    <div class="" style="padding: 10px">
        <span style="margin-right: 10px">
            <b style="font-size: 12px">조회일시</b>
            <input id="startDt" style="width: 150px"> ~ <input id="endDt" style="width: 150px">
        </span>
        <span>
            <b style="font-size: 12px">거래처명</b>
            <input id="searchValue" style="width: 20%;">
<%--            <button type="button" style="font-size: 12px" class="k-button k-button-sm k-button-solid-base" id="cardSelBtn" onclick="payEtaxHist.gridReload()">선택</button>--%>
            <button type="button" style="font-size: 12px" class="k-button k-button-sm k-button-solid-base" id="bnkSelBtn" onclick="payEtaxHist.fn_search()" onkeypress="if(window.event.keyCode==13){payEtaxHist.fn_search()}">검색</button>
        </span>

        <div class="pop_wrap_dir" style="width:898px; display: none;" id="capture">
            <div class="pop_head">
                <h1 class="txtTaxTy">전자세금계산서</h1>
            </div>

            <div class="pop_con">
                <%--        <p class="mb10" id="txtAuthNum"><span class="fwb">승인번호 :</span>txtAuthNum</p>--%>
                <!-- 세금계산서 -->
                <div class="js_tax_grid">
                    <table id="gridVIewTax" width="100%" border="0" cellspacing="0" cellpadding="0" class="Taxtabel Taxtabel_layout red">
                        <colgroup>
                            <col width="50%" />
                            <col width="15%" />
                            <col width="20%" />
                            <col width="15%" />
                        </colgroup>

                        <!-- 책번호, 일련번호 -->
                        <tr height="50">
                            <td class="textC"><strong name="taxPageTitle" class="f19 txtTaxTy" id="">전자세금계산서</strong></td>
                            <td class="textC"><strong name="taxPageTitle" class="f19">승인번호</strong></td>
                            <td colspan="2" class="textC"><strong name="taxPageTitle" class="f19" id="txtAuthNum"></strong></td>
                        </tr>
                        <tr>
                            <td colspan="4" class="p0">
                                <!-- 공급자, 공급받는자 -->
                                <table width="100%" border="0" cellspacing="0" cellpadding="0" class="Taxtabel red">
                                    <colgroup>
                                        <col width="3%" />
                                        <col width="9%" />
                                        <col width="17%" />
                                        <col width="2%" />
                                        <col width="7%" />
                                        <col width="12%" />

                                        <col width="3%" />
                                        <col width="9%" />
                                        <col width="17%" />
                                        <col width="2%" />
                                        <col width="7%" />
                                        <col width="12%" />
                                    </colgroup>
                                    <tr>
                                        <td rowspan="8" class="textC lh23">공<br/>급<br/>자</td>
                                        <td class="textC">등록번호</td>
                                        <td colspan="4" id="txtLSaupNum">txtLSaupNum</td>
                                        <td rowspan="8" class="textC lh23">공<br/>급<br/>받<br/>는<br/>자</td>
                                        <td class="textC">등록번호</td>
                                        <td colspan="4" id="txtRSaupNum">txtRSaupNum</td>
                                    </tr>
                                    <tr>
                                        <td class="textC">상호</td>
                                        <td colspan="2" id="txtLTrName">txtLTrName</td>
                                        <td class="textC">성명</td>
                                        <td class="textC" id="txtLCeoName">txtLCeoName</td>
                                        <td class="textC">상호</td>
                                        <td colspan="2" id="txtRTrName">txtRTrName</td>
                                        <td class="textC">성명</td>
                                        <td class="textC" id="txtRCeoName">txtRCeoName</td>
                                    </tr>
                                    <tr>
                                        <td class="textC lh18">사업장<br/>주소</td>
                                        <td colspan="4" id="txtLAddr">txtLAddr</td>
                                        <td class="textC lh18">사업장<br/>주소</td>
                                        <td colspan="4" id="txtRAddr">txtRAddr</td>
                                    </tr>
                                    <%--                            <tr>--%>
                                    <%--                                <td class="textC" id="txtLJongmokNum">txtLJongmokNum</td>--%>
                                    <%--                                <td class="textC" id="txtRJongmokNum">txtRJongmokNum</td>--%>
                                    <%--                            </tr>--%>
                                    <tr>
                                        <td class="textC">업태</td>
                                        <td id="txtLBusinessType">txtLBusinessType</td>
                                        <td colspan="2" class="textC">종목</td>
                                        <td id="txtLJongmokName">txtLJongmokName</td>
                                        <td class="textC">업태</td>
                                        <td id="txtRBusinessType">txtRBusinessType</td>
                                        <td colspan="2" class="textC">종목</td>
                                        <td  id="txtRJongmokName">txtRJongmokName</td>
                                    </tr>
                                    <%--                            <tr>--%>
                                    <%--                                <td class="textC">부서명</td>--%>
                                    <%--                                <td id="txtLDeptName">txtLDeptName</td>--%>
                                    <%--                                <td colspan="2" class="textC">담당자</td>--%>
                                    <%--                                <td id="txtLEmpName">txtLEmpName</td>--%>
                                    <%--                                <td class="textC">부서명</td>--%>
                                    <%--                                <td id="txtRDeptName">txtLDeptName</td>--%>
                                    <%--                                <td colspan="2" class="textC">담당자</td>--%>
                                    <%--                                <td id="txtREmpName">txtLEmpName</td>--%>
                                    <%--                            </tr>--%>
                                    <%--                            <tr>--%>
                                    <%--                                <td class="textC">연락처</td>--%>
                                    <%--                                <td id="txtLTell">txtLTell</td>--%>
                                    <%--                                <td colspan="2" class="textC">휴대폰</td>--%>
                                    <%--                                <td id="txtLCellPhone">txtLCellPhone</td>--%>
                                    <%--                                <td class="textC">연락처</td>--%>
                                    <%--                                <td id="txtRTell">txtLTell</td>--%>
                                    <%--                                <td colspan="2" class="textC">휴대폰</td>--%>
                                    <%--                                <td id="txtRCellPhone">txtLCellPhone</td>--%>
                                    <%--                            </tr>--%>
                                    <tr>
                                        <td class="textC">E_Mail</td>
                                        <td colspan="4" id="txtLEmail">txtLEmail</td>
                                        <td class="textC">E_Mail</td>
                                        <td colspan="4" id="txtREmail">txtREmail</td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="4" class="p0">
                                <!-- 작성일자 -->
                                <table width="100%" border="0" cellspacing="0" cellpadding="0" class="Taxtabel red">
                                    <colgroup>
                                        <col width="6%" />
                                        <col width="6%" />
                                        <col width="6%" />
                                        <col width="23%" />
                                        <col width="22%" id="txtVatCol" />
                                        <col width="" />
                                    </colgroup>
                                    <tr>
                                        <td colspan="3" class="textC">작성일자</td>
                                        <td class="textC">공급가액</td>
                                        <td class="textC" id="txtVatTitle">세액</td>
                                        <td class="textC">비고</td>
                                    </tr>
                                    <tr>
                                        <td class="textC" id="txtIssDateYear">txtIssDateYear</td>
                                        <td class="textC" id="txtIssDateMonth">txtIssDateMonth</td>
                                        <td class="textC" id="txtIssDateDate">txtIssDateDate</td>
                                        <td class="textR" id="txtStdAmt">txtStdAmt</td>
                                        <td class="textR" id="txtVatAmt">txtVatAmt</td>
                                        <td id="txtDummy1">txtDummy1</td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="4" class="p0">
                                <!-- 품목명 리스트 -->
                                <table width="100%" id="gridPrevGoods" border="0" cellspacing="0" cellpadding="0" class="Taxtabel red">
                                    <colgroup>
                                        <col width="4%"/>
                                        <col width="4%"/>
                                        <col width="33%" />
                                        <col width="6%"/>
                                        <col width="6%"/>
                                        <col width="10%"/>
                                        <col width="10%"/>
                                        <col id="txtItemVatAmtCol" width="10%"/>
                                        <col width=""/>
                                    </colgroup>
                                    <thead>
                                    <tr>
                                        <td class="textC">월</td>
                                        <td class="textC">일</td>
                                        <td class="textC">품목</td>
                                        <td class="textC">규격</td>
                                        <td class="textC">수량</td>
                                        <td class="textC">단가</td>
                                        <td class="textC">공급가액</td>
                                        <td class="textC" id="txtItemVatAmtTitle">세액</td>
                                        <td class="textC">비고</td>
                                    </tr>
                                    </thead>
                                    <tbody id="tbl_itemList">
                                    <tr>
                                        <td class="textC" id="txtItemDateMonth">txtItemDateMonth</td>
                                        <td class="textC" id="txtItemDateDate">txtItemDateDate</td>
                                        <td id="txtItemName">txtItemName</td>
                                        <td class="textC" id="txtItemStendard">txtItemStendard</td>
                                        <td class="textC" id="txtItemCnt">txtItemCnt</td>
                                        <td class="textR" id="txtItemUnitAmt">txtItemUnitAmt</td>
                                        <td class="textR" id="txtItemStdAmt">txtItemStdAmt</td>
                                        <td class="textR" id="txtItemVatAmt">txtItemVatAmt</td>
                                        <td id="txtItemNote">txtItemNote</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="4" class="p0">
                                <!-- 합계금액 -->
                                <table width="100%" border="0" cellspacing="0" cellpadding="0" class="Taxtabel red">
                                    <colgroup>
                                        <col width=""/>
                                        <col width="20%"/>
                                        <col width="10%"/>
                                        <col width="7%"/>
                                    </colgroup>
                                    <tr>
                                        <td class="textC">합계금액</td>
                                        <td rowspan="2" class="textC brrn fwb">이금액을</td>
                                        <td rowspan="2" class="brrn lh18" id="txtDummy2">txtDummy2</td>
                                        <td rowspan="2" class="fwb">함</td>
                                    </tr>
                                    <tr>
                                        <td class="textR" id="txtAmt">txtAmt</td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div><!-- //pop_wrap -->

        <div id="etaxMainGrid" style="margin-top:12px"></div>

    </div>
</div>


<script>
    payEtaxHist.fn_defaultScript();

    $(document).ready(function(){


    });

    function fnGetAuthDate(date, time){
        var authDate = date.replace(/[^0-9]/g,'');
        var authTime = date.replace(/[^0-9]/g,'');

        return authDate.substring(0, 4) + '-'+ authDate.substring(4, 6) + '-'+ authDate.substring(6, 8)
            + ' ' +authTime.substring(0, 2) + ':'+ authTime.substring(2, 4) + ':'+ authTime.substring(4, 6);
    }
    function fnGetCardCode(val){
        var cardNum = val.replace(/[^0-9]/g,'');
        return cardNum.substring(0, 4) + '-'+ cardNum.substring(4, 8) + '-'+ cardNum.substring(8, 12) + '-'+ cardNum.substring(11, 15);
    }

    /*  [공통함수] 통화 코드 적용
    일천 단위에 통화코드 ','적용.
    Params /
    valeu      : 통화 코드 적용 밸류
    -----------------------------------------------------*/
    function fnGetCurrencyCode(value, defaultVal) {
        value = '' + value || '';
        value = '' + value.split('.')[0];
        value = value.replace(/[^0-9\-]/g, '') || (defaultVal != undefined ? defaultVal : '0');
        var returnVal = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return returnVal;
    }
</script>