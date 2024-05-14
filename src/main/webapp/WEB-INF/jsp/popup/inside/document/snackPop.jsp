<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<jsp:useBean id="today" class="java.util.Date" />
<jsp:include page="/WEB-INF/jsp/template/common2.jsp" flush="true"></jsp:include>
<link rel="stylesheet" href="/css/quirk.css">
<link rel="stylesheet" href="/css/style.css">


<style>
    #loadingDiv{
        position: fixed;
        top: 0; left: 0;
        width: 100%;
        height: 100%;
        background-color: white;
        z-index: 9999;
        opacity: 1;
        transition: 0.5s ease;
    }
    #loadingDiv #loadingSpinner{
        position: absolute;
        top: 50%;
        left: 42%;
        margin: -40px 0 0 -40px;
    }
    .d-flex{
        flex-direction: column;
        align-items: center;
    }

    .creditSlip{width:430px; background:url('../../images/bg/bg_creditSlip.png') repeat 0 0; background-position:0 16px;}

    .fwb {font-weight:bold !important;}
    .lh18{line-height:18px !important;}

    .com_ta4 table{width:100%; text-align:center;box-sizing:border-box;} /* 디자인참고 : 수정설정 팝업 */
    .com_ta4 table th, .com_ta4 table td {height:26px;color:#4a4a4a;border:1px solid #eaeaea; padding:5px 0;}
    .com_ta4.rowHeight table th, .com_ta4.rowHeight table td {height:18px;word-break: break-all}
    .com_ta4 table th {background:#f9f9f9;/*background:#f9fafc;*/font-weight:normal;}
    .com_ta4 table .cen {text-align:center !important;padding:0px !important;}
    .com_ta4 table .ri {text-align:right !important;padding-right:10px;}
    .com_ta4 table .le {text-align:left !important;padding-left:10px;}
    .com_ta4 table td.td_cen {text-align:center !important;padding:0px !important;}
    .com_ta4 table td.td_ri {text-align:right !important;padding-right:10px;}
    .com_ta4 table td.td_le {text-align:left !important;padding-left:10px;}
    .com_ta4 table tr:hover td, .com_ta4 table tr.on td {background:#e6f4ff;}
    .com_ta4 table tr.total td{background:#f9f9f9;}
    .com_ta4 table tr.summary td{background:#fff1f1;}
    .com_ta4 table tr.even{background-color:#f9f9f9;}
    .com_ta4.hover_no table tr:hover td {background:none;}
    .com_ta4.hover_no table tr:hover td.bg_blue { background: #f0f6fd;}
    .com_ta4.hover_no table tr.on:hover td {background:#e6f4ff;}
    .com_ta4.hover_no table tr.on:hover td.bg_blue {background: #e6f4ff;}
    .com_ta4.hover_no table tr.total:hover  td{background:#f9f9f9;}
    .com_ta4.ova_sc {overflow:auto;border-bottom:1px solid #eaeaea;}
    .com_ta4.ova_sc table {border-top:none;}
    .com_ta4.ova_sc table tr:first-child td {border-top:none;}
    .com_ta4.ova_sc_all {overflow:auto;}
    .com_ta4.ova_sc td {position:relative;}
    .com_ta4.ova_sc2 {overflow-x:hidden; overflow-y:scroll;}
    .com_ta4.ova_sc2 table td {border-top:none;}
    .com_ta4.ova_line {overflow:auto;}
    .com_ta4.ova_line table tr:first-child td {border-top:none;}
    .com_ta4.bgtable {border-width:0 1px 1px 1px; border-style:solid; border-color:#eaeaea; overflow:auto;background-color:#fcfcfc;} /*팝업-근태관리단위설정-근무조수정 참고*/
    .com_ta4.bgtable table td {border-width:0 0px 1px 0px; border-style:solid; border-color:#eaeaea; background-color:#fff !important;}
    .com_ta4.bgtable.non_head {border-width:1px;}
    .com_ta4.bgnth tr:nth-child(odd) td{background:#f4f4f4;}
    .com_ta4.bgnth tr:nth-child(odd):hover td {background:#f4f4f4;}
    .com_ta4.tdH20 table th, .com_ta4.tdH20 table td {height:20px !important;}

    .com_ta4.bgtable2 {border-width:0 1px 1px 1px; border-style:solid; border-color:#eaeaea; overflow:auto;background-color:#fcfcfc;} /*팝업-게시판분류등록*/
    .com_ta4.bgtable2 table {background:#fff;}
    .com_ta4.bgtable2 table td {border-width:0 0px 1px 1px; border-style:solid; border-color:#eaeaea;}
    .com_ta4.bgtable2 table td:first-child {border-left:none;}
    .com_ta4.bgtable2 table th {border-width:1px 0px 0px 1px; border-style:solid; border-color:#eaeaea;}
    .com_ta4.bgtable2 table th:first-child {border-left:none;}
    .com_ta4.bgtable2 table th:last-child {border-right:none;}
    .com_ta4.bgtable2.non_head {border-width:1px;}

    .com_ta4.bgtable3 {border-width:0 1px 1px 1px; border-style:solid; border-color:#eaeaea; overflow:auto;background-color:#fcfcfc;} /*팝업-게시판분류등록*/
    .com_ta4.bgtable3 table {background:#fff;}
    .com_ta4.bgtable3 table td {border-width:0 0px 1px 1px; border-style:solid; border-color:#eaeaea; }
    .com_ta4.bgtable3 table td:first-child {border-left:none;}
    .com_ta4.bgtable3 table th:first-child {border-left:none;}
    .com_ta4.bgtable3 table th:last-child {border-right:none;}

    .com_ta4 .list_div {height:24px;line-height:24px; width:90%; border:1px solid #e1e1e1;position:relative;margin-left:10px;text-align:left;padding-left:10px;}
    .com_ta4 .list_div .clo {position:absolute; right:10px; top:7px;}
    .com_ta4 .list_div:hover {background:#fcfcfc;}
    .com_ta4.cursor_p table tr:hover td {cursor:pointer;}
</style>

<script type="text/javascript" src ="<c:url value='/js/html2canvas.min.js' />"></script>
<script type="text/javascript" src ="<c:url value='/js/es6-promise.auto.js' />"></script>
<script type="text/javascript" src ="<c:url value='/js/jspdf.min.js' />"></script>
<script type="text/javascript" src="/js/intra/inside/document/snackPop.js?v=${today}"/></script>
<input type="hidden" id="regEmpSeq" value="${loginVO.uniqId}"/>
<input type="hidden" id="regEmpName" value="${loginVO.name}"/>
<input type="hidden" id="regDeptSeq" value="${loginVO.deptId}"/>
<input type="hidden" id="regDeptName" value="${loginVO.deptNm}"/>
<input type="hidden" id="regTeamSeq" value="${loginVO.teamId}"/>
<input type="hidden" id="regTeamName" value="${loginVO.teamNm}"/>
<input type="hidden" id="regPositionCode" value="${loginVO.positionCode}"/>
<input type="hidden" id="regPositionName" value="${loginVO.positionNm}"/>
<input type="hidden" id="regDutyCode" value="${loginVO.dutyCode}"/>
<input type="hidden" id="regDutyName" value="${loginVO.dutyNm}"/>
<input type="hidden" id="regGradeCode" value="${loginVO.gradeCode}"/>
<input type="hidden" id="regGradeName" value="${loginVO.gradeNm}"/>
<input type="hidden" id="snackInfoSn" value="${snackInfoSn}"/>
<input type="hidden" id="mode" value="${params.mode}"/>

<input type="hidden" id="cardToSn" value="${params.cardToSn}" />


<body class="font-opensans" style="background-color:#fff;">
<div class="col-lg-12" style="padding:0;">
    <div class="table-responsive">
        <div class="card-header pop-header">
            <h3 class="card-title title_NM">식대 사용 등록</h3>
            <div class="btn-st popButton">
                <c:choose>
                    <c:when test="${status == null || params.mode eq 'mod'}">
                        <button type="button" class="k-button k-button-solid-info" onclick="snackReq.saveBtn();">저장</button>
                        <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close();">취소</button>
                    </c:when>
                    <c:when test="${status == 0 && params.mode eq 'infoPop'}">
                        <button type="button" class="k-button k-button-solid-info" onclick="snackReq.saveBtn();">수정</button>
                        <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close();">취소</button>
                    </c:when>
                    <c:when test="${status == 10 && params.mode eq 'mng'}">
                        <button type="button" class="k-button k-button-md k-button-solid-info" onclick="snackReq.fn_snackCertReq(100)">승인</button>
                        <button type="button" class="k-button k-button-md k-button-solid-error" onclick="snackReq.fn_snackCertReq(30)">반려</button>
                    </c:when>
                    <c:when test="${status == 100}">
                        <c:if test="${data.PAY_APP_SN eq null}">
                            <button type="button" class="k-button k-button-solid-info" onclick="snackReq.fn_contentMod();">수정</button>
                        </c:if>
<%--                        <button type="button" class="k-button k-button-md k-button-solid k-button-solid-info" onclick="snackReq.snackPrintPop();">증빙양식 출력</button>--%>
                        <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close();">닫기</button>
                    </c:when>
                    <c:otherwise>
                        <button type="button" class="k-button k-button-solid-error" style="margin-right:5px;" onclick="window.close();">닫기</button>
                    </c:otherwise>
                </c:choose>
            </div>
        </div>
        <form id="table-responsive" style="padding: 20px 30px;">
        <table class="popTable table table-bordered mb-0">
            <colgroup>
                <col width="20%">
                <col width="30%">
                <col width="20%">
                <col width="30%">
            </colgroup>
            <thead>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>이용 일시
                </th>
                <td>
                    <input id="useDt" type="date" style="width: 65%;"> <%--<input id="useHour" type="text" style="width: 40px;" maxlength="2" oninput="onlyNumber(this);">시 <input id="useMin" type="text" style="width: 40px;" maxlength="2" oninput="onlyNumber(this);">분--%>
                </td>
                <th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>식대 구분
                </th>
                <td colspan>
                    <input type="text" id="snackType" style="width: 100%; margin-right:10px;">
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star"></span>이용자
                </th>
                <td>
                    <input type="text" id="userText" style="width: 65%;">
                    <input type="hidden" id="userSn" style="width: 65%;">
                    <button type="button" id="userMultiSelect" class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" style="width:30%; height:27px; line-height:0;" onclick="fn_userMultiSelectPop();">
                        직원선택
                    </button>
                </td>
                <th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>결제 구분
                </th>
                <td colspan>
                    <input type="text" id="payType" style="width: 100%; margin-right:10px;" onchange="snackReq.fn_changePayType(this.value)">
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>거래확인 서류 수령자
                </th>
                <td>
                    <input type="text" id="chargeUser" style="width: 100%;">
                </td>
                <th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>카드선택
                </th>
                <td>
                    <input type="text" id="corporCard" style="width: 75%;" /> <input type="hidden" id="cardBaNb" value="" />
                    <button type="button" id="cardSearch" disabled class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" style="width:20%; height:27px; line-height:0;" onclick="snackReq.fn_paymentCardHistory()">
                        검색
                    </button>
                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>주문처
                </th>
                <td colspan>
                    <input type="text" id="areaName" style="width: 100%;">
                    <%--<button type="button" id="restaurantSearch" disabled class="k-grid-button k-button k-button-md k-button-solid k-button-solid-base" style="width:30%; height:27px; line-height:0;" onclick="">
                        음식점 선택
                    </button>--%>
                </td>
                <th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>이용 금액
                </th>
                <td>
                    <input type="text" id="usAmount" style="width: 90%; text-align: right;" oninput="onlyNumber(this)"> 원
                </td>
            </tr>
            <tr style="display:none;" id="amtTr">
                <th><span class="red-star"></span>이용금액 상세</th>
                <td id="amtTd" colspan="3">

                </td>
            </tr>
            <tr>
                <th scope="row" class="text-center th-color">
                    <span class="red-star">*</span>이용 사유
                </th>
                <td colspan="3">
                    <textarea type="text" id="useReason" style="width: 100%;"></textarea>
                </td>
            </tr>
            </thead>
        </table>
        </form>
        <div>
            <form style="padding: 0px 30px;">
                <div class="card-header" style="padding: 5px;">
                    <h3 class="card-title"><span class="red-star">*</span>영수증</h3>
                    <div class="card-options">
                        <input type="button" class="k-button k-button-solid-info" style="margin-right: 5px" value="증빙양식 다운로드" onclick="snackReq.snackExnpFormDown()" />
                        <div class="filebox">
                            <button type="button" class="fileUpload k-grid-button k-button k-button-md k-button-solid k-button-solid-base" id="fileUpload" onclick="$('#fileList').click()">
                                <span class="k-icon k-i-track-changes-enable k-button-icon"></span>
                                <span class="k-button-text">파일첨부</span>
                            </button>
                            <input type="file" id="fileList" name="fileList" onchange="snackReq.addFileInfoTable();" multiple style="display: none"/>
                        </div>
                    </div>
                </div>
                <div class="table-responsive">
                    <table class="popTable table table-bordered mb-0">
                        <colgroup>
                            <col width="50%">
                        </colgroup>
                        <thead>
                        <tr class="text-center th-color">
                            <th>파일명</th>
                            <th>확장자</th>
                            <th>용량</th>
                            <th>뷰어</th>
                            <th class="resultTh">기타</th>
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
        </div>
    </div>

    <div id="cardHistoryDisplay" style="display: none;">
        <div class="card-header pop-header" style="margin-top: 15px">
            <h3 class="card-title title_NM">법인카드 사용내역</h3>
            <div class="btn-st popButton">
                <c:if test="${status == null || params.mode eq 'mod'}">
                    <input type="button" id="histAddBtn" class="k-button k-button-solid-info" value="추가" onclick="snackReq.fn_paymentCardHistory('3')" />
                    <input type="button" id="histDelBtn" class="k-button k-button-solid-error" style="margin-right: 5px" value="삭제" onclick="snackReq.fn_ardHistoryDel()" />
                </c:if>
            </div>
        </div>

        <form id="hist" style="padding: 20px 30px;">
            <div class="table-responsive detail">
                <table class="teamGrid popTable table table-bordered mb-0" style="margin-top: 0px">
                    <colgroup>
                        <col width="4%">
                        <col width="15%">
                        <col width="10%">
                        <col width="17%">
                        <col width="11%">
                        <col width="18%">
                        <col width="15%">
                        <col width="10%">
                    </colgroup>
                    <thead>
                    <tr>
                        <th><input type="checkbox" id="checkAll" name="checkAll" onclick="fn_checkAll('checkAll', 'card');"/></th>
                        <th>승인일자</th>
                        <th>승인번호</th>
                        <th>사용처</th>
                        <th>사업자번호</th>
                        <th>카드명</th>
                        <th>카드번호</th>
                        <th>금액</th>
                    </tr>
                    </thead>
                    <tbody id="detailRow">

                    </tbody>
                </table>
            </div>
        </form>
    </div>
</div>

<div class="pop_wrap creditSlip" id="capture" style="display: none; margin-top: 200px">
    <div class="card-header pop_head">
        <h3 class="card-title title_NM"><span style="color: black; margin-left: 11px;">카드승인전표</span>  <!--카드승인전표--></h3>
        <%--			<a href="#n" class="clo"><img src="../../../Images/btn/btn_pop_clo02.png" alt="" /></a>--%>
    </div>

    <div class="pop_con mr25 ml25" style="">
        <div class="com_ta4 bgnth hover_no">
            <table>
                <colgroup>
                    <col width="100"/>
                    <col />
                </colgroup>
                <tr>
                    <td class="ri">카드번호  <!--카드번호--></td>
                    <td class="fwb le" id="cardNum">  </td>
                </tr>
                <tr>
                    <td class="ri">승인일시 <!--승인일시--></td>
                    <td class="fwb le" id="authDate"> </td>
                </tr>
                <tr>
                    <td class="ri">승인번호  <!--승인번호--></td>
                    <td class="fwb le" id="authNum">  </td>
                </tr>
                <tr>
                    <td class="ri">가맹점명  <!--가맹점명--></td>
                    <td class="fwb le" id="tradeName">  </td>
                </tr>
                <tr>
                    <td class="ri">대표자명  <!--대표자명--></td>
                    <td class="fwb le" id="ceoNm">  </td>
                </tr>
                <tr>
                    <td class="ri">사업자번호  <!--사업자번호--></td>
                    <td class="fwb le" id="tradeSeq">  </td>
                </tr>
                <tr id="tr_mccName">
                    <td class="ri">업종  <!--업종--></td>
                    <td class="fwb le" id="mccName">  </td>
                </tr>
                <tr>
                    <td class="ri">주소  <!--주소--></td>
                    <td class="fwb le lh18 vt" style="height:35px;" id="addr">  </td>
                </tr>
                <tr>
                    <td class="ri">전화번호  <!--전화번호--></td>
                    <td class="fwb le" id="tel">  </td>
                </tr>
                <tr>
                    <td class="ri">공급가액  <!--공급가액--></td>
                    <td class="fwb le" id="stdAmt">  </td>
                </tr>
                <tr>
                    <td class="ri">부가세  <!--부가세--></td>
                    <td class="fwb le" id="vatAmt">  </td>
                </tr>
                <tr>
                    <td class="ri">서비스금액  <!--서비스금액--></td>
                    <td class="fwb le" id="serAmt">  </td>
                </tr>
                <tr>
                    <td class="ri">금액  <!--금액--></td>
                    <td class="fwb le" id="amt">  </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div><!--// pop_con -->
</div><!--// pop_wrap -->

<div id="loadingDiv">
    <div id="loadingSpinner" class="d-flex justify-content-center">
        <div class="spinner-border" role="status" style="color: #007bff!important">

        </div>
        <span id="loadingText">

            </span>
    </div>
</div>

<script>
    let snackData = {};
    // var fileNoArr = [];
    // let cardList = [];

    <c:if test="${flag eq 'true'}">
        snackData = JSON.parse('${data}');
    </c:if>
    $("#loadingDiv").hide();
    snackReq.init(snackData);

    //카드 선택
    function fn_selCardInfo(trCd, trNm, cardBaNb, jiro, clttrCd, baNb, depositor, idx){
        $("#cardBaNb").val(cardBaNb);
        if(trNm != "" && trNm != null && trNm != undefined){
            $("#corporCard").val(trNm);
        }else{
            alert("선택한 카드의 카드명이 존재하지 않습니다.");
        }
    }

    function fn_setCardInfo(list){
        // var fileNoArr = [];

        for(var i=0; i<list.length; i++) {
            snackReq.global.cardList.push(list[i]);
            const e = list[i];

            let  data = {
                cardNo: e.CARD_NO,
                authDate: e.AUTH_DD,
                authTime: e.AUTH_HH,
                authNo: e.AUTH_NO,
                buySts: e.BUY_STS
            };

            $.ajax({
                url: "/cam_mng/companyCard/useCardDetail",
                data: data,
                type: "post",
                dataType: "json",
                async: false,
                success: function (rs) {
                    var cardInfo = rs.cardInfo;
                    var cardNum = cardInfo.CARD_NO;
                    var authDate = cardInfo.AUTH_DD;
                    var authTime = cardInfo.AUTH_HH;
                    var authNum = cardInfo.AUTH_NO;
                    <%--                <c:set var="search" value="'" />--%>
                    <%--                <c:set var="replace" value="`" />--%>
                    <%--                <c:set var="cardTradeName" value="${fn:replace(cardInfo.mercName, search, replace)}"/>--%>
                    var ceoNm = cardInfo.MER_CEONM;
                    var tradeName = cardInfo.MER_NM;
                    var tradeSeq = cardInfo.MER_BIZNO;
                    var addr = cardInfo.MER_ADR1;
                    var tel = cardInfo.MER_TELNO;
                    var georaeStat = cardInfo.georaeStat;
                    var stdAmt = cardInfo.SUPP_PRICE;
                    var vatAmt = cardInfo.SURTAX;
                    var serAmt = cardInfo.SVC_AMT;
                    var amt = cardInfo.AUTH_AMT;

                    var mccName = cardInfo.BIZTYPE_NM;
                    if (!mccName) {
                        $('#tr_mccName').remove();
                    } else if (mccName) {
                        // window.resizeTo(445, 600);
                    }

                    $("#useDt").val(authDate.toString().substring(0, 4) + "-" + authDate.toString().substring(4, 6) + "-" + authDate.toString().substring(6, 8));


                    $('#cardNum').html('');
                    $('#authDate').html('');
                    $('#mccName').html('');
                    $('#authNum').html('');
                    $('#tradeName').html('');
                    $('#tradeSeq').html('');
                    $('#addr').html('');
                    $('#tel').html('');

                    $('#stdAmt').html('');
                    $('#vatAmt').html('');
                    $('#serAmt').html('');
                    $('#amt').html('');


                    $('#cardNum').html(fnGetCardCode(cardNum));
                    $('#authDate').html(fnGetAuthDate(authDate, authTime));
                    $('#mccName').html(mccName);
                    $('#authNum').html(authNum);
                    $('#ceoNm').html(ceoNm);
                    $('#tradeName').html(tradeName);
                    $('#tradeSeq').html(tradeSeq);
                    $('#addr').html(addr);
                    $('#tel').html(tel);

                    $('#stdAmt').html(fnGetCurrencyCode(fnMinusAmtCheck(georaeStat, stdAmt), 0));
                    $('#vatAmt').html(fnGetCurrencyCode(fnMinusAmtCheck(georaeStat, vatAmt), 0));
                    $('#serAmt').html(fnGetCurrencyCode(fnMinusAmtCheck(georaeStat, serAmt), 0));
                    $('#amt').html(fnGetCurrencyCode(fnMinusAmtCheck(georaeStat, amt), 0));

                    if (georaeStat === '0') {
                        $('#stdAmt, #vatAmt, #serAmt, #amt').css('color', 'red');
                    }

                    $("#capture").css("display", "");
                    html2canvas(document.querySelector("#capture")).then(function (canvas) {

                        // jsPDF 객체 생성 생성자에는 가로, 세로 설정, 페이지 크기 등등 설정할 수 있다. 자세한건 문서 참고. // 현재 파라미터는 기본값이다 굳이 쓰지 않아도 되는데 저것이 기본값이라고 보여준다
                        var doc = new jsPDF('p', 'mm', 'a4'); // html2canvas의 canvas를 png로 바꿔준다.
                        var imgData = canvas.toDataURL('image/png'); //Image 코드로 뽑아내기 // image 추가
                        imgData = imgData.replace("data:image/png;base64,", "");
                        data.imgValue = 'card';
                        data.imgSrc = imgData;
                        data.empSeq = $("#regEmpSeq").val();
                        $.ajax({
                            type: "POST",
                            data: data,
                            dataType: "text",
                            url: "/mng/imgSaveTest",
                            async: false,
                            success: function (data) {
                                var data = JSON.parse(data);
                                var fileNo = data.result;
                                snackReq.global.fileNoArr.push(fileNo);
                            },
                            error: function (a, b, c) {
                                alert("error");
                            }
                        });
                    });

                    $("#capture").css("display", "none");
                }
            });
        }

        $("#loadingDiv").show();
        $("#loadingText").text("영수증 파일 업로드 중입니다.");

        //ajax가 비동기로 처리되어서 강제지연
        setTimeout(() => fn_cardHistSet(snackReq.global.cardList, snackReq.global.fileNoArr), 2000);



    }

    function fn_cardHistSet(list, arr) {
        $("#detailRow").empty();
        let totalAmt = 0;
        let html = '';
        for(var j=0; j<list.length; j++){
            let e = list[j];
            let fileNo = arr[j].fileNo;
            html += '<tr class="cardData">';
            html += '    <input type="hidden" class="cardNo" value="'+e.CARD_NO+'" />';
            html += '    <input type="hidden" class="fileNo" value="'+ fileNo +'" />';
            html += '    <input type="hidden" class="authDate" value="'+e.AUTH_DD+'" />';
            html += '    <input type="hidden" class="authNum" value="'+e.AUTH_NO+'" />';
            html += '    <input type="hidden" class="authTime" value="'+e.AUTH_HH+'" />';
            html += '    <input type="hidden" class="buySts" value="'+e.BUY_STS+'" />';

            html += '    <td style="text-align: center"><input type="checkbox" name="card" style="position: relative; top: 2px"/></td>';
            html += '    <td>'+e.AUTH_DD.substring(0, 4) + '-' + e.AUTH_DD.substring(4, 6) + '-' + e.AUTH_DD.substring(6, 8)+'</td>';
            html += '    <td>'+e.AUTH_NO+'</td>';
            html += '    <td>'+e.MER_NM+'</td>';
            html += '    <td>'+e.MER_BIZNO.substring(0, 3) + '-' + e.MER_BIZNO.substring(3, 5) + '-' + e.MER_BIZNO.substring(5, 11)+'</td>';
            html += '    <td>'+(e.TR_NM == undefined ? "" : e.TR_NM)+'</td>';
            html += '    <td>'+e.CARD_NO.substring(0,4) + '-' + e.CARD_NO.substring(4,8) + '-' + e.CARD_NO.substring(8,12) + '-' + e.CARD_NO.substring(12,16)+'</td>';
            html += '    <td  class="auth-amt" style="text-align: right">'+fn_numberWithCommas(e.AUTH_AMT)+'</td>';
            html += '</tr>';

            totalAmt += e.AUTH_AMT;
        }

        $("#usAmount").val(fn_numberWithCommas(totalAmt));
        $("#detailRow").append(html);

        if(snackReq.global.cardList.length > 1) {
            $("#areaName").val(snackReq.global.cardList[0].MER_NM + " 외 " + Number(snackReq.global.cardList.length - 1) + "건");
        } else {
            $("#areaName").val(snackReq.global.cardList[0].MER_NM);
        }

        snackReq.fn_tempFileSet(arr);

        $("#loadingDiv").hide();
    }

    function fnMinusAmtCheck(georaeStat, amtValue){
        if(georaeStat === '0'){
            /* 승인 취소 건 */
            if(amtValue.indexOf('-') < 0){
                if(Number(amtValue.replace(/,/g, '')) != 0){
                    amtValue = '-' + amtValue;
                }
            }
        }

        return amtValue;
    }

    /*  [공통함수] 날짜 표기 형태 리턴
    Params / 날짜, 시간
    valeu      : 통화 코드 적용 밸류
    -----------------------------------------------------*/
    function fnGetAuthDate(date, time){
        var authDate = date.replace(/[^0-9]/g,'');
        var authTime = time.replace(/[^0-9]/g,'');

        return authDate.substring(0, 4) + '-'+ authDate.substring(4, 6) + '-'+ authDate.substring(6, 8)
            + ' ' +authTime.substring(0, 2) + ':'+ authTime.substring(2, 4) + ':'+ authTime.substring(4, 6);
    }

    /*  [공통함수] 카드 번호 표기 형태 리턴
    Params / 카드 번호
    valeu      : 통화 코드 적용 밸류
    -----------------------------------------------------*/
    function fnGetCardCode(val){
        var cardNum = val.replace(/[^0-9]/g,'');
        return cardNum.substring(0, 4) + '-'+ cardNum.substring(4, 8) + '-'+ cardNum.substring(8, 12) + '-'+ cardNum.substring(12, 16);
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

    function bytesToKB(bytes) {
        const sizes = ['KB'];
        if (bytes === 0) return '0 KB';

        const kilobytes = bytes / 1024;
        return `${kilobytes.toFixed(2)} KB`;
    }
</script>
</body>
</html>